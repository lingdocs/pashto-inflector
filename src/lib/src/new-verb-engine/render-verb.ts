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
import { getPastParticiple, getRootStem } from "./roots-and-stems";
import { getAspect, isKedul, perfectTenseToEquative, verbEndingConcat } from "./rs-helpers";
import { accentOnNFromEnd, removeAccents } from "../accent-helpers";
// TODO: problem with laaR - no perfective split
// TODO: non past compounds with different object
// TODO: coverage of rs-helpers

export function renderVerb({ verb, tense, person, voice, presObj }: {
    verb: T.VerbEntry,
    tense: T.VerbTense | T.PerfectTense | T.AbilityTense, // TODO: make T.Tense
    person: T.Person,
    voice: T.Voice,
    presObj?: T.Person,
}): {
    hasBa: boolean,
    vbs: T.VerbRenderedOutput,
} {
    if (isPerfectTense(tense)) {
        return renderPerfectVerb({ verb, tense, voice, person });
    }
    const isPast = isPastTense(tense);
    const rootPerson = isPast ? person : (presObj ?? person);

    const hasBa = tenseHasBa(tense);
    const genderNumber = {
        gender: personGender(rootPerson),
        number: personNumber(rootPerson),
    };
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
    // TODO: Tighter typing on the output for T.VB (enforce genderNumber?)
}): { hasBa: boolean, vbs: [[], [T.VB, T.VBE]] } {
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
            if (vb.ps.short[0].f === "ghl" && pastThird && basicForm) {
                return {
                    ...vb,
                    ps: [{ p: "غی", f: "ghey" }],
                };
            }
            const endLong = getLength(end, "long");
            const endShort = getLength(end, "short");
            // TODO: this is hackyۉ
            return {
                ...vb,
                ps: {
                    long: verbEndingConcat(vb.ps.long, endLong),
                    short: pastThird && basicForm
                        ? ensure3rdPast(vb.ps.short, endShort, verb, aspect)
                        : verbEndingConcat(vb.ps.short, endShort),
                    ...vb.ps.mini ? {
                        mini: verbEndingConcat(vb.ps.mini, endShort),
                    } : {},
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
        return [{
            p: rs[0].p.slice(0, -1) + "ه",
            f: rs[0].f.slice(0, -2) + "ú",
        }];
    }
    if (verb.entry.tppp && verb.entry.tppf) {
        const tip = removeAccents(verb.entry.separationAtP !== undefined
            ? makePsString(verb.entry.tppp.slice(verb.entry.separationAtP), verb.entry.tppf.slice(verb.entry.separationAtF))
            : makePsString(verb.entry.tppp, verb.entry.tppf));
        const aTip = aspect === "imperfective"
            ? accentOnNFromEnd(tip, 0)
            : tip;
        return [aTip];
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
    const endsInAwul = (
        (["awul", "awúl"].includes(removeFVarients(verb.entry.f).slice(-4)))
        &&
        (verb.entry.p.slice(-2) === "ول")
    );
    // TODO: check about verbs like tawul (if they exist)
    if (endsInAwul) {
        const base = { p: rs[0].p.slice(0, -1), f: rs[0].f.slice(0, -2) };
        const aawuEnd = concatPsString(base, { p: "اوه", f: base.f.charAt(base.f.length-1) === "a" ? "awu" : "aawu" });
        return [aspect === "imperfective"
            ? accentOnNFromEnd(aawuEnd, 0)
            : aawuEnd];
    }
    const endsInDental = ["د", "ت"].includes(rs[0].p.slice(-1));
    // short endings like ورسېد
    const ends = endsInDental ? [{ p: "", f: "" }, ...ending] : ending;
    return verbEndingConcat(rs, ends);
}
