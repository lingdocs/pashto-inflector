import * as T from "../../../types";
import EntrySelect from "../../EntrySelect";

function LocativeAdverbPicker(props: {
    entryFeeder: T.EntryFeederSingleType<T.LocativeAdverbEntry>,
    adjective: T.LocativeAdverbSelection | undefined,
    onChange: (p: T.LocativeAdverbSelection | undefined) => void,
    opts: T.TextOptions,
}) {
    function onEntrySelect(entry: T.LocativeAdverbEntry | undefined) {
        if (!entry) {
            return props.onChange(undefined);
        }
        props.onChange(makeLocativeAdverbSelection(entry));
    }
    return <div style={{ maxWidth: "225px", minWidth: "125px" }}>
        <h6>Loc. Adverb</h6>
        <div>
            <EntrySelect
                value={props.adjective?.entry}
                entryFeeder={props.entryFeeder}
                onChange={onEntrySelect}
                name="Locative Adverb"
                opts={props.opts}
            />
        </div>
    </div>;
}

export default LocativeAdverbPicker;

function makeLocativeAdverbSelection(entry: T.LocativeAdverbEntry): T.LocativeAdverbSelection {
    return {
        type: "loc. adv.",
        entry: entry,
    };
}