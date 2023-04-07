import * as T from "../../../types";
import { accentOnFront } from "../accent-helpers";
import { countSyllables } from "../accent-helpers";
import { concatPsString, trimOffPs } from "../p-text-helpers";

export function inflectPattern1(ps: T.PsString, { gender, number }: T.GenderNumber): T.PsString[] {
    if (gender === "masc") {
        return [ps];
    }
    const inflected = concatPsString(ps, number === "singular" ? { p: "ه", f: "a" } : { p: "ې", f: "e" });
    if (countSyllables(inflected) === 2) {
        return [accentOnFront(inflected)];
    }
    return [inflected];
}

export function inflectPattern3(ps: T.PsString, { gender, number }: T.GenderNumber): T.PsString[] {
    if (gender === "masc") {
        return number === "singular"
            ? [ps]
            : [concatPsString(trimOffPs(ps, 1, 2), { p: "ي", f: "ee" })];
    }
    return [concatPsString(trimOffPs(ps, 1, 2), { p: "ې", f: "e" })];
}