/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as T from "../types";

// TODO: Automatice syncing of aux verbs from dictionary

export const dynamicAuxVerbs: Array<
    { 
        entry: T.DictionaryEntry,
        complement?: T.DictionaryEntry,
    }
> = [
    {
        entry: {"i":10058,"ts":1527812752,"p":"کول","f":"kawul","e":"to do (an action or activity)","c":"v. trans. irreg. dyn. aux.","ssp":"وکړ","ssf":"óokR","prp":"وکړل","prf":"óokRul","pprtp":"کړی","pprtf":"kúRey","diacExcept":true},
    },
    {
        entry: {"i":10122,"ts":1527812754,"p":"کېدل","f":"kedul","e":"to happen, occur","c":"v. intrans. irreg. aux. dyn.","ssp":"وش","ssf":"óosh","prp":"وشول","prf":"óoshwul","pprtp":"شوی","pprtf":"shúwey","diacExcept":true},
    },
    {
        entry: {
            ts:1527813914,
            p:"ورکول",
            f:"wărkawul",
            e:"to give (to him, her, them, others)",
            c: "v. trans.",
            i:12350,
        },
    },
    {
        entry: {
            ts: 1527812157,
            p: "تېرول",
            f: "terawul",
            e: "to pass (time), to take across, to pass, endure (difficulties)",
            c: "v. stat. comp. trans.",
            l: 1527813139,
            i: 3459,
        },
        complement: {"i":3774,"ts":1527813139,"p":"تېر","f":"ter","e":"last, past, previous, passed, gone over","c":"adj."},
    },
    {
        entry: {
            ts: 1527815399,
            p: "وهل",
            f: "wahul",
            e: "to hit",
            c: "v. trans.",
            i: 12183,
            tppp: "واهه",
            tppf: "waahu",
        },
    },
    {
        entry: {
            ts: 1527817026,
            p: "کښل",
            f: "kxul",
            e: "to drag, pull, take out, draw, get",
            c: "v. trans.",
            i: 8862,
        },
    },
    {
        entry: {
            ts: 1527814084,
            p: "لګول",
            f: "lagawul",
            e: "to touch, join, use, take, place",
            c: "v. trans.",
            i: 9794,
        },
    },
    {
        entry: {
            ts: 1527814084,
            p: "لګول",
            f: "lagawul",
            e: "to touch, join, use, take, place",
            c: "v. trans.",
            i: 9794,
        }
    },
    {
        entry: {
            ts: 1527817013,
            p: "ویل",
            f: "wayl",
            e: "to say, to tell",
            c: "v. trans. indir.",
            i: 12229,
        },
    },
    {
        entry: {
            ts: 1527815396,
            p: "وایل",
            f: "waayul",
            e: "to say, to tell",
            c: "v. trans. indir.",
            i: 11929,
        },
    },
    {
        entry: {
            ts: 1527812447,
            p: "اخستل",
            f: "akhustul",
            e: "to take, buy, purchase, receive; to shave, cut with scissors",
            c: "v. trans.",
            i: 251,
            psp: "اخل",
            psf: "akhl",
        },
    },
    {
        entry: {
            ts: 1527817298,
            p: "اخیستل",
            f: "akheestul",
            e: "to take, buy, purchase, receive; to shave, cut with scissors",
            c: "v. trans.",
            i: 266,
        },
    },
    {
        entry: {
            ts: 1527814617,
            p: "نیول",
            f: "neewul",
            e: "to catch, grab, take, arrest; bear (fruit)",
            c: "v. trans. irreg.",
            i: 11880,
            psp: "نیس",
            psf: "nees",
        },
    },
    {
        entry: {
            ts: 1527811872,
            p: "اچول",
            f: "achawul",
            e: "to pour, drop, throw, put on",
            c: "v. trans.",
            i: 194,
        },
    },
    {
        entry: {
            ts: 1527812790,
            p: "خوړل",
            f: "khoRul",
            e: "to eat, to bite",
            c: "v. trans.",
            i: 4769,
            psp: "خور",
            psf: "khor",
            tppp: "خوړ",
            tppf: "khoR",
        },
    },
    {
        entry: {
            ts: 1527811868,
            p: "غښتل",
            f: "ghuxtul",
            e: "to twist, curl, roll up, wrap up",
            c: "v. trans.",
            i: 7958,
        },
    },
    {
        entry: {
            ts: 1527816127,
            p: "اړول",
            f: "aRawul",
            e: "to turn over, flip over; convert, change; to move over to, establish oneself in a new spot; divert, turn away, hijack; oblige, force",
            c: "v. trans.",
            i: 389,
        },
    },
    {
        entry: {
            ts: 1527812868,
            p: "لرل",
            f: "larul",
            e: "to have, possess",
            c: "v. trans.",
            i: 9707,
            tppp: "لاره",
            tppf: "laaru",
        },
    },
    {
        entry: {
            ts: 1527813572,
            p: "رسول",
            f: "rasawul",
            e: "to deliver, to make arrive, provide, send, supply, bring to,",
            c: "v. trans.",
            i: 5897,
        },
    },
    {
        entry: {
            ts: 1581619940636,
            p: "باسل",
            f: "baasul",
            e: "to take out, extract, pull out, tear out",
            c: "v. trans.",
            i: 1115,
        },
    },
    {
        entry: {
            ts: 1527816146,
            p: "ایستل",
            f: "eestul",
            e: "to throw out, discard, chuck, toss; to extract, to take out",
            c: "v. trans.",
            i: 1025,
            psp: "باس",
            psf: "baas",
        },
    },
    {
        entry: {
            ts: 1527818123,
            p: "څنډل",
            f: "tsanDúl",
            e: "to shake out, shake off, brush aside",
            c: "v. trans.",
            i: 4975,
            tppp: "څانډ",
            tppf: "tsaanD",
        },
    },
    {
        entry: {
            ts: 1527814862,
            p: "وژل",
            f: "wajzul",
            e: "to kill, slaughter",
            c: "v. trans. irreg.",
            i: 12071,
            psp: "وژن",
            psf: "wajzn",
            tppp: "واژه",
            tppf: "waajzu",
        },
    },
    {
        entry: {
            ts: 1527813019,
            p: "ګرول",
            f: "grawul",
            e: "to scratch, scrape",
            c: "v. trans.",
            i: 9370,
        },
    },
    {
        entry: {
            ts: 1527818260,
            p: "بادول",
            f: "baadawúl",
            e: "to winnow, toss, throw to the wind, squander",
            c: "v. stat. comp. trans.",
            l: 1527816345,
            i: 1088,
        },
        complement: {
            ts: 1527816345,
            p: "باد",
            f: "baad",
            e: "wind, air; swelling, rheumitism",
            c: "n. m.",
            i: 1076,
        },
    },
    {
        entry: {
            ts: 1527815343,
            p: "تېرېدل",
            f: "teredul",
            e: "to pass, go across, go by",
            c: "v. stat. comp. intrans.",
            l: 1527813139,
            i: 3461,
        },
        complement: {
            ts: 1527813139,
            p: "تېر",
            f: "ter",
            e: "last, past, previous, passed, gone over",
            c: "adj.",
            i: 3449,
        },
    },
    {
        entry: {
            ts: 1571859113828,
            p: "پخول",
            f: "pukhawul",
            e: "to cook, prepare, to cause to ripen",
            c: "v. stat. comp. trans.",
            l: 1574867531681,
            i: 2011,
        },
        complement: {
            ts: 1574867531681,
            p: "پوخ",
            f: "pokh",
            e: "mature, ripe, ready, cooked, able, skillful, experienced, tried, tested, true",
            c: "adj. irreg.",
            i: 2321,
            infap: "پاخه",
            infaf: "paakhu",
            infbp: "پخ",
            infbf: "pakh",
        },
    },
    {
        entry: {
            ts: 1527817706,
            p: "ټکول",
            f: "Takawul",
            e: "to knock, tap",
            c: "v. trans.",
            i: 3568,
        },
    },
    {
        entry: {
            ts: 1527812869,
            p: "لټول",
            f: "luTawul",
            e: "to search, seek",
            c: "v. trans.",
            i: 9686,
        },
    },
    {
        entry: {
            ts: 1574784362578,
            p: "ډنګول",
            f: "Dangawul",
            e: "to make sound, to make ring out, to meat to make a sound (like a symbal, pan, etc.)",
            c: "v. trans.",
            i: 5653,
        },
    },
    {
        entry: {
            ts: 1527811289,
            p: "کېنول",
            f: "kenawul",
            e: "to seat, to make or have someone sit down",
            c: "v. trans.",
            i: 9240,
            noOo: true,
        },
    },
    {
        entry: {
            ts: 1527812873,
            p: "لوستل",
            f: "lwustul",
            e: "to read, study",
            c: "v. trans. irreg.",
            i: 10163,
            psp: "لول",
            psf: "lwul",
        },
    },
    {
        entry: {
            i:4362,
            ts:1527814586,
            p:"چلول",
            f:"chalawul",
            e:"to drive, operate, handle, put forward, circulate",
            c:"v. trans.",
        },
    },
    {
        entry: {"i":6731,"ts":1527815240,"p":"ساتل","f":"saatul","e":"to keep, protect, watch over; to hold","c":"v. trans."},
    },
    {
        entry: {"i":11782,"ts":1527814053,"p":"موندل","f":"moondúl","e":"to find, acquire, discover, get","c":"v. trans. irreg.","psp":"موم","psf":"moom"},
    },
    {
        entry: {"i":4212,"ts":1527812712,"p":"جوړول","f":"joRawul","e":"to make, form, build, mend","l":1527812711,"c":"v. stat. comp. trans."},
        complement: {"i":4206,"ts":1527812711,"p":"جوړ","f":"joR","e":"well, healthy, whole, made","c":"adj."},
    },
    {
        entry: {"i":13869,"ts":1527816865,"p":"وړل","f":"wuRúl, oRúl, wRul","e":"to take, carry, bear, move (inanimate objects); to win, earn (subjunctive یوسي - yósee or ویسي - wéesee, simple past یو یې وړلو - yo ye wRulo)","separationAtP":2,"separationAtF":2,"c":"v. trans. irreg.","ssp":"یوس","ssf":"yos","prp":"یوړل","prf":"yóRul","noOo":true,"diacExcept":true},
    },
    {
        entry: {"i":6503,"ts":1527815214,"p":"راوړل","f":"raawRúl","e":"to bring, deliver (inanimate objects)","separationAtP":2,"separationAtF":3,"c":"v. trans. irreg.","noOo":true},
    },
];
