// import { zip } from "rambda";
import * as T from "../../../../types";
import { getTransitivity } from "../../verb-info";
import { parseKidsSection, parseOptKidsSection } from "../parse-kids-section";
import {
  bindParseResult,
  getInfo,
  isNeg,
  isParsedVBE,
  isParsedVBP,
  // isNonOoPh,
  // isParsedVBE,
  // isParsedVBP,
  isPH,
  returnParseResult,
  returnParseResults,
  returnParseResultSingle,
} from "../utils";
import { parseEquative } from "./parse-equative";
import { parseKawulKedulVBE } from "./parse-kawul-kedul-vbe";
import { parseNeg, parseOptNeg } from "./parse-negative";
import { parsePH } from "./parse-ph";
import { parseVBE } from "./parse-vbe";
import { parseVBP } from "./parse-vbp";
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
  | T.ParsedWeldedPassive
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

// w/ Ability
// VBP is Ability, Aux is StatAux
// w/ Perfect
// VBP is PastPart, Aux is Equative

export function parseVerbSection(
  tokens: readonly T.Token[],
  dictionary: T.DictionaryAPI,
): T.ParseResult<VerbSectionData>[] {
  if (tokens.length === 0) {
    return [];
  }
  const fronts = parseVerbSectionFront(
    dictionary,
    returnParseResultSingle(tokens, {
      front: [],
      kids: [],
    }),
  );
  return bindParseResult(fronts, (tkns, front) =>
    parseVerbSectionRear(front)(tkns, dictionary),
  );
}

function parseVerbSectionFront(
  dictionary: T.DictionaryAPI,
  prev: T.ParseResult<VerbSectionFrontData>,
): T.ParseResult<VerbSectionFrontData>[] {
  if (!prev.tokens.length) {
    return [prev];
  }
  const position = prev.body.front.length;
  const allResults: T.ParseResult<
    T.ParsedPH | T.NegativeBlock | T.ParsedKidsSection
  >[] = [
    ...(prev.body.front.some(isPH) ? [] : parsePH(prev.tokens, dictionary)),
    ...(prev.body.front.some(isNeg) ? [] : parseNeg(prev.tokens)),
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
    if (block.type === "kids") {
      return parseVerbSectionFront(
        dictionary,
        returnParseResultSingle(
          tkns,
          {
            ...prev.body,
            kids: addKids(prev.body.kids, position, block),
          },
          prev.errors,
        ),
      );
    }
    // if block was PH return version with ph parsed, and also return version
    // with leaving it for the verb ahead
    return [
      ...(isPH(block) ? [prev] : []),
      ...parseVerbSectionFront(
        dictionary,
        returnParseResultSingle(tkns, {
          ...prev.body,
          front: [...prev.body.front, block],
        }),
      ),
    ];
  });
}

function parseVerbSectionRear(front: VerbSectionFrontData) {
  return function (
    tokens: readonly T.Token[],
    dictionary: T.DictionaryAPI,
  ): T.ParseResult<VerbSectionData>[] {
    if (tokens.length === 0) {
      return [];
    }

    const vbes = parseVBE(tokens, dictionary, front.front.find(isPH));
    const res = [
      ...parsePlainVBE(front, vbes),
      ...parseAbilityOrPerfect(tokens, dictionary, front),
      ...parsePassive(front, vbes),
    ];
    // TODO: some kind of do notation would be nice!
    return bindParseResult(res, (tkns, rear) => {
      const trailingKids = parseOptKidsSection(tkns);
      return bindParseResult(trailingKids, (tkns2, kids) => {
        const trailingNu = parseOptNeg(tkns2);
        return bindParseResult(trailingNu, (tkns3, nu) => {
          const blocks = [...rear.blocks, ...(nu ? [nu] : [])];
          return returnParseResult(
            tkns3,
            {
              blocks,
              kids: addKids(rear.kids, rear.blocks.length, kids),
            },
            checkNegErrors(blocks),
          ).filter((x) => x.tokens.length === 0);
        });
      });
    });
  };
}

function parsePlainVBE(
  front: VerbSectionFrontData,
  vbes: T.ParseResult<T.ParsedVBE>[],
): T.ParseResult<VerbSectionData>[] {
  return bindParseResult(vbes, (tkns, vbe) => {
    // TODO: or pass this in as on option to parseVBE so that we only get the plain VBE
    if (getInfo(vbe).type !== "verb") {
      return [];
    }
    const blocks = [...front.front, vbe];
    return returnParseResult<VerbSectionData>(tkns, {
      ...front,
      blocks,
    });
  });
}

function parsePassive(
  front: VerbSectionFrontData,
  vbes: T.ParseResult<T.ParsedVBE>[],
): T.ParseResult<VerbSectionData>[] {
  return bindParseResult(vbes, (tkns, vbe) => {
    if (vbe.type === "weldedVBE") {
      return [];
    }
    if (vbe.info.type === "equative") {
      return [];
    }
    if (vbe.info.base === "stem") {
      return [];
    }
    if (vbe.info.imperative) {
      return [];
    }
    if (vbe.person !== T.Person.ThirdPlurMale) {
      return [];
    }
    const { verb, aspect } = vbe.info;
    const auxs = parseKawulKedulVBE(tkns, undefined).filter(
      (x) => x.body.info.type === "verb" && isKedulStat(x.body.info.verb),
    );
    return bindParseResult(auxs, (tkns2, aux) => {
      // for type safety
      if (aux.info.type !== "verb") {
        return [];
      }
      const errors: T.ParseError[] = [];
      if (getTransitivity(verb.entry) === "intransitive") {
        errors.push({
          message: `intransitive verbs cannot be used with the passive form`,
        });
      }
      if (aux.info.aspect !== aspect) {
        errors.push({
          message: `${aspect} passive requires ${aspect} auxilary kedul verb`,
        });
      }
      const passive: T.ParsedWeldedPassive = {
        type: "weldedPassive",
        left: {
          type: "passiveLeft",
          verb,
        },
        right: {
          type: "parsedRightVBE",
          info: aux.info,
          person: aux.person,
        },
      };
      const blocks = [...front.front, passive];
      return returnParseResults(
        tkns2,
        [
          {
            ...front,
            blocks,
          },
        ],
        errors,
      );
    });
  });
}

function parseAbilityOrPerfect(
  tokens: readonly T.Token[],
  dictionary: T.DictionaryAPI,
  front: VerbSectionFrontData,
): T.ParseResult<VerbSectionData>[] {
  const neg = front.front.some(isNeg);
  const ph = front.front.some(isPH);
  return [
    ...(neg ? parseFlippedAbilityOrPerfect(tokens, dictionary, front) : []),
    ...((neg && ph) || !neg
      ? parseStraightAbilityOrPerfect(tokens, dictionary, front)
      : []),
  ];
}

function parseStraightAbilityOrPerfect(
  tokens: readonly T.Token[],
  dictionary: T.DictionaryAPI,
  front: VerbSectionFrontData,
): T.ParseResult<VerbSectionData>[] {
  const vbps = parseVBP(tokens, dictionary, front.front.find(isPH), "either");
  return bindParseResult<T.ParsedVBP, VerbSectionData>(vbps, (tkns, vbp) => {
    const kidsR1 = parseOptKidsSection(tkns);
    return bindParseResult(kidsR1, (tkns2, kids1) => {
      const position = front.front.length + 1;
      const negs = parseOptNeg(tkns2);
      return bindParseResult(negs, (tkns3, neg) => {
        const auxRes = isPPartVBP(vbp)
          ? parseEquative(tkns3)
          : parseKawulKedulVBE(tkns3, undefined).filter((x) =>
              isStatAuxVBE(x.body),
            );
        return bindParseResult(auxRes, (tkns5, aux) => {
          return [
            {
              tokens: tkns5,
              body: {
                blocks: [...front.front, vbp, ...(neg ? [neg] : []), aux],
                kids: addKids(front.kids, position, kids1),
              },
              errors: [],
            },
          ];
        });
      });
    });
  });
}

export function isPPartVBP(vbp: T.ParsedVBP): boolean {
  const info = vbp.type === "VB" ? vbp.info : vbp.right.info;
  return info.type === "ppart";
}

function parseFlippedAbilityOrPerfect(
  tokens: readonly T.Token[],
  dictionary: T.DictionaryAPI,
  front: VerbSectionFrontData,
): T.ParseResult<VerbSectionData>[] {
  const ph = front.front.find(isPH);
  const auxs = [
    ...(ph ? [] : parseEquative(tokens)),
    // ph here is saved for the ability stem, not used for aux
    ...parseKawulKedulVBE(tokens, undefined).filter((x) =>
      isStatAuxVBE(x.body),
    ),
  ];
  const res: T.ParseResult<VerbSectionData>[] = bindParseResult(
    auxs,
    (tkns, aux) => {
      const kidsRes = parseOptKidsSection(tkns);
      return bindParseResult(kidsRes, (tkns2, kids) => {
        const position = front.front.length + 1;
        const res =
          aux.type === "weldedVBE"
            ? []
            : parseVBP(
                tkns2,
                dictionary,
                ph,
                aux.info.type === "equative" ? "ppart" : "ability",
              );
        return bindParseResult(res, (tkns3, vbp) => {
          return [
            {
              tokens: tkns3,
              body: {
                blocks: [...front.front, aux, vbp],
                kids: addKids(front.kids, position, kids),
              },
              errors: [],
            },
          ];
        });
      });
    },
  );
  return res;
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

function isStatAuxVBE(x: T.ParsedVB): boolean {
  return (
    x.type === "VB" &&
    x.info.type === "verb" &&
    isKedulStat(x.info.verb) &&
    x.info.aspect === "perfective" &&
    !x.info.imperative
  );
}

function checkNegErrors(blocks: VerbSectionBlock[]): T.ParseError[] {
  const errors: T.ParseError[] = [];
  const negs = blocks.filter((x) => x.type === "negative");
  const ph = blocks.find(isPH);
  if (negs.length > 1) {
    errors.push({
      message: `only one negative allowed, you used ${negs.length}`,
    });
  }
  const vbe = blocks.find(isParsedVBE);
  const vbp = blocks.find(isParsedVBP);
  const neg = negs[0];
  const isImperative =
    vbe?.type === "VB" && vbe?.info.type === "verb" && vbe.info.imperative;
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
      if (
        ph.type === "CompPH" &&
        (!vbp || (vbp && getInfo(vbp).type !== "ability"))
      ) {
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
