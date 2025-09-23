import * as T from "../../../../types";
import { makeNounSelection } from "../../phrase-building/make-selections";
import { parseAdjective } from "./parse-adjective";
import { parseDeterminer } from "./parse-determiner";
import { parseNounWord } from "./parse-noun-word";
import {
  bindParseWithAllErrors,
  parserCombMany,
  parserCombSucc2,
  returnParseResults,
  tokensExist,
} from "../utils";
import { fmapParseResult } from "../../fp-ps";
import { testDictionary } from "../mini-test-dictionary";

const saray = testDictionary.nounLookup("سړی")[0];
const xudza = testDictionary.nounLookup("ښځه")[0];

export type NounResult = { inflected: boolean; selection: T.NounSelection };

export function parseNoun(possesor: T.PossesorSelection | undefined) {
  return function (
    tokens: T.Tokens,
    dictionary: T.DictionaryAPI,
  ): T.ParseResult<NounResult>[] {
    if (!tokensExist(tokens)) {
      return [];
    }
    const determiners = parserCombMany(parseDeterminer)(tokens, dictionary);
    const res = bindParseWithAllErrors(determiners, (tkns, dts) => {
      const singleDet = getLoneDeterminer(dts.content.map((x) => x.content));
      const demWOutNoun =
        // TODO: should make test to make sure that you can't do a standalone
        // demonstrative w a possesor
        singleDet && !possesor ? makeDemWOutNoun(tkns, singleDet) : [];
      const adjsAndNoun = parserCombSucc2(
        parserCombMany(parseAdjective),
        parseNounWord,
      )(tkns, dictionary);
      const wNoun = fmapParseResult<
        [
          T.WithPos<T.WithPos<T.InflectableBaseParse<T.AdjectiveSelection>>[]>,
          T.WithPos<T.ParsedNounWord<T.NounEntry>>,
        ],
        [
          {
            withNoun: boolean;
            determiners: T.InflectableBaseParse<T.DeterminerSelection>[];
          },
          T.InflectableBaseParse<T.AdjectiveSelection>[],
          T.ParsedNounWord<T.NounEntry>,
        ]
      >(
        ([adjs, noun]) =>
          // TODO: could have better retention of WithPos info for better error handling granularity
          [
            { withNoun: true, determiners: dts.content.map((x) => x.content) },
            adjs.content.map((x) => x.content),
            noun.content,
          ] as const,
        adjsAndNoun,
      );
      return [...wNoun, ...demWOutNoun];
    });
    // TODO: the succ could be optimized using the bindParseResultWParser trick

    return bindParseWithAllErrors(res, (tkns, x) => {
      const [determiners, adjectives, nounWord] = x.content;
      const errors: T.ParseError[] = [
        ...adjDetsMatch(
          [...adjectives, ...determiners.determiners],
          nounWord.gender,
          nounWord.inflected,
          nounWord.plural,
        ),
        ...checkForDeterminerDuplicates(determiners.determiners),
      ];
      const s = makeNounSelection(nounWord.entry, undefined);
      const body: NounResult = {
        inflected: nounWord.inflected,
        selection: {
          ...s,
          gender: nounWord.gender,
          number: nounWord.plural ? "plural" : "singular",
          adjectives: adjectives.map((a) => a.selection),
          determiners: determiners.determiners.length
            ? {
                type: "determiners",
                withNoun: determiners.withNoun,
                determiners: determiners.determiners.map((d) => d.selection),
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
          position: x.position,
        },
      ];
    });
  };
}

function getLoneDeterminer(
  dts: T.InflectableBaseParse<T.DeterminerSelection>[],
): T.InflectableBaseParse<T.DeterminerSelection> | undefined {
  if (dts.length !== 1) {
    return undefined;
  }
  const d = dts[0];
  if (
    "demonstrative" in d.selection.determiner &&
    d.selection.determiner.demonstrative
  ) {
    return d;
  } else {
    return undefined;
  }
}

function makeDemWOutNoun(
  tokens: T.Tokens,
  d: T.InflectableBaseParse<T.DeterminerSelection>,
): T.ParseResult<
  Readonly<
    [
      {
        withNoun: boolean;
        determiners: T.InflectableBaseParse<T.DeterminerSelection>[];
      },
      T.InflectableBaseParse<T.AdjectiveSelection>[],
      T.ParsedNounWord<T.NounEntry>,
    ]
  >
>[] {
  const ents = {
    masc: saray,
    fem: xudza,
  };
  const possibilities = getPossibleNounsFromDet(d);
  const options = possibilities.map<T.ParsedNounWord<T.NounEntry>>((p) => ({
    inflected: p.inflected,
    plural: p.plural,
    gender: p.gender,
    given: "",
    entry: ents[p.gender],
  }));
  return returnParseResults(
    tokens,
    options.map((n) => [{ withNoun: false, determiners: [d] }, [], n] as const),
    // TODO: is this accurate??
    { start: tokens.position - 1, end: tokens.position },
  );
}

function getPossibleNounsFromDet(
  d: T.InflectableBaseParse<T.DeterminerSelection>,
) {
  // cases
  // TODO: this could be done by inferring from the inflection info
  // in purely from the demonstrative itself, to make the logic in one source of
  // truth, but that is a bit more obtuse and difficult to implement
  // so doing this for now
  // TODO: Test this!
  // daa
  //  - masc/fem sing plain
  //  - masc/fem plural plain
  // de
  //  - masc/fem sing inflected
  //  - masc/fem plural inflected
  // hagha
  //  - masc/fem sing plain
  //  - masc sing inflected
  // haghe
  //  - fem sing inflected
  // hagho
  //  - masc/fem plural inflected
  const bothNumbers = [false, true];
  const possibilites: {
    gender: T.Gender;
    plural: boolean;
    inflected: boolean;
  }[] =
    d.selection.determiner.p === "دا"
      ? d.gender.flatMap((gender) =>
          bothNumbers.map((plural) => ({
            gender,
            plural,
            inflected: d.inflection.includes(1),
          })),
        )
      : d.inflection.includes(2)
        ? [
            { gender: "masc", plural: true, inflected: true },
            { gender: "fem", plural: true, inflected: true },
          ]
        : d.gender.flatMap<{
            gender: T.Gender;
            plural: boolean;
            inflected: boolean;
          }>((gender) => [
            { gender, plural: false, inflected: false },
            { gender, plural: true, inflected: false },
            ...(d.inflection.includes(1)
              ? [{ gender, plural: false, inflected: true }]
              : []),
          ]);
  return possibilites;
}

function checkForDeterminerDuplicates(
  determiners: T.InflectableBaseParse<T.DeterminerSelection>[],
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
  plural: boolean,
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
