import * as T from "../../../types";
import { LookupFunction } from "./lookup";
import { parseAP } from "./parse-ap";
import { parseNP } from "./parse-np";
import { parsePossesor } from "./parse-possesor";
import { bindParseResult } from "./utils";

export function parseNPAP(
  s: Readonly<T.Token[]>,
  lookup: LookupFunction
): T.ParseResult<T.APSelection | T.ParsedNP>[] {
  if (s.length === 0) {
    return [];
  }
  const possesor = parsePossesor(s, lookup, undefined);
  if (!possesor.length) {
    return [...parseNP(s, lookup, undefined), ...parseAP(s, lookup, undefined)];
  }
  return bindParseResult<T.PossesorSelection, T.APSelection | T.ParsedNP>(
    possesor,
    (tokens, p) => {
      return [...parseNP(tokens, lookup, p), ...parseAP(tokens, lookup, p)];
    }
  );
}
