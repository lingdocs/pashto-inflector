/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    getPersonInflectionsKey,
    pickPersInf,
    getPersonFromVerbForm,
} from "./misc-helpers";
import addPronouns from "./add-pronouns";
import * as T from "../types";

type FilterFunc = (form: any) => boolean;
type MapFunc = (opts: { 
    subject: T.Person,
    object: T.Person,
    displayForm: T.DisplayFormForSentence,
    info: T.NonComboVerbInfo,
    negative: boolean,
}) => T.DisplayFormItem;

/**
 * Used to apply a filter function on both the levels of forms and subgroups
 * 
 * @param input 
 * @param func 
 */
const formFilter = (
    input: T.DisplayFormItem[],
    func: FilterFunc | FilterFunc[]
): T.DisplayFormItem[] => {
    // TODO: Better filtering that lets us filter things only in sub categories

    // recursive madness to apply an array of filters 🤪
    // i'm doing this because I couldn't get a compose function to work 🤷‍♂️
    if (Array.isArray(func)) {
        if (func.length === 0) return input;
        return formFilter(
            formFilter(input, func[0]),
            func.slice(1),
        );
    }
    return (
        input.filter(func)
            .map((f) => (
                "content" in f
                    ? { ...f, content: f.content.filter(func) }
                    : f
            ))
    );
};

/**
 * Used to apply a filter function on both the levels of forms and subgroups
 * 
 * @param input 
 * @param func 
 */
const formMap = (
    input: T.DisplayFormItem[],
    func: MapFunc,
    info: T.NonComboVerbInfo,
    subject: T.Person,
    object: T.Person,
    negative: boolean,
): T.DisplayFormItem[] => {
    return (
        input.map((f) => (
            "content" in f
                ? { ...f, content: formMap(f.content, func, info, subject, object, negative) }
                : func({ displayForm: f as T.DisplayFormForSentence, info, subject, object, negative })
        ))
    );
};

const makeSentence = ({ subject, object, info, displayForm, negative }: {
    subject: T.Person,
    object: T.Person,
    info: T.NonComboVerbInfo,
    displayForm: T.DisplayFormForSentence,
    negative: boolean,
}): T.DisplayForm => {
    const intransitive = info.transitivity === "intransitive" || !!displayForm.passive;
    const ergative = !intransitive && !!displayForm.past;
    function chooseConjugation(g: T.SingleOrLengthOpts<T.VerbBlock>): T.SentenceForm {
        const person = ergative
            ? object
            : subject;
        return getPersonFromVerbForm(g, person);
    }
    const f = displayForm.form;
    // IMPORTANT TODO!!! -- IS THIS ALWAYS THE OBJECT HERE?
    const matrixKey = getPersonInflectionsKey(object);
    const matrixChosen = pickPersInf(f, matrixKey);
    const conjugationChosen = chooseConjugation(matrixChosen);
    const form = addPronouns({
        s: conjugationChosen,
        subject,
        object,
        info,
        displayForm,
        intransitive,
        ergative,
        matrixKey,
        negative,
    });
    return {
        ...displayForm,
        form,
    };
}

export const getForms = ({ conj, filterFunc, mode, subject, object, negative } : {
    conj: T.VerbConjugation,
    filterFunc?: FilterFunc | FilterFunc[],
    mode: "chart" | "sentence",
    subject: T.Person,
    object: T.Person,
    negative: boolean,
}): T.DisplayFormItem[] => {
    const forms: T.DisplayFormItem[] = [
        {
            label: "Present",
            aspect: "imperfective",
            form: conj.imperfective.nonImperative,
            formula: "Imperfective Stem + Present Ending",
            sentence: true,
            explanation: "Something that is happening, happens generally, or is definitely about to happen. ('I am ____ing', 'I _____')",
        },
        {
            label: "Subjunctive",
            aspect: "perfective",
            form: conj.perfective.nonImperative,
            formula: "Perfective Stem + Present Ending",
            sentence: true,
            explanation: "Used for hypothetical statements about the desire, necessity, purpose, or possibility of something happening. Or for saying something should or shouldn't happen. ('Should I ____?', 'so that'll I'll _____')"
        },
        {
            label: "Imperfective Future",
            aspect: "imperfective",
            form: conj.imperfective.future,
            advanced: true,
            formula: "به - ba + Present",
            sentence: true,
            explanation: "Saying something will happen, repeatedly or as an ongoing action",
        },
        {
            label: "Perfective Future",
            aspect: "perfective",
            form: conj.perfective.future,
            advanced: true,
            formula: "به - ba + Subjunctive",
            sentence: true,
            explanation: "Saying something will happen as a one-time event - May also used when there is some doubt",
        },
        {
            label: "Continuous Past",
            aspect: "imperfective",
            form: conj.imperfective.past,
            formula: "Imperfective Root + Past Ending",
            sentence: true,
            explanation: "Saying something was happening, or would happen ('I was ____ing', 'I would ____')",
            past: true,
        },
        {
            label: "Simple Past",
            aspect: "perfective",
            form: conj.perfective.past,
            formula: "Perfective Root + Past Ending",
            sentence: true,
            explanation: "Saying something happened ('I ____ed')",
            past: true,
        },
        {
            label: "Modal (ability/possibility)",
            subgroup: "modal",
            sentence: true,
            content: [
                {
                    label: "Present Modal",
                    aspect: "imperfective",
                    form: conj.imperfective.modal.nonImperative,
                    sentence: true,
                    formula: "Imperfective Root + Non-Inflectinig Ey-Tail + Subjunctive کېدل - to become",
                    explanation: "saying that something is possible currently or in general ('I can ____')",
                    reorderWithNegative: true,
                },
                {
                    label: "Subjunctive Modal",
                    aspect: "perfective",
                    form: conj.perfective.modal.nonImperative,
                    advanced: true,
                    sentence: true,
                    formula: "Perfective Root + Non-Inflectinig Ey-Tail + Subjunctive کېدل - to become",
                    explanation: "talking about the possibility of something in a subjunctive way ('so that I can ____')",
                    reorderWithNegative: true,
                },
                {
                    label: "Imperfective Future Modal",
                    aspect: "imperfective",
                    form: conj.imperfective.modal.future,
                    advanced: true,
                    sentence: true,
                    formula: "به - ba + Present Modal",
                    explanation: "saying that something will be possible in general or in an ongoing sense in the future ('I'll be able to ____')",
                    reorderWithNegative: true,
                },
                {
                    label: "Perfective Future Modal",
                    aspect: "perfective",
                    form: conj.perfective.modal.future,
                    advanced: true,
                    sentence: true,
                    formula: "به - ba + Subjunctive Modal",
                    explanation: "saying that something will be possible at a certain point in the future ('I'll be able to ____')",
                    reorderWithNegative: true,
                },
                {
                    label: "Continous Past Modal",
                    aspect: "imperfective",
                    form: conj.imperfective.modal.past,
                    advanced: true,
                    past: true,
                    sentence: true,
                    formula: "Imperfective Root + Non-Inflectinig Ey-Tail + Simple Past کېدل - to become",
                    explanation: "saying that something was possible in general, in an ongoing sense ('I was able to ____', ie. 'I could do ____ any time')",
                    reorderWithNegative: true,
                },
                {
                    label: "Simple Past Modal",
                    aspect: "perfective",
                    form: conj.perfective.modal.past,
                    formula: "Perfective Root + Non-Inflectinig Ey-Tail + Simple Past کېدل - to become",
                    explanation: "saying that something was possible at a certain point in time ('I was able to ____, at one particular point in time')",
                    past: true,
                    sentence: true,
                    advanced: true,
                    reorderWithNegative: true,
                },
                {
                    label: "Imperfective hypothetical/wildcard Past Modal",
                    aspect: "imperfective",
                    form: conj.imperfective.modal.hypotheticalPast,
                    formula: "Imperfective Root + Non-Inflectinig Ey-Tail + ش - sh + Non-Inflectinig Ey-Tail",
                    explanation: "saying that something was possible in general, in an ongoing sense ('I was able to ____', ie. 'I could do ____ any time'). This 'wildcard' form can be used either to talk about hypothetical things, or to avoid worrying about verb agreement",
                    past: true,
                    sentence: true,
                    advanced: true,
                    reorderWithNegative: true,
                },
                {
                    label: "Perfective hypothetical/wildcard Past Modal",
                    aspect: "perfective",
                    form: conj.perfective.modal.hypotheticalPast,
                    formula: "Perfective Root + Non-Inflectinig Ey-Tail + ش - sh + Non-Inflectinig Ey-Tail",
                    explanation: "saying that something was possible at a certain point in time ('I was able to ____, at one particular point in time'). This 'wildcard' form can be used either to talk about hypothetical things, or to avoid worrying about verb agreement",
                    past: true,
                    sentence: true,
                    advanced: true,
                    reorderWithNegative: true,
                },
            ],
        },
        ...conj.imperfective.imperative ?
            [{
                label: "Imperfective Imperative",
                aspect: "imperfective",
                form: conj.imperfective.imperative,
                formula: "Imperfective Stem + Imperative Ending",
                explanation: "Commanding someone/people to do something repeatedly, or in general",
            } as T.DisplayForm] : [],
        ...conj.perfective.imperative ?
            [{
                label: "Perfective Imperative",
                aspect: "perfective",
                form: conj.perfective.imperative,
                formula: "Perfective Stem + Imperative Ending",
                explanation: "Commanding someone/people to do something one time",
            } as T.DisplayForm] : [],
        {
            label: "Perfect",
            subgroup: "perfect",
            sentence: true,
            content: [
                {
                    label: "Half Perfect",
                    form: conj.perfect.halfPerfect,
                    past: true,
                    sentence: true,
                    formula: "Past participle inflected",
                    secondPronounNeeded: true,
                    explanation: "The base of all perfect forms. Used on it's own as a sort of weaker form of the present perfect.",
                },
                {
                    label: "Past Perfect",
                    form: conj.perfect.past,
                    past: true,
                    sentence: true,
                    formula: "Past participle inflected + Past Equative",
                    explanation: "Talking about events that had happened in the past, or had affected a past situation ('I had ____ed')",
                    reorderWithNegative: true,
                },
                {
                    label: "Present Perfect",
                    form: conj.perfect.present,
                    past: true,
                    sentence: true,
                    formula: "Past participle inflected + Present Equative",
                    explanation: "Talking about that something happened in the past and it affects the present ('I have _____ed')",
                    reorderWithNegative: true,
                },
                {
                    label: "Subjunctive/Habitual Perfect",
                    form: conj.perfect.subjunctive,
                    past: true,
                    sentence: true,
                    formula: "Past participle inflected + Subjunctive/Habitual Equative",
                    explanation: "Talking about something that will have happened habitually, or expressing hope, desire, or judgement about an action having happened",
                    reorderWithNegative: true,
                },
                {
                    label: "Future/Presumptive Perfect",
                    form: conj.perfect.future,
                    advanced: true,
                    past: true,
                    sentence: true,
                    formula: "به - ba + Past participle Inflected + Future Equative",
                    explanation: "Talking about something that will have happened in the future, or guessing that the event will have occured presently ('I will have ____ed')",
                    reorderWithNegative: true,
                },
                {
                    label: "Affirmational Perfect",
                    form: conj.perfect.affirmational,
                    advanced: true,
                    past: true,
                    sentence: true,
                    explanation: "Affirming that an event will have taken place ('I will have ____ed')",
                    formula: "به - ba + Past Participle Inflected + Past Equative",
                    reorderWithNegative: true,
                },
                {
                    label: "Conterfactual/Past Subjunctive Perfect",
                    form: conj.perfect.pastSubjunctiveHypothetical,
                    advanced: true,
                    past: true,
                    sentence: true,
                    secondPronounNeeded: true,
                    explanation: "Talking about an event that would have hypothetically taken place (but didn't), or that should have taken place but didn't",
                    formula: "به - ba + Past Participle Inflected + Past Subjunctive / Hypothetical Equative",
                    reorderWithNegative: true,
                },
            ],
        },
        {
            label: "Hypothetical/Wish",
            advanced: true,
            form: conj.hypothetical,
            formula: "Imperfective Root + Non-Inflecting Ey-Tail",
            explanation: "Talking about a hypothetical, unreal situation, or something that is wished for ('If I ____')",
            past: true,
        },
        {
            label: "Participle",
            subgroup: "participle",
            advanced: true,
            content: [
                {
                    label: "Present Participle",
                    form: conj.participle.present,
                    formula: "Short form of Ininitive Root + ونکی - oonkey",
                    explanation: "Making a verb into a noun or adjective, talking about a person or thing that does or experiences something. Also used to say something is about to happen. ('____ing', '____er')",
                },
                {
                    label: "Past Participle",
                    form: conj.participle.past,
                    past: true,
                    formula: "Infinitive Root or Special Form + Inflecting Ey-Tail",
                    explanation: "Making a verb into a noun or adjective, talking about how a person or thing did or experienced something. ('____ed')",
                },
            ],
        },
        ...conj.passive ? 
            [{
                label: "Passive",
                subgroup: "passive",
                advanced: true,
                sentence: true,
                content: [
                    {
                        label: "Passive Present",
                        aspect: "imperfective",
                        form: conj.passive.imperfective.nonImperative,
                        sentence: true,
                        passive: true,
                        formula: "Long Imperfective Root + Present کېدل - to become",
                        explanation: "Saying that something is being done or is done in general, without mentioning the subject/agent. ('I am being ____en')",
                    },
                    {
                        label: "Passive Subjunctive",
                        aspect: "perfective",
                        form: conj.passive.perfective.nonImperative,
                        sentence: true,
                        passive: true,
                        formula: "Long Perfective Root + Subjunctive کېدل - to become",
                        explanation: "Saying that something should be done, or giving a purpose for something being done etc., without mentioning the subject/agent. ('Should I be ____en?', 'So that I'll be ____en')"
                    },
                    {
                        label: "Passive Imperfective Future",
                        aspect: "imperfective",
                        form: conj.passive.imperfective.future,
                        sentence: true,
                        passive: true,
                        formula: "به - ba + Passive Present",
                        explanation: "Saying something will be done as a one-time event, without mentioning the subject/agent.",
                    },
                    {
                        label: "Passive Perfective Future",
                        aspect: "perfective",
                        form: conj.passive.perfective.future,
                        sentence: true,
                        passive: true,
                        formula: "به - ba + Passive Subjunctive",
                        explanation: "Saying something will be done in an ongoing or repeated sense, without mentioning the subject/agent."
                    },
                    {
                        label: "Passive Continuous Past",
                        aspect: "imperfective",
                        form: conj.passive.imperfective.past,
                        past: true,
                        sentence: true,
                        passive: true,
                        formula: "Long Imperfective Root + Continuous Past کېدل - to become",
                        explanation: "Saying that something was being done, or would be done, without mentioning the subject/agent. ('I was being ____en', 'I would be ____en')",    
                    },
                    {
                        label: "Passive Simple Past",
                        aspect: "perfective",
                        form: conj.passive.perfective.past,
                        past: true,
                        sentence: true,
                        passive: true,
                        formula: "Long Perfective Root + Simple Past کېدل - to become",
                        explanation: "Saying that was done as a one-time event, without mentioning the subject/agent. ('I was ____en')"
                    },
                    {
                        label: "Passive Perfect",
                        subgroup: "passive perfect",
                        passive: true,
                        sentence: true,
                        content: [
                            {
                                label: "Passive Half Perfect",
                                form: conj.passive.perfect.halfPerfect,
                                past: true,
                                sentence: true,
                                passive: true,
                                formula: "Infinitive + کېدل (to be) past participle inflected",
                                explanation: "The base of all perfect forms. Used on it's own as a sort of weaker form of the present perfect. (Passive voice)",
                            },
                            {
                                label: "Passive Past Perfect",
                                form: conj.passive.perfect.past,
                                past: true,
                                sentence: true,
                                passive: true,
                                formula: "Infinitive + کېدل (to be) past participle inflected + Past Equative",
                                explanation: "Talking about events that had happened in the past, or had affected a past situation (Passive voice) ('I had been ____ed')",
                            },
                            {
                                label: "Passive Present Perfect",
                                form: conj.passive.perfect.present,
                                past: true,
                                sentence: true,
                                passive: true,
                                formula: "Infinitive + کېدل (to be) past participle inflected + Present Equative",
                                explanation: "Talking about that something happened in the past and it affects the present (Passive voice) ('I have been _____ed')",
                            },
                            {
                                label: "Passive Subjunctive/Habitual Perfect",
                                form: conj.passive.perfect.subjunctive,
                                past: true,
                                sentence: true,
                                passive: true,
                                formula: "Infinitive + کېدل (to be) past participle inflected + Subjunctive/Habitual Equative",
                            },
                            {
                                label: "Passive Future/Presumptive Perfect",
                                form: conj.passive.perfect.future,
                                advanced: true,
                                past: true,
                                sentence: true,
                                passive: true,
                                formula: "به - ba + Infinitive + کېدل (to be) past participle inflected + Future Equative",
                                explanation: "Talking about something that will have happened in the future, or guessing that the event will have occured presently (Passive voice) ('I will have been ____ed')",
                            },
                            {
                                label: "Passive Affirmational Perfect",
                                form: conj.passive.perfect.affirmational,
                                advanced: true,
                                past: true,
                                sentence: true,
                                passive: true,
                                explanation: "Affirming that an event will have taken place (Passive voice) ('I will have been ____ed')",
                                formula: "به - ba + Infinitive + کېدل (to be) past participle inflected + Past Equative"
                            },
                            {
                                label: "Passive Past Subjunctive / Hypothetical Perfect",
                                form: conj.passive.perfect.pastSubjunctiveHypothetical,
                                advanced: true,
                                past: true,
                                sentence: true,
                                passive: true,
                                explanation: "Talking about an event that would have hypothetically taken place, or that should have taken place (Passive voice) ('I would have been ____ed')",
                                formula: "به - ba + Infinitive + کېدل (to be) past participle inflected + Past Subjunctive / Hypothetical Equative"
                            },
                        ],
                    },
                ]
            } as T.DisplayFormSubgroup]
            : [],
    ];
    const initialFilter = filterFunc
        ? formFilter(forms, filterFunc)
        : forms;
    return mode === "chart"
        ? initialFilter
        : formMap(
            formFilter(initialFilter, (f) => f.sentence),
            makeSentence,
            conj.info,
            subject,
            object,
            negative,
        );
}
