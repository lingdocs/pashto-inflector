import * as T from "../../../types";
import { lookup } from "./lookup";
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
    ...parseNP(s, lookup).filter(({ tokens }) => !tokens.length),
    // ...parseVerb(s, verbLookup),
    ...parseVP(s, lookup),
  ];

  console.log({ res });
  const success = res.filter((x) => !x.tokens.length).map((x) => x.body);
  console.log({ success });
  return {
    success,
    errors: [
      ...new Set(res.flatMap(({ errors }) => errors.map((e) => e.message))),
    ],
  };
}
