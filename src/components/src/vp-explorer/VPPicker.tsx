import NPPicker, { shrunkenBackground } from "../../src/np-picker/NPPicker";
import TensePicker from "./TensePicker";
import * as T from "../../../types";
import {
  // useEffect,
  useRef,
  useState,
} from "react";
import {
  getKingAndServant,
  renderVP,
} from "../../../lib/src/phrase-building/render-vp";
import {
  completeVPSelection,
  isPastTense,
} from "../../../lib/src/phrase-building/vp-tools";
import VPExplorerExplanationModal, {
  roleIcon,
} from "./VPExplorerExplanationModal";
import APPicker from "../../src/ap-picker/APPicker";
// import autoAnimate from "@formkit/auto-animate";
import {
  getObjectSelection,
  getSubjectSelection,
  includesShrunkenServant,
  isNoObject,
} from "../../../lib/src/phrase-building/blocks-utils";
import ComplementPicker from "../ComplementPicker";
import {
  vpsReducer,
  VpsReducerAction,
} from "../../../lib/src/phrase-building/vps-reducer";

function VPPicker({
  opts,
  vps,
  onChange,
  entryFeeder,
}: {
  opts: T.TextOptions;
  vps: T.VPSelectionState;
  onChange: (vps: T.VPSelectionState) => void;
  entryFeeder: T.EntryFeeder;
}) {
  const parent = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //     parent.current && autoAnimate(parent.current);
  // }, [parent]);
  const [showingExplanation, setShowingExplanation] =
    useState<{ role: "servant" | "king"; item: "subject" | "object" } | false>(
      false
    );
  function adjustVps(action: VpsReducerAction) {
    onChange(vpsReducer(vps, action));
  }
  function handleSubjectChange(
    subject: T.NPSelection | undefined,
    skipPronounConflictCheck?: boolean
  ) {
    adjustVps({
      type: "set subject",
      payload: { subject, skipPronounConflictCheck },
    });
  }
  function handleObjectChange(object: T.NPSelection | undefined) {
    adjustVps({
      type: "set object",
      payload: object,
    });
  }
  const object = getObjectSelection(vps.blocks).selection;
  const subject = getSubjectSelection(vps.blocks).selection;
  const VPS = completeVPSelection(vps);
  const phraseIsComplete = !!VPS;
  const rendered = VPS
    ? (() => {
        try {
          return renderVP(VPS);
        } catch (e) {
          console.error(e);
          return undefined;
        }
      })()
    : undefined;
  const servantIsShrunk = includesShrunkenServant(rendered?.kids);
  const isPast = isPastTense(
    vps.verb.tenseCategory === "perfect"
      ? vps.verb.perfectTense
      : vps.verb.verbTense
  );
  const roles = getKingAndServant(
    isPast,
    vps.verb.transitivity !== "intransitive"
  );
  return (
    <div>
      <div
        className="clickable h5"
        onClick={() => adjustVps({ type: "insert new AP" })}
      >
        + AP
      </div>
      <div
        ref={parent}
        className="d-flex flex-row justify-content-around flex-wrap"
        style={{ marginLeft: "-0.5rem", marginRight: "-0.5rem" }}
      >
        {vps.blocks.map(({ block, key }, i, blocks) => {
          if (isNoObject(block)) return null;
          return (
            <div
              className="my-2 card block-card p-1 mx-1"
              key={key}
              style={{
                background:
                  servantIsShrunk &&
                  ((roles.servant === "subject" &&
                    block?.type === "subjectSelection") ||
                    (roles.servant === "object" &&
                      block?.type === "objectSelection"))
                    ? shrunkenBackground
                    : "inherit",
              }}
            >
              <div
                className="d-flex flex-row justify-content-between mb-1"
                style={{ height: "1rem" }}
              >
                {i > 0 &&
                !isNoObject(blocks[i - 1].block) &&
                !isGenStatCompNoun(block) ? (
                  <div
                    className="small clickable ml-1"
                    onClick={() =>
                      adjustVps({
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
                {i < vps.blocks.length - 1 &&
                !isNoObject(blocks[i + 1].block) &&
                !isGenStatCompNoun(block) ? (
                  <div
                    className="small clickable mr-1"
                    onClick={() =>
                      adjustVps({
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
              {!block || block.type === "AP" ? (
                <APPicker
                  phraseIsComplete={phraseIsComplete}
                  heading="AP"
                  entryFeeder={entryFeeder}
                  AP={block}
                  opts={opts}
                  onChange={(AP) =>
                    adjustVps({ type: "set AP", payload: { index: i, AP } })
                  }
                  onRemove={() => adjustVps({ type: "remove AP", payload: i })}
                />
              ) : block?.type === "subjectSelection" ? (
                <NPPicker
                  phraseIsComplete={phraseIsComplete}
                  heading={
                    roles.king === "subject" ? (
                      <div className="h5 text-center">
                        Subj.{" "}
                        <span
                          onClick={() =>
                            setShowingExplanation({
                              role: "king",
                              item: "subject",
                            })
                          }
                        >
                          {roleIcon.king}
                        </span>
                        {rendered && rendered.whatsAdjustable !== "servant" && (
                          <KingRemover
                            onChange={() =>
                              adjustVps({ type: "toggle king remove" })
                            }
                            showKing={!VPS?.form.removeKing}
                          />
                        )}
                      </div>
                    ) : (
                      <div className="h5 text-center">
                        Subj.
                        {` `}
                        <span
                          className="clickable"
                          onClick={() =>
                            setShowingExplanation({
                              role: "servant",
                              item: "subject",
                            })
                          }
                        >
                          {roleIcon.servant}
                        </span>
                        {` `}
                        {rendered && rendered.whatsAdjustable !== "king" && (
                          <ServantShrinker
                            shrunk={servantIsShrunk}
                            onClick={() =>
                              adjustVps({ type: "toggle servant shrink" })
                            }
                          />
                        )}
                      </div>
                    )
                  }
                  entryFeeder={entryFeeder}
                  np={block.selection}
                  counterPart={vps.verb ? object : undefined}
                  role={
                    isPast && vps.verb.transitivity !== "intransitive"
                      ? "ergative"
                      : "subject"
                  }
                  onChange={handleSubjectChange}
                  opts={opts}
                  isShrunk={servantIsShrunk && roles.servant === "subject"}
                  isRemoved={roles.king === "subject" && VPS?.form.removeKing}
                />
              ) : vps.verb &&
                block?.type === "objectSelection" &&
                block.selection !== "none" ? (
                <div
                  className="my-2"
                  style={{
                    background:
                      servantIsShrunk && roles.servant === "object"
                        ? shrunkenBackground
                        : "inherit",
                  }}
                >
                  {typeof block.selection === "number" ? (
                    <div>
                      {roles.king === "object" ? (
                        <div
                          className="h5 text-center clickable"
                          onClick={() =>
                            setShowingExplanation({
                              role: "king",
                              item: "object",
                            })
                          }
                        >
                          Object {roleIcon.king}
                        </div>
                      ) : roles.servant === "object" ? (
                        <div
                          className="h5 text-center clickable"
                          onClick={() =>
                            setShowingExplanation({
                              role: "servant",
                              item: "object",
                            })
                          }
                        >
                          Object {roleIcon.servant}
                        </div>
                      ) : (
                        <div className="h5 text-center">Object</div>
                      )}
                      <div className="text-muted text-center">
                        <div className="mt-3 mb-1">Unspoken</div>
                        <div>3rd Pers. Masc. Plur.</div>
                      </div>
                    </div>
                  ) : (
                    <NPPicker
                      phraseIsComplete={phraseIsComplete}
                      heading={
                        roles.king === "object" ? (
                          <div className="h5 text-center">
                            Obj.{" "}
                            <span
                              onClick={() =>
                                setShowingExplanation({
                                  role: "king",
                                  item: "object",
                                })
                              }
                            >
                              {roleIcon.king}
                            </span>
                            {rendered &&
                              rendered.whatsAdjustable !== "servant" && (
                                <KingRemover
                                  onChange={() =>
                                    adjustVps({ type: "toggle king remove" })
                                  }
                                  showKing={!VPS?.form.removeKing}
                                />
                              )}
                          </div>
                        ) : (
                          <div className="h5 text-center">
                            Obj.
                            {` `}
                            <span
                              className="clickable"
                              onClick={() =>
                                setShowingExplanation({
                                  role: "servant",
                                  item: "object",
                                })
                              }
                            >
                              {roleIcon.servant}
                            </span>
                            {` `}
                            {rendered &&
                              rendered.whatsAdjustable !== "king" && (
                                <ServantShrinker
                                  shrunk={servantIsShrunk}
                                  onClick={() =>
                                    adjustVps({ type: "toggle servant shrink" })
                                  }
                                />
                              )}
                          </div>
                        )
                      }
                      entryFeeder={entryFeeder}
                      role="object"
                      np={block.selection}
                      counterPart={subject}
                      onChange={handleObjectChange}
                      opts={opts}
                      isShrunk={servantIsShrunk && roles.servant === "object"}
                      isRemoved={
                        roles.king === "object" && VPS?.form.removeKing
                      }
                    />
                  )}
                </div>
              ) : null}
            </div>
          );
        })}
        {vps.externalComplement && (
          <div className="my-2 card block-card p-1 mr-1" key="complementPicker">
            <div className="h5 text-center">Complement</div>
            <ComplementPicker
              phraseIsComplete={phraseIsComplete}
              comp={
                vps.externalComplement.selection.type === "unselected"
                  ? undefined
                  : (vps.externalComplement as T.ComplementSelection) // TODO: just typescript being dumb? - looks like it
              }
              onChange={(payload) =>
                adjustVps({ type: "set externalComplement", payload })
              }
              opts={opts}
              entryFeeder={entryFeeder}
            />
          </div>
        )}
        <div className="my-2">
          <TensePicker vps={vps} onChange={adjustVps} mode="phrases" />
        </div>
      </div>
      <VPExplorerExplanationModal
        showing={showingExplanation}
        setShowing={setShowingExplanation}
      />
    </div>
  );
}

function ServantShrinker({
  shrunk,
  onClick,
}: {
  shrunk: boolean;
  onClick: () => void;
}) {
  return (
    <span className="mx-2 clickable" onClick={onClick}>
      {!shrunk ? "🪄" : "👶"}
    </span>
  );
}

function KingRemover({
  showKing,
  onChange,
}: {
  showKing: boolean;
  onChange: () => void;
}) {
  return (
    <span className="form-check form-check-inline ml-3">
      <input
        checked={showKing}
        onChange={onChange}
        className="form-check-input"
        type="checkbox"
        id="showKingCheck"
      />
    </span>
  );
}

function isGenStatCompNoun(
  block:
    | T.APSelection
    | T.ComplementSelection
    | T.SubjectSelection
    | T.ObjectSelection
    | undefined
) {
  if (!block) return false;
  if (
    block.type === "objectSelection" &&
    typeof block.selection === "object" &&
    block.selection.selection.type === "noun" &&
    block.selection.selection.genStativeComplement
  ) {
    return true;
  }
  return false;
}

export default VPPicker;
