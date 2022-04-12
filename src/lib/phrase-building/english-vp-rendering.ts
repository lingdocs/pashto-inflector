import * as T from "../../types";
import { getVerbBlockPosFromPerson, parseEc } from "../misc-helpers";
import * as grammarUnits from "../grammar-units";

function engHave(s: T.Person): string {
    function isThirdPersonSing(p: T.Person): boolean {
        return (
            p === T.Person.ThirdSingMale ||
            p === T.Person.ThirdSingFemale
        );
    }
    return isThirdPersonSing(s) ? "has" : "have";
}

export function renderEnglishVPBase({ subjectPerson, object, vs }: {
    subjectPerson: T.Person,
    object: T.NPSelection | T.ObjectNP,
    vs: T.VerbSelection,
}): string[] {
    const ec = parseEc(vs.verb.entry.ec || "");
    const ep = vs.verb.entry.ep;
    function engEquative(tense: "past" | "present", s: T.Person): string {
        const [row, col] = getVerbBlockPosFromPerson(s);
        return grammarUnits.englishEquative[tense][row][col];
    }
    function engPresC(s: T.Person, ec: T.EnglishVerbConjugationEc | [string, string]): string {
        function isThirdPersonSing(p: T.Person): boolean {
            return (
                p === T.Person.ThirdSingMale ||
                p === T.Person.ThirdSingFemale
            );
        }
        return isThirdPersonSing(s) ? ec[1] : ec[0];
    }
    function isToBe(v: T.EnglishVerbConjugationEc): boolean {
        return (v[2] === "being");
    }
    const futureEngBuilder: T.EnglishBuilder = (s: T.Person, ec: T.EnglishVerbConjugationEc, n: boolean) => ([
        `$SUBJ will${n ? " not" : ""} ${isToBe(ec) ? "be" : ec[0]}`,
    ]);
    // TODO: Pull these out to a seperate entity and import it
    const basicBuilders: Record<
        T.VerbTense,
        (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => string[]
    > = {
        presentVerb: (s: T.Person, ec: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ ${isToBe(ec)
                ? `${engEquative("present", s)}${n ? " not" : ""}`
                : `${n ? engPresC(s, ["don't", "doesn't"]) : ""} ${n ? ec[0] : engPresC(s, ec)}`}`,
            `$SUBJ ${engEquative("present", s)}${n ? " not" : ""} ${ec[2]}`,
        ]),
        subjunctiveVerb: (s: T.Person, ec: T.EnglishVerbConjugationEc, n: boolean) => ([
            `that $SUBJ ${n ? " won't" : " will"} ${isToBe(ec) ? "be" : ec[0]}`,
            `should $SUBJ ${n ? " not" : ""} ${isToBe(ec) ? "be" : ec[0]}`,
        ]),
        imperfectiveFuture: futureEngBuilder,
        perfectiveFuture: futureEngBuilder,
        imperfectivePast: (s: T.Person, ec: T.EnglishVerbConjugationEc, n: boolean) => ([
            //  - subj pastEquative (N && "not") ec.2 obj
            `$SUBJ ${engEquative("past", s)}${n ? " not" : ""} ${ec[2]}`,
            //  - subj "would" (N && "not") ec.0 obj
            `$SUBJ would${n ? " not" : ""} ${isToBe(ec) ? "be" : ec[0]}`,
            //  - subj pastEquative (N && "not") going to" ec.0 obj
            `$SUBJ ${engEquative("past", s)}${n ? " not" : ""} going to ${isToBe(ec) ? "be" : ec[0]}`,
        ]),
        perfectivePast: (s: T.Person, ec: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ${isToBe(ec)
                ? ` ${engEquative("past", s)}${n ? " not" : ""}`
                : (n ? ` did not ${ec[0]}` : ` ${ec[3]}`)
            }`
        ]),
        habitualPerfectivePast: (s: T.Person, ec: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ would${n ? " not" : ""} ${isToBe(ec) ? "be" : ec[0]}`,
            `$SUBJ used to${n ? " not" : ""} ${isToBe(ec) ? "be" : ec[0]}`,
        ]),
        habitualImperfectivePast: (s: T.Person, ec: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ would${n ? " not" : ""} ${isToBe(ec) ? "be" : ec[0]}`,
            `$SUBJ used to${n ? " not" : ""} ${isToBe(ec) ? "be" : ec[0]}`,
        ]),
    };
    const modalBuilders: Record<
        T.VerbTense,
        (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => string[]
    > = {
        presentVerb: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ can${n ? "'t" : ""} ${isToBe(v) ? "be" : v[0]}`,
        ]),
        subjunctiveVerb: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `that $SUBJ can${n ? "'t" : ""} ${isToBe(v) ? "be" : v[0]}`,
        ]),
        imperfectiveFuture: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ will${n ? " not" : ""} be able to ${isToBe(v) ? "be" : v[0]}`,
        ]),
        perfectiveFuture: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ will${n ? " not" : ""} be able to ${isToBe(v) ? "be" : v[0]}`,
        ]),
        imperfectivePast: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ ${engEquative("past", s)} ${n ? " not" : ""} able to ${isToBe(v) ? "be" : v[0]}`,
            `$SUBJ could${n ? " not" : ""} ${v[0]}`,
        ]),
        perfectivePast: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ ${engEquative("past", s)} ${n ? " not" : ""} able to ${isToBe(v) ? "be" : v[0]}`,
            `$SUBJ could${n ? " not" : ""} ${isToBe(v) ? "be" : v[0]}`,
        ]),
        habitualImperfectivePast: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ used to ${n ? " not" : ""} be able to ${isToBe(v) ? "be" : v[0]}`,
            `$SUBJ would ${n ? " not" : ""} be able to ${isToBe(v) ? "be" : v[0]}`,
        ]),
        habitualPerfectivePast: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ used to ${n ? " not" : ""} be able to ${isToBe(v) ? "be" : v[0]}`,
            `$SUBJ would ${n ? " not" : ""} be able to ${isToBe(v) ? "be" : v[0]}`,
        ]),
    };
    const perfectBuilders: Record<
        T.PerfectTense,
        (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => string[]
    > = {
        "present perfect": (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ ${engHave(s)}${n ? " not" : ""} ${v[4]}`,
        ]),
        "past perfect": (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ had${n ? " not" : ""} ${v[4]}`,
        ]),
        "habitual perfect": (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ ${engHave(s)}${n ? " not" : ""} ${v[4]}`,
        ]),
        "subjunctive perfect": (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `that $SUBJ will have${n ? " not" : ""} ${v[4]}`,
        ]),
        "future perfect": (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ will${n ? " not" : ""} have ${v[4]}`,
        ]),
        "wouldBe perfect": (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ would${n ? " not" : ""} have ${v[4]}`,
        ]),
        "pastSubjunctive perfect": (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ would${n ? " not" : ""} have ${v[4]}`,
            `$SUBJ should${n ? " not" : ""} have ${v[4]}`,
        ]),
    }
    const passiveBasicBuilders: Record<
        T.VerbTense,
        (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => string[]
    > = {
        presentVerb: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ ${engEquative("present", s)}${n ? " not" : ""} being ${v[4]}`,
            `$SUBJ ${engEquative("present", s)}${n ? " not" : ""} ${v[4]}`,
        ]),
        subjunctiveVerb: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `that $SUBJ will${n ? " not" : ""} be ${v[4]}`,
        ]),
        imperfectiveFuture: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ will${n ? " not" : ""} be ${v[4]}`,
        ]),
        perfectiveFuture: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ will${n ? " not" : ""} be ${v[4]}`,
        ]),
        imperfectivePast: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ ${engEquative("past", s)}${n ? " not" : ""} being ${v[4]}`,
            `$SUBJ would${n ? " not" : ""} be ${v[4]}`,
        ]),
        perfectivePast: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ ${engEquative("past", s)}${n ? " not" : ""} ${v[4]}`,
        ]),
        habitualPerfectivePast: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ would${n ? " not" : ""} be ${v[4]}`,
        ]),
        habitualImperfectivePast: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ would${n ? " not" : ""} be ${v[4]}`,
        ]),
    };
    const passivePerfectBuilders: Record<
        T.PerfectTense,
        (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => string[]
    > = {
        "present perfect": (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ ${engHave(s)}${n ? " not" : ""} been ${v[4]}`,
        ]),
        "past perfect": (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ had${n ? " not" : ""} been ${v[4]}`,
        ]),
        "habitual perfect": (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ ${engHave(s)}${n ? " not" : ""} been ${v[4]}`,
        ]),
        "subjunctive perfect": (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `that $SUBJ will${n ? " not" : ""} have been ${v[4]}`,
        ]),
        "future perfect": (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ will${n ? " not" : ""} have been ${v[4]}`,
        ]),
        "wouldBe perfect": (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ will${n ? " not" : ""} have been ${v[4]}`,
        ]),
        "pastSubjunctive perfect": (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ would${n ? " not" : ""} have been ${v[4]}`,
        ]),
    }
    const passiveModalBuilders: Record<
        T.VerbTense,
        (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => string[]
    > = {
        presentVerb: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ can${n ? " not" : ""} be ${v[4]}`,
            `$SUBJ ${engEquative("present", s)}${n ? " not" : ""} able to be ${v[4]}`,
        ]),
        subjunctiveVerb: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `that $SUBJ will${n ? " not" : ""} be able to be ${v[4]}`,
            `that $SUBJ ${n ? " not" : ""} be able to be ${v[4]}`,
        ]),
        imperfectiveFuture: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ will${n ? " not" : ""} be able to be ${v[4]}`,
        ]),
        perfectiveFuture: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ will${n ? " not" : ""} be able to be ${v[4]}`,
        ]),
        imperfectivePast: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ would${n ? " not" : ""} be able to be ${v[4]}`,
            `$SUBJ ${engEquative("past", s)}${n ? " not" : ""} being able to be ${v[4]}`,
        ]),
        perfectivePast: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ ${engEquative("past", s)}${n ? " not" : ""} able to be ${v[4]}`,
        ]),
        habitualPerfectivePast: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ would${n ? " not" : ""} be able to be ${v[4]}`,
        ]),
        habitualImperfectivePast: (s: T.Person, v: T.EnglishVerbConjugationEc, n: boolean) => ([
            `$SUBJ would${n ? " not" : ""} be able to be ${v[4]}`,
        ]),
    };
    const base = (
        (vs.tenseCategory === "perfect")
        ? (vs.voice === "active" ? perfectBuilders : passivePerfectBuilders)[vs.tense]
        : vs.tenseCategory === "basic"
        ? (vs.voice === "active" ? basicBuilders : passiveBasicBuilders)[vs.tense]
        : (vs.voice === "active" ? modalBuilders : passiveModalBuilders)[vs.tense])(subjectPerson, ec, vs.negative);
    return base.map(b => `${b}${typeof object === "object" ? " $OBJ" : ""}${ep ? ` ${ep}` : ""}`);
}