import * as T from "../../types";
import {
    makePsString,
} from "../accent-and-ps-utils";
import {
    concatPsString,
} from "../p-text-helpers";
// SEGMENT TOOLS
// TODO: PULL OUT FOR SHARING ACROSS COMPILE EP ETC?

type SegmentDescriptions = {
    isVerbHead?: boolean,
    isOoOrWaaHead?: boolean,
    isVerbRest?: boolean,
    isMiniPronoun?: number,
    isKid?: boolean,
    // TODO: Simplify to just isKidAfterHead?
    isKidBetweenHeadAndRest?: boolean,
    isNu?: boolean,
    isBa?: boolean,
}

type SDT = keyof SegmentDescriptions; 
export type Segment = { ps: T.PsString[] } & SegmentDescriptions & {
    adjust: (o: { ps?: T.PsString | T.PsString[] | ((ps: T.PsString) => T.PsString), desc?: SDT[] }) => Segment,
};


export function makeSegment(
    input: T.PsString | T.PsString[],
    options?: (keyof SegmentDescriptions | 1 | 2 | 3)[],     
): Segment {
    const ps: T.PsString[] = Array.isArray(input)
        ? input
        : [input];
    return {
        ps: Array.isArray(ps) ? ps : [ps],
        ...options && options.reduce((all, curr) => ({
            ...all,
            ...typeof curr === "number" ? {
                isMiniPronoun: curr,
            } : {
                [curr]: true,
            },
        }), {}),
        adjust: function(o): Segment {
            return {
                ...this,
                ...o.ps ? {
                    // TODO: is this ok with the adjectives?
                    ps: Array.isArray(o.ps)
                        ? o.ps
                        : "p" in o.ps
                        ? [o.ps]
                        : this.ps.map(o.ps)
                    } : {},
                ...o.desc && o.desc.reduce((all, curr) => ({
                    ...all,
                    [curr]: true,
                }), {}),
            };
        },
    };
}

export function combineSegments(loe: (Segment | " " | "" | T.PsString)[], spaces?: "spaces"): T.PsString[] {
    const first = loe[0];
    const rest = loe.slice(1);
    if (!rest.length) {
        if (typeof first === "string" || !("ps" in first)) {
            throw new Error("can't end with a spacer");
        }
        return first.ps;
    }
    return combineSegments(rest, spaces).flatMap(r => (
        (typeof first === "object" && "ps" in first)
            ? first.ps.map(f => (
                spaces ? concatPsString(f, " ", r) : concatPsString(f, r)
            ))
            : [concatPsString(first, r)]
        )
    );
}

export function flattenLengths(r: T.SingleOrLengthOpts<T.PsString[]>): T.PsString[] {
    if ("long" in r) {
        return Object.values(r).flat();
    }
    return r;
}

export function putKidsInKidsSection(segments: Segment[], kids: Segment[]): Segment[] {
    const first = segments[0];
    const rest = segments.slice(1);
    return [
        first,
        // TODO: simplify to just isKidAfterHead ??
        ...(first.isVerbHead && rest[0] && rest[0].isVerbRest)
            ? kids.map(k => k.adjust({ desc: ["isKidBetweenHeadAndRest"] }))
            : kids,
        ...rest,
    ];
}

export function splitOffLeapfrogWord(psVs: T.PsString[]): [T.PsString[], T.PsString[]] {
    return psVs.reduce((tp, ps) => {
        const pWords = ps.p.split(" ");
        const fWords = ps.f.split(" ");
        const beginning = makePsString(
            pWords.slice(0, -1).join(" "),
            fWords.slice(0, -1).join(" "),
        );
        const end = makePsString(
            pWords.slice(-1).join(" "),
            fWords.slice(-1).join(" "),
        );
        return [[...tp[0], beginning], [...tp[1], end]];
    }, [[], []] as [T.PsString[], T.PsString[]]);
}
