import * as T from "../../../types";
// import { returnParseResult } from "./utils";

export function parseVBP(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.ParsedVBP>[] {
  if (tokens.length === 0) {
    return [];
  }
  return [];
  // return [
  //   ...parsePastPart(tokens, lookup),
  //   // ...parseAbility(tokens),
  // ];
}

// function parsePastPart(
//   tokens: Readonly<T.Token[]>,
//   dicitonary: T.DictionaryAPI,
// ): T.ParseResult<T.ParsedVBP>[] {
//   const [{ s }, ...rest] = tokens;
//   const ending: "ی" | "ي" | "ې" = s.at(-1) as "ی" | "ي" | "ې";
//   if (!ending || !["ی", "ي", "ې"].includes(ending)) {
//     return [];
//   }
//   // TODO: ALSO HANDLE SHORT FORMS
//   const wOutEnd = s.slice(0, -1);
//   const matches = lookup(wOutEnd, "pPart");
//   const genNums = endingGenderNum(ending);
//   return matches
//     .flatMap<T.ParsedVBP>((verb) =>
//       genNums.map<T.ParsedVBP>((genNum) => ({
//         type: "VB",
//         info: {
//           type: "ppart",
//           verb,
//           genNum,
//         },
//       }))
//     )
//     .flatMap((m) => returnParseResult(rest, m));
// }

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

// function endingGenderNum(ending: "ی" | "ي" | "ې"): T.GenderNumber[] {
//   if (ending === "ی") {
//     return [
//       {
//         gender: "masc",
//         number: "singular",
//       },
//     ];
//   }
//   if (ending === "ي") {
//     return [
//       {
//         gender: "masc",
//         number: "plural",
//       },
//     ];
//   }
//   // if (ending === "ې") {
//   return [
//     {
//       gender: "fem",
//       number: "singular",
//     },
//     {
//       gender: "fem",
//       number: "plural",
//     },
//   ];
//   // }
// }
