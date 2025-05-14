import * as T from "../../../../types";
import { testDictionary } from "../mini-test-dictionary";
import { tokenizer } from "../tokenizer";
import { getPeople } from "../utils";
import { parseVerbSection, VerbSectionData } from "./parse-verb-section";
import { kedulDyn, kedulStat, raatlul, wartlul } from "./irreg-verbs";

const leedul = testDictionary.verbEntryLookup("لیدل")[0];
const akheestul = testDictionary.verbEntryLookup("اخیستل")[0];
const kenaastul = testDictionary.verbEntryLookup("کېناستل")[0];
const wahul = testDictionary.verbEntryLookup("وهل")[0];
const awuxtul = testDictionary.verbEntryLookup("اوښتل")[0];
// const raawrul = testDictionary.verbEntryLookup("راوړل")[0];
const botlul = testDictionary.verbEntryLookup("بوتلل")[0];
const rasedul = testDictionary.verbEntryLookup("رسېدل")[0];
const leekul = testDictionary.verbEntryLookup("لیکل")[0];
const tlul = testDictionary
  .verbEntryLookup("تلل")
  .filter((x) => x.entry.e.includes("to go"))[0];
const manul = testDictionary.verbEntryLookup("منل")[0];
const pakhawul = testDictionary.verbEntryLookup("پخول")[0];
const pakhedul = testDictionary.verbEntryLookup("پخېدل")[0];
// const gaalul = testDictionary.verbEntryLookup("ګالل")[0];
const khorul = testDictionary.verbEntryLookup("خوړل")[0];
// const kxenaastul = testDictionary.verbEntryLookup("کښېناستل")[0];
const prexodul = testDictionary.verbEntryLookup("پرېښودل")[0];
const prexowul = testDictionary.verbEntryLookup("پرېښوول")[0];
const prexawul = testDictionary.verbEntryLookup("پرېښول")[0];
// const xodul = testDictionary.verbEntryLookup("ښودل")[0];
// const kexodul = testDictionary.verbEntryLookup("کېښودل")[0];
// const kxexodul = testDictionary.verbEntryLookup("کښېښودل")[0];
const katul = testDictionary.verbEntryLookup("کتل")[0];
const watul = testDictionary.verbEntryLookup("وتل")[0];
// const wurul = testDictionary.verbEntryLookup("وړل")[0];
const alwatul = testDictionary.verbEntryLookup("الوتل")[0];
const gardzedul = testDictionary.verbEntryLookup("ګرځېدل")[0];
const sharmawul = testDictionary.verbEntryLookup("شرمول")[0];
// const sharmedul = testDictionary.verbEntryLookup("شرمېدل")[0];

// TODO: could to more thorough testing of short past participle forms

type Section = {
  title: string;
  tests: { input: string; output: VerbSectionData[]; error?: boolean }[];
};
// TODO: get وګرځېدلم working

const simpleOpts: Section = {
  title: "bare bones VBE forms",
  tests: [
    {
      input: "ځم",
      output: testVBEOutuput({
        persons: getPeople(1, "sing"),
        bases: ["stem"],
        aspects: ["imperfective"],
        verb: tlul,
      }),
    },
    {
      input: "وهلې",
      output: testVBEOutuput({
        persons: [...getPeople(2, "sing"), T.Person.ThirdPlurFemale],
        bases: ["root"],
        verb: wahul,
        aspects: ["imperfective"],
      }),
    },
    {
      input: "ووهلم",
      output: testVBEOutuput({
        ph: "و",
        persons: getPeople(1, "sing"),
        bases: ["root"],
        aspects: ["perfective"],
        verb: wahul,
      }),
    },
    {
      input: "وهم",
      output: testVBEOutuput({
        persons: getPeople(1, "sing"),
        bases: ["root", "stem"],
        aspects: ["imperfective"],
        verb: wahul,
      }),
    },
    {
      input: "وهې",
      output: [
        ...testVBEOutuput({
          bases: ["stem"],
          aspects: ["imperfective"],
          persons: getPeople(2, "sing"),
          verb: wahul,
        }),
        ...testVBEOutuput({
          bases: ["root"],
          aspects: ["imperfective"],
          persons: [...getPeople(2, "sing"), T.Person.ThirdPlurFemale],
          verb: wahul,
        }),
      ],
    },
    {
      input: "ووهې",
      output: [
        ...testVBEOutuput({
          ph: "و",
          bases: ["stem"],
          aspects: ["perfective"],
          persons: getPeople(2, "sing"),
          verb: wahul,
        }),
        ...testVBEOutuput({
          ph: "و",
          bases: ["root"],
          aspects: ["perfective"],
          persons: [...getPeople(2, "sing"), T.Person.ThirdPlurFemale],
          verb: wahul,
        }),
      ],
    },
    {
      input: "لیکم",
      output: testVBEOutuput({
        bases: ["root", "stem"],
        aspects: ["imperfective"],
        persons: getPeople(1, "sing"),
        verb: leekul,
      }),
    },
    {
      input: "لیکلو",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["imperfective"],
        persons: [...getPeople(1, "pl"), T.Person.ThirdSingMale],
        verb: leekul,
      }),
    },
    {
      input: "لیکل",
      output: testVBEOutuput({
        bases: ["root"],
        persons: [T.Person.ThirdPlurMale],
        aspects: ["imperfective"],
        verb: leekul,
      }),
    },
    {
      input: "لیکلل",
      output: [],
    },
    {
      input: "منله",
      output: testVBEOutuput({
        bases: ["root"],
        persons: [T.Person.ThirdSingFemale],
        aspects: ["imperfective"],
        verb: manul,
      }),
    },
    {
      input: "ومنله",
      output: testVBEOutuput({
        ph: "و",
        bases: ["root"],
        persons: [T.Person.ThirdSingFemale],
        aspects: ["perfective"],
        verb: manul,
      }),
    },
    {
      input: "مني",
      output: testVBEOutuput({
        bases: ["stem"],
        aspects: ["imperfective"],
        persons: getPeople(3, "both"),
        verb: manul,
      }),
    },
    {
      input: "ومنئ",
      output: [
        ...testVBEOutuput({
          ph: "و",
          bases: ["root", "stem"],
          aspects: ["perfective"],
          persons: getPeople(2, "pl"),
          verb: manul,
        }),
        ...testVBEOutuput({
          ph: "و",
          bases: ["stem"],
          aspects: ["perfective"],
          persons: getPeople(2, "pl"),
          verb: manul,
          imperative: true,
        }),
      ],
    },
    {
      input: "منه",
      output: [
        ...testVBEOutuput({
          bases: ["stem"],
          aspects: ["imperfective"],
          persons: getPeople(2, "sing"),
          verb: manul,
          imperative: true,
        }),
        ...testVBEOutuput({
          bases: ["root"],
          aspects: ["imperfective"],
          persons: [T.Person.ThirdSingFemale],
          verb: manul,
        }),
      ],
    },
    {
      input: "منلم",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["imperfective"],
        persons: getPeople(1, "sing"),
        verb: manul,
      }),
    },
    {
      input: "منلي",
      output: [],
    },
    {
      input: "شرماوه",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["imperfective"],
        persons: [T.Person.ThirdSingMale],
        verb: sharmawul,
      }),
    },
    {
      input: "شرموه",
      output: [
        ...testVBEOutuput({
          bases: ["stem"],
          aspects: ["imperfective"],
          persons: getPeople(2, "sing"),
          imperative: true,
          verb: sharmawul,
        }),
        ...testVBEOutuput({
          bases: ["root"],
          aspects: ["imperfective"],
          persons: [T.Person.ThirdSingFemale],
          verb: sharmawul,
        }),
      ],
    },
    {
      input: "وشرموه",
      output: [
        ...testVBEOutuput({
          bases: ["stem"],
          ph: "و",
          aspects: ["perfective"],
          persons: getPeople(2, "sing"),
          imperative: true,
          verb: sharmawul,
        }),
        ...testVBEOutuput({
          bases: ["root"],
          ph: "و",
          aspects: ["perfective"],
          persons: [T.Person.ThirdSingFemale],
          verb: sharmawul,
        }),
      ],
    },
    {
      input: "شرموله",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["imperfective"],
        persons: [T.Person.ThirdSingFemale],
        verb: sharmawul,
      })
    }
  ],
};

const simpleIntrans: Section = {
  title: "basic VBE intransitive forms",
  tests: [
    {
      input: "رسېدلم",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["imperfective"],
        persons: getPeople(1, "sing"),
        verb: rasedul,
      }),
    },
    {
      input: "رسېدم",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["imperfective"],
        persons: getPeople(1, "sing"),
        verb: rasedul,
      }),
    },
    {
      input: "ورسېدم",
      output: testVBEOutuput({
        bases: ["root"],
        ph: "و",
        aspects: ["perfective"],
        persons: getPeople(1, "sing"),
        verb: rasedul,
      }),
    },
    {
      input: "رسېږي",
      output: testVBEOutuput({
        bases: ["stem"],
        aspects: ["imperfective"],
        persons: getPeople(3, "both"),
        verb: rasedul,
      }),
    },
    {
      input: "ورسېږي",
      output: testVBEOutuput({
        bases: ["stem"],
        ph: "و",
        aspects: ["perfective"],
        persons: getPeople(3, "both"),
        verb: rasedul,
      }),
    },
    {
      input: "رسي",
      output: testVBEOutuput({
        bases: ["stem"],
        aspects: ["imperfective"],
        persons: getPeople(3, "both"),
        verb: rasedul,
      }),
    },
    {
      input: "ګرځې",
      output: testVBEOutuput({
        bases: ["stem"],
        aspects: ["imperfective"],
        persons: getPeople(2, "sing"),
        verb: gardzedul,
      }),
    },
    {
      input: "وګرځېدم",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["perfective"],
        ph: "و",
        persons: getPeople(1, "sing"),
        verb: gardzedul,
      }),
    },
  ],
};

const simpleIrregStems: Section = {
  title: "simple irregular stems",
  tests: [
    {
      input: "وینم",
      output: testVBEOutuput({
        bases: ["stem"],
        aspects: ["imperfective"],
        persons: getPeople(1, "sing"),
        verb: leedul,
      }),
    },
    {
      input: "ووینم",
      output: testVBEOutuput({
        ph: "و",
        bases: ["stem"],
        aspects: ["perfective"],
        persons: getPeople(1, "sing"),
        verb: leedul,
      }),
    },
    {
      input: "لیده",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["imperfective"],
        persons: getPeople(3, "sing"),
        verb: leedul,
      }),
    },
    {
      input: "ولیده",
      output: testVBEOutuput({
        ph: "و",
        bases: ["root"],
        aspects: ["perfective"],
        persons: getPeople(3, "sing"),
        verb: leedul,
      }),
    },
    {
      input: "خورې",
      output: testVBEOutuput({
        bases: ["stem"],
        aspects: ["imperfective"],
        persons: getPeople(2, "sing"),
        verb: khorul,
      }),
    },
    {
      input: "خوړي",
      output: [],
    },
    {
      input: "وخورې",
      output: testVBEOutuput({
        ph: "و",
        bases: ["stem"],
        aspects: ["perfective"],
        persons: getPeople(2, "sing"),
        verb: khorul,
      }),
    },
    {
      input: "اخلم",
      output: testVBEOutuput({
        bases: ["stem"],
        aspects: ["imperfective"],
        persons: getPeople(1, "sing"),
        verb: akheestul,
      }),
    },
    {
      input: "واخلم",
      output: testVBEOutuput({
        ph: "وا",
        bases: ["stem"],
        aspects: ["perfective"],
        persons: getPeople(1, "sing"),
        verb: akheestul,
      }),
    },
    {
      input: "اخیستم",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["imperfective"],
        persons: getPeople(1, "sing"),
        verb: akheestul,
      }),
    },
    {
      input: "واخیستلم",
      output: testVBEOutuput({
        ph: "وا",
        bases: ["root"],
        aspects: ["perfective"],
        persons: getPeople(1, "sing"),
        verb: akheestul,
      }),
    },
    {
      input: "الوځي",
      output: testVBEOutuput({
        bases: ["stem"],
        aspects: ["imperfective"],
        persons: getPeople(3, "both"),
        verb: alwatul,
      }),
    },
    {
      input: "وانه لوځي",
      output: getPeople(3, "both").map<VerbSectionData>((person) => ({
        blocks: [
          { type: "PH", s: "وا" },
          { type: "negative", imperative: false },
          makeParsedVBE({
            person,
            aspect: "perfective",
            base: "stem",
            verb: alwatul,
          }),
        ],
        kids: [],
      })),
    },
    {
      input: "وابه نه لوځې",
      output: getPeople(2, "sing").map<VerbSectionData>((person) => ({
        blocks: [
          { type: "PH", s: "وا" },
          { type: "negative", imperative: false },
          makeParsedVBE({
            person,
            aspect: "perfective",
            base: "stem",
            verb: alwatul,
          }),
        ],
        kids: [
          {
            position: 1,
            section: ["ba"],
          },
        ],
      })),
    },
    {
      input: "وابه نه لوتل",
      output: [
        {
          blocks: [
            { type: "PH", s: "وا" },
            { type: "negative", imperative: false },
            makeParsedVBE({
              person: T.Person.ThirdPlurMale,
              aspect: "perfective",
              base: "root",
              verb: alwatul,
            }),
          ],
          kids: [
            {
              position: 1,
              section: ["ba"],
            },
          ],
        },
      ],
    },
    {
      input: "نه الوتئ",
      output: getPeople(2, "pl").map((person) => ({
        blocks: [
          { type: "negative", imperative: false },
          makeParsedVBE({
            person,
            aspect: "imperfective",
            base: "root",
            verb: alwatul,
          }),
        ],
        kids: [],
      })),
    },
  ],
};

const irreg3rdMascSing: Section = {
  title: "Irregular third masc sing.",
  tests: [
    {
      input: "خوړ",
      output: testVBEOutuput({
        aspects: ["imperfective"],
        bases: ["root"],
        verb: khorul,
        persons: [T.Person.ThirdSingMale],
      }),
    },
    {
      input: "ویې خوړ",
      output: [
        {
          blocks: [
            { type: "PH", s: "و" },
            makeParsedVBE({
              person: T.Person.ThirdSingMale,
              aspect: "perfective",
              base: "root",
              verb: khorul,
            }),
          ],
          kids: [
            {
              position: 1,
              section: ["ye"],
            },
          ],
        },
      ],
    },
    ...["کوت", "کاته"].map((input) => ({
      input,
      output: testVBEOutuput({
        persons: [T.Person.ThirdSingMale],
        bases: ["root"],
        aspects: ["imperfective"],
        verb: katul,
      }),
    })),
    ...["ووت", "واته"].map((input) => ({
      input,
      output: testVBEOutuput({
        persons: [T.Person.ThirdSingMale],
        bases: ["root"],
        aspects: ["imperfective"],
        verb: watul,
      }),
    })),
    ...["وووت", "وواته"].map((input) => ({
      input,
      output: testVBEOutuput({
        ph: "و",
        persons: [T.Person.ThirdSingMale],
        bases: ["root"],
        aspects: ["perfective"],
        verb: watul,
      }),
    })),
    {
      input: "رسېد",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["imperfective"],
        verb: rasedul,
        persons: [T.Person.ThirdSingMale],
      }),
    },
    {
      input: "رسېده",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["imperfective"],
        verb: rasedul,
        persons: [T.Person.ThirdSingMale, T.Person.ThirdSingFemale],
      }),
    },
    {
      input: "کېناسته",
      output: [
        ...testVBEOutuput({
          bases: ["root"],
          aspects: ["imperfective"],
          verb: kenaastul,
          persons: [T.Person.ThirdSingMale, T.Person.ThirdSingFemale],
        }),
        ...testVBEOutuput({
          ph: "کې",
          bases: ["root"],
          aspects: ["perfective"],
          verb: kenaastul,
          persons: [T.Person.ThirdSingMale, T.Person.ThirdSingFemale],
        }),
      ],
    },
    {
      input: "کېناست",
      output: [
        ...testVBEOutuput({
          bases: ["root"],
          aspects: ["imperfective"],
          verb: kenaastul,
          persons: [T.Person.ThirdSingMale],
        }),
        ...testVBEOutuput({
          ph: "کې",
          bases: ["root"],
          aspects: ["perfective"],
          verb: kenaastul,
          persons: [T.Person.ThirdSingMale],
        }),
      ],
    },
  ],
};

const seperatingHead: Section = {
  title: "verbs with seperating head",
  tests: [
    {
      input: "کېني",
      output: [
        ...testVBEOutuput({
          persons: getPeople(3, "both"),
          verb: kenaastul,
          aspects: ["imperfective"],
          bases: ["stem"],
        }),
        ...testVBEOutuput({
          ph: "کې",
          persons: getPeople(3, "both"),
          verb: kenaastul,
          aspects: ["perfective"],
          bases: ["stem"],
        }),
      ],
    },
    {
      input: "کېنم",
      output: [
        ...testVBEOutuput({
          persons: getPeople(1, "sing"),
          verb: kenaastul,
          aspects: ["imperfective"],
          bases: ["stem"],
        }),
        ...testVBEOutuput({
          ph: "کې",
          persons: getPeople(1, "sing"),
          verb: kenaastul,
          aspects: ["perfective"],
          bases: ["stem"],
        }),
      ],
    },
    {
      input: "کې به نه ني",
      output: getPeople(3, "both").map<VerbSectionData>((person) => ({
        blocks: [
          { type: "PH", s: "کې" },
          { type: "negative", imperative: false },
          makeParsedVBE({
            person,
            aspect: "perfective",
            base: "stem",
            verb: kenaastul,
          }),
        ],
        kids: [
          {
            position: 1,
            section: ["ba"],
          },
        ],
      })),
    },
    {
      input: "کېناست",
      output: [
        ...testVBEOutuput({
          persons: [T.Person.ThirdSingMale],
          verb: kenaastul,
          aspects: ["imperfective"],
          bases: ["root"],
        }),
        ...testVBEOutuput({
          ph: "کې",
          persons: [T.Person.ThirdSingMale],
          verb: kenaastul,
          aspects: ["perfective"],
          bases: ["root"],
        }),
      ],
    },
    {
      input: "کې به نه ناست",
      output: [
        {
          blocks: [
            { type: "PH", s: "کې" },
            { type: "negative", imperative: false },
            makeParsedVBE({
              person: T.Person.ThirdSingMale,
              aspect: "perfective",
              base: "root",
              verb: kenaastul,
            }),
          ],
          kids: [
            {
              position: 1,
              section: ["ba"],
            },
          ],
        },
      ],
    },
    ...["کې به نه ناستلم", "کې به نه ناستم"].map<Section["tests"][number]>(
      (input) => ({
        input,
        output: getPeople(1, "sing").map((person) => ({
          blocks: [
            { type: "PH", s: "کې" },
            { type: "negative", imperative: false },
            makeParsedVBE({
              person,
              aspect: "perfective",
              base: "root",
              verb: kenaastul,
            }),
          ],
          kids: [
            {
              position: 1,
              section: ["ba"],
            },
          ],
        })),
      })
    ),
    {
      input: "پرېږده",
      output: [prexawul, prexodul, prexowul].flatMap((verb) => [
        ...testVBEOutuput({
          persons: getPeople(2, "sing"),
          verb,
          aspects: ["imperfective"],
          bases: ["stem"],
          imperative: true,
        }),
        ...testVBEOutuput({
          ph: "پرې",
          persons: getPeople(2, "sing"),
          verb,
          aspects: ["perfective"],
          bases: ["stem"],
          imperative: true,
        }),
      ]),
    },
    {
      input: "مه یې پرېږده",
      output: [prexawul, prexodul, prexowul].flatMap<VerbSectionData>((verb) =>
        getPeople(2, "sing").flatMap<VerbSectionData>((person) => [
          {
            blocks: [
              { type: "negative", imperative: true },
              makeParsedVBE({
                person,
                aspect: "imperfective",
                base: "stem",
                imperative: true,
                verb,
              }),
            ],
            kids: [
              {
                position: 1,
                section: ["ye"],
              },
            ],
          },
          {
            blocks: [
              { type: "negative", imperative: true },
              { type: "PH", s: "پرې" },
              makeParsedVBE({
                person,
                aspect: "perfective",
                base: "stem",
                imperative: true,
                verb,
              }),
            ],
            kids: [
              {
                position: 1,
                section: ["ye"],
              },
            ],
          },
        ])
      ),
    },
    {
      input: "پرېښود",
      output: [
        ...testVBEOutuput({
          persons: [T.Person.ThirdSingMale],
          verb: prexodul,
          bases: ["root"],
          aspects: ["imperfective"],
        }),
        ...testVBEOutuput({
          ph: "پرې",
          persons: [T.Person.ThirdSingMale],
          verb: prexodul,
          bases: ["root"],
          aspects: ["perfective"],
        }),
      ],
    },
  ],
};

const irregularVerbs: Section = {
  title: "irregular verbs",
  tests: [
    {
      input: "ته",
      output: testVBEOutuput({
        persons: [T.Person.ThirdSingMale],
        aspects: ["imperfective"],
        bases: ["root"],
        verb: tlul,
      }),
    },
    {
      input: "راته",
      output: testVBEOutuput({
        persons: [T.Person.ThirdSingMale],
        aspects: ["imperfective"],
        bases: ["root"],
        verb: raatlul,
      }),
    },
    {
      input: "ورته",
      output: testVBEOutuput({
        persons: [T.Person.ThirdSingMale],
        aspects: ["imperfective"],
        bases: ["root"],
        verb: wartlul,
      }),
    },
    {
      input: "شو",
      output: [
        ...testVBEOutuput({
          persons: [
            ...getPeople(1, "pl"),
            T.Person.ThirdSingMale,
            T.Person.ThirdPlurMale,
          ],
          aspects: ["perfective"],
          bases: ["root"],
          verb: kedulStat,
        }),
        ...testVBEOutuput({
          persons: getPeople(1, "pl"),
          aspects: ["perfective"],
          bases: ["stem"],
          verb: kedulStat,
        }),
      ],
    },
    {
      input: "وبه شو",
      output: [
        ...testVBEOutuput({
          ph: "و",
          kids: [{ position: 1, section: ["ba"] }],
          persons: [
            ...getPeople(1, "pl"),
            T.Person.ThirdSingMale,
            T.Person.ThirdPlurMale,
          ],
          aspects: ["perfective"],
          bases: ["root"],
          verb: kedulDyn,
        }),
        ...testVBEOutuput({
          ph: "و",
          kids: [{ position: 1, section: ["ba"] }],
          persons: getPeople(1, "pl"),
          aspects: ["perfective"],
          bases: ["stem"],
          verb: kedulDyn,
        }),
      ],
    },
    ...["شوله", "شوه"].map((input) => ({
      input,
      output: testVBEOutuput({
        persons: [T.Person.ThirdSingFemale],
        aspects: ["perfective"],
        bases: ["root"],
        verb: kedulStat,
      }),
    })),
    {
      input: "شئ",
      output: [
        ...testVBEOutuput({
          persons: getPeople(2, "pl"),
          aspects: ["perfective"],
          bases: ["stem"],
          verb: kedulStat,
          imperative: true,
        }),
        ...testVBEOutuput({
          persons: getPeople(2, "pl"),
          aspects: ["perfective"],
          bases: ["stem"],
          verb: kedulStat,
        }),
      ],
    },
  ],
};

const ability: Section = {
  title: "with ability VBPs",
  tests: [
    {
      input: "ولیدلی شم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          { type: "PH", s: "و" },
          makeAbilityVBP({ aspect: "perfective", verb: leedul }),
          makeParsedVBE({
            aspect: "perfective",
            verb: kedulStat,
            base: "stem",
            person,
          }),
        ],
        kids: [],
      })),
    },
    {
      input: "ولیدلی شوم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          { type: "PH", s: "و" },
          makeAbilityVBP({ aspect: "perfective", verb: leedul }),
          makeParsedVBE({
            aspect: "perfective",
            verb: kedulStat,
            base: "root",
            person,
          }),
        ],
        kids: [],
      })),
    },
    {
      input: "ولیدلی شه",
      output: [],
    },
    // with short ability stems
    {
      input: "رسېدای شئ",
      output: getPeople(2, "pl").map((person) => ({
        blocks: [
          makeAbilityVBP({ aspect: "imperfective", verb: rasedul }),
          makeParsedVBE({
            aspect: "perfective",
            verb: kedulStat,
            base: "stem",
            person,
          }),
        ],
        kids: [],
      })),
    },
    {
      input: "اوښتی شي",
      output: getPeople(3, "both").map((person) => ({
        blocks: [
          makeAbilityVBP({ aspect: "imperfective", verb: awuxtul }),
          makeParsedVBE({
            aspect: "perfective",
            verb: kedulStat,
            base: "stem",
            person,
          }),
        ],
        kids: [],
      })),
    },
    // with aspect-ambiguous ability
    {
      input: "کېناستلی شم",
      output: getPeople(1, "sing").flatMap((person) =>
        (["imperfective", "perfective"] satisfies T.Aspect[]).map((aspect) => ({
          blocks: [
            ...(aspect === "perfective"
              ? [{ type: "PH", s: "کې" } as const]
              : []),
            makeAbilityVBP({ aspect, verb: kenaastul }),
            makeParsedVBE({
              aspect: "perfective",
              verb: kedulStat,
              base: "stem",
              person,
            }),
          ],
          kids: [],
        }))
      ),
    },
    {
      input: "بوتلای شول",
      output: (["imperfective", "perfective"] satisfies T.Aspect[]).map(
        (aspect) => ({
          blocks: [
            ...(aspect === "perfective"
              ? [{ type: "PH", s: "بو" } as const]
              : []),
            makeAbilityVBP({ aspect, verb: botlul }),
            makeParsedVBE({
              aspect: "perfective",
              verb: kedulStat,
              base: "root",
              person: T.Person.ThirdPlurMale,
            }),
          ],
          kids: [],
        })
      ),
    },
    {
      input: "بوتلای شوه",
      output: (["imperfective", "perfective"] satisfies T.Aspect[]).map(
        (aspect) => ({
          blocks: [
            ...(aspect === "perfective"
              ? [{ type: "PH", s: "بو" } as const]
              : []),
            makeAbilityVBP({ aspect, verb: botlul }),
            makeParsedVBE({
              aspect: "perfective",
              verb: kedulStat,
              base: "root",
              person: T.Person.ThirdSingFemale,
            }),
          ],
          kids: [],
        })
      ),
    },
    // with negative
    {
      input: "لیدلی نه شم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          makeAbilityVBP({ aspect: "imperfective", verb: leedul }),
          { type: "negative", imperative: false },
          makeParsedVBE({
            aspect: "perfective",
            verb: kedulStat,
            base: "stem",
            person,
          }),
        ],
        kids: [],
      })),
    },
    {
      input: "نه شم لیدلی",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          { type: "negative", imperative: false },
          makeParsedVBE({
            aspect: "perfective",
            verb: kedulStat,
            base: "stem",
            person,
          }),
          makeAbilityVBP({ aspect: "imperfective", verb: leedul }),
        ],
        kids: [],
      })),
    },
    // with tricky split and neg
    {
      input: "وابه یې نه شوه خیستلی",
      output: [
        {
          blocks: [
            { type: "PH", s: "وا" },
            { type: "negative", imperative: false },
            makeParsedVBE({
              aspect: "perfective",
              verb: kedulStat,
              base: "root",
              person: T.Person.ThirdSingFemale,
            }),
            makeAbilityVBP({ aspect: "perfective", verb: akheestul }),
          ],
          kids: [{ position: 1, section: ["ba", "ye"] }],
        },
      ],
    },
  ],
};

const perfect: Section = {
  title: "Perfect Verb Forms",
  tests: [
    {
      input: "لیدلی دی",
      output: [
        {
          blocks: [
            makePPartVBP(leedul, { gender: "masc", number: "singular" }),
            makeEqVBE(T.Person.ThirdSingMale, "present"),
          ],
          kids: [],
        },
      ],
    },
    {
      input: "لیدلې ده",
      output: [
        {
          blocks: [
            makePPartVBP(leedul, { gender: "fem", number: "singular" }),
            makeEqVBE(T.Person.ThirdSingFemale, "present"),
          ],
          kids: [],
        },
        {
          blocks: [
            makePPartVBP(leedul, { gender: "fem", number: "plural" }),
            makeEqVBE(T.Person.ThirdSingFemale, "present"),
          ],
          kids: [],
        },
      ],
    },
    {
      input: "لیدلي ول",
      output: [
        {
          blocks: [
            makePPartVBP(leedul, { gender: "masc", number: "plural" }),
            makeEqVBE(T.Person.ThirdPlurMale, "past"),
          ],
          kids: [],
        },
      ],
    },
    {
      input: "نه به مې وي اخیستی",
      output: getPeople(3, "both").flatMap((person) =>
        (["habitual", "subjunctive"] satisfies T.EquativeTenseWithoutBa[]).map(
          (tense) => ({
            blocks: [
              { type: "negative", imperative: false },
              makeEqVBE(person, tense),
              makePPartVBP(akheestul, { gender: "masc", number: "singular" }),
            ],
            kids: [{ position: 1, section: ["ba", "me"] }],
          })
        )
      ),
    },
  ],
};

const statComp: Section = {
  title: "stative compounds",
  tests: [
    // imperfective - joined
    {
      input: "پخوي",
      output: getPeople(3, "both").map((person) => ({
        blocks: [
          makeParsedVBE({
            aspect: "imperfective",
            base: "stem",
            verb: pakhawul,
            person,
          })
        ],
        kids: [],
      })),
    },
    {
      input: "پخوه",
      output: [
        ...getPeople(2, "sing").map((person) => ({
          blocks: [
            makeParsedVBE({
              aspect: "imperfective",
              base: "stem",
              verb: pakhawul,
              imperative: true,
              person,
            })
          ],
          kids: [],
        })),
        {
          blocks: [
            makeParsedVBE({
              aspect: "imperfective",
              base: "root",
              verb: pakhawul,
              person: T.Person.ThirdSingFemale,
            }),
          ],
          kids: [],
        },
      ],
    },
    {
      input: "پخولم",
      output: getPeople(1, "sing").map(person => ({
        blocks: [
          makeParsedVBE({
            aspect: "imperfective",
            base: "root",
            verb: pakhawul,
            person,
          }),
        ],
        kids: [],
      }))
    },
    {
      input: "پخېدم",
      output: getPeople(1, "sing").map(person => ({
        blocks: [
          makeParsedVBE({
            aspect: "imperfective",
            base: "root",
            verb: pakhedul,
            person,
          }),
        ],
        kids: [],
      }))
    },
    // imperfective - welded
    // perfective - adj agreement
    // perfective - others
  ],
}


const sections = [
  simpleOpts,
  simpleIntrans,
  simpleIrregStems,
  seperatingHead,
  irreg3rdMascSing,
  irregularVerbs,
  ability,
  perfect,
  statComp,
];

sections.forEach((section) => {
  describe(section.title, () => {
    section.tests.forEach(({ input, output }) => {
      test(input, () => {
        const tokens = tokenizer(input);
        const res = parseVerbSection(tokens, testDictionary)
          .filter((x) => !x.tokens.length)
          .map(({ body }) => body);
        // @ts-ignore - issue with linting
        expect(res).toIncludeSameMembers(output);
      });
    });
  });
});

function testVBEOutuput(props: {
  ph?: string;
  kids?: Section["tests"][number]["output"][number]["kids"];
  bases: ("root" | "stem")[];
  aspects: T.Aspect[];
  persons: T.Person[];
  verb: T.VerbEntry;
  imperative?: boolean;
}): Section["tests"][number]["output"] {
  return props.persons.flatMap((person) =>
    props.bases.flatMap((base) =>
      props.aspects.map((aspect) => ({
        blocks: [
          ...(props.ph ? [{ type: "PH", s: props.ph } as const] : []),
          makeParsedVBE({
            aspect,
            base,
            verb: props.verb,
            person,
            ...(props.imperative
              ? {
                imperative: props.imperative,
              }
              : {}),
          }),
        ],
        kids: props.kids ? props.kids : [],
      }))
    )
  );
}

function makeEqVBE(
  person: T.Person,
  tense: T.EquativeTenseWithoutBa
): T.ParsedVBE {
  return {
    type: "VB",
    info: {
      type: "equative",
      tense: tense,
    },
    person: person,
    target: [person],
  };
}

function makePPartVBP(verb: T.VerbEntry, genNum: T.GenderNumber): T.ParsedVBP {
  return {
    type: "VB",
    info: {
      type: "ppart",
      verb: verb,
      genNum: genNum,
    },
  };
}

function makeAbilityVBP(props: {
  aspect: T.Aspect;
  verb: T.VerbEntry;
}): T.ParsedVBP {
  return {
    type: "VB",
    info: {
      type: "ability",
      aspect: props.aspect,
      verb: props.verb,
    },
  };
}

function makeParsedVBE(props: {
  person: T.Person;
  aspect: T.Aspect;
  base: "root" | "stem";
  verb: T.VerbEntry;
  imperative?: true;
  abilityAux?: boolean;
}): T.ParsedVBE {
  return {
    type: "VB",
    person: props.person,
    target: [props.person],
    info: {
      type: "verb",
      aspect: props.aspect,
      verb: props.verb,
      base: props.base,
      ...(props.imperative
        ? {
          imperative: props.imperative,
        }
        : {}),
    },
  };
}
