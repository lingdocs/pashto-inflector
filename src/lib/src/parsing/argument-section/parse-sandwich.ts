import * as T from "../../../../types";
import { sandwiches } from "../../sandwiches";
import { parseNP } from "./parse-np";
import { bindParseResult, getOneToken, tokensExist } from "../utils";

// NOTE: prepositions can be dropped if there's a postposition

// Cases:
// 1. matches both preposition and postposition
// 2. matches only postposition
// TODO: does this always require mayonaise
// TODO: 3. matches only preposition (and there is no postposition)

export function parseSandwich(
  s: T.Tokens,
  dictionary: T.DictionaryAPI,
  possesor: T.PossesorSelection | undefined,
): T.ParseResult<T.SandwichSelection<T.Sandwich>>[] {
  const [first, rest] = getOneToken(s);
  if (!first) {
    return [];
  }
  const startMatches = sandwiches.filter(
    (x) => x.before && x.before.p === first,
  );
  // TODO: this could be be really repetitive...
  const nps = parseNP(
    startMatches.length ? { ...s, position: s.position + 1 } : s,
    dictionary,
    possesor,
    !!startMatches.length,
  );
  return bindParseResult(nps, (tokens, np) => {
    if (!tokensExist(tokens)) {
      return [];
    }
    const sandMatches = (
      startMatches.length ? startMatches : sandwiches
    ).filter((x) => x.after && x.after.p === first);
    const errors: T.ParseError[] = np.inflected
      ? []
      : [{ message: "NP inside sandwich must be inflected" }];
    return sandMatches.map((s) => ({
      tokens: rest,
      body: {
        ...s,
        inside: np.selection,
      },
      errors,
    }));
  });
}
