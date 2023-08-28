import * as T from "../../../types";
import { verbLookup, lookup, participleLookup } from "./lookup";
import { parseNP } from "./parse-np";
import { parseVP } from "./parse-vp";

// شو should not be sheyaano !!

export function parsePhrase(s: T.Token[]): {
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
    ...parseNP(s, lookup, participleLookup).filter(
      ({ tokens }) => !tokens.length
    ),
    // ...parseVerb(s, verbLookup),
    ...parseVP(s, lookup, verbLookup, participleLookup),
  ];

  const success = res.map((x) => x.body);
  return {
    success,
    errors: [
      ...new Set(res.flatMap(({ errors }) => errors.map((e) => e.message))),
    ],
  };
}
