/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  concatInflections,
  splitDoubleWord,
  ensureUnisexInflections,
  concatPlurals,
} from "./p-text-helpers";
import { makePsString, removeFVarients } from "./accent-and-ps-utils";
import { removeAccents } from "./accent-helpers";
import * as T from "../../types";
import { getInfsAndVocative } from "./inflections-and-vocative";
import { fmapSingleOrLengthOpts } from "./fp-ps";
import { makePlural } from "./nouns-plural";

export function inflectWord(word: T.DictionaryEntry): T.InflectorOutput {
  // If it's a noun/adj, inflect accordingly
  // TODO: What about n. f. / adj. that end in ي ??
  const w = removeFVarients(word);
  if (w.c?.includes("doub.")) {
    const words = splitDoubleWord(w);
    // TODO: Make this work for non-unisex double words
    //  Right now this an extremely bad and complex way to do this
    //   with ensureUnisexInflections
    const inflected = words.map((x) => {
      const res = inflectWord(x);
      return ensureUnisexInflections(res, x);
    });
    const vocatives = inflected
      .map((x) => "vocative" in x && x.vocative)
      .filter((x) => x) as T.PluralInflections[];
    return {
      inflections: concatInflections(
        inflected[0].inflections,
        inflected[1].inflections
      ) as T.UnisexInflections,
      // in case there's only one vocative check to make sure we have both
      ...(vocatives.length === 2
        ? { vocative: concatPlurals(vocatives[0], vocatives[1]) }
        : {}),
    };
  }
  if (w.c && w.c.includes("pl.")) {
    return handlePluralNounOrAdj(w);
  }

  const plurals = makePlural(w);
  const infAndVoc = getInfsAndVocative(w, plurals);
  if (!infAndVoc && !plurals) {
    return false;
  }
  return {
    ...plurals,
    ...infAndVoc,
  };
}

function handlePluralNounOrAdj(w: T.DictionaryEntryNoFVars): T.InflectorOutput {
  if (!w.c || !w.c.includes("n.")) return false;
  const plurals = makePlural(w);
  if (w.noInf) {
    return !plurals ? false : { ...plurals };
  }
  if (!plurals) return false;
  return { ...plurals };
}

// TODO: REMOVE THIS
export function inflectRegularYayUnisex(
  p: string,
  f: string
): T.UnisexInflections {
  const baseP = p.slice(0, -1);
  const baseF = f.slice(0, -2);
  return {
    masc: [
      [{ p, f }],
      [{ p: `${baseP}ي`, f: `${baseF}ee` }],
      [
        { p: `${baseP}یو`, f: `${baseF}iyo` },
        { p: `${baseP}و`, f: `${baseF}o` },
      ],
    ],
    fem: [
      [{ p: `${baseP}ې`, f: `${baseF}e` }],
      [{ p: `${baseP}ې`, f: `${baseF}e` }],
      [
        { p: `${baseP}یو`, f: `${baseF}iyo` },
        { p: `${baseP}و`, f: `${baseF}o` },
      ],
    ],
  };
}

// TODO: REMOVE THIS
export function inflectRegularShwaEndingUnisex(
  pr: string,
  fr: string
): T.UnisexInflections {
  const { p, f } = removeAccents(makePsString(pr, fr));
  const accented = fr.slice(-1) === "ú";
  const baseP = p.slice(0, -1);
  const baseF = f.slice(0, -1);
  return {
    masc: [
      [{ p: `${baseP}ه`, f: `${baseF}${accented ? "ú" : "u"}` }],
      [{ p: `${baseP}ه`, f: `${baseF}${accented ? "ú" : "u"}` }],
      [{ p: `${baseP}و`, f: `${baseF}${accented ? "ó" : "o"}` }],
    ],
    fem: [
      [{ p: `${baseP}ه`, f: `${baseF}${accented ? "á" : "a"}` }],
      [{ p: `${baseP}ې`, f: `${baseF}${accented ? "é" : "e"}` }],
      [{ p: `${baseP}و`, f: `${baseF}${accented ? "ó" : "o"}` }],
    ],
  };
}

export function inflectYay(
  ps: T.SingleOrLengthOpts<T.PsString>
): T.SingleOrLengthOpts<T.UnisexInflections> {
  return fmapSingleOrLengthOpts((x) => inflectRegularYayUnisex(x.p, x.f), ps);
}
