import * as T from "../../types";
import {
    concatPsString, getLong,
} from "../p-text-helpers";
import {
    Segment,
    makeSegment,
    flattenLengths,
    combineSegments,
    splitOffLeapfrogWord,
    putKidsInKidsSection as oldPutKidsInKidsSection,
} from "./segment";
import {
    removeAccents,
} from "../accent-helpers";
import * as grammarUnits from "../grammar-units";
import {
    removeBa,
    removeDuplicates,
} from "./vp-tools";
import { isImperativeTense, isModalTense, isPerfectTense } from "../type-predicates";
import { getEnglishFromRendered, getPashtoFromRendered } from "./np-tools";
import { getVerbBlockPosFromPerson } from "../misc-helpers";
import { pronouns } from "../grammar-units";
import { completeEPSelection, renderEP } from "./render-ep";
import { completeVPSelection } from "./vp-tools";
import { renderVP } from "./render-vp";
import { getAPsFromBlocks, getPredicateSelectionFromBlocks, getRenderedObjectSelection, getRenderedSubjectSelection, getSubjectSelectionFromBlocks, hasEquativeWithLengths, specifyEquativeLength } from "./blocks-utils";

// TODO: GET BLANKING WORKING!

const blank: T.PsString = {
    p: "______",
    f: "______",
};
type BlankoutOptions = { equative?: boolean, ba?: boolean, kidsSection?: boolean };

const kidsBlank: T.PsString = { p: "___", f: "___" };

export function compileVP(VP: T.VPRendered, form: T.FormVersion): { ps: T.SingleOrLengthOpts<T.PsString[]>, e?: string [] };
export function compileVP(VP: T.VPRendered, form: T.FormVersion, combineLengths: true): { ps: T.PsString[], e?: string [] };
export function compileVP(VP: T.VPRendered, form: T.FormVersion, combineLengths?: true): { ps: T.SingleOrLengthOpts<T.PsString[]>, e?: string [] } {
    const verb = VP.verb.ps;
    const { kids, blocks } = getVPSegmentsAndKids(VP, form);
    const psResult = compilePs({
        blocks,
        kids,
        verb,
        VP,
    });
    return {
        ps: combineLengths ? flattenLengths(psResult) : psResult,
        // TODO: English doesn't quite work for dynamic compounds in passive voice
        e: (VP.verb.voice === "passive" && VP.isCompound === "dynamic") ? undefined : compileEnglishVP(VP),
    };
}

type CompilePsInput = {
    blocks: Segment[],
    kids: Segment[],
    verb: {
        head: T.PsString | undefined,
        rest: T.SingleOrLengthOpts<T.PsString[]>,
    },
    VP: T.VPRendered,
}

function compilePs({ blocks, kids, verb: { head, rest }, VP }: CompilePsInput): T.SingleOrLengthOpts<T.PsString[]> {
    if ("long" in rest) {
        return {
            long: compilePs({ blocks, verb: { head, rest: rest.long }, VP, kids }) as T.PsString[],
            short: compilePs({ blocks, verb: { head, rest: rest.short }, VP, kids }) as T.PsString[],
            ...rest.mini ? {
                mini: compilePs({ blocks, verb: { head, rest: rest.mini }, VP, kids }) as T.PsString[],
            } : {},
        };
    }
    const verbWNegativeVersions = arrangeVerbWNegative(head, rest, VP.verb);

    // put together all the different possible permutations based on:
    // a. potential different versions of where the nu goes
    return removeDuplicates(verbWNegativeVersions.flatMap((verbSegments) => {
        // for each permutation of the possible ordering of NPs and Verb + nu
        // 1. put in kids in the kids section
        const segments = oldPutKidsInKidsSection([...blocks, ...verbSegments], kids);
        // 2. space out the words properly
        const withProperSpaces = addSpacesBetweenSegments(segments);
        // 3. throw it all together into a PsString for each permutation
        return combineSegments(withProperSpaces);
    }));
}

export function getShrunkenServant(VP: T.VPRendered): Segment | undefined {
    const shrinkServant = VP.form.shrinkServant && !(VP.isCompound === "dynamic" && !VP.isPast);
    const toShrinkServant: T.Rendered<T.NPSelection> | undefined = (() => {
        if (!shrinkServant) return undefined;
        if (!VP.servant) return undefined;
        const servant = VP.servant === "subject"
            ? getRenderedSubjectSelection(VP.blocks).selection
            : getRenderedObjectSelection(VP.blocks).selection;
        if (typeof servant !== "object") return undefined;
        return servant;
    })();
    return toShrinkServant ? shrinkNP(toShrinkServant) : undefined;
}

export function getVPSegmentsAndKids(VP: T.VPRendered, form?: T.FormVersion): { kids: Segment[], blocks: Segment[] } {
    const removeKing = VP.form.removeKing && !(VP.isCompound === "dynamic" && VP.isPast);
    const shrunkenServant = getShrunkenServant(VP);
    const possToShrink = findPossesivesToShrinkInVP(VP, {
        shrunkServant: !!shrunkenServant,
        removedKing: removeKing,
    });
    const subject = getRenderedSubjectSelection(VP.blocks).selection;
    const blocks = VP.blocks.reduce((accum, block) => {
        if (block.type === "subjectSelection") {
            if (VP.servant === "subject" && shrunkenServant) return accum;
            if (VP.king === "subject" && removeKing) return accum;
            return [
                ...accum,
                makeSegment(getPashtoFromRendered(block.selection, false)),
            ];
        }
        if (block.type === "objectSelection") {
            if (VP.servant === "object" && shrunkenServant) return accum;
            if (VP.king === "object" && removeKing) return accum;
            if (typeof block.selection !== "object") return accum;
            return [
                ...accum,
                makeSegment(getPashtoFromRendered(block.selection, subject.selection.person)),
            ]
        }
        return [
            ...accum,
            makeSegment(getPashtoFromRendered(block, false)),
        ];
    }, [] as Segment[]);
    return {
        kids: orderKidsSection([
            ...VP.verb.hasBa
                ? [makeSegment(grammarUnits.baParticle, ["isBa", "isKid"])] : [],
            ...shrunkenServant
                ? [shrunkenServant] : [],
            ...possToShrink.map(shrinkNP),
        ]),
        blocks: blocks,
    };
}

function arrangeVerbWNegative(head: T.PsString | undefined, restRaw: T.PsString[], V: T.VerbRendered): Segment[][] {
    const hasLeapfrog = isPerfectTense(V.tense) || isModalTense(V.tense);
    const rest = (() => {
        if (hasLeapfrog) {
            const [restF, restLast] = splitOffLeapfrogWord(restRaw);
            return {
                front: makeSegment(restF.map(removeBa), ["isVerbRest"]),
                last: makeSegment(restLast.map(removeBa), ["isVerbRest"]),
            };
        } 
        return makeSegment(restRaw.map(removeBa), ["isVerbRest"]);
    })();
    const headSegment: Segment | undefined = !head
        ? head
        : makeSegment(
            head,
            (head.p === "و" || head.p === "وا")
                ? ["isVerbHead", "isOoOrWaaHead"]
                : ["isVerbHead"]
        );
    if (!V.negative) {
        if ("front" in rest) {
            return [
                headSegment ? [headSegment, rest.front, rest.last] : [rest.front, rest.last],
            ]
        }
        return [
            headSegment ? [headSegment, rest] : [rest],
        ];
    }
    const nu: T.PsString = isImperativeTense(V.tense)
        ? { p: "مه", f: "mú" }
        : { p: "نه", f: "nú" };
    if (!headSegment) {
        if ("front" in rest) {
            return [
                // pefect nu dey me leeduley and nu me dey leeduley
                // actually don't think this is correct - keeping it out for now
                // [
                //     mergeSegments(
                //         makeSegment(nu, ["isNu"]),
                //         rest.last.adjust({ ps: removeAccents }),
                //     ),
                //     rest.front.adjust({ ps: removeAccents }),
                // ],
                [
                    makeSegment(nu, ["isNu"]),
                    rest.last.adjust({ ps: removeAccents }),
                    rest.front.adjust({ ps: removeAccents }),
                ],
                [
                    rest.front.adjust({ ps: removeAccents }),
                    makeSegment(nu, ["isNu"]),
                    rest.last.adjust({ ps: removeAccents }),
                ],
            ];
        }
        return [[
            makeSegment(nu, ["isNu"]),
            rest.adjust({ ps: removeAccents }),
        ]];
    }
    if ("front" in rest) {
        return [
            [
                headSegment.adjust({ ps: removeAccents }),
                rest.last.adjust({
                    ps: r => concatPsString(nu, " ", removeAccents(r)),
                    desc: ["isNu"],
                }),
                rest.front.adjust({
                    ps: r => removeAccents(r),
                }),
            ],
            [
                headSegment.adjust({ ps: removeAccents }),
                rest.front.adjust({
                    ps: r => concatPsString(nu, " ", removeAccents(r)),
                    desc: ["isNu"],
                }),
                rest.last.adjust({
                    ps: r => removeAccents(r),
                }),
            ],
            ...(!headSegment.isOoOrWaaHead && !V.isCompound) ? [[
                mergeSegments(headSegment, rest.front, "no space").adjust({
                    ps: r => concatPsString(nu, " ", removeAccents(r)),
                    desc: ["isNu"],
                }),
                rest.last.adjust({
                    ps: r => removeAccents(r),
                }),
            ]] : [],
        ];       
    }
    return [
        ...(V.voice !== "passive") ? [[
            ...headSegment ? [headSegment.adjust({ ps: removeAccents })] : [],
            rest.adjust({
                ps: r => concatPsString(nu, " ", removeAccents(r)),
                desc: ["isNu"],
            }),
        ]] : [],
        // verbs that have a perfective prefix that is not و or وا can put the
        // nu *before* the prefix as well // TODO: also وي prefixes?
        ...((!headSegment.isOoOrWaaHead && !V.isCompound) || (V.voice === "passive")) ? [[
            makeSegment(nu, ["isNu"]),
            headSegment.adjust({ ps: removeAccents }),
            rest.adjust({ ps: removeAccents }),
        ]] : [],
    ];
}

export function compileEP(EP: T.EPRendered): { ps: T.SingleOrLengthOpts<T.PsString[]>, e?: string[] };
export function compileEP(EP: T.EPRendered, combineLengths: true, blankOut?: BlankoutOptions): { ps: T.PsString[], e?: string[] };
export function compileEP(EP: T.EPRendered, combineLengths?: boolean, blankOut?: BlankoutOptions): { ps: T.SingleOrLengthOpts<T.PsString[]>, e?: string[] } {
    const psResult = compileEPPs(EP.blocks, EP.kids, EP.omitSubject, blankOut);
    return {
        ps: combineLengths ? flattenLengths(psResult) : psResult,
        e: compileEnglishEP(EP),
    };
}

function compileEPPs(blocks: T.Block[], kids: T.Kid[], omitSubject: boolean, blankOut?: BlankoutOptions): T.SingleOrLengthOpts<T.PsString[]> {
    if (hasEquativeWithLengths(blocks)) {
        return {
            long: compileEPPs(specifyEquativeLength(blocks, "long"), kids, omitSubject, blankOut) as T.PsString[],
            short: compileEPPs(specifyEquativeLength(blocks, "short"), kids, omitSubject, blankOut) as T.PsString[],
        };
    }
    const subjectPerson = getSubjectSelectionFromBlocks(blocks)
        .selection.selection.person;
    const blocksWKids = putKidsInKidsSection(
        omitSubject ? blocks.filter(b => b.type !== "subjectSelection") : blocks,
        kids,
    );
    return removeDuplicates(combineIntoText(blocksWKids, subjectPerson, blankOut));
}

function combineIntoText(pieces: (T.Block | T.Kid)[], subjectPerson: T.Person, blankOut?: BlankoutOptions): T.PsString[] {
    const first = pieces[0];
    const rest = pieces.slice(1);
    const firstPs = (blankOut?.equative && first.type === "equative")
        ? [blank]
        : ((blankOut?.ba || blankOut?.kidsSection) && first.type === "ba")
        // TODO: properly handle blanking out whole kids section
        ? [kidsBlank]
        : getPsFromPiece(first, subjectPerson);
    if (!rest.length) {
        return firstPs;
    }
    return combineIntoText(rest, subjectPerson).flatMap(r => (
            firstPs.map(fPs => concatPsString(fPs, " ", r))
        )
    );
}

function getPsFromPiece(piece: T.Block | T.Kid, subjectPerson: T.Person): T.PsString[] {
    if (piece.type === "ba") {
        return [grammarUnits.baParticle];
    }
    if (piece.type === "mini-pronoun") {
        return [piece.ps];
    }
    if (piece.type === "nu") {
        return [{ p: "نه", f: "nú" }];
    }
    if (piece.type === "equative") {
        // length will already be specified in compileEPPs - this is just for type safety
        return getLong(piece.equative.ps);
    }
    if (piece.type === "subjectSelection" || piece.type === "predicateSelection") {
        return getPashtoFromRendered(piece.selection, subjectPerson);
    }
    // if (piece.type === "AP") {
        return getPashtoFromRendered(piece, subjectPerson);
    // }
}

function getEngAPs(blocks: T.Block[]): string {
    return getAPsFromBlocks(blocks).reduce((accum, curr) => {
        const e = getEnglishFromRendered(curr);
        if (!e) return accum;
        return `${accum} ${e}`;
    }, "");
}

function getEnglishAPs(blocks: (T.Rendered<T.SubjectSelectionComplete> | T.Rendered<T.APSelection> | T.RenderedVPSBlock)[]) {
    const APs = blocks.filter(x => x.type !== "subjectSelection") as T.Rendered<T.APSelection>[];
    return APs.reduce((accum, curr) => {
        const e = getEnglishFromRendered(curr);
        if (!e) return accum;
        return `${accum} ${e}`;
    }, "");
}

function putKidsInKidsSection(blocks: T.Block[], kids: T.Kid[]): (T.Block | T.Kid)[] {
    const first = blocks[0];
    const rest = blocks.slice(1);
    return [
        first,
        ...kids,
        ...rest,
    ];
}


function mergeSegments(s1: Segment, s2: Segment, noSpace?: "no space"): Segment {
    if (noSpace) {
        return s2.adjust({ ps: (p) => concatPsString(s1.ps[0], p) });
    }
    return s2.adjust({ ps: (p) => concatPsString(s1.ps[0], " ", p) });
}

function addSpacesBetweenSegments(segments: Segment[]): (Segment | " " | "" | T.PsString)[] {
    const o: (Segment | " " | "" | T.PsString)[] = [];
    for (let i = 0; i < segments.length; i++) {
        const current = segments[i];
        const next = segments[i+1];
        o.push(current);
        if (!next) break;
        if (
            // stative compound part
            !current.ps[0].p.endsWith(" ")
            &&
            (
                (next.isKidBetweenHeadAndRest || next.isNu)
                ||
                (next.isVerbRest && current.isKidBetweenHeadAndRest)
            )
        ) {
            o.push({
                f: " ", // TODO: make this "-" in the right places
                p: ((current.isVerbHead && (next.isMiniPronoun || next.isNu))
                || (current.isOoOrWaaHead && (next.isBa || next.isNu))) ? "" : " ", // or if its waa head
            });
        } else if (current.isVerbHead && next.isVerbRest) {
            o.push("");
        } else {
            o.push(" ");
        }
    }
    return o;
}

function compileEnglishVP(VP: T.VPRendered): string[] | undefined {
    function insertEWords(e: string, { subject, object, APs }: { subject: string, object?: string, APs: string }): string {
        return e.replace("$SUBJ", subject).replace("$OBJ", object || "") + APs;
    }
    const engSubj = getRenderedSubjectSelection(VP.blocks).selection;
    const obj = getRenderedObjectSelection(VP.blocks).selection;
    const engObj = typeof obj === "object"
        ? obj
        : obj === "none"
        ? ""
        : undefined;
    const engAPs = getEnglishAPs(VP.blocks);
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

export function checkEPForMiniPronounsError(s: T.EPSelectionState): undefined | string {
    function findDuplicateMiniP(mp: T.MiniPronoun[]): T.MiniPronoun | undefined {
        const duplicates = mp.filter((item, index) => (
            mp.findIndex(m => item.ps.p === m.ps.p) !== index
        )); 
        if (duplicates.length === 0) return undefined;
        return duplicates[0];
    }
    const kids = (() => {
        const EPS = completeEPSelection(s);
        if (!EPS) return undefined;
        const { kids } = renderEP(EPS);
        return kids;
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

export function checkForMiniPronounsError(s: T.VPSelectionState): undefined | string {
    function findDuplicateMiniPronoun(mp: Segment[]): Segment | undefined {
        const duplicates = mp.filter((item, index) => (
            mp.findIndex(m => item.ps[0].p === m.ps[0].p) !== index
        )); 
        if (duplicates.length === 0) return undefined;
        return duplicates[0];
    }
    const kids = (() => {
        const VPS = completeVPSelection(s);
        if (!VPS) return undefined;
        const { kids } = getVPSegmentsAndKids(renderVP(VPS));
        return kids;
    })();
    if (!kids) return undefined;
    const miniPronouns = kids.filter(x => x.isMiniPronoun);
    if (miniPronouns.length > 2) {
        return "can't add another mini-pronoun, there are alread two";
    }
    const duplicateMiniPronoun = findDuplicateMiniPronoun(miniPronouns);
    if (duplicateMiniPronoun) {
        return `there's already a ${duplicateMiniPronoun.ps[0].p} - ${duplicateMiniPronoun.ps[0].f} mini-pronoun in use, can't have two of those`;
    }
    return undefined;
}

export function findPossesivesToShrinkInVP(VP: T.VPRendered, f: {
    shrunkServant: boolean,
    removedKing: boolean,
}): T.Rendered<T.NPSelection>[] {
    return VP.blocks.reduce((found, block) => {
        if (block.type === "subjectSelection") {
            if (block.selection.selection.role === "king" && f.removedKing) return found;
            if (block.selection.selection.role === "servant" && f.shrunkServant) return found;
            return [
                ...findPossesivesInNP(block.selection),
                ...found,
            ];
        }
        if (block.type === "objectSelection") {
            if (typeof block.selection !== "object") return found;
            if (block.selection.selection.role === "king" && f.removedKing) return found;
            if (block.selection.selection.role === "servant" && f.shrunkServant) return found;
            return [
                ...findPossesivesInNP(block.selection),
                ...found,
            ];
        }
        if (block.selection.type === "sandwich") {
            if (block.selection.inside.selection.type === "pronoun") {
                return found;
            }
            return [
                ...findPossesivesInNP(block.selection.inside),
                ...found,
            ];
        }
        return found;
    }, [] as T.Rendered<T.NPSelection>[]);
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


// export function findPossesiveToShrinkInVP(VP: T.VPRendered): T.Rendered<T.NPSelection>[] {
//     const obj: T.Rendered<T.NPSelection> | undefined = ("object" in VP && typeof VP.object === "object")
//         ? VP.object
//         : undefined;
//     return [
//         ...findPossesivesInNP(VP.subject),
//         ...findPossesivesInNP(obj),
//     ];
// }

export function shrinkNP(np: T.Rendered<T.NPSelection>): Segment {
    function getFirstSecThird(): 1 | 2 | 3 {
        if ([0, 1, 6, 7].includes(np.selection.person)) return 1;
        if ([2, 3, 8, 9].includes(np.selection.person)) return 2;
        return 3;
    }
    const [row, col] = getVerbBlockPosFromPerson(np.selection.person);
    return makeSegment(pronouns.mini[row][col], ["isKid", getFirstSecThird()]);
}

