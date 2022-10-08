import * as T from "../../../types";
import {
    getPersonFromNP,
} from "./vp-tools";
import { pronouns } from "../grammar-units";
import { getVerbBlockPosFromPerson } from "../misc-helpers";
import { getFirstSecThird } from "../misc-helpers";

export function findPossesivesToShrink(
    blocks: (T.EPSBlockComplete | T.VPSBlockComplete | T.SubjectSelectionComplete | T.PredicateSelectionComplete | T.APSelection)[],
): T.MiniPronoun[] {
    return blocks.reduce((kids, item) => {
        const block = "block" in item ? item.block : item;
        if (block.type === "subjectSelection") {
            return [
                ...kids,
                ...findShrunkenPossInNP(block.selection),
            ];
        }
        if (block.type === "objectSelection") {
            if (typeof block.selection !== "object") return kids;
            return [
                ...kids,
                ...findShrunkenPossInNP(block.selection),
            ];
        }
        if (block.type === "AP") {
            if (block.selection.type === "adverb") return kids;
            return [
                ...kids,
                ...findShrunkenPossInNP(block.selection.inside),
            ];
        }
        if (block.type === "predicateSelection") {
            if (block.selection.type === "complement") {
                if (block.selection.selection.type === "sandwich") {
                    return [
                        ...kids,
                        ...findShrunkenPossInNP(block.selection.selection.inside),
                    ];
                }
                return kids;
            }
            return [
                ...kids,
                ...findShrunkenPossInNP(block.selection),
            ];
        }
        return kids;
    }, [] as T.MiniPronoun[]);
}

function findShrunkenPossInNP(NP: T.NPSelection): T.MiniPronoun[] {
    if (NP.selection.type === "pronoun") return [];
    if (!NP.selection.possesor) return [];
    // if (NP.selection.type === "noun") {
    //     if (NP.selection.adjectives) {
    //         const { adjectives, ...rest } = NP.selection;
    //         return [
    //             // TODO: ability to find possesives shrinkage in sandwiches in adjectives
    //             // ...findShrunkenPossInAdjectives(adjectives),
    //             ...findShrunkenPossInNP({ type: "NP", selection: {
    //                 ...rest,
    //                 adjectives: [],
    //             }}),
    //         ];
    //     }
    // }
    if (NP.selection.possesor.shrunken) {
        const person = getPersonFromNP(NP.selection.possesor.np);
        const miniP: T.MiniPronoun = {
            type: "mini-pronoun",
            person,
            ps: getMiniPronounPs(person),
            source: "possesive",
            np: NP.selection.possesor.np,
        };
        return [miniP];
    }
    return findShrunkenPossInNP(NP.selection.possesor.np);
}

export function getMiniPronounPs(person: T.Person): T.PsString {
    const [row, col] = getVerbBlockPosFromPerson(person);
    return pronouns.mini[row][col][0];
}

export function orderKids(kids: T.Kid[]): T.Kid[] {
    const sorted = [...kids].sort((a, b) => {
        // ba first
        if (a.kid.type === "ba") return -1;
        // kinds lined up 1st 2nd 3rd person
        if (a.kid.type === "mini-pronoun" && b.kid.type === "mini-pronoun") {
            const aPers = getFirstSecThird(a.kid.person);
            const bPers = getFirstSecThird(b.kid.person);
            if (aPers < bPers) {
                return -1;
            }
            if (aPers > bPers) {
                return 1;
            }
            // TODO: is this enough?
            return 0;
        }
        return 0;
    });
    return sorted;
}