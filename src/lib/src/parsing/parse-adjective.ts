import * as T from "../../../types";
import { makeAdjectiveSelection } from "../phrase-building/make-selections";
import { isAdjectiveEntry } from "../type-predicates";
import { getInflectionQueries } from "./inflection-query";
import { LookupFunction } from "./lookup";

export function parseAdjective(
  tokens: Readonly<T.Token[]>,
  lookup: LookupFunction
): T.ParseResult<T.InflectableBaseParse<T.AdjectiveSelection>>[] {
  const w: ReturnType<typeof parseAdjective> = [];
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const queries = getInflectionQueries(first.s, false);
  queries.forEach(({ search, details }) => {
    const wideMatches = lookup(search, "nounAdj").filter(isAdjectiveEntry);
    details.forEach((deets) => {
      const matches = wideMatches.filter(deets.predicate);
      matches.forEach((m) => {
        const selection = makeAdjectiveSelection(m);
        w.push({
          tokens: rest,
          body: {
            selection,
            inflection: deets.inflection,
            gender: deets.gender,
            given: first.s,
          },
          errors: [],
        });
      });
    });
  });
  return w;
}
