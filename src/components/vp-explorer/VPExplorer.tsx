import NPPicker from "../np-picker/NPPicker";
import VerbPicker from "./VerbPicker";
import TensePicker from "./TensePicker";
import VPDisplay from "./VPDisplay";
import ButtonSelect from "../ButtonSelect";
import * as T from "../../types";
import ChartDisplay from "./VPChartDisplay";
import useStickyState, { useStickyReducer } from "../../lib/useStickyState";
import { makeVPSelectionState } from "./verb-selection";
import { useEffect, useState } from "react";
import { getKingAndServant } from "../../lib/phrase-building/render-vp";
import { isPastTense } from "../../lib/phrase-building/vp-tools";
import VPExplorerQuiz from "./VPExplorerQuiz";
import VPExplorerExplanationModal, { roleIcon } from "./VPExplorerExplanationModal";
// @ts-ignore
import LZString from "lz-string";
import { vpsReducer } from "./vps-reducer";

const phraseURLParam = "VPPhrase";

// TODO: Issue with dynamic compounds english making with plurals
// TODO: Issue with "the money were taken"
// TODO: Use the same component for PronounPicker and NPPronounPicker (sizing issue)
// get the practice pronoun picker page into a typesafe file
// A little button you can press on the tense select to show the formula and info about the tense
// in a popup
// TODO: option to show 3 modes  Phrases - Charts - Quiz

// TODO: error handling on error with rendering etc

export function VPExplorer(props: {
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
        "vpsState8",    
    );
    const [mode, setMode] = useStickyState<"charts" | "phrases" | "quiz">(
        savedMode => {
            if (!savedMode) return "charts";
            if (savedMode === "quiz") return "phrases";
            return savedMode;
        },
        "verbExplorerMode2",
    );
    const [showShareClipped, setShowShareClipped] = useState<boolean>(false);
    const [showingExplanation, setShowingExplanation] = useState<{ role: "servant" | "king", item: "subject" | "object" } | false>(false);
    const isPast = isPastTense(vps.verb.tenseCategory === "perfect" ? vps.verb.perfectTense : vps.verb.verbTense);
    const roles = getKingAndServant(
        isPast,
        vps.verb.transitivity !== "intransitive",
    );
    useEffect(() => {
        const VPSFromUrl = getVPSFromUrl();
        if (VPSFromUrl) {
            adjustVps({
                type: "load vps",
                payload: VPSFromUrl
            });
        }
        // eslint-disable-next-line
    }, []);
    useEffect(() => {
        const newVps = makeVPSelectionState(props.verb, vps);
        adjustVps({
            type: "load vps",
            payload: newVps,
        });
        // eslint-disable-next-line
    }, [props.verb]);
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
    function handleShrinkPossesive(shrunkenPossesive: number | undefined) {
        adjustVps({
            type: "shrink possesive",
            payload: shrunkenPossesive,
        });
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
    function handleSetForm(form: T.FormVersion) {
        adjustVps({
            type: "set form",
            payload: form,
        });
    }
    // for some crazy reason I can't get the URI share thing to encode and decode properly
    function handleCopyShareLink() {
        const shareUrl = getShareUrl(vps);
        navigator.clipboard.writeText(shareUrl);
        setShowShareClipped(true);
        setTimeout(() => {
            setShowShareClipped(false);
        }, 1000);
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
            <div
                className="clickable"
                onClick={mode === "phrases" ? handleCopyShareLink : undefined}
                style={{ width: "1rem" }}
            >
                {mode === "phrases" ? <i className="fas fa-share-alt" /> : ""}
            </div>
        </div>
        {(vps.verb && (typeof vps.verb.object === "object") && (vps.verb.isCompound !== "dynamic") && (vps.verb.tenseCategory !== "imperative") &&(mode === "phrases")) &&
            <div className="text-center my-2">
                <button onClick={handleSubjObjSwap} className="btn btn-sm btn-light">
                    <i className="fas fa-exchange-alt mr-2" /> subj/obj
                </button>
            </div>}
        {mode !== "quiz" && <div className="d-flex flex-row justify-content-around flex-wrap" style={{ marginLeft: "-0.5rem", marginRight: "-0.5rem" }}>
            {mode === "phrases" && <>
                <div className="my-2">
                    <NPPicker
                        heading={roles.king === "subject" 
                            ? <div className="h5 text-center clickable" onClick={() => setShowingExplanation({ role: "king", item: "subject" })}>Subject {roleIcon.king}</div>
                            : <div className="h5 text-center clickable" onClick={() => setShowingExplanation({ role: "servant", item: "subject" })}>Subject {roleIcon.servant}</div>}
                        entryFeeder={props.entryFeeder}
                        role={(isPast && vps.verb.transitivity !== "intransitive")
                            ? "ergative"
                            : "subject"
                        }
                        shrunkenPossesiveInPhrase={vps.shrunkenPossesive}
                        is2ndPersonPicker={vps.verb.tenseCategory === "imperative"}
                        np={vps.subject}
                        counterPart={vps.verb ? vps.verb.object : undefined}
                        onChange={handleSubjectChange}
                        handleShrinkPossesive={handleShrinkPossesive}
                        opts={props.opts}
                    />
                </div>
                {vps.verb && (vps.verb.object !== "none") && <div className="my-2">
                    {(typeof vps.verb.object === "number")
                        ? <div className="text-muted">Unspoken 3rd Pers. Masc. Plur.</div>
                        : <NPPicker
                            shrunkenPossesiveInPhrase={vps.shrunkenPossesive}
                            handleShrinkPossesive={handleShrinkPossesive}
                            heading={roles.king === "object" 
                                ? <div className="h5 text-center clickable" onClick={() => setShowingExplanation({ role: "king", item: "object" })}>Object {roleIcon.king}</div>
                                : <div className="h5 text-center clickable" onClick={() => setShowingExplanation({ role: "servant", item: "object" })}>Object {roleIcon.servant}</div>}
                            entryFeeder={props.entryFeeder}
                            role="object"
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
                    onChange={quizLock(adjustVps)}
                    mode={mode}
                />
            </div>
        </div>}
        {mode === "phrases" && <VPDisplay
            VP={vps}
            opts={props.opts}
            setForm={handleSetForm}
        />}
        {mode === "charts" && <ChartDisplay VS={vps.verb} opts={props.opts} />}
        {mode === "quiz" && <VPExplorerQuiz opts={props.opts} vps={vps} />}
        <VPExplorerExplanationModal
            showing={showingExplanation}
            setShowing={setShowingExplanation}
        />
        {showShareClipped && <div className="alert alert-primary text-center" role="alert" style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999999999999,
        }}>
            Phrase URL copied to clipboard
        </div>}
    </div>
}

export default VPExplorer;

function getShareUrl(vps: T.VPSelectionState): string {
    const stringJSON = JSON.stringify(vps);
    const encoded = LZString.compressToEncodedURIComponent(stringJSON);
    const url = new URL(window.location.href);
    url.searchParams.append(phraseURLParam, encoded);
    return url.toString();
}

function getVPSFromUrl(): T.VPSelectionState | undefined {
    const params = new URLSearchParams(window.location.search);
    const fromParams = params.get(phraseURLParam);
    if (!fromParams) return;
    const decoded = LZString.decompressFromEncodedURIComponent(fromParams);
    return JSON.parse(decoded) as T.VPSelectionState;
}

