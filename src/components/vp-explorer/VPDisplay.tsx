import { compileVP } from "../../lib/phrase-building/compile";
import * as T from "../../types";
import AbbreviationFormSelector from "./AbbreviationFormSelector";
import { getObjectSelection, getSubjectSelection } from "../../lib/phrase-building/blocks-utils";
import { completeVPSelection } from "../../lib/phrase-building/vp-tools";
import { renderVP } from "../../library";
import ModeSelect, { Mode, ScriptSelect } from "../DisplayModeSelect";
import { useState } from "react";
import CompiledPTextDisplay from "../CompiledPTextDisplay";
import RenderedBlocksDisplay from "../RenderedBlocksDisplay";
import useStickyState from "../../lib/useStickyState";

function VPDisplay({ VPS, opts, setForm, justify, onlyOne }: {
    VPS: T.VPSelectionState,
    opts: T.TextOptions,
    setForm: (form: T.FormVersion) => void,
    justify?: "left" | "right" | "center",
    onlyOne?: boolean,
}) {
    const [mode, setMode] = useState<Mode>("text");
    const [script, setScript] = useStickyState<"p" | "f">("f", "blockScriptChoice");
    const VP = completeVPSelection(VPS);
    if (!VP) {
        return <div className="lead text-muted text-center mt-4">
            {(() => {
                const subject = getSubjectSelection(VPS.blocks).selection;
                const object = getObjectSelection(VPS.blocks).selection;
                if (subject === undefined || object === undefined) {
                    return `Choose NP${((subject === undefined) && (object === undefined)) ? "s " : ""} to make a phrase`;
                }
                return `Choose/remove AP to complete the phrase`; 
            })()}
        </div>;
    }
    const rendered = renderVP(VP);
    const result = compileVP(rendered, rendered.form);
    return <div className="text-center mt-1">
        <AbbreviationFormSelector
            adjustable={rendered.whatsAdjustable}
            form={rendered.form}
            onChange={setForm}
        />
        <div className="d-flex flex-row">
            <ModeSelect value={mode} onChange={setMode} />
            {mode === "blocks" && <ScriptSelect value={script} onChange={setScript} />}
        </div>
        {mode === "text"
            ? <CompiledPTextDisplay opts={opts} compiled={result} justify={justify} onlyOne={onlyOne} />
            : <RenderedBlocksDisplay opts={opts} rendered={rendered} justify={justify} script={script} />}
        {result.e && <div className="text-muted mt-3">
            {result.e.map((e, i) => <div key={i}>{e}</div>)}
        </div>}
    </div>
}

export default VPDisplay;