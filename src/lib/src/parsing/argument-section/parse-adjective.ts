import * as T from "../../../../types";
import { fmapParseResult } from "../../fp-ps";
import { makeAdjectiveSelection } from "../../phrase-building/make-selections";
import * as tp from "../../type-predicates";
import { tokensExist } from "../utils";
import { parseInflectableWord } from "./parse-inflectable-word";

export function parseAdjective(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.InflectableBaseParse<T.AdjectiveSelection>>[] {
  if (!tokensExist(tokens)) {
    return [];
  }
  const adjectives = parseInflectableWord(
    tokens,
    dictionary,
    tp.isAdjectiveEntry,
  );
  return fmapParseResult(
    (r) => ({
      inflection: r.inflection,
      gender: r.gender,
      given: r.given,
      selection: makeAdjectiveSelection(r.selection),
    }),
    adjectives,
  );
}
