/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { removeAccents } from "./accent-helpers";

export type DiacriticsAccumulator = { pIn: string, pOut: string };

type Consonant = "b" | "p" | "t" | "T" | "s" | "j" | "ch" | "kh" | "ts" | "dz" | "d" | "D" | "r" | "R" | "z" | "jz" | "G" | "sh" | "x" | "gh" | "f" | "q" | "k" | "g" | "l" | "m" | "n" | "N" | "h" | "w" | "y";
type Ain = "'"
type JoiningVowel = "-i-" | "-U-" | "-Ul-"; 
type LongVowel = "aa" | "ee" | "e" | "oo" | "o" | "ey" | "uy" | "eyy";
type ShortVowel = "a" | "i" | "u" | "U";
export type Phoneme = Consonant | Ain | LongVowel | ShortVowel | JoiningVowel;

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
    ainBlendDiacritic?: string,
}

export const zwar = "َ";
export const zwarakey = "ٙ";
export const zer = "ِ";
export const pesh = "ُ";
export const sukun = "ْ";
export const hamzaAbove = "ٔ";
export const tashdeed = "ّ";
export const wasla = "ٱ";
export const daggerAlif = "ٰ";
export const fathahan = "ً";

export const phonemeTable: Record<Phoneme, PhonemeInfo> = {
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
        ainBlendDiacritic: zwar,
    },
    "ee": {
        matches: ["ی"],
        longVowel: true,
        endingMatches: ["ي"],
        diacritic: zer,
        canStartWithAynBefore: true,
        ainBlendDiacritic: zer,
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
        ainBlendDiacritic: pesh,
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
    const singleLetterPhonemes: Phoneme[] = ["a", "i", "u", "o", "e", "U", "b", "p", "t", "T", "s", "j", "d", "D", "r", "R", "z", "G", "x", "f", "q", "k", "g", "l", "m", "n", "N", "h", "w", "y", "'"];
    
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
 * returns the last character of a string
 * 
 * @param s 
 */
export function last(s: string) {
    return s[s.length - 1];
}

export function advanceP(state: DiacriticsAccumulator, n: number = 1): DiacriticsAccumulator {
    return {
        pIn: state.pIn.slice(n),
        pOut: state.pOut + state.pIn.slice(0, n),
    };
}

/**
 * moves back to the last character that wasn't a " " or "."
 * 
 * @param state 
 * @returns 
 */
export function reverseP(state: DiacriticsAccumulator): DiacriticsAccumulator {
    const reversed = [...state.pOut].reverse();
    const howFar = reversed.findIndex((c) => ![" ", "."].includes(c));
    return {
        pIn: state.pOut.slice(-howFar) + state.pIn,
        pOut: state.pOut.slice(0, -howFar),
    };
}

export const addP = (toAdd: string | undefined) => (state: DiacriticsAccumulator): DiacriticsAccumulator => {
    return {
        ...state,
        pOut: toAdd ? (state.pOut + toAdd) : state.pOut,
    };
};

export const overwriteP = (toWrite: string) => (state: DiacriticsAccumulator): DiacriticsAccumulator => {
    return {
        pIn: state.pIn.slice(1),
        pOut: state.pOut + toWrite,
    };
};

/**
 * returns the last letter before any whitespace (" " / ".")
 * 
 * @param s 
 * @returns 
 */
export function lastNonWhitespace(s: string): string {
    const reversed = [...s].reverse();
    const lastIndex = reversed.findIndex((c) => ![" ", "."].includes(c));
    const penultimateChar = reversed[lastIndex];
    return penultimateChar;
}

export function getCurrentNext(state: DiacriticsAccumulator): { current: string, next: string} {
    return {
        current: state.pIn[0],
        next: state.pIn[1],
    };
}

// export function advanceForAin(state: DiacriticsAccumulator): DiacriticsAccumulator {
//     const { current } = getCurrentNext(state);
//     return (current === "ع") ? advanceP(state) : state;
// }

export function advanceForHamzaMid(state: DiacriticsAccumulator): DiacriticsAccumulator {
    const { current, next } = getCurrentNext(state);
    if (current === "ئ" && next && next !== "ئ") {
        return advanceP(state);
    }
    return state;
}

export function advanceForHamza(state: DiacriticsAccumulator): DiacriticsAccumulator {
    const { current, next } = getCurrentNext(state);
    if (current === "ه" && (!next || next === " ")) {
        return advanceP(state);
    }
    // if (current === "ع") {
    //     return advanceP(state);
    // }
    return state;
}

