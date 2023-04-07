import * as T from "../../../types";
import { getRootStem } from "./roots-and-stems";

export function vEntry(e: any, c?: any): T.VerbEntry {
    return {
        entry: e,
        ...c ? {
            c,
        } : {},
    } as T.VerbEntry;
}

export function getAllRs(verb: T.VerbEntry): {
    stem: {
        perfective: T.RootsStemsOutput,
        imperfective: T.RootsStemsOutput,
    },
    root: {
        perfective: T.RootsStemsOutput,
        imperfective: T.RootsStemsOutput,
    },
} { 
    return {
        stem: {
            perfective: getRootStem({ verb, type: "basic", part: { rs: "stem", aspect: "perfective" }, genderNumber: { gender: "masc", number: "singular" } }),
            imperfective: getRootStem({ verb, type: "basic", part: { rs: "stem", aspect: "imperfective" }, genderNumber: { gender: "masc", number: "singular" } }),
        },
        root: {
            perfective: getRootStem({ verb, type: "basic", part: { rs: "root", aspect: "perfective" }, genderNumber: { gender: "masc", number: "singular" } }),
            imperfective: getRootStem({ verb, type: "basic", part: { rs: "root", aspect: "imperfective" }, genderNumber: { gender: "masc", number: "singular" } }),
        },
    };
}