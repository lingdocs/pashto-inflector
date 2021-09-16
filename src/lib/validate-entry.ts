/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as T from "../types";
import {
    phoneticsToDiacritics,
} from "./phonetics-to-diacritics";
import { standardizePashto, standardizePhonetics } from "./standardize-pashto";

const textFieldPairs: [T.DictionaryEntryTextField, T.DictionaryEntryTextField][] = [
    ["p", "f"],
    ["infap", "infaf"],
    ["infbp", "infbf"],
    ["app", "apf"],
    ["ppp", "ppf"],
    ["psp", "psf"],
    ["ssp", "ssf"],
    ["prp", "prf"],
    ["pprtp", "pprtf"],
    ["tppp", "tppf"],
];

const requiredFields: T.DictionaryEntryField[] = [
    "ts", "i", "p", "f", "e",
];

export function standardizeEntry(entry: T.DictionaryEntry): T.DictionaryEntry {
    return textFieldPairs.reduce((e, pair) => {
        return {
            ...e,
            ...entry[pair[0]] ? {
                [pair[0]]: standardizePashto(entry[pair[0]] as string),
            } : {},
            ...entry[pair[1]] ? {
                [pair[1]]: standardizePhonetics(entry[pair[1]] as string),
            } : {},
        };
    }, { ...entry });
}

export function validateEntry(entry: T.DictionaryEntry): T.DictionaryEntryError | {
    ok: true,
} | {
    checkComplement: true,
} {
    let errors: string[] = [];
    const erroneousFields = new Set<T.DictionaryEntryField>();
    requiredFields.forEach((field) => {
        if (field !== "i" && !entry[field]) {
            errors.push(`missing ${field}`);
            erroneousFields.add(field);
        }
        if (field === "i" && typeof entry[field] !== "number") {
            errors.push(`missing ${field}`);
            erroneousFields.add(field);
        }
    });
    textFieldPairs.forEach((pair) => {
        const pField = pair[0];
        const fField = pair[1];
        const p = entry[pField];
        const f = entry[fField];
        if (!requiredFields.includes(pair[0])) {
            if (!p && !f) {
                return;
            }
            if (!p && f) {
                errors.push(`missing ${pField}`);
                erroneousFields.add(pField);
                return;
            }
            if (p && !f) {
                errors.push(`missing ${fField}`);
                erroneousFields.add(fField);
                return;
            }
        }
        if (p && f && (!phoneticsToDiacritics(p, f) && !entry.diacExcept)) {
            errors.push(`script and phonetics do not match for ${pField} and ${fField}`);
            erroneousFields.add(pField)
            erroneousFields.add(fField);
        }
    });
    if ((entry.separationAtP && !entry.separationAtF)) {
        errors.push("missing separationAtF");
        erroneousFields.add("separationAtF");
    }
    if ((!entry.separationAtP && entry.separationAtF)) {
        errors.push("missing separationAtP");
        erroneousFields.add("separationAtP");
    }
    if (entry.c && entry.c.slice(0, 2) === "v." && entry.c.includes("comp.") && !entry.l) {
        errors.push("missing complement for compound verb");
        erroneousFields.add("l");
    }
    if (errors.length) {
        return {
            errors,
            p: entry.p || "",
            f: entry.f || "",
            e: entry.e || "",
            ts: entry.ts || 0,
            erroneousFields: Array.from(erroneousFields),
        };
    }
    if (entry.c && entry.c.slice(0, 2) === "v." && entry.c.includes("comp.") &&  entry.l) {
        return { checkComplement: true };
    }
    return { ok: true };
}
