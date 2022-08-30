import * as T from "../../types";
import { isPattern5Entry, isAnimNounEntry } from "../type-predicates";
import { renderNPSelection } from "./render-np";

export function renderSandwich(s: T.SandwichSelection<T.Sandwich>): T.Rendered<T.SandwichSelection<T.Sandwich>> {
    const inflectInside: boolean | "locationSandwich" = (s.inside.selection.type === "noun" && isPattern5Entry(s.inside.selection.entry) && isAnimNounEntry(s.inside.selection.entry))
        ? false
        : true;
    return {
        ...s,
        inside: renderNPSelection(
            s.inside,
            true,
            inflectInside,
            "subject",
            "none",
            isPuSandwich(s),
        ),
    };
}

function isPuSandwich(s: T.SandwichSelection<T.Sandwich>): boolean {
    return s.before?.p === "په";
}