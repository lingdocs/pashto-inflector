/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { pashtoConsonants } from "./pashto-consonants";
import {
  concatInflections,
  splitDoubleWord,
  ensureUnisexInflections,
  makePsString,
  removeFVarients,
  concatPsString,
  endsInConsonant,
  endsInAaOrOo,
} from "./p-text-helpers";
import {
  removeAccents,
} from "./accent-helpers";
import * as T from "../types";

const endingInSingleARegex = /[^a]'?’?[aá]'?’?$/;
const endingInHeyOrAynRegex = /[^ا][هع]$/;
// const endingInAlefRegex = /اع?$/;

export function inflectWord(word: T.DictionaryEntry): T.InflectorOutput {
  // If it's a noun/adj, inflect accordingly
  // TODO: What about n. f. / adj. that end in ي ??
  const w = removeFVarients(word);
  if (w.noInf) {
    return false;
  }
  if (w.c?.includes("doub.")) {
    const words = splitDoubleWord(w);
    const inflected = words.map((x) => ensureUnisexInflections(inflectWord(x), x));
    return {
      inflections: concatInflections(
        inflected[0].inflections,
        inflected[1].inflections,
      ) as T.UnisexInflections,
    };
  }
  if (w.c && (w.c.includes("adj.") || w.c.includes("unisex"))) {
    return handleUnisexWord(w);
  }
  if (w.c && (w.c.includes("n. m."))) {
    return handleMascNoun(w);
  }
  if (w.c && (w.c.includes("n. f."))) {
    return handleFemNoun(w);
  }
  // It's not a noun/adj
  return false;
}

// LEVEL 2 FUNCTIONS
function handleUnisexWord(word: T.DictionaryEntryNoFVars): T.InflectorOutput {
  // Get last letter of Pashto and last two letters of phonetics
  // TODO: !!! Handle weird endings / symbols ' etc.
  const pEnd = word.p.slice(-1);
  const plural = makePlural(word);
  if (word.infap && word.infaf && word.infbp && word.infbf) {
    return {
      inflections: inflectIrregularUnisex(word.p, word.f, [
        {p: word.infap, f: word.infaf},
        {p: word.infbp, f: word.infbf},
      ]),
      plural,
    };
  }
  if (pEnd === "ی" && word.f.slice(-2) === "ey") {
    return { inflections: inflectRegularYeyUnisex(word.p, word.f), plural };
  }
  if (pEnd === "ه" && word.g.slice(-1) === "u") {
    return { inflections: inflectRegularShwaEndingUnisex(word.p, word.f), plural };
  }
  if (pEnd === "ی" && word.f.slice(-2) === "éy") {
    return { inflections: inflectEmphasizedYeyUnisex(word.p, word.f), plural };
  }
  if (
    pashtoConsonants.includes(pEnd) ||
    word.p.slice(-2) === "وی" ||
    word.p.slice(-2) === "ای" ||
    (word.p.slice(-1) === "ه" && word.f.slice(-1) === "h")
  ) {
    return { inflections: inflectConsonantEndingUnisex(word.p, word.f), plural };
  }
  return false;
}

function handleMascNoun(w: T.DictionaryEntryNoFVars): T.InflectorOutput {
  // Get last letter of Pashto and last two letters of phonetics
  // TODO: !!! Handle weird endings / symbols ' etc.
  const plural = makePlural(w);
  const pEnd = w.p.slice(-1);
  const fEnd = w.f.slice(-2);
  if (w.infap && w.infaf && w.infbp && w.infbf) {
    return {
      inflections: inflectIrregularMasc(w.p, w.f, [
        {p: w.infap, f: w.infaf},
        {p: w.infbp, f: w.infbf},
      ]),
      plural,
    };
  }
  const isTobEnding = (w.p.slice(-3) === "توب" && ["tób", "tob"].includes(w.f.slice(-3)) && w.p.length > 3);
  if (isTobEnding) {
    return { inflections: inflectTobMasc(w.p, w.f), plural };
  }
  if (pEnd === "ی" && fEnd === "ey") {
    return { inflections: inflectRegularYeyMasc(w.p, w.f), plural };
  }
  if (pEnd === "ی" && fEnd === "éy") {
    return { inflections: inflectRegularEmphasizedYeyMasc(w.p, w.f), plural };
  }
  return plural ? { plural } : false
}

function handleFemNoun(word: T.DictionaryEntryNoFVars): T.InflectorOutput {
  // Get first of comma seperated phonetics entries
  /* istanbul ignore next */ // will always have word.c at this point
  const c = word.c || "";
  const animate = c.includes("anim.");
  const pEnd = word.p.slice(-1);

  const plural = makePlural(word);

  if (endingInHeyOrAynRegex.test(word.p) && endingInSingleARegex.test(word.f)) {
    return { inflections: inflectRegularAFem(word.p, word.f), plural };
  }
  if (word.p.slice(-1) === "ح" && endingInSingleARegex.test(word.f)) {
    return { inflections: inflectRegularAWithHimPEnding(word.p, word.f), plural };
  }
  if (pashtoConsonants.includes(pEnd) && !animate) {
    return { inflections: inflectRegularInanMissingAFem(word.p, word.f), plural };
  }
  if (pEnd === "ي" && (!animate)) {
    return { inflections: inflectRegularInanEeFem(word.p, word.f), plural };
  }
  if (pEnd === "ۍ") {
    return { inflections: inflectRegularUyFem(word.p, word.f), plural };
  }
  // if (endingInAlefRegex.test(word.p)) {
  //   return { inflections: inflectRegularAaFem(word.p, f) };
  // }
  return plural ? { plural } : false;
}

// LEVEL 3 FUNCTIONS
function inflectIrregularUnisex(p: string, f: string, inflections: Array<{p: string, f: string}>): T.Inflections {
  return {
    masc: [
      [{p, f}],
      [{p: inflections[0].p, f: inflections[0].f}],
      [{p: `${inflections[1].p}و`, f: `${inflections[1].f}o`}],
    ],
    fem: [
      [{p: `${inflections[1].p}ه`, f: `${inflections[1].f}a`}],
      [{p: `${inflections[1].p}ې`, f: `${inflections[1].f}e`}],
      [{p: `${inflections[1].p}و`, f: `${inflections[1].f}o`}],
    ],
  };
}

export function inflectRegularYeyUnisex(p: string, f: string): T.UnisexInflections {
  const baseP = p.slice(0, -1);
  const baseF = f.slice(0, -2);
  return {
    masc: [
      [{p, f}],
      [{p: `${baseP}ي`, f: `${baseF}ee`}],
      [
        {p: `${baseP}یو`, f: `${baseF}iyo`},
        {p: `${baseP}و`, f: `${baseF}o`},
      ],
    ],
    fem: [
      [{p: `${baseP}ې`, f: `${baseF}e`}],
      [{p: `${baseP}ې`, f: `${baseF}e`}],
      [{p: `${baseP}و`, f: `${baseF}o`}],
    ],
  };
}

export function inflectRegularShwaEndingUnisex(pr: string, fr: string): T.UnisexInflections {
  const { p, f } = removeAccents(makePsString(pr, fr));
  const baseP = p.slice(0, -1);
  const baseF = f.slice(0, -1);
  return {
    masc: [
      [{p: `${baseP}ه`, f: `${baseF}ú`}],
      [{p: `${baseP}ه`, f: `${baseF}ú`}],
      [{p: `${baseP}و`, f: `${baseF}ó`}],
    ],
    fem: [
      [{p: `${baseP}ه`, f: `${baseF}á`}],
      [{p: `${baseP}ې`, f: `${baseF}é`}],
      [{p: `${baseP}و`, f: `${baseF}ó`}],
    ],
  };
}

function inflectEmphasizedYeyUnisex(p: string, f: string): T.UnisexInflections {
  const baseP = p.slice(0, -1);
  const baseF = f.slice(0, -2);
  return {
    masc: [
      [{p, f}],
      [{p: `${baseP}ي`, f: `${baseF}ée`}],
      [
        {p: `${baseP}یو`, f: `${baseF}iyo`},
        {p: `${baseP}و`, f: `${baseF}ó`},
      ],
    ],
    fem: [
      [{p: `${baseP}ۍ`, f: `${baseF}úy`}],
      [{p: `${baseP}ۍ`, f: `${baseF}úy`}],
      [
        { p: `${baseP}یو`, f: `${baseF}úyo` },
        { p: `${baseP}و`, f: `${baseF}ó`, },
      ],
    ],
  };
}

function inflectConsonantEndingUnisex(p: string, f: string): T.UnisexInflections {
  return {
    masc: [
      [{p, f}],
      [{p, f}],
      [{p: `${p}و`, f: `${f}o`}],
    ],
    fem: [
      [{p: `${p}ه`, f: `${f}a`}],
      [{p: `${p}ې`, f: `${f}e`}],
      [{p: `${p}و`, f: `${f}o`}],
    ],
  };
}

function inflectRegularYeyMasc(p: string, f: string): T.Inflections {
  const baseP = p.slice(0, -1);
  const baseF = f.slice(0, -2);
  return {
    masc: [
      [{p, f}],
      [{p: `${baseP}ي`, f: `${baseF}ee`}],
      [
        {p: `${baseP}یو`, f: `${baseF}iyo`},
        {p: `${baseP}و`, f: `${baseF}o`},
      ],
    ],
  };
}

function inflectTobMasc(p: string, f: string): T.Inflections {
  const baseP = p.slice(0, -3);
  const baseF = f.slice(0, -3);
  return {
    masc: [
      [{p, f}],
      [{p: `${baseP}تابه`, f: `${baseF}taabu`}],
      [{p: `${baseP}تبو`, f: `${baseF}tabo`}],
    ],
  };
}

function inflectRegularEmphasizedYeyMasc(p: string, f: string): T.Inflections {
  const baseP = p.slice(0, -1);
  const baseF = f.slice(0, -2);
  return {
    masc: [
      [{p, f}],
      [{p: `${baseP}ي`, f: `${baseF}ée`}],
      [
        {p: `${baseP}یو`, f: `${baseF}iyo`},
        {p: `${baseP}و`, f: `${baseF}o`},
      ],
    ],
  };
}

function inflectIrregularMasc(p: string, f: string, inflections: Array<{p: string, f: string}>): T.Inflections {
  return {
    masc: [
      [{p, f}],
      [{p: inflections[0].p, f: inflections[0].f}],
      [{p: `${inflections[1].p}و`, f: `${inflections[1].f}o`}],
    ],
  };
}

function inflectRegularAFem(p: string, f: string): T.Inflections {
  const baseF = ["'", "’"].includes(f.slice(-1)) ? f.slice(0, -2) : f.slice(0, -1);
  const baseP = p.slice(-1) === "ع" ? p : p.slice(0, -1);
  return {
    fem: [
      [{p, f}],
      [{p: `${baseP}ې`, f: `${baseF}e`}],
      [{p: `${baseP}و`, f: `${baseF}o`}],
    ],
  };
}

function inflectRegularAWithHimPEnding(p: string, f: string): T.Inflections {
  const baseF = f.slice(0, -1);
  return {
    fem: [
      [{p, f}],
      [{p: `${p}ې`, f: `${baseF}e`}],
      [{p: `${p}و`, f: `${baseF}o`}],
    ],
  };
}

function inflectRegularInanMissingAFem(p: string, f: string): T.Inflections {
  return {
    fem: [
      [{p, f}],
      [{p: `${p}ې`, f: `${f}e`}],
      [{p: `${p}و`, f: `${f}o`}],
    ],
  };
}

function inflectRegularInanEeFem(p: string, f: string): T.Inflections {
  const baseP = p.slice(0, -1);
  const baseF = f.slice(0, -2);
  return {
    fem: [
      [{p, f}],
      [{p: `${baseP}ۍ`, f: `${baseF}uy`}],
      [{p: `${baseP}یو`, f: `${baseF}uyo`}],
    ],
  };
}

function inflectRegularUyFem(p: string, f: string): T.Inflections {
  const baseP = p.slice(0, -1);
  const baseF = f.slice(0, -2);
  return {
    fem: [
      [{p, f}],
      [{p, f}],
      [
        {p: `${baseP}یو`, f: `${baseF}uyo`},
        {p: `${baseP}و`, f: `${baseF}o`},
      ],
    ],
  };
}

function makePashtoPlural(word: T.DictionaryEntryNoFVars): T.PluralInflections | undefined {
  if (!(word.ppp && word.ppf)) return undefined;
  const base = makePsString(word.ppp, word.ppf);
  // TODO: Add male Pashto plural
  if (word.c?.includes("n. f.")) {
    return {
      fem: [
        [base],
        // todo: function to add و ending automatically
        [concatPsString(
          makePsString(base.p.slice(0, -1), base.f.slice(0, -1)),
          { p: "و", f: "o" },
        )],
      ],
    }
  }
  // TODO: handle masculine and unisex
  return undefined;
}

function makePlural(w: T.DictionaryEntryNoFVars): T.PluralInflections | undefined {
  // TODO: Include the Pashto plural thing here
  const pashtoPlural = makePashtoPlural(w);
  if (pashtoPlural) return pashtoPlural;
  function addMascPluralSuffix(animate?: boolean): T.PluralInflectionSet {
    const base = removeAccents(w);
    return [
      [concatPsString(base, animate ? { p: "ان", f: "áan" } : { p: "ونه", f: "óona" })],
      [concatPsString(base, animate ? { p: "انو", f: "áano" } : { p: "ونو", f: "óono" })],
    ];
  } 
  function addAnimUnisexPluralSuffix(): T.UnisexSet<T.PluralInflectionSet> {
    const base = removeAccents(w);
    return {
      masc: addMascPluralSuffix(true),
      fem: [
        [concatPsString(base, { p: "انې", f: "áane" })],
        [concatPsString(base, { p: "انو", f: "áano" })],
      ],
    };
  }
  function addFemLongVowelSuffix(): T.PluralInflectionSet {
    const base = makePsString(w.p, w.f);
    const baseWOutAccents = removeAccents(base);
    return [
      [concatPsString(base, { p: "وې", f: "we" }), concatPsString(baseWOutAccents, { p: "ګانې", f: "gáane" })],
      [concatPsString(base, { p: "وو", f: "wo" }), concatPsString(baseWOutAccents, { p: "ګانو", f: "gáano" })],
    ];
  }

  const anim = w.c?.includes("anim.");
  const type = (w.c?.includes("unisex"))
    ? "unisex noun"
    : (w.c?.includes("n. m."))
    ? "masc noun"
    : (w.c?.includes("n. f."))
    ? "fem noun"
    : "other";
  if (type === "unisex noun" && endsInConsonant(w) && (!w.infap) && anim) {
    return addAnimUnisexPluralSuffix();
  }
  if (type === "masc noun" && endsInConsonant(w) && (!w.infap) && (w.p.slice(-3) !== "توب")) {
    return {
      masc: addMascPluralSuffix(anim),
    };
  }
  // TODO: What about endings in long ee / animate at inanimate
  if (type === "fem noun" && endsInAaOrOo(w) && (!w.infap)) {
    return {
      fem: addFemLongVowelSuffix(),
    };
  }
  return undefined;
}
