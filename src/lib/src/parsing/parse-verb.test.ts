/* eslint-disable jest/valid-title */
import * as T from "../../../types";
import { verbLookup, wordQuery } from "./lookup";
import { parseVerb } from "./parse-verb";
import { tokenizer } from "./tokenizer";

const wahul = wordQuery("وهل", "verb");
const leekul = wordQuery("لیکل", "verb");
const manul = wordQuery("منل", "verb");
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
    ],
  },
  {
    label: "with regular intransitive verbs",
    cases: [
      {
        input: "رسېدلم",
        output: [
          {
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
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: rasedul,
          },
        ],
      },
      {
        input: "رسېږې",
        output: [
          {
            stem: {
              persons: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
              aspects: ["imperfective", "perfective"],
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
            stem: {
              persons: [T.Person.SecondPlurMale, T.Person.SecondPlurFemale],
              aspects: ["imperfective", "perfective"],
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
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: leedul,
          },
        ],
      },
      {
        input: "خورې",
        output: [
          {
            stem: {
              persons: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
              aspects: ["imperfective", "perfective"],
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
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["imperfective", "perfective"],
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
            stem: {
              persons: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: prexodul,
          },
        ],
      },
      {
        input: "پرېښوده",
        output: [
          {
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
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: xodul,
          },
          {
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: prexodul,
          },
          {
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
      const madeVbsS = output.reduce<Omit<T.VBE, "ps">[]>((acc, o) => {
        return [
          ...acc,
          ...(["root", "stem"] as const).flatMap((base) =>
            (o[base]?.aspects || []).flatMap((aspect) =>
              (o[base]?.persons || []).flatMap((person) => ({
                type: "VB" as const,
                person,
                info: {
                  type: "verb" as const,
                  aspect,
                  base,
                  verb: o.verb,
                },
              }))
            )
          ),
        ];
      }, []);
      expect(vbs).toIncludeSameMembers(madeVbsS);
    });
  });
});
