import * as T from "../../../../types";
import { parsePronoun } from "./parse-pronoun";
import { parseNoun } from "./parse-noun";
import { fmapParseResult } from "../../fp-ps";
import { parseParticiple } from "./parse-participle";
import { tokensExist } from "../utils";

// TODO: THIS gets called four times off the bat so it could get
// memoized
export function parseNP(
  tokens: T.Tokens,
  dicitonary: T.DictionaryAPI,
  possesor: T.PossesorSelection | undefined,
  /** to avoid recursion errors with the complement parsing */
  lookForComp: boolean,
): T.ParseResult<T.ParsedNP>[] {
  if (!tokensExist(tokens)) {
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
        },
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
    ...(!possesor ? parsePronoun(tokens) : []),
    ...parseNoun(tokens, dicitonary, possesor),
    ...parseParticiple(tokens, dicitonary, possesor, lookForComp),
  ]);
}
