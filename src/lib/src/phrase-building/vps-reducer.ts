import * as T from "../../../types";
import { isInvalidSubjObjCombo } from "./vp-tools";
import { switchSubjObj } from "./vp-tools";
import { ensure2ndPersSubjPronounAndNoConflict } from "./vp-tools";
import { isPerfectTense, isImperativeTense } from "../type-predicates";
import { checkForMiniPronounsError } from "./compile";
import {
  adjustObjectSelection,
  adjustSubjectSelection,
  getObjectSelection,
  getSubjectSelection,
  insertNewAP,
  removeAP,
  removeHeetsDet,
  setAP,
  shiftBlock,
} from "./blocks-utils";
import {
  changeStatDyn,
  changeTransitivity,
  makeVPSelectionState,
} from "./verb-selection";

export type VpsReducerAction =
  | {
      type: "load vps";
      payload: T.VPSelectionState;
    }
  | {
      type: "set subject";
      payload: {
        subject: T.NPSelection | undefined;
        skipPronounConflictCheck?: boolean;
      };
    }
  | {
      type: "set object";
      payload: T.NPSelection | undefined;
    }
  | {
      type: "swap subj/obj";
    }
  | {
      type: "set form";
      payload: T.FormVersion;
    }
  | {
      type: "set voice";
      payload: "active" | "passive";
    }
  | {
      type: "set transitivity";
      payload: "transitive" | "grammatically transitive";
    }
  | {
      type: "set statDyn";
      payload: "stative" | "dynamic";
    }
  | {
      type: "set negativity";
      payload: "true" | "false";
    }
  | {
      type: "set tense";
      payload: T.VerbTense | T.PerfectTense | T.ImperativeTense | undefined;
    }
  | {
      type: "set tense category";
      payload: "basic" | "modal" | "perfect" | "imperative";
    }
  | {
      type: "toggle servant shrink";
    }
  | {
      type: "toggle king remove";
    }
  | {
      type: "set verb";
      payload: T.VerbEntry;
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
      type: "set externalComplement";
      payload:
        | T.ComplementSelection
        | T.UnselectedComplementSelection
        | undefined;
    };

export function vpsReducer(
  vps: T.VPSelectionState,
  action: VpsReducerAction,
  sendAlert?: (msg: string) => void
): T.VPSelectionState {
  function doReduce(): T.VPSelectionState {
    if (action.type === "load vps") {
      return action.payload;
    }
    if (action.type === "set subject") {
      const { subject, skipPronounConflictCheck } = action.payload;
      const object = getObjectSelection(vps.blocks).selection;
      if (!skipPronounConflictCheck && hasPronounConflict(subject, object)) {
        if (sendAlert) sendAlert("That combination of pronouns is not allowed");
        return vps;
      }
      return {
        ...vps,
        blocks: adjustSubjectSelection(vps.blocks, action.payload.subject),
      };
    }
    if (action.type === "set object") {
      if (!vps.verb) return vps;
      const objectB = getObjectSelection(vps.blocks).selection;
      const subjectB = getSubjectSelection(vps.blocks).selection;
      if (objectB === "none" || typeof objectB === "number") {
        return vps;
      }
      const object = action.payload;
      // check for pronoun conflict
      if (hasPronounConflict(subjectB, object)) {
        if (sendAlert) sendAlert("That combination of pronouns is not allowed");
        return vps;
      }
      return {
        ...vps,
        blocks: adjustObjectSelection(vps.blocks, object),
      };
    }
    if (action.type === "swap subj/obj") {
      if (vps.verb?.isCompound === "dynamic") return vps;
      return switchSubjObj(vps);
    }
    if (action.type === "set form") {
      return {
        ...vps,
        form: action.payload,
      };
    }
    if (action.type === "set voice") {
      if (vps.verb && vps.verb.canChangeVoice) {
        const subject = getSubjectSelection(vps.blocks).selection;
        const object = getObjectSelection(vps.blocks).selection;
        const voice = action.payload;
        if (voice === "passive" && vps.verb.tenseCategory === "imperative") {
          return vps;
        }
        if (voice === "passive") {
          return {
            ...vps,
            blocks: adjustObjectSelection(
              adjustSubjectSelection(
                vps.blocks,
                typeof object === "object" ? object : undefined
              ),
              "none"
            ),
            verb: {
              ...vps.verb,
              voice,
              // tenseCategory: vps.verb.tenseCategory === "modal" ? "basic" : vps.verb.tenseCategory,
            },
          };
        } else {
          return {
            ...vps,
            blocks: adjustObjectSelection(
              adjustSubjectSelection(vps.blocks, undefined),
              typeof subject === "object" ? subject : undefined
            ),
            verb: {
              ...vps.verb,
              voice,
            },
          };
        }
      } else {
        return vps;
      }
    }
    if (action.type === "set transitivity") {
      if (!(vps.verb && vps.verb.canChangeTransitivity)) return vps;
      return changeTransitivity(vps, action.payload);
    }
    if (action.type === "set statDyn") {
      if (!(vps.verb && vps.verb.canChangeStatDyn)) return vps;
      return changeStatDyn(vps, action.payload);
    }
    if (action.type === "set negativity") {
      if (!vps.verb) return vps;
      const negative = action.payload === "true";
      return {
        ...vps,
        blocks: !negative ? removeHeetsDet(vps.blocks) : vps.blocks,
        verb: {
          ...vps.verb,
          negative,
        },
      };
    }
    if (action.type === "set tense") {
      const tense = action.payload;
      if (!(vps.verb && tense)) return vps;
      if (isPerfectTense(tense)) {
        return {
          ...vps,
          verb: {
            ...vps.verb,
            perfectTense: tense,
            tenseCategory: "perfect",
          },
        };
      } else if (isImperativeTense(tense)) {
        return {
          ...vps,
          verb: {
            ...vps.verb,
            imperativeTense: tense,
            tenseCategory: "imperative",
          },
        };
      } else {
        return {
          ...vps,
          verb: {
            ...vps.verb,
            verbTense: tense,
            tenseCategory:
              vps.verb.tenseCategory === "perfect"
                ? "basic"
                : vps.verb.tenseCategory,
          },
        };
      }
    }
    if (action.type === "set tense category") {
      if (!vps.verb) return vps;
      const category = action.payload;
      if (category === "imperative") {
        return ensure2ndPersSubjPronounAndNoConflict({
          ...vps,
          verb: {
            ...vps.verb,
            voice: "active",
            tenseCategory: category,
          },
        });
      }
      if (category === "modal") {
        return {
          ...vps,
          verb: {
            ...vps.verb,
            tenseCategory: category,
          },
        };
      }
      return {
        ...vps,
        verb: {
          ...vps.verb,
          tenseCategory: category,
        },
      };
    }
    if (action.type === "toggle servant shrink") {
      return {
        ...vps,
        form: {
          ...vps.form,
          shrinkServant: !vps.form.shrinkServant,
        },
      };
    }
    if (action.type === "toggle king remove") {
      return {
        ...vps,
        form: {
          ...vps.form,
          removeKing: !vps.form.removeKing,
        },
      };
    }
    if (action.type === "set verb") {
      return makeVPSelectionState(action.payload, vps);
    }
    if (action.type === "insert new AP") {
      return {
        ...vps,
        blocks: insertNewAP(vps.blocks),
      };
    }
    if (action.type === "set AP") {
      const { index, AP } = action.payload;
      return {
        ...vps,
        blocks: setAP(vps.blocks, index, AP),
      };
    }
    if (action.type === "remove AP") {
      return {
        ...vps,
        blocks: removeAP(vps.blocks, action.payload),
      };
    }
    if (action.type === "shift block") {
      const { index, direction } = action.payload;
      return {
        ...vps,
        blocks: shiftBlock(vps.blocks, index, direction),
      };
    }
    if (action.type === "set externalComplement") {
      const selection = action.payload;
      return {
        ...vps,
        externalComplement:
          selection === undefined
            ? // TODO: this is a bit messy
              // when using the ComplementPicker with an EP - undefined means it hasn't been selected
              // when using the ComplementPicker with a VP - undefined means there can be no complement
              { type: "complement", selection: { type: "unselected" } }
            : selection,
      };
    }
    throw new Error("unknown vpsReducer state");
  }
  const modified = doReduce();
  const err = checkForMiniPronounsError(modified);
  if (err) {
    if (sendAlert) sendAlert(err);
    return vps;
  }
  return modified;
}

function hasPronounConflict(
  subject: T.NPSelection | undefined,
  object: undefined | T.VerbObject
): boolean {
  const subjPronoun =
    subject && subject.selection.type === "pronoun"
      ? subject.selection
      : undefined;
  const objPronoun =
    object && typeof object === "object" && object.selection.type === "pronoun"
      ? object.selection
      : undefined;
  if (!subjPronoun || !objPronoun) return false;
  return isInvalidSubjObjCombo(subjPronoun.person, objPronoun.person);
}
