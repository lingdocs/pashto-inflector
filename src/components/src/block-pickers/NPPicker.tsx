import PronounPicker from "./NPPronounPicker";
import NounPicker from "./NPNounPicker";
import ParticiplePicker from "./NPParticiplePicker";
import { randomPerson } from "../../../lib/src/np-tools";
import { useState, useEffect } from "react";
import * as T from "../../../types";
import { isSecondPerson } from "../../../lib/src/misc-helpers";

const npTypes: T.NPType[] = ["pronoun", "noun", "participle"];

// TODO: BUG WITH PICKING IMPERATIVE FORMS OUTSIDE OF SECOND PERSON!

export const shrunkenBackground = "rgba(255, 206, 43, 0.15)";

function NPPicker(props: {
  heading?: JSX.Element | string;
  onChange: (nps: T.NPSelection | undefined) => void;
  np: T.NPSelection | undefined;
  counterPart: T.NPSelection | T.VerbObject | undefined;
  role: "subject" | "object" | "ergative" | "possesor";
  opts: T.TextOptions;
  cantClear?: boolean;
  is2ndPersonPicker?: boolean;
  entryFeeder: T.EntryFeeder;
  phraseIsComplete: boolean;
  isShrunk?: boolean;
  isRemoved?: boolean;
  negative: boolean;
}) {
  if (
    props.is2ndPersonPicker &&
    (props.np?.selection.type !== "pronoun" ||
      !isSecondPerson(props.np.selection.person))
  ) {
    throw new Error("can't use 2ndPerson NPPicker without a pronoun");
  }
  const [addingPoss, setAddingPoss] = useState<boolean>(false);
  const [npType, setNpType] = useState<T.NPType | undefined>(
    props.np ? props.np.selection.type : undefined
  );
  const onChange = (np: T.NPSelection | undefined) => {
    props.onChange(ensureSingleShrink(props.np, np));
    if (
      (np?.selection.type === "noun" || np?.selection.type === "participle") &&
      np.selection.possesor
    ) {
      setAddingPoss(true);
    }
    setAddingPoss(false);
  };
  useEffect(() => {
    setNpType(props.np ? props.np.selection.type : undefined);
  }, [props.np]);
  function handleClear() {
    if (
      props.np &&
      props.np.selection.type === "noun" &&
      props.np.selection.dynamicComplement
    )
      return;
    setNpType(undefined);
    onChange(undefined);
  }
  function handleNPTypeChange(ntp: T.NPType) {
    if (ntp === "pronoun") {
      const person = randomPerson({ counterPart: props.counterPart });
      const pronoun: T.PronounSelection = {
        type: "pronoun",
        person,
        distance: "far",
      };
      setNpType(ntp);
      onChange({ type: "NP", selection: pronoun });
    } else {
      if (props.np) {
        onChange(undefined);
      }
      setNpType(ntp);
    }
  }
  // TODO: REMOVE
  function handlePossesiveChange(p: T.NPSelection | undefined) {
    if (!props.np || props.np.selection.type === "pronoun") return;
    if (!p) {
      onChange({
        type: "NP",
        selection: {
          ...props.np.selection,
          possesor: undefined,
        },
      });
      return;
    }
    const isNewPosesser = checkForNewPossesor(p, props.np.selection.possesor);
    const possesor: T.PossesorSelection = {
      np: p,
      shrunken:
        !isNewPosesser && props.np.selection.possesor
          ? props.np.selection.possesor.shrunken
          : false,
    };
    onChange({
      type: "NP",
      selection: {
        ...props.np.selection,
        possesor,
      },
    });
  }
  function handleToggleShrunken() {
    if (
      !props.np ||
      props.np.selection.type === "pronoun" ||
      !props.np.selection.possesor ||
      !props.phraseIsComplete
    )
      return;
    onChange({
      type: "NP",
      selection: {
        ...props.np.selection,
        possesor: {
          ...props.np.selection.possesor,
          shrunken: !props.np.selection.possesor.shrunken,
        },
      },
    });
  }
  const isDynamicComplement =
    props.np &&
    props.np.selection.type === "noun" &&
    props.np.selection.dynamicComplement;
  const clearButton =
    !props.cantClear && !props.is2ndPersonPicker && !isDynamicComplement ? (
      <button className="btn btn-sm btn-light mb-2" onClick={handleClear}>
        X
      </button>
    ) : (
      <div></div>
    );
  const possesiveLabel =
    props.np?.selection.type === "participle" ? "Subj/Obj" : "Possesor";
  return (
    <div
      style={{
        opacity: props.isRemoved ? 0.5 : 1,
      }}
    >
      <div className="d-flex flex-row justify-content-between">
        <div></div>
        <div>
          {typeof props.heading === "string" ? (
            <div className="h5 text-center">{props.heading}</div>
          ) : (
            props.heading
          )}
        </div>
        <div>{npType && clearButton}</div>
      </div>
      <div style={{ minWidth: "9rem" }}>
        {!npType && (
          <div className="text-center">
            <div className="h6 mr-3">Choose NP</div>
            {npTypes.map((npt) => (
              <div key={npt} className="mb-2">
                <button
                  key={npt}
                  type="button"
                  className="mr-2 btn btn-sm btn-outline-secondary"
                  onClick={() => handleNPTypeChange(npt)}
                >
                  {npt}
                </button>
              </div>
            ))}
          </div>
        )}
        {props.np &&
          props.np.selection.type !== "pronoun" &&
          (props.np.selection.possesor || addingPoss) && (
            <div
              className="mb-3"
              style={{
                paddingLeft: "0.65rem",
                borderLeft: "2px solid grey",
                background:
                  props.np.selection.possesor?.shrunken && !props.isShrunk
                    ? shrunkenBackground
                    : "inherit",
              }}
            >
              <div className="d-flex flex-row text-muted mb-2">
                <div>{possesiveLabel}:</div>
                {props.np.selection.possesor &&
                  !props.isShrunk &&
                  props.phraseIsComplete && (
                    <div
                      className="clickable ml-3 mr-2"
                      onClick={handleToggleShrunken}
                    >
                      {!props.np.selection.possesor.shrunken ? "🪄" : "👶"}
                    </div>
                  )}
                <div
                  className="clickable ml-2"
                  onClick={() => {
                    setAddingPoss(false);
                    handlePossesiveChange(undefined);
                  }}
                >
                  <i className="fas fa-trash" />
                </div>
              </div>
              <NPPicker
                phraseIsComplete={props.phraseIsComplete}
                onChange={handlePossesiveChange}
                counterPart={undefined}
                cantClear
                np={
                  props.np.selection.possesor
                    ? props.np.selection.possesor.np
                    : undefined
                }
                role="possesor"
                opts={props.opts}
                entryFeeder={props.entryFeeder}
                negative={props.negative}
              />
            </div>
          )}
        {(npType === "noun" || npType === "participle") &&
          props.np &&
          !addingPoss && (
            <div>
              <span
                className="clickable text-muted"
                onClick={() => setAddingPoss(true)}
              >
                + {possesiveLabel}
              </span>
            </div>
          )}
        {npType === "pronoun" && props.np?.selection.type === "pronoun" ? (
          <PronounPicker
            role={props.role}
            pronoun={props.np.selection}
            onChange={(p) => onChange({ type: "NP", selection: p })}
            is2ndPersonPicker={props.is2ndPersonPicker}
            // @ts-expect-error this is fine
            opts={props.opts}
          />
        ) : npType === "noun" ? (
          <NounPicker
            phraseIsComplete={props.phraseIsComplete}
            entryFeeder={props.entryFeeder}
            negative={props.negative}
            noun={
              props.np && props.np.selection.type === "noun"
                ? props.np.selection
                : undefined
            }
            onChange={(s) =>
              onChange(s ? { type: "NP", selection: s } : undefined)
            }
            opts={props.opts}
          />
        ) : npType === "participle" ? (
          <ParticiplePicker
            entryFeeder={props.entryFeeder.verbs}
            participle={
              props.np && props.np.selection.type === "participle"
                ? props.np.selection
                : undefined
            }
            onChange={(s) =>
              onChange(s ? { type: "NP", selection: s } : undefined)
            }
            opts={props.opts}
          />
        ) : null}
      </div>
    </div>
  );
}

function ensureSingleShrink(
  old: T.NPSelection | undefined,
  s: T.NPSelection | undefined
): T.NPSelection | undefined {
  if (!s) return s;
  function countShrinks(np: T.NPSelection): number {
    if (np.selection.type === "pronoun") return 0;
    if (!np.selection.possesor) return 0;
    return (
      (np.selection.possesor.shrunken ? 1 : 0) +
      countShrinks(np.selection.possesor.np)
    );
  }
  function keepNewShrink(old: T.NPSelection, n: T.NPSelection): T.NPSelection {
    if (n.selection.type === "pronoun") return n;
    if (
      old.selection.type === "pronoun" ||
      !n.selection.possesor ||
      !old.selection.possesor
    )
      return n;
    if (n.selection.possesor.shrunken && !old.selection.possesor.shrunken) {
      return {
        type: "NP",
        selection: {
          ...n.selection,
          possesor: {
            ...n.selection.possesor,
            np: removeShrinks(n.selection.possesor.np),
          },
        },
      };
    }
    return {
      type: "NP",
      selection: {
        ...n.selection,
        possesor: {
          shrunken: false,
          np: keepNewShrink(old.selection.possesor.np, n.selection.possesor.np),
        },
      },
    };
  }
  function removeShrinks(n: T.NPSelection): T.NPSelection {
    if (n.selection.type === "pronoun") return n;
    if (!n.selection.possesor) return n;
    return {
      type: "NP",
      selection: {
        ...n.selection,
        possesor: {
          shrunken: false,
          np: removeShrinks(n.selection.possesor.np),
        },
      },
    };
  }
  if (!old) return s;
  if (s.selection.type === "pronoun") return s;
  if (!s.selection.possesor) return s;
  const numOfShrinks = countShrinks(s);
  if (numOfShrinks < 2) return s;
  return keepNewShrink(old, s);
}

function checkForNewPossesor(
  n: T.NPSelection | undefined,
  old: T.PossesorSelection | undefined
): boolean {
  if (!old || !n) {
    return true;
  }
  if (n.type !== old.np.type) {
    return true;
  }
  if (n.selection.type === "pronoun") return false;
  if (n.selection.type === "noun" && old.np.selection.type === "noun") {
    return n.selection.entry.ts !== old.np.selection.entry.ts;
  }
  if (
    n.selection.type === "participle" &&
    old.np.selection.type === "participle"
  ) {
    return n.selection.verb.entry.ts !== old.np.selection.verb.entry.ts;
  }
  return false;
}

export default NPPicker;
