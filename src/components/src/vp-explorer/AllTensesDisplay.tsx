import {
  abilityTenseOptions,
  imperativeTenseOptions,
  perfectTenseOptions,
  verbTenseOptions,
} from "./verbTenseOptions";
import ChartDisplay from "./VPChartDisplay";
import Hider from "../Hider";
import * as T from "../../../types";
import useStickyState from "../useStickyState";
import { isImperativeTense } from "../../../lib/src/type-predicates";
// import { conjugateVerb } from "../../../lib/src/verb-conjugation";

function AllTensesDisplay({
  VS,
  opts,
}: {
  VS: T.VerbSelection;
  opts: T.TextOptions;
}) {
  const [showing, setShowing] = useStickyState<string[]>([], "VPTensesShowing");
  const [showFormulas, setShowFormulas] = useStickyState<boolean>(
    false,
    "showFormulasWithCharts"
  );
  const adjustShowing = (v: string) => {
    if (showing.includes(v)) {
      setShowing((os) => os.filter((x) => x !== v));
    } else {
      setShowing((os) => [v, ...os]);
    }
  };
  const options =
    VS.tenseCategory === "basic"
      ? verbTenseOptions
      : VS.tenseCategory === "perfect"
      ? perfectTenseOptions
      : VS.tenseCategory === "modal"
      ? abilityTenseOptions
      : imperativeTenseOptions;
  // const rawConjugations = conjugateVerb(VS.verb.entry, VS.verb.complement);
  //   const conjugations =
  //     "stative" in rawConjugations
  //       ? rawConjugations[VS.isCompound === "stative" ? "stative" : "dynamic"]
  //       : "transitive" in rawConjugations
  //       ? rawConjugations[
  //           VS.transitivity === "grammatically transitive"
  //             ? "grammaticallyTransitive"
  //             : "transitive"
  //         ]
  //       : rawConjugations;
  function getTense(
    baseTense: T.VerbTense | T.PerfectTense | T.ImperativeTense
  ): T.VerbTense | T.PerfectTense | T.ImperativeTense | T.AbilityTense {
    return VS.tenseCategory === "modal"
      ? (`${baseTense}Modal` as T.AbilityTense)
      : baseTense;
  }
  return (
    <div>
      <div
        className="clickable mb-2 small text-center"
        onClick={() => setShowFormulas((x) => !x)}
      >
        🧪 {!showFormulas ? "Show" : "Hide"} Formulas
      </div>
      {options.map((tense) => {
        const t = getTense(tense.value);
        return (
          <div key={Math.random()}>
            <Hider
              label={tense.label}
              showing={showing.includes(tense.value)}
              handleChange={() => adjustShowing(tense.value)}
              hLevel={5}
            >
              {showFormulas && (
                <div className="mb-1">
                  <samp>{tense.formula}</samp>
                </div>
              )}
              {showing && (
                <ChartDisplay
                  verb={VS.verb}
                  negative={VS.negative}
                  tense={t}
                  transitivity={VS.transitivity}
                  voice={VS.voice}
                  imperative={isImperativeTense(t)}
                  opts={opts}
                />
              )}
            </Hider>
          </div>
        );
      })}
    </div>
  );
}

export default AllTensesDisplay;
