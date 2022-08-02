import * as T from "../../types";
import { useState } from "react";
import AdjectivePicker from "./AdjectivePicker";
import classNames from "classnames";

function AdjectiveManager(props: {
    adjectives: T.AdjectiveSelection[],
    entryFeeder: T.EntryFeeder,
    opts: T.TextOptions,
    demonstrative: T.NounSelection["demonstrative"],
    onChange: (adjs: T.AdjectiveSelection[]) => void,
    onDemonstrativeChange: (dem: T.NounSelection["demonstrative"]) => void,
    phraseIsComplete: boolean,
}) {
    const [adding, setAdding] = useState<boolean>(false);
    const [addingDemonstrative, setAddingDemonstrative] = useState<boolean>(false);
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
        {adding && <div>
            <div className="d-flex flex-row justify-content-between mb-1">
                <div>Add Adjective</div>
                <div className="clickable" onClick={() => setAdding(false)}>
                    <i className="fas fa-trash" />
                </div>
            </div>
            <AdjectivePicker
                phraseIsComplete={props.phraseIsComplete}
                noTitle
                adjective={undefined}
                entryFeeder={props.entryFeeder}
                opts={props.opts}
                onChange={handleAddNew}
            />
        </div>}
        {addingDemonstrative && <div>
            <div className="d-flex flex-row justify-content-between mb-1">
                <div>Add Demonstrative</div>
                <div className="clickable" onClick={() => {
                    setAddingDemonstrative(false);
                    props.onDemonstrativeChange(undefined);
                }}>
                    <i className="fas fa-trash" />
                </div>
            </div>
            <DemonstrativePicker
                demonstrative={props.demonstrative}
                onChange={props.onDemonstrativeChange}
            />
        </div>}
        {props.adjectives.map((adj, i) => <div key={i}>
            <div className="d-flex flex-row justify-content-between">
                <div>Adjective</div>
                <div className="d-flex flex-row align-items-baseline">
                    {!!props.adjectives.length && !adding && <div>
                        <h6 className="clickable" onClick={() => setAdding(true)}>+ Adj.</h6>
                    </div>}
                    <div onClick={deleteAdj(i)} className="ml-4">
                        <div className="fas fa-trash" />
                    </div>
                </div>
            </div>
            <AdjectivePicker
                phraseIsComplete={props.phraseIsComplete}
                noTitle
                key={`adj${i}`}
                adjective={adj}
                entryFeeder={props.entryFeeder}
                opts={props.opts}
                onChange={handleChange(i)}
            />
        </div>)}
        {!adding && !props.adjectives.length && <h6 className="clickable" style={{ float: "right" }}>
            <div className="clickable" onClick={() => setAdding(true)}>+ Adj.</div>
        </h6>}
        {/* {!addingDemonstrative && !props.demonstrative && <h6 className="clickable mr-2" style={{ float: "right" }}>
            <div className="clickable" onClick={() => setAddingDemonstrative(true)}>+ Demons.</div>
        </h6>} */}
    </div>;
}

function DemonstrativePicker({ demonstrative, onChange }: {
    demonstrative: T.NounSelection["demonstrative"],
    onChange: (dem: T.NounSelection["demonstrative"]) => void,
}) {
    function handleDChange(d: "daa" | "hagha" | "dagha") {
        if (!demonstrative) {
            onChange({
                type: "demonstrative",
                demonstrative: d,
                hideNoun: false,
            });
        } else {
            onChange({
                ...demonstrative,
                demonstrative: d,
            });
        }
    }
    return <div className="d-flex flex-row justify-content-around py-1">
        <div>
            <button
                className={classNames("btn", "btn-outline-secondary", { active: demonstrative?.demonstrative === "daa" })}
                onClick={() => handleDChange("daa")}
            >دا</button>
        </div>
        <div>
            <button
                className={classNames("btn", "btn-outline-secondary", { active: demonstrative?.demonstrative === "hagha" })}
                onClick={() => handleDChange("hagha")}
            >هغه</button>
        </div>
        <div>
            <button
                className={classNames("btn", "btn-outline-secondary", { active: demonstrative?.demonstrative === "dagha" })}
                onClick={() => handleDChange("dagha")}
            >دغه</button>
        </div>
    </div>;
}

function remove<X>(arr: X[], i: number): X[] {
    return [
        ...arr.slice(0, i),
        ...arr.slice(i + 1),
    ];
}

export default AdjectiveManager;