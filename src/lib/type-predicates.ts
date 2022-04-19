import * as T from "../types";
import { pashtoConsonants } from "./pashto-consonants";
import { endsWith } from "../lib/p-text-helpers";
import { countSyllables } from "../lib/accent-helpers";


export function isNounEntry(e: T.Entry | T.DictionaryEntry): e is T.NounEntry {
    if ("entry" in e) return false;
    return !!(e.c && (e.c.includes("n. m.") || e.c.includes("n. f.")));
}

export function isAdjectiveEntry(e: T.Entry | T.DictionaryEntry): e is T.AdjectiveEntry {
    if ("entry" in e) return false;
    return !!e.c?.includes("adj.") && !isNounEntry(e);
}

export function isAdverbEntry(e: T.Entry): e is T.AdverbEntry {
    if ("entry" in e) return false;
    return !!e.c?.includes("adv.");
}

export function isLocativeAdverbEntry(e: T.Entry): e is T.LocativeAdverbEntry {
    return isAdverbEntry(e) && e.c.includes("loc. adv.");
}

export function isNounOrAdjEntry(e: T.Entry): e is (T.NounEntry | T.AdjectiveEntry) {
    return isNounEntry(e) || isAdjectiveEntry(e);
}

export function isVerbDictionaryEntry(e: T.DictionaryEntry | T.DictionaryEntryNoFVars): e is T.VerbDictionaryEntry {
    return !!e.c?.startsWith("v.");
}

export function isVerbEntry(
    e: T.Entry | T.DictionaryEntry | { entry: T.DictionaryEntry, comp?: T.DictionaryEntry }
): e is T.VerbEntry {
    return "entry" in e && isVerbDictionaryEntry(e.entry);
}

export function isMascNounEntry(e: T.NounEntry | T.AdjectiveEntry): e is T.MascNounEntry {
    return !!e.c && e.c.includes("n. m.");
}

export function isFemNounEntry(e: T.NounEntry | T.AdjectiveEntry): e is T.FemNounEntry {
    return !!e.c && e.c.includes("n. f.");
}

export function isUnisexNounEntry(e: T.NounEntry | T.AdjectiveEntry): e is T.UnisexNounEntry {
    return isNounEntry(e) && e.c.includes("unisex");
}

export function isAdjOrUnisexNounEntry(e: T.Entry): e is (T.AdjectiveEntry | T.UnisexNounEntry) {
    return isAdjectiveEntry(e) || (
        isNounEntry(e) && isUnisexNounEntry(e)
    );
}

/**
 * shows if a noun/adjective has the basic (consonant / ه) inflection pattern
 * 
 * @param e 
 * @returns 
 */
export function isPattern1Entry<T extends (T.NounEntry | T.AdjectiveEntry)>(e: T): e is T.Pattern1Entry<T> {
    if (e.noInf) return false;
    if (e.infap) return false;
    if (isFemNounEntry(e)) {
        return (
            endsWith([{ p: "ه", f: "a" }, { p: "ح", f: "a" }], e) ||
            (endsWith({ p: pashtoConsonants }, e) && !e.c.includes("anim."))
        );
    }
    return (
        endsWith([{ p: pashtoConsonants }], e) ||
        endsWith([{ p: "ه", f: "u" }, { p: "ه", f: "h" }], e) ||
        endsWith([{ p: "ای", f: "aay" }, { p: "وی", f: "ooy" }], e)
    );
}

/**
 * shows if a noun/adjective has the unstressed ی inflection pattern
 * 
 * @param e 
 * @returns T.T.T.T.
 */
export function isPattern2Entry<T extends (T.NounEntry | T.AdjectiveEntry)>(e: T): e is T.Pattern2Entry<T> {
    if (e.noInf) return false;
    if (e.infap) return false;
    if (isFemNounEntry(e)) {
        return !e.c.includes("pl.") && endsWith({ p: "ې", f: "e" }, e, true);
    }
    // TODO: check if it's a single syllable word, in which case it would be pattern 1
    return endsWith({ p: "ی", f: "ey" }, e, true) && (countSyllables(e.f) > 1);
}

/**
 * shows if a noun/adjective has the stressed ی inflection pattern
 * 
 * @param e 
 * @returns 
 */
export function isPattern3Entry<T extends (T.NounEntry | T.AdjectiveEntry)>(e: T): e is T.Pattern3Entry<T> {
    if (e.noInf) return false;
    if (e.infap) return false;
    if (isFemNounEntry(e)) {
        return endsWith({ p: "ۍ" }, e);
    }
    return (countSyllables(e.f) > 1)
        ? endsWith({ p: "ی", f: "éy" }, e, true)
        : endsWith({ p: "ی", f: "ey" }, e)
}

/**
 * shows if a noun/adjective has the "Pashtoon" inflection pattern
 * 
 * @param e 
 * @returns 
 */
export function isPattern4Entry<T extends (T.NounEntry | T.AdjectiveEntry)>(e: T): e is T.Pattern4Entry<T> {
    if (e.noInf) return false;
    return (
        !!(e.infap && e.infaf && e.infbp && e.infbf)
        &&
        (e.infap.slice(1).includes("ا") && e.infap.slice(-1) === "ه")
    );
}

/**
 * shows if a noun/adjective has the shorter squish inflection pattern
 * 
 * @param e 
 * @returns 
 */
export function isPattern5Entry<T extends (T.NounEntry | T.AdjectiveEntry)>(e: T): e is T.Pattern5Entry<T> {
    if (e.noInf) return false;
    return (
        !!(e.infap && e.infaf && e.infbp && e.infbf)
        &&
        (e.infaf.slice(-1) === "u")
        &&
        !e.infap.slice(1).includes("ا")
    );
}

export function isPattern6FemEntry(e: T.FemNounEntry): e is T.Pattern6FemEntry<T.FemNounEntry> {
    if (!isFemNounEntry(e)) return false;
    if (e.c.includes("anim.")) return false;
    return e.p.slice(-1) === "ي";
}

export function isPluralNounEntry<U extends T.NounEntry>(e: U): e is T.PluralNounEntry<U> {
    return e.c.includes("pl.");
}

export function isSingularEntry<U extends T.NounEntry>(e: U): e is T.SingularEntry<U> {
    return !isPluralNounEntry(e);
}

export function isArrayOneOrMore<U>(a: U[]): a is T.ArrayOneOrMore<U> {
    return a.length > 0;
}

export function isPerfectTense(tense: T.VerbTense | T.EquativeTense | T.ModalTense | T.PerfectTense): tense is T.PerfectTense {
    return tense.endsWith("Perfect");
}

export function isVerbTense(tense: T.VerbTense | T.EquativeTense | T.ModalTense | T.PerfectTense): tense is T.VerbTense {
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
    return verbTenses.some(x => x === tense);
}

export function isModalTense(tense: T.VerbTense | T.EquativeTense | T.ModalTense | T.PerfectTense): tense is T.ModalTense {
    return tense.endsWith("Modal");
}

export function isEquativeTense(t: T.VerbTense | T.EquativeTense | T.PerfectTense | T.ModalTense): t is T.EquativeTense {
    return (t === "present" || t === "future" || t === "habitual" || t === "past" || t === "wouldBe" || t === "subjunctive" || t === "pastSubjunctive");
}


