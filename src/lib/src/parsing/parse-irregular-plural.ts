import * as T from "../../../types";
import { endsInConsonant } from "../p-text-helpers";
import * as tp from "../type-predicates";
import { returnParseResults } from "./utils";

export function parseIrregularPlural(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.ParsedNounWord<T.NounEntry>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const plain = dictionary
    .specialPluralLookup(first.s)
    .filter(tp.isNounEntry)
    .map<T.ParsedNounWord<T.NounEntry>>((entry) => ({
      entry,
      gender:
        tp.isFemNounEntry(entry) && !hasMasculineArabicPlural(entry)
          ? "fem"
          : "masc",
      inflected: false,
      given: first.s,
      plural: true,
    }));
  const inflected = first.s.endsWith("و")
    ? dictionary
        .specialPluralLookup(first.s.slice(0, -1) + "(ه|ې|ع)?")
        .filter(tp.isNounEntry)
        .map<T.ParsedNounWord<T.NounEntry>>((entry) => ({
          entry,
          gender: tp.isFemNounEntry(entry) ? "fem" : "masc",
          inflected: true,
          given: first.s,
          plural: true,
        }))
    : [];
  const inflectedAfterLong = first.s.endsWith("وو")
    ? dictionary
        .specialPluralLookup(first.s.slice(0, -2))
        .filter((e) => tp.isNounEntry(e) && e.app?.endsWith("ا"))
        .map<T.ParsedNounWord<T.NounEntry>>((entry) => ({
          entry,
          gender: tp.isFemNounEntry(entry) ? "fem" : "masc",
          inflected: true,
          given: first.s,
          plural: true,
        }))
    : [];
  const inflectedAfterLongSep = (() => {
    if (tokens.length < 2) {
      return [];
    }
    if (tokens[1].s !== "وو") {
      return [];
    }
    return returnParseResults(
      tokens.slice(2),
      dictionary
        .specialPluralLookup(first.s)
        .filter((e) => tp.isNounEntry(e) && e.app?.endsWith("ا"))
        .map<T.ParsedNounWord<T.NounEntry>>((entry) => ({
          entry,
          gender: tp.isFemNounEntry(entry) ? "fem" : "masc",
          inflected: true,
          given: first.s,
          plural: true,
        }))
    );
  })();
  return [
    ...returnParseResults(rest, [
      ...plain,
      ...inflected,
      ...inflectedAfterLong,
    ]),
    ...inflectedAfterLongSep,
  ];
}

function hasMasculineArabicPlural(e: T.FemNounEntry): boolean {
  if (!e.app || !e.apf) return false;
  return endsInConsonant({ p: e.app, f: e.apf });
}
