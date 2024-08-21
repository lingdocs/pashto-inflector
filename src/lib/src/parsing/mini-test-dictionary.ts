import * as T from "../../../types";
import type { DictionaryAPI } from "../dictionary/dictionary";
import { isAdjectiveEntry, isNounEntry } from "../type-predicates";
import { entries } from "../../../../vocab/mini-dict-entries";

const queryP = (p: string) => entries.filter((e) => e.p === p);
function adjLookup(p: string): T.AdjectiveEntry[] {
  return queryP(p).filter(isAdjectiveEntry) as T.AdjectiveEntry[];
}

function nounLookup(p: string): T.NounEntry[] {
  return queryP(p).filter(isNounEntry) as T.NounEntry[];
}

function otherLookup(
  key: keyof T.DictionaryEntry,
  p: string
): T.DictionaryEntry[] {
  return entries.filter((e) => e[key] === p);
}

function specialPluralLookup(p: string): T.NounEntry[] {
  const regex = new RegExp(`(^|\\s|,)${p}($|,)`);
  return entries.filter(
    (e) => (e.ppp?.match(regex) || e.app?.match(regex)) && isNounEntry(e)
  ) as T.NounEntry[];
}

export const testDictionary: DictionaryAPI = {
  // @ts-expect-error we won't mock the initialization
  initialize: async () => 0,
  // @ts-expect-error not perfect mocking because won't need that
  update: async () => ({ response: "updated" }),
  queryP,
  adjLookup,
  nounLookup,
  otherLookup,
  specialPluralLookup,
};
