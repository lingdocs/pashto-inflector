import * as T from "../../../types";
import { removeFVarients } from "../accent-and-ps-utils";
import {
  accentOnNFromEnd,
  accentPsSyllable,
  countSyllables,
  removeAccents,
  removeAccentsWLength,
} from "../accent-helpers";
import {
  concatPsString,
  isUnisexSet,
  psStringFromEntry,
  trimOffPs,
} from "../p-text-helpers";
import { inflectPattern1 } from "./new-inflectors";
import { getLength } from "../p-text-helpers";
import { equativeEndings } from "../grammar-units";
import { isAdjectiveEntry, isImperativeTense } from "../type-predicates";
import { inflectWord } from "../pashto-inflector";

export function isStatComp(v: T.VerbEntry): boolean {
  return !!v.entry.c?.includes("stat. comp.") && !!v.complement;
}

export function statCompImperfectiveSpace(v: T.VerbEntryNoFVars): boolean {
  return v.entry.p.startsWith(`${v.complement?.p} `);
}

export function makeComplement(
  e: T.DictionaryEntryNoFVars,
  { gender, number }: T.GenderNumber
): T.NComp {
  if (isAdjectiveEntry(e)) {
    const infs = inflectWord(e);
    const ps =
      infs && infs.inflections && isUnisexSet(infs.inflections)
        ? infs.inflections[gender][number === "singular" ? 0 : 1][0]
        : psStringFromEntry(e);
    return {
      type: "NComp",
      comp: {
        type: "AdjComp",
        ps: lightEnforceCompAccent(ps),
        gender,
        number,
      },
    };
  }
  return {
    type: "NComp",
    comp: {
      type: "Comp",
      ps: lightEnforceCompAccent(psStringFromEntry(e)),
    },
  };
  function lightEnforceCompAccent(ps: T.PsString): T.PsString {
    return countSyllables(ps) === 1 ? accentPsSyllable(ps) : ps;
  }
}

export function vEntry(e: any, c?: any): T.VerbEntryNoFVars {
  return {
    entry: removeFVarients(e),
    ...(c
      ? {
          complement: c,
        }
      : {}),
  } as T.VerbEntryNoFVars;
}

// export function getAllRs(verb: T.VerbEntry): {
//     stem: {
//         perfective: T.RootsStemsOutput,
//         imperfective: T.RootsStemsOutput,
//     },
//     root: {
//         perfective: T.RootsStemsOutput,
//         imperfective: T.RootsStemsOutput,
//     },
// } {
//     return {
//         stem: {
//             perfective: getRootStem({ verb, type: "basic", voice: "active", rs: "stem", aspect: "perfective", genderNumber: { gender: "masc", number: "singular" } }),
//             imperfective: getRootStem({ verb, type: "basic", voice: "active", rs: "stem", aspect: "imperfective", genderNumber: { gender: "masc", number: "singular" } }),
//         },
//         root: {
//             perfective: getRootStem({ verb, type: "basic", voice: "active", rs: "root", aspect: "perfective", genderNumber: { gender: "masc", number: "singular" } }),
//             imperfective: getRootStem({ verb, type: "basic", voice: "active", rs: "root", aspect: "imperfective", genderNumber: { gender: "masc", number: "singular" } }),
//         },
//     };
// }

/**
 * adds a verb ending, creating all the variations with a set of root psStrings
 * it is aware of the trailing accent marker X and also avoids adding the double ل ending 3rd pers masc plur
 *
 * @param ps - a verb root/stem
 * @param end - the verb ending
 * @returns
 */
export function verbEndingConcat(
  ps: T.PsString[],
  end: T.PsString[]
): T.PsString[] {
  if (ps[0].f === "shw" && end[0].f === "oo") {
    return [{ p: "شو", f: "shoo" }];
  }
  return ps.flatMap((v) =>
    end.map((e) => {
      if (v.f.charAt(v.f.length - 1) === "X") {
        // faster to do concatPsString(trimOffPs(v, 0, 1), accentSyllable(e))
        // but this covers cases like adding the 3rd person no-ending to a string with the
        // trailing accent marker and still getting the accent right
        return accentOnNFromEnd(concatPsString(trimOffPs(v, 0, 1), e), 0);
      }
      if (e.p === "ل" && ["ul", "úl"].includes(v.f.slice(-2))) {
        return v;
      }
      return concatPsString(v, e);
    })
  );
}

// TODO: THIS IS UGGGGLY NEED TO THINK THROUGH THE TYPING ON THE WELDING
export function weld(
  left: T.Welded["left"],
  right: T.VBGenNum | T.WeldedGN
): T.WeldedGN;
export function weld(
  left: T.Welded["left"],
  right: T.VBBasic | T.NComp | T.Welded
): T.Welded;
export function weld(
  left: T.Welded["left"],
  right: T.VBBasic | T.VBGenNum | T.Welded | T.NComp | T.WeldedGN
): T.Welded | T.WeldedGN {
  if (right.type === "welded") {
    return weld(weld(left, right.left), right.right);
  }
  /* istanbul ignore next */
  if (right.type === "NComp") {
    throw new Error("can't weld a complement on the right side");
  }
  return {
    type: "welded",
    left: removeAccentsFromLeft(left),
    right,
  };
  function removeAccentsFromLeft(left: T.Welded["left"]): T.Welded["left"] {
    if (left.type === "VB") {
      return {
        ...left,
        ps: removeAccentsWLength(left.ps),
      };
    }
    if (left.type === "NComp") {
      return {
        ...left,
        comp: {
          ...left.comp,
          ps: removeAccents(left.comp.ps),
        },
      };
    }
    return {
      ...left,
      right: {
        ...left.right,
        ps: removeAccentsWLength(left.right.ps),
      },
    };
  }
}

export function addTrailingAccent(ps: T.PsString): T.PsString {
  return {
    p: ps.p,
    f: ps.f + "X",
  };
}

// TODO: could do removeEndingL (slower but safer)

export function removeL(ps: T.PsString): T.PsString {
  return trimOffPs(ps, 1, 2);
}
/**
 * returns a simple polar transitivity of the verb, only intransitive or transitive
 *
 * @param v
 * @returns
 */
export function vTransitivity(v: T.VerbEntry): "intransitive" | "transitive" {
  return v.entry.c?.includes("intrans.") ? "intransitive" : "transitive";
}

export function tlulPerfectiveStem(person: {
  gender: T.Gender;
  number: T.NounNumber;
}): [[T.PH], [T.VB]] {
  return [
    [
      {
        type: "PH",
        ps: inflectPattern1({ p: "لاړ", f: "láaR" }, person).map((x) =>
          concatPsString(x, " ")
        )[0],
      },
    ],
    [
      {
        type: "VB",
        ps: [{ p: "ش", f: "sh" }],
      },
    ],
  ];
}

export function addAbilityEnding(vb: T.VBA): T.VBA {
  const abilityEnding: T.PsString[] = [
    { p: "ی", f: "ay" },
    { p: "ای", f: "aay" },
  ];
  if (vb.type === "welded") {
    return {
      ...vb,
      right: addToEnd(vb.right, abilityEnding),
    };
  }
  return addToEnd(vb, abilityEnding);
  function addToEnd(vb: T.VBBasic, end: T.PsString[]): T.VBBasic {
    /* istanbul ignore next */
    if (!("long" in vb.ps)) {
      throw new Error(
        "should have long and short form for adding to ability ending"
      );
    }
    return {
      ...vb,
      ps: {
        long: verbEndingConcat(vb.ps.long, end),
        short: verbEndingConcat(vb.ps.short, end),
      },
    };
  }
}

export function possiblePPartLengths(vba: T.VBNoLenghts<T.VBBasic>): T.VBBasic;
export function possiblePPartLengths(vba: T.VBNoLenghts<T.VBA>): T.VBA;
export function possiblePPartLengths(vba: T.VBNoLenghts<T.VBA>): T.VBA {
  const shortenableEndings = ["ښتل", "ستل", "وتل"];
  const wrul = ["وړل", "راوړل", "وروړل", "دروړل"];
  // can't find a case where this is used - type safety
  /* istanbul ignore next */
  if ("right" in vba) {
    return {
      ...vba,
      right: possiblePPartLengths(vba.right),
    };
  }
  const infinitive = vba.ps[0];
  if (infinitive.f === "tlúl") {
    return {
      type: "VB",
      ps: {
        long: [infinitive],
        short: [{ p: "تل", f: "túl" }],
      },
    };
  }
  const [trimP, trimF] =
    infinitive.p.slice(-4) === "ښودل" &&
    infinitive.p.length > 4 &&
    infinitive.p !== "کېښودل" &&
    infinitive.p !== "کښېښودل"
      ? // special thing for اېښودل - پرېښودل
        [3, 4]
      : wrul.includes(infinitive.p) ||
        (shortenableEndings.includes(infinitive.p.slice(-3)) &&
          infinitive.p.slice(-4) !== "استل")
      ? [1, 2]
      : [0, 0];
  if (trimP) {
    return {
      type: "VB",
      ps: {
        long: [infinitive],
        short: [accentOnNFromEnd(trimOffPs(infinitive, trimP, trimF), 0)],
      },
    };
  }
  return vba;
}

export function getLongVB(vb: T.VBBasic): T.VBNoLenghts<T.VBBasic>;
export function getLongVB(vb: T.VBA): T.VBNoLenghts<T.VBA>;
export function getLongVB(vb: T.VBA): T.VBNoLenghts<T.VBA> {
  if (vb.type === "welded") {
    return {
      ...vb,
      right: getLongVB(vb.right),
    };
  }
  return {
    ...vb,
    ps: getLength(vb.ps, "long"),
  };
}

export function getAspect(
  tense: T.VerbTense | T.AbilityTense | T.ImperativeTense,
  negative: boolean
): T.Aspect {
  if (isImperativeTense(tense) && negative) {
    return "imperfective";
  }
  const t = tense.replace("Modal", "");
  const imperfectives: Parameters<typeof getAspect>[0][] = [
    "presentVerb",
    "imperfectiveFuture",
    "imperfectivePast",
    "habitualImperfectivePast",
    "imperfectiveImperative",
  ];
  if (imperfectives.includes(t as Parameters<typeof getAspect>[0])) {
    return "imperfective";
  } else {
    return "perfective";
  }
}

export function isKedul(v: T.VerbEntry): boolean {
  return v.entry.p === "کېدل";
}

export function perfectTenseToEquative(
  t: T.PerfectTense
): keyof typeof equativeEndings {
  return t === "presentPerfect"
    ? "present"
    : t === "futurePerfect"
    ? "habitual"
    : t === "habitualPerfect"
    ? "habitual"
    : t === "pastPerfect"
    ? "past"
    : t === "pastSubjunctivePerfect"
    ? "pastSubjunctive"
    : t === "wouldBePerfect"
    ? "past"
    : t === "wouldHaveBeenPerfect"
    ? "pastSubjunctive"
    : "subjunctive";
}
