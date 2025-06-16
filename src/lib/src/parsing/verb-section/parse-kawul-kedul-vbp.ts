import * as T from "../../../../types";
import { kawulStat, kawulDyn, kedulStat, kedulDyn } from "./irreg-verbs";
import { returnParseResults } from "../utils";
import { getPPartGenNums } from "./parse-vbp";

// TODO: do we ever really need this umbrella function?
// or are we always just parsing eithre PPart or Ability ??

export function parseKawulKedulVBP(
  tokens: Readonly<T.Token[]>,
  ph: T.ParsedPH | undefined,
): T.ParseResult<T.ParsedVBPBasic>[] {
  if (!tokens.length) {
    return [];
  }
  return [
    ...(!ph ? parseKawulKedulPPart(tokens) : []),
    ...parseKawulKedulAbility(tokens, ph),
  ];
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

export function parseKawulKedulAbility(
  tokens: readonly T.Token[],
  ph: T.ParsedPH | undefined,
): T.ParseResult<T.ParsedVBPBasic>[] {
  if (!tokens.length) {
    return [];
  }
  if (ph && ph.type === "PH" && ph.s !== "و") {
    return [];
  }
  const [first, ...rest] = tokens;
  const { base, ending } = getAbilityBase(first.s);
  if (!ending) {
    return [];
  }
  if (base === "کو") {
    if (ph) {
      return [];
    }
    return returnParseResults(rest, [
      {
        type: "VB",
        info: {
          type: "ability",
          aspect: "imperfective",
          verb: kawulStat,
        },
      },
      {
        type: "VB",
        info: {
          type: "ability",
          aspect: "imperfective",
          verb: kawulDyn,
        },
      },
    ]);
  }
  if (base === "کړ") {
    return returnParseResults(rest, [
      {
        type: "VB",
        info: {
          type: "ability",
          aspect: "perfective",
          verb: ph?.type === "PH" ? kawulDyn : kawulStat,
        },
      },
    ]);
  }
  if (base === "کېد") {
    if (ph) {
      return [];
    }
    return returnParseResults(
      rest,
      [kedulDyn, kedulStat].flatMap((verb) =>
        (["imperfective", "perfective"] satisfies T.Aspect[]).map((aspect) => ({
          type: "VB",
          info: {
            type: "ability",
            aspect,
            verb: verb,
          },
        })),
      ),
    );
  }
  return [];
}

function getAbilityBase(s: string): { base: string; ending: boolean } {
  const ending = s.endsWith("ای") ? 2 : s.endsWith("ی") ? 1 : 0;
  if (!ending) {
    return { base: "", ending: false };
  }
  const baseR = s.slice(0, -ending);
  return {
    base: baseR.endsWith("ل") ? baseR.slice(0, -1) : baseR,
    ending: true,
  };
}
