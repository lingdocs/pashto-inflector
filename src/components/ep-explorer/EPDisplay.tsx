import * as T from "../../types";
import { completeEPSelection, renderEP } from "../../lib/phrase-building/render-ep";
import { compileEP } from "../../lib/phrase-building/compile";
import Examples from "../Examples";
import ButtonSelect from "../ButtonSelect";

function EPDisplay({ eps, opts, setOmitSubject }: {
    eps: T.EPSelectionState,
    opts: T.TextOptions,
    setOmitSubject: (value: "true" | "false") => void,
}) {
    const EP = completeEPSelection(eps);
    if (!EP) {
        return <div className="lead text-center my-4">
            {(!eps.subject && !eps.predicate[eps.predicate.type])
                ? "Select Subject and Predicate"
                : (eps.subject && !eps.predicate[eps.predicate.type])
                ? "Select Predicate"
                : (!eps.subject && eps.predicate[eps.predicate.type])
                ? "Select Subject"
                : ""}
        </div>
    }
    const rendered = renderEP(EP);
    const result = compileEP(rendered);
    return <div className="text-center pt-3">
        <div className="mb-2">
            <ButtonSelect
                small
                value={(eps.omitSubject ? "true" : "false") as "true" | "false"}
                options={[
                    { value: "false", label: "Full"},
                    { value: "true", label: "No Subj."},
                ]}
                handleChange={setOmitSubject}
            />
        </div>
        {"long" in result.ps ?
            <div>
                <VariationLayer vs={result.ps.long} opts={opts} />
                <VariationLayer vs={result.ps.short} opts={opts} />
                {result.ps.mini && <VariationLayer vs={result.ps.mini} opts={opts} />}
            </div>
            : <VariationLayer vs={result.ps} opts={opts} />
        }
        {result.e && <div className="text-muted mt-3">
            {result.e.map((e, i) => <div key={i}>{e}</div>)}
        </div>}
        {EP.predicate.selection.type === "participle" && <div style={{ maxWidth: "6 00px", margin: "0 auto" }} className="alert alert-warning mt-3 pt-4">
            <p>⚠️ NOTE: This means that the subject {rendered.subject.e ? `(${rendered.subject.e})` : ""} is <strong>the action/idea</strong> of
            {` `}
            "{rendered.predicate.e ? rendered.predicate.e : "the particple"}".</p>
            <p>It <strong>does not</strong> mean that the subject is doing the action, which is what the transaltion sounds like in English.</p>
        </div>}
    </div>
}

function VariationLayer({ vs, opts }: { vs: T.PsString[], opts: T.TextOptions }) {
    return <div className="mb-2">
        <Examples opts={opts} lineHeight={0}>{vs}</Examples>
    </div>;
}

export default EPDisplay;