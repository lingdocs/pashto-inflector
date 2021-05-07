/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    addDiacritics,
    splitFIntoPhonemes,
} from "./diacritics";
import * as T from "../types";

const zwar = "َ";
const zwarakey = "ٙ";
const zer = "ِ";
const pesh = "ُ";
const sukun = "ْ";
const hamzaAbove = "ٔ";
const tashdeed = "ّ";
const wasla = "ٱ";
const daggerAlif = "ٰ";
const fathahan = "ً";

const phonemeSplits: Array<{
    in: string,
    out: string[],
}> = [
    {
        in: "kor",
        out: ["k", "o", "r"],
    },
    {
        in: "raaghey",
        out: ["r", "aa", "gh", "ey"],
    },
    {
        in: "hatsa",
        out: ["h", "a", "ts", "a"],
    },
    {
        in: "ba",
        out: ["b", "a"],
    },
    {
        in: "peydáa",
        out: ["p", "ey", "d", "aa"],
    },
    {
        in: "be kaar",
        out: ["b", "e", "k", "aa", "r"],
    },
    {
        in: "raadzeyy",
        out: ["r", "aa", "dz", "eyy"],
    },
    {
        in: "badanuy ??",
        out: ["b", "a", "d", "a", "n", "uy"],
    },
    {
        in: "tur ... pore",
        out: ["t", "u", "r", "p", "o", "r", "e"],
    },
    {
        in: "daar-Ul-iqaama",
        out: ["d", "aa", "r", "-Ul-", "i", "q", "aa", "m", "a"],
    },
];

const diacriticsTest: Array<{
    in: T.PsString,
    out: string,
}> = [
    {
        in: {
            p: "کور",
            f: "kor",
        },
        out: "کور",
    },
    {
        in: {
            p: "کور",
            f: "koor",
        },
        out: "کُور",
    },
    {
        in: {
            p: "کور کور",
            f: "kor koor",
        },
        out: "کور کُور",
    },
    {
        in: {
            p: "تب",
            f: "tib",
        },
        out: "تِب",
    },
    {
        in: {
            p: "تب",
            f: "tab",
        },
        out: "تَب",
    },
    {
        in: {
            p: "تب",
            f: "tUb",
        },
        out: "تُب",
    },
    {
        in: {
            p: "تب",
            f: "tub",
        },
        out: "تٙب",
    },
    {
        in: {
            p: "تب",
            f: "tb",
        },
        out: "تْب",
    },
    {
        in: {
            p: "تلب",
            f: "tilab",
        },
        out: "تِلَب",
    },
    {
        in: {
            p: "تشناب",
            f: "tashnaab",
        },
        out: "تَشْناب",
    },
    // working with وs
    {
        in: {
            p: "کول",
            f: "kwal",
        },
        out: "کْوَل",
    },
    {
        in: {
            p: "تول",
            f: "tool",
        },
        out: "تُول",
    },
    {
        in: {
            p: "مقبول",
            f: "maqbool",
        },
        out: "مَقْبُول",
    },
    {
        in: {
            p: "کول",
            f: "kawul",
        },
        out: "کَو" + zwarakey + "ل",
    },
    {
        in: {
            p: "کول",
            f: "kiwul",
        },
        out: "کِو" + zwarakey + "ل",
    },
    {
        in: {
            p: "کول",
            f: "kUwul",
        },
        out: "کُو" + zwarakey + "ل",
    },
    {
        in: {
            p: "کول",
            f: "kuwul",
        },
        out: "ک" + zwarakey + "و" + zwarakey + "ل",
    },
    {
        in: {
            p: "کول",
            f: "kawal",
        },
        out: "کَوَل",
    },
    {
        in: {
            p: "کول",
            f: "kUwal",
        },
        out: "کُوَل",
    },
    {
        in: {
            p: "پشتګرد",
            f: "pishtgird",
        },
        out: "پِشْتْګِرْد",
    },
    {
        in: {
            p: "سپین",
            f: "speen",
        },
        out: "سْپِین",
    },
    {
        in: {
            p: "سپین",
            f: "speyn",
        },
        out: "سْپین",
    },
    {
        in: {
            p: "پېش",
            f: "pesh",
        },
        out: "پېش",
    },
    {
        in: {
            p: "لیک",
            f: "leek",
        },
        out: "لِیک",
    },
    // starting alefs
    {
        in: {
            p: "اسلام",
            f: "islaam",
        },
        out: "اِسْلام",
    },
    // double consonant
    {
        in: {
            p: "بتن",
            f: "battan",
        },
        out: "ب" + zwar + "ت" + tashdeed + zwar + "ن",
    },
    // avoid false double consonant
    {
        in: {
            p: "ازل لیک",
            f: "azalléek",
        },
        out: "اَزَل لِیک",
    },
];

phonemeSplits.forEach((s) => {
    test(`${s.in} should split properly`, () => {
        const result = splitFIntoPhonemes(s.in);
        expect(result).toEqual(s.out);
    });
});

test("adding diacritics should work", () => {
    diacriticsTest.forEach((t) => {
        expect(addDiacritics(t.in)).toEqual({ p: t.out, f: t.in.f });
    });
});

// ERRORS

const brokenDiacritics = [
    {
        p: "تشناب",
        f: "peshnaab",
    },
];

const badPhonetics: Array<{
    in: string,
    problem: string,
}> = [
    {
        in: "acar",
        problem: "c",
    },
    {
        in: "a7am",
        problem: "7",
    },
];

test("bad phonetic characters should throw an error", () => {
    badPhonetics.forEach((s) => {
        expect(() => {
            splitFIntoPhonemes(s.in);
        }).toThrow(`illegal phonetic character: ${s.problem}`);
    });
});

test("ending with left over Pashto script will throw an error", () => {
    expect(() => {
        addDiacritics({ p: "کور ته", f: "kor" });
    }).toThrow(`phonetics error - phonetics shorter than pashto script`);
});

test("ending with left over phonetics will throw an error", () => {
    expect(() => {
        addDiacritics({ p: "کار", f: "kaar kawul" });
    }).toThrow();
});

test("adding diacritics errors when phonetecs and pashto do not line up", () => {
    brokenDiacritics.forEach((t) => {
        expect(() => {
            addDiacritics(t);
        }).toThrow();
    });
});
