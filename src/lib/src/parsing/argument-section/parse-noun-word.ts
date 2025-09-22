import * as T from "../../../../types";
import { fFlatMapParseResult } from "../../fp-ps";
import { getInflectionPattern } from "../../inflection-pattern";
import { makeNounSelection } from "../../phrase-building/make-selections";
import { isNounEntry, isPluralNounEntry } from "../../type-predicates";
import { parseInflectableWord } from "./../argument-section/parse-inflectable-word";
import { parseFemNoun } from "./../argument-section/parse-fem-noun";
import { parsePluralEndingNoun } from "./parse-plural-ending-noun";
import { parseIrregularPlural } from "./../argument-section/parse-irregular-plural";
import { parserCombOr, tokensExist } from "./../utils";

export const parseNounWord: T.Parser<T.ParsedNounWord<T.NounEntry>> = (
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
) => {
  if (!tokensExist(tokens)) {
    return [];
  }
  const withoutPluralEndings = fFlatMapParseResult(
    inflectableBaseParseToNounWordResults,
    [
      ...parseInflectableWord(tokens, dictionary, isNounEntry),
      ...parseFemNoun(tokens, dictionary),
    ],
  );
  return [
    ...withoutPluralEndings,
    ...parserCombOr([parsePluralEndingNoun, parseIrregularPlural])(
      tokens,
      dictionary,
    ),
  ];
};

function inflectableBaseParseToNounWordResults<N extends T.NounEntry>(
  wr: T.InflectableBaseParse<N>,
): T.ParsedNounWord<N>[] {
  function gendersWorkWithSelection(
    genders: T.Gender[],
    selection: T.NounSelection,
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
    makeNounSelection(wr.selection, undefined),
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
        }),
      ),
    ),
  );
}

function convertInflection(
  inflection: 0 | 1 | 2,
  entry: T.NounEntry,
  gender: T.Gender,
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
      !(
        pattern === T.InflectionPattern.Pashtun &&
        entry.p.endsWith("ه") &&
        gender === "masc"
      )
        ? [
            {
              inflected: true,
              number: "singular" as T.NounNumber,
            },
          ]
        : []),
      ...(pattern > T.InflectionPattern.Basic ||
      (pattern > T.InflectionPattern.None && gender === "fem") ||
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

export function personsFromPattern1(base: string, r: string): T.Person[] {
  if (r === base) {
    return [
      T.Person.FirstSingMale,
      T.Person.SecondSingMale,
      T.Person.ThirdSingMale,
      T.Person.FirstPlurMale,
      T.Person.SecondPlurMale,
      T.Person.ThirdPlurMale,
    ];
  }
  if (`${base}ه` === r) {
    return [
      T.Person.FirstSingFemale,
      T.Person.SecondSingFemale,
      T.Person.ThirdSingFemale,
    ];
  }
  if (`${base}ې` === r) {
    return [
      T.Person.FirstPlurFemale,
      T.Person.SecondPlurFemale,
      T.Person.ThirdPlurFemale,
    ];
  }
  return [];
}
