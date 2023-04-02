import * as T from "../../../types";
import { getRootStem } from "./roots-and-stems";
import { vEntry } from "./render-verb.test";
import { ooPrefix } from "./roots-and-stems";

const wahul = vEntry({"ts":1527815399,"i":15049,"p":"وهل","f":"wahul","g":"wahul","e":"to hit","r":4,"c":"v. trans.","tppp":"واهه","tppf":"waahu","ec":"hit,hits,hitting,hit,hit"});
const achawul = vEntry({"ts":1527811872,"i":224,"p":"اچول","f":"achawul","g":"achawul","e":"to put, pour, drop, throw, put on","r":4,"c":"v. trans.","ec":"put,puts,putting,put,put"});
const ganul = vEntry({"ts":1527812000,"i":11398,"p":"ګڼل","f":"gaNul, guNul","g":"gaNul,guNul","e":"to count, consider, reckon, suppose, assume","r":4,"c":"v. trans.","tppp":"ګاڼه","tppf":"gaaNu","ec":"deem"});
const kawulStat = vEntry({"ts":1579015359582,"i":11030,"p":"کول","f":"kawul","g":"kawul","e":"to make ____ ____ (as in \"He's making me angry.\")","r":4,"c":"v. trans.","ssp":"کړ","ssf":"kR","prp":"کړل","prf":"kRul","pprtp":"کړی","pprtf":"kúRey","noOo":true,"ec":"make,makes,making,made,made"});
const kawulDyn = vEntry({"ts":1527812752,"i":11031,"p":"کول","f":"kawul","g":"kawul","e":"to do (an action or activity)","r":4,"c":"v. trans./gramm. trans.","ssp":"وکړ","ssf":"óokR","prp":"وکړل","prf":"óokRul","pprtp":"کړی","pprtf":"kúRey","diacExcept":true,"ec":"do,does,doing,did,done"});
const kedulStat = vEntry({"ts":1581086654898,"i":11100,"p":"کېدل","f":"kedul","g":"kedul","e":"to become _____","r":2,"c":"v. intrans.","ssp":"ش","ssf":"sh","prp":"شول","prf":"shwul","pprtp":"شوی","pprtf":"shúwey","noOo":true,"ec":"become"});
const kedulDyn = vEntry({"ts":1527812754,"i":11101,"p":"کېدل","f":"kedul","g":"kedul","e":"to happen, occur","r":2,"c":"v. intrans.","ssp":"وش","ssf":"óosh","prp":"وشول","prf":"óoshwul","pprtp":"شوی","pprtf":"shúwey","diacExcept":true,"ec":"happen"});
const raatlul = vEntry({"ts":1527815216,"i":6875,"p":"راتلل","f":"raatlúl","g":"raatlul","e":"to come","r":4,"c":"v. intrans.","psp":"راځ","psf":"raadz","ssp":"راش","ssf":"ráash","prp":"راغلل","prf":"ráaghlul","pprtp":"راغلی","pprtf":"raaghúley","tppp":"راغی","tppf":"ráaghey","noOo":true,"separationAtP":2,"separationAtF":3,"ec":"come,comes,coming,came,come"});
const wartlul = vEntry({"ts":1585228579997,"i":14821,"p":"ورتلل","f":"wărtlul","g":"wartlul","e":"to come / go over to (third person or place)","r":4,"c":"v. intrans.","psp":"ورځ","psf":"wărdz","ssp":"ورش","ssf":"wársh","prp":"ورغلل","prf":"wárghlul","pprtp":"ورغلی","pprtf":"wărghúley","tppp":"ورغی","tppf":"wărghey","noOo":true,"separationAtP":2,"separationAtF":3,"ec":"come,comes,coming,came,come"});
const tlul = vEntry({"ts":1527815348,"i":3791,"p":"تلل","f":"tlul","g":"tlul","e":"to go","r":4,"c":"v. intrans.","psp":"ځ","psf":"dz","ssp":"لاړ ش","ssf":"láaR sh","prp":"لاړ","prf":"láaR","ec":"go,goes,going,went,gone"});
const awuxtul = vEntry({"ts":1527814012,"i":1133,"p":"اوښتل","f":"awUxtul","g":"awUxtul","e":"to pass over, overturn, be flipped over, spill over, shift, change, diverge, pass, cross, abandon; to be sprained","r":4,"c":"v. intrans.","psp":"اوړ","psf":"awR","ec":"pass","ep":"over"});
const khorul = vEntry({"ts":1527812790,"i":6002,"p":"خوړل","f":"khoRul","g":"khoRul","e":"to eat, to bite","r":4,"c":"v. trans.","psp":"خور","psf":"khor","tppp":"خوړ","tppf":"khoR","ec":"eat,eats,eating,ate,eaten"});
const azmoyul = vEntry({"ts":1527811605,"i":468,"p":"ازمویل","f":"azmoyul","g":"azmoyul","e":"to attempt, try; to experiment, test","r":4,"c":"v. trans.","sepOo":true,"ec":"try"});
const khatul = vEntry({"ts":1527814025,"i":5677,"p":"ختل","f":"khatul","g":"khatul","e":"to climb, ascend, rise, go up; to fall out, to fall off, to leave/dissapear; to turn out to be ...; to give a sentence (in law)","r":3,"c":"v. intrans.","psp":"خېژ","psf":"khejz","tppp":"خوت","tppf":"khot","ec":"climb"});
const rasedul = vEntry({"ts":1527813573,"i":7057,"p":"رسېدل","f":"rasedul","g":"rasedul","e":"arrive, reach; (fig.) understand, attain to; mature, ripen","r":4,"c":"v. intrans.","shortIntrans":true,"ec":"arrive"});
const weshul = vEntry({"ts":1527811701,"i":15106,"p":"وېشل","f":"weshul","g":"weshul","e":"divide, distribute, share","r":4,"c":"v. trans.","ec":"divide"});

type RSO = ReturnType<typeof getRootStem>;
function getAllRs(verb: T.VerbEntry): (typeof regularVerbs)[0]["result"] {
    return {
        stem: {
            perfective: getRootStem({ verb, type: "basic", part: { rs: "stem", aspect: "perfective" }, person: undefined }),
            imperfective: getRootStem({ verb, type: "basic", part: { rs: "stem", aspect: "imperfective" }, person: undefined }),
        },
        root: {
            perfective: getRootStem({ verb, type: "basic", part: { rs: "root", aspect: "perfective" }, person: undefined }),
            imperfective: getRootStem({ verb, type: "basic", part: { rs: "root", aspect: "imperfective" }, person: undefined }),
        },
    };
}

const regularVerbs: {
    verb: T.VerbEntry,
    result: Record<"stem" | "root", {
        imperfective: RSO,
        perfective: RSO,
    }>
}[] = [
    {
        verb: weshul,
        result: {
            stem: {
                perfective: [
                    ooPrefix,
                    [{ p: "وېش", f: "wesh" }],
                ],
                imperfective: [
                    [{ p: "وېش", f: "wesh" }],
                ],
            },
            root: {
                perfective: [
                    ooPrefix,
                    {
                        long: [{ p: "وېشل", f: "weshul" }],
                        short: [{ p: "وېش", f: "wesh" }],
                    },
                ],
                imperfective: [
                    {
                        long: [{ p: "وېشل", f: "weshúl" }],
                        short: [{ p: "وېش", f: "weshX" }],
                    },
                ],
            },
        },
    },
    {
        verb: ganul,
        result: {
            stem: {
                perfective: [
                    ooPrefix,
                    [{ p: "ګڼ", f: "gaN" }],
                ],
                imperfective: [
                    [{ p: "ګڼ", f: "gaN" }],
                ],
            },
            root: {
                perfective: [
                    ooPrefix,
                    {
                        long: [{ p: "ګڼل", f: "gaNul" }],
                        short: [{ p: "ګڼ", f: "gaN" }],
                    },
                ],
                imperfective: [
                    {
                        long: [{ p: "ګڼل", f: "gaNúl" }],
                        short: [{ p: "ګڼ", f: "gaNX" }],
                    },
                ],
            },
        },
    },
];

const verbsWithIrregularStems: {
    verb: T.VerbEntry,
    result: Record<"stem" | "root", {
        imperfective: RSO,
        perfective: RSO,
    }>
}[] = [
    {
        verb: khorul,
        result: {
            stem: {
                perfective: [
                    ooPrefix,
                    [{ p: "خور", f: "khor" }],
                ],
                imperfective: [
                    [{ p: "خور", f: "khor" }],
                ],
            },
            root: {
                perfective: [
                    ooPrefix,
                    {
                        long: [{ p: "خوړل", f: "khoRul" }],
                        short: [{ p: "خوړ", f: "khoR" }],
                    },
                ],
                imperfective: [
                    {
                        long: [{ p: "خوړل", f: "khoRúl" }],
                        short: [{ p: "خوړ", f: "khoRX" }],
                    },
                ],
            },
        },
    },
    {
        verb: khatul,
        result: {
            stem: {
                perfective: [
                    ooPrefix,
                    [{ p: "خېژ", f: "khejz" }],
                ],
                imperfective: [
                    [{ p: "خېژ", f: "khejz" }],
                ],
            },
            root: {
                perfective: [
                    ooPrefix,
                    {
                        long: [{ p: "ختل", f: "khatul" }],
                        short: [{ p: "خت", f: "khat" }],
                    },
                ],
                imperfective: [
                    {
                        long: [{ p: "ختل", f: "khatúl" }],
                        short: [{ p: "خت", f: "khatX" }],
                    },
                ],
            },
        },
    },
];

test("basic roots and stems with regular verbs", () => {
    regularVerbs.forEach(({ verb, result }) => {
        expect(getAllRs(verb)).toEqual(result);
    });
});

test("baisc roots and stems with verbs with irregular stems", () => {
    verbsWithIrregularStems.forEach(({ verb, result }) => {
        expect(getAllRs(verb)).toEqual(result);
    });
});