import * as T from "../../../types";
import { parseVP } from "./parse-vp";

// شو should not be sheyaano !!

export function parsePhrase(
  s: T.Token[],
  dicitonary: T.DictionaryAPI,
): {
  success: // | {
  //     inflected: boolean;
  //     selection: T.NPSelection;
  //   }
  // | Omit<T.VBE, "ps">
  (T.VPSelectionComplete | T.EPSelectionComplete)[];
  errors: string[];
} {
  const res = [
    // ...parseNP(s, lookup).filter(({ tokens }) => !tokens.length),
    // ...parseVerb(s, verbLookup),
    ...parseVP(s, dicitonary),
  ];

  const success = res.filter((x) => !x.tokens.length).map((x) => x.body);
  return {
    success,
    errors: [
      ...new Set(res.flatMap(({ errors }) => errors.map((e) => e.message))),
    ],
  };
}
