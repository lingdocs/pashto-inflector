/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    getVerbInfo,
} from "./verb-info";

const toTest = [
    // simple verbs
    {
        entry: {"i":10996,"ts":1527812856,"p":"لیکل","f":"leekul","e":"to write","c":"v. trans."},
        result: {
            transitivity: "transitive",
            type: "simple",
            yulEnding: false,
            stem: {
                perfective: { p: "ولیک", f: "óoleek" },
                imperfective: { p: "لیک", f: "leek" },
                perfectiveSplit: [{p: "و", f: "óo"}, {p: "لیک", f: "leek"}]
            },
            root: {
                perfective: {
                    long: { p: "ولیکل", f: "óoleekul" },
                    short: { p: "ولیک", f: "óoleek" },
                },
                imperfective: {
                    long: { p: "لیکل", f: "leekúl" },
                    short: { p: "لیک", f: "leek" },
                },
                perfectiveSplit: {
                    long: [{p: "و", f: "óo"}, { p: "لیکل", f: "leekul" }],
                    short: [{p: "و", f: "óo"}, { p: "لیک", f: "leek" }],
                },
            },
            participle: {
                past: {
                    p: "لیکلی",
                    f: "leekúley",
                },
                present: {
                    p: "لیکونکی",
                    f: "leekóonkey",
                },
            },
        },
    },
    {
        entry: {"i":10243,"ts":1527812645,"p":"ګرځېدل","f":"gurdzedul","e":"to walk, wander, turn about; to become, to be","c":"v. intrans.","shortIntrans":true},
        result: {
            transitivity: "intransitive",
            type: "simple",
            yulEnding: false,
            stem: {
                perfective: {
                    short: { p: "وګرځ", f: "óogurdz" },
                    long: { p: "وګرځېږ", f: "óogurdzeG" },
                },
                imperfective: {
                    short: { p: "ګرځ", f: "gurdz" },
                    long: { p: "ګرځېږ", f: "gurdzéG" },
                },
                perfectiveSplit: {
                    short: [{ p: "و", f: "óo" }, { p: "ګرځ", f: "gurdz" }],
                    long: [{ p: "و", f: "óo" }, { p: "ګرځېږ", f: "gurdzeG" }],
                },
            },
            root: {
                perfective: {
                    short: { p: "وګرځېد", f: "óogurdzed" },
                    long: { p: "وګرځېدل", f: "óogurdzedul" },
                },
                imperfective: {
                    short: { p: "ګرځېد", f: "gurdzed" },
                    long: { p: "ګرځېدل", f: "gurdzedúl" },                    
                },
                perfectiveSplit: {
                    short: [{ p: "و", f: "óo" },{ p: "ګرځېد", f: "gurdzed" }],
                    long: [{ p: "و", f: "óo" },{ p: "ګرځېدل", f: "gurdzedul" }],
                },
            },
            participle: {
                past: {
                    p: "ګرځېدلی",
                    f: "gurdzedúley",
                },
                present: {
                    long: {
                        p: "ګرځېدونکی",
                        f: "gurdzedóonkey",
                    },
                    short: {
                        p: "ګرځونکی",
                        f: "gurdzóonkey",
                    },
                },
            },
        },
    },
    {
        entry: {"i":13664,"ts":1527823376,"p":"وتل","f":"watul","e":"to go out, exit, leave, emerge","c":"v. intrans. irreg.","psp":"وځ","psf":"oodz","tppp":"واته","tppf":"waatu"},
        result: {
            transitivity: "intransitive",
            type: "simple",
            yulEnding: false,
            stem: {
                perfective: { p: "ووځ", f: "wÚoodz" },
                imperfective: { p: "وځ", f: "oodz" },
                perfectiveSplit: [{ p: "و", f: "wÚ" }, { p: "وځ", f: "oodz" }],
            },
            root: {
                perfective: {
                    short: { p: "ووت", f: "óowat" },
                    long: { p: "ووتل", f: "óowatul" },
                },
                imperfective: {
                    short: { p: "وت", f: "wat" },
                    long: { p: "وتل", f: "watúl" },
                },
                perfectiveSplit: {
                    short: [{ p: "و", f: "óo" },{ p: "وت", f: "wat" }],
                    long: [{ p: "و", f: "óo" },{ p: "وتل", f: "watul" }],
                },
            },
            participle: {
                past: {
                    long: {
                        p: "وتلی",
                        f: "watúley",
                    },
                    short: {
                        p: "وتی",
                        f: "wátey",
                    },
                },
                present: {
                    long: {
                        p: "وتلونکی",
                        f: "watlóonkey",
                    },
                    short: {
                        p: "وتونکی",
                        f: "watóonkey",
                    },
                },
            },
            idiosyncraticThirdMascSing: {
                imperfective: { p: "واته", f: "waatu" },
                perfective: { p: "وواته", f: "óowaatu" },
            },
        },
    },
    {
        entry: {"i":13801,"ts":1527816865,"p":"وړل","f":"oRúl, wRul, wuRúl","e":"to take, carry, bear, move (inanimate objects); to win, earn (subjunctive یوسي - yósee or ویسي - wéesee, simple past یو یې وړلو - yo ye wRulo)","separationAtP":2,"separationAtF":2,"c":"v. trans. irreg.","ssp":"یوس","ssf":"yos","prp":"یوړل","prf":"yóRul","noOo":true,"diacExcept":true},
        result: {
            transitivity: "transitive",
            type: "simple",
            yulEnding: false,
            root: {
                perfective: {
                    short: { p: "یوړ", f: "yóR" },
                    long: { p: "یوړل", f: "yóRul" },
                },
                imperfective: {
                    short: { p: "وړ", f: "oR" },
                    long: { p: "وړل", f: "oRúl" },
                },
                perfectiveSplit: {
                    short: [{p: "یو", f: "yó"}, {p: "ړ", f: "R" }],
                    long: [{p: "یو", f: "yó"}, {p: "ړل", f: "Rul" }],
                },
            },
            stem: {
                perfective: {
                    p: "یوس",
                    f: "yos",
                },
                imperfective: {
                    p: "وړ",
                    f: "oR",
                },
                perfectiveSplit: [{p: "یو", f: "yó"}, {p:"س", f: "s"}],
            },
            participle: {
                past: {
                    short: {
                        p: "وړی",
                        f: "óRey",
                    },
                    long: {
                        p: "وړلی",
                        f: "oRúley",
                    },
                },
                present: {
                    p: "وړونکی",
                    f: "oRóonkey",
                },
            },
        },
    },
    {
        entry: {"i":13801,"ts":1527816865,"p":"وړل","f":"wRul, oRúl, wuRúl","e":"to take, carry, bear, move (inanimate objects); to win, earn (subjunctive یوسي - yósee or ویسي - wéesee, simple past یو یې وړلو - yo ye wRulo)","separationAtP":2,"separationAtF":2,"c":"v. trans. irreg.","ssp":"یوس","ssf":"yos","prp":"یوړل","prf":"yóRul","noOo":true,"diacExcept":true},
        result: {
            transitivity: "transitive",
            type: "simple",
            yulEnding: false,
            root: {
                perfective: {
                    short: { p: "یوړ", f: "yóR" },
                    long: { p: "یوړل", f: "yóRul" },
                },
                imperfective: {
                    short: { p: "وړ", f: "wR" },
                    long: { p: "وړل", f: "wRúl" },
                },
                perfectiveSplit: {
                    short: [{p: "یو", f: "yó"}, {p: "ړ", f: "R" }],
                    long: [{p: "یو", f: "yó"}, {p: "ړل", f: "Rul" }],
                },
            },
            stem: {
                perfective: {
                    p: "یوس",
                    f: "yos",
                },
                imperfective: {
                    p: "وړ",
                    f: "wR",
                },
                perfectiveSplit: [{p: "یو", f: "yó"}, {p:"س", f: "s"}],
            },
            participle: {
                past: {
                    short: {
                        p: "وړی",
                        f: "wúRey",
                    },
                    long: {
                        p: "وړلی",
                        f: "wRúley",
                    },
                },
                present: {
                    p: "وړونکی",
                    f: "wuRóonkey",
                },
            },
        },
    },
    {
        entry: {"i":6503,"ts":1527815214,"p":"راوړل","f":"raawRúl","e":"to bring, deliver (inanimate objects)","separationAtP":2,"separationAtF":3,"c":"v. trans. irreg.","noOo":true},
        result: {
            transitivity: "transitive",
            type: "simple",
            yulEnding: false,
            root: {
                perfective: {
                    short: { p: "راوړ", f: "ráawR" },
                    long: { p: "راوړل", f: "ráawRul" },
                },
                imperfective: {
                    short: { p: "راوړ", f: "raawR" },
                    long: { p: "راوړل", f: "raawRúl" },
                },
                perfectiveSplit: {
                    short: [{p: "را", f: "ráa"}, {p: "وړ", f: "wR" }],
                    long: [{p: "را", f: "ráa"}, {p: "وړل", f: "wRul" }],
                },
            },
            stem: {
                perfective: {
                    p: "راوړ",
                    f: "ráawR",
                },
                imperfective: {
                    p: "راوړ",
                    f: "raawR",
                },
                perfectiveSplit: [{p: "را", f: "ráa"}, {p:"وړ", f: "wR"}],
            },
            participle: {
                past: {
                    short: {
                        p: "راوړی",
                        f: "raawúRey",
                    },
                    long: {
                        p: "راوړلی",
                        f: "raawRúley",
                    },
                },
                present: {
                    p: "راوړونکی",
                    f: "raawRóonkey",
                },
            },
        },
    },
    {
        entry: {"i":5514,"ts":1527812790,"p":"خوړل","f":"khoRul","e":"to eat, to bite","c":"v. trans.","psp":"خور","psf":"khor","tppp":"خوړ","tppf":"khoR"},
        result: {
            transitivity: "transitive",
            type: "simple",
            yulEnding: false,
            root: {
                perfective: {
                    short: { p: "وخوړ", f: "óokhoR" },
                    long: { p: "وخوړل", f: "óokhoRul" },
                },
                imperfective: {
                    short: { p: "خوړ", f: "khoR" },
                    long: { p: "خوړل", f: "khoRúl" },                    
                },
                perfectiveSplit: {
                    short: [{ p: "و", f: "óo" },{ p: "خوړ", f: "khoR" }],
                    long: [{ p: "و", f: "óo" },{ p: "خوړل", f: "khoRul" }],
                },
            },
            stem: {
                perfective: {
                    p: "وخور",
                    f: "óokhor",
                },
                perfectiveSplit: [{ p: "و", f: "óo"}, {p: "خور", f: "khor"}],
                imperfective: {
                    p: "خور",
                    f: "khor",
                },
            },
            participle: {
                past: {
                    p: "خوړلی",
                    f: "khoRúley",
                },
                present: {
                    p: "خوړونکی",
                    f: "khoRóonkey",
                },
            },
            idiosyncraticThirdMascSing: {
                imperfective: { p: "خوړ", f: "khoR" },
                perfective: { p: "وخوړ", f: "óokhoR" },
            },
        },
    },
    {
        entry: {"i":1675,"ts":1527822381,"p":"بنګېدل","f":"bungedúl","e":"to buzz, hum, jingle; to snuffle, to speak nasally, or with a twang","c":"v. intrans."},
        result: {
            transitivity: "intransitive",
            type: "simple",
            yulEnding: false,
            root: {
                imperfective: {
                    short: { p: "بنګېد", f: "bunged" },
                    long: { p: "بنګېدل", f: "bungedúl" },
                },
                perfective: {
                    short: { p: "وبنګېد", f: "óobunged" },
                    long: { p: "وبنګېدل", f: "óobungedul" },
                },
                perfectiveSplit: {
                    long: [{ p: "و", f: "óo" },{ p: "بنګېدل", f: "bungedul" }],
                    short: [{ p: "و", f: "óo" },{ p: "بنګېد", f: "bunged" }],
                },
            },
            stem: {
                imperfective: {
                    p: "بنګېږ", f: "bungéG",
                },
                perfective: {
                    p: "وبنګېږ", f: "óobungeG",
                },
                perfectiveSplit: [{p: "و", f: "óo"},{ p:"بنګېږ", f: "bungeG"}],
            },
            participle: {
                past: {
                    p: "بنګېدلی",
                    f: "bungedúley",
                },
                present: {
                    p: "بنګېدونکی",
                    f: "bungedóonkey",
                },
            },
        },
    },
    {
        entry: {"i":10144,"ts":1527812759,"p":"کېناستل","f":"kenaastul","e":"to sit","separationAtP":2,"separationAtF":2,"c":"v. intrans. irreg.","psp":"کېن","psf":"ken","noOo":true},
        result: {
            transitivity: "intransitive",
            type: "simple",
            yulEnding: false,
            root: {
                imperfective: {
                    long: { p: "کېناستل", f: "kenaastúl" },
                    short: { p: "کېناست", f: "kenaast" },
                },
                perfective: {
                    long: { p: "کېناستل", f: "kénaastul" },
                    short: { p: "کېناست", f: "kénaast" },                    
                },
                perfectiveSplit: {
                    long: [{ p: "کې", f: "ké" },{ p: "ناستل", f: "naastul" }],
                    short: [{ p: "کې", f: "ké" },{ p: "ناست", f: "naast" }],
                },
            },
            stem: {
                imperfective: {
                    p: "کېن", f: "ken",
                },
                perfective: {
                    p: "کېن", f: "kén",
                },
                perfectiveSplit: [{p: "کې", f: "ké"}, {p: "ن", f: "n"}],
            },
            participle: {
                past: {
                    p: "کېناستلی",
                    f: "kenaastúley",
                },
                present: {
                    p: "کېناستونکی",
                    f: "kenaastóonkey",
                },
            },
        },
    },
    {
        entry: {"i":445,"ts":1527811605,"p":"ازمویل","f":"azmoyul","e":"to attempt, try; to experiment, test","c":"v. trans.","sepOo":true},
        result: {
            transitivity: "transitive",
            type: "simple",
            yulEnding: true,
            root: {
                imperfective: {
                    long: { p: "ازمویل", f: "azmóyul" },
                    short: { p: "ازموی", f: "azmoy" },
                },
                perfective: {
                    long: { p: "و ازمویل", f: "óo`azmoyul" },
                    short: { p: "و ازموی", f: "óo`azmoy" },
                },
                perfectiveSplit: {
                    long: [{ p: "و", f: "óo" }, { p: "ازمویل", f: "azmoyul" }],
                    short: [{ p: "و", f: "óo" }, { p: "ازموی", f: "azmoy" }],
                }
            },
            stem: {
                imperfective: { p: "ازموی", f: "azmoy" },
                perfective: { p: "و ازموی", f: "óo`azmoy" },
                perfectiveSplit: [{ p: "و", f: "óo" }, { p: "ازموی", f: "azmoy" }],
            },
            participle: {
                past: { p: "ازمویلی", f: "azmóyuley" },
                present: { p: "ازمویونکی", f: "azmoyóonkey" },
            },
        },
    },
    {
        entry: {"i":8896,"ts":1527812627,"p":"غوښتل","f":"ghwuxtul, ghoxtul","e":"to want, to request","c":"v. trans.","psp":"غواړ","psf":"ghwaaR"},
        result: {
            transitivity: "transitive",
            type: "simple",
            yulEnding: false,
            root: {
                imperfective: {
                    long: { p: "غوښتل", f: "ghwuxtúl" },
                    short: { p: "غوښت", f: "ghwuxt" },
                },
                perfective: {
                    long: { p: "وغوښتل", f: "óoghwuxtul" },
                    short: { p: "وغوښت", f: "óoghwuxt" },
                },
                perfectiveSplit: {
                    long: [{ p: "و", f: "óo" }, { p: "غوښتل", f: "ghwuxtul" }],
                    short: [{ p: "و", f: "óo" }, { p: "غوښت", f: "ghwuxt" }],
                },
            },
            stem: {
                imperfective: { p: "غواړ", f: "ghwaaR" },
                perfective: { p: "وغواړ", f: "óoghwaaR" },
                perfectiveSplit: [{ p: "و", f: "óo" }, { p: "غواړ", f: "ghwaaR" }],
            },
            participle: {
                past: {
                    long: { p: "غوښتلی", f: "ghwuxtúley" },
                    short: { p: "غوښتی", f: "ghwúxtey" },
                },
                present: {
                    p: "غوښتونکی", f: "ghwuxtóonkey",
                },
            },
        },
    },
    {
        entry: {"i":300,"ts":1527817298,"p":"اخیستل","f":"akheestul","e":"to take, buy, purchase, receive; to shave, cut with scissors","c":"v. trans.","psp":"اخل","psf":"akhl"}, 
        result: {
            transitivity: "transitive",
            type: "simple",
            yulEnding: false,
            root: {
                imperfective: {
                    long: { p: "اخیستل", f: "akheestúl" },
                    short: { p: "اخیست", f: "akheest" },
                },
                perfective: {
                    long: { p: "واخیستل", f: "wáakheestul" },
                    short: { p: "واخیست", f: "wáakheest" },
                },
                perfectiveSplit: {
                    long: [{ p: "وا", f: "wáa" }, { p: "خیستل", f: "kheestul" }],
                    short: [{ p: "وا", f: "wáa" }, { p: "خیست", f: "kheest" }],
                },
            },
            stem: {
                imperfective: { p: "اخل", f: "akhl" },
                perfective: { p: "واخل", f: "wáakhl" },
                perfectiveSplit: [{ p: "وا", f: "wáa" }, {p: "خل", f: "khl"}],
            },
            participle: {
                past: {
                    long: { p: "اخیستلی", f: "akheestúley" },
                    short: { p: "اخیستی", f: "akhéestey" },
                },
                present: {
                    p: "اخیستونکی", f: "akheestóonkey",
                },
            },
        },
    },
    {
        entry: {"i":300,"ts":1527817299,"p":"آخیستل","f":"aakheestul","e":"to take, buy, purchase, receive; to shave, cut with scissors","c":"v. trans.","psp":"اخل","psf":"akhl"}, 
        result: {
            transitivity: "transitive",
            type: "simple",
            yulEnding: false,
            root: {
                imperfective: {
                    long: { p: "آخیستل", f: "aakheestúl" },
                    short: { p: "آخیست", f: "aakheest" },
                },
                perfective: {
                    long: { p: "واخیستل", f: "wáakheestul" },
                    short: { p: "واخیست", f: "wáakheest" },
                },
                perfectiveSplit: {
                    long: [{ p: "وا", f: "wáa" }, { p: "خیستل", f: "kheestul" }],
                    short: [{ p: "وا", f: "wáa" }, { p: "خیست", f: "kheest" }],
                },
            },
            stem: {
                imperfective: { p: "اخل", f: "akhl" },
                perfective: { p: "واخل", f: "wáakhl" },
                perfectiveSplit: [{ p: "وا", f: "wáa" }, { p: "خل", f: "khl" }],
            },
            participle: {
                past: {
                    long: { p: "آخیستلی", f: "aakheestúley" },
                    short: { p: "آخیستی", f: "aakhéestey" },
                },
                present: {
                    p: "آخیستونکی", f: "aakheestóonkey",
                },
            },
        },
    },
    // TODO: IS THE SPLIT HERE CORRECT??
    {
        entry: {"i":1105,"ts":1527816146,"p":"ایستل","f":"eestul","e":"to throw out, discard, chuck, toss; to extract, to take out","c":"v. trans.","psp":"باس","psf":"baas"},
        result: {
            transitivity: "transitive",
            type: "simple",
            yulEnding: false,
            root: {
                imperfective: {
                    long: { p: "ایستل", f: "eestúl" },
                    short: { p: "ایست", f: "eest" },
                },
                perfective: {
                    long: { p: "ویستل", f: "wéestul" },
                    short: { p: "ویست", f: "wéest" },
                },
                perfectiveSplit: {
                    long: [{ p: "وی", f: "wée" }, { p: "ستل", f: "stul" }],
                    short: [{ p: "وی", f: "wée" }, { p: "ست", f: "st" }],
                },
            },
            stem: {
                imperfective: { p: "باس", f: "baas" },
                perfective: { p: "وباس", f: "óobaas" },
                perfectiveSplit: [{ p: "و", f: "óo" }, { p: "باس", f: "baas" }],
            },
            participle: {
                past: {
                    long: { p: "ایستلی", f: "eestúley" },
                    short: { p: "ایستی", f: "éestey" },
                },
                present: {
                    p: "ایستونکی", f: "eestóonkey",
                },
            },
        },
    },
    {
        entry: {"i":1106,"ts":1596485537794,"p":"اېستل","f":"estul","e":"to throw out, discard, chuck, toss; to extract, to take out","c":"v. trans.","psp":"باس","psf":"baas"},
        result: {
            transitivity: "transitive",
            type: "simple",
            yulEnding: false,
            root: {
                imperfective: {
                    long: { p: "اېستل", f: "estúl" },
                    short: { p: "اېست", f: "est" },
                },
                perfective: {
                    long: { p: "وېستل", f: "wéstul" },
                    short: { p: "وېست", f: "wést" },
                },
                perfectiveSplit: {
                    long: [{ p: "وې", f: "wé" }, { p: "ستل", f: "stul" }],
                    short: [{ p: "وې", f: "wé" }, { p: "ست", f: "st" }],
                },
            },
            stem: {
                imperfective: { p: "باس", f: "baas" },
                perfective: { p: "وباس", f: "óobaas" },
                perfectiveSplit: [{ p: "و", f: "óo" }, { p: "باس", f: "baas" }],
            },
            participle: {
                past: {
                    long: { p: "اېستلی", f: "estúley" },
                    short: { p: "اېستی", f: "éstey" },
                },
                present: { p: "اېستونکی", f: "estóonkey" },
            },
        },
    },
    {
        entry: {"i":2766,"ts":1527815165,"p":"پېژندل","f":"pejzandul","e":"to recognize, know, meet","c":"v. trans.","psp":"پېژن","psf":"pejzan","tppp":"پېژاند","tppf":"pejzaand"},
        result: {
            transitivity: "transitive",
            type: "simple",
            yulEnding: false,
            root: {
                imperfective: {
                    long: { p: "پېژندل", f: "pejzandúl" },
                    short: { p: "پېژند", f: "pejzand" },
                },
                perfective: {
                    long: { p: "وپېژندل", f: "óopejzandul" },
                    short: { p: "وپېژند", f: "óopejzand" },
                },
                perfectiveSplit: {
                    long: [{ p: "و", f: "óo" }, { p: "پېژندل", f: "pejzandul" }],
                    short: [{ p: "و", f: "óo" }, { p: "پېژند", f: "pejzand" }],
                },
            },
            stem: {
                imperfective: { p: "پېژن", f: "pejzan" },
                perfective: { p: "وپېژن", f: "óopejzan" },
                perfectiveSplit: [{ p: "و", f: "óo" }, { p: "پېژن", f: "pejzan" }],
            },
            participle: {
                past: { p: "پېژندلی", f: "pejzandúley" },
                present: { p: "پېژندونکی", f: "pejzandóonkey" },
            },
            idiosyncraticThirdMascSing: {
                imperfective: { p: "پېژاند", f: "pejzaand" },
                perfective: { p: "وپېژاند", f: "óopejzaand" },
            },
        },
    },
    {
        entry: {"i":5413,"ts":1527812767,"p":"خندل","f":"khandul","e":"to laugh","c":"v. gramm. trans.","psp":"خاند","psf":"khaand"},
        result: {
            transitivity: "grammatically transitive",
            type: "simple",
            yulEnding: false,
            root: {
                imperfective: {
                    long: { p: "خندل", f: "khandúl" },
                    short: { p: "خند", f: "khand" },
                },
                perfective: {
                    long: { p: "وخندل", f: "óokhandul" },
                    short: { p: "وخند", f: "óokhand" },
                },
                perfectiveSplit: {
                    long: [{ p: "و", f: "óo" }, { p: "خندل", f: "khandul" }],
                    short: [{ p: "و", f: "óo" }, { p: "خند", f: "khand" }],
                },
            },
            stem: {
                imperfective: { p: "خاند", f: "khaand" },
                perfective: { p: "وخاند", f: "óokhaand" },
                perfectiveSplit: [{ p: "و", f: "óo" }, { p: "خاند", f: "khaand" }],
            },
            participle: {
                past: { p: "خندلی", f: "khandúley" },
                present: { p: "خندونکی", f: "khandóonkey" },
            },
        },
    },
    // stative compounds
    {
        entry: {"i":5367,"ts":1577898915919,"p":"خفه کول","f":"khufa kawul","e":"to make sad, to grieve, to annoy; to choke, to make suffocate","l":1527812798,"c":"v. stat. comp. trans."},
        complement: {"i":5366,"ts":1527812798,"p":"خفه","f":"khufa","e":"sad, upset, angry; choked, suffocated","c":"adj."},
        result: {
            transitivity: "transitive",
            type: "stative compound",
            yulEnding: false,
            root: {
                imperfective: {
                    long: { p: "خفه کول", f: "khufa kawúl" },
                    short: { p: "خفه کو", f: "khufa kaw" },
                },
                perfective: {
                    long: { p: "خفه کړل", f: "khufa kRul" },
                    short: { p: "خفه کړ", f: "khufa kR" },
                    mini: { p: "خفه ک", f: "khufa k" },
                },
                perfectiveSplit: {
                    long: [{ p: "خفه ", f: "khufa " }, { p: "کړل", f: "kRul" }],
                    short: [{ p: "خفه ", f: "khufa " }, { p: "کړ", f: "kR" }],
                    mini: [{ p: "خفه ", f: "khufa " }, { p: "ک", f: "k" }],
                },
            },
            stem: {
                imperfective: { p: "خفه کو", f: "khufa kaw" },
                perfective: {
                    long: { p: "خفه کړ", f: "khufa kR" },
                    short: { p: "خفه ک", f: "khufa k" },
                },
                perfectiveSplit: {
                    long: [{ p: "خفه ", f: "khufa " }, { p: "کړ", f: "kR" }],
                    short: [{ p: "خفه ", f: "khufa " }, { p: "ک", f: "k" }],
                },
            },
            participle: {
                past: { p: "خفه کړی", f: "khufa kúRey" },
                present: { p: "خفه کوونکی", f: "khufa kawóonkey" },
            },
            complement: {
                masc: [
                    [{ p: "خفه", f: "khufa" }],
                    [{ p: "خفه", f: "khufa" }],
                    [{ p: "خفه", f: "khufa" }],
                ],
                fem: [
                    [{ p: "خفه", f: "khufa" }],
                    [{ p: "خفه", f: "khufa" }],
                    [{ p: "خفه", f: "khufa" }],
                ],
            },
        },
    },
    {
        entry: {"i":5368,"ts":1577898920635,"p":"خفه کېدل","f":"khufa kedul","e":"to be sad, grieved, annoyed, upset; to be choked, to suffocate","l":1527812798,"c":"v. stat. comp. intrans."},
        complement: {"i":5366,"ts":1527812798,"p":"خفه","f":"khufa","e":"sad, upset, angry; choked, suffocated","c":"adj."},
        result: {
            transitivity: "intransitive",
            type: "stative compound",
            yulEnding: false,
            root: {
                imperfective: {
                    long: { p: "خفه کېدل", f: "khufa kedúl" },
                    short: { p: "خفه کېد", f: "khufa ked" },
                },
                perfective: {
                    long: { p: "خفه شول", f: "khufa shwul" },
                    short: { p: "خفه شو", f: "khufa shw" },
                },
                perfectiveSplit: {
                    long: [{ p: "خفه ", f: "khufa " }, { p: "شول", f: "shwul" }],
                    short: [{ p: "خفه ", f: "khufa " }, { p: "شو", f: "shw" }],
                },
            },
            stem: {
                imperfective: { p: "خفه کېږ", f: "khufa kéG" },
                perfective: { p: "خفه ش", f: "khufa sh" },
                perfectiveSplit: [{ p: "خفه ", f: "khufa " }, { p: "ش", f: "sh" }],
            },
            participle: {
                past: { p: "خفه شوی", f: "khufa shúwey" },
                present: { p: "خفه کېدونکی", f: "khufa kedóonkey" },
            },
            complement: {
                masc: [
                    [{ p: "خفه", f: "khufa" }],
                    [{ p: "خفه", f: "khufa" }],
                    [{ p: "خفه", f: "khufa" }],
                ],
                fem: [
                    [{ p: "خفه", f: "khufa" }],
                    [{ p: "خفه", f: "khufa" }],
                    [{ p: "خفه", f: "khufa" }],
                ],
            },
        },
    },
    {
        entry: {"i":2182,"ts":1571859113828,"p":"پخول","f":"pakhawul","e":"to cook, prepare, to cause to ripen, mature","l":1574867531681,"c":"v. stat. comp. trans."},
        complement: {"i":2610,"ts":1574867531681,"p":"پوخ","f":"pokh","e":"mature, ripe, ready, cooked, able, skillful, experienced, tried, tested, true","c":"adj. irreg.","infap":"پاخه","infaf":"paakhu","infbp":"پخ","infbf":"pakh"},
        result: {
            transitivity: "transitive",
            type: "stative compound",
            yulEnding: false,
            root: {
                imperfective: {
                    long: { p: "پخول", f: "pakhawúl" },
                    short: { p: "پخو", f: "pakhaw" },
                },
                perfective: {
                    mascSing: {
                        long: { p: "پوخ کړل", f: "pokh kRul" },
                        short: { p: "پوخ کړ", f: "pokh kR" },
                        mini: { p: "پوخ ک", f: "pokh k" },
                    },
                    mascPlur: {
                        long: { p: "پاخه کړل", f: "paakhu kRul" },
                        short: { p: "پاخه کړ", f: "paakhu kR" },
                        mini: { p: "پاخه ک", f: "paakhu k" },
                    },
                    femSing: {
                        long: { p: "پخه کړل", f: "pakha kRul" },
                        short: { p: "پخه کړ", f: "pakha kR" },
                        mini: { p: "پخه ک", f: "pakha k" },
                    },
                    femPlur: {
                        long: { p: "پخې کړل", f: "pakhe kRul" },
                        short: { p: "پخې کړ", f: "pakhe kR" },
                        mini: { p: "پخې ک", f: "pakhe k" },
                    },
                },
                perfectiveSplit: {
                    mascSing: {
                        long: [{ p: "پوخ ", f: "pokh " }, { p: "کړل", f: "kRul" }],
                        short: [{ p: "پوخ ", f: "pokh " }, { p: "کړ", f: "kR" }],
                        mini: [{ p: "پوخ ", f: "pokh " }, { p: "ک", f: "k" }],
                    },
                    mascPlur: {
                        long: [{ p: "پاخه ", f: "paakhu " }, { p: "کړل", f: "kRul" }],
                        short: [{ p: "پاخه ", f: "paakhu " }, { p: "کړ", f: "kR" }],
                        mini: [{ p: "پاخه ", f: "paakhu " }, { p: "ک", f: "k" }],
                    },
                    femSing: {
                        long: [{ p: "پخه ", f: "pakha " }, { p: "کړل", f: "kRul" }],
                        short: [{ p: "پخه ", f: "pakha " }, { p: "کړ", f: "kR" }],
                        mini: [{ p: "پخه ", f: "pakha " }, { p: "ک", f: "k" }],
                    },
                    femPlur: {
                        long: [{ p: "پخې ", f: "pakhe " }, { p: "کړل", f: "kRul" }],
                        short: [{ p: "پخې ", f: "pakhe " }, { p: "کړ", f: "kR" }],
                        mini: [{ p: "پخې ", f: "pakhe " }, { p: "ک", f: "k" }],
                    },
                },
            },
            stem: {
                imperfective: { p: "پخو", f: "pakhaw" },
                perfective: {
                    mascSing: {
                        long: { p: "پوخ کړ", f: "pokh kR" },
                        short: { p: "پوخ ک", f: "pokh k" },
                    },
                    mascPlur: {
                        long: { p: "پاخه کړ", f: "paakhu kR" },
                        short: { p: "پاخه ک", f: "paakhu k" },
                    },
                    femSing: {
                        long: { p: "پخه کړ", f: "pakha kR" },
                        short: { p: "پخه ک", f: "pakha k" },
                    },
                    femPlur: {
                        long: { p: "پخې کړ", f: "pakhe kR" },
                        short: { p: "پخې ک", f: "pakhe k" },
                    },
                },
                perfectiveSplit: {
                    mascSing: {
                        long: [{ p: "پوخ ", f: "pokh " }, { p: "کړ", f: "kR" }],
                        short: [{ p: "پوخ ", f: "pokh " }, { p: "ک", f: "k" }],
                    },
                    mascPlur: {
                        long: [{ p: "پاخه ", f: "paakhu " }, { p: "کړ", f: "kR" }],
                        short: [{ p: "پاخه ", f: "paakhu " }, { p: "ک", f: "k" }],
                    },
                    femSing: {
                        long: [{ p: "پخه ", f: "pakha " }, { p: "کړ", f: "kR" }],
                        short: [{ p: "پخه ", f: "pakha " }, { p: "ک", f: "k" }],
                    },
                    femPlur: {
                        long: [{ p: "پخې ", f: "pakhe " }, { p: "کړ", f: "kR" }],
                        short: [{ p: "پخې ", f: "pakhe " }, { p: "ک", f: "k" }],
                    },
                },
            },
            participle: {
                present: { p: "پخوونکی", f: "pakhawóonkey" },
                past: {
                    mascSing: { p: "پوخ کړی", f: "pokh kúRey" },
                    mascPlur: { p: "پاخه کړي", f: "paakhu kúRee" },
                    femSing: { p: "پخه کړې", f: "pakha kúRe" },
                    femPlur: { p: "پخې کړې", f: "pakhe kúRe" },
                },
            },
            complement: {
                masc: [
                    [{ p: "پوخ", f: "pokh" }],
                    [{ p: "پاخه", f: "paakhu" }],
                    [{ p: "پخو", f: "pakho" }],
                ],
                fem: [
                    [{ p: "پخه", f: "pakha" }],
                    [{ p: "پخې", f: "pakhe" }],
                    [{ p: "پخو", f: "pakho" }],
                ],
            },
        },
    },
    {
        entry: {"i":7205,"ts":1591033069786,"p":"ستړی کېدل","f":"stuRey kedul","e":"to get tired, fatigued","l":1527815306,"c":"v. stat. comp. intrans."},
        complement: {"i":7204,"ts":1527815306,"p":"ستړی","f":"stúRey","e":"tired","c":"adj."},
        result: {
            transitivity: "intransitive",
            type: "stative compound",
            yulEnding: false,
            root: {
                imperfective: {
                    mascSing: {
                        long: { p: "ستړی کېدل", f: "stúRey kedúl" },
                        short: { p: "ستړی کېد", f: "stúRey ked" },
                    },
                    mascPlur: {
                        long: { p: "ستړي کېدل", f: "stúRee kedúl" },
                        short: { p: "ستړي کېد", f: "stúRee ked" },
                    },
                    femSing: {
                        long: { p: "ستړې کېدل", f: "stúRe kedúl" },
                        short: { p: "ستړې کېد", f: "stúRe ked" },
                    },
                    femPlur: {
                        long: { p: "ستړې کېدل", f: "stúRe kedúl" },
                        short: { p: "ستړې کېد", f: "stúRe ked" },
                    },
                },
                perfective: {
                    mascSing: {
                        long: { p: "ستړی شول", f: "stúRey shwul" },
                        short: { p: "ستړی شو", f: "stúRey shw" },
                    },
                    mascPlur: {
                        long: { p: "ستړي شول", f: "stúRee shwul" },
                        short: { p: "ستړي شو", f: "stúRee shw" },
                    },
                    femSing: {
                        long: { p: "ستړې شول", f: "stúRe shwul" },
                        short: { p: "ستړې شو", f: "stúRe shw" },
                    },
                    femPlur: {
                        long: { p: "ستړې شول", f: "stúRe shwul" },
                        short: { p: "ستړې شو", f: "stúRe shw" },
                    },
                },
                perfectiveSplit: {
                    mascSing: {
                        long: [{ p: "ستړی ", f: "stúRey " }, { p: "شول", f: "shwul" }],
                        short: [{ p: "ستړی ", f: "stúRey " }, { p: "شو", f: "shw" }],
                    },
                    mascPlur: {
                        long: [{ p: "ستړي ", f: "stúRee " }, { p: "شول", f: "shwul" }],
                        short: [{ p: "ستړي ", f: "stúRee " }, { p: "شو", f: "shw" }],
                    },
                    femSing: {
                        long: [{ p: "ستړې ", f: "stúRe " }, { p: "شول", f: "shwul" }],
                        short: [{ p: "ستړې ", f: "stúRe " }, { p: "شو", f: "shw" }],
                    },
                    femPlur: {
                        long: [{ p: "ستړې ", f: "stúRe " }, { p: "شول", f: "shwul" }],
                        short: [{ p: "ستړې ", f: "stúRe " }, { p: "شو", f: "shw" }],
                    },
                },
            },
            stem: {
                imperfective: {
                    mascSing: { p: "ستړی کېږ", f: "stúRey kéG" },
                    mascPlur: { p: "ستړي کېږ", f: "stúRee kéG" },
                    femSing: { p: "ستړې کېږ", f: "stúRe kéG" },
                    femPlur: { p: "ستړې کېږ", f: "stúRe kéG" },
                },
                perfective: {
                    mascSing: { p: "ستړی ش", f: "stúRey sh" },
                    mascPlur: { p: "ستړي ش", f: "stúRee sh" },
                    femSing: { p: "ستړې ش", f: "stúRe sh" },
                    femPlur: { p: "ستړې ش", f: "stúRe sh" },
                },
                perfectiveSplit: {
                    mascSing: [{ p: "ستړی ", f: "stúRey " }, { p: "ش", f: "sh" }],
                    mascPlur: [{ p: "ستړي ", f: "stúRee " }, { p: "ش", f: "sh" }],
                    femSing: [{ p: "ستړې ", f: "stúRe " }, { p: "ش", f: "sh" }],
                    femPlur: [{ p: "ستړې ", f: "stúRe " }, { p: "ش", f: "sh" }],
                },
            },
            participle: {
                present: {
                    mascSing: { p: "ستړی کېدونکی", f: "stúRey kedóonkey" },
                    mascPlur: { p: "ستړي کېدونکي", f: "stúRee kedóonkee" },
                    femSing: { p: "ستړې کېدونکې", f: "stúRe kedóonke" },
                    femPlur: { p: "ستړې کېدونکې", f: "stúRe kedóonke" },
                },
                past: {
                    mascSing: { p: "ستړی شوی", f: "stúRey shúwey" },
                    mascPlur: { p: "ستړي شوي", f: "stúRee shúwee" },
                    femSing: { p: "ستړې شوې", f: "stúRe shúwe" },
                    femPlur: { p: "ستړې شوې", f: "stúRe shúwe" },
                },
            },
            complement: {
                masc: [
                    [{ p: "ستړی", f: "stúRey" }],
                    [{ p: "ستړي", f: "stúRee" }],
                    [{ p: "ستړیو", f: "stúRiyo" }, { p: "ستړو", f: "stúRo" }],
                ],
                fem: [
                    [{ p: "ستړې", f: "stúRe" }],
                    [{ p: "ستړې", f: "stúRe" }],
                    [{ p: "ستړو", f: "stúRo" }],
                ],
            },
        },
    },
    {
        entry: {"i":1895,"ts":1527812277,"p":"بیانول","f":"bayaanawul","e":"to describe, tell, explain, narrate","l":1527814259,"c":"v. stat. comp. trans."},
        complement: {"i":1893,"ts":1527814259,"p":"بیان","f":"bayaan","e":"description, statement, speaking, narration, sermon","c":"n. m.","app":"بیانات","apf":"bayaanaat"},
        result: {
            transitivity: "transitive",
            type: "stative compound",
            yulEnding: false,
            root: {
                imperfective: {
                    long: { p: "بیانول", f: "bayaanawúl" },
                    short: { p: "بیانو", f: "bayaanaw" },
                },
                perfective: {
                    long: { p: "بیان کړل", f: "bayaan kRul" },
                    short: { p: "بیان کړ", f: "bayaan kR" },
                    mini: { p: "بیان ک", f: "bayaan k" },
                },
                perfectiveSplit: {
                    long: [{ p: "بیان ", f: "bayaan " }, { p: "کړل", f: "kRul" }],
                    short: [{ p: "بیان ", f: "bayaan " }, { p: "کړ", f: "kR" }],
                    mini: [{ p: "بیان ", f: "bayaan " }, { p: "ک", f: "k" }],
                },
            },
            stem: {
                imperfective: { p: "بیانو", f: "bayaanaw" },
                perfective: {
                    long: { p: "بیان کړ", f: "bayaan kR" },
                    short: { p: "بیان ک", f: "bayaan k" },
                },
                perfectiveSplit: {
                    long: [{ p: "بیان ", f: "bayaan " }, { p: "کړ", f: "kR" }],
                    short: [{ p: "بیان ", f: "bayaan " }, { p: "ک", f: "k" }],
                },
            },
            participle: {
                past: { p: "بیان کړی", f: "bayaan kúRey" },
                present: { p: "بیانوونکی", f: "bayaanawóonkey" },
            },
            complement: {
                masc: [
                    [{ p: "بیان", f: "bayaan" }],
                    [{ p: "بیان", f: "bayaan" }],
                    [{ p: "بیان", f: "bayaan" }],
                ],
                fem: [
                    [{ p: "بیان", f: "bayaan" }],
                    [{ p: "بیان", f: "bayaan" }],
                    [{ p: "بیان", f: "bayaan" }],
                ],
            },
        },
    },
    {
        entry: {"i":1068,"ts":1527815139,"p":"اوسېدل","f":"osedul","e":"to live, reside, stay, be","c":"v. intrans.","shortIntrans":true,"diacExcept":true},
        result: {
            transitivity: "intransitive",
            type: "simple",
            yulEnding: false,
            stem: {
                perfective: {
                    long: { p: "واوسېږ", f: "óo`oseG" },
                    short: { p: "واوس", f: "óo`os" },
                },
                perfectiveSplit: {
                    long: [{ p: "و", f: "óo" }, { p: "اوسېږ", f: "oseG" }],
                    short: [{ p: "و", f: "óo" }, { p: "اوس", f: "os" }],
                },
                imperfective: {
                    long: { p: "اوسېږ", f: "oséG" },
                    short: { p: "اوس", f: "os" },
                },
            },
            root: {
                perfective: {
                    long: { p: "واوسېدل", f: "óo`osedul" },
                    short: { p: "واوسېد", f: "óo`osed" },
                },
                perfectiveSplit: {
                    long: [{ p: "و", f: "óo" }, { p: "اوسېدل", f: "osedul" }],
                    short: [{ p: "و", f: "óo" }, { p: "اوسېد", f: "osed" }],
                },
                imperfective: {
                    long: { p: "اوسېدل", f: "osedúl" },
                    short: { p: "اوسېد", f: "osed" },
                },
            },
            participle: {
                past: {
                    p: "اوسېدلی",
                    f: "osedúley",
                },
                present: {
                    p: "اوسېدونکی",
                    f: "osedóonkey",
                },
            },
        },
    },
    {
        entry: {"i":2058,"ts":1527814038,"p":"پاڅېدل","f":"paatsedul","e":"to get up, rise, wake up","c":"v. intrans.","separationAtP":2,"separationAtF":3,"shortIntrans":true,"noOo":true},
        result: {
            transitivity: "intransitive",
            type: "simple",
            yulEnding: false,
            stem: {
                perfective: {
                    long: { p: "پاڅېږ", f: "páatseG" },
                    short: { p: "پاڅ", f: "páats" },
                },
                imperfective: {
                    long: { p: "پاڅېږ", f: "paatséG" },
                    short: { p: "پاڅ", f: "paats" },
                },
                perfectiveSplit: {
                    long: [{ p: "پا", f: "páa" }, { p: "څېږ", f: "tseG" }],
                    short: [{ p: "پا", f: "páa" }, { p: "څ", f: "ts" }],
                },
            },
            root: {
                perfective: {
                    long: { p: "پاڅېدل", f: "páatsedul" },
                    short: { p: "پاڅېد", f: "páatsed" },
                },
                imperfective: {
                    long: { p: "پاڅېدل", f: "paatsedúl" },
                    short: { p: "پاڅېد", f: "paatsed" },
                },
                perfectiveSplit: {
                    long: [{ p: "پا", f: "páa" }, { p: "څېدل", f: "tsedul" }],
                    short: [{ p: "پا", f: "páa" }, { p: "څېد", f: "tsed" }],
                },
            },
            participle: {
                past: { p: "پاڅېدلی", f: "paatsedúley" },
                present: {
                    long: { p: "پاڅېدونکی", f: "paatsedóonkey" },
                    short: { p: "پاڅونکی", f: "paatsóonkey" },
                },
            },
        },
    },
    // auxilary kawul/kedul verbs
    {
        entry: {"i":10246,"ts":1527812752,"p":"کول","f":"kawul","e":"to do (an action or activity)","c":"v. trans. irreg. dyn. aux.","ssp":"وکړ","ssf":"óokR","prp":"وکړل","prf":"óokRul","pprtp":"کړی","pprtf":"kúRey","diacExcept":true},
        result: {
            transitivity: "transitive",
            type: "simple",
            yulEnding: false,
            stem: {
                perfective: {
                    long: { p: "وکړ", f: "óokR" },
                    short: { p: "وک", f: "óok" },
                },
                perfectiveSplit: {
                    long: [{ p: "و", f: "óo" }, { p: "کړ", f: "kR" }],
                    short: [{ p: "و", f: "óo" }, { p: "ک", f: "k" }],
                },
                imperfective: { p: "کو", f: "kaw" },
            },
            root: {
                perfective: {
                    long: { p: "وکړل", f: "óokRul" },
                    short: { p: "وکړ", f: "óokR" },
                    mini: { p: "وک", f: "óok" },
                },
                perfectiveSplit: {
                    long: [{ p: "و", f: "óo" }, { p: "کړل", f: "kRul" }],
                    short: [{ p: "و", f: "óo" }, { p: "کړ", f: "kR" }],
                    mini: [{ p: "و", f: "óo" }, { p: "ک", f: "k" }],
                },
                imperfective: {
                    long: { p: "کول", f: "kawúl" },
                    short: { p: "کو", f: "kaw" },
                },
            },
            participle: {
                past: {
                    p: "کړی",
                    f: "kúRey",
                },
                present: {
                    p: "کوونکی",
                    f: "kawóonkey",
                },
            },
        },
    },
    {
        entry: {"i":10059,"ts":1579015359582,"p":"کول","f":"kawul","e":"to make ____ ____ (as in \"He's making me angry.\")","c":"v. trans. irreg. stat. aux.","ssp":"کړ","ssf":"kR","prp":"کړل","prf":"kRul","pprtp":"کړی","pprtf":"kúRey","noOo":true},
        result: {
            transitivity: "transitive",
            type: "simple",
            yulEnding: false,
            stem: {
                perfective: {
                    long: { p: "کړ", f: "kR" },
                    short: { p: "ک", f: "k" },
                },
                imperfective: { p: "کو", f: "kaw" },
            },
            root: {
                perfective: {
                    long: { p: "کړل", f: "kRul" },
                    short: { p: "کړ", f: "kR" },
                    mini: { p: "ک", f: "k" },
                },
                imperfective: {
                    long: { p: "کول", f: "kawúl" },
                    short: { p: "کو", f: "kaw" },
                },
            },
            participle: {
                past: {
                    p: "کړی",
                    f: "kúRey",
                },
                present: {
                    p: "کوونکی",
                    f: "kawóonkey",
                },
            },
        },
    },
    {
        entry: {"i":10124,"ts":1581086654898,"p":"کېدل","f":"kedul","e":"to become _____","c":"v. intrans. irreg. aux. stat.","ssp":"ش","ssf":"sh","prp":"شول","prf":"shwul","pprtp":"شوی","pprtf":"shúwey","noOo":true},
        result: {
            transitivity: "intransitive",
            type: "simple",
            yulEnding: false,
            stem: {
                perfective: { p: "ش", f: "sh" },
                imperfective: { p: "کېږ", f: "kéG" },
            },
            root: {
                perfective: {
                    long: { p: "شول", f: "shwul" },
                    short: { p: "شو", f: "shw" },
                },
                imperfective: {
                    long: { p: "کېدل", f: "kedúl" },
                    short: { p: "کېد", f: "ked" },
                },
            },
            participle: {
                past: {
                    p: "شوی",
                    f: "shúwey",
                },
                present: {
                    p: "کېدونکی",
                    f: "kedóonkey",
                },
            },
        },
    },
    {
        entry: {"i":10124,"ts":1527812754,"p":"کېدل","f":"kedul","e":"to happen, occur","c":"v. intrans. irreg. aux. dyn.","ssp":"وش","ssf":"óosh","prp":"وشول","prf":"óoshwul","pprtp":"شوی","pprtf":"shúwey","diacExcept":true},
        result: {
            transitivity: "intransitive",
            type: "simple",
            yulEnding: false,
            root: {
                imperfective: {
                    long: { p: "کېدل", f: "kedúl" },
                    short: { p: "کېد", f: "ked" },
                },
                perfective: {
                    long: { p: "وشول", f: "óoshwul" },
                    short: { p: "وشو", f: "óoshw" },
                },
                perfectiveSplit: {
                    long: [{ p: "و", f: "óo" }, { p: "شول", f: "shwul" }],
                    short: [{ p: "و", f: "óo" }, { p: "شو", f: "shw" }],
                },
            },
            stem: {
                imperfective: { p: "کېږ", f: "kéG" },
                perfective: { p: "وش", f: "óosh" },
                perfectiveSplit: [{ p: "و", f: "óo" }, { p: "ش", f: "sh" }],
            },
            participle: {
                past: { p: "شوی", f: "shúwey" },
                present: { p: "کېدونکی", f: "kedóonkey" },
            },
        },
    },
    // dynamic compound verbs
    {
        entry: {"i":9371,"ts":1527812732,"p":"کار کول","f":"kaar kawul","e":"to work","l":1527822084,"c":"v. dyn. comp. trans."},
        complement: {"i":9369,"ts":1527822084,"p":"کار","f":"kaar","e":"work, job, business, stuff to do","c":"n. m."},
        result: {
            type: "dynamic compound",
            transitivity: "transitive",
            yulEnding: null,
            root: {
                imperfective: {
                    long: { p: "کار کول", f: "kaar kawúl" },
                    short: { p: "کار کو", f: "kaar kaw" },
                },
                perfective: {
                    long: { p: "کار وکړل", f: "kaar óokRul" },
                    short: { p: "کار وکړ", f: "kaar óokR" },
                    mini: { p: "کار وک", f: "kaar óok" },
                },
                perfectiveSplit: {
                    long: [{ p: "کار و", f: "kaar óo" }, { p: "کړل", f: "kRul" }],
                    short: [{ p: "کار و", f: "kaar óo" }, { p: "کړ", f: "kR" }],
                    mini: [{ p: "کار و", f: "kaar óo" }, { p: "ک", f: "k" }],
                },
            },
            stem: {
                imperfective: { p: "کار کو", f: "kaar kaw" },
                perfective: {
                    long: { p: "کار وکړ", f: "kaar óokR" },
                    short: { p: "کار وک", f: "kaar óok" },
                },
                perfectiveSplit: {
                    long: [{ p: "کار و", f: "kaar óo" }, { p: "کړ", f: "kR" }],
                    short: [{ p: "کار و", f: "kaar óo" }, { p: "ک", f: "k" }],
                },
            },
            participle: {
                past: { p: "کار کړی", f: "kaar kúRey" },
                present: { p: "کار کوونکی", f: "kaar kawóonkey" },
            },
            objComplement: {
                entry: {"i":9369,"ts":1527822084,"p":"کار","f":"kaar","e":"work, job, business, stuff to do","c":"n. m."},
                person: 4,
            },
            auxVerb: {"i":10058,"ts":1527812752,"p":"کول","f":"kawul","e":"to do (an action or activity)","c":"v. trans. irreg. dyn. aux.","ssp":"وکړ","ssf":"óokR","prp":"وکړل","prf":"óokRul","pprtp":"کړی","pprtf":"kúRey","diacExcept":true},
            intransitiveForm: {
                type: "dynamic compound",
                transitivity: "intransitive",
                yulEnding: null,
                root: {
                    imperfective: {
                        long: { p: "کار کېدل", f: "kaar kedúl" },
                        short: { p: "کار کېد", f: "kaar ked" },
                    },
                    perfective: {
                        long: { p: "کار وشول", f: "kaar óoshwul" },
                        short: { p: "کار وشو", f: "kaar óoshw" },
                    },
                    perfectiveSplit: {
                        long: [{ p: "کار و", f: "kaar óo" }, { p: "شول", f: "shwul" }],
                        short: [{ p: "کار و", f: "kaar óo" }, { p: "شو", f: "shw" }],
                    },
                },
                stem: {
                    imperfective: { p: "کار کېږ", f: "kaar kéG" },
                    perfective: { p: "کار وش", f: "kaar óosh" },
                    perfectiveSplit: [{ p: "کار و", f: "kaar óo" }, { p: "ش", f: "sh" }]
                },
                participle: {
                    past: { p: "کار شوی", f: "kaar shúwey" },
                    present: { p: "کار کېدونکی", f: "kaar kedóonkey" },
                },
                objComplement: {
                    entry: {"i":9369,"ts":1527822084,"p":"کار","f":"kaar","e":"work, job, business, stuff to do","c":"n. m."},
                    person: 4,
                },
                auxVerb: {"i":10122,"ts":1527812754,"p":"کېدل","f":"kedul","e":"to happen, occur","c":"v. intrans. irreg. aux. dyn.","ssp":"وش","ssf":"óosh","prp":"وشول","prf":"óoshwul","pprtp":"شوی","pprtf":"shúwey","diacExcept":true},
            },
        },
    },
    {
        entry: {"i":12101,"ts":1527812939,"p":"منډې وهل","f":"munDe wahul","e":"to run","l":1527815805,"c":"v. dyn. comp. trans. sing. or plur."},
        complement: {"i":12098,"ts":1527815805,"p":"منډه","f":"múnDa","e":"run, running","c":"n. f."},
        result: {
            type: "dynamic compound",
            transitivity: "transitive",
            yulEnding: null,
            root: {
                imperfective: {
                    long: { p: "منډې وهل", f: "munDe wahúl" },
                    short: { p: "منډې وه", f: "munDe wah" },
                },
                perfective: {
                    long: { p: "منډې ووهل", f: "munDe óowahul" },
                    short: { p: "منډې ووه", f: "munDe óowah" },
                },
                perfectiveSplit: {
                    long: [{ p: "منډې و", f: "munDe óo" }, { p: "وهل", f: "wahul" }],
                    short: [{ p: "منډې و", f: "munDe óo" }, { p: "وه", f: "wah" }],
                },
            },
            stem: {
                imperfective: { p: "منډې وه", f: "munDe wah" },
                perfective: { p: "منډې ووه", f: "munDe óowah" },
                perfectiveSplit: [{ p: "منډې و", f: "munDe óo" }, { p: "وه", f: "wah" }],
            },
            participle: {
                past: { p: "منډې وهلې", f: "munDe wahúle" },
                present: { p: "منډې وهونکی", f: "munDe wahóonkey" },
            },
            objComplement: {
                entry: {"i":12098,"ts":1527815805,"p":"منډه","f":"múnDa","e":"run, running","c":"n. f."},
                plural: { p: "منډې", f: "munDe" },
                person: 11,
            },
            auxVerb: {
                ts: 1527815399,
                p: "وهل",
                f: "wahul",
                e: "to hit",
                c: "v. trans.",
                i: 12183,
                tppp: "واهه",
                tppf: "waahu",
            },
            singularForm: {
                type: "dynamic compound",
                transitivity: "transitive",
                yulEnding: null,
                root: {
                    imperfective: {
                        long: { p: "منډه وهل", f: "múnDa wahúl" },
                        short: { p: "منډه وه", f: "múnDa wah" },
                    },
                    perfective: {
                        long: { p: "منډه ووهل", f: "múnDa óowahul" },
                        short: { p: "منډه ووه", f: "múnDa óowah" },
                    },
                    perfectiveSplit: {
                        long: [{ p: "منډه و", f: "múnDa óo" }, { p: "وهل", f: "wahul" }],
                        short: [{ p: "منډه و", f: "múnDa óo" }, { p: "وه", f: "wah" }],
                    },
                },
                stem: {
                    imperfective: { p: "منډه وه", f: "múnDa wah" },
                    perfective: { p: "منډه ووه", f: "múnDa óowah" },
                    perfectiveSplit: [{ p: "منډه و", f: "múnDa óo" }, { p: "وه", f: "wah" }],
                },
                participle: {
                    past: { p: "منډه وهلې", f: "múnDa wahúle" },
                    present: { p: "منډه وهونکی", f: "múnDa wahóonkey" },
                },
                objComplement: {
                    entry: {"i":12098,"ts":1527815805,"p":"منډه","f":"múnDa","e":"run, running","c":"n. f."},
                    person: 5,
                },
                auxVerb: {
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
        },
    },
    {
        entry: {"i":10554,"ts":1579034883717,"p":"لاړې تېرول","f":"laaRe terawul","e":"to spit ?? (other fluids too??)","l":1527823566,"c":"v. dyn. comp. trans."},
        complement: {"i":10553,"ts":1527823567,"p":"لاړې","f":"laaRe","e":"spit, saliva, slobber, slime","c":"n. f. pl."},
        result: {
            type: "dynamic compound",
            transitivity: "transitive",
            yulEnding: null,
            root: {
                imperfective: {
                    long: { p: "لاړې تېرول", f: "laaRe terawúl" },
                    short: { p: "لاړې تېرو", f: "laaRe teraw" },
                },
                perfective: {
                    long: { p: "لاړې تېرې کړل", f: "laaRe tere kRul" },
                    short: { p: "لاړې تېرې کړ", f: "laaRe tere kR" },
                    mini: { p: "لاړې تېرې ک", f: "laaRe tere k" },
                },
                perfectiveSplit: {
                    long: [{ p: "لاړې تېرې ", f: "laaRe tere " }, { p: "کړل", f: "kRul" }],
                    short: [{ p: "لاړې تېرې ", f: "laaRe tere " }, { p: "کړ", f: "kR" }],
                    mini: [{ p: "لاړې تېرې ", f: "laaRe tere " }, { p: "ک", f: "k" }],
                },
            },
            stem: {
                imperfective: { p: "لاړې تېرو", f: "laaRe teraw" },
                perfective: {
                    long: { p: "لاړې تېرې کړ", f: "laaRe tere kR" },
                    short: { p: "لاړې تېرې ک", f: "laaRe tere k" },
                },
                perfectiveSplit: {
                    long: [{ p: "لاړې تېرې ", f: "laaRe tere " }, { p: "کړ", f: "kR" }],
                    short: [{ p: "لاړې تېرې ", f: "laaRe tere " }, { p: "ک", f: "k" }],
                },
            },
            participle: {
                past: { p: "لاړې تېرې کړې", f: "laaRe tere kúRe" },
                present: { p: "لاړې تېروونکی", f: "laaRe terawóonkey" },
            },
            objComplement: {
                entry: {"i":10553,"ts":1527823567,"p":"لاړې","f":"laaRe","e":"spit, saliva, slobber, slime","c":"n. f. pl."},
                person: 11,
            },
            auxVerb: {"i":3459,"ts":1527812157,"p":"تېرول","f":"terawul","e":"to pass (time), to take across, to pass, endure (difficulties)","l":1527813139,"c":"v. stat. comp. trans."},
            auxVerbComplement: {"i":3774,"ts":1527813139,"p":"تېر","f":"ter","e":"last, past, previous, passed, gone over","c":"adj."},
        },
    },
    // stative or dynamic compound verb
    {
        entry: {"i":7910,"ts":1527819253,"p":"شروع کول","f":"shUróo' kawul","e":"to start, to begin","l":1527819252,"c":"v. dyn./stat. comp. trans."},
        complement: {"i":7909,"ts":1527819252,"p":"شروع","f":"shUróo'","e":"beginning, start, undertaking","c":"n. m."},
        result: {
            type: "dynamic or stative compound",
            transitivity: "transitive",
            dynamic: {
                type: "dynamic compound",
                transitivity: "transitive",
                yulEnding: null,
                root: {
                    imperfective: {
                        long: { p: "شروع کول", f: "shUróo' kawúl" },
                        short: { p: "شروع کو", f: "shUróo' kaw" },
                    },
                    perfective: {
                        long: { p: "شروع وکړل", f: "shUróo' óokRul" },
                        short: { p: "شروع وکړ", f: "shUróo' óokR" },
                        mini: { p: "شروع وک", f: "shUróo' óok" },
                    },
                    perfectiveSplit: {
                        long: [{ p: "شروع و", f: "shUróo' óo" }, { p: "کړل", f: "kRul" }],
                        short: [{ p: "شروع و", f: "shUróo' óo" }, { p: "کړ", f: "kR" }],
                        mini: [{ p: "شروع و", f: "shUróo' óo" }, { p: "ک", f: "k" }],
                    },
                },
                stem: {
                    imperfective: { p: "شروع کو", f: "shUróo' kaw" },
                    perfective: {
                        long: { p: "شروع وکړ", f: "shUróo' óokR" },
                        short: { p: "شروع وک", f: "shUróo' óok" },
                    },
                    perfectiveSplit: {
                        long: [{ p: "شروع و", f: "shUróo' óo" }, { p: "کړ", f: "kR" }],
                        short: [{ p: "شروع و", f: "shUróo' óo" }, { p: "ک", f: "k" }],
                    },
                },
                participle: {
                    past: { p: "شروع کړی", f: "shUróo' kúRey" },
                    present: { p: "شروع کوونکی", f: "shUróo' kawóonkey" },
                },
                objComplement: {
                    entry: {"i":7909,"ts":1527819252,"p":"شروع","f":"shUróo'","e":"beginning, start, undertaking","c":"n. m."},
                    person: 4,
                },
                auxVerb: {"i":10058,"ts":1527812752,"p":"کول","f":"kawul","e":"to do (an action or activity)","c":"v. trans. irreg. dyn. aux.","ssp":"وکړ","ssf":"óokR","prp":"وکړل","prf":"óokRul","pprtp":"کړی","pprtf":"kúRey","diacExcept":true},
                intransitiveForm: {
                    type: "dynamic compound",
                    transitivity: "intransitive",
                    yulEnding: null,
                    root: {
                        imperfective: {
                            long: { p: "شروع کېدل", f: "shUróo' kedúl" },
                            short: { p: "شروع کېد", f: "shUróo' ked" },
                        },
                        perfective: {
                            long: { p: "شروع وشول", f: "shUróo' óoshwul" },
                            short: { p: "شروع وشو", f: "shUróo' óoshw" },
                        },
                        perfectiveSplit: {
                            long: [{ p: "شروع و", f: "shUróo' óo" }, { p: "شول", f: "shwul" }],
                            short: [{ p: "شروع و", f: "shUróo' óo" }, { p: "شو", f: "shw" }],
                        },
                    },
                    stem: {
                        imperfective: { p: "شروع کېږ", f: "shUróo' kéG" },
                        perfective: { p: "شروع وش", f: "shUróo' óosh" },
                        perfectiveSplit: [{ p: "شروع و", f: "shUróo' óo" }, { p: "ش", f: "sh" }],
                    },
                    participle: {
                        past: { p: "شروع شوی", f: "shUróo' shúwey" },
                        present: { p: "شروع کېدونکی", f: "shUróo' kedóonkey" },
                    },
                    objComplement: {
                        entry: {"i":7909,"ts":1527819252,"p":"شروع","f":"shUróo'","e":"beginning, start, undertaking","c":"n. m."},
                        person: 4,
                    },
                    auxVerb: {"i":10122,"ts":1527812754,"p":"کېدل","f":"kedul","e":"to happen, occur","c":"v. intrans. irreg. aux. dyn.","ssp":"وش","ssf":"óosh","prp":"وشول","prf":"óoshwul","pprtp":"شوی","pprtf":"shúwey","diacExcept":true},
                },
            },
            stative: {
                type: "stative compound",
                transitivity: "transitive",
                yulEnding: false,
                root: {
                    imperfective: {
                        long: { p: "شروع کول", f: "shUróo' kawúl" },
                        short: { p: "شروع کو", f: "shUróo' kaw" },
                    },
                    perfective: {
                        long: { p: "شروع کړل", f: "shUróo' kRul" },
                        short: { p: "شروع کړ", f: "shUróo' kR" },
                        mini: { p: "شروع ک", f: "shUróo' k" },
                    },
                    perfectiveSplit: {
                        long: [{ p: "شروع ", f: "shUróo' " }, { p: "کړل", f: "kRul" }],
                        short: [{ p: "شروع ", f: "shUróo' " }, { p: "کړ", f: "kR" }],
                        mini: [{ p: "شروع ", f: "shUróo' " }, { p: "ک", f: "k" }],
                    },
                },
                stem: {
                    imperfective: { p: "شروع کو", f: "shUróo' kaw" },
                    perfective: {
                        long: { p: "شروع کړ", f: "shUróo' kR" },
                        short: { p: "شروع ک", f: "shUróo' k" },
                    },
                    perfectiveSplit: {
                        long: [{ p: "شروع ", f: "shUróo' " }, { p: "کړ", f: "kR" }],
                        short: [{ p: "شروع ", f: "shUróo' " }, { p: "ک", f: "k" }],
                    },
                },
                participle: {
                    past: { p: "شروع کړی", f: "shUróo' kúRey" },
                    present: { p: "شروع کوونکی", f: "shUróo' kawóonkey" },
                },
                complement: {
                    masc: [
                        [{ p: "شروع", f: "shUróo'" }],
                        [{ p: "شروع", f: "shUróo'" }],
                        [{ p: "شروع", f: "shUróo'" }],
                    ],
                    fem: [
                        [{ p: "شروع", f: "shUróo'" }],
                        [{ p: "شروع", f: "shUróo'" }],
                        [{ p: "شروع", f: "shUróo'" }],
                    ],
                },
            },
        },
    },
    // dynamic or generative stative compound verb
    {
        entry: {"i":4770,"ts":1608137130992,"p":"چیغه کول","f":"chéegha kawul","e":"to yell, scream, cry out","l":1527813972,"c":"v. gen. stat./dyn. comp. trans."},
        complement: {"i":4769,"ts":1527813972,"p":"چیغه","f":"chéegha","e":"yell, scream, cry","c":"n. f."},
        result: {
            type: "dynamic or generative stative compound",
            transitivity: "transitive",
            dynamic: {
                type: "dynamic compound",
                transitivity: "transitive",
                yulEnding: null,
                root: {
                    imperfective: {
                        long: { p: "چیغه کول", f: "chéegha kawúl" },
                        short: { p: "چیغه کو", f: "chéegha kaw" },
                    },
                    perfective: {
                        long: { p: "چیغه وکړل", f: "chéegha óokRul" },
                        short: { p: "چیغه وکړ", f: "chéegha óokR" },
                        mini: { p: "چیغه وک", f: "chéegha óok" },
                    },
                    perfectiveSplit: {
                        long: [{ p: "چیغه و", f: "chéegha óo" }, { p: "کړل", f: "kRul" }],
                        short: [{ p: "چیغه و", f: "chéegha óo" }, { p: "کړ", f: "kR" }],
                        mini: [{ p: "چیغه و", f: "chéegha óo" }, { p: "ک", f: "k" }],
                    },
                },
                stem: {
                    imperfective: { p: "چیغه کو", f: "chéegha kaw" },
                    perfective: {
                        long: { p: "چیغه وکړ", f: "chéegha óokR" },
                        short: { p: "چیغه وک", f: "chéegha óok" },
                    },
                    perfectiveSplit: {
                        long: [{ p: "چیغه و", f: "chéegha óo" }, { p: "کړ", f: "kR" }],
                        short: [{ p: "چیغه و", f: "chéegha óo" }, { p: "ک", f: "k" }],
                    },
                },
                participle: {
                    past: { p: "چیغه کړې", f: "chéegha kúRe" },
                    present: { p: "چیغه کوونکی", f: "chéegha kawóonkey" },
                },
                objComplement: {
                    entry: {"i":4769,"ts":1527813972,"p":"چیغه","f":"chéegha","e":"yell, scream, cry","c":"n. f."},
                    person: 5,
                },
                auxVerb: {"i":10058,"ts":1527812752,"p":"کول","f":"kawul","e":"to do (an action or activity)","c":"v. trans. irreg. dyn. aux.","ssp":"وکړ","ssf":"óokR","prp":"وکړل","prf":"óokRul","pprtp":"کړی","pprtf":"kúRey","diacExcept":true},
                intransitiveForm: {
                    type: "dynamic compound",
                    transitivity: "intransitive",
                    yulEnding: null,
                    root: {
                        imperfective: {
                            long: { p: "چیغه کېدل", f: "chéegha kedúl" },
                            short: { p: "چیغه کېد", f: "chéegha ked" },
                        },
                        perfective: {
                            long: { p: "چیغه وشول", f: "chéegha óoshwul" },
                            short: { p: "چیغه وشو", f: "chéegha óoshw" },
                        },
                        perfectiveSplit: {
                            long: [{ p: "چیغه و", f: "chéegha óo" }, { p: "شول", f: "shwul" }],
                            short: [{ p: "چیغه و", f: "chéegha óo" }, { p: "شو", f: "shw" }],
                        },
                    },
                    stem: {
                        imperfective: { p: "چیغه کېږ", f: "chéegha kéG" },
                        perfective: { p: "چیغه وش", f: "chéegha óosh" },
                        perfectiveSplit: [{ p: "چیغه و", f: "chéegha óo" }, { p: "ش", f: "sh" }],
                    },
                    participle: {
                        past: { p: "چیغه شوې", f: "chéegha shúwe" },
                        present: { p: "چیغه کېدونکی", f: "chéegha kedóonkey" },
                    },
                    objComplement: {
                        entry: {"i":4769,"ts":1527813972,"p":"چیغه","f":"chéegha","e":"yell, scream, cry","c":"n. f."},
                        person: 5,
                    },
                    auxVerb: {"i":10122,"ts":1527812754,"p":"کېدل","f":"kedul","e":"to happen, occur","c":"v. intrans. irreg. aux. dyn.","ssp":"وش","ssf":"óosh","prp":"وشول","prf":"óoshwul","pprtp":"شوی","pprtf":"shúwey","diacExcept":true},
                },
            },
            stative: {
                type: "generative stative compound",
                transitivity: "transitive",
                yulEnding: null,
                root: {
                    imperfective: {
                        long: { p: "چیغه کول", f: "chéegha kawúl" },
                        short: { p: "چیغه کو", f: "chéegha kaw" },
                    },
                    perfective: {
                        long: { p: "چیغه کړل", f: "chéegha kRul" },
                        short: { p: "چیغه کړ", f: "chéegha kR" },
                        mini: { p: "چیغه ک", f: "chéegha k" },
                    },
                    perfectiveSplit: {
                        long: [{ p: "چیغه ", f: "chéegha " }, { p: "کړل", f: "kRul" }],
                        short: [{ p: "چیغه ", f: "chéegha " }, { p: "کړ", f: "kR" }],
                        mini: [{ p: "چیغه ", f: "chéegha " }, { p: "ک", f: "k" }],
                    },
                },
                stem: {
                    imperfective: { p: "چیغه کو", f: "chéegha kaw" },
                    perfective: {
                        long: { p: "چیغه کړ", f: "chéegha kR" },
                        short: { p: "چیغه ک", f: "chéegha k" },
                    },
                    perfectiveSplit: {
                        long: [{ p: "چیغه ", f: "chéegha " }, { p: "کړ", f: "kR" }],
                        short: [{ p: "چیغه ", f: "chéegha " }, { p: "ک", f: "k" }],
                    },
                },
                participle: {
                    past: { p: "چیغه کړې", f: "chéegha kúRe" },
                    present: { p: "چیغه کوونکی", f: "chéegha kawóonkey" },
                },
                objComplement: {
                    entry: {"i":4769,"ts":1527813972,"p":"چیغه","f":"chéegha","e":"yell, scream, cry","c":"n. f."},
                    person: 5,
                },
            },
        },
    },
    // with plural form
    {
        entry: {"i":4770,"ts":1608137130992,"p":"چیغې کول","f":"chéeghe kawul","e":"to yell, scream, cry out","l":1527813972,"c":"v. gen. stat./dyn. comp. trans."},
        complement: {"i":4769,"ts":1527813972,"p":"چیغه","f":"chéegha","e":"yell, scream, cry","c":"n. f."},
        result: {
            "type": "dynamic or generative stative compound",
            "transitivity": "transitive",
            "dynamic": {
                "type": "dynamic compound",
                "transitivity": "transitive",
                "yulEnding": null,
                "stem": {
                    "imperfective": {
                        "p": "چیغې کو",
                        "f": "chéeghe kaw"
                    },
                    "perfective": {
                        "short": {
                            "p": "چیغې وک",
                            "f": "chéeghe óok"
                        },
                        "long": {
                            "p": "چیغې وکړ",
                            "f": "chéeghe óokR"
                        }
                    },
                    "perfectiveSplit": {
                        "short": [{
                            "p": "چیغې و",
                            "f": "chéeghe óo"
                        }, {
                            "p": "ک",
                            "f": "k"
                        }],
                        "long": [{
                            "p": "چیغې و",
                            "f": "chéeghe óo"
                        }, {
                            "p": "کړ",
                            "f": "kR"
                        }],
                    },
                },
                "root": {
                    "imperfective": {
                        "short": {
                            "p": "چیغې کو",
                            "f": "chéeghe kaw"
                        },
                        "long": {
                            "p": "چیغې کول",
                            "f": "chéeghe kawúl"
                        }
                    },
                    "perfective": {
                        "mini": {
                            "p": "چیغې وک",
                            "f": "chéeghe óok"
                        },
                        "short": {
                            "p": "چیغې وکړ",
                            "f": "chéeghe óokR"
                        },
                        "long": {
                            "p": "چیغې وکړل",
                            "f": "chéeghe óokRul"
                        }
                    },
                    "perfectiveSplit": {
                        "mini": [{
                            "p": "چیغې و",
                            "f": "chéeghe óo"
                        }, {
                            "p": "ک",
                            "f": "k"
                        }],
                        "short": [{
                            "p": "چیغې و",
                            "f": "chéeghe óo"
                        }, {
                            "p": "کړ",
                            "f": "kR"
                        }],
                        "long": [{
                            "p": "چیغې و",
                            "f": "chéeghe óo"
                        }, {
                            "p": "کړل",
                            "f": "kRul"
                        }],
                    },
                },
                "participle": {
                    "present": {
                        "p": "چیغې کوونکی",
                        "f": "chéeghe kawóonkey"
                    },
                    "past": {
                        "p": "چیغې کړې",
                        "f": "chéeghe kúRe"
                    }
                },
                "objComplement": {
                    "entry": {
                        "i": 4769,
                        "ts": 1527813972,
                        "p": "چیغه",
                        "f": "chéegha",
                        "e": "yell, scream, cry",
                        "c": "n. f."
                    },
                    "plural": {
                        "p": "چیغې",
                        "f": "chéeghe"
                    },
                    "person": 11
                },
                "auxVerb": {
                    "i": 10058,
                    "ts": 1527812752,
                    "p": "کول",
                    "f": "kawul",
                    "e": "to do (an action or activity)",
                    "c": "v. trans. irreg. dyn. aux.",
                    "ssp": "وکړ",
                    "ssf": "óokR",
                    "prp": "وکړل",
                    "prf": "óokRul",
                    "pprtp": "کړی",
                    "pprtf": "kúRey",
                    "diacExcept": true
                },
                "singularForm": {
                    "type": "dynamic compound",
                    "transitivity": "transitive",
                    "yulEnding": null,
                    "stem": {
                        "imperfective": {
                            "p": "چیغه کو",
                            "f": "chéegha kaw"
                        },
                        "perfective": {
                            "short": {
                                "p": "چیغه وک",
                                "f": "chéegha óok"
                            },
                            "long": {
                                "p": "چیغه وکړ",
                                "f": "chéegha óokR"
                            }
                        },
                        "perfectiveSplit": {
                            "short": [{
                                "p": "چیغه و",
                                "f": "chéegha óo"
                            }, {
                                "p": "ک",
                                "f": "k"
                            }],
                            "long": [{
                                "p": "چیغه و",
                                "f": "chéegha óo"
                            }, {
                                "p": "کړ",
                                "f": "kR"
                            }],
                        },
                    },
                    "root": {
                        "imperfective": {
                            "short": {
                                "p": "چیغه کو",
                                "f": "chéegha kaw"
                            },
                            "long": {
                                "p": "چیغه کول",
                                "f": "chéegha kawúl"
                            }
                        },
                        "perfective": {
                            "mini": {
                                "p": "چیغه وک",
                                "f": "chéegha óok"
                            },
                            "short": {
                                "p": "چیغه وکړ",
                                "f": "chéegha óokR"
                            },
                            "long": {
                                "p": "چیغه وکړل",
                                "f": "chéegha óokRul"
                            }
                        },
                        "perfectiveSplit": {
                            "mini": [{
                                "p": "چیغه و",
                                "f": "chéegha óo"
                            }, {
                                "p": "ک",
                                "f": "k"
                            }],
                            "short": [{
                                "p": "چیغه و",
                                "f": "chéegha óo"
                            }, {
                                "p": "کړ",
                                "f": "kR"
                            }],
                            "long": [{
                                "p": "چیغه و",
                                "f": "chéegha óo"
                            }, {
                                "p": "کړل",
                                "f": "kRul"
                            }],
                        },
                    },
                    "participle": {
                        "present": {
                            "p": "چیغه کوونکی",
                            "f": "chéegha kawóonkey"
                        },
                        "past": {
                            "p": "چیغه کړې",
                            "f": "chéegha kúRe"
                        }
                    },
                    "objComplement": {
                        "entry": {
                            "i": 4769,
                            "ts": 1527813972,
                            "p": "چیغه",
                            "f": "chéegha",
                            "e": "yell, scream, cry",
                            "c": "n. f."
                        },
                        "person": 5
                    },
                    "auxVerb": {
                        "i": 10058,
                        "ts": 1527812752,
                        "p": "کول",
                        "f": "kawul",
                        "e": "to do (an action or activity)",
                        "c": "v. trans. irreg. dyn. aux.",
                        "ssp": "وکړ",
                        "ssf": "óokR",
                        "prp": "وکړل",
                        "prf": "óokRul",
                        "pprtp": "کړی",
                        "pprtf": "kúRey",
                        "diacExcept": true
                    },
                    "intransitiveForm": {
                        "type": "dynamic compound",
                        "transitivity": "intransitive",
                        "yulEnding": null,
                        "stem": {
                            "imperfective": {
                                "p": "چیغې کېږ",
                                "f": "chéeghe kéG"
                            },
                            "perfective": {
                                "p": "چیغې وش",
                                "f": "chéeghe óosh"
                            },
                            "perfectiveSplit": [{
                                "p": "چیغې و",
                                "f": "chéeghe óo"
                            }, {
                                "p": "ش",
                                "f": "sh"
                            }],
                        },
                        "root": {
                            "imperfective": {
                                "short": {
                                    "p": "چیغې کېد",
                                    "f": "chéeghe ked"
                                },
                                "long": {
                                    "p": "چیغې کېدل",
                                    "f": "chéeghe kedúl"
                                }
                            },
                            "perfective": {
                                "short": {
                                    "p": "چیغې وشو",
                                    "f": "chéeghe óoshw"
                                },
                                "long": {
                                    "p": "چیغې وشول",
                                    "f": "chéeghe óoshwul"
                                }
                            },
                            "perfectiveSplit": {
                                "short": [{
                                    "p": "چیغې و",
                                    "f": "chéeghe óo"
                                }, {
                                    "p": "شو",
                                    "f": "shw"
                                }],
                                "long": [{
                                    "p": "چیغې و",
                                    "f": "chéeghe óo"
                                }, {
                                    "p": "شول",
                                    "f": "shwul"
                                }],
                            },
                        },
                        "participle": {
                            "present": {
                                "p": "چیغې کېدونکی",
                                "f": "chéeghe kedóonkey"
                            },
                            "past": {
                                "p": "چیغې شوې",
                                "f": "chéeghe shúwe"
                            }
                        },
                        "objComplement": {
                            "entry": {
                                "i": 4769,
                                "ts": 1527813972,
                                "p": "چیغه",
                                "f": "chéegha",
                                "e": "yell, scream, cry",
                                "c": "n. f."
                            },
                            "plural": {
                                "p": "چیغې",
                                "f": "chéeghe"
                            },
                            "person": 11
                        },
                        "auxVerb": {
                            "i": 10122,
                            "ts": 1527812754,
                            "p": "کېدل",
                            "f": "kedul",
                            "e": "to happen, occur",
                            "c": "v. intrans. irreg. aux. dyn.",
                            "ssp": "وش",
                            "ssf": "óosh",
                            "prp": "وشول",
                            "prf": "óoshwul",
                            "pprtp": "شوی",
                            "pprtf": "shúwey",
                            "diacExcept": true
                        },
                        "singularForm": {
                            "type": "dynamic compound",
                            "transitivity": "intransitive",
                            "yulEnding": null,
                            "stem": {
                                "imperfective": {
                                    "p": "چیغه کېږ",
                                    "f": "chéegha kéG"
                                },
                                "perfective": {
                                    "p": "چیغه وش",
                                    "f": "chéegha óosh"
                                },
                                "perfectiveSplit": [{
                                    "p": "چیغه و",
                                    "f": "chéegha óo"
                                }, {
                                    "p": "ش",
                                    "f": "sh"
                                }],
                            },
                            "root": {
                                "imperfective": {
                                    "short": {
                                        "p": "چیغه کېد",
                                        "f": "chéegha ked"
                                    },
                                    "long": {
                                        "p": "چیغه کېدل",
                                        "f": "chéegha kedúl"
                                    }
                                },
                                "perfective": {
                                    "short": {
                                        "p": "چیغه وشو",
                                        "f": "chéegha óoshw"
                                    },
                                    "long": {
                                        "p": "چیغه وشول",
                                        "f": "chéegha óoshwul"
                                    }
                                },
                                "perfectiveSplit": {
                                    "short": [{
                                        "p": "چیغه و",
                                        "f": "chéegha óo"
                                    }, {
                                        "p": "شو",
                                        "f": "shw"
                                    }],
                                    "long": [{
                                        "p": "چیغه و",
                                        "f": "chéegha óo"
                                    }, {
                                        "p": "شول",
                                        "f": "shwul"
                                    }],
                                },
                            },
                            "participle": {
                                "present": {
                                    "p": "چیغه کېدونکی",
                                    "f": "chéegha kedóonkey"
                                },
                                "past": {
                                    "p": "چیغه شوې",
                                    "f": "chéegha shúwe"
                                }
                            },
                            "objComplement": {
                                "entry": {
                                    "i": 4769,
                                    "ts": 1527813972,
                                    "p": "چیغه",
                                    "f": "chéegha",
                                    "e": "yell, scream, cry",
                                    "c": "n. f."
                                },
                                "person": 5
                            },
                            "auxVerb": {
                                "i": 10122,
                                "ts": 1527812754,
                                "p": "کېدل",
                                "f": "kedul",
                                "e": "to happen, occur",
                                "c": "v. intrans. irreg. aux. dyn.",
                                "ssp": "وش",
                                "ssf": "óosh",
                                "prp": "وشول",
                                "prf": "óoshwul",
                                "pprtp": "شوی",
                                "pprtf": "shúwey",
                                "diacExcept": true
                            }
                        }
                    }
                },
                "intransitiveForm": {
                    "type": "dynamic compound",
                    "transitivity": "intransitive",
                    "yulEnding": null,
                    "stem": {
                        "imperfective": {
                            "p": "چیغې کېږ",
                            "f": "chéeghe kéG"
                        },
                        "perfective": {
                            "p": "چیغې وش",
                            "f": "chéeghe óosh"
                        },
                        "perfectiveSplit": [{
                            "p": "چیغې و",
                            "f": "chéeghe óo"
                        }, {
                            "p": "ش",
                            "f": "sh"
                        }],
                    },
                    "root": {
                        "imperfective": {
                            "short": {
                                "p": "چیغې کېد",
                                "f": "chéeghe ked"
                            },
                            "long": {
                                "p": "چیغې کېدل",
                                "f": "chéeghe kedúl"
                            }
                        },
                        "perfective": {
                            "short": {
                                "p": "چیغې وشو",
                                "f": "chéeghe óoshw"
                            },
                            "long": {
                                "p": "چیغې وشول",
                                "f": "chéeghe óoshwul"
                            }
                        },
                        "perfectiveSplit": {
                            "short": [{
                                "p": "چیغې و",
                                "f": "chéeghe óo"
                            }, {
                                "p": "شو",
                                "f": "shw"
                            }],
                            "long": [{
                                "p": "چیغې و",
                                "f": "chéeghe óo"
                            }, {
                                "p": "شول",
                                "f": "shwul"
                            }],
                        },
                    },
                    "participle": {
                        "present": {
                            "p": "چیغې کېدونکی",
                            "f": "chéeghe kedóonkey"
                        },
                        "past": {
                            "p": "چیغې شوې",
                            "f": "chéeghe shúwe"
                        }
                    },
                    "objComplement": {
                        "entry": {
                            "i": 4769,
                            "ts": 1527813972,
                            "p": "چیغه",
                            "f": "chéegha",
                            "e": "yell, scream, cry",
                            "c": "n. f."
                        },
                        "plural": {
                            "p": "چیغې",
                            "f": "chéeghe"
                        },
                        "person": 11
                    },
                    "auxVerb": {
                        "i": 10122,
                        "ts": 1527812754,
                        "p": "کېدل",
                        "f": "kedul",
                        "e": "to happen, occur",
                        "c": "v. intrans. irreg. aux. dyn.",
                        "ssp": "وش",
                        "ssf": "óosh",
                        "prp": "وشول",
                        "prf": "óoshwul",
                        "pprtp": "شوی",
                        "pprtf": "shúwey",
                        "diacExcept": true
                    },
                    "singularForm": {
                        "type": "dynamic compound",
                        "transitivity": "intransitive",
                        "yulEnding": null,
                        "stem": {
                            "imperfective": {
                                "p": "چیغه کېږ",
                                "f": "chéegha kéG"
                            },
                            "perfective": {
                                "p": "چیغه وش",
                                "f": "chéegha óosh"
                            },
                            "perfectiveSplit": [{
                                "p": "چیغه و",
                                "f": "chéegha óo"
                            }, {
                                "p": "ش",
                                "f": "sh"
                            }],
                        },
                        "root": {
                            "imperfective": {
                                "short": {
                                    "p": "چیغه کېد",
                                    "f": "chéegha ked"
                                },
                                "long": {
                                    "p": "چیغه کېدل",
                                    "f": "chéegha kedúl"
                                }
                            },
                            "perfective": {
                                "short": {
                                    "p": "چیغه وشو",
                                    "f": "chéegha óoshw"
                                },
                                "long": {
                                    "p": "چیغه وشول",
                                    "f": "chéegha óoshwul"
                                }
                            },
                            "perfectiveSplit": {
                                "short": [{
                                    "p": "چیغه و",
                                    "f": "chéegha óo"
                                }, {
                                    "p": "شو",
                                    "f": "shw"
                                }],
                                "long": [{
                                    "p": "چیغه و",
                                    "f": "chéegha óo"
                                }, {
                                    "p": "شول",
                                    "f": "shwul"
                                }],
                            },
                        },
                        "participle": {
                            "present": {
                                "p": "چیغه کېدونکی",
                                "f": "chéegha kedóonkey"
                            },
                            "past": {
                                "p": "چیغه شوې",
                                "f": "chéegha shúwe"
                            }
                        },
                        "objComplement": {
                            "entry": {
                                "i": 4769,
                                "ts": 1527813972,
                                "p": "چیغه",
                                "f": "chéegha",
                                "e": "yell, scream, cry",
                                "c": "n. f."
                            },
                            "person": 5
                        },
                        "auxVerb": {
                            "i": 10122,
                            "ts": 1527812754,
                            "p": "کېدل",
                            "f": "kedul",
                            "e": "to happen, occur",
                            "c": "v. intrans. irreg. aux. dyn.",
                            "ssp": "وش",
                            "ssf": "óosh",
                            "prp": "وشول",
                            "prf": "óoshwul",
                            "pprtp": "شوی",
                            "pprtf": "shúwey",
                            "diacExcept": true
                        }
                    }
                }
            },
            "stative": {
                "type": "generative stative compound",
                "transitivity": "transitive",
                "yulEnding": null,
                "stem": {
                    "imperfective": {
                        "p": "چیغې کو",
                        "f": "chéeghe kaw"
                    },
                    "perfective": {
                        "short": {
                            "p": "چیغې ک",
                            "f": "chéeghe k"
                        },
                        "long": {
                            "p": "چیغې کړ",
                            "f": "chéeghe kR"
                        }
                    },
                    "perfectiveSplit": {
                        "short": [{
                            "p": "چیغې ",
                            "f": "chéeghe "
                        }, {
                            "p": "ک",
                            "f": "k"
                        }],
                        "long": [{
                            "p": "چیغې ",
                            "f": "chéeghe "
                        }, {
                            "p": "کړ",
                            "f": "kR"
                        }],
                    },
                },
                "root": {
                    "imperfective": {
                        "short": {
                            "p": "چیغې کو",
                            "f": "chéeghe kaw"
                        },
                        "long": {
                            "p": "چیغې کول",
                            "f": "chéeghe kawúl"
                        }
                    },
                    "perfective": {
                        "mini": {
                            "p": "چیغې ک",
                            "f": "chéeghe k"
                        },
                        "short": {
                            "p": "چیغې کړ",
                            "f": "chéeghe kR"
                        },
                        "long": {
                            "p": "چیغې کړل",
                            "f": "chéeghe kRul"
                        }
                    },
                    "perfectiveSplit": {
                        "mini": [{
                            "p": "چیغې ",
                            "f": "chéeghe "
                        }, {
                            "p": "ک",
                            "f": "k"
                        }],
                        "short": [{
                            "p": "چیغې ",
                            "f": "chéeghe "
                        }, {
                            "p": "کړ",
                            "f": "kR"
                        }],
                        "long": [{
                            "p": "چیغې ",
                            "f": "chéeghe "
                        }, {
                            "p": "کړل",
                            "f": "kRul"
                        }],
                    },
                },
                "participle": {
                    "present": {
                        "p": "چیغې کوونکی",
                        "f": "chéeghe kawóonkey"
                    },
                    "past": {
                        "p": "چیغې کړې",
                        "f": "chéeghe kúRe"
                    }
                },
                "objComplement": {
                    "entry": {
                        "i": 4769,
                        "ts": 1527813972,
                        "p": "چیغه",
                        "f": "chéegha",
                        "e": "yell, scream, cry",
                        "c": "n. f."
                    },
                    "plural": {
                        "p": "چیغې",
                        "f": "chéeghe"
                    },
                    "person": 11
                },
                "singularForm": {
                    "type": "generative stative compound",
                    "transitivity": "transitive",
                    "yulEnding": null,
                    "stem": {
                        "imperfective": {
                            "p": "چیغه کو",
                            "f": "chéegha kaw"
                        },
                        "perfective": {
                            "short": {
                                "p": "چیغه ک",
                                "f": "chéegha k"
                            },
                            "long": {
                                "p": "چیغه کړ",
                                "f": "chéegha kR"
                            }
                        },
                        "perfectiveSplit": {
                            "short": [{
                                "p": "چیغه ",
                                "f": "chéegha "
                            }, {
                                "p": "ک",
                                "f": "k"
                            }],
                            "long": [{
                                "p": "چیغه ",
                                "f": "chéegha "
                            }, {
                                "p": "کړ",
                                "f": "kR"
                            }],
                        },
                    },
                    "root": {
                        "imperfective": {
                            "short": {
                                "p": "چیغه کو",
                                "f": "chéegha kaw"
                            },
                            "long": {
                                "p": "چیغه کول",
                                "f": "chéegha kawúl"
                            }
                        },
                        "perfective": {
                            "mini": {
                                "p": "چیغه ک",
                                "f": "chéegha k"
                            },
                            "short": {
                                "p": "چیغه کړ",
                                "f": "chéegha kR"
                            },
                            "long": {
                                "p": "چیغه کړل",
                                "f": "chéegha kRul"
                            }
                        },
                        "perfectiveSplit": {
                            "mini": [{
                                "p": "چیغه ",
                                "f": "chéegha "
                            }, {
                                "p": "ک",
                                "f": "k"
                            }],
                            "short": [{
                                "p": "چیغه ",
                                "f": "chéegha "
                            }, {
                                "p": "کړ",
                                "f": "kR"
                            }],
                            "long": [{
                                "p": "چیغه ",
                                "f": "chéegha "
                            }, {
                                "p": "کړل",
                                "f": "kRul"
                            }],
                        },
                    },
                    "participle": {
                        "present": {
                            "p": "چیغه کوونکی",
                            "f": "chéegha kawóonkey"
                        },
                        "past": {
                            "p": "چیغه کړې",
                            "f": "chéegha kúRe"
                        }
                    },
                    "objComplement": {
                        "entry": {
                            "i": 4769,
                            "ts": 1527813972,
                            "p": "چیغه",
                            "f": "chéegha",
                            "e": "yell, scream, cry",
                            "c": "n. f."
                        },
                        "person": 5
                    }
                }
            }
        }
    },
];

test(`verb info should work`, () => {
    toTest.forEach(({
        entry,
        result,
        complement,
    }) => {
        // console.log(JSON.stringify(getVerbInfo(entry, complement), null, "  "))
        expect(getVerbInfo(entry, complement)).toEqual(result);
    });
});

// test(`verb info should not work if no parts of speech`, () => {
//     expect(() => {
//         getVerbInfo({"i":5413,"ts":1527812767,"p":"خندل","f":"khandul","e":"to laugh"});
//     }).toThrow("No part of speech info");
// });

// test(`verb info should not work if a complement is not provided for a compound verb`, () => {
//     expect(() => {
//         getVerbInfo({"i":5368,"ts":1577898920635,"p":"خفه کېدل","f":"khufa kedul","e":"to be sad, grieved, annoyed, upset; to be choked, to suffocate","l":1527812798,"c":"v. stat. comp. intrans."});
//     }).toThrow("complement required for compound verb");
// });
