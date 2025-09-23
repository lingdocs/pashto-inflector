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

export function parseSandwich(possesor: T.PossesorSelection | undefined) {
  return function (
    tokens: T.Tokens,
    dictionary: T.DictionaryAPI,
  ): T.ParseResult<T.SandwichSelection<T.Sandwich>>[] {
    const [first] = getOneToken(tokens);
    if (!first) {
      return [];
    }
    const startMatches = sandwiches.filter(
      (x) => x.before !== undefined && x.before.p === first,
    );
    // TODO: this could be be really repetitive...
    const nps = parseNP(possesor, !!startMatches.length)(
      startMatches.length
        ? { ...tokens, position: tokens.position + 1 }
        : tokens,
      dictionary,
    );
    return bindParseResult(nps, (tkns, np) => {
      if (!tokensExist(tkns)) {
        return [];
      }
      const [a, leftOver, position] = getOneToken(tkns);
      if (!a) {
        return [];
      }
      const sandMatches = (
        startMatches.length ? startMatches : sandwiches
      ).filter((x) => x.after !== undefined && x.after.p === a);
      const errors: T.ParseError[] = np.content.inflected
        ? []
        : [{ message: "NP inside sandwich must be inflected" }];
      return sandMatches.map((s) => ({
        tokens: leftOver,
        body: {
          ...s,
          inside: np.content.selection,
        },
        position: {
          start: tokens.position,
          end: position.end,
        },
        errors,
      }));
    });
  };
}
