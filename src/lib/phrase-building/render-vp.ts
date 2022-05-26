import * as T from "../../types";
import {
    getVerbBlockPosFromPerson,
} from "../misc-helpers";
import { conjugateVerb } from "../verb-conjugation";
import {
    hasBaParticle,
    getLong,
    isImperativeBlock,
} from "../p-text-helpers";
import { removeAccents } from "../accent-helpers";
import {
    getPersonFromNP,
    removeBa,
    isPastTense,
    getTenseVerbForm,
} from "./vp-tools";
import {
    isPattern4Entry,
    isPerfectTense,
} from "../type-predicates";
import { renderEnglishVPBase } from "./english-vp-rendering";
import { personGender } from "../../lib/misc-helpers";
import { renderNPSelection } from "./render-np";
import { getObjectSelection, getSubjectSelection } from "./blocks-utils";
import { renderAPSelection } from "./render-ap";

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
    const b: T.VPRendered = {
        type: "VPRendered",
        king,
        servant,
        isPast,
        isTransitive,
        isCompound: VP.verb.isCompound,
        blocks: renderVPBlocks(VP.blocks, {
            inflectSubject,
            inflectObject,
            king,
        }),
        verb: renderVerbSelection(VP.verb, kingPerson, objectPerson),
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

function renderVPBlocks(blocks: T.VPSBlockComplete[], config: {
    inflectSubject: boolean,
    inflectObject: boolean,
    king: "subject" | "object",
}): T.RenderedVPSBlock[] {
    return blocks.map(({ block }): T.RenderedVPSBlock => {
        if (block.type === "subjectSelection") {
            return {
                type: "subjectSelection",
                selection: renderNPSelection(block.selection, config.inflectSubject, false, "subject", config.king === "subject" ? "king" : "servant"),
            }
        }
        if (block.type === "objectSelection") {
            const object = typeof block === "object" ? block.selection : block;
            const selection = renderNPSelection(object, config.inflectObject, true, "object", config.king === "object" ? "king" : "servant");
            return {
                type: "objectSelection",
                selection,
            };
        }
        return renderAPSelection(block);
    });
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

function renderVerbSelection(vs: T.VerbSelectionComplete, person: T.Person, objectPerson: T.Person | undefined): T.VerbRendered {
    const v = vs.dynAuxVerb || vs.verb;
    const conjugations = conjugateVerb(v.entry, v.complement);
    // TODO: error handle this?
    const conj = "grammaticallyTransitive" in conjugations
        // if there's an option for grammatically transitive or transitive
        // will default to transitive
        ? conjugations.transitive
        : "stative" in conjugations
        // TODO: option to manually select stative/dynamic
        ? conjugations.stative
        : conjugations; 
    return {
        ...vs,
        person,
        ...getPsVerbConjugation(conj, vs, person, objectPerson),
    }
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
        const splitInfo = conj.info[past ? "root" : "stem"].perfectiveSplit;
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
    return { hasBa, ps: { head: undefined, rest: verbForm }};
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
    if (o.type !== "pronoun") return false;
    return [0,1,2,3,6,7,8,9].includes(o.person);
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
    if (np.type !== "noun") {
        return false;
    }
    return isPattern4Entry(np.entry)
        && np.entry.c.includes("anim.")
        && (np.number === "singular")
        && (np.gender === "masc");
}
