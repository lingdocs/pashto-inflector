import * as T from "../../../types";
import ButtonSelect from "../selects/ButtonSelect";
import { RootsAndStems } from "../verb-info/VerbInfo";
import {
  getAbilityRootsAndStems,
  getPassiveRootsAndStems,
  getVerbInfo,
} from "../../../lib/src/verb-info";
import Hider from "../Hider";
import useStickyState from "../useStickyState";
import CompoundDisplay from "./CompoundDisplay";
import { VpsReducerAction } from "../../../lib/src/phrase-building/vps-reducer";
import { ensureNonComboVerbInfo } from "../../../lib/src/misc-helpers";

// TODO: dark on past tense selecitons

function VerbPicker(props: {
  vps: T.VPSelectionState;
  onChange: (a: VpsReducerAction) => void;
  opts: T.TextOptions;
  handleLinkClick: ((ts: number) => void) | "none";
}) {
  const [showRootsAndStems, setShowRootsAndStems] = useStickyState<boolean>(
    false,
    "showRootsAndStems"
  );
  const infoRaw = props.vps.verb
    ? getVerbInfo(props.vps.verb.verb.entry, props.vps.verb.verb.complement)
    : undefined;
  const info =
    !infoRaw || !props.vps.verb
      ? undefined
      : "stative" in infoRaw
      ? infoRaw[
          props.vps.verb.isCompound === "stative" ||
          props.vps.verb.isCompound === "generative stative"
            ? "stative"
            : "dynamic"
        ]
      : "transitive" in infoRaw
      ? infoRaw[
          props.vps.verb.transitivity === "grammatically transitive"
            ? "grammaticallyTransitive"
            : "transitive"
        ]
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
  function notInstransitive(
    t: "transitive" | "intransitive" | "grammatically transitive"
  ): "transitive" | "grammatically transitive" {
    return t === "intransitive" ? "transitive" : t;
  }
  function handleChangeTransitivity(
    payload: "transitive" | "grammatically transitive"
  ) {
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
  const passiveRootsAndStems =
    info && props.vps.verb.voice === "passive"
      ? getPassiveRootsAndStems(info)
      : undefined;
  const abilityRootsAndStems = (() => {
    try {
      return info && props.vps.verb.tenseCategory === "modal"
        ? getAbilityRootsAndStems(info)
        : undefined;
    } catch (e) {
      console.log("error making ability roots and stems", e);
      return undefined;
    }
  })();
  return (
    <div className="mb-3">
      {info && (
        <CompoundDisplay
          info={info}
          opts={props.opts}
          handleLinkClick={props.handleLinkClick}
        />
      )}
      {info && (
        <div className="mt-3 mb-1 text-center">
          <Hider
            showing={showRootsAndStems}
            label={`🌳 ${
              passiveRootsAndStems
                ? "Passive"
                : abilityRootsAndStems
                ? "Ability"
                : ""
            } Roots and Stems${
              info.type === "dynamic compound" ? " for Aux. Verb" : ""
            }`}
            handleChange={() => setShowRootsAndStems((p) => !p)}
            hLevel={5}
          >
            <RootsAndStems
              textOptions={props.opts}
              info={
                passiveRootsAndStems
                  ? passiveRootsAndStems
                  : abilityRootsAndStems
                  ? abilityRootsAndStems
                  : info.type === "dynamic compound"
                  ? ensureNonComboVerbInfo(getVerbInfo(info.auxVerb))
                  : info
              }
            />
          </Hider>
        </div>
      )}
      <div
        className="d-flex flex-row justify-content-around flex-wrap"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        {props.vps.verb && props.vps.verb.canChangeTransitivity && (
          <div className="text-center my-2">
            <ButtonSelect
              small
              options={[
                {
                  label: "gramm. trans.",
                  value: "grammatically transitive",
                },
                {
                  label: "trans.",
                  value: "transitive",
                },
              ]}
              value={notInstransitive(props.vps.verb.transitivity)}
              handleChange={handleChangeTransitivity}
            />
          </div>
        )}
        {props.vps.verb && props.vps.verb.canChangeVoice && (
          <div className="text-center my-2">
            <ButtonSelect
              small
              value={props.vps.verb.voice}
              options={
                props.vps.verb.tenseCategory === "imperative" // || props.vps.verb.tenseCategory === "modal")
                  ? [
                      {
                        label: "Active",
                        value: "active",
                      },
                    ]
                  : [
                      {
                        label: "Active",
                        value: "active",
                      },
                      {
                        label: "Passive",
                        value: "passive",
                      },
                    ]
              }
              handleChange={onVoiceSelect}
            />
          </div>
        )}
        {props.vps.verb && props.vps.verb.canChangeStatDyn && (
          <div className="text-center my-2">
            <ButtonSelect
              small
              options={[
                {
                  label:
                    infoRaw?.type === "dynamic or generative stative compound"
                      ? "gen. stative"
                      : "stative",
                  value: "stative",
                },
                {
                  label: "dynamic",
                  value: "dynamic",
                },
              ]}
              value={
                props.vps.verb.isCompound === "generative stative"
                  ? "stative"
                  : props.vps.verb.isCompound
                  ? props.vps.verb.isCompound
                  : "stative"
              }
              handleChange={handleChangeStatDyn}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default VerbPicker;
