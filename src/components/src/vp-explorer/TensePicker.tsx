import Select from "react-select";
import * as T from "../../../types";
import ButtonSelect from "../selects/ButtonSelect";

import useStickyState from "../useStickyState";
import { customSelectStyles as customStyles } from "../selects/select-styles";
import { VpsReducerAction } from "../../../lib/src/phrase-building/vps-reducer";
import {
  imperativeTenseOptions,
  perfectTenseOptions,
  verbTenseOptions,
} from "./verbTenseOptions";
import { getTenseCategory } from "./vp-explorer-util";

function composeFormula(
  formula: string,
  prefix: "passive" | "ability"
): string {
  return formula
    .replace(/^perfective/, `${prefix} perfective`)
    .replace(/^imperfective/, `${prefix} imperfective`)
    .replace("continuous", `${prefix} continuous`)
    .replace("simple", `${prefix} simple`)
    .replace(/present$/, `${prefix} present`)
    .replace(/subjunctive$/, `${prefix} subjunctive`)
    .replace("past participle", `${prefix} past participle`);
}

function TensePicker(
  props: (
    | {
      vps: T.VPSelectionState;
    }
    | {
      vpsComplete: T.VPSelectionComplete;
    }
  ) & {
    onChange: (p: VpsReducerAction) => void;
    mode: "charts" | "phrases" | "quiz";
  }
) {
  const [showFormula, setShowFormula] = useStickyState<boolean>(
    false,
    "showFormula"
  );
  function onTenseSelect(
    o: { value: T.VerbTense | T.PerfectTense | T.ImperativeTense } | null
  ) {
    if ("vpsComplete" in props) return;
    const tense = o?.value ? o.value : undefined;
    props.onChange({
      type: "set tense",
      payload: tense,
    });
  }
  function moveTense(dir: "forward" | "back") {
    if ("vpsComplete" in props) return;
    return () => {
      // TODO: ABSTRACT THIS - SAFER
      const tenses =
        props.vps.verb.tenseCategory === "perfect"
          ? perfectTenseOptions
          : props.vps.verb.tenseCategory === "imperative"
            ? imperativeTenseOptions
            : verbTenseOptions;
      const currIndex = tenses.findIndex(
        (tn) =>
          tn.value ===
          props.vps.verb[
          // TODO: ABSTRACT THIS? - SAFER
          props.vps.verb.tenseCategory === "perfect"
            ? "perfectTense"
            : props.vps.verb.tenseCategory === "imperative"
              ? "imperativeTense"
              : "verbTense"
          ]
      );
      if (currIndex === -1) {
        console.error("error moving tense", dir);
        return;
      }
      const newIndex =
        dir === "forward"
          ? (currIndex + 1) % tenses.length
          : currIndex === 0
            ? tenses.length - 1
            : currIndex - 1;
      const newTense = tenses[newIndex];
      onTenseSelect(newTense);
    };
  }
  function onPosNegSelect(payload: "true" | "false") {
    if ("vpsComplete" in props) return;
    props.onChange({
      type: "set negativity",
      payload,
    });
  }
  function onTenseCategorySelect(
    payload: "basic" | "modal" | "perfect" | "imperative"
  ) {
    if ("vpsComplete" in props) return;
    props.onChange({
      type: "set tense category",
      payload,
    });
  }
  const tOptions =
    "vps" in props && props.vps.verb?.tenseCategory === "perfect"
      ? perfectTenseOptions
      : "vps" in props && props.vps.verb?.tenseCategory === "imperative"
        ? imperativeTenseOptions
        : verbTenseOptions;
  const showImperativeOption =
    ("vps" in props && props.vps.verb.voice === "active") ||
    ("vpsComplete" in props && props.vpsComplete.verb.voice !== "active");
  const inAllTensesMode = props.mode === "charts";
  const canHaveFormula =
    "vps" in props && props.mode !== "quiz" && !inAllTensesMode;
  return (
    <div>
      <div style={{ maxWidth: "300px", minWidth: "250px", margin: "0 auto" }}>
        <div className="d-flex flex-row justify-content-between align-items-center">
          <div className="h5">
            {props.mode === "charts" ? "Tense Category:" : "Verb Tense:"}
          </div>
          {canHaveFormula && (
            <div
              className="clickable mb-2 small"
              onClick={() => setShowFormula((x) => !x)}
            >
              🧪 {!showFormula ? "Show" : "Hide"} Formula
            </div>
          )}
        </div>
        {("vpsComplete" in props) && (
          <div className="mb-2">
            <ButtonSelect
              small
              value={
                "vpsComplete" in props // eslint-disable-line
                  ? getTenseCategory(props.vpsComplete.verb.tense)
                  // @ts-expect-error because
                  : props.vps.verb.tenseCategory // eslint-disable-line
              }
              options={
                showImperativeOption
                  ? [
                    {
                      label: "Basic",
                      value: "basic",
                    },
                    {
                      label: "Perfect",
                      value: "perfect",
                    },
                    {
                      label: "Ability",
                      value: "modal",
                    },
                    {
                      label: "Imperative",
                      value: "imperative",
                    },
                  ]
                  : [
                    {
                      label: "Basic",
                      value: "basic",
                    },
                    {
                      label: "Perfect",
                      value: "perfect",
                    },
                    {
                      label: "Ability",
                      value: "modal",
                    },
                  ]
              }
              handleChange={
                props.mode !== "quiz" ? onTenseCategorySelect : () => null
              }
            />
          </div>
        )}
        {"vpsComplete" in props ? (
          <div style={{ fontSize: "larger" }} className="mb-3">
            {
              [
                ...verbTenseOptions,
                ...perfectTenseOptions,
                ...imperativeTenseOptions,
              ].find((o) => o.value === props.vpsComplete.verb.tense)?.label
            }
          </div>
        ) : (
          <>
            {!inAllTensesMode && (
              <Select
                isSearchable={false}
                // for some reason can't use tOptions with find here;
                value={
                  [
                    ...verbTenseOptions,
                    ...perfectTenseOptions,
                    ...imperativeTenseOptions,
                  ].find(
                    (o) =>
                      o.value ===
                      props.vps.verb[
                      props.vps.verb.tenseCategory === "perfect"
                        ? "perfectTense"
                        : props.vps.verb.tenseCategory === "imperative"
                          ? "imperativeTense"
                          : "verbTense"
                      ]
                  )
                }
                // @ts-expect-error slight mismatch but it's ok
                onChange={onTenseSelect}
                className="mb-2"
                options={tOptions}
                styles={customStyles}
              />
            )}
          </>
        )}
        {"vps" in props && props.mode !== "quiz" && (
          <div
            className="d-flex flex-row justify-content-between align-items-center mt-2 mb-1"
            style={{ width: "100%" }}
          >
            {!inAllTensesMode ? (
              <div
                className="btn btn-light clickable"
                onClick={moveTense("back")}
              >
                <i className="fas fa-chevron-left" />
              </div>
            ) : (
              <div />
            )}
            {/* {props.mode === "charts" && <ButtonSelect
                    small
                    value={props.chartMode}
                    options={[{
                        label: "all",
                        value: "allTenses",
                    }, {
                        label: "one",
                        value: "oneTense",
                    }]}
                    handleChange={props.onChartModeChange}
                />} */}
            {props.mode === "phrases" && (
              <ButtonSelect
                small
                value={props.vps.verb.negative.toString() as "true" | "false"}
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
                handleChange={onPosNegSelect}
              />
            )}
            {!inAllTensesMode ? (
              <div
                onClick={moveTense("forward")}
                className="btn btn-light clickable"
              >
                <i className="fas fa-chevron-right" />
              </div>
            ) : (
              <div />
            )}
          </div>
        )}
        {canHaveFormula &&
          showFormula &&
          (() => {
            // TODO: Be able to show modal formulas too
            const curr =
              props.vps.verb.tenseCategory === "imperative" &&
                props.vps.verb.negative
                ? imperativeTenseOptions.find(
                  (x) => x.value === "imperfectiveImperative"
                )
                : [
                  ...verbTenseOptions,
                  ...perfectTenseOptions,
                  ...imperativeTenseOptions,
                ].find(
                  (o) =>
                    o.value ===
                    props.vps.verb[
                    props.vps.verb.tenseCategory === "perfect"
                      ? "perfectTense"
                      : props.vps.verb.tenseCategory === "imperative"
                        ? "imperativeTense"
                        : "verbTense"
                    ]
                );
            const formula = !curr
              ? ""
              : props.vps.verb.tenseCategory === "modal"
                ? composeFormula(curr.formula, "ability")
                : props.vps.verb.voice === "passive"
                  ? composeFormula(curr.formula, "passive")
                  : curr.formula;
            if (curr && "formula" in curr) {
              return (
                <div
                  className="mb-2"
                  style={{ width: "250px", overflowY: "auto" }}
                >
                  <samp>{formula}</samp>
                </div>
              );
            }
          })()}
      </div>
    </div>
  );
}

export default TensePicker;
