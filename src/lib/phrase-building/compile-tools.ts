import * as T from "../../types";
import {
    Segment,
    makeSegment,
} from "./segment";
import { getVerbBlockPosFromPerson } from "../misc-helpers";
import { pronouns } from "../grammar-units";

export function orderKidsSection(kids: Segment[]): Segment[] {
    const sorted = [...kids];
    return sorted.sort((a, b) => {
        // ba first
        if (a.isBa) return -1;
        // kinds lined up 1st 2nd 3rd person
        if (a.isMiniPronoun && b.isMiniPronoun) {
            if (a.isMiniPronoun < b.isMiniPronoun) {
                return -1;
            }
            if (a.isMiniPronoun > b.isMiniPronoun) {
                return 1;
            }
            // TODO: is this enough?
            return 0;
        }
        return 0;
    });
}

function findPossesiveInNP(NP: T.Rendered<T.NPSelection> | T.ObjectNP | undefined, uid: number): T.Rendered<T.NPSelection> | undefined {
    if (NP === undefined) return undefined;
    if (typeof NP !== "object") return undefined;
    if (!NP.possesor) return undefined;
    if (NP.possesor.uid === uid) {
        return NP.possesor.np;
    }
    return findPossesiveInNP(NP.possesor.np, uid);
}

export function findPossesiveToShrinkInEP(EP: T.EPRendered): {
    np: T.Rendered<T.NPSelection>,
    from: "subject" | "predicate",
} | undefined {
    const uid = EP.shrunkenPossesive;
    if (uid === undefined) return undefined;
    const inSubject = findPossesiveInNP(EP.subject, uid);
    if (inSubject) {
        return {
            np: inSubject,
            from: "subject",
        };
    }
    if (EP.predicate.type === "adjective" || EP.predicate.type === "loc. adv.") {
        return undefined;
        
    }
    // ts being stupid
    const predicate = EP.predicate as T.Rendered<T.NPSelection>;
    const inPredicate = findPossesiveInNP(predicate, uid);
    if (inPredicate) {
        return {
            np: inPredicate,
            from: "predicate",
        };
    }
    return undefined;
}

export function findPossesiveToShrinkInVP(VP: T.VPRendered): T.Rendered<T.NPSelection> | undefined {
    const uid = VP.shrunkenPossesive;
    if (uid === undefined) return undefined;
    const obj: T.Rendered<T.NPSelection> | undefined = ("object" in VP && typeof VP.object === "object")
        ? VP.object
        : undefined;
    return (
        findPossesiveInNP(VP.subject, uid)
        ||
        findPossesiveInNP(obj, uid)
    );
}

export function shrinkNP(np: T.Rendered<T.NPSelection>): Segment {
    function getFirstSecThird(): 1 | 2 | 3 {
        if ([0, 1, 6, 7].includes(np.person)) return 1;
        if ([2, 3, 8, 9].includes(np.person)) return 2;
        return 3;
    }
    const [row, col] = getVerbBlockPosFromPerson(np.person);
    return makeSegment(pronouns.mini[row][col], ["isKid", getFirstSecThird()]);
}

