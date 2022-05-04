import * as T from "../../types";
import {
    personGender,
    personNumber,
} from "../../lib/misc-helpers";
import { isUnisexNounEntry } from "../../lib/type-predicates";

export type EpsReducerAction = {
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
    type: "shrink possesive",
    payload: number | undefined,
} | {
    type: "set omitSubject",
    payload: "true" | "false",
} | {
    type: "set equative",
    payload: T.EquativeSelection,
};

export default function epsReducer(eps: T.EPSelectionState, action: EpsReducerAction): T.EPSelectionState {
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
        return massageSubjectChange(action.payload, eps);
    }
    if (action.type === "set predicate NP") {
        return massageNPPredicateChange(action.payload, eps);
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
    if (action.type === "shrink possesive") {
        return {
            ...eps,
            shrunkenPossesive: action.payload,
        };
    }
    if (action.type === "set omitSubject") {
        return {
            ...eps,
            omitSubject: action.payload === "true",
        };
    }
    // if (action.type === "set equative") {
        return {
            ...eps,
            equative: action.payload,
        }
    // }
}

function massageSubjectChange(subject: T.NPSelection | undefined, old: T.EPSelectionState): T.EPSelectionState {
    if (!subject) {
        return {
            ...old,
            subject,
        };
    }
    if (subject.type === "pronoun" && old.predicate.type === "NP" && old.predicate.NP?.type === "noun" && isUnisexNounEntry(old.predicate.NP.entry)) {
        const predicate = old.predicate.NP;
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
            ...old,
            subject,
            predicate: {
                ...old.predicate,
                NP: adjusted,
            },
        };
    }
    return {
        ...old,
        subject,
    };
}

function massageNPPredicateChange(selection: T.NPSelection | undefined, old: T.EPSelectionState): T.EPSelectionState {
    if (!selection) {
        return {
            ...old,
            predicate: {
                ...old.predicate,
                NP: selection,
            },
        };
    }
    if (old.subject?.type === "pronoun" && selection.type === "noun" && isUnisexNounEntry(selection.entry)) {
        const { gender, number } = selection;
        const pronoun = old.subject.person;
        const newPronoun = movePersonNumber(movePersonGender(pronoun, gender), number);
        return {
            ...old,
            subject: {
                ...old.subject,
                person: newPronoun,
            },
            predicate: {
                ...old.predicate,
                NP: selection,
            },
        };
    }
    return {
        ...old,
        predicate: {
            ...old.predicate,
            NP: selection,
        },
    };
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