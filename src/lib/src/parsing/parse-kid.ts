import * as T from "../../../types";
import { getOneToken, returnParseResult } from "./utils";

export function parseKid(tokens: T.Tokens): T.ParseResult<T.ParsedKid>[] {
  const [first, rest] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (first === "به") {
    return returnParseResult(rest, "ba");
  }
  if (first === "یې") {
    return returnParseResult(rest, "ye");
  }
  if (first === "مې") {
    return returnParseResult(rest, "me");
  }
  if (first === "دې") {
    return returnParseResult(rest, "de");
  }
  if (first === "مو") {
    return returnParseResult(rest, "mU");
  }
  return [];
}
