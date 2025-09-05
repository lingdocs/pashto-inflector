import * as T from "../../../../types";
import { andSuccTp } from "../../fp-ps";
import { pashtoConsonants } from "../../pashto-consonants";
import * as tp from "../../type-predicates";
import {
  getOneToken,
  parserCombOr,
  returnParseResults,
  tokensExist,
} from "../utils";

type FemNounBaseParse = T.InflectableBaseParse<T.FemNounEntry>;

export function parseFemNoun(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<FemNounBaseParse>[] {
  if (!tokensExist(tokens)) {
    return [];
  }
  return parserCombOr([
    plainPlural,
    parsePattern1,
    parsePattern2,
    parsePattern3,
    parseEeEnding,
  ])(tokens, dictionary);
}
function plainPlural(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<FemNounBaseParse>[] {
  const [first, rest, firstPos] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  const plurLookup = (p: string) =>
    dictionary
      .queryP(p)
      .filter(andSuccTp(tp.isFemNounEntry, tp.isPluralNounEntry));
  const plain = plurLookup(first).map<FemNounBaseParse>((selection) => ({
    inflection: [0],
    gender: ["fem"],
    selection,
    given: first,
  }));
  const inflected = first.endsWith("و")
    ? (() => {
        const base = first.slice(0, -1);
        const guesses = [first, base + "ه", base + "ې"];
        return guesses
          .flatMap(plurLookup)
          .map<FemNounBaseParse>((selection) => ({
            inflection: [2],
            gender: ["fem"],
            selection,
            given: first,
          }));
      })()
    : [];
  return returnParseResults(rest, [...plain, ...inflected], firstPos);
}

function parsePattern1(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<FemNounBaseParse>[] {
  const [first, rest, firstPos] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  const p1Lookup = (p: string) =>
    dictionary
      .queryP(p)
      .filter(andSuccTp(tp.isFemNounEntry, tp.isPattern1Entry));
  const plain = ["ه", "ع"].some((v) => first.endsWith(v))
    ? p1Lookup(first).map<FemNounBaseParse>((selection) => ({
        inflection: [0],
        gender: ["fem"],
        selection,
        given: first,
      }))
    : [];
  const withoutA = pashtoConsonants.includes(first[first.length - 1])
    ? p1Lookup(first).map<FemNounBaseParse>((selection) => ({
        inflection: [0],
        gender: ["fem"],
        selection,
        given: first,
      }))
    : [];
  const inflected = first.endsWith("ې")
    ? (() => {
        const base = first.slice(0, -1);
        const lookups = [
          ...p1Lookup(base + "ه"),
          ...(["ح", "ع"].some((v) => first.at(-2) === v) ? p1Lookup(base) : []),
        ];
        return lookups.map<FemNounBaseParse>((selection) => ({
          inflection: [1],
          gender: ["fem"],
          selection,
          given: first,
        }));
      })()
    : [];
  const doubleInflected = first.endsWith("و")
    ? p1Lookup(first.slice(0, -1) + "ه").map<FemNounBaseParse>((selection) => ({
        inflection: [2],
        gender: ["fem"],
        selection,
        given: first,
      }))
    : [];
  return returnParseResults(
    rest,
    [...plain, ...withoutA, ...inflected, ...doubleInflected],
    firstPos,
  );
}

function parsePattern2(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<FemNounBaseParse>[] {
  const [first, rest, firstPos] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (first.endsWith("ې")) {
    return dictionary
      .queryP(first)
      .filter(
        andSuccTp(
          andSuccTp(tp.isFemNounEntry, tp.isPattern2Entry),
          tp.isSingularEntry,
        ),
      )
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [0, 1],
          gender: ["fem"],
          selection,
          given: first,
        },
        position: firstPos,
        errors: [],
      }));
  } else if (first.endsWith("و")) {
    const eGuess = first.endsWith("یو")
      ? first.slice(0, -1)
      : first.slice(0, -1) + "ې";
    return dictionary
      .queryP(eGuess)
      .filter(andSuccTp(tp.isFemNounEntry, tp.isPattern2Entry))
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [2],
          gender: ["fem"],
          selection,
          given: first,
        },
        position: firstPos,
        errors: [],
      }));
  }
  return [];
}

function parsePattern3(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<FemNounBaseParse>[] {
  const [first, rest, firstPos] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (first.endsWith("ۍ")) {
    return dictionary
      .queryP(first)
      .filter(
        andSuccTp(
          andSuccTp(tp.isFemNounEntry, tp.isPattern3Entry),
          tp.isSingularEntry,
        ),
      )
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [0, 1],
          gender: ["fem"],
          selection,
          given: first,
        },
        position: firstPos,
        errors: [],
      }));
  } else if (first.endsWith("و")) {
    const eGuess = first.endsWith("یو")
      ? first.slice(0, -2) + "ۍ"
      : first.slice(0, -1) + "ۍ";
    return dictionary
      .queryP(eGuess)
      .filter(andSuccTp(tp.isFemNounEntry, tp.isPattern3Entry))
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [2],
          gender: ["fem"],
          selection,
          given: first,
        },
        position: firstPos,
        errors: [],
      }));
  }
  return [];
}

function parseEeEnding(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<FemNounBaseParse>[] {
  const [first, rest, firstPos] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (first.endsWith("ي")) {
    return dictionary
      .queryP(first)
      .filter(tp.isPattern6FemEntry)
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [0],
          gender: ["fem"],
          selection,
          given: first,
        },
        position: firstPos,
        errors: [],
      }));
  } else if (first.endsWith("ۍ")) {
    return dictionary
      .queryP(first.slice(0, -1) + "ي")
      .filter(tp.isPattern6FemEntry)
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [1],
          gender: ["fem"],
          selection,
          given: first,
        },
        position: firstPos,
        errors: [],
      }));
  } else if (first.endsWith("و")) {
    const eGuess = first.endsWith("یو")
      ? first.slice(0, -2) + "ي"
      : first.slice(0, -1) + "ي";
    return dictionary
      .queryP(eGuess)
      .filter(tp.isPattern6FemEntry)
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [2],
          gender: ["fem"],
          selection,
          given: first,
        },
        position: firstPos,
        errors: [],
      }));
  }
  return [];
}
