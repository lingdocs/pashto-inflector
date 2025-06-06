// import { zip } from "rambda";
import * as T from "../../../../types";
import { parseKidsSection, parseOptKidsSection } from "../parse-kids-section";
import {
  bindParseResult,
  getInfo,
  isNeg,
  isParsedVBE,
  // isNonOoPh,
  // isParsedVBE,
  // isParsedVBP,
  isPH,
  returnParseResult,
  returnParseResultSingle,
} from "../utils";
import { parseEquative } from "./parse-equative";
import { parseKawulKedulVBE } from "./parse-kawul-kedul-vbe";
import { parseNeg, parseOptNeg } from "./parse-negative";
import { parsePH } from "./parse-ph";
import { parseVBE } from "./parse-vbe";
import { parseAbility, parsePastPart, parseVBP } from "./parse-vbp";
import { isKedulStat } from "./parse-verb-helpers";
// import {
//   isKedulDynEntry,
//   isKedulStat,
//   isKedulStatEntry,
// } from "./parse-verb-helpers";

export type VerbSectionBlock =
  | T.ParsedPH
  | T.ParsedVBE
  | T.ParsedVBP
  | T.NegativeBlock;

export type VerbSectionData = {
  blocks: VerbSectionBlock[];
  kids: {
    position: number;
    section: T.ParsedKid[];
  }[];
};

export type VerbSectionFrontData = {
  front: (T.ParsedPH | T.NegativeBlock)[];
  kids: VerbSectionData["kids"],
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

// w/ Ability
// VBP is Ability, Aux is StatAux
// w/ Perfect
// VBP is PastPart, Aux is Equative

export function parseVerbSection(
  tokens: readonly T.Token[],
  dictionary: T.DictionaryAPI
): T.ParseResult<VerbSectionData>[] {
  if (tokens.length === 0) {
    return [];
  }
  const fronts = parseVerbSectionFront(dictionary, returnParseResultSingle(tokens, {
    front: [],
    kids: [],
  }));
  return bindParseResult(fronts, (tkns, front) => parseVerbSectionRear(front)(tkns, dictionary));
}

function parseVerbSectionFront(dictionary: T.DictionaryAPI, prev: T.ParseResult<VerbSectionFrontData>): T.ParseResult<VerbSectionFrontData>[] {
  if (!prev.tokens.length) {
    return [prev];
  }
  const allResults: T.ParseResult<T.ParsedPH | T.NegativeBlock | T.ParsedKidsSection>[] = [
    ...prev.body.front.some(isPH) ? [] : parsePH(prev.tokens, dictionary),
    ...prev.body.front.some(isNeg) ? [] : parseNeg(prev.tokens),
    ...parseKidsSection(prev.tokens, [], []),
  ];
  if (!allResults.length) {
    return [prev];
  }
  return bindParseResult(allResults, (tkns, block) => {
    if (block.type === "kids") {
      const position = prev.body.front.length;
      return parseVerbSectionFront(dictionary, returnParseResultSingle(
        tkns,
        {
          ...prev.body,
          kids: addKids(prev.body.kids, position, block),
        },
        prev.errors
      ));
    }
    // if block was PH return version with ph parsed, and also return version 
    // with leaving it for the verb ahead
    return [
      ...isPH(block) ? [prev] : [],
      ...parseVerbSectionFront(dictionary, returnParseResultSingle(
        tkns,
        {
          ...prev.body,
          front: [
            ...prev.body.front,
            block,
          ],
        }
      )),
    ]
  })
}

function parseVerbSectionRear(front: VerbSectionFrontData) {
  return function(tokens: readonly T.Token[], dictionary: T.DictionaryAPI): T.ParseResult<VerbSectionData>[] {
    if (tokens.length === 0) {
      return [];
    }
    const res = [
      ...parsePlainVBE(tokens, dictionary, front),
      ...parseAbilityOrPerfect(tokens, dictionary, front),
    ];
    // TODO: some kind of do notation would be nice!
    return bindParseResult(res, (tkns, rear) => {
      const trailingKids = parseOptKidsSection(tkns);
      return bindParseResult(trailingKids, (tkns2, kids) => {
        const trailingNu = parseOptNeg(tkns2);
        return bindParseResult(trailingNu, (tkns3, nu) => {
          const blocks = [...rear.blocks, ...nu ? [nu] : []];
          return returnParseResult(tkns3, {
            blocks,
            kids: addKids(rear.kids, rear.blocks.length, kids),
          }, checkNegErrors(blocks));
        })
      });
    })
  }
}


function parsePlainVBE(tokens: readonly T.Token[], dictionary: T.DictionaryAPI, front: VerbSectionFrontData): T.ParseResult<VerbSectionData>[] {
  const results = parseVBE(tokens, dictionary, front.front.find(isPH));
  return bindParseResult(results, (tkns, vbe) => {
    // TODO: or pass this in as on option to parseVBE so that we only get the plain VBE
    if (getInfo(vbe).type !== "verb") {
      return [];
    }
    const blocks = [...front.front, vbe];
    return returnParseResult<VerbSectionData>(tkns, {
      ...front,
      blocks,
    })
  })
}

function parseAbilityOrPerfect(tokens: readonly T.Token[], dictionary: T.DictionaryAPI, front: VerbSectionFrontData): T.ParseResult<VerbSectionData>[] {
  const neg = front.front.some(isNeg);
  const ph = front.front.some(isPH);
  return [
    ...neg ? parseFlippedAbilityOrPerfect(tokens, dictionary, front) : [],
    ...(neg && ph) || !neg ? parseStraightAbilityOrPerfect(tokens, dictionary, front) : [],
  ];
}

function parseStraightAbilityOrPerfect(tokens: readonly T.Token[], dictionary: T.DictionaryAPI, front: VerbSectionFrontData): T.ParseResult<VerbSectionData>[] {
  const vbps = parseVBP(tokens, dictionary, front.front.find(isPH));
  return bindParseResult<T.ParsedVBP, VerbSectionData>(vbps, (tkns, vbp) => {
    const kidsR2 = parseOptKidsSection(tkns);
    return bindParseResult(kidsR2, (tkns2, kids1) => {
      const position = front.front.length + 1;
      const negs = parseOptNeg(tkns2);
      return bindParseResult(negs, (tkns3, neg) => {
        const kidsR2 = parseOptKidsSection(tkns3);
        return bindParseResult(kidsR2, (tkns4, kids2) => {
          const position2 = position + negs.length;
          const auxRes = vbp.info.type === "ppart"
            ? parseEquative(tkns4)
            : parseKawulKedulVBE(tkns4, undefined).filter(x => isStatAuxVBE(x.body));
          return bindParseResult(auxRes, (tkns5, aux) => {
            return [{
              tokens: tkns5,
              body: {
                blocks: [...front.front, vbp, ...neg ? [neg] : [], aux],
                kids:
                  addKids(
                    addKids(front.kids, position, kids1),
                    position2,
                    kids2
                  ),
              },
              errors: [],
            }]
          })
        })
      })
    })
  })
}


function parseFlippedAbilityOrPerfect(tokens: readonly T.Token[], dictionary: T.DictionaryAPI, front: VerbSectionFrontData): T.ParseResult<VerbSectionData>[] {
  const ph = front.front.find(isPH);
  const auxs = [
    ...ph ? [] : parseEquative(tokens),
    // ph here is saved for the ability stem, not used for aux
    ...parseKawulKedulVBE(tokens, undefined).filter(x => isStatAuxVBE(x.body)),
  ];
  const res: T.ParseResult<VerbSectionData>[] = bindParseResult(auxs, (tkns, aux) => {
    const kidsRes = parseOptKidsSection(tkns);
    return bindParseResult(kidsRes, (tkns2, kids) => {
      const position = front.front.length + 1;
      const res = aux.type === "welded"
        ? []
        : aux.info.type === "equative"
          ? parsePastPart(tkns2, dictionary)
          : parseAbility(tkns2, dictionary, ph)
      return bindParseResult(res, (tkns3, vbp) => {
        return [{
          tokens: tkns3,
          body: {
            blocks: [...front.front, aux, vbp],
            kids: addKids(front.kids, position, kids),
          },
          errors: [],
        }];
      })
    })
  })
  return res;
}

function addKids(prev: VerbSectionData["kids"], position: number, toAdd: T.ParsedKidsSection | undefined): VerbSectionData["kids"] {
  if (!toAdd) {
    return prev;
  }
  return [
    ...prev,
    {
      position,
      section: toAdd.kids,
    }
  ]
}

function isStatAuxVBE(x: T.ParsedVB): boolean {
  return x.type === "VB" && x.info.type === "verb" && isKedulStat(x.info.verb) && x.info.aspect === "perfective" && !x.info.imperative
}

function checkNegErrors(blocks: VerbSectionBlock[]): T.ParseError[] {
  const errors: T.ParseError[] = [];
  const negs = blocks.filter(x => x.type === "negative");
  const ph = blocks.find(isPH);
  if (negs.length > 1) {
    errors.push({ message: `only one negative allowed, you used ${negs.length}` });
  }
  const vbe = blocks.find(isParsedVBE);
  const neg = negs[0];
  const isImperative = vbe?.type === "VB" && vbe?.info.type === "verb" && vbe.info.imperative;
  if (neg) {

    const negIndex = blocks.findIndex(x => x.type === "negative");
    if (neg.imperative && !isImperative) {
      errors.push({ message: "Can only use مه with imperative verbs, use نه instead" });
    } else if (!neg.imperative && isImperative) {
      errors.push({ message: "Imperative verbs must be used with the مه negative, not نه" })
    }

    // only imperfective simple VBE constructions can have the negative at the end
    if (blocks.length > 2 && negIndex === blocks.length - 1) {
      errors.push({ message: "negative cannot go at the end of ability/perfect verb section" });
    }
    if (ph) {
      if (ph.type === "CompPH") {
        if (negIndex !== 1) {
          errors.push({ message: "negative block should come after complement perfective head" });
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
