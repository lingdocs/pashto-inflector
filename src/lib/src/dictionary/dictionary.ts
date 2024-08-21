import { DictionaryDb } from "./dictionary-core";
import memoize from "micro-memoize";
import * as T from "../../../types";
import * as tp from "../type-predicates";
const dictionaryBaseUrl = `https://storage.lingdocs.com/dictionary`;
const dictionaryUrl = `${dictionaryBaseUrl}/dictionary`;
const dictionaryInfoUrl = `${dictionaryBaseUrl}/dictionary-info`;

const dictDb = new DictionaryDb({
  url: dictionaryUrl,
  infoUrl: dictionaryInfoUrl,
  collectionName: "inflector-dict5",
  infoLocalStorageKey: "inflector-dict5",
});

function queryP(p: string): T.DictionaryEntry[] {
  if (!dictDb.collection) {
    return [];
  }
  return dictDb.collection.find({ p });
}
const memoizedQueryP = queryP;

function adjLookup(p: string): T.AdjectiveEntry[] {
  const res = memoizedQueryP(p);
  return res.filter(tp.isAdjectiveEntry);
}

function nounLookup(p: string): T.NounEntry[] {
  const res = memoizedQueryP(p);
  return res.filter(tp.isNounEntry);
}

function otherLookup(
  key: keyof T.DictionaryEntry,
  p: string
): T.DictionaryEntry[] {
  if (!dictDb.collection) {
    return [];
  }
  return dictDb.collection.find({ [key]: p });
}

function specialPluralLookup(p: string): T.NounEntry[] {
  if (!dictDb.collection) {
    return [];
  }
  const regex = new RegExp(`(^|\\s|,)${p}($|,)`);
  return dictDb.collection
    .find({
      $or: [{ ppp: { $regex: regex } }, { app: { $regex: regex } }],
    })
    .filter(tp.isNounEntry);
}

export type DictionaryAPI = {
  initialize: () => ReturnType<typeof dictDb.initialize>;
  update: () => ReturnType<typeof dictDb.updateDictionary>;
  queryP: (p: string) => T.DictionaryEntry[];
  adjLookup: (p: string) => T.AdjectiveEntry[];
  nounLookup: (p: string) => T.NounEntry[];
  otherLookup: (key: keyof T.DictionaryEntry, p: string) => T.DictionaryEntry[];
  specialPluralLookup: (p: string) => T.NounEntry[];
};

export const dictionary: DictionaryAPI = {
  initialize: async () => await dictDb.initialize(),
  update: async () => await dictDb.updateDictionary(() => null),
  queryP: memoizedQueryP,
  adjLookup: memoize(adjLookup),
  nounLookup: memoize(nounLookup),
  otherLookup: memoize(otherLookup),
  specialPluralLookup: memoize(specialPluralLookup),
};
