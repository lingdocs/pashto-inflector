import * as T from "../../../types";
import { getPastParticiple, getRootStem } from "./roots-and-stems";
import { vEntry } from "./rs-helpers";
import { wordQuery } from "../parsing/lookup";

const wahul = wordQuery("وهل", "verb");
const achawul = wordQuery("اچول", "verb");
const ganul = wordQuery("ګڼل", "verb");

const kawulStat = vEntry({
  ts: 1579015359582,
  i: 11030,
  p: "کول",
  f: "kawul",
  g: "kawul",
  e: 'to make ____ ____ (as in "He\'s making me angry.")',
  r: 4,
  c: "v. trans.",
  ssp: "کړ",
  ssf: "kR",
  prp: "کړل",
  prf: "kRul",
  pprtp: "کړی",
  pprtf: "kúRay",
  noOo: true,
  ec: "make,makes,making,made,made",
} as T.VerbDictionaryEntry);
const kawulDyn = vEntry({
  ts: 1527812752,
  i: 11031,
  p: "کول",
  f: "kawul",
  g: "kawul",
  e: "to do (an action or activity)",
  r: 4,
  c: "v. trans./gramm. trans.",
  ssp: "وکړ",
  ssf: "óokR",
  prp: "وکړل",
  prf: "óokRul",
  pprtp: "کړی",
  pprtf: "kúRay",
  diacExcept: true,
  ec: "do,does,doing,did,done",
  separationAtP: 1,
  separationAtF: 2,
} as T.VerbDictionaryEntry);
const kedulStat = vEntry({
  ts: 1581086654898,
  i: 11100,
  p: "کېدل",
  f: "kedul",
  g: "kedul",
  e: "to become _____",
  r: 2,
  c: "v. intrans.",
  ssp: "ش",
  ssf: "sh",
  prp: "شول",
  prf: "shwul",
  pprtp: "شوی",
  pprtf: "shúway",
  noOo: true,
  ec: "become",
} as T.VerbDictionaryEntry);
// const kedulDyn = vEntry({
//   ts: 1527812754,
//   i: 11101,
//   p: "کېدل",
//   f: "kedul",
//   g: "kedul",
//   e: "to happen, occur",
//   r: 2,
//   c: "v. intrans.",
//   ssp: "وش",
//   ssf: "óosh",
//   prp: "وشول",
//   prf: "óoshwul",
//   pprtp: "شوی",
//   pprtf: "shúway",
//   diacExcept: true,
//   ec: "happen",
//   separationAtP: 1,
//   separationAtF: 2,
// });
const raatlul = wordQuery("راتلل", "verb");
// const wartlul = wordQuery("ورتلل", "verb");
const osedul = wordQuery("اوسېدل", "verb");
const awuxtul = wordQuery("اوښتل", "verb");
const khorul = wordQuery("خوړل", "verb");
const azmoyul = wordQuery("ازمویل", "verb");
const khatul = wordQuery("ختل", "verb");
const rasedul = wordQuery("رسېدل", "verb");
// const weshul = wordQuery("وېشل", "verb");
const watul = wordQuery("وتل", "verb");
const wurul = wordQuery("وړل", "verb");
const kexodul = wordQuery("کېښودل", "verb");
const kenaastul = wordQuery("کېناستل", "verb");
const ghadzedul = wordQuery("غځېدل", "verb");
const prexodul = wordQuery("پرېښودل", "verb");
const raawustul = wordQuery("راوستل", "verb");
const tlul = wordQuery("تلل", "verb");
const bandawul = wordQuery("بندول", "verb");
const bandedul = wordQuery("بندېدل", "verb");
const sturayKawul = wordQuery("ستړی کول", "verb");
const sturayKedul = wordQuery("ستړی کېدل", "verb");
const bayaanedul = wordQuery("بیانېدل", "verb");
const khufaKedul = wordQuery("خفه کېدل", "verb");
const warkawul = wordQuery("warkawul", "verb");
const raakawul = wordQuery("raakawul", "verb");
const darkawul = wordQuery("درکول", "verb");

const ooPH: T.PH = { type: "PH", ps: { p: "و", f: "óo" } };

describe("imperfective stems", () => {
  const tests: {
    title: string;
    tests: {
      verb: T.VerbEntry;
      genderNumber?: T.GenderNumber;
      result: T.RootsStemsOutput;
    }[];
  }[] = [
    {
      title: "is the shortened infinitive for regular verbs",
      tests: [
        {
          verb: ganul,
          result: [[], [{ type: "VB", ps: [{ p: "ګڼ", f: "gaN" }] }]],
        },
        {
          verb: wahul,
          result: [[], [{ type: "VB", ps: [{ p: "وه", f: "wah" }] }]],
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
          result: [[], [{ type: "VB", ps: [{ p: "غځېږ", f: "ghadzéG" }] }]],
        },
        {
          verb: rasedul,
          result: [
            [],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "رسېږ", f: "raséG" }],
                  short: [{ p: "رس", f: "ras" }],
                },
              },
            ],
          ],
        },
      ],
    },
    {
      title:
        "is the special imperfective stem for irregular verbs with a special imperfective stem",
      tests: [
        {
          verb: khorul,
          result: [[], [{ type: "VB", ps: [{ p: "خور", f: "khor" }] }]],
        },
        {
          verb: kexodul,
          result: [[], [{ type: "VB", ps: [{ p: "ږد", f: "Gd" }] }]],
        },
        {
          verb: tlul,
          result: [[], [{ type: "VB", ps: [{ p: "ځ", f: "dz" }] }]],
        },
      ],
    },
    {
      title: "is the fused word for stative compounds that swallow the k",
      tests: [
        {
          verb: bandawul,
          genderNumber: { gender: "masc", number: "singular" },
          result: [[], [{ type: "VB", ps: [{ p: "بندو", f: "bandawX" }] }]],
        },
        {
          verb: bandedul,
          genderNumber: { gender: "masc", number: "singular" },
          result: [[], [{ type: "VB", ps: [{ p: "بندېږ", f: "bandéG" }] }]],
        },
      ],
    },
    {
      title:
        "is welded together with the complement on seperated stative compounds",
      tests: [
        {
          verb: sturayKawul,
          genderNumber: { gender: "fem", number: "singular" },
          result: [
            [],
            [
              {
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
              },
            ],
          ],
        },
        {
          verb: sturayKedul,
          genderNumber: { gender: "fem", number: "singular" },
          result: [
            [],
            [
              {
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
        expect(
          getRootStem({
            verb: y.verb,
            aspect: "imperfective",
            type: "basic",
            rs: "stem",
            voice: "active",
            genderNumber: y.genderNumber || {
              gender: "masc",
              number: "singular",
            },
          }),
        ).toEqual(y.result);
      });
    });
  });
});

describe("imperfective roots", () => {
  const tests: {
    title: string;
    tests: {
      verb: T.VerbEntry;
      genderNumber?: T.GenderNumber;
      result: T.RootsStemsOutput;
    }[];
  }[] = [
    {
      title:
        "is the infinitive with and without ل for regular verbs, with a trailing accent on the short form",
      tests: [
        {
          verb: wahul,
          result: [
            [],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "وهل", f: "wahúl" }],
                  short: [{ p: "وه", f: "wahX" }],
                },
              },
            ],
          ],
        },
        {
          verb: tlul,
          result: [
            [],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "تلل", f: "tlúl" }],
                  short: [{ p: "تل", f: "tlX" }],
                },
              },
            ],
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
                },
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
                  short: [{ p: "بندېد", f: "bandedX" }],
                },
              },
            ],
          ],
        },
      ],
    },
    {
      title:
        "is welded together with the complement on seperated stative compounds",
      tests: [
        {
          verb: sturayKawul,
          genderNumber: { gender: "fem", number: "singular" },
          result: [
            [],
            [
              {
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
              },
            ],
          ],
        },
        {
          verb: sturayKedul,
          genderNumber: { gender: "fem", number: "singular" },
          result: [
            [],
            [
              {
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
        expect(
          getRootStem({
            verb: y.verb,
            aspect: "imperfective",
            type: "basic",
            rs: "root",
            voice: "active",
            genderNumber: y.genderNumber || {
              gender: "masc",
              number: "singular",
            },
          }),
        ).toEqual(y.result);
      });
    });
  });
});

describe("perfective stems", () => {
  const tests: {
    title: string;
    tests: {
      verb: T.VerbEntry;
      genderNumber?: T.GenderNumber;
      result: T.RootsStemsOutput;
    }[];
  }[] = [
    {
      title: "is the imprefective stem with an oo- prefix for regular verbs",
      tests: [
        {
          verb: ganul,
          result: [[ooPH], [{ type: "VB", ps: [{ p: "ګڼ", f: "gaN" }] }]],
        },
        {
          verb: wahul,
          result: [[ooPH], [{ type: "VB", ps: [{ p: "وه", f: "wah" }] }]],
        },
      ],
    },
    {
      title: "is the -eG for for regular intransitive verbs",
      tests: [
        {
          verb: ghadzedul,
          result: [[ooPH], [{ type: "VB", ps: [{ p: "غځېږ", f: "ghadzeG" }] }]],
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
      title:
        "the imperfective stem the perfective stem is regularly built off could be irregular",
      tests: [
        {
          verb: khorul,
          result: [[ooPH], [{ type: "VB", ps: [{ p: "خور", f: "khor" }] }]],
        },
      ],
    },
    {
      title: "is the irregular perfective stem if the entry has a ssp/ssf",
      tests: [
        {
          verb: wurul,
          result: [
            [{ type: "PH", ps: { p: "یو", f: "yó" } }],
            [{ type: "VB", ps: [{ p: "س", f: "s" }] }],
          ],
        },
      ],
    },
    {
      title: "special giving verbs",
      tests: [
        {
          verb: warkawul,
          result: [
            [{ type: "PH", ps: { p: "ور", f: "wár" } }],
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
          verb: darkawul,
          result: [
            [{ type: "PH", ps: { p: "در", f: "dár" } }],
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
          verb: raakawul,
          result: [
            [{ type: "PH", ps: { p: "را", f: "ráa" } }],
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
            [{ type: "PH", ps: { p: "لاړه ", f: "láaRa " } }],
            [{ type: "VB", ps: [{ p: "ش", f: "sh" }] }],
          ],
        },
        {
          verb: tlul,
          genderNumber: { gender: "fem", number: "plural" },
          result: [
            [{ type: "PH", ps: { p: "لاړې ", f: "láaRe " } }],
            [{ type: "VB", ps: [{ p: "ش", f: "sh" }] }],
          ],
        },
        {
          verb: tlul,
          genderNumber: { gender: "masc", number: "plural" },
          result: [
            [{ type: "PH", ps: { p: "لاړ ", f: "láaR " } }],
            [{ type: "VB", ps: [{ p: "ش", f: "sh" }] }],
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
          verb: sturayKedul,
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
                  ps: {
                    p: "خفه",
                    f: "khufá",
                  },
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
            [{ type: "PH", ps: { p: "و ", f: "óo`" } }],
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
            [{ type: "PH", ps: { p: "وا", f: "wáa" } }],
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
            [{ type: "PH", ps: { p: "و", f: "wÚ" } }],
            [{ type: "VB", ps: [{ p: "وځ", f: "oodz" }] }],
          ],
        },
        {
          verb: osedul,
          genderNumber: { gender: "masc", number: "plural" },
          result: [
            [{ type: "PH", ps: { p: "و", f: "óo`" } }],
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
  tests.forEach((x) => {
    test(x.title, () => {
      x.tests.forEach((y) => {
        expect(
          getRootStem({
            verb: y.verb,
            aspect: "perfective",
            type: "basic",
            rs: "stem",
            voice: "active",
            genderNumber: y.genderNumber || {
              gender: "masc",
              number: "singular",
            },
          }),
        ).toEqual(y.result);
      });
    });
  });
});

describe("perfective roots", () => {
  const tests: {
    title: string;
    tests: {
      verb: T.VerbEntry;
      genderNumber?: T.GenderNumber;
      result: T.RootsStemsOutput;
    }[];
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
            [{ type: "PH", ps: { p: "یو", f: "yó" } }],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "ړل", f: "Rul" }],
                  short: [{ p: "ړ", f: "R" }],
                },
              },
            ],
          ],
        },
      ],
    },
    {
      title: "special giving verbs",
      tests: [
        {
          verb: warkawul,
          result: [
            [{ type: "PH", ps: { p: "ور", f: "wár" } }],
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
          verb: darkawul,
          result: [
            [{ type: "PH", ps: { p: "در", f: "dár" } }],
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
          verb: raakawul,
          result: [
            [{ type: "PH", ps: { p: "را", f: "ráa" } }],
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
      title: "is the special form with tlul",
      tests: [
        {
          verb: tlul,
          result: [
            [{ type: "PH", ps: { p: "لا", f: "láa" } }],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "ړل", f: "Rul" }],
                  short: [{ p: "ړ", f: "R" }],
                },
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
            ],
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
                },
              },
            ],
          ],
        },
        {
          verb: sturayKedul,
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
                },
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
        expect(
          getRootStem({
            verb: y.verb,
            aspect: "perfective",
            type: "basic",
            rs: "root",
            voice: "active",
            genderNumber: y.genderNumber || {
              gender: "masc",
              number: "singular",
            },
          }),
        ).toEqual(y.result);
      });
    });
  });
});

const pastPartTests: {
  label: string;
  cases: {
    input: [T.VerbEntry, T.Voice, T.GenderNumber];
    output: T.VBP;
  }[];
}[] = [
  {
    label:
      "for most verbs are just the imperfective root (imperative) plus ی - ay",
    cases: [
      {
        input: [
          rasedul,
          "active",
          {
            gender: "masc",
            number: "singular",
          },
        ],
        output: {
          type: "VB",
          ps: [{ p: "رسېدلی", f: "rasedúlay" }],
          info: {
            type: "ppart",
            verb: rasedul,
            genNum: {
              gender: "masc",
              number: "singular",
            },
          },
        },
      },
      {
        input: [
          ganul,
          "active",
          {
            gender: "fem",
            number: "singular",
          },
        ],
        output: {
          type: "VB",
          ps: [{ p: "ګڼلې", f: "gaNúle" }],
          info: {
            type: "ppart",
            verb: ganul,
            genNum: {
              gender: "fem",
              number: "singular",
            },
          },
        },
      },
    ],
  },
  {
    label:
      "for verbs like اېښودل and پرېښودل they have a short version shortened taking off after ښ",
    cases: [
      {
        input: [
          prexodul,
          "active",
          {
            gender: "masc",
            number: "plural",
          },
        ],
        output: {
          type: "VB",
          ps: {
            long: [{ p: "پرېښودلي", f: "prexodúlee" }],
            short: [{ p: "پرېښي", f: "préxee" }],
          },
          info: {
            type: "ppart",
            genNum: {
              gender: "masc",
              number: "plural",
            },
            verb: prexodul,
          },
        },
      },
    ],
  },
  {
    label: "verbs ending in ستل ښتل وتل or وړل verbs also have a short version",
    cases: [
      {
        input: [
          raawustul,
          "active",
          {
            gender: "fem",
            number: "plural",
          },
        ],
        output: {
          type: "VB",
          ps: {
            long: [{ p: "راوستلې", f: "raawustúle" }],
            short: [{ p: "راوستې", f: "raawúste" }],
          },
          info: {
            type: "ppart",
            verb: raawustul,
            genNum: {
              gender: "fem",
              number: "plural",
            },
          },
        },
      },
      {
        input: [awuxtul, "active", { gender: "masc", number: "plural" }],
        output: {
          type: "VB",
          ps: {
            long: [{ p: "اوښتلي", f: "awUxtúlee" }],
            short: [{ p: "اوښتي", f: "awÚxtee" }],
          },
          info: {
            type: "ppart",
            verb: awuxtul,
            genNum: {
              gender: "masc",
              number: "plural",
            },
          },
        },
      },
      {
        input: [watul, "active", { gender: "fem", number: "singular" }],
        output: {
          type: "VB",
          ps: {
            long: [{ p: "وتلې", f: "watúle" }],
            short: [{ p: "وتې", f: "wáte" }],
          },
          info: {
            type: "ppart",
            verb: watul,
            genNum: {
              gender: "fem",
              number: "singular",
            },
          },
        },
      },
    ],
  },
  {
    label: "but not verbs ending with استل",
    cases: [
      {
        input: [
          kenaastul,
          "active",
          {
            gender: "fem",
            number: "plural",
          },
        ],
        output: {
          type: "VB",
          ps: [{ p: "کېناستلې", f: "kenaastúle" }],
          info: {
            type: "ppart",
            verb: kenaastul,
            genNum: {
              gender: "fem",
              number: "plural",
            },
          },
        },
      },
    ],
  },
  {
    label: "special short form with تلل - tlul",
    cases: [
      {
        input: [tlul, "active", { gender: "masc", number: "plural" }],
        output: {
          type: "VB",
          ps: {
            long: [{ p: "تللي", f: "tlúlee" }],
            short: [{ p: "تلي", f: "túlee" }],
          },
          info: {
            type: "ppart",
            verb: tlul,
            genNum: { gender: "masc", number: "plural" },
          },
        },
      },
    ],
  },
  {
    label:
      "kawul/kedul/raatlul verbs have an irregular pprt fields that give us the irregular past participle",
    cases: [
      {
        input: [
          kawulDyn,
          "active",
          {
            gender: "masc",
            number: "singular",
          },
        ],
        output: {
          type: "VB",
          ps: [{ p: "کړی", f: "kúRay" }],
          info: {
            type: "ppart",
            genNum: {
              gender: "masc",
              number: "singular",
            },
            verb: kawulDyn,
          },
        },
      },
      {
        input: [
          kawulStat,
          "active",
          {
            gender: "masc",
            number: "plural",
          },
        ],
        output: {
          type: "VB",
          ps: [{ p: "کړي", f: "kúRee" }],
          info: {
            type: "ppart",
            verb: kawulStat,
            genNum: {
              gender: "masc",
              number: "plural",
            },
          },
        },
      },
      {
        input: [
          kedulStat,
          "active",
          {
            gender: "fem",
            number: "singular",
          },
        ],
        output: {
          type: "VB",
          ps: [{ p: "شوې", f: "shúwe" }],
          info: {
            type: "ppart",
            verb: kedulStat,
            genNum: {
              gender: "fem",
              number: "singular",
            },
          },
        },
      },
    ],
  },
  {
    label:
      "stative compounds weld the complement to the kawul/kedul participle",
    cases: [
      {
        input: [
          bandawul,
          "active",
          {
            gender: "fem",
            number: "singular",
          },
        ],
        output: {
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
            info: {
              type: "ppart",
              verb: kawulStat,
              genNum: {
                gender: "fem",
                number: "singular",
              },
            },
          },
          info: {
            type: "ppart",
            verb: bandawul,
            genNum: {
              gender: "fem",
              number: "singular",
            },
          },
        },
      },
      {
        input: [bandedul, "active", { gender: "fem", number: "plural" }],
        output: {
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
            info: {
              type: "ppart",
              verb: kedulStat,
              genNum: {
                gender: "fem",
                number: "plural",
              },
            },
          },
          info: {
            type: "ppart",
            verb: bandedul,
            genNum: {
              gender: "fem",
              number: "plural",
            },
          },
        },
      },
    ],
  },
  {
    label:
      "for passive with simple verbs, long perfective root welded to kedul participle",
    cases: [
      {
        input: [ganul, "passive", { gender: "fem", number: "singular" }],
        output: {
          type: "welded",
          left: {
            type: "VB",
            ps: [{ p: "ګڼل", f: "gaNul" }],
          },
          right: {
            type: "VB",
            ps: [{ p: "شوې", f: "shúwe" }],
            info: {
              type: "ppart",
              verb: kedulStat,
              genNum: {
                gender: "fem",
                number: "singular",
              },
            },
          },
          info: {
            type: "ppart",
            verb: ganul,
            genNum: {
              gender: "fem",
              number: "singular",
            },
          },
        },
      },
    ],
  },
  {
    label:
      "special passive forms for kawul verbs - kRul perfective root + shúway",
    cases: [
      {
        input: [
          kawulStat,
          "passive",
          {
            gender: "masc",
            number: "singular",
          },
        ],
        output: {
          type: "welded",
          left: {
            type: "VB",
            ps: [{ p: "کړل", f: "kRul" }],
          },
          right: {
            type: "VB",
            ps: [{ p: "شوی", f: "shúway" }],
            info: {
              type: "ppart",
              verb: kedulStat,
              genNum: {
                gender: "masc",
                number: "singular",
              },
            },
          },
          info: {
            type: "ppart",
            verb: kawulStat,
            genNum: {
              gender: "masc",
              number: "singular",
            },
          },
        },
      },
      {
        input: [
          kawulDyn,
          "passive",
          {
            gender: "masc",
            number: "singular",
          },
        ],
        output: {
          type: "welded",
          left: {
            type: "VB",
            ps: [{ p: "کړل", f: "kRul" }],
          },
          right: {
            type: "VB",
            ps: [{ p: "شوی", f: "shúway" }],
            info: {
              type: "ppart",
              verb: kedulStat,
              genNum: {
                gender: "masc",
                number: "singular",
              },
            },
          },
          info: {
            type: "ppart",
            verb: kawulDyn,
            genNum: {
              gender: "masc",
              number: "singular",
            },
          },
        },
      },
      {
        input: [
          bandawul,
          "passive",
          {
            gender: "fem",
            number: "plural",
          },
        ],
        output: {
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
            ps: [{ p: "شوې", f: "shúwe" }],
            info: {
              type: "ppart",
              verb: kedulStat,
              genNum: {
                gender: "fem",
                number: "plural",
              },
            },
          },
          info: {
            type: "ppart",
            verb: bandawul,
            genNum: {
              gender: "fem",
              number: "plural",
            },
          },
        },
      },
    ],
  },
];

describe("past participles", () => {
  pastPartTests.forEach(({ label, cases }) => {
    test(label, () => {
      cases.forEach(({ input, output }) => {
        expect(getPastParticiple(...input)).toEqual(output);
      });
    });
  });
});

describe("ability roots and stems", () => {
  const tests: {
    title: string;
    tests: {
      verb: T.VerbEntry;
      aspect: T.Aspect;
      rs: "root" | "stem";
      genderNumber?: T.GenderNumber;
      result: T.RootsStemsOutput;
      voice: T.Voice;
    }[];
  }[] = [
    {
      title:
        "is the aspect's root with the ability endings and then the perfective kedul modal verb stem or root",
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
                    { p: "ختلی", f: "khatúlay" },
                    { p: "ختلای", f: "khatúlaay" },
                  ],
                  short: [
                    { p: "ختی", f: "khatáy" },
                    { p: "ختای", f: "khatáay" },
                  ],
                },
                info: {
                  type: "ability",
                  verb: khatul,
                  aspect: "imperfective",
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
                    { p: "ختلی", f: "khatulay" },
                    { p: "ختلای", f: "khatulaay" },
                  ],
                  short: [
                    { p: "ختی", f: "khatay" },
                    { p: "ختای", f: "khataay" },
                  ],
                },
                info: {
                  type: "ability",
                  verb: khatul,
                  aspect: "perfective",
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
                    { p: "ختلی", f: "khatúlay" },
                    { p: "ختلای", f: "khatúlaay" },
                  ],
                  short: [
                    { p: "ختی", f: "khatáy" },
                    { p: "ختای", f: "khatáay" },
                  ],
                },
                info: {
                  type: "ability",
                  verb: khatul,
                  aspect: "imperfective",
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
                    { p: "ختلی", f: "khatulay" },
                    { p: "ختلای", f: "khatulaay" },
                  ],
                  short: [
                    { p: "ختی", f: "khatay" },
                    { p: "ختای", f: "khataay" },
                  ],
                },
                info: {
                  type: "ability",
                  verb: khatul,
                  aspect: "perfective",
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
      title:
        "tlul verbs and verbs with irregular perfective roots lose the perfective aspect",
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
                    { p: "راتللی", f: "raatlúlay" },
                    { p: "راتللای", f: "raatlúlaay" },
                  ],
                  short: [
                    { p: "راتلی", f: "raatláy" },
                    { p: "راتلای", f: "raatláay" },
                  ],
                },
                info: {
                  type: "ability",
                  verb: raatlul,
                  aspect: "imperfective",
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
                    { p: "راتللی", f: "raatlúlay" },
                    { p: "راتللای", f: "raatlúlaay" },
                  ],
                  short: [
                    { p: "راتلی", f: "raatláy" },
                    { p: "راتلای", f: "raatláay" },
                  ],
                },
                info: {
                  type: "ability",
                  verb: raatlul,
                  aspect: "imperfective",
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
          verb: wurul,
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
                    { p: "وړلی", f: "wuRúlay" },
                    { p: "وړلای", f: "wuRúlaay" },
                  ],
                  short: [
                    { p: "وړی", f: "wuRáy" },
                    { p: "وړای", f: "wuRáay" },
                  ],
                },
                info: {
                  type: "ability",
                  verb: wurul,
                  aspect: "imperfective",
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
          verb: wurul,
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
                    { p: "وړلی", f: "wuRúlay" },
                    { p: "وړلای", f: "wuRúlaay" },
                  ],
                  short: [
                    { p: "وړی", f: "wuRáy" },
                    { p: "وړای", f: "wuRáay" },
                  ],
                },
                info: {
                  type: "ability",
                  verb: wurul,
                  aspect: "imperfective",
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
                    { p: "بندېدلی", f: "bandedúlay" },
                    { p: "بندېدلای", f: "bandedúlaay" },
                  ],
                  short: [
                    { p: "بندېدی", f: "bandedáy" },
                    { p: "بندېدای", f: "bandedáay" },
                  ],
                },
                info: {
                  type: "ability",
                  verb: bandedul,
                  aspect: "imperfective",
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
      title:
        "passive takes the long imperfective passive root (loses aspect), and adds the ability endings",
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
                      { p: "کېدلی", f: "kedúlay" },
                      { p: "کېدلای", f: "kedúlaay" },
                    ],
                    short: [
                      { p: "کېدی", f: "kedáy" },
                      { p: "کېدای", f: "kedáay" },
                    ],
                  },
                },
                info: {
                  type: "ability",
                  verb: achawul,
                  aspect: "perfective",
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
        expect(
          getRootStem({
            verb: y.verb,
            aspect: y.aspect,
            rs: y.rs,
            genderNumber: y.genderNumber || {
              gender: "masc",
              number: "plural",
            },
            type: "ability",
            voice: y.voice,
          }),
        ).toEqual(y.result);
      });
    });
  });
});

describe("passive roots and stems", () => {
  test("root plus kedul", () => {
    expect(
      getRootStem({
        verb: wahul,
        aspect: "imperfective",
        type: "basic",
        rs: "stem",
        genderNumber: {
          gender: "masc",
          number: "singular",
        },
        voice: "passive",
      }),
    ).toEqual([
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
    expect(
      getRootStem({
        verb: wahul,
        aspect: "imperfective",
        type: "basic",
        rs: "root",
        genderNumber: {
          gender: "masc",
          number: "singular",
        },
        voice: "passive",
      }),
    ).toEqual([
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
    expect(
      getRootStem({
        verb: wahul,
        aspect: "perfective",
        type: "basic",
        rs: "stem",
        genderNumber: {
          gender: "masc",
          number: "singular",
        },
        voice: "passive",
      }),
    ).toEqual([
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
    expect(
      getRootStem({
        verb: wahul,
        aspect: "perfective",
        type: "basic",
        rs: "root",
        genderNumber: {
          gender: "masc",
          number: "singular",
        },
        voice: "passive",
      }),
    ).toEqual([
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
    expect(
      getRootStem({
        verb: bandawul,
        aspect: "perfective",
        type: "basic",
        rs: "root",
        genderNumber: {
          gender: "fem",
          number: "singular",
        },
        voice: "passive",
      }),
    ).toEqual([
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
            ps: [
              { p: "کړل", f: "kRul" },
              {
                f: "kRulay",
                p: "کړلی",
              },
              {
                f: "kRulaay",
                p: "کړلای",
              },
              {
                f: "kRay",
                p: "کړی",
              },
              {
                f: "kRaay",
                p: "کړای",
              },
            ],
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
    expect(
      getRootStem({
        verb: bandawul,
        aspect: "imperfective",
        type: "basic",
        rs: "root",
        genderNumber: {
          gender: "fem",
          number: "singular",
        },
        voice: "passive",
      }),
    ).toEqual([
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
    expect(
      getRootStem({
        verb: sturayKawul,
        aspect: "imperfective",
        type: "basic",
        voice: "passive",
        genderNumber: {
          gender: "masc",
          number: "singular",
        },
        rs: "stem",
      }),
    ).toEqual([
      [],
      [
        {
          type: "welded",
          left: {
            type: "welded",
            left: {
              type: "NComp",
              comp: {
                type: "AdjComp",
                ps: {
                  p: "ستړی",
                  f: "stuRay",
                },
                gender: "masc",
                number: "singular",
              },
            },
            right: {
              type: "VB",
              ps: [
                {
                  p: "کول",
                  f: "kawul",
                },
              ],
            },
          },
          right: {
            type: "VB",
            ps: [
              {
                p: "کېږ",
                f: "kéG",
              },
            ],
          },
        },
      ],
    ]);
  });
});
