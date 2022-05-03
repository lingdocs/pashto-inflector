import * as T from "../../types";
import * as grammarUnits from "../grammar-units";
import {
    removeDuplicates,
} from "./vp-tools";
import {
    combineSegments,
    makeSegment,
    putKidsInKidsSection,
    Segment,
    flattenLengths,
} from "./segment";
import { removeAccents } from "../accent-helpers";
import { getEnglishFromRendered, getPashtoFromRendered } from "./np-tools";
import {
    orderKidsSection,
    findPossesiveToShrink,
    shrinkNP,
} from "./compile-tools";

export function compileEP(EP: T.EPRendered, form: T.FormVersion): { ps: T.SingleOrLengthOpts<T.PsString[]>, e?: string[] };
export function compileEP(EP: T.EPRendered, form: T.FormVersion, combineLengths: true): { ps: T.PsString[], e?: string[] };
export function compileEP(EP: T.EPRendered, form: T.FormVersion, combineLengths?: true): { ps: T.SingleOrLengthOpts<T.PsString[]>, e?: string[] } {
    const { kids, NPs } = getSegmentsAndKids(EP, form);
    const equative = EP.equative.ps;
    const psResult = compilePs({
        NPs,
        kids,
        equative,
        negative: EP.equative.negative,
    });
    return {
        ps: combineLengths ? flattenLengths(psResult) : psResult,
        e: compileEnglish(EP),
    };
}

function getSegmentsAndKids(EP: T.EPRendered, form: Omit<T.FormVersion, "shrinkServant">): { kids: Segment[], NPs: Segment[] } {
    function ifNotRemoved(s: Segment, role: "subject" | "predicate"): Segment[] {
        if (form.removeKing && EP.king === role) {
            return [];
        }
        return [s];
    }
    const possToShrink = findPossesiveToShrink(EP);
    const shrunkenPossAllowed = !(form.removeKing && possToShrink?.role === "king");
    const possUid = shrunkenPossAllowed ? EP.shrunkenPossesive : undefined;
    const subject = makeSegment(getPashtoFromRendered(EP.subject, possUid, false));
    const predicate = makeSegment(getPashtoFromRendered(EP.predicate, possUid, false));
    return {
        kids: orderKidsSection([
            ...EP.equative.hasBa
                ? [makeSegment(grammarUnits.baParticle, ["isBa", "isKid"])]
                : [],
            ...(possToShrink && shrunkenPossAllowed)
                ? [shrinkNP(possToShrink)]
                : [],
        ]),
        NPs: [
            ...ifNotRemoved(subject, "subject"),
            ...ifNotRemoved(predicate, "predicate"),
        ],
    };
}

function compilePs({ NPs, kids, equative, negative }: {
    NPs: Segment[],
    kids: Segment[],
    equative: T.SingleOrLengthOpts<T.PsString[]>,
    negative: boolean,
}): T.SingleOrLengthOpts<T.PsString[]> {
    if ("long" in equative) {
        return {
            long: compilePs({ NPs, kids, equative: equative.long, negative }) as T.PsString[],
            short: compilePs({ NPs, kids, equative: equative.short, negative }) as T.PsString[],
        };
    }
    const allSegments = putKidsInKidsSection([
        ...NPs,
        ...negative ? [
            makeSegment({ p: "نه", f: "nú" }),
            makeSegment(removeAccents(equative))
        ] : [
            makeSegment(equative),
        ],
    ], kids);
    return removeDuplicates(combineSegments(allSegments, "spaces"));
}

function compileEnglish(EP: T.EPRendered): string[] | undefined {
    function insertEWords(e: string, { subject, predicate }: { subject: string, predicate: string }): string {
        return e.replace("$SUBJ", subject).replace("$PRED", predicate || "");
    }
    const engSubj = getEnglishFromRendered(EP.subject);
    const engPred = getEnglishFromRendered(EP.predicate);
    // require all English parts for making the English phrase
    return (EP.englishBase && engSubj && engPred)
        ? EP.englishBase.map(e => insertEWords(e, {
            subject: engSubj,
            predicate: engPred,
        }))
        : undefined;
}
