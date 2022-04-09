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
    console.log("passedVerb", props.verb);
    const [subject, setSubject] = useStickyState<T.NPSelection | undefined>(undefined, "subjectNPSelection");
    // not quite working with stickyState
    const [mode, setMode] = useStickyState<"charts" | "phrases" | "quiz">("phrases", "verbExplorerMode");
    // const [mode, setMode] = useState<"charts" | "phrases" | "quiz">("charts");
    const [showAnswer, setShowAnswer] = useState<boolean>(false);
    const passedVerb = props.verb;
    // this isn't quite working
    // const [verb, setVerb] = useStickyState<T.VerbSelection | undefined>(
    //     passedVerb
    //         ? (old) => makeVerbSelection(passedVerb, setSubject, old)
    //         : undefined,
    //     "verbExplorerVerb",
    // );
    const [verb, setVerb] = useState<T.VerbSelection | undefined>(
        passedVerb ? makeVerbSelection(passedVerb, setSubject) : undefined
    )
    useEffect(() => {
        if (mode === "quiz") {
            if (!verb) setMode("phrases");
            handleResetQuiz();
        }
        // TODO: better system with all this
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        if (!passedVerb) {
            setVerb(undefined);
        } else {
            setVerb(o => makeVerbSelection(passedVerb, setSubject, o));
            if (mode === "quiz") {
                // TODO: Better
                setMode("charts");
            }
        }
        // eslint-disable-next-line
    }, [passedVerb]);
    function handleChangeMode(m: "charts" | "phrases" | "quiz") {
        if (m === "quiz") {
            handleResetQuiz();
        }
        setMode(m);
    }
    function handleSetVerb(v: T.VerbSelection | undefined) {
        if (v?.verb.entry.ts !== verb?.verb.entry.ts) {
            handleResetQuiz();
        }
        setVerb(v);
    }
    function handleResetQuiz() {
        if (!verb) {
            alert("Choose a verb to quiz");
            return;
        }
        const { S, V } = setRandomQuizState(subject, verb);
        setShowAnswer(false);
        setSubject(S);
        setVerb(V);
    }
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
            onChange={handleSetVerb}
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
                        cantClear={mode === "quiz"}
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
                            cantClear={mode === "quiz"}
                        />}
                </div>}
            </>}
            <div className="my-2">
                <TensePicker
                    verb={verb}
                    onChange={handleSetVerb}
                    mode={mode}
                />
            </div>
        </div>
        {(verb && (mode === "quiz")) && <div className="text-center my-2">
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
        {(verb && (mode === "charts")) && <ChartDisplay VS={verb} opts={props.opts} />}
        {mode === "quiz" && <div style={{ height: "300px" }}>
        </div>}
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

function setRandomQuizState(subject: T.NPSelection | undefined, verb: T.VerbSelection): {
    S: T.NPSelection,
    V: T.VerbSelection,
} {
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
    return {
        // TODO: Randomize the near/far ??
        S: randSubj,
        V: {
            ...verb,
            object: (typeof verb.object === "object" || verb.object === undefined)
                ? randObj
                : verb.object,
        },
    }
}