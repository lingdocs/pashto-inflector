/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as T from "../types";
import {
    splitFIntoPhonemes,
    Phoneme,
    phonemeTable,
    zwar,
    zwarakey,
    zer,
    pesh,
    sukun,
    hamzaAbove,
    tashdeed,
    wasla,
    daggerAlif,
    fathahan,
    lastNonWhitespace,
    addP,
    last,
    advanceP,
    reverseP,
    overwriteP,
    advanceForAin,
    advanceForAinOrHamza,
    advanceForHamzaMid,
    DiacriticsAccumulator,
} from "./diacritics-helpers";

import { firstPhonetics } from "./p-text-helpers";
import { pipe } from "rambda";

/**
 * Adds diacritics to a given PsString.
 * Errors if the phonetics and script don't line up.
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

enum PhonemeStatus {
    LeadingLongVowel,
    LeadingConsonantOrShortVowel,
    DoubleConsonantTashdeed,
    EndingWithHeyHim,
    DirectMatch,
    ShortVowel,
    PersianSilentWWithAa,
    ArabicWasla,
    Izafe,
    EndOfDuParticle,
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
    // TODO: CLEANER function jump to next char
    const state = acc.pIn.slice(0, 5) === " ... "
        ? advanceP(acc, 5)
        : acc.pIn[0] === " "
        ? advanceP(acc)
        : acc;
    // console.log("AFTER SPACE PREP", phoneme);
    // console.log("state", state);
    // WARNING: Do not use acc after this point!

    const {
        phonemeInfo,
        sukunOrDiacritic,
        phs,
    } = stateInfo({ state, i, phoneme, phonemes });

    return (phs === PhonemeStatus.LeadingLongVowel) ?
            pipe(
                advanceP,
                addP(phonemeInfo.diacritic),
                advanceP,
            )(state)
        : (phs === PhonemeStatus.LeadingConsonantOrShortVowel) ?
            pipe(
                advanceP,
                addP(sukunOrDiacritic),
                advanceForAin,
            )(state)
        : (phs === PhonemeStatus.DoubleConsonantTashdeed) ?
            pipe(
                addP(tashdeed)
            )(state)
        : (phs === PhonemeStatus.EndingWithHeyHim) ?
            pipe(
                advanceP,
                addP(phoneme === "u" ? hamzaAbove : sukun),
            )(state)
        : (phs === PhonemeStatus.DirectMatch) ?
            pipe(
                addP(sukunOrDiacritic),
                advanceP,
            )(state)
        : (phs === PhonemeStatus.PersianSilentWWithAa) ?
            pipe(
                addP("("),
                advanceP,
                addP(")"),
                advanceP,
            )(state)
        : (phs === PhonemeStatus.ArabicWasla) ?
            pipe(
                addP(zer),
                overwriteP(wasla),
            )(state)
        : (phs === PhonemeStatus.Izafe) ?
            pipe(
                reverseP,
                addP(zer),
            )(state)
        : (phs === PhonemeStatus.EndOfDuParticle) ?
            pipe(
                reverseP,
                addP(zwarakey),
            )(state)
        :
        // phs === PhonemeState.ShortVowel
            pipe(
                advanceForHamzaMid,
                addP(phonemeInfo.diacritic),
                advanceForAinOrHamza,
            )(state);
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

    function getPhonemeState(): PhonemeStatus {
        if (isBeginningOfWord && (phonemeInfo.longVowel && !phonemeInfo.endingOnly)) {
            if (phoneme !== "aa" && currentPLetter !== "ا" && !phonemeInfo.matches?.includes(nextPLetter)) {
                throw Error("phonetics error - needs alef prefix");
            }
            return PhonemeStatus.LeadingLongVowel;
        }
        if (isBeginningOfWord && (phonemeInfo.beginningMatches?.includes(currentPLetter) || phonemeInfo.matches?.includes(currentPLetter))) {
            return PhonemeStatus.LeadingConsonantOrShortVowel;
        }
        // console.log("------");
        // console.log("phoneme", phoneme);
        // console.log("state", state);
        // console.log("prevPLetter is space", prevPLetter === " ");
        // console.log("------");
        if (isBeginningOfWord && phoneme === "u" && prevPLetter === " " && lastNonWhitespace(state.pOut) === "د") {
            return PhonemeStatus.EndOfDuParticle
        }
        if (!isBeginningOfWord && phoneme === "aa" && currentPLetter === "و" && nextPLetter === "ا") {
            return PhonemeStatus.PersianSilentWWithAa;
        }
        if (!isBeginningOfWord && phoneme === "i" && currentPLetter === "ا" && nextPLetter === "ل") {
            return PhonemeStatus.ArabicWasla;
        }
        if (phoneme === "-i-" && isBeginningOfWord) {
            return PhonemeStatus.Izafe;
        } 
        if (needsTashdeed) {
            return PhonemeStatus.DoubleConsonantTashdeed;
        }
        if (isEndOfWord && ((phoneme === "u" && currentPLetter === "ه") || (phoneme === "h" && ["ه", "ح"].includes(currentPLetter)))) {
            return PhonemeStatus.EndingWithHeyHim;
        }
        if ((phonemeInfo.matches?.includes(currentPLetter) || (isEndOfWord && phonemeInfo.endingMatches?.includes(currentPLetter)) || (phoneme === "m" && currentPLetter === "ن" && nextPLetter === "ب"))) {
            return PhonemeStatus.DirectMatch;
        }
        if (phonemeInfo.diacritic && !phonemeInfo.longVowel) {
            return PhonemeStatus.ShortVowel;
        }
        // console.log("bad phoneme is ", phoneme);
        throw new Error("phonetics error - no status found for phoneme: " + phoneme);
    }

    const phs = getPhonemeState();

    return {
        phs, phonemeInfo, sukunOrDiacritic,
    };
};
