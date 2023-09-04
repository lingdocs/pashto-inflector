import * as T from "../../../types";
import { LookupFunction } from "./lookup";
import { returnParseResult } from "./utils";

export function parsePastPart(
  tokens: Readonly<T.Token[]>,
  lookup: LookupFunction
): T.ParseResult<T.ParsedVBP>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [{ s }, ...rest] = tokens;
  const ending: "ی" | "ي" | "ې" = s.at(-1) as "ی" | "ي" | "ې";
  if (!ending || !["ی", "ي", "ې"].includes(ending)) {
    return [];
  }
  // TODO: ALSO HANDLE SHORT FORMS
  const wOutEnd = s.slice(0, -1);
  const matches = lookup(wOutEnd, "pPart");
  const genNums = endingGenderNum(ending);
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

function endingGenderNum(ending: "ی" | "ي" | "ې"): T.GenderNumber[] {
  if (ending === "ی") {
    return [
      {
        gender: "masc",
        number: "singular",
      },
    ];
  }
  if (ending === "ي") {
    return [
      {
        gender: "masc",
        number: "plural",
      },
    ];
  }
  // if (ending === "ې") {
  return [
    {
      gender: "fem",
      number: "singular",
    },
    {
      gender: "fem",
      number: "plural",
    },
  ];
  // }
}
