import * as T from "../../types";
import { isPattern1Entry, isPattern5Entry, isAnimNounEntry } from "../type-predicates";
import { renderNPSelection } from "./render-np";

export function renderSandwich(s: T.SandwichSelection<T.Sandwich>): T.Rendered<T.SandwichSelection<T.Sandwich>> {
    const inflectInside = (isLocationSandwich(s) && s.inside.selection.type === "noun" && isPattern1Entry(s.inside.selection.entry) &&  s.inside.selection.number === "singular")
        ? false
        : (s.inside.selection.type === "noun" && isPattern5Entry(s.inside.selection.entry) && isAnimNounEntry(s.inside.selection.entry))
        ? false
        : true;
    const inside = renderNPSelection(
        s.inside,
        true,
        inflectInside,
        "subject",
        "none",
    );
    const e = `${s.e} ${inside.selection.e}`;
    return {
        ...s,
        e,
        inside,
    };
}

function isLocationSandwich(s: T.SandwichSelection<T.Sandwich>): boolean {
    // TODO: more nuanced version of this?
    return s.before?.p === "په" && s.after?.f === "کې";
}