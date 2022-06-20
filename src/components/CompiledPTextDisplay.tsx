import { getShort } from "../lib/p-text-helpers";
import * as T from "../types";
import Examples from "./Examples";

function CompiledPTextDisplay({ compiled, opts, justify, onlyOne }: {
    compiled: {
        ps: T.SingleOrLengthOpts<T.PsString[]>;
        e?: string[] | undefined;
    },
    opts: T.TextOptions,
    justify?: "left" | "right" | "center",
    onlyOne?: boolean,
}) {
    function VariationLayer({ vs }: { vs: T.PsString[] }) {
        return <div className="mb-2">
            <Examples opts={opts} lineHeight={0}>{vs}</Examples>
        </div>;
    }
    return <div className={justify === "left" ? "text-left" : justify === "right" ? "text-right" : "text-center"}>
        {onlyOne
            ? <VariationLayer vs={[getShort(compiled.ps)[0]]} />
            : "long" in compiled.ps ?
                <div>
                    <VariationLayer vs={compiled.ps.long} />
                    <VariationLayer vs={compiled.ps.short} />
                    {compiled.ps.mini && <VariationLayer vs={compiled.ps.mini} />}
                </div>
                : <VariationLayer vs={compiled.ps} />
        }
    </div>;
}

export default CompiledPTextDisplay;