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
            // working with ئ as vowel at end
            {
                in: {
                    p: "شئ",
                    f: "sheyy",
                },
                out: "شئ",
            },
            {
                in: {
                    p: "کار کوئ چې لاړ شئ",
                    f: "kaar kawéyy che laaR sheyy",
                },
                out: "کار کَوئ چې لاړ شئ",
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
                    p: "ماضی",
                    f: "maazee",
                },
                out: null,
            },
            {
                in: {
                    p: "وسېدل",
                    f: "osedul",
                },
                out: null,
            },
            {
                in: {
                    p: "يست",
                    f: "eest",
                },
                out: null,
            },
            {
                in: {
                    p: "ست",
                    f: "ist",
                },
                out: null,
            },
            {
                in: {
                    p: "haca",
                    f: "هځه",
                },
                out: null,
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
            {
                in: {
                    p: "لکۍ وال",
                    f: "lakuy waal",
                },
                out: "لَکۍ وال",
            },
            // avoid false double consonant
            {
                in: {
                    p: "ازل لیک",
                    f: "azalléek",
                },
                out: "اَزَل لِیک",
            },
            {
                in: {
                    p: "سه",
                    f: "si",
                },
                out: "سِه",
            },
            {
                in: {
                    p: "سه شنبه",
                    f: "sishamba",
                },
                out: "سِه شَنْبَه",
            },
            {
                in: {
                    p: "توجه",
                    f: "tawajÚ",
                },
                out: "تَوَجُه",
            },
            {
                in: {
                    p: "توجه کول",
                    f: "tawajU kawul",
                },
                out: "تَوَجُه کَو" + zwarakey + "ل",
            },
            {
                in: {
                    p: "با استعداد",
                    f: "baa isti'dáad",
                },
                out: "با اِسْتِعْداد",
            },
            {
                in: {
                    p: "آدم",
                    f: "aadam",
                },
                out: "آدَم",
            },
            {
                in: {
                    p: "آسان",
                    f: "aasáan",
                },
                out: "آسان",
            },
            {
                in: {
                    p: "آسان",
                    f: "asáan",
                },
                out: null,
            },
            {
                in: {
                    p: "یدام",
                    f: "aadam",
                },
                out: null,
            },
            {
                in: {
                    p: "سختسری",
                    f: "sakht sărey",
                },
                out: "سَخْتْسَری",
            },
        ],
    },
    {
        describe: "ې followed by ی - y needs to be written as e`y to be distinguished from ey - ی",
        tests: [
            {
                in: {
                    p: "پتېیل",
                    f: "pateyúl",
                },
                out: null,
            },
            {
                in: {
                    p: "پتېیل",
                    f: "pate`yúl",
                },
                out: "پَتېی" + zwarakey + "ل",
            },
            {
                in: {
                    p: "درېیم",
                    f: "dre`yum",
                },
                out: "دْرېی" + zwarakey + "م",
            },
        ],
    },
    {
        describe: "handle circumpositions",
        tests: [
            {
                in: {
                    p: "تر ... پورې",
                    f: "tur ... pore",
                },
                out: "ت" + zwarakey + "ر ... پورې",
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
        describe: "excetption for و - wo",
        tests: [
            {
                in: {
                    p: "و",
                    f: "wo",
                },
                out: "و",
            },
            {
                in: {
                    p: "سړی و",
                    f: "saRey wo",
                },
                out: "سَړی و",
            },
        ],
    },
    {
        describe: "alef with hamza above",
        tests: [
            {
                in: {
                    p: "جرأت",
                    f: "jUrát",
                },
                out: "جُرأت",
            },
            {
                in: {
                    p: "جرأت",
                    f: "jUr'át",
                },
                out: "جُرأت",
            },
        ],
    },
    {
        describe: "ayn stuff",
        tests: [
            {
                in: {
                    p: "بعد",
                    f: "ba'd",
                },
                out: "بَعْد",
            },
            {
                in: {
                    p: "بعد",
                    f: "b'ad",
                },
                out: "بْعَد",
            },
            {
                in: {
                    p: "بعد",
                    f: "ba'ad",
                },
                out: "بَعَد",
            },
            {
                in: {
                    p: "بعد",
                    f: "baad",
                },
                out: "بَعَد",
            },
            {
                in: {
                    p: "بعد",
                    f: "bad",
                },
                out: "بَعد",
            },
            {
                in: {
                    p: "معلوم",
                    f: "maaloom",
                },
                out: "مَعَلُوم",
            },
            {
                in: {
                    p: "منبع",
                    f: "manbi'",
                },
                out: "مَنْبِع",
            },
            {
                in: {
                    p: "منبع",
                    f: "manb'i",
                },
                out: "مَنْبْعِ"
            },
            {
                in: {
                    p: "منبع",
                    f: "manbee",
                },
                out: "مَنْبِعِ",
            },
            {
                in: {
                    p: "منبع",
                    f: "manbi",
                },
                out: "مَنْبِع"
            },
            {
                in: {
                    p: "معنا",
                    f: "ma'náa",
                },
                out: "مَعْنا",
            },
            {
                in: {
                    p: "معنا",
                    f: "maanáa",
                },
                out: "مَعَنا",
            },
            {
                in: {
                    p: "طمع استعمال",
                    f: "tama istimaal",
                },
                out: "طَمَع اِسْتِعمال",
            },
            {
                in: {
                    p: "مربع",
                    f: "mUraba'",
                },
                out: "مُرَبَع",
            },
            {
                in: {
                    p: "مربع جذر",
                    f: "mUraba' jazúr",
                },
                out: "مُرَبَع جَذ" + zwarakey + "ر",
            },
            {
                in: {
                    p: "عام",
                    f: "'aam",
                },
                out: "عام",
            },
            {
                in: {
                    p: "قتل عام",
                    f: "qatl-i-aam",
                },
                out: "قَتْلِ عام",
            },
            {
                in: {
                    p: "توقع",
                    f: "tawaqqÚ",
                },
                out: "تَوَقُّع",
            },
            {
                in: {
                    p: "راجع کېدل",
                    f: "raaji kedul",
                },
                out: "راجِع کېد" + zwarakey + "ل",
            },
            {
                in: {
                    p: "ربیع",
                    f: "rabee'",
                },
                out: "رَبِیع",
            },
        ],
    },
    {
        describe: "ayn at the beginning",
        tests: [
            // as a short vowel at the beginning
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
                out: "عِْزَّت",
            },
            {
                in: {
                    p: "عذر",
                    f: "Uzar",
                },
                out: "عُذَر",
            },
            {
                in: {
                    p: "عذر",
                    f: "U'zar",
                },
                out: "عُْذَر",
            },
            // as a short i with an alef
            {
                in: {
                    p: "اعتصاب شکن",
                    f: "itisaab shakan",
                },
                out: "اِعتِصاب شَکَن",
            },
            {
                in: {
                    p: "اعتصاب شکن",
                    f: "i'tisaab shakan",
                },
                out: "اِعْتِصاب شَکَن",
            },
            // as a long aa at beginning
            {
                in: {
                    p: "عادل",
                    f: "aadíl",
                },
                out: "عادِل",
            },
            {
                in: {
                    p: "عید",
                    f: "eed",
                },
                out: "عِید",
            },
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
        describe: "joiner و",
        tests: [
            {
                in: {
                    p: "کار و بار",
                    f: "kaar-U-baar",
                },
                out: "کار و بار",
            },
            {
                in: {
                    p: "کاروبار",
                    f: "kaar-U-baar",
                },
                out: "کاروبار",
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
            {
                in: {
                    p: "ذبح",
                    f: "zabha",
                },
                out: "ذَبْحَ",
            },
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
    },
    {
        describe: "require fathatan on words ending in اً ",
        tests: [
            {
                in: {
                    p: "دقیقا",
                    f: "daqeeqan",
                },
                out: null,
            },
            {
                in: {
                    p: "دقیقاً",
                    f: "daqeeqan",
                },
                out: "دَقِیقاً",
            },
        ],
    },
    {
        describe: "Ua ؤ",
        tests: [
            {
                in: {
                    p: "مودب",
                    f: "mUaddab",
                },
                out: "مُؤَدَّب",
            },
        ],
    },
    {
        describe: "With Arabic definate article -Ul- ال",
        tests: [
            {
                in: {
                    p: "حق الاجاره",
                    f: "haq-Ul-ijaara",
                },
                out: "حَق اُلاِجارَه",
            },
            {
                in: {
                    p: "دار العلوم",
                    f: "daar-Ul-Ulóom",
                },
                out: "دار اُلعُلُوم",
            },
        ],
    },
    // {
    //     describe: "double consonants on end of words",
    //     tests: [
    //         {
    //             in: {
    //                 p: "حق",
    //                 f: "haqq",
    //             },
    //             out: "حَقّ",
    //         },
    //         {
    //             in: {
    //                 p: "حق پر",
    //                 f: "haqq par",
    //             },
    //             out: "حَقّ پَر",
    //         },
    //     ],
    // },
];

diacriticsSections.forEach((section) => {
    // if (!section.describe.includes("require fathatan")) return;
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

