import * as T from "../../../types";
import { andSuccTp, orTp } from "../fp-ps";
import * as tp from "../type-predicates";

export function parseInflectableWord<W extends T.InflectableEntry>(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  tpf: (e: T.DictionaryEntry) => e is W
): T.ParseResult<T.InflectableBaseParse<W>>[] {
  if (tokens.length === 0) {
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
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  tpf: (e: T.DictionaryEntry) => e is W
): T.ParseResult<T.InflectableBaseParse<W>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const matches = dictionary
    .queryP(first.s)
    .filter(andSuccTp(tpf, tp.isNonInflectingEntry));
  return matches.map((selection) => ({
    tokens: rest,
    body: {
      inflection: tp.isNounEntry(selection) ? [0, 1] : [0, 1, 2],
      gender: ["masc", "fem"],
      selection,
      given: first.s,
    },
    errors: [],
  }));
}

function parsePattern1<W extends T.InflectableEntry>(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  tpf: (e: T.DictionaryEntry) => e is W
): T.ParseResult<T.InflectableBaseParse<W>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const p1Lookup = (p: string) =>
    dictionary
      .queryP(p)
      .filter(
        (e) => tpf(e) && tp.isPattern1Entry(e) && !e.c.includes("fam.")
      ) as T.Pattern1Entry<W>[];
  const mascPlainOrInflected = p1Lookup(first.s).map((selection) => ({
    tokens: rest,
    body: {
      inflection: selection.c.includes("pl.") ? [0] : [0, 1],
      gender: ["masc"],
      selection,
      given: first.s,
    } satisfies T.InflectableBaseParse<W>,
    errors: [],
  }));
  const femPlain = first.s.endsWith("ه")
    ? p1Lookup(first.s.slice(0, -1)).map((selection) => ({
        tokens: rest,
        body: {
          inflection: [0],
          gender: ["fem"],
          selection,
          given: first.s,
        } satisfies T.InflectableBaseParse<W>,
        errors: [],
      }))
    : [];
  const femInflected = first.s.endsWith("ې")
    ? p1Lookup(first.s.slice(0, -1)).map((selection) => ({
        tokens: rest,
        body: {
          inflection: [1],
          gender: ["fem"],
          selection,
          given: first.s,
        } satisfies T.InflectableBaseParse<W>,
        errors: [],
      }))
    : [];
  const doubleInflected = first.s.endsWith("و")
    ? [
        ...p1Lookup(first.s.slice(0, -1)),
        ...p1Lookup(first.s.slice(0, -1) + "ه"),
      ].map((selection) => ({
        tokens: rest,
        body: {
          inflection: [2],
          gender: ["masc", "fem"],
          selection,
          given: first.s,
        } satisfies T.InflectableBaseParse<W>,
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
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  tpf: (e: T.DictionaryEntry) => e is W
): T.ParseResult<T.InflectableBaseParse<W>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (first.s.endsWith("ی")) {
    return dictionary
      .queryP(first.s)
      .filter(andSuccTp(tpf, orTp(tp.isPattern2Entry, tp.isPattern3Entry)))
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [0],
          gender: ["masc"],
          selection,
          given: first.s,
        },
        errors: [],
      }));
  } else if (first.s.endsWith("ي")) {
    return dictionary
      .queryP(first.s.slice(0, -1) + "ی")
      .filter(andSuccTp(tpf, orTp(tp.isPattern2Entry, tp.isPattern3Entry)))
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [1],
          gender: ["masc"],
          selection,
          given: first.s,
        },
        errors: [],
      }));
  } else if (first.s.endsWith("ې")) {
    return dictionary
      .queryP(first.s.slice(0, -1) + "ی")
      .filter(andSuccTp(tpf, tp.isPattern2Entry))
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
  } else if (first.s.endsWith("ۍ")) {
    return dictionary
      .queryP(first.s.slice(0, -1) + "ی")
      .filter(andSuccTp(tpf, tp.isPattern3Entry))
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
      : first.s.slice(0, -1) + "ی";
    return dictionary
      .queryP(eGuess)
      .filter(andSuccTp(tpf, orTp(tp.isPattern2Entry, tp.isPattern3Entry)))
      .map((selection) => ({
        tokens: rest,
        body: {
          inflection: [2],
          gender: ["masc", "fem"],
          selection,
          given: first.s,
        },
        errors: [],
      }));
  }
  return [];
}

function parsePattern4or5<W extends T.InflectableEntry>(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  tpf: (e: T.DictionaryEntry) => e is W
): T.ParseResult<T.InflectableBaseParse<W>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const f = andSuccTp(tpf, orTp(tp.isPattern4Entry, tp.isPattern5Entry));
  const plainMasc = dictionary
    .queryP(first.s)
    .filter(f)
    .map((selection) => ({
      tokens: rest,
      body: {
        inflection: [0],
        gender: ["masc"],
        selection,
        given: first.s,
      } satisfies T.InflectableBaseParse<W>,
      errors: [],
    }));
  const firstMasc = first.s.endsWith("ه")
    ? dictionary
        .otherLookup("infap", first.s)
        .filter(f)
        .map((selection) => ({
          tokens: rest,
          body: {
            inflection: [1],
            gender: ["masc"],
            selection,
            given: first.s,
          } satisfies T.InflectableBaseParse<W>,
          errors: [],
        }))
    : [];
  const femPlain = first.s.endsWith("ه")
    ? dictionary
        .otherLookup("infbp", first.s.slice(0, -1))
        .filter(f)
        .map((selection) => ({
          tokens: rest,
          body: {
            inflection: [0],
            gender: ["fem"],
            selection,
            given: first.s,
          } satisfies T.InflectableBaseParse<W>,
          errors: [],
        }))
    : [];
  const femFirst = first.s.endsWith("ې")
    ? dictionary
        .otherLookup("infbp", first.s.slice(0, -1))
        .filter(f)
        .map((selection) => ({
          tokens: rest,
          body: {
            inflection: [1],
            gender: ["fem"],
            selection,
            given: first.s,
          } satisfies T.InflectableBaseParse<W>,
          errors: [],
        }))
    : [];
  const second = first.s.endsWith("و")
    ? dictionary
        .otherLookup("infbp", first.s.slice(0, -1))
        .filter(f)
        .map((selection) => ({
          tokens: rest,
          body: {
            inflection: [2],
            gender: ["masc", "fem"],
            selection,
            given: first.s,
          } satisfies T.InflectableBaseParse<W>,
          errors: [],
        }))
    : [];

  return [...plainMasc, ...firstMasc, ...femPlain, ...femFirst, ...second];
}
