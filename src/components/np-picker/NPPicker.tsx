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

export const shrunkenBackground = "rgba(255, 206, 43, 0.15)";

function NPPicker(props: {
    heading?: JSX.Element | string,
    onChange: (nps: T.NPSelection | undefined) => void,
    np: T.NPSelection | undefined,
    counterPart: T.NPSelection | T.VerbObject | undefined,
    role: "subject" | "object" | "ergative" | "possesor",
    opts: T.TextOptions,
    cantClear?: boolean,
    is2ndPersonPicker?: boolean,
    entryFeeder: T.EntryFeeder,
    phraseIsComplete: boolean,
    isShrunk?: boolean,
}) {
    if (props.is2ndPersonPicker && ((props.np?.type !== "pronoun") || !isSecondPerson(props.np.person))) {
        throw new Error("can't use 2ndPerson NPPicker without a pronoun");
    } 
    const [addingPoss, setAddingPoss] = useState<boolean>(false);
    const [npType, setNpType] = useState<T.NPType | undefined>(props.np ? props.np.type : undefined);
    const onChange = (np: T.NPSelection | undefined) => {
        props.onChange(ensureSingleShrink(props.np, np))
    }
    useEffect(() => {
        setNpType(props.np ? props.np.type : undefined);
    }, [props.np]);
    function handleClear() {
        if (props.np && props.np.type === "noun" && props.np.dynamicComplement) return;
        setNpType(undefined);
        onChange(undefined);
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
            onChange(pronoun);
        } else {
            onChange(undefined);
            setNpType(ntp);
        }
    }
    // TODO: REMOVE
    function handlePossesiveChange(p: T.NPSelection | undefined) {
        if (!props.np || props.np.type === "pronoun") return;
        if (!p) {
            onChange({
                ...props.np,
                possesor: undefined,
            });
            return;
        }
        const isNewPosesser = checkForNewPossesor(p, props.np.possesor);
        const possesor: T.PossesorSelection = {
            np: p,
            shrunken: (!isNewPosesser && props.np.possesor) ? props.np.possesor.shrunken : false,
        };
        onChange({
            ...props.np,
            possesor,
        });
    }
    function handleToggleShrunken() {
        if (!props.np || props.np.type === "pronoun" || !props.np.possesor || !props.phraseIsComplete) return;
        onChange({
            ...props.np,
            possesor: {
                ...props.np.possesor,
                shrunken: !props.np.possesor.shrunken,
            },
        });
    }
    const isDynamicComplement = props.np && props.np.type === "noun" && props.np.dynamicComplement;
    const clearButton = (!props.cantClear && !props.is2ndPersonPicker && !isDynamicComplement) 
        ? <button className="btn btn-sm btn-light mb-2" onClick={handleClear}>X</button>
        : <div></div>;
    const possesiveLabel = props.np?.type === "participle" ? "Subj/Obj" : "Possesor";
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
        {(props.np && props.np.type !== "pronoun" && (props.np.possesor || addingPoss)) && <div className="mb-3" style={{
            paddingLeft: "0.65rem",
            borderLeft: "2px solid grey",
            background: (props.np.possesor?.shrunken && !props.isShrunk) ? shrunkenBackground : "inherit",    
        }}>
            <div className="d-flex flex-row text-muted mb-2">
                <div>{possesiveLabel}:</div>
                {(props.np.possesor && !props.isShrunk) && <div className="clickable ml-3 mr-2" onClick={handleToggleShrunken}>
                    {!props.np.possesor.shrunken ? "🪄" : "👶"}
                </div>}
                <div className="clickable ml-2" onClick={() => {
                    setAddingPoss(false);
                    handlePossesiveChange(undefined);
                }}>
                    <i className="fas fa-trash" />  
                </div>
            </div>
            <NPPicker
                phraseIsComplete={props.phraseIsComplete}
                onChange={handlePossesiveChange}
                counterPart={undefined}
                cantClear
                np={props.np.possesor ? props.np.possesor.np : undefined}
                role="possesor"
                opts={props.opts}
                entryFeeder={props.entryFeeder}
            />
        </div>}
        {(npType === "noun" || npType === "participle") && props.np && !addingPoss && <div>
            <span className="clickable text-muted" onClick={() => setAddingPoss(true)}>+ {possesiveLabel}</span>
        </div>}
        {(npType === "pronoun" && props.np?.type === "pronoun")
            ? <PronounPicker
                role={props.role}
                pronoun={props.np}
                onChange={onChange}
                is2ndPersonPicker={props.is2ndPersonPicker}
                opts={props.opts}
            />
            : npType === "noun"
            ? <NounPicker
                entryFeeder={props.entryFeeder}
                noun={(props.np && props.np.type === "noun") ? props.np : undefined}
                onChange={onChange}
                opts={props.opts}
            />
            : npType === "participle"
            ? <ParticiplePicker
                entryFeeder={props.entryFeeder.verbs}
                participle={(props.np && props.np.type === "participle") ? props.np : undefined}
                onChange={onChange}
                opts={props.opts}
            />
            : null
        }
    </div>
    </>;
}

function ensureSingleShrink(old: T.NPSelection | undefined, s: T.NPSelection | undefined): T.NPSelection | undefined {
    if (!s) return s;
    function countShrinks(np: T.NPSelection): number {
        if (np.type === "pronoun") return 0;
        if (!np.possesor) return 0;
        return (np.possesor.shrunken ? 1 : 0) + countShrinks(np.possesor.np);
    }
    function keepNewShrink(old: T.NPSelection, n: T.NPSelection): T.NPSelection {
        if (n.type === "pronoun") return n;
        if (old.type === "pronoun" || !n.possesor || !old.possesor) return n;
        if (n.possesor.shrunken && !old.possesor.shrunken) {
            return {
                ...n,
                possesor: {
                    ...n.possesor,
                    np: removeShrinks(n.possesor.np),
                },
            };
        }
        return {
            ...n,
            possesor: {
                shrunken: false,
                np: keepNewShrink(old.possesor.np, n.possesor.np),
            },
        }
    }
    function removeShrinks(n: T.NPSelection): T.NPSelection {
        if (n.type === "pronoun") return n;
        if (!n.possesor) return n;
        return {
            ...n,
            possesor: {
                shrunken: false,
                np: removeShrinks(n.possesor.np),
            },
        };
    }
    if (!old) return s;
    if (s.type === "pronoun") return s;
    if (!s.possesor) return s;
    const numOfShrinks = countShrinks(s);
    if (numOfShrinks < 2) return s;
    return keepNewShrink(old, s);
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

export default NPPicker;