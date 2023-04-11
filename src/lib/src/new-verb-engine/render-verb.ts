import * as T from "../../../types";
import {
    getVerbBlockPosFromPerson,
    personGender,
    personNumber,
} from "../misc-helpers";
import {
    concatPsString,
    getLength,
} from "../p-text-helpers";
import {
    presentEndings,
    pastEndings,
    equativeEndings,
} from "../grammar-units";
import { isKawulVerb, isAbilityTense, isPerfectTense, isTlulVerb } from "../type-predicates";
import { tenseHasBa } from "../phrase-building/vp-tools";
import { isPastTense } from "../phrase-building/vp-tools"; 
import { makePsString, removeFVarients } from "../accent-and-ps-utils";
import { pashtoConsonants } from "../pashto-consonants";
import { getPastParticiple, getRootStem } from "./roots-and-stems";
import { verbEndingConcat } from "./rs-helpers";

// For the chart display of the results: base the length thing on the VBE at the end, if there are other
// length variations earlier in the blocks, flatten those into the variations

// TODO: Amazingly, the basic formula with the roots and stems from the basic verbs
// works perfectly with stative compounds as well!
// The only issue is that if we want to include more information (complement noun gender etc) in the blocks
// we need to redo the stem building to have those parts
// 2 options:
//   1. redo the root/stem builder to output primitive blocks
//   2. rebuild the roots/stems in the verb engine
// Will start with number 2 and then if I go back and rebuild the root/stem builder
// We can go back to using a very simple verb building formula

// TODO: problem with laaR - no perfective split
// TODO: are azmóyulum and wáayulo really not just azmoyúlum and waayúlo ?
// TODO: automatic 3rd person idiosyncronizing of raTul raaTu, shaRul, shaaRu, rasedul rased etc

// IMMEDIATE TODO: shwoo -> shoo

export function renderVerb({ verb, tense, person, voice }: {
    verb: T.VerbEntry,
    tense: T.VerbTense | T.PerfectTense | T.AbilityTense, // TODO: make T.Tense
    person: T.Person,
    voice: T.Voice,
}): {
    hasBa: boolean,
    vbs: T.VerbRenderedOutput,
} {
    if (isPerfectTense(tense)) {
        return renderPerfectVerb({ verb, tense, voice, person });
    }

    const hasBa = tenseHasBa(tense);
    const genderNumber = {
        gender: personGender(person),
        number: personNumber(person),
    };
    const isPast = isPastTense(tense);
    const aspect = getAspect(tense);
    const type = isAbilityTense(tense) ? "ability" : "basic";

    // #1 get the appropriate root / stem
    const [vHead, rest] = getRootStem({
        verb,
        rs: isPast ? "root" : "stem",
        aspect,
        voice,
        type,
        genderNumber,
    });
    // #2 add the verb ending to it
    const ending = getEnding(person, isPast);
    return {
        hasBa,
        vbs: [
            vHead,
            addEnding({
                rs: rest,
                ending,
                verb,
                person,
                pastThird: isPast && person === T.Person.ThirdSingMale,
                aspect,
                basicForm: type === "basic" && voice === "active",
            }),
        ],  
    };
}

function renderPerfectVerb({ tense, verb, voice, person }: {
    tense: T.PerfectTense,
    verb: T.VerbEntry,
    voice: T.Voice,
    person: T.Person,
}): { hasBa: boolean, vbs: [[], [T.VBGenNum, T.VBE]] } {
    const hasBa = tenseHasBa(tense);
    const genderNumber = {
        gender: personGender(person),
        number: personNumber(person),
    };
    // #1 get the past participle
    const pp = getPastParticiple(verb, voice, genderNumber);
    // #2 get the right equative
    const equative = equativeEndings[perfectTenseToEquative(tense)];
    const [row, col] = getVerbBlockPosFromPerson(person);
    const equativeBlock: T.VBE = {
        type: "VB",
        person,
        ps: "long" in equative ? {
            long: equative.long[row][col],
            short: equative.short[row][col],
        } : equative[row][col],
    };
    return {
        hasBa, 
        vbs: [[], [pp, equativeBlock]],
    };
}

function addEnding({ verb, rs, ending, person, pastThird, aspect, basicForm }: {
    rs: [T.VB, T.VBA] | [T.VBA],
    ending: T.SingleOrLengthOpts<T.PsString[]>,
    person: T.Person,
    verb: T.VerbEntry,
    pastThird: boolean,
    aspect: T.Aspect,
    basicForm: boolean,
}): [T.VB, T.VBE] | [T.VBE] {
    return rs.length === 2
        ? [rs[0], addEnd(rs[1], ending)]
        : [addEnd(rs[0], ending)];
    function addEnd(vba: T.VBA, ending: T.SingleOrLengthOpts<T.PsString[]>): T.VBE {
        if (vba.type === "welded") {
            return {
                ...vba,
                right: addToVBBasicEnd(vba.right, ending),
                person,
            };
        }
        return {
            ...addToVBBasicEnd(vba, ending),
            person,
        }
    }
    function addToVBBasicEnd(vb: T.VBBasic, end: T.SingleOrLengthOpts<T.PsString[]>): T.VBBasic {
        if ("long" in vb.ps) {
            const endLong = getLength(end, "long");
            const endShort = getLength(end, "short");
            // TODO: this is hacky
            const rsLong: T.PsString[] = vb.ps.long[0].f === "tlul"
                ? [{ p: "تلل", f: "tlúl" }]
                : vb.ps.long;
            return {
                ...vb,
                ps: {
                    long: verbEndingConcat(rsLong, endLong),
                    short: pastThird && basicForm
                        ? ensure3rdPast(endShort, vb.ps.short, verb, aspect)
                        : verbEndingConcat(vb.ps.short, endShort),
                },
            };
        }
        /* istanbul ignore next */
        if ("long" in end) {
            throw new Error("should not be using verb stems with long and short endings");
        }
        return {
            ...vb,
            ps: verbEndingConcat(vb.ps, end),
        };
    }
}

function getEnding(person: T.Person, isPast: boolean) {
    const [row, col] = getVerbBlockPosFromPerson(person);
    return isPast ? {
        long: pastEndings.long[row][col],
        short: pastEndings.short[row][col],
    } : presentEndings[row][col];
}

// TODO: THIS IS PROBABLY SKEEEETCH
function ensure3rdPast(rs: T.PsString[], ending: T.PsString[], verb: T.VerbEntry, aspect: T.Aspect): T.PsString[] {
    if (isKedul(verb) && rs[0].p === "شو") {
        return [{ p: "شو", f: "sho" }];
    }
    if (isKawulVerb(verb) && rs[0].p === "کړ") {
        return [
            { p: "کړ", f: "kuR" },
            { p: "کړه", f: "kRu" },
            { p: "کړو", f: "kRo" },
        ];
    }
    if (isTlulVerb(verb)) {
        if (aspect === "perfective") {
            return [{ p: "غی", f: "ghey" }];
        }
        const specialTuShort: T.PsString = {
            p: rs[0].p.slice(0, -1) + "ه",
            f: rs[0].f.slice(0, -1) + (rs[0].f === "tl" ? "u" : "ú"),
        };
        return [
            specialTuShort,
            concatPsString(rs[0], { p: "و", f: "o" }),
        ];
    }
    if (verb.entry.tppp && verb.entry.tppf) {
        const tip = makePsString(verb.entry.tppp, verb.entry.tppf)
        // if it ends in a consonant, the special form will also have another
        // variation ending with a ه - u
        const endsInAConsonant = (pashtoConsonants.includes(tip.p.slice(-1)) || tip.f.slice(-1) === "w");
        return [
            tip,
            ...endsInAConsonant ? [
                concatPsString(tip, { p: "ه", f: "u" }),
                concatPsString(tip, { p: "و", f: "o" }),
            ] : [],
        ];
    }
    const endsInAwul = (
        (["awul", "awúl"].includes(removeFVarients(verb.entry.f).slice(-4)))
        &&
        (verb.entry.p.slice(-2) === "ول")
    );
    // TODO: check about verbs like tawul (if they exist)
    if (endsInAwul) {
        const base = { p: rs[0].p.slice(0, -1), f: rs[0].f.slice(0, -2) };
        return [concatPsString(base, { p: "اوه", f: "aawu" })];
    }
    const endsInDental = ["د", "ت"].includes(rs[0].p.slice(-1));
    // short endings like ورسېد
    return (endsInDental ? [
        "",
        ...ending,
    ] : ending).map(e => concatPsString(rs[0], e));
}

function getAspect(tense: T.VerbTense | T.AbilityTense): T.Aspect {
    const t = tense.replace("Modal", "");
    if (["presentVerb", "imperfectiveFuture", "imperfectivePast", "habitualImperfectivePast"].includes(t)) {
        return "imperfective";
    } else {
        return "perfective";
    }
}

function isKedul(v: T.VerbEntry): boolean {
    return v.entry.p === "کېدل";
}

function perfectTenseToEquative(t: T.PerfectTense): keyof typeof equativeEndings {
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
        : "subjunctive"
}