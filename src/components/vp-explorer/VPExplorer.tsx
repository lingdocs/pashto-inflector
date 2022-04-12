import NPPicker from "../np-picker/NPPicker";
import VerbPicker from "./VerbPicker";
import TensePicker, { getRandomTense } from "./TensePicker";
import VPDisplay from "./VPDisplay";
import ButtonSelect from "../ButtonSelect";
import { renderVP, compileVP } from "../../lib/phrase-building/index";
import {
    isInvalidSubjObjCombo,
} from "../../lib/phrase-building/vp-tools";
import * as T from "../../types";
import ChartDisplay from "./ChartDisplay";
import useStickyState from "../../lib/useStickyState";
import { makeVPSelectionState } from "./verb-selection";
import { useEffect, useState } from "react";
import { randomSubjObj } from "../../library";
import shuffleArray from "../../lib/shuffle-array";
import InlinePs from "../InlinePs";
import { psStringEquals } from "../../lib/p-text-helpers";
import classNames from "classnames";
import { randFromArray } from "../../lib/misc-helpers";
// import { useReward } from 'react-rewards';

const kingEmoji = "👑";
const servantEmoji = "🙇‍♂️";
const correctEmoji = ["✅", '🤓', "✅", '😊', "🌹", "✅", "✅", "🕺", "💃", '🥳', "👏", "✅", "💯", "😎", "✅", "👍"];

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

const checkDuration = 400;

type QuizState = {
    answer: {
        ps: T.SingleOrLengthOpts<T.PsString[]>;
        e?: string[] | undefined;
    },
    options: T.PsString[],
    result: "waiting" | "fail",
}

type MixType = "NPs" | "tenses" | "both";
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
    const [quizState, setQuizState] = useState<QuizState | undefined>(undefined);
    const [showCheck, setShowCheck] = useState<boolean>(false);
    const [currentCorrectEmoji, setCurrentCorrectEmoji] = useState<string>(randFromArray(correctEmoji));
    // const { reward } = useReward('rewardId', "emoji", {
    //     emoji: ['🤓', '😊', '🥳', "👏", "💯", "😎", "👍"],
    //     lifetime: 50,
    //     elementCount: 10,
    //     elementSize: 30,
    // });
    useEffect(() => {
        if (mode === "quiz") {
            handleResetQuiz();
        }
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        setVps(o => {
            if (mode === "quiz") {
                const newvps = makeVPSelectionState(props.verb, o);
                const { VPS, qs } = makeQuizState(newvps);
                setQuizState(qs);
                return VPS;
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
        const { VPS, qs } = makeQuizState(vps);
        setVps(VPS);
        setQuizState(qs);
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
    function quizLock<T>(f: T) {
        if (mode === "quiz") {
            return () => null;
        }
        return f;
    }
    function checkQuizAnswer(a: T.PsString) {
        if (!quizState) return;
        if (isInAnswer(a, quizState.answer)) {
            setShowCheck(true);
            setTimeout(() => {
                handleResetQuiz();
            }, checkDuration / 2);
            setTimeout(() => {
                setShowCheck(false);
            }, checkDuration);
            // this sucks, have to do this so the emoji doesn't change in the middle of animation
            setTimeout(() => {
                setCurrentCorrectEmoji(randFromArray(correctEmoji));
            }, checkDuration * 2);
        } else {
            navigator.vibrate(250);
            setQuizState({
                ...quizState,
                result: "fail",
            });
        }
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
                        onChange={quizLock(handleSubjectChange)}
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
                            onChange={quizLock(handleObjectChange)}
                            opts={props.opts}
                            cantClear={mode === "quiz"}
                        />}
                </div>}
            </>}
            <div className="my-2">
                <TensePicker
                    vps={vps}
                    onChange={quizLock(setVps)}
                    mode={mode}
                    locked={!!(mode === "quiz" && quizState)}
                />
            </div>
        </div>
        {(verbPhrase && (mode === "phrases")) &&
            <VPDisplay VP={verbPhrase} opts={props.opts} />
        }
        {(vps.verb && (mode === "charts")) && <ChartDisplay VS={vps.verb} opts={props.opts} />}
        <span id="rewardId" />
        {(mode === "quiz" && quizState) && <div className="text-center">
            <div style={{ fontSize: "4rem" }} className={classNames("answer-feedback", { hide: !showCheck })}>
                {currentCorrectEmoji}
            </div>
            {quizState.result === "waiting" ? <>
                <div className="text-muted my-3">Choose a correct answer:</div>
                {quizState.options.map(o => <div className="pb-3" key={o.f}>
                    <div className="btn btn-answer btn-outline-secondary" onClick={() => {
                        checkQuizAnswer(o);
                    }}>
                        <InlinePs opts={props.opts}>{o}</InlinePs>
                    </div>
                </div>)}
            </> : <div>
                <div className="h5 mt-4">❌ Wrong 😭</div>
                <div className="my-4">The correct answer was:</div>
                <InlinePs opts={props.opts}>
                    {quizState.options.find(x => isInAnswer(x, quizState.answer)) as T.PsString}
                </InlinePs>
                <div className="my-4">
                    <button type="button" className="btn btn-primary" onClick={handleResetQuiz}>
                        Try Again
                    </button>
                </div>
            </div>}
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

function makeQuizState(oldVps: T.VPSelectionState): { VPS: T.VPSelectionState, qs: QuizState } {
    function makeRes(x: T.VPSelectionState) {
        const y = completeVPSelection(x);
        if (!y) {
            throw new Error("trying to make a quiz out of an incomplete VPSelection")
        }
        return compileVP(renderVP(y), { removeKing: false, shrinkServant: false });
    }
    const vps = getRandomVPSelection("both")(oldVps);
    const wrongStates: T.VPSelectionState[] = [];
    // don't do the SO switches every time
    const wholeTimeSOSwitch = randFromArray([true, false]);
    [1, 2, 3].forEach(() => {
        // TODO: don't repeat tenses
        let v: T.VPSelectionState;
        do {
            const SOSwitch = wholeTimeSOSwitch && randFromArray([true, false]);
            v = getRandomVPSelection("tenses")(
                SOSwitch ? switchSubjObj(vps) : vps,
            );
            // eslint-disable-next-line
        } while (wrongStates.find(x => x.verb.tense === v.verb.tense));
        wrongStates.push(v);
    });
    const answer = makeRes(vps);
    const wrongAnswers = wrongStates.map(makeRes);
    const allAnswers = shuffleArray([...wrongAnswers, answer]);
    const options = allAnswers.map(getOptionFromResult);
    return {
        VPS: vps,
        qs: {
            answer,
            options,
            result: "waiting",
        },
    };
}

function isInAnswer(a: T.PsString, answer: {
    ps: T.SingleOrLengthOpts<T.PsString[]>;
    e?: string[] | undefined;
}): boolean {
    if ("long" in answer.ps) {
        return isInAnswer(a, { ...answer, ps: answer.ps.long }) ||
            isInAnswer(a, { ...answer, ps: answer.ps.short }) ||
            !!(answer.ps.mini && isInAnswer(a, { ...answer, ps: answer.ps.mini }));
    }
    return answer.ps.some((x) => psStringEquals(x, a));
}

function getOptionFromResult(r: {
    ps: T.SingleOrLengthOpts<T.PsString[]>;
    e?: string[] | undefined;
}): T.PsString {
    const ps = "long" in r.ps
        ? r.ps[randFromArray(["short", "long"] as ("short" | "long")[])]
        : r.ps;
    // not randomizing version pick (for now)
    return ps[0];
}

function getRandomVPSelection(mix: MixType = "both") {
    // TODO: Type safety to make sure it's safe?
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
            verb: randomizeTense(v, true),
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