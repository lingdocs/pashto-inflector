/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { splitDoubleWord } from "./p-text-helpers";
import { makePsString, removeFVarients } from "./accent-and-ps-utils";
import { removeAccents } from "./accent-helpers";
import * as T from "../../types";
import { getInfsAndVocative } from "./inflections-and-vocative";
import { fmapSingleOrLengthOpts } from "./fp-ps";
import { joinInflectorOutputs } from "./inflection-joiner";
import { makePlural } from "./nouns-plural";

export function inflectWord(word: T.DictionaryEntry): T.InflectorOutput {
  // If it's a noun/adj, inflect accordingly
  // TODO: What about n. f. / adj. that end in ي ??
  const w = removeFVarients(word);
  if (word.c !== undefined && word.c.includes("doub.")) {
    const words = splitDoubleWord(w).map((x) => ({
      inflected: inflectWord(x),
      orig: x,
    }));
    return joinInflectorOutputs(words);
  }
  if (w.c !== undefined && w.c.includes("pl.")) {
    return handlePluralNounOrAdj(w);
  }

  const plurals = makePlural(w);
  const infAndVoc = getInfsAndVocative(w, plurals);
  if (infAndVoc === false && !plurals) {
    return false;
  }
  return {
    ...plurals,
    ...infAndVoc,
  };
}

function handlePluralNounOrAdj(w: T.DictionaryEntryNoFVars): T.InflectorOutput {
  if (w.c === undefined || !w.c.includes("n.")) return false;
  const plurals = makePlural(w);
  if (w.noInf === true) {
    return !plurals ? false : { ...plurals };
  }
  if (!plurals) return false;
  return { ...plurals };
}

// TODO: REMOVE THIS
export function inflectRegularYayUnisex(
  p: string,
  f: string,
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
  fr: string,
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
  ps: T.SingleOrLengthOpts<T.PsString>,
): T.SingleOrLengthOpts<T.UnisexInflections> {
  return fmapSingleOrLengthOpts((x) => inflectRegularYayUnisex(x.p, x.f), ps);
}
