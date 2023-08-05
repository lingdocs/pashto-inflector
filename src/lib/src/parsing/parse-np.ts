import * as T from "../../../types";
import { parsePronoun } from "./parse-pronoun";
import { parseNoun } from "./parse-noun";
import { fmapParseResult } from "../fp-ps";

export function parseNP(
  s: Readonly<T.Token[]>,
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[]
): T.ParseResult<{ inflected: boolean; selection: T.NPSelection }>[] {
  if (s.length === 0) {
    return [];
  }

  function makeNPSl(
    a:
      | {
          inflected: boolean;
          selection: T.PronounSelection;
        }
      | {
          inflected: boolean;
          selection: T.NounSelection;
        }
  ): {
    inflected: boolean;
    selection: T.NPSelection;
  } {
    return {
      inflected: a.inflected,
      selection: {
        type: "NP",
        selection: a.selection,
      } as T.NPSelection,
    };
  }

  // @ts-ignore  grrr webpack is having trouble with this
  return fmapParseResult(makeNPSl, [
    ...parsePronoun(s),
    ...parseNoun(s, lookup),
  ]);
}
