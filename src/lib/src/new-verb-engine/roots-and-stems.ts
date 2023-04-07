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
import { isKawulVerb } from "../type-predicates";
import { inflectPattern1 } from "./new-inflectors";

const shwulVB: T.VBBasic = {
    type: "VB",
    ps: {
        long: [{ p: "شول", f: "shwul" }],
        short: [{ p: "شو", f: "shw" }],
    },
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
    console.log({ type }); 
    const v = removeFVarientsFromVerb(verb);
    if (part === "pastPart") {
        throw new Error("not implemented yet");
    }
    console.log({ part });
    return part.rs === "stem"
        ? part.aspect === "imperfective"
            ? getImperfectiveStem(v)
            : getPerfectiveStem(v, genderNumber)
        : part.aspect === "imperfective"
            ? getImperfectiveRoot(v, type)
            : getPerfectiveRoot(v);
}

function getImperfectiveRoot(verb: T.VerbEntryNoFVars, type: "basic" | "ability" | "passive"): T.RootsStemsOutput {
    // if (type === "ability") {
    //     console.log("in ability");
    //     const basic = getImperfectiveRoot(verb, "basic") as [[T.VHead] | [], [T.VBA]];
    //     return [
    //         basic[0],
    //         [
    //             {
    //                 type: "VB",
                    
    //                 [1],
    //             shwulVB,
    //         ],
    //     ];
    // }
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

function getPerfectiveRoot(verb: T.VerbEntryNoFVars): T.RootsStemsOutput {
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

function addTrailingAccent(ps: T.PsString): T.PsString {
    return {
        p: ps.p,
        f: ps.f + "X",
    };
}

function addUl(b: T.PsString): T.PsString {
    return concatPsString(b, { p: "ل", f: "ul" });
}

// TODO: could do removeEndingL (slower but safer)

function removeL(ps: T.PsString): T.PsString {
    return trimOffPs(ps, 1, 2);
}

function tlulPerfectiveStem(person: { gender: T.Gender, number: T.NounNumber }): T.RootsStemsOutput {
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