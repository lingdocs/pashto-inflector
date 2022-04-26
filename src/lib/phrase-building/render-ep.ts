import * as T from "../../types";
import * as g from "../grammar-units";
import {
    getPersonFromNP,
} from "./vp-tools";
import { renderNPSelection } from "./render-np";
import { getPersonFromVerbForm } from "../../lib/misc-helpers";
import { getVerbBlockPosFromPerson } from "../misc-helpers";
import { getEnglishWord } from "../get-english-word";
import { isUnisexSet, psStringFromEntry } from "../p-text-helpers";
import { inflectWord } from "../pashto-inflector";
import { personGender, personIsPlural } from "../../library";
import { isLocativeAdverbEntry } from "../type-predicates";

export function renderEP(EP: T.EPSelectionComplete): T.EPRendered {
    const kingPerson = (EP.subject.type === "pronoun")
        ? getPersonFromNP(EP.subject)
        : EP.predicate.type === "NP"
        ? getPersonFromNP(EP.predicate.selection)
        : getPersonFromNP(EP.subject);
    return {
        type: "EPRendered",
        king: EP.predicate.type === "Complement" ? "subject" : "predicate",
        subject: renderNPSelection(EP.subject, false, false, "subject"),
        predicate: EP.predicate.type === "NP"
            ? renderNPSelection(EP.predicate.selection, false, true, "subject")
            : renderEqCompSelection(EP.predicate.selection, kingPerson),
        equative: renderEquative(EP.equative, kingPerson),
        englishBase: equativeBuilders[EP.equative.tense](kingPerson, EP.equative.negative),
    };
}

export function getEquativeForm(tense: T.EquativeTense): { hasBa: boolean, form: T.SingleOrLengthOpts<T.VerbBlock> } {
    const hasBa = (tense === "future" || tense === "wouldBe");
    const baseTense = (tense === "future")
        ? "habitual"
        : tense === "wouldBe"
        ? "past"
        : tense;
    return {
        hasBa,
        form: g.equativeEndings[baseTense],
    }
}

function renderEquative(es: T.EquativeSelection, person: T.Person): T.EquativeRendered {
    const { form, hasBa } = getEquativeForm(es.tense)
    const ps = getPersonFromVerbForm(form, person);
    return {
        ...es,
        person,
        hasBa,
        ps,
    };
}

function renderEqCompSelection(s: T.EqCompSelection, person: T.Person): T.Rendered<T.EqCompSelection> {
    const e = getEnglishWord(s.entry);
    if (!e || typeof e !== "string") {
        console.log(e);
        throw new Error("error getting english for compliment");
    }
    if (isLocativeAdverbEntry(s.entry)) {
        return {
            type: "loc. adv.",
            entry: s.entry,
            ps: [psStringFromEntry(s.entry)],
            e,
            inflected: false,
            person,
        };
    }
    if (s.type === "adjective") {
        const infs = inflectWord(s.entry);
        if (!infs) return {
            type: "adjective",
            entry: s.entry,
            ps: [psStringFromEntry(s.entry)],
            e,
            inflected: false,
            person,
        }
        if (!infs.inflections || !isUnisexSet(infs.inflections)) {
            throw new Error("error getting inflections for adjective, looks like a noun's inflections");
        }
        return {
            type: "adjective",
            entry: s.entry,
            ps: chooseInflection(infs.inflections, person),
            e,
            inflected: false,
            person,
        };
    }
    throw new Error("invalid EqCompSelection");
}

const equativeBuilders: Record<T.EquativeTense, (p: T.Person, n: boolean) => string[]> = {
    present: (p, n) => {
        return [
            `$SUBJ ${getEnglishConj(p, g.englishEquative.present)}${not(n)} $PRED`,
        ];
    },
    habitual: (p, n) => {
        return [
            `$SUBJ ${getEnglishConj(p, g.englishEquative.present)}${not(n)} $PRED`,
            `$SUBJ tend${isThirdPersonSing(p) ? "s" : ""}${not(n)} to be $PRED`,
        ];
    },
    subjunctive: (p, n) => {
        return [
            `$SUBJ ${getEnglishConj(p, g.englishEquative.present)}${not(n)} $PRED`,
            `...that $SUBJ ${getEnglishConj(p, g.englishEquative.present)}${not(n)} $PRED`,
            `$SUBJ should${not(n)} be $PRED`,
        ];
    },
    future: (p, n) => {
        return [
            `$SUBJ will${not(n)} be $PRED`,
            `I betcha $SUBJ ${getEnglishConj(p, g.englishEquative.present)}${not(n)} $PRED`,
        ];
    },
    past: (p, n) => {
        return [
            `$SUBJ ${getEnglishConj(p, g.englishEquative.past)}${not(n)} $PRED`,
        ];
    },
    wouldBe: (p, n) => {
        return [
            `$SUBJ would ${n ? "not " : ""}be $PRED`,
            `$SUBJ would ${n ? "not " : ""}have been $PRED`,
            `$SUBJ ${getEnglishConj(p, g.englishEquative.past)} probably${not(n)} $PRED`,
        ]; 
    },
    pastSubjunctive: () => {
        return [
            `$SUBJ should have been $PRED`,
            `(that) $SUBJ were $PRED`,
        ];
    },
}

function isThirdPersonSing(p: T.Person): boolean {
    return p === T.Person.ThirdSingMale || p === T.Person.ThirdPlurFemale;
}
function not(n: boolean): string {
    return n ? "not " : "";
}

function getEnglishConj(p: T.Person, e: string | T.EnglishBlock): string {
    if (typeof e === "string") {
        return e;
    }
    const [row, col] = getVerbBlockPosFromPerson(p);
    return e[row][col];
}

function chooseInflection(inflections: T.UnisexSet<T.InflectionSet>, pers: T.Person): T.ArrayOneOrMore<T.PsString> {
    const gender = personGender(pers);
    const plural = personIsPlural(pers);
    return inflections[gender][plural ? 1 : 0];
}

