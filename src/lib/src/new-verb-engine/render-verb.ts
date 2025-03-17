import * as T from "../../../types";
import {
  getVerbBlockPosFromPerson,
  isSecondPerson,
  personNumber,
  personToGenNum,
} from "../misc-helpers";
import { monoidPsString } from "../fp-ps";
import { applySingleOrLengthOpts, fmapSingleOrLengthOpts } from "../fp-ps";
import {
  concatPsString,
  endsInConsonant,
  getLength,
  lastVowelNotAorO,
  splitPsByVarients,
} from "../p-text-helpers";
import {
  presentEndings,
  pastEndings,
  equativeEndings,
  imperativeEndings,
} from "../grammar-units";
import {
  isKawulVerb,
  isAbilityTense,
  isPerfectTense,
  isTlulVerb,
  isImperativeTense,
} from "../type-predicates";
import { perfectTenseHasBa } from "../phrase-building/vp-tools";
import { makePsString, removeFVarients } from "../accent-and-ps-utils";
import { getPastParticiple, getRootStem } from "./roots-and-stems";
import {
  isKedul,
  perfectTenseToEquative,
  vEntry,
  verbEndingConcat,
} from "./rs-helpers";
import {
  accentOnNFromEnd,
  accentPsSyllable,
  removeAccents,
} from "../accent-helpers";
const kedulStat = vEntry({
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
});
const formulas: Record<
  T.VerbTense | T.ImperativeTense,
  {
    aspect: T.Aspect;
    tenseC: "past" | "present" | "imperative";
    hasBa: boolean;
  }
> = {
  presentVerb: {
    aspect: "imperfective",
    tenseC: "present",
    hasBa: false,
  },
  subjunctiveVerb: {
    aspect: "perfective",
    tenseC: "present",
    hasBa: false,
  },
  perfectiveFuture: {
    aspect: "perfective",
    tenseC: "present",
    hasBa: true,
  },
  imperfectiveFuture: {
    aspect: "imperfective",
    tenseC: "present",
    hasBa: true,
  },
  perfectivePast: {
    aspect: "perfective",
    tenseC: "past",
    hasBa: false,
  },
  imperfectivePast: {
    aspect: "imperfective",
    tenseC: "past",
    hasBa: false,
  },
  habitualImperfectivePast: {
    aspect: "imperfective",
    tenseC: "past",
    hasBa: true,
  },
  habitualPerfectivePast: {
    aspect: "perfective",
    tenseC: "past",
    hasBa: true,
  },
  perfectiveImperative: {
    aspect: "perfective",
    tenseC: "imperative",
    hasBa: false,
  },
  imperfectiveImperative: {
    aspect: "imperfective",
    tenseC: "imperative",
    hasBa: false,
  },
};

// TODO: is وخوته masc ok ??
// TODO: what to do with khatu, khot, khotu - bi-directional
// TODO: ښکارېدل short third masc check
export function renderVerb({
  verb,
  tense,
  subject,
  object,
  complementKing,
  voice,
  negative,
}: {
  verb: T.VerbEntry;
  negative: boolean;
  tense: T.VerbTense | T.PerfectTense | T.AbilityTense | T.ImperativeTense; // TODO: make T.Tense
  subject: T.Person;
  object: T.Person | undefined;
  complementKing: T.Person | undefined;
  voice: T.Voice;
}): T.RenderVerbOutput {
  if (isPerfectTense(tense)) {
    return renderPerfectVerb({
      verb,
      tense,
      voice,
      person: complementKing ?? object ?? subject,
    });
  }
  const { aspect, tenseC, hasBa } = formulas[removeAbility(tense)];
  const isPast = tenseC === "past";
  const type = isAbilityTense(tense) ? "ability" : "basic";
  const transitive = object !== undefined;
  const king = complementKing ?? (transitive && isPast ? object : subject);
  const base = isPast ? "root" : "stem";
  // #1 get the appropriate root / stem
  const [vHead, rest] = getRootStem({
    verb,
    rs: base,
    aspect: negative && isImperativeTense(tense) ? "imperfective" : aspect,
    voice,
    type,
    genderNumber: personToGenNum(transitive ? object : subject),
  });

  // #2 add the verb ending to it
  const ending = getEnding(king, tenseC, aspect);
  return {
    hasBa,
    vbs: [
      vHead,
      addEnding({
        rs: rest,
        ending,
        verb,
        person: king,
        pastThird: isPast && king === T.Person.ThirdSingMale,
        aspect,
        basicForm: type === "basic" && voice === "active",
        base,
        ability: type === "ability",
      }),
    ],
  };
}

function renderPerfectVerb({
  tense,
  verb,
  voice,
  person,
}: {
  person: T.Person;
  tense: T.PerfectTense;
  verb: T.VerbEntry;
  voice: T.Voice;
}): {
  hasBa: boolean;
  vbs: [[], [T.VBP, T.VBE]];
  objComp: T.Rendered<T.NPSelection> | undefined;
} {
  const hasBa = perfectTenseHasBa(tense);
  // #1 get the past participle
  const pp = getPastParticiple(verb, voice, personToGenNum(person));
  // #2 get the right equative
  const equative = equativeEndings[perfectTenseToEquative(tense)];
  const [row, col] = getVerbBlockPosFromPerson(person);
  const equativeBlock: T.VBE = {
    type: "VB",
    person,
    ps: fmapSingleOrLengthOpts((x) => x[row][col], equative),
    info: {
      type: "equative",
      tense: perfectTenseToEquative(tense),
    },
  };
  return {
    hasBa,
    objComp: undefined,
    vbs: [[], [pp, equativeBlock]],
  };
}

function addEnding({
  verb,
  rs,
  ending,
  person,
  pastThird,
  aspect,
  basicForm,
  base,
  ability,
}: {
  rs: [T.VBP, T.VB] | [T.VB];
  ending: T.SingleOrLengthOpts<T.PsString[]>;
  person: T.Person;
  verb: T.VerbEntry;
  pastThird: boolean;
  aspect: T.Aspect;
  basicForm: boolean;
  base: "stem" | "root";
  ability: boolean;
}): [T.VBP, T.VBE] | [T.VBE] {
  return rs.length === 2
    ? [rs[0], addEnd(rs[1], ending)]
    : [addEnd(rs[0], ending)];
  function addEnd(vb: T.VB, ending: T.SingleOrLengthOpts<T.PsString[]>): T.VBE {
    const info = {
      type: "verb" as const,
      aspect: ability ? "perfective" : aspect,
      base,
      verb: ability ? kedulStat : verb,
      ...(ability
        ? {
            abilityAux: true,
          }
        : {}),
    };
    if (vb.type === "welded") {
      return {
        ...vb,
        right: addToVBBasicEnd(vb.right, ending),
        person,
        info,
      };
    }
    return {
      ...addToVBBasicEnd(vb, ending),
      person,
      info,
    };
  }
  function addToVBBasicEnd(
    vb: T.VBBasic,
    end: T.SingleOrLengthOpts<T.PsString[]>
  ): T.VBBasic {
    if ("long" in vb.ps) {
      // exceptional ending for راتلل, ورتلل, درتلل
      // TODO: do we need a more thorough check?
      if (vb.ps.short[0].f === "ghl" && pastThird && basicForm) {
        return {
          ...vb,
          ps: [{ p: "غی", f: "ghay" }],
        };
      }
      // exceptional ending for شو
      if (vb.ps.short[0].f === "shw" && pastThird) {
        return {
          ...vb,
          ps: {
            short: [{ p: "شو", f: "sho" }],
            long: [{ p: "شولو", f: "shwulo" }],
          },
        };
      }
    }

    const endShort = getLength(end, "short");
    return {
      ...vb,
      ps: applySingleOrLengthOpts(
        {
          long: (ps) => verbEndingConcat(ps, getLength(end, "long")),
          short: (ps) =>
            pastThird && basicForm
              ? ensure3rdPast(ps, endShort, verb, aspect)
              : verbEndingConcat(ps, endShort),
          mini: (ps) => verbEndingConcat(ps, endShort),
        },
        vb.ps
      ),
    };
  }
}

function getEnding(
  person: T.Person,
  tenseC: "present" | "past" | "imperative",
  aspect: T.Aspect
) {
  if (tenseC === "imperative") {
    if (!isSecondPerson(person)) {
      throw new Error("imperative forms must be second person");
    }
    const number = personNumber(person);
    const ends = imperativeEndings[0][number === "singular" ? 0 : 1];
    return aspect === "imperfective"
      ? ends.map((e) => accentPsSyllable(e))
      : ends;
  }
  const [row, col] = getVerbBlockPosFromPerson(person);
  return tenseC === "past"
    ? {
        long: pastEndings.long[row][col],
        short: pastEndings.short[row][col],
      }
    : presentEndings[row][col];
}

// TODO: THIS IS PROBABLY SKEEEETCH
function ensure3rdPast(
  rs: T.PsString[],
  ending: T.PsString[],
  verb: T.VerbEntry,
  aspect: T.Aspect
): T.PsString[] {
  if (isKedul(verb)) {
    return aspect === "perfective"
      ? [{ p: "شو", f: "sho" }]
      : [{ p: "کېده", f: "kedú" }];
  }
  if (isKawulVerb(verb) && rs[0].p === "کړ") {
    return [
      { p: "کړ", f: "kuR" },
      { p: "کړه", f: "kRu" },
      { p: "کړو", f: "kRo" },
    ];
  }
  if (isTlulVerb(verb)) {
    // should be imperfective at this point
    // the perfective غی should already be covered in the function this is coming from
    if (verb.entry.p === "تلل" && aspect === "perfective") {
      return [
        {
          p: "ړ",
          f: "R",
        },
        {
          p: "ړه",
          f: "Ru",
        },
        {
          p: "ړو",
          f: "Ro",
        },
      ];
    }
    return [
      {
        p: rs[0].p.slice(0, -1) + "ه",
        f: rs[0].f.slice(0, -2) + "ú",
      },
      {
        p: rs[0].p + "و",
        f: rs[0].f.slice(0, -1) + "ó",
      },
    ];
  }
  if (verb.entry.tppp && verb.entry.tppf) {
    const tpps = splitPsByVarients(
      makePsString(verb.entry.tppp, verb.entry.tppf)
    ).map((ps) =>
      !verb.entry.sepOo && aspect === "perfective" ? takeOffAaStart(ps) : ps
    );
    if (verb.entry.p === "وړل" && aspect === "perfective") {
      return [
        { p: "ړ", f: "R" },
        { p: "ړ", f: "Ru" },
        { p: "وړ", f: "wuR" },
        { p: "وړه", f: "wRu" },
      ];
    }
    return tpps
      .flatMap(({ p, f }) => {
        if (p.endsWith("ووړ")) {
          return [
            { p, f },
            { p: p.slice(0, -2) + "ړه", f: f.slice(0, -2) + "Ru" },
          ];
        }
        return [{ p, f }];
      })
      .map(({ p, f }) =>
        verb.entry.separationAtP !== undefined && aspect === "perfective"
          ? makePsString(
              p.slice(verb.entry.separationAtP),
              f.slice(verb.entry.separationAtF)
            )
          : makePsString(p, f)
      )
      .flatMap((ps) =>
        endsInConsonant(ps) && lastVowelNotAorO(ps.f)
          ? [ps, concatPsString(ps, { p: "ه", f: "u" })]
          : [ps]
      )
      .map((ps) =>
        aspect === "imperfective" ? accentOnNFromEnd(ps, 0) : removeAccents(ps)
      );
    // if it ends in a consonant, the special form will also have another
    // variation ending with a ه - u
    // const endsInAConsonant = (pashtoConsonants.includes(tip.p.slice(-1)) || tip.f.slice(-1) === "w");
    // return [
    //     aTip,
    //     ...endsInAConsonant ? [
    //         ...verbEndingConcat([aTip], [{ p: "ه", f: "u" }, { p: "و", f: "o" }]),
    //     ] : [],
    // ];
  }
  const endsInAwul =
    ["awul", "awúl"].includes(removeFVarients(verb.entry.f).slice(-4)) &&
    verb.entry.p.slice(-2) === "ول";
  // TODO: check about verbs like tawul (if they exist)
  if (endsInAwul) {
    const base = { p: rs[0].p.slice(0, -1), f: rs[0].f.slice(0, -2) };
    const aawuEnd = concatPsString(base, {
      p: "اوه",
      f: base.f.charAt(base.f.length - 1) === "a" ? "awu" : "aawu",
    });
    return [aspect === "imperfective" ? accentOnNFromEnd(aawuEnd, 0) : aawuEnd];
  }
  const abruptEnder = ["د", "ت", "ړ"].includes(rs[0].p.slice(-1));
  // short endings like ورسېد
  const ends = abruptEnder ? [monoidPsString.empty, ...ending] : ending;
  return verbEndingConcat(rs, ends);
}

function removeAbility(
  tense: T.VerbTense | T.AbilityTense | T.ImperativeTense
): T.VerbTense | T.ImperativeTense {
  return tense.replace("Modal", "") as T.VerbTense | T.ImperativeTense;
}

function takeOffAaStart(ps: T.PsString): T.PsString {
  if (!["ا", "آ"].includes(ps.p[0])) {
    return ps;
  }
  // TODO handle more than just the starting aa
  if (["aa", "áa"].includes(ps.f.slice(0, 2))) {
    return {
      p: ps.p.slice(1),
      f: ps.f.slice(2),
    };
  }
  if (["a", "á"].includes(ps.f[0])) {
    return {
      p: ps.p.slice(1),
      f: ps.f.slice(1),
    };
  }
  return ps;
}
