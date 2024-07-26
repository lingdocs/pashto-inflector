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

const endingInSingleARegex = /[^a]'?’?[aá]'?’?$/;
const endingInHayOrAynRegex = /[^ا][هع]$/;

export function getInfsAndVocative(
  entry: T.DictionaryEntryNoFVars,
  plurals: Plurals
):
  | {
      inflections?: T.Inflections;
      vocative?: T.PluralInflections;
    }
  | false {
  if (!isInflectableEntry(entry)) {
    return false;
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
    return {
      vocative: vocFemAnimException({
        e,
        plurals: genderPlural("fem", plurals),
      }),
    };
  }
  const gender: T.Gender | "unisex" =
    isAdjOrUnisexNounEntry(e) || isNumberEntry(e)
      ? "unisex"
      : isMascNounEntry(e)
      ? "masc"
      : "fem";
  if (pattern === 0) {
    return false;
  }
  if (pattern === 6) {
    return pattern6({ e, plurals: genderPlural("fem", plurals) });
  }
  const funcs = patternFuncs[pattern];
  const masc =
    gender === "unisex" || gender === "masc"
      ? funcs.masc({ e, plurals: genderPlural("masc", plurals) })
      : undefined;
  const fem =
    gender === "unisex" || gender === "fem"
      ? funcs.fem({ e, plurals: genderPlural("fem", plurals) })
      : undefined;
  return aggregateInfsAndVoc(masc, fem);
}

type PatternInput = {
  e: T.DictionaryEntryNoFVars | T.NounEntry | T.InflectableEntry;
  plurals: T.PsString[];
};

type InflectionsAndVocative = {
  inflections: T.InflectionSet;
  vocative: T.PluralInflectionSet;
};

const patternFuncs: Record<
  1 | 2 | 3 | 4 | 5,
  Record<T.Gender, (inp: PatternInput) => InflectionsAndVocative>
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

function pattern6({ e, plurals }: PatternInput): {
  inflections: T.Inflections;
  vocative: T.PluralInflections;
} {
  const base = removeAccents({ p: e.p.slice(0, -1), f: e.f.slice(0, -2) });
  const inflections: T.InflectionSet = [
    [{ p: e.p, f: e.f }],
    [{ p: `${base.p}ۍ`, f: `${base.f}úy` }],
    [
      { p: `${base.p}یو`, f: `${base.f}úyo` },
      { p: `${base.p}و`, f: `${base.f}ó` },
    ],
  ];
  return {
    inflections: {
      fem: inflections,
    },
    vocative: {
      fem: [inflections[0], addPlurals(inflections[2], plurals)],
    },
  };
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

function vocPattern1Masc({ e, plurals }: PatternInput): InflectionsAndVocative {
  if (isNounEntry(e) && endsInTob(e)) {
    const base = mapPsString((x) => x.slice(0, -3), e);
    const second: T.ArrayOneOrMore<T.PsString> = [
      { p: `${base.p}تبو`, f: `${base.f}tábo` },
    ];
    return {
      inflections: [
        [{ p: e.p, f: e.f }],
        [{ p: `${base.p}تابه`, f: `${base.f}taabú` }],
        second,
      ],
      vocative: [[{ p: `${e.p}ه`, f: `${e.f}a` }], addPlurals(second, plurals)],
    };
  }
  const shwaEnding = hasShwaEnding(e);
  const base = mapGen(
    (ps) => (countSyllables(e) === 1 ? accentOnNFromEnd(ps, 0) : ps),
    mapPsString((x: string): string => (shwaEnding ? x.slice(0, -1) : x), e)
  );
  if (shwaEnding && e.f.endsWith("ú")) {
    const second: T.ArrayOneOrMore<T.PsString> = [
      { p: `${base.p}و`, f: `${base.f}ó` },
    ];
    return {
      inflections: [[{ p: e.p, f: e.f }], [{ p: e.p, f: e.f }], second],
      vocative: [
        [{ p: `${base.p}ه`, f: `${base.f}á` }],
        addPlurals(second, plurals),
      ],
    };
  }
  // TODO: shouldn't this be accent-sensitive?
  const second: T.ArrayOneOrMore<T.PsString> = [
    { p: `${base.p}و`, f: `${base.f}o` },
  ];
  return {
    inflections: [[{ p: e.p, f: e.f }], [{ p: e.p, f: e.f }], second],
    vocative: [
      [{ p: `${base.p}ه`, f: `${base.f}a` }],
      addPlurals(second, plurals),
    ],
  };
}

// TODO this is HUGELY repetitive refactor this!
function vocPattern1Fem({ e, plurals }: PatternInput): InflectionsAndVocative {
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
    ) &&
    !["ا", "ی", "ې"].includes(e.p.at(-2) || "")
  ) {
    const base = applyPsString(
      {
        f: (f) => f.slice(0, f.endsWith("'") ? -2 : -1),
      },
      e
    );
    if (accentIsOnEnd(e)) {
      const second: T.ArrayOneOrMore<T.PsString> = [
        { p: `${base.p}و`, f: `${base.f}ó` },
      ];
      const inflections: T.InflectionSet = [
        [{ p: e.p, f: e.f }],
        [{ p: `${base.p}ې`, f: `${base.f}é` }],
        second,
      ];
      return {
        inflections,
        vocative: [inflections[1], addPlurals(second, plurals)],
      };
    }
    const second: T.ArrayOneOrMore<T.PsString> = [
      { p: `${base.p}و`, f: `${base.f}o` },
    ];
    const inflections: T.InflectionSet = [
      [{ p: e.p, f: e.f }],
      [{ p: `${base.p}ې`, f: `${base.f}e` }],
      second,
    ];
    return {
      inflections,
      vocative: [inflections[1], addPlurals(second, plurals)],
    };
  }
  if (
    endsWith([{ p: "ح", f: "a" }], e) &&
    !["ا", "ی", "ې"].includes(e.p.at(-2) || "")
  ) {
    const base = applyPsString(
      {
        f: (f) => f.slice(0, -1),
      },
      e
    );
    if (accentIsOnEnd(e)) {
      const second: T.ArrayOneOrMore<T.PsString> = [
        { p: `${base.p}و`, f: `${base.f}ó` },
      ];
      const inflections: T.InflectionSet = [
        [{ p: e.p, f: e.f }],
        [{ p: `${base.p}ې`, f: `${base.f}é` }],
        second,
      ];
      return {
        inflections,
        vocative: [inflections[1], addPlurals(second, plurals)],
      };
    }
    const second: T.ArrayOneOrMore<T.PsString> = [
      { p: `${base.p}و`, f: `${base.f}o` },
    ];
    const inflections: T.InflectionSet = [
      [{ p: e.p, f: e.f }],
      [{ p: `${base.p}ې`, f: `${base.f}e` }],
      second,
    ];
    return {
      inflections,
      vocative: [inflections[1], addPlurals(second, plurals)],
    };
  }
  if (hasFemEnding && accentIsOnEnd(e)) {
    const second: T.ArrayOneOrMore<T.PsString> = [
      { p: `${base.p}و`, f: `${base.f}ó` },
    ];
    const inflections: T.InflectionSet = [
      [{ p: `${base.p}ه`, f: `${base.f}á` }],
      [{ p: `${base.p}ې`, f: `${base.f}é` }],
      second,
    ];
    return {
      inflections,
      vocative: [inflections[1], addPlurals(second, plurals)],
    };
  }
  if (isFemNounEntry(e) && endsInConsonant(e)) {
    const baseForInf = countSyllables(e) === 1 ? accentOnNFromEnd(e, 0) : e;
    const second: T.ArrayOneOrMore<T.PsString> = [
      { p: `${baseForInf.p}و`, f: `${baseForInf.f}o` },
    ];
    const inflections: T.InflectionSet = [
      [{ p: e.p, f: e.f }],
      [{ p: `${baseForInf.p}ې`, f: `${baseForInf.f}e` }],
      second,
    ];
    return {
      inflections,
      vocative: [inflections[1], addPlurals(second, plurals)],
    };
  }
  const second: T.ArrayOneOrMore<T.PsString> = [
    { p: `${base.p}و`, f: `${base.f}o` },
  ];
  const inflections: T.InflectionSet = [
    [{ p: `${base.p}ه`, f: `${base.f}a` }],
    [{ p: `${base.p}ې`, f: `${base.f}e` }],
    second,
  ];
  return {
    inflections,
    vocative: [inflections[1], addPlurals(second, plurals)],
  };
}

function vocPattern2Masc({ e, plurals }: PatternInput): InflectionsAndVocative {
  const base = makePsString(e.p.slice(0, -1), e.f.slice(0, -2));
  const second: T.ArrayOneOrMore<T.PsString> = [
    { p: `${base.p}یو`, f: `${base.f}iyo` },
    { p: `${base.p}و`, f: `${base.f}o` },
  ];
  return {
    inflections: [
      [{ p: e.p, f: e.f }],
      [{ p: `${base.p}ي`, f: `${base.f}ee` }],
      second,
    ],
    vocative: [
      [{ p: `${base.p}یه`, f: `${base.f}iya` }],
      addPlurals(second, plurals),
    ],
  };
}

function vocPattern2Fem({ e, plurals }: PatternInput): InflectionsAndVocative {
  const base = makePsString(
    e.p.slice(0, -1),
    e.f.slice(0, e.f.endsWith("ay") ? -2 : -1)
  );
  const second: T.ArrayOneOrMore<T.PsString> = [
    { p: `${base.p}یو`, f: `${base.f}iyo` },
    { p: `${base.p}و`, f: `${base.f}o` },
  ];
  const inflections: T.InflectionSet = [
    [{ p: `${base.p}ې`, f: `${base.f}e` }],
    [{ p: `${base.p}ې`, f: `${base.f}e` }],
    second,
  ];
  return {
    inflections,
    vocative: [inflections[0], addPlurals(second, plurals)],
  };
}

function vocPattern3Masc({ e, plurals }: PatternInput): InflectionsAndVocative {
  const base = makePsString(
    e.p.slice(0, -1),
    // shouldn't be accents here but remove just to be sure
    removeAccents(e.f.slice(0, -2))
  );
  const baseSyls = countSyllables(base);
  const second: T.ArrayOneOrMore<T.PsString> = [
    { p: `${base.p}یو`, f: `${base.f}úyo` },
    { p: `${base.p}و`, f: `${base.f}${baseSyls ? "ó" : "o"}` },
  ];
  return {
    inflections: [
      [{ p: e.p, f: e.f }],
      [{ p: `${base.p}ي`, f: `${base.f}${baseSyls ? "ée" : "ee"}` }],
      second,
    ],
    vocative: [
      [{ p: `${base.p}یه`, f: `${base.f}úya` }],
      addPlurals(second, plurals),
    ],
  };
}

function vocPattern3Fem({ e, plurals }: PatternInput): InflectionsAndVocative {
  const base = makePsString(
    e.p.slice(0, -1),
    // shouldn't be accents here but remove just to be sure
    removeAccents(e.f.slice(0, -2))
  );
  const second: T.ArrayOneOrMore<T.PsString> = [
    { p: `${base.p}یو`, f: `${base.f}úyo` },
    { p: `${base.p}و`, f: `${base.f}ó` },
  ];
  const plain: T.ArrayOneOrMore<T.PsString> = [
    { p: `${base.p}ۍ`, f: `${base.f}úy` },
  ];
  return {
    inflections: [plain, plain, second],
    vocative: [plain, addPlurals(second, plurals)],
  };
}

function vocPattern4Masc({ e, plurals }: PatternInput): InflectionsAndVocative {
  const base = countSyllables(e) === 1 ? accentOnNFromEnd(e, 0) : e;
  const firstInf = accentOnNFromEnd(
    makePsString(e.infap || "", e.infaf || ""),
    0
  );
  const secondBase = makePsString(e.infbp || "", e.infbf || "");
  const second: T.ArrayOneOrMore<T.PsString> = [
    { p: `${secondBase.p}و`, f: `${secondBase.f}ó` },
  ];
  const inflections: T.InflectionSet = [
    [{ p: e.p, f: e.f }],
    [firstInf],
    second,
  ];
  if (endsInConsonant(e)) {
    return {
      inflections,
      vocative: [
        [{ p: `${base.p}ه`, f: `${base.f}a` }],
        addPlurals(second, plurals),
      ],
    };
  }
  // TODO: is this even possible?
  if (hasShwaEnding(e)) {
    return {
      inflections,
      vocative: [
        [{ p: `${base.p.slice(0, -1)}ه`, f: `${base.f.slice(0, -1)}á` }],
        addPlurals(second, plurals),
      ],
    };
  }
  // exception for مېلمه, کوربه
  return {
    inflections,
    vocative: [[{ p: e.p, f: e.f }], second],
  };
}

function vocPattern4Fem({ e, plurals }: PatternInput): InflectionsAndVocative {
  const base = makePsString(e.infbp || "", e.infbf || "");
  const second = addPlurals([{ p: `${base.p}و`, f: `${base.f}ó` }], plurals);
  const inflections: T.InflectionSet = [
    [{ p: `${base.p}ه`, f: `${base.f}á` }],
    [{ p: `${base.p}ې`, f: `${base.f}é` }],
    second,
  ];
  return {
    inflections,
    vocative: [inflections[1], second],
  };
}

function vocPattern5Masc({ e, plurals }: PatternInput): InflectionsAndVocative {
  const base = makePsString(e.infbp || "", e.infbf || "");
  const second: T.ArrayOneOrMore<T.PsString> = [
    { p: `${base.p}و`, f: `${base.f}o` },
  ];
  return {
    inflections: [
      [{ p: e.p, f: e.f }],
      [{ p: `${base.p}ه`, f: `${base.f}u` }],
      second,
    ],
    vocative: [
      [{ p: `${base.p}ه`, f: `${base.f}a` }],
      addPlurals(second, plurals),
    ],
  };
}

function vocPattern5Fem({ e, plurals }: PatternInput): InflectionsAndVocative {
  const base = makePsString(e.infbp || "", e.infbf || "");
  const second: T.ArrayOneOrMore<T.PsString> = [
    { p: `${base.p}و`, f: `${base.f}o` },
  ];
  const inflections: T.InflectionSet = [
    [{ p: `${base.p}ه`, f: `${base.f}a` }],
    [{ p: `${base.p}ې`, f: `${base.f}e` }],
    second,
  ];
  return {
    inflections,
    vocative: [inflections[1], addPlurals(second, plurals)],
  };
}

function aggregateInfsAndVoc(
  masc: InflectionsAndVocative | undefined,
  fem: InflectionsAndVocative | undefined
): {
  inflections?: T.Inflections;
  vocative?: T.PluralInflections;
} {
  if (masc && fem) {
    return {
      inflections: {
        masc: masc.inflections,
        fem: fem.inflections,
      },
      vocative: {
        masc: masc.vocative,
        fem: fem.vocative,
      },
    };
  }
  if (masc) {
    return {
      inflections: {
        masc: masc.inflections,
      },
      vocative: {
        masc: masc.vocative,
      },
    };
  }
  if (fem) {
    return {
      inflections: {
        fem: fem.inflections,
      },
      vocative: {
        fem: fem.vocative,
      },
    };
  }
  return { inflections: undefined, vocative: undefined };
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
