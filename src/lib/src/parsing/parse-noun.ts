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
    selection: T.AdjectiveSelection;
  }[]
): [string[], { inflection: (0 | 1 | 2)[]; selection: T.NounSelection }][] {
  if (tokens.length === 0) {
    return [];
  }
  const adjRes = parseAdjective(tokens, lookup);
  const withAdj = adjRes.flatMap(([tkns, adj]) =>
    parseNoun(tkns, lookup, [...adjectives, adj])
  );
  const w: ReturnType<typeof parseNoun> = [];
  const [first, ...rest] = tokens;

  const searches = getInflectionQueries(first, true);
  searches.forEach(({ search, details }) => {
    const nounEntries = lookup(search).filter(isNounEntry);
    details.forEach((deets) => {
      const fittingEntries = nounEntries.filter(deets.predicate);
      fittingEntries.forEach((entry) => {
        console.log({ entry, deets });
        if (isUnisexNounEntry(entry)) {
          deets.gender.forEach((gender) => {
            if (adjsMatch(adjectives, gender, deets.inflection)) {
              w.push([
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
            }
          });
        } else if (isMascNounEntry(entry) && deets.gender.includes("masc")) {
          if (adjsMatch(adjectives, "masc", deets.inflection)) {
            w.push([
              rest,
              {
                inflection: deets.inflection,
                selection: {
                  ...makeNounSelection(entry, undefined),
                  adjectives: adjectives.map((a) => a.selection),
                },
              },
            ]);
          }
        } else if (isFemNounEntry(entry) && deets.gender.includes("fem")) {
          if (adjsMatch(adjectives, "fem", deets.inflection)) {
            w.push([
              rest,
              {
                inflection: deets.inflection,
                selection: {
                  ...makeNounSelection(entry, undefined),
                  adjectives: adjectives.map((a) => a.selection),
                },
              },
            ]);
          }
        }
      });
    });
  });
  return [...withAdj, ...w];
}

function adjsMatch(
  adjectives: Parameters<typeof parseNoun>[2],
  gender: T.Gender,
  inflection: (0 | 1 | 2)[]
): boolean {
  return adjectives.every(
    (adj) =>
      adj.gender.includes(gender) &&
      adj.inflection.some((i) => inflection.includes(i))
  );
}
