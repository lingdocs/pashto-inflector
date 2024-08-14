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

export const dictionary = {
  initialize: async () => await dictDb.initialize(),
  queryP: memoizedQueryP,
  adjLookup: memoize(adjLookup),
  nounLookup: memoize(nounLookup),
};
