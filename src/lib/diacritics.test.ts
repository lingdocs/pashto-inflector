/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    addDiacritics,
} from "./diacritics";
import {
    zwar,
    zwarakey,
    zer,
    pesh,
    sukun,
    hamzaAbove,
    tashdeed,
    wasla,
    daggerAlif,
    fathahan,
} from "./diacritics-helpers";
import * as T from "../types";

const diacriticsSections: {
    describe: string,
    tests: {
        in: T.PsString,
        out: string | null,
    }[],
}[] = [
    {
        describe: "regular, native Pashto script/sounds",
        tests: [
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
            {
                in: {
                    p: "پسته",
                    f: "pasta",
                },
                out: "پَسْتَه",
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
            // avoid false double consonant
            {
                in: {
                    p: "ازل لیک",
                    f: "azalléek",
                },
                out: "اَزَل لِیک",
            },
        ],
    },
    {
        describe: "nm - mb thing",
        tests: [
            {
                in: {
                    p: "انبار",
                    f: "ambáar",
                },
                out: "اَنْبار",
            },
        ],
    },
    {
        describe: "ayn stuff",
        tests: [
            {
                in: {
                    p: "اعتصاب شکن",
                    f: "itisaab shakan",
                },
                out: "اِعتِصاب شَکَن",
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
            // middle ع
            {
                in: {
                    p: "معنا",
                    f: "ma'anaa",
                },
                out: "مَعَنا",
            },
            // ending with ayn
            // {
            //     in: {
            //         p: "طمع کېدل",
            //         f: "tama kedul",
            //     },
            //     out: "طَمَع کېد" + zwarakey + "ل",
            // },
            // {
            //     in: {
            //         p: "منبع",
            //         f: "manbí",
            //     },
            //     out: "مَنْبِع",
            // },
        ],
    },
    {
        describe: "ئ in the middle",
        tests: [
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
        ],
    },
    {
        describe: "واخ being khaa in the middle of a word",
        tests: [
            {
                in: {
                    p: "استخوان",
                    f: "UstUkháan",
                },
                out: "اُسْتُخ(و)ان",
            },
        ],
    },
    {
        describe: "Arabic wasla",
        tests: [
            {
                in: {
                    p: "بالکل",
                    f: "bilkUl",
                },
                out: "بِٱلْکُل",
            },
        ],
    },
    {
        describe: "izafe",
        tests: [
            {
                in: {
                    p: "ایصال ثواب",
                    f: "eesaal-i-sawaab",
                },
                out: "اِیصالِ ثَواب",
            },
        ],
    },
    {
        describe: "special behaviour with د",
        tests: [
            {
                in: {
                    p: "د",
                    f: "du",
                },
                out: "د" + zwarakey,
            },
            {
                in: {
                    p: "د لاس",
                    f: "du laas",
                },
                out: "د" + zwarakey + " لاس",
            },
            {
                in: {
                    p: "د ... په شان",
                    f: "du ... pu shaan",
                },
                out: "د" + zwarakey + " ... پهٔ شان",
            },
        ],
    },
    {
        describe: "ha ending with ح",
        tests: [
            // {
            //     in: {
            //         p: "ذبح",
            //         f: "zabha",
            //     },
            //     out: "ذَبْحَ",
            // },
            {
                in: {
                    p: "ذبح کول",
                    f: "zabha kawul",
                },
                out: "ذَبْحَ کَو" + zwarakey + "ل",
            },
        ],
    },
    {
        describe: "require dagger alif on words ending with یٰ",
        tests: [
            {
                in: {
                    p: "یحیی",
                    f: "yahyaa",
                },
                out: null,
            },
            {
                in: {
                    p: "یحییٰ",
                    f: "yahyaa",
                },
                out: "یَحْییٰ",
            },
            {
                in: {
                    p: "یحییٰ چېرته",
                    f: "yahyaa cherta",
                },
                out: "یَحْییٰ چېرْتَه",
            },
            {
                in: {
                    p: "معنیٰ",
                    f: "ma'anaa",
                },
                out: "مَعَنیٰ",
            },
        ],
    }
];

diacriticsSections.forEach((section) => {
    describe(section.describe, () => {
        section.tests.forEach((t) => {
            if (t.out) {
                test(`diacritics should work for ${t.in.p} - ${t.in.f}`, () => {
                    expect(addDiacritics(t.in)).toEqual({ p: t.out, f: t.in.f });
                });
            } else {
                expect(() => {
                    expect(addDiacritics(t.in)).toThrowError();
                });
            }
        });
    });
});

// ERRORS

// const brokenDiacritics = [
//     {
//         p: "تشناب",
//         f: "peshnaab",
//     },
//     {
//         p: "وسېدل",
//         f: "osedul",
//     },
// ];

// test("ending with left over Pashto script will throw an error", () => {
//     expect(() => {
//         addDiacritics({ p: "کور ته", f: "kor" });
//     }).toThrow(`phonetics error - phonetics shorter than pashto script`);
// });

// test("ending with left over phonetics will throw an error", () => {
//     expect(() => {
//         addDiacritics({ p: "کار", f: "kaar kawul" });
//     }).toThrow();
// });

// test("adding diacritics errors when phonetecs and pashto do not line up", () => {
//     brokenDiacritics.forEach((t) => {
//         expect(() => {
//             addDiacritics(t);
//         }).toThrow();
//     });
// });

