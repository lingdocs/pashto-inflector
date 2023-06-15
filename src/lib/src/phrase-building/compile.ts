import * as T from "../../../types";
import {
    capitalizeFirstLetter,
    concatPsString, getLong, getShort,
} from "../p-text-helpers";
import { negativeParticle } from "../grammar-units";
import * as grammarUnits from "../grammar-units";
import {
    removeDuplicates,
} from "./vp-tools";
import { getEnglishFromRendered, getPashtoFromRendered } from "./np-tools";
import { completeEPSelection, renderEP } from "./render-ep";
import { completeVPSelection } from "./vp-tools";
import { renderVP } from "./render-vp";
import {
    getAPsFromBlocks,
    getObjectSelectionFromBlocks,
    getPredicateSelectionFromBlocks,
    getSubjectSelectionFromBlocks,
    hasEquativeWithLengths,
    isRenderedVerbB,
    specifyEquativeLength,
} from "./blocks-utils";
import {
    blank,
    kidsBlank,
} from "../misc-helpers";

type BlankoutOptions = {
    equative?: boolean,
    ba?: boolean,
    kidsSection?: boolean,
    verb?: boolean,
    negative?: boolean,
    predicate?: boolean,
};

// function compilePs({ blocks, kids, verb: { head, rest }, VP }: CompilePsInput): T.SingleOrLengthOpts<T.PsString[]> {
//     if ("long" in rest) {
//         return {
//             long: compilePs({ blocks, verb: { head, rest: rest.long }, VP, kids }) as T.PsString[],
//             short: compilePs({ blocks, verb: { head, rest: rest.short }, VP, kids }) as T.PsString[],
//             ...rest.mini ? {
//                 mini: compilePs({ blocks, verb: { head, rest: rest.mini }, VP, kids }) as T.PsString[],
//             } : {},
//         };
//     }
//     const verbWNegativeVersions = arrangeVerbWNegative(head, rest, VP.verb);

//     // put together all the different possible permutations based on:
//     // a. potential different versions of where the nu goes
//     return removeDuplicates(verbWNegativeVersions.flatMap((verbSegments) => {
//         // for each permutation of the possible ordering of NPs and Verb + nu
//         // 1. put in kids in the kids section
//         const segments = oldPutKidsInKidsSection([...blocks, ...verbSegments], kids);
//         // 2. space out the words properly
//         const withProperSpaces = addSpacesBetweenSegments(segments);
//         // 3. throw it all together into a PsString for each permutation
//         return combineSegments(withProperSpaces);
//     }));
// }

export function compileEP(EP: T.EPRendered): { ps: T.SingleOrLengthOpts<T.PsString[]>, e?: string[] };
export function compileEP(EP: T.EPRendered, combineLengths: true, blankOut?: BlankoutOptions): { ps: T.PsString[], e?: string[] };
export function compileEP(EP: T.EPRendered, combineLengths?: boolean, blankOut?: BlankoutOptions): { ps: T.SingleOrLengthOpts<T.PsString[]>, e?: string[] } {
    const psResult = compileEPPs(EP.blocks, EP.kids, EP.omitSubject, blankOut);
    return {
        ps: combineLengths ? flattenLengths(psResult) : psResult,
        e: compileEnglishEP(EP),
    };
}

export function compileVP(VP: T.VPRendered, form: T.FormVersion): { ps: T.SingleOrLengthOpts<T.PsString[]>, e?: string [] };
export function compileVP(VP: T.VPRendered, form: T.FormVersion, combineLengths: true, blankOut?: BlankoutOptions): { ps: T.PsString[], e?: string [] };
export function compileVP(VP: T.VPRendered, form: T.FormVersion, combineLengths?: true, blankOut?: BlankoutOptions): { ps: T.SingleOrLengthOpts<T.PsString[]>, e?: string [] } {
    // const verb = getVerbFromBlocks(VP.blocks).block;
    const psResult = compileVPPs(VP.blocks, VP.kids, form, VP.king, blankOut);
    return {
        ps: combineLengths ? flattenLengths(psResult) : psResult,
        // TODO: English doesn't quite work for dynamic compounds in passive voice
        e: /* (verb.voice === "passive" && VP.isCompound === "dynamic") ? undefined : */ compileEnglishVP(VP),
    };
}

function compileVPPs(blocks: T.Block[][], kids: T.Kid[], form: T.FormVersion, king: "subject" | "object", blankOut?: BlankoutOptions): T.PsString[] {
    const subjectPerson = getSubjectSelectionFromBlocks(blocks)
        .selection.selection.person;
    const blocksWKids = putKidsInKidsSection(
        filterForVisibleBlocksVP(blocks, form, king),
        kids,
        !!blankOut?.ba
    );
    return removeDuplicates(combineIntoText(blocksWKids, subjectPerson, blankOut));
}

function compileEPPs(blocks: T.Block[][], kids: T.Kid[], omitSubject: boolean, blankOut?: BlankoutOptions): T.SingleOrLengthOpts<T.PsString[]> {
    if (hasEquativeWithLengths(blocks)) {
        return {
            long: compileEPPs(specifyEquativeLength(blocks, "long"), kids, omitSubject, blankOut) as T.PsString[],
            short: compileEPPs(specifyEquativeLength(blocks, "short"), kids, omitSubject, blankOut) as T.PsString[],
        };
    }
    const subjectPerson = getSubjectSelectionFromBlocks(blocks)
        .selection.selection.person;
    const blocksWKids = putKidsInKidsSection(
        omitSubject ? blocks.map(blks => blks.filter(b => b.block.type !== "subjectSelection")) : blocks,
        kids,
        !!blankOut?.kidsSection
    );
    return removeDuplicates(combineIntoText(blocksWKids, subjectPerson, blankOut));
}

export function filterForVisibleBlocksVP(blocks: T.Block[][], form: T.FormVersion, king: "subject" | "object"): T.Block[][] {
    const servant = king === "object" ? "subject" : "object";
    return blocks.map(blks => blks.filter((block) => {
        if (form.removeKing) {
            if (
                (king === "subject" && block.block.type === "subjectSelection")
                ||
                (king === "object" && block.block.type === "objectSelection")
            ) return false;
        }
        if (form.shrinkServant) {
            if (
                (servant === "subject" && block.block.type === "subjectSelection")
                ||
                (servant === "object" && block.block.type === "objectSelection")
            ) return false;
        }
        if (block.block.type === "objectSelection" && typeof block.block.selection !== "object") {
            return false;
        }
        return true;
    }));
}

export function filterForVisibleBlocksEP(blocks: T.Block[][], omitSubject: boolean): T.Block[][] {
    if (!omitSubject) return blocks;
    return blocks.map(blks => blks.filter(({ block }) => {
        if (block.type === "subjectSelection") {
            return false;
        }
        return true;
    }));
}

function combineIntoText(piecesWVars: (T.Block | T.Kid | T.PsString)[][], subjectPerson: T.Person, blankOut?: BlankoutOptions): T.PsString[] {
    function removeDoubleBlanks(x: T.PsString): T.PsString {
        return {
            p: x.p.replace(blank.p+blank.p, blank.p),
            f: x.f.replace(blank.f+blank.f, blank.f),
        };
    }
    function combine(pieces: (T.Block | T.Kid | T.PsString)[]): T.PsString[] {
        const first = pieces[0];
        const next = pieces[1];
        const rest = pieces.slice(1);
        const firstPs = ("p" in first)
            ? [first]
            : (
                (blankOut?.equative && "block" in first && first.block.type === "equative") ||
                (blankOut?.verb && "block" in first && isRenderedVerbB(first)) ||
                (blankOut?.predicate && "block" in first && first.block.type === "predicateSelection")
            )
            ? [blank]
            : ((blankOut?.ba) && "kid" in first && first.kid.type === "ba")
            ? [kidsBlank]
            : (blankOut?.negative && "block" in first && first.block.type === "negative")
            ? [{ p: "", f: "" }]
            : getPsFromPiece(first, subjectPerson);
        if (!rest.length) {
            return firstPs;
        }
        return combine(rest).flatMap(r => (
                firstPs.map(fPs => concatPsString(
                    fPs,
                    // TODO: this spacing is a mess and not accurate
                    (!("p" in first) && "block" in first && first.block.type === "PH" && !("p" in next) && (("block" in next && (isRenderedVerbB(next) || next.block.type === "negative")) || ("kid" in next && next.kid.type === "mini-pronoun")))
                        ? ((("block" in next && next.block.type === "negative") || ("kid" in next && next.kid.type === "mini-pronoun")) ? { p: "", f: " " } : "")
                        : " ",
                    r,
                ))
            )
        ).map(removeDoubleBlanks);
    }
    return piecesWVars.flatMap(combine);
}

function getPsFromPiece(piece: T.Block | T.Kid, subjectPerson: T.Person): T.PsString[] {
    if ("block" in piece) {
        if (piece.block.type === "negative") {
            return [
                negativeParticle[piece.block.imperative ? "imperative" : "nonImperative"],
            ];
        }
        if (piece.block.type === "equative") {
            // length will already be specified in compileEPPs - this is just for type safety
            return getLong(piece.block.equative.ps);
        }
        if (piece.block.type === "subjectSelection" || piece.block.type === "predicateSelection") {
            return getPashtoFromRendered(piece.block.selection, subjectPerson);
        }
        if (piece.block.type === "AP") {
            return getPashtoFromRendered(piece.block, subjectPerson);
        }
        if (piece.block.type === "PH") {
            return [piece.block.ps];
        }
        if (piece.block.type === "VB") {
            return flattenLengths(piece.block.ps);
        }
        if (piece.block.type === "objectSelection") {
            if (typeof piece.block.selection !== "object") {
                return [{ p: "", f: "" }];
            }
            return getPashtoFromRendered(piece.block.selection, subjectPerson);
        }
        if (piece.block.type === "NComp") {
            return [piece.block.comp.ps];
        }
        if (piece.block.type === "complement") {
            if (piece.block.selection.type === "sandwich") {
                // TODO: Kinda cheating
                return getPashtoFromRendered({ type: "AP", selection: piece.block.selection }, false);
            }
            return piece.block.selection.ps;
        }
        // welded
        return getPsFromWelded(piece.block);
    }
    if ("kid" in piece) {
        if (piece.kid.type === "ba") {
            return [grammarUnits.baParticle];
        }
        if (piece.kid.type === "mini-pronoun") {
            return [piece.kid.ps];
        }
    }
    throw new Error("unrecognized piece type");
}

function getPsFromWelded(v: T.Welded): T.PsString[] {
    function getPsFromSide(v: T.VBBasic | T.Welded | T.NComp | T.VBGenNum): T.PsString[] {
        if (v.type === "VB") {
            return flattenLengths(v.ps);
        }
        if (v.type === "NComp") {
            return [v.comp.ps];
        }
        return getPsFromWelded(v);
    }
    return [...getPsFromSide(v.left), ...getPsFromSide(v.right)];
}

function getEngAPs(blocks: T.Block[][]): string {
    return getAPsFromBlocks(blocks).reduce((accum, curr) => {
        const e = getEnglishFromRendered(curr);
        if (!e) return accum;
        return `${accum} ${e}`;
    }, "");
}

function getEngComplement(blocks: T.Block[][]): string | undefined {
    return "TODO";
    // const comp = getComplementFromBlocks(blocks);
    // if (!comp) return undefined;
    // if (comp.selection.type === "unselected") {
    //     return "____";
    // }
    // if (comp.selection.type === "sandwich") {
    //     return getEnglishFromRendered({ type: "AP", selection: comp.selection });
    // }
    // return comp.selection.e;
}

function putKidsInKidsSection(blocksWVars: T.Block[][], kids: T.Kid[], enforceKidsSectionBlankout: boolean): (T.Block | T.Kid | T.PsString)[][] {
    function insert(blocks: T.Block[]): (T.Block | T.Kid | T.PsString)[] {
        const first = blocks[0];
        const rest = blocks.slice(1);
        return [
            first,
            ...enforceKidsSectionBlankout ? [kidsBlank] : kids,
            ...rest,
        ];
    }
    return blocksWVars.map(insert);
}

function compileEnglishVP(VP: T.VPRendered): string[] | undefined {
    function insertEWords(e: string, { subject, object, APs, complement }: { subject: string, object?: string, APs: string, complement: string | undefined }): string {
        return e
            .replace("$SUBJ", subject)
            .replace("$OBJ", object || "")
            // add the complement in English if it's an external complement from a helper verb (kawul/kedul)
            // TODO!
            + (complement /* && isStativeHelper(getVerbFromBlocks(VP.blocks).block.verb))*/
                ? ` ${complement}`
                : "")
            + APs;
    }
    const engSubj = getSubjectSelectionFromBlocks(VP.blocks).selection;
    const obj = getObjectSelectionFromBlocks(VP.blocks).selection;
    const engObj = typeof obj === "object"
        ? obj
        : (obj === "none" || obj === T.Person.ThirdPlurMale)
        ? ""
        : undefined;
    const engAPs = getEngAPs(VP.blocks);
    const engComplement = getEngComplement(VP.blocks);
    // require all English parts for making the English phrase
    return (VP.englishBase && engSubj && engObj !== undefined)
        ? VP.englishBase.map(e => insertEWords(e, {
            // TODO: make sure we actually have the english
            subject: getEnglishFromRendered(engSubj) || "",
            object: engObj ? getEnglishFromRendered(engObj) : "",
            APs: engAPs,
            complement: engComplement,
        })).map(capitalizeFirstLetter)
        : undefined;
}

function compileEnglishEP(EP: T.EPRendered): string[] | undefined {
    function insertEWords(e: string, { subject, predicate, APs }: { subject: string, predicate: string, APs: string }): string {
        return e.replace("$SUBJ", subject).replace("$PRED", predicate || "") + APs;
    }
    const engSubjR = getSubjectSelectionFromBlocks(EP.blocks).selection;
    const engPredR = getPredicateSelectionFromBlocks(EP.blocks).selection;
    const engSubj = getEnglishFromRendered(engSubjR);
    const engPred = getEnglishFromRendered(engPredR);
    const engAPs = getEngAPs(EP.blocks);
    // require all English parts for making the English phrase
    const b = (EP.englishBase && engSubj && engPred)
        ? EP.englishBase.map(e => insertEWords(e, {
            subject: engSubj,
            predicate: engPred,
            APs: engAPs,
        }))
        : undefined;
    return b?.map(capitalizeFirstLetter);
}

export function checkForMiniPronounsError(s: T.EPSelectionState | T.VPSelectionState): undefined | string {
    function findDuplicateMiniP(mp: T.MiniPronoun[]): T.MiniPronoun | undefined {
        const duplicates = mp.filter((item, index) => (
            mp.findIndex(m => item.ps.p === m.ps.p) !== index
        )); 
        if (duplicates.length === 0) return undefined;
        return duplicates[0];
    }
    const kids = (() => {
        if ("predicate" in s) {
            const EPS = completeEPSelection(s);
            if (!EPS) return undefined;
            return renderEP(EPS).kids;
        };
        const VPS = completeVPSelection(s);
        if (!VPS) return undefined;
        return renderVP(VPS).kids;
    })();
    if (!kids) return undefined;
    const miniPronouns = kids.filter(x => x.kid.type === "mini-pronoun").map(m => m.kid) as T.MiniPronoun[];
    if (miniPronouns.length > 2) {
        return "can't add another mini-pronoun, there are alread two";
    }
    const duplicateMiniPronoun = findDuplicateMiniP(miniPronouns);
    if (duplicateMiniPronoun) {
        return `there's already a ${duplicateMiniPronoun.ps.p} - ${duplicateMiniPronoun.ps.f} mini-pronoun in use, can't have two of those`;
    }
    return undefined;
}

function findPossesivesInNP(NP: T.Rendered<T.NPSelection> | T.ObjectNP | undefined): T.Rendered<T.NPSelection>[] {
    if (NP === undefined) return [];
    if (typeof NP !== "object") return [];
    if (!NP.selection.possesor) return [];
    if (NP.selection.adjectives) {
        const { adjectives, ...rest } = NP.selection;
        return [
            ...findPossesivesInAdjectives(adjectives),
            ...findPossesivesInNP({ type: "NP", selection: rest }),
        ];
    }
    if (NP.selection.possesor.shrunken) {
        return [NP.selection.possesor.np];
    }
    return findPossesivesInNP(NP.selection.possesor.np);
}

function findPossesivesInAdjectives(a: T.Rendered<T.AdjectiveSelection>[]): T.Rendered<T.NPSelection>[] {
    return a.reduce((accum, curr): T.Rendered<T.NPSelection>[] => ([
        ...accum,
        ...findPossesivesInAdjective(curr),
    ]), [] as T.Rendered<T.NPSelection>[])
}

function findPossesivesInAdjective(a: T.Rendered<T.AdjectiveSelection>): T.Rendered<T.NPSelection>[] {
    if (!a.sandwich) return [];
    return findPossesivesInNP(a.sandwich.inside);
}

export function flattenLengths(r: T.SingleOrLengthOpts<T.PsString[] | T.PsString>): T.PsString[] {
    if ("long" in r) {
        return Object.values(r).flat();
    }
    if (Array.isArray(r)) {
        return r;
    }
    return [r];
}


