import NPPicker from "../np-picker/NPPicker";
import VerbPicker from "./VerbPicker";
import TensePicker, { getRandomTense } from "./TensePicker";
import VPDisplay from "./VPDisplay";
import ButtonSelect from "../ButtonSelect";
import { renderVP } from "../../lib/phrase-building/index";
import {
    isInvalidSubjObjCombo,
} from "../../lib/phrase-building/vp-tools";
import * as T from "../../types";
import ChartDisplay from "./ChartDisplay";
import useStickyState from "../../lib/useStickyState";
import { makeVPSelectionState } from "./verb-selection";
import { useEffect, useState } from "react";
import { randomSubjObj } from "../../library";

const kingEmoji = "👑";
const servantEmoji = "🙇‍♂️";

// TODO: Drill Down text display options

// TODO: SHOW KING AND SERVANT ONCE TENSE PICKED, EVEN IF NPs not selected
// TODO: Issue with dynamic compounds english making with plurals
// TODO: Issue with "the money were taken"
// TODO: Use the same component for PronounPicker and NPPronounPicker (sizing issue)
// get the practice pronoun picker page into a typesafe file
// A little button you can press on the tense select to show the formula and info about the tense
// in a popup
// TODO: option to show 3 modes  Phrases - Charts - Quiz

// TODO: error handling on error with rendering etc
type MixState = "NPs" | "tenses" | "both";

export function VPExplorer(props: {
    verb: T.VerbEntry,
    opts: T.TextOptions,
} & ({
    nouns: T.NounEntry[],
    verbs: T.VerbEntry[],
} | {
    nouns: (s: string) => T.NounEntry[],
    verbs: (s: string) => T.VerbEntry[],
    getNounByTs: (ts: number) => T.NounEntry | undefined,
    getVerbByTs: (ts: number) => T.VerbEntry | undefined,
})) {
    const [vps, setVps] = useStickyState<T.VPSelectionState>(
        o => makeVPSelectionState(props.verb, o),
        "vpsState1",    
    );
    const [mode, setMode] = useStickyState<"charts" | "phrases" | "quiz">("phrases", "verbExplorerMode");
    const [mix, setMix] = useStickyState<MixState>("NPs", "mixState1");
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    useEffect(() => {
        setVps(o => {
            if (mode === "quiz") {
                return setRandomQuizState(mix)(
                    makeVPSelectionState(props.verb, o)
                );
            }
            return makeVPSelectionState(props.verb, o);
        });
        // eslint-disable-next-line
    }, [props.verb]);
    function handleChangeMode(m: "charts" | "phrases" | "quiz") {
        if (m === "quiz") {
            handleResetQuiz();
        }
        setMode(m);
    }
    function handleResetQuiz() {
        if (!vps.verb) {
            alert("Choose a verb to quiz");
            return;
        }
        setShowAnswer(false);
        setVps(setRandomQuizState(mix));
    }
    function handleSubjectChange(subject: T.NPSelection | undefined, skipPronounConflictCheck?: boolean) {
        if (!skipPronounConflictCheck && hasPronounConflict(subject, vps.verb?.object)) {
            alert("That combination of pronouns is not allowed");
            return;
        }
        setVps(o => ({ ...o, subject }));
    }
    function handleObjectChange(object: T.NPSelection | undefined) {
        if (!vps.verb) return;
        if ((vps.verb.object === "none") || (typeof vps.verb.object === "number")) return;
        // check for pronoun conflict
        if (hasPronounConflict(vps.subject, object)) {
            alert("That combination of pronouns is not allowed");
            return;
        }
        setVps(o => ({
            ...o,
            verb: {
                ...o.verb,
                object,
            },
        }));
    }
    function handleSubjObjSwap() {
        if (vps.verb?.isCompound === "dynamic") return;
        setVps(switchSubjObj)
    }
    const verbPhrase: T.VPSelectionComplete | undefined = completeVPSelection(vps);
    const VPRendered = verbPhrase && renderVP(verbPhrase);
    return <div className="mt-3" style={{ maxWidth: "950px"}}>
        <VerbPicker
            {..."getNounByTs" in props ? {
                getVerbByTs: props.getVerbByTs,
                verbs: props.verbs,
            } : {
                verbs: props.verbs,
            }}
            vps={vps}
            onChange={setVps}
            opts={props.opts}
        />
        <div className="mt-2 mb-3 text-center">
            <ButtonSelect
                value={mode}
                options={[
                    { label: "Charts", value: "charts" },
                    { label: "Phrases", value: "phrases" },
                    { label: "Quiz", value: "quiz" },
                ]}
                handleChange={handleChangeMode}
            />
        </div>
        {mode === "quiz" && <div className="mt-2 mb-3 d-flex flex-row justify-content-center align-items-center">
            <div className="mr-2">Mix:</div>
            <ButtonSelect
                small
                value={mix}
                options={[
                    { label: "NPs", value: "NPs" },
                    { label: "Tenses", value: "tenses" },
                    { label: "Both", value: "both" },
                ]}
                handleChange={setMix}
            />
        </div>}
        {(vps.verb && (typeof vps.verb.object === "object") && (vps.verb.isCompound !== "dynamic") && (mode === "phrases")) &&
            <div className="text-center mt-4">
                <button onClick={handleSubjObjSwap} className="btn btn-sm btn-light">
                    <i className="fas fa-exchange-alt mr-2" /> subj/obj
                </button>
            </div>}
        <div className="d-flex flex-row justify-content-around flex-wrap" style={{ marginLeft: "-0.5rem", marginRight: "-0.5rem" }}>
            {mode !== "charts" && <>
                <div className="my-2">
                    <div className="h5 text-center">Subject {showRole(VPRendered, "subject")}</div>
                    <NPPicker
                        {..."getNounByTs" in props ? {
                            getNounByTs: props.getNounByTs,
                            getVerbByTs: props.getVerbByTs,
                            nouns: props.nouns,
                            verbs: props.verbs,
                        } : {
                            nouns: props.nouns,
                            verbs: props.verbs,
                        }}
                        np={vps.subject}
                        counterPart={vps.verb ? vps.verb.object : undefined}
                        onChange={handleSubjectChange}
                        opts={props.opts}
                        cantClear={mode === "quiz"}
                    />
                </div>
                {vps.verb && (vps.verb.object !== "none") && <div className="my-2">
                    <div className="h5 text-center">Object {showRole(VPRendered, "object")}</div>
                    {(typeof vps.verb.object === "number")
                        ? <div className="text-muted">Unspoken 3rd Pers. Masc. Plur.</div>
                        : <NPPicker
                            {..."getNounByTs" in props ? {
                                getNounByTs: props.getNounByTs,
                                getVerbByTs: props.getVerbByTs,
                                nouns: props.nouns,
                                verbs: props.verbs,
                            } : {
                                nouns: props.nouns,
                                verbs: props.verbs,
                            }}
                            asObject
                            np={vps.verb.object}
                            counterPart={vps.subject}
                            onChange={handleObjectChange}
                            opts={props.opts}
                            cantClear={mode === "quiz"}
                        />}
                </div>}
            </>}
            <div className="my-2">
                <TensePicker
                    vps={vps}
                    onChange={setVps}
                    mode={mode}
                />
            </div>
        </div>
        {(vps.verb && (mode === "quiz")) && <div className="text-center my-2">
            <button
                className="btn btn-primary"
                onClick={showAnswer ? handleResetQuiz : () => setShowAnswer(true)}
            >
                {showAnswer
                    ? <>Next <i className="ml-1 fas fa-random"/></>
                    : <>Show Answer</>}
            </button>
        </div>}
        {(verbPhrase && ((mode === "phrases") || (mode === "quiz" && showAnswer))) &&
            <VPDisplay VP={verbPhrase} opts={props.opts} />
        }
        {(vps.verb && (mode === "charts")) && <ChartDisplay VS={vps.verb} opts={props.opts} />}
        {mode === "quiz" && <div style={{ height: "300px" }}>
            {/* spacer for blank space while quizzing */}
        </div>}
    </div>
}

export default VPExplorer;

function completeVPSelection(vps: T.VPSelectionState): T.VPSelectionComplete | undefined {
    if (vps.subject === undefined) return undefined
    if (vps.verb.object === undefined) return undefined;
    const verb = vps.verb;
    return {
        type: "VPSelectionComplete",
        subject: vps.subject,
        object: vps.verb.object,
        verb,
    }
}

function hasPronounConflict(subject: T.NPSelection | undefined, object: undefined | T.VerbObject): boolean {
    const subjPronoun = (subject && subject.type === "pronoun") ? subject : undefined;
    const objPronoun = (object && typeof object === "object" && object.type === "pronoun") ? object : undefined; 
    if (!subjPronoun || !objPronoun) return false;
    return isInvalidSubjObjCombo(subjPronoun.person, objPronoun.person);
}

function showRole(VP: T.VPRendered | undefined, member: "subject" | "object") {
    return VP 
        ? <span className="ml-2">
            {(VP.king === member ? kingEmoji : VP.servant === member ? servantEmoji : "")}
        </span>
        : "";
}

function switchSubjObj({ subject, verb }: T.VPSelectionState): T.VPSelectionState {
    if (!subject|| !verb || !verb.object || !(typeof verb.object === "object")) {
        return { subject, verb };
    }
    return {
        subject: verb.object,
        verb: {
            ...verb,
            object: subject,
        }
    };
}

function setRandomQuizState(mix: MixState) {
    return ({ subject, verb }: T.VPSelectionState): T.VPSelectionState => {
        if (mix === "tenses") {
            return {
                subject,
                verb: randomizeTense(verb, true),
            }
        }
        const oldSubj = (subject?.type === "pronoun")
            ? subject.person
            : undefined;
        const oldObj = (typeof verb?.object === "object" && verb.object.type === "pronoun")
            ? verb.object.person
            : undefined;
        const { subj, obj } = randomSubjObj(
            oldSubj !== undefined ? { subj: oldSubj, obj: oldObj } : undefined
        );
        const randSubj: T.PronounSelection = subject?.type === "pronoun" ? {
            ...subject,
            person: subj,
        } : {
            type: "pronoun",
            distance: "far",
            person: subj,
        };
        const randObj: T.PronounSelection = typeof verb?.object === "object" && verb.object.type === "pronoun" ? {
            ...verb.object,
            person: obj,
        } : {
            type: "pronoun",
            distance: "far",
            person: obj,
        };
        const s = randSubj;
        const v: T.VerbSelection = {
            ...verb,
            object: (
                (typeof verb.object === "object" && !(verb.object.type === "noun" && verb.object.dynamicComplement))
                ||
                verb.object === undefined
            )
                ? randObj
                : verb.object,
        };
        return {
            subject: s,
            verb: mix === "both" ? randomizeTense(v, false) : v,
        };
    };
};

function randomizeTense(verb: T.VerbSelection, dontRepeatTense: boolean): T.VerbSelection {
    return {
        ...verb,
        tense: getRandomTense(
            // TODO: WHY ISN'T THE OVERLOADING ON THIS
            // @ts-ignore
            verb.tenseCategory,
            dontRepeatTense ? verb.tense : undefined,
        ),
    };
}