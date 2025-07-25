import * as T from "../../../../types";
import { fmapParseResult } from "../../fp-ps";
import { tokensExist } from "../utils";
import { parseAdverb } from "./parse-adverb";
import { parseSandwich } from "./parse-sandwich";

export function parseAP(
  s: T.Tokens,
  dicitonary: T.DictionaryAPI,
  possesor: T.PossesorSelection | undefined,
): T.ParseResult<T.APSelection>[] {
  if (!tokensExist(s)) {
    return [];
  }
  const res: T.ParseResult<T.APSelection["selection"]>[] = [
    ...(!possesor ? parseAdverb(s, dicitonary) : []),
    ...parseSandwich(s, dicitonary, possesor),
  ];
  return fmapParseResult(
    (selection) =>
      ({
        type: "AP",
        selection,
      }) as const,
    res,
  );
}
