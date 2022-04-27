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
import { getVerbBlockPosFromPerson } from "../misc-helpers";
import * as grammarUnits from "../grammar-units";
import {
    removeBa,
    removeDuplicates,
} from "./vp-tools";
import { isImperativeTense, isModalTense, isPerfectTense } from "../type-predicates";
import { getEnglishFromRendered, getPashtoFromRendered } from "./np-tools";

type Form = T.FormVersion & { OSV?: boolean };
export function compileVP(VP: T.VPRendered, form: Form): { ps: T.SingleOrLengthOpts<T.PsString[]>, e?: string [] };
export function compileVP(VP: T.VPRendered, form: Form, combineLengths: true): { ps: T.PsString[], e?: string [] };
export function compileVP(VP: T.VPRendered, form: Form, combineLengths?: true): { ps: T.SingleOrLengthOpts<T.PsString[]>, e?: string [] } {
    const verb = VP.verb.ps;
    const { kids, NPs } = getSegmentsAndKids(VP, form);
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

function getSegmentsAndKids(VP: T.VPRendered, form: Form): { kids: Segment[], NPs: Segment[][] } {
    const SO = {
        subject: getPashtoFromRendered(VP.subject),
        object: typeof VP.object === "object" ? getPashtoFromRendered(VP.object) : undefined,
    }
    const removeKing = form.removeKing && !(VP.isCompound === "dynamic" && VP.isPast);
    const shrinkServant = form.shrinkServant && !(VP.isCompound === "dynamic" && !VP.isPast);

    const toShrink = (() => {
        if (!shrinkServant) return undefined;
        if (!VP.servant) return undefined;
        const servant = VP[VP.servant];
        if (typeof servant !== "object") return undefined;
        return servant;
    })();
    function getSegment(t: "subject" | "object"): Segment | undefined {
        const word = (VP.servant === t)
            ? (!shrinkServant ? SO[t] : undefined)
            : (VP.king === t)
            ? (!removeKing ? SO[t] : undefined)
            : undefined;
        if (!word) return undefined;
        return makeSegment(word);
    }
    const subject = getSegment("subject");
    const object = getSegment("object");

    return {
        kids: [
            ...VP.verb.hasBa
                ? [makeSegment(grammarUnits.baParticle, ["isBa", "isKid"])] : [],
            ...toShrink
                ? [shrinkNP(toShrink)] : [],
        ],
        NPs: [
            [
                ...subject ? [subject] : [],
                ...object ? [object] : [],
            ],
            // TODO: make this an option to also include O S V order ??
            // also show O S V if both are showing
            ...(subject && object && form.OSV) ? [[object, subject]] : [],
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
                [
                    mergeSegments(
                        makeSegment(nu, ["isNu"]),
                        rest.last.adjust({ ps: removeAccents }),
                    ),
                    rest.front.adjust({ ps: removeAccents }),
                ],
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

function shrinkNP(np: T.Rendered<T.NPSelection>): Segment {
    const [row, col] = getVerbBlockPosFromPerson(np.person);
    return makeSegment(grammarUnits.pronouns.mini[row][col], ["isKid", "isMiniPronoun"]);
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

