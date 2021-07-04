/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    ensureBaAt,
    isAllOne,
    isVerbBlock,
    removeHead,
    uniquePsStringArray,
    splitOffLeapfrogWord,
    removeObjComp,
    psRemove,
    psStringContains,
} from "../lib/p-text-helpers";
import {
    getPersonFromVerbForm,
    pickPersInf,
} from "../lib/misc-helpers";
import {
    baParticle,
    pronouns,
} from "../lib/grammar-units";
import {
    removeAccents,
} from "../lib/accent-helpers";
import { concatPsString } from "../lib/p-text-helpers";
import * as T from "../types";
const pashtoCharacterRange = "\u0621-\u065f\u0670-\u06d3\u06d5"

function getSplitHead(split: T.SplitInfo | undefined, matrixKey: T.PersonInflectionsField) {
    if (!split) {
        return undefined;
    }
    const fromMatrix = pickPersInf(split, matrixKey)
    // doesn't matter what length it is, the head will always be the same
    const pair = "long" in fromMatrix ? fromMatrix.long : fromMatrix;
    return pair[0];
}

function formHasVariations(form: T.VerbForm | T.ImperativeForm | T.ParticipleForm | T.SentenceForm): boolean {
    if ("mascSing" in form) {
        return formHasVariations(form.mascSing);
    }
    if ("long" in form) {
        return formHasVariations(form.long);
    }
    if (!isVerbBlock(form)) {
        return false;
    }
    return !isAllOne(form as T.VerbBlock);
}

type Pronouns = undefined | {
    subject: T.PsString | [T.PsString, T.PsString],
    object?: T.PsString | [T.PsString, T.PsString],
    mini: T.PsString,
}

const nuParticle = { p: "نه", f: "nú" };

export default function addPronouns({ s, subject, object, info, displayForm, intransitive, ergative, matrixKey, englishConjugation, negative }: {
    s: T.SentenceForm,
    subject: T.Person,
    object: T.Person,
    info: T.NonComboVerbInfo,
    displayForm: T.DisplayFormForSentence,
    intransitive: boolean,
    ergative: boolean,
    matrixKey: T.PersonInflectionsField,
    negative: boolean,
    englishConjugation?: T.EnglishVerbConjugation,
}): T.SentenceForm {
    if ("long" in s) {
        return {
            long: addPronouns({ s: s.long, subject, object, info, displayForm, intransitive, ergative, matrixKey, englishConjugation, negative }) as T.ArrayOneOrMore<T.PsString>,
            short: addPronouns({ s: s.short, subject, object, info, displayForm, intransitive, ergative, matrixKey, englishConjugation, negative }) as T.ArrayOneOrMore<T.PsString>,
            ...s.mini ? {
                mini: addPronouns({ s: s.mini, subject, object, info, displayForm, intransitive, ergative, matrixKey, englishConjugation, negative }) as T.ArrayOneOrMore<T.PsString>,
            } : {},
        }
    }
    const firstOrSecondObjectPresent = [0,1,2,3,6,7,8,9].includes(object) && !displayForm.past;
    const nearPronounPossible = (p: T.Person) => [4, 5, 10, 11].includes(p);
    const noPronouns =
        info.transitivity === "grammatically transitive" && displayForm.passive;
    const noObjectPronoun =
        intransitive || info.transitivity === "grammatically transitive" ||
        info.type === "dynamic compound" || info.type === "generative stative compound";
    const transDynCompPast =
        info.transitivity === "transitive" && info.type === "dynamic compound" && displayForm.past;
    const subjectPronoun = (getPersonFromVerbForm(
        pronouns.far[ergative ? "inflected" : "plain"],
        subject,
    ) as T.ArrayOneOrMore<T.PsString>)[0];
    const nearSubjectPronoun = (getPersonFromVerbForm(
        pronouns.near[ergative ? "inflected" : "plain"],
        subject,
    ) as T.ArrayOneOrMore<T.PsString>)[0];
    const objectPronoun = (getPersonFromVerbForm(
        pronouns.far[firstOrSecondObjectPresent ? "inflected" : "plain"],
        object,
    ) as T.ArrayOneOrMore<T.PsString>)[0];
    const nearObjectPronoun = (getPersonFromVerbForm(
        pronouns.near[firstOrSecondObjectPresent ? "inflected" : "plain"],
        object,
    ) as T.ArrayOneOrMore<T.PsString>)[0];
    const miniPronoun = (getPersonFromVerbForm(
        pronouns.mini,
        ergative ? subject : object,
    ) as T.ArrayOneOrMore<T.PsString>)[0];

    const prns: Pronouns = noPronouns
        ? undefined
        : noObjectPronoun
        ? {
            subject: nearPronounPossible(subject) ? [subjectPronoun, nearSubjectPronoun] : subjectPronoun,
            mini: miniPronoun,
        } : {
            subject: nearPronounPossible(subject) ? [subjectPronoun, nearSubjectPronoun] : subjectPronoun,
            object: nearPronounPossible(object) ? [objectPronoun, nearObjectPronoun] : objectPronoun,
            mini: miniPronoun,
        };
    const english = (displayForm.englishBuilder && englishConjugation)
        ? displayForm.englishBuilder(subject, englishConjugation, negative).map(sen => (
            intransitive ? sen : `${sen} ${engObj(object)}`
        )).join(" / ")
        : undefined;

    function attachPronounsToVariation(ps: T.PsString, prns: Pronouns): T.ArrayOneOrMore<T.PsString> {
        if (!prns) {
            return [ps];
        }
        if (Array.isArray(prns.subject)) {
            return [
                ...attachPronounsToVariation(ps, { ...prns, subject: prns.subject[0] }),
                ...attachPronounsToVariation(ps, { ...prns, subject: prns.subject[1] }),
            ] as T.ArrayOneOrMore<T.PsString>;
        }
        if (Array.isArray(prns.object)) {
            return [
                ...attachPronounsToVariation(ps, { ...prns, object: prns.object[0] }),
                ...attachPronounsToVariation(ps, { ...prns, object: prns.object[1] }),
            ] as T.ArrayOneOrMore<T.PsString>;
        }
        const splitHead = (displayForm.aspect && displayForm.aspect === "perfective")
            ? getSplitHead(info[displayForm.past ? "root" : "stem"].perfectiveSplit, matrixKey)
            : undefined;
        const basicForms = (!prns.object)
            // basic form with only one pronoun
            ? makeBasicPronounForm(ps, splitHead, displayForm, info, negative, prns.subject)
            : [
                // basic form two full pronouns
                ...makeBasicPronounForm(ps, splitHead, displayForm, info, negative, prns.subject, prns.object),
                // basic form one full, one mini pronoun
                ...makeBasicPronounForm(
                    ps,
                    splitHead,
                    displayForm,
                    info,
                    negative,
                    ergative ? prns.object : prns.subject,
                    prns.mini,
                ),
            ] as T.ArrayOneOrMore<T.PsString>;
        
        const ergativeGrammTrans = (info.transitivity === "grammatically transitive" && ergative);
        const canWorkWithOnlyMini = (prns.object && !displayForm.secondPronounNeeded && formHasVariations(displayForm.form))
            || transDynCompPast || ergativeGrammTrans;
        return [
            ...basicForms,
            ...canWorkWithOnlyMini
                ? makeOnlyMiniForm(ps, splitHead, displayForm, info, negative, prns.mini)
                : [],
        ].map((ps) => english ? { ...ps, e: english } : ps) as T.ArrayOneOrMore<T.PsString>;
    }

    // @ts-ignore
    return s.reduce((variations, current) => (
        [...variations, ...uniquePsStringArray(
            attachPronounsToVariation(current, prns)
        )]
    ), []) as T.ArrayOneOrMore<T.PsString>;
}

function nuMustGoAfterSplitHead(head: T.PsString) {
    return (
        ["و", "وا"].includes(head.p)
        ||
        head.p.slice(-1) === " " // compound splits
        ||  
        head.p.match(`[${pashtoCharacterRange}]* و`)
    );
}

function spaceAfterSplitHead(head: T.PsString) {
    if (nuMustGoAfterSplitHead(head) && head.p.slice(-1) !== " ") {
        return { p: "", f: "-" }
    }
    return { p: " ", f: " " };
}

function makeBasicPronounForm(
    ps: T.PsString,
    splitHead: T.PsString | undefined,
    displayForm: T.DisplayFormForSentence,
    info: T.NonComboVerbInfo,
    negative: boolean,
    firstPronoun: T.PsString,
    secondPronoun?: T.PsString,
): T.PsString[] {
    if (!negative) {
        return [
            ensureBaAt(
                concatPsString(
                    firstPronoun,
                    " ",
                    secondPronoun ? concatPsString(secondPronoun, " ") : "",
                    ps,
                ),
            1)
        ];
    }
    const objComplement = getObjComplement(info);
    function negativeWOutSplit() {    
        if (!displayForm.reorderWithNegative) {
            return [
                ensureBaAt(
                    concatPsString(
                        firstPronoun,
                        " ",
                        secondPronoun
                            ? concatPsString(secondPronoun, " ")
                            : objComplement
                            ? concatPsString(objComplement, " ")
                            : "",
                        nuParticle,
                        " ",
                        removeAccents(objComplement ? removeObjComp(objComplement, ps) : ps)
                    ),
                1),
            ];
        }       
        const [beginning, end] = splitOffLeapfrogWord(ps);
        return [
            ensureBaAt(
                objComplement ?
                    concatPsString(
                        firstPronoun,
                        " ",
                        objComplement,
                        " ",
                        nuParticle,
                        " ",
                        end,
                        " ",
                        removeAccents(removeObjComp(objComplement, beginning)),
                    )
                : concatPsString(
                    firstPronoun,
                    " ",
                    secondPronoun ? concatPsString(secondPronoun, " ") : "",
                    nuParticle,
                    " ",
                    end,
                    " ",
                    removeAccents(beginning),
                ),  
            1),
            ensureBaAt(
                concatPsString(
                    firstPronoun,
                    " ",
                    secondPronoun ? concatPsString(secondPronoun, " ") : "",
                    removeAccents(beginning),
                    " ",
                    nuParticle,
                    " ",
                    end,
                ),
            1),
        ];
    }
    function insertNegInSplit(splitHead: T.PsString) {
        if (!displayForm.reorderWithNegative) {
            return [
                ensureBaAt(
                    concatPsString(
                        firstPronoun,
                        " ",
                        secondPronoun ? concatPsString(secondPronoun, " ") : "",
                        removeAccents(splitHead),
                        spaceAfterSplitHead(splitHead),
                        nuParticle,
                        " ",
                        removeHead(splitHead, ps),
                    ),
                1),
            ];
        }
        const [beginning, end] = splitOffLeapfrogWord(ps);
        return [
            ensureBaAt(
                concatPsString(
                    firstPronoun,
                    " ",
                    secondPronoun ? concatPsString(secondPronoun, " ") : "",
                    removeAccents(splitHead),
                    spaceAfterSplitHead(splitHead),
                    nuParticle,
                    " ",
                    end,
                    " ",
                    removeHead(splitHead, beginning),
                ),
            1),
            ensureBaAt(
                concatPsString(
                    firstPronoun,
                    " ",
                    secondPronoun ? concatPsString(secondPronoun, " ") : "",
                    removeAccents(splitHead),
                    spaceAfterSplitHead(splitHead),
                    nuParticle,
                    " ",
                    removeHead(splitHead, beginning),
                    " ",
                    end,
                ),
            1),
        ];
    }
    if (splitHead) {
        return nuMustGoAfterSplitHead(splitHead) ? insertNegInSplit(splitHead) : [
            ...insertNegInSplit(splitHead),
            ...negativeWOutSplit(),
        ] 
    }
    return negativeWOutSplit();
}

function makeOnlyMiniForm(
    ps: T.PsString,
    splitHead: T.PsString | undefined,
    displayForm: T.DisplayFormForSentence,
    info: T.NonComboVerbInfo,
    negative: boolean,
    mini: T.PsString,
): T.PsString[] {
    const objComplement = getObjComplement(info);
    function reorderedNegativeAfterSplitHead(splitHead: T.PsString) {
        const [beginning, end] = splitOffLeapfrogWord(ps);
        return ensureBaAt(
            objComplement ?
                concatPsString(
                    objComplement,
                    " ",
                    mini,
                    " ",
                    removeAccents(removeObjComp(objComplement, splitHead)),
                    spaceAfterSplitHead(splitHead),
                    nuParticle,
                    " ",
                    end,
                    " ",
                    removeHead(splitHead, beginning),
                )
                : concatPsString(
                    removeAccents(splitHead),
                    spaceAfterSplitHead(splitHead),
                    mini,
                    " ",
                    nuParticle,
                    " ",
                    end,
                    " ",
                    removeHead(splitHead, beginning),
                ),
        1)
    }
    if (splitHead) {
        // only mini pronoun with split
        if (!displayForm.reorderWithNegative || !negative) {
            const safeSplitHead = removeObjComp(objComplement, splitHead);
            return [ensureBaAt(
                concatPsString(
                    objComplement ? concatPsString(objComplement, " ", mini, " ") : "",
                    negative ? removeAccents(safeSplitHead) : safeSplitHead,
                    spaceAfterSplitHead(safeSplitHead),
                    !objComplement ? concatPsString(mini, " ") : "",
                    negative ? concatPsString(nuParticle, " ") : "",
                    removeHead(splitHead, ps)
                ), 
            1)];
        }
        // if (!nuMustGoAfterSplitHead(splitHead)) {
            // TODO: IS THIS A SEPERATELY NECESSARY THING FOR VERBS LIKE
            // PREXODUL -- LIKE COULD YOU ALSO DO A VERSION WHERE THE SPLIT ISN'T USED
            // return [reorderedNegativeAfterSplitHead(splitHead)];
        // }
        return [reorderedNegativeAfterSplitHead(splitHead)];
    }
    // only mini without split
    const [beginning, end] = splitOffLeapfrogWord(ps);
    if (!displayForm.reorderWithNegative || !negative) {
        if (objComplement) {
            return [
                concatPsString(
                    objComplement,
                    psStringContains(ps, concatPsString(baParticle, " ")) ? concatPsString(" ", baParticle, " ") : " ",
                    concatPsString(mini, " "),
                    negative ? concatPsString(" ", nuParticle, " ") : "",
                    removeObjComp(objComplement, psRemove(ps, concatPsString(baParticle, " "))),
                )
            ];
        }
        return [
            concatPsString(
                psRemove(beginning, concatPsString(baParticle, " ")),
                " ",
                psStringContains(beginning, concatPsString(baParticle, " ")) ? concatPsString(baParticle, " ") : "",
                negative ? concatPsString(" ", nuParticle, " ") : " ",
                (beginning.p || negative) ? concatPsString(mini, " ") : "",
                end,
                (beginning.p || negative) ? "" : concatPsString(" ", mini),
            ),
        ];
    }
    if (objComplement) {
        return [
            ensureBaAt(
                concatPsString(
                    objComplement,
                    " ",
                    mini,
                    " ",
                    nuParticle,
                    " ",
                    end,
                    " ",
                    removeObjComp(objComplement, beginning),
                ),
            1),
            ensureBaAt(
                concatPsString(
                    objComplement,
                    " ",
                    mini,
                    " ",
                    removeObjComp(objComplement, beginning),
                    " ",
                    nuParticle,
                    " ",
                    end,
                ),
            1),
        ]
    }
    return [
        ensureBaAt(
            concatPsString(
                beginning,
                " ",
                mini,
                " ",
                nuParticle,
                " ",
                end,
            ),
        1),
        ensureBaAt(
            concatPsString(
                nuParticle,
                " ",
                end,
                " ",
                mini,
                " ",
                beginning,
            ),
        1),
    ];
}

function getObjComplement(info: T.NonComboVerbInfo): T.PsString | undefined {
    return info.type === "dynamic compound" ? 
        (info.objComplement.plural ? info.objComplement.plural : info.objComplement.entry) :
        undefined;
}

function engObj(s: T.Person): string {
    return (s === T.Person.FirstSingMale || s === T.Person.FirstSingFemale)
        ? "me"
        : (s === T.Person.FirstPlurMale || s === T.Person.FirstPlurFemale)
        ? "us"
        : (s === T.Person.SecondSingMale || s === T.Person.SecondSingFemale)
        ? "you"
        : (s === T.Person.SecondPlurMale || s === T.Person.SecondPlurFemale)
        ? "you (pl.)"
        : (s === T.Person.ThirdSingMale)
        ? "him/it"
        : (s === T.Person.ThirdSingFemale)
        ? "her/it"
        : (s === T.Person.ThirdPlurMale)
        ? "them"
        : "them (f.)";
}
