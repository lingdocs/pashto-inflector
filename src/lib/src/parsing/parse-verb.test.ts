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
// const dartlul = wordQuery("درتلل", "verb");

// todo alwatul waalwatul akhistul azmoyul etc

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
              persons: [
                T.Person.FirstPlurMale,
                T.Person.FirstPlurFemale,
                T.Person.ThirdSingMale,
              ],
              aspects: ["imperfective", "perfective"],
            },
            verb: leekul,
          },
        ],
      },
      {
        input: "ولیکلو",
        output: [
          {
            ph: "و",
            root: {
              persons: [
                T.Person.FirstPlurMale,
                T.Person.FirstPlurFemale,
                T.Person.ThirdSingMale,
              ],
              aspects: ["perfective"],
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
      // TODO!! THESE COULD ALSO BE MALE
      {
        input: "لیده",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.ThirdSingFemale, T.Person.ThirdSingMale],
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
              persons: [T.Person.ThirdSingFemale, T.Person.ThirdSingMale],
              aspects: ["perfective"],
            },
            verb: leedul,
          },
        ],
      },
      // BUT NOT THIS ONE
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
      {
        input: "خوړ",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective", "perfective"],
            },
            verb: khorul,
          },
        ],
      },
      {
        input: "وخوړ",
        output: [
          {
            ph: "و",
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["perfective"],
            },
            verb: khorul,
          },
        ],
      },
      {
        input: "کوت",
        output: [
          {
            ph: undefined,
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
            ph: undefined,
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective", "perfective"],
            },
            verb: katul,
          },
        ],
      },
      {
        input: "وکاته",
        output: [
          {
            ph: "و",
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["perfective"],
            },
            verb: katul,
          },
        ],
      },
      {
        input: "واخلم",
        output: [
          {
            ph: "وا",
            stem: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: akheestul,
          },
        ],
      },
      {
        input: "خلم",
        output: [
          {
            ph: undefined,
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
            ph: undefined,
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: akheestul,
          },
        ],
      },
      {
        input: "واخیستم",
        output: [
          {
            ph: "وا",
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: akheestul,
          },
        ],
      },
      {
        input: "واخیستلم",
        output: [
          {
            ph: "وا",
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: akheestul,
          },
        ],
      },
      {
        input: "خیستلم",
        output: [
          {
            ph: undefined,
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
            ph: undefined,
            stem: {
              persons: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: alwatul,
          },
        ],
      },
      {
        input: "والوځې",
        output: [
          {
            ph: "وا",
            stem: {
              persons: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
              aspects: ["perfective"],
            },
            verb: alwatul,
          },
        ],
      },
      {
        input: "لوځې",
        output: [
          {
            ph: undefined,
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
              persons: [T.Person.ThirdSingFemale, T.Person.ThirdSingMale],
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
      {
        input: "لاړلم",
        output: [
          {
            ph: "لا",
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: tlul,
          },
        ],
      },
      {
        input: "لاړم",
        output: [
          {
            ph: "لا",
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: tlul,
          },
        ],
      },
      {
        input: "لاړو",
        output: [
          {
            ph: "لا",
            root: {
              persons: [
                T.Person.FirstPlurMale,
                T.Person.FirstPlurFemale,
                T.Person.ThirdSingMale,
              ],
              aspects: ["perfective"],
            },
            verb: tlul,
          },
        ],
      },
      {
        input: "لاړه",
        output: [
          {
            ph: "لا",
            root: {
              persons: [T.Person.ThirdSingFemale, T.Person.ThirdSingMale],
              aspects: ["perfective"],
            },
            verb: tlul,
          },
        ],
      },
      {
        input: "ړلم",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: tlul,
          },
          {
            ph: undefined,
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
            ph: undefined,
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: tlul,
          },
          {
            ph: undefined,
            root: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: wurul,
          },
        ],
      },
      {
        input: "والووت",
        output: [
          {
            ph: "وا",
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["perfective"],
            },
            verb: alwatul,
          },
        ],
      },
      {
        input: "والواته",
        output: [
          {
            ph: "وا",
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["perfective"],
            },
            verb: alwatul,
          },
        ],
      },
      {
        input: "لواته",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["perfective"],
            },
            verb: alwatul,
          },
        ],
      },
      {
        input: "راشې",
        output: [
          {
            ph: "را",
            stem: {
              persons: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
              aspects: ["perfective"],
            },
            verb: raatlul,
          },
        ],
      },
      {
        input: "ورشې",
        output: [
          {
            ph: "ور",
            stem: {
              persons: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
              aspects: ["perfective"],
            },
            verb: wartlul,
          },
        ],
      },
      {
        input: "یوسم",
        output: [
          {
            ph: "یو",
            stem: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: wurul,
          },
        ],
      },
      {
        input: "سم",
        output: [
          {
            ph: undefined,
            stem: {
              persons: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
              aspects: ["perfective"],
            },
            verb: wurul,
          },
        ],
      },

      // TOOD: would be more robust if it looked for this without excetions // same as واخیست etc
      // {
      //   input: "لاړ",
      //   output: [
      //     {
      //       ph: "لا",
      //       root: {
      //         persons: [T.Person.ThirdSingMale],
      //         aspects: ["perfective"],
      //       },
      //       verb: tlul,
      //     },
      //   ],
      // },
    ],
  },
  {
    label: "verbs with different 3rd pers sing past endings",
    cases: [
      {
        input: "رسېد",
        output: [
          {
            ph: undefined,
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective", "perfective"],
            },
            verb: rasedul,
          },
        ],
      },
      {
        input: "ورسېد",
        output: [
          {
            ph: "و",
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["perfective"],
            },
            verb: rasedul,
          },
        ],
      },
      {
        input: "کېناسته",
        output: [
          {
            ph: "کې",
            root: {
              persons: [T.Person.ThirdSingMale, T.Person.ThirdSingFemale],
              aspects: ["imperfective", "perfective"],
            },
            verb: kenaastul,
          },
        ],
      },
      {
        input: "کېناست",
        output: [
          {
            ph: "کې",
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective", "perfective"],
            },
            verb: kenaastul,
          },
        ],
      },
      {
        input: "کېناستو",
        output: [
          {
            ph: "کې",
            root: {
              persons: [
                T.Person.ThirdSingMale,
                T.Person.FirstPlurMale,
                T.Person.FirstPlurFemale,
              ],
              aspects: ["imperfective", "perfective"],
            },
            verb: kenaastul,
          },
        ],
      },
      {
        input: "ووتلو",
        output: [
          {
            ph: "و",
            root: {
              persons: [
                T.Person.ThirdSingMale,
                T.Person.FirstPlurMale,
                T.Person.FirstPlurFemale,
              ],
              aspects: ["perfective"],
            },
            verb: watul,
          },
        ],
      },
      {
        input: "ووتو",
        output: [
          {
            ph: "و",
            root: {
              persons: [
                T.Person.ThirdSingMale,
                T.Person.FirstPlurMale,
                T.Person.FirstPlurFemale,
              ],
              aspects: ["perfective"],
            },
            verb: watul,
          },
        ],
      },
      {
        input: "ووته",
        output: [
          {
            ph: "و",
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: watul,
          },
        ],
      },
      {
        input: "واته",
        output: [
          {
            ph: undefined,
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
            ph: undefined,
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["imperfective", "perfective"],
            },
            verb: watul,
          },
        ],
      },
      {
        input: "وووت",
        output: [
          {
            ph: "و",
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["perfective"],
            },
            verb: watul,
          },
        ],
      },
      {
        input: "ورسېد",
        output: [
          {
            ph: "و",
            root: {
              persons: [T.Person.ThirdSingMale],
              aspects: ["perfective"],
            },
            verb: rasedul,
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
            ph: undefined,
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
            ph: undefined,
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
            ph: undefined,
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
            ph: undefined,
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
            ph: undefined,
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
            ph: undefined,
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
            ph: undefined,
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: kedulStat,
          },
          {
            ph: undefined,
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
            ph: undefined,
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: kedulStat,
          },
          {
            ph: undefined,
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
            ph: undefined,
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: kedulStat,
          },
          {
            ph: undefined,
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: kedulDyn,
          },
        ],
      },
      {
        input: "وشوله",
        output: [
          {
            ph: "و",
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: kedulDyn,
          },
        ],
      },
      {
        input: "وشوه",
        output: [
          {
            ph: "و",
            root: {
              persons: [T.Person.ThirdSingFemale],
              aspects: ["perfective"],
            },
            verb: kedulDyn,
          },
        ],
      },
      {
        input: "وشي",
        output: [
          {
            ph: "و",
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
        ],
      },
      // TODO: It would probably be more effecient just to return the kedul verb options
      // and then when we put things together with the perfective head parsed they could
      // become raatlul etc...
      {
        input: "شي",
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
              aspects: ["perfective"],
            },
            verb: kedulDyn,
          },
          {
            ph: undefined,
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
            ph: undefined,
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
            ph: undefined,
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
            ph: undefined,
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

// Also do سي yo see
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
      expect(removeKeys(vbs)).toIncludeSameMembers(removeKeys(madeVbsS));
    });
  });
});
