import NewVerbFormDisplay from "./NewVerbFormDisplay";
import * as T from "../../../types";
import { buildVerbChart } from "./chart-builder";
import { isPastTense } from "../../library";

// TODO - combine this with NewVerbFormDisplay

function ChartDisplay({
  verb,
  tense,
  opts,
  voice,
  imperative,
  negative,
  transitivity,
  objectNP,
}: {
  verb: T.VerbEntry;
  tense: T.VerbTense | T.PerfectTense | T.AbilityTense | T.ImperativeTense;
  opts: T.TextOptions;
  voice: T.VerbSelection["voice"];
  imperative: boolean;
  negative: boolean;
  transitivity: T.Transitivity;
  objectNP: T.NPSelection | undefined;
}) {
  const verbChart = buildVerbChart({
    verb,
    tense,
    voice,
    negative,
    transitivity,
    imperative,
    objectNP,
  });
  return (
    <div className="mb-4">
      <NewVerbFormDisplay
        imperative={imperative}
        negative={negative}
        chart={verbChart}
        opts={opts}
        transitivity={transitivity}
        past={isPastTense(tense)}
      />
    </div>
  );
}

export default ChartDisplay;
