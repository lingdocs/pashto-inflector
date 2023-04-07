/**
 * Copyright (c) 2023 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    concatPsString, getLength, trimOffPs,
} from "../p-text-helpers";
import * as T from "../../../types";
import { makePsString, removeFVarientsFromVerb } from "../accent-and-ps-utils";
import { accentOnNFromEnd, accentSyllable, removeAccents } from "../accent-helpers";
import { isKawulVerb } from "../type-predicates";
import { vEntry, addAbilityEnding, weld, removeL, addTrailingAccent, tlulPerfectiveStem } from "./rs-helpers";

const kedulStat = vEntry({"ts":1581086654898,"i":11100,"p":"کېدل","f":"kedul","g":"kedul","e":"to become _____","r":2,"c":"v. intrans.","ssp":"ش","ssf":"sh","prp":"شول","prf":"shwul","pprtp":"شوی","pprtf":"shúwey","noOo":true,"ec":"become"});

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

// start basic inflection functions for pattern 1 and pattern ey things
// to be used by inflecting لاړ and participles

export function getRootStem({ verb, part, type, genderNumber }: {
    verb: T.VerbEntry,
    part: {
        rs: "root" | "stem",
        aspect: T.Aspect,
    } | "pastPart",
    type: "basic" | "ability" | "passive",
    genderNumber: {
        gender: T.Gender,
        number: T.NounNumber,
    },
}): T.RootsStemsOutput {
    const v = removeFVarientsFromVerb(verb);
    if (part === "pastPart") {
        throw new Error("not implemented yet");
    }
    if (type === "ability") {
        return getAbilityRs(v, part);
    }
    if (type === "passive") {
        return getPassiveRs(v, part);
    }
    return part.rs === "stem"
        ? part.aspect === "imperfective"
            ? getImperfectiveStem(v)
            : getPerfectiveStem(v, genderNumber)
        : part.aspect === "imperfective"
            ? getImperfectiveRoot(v)
            : getPerfectiveRoot(v);
}

function getAbilityRs(verb: T.VerbEntryNoFVars, { aspect, rs }: { aspect: T.Aspect, rs: "root" | "stem" }): [[] | [T.VHead], [T.VB, T.VBA]] {
    const [vHead, [basicRoot]] = (aspect === "imperfective"
        ? getImperfectiveRoot
        : getPerfectiveRoot
    )(verb);
    return [
        vHead, 
        [
            addAbilityEnding(basicRoot),
            rs === "root" ? shwulVB : shVB,
        ],
    ];
}

function getPassiveRs(verb: T.VerbEntryNoFVars, part: { aspect: T.Aspect, rs: "root" | "stem" }): [[] | [T.VHead], [T.VBA]] {
    const [vHead, [basicRoot]] = (part.aspect === "imperfective"
        ? getImperfectiveRoot
        : getPerfectiveRoot
    )(verb);
    const longRoot = getLongVB(basicRoot);
    const kedulVba = getRootStem({ verb: kedulStat, part, type: "basic", genderNumber: { gender: "masc", number: "singular" }})[1][0] as T.VBBasic;
    return [
        vHead,
        [weld(longRoot, kedulVba)],
    ];
    function getLongVB(vb: T.VBA): T.VBA {
        if (vb.type === "welded") {
            return {
                ...vb,
                right: getLongVB(vb) as T.VBBasic,
            };
        }
        return {
            ...vb,
            ps: getLength(vb.ps, "long"),
        };
    }
} 

function getImperfectiveRoot(verb: T.VerbEntryNoFVars): [[], [T.VBA]] { 
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

function getPerfectiveRoot(verb: T.VerbEntryNoFVars): [[T.VHead] | [], [T.VBA]] {
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

function getImperfectiveStem(verb: T.VerbEntryNoFVars): T.RootsStemsOutput {
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

function getPerfectiveStem(verb: T.VerbEntryNoFVars, person: { gender: T.Gender, number: T.NounNumber }): T.RootsStemsOutput {
    if (verb.entry.f === "tlul") {
        return tlulPerfectiveStem(person);
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

// function getPastPart(verb: T.VerbEntryNoFVars, person: { gender: T.Gender, number: T.NounNumber }): T.SingleOrLengthOpts<T.PsString> {
//     const root = getImperfectiveRoot(verb); 
//     // TODO: with new inflection engine more streamlined
//     return inflectRoot
// }

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
