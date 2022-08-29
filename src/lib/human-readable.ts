import * as T from "../types";
import {
    isModalTense,
    isPerfectTense,
    isImperativeTense,
} from "./type-predicates";

function humanReadableVerbTense(tense: T.VerbTense): string {
    return tense === "presentVerb"
        ? "present"
        : tense === "subjunctiveVerb"
        ? "subjunctive"
        : tense === "imperfectiveFuture"
        ? "imperfective future"
        : tense === "perfectiveFuture"
        ? "perfective future"
        : tense === "perfectivePast"
        ? "simple past"
        : tense === "imperfectivePast"
        ? "continuous past"
        : tense === "habitualImperfectivePast"
        ? "habitual simple past"
        // : tense === "habitualPerfectivePast"
        : "habitual continuous past";
}

function humanReadableModalTense(tense: T.ModalTense): string {
    const base = tense.replace("Modal", "") as T.VerbTense;
    return `${humanReadableVerbTense(base)} ability`;
}

function humanReadablePerfectTense(tense: T.PerfectTense): string {
    return tense === "pastPerfect"
        ? "past perfect"
        : tense === "futurePerfect"
        ? "future perfect"
        : tense === "presentPerfect"
        ? "present perfect"
        : tense === "habitualPerfect"
        ? "habitual perfect"
        : tense === "subjunctivePerfect"
        ? "subjunctive perfect"
        : tense === "pastSubjunctivePerfect"
        ? "past subjunctive perfect"
        : tense === "wouldBePerfect"
        ? `"would be" perfect`
        // : tense === "wouldHaveBeenPerfect"
        : `"would have been" perfect`
}

function humanReadableImperativeTense(tense: T.ImperativeTense): string {
    return tense === "imperfectiveImperative"
        ? "imperfective imperative"
        : "perfective imperative";
}

export function humanReadableTense(tense: T.VerbTense | T.PerfectTense | T.ModalTense | T.ImperativeTense): string {
    return isModalTense(tense)
        ? humanReadableModalTense(tense)
        : isPerfectTense(tense)
        ? humanReadablePerfectTense(tense)
        : isImperativeTense(tense)
        ? humanReadableImperativeTense(tense as T.ImperativeTense)
        : humanReadableVerbTense(tense);
}