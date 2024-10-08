import * as T from "../../../types";
import { getVerbBlockPosFromPerson, parseEc } from "../misc-helpers";
import * as grammarUnits from "../grammar-units";
import {
  isImperativeTense,
  isPerfectTense,
  isVerbTense,
  // isModalTense,
} from "../type-predicates";

function engHave(s: T.Person): string {
  function isThirdPersonSing(p: T.Person): boolean {
    return p === T.Person.ThirdSingMale || p === T.Person.ThirdSingFemale;
  }
  return isThirdPersonSing(s) ? "has" : "have";
}

export function renderEnglishVPBase({
  subjectPerson,
  object,
  vs,
}: {
  subjectPerson: T.Person;
  object: T.NPSelection | T.ObjectNP;
  vs: T.VerbSelectionComplete;
}): string[] {
  const ec = parseEc(vs.verb.entry.ec || "");
  // in case there's something left with the deprecated ep as _____
  const ep = vs.verb.entry.ep?.includes("__") ? undefined : vs.verb.entry.ep;
  function engEquative(tense: "past" | "present", s: T.Person): string {
    const [row, col] = getVerbBlockPosFromPerson(s);
    return grammarUnits.englishEquative[tense][row][col];
  }
  function engPresC(
    s: T.Person,
    ec: T.EnglishVerbConjugationEc | [string, string]
  ): string {
    function isThirdPersonSing(p: T.Person): boolean {
      return p === T.Person.ThirdSingMale || p === T.Person.ThirdSingFemale;
    }
    return isThirdPersonSing(s) ? ec[1] : ec[0];
  }
  function isToBe(v: T.EnglishVerbConjugationEc): boolean {
    return v[2] === "being";
  }
  // TODO: Pull these out to a seperate entity and import it
  const basicBuilders: Record<
    T.VerbTense,
    (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => string[]
  > = {
    presentVerb: (s: T.Person, ec: T.EnglishVerbConjugationEc, n: boolean) => [
      `$SUBJ ${
        isToBe(ec)
          ? `${engEquative("present", s)}${n ? " not" : ""}`
          : `${n ? engPresC(s, ["don't", "doesn't"]) : ""} ${
              n ? ec[0] : engPresC(s, ec)
            }`
      }`,
      `$SUBJ ${engEquative("present", s)}${n ? " not" : ""} ${ec[2]}`,
    ],
    subjunctiveVerb: (
      _: T.Person,
      ec: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `$SUBJ should${n ? " not" : ""} ${isToBe(ec) ? "be" : ec[0]}`,
      `that $SUBJ ${n ? " won't" : " will"} ${isToBe(ec) ? "be" : ec[0]}`,
    ],
    imperfectiveFuture: (
      _: T.Person,
      ec: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `$SUBJ will${n ? " not" : ""} ${isToBe(ec) ? "be" : ec[0]}`,
      // `$SUBJ will${n ? " not" : ""} be ${isToBe(ec) ? "be" : ec[2]}`, \\ doesn't seem fully correct
    ],
    perfectiveFuture: (
      _: T.Person,
      ec: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ will${n ? " not" : ""} ${isToBe(ec) ? "be" : ec[0]}`],
    imperfectivePast: (
      s: T.Person,
      ec: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      //  - subj pastEquative (N && "not") ec.2 obj
      `$SUBJ ${engEquative("past", s)}${n ? " not" : ""} ${ec[2]}`,
      //  - subj "would" (N && "not") ec.0 obj
      `$SUBJ would${n ? " not" : ""} ${isToBe(ec) ? "be" : ec[0]}`,
      //  - subj pastEquative (N && "not") going to" ec.0 obj
      `$SUBJ ${engEquative("past", s)}${n ? " not" : ""} going to ${
        isToBe(ec) ? "be" : ec[0]
      }`,
    ],
    perfectivePast: (
      s: T.Person,
      ec: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `$SUBJ${
        isToBe(ec)
          ? ` ${engEquative("past", s)}${n ? " not" : ""}`
          : n
          ? ` did not ${ec[0]}`
          : ` ${ec[3]}`
      }`,
    ],
    habitualPerfectivePast: (
      _: T.Person,
      ec: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `$SUBJ would${n ? " not" : ""} ${isToBe(ec) ? "be" : ec[0]}`,
      `$SUBJ used to${n ? " not" : ""} ${isToBe(ec) ? "be" : ec[0]}`,
    ],
    habitualImperfectivePast: (
      _: T.Person,
      ec: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `$SUBJ would${n ? " not" : ""} ${isToBe(ec) ? "be" : ec[0]}`,
      `$SUBJ used to${n ? " not" : ""} ${isToBe(ec) ? "be" : ec[0]}`,
    ],
  };
  const modalBuilders: Record<
    T.AbilityTense,
    (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => string[]
  > = {
    presentVerbModal: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ can${n ? "'t" : ""} ${isToBe(v) ? "be" : v[0]}`],
    subjunctiveVerbModal: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`that $SUBJ can${n ? "'t" : ""} ${isToBe(v) ? "be" : v[0]}`],
    imperfectiveFutureModal: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ will${n ? " not" : ""} be able to ${isToBe(v) ? "be" : v[0]}`],
    perfectiveFutureModal: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ will${n ? " not" : ""} be able to ${isToBe(v) ? "be" : v[0]}`],
    imperfectivePastModal: (
      s: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `$SUBJ ${engEquative("past", s)} ${n ? " not" : ""} able to ${
        isToBe(v) ? "be" : v[0]
      }`,
      `$SUBJ could${n ? " not" : ""} ${v[0]}`,
    ],
    perfectivePastModal: (
      s: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `$SUBJ ${engEquative("past", s)} ${n ? " not" : ""} able to ${
        isToBe(v) ? "be" : v[0]
      }`,
      `$SUBJ could${n ? " not" : ""} ${isToBe(v) ? "be" : v[0]}`,
    ],
    habitualImperfectivePastModal: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `$SUBJ used to ${n ? " not" : ""} be able to ${isToBe(v) ? "be" : v[0]}`,
      `$SUBJ would ${n ? " not" : ""} be able to ${isToBe(v) ? "be" : v[0]}`,
    ],
    habitualPerfectivePastModal: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `$SUBJ used to ${n ? " not" : ""} be able to ${isToBe(v) ? "be" : v[0]}`,
      `$SUBJ would ${n ? " not" : ""} be able to ${isToBe(v) ? "be" : v[0]}`,
    ],
  };
  const perfectBuilders: Record<
    T.PerfectTense,
    (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => string[]
  > = {
    presentPerfect: (
      s: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ ${engHave(s)}${n ? " not" : ""} ${v[4]}`],
    pastPerfect: (_: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => [
      `$SUBJ had${n ? " not" : ""} ${v[4]}`,
    ],
    habitualPerfect: (
      s: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ ${engHave(s)}${n ? " not" : ""} ${v[4]}`],
    subjunctivePerfect: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`that $SUBJ will have${n ? " not" : ""} ${v[4]}`],
    futurePerfect: (_: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => [
      `$SUBJ will${n ? " not" : ""} have ${v[4]}`,
    ],
    wouldBePerfect: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `$SUBJ would${n ? " not" : ""} have ${v[4]}`,
      `$SUBJ had probably ${n ? " not" : ""} ${v[4]}`,
    ],
    pastSubjunctivePerfect: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `$SUBJ should${n ? " not" : ""} have ${v[4]}`,
      `$SUBJ ${n ? "didn't have" : "had"} to ${v[0]}`,
      `$SUBJ had${n ? " not" : ""} to have ${v[4]}`,
      `$SUBJ would${n ? " not" : ""} have ${v[4]}`,
    ],
    wouldHaveBeenPerfect: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ would${n ? " not" : ""} have ${v[4]}`],
  };
  const passiveBasicBuilders: Record<
    T.VerbTense,
    (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => string[]
  > = {
    presentVerb: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => [
      `$SUBJ ${engEquative("present", s)}${n ? " not" : ""} being ${v[4]}`,
      `$SUBJ ${engEquative("present", s)}${n ? " not" : ""} ${v[4]}`,
    ],
    subjunctiveVerb: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `$SUBJ should ${n ? " not" : ""} be ${v[4]}`,
      `that $SUBJ will${n ? " not" : ""} be ${v[4]}`,
    ],
    imperfectiveFuture: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ will${n ? " not" : ""} be ${v[4]}`],
    perfectiveFuture: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ will${n ? " not" : ""} be ${v[4]}`],
    imperfectivePast: (
      s: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `$SUBJ ${engEquative("past", s)}${n ? " not" : ""} being ${v[4]}`,
      `$SUBJ would${n ? " not" : ""} be ${v[4]}`,
    ],
    perfectivePast: (
      s: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ ${engEquative("past", s)}${n ? " not" : ""} ${v[4]}`],
    habitualPerfectivePast: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ would${n ? " not" : ""} be ${v[4]}`],
    habitualImperfectivePast: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ would${n ? " not" : ""} be ${v[4]}`],
  };
  const passivePerfectBuilders: Record<
    T.PerfectTense,
    (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => string[]
  > = {
    presentPerfect: (
      s: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ ${engHave(s)}${n ? " not" : ""} been ${v[4]}`],
    pastPerfect: (_: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => [
      `$SUBJ had${n ? " not" : ""} been ${v[4]}`,
    ],
    habitualPerfect: (
      s: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ ${engHave(s)}${n ? " not" : ""} been ${v[4]}`],
    subjunctivePerfect: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`that $SUBJ will${n ? " not" : ""} have been ${v[4]}`],
    futurePerfect: (_: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => [
      `$SUBJ will${n ? " not" : ""} have been ${v[4]}`,
    ],
    wouldBePerfect: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ will${n ? " not" : ""} have been ${v[4]}`],
    pastSubjunctivePerfect: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ would${n ? " not" : ""} have been ${v[4]}`],
    wouldHaveBeenPerfect: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ would${n ? " not" : ""} have been ${v[4]}`],
  };
  const passiveModalBuilders: Record<
    T.AbilityTense,
    (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => string[]
  > = {
    presentVerbModal: (
      s: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `$SUBJ can${n ? " not" : ""} be ${v[4]}`,
      `$SUBJ ${engEquative("present", s)}${n ? " not" : ""} able to be ${v[4]}`,
    ],
    subjunctiveVerbModal: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `that $SUBJ will${n ? " not" : ""} be able to be ${v[4]}`,
      `that $SUBJ ${n ? " not" : ""} be able to be ${v[4]}`,
    ],
    imperfectiveFutureModal: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ will${n ? " not" : ""} be able to be ${v[4]}`],
    perfectiveFutureModal: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ will${n ? " not" : ""} be able to be ${v[4]}`],
    imperfectivePastModal: (
      s: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `$SUBJ would${n ? " not" : ""} be able to be ${v[4]}`,
      `$SUBJ ${engEquative("past", s)}${n ? " not" : ""} being able to be ${
        v[4]
      }`,
    ],
    perfectivePastModal: (
      s: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [
      `$SUBJ ${engEquative("past", s)}${n ? " not" : ""} able to be ${v[4]}`,
    ],
    habitualPerfectivePastModal: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ would${n ? " not" : ""} be able to be ${v[4]}`],
    habitualImperfectivePastModal: (
      _: T.Person,
      v: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ would${n ? " not" : ""} be able to be ${v[4]}`],
  };
  const imperativeBuilders: Record<
    T.ImperativeTense,
    (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => string[]
  > = {
    imperfectiveImperative: (
      _: T.Person,
      ec: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ ${n ? "don't " : ""}${ec[0]}!`],
    perfectiveImperative: (
      _: T.Person,
      ec: T.EnglishVerbConjugationEc,
      n: boolean
    ) => [`$SUBJ ${n ? "don't " : ""}${ec[0]}!`],
  };
  const base = (
    isPerfectTense(vs.tense)
      ? (vs.voice === "active" ? perfectBuilders : passivePerfectBuilders)[
          vs.tense
        ]
      : isVerbTense(vs.tense)
      ? (vs.voice === "active" ? basicBuilders : passiveBasicBuilders)[vs.tense]
      : isImperativeTense(vs.tense)
      ? imperativeBuilders[vs.tense]
      : (vs.voice === "active" ? modalBuilders : passiveModalBuilders)[vs.tense]
  )(subjectPerson, ec, vs.negative);
  return base.map((b) =>
    `${b}${typeof object === "object" ? " $OBJ" : ""}${ep ? ` ${ep}` : ""}${
      isImperativeTense(vs.tense) ? " (command)" : ""
    }`
      .replace("  ", " ")
      .trim()
  );
}
