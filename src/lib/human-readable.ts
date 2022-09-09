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
        : tense === "habitualPerfectivePast"
        ? "habitual simple past"
        // : tense === "habitualImperfectivePast"
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

export function humanReadableVerbForm(f: T.VerbFormName): string {
    return isModalTense(f)
        ? humanReadableModalTense(f)
        : isPerfectTense(f)
        ? humanReadablePerfectTense(f)
        : isImperativeTense(f)
        ? humanReadableImperativeTense(f as T.ImperativeTense)
        : humanReadableVerbTense(f);
}

export function humanReadableEquativeTense(f: T.EquativeTense): string {
    return (f === "pastSubjunctive"
        ? "past subjunctive"
        : f === "wouldBe"
        ? `"would be"`
        : f === "wouldHaveBeen"
        ? `"would have been"`
        : f) + " equative";
}