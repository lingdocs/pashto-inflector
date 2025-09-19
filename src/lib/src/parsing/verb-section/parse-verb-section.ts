import * as T from "../../../../types";
import {
  parseKidsSection,
  parseOptKidsSection,
  unambiguousKids,
} from "../parse-kids-section";
import {
  bindParseResult,
  bindParseWithAllErrors,
  isPH,
  nulPosFromTokens,
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

export function parseVerbSection(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<VerbSectionData>[] {
  if (!tokensExist(tokens)) {
    return [];
  }
  const fronts = parseVerbSectionFront(
    dictionary,
    returnParseResultSingle(
      tokens,
      {
        front: [],
        kids: [],
      },
      nulPosFromTokens(tokens),
    ),
  );
  return bindParseResult(fronts, (tkns, front) =>
    parseVerbSectionRear(front)(tkns, dictionary),
  );
}

function parseVerbSectionFront(
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
        ...parseVerbSectionFront(
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
      ...parseVerbSectionFront(
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

function parseVerbSectionRear(front: T.WithPos<VerbSectionFrontData>) {
  return function (
    tokens: T.Tokens,
    dictionary: T.DictionaryAPI,
  ): T.ParseResult<VerbSectionData>[] {
    if (!tokensExist(tokens)) {
      return [];
    }
    const basic = parseBasicTense(tokens, dictionary, front.content);
    const abilPerf = parseAbilityOrPerfect(tokens, dictionary, front.content);
    const equative = parseEquativeSection(tokens, front.content);
    const res = [...basic, ...abilPerf, ...equative];
    // TODO: some kind of do notation would be nice!
    return bindParseResult(res, (tkns, rear) => {
      const trailingKids = parseOptKidsSection(tkns);
      return bindParseResult(trailingKids, (tkns2, kids) => {
        const trailingNu = parseOptNeg(tkns2);
        return bindParseResult(trailingNu, (tkns3, nu) => {
          const blocks = removeExtraPHFromPassiveDoubleW([
            ...rear.content.blocks,
            ...(nu.content ? [nu.content] : []),
          ]);
          return returnParseResult(
            tkns3,
            {
              blocks,
              kids: addKids(
                rear.content.kids,
                rear.content.blocks.length,
                kids.content,
              ),
            },
            { start: tokens.position, end: nu.position.end },
            checkNegErrors(blocks),
          ).filter((x) => !tokensExist(x.tokens));
        });
      });
    });
  };
}

function parseEquativeSection(
  tokens: T.Tokens,
  front: VerbSectionFrontData,
): T.ParseResult<VerbSectionData>[] {
  if (!tokensExist(tokens)) {
    return [];
  }
  if (front.front.find(isPH)) {
    return [];
  }
  const eqs = parseEquative(tokens);
  return bindParseResult(eqs, (tkns2, eq) => {
    return returnParseResult(
      tkns2,
      {
        blocks: [
          ...front.front,
          {
            type: "parsed vbb aux",
            content: eq.content,
          },
        ],
        kids: front.kids,
      },
      { start: tokens.position, end: eq.position.end },
    );
  });
}

function parseBasicTense(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
  front: VerbSectionFrontData,
): T.ParseResult<VerbSectionData>[] {
  const ph = front.front.find(isPH);
  const vbes = parseVerbX(tokens, dictionary, ph, parseVBBBasic, "basic");
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
}

function parseAbilityOrPerfect(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
  front: VerbSectionFrontData,
): T.ParseResult<VerbSectionData>[] {
  const neg = front.front.some((x) => x.type === "negative");
  const ph = front.front.some(isPH);
  return [
    ...(neg ? parseFlippedAbilityOrPerfect(tokens, dictionary, front) : []),
    ...((neg && ph) || !neg
      ? parseStraightAbilityOrPerfect(tokens, dictionary, front)
      : []),
  ];
}

function parseStraightAbilityOrPerfect(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
  front: VerbSectionFrontData,
): T.ParseResult<VerbSectionData>[] {
  const ph = front.front.find(isPH);
  const vbps = (["ability", "perfect"] as const).flatMap((category) =>
    parseVerbX(tokens, dictionary, ph, parseVBPBasic(category), category),
  );
  return bindParseResult<T.ParsedV<T.ParsedVBP>, VerbSectionData>(
    vbps,
    (tkns, vbp) => {
      const kidsR1 = parseOptKidsSection(tkns);
      return bindParseResult(kidsR1, (tkns2, kids1) => {
        const position = front.front.length + 1;
        const negs = parseOptNeg(tkns2);
        return bindParseResult(negs, (tkns3, neg) => {
          const auxRes: T.ParseResult<T.ParsedVBB>[] =
            getInfoFromV(vbp.content).type === "ppart"
              ? parseEquative(tkns3)
              : parseKawulKedulVBE(tkns3, undefined).filter((x) =>
                  isStatAuxVBE(x.body),
                );
          return bindParseResult(auxRes, (tkns5, aux) => {
            return [
              {
                tokens: tkns5,
                body: {
                  blocks: [
                    ...front.front,
                    vbp.content,
                    ...(neg.content ? [neg.content] : []),
                    { type: "parsed vbb aux", content: aux.content },
                  ],
                  kids: addKids(front.kids, position, kids1.content),
                },
                position: { start: tokens.position, end: aux.position.end },
                errors: [],
              },
            ];
          });
        });
      });
    },
  );
}

function parseFlippedAbilityOrPerfect(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
  front: VerbSectionFrontData,
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
        tkns2,
        dictionary,
        ph,
        parseVBPBasic(category),
        category,
      );
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
  const neg = negs[0];
  // for equative phrases
  if (!vx) {
    if (neg) {
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
  if (neg) {
    const negIndex = blocks.findIndex((x) => x.type === "negative");
    if (neg.imperative && !isImperative) {
      errors.push({
        message: "Can only use مه with imperative verbs, use نه instead",
      });
    } else if (!neg.imperative && isImperative) {
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
