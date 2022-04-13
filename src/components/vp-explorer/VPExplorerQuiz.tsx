import { CSSProperties, useState } from "react";
import * as T from "../../types";
import { randFromArray } from "../../lib/misc-helpers";
import { randomSubjObj } from "../../library";
import shuffleArray from "../../lib/shuffle-array";
import InlinePs from "../InlinePs";
import { psStringEquals } from "../../lib/p-text-helpers";
import { renderVP, compileVP } from "../../lib/phrase-building/index";
import { getRandomTense } from "./TensePicker";
import { switchSubjObj } from "../../lib/phrase-building/vp-tools";
import playAudio from "../../lib/play-audio";
import TensePicker from "./TensePicker";
import Keyframes from "../Keyframes";
import energyDrink from "./energy-drink.jpeg";

const correctEmoji = ["✅", '🤓', "✅", '😊', "🌹", "✅", "✅", "🕺", "💃", '🥳', "👏", "✅", "💯", "😎", "✅", "👍"];

const answerFeedback: CSSProperties = {
    "fontSize": "4rem",
    "transition": "opacity 0.3s ease-in",
    "opacity": 0.9,
    "position": "fixed",
    "top": "60%",
    "left": "50%",
    "zIndex": 99999999,
    "transform": "translate(-50%, -50%)",
}

const checkDuration = 400;
const stageLength = 7;

type QuizState = {
    stage: "multiple choice",
    qNumber: number,
    vps: T.VPSelectionComplete,
    answer: {
        ps: T.SingleOrLengthOpts<T.PsString[]>;
        e?: string[] | undefined;
    },
    options: T.PsString[],
    result: "waiting" | "fail",
}
type MixType = "NPs" | "tenses" | "both";

function VPExplorerQuiz(props: {
    opts: T.TextOptions,
    vps: T.VPSelection,
}) {
    const startingQs = tickQuizState(props.vps);
    const [quizState, setQuizState] = useState<QuizState>(startingQs);
    const [showCheck, setShowCheck] = useState<boolean>(false);
    const [currentCorrectEmoji, setCurrentCorrectEmoji] = useState<string>(randFromArray(correctEmoji));
    function checkQuizAnswer(a: T.PsString) {
        if (!quizState) return;
        if (isInAnswer(a, quizState.answer)) {
            const toPlay = randFromArray([true, false, false]);
            if (toPlay) playAudio(`correct-${randFromArray([1,2,3])}`);
            setShowCheck(true);
            setTimeout(() => {
                setQuizState(tickQuizState);
            }, checkDuration / 2);
            setTimeout(() => {
                setShowCheck(false);
            }, checkDuration);
            // this sucks, have to do this so the emoji doesn't change in the middle of animation
            setTimeout(() => {
                setCurrentCorrectEmoji(randFromArray(correctEmoji));
            }, checkDuration * 2);
        } else {
            playAudio(`wrong-${randFromArray([1,2])}`);
            navigator.vibrate(250);
            setQuizState({
                ...quizState,
                result: "fail",
            });
        }
    }
    const rendered = renderVP(quizState.vps);
    const { subject, object } = rendered;
    const { e } = compileVP(rendered, { removeKing: false, shrinkServant: false });
    function handleRestart() {
        setQuizState(tickQuizState(quizState.vps));
    }
    return <div className="mt-4">
        <ProgressBar quizState={quizState} />
        <div className="d-flex flex-row justify-content-around flex-wrap">
            <div className="my-2">
                <div className="h5 text-center">Subject</div>
                <QuizNPDisplay>{subject}</QuizNPDisplay>
            </div>
            {(object !== "none") && <div className="my-2">
                <div className="h5 text-center">Object</div>
                <QuizNPDisplay>{object}</QuizNPDisplay>
            </div>}
            <div className="my-2">
                <TensePicker
                    vps={quizState.vps}
                    onChange={() => null}
                    mode={"quiz"}
                />
            </div>
        </div>
        {e && <div className="text-center text-muted">
            {e.map(eLine => <div key={eLine}>{eLine}</div>)}
        </div>}
        <div className="text-center">
            <div style={showCheck ? answerFeedback : { ...answerFeedback, opacity: 0 }}>
                {currentCorrectEmoji}
            </div>
            {quizState.qNumber === stageLength ?
                <div className="mt-4" style={{ animation: "fade-in 0.5s" }}>
                    <h4>👏 Congratulations</h4>
                    <p className="lead">You finished the first level!</p>
                    <p>The <strong>other levels are still in development</strong>... In the meantime have an energy drink.</p>
                    <div className="mb-4">
                        <img src={energyDrink} alt="energy-dring" className="img-fluid" />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleRestart}>
                        Restart
                    </button>
                </div>
                : (quizState.result === "waiting"
                    ? <>
                        <div className="text-muted my-3">Choose a correct answer:</div>
                        {quizState.options.map(o => <div className="pb-3" key={o.f} style={{ animation: "fade-in 0.5s" }}>
                            <button className="btn btn-answer btn-outline-secondary" onClick={() => {
                                checkQuizAnswer(o);
                            }}>
                                <InlinePs opts={props.opts}>{o}</InlinePs>
                            </button>
                        </div>)}
                    </>
                    : <div style={{ animation: "fade-in 0.5s" }}>
                        <div className="h4 mt-4">❌ Wrong 😭</div>
                        <div className="my-4 lead">The correct answer was:</div>
                        <InlinePs opts={props.opts}>
                            {quizState.options.find(x => isInAnswer(x, quizState.answer)) as T.PsString}
                        </InlinePs>
                        <div className="my-4">
                            <button type="button" className="btn btn-primary" onClick={handleRestart}>
                                Try Again
                            </button>
                        </div>
                    </div>)
            }
            <Keyframes name="fade-in" from={{ opacity: 0 }} to={{ opacity: 1 }} />
        </div>
    </div>;
}

function ProgressBar({ quizState }: { quizState: QuizState }) {
    function getProgressWidth(): string {
        const num = getPercentageDone({ current: quizState.qNumber, total: stageLength });
        return `${num}%`;
    }
    return <div className="mb-3">
        <div className="progress mb-1" style={{ height: "3px" }}>
            <div
                className={`progress-bar bg-${quizState.result === "fail" ? "danger" : "primary"}`}
                role="progressbar"
                style={{ width: getProgressWidth() }}
            />

        </div>
        <div>
            Level 1: Multiple Choice
        </div>
    </div>;
}

function getPercentageDone(progress: { current: number, total: number }): number {
    return Math.round(
        (progress.current / (progress.total + 1)) * 100
    );
}

function QuizNPDisplay({ children }: { children: T.Rendered<T.NPSelection> | T.Person.ThirdPlurMale }) {
    return <div className="mb-3">
        {(typeof children === "number")
            ? <div className="text-muted">Unspoken 3rd Pers. Masc. Plur.</div>
            : <div style={{ fontSize: "larger" }}>{children.e}</div>}
    </div>;
}

/**
 * creates a fresh QuizState when a VPSelection is passed
 * advances a QuizState when a QuizState is passed
 * 
 * @param startingWith 
 * @returns 
 */
function tickQuizState(startingWith: T.VPSelection | QuizState): QuizState {
    function makeRes(x: T.VPSelectionComplete) {
        return compileVP(renderVP(x), { removeKing: false, shrinkServant: false });
    }
    const oldVps = "stage" in startingWith ? startingWith.vps : startingWith;
    // for now, always inforce positive
    const newVps = getRandomVPSelection("both")({ ...oldVps, verb: { ...oldVps.verb, negative: false }});
    const wrongVpsS: T.VPSelectionComplete[] = [];
    // don't do the SO switches every time
    const wholeTimeSOSwitch = randFromArray([true, false]);
    [1, 2, 3].forEach(() => {
        let v: T.VPSelectionComplete;
        do {
            const SOSwitch = wholeTimeSOSwitch && randFromArray([true, false]);
            // TODO: if switich subj and obj, include the tense being correct maybe
            v = getRandomVPSelection("tenses")(
                SOSwitch ? switchSubjObj(newVps) : newVps,
            );
            // eslint-disable-next-line
        } while (wrongVpsS.find(x => x.verb.tense === v.verb.tense));
        wrongVpsS.push(v);
    });
    const answer = makeRes(newVps);
    const wrongAnswers = wrongVpsS.map(makeRes);
    const allAnswers = shuffleArray([...wrongAnswers, answer]);
    const options = allAnswers.map(getOptionFromResult);
    const qNumber = ("stage" in startingWith) ? (startingWith.qNumber + 1) : 0;
    return {
        stage: "multiple choice",
        qNumber,
        vps: newVps,
        answer,
        options,
        result: "waiting",
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
    return ({ subject, verb }: T.VPSelection): T.VPSelectionComplete => {
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
        // ensure that the verb selection is complete
        if (mix === "tenses") {
            return {
                subject: subject !== undefined ? subject : randSubj,
                // @ts-ignore
                verb: randomizeTense(verb, true),
            }
        }
        const v: T.VerbSelectionComplete = {
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
            subject: randSubj,
            verb: randomizeTense(v, true),
        };
    };
};

function randomizeTense(verb: T.VerbSelectionComplete, dontRepeatTense: boolean): T.VerbSelectionComplete {
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

export default VPExplorerQuiz;