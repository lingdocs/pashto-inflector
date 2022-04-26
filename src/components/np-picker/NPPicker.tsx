import PronounPicker from "./NPPronounPicker";
import NounPicker from "./NPNounPicker";
import ParticiplePicker from "./NPParticiplePicker";
// import { getEnglishPronoun } from "../../lib/english-pronoun-tools";
// import { ButtonSelect } from "@lingdocs/pashto-inflector";
import {
    randomPerson,
} from "../../lib/np-tools";
import { useState, useEffect } from "react";
import * as T from "../../types";
import { isSecondPerson } from "../../lib/phrase-building/vp-tools";
// import { capitalizeFirstLetter } from "../../lib/text-tools";

const npTypes: T.NPType[] = ["pronoun", "noun", "participle"];

function NPPicker(props: {
    heading?: JSX.Element | string,
    onChange: (nps: T.NPSelection | undefined) => void,
    np: T.NPSelection | undefined,
    counterPart: T.NPSelection | T.VerbObject | undefined,
    role: "subject" | "object" | "ergative",
    opts: T.TextOptions,
    cantClear?: boolean,
    is2ndPersonPicker?: boolean,
    entryFeeder: T.EntryFeeder,
}) {
    if (props.is2ndPersonPicker && ((props.np?.type !== "pronoun") || !isSecondPerson(props.np.person))) {
        throw new Error("can't use 2ndPerson NPPicker without a pronoun");
    }
    const [npType, setNpType] = useState<T.NPType | undefined>(props.np ? props.np.type : undefined);
    useEffect(() => {
        setNpType(props.np ? props.np.type : undefined);
    }, [props.np]);
    function handleClear() {
        if (props.np && props.np.type === "noun" && props.np.dynamicComplement) return;
        setNpType(undefined);
        props.onChange(undefined);
    }
    function handleNPTypeChange(ntp: T.NPType) {
        if (ntp === "pronoun") {
            const person = randomPerson({ counterPart: props.counterPart });
            const pronoun: T.PronounSelection = {
                type: "pronoun",
                person,
                distance: "far",
            };
            setNpType(ntp);
            props.onChange(pronoun);
        } else {
            props.onChange(undefined);
            setNpType(ntp);
        }
    }
    const isDynamicComplement = props.np && props.np.type === "noun" && props.np.dynamicComplement;
    const clearButton = (!props.cantClear && !props.is2ndPersonPicker && !isDynamicComplement) 
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
                {npType && clearButton}
            </div>
        </div>
        <div style={{ minWidth: "9rem" }}>
        {!npType && <div className="text-center">
            <div className="h6 mr-3">
                Choose NP
            </div>
            {npTypes.map((npt) => <div key={npt} className="mb-2">
                <button
                    key={npt}
                    type="button"
                    className="mr-2 btn btn-sm btn-outline-secondary"
                    onClick={() => handleNPTypeChange(npt)}
                >
                    {npt}
                </button>
            </div>)}
        </div>}
        {(npType === "pronoun" && props.np?.type === "pronoun")
            ? <PronounPicker
                role={props.role}
                pronoun={props.np}
                onChange={props.onChange}
                is2ndPersonPicker={props.is2ndPersonPicker}
                opts={props.opts}
            />
            : npType === "noun"
            ? <NounPicker
                entryFeeder={props.entryFeeder.nouns}
                noun={(props.np && props.np.type === "noun") ? props.np : undefined}
                onChange={props.onChange}
                opts={props.opts}
            />
            : npType === "participle"
            ? <ParticiplePicker
                entryFeeder={props.entryFeeder.verbs}
                participle={(props.np && props.np.type === "participle") ? props.np : undefined}
                onChange={props.onChange}
                opts={props.opts}
            />
            : null
        }
    </div>
    </>;
}

// {(npType && !isDynamicComplement) && }

export default NPPicker;