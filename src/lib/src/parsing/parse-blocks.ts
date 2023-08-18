import * as T from "../../../types";
import { fmapParseResult } from "../fp-ps";
import { parseKidsSection } from "./parse-kids-section";
import { parseNP } from "./parse-np";
import { parsePH } from "./parse-ph";
import { parseVerb } from "./parse-verb";
import { bindParseResult, returnParseResult } from "./utils";

export function parseBlocks(
  tokens: Readonly<T.Token[]>,
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[],
  verbLookup: (s: string) => T.VerbEntry[],
  blocks: T.ParsedBlock[],
  kids: T.ParsedKid[]
): T.ParseResult<{
  kids: T.ParsedKid[];
  blocks: T.ParsedBlock[];
}>[] {
  if (tokens.length === 0) {
    return returnParseResult(tokens, { blocks, kids });
  }
  const prevPh: T.ParsedPH | undefined = blocks.find(
    (b): b is T.ParsedPH => "type" in b && b.type === "PH"
  );
  const vbExists = blocks.some((b) => "type" in b && b.type === "VB");
  const np = prevPh ? [] : fmapParseResult((x) => [x], parseNP(tokens, lookup));
  // UHOH... This could cause double paths ... maybe don't parse the PH in the parse VB!
  const ph =
    vbExists || prevPh ? [] : fmapParseResult((x) => [x], parsePH(tokens));
  const vb = fmapParseResult(
    ([ph, v]) => (ph ? [ph, v] : [v]),
    parseVerb(tokens, verbLookup)
  );
  const kidsR = parseKidsSection(tokens, []);
  const allResults = [...np, ...ph, ...vb, ...kidsR] as T.ParseResult<
    T.ParsedBlock[] | { kids: T.ParsedKid[] }
  >[];
  // TODO: is this necessary?
  // if (!allResults.length) {
  //   return [
  //     {
  //       tokens,
  //       body: { blocks, kids },
  //       errors: [],
  //     },
  //   ];
  // }
  return bindParseResult(allResults, (tokens, r) => {
    if ("kids" in r) {
      return {
        next: parseBlocks(tokens, lookup, verbLookup, blocks, [
          ...kids,
          ...r.kids,
        ]),
        errors:
          blocks.length !== 1
            ? [{ message: "kids' section out of place" }]
            : [],
      };
    }
    if (prevPh && r.some((x) => "type" in x && x.type === "PH")) {
      return [];
    }
    const vb = r.find((x): x is T.ParsedVBE => "type" in x && x.type === "VB");
    if (!phMatches(prevPh, vb)) {
      return [];
    }
    return parseBlocks(tokens, lookup, verbLookup, [...blocks, ...r], kids);
  });
}

function phMatches(ph: T.ParsedPH | undefined, vb: T.ParsedVBE | undefined) {
  if (!ph) {
    return true;
  }
  const v = vb && vb.type === "VB" && vb.info.type === "verb" && vb.info.verb;
  if (!v) {
    return true;
  }
  const verbPh = getPhFromVerb(v);
  return verbPh === ph.s;
}

function getPhFromVerb(v: T.VerbEntry): string {
  // TODO!! what to do about yo / bo ???
  if (v.entry.separationAtP) {
    return v.entry.p.slice(0, v.entry.separationAtP);
  }
  // TODO or آ
  if (v.entry.p.startsWith("ا")) {
    return "وا";
  }
  return "و";
}
