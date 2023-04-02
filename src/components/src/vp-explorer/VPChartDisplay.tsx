import {
    getTenseVerbForm,
} from "../../../lib/src/phrase-building/vp-tools";
import VerbFormDisplay from "../VerbFormDisplay";
import * as T from "../../../types";

function ChartDisplay({ conjugations, tense, opts, voice }: {
    conjugations: T.VerbConjugation,
    tense: T.VerbTense | T.PerfectTense | T.AbilityTense | T.ImperativeTense,
    opts: T.TextOptions,
    voice: T.VerbSelection["voice"],
}) {
    const form = getTenseVerbForm(conjugations, tense, voice, "charts", false);
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