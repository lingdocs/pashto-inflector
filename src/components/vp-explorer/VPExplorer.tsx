import NPPicker from "../np-picker/NPPicker";
import VerbPicker from "./VerbPicker";
import TensePicker from "./TensePicker";
import VPDisplay from "./VPDisplay";
import ButtonSelect from "../ButtonSelect";
import { Modal } from "react-bootstrap";
import {
    isInvalidSubjObjCombo,
} from "../../lib/phrase-building/vp-tools";
import * as T from "../../types";
import ChartDisplay from "./ChartDisplay";
import useStickyState from "../../lib/useStickyState";
import { makeVPSelectionState } from "./verb-selection";
import { useEffect, useState } from "react";
import { getKingAndServant } from "../../lib/phrase-building/render-vp";
import { isPastTense } from "../../lib/phrase-building/vp-tools";
import VPExplorerQuiz from "./VPExplorerQuiz";
import { switchSubjObj } from "../../lib/phrase-building/vp-tools";

const kingIcon = <i className="mx-1 fas fa-crown" />;
const servantIcon = <i className="mx-1 fas fa-male" />;

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
    handleLinkClick: ((ts: number) => undefined) | 0,
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
    const [showingKingExplanation, setShowingKingExplanation] = useState<"subject" | "object" | false>(false);
    const [showingServantExplanation, setShowingServantExplanation] = useState<"subject" | "object" | false>(false);
    const roles = getKingAndServant(isPastTense(vps.verb.tense), vps.verb.transitivity !== "intransitive");
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
            handleLinkClick={props.handleLinkClick}
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
                    {roles.king === "subject" 
                        ? <div className="h5 text-center clickable" onClick={() => setShowingKingExplanation("subject")}>Subject {kingIcon}</div>
                        : <div className="h5 text-center clickable" onClick={() => setShowingServantExplanation("subject")}>Subject {servantIcon}</div>}
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
                {roles.king === "object" 
                        ? <div className="h5 text-center clickable" onClick={() => setShowingKingExplanation("object")}>Object {kingIcon}</div>
                        : <div className="h5 text-center clickable" onClick={() => setShowingServantExplanation("object")}>Object {servantIcon}</div>}
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
        <Modal show={!!showingKingExplanation} onHide={() => setShowingKingExplanation(false)}>
            <Modal.Header closeButton>
            <Modal.Title>About the King {kingIcon}</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    In this tense/form, the {showingKingExplanation} is the <strong>king</strong> {kingIcon} of the phrase. That means that:
                    <ul className="mt-2">
                        <li>
                            <div>It <strong>controls the verb conjugation</strong>. The verb agrees with the gender and number of the king.</div>
                        </li>
                        <li>
                            <div>👍 It <strong>can</strong> be removed / left out from the phrase.</div>
                            <div className="text-muted">(You can kill the king)</div>
                        </li>
                        <li>
                            <div>🙅‍♂️ It <strong>cannot be</strong> shrunk it into a <a target="_blank" rel="noreferrer" href="https://grammar.lingdocs.com/pronouns/pronouns-mini/">mini-pronoun</a>. 👶</div>
                            <div className="text-muted">(You can't shrink the king)</div>
                        </li>
                    </ul>
                    <p>Mnemonic for shortening phrases:</p>
                    <p className="text-muted">"🚫 Kill the king 👶 Shrink the servant"</p>
                </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-primary clb" onClick={() => setShowingKingExplanation(false)}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
        <Modal show={!!showingServantExplanation} onHide={() => setShowingServantExplanation(false)}>
            <Modal.Header closeButton>
            <Modal.Title>About the Servant {servantIcon}</Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <p>
                        In this tense/form, the {showingServantExplanation} is the <strong>servant</strong> {servantIcon} of the phrase. That means that:
                    </p>
                    <ul>
                        <li>
                            It does not affect the conjugation of the verb. That's the king's job.
                        </li>
                        <li>
                            <div>👍 It <strong>can</strong> shrink it into a <a target="_blank" rel="noreferrer" href="https://grammar.lingdocs.com/pronouns/pronouns-mini/">mini-pronoun</a>. 👶</div>
                            <div className="text-muted">(You can <strong>shrink the servant</strong>)</div>
                        </li>
                        <li>
                            <div>🙅‍♂️ It <strong>cannot</strong> be removed / left out of the phrase</div>
                            <div className="text-muted">(You can't kill the servant)</div>
                        </li>
                    </ul>
                    <p>Mnemonic for shortening phrases:</p>
                    <p className="text-muted">"🚫 Kill the king 👶 Shrink the servant"</p>
                </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-primary clb" onClick={() => setShowingServantExplanation(false)}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    </div>
}

export default VPExplorer;

function hasPronounConflict(subject: T.NPSelection | undefined, object: undefined | T.VerbObject): boolean {
    const subjPronoun = (subject && subject.type === "pronoun") ? subject : undefined;
    const objPronoun = (object && typeof object === "object" && object.type === "pronoun") ? object : undefined; 
    if (!subjPronoun || !objPronoun) return false;
    return isInvalidSubjObjCombo(subjPronoun.person, objPronoun.person);
}


