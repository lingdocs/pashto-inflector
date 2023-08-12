import nounsAdjs from "../../../nouns-adjs";
import verbs from "../../../verbs";
import * as T from "../../../types";
import { isAdjectiveEntry, isNounEntry } from "../type-predicates";
import { removeFVarientsFromVerb } from "../accent-and-ps-utils";

export function lookup(s: Partial<T.DictionaryEntry>): T.DictionaryEntry[] {
  const [key, value] = Object.entries(s)[0];
  // TODO: could make this more efficient - merging ppp and app queries?
  if (key === "ppp") {
    return nounsAdjs.filter(
      (e) =>
        e.ppp &&
        e.ppp
          .split(",")
          .map((w) => w.trim())
          .includes(value as string)
    );
  }
  if (key === "ppp") {
    return nounsAdjs.filter(
      (e) =>
        e.app &&
        e.app
          .split(",")
          .map((w) => w.trim())
          .includes(value as string)
    );
  }
  // @ts-ignore
  return nounsAdjs.filter((e) => e[key] === value) as T.DictionaryEntry[];
}

export function verbLookup(input: string): T.VerbEntry[] {
  const s = input.slice(0, -1);
  const sWoutOo = s.startsWith("و") ? s.slice(1) : undefined;
  if (s.endsWith("ېږ")) {
    return verbs.filter(
      sWoutOo
        ? ({ entry }) =>
            [s, sWoutOo].includes(entry.p.slice(0, -1)) ||
            [s.slice(0, -1) + "دل", sWoutOo.slice(0, -1) + "دل"].includes(
              entry.p
            ) ||
            [s, sWoutOo].includes(entry.p) ||
            (entry.psp && [s, sWoutOo].includes(entry.psp)) ||
            entry.prp === s ||
            entry.ssp === s
        : ({ entry }) =>
            entry.p.slice(0, -1) === s ||
            entry.p === s.slice(0, -1) + "دل" ||
            entry.p === s ||
            entry.psp === s ||
            entry.prp === s ||
            entry.ssp === s
    );
  }
  return verbs.filter(
    sWoutOo
      ? ({ entry }) =>
          [s, sWoutOo].includes(entry.p.slice(0, -1)) ||
          // for short intransitive forms
          [s, sWoutOo].includes(entry.p.slice(0, -3)) ||
          [s, sWoutOo].includes(entry.p) ||
          (entry.psp && [s, sWoutOo].includes(entry.psp)) ||
          entry.prp === s ||
          entry.ssp === s ||
          (entry.separationAtP &&
            (entry.p.slice(entry.separationAtP) === s ||
              entry.psp?.slice(entry.separationAtP) === s))
      : ({ entry }) =>
          entry.p.slice(0, -1) === s ||
          // for short intransitive forms
          entry.p.slice(0, -3) === s ||
          entry.p === s ||
          entry.psp === s ||
          entry.prp === s ||
          entry.ssp === s ||
          (entry.separationAtP &&
            (entry.p.slice(entry.separationAtP) === s ||
              entry.psp?.slice(entry.separationAtP) === s))
  );
}

export function wordQuery(word: string, type: "adj"): T.AdjectiveEntry;
export function wordQuery(word: string, type: "noun"): T.NounEntry;
export function wordQuery(word: string, type: "verb"): T.VerbEntryNoFVars;
export function wordQuery(
  word: string,
  type: "noun" | "adj" | "verb"
): T.NounEntry | T.AdjectiveEntry | T.VerbEntryNoFVars {
  if (type === "verb") {
    const verb = verbs.find(
      (x) => x.entry.p === word || x.entry.f === word || x.entry.g === word
    );
    if (!verb) {
      throw new Error(`missing ${word} in word query`);
    }
    return removeFVarientsFromVerb(verb);
  }
  const entry = nounsAdjs.find(
    (x) => x.p === word || x.f === word || x.g === word
  );
  if (!entry) {
    throw new Error(`missing ${word} in word query`);
  }
  if (type === "noun" && !isNounEntry(entry)) {
    throw new Error(`${word} is not a noun`);
  }
  if (type === "adj" && !isAdjectiveEntry(entry)) {
    throw new Error(`${word} is not an adjective`);
  }
  return entry as T.NounEntry | T.AdjectiveEntry;
}
