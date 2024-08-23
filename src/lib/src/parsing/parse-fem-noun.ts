import * as T from "../../../types";
import { andSuccTp } from "../fp-ps";
import { pashtoConsonants } from "../pashto-consonants";
import * as tp from "../type-predicates";
import { parserCombOr, returnParseResults } from "./utils";

type FemNounBaseParse = T.InflectableBaseParse<T.FemNounEntry>;

export function parseFemNoun(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<FemNounBaseParse>[] {
  if (tokens.length === 0) {
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
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<FemNounBaseParse>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const plurLookup = (p: string) =>
    dictionary
      .queryP(p)
      .filter(andSuccTp(tp.isFemNounEntry, tp.isPluralNounEntry));
  const plain = plurLookup(first.s).map<FemNounBaseParse>((selection) => ({
    inflection: [0],
    gender: ["fem"],
    selection,
    given: first.s,
  }));
  const inflected = first.s.endsWith("و")
    ? (() => {
        const base = first.s.slice(0, -1);
        const guesses = [first.s, base + "ه", base + "ې"];
        return guesses
          .flatMap(plurLookup)
          .map<FemNounBaseParse>((selection) => ({
            inflection: [2],
            gender: ["fem"],
            selection,
            given: first.s,
          }));
      })()
    : [];
  return returnParseResults(rest, [...plain, ...inflected]);
}

function parsePattern1(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<FemNounBaseParse>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const p1Lookup = (p: string) =>
    dictionary
      .queryP(p)
      .filter(andSuccTp(tp.isFemNounEntry, tp.isPattern1Entry));
  const plain = ["ه", "ع"].some((v) => first.s.endsWith(v))
    ? p1Lookup(first.s).map<FemNounBaseParse>((selection) => ({
        inflection: [0],
        gender: ["fem"],
        selection,
        given: first.s,
      }))
    : [];
  const withoutA = pashtoConsonants.includes(first.s[first.s.length - 1])
    ? p1Lookup(first.s).map<FemNounBaseParse>((selection) => ({
        inflection: [0],
        gender: ["fem"],
        selection,
        given: first.s,
      }))
    : [];
  const inflected = first.s.endsWith("ې")
    ? (() => {
        const base = first.s.slice(0, -1);
        const lookups = [
          ...p1Lookup(base + "ه"),
          ...(["ح", "ع"].some((v) => first.s.at(-2) === v)
            ? p1Lookup(base)
            : []),
        ];
        return lookups.map<FemNounBaseParse>((selection) => ({
          inflection: [1],
          gender: ["fem"],
          selection,
          given: first.s,
        }));
      })()
    : [];
  const doubleInflected = first.s.endsWith("و")
    ? p1Lookup(first.s.slice(0, -1) + "ه").map<FemNounBaseParse>(
        (selection) => ({
          inflection: [2],
          gender: ["fem"],
          selection,
          given: first.s,
        })
      )
    : [];
  return returnParseResults(rest, [
    ...plain,
    ...withoutA,
    ...inflected,
    ...doubleInflected,
  ]);
}

function parsePattern2(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<FemNounBaseParse>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (first.s.endsWith("ې")) {
    return dictionary
      .queryP(first.s)
      .filter(
        andSuccTp(
          andSuccTp(tp.isFemNounEntry, tp.isPattern2Entry),
          tp.isSingularEntry
        )
      )
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [0, 1],
          gender: ["fem"],
          selection,
          given: first.s,
        },
        errors: [],
      }));
  } else if (first.s.endsWith("و")) {
    const eGuess = first.s.endsWith("یو")
      ? first.s.slice(0, -1)
      : first.s.slice(0, -1) + "ې";
    return dictionary
      .queryP(eGuess)
      .filter(andSuccTp(tp.isFemNounEntry, tp.isPattern2Entry))
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [2],
          gender: ["fem"],
          selection,
          given: first.s,
        },
        errors: [],
      }));
  }
  return [];
}

function parsePattern3(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<FemNounBaseParse>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (first.s.endsWith("ۍ")) {
    return dictionary
      .queryP(first.s)
      .filter(
        andSuccTp(
          andSuccTp(tp.isFemNounEntry, tp.isPattern3Entry),
          tp.isSingularEntry
        )
      )
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [0, 1],
          gender: ["fem"],
          selection,
          given: first.s,
        },
        errors: [],
      }));
  } else if (first.s.endsWith("و")) {
    const eGuess = first.s.endsWith("یو")
      ? first.s.slice(0, -2) + "ۍ"
      : first.s.slice(0, -1) + "ۍ";
    return dictionary
      .queryP(eGuess)
      .filter(andSuccTp(tp.isFemNounEntry, tp.isPattern3Entry))
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [2],
          gender: ["fem"],
          selection,
          given: first.s,
        },
        errors: [],
      }));
  }
  return [];
}

function parseEeEnding(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<FemNounBaseParse>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (first.s.endsWith("ي")) {
    return dictionary
      .queryP(first.s)
      .filter(tp.isPattern6FemEntry)
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [0],
          gender: ["fem"],
          selection,
          given: first.s,
        },
        errors: [],
      }));
  } else if (first.s.endsWith("ۍ")) {
    return dictionary
      .queryP(first.s.slice(0, -1) + "ي")
      .filter(tp.isPattern6FemEntry)
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [1],
          gender: ["fem"],
          selection,
          given: first.s,
        },
        errors: [],
      }));
  } else if (first.s.endsWith("و")) {
    const eGuess = first.s.endsWith("یو")
      ? first.s.slice(0, -2) + "ي"
      : first.s.slice(0, -1) + "ي";
    return dictionary
      .queryP(eGuess)
      .filter(tp.isPattern6FemEntry)
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [2],
          gender: ["fem"],
          selection,
          given: first.s,
        },
        errors: [],
      }));
  }
  return [];
}
