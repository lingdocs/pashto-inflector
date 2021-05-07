/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as T from "../types";
import { removeAccents } from "./accent-helpers";
import { firstPhonetics } from "./p-text-helpers";

const zwar = "َ";
const zwarakey = "ٙ";
const zer = "ِ";
const pesh = "ُ";
const sukun = "ْ";
const hamzaAbove = "ٔ";
const tashdeed = "ّ";
const wasla = "ٱ";
const daggerAlif = "ٰ";
const fathahan = "ً";

type Consonant = "b" | "p" | "t" | "T" | "s" | "j" | "ch" | "kh" | "ts" | "dz" | "d" | "D" | "r" | "R" | "z" | "jz" | "G" | "sh" | "x" | "gh" | "f" | "q" | "k" | "g" | "l" | "m" | "n" | "N" | "h" | "w" | "y";
type Ain = "'"
type JoiningVowel = "-i-" | "-U-" | "-Ul-"; 
type LongVowel = "aa" | "ee" | "e" | "oo" | "o" | "ey" | "uy" | "eyy";
type ShortVowel = "a" | "i" | "u" | "U";
type Phoneme = Consonant | Ain | LongVowel | ShortVowel | JoiningVowel;

type DiacriticsAccumulator = { pIn: string, pOut: string };

type PhonemeInfo = {
    matches?: string[],
    beginningMatches?: string[],
    endingMatches?: string[],
    consonant?: true,
    diacritic?: string,
    endingOnly?: true,
    takesSukunOnEnding?: true,
    longVowel?: true,
    canStartWithAynBefore?: true,
}

const phonemeTable: Record<Phoneme, PhonemeInfo> = {
    // Consonants
    "b": {
        matches: ["ب"],
        consonant: true,
    },
    "p": {
        matches: ["پ"],
        consonant: true,
    },
    "t": {
        matches: ["ت", "ط"],
        consonant: true,
    },
    "T": {
        matches: ["ټ"],
        consonant: true,
    },
    "s": {
        matches: ["س", "ص", "ث"],
        consonant: true,
    },
    "j": {
        matches: ["ج"],
        consonant: true,
    },
    "ch": {
        matches: ["چ"],
        consonant: true,
    },
    "kh": {
        matches: ["خ"],
        consonant: true,
    },
    "ts": {
        matches: ["څ"],
        consonant: true,
    },
    "dz": {
        matches: ["ځ"],
        consonant: true,
    },
    "d": {
        matches: ["د"],
        consonant: true,
    },
    "D": {
        matches: ["ډ"],
        consonant: true,
    },
    "r": {
        matches: ["ر"],
        consonant: true,
    },
    "R": {
        matches: ["ړ"],
        consonant: true,
    },
    "z": {
        matches: ["ز", "ذ", "ظ", "ض"],
        consonant: true,
    },
    "jz": {
        matches: ["ژ"],
        consonant: true,
    },
    "G": {
        matches: ["ږ"],
        consonant: true,
    },
    "sh": {
        matches: ["ش"],
        consonant: true,
    },
    "x": {
        matches: ["ښ"],
        consonant: true,
    },
    "gh": {
        matches: ["غ"],
        consonant: true,
    },
    "f": {
        matches: ["ف"],
        consonant: true,
    },
    "q": {
        matches: ["ق"],
        consonant: true,
    },
    "k": {
        matches: ["ک"],
        consonant: true,
    },
    "g": {
        matches: ["ګ"],
        consonant: true,
    },
    "l": {
        matches: ["ل"],
        consonant: true,
    },
    "m": {
        matches: ["م"],
        consonant: true,
    },
    "n": {
        matches: ["ن"],
        consonant: true,
    },
    "N": {
        matches: ["ڼ"],
        consonant: true,
    },
    "h": {
        matches: ["ه", "ح"],
        consonant: true,
        takesSukunOnEnding: true,
    },
    "w": {
        matches: ["و"],
        consonant: true,
    },
    "y": {
        matches: ["ی"],
        consonant: true,
    },
    // Ain
    "'": {
        matches: ["ع", "ئ"],
        consonant: true,
    },
    // Joining Vowels
    "-i-": {
    },
    "-U-": {
        matches: [" و ", "و"],
    },
    "-Ul-": {
        matches: ["ال"],
    },
    // Long Vowels
    "aa": {
        matches: ["ا"],
        beginningMatches: ["آ", "ا"],
        endingMatches: ["ا", "یٰ"],
        longVowel: true,
    },
    "ee": {
        matches: ["ی"],
        longVowel: true,
        endingMatches: ["ي"],
        diacritic: zer,
        canStartWithAynBefore: true
    },
    "e": {
        matches: ["ې"],
        longVowel: true,
    },
    "o": {
        matches: ["و"],
        longVowel: true,
    },
    "oo": {
        matches: ["و"],
        longVowel: true,
        // alsoCanBePrefix: true,
        diacritic: pesh,
    },
    "ey": {
        matches: ["ی"],
        longVowel: true,
        endingMatches: ["ی"],
    },
    "uy": {
        matches: ["ۍ"],
        longVowel: true,
        endingOnly: true,
    },
    "eyy": {
        matches: ["ئ"],
        longVowel: true,
        endingOnly: true,
    },
    // Short Vowels
    "a": {
        diacritic: zwar,
        endingMatches: ["ه"],
        beginningMatches: ["ا"],
        // canComeAfterHeyEnding: true,
        // canBeFirstPartOfFathahanEnding: true,
    },
    "u": {
        diacritic: zwarakey,
        endingMatches: ["ه"],
        // hamzaOnEnd: true,
    },
    "i": {
        diacritic: zer,
        endingMatches: ["ه"],
        beginningMatches: ["ا", "ع"],
        // takesDiacriticBeforeGurdaHeyEnding: true,
        // canBeWasla: true,
    },
    "U": {
        diacritic: pesh,
        endingMatches: ["ه"],
        // takesDiacriticBeforeGurdaHeyEnding: true,
        beginningMatches: ["ا", "ع"],
    },
}

/**
 * splits a phonetics string into an array of Phonemes
 * 
 * will error if there is an illeagal phonetics character
 * 
 * @param fIn a phonetics string
 * @returns an array of phonemes
 */
export function splitFIntoPhonemes(fIn: string): Phoneme[] {
    const singleLetterPhonemes: Phoneme[] = ["a", "i", "u", "o", "e", "U", "b", "p", "t", "T", "s", "j", "d", "D", "r", "R", "z", "G", "x", "f", "q", "k", "g", "l", "m", "n", "N", "h", "w", "y"];
    
    const quadrigraphs: Phoneme[] = ["-Ul-"];
    const trigraphs: Phoneme[] = ["eyy", "-i-", "-U-"];
    const digraphs: Phoneme[] = ["aa", "ee", "ey", "oo", "kh", "gh", "ts", "dz", "jz", "ch", "sh"];
    const endingDigraphs: Phoneme[] = ["uy"];
    const willIgnore = ["?", " ", "`", ".", "…", ","];
    
    const result: Phoneme[] = [];
    const f = removeAccents(fIn);
    let index = 0;
    while (index < f.length) {
        const isLastTwoLetters = (index === f.length - 2 || f[index + 2] === " ");
        const threeLetterChunk = f.slice(index, index + 3) as Phoneme;
        const fourLetterChunk = f.slice(index, index + 4) as Phoneme;
        if (quadrigraphs.includes(fourLetterChunk)) {
            result.push(fourLetterChunk);
            index += 4;
            continue;
        }
        if (trigraphs.includes(threeLetterChunk)) {
            result.push(threeLetterChunk);
            index += 3;
            continue;
        }
        const twoLetterChunk = f.slice(index, index + 2) as Phoneme;
        if (
            digraphs.includes(twoLetterChunk) ||
            (isLastTwoLetters && endingDigraphs.includes(twoLetterChunk))
        ) {
            result.push(twoLetterChunk);
            index += 2;
            continue;
        }
        const singleLetter = f.slice(index, index + 1) as Phoneme;
        if (!willIgnore.includes(singleLetter)) {
            if (!singleLetterPhonemes.includes(singleLetter)) {
                throw new Error(`illegal phonetic character: ${singleLetter}`);
            }
            result.push(singleLetter);
        }
        index++;
    }
    return result;
}

/**
 * Adds diacritics to a given PsString.
 * Errors if the phonetics and script don't line up.
 * 
 * @param ps a PsSTring without phonetics
 */
export function addDiacritics({ p, f }: T.PsString, ignoreCommas?: true): T.PsString {
    const phonemes: Phoneme[] = splitFIntoPhonemes(!ignoreCommas ? firstPhonetics(f) : f);
    const { pIn, pOut } = phonemes.reduce(processPhoneme, { pOut: "", pIn: p });
    if (pIn !== "") {
        throw new Error("phonetics error - phonetics shorter than pashto script");
    }
    return {
        p: pOut,
        f,
    };
}

function processPhoneme(
    acc: DiacriticsAccumulator,
    phoneme: Phoneme,
    i: number,
    phonemes: Phoneme[],
) {
    // Prep state
    const state = acc.pIn[0] === " " ? advanceP(acc) : acc;
    // WARNING: Do not use acc after this point!

    const prevPLetter = last(state.pOut);
    const currentPLetter = state.pIn[0];
    const nextPLetter = state.pIn[1];
    const isBeginningOfWord = state.pOut === "" || prevPLetter === " ";
    const phonemeInfo = phonemeTable[phoneme];
    const previousPhoneme = i > 0 && phonemes[i-1];
    const previousPhonemeInfo = (!isBeginningOfWord && i > 0) && phonemeTable[phonemes[i-1]];
    const doubleConsonant = previousPhonemeInfo && (phonemeInfo.consonant && previousPhonemeInfo.consonant);
    const needsTashdeed = doubleConsonant && (previousPhoneme === phoneme);
    const needsSukun = doubleConsonant && (previousPhoneme !== phoneme);

    if (needsTashdeed) {
        return addP(state, tashdeed);
    }

    if (isBeginningOfWord && (phonemeInfo.longVowel && !phonemeInfo.endingOnly)) {
        if (phoneme !== "aa" && currentPLetter !== "ا" && !phonemeInfo.matches?.includes(nextPLetter)) {
            throw Error("phonetics error - needs alef prefix");
        }
        const ns = advanceP(state);
        const ns2 = phonemeInfo.diacritic ? addP(ns, phonemeInfo.diacritic) : ns;
        return advanceP(ns2);
    } else if (isBeginningOfWord && (phonemeInfo.beginningMatches?.includes(currentPLetter) || phonemeInfo.matches?.includes(currentPLetter))) {
        const ns = advanceP(state);
        return addP(ns, (needsSukun ? sukun : phonemeInfo.diacritic ? phonemeInfo.diacritic : ""));
    } else if (phonemeInfo.matches?.includes(currentPLetter)) {
        const ns = addP(state, (needsSukun ? sukun : phonemeInfo.diacritic ? phonemeInfo.diacritic : ""));
        return advanceP(ns);
    }

    if (phonemeInfo.diacritic) {
        return addP(state, phonemeInfo.diacritic);
    }

    // console.log(state);
    throw new Error("phonetics error");
}

/**
 * returns the last character of a string
 * 
 * @param s 
 */
function last(s: string) {
    return s[s.length - 1];
}

function advanceP(state: DiacriticsAccumulator, n: number = 1): DiacriticsAccumulator {
    return {
        pOut: state.pOut + state.pIn.slice(0, n),
        pIn: state.pIn.slice(n),
    }
}

function addP(state: DiacriticsAccumulator, toAdd: string): DiacriticsAccumulator {
    return {
        ...state,
        pOut: state.pOut + toAdd,
    };
}