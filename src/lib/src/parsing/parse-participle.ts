import * as T from "../../../types";
import { shortVerbEndConsonant } from "./misc";

type ParticipleResult = {
  inflected: boolean;
  selection: T.ParticipleSelection;
};

// TODO: should have adverbs with participle
// TODO: NOTE this does not work with compound verbs yet
export function parseParticiple(
  tokens: Readonly<T.Token[]>,
  dicitonary: T.DictionaryAPI,
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

  return [
    ...dicitonary.verbEntryLookup(inflected ? first.s.slice(0, -1) : first.s),
    ...(inflected && shortVerbEndConsonant.includes(first.s.at(-2) || "")
      ? dicitonary.verbEntryLookup(first.s.slice(0, -1) + "ل")
      : []),
  ].map<T.ParseResult<ParticipleResult>>((verb) => ({
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
