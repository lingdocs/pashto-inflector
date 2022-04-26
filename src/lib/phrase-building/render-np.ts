import * as T from "../../types";
import { inflectWord } from "../pashto-inflector";
import * as grammarUnits from "../grammar-units";
import {
    getVerbBlockPosFromPerson,
    getPersonNumber,
} from "../misc-helpers";
import {
    concatPsString,
    psStringFromEntry,
} from "../p-text-helpers";
import { parseEc } from "../misc-helpers";
import { getEnglishWord } from "../get-english-word";

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