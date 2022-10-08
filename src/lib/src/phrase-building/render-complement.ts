import * as T from "../../../types";
import { renderNounSelection } from "./render-np";
import { renderAdjectiveSelection } from "./render-adj";
import { renderSandwich } from "./render-sandwich";
import { renderLocativeAdverbSelection } from "./render-ap";

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
    if (s.selection.type === "loc. adv.") {
        return {
            type: "complement",
            selection: renderLocativeAdverbSelection(s.selection),
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
        selection: renderNounSelection(s.selection, false, "none", "noArticles"),
    };
}