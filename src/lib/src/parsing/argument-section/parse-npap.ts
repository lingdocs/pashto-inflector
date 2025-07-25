import * as T from "../../../../types";
import { parseAP } from "./parse-ap";
import { parseNP } from "./parse-np";
import { parsePossesor } from "./parse-possesor";
import { bindParseResult } from "./../utils";

export function parseNPAP(
  s: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.APSelection | T.ParsedNP>[] {
  if (s.position >= s.tokens.length - 1) {
    return [];
  }
  const possesor = parsePossesor(s, dictionary);
  if (!possesor.length) {
    return [
      ...parseNP(s, dictionary, undefined, true),
      ...parseAP(s, dictionary, undefined),
    ];
  }
  return bindParseResult<T.PossesorSelection, T.APSelection | T.ParsedNP>(
    possesor,
    (tokens, p) => {
      return [
        ...parseNP(tokens, dictionary, p, true),
        ...parseAP(tokens, dictionary, p),
      ];
    },
  );
}
