/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// TODO: See if there are animate feminine words ending in ي and test

import {
    inflectRegularYeyUnisex,
    inflectWord,
} from "./pashto-inflector";
import * as T from "../types";

const adjectives: Array<{
    in: T.DictionaryEntry,
    out: T.InflectorOutput,
}> = [
    // irregular adj.
    {
        in: {
            ts: 1527815451,
            p: "زوړ",
            f: "zoR",
            g: "",
            e: "old",
            c: "adj. irreg.",
            i: 6264,
            infap: "زاړه",
            infaf: "zaaRu", 
            infbp: "زړ",
            infbf: "zaR",
        },
        out: {
            inflections:{
                masc: [
                    [{p: "زوړ", f: "zoR"}],
                    [{p: "زاړه", f: "zaaRu"}],
                    [{p: "زړو", f: "zaRo"}],
                ],
                fem: [
                    [{p: "زړه", f: "zaRa"}],
                    [{p: "زړې", f: "zaRe"}],
                    [{p: "زړو", f: "zaRo"}],
                ],
            },
        },
    },
    // regular adjective ending in ی
    {
        in: {
            ts: 1527815306,
            p: "ستړی",
            f: "stúRey",
            g: "",
            e: "tired",
            c: "adj.",
            i: 6564,
        },
        out: {
            inflections: {
                masc: [
                    [{p: "ستړی", f: "stúRey"}],
                    [{p: "ستړي", f: "stúRee"}],
                    [{p: "ستړیو", f: "stúRiyo"}, {p: "ستړو", f: "stúRo"}],
                ],
                fem: [
                    [{p: "ستړې", f: "stúRe"}],
                    [{p: "ستړې", f: "stúRe"}],
                    [{p: "ستړو", f: "stúRo"}],
                ],
            }
        },
    },
    // regular adjective ending in ی with stress on the end
    {
        in: {
            ts: 1527813636,
            p: "وروستی",
            f: "wroostéy",
            g: "",
            e: "last, latest, recent",
            c: "adj.",
            i: 12026,
        },
        out: {
            inflections: {
                masc: [
                    [{p: "وروستی", f: "wroostéy"}],
                    [{p: "وروستي", f: "wroostée"}],
                    [{p: "وروستیو", f: "wroostiyo"}, {p: "وروستو", f: "wroostó"}],
                ],
                fem: [
                    [{p: "وروستۍ", f: "wroostúy"}],
                    [{p: "وروستۍ", f: "wroostúy"}],
                    [{p: "وروستیو", f: "wroostúyo"}, {p: "وروستو", f: "wroostó"}],
                ],
            }
        },
    },
    // regular adjective ending in a consonant
    {
        in: {
            ts: 1527813498,
            p: "سپک",
            f: "spuk",
            g: "",
            e: "light; dishonorable, not respectable",
            c: "adj.",
            i: 6502,
        },
        out: {
            inflections: {
                masc: [
                    [{p: "سپک", f: "spuk"}],
                    [{p: "سپک", f: "spuk"}],
                    [{p: "سپکو", f: "spuko"}],
                ],
                fem: [
                    [{p: "سپکه", f: "spuka"}],
                    [{p: "سپکې", f: "spuke"}],
                    [{p: "سپکو", f: "spuko"}],
                ],
            },
        },
    },
    {
        in: {
            ts: 1527812862,
            p: "لوی",
            f: "looy",
            g: "",
            e: "big, great, large",
            c: "adj.",
            i: 9945,
        },
        out: {
            inflections: {
                masc: [
                    [{p: "لوی", f: "looy"}],
                    [{p: "لوی", f: "looy"}],
                    [{p: "لویو", f: "looyo"}],
                ],
                fem: [
                    [{p: "لویه", f: "looya"}],
                    [{p: "لویې", f: "looye"}],
                    [{p: "لویو", f: "looyo"}],
                ],
            },
        },
    },
    {
        in: {
            ts: 1527811469,
            p: "پوه",
            f: "poh",
            g: "",
            e: "understanding, having understood; intelligent, quick, wise, clever; expert",
            c: "adj.",
            i: 2430,
        },
        out: {
            inflections: {
                masc: [
                    [{p: "پوه", f: "poh"}],
                    [{p: "پوه", f: "poh"}],
                    [{p: "پوهو", f: "poho"}],
                ],
                fem: [
                    [{p: "پوهه", f: "poha"}],
                    [{p: "پوهې", f: "pohe"}],
                    [{p: "پوهو", f: "poho"}],
                ],
            },
        },
    },
    // adjective ending in u
    {
        in: {
            ts: 1527812791,
            p: "ویده",
            f: "weedú",
            g: "weedu",
            e: "asleep",
            c: "adj.",
            i: 1,
        },
        out: {
            inflections: {
                masc: [
                    [{p: "ویده", f: "weedú"}],
                    [{p: "ویده", f: "weedú"}],
                    [{p: "ویدو", f: "weedó"}],
                ],
                fem: [
                    [{p: "ویده", f: "weedá"}],
                    [{p: "ویدې", f: "weedé"}],
                    [{p: "ویدو", f: "weedó"}],
                ],
            },
        },
    },
    // adjective non-inflecting
    {
        in: {
            ts: 1527812798,
            p: "خفه",
            f: "khufa",
            g: "",
            e: "sad, upset, angry; choked, suffocated",
            c: "adj.",
            i: 4631,
        },
        out: false,
    },
    {
        in: {
            ts: 1527814727,
            p: "اجباري",
            f: "ijbaaree",
            g: "",
            e: "compulsory, obligatory",
            c: "adj.",
            i: 167,
        },
        out: false,
    },
    // double adjective
    {
        in: {
            ts: 123,
            p: "ګډ وډ",
            f: "guD wuD",
            g: "guDwuD",
            e: "mixed up",
            c: "adj. doub.",
            i: 1,
        },
        out: {
            inflections: {
                masc: [
                    [{ p: "ګډ وډ", f: "guD wuD" }],
                    [{ p: "ګډ وډ", f: "guD wuD" }],
                    [{ p: "ګډو وډو", f: "guDo wuDo" }],
                ],
                fem: [
                    [{ p: "ګډه وډه", f: "guDa wuDa" }],
                    [{ p: "ګډې وډې", f: "guDe wuDe" }],
                    [{ p: "ګډو وډو", f: "guDo wuDo" }],
                ],
            },
        },
    },
];

const nouns: Array<{
    in: T.DictionaryEntry,
    out: T.InflectorOutput,
}> = [
    // ## UNISEX
    // Unisex noun irregular
    {
        in: {
            ts: 1527812908,
            p: "مېلمه",
            f: "melmá",
            e: "guest",
            g: "",
            c: "n. m. irreg. unisex",
            i: 11244,
            infap: "مېلمانه",
            infaf: "melmaanu",
            infbp: "مېلمن",
            infbf: "melman",
        },
        out: {
            inflections: {
                masc: [
                    [{p: "مېلمه", f: "melmá"}],
                    [{p: "مېلمانه", f: "melmaanu"}],
                    [{p: "مېلمنو", f: "melmano"}],
                ],
                fem: [
                    [{p: "مېلمنه", f: "melmana"}],
                    [{p: "مېلمنې", f: "melmane"}],
                    [{p: "مېلمنو", f: "melmano"}],
                ],
            },
        },
    },
    // Unisex noun ending with ی
    {
        in: {
            ts: 1527814159,
            p: "ملګری",
            f: "malgúrey",
            g: "",
            e: "friend, companion",
            c: "n. m. unisex",
            i: 10943,
        },
        out: {
            inflections: {
                masc: [
                    [{p: "ملګری", f: "malgúrey"}],
                    [{p: "ملګري", f: "malgúree"}],
                    [{p: "ملګریو", f: "malgúriyo"}, {p: "ملګرو", f: "malgúro"}],
                ],
                fem: [
                    [{p: "ملګرې", f: "malgúre"}],
                    [{p: "ملګرې", f: "malgúre"}],
                    [{p: "ملګرو", f: "malgúro"}],
                ],
            },
        },
    },
    // Unisex noun ending on ی with emphasis on the end
    {
        in: {
            ts: 1527816431,
            p: "ترورزی",
            f: "trorzéy",
            g: "",
            e: "cousin (son of paternal aunt)",
            c: "n. m. unisex",
            i: 2900,
        },
        out: {
            inflections: {
                masc: [
                    [{p: "ترورزی", f: "trorzéy"}],
                    [{p: "ترورزي", f: "trorzée"}],
                    [{p: "ترورزیو", f: "trorziyo"}, {p: "ترورزو", f: "trorzó"}],
                ],
                fem: [
                    [{p: "ترورزۍ", f: "trorzúy"}],
                    [{p: "ترورزۍ", f: "trorzúy"}],
                    [{p: "ترورزیو", f: "trorzúyo"}, {p: "ترورزو", f: "trorzó"}],
                ],
            },
            // plural: {
            //     masc: [
            //         [{ p: "ترورزامن", f: "trorzaamun" }],
            //         [{ p: "ترورزامنو", f: "trorzaamuno" }],
            //     ],
            // },
        },
    },
    // Unisex noun ending with a consanant
    {
        in: {
            ts: 1527820043,
            p: "چرګ",
            f: "churg",
            g: "",
            e: "rooster, cock; chicken, poultry",
            c: "n. m. unisex anim.",
            i: 4101,
        },
        out: {
            inflections: {
                masc: [
                    [{p: "چرګ", f: "churg"}],
                    [{p: "چرګ", f: "churg"}],
                    [{p: "چرګو", f: "churgo"}],
                ],
                fem: [
                    [{p: "چرګه", f: "churga"}],
                    [{p: "چرګې", f: "churge"}],
                    [{p: "چرګو", f: "churgo"}],
                ],
            },
            plural: {
                masc: [
                    [{p: "چرګان", f: "churgáan"}],
                    [{p: "چرګانو", f: "churgáano"}],
                ],
                fem: [
                    [{p: "چرګانې", f: "churgáane"}],
                    [{p: "چرګانو", f: "churgáano"}],
                ],
            },
        },
    },
    // ## MASCULINE
    // Masculine regular ending in ی
    {
        in: {
            ts: 1527815251,
            p: "سړی",
            f: "saRey",
            g: "",
            e: "man",
            c: "n. m.",
            i: 6750,
        },
        out: {
            inflections: {
                masc: [
                    [{p: "سړی", f: "saRey"}],
                    [{p: "سړي", f: "saRee"}],
                    [{p: "سړیو", f: "saRiyo"}, {p: "سړو", f: "saRo"}],
                ],
            }
        },
    },
    // Masculine regular ending in ی with emphasis on end
    {
        in: {
            ts: 1527818511,
            p: "ترېلی",
            f: "treléy",
            g: "",
            e: "pool, reservoir",
            c: "n. m.",
            i: 2931,
        },
        out: {
            inflections: {
                masc: [
                    [{p: "ترېلی", f: "treléy"}],
                    [{p: "ترېلي", f: "trelée"}],
                    [{p: "ترېلیو", f: "treliyo"}, {p: "ترېلو", f: "trelo"}],
                ],
            },
        },
    },
    // Masculine ending in tob
    {
        in: {
            i: 11998,
            ts: 1586760783536,
            p: "مشرتوب",
            f: "mushurtob",
            g: "",
            e: "leadership, authority, presidency",
            c: "n. m.",
        },
        out: {
            inflections: {
                masc: [
                    [{p: "مشرتوب", f: "mushurtob"}],
                    [{p: "مشرتابه", f: "mushurtaabu"}],
                    [{p: "مشرتبو", f: "mushurtabo"}],
                ],
            },
        },
    },
    // Masculine irregular
    {
        in: {
            ts: 1527813809,
            p: "لمونځ",
            f: "lamoondz",
            g: "",
            e: "Muslim ritual prayers (namaz, salah, salat)",
            c: "n. m. irreg.",
            i: 9835,
            infap: "لمانځه",
            infaf: "lamaandzu",
            infbp: "لمنځ",
            infbf: "lamandz",
        },
        out: {
            inflections: {
                masc: [
                    [{p: "لمونځ", f: "lamoondz"}],
                    [{p: "لمانځه", f: "lamaandzu"}],
                    [{p: "لمنځو", f: "lamandzo"}],
                ],
            },
            // plural: {
            //     masc: [
            //         [{ p: "لمونځونه", f: "lamoondzóona" }],
            //         [{ p: "لمونځونو", f: "lamoondzóono" }],
            //     ],
            // },
        },
    },
    // Masculine non-inflecting
    {
        in: {
            ts: 1527812817,
            p: "کتاب",
            f: "kitaab",
            g: "",
            e: "book",
            c: "n. m.",
            i: 8640,
        },
        out: {
            plural: {
                masc: [
                    [{ p: "کتابونه", f: "kitaabóona" }],
                    [{ p: "کتابونو", f: "kitaabóono" }],
                ],
            },
        },
    },
    // ## FEMININE
    // Feminine regular ending in ه
    {
        in: {
            ts: 1527812797,
            p: "ښځه",
            f: "xudza",
            g: "",
            e: "woman, wife",
            c: "n. f.",
            i: 7444,
        },
        out: {
            inflections: {
                fem: [
                    [{p: "ښځه", f: "xudza"}],
                    [{p: "ښځې", f: "xudze"}],
                    [{p: "ښځو", f: "xudzo"}],
                ],
            },
        },
    },
    {
        in: {
            ts: 1527821380,
            p: "اره",
            f: "ará",
            g: "",
            e: "saw (the tool)",
            c: "n. f.",
            i: 365,
        },
        out: {
            inflections: {
                fem: [
                    [{p: "اره", f: "ará"}],
                    [{p: "ارې", f: "are"}],
                    [{p: "ارو", f: "aro"}],
                ],
            },
        },
    },
    // Feminine regular ending in ع - a'
    {
        in: {
            ts: 1527820693,
            p: "مرجع",
            f: "marja'",
            g: "",
            e: "reference, authority, body, place to go (for help, shelter, etc.)",
            c: "n. f.",
            i: 10661,
            app: "مراجع",
            apf: "maraají’",
        },
        out: {
            inflections: {
                fem: [
                    [{p: "مرجع", f: "marja'"}],
                    [{p: "مرجعې", f: "marje"}],
                    [{p: "مرجعو", f: "marjo"}],
                ],
            },
        },
    },
    {
        in: {
            ts: 1527820212,
            p: "منبع",
            f: "manbá",
            g: "",
            e: "source, origin, resource, cause",
            c: "n. f.",
            i: 11201,
            app: "منابع",
            apf: "manaabí",
        },
        out: {
            inflections: {
                fem: [
                    [{p: "منبع", f: "manbá"}],
                    [{p: "منبعې", f: "manbe"}],
                    [{p: "منبعو", f: "manbo"}],
                ],
            },
        },
    },
    // Feminine regular ending in ح - a
    {
        in: {
            ts: 1527815506,
            p: "ذبح",
            f: "zabha",
            g: "",
            e: "slaughter, killing, butchering",
            c: "n. f.",
            i: 5813,
        },
        out: {
            inflections: {
                fem: [
                    [{p: "ذبح", f: "zabha"}],
                    [{p: "ذبحې", f: "zabhe"}],
                    [{p: "ذبحو", f: "zabho"}],
                ],
            },
        },
    },
    // Feminine inanimate regular with missing ه
    {
        in: {
            ts: 1527814150,
            p: "لار",
            f: "laar",
            g: "",
            e: "road, way, path",
            c: "n. f.",
            i: 9593,
        },
        out: {
            inflections: {
                fem: [
                    [{p: "لار", f: "laar"}],
                    [{p: "لارې", f: "laare"}],
                    [{p: "لارو", f: "laaro"}],
                ],
            },
        },
    },
    // Feminine animate ending in a consonant
    // TODO: ALLOW FOR MULTIPLE PLURAL POSSIBILITIES میندې, میېنې etc.
    {
        in: {
            ts: 1527812928,
            p: "مور",
            f: "mor",
            g: "",
            e: "mother, mom",
            c: "n. f. anim.",
            ppp: "میندې",
            ppf: "meynde",
            i: 11113,
        },
        out: {
            plural: {
                fem: [
                    [{ p: "میندې", f: "meynde" }],
                    [{ p: "میندو", f: "meyndo" }],
                ],
            },
        },
    },
    // Feminine regular inanimate ending in ي
    {
        in: {
            ts: 1527811877,
            p: "دوستي",
            f: "dostee",
            g: "",
            e: "friendship",
            c: "n. f.",
            i: 5503,
        },
        out: {
            inflections: {
                fem: [
                    [{p: "دوستي", f: "dostee"}],
                    [{p: "دوستۍ", f: "dostuy"}],
                    [{p: "دوستیو", f: "dostuyo"}],
                ],
            },
        },
    },
    // Feminine regular ending in ۍ
    {
        in: {
            ts: 1527814203,
            p: "کرسۍ",
            f: "kUrsuy",
            g: "",
            e: "chair, seat, stool",
            c: "n. f.",
            i: 8718,
        },
        out: {
            inflections: {
                fem: [
                    [{p: "کرسۍ", f: "kUrsuy"}],
                    [{p: "کرسۍ", f: "kUrsuy"}],
                    [{p: "کرسیو", f: "kUrsuyo"}, { p: "کرسو", f: "kUrso"}],
                ],
            },
        },
    },
    // Feminine regular ending in ا
    {
        in: {
            ts: 1527812456,
            p: "اړتیا",
            f: "aRtiyáa, aRtyáa",
            g: "",
            e: "need, necessity",
            c: "n. f.",
            i: 376,
        },
        out: {
            plural: {
                fem: [
                    [{p: "اړتیاوې", f: "aRtiyáawe"}, { p: "اړتیاګانې", f:"aRtiyaagáane"}],
                    [{p: "اړتیاوو", f: "aRtiyáawo"}, { p: "اړتیاګانو", f:"aRtiyaagáano"}],
                ],
            },
        },
    },
    // Feminine regular ending in اع
    {
        in: {
            ts: 1527821388,
            p: "وداع",
            f: "widáa'",
            g: "",
            e: "farewell, goodbye",
            c: "n. f.",
            i: 12205,
        },
        out: false,
        // out: {
        //     plural: {
        //         fem: [
        //             [{p: "وداع وې", f: "widáawe"}, {p: "وداع ګانې", f: "widaagáane"}],
        //             [{p: "وداع وو", f: "widáawo"}, {p: "وداع ګانو", f: "widaagáano"}],
        //         ],
        //     },
        // },
    },
    // Word with no inflections
    {
        in: {
            ts: 1527815402,
            p: "وړ",
            f: "waR",
            g: "",
            e: "worthy of, deserving, -able",
            c: "suff. / adj.",
            i: 12045,
            noInf: true,
        },
        out: false,
    },
    // TODO: WORDS THAT ARE ALREADY PLURAL!
];

const others: T.DictionaryEntry[] = [
    {
        ts: 1527812612,
        p: "ګنډل",
        f: "ganDul",
        g: "",
        e: "to sew, mend, make, knit",
        c: "v. trans.",
        i: 9448,
    },
    {
        ts: 1527812457,
        p: "اصلاً",
        f: "aslan",
        g: "",
        e: "actually",
        c: "adv.",
        i: 550,
    },
];

adjectives.forEach((word) => {
    test(`${word.in.p} should inflect properly`, () => {
        expect(inflectWord(word.in)).toEqual(word.out);
    });
});

nouns.forEach((word) => {
    test(`${word.in.p} should inflect properly`, () => {
        expect(inflectWord(word.in)).toEqual(word.out);
    });
});

others.forEach((word) => {
    test(`${word.p} should return false`, () => {
        expect(inflectWord(word)).toEqual(false);
    });
});

test(`inflectRegularYeyUnisex should work`, () => {
    expect(inflectRegularYeyUnisex("لیدونکی", "leedóonkey")).toEqual({
        masc: [
            [{p: "لیدونکی", f: "leedóonkey" }],
            [{p: "لیدونکي", f: "leedóonkee" }],
            [{p: "لیدونکیو", f: "leedóonkiyo" }, {p: "لیدونکو", f: "leedóonko"}],
        ],
        fem: [
            [{p: "لیدونکې", f: "leedóonke" }],
            [{p: "لیدونکې", f: "leedóonke" }],
            [{p: "لیدونکو", f: "leedóonko"}],
        ],
    });
})
