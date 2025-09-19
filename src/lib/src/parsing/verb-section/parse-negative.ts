import * as T from "../../../../types";
import { getOneToken, returnParseResult } from "../utils";

export function parseNeg(tokens: T.Tokens): T.ParseResult<T.NegativeBlock>[] {
  const [first, rest, pos] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (first === "نه") {
    return returnParseResult(
      rest,
      {
        type: "negative",
        imperative: false,
      },
      pos,
    );
  }
  if (first === "مه") {
    return returnParseResult(
      rest,
      {
        type: "negative",
        imperative: true,
      },
      pos,
    );
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
        position: { start: tokens.position, end: tokens.position },
      },
    ];
  }
  return res;
}
