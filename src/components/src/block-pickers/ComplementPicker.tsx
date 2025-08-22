import { useState, useEffect } from "react";
import type { JSX } from "react";
import * as T from "../../../types";
import AdjectivePicker from "./AdjectivePicker";
import LocativeAdverbPicker from "./LocativeAdverbPicker";
import SandwichPicker from "./SandwichPicker";
import NPPicker from "./NPPicker";
const compTypes: T.ComplementType[] = [
  "adjective",
  "loc. adv.",
  "sandwich",
  "comp. noun",
  "possesor",
  "NP",
];

function ComplementPicker(props: {
  phraseIsComplete: boolean;
  onChange: (comp: T.ComplementSelection | undefined) => void;
  comp: T.ComplementSelection | undefined;
  opts: T.TextOptions;
  cantClear?: boolean;
  heading?: JSX.Element | string;
  entryFeeder: T.EntryFeeder;
  negative: boolean;
}) {
  const [compType, setCompType] = useState<T.ComplementType | undefined>(
    props.comp?.selection.type
  );
  useEffect(() => {
    setCompType(props.comp?.selection.type);
  }, [props.comp]);
  function handleClear() {
    setCompType(undefined);
    props.onChange(undefined);
  }
  function handleCompTypeChange(ctp: T.ComplementType) {
    props.onChange(undefined);
    setCompType(ctp);
  }
  function handleSandwichExit() {
    setCompType(undefined);
    props.onChange(undefined);
  }
  function handlePossesiveChange(p: T.NPSelection | undefined) {
    if (!p) {
      props.onChange(undefined);
    }
    if (p) {
      props.onChange({
        type: "complement",
        selection: {
          type: "possesor",
          np: p,
          shrunken: false,
        },
      });
      return;
    }
  }
  const clearButton =
    compType && !props.cantClear ? (
      <button className="btn btn-sm btn-light mb-2" onClick={handleClear}>
        X
      </button>
    ) : (
      <div></div>
    );
  return (
    <>
      <div className="d-flex flex-row justify-content-between">
        <div></div>
        <div>
          {typeof props.heading === "string" ? (
            <div className="h5 text-center">{props.heading}</div>
          ) : (
            props.heading
          )}
        </div>
        <div>{clearButton}</div>
      </div>
      {!compType && (
        <div className="text-center">
          <div className="h6 mr-3">Choose Complement</div>
          {compTypes.map((cpt) => (
            <div key={cpt} className="mb-2">
              <button
                key={cpt}
                type="button"
                className="mr-2 btn btn-sm btn-outline-secondary"
                onClick={() => handleCompTypeChange(cpt)}
              >
                {fixPossSpelling(cpt)}
              </button>
            </div>
          ))}
        </div>
      )}
      <div style={{ minWidth: "9rem" }}>
        {compType === "adjective" ? (
          <AdjectivePicker
            entryFeeder={props.entryFeeder}
            adjective={
              props.comp?.selection.type === "adjective"
                ? props.comp.selection
                : undefined
            }
            opts={props.opts}
            onChange={(a) =>
              props.onChange(
                a ? { type: "complement", selection: a } : undefined
              )
            }
            phraseIsComplete={props.phraseIsComplete}
            negative={props.negative}
          />
        ) : compType === "loc. adv." ? (
          <LocativeAdverbPicker
            entryFeeder={props.entryFeeder.locativeAdverbs}
            adjective={
              props.comp?.selection.type === "loc. adv."
                ? props.comp.selection
                : undefined
            }
            opts={props.opts}
            onChange={(a) =>
              props.onChange(
                a ? { type: "complement", selection: a } : undefined
              )
            }
          />
        ) : compType === "sandwich" ? (
          <SandwichPicker
            onChange={(a) =>
              props.onChange(
                a ? { type: "complement", selection: a } : undefined
              )
            }
            opts={props.opts}
            sandwich={
              props.comp?.selection.type === "sandwich"
                ? props.comp.selection
                : undefined
            }
            entryFeeder={props.entryFeeder}
            onExit={handleSandwichExit}
            // TODO: get phraseIsComplete working here
            phraseIsComplete={props.phraseIsComplete}
            negative={props.negative}
          />
        ) : compType === "comp. noun" ? (
          <div style={{ maxWidth: "9rem" }}>
            Sorry, can't choose complement nouns yet 🚧
          </div>
        ) : compType === "possesor" ? (
          <div>
            <h6 className="text-center">Possessor</h6>
            <NPPicker
              phraseIsComplete={props.phraseIsComplete}
              onChange={handlePossesiveChange}
              counterPart={undefined}
              cantClear
              np={
                props.comp?.selection.type === "possesor"
                  ? props.comp.selection.np
                  : undefined
              }
              role="possesor"
              opts={props.opts}
              entryFeeder={props.entryFeeder}
              negative={props.negative}
            />
          </div>
        ) : compType === "NP" ? (
          <NPPicker
            phraseIsComplete={props.phraseIsComplete}
            onChange={(np) =>
              props.onChange(np && { type: "complement", selection: np })
            }
            counterPart={undefined}
            cantClear
            np={
              props.comp?.selection.type === "NP"
                ? props.comp.selection
                : undefined
            }
            role="subject"
            opts={props.opts}
            entryFeeder={props.entryFeeder}
            negative={props.negative}
          />
        ) : null}
      </div>
    </>
  );
}

// TODO: Actually fix the spelling of the ComplementType and get rid
// of this
function fixPossSpelling(c: T.ComplementType): string {
  if (c === "possesor") {
    return "possessor";
  }
  return c;
}

export default ComplementPicker;
