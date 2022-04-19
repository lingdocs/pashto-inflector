import * as T from "../../types";
import {
    concatPsString,
    psRemove,
    psStringEquals,
} from "../../lib/p-text-helpers";
import { isPerfectTense } from "../type-predicates";
import * as grammarUnits from "../../lib/grammar-units";

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

export function getTenseVerbForm(conjR: T.VerbConjugation, tense: T.VerbTense | T.PerfectTense | T.ModalTense, voice: "active" | "passive"): T.VerbForm {
    const conj = (voice === "passive" && conjR.passive) ? conjR.passive : conjR;
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
        return conj.perfect.affirmational;
    }
    if (tense === "pastSubjunctivePerfect") {
        return conj.perfect.pastSubjunctiveHypothetical;
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
    if (np.type === "participle") {
        return T.Person.ThirdPlurMale;
    }
    if (np.type === "pronoun") {
        return np.person;
    }
    return np.number === "plural"
        ? (np.gender === "masc" ? T.Person.ThirdPlurMale : T.Person.ThirdPlurFemale)
        : (np.gender === "masc" ? T.Person.ThirdSingMale : T.Person.ThirdSingFemale);
}

export function removeBa(ps: T.PsString): T.PsString {
    return psRemove(ps, concatPsString(grammarUnits.baParticle, " "));
}

export function getTenseFromVerbSelection(vs: T.VerbSelection): T.VerbTense | T.PerfectTense | T.ModalTense {
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
            return "perfectiveFutureModal";
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
    // vs.tenseCategory === "modal"
    return verbTenseToModalTense(vs.verbTense);
}

export function isPastTense(tense: T.VerbTense | T.PerfectTense | T.ModalTense): boolean {
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

export function switchSubjObj(vps: T.VPSelection): T.VPSelection;
export function switchSubjObj(vps: T.VPSelectionComplete): T.VPSelectionComplete;
export function switchSubjObj(vps: T.VPSelection | T.VPSelectionComplete): T.VPSelection | T.VPSelectionComplete {
    if ("tenseCategory" in vps.verb) {
        if (!vps.subject || !(typeof vps.verb.object === "object")) {
            return vps;
        }
        return {
            ...vps,
            subject: vps.verb.object,
            verb: {
                ...vps.verb,
                object: vps.subject,
            },
        };
    }
    if (!vps.subject|| !vps.verb || !(typeof vps.verb.object === "object")) {
        return vps;
    }
    return {
        ...vps,
        subject: vps.verb.object,
        verb: {
            ...vps.verb,
            object: vps.subject,
        }
    };
}

export function completeVPSelection(vps: T.VPSelection): T.VPSelectionComplete | undefined {
    if (vps.subject === undefined) {
        return undefined;
    }
    if (vps.verb.object === undefined) {
        return undefined;
    }
    // necessary for this version on typscript ...
    const verb: T.VerbSelectionComplete = {
        ...vps.verb,
        object: vps.verb.object,
        tense: getTenseFromVerbSelection(vps.verb),
    };
    const subject = vps.subject;
    return {
        ...vps,
        subject,
        verb,
    };
}