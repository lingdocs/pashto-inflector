import {
    isFirstPerson,
    isSecondPerson,
} from "../../lib/misc-helpers";
import * as T from "../../types";
import { concatPsString } from "../p-text-helpers";

function getBaseAndAdjectives(np: T.Rendered<T.NPSelection | T.EqCompSelection>): T.PsString[] {
    const adjs = np.adjectives;
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

export function getPashtoFromRendered(np: T.Rendered<T.NPSelection> | T.Rendered<T.EqCompSelection>, subjectsPerson: false | T.Person): T.PsString[] {
    const base = getBaseAndAdjectives(np);
    if (np.type !== "loc. adv." && np.type !== "adjective") {
        // ts being dumb
        const trimmed = trimOffShrunkenPossesive(np as T.Rendered<T.NPSelection>);
        if (trimmed.possesor) {
            return addPossesor(trimmed.possesor.np, base, subjectsPerson);
        }
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
        return `${articles}${adjs}${word}`;
    } catch (e) {
        return undefined;
    }
}

function addPossesors(possesor: T.Rendered<T.NPSelection> | undefined, base: string | undefined): string | undefined {
    function removeArticles(s: string): string {
        return s.replace("(the) ", "").replace("(a/the) ", "");
    }
    if (!base) return undefined;
    if (!possesor) return base;
    if (possesor.type === "pronoun") {
        return `${pronounPossEng(possesor.person)} ${removeArticles(base)}`;
    }
    const possesorE = getEnglishFromRendered(possesor);
    if (!possesorE) return undefined;
    return `${possesorE}'s ${removeArticles(base)}`;
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

export function getEnglishFromRendered(r: T.Rendered<T.NPSelection | T.EqCompSelection>): string | undefined {
    if (!r.e) return undefined;
    if (r.type === "loc. adv." || r.type === "adjective") {
        return r.e;
    }
    if (r.type === "noun") {
        // TODO: shouldn't have to do this 'as' - should be automatically narrowing
        const np = r as T.Rendered<T.NounSelection>;
        return addPossesors(np.possesor?.np, addArticlesAndAdjs(np));
    }
    // TODO: possesives in English for participles and pronouns too!
    return r.e;
}