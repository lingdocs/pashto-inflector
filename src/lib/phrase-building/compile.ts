import * as T from "../../types";
import {
    concatPsString,
} from "../p-text-helpers";
import {
    Segment,
    makeSegment,
    flattenLengths,
    combineSegments,
    splitOffLeapfrogWord,
    putKidsInKidsSection,
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

const blank: T.PsString = {
    p: "______",
    f: "______",
};
type BlankoutOptions = { equative?: boolean, ba?: boolean, kidsSection?: boolean };

const kidsBlank = makeSegment({ p: "___", f: "___" }, ["isKid"]);

type Form = T.FormVersion & { OSV?: boolean };
export function compileVP(VP: T.VPRendered, form: Form): { ps: T.SingleOrLengthOpts<T.PsString[]>, e?: string [] };
export function compileVP(VP: T.VPRendered, form: Form, combineLengths: true): { ps: T.PsString[], e?: string [] };
export function compileVP(VP: T.VPRendered, form: Form, combineLengths?: true): { ps: T.SingleOrLengthOpts<T.PsString[]>, e?: string [] } {
    const verb = VP.verb.ps;
    const { kids, NPs } = getVPSegmentsAndKids(VP, form);
    const psResult = compilePs({
        NPs,
        kids,
        verb,
        VP,
    });
    return {
        ps: combineLengths ? flattenLengths(psResult) : psResult,
        // TODO: English doesn't quite work for dynamic compounds in passive voice
        e: (VP.verb.voice === "passive" && VP.isCompound === "dynamic") ? undefined : compileEnglish(VP),
    };
}

type CompilePsInput = {
    NPs: Segment[][],
    kids: Segment[],
    verb: {
        head: T.PsString | undefined,
        rest: T.SingleOrLengthOpts<T.PsString[]>,
    },
    VP: T.VPRendered,
}
function compilePs({ NPs, kids, verb: { head, rest }, VP }: CompilePsInput): T.SingleOrLengthOpts<T.PsString[]> {
    if ("long" in rest) {
        return {
            long: compilePs({ NPs, verb: { head, rest: rest.long }, VP, kids }) as T.PsString[],
            short: compilePs({ NPs, verb: { head, rest: rest.short }, VP, kids }) as T.PsString[],
            ...rest.mini ? {
                mini: compilePs({ NPs, verb: { head, rest: rest.mini }, VP, kids }) as T.PsString[],
            } : {},
        };
    }
    const verbWNegativeVersions = arrangeVerbWNegative(head, rest, VP.verb);

    // put together all the different possible permutations based on:
    // a. potential different versions of where the nu goes
    return removeDuplicates(verbWNegativeVersions.flatMap((verbSegments) => (
    // b. potential reordering of NPs
        NPs.flatMap(NP => {
            // for each permutation of the possible ordering of NPs and Verb + nu
            // 1. put in kids in the kids section
            const segments = putKidsInKidsSection([...NP, ...verbSegments], kids);
            // 2. space out the words properly
            const withProperSpaces = addSpacesBetweenSegments(segments);
            // 3. throw it all together into a PsString for each permutation
            return combineSegments(withProperSpaces);
        })
    )));
}

export function getShrunkenServant(VP: T.VPRendered): Segment | undefined {
    const shrinkServant = VP.form.shrinkServant && !(VP.isCompound === "dynamic" && !VP.isPast);
    const toShrinkServant = (() => {
        if (!shrinkServant) return undefined;
        if (!VP.servant) return undefined;
        const servant = VP[VP.servant];
        if (typeof servant !== "object") return undefined;
        return servant;
    })();
    return toShrinkServant ? shrinkNP(toShrinkServant) : undefined;
}

export function getVPSegmentsAndKids(VP: T.VPRendered, form?: Form): { kids: Segment[], NPs: Segment[][] } {
    const removeKing = VP.form.removeKing && !(VP.isCompound === "dynamic" && VP.isPast);
    const shrunkenServant = getShrunkenServant(VP);
    const possToShrink = findPossesivesToShrinkInVP(VP, {
        shrunkServant: !!shrunkenServant,
        removedKing: removeKing,
    });
    const SO = {
        subject: getPashtoFromRendered(VP.subject, false),
        object: typeof VP.object === "object" ? getPashtoFromRendered(VP.object, VP.subject.person) : undefined,
    };
    function getSegment(t: "subject" | "object"): Segment | undefined {
        const word = (VP.servant === t)
            ? (!shrunkenServant ? SO[t] : undefined)
            : (VP.king === t)
            ? (!removeKing ? SO[t] : undefined)
            : undefined;
        if (!word) return undefined;
        return makeSegment(word);
    }
    const subject = getSegment("subject");
    const object = getSegment("object");

    return {
        kids: orderKidsSection([
            ...VP.verb.hasBa
                ? [makeSegment(grammarUnits.baParticle, ["isBa", "isKid"])] : [],
            ...shrunkenServant
                ? [shrunkenServant] : [],
            ...possToShrink.map(shrinkNP),
        ]),
        NPs: [
            [
                ...subject ? [subject] : [],
                ...object ? [object] : [],
            ],
            // TODO: make this an option to also include O S V order ??
            // also show O S V if both are showing
            ...(subject && object && (form && form.OSV)) ? [[object, subject]] : [],
        ],
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
    const { kids, NPs } = getEPSegmentsAndKids(EP, blankOut);
    const equative = EP.equative.ps;
    const psResult = compileEPPs({
        NPs,
        kids,
        equative: blankOut?.equative ? [blank] : equative,
        negative: EP.equative.negative,
    });
    return {
        ps: combineLengths ? flattenLengths(psResult) : psResult,
        e: compileEPEnglish(EP),
    };
}

export function getEPSegmentsAndKids(EP: T.EPRendered, blankOut?: BlankoutOptions): { kids: Segment[], NPs: Segment[] } {
    const possToShrink = findPossesivesToShrinkInEP(EP);
    const subject = makeSegment(getPashtoFromRendered(EP.subject, false));
    const predicate = makeSegment(getPashtoFromRendered(EP.predicate, false));
    return {
        kids: blankOut?.kidsSection ? [kidsBlank] : orderKidsSection([
            ...EP.equative.hasBa
                ? (
                    blankOut?.ba ? [kidsBlank] : [makeSegment(grammarUnits.baParticle, ["isBa", "isKid"])])
                : [],
            ...possToShrink.map(a => shrinkNP(a.np)),
        ]),
        NPs: [
            ...EP.omitSubject ? [] : [subject],
            predicate
        ],
    };
}

function compileEPPs({ NPs, kids, equative, negative }: {
    NPs: Segment[],
    kids: Segment[],
    equative: T.SingleOrLengthOpts<T.PsString[]>,
    negative: boolean,
}): T.SingleOrLengthOpts<T.PsString[]> {
    if ("long" in equative) {
        return {
            long: compileEPPs({ NPs, kids, equative: equative.long, negative }) as T.PsString[],
            short: compileEPPs({ NPs, kids, equative: equative.short, negative }) as T.PsString[],
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

function compileEPEnglish(EP: T.EPRendered): string[] | undefined {
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

function compileEnglish(VP: T.VPRendered): string[] | undefined {
    function insertEWords(e: string, { subject, object }: { subject: string, object?: string }): string {
        return e.replace("$SUBJ", subject).replace("$OBJ", object || "");
    }
    const engSubj = getEnglishFromRendered(VP.subject);
    const engObj = typeof VP.object === "object"
        ? getEnglishFromRendered(VP.object)
        : undefined;
    // require all English parts for making the English phrase
    return (VP.englishBase && engSubj && (engObj || typeof VP.object !== "object"))
        ? VP.englishBase.map(e => insertEWords(e, {
            subject: engSubj,
            object: engObj,
        }))
        : undefined;
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

export function checkForMiniPronounsError(s: T.EPSelectionState | T.VPSelectionState): undefined | string {
    function findDuplicateMiniPronoun(mp: Segment[]): Segment | undefined {
        const duplicates = mp.filter((item, index) => (
            mp.findIndex(m => item.ps[0].p === m.ps[0].p) !== index
        )); 
        if (duplicates.length === 0) return undefined;
        return duplicates[0];
    }
    const kids = (() => {
        if ("predicate" in s) {
            const EPS = completeEPSelection(s);
            if (!EPS) return undefined;
            const { kids } = getEPSegmentsAndKids(renderEP(EPS));
            return kids;
        }
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
    return findPossesives(VP.subject, VP.object).filter(x => (
        // only give the possesive to shrink if it's not alread in a shrunken servant
        !(f.shrunkServant && x.role === "servant")
        && // or in a removed king
        !(f.removedKing && x.role === "king")
    ));
}

function findPossesives(...nps: (T.Rendered<T.NPSelection> | T.ObjectNP | undefined)[]): T.Rendered<T.NPSelection>[] {
    return nps.reduce((accum, curr) => {
        const res = findPossesiveInNP(curr);
        if (res) return [...accum, res];
        return accum;
    }, [] as T.Rendered<T.NPSelection>[]);
}

function findPossesiveInNP(NP: T.Rendered<T.NPSelection> | T.ObjectNP | undefined): T.Rendered<T.NPSelection> | undefined {
    if (NP === undefined) return undefined;
    if (typeof NP !== "object") return undefined;
    if (!NP.possesor) return undefined;
    if (NP.possesor.shrunken) {
        return NP.possesor.np;
    }
    return findPossesiveInNP(NP.possesor.np);
}

type FoundNP = {
    np: T.Rendered<T.NPSelection>,
    from: "subject" | "predicate",
};
export function findPossesivesToShrinkInEP(EP: T.EPRendered): FoundNP[] {
    const inSubject = findPossesiveInNP(EP.subject);
    const inPredicate = (EP.predicate.type === "adjective" || EP.predicate.type === "loc. adv.")
        ? undefined
        : findPossesiveInNP(
            // @ts-ignore - ts being dumb
            EP.predicate as T.NPSelection
        );
    return [
        ...inSubject ? [{ np: inSubject, from: "subject"} as FoundNP] : [],
        ...inPredicate ? [{ np: inPredicate, from: "predicate" } as FoundNP] : [],
    ].filter(found => !(found.from === "subject" && EP.omitSubject));
}

export function findPossesiveToShrinkInVP(VP: T.VPRendered): T.Rendered<T.NPSelection> | undefined {
    const obj: T.Rendered<T.NPSelection> | undefined = ("object" in VP && typeof VP.object === "object")
        ? VP.object
        : undefined;
    return (
        findPossesiveInNP(VP.subject)
        ||
        findPossesiveInNP(obj)
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

