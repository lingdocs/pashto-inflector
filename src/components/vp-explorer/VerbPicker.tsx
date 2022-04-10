import * as T from "../../types";
import ButtonSelect from "../ButtonSelect";
import { RootsAndStems } from "../verb-info/VerbInfo";
import { getVerbInfo } from "../../lib/verb-info";
import Hider from "../Hider";
import { makeVerbSelection } from "./verb-selection";
import EntrySelect from "../EntrySelect";
import useStickyState from "../../lib/useStickyState";


// TODO: dark on past tense selecitons

function VerbPicker(props: ({
    verbs: T.VerbEntry[],
} | {
    verbs: (s: string) => T.VerbEntry[],
    getVerbByTs: (ts: number) => T.VerbEntry | undefined;
}) & {
    verb: T.VerbSelection,
    subject: T.NPSelection | undefined,
    onChange: (p: T.VerbSelection) => void,
    changeSubject: (p: T.NPSelection | undefined) => void,
    opts: T.TextOptions,
    verbLocked: boolean,
}) {
    const [showRootsAndStems, setShowRootsAndStems] = useStickyState<boolean>(false, "showRootsAndStems");
    const infoRaw = props.verb ? getVerbInfo(props.verb.verb.entry, props.verb.verb.complement) : undefined;
    const info = (!infoRaw || !props.verb)
        ? undefined
        : ("stative" in infoRaw)
        ? infoRaw[props.verb.isCompound === "stative" ? "stative" : "dynamic"]
        : ("transitive" in infoRaw)
        ? infoRaw[props.verb.transitivity === "grammatically transitive" ? "grammaticallyTransitive" : "transitive"]
        : infoRaw;
    if (info && ("stative" in info || "transitive" in info)) {
        return <div>ERROR: Verb version should be select first</div>;
    }
    // const [filters, useFilters] = useState<Filters>({
    //     stative: true,
    //     dynamic: true,
    //     transitive: true,
    //     intransitive: true,
    //     grammaticallyTransitive: true,
    // });
    function onVerbSelect(v: T.VerbEntry | undefined) {
        // TODO: what to do when clearing
        if (!v) {
            return;
        }
        props.onChange(makeVerbSelection(v, props.changeSubject, props.verb));
    }
    function onVoiceSelect(value: "active" | "passive") {
        if (props.verb && props.verb.changeVoice) {
            if (value === "passive" && (typeof props.verb.object === "object")) {
                props.changeSubject(props.verb.object);
            }
            if (value === "active") {
                props.changeSubject(undefined);
            }
            props.onChange(props.verb.changeVoice(value, value === "active" ? props.subject : undefined));
        }
    }
    function notInstransitive(t: "transitive" | "intransitive" | "grammatically transitive"): "transitive" | "grammatically transitive" {
        return t === "intransitive" ? "transitive" : t;
    }
    function handleChangeTransitivity(t: "transitive" | "grammatically transitive") {
        if (props.verb && props.verb.changeTransitivity) {
            props.onChange(props.verb.changeTransitivity(t));
        }
    }
    function handleChangeStatDyn(c: "stative" | "dynamic") {
        if (props.verb && props.verb.changeStatDyn) {
            props.onChange(props.verb.changeStatDyn(c));
        }
    }
    return <div className="mb-3">
        {!props.verbLocked && <div style={{ maxWidth: "300px", margin: "0 auto" }}>
            <div className="h5">Verb:</div>
            <EntrySelect
                {..."getVerbByTs" in props ? {
                    searchF: props.verbs,
                    getByTs: props.getVerbByTs,
                } : {
                    entries: props.verbs,
                }}
                value={props.verb?.verb}
                onChange={onVerbSelect}
                name="Verb"
                isVerbSelect
                opts={props.opts}
            />
        </div>}
        {info && <div className="mt-3 mb-1 text-center">
            <Hider
                showing={showRootsAndStems}
                label="🌳 Roots and Stems"      
                handleChange={() => setShowRootsAndStems(p => !p)}
                hLevel={5}
            >
                <RootsAndStems
                    textOptions={props.opts}
                    info={info}
                />
            </Hider>
        </div>}
        <div className="d-flex flex-row justify-content-around flex-wrap" style={{ maxWidth: "400px", margin: "0 auto" }}>
            {props.verb && props.verb.changeTransitivity && <div className="text-center my-2">
                <ButtonSelect
                    small
                    options={[{
                        label: "gramm. trans.",
                        value: "grammatically transitive",
                    }, {
                        label: "trans.",
                        value: "transitive",
                    }]}
                    value={notInstransitive(props.verb.transitivity)}
                    handleChange={handleChangeTransitivity}
                />
            </div>}
            {props.verb && props.verb.changeVoice && <div className="text-center my-2">
                <ButtonSelect
                    small
                    value={props.verb.voice}
                    options={[{
                        label: "Active",
                        value: "active",
                    }, {
                        label: "Passive",
                        value: "passive",
                    }]}
                    handleChange={onVoiceSelect}
                />
            </div>}
            {props.verb && props.verb.changeStatDyn && <div className="text-center my-2">
                <ButtonSelect
                    small
                    options={[{
                        label: "stative",
                        value: "stative",
                    }, {
                        label: "dynamic",
                        value: "dynamic",
                    }]}
                    value={props.verb.isCompound ? props.verb.isCompound : "stative"}
                    handleChange={handleChangeStatDyn}
                />
            </div>}
        </div>
    </div>;
}


export default VerbPicker;