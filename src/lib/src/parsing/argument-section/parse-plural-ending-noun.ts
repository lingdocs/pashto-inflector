import * as T from "../../../../types";
import {
  endsInAaOrOo,
  endsInConsonant,
  endsWith,
  hasShwaEnding,
} from "../../p-text-helpers";
import * as tp from "../../type-predicates";
import { returnParseResults } from "../utils";

export function parsePluralEndingNoun(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.ParsedNounWord<T.NounEntry>>[] {
  if (tokens.length === 0) {
    return [];
  }
  // TODO: should maybe differentiate animate and inanimate aan endings ?
  return [
    // parseSpecialPlural,
    parseOonaEndingNoun,
    parseAanEndingNoun,
    parseAaneEndingNoun,
    parseGaanEndingNoun,
    parseGaaneEndingNoun,
    parseWeEndingNoun,
    parseIYaanEndingNoun,
    parseIYaaneEndingNoun,
  ].flatMap((f) => f(tokens, dictionary));
}

// function parseSpecialPlural(
//   tokens: Readonly<T.Token[]>,
//   dictionary: T.DictionaryAPI
// ): T.ParseResult<T.ParsedNounWord<T.NounEntry>>[] {
//   if (tokens.length === 0) {
//     return [];
//   }
//   const [first, ...rest] = tokens;
//   if (first.s.endsWith("یانې")) {
//     const withoutIYaane = first.s.slice(0, -4);
//     const eeEnding = dictionary
//       .queryP(withoutIYaane + "ي")
//       .filter(tp.isFemNounEntry);
//     const pattern3UnisexAnim = dictionary
//       .queryP(withoutIYaane + "ی")
//       .filter(
//         (e) => tp.isUnisexNounEntry(e) && tp.isPattern3Entry(e)
//       ) as T.MascNounEntry[];
//     const pattern3Fem = dictionary
//       .queryP(withoutIYaane + "ۍ")
//       .filter((e) => tp.isFemNounEntry(e) && tp.isPattern3Entry(e));
//     return returnParseResults(
//       rest,
//       [...eeEnding, ...pattern3UnisexAnim, ...pattern3Fem].map<
//         T.ParsedNounWord<T.MascNounEntry | T.FemNounEntry>
//       >((entry) => ({
//         inflected: false,
//         gender: "masc",
//         given: first.s,
//         plural: true,
//         entry,
//       }))
//     );
//   }
//   if (first.s.endsWith("یانو")) {
//     const withoutIYaano = first.s.slice(0, -4);
//     const eeEnding = dictionary
//       .queryP(withoutIYaano + "ي")
//       .filter((e) => tp.isFemNounEntry(e) && tp.isSingularEntry(e));
//     const pattern3Anim = dictionary
//       .queryP(withoutIYaano + "ۍ")
//       .filter((e) => tp.isFemNounEntry(e) && tp.isPattern3Entry(e));
//     return returnParseResults(
//       rest,
//       [...eeEnding, ...pattern3Anim].map<T.ParsedNounWord<T.FemNounEntry>>(
//         (entry) => ({
//           inflected: true,
//           gender: "masc",
//           given: first.s,
//           plural: true,
//           entry,
//         })
//       )
//     );
//   }
//   return [];
// }

function parseOonaEndingNoun(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.ParsedNounWord<T.MascNounEntry>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (!first.s.endsWith("ونه") && !first.s.endsWith("ونو")) {
    return [];
  }
  const withoutOona = first.s.slice(0, -3);
  const consonantEnding = dictionary
    .queryP(withoutOona)
    .filter(
      (e) =>
        tp.isMascNounEntry(e) &&
        endsInConsonant(e) &&
        !e.ppp &&
        tp.isSingularEntry(e)
    ) as T.MascNounEntry[];
  const shwaEnding = dictionary
    .queryP(withoutOona + "ه")
    .filter(
      (e) =>
        tp.isMascNounEntry(e) &&
        hasShwaEnding(e) &&
        !e.ppp &&
        tp.isSingularEntry(e)
    ) as T.MascNounEntry[];
  const body = [...consonantEnding, ...shwaEnding].map<
    T.ParsedNounWord<T.MascNounEntry>
  >((entry) => ({
    inflected: first.s.endsWith("ونو"),
    gender: "masc",
    given: first.s,
    plural: true,
    entry,
  }));
  return returnParseResults(rest, body);
}

function parseAanEndingNoun(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.ParsedNounWord<T.MascNounEntry>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (first.s.endsWith("ان")) {
    const withoutAan = first.s.slice(0, -2);
    const consonantEnding = dictionary
      .queryP(withoutAan)
      .filter(
        (e) =>
          tp.isMascNounEntry(e) && endsInConsonant(e) && tp.isSingularEntry(e)
      ) as T.MascNounEntry[];
    const shwaEnding = dictionary
      .queryP(withoutAan + "ه")
      .filter(
        (e) =>
          tp.isMascNounEntry(e) && hasShwaEnding(e) && tp.isSingularEntry(e)
      ) as T.MascNounEntry[];
    const body = [...consonantEnding, ...shwaEnding].map<
      T.ParsedNounWord<T.MascNounEntry>
    >((entry) => ({
      inflected: false,
      gender: "masc",
      given: first.s,
      plural: true,
      entry,
    }));
    return returnParseResults(rest, body);
  }
  if (first.s.endsWith("انو")) {
    const withoutAano = first.s.slice(0, -3);
    const consonantEnding = dictionary
      .queryP(withoutAano)
      .filter(
        (e) =>
          tp.isMascNounEntry(e) && endsInConsonant(e) && tp.isSingularEntry(e)
      ) as T.MascNounEntry[];
    const shwaEnding = dictionary
      .queryP(withoutAano + "ه")
      .filter(
        (e) =>
          tp.isMascNounEntry(e) && hasShwaEnding(e) && tp.isSingularEntry(e)
      ) as T.MascNounEntry[];
    const body = [...consonantEnding, ...shwaEnding].flatMap<
      T.ParsedNounWord<T.MascNounEntry>
    >((entry) => [
      {
        inflected: true,
        gender: "masc",
        given: first.s,
        plural: true,
        entry,
      },
      ...(tp.isUnisexAnimNounEntry(entry)
        ? [
            {
              inflected: true,
              gender: "fem",
              given: first.s,
              plural: true,
              entry,
            } satisfies T.ParsedNounWord<T.MascNounEntry>,
          ]
        : []),
    ]);
    return returnParseResults(rest, body);
  }
  return [];
}

function parseAaneEndingNoun(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.ParsedNounWord<T.NounEntry>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (first.s.endsWith("انې")) {
    const withoutAane = first.s.slice(0, -3);
    const unisexAy = dictionary
      .queryP(withoutAane)
      .filter(tp.isUnisexAnimNounEntry);
    const body = unisexAy.map<T.ParsedNounWord<T.UnisexAnimNounEntry>>(
      (entry) => ({
        inflected: false,
        gender: "fem",
        given: first.s,
        plural: true,
        entry,
      })
    );
    return returnParseResults(rest, body);
  }
  return [];
}

function parseGaanEndingNoun(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.ParsedNounWord<T.MascNounEntry>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (first.s.endsWith("ګان")) {
    const body = dictionary
      .queryP(first.s.slice(0, -3))
      .filter(
        (e) => tp.isMascNounEntry(e) && endsInAaOrOo(e) && tp.isSingularEntry(e)
      )
      .map<T.ParsedNounWord<T.MascNounEntry>>((entry) => ({
        inflected: false,
        gender: "masc",
        given: first.s,
        plural: true,
        entry: entry as T.MascNounEntry,
      }));
    return returnParseResults(rest, body);
  }
  if (first.s.endsWith("ګانو")) {
    const body = dictionary
      .queryP(first.s.slice(0, -4))
      .filter(
        (e) => tp.isMascNounEntry(e) && endsInAaOrOo(e) && tp.isSingularEntry(e)
      )
      .map<T.ParsedNounWord<T.MascNounEntry>>((entry) => ({
        inflected: true,
        gender: "masc",
        given: first.s,
        plural: true,
        entry: entry as T.MascNounEntry,
      }));
    return returnParseResults(rest, body);
  }
  if (tokens.length >= 2) {
    const [first, next, ...rest] = tokens;
    if (next.s === "ګان") {
      const body = dictionary
        .queryP(first.s)
        .filter(
          (e) =>
            tp.isMascNounEntry(e) && endsInAaOrOo(e) && tp.isSingularEntry(e)
        )
        .map<T.ParsedNounWord<T.MascNounEntry>>((entry) => ({
          inflected: false,
          gender: "masc",
          given: first.s + " " + next.s,
          plural: true,
          entry: entry as T.MascNounEntry,
        }));
      return returnParseResults(rest, body);
    }
    if (next.s === "ګانو") {
      const body = dictionary
        .queryP(first.s)
        .filter(
          (e) =>
            tp.isMascNounEntry(e) && endsInAaOrOo(e) && tp.isSingularEntry(e)
        )
        .map<T.ParsedNounWord<T.MascNounEntry>>((entry) => ({
          inflected: true,
          gender: "masc",
          given: first.s + " " + next.s,
          plural: true,
          entry: entry as T.MascNounEntry,
        }));
      return returnParseResults(rest, body);
    }
  }
  return [];
}

function parseGaaneEndingNoun(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.ParsedNounWord<T.FemNounEntry>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const canTakeGaane = (e: T.DictionaryEntry): e is T.FemNounEntry =>
    tp.isFemNounEntry(e) &&
    tp.isSingularEntry(e) &&
    endsWith(
      [
        { p: "و", f: "o" },
        { p: "ا", f: "aa" },
        { p: "ې", f: "e" },
        { p: "ي", f: "ee" },
      ],
      e
    );
  if (first.s.endsWith("یګانې")) {
    const body = dictionary
      .queryP(first.s.slice(0, -5) + "ي")
      .filter(canTakeGaane)
      .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
        inflected: false,
        gender: "fem",
        given: first.s,
        plural: true,
        entry,
      }));
    return returnParseResults(rest, body);
  }
  if (first.s.endsWith("ګانې")) {
    const body = dictionary
      .queryP(first.s.slice(0, -4))
      .filter(canTakeGaane)
      .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
        inflected: false,
        gender: "fem",
        given: first.s,
        plural: true,
        entry,
      }));
    return returnParseResults(rest, body);
  }
  if (first.s.endsWith("یګانو")) {
    const body = dictionary
      .queryP(first.s.slice(0, -5) + "ي")
      .filter(canTakeGaane)
      .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
        inflected: true,
        gender: "fem",
        given: first.s,
        plural: true,
        entry,
      }));
    return returnParseResults(rest, body);
  }
  if (first.s.endsWith("ګانو")) {
    const body = dictionary
      .queryP(first.s.slice(0, -4))
      .filter(canTakeGaane)
      .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
        inflected: true,
        gender: "fem",
        given: first.s,
        plural: true,
        entry,
      }));
    return returnParseResults(rest, body);
  }
  if (tokens.length >= 2) {
    const [first, next, ...rest] = tokens;
    if (next.s === "ګانې") {
      const body = dictionary
        .queryP(first.s)
        .filter(canTakeGaane)
        .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
          inflected: false,
          gender: "fem",
          given: first.s + " " + next.s,
          plural: true,
          entry,
        }));
      return returnParseResults(rest, body);
    }
    if (next.s === "ګانو") {
      const body = dictionary
        .queryP(first.s)
        .filter(canTakeGaane)
        .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
          inflected: true,
          gender: "fem",
          given: first.s + " " + next.s,
          plural: true,
          entry,
        }));
      return returnParseResults(rest, body);
    }
  }
  return [];
}

function parseWeEndingNoun(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.ParsedNounWord<T.FemNounEntry>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const canTakeWe = (e: T.DictionaryEntry): e is T.FemNounEntry =>
    tp.isFemNounEntry(e) &&
    tp.isSingularEntry(e) &&
    endsWith(
      [
        { p: "و", f: "o" },
        { p: "ا", f: "aa" },
        { p: "ې", f: "e" },
      ],
      e
    );
  if (first.s.endsWith("وې")) {
    const body = dictionary
      .queryP(first.s.slice(0, -2))
      .filter(canTakeWe)
      .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
        inflected: false,
        gender: "fem",
        given: first.s,
        plural: true,
        entry,
      }));
    return returnParseResults(rest, body);
  } else if (first.s.endsWith("وو")) {
    const body = dictionary
      .queryP(first.s.slice(0, -2))
      .filter(canTakeWe)
      .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
        inflected: true,
        gender: "fem",
        given: first.s,
        plural: true,
        entry,
      }));
    return returnParseResults(rest, body);
  }
  if (tokens.length >= 2) {
    const [first, next, ...rest] = tokens;
    if (next.s === "وې") {
      const body = dictionary
        .queryP(first.s)
        .filter(canTakeWe)
        .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
          inflected: false,
          gender: "fem",
          given: first.s + " " + next.s,
          plural: true,
          entry,
        }));
      return returnParseResults(rest, body);
    }
    if (next.s === "وو") {
      const body = dictionary
        .queryP(first.s)
        .filter(canTakeWe)
        .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
          inflected: true,
          gender: "fem",
          given: first.s + " " + next.s,
          plural: true,
          entry,
        }));
      return returnParseResults(rest, body);
    }
  }
  return [];
}

function parseIYaanEndingNoun(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.ParsedNounWord<T.MascNounEntry>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (first.s.endsWith("یان")) {
    const withoutIYaan = first.s.slice(0, -3);
    const eeEnding = dictionary
      .queryP(withoutIYaan + "ي")
      .filter(
        (e) => tp.isMascNounEntry(e) && tp.isSingularEntry(e)
      ) as T.MascNounEntry[];
    const pattern3Anim = dictionary
      .queryP(withoutIYaan + "ی")
      .filter(
        (e) => tp.isMascNounEntry(e) && tp.isPattern3Entry(e)
      ) as T.MascNounEntry[];
    return returnParseResults(
      rest,
      [...eeEnding, ...pattern3Anim].map<T.ParsedNounWord<T.MascNounEntry>>(
        (entry) => ({
          inflected: false,
          gender: "masc",
          given: first.s,
          plural: true,
          entry: entry as T.MascNounEntry,
        })
      )
    );
  }
  if (first.s.endsWith("یانو")) {
    const withoutIYaano = first.s.slice(0, -4);
    const eeEnding = dictionary
      .queryP(withoutIYaano + "ي")
      .filter(
        (e) => tp.isMascNounEntry(e) && tp.isSingularEntry(e)
      ) as T.MascNounEntry[];
    const pattern3Anim = dictionary
      .queryP(withoutIYaano + "ی")
      .filter(
        (e) => tp.isMascNounEntry(e) && tp.isPattern3Entry(e)
      ) as T.MascNounEntry[];
    return returnParseResults(
      rest,
      [...eeEnding, ...pattern3Anim].flatMap<T.ParsedNounWord<T.MascNounEntry>>(
        (entry) => [
          {
            inflected: true,
            gender: "masc",
            given: first.s,
            plural: true,
            entry: entry as T.MascNounEntry,
          },
          ...(tp.isUnisexNounEntry(entry)
            ? [
                {
                  inflected: true,
                  gender: "fem",
                  given: first.s,
                  plural: true,
                  entry: entry as T.UnisexNounEntry,
                } satisfies T.ParsedNounWord<T.MascNounEntry>,
              ]
            : []),
        ]
      )
    );
  }
  return [];
}

function parseIYaaneEndingNoun(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.ParsedNounWord<T.MascNounEntry | T.FemNounEntry>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (first.s.endsWith("یانې")) {
    const withoutIYaane = first.s.slice(0, -4);
    const eeEnding = dictionary
      .queryP(withoutIYaane + "ي")
      .filter(tp.isFemNounEntry);
    const pattern3UnisexAnim = dictionary
      .queryP(withoutIYaane + "ی")
      .filter(
        (e) => tp.isUnisexNounEntry(e) && tp.isPattern3Entry(e)
      ) as T.MascNounEntry[];
    const pattern3Fem = dictionary
      .queryP(withoutIYaane + "ۍ")
      .filter((e) => tp.isFemNounEntry(e) && tp.isPattern3Entry(e));
    return returnParseResults(
      rest,
      [...eeEnding, ...pattern3UnisexAnim, ...pattern3Fem].map<
        T.ParsedNounWord<T.MascNounEntry | T.FemNounEntry>
      >((entry) => ({
        inflected: false,
        gender: "masc",
        given: first.s,
        plural: true,
        entry,
      }))
    );
  }
  if (first.s.endsWith("یانو")) {
    const withoutIYaano = first.s.slice(0, -4);
    const eeEnding = dictionary
      .queryP(withoutIYaano + "ي")
      .filter((e) => tp.isFemNounEntry(e) && tp.isSingularEntry(e));
    const pattern3Anim = dictionary
      .queryP(withoutIYaano + "ۍ")
      .filter((e) => tp.isFemNounEntry(e) && tp.isPattern3Entry(e));
    return returnParseResults(
      rest,
      [...eeEnding, ...pattern3Anim].map<T.ParsedNounWord<T.FemNounEntry>>(
        (entry) => ({
          inflected: true,
          gender: "masc",
          given: first.s,
          plural: true,
          entry,
        })
      )
    );
  }
  return [];
}
