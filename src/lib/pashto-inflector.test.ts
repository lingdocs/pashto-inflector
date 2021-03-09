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
    out: T.Inflections | false,
}> = [
    // irregular adj.
    {
        in: {
            ts: 1527815451,
            p: "زوړ",
            f: "zoR",
            e: "old",
            c: "adj. irreg.",
            i: 6264,
            infap: "زاړه",
            infaf: "zaaRu", 
            infbp: "زړ",
            infbf: "zaR",
        },
        out: {
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
    // regular adjective ending in ی
    {
        in: {
            ts: 1527815306,
            p: "ستړی",
            f: "stúRey",
            e: "tired",
            c: "adj.",
            i: 6564,
        },
        out: {
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
        },
    },
    // regular adjective ending in ی with stress on the end
    {
        in: {
            ts: 1527813636,
            p: "وروستی",
            f: "wroostéy",
            e: "last, latest, recent",
            c: "adj.",
            i: 12026,
        },
        out: {
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
        },
    },
    // regular adjective ending in a consonant
    {
        in: {
            ts: 1527813498,
            p: "سپک",
            f: "spuk",
            e: "light; dishonorable, not respectable",
            c: "adj.",
            i: 6502,
        },
        out: {
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
    {
        in: {
            ts: 1527812862,
            p: "لوی",
            f: "looy",
            e: "big, great, large",
            c: "adj.",
            i: 9945,
        },
        out: {
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
    {
        in: {
            ts: 1527811469,
            p: "پوه",
            f: "poh",
            e: "understanding, having understood; intelligent, quick, wise, clever; expert",
            c: "adj.",
            i: 2430,
        },
        out: {
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
    // adjective non-inflecting
    {
        in: {
            ts: 1527812798,
            p: "خفه",
            f: "khufa",
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
            e: "compulsory, obligatory",
            c: "adj.",
            i: 167,
        },
        out: false,
    },
];

const nouns: Array<{
    in: T.DictionaryEntry,
    out: T.Inflections | false,
}> = [
    // ## UNISEX
    // Unisex noun irregular
    {
        in: {
            ts: 1527812908,
            p: "مېلمه",
            f: "melmá",
            e: "guest",
            c: "n. m. irreg. unisex",
            i: 11244,
            infap: "مېلمانه",
            infaf: "melmaanu",
            infbp: "مېلمن",
            infbf: "melman",
        },
        out: {
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
    // Unisex noun ending with ی
    {
        in: {
            ts: 1527814159,
            p: "ملګری",
            f: "malgúrey",
            e: "friend, companion",
            c: "n. m. unisex",
            i: 10943,
        },
        out: {
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
    // Unisex noun ending on ی with emphasis on the end
    {
        in: {
            ts: 1527816431,
            p: "ترورزی",
            f: "trorzéy",
            e: "cousin (son of paternal aunt)",
            c: "n. m. unisex",
            i: 2900,
        },
        out: {
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
    },
    // Unisex noun ending with a consanant
    {
        in: {
            ts: 1527820043,
            p: "چرګ",
            f: "churg",
            e: "rooster, cock; chicken, poultry",
            c: "n. m. unisex",
            i: 4101,
        },
        out: {
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
    },
    // ## MASCULINE
    // Masculine regular ending in ی
    {
        in: {
            ts: 1527815251,
            p: "سړی",
            f: "saRey",
            e: "man",
            c: "n. m.",
            i: 6750,
        },
        out: {
            masc: [
                [{p: "سړی", f: "saRey"}],
                [{p: "سړي", f: "saRee"}],
                [{p: "سړیو", f: "saRiyo"}, {p: "سړو", f: "saRo"}],
            ],
        },
    },
    // Masculine regular ending in ی with emphasis on end
    {
        in: {
            ts: 1527818511,
            p: "ترېلی",
            f: "treléy",
            e: "pool, reservoir",
            c: "n. m.",
            i: 2931,
        },
        out: {
            masc: [
                [{p: "ترېلی", f: "treléy"}],
                [{p: "ترېلي", f: "trelée"}],
                [{p: "ترېلیو", f: "treliyo"}, {p: "ترېلو", f: "trelo"}],
            ],
        },
    },
    // Masculine ending in tob
    {
        in: {
            i: 11998,
            ts: 1586760783536,
            p: "مشرتوب",
            f: "mushurtob",
            e: "leadership, authority, presidency",
            c: "n. m.",
        },
        out: {
            masc: [
                [{p: "مشرتوب", f: "mushurtob"}],
                [{p: "مشرتابه", f: "mushurtaabu"}],
                [{p: "مشرتبو", f: "mushurtabo"}],
            ],
        },
    },
    // Masculine irregular
    {
        in: {
            ts: 1527813809,
            p: "لمونځ",
            f: "lamoondz",
            e: "Muslim ritual prayers (namaz, salah, salat)",
            c: "n. m. irreg.",
            i: 9835,
            infap: "لمانځه",
            infaf: "lamaandzu",
            infbp: "لمنځ",
            infbf: "lamandz",
        },
        out: {
            masc: [
                [{p: "لمونځ", f: "lamoondz"}],
                [{p: "لمانځه", f: "lamaandzu"}],
                [{p: "لمنځو", f: "lamandzo"}],
            ],
        },
    },
    // Masculine non-inflecting
    {
        in: {
            ts: 1527812817,
            p: "کتاب",
            f: "kitaab",
            e: "book",
            c: "n. m.",
            i: 8640,
        },
        out: false,
    },
    // ## FEMININE
    // Feminine regular ending in ه
    {
        in: {
            ts: 1527812797,
            p: "ښځه",
            f: "xudza",
            e: "woman, wife",
            c: "n. f.",
            i: 7444,
        },
        out: {
            fem: [
                [{p: "ښځه", f: "xudza"}],
                [{p: "ښځې", f: "xudze"}],
                [{p: "ښځو", f: "xudzo"}],
            ],
        },
    },
    {
        in: {
            ts: 1527821380,
            p: "اره",
            f: "ará",
            e: "saw (the tool)",
            c: "n. f.",
            i: 365,
        },
        out: {
            fem: [
                [{p: "اره", f: "ará"}],
                [{p: "ارې", f: "are"}],
                [{p: "ارو", f: "aro"}],
            ],
        },
    },
    // Feminine regular ending in ع - a'
    {
        in: {
            ts: 1527820693,
            p: "مرجع",
            f: "marja'",
            e: "reference, authority, body, place to go (for help, shelter, etc.)",
            c: "n. f.",
            i: 10661,
            app: "مراجع",
            apf: "maraají’",
        },
        out: {
            fem: [
                [{p: "مرجع", f: "marja'"}],
                [{p: "مرجعې", f: "marje"}],
                [{p: "مرجعو", f: "marjo"}],
            ],
        },
    },
    {
        in: {
            ts: 1527820212,
            p: "منبع",
            f: "manbá",
            e: "source, origin, resource, cause",
            c: "n. f.",
            i: 11201,
            app: "منابع",
            apf: "manaabí",
        },
        out: {
            fem: [
                [{p: "منبع", f: "manbá"}],
                [{p: "منبعې", f: "manbe"}],
                [{p: "منبعو", f: "manbo"}],
            ],
        },
    },
    // Feminine regular ending in ح - a
    {
        in: {
            ts: 1527815506,
            p: "ذبح",
            f: "zabha",
            e: "slaughter, killing, butchering",
            c: "n. f.",
            i: 5813,
        },
        out: {
            fem: [
                [{p: "ذبح", f: "zabha"}],
                [{p: "ذبحې", f: "zabhe"}],
                [{p: "ذبحو", f: "zabho"}],
            ],
        },
    },
    // Feminine inanimate regular with missing ه
    {
        in: {
            ts: 1527814150,
            p: "لار",
            f: "laar",
            e: "road, way, path",
            c: "n. f.",
            i: 9593,
        },
        out: {
            fem: [
                [{p: "لار", f: "laar"}],
                [{p: "لارې", f: "laare"}],
                [{p: "لارو", f: "laaro"}],
            ],
        },
    },
    // Feminine animate ending in a consonant
    {
        in: {
            ts: 1527812928,
            p: "مور",
            f: "mor",
            e: "mother, mom",
            c: "n. f. anim.",
            i: 11113,
        },
        out: false,
    },
    // Feminine regular inanimate ending in ي
    {
        in: {
            ts: 1527811877,
            p: "دوستي",
            f: "dostee",
            e: "friendship",
            c: "n. f.",
            i: 5503,
        },
        out: {
            fem: [
                [{p: "دوستي", f: "dostee"}],
                [{p: "دوستۍ", f: "dostuy"}],
                [{p: "دوستیو", f: "dostuyo"}],
            ],
        },
    },
    // Feminine regular ending in ۍ
    {
        in: {
            ts: 1527814203,
            p: "کرسۍ",
            f: "kUrsuy",
            e: "chair, seat, stool",
            c: "n. f.",
            i: 8718,
        },
        out: {
            fem: [
                [{p: "کرسۍ", f: "kUrsuy"}],
                [{p: "کرسۍ", f: "kUrsuy"}],
                [{p: "کرسیو", f: "kUrsuyo"}, { p: "کرسو", f: "kUrso"}],
            ],
        },
    },
    // Feminine regular ending in ا
    {
        in: {
            ts: 1527812456,
            p: "اړتیا",
            f: "aRtiyaa, aRtyaa",
            e: "need, necessity",
            c: "n. f.",
            i: 376,
        },
        out: {
            fem: [
                [{p: "اړتیا", f: "aRtiyaa"}],
                [{p: "اړتیاوې", f: "aRtiyaawe"}],
                [{p: "اړتیاوو", f: "aRtiyaawo"}],
            ],
        },
    },
    // Feminine regular ending in اع
    {
        in: {
            ts: 1527821388,
            p: "وداع",
            f: "widáa'",
            e: "farewell, goodbye",
            c: "n. f.",
            i: 12205,
        },
        out: {
            fem: [
                [{p: "وداع", f: "widáa'"}],
                [{p: "وداعوې", f: "widáawe"}],
                [{p: "وداعوو", f: "widáawo"}],
            ],
        },
    },
    // Word with no inflections
    {
        in: {
            ts: 1527815402,
            p: "وړ",
            f: "waR",
            e: "worthy of, deserving, -able",
            c: "suff. / adj.",
            i: 12045,
            noInf: true,
        },
        out: false,
    },
];

const others: T.DictionaryEntry[] = [
    {
        ts: 1527812612,
        p: "ګنډل",
        f: "ganDul",
        e: "to sew, mend, make, knit",
        c: "v. trans.",
        i: 9448,
    },
    {
        ts: 1527812457,
        p: "اصلاً",
        f: "aslan",
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
