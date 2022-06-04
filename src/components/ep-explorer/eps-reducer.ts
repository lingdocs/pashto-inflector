import * as T from "../../types";
import {
    personGender,
    personNumber,
} from "../../lib/misc-helpers";
import { isUnisexNounEntry } from "../../lib/type-predicates";
import { checkEPForMiniPronounsError } from "../../lib/phrase-building/compile";
import { adjustSubjectSelection, getSubjectSelection, insertNewAP, removeAP, setAP, shiftBlock } from "../../lib/phrase-building/blocks-utils";

type EpsReducerAction = {
    type: "set predicate type",
    payload: "NP" | "Complement",
} | {
    type: "set subject",
    payload: T.NPSelection | undefined,
} | {
    type: "set predicate NP",
    payload: T.NPSelection | undefined,
} | {
    type: "set predicate comp",
    payload: T.EqCompSelection | undefined,
} | {
    type: "set omitSubject",
    payload: "true" | "false",
} | {
    type: "set equative",
    payload: T.EquativeSelection,
} | {
    type: "insert new AP",
} | {
    type: "set AP",
    payload: {
        index: number,
        AP: T.APSelection | undefined,
    },
} | {
    type: "remove AP",
    payload: number,
} | {
    type: "shift block",
    payload: {
        index: number,
        direction: "back" | "forward",
    },
} | {
    type: "load EPS",
    payload: T.EPSelectionState,
}

export default function epsReducer(eps: T.EPSelectionState, action: EpsReducerAction, sendAlert?: (msg: string) => void): T.EPSelectionState {
    if (action.type === "set predicate type") {
        return {
            ...eps,
            predicate: {
                ...eps.predicate,
                type: action.payload,
            },
        };
    }
    if (action.type === "set subject") {
        const subject = action.payload;
        if (!subject) {
            return {
                ...eps,
                blocks: adjustSubjectSelection(eps.blocks, subject),
            };
        }
        if (subject.selection.type === "pronoun" && eps.predicate.type === "NP" && eps.predicate.NP?.selection.type === "noun" && isUnisexNounEntry(eps.predicate.NP.selection.entry)) {
            const predicate = eps.predicate.NP.selection;
            const adjusted = {
                ...predicate,
                ...predicate.numberCanChange ? {
                    number: personNumber(subject.selection.person),
                } : {},
                ...predicate.genderCanChange ? {
                    gender: personGender(subject.selection.person),
                } : {},
            }
            return {
                ...eps,
                blocks: adjustSubjectSelection(eps.blocks, subject),
                predicate: {
                    ...eps.predicate,
                    NP: {
                        type: "NP",
                        selection: adjusted,
                    },
                },
            };
        }
        const n: T.EPSelectionState = {
            ...eps,
            blocks: adjustSubjectSelection(eps.blocks, subject),
        };
        return subject ? ensureMiniPronounsOk(eps, n, sendAlert) : n;
    }
    if (action.type === "set predicate NP") {
        const selection = action.payload;
        if (!selection) {
            return {
                ...eps,
                predicate: {
                    ...eps.predicate,
                    NP: selection,
                },
            };
        }
        const subject = getSubjectSelection(eps.blocks).selection;
        if (subject?.selection.type === "pronoun" && selection.selection.type === "noun" && isUnisexNounEntry(selection.selection.entry)) {
            const { gender, number } = selection.selection;
            const pronoun = subject.selection.person;
            const newPronoun = movePersonNumber(movePersonGender(pronoun, gender), number);
            return {
                ...eps,
                blocks: adjustSubjectSelection(eps.blocks, {
                    type: "NP",
                    selection: {
                        ...subject.selection,
                        person: newPronoun,
                    },
                }),
                predicate: {
                    ...eps.predicate,
                    NP: selection,
                },
            };
        }
        const n: T.EPSelectionState = {
            ...eps,
            predicate: {
                ...eps.predicate,
                NP: selection,
            },
        };
        return selection ? ensureMiniPronounsOk(eps, n, sendAlert) : n;
    }
    if (action.type === "set predicate comp") {
        return {
            ...eps,
            predicate: {
                ...eps.predicate,
                Complement: action.payload,
            },
        };
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
            equative: action.payload,
        }
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

function ensureMiniPronounsOk(old: T.EPSelectionState, eps: T.EPSelectionState, sendAlert?: (msg: string) => void): T.EPSelectionState {
    const error = checkEPForMiniPronounsError(eps);
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
    return (gender === "masc") ? (p - 1) : (p + 1);
}

function movePersonNumber(p: T.Person, number: T.NounNumber): T.Person {
    const pNumber = personNumber(p);
    if (pNumber === number) {
        return p;
    }
    return (number === "plural")
        ? (p + 6)
        : (p - 6);
}