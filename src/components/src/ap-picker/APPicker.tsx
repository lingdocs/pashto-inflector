import { useState, useEffect } from "react";
import * as T from "../../../types";
import SandwichPicker from "../np-picker/SandwichPicker";
import AdverbPicker from "./AdverbPicker";
type APType = "adverb" | "sandwich"; 
const types: APType[] = ["adverb", "sandwich"];

function APPicker(props: {
    phraseIsComplete: boolean,
    onChange: (comp: T.APSelection | undefined) => void,
    AP: T.APSelection | undefined,
    opts: T.TextOptions,
    cantClear?: boolean,
    heading?: JSX.Element | string,
    entryFeeder: T.EntryFeeder,
    onRemove: () => void,
}) {
    const [type, setType] = useState<APType | undefined>(props.AP
        ? props.AP.selection.type
        : undefined);
    useEffect(() => {
        setType(props.AP
            ? props.AP.selection.type
            : undefined);
    }, [props.AP]);
    function handleClear() {
        setType(undefined);
        props.onChange(undefined);
    }
    function handleCompTypeChange(ctp: APType) {
        props.onChange(undefined);
        setType(ctp);
    }
    function handleSandwichExit() {
        setType(undefined);
        props.onChange(undefined);
    }
    const clearButton = (type && !props.cantClear) 
        ? <button className="btn btn-sm btn-light mb-2" onClick={handleClear}>X</button>
        : (!props.cantClear) 
        ? <div>
            <div className="clickable" onClick={props.onRemove}><i className="fas fa-trash" /></div>
        </div>
        : <div></div>;
    return <>
        <div className="d-flex flex-row justify-content-between">
            <div></div>
            <div>
                {typeof props.heading === "string"
                    ? <div className="h5 text-center">{props.heading}</div>
                    : props.heading}
            </div>
            <div>
                {clearButton}
            </div>
        </div>
        {!type && <div className="text-center">
            <div className="h6 mr-3">
                Choose AP
            </div>
            {types.map((apt) => <div key={apt} className="mb-2">
                <button
                    key={apt}
                    type="button"
                    className="mr-2 btn btn-sm btn-outline-secondary"
                    onClick={() => handleCompTypeChange(apt)}
                >
                    {apt}
                </button>
            </div>)}
        </div>}
        <div style={{ minWidth: "9rem" }}>
            {type === "adverb" ? 
                <AdverbPicker
                    entryFeeder={props.entryFeeder.adverbs}
                    adjective={props.AP?.selection.type === "adverb" ? props.AP.selection : undefined}
                    opts={props.opts}
                    onChange={(a) => props.onChange(a ? { type: "AP", selection: a } : undefined)}
                />
            : type === "sandwich" ?
                <SandwichPicker
                    onChange={(a) => props.onChange(a ? { type: "AP", selection: a } : undefined)}
                    opts={props.opts}
                    sandwich={props.AP?.selection.type === "sandwich" ? props.AP.selection : undefined}
                    entryFeeder={props.entryFeeder}
                    phraseIsComplete={props.phraseIsComplete}
                    onExit={handleSandwichExit}
                />
            : null}
        </div>
    </>;
}

export default APPicker;