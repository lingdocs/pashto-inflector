import * as T from "../../../../types";
import { fmapParseResult } from "../../fp-ps";
import { parseAdverb } from "./parse-adverb";
import { parseSandwich } from "./parse-sandwich";

export function parseAP(
  s: Readonly<T.Token[]>,
  dicitonary: T.DictionaryAPI,
  possesor: T.PossesorSelection | undefined
): T.ParseResult<T.APSelection>[] {
  if (s.length === 0) {
    return [];
  }
  const res: T.ParseResult<T.APSelection["selection"]>[] = [
    ...(!possesor ? parseAdverb(s, dicitonary) : []),
    ...parseSandwich(s, dicitonary, possesor),
  ]
  return fmapParseResult(
    (selection) =>
    ({
      type: "AP",
      selection,
    } as const),
    res,
  );
}


