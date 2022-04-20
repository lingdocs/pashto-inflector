import EntrySelect from "../EntrySelect";
import * as T from "../../types";

function makeParticipleSelection(verb: T.VerbEntry): T.ParticipleSelection {
    return {
        type: "participle",
        verb,
    };
}

function NPParticiplePicker(props: ({
    verbs: T.VerbEntry[],
} | {
    verbs: (s: string) => T.VerbEntry[],
    getVerbByTs: (ts: number) => T.VerbEntry | undefined;
}) & {
    participle: T.ParticipleSelection | undefined,
    onChange: (p: T.ParticipleSelection | undefined) => void,
    opts: T.TextOptions,
}) {
    function onEntrySelect(entry: T.VerbEntry | undefined) {
        if (!entry) {
            props.onChange(undefined);
            return;
        }
        props.onChange(makeParticipleSelection(entry));
    }
    return <div style={{ maxWidth: "225px" }}>
        <h6>Participle</h6>
        <EntrySelect
            value={props.participle?.verb}
            {..."getVerbByTs" in props ? {
                getByTs: props.getVerbByTs,
                searchF: props.verbs,
            } : {
                entries: props.verbs,
            }}
            onChange={onEntrySelect}
            name="Pariticple"
            opts={props.opts}
        />
        {props.participle && <div className="my-2 d-flex flex-row justify-content-around align-items-center">
            <div>Masc.</div>
            <div>Plur.</div>
        </div>}
    </div>;
}

export default NPParticiplePicker;