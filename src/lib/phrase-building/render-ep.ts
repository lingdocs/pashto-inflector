import * as T from "../../types";
import * as g from "../grammar-units";
import {
    getPersonFromNP,
} from "./vp-tools";
import { renderNPSelection } from "./render-np";
import { getFirstSecThird, getPersonFromVerbForm } from "../../lib/misc-helpers";
import { getVerbBlockPosFromPerson } from "../misc-helpers";
import { getEnglishWord } from "../get-english-word";
import { psStringFromEntry } from "../p-text-helpers";
import { isLocativeAdverbEntry } from "../type-predicates";
import { renderAdjectiveSelection } from "./render-adj";
import { renderSandwich } from "./render-sandwich";
import { EPSBlocksAreComplete, getSubjectSelection } from "./blocks-utils";
import { removeAccentsWLength } from "../accent-helpers";
import { pronouns } from "../grammar-units";

export function renderEP(EP: T.EPSelectionComplete): T.EPRendered {
    const { kids, blocks, englishEquativePerson } = getEPSBlocksAndKids(EP);
    return {
        type: "EPRendered",
        blocks,
        kids,
        englishBase: equativeBuilders[EP.equative.tense](
            englishEquativePerson,
            EP.equative.negative,
        ),
        omitSubject: EP.omitSubject,
    };
}

function getEPSBlocksAndKids(EP: T.EPSelectionComplete): { kids: T.Kid[], blocks: T.Block[], englishEquativePerson: T.Person } {
    const subject = getSubjectSelection(EP.blocks).selection;
    const commandingNP: T.NPSelection = subject.selection.type === "pronoun"
        ? subject
        : EP.predicate.selection.type === "NP"
        ? EP.predicate.selection
        : subject;
    const commandingPerson = getPersonFromNP(commandingNP);
    const equative: T.EquativeBlock = { type: "equative", equative: renderEquative(EP.equative, commandingPerson) };
    const blocks: T.Block[] = [
        ...renderEPSBlocks(EP.omitSubject ? EP.blocks.filter(b => b.block.type !== "subjectSelection") : EP.blocks),
        {
            type: "predicateSelection",
            selection: EP.predicate.selection.type === "NP"
                ? renderNPSelection(EP.predicate.selection, false, false, "subject", "king")
                : renderEqCompSelection(EP.predicate.selection, commandingPerson),
        },
        ...EP.equative.negative ? [{ type: "nu" } as T.Block] : [],
        EP.equative.negative ? removeAccontsFromEq(equative) : equative,
    ];
    const miniPronouns = findPossesivesToShrink([...EP.blocks, EP.predicate], EP.omitSubject);
    const kids: T.Kid[] = orderKids([
        ...equative.equative.hasBa ? [{ type: "ba" } as T.Kid] : [], 
        ...miniPronouns,
    ]);
    return {
        blocks,
        kids,
        englishEquativePerson: commandingNP.selection.type === "participle" ? T.Person.ThirdSingMale : commandingPerson,
    };
}

function orderKids(kids: T.Kid[]): T.Kid[] {
    const sorted = [...kids].sort((a, b) => {
        // ba first
        if (a.type === "ba") return -1;
        // kinds lined up 1st 2nd 3rd person
        if (a.type === "mini-pronoun" && b.type === "mini-pronoun") {
            const aPers = getFirstSecThird(a.person);
            const bPers = getFirstSecThird(b.person);
            if (aPers < bPers) {
                return -1;
            }
            if (aPers > bPers) {
                return 1;
            }
            // TODO: is this enough?
            return 0;
        }
        return 0;
    });
    return sorted;
}

function findPossesivesToShrink(blocks: (T.EPSBlockComplete | T.SubjectSelectionComplete | T.PredicateSelectionComplete | T.APSelection)[], omitSubject: boolean): T.MiniPronoun[] {
    return blocks.reduce((kids, item) => {
        const block = "block" in item ? item.block : item;
        if (block.type === "subjectSelection") {
            if (omitSubject) return kids;
            return [
                ...kids,
                ...findShrunkenPossInNP(block.selection),
            ];
        }
        if (block.type === "AP") {
            if (block.selection.type === "adverb") return kids;
            return [
                ...kids,
                ...findShrunkenPossInNP(block.selection.inside),
            ];
        }
        if (block.type === "predicateSelection") {
            if (block.selection.type === "EQComp") {
                if (block.selection.selection.type === "sandwich") {
                    return [
                        ...kids,
                        ...findShrunkenPossInNP(block.selection.selection.inside),
                    ];
                }
                return kids;
            }
            return [
                ...kids,
                ...findShrunkenPossInNP(block.selection),
            ];
        }
        return kids;
    }, [] as T.MiniPronoun[]);
}

function findShrunkenPossInNP(NP: T.NPSelection): T.MiniPronoun[] {
    if (NP.selection.type === "pronoun") return [];
    if (!NP.selection.possesor) return [];
    if (NP.selection.type === "noun") {
        if (NP.selection.adjectives) {
            const { adjectives, ...rest } = NP.selection;
            return [
                // TODO: ability to find possesives shrinkage in sandwiches in adjectives
                // ...findShrunkenPossInAdjectives(adjectives),
                ...findShrunkenPossInNP({ type: "NP", selection: {
                    ...rest,
                    adjectives: [],
                }}),
            ];
        }
    }
    if (NP.selection.possesor.shrunken) {
        const person = getPersonFromNP(NP.selection.possesor.np);
        const miniP: T.MiniPronoun = {
            type: "mini-pronoun",
            person,
            ps: getMiniPronounPs(person),
            source: "possesive",
            np: NP.selection.possesor.np,
        };
        return [miniP];
    }
    return findShrunkenPossInNP(NP.selection.possesor.np);
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

function renderEPSBlocks(blocks: T.EPSBlockComplete[]): T.Block[] {
    return blocks.map(({ block }): (T.Rendered<T.SubjectSelectionComplete> | T.Rendered<T.APSelection>) => {
        if (block.type === "AP") {
            if (block.selection.type === "adverb") {
                return {
                    type: "AP",
                    selection: renderAdverbSelection(block.selection),
                };
            }
            // if (block.selection.type === "sandwich") {
                return {
                    type: "AP",
                    selection: renderSandwich(block.selection),
                };
            // }
        }
        return {
            type: "subjectSelection",
            selection: renderNPSelection(block.selection, false, false, "subject", "none")
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

export function renderAdverbSelection(a: T.AdverbSelection): T.Rendered<T.AdverbSelection> {
    const e = getEnglishWord(a.entry);
    if (!e || typeof e !== "string") {
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
    if (s.selection.type === "sandwich") {
        return {
            type: "EQComp",
            selection: renderSandwich(s.selection),
        };
    }
    const e = getEnglishWord(s.selection.entry);
    if (!e || typeof e !== "string") {
        throw new Error("error getting english for compliment");
    }
    if (isLocativeAdverbEntry(s.selection.entry)) {
        return {
            type: "EQComp",
            selection: {
                type: "loc. adv.",
                entry: s.selection.entry,
                ps: [psStringFromEntry(s.selection.entry)],
                e,
                inflected: false,
                person,
                role: "none",
            },
        };
    }
    if (s.selection.type === "adjective") {
        return {
            type: "EQComp",
            selection: renderAdjectiveSelection(s.selection, person, false, "none"),
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
                type: "predicateSelection",
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
            type: "predicateSelection",
            selection,
        },
    };
}

export function getMiniPronounPs(person: T.Person): T.PsString {
    const [row, col] = getVerbBlockPosFromPerson(person);
    return pronouns.mini[row][col][0];
}

function removeAccontsFromEq(equ: T.EquativeBlock): T.EquativeBlock {
    return {
        ...equ,
        equative: {
            ...equ.equative,
            ps: removeAccentsWLength(equ.equative.ps),
        },
    };
}