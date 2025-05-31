import * as T from "../../../../types";
import { returnParseResult } from "./../utils";
import { findRoot } from "./stem-root-finding";

export function parseVBP(
  tokens: Readonly<T.Token[]>,
  dicitonary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined
): T.ParseResult<T.ParsedVBP>[] {
  if (tokens.length === 0) {
    return [];
  }
  return [
    ...parseAbility(tokens, dicitonary, ph),
    ...ph ? [] : parsePastPart(tokens, dicitonary),
  ]
}

export function parseAbility(
  tokens: Readonly<T.Token[]>,
  dicitonary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined
): T.ParseResult<T.ParsedVBP>[] {
  // TODO: keday
  if (tokens.length === 0) {
    return [];
  }
  const [{ s }, ...rest] = tokens;
  const start = s.endsWith("ای")
    ? s.slice(0, -2)
    : s.endsWith("ی")
      ? s.slice(0, -1)
      : "";
  if (!start) return [];
  return findRoot(ph)(start, dicitonary)
    .map<T.ParsedVBP>((root) => ({
      type: "VB",
      info: {
        type: "ability",
        verb: root.verb,
        aspect: root.aspect,
      },
    }))
    .flatMap((m) => returnParseResult(rest, m));
}

export function parsePastPart(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.ParsedVBP>[] {
  const [{ s }, ...rest] = tokens;
  const ending: "ی" | "ي" | "ې" = s.at(-1) as "ی" | "ي" | "ې";
  if (!ending || !["ی", "ي", "ې"].includes(ending)) {
    return [];
  }

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
  const genNums = endingGenNum(ending);
  return matches
    .flatMap<T.ParsedVBP>((verb) =>
      genNums.map<T.ParsedVBP>((genNum) => ({
        type: "VB",
        info: {
          type: "ppart",
          verb,
          genNum,
        },
      }))
    )
    .flatMap((m) => returnParseResult(rest, m));
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
