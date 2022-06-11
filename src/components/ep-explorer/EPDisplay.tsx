import * as T from "../../types";
import { completeEPSelection, renderEP } from "../../lib/phrase-building/render-ep";
import { compileEP } from "../../lib/phrase-building/compile";
import ButtonSelect from "../ButtonSelect";
import { getPredicateSelectionFromBlocks, getSubjectSelection, getSubjectSelectionFromBlocks } from "../../lib/phrase-building/blocks-utils";
import { useState } from "react";
import EPTextDisplay from "./EPTextDisplay";
import EPBlocksDisplay from "./EPBlocksDisplay";
type Mode = "text" | "blocks";

function EPDisplay({ eps, opts, setOmitSubject }: {
    eps: T.EPSelectionState,
    opts: T.TextOptions,
    setOmitSubject: (value: "true" | "false") => void,
}) {
    const [mode, setMode] = useState<Mode>("text");
    const EP = completeEPSelection(eps);
    const subject = getSubjectSelection(eps.blocks);

    if (!EP) {
        return <div className="lead text-center my-4">
            {(!subject && !eps.predicate[eps.predicate.type])
                ? "Select Subject and Predicate"
                : (subject && !eps.predicate[eps.predicate.type])
                ? "Select Predicate"
                : (!subject && eps.predicate[eps.predicate.type])
                ? "Select Subject"
                : ""}
        </div>
    }
    const rendered = renderEP(EP);
    const result = compileEP(rendered);
    const renderedSubject = getSubjectSelectionFromBlocks(rendered.blocks).selection;
    const renderedPredicate = getPredicateSelectionFromBlocks(rendered.blocks).selection;
    return <div className="text-center pt-3">
        <div className="mb-2 d-flex flex-row justify-content-between align-items-center">
            <ModeSelect value={mode} onChange={setMode} />
            <ButtonSelect
                small
                value={(eps.omitSubject ? "true" : "false") as "true" | "false"}
                options={[
                    { value: "false", label: "Full"},
                    { value: "true", label: "No Subj."},
                ]}
                handleChange={setOmitSubject}
            />
            <div />
        </div>
        {mode === "text"
            ? <EPTextDisplay opts={opts} compiled={result} />
            : <EPBlocksDisplay opts={opts} rendered={rendered} />}
        {result.e && <div className="text-muted mt-3">
            {result.e.map((e, i) => <div key={i}>{e}</div>)}
        </div>}
        {EP.predicate.selection.selection.type === "participle" && <div style={{ maxWidth: "6 00px", margin: "0 auto" }} className="alert alert-warning mt-3 pt-4">
            <p>⚠️ NOTE: This means that the subject {renderedSubject.selection.e ? `(${renderedSubject.selection.e})` : ""} is <strong>the action/idea</strong> of
            {` `}
            "{renderedPredicate.selection.e ? renderedPredicate.selection.e : "the particple"}".</p>
            <p>It <strong>does not</strong> mean that the subject is doing the action, which is what the transaltion sounds like in English.</p>
        </div>}
    </div>
}

function ModeSelect({ value, onChange }: { value: Mode, onChange: (m: Mode) => void }) {
    return <div style={{ fontSize: "larger" }}>
        {value === "text" ? <div className="clickable" onClick={() => onChange("blocks")}>
            <i className="fas fa-cubes" />
        </div> : <div className="clickable" onClick={() => onChange("text")}>
            <i className="fas fa-align-left" />
        </div>}
    </div>;
}

export default EPDisplay;