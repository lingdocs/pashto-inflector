import { useState } from "react";
import { dictionary } from "../../../lib/src/dictionary/dictionary";
import { parseVP } from "../../../lib/src/parsing/parse-vp";
import { tokenizer } from "../../../lib/src/parsing/tokenizer";
import * as T from "../../../types";
import { renderEP } from "../../../lib/src/phrase-building/render-ep";
import { renderVP } from "../../../lib/src/phrase-building/render-vp";
import { compileEP, compileVP, Examples, flattenLengths } from "../../library";
import ModeSelect, { Mode, ScriptSelect } from "../selects/DisplayModeSelect";
import RenderedBlocksDisplay from "../blocks/RenderedBlocksDisplay";

export function NewPhraseDisplay({ opts, phrases, toMatch }: {
  opts: T.TextOptions,
  phrases: string | (T.VPSelectionComplete | T.EPSelectionComplete)[],
  toMatch: string | undefined,
  dictionary: T.DictionaryAPI,
}) {
  const phraseSelection = getPhraseSelection(phrases, dictionary);
  return <MainPhraseDisplay phrases={phraseSelection} opts={opts} toMatch={toMatch} />;
}

function getPhraseSelection(phrase: string | (T.VPSelectionComplete | T.EPSelectionComplete)[], dictionary: T.DictionaryAPI): (T.VPSelectionComplete | T.EPSelectionComplete)[] {
  if (typeof phrase === "string") {
    const tokens = tokenizer(phrase);
    const parsed = parseVP(tokens, dictionary);
    return parsed.filter(x => !x.errors.length).map(x => x.body);
  }
  return phrase;
}

function MainPhraseDisplay({ phrases, opts, toMatch }: {
  phrases: (T.VPSelectionComplete | T.EPSelectionComplete)[],
  toMatch: string | undefined,
  opts: T.TextOptions,
}) {
  const [chosen, setChosen] = useState<number>(0);
  const [mode, setMode] = useState<Mode>("text")
  const [script, setScript] = useState<"p" | "f">("p");
  if (phrases.length === 0) {
    return [];
  }
  const phrase = phrases[chosen];
  const rendered = "predicate" in phrase ? renderEP(phrase) : renderVP(phrase);
  const text = rendered.type === "EPRendered" ? compileEP(rendered) : compileVP(rendered, rendered.form);
  function moveChosenBack() {
    setChosen(o => {
      if (o === 0) {
        return phrases.length - 1;
      }
      return (o - 1);
    })
  }
  function moveChosenForward() {
    setChosen(o => {
      return (o + 1) % phrases.length;
    });
  }
  return (
    <div className={`text-left mt-1`}>
      <div className="d-flex flex-row mb-2">
        <ModeSelect value={mode} onChange={setMode} />
        {mode === "blocks" && (
          <ScriptSelect value={script} onChange={setScript} />
        )}
      </div>
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
      <div className="d-flex flex-row">
        {phrases.length > 1 && <div onClick={moveChosenBack} className="clickable fas fa-chevron-left mt-3 mr-2" />}
        {text.e && (
          <div
            className={`text-muted mt-2 text-left`}
          >
            {text.e.map((e, i) => <div key={i}>{e}</div>)}
          </div>
        )}
        {phrases.length > 1 && <div onClick={moveChosenForward} className="clickable fas fa-chevron-right mt-3 ml-2" />}
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
  const matching = props.toMatch ? flattened.findIndex(x => x.p === props.toMatch) : -1;
  const secondBestMatching = props.toMatch && matching !== -1 ? flattened.findIndex(x => x.p.replaceAll(" ", "") === props.toMatch?.replaceAll(" ", "")) : -1;
  const match = matching === -1 ? secondBestMatching : matching;
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

