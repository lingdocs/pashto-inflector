/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect, useReducer } from "react";
import VerbInfo from "./verb-info/VerbInfo";
import VerbFormDisplay from "./VerbFormDisplay";
import ButtonSelect from "./ButtonSelect";
import Hider from "./Hider";
import { getForms } from "../lib/conjugation-forms";
import { conjugateVerb } from "../lib/verb-conjugation";
import PersonSelection from "./PersonSelection";
import {
    personIsAllowed,
    randomPerson,
    incrementPerson,
    parseEc,
} from "../lib/misc-helpers";
import * as T from "../types";

const VerbChoiceWarning = () => (
    <>
        <div className="alert alert-warning d-block mx-auto mt-3" role="alert" style={{ maxWidth: "500px" }}>
            <i className="fas fa-exclamation-triangle" /> This verb can be used in different ways!
        </div>
        <p>Choose which way to use it:</p>
    </>
);

const stateLocalStorageName = "explorerState6";

type Difficulty = "beginner" | "advanced";
// remember to increment the stateLocalStorageName whenever changing
// the State type
type State = {
    mode: "chart" | "sentence";
    subject: T.Person,
    object: T.Person,
    negative: boolean,
    compoundTypeSelected: "stative" | "dynamic";
    transitivitySelected: "transitive" | "grammatically transitive";
    compoundComplementVersionSelected: "sing" | "plur";
    showingStemsAndRoots: boolean;
    difficulty: Difficulty;
    formsOpened: string[];
    showingFormInfo: boolean;
}

type Action = {
    type: "choose compound type",
    payload: "stative" | "dynamic",
} | {
    type: "set forms opened",
    payload: string,
} | {
    type: "set difficulty",
    payload: Difficulty,
} | {
    type: "set compound complement version",
    payload: "sing" | "plur",
} | {
    type: "toggle showingStemsAndRoots",
} | {
    type: "setState",
    payload: State,
} | {
    type: "setMode",
    payload: "chart" | "sentence",
} | {
    type: "setPerson",
    payload: { setting: "subject" | "object", person: T.Person },
} | {
    type: "randomPerson",
    payload: "subject" | "object",
} | {
    type: "setShowingFormInfo",
    payload: boolean,
} | {
    type: "setTransitivitySelected",
    payload: "transitive" | "grammatically transitive",
} | {
    type: "setNegative",
    payload: boolean,
}; 

function oppositeRole(x: "subject" | "object"): "subject" | "object" {
    return x === "subject" ? "object" : "subject";
}

function reducer(state: State, action: Action): State {
    function applyFormOpen(
        payload: string,
        formsOpened: string[],
    ): string[] {
        if (formsOpened.includes(payload)) {
            return formsOpened.filter((f) => f !== payload);
        }
        return [...formsOpened, payload];
    }
    function setPerson({ setting, person }: { setting: "subject" | "object", person: T.Person }): State {
        let newPerson = person;
        let otherPerson = state[oppositeRole(setting)];
        let otherSetting = oppositeRole(setting);
        while (!personIsAllowed(newPerson, otherPerson)) {
            otherPerson = incrementPerson(otherPerson);
        }
        return { ...state, [setting]: newPerson, [otherSetting]: otherPerson };
    }

    switch(action.type) {
        case "choose compound type":
            return { ...state, compoundTypeSelected: action.payload };
        case "set forms opened":
            return {
                ...state,
                formsOpened: applyFormOpen(action.payload, state.formsOpened),
            };
        case "set difficulty":
            return { ...state, difficulty: action.payload };
        case "set compound complement version":
            return { ...state, compoundComplementVersionSelected: action.payload };
        case "toggle showingStemsAndRoots":
            return { ...state, showingStemsAndRoots: !state.showingStemsAndRoots };
        case "setState":
            return action.payload;
        case "setMode":
            return { ...state, mode: action.payload };
        case "setPerson":
            return setPerson(action.payload);
        case "randomPerson":
            return {
                ...state,
                [action.payload]: randomPerson(
                    state[action.payload === "subject" ? "object" : "subject"]
                ),
            };
        case "setShowingFormInfo":
            return {
                ...state,
                showingFormInfo: action.payload,
            };
        case "setTransitivitySelected":
            return {
                ...state,
                transitivitySelected: action.payload,
            };
        case "setNegative":
            return {
                ...state,
                negative: action.payload,
            };
        default:
            throw new Error();
    }
}

const initialState: State = {
    subject: 0,
    object: 2,
    negative: false,
    compoundTypeSelected: "stative",
    transitivitySelected: "transitive",
    mode: "chart",
    compoundComplementVersionSelected: "plur",
    difficulty: "beginner",
    showingStemsAndRoots: false,
    showingFormInfo: false,
    formsOpened: [],
};

function ConjugationViewer({ entry, complement, textOptions, aayTailType }: {
    entry: T.DictionaryEntry,
    complement?: T.DictionaryEntry,
    textOptions: T.TextOptions,
    aayTailType?: T.AayTail,
}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    useEffect(() => {
        const stateRaw = localStorage.getItem(stateLocalStorageName);
        if (stateRaw) {
            try {
                const payload = JSON.parse(stateRaw) as State;
                dispatch({ type: "setState", payload });
            } catch (e) {
                console.error("error parsing saved state JSON", e);
            }
        }
    }, []);
    useEffect(() => {
        localStorage.setItem(stateLocalStorageName, JSON.stringify(state));
    });

    const conjugation = (() => {
        try {
            return conjugateVerb(entry, aayTailType ? aayTailType : "aay", complement);
        } catch(e) {
            return undefined;
        }
    })();
    if (conjugation === undefined) {
        // don't show the conjugation viewer if the verb can't be conjugated
        return null;
    }

    const verbConj1 = ("dynamic" in conjugation)
        ? conjugation[state.compoundTypeSelected]
        : ("transitive" in conjugation)
        ? conjugation[state.transitivitySelected === "transitive" ? "transitive" : "grammaticallyTransitive"]
        : conjugation;
    const verbConj = (verbConj1.singularForm && state.compoundComplementVersionSelected === "sing")
        ? verbConj1.singularForm
        : verbConj1;
    const englishConjugation: T.EnglishVerbConjugation | undefined = entry.ec ? {
        ec: parseEc(entry.ec),
        ep: entry.ep,
    } : undefined;

    const filterDifficulty = (f: T.DisplayForm): boolean => (
        state.difficulty === "advanced" || !f.advanced
    );
    const forms = getForms({
        conj: verbConj,
        filterFunc: filterDifficulty,
        mode: state.mode,
        subject: state.subject,
        object: state.object,
        negative: state.negative,
        englishConjugation,
    });
    return <div className="mb-4">
        {"transitive" in conjugation && <div className="text-center my-2">
            <VerbChoiceWarning />
            <div>
                <ButtonSelect
                    options={[
                        { 
                            label: "Transitive", value: "transitive" },
                        { 
                            label: "Grammatically Transitive",
                            value: "grammatically transitive",
                        },
                    ]}
                    value={state.transitivitySelected}
                    handleChange={(p) => dispatch({ type: "setTransitivitySelected", payload: p as "transitive" | "grammatically transitive" })}
                />
            </div>
        </div>}
        {"dynamic" in conjugation && <div className="text-center my-2">
            <VerbChoiceWarning />
            <div>
                <ButtonSelect
                    options={[
                        { label: "Dynamic", value: "dynamic" },
                        { 
                            label: `${conjugation.info.type === "dynamic or generative stative compound" ? "Generative " : ""}Stative`,
                            value: "stative",
                        },
                    ]}
                    value={state.compoundTypeSelected}
                    handleChange={(p) => dispatch({ type: "choose compound type", payload: p as "dynamic" | "stative" })}
                />
            </div>
        </div>}
        {verbConj1.singularForm && <div className="text-center my-2">
            <VerbChoiceWarning />
            <div>
                <ButtonSelect
                    small
                    options={[
                        // @ts-ignore - TODO - make this a bit safer
                        { label: `Sing. ${verbConj1.info.objComplement.entry.p}`, value: "sing" },
                        // @ts-ignore - TODO - make this a bit safer
                        { label: `Plur. ${verbConj1.info.objComplement.plural.p}`, value: "plur" },
                    ]}
                    value={state.compoundComplementVersionSelected}
                    handleChange={(p) => dispatch({ type: "set compound complement version", payload: p as "sing" | "plur" })}
                />
            </div>
        </div>}
        <VerbInfo
            info={verbConj.info}
            textOptions={textOptions}
            showingStemsAndRoots={state.showingStemsAndRoots}
            toggleShowingSar={() => dispatch({ type: "toggle showingStemsAndRoots" })}
        />
        <div className="d-flex flex-row align-items-center justify-content-around flex-wrap mt-4 mb-2">
            <div className="mb-3">
                <ButtonSelect
                    options={[
                        { label: `Charts`, value: "chart" },
                        { label: `Sentences`, value: "sentence" },
                    ]}
                    value={state.mode}
                    handleChange={(p) => dispatch({ type: "setMode", payload: p as "chart" | "sentence" })}
                />
            </div>
            <div className="mb-3">
                <ButtonSelect
                    options={[
                        { label: "👶 Beginner", value: "beginner" },
                        { label: "🤓 Advanced", value: "advanced" },
                    ]}
                    value={state.difficulty}
                    handleChange={(p) => dispatch({ type: "set difficulty", payload: p as Difficulty })}
                />
            </div>
            <div className="form-group form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    checked={state.showingFormInfo}
                    onChange={(e) => {
                        dispatch({ type: "setShowingFormInfo", payload: e.target.checked })
                    }}
                />
                <label className="form-check-label">Show Form Info</label>
            </div>
        </div>
        {state.mode === "sentence" &&
            <div className="position-sticky pb-1" style={{ top: 0, background: "var(--theme-shade)", zIndex: 1000 }}>
                <PersonSelection
                    subject={state.subject}
                    object={state.object}
                    info={verbConj.info}
                    handleChange={(payload: { setting: "subject" | "object", person: T.Person }) => dispatch({
                        type: "setPerson", payload,
                    })}
                    handleRandom={(payload: "subject" | "object") => dispatch({
                        type: "randomPerson", payload,
                    })}
                    textOptions={textOptions}
                />
                <div className="mt-2 text-center">
                    <ButtonSelect
                        options={[
                            { label: "Pos.", value: "false" },
                            { label: "Neg.", value: "true" },
                        ]}
                        value={state.negative.toString()}
                        handleChange={(p) => dispatch({ type: "setNegative", payload: p === "true" })}
                    />
                </div>
            </div>
        }
        <FormsDisplay
            forms={forms}
            state={state}
            handleChange={(payload: string) => dispatch({ type: "set forms opened", payload })}
            verbConj={verbConj}
            textOptions={textOptions}    
        />
    </div>;
}

function FormsDisplay({ forms, state, handleChange, textOptions, verbConj }: {
    verbConj: T.VerbConjugation,
    forms: T.DisplayFormItem[],
    state: State,
    handleChange: (p: string) => void,
    textOptions: T.TextOptions,
}) {
    function drawLevel(forms: T.DisplayFormItem[], level: number) {
        return <div className="mt-3">
            {forms.map((f, i) => {
                if ("content" in f && f.content.length === 0) {
                    return null;
                }
                const showDividerLine = (item: T.DisplayFormItem, index: number): boolean => {
                    return (index !== 0) && ("content" in item || !item.aspect || (item.aspect === "imperfective"));
                };
                return <div key={`level1-${i}`}>
                    {showDividerLine(f, i) && <hr />}
                    <Hider
                        label={f.label}
                        hLevel={5+level}
                        aspect={"aspect" in f ? f.aspect : undefined}
                        showing={state.formsOpened.includes(f.label)}
                        handleChange={() => handleChange(f.label)}
                    >
                        {"content" in f ?
                                drawLevel(f.content, level + 1)
                            :
                                <VerbFormDisplay
                                    displayForm={f}
                                    textOptions={textOptions}
                                    showingFormInfo={state.showingFormInfo}
                                    info={verbConj.info}
                                />
                        }
                    </Hider>
                </div>;
            })}
        </div>
    }
    return <div style={{ marginBottom: "5rem" }}>
        {drawLevel(forms, 0)}
    </div>;
}

export default ConjugationViewer;
