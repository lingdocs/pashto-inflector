import * as T from "../../../types";
import { getPastParticiple, getRootStem } from "./roots-and-stems";
import { vEntry } from "./rs-helpers";

const wahul = vEntry({"ts":1527815399,"i":15049,"p":"وهل","f":"wahul","g":"wahul","e":"to hit","r":4,"c":"v. trans.","tppp":"واهه","tppf":"waahu","ec":"hit,hits,hitting,hit,hit"});
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
const bayaanedul = vEntry(
  {"ts":1659037345120,"i":2055,"p":"بیانېدل","f":"bayaanedúl","g":"bayaanedul","e":"to be described, told, narrated, explained, declared","r":4,"c":"v. stat. comp. intrans.","l":1527814259},
  {"ts":1527814259,"i":2052,"p":"بیان","f":"bayáan","g":"bayaan","e":"description, statement, speaking, narration, sermon","r":4,"c":"n. m.","app":"بیانات","apf":"bayaanaat"},
);
const khufaKedul = vEntry(
  {"ts":1577898920635,"i":5845,"p":"خفه کېدل","f":"khufa kedul","g":"khufakedul","e":"to become sad, grieved, annoyed, upset; to be choked, to suffocate","r":4,"c":"v. stat. comp. intrans.","l":1527812798,"ec":"become","ep":"sad"},
  {"ts":1527812798,"i":5843,"p":"خفه","f":"khufa","g":"khufa","e":"sad, upset, angry; choked, suffocated","r":4,"c":"adj."},
);

const ooPH: T.PH= { type: "PH", ps: { p: "و", f: "óo" }};

describe("imperfective stems", () => {
  const tests: {
    title: string,
    tests: {
      verb: T.VerbEntry,
      genderNumber?: T.GenderNumber,
      result: T.RootsStemsOutput,
    }[],
  }[] = [
    {
      title: "is the shortened infinitive for regular verbs",
      tests: [
        {
          verb: ganul,
          result: [[], [{ type: "VB", ps: [{ p: "ګڼ", f: "gaN" }]}]],
        },
        {
          verb: wahul,
          result: [[], [{ type: "VB", ps: [{ p: "وه", f: "wah" }]}]],
        },
      ],
    },
    {
      title: "-awul verbs have a trailing accent",
      tests: [
        {
          verb: achawul,
          genderNumber: { gender: "masc", number: "singular" },
          result: [
            [],
            [
              {
                type: "VB",
                ps: [{ p: "اچو", f: "achawX" }],
              },
            ],
          ],
        },
      ],
    },
    {
      title: "is the -eG for for regular intransitive verbs",
      tests: [
        {
          verb: ghadzedul,
          result: [[], [{ type: "VB", ps: [{ p: "غځېږ", f: "ghadzéG" }]}]],
        },
        {
          verb: rasedul,
          result: [[], [{
            type: "VB",
            ps: {
              long: [{ p: "رسېږ", f: "raséG" }],
              short: [{ p: "رس", f: "ras" }],
            },
          }]],
        },
      ],
    },
    {
      title: "is the special imperfective stem for irregular verbs with a special imperfective stem",
      tests: [
        {
          verb: khorul,
          result: [[], [{ type: "VB", ps: [{ p: "خور", f: "khor" }]}]],
        },
        {
          verb: kexodul,
          result: [[], [{ type: "VB", ps: [{ p: "ږد", f: "Gd" }] }]],
        },
      ],
    },
    {
      title: "is the fused word for stative compounds that swallow the k",
      tests: [
        {
          verb: bandawul,
          genderNumber: { gender: "masc", number: "singular" },
          result: [[], [{ type: "VB", ps: [{ p: "بندو", f: "bandawX" }]}]],
        },
        {
          verb: bandedul,
          genderNumber: { gender: "masc", number: "singular" },
          result: [[], [{ type: "VB", ps: [{ p: "بندېږ", f: "bandéG" }]}]],
        },
      ],
    },
    {
      title: "is welded together with the complement on seperated stative compounds",
      tests: [
        {
          verb: stureyKawul,
          genderNumber: { gender: "fem", number: "singular" },
          result: [[], [{
            type: "welded",
            left: {
              type: "NComp",
              comp: {
                type: "AdjComp",
                ps: { p: "ستړې", f: "stuRe" },
                number: "singular",
                gender: "fem",
              },
            },
            right: {
              type: "VB",
              ps: [{ p: "کو", f: "kawX" }],
            },
          }]],
        },
        {
          verb: stureyKedul,
          genderNumber: { gender: "fem", number: "singular" },
          result: [[], [{
            type: "welded",
            left: {
              type: "NComp",
              comp: {
                type: "AdjComp",
                ps: { p: "ستړې", f: "stuRe" },
                number: "singular",
                gender: "fem",
              },
            },
            right: {
              type: "VB",
              ps: [{ p: "کېږ", f: "kéG" }],
            },
          }]],
        },
      ]
    }
  ];
  tests.forEach(x => {
    test(x.title, () => {
      x.tests.forEach(y => {
        expect(getRootStem({
          verb: y.verb,
          aspect: "imperfective",
          type: "basic",
          rs: "stem",
          voice: "active",
          genderNumber: y.genderNumber || {
            gender: "masc",
            number: "singular",
          },
        })).toEqual(y.result);
      });
    })
  });
});

describe("imperfective roots", () => {
  const tests: {
    title: string,
    tests: {
      verb: T.VerbEntry,
      genderNumber?: T.GenderNumber,
      result: T.RootsStemsOutput,
    }[],
  }[] = [
    {
      title: "is the infinitive with and without ل for regular verbs, with a trailing accent on the short form",
      tests: [
        {
          verb: wahul,
          result: [[], [{
            type: "VB",
            ps: {
                long: [{ p: "وهل", f: "wahúl" }],
                short: [{ p: "وه", f: "wahX" }],
              },
            }]
          ],
        },
      ],
    },
    {
      title: "is the fused word for stative compounds that swallow the k",
      tests: [
        {
          verb: bandawul,
          genderNumber: { gender: "masc", number: "singular" },
          result: [
            [],
            [
              { 
                type: "VB",
                ps: {
                  long: [{ p: "بندول", f: "bandawúl" }],
                  short: [{ p: "بندو", f: "bandawX" }],
                }
              },
            ],
          ],
        },
        {
          verb: bandedul,
          genderNumber: { gender: "masc", number: "singular" },
          result: [
            [],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "بندېدل", f: "bandedúl" }],
                  short: [{ p: "بندېد", f: "bandedX" }]
                },
              },
            ],
          ],
        },
      ],
    },
    {
      title: "is welded together with the complement on seperated stative compounds",
      tests: [
        {
          verb: stureyKawul,
          genderNumber: { gender: "fem", number: "singular" },
          result: [[], [{
            type: "welded",
            left: {
              type: "NComp",
              comp: {
                type: "AdjComp",
                ps: { p: "ستړې", f: "stuRe" },
                number: "singular",
                gender: "fem",
              },
            },
            right: {
              type: "VB",
              ps: {
                long: [{ p: "کول", f: "kawúl" }],
                short: [{ p: "کو", f: "kawX" }],
              },
            },
          }]],
        },
        {
          verb: stureyKedul,
          genderNumber: { gender: "fem", number: "singular" },
          result: [[], [{
            type: "welded",
            left: {
              type: "NComp",
              comp: {
                type: "AdjComp",
                ps: { p: "ستړې", f: "stuRe" },
                number: "singular",
                gender: "fem",
              },
            },
            right: {
              type: "VB",
              ps: {
                long: [{ p: "کېدل", f: "kedúl" }],
                short: [{ p: "کېد", f: "kedX" }],
              },
            },
          }]],
        },
      ]
    }
  ];
  tests.forEach(x => {
    test(x.title, () => {
      x.tests.forEach(y => {
        expect(getRootStem({
          verb: y.verb,
          aspect: "imperfective",
          type: "basic",
          rs: "root",
          voice: "active",
          genderNumber: y.genderNumber || {
            gender: "masc",
            number: "singular",
          },
        })).toEqual(y.result);
      });
    })
  });
});

describe("perfective stems", () => {
  const tests: {
    title: string,
    tests: {
      verb: T.VerbEntry,
      genderNumber?: T.GenderNumber,
      result: T.RootsStemsOutput,
    }[],
  }[] = [
    {
      title: "is the imprefective stem with an oo- prefix for regular verbs",
      tests: [
        {
          verb: ganul,
          result: [
            [ooPH],
            [{ type: "VB", ps: [{ p: "ګڼ", f: "gaN" }]}],
          ],
        },
        {
          verb: wahul,
          result: [[ooPH], [{ type: "VB", ps: [{ p: "وه", f: "wah" }]}]],
        },
      ],
    },
    {
      title: "is the -eG for for regular intransitive verbs",
      tests: [
        {
          verb: ghadzedul,
          result: [[ooPH], [{ type: "VB", ps: [{ p: "غځېږ", f: "ghadzeG" }]}]],
        },
        {
          verb: rasedul,
          result: [
            [ooPH],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "رسېږ", f: "raseG" }],
                  short: [{ p: "رس", f: "ras" }],
                },
              },
            ],
          ],
        },
      ],
    },
    {
      title: "the imperfective stem the perfective stem is regularly built off could be irregular",
      tests: [
        {
          verb: khorul,
          result: [[ooPH], [{ type: "VB", ps: [{ p: "خور", f: "khor" }]}]],
        },
      ],
    },
    {
      title: "is the irregular perfective stem if the entry has a ssp/ssf",
      tests: [
        {
          verb: wurul,
          result: [
            [{ type: "PH", ps: { p: "یو", f: "yó" }}],
            [{ type: "VB", ps: [{ p: "س", f: "s" }]}],
          ],
        }
      ]
    },
    {
      title: "includes extra irregular short roots for kawul verbs",
      tests: [
        {
          verb: kawulDyn,
          result: [
            [ooPH],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "کړ", f: "kR" }],
                  short: [{ p: "ک", f: "k" }],
                },
              },
            ]
          ],
        },
      ],
    },
    {
      title: "doesn't have a perfective head for kawul stative",
      tests: [
        {
          verb: kawulStat,
          result: [
            [],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "کړ", f: "kR" }],
                  short: [{ p: "ک", f: "k" }],
                },
              },
            ]
          ],
        },
      ],
    },
    {
      title: "has a perfective head from kawul dynamic",
      tests: [
        {
          verb: kawulDyn,
          result: [
            [ooPH],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "کړ", f: "kR" }],
                  short: [{ p: "ک", f: "k" }],
                },
              },
            ],
          ],
        },
      ],
    },
    {
      title: "irregular, inflecting stem for tlul",
      tests: [
        {
          verb: tlul,
          genderNumber: { gender: "fem", number: "singular" },
          result: [
            [{ type: "PH", ps: { p: "لاړه ", f: "láaRa " }}],
            [
              { type: "VB", ps: [{ p: "ش", f: "sh" }]},
            ],
          ],
        },
        {
          verb: tlul,
          genderNumber: { gender: "fem", number: "plural" },
          result: [
            [{ type: "PH", ps: { p: "لاړې ", f: "láaRe " }}],
            [
              { type: "VB", ps: [{ p: "ش", f: "sh" }]},
            ],
          ],
        },
        {
          verb: tlul,
          genderNumber: { gender: "masc", number: "plural" },
          result: [
            [{ type: "PH", ps: { p: "لاړ ", f: "láaR " }}],
            [
              { type: "VB", ps: [{ p: "ش", f: "sh" }]},
            ],
          ],
        },
      ],
    },
    {
      title: "broken apart with complement seperately in the perfective",
      tests: [
        {
          verb: bandawul,
          genderNumber: { gender: "masc", number: "singular" },
          result: [
            [
              {
                type: "NComp",
                comp: {
                  type: "AdjComp",
                  ps: { p: "بند", f: "bánd" },
                  gender: "masc",
                  number: "singular",
                },
              },
            ],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "کړ", f: "kR" }],
                  short: [{ p: "ک", f: "k" }],
                },
              },
            ],
          ],
        },
        {
          verb: bandedul,
          genderNumber: { gender: "fem", number: "plural" },
          result: [
            [
              {
                type: "NComp",
                comp: {
                  type: "AdjComp",
                  ps: { p: "بندې", f: "bánde" },
                  gender: "fem",
                  number: "plural",
                },
              },
            ],
            [
              {
                type: "VB",
                ps: [{ p: "ش", f: "sh" }],
              },
            ],
          ],
        },
        {
          verb: stureyKedul,
          genderNumber: { gender: "masc", number: "plural" },
          result: [
            [
              {
                type: "NComp",
                comp: {
                  type: "AdjComp",
                  ps: { p: "ستړي", f: "stúRee" },
                  gender: "masc",
                  number: "plural",
                },
              },
            ],
            [
              {
                type: "VB",
                ps: [{ p: "ش", f: "sh" }],
              },
            ],
          ],
        },
        // noun complements don't inflect
        {
          verb: bayaanedul,
          genderNumber: { gender: "fem", number: "plural" },
          result: [
            [
              {
                type: "NComp",
                comp: {
                  type: "Comp",
                  ps: { p: "بیان", f: "bayáan" },
                },
              },
            ],
            [
              {
                type: "VB",
                ps: [{ p: "ش", f: "sh" }],
              },
            ],
          ],
        },
        // some adjectives can't inflect
        {
          verb: khufaKedul,
          genderNumber: { gender: "fem", number: "plural" },
          result: [
            [
              {
                type: "NComp",
                comp: {
                  type: "AdjComp",
                  ps: { p: "خفه", f: "khufa" },
                  gender: "fem",
                  number: "plural",
                },
              },
            ],
            [
              {
                type: "VB",
                ps: [{ p: "ش", f: "sh" }],
              },
            ],
          ],
        },
      ],
    },
    {
      title: "special/unusual heads for perfective split",
      tests: [
        {
          verb: azmoyul,
          genderNumber: { gender: "masc", number: "plural" },
          result: [
            [
              { type: "PH", ps: { p: "و ", f: "óo`" }},
            ],
            [
              {
                type: "VB",
                ps: [{ p: "ازموی", f: "azmoy" }],
              },
            ],
          ],
        },
        {
          verb: achawul,
          genderNumber: { gender: "masc", number: "plural" },
          result: [
            [
              { type: "PH", ps: { p: "وا", f: "wáa" }},
            ],
            [
              {
                type: "VB",
                ps: [{ p: "چو", f: "chaw" }],
              },
            ],
          ],
        },
        {
          verb: watul,
          genderNumber: { gender: "masc", number: "plural" },
          result: [
            [
              { type: "PH", ps: { p: "و", f: "wÚ" }},
            ],
            [
              { type: "VB", ps: [{ p: "وځ", f: "oodz" }]},
            ],
          ],
        },
        {
          verb: osedul,
          genderNumber: { gender: "masc", number: "plural" },
          result: [
            [
              { type: "PH", ps: { p: "و", f: "óo`" }},
            ],
            [
              {
                type: "VB",
                ps: {
                  short: [{ p: "اوس", f: "os" }],
                  long: [{ p: "اوسېږ", f: "oseG" }],
                },
              },
            ],
          ],
        },
      ],
    },
  ];
  tests.forEach(x => {
    test(x.title, () => {
      x.tests.forEach(y => {
        expect(getRootStem({
          verb: y.verb,
          aspect: "perfective",
          type: "basic",
          rs: "stem",
          voice: "active",
          genderNumber: y.genderNumber || {
            gender: "masc",
            number: "singular",
          },
        })).toEqual(y.result);
      });
    })
  });
});

describe("perfective roots", () => {
  const tests: {
    title: string,
    tests: {
      verb: T.VerbEntry,
      genderNumber?: T.GenderNumber,
      result: T.RootsStemsOutput,
    }[],
  }[] = [
    {
      title: "is the imprefective root with an oo- prefix for regular verbs",
      tests: [
        {
          verb: ganul,
          result: [
            [ooPH],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "ګڼل", f: "gaNul" }],
                  short: [{ p: "ګڼ", f: "gaN" }],
                },
              },
            ],
          ],
        },
        {
          verb: wahul,
          result: [
            [ooPH],
            [
              { 
                type: "VB",
                ps: {
                  long: [{ p: "وهل", f: "wahul" }],
                  short: [{ p: "وه", f: "wah" }],
                },
              },
            ],
          ],
        },
      ],
    },
    {
      title: "is the irregular perfective root if the entry has a ssp/ssf",
      tests: [
        {
          verb: wurul,
          result: [
            [{ type: "PH", ps: { p: "یو", f: "yó" }}],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "ړل", f: "Rul" }],
                  short: [{ p: "ړ", f: "R" }],
                }
              },
            ],
          ],
        },
      ],
    },
    {
      title: "includes extra irregular short roots for kawul verbs",
      tests: [
        {
          verb: kawulDyn,
          result: [
            [ooPH],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "کړل", f: "kRul" }],
                  short: [{ p: "کړ", f: "kR" }],
                  mini: [{ p: "ک", f: "k" }],
                },
              },
            ],
          ],
        },
      ],
    },
    {
      title: "doesn't have a perfective head for kawul stative",
      tests: [
        {
          verb: kawulStat,
          result: [
            [],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "کړل", f: "kRul" }],
                  short: [{ p: "کړ", f: "kR" }],
                  mini: [{ p: "ک", f: "k" }],
                },
              },
            ]
          ],
        },
      ],
    },
    {
      title: "has a perfective head from kawul dynamic",
      tests: [
        {
          verb: kawulDyn,
          result: [
            [ooPH],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "کړل", f: "kRul" }],
                  short: [{ p: "کړ", f: "kR" }],
                  mini: [{ p: "ک", f: "k" }],
                },
              },
            ],
          ],
        },
      ],
    },
    {
      title: "broken apart with complement seperately in the perfective",
      tests: [
        {
          verb: bandawul,
          genderNumber: { gender: "masc", number: "singular" },
          result: [
            [
              {
                type: "NComp",
                comp: {
                  type: "AdjComp",
                  ps: { p: "بند", f: "bánd" },
                  gender: "masc",
                  number: "singular",
                },
              },
            ],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "کړل", f: "kRul" }],
                  short: [{ p: "کړ", f: "kR" }],
                  mini: [{ p: "ک", f: "k" }],
                },
              },
            ],
          ],
        },
        {
          verb: bandedul,
          genderNumber: { gender: "fem", number: "plural" },
          result: [
            [
              {
                type: "NComp",
                comp: {
                  type: "AdjComp",
                  ps: { p: "بندې", f: "bánde" },
                  gender: "fem",
                  number: "plural",
                },
              },
            ],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "شول", f: "shwul" }],
                  short: [{ p: "شو", f: "shw" }],
                }
              },
            ],
          ],
        },
        {
          verb: stureyKedul,
          genderNumber: { gender: "masc", number: "plural" },
          result: [
            [
              {
                type: "NComp",
                comp: {
                  type: "AdjComp",
                  ps: { p: "ستړي", f: "stúRee" },
                  gender: "masc",
                  number: "plural",
                },
              },
            ],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "شول", f: "shwul" }],
                  short: [{ p: "شو", f: "shw" }],
                }
              },
            ],
          ],
        },
      ],
    },
  ];
  tests.forEach(x => {
    test(x.title, () => {
      x.tests.forEach(y => {
        expect(getRootStem({
          verb: y.verb,
          aspect: "perfective",
          type: "basic",
          rs: "root",
          voice: "active",
          genderNumber: y.genderNumber || {
            gender: "masc",
            number: "singular",
          },
        })).toEqual(y.result);
      });
    })
  });
});

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
  test("special short form with تلل - tlul", () => {
    expect(getPastParticiple(tlul, "active", { gender: "masc", number: "plural" }))
      .toEqual({
        type: "VB",
        ps: {
          long: [{ p: "تللي", f: "tlúlee" }],
          short: [{ p: "تلي", f: "túlee" }],
        },
        gender: "masc",
        number: "plural",
      });
  });
  test("kawul/kedul/raatlul verbs have an irregular pprt fields that give us the irregular past participle", () => {
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
  test("stative compounds weld the complement to the kawul/kedul participle", () => {
    expect(getPastParticiple(bandawul, "active", { gender: "fem", number: "singular" }))
      .toEqual({
        type: "welded",
        left: {
          type: "NComp",
          comp: {
            type: "AdjComp",
            ps: { p: "بنده", f: "banda" },
            gender: "fem",
            number: "singular",
          },
        },
        right: {
          type: "VB",
          ps: [{ p: "کړې", f: "kúRe" }],
          gender: "fem",
          number: "singular",
        },
      });
    expect(getPastParticiple(bandedul, "active", { gender: "fem", number: "plural" }))
      .toEqual({
        type: "welded",
        left: {
          type: "NComp",
          comp: {
            type: "AdjComp",
            ps: { p: "بندې", f: "bande" },
            gender: "fem",
            number: "plural",
          },
        },
        right: {
          type: "VB",
          ps: [{ p: "شوې", f: "shúwe" }],
          gender: "fem",
          number: "plural",
        },
      });
  });
  test("for passive with simple verbs, long perfective root welded to kedul participle", () => {
    expect(getPastParticiple(ganul, "passive", { gender: "fem", number: "singular" }))
      .toEqual({
        type: "welded",
        left: {
          type: "VB",
          ps: [{ p: "ګڼل", f: "gaNul" }],
        },
        right: {
          type: "VB",
          ps: [{ p: "شوې", f: "shúwe" }],
          gender: "fem",
          number: "singular",
        },
      });
  });
  test("special passive forms for kawul verbs - kRul perfective root + shúwey", () => {
    expect(getPastParticiple(kawulStat, "passive", { gender: "masc", number: "singular"}))
      .toEqual({
        type: "welded",
        left: {
          type: "VB",
          ps: [{ p: "کړل", f: "kRul" }],
        },
        right: {
          type: "VB",
          ps: [{ p: "شوی", f: "shúwey" }],
          gender: "masc",
          number: "singular",
        },
      });
    expect(getPastParticiple(kawulDyn, "passive", { gender: "masc", number: "singular"}))
      .toEqual({
        type: "welded",
        left: {
          type: "VB",
          ps: [{ p: "کړل", f: "kRul" }],
        },
        right: {
          type: "VB",
          ps: [{ p: "شوی", f: "shúwey" }],
          gender: "masc",
          number: "singular",
        },
      });
    expect(getPastParticiple(bandawul, "passive", { gender: "fem", number: "plural" }))
      .toEqual({
        type: "welded",
        left: {
          type: "welded",
          left: {
            type: "NComp",
            comp: {
              type: "AdjComp",
              ps: { p: "بندې", f: "bande" },
              gender: "fem",
              number: "plural",
            },
          },
          right: {
            type: "VB",
            ps: [{ p: "کړل", f: "kRul" }],
          },
        },
        right: {
          type: "VB",
          ps: [{ "p": "شوې", "f": "shúwe" }],
          gender: "fem",
          number: "plural"
        },
      });
  })
});

describe("ability roots and stems", () => {
  const tests: {
    title: string,
    tests: {
      verb: T.VerbEntry,
      aspect: T.Aspect,
      rs: "root" | "stem",
      genderNumber?: T.GenderNumber,
      result: T.RootsStemsOutput,
      voice: T.Voice,
    }[],
  }[] = [
    {
      title: "is the aspect's root with the ability endings and then the perfective kedul modal verb stem or root",
      tests: [
        {
          verb: khatul,
          aspect: "imperfective",
          rs: "stem",
          voice: "active",
          result: [
            [],
            [
              {
                type: "VB",
                ps: {
                  long: [
                    { p: "ختلی", f: "khatúley" },
                    { p: "ختلای", f: "khatúlaay" },
                  ],
                  short: [
                    { p: "ختی", f: "khatéy" },
                    { p: "ختای", f: "khatáay" },
                  ],
                },
              },
              {
                type: "VB",
                ps: [{ p: "ش", f: "sh" }],
              },
            ],
          ],
        },
        {
          verb: khatul,
          aspect: "perfective",
          rs: "stem",
          voice: "active",
          result: [
            [ooPH],
            [
              {
                type: "VB",
                ps: {
                  long: [
                    { p: "ختلی", f: "khatuley" },
                    { p: "ختلای", f: "khatulaay" },
                  ],
                  short: [
                    { p: "ختی", f: "khatey" },
                    { p: "ختای", f: "khataay" },
                  ],
                },
              },
              {
                type: "VB",
                ps: [{ p: "ش", f: "sh" }],
              },
            ],
          ],
        },
        {
          verb: khatul,
          aspect: "imperfective",
          rs: "root",
          voice: "active",
          result: [
            [],
            [
              {
                type: "VB",
                ps: {
                  long: [
                    { p: "ختلی", f: "khatúley" },
                    { p: "ختلای", f: "khatúlaay" },
                  ],
                  short: [
                    { p: "ختی", f: "khatéy" },
                    { p: "ختای", f: "khatáay" },
                  ],
                },
              },
              {
                type: "VB",
                ps: {
                  long: [{ p: "شول", f: "shwul" }],
                  short: [{ p: "شو", f: "shw" }],
                },
              },
            ],
          ],
        },
        {
          verb: khatul,
          aspect: "perfective",
          rs: "root",
          voice: "active",
          result: [
            [ooPH],
            [
              {
                type: "VB",
                ps: {
                  long: [
                    { p: "ختلی", f: "khatuley" },
                    { p: "ختلای", f: "khatulaay" },
                  ],
                  short: [
                    { p: "ختی", f: "khatey" },
                    { p: "ختای", f: "khataay" },
                  ],
                },
              },
              {
                type: "VB",
                ps: {
                  long: [{ p: "شول", f: "shwul" }],
                  short: [{ p: "شو", f: "shw" }],
                },
              },
            ],
          ],
        },
      ],
    },
    {
      title: "tlul verbs lose the perfective aspect",
      tests: [
        {
          verb: raatlul,
          aspect: "perfective",
          rs: "stem",
          voice: "active",
          result: [
            [],
            [
              {
                type: "VB",
                ps: {
                  long: [
                    { p: "راتللی", f: "raatlúley" },
                    { p: "راتللای", f: "raatlúlaay" },
                  ],
                  short: [
                    { p: "راتلی", f: "raatléy" },
                    { p: "راتلای", f: "raatláay" },
                  ],
                },
              },
              { 
                type: "VB", 
                ps: [{ p: "ش", f: "sh" }],
              },
            ],
          ],
        },
        {
          verb: raatlul,
          aspect: "imperfective",
          rs: "stem",
          voice: "active",
          result: [
            [],
            [
              {
                type: "VB",
                ps: {
                  long: [
                    { p: "راتللی", f: "raatlúley" },
                    { p: "راتللای", f: "raatlúlaay" },
                  ],
                  short: [
                    { p: "راتلی", f: "raatléy" },
                    { p: "راتلای", f: "raatláay" },
                  ],
                },
              },
              { 
                type: "VB", 
                ps: [{ p: "ش", f: "sh" }],
              },
            ],
          ],
        },
      ],
    },
    {
      title: "intransitive stative compounds lose aspect",
      tests: [
        {
          verb: bandedul,
          aspect: "perfective",
          rs: "stem",
          voice: "active",
          result: [
            [],
            [
              {
                type: "VB",
                ps: {
                  long: [
                    { p: "بندېدلی", f: "bandedúley" },
                    { p: "بندېدلای", f: "bandedúlaay" },
                  ],
                  short: [
                    { p: "بندېدی", f: "bandedéy" },
                    { p: "بندېدای", f: "bandedáay" },
                  ],
                },
              },
              { 
                type: "VB", 
                ps: [{ p: "ش", f: "sh" }],
              },
            ],
          ],
        },
      ],
    },
    {
      title: "passive takes the long imperfective passive root (loses aspect), and adds the ability endings",
      tests: [
        {
          verb: achawul,
          aspect: "perfective",
          rs: "stem",
          voice: "passive",
          result: [
            [],
            [
              {
                type: "welded",
                left: {
                  type: "VB",
                  ps: [{ p: "اچول", f: "achawul" }],
                },
                right: {
                  type: "VB",
                  ps: {
                    long: [
                      { p: "کېدلی", f: "kedúley" },
                      { p: "کېدلای", f: "kedúlaay" },
                    ],                    
                    short: [
                      { p: "کېدی", f: "kedéy" },
                      { p: "کېدای", f: "kedáay" },
                    ],                    
                  },
                },
              },
              { 
                type: "VB", 
                ps: [{ p: "ش", f: "sh" }],
              },
            ],
          ],
        },
      ],
    },
  ];
  tests.forEach((x) => {
    test(x.title, () => {
      x.tests.forEach((y) => {
        expect(getRootStem({
          verb: y.verb,
          aspect: y.aspect,
          rs: y.rs,
          genderNumber: y.genderNumber || { gender: "masc", number: "plural" },
          type: "ability",
          voice: y.voice,
        })).toEqual(y.result);
      })
    })
  });
});

describe("passive roots and stems", () => {
  test("root plus kedul", () => {
    expect(getRootStem({
      verb: wahul,
      aspect: "imperfective",
      type: "basic",
      rs: "stem",
      genderNumber: {
        gender: "masc",
        number: "singular",
      },
      voice: "passive",
    })).toEqual([
      [],
      [
        {
          type: "welded",
          left: {
            type: "VB",
            ps: [{ p: "وهل", f: "wahul" }],
          },
          right: {
            type: "VB",
            ps: [{ p: "کېږ", f: "kéG" }],
          },
        },
      ],
    ]);
    expect(getRootStem({
      verb: wahul,
      aspect: "imperfective",
      type: "basic",
      rs: "root",
      genderNumber: {
        gender: "masc",
        number: "singular",
      },
      voice: "passive",
    })).toEqual([
      [],
      [
        {
          type: "welded",
          left: {
            type: "VB",
            ps: [{ p: "وهل", f: "wahul" }],
          },
          right: {
            type: "VB",
            ps: {
              short: [{ p: "کېد", f: "kedX" }],
              long: [{ p: "کېدل", f: "kedúl" }],
            },
          },
        },
      ],
    ]);
    expect(getRootStem({
      verb: wahul,
      aspect: "perfective",
      type: "basic",
      rs: "stem",
      genderNumber: {
        gender: "masc",
        number: "singular",
      },
      voice: "passive",
    })).toEqual([
      [ooPH],
      [
        {
          type: "welded",
          left: {
            type: "VB",
            ps: [{ p: "وهل", f: "wahul" }],
          },
          right: {
            type: "VB",
            ps: [{ p: "ش", f: "sh" }],
          },
        },
      ],
    ]);
    expect(getRootStem({
      verb: wahul,
      aspect: "perfective",
      type: "basic",
      rs: "root",
      genderNumber: {
        gender: "masc",
        number: "singular",
      },
      voice: "passive",
    })).toEqual([
      [ooPH],
      [
        {
          type: "welded",
          left: {
            type: "VB",
            ps: [{ p: "وهل", f: "wahul" }],
          },
          right: {
            type: "VB",
            ps: {
              short: [{ p: "شو", f: "shw" }],
              long: [{ p: "شول", f: "shwul" }],
            },
          },
        },
      ],
    ]);
    expect(getRootStem({
      verb: bandawul,
      aspect: "perfective",
      type: "basic",
      rs: "root",
      genderNumber: {
        gender: "fem",
        number: "singular",
      },
      voice: "passive",
    })).toEqual([
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
          type: "welded",
          left: {
            type: "VB",
            ps: [{ p: "کړل", f: "kRul" }],
          },
          right: {
            type: "VB",
            ps: {
              short: [{ p: "شو", f: "shw" }],
              long: [{ p: "شول", f: "shwul" }],
            },
          },
        },
      ],
    ]);
    expect(getRootStem({
      verb: bandawul,
      aspect: "imperfective",
      type: "basic",
      rs: "root",
      genderNumber: {
        gender: "fem",
        number: "singular",
      },
      voice: "passive",
    })).toEqual([
      [],
      [
        {
          type: "welded",
          left: {
            type: "VB",
            ps: [{ p: "بندول", f: "bandawul" }],
          },
          right: {
            type: "VB",
            ps: {
              short: [{ p: "کېد", f: "kedX" }],
              long: [{ p: "کېدل", f: "kedúl" }],
            },
          },
        },
      ],
    ]);
    expect(getRootStem({
      verb: stureyKawul,
      aspect: "imperfective",
      type: "basic",
      voice: "passive",
      genderNumber: {
        gender: "masc",
        number: "singular",
      },
      rs: "stem",
    })).toEqual([
      [],
      [
        {
          "type": "welded",
          "left": {
            "type": "welded",
            "left": {
              "type": "NComp",
              "comp": {
                "type": "AdjComp",
                "ps": {
                  "p": "ستړی",
                  "f": "stuRey"
                },
                "gender": "masc",
                "number": "singular"
              }
            },
            "right": {
              "type": "VB",
              "ps": [
                {
                  "p": "کول",
                  "f": "kawul"
                }
              ]
            }
          },
          "right": {
            "type": "VB",
            "ps": [
              {
                "p": "کېږ",
                "f": "kéG"
              }
            ]
          },
        }
      ]
    ]);
  });
});
