import PronounPicker from "./NPPronounPicker";
import NounPicker from "./NPNounPicker";
import ParticiplePicker from "./NPParticiplePicker";
import {
    randomPerson,
} from "../../lib/np-tools";
import { useState, useEffect } from "react";
import * as T from "../../types";
import { isSecondPerson } from "../../lib/phrase-building/vp-tools";

const npTypes: T.NPType[] = ["pronoun", "noun", "participle"];

function NPPicker(props: {
    heading?: JSX.Element | string,
    onChange: (nps: T.NPSelection | undefined) => void,
    np: T.NPSelection | undefined,
    counterPart: T.NPSelection | T.VerbObject | undefined,
    role: "subject" | "object" | "ergative" | "possesor",
    opts: T.TextOptions,
    handleShrinkPossesive: (uid: number | undefined) => void,
    shrunkenPossesiveInPhrase: number | undefined,
    cantClear?: boolean,
    is2ndPersonPicker?: boolean,
    entryFeeder: T.EntryFeeder,
}) {
    if (props.is2ndPersonPicker && ((props.np?.type !== "pronoun") || !isSecondPerson(props.np.person))) {
        throw new Error("can't use 2ndPerson NPPicker without a pronoun");
    }
    const [addingPoss, setAddingPoss] = useState<boolean>(false);
    const [npType, setNpType] = useState<T.NPType | undefined>(props.np ? props.np.type : undefined);
    useEffect(() => {
        setNpType(props.np ? props.np.type : undefined);
        // setAddingPoss(false);
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
    function handlePossesiveChange(p: T.NPSelection | undefined) {
        if (!props.np || props.np.type === "pronoun") return;
        if (!p) {
            props.onChange({
                ...props.np,
                possesor: undefined,
            });
            return;
        }
        const isNewPosesser = checkForNewPossesor(p, props.np.possesor);
        const possesor = {
            np: p,
            uid: (!isNewPosesser && props.np.possesor) ? props.np.possesor.uid : makeUID(),
        };
        props.onChange({
            ...props.np,
            possesor,
        });
    }
    const isDynamicComplement = props.np && props.np.type === "noun" && props.np.dynamicComplement;
    const clearButton = (!props.cantClear && !props.is2ndPersonPicker && !isDynamicComplement) 
        ? <button className="btn btn-sm btn-light mb-2" onClick={handleClear}>X</button>
        : <div></div>;
    const possesiveUid = (props.np && props.np.type !== "pronoun" && props.np.possesor)
        ? props.np.possesor.uid
        : undefined;
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
        {(props.np && props.np.type !== "pronoun" && (props.np.possesor || addingPoss)) && <div className="mb-3" style={{ paddingLeft: "0.5rem", borderLeft: "1px solid grey" }}>
            <div className="d-flex flex-row text-muted mb-2">
                <div>Possesive:</div>
                {props.np.possesor && <div className="clickable mx-2" onClick={() => {
                    props.handleShrinkPossesive(possesiveUid === props.shrunkenPossesiveInPhrase
                        ? undefined
                        : possesiveUid
                    );
                }}>
                    {possesiveUid === props.shrunkenPossesiveInPhrase ? "👶 Shrunken" : "Shrink"}
                </div>}
                <div className="clickable ml-2" onClick={() => {
                    setAddingPoss(false);
                    handlePossesiveChange(undefined);
                }}>
                    <i className="fas fa-trash" />  
                </div>
            </div>
            <NPPicker
                onChange={handlePossesiveChange}
                counterPart={undefined}
                cantClear
                np={props.np.possesor ? props.np.possesor.np : undefined}
                handleShrinkPossesive={props.handleShrinkPossesive}
                shrunkenPossesiveInPhrase={props.shrunkenPossesiveInPhrase}
                role="possesor"
                opts={props.opts}
                entryFeeder={props.entryFeeder}
            />
        </div>}
        {(npType === "noun" || npType === "participle") && props.np && !addingPoss && <div>
            <span className="clickable text-muted" onClick={() => setAddingPoss(true)}>+ Possesive</span>
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
                entryFeeder={props.entryFeeder}
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

function checkForNewPossesor(n: T.NPSelection | undefined, old: T.PossesorSelection | undefined): boolean {
    if (!old || !n) {
        return true;
    }
    if (n.type !== old.np.type) {
        return true;
    }
    if (n.type === "pronoun") return false;
    if (n.type === "noun" && old.np.type === "noun") {
        return n.entry.ts !== old.np.entry.ts;
    }
    if (n.type === "participle" && old.np.type === "participle") {
        return n.verb.entry.ts !== old.np.verb.entry.ts;
    }
    return false;
}

function makeUID() {
    return Math.floor(Math.random() * 10000000);
}

export default NPPicker;