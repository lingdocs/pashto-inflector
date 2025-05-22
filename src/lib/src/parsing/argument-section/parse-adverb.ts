import * as T from "../../../../types";
import { isAdverbEntry, isLocativeAdverbEntry } from "../../type-predicates";
import { returnParseResultSingle } from "./../utils";

export function parseAdverb(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.AdverbSelection>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const adverbs = dictionary.queryP(first.s).filter(isAdverbEntry);
  return adverbs.map((entry) =>
    returnParseResultSingle(rest, {
      type: "adverb",
      entry,
    })
  );
}

export function parseLocAdverb(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.LocativeAdverbSelection>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const adverbs = dictionary.queryP(first.s).filter(isLocativeAdverbEntry);
  return adverbs.map((entry) =>
    returnParseResultSingle(rest, {
      type: "loc. adv." as const,
      entry,
    })
  );
}
