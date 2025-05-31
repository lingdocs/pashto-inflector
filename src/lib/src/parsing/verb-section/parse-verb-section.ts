// import { zip } from "rambda";
import * as T from "../../../../types";
import { parseKidsSection, parseOptKidsSection } from "../parse-kids-section";
import {
  bindParseResult,
  isNeg,
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
import { isStatAux } from "./parse-verb-helpers";
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
    return [
      ...parsePlainVBE(tokens, dictionary, front),
      ...parseAbilityOrPerfect(tokens, dictionary, front),
    ];
  }
}

function parsePlainVBE(tokens: readonly T.Token[], dictionary: T.DictionaryAPI, front: VerbSectionFrontData): T.ParseResult<VerbSectionData>[] {
  const results = parseVBE(tokens, dictionary, front.front.find(isPH));
  return bindParseResult(results, (tkns, vbe) => {
    // TODO: or pass this in as on option to parseVBE so that we only get the plain VBE
    if (vbe.type !== "VB") {
      return [];
    }
    if (vbe.info.type === "equative") {
      return [];
    }
    const kidsSections = parseKidsSection(tkns, [], []);
    if (!kidsSections.length) {
      return returnParseResult<VerbSectionData>(
        tkns,
        {
          blocks: [...front.front, vbe],
          kids: front.kids,
        }
      );
    }
    return bindParseResult(kidsSections, (tkns2, { kids }) => {
      const position = front.front.length + 1;
      return returnParseResult<VerbSectionData>(tkns2, {
        blocks: [...front.front, vbe],
        kids: [...front.kids, { position, section: kids }],
      })
    })
  });
}

function parseAbilityOrPerfect(tokens: readonly T.Token[], dictionary: T.DictionaryAPI, front: VerbSectionFrontData): T.ParseResult<VerbSectionData>[] {
  return (front.front.some(isNeg)
    ? parseFlippedAbilityOrPerfect
    : parseStraightAbilityOrPerfect
  )(tokens, dictionary, front);
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
            const kidsR3 = parseOptKidsSection(tkns5);
            return bindParseResult(kidsR3, (tkns6, kids3) => {
              return [{
                tokens: tkns6,
                body: {
                  blocks: [...front.front, vbp, ...neg ? [neg] : [], aux],
                  kids: addKids(
                    addKids(
                      addKids(front.kids, position, kids1),
                      position2,
                      kids2
                    ),
                    position2 + 1,
                    kids3
                  )
                },
                errors: [],
              }]
            })
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
    ...parseKawulKedulVBE(tokens, undefined),
  ];
  const res: T.ParseResult<VerbSectionData>[] = bindParseResult(auxs, (tkns, aux) => {
    if (aux.type === "welded") return [];
    const kidsRes = parseOptKidsSection(tkns);
    return bindParseResult(kidsRes, (tkns2, kids) => {
      const position = front.front.length + 1;
      const res = aux.info.type === "equative"
        ? parsePastPart(tkns2, dictionary)
        : isStatAuxVBE(aux)
          ? parseAbility(tkns2, dictionary, ph)
          : [];
      return bindParseResult(res, (tkns3, vbp) => {
        const kidsEnd = parseOptKidsSection(tkns3);
        return bindParseResult(kidsEnd, (tkns4, kids2) => {
          return [{
            tokens: tkns4,
            body: {
              blocks: [...front.front, aux, vbp],
              kids: addKids(addKids(front.kids, position, kids), position + 1, kids2),
            },
            errors: [],
          }];
        })
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

function isStatAuxVBE(x: T.ParsedVBE): boolean {
  return x.type === "VB" && x.info.type === "verb" && isStatAux(x.info.verb) && x.info.aspect === "perfective"
}

// function parseVerbSectRearR(dictionary: T.DictionaryAPI) {
//   return function(
//     prev: T.ParseResult<VerbSectionData>
//   ): T.ParseResult<VerbSectionData>[] {
//     const { hasNeg, VBE, vbeIndex, hasVBP } = scanSection(prev.body.blocks);
//     const allResults: T.ParseResult<VerbSectionBlock | T.ParsedKidsSection>[] =
//       [
//         ...(VBE
//           ? []
//           : [
//             ...parseVBE(
//               prev.tokens,
//               dictionary,
//               hasVBP && prev.body.ph?.type === "PH"
//                 ? // incase of [PH] + [VBP] before, PH was used up by [VBP]
//                 undefined
//                 : prev.body.ph
//             ),
//             ...(prev.body.ph ? [] : parseEquative(prev.tokens)),
//           ]),
//         ...(!hasVBP ? parseVBP(prev.tokens, dictionary, prev.body.ph) : []),
//         ...(!hasNeg ? parseNeg(prev.tokens) : []),
//         ...parseKidsSection(prev.tokens, [], []),
//       ].filter(ensureVBEAuxOk(prev.body.blocks, vbeIndex));
//     if (allResults.length === 0) {
//       return finalChecksOnVerbSection(prev);
//     }
//     return bindParseResult(allResults, (tokens, r) => {
//       if (r.type === "kids") {
//         const position = prev.body.blocks.length;
//         return parseVerbSectRearR(dictionary)(
//           returnParseResultSingle(
//             tokens,
//             {
//               ...prev.body,
//               kids: [
//                 ...prev.body.kids,
//                 {
//                   position,
//                   section: r.kids,
//                 },
//               ],
//             },
//             prev.errors
//           )
//         );
//       }
//       return parseVerbSectRearR(dictionary)(
//         returnParseResultSingle<VerbSectionData>(
//           tokens,
//           {
//             ...prev.body,
//             blocks: [...prev.body.blocks, r],
//           },
//           prev.errors
//         )
//       );
//     });
//   };
// }

// function scanSection(blocks: VerbSectionBlock[]): {
//   hasNeg: boolean;
//   VBE: T.ParsedVBE | undefined;
//   vbeIndex: number;
//   hasVBP: boolean;
// } {
//   return blocks.reduce<ReturnType<typeof scanSection>>(
//     (acc, b, i) => {
//       if (b.type === "negative") {
//         return {
//           ...acc,
//           hasNeg: true
//         };
//       }
//       if (isParsedVBE(b)) {
//         return {
//           ...acc,
//           VBE: b,
//           vbeIndex: i,
//         };
//       }
//       if (isParsedVBP(b)) {
//         return {
//           ...acc,
//           hasVBP: true,
//         };
//       }
//       return acc;
//     },
//     {
//       hasNeg: false,
//       VBE: undefined,
//       vbeIndex: -1,
//       hasVBP: false,
//     }
//   );
// }

// function finalChecksOnVerbSection(
//   v: T.ParseResult<VerbSectionData>
// ): T.ParseResult<VerbSectionData>[] {
//   // && !hasMisusedStatKedul(v.body.blocks);
//   // TODO: add errors here
//   return verbSectionOrderOK(v.body.blocks) &&
//     verbSectionBlocksCompatible(v.body.blocks)
//     ? [v]
//     : [];
// }

// function verbSectionOrderOK(vs: VerbSectionBlock[]): boolean {
//   const possibilites = [
//     [isParsedVBE],
//     [isNeg, isParsedVBE],
//     [isPH, isParsedVBE],
//     [isPH, isNeg, isParsedVBE],
//     [isNeg, isNonOoPh, isParsedVBE],
//     [isParsedVBP, isParsedVBE],
//     [isNeg, isParsedVBE, isParsedVBP],
//     [isParsedVBP, isNeg, isParsedVBE],
//     // could be more clever with optional isPH here
//     [isPH, isParsedVBP, isParsedVBE],
//     [isPH, isNeg, isParsedVBE, isParsedVBP],
//     [isPH, isParsedVBP, isNeg, isParsedVBE],
//   ];
//   return possibilites.some(
//     (poss) => poss.length === vs.length && zip(poss, vs).every(([p, b]) => p(b))
//   ); // && !hasMisusedStatKedul(vs)
// }

// function verbSectionBlocksCompatible(blocks: VerbSectionBlock[]): boolean {
//   const ph = blocks.find((b): b is T.ParsedPH => b.type === "PH");
//   const vbp = blocks.find(isParsedVBP);
//   const vbe = blocks.find(isParsedVBE);
//   const hasMisusedStatKedul = !!(
//     ph?.type === "PH" &&
//     ph.s === "و" &&
//     !vbp &&
//     vbe &&
//     vbe.info.type === "verb" &&
//     isKedulStatEntry(vbe.info.verb.entry)
//   );
//   if (hasMisusedStatKedul) {
//     return false;
//   }
//   return vbp
//     ? // if there is a VBP present, it needs to be either an ability or perfect form
//     validAbility(vbp, vbe) || validPerfect(vbp, vbe)
//     : // otherwise, there should be just be a VBE present
//     !!vbe;
// }

// function validAbility(vbp: T.ParsedVBP, vbe: T.ParsedVBE | undefined): boolean {
//   if (!vbe) {
//     return false;
//   }
//   if (vbe.type !== "VB") {
//     return false;
//   }
//   if (vbp.info.type !== "ability") {
//     return false;
//   }
//   return (
//     vbe.info.type === "verb" &&
//     isKedulStat(vbe.info.verb) &&
//     vbe.info.aspect === "perfective" &&
//     !vbe.info.imperative
//   );
// }

// function validPerfect(vbp: T.ParsedVBP, vbe: T.ParsedVBE | undefined): boolean {
//   // TODO: allow perfects without the equative
//   if (!vbe) {
//     return false;
//   }
//   return vbp.info.type === "ppart" && vbe.info.type === "equative";
// }

/**
 *  Because we could have had a situation where we were parsing
 *
 *  [oo] + [Neg] + [VBE] + [VBP]
 *
 * If the [VBP] shows up we need to make sure that we didn't use
 * the [oo] to make the [VBE] dynamic
 *
 */
// function ensureVBEAuxOk(
//   blocks: (VerbSectionBlock | T.ParsedKidsSection)[],
//   vbeIndex: number
// ) {
//   return function(
//     last: T.ParseResult<VerbSectionBlock | T.ParsedKidsSection>
//   ): boolean {
//     if (
//       last.body.type === "VB" &&
//       isParsedVBP(last.body) &&
//       last.body.info.type === "ability" &&
//       vbeIndex !== -1
//     ) {
//       const vbe = blocks[vbeIndex] as T.VBE;
//       // @ts-ignore - TODO: WHY??
//       if (!isParsedVBE(vbe)) {
//         throw new Error("misuse of index to get vbe");
//       }
//       if (vbe.info.type === "verb" && isKedulDynEntry(vbe.info.verb.entry)) {
//         return false;
//       }
//     }
//     return true;
//   };
// }

// function checkForStatCompounds(
//   dictionary: T.DictionaryAPI,
//   tokens: readonly T.Token[],
//   vps: T.VPSelectionComplete
// ): T.ParseResult<T.VPSelectionComplete>[] {
//   if (!vps.externalComplement) {
//     return [];
//   }
//   const aux = isStatAux(vps.verb.verb);
//   if (
//     !aux ||
//     (aux === "kawul" && vps.verb.transitivity !== "transitive") ||
//     (aux === "kedul" && vps.verb.transitivity !== "intransitive")
//   ) {
//     return [];
//   }
//   if (
//     vps.externalComplement.selection.type === "loc. adv." ||
//     vps.externalComplement.selection.type === "adjective" ||
//     vps.externalComplement.selection.type === "comp. noun"
//   ) {
//     // adjectives should already be checked for accuracy by the
//     // parsing of complement. TODO: make sure it's checked to match with
//     // the target, not just the king
//     const l = vps.externalComplement.selection.entry.ts;
//     return returnParseResults(
//       tokens,
//       dictionary
//         .verbEntryLookupByL(l)
//         .filter(isStatCompound(aux))
//         .map<T.VPSelectionComplete>((verb) => ({
//           ...vps,
//           externalComplement: undefined,
//           verb: {
//             ...vps.verb,
//             verb,
//           },
//         }))
//     );
//   }
//   return [];
// }
