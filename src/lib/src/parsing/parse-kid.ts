import * as T from "../../../types";
import { getOneToken, returnParseResult } from "./utils";

export function parseKid(
  tokens: T.Tokens,
): T.ParseResult<T.ParsedKid | undefined>[] {
  const [first, rest] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  const res: T.ParseResult<T.ParsedKid>[] =
    first === "به"
      ? returnParseResult(rest, "ba")
      : first === "یې"
        ? returnParseResult(rest, "ye")
        : first === "مې"
          ? returnParseResult(rest, "me")
          : first === "دې"
            ? returnParseResult(rest, "de")
            : first === "مو"
              ? returnParseResult(rest, "mU")
              : [];
  return res;
}
