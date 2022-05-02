import * as T from "../../types";
import { inflectWord } from "../../lib/pashto-inflector";
import {
    psStringFromEntry,
    isUnisexSet,
} from "../../lib/p-text-helpers";
import { getEnglishWord } from "../get-english-word";
import {
    personGender,
    personIsPlural,
} from "../../lib/misc-helpers";

function chooseInflection(inflections: T.UnisexSet<T.InflectionSet>, pers: T.Person, inflected?: boolean): T.ArrayOneOrMore<T.PsString> {
    const gender = personGender(pers);
    const plural = personIsPlural(pers);
    const infNumber = (plural ? 1 : 0) + (inflected ? 1 : 0);
    return inflections[gender][infNumber];
}

export function renderAdjectiveSelection(a: T.AdjectiveSelection, person: T.Person, inflected: boolean, role: "king" | "servant" | "none"): T.Rendered<T.AdjectiveSelection> {
    const infs = inflectWord(a.entry);
    const eWord = getEnglishWord(a.entry);
    const e = !eWord
        ? undefined
        : typeof eWord === "string"
        ? eWord
        : (eWord.singular || undefined);
    if (!infs) return {
        type: "adjective",
        entry: a.entry,
        ps: [psStringFromEntry(a.entry)],
        e,
        inflected: false,
        role,
        person,
    }
    if (!infs.inflections || !isUnisexSet(infs.inflections)) {
        throw new Error("error getting inflections for adjective, looks like a noun's inflections");
    }
    return {
        type: "adjective",
        entry: a.entry,
        ps: chooseInflection(infs.inflections, person, inflected),
        e,
        inflected: false,
        role,
        person,
    };
}