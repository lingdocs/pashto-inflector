import * as T from "../../types";
import * as g from "../grammar-units";
import {
    getPersonFromNP,
} from "./vp-tools";
import { renderNPSelection } from "./render-np";
import { getPersonFromVerbForm } from "../../lib/misc-helpers";
import { getVerbBlockPosFromPerson } from "../misc-helpers";
import { getEnglishWord } from "../get-english-word";
import { psStringFromEntry } from "../p-text-helpers";
import { isLocativeAdverbEntry } from "../type-predicates";
import { renderAdjectiveSelection } from "./render-adj";
import { renderSandwich } from "./render-sandwich";
import { EPSBlocksAreComplete, getSubjectSelection } from "./blocks-utils";

export function renderEP(EP: T.EPSelectionComplete): T.EPRendered {
    const subject = getSubjectSelection(EP.blocks).selection;
    const king = (subject.type === "pronoun")
        ? "subject"
        : EP.predicate.type === "NP"
        ? "predicate"
        : "subject";
    // TODO: less repetative logic
    const kingPerson = king === "subject"
        ? getPersonFromNP(subject)
        : EP.predicate.type === "NP"
        ? getPersonFromNP(EP.predicate.selection)
        : getPersonFromNP(subject);
    const kingIsParticiple = king === "subject"
        ? (subject.type === "participle")
        : (EP.predicate.type === "NP" && EP.predicate.selection.type === "participle");
    return {
        type: "EPRendered",
        king: EP.predicate.type === "Complement" ? "subject" : "predicate",
        blocks: renderEPSBlocks(EP.blocks, king),
        predicate: EP.predicate.type === "NP"
            ? renderNPSelection(EP.predicate.selection, false, true, "subject", "king")
            : renderEqCompSelection(EP.predicate.selection, kingPerson),
        equative: renderEquative(EP.equative, kingPerson),
        englishBase: equativeBuilders[EP.equative.tense](
            kingIsParticiple ? T.Person.ThirdSingMale : kingPerson,
            EP.equative.negative,
        ),
        omitSubject: EP.omitSubject,
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

function renderEPSBlocks(blocks: T.EPSBlockComplete[], king: "subject" | "predicate"): (T.Rendered<T.SubjectSelectionComplete> | T.Rendered<T.APSelection>)[] {
    return blocks.map(({ block }): (T.Rendered<T.SubjectSelectionComplete> | T.Rendered<T.APSelection>) => {
        if (block.type === "adverb") {
            return renderAdverbSelection(block);
        }
        if (block.type === "sandwich") {
            return renderSandwich(block);
        }
        return {
            type: "subjectSelection",
            selection: renderNPSelection(block.selection, false, false, "subject", king === "subject" ? "king" : "none")
        };
    });
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

function renderAdverbSelection(a: T.AdverbSelection): T.Rendered<T.AdverbSelection> {
    const e = getEnglishWord(a.entry);
    if (!e || typeof e !== "string") {
        console.log(e);
        throw new Error("error getting english for compliment");
    }
    return {
        type: "adverb",
        entry: a.entry,
        ps: [psStringFromEntry(a.entry)],
        e,
    };
}

function renderEqCompSelection(s: T.EqCompSelection, person: T.Person): T.Rendered<T.EqCompSelection> {
    if (s.type === "sandwich") {
        return renderSandwich(s);
    }
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
            role: "none",
        };
    }
    if (s.type === "adjective") {
        return renderAdjectiveSelection(s, person, false, "none")
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
            `$SUBJ ${n ? "don't " : ""}be $PRED`,
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
    return n ? " not " : "";
}

function getEnglishConj(p: T.Person, e: string | T.EnglishBlock): string {
    if (typeof e === "string") {
        return e;
    }
    const [row, col] = getVerbBlockPosFromPerson(p);
    return e[row][col];
}

// function chooseInflection(inflections: T.UnisexSet<T.InflectionSet>, pers: T.Person): T.ArrayOneOrMore<T.PsString> {
//     const gender = personGender(pers);
//     const plural = personIsPlural(pers);
//     return inflections[gender][plural ? 1 : 0];
// }


export function completeEPSelection(eps: T.EPSelectionState): T.EPSelectionComplete | undefined {
    if (!EPSBlocksAreComplete(eps.blocks)) {
        return undefined;
    }
    if (eps.predicate.type === "Complement") {
        const selection = eps.predicate.Complement;
        if (!selection) return undefined;
        return {
            ...eps,
            blocks: eps.blocks,
            predicate: {
                type: "Complement",
                selection,
            },
        };
    }
    // predicate is NP
    const selection = eps.predicate.NP;
    if (!selection) return undefined;
    return {
        ...eps,
        blocks: eps.blocks,
        predicate: {
            type: "NP",
            selection,
        },
    };
}
