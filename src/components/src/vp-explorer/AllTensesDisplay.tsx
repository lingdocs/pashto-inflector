import { abilityTenseOptions, imperativeTenseOptions, perfectTenseOptions, verbTenseOptions } from "./verbTenseOptions";
import ChartDisplay from "./VPChartDisplay";
import Hider from "../Hider";
import * as T from "../../../types";
import useStickyState from "../useStickyState";
import { isModalTense, isPerfectTense, isVerbTense } from "../../../lib/src/type-predicates";

function AllTensesDisplay({ VS, opts }: { VS: T.VerbSelection, opts: T.TextOptions }) {
    const [showing, setShowing] = useStickyState<string[]>([], "tensesShowing");
    const [showFormulas, setShowFormulas] = useStickyState<boolean>(false, "showFormulasWithCharts");
    const adjustShowing = (v: string) => {
        if (showing.includes(v)) {
            setShowing(os => os.filter(x => x !== v));
        } else {
            setShowing(os => [v, ...os]);
        }
    }
    const options = VS.tenseCategory === "basic"
        ? verbTenseOptions
        : VS.tenseCategory === "perfect"
        ? perfectTenseOptions
        : VS.tenseCategory === "modal"
        ? abilityTenseOptions
        : imperativeTenseOptions;
    return <div>
        <div className="clickable mb-2 small text-center" onClick={() => setShowFormulas(x => !x)}>
            {!showFormulas ? "Show" : "Hide"} Formulas
        </div>
        {options.map((tense) => <div key={Math.random()}>
            <Hider
                label={tense.label}
                showing={showing.includes(tense.value)}
                handleChange={() => adjustShowing(tense.value)}
                hLevel={5}
            >
                {showFormulas && <div className="mb-1">
                    <samp>🧪 {tense.formula}</samp>
                </div>}
                <ChartDisplay
                    VS={{
                        ...VS,
                        [isVerbTense(tense.value)
                            ? "verbTense"
                            : isPerfectTense(tense.value)
                            ? "perfectTense"
                            : isModalTense(tense.value)
                            ? "modalTense"
                            : "imperativeTense"
                        ]: tense.value,
                    }}
                    opts={opts}
                />
            </Hider>
        </div>)}
    </div>;
}

export default AllTensesDisplay;