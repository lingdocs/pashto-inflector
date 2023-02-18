import { makeAdverbSelection } from "../../../lib/src/phrase-building/make-selections";
import * as T from "../../../types";
import EntrySelect from "../EntrySelect";

function AdverbPicker(props: {
    entryFeeder: T.EntryFeederSingleType<T.AdverbEntry>,
    adjective: T.AdverbSelection | undefined,
    onChange: (p: T.AdverbSelection | undefined) => void,
    opts: T.TextOptions,
}) {
    function onEntrySelect(entry: T.AdverbEntry | undefined) {
        if (!entry) {
            return props.onChange(undefined);
        }
        props.onChange(makeAdverbSelection(entry));
    }
    return <div style={{ maxWidth: "225px", minWidth: "125px" }}>
        <div className="h6">Adverb</div>
        <div>
            <EntrySelect
                value={props.adjective?.entry}
                entryFeeder={props.entryFeeder}
                onChange={onEntrySelect}
                name="Adverb"
                opts={props.opts}
            />
        </div>
    </div>;
}

export default AdverbPicker;