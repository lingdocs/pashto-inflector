import * as T from "../../../types";
import { fFlatMapParseResult } from "../fp-ps";
import { getInflectionPattern } from "../inflection-pattern";
import { makeNounSelection } from "../phrase-building/make-selections";
import { isNounEntry, isPluralNounEntry } from "../type-predicates";
import { parseInflectableWord } from "./parse-inflectable-word";
import { parseFemNoun } from "./parse-fem-noun";
import { parsePluralEndingNoun } from "./parse-plural-ending-noun";
import { parseIrregularPlural } from "./parse-irregular-plural";
import { parserCombOr } from "./utils";

export const parseNounWord: T.Parser<T.ParsedNounWord<T.NounEntry>> = (
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
) => {
  if (tokens.length === 0) {
    return [];
  }
  const withoutPluralEndings = fFlatMapParseResult(
    inflectableBaseParseToNounWordResults,
    [
      ...parseInflectableWord(tokens, dictionary, isNounEntry),
      ...parseFemNoun(tokens, dictionary),
    ]
  );
  return [
    ...withoutPluralEndings,
    ...parserCombOr([parsePluralEndingNoun, parseIrregularPlural])(
      tokens,
      dictionary
    ),
  ];
};

function inflectableBaseParseToNounWordResults<N extends T.NounEntry>(
  wr: T.InflectableBaseParse<N>
): T.ParsedNounWord<N>[] {
  function gendersWorkWithSelection(
    genders: T.Gender[],
    selection: T.NounSelection
  ): T.Gender[] {
    return genders.filter((g) => {
      if (selection.genderCanChange) {
        return true;
      }
      return selection.gender === g;
    });
  }
  const possibleGenders = gendersWorkWithSelection(
    wr.gender,
    makeNounSelection(wr.selection, undefined)
  );
  return possibleGenders.flatMap((gender) =>
    wr.inflection.flatMap((inflection) =>
      convertInflection(inflection, wr.selection, gender).flatMap(
        ({ inflected, number }) => ({
          inflected,
          plural: number === "plural",
          gender,
          given: wr.given,
          entry: wr.selection,
        })
      )
    )
  );
}

function convertInflection(
  inflection: 0 | 1 | 2,
  entry: T.NounEntry,
  gender: T.Gender
): {
  inflected: boolean;
  number: T.NounNumber;
}[] {
  const plural = isPluralNounEntry(entry);
  const pattern = getInflectionPattern(entry);
  const inf = (plural && inflection < 2 ? inflection + 1 : inflection) as
    | 0
    | 1
    | 2;
  if (inf === 0) {
    return [
      {
        inflected: false,
        number: "singular",
      },
    ];
  } else if (inf === 1) {
    return [
      ...(!plural &&
      !(pattern === 4 && entry.p.endsWith("ه") && gender === "masc")
        ? [
            {
              inflected: true,
              number: "singular" as T.NounNumber,
            },
          ]
        : []),
      ...(pattern > 1 ||
      (pattern > 0 && gender === "fem") ||
      (isNounEntry(entry) && isPluralNounEntry(entry)) ||
      plural
        ? [
            {
              inflected: false,
              number: "plural" as T.NounNumber,
            },
          ]
        : []),
    ];
  }
  return [
    {
      inflected: true,
      number: "plural",
    },
  ];
}
