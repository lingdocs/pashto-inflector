import * as T from "../../types";
import { isPattern1Entry, isPattern5Entry, isAnimNounEntry } from "../type-predicates";
import { renderNPSelection } from "./render-np";

export function renderSandwich(s: T.SandwichSelection<T.Sandwich>): T.Rendered<T.SandwichSelection<T.Sandwich>> {
    const inflectInside = (isLocationSandwich(s) && s.inside.type === "noun" && isPattern1Entry(s.inside.entry) &&  s.inside.number === "singular")
        ? false
        : (s.inside.type === "noun" && isPattern5Entry(s.inside.entry) && isAnimNounEntry(s.inside.entry))
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
        ),
    };
}

function isLocationSandwich(s: T.SandwichSelection<T.Sandwich>): boolean {
    // TODO: more nuanced version of this?
    return s.before?.p === "په" && s.after?.f === "کې";
}