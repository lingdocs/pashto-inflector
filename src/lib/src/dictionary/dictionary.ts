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
  collectionName: "inflector-dict12",
  infoLocalStorageKey: "inflector-dict12",
});

function queryP(p: string): T.DictionaryEntry[] {
  if (!dictDb.collection) {
    return [];
  }
  return dictDb.collection.find({ p }); // eslint-disable-line
}
const memoizedQueryP = memoize(queryP);

function queryTs(ts: number): T.DictionaryEntry {
  if (!dictDb.collection) {
    throw new Error("dictionary not initialized yet");
  }
  const res = dictDb.findOneByTs(ts);
  if (!res) {
    console.error({ err: true, ts });
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
  regex?: boolean,
): T.DictionaryEntry[] {
  if (!dictDb.collection) {
    return [];
  }
  return dictDb.collection.find({ [key]: regex ? variationRegex(p) : p }); // eslint-disable-line
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
  return memoizedQueryP(p).flatMap(finishVerbEntryLookup);
}

function finishVerbEntryLookup(entry: T.DictionaryEntry): T.VerbEntry[] {
  if (!tp.isVerbDictionaryEntry(entry)) {
    return [];
  }
  // TODO: this is weird and convoluted, but for some reason
  // I needed this to catch errors that were going uncaught
  // when I wasn't able to find the complement? But then as soon
  // as I started catching and observing the errors, they ceased
  // to exist. Changing the behavior once observed like some kind
  // of insane quantum mechanics experiment
  if (entry.l !== undefined) {
    const { l, err } = (() => {
      try {
        return { l: memoizedQueryTs(entry.l), err: undefined };
      } catch (e) {
        console.error(e);
        return {
          l: undefined,
          err: `error looking for complement for ${JSON.stringify(entry)}`,
        };
      }
    })();
    if (err !== undefined && err !== "") {
      return [{ entry }];
    }
    return [{ entry, complement: l }];
  }
  return [{ entry }];
}

function verbEntryLookupByLFunction(ts: number): T.VerbEntry[] {
  if (!dictDb.collection) {
    return [];
  }
  return dictDb.collection.find({ l: ts }).flatMap(finishVerbEntryLookup);
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
  verbEntryLookupByL: memoize(verbEntryLookupByLFunction),
};
