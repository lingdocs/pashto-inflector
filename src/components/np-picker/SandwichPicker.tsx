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
    return <div>
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
    </div>;
}

export default SandwichPicker;