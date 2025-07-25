import * as T from "../../../../types";
import {
  bindParseResult,
  getOneToken,
  getStatComp,
  returnParseResult,
  returnParseResults,
  tokensExist,
} from "../utils";
import { kawulStat, kedulStat } from "../verb-section/irreg-verbs";
import { getLFromComplement } from "../verb-section/misc";
import { shortVerbEndConsonant } from "./../verb-section/misc";
import { parseComplement } from "./parse-complement";

type ParticipleResult = {
  inflected: boolean;
  selection: T.ParticipleSelection;
};

// TODO: parse participles with dynamic compounds

// TODO: should have adverbs with participle
// TODO: NOTE this does not work with compound verbs yet
export function parseParticiple(
  tokens: T.Tokens,
  dicitonary: T.DictionaryAPI,
  possesor: T.PossesorSelection | undefined,
  lookForComp: boolean,
): T.ParseResult<ParticipleResult>[] {
  return [
    ...(lookForComp
      ? parseStativeCompSepPart(tokens, dicitonary, possesor)
      : []),
    ...parseJoinedPart(tokens, dicitonary, possesor),
  ];
}

function parseJoinedPart(
  tokens: T.Tokens,
  dicitonary: T.DictionaryAPI,
  possesor: T.PossesorSelection | undefined,
): T.ParseResult<ParticipleResult>[] {
  const [first, rest] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (!["ل", "و"].includes(first.at(-1) || "")) {
    return [];
  }
  const inflected = first.endsWith("و");

  return [
    ...dicitonary.verbEntryLookup(inflected ? first.slice(0, -1) : first),
    ...(inflected && shortVerbEndConsonant.includes(first.at(-2) || "")
      ? dicitonary.verbEntryLookup(first.slice(0, -1) + "ل")
      : []),
  ].map<T.ParseResult<ParticipleResult>>((verb) => ({
    tokens: rest,
    body: {
      inflected,
      selection: {
        type: "participle",
        verb,
        possesor,
      },
    },
    errors: [],
  }));
}

function parseStativeCompSepPart(
  tokens: T.Tokens,
  dicitonary: T.DictionaryAPI,
  possesor: T.PossesorSelection | undefined,
): T.ParseResult<ParticipleResult>[] {
  if (!tokensExist(tokens)) {
    return [];
  }
  const comps = parseComplement(tokens, dicitonary);
  return bindParseResult(comps, (tkns2, comp) => {
    if (
      !("inflection" in comp.selection) &&
      (comp.selection.type === "sandwich" || comp.selection.type === "possesor")
    ) {
      return [];
    }
    const errors: T.ParseError[] = [];
    if ("inflection" in comp.selection) {
      if (
        !comp.selection.gender.includes("masc") ||
        !comp.selection.inflection.includes(1)
      ) {
        errors.push({
          message:
            "complement of stative compound participle must be masc. pl.",
        });
      }
    }
    const compL = getLFromComplement(comp);
    const kawulKedul = parseCompAuxPart(tkns2);
    return bindParseResult(kawulKedul, (tkns3, aux) => {
      if (!compL) {
        return [];
      }
      const verbs = getStatComp(
        compL,
        {
          verb: aux.transitivity === "transitive" ? kawulStat : kedulStat,
          aspect: "imperfective",
        },
        dicitonary,
        true,
      );
      return returnParseResults(
        tkns3,
        verbs.map((verb) => ({
          inflected: aux.inflected,
          selection: {
            type: "participle",
            verb,
            possesor,
          },
        })),
        errors,
      );
    });
  });
}

function parseCompAuxPart(
  tokens: T.Tokens,
): T.ParseResult<{ inflected: boolean; transitivity: T.Transitivity }>[] {
  const [first, rest] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (first === "کېدل") {
    return returnParseResult(rest, {
      inflected: false,
      transitivity: "intransitive",
    });
  }
  if (["کېدلو", "کېدو"].includes(first)) {
    return returnParseResult(rest, {
      inflected: true,
      transitivity: "intransitive",
    });
  }
  if (first === "کول") {
    return returnParseResult(rest, {
      inflected: false,
      transitivity: "transitive",
    });
  }
  if (first === "کولو") {
    return returnParseResult(rest, {
      inflected: true,
      transitivity: "transitive",
    });
  }
  return [];
}
