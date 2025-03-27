import * as T from "../../../../types";
import { parseKidsSection } from "./../parse-kids-section";
import { parseNPAP } from "./parse-npap";
import { bindParseResult, returnParseResultSingle } from "./../utils";
import { parseComplement } from "./parse-complement";
import { assertNever } from "../../misc-helpers";

type ArgSectionData = {
  kids: { position: number; section: T.ParsedKid[] }[];
  npsAndAps: (T.ParsedNP | T.APSelection)[];
  complement: T.ParsedComplementSelection | undefined;
};

export function parseArgumentSection(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<ArgSectionData>[] {
  if (tokens.length === 0) {
    return [];
  }
  // at each stage - we need to also return an option to stop
  return parseArgSectR(dictionary)({
    tokens,
    body: {
      kids: [],
      npsAndAps: [],
      complement: undefined,
    },
    errors: [],
  });
}

function parseArgSectR(dictionary: T.DictionaryAPI) {
  return function (
    prev: T.ParseResult<ArgSectionData>
  ): T.ParseResult<ArgSectionData>[] {
    const baseResults = [
      ...parseNPAP(prev.tokens, dictionary),
      ...parseKidsSection(prev.tokens, []),
    ];
    const withComp: T.ParseResult<
      | T.APSelection
      | T.ParsedNP
      | T.ParsedKidsSection
      | T.ParsedComplementSelection
    >[] = [
      ...baseResults,
      ...(baseResults.length ? parseComplement(prev.tokens, dictionary) : []),
    ];
    if (withComp.length === 0) {
      return [prev];
    }
    function returnAndKeepGoing(res: T.ParseResult<ArgSectionData>) {
      return [res, ...parseArgSectR(dictionary)(res)];
    }
    // TODO: is it safer or more confusing to use the shadow var name tokens here?
    return bindParseResult(withComp, (tkns, r) => {
      if (r.type === "AP" || r.type === "NP") {
        const d: ArgSectionData = {
          kids: prev.body.kids,
          npsAndAps: [...prev.body.npsAndAps, r],
          complement: prev.body.complement,
        };
        return returnAndKeepGoing(returnParseResultSingle(tkns, d));
      }
      if (r.type === "kids") {
        const position = prev.body.npsAndAps.length;
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
        return returnAndKeepGoing(returnParseResultSingle(tkns, d, errors));
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
        return returnAndKeepGoing(returnParseResultSingle(tkns, d, errors));
      }
      assertNever(r, "unknown parse result");
    });
  };
}
