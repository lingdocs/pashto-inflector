import nounsAdjs from "../../../nouns-adjs";
import verbs from "../../../verbs";
import * as T from "../../../types";
import { isAdjectiveEntry, isNounEntry } from "../type-predicates";
import { removeFVarientsFromVerb } from "../accent-and-ps-utils";
import { splitVarients, undoAaXuPattern } from "../p-text-helpers";
import { arraysHaveCommon } from "../misc-helpers";

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

export function shouldCheckTpp(s: string): boolean {
  return (
    ["د", "ړ", "ت", "ځ", "و", "ډ", "ڼ", "ن", "ه"].includes(s.slice(-1)) ||
    ["ست", "ښت"].includes(s.slice(-2)) ||
    ["ښود"].includes(s.slice(-3))
  );
}

export function verbLookup(input: string): T.VerbEntry[] {
  // TODO:
  // only look up forms if there's an ending
  // or is third person thing
  const s = input.slice(0, -1);
  // IMPORTANT TODO FOR EFFECIANCY!
  // check endings TODO: ONLY LOOKUP THE VERB POSSIBILITIES IF IT HAS A LEGITIMATE ENDING
  // if theres no legit verb ending and no tpp possibilities, just return an empty array
  // const sWoutOo = s.startsWith("و") ? s.slice(1) : undefined;
  const checkTpp = shouldCheckTpp(input);
  const fromAawu = checkTpp && undoAaXuPattern(input);
  const inputWoutOo =
    checkTpp && input.startsWith("و") ? input.slice(1) : undefined;
  // TODO: don't do this blindly, but check if it could actually be added
  const sAddedAa = "ا" + s;
  // for لواته -> to search for tpp الواته
  const inputAddedAa = "ا" + input;
  // TODO: don't do the slice of and checking for useless things when you have a NON verb ending (like with the tpp)
  if (s.endsWith("ېږ")) {
    return verbs.filter(
      ({ entry }) =>
        [s, sAddedAa].includes(entry.p.slice(0, -1)) ||
        [s.slice(0, -1) + "دل", sAddedAa.slice(0, -1) + "دل"].includes(
          entry.p
        ) ||
        [s, sAddedAa].includes(entry.p) ||
        [s, sAddedAa].includes(entry.psp || "") ||
        [s, sAddedAa].includes(entry.prp || "") ||
        [s, sAddedAa].includes(entry.ssp || "")
    );
  }
  return verbs.filter(
    ({ entry }) =>
      [s, sAddedAa].includes(entry.p.slice(0, -1)) ||
      // for short intransitive forms
      [s, sAddedAa].includes(entry.p.slice(0, -3)) ||
      [s, sAddedAa].includes(entry.p) ||
      (checkTpp &&
        [input, fromAawu, sAddedAa].includes(entry.p.slice(0, -1))) ||
      (entry.tppp &&
        arraysHaveCommon(
          [input, inputWoutOo, sAddedAa, inputAddedAa],
          splitVarients(entry.tppp)
        )) ||
      [s, sAddedAa].includes(entry.psp || "") ||
      arraysHaveCommon([entry.prp, entry.prp?.slice(0, -1)], [s, sAddedAa]) ||
      [s, sAddedAa].includes(entry.ssp || "") ||
      (entry.separationAtP &&
        // TODO this is super ugly, do check of short and long function
        (entry.p.slice(entry.separationAtP) === s ||
          entry.p.slice(entry.separationAtP, -1) === s ||
          (checkTpp && entry.p.slice(entry.separationAtP, -1) === input) ||
          entry.psp?.slice(entry.separationAtP) === s ||
          (entry.prp &&
            [
              entry.prp.slice(entry.separationAtP),
              entry.prp.slice(entry.separationAtP).slice(0, -1),
            ].includes(s)) ||
          (entry.ssp && entry.ssp.slice(entry.separationAtP) === s)))
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
