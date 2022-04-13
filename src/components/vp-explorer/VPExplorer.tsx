import NPPicker from "../np-picker/NPPicker";
import VerbPicker from "./VerbPicker";
import TensePicker from "./TensePicker";
import VPDisplay from "./VPDisplay";
import ButtonSelect from "../ButtonSelect";

import {
    isInvalidSubjObjCombo,
} from "../../lib/phrase-building/vp-tools";
import * as T from "../../types";
import ChartDisplay from "./ChartDisplay";
import useStickyState from "../../lib/useStickyState";
import { makeVPSelectionState } from "./verb-selection";
import { useEffect } from "react";
import { getKingAndServant } from "../../lib/phrase-building/render-vp";
import { isPastTense } from "../../lib/phrase-building/vp-tools";
import VPExplorerQuiz from "./VPExplorerQuiz";
import { switchSubjObj } from "../../lib/phrase-building/vp-tools"

const kingEmoji = "👑";
const servantEmoji = "🙇‍♂️";


// TODO: make answerFeedback emojis appear at random translate angles a little bit
// add energy drinks? 

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
    const [vps, setVps] = useStickyState<T.VPSelection>(
        savedVps => makeVPSelectionState(props.verb, savedVps),
        "vpsState1",    
    );
    const [mode, setMode] = useStickyState<"charts" | "phrases" | "quiz">(
        savedMode => {
            if (!savedMode) return "charts";
            if (savedMode === "quiz") return "phrases";
            return savedMode;
        },
        "verbExplorerMode",
    );

    useEffect(() => {
        setVps(oldVps => {
            if (mode === "quiz") {
                setMode("phrases");
            }
            return makeVPSelectionState(props.verb, oldVps);
        });
        // eslint-disable-next-line
    }, [props.verb]);
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
    function quizLock<T>(f: T) {
        if (mode === "quiz") {
            return () => {
                alert("to adjust this, get out of quiz mode");
                return null;
            };
        }
        return f;
    }
    return <div className="mt-3" style={{ maxWidth: "950px"}}>
        <VerbPicker
            {..."getNounByTs" in props ? {
                getVerbByTs: props.getVerbByTs,
                verbs: props.verbs,
            } : {
                verbs: props.verbs,
            }}
            vps={vps}
            onChange={quizLock(setVps)}
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
                handleChange={setMode}
            />
        </div>
        {(vps.verb && (typeof vps.verb.object === "object") && (vps.verb.isCompound !== "dynamic") && (mode === "phrases")) &&
            <div className="text-center mt-4">
                <button onClick={handleSubjObjSwap} className="btn btn-sm btn-light">
                    <i className="fas fa-exchange-alt mr-2" /> subj/obj
                </button>
            </div>}
        {mode !== "quiz" && <div className="d-flex flex-row justify-content-around flex-wrap" style={{ marginLeft: "-0.5rem", marginRight: "-0.5rem" }}>
            {mode === "phrases" && <>
                <div className="my-2">
                    <div className="h5 text-center">Subject {showRole(vps, "subject")}</div>
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
                    />
                </div>
                {vps.verb && (vps.verb.object !== "none") && <div className="my-2">
                    <div className="h5 text-center">Object {showRole(vps, "object")}</div>
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
                        />}
                </div>}
            </>}
            <div className="my-2">
                <TensePicker
                    vps={vps}
                    onChange={quizLock(setVps)}
                    mode={mode}
                />
            </div>
        </div>}
        {mode === "phrases" && <VPDisplay VP={vps} opts={props.opts} />}
        {mode === "charts" && <ChartDisplay VS={vps.verb} opts={props.opts} />}
        {mode === "quiz" && <VPExplorerQuiz opts={props.opts} vps={vps} />}
    </div>
}

export default VPExplorer;

function hasPronounConflict(subject: T.NPSelection | undefined, object: undefined | T.VerbObject): boolean {
    const subjPronoun = (subject && subject.type === "pronoun") ? subject : undefined;
    const objPronoun = (object && typeof object === "object" && object.type === "pronoun") ? object : undefined; 
    if (!subjPronoun || !objPronoun) return false;
    return isInvalidSubjObjCombo(subjPronoun.person, objPronoun.person);
}

function showRole(VP: T.VPSelection, member: "subject" | "object") {
    const roles = getKingAndServant(
        isPastTense(VP.verb.tense),
        VP.verb.transitivity !== "intransitive",
    );
    return VP 
        ? <span className="ml-2">
            {(roles.king === member ? kingEmoji : roles.servant === member ? servantEmoji : "")}
        </span>
        : "";
}
