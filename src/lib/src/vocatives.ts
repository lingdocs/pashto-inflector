import * as T from "../../types";
import { makePsString } from "./accent-and-ps-utils";
import {
  accentIsOnEnd,
  accentOnNFromEnd,
  countSyllables,
  removeAccents,
} from "./accent-helpers";
import { applyPsString, mapGen } from "./fp-ps";
import { getInflectionPattern } from "./inflection-pattern";
import {
  endsInConsonant,
  endsInTob,
  hasShwaEnding,
  mapPsString,
  endsWith,
} from "./p-text-helpers";
import {
  isAdjOrUnisexNounEntry,
  isAnimNounEntry,
  isFemNounEntry,
  isInflectableEntry,
  isMascNounEntry,
  isNounEntry,
  isNumberEntry,
} from "./type-predicates";

export function getVocatives(
  e: T.DictionaryEntryNoFVars
): T.PluralInflections | undefined {
  if (!isInflectableEntry(e)) {
    return undefined;
  }
  const entry: T.InflectableEntry = e;
  const pattern = getInflectionPattern(entry);
  if (
    pattern === 0 &&
    isFemNounEntry(e) &&
    isAnimNounEntry(e) &&
    endsInConsonant(e)
  ) {
    return vocFemAnimException(e);
  }
  const gender: T.Gender | "unisex" =
    isAdjOrUnisexNounEntry(entry) || isNumberEntry(entry)
      ? "unisex"
      : isMascNounEntry(entry)
      ? "masc"
      : "fem";
  if (pattern === 0 || pattern === 6) {
    return undefined;
  }
  const funcs = patternFuncs[pattern];
  if (gender === "masc") {
    return {
      masc: funcs.masc(e),
    };
  }
  if (gender === "fem") {
    return {
      fem: funcs.fem(e),
    };
  }
  if (gender === "unisex") {
    return {
      masc: funcs.masc(e),
      fem: funcs.fem(e),
    };
  }
}

const patternFuncs: Record<
  1 | 2 | 3 | 4 | 5,
  Record<T.Gender, (e: T.DictionaryEntryNoFVars) => T.PluralInflectionSet>
> = {
  1: {
    masc: vocPattern1Masc,
    fem: vocPattern1Fem,
  },
  2: {
    masc: vocPattern2Masc,
    fem: vocPattern2Fem,
  },
  3: {
    masc: vocPattern3Masc,
    fem: vocPattern3Fem,
  },
  4: {
    masc: vocPattern4Masc,
    fem: vocPattern4Fem,
  },
  5: {
    masc: vocPattern5Masc,
    fem: vocPattern5Fem,
  },
};

function vocFemAnimException(e: T.NounEntry): T.PluralInflections {
  if (!e.ppp || !e.ppf) {
    throw new Error(
      "plural missing for feminine animate exception noun " + e.p
    );
  }
  // TODO: HANDLE BETTER WITH PLURALS!
  const plurBase = mapPsString(
    (x) => x.slice(0, -1),
    makePsString(e.ppp, e.ppf)
  );
  const base =
    countSyllables(e) === 1 ? accentOnNFromEnd(e, 0) : makePsString(e.p, e.f);
  return {
    fem: [
      [{ p: `${base.p}ې`, f: `${base.f}e` }],
      [{ p: `${plurBase.p}و`, f: `${plurBase.f}o` }],
    ],
  };
}

function vocPattern1Masc(
  e: T.DictionaryEntryNoFVars | T.NounEntry
): T.PluralInflectionSet {
  if (isNounEntry(e) && endsInTob(e)) {
    const base = mapPsString((x) => x.slice(0, -3), e);
    return [
      [{ p: `${e.p}ه`, f: `${e.f}a` }],
      [{ p: `${base.p}تبو`, f: `${base.f}tábo` }],
    ];
  }
  const shwaEnding = hasShwaEnding(e);
  const base = mapGen(
    (ps) => (countSyllables(e) === 1 ? accentOnNFromEnd(ps, 0) : ps),
    mapPsString((x: string): string => (shwaEnding ? x.slice(0, -1) : x), e)
  );
  if (shwaEnding && e.f.endsWith("ú")) {
    return [
      [{ p: `${base.p}ه`, f: `${base.f}á` }],
      [{ p: `${base.p}و`, f: `${base.f}ó` }],
    ];
  }
  return [
    [{ p: `${base.p}ه`, f: `${base.f}a` }],
    [{ p: `${base.p}و`, f: `${base.f}o` }],
  ];
}

function vocPattern1Fem(e: T.DictionaryEntryNoFVars): T.PluralInflectionSet {
  const shwaEnding = hasShwaEnding(e);
  const hasFemEnding = endsWith([{ p: "ه", f: "a" }], e) || shwaEnding;
  const base = mapGen(
    (ps) => (countSyllables(e) === 1 ? accentOnNFromEnd(ps, 0) : ps),
    hasFemEnding
      ? mapPsString((x) => x.slice(0, -1), e)
      : makePsString(e.p, e.f)
  );
  if (
    endsWith(
      [
        { p: "ع", f: "a" },
        { p: "ع", f: "a'" },
      ],
      e
    )
  ) {
    const base = applyPsString(
      {
        f: (f) => f.slice(0, f.endsWith("'") ? -2 : -1),
      },
      e
    );
    if (accentIsOnEnd(e)) {
      return [
        [{ p: `${base.p}ې`, f: `${base.f}é` }],
        [{ p: `${base.p}و`, f: `${base.f}ó` }],
      ];
    }
    return [
      [{ p: `${base.p}ې`, f: `${base.f}e` }],
      [{ p: `${base.p}و`, f: `${base.f}o` }],
    ];
  }
  if (endsWith([{ p: "ح", f: "a" }], e)) {
    const base = applyPsString(
      {
        f: (f) => f.slice(0, -1),
      },
      e
    );
    if (accentIsOnEnd(e)) {
      return [
        [{ p: `${base.p}ې`, f: `${base.f}é` }],
        [{ p: `${base.p}و`, f: `${base.f}ó` }],
      ];
    }
    return [
      [{ p: `${base.p}ې`, f: `${base.f}e` }],
      [{ p: `${base.p}و`, f: `${base.f}o` }],
    ];
  }
  if (hasFemEnding && accentIsOnEnd(e)) {
    return [
      [{ p: `${base.p}ې`, f: `${base.f}é` }],
      [{ p: `${base.p}و`, f: `${base.f}ó` }],
    ];
  }
  return [
    [{ p: `${base.p}ې`, f: `${base.f}e` }],
    [{ p: `${base.p}و`, f: `${base.f}o` }],
  ];
}

function vocPattern2Masc(e: T.DictionaryEntryNoFVars): T.PluralInflectionSet {
  const base = makePsString(e.p.slice(0, -1), e.f.slice(0, -2));
  return [
    [{ p: `${base.p}یه`, f: `${base.f}iya` }],
    [
      { p: `${base.p}یو`, f: `${base.f}iyo` },
      { p: `${base.p}و`, f: `${base.f}o` },
    ],
  ];
}

function vocPattern2Fem(e: T.DictionaryEntryNoFVars): T.PluralInflectionSet {
  const base = makePsString(
    e.p.slice(0, -1),
    e.f.slice(0, e.f.endsWith("ay") ? -2 : -1)
  );
  return [
    [{ p: `${base.p}ې`, f: `${base.f}e` }],
    [
      { p: `${base.p}یو`, f: `${base.f}iyo` },
      { p: `${base.p}و`, f: `${base.f}o` },
    ],
  ];
}

function vocPattern3Masc(e: T.DictionaryEntryNoFVars): T.PluralInflectionSet {
  const base = makePsString(
    e.p.slice(0, -1),
    // shouldn't be accents here but remove just to be sure
    removeAccents(e.f.slice(0, -2))
  );
  const baseSyls = countSyllables(base);
  return [
    [{ p: `${base.p}یه`, f: `${base.f}úya` }],
    [
      { p: `${base.p}یو`, f: `${base.f}úyo` },
      { p: `${base.p}و`, f: `${base.f}${baseSyls ? "ó" : "o"}` },
    ],
  ];
}

function vocPattern3Fem(e: T.DictionaryEntryNoFVars): T.PluralInflectionSet {
  const base = makePsString(
    e.p.slice(0, -1),
    // shouldn't be accents here but remove just to be sure
    removeAccents(e.f.slice(0, -2))
  );
  // TODO: This works well for unisex nouns/adjs but would be redundant for fem. nouns?
  return [
    [{ p: `${base.p}ۍ`, f: `${base.f}úy` }],
    [
      { p: `${base.p}یو`, f: `${base.f}úyo` },
      { p: `${base.p}و`, f: `${base.f}ó` },
    ],
  ];
}

function vocPattern4Masc(e: T.DictionaryEntryNoFVars): T.PluralInflectionSet {
  const base = countSyllables(e) === 1 ? accentOnNFromEnd(e, 0) : e;
  const plurBase = makePsString(e.infbp || "", e.infbf || "");
  if (endsInConsonant(e)) {
    return [
      [{ p: `${base.p}ه`, f: `${base.f}a` }],
      [{ p: `${plurBase.p}و`, f: `${plurBase.f}ó` }],
    ];
  }
  // TODO: is this even possible?
  if (hasShwaEnding(e)) {
    return [
      [{ p: `${base.p.slice(0, -1)}ه`, f: `${base.f.slice(0, -1)}á` }],
      [{ p: `${plurBase.p}و`, f: `${plurBase.f}ó` }],
    ];
  }
  // exception for مېلمه, کوربه
  return [[{ p: e.p, f: e.f }], [{ p: `${plurBase.p}و`, f: `${plurBase.f}ó` }]];
}

function vocPattern4Fem(e: T.DictionaryEntryNoFVars): T.PluralInflectionSet {
  const base = makePsString(e.infbp || "", e.infbf || "");
  return [
    [{ p: `${base.p}ې`, f: `${base.f}é` }],
    [{ p: `${base.p}و`, f: `${base.f}ó` }],
  ];
}

function vocPattern5Masc(e: T.DictionaryEntryNoFVars): T.PluralInflectionSet {
  const base = makePsString(e.infbp || "", e.infbf || "");
  return [
    [{ p: `${base.p}ه`, f: `${base.f}a` }],
    [{ p: `${base.p}و`, f: `${base.f}o` }],
  ];
}

function vocPattern5Fem(e: T.DictionaryEntryNoFVars): T.PluralInflectionSet {
  const base = makePsString(e.infbp || "", e.infbf || "");
  return [
    [{ p: `${base.p}ې`, f: `${base.f}e` }],
    [{ p: `${base.p}و`, f: `${base.f}o` }],
  ];
}
