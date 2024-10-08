import EntrySelect from "../selects/EntrySelect";
import * as T from "../../../types";
import { makeParticipleSelection } from "../../../lib/src/phrase-building/make-selections";

function NPParticiplePicker(props: {
  entryFeeder: T.EntryFeederSingleType<T.VerbEntry>;
  participle: T.ParticipleSelection | undefined;
  onChange: (p: T.ParticipleSelection | undefined) => void;
  opts: T.TextOptions;
}) {
  function onEntrySelect(entry: T.VerbEntry | undefined) {
    if (!entry) {
      props.onChange(undefined);
      return;
    }
    props.onChange(makeParticipleSelection(entry));
  }
  return (
    <div style={{ maxWidth: "225px" }}>
      <div className="h6">Participle</div>
      <EntrySelect
        value={props.participle?.verb}
        entryFeeder={props.entryFeeder}
        onChange={onEntrySelect}
        name="Pariticple"
        opts={props.opts}
      />
      {props.participle && (
        <div className="my-2 d-flex flex-row justify-content-around align-items-center">
          <div>Masc.</div>
          <div>Plur.</div>
        </div>
      )}
    </div>
  );
}

export default NPParticiplePicker;
