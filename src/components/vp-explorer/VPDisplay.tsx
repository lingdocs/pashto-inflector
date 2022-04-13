import { renderVP, compileVP } from "../../lib/phrase-building/index";
import * as T from "../../types";
import InlinePs from "../InlinePs";
import AbbreviationFormSelector from "./AbbreviationFormSelector";
import { isPastTense } from "../../lib/phrase-building/vp-tools";
import { useStickyState } from "../../library";
import { isVPSelectionComplete } from "../../lib/type-predicates";

function VPDisplay({ VP, opts }: { VP: T.VPSelection | T.VPSelectionComplete, opts: T.TextOptions }) {
    const [form, setForm] = useStickyState<T.FormVersion>({ removeKing: false, shrinkServant: false }, "abbreviationForm");
    const [OSV, setOSV] = useStickyState<boolean>(false, "includeOSV");
    if (!isVPSelectionComplete(VP)) {
        return <div className="lead text-muted text-center mt-4">
            {(() => {
                const twoNPs = (VP.subject === undefined) && (VP.verb.object === undefined);
                return `Choose NP${twoNPs ? "s " : ""} to make a phrase`;
            })()}
        </div>;
    }
    const result = compileVP(renderVP(VP), { ...form, OSV });
    return <div className="text-center mt-2">
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
            adjustable={whatsAdjustable(VP)}
            form={form}
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
        {result.e && <div className="text-muted">
            {result.e.map((e, i) => <div key={i}>{e}</div>)}
        </div>}
    </div>
}

function whatsAdjustable(VP: T.VPSelectionComplete): "both" | "king" | "servant" {
    // TODO: intransitive dynamic compounds?
    return (VP.verb.isCompound === "dynamic" && VP.verb.transitivity === "transitive")
        ? (isPastTense(VP.verb.tense) ? "servant" : "king")
        : VP.verb.transitivity === "transitive"
        ? "both"
        : VP.verb.transitivity === "intransitive"
        ? "king"
        // grammTrans
        : isPastTense(VP.verb.tense)
        ? "servant"
        : "king";
}

function VariationLayer({ vs, opts }: { vs: T.PsString[], opts: T.TextOptions }) {
    return <div className="mb-2">
        {vs.map((r, i) => <div key={i}>
            <InlinePs opts={opts}>{r}</InlinePs>
        </div>)}
    </div>;
}

export default VPDisplay;