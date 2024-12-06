import * as T from "../../../types";
import {
  dartlul,
  kedulDyn,
  kedulStat,
  tlul,
  wartlul,
  raatlul,
} from "./irreg-verbs";
import { parseVBE } from "./parse-vbe-new";
import { tokenizer } from "./tokenizer";
import { getPeople, removeKeys } from "./utils";
import { testDictionary } from "./mini-test-dictionary";

const wahul = testDictionary.verbEntryLookup("وهل")[0];
const leekul = testDictionary.verbEntryLookup("لیکل")[0];
const manul = testDictionary.verbEntryLookup("منل")[0];
const gaalul = testDictionary.verbEntryLookup("ګالل")[0];
const rasedul = testDictionary.verbEntryLookup("رسېدل")[0];
const leedul = testDictionary.verbEntryLookup("لیدل")[0];
const awuxtul = testDictionary.verbEntryLookup("اوښتل")[0];
const khorul = testDictionary.verbEntryLookup("خوړل")[0];
const kenaastul = testDictionary.verbEntryLookup("کېناستل")[0];
const kxenaastul = testDictionary.verbEntryLookup("کښېناستل")[0];
const prexodul = testDictionary.verbEntryLookup("پرېښودل")[0];
const prexowul = testDictionary.verbEntryLookup("پرېښوول")[0];
const prexawul = testDictionary.verbEntryLookup("پرېښول")[0];
const xodul = testDictionary.verbEntryLookup("ښودل")[0];
const kexodul = testDictionary.verbEntryLookup("کېښودل")[0];
const kxexodul = testDictionary.verbEntryLookup("کښېښودل")[0];
const katul = testDictionary.verbEntryLookup("کتل")[0];
const watul = testDictionary.verbEntryLookup("وتل")[0];
const wurul = testDictionary.verbEntryLookup("وړل")[0];
const akheestul = testDictionary.verbEntryLookup("اخیستل")[0];
const alwatul = testDictionary.verbEntryLookup("الوتل")[0];
const dartlul = testDictionary.verbEntryLookup("درتلل")[0];

// TODO: Prefix searching on split verbs for perfective head parsing

// TODO: azmoyul etc
// TODO: cleaner and more thorough handling of ا seperating verbs ee - wee etc
// TODO: test imperatives

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
      imperative?: {
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
            imperative: {
              persons: getPeople(2, "pl"),
              aspects: ["imperfective", "perfective"],
            },
            verb: manul,
          },
        ],
      },
      {
        input: "منه",
        output: [
          {
            imperative: {
              persons: getPeople(2, "sing"),
              aspects: ["imperfective", "perfective"],
            },
            root: {
              persons: [T.Person.ThirdSingFemale],
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
            imperative: {
              persons: getPeople(2, "pl"),
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
              aspects: ["imperfective"],
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
    ],
  },
  {
    label: "verbs with seperating perfective heads",
    cases: [
      {
        input: "الوځې",
        output: [
          {
            stem: {
              persons: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
              aspects: ["imperfective"],
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
      {
        input: "لوتلم",
        output: [
          {
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
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
          {
            stem: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: kxenaastul,
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
        input: "ناست",
        output: [kenaastul, kxenaastul].map((verb) => ({
          root: {
            persons: [T.Person.ThirdSingMale],
            aspects: ["perfective"],
          },
          verb,
        })),
      },
      {
        input: "ناسته",
        output: [kenaastul, kxenaastul].map((verb) => ({
          root: {
            persons: [T.Person.ThirdSingMale, T.Person.ThirdSingFemale],
            aspects: ["perfective"],
          },
          verb,
        })),
      },
      {
        input: "پرېږدو",
        output: [prexodul, prexowul, prexawul].map((verb) => ({
          stem: {
            persons: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
            aspects: ["imperfective"],
          },
          verb,
        })),
      },
      {
        input: "ږدو",
        output: [
          ...[prexodul, prexawul, prexowul, kexodul, kxexodul].map((verb) => ({
            stem: {
              persons: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
              aspects: ["perfective"] satisfies T.Aspect[],
            },
            verb,
          })),
          ...[kexodul, kxexodul].map((verb) => ({
            stem: {
              persons: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
              aspects: ["imperfective"] satisfies T.Aspect[],
            },
            verb,
          })),
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
          ...[prexodul, kexodul, kxexodul].map((verb) => ({
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"] satisfies T.Aspect[],
            },
            verb,
          })),
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
        input: "لووت",
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
      {
        input: "ړ",
        output: [],
      },
      // should not match with the prefix for perfective
      {
        input: "یوړله",
        output: [],
      },
      {
        input: "یوړ",
        output: [],
      },
    ],
  },
  {
    label: "verbs with different 3rd pers sing past endings",
    cases: [
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
        input: "خوړه",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale, T.Person.ThirdSingFemale],
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
        input: "رسېده",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale, T.Person.ThirdSingFemale],
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
        input: "اوښت",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective"],
            },
            verb: awuxtul,
          },
        ],
      },
      {
        input: "ښت",
        output: [],
      },
      {
        input: "اوښته",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale, T.Person.ThirdSingFemale],
              aspects: ["imperfective"],
            },
            verb: awuxtul,
          },
        ],
      },
      {
        input: "ښود",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective", "perfective"],
            },
            verb: xodul,
          },
          ...[prexodul, kexodul, kxexodul].map((verb) => ({
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["perfective"] satisfies T.Aspect[],
            },
            verb,
          })),
        ],
      },
      {
        input: "ښوده",
        output: [
          {
            root: {
              persons: [T.Person.ThirdSingMale, T.Person.ThirdSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: xodul,
          },
          ...[prexodul, kexodul, kxexodul].map((verb) => ({
            root: {
              persons: [T.Person.ThirdSingMale, T.Person.ThirdSingFemale],
              aspects: ["perfective"] satisfies T.Aspect[],
            },
            verb,
          })),
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
        ],
      },
    ],
  },
];

tests.forEach(({ label, cases }) => {
  test(label, () => {
    cases.forEach(({ input, output }) => {
      const tokens = tokenizer(input);
      const vbs = parseVBE(tokens, testDictionary).map((r) => r.body);
      const madeVbsS = output.reduce<T.ParsedVBE[]>((acc, o) => {
        return [
          ...acc,
          ...(["root", "stem", "imperative"] as const).flatMap((base) =>
            (o[base]?.aspects || []).flatMap((aspect) =>
              (o[base]?.persons || []).flatMap<T.ParsedVBE>((person) => [
                {
                  type: "VB" as const,
                  person,
                  info: {
                    type: "verb" as const,
                    aspect,
                    base: base === "imperative" ? "stem" : base,
                    verb: o.verb,
                    ...(base === "imperative"
                      ? {
                          imperative: true,
                        }
                      : {}),
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
