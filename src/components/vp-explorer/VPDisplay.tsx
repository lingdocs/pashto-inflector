import { compileVP } from "../../lib/phrase-building/compile";
import * as T from "../../types";
import AbbreviationFormSelector from "./AbbreviationFormSelector";
import useStickyState from "../../lib/useStickyState";
import Examples from "../Examples";

function VPDisplay({ VP, opts, setForm }: {
    VP: T.VPSelectionState | T.VPRendered,
    opts: T.TextOptions,
    setForm: (form: T.FormVersion) => void,
}) {
    const [OSV, setOSV] = useStickyState<boolean>(false, "includeOSV");
    if (!("type" in VP)) {
        return <div className="lead text-muted text-center mt-4">
            {(() => {
                const twoNPs = (VP.subject === undefined) && (VP.verb.object === undefined);
                return `Choose NP${twoNPs ? "s " : ""} to make a phrase`;
            })()}
        </div>;
    }
    const result = compileVP(VP, { ...VP.form, OSV });
    return <div className="text-center mt-1">
        {VP.verb.transitivity === "transitive" && <div className="form-check mb-2">
            <input
                className="form-check-input"
                type="checkbox"
                checked={OSV}
                id="OSVCheckbox"
                onChange={e => setOSV(e.target.checked)}
            />
            <label className="form-check-label text-muted" htmlFor="OSVCheckbox">
                Include O S V
            </label>
        </div>}
        <AbbreviationFormSelector
            adjustable={VP.whatsAdjustable}
            form={VP.form}
            onChange={setForm}
        />
        {"long" in result.ps ?
            <div>
                {/* <div className="h6">Long Verb:</div> */}
                <VariationLayer vs={result.ps.long} opts={opts} />
                {/* <div className="h6">Short Verb:</div> */}
                <VariationLayer vs={result.ps.short} opts={opts} />
                {result.ps.mini && <>
                    {/* <div className="h6">Mini Verb:</div> */}
                    <VariationLayer vs={result.ps.mini} opts={opts} />
                </>}
            </div>
            : <VariationLayer vs={result.ps} opts={opts} />
        }
        {result.e && <div className="text-muted mt-3">
            {result.e.map((e, i) => <div key={i}>{e}</div>)}
        </div>}
    </div>
}

function VariationLayer({ vs, opts }: { vs: T.PsString[], opts: T.TextOptions }) {
    return <div className="mb-2">
        <Examples opts={opts} lineHeight={0}>{vs}</Examples>
    </div>;
}

export default VPDisplay;