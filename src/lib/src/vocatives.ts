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
import { removeDuplicates } from "./phrase-building/vp-tools";
import {
  isAdjOrUnisexNounEntry,
  isAnimNounEntry,
  isFemNounEntry,
  isInflectableEntry,
  isMascNounEntry,
  isNounEntry,
  isNumberEntry,
} from "./type-predicates";

type Plurals =
  | {
      plural?: T.PluralInflections;
      arabicPlural?: T.PluralInflections;
    }
  | undefined;

export function getVocatives(
  entry: T.DictionaryEntryNoFVars,
  plurals: Plurals
): T.PluralInflections | undefined {
  if (!isInflectableEntry(entry)) {
    return undefined;
  }
  // @ts-ignore
  const e: T.InflectableEntry = entry as T.InflectableEntry;
  const pattern = getInflectionPattern(e);
  if (
    pattern === 0 &&
    isFemNounEntry(e) &&
    isAnimNounEntry(e) &&
    endsInConsonant(e)
  ) {
    return vocFemAnimException({ e, plurals: genderPlural("fem", plurals) });
  }
  const gender: T.Gender | "unisex" =
    isAdjOrUnisexNounEntry(e) || isNumberEntry(e)
      ? "unisex"
      : isMascNounEntry(e)
      ? "masc"
      : "fem";
  if (pattern === 0 || pattern === 6) {
    return undefined;
  }
  const funcs = patternFuncs[pattern];
  if (gender === "masc") {
    return {
      masc: funcs.masc({ e, plurals: genderPlural("masc", plurals) }),
    };
  }
  if (gender === "fem") {
    return {
      fem: funcs.fem({ e, plurals: genderPlural("fem", plurals) }),
    };
  }
  if (gender === "unisex") {
    return {
      masc: funcs.masc({ e, plurals: genderPlural("masc", plurals) }),
      fem: funcs.fem({ e, plurals: genderPlural("fem", plurals) }),
    };
  }
}

type PatternInput = {
  e: T.DictionaryEntryNoFVars | T.NounEntry | T.InflectableEntry;
  plurals: T.PsString[];
};

const patternFuncs: Record<
  1 | 2 | 3 | 4 | 5,
  Record<T.Gender, (inp: PatternInput) => T.PluralInflectionSet>
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

function addPlurals(
  e: T.ArrayOneOrMore<T.PsString>,
  plurals: T.PsString[]
): T.ArrayOneOrMore<T.PsString> {
  if (!plurals) {
    return e;
  }
  return removeDuplicates([...e, ...plurals]) as T.ArrayOneOrMore<T.PsString>;
}

function vocFemAnimException({
  e,
  plurals,
}: PatternInput): T.PluralInflections {
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
      addPlurals([{ p: `${plurBase.p}و`, f: `${plurBase.f}o` }], plurals),
    ],
  };
}

function vocPattern1Masc({ e, plurals }: PatternInput): T.PluralInflectionSet {
  if (isNounEntry(e) && endsInTob(e)) {
    const base = mapPsString((x) => x.slice(0, -3), e);
    return [
      [{ p: `${e.p}ه`, f: `${e.f}a` }],
      addPlurals([{ p: `${base.p}تبو`, f: `${base.f}tábo` }], plurals),
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
      addPlurals([{ p: `${base.p}و`, f: `${base.f}ó` }], plurals),
    ];
  }
  return [
    [{ p: `${base.p}ه`, f: `${base.f}a` }],
    addPlurals([{ p: `${base.p}و`, f: `${base.f}o` }], plurals),
  ];
}

function vocPattern1Fem({ e, plurals }: PatternInput): T.PluralInflectionSet {
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
        addPlurals([{ p: `${base.p}و`, f: `${base.f}ó` }], plurals),
      ];
    }
    return [
      [{ p: `${base.p}ې`, f: `${base.f}e` }],
      addPlurals([{ p: `${base.p}و`, f: `${base.f}o` }], plurals),
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
        addPlurals([{ p: `${base.p}و`, f: `${base.f}ó` }], plurals),
      ];
    }
    return [
      [{ p: `${base.p}ې`, f: `${base.f}e` }],
      addPlurals([{ p: `${base.p}و`, f: `${base.f}o` }], plurals),
    ];
  }
  if (hasFemEnding && accentIsOnEnd(e)) {
    return [
      [{ p: `${base.p}ې`, f: `${base.f}é` }],
      addPlurals([{ p: `${base.p}و`, f: `${base.f}ó` }], plurals),
    ];
  }
  return [
    [{ p: `${base.p}ې`, f: `${base.f}e` }],
    addPlurals([{ p: `${base.p}و`, f: `${base.f}o` }], plurals),
  ];
}

function vocPattern2Masc({ e, plurals }: PatternInput): T.PluralInflectionSet {
  const base = makePsString(e.p.slice(0, -1), e.f.slice(0, -2));
  return [
    [{ p: `${base.p}یه`, f: `${base.f}iya` }],
    addPlurals(
      [
        { p: `${base.p}یو`, f: `${base.f}iyo` },
        { p: `${base.p}و`, f: `${base.f}o` },
      ],
      plurals
    ),
  ];
}

function vocPattern2Fem({ e, plurals }: PatternInput): T.PluralInflectionSet {
  const base = makePsString(
    e.p.slice(0, -1),
    e.f.slice(0, e.f.endsWith("ay") ? -2 : -1)
  );
  return [
    [{ p: `${base.p}ې`, f: `${base.f}e` }],
    addPlurals(
      [
        { p: `${base.p}یو`, f: `${base.f}iyo` },
        { p: `${base.p}و`, f: `${base.f}o` },
      ],
      plurals
    ),
  ];
}

function vocPattern3Masc({ e, plurals }: PatternInput): T.PluralInflectionSet {
  const base = makePsString(
    e.p.slice(0, -1),
    // shouldn't be accents here but remove just to be sure
    removeAccents(e.f.slice(0, -2))
  );
  const baseSyls = countSyllables(base);
  return [
    [{ p: `${base.p}یه`, f: `${base.f}úya` }],
    addPlurals(
      [
        { p: `${base.p}یو`, f: `${base.f}úyo` },
        { p: `${base.p}و`, f: `${base.f}${baseSyls ? "ó" : "o"}` },
      ],
      plurals
    ),
  ];
}

function vocPattern3Fem({ e, plurals }: PatternInput): T.PluralInflectionSet {
  const base = makePsString(
    e.p.slice(0, -1),
    // shouldn't be accents here but remove just to be sure
    removeAccents(e.f.slice(0, -2))
  );
  // TODO: This works well for unisex nouns/adjs but would be redundant for fem. nouns?
  return [
    [{ p: `${base.p}ۍ`, f: `${base.f}úy` }],
    addPlurals(
      [
        { p: `${base.p}یو`, f: `${base.f}úyo` },
        { p: `${base.p}و`, f: `${base.f}ó` },
      ],
      plurals
    ),
  ];
}

function vocPattern4Masc({ e, plurals }: PatternInput): T.PluralInflectionSet {
  const base = countSyllables(e) === 1 ? accentOnNFromEnd(e, 0) : e;
  const plurBase = makePsString(e.infbp || "", e.infbf || "");
  if (endsInConsonant(e)) {
    return [
      [{ p: `${base.p}ه`, f: `${base.f}a` }],
      addPlurals([{ p: `${plurBase.p}و`, f: `${plurBase.f}ó` }], plurals),
    ];
  }
  // TODO: is this even possible?
  if (hasShwaEnding(e)) {
    return [
      [{ p: `${base.p.slice(0, -1)}ه`, f: `${base.f.slice(0, -1)}á` }],
      addPlurals([{ p: `${plurBase.p}و`, f: `${plurBase.f}ó` }], plurals),
    ];
  }
  // exception for مېلمه, کوربه
  return [[{ p: e.p, f: e.f }], [{ p: `${plurBase.p}و`, f: `${plurBase.f}ó` }]];
}

function vocPattern4Fem({ e, plurals }: PatternInput): T.PluralInflectionSet {
  const base = makePsString(e.infbp || "", e.infbf || "");
  return [
    [{ p: `${base.p}ې`, f: `${base.f}é` }],
    addPlurals([{ p: `${base.p}و`, f: `${base.f}ó` }], plurals),
  ];
}

function vocPattern5Masc({ e, plurals }: PatternInput): T.PluralInflectionSet {
  const base = makePsString(e.infbp || "", e.infbf || "");
  return [
    [{ p: `${base.p}ه`, f: `${base.f}a` }],
    addPlurals([{ p: `${base.p}و`, f: `${base.f}o` }], plurals),
  ];
}

function vocPattern5Fem({ e, plurals }: PatternInput): T.PluralInflectionSet {
  const base = makePsString(e.infbp || "", e.infbf || "");
  return [
    [{ p: `${base.p}ې`, f: `${base.f}e` }],
    addPlurals([{ p: `${base.p}و`, f: `${base.f}o` }], plurals),
  ];
}

function genderPlural(gender: T.Gender, plurals: Plurals): T.PsString[] {
  if (!plurals) return [];
  if (gender === "masc") {
    return [
      ...(plurals.plural && "masc" in plurals.plural
        ? plurals.plural.masc[1]
        : []),
      ...(plurals.arabicPlural && "masc" in plurals.arabicPlural
        ? plurals.arabicPlural.masc[1]
        : []),
    ];
  } else {
    return [
      ...(plurals.plural && "fem" in plurals.plural
        ? plurals.plural.fem[1]
        : []),
      ...(plurals.arabicPlural && "fem" in plurals.arabicPlural
        ? plurals.arabicPlural.fem[1]
        : []),
    ];
  }
}
