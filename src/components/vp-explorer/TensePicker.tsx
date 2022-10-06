import Select from "react-select";
import * as T from "../../types";
import ButtonSelect from "../ButtonSelect";
import { isImperativeTense, isModalTense, isPerfectTense, isVerbTense } from "../../lib/type-predicates";
import useStickyState from "../../lib/useStickyState";
import { customStyles } from "../EntrySelect";
import {
    VpsReducerAction
} from "./vps-reducer";

const verbTenseOptions: { label: string | JSX.Element, value: T.VerbTense, formula: string }[] = [{
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

function composeFormula(formula: string, prefix: "passive" | "ability"): string {
    return formula.replace(/^perfective/, `${prefix} perfective`)
        .replace(/^imperfective/, `${prefix} imperfective`)
        .replace("continuous", `${prefix} continuous`)
        .replace("simple", `${prefix} simple`)
        .replace(/present$/, `${prefix} present`)
        .replace(/subjunctive$/, `${prefix} subjunctive`)
        .replace("past participle", `${prefix} past participle`);
}

const perfectTenseOptions: { label: string | JSX.Element, value: T.PerfectTense, formula: string }[] = [{
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

const imperativeTenseOptions: { label: string | JSX.Element, value: T.ImperativeTense, formula: string }[] = [{
    label: <div><i className="fas fa-video mr-2" />imperfective imperative</div>,
    value: "imperfectiveImperative",
    formula: "imperfective stem + imperative ending",
}, {
    label: <div><i className="fas fa-camera mr-2" />perfective imperative</div>,
    value: "perfectiveImperative",
    formula: "perfective stem + imperative ending",
}];

export function getRandomTense(o?: T.PerfectTense | T.VerbTense | T.ModalTense | T.ImperativeTense): T.PerfectTense | T.VerbTense | T.ModalTense | T.ImperativeTense {
    let tns: T.PerfectTense | T.VerbTense | T.ModalTense | T.ImperativeTense;
    const oldTenseCategory = !o
        ? undefined
        : getTenseCategory(o);
    const tenseOptions = oldTenseCategory === "perfect"
        ? perfectTenseOptions
        : oldTenseCategory === "modal"
        ? verbTenseOptions.map(x => ({ ...x, value: `${x.value}Modal` as T.ModalTense }))
        : oldTenseCategory === "imperative"
        ? imperativeTenseOptions
        : verbTenseOptions;
    do {
        tns = tenseOptions[
            Math.floor(Math.random()*tenseOptions.length)
        ].value;
    } while (o === tns);
    return tns;
}

function TensePicker(props: ({
    vps: T.VPSelectionState,
} | {
    vpsComplete: T.VPSelectionComplete,
}) & {
    onChange: (p: VpsReducerAction) => void,
    mode: "charts" | "phrases" | "quiz",
}) {
    const [showFormula, setShowFormula] = useStickyState<boolean>(false, "showFormula");
    function onTenseSelect(o: { value: T.VerbTense | T.PerfectTense | T.ImperativeTense } | null) {
        if ("vpsComplete" in props) return;
        const tense = o?.value ? o.value : undefined;
        props.onChange({
            type: "set tense",
            payload: tense,
        });
    }
    function moveTense(dir: "forward" | "back") {
        if ("vpsComplete" in props) return;
        if (!props.vps.verb) return;
        return () => {
            // TODO: ABSTRACT THIS - SAFER
            const tenses = props.vps.verb.tenseCategory === "perfect"
                ? perfectTenseOptions
                : props.vps.verb.tenseCategory === "imperative"
                ? imperativeTenseOptions
                : verbTenseOptions;
            const currIndex = tenses.findIndex(tn => tn.value === props.vps.verb[
                // TODO: ABSTRACT THIS? - SAFER
                props.vps.verb.tenseCategory === "perfect"
                    ? "perfectTense"
                    : props.vps.verb.tenseCategory === "imperative"
                    ? "imperativeTense"
                    : "verbTense"
            ]);
            if (currIndex === -1) {
                console.error("error moving tense", dir);
                return;
            }
            const newIndex = dir === "forward"
                ? ((currIndex + 1) % tenses.length)
                : (currIndex === 0 ? (tenses.length - 1) : (currIndex - 1))
            const newTense = tenses[newIndex];
            onTenseSelect(newTense);
        };
    }
    function onPosNegSelect(payload: "true" | "false") {
        if ("vpsComplete" in props) return;
        props.onChange({
            type: "set negativity",
            payload,
        });
    }
    function onTenseCategorySelect(payload: "basic" | "modal" | "perfect" | "imperative") {
        if ("vpsComplete" in props) return;
        props.onChange({
            type: "set tense category",
            payload,
        });
    }
    const tOptions = ("vps" in props && (props.vps.verb?.tenseCategory === "perfect"))
        ? perfectTenseOptions
        : ("vps" in props && (props.vps.verb?.tenseCategory === "imperative"))
        ? imperativeTenseOptions
        : verbTenseOptions;
    const showImperativeOption = ("vps" in props && props.vps.verb.voice === "active")
        || ("vpsComplete" in props && props.vpsComplete.verb.voice !== "active");
    const inPassiveVoice = ("vps" in props && props.vps.verb.voice === "passive") || ("vpsComplete" in props && props.vpsComplete.verb.voice === "passive");;
    const canHaveFormula = "vps" in props && props.mode !== "quiz";
    return <div>
        <div style={{ maxWidth: "300px", minWidth: "250px", margin: "0 auto" }}>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="h5">Verb Tense:</div>
                {canHaveFormula && <div className="clickable mb-2 small" onClick={() => setShowFormula(x => !x)}>
                    🧪 {!showFormula ? "Show" : "Hide"} Formula
                </div>}
            </div>
            {("vpsComplete" in props || props.vps.verb) && <div className="mb-2">
                <ButtonSelect
                    small
                    value={"vpsComplete" in props 
                        ? getTenseCategory(props.vpsComplete.verb.tense)
                        : props.vps.verb.tenseCategory}
                    // @ts-ignore
                    options={showImperativeOption ? [{
                        label: "Basic",
                        value: "basic",
                    }, {
                        label: "Perfect",
                        value: "perfect",
                    }, {
                        label: "Ability",
                        value: "modal",
                    }, {
                        label: "Imperative",
                        value: "imperative",
                    }] : [{
                        label: "Basic",
                        value: "basic",
                    }, {
                        label: "Perfect",
                        value: "perfect",
                    }, {
                        label: "Ability",
                        value: "modal",
                    }].filter(x => !(inPassiveVoice && x.value === "modal"))}
                    handleChange={props.mode !== "quiz" ? onTenseCategorySelect : () => null}
                />
            </div>}
            {"vpsComplete" in props
                ? <div style={{ fontSize: "larger" }} className="mb-3">
                    {[...verbTenseOptions, ...perfectTenseOptions, ...imperativeTenseOptions].find(o => o.value === props.vpsComplete.verb.tense)?.label}
                </div>
            : <>
                <Select
                    isSearchable={false}
                    // for some reason can't use tOptions with find here;
                    value={props.vps.verb && ([...verbTenseOptions, ...perfectTenseOptions, ...imperativeTenseOptions].find(o => o.value === props.vps.verb[
                        props.vps.verb.tenseCategory === "perfect"
                            ? "perfectTense"
                            : props.vps.verb.tenseCategory === "imperative"
                            ? "imperativeTense"
                            : "verbTense"
                    ]))}
                    // @ts-ignore - gets messed up when using customStyles
                    onChange={onTenseSelect}
                    className="mb-2"
                    options={tOptions}
                    styles={customStyles}
                />
            </>}
            {"vps" in props && props.vps.verb && (props.mode !== "quiz") && <div className="d-flex flex-row justify-content-between align-items-center mt-2 mb-1" style={{ width: "100%" }}>
                <div className="btn btn-light clickable" onClick={moveTense("back")}>
                    <i className="fas fa-chevron-left" />
                </div>
                {props.mode === "phrases" && <ButtonSelect
                    small
                    value={props.vps.verb.negative.toString() as "true" | "false"}
                    options={[{
                        label: "Pos.",
                        value: "false",
                    }, {
                        label: "Neg.",
                        value: "true",
                    }]}
                    handleChange={onPosNegSelect}
                />}
                <div onClick={moveTense("forward")} className="btn btn-light clickable">
                    <i className="fas fa-chevron-right" />
                </div>
            </div>}
            {(canHaveFormula && showFormula) && (() => {
                // TODO: Be able to show modal formulas too
                const curr = (props.vps.verb.tenseCategory === "imperative" && props.vps.verb.negative)
                    ? imperativeTenseOptions.find(x => x.value === "imperfectiveImperative")
                    : [...verbTenseOptions, ...perfectTenseOptions, ...imperativeTenseOptions].find(o => o.value === props.vps.verb[
                        props.vps.verb.tenseCategory === "perfect"
                            ? "perfectTense"
                            : props.vps.verb.tenseCategory === "imperative"
                            ? "imperativeTense"
                            : "verbTense"
                    ]);
                const formula = !curr
                    ? ""
                    : (props.vps.verb.tenseCategory === "modal")
                    ? composeFormula(curr.formula, "ability")
                    : (props.vps.verb.voice === "passive")
                    ? composeFormula(curr.formula, "passive")
                    : curr.formula;
                if (curr && "formula" in curr) {
                    return <div className="mb-2" style={{ width: "250px", overflowY: "auto" }}>
                        <samp>{formula}</samp>
                    </div>
                }
            })()}
        </div>
    </div>;
}

export default TensePicker;

function getTenseCategory(tense: T.VerbTense | T.PerfectTense | T.ModalTense | T.ImperativeTense): "basic" | "perfect" | "modal" | "imperative" {
    if (isPerfectTense(tense)) {
        return "perfect";
    }
    if (isVerbTense(tense)) {
        return "basic";
    }
    if (isModalTense(tense)) {
        return "modal";
    }
    if (isImperativeTense(tense)) {
        return "imperative";
    }
    throw new Error("can't catagorize tense");
}