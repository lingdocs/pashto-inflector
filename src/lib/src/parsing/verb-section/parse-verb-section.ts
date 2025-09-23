import * as T from "../../../../types";
import {
  parseKidsSection,
  parseOptKidsSection,
  unambiguousKids,
} from "../parse-kids-section";
import {
  bindParser,
  bindParseResult,
  bindParserToEvaluator,
  bindParseWithAllErrors,
  filterParser,
  isPH,
  mapParser,
  nulPosFromTokens,
  parserCombOr,
  parserCombSucc3,
  returnParseResult,
  returnParseResultSingle,
  tokensExist,
} from "../utils";
import { parseEquative } from "./parse-equative";
import { parseKawulKedulVBE } from "./parse-kawul-kedul-vbe";
import { parseNeg, parseOptNeg } from "./parse-negative";
import { parsePH } from "./parse-ph";
import { getInfoFromV } from "./vblock-tools";
import { isKedulStat } from "./parse-verb-helpers";
import { parseVerbX } from "./parse-verb-x";
import { parseVBBBasic, parseVBPBasic } from "./parse-vb-base";

export type VerbSectionData = {
  blocks: T.ParsedVerbSectionBlock[];
  kids: {
    position: number;
    section: T.ParsedKid[];
  }[];
};

export type VerbSectionFrontData = {
  front: (T.ParsedPH | T.NegativeBlock)[];
  kids: VerbSectionData["kids"];
};

// Front section is the PH and Negs in Front
// then
// Possible Combos in Rear
//
// Basic VBE
//   [VBE]
//
// Ability/Perfect
//
//   1) basic
//   [VBP] + [NEG]? + [Aux]
//   2) flipped with neg
//   [NEG] + [Aux] + [VBP]

// Ability
// VBP is Ability, Aux is StatAux
// w/ Perfect
// VBP is PastPart, Aux is Equative

// TODO: DO A TOTAL REFACTOR TO PARSER COMBINATORS - THEN COMPARE THIS WITH THE OLD VERSION WITHOUT THE PARSER COMBINATORS

export const parseVerbSection: T.Parser<VerbSectionData> = bindParser(
  parseVerbSectionFront,
  parseVerbSectionRear,
);

function parseVerbSectionFront(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<VerbSectionFrontData>[] {
  function go(
    dictionary: T.DictionaryAPI,
    prev: T.ParseResult<VerbSectionFrontData>,
  ): T.ParseResult<VerbSectionFrontData>[] {
    if (!tokensExist(prev.tokens)) {
      return [prev];
    }
    const position = prev.body.front.length;
    const allResults: T.ParseResult<
      T.ParsedPH | T.NegativeBlock | T.ParsedKidsSection
    >[] = [
      ...(prev.body.front.some(isPH) ? [] : parsePH(prev.tokens, dictionary)),
      ...(prev.body.front.some((x) => x.type === "negative")
        ? []
        : parseNeg(prev.tokens)),
      // don't try to parse a kids section again if we just had one, otherwise you get
      // unneccessary varients of kids' sections like ["ba", "me"] and ["ba"] ["me"]
      ...(prev.body.kids.at(-1)?.position === position
        ? []
        : parseKidsSection(prev.tokens, [], [])),
    ];
    if (!allResults.length) {
      return [prev];
    }
    return bindParseResult(allResults, (tkns, block) => {
      if (block.content.type === "kids") {
        const kids = block.content.kids;
        return [
          ...go(
            dictionary,
            returnParseResultSingle(
              tkns,
              {
                ...prev.body,
                kids: addKids(prev.body.kids, position, block.content),
              },
              { start: prev.position.start, end: block.position.end },
              prev.errors,
            ),
          ),
          // also have the kid's secion not parsed if there's some ambiguity if they were kids or not
          // like with 'ye' etc.
          ...(!unambiguousKids.some((x) => kids.includes(x as T.ParsedKid))
            ? [prev]
            : []),
        ];
      }
      // if block was PH return version with ph parsed, and also return version
      // with leaving it for the verb ahead
      return [
        ...(isPH(block.content) ? [prev] : []),
        ...go(
          dictionary,
          returnParseResultSingle(
            tkns,
            {
              ...prev.body,
              front: [...prev.body.front, block.content],
            },
            {
              start: prev.position.start,
              end: block.position.end,
            },
          ),
        ),
      ];
    });
  }
  return go(
    dictionary,
    returnParseResultSingle(
      tokens,
      { front: [], kids: [] },
      nulPosFromTokens(tokens),
    ),
  );
}

function parseVerbSectionRear(
  front: T.WithPos<VerbSectionFrontData>,
): T.Parser<VerbSectionData> {
  const contentParser = filterParser(
    parserCombSucc3(
      parserCombOr(
        [
          parseBasicTense(front.content),
          parseAbilityOrPerfect(front.content),
          parseEquativeSection(front.content),
        ],
        { keepErrors: true },
      ),
      parseOptKidsSection,
      parseOptNeg,
    ),
    ({ tokens }) => !tokensExist(tokens),
  );
  return bindParserToEvaluator(contentParser, evalVerbSectionRear);
}

function evalVerbSectionRear(
  rearData: T.WithPos<
    [
      T.WithPos<VerbSectionData>,
      T.WithPos<T.ParsedKidsSection | undefined>,
      T.WithPos<T.NegativeBlock | undefined>,
    ]
  >,
): T.EvaluatorResult<VerbSectionData>[] {
  const rear = rearData.content[0];
  const kids = rearData.content[1];
  const nu = rearData.content[2];
  const blocks = removeExtraPHFromPassiveDoubleW([
    ...rear.content.blocks,
    ...(nu.content ? [nu.content] : []),
  ]);
  return [
    {
      body: {
        blocks,
        kids: addKids(
          rear.content.kids,
          rear.content.blocks.length,
          kids.content,
        ),
      },
      errors: checkNegErrors(blocks),
    },
  ];
}

function parseEquativeSection(
  front: VerbSectionFrontData,
): T.Parser<VerbSectionData> {
  return front.front.find(isPH)
    ? () => []
    : mapParser(
        (eq): VerbSectionData => ({
          blocks: [
            ...front.front,
            {
              type: "parsed vbb aux",
              content: eq,
            },
          ],
          kids: front.kids,
        }),
        parseEquative,
      );
}

function parseBasicTense(
  front: VerbSectionFrontData,
): T.Parser<VerbSectionData> {
  return function (
    tokens: T.Tokens,
    dictionary: T.DictionaryAPI,
  ): T.ParseResult<VerbSectionData>[] {
    const ph = front.front.find(isPH);
    const vbes = parseVerbX(ph, parseVBBBasic, "basic")(tokens, dictionary);
    return bindParseWithAllErrors(vbes, (tkns, vbe) => {
      // TODO: or pass this in as on option to parseVBE so that we only get the plain VBE
      if (getInfoFromV(vbe.content).type !== "verb") {
        return [];
      }
      const blocks = [...front.front, vbe.content];
      return returnParseResult<VerbSectionData>(
        tkns,
        {
          ...front,
          blocks,
        },
        { start: tokens.position, end: vbe.position.end },
      );
    });
  };
}

function parseAbilityOrPerfect(
  front: VerbSectionFrontData,
): T.Parser<VerbSectionData> {
  const neg = front.front.some((x) => x.type === "negative");
  const ph = front.front.some(isPH);
  return parserCombOr([
    ...(neg ? [parseFlippedAbilityOrPerfect(front)] : []),
    ...((neg && ph) || !neg ? [parseStraightAbilityOrPerfect(front)] : []),
  ]);
}

function parseStraightAbilityOrPerfect(
  front: VerbSectionFrontData,
): T.Parser<VerbSectionData> {
  const ph = front.front.find(isPH);
  const verbXs = parserCombOr(
    (["ability", "perfect"] as const).map((category) =>
      parseVerbX(ph, parseVBPBasic(category), category),
    ),
  );
  return bindParser(
    parserCombSucc3(verbXs, parseOptKidsSection, parseOptNeg),
    parseAuxAtEndOfStraightAbilityOrPerfect(front),
  );
}

function parseAuxAtEndOfStraightAbilityOrPerfect(front: VerbSectionFrontData) {
  return function (
    r: T.WithPos<
      [
        T.WithPos<T.ParsedV<T.ParsedVBP>>,
        T.WithPos<T.ParsedKidsSection | undefined>,
        T.WithPos<T.NegativeBlock | undefined>,
      ]
    >,
  ): T.Parser<VerbSectionData> {
    return function (tokens: T.Tokens): T.ParseResult<VerbSectionData>[] {
      const vbp = r.content[0];
      const kids1 = r.content[1];
      const neg = r.content[2];
      const position = front.front.length + 1;
      const auxRes: T.ParseResult<T.ParsedVBB>[] =
        getInfoFromV(vbp.content).type === "ppart"
          ? parseEquative(tokens)
          : parseKawulKedulVBE(tokens, undefined).filter((x) =>
              isStatAuxVBE(x.body),
            );
      return bindParseResult(auxRes, (tkns, aux) => {
        return [
          {
            tokens: tkns,
            body: {
              blocks: [
                ...front.front,
                vbp.content,
                ...(neg.content ? [neg.content] : []),
                { type: "parsed vbb aux", content: aux.content },
              ],
              kids: addKids(front.kids, position, kids1.content),
            },
            position: { start: r.position.start, end: aux.position.end },
            errors: [],
          },
        ];
      });
    };
  };
}

function parseFlippedAbilityOrPerfect(
  front: VerbSectionFrontData,
): T.Parser<VerbSectionData> {
  return function (
    tokens: T.Tokens,
    dictionary: T.DictionaryAPI,
  ): T.ParseResult<VerbSectionData>[] {
    if (!tokensExist(tokens)) {
      return [];
    }
    const ph = front.front.find(isPH);
    const auxs: T.ParseResult<T.ParsedVBBVerb | T.ParsedVBBEq>[] = [
      ...(ph ? [] : parseEquative(tokens)),
      // ph here is saved for the ability stem, not used for aux
      ...parseKawulKedulVBE(tokens, undefined).filter((x) =>
        isStatAuxVBE(x.body),
      ),
    ];
    return bindParseResult(auxs, (tkns, aux) => {
      const kidsRes = parseOptKidsSection(tkns);
      return bindParseResult(kidsRes, (tkns2, kids) => {
        const position = front.front.length + 1;
        const category =
          aux.content.info.type === "equative" ? "perfect" : "ability";
        const res = parseVerbX(
          ph,
          parseVBPBasic(category),
          category,
        )(tkns2, dictionary);
        return bindParseResult(res, (tkns3, vbp) => {
          return [
            {
              tokens: tkns3,
              body: {
                blocks: [
                  ...front.front,
                  { type: "parsed vbb aux", content: aux.content },
                  vbp.content,
                ],
                kids: addKids(front.kids, position, kids.content),
              } satisfies VerbSectionData,
              position: { start: tokens.position, end: vbp.position.end },
              errors: [],
            },
          ];
        });
      });
    });
  };
}

function addKids(
  prev: VerbSectionData["kids"],
  position: number,
  toAdd: T.ParsedKidsSection | undefined,
): VerbSectionData["kids"] {
  if (!toAdd) {
    return prev;
  }
  return [
    ...prev,
    {
      position,
      section: toAdd.kids,
    },
  ];
}

function isStatAuxVBE(x: T.ParsedVBBVerb): boolean {
  return (
    isKedulStat(x.info.verb) &&
    x.info.aspect === "perfective" &&
    !x.info.imperative
  );
}

function checkNegErrors(blocks: T.ParsedVerbSectionBlock[]): T.ParseError[] {
  const errors: T.ParseError[] = [];
  const negs = blocks.filter((x) => x.type === "negative");
  const ph = blocks.find(isPH);
  if (negs.length > 1) {
    errors.push({
      message: `only one negative allowed, you used ${negs.length}`,
    });
  }
  const vx = blocks.find((x) => x.type === "parsedV");
  const neg: T.NegativeBlock | undefined = negs[0];
  // for equative phrases
  if (!vx) {
    if (neg !== undefined) {
      const negIndex = blocks.findIndex((x) => x.type === "negative");
      const vbbAuxIndex = blocks.findIndex((x) => x.type === "parsed vbb aux");
      if (vbbAuxIndex === -1) {
        throw new Error(`no vx or vbbAux found while checking for negatives`);
      }
      if (vbbAuxIndex !== negIndex + 1) {
        errors.push({ message: "negative must go before the equative" });
      }
      if (neg.imperative) {
        errors.push({
          message: "with equative phrases the نه negative must be used, not مه",
        });
      }
    }
    return errors;
  }
  const vxInfo = getInfoFromV(vx);

  const isImperative = vxInfo.type === "verb" && vxInfo.imperative;
  if (neg !== undefined) {
    const negIndex = blocks.findIndex((x) => x.type === "negative");
    if (neg.imperative && isImperative !== true) {
      errors.push({
        message: "Can only use مه with imperative verbs, use نه instead",
      });
    } else if (!neg.imperative && isImperative === true) {
      errors.push({
        message: "Imperative verbs must be used with the مه negative, not نه",
      });
    }

    // only imperfective simple VBE constructions can have the negative at the end
    if (blocks.length > 2 && negIndex === blocks.length - 1) {
      errors.push({
        message:
          "negative cannot go at the end of ability/perfect verb section",
      });
    }
    if (ph) {
      // not checking it with the ability ones because it was already sort of enforced
      // by the flipped/non flipped ability / perfect parsing pattern
      // but it might be good to do something a little more robust here
      if (ph.type === "CompPH" && vxInfo.type !== "ability") {
        if (negIndex !== 1) {
          errors.push({
            message:
              "negative block should come after complement perfective head",
          });
        }
      } else if (ph.type === "PH") {
        if (ph.s === "و") {
          if (negIndex !== 1) {
            errors.push({ message: "negative must come after و" });
          }
        } else {
          // with other non-oo PHs the negative can go before or after the PH
          if (negIndex !== 0 && negIndex !== 1) {
            errors.push({ message: "negative out of place" });
          }
        }
      }
    }
  }
  return errors;
}

function removeExtraPHFromPassiveDoubleW(
  blocks: T.ParsedVerbSectionBlock[],
): T.ParsedVerbSectionBlock[] {
  if (
    blocks.some(
      (x) => x.type === "parsedV" && x.content.type === "passive doub welded",
    )
  ) {
    return blocks.filter((x) => !isPH(x));
  }
  return blocks;
}
