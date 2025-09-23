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
  // TODO: could make this return an optionally empty result and then just simplify
  // this with one return, or a parser combinator
  const possesor = parsePossesor(tokens, dictionary);
  if (!possesor.length) {
    return [
      ...parseNP(undefined, true)(tokens, dictionary),
      ...parseAP(undefined)(tokens, dictionary),
    ];
  }
  return bindParseResult<T.PossesorSelection, T.APSelection | T.ParsedNP>(
    possesor,
    (tokens, p) => {
      return [
        ...parseNP(p.content, true)(tokens, dictionary),
        ...parseAP(p.content)(tokens, dictionary),
      ];
    },
  );
}
