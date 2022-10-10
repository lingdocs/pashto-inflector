import * as T from "../../../types";
import useStickyState, { useStickyReducer } from "../useStickyState";
import EPDisplay from "./EPDisplay";
import ButtonSelect from "../ButtonSelect";
import EqChartsDisplay from "./EqChartsDisplay";
import epsReducer from "../../../lib/src/phrase-building/eps-reducer";
import {
    useEffect,
    useRef,
    useState,
} from "react";
import { completeEPSelection } from "../../../lib/src/phrase-building/render-ep";
import { makeEPSBlocks } from "../../../lib/src/phrase-building/blocks-utils";
import autoAnimate from "@formkit/auto-animate";
// @ts-ignore
import LZString from "lz-string";
import EPPicker from "./EPPicker";
const epPhraseURLParam = "ep";

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
    const [eps, adjustEps] = useStickyReducer(
        epsReducer,
        blankEps,
        "EPState8",
        flashMessage,
    );
    // const [
    //     // alertMsg,
    //     // setAlertMsg,
    // ] = useState<string | undefined>(undefined);
    const [showClipped, setShowClipped] = useState<string>("");
    const parent = useRef<HTMLDivElement>(null);
    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);
    useEffect(() => {
        const EPSFromUrl = getEPSFromUrl();
        if (EPSFromUrl) {
            setMode("phrases");
            adjustEps({
                type: "load EPS",
                payload: EPSFromUrl,
            });
        }
        // eslint-disable-next-line
    }, []);
    function handleEpsChange(e: T.EPSelectionState) {
        adjustEps({ type: "load EPS", payload: e });
    }
    function flashMessage(msg: string) {
        console.log(msg);
        alert(msg);
        // for some crazy reason using this alert functionality breaks the flow!
        // setAlertMsg(msg);
        // setTimeout(() => {
        //     setAlertMsg(undefined);
        // }, 1500);
    }
    function flashClippedMessage(m: string) {
        setShowClipped(m);
        setTimeout(() => {
            setShowClipped("");
        }, 1250);
    }
    function handleCopyCode() {
        const code = getCode(eps);
        navigator.clipboard.writeText(code);
        flashClippedMessage("Copied phrase code to clipboard");
    }
    function handleCopyShareLink() {
        const shareUrl = getShareUrl(eps);
        navigator.clipboard.writeText(shareUrl);
        flashClippedMessage("Copied phrase URL to clipboard");
    }
    const phraseIsComplete = !!completeEPSelection(eps);
    return <div>
        <div className="mt-2 mb-3 d-flex flex-row justify-content-between align-items-center">
            <div />
            <ButtonSelect
                value={mode}
                options={[
                    { label: "Charts", value: "charts" },
                    { label: "Phrases", value: "phrases" },
                ]}
                handleChange={setMode}
            />
            {!("eps" in props) && <div className="d-flex flex-row">
                <div
                    className="clickable mr-4"
                    onClick={mode === "phrases" ? handleCopyCode : undefined}
                    style={{ width: "1rem" }}
                >
                    {(mode === "phrases" && phraseIsComplete) ? <i className="fas fa-code" /> : ""}
                </div>
                <div
                    className="clickable"
                    onClick={mode === "phrases" ? handleCopyShareLink : undefined}
                    style={{ width: "1rem" }}
                >
                    {mode === "phrases" ? <i className="fas fa-share-alt" /> : ""}
                </div>
            </div>}
        </div>
        {mode === "phrases" &&
            <EPPicker
                opts={props.opts}
                entryFeeder={props.entryFeeder}
                eps={eps}
                onChange={handleEpsChange}
            />
        }
        {mode === "charts" && <EqChartsDisplay opts={props.opts} />}
        {mode === "phrases" && <EPDisplay
            opts={props.opts}
            eps={eps}
            setOmitSubject={"eps" in props ? false : payload => adjustEps({ type: "set omitSubject", payload })}
        />}
        {/* {alertMsg && <div className="alert alert-warning text-center" role="alert" style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999999999999,
        }}>
            {alertMsg}
        </div>} */}
        {showClipped && <div className="alert alert-primary text-center" role="alert" style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999999999999,
        }}>
            {showClipped}
        </div>}
    </div>;
}

export default EPExplorer;

function getShareUrl(eps: T.EPSelectionState): string {
    const code = getCode(eps);
    const encoded = LZString.compressToEncodedURIComponent(code);
    const url = new URL(window.location.href);
    // need to delete or else you could just get a second param written after
    // which gets ignored
    url.searchParams.delete(epPhraseURLParam);
    url.searchParams.append(epPhraseURLParam, encoded);
    return url.toString();
}

function getCode(eps: T.EPSelectionState): string {
    return JSON.stringify(eps);
}

function getEPSFromUrl(): T.EPSelectionState | undefined {
    const params = new URLSearchParams(window.location.search);
    const fromParams = params.get(epPhraseURLParam);
    if (!fromParams) return;
    const decoded = LZString.decompressFromEncodedURIComponent(fromParams);
    return JSON.parse(decoded) as T.EPSelectionState;
}
