import * as T from "../../../types";
import {
    concatPsString,
    psRemove,
    psStringEquals,
} from "../p-text-helpers";
import { isImperativeTense, isPerfectTense } from "../type-predicates";
import * as grammarUnits from "../grammar-units";
import { isSecondPerson, randomNumber } from "../misc-helpers";
import { adjustObjectSelection, adjustSubjectSelection, getObjectSelection, getSubjectSelection, VPSBlocksAreComplete } from "./blocks-utils";

export function isInvalidSubjObjCombo(subj: T.Person, obj: T.Person): boolean {
    const firstPeople = [
        T.Person.FirstSingMale,
        T.Person.FirstSingFemale,
        T.Person.FirstPlurMale,
        T.Person.FirstPlurFemale,
    ];
    const secondPeople = [
        T.Person.SecondSingMale,
        T.Person.SecondSingFemale,
        T.Person.SecondPlurMale,
        T.Person.SecondPlurFemale,
    ];
    return (
        (firstPeople.includes(subj) && firstPeople.includes(obj))
        ||
        (secondPeople.includes(subj) && secondPeople.includes(obj))
    );
}

export function getTenseVerbForm(
    conjR: T.VerbConjugation,
    tense: T.VerbTense | T.PerfectTense | T.ModalTense | T.ImperativeTense,
    voice: "active" | "passive",
    negative: boolean,
): T.VerbForm | T.ImperativeForm {
    const conj = (voice === "passive" && conjR.passive) ? conjR.passive : conjR;
    if (isImperativeTense(tense)) {
        const impPassError = new Error("can't use imperative tenses with passive voice")
        if (voice === "passive") {
            throw impPassError;
        }
        if (!conj.imperfective.imperative || !conj.perfective.imperative) throw impPassError;
        return (tense === "perfectiveImperative" && !negative)
            ? conj.perfective.imperative
            : conj.imperfective.imperative;
    }
    if (tense === "presentVerb") {
        return conj.imperfective.nonImperative;
    }
    if (tense === "subjunctiveVerb") {
        return conj.perfective.nonImperative;
    }
    if (tense === "imperfectiveFuture") {
        return conj.imperfective.future;
    }
    if (tense === "perfectiveFuture") {
        return conj.perfective.future;
    }
    if (tense === "imperfectivePast") {
        return conj.imperfective.past;
    }
    if (tense === "perfectivePast") {
        return conj.perfective.past;
    }
    if (tense === "habitualImperfectivePast") {
        return conj.imperfective.habitualPast;
    }
    if (tense === "habitualPerfectivePast") {
        return conj.perfective.habitualPast;
    }
    if (tense === "presentVerbModal") {
        return conj.imperfective.modal.nonImperative;
    }
    if (tense === "subjunctiveVerbModal") {
        return conj.perfective.modal.nonImperative;
    }
    if (tense === "imperfectiveFutureModal") {
        return conj.imperfective.modal.future;
    }
    if (tense === "perfectiveFutureModal") {
        return conj.perfective.modal.future;
    }
    if (tense === "imperfectivePastModal") {
        return conj.imperfective.modal.past;
    }
    if (tense === "perfectivePastModal") {
        return conj.perfective.modal.past;
    }
    if (tense === "habitualImperfectivePastModal") {
        return conj.imperfective.modal.habitualPast;
    }
    if (tense === "habitualPerfectivePastModal") {
        return conj.perfective.modal.habitualPast;
    }
    if (tense === "presentPerfect") {
        return conj.perfect.present;
    }
    if (tense === "pastPerfect") {
        return conj.perfect.past;
    }
    if (tense === "futurePerfect") {
        return conj.perfect.future;
    }
    if (tense === "habitualPerfect") {
        return conj.perfect.habitual;
    }
    if (tense === "subjunctivePerfect") {
        return conj.perfect.subjunctive;
    }
    if (tense === "wouldBePerfect") {
        return conj.perfect.wouldBe;
    }
    if (tense === "pastSubjunctivePerfect") {
        return conj.perfect.pastSubjunctive;
    }
    if (tense === "wouldHaveBeenPerfect") {
        return conj.perfect.wouldHaveBeen;
    }
    throw new Error("unknown tense");
}

export function getPersonFromNP(np: T.NPSelection): T.Person;
export function getPersonFromNP(np: T.NPSelection | T.ObjectNP): T.Person | undefined;
export function getPersonFromNP(np: T.NPSelection | T.ObjectNP): T.Person | undefined {
    if (np === "none") {
        return undefined;
    }
    if (typeof np === "number") return np;
    if (np.selection.type === "participle") {
        return T.Person.ThirdPlurMale;
    }
    if (np.selection.type === "pronoun") {
        return np.selection.person;
    }
    return np.selection.number === "plural"
        ? (np.selection.gender === "masc" ? T.Person.ThirdPlurMale : T.Person.ThirdPlurFemale)
        : (np.selection.gender === "masc" ? T.Person.ThirdSingMale : T.Person.ThirdSingFemale);
}

export function removeBa(ps: T.PsString): T.PsString {
    return psRemove(ps, concatPsString(grammarUnits.baParticle, " "));
}

export function getTenseFromVerbSelection(vs: T.VerbSelection): T.VerbTense | T.PerfectTense | T.ModalTense | T.ImperativeTense {
    function verbTenseToModalTense(tn: T.VerbTense): T.ModalTense {
        if (tn === "presentVerb") {
            return "presentVerbModal";
        }
        if (tn === "subjunctiveVerb") {
            return "subjunctiveVerbModal";
        }
        if (tn === "imperfectiveFuture") {
            return "imperfectiveFutureModal";
        }
        if (tn === "perfectiveFuture") {
            return "perfectiveFutureModal";
        }
        if (tn === "perfectivePast") {
            return "perfectivePastModal";
        }
        if (tn === "imperfectivePast") {
            return "imperfectivePastModal";
        }
        if (tn === "habitualImperfectivePast") {
            return "habitualImperfectivePastModal";
        }
        if (tn === "habitualPerfectivePast") {
            return "habitualPerfectivePastModal";
        }
        throw new Error("can't convert non verbTense to modalTense");
    }
    if (vs.tenseCategory === "basic") {
        return vs.verbTense;
    }
    if (vs.tenseCategory === "perfect") {
        return vs.perfectTense;
    }
    if (vs.tenseCategory === "imperative") {
        return vs.imperativeTense;
    }
    // vs.tenseCategory === "modal"
    return verbTenseToModalTense(vs.verbTense);
}

export function isPastTense(tense: T.Tense): boolean {
    if (isPerfectTense(tense)) return true;
    return tense.toLowerCase().includes("past");
}

export function removeDuplicates(psv: T.PsString[]): T.PsString[] {
    return psv.filter((ps, i, arr) => (
        i === arr.findIndex(t => (
            psStringEquals(t, ps)
        ))
    ));
}

export function switchSubjObj<V extends T.VPSelectionState | T.VPSelectionComplete>(vps: V): V {
    const subject = getSubjectSelection(vps.blocks).selection;
    const object = getObjectSelection(vps.blocks).selection;
    if ("tenseCategory" in vps.verb) {
        if (!subject || !(typeof object === "object") || (vps.verb.tenseCategory === "imperative")) {
            return vps;
        }
        return {
            ...vps,
            blocks: adjustObjectSelection(
                adjustSubjectSelection(vps.blocks, object),
                subject,
            ),
        };
    }
    if (!subject|| !vps.verb || !(typeof object === "object")) {
        return vps;
    }
    return {
        ...vps,
        blocks: adjustObjectSelection(
            adjustSubjectSelection(vps.blocks, object),
            subject,
        ),
    };
}

export function completeVPSelection(vps: T.VPSelectionState): T.VPSelectionComplete | undefined {
    if (!VPSBlocksAreComplete(vps.blocks)) {
        return undefined;
    }
    // necessary for this version on typscript ...
    const verb: T.VerbSelectionComplete = {
        ...vps.verb,
        tense: getTenseFromVerbSelection(vps.verb),
    };
    return {
        ...vps,
        verb,
        blocks: vps.blocks,
    };
}

export function isThirdPerson(p: T.Person): boolean {
    return (
        p === T.Person.ThirdSingMale ||
        p === T.Person.ThirdSingFemale ||
        p === T.Person.ThirdPlurMale ||
        p === T.Person.ThirdPlurFemale
    );
}

export function ensure2ndPersSubjPronounAndNoConflict(vps: T.VPSelectionState): T.VPSelectionState {
    const subject = getSubjectSelection(vps.blocks).selection;
    const object = getObjectSelection(vps.blocks).selection;
    const subjIs2ndPerson = (subject?.selection.type === "pronoun") && isSecondPerson(subject.selection.person);
    const objIs2ndPerson = (typeof object === "object")
        && (object.selection.type === "pronoun")
        && isSecondPerson(object.selection.person);
    const default2ndPersSubject: T.NPSelection = {
        type: "NP",
        selection: {
            type: "pronoun",
            distance: "far",
            person: T.Person.SecondSingMale,
        },
    };
    function getNon2ndPersPronoun() {
        let newObjPerson: T.Person;
        do {
            newObjPerson = randomNumber(0, 12);
        } while(isSecondPerson(newObjPerson));
        return newObjPerson;
    }
    if (subjIs2ndPerson && !objIs2ndPerson) {
        return vps;
    }
    if (subjIs2ndPerson && objIs2ndPerson)  {
        if (typeof object !== "object" || object.selection.type !== "pronoun") {
            return vps;
        }
        return {
            ...vps,
            blocks: adjustObjectSelection(vps.blocks, {
                type: "NP",
                selection: {
                    ...object.selection,
                    person: getNon2ndPersPronoun(),
                },
            }),
        };
    }
    if (!subjIs2ndPerson && objIs2ndPerson) {
        if (typeof object !== "object" || object.selection.type !== "pronoun") {
            return {
                ...vps,
                blocks: adjustSubjectSelection(vps.blocks, default2ndPersSubject)
            };
        }
        return {
            ...vps,
            blocks: adjustObjectSelection(
                adjustSubjectSelection(vps.blocks, default2ndPersSubject),
                {
                    type: "NP",
                    selection: {
                        ...object.selection,
                        person: getNon2ndPersPronoun(),
                    },
                },
            ),
        };
    }
    if (!subjIs2ndPerson && !objIs2ndPerson) {
        return {
            ...vps,
            blocks: adjustSubjectSelection(vps.blocks, default2ndPersSubject),
        };
    }
    throw new Error("error ensuring compatible VPSelection for imperative verb");
}