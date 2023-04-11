/**
 * Copyright (c) 2023 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    concatPsString, trimOffPs,
} from "../p-text-helpers";
import * as T from "../../../types";
import { makePsString, removeFVarientsFromVerb } from "../accent-and-ps-utils";
import { accentOnNFromEnd, accentSyllable, removeAccents } from "../accent-helpers";
import { isKawulVerb, isTlulVerb } from "../type-predicates";
import { vEntry, addAbilityEnding, weld, removeL, addTrailingAccent, tlulPerfectiveStem, getLongVB, possiblePPartLengths, isStatComp, statCompImperfectiveSpace, makeComplement } from "./rs-helpers";
import { inflectPattern3 } from "./new-inflectors";

const kedulStat = vEntry({"ts":1581086654898,"i":11100,"p":"کېدل","f":"kedul","g":"kedul","e":"to become _____","r":2,"c":"v. intrans.","ssp":"ش","ssf":"sh","prp":"شول","prf":"shwul","pprtp":"شوی","pprtf":"shúwey","noOo":true,"ec":"become"});
const kawulStat = vEntry({"ts":1579015359582,"i":11030,"p":"کول","f":"kawul","g":"kawul","e":"to make ____ ____ (as in \"He's making me angry.\")","r":4,"c":"v. trans.","ssp":"کړ","ssf":"kR","prp":"کړل","prf":"kRul","pprtp":"کړی","pprtf":"kúRey","noOo":true,"ec":"make,makes,making,made,made"});

const shwulVB: T.VBBasic = {
    type: "VB",
    ps: {
        long: [{ p: "شول", f: "shwul" }],
        short: [{ p: "شو", f: "shw" }],
    },
}
const shVB: T.VBBasic = {
    type: "VB",
    ps: [{ p: "ش", f: "sh" }],
}

// TODO: figure out how to handle dynamic / stative verbs
export function getRootStem({ verb, rs, aspect, type, genderNumber, voice }: {
    verb: T.VerbEntry,
    rs: "root" | "stem",
    aspect: T.Aspect,
    voice: T.Voice,
    type: "basic" | "ability",
    genderNumber: {
        gender: T.Gender,
        number: T.NounNumber,
    },
}): T.RootsStemsOutput {
    const v = removeFVarientsFromVerb(verb);
    if (type === "ability") {
        return getAbilityRs(v, aspect, rs, voice, genderNumber);
    }
    if (voice === "passive") {
        return getPassiveRs(v, aspect, rs, genderNumber);
    }
    return rs === "stem"
        ? aspect === "imperfective"
            ? getImperfectiveStem(v, genderNumber)
            : getPerfectiveStem(v, genderNumber)
        : aspect === "imperfective"
            ? getImperfectiveRoot(v, genderNumber)
            : getPerfectiveRoot(v, genderNumber);
}

function getAbilityRs(
    verb: T.VerbEntryNoFVars,
    aspect: T.Aspect,
    rs: "root" | "stem",
    voice: T.Voice,
    genderNum: T.GenderNumber,
): [[] | [T.VHead], [T.VB, T.VBA]] {
    const losesAspect = isTlulVerb(verb) || (isStatComp(verb) && verb.entry.c?.includes("intrans."));
    const [vhead, [basicroot]] = voice === "passive"
        // passive ability loses aspect
        ? getPassiveRs(verb, "imperfective", "root", genderNum)
        : aspect === "imperfective" || losesAspect
        ? getImperfectiveRoot(verb, genderNum)
        : getPerfectiveRoot(verb, genderNum);
    return [
        vhead, 
        [
            addAbilityEnding(basicroot),
            rs === "root" ? shwulVB : shVB,
        ],
    ];
}

// TODO: kuRee shuwey etc
export function getPastParticiple(verb: T.VerbEntry, voice: T.Voice, { gender, number }: { gender: T.Gender, number: T.NounNumber }): T.VBGenNum | T.WeldedGN {
    const v = removeFVarientsFromVerb(verb);
    if (voice === "passive") {
        return getPassivePp(v, { gender, number });
    }
    if (verb.entry.pprtp && verb.entry.pprtf) {
        const base = makePsString(verb.entry.pprtp, verb.entry.pprtf);
        return {
            type: "VB",
            ps: inflectPattern3(base, { gender, number }),
            gender,
            number,
        };
    }
    const basicRoot = getImperfectiveRoot(removeFVarientsFromVerb(verb), { gender, number })[1][0];
    const longRoot = getLongVB(basicRoot);
    const rootWLengths = possiblePPartLengths(longRoot);

    if ("right" in rootWLengths) {
        return {
            ...rootWLengths,
            right: {
                ...rootWLengths.right,
                ps: addTail(rootWLengths.right.ps),
                gender,
                number,
            },
        };
    } else {
        return {
            ...rootWLengths,
            ps: addTail(rootWLengths.ps),
            gender,
            number,
        };
    }
    
    function addTail(ps: T.SingleOrLengthOpts<T.PsString[]>): T.SingleOrLengthOpts<T.PsString[]> {
        if ("long" in ps) {
            return {
                long: addTail(ps.long) as T.PsString[],
                short: addTail(ps.short) as T.PsString[],
            };
        }
        const withTail = concatPsString(ps[0], { p: "ی", f: "ey"});
        return inflectPattern3(withTail, { gender, number });
    }
}

function getPassivePp(verb: T.VerbEntryNoFVars, genderNumber: T.GenderNumber): T.WeldedGN {
    const basicRoot = getImperfectiveRoot(verb, genderNumber)[1][0];
    const longRoot = getLongVB(basicRoot);
    const kedulVb: T.VBGenNum = getPastParticiple(kedulStat, "active", genderNumber) as T.VBGenNum;
    return weld(longRoot, kedulVb);
}

// TODO: could combine these two functions...
function getPassiveRs(verb: T.VerbEntryNoFVars, aspect: T.Aspect, rs: "root" | "stem", genderNumber: T.GenderNumber): [[] | [T.VHead], [T.VBA]] {
    const [vHead, [basicRoot]] = (aspect === "imperfective"
        ? getImperfectiveRoot
        : getPerfectiveRoot
    )(verb, genderNumber);
    const longRoot = getLongVB(basicRoot);
    const kedulVba = getRootStem({ verb: kedulStat, aspect, rs, type: "basic", voice: "active", genderNumber: { gender: "masc", number: "singular" }})[1][0] as T.VBBasic;
    return [
        vHead,
        [weld(longRoot, kedulVba)],
    ];
}

function getImperfectiveRoot(verb: T.VerbEntryNoFVars, genderNum: T.GenderNumber): [[], [T.VBA]] {
    if (verb.complement && isStatComp(verb) && statCompImperfectiveSpace(verb)) {
        const auxStem = getImperfectiveRoot(verb.entry.c?.includes("intrans.")
            ? kedulStat
            : kawulStat
        , genderNum)[1][0];
        return [
            [],
            [
                weld(
                    makeComplement(verb.complement, genderNum),
                    auxStem as T.VBBasic,
                ),
            ],
        ];
    }
    const infinitive = accentOnNFromEnd(makePsString(verb.entry.p, verb.entry.f), 0);
    return [
        [],
        [
            {
                type: "VB",
                ps: {
                    long: [infinitive],
                    short: [addTrailingAccent(removeL(infinitive))],
                },
            },
        ],
    ];
}

function getPerfectiveRoot(verb: T.VerbEntryNoFVars, genderNum: T.GenderNumber): [[T.VHead] | [], [T.VBA]] {
    if (verb.complement && isStatComp(verb)) {
        const auxStem = getPerfectiveRoot(verb.entry.c?.includes("intrans.")
            ? kedulStat
            : kawulStat,
        genderNum)[1][0];
        return [
            [makeComplement(verb.complement, genderNum)],
            [auxStem as T.VBBasic],
        ];
    }
    const base = removeAccents(
        (verb.entry.prp && verb.entry.prf)
            ? makePsString(verb.entry.prp, verb.entry.prf)
            : makePsString(verb.entry.p, verb.entry.f)
    );
    const [perfectiveHead, rest] = getPerfectiveHead(base, verb);
    return [
        perfectiveHead ? [perfectiveHead] : [],
        [
            {
                type: "VB",
                ps: {
                    long: [rest],
                    short: [removeL(rest)],
                    ...isKawulVerb(verb) ? {
                        mini: [{ p: "ک", f: "k" }],
                    } : {},
                },
            },
        ],
    ];
}

function getImperfectiveStem(verb: T.VerbEntryNoFVars, genderNum: T.GenderNumber): [[], [T.VB]] {
    if (verb.complement && isStatComp(verb) && statCompImperfectiveSpace(verb)) {
        const auxStem = getImperfectiveStem(verb.entry.c?.includes("intrans.")
            ? kedulStat
            : kawulStat,
        genderNum)[1][0];
        return [
            [],
            [
                weld(
                    makeComplement(verb.complement, genderNum),
                    auxStem as T.VBBasic,
                ),
            ],
        ];
    }
    if (verb.entry.psp && verb.entry.psf) {
        return [
            [],
            [
                {
                    type: "VB",
                    ps: [makePsString(verb.entry.psp, verb.entry.psf)],
                },
            ],
        ];
    }
    const rawBase = removeL(makePsString(verb.entry.p, verb.entry.f));
    if (verb.entry.c?.includes("intrans.") && rawBase.p.endsWith("ېد")) {
        const shortBase = trimOffPs(rawBase, 1, 2);
        const long: T.PsString[] = [concatPsString(
            shortBase, 
            { p: "ږ", f: "éG" },
        )];
        const short: T.PsString[] | undefined = (verb.entry.shortIntrans)
            ? [shortBase]
            : undefined;
        const vb: T.VB = {
            type: "VB",
            ps: short ? { long, short } : long,
        };
        return [
            [],
            [vb],
        ];
    }
    return [
        [],
        [
            {
                type: "VB",
                ps: [rawBase], 
            },
        ],
    ];
}

function getPerfectiveStem(verb: T.VerbEntryNoFVars, genderNum: { gender: T.Gender, number: T.NounNumber }): [[T.VHead] | [], [T.VB]] {
    if (verb.complement && isStatComp(verb)) {
        const auxStem = getPerfectiveStem(verb.entry.c?.includes("intrans.")
            ? kedulStat
            : kawulStat,
        genderNum)[1][0];
        return [
            [makeComplement(verb.complement, genderNum)],
            [auxStem as T.VBBasic],
        ];
    }
    if (verb.entry.f === "tlul") {
        return tlulPerfectiveStem(genderNum);
    }
    const base = (verb.entry.ssp && verb.entry.ssf)
        // with irregular perfective stem
        ? makePsString(verb.entry.ssp, verb.entry.ssf)
        : (verb.entry.psp && verb.entry.psf)
            // with perfective stem based on irregular perfective root
            ? makePsString(verb.entry.psp, verb.entry.psf)
            // with regular infinitive based perfective stem
            : removeL(makePsString(verb.entry.p, verb.entry.f));
    const [perfectiveHead, rest] = getPerfectiveHead(base, verb);
    return [
        perfectiveHead ? [perfectiveHead] : [],
        [
            {
                type: "VB",
                ps: isKawulVerb(verb) ? {
                    long: [{ p: "کړ", f: "kR" }],
                    short: [{ p: "ک", f: "k" }],
                } : [rest],
            },
        ],
    ];
}

function getPerfectiveHead(base: T.PsString, { entry }: T.VerbEntryNoFVars): [T.PH, T.PsString] | [undefined, T.PsString] {
    // if ((verb.entry.ssp && verb.entry.ssf) || verb.entry.separationAtP) {
    //     // handle split
    // }
    if (entry.separationAtP && entry.separationAtF) {
        const ph: T.PH = {
            type: "PH",
            ps: {
                p: base.p.slice(0, entry.separationAtP),
                f: accentSyllable(base.f.slice(0, entry.separationAtF)),
            },       
        };
        const rest = {
            p: base.p.slice(entry.separationAtP),
            f: base.f.slice(entry.separationAtF),
        };
        return [ph, rest];
    }
    const [ph, rest]: [T.PH | undefined, T.PsString] = entry.noOo
        ? [undefined, base]
        : entry.sepOo 
        ? [
            { type: "PH", ps: { p: "و ", f: "óo`"}},
            base,
        ]
        : base.p.charAt(0) === "ا" && base.f.charAt(0) === "a"
        ? [
            { type: "PH", ps: { p: "وا", f: "wáa" }},
            removeAStart(base),
        ]
        : ["آ", "ا"].includes(base.p.charAt(0)) && base.f.slice(0, 2) === "aa"
        ? [
            { type: "PH", ps: { p: "وا", f: "wáa" }},
            removeAStart(base),
        ]
        : ["óo", "oo"].includes(base.f.slice(0, 2))
        ? [
            { type: "PH", ps: { p: "wÚ", f: "و" }},
            base,
        ]
        : ["ée", "ee"].includes(base.f.slice(0, 2)) && base.p.slice(0, 2) === "ای"
        ? [
            { type: "PH", ps: { p: "وي", f: "wée" }},
            {
                p: base.p.slice(2),
                f: base.f.slice(2),
            },
        ] : ["é", "e"].includes(base.f.slice(0, 2)) && base.p.slice(0, 2) === "اې"
        ? [
            { type: "PH", ps: { p: "وي", f: "wé" }},
            {
                p: base.p.slice(2),
                f: base.f.slice(1),
            },
        ] : ["ó", "o"].includes(base.f[0]) && base.p.slice(0, 2) === "او"
        ? [
            { type: "PH", ps: { p: "و", f: "óo`"}},
            {
                p: base.p.slice(2),
                f: base.f.slice(1),
            },
        ] : [
            { type: "PH", ps: { p: "و", f: "óo" }},
            base,
        ];
    return [
        ph,
        removeAccents(rest),
    ];
    function removeAStart(ps: T.PsString) {
        return {
            p: ps.p.slice(1),
            f: ps.f.slice(ps.f[1] === "a" ? 2 : 1),
        };
    }
}
