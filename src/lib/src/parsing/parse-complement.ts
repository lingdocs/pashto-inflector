import * as T from "../../../types";
import { fFlatMapParseResult, fmapParseResult } from "../fp-ps";
import { isLocativeAdverbEntry } from "../type-predicates";
import { parseAdjective } from "./parse-adjective-new";
import { parseAdverb } from "./parse-adverb";
import { parsePossesor } from "./parse-possesor";
import { parseSandwich } from "./parse-sandwich";

export function parseCompliment(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.ParsedComplementSelection>[] {
  return fmapParseResult(
    (selection) => ({ type: "complement", selection }),
    [
      // TODO: curry these things and use parserCombOr
      ...parseAdjective(tokens, dictionary),
      ...parseSandwich(tokens, dictionary, undefined),
      ...parsePossesor(tokens, dictionary, undefined),
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
      // TODO: parse complement noun
    ]
  );
}
