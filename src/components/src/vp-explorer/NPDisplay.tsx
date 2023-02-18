import * as T from "../../../types";
import ModeSelect, { Mode, ScriptSelect } from "../DisplayModeSelect";
import { useState } from "react";
import CompiledPTextDisplay from "../CompiledPTextDisplay";
import useStickyState from "../useStickyState";
import {
    getEnglishFromRendered,
    getPashtoFromRendered,
} from "../../../lib/src/phrase-building/np-tools";
import {
    renderNPSelection,
} from "../../../lib/src/phrase-building/render-np";
import { NPBlock } from "../blocks/Block";

function NPDisplay({ NP, inflected, opts, justify, onlyOne, mode: preferredMode, script: preferredScript }: {
    NP: T.NPSelection,
    opts: T.TextOptions,
    justify?: "left" | "right" | "center",
    onlyOne?: boolean | "concat",
    mode?: Mode,
    script?: "p" | "f",
    inflected: boolean,
}) {
    const [mode, setMode] = useState<Mode>(preferredMode || "text");
    const [script, setScript] = useStickyState<"p" | "f">(preferredScript || "f", "blockScriptChoice");
    const rendered = renderNPSelection(NP, inflected, false, "subject", "none", false);
    const english = getEnglishFromRendered(rendered);
    const pashto = getPashtoFromRendered(rendered, false);
    const result = {
        ps: pashto,
        e: [english || ""],
    };
    return <div className={`text-${justify ? justify : "center"} mt-1`}>
        <div className="d-flex flex-row mb-2 align-items-center">
            <ModeSelect value={mode} onChange={setMode} />
            {mode === "blocks" && <ScriptSelect value={script} onChange={setScript} />}
        </div>
        {mode === "text"
            ? <CompiledPTextDisplay opts={opts} compiled={result} justify={justify} onlyOne={!!onlyOne} />
            : <NPBlockDisplay opts={opts} np={rendered} justify={justify} script={script} />}
        {result.e && <div className={`text-muted mt-2 text-${justify === "left" ? "left" : justify === "right" ? "right" : "center"}`}>
            {onlyOne === "concat"
                ? result.e.join(" • ")
                : onlyOne
                ? [result.e[0]]
                : result.e.map((e, i) => <div key={i}>{e}</div>)}
        </div>}
    </div>
}

function NPBlockDisplay({ opts, np, justify, script }: {
    script: "p" | "f",
    opts: T.TextOptions,
    np: T.Rendered<T.NPSelection>,
    justify?: "left" | "right" | "center",
}) {
    return <div className={`d-flex flex-row justify-content-${justify ? justify : "center"}`}>
        <div className={`d-flex flex-row${script === "p" ? "-reverse" : ""} justify-content-left align-items-end mt-3 pb-2`} style={{ overflowX: "auto" }}>
            <NPBlock opts={opts} script={script}>{np}</NPBlock>
        </div>
    </div>
}

export default NPDisplay;