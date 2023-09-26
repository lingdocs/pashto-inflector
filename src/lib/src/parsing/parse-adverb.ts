import * as T from "../../../types";
import { LookupFunction } from "./lookup";
import { returnParseResultS } from "./utils";

export function parseAdverb(
  tokens: Readonly<T.Token[]>,
  lookup: LookupFunction
): T.ParseResult<T.APSelection>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const adverbs = lookup(first.s, "adverb");
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
