import * as T from "../../../types";
import { removeFVarients } from "../accent-and-ps-utils";
import { accentPsSyllable, removeAccents, removeAccentsWLength } from "../accent-helpers";
import { concatPsString, trimOffPs } from "../p-text-helpers";
import { getRootStem } from "./roots-and-stems";
import { inflectPattern1 } from "./new-inflectors";

export function vEntry(e: any, c?: any): T.VerbEntryNoFVars {
    return {
        entry: removeFVarients(e),
        ...c ? {
            c,
        } : {},
    } as T.VerbEntryNoFVars;
}

export function getAllRs(verb: T.VerbEntry): {
    stem: {
        perfective: T.RootsStemsOutput,
        imperfective: T.RootsStemsOutput,
    },
    root: {
        perfective: T.RootsStemsOutput,
        imperfective: T.RootsStemsOutput,
    },
} { 
    return {
        stem: {
            perfective: getRootStem({ verb, type: "basic", voice: "active", part: { rs: "stem", aspect: "perfective" }, genderNumber: { gender: "masc", number: "singular" } }),
            imperfective: getRootStem({ verb, type: "basic", voice: "active", part: { rs: "stem", aspect: "imperfective" }, genderNumber: { gender: "masc", number: "singular" } }),
        },
        root: {
            perfective: getRootStem({ verb, type: "basic", voice: "active", part: { rs: "root", aspect: "perfective" }, genderNumber: { gender: "masc", number: "singular" } }),
            imperfective: getRootStem({ verb, type: "basic", voice: "active", part: { rs: "root", aspect: "imperfective" }, genderNumber: { gender: "masc", number: "singular" } }),
        },
    };
}

/**
 * adds a verb ending, creating all the variations with a set of root psStrings
 * it is aware of the trailing accent marker X and also avoids adding the double ل ending 3rd pers masc plur
 * 
 * @param ps - a verb root/stem
 * @param end - the verb ending
 * @returns 
 */
export function verbEndingConcat(ps: T.PsString[], end: T.PsString[]): T.PsString[] {
    return ps.flatMap(v => (
        end.map(e => {
            if (v.f.charAt(v.f.length-1) === "X") {
                return concatPsString(trimOffPs(v, 0, 1), accentPsSyllable(e))
            }
            if (e.p === "ل" && ["ul", "úl"].includes(v.f.slice(-2))) {
                return v;
            }
            return concatPsString(v, e);
        })
    ));
}

export function weld(left: T.Welded["left"], right: T.Welded["right"]): T.Welded {
    return {
        type: "welded",
        left: removeAccentsFromLeft(left),
        right,
    }
    function removeAccentsFromLeft(left: T.Welded["left"]): T.Welded["left"] {
        if (left.type === "VB") {
            return {
                ...left,
                ps: removeAccentsWLength(left.ps),
            }
        }
        if (left.type === "NComp") {
            return {
                ...left,
                comp: {
                    ...left.comp,
                    ps: removeAccents(left.comp.ps),
                }
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

export function tlulPerfectiveStem(person: { gender: T.Gender, number: T.NounNumber }): T.RootsStemsOutput {
    return [
        [
            {
                type: "PH",
                ps: inflectPattern1({ p: "لاړ", f: "laaR" }, person).map(x => concatPsString(x, " "))[0],
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
        { p: "ی", f: "ey" },
        { p: "ای", f: "aay" },
    ];
    if (vb.type === "welded") {
        return {
            ...vb,
            right: addToVBBasicEnd(vb.right, abilityEnding),
        };
    }
    return addToVBBasicEnd(vb, abilityEnding);
}

export function addToVBBasicEnd(vb: T.VBBasic, end: T.PsString[]): T.VBBasic {
    if ("long" in vb.ps) {
        return {
            ...vb,
            ps: {
                long: verbEndingConcat(vb.ps.long, end),
                short: verbEndingConcat(vb.ps.short, end),
            },
        };
    }
    return {
        ...vb,
        ps: verbEndingConcat(vb.ps, end),
    };
}