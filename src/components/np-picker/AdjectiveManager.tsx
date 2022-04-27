import * as T from "../../types";
import { useState } from "react";
import AdjectivePicker from "./AdjectivePicker";

function AdjectiveManager(props: {
    adjectives: T.AdjectiveSelection[],
    entryFeeder: T.EntryFeederSingleType<T.AdjectiveEntry>,
    opts: T.TextOptions,
    onChange: (adjs: T.AdjectiveSelection[]) => void, 
}) {
    const [adding, setAdding] = useState<boolean>(false);
    function handleChange(i: number) {
        return (a: T.AdjectiveSelection | undefined) => {
            if (a === undefined) return;
            const updated = [...props.adjectives];
            updated[i] = a;
            props.onChange(
                updated.filter((x): x is T.AdjectiveSelection => !!x)
            );
        };
    }
    function deleteAdj(i: number) {
        return () => {
            props.onChange(remove(props.adjectives, i));
        };
    }
    function handleAddNew(a: T.AdjectiveSelection | undefined) {
        if (a === undefined) return;
        setAdding(false);
        props.onChange([
            a,
            ...props.adjectives,
        ]);
    }
    // const flippedList = [...props.adjectives];
    // flippedList.reverse();
    // console.log(props.adjectives);
    return <div className="mb-1">
        {!!props.adjectives.length && <div className="d-flex flex-row justify-content-between">
            <h6>Adjectives</h6>
            {!adding ? <h6 onClick={() => setAdding(true)}>+ Adj.</h6> : <div></div>}
        </div>}
        {adding && <div>
            <div className="d-flex flex-row justify-content-between">
                <div>Add Adjective</div>
                <div onClick={() => setAdding(false)}>Cancel</div>
            </div>
            <AdjectivePicker
                noTitle
                adjective={undefined}
                entryFeeder={props.entryFeeder}
                opts={props.opts}
                onChange={handleAddNew}
            />
        </div>}
        {props.adjectives.map((adj, i) => (
            <div className="d-flex flex-row align-items-baseline">
                <AdjectivePicker
                    noTitle
                    key={`adj${i}`}
                    adjective={adj}
                    entryFeeder={props.entryFeeder}
                    opts={props.opts}
                    onChange={handleChange(i)}
                />
                <div onClick={deleteAdj(i)} className="ml-4">
                    <div className="fas fa-trash" />
                </div>
            </div>
        ))}
        {!adding && !props.adjectives.length && <h6 className="clickable" style={{ float: "right" }}>
            <div onClick={() => setAdding(true)}>+ Adj.</div>
        </h6>}
    </div>;
}

function remove<X>(arr: X[], i: number): X[] {
    return [
        ...arr.slice(0, i),
        ...arr.slice(i + 1),
    ];
}

export default AdjectiveManager;