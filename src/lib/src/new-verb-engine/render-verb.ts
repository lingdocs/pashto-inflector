import * as T from "../../../types";
import {
  getVerbBlockPosFromPerson,
  isSecondPerson,
  personNumber,
  personToGenNum,
} from "../misc-helpers";
import { fmapSingleOrLengthOpts } from "../fp-ps";
import {
  concatPsString,
  getLength,
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

// TODO: dynamic and stative compounds
export function renderVerb({
  verb,
  tense,
  subject,
  object,
  voice,
  negative,
}: {
  verb: T.VerbEntry;
  negative: boolean;
  tense: T.VerbTense | T.PerfectTense | T.AbilityTense | T.ImperativeTense; // TODO: make T.Tense
  subject: T.Person;
  object: T.Person | undefined;
  voice: T.Voice;
}): T.RenderVerbOutput {
  if (isPerfectTense(tense)) {
    return renderPerfectVerb({
      verb,
      tense,
      voice,
      person: object ?? subject,
    });
  }
  const { aspect, tenseC, hasBa } = formulas[removeAbility(tense)];
  const isPast = tenseC === "past";
  const type = isAbilityTense(tense) ? "ability" : "basic";
  const transitive = object !== undefined;
  const king = transitive && isPast ? object : subject;
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
      if (vb.ps.short[0].f === "ghl" && pastThird && basicForm) {
        return {
          ...vb,
          ps: [{ p: "غی", f: "ghay" }],
        };
      }
      const endLong = getLength(end, "long");
      const endShort = getLength(end, "short");
      // TODO: this is hacky
      return {
        ...vb,
        ps: {
          long: verbEndingConcat(vb.ps.long, endLong),
          short:
            pastThird && basicForm
              ? ensure3rdPast(vb.ps.short, endShort, verb, aspect)
              : verbEndingConcat(vb.ps.short, endShort),
          ...(vb.ps.mini
            ? {
                mini: verbEndingConcat(vb.ps.mini, endShort),
              }
            : {}),
        },
      };
    }
    /* istanbul ignore next */
    if ("long" in end) {
      throw new Error(
        "should not be using verb stems with long and short endings"
      );
    }
    return {
      ...vb,
      ps: verbEndingConcat(vb.ps, end),
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
    );
    return tpps.map(({ p, f }) => {
      const tip = removeAccents(
        verb.entry.separationAtP !== undefined
          ? makePsString(
              p.slice(verb.entry.separationAtP),
              f.slice(verb.entry.separationAtF)
            )
          : makePsString(p, f)
      );
      return aspect === "imperfective" ? accentOnNFromEnd(tip, 0) : tip;
    });
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
  const endsInDental = ["د", "ت"].includes(rs[0].p.slice(-1));
  // short endings like ورسېد
  const ends = endsInDental ? [{ p: "", f: "" }, ...ending] : ending;
  return verbEndingConcat(rs, ends);
}

function removeAbility(
  tense: T.VerbTense | T.AbilityTense | T.ImperativeTense
): T.VerbTense | T.ImperativeTense {
  return tense.replace("Modal", "") as T.VerbTense | T.ImperativeTense;
}
