import * as T from "../../../types";
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

export default function epsReducer(
  eps: T.EPSelectionState,
  action: EpsReducerAction,
  sendAlert?: (msg: string) => void
): T.EPSelectionState {
  if (action.type === "set subject") {
    const subject = action.payload;
    if (!subject) {
      return {
        ...eps,
        blocks: adjustSubjectSelection(eps.blocks, subject),
      };
    }
    if (
      subject.selection.type === "pronoun" &&
      eps.predicate &&
      eps.predicate.selection.type === "NP" &&
      eps.predicate.selection.selection.type === "noun" &&
      isUnisexNounEntry(eps.predicate.selection.selection.entry)
    ) {
      const predicate = eps.predicate.selection.selection;
      const adjusted: T.NPSelection = {
        type: "NP",
        selection: {
          ...predicate,
          ...(predicate.numberCanChange
            ? {
                number: personNumber(subject.selection.person),
              }
            : {}),
          ...(predicate.genderCanChange
            ? {
                gender: personGender(subject.selection.person),
              }
            : {}),
        },
      };
      return {
        ...eps,
        blocks: adjustSubjectSelection(eps.blocks, subject),
        predicate: {
          ...eps.predicate,
          selection: adjusted,
        },
      };
    }
    const n: T.EPSelectionState = {
      ...eps,
      blocks: adjustSubjectSelection(eps.blocks, subject),
    };
    return subject ? ensureMiniPronounsOk(eps, n, sendAlert) : n;
  }
  if (action.type === "set predicate") {
    const predicate = action.payload;
    if (!predicate) {
      return {
        ...eps,
        predicate: predicate,
      };
    }
    const subject = getSubjectSelection(eps.blocks).selection;
    if (
      subject?.selection.type === "pronoun" &&
      predicate.selection.type === "NP" &&
      predicate.selection.selection.type === "noun" &&
      isUnisexNounEntry(predicate.selection.selection.entry)
    ) {
      const { gender, number } = predicate.selection.selection;
      const pronoun = subject.selection.person;
      const newPronoun = movePersonNumber(
        movePersonGender(pronoun, gender),
        number
      );
      return {
        ...eps,
        blocks: adjustSubjectSelection(eps.blocks, {
          type: "NP",
          selection: {
            ...subject.selection,
            person: newPronoun,
          },
        }),
        predicate: predicate,
      };
    }
    const n: T.EPSelectionState = {
      ...eps,
      predicate: predicate,
    };
    return predicate ? ensureMiniPronounsOk(eps, n, sendAlert) : n;
  }
  if (action.type === "set omitSubject") {
    const n: T.EPSelectionState = {
      ...eps,
      omitSubject: action.payload === "true",
    };
    return ensureMiniPronounsOk(eps, n, sendAlert);
  }
  if (action.type === "set equative") {
    return {
      ...eps,
      blocks: !action.payload.negative
        ? removeHeetsDet(eps.blocks)
        : eps.blocks,
      equative: action.payload,
    };
  }
  if (action.type === "insert new AP") {
    return {
      ...eps,
      blocks: insertNewAP(eps.blocks),
    };
  }
  if (action.type === "set AP") {
    const { index, AP } = action.payload;
    return {
      ...eps,
      blocks: setAP(eps.blocks, index, AP),
    };
  }
  if (action.type === "remove AP") {
    return {
      ...eps,
      blocks: removeAP(eps.blocks, action.payload),
    };
  }
  if (action.type === "shift block") {
    const { index, direction } = action.payload;
    return {
      ...eps,
      blocks: shiftBlock(eps.blocks, index, direction),
    };
  }
  if (action.type === "load EPS") {
    return action.payload;
  }
  throw new Error("unknown epsReducer action");
}

function ensureMiniPronounsOk(
  old: T.EPSelectionState,
  eps: T.EPSelectionState,
  sendAlert?: (msg: string) => void
): T.EPSelectionState {
  const error = checkForMiniPronounsError(eps);
  if (error) {
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
