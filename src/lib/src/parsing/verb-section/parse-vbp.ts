import * as T from "../../../../types";
import { parseComplement } from "../argument-section/parse-complement";
import { bindParseResult, returnParseResult } from "./../utils";
import {
  parseKawulKedulAbility,
  parseKawulKedulPPart,
} from "./parse-kawul-kedul-vbp";
import { parseOptNeg } from "./parse-negative";
import { getLFromComplement } from "./parse-vbe";
import { isStatAux } from "./parse-verb-helpers";
import { findRoot } from "./stem-root-finding";

export function parseVBP(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
  type: "ability" | "ppart" | "either",
): T.ParseResult<T.ParsedVBP>[] {
  if (tokens.length === 0) {
    return [];
  }
  const types = type === "either" ? (["ability", "ppart"] as const) : [type];
  return types.flatMap((type) => [
    ...parseAbilityOrPPartVB(tokens, dictionary, ph, type),
    ...parseAbilityOrPPartWelded(tokens, dictionary, ph, type),
  ]);
}

function parseAbilityOrPPartWelded(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
  type: "ppart" | "ability",
): T.ParseResult<T.ParsedWeldedVBP>[] {
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
      const k: T.ParseResult<T.ParsedVBE | T.ParsedVBPBasic>[] =
        type === "ppart"
          ? parseKawulKedulPPart(tkns2).filter((x) =>
              isStatAux(x.body.info.verb),
            )
          : parseKawulKedulAbility(tkns2, undefined).filter(
              (x) =>
                isStatAux(x.body.info.verb) &&
                x.body.info.type === "ability" &&
                x.body.info.aspect === "imperfective",
            );
      return bindParseResult(k, (tkns3, aux) => {
        if (aux.type === "weldedVBE") {
          return [];
        }
        if (aux.info.type !== type) {
          return [];
        }
        const vbp: T.ParsedWeldedVBP = {
          type: "weldedVBP",
          left: comp,
          // @ts-ignore ts is being difficult here
          right: {
            type: "parsedRightWelded",
            info: aux.info,
          },
        };
        return returnParseResult(
          tkns3,
          vbp,
          badNeg ? [{ message: "negative cannot go inside welded block" }] : [],
        );
      });
    });
  });
}

export function parseAbilityOrPPartVB(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
  type: "ability" | "ppart",
): T.ParseResult<T.ParsedVBPBasic>[] {
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
      .map<T.ParsedVBPBasic>((root) => ({
        type: "VB",
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
      .flatMap<T.ParsedVBPBasic>((verb) =>
        genNums.map<T.ParsedVBPBasic>((genNum) => ({
          type: "VB",
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
