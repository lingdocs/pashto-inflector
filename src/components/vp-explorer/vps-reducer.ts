import * as T from "../../types";
import {
    isInvalidSubjObjCombo,
} from "../../lib/phrase-building/vp-tools";
import { switchSubjObj } from "../../lib/phrase-building/vp-tools";
import { changeStatDyn, changeTransitivity } from "./verb-selection";
import { ensure2ndPersSubjPronounAndNoConflict } from "../../lib/phrase-building/vp-tools";
import {
    isPerfectTense,
    isImperativeTense,
} from "../../lib/type-predicates";
import { checkForMiniPronounsError } from "../../lib/phrase-building/compile";

export type VpsReducerAction = {
    type: "load vps",
    payload: T.VPSelectionState,
} | {
    type: "set subject",
    payload: {
        subject: T.NPSelection | undefined,
        skipPronounConflictCheck?: boolean,
    },
} | {
    type: "set object",
    payload: T.NPSelection | undefined,
} | {
    type: "swap subj/obj",
} | {
    type: "set form",
    payload: T.FormVersion,
} | {
    type: "set voice",
    payload: "active" | "passive",
} | {
    type: "set transitivity",
    payload: "transitive" | "grammatically transitive",
} | {
    type: "set statDyn",
    payload: "stative" | "dynamic",
} | {
    type: "set negativity",
    payload: "true" | "false",
} | {
    type: "set tense",
    payload: T.VerbTense | T.PerfectTense | T.ImperativeTense | undefined,
} | {
    type: "set tense category",
    payload: "basic" | "modal" | "perfect" | "imperative",
} | {
    type: "toggle servant shrink",
};

export function vpsReducer(vps: T.VPSelectionState, action: VpsReducerAction, sendAlert?: (msg: string) => void): T.VPSelectionState {
    return ensureMiniPronounsOk(vps, doReduce());
    function ensureMiniPronounsOk(old: T.VPSelectionState, vps: T.VPSelectionState): T.VPSelectionState {
        const error = checkForMiniPronounsError(vps);
        if (error) {
            if (sendAlert) sendAlert(error);
            return old;
        }
        return vps;
    }
    function doReduce(): T.VPSelectionState {
        if (action.type === "load vps") {
            console.log("doing loading", action.payload);
            return action.payload;
        }
        if (action.type === "set subject") {
            const { subject, skipPronounConflictCheck } = action.payload;
            if (
                !skipPronounConflictCheck
                &&
                hasPronounConflict(subject, vps.verb?.object)
            ) {
                if (sendAlert) sendAlert("That combination of pronouns is not allowed");
                return vps;
            }
            return {
                ...vps,
                subject: action.payload.subject,
            };
        }
        if (action.type === "set object") {
            if (!vps.verb) return vps;
            if ((vps.verb.object === "none") || (typeof vps.verb.object === "number")) {
                return vps;
            }
            const object = action.payload;
            // check for pronoun conflict
            if (hasPronounConflict(vps.subject, object)) {
                if (sendAlert) sendAlert("That combination of pronouns is not allowed");
                return vps;
            }
            return {
                ...vps,
                verb: {
                    ...vps.verb,
                    object,
                },
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
                const voice = action.payload;
                if (voice === "passive" && vps.verb.tenseCategory === "imperative") {
                    return vps;
                }
                if (voice === "passive") {
                    return {
                        ...vps,
                        subject: typeof vps.verb.object === "object" ? vps.verb.object : undefined,
                        verb: {
                            ...vps.verb,
                            object: "none",
                            voice,
                        },
                    };
                } else {
                    return {
                        ...vps,
                        subject: undefined,
                        verb: {
                            ...vps.verb,
                            // TODO: is this ok??
                            object: typeof vps.subject === "object" ? vps.subject : undefined,
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
            return {
                ...vps,
                verb: changeTransitivity(vps.verb, action.payload),
            };
        }
        if (action.type === "set statDyn") {
            if (!(vps.verb && vps.verb.canChangeStatDyn)) return vps;
            return {
                ...vps,
                verb: changeStatDyn(vps.verb, action.payload),
            };
        }
        if (action.type === "set negativity") {
            if (!vps.verb) return vps;
            return {
                ...vps,
                verb: {
                    ...vps.verb,
                    negative: action.payload === "true",
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
                        tenseCategory: vps.verb.tenseCategory === "perfect"
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
            return {
                ...vps,
                verb: {
                    ...vps.verb,
                    tenseCategory: category,
                },
            };
        }
        // if (action.type === "toggle servant shrink") {
        return {
            ...vps,
            form: {
                ...vps.form,
                shrinkServant: !vps.form.shrinkServant,
            },
        };
        // }
    }
}

function hasPronounConflict(subject: T.NPSelection | undefined, object: undefined | T.VerbObject): boolean {
    const subjPronoun = (subject && subject.type === "pronoun") ? subject : undefined;
    const objPronoun = (object && typeof object === "object" && object.type === "pronoun") ? object : undefined; 
    if (!subjPronoun || !objPronoun) return false;
    return isInvalidSubjObjCombo(subjPronoun.person, objPronoun.person);
}