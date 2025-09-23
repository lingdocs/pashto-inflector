import * as T from "../../../../types";
import { parsePronoun, PronounResult } from "./parse-pronoun";
import { NounResult, parseNoun } from "./parse-noun";
import { parseParticiple, ParticipleResult } from "./parse-participle";
import { mapParser, parserCombOr } from "../utils";

// TODO: THIS gets called four times off the bat so it could get
// memoized
export const parseNP = (
  possesor: T.PossesorSelection | undefined,
  /** to avoid recursion errors with the complement parsing */
  lookForComp: boolean,
) =>
  mapParser(
    (a): T.ParsedNP => {
      return {
        type: "NP",
        inflected: a.inflected,
        selection: {
          type: "NP",
          selection: a.selection,
        },
      };
    },
    parserCombOr<NounResult | ParticipleResult | PronounResult>([
      ...(!possesor ? [parsePronoun] : []),
      parseNoun(possesor),
      parseParticiple(possesor, lookForComp),
    ]),
  );
