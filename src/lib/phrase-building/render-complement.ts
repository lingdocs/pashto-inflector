import * as T from "../../types";
import { renderNounSelection } from "./render-np";
import { getEnglishWord } from "../get-english-word";
import { psStringFromEntry } from "../p-text-helpers";
import { renderAdjectiveSelection } from "./render-adj";
import { renderSandwich } from "./render-sandwich";

export function renderComplementSelection(s: T.ComplementSelection | T.UnselectedComplementSelection, person: T.Person): T.Rendered<T.ComplementSelection | T.UnselectedComplementSelection> {
    if (s.selection.type === "unselected") {
        return {
            type: "complement",
            selection: {
                type: "unselected",
                ps: [{ p: "____", f: "____" }],
                e: "____",
            },
        };
    }
    if (s.selection.type === "sandwich") {
        return {
            type: "complement",
            selection: renderSandwich(s.selection),
        };
    }
    const e = getEnglishWord(s.selection.entry);
    if (!e || typeof e !== "string") {
        throw new Error("error getting english for compliment");
    }
    if (s.selection.type === "loc. adv.") {
        return {
            type: "complement",
            selection: {
                type: "loc. adv.",
                entry: s.selection.entry,
                ps: [psStringFromEntry(s.selection.entry)],
                e,
                inflected: false,
                // TODO: don't use persons for these
                person,
                role: "none",
            },
        };
    }
    if (s.selection.type === "adjective") {
        return {
            type: "complement",
            selection: renderAdjectiveSelection(s.selection, person, false),
        };
    }
    // if (s.selection.type === "noun") {
    return {
        type: "complement",
        selection: renderNounSelection(s.selection, false, "none"),
    };
}