import {
    isFirstPerson,
    isSecondPerson,
} from "../../lib/misc-helpers";
import * as T from "../../types";
import { concatPsString } from "../p-text-helpers";

function getBaseAndAdjectives(np: T.Rendered<T.NPSelection | T.EqCompSelection | T.APSelection>): T.PsString[] {
    if (np.type === "sandwich") {
        return getSandwichPsBaseAndAdjectives(np);
    }
    const adjs = "adjectives" in np && np.adjectives;
    if (!adjs) {
        return np.ps;
    }
    return np.ps.map(p => (
        concatPsString(
            adjs.reduce((accum, curr) => (
                // TODO: with variations of adjs?
                concatPsString(accum, " ", curr.ps[0])
            ), { p: "", f: "" }),
            " ",
            p,
        )
    ));
}

function getSandwichPsBaseAndAdjectives(s: T.Rendered<T.SandwichSelection<T.Sandwich>>): T.PsString[] {
    const insideBase = getBaseAndAdjectives(s.inside);
    const willContractWithPronoun = s.before && s.before.p === "د" && s.inside.type === "pronoun"
        && (isFirstPerson(s.inside.person) || isSecondPerson(s.inside.person))
    const contracted = (willContractWithPronoun && s.inside.type === "pronoun")
        ? contractPronoun(s.inside)
        : undefined
    return insideBase.map((inside) => (
        concatPsString(
            (s.before && !willContractWithPronoun) ? s.before : "",
            s.before ? " " : "",
            contracted ? contracted : inside,
            s.after ? " " : "",
            s.after ? s.after : "",
        )
    ));
}

function contractPronoun(n: T.Rendered<T.PronounSelection>): T.PsString | undefined {
    return isFirstPerson(n.person)
        ? concatPsString({ p: "ز", f: "z" }, n.ps[0])
        : isSecondPerson(n.person)
        ? concatPsString({ p: "س", f: "s" }, n.ps[0])
        : undefined;
}

function trimOffShrunkenPossesive(p: T.Rendered<T.NPSelection>): T.Rendered<T.NPSelection> {
    if (!("possesor" in p)) {
        return p;
    }
    if (!p.possesor) {
        return p;
    }
    if (p.possesor.shrunken) {
        return {
            ...p,
            possesor: undefined,
        };
    }
    return {
        ...p,
        possesor: {
            ...p.possesor,
            np: trimOffShrunkenPossesive(p.possesor.np),
        }
    }
}

export function getPashtoFromRendered(b: T.Rendered<T.NPSelection> | T.Rendered<T.EqCompSelection> | T.Rendered<T.APSelection>, subjectsPerson: false | T.Person): T.PsString[] {
    const base = getBaseAndAdjectives(b);
    if (b.type === "loc. adv." || b.type === "adverb") {
        return base;
    }
    if (b.type === "adjective") {
        if (!b.sandwich) {
            return base 
        }
        const sandwichPs = getPashtoFromRendered(b.sandwich, false);
        return base.flatMap(p => (
            sandwichPs.flatMap(s => (
                concatPsString(s, " ", p)
            ))
        ));
    }
    const trimmed = b.type === "sandwich" ? {
        ...b,
        inside: trimOffShrunkenPossesive(b.inside),
    } : trimOffShrunkenPossesive(b);
    if (trimmed.type === "sandwich") {
        return trimmed.inside.possesor
            ? addPossesor(trimmed.inside.possesor.np, base, subjectsPerson)
            : base;
    }
    if (trimmed.possesor) {
        return addPossesor(trimmed.possesor.np, base, subjectsPerson);
    }
    return base;
}

function addPossesor(owner: T.Rendered<T.NPSelection>, existing: T.PsString[], subjectsPerson: false | T.Person): T.PsString[] {
    function willBeReflexive(subj: T.Person, obj: T.Person): boolean {
        return (
            ([0, 1].includes(subj) && [0, 1].includes(obj))
            ||
            ([2, 3].includes(subj) && [8, 9].includes(obj))
        );
    }
    const wPossesor = existing.flatMap(ps => (
        getBaseAndAdjectives(owner).map(v => (
            (owner.type === "pronoun" && subjectsPerson !== false && willBeReflexive(subjectsPerson, owner.person))
                ? concatPsString({ p: "خپل", f: "khpul" }, " ", ps)
                : (owner.type === "pronoun" && isFirstPerson(owner.person))
                ? concatPsString({ p: "ز", f: "z" }, v, " ", ps)
                : (owner.type === "pronoun" && isSecondPerson(owner.person))
                ? concatPsString({ p: "س", f: "s" }, v, " ", ps)
                : concatPsString({ p: "د", f: "du" }, " ", v, " ", ps)
        ))
    ));
    if (!owner.possesor) {
        return wPossesor;
    }
    return addPossesor(owner.possesor.np, wPossesor, subjectsPerson);
}

function addArticlesAndAdjs(np: T.Rendered<T.NounSelection>): string | undefined {
    if (!np.e) return undefined;
    try {
        // split out the atricles so adjectives can be stuck inbetween them and the word
        const chunks = np.e.split("the)");
        const [articles, word] = chunks.length === 1
            ? ["", np.e]
            : [chunks[0] + "the) ", chunks[1]];
        const adjs = !np.adjectives
            ? ""
            : np.adjectives.reduce((accum, curr): string => {
                if (!curr.e) throw new Error("no english for adjective");
                return accum + curr.e + " ";
            }, "");
        const genderTag = np.genderCanChange ? (np.gender === "fem" ? " (f.)" : " (m.)") : "";
        return `${articles}${adjs}${word}${genderTag}`;
    } catch (e) {
        return undefined;
    }
}

function addPossesors(possesor: T.Rendered<T.NPSelection> | undefined, base: string | undefined, type: "noun" | "participle"): string | undefined {
    function removeArticles(s: string): string {
        return s.replace("(the) ", "").replace("(a/the) ", "");
    }
    if (!base) return undefined;
    if (!possesor) return base;
    if (possesor.type === "pronoun") {
        return type === "noun"
            ? `${pronounPossEng(possesor.person)} ${removeArticles(base)}`
            : `(${pronounPossEng(possesor.person)}) ${removeArticles(base)} (${possesor.e})`
    }
    const possesorE = getEnglishFromRendered(possesor);
    if (!possesorE) return undefined;
    return type === "noun"
        ? `${possesorE}'s ${removeArticles(base)}`
        : `(${possesorE}'s) ${removeArticles(base)} (${possesorE})`;
}

function pronounPossEng(p: T.Person): string {
    if (p === T.Person.FirstSingMale || p === T.Person.FirstSingFemale) {
        return "my";
    }
    if (p === T.Person.FirstPlurMale || p === T.Person.FirstPlurFemale) {
        return "our";
    }
    if (p === T.Person.SecondSingMale || p === T.Person.SecondSingFemale) {
        return "your";
    }
    if (p === T.Person.SecondPlurMale || p === T.Person.SecondPlurFemale) {
        return "your (pl.)";
    }
    if (p === T.Person.ThirdSingMale) {
        return "his/its";
    }
    if (p === T.Person.ThirdSingFemale) {
        return "her/its";
    }
    return "their";
}

export function getEnglishFromRendered(r: T.Rendered<T.NPSelection | T.EqCompSelection | T.APSelection>): string | undefined {
    if (r.type === "sandwich") {
        return getEnglishFromRenderedSandwich(r);
    }
    if (!r.e) return undefined;
    if (r.type === "loc. adv." || r.type === "adverb") {
        return r.e;
    }
    if (r.type === "adjective") {
        return getEnglishFromRenderedAdjective(r);
    }
    if (r.type !== "pronoun") {
        // TODO: shouldn't have to do this 'as' - should be automatically narrowing
        const np = r as T.Rendered<T.NounSelection>;
        return addPossesors(np.possesor?.np, addArticlesAndAdjs(np), r.type);
    }
    return r.e;
}

function getEnglishFromRenderedSandwich(r: T.Rendered<T.SandwichSelection<T.Sandwich>>): string | undefined {
    const insideE = getEnglishFromRendered(r.inside);
    if (!insideE) return undefined;
    return `${r.e} ${insideE}`;
}

function getEnglishFromRenderedAdjective(a: T.Rendered<T.AdjectiveSelection>): string | undefined {
    if (!a.sandwich) {
        return a.e;
    }
    if (!a.e) return undefined;
    return `${a.e} ${getEnglishFromRenderedSandwich(a.sandwich)}`;
}