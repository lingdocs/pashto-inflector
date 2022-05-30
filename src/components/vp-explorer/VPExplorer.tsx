import NPPicker, { shrunkenBackground } from "../np-picker/NPPicker";
import VerbPicker from "./VerbPicker";
import TensePicker from "./TensePicker";
import VPDisplay from "./VPDisplay";
import ButtonSelect from "../ButtonSelect";
import * as T from "../../types";
import ChartDisplay from "./VPChartDisplay";
import useStickyState, { useStickyReducer } from "../../lib/useStickyState";
import { makeVPSelectionState } from "./verb-selection";
import { useEffect, useRef, useState } from "react";
import { getKingAndServant, renderVP } from "../../lib/phrase-building/render-vp";
import { completeVPSelection, isPastTense } from "../../lib/phrase-building/vp-tools";
import VPExplorerQuiz from "./VPExplorerQuiz";
import VPExplorerExplanationModal, { roleIcon } from "./VPExplorerExplanationModal";
// @ts-ignore
import LZString from "lz-string";
import { vpsReducer } from "./vps-reducer";
import { getShrunkenServant } from "../../lib/phrase-building/compile";
import APPicker from "../ap-picker/APPicker";
import autoAnimate from "@formkit/auto-animate";
import { getObjectSelection, getSubjectSelection, isNoObject } from "../../lib/phrase-building/blocks-utils";

const phraseURLParam = "VPhrase";

// TODO: Issue with dynamic compounds english making with plurals
// TODO: Issue with "the money were taken"
// TODO: Use the same component for PronounPicker and NPPronounPicker (sizing issue)
// get the practice pronoun picker page into a typesafe file
// A little button you can press on the tense select to show the formula and info about the tense
// in a popup
// TODO: option to show 3 modes  Phrases - Charts - Quiz

// TODO: error handling on error with rendering etc

function VPExplorer(props: {
    loaded?: T.VPSelectionState,
    verb: T.VerbEntry,
    opts: T.TextOptions,
    handleLinkClick: ((ts: number) => void) | "none",
    entryFeeder: T.EntryFeeder,
}) {
    const [vps, adjustVps] = useStickyReducer(
        vpsReducer,
        props.loaded
            ? props.loaded
            : savedVps => makeVPSelectionState(props.verb, savedVps),
        "vpsState12",
        flashMessage,    
    );
    const [mode, setMode] = useStickyState<"charts" | "phrases" | "quiz">(
        savedMode => {
            if (!savedMode) return "charts";
            if (savedMode === "quiz") return "phrases";
            return savedMode;
        },
        "verbExplorerMode2",
    );
    const [showClipped, setShowClipped] = useState<string>("");
    const [alert, setAlert] = useState<string | undefined>(undefined);
    const [showingExplanation, setShowingExplanation] = useState<{ role: "servant" | "king", item: "subject" | "object" } | false>(false);
    const parent = useRef<HTMLDivElement>(null);
    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);
    const isPast = isPastTense(vps.verb.tenseCategory === "perfect" ? vps.verb.perfectTense : vps.verb.verbTense);
    const roles = getKingAndServant(
        isPast,
        vps.verb.transitivity !== "intransitive",
    );
    function flashMessage(msg: string) {
        setAlert(msg);
        setTimeout(() => {
            setAlert(undefined);
        }, 1500);
    }
    useEffect(() => {
        adjustVps({
            type: "set verb",
            payload: props.verb,
        });
        // eslint-disable-next-line
    }, [props.verb]);
    useEffect(() => {
        const VPSFromUrl = getVPSFromUrl();
        if (VPSFromUrl) {
            setMode("phrases");
            adjustVps({
                type: "load vps",
                payload: VPSFromUrl
            });
        }
        // eslint-disable-next-line
    }, []);
    function handleSubjectChange(subject: T.NPSelection | undefined, skipPronounConflictCheck?: boolean) {
        adjustVps({
            type: "set subject",
            payload: { subject, skipPronounConflictCheck },
        });
    }
    function handleObjectChange(object: T.NPSelection | undefined) {
        adjustVps({
            type: "set object",
            payload: object,
        });
    }
    function handleSubjObjSwap() {
        adjustVps({ type: "swap subj/obj" });
    }
    function quizLock<T>(f: T) {
        if (mode === "quiz") {
            return () => {
                flashMessage("to adjust this, get out of quiz mode");
                return null;
            };
        }
        return f;
    }
    function handleSetForm(form: T.FormVersion) {
        adjustVps({
            type: "set form",
            payload: form,
        });
    }
    function flashClippedMessage(m: string) {
        setShowClipped(m);
        setTimeout(() => {
            setShowClipped("");
        }, 1250);
    }
    // for some crazy reason I can't get the URI share thing to encode and decode properly
    function handleCopyShareLink() {
        const shareUrl = getShareUrl(vps);
        navigator.clipboard.writeText(shareUrl);
        flashClippedMessage("Copied phrase URL to clipboard");
    }
    function handleCopyCode() {
        const code = getCode(vps);
        navigator.clipboard.writeText(code);
        flashClippedMessage("Copied phrase code to clipboard");
    }
    const object = getObjectSelection(vps.blocks).selection;
    const subject = getSubjectSelection(vps.blocks).selection;
    const VPS = completeVPSelection(vps);
    const phraseIsComplete = !!VPS;
    const rendered = VPS ? renderVP(VPS) : undefined;
    const servantIsShrunk = !!(rendered ? getShrunkenServant(rendered) : undefined);
    function toggleServantShrink() {
        adjustVps({
            type: "toggle servant shrink",
        });
    }
    return <div className="mt-3" style={{ maxWidth: "950px"}}>
        <VerbPicker
            vps={vps}
            onChange={quizLock(adjustVps)}
            opts={props.opts}
            handleLinkClick={props.handleLinkClick}
        />
        <div className="mt-2 mb-3 d-flex flex-row justify-content-between align-items-center">
            <div style={{ width: "1rem" }}>
            </div>
            <ButtonSelect
                value={mode}
                options={[
                    { label: "Charts", value: "charts" },
                    { label: "Phrases", value: "phrases" },
                    { label: "Quiz", value: "quiz" },
                ]}
                handleChange={setMode}
            />
            <div className="d-flex flex-row">
                <div
                    className="clickable mr-4"
                    onClick={mode === "phrases" ? handleCopyCode : undefined}
                    style={{ width: "1rem" }}
                >
                    {(mode === "phrases" && phraseIsComplete) ? <i className="fas fa-code" /> : ""}
                </div>
                <div
                    className="clickable"
                    onClick={mode === "phrases" ? handleCopyShareLink : undefined}
                    style={{ width: "1rem" }}
                >
                    {mode === "phrases" ? <i className="fas fa-share-alt" /> : ""}
                </div>
            </div>
        </div>
        {(vps.verb && (typeof object === "object") && (vps.verb.isCompound !== "dynamic") && (vps.verb.tenseCategory !== "imperative") &&(mode === "phrases")) &&
            <div className="text-center my-2">
                <button onClick={handleSubjObjSwap} className="btn btn-sm btn-light">
                    <i className="fas fa-exchange-alt mr-2" /> subj/obj
                </button>
            </div>}
        {mode === "phrases" && <div className="clickable h5" onClick={() => adjustVps({ type: "insert new AP" })}>+ AP</div>}
        {mode !== "quiz" && <div ref={parent} className="d-flex flex-row justify-content-around flex-wrap" style={{ marginLeft: "-0.5rem", marginRight: "-0.5rem" }}>
            {mode === "phrases" && <>
                {vps.blocks.map(({ block, key }, i, blocks) => {
                    if (isNoObject(block)) return null;
                    return <div className="my-2 card block-card p-1 mx-1" key={key} style={{
                        background: (servantIsShrunk && (
                            (roles.servant === "subject" && block?.type === "subjectSelection")
                            ||
                            (roles.servant === "object" && block?.type === "objectSelection")
                        )) ? shrunkenBackground : "inherit",
                    }}>
                        <div className="d-flex flex-row justify-content-between mb-1" style={{ height: "1rem" }}>
                            {(i > 0 && !isNoObject(blocks[i - 1].block)) ? <div
                                className="small clickable ml-1"
                                onClick={() => adjustVps({ type: "shift block", payload: { index: i, direction: "back" }})}
                            >
                                <i className="fas fa-chevron-left" />
                            </div> : <div/>}
                            {(i < vps.blocks.length - 1 && !isNoObject(blocks[i + 1].block)) ? <div
                                className="small clickable mr-1"
                                onClick={() => adjustVps({ type: "shift block", payload: { index: i, direction: "forward" }})}
                            >
                                <i className="fas fa-chevron-right" />
                            </div> : <div/>}
                        </div>
                        {(!block || block.type === "adverb" || block.type === "sandwich")
                            ? <APPicker
                                phraseIsComplete={phraseIsComplete}
                                heading="AP"
                                entryFeeder={props.entryFeeder}
                                AP={block}
                                opts={props.opts}
                                onChange={AP => adjustVps({ type: "set AP", payload: { index: i, AP } })}
                                onRemove={() => adjustVps({ type: "remove AP", payload: i })}
                            />
                            : (block?.type === "subjectSelection")
                            ? <NPPicker
                                phraseIsComplete={phraseIsComplete}
                                heading={roles.king === "subject" 
                                ? <div className="h5 text-center" onClick={() => setShowingExplanation({ role: "king", item: "subject" })}>Subject {roleIcon.king}</div>
                                : <div className="h5 text-center">
                                    Subject
                                    {` `}
                                    <span className="clickable" onClick={() => setShowingExplanation({ role: "servant", item: "subject" })}>{roleIcon.servant}</span>
                                    {` `}
                                    {(rendered && rendered.whatsAdjustable !== "king") && 
                                        <span onClick={toggleServantShrink} className="mx-2 clickable">
                                            {!servantIsShrunk ? "🪄" : "👶"}
                                        </span>
                                    }
                                </div>}
                                entryFeeder={props.entryFeeder}
                                np={block.selection}
                                counterPart={vps.verb ? object : undefined}
                                role={(isPast && vps.verb.transitivity !== "intransitive")
                                    ? "ergative"
                                    : "subject"
                                }
                                onChange={handleSubjectChange}
                                opts={props.opts}
                                isShrunk={(servantIsShrunk && roles.servant === "subject")}
                            />
                            : (vps.verb && block?.type === "objectSelection" && block.selection !== "none")
                            ? <div className="my-2" style={{ background: (servantIsShrunk && roles.servant === "object") ? shrunkenBackground : "inherit" }}>
                                {(typeof block.selection === "number")
                                    ? <div className="text-muted">Unspoken 3rd Pers. Masc. Plur.</div>
                                    : <NPPicker
                                        phraseIsComplete={phraseIsComplete}
                                        heading={roles.king === "object" 
                                            ? <div className="h5 text-center clickable" onClick={() => setShowingExplanation({ role: "king", item: "object" })}>Object {roleIcon.king}</div>
                                            : <div className="h5 text-center">
                                                Object
                                                {` `}
                                                <span className="clickable" onClick={() => setShowingExplanation({ role: "servant", item: "object" })}>{roleIcon.servant}</span>
                                                {` `}
                                                {(rendered && rendered.whatsAdjustable !== "king") && 
                                                    <span onClick={toggleServantShrink} className="mx-2 clickable">
                                                        {!servantIsShrunk ? "🪄" : "👶"}
                                                    </span>
                                                }
                                            </div>}
                                        entryFeeder={props.entryFeeder}
                                        role="object"
                                        np={block.selection}
                                        counterPart={subject}
                                        onChange={handleObjectChange}
                                        opts={props.opts}
                                        isShrunk={(servantIsShrunk && roles.servant === "object")}
                                    />}
                            </div>
                            : null}
                    </div>;
                })}
            </>}
            <div className="my-2">
                <TensePicker
                    vps={vps}
                    onChange={quizLock(adjustVps)}
                    mode={mode}
                />
            </div>
        </div>}
        {mode === "phrases" && <VPDisplay
            VP={rendered ? rendered : vps}
            opts={props.opts}
            setForm={handleSetForm}
        />}
        {mode === "charts" && <ChartDisplay VS={vps.verb} opts={props.opts} />}
        {mode === "quiz" && <VPExplorerQuiz opts={props.opts} vps={vps} />}
        <VPExplorerExplanationModal
            showing={showingExplanation}
            setShowing={setShowingExplanation}
        />
        {showClipped && <div className="alert alert-primary text-center" role="alert" style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999999999999,
        }}>
            {showClipped}
        </div>}
        {alert && <div className="alert alert-warning text-center" role="alert" style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999999999999,
        }}>
            {alert}
        </div>}
    </div>
}

export default VPExplorer;

function getShareUrl(vps: T.VPSelectionState): string {
    const code = getCode(vps);
    const encoded = LZString.compressToEncodedURIComponent(code);
    const url = new URL(window.location.href);
    // need to delete or else you could just get a second param written after
    // which gets ignored
    url.searchParams.delete(phraseURLParam);
    url.searchParams.append(phraseURLParam, encoded);
    return url.toString();
}

function getCode(vps: T.VPSelectionState): string {
    return JSON.stringify(vps);
}

function getVPSFromUrl(): T.VPSelectionState | undefined {
    const params = new URLSearchParams(window.location.search);
    const fromParams = params.get(phraseURLParam);
    if (!fromParams) return;
    const decoded = LZString.decompressFromEncodedURIComponent(fromParams);
    return JSON.parse(decoded) as T.VPSelectionState;
}

