import * as T from "../../../types";
import { makeNounSelection } from "../phrase-building/make-selections";
import { parseAdjective } from "./parse-adjective-new";
import { parseDeterminer } from "./parse-determiner";
import { parseNounWord } from "./parse-noun-word";
import { bindParseResult, parserCombMany, toParseError } from "./utils";

type NounResult = { inflected: boolean; selection: T.NounSelection };

export function parseNoun(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  possesor: T.PossesorSelection | undefined
): T.ParseResult<NounResult>[] {
  if (tokens.length === 0) {
    return [];
  }
  const detRes = parserCombMany(parseDeterminer)(tokens, dictionary);
  // TODO: add recognition of او between adjectives
  return bindParseResult(detRes, (t, determiners) => {
    const adjRes = parserCombMany(parseAdjective)(t, dictionary);
    return bindParseResult(adjRes, (tk, adjectives) => {
      const nounWord = parseNounWord(tk, dictionary);
      return bindParseResult(nounWord, (tkns, nr) => {
        const { error: adjErrors } = adjDetsMatch(
          adjectives,
          nr.gender,
          nr.inflected ? 1 : 0,
          nr.plural
        );
        const { error: detErrors } = adjDetsMatch(
          determiners,
          nr.gender,
          nr.inflected ? 1 : 0,
          nr.plural
        );
        const dupErrors = checkForDeterminerDuplicates(determiners);
        const s = makeNounSelection(nr.entry, undefined);
        const body: NounResult = {
          inflected: nr.inflected,
          selection: {
            ...s,
            gender: nr.gender,
            number: nr.plural ? "plural" : "singular",
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
            errors: [
              ...detErrors.map(toParseError),
              ...dupErrors.map(toParseError),
              ...adjErrors.map(toParseError),
            ],
          },
        ];
      });
    });
  });
}

function checkForDeterminerDuplicates(
  determiners: T.InflectableBaseParse<T.DeterminerSelection>[]
): string[] {
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
  return duplicates.map((x) => `duplicate ${x} determiner`);
}

function adjDetsMatch(
  adjectives: T.InflectableBaseParse<
    T.AdjectiveSelection | T.DeterminerSelection
  >[],
  gender: T.Gender,
  inf: 0 | 1 | 2,
  plural: boolean | undefined
): { ok: boolean; error: string[] } {
  const inflection = (plural && inf < 2 ? inf + 1 : inf) as 0 | 1 | 2;
  const unmatching = adjectives.filter(
    (adj) =>
      !adj.gender.includes(gender) ||
      !adj.inflection.some((i) => i === inflection)
  );
  if (unmatching.length) {
    return {
      ok: false,
      error: unmatching.map((x) => {
        const p =
          x.selection.type === "adjective"
            ? x.selection.entry.p
            : x.selection.determiner.p;
        const adjText = x.given === p ? x.given : `${x.given} (${p})`;
        const inflectionIssue = !x.inflection.some((x) => x === inflection)
          ? ` should be ${showInflection(inflection)}`
          : ``;
        return `${
          x.selection.type === "adjective" ? "Adjective" : "Determiner"
        } agreement error: ${adjText} should be ${inflectionIssue} ${gender}.`;
      }),
    };
  } else {
    return {
      ok: true,
      error: [],
    };
  }
}

function showInflection(inf: 0 | 1 | 2): string {
  return inf === 0
    ? "plain"
    : inf === 1
    ? "first inflection"
    : "second inflection";
}
