import * as T from "../../types";
import { renderVerb } from "./render-verb";

function vEntry(e: any, c?: any): T.VerbEntry {
  return {
    entry: e,
    ...c ? {
      c,
    } : {},
  } as T.VerbEntry;
}

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

test("various tenses with simple verbs", () => {
  const tests: { verb: T.VerbEntry, tense: T.VerbTense, person: T.Person, output: ReturnType<typeof renderVerb> }[] = [
    {
      tense: "presentVerb",
      verb: wahul,
      person: 0,
      output: {
        hasBa: false,
        verbBlocks: [
          {
            type: "VA",
            ps: [
              {
                p: "وهم",
                f: "wahum"
              }
            ],
            person: 0
          },
        ],
      },
    },
    {
      tense: "subjunctiveVerb",
      person: 3,
      verb: wahul,
      output: {
        hasBa: false,
        "verbBlocks": [
          {
            "type": "PH",
            "ps": {
              "p": "و",
              "f": "óo"
            }
          },
          {
            "type": "VA",
            "ps": [
              {
                "p": "وهې",
                "f": "wahe"
              }
            ],
            "person": 3
          }
        ],
      },
    },
    {
      tense: "perfectiveFuture",
      person: 6,
      verb: achawul,
      output: {
        "hasBa": true,
        "verbBlocks": [
          {
            "type": "PH",
            "ps": {
              "p": "وا",
              "f": "wáa"
            }
          },
          {
            "type": "VA",
            "ps": [
              {
                "p": "چوو",
                "f": "chawoo"
              }
            ],
            "person": 6
          }
        ]
      },
    },
    {
      tense: "habitualPerfectivePast",
      person: 8,
      verb: achawul,
      output: {
        "hasBa": true,
        "verbBlocks": [
          {
            "type": "PH",
            "ps": {
              "p": "وا",
              "f": "wáa"
            }
          },
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "چولئ",
                  "f": "chawuleyy"
                }
              ],
              "short": [
                {
                  "p": "چوئ",
                  "f": "chaweyy"
                }
              ]
            },
            "person": 8
          }
        ]
      },
    },
    {
      tense: "imperfectivePast",
      person: 1,
      verb: achawul,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "اچولم",
                  "f": "achawúlum"
                }
              ],
              "short": [
                {
                  "p": "اچوم",
                  "f": "achawúm"
                }
              ]
            },
            "person": 1
          }
        ]
      },
    },
    // don't do redundant ل on 3rd pers masc plural
    {
      tense: "imperfectivePast",
      person: T.Person.ThirdPlurMale,
      verb: achawul,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "اچول",
                  "f": "achawúl"
                }
              ],
              "short": [
                {
                  "p": "اچول",
                  "f": "achawúl"
                }
              ]
            },
            "person": 10
          }
        ]
      },
    },
    // expception tlul with inflecting perfective head in the non-past
    {
      tense: "subjunctiveVerb",
      person: 1,
      verb: tlul,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "PH",
            "ps": {
              "p": "لاړه ",
              "f": "láaRa "
            }
          },
          {
            "type": "VA",
            "ps": [
              {
                "p": "شم",
                "f": "shum"
              }
            ],
            "person": 1
          }
        ]
      },
    },
    // different accent with -yul ending verbs
    {
      verb: azmoyul,
      tense: "imperfectivePast",
      person: 0,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "ازمویلم",
                  "f": "azmóyulum"
                }
              ],
              "short": [
                {
                  "p": "ازمویم",
                  "f": "azmóyum"
                }
              ]
            },
            "person": 0
          }
        ]
      },
    },
    // intransitive -edul verbs
    {
      verb: rasedul,
      tense: "presentVerb",
      person: 4,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "رسېږي",
                  "f": "raséGee"
                }
              ],
              "short": [
                {
                  "p": "رسي",
                  "f": "rasée"
                }
              ]
            },
            "person": 4
          }
        ]
      },
    },
  ];
  tests.forEach(tn => {
    expect(renderVerb({
      verb: tn.verb,
      tense: tn.tense,
      person: tn.person,
      voice: "active",
    })).toEqual(tn.output);
  });
});

test("idiosyncratic 3rd pers masc sing past endings", () => {
  const tests: { verb: T.VerbEntry, tense: T.VerbTense, output: ReturnType<typeof renderVerb> }[] = [
    // basic -awul idiosyncricity "aawu"
    {
      tense: "imperfectivePast",
      verb: achawul,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "اچولو",
                  "f": "achawúlo"
                }
              ],
              "short": [
                {
                  "p": "اچاوه",
                  "f": "achaawú"
                }
              ]
            },
            "person": 4
          }
        ]
      },
    },
    {
      tense: "perfectivePast",
      verb: wahul,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "PH",
            "ps": {
              "p": "و",
              "f": "óo"
            }
          },
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "وهلو",
                  "f": "wahulo"
                }
              ],
              "short": [
                {
                  "p": "واهه",
                  "f": "waahu"
                }
              ]
            },
            "person": 4
          }
        ]
      },
    },
    // words that have a specified special tppp like gaNul / gaaNu
    {
      tense: "imperfectivePast",
      verb: ganul,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "ګڼلو",
                  "f": "gaNúlo"
                }
              ],
              "short": [
                {
                  "p": "ګاڼه",
                  "f": "gaaNú"
                }
              ]
            },
            "person": 4
          }
        ]
      },
    },
    // words who's specified special tppp ends in a consonant
    {
      verb: khatul,
      tense: "imperfectivePast",
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "ختلو",
                  "f": "khatúlo"
                }
              ],
              "short": [
                {
                  "p": "خوت",
                  "f": "khót"
                },
                {
                  "p": "خوته",
                  "f": "khotú"
                },
                {
                  "p": "خوتو",
                  "f": "khotó"
                }
              ]
            },
            "person": 4
          }
        ]
      },
    },
    // verbs ending in a dental د or ت
    {
      verb: rasedul,
      tense: "perfectivePast",
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "PH",
            "ps": {
              "p": "و",
              "f": "óo"
            }
          },
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "رسېدلو",
                  "f": "rasedulo"
                }
              ],
              "short": [
                {
                  p: "رسېد",
                  f: "rased",
                },
                {
                  "p": "رسېده",
                  "f": "rasedu"
                },
                {
                  "p": "رسېدو",
                  "f": "rasedo"
                }
              ]
            },
            "person": 4
          }
        ]
      }
    },
    {
      verb: rasedul,
      tense: "habitualImperfectivePast",
      output: {
        "hasBa": true,
        "verbBlocks": [
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "رسېدلو",
                  "f": "rasedúlo"
                }
              ],
              "short": [
                {
                  "p": "رسېد",
                  "f": "raséd"
                },
                {
                  "p": "رسېده",
                  "f": "rasedú"
                },
                {
                  "p": "رسېدو",
                  "f": "rasedó"
                }
              ]
            },
            "person": 4
          }
        ]
      },
    },
    {
      verb: awuxtul,
      tense: "perfectivePast",
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "PH",
            "ps": {
              "p": "وا",
              "f": "wáa"
            }
          },
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "وښتلو",
                  "f": "wUxtulo"
                }
              ],
              "short": [
                {
                  "p": "وښت",
                  "f": "wUxt"
                },
                {
                  "p": "وښته",
                  "f": "wUxtu"
                },
                {
                  "p": "وښتو",
                  "f": "wUxto"
                }
              ]
            },
            "person": 4
          }
        ]
      },
    },
    // verbs ending in something else
    {
      verb: weshul,
      tense: "perfectivePast",
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "PH",
            "ps": {
              "p": "و",
              "f": "óo"
            }
          },
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "وېشلو",
                  "f": "weshulo"
                }
              ],
              "short": [
                {
                  "p": "وېشه",
                  "f": "weshu"
                },
                {
                  "p": "وېشو",
                  "f": "wesho"
                }
              ]
            },
            "person": 4
          }
        ]
      },
    },
    // irregular kedul verbs
    {
      tense: "perfectivePast",
      verb: kedulStat,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "شولو",
                  "f": "shwulo"
                }
              ],
              "short": [
                {
                  "p": "شو",
                  "f": "sho"
                }
              ]
            },
            "person": 4
          }
        ]
      },
    },
    {
      tense: "perfectivePast",
      verb: kedulDyn,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            type: "PH",
            ps: { p: "و", f: "óo" },
          },
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "شولو",
                  "f": "shwulo"
                }
              ],
              "short": [
                {
                  "p": "شو",
                  "f": "sho"
                }
              ]
            },
            "person": 4
          }
        ],
      },
    },
    // irregular kawul verbs
    {
      tense: "imperfectivePast",
      verb: kawulStat,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "کولو",
                  "f": "kawúlo"
                }
              ],
              "short": [
                {
                  "p": "کاوه",
                  "f": "kaawú"
                }
              ]
            },
            "person": 4
          }
        ]
      },
    },
    {
      tense: "perfectivePast",
      verb: kawulStat,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "کړلو",
                  "f": "kRulo"
                }
              ],
              "short": [
                {
                  "p": "کړ",
                  "f": "kuR"
                },
                {
                  "p": "کړه",
                  "f": "kRu"
                },
                {
                  "p": "کړو",
                  "f": "kRo"
                }
              ]
            },
            "person": 4
          }
        ]
      },
    },
    {
      tense: "habitualPerfectivePast",
      verb: kawulDyn,
      output: {
        "hasBa": true,
        "verbBlocks": [
          {
            "type": "PH",
            "ps": {
              "p": "و",
              "f": "óo"
            }
          },
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "کړلو",
                  "f": "kRulo"
                }
              ],
              "short": [
                {
                  "p": "کړ",
                  "f": "kuR"
                },
                {
                  "p": "کړه",
                  "f": "kRu"
                },
                {
                  "p": "کړو",
                  "f": "kRo"
                }
              ]
            },
            "person": 4
          }
        ],
      },
    },
    // irregular tlul verbs
    {
      tense: "imperfectivePast",
      verb: raatlul,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "راتللو",
                  "f": "raatlúlo"
                }
              ],
              "short": [
                {
                  "p": "راته",
                  "f": "raatú"
                },
                {
                  "p": "راتلو",
                  "f": "raatló"
                }
              ]
            },
            "person": 4
          }
        ]
      },
    },
    {
      tense: "imperfectivePast",
      verb: wartlul,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "ورتللو",
                  "f": "wărtlúlo"
                }
              ],
              "short": [
                {
                  "p": "ورته",
                  "f": "wărtú"
                },
                {
                  "p": "ورتلو",
                  "f": "wărtló"
                }
              ]
            },
            "person": 4
          }
        ]
      },
    },
    {
      tense: "imperfectivePast",
      verb: tlul,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "تللو",
                  "f": "tlúlo"
                }
              ],
              "short": [
                {
                  p: "ته",
                  f: "tu",
                },
                {
                  "p": "تلو",
                  "f": "tlo"
                },
              ]
            },
            "person": 4
          }
        ]
      }, 
    },
    {
      tense: "perfectivePast",
      verb: raatlul,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "PH",
            "ps": {
              "p": "را",
              "f": "ráa"
            }
          },
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "غللو",
                  "f": "ghlulo"
                }
              ],
              "short": [
                {
                  "p": "غی",
                  "f": "ghey"
                }
              ]
            },
            "person": 4
          }
        ]
      },
    },
    {
      tense: "perfectivePast",
      verb: wartlul,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "PH",
            "ps": {
              "p": "ور",
              "f": "wár"
            }
          },
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "غللو",
                  "f": "ghlulo"
                }
              ],
              "short": [
                {
                  "p": "غی",
                  "f": "ghey"
                }
              ]
            },
            "person": 4
          }
        ]
      },
    },
  ];
  tests.forEach(tn => {
    expect(renderVerb({
      verb: tn.verb,
      tense: tn.tense,
      person: T.Person.ThirdSingMale,
      voice: "active",
    })).toEqual(tn.output);
  });
});

test("perfect simple verb forms", () => {
  const tests: { verb: T.VerbEntry, tense: T.PerfectTense, person: T.Person, output: ReturnType<typeof renderVerb> }[] = [
    {
      tense: "presentPerfect",
      verb: wahul,
      person: 1,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "PT",
            "gender": "fem",
            "number": "singular",
            "ps": [
              {
                "p": "وهلې",
                "f": "wahúle"
              }
            ]
          },
          {
            "type": "EQ",
            "person": 1,
            "ps": [
              {
                "p": "یم",
                "f": "yum"
              }
            ]
          }
        ]
      },
    },
    {
      tense: "wouldBePerfect",
      verb: wahul,
      person: 2,
      output: {
        "hasBa": true,
        "verbBlocks": [
          {
            "type": "PT",
            "gender": "masc",
            "number": "singular",
            "ps": [
              {
                "p": "وهلی",
                "f": "wahúley"
              }
            ]
          },
          {
            "type": "EQ",
            "person": 2,
            "ps": {
              "long": [
                {
                  "p": "ولې",
                  "f": "wule"
                }
              ],
              "short": [
                {
                  "p": "وې",
                  "f": "we"
                }
              ]
            }
          }
        ]
      },
    },
    {
      tense: "pastPerfect",
      verb: awuxtul,
      person: 0,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "PT",
            "gender": "masc",
            "number": "singular",
            "ps": {
              "short": [
                {
                  "p": "اوښتی",
                  "f": "awÚxtey"
                }
              ],
              "long": [
                {
                  "p": "اوښتلی",
                  "f": "awUxtúley"
                }
              ]
            }
          },
          {
            "type": "EQ",
            "person": 0,
            "ps": {
              "long": [
                {
                  "p": "ولم",
                  "f": "wulum"
                }
              ],
              "short": [
                {
                  "p": "وم",
                  "f": "wum"
                }
              ]
            }
          }
        ]
      },
    },
    {
      tense: "futurePerfect",
      verb: raatlul,
      person: 7,
      output: {
        "hasBa": true,
        "verbBlocks": [
          {
            "type": "PT",
            "gender": "fem",
            "number": "plural",
            "ps": [
              {
                "p": "راغلې",
                "f": "raaghúle"
              }
            ]
          },
          {
            "type": "EQ",
            "person": 7,
            "ps": [
              {
                "p": "یو",
                "f": "yoo"
              }
            ]
          }
        ]
      },
    },
    {
      tense: "habitualPerfect",
      verb: raatlul,
      person: 10,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "PT",
            "gender": "masc",
            "number": "plural",
            "ps": [
              {
                "p": "راغلي",
                "f": "raaghúlee"
              }
            ]
          },
          {
            "type": "EQ",
            "person": 10,
            "ps": [
              {
                "p": "وي",
                "f": "wee"
              }
            ]
          }
        ]
      },
    },
    {
      tense: "pastSubjunctivePerfect",
      verb: ganul,
      person: 2,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "PT",
            "gender": "masc",
            "number": "singular",
            "ps": [
              {
                "p": "ګڼلی",
                "f": "gaNúley"
              }
            ]
          },
          {
            "type": "EQ",
            "person": 2,
            "ps": [
              {
                "p": "وای",
                "f": "waay"
              },
              {
                "p": "وی",
                "f": "wey"
              }
            ]
          }
        ]
      }
    },
    {
      tense: "subjunctivePerfect",
      verb: ganul,
      person: 2,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "PT",
            "gender": "masc",
            "number": "singular",
            "ps": [
              {
                "p": "ګڼلی",
                "f": "gaNúley"
              }
            ]
          },
          {
            "type": "EQ",
            "person": 2,
            "ps": [
              {
                "p": "وې",
                "f": "we"
              }
            ]
          }
        ]
      },
    },
    {
      tense: "wouldBePerfect",
      verb: ganul,
      person: 6,
      output: {
        "hasBa": true,
        "verbBlocks": [
          {
            "type": "PT",
            "gender": "masc",
            "number": "plural",
            "ps": [
              {
                "p": "ګڼلي",
                "f": "gaNúlee"
              }
            ]
          },
          {
            "type": "EQ",
            "person": 6,
            "ps": {
              "long": [
                {
                  "p": "ولو",
                  "f": "wuloo"
                }
              ],
              "short": [
                {
                  "p": "وو",
                  "f": "woo"
                }
              ]
            }
          }
        ]
      },
    },
  ];
  tests.forEach(tn => {
    expect(renderVerb({
      verb: tn.verb,
      tense: tn.tense,
      person: tn.person,
      voice: "active",
    })).toEqual(tn.output);
  });
});

test("ability simple verb forms", () => {
  const tests: { verb: T.VerbEntry, tense: T.ModalTense, person: T.Person, output: ReturnType<typeof renderVerb> }[] = [
    {
      tense: "presentVerbModal",
      verb: ganul,
      person: 6,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "VI",
            "ps": {
              "long": [
                {
                  "p": "ګڼلی",
                  "f": "gaNúley"
                },
                {
                  "p": "ګڼلای",
                  "f": "gaNúlaay"
                }
              ],
              "short": [
                {
                  "p": "ګڼی",
                  "f": "gaNéy"
                },
                {
                  "p": "ګڼای",
                  "f": "gaNáay"
                }
              ]
            }
          },
          {
            "type": "VA",
            "ps": [
              {
                "p": "شو",
                "f": "shoo"
              }
            ],
            "person": 6
          }
        ]
      }
    },
    {
      tense: "subjunctiveVerbModal",
      verb: ganul,
      person: 0,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "PH",
            "ps": {
              "p": "و",
              "f": "óo"
            }
          },
          {
            "type": "VI",
            "ps": {
              "long": [
                {
                  "p": "ګڼلی",
                  "f": "gaNuley"
                },
                {
                  "p": "ګڼلای",
                  "f": "gaNulaay"
                }
              ],
              "short": [
                {
                  "p": "ګڼی",
                  "f": "gaNey"
                },
                {
                  "p": "ګڼای",
                  "f": "gaNaay"
                }
              ]
            }
          },
          {
            "type": "VA",
            "ps": [
              {
                "p": "شم",
                "f": "shum"
              }
            ],
            "person": 0
          }
        ]
      },
    },
    {
      tense: "habitualPerfectivePastModal",
      verb: ganul,
      person: 0,
      output: {
        "hasBa": true,
        "verbBlocks": [
          {
            "type": "PH",
            "ps": {
              "p": "و",
              "f": "óo"
            }
          },
          {
            "type": "VI",
            "ps": {
              "long": [
                {
                  "p": "ګڼلی",
                  "f": "gaNuley"
                },
                {
                  "p": "ګڼلای",
                  "f": "gaNulaay"
                }
              ],
              "short": [
                {
                  "p": "ګڼی",
                  "f": "gaNey"
                },
                {
                  "p": "ګڼای",
                  "f": "gaNaay"
                }
              ]
            }
          },
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "شولم",
                  "f": "shwulum"
                }
              ],
              "short": [
                {
                  "p": "شوم",
                  "f": "shwum"
                }
              ]
            },
            "person": 0
          }
        ]
      },
    },
    // exception with tlul verbs losing aspect 
    {
      tense: "subjunctiveVerbModal",
      person: 10,
      verb: tlul,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "VI",
            "ps": {
              "long": [
                {
                  "p": "تللی",
                  "f": "tlúley"
                },
                {
                  "p": "تللای",
                  "f": "tlúlaay"
                }
              ],
              "short": [
                {
                  "p": "تلی",
                  "f": "tléy"
                },
                {
                  "p": "تلای",
                  "f": "tláay"
                }
              ]
            }
          },
          {
            "type": "VA",
            "ps": [
              {
                "p": "شي",
                "f": "shee"
              }
            ],
            "person": 10
          }
        ]
      },
    }
  ];
  tests.forEach(tn => {
    expect(renderVerb({
      verb: tn.verb,
      tense: tn.tense,
      person: tn.person,
      voice: "active",
    })).toEqual(tn.output);
  });
});

test("passive simple verbs", () => {
  const tests: { verb: T.VerbEntry, tense: T.VerbTense, person: T.Person, output: ReturnType<typeof renderVerb> }[] = [
    {
      tense: "presentVerb",
      verb: ganul,
      person: 0,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "welded",
            "left": {
              "type": "VI",
              "ps": [
                {
                  "p": "ګڼل",
                  "f": "gaNul"
                }
              ]
            },
            "right": {
              "type": "VA",
              "ps": [
                {
                  "p": "کېږم",
                  "f": "kéGum"
                }
              ],
              "person": 0
            }
          }
        ]
      },
    },
    {
      tense: "perfectivePast",
      verb: khorul,
      person: 7,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "PH",
            "ps": {
              "p": "و",
              "f": "óo"
            }
          },
          {
            "type": "welded",
            "left": {
              "type": "VI",
              "ps": [
                {
                  "p": "خوړل",
                  "f": "khoRul"
                }
              ]
            },
            "right": {
              "type": "VA",
              "ps": {
                "long": [
                  {
                    "p": "شولو",
                    "f": "shwuloo"
                  }
                ],
                "short": [
                  {
                    "p": "شوو",
                    "f": "shwoo"
                  }
                ]
              },
              "person": 7
            }
          }
        ]
      },
    }
  ];
  tests.forEach(tn => {
    expect(renderVerb({
      verb: tn.verb,
      tense: tn.tense,
      person: tn.person,
      voice: "passive",
    })).toEqual(tn.output);
  });
});

test("passive perfect simple verbs", () => {
  const tests: { verb: T.VerbEntry, tense: T.PerfectTense, person: T.Person, output: ReturnType<typeof renderVerb> }[] = [
    {
      tense: "presentPerfect",
      verb: khorul,
      person: 9,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "welded",
            "left": {
              "type": "VI",
              "ps": [
                {
                  "p": "خوړل",
                  "f": "khoRul"
                }
              ]
            },
            "right": {
              "type": "PT",
              "gender": "fem",
              "number": "plural",
              "ps": [
                {
                  "p": "شوې",
                  "f": "shúwe"
                }
              ]
            }
          },
          {
            "type": "EQ",
            "person": 9,
            "ps": [
              {
                "p": "یئ",
                "f": "yeyy"
              }
            ]
          }
        ]
      },
    },
    {
      tense: "pastSubjunctivePerfect",
      verb: khorul,
      person: 10,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "welded",
            "left": {
              "type": "VI",
              "ps": [
                {
                  "p": "خوړل",
                  "f": "khoRul"
                }
              ]
            },
            "right": {
              "type": "PT",
              "gender": "masc",
              "number": "plural",
              "ps": [
                {
                  "p": "شوي",
                  "f": "shúwee"
                }
              ]
            }
          },
          {
            "type": "EQ",
            "person": 10,
            "ps": [
              {
                "p": "وای",
                "f": "waay"
              },
              {
                "p": "وی",
                "f": "wey"
              }
            ]
          }
        ]
      },
    },
  ];
  tests.forEach(tn => {
    expect(renderVerb({
      verb: tn.verb,
      tense: tn.tense,
      person: tn.person,
      voice: "passive",
    })).toEqual(tn.output);
  });
});

test("passive ability simple verbs", () => {
  const tests: { verb: T.VerbEntry, tense: T.ModalTense, person: T.Person, output: ReturnType<typeof renderVerb> }[] = [
    {
      verb: ganul,
      tense: "presentVerbModal",
      person: 4,
      output: {
        "hasBa": false,
        "verbBlocks": [
          {
            "type": "welded",
            "left": {
              "type": "VI",
              "ps": [
                {
                  "p": "ګڼل",
                  "f": "gaNul"
                }
              ]
            },
            "right": {
              "type": "VI",
              "ps": {
                "long": [
                  {
                    "p": "کېدلی",
                    "f": "kedúley"
                  },
                  {
                    "p": "کېدلای",
                    "f": "kedúlaay"
                  }
                ],
                "short": [
                  {
                    "p": "کېدی",
                    "f": "kedéy"
                  },
                  {
                    "p": "کېدای",
                    "f": "kedáay"
                  }
                ]
              }
            }
          },
          {
            "type": "VA",
            "ps": [
              {
                "p": "شي",
                "f": "shee"
              }
            ],
            "person": 4
          }
        ]
      },
    },
    // note: passive ability verbs lose aspect
    {
      verb: ganul,
      tense: "habitualPerfectivePastModal",
      person: 2,
      output: {
        "hasBa": true,
        "verbBlocks": [
          {
            "type": "welded",
            "left": {
              "type": "VI",
              "ps": [
                {
                  "p": "ګڼل",
                  "f": "gaNul"
                }
              ]
            },
            "right": {
              "type": "VI",
              "ps": {
                "long": [
                  {
                    "p": "کېدلی",
                    "f": "kedúley"
                  },
                  {
                    "p": "کېدلای",
                    "f": "kedúlaay"
                  }
                ],
                "short": [
                  {
                    "p": "کېدی",
                    "f": "kedéy"
                  },
                  {
                    "p": "کېدای",
                    "f": "kedáay"
                  }
                ]
              }
            }
          },
          {
            "type": "VA",
            "ps": {
              "long": [
                {
                  "p": "شولې",
                  "f": "shwule"
                }
              ],
              "short": [
                {
                  "p": "شوې",
                  "f": "shwe"
                }
              ]
            },
            "person": 2
          }
        ]
      },
    },
  ];
  tests.forEach(tn => {
    expect(renderVerb({
      verb: tn.verb,
      tense: tn.tense,
      person: tn.person,
      voice: "passive",
    })).toEqual(tn.output);
  });
});