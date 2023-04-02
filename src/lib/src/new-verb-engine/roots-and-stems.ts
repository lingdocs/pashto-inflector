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

export const ooPrefix: T.PH = {
    type: "PH",
    ps: { p: "و", f: "óo" },
};

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
        // TODO: determine ph and base
        return [
            ooPrefix,
            {
                long: [base],
                short: [removeL(base)],
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
        // TODO: determine ph and base
        return [
            ooPrefix,
            [base],
        ];
    }
    return [];
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
