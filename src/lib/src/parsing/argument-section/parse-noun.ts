import * as T from "../../../../types";
import { makeNounSelection } from "../../phrase-building/make-selections";
import { parseAdjective } from "./parse-adjective-new";
import { parseDeterminer } from "./parse-determiner";
import { parseNounWord } from "./parse-noun-word";
import { bindParseResult, parserCombMany, parserCombSucc3 } from "../utils";

type NounResult = { inflected: boolean; selection: T.NounSelection };

export function parseNoun(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  possesor: T.PossesorSelection | undefined
): T.ParseResult<NounResult>[] {
  if (tokens.length === 0) {
    return [];
  }
  // TODO: the succ could be optimized using the bindParseResultWParser trick
  const res = parserCombSucc3([
    parserCombMany(parseDeterminer),
    parserCombMany(parseAdjective),
    parseNounWord,
  ])(tokens, dictionary);
  return bindParseResult(res, (tkns, [determiners, adjectives, nounWord]) => {
    const errors: T.ParseError[] = [
      ...adjDetsMatch(
        [...adjectives, ...determiners],
        nounWord.gender,
        nounWord.inflected,
        nounWord.plural
      ),
      ...checkForDeterminerDuplicates(determiners),
    ];
    const s = makeNounSelection(nounWord.entry, undefined);
    const body: NounResult = {
      inflected: nounWord.inflected,
      selection: {
        ...s,
        gender: nounWord.gender,
        number: nounWord.plural ? "plural" : "singular",
        adjectives: adjectives.map((a) => a.selection),
        determiners: determiners.length
          ? {
              type: "determiners",
              withNoun: true,
              determiners: determiners.map((d) => d.selection),
            }
          : undefined,
        possesor,
      },
    };
    return [
      {
        body,
        tokens: tkns,
        errors,
      },
    ];
  });
}

function checkForDeterminerDuplicates(
  determiners: T.InflectableBaseParse<T.DeterminerSelection>[]
): T.ParseError[] {
  // from https://flexiple.com/javascript/find-duplicates-javascript-array
  const array = determiners.map((d) => d.selection.determiner.p);
  const duplicates: string[] = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        if (!duplicates.includes(array[i])) {
          duplicates.push(array[i]);
        }
      }
    }
  }
  return duplicates.map((x) => ({ message: `duplicate determiner ${x}` }));
}

export function adjDetsMatch(
  ads: T.InflectableBaseParse<T.AdjectiveSelection | T.DeterminerSelection>[],
  gender: T.Gender,
  inflected: boolean,
  plural: boolean
): T.ParseError[] {
  // TODO: will need to do special cases for په  کې etc
  return ads.flatMap<T.ParseError>((x) => {
    const genderErr: T.ParseError[] = !x.gender.includes(gender)
      ? [{ message: `${x.given} should be ${gender}.` }]
      : [];
    const isDemons =
      x.selection.type === "determiner" &&
      isDemonstrative(x.selection.determiner);
    const inflectionNum =
      isDemons && !inflected ? 0 : ((+inflected + +plural) as 0 | 1 | 2);
    const infErr: T.ParseError[] = !x.inflection.includes(inflectionNum)
      ? [
          {
            message: `${x.given} should be ${showInflection(inflectionNum)}`,
          },
        ]
      : [];
    return [...genderErr, ...infErr];
  });
}

function showInflection(inf: 0 | 1 | 2): string {
  return inf === 0
    ? "plain"
    : inf === 1
    ? "first inflection"
    : "second inflection";
}

function isDemonstrative(x: T.Determiner): boolean {
  return "demonstrative" in x && x.demonstrative;
}
