import * as T from "../../../../types";
import { entries as splitVerbEntries } from "./../split-verbs";
import * as tp from "../../type-predicates";
import memoize from "micro-memoize";

export type BaseInfo = Extract<T.ParsedVBB["info"], { type: "verb" }>;
export type StemInfo = Omit<BaseInfo, "base"> & {
  base: "stem";
};
export type RootInfo = Omit<BaseInfo, "base"> & {
  base: "root";
};

export function findStem(ph: T.ParsedPH | undefined) {
  return ph ? findPerfectiveStem(ph) : findImperfectiveStem;
}

const rootSplitLookup = memoize((s: string) =>
  splitVerbEntries.filter((e) =>
    [s, s + "ل"].some(
      (x) => (e.entry.prp || e.entry.p).slice(e.entry.separationAtP || 0) === x,
    ),
  ),
);

export function findRoot(ph: T.ParsedPH | undefined) {
  return ph ? findPerfectiveRoot(ph) : findImperfectiveRoot;
}

export function findImperfectiveRoot(
  s: string,
  dictionary: T.DictionaryAPI,
): RootInfo[] {
  if (["کېږ", "کېد", "ش", "شو", "شول"].includes(s)) {
    return [];
  }
  const regA = [s, s + "ل"].flatMap(dictionary.verbEntryLookup);
  const reg = regA.filter((e) => isMergedCompOrSimple(e.entry));
  return reg.map((verb) => ({
    type: "verb",
    aspect: "imperfective",
    base: "root",
    verb,
  }));
}

function findImperfectiveStem(
  s: string,
  dicitonary: T.DictionaryAPI,
): StemInfo[] {
  if (["کېږ", "کېد", "ش", "شو", "شول"].includes(s)) {
    return [];
  }
  const regulars = regStemSearch(s, dicitonary);
  const irregulars = dicitonary
    .otherLookup("psp", s)
    .filter(
      (e): e is T.VerbDictionaryEntry =>
        tp.isVerbDictionaryEntry(e) && isMergedCompOrSimple(e),
    )
    .map<T.VerbEntry>((entry) => ({
      entry,
    }));
  return [...regulars, ...irregulars].map((verb) => ({
    type: "verb",
    aspect: "imperfective",
    base: "stem",
    verb,
  }));
}

export function withAlephAdded(s: string): string[] {
  return [s, ...(startsWithAleph(s) ? [] : ["ا" + s, "آ" + s])];
}
function regStemSearch(s: string, dictionary: T.DictionaryAPI): T.VerbEntry[] {
  const regTransA = dictionary.verbEntryLookup(s + "ل");
  const regTrans = regTransA.filter(
    (e) =>
      isMergedCompOrSimple(e.entry) &&
      !e.entry.ssp &&
      !e.entry.psp &&
      !e.entry.c.includes("intrans"),
  );
  const regIntrans = dictionary
    .verbEntryLookup((s.endsWith("ېږ") ? s.slice(0, -2) : s) + "ېدل")
    .filter(
      (e) =>
        isMergedCompOrSimple(e.entry) &&
        !e.entry.ssp &&
        !e.entry.psp &&
        e.entry.c.includes("intrans"),
    );
  return [...regTrans, ...regIntrans];
}

function findPerfectiveStem(ph: T.ParsedPH) {
  // TODO: use ph to check if they are compatible HERE
  return function (s: string, dicitonary: T.DictionaryAPI): StemInfo[] {
    if (ph && ph.type === "CompPH") {
      return [];
    }
    if (["کېږ", "کېد", "ش", "شو", "شول"].includes(s)) {
      return [];
    }
    if (startsWithAleph(s)) {
      return [];
    }
    const baseQ = withAlephAdded(s);
    const regulars = baseQ
      .flatMap((q) => regStemSearch(q, dicitonary))
      .filter((e) => !e.entry.separationAtP);
    const irregularsBasedOnImperf = baseQ
      .flatMap((q) => dicitonary.otherLookup("psp", q))
      .filter(
        (e): e is T.VerbDictionaryEntry =>
          tp.isVerbDictionaryEntry(e) && !e.l && !e.ssp && !e.separationAtP,
      )
      .map<T.VerbEntry>((entry) => ({
        entry,
      }));
    // TODO: check that it matches the perfective head and filter or give error messages here
    return [...regulars, ...irregularsBasedOnImperf, ...stemSplitLookup(s)]
      .filter(phMatches("stem")(ph))
      .map((verb) => ({
        type: "verb",
        aspect: "perfective",
        base: "stem",
        verb,
      }));
  };
}

const stemSplitLookup = memoize((s: string) =>
  splitVerbEntries.filter(
    (e) =>
      (e.entry.ssp || e.entry.psp || e.entry.p).slice(
        e.entry.separationAtP || 0,
      ) === s,
  ),
);

export function findPerfectiveRoot(ph: T.ParsedPH) {
  return function (s: string, dicitonary: T.DictionaryAPI): RootInfo[] {
    if (ph && ph.type === "CompPH") {
      return [];
    }
    if (startsWithAleph(s) || ["کېږ", "کېد", "ش", "شو", "شول"].includes(s)) {
      return [];
    }
    const reg = [s, s + "ل"]
      .flatMap(withAlephAdded)
      .flatMap(dicitonary.verbEntryLookup)
      .filter(
        (e) =>
          // TODO: ALLOW FOR PRP LOOKUP!
          !e.entry.c.includes("comp.") &&
          !e.entry.prp &&
          !e.entry.separationAtP,
      );
    // TODO: check that it matches the perfective head and filter or give error messages here
    return [...reg, ...rootSplitLookup(s)]
      .filter(phMatches("root")(ph))
      .map((verb) => ({
        type: "verb",
        aspect: "perfective",
        base: "root",
        verb,
      }));
  };
}

function phMatches(base: "root" | "stem") {
  return function (ph: T.ParsedPH) {
    return function (verb: T.VerbEntry) {
      // TODO: handle را غل etc! ? or is
      if (ph.type !== "PH") {
        return false;
      }
      const verbPh = getPhFromVerb(verb, base);
      return verbPh === ph.s;
    };
  };
}

function getPhFromVerb(v: T.VerbEntry, base: "root" | "stem"): string {
  // TODO!! what to do about yo / bo ???
  if (v.entry.separationAtP) {
    const p =
      base === "root" ? v.entry.prp || v.entry.p : v.entry.ssp || v.entry.p;
    return p.slice(0, v.entry.separationAtP);
  }
  // TODO or آ
  if (v.entry.p.startsWith("ا")) {
    return "وا";
  }
  return "و";
}

function isMergedCompOrSimple(v: T.VerbDictionaryEntry): boolean {
  if (!v.c.includes("comp.")) {
    return true;
  }
  return v.c.startsWith("v. stat.") && !v.p.includes(" ");
}

export function startsWithAleph(base: string): boolean {
  return ["ا", "آ"].includes(base[0]);
}
