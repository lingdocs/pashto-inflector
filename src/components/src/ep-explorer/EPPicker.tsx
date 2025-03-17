import * as T from "../../../types";
import NPPicker from "../block-pickers/NPPicker";
import EquativePicker from "./EquativePicker";
import ComplementPicker from "../block-pickers/ComplementPicker";
import epsReducer, {
  EpsReducerAction,
} from "../../../lib/src/phrase-building/eps-reducer";
import { useEffect, useRef } from "react";
import { completeEPSelection } from "../../../lib/src/phrase-building/render-ep";
import APPicker from "../block-pickers/APPicker";
// @ts-expect-error types not working for this
import autoAnimate from "@formkit/auto-animate";

function EPPicker({
  opts,
  eps,
  onChange,
  entryFeeder,
}: {
  opts: T.TextOptions;
  eps: T.EPSelectionState;
  onChange: (eps: T.EPSelectionState) => void;
  entryFeeder: T.EntryFeeder;
}) {
  const parent = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current);
    }
  }, [parent]);
  function adjustEps(action: EpsReducerAction) {
    onChange(epsReducer(eps, action));
  }
  const phraseIsComplete = !!completeEPSelection(eps);
  return (
    <div>
      <div
        className="clickable h5"
        onClick={() => adjustEps({ type: "insert new AP" })}
      >
        + AP
      </div>
      <div
        ref={parent}
        className="d-flex flex-row justify-content-around flex-wrap"
        style={{ marginLeft: "-0.5rem", marginRight: "-0.5rem" }}
      >
        {eps.blocks.map(({ block, key }, i) => (
          <div className="my-2 card block-card p-1 mx-1" key={key}>
            <div
              className="d-flex flex-row justify-content-between mb-1"
              style={{ height: "1rem" }}
            >
              {i > 0 ? (
                <div
                  className="small clickable ml-1"
                  onClick={() =>
                    adjustEps({
                      type: "shift block",
                      payload: { index: i, direction: "back" },
                    })
                  }
                >
                  <i className="fas fa-chevron-left" />
                </div>
              ) : (
                <div />
              )}
              {i < eps.blocks.length - 1 ? (
                <div
                  className="small clickable mr-1"
                  onClick={() =>
                    adjustEps({
                      type: "shift block",
                      payload: { index: i, direction: "forward" },
                    })
                  }
                >
                  <i className="fas fa-chevron-right" />
                </div>
              ) : (
                <div />
              )}
            </div>
            {block && block.type === "subjectSelection" ? (
              <NPPicker
                phraseIsComplete={phraseIsComplete}
                heading={<div className="h5 text-center">Subject</div>}
                entryFeeder={entryFeeder}
                np={block.selection}
                counterPart={undefined}
                role="subject"
                onChange={(payload) =>
                  adjustEps({ type: "set subject", payload })
                }
                opts={opts}
                negative={eps.equative.negative}
              />
            ) : (
              <APPicker
                negative={eps.equative.negative}
                phraseIsComplete={phraseIsComplete}
                heading="AP"
                entryFeeder={entryFeeder}
                AP={block}
                opts={opts}
                onChange={(AP) =>
                  adjustEps({ type: "set AP", payload: { index: i, AP } })
                }
                onRemove={() => adjustEps({ type: "remove AP", payload: i })}
              />
            )}
          </div>
        ))}
        <div className="my-2 card block-card p-1">
          <div className="h5 text-center">Predicate</div>
          <ComplementPicker
            phraseIsComplete={phraseIsComplete}
            comp={eps.predicate}
            onChange={(payload) =>
              adjustEps({ type: "set predicate", payload })
            }
            opts={opts}
            entryFeeder={entryFeeder}
            negative={eps.equative.negative}
          />
        </div>
        <div className="my-2">
          <div className="h5 text-center clickable">Equative</div>
          <EquativePicker
            equative={eps.equative}
            onChange={(payload) => adjustEps({ type: "set equative", payload })}
            hideNegative={false}
          />
        </div>
      </div>
    </div>
  );
}

export default EPPicker;
