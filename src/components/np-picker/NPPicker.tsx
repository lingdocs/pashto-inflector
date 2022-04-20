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
    onChange: (nps: T.NPSelection | undefined) => void,
    np: T.NPSelection | undefined,
    counterPart: T.NPSelection | T.VerbObject | undefined,
    asObject?: boolean,
    opts: T.TextOptions,
    cantClear?: boolean,
    is2ndPersonPicker?: boolean,
} & ({
    nouns: (s: string) => T.NounEntry[],
    verbs: (s: string) => T.VerbEntry[],
    getNounByTs: (ts: number) => T.NounEntry | undefined,
    getVerbByTs: (ts: number) => T.VerbEntry | undefined,
} | {
    nouns: T.NounEntry[],
    verbs: T.VerbEntry[],
})) {
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
    const clearButton = !props.cantClear
        ? <button className="btn btn-sm btn-light mb-2" onClick={handleClear}>X</button>
        : <div></div>;
    return <div style={{ minWidth: "9rem" }}>
        {!npType && <div className="text-center mt-3">
            <div className="h6 mr-3">
                Choose NP
            </div>
            {npTypes.map((npt) => <div className="mb-2">
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
                asObject={props.asObject}
                pronoun={props.np}
                onChange={props.onChange}
                clearButton={clearButton}
                is2ndPersonPicker={props.is2ndPersonPicker}
                opts={props.opts}
            />
            : npType === "noun"
            ? <NounPicker
                {..."getNounByTs" in props ? {
                    nouns: props.nouns,
                    getNounByTs: props.getNounByTs,
                } : {
                    nouns: props.nouns,
                }}
                noun={(props.np && props.np.type === "noun") ? props.np : undefined}
                onChange={props.onChange}
                clearButton={!isDynamicComplement ? clearButton : undefined}
                opts={props.opts}
            />
            : npType === "participle"
            ? <ParticiplePicker
                {..."getVerbByTs" in props ? {
                    verbs: props.verbs,
                    getVerbByTs: props.getVerbByTs,
                } : {
                    verbs: props.verbs,
                }}
                participle={(props.np && props.np.type === "participle") ? props.np : undefined}
                onChange={props.onChange}
                clearButton={clearButton}
                opts={props.opts}
            />
            : null
        }
    </div>;
}

// {(npType && !isDynamicComplement) && }

export default NPPicker;