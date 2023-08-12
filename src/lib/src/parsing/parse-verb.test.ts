/* eslint-disable jest/valid-title */
import * as T from "../../../types";
import { verbLookup, wordQuery } from "./lookup";
import { parseVerb } from "./parse-verb";
import { tokenizer } from "./tokenizer";

const wahul = wordQuery("وهل", "verb");
const leekul = wordQuery("لیکل", "verb");
const manul = wordQuery("منل", "verb");
const gaalul = wordQuery("ګالل", "verb");
const rasedul = wordQuery("رسېدل", "verb");
const leedul = wordQuery("لیدل", "verb");
const khorul = wordQuery("خوړل", "verb");
const kenaastul = wordQuery("کېناستل", "verb");
const prexodul = wordQuery("پرېښودل", "verb");
const xodul = wordQuery("ښودل", "verb");
const kexodul = wordQuery("کېښودل", "verb");

const tests: {
  label: string;
  cases: {
    input: string;
    output: {
      ph: string | undefined;
      root?: {
        persons: T.Person[];
        aspects: T.Aspect[];
      };
      stem?: {
        persons: T.Person[];
        aspects: T.Aspect[];
      };
      verb: T.VerbEntry;
    }[];
  }[];
}[] = [
  {
    label: "with regular simple verbs",
    cases: [
      {
        input: "وهلم",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: wahul,
          },
        ],
      },
      {
        input: "وهم",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            stem: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: wahul,
          },
        ],
      },
      {
        input: "وهې",
        output: [
          {
            ph: undefined,
            root: {
              persons: [
                T.Person.SecondSingMale,
                T.Person.SecondSingFemale,
                T.Person.ThirdPlurFemale,
              ],
              aspects: ["imperfective", "perfective"],
            },
            stem: {
              persons: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: wahul,
          },
        ],
      },
      {
        input: "لیکم",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            stem: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: leekul,
          },
        ],
      },
      {
        input: "لیکلو",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: leekul,
          },
        ],
      },
      {
        input: "لیکل",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.ThirdPlurMale],
              aspects: ["imperfective", "perfective"],
            },
            verb: leekul,
          },
        ],
      },
      {
        input: "لیکلل",
        output: [],
      },
      {
        input: "منله",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: manul,
          },
        ],
      },
      {
        input: "مني",
        output: [
          {
            ph: undefined,
            stem: {
              persons: [
                T.Person.ThirdSingMale,
                T.Person.ThirdSingFemale,
                T.Person.ThirdPlurMale,
                T.Person.ThirdPlurFemale,
              ],
              aspects: ["imperfective", "perfective"],
            },
            verb: manul,
          },
        ],
      },
      {
        input: "منئ",
        output: [
          {
            ph: undefined,
            stem: {
              persons: [T.Person.SecondPlurMale, T.Person.SecondPlurFemale],
              aspects: ["imperfective", "perfective"],
            },
            root: {
              persons: [T.Person.SecondPlurMale, T.Person.SecondPlurFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: manul,
          },
        ],
      },
      // with perfective head
      {
        input: "ومنلم",
        output: [
          {
            ph: "و",
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: manul,
          },
        ],
      },
      {
        input: "منلم",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective", "imperfective"],
            },
            verb: manul,
          },
        ],
      },
      {
        input: "وګاللې",
        output: [
          {
            ph: "و",
            root: {
              persons: [
                T.Person.SecondSingFemale,
                T.Person.SecondSingMale,
                T.Person.ThirdPlurFemale,
              ],
              aspects: ["perfective"],
            },
            verb: gaalul,
          },
        ],
      },
      {
        input: "وګالې",
        output: [
          {
            ph: "و",
            root: {
              persons: [
                T.Person.SecondSingFemale,
                T.Person.SecondSingMale,
                T.Person.ThirdPlurFemale,
              ],
              aspects: ["perfective"],
            },
            stem: {
              persons: [T.Person.SecondSingFemale, T.Person.SecondSingMale],
              aspects: ["perfective"],
            },
            verb: gaalul,
          },
        ],
      },
    ],
  },
  {
    label: "with regular intransitive verbs",
    cases: [
      {
        input: "رسېدلم",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: rasedul,
          },
        ],
      },
      {
        input: "رسېدم",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: rasedul,
          },
        ],
      },
      {
        input: "ورسېدم",
        output: [
          {
            ph: "و",
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: rasedul,
          },
        ],
      },
      {
        input: "رسېږې",
        output: [
          {
            ph: undefined,
            stem: {
              persons: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: rasedul,
          },
        ],
      },
      {
        input: "ورسېږې",
        output: [
          {
            ph: "و",
            stem: {
              persons: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
              aspects: ["perfective"],
            },
            verb: rasedul,
          },
        ],
      },
      // short version of intransitive as well
      {
        input: "رسئ",
        output: [
          {
            ph: undefined,
            stem: {
              persons: [T.Person.SecondPlurMale, T.Person.SecondPlurFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: rasedul,
          },
        ],
      },
      {
        input: "ورسئ",
        output: [
          {
            ph: "و",
            stem: {
              persons: [T.Person.SecondPlurMale, T.Person.SecondPlurFemale],
              aspects: ["perfective"],
            },
            verb: rasedul,
          },
        ],
      },
    ],
  },
  {
    label: "verbs with irregular stems",
    cases: [
      {
        input: "وینم",
        output: [
          {
            ph: undefined,
            stem: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: leedul,
          },
        ],
      },
      {
        input: "وینم",
        output: [
          {
            ph: undefined,
            stem: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: leedul,
          },
        ],
      },
      {
        input: "لیده",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: leedul,
          },
        ],
      },
      {
        input: "ولیده",
        output: [
          {
            ph: "و",
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: leedul,
          },
        ],
      },
      {
        input: "ولیدله",
        output: [
          {
            ph: "و",
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: leedul,
          },
        ],
      },
      {
        input: "خورې",
        output: [
          {
            ph: undefined,
            stem: {
              persons: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: khorul,
          },
        ],
      },
      {
        input: "وخورې",
        output: [
          {
            ph: "و",
            stem: {
              persons: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
              aspects: ["perfective"],
            },
            verb: khorul,
          },
        ],
      },
      {
        input: "خوړي",
        output: [],
      },
      {
        input: "خوړم",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: khorul,
          },
        ],
      },
      {
        input: "وخوړم",
        output: [
          {
            ph: "و",
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: khorul,
          },
        ],
      },
    ],
  },
  {
    label: "verbs with seperating prefix",
    cases: [
      {
        input: "کېني",
        output: [
          {
            ph: "کې",
            stem: {
              persons: [
                T.Person.ThirdSingMale,
                T.Person.ThirdSingFemale,
                T.Person.ThirdPlurMale,
                T.Person.ThirdPlurFemale,
              ],
              aspects: ["imperfective", "perfective"],
            },
            verb: kenaastul,
          },
        ],
      },
      {
        input: "نم",
        output: [
          {
            ph: undefined,
            stem: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: kenaastul,
          },
        ],
      },
      {
        input: "پرېږدو",
        output: [
          {
            ph: "پرې",
            stem: {
              persons: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: prexodul,
          },
        ],
      },
      {
        input: "ږدو",
        output: [
          {
            ph: undefined,
            stem: {
              persons: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
              aspects: ["perfective"],
            },
            verb: prexodul,
          },
          {
            ph: undefined,
            stem: {
              persons: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: kexodul,
          },
        ],
      },
      {
        input: "پرېښوده",
        output: [
          {
            ph: "پرې",
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: prexodul,
          },
        ],
      },
      {
        input: "ښودله",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: xodul,
          },
          {
            ph: undefined,
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: prexodul,
          },
          {
            ph: undefined,
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: kexodul,
          },
        ],
      },
    ],
  },
];

tests.forEach(({ label, cases }) => {
  test(label, () => {
    cases.forEach(({ input, output }) => {
      const tokens = tokenizer(input);
      const vbs = parseVerb(tokens, verbLookup).map((r) => r.body);
      const madeVbsS = output.reduce<
        [{ type: "PH"; s: string } | undefined, Omit<T.VBE, "ps">][]
      >((acc, o) => {
        return [
          ...acc,
          ...(["root", "stem"] as const).flatMap((base) =>
            (o[base]?.aspects || []).flatMap((aspect) =>
              (o[base]?.persons || []).flatMap<
                [{ type: "PH"; s: string } | undefined, Omit<T.VBE, "ps">]
              >((person) => {
                const r: [
                  { type: "PH"; s: string } | undefined,
                  Omit<T.VBE, "ps">
                ] = [
                  aspect === "perfective" && o.ph
                    ? {
                        type: "PH",
                        s: o.ph,
                      }
                    : undefined,
                  {
                    type: "VB" as const,
                    person,
                    info: {
                      type: "verb" as const,
                      aspect,
                      base,
                      verb: o.verb,
                    },
                  },
                ];
                return [r];
              })
            )
          ),
        ];
      }, []);
      expect(vbs).toIncludeSameMembers(madeVbsS);
    });
  });
});

const b = [
  [
    undefined,
    {
      info: {
        aspect: "imperfective",
        base: "stem",
        type: "verb",
        verb: {
          entry: {
            c: "v. trans.",
            e: "to put, to put down, to set in place",
            ec: "put,puts,putting,put,put",
            f: "kexodul",
            g: "kexodul",
            i: 11193,
            noOo: true,
            p: "کېښودل",
            psf: "Gd",
            psp: "ږد",
            r: 4,
            separationAtF: 2,
            separationAtP: 2,
            ssf: "kéGd",
            ssp: "کېږد",
            ts: 1527812284,
          },
        },
      },
      person: 6,
      type: "VB",
    },
  ],
  [
    undefined,
    {
      info: {
        aspect: "imperfective",
        base: "stem",
        type: "verb",
        verb: {
          entry: {
            c: "v. trans.",
            e: "to put, to put down, to set in place",
            ec: "put,puts,putting,put,put",
            f: "kexodul",
            g: "kexodul",
            i: 11193,
            noOo: true,
            p: "کېښودل",
            psf: "Gd",
            psp: "ږد",
            r: 4,
            separationAtF: 2,
            separationAtP: 2,
            ssf: "kéGd",
            ssp: "کېږد",
            ts: 1527812284,
          },
        },
      },
      person: 7,
      type: "VB",
    },
  ],
  [
    undefined,
    {
      info: {
        aspect: "perfective",
        base: "stem",
        type: "verb",
        verb: {
          entry: {
            c: "v. trans.",
            e: "to leave, abandon, forsake, let go, allow",
            ec: "abandon",
            f: "prexodúl",
            g: "prexodul",
            i: 2516,
            noOo: true,
            p: "پرېښودل",
            psf: "preGd",
            psp: "پرېږد",
            r: 4,
            separationAtF: 3,
            separationAtP: 3,
            ts: 1527815190,
          },
        },
      },
      person: 6,
      type: "VB",
    },
  ],
  [
    undefined,
    {
      info: {
        aspect: "perfective",
        base: "stem",
        type: "verb",
        verb: {
          entry: {
            c: "v. trans.",
            e: "to leave, abandon, forsake, let go, allow",
            ec: "abandon",
            f: "prexodúl",
            g: "prexodul",
            i: 2516,
            noOo: true,
            p: "پرېښودل",
            psf: "preGd",
            psp: "پرېږد",
            r: 4,
            separationAtF: 3,
            separationAtP: 3,
            ts: 1527815190,
          },
        },
      },
      person: 7,
      type: "VB",
    },
  ],
  [
    { s: "کې", type: "PH" },
    {
      info: {
        aspect: "perfective",
        base: "stem",
        type: "verb",
        verb: {
          entry: {
            c: "v. trans.",
            e: "to put, to put down, to set in place",
            ec: "put,puts,putting,put,put",
            f: "kexodul",
            g: "kexodul",
            i: 11193,
            noOo: true,
            p: "کېښودل",
            psf: "Gd",
            psp: "ږد",
            r: 4,
            separationAtF: 2,
            separationAtP: 2,
            ssf: "kéGd",
            ssp: "کېږد",
            ts: 1527812284,
          },
        },
      },
      person: 6,
      type: "VB",
    },
  ],
  [
    { s: "کې", type: "PH" },
    {
      info: {
        aspect: "perfective",
        base: "stem",
        type: "verb",
        verb: {
          entry: {
            c: "v. trans.",
            e: "to put, to put down, to set in place",
            ec: "put,puts,putting,put,put",
            f: "kexodul",
            g: "kexodul",
            i: 11193,
            noOo: true,
            p: "کېښودل",
            psf: "Gd",
            psp: "ږد",
            r: 4,
            separationAtF: 2,
            separationAtP: 2,
            ssf: "kéGd",
            ssp: "کېږد",
            ts: 1527812284,
          },
        },
      },
      person: 7,
      type: "VB",
    },
  ],
];
