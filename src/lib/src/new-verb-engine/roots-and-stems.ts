/**
 * Copyright (c) 2023 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    concatPsString,
} from "../p-text-helpers";
import * as T from "../../../types";
import { makePsString, removeFVarientsFromVerb } from "../accent-and-ps-utils";
import { accentOnNFromEnd, removeAccents } from "../accent-helpers";

type RootStemOutput = (T.PH | T.SingleOrLengthOpts<T.PsString[]>)[];

export function getRootStem({ verb, part, type, person }: {
    verb: T.VerbEntry,
    part: {
        rs: "root" | "stem",
        aspect: T.Aspect,
    } | {
        participle: "present" | "past",
    },
    type: "basic" | "ability" | "passive",
    person: {
        gender: T.Gender,
        number: T.NounNumber,
    } | undefined,
}): RootStemOutput {
    const v = removeFVarientsFromVerb(verb);
    if ("participle" in part) {
        return [];
    }
    if (part.rs === "stem") {
        return getStem(v, part.aspect);
    } else {
        return getRoot(v, part.aspect);
    }
}

function getRoot(verb: T.VerbEntryNoFVars, aspect: T.Aspect): RootStemOutput {
    if (aspect === "imperfective") {
        const infinitive = accentOnNFromEnd(makePsString(verb.entry.p, verb.entry.f), 0);
        return [
            {
                long: [infinitive],
                short: [addTrailingAccent(removeL(infinitive))],
            },
        ];
    }
    if (aspect === "perfective") {
        const base = removeAccents(
            (verb.entry.prp && verb.entry.prf)
                ? makePsString(verb.entry.prp, verb.entry.prf)
                : makePsString(verb.entry.p, verb.entry.f)
        );
        const [perfectiveHead, rest] = getPerfectiveHead(base, verb);
        return [
            ...perfectiveHead ? [perfectiveHead] : [],
            {
                long: [rest],
                short: [removeL(rest)],
            },
        ];
    }
    throw new Error("unknown aspect");
}

function getStem(verb: T.VerbEntryNoFVars, aspect: T.Aspect): RootStemOutput {
    if (aspect === "imperfective") {
        const base = (verb.entry.psp && verb.entry.psf)
            // with irregular imperfective stem
            ? makePsString(verb.entry.psp, verb.entry.psf)
            // with regular infinitive based imperfective stem
            : removeL(makePsString(verb.entry.p, verb.entry.f));
        return [
            [base],
        ];
    }
    if (aspect === "perfective") {
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
            ...perfectiveHead ? [perfectiveHead] : [],
            [rest],
        ];
    }
    return [];
}

function getPerfectiveHead(base: T.PsString, { entry }: T.VerbEntry): [T.PH, T.PsString] | [undefined, T.PsString] {
    // if ((verb.entry.ssp && verb.entry.ssf) || verb.entry.separationAtP) {
    //     // handle split
    // }
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
    return {
        p: ps.p.slice(0, -1),
        f: ps.f.slice(0, -2),
    };
}
