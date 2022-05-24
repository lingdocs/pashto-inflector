import * as T from "../../types";
import { sandwiches } from "../../lib/sandwiches";
import { SandwichSelect } from "../../components/EntrySelect";
import { useState } from "react";
import NPPicker from "./NPPicker";

function SandwichPicker(props: {
    opts: T.TextOptions,
    onChange: (s: T.SandwichSelection<T.Sandwich> | undefined) => void,
    sandwich: T.SandwichSelection<T.Sandwich> | undefined;
    entryFeeder: T.EntryFeeder,
    phraseIsComplete: boolean,
    onExit: () => void,
}) {
    const [sandwichBase, setSandwichBase] = useState<T.Sandwich | undefined>(undefined);
    function handleNounChange(n: T.NPSelection | undefined) {
        if (!n) {
            props.onChange(undefined);
            return;
        }
        if (!sandwichBase) return;
        props.onChange({
            ...sandwichBase,
            inside: n,
        });
    }
    function handleSandwichChange(s: T.Sandwich | undefined) {
        if (!s) {
            setSandwichBase(undefined);
            props.onChange(undefined);
            return;
        }
        setSandwichBase(s);
        if (!props.sandwich) return;
        props.onChange({
            ...props.sandwich,
            ...s,
        });
    }
    function handleExit() {
        props.onExit();
    }
    return <div>
        <div className="d-flex flex-row justify-content-between">
            <div></div>
            <div className="text-center">🥪 Sandwich</div>
            <div className="clickable" onClick={handleExit}>
                <i className="fas fa-trash" />
            </div>
        </div>
        <div style={{ border: "1px #6C757D solid", padding: "3px" }}>
        {sandwichBase && <div className="mb-2" style={{ margin: "0 auto" }}>
            <NPPicker
                onChange={handleNounChange}
                np={props.sandwich ? props.sandwich.inside : undefined}
                counterPart={undefined}
                opts={props.opts}
                role="object"
                cantClear={true}
                entryFeeder={props.entryFeeder}
                phraseIsComplete={props.phraseIsComplete}
            />
        </div>}
        <SandwichSelect
            name="sandwich"
            opts={props.opts}
            sandwiches={sandwiches}
            value={sandwichBase}
            onChange={handleSandwichChange}
        />
        </div>
    </div>;
}

export default SandwichPicker;