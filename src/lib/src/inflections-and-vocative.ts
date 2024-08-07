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
  psStringFromEntry,
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
import { semigroupPsString } from "../src/fp-ps";

const concatPs = semigroupPsString.concat;

const o = { p: "و", f: "o" };
const ó = { p: "و", f: "ó" };
const a = { p: "ه", f: "a" };
const á = { p: "ه", f: "á" };
const e = { p: "ې", f: "e" };
const é = { p: "ې", f: "é" };

type Plurals =
  | {
      plural?: T.PluralInflections;
      arabicPlural?: T.PluralInflections;
    }
  | undefined;

// const endingInSingleARegex = /[^a]'?’?[aá]'?’?$/;
// const endingInHayOrAynRegex = /[^ا][هع]$/;

export function getInfsAndVocative(
  entryR: T.DictionaryEntryNoFVars | T.Determiner,
  plurals: Plurals
):
  | {
      inflections?: T.Inflections;
      vocative?: T.PluralInflections;
    }
  | false {
  if (!isInflectableEntry(entryR)) {
    return false;
  }
  // @ts-ignore
  const entry: T.InflectableEntry = entryR as T.InflectableEntry;
  const pattern = getInflectionPattern(entry);
  if (
    pattern === 0 &&
    isFemNounEntry(entry) &&
    isAnimNounEntry(entry) &&
    entry.ppp &&
    entry.ppf &&
    endsInConsonant(entry)
  ) {
    return {
      vocative: vocFemAnimException({
        entry,
        plurals: genderPlural("fem", plurals),
      }),
    };
  }
  const gender: T.Gender | "unisex" =
    isAdjOrUnisexNounEntry(entry) || isNumberEntry(entry)
      ? "unisex"
      : isMascNounEntry(entry)
      ? "masc"
      : "fem";
  if (pattern === 0) {
    return false;
  }
  if (pattern === 6) {
    return pattern6({ entry, plurals: genderPlural("fem", plurals) });
  }
  const funcs = patternFuncs[pattern];
  const masc =
    gender === "unisex" || gender === "masc"
      ? funcs.masc({ entry, plurals: genderPlural("masc", plurals) })
      : undefined;
  const fem =
    gender === "unisex" || gender === "fem"
      ? funcs.fem({ entry, plurals: genderPlural("fem", plurals) })
      : undefined;
  return aggregateInfsAndVoc(masc, fem);
}

type PatternInput = {
  entry: T.DictionaryEntryNoFVars | T.NounEntry | T.InflectableEntry;
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
    masc: pattern1Masc,
    fem: pattern1Fem,
  },
  2: {
    masc: pattern2Masc,
    fem: pattern2Fem,
  },
  3: {
    masc: pattern3Masc,
    fem: pattern3Fem,
  },
  4: {
    masc: pattern4Masc,
    fem: pattern4Fem,
  },
  5: {
    masc: pattern5Masc,
    fem: pattern5Fem,
  },
};

function addPlurals(
  x: T.ArrayOneOrMore<T.PsString>,
  plurals: T.PsString[]
): T.ArrayOneOrMore<T.PsString> {
  if (!plurals) {
    return x;
  }
  return removeDuplicates([...x, ...plurals]) as T.ArrayOneOrMore<T.PsString>;
}

function pattern6({ entry, plurals }: PatternInput): {
  inflections: T.Inflections;
  vocative: T.PluralInflections;
} {
  const base = removeAccents({
    p: entry.p.slice(0, -1),
    f: entry.f.slice(0, -2),
  });
  const inflections: T.InflectionSet = [
    [psStringFromEntry(entry)],
    [concatPs(base, { p: "ۍ", f: "úy" })],
    [concatPs(base, { p: "یو", f: "úyo" }), concatPs(base, ó)],
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
  entry,
  plurals,
}: PatternInput): T.PluralInflections {
  if (!entry.ppp || !entry.ppf) {
    throw new Error(
      "plural missing for feminine animate exception noun " + entry.p
    );
  }
  // TODO: HANDLE BETTER WITH PLURALS!
  const plurBase = mapPsString(
    (x) => x.slice(0, -1),
    makePsString(entry.ppp, entry.ppf)
  );
  const base =
    countSyllables(entry) === 1
      ? accentOnNFromEnd(entry, 0)
      : psStringFromEntry(entry);
  return {
    fem: [[concatPs(base, e)], addPlurals([concatPs(plurBase, o)], plurals)],
  };
}

function pattern1Masc({
  entry,
  plurals,
}: PatternInput): InflectionsAndVocative {
  const plain = psStringFromEntry(entry);
  if (isNounEntry(entry) && endsInTob(entry)) {
    const base = mapPsString((x) => x.slice(0, -3), entry);
    const inflections: T.InflectionSet = [
      [plain],
      [concatPs(base, { p: "تابه", f: "taabú" })],
      [concatPs(base, { p: "تبو", f: "tábo" })],
    ];
    return {
      inflections,
      vocative: [[concatPs(plain, a)], addPlurals(inflections[2], plurals)],
    };
  }
  const shwaEnding = hasShwaEnding(entry);
  const base = mapGen(
    (ps) => (countSyllables(entry) === 1 ? accentOnNFromEnd(ps, 0) : ps),
    mapPsString((x: string): string => (shwaEnding ? x.slice(0, -1) : x), entry)
  );
  if (shwaEnding && entry.f.endsWith("ú")) {
    const inflections: T.InflectionSet = [
      [plain],
      [plain],
      [concatPs(base, ó)],
    ];
    return {
      inflections,
      vocative: [[concatPs(base, á)], addPlurals(inflections[2], plurals)],
    };
  }
  // TODO: shouldn't this be accent-sensitive?
  const inflections: T.InflectionSet = [[plain], [plain], [concatPs(base, o)]];
  return {
    inflections,
    vocative: [
      [concatPs(base, { p: "ه", f: "a" })],
      addPlurals(inflections[2], plurals),
    ],
  };
}

// TODO this is HUGELY repetitive refactor this!
function pattern1Fem({ entry, plurals }: PatternInput): InflectionsAndVocative {
  const shwaEnding = hasShwaEnding(entry);
  const hasFemEnding = endsWith([{ p: "ه", f: "a" }], entry) || shwaEnding;
  const endAccented = accentIsOnEnd(entry);
  const base = mapGen(
    (ps) =>
      countSyllables(entry) === 1 && !endAccented
        ? accentOnNFromEnd(ps, 0)
        : ps,
    hasFemEnding
      ? mapPsString((x) => x.slice(0, -1), entry)
      : psStringFromEntry(entry)
  );
  if (
    endsWith(
      [
        { p: "ع", f: "a" },
        { p: "ع", f: "a'" },
      ],
      entry
    ) &&
    !["ا", "ی", "ې"].includes(e.p.at(-2) || "")
  ) {
    const base2 = applyPsString(
      {
        f: (f) => f.slice(0, f.endsWith("'") ? -2 : -1),
      },
      entry
    );
    if (endAccented) {
      const inflections: T.InflectionSet = [
        [psStringFromEntry(entry)],
        [concatPs(base2, é)],
        [concatPs(base2, ó)],
      ];
      return {
        inflections,
        vocative: [inflections[1], addPlurals(inflections[2], plurals)],
      };
    }
    const inflections: T.InflectionSet = [
      [psStringFromEntry(entry)],
      [concatPs(base2, e)],
      [concatPs(base2, o)],
    ];
    return {
      inflections,
      vocative: [inflections[1], addPlurals(inflections[2], plurals)],
    };
  }
  if (
    endsWith([{ p: "ح", f: "a" }], entry) &&
    !["ا", "ی", "ې"].includes(entry.p.at(-2) || "")
  ) {
    const base = applyPsString(
      {
        f: (f) => f.slice(0, -1),
      },
      entry
    );
    if (accentIsOnEnd(entry)) {
      const inflections: T.InflectionSet = [
        [psStringFromEntry(entry)],
        [concatPs(base, é)],
        [concatPs(base, ó)],
      ];
      return {
        inflections,
        vocative: [inflections[1], addPlurals(inflections[2], plurals)],
      };
    }
    const inflections: T.InflectionSet = [
      [psStringFromEntry(entry)],
      [concatPs(base, e)],
      [concatPs(base, o)],
    ];
    return {
      inflections,
      vocative: [inflections[1], addPlurals(inflections[2], plurals)],
    };
  }
  if (hasFemEnding && accentIsOnEnd(entry)) {
    const inflections: T.InflectionSet = [
      [concatPs(base, á)],
      [concatPs(base, é)],
      [concatPs(base, ó)],
    ];
    return {
      inflections,
      vocative: [inflections[1], addPlurals(inflections[2], plurals)],
    };
  }
  if (isFemNounEntry(entry) && endsInConsonant(entry)) {
    const baseForInf =
      countSyllables(entry) === 1 ? accentOnNFromEnd(entry, 0) : entry;
    const inflections: T.InflectionSet = [
      [psStringFromEntry(entry)],
      [concatPs(baseForInf, e)],
      [concatPs(baseForInf, o)],
    ];
    return {
      inflections,
      vocative: [inflections[1], addPlurals(inflections[2], plurals)],
    };
  }
  const inflections: T.InflectionSet = [
    [concatPs(base, a)],
    [concatPs(base, e)],
    [concatPs(base, o)],
  ];
  return {
    inflections,
    vocative: [inflections[1], addPlurals(inflections[2], plurals)],
  };
}

function pattern2Masc({
  entry,
  plurals,
}: PatternInput): InflectionsAndVocative {
  const base = makePsString(entry.p.slice(0, -1), entry.f.slice(0, -2));
  const inflections: T.InflectionSet = [
    [psStringFromEntry(entry)],
    [concatPs(base, { p: "ي", f: "ee" })],
    [concatPs(base, { p: "یو", f: "iyo" }), concatPs(base, { p: "و", f: "o" })],
  ];
  return {
    inflections,
    vocative: [
      [concatPs(base, { p: "یه", f: "iya" })],
      addPlurals(inflections[2], plurals),
    ],
  };
}

function pattern2Fem({ entry, plurals }: PatternInput): InflectionsAndVocative {
  const base = makePsString(
    entry.p.slice(0, -1),
    entry.f.slice(0, entry.f.endsWith("ay") ? -2 : -1)
  );
  const inflections: T.InflectionSet = [
    [concatPs(base, e)],
    [concatPs(base, e)],
    [concatPs(base, { p: "یو", f: "iyo" }), concatPs(base, o)],
  ];
  return {
    inflections,
    vocative: [inflections[1], addPlurals(inflections[2], plurals)],
  };
}

function pattern3Masc({
  entry,
  plurals,
}: PatternInput): InflectionsAndVocative {
  const base = makePsString(
    entry.p.slice(0, -1),
    // shouldn't be accents here but remove just to be sure
    removeAccents(entry.f.slice(0, -2))
  );
  const baseSyls = countSyllables(base);
  const inflections: T.InflectionSet = [
    [psStringFromEntry(entry)],
    [concatPs(base, { p: `ي`, f: baseSyls ? "ée" : "ee" })],
    [
      concatPs(base, { p: "یو", f: "úyo" }),
      concatPs(base, { p: "و", f: baseSyls ? "ó" : "o" }),
    ],
  ];
  return {
    inflections,
    vocative: [
      [concatPs(base, { p: "یه", f: "úya" })],
      addPlurals(inflections[2], plurals),
    ],
  };
}

function pattern3Fem({ entry, plurals }: PatternInput): InflectionsAndVocative {
  const base = makePsString(
    entry.p.slice(0, -1),
    // shouldn't be accents here but remove just to be sure
    removeAccents(entry.f.slice(0, -2))
  );
  const baseSyls = countSyllables(base);
  const plain: T.ArrayOneOrMore<T.PsString> = [
    concatPs(base, { p: "ۍ", f: "úy" }),
  ];
  const inflections: T.InflectionSet = [
    plain,
    plain,
    [concatPs(base, { p: "یو", f: "úyo" }), concatPs(base, baseSyls ? ó : o)],
  ];
  return {
    inflections,
    vocative: [plain, addPlurals(inflections[2], plurals)],
  };
}

function pattern4Masc({
  entry,
  plurals,
}: PatternInput): InflectionsAndVocative {
  const base = countSyllables(entry) === 1 ? accentOnNFromEnd(entry, 0) : entry;
  const firstInf = accentOnNFromEnd(
    makePsString(entry.infap || "", entry.infaf || ""),
    0
  );
  const secondBase = makePsString(entry.infbp || "", entry.infbf || "");
  const inflections: T.InflectionSet = [
    [psStringFromEntry(entry)],
    [firstInf],
    [concatPs(secondBase, ó)],
  ];
  if (endsInConsonant(entry)) {
    return {
      inflections,
      vocative: [[concatPs(base, a)], addPlurals(inflections[2], plurals)],
    };
  }
  // TODO: is this even possible?
  if (hasShwaEnding(entry)) {
    return {
      inflections,
      vocative: [
        [
          concatPs(
            mapPsString((x) => x.slice(0, -1), base),
            á
          ),
        ],
        addPlurals(inflections[2], plurals),
      ],
    };
  }
  // exception for مېلمه, کوربه
  return {
    inflections,
    vocative: [[psStringFromEntry(entry)], inflections[2]],
  };
}

function pattern4Fem({ entry }: PatternInput): InflectionsAndVocative {
  const base = makePsString(entry.infbp || "", entry.infbf || "");
  const inflections: T.InflectionSet = [
    [concatPs(base, á)],
    [concatPs(base, é)],
    [concatPs(base, ó)],
  ];
  return {
    inflections,
    vocative: [inflections[1], inflections[2]],
  };
}

function pattern5Masc({
  entry,
  plurals,
}: PatternInput): InflectionsAndVocative {
  const base = makePsString(entry.infbp || "", entry.infbf || "");
  const inflections: T.InflectionSet = [
    [psStringFromEntry(entry)],
    [concatPs(base, { p: "ه", f: "u" })],
    [concatPs(base, o)],
  ];
  return {
    inflections,
    vocative: [[concatPs(base, a)], addPlurals(inflections[2], plurals)],
  };
}

function pattern5Fem({ entry, plurals }: PatternInput): InflectionsAndVocative {
  const base = makePsString(entry.infbp || "", entry.infbf || "");
  const inflections: T.InflectionSet = [
    [concatPs(base, a)],
    [concatPs(base, e)],
    [concatPs(base, o)],
  ];
  return {
    inflections,
    vocative: [inflections[1], addPlurals(inflections[2], plurals)],
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
