import * as T from "../../../types";
import { fmapParseResult } from "../fp-ps";
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
  return [
    ...(!possesor ? parseAdverb(s, dicitonary) : []),
    ...fmapParseResult(
      (selection) =>
        ({
          type: "AP",
          selection,
        } as const),
      parseSandwich(s, dicitonary, possesor)
    ),
  ];
}
