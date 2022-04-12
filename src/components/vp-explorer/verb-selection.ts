import {
    makeNounSelection,
} from "../np-picker/picker-tools";
import * as T from "../../types";
import { getVerbInfo } from "../../lib/verb-info";
import { isPerfectTense } from "../../lib/phrase-building/vp-tools";

export function makeVPSelectionState(
    verb: T.VerbEntry,
    os?: T.VPSelectionState,
): T.VPSelectionState {
    const info = getVerbInfo(verb.entry, verb.complement);
    const subject = (os?.verb.voice === "passive" && info.type === "dynamic compound")
        ? makeNounSelection(info.objComplement.entry as T.NounEntry, true)
        : (os?.subject || undefined);
    function getTransObjFromos() {
        if (
            !os ||
            os.verb.object === "none" ||
            typeof os.verb.object === "number" ||
            os.verb.isCompound === "dynamic" ||
            (os.verb.object?.type === "noun" && os.verb.object.dynamicComplement)
        ) return undefined;
        return os.verb.object;
    }
    const transitivity: T.Transitivity = "grammaticallyTransitive" in info
        ? "transitive"
        : info.transitivity;
    const object = (transitivity === "grammatically transitive")
        ? T.Person.ThirdPlurMale
        : (info.type === "dynamic compound" && os?.verb.voice !== "passive")
            ? makeNounSelection(info.objComplement.entry as T.NounEntry, true)
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
    const tenseSelection = ((): { tenseCategory: "perfect", tense: T.PerfectTense } | {
        tenseCategory: "basic" | "modal",
        tense: T.VerbTense,
    } => {
        if (!os) {
            return { tense: "presentVerb", tenseCategory: "basic" };
        }
        if (os.verb.tenseCategory === "modal") {
            return { tenseCategory: "modal", tense: isPerfectTense(os.verb.tense) ? "presentVerb" : os.verb.tense };
        }
        if (os.verb.tenseCategory === "basic") {
            return { tenseCategory: "basic", tense: isPerfectTense(os.verb.tense) ? "presentVerb" : os.verb.tense };
        }
        return { tenseCategory: "perfect", tense: isPerfectTense(os.verb.tense) ? os.verb.tense : "present perfect" };
    })();
    return {
        subject,
        verb: {
            type: "verb",
            verb: verb,
            dynAuxVerb,
            ...tenseSelection,
            object,
            transitivity,
            isCompound,
            voice: transitivity === "transitive"
                ? (os?.verb.voice || "active")
                : "active",
            negative: os ? os.verb.negative : false,
            ...("grammaticallyTransitive" in info) ? {
                changeTransitivity: function(t) {
                    return {
                        ...this,
                        transitivity: t,
                        object: t === "grammatically transitive" ? T.Person.ThirdPlurMale : undefined,
                    };
                },
            } : {},
            ...("stative" in info) ? {
                changeStatDyn: function(c) {
                    return {
                        ...this,
                        isCompound: c,
                        object: c === "dynamic"
                            ? makeNounSelection(info.dynamic.objComplement.entry as T.NounEntry, true)
                            : undefined,
                        dynAuxVerb: c === "dynamic"
                            ? { entry: info.dynamic.auxVerb } as T.VerbEntry
                            : undefined,
                    };
                }
            } : {},
            ...(transitivity === "transitive") ? {
                changeVoice: function(v, s) {
                    return {
                        ...this,
                        voice: v,
                        object: v === "active" ? s : "none",
                    };
                },
            } : {},
        },
    };
}