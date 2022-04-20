import {
    getTenseVerbForm,
    getTenseFromVerbSelection,
} from "../../lib/phrase-building/vp-tools";
import VerbFormDisplay from "../VerbFormDisplay";
import { conjugateVerb } from "../../lib/verb-conjugation";
import * as T from "../../types";

function ChartDisplay({ VS, opts }: { VS: T.VerbSelection, opts: T.TextOptions }) {
    const rawConjugations = conjugateVerb(VS.verb.entry, VS.verb.complement);
    if (!rawConjugations) {
        return <div>Error conjugating verb</div>;
    }
    const conjugations = ("stative" in rawConjugations)
        ? rawConjugations[VS.isCompound === "stative" ? "stative" : "dynamic"]
        : ("transitive" in rawConjugations)
        ? rawConjugations[VS.transitivity === "grammatically transitive" ? "grammaticallyTransitive" : "transitive"]
        : rawConjugations;
    const form = getTenseVerbForm(conjugations, getTenseFromVerbSelection(VS), VS.voice, VS.negative);
    return <div className="mb-4">
        <VerbFormDisplay
            displayForm={form}
            showingFormInfo={false}
            textOptions={opts}
            info={conjugations.info}
        />
    </div>;
}

export default ChartDisplay;