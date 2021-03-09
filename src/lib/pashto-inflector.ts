/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { pashtoConsonants } from "./pashto-consonants";
import * as T from "../types";

const endingInSingleARegex = /[^a]'?’?[aá]'?’?$/;
const endingInHeyOrAynRegex = /[^ا][هع]$/;
const endingInAlefRegex = /اع?$/;

export function inflectWord(word: T.DictionaryEntry): T.Inflections | false {
  // If it's a noun/adj, inflect accordingly
  // TODO: What about n. f. / adj. that end in ي ??
  if (word.noInf) {
    return false;
  }
  if (word.c && (word.c.includes("adj.") || word.c.includes("unisex"))) {
    return handleUnisexWord(word);
  }
  if (word.c && (word.c.includes("n. m."))) {
    return handleMascNoun(word);
  }
  if (word.c && (word.c.includes("n. f."))) {
    return handleFemNoun(word);
  }
  // It's not a noun/adj
  return false;
}

// LEVEL 2 FUNCTIONS
function handleUnisexWord(word: T.DictionaryEntry): T.Inflections | false {
  // Get first of comma seperated phonetics entries
  const f = word.f.split(",")[0].trim();
  // Get last letter of Pashto and last two letters of phonetics
  // TODO: !!! Handle weird endings / symbols ' etc.
  const pEnd = word.p.slice(-1);
  if (word.infap && word.infaf && word.infbp && word.infbf) {
    return inflectIrregularUnisex(word.p, f, [
      {p: word.infap, f: word.infaf},
      {p: word.infbp, f: word.infbf},
    ]);
  }
  if (pEnd === "ی" && f.slice(-2) === "ey") {
    return inflectRegularYeyUnisex(word.p, f);
  }
  if (pEnd === "ی" && f.slice(-2) === "éy") {
    return inflectEmphasizedYeyUnisex(word.p, f);
  }
  if (
    pashtoConsonants.includes(pEnd) ||
    word.p.slice(-2) === "وی" ||
    word.p.slice(-2) === "ای" ||
    (word.p.slice(-1) === "ه" && f.slice(-1) === "h")
  ) {
    return inflectConsonantEndingUnisex(word.p, f);
  }
  return false;
}

function handleMascNoun(word: T.DictionaryEntry): T.Inflections | false {
  // Get first of comma seperated phonetics entries
  const f = word.f.split(",")[0].trim();
  // Get last letter of Pashto and last two letters of phonetics
  // TODO: !!! Handle weird endings / symbols ' etc.
  const pEnd = word.p.slice(-1);
  const fEnd = f.slice(-2);
  if (word.infap && word.infaf && word.infbp && word.infbf) {
    return inflectIrregularMasc(word.p, f, [
      {p: word.infap, f: word.infaf},
      {p: word.infbp, f: word.infbf},
    ]);
  }
  const isTobEnding = (word.p.slice(-3) === "توب" && ["tób", "tob"].includes(f.slice(-3)) && word.p.length > 3);
  if (isTobEnding) {
    return inflectTobMasc(word.p, f);
  }
  if (pEnd === "ی" && fEnd === "ey") {
    return inflectRegularYeyMasc(word.p, f);
  }
  if (pEnd === "ی" && fEnd === "éy") {
    return inflectRegularEmphasizedYeyMasc(word.p, f);
  }
  return false;
}

function handleFemNoun(word: T.DictionaryEntry): T.Inflections | false {
  // Get first of comma seperated phonetics entries
  const f = word.f.split(",")[0].trim();
  /* istanbul ignore next */ // will always have word.c at this point
  const c = word.c || "";
  const animate = c.includes("anim.");
  const pEnd = word.p.slice(-1);

  if (endingInHeyOrAynRegex.test(word.p) && endingInSingleARegex.test(f)) {
    return inflectRegularAFem(word.p, f);
  }
  if (word.p.slice(-1) === "ح" && endingInSingleARegex.test(f)) {
    return inflectRegularAWithHimPEnding(word.p, f);
  }
  if (pashtoConsonants.includes(pEnd) && !animate) {
    return inflectRegularInanMissingAFem(word.p, f);
  }
  if (pEnd === "ي" && (!animate)) {
    return inflectRegularInanEeFem(word.p, f);
  }
  if (pEnd === "ۍ") {
    return inflectRegularUyFem(word.p, f);
  }
  if (endingInAlefRegex.test(word.p)) {
    return inflectRegularAaFem(word.p, f);
  }
  return false;
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

function inflectRegularAaFem(p: string, f: string): T.Inflections {
  const baseF = ["'", "’"].includes(f.slice(-1)) ? f.slice(0, -1) : f;
  return {
    fem: [
      [{p, f}],
      [{p: `${p}وې`, f: `${baseF}we`}],
      [{p: `${p}وو`, f: `${baseF}wo`}],
    ],
  };
}
