/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as T from "../../types";
import {
  splitFIntoPhonemes,
  Phoneme,
  zwar,
  zwarakay,
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

import { removeFVarients } from "./accent-and-ps-utils";
import { pipe } from "rambda";

/**
 * Adds diacritics to a given PsString.
 * Errors if the phonetics and script don't line up.
 *
 * IN PROGRESS - This will hopefully get done and replace the messy, unmaintainable phonetics-to-diacritics.ts currently in use
 */
export function addDiacritics(
  { p, f }: T.PsString,
  ignoreCommas?: true,
): T.PsString {
  const phonemes: Phoneme[] = splitFIntoPhonemes(
    !ignoreCommas ? removeFVarients(f) : f,
  );
  const { pIn, pOut } = phonemes.reduce(processPhoneme, {
    pOut: "",
    pIn: p.trim(),
  });
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
  const state =
    acc.pIn.slice(0, 5) === " ... "
      ? advanceP(acc, 5)
      : acc.pIn[0] === " "
        ? advanceP(acc)
        : acc;

  const { phonemeInfo, diacritic, phs, prevPLetter } = stateInfo({
    state,
    i,
    phoneme,
    phonemes,
  });

  // prettier-ignore
  return phs === PhonemeStatus.LeadingLongVowel
    ? pipe(state, advanceP, addP(phonemeInfo.diacritic), advanceP)
    : phs === PhonemeStatus.LeadingConsonantOrShortVowel
    ? pipe(state, advanceP, addP(diacritic))
    : phs === PhonemeStatus.DoubleConsonantTashdeed
    ? pipe(state, prevPLetter === " " ? reverseP : addP(""), addP(tashdeed))
    : phs === PhonemeStatus.EndingWithHayHim
    ? pipe(state, advanceP, addP(phoneme === "u" ? hamzaAbove : sukun))
    : phs === PhonemeStatus.DirectMatch
    ? pipe(state, addP(diacritic), advanceP)
    : phs === PhonemeStatus.DirectMatchAfterSukun
    ? pipe(state, addP(sukun), advanceP)
    : phs === PhonemeStatus.PersianSilentWWithAa
    ? pipe(state, addP("("), advanceP, addP(")"), advanceP)
    : phs === PhonemeStatus.ArabicWasla
    ? pipe(state, addP(zer), overwriteP(wasla))
    : phs === PhonemeStatus.Izafe
    ? pipe(state, reverseP, addP(zer))
    : phs === PhonemeStatus.EndOfDuParticle
    ? pipe(state, reverseP, addP(zwarakay))
    : phs === PhonemeStatus.ShortAEndingAfterHeem
    ? pipe(state, prevPLetter === " " ? reverseP : addP(""), addP(zwar))
    : phs === PhonemeStatus.EndingWithHayHimFromSukun
    ? pipe(state, addP(sukun), advanceP)
    : phs === PhonemeStatus.AlefDaggarEnding
    ? pipe(state, advanceP, advanceP)
    : phs === PhonemeStatus.LongAinVowelMissingComma
    ? pipe(state, addP(diacritic), advanceP, addP(diacritic))
    : phs === PhonemeStatus.ShortAinVowelMissingComma
    ? pipe(state, addP(diacritic), advanceP)
    : phs === PhonemeStatus.ShortAinVowelMissingCommaAfterAlefStart
    ? pipe(state, advanceP, advanceP)
    : phs === PhonemeStatus.AinWithLongAAtBeginning
    ? pipe(state, advanceP, advanceP)
    : phs === PhonemeStatus.AlefWithHamza
    ? pipe(state, advanceP)
    : phs === PhonemeStatus.ShortVowel
    ? pipe(
        state,
        advanceForHamzaMid,
        addP(phonemeInfo.diacritic),
        // TODO THIS?
        advanceForHamza
      )
    : phs === PhonemeStatus.ShortAForAlefBeforeFathatan
    ? pipe(state, advanceP)
    : phs === PhonemeStatus.NOnFathatan
    ? pipe(state, advanceP)
    : phs === PhonemeStatus.HamzaOnWow
    ? pipe(state, advanceP, addP(hamzaAbove), addP(diacritic))
    : phs === PhonemeStatus.ArabicDefiniteArticleUl
    ? pipe(state, advanceP, addP(pesh), advanceP)
    : phs === PhonemeStatus.OoPrefix
    ? pipe(state, advanceP, addP(pesh))
    : phs === PhonemeStatus.GlottalStopBeforeOo
    ? pipe(state, advanceP, addP(hamzaAbove))
    : phs === PhonemeStatus.OoAfterGlottalStopOo
    ? pipe(state, advanceP)
    : phs === PhonemeStatus.SilentAinAfterAlef
    ? pipe(state, advanceP, advanceP)
    : state;
}
