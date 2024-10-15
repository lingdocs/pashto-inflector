import * as T from "../../../types";
import { isAdverbEntry } from "../type-predicates";
import { returnParseResultS } from "./utils";

export function parseAdverb(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.APSelection>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const adverbs = dictionary.queryP(first.s).filter(isAdverbEntry);
  return adverbs.map((entry) =>
    returnParseResultS(rest, {
      type: "AP",
      selection: {
        type: "adverb",
        entry,
      },
    })
  );
}
