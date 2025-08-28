import * as T from "../../../types";
import { isFirstPerson, isSecondPerson, personToGenNum } from "../misc-helpers";
import { getPersonFromNP, isThirdPerson } from "./vp-tools";

export function winnerOfNpAndCompliment(
  np: T.NPSelection,
  comp: T.ParsedComplementSelection | undefined,
): { source: "np" | "complement"; person: T.Person } {
  if (!comp || !("type" in comp.selection) || comp.selection.type !== "NP") {
    return { source: "np", person: getPersonFromNP(np) };
  }
  return complementTakesTarget(np, comp)
    ? {
        person: getPersonFromNP(comp.selection),
        source: "complement",
      }
    : {
        person: getPersonFromNP(np),
        source: "np",
      };
}

// TODO: Maybe we can simplify the inputs on this depending on how
//  much we need it for
/**
 * checks to see if a complement takes over the kingship
 * from an existing king NP 👑 - if it does it returns the
 * complement NP to be king
 */
export function complementTakesTarget(
  target: T.NPSelection | T.ObjectNP,
  comp:
    | T.ComplementSelection
    | T.UnselectedComplementSelection
    | T.ParsedComplementSelection
    | undefined,
): boolean {
  if (!comp) {
    return false;
  }
  if (typeof target !== "object") {
    return false;
  }
  if (!("type" in comp.selection)) {
    return false;
  }
  if (comp.selection.type === "unselected") {
    return false;
  }
  // In case the king is a 1st or 2nd pers. pronoun
  if (
    target.selection.type === "pronoun" &&
    !isThirdPerson(target.selection.person)
  ) {
    // TODO: check if this is correct
    if (
      comp.selection.type === "NP" &&
      comp.selection.selection.type === "pronoun"
    ) {
      if (
        isFirstPerson(target.selection.person) &&
        isSecondPerson(comp.selection.selection.person)
      ) {
        return false;
      }
      return true;
    }
    return false;
  } else {
    // In case the king is not a 1st or 2nd pers pronoun
    // it can only be taken-over by a NP
    return comp.selection.type === "NP";
  }
}

export function parsedCompToCompSelection(
  comp: T.ParsedComplementSelection | undefined,
): T.ComplementSelection | undefined {
  if (!comp) {
    return undefined;
  }
  if (!("type" in comp.selection)) {
    return {
      type: "complement",
      selection: comp.selection.selection,
    };
  }
  return {
    type: "complement",
    selection: comp.selection,
  };
}

export function checkComplement(
  comp: T.ParsedComplementSelection | undefined,
  person: T.Person,
): T.ParseError[] {
  if (!comp) {
    return [];
  }
  if ("inflection" in comp.selection) {
    // TODO: could share this with adjective checking !
    // const { gender, number } = personToGenNum(person);
    const { gender, number } = personToGenNum(person);
    const errors: T.ParseError[] = [];
    if (!comp.selection.gender.includes(gender)) {
      errors.push({
        message: "gender of target and complement adjective must match",
      });
    }
    if (
      (number === "singular" && !comp.selection.inflection.includes(0)) ||
      (number === "plural" && !comp.selection.inflection.includes(1))
    ) {
      // TODO: better message here
      errors.push({
        message: "complement adjective inflection must match verb",
      });
    }
    return errors;
  }
  return [];
}
