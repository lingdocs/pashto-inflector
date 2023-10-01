import * as T from "../../../types";
import { LookupFunction } from "./lookup";
import { sandwiches } from "../sandwiches";
import { parseNP } from "./parse-np";
import { bindParseResult } from "./utils";

export function parseSandwich(
  s: Readonly<T.Token[]>,
  lookup: LookupFunction,
  possesor: T.PossesorSelection | undefined
): T.ParseResult<T.SandwichSelection<T.Sandwich>>[] {
  if (s.length === 0) {
    return [];
  }

  const [first, ...rest] = s;

  const startMatches = sandwiches.filter((x) => x.before?.p === first.s);
  if (!startMatches) {
    return [];
  }
  // TODO: parse without possesive!
  const nps = parseNP(rest, lookup, possesor);
  return bindParseResult(nps, (tokens, np) => {
    const sandMatches = startMatches.filter((x) => x.after?.p === tokens[0]?.s);
    // TODO: allow pattern #1 not inflected
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
