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
import { useState } from "react";
import { completeEPSelection } from "../../lib/phrase-building/render-ep";
const blankEps: T.EPSelectionState = {
    subject: undefined,
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
    const [eps, adjustEps] = useStickyReducer(epsReducer, blankEps, "EPState2", flashMessage);
    const [alert, setAlert] = useState<string | undefined>(undefined);
    const king = eps.subject?.type === "pronoun"
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
        <div className="d-flex flex-row justify-content-around flex-wrap" style={{ marginLeft: "-0.5rem", marginRight: "-0.5rem" }}>
            {mode === "phrases" && <>
                <div className="my-2">
                    <NPPicker
                        phraseIsComplete={phraseIsComplete}
                        heading={<div className="h5 text-center">Subject {king === "subject" ? roleIcon.king : ""}</div>}
                        entryFeeder={props.entryFeeder}
                        np={eps.subject}
                        counterPart={undefined}
                        role="subject"
                        onChange={payload => adjustEps({ type: "set subject", payload })}
                        opts={props.opts}
                    />
                </div>
                <div className="my-2">
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
