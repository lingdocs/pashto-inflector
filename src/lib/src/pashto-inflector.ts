/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { pashtoConsonants } from "./pashto-consonants";
import {
  concatInflections,
  splitDoubleWord,
  ensureUnisexInflections,
  concatPsString,
  endsInConsonant,
  endsInAaOrOo,
  addOEnding,
  endsInShwa,
  splitPsByVarients,
  removeEndTick,
  endsWith,
} from "./p-text-helpers";
import { makePsString, removeFVarients } from "./accent-and-ps-utils";
import {
  accentFSylsOnNFromEnd,
  accentOnNFromEnd,
  countSyllables,
  hasAccents,
  removeAccents,
  splitUpSyllables,
} from "./accent-helpers";
import * as T from "../../types";
import { fmapSingleOrLengthOpts } from "./fp-ps";

const endingInSingleARegex = /[^a]'?’?[aá]'?’?$/;
const endingInHayOrAynRegex = /[^ا][هع]$/;
// const endingInAlefRegex = /اع?$/;

export function inflectWord(word: T.DictionaryEntry): T.InflectorOutput {
  // If it's a noun/adj, inflect accordingly
  // TODO: What about n. f. / adj. that end in ي ??
  const w = removeFVarients(word);
  if (w.c?.includes("doub.")) {
    const words = splitDoubleWord(w);
    const inflected = words.map((x) =>
      ensureUnisexInflections(inflectWord(x), x)
    );
    return {
      inflections: concatInflections(
        inflected[0].inflections,
        inflected[1].inflections
      ) as T.UnisexInflections,
    };
  }
  if (w.c && w.c.includes("pl.")) {
    return handlePluralNounOrAdj(w);
  }
  if (
    w.c &&
    (w.c.includes("adj.") || w.c.includes("unisex") || w.c.includes("num"))
  ) {
    return handleUnisexWord(w);
  }
  if (w.c && w.c.includes("n. m.")) {
    return handleMascNoun(w);
  }
  if (w.c && w.c.includes("n. f.")) {
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
  const plurals = makePlural(word);
  if (word.noInf) {
    return !plurals ? false : { ...plurals };
  }
  if (word.infap && word.infaf && word.infbp && word.infbf) {
    return {
      inflections: inflectIrregularUnisex(word.p, word.f, [
        { p: word.infap, f: word.infaf },
        { p: word.infbp, f: word.infbf },
      ]),
      ...plurals,
    };
  }
  if (pEnd === "ی" && word.f.slice(-2) === "ay") {
    return { inflections: inflectRegularYayUnisex(word.p, word.f), ...plurals };
  }
  if (pEnd === "ه" && word.g.slice(-1) === "u") {
    return {
      inflections: inflectRegularShwaEndingUnisex(word.p, word.f),
      ...plurals,
    };
  }
  if (pEnd === "ی" && word.f.slice(-2) === "áy") {
    return {
      inflections: inflectEmphasizedYayUnisex(word.p, word.f),
      ...plurals,
    };
  }
  if (
    pashtoConsonants.includes(pEnd) ||
    word.p.slice(-2) === "وی" ||
    word.p.slice(-2) === "ای" ||
    word.f.slice(-1) === "w" ||
    (word.p.slice(-1) === "ه" && word.f.slice(-1) === "h")
  ) {
    return {
      inflections: inflectConsonantEndingUnisex(word.p, word.f),
      ...plurals,
    };
  }
  if (plurals) return plurals;
  return false;
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

function handleMascNoun(w: T.DictionaryEntryNoFVars): T.InflectorOutput {
  // Get last letter of Pashto and last two letters of phonetics
  // TODO: !!! Handle weird endings / symbols ' etc.
  const plurals = makePlural(w);
  if (w.noInf) {
    return !plurals ? false : { ...plurals };
  }
  const pEnd = w.p.slice(-1);
  const fEnd = w.f.slice(-2);
  if (w.infap && w.infaf && w.infbp && w.infbf) {
    return {
      inflections: inflectIrregularMasc(w.p, w.f, [
        { p: w.infap, f: w.infaf },
        { p: w.infbp, f: w.infbf },
      ]),
      ...plurals,
    };
  }
  const isTobEnding =
    w.p.slice(-3) === "توب" &&
    ["tób", "tob"].includes(w.f.slice(-3)) &&
    w.p.length > 3;
  if (isTobEnding) {
    return { inflections: inflectTobMasc(w.p, w.f), ...plurals };
  }
  if (pEnd === "ی" && fEnd === "ay") {
    return { inflections: inflectRegularYayMasc(w.p, w.f), ...plurals };
  }
  if (pEnd === "ی" && fEnd === "áy") {
    return {
      inflections: inflectRegularEmphasizedYayMasc(w.p, w.f),
      ...plurals,
    };
  }
  return plurals ? { ...plurals } : false;
}

function handleFemNoun(word: T.DictionaryEntryNoFVars): T.InflectorOutput {
  // Get first of comma seperated phonetics entries
  /* istanbul ignore next */ // will always have word.c at this point
  const c = word.c || "";
  const animate = c.includes("anim.");
  const pEnd = word.p.slice(-1);

  const plurals = makePlural(word);
  if (word.noInf) {
    return !plurals ? false : { ...plurals };
  }

  if (endingInHayOrAynRegex.test(word.p) && endingInSingleARegex.test(word.f)) {
    return { inflections: inflectRegularAFem(word.p, word.f), ...plurals };
  }
  if (word.p.slice(-1) === "ح" && endingInSingleARegex.test(word.f)) {
    return {
      inflections: inflectRegularAWithHimPEnding(word.p, word.f),
      ...plurals,
    };
  }
  // TODO: better reusable function to check if something ends with a consonant
  if (
    (pashtoConsonants.includes(pEnd) || word.f.slice(-1) === "w") &&
    !animate
  ) {
    return {
      inflections: inflectRegularInanMissingAFem(word.p, word.f),
      ...plurals,
    };
  }
  if (pEnd === "ي" && !animate) {
    return { inflections: inflectRegularInanEeFem(word.p, word.f), ...plurals };
  }
  if (pEnd === "ۍ") {
    return { inflections: inflectRegularUyFem(word.p, word.f), ...plurals };
  }
  // if (endingInAlefRegex.test(word.p)) {
  //   return { inflections: inflectRegularAaFem(word.p, f) };
  // }
  return plurals ? { ...plurals } : false;
}

// LEVEL 3 FUNCTIONS
function inflectIrregularUnisex(
  p: string,
  f: string,
  inflections: Array<{ p: string; f: string }>
): T.Inflections {
  const inf1 = removeAccents(inflections[1]);
  const inf0 = removeAccents(inflections[0]);
  const inf0fSyls = splitUpSyllables(inf0.f).length;
  return {
    masc: [
      [{ p, f }],
      [
        {
          p: inflections[0].p,
          f: `${inf0.f.slice(0, -1)}${inf0fSyls === 1 ? "u" : "ú"}`,
        },
      ],
      [{ p: `${inf1.p}و`, f: `${inf1.f}${inf0fSyls === 1 ? "o" : "ó"}` }],
    ],
    fem: [
      [{ p: `${inf1.p}ه`, f: `${inf1.f}${inf0fSyls === 1 ? "a" : "á"}` }],
      [{ p: `${inf1.p}ې`, f: `${inf1.f}${inf0fSyls === 1 ? "e" : "é"}` }],
      [{ p: `${inf1.p}و`, f: `${inf1.f}${inf0fSyls === 1 ? "o" : "ó"}` }],
    ],
  };
}

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

function inflectEmphasizedYayUnisex(p: string, f: string): T.UnisexInflections {
  const baseP = p.slice(0, -1);
  const baseF = f.slice(0, -2);
  return {
    masc: [
      [{ p, f }],
      [{ p: `${baseP}ي`, f: `${baseF}ée` }],
      [
        { p: `${baseP}یو`, f: `${baseF}úyo` },
        { p: `${baseP}و`, f: `${baseF}ó` },
      ],
    ],
    fem: [
      [{ p: `${baseP}ۍ`, f: `${baseF}úy` }],
      [{ p: `${baseP}ۍ`, f: `${baseF}úy` }],
      [
        { p: `${baseP}یو`, f: `${baseF}úyo` },
        { p: `${baseP}و`, f: `${baseF}ó` },
      ],
    ],
  };
}

function inflectConsonantEndingUnisex(
  p: string,
  f: string
): T.UnisexInflections {
  const fSyls = splitUpSyllables(removeAccents(f));
  const iBase =
    fSyls.length === 1
      ? makePsString(p, accentFSylsOnNFromEnd(fSyls, 0))
      : makePsString(p, f);
  return {
    masc: [[{ p, f }], [{ p, f }], [{ p: `${iBase.p}و`, f: `${iBase.f}o` }]],
    fem: [
      [{ p: `${iBase.p}ه`, f: `${iBase.f}a` }],
      [{ p: `${iBase.p}ې`, f: `${iBase.f}e` }],
      [{ p: `${iBase.p}و`, f: `${iBase.f}o` }],
    ],
  };
}

function inflectRegularYayMasc(p: string, f: string): T.Inflections {
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
  };
}

function inflectTobMasc(p: string, f: string): T.Inflections {
  const baseP = p.slice(0, -3);
  const baseF = f.slice(0, -3);
  return {
    masc: [
      [{ p, f }],
      [{ p: `${baseP}تابه`, f: `${baseF}taabu` }],
      [{ p: `${baseP}تبو`, f: `${baseF}tabo` }],
    ],
  };
}

function inflectRegularEmphasizedYayMasc(p: string, f: string): T.Inflections {
  const baseP = p.slice(0, -1);
  const baseF = f.slice(0, -2);
  return {
    masc: [
      [{ p, f }],
      [{ p: `${baseP}ي`, f: `${baseF}ée` }],
      [
        { p: `${baseP}یو`, f: `${baseF}úyo` },
        { p: `${baseP}و`, f: `${baseF}ó` },
      ],
    ],
  };
}

function inflectIrregularMasc(
  p: string,
  f: string,
  inflections: Array<{ p: string; f: string }>
): T.Inflections {
  let inf0f = removeAccents(inflections[0].f);
  const inf0syls = splitUpSyllables(f).length;
  const inf1f = removeAccents(inflections[1].f);
  return {
    masc: [
      [{ p, f }],
      [
        {
          p: inflections[0].p,
          f: `${inf0f.slice(0, -1)}${inf0syls === 1 ? "u" : "ú"}`,
        },
      ],
      [
        {
          p: `${inflections[1].p}و`,
          f: `${inf1f}${inf0syls === 1 ? "o" : "ó"}`,
        },
      ],
    ],
  };
}

function inflectRegularAFem(p: string, f: string): T.Inflections {
  const withoutTrailingComma = ["'", "’"].includes(f.slice(-1))
    ? f.slice(0, -1)
    : f;
  const accentLast = hasAccents(withoutTrailingComma.slice(-1));
  const baseF = withoutTrailingComma.slice(0, -1);
  const baseP = p.slice(-1) === "ع" ? p : p.slice(0, -1);
  return {
    fem: [
      [{ p, f }],
      [{ p: `${baseP}ې`, f: `${baseF}${accentLast ? "é" : "e"}` }],
      [{ p: `${baseP}و`, f: `${baseF}${accentLast ? "ó" : "o"}` }],
    ],
  };
}

function inflectRegularAWithHimPEnding(p: string, f: string): T.Inflections {
  const baseF = f.slice(0, -1);
  return {
    fem: [
      [{ p, f }],
      [{ p: `${p}ې`, f: `${baseF}e` }],
      [{ p: `${p}و`, f: `${baseF}o` }],
    ],
  };
}

function inflectRegularInanMissingAFem(p: string, f: string): T.Inflections {
  const fBase =
    splitUpSyllables(f).length === 1 ? accentFSylsOnNFromEnd(f, 0) : f;
  return {
    fem: [
      [{ p, f }],
      [{ p: `${p}ې`, f: `${fBase}e` }],
      [{ p: `${p}و`, f: `${fBase}o` }],
    ],
  };
}

function inflectRegularInanEeFem(p: string, f: string): T.Inflections {
  const baseP = p.slice(0, -1);
  const baseF = f.slice(0, -2);
  return {
    fem: [
      [{ p, f }],
      [{ p: `${baseP}ۍ`, f: `${baseF}úy` }],
      [
        { p: `${baseP}یو`, f: `${baseF}úyo` },
        { p: `${baseP}و`, f: `${baseF}ó` },
      ],
    ],
  };
}

function inflectRegularUyFem(p: string, f: string): T.Inflections {
  const baseP = p.slice(0, -1);
  const baseF = removeAccents(f.slice(0, -2));
  return {
    fem: [
      [{ p, f: `${baseF}úy` }],
      [{ p, f: `${baseF}úy` }],
      [
        { p: `${baseP}یو`, f: `${baseF}úyo` },
        { p: `${baseP}و`, f: `${baseF}ó` },
      ],
    ],
  };
}

function makePashtoPlural(
  word: T.DictionaryEntryNoFVars
): T.PluralInflections | undefined {
  if (!(word.ppp && word.ppf)) return undefined;
  const base = splitPsByVarients(makePsString(word.ppp, word.ppf));
  function getBaseAndO(): T.PluralInflectionSet {
    return [base, base.flatMap(addOEnding) as T.ArrayOneOrMore<T.PsString>];
  }
  if (word.c?.includes("n. m.")) {
    return { masc: getBaseAndO() };
  }
  if (word.c?.includes("n. f.")) {
    return { fem: getBaseAndO() };
  }
  // TODO: handle masculine and unisex
  return undefined;
}

function makeBundledPlural(
  word: T.DictionaryEntryNoFVars
): T.PluralInflections | undefined {
  if (!endsInConsonant(word) || !word.c?.includes("n.")) {
    return undefined;
  }
  const w = makePsString(word.p, word.f);
  const base = countSyllables(w) === 1 ? accentOnNFromEnd(w, 0) : w;
  return {
    masc: [
      [concatPsString(base, { p: "ه", f: "a" })],
      [concatPsString(base, { p: "و", f: "o" })],
    ],
  };
}

function makeArabicPlural(
  word: T.DictionaryEntryNoFVars
): T.PluralInflections | undefined {
  if (!(word.apf && word.app)) return undefined;
  const w = makePsString(word.app, word.apf);
  const plural = splitPsByVarients(w);
  const end = removeAccents(removeEndTick(word.apf).slice(-1));
  // again typescript being dumb and not letting me use a typed key here
  const value = [
    plural,
    plural.flatMap(addOEnding) as T.ArrayOneOrMore<T.PsString>,
  ] as T.PluralInflectionSet;
  // feminine words that have arabic plurals stay feminine with the plural - ie مرجع - مراجع
  // but masculine words that appear feminine in the plural aren't femening with the Arabic plural - ie. نبي - انبیا
  if (["i", "e", "a"].includes(end) && word.c?.includes("n. f.")) {
    return { fem: value };
  }
  return { masc: value };
}

function makePlural(
  w: T.DictionaryEntryNoFVars
):
  | { plural: T.PluralInflections; bundledPlural?: T.PluralInflections }
  | { arabicPlural: T.PluralInflections; bundledPlural?: T.PluralInflections }
  | undefined {
  function addSecondInf(
    plur: T.ArrayOneOrMore<T.PsString> | T.PsString
  ): T.PluralInflectionSet {
    if (!Array.isArray(plur)) {
      return addSecondInf([plur]);
    }
    return [plur, plur.flatMap(addOEnding) as T.ArrayOneOrMore<T.PsString>];
  }
  if (w.c && w.c.includes("pl.")) {
    const plural = addSecondInf(makePsString(w.p, w.f));
    // Typescript being dumb and not letting me do a typed variable for the key
    // could try refactoring with an updated TypeScript dependency
    if (w.c.includes("n. m.")) return { plural: { masc: plural } };
    if (w.c.includes("n. f.")) return { plural: { fem: plural } };
  }
  // exception for mUláa
  if (w.f === "mUláa" || w.f === "mUlaa") {
    return {
      plural: {
        masc: [
          [
            { p: "ملایان", f: "mUlaayáan" },
            { p: "ملاګان", f: "mUlaagáan" },
          ],
          [
            { p: "ملایانو", f: "mUlaayáano" },
            { p: "ملاګانو", f: "mUlaagáano" },
          ],
        ],
      },
    };
  }
  const arabicPlural = makeArabicPlural(w);
  const pashtoPlural = makePashtoPlural(w);
  const bundledPlural = makeBundledPlural(w);
  function addMascPluralSuffix(
    animate?: boolean,
    shortSquish?: boolean
  ): T.PluralInflectionSet {
    if (shortSquish && (w.infap === undefined || w.infaf === undefined)) {
      throw new Error(`no irregular inflection info for ${w.p} - ${w.ts}`);
    }
    const b = removeAccents(
      shortSquish
        ? makePsString(
            (w.infap as string).slice(0, -1),
            (w.infaf as string).slice(0, -1)
          )
        : w
    );
    const base = endsInShwa(b)
      ? makePsString(b.p.slice(0, -1), b.f.slice(0, -1))
      : b;
    return addSecondInf(
      concatPsString(
        base,
        animate && !shortSquish
          ? { p: "ان", f: "áan" }
          : { p: "ونه", f: "óona" }
      )
    );
  }
  function addAnimUnisexPluralSuffix(): T.UnisexSet<T.PluralInflectionSet> {
    const base = removeAccents(w);
    return {
      masc: addMascPluralSuffix(true),
      fem: addSecondInf(concatPsString(base, { p: "انې", f: "áane" })),
    };
  }
  function addEePluralSuffix(gender: T.Gender): T.PluralInflectionSet {
    const b = removeAccents(w);
    const base = {
      p: b.p.slice(0, -1),
      f: b.f.slice(0, -2),
    };
    const firstInf: T.ArrayOneOrMore<T.PsString> = [
      concatPsString(
        base,
        { p: "یان", f: "iyáan" },
        gender === "fem" ? { p: "ې", f: "e" } : ""
      ),
      ...(gender === "fem"
        ? [concatPsString(base, { p: "یګانې", f: "eegáane" })]
        : []),
    ];
    return [
      firstInf,
      firstInf.flatMap(addOEnding),
      // firstInf.map(addOEnding),
    ] as T.PluralInflectionSet;
  }
  function addAnimN3UnisexPluralSuffix(): T.UnisexSet<T.PluralInflectionSet> {
    const b = removeAccents(w);
    const base = {
      p: b.p.slice(0, -1),
      f: b.f.slice(0, -2),
    };
    return {
      masc: [
        [concatPsString(base, { p: "یان", f: "iyáan" })],
        [concatPsString(base, { p: "یانو", f: "iyáano" })],
        // TODO: or use addSecondInf method above?
      ],
      fem: [
        [concatPsString(base, { p: "یانې", f: "iyáane" })],
        [concatPsString(base, { p: "یانو", f: "iyáano" })],
      ],
    };
  }
  function addLongVowelSuffix(gender: "masc" | "fem"): T.PluralInflectionSet {
    if (pashtoPlural) {
    }
    const base = removeEndTick(makePsString(w.p, w.f));
    const baseWOutAccents = removeAccents(base);
    const space =
      w.p.slice(-1) === "ع" || w.p.slice(-1) === "ه" ? { p: " ", f: " " } : "";
    if (gender === "fem") {
      return addSecondInf([
        concatPsString(base, space, { p: "وې", f: "we" }),
        concatPsString(baseWOutAccents, space, { p: "ګانې", f: "gáane" }),
      ]);
    } else {
      return addSecondInf([
        concatPsString(baseWOutAccents, space, { p: "ګان", f: "gáan" }),
      ]);
    }
  }
  // TODO: This should be possible for words like پلویان but not for words like ترورزامن 🤔
  // function addFemToPashtoPlural(i: T.PluralInflections): T.UnisexSet<T.PluralInflectionSet> {
  //   if ("fem" in i && "masc" in i) return i;
  //   if (!("masc" in i)) throw new Error("bad pashto plural doesn't even have masculine");
  //   if (endsInConsonant(i.masc[0][0])) {
  //     return {
  //       ...i,
  //       fem: [
  //         i.masc[0].map((x) => concatPsString(x, { p: "ې", f: "e" })) as T.ArrayOneOrMore<T.PsString>,
  //         i.masc[0].map((x) => concatPsString(x, { p: "و", f: "o" })) as T.ArrayOneOrMore<T.PsString>,
  //       ],
  //     };
  //   }
  //   return {
  //     ...i,
  //     fem: i.masc,
  //   };
  // }

  const shortSquish = !!w.infap && !w.infap.includes("ا");
  const anim = w.c?.includes("anim.");
  const type = w.c?.includes("unisex")
    ? "unisex noun"
    : w.c?.includes("n. m.")
    ? "masc noun"
    : w.c?.includes("n. f.")
    ? "fem noun"
    : "other";
  if (pashtoPlural) {
    return {
      plural: pashtoPlural,
      arabicPlural,
    };
  }
  if (type === "unisex noun") {
    // doesn't need to be labelled anim - because it's only with animate nouns that you get the unisex - I THINK
    if (endsInConsonant(w) && !w.infap) {
      return {
        arabicPlural,
        bundledPlural,
        plural: addAnimUnisexPluralSuffix(),
      };
    }
    if (shortSquish && !anim) {
      return {
        arabicPlural,
        plural: { masc: addMascPluralSuffix(anim, shortSquish) },
      };
    }
    if (endsWith([{ p: "ی", f: "áy" }, { p: "ي" }], w, true)) {
      return { arabicPlural, plural: addAnimN3UnisexPluralSuffix() };
    }
    // usually shortSquish nouns would never have arabicPlurals -- so we don't have to worry about catching
    // arabic plurals for the animat ones, right?
  }
  if (
    type === "masc noun" &&
    (shortSquish || ((endsInConsonant(w) || endsInShwa(w)) && !w.infap)) &&
    w.p.slice(-3) !== "توب"
  ) {
    return {
      arabicPlural,
      bundledPlural,
      plural: {
        masc: addMascPluralSuffix(anim, shortSquish),
      },
    };
  }
  if (type === "masc noun" && endsWith({ p: "ی", f: "áy" }, w, true) && anim) {
    const { masc } = addAnimN3UnisexPluralSuffix();
    return {
      arabicPlural,
      plural: {
        masc,
      },
    };
  }
  if (type === "masc noun" && endsWith({ p: "ي" }, w)) {
    const masc = addEePluralSuffix("masc");
    return {
      arabicPlural,
      plural: { masc },
    };
  }
  // TODO: What about endings in long ee / animate at inanimate
  if (type === "masc noun" && endsInAaOrOo(w) && !w.infap) {
    return {
      arabicPlural,
      plural: {
        masc: addLongVowelSuffix("masc"),
      },
    };
  }
  // TODO: What about endings in long ee / animate at inanimate
  if (type === "fem noun" && endsInAaOrOo(w) && !w.infap) {
    return {
      arabicPlural,
      plural: {
        fem: addLongVowelSuffix("fem"),
      },
    };
  }
  if (type === "fem noun" && endsWith({ p: "ي" }, w)) {
    return {
      arabicPlural,
      plural: {
        fem: addEePluralSuffix("fem"),
      },
    };
  }
  if (arabicPlural) {
    return { arabicPlural, plural: pashtoPlural, bundledPlural };
  }
  return undefined;
}

export function inflectYay(
  ps: T.SingleOrLengthOpts<T.PsString>
): T.SingleOrLengthOpts<T.UnisexInflections> {
  return fmapSingleOrLengthOpts((x) => inflectRegularYayUnisex(x.p, x.f), ps);
}
