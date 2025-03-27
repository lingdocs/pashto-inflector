import * as T from "../../../../types";
import { parseAP } from "./parse-ap";
import { parseNP } from "./parse-np";
import { parsePossesor } from "./parse-possesor";
import { bindParseResult } from "./../utils";

export function parseNPAP(
  s: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.APSelection | T.ParsedNP>[] {
  if (s.length === 0) {
    return [];
  }
  const possesor = parsePossesor(s, dictionary, undefined);
  if (!possesor.length) {
    return [
      ...parseNP(s, dictionary, undefined),
      ...parseAP(s, dictionary, undefined),
    ];
  }
  return bindParseResult<T.PossesorSelection, T.APSelection | T.ParsedNP>(
    possesor,
    (tokens, p) => {
      return [
        ...parseNP(tokens, dictionary, p),
        ...parseAP(tokens, dictionary, p),
      ];
    }
  );
}
