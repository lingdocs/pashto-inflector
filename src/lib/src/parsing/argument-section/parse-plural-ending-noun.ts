import * as T from "../../../../types";
import {
  endsInAaOrOo,
  endsInConsonant,
  endsWith,
  hasShwaEnding,
} from "../../p-text-helpers";
import * as tp from "../../type-predicates";
import {
  getOneToken,
  getTwoTokens,
  returnParseResults,
  tokensExist,
} from "../utils";

export function parsePluralEndingNoun(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.ParsedNounWord<T.NounEntry>>[] {
  if (!tokensExist(tokens)) {
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
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.ParsedNounWord<T.MascNounEntry>>[] {
  const [first, rest, position] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (!first.endsWith("ونه") && !first.endsWith("ونو")) {
    return [];
  }
  const withoutOona = first.slice(0, -3);
  const consonantEnding = dictionary
    .queryP(withoutOona)
    .filter(
      (e) =>
        tp.isMascNounEntry(e) &&
        endsInConsonant(e) &&
        !e.ppp &&
        tp.isSingularEntry(e),
    ) as T.MascNounEntry[];
  const shwaEnding = dictionary
    .queryP(withoutOona + "ه")
    .filter(
      (e) =>
        tp.isMascNounEntry(e) &&
        hasShwaEnding(e) &&
        !e.ppp &&
        tp.isSingularEntry(e),
    ) as T.MascNounEntry[];
  const body = [...consonantEnding, ...shwaEnding].map<
    T.ParsedNounWord<T.MascNounEntry>
  >((entry) => ({
    inflected: first.endsWith("ونو"),
    gender: "masc",
    given: first,
    plural: true,
    entry,
  }));
  return returnParseResults(rest, body, position);
}

function parseAanEndingNoun(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.ParsedNounWord<T.MascNounEntry>>[] {
  const [first, rest, position] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (first.endsWith("ان")) {
    const withoutAan = first.slice(0, -2);
    const consonantEnding = dictionary
      .queryP(withoutAan)
      .filter(
        (e) =>
          tp.isMascNounEntry(e) && endsInConsonant(e) && tp.isSingularEntry(e),
      ) as T.MascNounEntry[];
    const shwaEnding = dictionary
      .queryP(withoutAan + "ه")
      .filter(
        (e) =>
          tp.isMascNounEntry(e) && hasShwaEnding(e) && tp.isSingularEntry(e),
      ) as T.MascNounEntry[];
    const body = [...consonantEnding, ...shwaEnding].map<
      T.ParsedNounWord<T.MascNounEntry>
    >((entry) => ({
      inflected: false,
      gender: "masc",
      given: first,
      plural: true,
      entry,
    }));
    return returnParseResults(rest, body, position);
  }
  if (first.endsWith("انو")) {
    const withoutAano = first.slice(0, -3);
    const consonantEnding = dictionary
      .queryP(withoutAano)
      .filter(
        (e) =>
          tp.isMascNounEntry(e) && endsInConsonant(e) && tp.isSingularEntry(e),
      ) as T.MascNounEntry[];
    const shwaEnding = dictionary
      .queryP(withoutAano + "ه")
      .filter(
        (e) =>
          tp.isMascNounEntry(e) && hasShwaEnding(e) && tp.isSingularEntry(e),
      ) as T.MascNounEntry[];
    const body = [...consonantEnding, ...shwaEnding].flatMap<
      T.ParsedNounWord<T.MascNounEntry>
    >((entry) => [
      {
        inflected: true,
        gender: "masc",
        given: first,
        plural: true,
        entry,
      },
      ...(tp.isUnisexAnimNounEntry(entry)
        ? [
            {
              inflected: true,
              gender: "fem",
              given: first,
              plural: true,
              entry,
            } satisfies T.ParsedNounWord<T.MascNounEntry>,
          ]
        : []),
    ]);
    return returnParseResults(rest, body, position);
  }
  return [];
}

function parseAaneEndingNoun(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.ParsedNounWord<T.NounEntry>>[] {
  const [first, rest, position] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (first.endsWith("انې")) {
    const withoutAane = first.slice(0, -3);
    const unisexAy = dictionary
      .queryP(withoutAane)
      .filter(tp.isUnisexAnimNounEntry);
    const body = unisexAy.map<T.ParsedNounWord<T.UnisexAnimNounEntry>>(
      (entry) => ({
        inflected: false,
        gender: "fem",
        given: first,
        plural: true,
        entry,
      }),
    );
    return returnParseResults(rest, body, position);
  }
  return [];
}

function parseGaanEndingNoun(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.ParsedNounWord<T.MascNounEntry>>[] {
  const [first, rest, position] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (first.endsWith("ګان")) {
    const body = dictionary
      .queryP(first.slice(0, -3))
      .filter(
        (e) =>
          tp.isMascNounEntry(e) && endsInAaOrOo(e) && tp.isSingularEntry(e),
      )
      .map<T.ParsedNounWord<T.MascNounEntry>>((entry) => ({
        inflected: false,
        gender: "masc",
        given: first,
        plural: true,
        entry: entry as T.MascNounEntry,
      }));
    return returnParseResults(rest, body, position);
  }
  if (first.endsWith("ګانو")) {
    const body = dictionary
      .queryP(first.slice(0, -4))
      .filter(
        (e) =>
          tp.isMascNounEntry(e) && endsInAaOrOo(e) && tp.isSingularEntry(e),
      )
      .map<T.ParsedNounWord<T.MascNounEntry>>((entry) => ({
        inflected: true,
        gender: "masc",
        given: first,
        plural: true,
        entry: entry as T.MascNounEntry,
      }));
    return returnParseResults(rest, body, position);
  }
  const [a, b, leftOver] = getTwoTokens(tokens);
  const position2 = { start: tokens.position, end: tokens.position + 2 };
  if (!a) {
    return [];
  }
  if (b === "ګان") {
    const body = dictionary
      .queryP(a)
      .filter(
        (e) =>
          tp.isMascNounEntry(e) && endsInAaOrOo(e) && tp.isSingularEntry(e),
      )
      .map<T.ParsedNounWord<T.MascNounEntry>>((entry) => ({
        inflected: false,
        gender: "masc",
        given: a + " " + b,
        plural: true,
        entry: entry as T.MascNounEntry,
      }));
    return returnParseResults(leftOver, body, position2);
  }
  if (b === "ګانو") {
    const body = dictionary
      .queryP(a)
      .filter(
        (e) =>
          tp.isMascNounEntry(e) && endsInAaOrOo(e) && tp.isSingularEntry(e),
      )
      .map<T.ParsedNounWord<T.MascNounEntry>>((entry) => ({
        inflected: true,
        gender: "masc",
        given: a + " " + b,
        plural: true,
        entry: entry as T.MascNounEntry,
      }));
    return returnParseResults(leftOver, body, position2);
  }
  return [];
}

function parseGaaneEndingNoun(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.ParsedNounWord<T.FemNounEntry>>[] {
  const [first, rest, position] = getOneToken(tokens);
  if (!first) {
    return [];
  }
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
      e,
    );
  if (first.endsWith("یګانې")) {
    const body = dictionary
      .queryP(first.slice(0, -5) + "ي")
      .filter(canTakeGaane)
      .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
        inflected: false,
        gender: "fem",
        given: first,
        plural: true,
        entry,
      }));
    return returnParseResults(rest, body, position);
  }
  if (first.endsWith("ګانې")) {
    const body = dictionary
      .queryP(first.slice(0, -4))
      .filter(canTakeGaane)
      .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
        inflected: false,
        gender: "fem",
        given: first,
        plural: true,
        entry,
      }));
    return returnParseResults(rest, body, position);
  }
  if (first.endsWith("یګانو")) {
    const body = dictionary
      .queryP(first.slice(0, -5) + "ي")
      .filter(canTakeGaane)
      .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
        inflected: true,
        gender: "fem",
        given: first,
        plural: true,
        entry,
      }));
    return returnParseResults(rest, body, position);
  }
  if (first.endsWith("ګانو")) {
    const body = dictionary
      .queryP(first.slice(0, -4))
      .filter(canTakeGaane)
      .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
        inflected: true,
        gender: "fem",
        given: first,
        plural: true,
        entry,
      }));
    return returnParseResults(rest, body, position);
  }
  const [a, b, leftOver] = getTwoTokens(tokens);
  const position2 = { start: tokens.position, end: tokens.position + 2 };
  if (!a) {
    return [];
  }
  if (b === "ګانې") {
    const body = dictionary
      .queryP(a)
      .filter(canTakeGaane)
      .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
        inflected: false,
        gender: "fem",
        given: a + " " + b,
        plural: true,
        entry,
      }));
    return returnParseResults(leftOver, body, position2);
  }
  if (b === "ګانو") {
    const body = dictionary
      .queryP(a)
      .filter(canTakeGaane)
      .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
        inflected: true,
        gender: "fem",
        given: a + " " + b,
        plural: true,
        entry,
      }));
    return returnParseResults(leftOver, body, position2);
  }
  return [];
}

function parseWeEndingNoun(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.ParsedNounWord<T.FemNounEntry>>[] {
  const [first, rest, position] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  const canTakeWe = (e: T.DictionaryEntry): e is T.FemNounEntry =>
    tp.isFemNounEntry(e) &&
    tp.isSingularEntry(e) &&
    endsWith(
      [
        { p: "و", f: "o" },
        { p: "ا", f: "aa" },
        { p: "ې", f: "e" },
      ],
      e,
    );
  if (first.endsWith("وې")) {
    const body = dictionary
      .queryP(first.slice(0, -2))
      .filter(canTakeWe)
      .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
        inflected: false,
        gender: "fem",
        given: first,
        plural: true,
        entry,
      }));
    return returnParseResults(rest, body, position);
  } else if (first.endsWith("وو")) {
    const body = dictionary
      .queryP(first.slice(0, -2))
      .filter(canTakeWe)
      .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
        inflected: true,
        gender: "fem",
        given: first,
        plural: true,
        entry,
      }));
    return returnParseResults(rest, body, position);
  }
  const [a, b, leftOver] = getTwoTokens(tokens);
  const position2 = { start: tokens.position, end: tokens.position + 2 };
  if (!a) {
    return [];
  }
  if (b === "وې") {
    const body = dictionary
      .queryP(a)
      .filter(canTakeWe)
      .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
        inflected: false,
        gender: "fem",
        given: a + " " + b,
        plural: true,
        entry,
      }));
    return returnParseResults(leftOver, body, position2);
  }
  if (b === "وو") {
    const body = dictionary
      .queryP(a)
      .filter(canTakeWe)
      .map<T.ParsedNounWord<T.FemNounEntry>>((entry) => ({
        inflected: true,
        gender: "fem",
        given: a + " " + b,
        plural: true,
        entry,
      }));
    return returnParseResults(leftOver, body, position2);
  }
  return [];
}

function parseIYaanEndingNoun(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.ParsedNounWord<T.MascNounEntry>>[] {
  const [first, rest, position] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (first.endsWith("یان")) {
    const withoutIYaan = first.slice(0, -3);
    const eeEnding = dictionary
      .queryP(withoutIYaan + "ي")
      .filter(
        (e) => tp.isMascNounEntry(e) && tp.isSingularEntry(e),
      ) as T.MascNounEntry[];
    const pattern3Anim = dictionary
      .queryP(withoutIYaan + "ی")
      .filter(
        (e) => tp.isMascNounEntry(e) && tp.isPattern3Entry(e),
      ) as T.MascNounEntry[];
    return returnParseResults(
      rest,
      [...eeEnding, ...pattern3Anim].map<T.ParsedNounWord<T.MascNounEntry>>(
        (entry) => ({
          inflected: false,
          gender: "masc",
          given: first,
          plural: true,
          entry: entry as T.MascNounEntry,
        }),
      ),
      position,
    );
  }
  if (first.endsWith("یانو")) {
    const withoutIYaano = first.slice(0, -4);
    const eeEnding = dictionary
      .queryP(withoutIYaano + "ي")
      .filter(
        (e) => tp.isMascNounEntry(e) && tp.isSingularEntry(e),
      ) as T.MascNounEntry[];
    const pattern3Anim = dictionary
      .queryP(withoutIYaano + "ی")
      .filter(
        (e) => tp.isMascNounEntry(e) && tp.isPattern3Entry(e),
      ) as T.MascNounEntry[];
    return returnParseResults(
      rest,
      [...eeEnding, ...pattern3Anim].flatMap<T.ParsedNounWord<T.MascNounEntry>>(
        (entry) => [
          {
            inflected: true,
            gender: "masc",
            given: first,
            plural: true,
            entry: entry as T.MascNounEntry,
          },
          ...(tp.isUnisexNounEntry(entry)
            ? [
                {
                  inflected: true,
                  gender: "fem",
                  given: first,
                  plural: true,
                  entry: entry as T.UnisexNounEntry,
                } satisfies T.ParsedNounWord<T.MascNounEntry>,
              ]
            : []),
        ],
      ),
      position,
    );
  }
  return [];
}

function parseIYaaneEndingNoun(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.ParsedNounWord<T.MascNounEntry | T.FemNounEntry>>[] {
  const [first, rest, position] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (first.endsWith("یانې")) {
    const withoutIYaane = first.slice(0, -4);
    const eeEnding = dictionary
      .queryP(withoutIYaane + "ي")
      .filter(tp.isFemNounEntry);
    const pattern3UnisexAnim = dictionary
      .queryP(withoutIYaane + "ی")
      .filter(
        (e) => tp.isUnisexNounEntry(e) && tp.isPattern3Entry(e),
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
        given: first,
        plural: true,
        entry,
      })),
      position,
    );
  }
  if (first.endsWith("یانو")) {
    const withoutIYaano = first.slice(0, -4);
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
          given: first,
          plural: true,
          entry,
        }),
      ),
      position,
    );
  }
  return [];
}
