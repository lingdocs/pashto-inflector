import * as T from "../../types";
import useStickyState, { useStickyReducer } from "../../lib/useStickyState";
import NPPicker from "../np-picker/NPPicker";
import EquativePicker from "./EquativePicker";
import EPDisplay from "./EPDisplay";
import ButtonSelect from "../ButtonSelect";
import EqCompPicker from "./eq-comp-picker/EqCompPicker";
import { roleIcon } from "../vp-explorer/VPExplorerExplanationModal";
import EqChartsDisplay from "./EqChartsDisplay";
import epsReducer from "./eps-reducer";
import { useEffect, useRef, useState } from "react";
import { completeEPSelection } from "../../lib/phrase-building/render-ep";
import { makeEPSBlocks, getSubjectSelection } from "../../lib/phrase-building/blocks-utils";
import APPicker from "../ap-picker/APPicker";
import autoAnimate from "@formkit/auto-animate";
// @ts-ignore
import LZString from "lz-string";
const phraseURLParam = "EPhrase";

const blankEps: T.EPSelectionState = {
    blocks: makeEPSBlocks(),
    predicate: {
        type: "Complement",
        NP: undefined,
        Complement: undefined,
    },
    equative: {
        tense: "present",
        negative: false,
    },
    omitSubject: false,
};

// TODO: put the clear button beside the title in the predicate picker?

function EPExplorer(props: {
    opts: T.TextOptions,
    entryFeeder: T.EntryFeeder,
}) {
    const [mode, setMode] = useStickyState<"charts" | "phrases">("charts", "EPExplorerMode");
    const [eps, adjustEps] = useStickyReducer(epsReducer, blankEps, "EPState4", flashMessage);
    const [alert, setAlert] = useState<string | undefined>(undefined);
    const [showClipped, setShowClipped] = useState<string>("");
    const parent = useRef<HTMLDivElement>(null);
    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);
    useEffect(() => {
        const EPSFromUrl = getEPSFromUrl();
        if (EPSFromUrl) {
            setMode("phrases");
            adjustEps({
                type: "load EPS",
                payload: EPSFromUrl,
            });
        }
        // eslint-disable-next-line
    }, []);
    const subject = getSubjectSelection(eps.blocks).selection;
    const king = subject?.type === "pronoun"
        ? "subject"
        : eps.predicate.type === "Complement"
        ? "subject"
        : "predicate";
    function flashMessage(msg: string) {
        setAlert(msg);
        setTimeout(() => {
            setAlert(undefined);
        }, 1500);
    }
    function flashClippedMessage(m: string) {
        setShowClipped(m);
        setTimeout(() => {
            setShowClipped("");
        }, 1250);
    }
    function handleCopyCode() {
        const code = getCode(eps);
        navigator.clipboard.writeText(code);
        flashClippedMessage("Copied phrase code to clipboard");
    }
    function handleCopyShareLink() {
        const shareUrl = getShareUrl(eps);
        navigator.clipboard.writeText(shareUrl);
        flashClippedMessage("Copied phrase URL to clipboard");
    }
    const phraseIsComplete = !!completeEPSelection(eps);
    return <div>
        <div className="mt-2 mb-3 d-flex flex-row justify-content-between align-items-center">
            <div />
            <ButtonSelect
                value={mode}
                options={[
                    { label: "Charts", value: "charts" },
                    { label: "Phrases", value: "phrases" },
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
        {mode === "phrases" && <div className="clickable h5" onClick={() => adjustEps({ type: "insert new AP" })}>+ AP</div>}
        <div ref={parent} className="d-flex flex-row justify-content-around flex-wrap" style={{ marginLeft: "-0.5rem", marginRight: "-0.5rem" }}>
            {mode === "phrases" && <>
                {eps.blocks.map(({ block, key }, i) => (
                    <div className="my-2 card block-card p-1 mx-1" key={key}>
                        <div className="d-flex flex-row justify-content-between mb-1" style={{ height: "1rem" }}>
                            {i > 0 ? <div
                                className="small clickable ml-1"
                                onClick={() => adjustEps({ type: "shift block", payload: { index: i, direction: "back" }})}
                            >
                                <i className="fas fa-chevron-left" />
                            </div> : <div/>}
                            {i < eps.blocks.length - 1 ? <div
                                className="small clickable mr-1"
                                onClick={() => adjustEps({ type: "shift block", payload: { index: i, direction: "forward" }})}
                            >
                                <i className="fas fa-chevron-right" />
                            </div> : <div/>}
                        </div>
                        {block && block.type === "subjectSelection"
                            ? <NPPicker
                                phraseIsComplete={phraseIsComplete}
                                heading={<div className="h5 text-center">Subject {king === "subject" ? roleIcon.king : ""}</div>}
                                entryFeeder={props.entryFeeder}
                                np={block.selection}
                                counterPart={undefined}
                                role="subject"
                                onChange={payload => adjustEps({ type: "set subject", payload })}
                                opts={props.opts}
                            />
                        : <APPicker
                            phraseIsComplete={phraseIsComplete}
                            heading="AP"
                            entryFeeder={props.entryFeeder}
                            AP={block}
                            opts={props.opts}
                            onChange={AP => adjustEps({ type: "set AP", payload: { index: i, AP } })}
                            onRemove={() => adjustEps({ type: "remove AP", payload: i })}
                        />}
                    </div>
                ))}
                <div className="my-2 card block-card p-1">
                    <div className="h5 text-center">Predicate {king === "predicate" ? roleIcon.king : ""}</div>
                    <div className="mb-2 text-center">
                        <ButtonSelect
                            small
                            options={[
                                { value: "NP", label: "NP" },
                                { value: "Complement", label: "Complement" },
                            ]}
                            value={eps.predicate.type}
                            handleChange={payload => adjustEps({ type: "set predicate type", payload })}
                        />
                    </div>
                    {eps.predicate.type === "NP" ? <NPPicker
                        phraseIsComplete={phraseIsComplete}
                        entryFeeder={props.entryFeeder}
                        np={eps.predicate.type === "NP" ? eps.predicate.NP : undefined}
                        counterPart={undefined}
                        role="subject"
                        onChange={payload => adjustEps({ type: "set predicate NP", payload })}
                        opts={props.opts}
                    /> : <EqCompPicker
                        phraseIsComplete={phraseIsComplete}
                        comp={eps.predicate.type === "Complement" ? eps.predicate.Complement : undefined}
                        onChange={payload => adjustEps({ type: "set predicate comp", payload })}
                        opts={props.opts}
                        entryFeeder={props.entryFeeder}
                    />}
                </div>
            </>}
            <div className="my-2">
                <div className="h5 text-center clickable">Equative</div>
                <EquativePicker
                    equative={eps.equative}
                    onChange={payload => adjustEps({ type: "set equative", payload })}
                    hideNegative={mode === "charts"}
                />
            </div>
        </div>
        {mode === "charts" && <EqChartsDisplay tense={eps.equative.tense} opts={props.opts} />}
        {mode === "phrases" && <EPDisplay
            opts={props.opts}
            eps={eps}
            setOmitSubject={payload => adjustEps({ type: "set omitSubject", payload })}
        />}
        {alert && <div className="alert alert-warning text-center" role="alert" style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999999999999,
        }}>
            {alert}
        </div>}
        {showClipped && <div className="alert alert-primary text-center" role="alert" style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999999999999,
        }}>
            {showClipped}
        </div>}
    </div>;
}

export default EPExplorer;

function getShareUrl(eps: T.EPSelectionState): string {
    const code = getCode(eps);
    const encoded = LZString.compressToEncodedURIComponent(code);
    const url = new URL(window.location.href);
    // need to delete or else you could just get a second param written after
    // which gets ignored
    url.searchParams.delete(phraseURLParam);
    url.searchParams.append(phraseURLParam, encoded);
    return url.toString();
}

function getCode(eps: T.EPSelectionState): string {
    return JSON.stringify(eps);
}

function getEPSFromUrl(): T.EPSelectionState | undefined {
    const params = new URLSearchParams(window.location.search);
    const fromParams = params.get(phraseURLParam);
    if (!fromParams) return;
    const decoded = LZString.decompressFromEncodedURIComponent(fromParams);
    return JSON.parse(decoded) as T.EPSelectionState;
}
