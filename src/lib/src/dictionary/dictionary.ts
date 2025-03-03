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
  collectionName: "inflector-dict8",
  infoLocalStorageKey: "inflector-dict8",
});

function queryP(p: string): T.DictionaryEntry[] {
  if (!dictDb.collection) {
    return [];
  }
  return dictDb.collection.find({ p });
}
const memoizedQueryP = memoize(queryP);

function queryTs(ts: number): T.DictionaryEntry {
  if (!dictDb.collection) {
    throw new Error("dictionary not initialized yet");
  }
  const res = dictDb.findOneByTs(ts);
  if (!res) {
    throw new Error("complement link broken");
  }
  return res;
}
const memoizedQueryTs = memoize(queryTs);

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
  p: string,
  regex?: boolean
): T.DictionaryEntry[] {
  if (!dictDb.collection) {
    return [];
  }
  return dictDb.collection.find({ [key]: regex ? variationRegex(p) : p });
}

function specialPluralLookup(p: string): T.NounEntry[] {
  if (!dictDb.collection) {
    return [];
  }
  const regex = variationRegex(p);
  return dictDb.collection
    .find({
      $or: [{ ppp: regex }, { app: regex }],
    })
    .filter(tp.isNounEntry);
}

function verbEntryLookup(p: string): T.VerbEntry[] {
  if (!dictDb.collection) {
    return [];
  }
  return memoizedQueryP(p)
    .filter(tp.isVerbDictionaryEntry)
    .map((entry) =>
      entry.l
        ? {
            entry,
            complement: memoizedQueryTs(entry.l),
          }
        : { entry }
    );
}

/**
 * creates a RegEx mongo query to search for a variation in a certain field
 * ie. to search for کاته in کوت, کاته
 */
function variationRegex(p: string): { $regex: RegExp } {
  return { $regex: new RegExp(`(^|\\s|,)${p}($|,)`) };
}

export const dictionary: T.DictionaryAPI = {
  initialize: async () => await dictDb.initialize(),
  update: async () => await dictDb.updateDictionary(() => null),
  queryP: memoizedQueryP,
  adjLookup: memoize(adjLookup),
  nounLookup: memoize(nounLookup),
  otherLookup: memoize(otherLookup),
  specialPluralLookup: memoize(specialPluralLookup),
  verbEntryLookup: memoize(verbEntryLookup),
};
