import * as T from "../../../types";
import { getInflectionPattern } from "../inflection-pattern";
import { makeNounSelection } from "../phrase-building/make-selections";
import {
  isMascNounEntry,
  isNounEntry,
  isPluralNounEntry,
  isUnisexNounEntry,
} from "../type-predicates";
import { getInflectionQueries } from "./inflection-query";
import { parseAdjective } from "./parse-adjective";

// TODO:
// - cleanup the workflow and make sure all nouns are covered and test
// - add possesive parsing

export function parseNoun(
  tokens: Readonly<T.Token[]>,
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[],
  prevPossesor: T.NounSelection | undefined
): {
  success: [T.Token[], { inflected: boolean; selection: T.NounSelection }][];
  errors: string[];
} {
  if (tokens.length === 0) {
    return {
      success: [],
      errors: [],
    };
  }
  const [first, ...rest] = tokens;
  const possesor =
    first.s === "د" ? parseNoun(rest, lookup, undefined) : undefined;
  if (possesor) {
    const runsAfterPossesor: [
      Readonly<T.Token[]>,
      { inflected: boolean; selection: T.NounSelection } | undefined
    ][] = possesor ? [...possesor.success] : [[tokens, undefined]];
    // could be a case for a monad ??
    return runsAfterPossesor.reduce<ReturnType<typeof parseNoun>>(
      (acc, [tokens, possesor]) => {
        if (possesor?.inflected === false) {
          return {
            success: [...acc.success],
            errors: [...acc.errors, "possesor should be inflected"],
          };
        }
        const { success, errors } = parseNoun(
          tokens,
          lookup,
          possesor
            ? {
                ...possesor.selection,
                possesor: prevPossesor
                  ? {
                      shrunken: false,
                      np: {
                        type: "NP",
                        selection: prevPossesor,
                      },
                    }
                  : undefined,
              }
            : undefined
        );
        return {
          success: [...acc.success, ...success],
          errors: [...acc.errors, ...errors],
        };
      },
      { success: [], errors: [] }
    );
  } else {
    return parseNounAfterPossesor(tokens, lookup, prevPossesor, []);
  }
}

// create NP parsing function for that
// TODO with possesor, parse an NP not a noun

function parseNounAfterPossesor(
  tokens: Readonly<T.Token[]>,
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[],
  possesor: T.NounSelection | undefined,
  adjectives: {
    inflection: (0 | 1 | 2)[];
    gender: T.Gender[];
    given: string;
    selection: T.AdjectiveSelection;
  }[]
): {
  success: [T.Token[], { inflected: boolean; selection: T.NounSelection }][];
  errors: string[];
} {
  if (tokens.length === 0) {
    return {
      success: [],
      errors: [],
    };
  }
  // TODO: add recognition of او between adjectives
  const adjRes = parseAdjective(tokens, lookup);
  const withAdj = adjRes.map(([tkns, adj]) =>
    parseNounAfterPossesor(tkns, lookup, possesor, [...adjectives, adj])
  );
  const [first, ...rest] = tokens;
  const success: ReturnType<typeof parseNoun>["success"] = [];
  const errors: string[] = [];

  const searches = getInflectionQueries(first.s, true);

  searches.forEach(({ search, details }) => {
    const nounEntries = lookup(search).filter(isNounEntry);
    details.forEach((deets) => {
      const fittingEntries = nounEntries.filter(deets.predicate);
      fittingEntries.forEach((entry) => {
        const genders: T.Gender[] = isUnisexNounEntry(entry)
          ? ["masc", "fem"]
          : isMascNounEntry(entry)
          ? ["masc"]
          : ["fem"];
        deets.gender.forEach((gender) => {
          if (genders.includes(gender)) {
            deets.inflection.forEach((inf) => {
              const { ok, error } = adjsMatch(
                adjectives,
                gender,
                inf,
                deets.plural
              );
              if (ok) {
                convertInflection(inf, entry, gender, deets.plural).forEach(
                  ({ inflected, number }) => {
                    const selection = makeNounSelection(entry, undefined);
                    success.push([
                      rest,
                      {
                        inflected,
                        selection: {
                          ...selection,
                          gender: selection.genderCanChange
                            ? gender
                            : selection.gender,
                          number: selection.numberCanChange
                            ? number
                            : selection.number,
                          adjectives: adjectives.map((a) => a.selection),
                          // TODO: could be nicer to validate that the possesor is inflected before
                          // and just pass in the selection
                          possesor: possesor
                            ? {
                                shrunken: false,
                                np: {
                                  type: "NP",
                                  selection: possesor,
                                },
                              }
                            : undefined,
                        },
                      },
                    ]);
                  }
                );
              } else {
                error.forEach((e) => {
                  errors.push(e);
                });
              }
            });
          }
        });
      });
    });
  });
  return {
    success: [...withAdj.map((x) => x.success).flat(), ...success],
    errors: [...withAdj.map((x) => x.errors).flat(), ...errors],
  };
}

function adjsMatch(
  adjectives: Parameters<typeof parseNounAfterPossesor>[3],
  gender: T.Gender,
  inf: 0 | 1 | 2,
  plural: boolean | undefined
): { ok: boolean; error: string[] } {
  const inflection = (plural && inf < 2 ? inf + 1 : inf) as 0 | 1 | 2;
  const unmatching = adjectives.filter(
    (adj) =>
      !adj.gender.includes(gender) ||
      !adj.inflection.some((i) => i === inflection)
  );
  if (unmatching.length) {
    return {
      ok: false,
      error: unmatching.map((x) => {
        const adjText =
          x.given === x.selection.entry.p
            ? x.given
            : `${x.given} (${x.selection.entry.p})`;
        const inflectionIssue = !x.inflection.some((x) => x === inflection)
          ? ` should be ${showInflection(inflection)}`
          : ``;
        return `Adjective agreement error: ${adjText} should be ${inflectionIssue} ${gender}.`;
      }),
    };
  } else {
    return {
      ok: true,
      error: [],
    };
  }
}

function convertInflection(
  inflection: 0 | 1 | 2,
  entry: T.NounEntry | T.AdjectiveEntry,
  gender: T.Gender,
  plural: boolean | undefined
): {
  inflected: boolean;
  number: T.NounNumber;
}[] {
  const pattern = getInflectionPattern(entry);
  const inf = (plural && inflection < 2 ? inflection + 1 : inflection) as
    | 0
    | 1
    | 2;
  if (inf === 0) {
    return [
      {
        inflected: false,
        number: "singular",
      },
    ];
  } else if (inf === 1) {
    return [
      ...(!((isNounEntry(entry) && isPluralNounEntry(entry)) || plural) &&
      !(pattern === 4 && entry.p.endsWith("ه") && gender === "masc")
        ? [
            {
              inflected: true,
              number: "singular" as T.NounNumber,
            },
          ]
        : []),
      ...(pattern > 1 ||
      (pattern > 0 && gender === "fem") ||
      (isNounEntry(entry) && isPluralNounEntry(entry)) ||
      plural
        ? [
            {
              inflected: false,
              number: "plural" as T.NounNumber,
            },
          ]
        : []),
    ];
  }
  return [
    {
      inflected: true,
      number: "plural",
    },
  ];
}

function showInflection(inf: 0 | 1 | 2): string {
  return inf === 0
    ? "plain"
    : inf === 1
    ? "first inflection"
    : "second inflection";
}
