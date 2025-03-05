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

export function parseBlocks(
  tokens: Readonly<T.Token[]>,
  dicitonary: T.DictionaryAPI,
  blocks: T.ParsedBlock[],
  kids: T.ParsedKid[]
): T.ParseResult<{
  kids: T.ParsedKid[];
  blocks: T.ParsedBlock[];
}>[] {
  if (tokens.length === 0) {
    return returnParseResult(tokens, { blocks, kids });
  }
  const inVerbSection = blocks.some(startsVerbSection);
  const ph: T.ParsedPH | undefined = blocks.find(
    (b): b is T.ParsedPH => b.type === "PH"
  );
  const hasVBP = blocks.some(isParsedVBP);
  const hasNeg = blocks.some((b) => b.type === "negative");
  const allResults: T.ParseResult<T.ParsedBlock | T.ParsedKidsSection>[] = [
    // Parse NP/APs until we get to verb section
    ...(!inVerbSection ? parseNPAP(tokens, dicitonary) : []),
    // Ensure no duplicates of verb section components
    ...(ph ? [] : parsePH(tokens)),
    ...(hasVBP ? [] : parseVBP(tokens, dicitonary, ph)),
    ...(blocks.some(isParsedVBE)
      ? []
      : [
          ...parseVBE(tokens, dicitonary, hasVBP ? undefined : ph),
          ...(ph ? [] : parseEquative(tokens)),
        ]),
    ...(hasNeg ? [] : parseNeg(tokens)),
    // Try parsing kids section at every point (for erroring kids section being in wrong place)
    ...parseKidsSection(tokens, []),
  ];
  return bindParseResult(allResults, (tokens, r) => {
    const errors: T.ParseError[] = [];
    if (r.type === "kids") {
      return {
        next: parseBlocks(tokens, dicitonary, blocks, [...kids, ...r.kids]),
        errors:
          blocks.length !== 1
            ? [{ message: "kids' section out of place" }]
            : [],
      };
    }
    return {
      next: parseBlocks(tokens, dicitonary, [...blocks, r], kids),
      errors,
    };
  });
}
