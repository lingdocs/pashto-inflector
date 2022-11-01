import * as T from "../../../types";
import { getEnglishWord } from "../get-english-word";
import { psStringFromEntry } from "../p-text-helpers";
import { isAdjectiveEntry } from "../type-predicates";
import { inflectAdvAdj } from "./render-adj";
import { renderSandwich } from "./render-sandwich";

export function renderAPSelection({ selection }: T.APSelection, person: T.Person): T.Rendered<T.APSelection> {
    if (selection.type === "sandwich") {
        return {
            type: "AP",
            selection: renderSandwich(selection),
        };
    }
    return {
        type: "AP",
        selection: renderAdverbSelection(selection, person),
    };
}

export function renderLocativeAdverbSelection({ entry }: T.LocativeAdverbSelection): T.Rendered<T.LocativeAdverbSelection> {
    const e = getEnglishWord(entry);
    if (!e || typeof e !== "string") {
        throw new Error("error getting english for compliment");
    }
    return {
        type: "loc. adv.",
        entry: entry,
        ps: [psStringFromEntry(entry)],
        e,
        inflected: false,
        // TODO: don't use persons for these
        person: T.Person.FirstSingMale,
        role: "none",
    };
}

export function renderAdverbSelection(a: T.AdverbSelection, person: T.Person): T.Rendered<T.AdverbSelection> {
    const ew = getEnglishWord(a.entry);
    const e = typeof ew === "object"
        ? (ew.singular || "")
        : !ew
        ? ""
        : ew;
    return {
        type: "adverb",
        entry: a.entry,
        ps: isAdjectiveEntry(a.entry)
            ? inflectAdvAdj(a, person, false)
            : [psStringFromEntry(a.entry)],
        person,
        e,
    };
}