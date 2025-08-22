import type * as T from "../../../types";
import type { JSX } from "react";

export const verbTenseOptions: { label: string | JSX.Element, value: T.VerbTense, formula: string }[] = [{
  label: <div><i className="fas fa-video mr-2" />present</div>,
  value: "presentVerb",
  formula: "imperfective stem + present verb ending",
}, {
  label: <div><i className="fas fa-camera mr-2" />subjunctive</div>,
  value: "subjunctiveVerb",
  formula: "perfective stem + present verb ending",
}, {
  label: <div><i className="fas fa-video mr-2" />imperfective future</div>,
  value: "imperfectiveFuture",
  formula: "ba + present",
}, {
  label: <div><i className="fas fa-camera mr-2" />perfective future</div>,
  value: "perfectiveFuture",
  formula: "ba + subjunctive",
}, {
  label: <div><i className="fas fa-video mr-2" />continuous past</div>,
  value: "imperfectivePast",
  formula: "imperfective root + past verb ending",
}, {
  label: <div><i className="fas fa-camera mr-2" />simple past</div>,
  value: "perfectivePast",
  formula: "perfective root + past verb ending",
}, {
  label: <div><i className="fas fa-video mr-2" />habitual continual past</div>,
  value: "habitualImperfectivePast",
  formula: "ba + continuous past",
}, {
  label: <div><i className="fas fa-camera mr-2" />habitual simple past</div>,
  value: "habitualPerfectivePast",
  formula: "ba + simple past",
}];

export const abilityTenseOptions: { label: string | JSX.Element, value: T.VerbTense, formula: string }[] = [{
  label: <div><i className="fas fa-video mr-2" />present ability</div>,
  value: "presentVerb",
  formula: "ability imperfective stem + present verb ending",
}, {
  label: <div><i className="fas fa-camera mr-2" />subjunctive ability</div>,
  value: "subjunctiveVerb",
  formula: "ability perfective stem + present verb ending",
}, {
  label: <div><i className="fas fa-video mr-2" />imperfective future ability</div>,
  value: "imperfectiveFuture",
  formula: "ba + present ability",
}, {
  label: <div><i className="fas fa-camera mr-2" />perfective future ability</div>,
  value: "perfectiveFuture",
  formula: "ba + subjunctive ability",
}, {
  label: <div><i className="fas fa-video mr-2" />continuous past ability</div>,
  value: "imperfectivePast",
  formula: "ability imperfective root + past verb ending",
}, {
  label: <div><i className="fas fa-camera mr-2" />simple past ability</div>,
  value: "perfectivePast",
  formula: "ability perfective root + past verb ending",
}, {
  label: <div><i className="fas fa-video mr-2" />habitual continual past ability</div>,
  value: "habitualImperfectivePast",
  formula: "ba + continuous past ability",
}, {
  label: <div><i className="fas fa-camera mr-2" />habitual simple past ability</div>,
  value: "habitualPerfectivePast",
  formula: "ba + simple past ability",
}];

export const perfectTenseOptions: { label: string | JSX.Element, value: T.PerfectTense, formula: string }[] = [{
  label: "Present Perfect",
  value: "presentPerfect",
  formula: "past participle + present equative",
}, {
  label: "Habitual Perfect",
  value: "habitualPerfect",
  formula: "past participle + habitual equative",
}, {
  label: "Subjunctive Perfect",
  value: "subjunctivePerfect",
  formula: "past participle + subjunctive equative",
}, {
  label: "Future Perfect",
  value: "futurePerfect",
  formula: "past participle + future equative",
}, {
  label: "Past Perfect",
  value: "pastPerfect",
  formula: "past participle + past equative",
}, {
  label: `"Would Be" Perfect`,
  value: "wouldBePerfect",
  formula: `past participle + "would be" equative`,
}, {
  label: "Past Subjunctive Perfect",
  value: "pastSubjunctivePerfect",
  formula: "past participle + past subjunctive equative",
}, {
  label: `"Would Have Been" Perfect`,
  value: "wouldHaveBeenPerfect",
  formula: `past participle + "would have been" equative`,
}];

export const imperativeTenseOptions: { label: string | JSX.Element, value: T.ImperativeTense, formula: string }[] = [{
  label: <div><i className="fas fa-video mr-2" />imperfective imperative</div>,
  value: "imperfectiveImperative",
  formula: "imperfective stem + imperative ending",
}, {
  label: <div><i className="fas fa-camera mr-2" />perfective imperative</div>,
  value: "perfectiveImperative",
  formula: "perfective stem + imperative ending",
}];
