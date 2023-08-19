import * as T from "../../../types";
import { returnParseResult } from "./utils";

export function parseNeg(
  tokens: Readonly<T.Token[]>
): T.ParseResult<T.NegativeBlock>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [{ s }, ...rest] = tokens;
  if (s === "نه") {
    return returnParseResult(rest, {
      type: "negative",
      imperative: false,
    });
  }
  if (s === "مه") {
    return returnParseResult(rest, {
      type: "negative",
      imperative: true,
    });
  }
  return [];
}
