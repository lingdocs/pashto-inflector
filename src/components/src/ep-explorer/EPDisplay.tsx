import * as T from "../../../types";
import {
  completeEPSelection,
  renderEP,
} from "../../../lib/src/phrase-building/render-ep";
import { compileEP } from "../../../lib/src/phrase-building/compile";
import ButtonSelect from "../selects/ButtonSelect";
import {
  getPredicateBlock,
  getSubjectSelection,
  getSubjectSelectionFromBlocks,
} from "../../../lib/src/phrase-building/blocks-utils";
import { useState } from "react";
import CompiledPTextDisplay from "../text-display/CompiledPTextDisplay";
import EPBlocksDisplay from "../blocks/RenderedBlocksDisplay";
import ModeSelect, { Mode, ScriptSelect } from "../selects/DisplayModeSelect";
import useStickyState from "../useStickyState";

function EPDisplay({
  eps,
  opts,
  setOmitSubject,
  justify,
  onlyOne,
  length,
  mode: preferredMode,
  script: preferredScript,
}: {
  eps: T.EPSelectionState;
  opts: T.TextOptions;
  setOmitSubject: ((value: "true" | "false") => void) | false;
  justify?: "left" | "right" | "center";
  onlyOne?: boolean | "concat";
  length?: "long" | "short";
  mode?: Mode;
  script?: "p" | "f";
}) {
  const [mode, setMode] = useState<Mode>(preferredMode || "text");
  const [script, setScript] = useStickyState<"p" | "f">(
    preferredScript || "f",
    "blockScriptChoice"
  );
  const EP = completeEPSelection(eps);
  const subject = getSubjectSelection(eps.blocks);

  if (!EP) {
    return (
      <div className="lead text-center my-4">
        {!subject && !eps.predicate
          ? "Select Subject and Predicate"
          : subject && !eps.predicate
          ? "Select Predicate"
          : !subject && eps.predicate
          ? "Select Subject"
          : ""}
      </div>
    );
  }
  const rendered = renderEP(EP);
  const result = compileEP(rendered);
  const renderedSubject = getSubjectSelectionFromBlocks(
    rendered.blocks
  ).selection;
  const renderedPredicate = getPredicateBlock(rendered.blocks).selection;
  return (
    <div className="text-center pt-3">
      <div className="mb-2 d-flex flex-row justify-content-between align-items-center">
        <div className="d-flex flex-row">
          <ModeSelect value={mode} onChange={setMode} />
          {mode === "blocks" && (
            <ScriptSelect value={script} onChange={setScript} />
          )}
        </div>
        {setOmitSubject !== false ? (
          <ButtonSelect
            small
            value={(eps.omitSubject ? "true" : "false") as "true" | "false"}
            options={[
              { value: "false", label: "Full" },
              { value: "true", label: "No Subj." },
            ]}
            handleChange={setOmitSubject}
          />
        ) : (
          <div />
        )}
        <div />
      </div>
      {mode === "text" ? (
        <CompiledPTextDisplay
          opts={opts}
          compiled={result}
          justify={justify}
          onlyOne={!!onlyOne}
          length={length || "short"}
        />
      ) : (
        <EPBlocksDisplay
          opts={opts}
          rendered={rendered}
          justify={justify}
          script={script}
        />
      )}
      {result.e && (
        <div
          className={`text-muted mt-2 text-${
            justify === "left"
              ? "left"
              : justify === "right"
              ? "right"
              : "center"
          }`}
        >
          {onlyOne === "concat"
            ? result.e.join(" • ")
            : onlyOne
            ? [result.e[0]]
            : result.e.map((e, i) => <div key={i}>{e}</div>)}
        </div>
      )}
      {EP.predicate.selection.type === "NP" &&
        EP.predicate.selection.selection.type === "participle" && (
          <div
            style={{ maxWidth: "6 00px", margin: "0 auto" }}
            className="alert alert-warning mt-3 pt-4"
          >
            <p>
              ⚠️ NOTE: This means that the subject{" "}
              {renderedSubject.selection.e
                ? `(${renderedSubject.selection.e})`
                : ""}{" "}
              is <strong>the action/idea</strong> of
              {` `}"
              {"e" in renderedPredicate.selection
                ? renderedPredicate.selection?.e
                : "the particple"}
              ".
            </p>
            <p>
              It <strong>does not</strong> mean that the subject is doing the
              action, which is what the transaltion sounds like in English.
            </p>
          </div>
        )}
    </div>
  );
}

export default EPDisplay;
