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
import { groupWith, equals } from "rambda";

// TODO:
// - cleanup the workflow and make sure all nouns are covered and test
// - add possesive parsing
type NounResult = { inflected: boolean; selection: T.NounSelection };

export function parseNoun(
  tokens: Readonly<T.Token[]>,
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[],
  prevPossesor: { inflected: boolean; selection: T.NounSelection } | undefined
): T.ParseResult<NounResult>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const possesor =
    first.s === "د" ? parseNoun(rest, lookup, undefined) : undefined;
  if (possesor) {
    const runsAfterPossesor: T.ParseResult<NounResult | undefined>[] = possesor
      ? possesor
      : [[tokens, undefined, []]];
    // could be a case for a monad ??
    return removeUnneccesaryFailing(
      runsAfterPossesor.flatMap(([tokens, possesor, errors]) =>
        parseNoun(
          tokens,
          lookup,
          possesor
            ? {
                inflected: possesor.inflected,
                selection: {
                  ...possesor.selection,
                  possesor: prevPossesor
                    ? {
                        shrunken: false,
                        np: {
                          type: "NP",
                          selection: prevPossesor.selection,
                        },
                      }
                    : undefined,
                },
              }
            : undefined
        ).map<T.ParseResult<NounResult>>(([t, r, errs]) => [
          t,
          r,
          [...errs, ...errors],
        ])
      )
    );
  } else {
    return removeUnneccesaryFailing(
      parseNounAfterPossesor(tokens, lookup, prevPossesor, [])
    );
  }
}

function removeUnneccesaryFailing(
  results: T.ParseResult<NounResult>[]
): T.ParseResult<NounResult>[] {
  // group by identical results
  const groups = groupWith(
    (a, b) => equals(a[1].selection, b[1].selection),
    results
  );
  // if there's a group of identical results with some success in it
  // remove any erroneous results
  const stage1 = groups.flatMap((group) => {
    if (group.find((x) => x[2].length === 0)) {
      return group.filter((x) => x[2].length === 0);
    }
    return group;
  });
  // finally, if there's any success anywhere, remove any of the errors
  if (stage1.find((x) => x[2].length === 0)) {
    return stage1.filter((x) => x[2].length === 0);
  } else {
    return stage1;
  }
}

// create NP parsing function for that
// TODO with possesor, parse an NP not a noun

function parseNounAfterPossesor(
  tokens: Readonly<T.Token[]>,
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[],
  possesor: { inflected: boolean; selection: T.NounSelection } | undefined,
  adjectives: {
    inflection: (0 | 1 | 2)[];
    gender: T.Gender[];
    given: string;
    selection: T.AdjectiveSelection;
  }[]
): T.ParseResult<NounResult>[] {
  if (tokens.length === 0) {
    return [];
  }
  // TODO: add recognition of او between adjectives
  const adjRes = parseAdjective(tokens, lookup);
  const withAdj = adjRes.flatMap(([tkns, adj]) =>
    parseNounAfterPossesor(tkns, lookup, possesor, [...adjectives, adj])
  );
  const [first, ...rest] = tokens;
  const w: ReturnType<typeof parseNoun> = [];

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
              const { error: adjErrors } = adjsMatch(
                adjectives,
                gender,
                inf,
                deets.plural
              );
              convertInflection(inf, entry, gender, deets.plural).forEach(
                ({ inflected, number }) => {
                  const selection = makeNounSelection(entry, undefined);
                  w.push([
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
                                selection: possesor.selection,
                              },
                            }
                          : undefined,
                      },
                    },
                    [
                      ...(possesor?.inflected === false
                        ? [{ message: "possesor should be inflected" }]
                        : []),
                      ...adjErrors.map((message) => ({
                        message,
                      })),
                    ],
                  ] as T.ParseResult<NounResult>);
                }
              );
            });
          }
        });
      });
    });
  });
  return [...withAdj, ...w];
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
