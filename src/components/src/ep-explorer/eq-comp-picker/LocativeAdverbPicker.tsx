import { makeLocativeAdverbSelection } from "../../../../lib/src/phrase-building/make-selections";
import * as T from "../../../../types";
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
        <div className="h6">Locative Adverb</div>
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