import * as T from "../../../types";
import { returnParseResult } from "./utils";
// import { returnParseResult } from "./utils";

export function parseVBP(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.ParsedVBP>[] {
  if (tokens.length === 0) {
    return [];
  }
  return [
    ...parsePastPart(tokens, dictionary),
    // ...parseAbility(tokens),
  ];
}

function parsePastPart(
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
  const matches = dictionary.verbEntryLookup(wOutEnd);
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

// function parseAbility(
//   tokens: Readonly<T.Token[]>,
//   lookup: LookupFunction
// ): T.ParseResult<T.ParsedVBP>[] {
//   // TODO: keday
//   if (tokens.length === 0) {
//     return [];
//   }
//   const [{ s }, ...rest] = tokens;
//   const start = s.endsWith("ای")
//     ? s.slice(0, -2)
//     : s.endsWith("ی")
//     ? s.slice(0, 1)
//     : "";
//   if (!start) return [];
//   const matches = lookup(start, "ability");
//   return matches
//     .map<T.ParsedVBP>((verb) => ({
//       type: "VB",
//       info: {
//         type: "ability",
//         verb,
//         aspect: "perfective", // TODO GET ASPECT!!
//       },
//     }))
//     .flatMap((m) => returnParseResult(rest, m));
// }
