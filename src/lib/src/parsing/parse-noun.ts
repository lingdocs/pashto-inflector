import * as T from "../../../types";
import { getInflectionPattern } from "../inflection-pattern";
import { makeNounSelection } from "../phrase-building/make-selections";
import {
  isFemNounEntry,
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
  const [first, ...rest] = tokens;
  // TODO: add recognition of او between adjectives
  const adjRes = parseAdjective(tokens, lookup);
  const withAdj = adjRes.map(([tkns, adj]) =>
    parseNoun(tkns, lookup, [...adjectives, adj])
  );
  const success: ReturnType<typeof parseNoun>["success"] = [];
  const errors: string[] = [];
  // const possesor =
  //   first === "د" ? parseNoun(rest, lookup, adjectives).success : undefined;

  const searches = getInflectionQueries(first.s, true);

  searches.forEach(({ search, details }) => {
    const nounEntries = lookup(search).filter(isNounEntry);
    details.forEach((deets) => {
      const fittingEntries = nounEntries.filter(deets.predicate);
      fittingEntries.forEach((entry) => {
        if (isUnisexNounEntry(entry)) {
          deets.gender.forEach((gender) => {
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
          });
        } else if (isMascNounEntry(entry) && deets.gender.includes("masc")) {
          deets.inflection.forEach((inf) => {
            const { ok, error } = adjsMatch(
              adjectives,
              "masc",
              inf,
              deets.plural
            );
            if (ok) {
              convertInflection(inf, entry, "masc", deets.plural).forEach(
                ({ inflected, number }) => {
                  const selection = makeNounSelection(entry, undefined);
                  success.push([
                    rest,
                    {
                      inflected,
                      selection: {
                        ...selection,
                        number: selection.numberCanChange
                          ? number
                          : selection.number,
                        adjectives: adjectives.map((a) => a.selection),
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
        } else if (isFemNounEntry(entry) && deets.gender.includes("fem")) {
          deets.inflection.forEach((inf) => {
            const { ok, error } = adjsMatch(
              adjectives,
              "fem",
              inf,
              deets.plural
            );
            if (ok) {
              convertInflection(inf, entry, "fem", deets.plural).forEach(
                ({ inflected, number }) => {
                  const selection = makeNounSelection(entry, undefined);
                  success.push([
                    rest,
                    {
                      inflected,
                      selection: {
                        ...selection,
                        number: selection.numberCanChange
                          ? number
                          : selection.number,
                        adjectives: adjectives.map((a) => a.selection),
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
  return {
    success: [...withAdj.map((x) => x.success).flat(), ...success],
    errors: [...withAdj.map((x) => x.errors).flat(), ...errors],
  };
}

function adjsMatch(
  adjectives: Parameters<typeof parseNoun>[2],
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
