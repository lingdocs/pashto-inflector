/**
 * Copyright (c) 2023 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { concatPsString, trimOffPs } from "../p-text-helpers";
import * as T from "../../../types";
import { makePsString, removeFVarientsFromVerb } from "../accent-and-ps-utils";
import {
  accentOnFront,
  accentOnNFromEnd,
  countSyllables,
  removeAccents,
} from "../accent-helpers";
import { isKawulVerb } from "../type-predicates";
import {
  vEntry,
  addAbilityEnding,
  weld,
  removeL,
  addTrailingAccent,
  tlulPerfectiveStem,
  getLongVB,
  possiblePPartLengths,
  isStatComp,
  statCompImperfectiveSpace,
  makeComplement,
  vTransitivity,
  isKedul,
} from "./rs-helpers";
import { inflectPattern3 } from "./new-inflectors";
import { fmapSingleOrLengthOpts } from "../fp-ps";
import { isGivingVerb } from "../misc-helpers";

export const statVerb = {
  intransitive: vEntry({
    ts: 1581086654898,
    i: 11100,
    p: "کېدل",
    f: "kedul",
    g: "kedul",
    e: "to become _____",
    r: 2,
    c: "v. intrans.",
    ssp: "ش",
    ssf: "sh",
    prp: "شول",
    prf: "shwul",
    pprtp: "شوی",
    pprtf: "shúway",
    noOo: true,
    ec: "become",
  }),
  transitive: vEntry({
    ts: 1579015359582,
    i: 11030,
    p: "کول",
    f: "kawul",
    g: "kawul",
    e: 'to make ____ ____ (as in "He\'s making me angry.")',
    r: 4,
    c: "v. trans.",
    ssp: "کړ",
    ssf: "kR",
    prp: "کړل",
    prf: "kRul",
    pprtp: "کړی",
    pprtf: "kúRay",
    noOo: true,
    ec: "make,makes,making,made,made",
  }),
};

const shwulVB: T.VBBasic = {
  type: "VB",
  ps: {
    long: [{ p: "شول", f: "shwul" }],
    short: [{ p: "شو", f: "shw" }],
  },
};
const shVB: T.VBBasic = {
  type: "VB",
  ps: [{ p: "ش", f: "sh" }],
};

// TODO: figure out how to handle dynamic / stative verbs
export function getRootStem({
  verb,
  rs,
  aspect,
  type,
  genderNumber,
  voice,
}: {
  verb: T.VerbEntry;
  rs: "root" | "stem";
  aspect: T.Aspect;
  voice: T.Voice;
  type: "basic" | "ability";
  genderNumber: {
    gender: T.Gender;
    number: T.NounNumber;
  };
}): T.RootsStemsOutput {
  const v = removeFVarientsFromVerb(verb);
  if (type === "ability") {
    return getAbilityRs(v, aspect, rs, voice, genderNumber);
  }
  if (voice === "passive") {
    return getPassiveRs(v, aspect, rs, genderNumber);
  }
  return rs === "stem"
    ? getStem(v, genderNumber, aspect)
    : getRoot(v, genderNumber, aspect);
}

function getAbilityRs(
  verb: T.VerbEntryNoFVars,
  aspect: T.Aspect,
  rs: "root" | "stem",
  voice: T.Voice,
  genderNum: T.GenderNumber
): [[] | [T.VHead], [T.VBP, T.VB]] {
  // https://grammar.lingdocs.com/verbs/ability/#exceptions
  const losesAspect =
    (verb.entry.prp && verb.entry.p !== "کول") ||
    (isStatComp(verb) && vTransitivity(verb) === "intransitive");
  const asp = losesAspect ? "imperfective" : aspect;
  const [vhead, [basicroot]] =
    voice === "passive"
      ? getPassiveRs(verb, "imperfective", "root", genderNum)
      : getRoot(verb, genderNum, asp);
  return [
    vhead,
    [addAbilityEnding(basicroot, verb, asp), rs === "root" ? shwulVB : shVB],
  ];
}

export function getPastParticiple(
  verb: T.VerbEntry,
  voice: T.Voice,
  { gender, number }: { gender: T.Gender; number: T.NounNumber }
): T.VBP {
  const v = removeFVarientsFromVerb(verb);
  if (voice === "passive") {
    return getPassivePp(v, { gender, number });
  }
  if (isStatComp(v) && v.complement) {
    return {
      ...weld(
        makeComplement(v.complement, { gender, number }),
        getPastParticiple(statVerb[vTransitivity(verb)], voice, {
          gender,
          number,
        })
      ),
      info: {
        type: "ppart",
        genNum: { gender, number },
        verb,
      },
    };
  }
  if (verb.entry.pprtp && verb.entry.pprtf) {
    const base = makePsString(verb.entry.pprtp, verb.entry.pprtf);
    return {
      type: "VB",
      ps: inflectPattern3(base, { gender, number }),
      info: {
        type: "ppart",
        verb,
        genNum: {
          gender,
          number,
        },
      },
    };
  }
  const basicRoot = getRoot(
    removeFVarientsFromVerb(verb),
    { gender, number },
    "imperfective"
  )[1][0];
  const longRoot = getLongVB(basicRoot) as T.VBNoLenghts<T.VB>;
  const rootWLengths = possiblePPartLengths(longRoot);
  /* istanbul ignore next */
  if ("right" in rootWLengths) {
    throw new Error("should not have welded here");
  }
  return {
    ...rootWLengths,
    ps: addTail(rootWLengths.ps),
    info: {
      type: "ppart",
      verb,
      genNum: {
        gender,
        number,
      },
    },
  };

  function addTail(
    ps: T.SingleOrLengthOpts<T.PsString[]>
  ): T.SingleOrLengthOpts<T.PsString[]> {
    return fmapSingleOrLengthOpts((x) => {
      const withTail = concatPsString(x[0], { p: "ی", f: "ay" });
      return inflectPattern3(withTail, { gender, number });
    }, ps);
  }
}

function getPassivePp(
  verb: T.VerbEntryNoFVars,
  genderNumber: T.GenderNumber
): T.VBP {
  if (isStatComp(verb) && verb.complement) {
    return {
      ...weld(
        makeComplement(verb.complement, genderNumber),
        getPassivePp(statVerb.transitive, genderNumber)
      ),
      info: {
        type: "ppart",
        verb,
        genNum: genderNumber,
      },
    };
  }
  const basicRoot = getRoot(
    verb,
    genderNumber,
    isKawulVerb(verb) ? "perfective" : "imperfective"
  )[1][0];
  const longRoot = getLongVB(basicRoot);
  const kedulVb = getPastParticiple(
    statVerb.intransitive,
    "active",
    genderNumber
  );
  return {
    ...weld(longRoot, kedulVb),
    info: {
      type: "ppart",
      verb,
      genNum: genderNumber,
    },
  };
}

// TODO: Abstract out the get T.Vhead part

function getRoot(
  verb: T.VerbEntryNoFVars,
  genderNum: T.GenderNumber,
  aspect: T.Aspect
): [[T.VHead] | [], [T.VB]] {
  if (
    verb.complement &&
    isStatComp(verb) &&
    (aspect === "perfective" || statCompImperfectiveSpace(verb))
  ) {
    const auxStem = getRoot(
      statVerb[vTransitivity(verb)],
      genderNum,
      aspect
    )[1][0] as T.VBBasic;
    const complement = makeComplement(verb.complement, genderNum);
    return aspect === "perfective"
      ? [[complement], [auxStem]]
      : [[], [weld(complement, auxStem)]];
  }
  if (isGivingVerb(verb) && aspect === "perfective") {
    const auxStem = getRoot(
      statVerb.transitive,
      genderNum,
      "perfective"
    )[1][0] as T.VBBasic;
    const ph: T.PH = {
      type: "PH",
      ps: accentOnFront({
        p: verb.entry.p.slice(0, 2),
        f: verb.entry.f.slice(0, 3),
      }),
    };
    return [[ph], [auxStem]];
  }
  const base =
    aspect === "imperfective"
      ? accentOnNFromEnd(makePsString(verb.entry.p, verb.entry.f), 0)
      : removeAccents(
          verb.entry.prp && verb.entry.prf
            ? makePsString(verb.entry.prp, verb.entry.prf)
            : makePsString(verb.entry.p, verb.entry.f)
        );
  const [perfectiveHead, rest] =
    aspect === "perfective" ? getPerfectiveHead(base, verb) : [undefined, base];
  if (verb.entry.f === "tlul" && aspect === "perfective") {
    return [
      [{ type: "PH", ps: { p: "لا", f: "láa" } }],
      [
        {
          type: "VB",
          ps: {
            long: [{ p: "ړل", f: "Rul" }],
            short: [{ p: "ړ", f: "R" }],
          },
        },
      ],
    ];
  }
  return [
    perfectiveHead ? [perfectiveHead] : [],
    [
      {
        type: "VB",
        ps:
          aspect === "imperfective"
            ? {
                long: [rest],
                short: [addTrailingAccent(removeL(rest))],
              }
            : {
                long: [rest],
                short: [removeL(rest)],
                ...(aspect === "perfective" && isKawulVerb(verb)
                  ? {
                      mini: [{ p: "ک", f: "k" }],
                    }
                  : {}),
              },
      },
    ],
  ];
}

function getStem(
  verb: T.VerbEntryNoFVars,
  genderNum: T.GenderNumber,
  aspect: T.Aspect
): [[T.VHead] | [], [T.VB]] {
  const statComp = isStatComp(verb);
  if (
    verb.complement &&
    statComp &&
    (aspect === "perfective" || statCompImperfectiveSpace(verb))
  ) {
    const auxStem = getStem(
      statVerb[vTransitivity(verb)],
      genderNum,
      aspect
    )[1][0] as T.VBBasic;
    const complement = makeComplement(verb.complement, genderNum);
    return aspect === "perfective"
      ? [[complement], [auxStem]]
      : [[], [weld(complement, auxStem)]];
  }
  if (isGivingVerb(verb) && aspect === "perfective") {
    const auxStem = getStem(
      statVerb.transitive,
      genderNum,
      "perfective"
    )[1][0] as T.VBBasic;
    const ph: T.PH = {
      type: "PH",
      ps: accentOnFront({
        p: verb.entry.p.slice(0, 2),
        f: verb.entry.f.slice(0, 3),
      }),
    };
    return [[ph], [auxStem]];
  }
  if (aspect === "perfective") {
    if (verb.entry.f === "tlul") {
      return tlulPerfectiveStem(genderNum);
    }
    if (
      !isKedul(verb) &&
      vTransitivity(verb) === "intransitive" &&
      verb.entry.p.endsWith("ېدل")
    ) {
      return splitEdulIntans(edulIntransBase(verb));
    }
    const base: T.PsString =
      verb.entry.ssp && verb.entry.ssf
        ? // with irregular perfective stem
          makePsString(verb.entry.ssp, verb.entry.ssf)
        : verb.entry.psp && verb.entry.psf
        ? // with perfective stem based on irregular perfective root
          makePsString(verb.entry.psp, verb.entry.psf)
        : // with regular infinitive based perfective stem
          removeL(makePsString(verb.entry.p, verb.entry.f));
    const [perfectiveHead, rest] = getPerfectiveHead(base, verb);
    return [
      perfectiveHead ? [perfectiveHead] : [],
      [
        {
          type: "VB",
          ps: isKawulVerb(verb) ? kawulSpecialPerfective : [rest],
        },
      ],
    ];
  }
  const rawBase = removeL(makePsString(verb.entry.p, verb.entry.f));
  const base =
    verb.entry.psp && verb.entry.psf
      ? [makePsString(verb.entry.psp, verb.entry.psf)]
      : vTransitivity(verb) === "intransitive" && rawBase.p.endsWith("ېد")
      ? edulIntransBase(verb)
      : isKawulVerb(verb) ||
        statComp ||
        (countSyllables(rawBase) > 1 && rawBase.f.endsWith("aw"))
      ? [addTrailingAccent(rawBase)]
      : [rawBase];
  return [
    [],
    [
      {
        type: "VB",
        ps: base,
      },
    ],
  ];
  function splitEdulIntans(
    ps: T.SingleOrLengthOpts<T.PsString[]>
  ): [[T.PH] | [], [T.VB]] {
    const [ph, long] =
      "long" in ps
        ? getPerfectiveHead(ps.long[0], verb)
        : getPerfectiveHead(ps[0], verb);
    const short =
      "long" in ps ? getPerfectiveHead(ps.short[0], verb) : undefined;
    if (short) {
      return [
        ph ? [ph] : [],
        [
          {
            type: "VB",
            ps: {
              long: [long],
              short: [short[1]],
            },
          },
        ],
      ];
    }
    return [ph ? [ph] : [], [{ type: "VB", ps: [long] }]];
  }
}

function getPassiveRs(
  verb: T.VerbEntryNoFVars,
  aspect: T.Aspect,
  rs: "root" | "stem",
  genderNumber: T.GenderNumber
): [[] | [T.VHead], [T.VB]] {
  const [vHead, [basicRoot]] = getRoot(verb, genderNumber, aspect);
  const longRoot = getLongVB(basicRoot);
  const kedulVba = getRootStem({
    verb: statVerb.intransitive,
    aspect,
    rs,
    type: "basic",
    voice: "active",
    genderNumber: { gender: "masc", number: "singular" },
  })[1][0] as T.VBBasic;
  return [vHead, [weld(longRoot, kedulVba)]];
}

// TODO: This is a nasty and messy way to do it with the length options included
export function getPerfectiveHead(
  base: T.PsString,
  v: T.VerbEntryNoFVars
): [T.PH, T.PsString] | [undefined, T.PsString] {
  // if ((verb.entry.ssp && verb.entry.ssf) || verb.entry.separationAtP) {
  //     // handle split
  // }
  if (v.entry.separationAtP && v.entry.separationAtF) {
    const ph: T.PH = {
      type: "PH",
      ps: accentOnNFromEnd(
        {
          p: base.p.slice(0, v.entry.separationAtP),
          f: base.f.slice(0, v.entry.separationAtF),
        },
        0
      ),
    };
    const rest = {
      p: base.p.slice(v.entry.separationAtP),
      f: base.f.slice(v.entry.separationAtF),
    };
    return [ph, rest];
  }
  const [ph, rest]: [T.PH | undefined, T.PsString] = v.entry.noOo
    ? [undefined, base]
    : v.entry.sepOo
    ? [{ type: "PH", ps: { p: "و ", f: "óo`" } }, base]
    : ["آ", "ا"].includes(base.p.charAt(0)) && base.f.charAt(0) === "a"
    ? [{ type: "PH", ps: { p: "وا", f: "wáa" } }, removeAStart(base)]
    : ["óo", "oo"].includes(base.f.slice(0, 2))
    ? [{ type: "PH", ps: { p: "و", f: "wÚ" } }, base]
    : ["ée", "ee"].includes(base.f.slice(0, 2)) && base.p.slice(0, 2) === "ای"
    ? [
        { type: "PH", ps: { p: "وي", f: "wée" } },
        {
          p: base.p.slice(2),
          f: base.f.slice(2),
        },
      ]
    : ["é", "e"].includes(base.f.slice(0, 2)) && base.p.slice(0, 2) === "اې"
    ? [
        { type: "PH", ps: { p: "وي", f: "wé" } },
        {
          p: base.p.slice(2),
          f: base.f.slice(1),
        },
      ]
    : ["ó", "o"].includes(base.f[0]) && base.p.slice(0, 2) === "او"
    ? [{ type: "PH", ps: { p: "و", f: "óo`" } }, base]
    : [{ type: "PH", ps: { p: "و", f: "óo" } }, base];
  return [ph, removeAccents(rest)];
  function removeAStart(ps: T.PsString) {
    return {
      p: ps.p.slice(1),
      f: ps.f.slice(ps.f[1] === "a" ? 2 : 1),
    };
  }
}

function edulIntransBase(
  v: T.VerbEntryNoFVars
): T.SingleOrLengthOpts<T.PsString[]> {
  const base = trimOffPs(makePsString(v.entry.p, v.entry.f), 3, 4);
  const long: T.PsString[] = [concatPsString(base, { p: "ېږ", f: "éG" })];
  const short: T.PsString[] | undefined = v.entry.shortIntrans
    ? [base]
    : undefined;
  return short ? { short, long } : long;
}

const kawulSpecialPerfective: T.LengthOptions<T.PsString[]> = {
  long: [{ p: "کړ", f: "kR" }],
  short: [{ p: "ک", f: "k" }],
};
