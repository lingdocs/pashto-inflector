/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as T from "../../types";
import { removeFVarients } from "./accent-and-ps-utils";
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
    const errors = new Set<string>();
    const erroneousFields = new Set<T.DictionaryEntryField>();
    requiredFields.forEach((field) => {
        if (field !== "i" && !entry[field]) {
            errors.add(`missing ${field}`);
            erroneousFields.add(field);
        }
        if (field === "i" && typeof entry[field] !== "number") {
            errors.add(`missing ${field}`);
            erroneousFields.add(field);
        }
    });
    textFieldPairs.forEach((pair) => {
        const pField = pair[0];
        const fField = pair[1];
        const p = entry[pField];
        const f = entry[fField];
        const isRequired = requiredFields.includes(pair[0]);
        if (!isRequired && !p && !f) {
            return;
        }
        if (!p && !f) {
            errors.add(`missing ${pField}`);
            errors.add(`missing ${fField}`);
            erroneousFields.add(pField);
            erroneousFields.add(fField);
            return;
        }
        if (!f || !p) {
            const errField = !p ? pField : fField;
            errors.add(`missing ${errField}`);
            erroneousFields.add(errField);
            return;
        }
        if (!phoneticsToDiacritics(p, f) && !entry.diacExcept) {
            errors.add(`script and phonetics do not match for ${pField} and ${fField}`);
            erroneousFields.add(pField)
            erroneousFields.add(fField);
        }
        const firstF = removeFVarients(f);
        if (firstF.includes("-")) {
            if (firstF.includes(" ")) {
                errors.add(`presence of both hyphen and space in ${fField}`);
                erroneousFields.add(fField);
            }
            const fWords = firstF.split("-");
            const pWords = p.split(" ");
            if (fWords.length !== pWords.length) {
                errors.add(`hyphen/spacing discrepency between ${pField} and ${fField}`);
                erroneousFields.add(pField);
                erroneousFields.add(fField);
            }
        } else {
            // check spacing
            const fWords = firstF.split(" ");
            const pWords = p.split(" ");
            if (fWords.length !== pWords.length) {
                errors.add(`spacing discrepency between ${pField} and ${fField}`);
                erroneousFields.add(pField);
                erroneousFields.add(fField);
            }
        }
    });
    if ((entry.separationAtP && !entry.separationAtF)) {
        errors.add("missing separationAtF");
        erroneousFields.add("separationAtF");
    }
    if ((!entry.separationAtP && entry.separationAtF)) {
        errors.add("missing separationAtP");
        erroneousFields.add("separationAtP");
    }
    if (entry.c && entry.c.slice(0, 2) === "v." && entry.c.includes("comp.") && !entry.l) {
        errors.add("missing complement for compound verb");
        erroneousFields.add("l");
    }
    if (entry.c && entry.c.includes("stat. comp. intrans.") && !entry.p.endsWith("ېدل")) {
        errors.add("wrong ending for intrans. stat. comp");
        erroneousFields.add("p");
        erroneousFields.add("f");
    }
    if (entry.c && entry.c.includes("stat. comp. trans.") && !entry.p.endsWith("ول")) {
        errors.add("wrong ending for trans. stat. comp");
        erroneousFields.add("p");
        erroneousFields.add("f");
    }
    if (errors.size) {
        return {
            errors: Array.from(errors),
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
