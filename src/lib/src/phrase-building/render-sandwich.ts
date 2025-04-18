import * as T from "../../../types";
import { isPattern5Entry, isAnimNounEntry } from "../type-predicates";
import { renderNPSelection } from "./render-np";

export function renderSandwich(
  s: T.SandwichSelection<T.Sandwich>
): T.Rendered<T.SandwichSelection<T.Sandwich>> {
  const inflectInside: boolean | "locationSandwich" =
    s.inside.selection.type === "noun" &&
    isPattern5Entry(s.inside.selection.entry) &&
    isAnimNounEntry(s.inside.selection.entry)
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
      isPuLocationSandwich(s),
      s.mayo ? (s.after ? "opt" : "req") : "no"
    ),
  };
}

function isPuLocationSandwich(s: T.SandwichSelection<T.Sandwich>): boolean {
  return (
    s.before?.p === "په" && !!["کې", "کښې", "باندې"].includes(s.after?.p || "")
  );
}
