import * as T from "../../../../types";
import { kawulStat, kawulDyn, kedulStat, kedulDyn } from "./irreg-verbs";
import { getOneToken, returnParseResults, tokensExist } from "../utils";
import { getPPartGenNums } from "./misc";

// TODO: do we ever really need this umbrella function?
// or are we always just parsing eithre PPart or Ability ??

export function parseKawulKedulVBP(
  tokens: T.Tokens,
  ph: T.ParsedPH | undefined,
): T.ParseResult<T.ParsedVBP>[] {
  if (!tokensExist(tokens)) {
    return [];
  }
  return [
    ...(!ph ? parseKawulKedulPPart(tokens) : []),
    ...parseKawulKedulAbility(tokens, ph),
  ];
  // TODO: Add ability kawul/kedul parsing
}

export function parseKawulKedulPPart(
  tokens: T.Tokens,
): T.ParseResult<T.ParsedVBPBasicPart>[] {
  const [first, rest] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (first.length !== 3) {
    return [];
  }
  if (!["کړ", "شو"].some((x) => first.startsWith(x))) {
    return [];
  }
  const genNums = getPPartGenNums(first);
  if (!genNums.length) {
    return [];
  }
  const verbs = first.startsWith("ک")
    ? [kawulStat, kawulDyn]
    : [kedulStat, kedulDyn];
  return returnParseResults(
    rest,
    verbs.flatMap((verb) =>
      genNums.flatMap((genNum) => [
        {
          type: "parsed vbp basic part",
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
  tokens: T.Tokens,
  ph: T.ParsedPH | undefined,
): T.ParseResult<T.ParsedVBPBasicAbility>[] {
  if (ph && ph.type === "PH" && ph.s !== "و") {
    return [];
  }
  const [first, rest] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  const { base, ending } = getAbilityBase(first);
  if (!ending) {
    return [];
  }
  if (base === "کو") {
    if (ph) {
      return [];
    }
    return returnParseResults(rest, [
      {
        type: "parsed vbp basic ability",
        info: {
          type: "ability",
          aspect: "imperfective",
          verb: kawulStat,
        },
      },
      {
        type: "parsed vbp basic ability",
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
        type: "parsed vbp basic ability",
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
          type: "parsed vbp basic ability",
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
