import * as T from "../../../types";
import { getInflectionPattern } from "../inflection-pattern";
import { makeNounSelection } from "../phrase-building/make-selections";
import {
  isMascNounEntry,
  isNounEntry,
  isPluralNounEntry,
  isUnisexNounEntry,
} from "../type-predicates";
import { getInflectionQueries } from "./inflection-query";
import { LookupFunction } from "./lookup";
import { parseAdjective } from "./parse-adjective";
import { bindParseResult } from "./utils";

type NounResult = { inflected: boolean; selection: T.NounSelection };

export function parseNoun(
  tokens: Readonly<T.Token[]>,
  lookup: LookupFunction,
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
  const adjRes = parseAdjective(tokens, lookup);
  const withAdj = bindParseResult(adjRes, (tkns, adj) =>
    parseNoun(tkns, lookup, possesor, [...adjectives, adj])
  );
  const [first, ...rest] = tokens;
  const searches = getInflectionQueries(first.s, true);

  const w: ReturnType<typeof parseNoun> = [];
  searches.forEach(({ search, details }) => {
    const nounEntries = lookup(search, "nounAdj").filter(isNounEntry);
    details.forEach((deets) => {
      const fittingEntries = nounEntries.filter(deets.predicate);
      fittingEntries.forEach((entry) => {
        const genders: T.Gender[] = isUnisexNounEntry(entry)
          ? ["masc", "fem"]
          : isMascNounEntry(entry)
          ? ["masc"]
          : ["fem"];
        deets.gender.forEach((gender) => {
          if (genders.includes(gender)) {
            deets.inflection.forEach((inf) => {
              const { error: adjErrors } = adjsMatch(
                adjectives,
                gender,
                inf,
                deets.plural
              );
              convertInflection(inf, entry, gender, deets.plural).forEach(
                ({ inflected, number }) => {
                  const selection = makeNounSelection(entry, undefined);
                  const errors = [
                    ...adjErrors.map((message) => ({
                      message,
                    })),
                  ];
                  w.push({
                    tokens: rest,
                    body: {
                      inflected,
                      selection: {
                        ...selection,
                        gender: selection.genderCanChange
                          ? gender
                          : selection.gender,
                        number: selection.numberCanChange
                          ? number
                          : selection.number,
                        adjectives: adjectives.map((a) => a.selection),
                        // TODO: could be nicer to validate that the possesor is inflected before
                        // and just pass in the selection
                        possesor,
                      },
                    },
                    errors,
                  });
                }
              );
            });
          }
        });
      });
    });
  });
  return [...withAdj, ...w];
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

function convertInflection(
  inflection: 0 | 1 | 2,
  entry: T.NounEntry | T.AdjectiveEntry,
  gender: T.Gender,
  plural: boolean | undefined
): {
  inflected: boolean;
  number: T.NounNumber;
}[] {
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
      ...(!((isNounEntry(entry) && isPluralNounEntry(entry)) || plural) &&
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

function showInflection(inf: 0 | 1 | 2): string {
  return inf === 0
    ? "plain"
    : inf === 1
    ? "first inflection"
    : "second inflection";
}
