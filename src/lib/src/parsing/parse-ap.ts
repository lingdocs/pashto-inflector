import * as T from "../../../types";
import { LookupFunction } from "./lookup";
import { parseAdverb } from "./parse-adverb";

export function parseAP(
  s: Readonly<T.Token[]>,
  lookup: LookupFunction
): T.ParseResult<T.APSelection>[] {
  if (s.length === 0) {
    return [];
  }
  return parseAdverb(s, lookup);
}
