import NPPicker from "../np-picker/NPPicker";
import VerbPicker from "./VerbPicker";
import TensePicker from "./TensePicker";
import VPDisplay from "./VPDisplay";
import ButtonSelect from "../ButtonSelect";
import { renderVP } from "../../lib/phrase-building/index";
import {
    isInvalidSubjObjCombo,
} from "../../lib/phrase-building/vp-tools";
import * as T from "../../types";
import ChartDisplay from "./ChartDisplay";
import useStickyState from "../../lib/useStickyState";
import { makeVerbSelection } from "./verb-selection";
import { useEffect } from "react";

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
export function VPExplorer(props: {
    verb?: T.VerbEntry,
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
    const [subject, setSubject] = useStickyState<T.NPSelection | undefined>(undefined, "subjectNPSelection");
    const [mode, setMode] = useStickyState<"charts" | "phrases">("phrases", "verbExplorerMode");
    const passedVerb = props.verb;
    const [verb, setVerb] = useStickyState<T.VerbSelection | undefined>(
        passedVerb
            ? (old) => makeVerbSelection(passedVerb, setSubject, old)
            : undefined,
        "verbExplorerVerb",
    );
    useEffect(() => {
        if (!passedVerb) {
            setVerb(undefined);
        } else {
            setVerb(o => makeVerbSelection(passedVerb, setSubject, o));
        }
        // eslint-disable-next-line
    }, [passedVerb]);
    function handleSubjectChange(subject: T.NPSelection | undefined, skipPronounConflictCheck?: boolean) {
        if (!skipPronounConflictCheck && hasPronounConflict(subject, verb?.object)) {
            alert("That combination of pronouns is not allowed");
            return;
        }
        setSubject(subject);
    }
    function handleObjectChange(object: T.NPSelection | undefined) {
        if (!verb) return;
        if ((verb.object === "none") || (typeof verb.object === "number")) return;
        // check for pronoun conflict
        if (hasPronounConflict(subject, object)) {
            alert("That combination of pronouns is not allowed");
            return;
        }
        setVerb({ ...verb, object });
    }
    function handleSubjObjSwap() {
        if (verb?.isCompound === "dynamic") return;
        const output = switchSubjObj({ subject, verb });
        setSubject(output.subject);
        setVerb(output.verb);
    }
    const verbPhrase: T.VPSelection | undefined = verbPhraseComplete({ subject, verb });
    const VPRendered = verbPhrase && renderVP(verbPhrase);
    return <div className="mt-3" style={{ maxWidth: "950px"}}>
        <VerbPicker
            {..."getNounByTs" in props ? {
                getVerbByTs: props.getVerbByTs,
                verbs: props.verbs,
            } : {
                verbs: props.verbs,
            }}
            verbLocked={!!props.verb}
            verb={verb}
            subject={subject}
            changeSubject={(s) => handleSubjectChange(s, true)}
            onChange={setVerb}
            opts={props.opts}
        />
        <div className="mt-2 mb-3">
            <ButtonSelect
                value={mode}
                options={[
                    { label: "Charts", value: "charts" },
                    { label: "Phrases", value: "phrases" },
                ]}
                handleChange={setMode}
            />
        </div>
        {(verb && (typeof verb.object === "object") && (verb.isCompound !== "dynamic") && (mode !== "charts")) &&
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
                        np={subject}
                        counterPart={verb ? verb.object : undefined}
                        onChange={handleSubjectChange}
                        opts={props.opts}
                    />
                </div>
                {verb && (verb.object !== "none") && <div className="my-2">
                    <div className="h5 text-center">Object {showRole(VPRendered, "object")}</div>
                    {(typeof verb.object === "number")
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
                            np={verb.object}
                            counterPart={subject}
                            onChange={handleObjectChange}
                            opts={props.opts}
                        />}
                </div>}
            </>}
            <div className="my-2">
                <TensePicker
                    verb={verb}
                    onChange={setVerb}
                    mode={mode}
                />
            </div>
        </div>
        {(verbPhrase && (mode === "phrases")) &&
            <VPDisplay VP={verbPhrase} opts={props.opts} />
        }
        {(verb && (mode === "charts")) && <ChartDisplay VS={verb} opts={props.opts} />} 
    </div>
}

export default VPExplorer;

function hasPronounConflict(subject: T.NPSelection | undefined, object: undefined | T.VerbObject): boolean {
    const subjPronoun = (subject && subject.type === "pronoun") ? subject : undefined;
    const objPronoun = (object && typeof object === "object" && object.type === "pronoun") ? object : undefined; 
    if (!subjPronoun || !objPronoun) return false;
    return isInvalidSubjObjCombo(subjPronoun.person, objPronoun.person);
}

function verbPhraseComplete({ subject, verb }: { subject: T.NPSelection | undefined, verb: T.VerbSelection | undefined }): T.VPSelection | undefined {
    if (!subject) return undefined;
    if (!verb) return undefined;
    if (verb.object === undefined) return undefined;
    return {
        type: "VPSelection",
        subject,
        object: verb.object,
        verb,
    };
}

function showRole(VP: T.VPRendered | undefined, member: "subject" | "object") {
    return VP 
        ? <span className="ml-2">
            {(VP.king === member ? kingEmoji : VP.servant === member ? servantEmoji : "")}
        </span>
        : "";
}

type SOClump = { subject: T.NPSelection | undefined, verb: T.VerbSelection | undefined };
function switchSubjObj({ subject, verb }: SOClump): SOClump {
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