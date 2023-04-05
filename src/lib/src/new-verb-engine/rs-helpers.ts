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
        perfective: T.RootStemOutput,
        imperfective: T.RootStemOutput,
    },
    root: {
        perfective: T.RootStemOutput,
        imperfective: T.RootStemOutput,
    },
} {
    return {
        stem: {
            perfective: getRootStem({ verb, type: "basic", part: { rs: "stem", aspect: "perfective" }, person: undefined }),
            imperfective: getRootStem({ verb, type: "basic", part: { rs: "stem", aspect: "imperfective" }, person: undefined }),
        },
        root: {
            perfective: getRootStem({ verb, type: "basic", part: { rs: "root", aspect: "perfective" }, person: undefined }),
            imperfective: getRootStem({ verb, type: "basic", part: { rs: "root", aspect: "imperfective" }, person: undefined }),
        },
    };
}