import * as T from "../../types";
import { isFirstPerson, parseEc, isSecondPerson } from "./misc-helpers";

function getRandPers(): T.Person {
    return Math.floor(Math.random() * 12);
}

export function randomPerson(a?: { prev?: T.Person, counterPart?: T.VerbObject | T.NPSelection }) {
    // no restrictions, just get any person
    if (!a) {
        return getRandPers();
    }
    if (a.counterPart !== undefined && typeof a.counterPart === "object" && a.counterPart.selection.type === "pronoun") {
        // with counterpart pronoun
        let newP = 0;
        do {
            newP = getRandPers();
        } while (
            isInvalidSubjObjCombo(a.counterPart.selection.person, newP)
            ||
            (newP === a.prev)
        );
        return newP;
    }
    // without counterpart pronoun, just previous
    let newP = 0;
    do {
        newP = getRandPers();
    } while (newP === a.prev);
    return newP;
}

export function isInvalidSubjObjCombo(subj: T.Person, obj: T.Person): boolean {
    return (
        (isFirstPerson(subj) && isFirstPerson(obj))
        ||
        (isSecondPerson(subj) && isSecondPerson(obj))
    );
}

export function randomSubjObj(old?: { subj: T.Person, obj?: T.Person }): { subj: T.Person, obj: T.Person } {
    let subj = 0;
    let obj = 0;
    do {
        subj = getRandPers();
        obj = getRandPers();
    } while (
        (old && ((old.subj === subj) || (old.obj === obj)))
        ||
        isInvalidSubjObjCombo(subj, obj)
    );
    return { subj, obj };
}
export function getEnglishVerb(entry: T.DictionaryEntry): string {
    if (!entry.ec) {
        console.error("errored verb");
        console.error(entry);
        throw new Error("no english information for verb");
    }
    if (entry.ep) {
        const ec = entry.ec.includes(",") ? parseEc(entry.ec)[0] : entry.ec;
        return `to ${ec} ${entry.ep}`;
    }
    const ec = parseEc(entry.ec);
    return `to ${ec[0]}`;
}

export function getEnglishParticiple(entry: T.DictionaryEntry): string {
    if (!entry.ec) {
        throw new Error("no english information for participle");
    }
    const ec = parseEc(entry.ec);
    const participle = `${ec[2]} / to ${ec[0]}`;
    return (entry.ep)
        ? `${participle} ${entry.ep}`
        : participle;
}