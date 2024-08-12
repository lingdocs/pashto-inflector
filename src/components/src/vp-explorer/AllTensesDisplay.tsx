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
import ButtonSelect from "../selects/ButtonSelect";
import { VpsReducerAction } from "../../../lib/src/phrase-building/vps-reducer";
import { useState } from "react";
import { statVerb } from "../../../lib/src/new-verb-engine/roots-and-stems";
// import { conjugateVerb } from "../../../lib/src/verb-conjugation";

function AllTensesDisplay({
  VS,
  opts,
  onChange,
  object,
}: {
  onChange: (p: VpsReducerAction) => void;
  VS: T.VerbSelection;
  object: T.NPSelection | T.ObjectNP | undefined;
  opts: T.TextOptions;
}) {
  const [showing, setShowing] = useStickyState<string[]>([], "VPTensesShowing");
  const [showFormulas, setShowFormulas] = useStickyState<boolean>(
    false,
    "showFormulasWithCharts"
  );
  const [objectNPNumber, setObjectNPNumber] = useState<T.NounNumber>(
    object && typeof object === "object" && object.selection.type === "noun"
      ? object.selection.number
      : "singular"
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
  const objectNP: T.NPSelection | undefined =
    object && typeof object === "object" && object.selection.type === "noun"
      ? object
      : undefined;
  const verb =
    VS.isCompound === "generative stative"
      ? statVerb[
          VS.transitivity === "intransitive" ? "intransitive" : "transitive"
        ]
      : VS.dynAuxVerb
      ? VS.dynAuxVerb
      : VS.verb;
  return (
    <div>
      <div
        onClick={() => setShowFormulas((x) => !x)}
        className="small clickable text-right mb-2"
      >
        🧪 {!showFormulas ? "Show" : "Hide"} Formulas
      </div>
      <div className="mb-2 d-flex flex-row justify-content-around align-items-center">
        {objectNP?.selection.type === "noun" &&
          objectNP.selection.numberCanChange && (
            <div>
              <span className="text-muted small mr-2">comp. noun:</span>
              <ButtonSelect
                xSmall
                value={objectNPNumber}
                options={[
                  {
                    label: "sing.",
                    value: "singular",
                  },
                  {
                    label: "plur.",
                    value: "plural",
                  },
                ]}
                handleChange={(number) => {
                  setObjectNPNumber(number);
                }}
              />
            </div>
          )}
        <ButtonSelect
          xSmall
          value={VS.negative.toString() as "true" | "false"}
          options={[
            {
              label: "Pos.",
              value: "false",
            },
            {
              label: "Neg.",
              value: "true",
            },
          ]}
          handleChange={(payload) =>
            onChange({ type: "set negativity", payload })
          }
        />
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
                  verb={verb}
                  objectNP={
                    VS.isCompound === "dynamic" &&
                    objectNP?.selection.type === "noun"
                      ? {
                          ...objectNP,
                          selection: {
                            ...objectNP.selection,
                            number: objectNP.selection.numberCanChange
                              ? objectNPNumber
                              : objectNP.selection.number,
                          },
                        }
                      : undefined
                  }
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
