import * as T from "../../../types";
import type { JSX } from "react";
import { useEffect, useState } from "react";
import VPDisplay from "./VPDisplay";
import VPPicker from "./VPPicker";
import { vpsReducer } from "../../../lib/src/phrase-building/vps-reducer";

export function EditIcon() {
  return <i className="fas fa-edit" />;
}

// TODO: Ability to show all variations

function EditableVP({
  children,
  opts,
  // formChoice,
  noEdit,
  length,
  mode,
  sub,
  allVariations,
  entryFeeder,
}: {
  children: T.VPSelectionState;
  opts: T.TextOptions;
  // formChoice?: boolean;
  noEdit?: boolean;
  length?: "long" | "short";
  mode?: "text" | "blocks";
  sub?: string | JSX.Element;
  allVariations?: boolean;
  entryFeeder: T.EntryFeeder;
}) {
  const [editing, setEditing] = useState<boolean>(false);
  const [selectedLength, setSelectedLength] = useState<"long" | "short">(
    length || "short"
  );
  const [vps, setVps] = useState<T.VPSelectionState>({ ...children });
  useEffect(() => {
    setVps({ ...children });
  }, [children]);
  function handleReset() {
    // TODO: this is crazy, how does children get changed after calling setVps ???
    setVps(children);
    setEditing(false);
  }
  function handleSetForm(form: T.FormVersion) {
    setVps(vpsReducer(entryFeeder)(vps, { type: "set form", payload: form }));
  }
  return (
    <div className="mt-2 mb-4">
      {noEdit !== false && (
        <div
          className="text-left clickable mb-2"
          style={{ marginBottom: editing ? "0.5rem" : "-0.5rem" }}
          onClick={
            editing
              ? handleReset
              : () => {
                setEditing(true);
              }
          }
        >
          {!editing ? <EditIcon /> : <i className="fas fa-undo" />}
        </div>
      )}
      {editing && (
        <VPPicker
          opts={opts}
          entryFeeder={entryFeeder}
          vps={vps}
          onChange={setVps}
        />
      )}
      <VPDisplay
        opts={opts}
        VPS={vps}
        justify="left"
        onlyOne={allVariations === true ? false : "concat"}
        setForm={handleSetForm}
        onLengthChange={setSelectedLength}
        length={allVariations === true ? undefined : selectedLength}
        mode={mode}
        inlineFormChoice
      />
      {sub !== undefined && <div className="text-muted small">{sub}</div>}
    </div>
  );
}

export default EditableVP;
