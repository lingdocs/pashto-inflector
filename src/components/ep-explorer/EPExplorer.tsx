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
    const parent = useRef<HTMLDivElement>(null);
    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);
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
    const phraseIsComplete = !!completeEPSelection(eps);
    return <div>
        <div className="mt-2 mb-3 text-center">
            <ButtonSelect
                value={mode}
                options={[
                    { label: "Charts", value: "charts" },
                    { label: "Phrases", value: "phrases" },
                ]}
                handleChange={setMode}
            />
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
    </div>;
}

export default EPExplorer;
