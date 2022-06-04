import * as T from "../../types";
import Examples from "../Examples";

function EPTextDisplay({ compiled, opts }: { compiled: {
    ps: T.SingleOrLengthOpts<T.PsString[]>;
    e?: string[] | undefined;
}, opts: T.TextOptions }) {
    function VariationLayer({ vs }: { vs: T.PsString[] }) {
        return <div className="mb-2">
            <Examples opts={opts} lineHeight={0}>{vs}</Examples>
        </div>;
    }
    return <div>
        {"long" in compiled.ps ?
            <div>
                <VariationLayer vs={compiled.ps.long} />
                <VariationLayer vs={compiled.ps.short} />
                {compiled.ps.mini && <VariationLayer vs={compiled.ps.mini} />}
            </div>
            : <VariationLayer vs={compiled.ps} />
        }
        {compiled.e && <div className="text-muted mt-3">
            {compiled.e.map((e, i) => <div key={i}>{e}</div>)}
        </div>}
    </div>;
}

export default EPTextDisplay;