import * as T from "../../types";
import EntrySelect from "../EntrySelect";

function AdjectivePicker(props: {
    entryFeeder: T.EntryFeederSingleType<T.AdjectiveEntry>,
    adjective: T.AdjectiveSelection | undefined,
    onChange: (p: T.AdjectiveSelection | undefined) => void,
    opts: T.TextOptions,
    noTitle?: boolean,
}) {
    function onEntrySelect(entry: T.AdjectiveEntry | undefined) {
        if (!entry) {
            return props.onChange(undefined);
        }
        props.onChange(makeAdjectiveSelection(entry));
    }
    return <div style={{ maxWidth: "225px", minWidth: "125px" }}>
        {!props.noTitle && <h6>Adjective</h6>}
        <div>
            <EntrySelect
                value={props.adjective?.entry}
                entryFeeder={props.entryFeeder}
                onChange={onEntrySelect}
                name="Adjective"
                opts={props.opts}
            />
        </div>
    </div>;
}

function makeAdjectiveSelection(entry: T.AdjectiveEntry): T.AdjectiveSelection {
    return {
        type: "adjective",
        entry: entry,
    };
}

export default AdjectivePicker;