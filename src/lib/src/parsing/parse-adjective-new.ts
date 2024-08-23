import * as T from "../../../types";
import { fmapParseResult } from "../fp-ps";
import { makeAdjectiveSelection } from "../phrase-building/make-selections";
import * as tp from "../type-predicates";
import { parseInflectableWord } from "./parse-inflectable-word";

export function parseAdjective(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.InflectableBaseParse<T.AdjectiveSelection>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const adjectives = parseInflectableWord(
    tokens,
    dictionary,
    tp.isAdjectiveEntry
  );
  return fmapParseResult(
    (r) => ({
      inflection: r.inflection,
      gender: r.gender,
      given: r.given,
      selection: makeAdjectiveSelection(r.selection as T.AdjectiveEntry),
    }),
    adjectives
  );
}
