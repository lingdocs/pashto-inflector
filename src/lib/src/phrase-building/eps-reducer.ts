import * as T from "../../../types";
import * as O from "optics-ts";
import { personGender, personNumber } from "../misc-helpers";
import { isUnisexNounEntry } from "../type-predicates";
import { checkForMiniPronounsError } from "./compile";
import {
  adjustSubjectSelection,
  getSubjectSelection,
  insertNewAP,
  removeAP,
  removeHeetsDet,
  setAP,
  shiftBlock,
} from "./blocks-utils";

export type EpsReducerAction =
  | {
      type: "set subject";
      payload: T.NPSelection | undefined;
    }
  | {
      type: "set predicate";
      payload: T.ComplementSelection | undefined;
    }
  | {
      type: "set omitSubject";
      payload: "true" | "false";
    }
  | {
      type: "set equative";
      payload: T.EquativeSelection;
    }
  | {
      type: "insert new AP";
    }
  | {
      type: "set AP";
      payload: {
        index: number;
        AP: T.APSelection | undefined;
      };
    }
  | {
      type: "remove AP";
      payload: number;
    }
  | {
      type: "shift block";
      payload: {
        index: number;
        direction: "back" | "forward";
      };
    }
  | {
      type: "load EPS";
      payload: T.EPSelectionState;
    };

const blocks = O.optic_<T.EPSelectionState>().prop("blocks");
const equative = O.optic_<T.EPSelectionState>().prop("equative");
const predicate = O.optic_<T.EPSelectionState>().prop("predicate");

export default function epsReducer(
  eps: T.EPSelectionState,
  action: EpsReducerAction,
  sendAlert?: (msg: string) => void,
): T.EPSelectionState {
  if (action.type === "set subject") {
    const subject = action.payload;
    if (!subject) {
      return {
        ...eps,
        blocks: adjustSubjectSelection(subject)(eps.blocks) as T.EPSBlock[],
      };
    }
    if (
      subject.selection.type === "pronoun" &&
      eps.predicate &&
      eps.predicate.selection.type === "NP" &&
      eps.predicate.selection.selection.type === "noun" &&
      isUnisexNounEntry(eps.predicate.selection.selection.entry)
    ) {
      const pred = eps.predicate.selection.selection;
      const adjusted: T.NPSelection = {
        type: "NP",
        selection: {
          ...pred,
          ...(pred.numberCanChange
            ? {
                number: personNumber(subject.selection.person),
              }
            : {}),
          ...(pred.genderCanChange
            ? {
                gender: personGender(subject.selection.person),
              }
            : {}),
        },
      };
      return {
        ...eps,
        predicate: {
          ...eps.predicate,
          selection: adjusted,
        },
        blocks: adjustSubjectSelection(subject)(eps.blocks) as T.EPSBlock[],
      };
    }
    const n: T.EPSelectionState = {
      ...eps,
      blocks: adjustSubjectSelection(subject)(eps.blocks) as T.EPSBlock[],
    };
    return ensureMiniPronounsOk(eps, n, sendAlert);
  }
  if (action.type === "set predicate") {
    if (!action.payload) {
      return O.set(predicate)(action.payload)(eps);
    }
    const subject = getSubjectSelection(eps.blocks).selection;
    if (
      subject?.selection.type === "pronoun" &&
      action.payload.selection.type === "NP" &&
      action.payload.selection.selection.type === "noun" &&
      isUnisexNounEntry(action.payload.selection.selection.entry)
    ) {
      const { gender, number } = action.payload.selection.selection;
      const pronoun = subject.selection.person;
      const newPronoun = movePersonNumber(
        movePersonGender(pronoun, gender),
        number,
      );
      return {
        ...eps,
        blocks: adjustSubjectSelection({
          type: "NP",
          selection: {
            ...subject.selection,
            person: newPronoun,
          },
        })(eps.blocks) as T.EPSBlock[],
      };
    }
    const n: T.EPSelectionState = O.set(predicate)(action.payload)(eps);
    return ensureMiniPronounsOk(eps, n, sendAlert);
  }
  if (action.type === "set omitSubject") {
    const n: T.EPSelectionState = {
      ...eps,
      omitSubject: action.payload === "true",
    };
    return ensureMiniPronounsOk(eps, n, sendAlert);
  }
  if (action.type === "set equative") {
    return O.set(equative)(action.payload)(
      O.set(blocks)(
        !action.payload.negative ? removeHeetsDet(eps.blocks) : eps.blocks,
      )(eps),
    );
  }
  if (action.type === "insert new AP") {
    return O.modify(blocks)(insertNewAP)(eps);
  }
  if (action.type === "set AP") {
    const { index, AP } = action.payload;
    return O.modify(blocks)(setAP(index, AP))(eps);
  }
  if (action.type === "remove AP") {
    return O.modify(blocks)(removeAP(action.payload))(eps);
  }
  if (action.type === "shift block") {
    const { index, direction } = action.payload;
    return O.modify(blocks)(shiftBlock(index, direction))(eps);
  }
  if (action.type === "load EPS") {
    return action.payload;
  }
  throw new Error("unknown epsReducer action");
}

function ensureMiniPronounsOk(
  old: T.EPSelectionState,
  eps: T.EPSelectionState,
  sendAlert?: (msg: string) => void,
): T.EPSelectionState {
  const error = checkForMiniPronounsError(eps);
  if (error !== undefined) {
    if (sendAlert) sendAlert(error);
    return old;
  }
  return eps;
}

function movePersonGender(p: T.Person, gender: T.Gender): T.Person {
  const pGender = personGender(p);
  if (gender === pGender) {
    return p;
  }
  return gender === "masc" ? p - 1 : p + 1;
}

function movePersonNumber(p: T.Person, number: T.NounNumber): T.Person {
  const pNumber = personNumber(p);
  if (pNumber === number) {
    return p;
  }
  return number === "plural" ? p + 6 : p - 6;
}
