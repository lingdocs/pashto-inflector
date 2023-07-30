import * as T from "../../../types";
import { makeAdjectiveSelection } from "../phrase-building/make-selections";
import { isAdjectiveEntry } from "../type-predicates";
import { getInflectionQueries } from "./inflection-query";

export function parseAdjective(
  tokens: Readonly<string[]>,
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[]
): [
  string[],
  {
    inflection: (0 | 1 | 2)[];
    gender: T.Gender[];
    selection: T.AdjectiveSelection;
  }
][] {
  const w: ReturnType<typeof parseAdjective> = [];
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const queries = getInflectionQueries(first, false);
  queries.forEach(({ search, details }) => {
    const wideMatches = lookup(search).filter(isAdjectiveEntry);
    details.forEach((deets) => {
      const matches = wideMatches.filter(deets.predicate);
      matches.forEach((m) => {
        const selection = makeAdjectiveSelection(m);
        w.push([
          rest,
          {
            selection,
            inflection: deets.inflection,
            gender: deets.gender,
          },
        ]);
      });
    });
  });

  return w;
}
