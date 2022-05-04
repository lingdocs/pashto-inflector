import * as T from "../../types";
import ButtonSelect from "../ButtonSelect";
import { RootsAndStems } from "../verb-info/VerbInfo";
import { getVerbInfo } from "../../lib/verb-info";
import Hider from "../Hider";
import useStickyState from "../../lib/useStickyState";
import CompoundDisplay from "./CompoundDisplay";
import {
    VpsReducerAction
} from "./vps-reducer";

// TODO: dark on past tense selecitons

function VerbPicker(props: {
    vps: T.VPSelectionState,
    onChange: (a: VpsReducerAction) => void,
    opts: T.TextOptions,
    handleLinkClick: ((ts: number) => void) | "none",
}) {
    const [showRootsAndStems, setShowRootsAndStems] = useStickyState<boolean>(false, "showRootsAndStems");
    const infoRaw = props.vps.verb ? getVerbInfo(props.vps.verb.verb.entry, props.vps.verb.verb.complement) : undefined;
    const info = (!infoRaw || !props.vps.verb)
        ? undefined
        : ("stative" in infoRaw)
        ? infoRaw[props.vps.verb.isCompound === "stative" ? "stative" : "dynamic"]
        : ("transitive" in infoRaw)
        ? infoRaw[props.vps.verb.transitivity === "grammatically transitive" ? "grammaticallyTransitive" : "transitive"]
        : infoRaw;
    if (info && ("stative" in info || "transitive" in info)) {
        return <div>ERROR: Verb version should be select first</div>;
    }
    function onVoiceSelect(value: "active" | "passive") {
        props.onChange({
            type: "set voice",
            payload: value,
        });
    }
    function notInstransitive(t: "transitive" | "intransitive" | "grammatically transitive"): "transitive" | "grammatically transitive" {
        return t === "intransitive" ? "transitive" : t;
    }
    function handleChangeTransitivity(payload: "transitive" | "grammatically transitive") {
        props.onChange({
            type: "set transitivity",
            payload,
        });
    }
    function handleChangeStatDyn(payload: "stative" | "dynamic") {
        props.onChange({
            type: "set statDyn",
            payload,
        });
    }
    return <div className="mb-3">
        {info && <CompoundDisplay
            info={info}
            opts={props.opts}
            handleLinkClick={props.handleLinkClick}
        />}
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
            {props.vps.verb && props.vps.verb.canChangeTransitivity && <div className="text-center my-2">
                <ButtonSelect
                    small
                    options={[{
                        label: "gramm. trans.",
                        value: "grammatically transitive",
                    }, {
                        label: "trans.",
                        value: "transitive",
                    }]}
                    value={notInstransitive(props.vps.verb.transitivity)}
                    handleChange={handleChangeTransitivity}
                />
            </div>}
            {props.vps.verb && props.vps.verb.canChangeVoice && <div className="text-center my-2">
                <ButtonSelect
                    small
                    value={props.vps.verb.voice}
                    options={props.vps.verb.tenseCategory === "imperative"  
                    ? [{
                        label: "Active",
                        value: "active",
                    }]
                    : [{
                        label: "Active",
                        value: "active",
                    }, {
                        label: "Passive",
                        value: "passive",
                    }]}
                    handleChange={onVoiceSelect}
                />
            </div>}
            {props.vps.verb && props.vps.verb.canChangeStatDyn && <div className="text-center my-2">
                <ButtonSelect
                    small
                    options={[{
                        label: "stative",
                        value: "stative",
                    }, {
                        label: "dynamic",
                        value: "dynamic",
                    }]}
                    value={props.vps.verb.isCompound ? props.vps.verb.isCompound : "stative"}
                    handleChange={handleChangeStatDyn}
                />
            </div>}
        </div>
    </div>;
}


export default VerbPicker;