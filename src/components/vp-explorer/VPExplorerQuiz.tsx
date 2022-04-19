import { CSSProperties, useState } from "react";
import * as T from "../../types";
import { randFromArray } from "../../lib/misc-helpers";
import { baParticle } from "../../lib/grammar-units";
import { randomSubjObj } from "../../lib/np-tools";
import { standardizePashto } from "../../lib/standardize-pashto";
import shuffleArray from "../../lib/shuffle-array";
import InlinePs from "../InlinePs";
import { psStringEquals } from "../../lib/p-text-helpers";
import { renderVP, compileVP } from "../../lib/phrase-building/index";
import { getRandomTense } from "./TensePicker";
import { getTenseFromVerbSelection, removeBa, switchSubjObj } from "../../lib/phrase-building/vp-tools";
import playAudio from "../../lib/play-audio";
import TensePicker from "./TensePicker";
import Keyframes from "../Keyframes";
import energyDrink from "./energy-drink.jpg";
import { flattenLengths } from "../../lib/phrase-building/compile-vp";
import { concatPsString } from "../../lib/p-text-helpers";

const correctEmoji = ["✅", '🤓', "✅", '😊', "🌹", "✅", "✅", '🥳', "👏", "✅", "💯", "😎", "✅", "👍"];

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
const stageLength = 5;

type QuizState = ({
    stage: "multiple choice",
    answer: {
        ps: T.SingleOrLengthOpts<T.PsString[]>;
        e?: string[] | undefined;
    },
    options: T.PsString[],
} | {
    stage: "blanks",
    answer: {
        ps: T.PsString[],
        withBa: boolean,
    },
}) & {
    qNumber: number,
    vps: T.VPSelectionComplete,
    result: "waiting" | "fail",
}
type MixType = "NPs" | "tenses" | "both";

function VPExplorerQuiz(props: {
    opts: T.TextOptions,
    vps: T.VPSelection,
}) {
    const startingQs = tickQuizState(completeVPs(props.vps));
    const [quizState, setQuizState] = useState<QuizState>(startingQs);
    const [showCheck, setShowCheck] = useState<boolean>(false);
    const [answerBlank, setAnswerBlank] = useState<string>("");
    const [withBa, setWithBa] = useState<boolean>(false);
    const [currentCorrectEmoji, setCurrentCorrectEmoji] = useState<string>(randFromArray(correctEmoji));
    function checkAnswer(a: T.PsString | { text: string, withBa: boolean }) {
        if (!quizState) return;
        const correct = "p" in a 
            ? isInAnswer(a, quizState.answer)
            // @ts-ignore // TODO: CLEANUP
            : blanksAnswerCorrect(a, quizState.answer);
        setAnswerBlank("");
        setWithBa(false);
        if (correct) {
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
            navigator.vibrate(300);
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
        setWithBa(false);
        setAnswerBlank("");
        setQuizState(tickQuizState(quizState.vps));
    }
    return <div className="mt-4">
        <ProgressBar quizState={quizState} />
        <div className="d-flex flex-row justify-content-around flex-wrap">
            <div className="my-2">
                <div className="h5 text-center">Subject</div>
                <QuizNPDisplay opts={props.opts} stage={quizState.stage}>{subject}</QuizNPDisplay>
            </div>
            {(object !== "none") && <div className="my-2">
                <div className="h5 text-center">Object</div>
                <QuizNPDisplay opts={props.opts} stage={quizState.stage}>{object}</QuizNPDisplay>
            </div>}
            <div className="my-2">
                <TensePicker
                    vpsComplete={quizState.vps}
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
                    <p className="lead">You finished the first two levels!</p>
                    <p>The <strong>other levels are still in development</strong>... In the meantime have an energy drink.</p>
                    <div className="mb-4">
                        <img src={energyDrink} alt="energy-dring" className="img-fluid" />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleRestart}>
                        Restart
                    </button>
                </div>
                : (quizState.result === "waiting"
                    ? (quizState.stage === "multiple choice" ? <>
                        <div className="text-muted my-3">Choose a correct answer:</div>
                        {quizState.options.map(o => <div className="pb-3" key={o.f} style={{ animation: "fade-in 0.5s" }}>
                            <button
                                className="btn btn-answer btn-outline-secondary"
                                onClick={() => checkAnswer(o)}>
                                <InlinePs opts={props.opts}>{o}</InlinePs>
                            </button>
                        </div>)}
                    </> : <div>
                        <div className="text-muted my-3">Type the <strong>verb in Pashto script</strong> to finish the phrase:</div>
                        <form onSubmit={e => {
                            if (!answerBlank) {
                                alert("Enter the verb in Pashto script");
                            };
                            e.preventDefault();
                            checkAnswer({ text: answerBlank, withBa });
                        }}>
                            <div className="mb-3" style={{ maxWidth: "250px", margin: "0 auto"}}>
                                <input
                                    type="text"
                                    dir="auto"
                                    className="form-control"
                                    placeholder="type verb here"
                                    value={answerBlank}
                                    onChange={e => setAnswerBlank(e.target.value)}
                                />
                            </div>
                            <div className="form-check mb-4" style={{ fontSize: "large" }}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={withBa}
                                    onChange={e => setWithBa(e.target.checked)}
                                />
                                <label className="form-check-label text-muted" htmlFor="OSVCheckbox">
                                    add <InlinePs opts={props.opts}>{baParticle}</InlinePs> in phrase
                                </label>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Check
                            </button>
                        </form>
                    </div>)
                    : <div style={{ animation: "fade-in 0.5s" }}>
                        <div className="h4 mt-4">❌ Wrong 😭</div>
                        {quizState.stage === "multiple choice" ?
                            <div>
                                <div className="my-4 lead">The correct answer was:</div>
                                <InlinePs opts={props.opts}>
                                    {quizState.options.find(x => isInAnswer(x, quizState.answer)) as T.PsString}
                                </InlinePs>
                            </div>
                        :
                            <div>
                                <div className="my-4 lead">Possible correct answers were:</div>
                                {quizState.answer.ps.map((p, i) => <div key={i}>
                                    <InlinePs opts={props.opts}>{p}</InlinePs>
                                </div>)}
                                <div className="mt-2">
                                    <strong>{("withBa" in quizState.answer && quizState.answer.withBa) ? "With" : "without"}</strong>
                                    {` `}
                                    a <InlinePs opts={props.opts}>{baParticle}</InlinePs> in the phrase
                                </div>
                            </div>
                        }
                        <button type="button" className="btn btn-primary mt-4" onClick={handleRestart}>
                            Try Again
                        </button>
                    </div>)
            }
            <Keyframes name="fade-in" from={{ opacity: 0 }} to={{ opacity: 1 }} />
        </div>
    </div>;
}

function blanksAnswerCorrect(a: { text: string, withBa: boolean }, answer: { ps: T.PsString[], withBa?: boolean }): boolean {
    const p = standardizePashto(a.text).trim();
    const given = removeBa({ p, f: "" }).p;
    return (
        a.withBa === answer.withBa
        &&
        answer.ps.some(x => x.p === given)
    );
}

function ProgressBar({ quizState }: { quizState: QuizState }) {
    function getPercentageDone({ current, total }: { current: number, total: number }): number {
        return Math.round(
            (current / total) * 100
        );
    }
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
            {quizState.stage === "multiple choice"
                ? "Level 1: Multiple Choice"
                : "Level 2: Type the Verb"}
        </div>
    </div>;
}

function QuizNPDisplay({ children, stage, opts }: {
    stage: "blanks" | "multiple choice",
    children: T.Rendered<T.NPSelection> | T.Person.ThirdPlurMale,
    opts: T.TextOptions,
}) {
    return <div className="mb-3">
        {(typeof children === "number")
            ? <div className="text-muted">Unspoken 3rd Pers. Masc. Plur.</div>
            : <div className="text-centered" style={{ fontSize: "large" }}>
                    {stage === "blanks" && <div>
                        <InlinePs opts={opts}>{children.ps[0]}</InlinePs>
                    </div>}
                    <div>{children.e}</div>
            </div>}
    </div>;
}

/**
 * creates a fresh QuizState when a VPSelection is passed
 * advances a QuizState when a QuizState is passed
 * 
 * @param startingWith 
 * @returns 
 */
function tickQuizState(startingWith: T.VPSelectionComplete | QuizState): QuizState {
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
    const qNumber = "stage" in startingWith ? (startingWith.qNumber + 1) : 0;
    const beatFirstStage = "stage" in startingWith && (qNumber === stageLength) && startingWith.stage === "multiple choice"; 
    const stage = beatFirstStage
        ? "blanks"
        : ("stage" in startingWith ? startingWith.stage : "multiple choice");
    const blanksAnswer = getBlanksAnswer(newVps);
    if (stage === "blanks") {
        return {
            stage,
            qNumber: beatFirstStage ? 0 : qNumber,
            vps: newVps,
            answer: blanksAnswer,
            result: "waiting",
        };
    }
    const answer = makeRes(newVps);
    const wrongAnswers = wrongVpsS.map(makeRes);
    const allAnswers = shuffleArray([...wrongAnswers, answer]);
    const options = allAnswers.map(getOptionFromResult);
    return {
        stage,
        qNumber: beatFirstStage ? 0 : qNumber,
        vps: newVps,
        answer,
        options,
        result: "waiting",
    };
}

function getBlanksAnswer(vps: T.VPSelectionComplete): { ps: T.PsString[], withBa: boolean } {
    const { verb } = renderVP(vps);
    const { head, rest } = verb.ps;
    const ps = flattenLengths(rest).map(x => {
        const y = removeBa(x);
        if (head) {
            return concatPsString(head, y);
        }
        return y;
    });
    return {
        ps,
        withBa: verb.hasBa,
    }
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

function completeVPs(vps: T.VPSelection): T.VPSelectionComplete {
    const oldSubj = vps.subject?.type === "pronoun"
        ? vps.subject.person
        : undefined;
    const oldObj = (typeof vps.verb.object === "object" && vps.verb.object.type === "pronoun")
        ? vps.verb.object.person
        : undefined;
    const { subj, obj } = randomSubjObj(
        oldSubj === undefined
            ? undefined
            : {
                subj: oldSubj,
                obj: oldObj,
            }
    );
    const verb: T.VerbSelectionComplete = {
        ...vps.verb,
        object: (
            (typeof vps.verb.object === "object" && !(vps.verb.object.type === "noun" && vps.verb.object.dynamicComplement))
            ||
            vps.verb.object === undefined
        )
            ? {
                type: "pronoun",
                distance: "far",
                person: obj,
            }
            : vps.verb.object,
        tense: getTenseFromVerbSelection(vps.verb),
    };
    return {
        ...vps,
        subject: {
            type: "pronoun",
            distance: "far",
            person: subj,
        },
        verb,
    };
}

function getRandomVPSelection(mix: MixType = "both") {
    // TODO: Type safety to make sure it's safe?
    return ({ subject, verb }: T.VPSelectionComplete): T.VPSelectionComplete => {
        const oldSubj = (subject.type === "pronoun")
            ? subject.person
            : undefined;
        const oldObj = (typeof verb.object === "object" && verb.object.type === "pronoun")
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
            dontRepeatTense ? verb.tense : undefined,
        ),
    };
}

export default VPExplorerQuiz;