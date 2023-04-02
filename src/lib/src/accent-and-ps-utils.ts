import * as T from "../../types";

/**
 * Creates a Pashto string structure
 * 
 * @param p - the Pashto text
 * @param f - the phonetics text
 */
export function makePsString(p: string, f: string): T.PsString {
    return { p, f };
}

export function removeFVarientsFromVerb(v: T.VerbEntry): T.VerbEntryNoFVars {
    const b = removeFVarients(v.entry);
    return {
        entry: b,
        ...v.complement ? {
            complement: removeFVarients(v.complement),
        } : {},
    } as T.VerbEntryNoFVars;
}

export function removeFVarients(x: T.VerbDictionaryEntry): T.VerbDictionaryEntryNoFVars;
export function removeFVarients(x: T.DictionaryEntry): T.DictionaryEntryNoFVars;
export function removeFVarients(x: T.PsString): T.PsStringNoFVars;
export function removeFVarients(x: string): T.FStringNoFVars;
export function removeFVarients(x: string | T.PsString | T.DictionaryEntry | T.VerbDictionaryEntry): T.FStringNoFVars | T.PsStringNoFVars | T.DictionaryEntryNoFVars | T.VerbDictionaryEntryNoFVars {
    if (typeof x === "string") {
        return x.split(",")[0] as T.FStringNoFVars;
    }
    if ("ts" in x) {
        return {
            ...x,
            f: removeFVarients(x.f),
        } as unknown as T.DictionaryEntryNoFVars;
    }
    return {
        ...x,
        f: removeFVarients(x.f),
    } as unknown as T.PsStringNoFVars;
}
