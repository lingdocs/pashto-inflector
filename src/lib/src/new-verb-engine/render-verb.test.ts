import { renderVerb } from "./render-verb";
import { vEntry } from "./rs-helpers";
import * as T from "../../../types";

const wahul = vEntry({"ts":1527815399,"i":15049,"p":"وهل","f":"wahul","g":"wahul","e":"to hit","r":4,"c":"v. trans.","tppp":"واهه","tppf":"waahu","ec":"hit,hits,hitting,hit,hit"});
const raawrul = vEntry({"ts":1527815214,"i":6954,"p":"راوړل","f":"raawRúl","g":"raawRul","e":"to bring, deliver (inanimate objects)","r":4,"c":"v. trans.","tppp":"راووړ","tppf":"raawoR","noOo":true,"separationAtP":2,"separationAtF":3,"ec":"bring,brings,bringing,brought,brought"});
const achawul = vEntry({"ts":1527811872,"i":224,"p":"اچول","f":"achawul","g":"achawul","e":"to put, pour, drop, throw, put on","r":4,"c":"v. trans.","ec":"put,puts,putting,put,put"});
const ganul = vEntry({"ts":1527812000,"i":11398,"p":"ګڼل","f":"gaNul, guNul","g":"gaNul,guNul","e":"to count, consider, reckon, suppose, assume","r":4,"c":"v. trans.","tppp":"ګاڼه","tppf":"gaaNu","ec":"deem"});
const kawulStat = vEntry({"ts":1579015359582,"i":11030,"p":"کول","f":"kawul","g":"kawul","e":"to make ____ ____ (as in \"He's making me angry.\")","r":4,"c":"v. trans.","ssp":"کړ","ssf":"kR","prp":"کړل","prf":"kRul","pprtp":"کړی","pprtf":"kúRey","noOo":true,"ec":"make,makes,making,made,made"});
const kawulDyn = vEntry({"ts":1527812752,"i":11031,"p":"کول","f":"kawul","g":"kawul","e":"to do (an action or activity)","r":4,"c":"v. trans./gramm. trans.","ssp":"وکړ","ssf":"óokR","prp":"وکړل","prf":"óokRul","pprtp":"کړی","pprtf":"kúRey","diacExcept":true,"ec":"do,does,doing,did,done","separationAtP":1,"separationAtF":2});
const kedulStat = vEntry({"ts":1581086654898,"i":11100,"p":"کېدل","f":"kedul","g":"kedul","e":"to become _____","r":2,"c":"v. intrans.","ssp":"ش","ssf":"sh","prp":"شول","prf":"shwul","pprtp":"شوی","pprtf":"shúwey","noOo":true,"ec":"become"});
const kedulDyn = vEntry({"ts":1527812754,"i":11101,"p":"کېدل","f":"kedul","g":"kedul","e":"to happen, occur","r":2,"c":"v. intrans.","ssp":"وش","ssf":"óosh","prp":"وشول","prf":"óoshwul","pprtp":"شوی","pprtf":"shúwey","diacExcept":true,"ec":"happen","separationAtP":1,"separationAtF":2});
const raatlul = vEntry({"ts":1527815216,"i":6875,"p":"راتلل","f":"raatlúl","g":"raatlul","e":"to come","r":4,"c":"v. intrans.","psp":"راځ","psf":"raadz","ssp":"راش","ssf":"ráash","prp":"راغلل","prf":"ráaghlul","pprtp":"راغلی","pprtf":"raaghúley","tppp":"راغی","tppf":"ráaghey","noOo":true,"separationAtP":2,"separationAtF":3,"ec":"come,comes,coming,came,come"});
const wartlul = vEntry({"ts":1585228579997,"i":14821,"p":"ورتلل","f":"wărtlul","g":"wartlul","e":"to come / go over to (third person or place)","r":4,"c":"v. intrans.","psp":"ورځ","psf":"wărdz","ssp":"ورش","ssf":"wársh","prp":"ورغلل","prf":"wárghlul","pprtp":"ورغلی","pprtf":"wărghúley","tppp":"ورغی","tppf":"wărghey","noOo":true,"separationAtP":2,"separationAtF":3,"ec":"come,comes,coming,came,come"});
const osedul = vEntry({"ts":1527815139,"i":1127,"p":"اوسېدل","f":"osedul","g":"osedul","e":"to live, reside, stay, be","r":4,"c":"v. intrans.","shortIntrans":true,"diacExcept":true});
const tlul = vEntry({"ts":1527815348,"i":3791,"p":"تلل","f":"tlul","g":"tlul","e":"to go","r":4,"c":"v. intrans.","psp":"ځ","psf":"dz","ssp":"لاړ ش","ssf":"láaR sh","prp":"لاړ","prf":"láaR","ec":"go,goes,going,went,gone"});
const awuxtul = vEntry({"ts":1527814012,"i":1133,"p":"اوښتل","f":"awUxtul","g":"awUxtul","e":"to pass over, overturn, be flipped over, spill over, shift, change, diverge, pass, cross, abandon; to be sprained","r":4,"c":"v. intrans.","psp":"اوړ","psf":"awR","ec":"pass","ep":"over"});
const khorul = vEntry({"ts":1527812790,"i":6002,"p":"خوړل","f":"khoRul","g":"khoRul","e":"to eat, to bite","r":4,"c":"v. trans.","psp":"خور","psf":"khor","tppp":"خوړ","tppf":"khoR","ec":"eat,eats,eating,ate,eaten"});
const azmoyul = vEntry({"ts":1527811605,"i":468,"p":"ازمویل","f":"azmoyul","g":"azmoyul","e":"to attempt, try; to experiment, test","r":4,"c":"v. trans.","sepOo":true,"ec":"try"});
const khatul = vEntry({"ts":1527814025,"i":5677,"p":"ختل","f":"khatul","g":"khatul","e":"to climb, ascend, rise, go up; to fall out, to fall off, to leave/dissapear; to turn out to be ...; to give a sentence (in law)","r":3,"c":"v. intrans.","psp":"خېژ","psf":"khejz","tppp":"خوت","tppf":"khot","ec":"climb"});
const rasedul = vEntry({"ts":1527813573,"i":7057,"p":"رسېدل","f":"rasedul","g":"rasedul","e":"arrive, reach; (fig.) understand, attain to; mature, ripen","r":4,"c":"v. intrans.","shortIntrans":true,"ec":"arrive"});
const weshul = vEntry({"ts":1527811701,"i":15106,"p":"وېشل","f":"weshul","g":"weshul","e":"divide, distribute, share","r":4,"c":"v. trans.","ec":"divide"});
const watul = vEntry({"ts":1527823376,"i":14759,"p":"وتل","f":"watul","g":"watul","e":"to go out, exit, leave, emerge","r":4,"c":"v. intrans.","psp":"وځ","psf":"oodz","tppp":"واته","tppf":"waatu","ec":"go,goes,going,went,gone","ep":"out"});
const wurul = vEntry({"ts":1527816865,"i":14903,"p":"وړل","f":"wuRúl, oRúl, wRul","g":"wuRul,oRul,wRul","e":"to take, carry, bear, move (inanimate objects); to win, earn (subjunctive یوسي - yósee or ویسي - wéesee, simple past یو یې وړلو - yo ye wRulo)","r":3,"c":"v. trans.","ssp":"یوس","ssf":"yos","prp":"یوړل","prf":"yóRul","tppp":"یوړ","tppf":"yoR","noOo":true,"separationAtP":2,"separationAtF":2,"diacExcept":true,"ec":"take,takes,taking,took,taken"});
const kexodul = vEntry({"ts":1527812284,"i":11113,"p":"کېښودل","f":"kexodul","g":"kexodul","e":"to put, to put down, to set in place","r":4,"c":"v. trans.","psp":"ږد","psf":"Gd","ssp":"کېږد","ssf":"kéGd","noOo":true,"separationAtP":2,"separationAtF":2,"ec":"put,puts,putting,put,put"});
const kenaastul = vEntry({"ts":1527812759,"i":11124,"p":"کېناستل","f":"kenaastul","g":"kenaastul","e":"to sit down, to have a seat","r":4,"c":"v. intrans.","psp":"کېن","psf":"ken","noOo":true,"separationAtP":2,"separationAtF":2,"ec":"sit,sits,sitting,sat","ep":"down"});
const ghadzedul = vEntry({"ts":1527812615,"i":9500,"p":"غځېدل","f":"ghadzedul","g":"ghadzedul","e":"stretch out, lie, be extended, expand","r":3,"c":"v. intrans.","ec":"stretch","ep":"out"});
const prexodul = vEntry({"ts":1527815190,"i":2495,"p":"پرېښودل","f":"prexodúl","g":"prexodul","e":"to leave, abandon, forsake, let go, allow","r":4,"c":"v. trans.","psp":"پرېږد","psf":"preGd","noOo":true,"separationAtP":3,"separationAtF":3,"ec":"abandon"});
const raawustul = vEntry({"ts":1527819827,"i":6955,"p":"راوستل","f":"raawustúl","g":"raawustul","e":"to bring, deliver (animate objects), obtain, extract","r":3,"c":"v. trans.","psp":"راول","psf":"raawul","noOo":true,"separationAtP":2,"separationAtF":3,"ec":"bring,brings,bringing,brought,brought"});
const leedul = vEntry({"ts":1527812275,"i":12049,"p":"لیدل","f":"leedul","g":"leedul","e":"to see","r":4,"c":"v. trans./gramm. trans.","psp":"وین","psf":"ween","tppp":"لید","tppf":"leed","ec":"see,sees,seeing,saw,seen"});
const bandawul = vEntry(
  {"ts":1527821309,"i":1792,"p":"بندول","f":"bandawul","g":"bandawul","e":"to close, block, stop, barricade, cut off, restrain, hold back","r":3,"c":"v. stat. comp. trans.","l":1577301753727,"ec":"close"},
  {"ts":1577301753727,"i":1780,"p":"بند","f":"band","g":"band","e":"closed, blocked, stopped","c":"adj."},
);
const bandedul = vEntry(
  {"ts":1588781671306,"i":1796,"p":"بندېدل","f":"bandedúl","g":"bandedul","e":"to be closed, blocked, stopped","r":4,"c":"v. stat. comp. intrans.","l":1577301753727,"ec":"be","ep":"closed"},
  {"ts":1577301753727,"i":1780,"p":"بند","f":"band","g":"band","e":"closed, blocked, stopped","c":"adj."},
);
const stureyKawul = vEntry(
  {"ts":1591033078746,"i":7877,"p":"ستړی کول","f":"stuRey kawul","g":"stuReykawul","e":"to make tired, wear out","r":4,"c":"v. stat. comp. trans.","l":1527815306,"ec":"make","ep":"tired"},
  {"ts":1527815306,"i":7876,"p":"ستړی","f":"stúRey","g":"stuRey","e":"tired","r":4,"c":"adj. / adv."},
);
const stureyKedul = vEntry(
  {"ts":1591033069786,"i":7878,"p":"ستړی کېدل","f":"stuRey kedul","g":"stuReykedul","e":"to get tired, fatigued","r":4,"c":"v. stat. comp. intrans.","l":1527815306,"ec":"get","ep":"tired"},
  {"ts":1527815306,"i":7876,"p":"ستړی","f":"stúRey","g":"stuRey","e":"tired","r":4,"c":"adj. / adv."},
);
const ooPh: T.PH = { type: "PH", ps: { p: "و", f: "óo" }};

test("basic tenses", () => {
    expect(renderVerb({
        verb: wahul,
        tense: "presentVerb",
        person: T.Person.FirstSingMale,
        voice: "active",
    })).toEqual({
        hasBa: false,
        
        vbs: [
            [],
            [
                { type: "VB", ps: [{ p: "وهم", f: "wahum" }], person: T.Person.FirstSingMale },
            ],
        ],
    });
    expect(renderVerb({
        verb: wahul,
        tense: "subjunctiveVerb",
        person: T.Person.SecondSingMale,
        voice: "active",
    })).toEqual({
        hasBa: false,
        vbs: [
            [{ type: "PH", ps: { f: "óo", p: "و" }}],
            [
                { type: "VB", ps: [{ p: "وهې", f: "wahe" }], person: T.Person.SecondSingMale },
            ],
        ],
    });
    expect(renderVerb({
        verb: wahul,
        tense: "habitualPerfectivePast",
        person: T.Person.ThirdSingFemale,
        voice: "active",
    })).toEqual({
        hasBa: true,
        vbs: [
            [{ type: "PH", ps: { f: "óo", p: "و" }}],
            [
                {
                    type: "VB",
                    ps: {
                        long: [{ p: "وهله", f: "wahula" }],
                        short: [{ p: "وهه", f: "waha" }],
                    },
                    person: T.Person.ThirdSingFemale
                },
            ],
        ],
    });
});

test("basic tenses with inflecting roots/stems", () => {
    expect(renderVerb({
        verb: bandawul,
        tense: "subjunctiveVerb",
        person: T.Person.FirstSingMale,
        presObj: T.Person.ThirdSingFemale,
        voice: "active",
    })).toEqual({
        hasBa: false,
        vbs: [
            [
                {
                    type: "NComp",
                    comp: {
                        type: "AdjComp",
                        ps: { p: "بنده", f: "bánda" },
                        gender: "fem",
                        number: "singular",
                    },
                },
            ],
            [
                {
                    type: "VB",
                    ps: {
                        long: [{ p: "کړم", f: "kRum" }],
                        short: [{ p: "کم", f: "kum" }],
                    },
                    person: T.Person.FirstSingMale,
                },
            ],
        ],
    });
});

test("special endings", () => {
    const tests: {
        verb: T.VerbEntryNoFVars,
        tense: "perfectivePast" | "imperfectivePast",
        result: T.VerbRenderedOutput,
    }[] = [
        // verbs ending in -awul
        {
            verb: achawul,
            tense: "perfectivePast",
            result: [
                [{ type: "PH", ps: { p: "وا", f: "wáa" }}],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "چولو", f: "chawulo" }],
                            short: [{ p: "چاوه", f: "chaawu" }],
                        },
                        person: 4,
                    },
                ],
            ],
        },
        {
            verb: achawul,
            tense: "imperfectivePast",
            result: [
                [],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "اچولو", f: "achawúlo" }],
                            short: [{ p: "اچاوه", f: "achaawú" }],
                        },
                        person: 4,
                    },
                ],
            ],
        },
        // verbs with special tppp
        {
            verb: ganul,
            tense: "perfectivePast",
            result: [
                [ooPh],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "ګڼلو", f: "gaNulo" }],
                            short: [{ p: "ګاڼه", f: "gaaNu" }],
                        },
                        person: 4,
                    },
                ],
            ],
        },
        {
            verb: ganul,
            tense: "imperfectivePast",
            result: [
                [],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "ګڼلو", f: "gaNúlo" }],
                            short: [{ p: "ګاڼه", f: "gaaNú" }],
                        },
                        person: 4,
                    },
                ],
            ],
        },
        // verbs with special tppp ending in a consonant
        {
            verb: khatul,
            tense: "perfectivePast",
            result: [
                [ooPh],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "ختلو", f: "khatulo" }],
                            short: [
                                { p: "خوت", f: "khot" },
                                // // TODO: is this even right?
                                // { p: "خوته", f: "khotu" },
                                // { p: "خوتو", f: "khoto" },
                            ],
                        },
                        person: 4,
                    },
                ],
            ],
        },
        {
            verb: leedul,
            tense: "imperfectivePast",
            result: [
                [],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "لیدلو", f: "leedúlo" }],
                            short: [
                                { p: "لید", f: "léed" },
                                // // TODO: is this even right?
                                // { p: "خوته", f: "khotu" },
                                // { p: "خوتو", f: "khoto" },
                            ],
                        },
                        person: 4,
                    },
                ],
            ],
        },
        {
            verb: raawrul,
            tense: "perfectivePast",
            result: [
                [{ type: "PH", ps: { p: "را", f: "ráa" }}],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "وړلو", f: "wRulo" }],
                            short: [{ p: "ووړ", f: "woR" }],
                        },
                        person: 4,
                    },
                ],
            ],
        },
        // verbs ending in a dental ت or د
        {
            verb: rasedul,
            tense: "perfectivePast",
            result: [
                [ooPh],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "رسېدلو", f: "rasedulo" }],
                            short: [
                                { p: "رسېد", f: "rased" },
                                { p: "رسېده", f: "rasedu" },
                                { p: "رسېدو", f: "rasedo" },
                            ],
                        },
                        person: 4,
                    },
                ],
            ],
        },
        {
            verb: awuxtul,
            tense: "imperfectivePast",
            result: [
                [],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "اوښتلو", f: "awUxtúlo" }],
                            short: [
                                { p: "اوښت", f: "awÚxt" },
                                { p: "اوښته", f: "awUxtú" },
                                { p: "اوښتو", f: "awUxtó" },
                            ],
                        },
                        person: 4,
                    },
                ],
            ],
        },
        // other verbs
        {
            verb: weshul,
            tense: "perfectivePast",
            result: [
                [ooPh],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "وېشلو", f: "weshulo" }],
                            short: [
                                { p: "وېشه", f: "weshu" },
                                { p: "وېشو", f: "wesho" },
                            ],
                        },
                        person: 4,
                    },
                ],
            ],
        },
        {
            verb: kedulStat,
            tense: "perfectivePast",
            result: [
                [],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "شولو", f: "shwulo" }],
                            short: [{ p: "شو", f: "sho" }],
                        },
                        person: T.Person.ThirdSingMale,
                    },
                ],
            ],
        },
        {
            verb: kedulStat,
            tense: "imperfectivePast",
            result: [
                [],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "کېدلو", f: "kedúlo" }],
                            short: [{ p: "کېده", f: "kedú" }],
                        },
                        person: T.Person.ThirdSingMale,
                    },
                ],
            ],
        },
        {
            verb: kawulStat,
            tense: "perfectivePast",
            result: [
                [],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "کړلو", f: "kRulo" }],
                            short: [
                                { p: "کړ", f: "kuR" },
                                { p: "کړه", f: "kRu" },
                                { p: "کړو", f: "kRo" },
                            ],
                            mini: [{ p: "که", f: "ku" }, { p: "کو", f: "ko" }],
                        },
                        person: T.Person.ThirdSingMale,
                    },
                ],
            ],
        },
        {
            verb: kawulDyn,
            tense: "perfectivePast",
            result: [
                [ooPh],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "کړلو", f: "kRulo" }],
                            short: [
                                { p: "کړ", f: "kuR" },
                                { p: "کړه", f: "kRu" },
                                { p: "کړو", f: "kRo" },
                            ],
                            mini: [{ p: "که", f: "ku" }, { p: "کو", f: "ko" }],
                        },
                        person: T.Person.ThirdSingMale,
                    },
                ],
            ],
        },
        {
            verb: kawulDyn,
            tense: "imperfectivePast",
            result: [
                [],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "کولو", f: "kawúlo" }],
                            short: [{ p: "کاوه", f: "kaawú" }],
                        },
                        person: T.Person.ThirdSingMale,
                    },
                ],
            ],
        },
        {
            verb: tlul,
            tense: "imperfectivePast",
            result: [
                [],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "تللو", f: "tlúlo" }],
                            short: [{ p: "ته", f: "tú" }],
                        },
                        person: T.Person.ThirdSingMale,
                    },
                ],
            ],
        },
        {
            verb: tlul,
            tense: "imperfectivePast",
            result: [
                [],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "تللو", f: "tlúlo" }],
                            short: [{ p: "ته", f: "tú" }],
                        },
                        person: T.Person.ThirdSingMale,
                    },
                ],
            ],
        },
        {
            verb: raatlul,
            tense: "imperfectivePast",
            result: [
                [],
                [
                    {
                        type: "VB",
                        ps: {
                            long: [{ p: "راتللو", f: "raatlúlo" }],
                            short: [{ p: "راته", f: "raatú" }],
                        },
                        person: T.Person.ThirdSingMale,
                    },
                ],
            ],
        },
        {
            verb: raatlul,
            tense: "perfectivePast",
            result: [
                [{ type: "PH", ps: { p: "را", f: "ráa" }}],
                [
                    {
                        type: "VB",
                        ps: [{ p: "غی", f: "ghey" }],
                        person: T.Person.ThirdSingMale,
                    },
                ],
            ],
        },
        {
            verb: wartlul,
            tense: "perfectivePast",
            result: [
                [{ type: "PH", ps: { p: "ور", f: "wár" }}],
                [
                    {
                        type: "VB",
                        ps: [{ p: "غی", f: "ghey" }],
                        person: T.Person.ThirdSingMale,
                    },
                ],
            ],
        },
    ];
    tests.forEach(x => {
        expect(renderVerb({
            verb: x.verb,
            tense: x.tense,
            person: T.Person.ThirdSingMale,
            voice: "active",
        })).toEqual({ hasBa: false, vbs: x.result });
    });

    expect(renderVerb({
        verb: kedulStat,
        tense: "perfectivePast",
        person: T.Person.FirstPlurMale,
        voice: "active",
    })).toEqual({
        hasBa: false,
        vbs: [
            [],
            [
                {
                    type: "VB",
                    ps: {
                        long: [{ p: "شولو", f: "shwuloo" }],
                        short: [{ p: "شو", f: "shoo" }],
                    },
                    person: T.Person.FirstPlurMale,
                },
            ],
        ],
    });
    expect(renderVerb({
        verb: tlul,
        tense: "imperfectivePast",
        person: T.Person.FirstSingMale,
        voice: "active",
    })).toEqual({
        hasBa: false,
        vbs: [
            [],
            [
                {
                    type: "VB",
                    ps: {
                        long: [{ p: "تللم", f: "tlúlum" }],
                        // TODO: Shouldn't be accent here on single syllable
                        short: [{ p: "تلم", f: "tlúm" }],
                    },
                    person: T.Person.FirstSingMale,
                },
            ],
        ],
    });
    expect(renderVerb({
        verb: tlul,
        tense: "imperfectivePast",
        person: T.Person.ThirdSingFemale,
        voice: "active",
    })).toEqual({
        hasBa: false,
        vbs: [
            [],
            [
                {
                    type: "VB",
                    ps: {
                        long: [{ p: "تلله", f: "tlúla" }],
                        // TODO: Shouldn't be accent here on single syllable
                        short: [{ p: "تله", f: "tlá" }],
                    },
                    person: T.Person.ThirdSingFemale,
                },
            ],
        ],
    });
    // avoid redundant ل ending
    expect(renderVerb({
        verb: khorul,
        tense: "imperfectivePast",
        person: T.Person.ThirdPlurMale,
        voice: "active",
    })).toEqual({
        hasBa: false,
        vbs: [
            [],
            [
                {
                    type: "VB",
                    ps: {
                        long: [{ p: "خوړل", f: "khoRúl" }],
                        short: [{ p: "خوړل", f: "khoRúl" }],
                    },
                    person: T.Person.ThirdPlurMale,
                },
            ],
        ],  
    });
    expect(renderVerb({
        verb: khorul,
        tense: "perfectivePast",
        person: T.Person.ThirdPlurMale,
        voice: "active",
    })).toEqual({
        hasBa: false,
        vbs: [
            [ooPh],
            [
                {
                    type: "VB",
                    ps: {
                        long: [{ p: "خوړل", f: "khoRul" }],
                        short: [{ p: "خوړل", f: "khoRul" }],
                    },
                    person: T.Person.ThirdPlurMale,
                },
            ],
        ],  
    });
});

test("perfect tenses", () => {
    expect(renderVerb({
        verb: wahul,
        tense: "presentPerfect",
        person: T.Person.FirstSingMale,
        voice: "active",
    })).toEqual({
        hasBa: false,
        vbs: [
            [],
            [
                { type: "VB", ps: [{ p: "وهلی", f: "wahúley" }], gender: "masc", number: "singular" },
                { type: "VB", ps: [{ p: "یم", f: "yum" }], person: T.Person.FirstSingMale },
            ],
        ],
    });
    expect(renderVerb({
        verb: wahul,
        tense: "subjunctivePerfect",
        person: T.Person.FirstSingMale,
        voice: "active",
    })).toEqual({
        hasBa: false,
        vbs: [
            [],
            [
                { type: "VB", ps: [{ p: "وهلی", f: "wahúley" }], gender: "masc", number: "singular" },
                { type: "VB", ps: [{ p: "وم", f: "wum" }], person: T.Person.FirstSingMale },
            ],
        ],
    });
    expect(renderVerb({
        verb: wahul,
        tense: "habitualPerfect",
        person: T.Person.FirstSingMale,
        voice: "active",
    })).toEqual({
        hasBa: false,
        vbs: [
            [],
            [
                { type: "VB", ps: [{ p: "وهلی", f: "wahúley" }], gender: "masc", number: "singular" },
                { type: "VB", ps: [{ p: "یم", f: "yum" }], person: T.Person.FirstSingMale },
            ],
        ],
    });
    expect(renderVerb({
        verb: wahul,
        tense: "habitualPerfect",
        person: T.Person.ThirdPlurMale,
        voice: "active",
    })).toEqual({
        hasBa: false,
        vbs: [
            [],
            [
                { type: "VB", ps: [{ p: "وهلي", f: "wahúlee" }], gender: "masc", number: "plural" },
                { type: "VB", ps: [{ p: "وي", f: "wee" }], person: T.Person.ThirdPlurMale },
            ],
        ],
    });
    expect(renderVerb({
        verb: wahul,
        tense: "futurePerfect",
        person: T.Person.FirstSingMale,
        voice: "active",
    })).toEqual({
        hasBa: true,
        vbs: [
            [],
            [
                { type: "VB", ps: [{ p: "وهلی", f: "wahúley" }], gender: "masc", number: "singular" },
                { type: "VB", ps: [{ p: "یم", f: "yum" }], person: T.Person.FirstSingMale },
            ],
        ],
    });
    expect(renderVerb({
        verb: wahul,
        tense: "pastPerfect",
        person: T.Person.SecondSingFemale,
        voice: "active",
    })).toEqual({
        hasBa: false,
        vbs: [
            [],
            [
                { type: "VB", ps: [{ p: "وهلې", f: "wahúle" }], gender: "fem", number: "singular" },
                {
                    type: "VB",
                    ps: {
                        long: [{ p: "ولې", f: "wule" }],
                        short: [{ p: "وې", f: "we" }],
                    },
                    person: T.Person.SecondSingFemale,
                },
            ],
        ],
    });
    expect(renderVerb({
        verb: wahul,
        tense: "wouldBePerfect",
        person: T.Person.SecondSingFemale,
        voice: "active",
    })).toEqual({
        hasBa: true,
        vbs: [
            [],
            [
                { type: "VB", ps: [{ p: "وهلې", f: "wahúle" }], gender: "fem", number: "singular" },
                {
                    type: "VB",
                    ps: {
                        long: [{ p: "ولې", f: "wule" }],
                        short: [{ p: "وې", f: "we" }],
                    },
                    person: T.Person.SecondSingFemale,
                },
            ],
        ],
    });
    expect(renderVerb({
        verb: wahul,
        tense: "pastSubjunctivePerfect",
        person: T.Person.SecondSingFemale,
        voice: "active",
    })).toEqual({
        hasBa: false,
        vbs: [
            [],
            [
                { type: "VB", ps: [{ p: "وهلې", f: "wahúle" }], gender: "fem", number: "singular" },
                {
                    type: "VB",
                    ps: [{ p: "وای", f: "waay" }, { p: "وی", f: "wey" }],
                    person: T.Person.SecondSingFemale,
                },
            ],
        ],
    });
    expect(renderVerb({
        verb: wahul,
        tense: "wouldHaveBeenPerfect",
        person: T.Person.SecondSingFemale,
        voice: "active",
    })).toEqual({
        hasBa: true,
        vbs: [
            [],
            [
                { type: "VB", ps: [{ p: "وهلې", f: "wahúle" }], gender: "fem", number: "singular" },
                {
                    type: "VB",
                    ps: [{ p: "وای", f: "waay" }, { p: "وی", f: "wey" }],
                    person: T.Person.SecondSingFemale,
                },
            ],
        ],
    });
});

test("ability tenses", () => {
    expect(renderVerb({
        verb: wahul,
        tense: "presentVerbModal",
        person: T.Person.FirstSingMale,
        voice: "active",
    })).toEqual({
        hasBa: false,
        vbs: [
            [],
            [
                {
                    type: "VB", 
                    ps: {
                        long: [
                            { p: "وهلی", f: "wahúley" },
                            { p: "وهلای", f: "wahúlaay" },
                        ],
                        short: [
                            { p: "وهی", f: "wahéy" },
                            { p: "وهای", f: "waháay" },
                        ],
                    },
                },
                {
                    type: "VB",
                    ps: [{ p: "شم", f: "shum" }],
                    person: T.Person.FirstSingMale,
                },
            ],
        ],
    });
});

test("ending on complex verbs", () => {
    expect(renderVerb({
        verb: stureyKawul,
        tense: "presentVerbModal",
        person: T.Person.SecondSingMale,
        voice: "active",
        presObj: T.Person.ThirdSingFemale
    })).toEqual({
        hasBa: false,
        vbs: [
            [],
            [
                {
                    type: "welded",
                    left: {
                        type: "NComp",
                        comp: {
                            type: "AdjComp",
                            ps: { p: "ستړې", f: "stuRe" },
                            gender: "fem",
                            number: "singular",
                        },
                    },
                    right: {
                        type: "VB",
                        ps: {
                            long: [
                                { p: "کولی", f: "kawúley" },
                                { p: "کولای", f: "kawúlaay" },
                            ],
                            short: [
                                { p: "کوی", f: "kawéy" },
                                { p: "کوای", f: "kawáay" },
                            ],
                        },
                    },
                },
                {
                    type: "VB",
                    ps: [{ p: "شې", f: "she" }],
                    person: T.Person.SecondSingMale,
                },
            ],
        ],
    });
    expect(renderVerb({
        verb: stureyKawul,
        tense: "presentVerb",
        person: T.Person.SecondSingMale,
        voice: "active",
        presObj: T.Person.ThirdSingFemale
    })).toEqual({
        hasBa: false,
        vbs: [
            [],
            [
                {
                    type: "welded",
                    left: {
                        type: "NComp",
                        comp: {
                            type: "AdjComp",
                            ps: { p: "ستړې", f: "stuRe" },
                            gender: "fem",
                            number: "singular",
                        },
                    },
                    right: {
                        type: "VB",
                        ps: [{ p: "کوې", f: "kawé" }],
                    },
                    person: T.Person.SecondSingMale,
                },
            ],
        ],
    });
});