import * as T from "../../../types";
import * as O from "optics-ts";
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

const blocks = O.optic_<T.VPSelectionState>().prop("blocks");
const form = O.optic_<T.VPSelectionState>().prop("form");
const verbVoice = O.optic<T.VPSelectionState>().prop("verb").prop("voice");
const verbSelection = O.optic<T.VPSelectionState>().prop("verb");

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
      return O.modify(blocks)(adjustSubjectSelection(action.payload.subject))(
        vps
      );
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
      return O.set(blocks)(adjustObjectSelection(vps.blocks, object))(vps);
    }
    if (action.type === "swap subj/obj") {
      if (vps.verb?.isCompound === "dynamic") return vps;
      return switchSubjObj(vps);
    }
    if (action.type === "set form") {
      return O.set(form)(action.payload)(vps);
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
          return O.set(verbVoice)(voice)(
            O.set(blocks)(
              adjustObjectSelection(
                adjustSubjectSelection(
                  typeof object === "object" ? object : undefined
                )(vps.blocks),
                "none"
              )
            )(vps)
          );
        } else {
          return O.set(verbVoice)(voice)(
            O.set(blocks)(
              adjustObjectSelection(
                adjustSubjectSelection(undefined)(vps.blocks),
                typeof subject === "object" ? subject : undefined
              )
            )(vps)
          );
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
        return O.set(verbSelection)({
          ...vps.verb,
          perfectTense: tense,
          tenseCategory: "perfect",
        } satisfies T.VerbSelection)(vps);
      } else if (isImperativeTense(tense)) {
        return O.set(verbSelection)({
          ...vps.verb,
          imperativeTense: tense,
          tenseCategory: "imperative",
        } satisfies T.VerbSelection)(vps);
      } else {
        return O.set(verbSelection)({
          ...vps.verb,
          verbTense: tense,
          tenseCategory:
            vps.verb.tenseCategory === "perfect"
              ? "basic"
              : vps.verb.tenseCategory,
        } satisfies T.VerbSelection)(vps);
      }
    }
    if (action.type === "set tense category") {
      if (!vps.verb) return vps;
      const category = action.payload;
      if (category === "imperative") {
        return ensure2ndPersSubjPronounAndNoConflict(
          O.set(verbSelection)({
            ...vps.verb,
            voice: "active",
            tenseCategory: category,
          } satisfies T.VerbSelection)(vps)
        );
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
      return O.modify(blocks)(insertNewAP)(vps);
    }
    if (action.type === "set AP") {
      const { index, AP } = action.payload;
      return O.modify(blocks)(setAP(index, AP))(vps);
    }
    if (action.type === "remove AP") {
      return O.modify(blocks)(removeAP(action.payload))(vps);
    }
    if (action.type === "shift block") {
      const { index, direction } = action.payload;
      return O.modify(blocks)(shiftBlock(index, direction))(vps);
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
