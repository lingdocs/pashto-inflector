import { useState, useEffect } from "react";
import * as T from "../../../types";
import AdjectivePicker from "../../np-picker/AdjectivePicker";
import LocativeAdverbPicker from "./LocativeAdverbPicker";
import SandwichPicker from "../../np-picker/SandwichPicker";
const compTypes: T.EqCompType[] = ["adjective", "loc. adv.", "sandwich"];

function EqCompPicker(props: {
    phraseIsComplete: boolean,
    onChange: (comp: T.EqCompSelection | undefined) => void,
    comp: T.EqCompSelection | undefined,
    opts: T.TextOptions,
    cantClear?: boolean,
    heading?: JSX.Element | string,
    entryFeeder: T.EntryFeeder,
}) {
    const [compType, setCompType] = useState<T.EqCompType | undefined>(props.comp
        ? props.comp.selection.type
        : undefined);
    useEffect(() => {
        setCompType(props.comp
            ? props.comp.selection.type
            : undefined);
    }, [props.comp]);
    function handleClear() {
        setCompType(undefined);
        props.onChange(undefined);
    }
    function handleCompTypeChange(ctp: T.EqCompType) {
        props.onChange(undefined);
        setCompType(ctp);
    }
    function handleSandwichExit() {
        setCompType(undefined);
        props.onChange(undefined);
    }
    const clearButton = (compType && !props.cantClear) 
        ? <button className="btn btn-sm btn-light mb-2" onClick={handleClear}>X</button>
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
        {!compType && <div className="text-center">
            <div className="h6 mr-3">
                Choose Complement
            </div>
            {compTypes.map((cpt) => <div key={cpt} className="mb-2">
                <button
                    key={cpt}
                    type="button"
                    className="mr-2 btn btn-sm btn-outline-secondary"
                    onClick={() => handleCompTypeChange(cpt)}
                >
                    {cpt}
                </button>
            </div>)}
        </div>}
        <div style={{ minWidth: "9rem" }}>
            {compType === "adjective" ? 
                <AdjectivePicker
                    entryFeeder={props.entryFeeder}
                    adjective={props.comp?.selection.type === "adjective" ? props.comp.selection : undefined}
                    opts={props.opts}
                    onChange={(a) => props.onChange(a ? { type: "EQComp", selection: a } : undefined)}
                    phraseIsComplete={props.phraseIsComplete}
                />
            : compType === "loc. adv."
            ? <LocativeAdverbPicker
                entryFeeder={props.entryFeeder.locativeAdverbs}
                adjective={props.comp?.selection.type === "loc. adv." ? props.comp.selection : undefined}
                opts={props.opts}
                onChange={(a) => props.onChange(a ? { type: "EQComp", selection: a } : undefined)}
            />
            : compType === "sandwich"
            ? <SandwichPicker
                onChange={(a) => props.onChange(a ? { type: "EQComp", selection: a } : undefined)}
                opts={props.opts}
                sandwich={props.comp?.selection.type === "sandwich" ? props.comp.selection : undefined}
                entryFeeder={props.entryFeeder}
                onExit={handleSandwichExit}
                // TODO: get phraseIsComplete working here
                phraseIsComplete={props.phraseIsComplete}
            />
            : null}
        </div>
    </>;
}

export default EqCompPicker;