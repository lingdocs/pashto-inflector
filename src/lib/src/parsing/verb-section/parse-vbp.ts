import * as T from "../../../../types";
import { fmapParseResult } from "../../fp-ps";
import { parseComplement } from "../argument-section/parse-complement";
import { bindParseResult, returnParseResult } from "./../utils";
import { wrapInActiveV } from "./misc";
import {
  parseKawulKedulAbility,
  parseKawulKedulPPart,
} from "./parse-kawul-kedul-vbp";
import { parseOptNeg } from "./parse-negative";
import { getLFromComplement, parseKraay, parseVBBBasic } from "./parse-vbe";
import { isKawulStat, isKedulStat, isStatAux } from "./parse-verb-helpers";
import { findRoot } from "./stem-root-finding";

export function parseVBP(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
  type: "ability" | "ppart" | "either",
): T.ParseResult<T.ParsedV<T.ParsedVBP>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const types = type === "either" ? (["ability", "ppart"] as const) : [type];
  const res: T.ParseResult<
    | T.ActiveVBasic<T.ParsedVBP>
    | T.ActiveVWeld<T.ParsedVBP>
    | T.PassiveVWeld<T.ParsedVBP>
  >[] = types.flatMap((type) => [
    ...parseActiveVBP(tokens, dictionary, ph, type),
    ...parseActiveWeldedVBP(tokens, dictionary, ph, type),
    // TODO: here this is inefficient cause we're gonna have to try to parse the VBE inside again
    ...parsePassiveWeldedVBP(tokens, dictionary, ph, type),
    ...parsePassiveDoubleWeldedVBP(tokens, dictionary, ph, type),
  ]);
  return fmapParseResult((content) => ({ type: "parsedV", content }), res);
}

function parseActiveVBP(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
  type: "ability" | "ppart",
): T.ParseResult<T.ActiveVBasic<T.ParsedVBP>>[] {
  return fmapParseResult(
    wrapInActiveV,
    parseAbilityOrPPartVBInside(tokens, dictionary, ph, type),
  );
}

function parseAbilityOrPPartVBInside(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
  type: "ability" | "ppart",
): T.ParseResult<T.ParsedVBP>[] {
  if (tokens.length === 0) {
    return [];
  }
  if (type === "ability") {
    const kawulKedul = parseKawulKedulAbility(tokens, ph);
    if (kawulKedul.length) {
      return kawulKedul;
    }
    const [{ s }, ...rest] = tokens;
    const start = s.endsWith("ای")
      ? s.slice(0, -2)
      : s.endsWith("ی")
        ? s.slice(0, -1)
        : "";
    if (!start) return [];
    return findRoot(ph)(start, dictionary)
      .map<T.ParsedVBPBasicAbility>((root) => ({
        type: "parsed vbp basic ability",
        info: {
          type: "ability",
          verb: root.verb,
          aspect: root.aspect,
        },
      }))
      .flatMap((m) => returnParseResult(rest, m));
  } else {
    if (ph) return [];
    const [{ s }, ...rest] = tokens;
    const genNums = getPPartGenNums(s);
    // TODO: ALSO HANDLE SHORT FORMS
    const wOutEnd = s.slice(0, -1);
    // TODO: irreg part or just leave that to shúway ?
    const matches = [
      ...dictionary.verbEntryLookup(wOutEnd),
      ...(canBePastPartWOutL(wOutEnd + "ل")
        ? dictionary
            .verbEntryLookup(wOutEnd + "ل")
            .filter((x) => x.entry.p !== "talúl")
        : []),
    ];
    return matches
      .flatMap<T.ParsedVBPBasicPart>((verb) =>
        genNums.map<T.ParsedVBPBasicPart>((genNum) => ({
          type: "parsed vbp basic part",
          info: {
            type: "ppart",
            verb,
            genNum,
          },
        })),
      )
      .flatMap((m) => returnParseResult(rest, m));
  }
}

function parsePassiveWeldedVBP(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
  type: "ability" | "ppart",
): T.ParseResult<T.PassiveVWeld<T.ParsedVBP>>[] {
  if (tokens.length === 0) {
    return [];
  }
  if (ph) {
    return [];
  }
  const vbes = fmapParseResult(
    (v) => v.content,
    parseVBBBasic(tokens, dictionary, ph),
  );
  return bindParseResult(vbes, (tkns2, vbe) => {
    if (isKawulStat(vbe.info.verb) || isKedulStat(vbe.info.verb)) {
      return [];
    }
    if (
      vbe.info.base !== "root" ||
      vbe.person !== T.Person.ThirdPlurMale ||
      vbe.info.imperative ||
      // just to be clear - we shouldn't need this because we didn't allow
      // the vbes to be parsed if a PH was present
      vbe.info.aspect === "perfective"
    ) {
      return [];
    }
    if (type === "ability") {
      const auxs = parseKawulKedulAbility(tkns2, undefined).filter((x) =>
        isKedulStat(x.body.info.verb),
      );
      return bindParseResult(auxs, (tkns3, aux) => {
        return returnParseResult(tkns3, {
          type: "passive welded" as const,
          content: {
            left: vbe.info.verb,
            right: aux,
          },
        });
      });
    }
    return bindParseResult(vbes, (tkns2, vbe) => {
      const auxs = parseKawulKedulPPart(tkns2).filter((x) =>
        isKedulStat(x.body.info.verb),
      );
      return bindParseResult(auxs, (tkns3, aux) => {
        const b: T.PassiveVWeld<T.ParsedVBP> = {
          type: "passive welded",
          content: {
            left: vbe.info.verb,
            right: aux,
          },
        };
        return returnParseResult(tkns3, b);
      });
    });
  });
}

function parsePassiveDoubleWeldedVBP(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
  type: "ability" | "ppart",
): T.ParseResult<T.PassiveVDoubWeld<T.ParsedVBP>>[] {
  if (tokens.length === 0) {
    return [];
  }
  if (ph) {
    return [];
  }
  // ability can take kRul or kawul depending on aspect
  // ppart takes kraay
  // GOOD QUESTION - ستنول شوي دي vs ستانه کړای شوي دي
  const comps = parseComplement(tokens, dictionary);
  return bindParseResult(comps, (tkns, comp) => {
    const ks = parseK(tkns);
    return bindParseResult(ks, (tkns2, k) => {
      if (type === "ppart" && k === "kawul") {
        return [];
      }
      if (type === "ability" && k === "kRaay") {
        return [];
      }
      if (type === "ppart") {
        const auxs = parseKawulKedulPPart(tkns2).filter((x) =>
          isKedulStat(x.body.info.verb),
        );
        return bindParseResult(auxs, (tkns3, aux) => {
          const b: T.PassiveVDoubWeld<T.ParsedVBPBasicPart> = {
            type: "passive doub welded",
            content: {
              left: {
                type: "passive welded left",
                complement: comp,
              },
              right: aux,
            },
          };
          return returnParseResult(tkns3, b);
        });
      }
      const auxs = parseKawulKedulAbility(tkns2, undefined).filter((x) =>
        isKedulStat(x.body.info.verb),
      );
      return bindParseResult(auxs, (tkns3, aux) => {
        // for some reason we have to type this more generally to get the function to type-check
        const b: T.PassiveVDoubWeld<T.ParsedVBP> = {
          type: "passive doub welded",
          content: {
            left: {
              type: "passive welded left",
              complement: comp,
            },
            right: aux,
          },
        };
        return returnParseResult(tkns3, b);
      });
    });
  });
}

function parseK(
  tokens: readonly T.Token[],
): T.ParseResult<"kawul" | "kRul" | "kRaay">[] {
  if (!tokens.length) {
    return [];
  }
  const [{ s }, ...rest] = tokens;
  if (s === "کول") {
    return returnParseResult(rest, "kawul");
  }
  if (s === "کړل") {
    return returnParseResult(rest, "kRul");
  }
  if (["کړای", "کړلای", "کړی", "کړلی"].includes(s)) {
    return returnParseResult(rest, "kRaay");
  }
  return [];
}

function parseKawulStraight(
  tokens: readonly T.Token[],
): T.ParseResult<"kawul">[] {
  if (!tokens.length) {
    return [];
  }
  if (tokens[0].s === "کول") {
    return returnParseResult(tokens.slice(1), "kawul");
  }
  return [];
}

function parseActiveWeldedVBP(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
  type: "ppart" | "ability",
): T.ParseResult<T.ActiveVWeld<T.ParsedVBP>>[] {
  if (ph) {
    return [];
  }
  // TODO: could we just pass in the PH here instead?
  // WHY DON'T WE USE THE PH IN THIS CASE?
  const complement = parseComplement(tokens, dictionary);
  if (!complement.length) {
    return [];
  }
  return bindParseResult(complement, (tkns, comp) => {
    // TODO: remove the last check allow for CompNP once implemented
    if (
      typeof comp.selection === "object" &&
      "type" in comp.selection &&
      (comp.selection.type === "sandwich" ||
        comp.selection.type === "possesor" ||
        comp.selection.type === "NP")
    ) {
      return [];
    }
    const compTs = getLFromComplement(comp);
    if (compTs === undefined) {
      return [];
    }
    const misplacedNegative = parseOptNeg(tkns);
    return bindParseResult(misplacedNegative, (tkns2, badNeg) => {
      const auxs: T.ParseResult<
        T.ParsedVBPBasicAbility | T.ParsedVBPBasicPart
      >[] =
        type === "ppart"
          ? parseKawulKedulPPart(tkns2).filter((x) =>
              isStatAux(x.body.info.verb),
            )
          : parseKawulKedulAbility(tkns2, undefined).filter(
              (x) =>
                isStatAux(x.body.info.verb) &&
                x.body.info.aspect === "imperfective",
            );
      return bindParseResult(auxs, (tkns3, aux) => {
        return returnParseResult(
          tkns3,
          {
            type: "active welded",
            content: {
              left: comp,
              right: aux,
            },
          },
          badNeg ? [{ message: "negative cannot go inside welded block" }] : [],
        );
      });
    });
  });
}

export function getPPartGenNums(s: string): T.GenderNumber[] {
  const ending: "ی" | "ي" | "ې" = s.at(-1) as "ی" | "ي" | "ې";
  if (!ending || !["ی", "ي", "ې"].includes(ending)) {
    return [];
  }
  return endingGenNum(ending);
}

// should be in line with possiblePPartLengths
function canBePastPartWOutL(s: string): boolean {
  const shortenableEndings = ["ښتل", "ستل", "وتل"];
  const wrul = ["وړل", "راوړل", "وروړل", "دروړل"];
  if (s === "تلل") {
    return true;
  }
  if (
    !s.endsWith("استل") &&
    shortenableEndings.some((e) => s.endsWith(e) && s.length > e.length)
  ) {
    return true;
  }
  if (wrul.includes(s)) {
    return true;
  }
  if (s.endsWith("ښودل") && s.length > 4 && s !== "کېښودل" && s !== "کښېښودل") {
    return true;
  }
  return false;
}

function endingGenNum(s: "ی" | "ې" | "ي"): T.GenderNumber[] {
  if (s === "ی") {
    return [
      {
        gender: "masc",
        number: "singular",
      },
    ];
  }
  if (s === "ې") {
    return [
      { gender: "fem", number: "singular" },
      { gender: "fem", number: "plural" },
    ];
  }
  if (s === "ي") {
    return [{ gender: "masc", number: "plural" }];
  }
  throw new Error("invalid participle tail input");
}
