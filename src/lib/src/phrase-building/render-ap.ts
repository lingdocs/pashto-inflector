import * as T from "../../../types";
import { getEnglishWord } from "../get-english-word";
import { psStringFromEntry } from "../p-text-helpers";
import { renderAdverbSelection } from "./render-ep";
import { renderSandwich } from "./render-sandwich";

export function renderAPSelection({ selection }: T.APSelection): T.Rendered<T.APSelection> {
    if (selection.type === "sandwich") {
        return {
            type: "AP",
            selection: renderSandwich(selection),
        };
    }
    return {
        type: "AP",
        selection: renderAdverbSelection(selection),
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