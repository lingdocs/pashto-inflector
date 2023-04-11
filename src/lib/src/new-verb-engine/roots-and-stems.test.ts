import * as T from "../../../types";
import { getPastParticiple } from "./roots-and-stems";
import { vEntry } from "./rs-helpers";
import { getAllRs } from "./rs-helpers"; 

const wahul = vEntry({"ts":1527815399,"i":15049,"p":"وهل","f":"wahul","g":"wahul","e":"to hit","r":4,"c":"v. trans.","tppp":"واهه","tppf":"waahu","ec":"hit,hits,hitting,hit,hit"});
const achawul = vEntry({"ts":1527811872,"i":224,"p":"اچول","f":"achawul","g":"achawul","e":"to put, pour, drop, throw, put on","r":4,"c":"v. trans.","ec":"put,puts,putting,put,put"});
const ganul = vEntry({"ts":1527812000,"i":11398,"p":"ګڼل","f":"gaNul, guNul","g":"gaNul,guNul","e":"to count, consider, reckon, suppose, assume","r":4,"c":"v. trans.","tppp":"ګاڼه","tppf":"gaaNu","ec":"deem"});
const kawulStat = vEntry({"ts":1579015359582,"i":11030,"p":"کول","f":"kawul","g":"kawul","e":"to make ____ ____ (as in \"He's making me angry.\")","r":4,"c":"v. trans.","ssp":"کړ","ssf":"kR","prp":"کړل","prf":"kRul","pprtp":"کړی","pprtf":"kúRey","noOo":true,"ec":"make,makes,making,made,made"});
const kawulDyn = vEntry({"ts":1527812752,"i":11031,"p":"کول","f":"kawul","g":"kawul","e":"to do (an action or activity)","r":4,"c":"v. trans./gramm. trans.","ssp":"وکړ","ssf":"óokR","prp":"وکړل","prf":"óokRul","pprtp":"کړی","pprtf":"kúRey","diacExcept":true,"ec":"do,does,doing,did,done","separationAtP":1,"separationAtF":2});
const kedulStat = vEntry({"ts":1581086654898,"i":11100,"p":"کېدل","f":"kedul","g":"kedul","e":"to become _____","r":2,"c":"v. intrans.","ssp":"ش","ssf":"sh","prp":"شول","prf":"shwul","pprtp":"شوی","pprtf":"shúwey","noOo":true,"ec":"become"});
const kedulDyn = vEntry({"ts":1527812754,"i":11101,"p":"کېدل","f":"kedul","g":"kedul","e":"to happen, occur","r":2,"c":"v. intrans.","ssp":"وش","ssf":"óosh","prp":"وشول","prf":"óoshwul","pprtp":"شوی","pprtf":"shúwey","diacExcept":true,"ec":"happen","separationAtP":1,"separationAtF":2});
const raatlul = vEntry({"ts":1527815216,"i":6875,"p":"راتلل","f":"raatlúl","g":"raatlul","e":"to come","r":4,"c":"v. intrans.","psp":"راځ","psf":"raadz","ssp":"راش","ssf":"ráash","prp":"راغلل","prf":"ráaghlul","pprtp":"راغلی","pprtf":"raaghúley","tppp":"راغی","tppf":"ráaghey","noOo":true,"separationAtP":2,"separationAtF":3,"ec":"come,comes,coming,came,come"});
const wartlul = vEntry({"ts":1585228579997,"i":14821,"p":"ورتلل","f":"wărtlul","g":"wartlul","e":"to come / go over to (third person or place)","r":4,"c":"v. intrans.","psp":"ورځ","psf":"wărdz","ssp":"ورش","ssf":"wársh","prp":"ورغلل","prf":"wárghlul","pprtp":"ورغلی","pprtf":"wărghúley","tppp":"ورغی","tppf":"wărghey","noOo":true,"separationAtP":2,"separationAtF":3,"ec":"come,comes,coming,came,come"});
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

describe("past participles", () => {
  test("for most verbs are just the imperfective root (imperative) plus ی - ey", () => {
    expect(getPastParticiple(rasedul, "active", { gender: "masc", number: "singular" }))
      .toEqual({
        type: "VB",
        ps: [{ p: "رسېدلی", f: "rasedúley" }],
        gender: "masc",
        number: "singular",
      });
    expect(getPastParticiple(ganul, "active", { gender: "fem", number: "singular" }))
      .toEqual({
        type: "VB",
        ps: [{ p: "ګڼلې", f: "gaNúle" }],
        gender: "fem",
        number: "singular",
      });
  });
  test("for verbs like اېښودل and پرېښودل they have a short version shortened taking off after ښ", () => {
    expect(getPastParticiple(prexodul, "active", { gender: "masc", number: "plural" }))
      .toEqual({
        type: "VB",
        ps: {
          long: [{ p: "پرېښودلي", f: "prexodúlee" }],
          short: [{ p: "پرېښي", f: "préxee" }],
        },
        gender: "masc",
        number: "plural",
      });
  });
  test("verbs ending in ستل ښتل وتل or وړل verbs also have a short version", () => {
    expect(getPastParticiple(raawustul, "active", { gender: "fem", number: "plural" }))
      .toEqual({
        type: "VB",
        ps: {
          long: [{ p: "راوستلې", f: "raawustúle" }],
          short: [{ p: "راوستې", f: "raawúste" }],
        },
        gender: "fem",
        number: "plural",
      });
    expect(getPastParticiple(awuxtul, "active", { gender: "masc", number: "plural" }))
      .toEqual({
        type: "VB",
        ps: {
          long: [{ p: "اوښتلي", f: "awUxtúlee" }],
          short: [{ p: "اوښتي", f: "awÚxtee" }],
        },
        gender: "masc",
        number: "plural",
      });
    expect(getPastParticiple(watul, "active", { gender: "fem", number: "singular" }))
      .toEqual({
        type: "VB",
        ps: {
          long: [{ p: "وتلې", f: "watúle" }],
          short: [{ p: "وتې", f: "wáte" }],
        },
        gender: "fem",
        number: "singular",
      });
  });
  test("but not verbs ending with استل", () => {
    expect(getPastParticiple(kenaastul, "active", { gender: "fem", number: "plural" }))
      .toEqual({
        type: "VB",
        ps: [{ p: "کېناستلې", f: "kenaastúle" }],
        gender: "fem",
        number: "plural",
      });
  });
  test("kawul/kedul verbs have an irregular pprt fields that give us the irregular past participle", () => {
    expect(getPastParticiple(kawulDyn, "active", { gender: "masc", number: "singular" }))
      .toEqual({
        type: "VB",
        ps: [{ p: "کړی", f: "kúRey" }],
        gender: "masc",
        number: "singular",
      });
    expect(getPastParticiple(kawulStat, "active", { gender: "masc", number: "plural" }))
      .toEqual({
        type: "VB",
        ps: [{ p: "کړي", f: "kúRee" }],
        gender: "masc",
        number: "plural",
      });
    expect(getPastParticiple(kedulStat, "active", { gender: "fem", number: "singular" }))
      .toEqual({
        type: "VB",
        ps: [{ p: "شوې", f: "shúwe" }],
        gender: "fem",
        number: "singular",
      });
    expect(getPastParticiple(kedulDyn, "active", { gender: "fem", number: "plural" }))
      .toEqual({
        type: "VB",
        ps: [{ p: "شوې", f: "shúwe" }],
        gender: "fem",
        number: "plural",
      });
  });
  
});

// const ooPh: T.PH = {
//   type: "PH",
//   ps: { p: "و", f: "óo" },
// };

// type RootsAndStemsTestGroup = {
//   verb: T.VerbEntry,
//   result: Record<"stem" | "root", {
//     imperfective: T.RootStemOutput,
//     perfective: T.RootStemOutput,
//   }>
// }[];

// const rootsAndStemsTests: {
//   title: string,
//   testGroup: RootsAndStemsTestGroup,
// }[] =
//   [
//     {
//       title: "regular verbs",
//       testGroup: [
//         {
//           verb: weshul,
//           result: {
//             stem: {
//               perfective: [
//                 ooPh,
//                 [{ p: "وېش", f: "wesh" }],
//               ],
//               imperfective: [
//                 [{ p: "وېش", f: "wesh" }],
//               ],
//             },
//             root: {
//               perfective: [
//                 ooPh,
//                 {
//                   long: [{ p: "وېشل", f: "weshul" }],
//                   short: [{ p: "وېش", f: "wesh" }],
//                 },
//               ],
//               imperfective: [
//                 {
//                   long: [{ p: "وېشل", f: "weshúl" }],
//                   short: [{ p: "وېش", f: "weshX" }],
//                 },
//               ],
//             },
//           },
//         },
//         {
//           verb: ganul,
//           result: {
//             stem: {
//               perfective: [
//                 ooPh,
//                 [{ p: "ګڼ", f: "gaN" }],
//               ],
//               imperfective: [
//                 [{ p: "ګڼ", f: "gaN" }],
//               ],
//             },
//             root: {
//               perfective: [
//                 ooPh,
//                 {
//                   long: [{ p: "ګڼل", f: "gaNul" }],
//                   short: [{ p: "ګڼ", f: "gaN" }],
//                 },
//               ],
//               imperfective: [
//                 {
//                   long: [{ p: "ګڼل", f: "gaNúl" }],
//                   short: [{ p: "ګڼ", f: "gaNX" }],
//                 },
//               ],
//             },
//           },
//         },
//       ],
//     },
//     {
//       title: "intransitive edul verbs",
//       testGroup: [
//         // without shorter intrans version
//         {
//           verb: ghadzedul,
//           result: {
//             "stem": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "و",
//                     "f": "óo"
//                   }
//                 },
//                 [
//                   {
//                     "p": "غځېد",
//                     "f": "ghadzed"
//                   }
//                 ]
//               ],
//               "imperfective": [
//                 [
//                   {
//                     "p": "غځېږ",
//                     "f": "ghadzéG"
//                   }
//                 ]
//               ]
//             },
//             "root": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "و",
//                     "f": "óo"
//                   }
//                 },
//                 {
//                   "long": [
//                     {
//                       "p": "غځېدل",
//                       "f": "ghadzedul"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "غځېد",
//                       "f": "ghadzed"
//                     }
//                   ]
//                 }
//               ],
//               "imperfective": [
//                 {
//                   "long": [
//                     {
//                       "p": "غځېدل",
//                       "f": "ghadzedúl"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "غځېد",
//                       "f": "ghadzedX"
//                     },
//                   ],
//                 },
//               ],
//             },
//           },
//         },
//         // with shorter intrans version
//         {
//           verb: rasedul,
//           result: {
//             "stem": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "و",
//                     "f": "óo"
//                   }
//                 },
//                 [
//                   {
//                     "p": "رسېد",
//                     "f": "rased"
//                   }
//                 ]
//               ],
//               "imperfective": [
//                 {
//                   "long": [
//                     {
//                       "p": "رسېږ",
//                       "f": "raséG"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "رس",
//                       "f": "ras"
//                     }
//                   ]
//                 }
//               ]
//             },
//             "root": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "و",
//                     "f": "óo"
//                   }
//                 },
//                 {
//                   "long": [
//                     {
//                       "p": "رسېدل",
//                       "f": "rasedul"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "رسېد",
//                       "f": "rased"
//                     }
//                   ]
//                 }
//               ],
//               "imperfective": [
//                 {
//                   "long": [
//                     {
//                       "p": "رسېدل",
//                       "f": "rasedúl"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "رسېد",
//                       "f": "rasedX"
//                     }
//                   ]
//                 }
//               ]
//             }
//           },
//         },
//       ],
//     },
//     {
//       title: "verbs with irregular stems",
//       testGroup: [
//         {
//           verb: khorul,
//           result: {
//             stem: {
//               perfective: [
//                 ooPh,
//                 [{ p: "خور", f: "khor" }],
//               ],
//               imperfective: [
//                 [{ p: "خور", f: "khor" }],
//               ],
//             },
//             root: {
//               perfective: [
//                 ooPh,
//                 {
//                   long: [{ p: "خوړل", f: "khoRul" }],
//                   short: [{ p: "خوړ", f: "khoR" }],
//                 },
//               ],
//               imperfective: [
//                 {
//                   long: [{ p: "خوړل", f: "khoRúl" }],
//                   short: [{ p: "خوړ", f: "khoRX" }],
//                 },
//               ],
//             },
//           },
//         },
//         {
//           verb: khatul,
//           result: {
//             stem: {
//               perfective: [
//                 ooPh,
//                 [{ p: "خېژ", f: "khejz" }],
//               ],
//               imperfective: [
//                 [{ p: "خېژ", f: "khejz" }],
//               ],
//             },
//             root: {
//               perfective: [
//                 ooPh,
//                 {
//                   long: [{ p: "ختل", f: "khatul" }],
//                   short: [{ p: "خت", f: "khat" }],
//                 },
//               ],
//               imperfective: [
//                 {
//                   long: [{ p: "ختل", f: "khatúl" }],
//                   short: [{ p: "خت", f: "khatX" }],
//                 },
//               ],
//             },
//           },
//         },
//       ],
//     },
//     {
//       title: "verbs with special prefix behavior",
//       testGroup: [
//         {
//           verb: achawul,
//           result: {
//             "stem": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "وا",
//                     "f": "wáa"
//                   }
//                 },
//                 [
//                   {
//                     "p": "چو",
//                     "f": "chaw"
//                   }
//                 ]
//               ],
//               "imperfective": [
//                 [
//                   {
//                     "p": "اچو",
//                     "f": "achaw"
//                   }
//                 ]
//               ]
//             },
//             "root": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "وا",
//                     "f": "wáa"
//                   }
//                 },
//                 {
//                   "long": [
//                     {
//                       "p": "چول",
//                       "f": "chawul"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "چو",
//                       "f": "chaw"
//                     }
//                   ]
//                 }
//               ],
//               "imperfective": [
//                 {
//                   "long": [
//                     {
//                       "p": "اچول",
//                       "f": "achawúl"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "اچو",
//                       "f": "achawX"
//                     }
//                   ]
//                 }
//               ]
//             }
//           },
//         },
//         {
//           verb: watul,
//           result: {
//             "stem": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "wÚ",
//                     "f": "و"
//                   }
//                 },
//                 [
//                   {
//                     "p": "وځ",
//                     "f": "oodz"
//                   }
//                 ]
//               ],
//               "imperfective": [
//                 [
//                   {
//                     "p": "وځ",
//                     "f": "oodz"
//                   }
//                 ]
//               ]
//             },
//             "root": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "و",
//                     "f": "óo"
//                   }
//                 },
//                 {
//                   "long": [
//                     {
//                       "p": "وتل",
//                       "f": "watul"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "وت",
//                       "f": "wat"
//                     }
//                   ]
//                 }
//               ],
//               "imperfective": [
//                 {
//                   "long": [
//                     {
//                       "p": "وتل",
//                       "f": "watúl"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "وت",
//                       "f": "watX"
//                     }
//                   ]
//                 }
//               ]
//             }
//           },
//         },
//         {
//           verb: azmoyul,
//           result: {
//             "stem": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "و ",
//                     "f": "óo`"
//                   }
//                 },
//                 [
//                   {
//                     "p": "ازموی",
//                     "f": "azmoy"
//                   }
//                 ]
//               ],
//               "imperfective": [
//                 [
//                   {
//                     "p": "ازموی",
//                     "f": "azmoy"
//                   }
//                 ]
//               ]
//             },
//             "root": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "و ",
//                     "f": "óo`"
//                   }
//                 },
//                 {
//                   "long": [
//                     {
//                       "p": "ازمویل",
//                       "f": "azmoyul"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "ازموی",
//                       "f": "azmoy"
//                     }
//                   ]
//                 }
//               ],
//               "imperfective": [
//                 {
//                   "long": [
//                     {
//                       "p": "ازمویل",
//                       "f": "azmoyúl"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "ازموی",
//                       "f": "azmoyX"
//                     }
//                   ]
//                 }
//               ]
//             }
//           },
//         },
//       ],
//     },
//     {
//       title: "verbs with seperable oo prefix",
//       testGroup: [
//         {
//           verb: kenaastul,
//           result: {
//             "stem": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "کې",
//                     "f": "ké"
//                   }
//                 },
//                 [
//                   {
//                     "p": "ن",
//                     "f": "n"
//                   }
//                 ]
//               ],
//               "imperfective": [
//                 [
//                   {
//                     "p": "کېن",
//                     "f": "ken"
//                   }
//                 ]
//               ]
//             },
//             "root": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "کې",
//                     "f": "ké"
//                   }
//                 },
//                 {
//                   "long": [
//                     {
//                       "p": "ناستل",
//                       "f": "naastul"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "ناست",
//                       "f": "naast"
//                     }
//                   ]
//                 }
//               ],
//               "imperfective": [
//                 {
//                   "long": [
//                     {
//                       "p": "کېناستل",
//                       "f": "kenaastúl"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "کېناست",
//                       "f": "kenaastX"
//                     }
//                   ]
//                 }
//               ]
//             }
//           },
//         },
//       ],
//     },
//     {
//       title: "verbs with irregular roots and stems",
//       testGroup: [
//         {
//           verb: wurul,
//           result: {
//             "stem": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "یو",
//                     "f": "yó"
//                   }
//                 },
//                 [
//                   {
//                     "p": "س",
//                     "f": "s"
//                   }
//                 ]
//               ],
//               "imperfective": [
//                 [
//                   {
//                     "p": "وړ",
//                     "f": "wuR"
//                   }
//                 ]
//               ]
//             },
//             "root": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "یو",
//                     "f": "yó"
//                   }
//                 },
//                 {
//                   "long": [
//                     {
//                       "p": "ړل",
//                       "f": "Rul"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "ړ",
//                       "f": "R"
//                     }
//                   ]
//                 }
//               ],
//               "imperfective": [
//                 {
//                   "long": [
//                     {
//                       "p": "وړل",
//                       "f": "wuRúl"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "وړ",
//                       "f": "wuRX"
//                     }
//                   ]
//                 }
//               ]
//             }
//           }
//         },
//         {
//           verb: kexodul,
//           result: {
//             "stem": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "کې",
//                     "f": "ké"
//                   }
//                 },
//                 [
//                   {
//                     "p": "ږد",
//                     "f": "Gd"
//                   }
//                 ]
//               ],
//               "imperfective": [
//                 [
//                   {
//                     "p": "ږد",
//                     "f": "Gd"
//                   }
//                 ]
//               ]
//             },
//             "root": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "کې",
//                     "f": "ké"
//                   }
//                 },
//                 {
//                   "long": [
//                     {
//                       "p": "ښودل",
//                       "f": "xodul"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "ښود",
//                       "f": "xod"
//                     }
//                   ]
//                 }
//               ],
//               "imperfective": [
//                 {
//                   "long": [
//                     {
//                       "p": "کېښودل",
//                       "f": "kexodúl"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "کېښود",
//                       "f": "kexodX"
//                     }
//                   ]
//                 }
//               ]
//             }
//           },
//         },
//       ],
//     },
//     {
//       title: "especially irregular verbs",
//       testGroup: [
//         {
//           verb: kedulStat,
//           result: {
//             "stem": {
//               "perfective": [
//                 [
//                   {
//                     "p": "ش",
//                     "f": "sh"
//                   }
//                 ]
//               ],
//               "imperfective": [
//                 [
//                   {
//                     "p": "کېږ",
//                     "f": "kéG",
//                   },
//                 ]
//               ]
//             },
//             "root": {
//               "perfective": [
//                 {
//                   "long": [
//                     {
//                       "p": "شول",
//                       "f": "shwul"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "شو",
//                       "f": "shw"
//                     }
//                   ]
//                 }
//               ],
//               "imperfective": [
//                 {
//                   "long": [
//                     {
//                       "p": "کېدل",
//                       "f": "kedúl"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "کېد",
//                       "f": "kedX"
//                     }
//                   ]
//                 }
//               ]
//             }
//           },
//         },
//         {
//           verb: kedulDyn,
//           result: {
//             "stem": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "f": "óo",
//                     "p": "و"
//                   }
//                 },
//                 [
//                   {
//                     "p": "ش",
//                     "f": "sh"
//                   }
//                 ]
//               ],
//               "imperfective": [
//                 [
//                   {
//                     "p": "کېږ",
//                     "f": "kéG"
//                   }
//                 ]
//               ]
//             },
//             "root": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "f": "óo",
//                     "p": "و"
//                   }
//                 },
//                 {
//                   "long": [
//                     {
//                       "p": "شول",
//                       "f": "shwul"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "شو",
//                       "f": "shw"
//                     }
//                   ]
//                 }
//               ],
//               "imperfective": [
//                 {
//                   "long": [
//                     {
//                       "p": "کېدل",
//                       "f": "kedúl"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "کېد",
//                       "f": "kedX"
//                     }
//                   ]
//                 }
//               ]
//             }
//           },
//         },
//         {
//           verb: kawulStat,
//           result: {
//             "stem": {
//               "perfective": [{
//                 long: [
//                   {
//                     "p": "کړ",
//                     "f": "kR"
//                   }
//                 ],
//                 short: [
//                   {
//                     p: "ک",
//                     f: "k",
//                   },
//                 ],
//               }],
//               "imperfective": [
//                 [
//                   {
//                     "p": "کو",
//                     "f": "kaw"
//                   }
//                 ]
//               ]
//             },
//             "root": {
//               "perfective": [
//                 {
//                   "long": [
//                     {
//                       "p": "کړل",
//                       "f": "kRul"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "کړ",
//                       "f": "kR"
//                     }
//                   ],
//                   "mini": [
//                     {
//                       "p": "ک",
//                       "f": "k",
//                     },
//                   ],
//                 }
//               ],
//               "imperfective": [
//                 {
//                   "long": [
//                     {
//                       "p": "کول",
//                       "f": "kawúl"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "کو",
//                       "f": "kawX"
//                     }
//                   ]
//                 }
//               ]
//             }
//           },
//         },
//         {
//           verb: kawulDyn,
//           result: {
//             "stem": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "و",
//                     "f": "óo",
//                   }
//                 },
//                 {
//                   long: [
//                     {
//                       "p": "کړ",
//                       "f": "kR"
//                     },
//                   ],
//                   short: [
//                     { p: "ک", f: "k" },
//                   ],
//                 },
//               ],
//               "imperfective": [
//                 [
//                   {
//                     "p": "کو",
//                     "f": "kaw"
//                   }
//                 ]
//               ]
//             },
//             "root": {
//               "perfective": [
//                 {
//                   "type": "PH",
//                   "ps": {
//                     "p": "و",
//                     "f": "óo",
//                   },
//                 },
//                 {
//                   "long": [
//                     {
//                       "p": "کړل",
//                       "f": "kRul"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "کړ",
//                       "f": "kR"
//                     }
//                   ],
//                   "mini": [
//                     { p: "ک", f: "k" },
//                   ],
//                 },
//               ],
//               "imperfective": [
//                 {
//                   "long": [
//                     {
//                       "p": "کول",
//                       "f": "kawúl"
//                     }
//                   ],
//                   "short": [
//                     {
//                       "p": "کو",
//                       "f": "kawX"
//                     }
//                   ]
//                 }
//               ]
//             }
//           },
//         }
//       ],
//     }
//   ];

// rootsAndStemsTests.forEach(({ title, testGroup }) => {
//   test(title, () => {
//     testGroup.forEach(({ verb, result }) => {
//       expect(getAllRs(verb)).toEqual(result);
//     });
//   });
// });
