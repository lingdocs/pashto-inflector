import * as T from "../../../types";
import { LookupFunction } from "./lookup";
import { parseEquative } from "./parse-equative";
import { parseKidsSection } from "./parse-kids-section";
import { parseNeg } from "./parse-negative";
import { parseNPAP } from "./parse-npap";
import { parsePastPart } from "./parse-past-part";
import { parsePH } from "./parse-ph";
import { parseVerb } from "./parse-verb";
import {
  bindParseResult,
  returnParseResult,
  isParsedVBE,
  isParsedVBP,
  startsVerbSection,
} from "./utils";

export function parseBlocks(
  tokens: Readonly<T.Token[]>,
  lookup: LookupFunction,
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

  const allBlocks: T.ParseResult<T.ParsedBlock | T.ParsedKidsSection>[] = [
    ...(!inVerbSection ? parseNPAP(tokens, lookup) : []),
    // ensure at most one of each PH, VBE, VBP
    ...(prevPh ? [] : parsePH(tokens)),
    ...(blocks.some(isParsedVBE)
      ? []
      : [...parseVerb(tokens, lookup), ...parseEquative(tokens)]),
    ...(blocks.some(isParsedVBP) ? [] : parsePastPart(tokens, lookup)),
    ...(blocks.some((b) => b.type === "negative") ? [] : parseNeg(tokens)),
    ...parseKidsSection(tokens, []),
  ];
  const allResults = [...allBlocks, ...parseKidsSection(tokens, [])];
  return bindParseResult(allResults, (tokens, r) => {
    const errors: T.ParseError[] = [];
    if (r.type === "kids") {
      return {
        next: parseBlocks(tokens, lookup, blocks, [...kids, ...r.kids]),
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
    if (r.type === "VB" && r.info.type !== "ppart") {
      if (!phMatches(prevPh, r)) {
        return [];
      }
    }
    // don't allow two negatives
    if (r.type === "negative" && blocks.some((b) => b.type === "negative")) {
      return [];
    }
    return {
      next: parseBlocks(tokens, lookup, [...blocks, r], kids),
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
    return true;
  }
  if (vb.info.type !== "verb") {
    return false;
  }
  const verbPh = getPhFromVerb(vb.info.verb, vb.info.base);
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
