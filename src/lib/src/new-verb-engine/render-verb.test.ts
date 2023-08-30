/* eslint-disable jest/valid-title */
import { renderVerb } from "./render-verb";
import { vEntry } from "./rs-helpers";
import { wordQuery } from "../parsing/lookup";
import * as T from "../../../types";

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
});
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
});
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
});
const kedulDyn = vEntry({
  ts: 1527812754,
  i: 11101,
  p: "کېدل",
  f: "kedul",
  g: "kedul",
  e: "to happen, occur",
  r: 2,
  c: "v. intrans.",
  ssp: "وش",
  ssf: "óosh",
  prp: "وشول",
  prf: "óoshwul",
  pprtp: "شوی",
  pprtf: "shúway",
  diacExcept: true,
  ec: "happen",
  separationAtP: 1,
  separationAtF: 2,
});
const wahul = wordQuery("وهل", "verb");
const achawul = wordQuery("اچول", "verb");
const ganul = wordQuery("ګڼل", "verb");
const leedul = wordQuery("لیدل", "verb");
const raatlul = wordQuery("راتلل", "verb");
const wartlul = wordQuery("ورتلل", "verb");
const awuxtul = wordQuery("اوښتل", "verb");
const khorul = wordQuery("خوړل", "verb");
const khatul = wordQuery("ختل", "verb");
const rasedul = wordQuery("رسېدل", "verb");
const weshul = wordQuery("وېشل", "verb");
const tlul = wordQuery("تلل", "verb");
const bandawul = wordQuery("بندول", "verb");
const sturayKawul = wordQuery("ستړی کول", "verb");
const raawrul = wordQuery("راوړل", "verb");
const ooPh: T.PH = { type: "PH", ps: { p: "و", f: "óo" } };

// TODO: test all cases of یوړ یوړه یووړ یووړه
// and then parsing of all those!!

const tests: {
  label: string;
  cases: {
    input: Parameters<typeof renderVerb>[0];
    output: ReturnType<typeof renderVerb>;
  }[];
}[] = [
  {
    label: "basic tenses",
    cases: [
      {
        input: {
          verb: wahul,
          tense: "presentVerb",
          subject: T.Person.FirstSingMale,
          object: T.Person.ThirdSingMale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: false,
          vbs: [
            [],
            [
              {
                type: "VB",
                ps: [{ p: "وهم", f: "wahum" }],
                person: T.Person.FirstSingMale,
                info: {
                  aspect: "imperfective",
                  base: "stem",
                  type: "verb",
                  verb: wahul,
                },
              },
            ],
          ],
        },
      },
      {
        input: {
          verb: wahul,
          tense: "subjunctiveVerb",
          subject: T.Person.SecondSingMale,
          object: T.Person.ThirdPlurMale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: false,
          vbs: [
            [{ type: "PH", ps: { f: "óo", p: "و" } }],
            [
              {
                type: "VB",
                ps: [{ p: "وهې", f: "wahe" }],
                person: T.Person.SecondSingMale,
                info: {
                  type: "verb",
                  aspect: "perfective",
                  base: "stem",
                  verb: wahul,
                },
              },
            ],
          ],
        },
      },
      {
        input: {
          verb: wahul,
          tense: "habitualPerfectivePast",
          subject: T.Person.ThirdSingMale,
          object: T.Person.ThirdSingFemale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: true,
          vbs: [
            [{ type: "PH", ps: { f: "óo", p: "و" } }],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "وهله", f: "wahula" }],
                  short: [{ p: "وهه", f: "waha" }],
                },
                person: T.Person.ThirdSingFemale,
                info: {
                  type: "verb",
                  aspect: "perfective",
                  base: "root",
                  verb: wahul,
                },
              },
            ],
          ],
        },
      },
      {
        input: {
          verb: wahul,
          tense: "presentVerb",
          subject: T.Person.FirstSingMale,
          object: T.Person.ThirdSingMale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: false,
          vbs: [
            [],
            [
              {
                type: "VB",
                ps: [{ p: "وهم", f: "wahum" }],
                person: T.Person.FirstSingMale,
                info: {
                  type: "verb",
                  aspect: "imperfective",
                  base: "stem",
                  verb: wahul,
                },
              },
            ],
          ],
        },
      },
      {
        input: {
          verb: wahul,
          tense: "subjunctiveVerb",
          subject: T.Person.SecondSingMale,
          object: T.Person.ThirdSingMale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: false,
          vbs: [
            [{ type: "PH", ps: { f: "óo", p: "و" } }],
            [
              {
                type: "VB",
                ps: [{ p: "وهې", f: "wahe" }],
                person: T.Person.SecondSingMale,
                info: {
                  type: "verb",
                  aspect: "perfective",
                  base: "stem",
                  verb: wahul,
                },
              },
            ],
          ],
        },
      },
      {
        input: {
          verb: wahul,
          tense: "habitualPerfectivePast",
          subject: T.Person.FirstSingFemale,
          object: T.Person.ThirdSingFemale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: true,
          vbs: [
            [{ type: "PH", ps: { f: "óo", p: "و" } }],
            [
              {
                type: "VB",
                ps: {
                  long: [{ p: "وهله", f: "wahula" }],
                  short: [{ p: "وهه", f: "waha" }],
                },
                person: T.Person.ThirdSingFemale,
                info: {
                  type: "verb",
                  aspect: "perfective",
                  base: "root",
                  verb: wahul,
                },
              },
            ],
          ],
        },
      },
    ],
  },
  {
    label: "basic tenses with inflecting roots/stems",
    cases: [
      {
        input: {
          verb: bandawul,
          tense: "subjunctiveVerb",
          subject: T.Person.FirstSingMale,
          object: T.Person.ThirdSingFemale,
          voice: "active",
          negative: false,
        },
        output: {
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
                info: {
                  type: "verb",
                  aspect: "perfective",
                  base: "stem",
                  // TODO: should it be this and not kawul ??
                  verb: bandawul,
                },
              },
            ],
          ],
        },
      },
    ],
  },
  {
    label: "imperative tenses",
    cases: [
      {
        input: {
          verb: wahul,
          tense: "imperfectiveImperative",
          subject: T.Person.SecondSingMale,
          object: T.Person.ThirdSingMale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: false,
          vbs: [
            [],
            [
              {
                type: "VB",
                ps: [{ p: "وهه", f: "wahá" }],
                person: 2,
                info: {
                  type: "verb",
                  aspect: "imperfective",
                  base: "stem",
                  verb: wahul,
                },
              },
            ],
          ],
        },
      },
      {
        input: {
          verb: wahul,
          tense: "perfectiveImperative",
          subject: T.Person.SecondSingFemale,
          object: T.Person.ThirdSingMale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: false,
          vbs: [
            [ooPh],
            [
              {
                type: "VB",
                ps: [{ p: "وهه", f: "waha" }],
                person: 3,
                info: {
                  type: "verb",
                  verb: wahul,
                  aspect: "perfective",
                  base: "stem",
                },
              },
            ],
          ],
        },
      },
      {
        input: {
          verb: wahul,
          tense: "imperfectiveImperative",
          subject: T.Person.SecondPlurMale,
          object: T.Person.ThirdSingMale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: false,
          vbs: [
            [],
            [
              {
                type: "VB",
                ps: [{ p: "وهئ", f: "wahéy" }],
                person: 8,
                info: {
                  type: "verb",
                  aspect: "imperfective",
                  base: "stem",
                  verb: wahul,
                },
              },
            ],
          ],
        },
      },
      {
        input: {
          verb: wahul,
          tense: "perfectiveImperative",
          subject: T.Person.SecondPlurFemale,
          object: T.Person.ThirdSingMale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: false,
          vbs: [
            [ooPh],
            [
              {
                type: "VB",
                ps: [{ p: "وهئ", f: "wahey" }],
                person: 9,
                info: {
                  type: "verb",
                  base: "stem",
                  aspect: "perfective",
                  verb: wahul,
                },
              },
            ],
          ],
        },
      },
    ],
  },
  {
    label: "ability tenses",
    cases: [
      {
        input: {
          verb: wahul,
          tense: "presentVerbModal",
          subject: T.Person.FirstSingMale,
          object: T.Person.ThirdSingMale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: false,
          vbs: [
            [],
            [
              {
                type: "VB",
                ps: {
                  long: [
                    { p: "وهلی", f: "wahúlay" },
                    { p: "وهلای", f: "wahúlaay" },
                  ],
                  short: [
                    { p: "وهی", f: "waháy" },
                    { p: "وهای", f: "waháay" },
                  ],
                },
                info: {
                  type: "ability",
                  verb: wahul,
                  aspect: "imperfective",
                },
              },
              {
                type: "VB",
                ps: [{ p: "شم", f: "shum" }],
                person: T.Person.FirstSingMale,
                info: {
                  type: "verb",
                  aspect: "perfective",
                  base: "stem",
                  abilityAux: true,
                  verb: kedulStat,
                },
              },
            ],
          ],
        },
      },
    ],
  },
  {
    label: "perfect tenses",
    cases: [
      {
        input: {
          verb: wahul,
          tense: "presentPerfect",
          subject: T.Person.SecondSingMale,
          object: T.Person.FirstSingMale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: false,
          vbs: [
            [],
            [
              {
                type: "VB",
                ps: [{ p: "وهلی", f: "wahúlay" }],
                info: {
                  type: "ppart",
                  verb: wahul,
                  genNum: {
                    gender: "masc",
                    number: "singular",
                  },
                },
              },
              {
                type: "VB",
                ps: [{ p: "یم", f: "yum" }],
                person: T.Person.FirstSingMale,
                info: {
                  type: "equative",
                  tense: "present",
                },
              },
            ],
          ],
        },
      },
      {
        input: {
          verb: wahul,
          tense: "subjunctivePerfect",
          subject: T.Person.ThirdPlurFemale,
          object: T.Person.FirstSingMale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: false,
          vbs: [
            [],
            [
              {
                type: "VB",
                ps: [{ p: "وهلی", f: "wahúlay" }],
                info: {
                  type: "ppart",
                  genNum: {
                    gender: "masc",
                    number: "singular",
                  },
                  verb: wahul,
                },
              },
              {
                type: "VB",
                ps: [{ p: "وم", f: "wum" }],
                person: T.Person.FirstSingMale,
                info: {
                  type: "equative",
                  tense: "subjunctive",
                },
              },
            ],
          ],
        },
      },
      {
        input: {
          verb: wahul,
          tense: "habitualPerfect",
          object: T.Person.FirstSingMale,
          subject: T.Person.ThirdSingMale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: false,
          vbs: [
            [],
            [
              {
                type: "VB",
                ps: [{ p: "وهلی", f: "wahúlay" }],
                info: {
                  type: "ppart",
                  verb: wahul,
                  genNum: {
                    gender: "masc",
                    number: "singular",
                  },
                },
              },
              {
                type: "VB",
                ps: [{ p: "یم", f: "yum" }],
                person: T.Person.FirstSingMale,
                info: {
                  type: "equative",
                  tense: "habitual",
                },
              },
            ],
          ],
        },
      },
    ],
  },
  {
    label: "perfect tenses",
    cases: [
      {
        input: {
          verb: wahul,
          tense: "habitualPerfect",
          subject: T.Person.FirstPlurMale,
          object: T.Person.ThirdPlurMale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: false,
          vbs: [
            [],
            [
              {
                type: "VB",
                ps: [{ p: "وهلي", f: "wahúlee" }],
                info: {
                  type: "ppart",
                  verb: wahul,
                  genNum: {
                    gender: "masc",
                    number: "plural",
                  },
                },
              },
              {
                type: "VB",
                ps: [{ p: "وي", f: "wee" }],
                person: T.Person.ThirdPlurMale,
                info: {
                  type: "equative",
                  tense: "habitual",
                },
              },
            ],
          ],
        },
      },
      {
        input: {
          verb: wahul,
          tense: "futurePerfect",
          object: T.Person.FirstSingMale,
          subject: T.Person.ThirdPlurMale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: true,
          vbs: [
            [],
            [
              {
                type: "VB",
                ps: [{ p: "وهلی", f: "wahúlay" }],
                info: {
                  type: "ppart",
                  verb: wahul,
                  genNum: {
                    gender: "masc",
                    number: "singular",
                  },
                },
              },
              {
                type: "VB",
                ps: [{ p: "یم", f: "yum" }],
                person: T.Person.FirstSingMale,
                info: {
                  type: "equative",
                  tense: "habitual",
                },
              },
            ],
          ],
        },
      },
      {
        input: {
          verb: wahul,
          tense: "pastPerfect",
          subject: T.Person.FirstPlurFemale,
          object: T.Person.SecondSingFemale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: false,
          vbs: [
            [],
            [
              {
                type: "VB",
                ps: [{ p: "وهلې", f: "wahúle" }],
                info: {
                  type: "ppart",
                  verb: wahul,
                  genNum: {
                    gender: "fem",
                    number: "singular",
                  },
                },
              },
              {
                type: "VB",
                ps: {
                  long: [{ p: "ولې", f: "wule" }],
                  short: [{ p: "وې", f: "we" }],
                },
                person: T.Person.SecondSingFemale,
                info: {
                  type: "equative",
                  tense: "past",
                },
              },
            ],
          ],
        },
      },
      {
        input: {
          verb: wahul,
          tense: "wouldBePerfect",
          subject: T.Person.ThirdSingMale,
          object: T.Person.SecondSingFemale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: true,
          vbs: [
            [],
            [
              {
                type: "VB",
                ps: [{ p: "وهلې", f: "wahúle" }],
                info: {
                  type: "ppart",
                  verb: wahul,
                  genNum: {
                    gender: "fem",
                    number: "singular",
                  },
                },
              },
              {
                type: "VB",
                ps: {
                  long: [{ p: "ولې", f: "wule" }],
                  short: [{ p: "وې", f: "we" }],
                },
                person: T.Person.SecondSingFemale,
                info: {
                  type: "equative",
                  tense: "past",
                },
              },
            ],
          ],
        },
      },
      {
        input: {
          verb: wahul,
          tense: "pastSubjunctivePerfect",
          object: T.Person.SecondSingFemale,
          subject: T.Person.FirstPlurMale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: false,
          vbs: [
            [],
            [
              {
                type: "VB",
                ps: [{ p: "وهلې", f: "wahúle" }],
                info: {
                  type: "ppart",
                  verb: wahul,
                  genNum: {
                    gender: "fem",
                    number: "singular",
                  },
                },
              },
              {
                type: "VB",
                ps: [
                  { p: "وای", f: "waay" },
                  { p: "وی", f: "way" },
                ],
                person: T.Person.SecondSingFemale,
                info: {
                  type: "equative",
                  tense: "pastSubjunctive",
                },
              },
            ],
          ],
        },
      },
      {
        input: {
          verb: wahul,
          tense: "wouldHaveBeenPerfect",
          subject: T.Person.FirstSingMale,
          object: T.Person.SecondSingFemale,
          voice: "active",
          negative: false,
        },
        output: {
          hasBa: true,
          vbs: [
            [],
            [
              {
                type: "VB",
                ps: [{ p: "وهلې", f: "wahúle" }],
                info: {
                  type: "ppart",
                  verb: wahul,
                  genNum: {
                    gender: "fem",
                    number: "singular",
                  },
                },
              },
              {
                type: "VB",
                ps: [
                  { p: "وای", f: "waay" },
                  { p: "وی", f: "way" },
                ],
                person: T.Person.SecondSingFemale,
                info: {
                  type: "equative",
                  tense: "pastSubjunctive",
                },
              },
            ],
          ],
        },
      },
    ],
  },
  {
    label: "ending on complex verbs",
    cases: [
      {
        input: {
          verb: sturayKawul,
          tense: "presentVerb",
          subject: T.Person.SecondSingMale,
          voice: "active",
          object: T.Person.ThirdSingFemale,
          negative: false,
        },
        output: {
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
                info: {
                  type: "verb",
                  aspect: "imperfective",
                  base: "stem",
                  verb: sturayKawul,
                },
              },
            ],
          ],
        },
      },
      {
        input: {
          verb: sturayKawul,
          tense: "presentVerbModal",
          subject: T.Person.SecondSingMale,
          object: T.Person.ThirdSingFemale,
          voice: "active",
          negative: false,
        },
        output: {
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
                      { p: "کولی", f: "kawúlay" },
                      { p: "کولای", f: "kawúlaay" },
                    ],
                    short: [
                      { p: "کوی", f: "kawáy" },
                      { p: "کوای", f: "kawáay" },
                    ],
                  },
                },
                info: {
                  type: "ability",
                  verb: sturayKawul,
                  aspect: "imperfective",
                },
              },
              {
                type: "VB",
                ps: [{ p: "شې", f: "she" }],
                person: 2,
                info: {
                  type: "verb",
                  aspect: "perfective",
                  base: "stem",
                  verb: kedulStat,
                  abilityAux: true,
                },
              },
            ],
          ],
        },
      },
    ],
  },
];

tests.forEach(({ label, cases }) => {
  test(label, () => {
    cases.forEach(({ input, output }) => {
      expect(renderVerb(input)).toEqual(output);
    });
  });
});

test("special endings", () => {
  const tests: {
    verb: T.VerbEntryNoFVars;
    tense: "perfectivePast" | "imperfectivePast";
    result: T.VerbRenderedOutput;
  }[] = [
    // verbs ending in -awul
    {
      verb: achawul,
      tense: "perfectivePast",
      result: [
        [{ type: "PH", ps: { p: "وا", f: "wáa" } }],
        [
          {
            type: "VB",
            ps: {
              long: [{ p: "چولو", f: "chawulo" }],
              short: [{ p: "چاوه", f: "chaawu" }],
            },
            person: 4,
            info: {
              type: "verb",
              aspect: "perfective",
              base: "root",
              verb: achawul,
            },
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
            info: {
              type: "verb",
              aspect: "imperfective",
              base: "root",
              verb: achawul,
            },
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
            info: {
              type: "verb",
              aspect: "perfective",
              base: "root",
              verb: ganul,
            },
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
            info: {
              type: "verb",
              aspect: "imperfective",
              base: "root",
              verb: ganul,
            },
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
                // { p: "خته", f: "khatu" }, ???
                // { p: "خوتو", f: "khoto" },
              ],
            },
            person: 4,
            info: {
              type: "verb",
              aspect: "perfective",
              base: "root",
              verb: khatul,
            },
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
                { p: "لیده", f: "leedú" },
              ],
            },
            person: 4,
            info: {
              type: "verb",
              aspect: "imperfective",
              base: "root",
              verb: leedul,
            },
          },
        ],
      ],
    },
    {
      verb: raawrul,
      tense: "perfectivePast",
      result: [
        [{ type: "PH", ps: { p: "را", f: "ráa" } }],
        [
          {
            type: "VB",
            ps: {
              long: [{ p: "وړلو", f: "wRulo" }],
              short: [
                { p: "ووړ", f: "woR" },
                { p: "وړه", f: "wRu" },
              ],
            },
            person: 4,
            info: {
              type: "verb",
              aspect: "perfective",
              base: "root",
              verb: raawrul,
            },
          },
        ],
      ],
    },
    {
      verb: raawrul,
      tense: "imperfectivePast",
      result: [
        [],
        [
          {
            type: "VB",
            ps: {
              long: [{ p: "راوړلو", f: "raawRúlo" }],
              short: [
                { p: "راووړ", f: "raawóR" },
                { p: "راوړه", f: "raawRú" },
              ],
            },
            person: 4,
            info: {
              type: "verb",
              aspect: "imperfective",
              base: "root",
              verb: raawrul,
            },
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
            info: {
              type: "verb",
              aspect: "perfective",
              base: "root",
              verb: rasedul,
            },
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
            info: {
              type: "verb",
              aspect: "imperfective",
              base: "root",
              verb: awuxtul,
            },
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
            info: {
              type: "verb",
              aspect: "perfective",
              base: "root",
              verb: weshul,
            },
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
            info: {
              type: "verb",
              aspect: "perfective",
              base: "root",
              verb: kedulStat,
            },
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
            info: {
              type: "verb",
              aspect: "imperfective",
              base: "root",
              verb: kedulStat,
            },
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
              mini: [
                { p: "که", f: "ku" },
                { p: "کو", f: "ko" },
              ],
            },
            person: T.Person.ThirdSingMale,
            info: {
              type: "verb",
              aspect: "perfective",
              base: "root",
              verb: kawulStat,
            },
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
              mini: [
                { p: "که", f: "ku" },
                { p: "کو", f: "ko" },
              ],
            },
            person: T.Person.ThirdSingMale,
            info: {
              type: "verb",
              aspect: "perfective",
              base: "root",
              verb: kawulDyn,
            },
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
            info: {
              type: "verb",
              aspect: "imperfective",
              base: "root",
              verb: kawulDyn,
            },
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
              short: [
                { p: "ته", f: "tú" },
                {
                  p: "تلو",
                  f: "tló",
                },
              ],
            },
            person: T.Person.ThirdSingMale,
            info: {
              type: "verb",
              aspect: "imperfective",
              base: "root",
              verb: tlul,
            },
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
              short: [
                { p: "راته", f: "raatú" },
                { p: "راتلو", f: "raatló" },
              ],
            },
            person: T.Person.ThirdSingMale,
            info: {
              type: "verb",
              aspect: "imperfective",
              base: "root",
              verb: raatlul,
            },
          },
        ],
      ],
    },
    {
      verb: raatlul,
      tense: "perfectivePast",
      result: [
        [{ type: "PH", ps: { p: "را", f: "ráa" } }],
        [
          {
            type: "VB",
            ps: [{ p: "غی", f: "ghay" }],
            person: T.Person.ThirdSingMale,
            info: {
              type: "verb",
              aspect: "perfective",
              base: "root",
              verb: raatlul,
            },
          },
        ],
      ],
    },
    {
      verb: wartlul,
      tense: "perfectivePast",
      result: [
        [{ type: "PH", ps: { p: "ور", f: "wár" } }],
        [
          {
            type: "VB",
            ps: [{ p: "غی", f: "ghay" }],
            person: T.Person.ThirdSingMale,
            info: {
              type: "verb",
              aspect: "perfective",
              base: "root",
              verb: wartlul,
            },
          },
        ],
      ],
    },
  ];
  tests.forEach((x) => {
    expect(
      renderVerb({
        verb: x.verb,
        tense: x.tense,
        subject: T.Person.ThirdSingMale,
        object: x.verb.entry.c.includes("intrans.")
          ? undefined
          : T.Person.ThirdSingMale,
        voice: "active",
        negative: false,
      })
    ).toEqual({ hasBa: false, vbs: x.result });
  });

  expect(
    renderVerb({
      verb: kedulStat,
      tense: "perfectivePast",
      subject: T.Person.FirstPlurMale,
      object: undefined,
      voice: "active",
      negative: false,
    })
  ).toEqual({
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
          info: {
            type: "verb",
            aspect: "perfective",
            base: "root",
            verb: kedulStat,
          },
        },
      ],
    ],
  });
  expect(
    renderVerb({
      verb: tlul,
      tense: "imperfectivePast",
      subject: T.Person.FirstSingMale,
      object: undefined,
      voice: "active",
      negative: false,
    })
  ).toEqual({
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
          info: {
            type: "verb",
            aspect: "imperfective",
            base: "root",
            verb: tlul,
          },
        },
      ],
    ],
  });
  expect(
    renderVerb({
      verb: tlul,
      tense: "imperfectivePast",
      subject: T.Person.ThirdSingFemale,
      object: undefined,
      voice: "active",
      negative: false,
    })
  ).toEqual({
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
          info: {
            type: "verb",
            aspect: "imperfective",
            base: "root",
            verb: tlul,
          },
        },
      ],
    ],
  });
  // avoid redundant ل ending
  expect(
    renderVerb({
      verb: khorul,
      tense: "imperfectivePast",
      subject: T.Person.FirstSingMale,
      object: T.Person.ThirdPlurMale,
      voice: "active",
      negative: false,
    })
  ).toEqual({
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
          info: {
            type: "verb",
            aspect: "imperfective",
            base: "root",
            verb: khorul,
          },
        },
      ],
    ],
  });
  expect(
    renderVerb({
      verb: khorul,
      tense: "perfectivePast",
      subject: T.Person.FirstSingMale,
      object: T.Person.ThirdPlurMale,
      voice: "active",
      negative: false,
    })
  ).toEqual({
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
          info: {
            type: "verb",
            aspect: "perfective",
            base: "root",
            verb: khorul,
          },
        },
      ],
    ],
  });
});
