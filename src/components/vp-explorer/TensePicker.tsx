import Select from "react-select";
import {
    zIndexProps,
} from "../np-picker/picker-tools";
import * as T from "../../types";
import ButtonSelect from "../ButtonSelect";
import { isPerfectTense } from "../../lib/phrase-building/vp-tools";

const verbTenseOptions: { label: string | JSX.Element, value: T.VerbTense }[] = [{
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

export function getRandomTense(type: "basic" | "modal", o?: T.VerbTense): T.VerbTense;
export function getRandomTense(type: "perfect", o?: T.PerfectTense | T.VerbTense): T.PerfectTense;
export function getRandomTense(type: "basic" | "modal" | "perfect", o?: T.PerfectTense | T.VerbTense): T.PerfectTense | T.VerbTense {
    let tns: T.PerfectTense | T.VerbTense;
    const tenseOptions = type === "perfect" ? perfectTenseOptions : verbTenseOptions;
    do {
        tns = tenseOptions[
            Math.floor(Math.random()*tenseOptions.length)
        ].value;
    } while (o === tns);
    return tns;
}

function TensePicker({ onChange, vps, mode, locked }: {
    vps: T.VPSelection,
    onChange: (p: T.VPSelection) => void,
    mode: "charts" | "phrases" | "quiz",
    locked: boolean,
}) {
    function onTenseSelect(o: { value: T.VerbTense | T.PerfectTense } | null) {
        const value = o?.value ? o.value : undefined; 
        if (vps.verb && value) {
            if (isPerfectTense(value)) {
                onChange({
                    ...vps,
                    verb: {
                        ...vps.verb,
                        tense: value,
                        tenseCategory: "perfect",
                    },
                });
            } else {
                onChange({
                    ...vps,
                    verb: {
                        ...vps.verb,
                        tense: value,
                        tenseCategory: vps.verb.tenseCategory === "perfect" ? "basic" : vps.verb.tenseCategory,
                    },
                });
            }
        }
    }
    function moveTense(dir: "forward" | "back") {
        if (!vps.verb) return;
        return () => {
            const tenses = vps.verb.tenseCategory === "perfect" ? perfectTenseOptions : verbTenseOptions;
            const currIndex = tenses.findIndex(tn => tn.value === vps.verb.tense)
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
        if (vps.verb) {
            onChange({
                ...vps,
                verb: {
                    ...vps.verb,
                    negative: value === "true",
                },
            });
        }
    }
    function onTenseCategorySelect(value: "basic" | "modal" | "perfect") {
        if (vps.verb) {
            if (value === "perfect") {
                onChange({
                    ...vps,
                    verb: {
                        ...vps.verb,
                        tenseCategory: value,
                        tense: isPerfectTense(vps.verb.tense) ? vps.verb.tense : "present perfect",
                    },
                });
            } else {
                onChange({
                    ...vps,
                    verb: {
                        ...vps.verb,
                        tenseCategory: value,
                        tense: isPerfectTense(vps.verb.tense) ? "presentVerb" : vps.verb.tense,
                    }
                });
            }
        }
    }
    const tOptions = (vps.verb?.tenseCategory === "perfect") ? perfectTenseOptions : verbTenseOptions;
    return <div>
        <div style={{ maxWidth: "300px", minWidth: "250px", margin: "0 auto" }}>
            <div className="d-flex flex-row justify-content-between align-items-center">
                <div className="h5">Tense:</div>
                {vps.verb && <div className="mb-2">
                    <ButtonSelect
                        small
                        value={vps.verb.tenseCategory}
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
                value={vps.verb && ([...verbTenseOptions, ...perfectTenseOptions].find(o => o.value === vps.verb.tense))}
                onChange={onTenseSelect}
                className="mb-2"
                options={tOptions}
                {...zIndexProps}
            />
            {vps.verb && !locked && <div className="d-flex flex-row justify-content-between align-items-center mt-3 mb-1" style={{ width: "100%" }}>
                <div className="btn btn-light clickable" onClick={moveTense("back")}>
                    <i className="fas fa-chevron-left" />
                </div>
                {mode !== "charts" && <ButtonSelect
                    small
                    value={vps.verb.negative.toString()}
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