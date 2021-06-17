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
    zwar,
    zwarakey,
    zer,
    pesh,
    sukun,
    hamzaAbove,
    tashdeed,
    wasla,
    addP,
    advanceP,
    reverseP,
    overwriteP,
    advanceForHamza,
    advanceForHamzaMid,
    DiacriticsAccumulator,
    stateInfo,
    PhonemeStatus,
} from "./diacritics-helpers";

import { firstPhonetics } from "./p-text-helpers";
import { pipe } from "rambda";

/**
 * Adds diacritics to a given PsString.
 * Errors if the phonetics and script don't line up.
 */
 export function addDiacritics({ p, f }: T.PsString, ignoreCommas?: true): T.PsString {
    const phonemes: Phoneme[] = splitFIntoPhonemes(!ignoreCommas ? firstPhonetics(f) : f);
    const { pIn, pOut } = phonemes.reduce(processPhoneme, { pOut: "", pIn: p.trim() });
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
): DiacriticsAccumulator {
    const state = acc.pIn.slice(0, 5) === " ... "
        ? advanceP(acc, 5)
        : acc.pIn[0] === " "
        ? advanceP(acc)
        : acc;

    const {
        phonemeInfo,
        diacritic,
        phs,
        prevPLetter,
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
                addP(diacritic),
            )(state)
        : (phs === PhonemeStatus.DoubleConsonantTashdeed) ?
            pipe(
                prevPLetter === " " ? reverseP : addP(""),
                addP(tashdeed)
            )(state)
        : (phs === PhonemeStatus.EndingWithHeyHim) ?
            pipe(
                advanceP,
                addP(phoneme === "u" ? hamzaAbove : sukun),
            )(state)
        : (phs === PhonemeStatus.DirectMatch) ?
            pipe(
                addP(diacritic),
                advanceP,
            )(state)
        : (phs === PhonemeStatus.DirectMatchAfterSukun) ?
            pipe(
                addP(sukun),
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
        : (phs === PhonemeStatus.ShortAEndingAfterHeem) ?
            pipe(
                prevPLetter === " " ? reverseP : addP(""),
                addP(zwar),
            )(state)
        : (phs === PhonemeStatus.EndingWithHeyHimFromSukun) ?
            pipe(
                addP(sukun),
                advanceP,
            )(state)
        : (phs === PhonemeStatus.AlefDaggarEnding) ?
            pipe(
                advanceP,
                advanceP,
            )(state)
        : (phs === PhonemeStatus.LongAinVowelMissingComma) ?
            pipe(
                addP(diacritic),
                advanceP,
                addP(diacritic)
            )(state)
        : (phs === PhonemeStatus.ShortAinVowelMissingComma) ?
            pipe(
                addP(diacritic),
                advanceP,
            )(state)
        : (phs === PhonemeStatus.ShortAinVowelMissingCommaAfterAlefStart) ?
            pipe(
                advanceP,
                advanceP,
            )(state)
        : (phs === PhonemeStatus.AinWithLongAAtBeginning) ?
            pipe(
               advanceP,
               advanceP, 
            )(state)
        : (phs === PhonemeStatus.AlefWithHamza) ?
            pipe(
                advanceP,
            )(state)
        : (phs === PhonemeStatus.ShortVowel) ?
            pipe(
                advanceForHamzaMid,
                addP(phonemeInfo.diacritic),
                // TODO THIS?
                advanceForHamza,
            )(state)
        : (phs === PhonemeStatus.ShortAForAlefBeforeFathatan) ?
            pipe(
                advanceP,
            )(state)
        : (phs === PhonemeStatus.NOnFathatan) ?
            pipe(
                advanceP,
            )(state)
        : (phs === PhonemeStatus.HamzaOnWow) ?
            pipe(
                advanceP,
                addP(hamzaAbove),
                addP(diacritic),
            )(state)
        : (phs === PhonemeStatus.ArabicDefiniteArticleUl) ?
            pipe(
                advanceP,
                addP(pesh),
                advanceP,
            )(state)
        : (phs === PhonemeStatus.OoPrefix) ?
            pipe(
                advanceP,
                addP(pesh),
            )(state)
        : (phs === PhonemeStatus.GlottalStopBeforeOo) ?
            pipe(
                advanceP,
                addP(hamzaAbove),
            )(state)
        : (phs === PhonemeStatus.OoAfterGlottalStopOo) ?
            pipe(
                advanceP,
            )(state)
        : (phs === PhonemeStatus.SilentAinAfterAlef) ?
            pipe(
                advanceP,
                advanceP,
            )(state)
        : state;
}
