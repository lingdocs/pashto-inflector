import * as T from "../../../types";
import { returnParseResult } from "./utils";

export function parseKid(
  tokens: Readonly<T.Token[]>
): T.ParseResult<T.ParsedKid>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [{ s }, ...rest] = tokens;
  if (s === "به") {
    return returnParseResult(rest, "ba");
  }
  if (s === "یې") {
    return returnParseResult(rest, "ye");
  }
  if (s === "مې") {
    return returnParseResult(rest, "me");
  }
  if (s === "دې") {
    return returnParseResult(rest, "de");
  }
  if (s === "مو") {
    return returnParseResult(rest, "mU");
  }
  return [];
}
