import * as T from "../../../types";
import VerbFormDisplay from "../VerbFormDisplay";
import { baParticle } from "../../../lib/src/grammar-units";
import { getEquativeForm } from "../../../lib/src/phrase-building/render-ep";
import { addToForm } from "../../../lib/src/p-text-helpers";

function EqChartsDisplay({ tense, opts }: {
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
