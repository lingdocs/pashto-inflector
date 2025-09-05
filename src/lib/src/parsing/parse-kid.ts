import * as T from "../../../types";
import { getOneToken, returnParseResult } from "./utils";

export function parseKid(
  tokens: T.Tokens,
): T.ParseResult<T.ParsedKid | undefined>[] {
  const [first, rest, firstPos] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  const res: T.ParseResult<T.ParsedKid>[] =
    first === "به"
      ? returnParseResult(rest, "ba", firstPos)
      : first === "یې"
        ? returnParseResult(rest, "ye", firstPos)
        : first === "مې"
          ? returnParseResult(rest, "me", firstPos)
          : first === "دې"
            ? returnParseResult(rest, "de", firstPos)
            : first === "مو"
              ? returnParseResult(rest, "mU", firstPos)
              : [];
  return res;
}
