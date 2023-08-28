import * as T from "../../../types";
import { parsePossesor } from "./parse-possesor";
import { bindParseResult } from "./utils";

type ParticipleResult = {
  inflected: boolean;
  selection: T.ParticipleSelection;
};

export function parseParticiple(
  tokens: Readonly<T.Token[]>,
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[],
  participleLookup: (s: string) => T.VerbEntry[]
): T.ParseResult<ParticipleResult>[] {
  if (tokens.length === 0) {
    return [];
  }
  const possesor = parsePossesor(tokens, lookup, participleLookup, undefined);
  if (possesor.length) {
    return bindParseResult(possesor, (tokens, p) => {
      return parseParticipleAfterPossesor(tokens, participleLookup, p);
    });
  }
  return parseParticipleAfterPossesor(tokens, participleLookup, undefined);
}

// TODO: should have adverbs with participle
function parseParticipleAfterPossesor(
  tokens: Readonly<T.Token[]>,
  participleLookup: (s: string) => T.VerbEntry[],
  possesor: T.PossesorSelection | undefined
): T.ParseResult<ParticipleResult>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (!["ل", "و"].includes(first.s.at(-1) || "")) {
    return [];
  }
  const inflected = first.s.endsWith("و");
  const matches = participleLookup(first.s);
  return matches.map<T.ParseResult<ParticipleResult>>((verb) => ({
    tokens: rest,
    body: {
      inflected,
      selection: {
        type: "participle",
        verb,
        possesor,
      },
    },
    errors: [],
  }));
}
