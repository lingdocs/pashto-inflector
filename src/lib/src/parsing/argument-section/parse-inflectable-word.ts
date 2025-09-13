import * as T from "../../../../types";
import { andSuccTp, orTp } from "../../fp-ps";
import * as tp from "../../type-predicates";
import { getOneToken, tokensExist } from "../utils";

export function parseInflectableWord<W extends T.InflectableEntry>(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
  tpf: (e: T.DictionaryEntry) => e is W,
): T.ParseResult<T.InflectableBaseParse<W>>[] {
  if (!tokensExist(tokens)) {
    return [];
  }
  return [
    parseNonInflecting,
    parsePattern1,
    parsePattern2or3,
    parsePattern4or5,
  ].flatMap((f) => f(tokens, dictionary, tpf));
}

function parseNonInflecting<W extends T.InflectableEntry>(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
  tpf: (e: T.DictionaryEntry) => e is W,
): T.ParseResult<T.InflectableBaseParse<W>>[] {
  const [first, rest, position] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  const matches = dictionary
    .queryP(first)
    .filter(andSuccTp(tpf, tp.isNonInflectingEntry));
  return matches.map((selection) => ({
    tokens: rest,
    body: {
      inflection: tp.isNounEntry(selection) ? [0, 1] : [0, 1, 2],
      gender: ["masc", "fem"],
      selection,
      given: first,
    },
    position,
    errors: [],
  }));
}

function parsePattern1<W extends T.InflectableEntry>(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
  tpf: (e: T.DictionaryEntry) => e is W,
): T.ParseResult<T.InflectableBaseParse<W>>[] {
  const [first, rest, position] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  const p1Lookup = (p: string) =>
    dictionary
      .queryP(p)
      .filter(
        (e) => tpf(e) && tp.isPattern1Entry(e) && !e.c.includes("fam."),
      ) as T.Pattern1Entry<W>[];
  const mascPlainOrInflected = p1Lookup(first).map((selection) => ({
    tokens: rest,
    body: {
      inflection: selection.c.includes("pl.") ? [0] : [0, 1],
      gender: ["masc"],
      selection,
      given: first,
    } satisfies T.InflectableBaseParse<W>,
    position,
    errors: [],
  }));
  const femPlain = first.endsWith("ه")
    ? [...p1Lookup(first.slice(0, -1)), ...p1Lookup(first)].map(
        (selection) => ({
          tokens: rest,
          body: {
            inflection: [0],
            gender: ["fem"],
            selection,
            given: first,
          } satisfies T.InflectableBaseParse<W>,
          position,
          errors: [],
        }),
      )
    : [];
  const femInflected = first.endsWith("ې")
    ? p1Lookup(first.slice(0, -1)).map((selection) => ({
        tokens: rest,
        body: {
          inflection: [1],
          gender: ["fem"],
          selection,
          given: first,
        } satisfies T.InflectableBaseParse<W>,
        position,
        errors: [],
      }))
    : [];
  const doubleInflected = first.endsWith("و")
    ? [
        ...p1Lookup(first.slice(0, -1)),
        ...p1Lookup(first.slice(0, -1) + "ه"),
      ].map((selection) => ({
        tokens: rest,
        body: {
          inflection: [2],
          gender: ["masc", "fem"],
          selection,
          given: first,
        } satisfies T.InflectableBaseParse<W>,
        position,
        errors: [],
      }))
    : [];
  return [
    ...mascPlainOrInflected,
    ...femPlain,
    ...femInflected,
    ...doubleInflected,
  ];
}

function parsePattern2or3<W extends T.InflectableEntry>(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
  tpf: (e: T.DictionaryEntry) => e is W,
): T.ParseResult<T.InflectableBaseParse<W>>[] {
  const [first, rest, position] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (first.endsWith("ی")) {
    return dictionary
      .queryP(first)
      .filter(andSuccTp(tpf, orTp(tp.isPattern2Entry, tp.isPattern3Entry)))
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [0],
          gender: ["masc"],
          selection,
          given: first,
        },
        position,
        errors: [],
      }));
  } else if (first.endsWith("ي")) {
    return dictionary
      .queryP(first.slice(0, -1) + "ی")
      .filter(andSuccTp(tpf, orTp(tp.isPattern2Entry, tp.isPattern3Entry)))
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [1],
          gender: ["masc"],
          selection,
          given: first,
        },
        position,
        errors: [],
      }));
  } else if (first.endsWith("ې")) {
    return dictionary
      .queryP(first.slice(0, -1) + "ی")
      .filter(andSuccTp(tpf, tp.isPattern2Entry))
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [0, 1],
          gender: ["fem"],
          selection,
          given: first,
        },
        position,
        errors: [],
      }));
  } else if (first.endsWith("ۍ")) {
    return dictionary
      .queryP(first.slice(0, -1) + "ی")
      .filter(andSuccTp(tpf, tp.isPattern3Entry))
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [0, 1],
          gender: ["fem"],
          selection,
          given: first,
        },
        position,
        errors: [],
      }));
  } else if (first.endsWith("و")) {
    const eGuess = first.endsWith("یو")
      ? first.slice(0, -1)
      : first.slice(0, -1) + "ی";
    return dictionary
      .queryP(eGuess)
      .filter(andSuccTp(tpf, orTp(tp.isPattern2Entry, tp.isPattern3Entry)))
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [2],
          gender: ["masc", "fem"],
          selection,
          given: first,
        },
        position,
        errors: [],
      }));
  }
  return [];
}

function parsePattern4or5<W extends T.InflectableEntry>(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
  tpf: (e: T.DictionaryEntry) => e is W,
): T.ParseResult<T.InflectableBaseParse<W>>[] {
  const [first, rest, position] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  const f = andSuccTp(tpf, orTp(tp.isPattern4Entry, tp.isPattern5Entry));
  const plainMasc = dictionary
    .queryP(first)
    .filter(f)
    .map((selection) => ({
      tokens: rest,
      body: {
        inflection: [0],
        gender: ["masc"],
        selection,
        given: first,
      } satisfies T.InflectableBaseParse<W>,
      position,
      errors: [],
    }));
  const firstMasc = first.endsWith("ه")
    ? dictionary
        .otherLookup("infap", first)
        .filter(f)
        .map((selection) => ({
          tokens: rest,
          body: {
            inflection: [1],
            gender: ["masc"],
            selection,
            given: first,
          } satisfies T.InflectableBaseParse<W>,
          position,
          errors: [],
        }))
    : [];
  const femPlain = first.endsWith("ه")
    ? dictionary
        .otherLookup("infbp", first.slice(0, -1))
        .filter(f)
        .map((selection) => ({
          tokens: rest,
          body: {
            inflection: [0],
            gender: ["fem"],
            selection,
            given: first,
          } satisfies T.InflectableBaseParse<W>,
          position,
          errors: [],
        }))
    : [];
  const femFirst = first.endsWith("ې")
    ? dictionary
        .otherLookup("infbp", first.slice(0, -1))
        .filter(f)
        .map((selection) => ({
          tokens: rest,
          body: {
            inflection: [1],
            gender: ["fem"],
            selection,
            given: first,
          } satisfies T.InflectableBaseParse<W>,
          position,
          errors: [],
        }))
    : [];
  const second = first.endsWith("و")
    ? dictionary
        .otherLookup("infbp", first.slice(0, -1))
        .filter(f)
        .map((selection) => ({
          tokens: rest,
          body: {
            inflection: [2],
            gender: ["masc", "fem"],
            selection,
            given: first,
          } satisfies T.InflectableBaseParse<W>,
          position,
          errors: [],
        }))
    : [];

  return [...plainMasc, ...firstMasc, ...femPlain, ...femFirst, ...second];
}
