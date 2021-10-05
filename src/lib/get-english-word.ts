import * as T from "../types";

/**
 * returns the singular and plural english word for a Pashto entry if possible
 * NOTE: only works with nouns and adjectives
 * 
 * @param entry 
 * @returns 
 */
export function getEnglishWord(entry: T.DictionaryEntry): {
    singular?: string,
    plural: string,
} | undefined {
    if (!entry.c || !entry.c.includes("n.") || entry.c.includes("adj.")) {
        return undefined;
    }
    if (entry.ec && entry.ep) {
        return {
            singular: entry.ec,
            plural: entry.ep,
        };
    }
    const base = entry.e.split(",")[0].split(";")[0].split("(")[0].trim();
    if (entry.c.includes("pl.")) {
        return {
            plural: base,
        };
    }
    if (base.slice(-3) === "sis") {
        return {
            singular: base,
            plural: `${base.slice(0, -2)}es`,
        };
    }
    if (
        ["sh", "ch"].includes(base.slice(-2)) ||
        ["s", "x", "z", "o"].includes(base.slice(-1))
    ) {
        return {
            singular: base,
            plural: `${base}es`,
        };
    }
    if (base.slice(-1) === "y" && !isVowel(base.slice(-2, -1))) {
        return {
            singular: base,
            plural: `${base.slice(0, -1)}ies`,
        };
    }
    return {
        singular: base,
        plural: `${base}s`,
    };
}

function isVowel(l: string): boolean {
    return ["a", "e", "i", "o", "u"].includes(l);
}