import * as T from "../../../types";
import { DictionaryAPI } from "../dictionary/dictionary";
import { makeNounSelection } from "../phrase-building/make-selections";
import { parseAdjective } from "./parse-adjective-new";
import { parseNounWord } from "./parse-noun-word";
import { bindParseResult } from "./utils";

type NounResult = { inflected: boolean; selection: T.NounSelection };

// ISSUES - fem nouns like ښځه کتابچه not working
// زاړه مېلمانه adjective agreement problem

export function parseNoun(
  tokens: Readonly<T.Token[]>,
  dictionary: DictionaryAPI,
  possesor: T.PossesorSelection | undefined,
  adjectives: {
    inflection: (0 | 1 | 2)[];
    gender: T.Gender[];
    given: string;
    selection: T.AdjectiveSelection;
  }[]
): T.ParseResult<NounResult>[] {
  if (tokens.length === 0) {
    return [];
  }
  // TODO: add recognition of او between adjectives
  const withAdj = bindParseResult(
    parseAdjective(tokens, dictionary),
    (tkns, adj) => parseNoun(tkns, dictionary, possesor, [...adjectives, adj])
  );
  const nounWord = parseNounWord(tokens, dictionary);
  // fit together with nouns
  const nouns = bindParseResult(nounWord, (tkns, nr) => {
    const { error: adjErrors } = adjsMatch(
      adjectives,
      nr.gender,
      nr.inflected ? 1 : 0,
      nr.plural
    );
    const s = makeNounSelection(nr.entry, undefined);
    const body: NounResult = {
      inflected: nr.inflected,
      selection: {
        ...s,
        gender: nr.gender,
        number: nr.plural ? "plural" : "singular",
        adjectives: adjectives.map((a) => a.selection),
        possesor,
      },
    };
    return [
      {
        body,
        tokens: tkns,
        errors: adjErrors.map((x) => ({ message: x })),
      },
    ];
  });
  return [...nouns, ...withAdj];
}

function adjsMatch(
  adjectives: Parameters<typeof parseNoun>[3],
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
        const adjText =
          x.given === x.selection.entry.p
            ? x.given
            : `${x.given} (${x.selection.entry.p})`;
        const inflectionIssue = !x.inflection.some((x) => x === inflection)
          ? ` should be ${showInflection(inflection)}`
          : ``;
        return `Adjective agreement error: ${adjText} should be ${inflectionIssue} ${gender}.`;
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
