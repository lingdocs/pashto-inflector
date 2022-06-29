/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as T from "../types";

// just for type safety
export function noPersInfs(s: T.OptionalPersonInflections<T.LengthOptions<T.PsString>>): T.LengthOptions<T.PsString>;
export function noPersInfs(s: T.FullForm<T.PsString>): T.SingleOrLengthOpts<T.PsString>;
export function noPersInfs(s: 
    T.OptionalPersonInflections<T.LengthOptions<T.PsString>> | T.FullForm<T.PsString>
): T.SingleOrLengthOpts<T.PsString> | T.LengthOptions<T.PsString> {
    if ("mascSing" in s) {
        // this path shouldn't be used, just for type safety
        return s.mascSing;
    }
    return s;
}

export function pickPersInf<T>(s: T.OptionalPersonInflections<T>, persInf: T.PersonInflectionsField): T {
    if ("mascSing" in s) {
        return s[persInf];
    }
    return s;
}

export function getFirstSecThird(p: T.Person): 1 | 2 | 3 {
    if ([0, 1, 6, 7].includes(p)) return 1;
    if ([2, 3, 8, 9].includes(p)) return 2;
    return 3;
}

// export function pickPersInf(
//     s: T.OptionalPersonInflections<T.LengthOptions<T.PsString>>,
//     persInf: T.PersonInflectionsField,
// ): T.LengthOptions<T.PsString>;
// export function pickPersInf(
//     s: T.FullForm<T.PsString>,
//     persInf: T.PersonInflectionsField,
// ): T.SingleOrLengthOpts<T.PsString>;
// export function pickPersInf(
//     s: T.FullForm<T.VerbBlock>,
//     persInf: T.PersonInflectionsField,
// ): T.SingleOrLengthOpts<T.VerbBlock>;
// export function pickPersInf(
//     s: T.SplitInfo,
//     persInf: T.PersonInflectionsField,
// ): T.SingleOrLengthOpts<[T.PsString, T.PsString]>;
// export function pickPersInf(
//     s: T.OptionalPersonInflections<T.LengthOptions<T.PsString>> | T.FullForm<T.PsString> | T.FullForm<T.VerbBlock> | T.SplitInfo,
//     persInf: T.PersonInflectionsField,
// ): T.SingleOrLengthOpts<T.PsString> | T.LengthOptions<T.PsString> | T.SingleOrLengthOpts<T.VerbBlock> | T.SingleOrLengthOpts<[T.PsString, T.PsString]> {
//     if ("mascSing" in s) {
//         return s[persInf];
//     }
//     return s;
// }

export function hasPersInfs(info: T.NonComboVerbInfo | T.PassiveRootsStems): boolean {
    return (
        "mascSing" in info.root.perfective ||
        "mascSing" in info.stem.perfective ||
        ("present" in info.participle && "mascSing" in info.participle.present) ||
        "mascSing" in info.participle.past
    );
}

export function chooseParticipleInflection(
    pPartInfs: T.SingleOrLengthOpts<T.UnisexInflections> | T.SingleOrLengthOpts<T.PsString>,
    person: T.Person,
): T.SingleOrLengthOpts<T.PsString> {
    if ("long" in pPartInfs) {
        return {
            short: chooseParticipleInflection(pPartInfs.short, person) as T.PsString,
            long: chooseParticipleInflection(pPartInfs.long, person) as T.PsString,
        };
    }
    if ("masc" in pPartInfs) {
        const gender = personGender(person);
        const infNum = personIsPlural(person) ? 1 : 0;
        return pPartInfs[gender][infNum][0];
    }
    return pPartInfs; // already just one thing
}

export function getPersonNumber(gender: T.Gender, number: T.NounNumber): T.Person {
    const base = gender === "masc" ? 4 : 5;
    return base + (number === "singular" ? 0 : 6);
}

export function personFromVerbBlockPos(pos: [number, number]): T.Person {
    return pos[0] + (pos[1] === 1 ? 6 : 0);
}

export function getPersonInflectionsKey(person: T.Person): T.PersonInflectionsField {
    return `${personGender(person)}${personIsPlural(person) ? "Plur" : "Sing"}` as T.PersonInflectionsField;
}

export function spaceInForm(form: T.FullForm<T.PsString>): boolean {
    if ("mascSing" in form) {
        return spaceInForm(form.mascSing);
    }
    if ("long" in form) {
        return spaceInForm(form.long);
    }
    return form.p.includes(" ");
}

export function getPersonFromVerbForm(form: T.SingleOrLengthOpts<T.VerbBlock>, person: T.Person): T.SentenceForm {
    if ("long" in form) {
        return {
            long: getPersonFromVerbForm(form.long, person) as T.ArrayOneOrMore<T.PsString>,
            short: getPersonFromVerbForm(form.short, person) as T.ArrayOneOrMore<T.PsString>,
            ...form.mini ? {
                mini: getPersonFromVerbForm(form.mini, person) as T.ArrayOneOrMore<T.PsString>,
            } : {},
        };
    }
    const [row, col] = getVerbBlockPosFromPerson(person);
    return form[row][col];
}

export function getVerbBlockPosFromPerson(person: T.Person): [0 | 1 | 2 | 3 | 4 | 5, 0 | 1] {
    const plural = personIsPlural(person)
    const row = (plural ? (person - 6) : person) as 0 | 1 | 2 | 3 | 4 | 5;
    const col = plural ? 1 : 0;
    return [row, col];
}

export function getAuxTransitivity(trans: T.Transitivity): "transitive" | "intransitive" {
    return trans === "intransitive" ? "intransitive" : "transitive";
}

export function personGender(person: T.Person): T.Gender {
    return person % 2 === 0 ? "masc" : "fem";
}

export function personNumber(person: T.Person): T.NounNumber {
    return personIsPlural(person) ? "plural" : "singular";
}

export function personIsPlural(person: T.Person): boolean {
    return person > 5;
}

export function getEnglishPersonInfo(person: T.Person, version?: "short" | "long"): string {
    const p = ([0,1,6,7].includes(person)
        ? "1st"
        : [2,3,8,9].includes(person)
        ? "2nd"
        : "3rd") + (version !== "short" ? " pers." : "");
    const number = personIsPlural(person) ? "plur" : "sing";
    const n = version === "short"
        ? (number === "plur" ? "pl" : "sg") : number;
    const gender = personGender(person);
    const g = version === "short"
        ? (gender === "masc" ? "m" : "f")
        : gender;
    return `${p} ${n}. ${g}.`;
}

export function randomNumber(minInclusive: number, maxExclusive: number): number {  
    return Math.floor(Math.random() * (maxExclusive - minInclusive) + minInclusive); 
}

export function randFromArray<M>(arr: M[]): M {
    return arr[
        Math.floor(Math.random()*arr.length)
    ];
}

export const isFirstPerson = (p: T.Person) => [0, 1, 6, 7].includes(p);
export const isSecondPerson = (p: T.Person) => [2, 3, 8, 9].includes(p);
export const isThirdPerson = (p: T.Person) => [4, 5, 10, 11].includes(p);

export function incrementPerson(p: T.Person): T.Person {
    return (p + 1) % 12;
}

export function isSentenceForm(f: any): boolean {
    if ("long" in f) {
        return isSentenceForm(f.long);
    }
    return Array.isArray(f) && "p" in f[0];
}

export function isNounAdjOrVerb(entry: T.DictionaryEntry): "nounAdj" | "verb" | false {
    if (!entry.c) {
        return false;
    }
    if (entry.c.includes("adj.") || entry.c.includes("n. m.") || entry.c.includes("n. f.")) {
        return "nounAdj";
    }
    if (entry.c.slice(0, 3) === "v. ") {
        return "verb";
    }
    return false;
}

/**
 * takes the ec field from a dictionary entry and produces an array of an EnglishVerbConjugation
 * for use with the conjugations display for showing English translation sentences of various verb
 * forms and conjugations
 * 
 * @param ec 
 * @returns 
 */
export function parseEc(ec: string): T.EnglishVerbConjugationEc {
    function isVowel(s: string): boolean {
        return ["a", "e", "i", "o", "u"].includes(s);
    }
    function makeRegularConjugations(s: string): T.EnglishVerbConjugationEc {
        if (s === "get") {
            return ["get","gets","getting","got","gotten"];
        }
        if (s === "become") {
            return ["become","becomes","becoming","became","become"];
        }
        if (s === "make") {
            return ["make","makes","making","made","made"];
        }
        if (s === "have") {
            return ["have","has","having","had","had"];
        }
        if (s === "be") {
            return ["am","is","being","was","been"];
        }
        if ((s.slice(-1) === "y") && !isVowel(s.slice(-2)[0])) {
            const b = s.slice(0, -1);
            return [`${s}`, `${b}ies`, `${s}ing`, `${b}ied`, `${b}ied`];
        }
        if (s.slice(-2) === "ss") {
            return [`${s}`, `${s}es`, `${s}ing`, `${s}ed`, `${s}ed`];
        }
        if (s.slice(-2) === "ie" && !isVowel(s.slice(-3)[0])) {
            const b = s.slice(0, -2);
            return [`${s}`, `${s}s`, `${b}ying`, `${s}d`, `${s}d`]; 
        }
        const b = s === ""
            ? "VERB"    
            : (s.slice(-1) === "e")
            ? s.slice(0, -1)
            : s;
        return [`${s}`, `${s}s`, `${b}ing`, `${b}ed`, `${b}ed`];
    }
    const items = ec.split(",").map(x => x.trim());
    return (items.length === 4)
        ? [items[0], items[1], items[2], items[3], items[3]]
        : (items.length === 5)
        ? [items[0], items[1], items[2], items[3], items[4]]
        : makeRegularConjugations(items[0]);
}

export function chooseLength<N>(x: T.SingleOrLengthOpts<N>, length: "long" | "short"): N {
    if ("long" in x) {
        return x[length]; 
    }
    return x;
}