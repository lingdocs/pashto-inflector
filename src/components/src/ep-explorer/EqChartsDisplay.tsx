import * as T from "../../../types";
import VerbFormDisplay from "../VerbFormDisplay";
import { baParticle } from "../../../lib/src/grammar-units";
import { getEquativeForm } from "../../../lib/src/phrase-building/render-ep";
import { addToForm } from "../../../lib/src/p-text-helpers";
import useStickyState from "../useStickyState";
import { epTenseOptions as options } from "./epTenseOptions";
import Hider from "../Hider";

function EqChartsDisplay({ opts }: { opts: T.TextOptions }) {
    const [showing, setShowing] = useStickyState<string[]>([], "EPTensesShowing");
    const adjustShowing = (v: string) => {
        if (showing.includes(v)) {
            setShowing(os => os.filter(x => x !== v));
        } else {
            setShowing(os => [v, ...os]);
        }
    }
    return <div>
        {options.map((tense) => <div key={Math.random()}>
            <Hider
                label={tense.label}
                showing={showing.includes(tense.value)}
                handleChange={() => adjustShowing(tense.value)}
                hLevel={5}
            >
                <EqChartDisplay
                    tense={tense.value}
                    opts={opts}
                />
            </Hider>
        </div>)}
    </div>;
}

function EqChartDisplay({ tense, opts }: {
    tense: T.EquativeTense,
    opts: T.TextOptions,
}) {
    const { form, hasBa } = getEquativeForm(tense);
    const withBa = hasBa
        ? addToForm([baParticle, " ", { p: "…", f: "…" }, " "], form)
        : form;
    return <div className="mb-4">
        <VerbFormDisplay
            displayForm={withBa}
            showingFormInfo={false}
            textOptions={opts}
        />
    </div>
};

export default EqChartsDisplay;
