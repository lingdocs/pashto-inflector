import * as T from "../../../types";
import { LookupFunction } from "./lookup";

type ParticipleResult = {
  inflected: boolean;
  selection: T.ParticipleSelection;
};

// TODO: should have adverbs with participle
export function parseParticiple(
  tokens: Readonly<T.Token[]>,
  lookup: LookupFunction,
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
  const matches = lookup(first.s, "participle");
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
