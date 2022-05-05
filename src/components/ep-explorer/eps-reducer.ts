import * as T from "../../types";
import {
    personGender,
    personNumber,
} from "../../lib/misc-helpers";
import { isUnisexNounEntry } from "../../lib/type-predicates";
import { checkForMiniPronounsError } from "../../lib/phrase-building/compile";

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
};

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
                subject,
            };
        }
        if (subject.type === "pronoun" && eps.predicate.type === "NP" && eps.predicate.NP?.type === "noun" && isUnisexNounEntry(eps.predicate.NP.entry)) {
            const predicate = eps.predicate.NP;
            const adjusted = {
                ...predicate,
                ...predicate.numberCanChange ? {
                    number: personNumber(subject.person),
                } : {},
                ...predicate.genderCanChange ? {
                    gender: personGender(subject.person),
                } : {},
            }
            return {
                ...eps,
                subject,
                predicate: {
                    ...eps.predicate,
                    NP: adjusted,
                },
            };
        }
        const n: T.EPSelectionState = {
            ...eps,
            subject,
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
        if (eps.subject?.type === "pronoun" && selection.type === "noun" && isUnisexNounEntry(selection.entry)) {
            const { gender, number } = selection;
            const pronoun = eps.subject.person;
            const newPronoun = movePersonNumber(movePersonGender(pronoun, gender), number);
            return {
                ...eps,
                subject: {
                    ...eps.subject,
                    person: newPronoun,
                },
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
    // if (action.type === "set equative") {
        return {
            ...eps,
            equative: action.payload,
        }
    // }
}

function ensureMiniPronounsOk(old: T.EPSelectionState, eps: T.EPSelectionState, sendAlert?: (msg: string) => void): T.EPSelectionState {
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