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
                    [{p: "زاړه", f: "zaaRú"}],
                    [{p: "زړو", f: "zaRó"}],
                ],
                fem: [
                    [{p: "زړه", f: "zaRá"}],
                    [{p: "زړې", f: "zaRé"}],
                    [{p: "زړو", f: "zaRó"}],
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
                    [{p: "سپکو", f: "spúko"}],
                ],
                fem: [
                    [{p: "سپکه", f: "spúka"}],
                    [{p: "سپکې", f: "spúke"}],
                    [{p: "سپکو", f: "spúko"}],
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
                    [{p: "لویو", f: "lóoyo"}],
                ],
                fem: [
                    [{p: "لویه", f: "lóoya"}],
                    [{p: "لویې", f: "lóoye"}],
                    [{p: "لویو", f: "lóoyo"}],
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
                    [{p: "پوهو", f: "póho"}],
                ],
                fem: [
                    [{p: "پوهه", f: "póha"}],
                    [{p: "پوهې", f: "póhe"}],
                    [{p: "پوهو", f: "póho"}],
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
    {
        in: {
            ts: 1527812792,
            p: "ښایسته",
            f: "xaaystu",
            g: "xaaystu",
            e: "beautiful",
            c: "adj.",
            i: 1,
        },
        out: {
            inflections: {
                masc: [
                    [{p: "ښایسته", f: "xaaystu"}],
                    [{p: "ښایسته", f: "xaaystu"}],
                    [{p: "ښایستو", f: "xaaysto"}],
                ],
                fem: [
                    [{p: "ښایسته", f: "xaaysta"}],
                    [{p: "ښایستې", f: "xaayste"}],
                    [{p: "ښایستو", f: "xaaysto"}],
                ],
            },
        },
    },
    // numbers should inflect just like adjectives
    {
        in: {"ts":1588688995113,"i":8176,"p":"شپږ","f":"shpuG","g":"shpug","e":"six","c":"num."},
        out: {
            inflections: {
                masc: [
                    [{ p: "شپږ", f: "shpuG" }],
                    [{ p: "شپږ", f: "shpuG" }],
                    [{ p: "شپږو", f: "shpúGo" }],
                ],
                fem: [
                    [{ p: "شپږه", f: "shpúGa" }],
                    [{ p: "شپږې", f: "shpúGe" }],
                    [{ p: "شپږو", f: "shpúGo" }],
                ],
            },
        },
    },
    // without accents
    {
        in: {"ts":1527812796,"i":8574,"p":"ښه","f":"xu","g":"xu","e":"good","c":"adj."},
        out: {
            inflections: {
                masc: [
                    [{ p: "ښه", f: "xu" }],
                    [{ p: "ښه", f: "xu" }],
                    [{ p: "ښو", f: "xo" }],
                ],
                fem: [
                    [{ p: "ښه", f: "xa" }],
                    [{ p: "ښې", f: "xe" }],
                    [{ p: "ښو", f: "xo" }],
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
                    [{ p: "ګډو وډو", f: "gúDo wúDo" }],
                ],
                fem: [
                    [{ p: "ګډه وډه", f: "gúDa wúDa" }],
                    [{ p: "ګډې وډې", f: "gúDe wúDe" }],
                    [{ p: "ګډو وډو", f: "gúDo wúDo" }],
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
                    [{p: "مېلمانه", f: "melmaanú"}],
                    [{p: "مېلمنو", f: "melmanó"}],
                ],
                fem: [
                    [{p: "مېلمنه", f: "melmaná"}],
                    [{p: "مېلمنې", f: "melmané"}],
                    [{p: "مېلمنو", f: "melmanó"}],
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
        in: {"i":3319,"ts":1527816431,"p":"ترورزی","f":"trorzéy","g":"trorzey","e":"cousin (of paternal aunt)","c":"n. m. unisex","ppp":"ترورزامن","ppf":"trorzaamun"},
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
            plural: {
                masc: [
                    [{ p: "ترورزامن", f: "trorzaamun" }],
                    [{ p: "ترورزامنو", f: "trorzaamuno" }],
                ],
            },
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
                    [{p: "چرګو", f: "chúrgo"}],
                ],
                fem: [
                    [{p: "چرګه", f: "chúrga"}],
                    [{p: "چرګې", f: "chúrge"}],
                    [{p: "چرګو", f: "chúrgo"}],
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
    // with #3 pattern anim unisex
    {
        in: {"ts":1527820130,"i":2561,"p":"پلوی","f":"palawéy","g":"palawey","e":"adherent, supporter; the outside or further ox in a team of oxes grinding or threshing","c":"n. m. anim. unisex"},
        out: {
            inflections: {
                masc: [
                    [{ p: "پلوی", f: "palawéy" }],
                    [{ p: "پلوي", f: "palawée" }],
                    [{ p: "پلویو", f: "palawiyo" }, { p: "پلوو", f: "palawó" }],
                ],
                fem: [
                    [{ p: "پلوۍ", f: "palawúy" }],
                    [{ p: "پلوۍ", f: "palawúy" }],
                    [{ p: "پلویو", f: "palawúyo" }, { p: "پلوو", f: "palawó" }],
                ],
            },
            plural: {
                masc: [
                    [{ p: "پلویان", f: "palawiyáan" }],
                    [{ p: "پلویانو", f: "palawiyáano" }],
                ],
                fem: [
                    [{ p: "پلویانې", f: "palawiyáane" }],
                    [{ p: "پلویانو", f: "palawiyáano" }],
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
            f: "saRéy",
            g: "",
            e: "man",
            c: "n. m.",
            i: 6750,
        },
        out: {
            inflections: {
                masc: [
                    [{p: "سړی", f: "saRéy"}],
                    [{p: "سړي", f: "saRée"}],
                    [{p: "سړیو", f: "saRiyo"}, {p: "سړو", f: "saRo"}],
                ],
            },
        },
    },
    // Masculine #3 anim
    // TODO: Also do Fem #3 anim!
    {
        in: {"ts":1527819801,"i":8082,"p":"سیلانی","f":"seylaanéy","g":"seylaaney","e":"tourist, sightseer, visitor","c":"n. m. anim."},
        out: {
            inflections: {
                masc: [
                    [{ p: "سیلانی", f: "seylaanéy" }],
                    [{ p: "سیلاني", f: "seylaanée" }],
                    [{ p: "سیلانیو", f: "seylaaniyo" }, { p: "سیلانو", f: "seylaano" }],
                ],
            },
            plural: {
                masc: [
                    [{ p: "سیلانیان", f: "seylaaniyáan" }],
                    [{ p: "سیلانیانو", f: "seylaaniyáano" }],
                ],
            },
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
        in: {"ts":1527813809,"i":11318,"p":"لمونځ","f":"lamoondz","g":"lamoondz","e":"Muslim ritual prayers (namaz, salah, salat)","c":"n. m. irreg.","infap":"لمانځه","infaf":"lamaandzu","infbp":"لمنځ","infbf":"lamandz","ppp":"لمونځونه","ppf":"lamoondzóona"},
        out: {
            inflections: {
                masc: [
                    [{p: "لمونځ", f: "lamoondz"}],
                    [{p: "لمانځه", f: "lamaandzú"}],
                    [{p: "لمنځو", f: "lamandzó"}],
                ],
            },
            plural: {
                masc: [
                    [{ p: "لمونځونه", f: "lamoondzóona" }],
                    [{ p: "لمونځونو", f: "lamoondzóono" }],
                ],
            },
        },
    },
    // Masculine short squish
    {
        in: {"i":9049,"ts":1527813593,"p":"غر","f":"ghar, ghur","g":"ghar,ghur","e":"mountain","c":"n. m.","infap":"غره","infaf":"ghru","infbp":"غر","infbf":"ghr"},
        out: {
            inflections: {
                masc: [
                    [{ p: "غر", f: "ghar" }],
                    [{ p: "غره", f: "ghru" }],
                    [{ p: "غرو", f: "ghró" }],
                ],
            },
            plural: {
                masc: [
                    [{ p: "غرونه", f: "ghróona" }],
                    [{ p: "غرونو", f: "ghróono" }],
                ],
            },
        },
    },
    // should NOT do the oona plural with the squish nouns, when they're animate
    {
        in: {"i":5465,"ts":1527812802,"p":"خر","f":"khur","g":"khur","e":"donkey","c":"n. m. anim. unisex irreg.","infap":"خره","infaf":"khru","infbp":"خر","infbf":"khr"},
        out: {
            inflections: {
                // TODO: use smarter system using new isType5Entry predicates, to allow for not using the redundant one syllable accents with these
                masc: [
                    [{ p: "خر", f: "khur" }],
                    [{ p: "خره", f: "khrú" }],
                    [{ p: "خرو", f: "khró" }],
                ],
                fem: [
                    [{ p: "خره", f: "khrá" }],
                    [{ p: "خرې", f: "khré" }],
                    [{ p: "خرو", f: "khró" }],
                ],
            },
        },
    },
    // masc plural
    {
        in: {"i":6063,"ts":1527815739,"p":"دروغ","f":"drogh, darwagh","g":"drogh,darwagh","e":"lie, falsehood","c":"n. m. pl."},
        out: {
            plural: {
                masc: [
                    [{ p: "دروغ", f: "drogh" }],
                    [{ p: "دروغو", f: "drogho" }],
                ],
            },
        },
    },
    {
        in: {"i":9191,"ts":1527817330,"p":"غنم","f":"ghanúm","g":"ghanum","e":"wheat","c":"n. m. pl."},
        out: {
            plural: {
                masc: [
                    [{ p: "غنم", f: "ghanúm" }],
                    [{ p: "غنمو", f: "ghanúmo" }],
                ],
            },
        },
    },
    {
        in: {"ts":1527813508,"i":7058,"p":"زړه","f":"zRu","g":"zRu","e":"heart","c":"n. m.","noInf":true},
        out: {
            plural: {
                masc: [
                    [{ p: "زړونه", f: "zRóona" }],
                    [{ p: "زړونو", f: "zRóono" }],
                ],
            },
        },
    },
    // fem plural
    {
        in: {"ts":1527815129,"i":1013,"p":"اوبه","f":"oobú","g":"oobu","e":"water","c":"n. f. pl."},
        out: {
            plural: {
                fem: [
                    [{ p: "اوبه", f: "oobú" }],
                    [{ p: "اوبو", f: "oobó" }],
                ],
            },
        },
    },
    {
        in: {"ts":1527815008,"i":8421,"p":"شودې","f":"shoodé","g":"shoode","e":"milk","c":"n. f. pl."},
        out: {
            plural: {
                fem: [
                    [{ p: "شودې", f: "shoodé" }],
                    [{ p: "شودو", f: "shoodó" }],
                ]
            }
        }
    },
    {
        in: {"ts":1527815008,"i":8421,"p":"شودې","f":"shoode","g":"shoode","e":"milk","c":"n. f. pl."},
        out: {
            plural: {
                fem: [
                    [{ p: "شودې", f: "shoode" }],
                    [{ p: "شودو", f: "shoodo" }],
                ]
            }
        }
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
    {
        in: {"ts":1527816746,"i":9017,"p":"غاښ","f":"ghaax","g":"ghaax","e":"tooth","c":"n. m.","ec":"tooth","ep":"teeth"},
        out: {
            plural: {
                masc: [
                    [{ p: "غاښونه", f: "ghaaxóona" }],
                    [{ p: "غاښونو", f: "ghaaxóono" }],
                ],
            },
        },
    },
    {
        in: {"ts":1527815394,"i":13991,"p":"واده","f":"waadú","g":"waadu","e":"wedding, marriage","c":"n. m.","ppp":"ودونه","ppf":"wadóona"},
        out: {
            plural: {
                masc: [
                    [{ p: "ودونه", f: "wadóona" }],
                    [{ p: "ودونو", f: "wadóono" }],
                ],
            },
        },
    },
    {
        in: {"ts":1527817768,"i":9791,"p":"کارګه","f":"kaargu","g":"kaargu","e":"raven, crow","c":"n. m. anim."},
        out: {
            plural: {
                masc: [
                    [{ p: "کارګان", f: "kaargáan" }],
                    [{ p: "کارګانو", f: "kaargáano" }],
                ],
            },
        },
    },
    {
        in: {"i":11352,"ts":1527813995,"p":"لو","f":"law, lau","g":"law,lau","e":"harvesting, reaping, hay-making; mowed, reaped, harvested","c":"n. m."},
        out: {
            plural: {
                masc: [
                    [{ p: "لوونه", f: "lawóona" }],
                    [{ p: "لوونو", f: "lawóono" }],
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
                    [{p: "ارې", f: "aré"}],
                    [{p: "ارو", f: "aró"}],
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
            apf: "maraají'",
        },
        out: {
            inflections: {
                fem: [
                    [{p: "مرجع", f: "marja'"}],
                    [{p: "مرجعې", f: "marje"}],
                    [{p: "مرجعو", f: "marjo"}],
                ],
            },
            arabicPlural: {
                fem: [
                    [{ p: "مراجع", f: "maraají'" }],
                    [{ p: "مراجو", f: "maraajó" }],
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
                    [{p: "منبعې", f: "manbé"}],
                    [{p: "منبعو", f: "manbó"}],
                ],
            },
            arabicPlural: {
                fem: [
                    [{ p: "منابع", f: "manaabí" }],
                    [{ p: "منابو", f: "manaabó" }],
                ],
            },
        },
    },
    {
        in: {"ts":1527823093,"i":13207,"p":"نبي","f":"nabee","g":"nabee","e":"prophet","c":"n. m. anim.","app":"انبیا","apf":"ambiyáa"},
        out: {
            plural: {
                masc: [
                    [{ p: "نبیان", f: "nabiyáan" }],
                    [{ p: "نبیانو", f: "nabiyáano" }],
                ],
            },
            arabicPlural: {
                masc: [
                    [{ p: "انبیا", f: "ambiyáa" }],
                    [{ p: "انبیاوو", f: "ambiyáawo" }],
                ],
            },
        }
    },
    {
        in: {"ts":1527819536,"i":3063,"p":"تبع","f":"taba'","g":"taba","e":"follower, adherent, supporter, subject, national","c":"n. m. unisex anim.","app":"اتباع","apf":"atbaa"},
        out: {
            arabicPlural: {
                masc: [
                    [{ p: "اتباع", f: "atbaa" }],
                    [{ p: "اتباعوو", f: "atbaawo" }],
                ],
            },
        },
    },
    {
        in: {"ts":1527816113,"i":3072,"p":"تبلیغ","f":"tableegh","g":"tableegh","e":"propaganda; preaching, evangelism","c":"n. m.","app":"تبلیغات","apf":"tableegháat"},
        out: {
            plural: {
                masc: [
                    [{ p: "تبلیغونه", f: "tableeghóona" }],
                    [{ p: "تبلیغونو", f: "tableeghóono" }],
                ],
            },
            arabicPlural: {
                masc: [
                    [{ p: "تبلیغات", f: "tableegháat" }],
                    [{ p: "تبلیغاتو", f: "tableegháato" }],
                ],
            },
        },
    },
    {
        in: {"ts":1527815921,"i":3844,"p":"توقع","f":"tawaqqU","g":"tawakkU","e":"expectation, hope, anticipation","c":"n. f.","app":"توقعات","apf":"tawaqqUaat"},
        out: {
            arabicPlural: {
                masc: [
                    [{ p: "توقعات", f: "tawaqqUaat" }],
                    [{ p: "توقعاتو", f: "tawaqqUaato" }],
                ],
            },
        },
    },
    {
        in: {"ts":1527815820,"i":5177,"p":"حادثه","f":"haadisá","g":"haadisa","e":"accident, event","c":"n. f.","app":"حوادث, حادثات","apf":"hawaadis, haadisaat"},
        out: {
            inflections: {
                fem: [
                    [{ p: "حادثه", f: "haadisá" }],
                    [{ p: "حادثې", f: "haadisé" }],
                    [{ p: "حادثو", f: "haadisó" }],
                ],
            },
            arabicPlural: {
                masc: [
                    [{ p: "حوادث", f: "hawaadis"}, { p: "حادثات", f: "haadisaat" }],
                    [{ p: "حوادثو", f: "hawaadiso"}, { p: "حادثاتو", f: "haadisaato" }],
                ],
            },
        },
    },
    {
        in: {"ts":1527815329,"i":3097,"p":"تجربه","f":"tajrabá, tajribá","g":"tajraba,tajriba","e":"experience","c":"n. f.","app":"تجارب","apf":"tajaarib"},
        out: {
            inflections: {
                fem: [
                    [{ p: "تجربه", f: "tajrabá" }],
                    [{ p: "تجربې", f: "tajrabé" }],
                    [{ p: "تجربو", f: "tajrabó" }],
                ],
            },
            arabicPlural: {
                masc: [
                    [{ p: "تجارب", f: "tajaarib"}],
                    [{ p: "تجاربو", f: "tajaaribo"}],
                ],
            },
        },
    },
    {
        in: {"ts":1527814069,"i":5194,"p":"حال","f":"haal","g":"haal","e":"state, condition, circumstance","c":"n. m.","app":"احوال","apf":"ahwáal"},
        out: {
            plural: {
                masc: [
                    [{ p: "حالونه", f: "haalóona" }],
                    [{ p: "حالونو", f: "haalóono" }],
                ],
            },
            arabicPlural: {
                masc: [
                    [{ p: "احوال", f: "ahwáal" }],
                    [{ p: "احوالو", f: "ahwáalo" }],
                ],
            },
        },
    },
    {
        in: {"ts":1527819536,"i":3063,"p":"تبع","f":"taba'","g":"taba","e":"follower, adherent, supporter, subject, national","c":"n. m. unisex anim.","app":"اتباع","apf":"atbáa'"},
        out: {
            arabicPlural: {
                masc: [
                    [{ p: "اتباع", f: "atbáa'" }],
                    [{ p: "اتباعوو", f: "atbáawo" }],
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
                    [{p: "لارې", f: "láare"}],
                    [{p: "لارو", f: "láaro"}],
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
            plural: {
                fem: [
                    [{ p: "دوستیانې", f: "dostiyáane" }, { p: "دوستیګانې", f: "dosteegáane" }],
                    [{ p: "دوستیانو", f: "dostiyáano" }, { p: "دوستیګانو", f: "dosteegáano" }],
                ],
            },
            inflections: {
                fem: [
                    [{p: "دوستي", f: "dostee"}],
                    [{p: "دوستۍ", f: "dostúy"}],
                    [{p: "دوستیو", f: "dostúyo"}],
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
                    [{p: "کرسۍ", f: "kUrsúy"}],
                    [{p: "کرسۍ", f: "kUrsúy"}],
                    [{p: "کرسیو", f: "kUrsúyo"}, { p: "کرسو", f: "kUrso"}],
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
    // Feminine regular ending in و
    {
        in: {"i":2899,"ts":1527815163,"p":"پیشو","f":"peeshó","g":"peesho","e":"cat","c":"n. f. anim."},
        out: {
            plural: {
                fem: [
                    [{ p: "پیشووې", f: "peeshówe" }, { p: "پیشوګانې", f: "peeshogáane" }],
                    [{ p: "پیشووو", f: "peeshówo" }, { p: "پیشوګانو", f: "peeshogáano" }],
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
        out: {
            plural: {
                fem: [
                    [{p: "وداع وې", f: "widáawe"}, {p: "وداع ګانې", f: "widaagáane"}],
                    [{p: "وداع وو", f: "widáawo"}, {p: "وداع ګانو", f: "widaagáano"}],
                ],
            },
        },
    },
    // with variations on Pashto plural
    {
        in: {"ts":1527815268,"i":8475,"p":"شی","f":"shey","g":"shey","ppp":"شیان، شیونه", "ppf": "sheyáan, sheyóona","e":"thing","c":"n. m."},
        out: {
            inflections: {
                masc: [
                    [{ p: "شی", f: "shey" }],
                    [{ p: "شي", f: "shee" }],
                    [{ p: "شیو", f: "shiyo" }, { p: "شو", f: "sho" }],
                ],
            },
            plural: {
                masc: [
                    [{ p: "شیان", f: "sheyáan" }, { p: "شیونه", f: "sheyóona" }],
                    [{ p: "شیانو", f: "sheyáano" }, { p: "شیونو", f: "sheyóono" }],
                ],
            },
        },
    },
    // TODO: Plaar plaroona paaraan - wrooNa
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
    // if (word.in.p !== "نبي") return;
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
});
