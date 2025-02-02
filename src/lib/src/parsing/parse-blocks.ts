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
import { isKedulStatEntry } from "./parse-verb-helpers";

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
  const prevPh: T.ParsedPH | undefined = blocks.find(
    (b): b is T.ParsedPH => b.type === "PH"
  );
  const hasVBP = blocks.some(isParsedVBP);

  const allBlocks: T.ParseResult<T.ParsedBlock | T.ParsedKidsSection>[] = [
    ...(!inVerbSection ? parseNPAP(tokens, dicitonary) : []),
    // ensure at most one of each PH, VBE, VBP
    ...(prevPh ? [] : parsePH(tokens)),
    ...(blocks.some(isParsedVBE)
      ? []
      : [...parseVBE(tokens, dicitonary), ...parseEquative(tokens)]),
    ...(hasVBP ? [] : parseVBP(tokens, dicitonary)),
    ...(blocks.some((b) => b.type === "negative") ? [] : parseNeg(tokens)),
    ...parseKidsSection(tokens, []),
  ];
  const allResults = [...allBlocks, ...parseKidsSection(tokens, [])];
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
    if (prevPh && r.type === "PH") {
      return [];
    }
    // TODO: will have to handle welded
    if (r.type === "VB" && !hasVBP && r.info.type !== "ppart") {
      if (!phMatches(prevPh, r)) {
        return [];
      }
    }
    // don't allow two negatives
    if (r.type === "negative" && blocks.some((b) => b.type === "negative")) {
      return [];
    }
    return {
      next: parseBlocks(tokens, dicitonary, [...blocks, r], kids),
      errors,
    };
  });
}

function phMatches(
  ph: T.ParsedPH | undefined,
  vb: T.ParsedVBE | T.ParsedVBP | undefined
) {
  if (!ph) {
    return true;
  }

  if (!vb) {
    // TODO: Is this right??
    return true;
  }
  if (vb.info.type !== "verb" && vb.info.type !== "ability") {
    return false;
  }
  // TODO: Ability on wartlay shum etc.
  if (vb.info.type === "verb") {
    if (["را", "در", "ور"].includes(ph?.s)) {
      if (
        isKedulStatEntry(vb.info.verb.entry) &&
        vb.info.base === "stem" &&
        vb.info.aspect === "perfective"
      ) {
        return true;
      }
      // TODO: handle را غل etc! ? or is
      return false;
    }
    if (["لاړ", "لاړه", "لاړې"].includes(ph?.s)) {
      if (
        isKedulStatEntry(vb.info.verb.entry) &&
        vb.info.base === "stem" &&
        vb.info.aspect === "perfective"
      ) {
        return true;
      }
    }
  }
  const verbPh = getPhFromVerb(
    vb.info.verb,
    vb.info.type === "ability" ? "root" : vb.info.base
  );
  return verbPh === ph.s;
}

function getPhFromVerb(v: T.VerbEntry, base: "root" | "stem"): string {
  // TODO!! what to do about yo / bo ???
  if (v.entry.separationAtP) {
    const p =
      base === "root" ? v.entry.prp || v.entry.p : v.entry.ssp || v.entry.p;
    return p.slice(0, v.entry.separationAtP);
  }
  // TODO or آ
  if (v.entry.p.startsWith("ا")) {
    return "وا";
  }
  return "و";
}
