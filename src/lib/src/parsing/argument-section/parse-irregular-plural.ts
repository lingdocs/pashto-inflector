import * as T from "../../../../types";
import { endsInConsonant } from "../../p-text-helpers";
import * as tp from "../../type-predicates";
import { getOneToken, returnParseResults } from "../utils";

export function parseIrregularPlural(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.ParsedNounWord<T.NounEntry>>[] {
  const [first, rest, position] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  const plain = dictionary
    .specialPluralLookup(first)
    .filter(tp.isNounEntry)
    .map<T.ParsedNounWord<T.NounEntry>>((entry) => ({
      entry,
      gender:
        tp.isFemNounEntry(entry) && !hasMasculineArabicPlural(entry)
          ? "fem"
          : "masc",
      inflected: false,
      given: first,
      plural: true,
    }));
  const inflected = first.endsWith("و")
    ? dictionary
        .specialPluralLookup(first.slice(0, -1) + "(ه|ې|ع)?")
        .filter(tp.isNounEntry)
        .map<T.ParsedNounWord<T.NounEntry>>((entry) => ({
          entry,
          gender: tp.isFemNounEntry(entry) ? "fem" : "masc",
          inflected: true,
          given: first,
          plural: true,
        }))
    : [];
  const inflectedAfterLong = first.endsWith("وو")
    ? dictionary
        .specialPluralLookup(first.slice(0, -2))
        .filter(
          (e) =>
            tp.isNounEntry(e) && e.app !== undefined && e.app.endsWith("ا"),
        )
        .map<T.ParsedNounWord<T.NounEntry>>((entry) => ({
          entry,
          gender: tp.isFemNounEntry(entry) ? "fem" : "masc",
          inflected: true,
          given: first,
          plural: true,
        }))
    : [];
  const inflectedAfterLongSep = (() => {
    if (tokens.position < tokens.tokens.length - 2) {
      return [];
    }
    if (tokens.tokens[tokens.position + 1] !== "وو") {
      return [];
    }
    return returnParseResults(
      {
        ...tokens,
        position: tokens.position + 2,
      },
      dictionary
        .specialPluralLookup(first)
        .filter(
          (e) =>
            tp.isNounEntry(e) && e.app !== undefined && e.app.endsWith("ا"),
        )
        .map<T.ParsedNounWord<T.NounEntry>>((entry) => ({
          entry,
          gender: tp.isFemNounEntry(entry) ? "fem" : "masc",
          inflected: true,
          given: first,
          plural: true,
        })),
      {
        start: position.start,
        end: position.end + 1,
      },
    );
  })();
  return [
    ...returnParseResults(
      rest,
      [...plain, ...inflected, ...inflectedAfterLong],
      position,
    ),
    ...inflectedAfterLongSep,
  ];
}

function hasMasculineArabicPlural(e: T.FemNounEntry): boolean {
  if (
    e.app === undefined ||
    e.app === "" ||
    e.apf === undefined ||
    e.apf === ""
  ) {
    return false;
  }
  return endsInConsonant({ p: e.app, f: e.apf });
}
