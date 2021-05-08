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
    {
        in: {
            p: "رغېدل",
            f: "raghedul",
        },
        out: "رَغېد" + zwarakey + "ل",
    },
    {
        in: {
            p: "کارول",
            f: "kaarawul",
        },
        out: "کارَو" + zwarakey + "ل",
    },
    {
        in: {
            p: "پېښېدل",
            f: "pexedul",
        },
        out: "پېښېد" + zwarakey + "ل",
    },
    {
        in: {
            p: "مین",
            f: "mayín",
        },
        out: "مَیِن",
    },
    {
        in: {
            p: "سړی",
            f: "saRey",
        },
        out: "سَړی",
    },
    {
        in: {
            p: "سړي",
            f: "saRee",
        },
        out: "سَړي",
    },
    {
        in: {
            p: "زه",
            f: "zu",
        },
        out: "زهٔ",
    },
    {
        in: {
            p: "زه",
            f: "za",
        },
        out: "زَه",
    },
    {
        in: {
            p: "پېشنهاد",
            f: "peshniháad",
        },
        out: "پېشْنِهاد",
    },
    {
        in: {
            p: "ایستل",
            f: "eestul",
        },
        out: "اِیسْت" + zwarakey + "ل",
    },
    {
        in: {
            p: "ایستل",
            f: "eystul",
        },
        out: "ایسْت" + zwarakey + "ل",
    },
    {
        in: {
            p: "اېسېدل",
            f: "esedul",
        },
        out: "اېسېد" + zwarakey + "ل",
    },
    {
        in: {
            p: "اوسېدل",
            f: "osedul",
        },
        out: "اوسېد" + zwarakey + "ل",
    },
    {
        in: {
            p: "اواز",
            f: "awaaz",
        },
        out: "اَواز",
    },
    {
        in: {
            p: "اسلام",
            f: "islaam",
        },
        out: "اِسْلام",
    },
    {
        in: {
            p: "واردول",
            f: "waaridawul",
        },
        out: "وارِدَو" + zwarakey + "ل",
    },
    {
        in: {
            p: "غاړه",
            f: "ghaaRa",
        },
        out: "غاړَه",
    },
    {
        in: {
            p: "اوتر",
            f: "awtár",
        },
        out: "اَوْتَر",
    },
    {
        in: {
            p: "اختیار",
            f: "ikhtiyáar",
        },
        out: "اِخْتِیار",
    },
    {
        in: {
            p: "فریاد",
            f: "faryáad",
        },
        out: "فَرْیاد",
    },
    {
        in: {
            p: "کارغه",
            f: "kaarghu",
        },
        out: "کارْغهٔ",
    },
    {
        in: {
            p: "بې کار",
            f: "be kaar",
        },
        out: "بې کار",
    },
    {
        in: {
            p: "بې کار",
            f: "bekaar",
        },
        out: "بې کار",
    },
    // TODO: nb mb thing
    {
        in: {
            p: "انبار",
            f: "ambáar",
        },
        out: "اَنْبار",
    },
    {
        in: {
            p: "ارغون",
            f: "arghóon",
        },
        out: "اَرْغُون",
    },
    {
        in: {
            p: "ارمټه",
            f: "armaTa",
        },
        out: "اَرْمَټَه",
    },
    {
        in: {
            p: "اروا پوه",
            f: "arwaa poh",
        },
        out: "اَرْوا پوهْ",
    },
    // starting alefs
    {
        in: {
            p: "اسلام",
            f: "islaam",
        },
        out: "اِسْلام",
    },
    // starting long vowels with ا
    {
        in: {
            p: "ایسار",
            f: "eesaar",
        },
        out: "اِیسار",
    },
    // double consonant / tashdeed
    {
        in: {
            p: "بتن",
            f: "battan",
        },
        out: "ب" + zwar + "ت" + tashdeed + zwar + "ن",
    },
    {
        in: {
            p: "بتطن",
            f: "battan",
        },
        out: "ب" + zwar + "ت" + sukun + "ط" + zwar + "ن",
    },
    // vowel endings working
    {
        in: {
            p: "بته",
            f: "bata",
        },
        out: "بَتَه",
    },
    {
        in: {
            p: "بته",
            f: "bati",
        },
        out: "بَتِه",
    },
    {
        in: {
            p: "پرمختیا",
            f: "parmakhtyaa",
        },
        out: "پَرْمَخْتْیا",
    },
    {
        in: {
            p: "پته",
            f: "patta",
        },
        out: "پَتَّه",
    },
    {
        in: {
            p: "پته تور",
            f: "patta toor",
        },
        out: "پَتَّه تُور",      
    },
    // get ayn stuff working
    {
        in: {
            p: "اعتصاب شکن",
            f: "itisaab shakan",
        },
        out: "اِعتِصاب شَکَن",
    },
    // avoid false double consonant
    {
        in: {
            p: "ازل لیک",
            f: "azalléek",
        },
        out: "اَزَل لِیک",
    },
    // starting with ع
    {
        in: {
            p: "عزت",
            f: "izzat",
        },
        out: "عِزَّت",
    },
    {
        in: {
            p: "عزت",
            f: "i'zzat",
        },
        out: "عِزَّت",
    },
    // ئ in the middle
    {
        in: {
            p: "برائت",
            f: "baraa'at",
        },
        out: "بَرائَت",
    },
    {
        in: {
            p: "فائده",
            f: "faaida",
        },
        out: "فائِدَه",
    },
];

phonemeSplits.forEach((s) => {
    test(`${s.in} should split properly`, () => {
        const result = splitFIntoPhonemes(s.in);
        expect(result).toEqual(s.out);
    });
});


diacriticsTest.forEach((t) => {
    test(`diacritics should work for ${t.in.p} - ${t.in.f}`, () => {
        expect(addDiacritics(t.in)).toEqual({ p: t.out, f: t.in.f });
    });
});

// ERRORS

const brokenDiacritics = [
    {
        p: "تشناب",
        f: "peshnaab",
    },
    {
        p: "وسېدل",
        f: "osedul",
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
