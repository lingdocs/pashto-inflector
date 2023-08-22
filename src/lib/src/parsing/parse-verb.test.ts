/* eslint-disable jest/valid-title */
import * as T from "../../../types";
import {
  dartlul,
  kedulDyn,
  kedulStat,
  tlul,
  wartlul,
  raatlul,
} from "./irreg-verbs";
import { verbLookup, wordQuery } from "./lookup";
import { parseVerb } from "./parse-verb";
import { tokenizer } from "./tokenizer";
import { removeKeys } from "./utils";

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
const katul = wordQuery("کتل", "verb");
const watul = wordQuery("وتل", "verb");
const wurul = wordQuery("وړل", "verb");
const akheestul = wordQuery("اخیستل", "verb");
const alwatul = wordQuery("الوتل", "verb");
// const dartlul = wordQuery("درتلل", "verb")

// todo alwatul waalwatul akhistul azmoyul etc

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
              aspects: ["perfective", "imperfective"],
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
              aspects: ["perfective", "imperfective"],
            },
            stem: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective", "imperfective"],
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
              aspects: ["perfective", "imperfective"],
            },
            stem: {
              persons: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
              aspects: ["perfective", "imperfective"],
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
              aspects: ["perfective", "imperfective"],
            },
            stem: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective", "imperfective"],
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
              persons: [
                T.Person.FirstPlurMale,
                T.Person.FirstPlurFemale,
                T.Person.ThirdSingMale,
              ],
              aspects: ["perfective", "imperfective"],
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

      {
        input: "منلم",
        output: [
          {
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective", "imperfective"],
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
      // but not for kedul
      {
        input: "کې",
        output: [],
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
      // TODO!! THESE COULD ALSO BE MALE
      {
        input: "لیده",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingFemale, T.Person.ThirdSingMale],
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
      {
        input: "خوړ",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective", "perfective"],
            },
            verb: khorul,
          },
        ],
      },

      {
        input: "کوت",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective", "perfective"],
            },
            verb: katul,
          },
        ],
      },
      {
        input: "کاته",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective", "perfective"],
            },
            verb: katul,
          },
        ],
      },

      {
        input: "خلم",
        output: [
          {
            stem: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: akheestul,
          },
        ],
      },
      {
        input: "اخیستم",
        output: [
          {
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: akheestul,
          },
        ],
      },

      {
        input: "خیستلم",
        output: [
          {
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: akheestul,
          },
        ],
      },
      {
        input: "الوځې",
        output: [
          {
            stem: {
              persons: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: alwatul,
          },
        ],
      },

      {
        input: "لوځې",
        output: [
          {
            stem: {
              persons: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
              aspects: ["perfective"],
            },
            verb: alwatul,
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
              aspects: ["imperfective"],
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
        input: "کېناست",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective"],
            },
            verb: kenaastul,
          },
        ],
      },
      {
        input: "ناست",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale],
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
              aspects: ["imperfective"],
            },
            verb: prexodul,
          },
        ],
      },
      {
        input: "ږدو",
        output: [
          {
            stem: {
              persons: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
              aspects: ["perfective"],
            },
            verb: prexodul,
          },
          {
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
            root: {
              persons: [T.Person.ThirdSingFemale, T.Person.ThirdSingMale],
              aspects: ["imperfective"],
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
      {
        input: "ړلم",
        output: [
          {
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: tlul,
          },
          {
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: wurul,
          },
        ],
      },
      {
        input: "ړم",
        output: [
          {
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: tlul,
          },
          {
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: wurul,
          },
        ],
      },
      {
        input: "لواته",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["perfective"],
            },
            verb: alwatul,
          },
        ],
      },
      {
        input: "سم",
        output: [
          {
            stem: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: wurul,
          },
        ],
      },
    ],
  },
  {
    label: "verbs with different 3rd pers sing past endings",
    cases: [
      {
        input: "رسېد",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective", "perfective"],
            },
            verb: rasedul,
          },
        ],
      },
      {
        input: "کېناسته",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale, T.Person.ThirdSingFemale],
              aspects: ["imperfective"],
            },
            verb: kenaastul,
          },
        ],
      },
      {
        input: "کېناست",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective"],
            },
            verb: kenaastul,
          },
        ],
      },
      {
        input: "کېناستو",
        output: [
          {
            root: {
              persons: [
                T.Person.ThirdSingMale,
                T.Person.FirstPlurMale,
                T.Person.FirstPlurFemale,
              ],
              aspects: ["imperfective"],
            },
            verb: kenaastul,
          },
        ],
      },
      {
        input: "واته",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective", "perfective"],
            },
            verb: watul,
          },
        ],
      },
      {
        input: "ووت",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective", "perfective"],
            },
            verb: watul,
          },
        ],
      },
    ],
  },
  {
    label: "irregular verbs",
    cases: [
      {
        input: "ته",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective"],
            },
            verb: tlul,
          },
        ],
      },
      {
        input: "راته",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective"],
            },
            verb: raatlul,
          },
        ],
      },
      {
        input: "ورته",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective"],
            },
            verb: wartlul,
          },
        ],
      },
      {
        input: "درته",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective"],
            },
            verb: dartlul,
          },
        ],
      },
      {
        input: "شو",
        output: [
          {
            root: {
              persons: [
                T.Person.ThirdSingMale,
                T.Person.FirstPlurMale,
                T.Person.FirstPlurFemale,
              ],
              aspects: ["perfective"],
            },
            stem: {
              persons: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
              aspects: ["perfective"],
            },
            verb: kedulStat,
          },
          {
            root: {
              persons: [
                T.Person.ThirdSingMale,
                T.Person.FirstPlurMale,
                T.Person.FirstPlurFemale,
              ],
              aspects: ["perfective"],
            },
            stem: {
              persons: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
              aspects: ["perfective"],
            },
            verb: kedulDyn,
          },
        ],
      },
      {
        input: "شوله",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: kedulStat,
          },
          {
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: kedulDyn,
          },
        ],
      },
      {
        input: "شوه",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: kedulStat,
          },
          {
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: kedulDyn,
          },
        ],
      },
      {
        input: "شوله",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: kedulStat,
          },
          {
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: kedulDyn,
          },
        ],
      },

      // TODO: It would probably be more effecient just to return the kedul verb options
      // and then when we put things together with the perfective head parsed they could
      // become raatlul etc...
      {
        input: "شي",
        output: [
          {
            stem: {
              persons: [
                T.Person.ThirdSingMale,
                T.Person.ThirdSingFemale,
                T.Person.ThirdPlurMale,
                T.Person.ThirdPlurFemale,
              ],
              aspects: ["perfective"],
            },
            verb: kedulDyn,
          },
          {
            stem: {
              persons: [
                T.Person.ThirdSingMale,
                T.Person.ThirdSingFemale,
                T.Person.ThirdPlurMale,
                T.Person.ThirdPlurFemale,
              ],
              aspects: ["perfective"],
            },
            verb: kedulStat,
          },
          {
            stem: {
              persons: [
                T.Person.ThirdSingMale,
                T.Person.ThirdSingFemale,
                T.Person.ThirdPlurMale,
                T.Person.ThirdPlurFemale,
              ],
              aspects: ["perfective"],
            },
            verb: raatlul,
          },
          {
            stem: {
              persons: [
                T.Person.ThirdSingMale,
                T.Person.ThirdSingFemale,
                T.Person.ThirdPlurMale,
                T.Person.ThirdPlurFemale,
              ],
              aspects: ["perfective"],
            },
            verb: dartlul,
          },
          {
            stem: {
              persons: [
                T.Person.ThirdSingMale,
                T.Person.ThirdSingFemale,
                T.Person.ThirdPlurMale,
                T.Person.ThirdPlurFemale,
              ],
              aspects: ["perfective"],
            },
            verb: wartlul,
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
      const madeVbsS = output.reduce<T.ParsedVBE[]>((acc, o) => {
        return [
          ...acc,
          ...(["root", "stem"] as const).flatMap((base) =>
            (o[base]?.aspects || []).flatMap((aspect) =>
              (o[base]?.persons || []).flatMap<T.ParsedVBE>((person) => [
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
              ])
            )
          ),
        ];
      }, []);
      expect(removeKeys(vbs)).toIncludeSameMembers(removeKeys(madeVbsS));
    });
  });
});
