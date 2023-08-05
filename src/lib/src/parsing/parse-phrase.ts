import * as T from "../../../types";
import { verbLookup } from "./lookup";
import { parseNP } from "./parse-np";
import { parseVerb } from "./parse-verb";
import { parseVP } from "./parse-vp";

export function parsePhrase(
  s: T.Token[],
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[]
): {
  success: (
    | {
        inflected: boolean;
        selection: T.NPSelection;
      }
    | Omit<T.VBE, "ps">
    | T.VPSelectionComplete
  )[];
  errors: string[];
} {
  const res = [
    ...parseNP(s, lookup).filter(({ tokens }) => !tokens.length),
    ...parseVerb(s, verbLookup),
    ...parseVP(s, lookup, verbLookup),
  ];

  const success = res.map((x) => x.body);
  return {
    success,
    errors: [
      ...new Set(res.flatMap(({ errors }) => errors.map((e) => e.message))),
    ],
  };
}
