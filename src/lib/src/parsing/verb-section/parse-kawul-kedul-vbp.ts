import * as T from "../../../../types";
import { kawulStat, kawulDyn, kedulStat, kedulDyn } from "./irreg-verbs";
import { returnParseResults } from "../utils";
import { getPPartGenNums } from "./parse-vbp";

export function parseKawulKedulVBP(
  tokens: Readonly<T.Token[]>,
  ph: T.ParsedPH | undefined,
): T.ParseResult<T.ParsedVBPBasic>[] {
  if (!tokens.length) {
    return [];
  }
  return [...(!ph ? parseKawulKedulPPart(tokens) : [])];
  // TODO: Add ability kawul/kedul parsing
}

export function parseKawulKedulPPart(
  tokens: readonly T.Token[],
): T.ParseResult<T.ParsedVBPBasic>[] {
  if (!tokens.length) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (first.s.length !== 3) {
    return [];
  }
  if (!["کړ", "شو"].some((x) => first.s.startsWith(x))) {
    return [];
  }
  const genNums = getPPartGenNums(first.s);
  if (!genNums.length) {
    return [];
  }
  const verbs = first.s.startsWith("ک")
    ? [kawulStat, kawulDyn]
    : [kedulStat, kedulDyn];
  return returnParseResults(
    rest,
    verbs.flatMap<T.ParsedVBPBasic>((verb) =>
      genNums.flatMap<T.ParsedVBPBasic>((genNum) => [
        {
          type: "VB",
          info: {
            type: "ppart",
            verb,
            genNum,
          },
        },
      ]),
    ),
  );
}
