import * as T from "../../../types";
import { makeNounSelection } from "../phrase-building/make-selections";
import {
  isFemNounEntry,
  isMascNounEntry,
  isNounEntry,
  isUnisexNounEntry,
} from "../type-predicates";
import { getInflectionQueries } from "./inflection-query";
import { parseAdjective } from "./parse-adjective";

export function parseNoun(
  tokens: Readonly<string[]>,
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[],
  adjectives: {
    inflection: (0 | 1 | 2)[];
    gender: T.Gender[];
    given: string;
    selection: T.AdjectiveSelection;
  }[]
): {
  success: [
    string[],
    { inflection: (0 | 1 | 2)[]; selection: T.NounSelection }
  ][];
  errors: string[];
} {
  if (tokens.length === 0) {
    return {
      success: [],
      errors: [],
    };
  }
  const adjRes = parseAdjective(tokens, lookup);
  const withAdj = adjRes.map(([tkns, adj]) =>
    parseNoun(tkns, lookup, [...adjectives, adj])
  );
  const success: ReturnType<typeof parseNoun>["success"] = [];
  const errors: string[] = [];
  const [first, ...rest] = tokens;

  const searches = getInflectionQueries(first, true);
  searches.forEach(({ search, details }) => {
    const nounEntries = lookup(search).filter(isNounEntry);
    details.forEach((deets) => {
      const fittingEntries = nounEntries.filter(deets.predicate);
      fittingEntries.forEach((entry) => {
        if (isUnisexNounEntry(entry)) {
          deets.gender.forEach((gender) => {
            const { ok, error } = adjsMatch(
              adjectives,
              gender,
              deets.inflection
            );
            if (ok) {
              success.push([
                rest,
                {
                  inflection: deets.inflection,
                  selection: {
                    ...makeNounSelection(entry, undefined),
                    gender,
                    adjectives: adjectives.map((a) => a.selection),
                  },
                },
              ]);
            } else {
              error.forEach((e) => {
                errors.push(e);
              });
            }
          });
        } else if (isMascNounEntry(entry) && deets.gender.includes("masc")) {
          const { ok, error } = adjsMatch(adjectives, "masc", deets.inflection);
          if (ok) {
            success.push([
              rest,
              {
                inflection: deets.inflection,
                selection: {
                  ...makeNounSelection(entry, undefined),
                  adjectives: adjectives.map((a) => a.selection),
                },
              },
            ]);
          } else {
            error.forEach((e) => {
              errors.push(e);
            });
          }
        } else if (isFemNounEntry(entry) && deets.gender.includes("fem")) {
          const { ok, error } = adjsMatch(adjectives, "fem", deets.inflection);
          if (ok) {
            success.push([
              rest,
              {
                inflection: deets.inflection,
                selection: {
                  ...makeNounSelection(entry, undefined),
                  adjectives: adjectives.map((a) => a.selection),
                },
              },
            ]);
          } else {
            error.forEach((e) => {
              errors.push(e);
            });
          }
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
  inflection: (0 | 1 | 2)[]
): { ok: boolean; error: string[] } {
  const unmatching = adjectives.filter(
    (adj) =>
      !adj.gender.includes(gender) ||
      !adj.inflection.some((i) => inflection.includes(i))
  );
  if (unmatching.length) {
    return {
      ok: false,
      error: unmatching.map((x) => {
        const adjText =
          x.given === x.selection.entry.p
            ? x.given
            : `${x.given} (${x.selection.entry.p})`;
        const inflectionIssue = !x.inflection.some((x) =>
          inflection.includes(x)
        )
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

function showInflection(inf: (0 | 1 | 2)[]): string {
  const [last, ...rest] = inf.reverse();
  const template = rest.length
    ? `${rest.join(", ")}, or ${last}`
    : last.toString();
  console.log(template);
  return template
    .replace("0", "plain")
    .replace("1", "first inflection")
    .replace("2", "second inflection");
}
