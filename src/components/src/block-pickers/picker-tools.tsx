import {
    isVerbEntry,
} from "../../../lib/src/type-predicates";
import {
    getEnglishParticiple,
    getEnglishVerb,
} from "../../../lib/src/np-tools";
import * as T from "../../../types";
import {
    removeFVarients,
} from "../../../lib/src/accent-and-ps-utils";
import {
    getEnglishWord,
} from "../../../lib/src/get-english-word";
import { phoneticsToDiacritics } from "../../../lib/src/phonetics-to-diacritics";
import {
    convertSpelling,
} from "../../../lib/src/convert-spelling";
import {
    translatePhonetics,
} from "../../../lib/src/translate-phonetics";

export function makeVerbSelectOption(e: T.VerbEntry, opts: T.TextOptions): { value: string, label: string | JSX.Element } {
    const engV = (() => {
        try {
            return getEnglishVerb(e.entry);
        } catch(e) {
            console.error("no english conjugations for verb");
        }
    })();
    const eng = engV || truncateEnglish(e.entry.e);
    const ps = plainTextPsAdjustment(
        { p: e.entry.p, f: removeFVarients(e.entry.f) },
        opts,
    );
    return {
        label: `${ps.p} - ${ps.f} (${eng})`,
        value: e.entry.ts.toString(),
    };
}

function plainTextPsAdjustment(ps: T.PsString, opts: T.TextOptions): T.PsString {
    function getP(ps: T.PsString): string {
        const p = opts.diacritics
            ? (phoneticsToDiacritics(ps.p, ps.f) || ps.p)
            : ps.p;
        return convertSpelling(p, opts.spelling);
    }
    function getF(f: string): string {
        if (opts.phonetics === "none") {
            return "";
        }
        return opts.phonetics === "lingdocs"
            ? f
            : translatePhonetics(f, {
                dialect: opts.dialect,
                // @ts-ignore - weird TS not picking up the elimination of "none herre"
                system: opts.phonetics,
            });
    }
    return { p: getP(ps), f: getF(ps.f) };
}

function truncateEnglish(s: string): string {
    const maxLength = 16;
    return s.length <= maxLength
        ? s
        : s.slice(0, maxLength) + "…";
}

export function makeSelectOption(
    e: T.DictionaryEntry | T.VerbEntry | T.NounEntry | T.AdjectiveEntry | T.LocativeAdverbEntry,
    opts: T.TextOptions,    
): { value: string, label: string } {
    const entry = "entry" in e ? e.entry : e;
    const eng = (() => {
        try {
            return (isVerbEntry(e)) 
                ? (getEnglishParticiple(e.entry))
                : getEnglishWord(e);
        } catch(err) {
            return "";
        }
    })();
    const english = typeof eng === "string"
        ? eng
        : !eng
        ? truncateEnglish(entry.e)
        : ("singular" in eng && eng.singular !== undefined)
        ? eng.singular
        : eng.plural;
    const ps = plainTextPsAdjustment(
        { p: entry.p, f: removeFVarients(entry.f) },
        opts,
    );
    return {
        label: `${ps.p} - ${ps.f} (${english})`,
        value: entry.ts.toString(),
    };
}