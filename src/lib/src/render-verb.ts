import * as T from "../../types";
import {
    functionOnOptLengths,
    getPersonInflectionsKey,
    getVerbBlockPosFromPerson,
    noPersInfs,
    personGender,
    personIsPlural,
    personNumber,
} from "./misc-helpers";
import {
    yulEndingInfinitive,
} from "./p-text-helpers";
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

// TODO: problem with laaR - no perfective split
// TODO: are azmóyulum and wáayulo really not just azmoyúlum and waayúlo ?
// TODO: automatic 3rd person idiosyncronizing of raTul raaTu, shaRul, shaaRu, rasedul rased etc

export function renderVerb({ verb, tense, person, voice }: {
    verb: T.VerbEntry,
    tense: T.VerbTense | T.PerfectTense | T.ModalTense, // TODO: make T.Tense
    person: T.Person,
    voice: T.Voice,
}): {
    hasBa: boolean,
    verbBlocks: T.VB[],
} {
    // TODO: check for transitivity with passive voice ??

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
    const perfectiveHeadBlock: T.PH | undefined = perfectiveHead ? {
        type: "PH",
        // should only need this for tlul and Daaredul? 
        ps: fromPersInfls(perfectiveHead, person),
    } : undefined;
    const ending = getEnding(person, isPast);
    if (isAbility) {
        const [vb, shPart] = getAbilityVerbBlocks({ verb, isPast, person, root: rootStem, aspect, voice });
        return {
            hasBa,
            verbBlocks: (perfectiveHeadBlock && voice === "active")
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
    const verbBlock: T.VA = {
        type: "VA",
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
}): T.Welded {
    /* istanbul ignore next */
    if (!("long" in root)) {
        throw new Error("should have length versions in roots for passive");
    }
    const { verbBlocks: [auxVerb] } = renderVerb({
        verb: kedulStatVerb,
        tense,
        person,
        voice: "active",
    }) as { hasBa: boolean, verbBlocks: [T.VA] };
    return weld(
        {
            type: "VI",
            ps: [root.long],
        },
        auxVerb,
    );
}

function getAbilityVerbBlocks({ verb, isPast, person, root, aspect, voice }: {
    verb: T.VerbEntry,
    isPast: boolean,
    person: T.Person,
    root: T.SingleOrLengthOpts<T.PsString>,
    aspect: T.Aspect,
    voice: T.Voice,
}): T.VB[] {
    /* istanbul ignore next */
    if (!("long" in root)) {
        throw new Error("should have length versions in roots for passive");
    }
    const noPerfective = isTlulVerb(verb) || isKedul(verb);
    const shBlock = getAbilityShPart(isPast, person);
    if (voice === "passive") {
        return [
            weld(
                {
                    type: "VI",
                    ps: [root.long],
                },
                {
                    type: "VI",
                    ps: addAbilityTailsToRs({
                        long: { p: "کېدل", f: "kedúl" },
                        short: { p: "کېد", f: "ked" },
                    }, aspect, true),
                },
            ),
            shBlock,
        ];
    }
    // TODO: this is redundant, we did it in another part of the program?
    const verbBlock: T.VI = {
        type: "VI",
        ps: addAbilityTailsToRs(root, aspect, noPerfective),
    };
    return [verbBlock, shBlock];
    function getAbilityShPart(isPast: boolean, person: T.Person): T.VA {
        // TODO: optimized shortcut version of this
        const { verbBlocks: [shBlock] } = renderVerb({
            verb: kedulStatVerb,
            tense: isPast ? "perfectivePast" : "subjunctiveVerb",
            person,
            voice: "active",
        }) as {
            hasBa: boolean,
            verbBlocks: [T.VA],
        };
        return {
            type: "VA",
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
}): T.VB[] {
    const vInfo = getVerbInfo(verb.entry) as T.SimpleVerbInfo;

    // TODO: put this in a seperate function?
    
    if (voice === "passive") {
        const [pt, eq] = getKedulStatPerfect(person, tense);
        const passiveRoot: T.VI = {
            type: "VI",
            ps: [noPersInfs(vInfo.root.imperfective).long],
        };
        const welded: T.Welded = weld(passiveRoot, pt);
        return [welded, eq];
    }

    const equative = equativeEndings[perfectTenseToEquative(tense)];
    const [row, col] = getVerbBlockPosFromPerson(person);
    const equativeBlock: T.EQ = {
        type: "EQ",
        person,
        ps: "long" in equative ? {
            long: equative.long[row][col],
            short: equative.short[row][col],
        } : equative[row][col],
    }

    const participleBlock: T.PT = {
        type: "PT",
        gender: personGender(person),
        number: personNumber(person),
        ps: chooseParticipleInflection(inflectYey(noPersInfs(vInfo.participle.past)), person)
    }
    return [participleBlock, equativeBlock];
}

function weld(left: T.VI, right: T.VA | T.PT | T.VI): T.Welded {
    return {
        type: "welded",
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
            ? ensure3rdPast(endShort, rs.short, verb, aspect)
            : endShort.map(e => concatPsString(rs.short, e));
        // TODO: this is a bit hacky
        const rsLong = rs.long.f === "tlul"
            ? { p: "تلل", f: "tlúl" }
            : rs.long;
        return {
            long: endLong.map(safeEndAdd(rsLong)),
            short: aspect === "imperfective"
                ? applyImperfectiveShortAccent(shortForm, yulEndingInfinitive(removeFVarients(verb.entry)))
                : shortForm,
        };
    }
    /* istanbul ignore next */
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
    const gender = personGender(p);
    const infNum = personIsPlural(p) ? 1 : 0;
    return pinf[gender][infNum];
}

function addAbilityTailsToRs(rs: T.LengthOptions<T.PsString>, aspect: T.Aspect, noPerfective: boolean): T.SingleOrLengthOpts<T.PsString[]> {
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
    // TODO: remove this hack - get proper working thing for accentOnNFromEnd not adding accent on 1 syllable words
    if (form[0].f === "tu") {
        return form;
    }
    return form.map(f => {
        return accentOnNFromEnd(f, yulEnding ? 1 : 0);
    });
}

function ensure3rdPast(ending: T.PsString[], rs: T.PsString, verb: T.VerbEntry, aspect: T.Aspect): T.PsString[] {
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
    if (isTlulVerb(verb)) {
        if (aspect === "perfective") {
            return [{ p: "غی", f: "ghey" }];
        }
        const specialTuShort: T.PsString = {
            p: rs.p.slice(0, -1) + "ه",
            f: rs.f.slice(0, -1) + (rs.f === "tl" ? "u" : "ú"),
        };
        return [
            specialTuShort,
            concatPsString(rs, { p: "و", f: "o" }),
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
        const base = { p: rs.p.slice(0, -1), f: rs.f.slice(0, -2) };
        return [concatPsString(base, { p: "اوه", f: "aawu" })];
    }
    const endsInDental = ["د", "ت"].includes(rs.p.slice(-1));
    // short endings like ورسېد
    return (endsInDental ? [
        "",
        ...ending,
    ] : ending).map(e => concatPsString(rs, e));
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

function getKedulStatPerfect(person: T.Person, tense: T.PerfectTense): [T.PT, T.EQ] {
    const { verbBlocks: [pt, eq] } = renderVerb({
        verb: kedulStatVerb,
        tense,
        person,
        voice: "active",
    }) as { hasBa: true, verbBlocks: [T.PT, T.EQ] };
    return [pt, eq];
}