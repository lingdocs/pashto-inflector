import * as T from "../../../types";
import { parseEquative } from "./parse-equative";
import { parseKidsSection } from "./parse-kids-section";
import { parseNeg } from "./parse-negative";
import { parseNPAP } from "./parse-npap";
import { parseVBP } from "./parse-vbp";
import { parsePH } from "./parse-ph";
import { parseVBE } from "./parse-vbe-new";
import {
  bindParseResult,
  returnParseResult,
  isParsedVBE,
  isParsedVBP,
  startsVerbSection,
} from "./utils";
import { isKedulDynEntry, isKedulStatEntry } from "./parse-verb-helpers";
import { parseCompliment } from "./parse-complement";

export function parseBlocks(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  blocks: T.ParsedBlock[],
  kids: T.ParsedKid[]
): T.ParseResult<{
  kids: T.ParsedKid[];
  blocks: T.ParsedBlock[];
}>[] {
  if (tokens.length === 0) {
    // check to make sure we don't have stray VBE stat w lost و
    if (hasMisusedStatKedul(blocks)) {
      return [];
    }
    return returnParseResult(tokens, { blocks, kids });
  }
  const inVerbSection = blocks.some(startsVerbSection);
  const ph: T.ParsedPH | undefined = blocks.find(
    (b): b is T.ParsedPH => b.type === "PH"
  );
  // TODO clean up if don't need index
  const vbpIndex = blocks.findIndex(isParsedVBP);
  const hasVBP = vbpIndex !== -1;
  const vbeIndex = blocks.findIndex(isParsedVBE);
  const hasVBE = vbeIndex !== -1;
  const hasComplement = blocks.some((b) => b.type === "complement");
  const hasNeg = blocks.some((b) => b.type === "negative");
  const allResults: T.ParseResult<T.ParsedBlock | T.ParsedKidsSection>[] = [
    // Parse NP/APs until we get to verb section
    ...(!inVerbSection ? parseNPAP(tokens, dictionary) : []),
    ...(!hasComplement && !ph && !hasVBE && !hasVBP
      ? parseCompliment(tokens, dictionary)
      : []),
    // Ensure no duplicates of verb section components
    ...(ph ? [] : parsePH(tokens)),
    ...(hasVBP ? [] : parseVBP(tokens, dictionary, ph)),
    ...(hasVBE
      ? []
      : [
          ...parseVBE(
            tokens,
            dictionary,
            hasVBP
              ? // incase of [PH] + [VBP] before, PH was used up by [VBP]
                undefined
              : ph
          ),
          ...(ph ? [] : parseEquative(tokens)),
        ]),
    ...(hasNeg ? [] : parseNeg(tokens)),
    // Try parsing kids section at every point (for erroring kids section being in wrong place)
    ...parseKidsSection(tokens, []),
  ].filter(ensureVBEAuxOk(blocks, vbeIndex));
  return bindParseResult(allResults, (tokens, r) => {
    const errors: T.ParseError[] = [];
    if (r.type === "kids") {
      return {
        next: parseBlocks(tokens, dictionary, blocks, [...kids, ...r.kids]),
        errors:
          blocks.length !== 1
            ? [{ message: "kids' section out of place" }]
            : [],
      };
    }
    return {
      next: parseBlocks(tokens, dictionary, [...blocks, r], kids),
      errors,
    };
  });
}

/**
 * check to see if we didn't up getting a VBP and we
 * used a VBE kedul stat incorrectly - for example پوښتنه وشوه
 * being interpreted as پوښتنه شوه
 */
function hasMisusedStatKedul(blocks: T.ParsedBlock[]): boolean {
  const ph = blocks.some((b): b is T.ParsedPH => b.type === "PH");
  const vbp = blocks.some(isParsedVBP);
  const vbe = blocks.find(isParsedVBE);
  return !!(
    ph &&
    !vbp &&
    vbe &&
    vbe.info.type === "verb" &&
    isKedulStatEntry(vbe.info.verb.entry)
  );
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
function ensureVBEAuxOk(blocks: T.ParsedBlock[], vbeIndex: number) {
  return function (
    last: T.ParseResult<T.ParsedBlock | T.ParsedKidsSection>
  ): boolean {
    if (
      last.body.type === "VB" &&
      isParsedVBP(last.body) &&
      last.body.info.type === "ability" &&
      vbeIndex !== -1
    ) {
      const vbe = blocks[vbeIndex];
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
