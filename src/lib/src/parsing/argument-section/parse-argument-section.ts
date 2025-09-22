import * as T from "../../../../types";
import { parseKidsSection } from "./../parse-kids-section";
import { parseNPAP } from "./parse-npap";
import {
  bindParseWithAllErrors,
  returnParseResultSingle,
  tokensExist,
} from "./../utils";
import { parseComplement } from "./parse-complement";
import { assertNever } from "../../misc-helpers";

export type ArgSectionData = {
  kids: { position: number; section: T.ParsedKid[] }[];
  npsAndAps: (T.ParsedNP | T.APSelection)[];
  complement: T.ParsedComplementSelection | undefined;
};

// could define this as a monoid if I wanted to 🤓
const empty: ArgSectionData = {
  kids: [],
  npsAndAps: [],
  complement: undefined,
};

// TODO !! somehow when we're binding the argument parsing calls
// we are losing the errors from the NPs

export function parseArgumentSection(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<ArgSectionData>[] {
  if (!tokensExist(tokens)) {
    return [];
  }
  return [
    // also give an option to keep parsing without an argument section
    returnParseResultSingle(tokens, empty, {
      start: tokens.position,
      end: tokens.position,
    }),
    ...parseArgSectR(dictionary)({
      tokens,
      body: empty,
      errors: [],
      position: { start: tokens.position, end: tokens.position },
    }),
  ];
}

function parseArgSectR(dictionary: T.DictionaryAPI) {
  return function (
    prev: T.ParseResult<ArgSectionData>,
  ): T.ParseResult<ArgSectionData>[] {
    function keepGoing(res: T.ParseResult<ArgSectionData>) {
      return [res, ...parseArgSectR(dictionary)(res)];
    }
    const results: T.ParseResult<
      | T.ParsedNP
      | T.APSelection
      | T.ParsedKidsSection
      | T.ParsedComplementSelection
    >[] = !prev.body.complement
      ? [
          ...parseNPAP(prev.tokens, dictionary),
          ...parseKidsSection(prev.tokens, [], []),
          ...parseComplement(prev.tokens, dictionary),
        ]
      : parseKidsSection(prev.tokens, [], []);
    if (results.length === 0) {
      return [prev];
    }
    // we have errors in `results` up to this point, then they get lost
    // in the binding somehow
    return bindParseWithAllErrors(results, (tkns, r) => {
      if (r.content.type === "AP" || r.content.type === "NP") {
        const d: ArgSectionData = {
          kids: prev.body.kids,
          npsAndAps: [...prev.body.npsAndAps, r.content],
          complement: prev.body.complement,
        };
        return keepGoing(returnParseResultSingle(tkns, d, r.position));
      }
      if (r.content.type === "kids") {
        const position = prev.body.npsAndAps.length + +!!prev.body.complement;
        const errors =
          position === 1 ? [] : [{ message: "kid's section out of place" }];
        const d: ArgSectionData = {
          kids: [
            ...prev.body.kids,
            {
              position,
              section: r.content.kids,
            },
          ],
          npsAndAps: prev.body.npsAndAps,
          complement: prev.body.complement,
        };
        return keepGoing(returnParseResultSingle(tkns, d, r.position, errors));
      }
      if (r.content.type === "complement") {
        const d: ArgSectionData = {
          kids: prev.body.kids,
          npsAndAps: prev.body.npsAndAps,
          complement: prev.body.complement || r.content,
        };
        const errors: T.ParseError[] = prev.body.complement
          ? [{ message: "second complement not allowed" }]
          : [];
        return keepGoing(returnParseResultSingle(tkns, d, r.position, errors));
      }
      assertNever(r.content, "unknown parse result");
    });
  };
}
