import * as T from "../../types";
import { parseEc } from "../../lib/misc-helpers";
import { inflectWord } from "../pashto-inflector";
import { getEnglishWord } from "../get-english-word";
import * as grammarUnits from "../grammar-units";
import {
    getVerbBlockPosFromPerson,
    getPersonNumber,
} from "../misc-helpers";
import { conjugateVerb } from "../verb-conjugation";
import {
    concatPsString,
    hasBaParticle,
    psStringFromEntry,
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
import { personGender } from "../../library";

// TODO: ISSUE GETTING SPLIT HEAD NOT MATCHING WITH FUTURE VERBS

export function renderVP(VP: T.VPSelectionComplete): T.VPRendered {
    // Sentence Rules Logic
    const isPast = isPastTense(VP.verb.tense);
    const isTransitive = VP.verb.object !== "none";
    const { king, servant } = getKingAndServant(isPast, isTransitive);
    const kingPerson = getPersonFromNP(
        king === "subject" ? VP.subject : VP.verb.object,
    );
    // TODO: more elegant way of handling this type safety
    if (kingPerson === undefined) {
        throw new Error("king of sentance does not exist");
    }
    const subjectPerson = getPersonFromNP(VP.subject);
    const objectPerson = getPersonFromNP(VP.verb.object);
    // TODO: also don't inflect if it's a pattern one animate noun
    const inflectSubject = isPast && isTransitive && !isMascSingAnimatePattern4(VP.subject);
    const inflectObject = !isPast && isFirstOrSecondPersPronoun(VP.verb.object);
    // Render Elements
    return {
        type: "VPRendered",
        king,
        servant,
        isPast,
        isTransitive,
        isCompound: VP.verb.isCompound,
        subject: renderNPSelection(VP.subject, inflectSubject, false, "subject"),
        object: renderNPSelection(VP.verb.object, inflectObject, true, "object"),
        verb: renderVerbSelection(VP.verb, kingPerson, objectPerson),
        englishBase: renderEnglishVPBase({
            subjectPerson,
            object: VP.verb.isCompound === "dynamic" ? "none" : VP.verb.object,
            vs: VP.verb,
        }),
    };
}

export function renderNPSelection(NP: T.NPSelection, inflected: boolean, inflectEnglish: boolean, role: "subject"): T.Rendered<T.NPSelection>
export function renderNPSelection(NP: T.NPSelection | T.ObjectNP, inflected: boolean, inflectEnglish: boolean, role: "object"): T.Rendered<T.NPSelection> | T.Person.ThirdPlurMale | "none";
export function renderNPSelection(NP: T.NPSelection | T.ObjectNP, inflected: boolean, inflectEnglish: boolean, role: "subject" | "object"): T.Rendered<T.NPSelection> | T.Person.ThirdPlurMale | "none" {
    if (typeof NP !== "object") {
        if (role !== "object") {
            throw new Error("ObjectNP only allowed for objects");
        }
        return NP;
    }
    if (NP.type === "noun") {
        return renderNounSelection(NP, inflected);
    }
    if (NP.type === "pronoun") {
        return renderPronounSelection(NP, inflected, inflectEnglish);
    }
    if (NP.type === "participle") {
        return renderParticipleSelection(NP, inflected)
    }
    throw new Error("unknown NP type");
};

function renderNounSelection(n: T.NounSelection, inflected: boolean): T.Rendered<T.NounSelection> {
    const english = getEnglishFromNoun(n.entry, n.number);
    const pashto = ((): T.PsString[] => {
        const infs = inflectWord(n.entry);
        const ps = n.number === "singular"
            ? getInf(infs, "inflections", n.gender, false, inflected)
            : [
                ...getInf(infs, "plural", n.gender, true, inflected),
                ...getInf(infs, "arabicPlural", n.gender, true, inflected),
                ...getInf(infs, "inflections", n.gender, true, inflected),
            ];
        return ps.length > 0
            ? ps
            : [psStringFromEntry(n.entry)];
    })();
    return {
        ...n,
        person: getPersonNumber(n.gender, n.number),
        inflected,
        ps: pashto,
        e: english,
    };
}

function renderPronounSelection(p: T.PronounSelection, inflected: boolean, englishInflected: boolean): T.Rendered<T.PronounSelection> {
    const [row, col] = getVerbBlockPosFromPerson(p.person);
    return {
        ...p,
        inflected,
        ps: grammarUnits.pronouns[p.distance][inflected ? "inflected" : "plain"][row][col],
        e: grammarUnits.persons[p.person].label[englishInflected ? "object" : "subject"],
    };
}

function renderParticipleSelection(p: T.ParticipleSelection, inflected: boolean): T.Rendered<T.ParticipleSelection> {
    return {
        ...p,
        inflected,
        person: T.Person.ThirdPlurMale,
        // TODO: More robust inflection of inflecting pariticiples - get from the conjugation engine 
        ps: [psStringFromEntry(p.verb.entry)].map(ps => inflected ? concatPsString(ps, { p: "و", f: "o" }) : ps),
        e: getEnglishParticiple(p.verb.entry),
    };
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

function getEnglishParticiple(entry: T.DictionaryEntry): string {
    if (!entry.ec) {
        console.log("errored participle");
        console.log(entry);
        throw new Error("no english information for participle");
    }
    const ec = parseEc(entry.ec);
    const participle = ec[2];
    return (entry.ep)
        ? `${participle} ${entry.ep}`
        : participle;
}

function getEnglishFromNoun(entry: T.DictionaryEntry, number: T.NounNumber): string {
    const articles = {
        singular: "(a/the)",
        plural: "(the)",
    };
    const article = articles[number];
    function addArticle(s: string) {
        return `${article} ${s}`;
    }
    const e = getEnglishWord(entry);
    if (!e) throw new Error(`unable to get english from subject ${entry.f} - ${entry.ts}`);

    if (typeof e === "string") return ` ${e}`;
    if (number === "plural") return addArticle(e.plural);
    if (!e.singular || e.singular === undefined) {
        throw new Error(`unable to get english from subject ${entry.f} - ${entry.ts}`);
    }
    return addArticle(e.singular);
}

function getInf(infs: T.InflectorOutput, t: "plural" | "arabicPlural" | "inflections", gender: T.Gender, plural: boolean, inflected: boolean): T.PsString[] {
    // TODO: make this safe!!
    // @ts-ignore
    if (infs && t in infs && infs[t] !== undefined && gender in infs[t] && infs[t][gender] !== undefined) {
        // @ts-ignore
        const iset = infs[t][gender] as T.InflectionSet;
        const inflectionNumber = (inflected ? 1 : 0) + ((t === "inflections" && plural) ? 1 : 0);
        return iset[inflectionNumber];
    }
    return [];
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
