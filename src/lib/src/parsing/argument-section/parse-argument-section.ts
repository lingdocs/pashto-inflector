import * as T from "../../../../types";
import { parseKidsSection } from "./../parse-kids-section";
import { parseNPAP } from "./parse-npap";
import { bindParseWithAllErrors, returnParseResultSingle } from "./../utils";
import { parseComplement } from "./parse-complement";
import { assertNever } from "../../misc-helpers";

type ArgSectionData = {
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
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
): T.ParseResult<ArgSectionData>[] {
  if (tokens.length === 0) {
    return [];
  }
  return [
    // also give an option to keep parsing without an argument section
    returnParseResultSingle(tokens, empty),
    ...parseArgSectR(dictionary)({
      tokens,
      body: empty,
      errors: [],
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
      if (r.type === "AP" || r.type === "NP") {
        const d: ArgSectionData = {
          kids: prev.body.kids,
          npsAndAps: [...prev.body.npsAndAps, r],
          complement: prev.body.complement,
        };
        return keepGoing(returnParseResultSingle(tkns, d));
      }
      if (r.type === "kids") {
        const position = prev.body.npsAndAps.length + +!!prev.body.complement;
        const errors =
          position === 1 ? [] : [{ message: "kid's section out of place" }];
        const d: ArgSectionData = {
          kids: [
            ...prev.body.kids,
            {
              position,
              section: r.kids,
            },
          ],
          npsAndAps: prev.body.npsAndAps,
          complement: prev.body.complement,
        };
        return keepGoing(returnParseResultSingle(tkns, d, errors));
      }
      if (r.type === "complement") {
        const d: ArgSectionData = {
          kids: prev.body.kids,
          npsAndAps: prev.body.npsAndAps,
          complement: prev.body.complement || r,
        };
        const errors: T.ParseError[] = prev.body.complement
          ? [{ message: "second complement not allowed" }]
          : [];
        return keepGoing(returnParseResultSingle(tkns, d, errors));
      }
      assertNever(r, "unknown parse result");
    });
  };
}
