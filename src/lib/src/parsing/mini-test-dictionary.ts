import * as T from "../../../types";
import {
  isAdjectiveEntry,
  isNounEntry,
  isVerbDictionaryEntry,
} from "../type-predicates";
import { entries } from "../../../../vocab/mini-dict-entries";

function variationRegex(p: string): { $regex: RegExp } {
  return { $regex: new RegExp(`(^|\\s|,)${p}($|,)`) };
}

const queryP = (p: string) => entries.filter((e) => e.p === p);
function adjLookup(p: string): T.AdjectiveEntry[] {
  return queryP(p).filter(isAdjectiveEntry);
}

function nounLookup(p: string): T.NounEntry[] {
  return queryP(p).filter(isNounEntry);
}

function otherLookup(
  key: keyof T.DictionaryEntry,
  p: string,
  regex?: boolean,
): T.DictionaryEntry[] {
  if (regex === true) {
    const { $regex: regex } = variationRegex(p);
    return entries.filter((e) => (e[key] as string)?.match(regex));
  }
  return entries.filter((e) => e[key] === p);
}

function specialPluralLookup(p: string): T.NounEntry[] {
  const { $regex: regex } = variationRegex(p);
  return entries.filter(
    (e) => !!(e.ppp?.match(regex) || e.app?.match(regex)) && isNounEntry(e),
  ) as T.NounEntry[];
}

function verbEntryLookup(p: string): T.VerbEntry[] {
  return entries
    .filter((e) => e.p === p)
    .filter(isVerbDictionaryEntry)
    .map<T.VerbEntry>((entry) =>
      entry.l !== undefined
        ? {
            entry,
            complement: entries.find((e) => e.ts === entry.l),
          }
        : { entry },
    );
}

function verbEntryLookupByL(l: number): T.VerbEntry[] {
  return entries
    .filter((e) => e.l === l)
    .filter(isVerbDictionaryEntry)
    .map<T.VerbEntry>((entry) =>
      entry.l !== undefined
        ? {
            entry,
            complement: entries.find((e) => e.ts === entry.l),
          }
        : { entry },
    );
}

export const testDictionary: T.DictionaryAPI = {
  // @ts-expect-error we won't mock the initialization
  initialize: async () => 0, // eslint-disable-line
  // @ts-expect-error not perfect mocking because won't need that
  update: async () => ({ response: "updated" }), // eslint-disable-line
  queryP,
  adjLookup,
  nounLookup,
  otherLookup,
  specialPluralLookup,
  verbEntryLookup,
  verbEntryLookupByL,
};
