import { parseAdjective } from "./parse-adjective";
import * as T from "../../../types";
import { parsePronoun } from "./parse-pronoun";
import { parseNoun } from "./parse-noun";

export function parsePhrase(
  s: string[],
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[]
): {
  success: any[];
  errors: string[];
} {
  const adjsRes = parseAdjective(s, lookup);
  const prnsRes = parsePronoun(s);
  const nounsRes = parseNoun(s, lookup, []);

  const correct = [...adjsRes, ...prnsRes, ...nounsRes.success]
    .filter(([tkns]) => tkns.length === 0)
    .map((x) => x[1]);
  return {
    success: correct,
    errors: nounsRes.errors,
  };
}
