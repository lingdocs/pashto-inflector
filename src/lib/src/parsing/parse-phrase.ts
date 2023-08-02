import * as T from "../../../types";
import { parseNP } from "./parse-np";

export function parsePhrase(
  s: T.Token[],
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[]
): {
  success: { inflected: boolean; selection: T.NPSelection }[];
  errors: string[];
} {
  const nps = parseNP(s, lookup).filter(({ tokens }) => !tokens.length);

  const success = nps.map((x) => x.body);
  return {
    success,
    errors: [
      ...new Set(nps.flatMap(({ errors }) => errors.map((e) => e.message))),
    ],
  };
}
