import * as T from "../../../../types";
import { isAdverbEntry, isLocativeAdverbEntry } from "../../type-predicates";
import { getOneToken, returnParseResultSingle } from "./../utils";

export function parseAdverb(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.AdverbSelection>[] {
  const [first, rest, firstPos] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  const adverbs = dictionary.queryP(first).filter(isAdverbEntry);
  return adverbs.map((entry) =>
    returnParseResultSingle(
      rest,
      {
        type: "adverb",
        entry,
      },
      firstPos,
    ),
  );
}

export function parseLocAdverb(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.LocativeAdverbSelection>[] {
  const [first, rest, firstPos] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  const adverbs = dictionary.queryP(first).filter(isLocativeAdverbEntry);
  return adverbs.map((entry) =>
    returnParseResultSingle(
      rest,
      {
        type: "loc. adv." as const,
        entry,
      },
      firstPos,
    ),
  );
}
