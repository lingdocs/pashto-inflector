import * as T from "../../../../types";
import { fFlatMapParseResult, fmapParseResult } from "../../fp-ps";
import { isLocativeAdverbEntry } from "../../type-predicates";
import { parseAdjective } from "./parse-adjective-new";
import { parseAdverb } from "./parse-adverb";
import { parseNP } from "./parse-np";
import { parsePossesor } from "./parse-possesor";
import { parseSandwich } from "./parse-sandwich";
import { bindParseResult } from "../utils";

export function parseComplement(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.ParsedComplementSelection>[] {
  // TODO: error message for inflected complements
  return fmapParseResult(
    (selection) => ({ type: "complement", selection }),
    [
      // TODO: curry these things and use parserCombOr
      ...parseAdjective(tokens, dictionary),
      ...parseSandwich(tokens, dictionary, undefined),
      ...parsePossesor(tokens, dictionary, undefined, []),
      ...fFlatMapParseResult(
        (p): T.ParsedComplementSelection["selection"][] => {
          if (p.selection.type === "sandwich") {
            return [p.selection];
          }
          return isLocativeAdverbEntry(p.selection.entry)
            ? [{ type: "loc. adv.", entry: p.selection.entry }]
            : [];
        },
        parseAdverb(tokens, dictionary)
      ),
      ...parseNPWPoss(tokens, dictionary),
      // TODO: parse complement noun
    ]
  );
}

function parseNPWPoss(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.NPSelection>[] {
  const possesor = parsePossesor(tokens, dictionary, undefined, []);
  const np = !possesor.length
    ? parseNP(tokens, dictionary, undefined)
    : bindParseResult<T.PossesorSelection, T.ParsedNP>(possesor, (tokens, p) =>
        parseNP(tokens, dictionary, p)
      );
  return fFlatMapParseResult((x) => (x.inflected ? [] : [x.selection]), np);
}
