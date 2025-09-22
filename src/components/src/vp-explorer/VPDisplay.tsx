import { compileVP } from "../../../lib/src/phrase-building/compile";
import * as T from "../../../types";
import AbbreviationFormSelector from "./AbbreviationFormSelector";
import {
  getObjectSelection,
  getSubjectSelection,
} from "../../../lib/src/phrase-building/blocks-utils";
import { completeVPSelection } from "../../../lib/src/phrase-building/vp-tools";
import { renderVP } from "../../../lib/src/phrase-building/render-vp";
import ModeSelect, {
  LengthSelect,
  Mode,
  ScriptSelect,
} from "../selects/DisplayModeSelect";
import { useState } from "react";
import CompiledPTextDisplay from "../text-display/CompiledPTextDisplay";
import RenderedBlocksDisplay from "../blocks/RenderedBlocksDisplay";
import useStickyState from "../useStickyState";

function VPDisplay({
  VPS,
  opts,
  setForm,
  justify,
  onlyOne,
  length,
  mode: preferredMode,
  script: preferredScript,
  onLengthChange,
  inlineFormChoice,
}: {
  VPS: T.VPSelectionState;
  opts: T.TextOptions;
  setForm: "disable" | ((form: T.FormVersion) => void);
  justify?: "left" | "right" | "center";
  onlyOne?: boolean | "concat";
  length?: "long" | "short";
  mode?: Mode;
  script?: "p" | "f";
  onLengthChange?: (length: "long" | "short") => void;
  inlineFormChoice?: boolean;
}) {
  const [mode, setMode] = useState<Mode>(preferredMode || "text");
  const [script, setScript] = useStickyState<"p" | "f">(
    preferredScript || "f",
    "blockScriptChoice"
  );
  const VP = completeVPSelection(VPS);
  if (!VP) {
    return (
      <div className="lead text-muted text-center mt-4">
        {(() => {
          const subject = getSubjectSelection(VPS.blocks).selection;
          const object = getObjectSelection(VPS.blocks).selection;
          if (subject === undefined || object === undefined) {
            return `Choose NP${subject === undefined && object === undefined ? "s " : ""
              } to make a phrase`;
          }
          return `Choose/remove AP to complete the phrase`;
        })()}
      </div>
    );
  }
  try {
    const rendered = renderVP(VP);
    const result = compileVP(rendered, rendered.form, true);
    return (
      <div className={`text-${justify ? justify : "center"} mt-1`}>
        {typeof setForm === "function" && inlineFormChoice !== true && (
          <AbbreviationFormSelector
            adjustable={rendered.whatsAdjustable}
            form={rendered.form}
            onChange={setForm}
          />
        )}
        <div className="d-flex flex-row mb-2">
          <ModeSelect value={mode} onChange={setMode} />
          {mode === "blocks" && (
            <ScriptSelect value={script} onChange={setScript} />
          )}
          {mode === "text" &&
            length &&
            "long" in result.ps &&
            onLengthChange && (
              <LengthSelect value={length} onChange={onLengthChange} />
            )}
          {typeof setForm === "function" && inlineFormChoice === true && (
            <AbbreviationFormSelector
              adjustable={rendered.whatsAdjustable}
              form={rendered.form}
              onChange={setForm}
              inline
            />
          )}
        </div>
        {mode === "text" ? (
          <CompiledPTextDisplay
            opts={opts}
            compiled={result}
            justify={justify}
            onlyOne={onlyOne === true || onlyOne === "concat"}
            length={length}
          />
        ) : (
          <RenderedBlocksDisplay
            opts={opts}
            rendered={rendered}
            justify={justify}
            script={script}
          />
        )}
        {result.e && (
          <div
            className={`text-muted mt-2 text-${justify === "left"
              ? "left"
              : justify === "right"
                ? "right"
                : "center"
              }`}
          >
            {onlyOne === "concat"
              ? result.e.join(" • ")
              : onlyOne === true
                ? [result.e[0]]
                : result.e.map((e, i) => <div key={i}>{e}</div>)}
          </div>
        )}
      </div>
    );
  } catch (e) {
    console.error(e);
    return <h4>Error conjugating verb!</h4>;
  }
}

export default VPDisplay;
