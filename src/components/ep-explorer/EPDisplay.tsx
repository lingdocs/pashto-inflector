import * as T from "../../types";
import { renderEP } from "../../lib/phrase-building/render-ep";
import { compileEP } from "../../lib/phrase-building/compile-ep";
import AbbreviationFormSelector from "../vp-explorer/AbbreviationFormSelector";
import Examples from "../Examples";

function EPDisplay({ eps, opts, setForm }: {
    eps: T.EPSelectionState,
    opts: T.TextOptions,
    setForm: (form: T.FormVersion) => void,
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
    const result = compileEP(rendered, EP.form);
    return <div className="text-center pt-3">
        <AbbreviationFormSelector
            adjustable="king"
            form={EP.form}
            onChange={setForm}
        />
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

function completeEPSelection(eps: T.EPSelectionState): T.EPSelectionComplete | undefined {
    if (!eps.subject) {
        return undefined;
    }
    if (eps.predicate.type === "Complement") {
        const selection = eps.predicate.Complement;
        if (!selection) return undefined;
        return {
            ...eps,
            subject: eps.subject,
            predicate: {
                type: "Complement",
                selection,
            },
        };
    }
    // predicate is NP
    const selection = eps.predicate.NP;
    if (!selection) return undefined;
    return {
        ...eps,
        subject: eps.subject,
        predicate: {
            type: "NP",
            selection,
        },
    };
}

export default EPDisplay;