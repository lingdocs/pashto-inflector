import * as T from "../../types";
import {
    getVerbBlockPosFromPerson,
} from "../misc-helpers";
import { conjugateVerb } from "../verb-conjugation";
import {
    hasBaParticle,
    getLong,
    isImperativeBlock,
    splitOffLeapfrogWordFull,
    getShort,
} from "../p-text-helpers";
import { removeAccents, removeAccentsWLength } from "../accent-helpers";
import {
    getPersonFromNP,
    removeBa,
    isPastTense,
    getTenseVerbForm,
} from "./vp-tools";
import {
    isImperativeTense,
    isModalTense,
    isPattern4Entry,
    isPerfectTense,
} from "../type-predicates";
import { renderEnglishVPBase } from "./english-vp-rendering";
import { personGender } from "../../lib/misc-helpers";
import { renderNPSelection } from "./render-np";
import { findPerfectiveHead, getObjectSelection, getSubjectSelection, makeBlock, makeKid } from "./blocks-utils";
import { renderAPSelection } from "./render-ap";
import { findPossesivesToShrink, orderKids, getMiniPronounPs } from "./render-common";

// TODO: ISSUE GETTING SPLIT HEAD NOT MATCHING WITH FUTURE VERBS

export function renderVP(VP: T.VPSelectionComplete): T.VPRendered {
    const subject = getSubjectSelection(VP.blocks).selection;
    const object = getObjectSelection(VP.blocks).selection;
    // Sentence Rules Logic
    const isPast = isPastTense(VP.verb.tense);
    const isTransitive = object !== "none";
    const { king, servant } = getKingAndServant(isPast, isTransitive);
    const kingPerson = getPersonFromNP(
        king === "subject" ? subject : object,
    );
    // TODO: more elegant way of handling this type safety
    if (kingPerson === undefined) {
        throw new Error("king of sentance does not exist");
    }
    const subjectPerson = getPersonFromNP(subject);
    const objectPerson = getPersonFromNP(object);
    // TODO: also don't inflect if it's a pattern one animate noun
    const inflectSubject = isPast && isTransitive && !isMascSingAnimatePattern4(subject);
    const inflectObject = !isPast && isFirstOrSecondPersPronoun(object);
    // Render Elements
    const firstBlocks = renderVPBlocks(VP.blocks, {
        inflectSubject,
        inflectObject,
        king,
    });
    const { verbBlocks, hasBa } = renderVerbSelection(VP.verb, kingPerson, objectPerson);
    const b: T.VPRendered = {
        type: "VPRendered",
        king,
        servant,
        isPast,
        isTransitive,
        isCompound: VP.verb.isCompound,
        blocks: insertNegative([
            ...firstBlocks,
            ...verbBlocks.map(makeBlock),
        ], VP.verb.negative, isImperativeTense(VP.verb.tense)),
        kids: getVPKids(hasBa, VP.blocks, VP.form, king),
        englishBase: renderEnglishVPBase({
            subjectPerson,
            object: VP.verb.isCompound === "dynamic" ? "none" : object,
            vs: VP.verb,
        }),
        form: VP.form,
        whatsAdjustable: whatsAdjustable(VP),
    };
    return b;
}

// function arrangeVerbWNegative(head: T.PsString | undefined, restRaw: T.PsString[], V: T.VerbRendered): Segment[][] {
//     const hasLeapfrog = isPerfectTense(V.tense) || isModalTense(V.tense);
//     const rest = (() => {
//         if (hasLeapfrog) {
//             const [restF, restLast] = splitOffLeapfrogWord(restRaw);
//             return {
//                 front: makeSegment(restF.map(removeBa), ["isVerbRest"]),
//                 last: makeSegment(restLast.map(removeBa), ["isVerbRest"]),
//             };
//         } 
//         return makeSegment(restRaw.map(removeBa), ["isVerbRest"]);
//     })();
//     const headSegment: Segment | undefined = !head
//         ? head
//         : makeSegment(
//             head,
//             (head.p === "و" || head.p === "وا")
//                 ? ["isVerbHead", "isOoOrWaaHead"]
//                 : ["isVerbHead"]
//         );
//     if (!V.negative) {
//         if ("front" in rest) {
//             return [
//                 headSegment ? [headSegment, rest.front, rest.last] : [rest.front, rest.last],
//             ]
//         }
//         return [
//             headSegment ? [headSegment, rest] : [rest],
//         ];
//     }
//     const nu: T.PsString = isImperativeTense(V.tense)
//         ? { p: "مه", f: "mú" }
//         : { p: "نه", f: "nú" };
//     if (!headSegment) {
//         if ("front" in rest) {
//             return [
//                 // pefect nu dey me leeduley and nu me dey leeduley
//                 // actually don't think this is correct - keeping it out for now
//                 // [
//                 //     mergeSegments(
//                 //         makeSegment(nu, ["isNu"]),
//                 //         rest.last.adjust({ ps: removeAccents }),
//                 //     ),
//                 //     rest.front.adjust({ ps: removeAccents }),
//                 // ],
//                 [
//                     makeSegment(nu, ["isNu"]),
//                     rest.last.adjust({ ps: removeAccents }),
//                     rest.front.adjust({ ps: removeAccents }),
//                 ],
//                 [
//                     rest.front.adjust({ ps: removeAccents }),
//                     makeSegment(nu, ["isNu"]),
//                     rest.last.adjust({ ps: removeAccents }),
//                 ],
//             ];
//         }
//         return [[
//             makeSegment(nu, ["isNu"]),
//             rest.adjust({ ps: removeAccents }),
//         ]];
//     }
//     if ("front" in rest) {
//         return [
//             [
//                 headSegment.adjust({ ps: removeAccents }),
//                 rest.last.adjust({
//                     ps: r => concatPsString(nu, " ", removeAccents(r)),
//                     desc: ["isNu"],
//                 }),
//                 rest.front.adjust({
//                     ps: r => removeAccents(r),
//                 }),
//             ],
//             [
//                 headSegment.adjust({ ps: removeAccents }),
//                 rest.front.adjust({
//                     ps: r => concatPsString(nu, " ", removeAccents(r)),
//                     desc: ["isNu"],
//                 }),
//                 rest.last.adjust({
//                     ps: r => removeAccents(r),
//                 }),
//             ],
//             ...(!headSegment.isOoOrWaaHead && !V.isCompound) ? [[
//                 mergeSegments(headSegment, rest.front, "no space").adjust({
//                     ps: r => concatPsString(nu, " ", removeAccents(r)),
//                     desc: ["isNu"],
//                 }),
//                 rest.last.adjust({
//                     ps: r => removeAccents(r),
//                 }),
//             ]] : [],
//         ];       
//     }
//     return [
//         ...(V.voice !== "passive") ? [[
//             ...headSegment ? [headSegment.adjust({ ps: removeAccents })] : [],
//             rest.adjust({
//                 ps: r => concatPsString(nu, " ", removeAccents(r)),
//                 desc: ["isNu"],
//             }),
//         ]] : [],
//         // verbs that have a perfective prefix that is not و or وا can put the
//         // nu *before* the prefix as well // TODO: also وي prefixes?
//         ...((!headSegment.isOoOrWaaHead && !V.isCompound) || (V.voice === "passive")) ? [[
//             makeSegment(nu, ["isNu"]),
//             headSegment.adjust({ ps: removeAccents }),
//             rest.adjust({ ps: removeAccents }),
//         ]] : [],
//     ];
// }

function getVPKids(hasBa: boolean, blocks: T.VPSBlockComplete[], form: T.FormVersion, king: "subject" | "object"): T.Kid[] {
    const subject = getSubjectSelection(blocks).selection;
    const objectS = getObjectSelection(blocks).selection;
    const object = typeof objectS === "object" ? objectS : undefined;
    const servantNP = king === "subject" ? object : subject;
    const shrunkenServant = (form.shrinkServant && servantNP)
        ? makeKid(shrinkServant(servantNP))
        : undefined;
    const shrunkenPossesives = findPossesivesToShrink(removeAbbreviated(blocks, form, king)).map(makeKid);
    return orderKids([
        ...hasBa ? [makeKid({ type: "ba" })] : [],
        ...shrunkenServant ? [shrunkenServant] : [],
        ...shrunkenPossesives ? shrunkenPossesives : [],
    ]); 
}

function removeAbbreviated(blocks: T.VPSBlockComplete[], form: T.FormVersion, king: "subject" | "object"): T.VPSBlockComplete[] {
    return blocks.filter(({ block }) => {
        if (block.type === "subjectSelection") {
            if (form.shrinkServant && king === "object") return false;
            if (form.removeKing && king === "subject") return false;
        }
        if (block.type === "objectSelection") {
            if (form.shrinkServant && king === "subject") return false;
            if (form.removeKing && king === "object") return false;
        }
        return true;
    })
}

function insertNegative(blocks: T.Block[], negative: boolean, imperative: boolean): T.Block[][] {
    // TODO: proper arrange verb with negative and variations
    // ALSO removing the accent from nu
    if (!negative) return [blocks];
    const blocksA = removeVerbAccent(blocks);
    const basic: T.Block[] = [
        ...blocksA.slice(0, blocks.length - 1),
        makeBlock({
            type: "negative",
            imperative,
        }),
        ...blocksA.slice(-1), 
    ];
    const nonStandardPerfectiveSplit = hasNonStandardPerfectiveSplit(blocks);
    if (nonStandardPerfectiveSplit) {
        return [
            basic,
            [
                ...blocksA.slice(0, blocks.length - 2),
                makeBlock({ type: "negative", imperative }),
                ...blocksA.slice(-2, -1), // second last (perfective split)
                ...blocksA.slice(-1), // last (verb)
            ],
        ];
    };
    if (hasLeapFroggable(blocks)) {
        const perfectiveHead = findPerfectiveHead([blocks]);
        const perfectiveHeadReg = perfectiveHead && ["و", "وا"].includes(perfectiveHead.ps.p);
        if (perfectiveHead) {
            return [
                [
                    ...blocksA.slice(0, blocks.length - 2),
                    makeBlock({ type: "negative", imperative }),
                    ...blocksA.slice(-1), // last
                    ...blocksA.slice(-2, -1), // second last
                ],
                [
                    ...blocksA.slice(0, blocks.length - 2),
                    makeBlock({ type: "negative", imperative }),
                    ...blocksA.slice(-2),
                ],
                ...!perfectiveHeadReg ? [basic] : [],
            ];
        }
        return [
            [
                ...blocksA.slice(0, blocks.length - 2),
                makeBlock({ type: "negative", imperative }),
                ...blocksA.slice(-1), // last
                ...blocksA.slice(-2, -1), // second last
            ],
            basic,
        ];
    }
    return [basic];
}

function hasLeapFroggable(blocks: T.Block[]): boolean {
    return blocks.some(b => b.block.type === "perfectEquativeBlock" || b.block.type === "modalVerbBlock");
}

function hasNonStandardPerfectiveSplit(blocks: T.Block[]): boolean {
    const perfS = blocks.find(b => b.block.type === "perfectiveHead");
    if (!perfS || perfS.block.type !== "perfectiveHead") {
        return false;
    }
    return !["و", "وا"].includes(perfS.block.ps.p);
}

function removeVerbAccent(blocks: T.Block[]): T.Block[] {
    return blocks.map((block) => {
        if (block.block.type === "perfectiveHead") {
            return {
                ...block,
                block: {
                    ...block.block,
                    ps: removeAccents(block.block.ps),
                },
            };
        }
        if (block.block.type === "verb") {
            return {
                ...block,
                block: {
                    ...block.block,
                    ps: removeAccentsWLength(block.block.block.ps),
                },
            };
        }
        return block;
    });
}

function shrinkServant(np: T.NPSelection): T.MiniPronoun {
    const person = getPersonFromNP(np);
    return {
        type: "mini-pronoun",
        person,
        ps: getMiniPronounPs(person),
        source: "servant",
        np,
    };
}

function renderVPBlocks(blocks: T.VPSBlockComplete[], config: {
    inflectSubject: boolean,
    inflectObject: boolean,
    king: "subject" | "object",
}): T.Block[] {
    return blocks.reduce((blocks, { block }): T.Block[] => {
        if (block.type === "subjectSelection") {
            return [
                ...blocks,
                makeBlock({
                    type: "subjectSelection",
                    selection: renderNPSelection(block.selection, config.inflectSubject, false, "subject", config.king === "subject" ? "king" : "servant"),
                }),
            ];
        }
        if (block.type === "objectSelection") {
            const object = typeof block === "object" ? block.selection : block;
            if (typeof object !== "object") {
                return [
                    ...blocks,
                    makeBlock({
                        type: "objectSelection",
                        selection: object,
                    }),
                ];
            }
            const selection = renderNPSelection(object, config.inflectObject, true, "object", config.king === "object" ? "king" : "servant");
            return [
                ...blocks,
                makeBlock({
                    type: "objectSelection",
                    selection,
                }),
            ];
        }
        return [
            ...blocks,
            makeBlock(renderAPSelection(block)),
        ];
    }, [] as T.Block[]);
}

function whatsAdjustable(VP: T.VPSelectionComplete): "both" | "king" | "servant" {
    // TODO: intransitive dynamic compounds?
    return (VP.verb.isCompound === "dynamic" && VP.verb.transitivity === "transitive")
        ? (isPastTense(VP.verb.tense) ? "servant" : "king")
        : VP.verb.transitivity === "transitive"
        ? (VP.verb.voice === "active" ? "both" : "king")
        : VP.verb.transitivity === "intransitive"
        ? "king"
        // grammTrans
        : isPastTense(VP.verb.tense)
        ? "servant"
        : "king";
}

type VerbBlocks =
    | [T.PerfectiveHeadBlock, T.VerbRenderedBlock] // verb w perfective split
    | [T.VerbRenderedBlock] // verb w/out perfective split
    | [T.PerfectParticipleBlock, T.PerfectEquativeBlock] // perfect verb
    | [T.ModalVerbBlock, T.ModalVerbKedulPart] // modal verb

function renderVerbSelection(vs: T.VerbSelectionComplete, person: T.Person, objectPerson: T.Person | undefined): {
    verbBlocks: VerbBlocks
    hasBa: boolean,  
} {
    const v = vs.dynAuxVerb || vs.verb;
    const conjugations = conjugateVerb(v.entry, v.complement);
    // TODO: error handle this?
    const conj = "grammaticallyTransitive" in conjugations
        // if there's an option for grammatically transitive or transitive
        // will default to transitive
        ? conjugations.transitive
        : "stative" in conjugations
        ? conjugations.stative
        : conjugations;
    const { ps: { head, rest }, hasBa } = getPsVerbConjugation(conj, vs, person, objectPerson);
    const vrb: T.VerbRenderedBlock = {
        type: "verb",
        block: {
            ...vs,
            ps: rest,
            person,
            hasBa,
        },
    };
    const verbBlocks = [
        ...(head ? (
                vs.isCompound === "stative" ? [{
                    type: "verbComplement",
                    complement: head,
                } as T.VerbComplementBlock] : [{
                    type: "perfectiveHead",
                    ps: head,
                } as T.PerfectiveHeadBlock]
            ) : [] as [T.VerbComplementBlock] | [T.PerfectiveHeadBlock] | []),
        ...splitUpIfModal(vrb),
    ] as VerbBlocks;
    const perfectStuff = isPerfectTense(vrb.block.tense) ? getPerfectStuff(rest, vrb) : undefined;
    return {
        verbBlocks: perfectStuff ? perfectStuff : verbBlocks,
        hasBa,
    };
}

function splitUpIfModal(v: T.VerbRenderedBlock): [T.VerbRenderedBlock] | [T.ModalVerbBlock, T.ModalVerbKedulPart] {
    if (!isModalTense(v.block.tense)) {
        return [v];
    }
    const [vrb, k] = splitOffLeapfrogWordFull(v.block.ps);
    return [
        {
            type: "modalVerbBlock",
            ps: vrb,
            verb: v,
        },
        {
            type: "modalVerbKedulPart",
            // sadly just for type safety - the conjugator always just gives us the short form
            ps: getShort(k),
            verb: v,
        },
    ];
}

function getPerfectStuff(v: T.SingleOrLengthOpts<T.PsString[]>, vrb: T.VerbRenderedBlock): [T.PerfectParticipleBlock, T.PerfectEquativeBlock] {
    const [p, eq] = splitOffLeapfrogWordFull(v);
    return [
        {
            type: "perfectParticipleBlock",
            ps: p,
            person: vrb.block.person,
            verb: vrb,
        },
        {
            type: "perfectEquativeBlock",
            // TODO: right now the conjugator just always spits out the short form of the equative - would be nice to have both
            ps: getShort(eq),
            person: vrb.block.person,
        },
    ];
}

function getPsVerbConjugation(conj: T.VerbConjugation, vs: T.VerbSelectionComplete, person: T.Person, objectPerson: T.Person | undefined): {
    ps: {
        head: T.PsString | undefined,
        rest: T.SingleOrLengthOpts<T.PsString[]>,
    },
    hasBa: boolean,
} { 
    // TODO: handle the imperative form here
    const f = getTenseVerbForm(conj, vs.tense, vs.voice, vs.negative);
    const block = getMatrixBlock(f, objectPerson, person);
    const perfective = (vs.tense === "perfectiveImperative" && vs.negative)
        ? false
        : isPerfective(vs.tense);
    const verbForm = getVerbFromBlock(block, person);
    const hasBa = hasBaParticle(getLong(verbForm)[0]);
    if (perfective) {
        const past = isPastTense(vs.tense);
        const splitInfo = conj.info[(past || isModalTense(vs.tense)) ? "root" : "stem"].perfectiveSplit;
        if (!splitInfo) return { ps: { head: undefined, rest: verbForm }, hasBa };
        // TODO: Either solve this in the inflector or here, it seems silly (or redundant)
        // to have a length option in the perfective split stem??
        const [splitHead] = getLong(getMatrixBlock(splitInfo, objectPerson, person));
        const ps = getHeadAndRest(splitHead, verbForm);
        return {
            hasBa,
            ps,
        };
    }
    return { hasBa, ps: { head: undefined, rest: removeBaFromForm(verbForm) }};
}

function removeBaFromForm(f: T.SingleOrLengthOpts<T.PsString[]>): T.SingleOrLengthOpts<T.PsString[]> {
    if ("long" in f) {
        return {
            long: removeBaFromForm(f.long) as T.PsString[],
            short: removeBaFromForm(f.short) as T.PsString[],
            ...f.mini ? {
                mini: removeBaFromForm(f.mini) as T.PsString[],
            } : {},
        };
    }
    return f.map(removeBa);
}

function getVerbFromBlock(block: T.SingleOrLengthOpts<T.VerbBlock | T.ImperativeBlock>, person: T.Person): T.SingleOrLengthOpts<T.PsString[]> {
    function grabFromBlock(b: T.VerbBlock | T.ImperativeBlock, [row, col]: [ row: number, col: number ]): T.PsString[] {
        if (isImperativeBlock(b)) {
            return b[personGender(person) === "masc" ? 0 : 1][col];
        }
        return b[row][col];
    }
    const pos = getVerbBlockPosFromPerson(person);
    if ("long" in block) {
        return {
            long: grabFromBlock(block.long, pos),
            short: grabFromBlock(block.short, pos),
            ...block.mini ? {
                mini: grabFromBlock(block.mini, pos),
            } : {},
        };
    }
    return grabFromBlock(block, pos);
}

function getHeadAndRest(head: T.PsString, rest: T.PsString[]): { head: T.PsString | undefined, rest: T.PsString[] };
function getHeadAndRest(head: T.PsString, rest: T.SingleOrLengthOpts<T.PsString[]>): { head: T.PsString | undefined, rest: T.SingleOrLengthOpts<T.PsString[]> };
function getHeadAndRest(head: T.PsString, rest: T.SingleOrLengthOpts<T.PsString[]>): { head: T.PsString | undefined, rest: T.SingleOrLengthOpts<T.PsString[]> } {
    if ("long" in rest) {
        return {
            // whether or not to include the head (for irreg tlul) -- eww // TODO: make nicer?
            head: removeBa(rest.long[0]).p.slice(0, head.p.length) === head.p
                ? head : undefined,
            rest: {
                long: getHeadAndRest(head, rest.long).rest,
                short: getHeadAndRest(head, rest.short).rest,
                ...rest.mini ? {
                    mini: getHeadAndRest(head, rest.mini).rest,
                } : {},
            },
        };
    }
    let headMismatch = false;
    const restM = rest.map((psRaw) => {
        const ps = removeBa(psRaw);
        const pMatches = removeAccents(ps.p.slice(0, head.p.length)) === head.p
        const fMatches = removeAccents(ps.f.slice(0, head.f.length)) === removeAccents(head.f);
        if (!(pMatches && fMatches)) {
            headMismatch = true;
            return psRaw;
            // throw new Error(`split head does not match - ${JSON.stringify(ps)} ${JSON.stringify(head)}`);
        }
        return {
            p: ps.p.slice(head.p.length), 
            f: ps.f.slice(head.f.length),
        }
    });
    return {
        head: headMismatch ? undefined : head,
        rest: restM,
    }
}

function getMatrixBlock<U>(f: {
    mascSing: T.SingleOrLengthOpts<U>;
    mascPlur: T.SingleOrLengthOpts<U>;
    femSing: T.SingleOrLengthOpts<U>;
    femPlur: T.SingleOrLengthOpts<U>;
} | T.SingleOrLengthOpts<U>, objectPerson: T.Person | undefined, kingPerson: T.Person): T.SingleOrLengthOpts<U> {
    if (!("mascSing" in f)) {
        return f;
    }
    function personToLabel(p: T.Person): "mascSing" | "mascPlur" | "femSing" | "femPlur" {
        if (p === T.Person.FirstSingMale || p === T.Person.SecondSingMale || p === T.Person.ThirdSingMale) {
            return "mascSing";
        }
        if (p === T.Person.FirstSingFemale || p === T.Person.SecondSingFemale || p === T.Person.ThirdSingFemale) {
            return "femSing";
        }
        if (p === T.Person.FirstPlurMale || p === T.Person.SecondPlurMale || p === T.Person.ThirdPlurMale) {
            return "mascPlur";
        }
        return "femPlur";
    }
    // if there's an object the matrix will agree with that, otherwise with the kingPerson (subject for intransitive)
    const person = (objectPerson === undefined) ? kingPerson : objectPerson;
    return f[personToLabel(person)];
}

export function getKingAndServant(isPast: boolean, isTransitive: boolean): 
    { king: "subject", servant: "object" } |
    { king: "object", servant: "subject" } |
    { king: "subject", servant: undefined } {
    if (!isTransitive) {
        return { king: "subject", servant: undefined };
    }
    return isPast ? {
        king: "object",
        servant: "subject",
    } : {
        king: "subject",
        servant: "object",
    };
}

function isFirstOrSecondPersPronoun(o: "none" | T.NPSelection | T.Person.ThirdPlurMale): boolean {
    if (typeof o !== "object") return false;
    if (o.selection.type !== "pronoun") return false;
    return [0,1,2,3,6,7,8,9].includes(o.selection.person);
}

function isPerfective(t: T.Tense): boolean {
    if (isPerfectTense(t)) return false;
    if (t === "presentVerb" || t === "imperfectiveFuture" || t === "imperfectivePast" || t === "habitualImperfectivePast") {
        return false;
    }
    if (t === "perfectiveFuture" || t === "subjunctiveVerb" || t === "perfectivePast" || t === "habitualPerfectivePast") {
        return true;
    }
    if (t === "perfectiveFutureModal" || t === "subjunctiveVerbModal" || t === "perfectivePastModal" || t === "habitualPerfectivePastModal") {
        return true;
    }
    if (t === "perfectiveImperative") {
        return true;
    }
    return false;
}

function isMascSingAnimatePattern4(np: T.NPSelection): boolean {
    if (np.selection.type !== "noun") {
        return false;
    }
    return isPattern4Entry(np.selection.entry)
        && np.selection.entry.c.includes("anim.")
        && (np.selection.number === "singular")
        && (np.selection.gender === "masc");
}
