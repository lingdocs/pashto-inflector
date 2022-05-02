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

export function findPossesiveToShrink(VP: T.VPRendered | T.EPRendered): T.Rendered<T.NPSelection> | undefined {
    const uid = VP.shrunkenPossesive;
    function findPossesiveInNP(NP: T.Rendered<T.NPSelection> | T.ObjectNP | undefined): T.Rendered<T.NPSelection> | undefined {
        if (NP === undefined) return undefined;
        if (typeof NP !== "object") return undefined;
        if (!NP.possesor) return undefined;
        if (NP.possesor.uid === uid) {
            return NP.possesor.np;
        }
        return findPossesiveInNP(NP.possesor.np);
    }
    if (uid === undefined) return undefined;
    const objPred: T.Rendered<T.NPSelection> | undefined = ("object" in VP)
        ? (typeof VP.object === "object" ? VP.object : undefined)
        : (VP.predicate.type === "noun" || VP.predicate.type === "participle" || VP.predicate.type === "pronoun")
        // typescript is dumb here;
        ? VP.predicate as T.Rendered<T.NPSelection>
        : undefined;
    return (
        findPossesiveInNP(VP.subject)
        ||
        findPossesiveInNP(objPred)
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

