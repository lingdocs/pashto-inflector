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
import { pipe } from "rambda";

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
    useEndingDiacritic?: true,
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
        useEndingDiacritic: true,
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
        beginningMatches: ["ا", "ع"],
        // canComeAfterHeyEnding: true,
        // canBeFirstPartOfFathahanEnding: true,
    },
    "u": {
        diacritic: zwarakey,
        endingMatches: ["ه"],
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
    const willIgnore = ["?", " ", "`", ".", "…", ",", "'"];
    
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
    // console.log("PHONEME", phoneme);
    // console.log("space coming up", acc.pIn[0] === " ");
    // console.log("state", acc);
    // Prep state
    const state = acc.pIn[0] === " " ? advanceP(acc) : acc;
    // console.log("AFTER SPACE PREP", phoneme);
    // console.log("state", state);
    // WARNING: Do not use acc after this point!

    const {
        phonemeInfo,
        isBeginningOfWord,
        currentPLetter,
        needsTashdeed,
        sukunOrDiacritic,
        nextPLetter,
        isEndOfWord,
    } = stateInfo({ state, i, phoneme, phonemes });

    // if it's not an exception (TODO)
    // it must be one of the following 5 possibilities
    // 1. beginning a word with a long vowel
    if (isBeginningOfWord && (phonemeInfo.longVowel && !phonemeInfo.endingOnly)) {
        if (phoneme !== "aa" && currentPLetter !== "ا" && !phonemeInfo.matches?.includes(nextPLetter)) {
            throw Error("phonetics error - needs alef prefix");
        }
        return pipe(
            advanceP,
            addP(phonemeInfo.diacritic),
            advanceP,
        )(state);
    // 2. beginning a word with something else
    } else if (isBeginningOfWord && (phonemeInfo.beginningMatches?.includes(currentPLetter) || phonemeInfo.matches?.includes(currentPLetter))) {
        return pipe(
            advanceP,
            addP(sukunOrDiacritic),
            advanceForAin,
        )(state);
    // 3. double consonant to be marked with tashdeed
    } else if (needsTashdeed) {
        return pipe(
            addP(tashdeed)
        )(state);
    // 4. special ه ending
    } else if (isEndOfWord && ((phoneme === "u" && currentPLetter === "ه") || (phoneme === "h" && ["ه", "ح"].includes(currentPLetter)))) {
        return pipe(
            advanceP,
            addP(phoneme === "u" ? hamzaAbove : sukun),
        )(state);
    // 5. direct match of phoneme / P letter
    } else if (phonemeInfo.matches?.includes(currentPLetter) || (isEndOfWord && phonemeInfo.endingMatches?.includes(currentPLetter)) || (phoneme === "m" && currentPLetter === "ن" && nextPLetter === "ب")) {
        return pipe(
            addP(sukunOrDiacritic),
            advanceP,
        )(state);
    // 6. just a diacritic for short vowel
    } else if (phonemeInfo.diacritic && !phonemeInfo.longVowel) {
        return pipe(
            advanceForHamzaMid,
            addP(phonemeInfo.diacritic),
            advanceForAinOrHamza,
        )(state);
    }
    // anything that gets to this point is a failure/error
    throw new Error("phonetics error");
}



function stateInfo({ state, i, phonemes, phoneme }: {
    state: DiacriticsAccumulator,
    i: number,
    phonemes: Phoneme[],
    phoneme: Phoneme,
}) {
    const prevPLetter = last(state.pOut);
    const currentPLetter = state.pIn[0];
    const nextPLetter = state.pIn[1];
    const isBeginningOfWord = state.pOut === "" || prevPLetter === " ";
    const isEndOfWord = !nextPLetter || nextPLetter === " ";
    const phonemeInfo = phonemeTable[phoneme];
    const previousPhoneme = i > 0 && phonemes[i-1];
    const previousPhonemeInfo = (!isBeginningOfWord && i > 0) && phonemeTable[phonemes[i-1]];
    // const nextPhoneme = (phonemes.length > (i + 1)) && phonemes[i+1];
    // const nextPhonemeInfo = nextPhoneme ? phonemeTable[nextPhoneme] : undefined;
    const doubleConsonant = previousPhonemeInfo && (phonemeInfo.consonant && previousPhonemeInfo.consonant);
    const needsTashdeed = !isBeginningOfWord && doubleConsonant && (previousPhoneme === phoneme) && !phonemeInfo.matches?.includes(currentPLetter);
    const needsSukun = doubleConsonant && ((previousPhoneme !== phoneme) || phonemeInfo.matches?.includes(currentPLetter));
    const diacritic = isEndOfWord ? ((!phonemeInfo.longVowel || phonemeInfo.useEndingDiacritic) ? phonemeInfo.diacritic : undefined) : phonemeInfo.diacritic;
    const sukunOrDiacritic = (needsSukun ? sukun : diacritic);
    return {
        phonemeInfo, isBeginningOfWord, currentPLetter, needsTashdeed, sukunOrDiacritic, nextPLetter, isEndOfWord,
    };
};

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

const addP = (toAdd: string | undefined) => (state: DiacriticsAccumulator): DiacriticsAccumulator => {
    return {
        ...state,
        pOut: toAdd ? (state.pOut + toAdd) : state.pOut,
    };
}

function getCurrentNext(state: DiacriticsAccumulator): { current: string, next: string} {
    return {
        current: state.pIn[0],
        next: state.pIn[1],
    };
}

function advanceForAin(state: DiacriticsAccumulator): DiacriticsAccumulator {
    const { current } = getCurrentNext(state);
    return (current === "ع") ? advanceP(state) : state;
}

function advanceForHamzaMid(state: DiacriticsAccumulator): DiacriticsAccumulator {
    const { current, next } = getCurrentNext(state);
    if (current === "ئ" && next && next !== "ئ") {
        return advanceP(state);
    }
    return state;
}
function advanceForAinOrHamza(state: DiacriticsAccumulator): DiacriticsAccumulator {
    const { current, next } = getCurrentNext(state);
    if (current === "ه" && (!next || next === " ")) {
        return advanceP(state);
    }
    if (current === "ع") {
        return advanceP(state);
    }
    return state;
}
