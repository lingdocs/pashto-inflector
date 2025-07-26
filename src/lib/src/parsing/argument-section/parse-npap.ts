import * as T from "../../../../types";
import { parseAP } from "./parse-ap";
import { parseNP } from "./parse-np";
import { parsePossesor } from "./parse-possesor";
import { bindParseResult, tokensExist } from "./../utils";

export function parseNPAP(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.APSelection | T.ParsedNP>[] {
  if (!tokensExist(tokens)) {
    return [];
  }
  const possesor = parsePossesor(tokens, dictionary);
  if (!possesor.length) {
    return [
      ...parseNP(tokens, dictionary, undefined, true),
      ...parseAP(tokens, dictionary, undefined),
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
