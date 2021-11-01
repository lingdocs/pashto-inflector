/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { makePsString, removeFVarients } from "./p-text-helpers";
import * as T from "../types";

/**
 * Returns a Pashto string (or string with Length options) ensuring that
 * the accent is on front
 * 
 * @param s 
 */
export function accentOnFront(s: T.PsString): T.PsString;
export function accentOnFront(s: T.LengthOptions<T.PsString>): T.LengthOptions<T.PsString>;
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
    return f.match(/ |([^a|e|i|o|u| ]*(aa|a|ey|ee|e|oo|o|i|u)[^a|e|i|o|u| ]*)/ig) || [] as string[];
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
    const fSyls = splitUpSyllables(removeAccents(ps.f));
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

function accentSyllable(s: string): string {
    return s.replace(/a|e|i|o|u|U/, (match) => {
        const r = accentReplacer.find((x) => x.vowel === match);
        /* istanbul ignore next */
        return r?.accented || "";
    });
}

export function removeAccents(s: T.PsString): T.PsString; 
export function removeAccents(s: string): string; 
export function removeAccents(s: T.PsString | string): T.PsString | string {
    if (typeof s !== "string") {
        return makePsString(
            s.p,
            removeAccents(s.f),
        );
    }
    return s.replace(/á|é|í|ó|ú|Ú/, (match) => {
        const r = accentReplacer.find((x) => x.accented === match);
        /* istanbul ignore next */
        return r?.vowel || "";
    });
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
