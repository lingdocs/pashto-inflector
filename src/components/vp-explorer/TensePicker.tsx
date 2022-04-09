import Select from "react-select";
import {
    zIndexProps,
} from "../np-picker/picker-tools";
import * as T from "../../types";
import ButtonSelect from "../ButtonSelect";
import { isPerfectTense } from "../../lib/phrase-building/vp-tools";

const tenseOptions: { label: string | JSX.Element, value: T.VerbTense }[] = [{
    label: <div><i className="fas fa-video mr-2" />present</div>,
    value: "presentVerb",
}, {
    label: <div><i className="fas fa-camera mr-2" />subjunctive</div>,
    value: "subjunctiveVerb",
}, {
    label: <div><i className="fas fa-video mr-2" />imperfective future</div>,
    value: "imperfectiveFuture",
}, {
    label: <div><i className="fas fa-camera mr-2" />perfective future</div>,
    value: "perfectiveFuture",
}, {
    label: <div><i className="fas fa-video mr-2" />continuous past</div>,
    value: "imperfectivePast",
}, {
    label: <div><i className="fas fa-camera mr-2" />simple past</div>,
    value: "perfectivePast",
}, {
    label: <div><i className="fas fa-video mr-2" />habitual continual past</div>,
    value: "habitualImperfectivePast",
}, {
    label: <div><i className="fas fa-camera mr-2" />habitual simple past</div>,
    value: "habitualPerfectivePast",
}];

const perfectTenseOptions: { label: string | JSX.Element, value: T.PerfectTense }[] = [{
    label: "Present Perfect",
    value: "present perfect",
}, {
    label: "Habitual Perfect",
    value: "habitual perfect",
}, {
    label: "Subjunctive Perfect",
    value: "subjunctive perfect",
}, {
    label: "Future Perfect",
    value: "future perfect",
}, {
    label: "Past Perfect",
    value: "past perfect",
}, {
    label: `"Would Be" Perfect`,
    value: "wouldBe perfect",
}, {
    label: "Past Subjunctive Perfect",
    value: "pastSubjunctive perfect",
}];

function TensePicker({ onChange, verb, mode }: {
    verb: T.VerbSelection | undefined,
    onChange: (p: T.VerbSelection | undefined) => void,
    mode: "charts" | "phrases" | "quiz",
}) {
    function onTenseSelect(o: { value: T.VerbTense | T.PerfectTense } | null) {
        const value = o?.value ? o.value : undefined; 
        if (verb && value) {
            if (isPerfectTense(value)) {
                onChange({
                    ...verb,
                    tense: value,
                    tenseCategory: "perfect",
                });
            } else {
                onChange({
                    ...verb,
                    tense: value,
                    tenseCategory: verb.tenseCategory === "perfect" ? "basic" : verb.tenseCategory,
                });
            }
        }
    }
    function moveTense(dir: "forward" | "back") {
        if (!verb) return;
        return () => {
            const tenses = verb.tenseCategory === "perfect" ? perfectTenseOptions : tenseOptions;
            const currIndex = tenses.findIndex(tn => tn.value === verb.tense)
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
    function onPosNegSelect(value: string) {
        if (verb) {
            onChange({
                ...verb,
                negative: value === "true",
            });
        }
    }
    function onTenseCategorySelect(value: "basic" | "modal" | "perfect") {
        if (verb) {
            if (value === "perfect") {
                onChange({
                    ...verb,
                    tenseCategory: value,
                    tense: isPerfectTense(verb.tense) ? verb.tense : "present perfect",
                });
            } else {
                onChange({
                    ...verb,
                    tenseCategory: value,
                    tense: isPerfectTense(verb.tense) ? "presentVerb" : verb.tense,
                });
            }
        }
    }
    const tOptions = (verb?.tenseCategory === "perfect") ? perfectTenseOptions : tenseOptions;
    return <div>
        <div style={{ maxWidth: "300px", minWidth: "250px", margin: "0 auto" }}>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="h5">Tense:</div>
                {verb && <div className="mb-2">
                    <ButtonSelect
                        small
                        value={verb.tenseCategory}
                        options={[{
                            label: "Basic",
                            value: "basic",
                        }, {
                            label: "Perfect",
                            value: "perfect",
                        }, {
                            label: "Modal",
                            value: "modal",
                        }]}
                        handleChange={onTenseCategorySelect}
                    />
                </div>}
            </div>
            <Select
                isSearchable={false}
                // for some reason can't use tOptions with find here;
                value={verb && ([...tenseOptions, ...perfectTenseOptions].find(o => o.value === verb.tense))}
                onChange={onTenseSelect}
                className="mb-2"
                options={tOptions}
                {...zIndexProps}
            />
            {verb && <div className="d-flex flex-row justify-content-between align-items-center mt-3 mb-1" style={{ width: "100%" }}>
                <div className="btn btn-light clickable" onClick={moveTense("back")}>
                    <i className="fas fa-chevron-left" />
                </div>
                {mode !== "charts" && <ButtonSelect
                    small
                    value={verb.negative.toString()}
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
        </div>
    </div>;
}

export default TensePicker;