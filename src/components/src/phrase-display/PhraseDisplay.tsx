import { useState } from "react";
import { dictionary } from "../../../lib/src/dictionary/dictionary";
import { parseVP } from "../../../lib/src/parsing/parse-vp";
import { tokenizer } from "../../../lib/src/parsing/tokenizer";
import * as T from "../../../types";
import { renderEP } from "../../../lib/src/phrase-building/render-ep";
import { renderVP } from "../../../lib/src/phrase-building/render-vp";
import { compileEP, compileVP, flattenLengths } from "../../../lib/src/phrase-building/compile";
import Examples from "../../../components/src/text-display/Examples";
import VPPicker from "../../../components/src/vp-explorer/VPPicker";
import ModeSelect, { Mode, ScriptSelect } from "../selects/DisplayModeSelect";
import RenderedBlocksDisplay from "../blocks/RenderedBlocksDisplay";
import { uncompleteVPSelection } from "../../../lib/src/phrase-building/vp-tools";
import useStickyState from "../useStickyState";
import EPPicker from "../ep-explorer/EPPicker";
import AbbreviationFormSelector from "../vp-explorer/AbbreviationFormSelector";
import epsReducer from "../../../lib/src/phrase-building/eps-reducer";
import { vpsReducer } from "../../library";

// TODO: REMOVE LIBRARY IMPORTS

export function NewPhraseDisplay({ opts, phrases, toMatch, entryFeeder, setPhrase }: {
  opts: T.TextOptions,
  phrases: string | (T.VPSelectionComplete | T.EPSelectionComplete)[],
  setPhrase: (phrase: T.VPSelectionState | T.EPSelectionState) => void,
  toMatch: string | undefined,
  entryFeeder: T.EntryFeeder,
  dictionary: T.DictionaryAPI,
}) {
  const phraseSelection = getPhraseSelection(phrases, dictionary);
  return phraseSelection.map(phrase => <MainPhraseDisplay
    phrase={phrase}
    opts={opts}
    toMatch={toMatch}
    entryFeeder={entryFeeder}
    setPhrase={setPhrase}
  />);
}

function getPhraseSelection(phrase: string | (T.VPSelectionComplete | T.EPSelectionComplete)[], dictionary: T.DictionaryAPI): (T.VPSelectionComplete | T.EPSelectionComplete)[] {
  if (typeof phrase === "string") {
    const tokens = tokenizer(phrase);
    const parsed = parseVP(tokens, dictionary);
    return parsed.filter(x => !x.errors.length).map(x => x.body);
  }
  return phrase;
}

function MainPhraseDisplay({ phrase, opts, toMatch, entryFeeder, setPhrase }: {
  entryFeeder: T.EntryFeeder,
  phrase: T.VPSelectionComplete | T.EPSelectionComplete,
  toMatch: string | undefined,
  opts: T.TextOptions,
  setPhrase: (phrase: T.VPSelectionState | T.EPSelectionState) => void,
}) {
  const [mode, setMode] = useStickyState<Mode>("text", "phrase-display-mode");
  const [editing, setEditing] = useState<boolean>(false);
  const [script, setScript] = useState<"p" | "f">("p");
  const rendered = "predicate" in phrase ? renderEP(phrase) : renderVP(phrase);
  const text = rendered.type === "EPRendered" ? compileEP(rendered) : compileVP(rendered, rendered.form);
  function handleSetForm(form: T.FormVersion) {
    if ("predicate" in phrase) {
      setPhrase(epsReducer(phrase, { type: "set omitSubject", payload: form.removeKing ? "true" : "false" }));
    } else {
      setPhrase(vpsReducer(entryFeeder)(uncompleteVPSelection(phrase), { type: "set form", payload: form }));
    }
  }
  return (
    <div className={`text-left mt-3`}>
      {(
        <div
          className="text-left clickable mb-2"
          style={{ marginBottom: editing ? "0.5rem" : "-0.5rem" }}
          onClick={
            editing
              ? () => {
                setEditing(false);
              }
              : () => {
                setEditing(true);
              }
          }
        >
          {!editing ? <i className="fas fa-edit" /> : <i className="fas fa-undo" />}
        </div>
      )}

      {editing && ("predicate" in phrase ? <EPPicker
        entryFeeder={entryFeeder}
        opts={opts}
        onChange={setPhrase}
        eps={phrase}
      />
        :
        <VPPicker
          opts={opts}
          entryFeeder={entryFeeder}
          vps={uncompleteVPSelection(phrase)}
          onChange={setPhrase}
        />
      )}
      <div className="d-flex flex-row my-2">
        <ModeSelect value={mode} onChange={setMode} />
        {mode === "blocks" && (
          <ScriptSelect value={script} onChange={setScript} />
        )}
        {editing && <AbbreviationFormSelector
          adjustable={rendered.type === "EPRendered" ? "king" : rendered.whatsAdjustable}
          form={rendered.type === "EPRendered" ? {
            shrinkServant: false,
            removeKing: rendered.omitSubject,
          } : rendered.form}
          onChange={handleSetForm}
          inline={true}
        />}
      </div>
      <div>
        {mode === "text" ? (
          <CompiledPTextDisplay
            opts={opts}
            text={text.ps}
            toMatch={toMatch}
          />
        ) :
          <RenderedBlocksDisplay
            opts={opts}
            rendered={rendered}
            justify={"left"}
            script={script}
          />
        }
      </div>
      <div className="d-flex flex-row">
        {text.e && (
          <div
            className={`text-muted mt-2 text-left`}
          >
            {text.e.map((e, i) => <div key={i}>{e}</div>)}
          </div>
        )}
      </div>
    </div>);
}

function CompiledPTextDisplay(props: {
  opts: T.TextOptions,
  text: T.SingleOrLengthOpts<T.PsString[]>,
  toMatch: string | undefined,
}) {
  const [showVars, setShowVars] = useState<boolean>(false);
  const flattened = flattenLengths(props.text);
  if (flattened.length === 0) {
    return null;
  }
  if (flattened.length === 1) {
    return <div className="mb-2 mt-2">
      <Examples opts={props.opts} lineHeight={0}>
        {flattened[0]}
      </Examples>
    </div>
  }
  const match = props.toMatch ? flattened.findIndex(x => x.p.replaceAll(" ", "") === props.toMatch?.replaceAll(" ", "")) : -1;
  // TODO: could do a more efficient thing than this
  const pss = match === -1 ? flattened : [flattened[match], ...flattened.filter((_, i) => i !== match)];
  return <div className="mt-2">
    <div className="d-flex flex-row align-items-center">
      <div className="mr-2 clickable" onClick={() => setShowVars(x => !x)}>{showVars ? caretDown : caretRight}</div>
      <div>
        <div className="mb-2">
          <Examples opts={props.opts} lineHeight={0}>
            {pss[0]}
          </Examples>
        </div>
      </div>
    </div>
    {showVars && pss.slice(1).map(ps => <div className="ml-4 mb-2">
      <Examples opts={props.opts} lineHeight={0}>
        {ps}
      </Examples>
    </div>)}
  </div>;
}

const caretRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-caret-right-fill"
    viewBox="0 0 16 16"
  >
    <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
  </svg>
);
const caretDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-caret-down-fill"
    viewBox="0 0 16 16"
  >
    <path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
  </svg>
);

