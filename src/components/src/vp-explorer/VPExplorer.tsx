import VerbPicker from "./VerbPicker";
import TensePicker from "./TensePicker";
import VPDisplay from "./VPDisplay";
import ButtonSelect from "../ButtonSelect";
import * as T from "../../../types";
import useStickyState, { useStickyReducer } from "../useStickyState";
import { makeVPSelectionState } from "../../../lib/src/phrase-building/verb-selection";
import { useEffect, useState } from "react";
import { completeVPSelection } from "../../../lib/src/phrase-building/vp-tools";
import VPExplorerQuiz from "./VPExplorerQuiz";
// @ts-ignore
import LZString from "lz-string";
import {
  VpsReducerAction,
  vpsReducer,
} from "../../../lib/src/phrase-building/vps-reducer";
import { getObjectSelection } from "../../../lib/src/phrase-building/blocks-utils";
import VPPicker from "./VPPicker";
import AllTensesDisplay from "./AllTensesDisplay";

export const vpPhraseURLParam = "vp";

// TODO: Issue with dynamic compounds english making with plurals
// TODO: Issue with "the money were taken"
// TODO: Use the same component for PronounPicker and NPPronounPicker (sizing issue)
// get the practice pronoun picker page into a typesafe file
// A little button you can press on the tense select to show the formula and info about the tense
// in a popup
// TODO: option to show 3 modes  Phrases - Charts - Quiz

// TODO: error handling on error with rendering etc

function VPExplorer(props: {
  loaded?: T.VPSelectionState;
  verb: T.VerbEntry;
  opts: T.TextOptions;
  handleLinkClick: ((ts: number) => void) | "none";
  entryFeeder: T.EntryFeeder;
  onlyPhrases?: boolean;
  eventEmitter?: (e: string) => void;
}) {
  const [vps, adjustVps] = useStickyReducer(
    vpsReducer,
    props.loaded
      ? props.loaded
      : (savedVps) => makeVPSelectionState(props.verb, savedVps),
    "vpsState17",
    flashMessage
  );
  const [mode, setMode] = useStickyState<"charts" | "phrases" | "quiz">(
    (savedMode) => {
      if (!savedMode) return props.onlyPhrases ? "phrases" : "charts";
      if (savedMode === "quiz") return "phrases";
      return savedMode;
    },
    "verbExplorerMode2"
  );
  const [showClipped, setShowClipped] = useState<string>("");
  const [
    alertMsg,
    // setAlertMsg,
  ] = useState<string | undefined>(undefined);
  function flashMessage(msg: string) {
    console.log(msg);
    // for some crazy reason this causes it to go through with the state change
    // we're trying to avoid when there's a potential errored state
    // setAlertMsg(msg);
    // setTimeout(() => {
    //     setAlertMsg(undefined);
    // }, 2000);
  }
  useEffect(() => {
    adjustVps({
      type: "set verb",
      payload: props.verb,
    });
    // eslint-disable-next-line
  }, [props.verb]);
  useEffect(() => {
    if (props.loaded) {
      adjustVps({
        type: "load vps",
        payload: props.loaded,
      });
    }
    // eslint-disable-next-line
  }, [props.loaded]);
  useEffect(() => {
    const VPSFromUrl = getVPSFromUrl();
    if (VPSFromUrl) {
      setMode("phrases");
      eventWrapper(adjustVps)({
        type: "load vps",
        payload: VPSFromUrl,
      });
    }
    // eslint-disable-next-line
  }, []);
  function handleSubjObjSwap() {
    eventWrapper(adjustVps)({ type: "swap subj/obj" });
  }
  function eventWrapper(f: (a: VpsReducerAction) => void) {
    return function (action: VpsReducerAction) {
      if (props.eventEmitter) {
        props.eventEmitter(`VP exlorer ${props.verb.entry.p}`);
      }
      return f(action);
    };
  }
  function quizLock<T>(f: T) {
    if (mode === "quiz") {
      return () => {
        flashMessage("to adjust this, get out of quiz mode");
        return null;
      };
    }
    return f;
  }
  function handleSetForm(form: T.FormVersion) {
    eventWrapper(adjustVps)({
      type: "set form",
      payload: form,
    });
  }
  function flashClippedMessage(m: string) {
    setShowClipped(m);
    setTimeout(() => {
      setShowClipped("");
    }, 1250);
  }
  // for some crazy reason I can't get the URI share thing to encode and decode properly
  function handleCopyShareLink() {
    const shareUrl = getShareUrl(vps);
    navigator.clipboard.writeText(shareUrl);
    flashClippedMessage("Copied phrase URL to clipboard");
  }
  function handleCopyCode() {
    const code = getCode(vps);
    navigator.clipboard.writeText(code);
    flashClippedMessage("Copied phrase code to clipboard");
  }
  const object = getObjectSelection(vps.blocks).selection;
  const VPS = completeVPSelection(vps);
  const phraseIsComplete = !!VPS;
  return (
    <div className="mt-3" style={{ maxWidth: "950px" }}>
      <VerbPicker
        vps={vps}
        onChange={quizLock(eventWrapper(adjustVps))}
        opts={props.opts}
        handleLinkClick={props.handleLinkClick}
      />
      {!props.onlyPhrases && (
        <div className="mt-2 mb-3 d-flex flex-row justify-content-between align-items-center">
          <div style={{ width: "1rem" }}></div>
          <ButtonSelect
            value={mode}
            options={[
              { label: "Charts", value: "charts" },
              { label: "Phrases", value: "phrases" },
              { label: "Quiz", value: "quiz" },
            ]}
            handleChange={setMode}
          />
          <div className="d-flex flex-row">
            <div
              className="clickable mr-4"
              onClick={mode === "phrases" ? handleCopyCode : undefined}
              style={{ width: "1rem" }}
            >
              {mode === "phrases" && phraseIsComplete ? (
                <i className="fas fa-code" />
              ) : (
                ""
              )}
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
      )}
      {vps.verb &&
        typeof object === "object" &&
        vps.verb.isCompound !== "dynamic" &&
        vps.verb.tenseCategory !== "imperative" &&
        mode === "phrases" && (
          <div className="text-center my-2">
            <button
              onClick={handleSubjObjSwap}
              className="btn btn-sm btn-light"
            >
              <i className="fas fa-exchange-alt mr-2" /> subj/obj
            </button>
          </div>
        )}
      {mode === "phrases" && (
        <VPPicker
          opts={props.opts}
          entryFeeder={props.entryFeeder}
          onChange={(payload) =>
            eventWrapper(adjustVps)({ type: "load vps", payload })
          }
          vps={vps}
        />
      )}
      {mode !== "phrases" && (
        <div className="my-2">
          <TensePicker
            vps={vps}
            onChange={eventWrapper(adjustVps)}
            mode={mode}
          />
        </div>
      )}
      {mode === "phrases" && (
        <VPDisplay VPS={vps} opts={props.opts} setForm={handleSetForm} />
      )}
      {mode === "charts" && (
        <AllTensesDisplay
          object={object}
          VS={vps.verb}
          opts={props.opts}
          onChange={eventWrapper(adjustVps)}
        />
      )}
      {mode === "quiz" && <VPExplorerQuiz opts={props.opts} vps={vps} />}
      {showClipped && (
        <div
          className="alert alert-primary text-center"
          role="alert"
          style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999999999999,
          }}
        >
          {showClipped}
        </div>
      )}
      {alertMsg && (
        <div
          className="alert alert-warning text-center"
          role="alert"
          style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999999999999,
          }}
        >
          {alertMsg}
        </div>
      )}
    </div>
  );
}

export default VPExplorer;

function getShareUrl(vps: T.VPSelectionState): string {
  const code = getCode(vps);
  const encoded = LZString.compressToEncodedURIComponent(code);
  const url = new URL(window.location.href);
  // need to delete or else you could just get a second param written after
  // which gets ignored
  url.searchParams.delete(vpPhraseURLParam);
  url.searchParams.append(vpPhraseURLParam, encoded);
  return url.toString();
}

function getCode(vps: T.VPSelectionState): string {
  return JSON.stringify(vps);
}

function getVPSFromUrl(): T.VPSelectionState | undefined {
  const params = new URLSearchParams(window.location.search);
  const fromParams = params.get(vpPhraseURLParam);
  if (!fromParams) return;
  const decoded = LZString.decompressFromEncodedURIComponent(fromParams);
  return JSON.parse(decoded) as T.VPSelectionState;
}
