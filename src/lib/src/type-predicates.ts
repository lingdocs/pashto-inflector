import type * as T from "../../types";
import { InflectionPattern } from "../../types";
import { pashtoConsonants } from "./pashto-consonants";
import { endsInConsonant, endsWith, hasShwaEnding } from "./p-text-helpers";
import { countSyllables } from "./accent-helpers";
import { getTransitivity } from "./verb-info";

const verbTenses: T.VerbTense[] = [
  "presentVerb",
  "subjunctiveVerb",
  "perfectiveFuture",
  "imperfectiveFuture",
  "perfectivePast",
  "imperfectivePast",
  "habitualPerfectivePast",
  "habitualImperfectivePast",
];

export function isTlulVerb(e: T.VerbEntry | T.VerbDictionaryEntry): boolean {
  const entry = "entry" in e ? e.entry : e;
  return (
    entry.f === "tlul" ||
    entry.p === "راتلل" ||
    entry.p === "درتلل" ||
    entry.p === "ورتلل"
  );
}

export function isStatCompound(k: "kawul" | "kedul") {
  return (e: T.VerbEntry) => {
    // TODO: best way to check this?
    if (e.entry.c.startsWith("v. stat.")) {
      const transitivity = getTransitivity(e.entry);
      return (
        (k === "kawul" && transitivity === "transitive") ||
        (k === "kedul" && transitivity === "intransitive")
      );
    } else {
      return false;
    }
  };
}

export function isKawulVerb(e: T.VerbEntry | T.VerbDictionaryEntry): boolean {
  const entry = "entry" in e ? e.entry : e;
  return ["کول", "راکول", "درکول", "ورکول"].includes(entry.p);
}

export function isNounEntry(
  e: T.Entry | T.DictionaryEntry | T.DictionaryEntryNoFVars,
): e is T.NounEntry {
  if ("entry" in e) return false;
  return !!(
    e.c !== undefined &&
    (e.c.includes("n. m.") || e.c.includes("n. f."))
  );
}

export function isAdjectiveEntry(
  e: T.Entry | T.DictionaryEntry,
): e is T.AdjectiveEntry {
  if ("entry" in e) return false;
  return e.c !== undefined && e.c.includes("adj.");
}

export function isAdverbEntry(
  e: T.Entry | T.DictionaryEntry,
): e is T.AdverbEntry {
  if ("entry" in e) return false;
  return e.c !== undefined && e.c.includes("adv.");
}

export function isDeterminerEntry(
  e: T.Entry | T.DictionaryEntry,
): e is T.DeterminerEntry {
  if ("entry" in e) return false;
  return e.c !== undefined && e.c.includes("det.");
}

export function isLocativeAdverbEntry(
  e: T.Entry | T.DictionaryEntry,
): e is T.LocativeAdverbEntry {
  if ("entry" in e) return false;
  return e.c !== undefined && e.c.includes("loc. adv.");
}

export function isNounOrAdjEntry(
  e: T.Entry | T.DictionaryEntry,
): e is T.NounEntry | T.AdjectiveEntry {
  return isNounEntry(e) || isAdjectiveEntry(e);
}

export function isInflectableEntry(
  e: T.Entry | T.DictionaryEntry | T.DictionaryEntryNoFVars | T.Determiner,
): e is T.InflectableEntry {
  if ("entry" in e) {
    return false;
  }
  if (isDeterminer(e)) {
    return true;
  }
  return (
    isNounEntry(e) ||
    isAdjectiveEntry(e) ||
    isNumberEntry(e) ||
    isDeterminerEntry(e)
  );
}

export function isDeterminer(
  e: T.Entry | T.DictionaryEntry | T.Determiner,
): e is T.Determiner {
  return "type" in e && e.type === "det";
}

export function isNumberEntry(
  e: T.Entry | T.DictionaryEntry,
): e is T.NumberEntry {
  if ("entry" in e) {
    return false;
  }
  return e.c !== undefined ? e.c.includes("num.") : false;
}

export function isVerbDictionaryEntry(
  e: T.DictionaryEntry | T.DictionaryEntryNoFVars,
): e is T.VerbDictionaryEntry {
  return e.c !== undefined && e.c.startsWith("v.");
}

export function isVerbEntry(
  e:
    | T.Entry
    | T.DictionaryEntry
    | { entry: T.DictionaryEntry; comp?: T.DictionaryEntry },
): e is T.VerbEntry {
  return "entry" in e && isVerbDictionaryEntry(e.entry);
}

export function isMascNounEntry(
  e: T.InflectableEntry | T.DictionaryEntry | T.DictionaryEntryNoFVars,
): e is T.MascNounEntry {
  return e.c !== undefined && e.c.includes("n. m.");
}

export function isFemNounEntry(
  e: T.DictionaryEntry | T.Determiner,
): e is T.FemNounEntry {
  return "c" in e && e.c !== undefined && e.c.includes("n. f.");
}

export function isUnisexNounEntry(
  e: T.InflectableEntry | T.DictionaryEntry,
): e is T.UnisexNounEntry {
  return isNounEntry(e) && e.c.includes("unisex");
}

export function isAnimNounEntry(e: T.InflectableEntry): e is T.AnimNounEntry {
  return e.c.includes("anim.");
}

export function isUnisexAnimNounEntry(
  e: T.InflectableEntry | T.DictionaryEntry,
): e is T.UnisexAnimNounEntry {
  return isUnisexNounEntry(e) && isAnimNounEntry(e);
}

export function isAdjOrUnisexNounEntry(
  e: T.Entry | T.InflectableEntry,
): e is T.AdjectiveEntry | T.UnisexNounEntry {
  return isAdjectiveEntry(e) || (isNounEntry(e) && isUnisexNounEntry(e));
}

export function isPattern(
  p: InflectionPattern | "all",
): (entry: T.InflectableEntry) => boolean {
  if (p === InflectionPattern.None) {
    return isNonInflectingEntry;
  }
  if (p === InflectionPattern.Basic) {
    return isPattern1Entry;
  }
  if (p === InflectionPattern.UnstressedAy) {
    return isPattern2Entry;
  }
  if (p === InflectionPattern.StressedAy) {
    return isPattern3Entry;
  }
  if (p === InflectionPattern.Pashtun) {
    return isPattern4Entry;
  }
  if (p === InflectionPattern.Squish) {
    return isPattern5Entry;
  }
  if (p === InflectionPattern.FemInanEe) {
    return isPattern6FemEntry;
  }
  return () => true;
}

export function isNonInflectingEntry<T extends T.InflectableEntry>(
  e: T,
): e is T.NonInflecting<T> {
  if (e.noInf === true) return true;
  return (
    !isPattern1Entry(e) &&
    !isPattern2Entry(e) &&
    !isPattern3Entry(e) &&
    !isPattern4Entry(e) &&
    !isPattern5Entry(e) &&
    !isPattern6FemEntry(e) &&
    (!isNounEntry(e) || !isPluralNounEntry(e))
  );
}

/**
 * shows if a noun/adjective has the basic (consonant / ه) inflection pattern
 *
 * @param e
 * @returns
 */
export function isPattern1Entry<T extends T.InflectableEntry | T.Determiner>(
  e: T,
): e is T.Pattern1Entry<T> {
  if ("noInf" in e && e.noInf === true) return false;
  if (
    ("infap" in e && (e.infap ?? "") !== "") ||
    ("infbp" in e && (e.infbp ?? "") !== "")
  )
    return false;
  // family words like خور زوی etc with special plural don't follow pattern #1
  if ("c" in e && e.c.includes("fam.")) {
    return false;
  }
  if (isFemNounEntry(e)) {
    return (
      (endsWith(
        [
          { p: "ه", f: "a" },
          { p: "ح", f: "a" },
          { p: "ع", f: "a" },
          { p: "ع", f: "a'" },
        ],
        e,
      ) &&
        !e.p.endsWith("اع")) ||
      endsWith({ p: pashtoConsonants }, e)
    );
  }
  return endsInConsonant(e) || hasShwaEnding(e);
}

/**
 * shows if a noun/adjective has the unstressed ی inflection pattern
 *
 * @param e
 * @returns T.T.T.T.
 */
export function isPattern2Entry<T extends T.InflectableEntry>(
  e: T,
): e is T.Pattern2Entry<T> {
  if (e.noInf === true) return false;
  if ((e.infap ?? "") !== "") return false;
  if (isFemNounEntry(e)) {
    return !e.c.includes("pl.") && endsWith({ p: "ې", f: "e" }, e, true);
  }
  // TODO: check if it's a single syllable word, in which case it would be pattern 1
  return endsWith({ p: "ی", f: "ay" }, e, true) && countSyllables(e.f) > 1;
}

/**
 * shows if a noun/adjective has the stressed ی inflection pattern
 *
 * @param e
 * @returns
 */
export function isPattern3Entry<T extends T.InflectableEntry>(
  e: T,
): e is T.Pattern3Entry<T> {
  if (e.noInf === true) return false;
  if ((e.infap ?? "") !== "") return false;
  if (isFemNounEntry(e)) {
    return endsWith({ p: "ۍ" }, e);
  }
  return countSyllables(e.f) > 1
    ? endsWith({ p: "ی", f: "áy" }, e, true)
    : endsWith({ p: "ی", f: "ay" }, e);
}

/**
 * shows if a noun/adjective has the "Pashtoon" inflection pattern
 *
 * @param e
 * @returns
 */
export function isPattern4Entry<T extends T.InflectableEntry>(
  e: T,
): e is T.Pattern4Entry<T> {
  if (e.noInf === true) return false;
  return (
    e.infap !== undefined &&
    e.infap !== "" &&
    e.infaf !== undefined &&
    e.infaf !== "" &&
    e.infbp !== undefined &&
    e.infaf !== "" &&
    e.infbf !== undefined &&
    e.infbf !== "" &&
    e.infap.slice(1).includes("ا") &&
    e.infap.slice(-1) === "ه"
  );
}

/**
 * shows if a noun/adjective has the shorter squish inflection pattern
 *
 * @param e
 * @returns
 */
export function isPattern5Entry<T extends T.InflectableEntry>(
  e: T,
): e is T.Pattern5Entry<T> {
  if (e.noInf === true) return false;
  return (
    e.infap !== undefined &&
    e.infap !== "" &&
    e.infaf !== undefined &&
    e.infaf !== "" &&
    e.infbp !== undefined &&
    e.infaf !== "" &&
    e.infbf !== undefined &&
    e.infbf !== "" &&
    !e.infap.slice(1).includes("ا") &&
    e.infap.slice(-1) === "ه"
  );
}

export function isPattern6FemEntry(
  e: T.InflectableEntry | T.DictionaryEntry,
): e is T.Pattern6FemEntry<T.FemNounEntry> {
  if (!isFemNounEntry(e)) return false;
  if (e.c.includes("anim.")) return false;
  return e.p.slice(-1) === "ي";
}

export function isPluralNounEntry<U extends T.NounEntry>(
  e: U,
): e is T.PluralNounEntry<U> {
  return e.c.includes("pl.");
}

export function isSingularEntry<U extends T.NounEntry>(
  e: U,
): e is T.SingularEntry<U> {
  return !isPluralNounEntry(e);
}

export function isArrayOneOrMore<U>(a: U[]): a is T.ArrayOneOrMore<U> {
  return a.length > 0;
}

export function isPerfectTense(tense: T.Tense): tense is T.PerfectTense {
  return tense.endsWith("Perfect");
}

export function isVerbTense(tense: T.Tense): tense is T.VerbTense {
  return verbTenses.some((x) => x === tense);
}

export function isAbilityTense(tense: T.Tense): tense is T.AbilityTense {
  return tense.endsWith("Modal");
}

export function isEquativeTense(t: T.Tense): t is T.EquativeTense {
  return (
    t === "present" ||
    t === "future" ||
    t === "habitual" ||
    t === "past" ||
    t === "wouldBe" ||
    t === "subjunctive" ||
    t === "pastSubjunctive" ||
    t === "wouldHaveBeen"
  );
}

export function isImperativeTense(tense: T.Tense): tense is T.ImperativeTense {
  return tense === "imperfectiveImperative" || tense === "perfectiveImperative";
}
