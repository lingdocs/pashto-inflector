import * as T from "../../../../types";
import { fFlatMapParseResult, fmapParseResult } from "../../fp-ps";
import { isLocativeAdverbEntry } from "../../type-predicates";
import { parseAdjective } from "./parse-adjective";
import { parseAdverb } from "./parse-adverb";
import { parseNP } from "./parse-np";
import { parsePossesor } from "./parse-possesor";
import { parseSandwich } from "./parse-sandwich";
import { bindParseResult } from "../utils";

export function parseComplement(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.ParsedComplementSelection>[] {
  // TODO: error message for inflected complements
  return fmapParseResult(
    (selection) => ({ type: "complement", selection }),
    [
      // TODO: curry these things and use parserCombOr
      ...parseAdjective(tokens, dictionary),
      ...parseSandwich(tokens, dictionary, undefined),
      ...parsePossesor(tokens, dictionary),
      ...fFlatMapParseResult(
        (a): T.ParsedComplementSelection["selection"][] => {
          return isLocativeAdverbEntry(a.entry)
            ? [{ type: "loc. adv.", entry: a.entry }]
            : [];
        },
        parseAdverb(tokens, dictionary),
      ),
      ...parseNPWPoss(tokens, dictionary),
      // TODO: parse complement noun
    ],
  );
}

function parseNPWPoss(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.NPSelection>[] {
  const possesor = parsePossesor(tokens, dictionary);
  const np = !possesor.length
    ? parseNP(tokens, dictionary, undefined, false)
    : bindParseResult<T.PossesorSelection, T.ParsedNP>(possesor, (tokens, p) =>
        parseNP(tokens, dictionary, p, false),
      );
  return fFlatMapParseResult((x) => (x.inflected ? [] : [x.selection]), np);
}
