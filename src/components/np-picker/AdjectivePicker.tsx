import { useState } from "react";
import * as T from "../../types";
import EntrySelect from "../EntrySelect";
import SandwichPicker from "./SandwichPicker";

function AdjectivePicker(props: {
    entryFeeder: T.EntryFeeder,
    adjective: T.AdjectiveSelection | undefined,
    onChange: (p: T.AdjectiveSelection | undefined) => void,
    opts: T.TextOptions,
    noTitle?: boolean,
    phraseIsComplete: boolean,
}) {
    const [addingSandwich, setAddingSandwich] = useState<boolean>(false);
    function onEntrySelect(entry: T.AdjectiveEntry | undefined) {
        if (!entry) {
            return props.onChange(undefined);
        }
        props.onChange(makeAdjectiveSelection(entry));
    }
    function handleSandwichChange(s: T.SandwichSelection<T.Sandwich> | undefined) {
        if (!props.adjective) return;
        props.onChange({
            ...props.adjective,
            sandwich: s,
        });
        if (!s) {
            setAddingSandwich(false);
        }
    }
    function handleSandwichExit() {
        setAddingSandwich(false);
        props.onChange(undefined);
    }
    return <div style={{ maxWidth: "225px", minWidth: "125px" }}>
        {(props.adjective?.sandwich || addingSandwich) && <SandwichPicker
            onChange={handleSandwichChange}
            opts={props.opts}
            sandwich={props.adjective?.sandwich}
            entryFeeder={props.entryFeeder}
            onExit={handleSandwichExit}
            // TODO: not allowing shrinking any possesisives on sandwiches for now - need to work with the blocks and their special behaviour
            phraseIsComplete={false}
        />}
        <div className="d-flex flex-row justify-content-between align-items-baseline">
            {!props.noTitle && <div>
                <h6>Adjective</h6>
            </div>}
            {(!addingSandwich && props.adjective && !props.adjective?.sandwich)
                ? <div className="clickable" onClick={() => setAddingSandwich(true)}>+ Sandwich</div>
                : <div></div>}
        </div>
        <div className="mt-1">
            <EntrySelect
                value={props.adjective?.entry}
                entryFeeder={props.entryFeeder.adjectives}
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
        sandwich: undefined,
    };
}

export default AdjectivePicker;