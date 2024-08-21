import * as T from "../../../types";
import { DictionaryAPI } from "../dictionary/dictionary";
import { fmapParseResult } from "../fp-ps";
import { makeAdjectiveSelection } from "../phrase-building/make-selections";
import * as tp from "../type-predicates";
import { parseInflectableWord } from "./parse-inflectable-word";

export function parseAdjective(
  tokens: Readonly<T.Token[]>,
  dictionary: DictionaryAPI
): T.ParseResult<{
  inflection: (0 | 1 | 2)[];
  gender: T.Gender[];
  given: string;
  selection: T.AdjectiveSelection;
}>[] {
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
      selection: makeAdjectiveSelection(r.entry as T.AdjectiveEntry),
    }),
    adjectives
  );
}
