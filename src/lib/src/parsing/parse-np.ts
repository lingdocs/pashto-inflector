import * as T from "../../../types";
import { parsePronoun } from "./parse-pronoun";
import { parseNoun } from "./parse-noun";
import { fmapParseResult } from "../fp-ps";
import { parseParticiple } from "./parse-participle";
import { LookupFunction } from "./lookup";

export function parseNP(
  s: Readonly<T.Token[]>,
  lookup: LookupFunction,
  possesor: T.PossesorSelection | undefined
): T.ParseResult<T.ParsedNP>[] {
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
      | {
          inflected: boolean;
          selection: T.ParticipleSelection;
        }
  ): T.ParsedNP {
    return {
      type: "NP",
      inflected: a.inflected,
      selection: {
        type: "NP",
        selection: a.selection,
      } as T.NPSelection,
    };
  }

  return fmapParseResult(makeNPSl, [
    ...(!possesor ? parsePronoun(s) : []),
    ...parseNoun(s, lookup, possesor, []),
    ...parseParticiple(s, lookup, possesor),
  ]);
}
