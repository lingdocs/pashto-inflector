import * as T from "../../types";
import {
    concatPsString, getLong, getShort,
} from "../p-text-helpers";
import { negativeParticle } from "../../lib/grammar-units";
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
    getVerbFromBlocks,
    hasEquativeWithLengths,
    hasVerbWithLengths,
    specifyEquativeLength,
    specifyVerbLength,
} from "./blocks-utils";

const blank: T.PsString = {
    p: "______",
    f: "______",
};
type BlankoutOptions = { equative?: boolean, ba?: boolean, kidsSection?: boolean };

const kidsBlank: T.PsString = { p: "___", f: "___" };


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
export function compileVP(VP: T.VPRendered, form: T.FormVersion, combineLengths: true): { ps: T.PsString[], e?: string [] };
export function compileVP(VP: T.VPRendered, form: T.FormVersion, combineLengths?: true): { ps: T.SingleOrLengthOpts<T.PsString[]>, e?: string [] } {
    const verb = getVerbFromBlocks(VP.blocks).block;
    const psResult = compileVPPs(VP.blocks, VP.kids, form, VP.king);
    return {
        ps: combineLengths ? flattenLengths(psResult) : psResult,
        // TODO: English doesn't quite work for dynamic compounds in passive voice
        e: (verb.voice === "passive" && VP.isCompound === "dynamic") ? undefined : compileEnglishVP(VP),
    };
}

function compileVPPs(blocks: T.Block[][], kids: T.Kid[], form: T.FormVersion, king: "subject" | "object"): T.SingleOrLengthOpts<T.PsString[]> {
    if (hasVerbWithLengths(blocks)) {
        return {
            long: compileVPPs(specifyVerbLength(blocks, "long"), kids, form, king) as T.PsString[],
            short: compileVPPs(specifyVerbLength(blocks, "short"), kids, form, king) as T.PsString[],
        };
    }
    const subjectPerson = getSubjectSelectionFromBlocks(blocks)
        .selection.selection.person;
    const blocksWKids = putKidsInKidsSection(
        filterForVisibleBlocksVP(blocks, form, king),
        kids,
        false,
    );
    return removeDuplicates(combineIntoText(blocksWKids, subjectPerson, {}));
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
        omitSubject ? blocks.map(blks => blks.filter(b => b.type !== "subjectSelection")) : blocks,
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
                (king === "subject" && block.type === "subjectSelection")
                ||
                (king === "object" && block.type === "objectSelection")
            ) return false;
        }
        if (form.shrinkServant) {
            if (
                (servant === "subject" && block.type === "subjectSelection")
                ||
                (servant === "object" && block.type === "objectSelection")
            ) return false;
        }
        if (block.type === "objectSelection" && typeof block.selection !== "object") {
            return false;
        }
        return true;
    }));
}

export function filterForVisibleBlocksEP(blocks: T.Block[][], omitSubject: boolean): T.Block[][] {
    if (!omitSubject) return blocks;
    return blocks.map(blks => blks.filter((block) => {
        if (block.type === "subjectSelection") {
            return false;
        }
        return true;
    }));
}

function combineIntoText(piecesWVars: (T.Block | T.Kid | T.PsString)[][], subjectPerson: T.Person, blankOut?: BlankoutOptions): T.PsString[] {
    function combine(pieces: (T.Block | T.Kid | T.PsString)[]): T.PsString[] {
        const first = pieces[0];
        const next = pieces[1];
        const rest = pieces.slice(1);
        const firstPs = ("p" in first)
            ? [first]
            : (blankOut?.equative && first.type === "equative")
            ? [blank]
            : ((blankOut?.ba) && first.type === "ba")
            ? [kidsBlank]
            : getPsFromPiece(first, subjectPerson);
        if (!rest.length) {
            return firstPs;
        }
        return combine(rest).flatMap(r => (
                firstPs.map(fPs => concatPsString(
                    fPs,
                    (!("p" in first) && first.type === "perfectiveHead" && !("p" in next) && (next.type === "verb" || next.type === "negative" || next.type === "mini-pronoun"))
                        ? ((next.type === "negative" || next.type === "mini-pronoun") ? { p: "", f: "-" } : "")
                        : " ",
                    r,
                ))
            )
        );
    }
    return piecesWVars.flatMap(combine);
}

function getPsFromPiece(piece: T.Block | T.Kid, subjectPerson: T.Person): T.PsString[] {
    if (piece.type === "ba") {
        return [grammarUnits.baParticle];
    }
    if (piece.type === "mini-pronoun") {
        return [piece.ps];
    }
    if (piece.type === "negative") {
        return [
            negativeParticle[piece.imperative ? "imperative" : "nonImperative"],
        ];
    }
    if (piece.type === "equative") {
        // length will already be specified in compileEPPs - this is just for type safety
        return getLong(piece.equative.ps);
    }
    if (piece.type === "subjectSelection" || piece.type === "predicateSelection") {
        return getPashtoFromRendered(piece.selection, subjectPerson);
    }
    if (piece.type === "AP") {
        return getPashtoFromRendered(piece, subjectPerson);
    }
    if (piece.type === "perfectiveHead") {
        return [piece.ps];
    }
    if (piece.type === "verbComplement") {
        return [{ p: "---", f: "---"}]; //getPashtoFromRendered(piece.complement);
    }
    if (piece.type === "objectSelection") {
        if (typeof piece.selection !== "object") {
            return [{ p: "", f: "" }];
        }
        return getPashtoFromRendered(piece.selection, subjectPerson);
    }
    if (piece.type === "verb") {
        // getLong is just for type safety - we will have split up the length options earlier in compileVPPs
        return getLong(piece.block.ps);
    }
    if (piece.type === "perfectParticipleBlock") {
        // getLong is just for type safety - we will have split up the length options earlier in compileVPPs
        return getLong(piece.ps);
    }
    if (piece.type === "perfectEquativeBlock") {
        // just using the short one for now - it will only be short anyways
        return getShort(piece.ps);
    }
    if (piece.type === "modalVerbBlock") {
        // getLong is just for type safety - we will have split up the length options earlier in compileVPPs
        return getLong(piece.ps);
    }
    if (piece.type === "modalVerbKedulPart") {
        // just using the short one for now - it will only be short anyways
        return getShort(piece.ps);
    }
    throw new Error("unrecognized piece type");
}

function getEngAPs(blocks: T.Block[][]): string {
    return getAPsFromBlocks(blocks).reduce((accum, curr) => {
        const e = getEnglishFromRendered(curr);
        if (!e) return accum;
        return `${accum} ${e}`;
    }, "");
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
    function insertEWords(e: string, { subject, object, APs }: { subject: string, object?: string, APs: string }): string {
        return e.replace("$SUBJ", subject).replace("$OBJ", object || "") + APs;
    }
    const engSubj = getSubjectSelectionFromBlocks(VP.blocks).selection;
    const obj = getObjectSelectionFromBlocks(VP.blocks).selection;
    const engObj = typeof obj === "object"
        ? obj
        : obj === "none"
        ? ""
        : undefined;
    const engAPs = getEngAPs(VP.blocks);
    // require all English parts for making the English phrase
    return (VP.englishBase && engSubj && engObj !== undefined)
        ? VP.englishBase.map(e => insertEWords(e, {
            // TODO: make sure we actually have the english
            subject: getEnglishFromRendered(engSubj) || "",
            object: engObj ? getEnglishFromRendered(engObj) : "",
            APs: engAPs,
        }))
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
    return b;
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
    const miniPronouns = kids.filter(x => x.type === "mini-pronoun") as T.MiniPronoun[];
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

