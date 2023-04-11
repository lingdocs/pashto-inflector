/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as T from "../../types";
import { makePsString, removeFVarients } from "./accent-and-ps-utils";

/**
 * Returns a Pashto string (or string with Length options) ensuring that
 * the accent is on front
 * 
 * @param s 
 */
export function accentOnFront(s: T.PsString): T.PsString;
export function accentOnFront(s: T.LengthOptions<T.PsString>): T.LengthOptions<T.PsString>;
export function accentOnFront(s: T.SingleOrLengthOpts<T.PsString>): T.SingleOrLengthOpts<T.PsString>;
export function accentOnFront(s: T.SingleOrLengthOpts<T.PsString>): T.SingleOrLengthOpts<T.PsString> {
    if ("long" in s) {
        return {
            short: accentOnFront(s.short),
            long: accentOnFront(s.long),
        };
    }
    return {
        ...s,
        f: accentSyllable(removeAccents(s.f)),
    };
}

/**
 * Ensures an accent on a past participle ie. leedúley, préxey, azmóyuley
 * 
 * @param s - the Pashto string (with Pashto and Phonetics) to ensure the accent on
 */
export function accentPastParticiple(s: T.PsString): T.PsString {
    // check for accent placing in words like wáayuley and azmóyuley
    const accentFallsOnThirdLast = (syls: string[]) => {
        if (syls.length < 3) return false;
        const secondLast = syls[syls.length-2];
        const thirdLast = syls[syls.length-3];
        const lastLetterOfThirdLast = thirdLast.slice(-1);
        return (
            (secondLast === "ul") && (lastLetterOfThirdLast === "y")
        );
    }
    // remove all accents
    const accentsRemoved = removeAccents(s.f);
    // split up the syllables (preserving the spaces)
    const syllables = splitUpSyllables(accentsRemoved);
    // add an accent on the appropriate syllable
    const n = accentFallsOnThirdLast(syllables) ? 2 : 1;
    const accentedF = accentFSylsOnNFromEnd(syllables, n); 
    return makePsString(s.p, accentedF);
}

export function splitUpSyllables(f: string): string[] {
    return f.match(/ |([^a|á|e|é|i|í|o|ó|u|ú| ]*(aa|áa|a|á|ey|éy|ee|ée|e|é|oo|óo|o|ó|i|í|u|ú)[^a|á|e|é|i|í|o|ó|u|ú| ]*)/ig) || [] as string[];
}

export function countSyllables(f: T.PsString | string): number {
    if (typeof f !== "string") return countSyllables(f.f);
    return splitUpSyllables(removeFVarients(removeAccents(f))).length;
}

/**
 * Returns a phonetic string with the accent placed n syllables from the end
 * 
 * @param syls - an array of syllables in phonetic strings without accents (including spaces as extra items)
 * @param n - the number of syllables from the end to put the accent
 */
export function accentFSylsOnNFromEnd(syls: string[] | string, n: number): string {
    if (typeof syls === "string") {
        return accentFSylsOnNFromEnd(splitUpSyllables(syls), n);
    }
    return [
        ...syls.slice(0, syls.length-(n+1)), // before accent
        accentSyllable(syls[syls.length-(n+1)]), // syllable to be accented
        ...(n !== 0) ? syls.slice(syls.length-n) : [], // after syllable to be accented
    ].join("");
}

export function accentOnNFromEnd(ps: T.PsString, n: number): T.PsString {
    const fNoAccents = removeAccents(ps.f);
    const fSyls = splitUpSyllables(fNoAccents);
    // TODO: enable this and fix the tests it breaks!!!  
    // don't add accent if only one syllable
    // if (fSyls.length === 1) return makePsString(ps.p, fNoAccents);
    return makePsString(
        ps.p,
        accentFSylsOnNFromEnd(fSyls, n),
    );
}

const accentReplacer = [
    { vowel: "a", accented: "á" },
    { vowel: "e", accented: "é" },
    { vowel: "i", accented: "í" },
    { vowel: "o", accented: "ó" },
    { vowel: "u", accented: "ú" },
    { vowel: "U", accented: "Ú" },
];

export function accentSyllable(s: string): string {
    return s.replace(/a|e|i|o|u|U/, (match) => {
        const r = accentReplacer.find((x) => x.vowel === match);
        /* istanbul ignore next */
        return r?.accented || "";
    });
}

export function accentPsSyllable(ps: T.PsString): T.PsString {
    return {
        p: ps.p,
        f: accentSyllable(ps.f),
    };
}



export function removeAccentsWLength(s: T.SingleOrLengthOpts<T.PsString[]>): T.SingleOrLengthOpts<T.PsString[]> {
    if ("long" in s) {
        return {
            long: removeAccentsWLength(s.long) as T.PsString[],
            short: removeAccentsWLength(s.short) as T.PsString[],
            ...s.mini ? {
                mini: removeAccentsWLength(s.mini) as T.PsString[],
            } : {},
        };
    }
    return removeAccents(s);
}


export function removeAccents(s: T.PsString): T.PsString; 
export function removeAccents(s: string): string; 
export function removeAccents(s: T.PsString[]): T.PsString[];
export function removeAccents(s: T.PsString | string | T.PsString[]): T.PsString | string | T.PsString[] {
    if (Array.isArray(s)) {
        return s.map(t => removeAccents(t));
    }
    if (typeof s !== "string") {
        return {
            ...s,
            f: removeAccents(s.f),
        };
    }
    return s.replace(/á|é|í|ó|ú|Ú/, (match) => {
        const r = accentReplacer.find((x) => x.accented === match);
        /* istanbul ignore next */
        return r?.vowel || "";
    });
}

export function removeAccentsFromInflections(inf: T.UnisexInflections): T.UnisexInflections {
    function removeFromSide(inf: T.InflectionSet): T.InflectionSet {
        return inf.map(removeAccents) as T.ArrayFixed<T.ArrayOneOrMore<T.PsString>, 3>;
    }
    return {
        masc: removeFromSide(inf.masc),
        fem: removeFromSide(inf.fem),
    };
}

/**
 * Determines if a string has any accents on it
 * 
 * @param s a string of Pashto phonetics
 */
export function hasAccents(s: string | T.PsString): boolean {
    if (typeof s !== "string") return hasAccents(s.f);
    return accentReplacer.some((x) => s.includes(x.accented));
}
