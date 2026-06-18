import { DictionaryDb } from "./dictionary-core";
import memoize from "micro-memoize";
import * as T from "../../../types";
import * as tp from "../type-predicates";
import fillerWords from "./filler-words";
// @ts-expect-error - no types file
import { levenshtein } from "edit-distance";
import { revertSpelling } from "../convert-spelling";
import sanitizePashto from "../standardize-pashto";
import { isPashtoScript } from "../is-pashto";
import { simplifyPhonetics } from "../simplify-phonetics";
import { makeAWeeBitFuzzy } from "./wee-bit-fuzzy";
import { fuzzifyPashto } from "./fuzzify-pashto/fuzzify-pashto";
// const dictionaryBaseUrl = `https://storage.lingdocs.com/dictionary`;
// const dictionaryUrl = `${dictionaryBaseUrl}/dictionary`;
// const dictionaryInfoUrl = `${dictionaryBaseUrl}/dictionary-info`;

// TODO: how to get this exposed and importable with the collection name
// const dictDb = new DictionaryDb({
//   url: dictionaryUrl,
//   infoUrl: dictionaryInfoUrl,
//   collectionName: "inflector-dict12",
//   infoLocalStorageKey: "inflector-dict12",
// });

function chunkOutArray<T>(arr: T[], chunkSize: number): T[][] {
  const R: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    R.push(arr.slice(i, i + chunkSize));
  }
  return R;
}

function sortByRelevancy<T extends Record<"p" | "g", string>>(
  arr: Readonly<T[]>,
  searchI: string,
  index: "p" | "g",
): T[] {
  // TODO: experiment with larger page sizes and not exact query,
  // especially with phonetic searches like ghuT
  //
  // TODO: if result came from special query, mark it as special and
  // then don't mess with the relevancy
  // now instead of an extra pass for exact, we can just use this!
  const similars = {
    p: ["دډتټ", "زذضظځ", "صسث", "رړڼ", "ڼن", "یيېۍ", "قک", "ګږ", "ښخحه", "پف"],
    g: ["tdTD", "rRN", "nN", "ei", "xkg", "pf", "au"],
  };
  function insert() {
    return 1;
  }
  // check if it's removing dz etc
  function remove() {
    return 1;
  }
  function update(a: string, b: string) {
    return similars[index].find((x) => x.includes(a) && x.includes(b)) // eslint-disable-line
      ? 0.5
      : a !== b
        ? 1
        : 0;
  }
  function levenOverVars(g: string, s: string): number {
    if (!g.includes(",")) {
      return levenshtein(g, s, insert, remove, update).distance; // eslint-disable-line
    }
    return Math.min(
      ...g // eslint-disable-line
        .split(",")
        .map((x) => levenshtein(x, s, insert, remove, update).distance), // eslint-disable-line
    );
  }

  const toSort = [...arr];
  if (index === "g") {
    toSort.sort((a, b) => {
      const aDist = levenOverVars(a[index], searchI);
      const bDist = levenOverVars(b[index], searchI);
      return aDist - bDist;
    });
  } else {
    /* eslint-disable */
    toSort.sort((a, b) => {
      const aDist = levenshtein(
        a[index],
        searchI,
        insert,
        remove,
        update,
      ).distance;
      const bDist = levenshtein(
        b[index],
        searchI,
        insert,
        remove,
        update,
      ).distance;
      return aDist - bDist;
    });
    /* eslint-enable */
  }
  return toSort;
}

function makeLookupPortal<X extends T.DictionaryEntry>(
  dictionary: T.DictionaryAPI,
  tpFilter: (x: T.DictionaryEntry) => x is X,
): T.EntryLookupPortal<X> {
  return {
    search: (s: string) =>
      dictionary.fuzzyLookup({
        searchString: s,
        language: "Pashto",
        page: 1,
        tpFilter,
      }),
    getByTs: (ts: number) => {
      const res = dictionary.findOneByTs(ts);
      if (!res) return undefined;
      return tpFilter(res) ? res : undefined;
    },
    getByL: () => {
      // TODO: maybe take this off of the type for the non-verb lookup portal
      return [];
    },
  };
}

function makeVerbLookupPortal(
  dictionary: T.DictionaryAPI,
): T.EntryLookupPortal<T.VerbEntry> {
  return {
    search: (s: string) => {
      const vEntries = dictionary.fuzzyLookup({
        searchString: s,
        language: "Pashto",
        page: 1,
        tpFilter: tp.isVerbDictionaryEntry,
      });
      return vEntries.map(
        (entry): T.VerbEntry => ({
          entry,
          complement:
            entry.c?.includes("comp.") && entry.l !== undefined && entry.l
              ? dictionary.findOneByTs(entry.l)
              : undefined,
        }),
      );
    },
    getByTs: (ts: number): T.VerbEntry | undefined => {
      const entry = dictionary.findOneByTs(ts);
      if (!entry) return undefined;
      if (!tp.isVerbDictionaryEntry(entry)) {
        console.error("not valid verb entry");
        return undefined;
      }
      const complement = (() => {
        if (entry.c?.includes("comp") && entry.l !== undefined && entry.l) {
          const comp = dictionary.findOneByTs(entry.l);
          if (!comp) {
            console.error("complement not found for", entry);
          }
          return comp;
        } else {
          return undefined;
        }
      })();
      return { entry, complement };
    },
    getByL: (l: number): T.VerbEntry[] => {
      const vEntries = dictionary.findByL(l).filter(tp.isVerbDictionaryEntry);
      return vEntries.map(
        (entry): T.VerbEntry => ({
          entry,
          complement:
            entry.c?.includes("comp.") && entry.l !== undefined && entry.l
              ? dictionary.findOneByTs(entry.l)
              : undefined,
        }),
      );
    },
  };
}

export const getEntryFeeder: (dictionary: T.DictionaryAPI) => T.EntryFeeder = (
  dictionary,
) => ({
  nouns: makeLookupPortal(dictionary, tp.isNounEntry),
  verbs: makeVerbLookupPortal(dictionary),
  adjectives: makeLookupPortal(dictionary, tp.isAdjectiveEntry),
  locativeAdverbs: makeLookupPortal(dictionary, tp.isLocativeAdverbEntry),
  adverbs: makeLookupPortal(dictionary, tp.isAdverbEntry),
});

export function getDictionary(props: {
  url: string;
  infoUrl: string;
  collectionName: string;
  infoLocalStorageKey: string;
  pageSize: number;
}): T.DictionaryAPI {
  const dictionary = new DictionaryDb(props);
  function fuzzyLookup<S extends T.DictionaryEntry>({
    searchString,
    language,
    page,
    tpFilter,
  }: {
    searchString: string;
    language: "Pashto" | "English" | "Both";
    page: number;
    tpFilter?: (e: T.DictionaryEntry) => e is S;
  }): S[] {
    // TODO: Implement working with both
    if (Number(searchString)) {
      const entry = dictionary.findOneByTs(Number(searchString));
      // @ts-expect-error - aaa
      return entry ? [entry] : ([] as S[]);
    }
    return language === "Pashto"
      ? pashtoFuzzyLookup({ searchString, page, tpFilter })
      : englishLookup({ searchString, page, tpFilter });
  }

  function fuzzifyEnglish(input: string): string {
    const safeInput = input.trim().replace(/[#-.]|[[-^]|[?|{}]/g, "");
    // TODO: Could do: cover british/american things like offense / offence
    return safeInput
      .replace("to ", "")
      .replace(/our/g, "ou?r")
      .replace(/or/g, "ou?r")
      .replace(/i(s|z)e/g, "i(s|z)e");
  }

  function englishLookup<S extends T.DictionaryEntry>({
    searchString,
    page,
    tpFilter,
  }: {
    searchString: string;
    page: number;
    tpFilter?: (e: T.DictionaryEntry) => e is S;
  }): S[] {
    if (!dictionary.collection) {
      return [];
    }
    function sortByR(a: T.DictionaryEntry, b: T.DictionaryEntry) {
      return (b.r ?? 3) - (a.r ?? 3);
    }
    let resultsGiven: number[] = [];
    // get exact results
    const exactQuery = {
      e: {
        $regex: new RegExp(`^${fuzzifyEnglish(searchString)}$`, "i"),
      },
    };
    const exactResultsLimit =
      props.pageSize < 10 ? Math.floor(props.pageSize / 2) : 10;
    const exactResults = dictionary.collection
      .chain()
      .find(exactQuery)
      .limit(exactResultsLimit)
      .simplesort("i")
      .data() as S[];
    exactResults.sort(sortByR);
    resultsGiven = exactResults.map((mpd: any) => mpd.$loki); // eslint-disable-line
    // get results with full word match at beginning of string
    const startingQuery = {
      e: {
        $regex: new RegExp(`^${fuzzifyEnglish(searchString)}\\b`, "i"),
      },
      $loki: { $nin: resultsGiven },
    };
    const startingResultsLimit = props.pageSize * page - resultsGiven.length;
    const startingResults = dictionary.collection
      .chain()
      .find(startingQuery)
      .limit(startingResultsLimit)
      .simplesort("i")
      .data() as S[];
    startingResults.sort(sortByR);
    /* eslint-disable */
    resultsGiven = [
      ...resultsGiven,
      ...startingResults.map((mpd: any) => mpd.$loki),
    ];
    /* eslint-enable */
    // get results with full word match anywhere
    const fullWordQuery = {
      e: {
        $regex: new RegExp(`\\b${fuzzifyEnglish(searchString)}\\b`, "i"),
      },
      $loki: { $nin: resultsGiven },
    };
    const fullWordResultsLimit = props.pageSize * page - resultsGiven.length;
    const fullWordResults = dictionary.collection
      .chain()
      .find(fullWordQuery)
      .limit(fullWordResultsLimit)
      .simplesort("i")
      .data() as S[];
    fullWordResults.sort(sortByR);
    /* eslint-disable */
    resultsGiven = [
      ...resultsGiven,
      ...fullWordResults.map((mpd: any) => mpd.$loki),
    ];
    /* eslint-enable */
    // get results with partial match anywhere
    const partialMatchQuery = {
      e: {
        $regex: new RegExp(`${fuzzifyEnglish(searchString)}`, "i"),
      },
      $loki: { $nin: resultsGiven },
    };
    const partialMatchLimit = props.pageSize * page - resultsGiven.length;
    const partialMatchResults = dictionary.collection
      .chain()
      .where(tpFilter ? tpFilter : () => true)
      .find(partialMatchQuery)
      .limit(partialMatchLimit)
      .simplesort("i")
      .data() as S[];
    partialMatchResults.sort(sortByR);
    const results = [
      ...exactResults,
      ...startingResults,
      ...fullWordResults,
      ...partialMatchResults,
    ];
    if (tpFilter) {
      return results.filter(tpFilter);
    }
    return results;
  }

  function pashtoExactLookup(searchString: string): T.DictionaryEntry[] {
    if (!dictionary.collection) {
      return [];
    }
    const index = isPashtoScript(searchString) ? "p" : "g";
    const search =
      index === "g" ? simplifyPhonetics(searchString) : searchString;
    return dictionary.collection.find({
      [index]: search,
    }) as T.DictionaryEntry[];
  }
  function queryP(p: string): T.DictionaryEntry[] {
    if (!dictionary.collection) {
      return [];
    }
    return dictionary.collection.find({ p }); // eslint-disable-line
  }
  const memoizedQueryP = memoize(queryP);

  function queryTs(ts: number): T.DictionaryEntry {
    if (!dictionary.collection) {
      throw new Error("dictionary not initialized yet");
    }
    const res = dictionary.findOneByTs(ts);
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
    if (!dictionary.collection) {
      return [];
    }
    return dictionary.collection.find({ [key]: regex ? variationRegex(p) : p }); // eslint-disable-line
  }

  function specialPluralLookup(p: string): T.NounEntry[] {
    if (!dictionary.collection) {
      return [];
    }
    const regex = variationRegex(p);
    return dictionary.collection
      .find({
        $or: [{ ppp: regex }, { app: regex }],
      })
      .filter(tp.isNounEntry);
  }

  function verbEntryLookup(p: string): T.VerbEntry[] {
    if (!dictionary.collection) {
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
    if (!dictionary.collection) {
      return [];
    }
    return dictionary.collection.find({ l: ts }).flatMap(finishVerbEntryLookup);
  }

  /**
   * creates a RegEx mongo query to search for a variation in a certain field
   * ie. to search for کاته in کوت, کاته
   */
  function variationRegex(p: string): { $regex: RegExp } {
    return { $regex: new RegExp(`(^|\\s|,)${p}($|,)`) };
  }

  function relatedWordsLookup(word: T.DictionaryEntry): T.DictionaryEntry[] {
    if (!dictionary.collection) {
      return [];
    }
    const wordArray = word.e
      .trim()
      .replace(/\?/g, "")
      .replace(/( |,|\.|!|;|\(|\))/g, " ")
      .split(/ +/)
      .filter((w: string) => !fillerWords.includes(w));
    let results: T.DictionaryEntry[] = [];
    wordArray.forEach((w: string) => {
      if (!dictionary.collection) {
        return [];
      }
      let r: RegExp;
      try {
        r = new RegExp(`\\b${w}\\b`, "i");
        const relatedToWord = dictionary.collection
          .chain()
          .find({
            // don't include the original word
            ts: { $ne: word.ts },
            e: { $regex: r },
          })
          .limit(5)
          .data() as T.DictionaryEntry[];
        results = [...results, ...relatedToWord];
        // In case there's some weird regex fail
      } catch (error) {
        /* istanbul ignore next */
        console.error(error);
      }
    });
    // Remove duplicate items - https://stackoverflow.com/questions/40811451/remove-duplicates-from-a-array-of-objects
    results = results.filter(function (a) {
      // @ts-expect-error - mmm
      return !this[a.$loki] && (this[a.$loki] = true); // eslint-disable-line
    }, Object.create(null));
    return results;
  }

  function tsBack(period: "month" | "week"): number {
    if (period === "month") {
      // https://stackoverflow.com/a/24049314/8620945
      const d = new Date();
      const m = d.getMonth();
      d.setMonth(d.getMonth() - 1);

      // If still in same month, set date to last day of
      // previous month
      if (d.getMonth() === m) d.setDate(0);
      d.setHours(0, 0, 0);
      d.setMilliseconds(0);

      // Get the time value in milliseconds and convert to seconds
      return d.getTime();
    }
    const currentDate = new Date();
    const lastWeekDate = new Date(
      currentDate.getTime() - 7 * 24 * 60 * 60 * 1000,
    );
    return lastWeekDate.getTime();
  }

  function makeSearchStringSafe(searchString: string): string {
    return searchString.replace(/[#-.]|[[-^]|[?|{}]/g, "");
  }

  function alphabeticalLookup({
    searchString,
    page,
  }: {
    searchString: string;
    page: number;
  }): T.DictionaryEntry[] {
    if (!dictionary.collection) {
      return [];
    }
    const r = new RegExp(
      "^" + sanitizePashto(makeSearchStringSafe(searchString)),
    );
    const regexResults = dictionary.collection.find({
      $or: [{ p: { $regex: r } }, { g: { $regex: r } }],
    }) as T.DictionaryEntry[];
    const indexNumbers: number[] = regexResults.map((mpd: any) => mpd.i); // eslint-disable-line
    // Find the first matching word occuring first in the Pashto Index
    let firstIndexNumber = null;
    if (indexNumbers.length) {
      firstIndexNumber = Math.min(...indexNumbers);
    }
    // $gt query from that first occurance
    if (firstIndexNumber !== null) {
      return dictionary.collection
        .chain()
        .find({ i: { $gt: firstIndexNumber - 1 } })
        .simplesort("i")
        .limit(page * props.pageSize)
        .data() as T.DictionaryEntry[];
    }
    return [];
  }

  function getExpForInflections(input: string, index: "p" | "f"): RegExp {
    let base = input;
    if (index === "f") {
      if (["e", "é", "a", "á", "ó", "o"].includes(input.slice(-1))) {
        base = input.slice(0, -1);
      }
      return new RegExp(`\\b${base}`);
    }
    if (["ه", "ې", "و"].includes(input.slice(-1))) {
      base = input.slice(0, -1);
    }
    return new RegExp(`^${base}[و|ې|ه]?`);
  }

  function pashtoFuzzyLookup<S extends T.DictionaryEntry>({
    searchString,
    page,
    tpFilter,
  }: {
    searchString: string;
    page: number;
    tpFilter?: (e: T.DictionaryEntry) => e is S;
  }): S[] {
    if (!dictionary.collection) {
      return [];
    }
    let resultsGiven: number[] = [];
    // Check if it's in Pashto or Latin script
    const searchStringToUse = sanitizePashto(
      makeSearchStringSafe(searchString),
    );
    const index = isPashtoScript(searchStringToUse) ? "p" : "g";
    const search =
      index === "g" ? simplifyPhonetics(searchStringToUse) : searchStringToUse;
    const infIndex = index === "p" ? "p" : "f";
    // Get exact matches
    const exactExpression = new RegExp("^" + search);
    const weeBitFuzzy = new RegExp("^" + makeAWeeBitFuzzy(search, infIndex));
    // prepare exact expression for special matching
    // TODO: This is all a bit messy and could be done without regex
    const expressionForInflections = getExpForInflections(search, infIndex);
    const arabicPluralIndex = `ap${infIndex}`;
    const pashtoPluralIndex = `pp${infIndex}`;
    const presentStemIndex = `ps${infIndex}`;
    const firstInfIndex = `infa${infIndex}`;
    const secondInfIndex = `infb${infIndex}`;
    const pashtoExactResultFields = [
      {
        [index]: { $regex: exactExpression },
      },
      {
        [arabicPluralIndex]: { $regex: weeBitFuzzy },
      },
      {
        [pashtoPluralIndex]: { $regex: weeBitFuzzy },
      },
      {
        [presentStemIndex]: { $regex: weeBitFuzzy },
      },
      {
        [firstInfIndex]: { $regex: expressionForInflections },
      },
      {
        [secondInfIndex]: { $regex: expressionForInflections },
      },
    ];
    const exactQuery = { $or: [...pashtoExactResultFields] };
    // just special incase using really small limits
    // multiple times scrolling / chunking / sorting might get a bit messed up if using a limit of less than 10
    const exactResultsLimit =
      props.pageSize < 10 ? Math.floor(props.pageSize / 2) : 10;
    const exactResults = dictionary.collection
      .chain()
      .find(exactQuery)
      .limit(exactResultsLimit)
      .simplesort("i")
      .data() as S[];
    resultsGiven = exactResults.map((mpd: any) => mpd.$loki); // eslint-disable-line
    // Get slightly fuzzy matches
    const slightlyFuzzy = new RegExp(makeAWeeBitFuzzy(search, infIndex), "i");
    const slightlyFuzzyQuery = {
      [index]: { $regex: slightlyFuzzy },
      $loki: { $nin: resultsGiven },
    };
    const slightlyFuzzyResultsLimit =
      props.pageSize * page - resultsGiven.length;
    const slightlyFuzzyResults = dictionary.collection
      .chain()
      .find(slightlyFuzzyQuery)
      .limit(slightlyFuzzyResultsLimit)
      .data() as S[];
    resultsGiven.push(...slightlyFuzzyResults.map((mpd: any) => mpd.$loki)); // eslint-disable-line
    // Get fuzzy matches
    const pashtoRegExLogic = fuzzifyPashto(search, {
      script: index === "p" ? "Pashto" : "Latin",
      simplifiedLatin: index === "g",
      allowSpacesInWords: true,
      matchStart: "word",
    });
    const fuzzyPashtoExperssion = new RegExp(pashtoRegExLogic);
    const pashtoFuzzyQuery = [
      {
        [index]: { $regex: fuzzyPashtoExperssion },
      },
      {
        // TODO: Issue, this fuzzy doesn't line up well because it's not the simplified phonetics - still has 's etc
        [arabicPluralIndex]: { $regex: fuzzyPashtoExperssion },
      },
      {
        [presentStemIndex]: { $regex: fuzzyPashtoExperssion },
      },
    ];
    // fuzzy results should be allowed to take up the rest of the limit (not used up by exact results)
    const fuzzyResultsLimit = props.pageSize * page - resultsGiven.length;
    // don't get these fuzzy results if searching in only English
    const fuzzyQuery = {
      $or: pashtoFuzzyQuery,
      $loki: { $nin: resultsGiven },
    };
    const fuzzyResults = dictionary.collection
      .chain()
      .find(fuzzyQuery)
      .limit(fuzzyResultsLimit)
      .data() as S[];
    const results = tpFilter
      ? [...exactResults, ...slightlyFuzzyResults, ...fuzzyResults].filter(
          tpFilter,
        )
      : [...exactResults, ...slightlyFuzzyResults, ...fuzzyResults];
    // sort out each chunk (based on limit used multiple times by infinite scroll)
    // so that when infinite scrolling, it doesn't re-sort the previous chunks given
    // const closeResultsLength = exactResults.length + slightlyFuzzyResults.length;
    const chunksToSort = chunkOutArray(results, props.pageSize);
    return chunksToSort.flatMap((c) => sortByRelevancy(c, search, index));
  }
  function allEntries() {
    if (!dictionary.collection) {
      return [];
    }
    return dictionary.collection.find() as T.DictionaryEntry[];
  }

  return {
    initialize: async () => await dictionary.initialize(),
    update: async (notifyUpdateComing: () => void) =>
      await dictionary.updateDictionary(notifyUpdateComing),
    search: function (state: {
      searchValue: string;
      spelling: T.Spelling;
      language: "Pashto" | "English";
      searchType: "alphabetical" | "fuzzy";
      page: number;
    }): T.DictionaryEntry[] {
      const searchString = revertSpelling(state.searchValue, state.spelling);
      if (state.searchValue === "") {
        return [];
      }
      return state.searchType === "alphabetical" && state.language === "Pashto"
        ? alphabeticalLookup({
            searchString,
            page: state.page,
          })
        : fuzzyLookup({
            searchString,
            language: state.language,
            page: state.page,
          });
    },
    allEntries: () => allEntries(),
    exactPashtoSearch: (s: string) => pashtoExactLookup(s),
    queryP: memoizedQueryP,
    adjLookup: memoize(adjLookup),
    nounLookup: memoize(nounLookup),
    otherLookup: memoize(otherLookup),
    specialPluralLookup: memoize(specialPluralLookup),
    verbEntryLookup: memoize(verbEntryLookup),
    verbEntryLookupByL: memoize(verbEntryLookupByLFunction),
    fuzzyLookup: fuzzyLookup,
    findOneByTs: (ts: number) => dictionary.findOneByTs(ts),
    findByL: (l: number) => dictionary.findByL(l),
    findRelatedEntries: function (
      entry: T.DictionaryEntry,
    ): T.DictionaryEntry[] {
      return relatedWordsLookup(entry);
    },
    getNewWords: function (period: "week" | "month"): T.DictionaryEntry[] {
      if (!dictionary.collection) {
        return [];
      }
      return dictionary.collection
        .chain()
        .find({
          ts: { $gt: tsBack(period) },
        })
        .simplesort("ts")
        .data()
        .reverse() as T.DictionaryEntry[];
    },
  };
}
