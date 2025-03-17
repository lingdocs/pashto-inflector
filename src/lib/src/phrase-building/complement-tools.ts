import * as T from "../../../types";
import { isFirstPerson, isSecondPerson } from "../misc-helpers";
import { isThirdPerson } from "./vp-tools";

/**
 * checks to see if a complement takes over the kingship
 * from an existing king NP 👑 - if it does it returns the
 * complement NP to be king
 */
export function complementTakesKingship(
  king: T.NPSelection | T.ObjectNP,
  comp: T.ComplementSelection | T.UnselectedComplementSelection | undefined
): false | T.NPSelection {
  if (!comp) {
    return false;
  }
  if (typeof king !== "object") {
    return false;
  }
  if (comp.selection.type === "unselected") {
    return false;
  }
  // In case the king is a 1st or 2nd pers. pronoun
  if (
    king.selection.type === "pronoun" &&
    !isThirdPerson(king.selection.person)
  ) {
    // TODO: check if this is correct
    if (
      comp.selection.type === "NP" &&
      comp.selection.selection.type === "pronoun"
    ) {
      if (
        isFirstPerson(king.selection.person) &&
        isSecondPerson(comp.selection.selection.person)
      ) {
        return false;
      }
      return comp.selection;
    }
    return false;
  } else {
    // In case the king is not a 1st or 2nd pers pronoun
    // it can only be taken-over by a NP
    return comp.selection.type === "NP" ? comp.selection : false;
  }
}
