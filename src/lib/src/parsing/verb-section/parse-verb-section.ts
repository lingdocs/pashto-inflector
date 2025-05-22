import { zip } from "rambda";
import * as T from "../../../../types";
import { parseKidsSection } from "../parse-kids-section";
import {
  bindParseResult,
  isNeg,
  isNonOoPh,
  isParsedVBE,
  isParsedVBP,
  isPH,
  returnParseResultSingle,
} from "../utils";
import { parseNeg } from "./parse-negative";
import { parsePH } from "./parse-ph";
import { parseVBE } from "./parse-vbe";
import { parseVBP } from "./parse-vbp";
import {
  isKedulDynEntry,
  isKedulStat,
  isKedulStatEntry,
} from "./parse-verb-helpers";
import { parseEquative } from "./parse-equative";

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

const empty: VerbSectionData = {
  blocks: [],
  kids: [],
};

export function parseVerbSection(
  tokens: readonly T.Token[],
  dictionary: T.DictionaryAPI
): T.ParseResult<VerbSectionData>[] {
  if (tokens.length === 0) {
    return [];
  }
  return parseVerbSectR(dictionary)({
    tokens,
    body: empty,
    errors: [],
  });
}

// issue - verbs like wahul don't get parsed because the و needs to be optional!
function parseVerbSectR(dictionary: T.DictionaryAPI) {
  return function(
    prev: T.ParseResult<VerbSectionData>
  ): T.ParseResult<VerbSectionData>[] {
    const { ph, hasNeg, VBE, vbeIndex, hasVBP } = scanSection(prev.body.blocks);
    const allResults: T.ParseResult<VerbSectionBlock | T.ParsedKidsSection>[] =
      [
        ...(!ph ? parsePH(prev.tokens, dictionary) : []),
        ...(VBE
          ? []
          : [
            ...parseVBE(
              prev.tokens,
              dictionary,
              hasVBP && ph?.type === "PH"
                ? // incase of [PH] + [VBP] before, PH was used up by [VBP]
                undefined
                : ph
            ),
            ...(ph ? [] : parseEquative(prev.tokens)),
          ]),
        ...(!hasVBP ? parseVBP(prev.tokens, dictionary, ph) : []),
        ...(!hasNeg ? parseNeg(prev.tokens) : []),
        ...parseKidsSection(prev.tokens, [], []),
      ].filter(ensureVBEAuxOk(prev.body.blocks, vbeIndex));
    if (allResults.length === 0) {
      return finalChecksOnVerbSection(prev);
    }
    return bindParseResult(allResults, (tokens, r) => {
      if (r.type === "kids") {
        const position = prev.body.blocks.length;
        return parseVerbSectR(dictionary)(
          returnParseResultSingle(
            tokens,
            {
              ...prev.body,
              kids: [
                ...prev.body.kids,
                {
                  position,
                  section: r.kids,
                },
              ],
            },
            prev.errors
          )
        );
      }
      return parseVerbSectR(dictionary)(
        returnParseResultSingle<VerbSectionData>(
          tokens,
          {
            ...prev.body,
            blocks: [...prev.body.blocks, r],
          },
          prev.errors
        )
      );
    });
  };
}

function scanSection(blocks: VerbSectionBlock[]): {
  ph: T.ParsedPH | undefined;
  hasNeg: boolean;
  VBE: T.ParsedVBE | undefined;
  vbeIndex: number;
  hasVBP: boolean;
} {
  return blocks.reduce<ReturnType<typeof scanSection>>(
    (acc, b, i) => {
      if (isPH(b)) {
        return {
          ...acc,
          ph: b,
        };
      }
      if (b.type === "negative") {
        return {
          ...acc,
          hasNeg: true
        };
      }
      if (isParsedVBE(b)) {
        return {
          ...acc,
          VBE: b,
          vbeIndex: i,
        };
      }
      if (isParsedVBP(b)) {
        return {
          ...acc,
          hasVBP: true,
        };
      }
      return acc;
    },
    {
      ph: undefined,
      hasNeg: false,
      VBE: undefined,
      vbeIndex: -1,
      hasVBP: false,
    }
  );
}

function finalChecksOnVerbSection(
  v: T.ParseResult<VerbSectionData>
): T.ParseResult<VerbSectionData>[] {
  // && !hasMisusedStatKedul(v.body.blocks);
  // TODO: add errors here
  return verbSectionOrderOK(v.body.blocks) &&
    verbSectionBlocksCompatible(v.body.blocks)
    ? [v]
    : [];
}

function verbSectionOrderOK(vs: VerbSectionBlock[]): boolean {
  const possibilites = [
    [isParsedVBE],
    [isNeg, isParsedVBE],
    [isPH, isParsedVBE],
    [isPH, isNeg, isParsedVBE],
    [isNeg, isNonOoPh, isParsedVBE],
    [isParsedVBP, isParsedVBE],
    [isNeg, isParsedVBE, isParsedVBP],
    [isParsedVBP, isNeg, isParsedVBE],
    // could be more clever with optional isPH here
    [isPH, isParsedVBP, isParsedVBE],
    [isPH, isNeg, isParsedVBE, isParsedVBP],
    [isPH, isParsedVBP, isNeg, isParsedVBE],
  ];
  return possibilites.some(
    (poss) => poss.length === vs.length && zip(poss, vs).every(([p, b]) => p(b))
  ); // && !hasMisusedStatKedul(vs)
}

function verbSectionBlocksCompatible(blocks: VerbSectionBlock[]): boolean {
  const ph = blocks.find((b): b is T.ParsedPH => b.type === "PH");
  const vbp = blocks.find(isParsedVBP);
  const vbe = blocks.find(isParsedVBE);
  const hasMisusedStatKedul = !!(
    ph?.type === "PH" &&
    ph.s === "و" &&
    !vbp &&
    vbe &&
    vbe.info.type === "verb" &&
    isKedulStatEntry(vbe.info.verb.entry)
  );
  if (hasMisusedStatKedul) {
    return false;
  }
  return vbp
    ? // if there is a VBP present, it needs to be either an ability or perfect form
    validAbility(vbp, vbe) || validPerfect(vbp, vbe)
    : // otherwise, there should be just be a VBE present
    !!vbe;
}

function validAbility(vbp: T.ParsedVBP, vbe: T.ParsedVBE | undefined): boolean {
  if (!vbe) {
    return false;
  }
  if (vbe.type !== "VB") {
    return false;
  }
  if (vbp.info.type !== "ability") {
    return false;
  }
  return (
    vbe.info.type === "verb" &&
    isKedulStat(vbe.info.verb) &&
    vbe.info.aspect === "perfective" &&
    !vbe.info.imperative
  );
}

function validPerfect(vbp: T.ParsedVBP, vbe: T.ParsedVBE | undefined): boolean {
  // TODO: allow perfects without the equative
  if (!vbe) {
    return false;
  }
  return vbp.info.type === "ppart" && vbe.info.type === "equative";
}

/**
 *  Because we could have had a situation where we were parsing
 *
 *  [oo] + [Neg] + [VBE] + [VBP]
 *
 * If the [VBP] shows up we need to make sure that we didn't use
 * the [oo] to make the [VBE] dynamic
 *
 */
function ensureVBEAuxOk(
  blocks: (VerbSectionBlock | T.ParsedKidsSection)[],
  vbeIndex: number
) {
  return function(
    last: T.ParseResult<VerbSectionBlock | T.ParsedKidsSection>
  ): boolean {
    if (
      last.body.type === "VB" &&
      isParsedVBP(last.body) &&
      last.body.info.type === "ability" &&
      vbeIndex !== -1
    ) {
      const vbe = blocks[vbeIndex] as T.VBE;
      // @ts-ignore - TODO: WHY??
      if (!isParsedVBE(vbe)) {
        throw new Error("misuse of index to get vbe");
      }
      if (vbe.info.type === "verb" && isKedulDynEntry(vbe.info.verb.entry)) {
        return false;
      }
    }
    return true;
  };
}

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
