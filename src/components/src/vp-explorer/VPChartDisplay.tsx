import NewVerbFormDisplay from "./NewVerbFormDisplay";
import * as T from "../../../types";
import { buildVerbChart } from "./chart-builder";
import { isPastTense } from "../../library";

function ChartDisplay({
  verb,
  tense,
  opts,
  voice,
  imperative,
  negative,
  transitivity,
}: {
  verb: T.VerbEntry;
  tense: T.VerbTense | T.PerfectTense | T.AbilityTense | T.ImperativeTense;
  opts: T.TextOptions;
  voice: T.VerbSelection["voice"];
  imperative: boolean;
  negative: boolean;
  transitivity: T.Transitivity;
}) {
  const verbChart = buildVerbChart({
    verb,
    tense,
    voice,
    negative,
    transitivity,
    imperative,
  });
  return (
    <div className="mb-4">
      <NewVerbFormDisplay
        chart={verbChart}
        opts={opts}
        transitivity={transitivity}
        past={isPastTense(tense)}
      />
    </div>
  );
}

export default ChartDisplay;
