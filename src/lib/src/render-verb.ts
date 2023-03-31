import {
    functionOnOptLengths,
    getPersonInflectionsKey,
    getVerbBlockPosFromPerson,
    noPersInfs,
    personGender,
    personIsPlural,
} from "./misc-helpers";
import {
    yulEndingInfinitive,
} from "./p-text-helpers";
import * as T from "../../types";
import {
    concatPsString,
    getLength,
} from "./p-text-helpers";
import {
    presentEndings,
    pastEndings,
    equativeEndings,
} from "./grammar-units";
import { isKawulVerb, isModalTense, isPerfectTense, isTlulVerb } from "./type-predicates";
import { tenseHasBa } from "./phrase-building/vp-tools";
import { inflectYey } from "./pashto-inflector";
import {
    getVerbInfo,
} from "./verb-info";
import { isPastTense } from "./phrase-building/vp-tools"; 
import { makePsString, removeFVarients } from "./accent-and-ps-utils";
import { pashtoConsonants } from "./pashto-consonants";
import { accentOnNFromEnd, removeAccents } from "./accent-helpers";

const kedulStatVerb: T.VerbEntry = {
    entry: {"ts":1581086654898,"i":11100,"p":"کېدل","f":"kedul","g":"kedul","e":"to become _____","r":2,"c":"v. intrans.","ssp":"ش","ssf":"sh","prp":"شول","prf":"shwul","pprtp":"شوی","pprtf":"shúwey","noOo":true,"ec":"become"} as T.VerbDictionaryEntry,
};

// export type RenderedVerbB = VerbRenderedBlock
//     | PerfectiveHeadBlock
//     | ModalVerbBlock
//     | ModalVerbKedulPart
//     | PerfectEquativeBlock
//     | PerfectParticipleBlock;

// export type PerfectiveHeadBlock = { type: "perfectiveHead", ps: PsString };
// export type VerbRenderedBlock = {
//     type: "verb",
//     block: Omit<VerbSelectionComplete, "object"> & {
//         hasBa: boolean,
//         ps: SingleOrLengthOpts<PsString[]>,
//         person: Person,
//         complementWelded: undefined | Rendered<ComplementSelection> | Rendered<UnselectedComplementSelection>,
//     },
// };

// TODO the welded block with passive is the same as the stative compounds

type VB = PH | VA | VPlain | PT | EQ | Welded;

type PH = {
    type: "perfectiveHeadBlock",
    ps: T.PsString,
};

type VA = {
    type: "verbBlockWithAgreement",
    ps: T.SingleOrLengthOpts<T.PsString[]>,
    person: T.Person,
};

type VPlain = {
    type: "verbBlockWithoutAgreement",
    ps: T.SingleOrLengthOpts<T.PsString[]>,
};

type PT = {
    type: "participleBlock",
    ps: T.SingleOrLengthOpts<T.PsString[]>,
    inflection: T.PersonInflectionsField,
};

type EQ = {
    type: "equativeBlock",
    ps: T.SingleOrLengthOpts<T.PsString[]>,
    person: T.Person,
};

type Welded = {
    type: "weldedBlock",
    left: VPlain, // TODO - will get more complex with compounds
    right: VA | PT | VPlain,
}

// TODO: problem with laaR - no perfective split

export function renderVerb({ verb, tense, person, voice }: {
    verb: T.VerbEntry,
    tense: T.VerbTense | T.PerfectTense | T.ModalTense, // TODO: make T.Tense
    person: T.Person,
    voice: T.Voice,
}): {
    hasBa: boolean,
    verbBlocks: VB[],
} {
    // WARNING: this only works with simple verbs
    const hasBa = tenseHasBa(tense);
    if (isPerfectTense(tense)) {
        return {
            hasBa,
            verbBlocks: getPerfectBlocks({ verb, tense, person, voice }),
        };
    }
    const isPast = isPastTense(tense);
    const aspect = getAspect(tense);
    const isAbility = isModalTense(tense);
    const { perfectiveHead, rootStem } = getRootStem({
        verb, aspect, isPast, isAbility, person, voice
    });
    const perfectiveHeadBlock: PH | undefined = perfectiveHead ? {
        type: "perfectiveHeadBlock",
        // should only need this for tlul and Daaredul? 
        ps: fromPersInfls(perfectiveHead, person),
    } : undefined;
    // if (voice === "passive") {
    //     const kedulPart = getPassiveVerbBlocks(tense, person, aspect, rootStem);
    //     return {
    //         hasBa,
    //         // @ts-ignore
    //         verbBlocks: perfectiveHeadBlock
    //             ? [perfectiveHeadBlock, kedulPart]
    //             : [kedulPart],
    //     }
    // }
    const ending = getEnding(person, isPast);
    if (isAbility) {
        const [vb, shPart] = getAbilityVerbBlocks({ verb, isPast, person, rootStem, aspect, voice });
        return {
            hasBa,
            verbBlocks: perfectiveHeadBlock
                ? [perfectiveHeadBlock, vb, shPart]
                : [vb, shPart],
        };
    }
    if (voice === "passive") {
        const vbs = getPassiveVerbBlocks({ root: rootStem, tense, person });
        return {
            hasBa,
            verbBlocks: [
               ...perfectiveHeadBlock ? [perfectiveHeadBlock] : [],
               vbs, 
            ],
        };
    }
    const verbBlock: VA = {
        type: "verbBlockWithAgreement",
        ps: addEnding({
            rootStem, ending, person, isPast, verb, aspect,
        }),
        person,
    };
    return {
        hasBa,
        verbBlocks: perfectiveHeadBlock ? [
            perfectiveHeadBlock, verbBlock,
        ] : [verbBlock],
    }
}

function getPassiveVerbBlocks({ root, tense, person }: {
    root: T.SingleOrLengthOpts<T.PsString>,
    tense: T.VerbTense,
    person: T.Person,
}): Welded {
    if (!("long" in root)) {
        throw new Error("should have length versions in roots for passive");
    }
    const { verbBlocks: [auxVerb] } = renderVerb({
        verb: kedulStatVerb,
        tense,
        person,
        voice: "active",
    }) as { hasBa: boolean, verbBlocks: [VA] };
    return weld(
        {
            type: "verbBlockWithoutAgreement",
            ps: [root.long],
        },
        auxVerb,
    );
}

function getAbilityVerbBlocks({ verb, isPast, person, rootStem, aspect, voice }: {
    verb: T.VerbEntry,
    isPast: boolean,
    person: T.Person,
    rootStem: T.SingleOrLengthOpts<T.PsString>,
    aspect: T.Aspect,
    voice: T.Voice,
}): VB[] {
    const noPerfective = isTlulVerb(verb) || isKedul(verb);
    const shBlock = getAbilityShPart(isPast, person);
    // TODO: this is redundant, we did it in another part of the program?
    const verbBlock: VPlain = {
        type: "verbBlockWithoutAgreement",
        ps: addAbilityTailsToRs(rootStem, aspect, noPerfective),
    };
    return [verbBlock, shBlock];
    function getAbilityShPart(isPast: boolean, person: T.Person): VA {
        // TODO: optimized shortcut version of this
        const { verbBlocks: [shBlock] } = renderVerb({
            verb: kedulStatVerb,
            tense: isPast ? "perfectivePast" : "subjunctiveVerb",
            person,
            voice: "active",
        }) as {
            hasBa: boolean,
            verbBlocks: [VA],
        };
        return {
            type: "verbBlockWithAgreement",
            ps: shBlock.ps,
            person,
        }; 
    }
}

function getPerfectBlocks({ verb, tense, person, voice }: {
    verb: T.VerbEntry,
    tense: T.PerfectTense,
    person: T.Person,
    voice: T.Voice,
}): VB[] {
    const vInfo = getVerbInfo(verb.entry) as T.SimpleVerbInfo;

    // TODO: put this in a seperate function?
    
    if (voice === "passive") {
        const [pt, eq] = getKedulStatPerfect(person, tense);
        const passiveRoot: VPlain = {
            type: "verbBlockWithoutAgreement",
            ps: [noPersInfs(vInfo.root.imperfective).long],
        };
        const welded: Welded = weld(passiveRoot, pt);
        return [welded, eq];
    }

    const equative = equativeEndings[perfectTenseToEquative(tense)];
    const [row, col] = getVerbBlockPosFromPerson(person);
    const equativeBlock: EQ = {
        type: "equativeBlock",
        person,
        ps: "long" in equative ? {
            long: equative.long[row][col],
            short: equative.short[row][col],
        } : equative[row][col],
    }




    const participleBlock: PT = {
        type: "participleBlock",
        inflection: getPersonInflectionsKey(person),
        ps: chooseParticipleInflection(inflectYey(noPersInfs(vInfo.participle.past)), person)
    }
    return [participleBlock, equativeBlock];
}

function weld(left: VPlain, right: VA | PT | VPlain): Welded {
    return {
        type: "weldedBlock",
        left: {
           ...left,
           ps: functionOnOptLengths(left.ps, removeAccents), 
        },
        right,
    };
}

function getRootStem({ verb, aspect, isPast, isAbility, voice, person }: {
    verb: T.VerbEntry,
    aspect: T.Aspect,
    isPast: boolean,
    isAbility: boolean,
    person: T.Person,
    voice: T.Voice,
}): {
    perfectiveHead: undefined | T.OptionalPersonInflections<T.PsString>,
    rootStem: T.SingleOrLengthOpts<T.PsString>,
} {
    const vInfo = getVerbInfo(verb.entry) as T.SimpleVerbInfo;
    const noPerfective = isTlulVerb(verb) || isKedul(verb);
    const rs = vInfo[(isPast || isAbility || voice === "passive") ? "root" : "stem"];
    if (noPerfective && isAbility) {
        // exception with tlul verbs for ability stems
        return {
            perfectiveHead: undefined,
            rootStem: noPersInfs(rs.imperfective),
        };
    }
    if (aspect === "perfective" && rs.perfectiveSplit) {
        return extractPerfectiveSplit(rs.perfectiveSplit);
    }
    return {
        perfectiveHead: undefined,
        // because the persInfs only happen with stative compound verbs,j
        // which we are handling differently now 
        rootStem: noPersInfs(rs[aspect]),
    }

    function extractPerfectiveSplit(splitInfo: T.SplitInfo): ReturnType<typeof getRootStem> {
        // this is just for tlul and Daredul ?
        const si = fromPersInfls(splitInfo, person);
        if ("long" in si) {
            return {
                perfectiveHead: si.long[0],
                rootStem: {
                    long: si.long[1],
                    short: si.short[1],
                }
            }
        } else {
            return {
                perfectiveHead: si[0],
                rootStem: si[1],
            }
        }
    }
}

function addEnding({ rootStem, ending, person, isPast, verb, aspect }:{
    rootStem: T.SingleOrLengthOpts<T.PsString>,
    ending: T.SingleOrLengthOpts<T.PsString[]>,
    person: T.Person,
    isPast: boolean,
    verb: T.VerbEntry,
    aspect: T.Aspect,
}): T.SingleOrLengthOpts<T.PsString[]> {
    // TODO: no need for useless abbreviation now
    const rs = rootStem;
    const end = ending;
    const idiosyncratic3rdPast = isPast && person === T.Person.ThirdSingMale;
    const safeEndAdd = (rs: T.PsString) => (ending: T.PsString): T.PsString => (
        (ending.p === "ل" && rs.p.slice(-1) === "ل")
            ? rs
            : concatPsString(rs, ending)
    );
    if ("long" in rs) {
        const endLong = getLength(end, "long");
        const endShort = getLength(end, "short");
        const shortForm = idiosyncratic3rdPast
            ? ensure3rdPast(endShort, rs.short, verb)
            : endShort.map(e => concatPsString(rs.short, e));
        return {
            long: endLong.map(safeEndAdd(rs.long)),
            short: aspect === "imperfective"
                ? applyImperfectiveShortAccent(shortForm, yulEndingInfinitive(removeFVarients(verb.entry)))
                : shortForm,
        };
    }
    if ("long" in end) {
        throw new Error("should not be using verb stems with long and short endings");
    }
    return end.map((e) => concatPsString(rs, e));
}

function getEnding(person: T.Person, isPast: boolean) {
    const [row, col] = getVerbBlockPosFromPerson(person);
    return isPast ? {
        long: pastEndings.long[row][col],
        short: pastEndings.short[row][col],
    } : presentEndings[row][col];
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
        : t === "subjunctivePerfect"
        ? "subjunctive"
        : t === "wouldBePerfect"
        ? "past"
        : "subjunctive"
}

function chooseParticipleInflection(pinf: T.SingleOrLengthOpts<T.UnisexInflections>, p: T.Person): T.SingleOrLengthOpts<T.PsString[]> {
    if ("long" in pinf) {
        return {
            short: chooseParticipleInflection(pinf.short, p) as T.PsString[],
            long: chooseParticipleInflection(pinf.long, p) as T.PsString[],
        };
    }
    if ("masc" in pinf) {
        const gender = personGender(p);
        const infNum = personIsPlural(p) ? 1 : 0;
        return pinf[gender][infNum];
    }
    return pinf; // already just one thing
}

function addAbilityTailsToRs(rs: T.SingleOrLengthOpts<T.PsString>, aspect: T.Aspect, noPerfective: boolean): T.SingleOrLengthOpts<T.PsString[]> {
    if (!("long" in rs)) {
        throw new Error("rootStem for ability verb should have short and long versions");
    }
    const tails: T.PsString[] = [
        { p: "ی", f: "ey" },
        { p: "ای", f: "aay" },
    ];
    const accentedTails: T.PsString[] = [
        { p: "ی", f: "éy" },
        { p: "ای", f: "áay" },
    ];
    // for single syllable long verb stems like tlul - ensure the accent
    const psLong = (aspect === "perfective" && !noPerfective)
        ? removeAccents(rs.long)
        : ensureAccentLongStem(rs.long);
    return {
        long: tails.map(t => concatPsString(psLong, t)),
        short: (aspect === "perfective" && !noPerfective ? tails : accentedTails)
            .map(t => concatPsString(rs.short, t)),
    };
}

function applyImperfectiveShortAccent(form: T.PsString[], yulEnding: boolean): T.PsString[] {
    return form.map(f => {
        return accentOnNFromEnd(f, yulEnding ? 1 : 0);
    });
}

function ensure3rdPast(ending: T.PsString[], rs: T.PsString, verb: T.VerbEntry): T.PsString[] {
    if (isKedul(verb) && rs.p === "شو") {
        return [{ p: "شو", f: "sho" }];
    }
    if (isKawulVerb(verb) && rs.p === "کړ") {
        return [
            { p: "کړ", f: "kuR" },
            { p: "کړه", f: "kRu" },
            { p: "کړو", f: "kRo" },
        ];
    }
    if (isTlulVerb(verb) && rs.p === "غل") {
        return [{ p: "غی", f: "ghey" }];
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
        const base = { p: rs.p.slice(0, -1), f: rs.f.slice(0, -2) };
        return [concatPsString(base, { p: "اوه", f: "aawu" })];
    }

    // nothing special or idiosyncratic needed for 3rd pers masc sing past
    return ending.map(e => concatPsString(rs, e));
}

function getAspect(tense: T.VerbTense | T.ModalTense): T.Aspect {
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

function fromPersInfls<U extends object>(x: T.OptionalPersonInflections<U>, person: T.Person): U {
    if ("mascSing" in x) {
        return x[getPersonInflectionsKey(person)];
    } else {
        return x;
    }
}

function ensureAccentLongStem(ps: T.PsString): T.PsString {
    if (ps.f.charAt(ps.f.length - 2) === "ú") {
        return ps;
    }
    return {
        p: ps.p,
        f: ps.f.slice(0, -2) + "úl",
    };
}

function getKedulStatPerfect(person: T.Person, tense: T.PerfectTense): [PT, EQ] {
    const { verbBlocks: [pt, eq] } = renderVerb({
        verb: kedulStatVerb,
        tense,
        person,
        voice: "active",
    }) as { hasBa: true, verbBlocks: [PT, EQ] };
    return [pt, eq];
}