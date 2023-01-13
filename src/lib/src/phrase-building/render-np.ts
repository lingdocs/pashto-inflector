import * as T from "../../../types";
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
import {
    getEnglishParticiple,
} from "../np-tools";
import { getEnglishWord } from "../get-english-word";
import { renderAdjectiveSelection } from "./render-adj";
import { isPattern5Entry, isAnimNounEntry, isPattern1Entry } from "../type-predicates";

export function renderNPSelection(NP: T.NPSelection, inflected: boolean, inflectEnglish: boolean, role: "subject", soRole: "servant" | "king" | "none", isPuSandwich: boolean): T.Rendered<T.NPSelection>;
export function renderNPSelection(NP: T.NPSelection, inflected: boolean, inflectEnglish: boolean, role: "object", soRole: "servant" | "king" | "none", isPuSandwich: boolean): T.Rendered<T.NPSelection>;
export function renderNPSelection(NP: T.NPSelection, inflected: boolean, inflectEnglish: boolean, role: "subject" | "object", soRole: "servant" | "king" | "none", isPuSandwich: boolean): T.Rendered<T.NPSelection> {
    if (typeof NP !== "object") {
        if (role !== "object") {
            throw new Error("ObjectNP only allowed for objects");
        }
        return NP;
    }
    if (NP.selection.type === "noun") {
        return {
            type: "NP", 
            selection: renderNounSelection(NP.selection, inflected, soRole, undefined, isPuSandwich),
        };
    }
    if (NP.selection.type === "pronoun") {
        return {
            type: "NP",
            selection: renderPronounSelection(NP.selection, inflected, inflectEnglish, soRole),
        };
    }
    if (NP.selection.type === "participle") {
        return {
            type: "NP",
            selection: renderParticipleSelection(NP.selection, inflected, soRole),
        };
    }
    throw new Error("unknown NP type");
};

export function renderNounSelection(n: T.NounSelection, inflected: boolean, role: "servant" | "king" | "none", noArticles?: true | "noArticles", isPuSandwich?: boolean): T.Rendered<T.NounSelection> {
    const english = getEnglishFromNoun(n.entry, n.number, noArticles);
    const nounInflects = inflected && !(isPuSandwich && isPattern1Entry(n.entry) && n.number === "singular");
    const pashto = ((): T.PsString[] => {
        const infs = inflectWord(n.entry);
        const ps = n.number === "singular"
            ? getInf(infs, "inflections", n.gender, false, nounInflects)
            : (() => {
                const plural = getInf(infs, "plural", n.gender, true, inflected);
                return [
                    ...plural,
                    ...getInf(infs, "arabicPlural", n.gender, true, inflected),
                    ...(!plural.length || n.gender === "fem")
                        // allow for plurals like ډاکټرې as well as ډاکټرانې
                        ? getInf(infs, "inflections", n.gender, true, inflected)
                        : [],
                ];
            })();
        return ps.length > 0
            ? ps
            : [psStringFromEntry(n.entry)];
    })();
    const person = getPersonNumber(n.gender, n.number);
    return {
        ...n,
        adjectives: n.adjectives.map(a => renderAdjectiveSelection(a, person, inflected, isPuSandwich && n.number === "singular")),
        person,
        inflected,
        role,
        ps: pashto,
        e: english,
        possesor: renderPossesor(n.possesor, role),
        demonstrative: renderDemonstrative(n.demonstrative, inflected && n.number === "plural"),
    };
}

function renderDemonstrative(demonstrative: T.DemonstrativeSelection | undefined, plurInflected: boolean): T.Rendered<T.DemonstrativeSelection> | undefined {
    if (!demonstrative) {
        return undefined;
    }
    return {
        ...demonstrative,
        ps: demonstrative.demonstrative === "daa"
            ? (plurInflected ? { p: "دې", f: "de" } : { p: "دا", f: "daa" })
            : demonstrative.demonstrative === "dagha"
            ? (plurInflected ? { p: "دغه", f: "dágha" } : { p: "دغو", f: "dágho" })
            : (plurInflected ? { p: "هغه", f: "hágha" } : { p: "هغو", f: "hágho" })
    }
}

function renderPronounSelection(p: T.PronounSelection, inflected: boolean, englishInflected: boolean, role: "servant" | "king" | "none"): T.Rendered<T.PronounSelection> {
    const [row, col] = getVerbBlockPosFromPerson(p.person);
    return {
        ...p,
        inflected,
        role,
        ps: grammarUnits.pronouns[p.distance][inflected ? "inflected" : "plain"][row][col],
        e: grammarUnits.persons[p.person].label[englishInflected ? "object" : "subject"],
    };
}

function renderParticipleSelection(p: T.ParticipleSelection, inflected: boolean, role: "servant" | "king" | "none"): T.Rendered<T.ParticipleSelection> {
    return {
        ...p,
        inflected,
        role,
        person: T.Person.ThirdPlurMale,
        // TODO: More robust inflection of inflecting pariticiples - get from the conjugation engine 
        ps: [psStringFromEntry(p.verb.entry)].map(ps => inflected ? concatPsString(ps, { p: "و", f: "o" }) : ps),
        e: getEnglishParticiple(p.verb.entry),
        possesor: renderPossesor(p.possesor, "subj/obj"),
    };
}

function renderPossesor(possesor: T.PossesorSelection | undefined, possesorRole: "servant" | "king" | "none" | "subj/obj"): T.RenderedPossesorSelection | undefined {
    if (!possesor) return undefined;
    const isSingUnisexAnim5PatternNoun = (possesor.np.selection.type === "noun"
        && possesor.np.selection.number === "singular"
        && isAnimNounEntry(possesor.np.selection.entry)
        && isPattern5Entry(possesor.np.selection.entry)
    );
    return {
        shrunken: possesor.shrunken,
        np: renderNPSelection(
            possesor.np,
            !isSingUnisexAnim5PatternNoun,
            possesorRole === "subj/obj" ? true : false,
            "subject",
            possesorRole === "subj/obj" ? "none" : possesorRole,
            false,
        ),
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

function getEnglishFromNoun(entry: T.DictionaryEntry, number: T.NounNumber, noArticles?: true | "noArticles"): string {
    const articles = {
        singular: "(a/the)",
        plural: "(the)",
    };
    const article = articles[number];
    function addArticle(s: string) {
        if (noArticles) return s;
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