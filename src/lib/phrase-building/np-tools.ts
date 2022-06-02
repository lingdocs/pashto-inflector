import {
    isFirstPerson,
    isSecondPerson,
} from "../../lib/misc-helpers";
import * as T from "../../types";
import { concatPsString } from "../p-text-helpers";

function getBaseAndAdjectives({ selection }: T.Rendered<T.NPSelection | T.EqCompSelection | T.APSelection>): T.PsString[] {
    if (selection.type === "sandwich") {
        return getSandwichPsBaseAndAdjectives(selection);
    }
    const adjs = "adjectives" in selection && selection.adjectives;
    if (!adjs) {
        return selection.ps;
    }
    return selection.ps.map(p => (
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
    const willContractWithPronoun = s.before && s.before.p === "د" && s.inside.selection.type === "pronoun"
        && (isFirstPerson(s.inside.selection.person) || isSecondPerson(s.inside.selection.person))
    const contracted = (willContractWithPronoun && s.inside.selection.type === "pronoun")
        ? contractPronoun(s.inside.selection)
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
    if (!("possesor" in p.selection)) {
        return p;
    }
    if (!p.selection.possesor) {
        return p;
    }
    if (p.selection.possesor.shrunken) {
        return {
            type: "NP",
            selection: {
                ...p.selection,
                possesor: undefined,
            },
        };
    }
    return {
        type: "NP",
        selection: {
            ...p.selection,
            possesor: {
                ...p.selection.possesor,
                np: trimOffShrunkenPossesive(p.selection.possesor.np),
            },
        },
    };
}

export function getPashtoFromRendered(b: T.Rendered<T.NPSelection> | T.Rendered<T.EqCompSelection> | T.Rendered<T.APSelection>, subjectsPerson: false | T.Person): T.PsString[] {
    const base = getBaseAndAdjectives(b);
    if (b.selection.type === "loc. adv." || b.selection.type === "adverb") {
        return base;
    }
    if (b.selection.type === "adjective") {
        if (!b.selection.sandwich) {
            return base 
        }
        const sandwichPs = getPashtoFromRendered({ type: "AP", selection: b.selection.sandwich }, false);
        return base.flatMap(p => (
            sandwichPs.flatMap(s => (
                concatPsString(s, " ", p)
            ))
        ));
    }
    const trimmed = b.selection.type === "sandwich" ? {
        type: b.type,
        selection: {
            ...b.selection,
            inside: trimOffShrunkenPossesive(b.selection.inside),
        },
    } : trimOffShrunkenPossesive({ type: "NP", selection: b.selection });
    if (trimmed.selection.type === "sandwich") {
        return trimmed.selection.inside.selection.possesor
            ? addPossesor(trimmed.selection.inside.selection.possesor.np, base, subjectsPerson)
            : base;
    }
    if (trimmed.selection.possesor) {
        return addPossesor(trimmed.selection.possesor.np, base, subjectsPerson);
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
            (owner.selection.type === "pronoun" && subjectsPerson !== false && willBeReflexive(subjectsPerson, owner.selection.person))
                ? concatPsString({ p: "خپل", f: "khpul" }, " ", ps)
                : (owner.selection.type === "pronoun" && isFirstPerson(owner.selection.person))
                ? concatPsString({ p: "ز", f: "z" }, v, " ", ps)
                : (owner.selection.type === "pronoun" && isSecondPerson(owner.selection.person))
                ? concatPsString({ p: "س", f: "s" }, v, " ", ps)
                : concatPsString({ p: "د", f: "du" }, " ", v, " ", ps)
        ))
    ));
    if (!owner.selection.possesor) {
        return wPossesor;
    }
    return addPossesor(owner.selection.possesor.np, wPossesor, subjectsPerson);
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
    if (possesor.selection.type === "pronoun") {
        return type === "noun"
            ? `${pronounPossEng(possesor.selection.person)} ${removeArticles(base)}`
            : `(${pronounPossEng(possesor.selection.person)}) ${removeArticles(base)} (${possesor.selection.e})`
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
    if (r.selection.type === "sandwich") {
        return getEnglishFromRenderedSandwich(r.selection);
    }
    if (!r.selection.e) return undefined;
    if (r.selection.type === "loc. adv." || r.selection.type === "adverb") {
        return r.selection.e;
    }
    if (r.selection.type === "adjective") {
        return getEnglishFromRenderedAdjective(r.selection);
    }
    if (r.selection.type === "pronoun") {
        return r.selection.e;
    }
    if (r.selection.type === "participle") {
        return addPossesors(r.selection.possesor?.np, r.selection.e, r.selection.type);
    }
    return addPossesors(r.selection.possesor?.np, addArticlesAndAdjs(r.selection), r.selection.type);
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