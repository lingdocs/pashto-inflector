import * as T from "../../../types";
import { LookupFunction } from "./lookup";
import { sandwiches } from "../sandwiches";
import { parseNP } from "./parse-np";
import { bindParseResult } from "./utils";

// NOTE: prepositions can be dropped if there's a postposition

// Cases:
// 1. matches both preposition and postposition
// 2. matches only postposition
// TODO: does this always require mayonaise
// TODO: 3. matches only preposition (and there is no postposition)

export function parseSandwich(
  s: Readonly<T.Token[]>,
  lookup: LookupFunction,
  possesor: T.PossesorSelection | undefined
): T.ParseResult<T.SandwichSelection<T.Sandwich>>[] {
  if (s.length === 0) {
    return [];
  }

  const [first, ...rest] = s;

  const startMatches = sandwiches.filter(
    (x) => x.before && x.before.p === first.s
  );
  // TODO: this could be be really repetitive...
  const nps = parseNP(startMatches.length ? rest : s, lookup, possesor);
  return bindParseResult(nps, (tokens, np) => {
    if (!tokens.length) {
      return [];
    }
    const sandMatches = (
      startMatches.length ? startMatches : sandwiches
    ).filter((x) => x.after && x.after.p === tokens[0].s);
    const errors: T.ParseError[] = np.inflected
      ? []
      : [{ message: "NP inside sandwich must be inflected" }];
    return sandMatches.map((s) => ({
      tokens: tokens.slice(1),
      body: {
        ...s,
        inside: np.selection,
      },
      errors,
    }));
  });
}
