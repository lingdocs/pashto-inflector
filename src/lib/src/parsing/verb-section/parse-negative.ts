import * as T from "../../../../types";
import { getOneToken, returnParseResult } from "../utils";

export function parseNeg(tokens: T.Tokens): T.ParseResult<T.NegativeBlock>[] {
  const [first, rest] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (first === "نه") {
    return returnParseResult(rest, {
      type: "negative",
      imperative: false,
    });
  }
  if (first === "مه") {
    return returnParseResult(rest, {
      type: "negative",
      imperative: true,
    });
  }
  return [];
}

export function parseOptNeg(
  tokens: T.Tokens,
): T.ParseResult<T.NegativeBlock | undefined>[] {
  const res = parseNeg(tokens);
  if (!res.length) {
    return [
      {
        tokens,
        body: undefined,
        errors: [],
      },
    ];
  }
  return res;
}
