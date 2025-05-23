import { makeNounSelection } from "./make-selections";
import * as T from "../../../types";
import { getVerbInfo } from "../verb-info";
import {
  adjustObjectSelection,
  getObjectSelection,
  getSubjectSelection,
  makeObjectSelection,
  makeSubjectSelection,
  moveObjectToEnd,
} from "./blocks-utils";
import { takesExternalComplement } from "./vp-tools";

export function makeVPSelectionState(
  verb: T.VerbEntry,
  os?: T.VPSelectionState
): T.VPSelectionState {
  const info = getVerbInfo(verb.entry, verb.complement);
  const subject =
    os?.verb.voice === "passive" && info.type === "dynamic compound"
      ? makeNounSelection(
          info.objComplement.entry as T.NounEntry,
          undefined,
          "dynamic"
        )
      : os?.blocks
      ? getSubjectSelection(os.blocks).selection
      : undefined;
  function getTransObjFromos() {
    const osObj = os ? getObjectSelection(os.blocks).selection : undefined;
    if (
      !os ||
      osObj === "none" ||
      typeof osObj === "number" ||
      os.verb.isCompound === "dynamic" ||
      (osObj?.selection.type === "noun" &&
        (osObj.selection.dynamicComplement ||
          osObj.selection.genStativeComplement))
    )
      return undefined;
    return osObj;
  }
  const transitivity: T.Transitivity =
    "grammaticallyTransitive" in info ? "transitive" : info.transitivity;
  const object =
    transitivity === "grammatically transitive"
      ? T.Person.ThirdPlurMale
      : (info.type === "dynamic compound" ||
          info.type === "generative stative compound") &&
        os?.verb.voice !== "passive"
      ? makeNounSelection(
          info.objComplement.entry as T.NounEntry,
          undefined,
          info.type === "dynamic compound" ? "dynamic" : "generative stative"
        )
      : info.type === "dynamic or generative stative compound" &&
        os?.verb.voice !== "passive"
      ? makeNounSelection(
          info.dynamic.objComplement.entry as T.NounEntry,
          undefined,
          "generative stative"
        )
      : transitivity === "transitive" && os?.verb.voice !== "passive"
      ? getTransObjFromos()
      : "none";
  const isCompound =
    "stative" in info && info.type === "dynamic or generative stative compound"
      ? "generative stative"
      : "stative" in info || info.type === "stative compound"
      ? "stative"
      : info.type === "dynamic compound"
      ? "dynamic"
      : false;
  // TODO: here and below in the changeStatDyn function ... allow for entries with complement
  const dynAuxVerb: T.VerbEntry | undefined =
    isCompound !== "dynamic"
      ? undefined
      : info.type === "dynamic compound"
      ? ({ entry: info.auxVerb } as T.VerbEntry)
      : "dynamic" in info
      ? ({ entry: info.dynamic.auxVerb } as T.VerbEntry)
      : undefined;
  const blocks = [
    { key: Math.random(), block: makeSubjectSelection(subject) },
    { key: Math.random(), block: makeObjectSelection(object) },
  ];
  return {
    blocks,
    verb: {
      type: "verb",
      verb: verb,
      dynAuxVerb,
      verbTense: os ? os.verb.verbTense : "presentVerb",
      perfectTense: os ? os.verb.perfectTense : "presentPerfect",
      imperativeTense: os ? os.verb.imperativeTense : "imperfectiveImperative",
      tenseCategory: os ? os.verb.tenseCategory : "basic",
      transitivity,
      isCompound,
      voice:
        transitivity === "transitive" ? os?.verb.voice || "active" : "active",
      negative: os ? os.verb.negative : false,
      canChangeTransitivity: "grammaticallyTransitive" in info,
      canChangeVoice: transitivity === "transitive",
      canChangeStatDyn: "stative" in info,
    },
    externalComplement:
      takesExternalComplement(verb) === "req"
        ? os?.externalComplement ?? {
            type: "complement",
            selection: { type: "unselected" },
          }
        : undefined,
    form:
      os && info.type !== "dynamic compound"
        ? os.form
        : { removeKing: false, shrinkServant: false },
  };
}

export function changeStatDyn(
  v: T.VPSelectionState,
  s: "dynamic" | "stative"
): T.VPSelectionState {
  const info = getVerbInfo(v.verb.verb.entry, v.verb.verb.complement);
  if (!("stative" in info)) {
    return v;
  }
  const newBlocks = adjustObjectSelection(
    v.blocks,
    s === "dynamic" ||
      (s === "stative" &&
        info.type === "dynamic or generative stative compound")
      ? {
          type: "NP",
          selection: makeNounSelection(
            info.dynamic.objComplement.entry as T.NounEntry,
            undefined,
            s === "dynamic" ? "dynamic" : "generative stative"
          ),
        }
      : undefined
  );
  return {
    ...v,
    blocks:
      s === "stative" && info.type === "dynamic or generative stative compound"
        ? moveObjectToEnd(newBlocks)
        : newBlocks,
    verb: {
      ...v.verb,
      isCompound:
        info.type === "dynamic or generative stative compound" &&
        s === "stative"
          ? "generative stative"
          : s,
      dynAuxVerb:
        s === "dynamic"
          ? ({ entry: info.dynamic.auxVerb } as T.VerbEntry)
          : undefined,
    },
  };
}

export function changeTransitivity(
  v: T.VPSelectionState,
  transitivity: "transitive" | "grammatically transitive"
): T.VPSelectionState {
  return {
    ...v,
    blocks: adjustObjectSelection(
      v.blocks,
      transitivity === "grammatically transitive"
        ? T.Person.ThirdPlurMale
        : undefined
    ),
    verb: {
      ...v.verb,
      transitivity,
    },
  };
}
