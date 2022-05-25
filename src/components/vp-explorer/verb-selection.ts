import {
    makeNounSelection,
} from "../np-picker/picker-tools";
import * as T from "../../types";
import { getVerbInfo } from "../../lib/verb-info";
import { adjustObjectSelection, getObjectSelection, getSubjectSelection, makeObjectSelection, makeSubjectSelection } from "../../lib/phrase-building/blocks-utils";

export function makeVPSelectionState(
    verb: T.VerbEntry,
    os?: T.VPSelectionState,
): T.VPSelectionState {
    const info = getVerbInfo(verb.entry, verb.complement);
    const subject = (os?.verb.voice === "passive" && info.type === "dynamic compound")
        ? makeNounSelection(info.objComplement.entry as T.NounEntry, undefined, true)
        : (os?.blocks ? getSubjectSelection(os.blocks) : undefined);
    function getTransObjFromos() {
        const osObj = os ? getObjectSelection(os.blocks).selection : undefined;
        if (
            !os ||
            osObj === "none" ||
            typeof osObj === "number" ||
            os.verb.isCompound === "dynamic" ||
            (osObj?.type === "noun" && osObj.dynamicComplement)
        ) return undefined;
        return osObj;
    }
    const transitivity: T.Transitivity = "grammaticallyTransitive" in info
        ? "transitive"
        : info.transitivity;
    const object = (transitivity === "grammatically transitive")
        ? T.Person.ThirdPlurMale
        : (info.type === "dynamic compound" && os?.verb.voice !== "passive")
            ? makeNounSelection(info.objComplement.entry as T.NounEntry, undefined, true)
            : (transitivity === "transitive" && os?.verb.voice !== "passive")
                ? getTransObjFromos()
                : "none";
    const isCompound = ("stative" in info || info.type === "stative compound")
        ? "stative"
        : info.type === "dynamic compound"
        ? "dynamic"
        : false;
    // TODO: here and below in the changeStatDyn function ... allow for entries with complement
    const dynAuxVerb: T.VerbEntry | undefined = isCompound !== "dynamic"
        ? undefined
        : info.type === "dynamic compound"
            ? { entry: info.auxVerb } as T.VerbEntry
            : "dynamic" in info
                ? { entry: info.dynamic.auxVerb } as T.VerbEntry
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
            voice: transitivity === "transitive"
                ? (os?.verb.voice || "active")
                : "active",
            negative: os ? os.verb.negative : false,
            canChangeTransitivity: "grammaticallyTransitive" in info,
            canChangeVoice: transitivity === "transitive",
            canChangeStatDyn: "stative" in info,
        },
        form: os ? os.form : { removeKing: false, shrinkServant: false },
    };
}

export function changeStatDyn(v: T.VPSelectionState, s: "dynamic" | "stative"): T.VPSelectionState {
    const info = getVerbInfo(v.verb.verb.entry, v.verb.verb.complement);
    if (!("stative" in info)) {
        return v;
    }
    return {
        ...v,
        blocks: adjustObjectSelection(
            v.blocks,
            s === "dynamic"
                ? makeNounSelection(info.dynamic.objComplement.entry as T.NounEntry, undefined, true)
                : undefined,
        ),
        verb: {
            ...v.verb,
            isCompound: s,
            dynAuxVerb: s === "dynamic"
                ? { entry: info.dynamic.auxVerb } as T.VerbEntry
                : undefined,
        },
    };
}

export function changeTransitivity(v: T.VPSelectionState, transitivity: "transitive" | "grammatically transitive"): T.VPSelectionState {
    return {
        ...v,
        blocks: adjustObjectSelection(v.blocks, transitivity === "grammatically transitive" ? T.Person.ThirdPlurMale : undefined),
        verb: {
            ...v.verb,
            transitivity,
        },
    };
}
