import * as T from "../../../../types";
import { testDictionary } from "../mini-test-dictionary";
import { tokenizer } from "../tokenizer";
import { getPeople } from "../utils";
import { parseVerbSection, VerbSectionData } from "./parse-verb-section";
import {
  kawulDyn,
  kawulStat,
  kedulDyn,
  kedulStat,
  raatlul,
  wartlul,
} from "./irreg-verbs";
import { makeAdjectiveSelection } from "../../phrase-building/make-selections";
const oo: T.ParsedPH = { type: "PH", s: "و" };

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
const pokh = testDictionary.adjLookup("پوخ")[0];
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
const mur = testDictionary.adjLookup("مړ")[0];
const mor = testDictionary.adjLookup("موړ")[0];
const marawul = testDictionary.verbEntryLookup("مړول")[0];
// const murKawul = testDictionary.verbEntryLookup("مړ کول")[0];
// const maredul = testDictionary.verbEntryLookup("مړېدل")[0];
const sturay = testDictionary.adjLookup("ستړی")[0];
const wraande = testDictionary.queryP("وړاندې")[0] as T.LocativeAdverbEntry;
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
      input: "نه ځم",
      output: testVBEOutuput({
        persons: getPeople(1, "sing"),
        bases: ["stem"],
        aspects: ["imperfective"],
        verb: tlul,
      }).map((x) => ({
        ...x,
        blocks: [{ type: "negative", imperative: false }, ...x.blocks],
      })),
    },
    {
      input: "ځم نه",
      output: testVBEOutuput({
        persons: getPeople(1, "sing"),
        bases: ["stem"],
        aspects: ["imperfective"],
        verb: tlul,
      }).map((x) => ({
        ...x,
        blocks: [...x.blocks, { type: "negative", imperative: false }],
      })),
    },
    {
      input: "مه ځم",
      output: [],
      error: true,
    },
    {
      input: "مه ځه",
      output: testVBEOutuput({
        persons: getPeople(2, "sing"),
        bases: ["stem"],
        aspects: ["imperfective"],
        imperative: true,
        verb: tlul,
      }).map((x) => ({
        ...x,
        blocks: [{ type: "negative", imperative: true }, ...x.blocks],
      })),
    },
    {
      input: "مه ځه مه",
      output: [],
      error: true,
    },
    {
      input: "نه ځه",
      output: [],
      error: true,
    },
    {
      input: "نه ځم نه",
      output: [],
      error: true,
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
      input: "ونه منله",
      output: testVBEOutuput({
        ph: "و",
        bases: ["root"],
        persons: [T.Person.ThirdSingFemale],
        aspects: ["perfective"],
        verb: manul,
      }).map((x) => ({
        ...x,
        blocks: [
          x.blocks[0],
          { type: "negative", imperative: false },
          ...x.blocks.slice(1),
        ],
      })),
    },
    {
      input: "نه ومنله",
      output: [],
      error: true,
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
      }),
    },
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
      input: "وانه خلم",
      output: testVBEOutuput({
        ph: "وا",
        bases: ["stem"],
        aspects: ["perfective"],
        persons: getPeople(1, "sing"),
        verb: akheestul,
      }).map((x) => ({
        ...x,
        blocks: [
          x.blocks[0],
          { type: "negative", imperative: false },
          ...x.blocks.slice(1),
        ],
      })),
    },
    {
      input: "نه واخلم",
      output: testVBEOutuput({
        ph: "وا",
        bases: ["stem"],
        aspects: ["perfective"],
        persons: getPeople(1, "sing"),
        verb: akheestul,
      }).map((x) => ({
        ...x,
        blocks: [{ type: "negative", imperative: false }, ...x.blocks],
      })),
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
      input: "نه اخیستم",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["imperfective"],
        persons: getPeople(1, "sing"),
        verb: akheestul,
      }).map((x) => ({
        ...x,
        blocks: [{ type: "negative", imperative: false }, ...x.blocks],
      })),
    },
    {
      input: "اخیستم نه",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["imperfective"],
        persons: getPeople(1, "sing"),
        verb: akheestul,
      }).map((x) => ({
        ...x,
        blocks: [...x.blocks, { type: "negative", imperative: false }],
      })),
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
      input: "وانه خیستلم",
      output: testVBEOutuput({
        ph: "وا",
        bases: ["root"],
        aspects: ["perfective"],
        persons: getPeople(1, "sing"),
        verb: akheestul,
      }).map((x) => ({
        ...x,
        blocks: [
          x.blocks[0],
          { type: "negative", imperative: false },
          ...x.blocks.slice(1),
        ],
      })),
    },
    {
      input: "واخیستلم نه",
      output: [],
      error: true,
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
      }),
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
        ]),
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
          toAux(
            makeParsedVBE({
              aspect: "perfective",
              verb: kedulStat,
              base: "stem",
              person,
            }),
          ),
        ],
        kids: [],
      })),
    },
    // with short ability stems
    {
      input: "رسېدای شئ",
      output: getPeople(2, "pl").map((person) => ({
        blocks: [
          makeAbilityVBP({ aspect: "imperfective", verb: rasedul }),
          toAux(
            makeParsedVBE({
              aspect: "perfective",
              verb: kedulStat,
              base: "stem",
              person,
            }),
          ),
        ],
        kids: [],
      })),
    },
    {
      input: "اوښتی شي",
      output: getPeople(3, "both").map((person) => ({
        blocks: [
          makeAbilityVBP({ aspect: "imperfective", verb: awuxtul }),
          toAux(
            makeParsedVBE({
              aspect: "perfective",
              verb: kedulStat,
              base: "stem",
              person,
            }),
          ),
        ],
        kids: [],
      })),
    },
    {
      input: "اوښتی شه",
      output: [],
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
            toAux(
              makeParsedVBE({
                aspect: "perfective",
                verb: kedulStat,
                base: "stem",
                person,
              }),
            ),
          ],
          kids: [],
        })),
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
            toAux(
              makeParsedVBE({
                aspect: "perfective",
                verb: kedulStat,
                base: "root",
                person: T.Person.ThirdPlurMale,
              }),
            ),
          ],
          kids: [],
        }),
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
            toAux(
              makeParsedVBE({
                aspect: "perfective",
                verb: kedulStat,
                base: "root",
                person: T.Person.ThirdSingFemale,
              }),
            ),
          ],
          kids: [],
        }),
      ),
    },
    // with negative
    {
      input: "لیدلی نه شم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          makeAbilityVBP({ aspect: "imperfective", verb: leedul }),
          { type: "negative", imperative: false },
          toAux(
            makeParsedVBE({
              aspect: "perfective",
              verb: kedulStat,
              base: "stem",
              person,
            }),
          ),
        ],
        kids: [],
      })),
    },
    {
      input: "لیدلی شم نه",
      output: [],
      error: true,
    },
    {
      input: "ونه لیدلی شم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          { type: "PH", s: "و" },
          { type: "negative", imperative: false },
          makeAbilityVBP({ aspect: "perfective", verb: leedul }),
          toAux(
            makeParsedVBE({
              aspect: "perfective",
              verb: kedulStat,
              base: "stem",
              person,
            }),
          ),
        ],
        kids: [],
      })),
    },
    {
      input: "ولیدلی شم نه",
      output: [],
      error: true,
    },
    {
      input: "ولیدلی شوم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          { type: "PH", s: "و" },
          makeAbilityVBP({ aspect: "perfective", verb: leedul }),
          toAux(
            makeParsedVBE({
              aspect: "perfective",
              verb: kedulStat,
              base: "root",
              person,
            }),
          ),
        ],
        kids: [],
      })),
    },
    {
      input: "ولیدلی شه",
      output: [],
    },
    {
      input: "نه شم لیدلی",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          { type: "negative", imperative: false },
          toAux(
            makeParsedVBE({
              aspect: "perfective",
              verb: kedulStat,
              base: "stem",
              person,
            }),
          ),
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
            toAux(
              makeParsedVBE({
                aspect: "perfective",
                verb: kedulStat,
                base: "root",
                person: T.Person.ThirdSingFemale,
              }),
            ),
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
      input: "ولیدلي ول",
      output: [],
    },
    // with negative
    {
      input: "لیدلي نه ول",
      output: [
        {
          blocks: [
            makePPartVBP(leedul, { gender: "masc", number: "plural" }),
            { type: "negative", imperative: false },
            makeEqVBE(T.Person.ThirdPlurMale, "past"),
          ],
          kids: [],
        },
      ],
    },
    {
      input: "نه ول لیدلي",
      output: [
        {
          blocks: [
            { type: "negative", imperative: false },
            makeEqVBE(T.Person.ThirdPlurMale, "past"),
            makePPartVBP(leedul, { gender: "masc", number: "plural" }),
          ],
          kids: [],
        },
      ],
    },
    {
      input: "لیدلي مه ول",
      output: [],
      error: true,
    },
    {
      input: "لیدلي ول نه",
      output: [],
      error: true,
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
          }),
        ),
      ),
    },
    {
      input: "ګرځېدلی یم",
      output: getPeople(1, "sing").flatMap((person) =>
        (["present", "habitual"] satisfies T.EquativeTenseWithoutBa[]).map(
          (tense) => ({
            blocks: [
              makePPartVBP(gardzedul, { gender: "masc", number: "singular" }),
              makeEqVBE(person, tense),
            ],
            kids: [],
          }),
        ),
      ),
    },
    {
      input: "ګرځېدلی به یې",
      output: getPeople(2, "sing").flatMap((person) =>
        (["present", "habitual"] satisfies T.EquativeTenseWithoutBa[]).map(
          (tense) => ({
            blocks: [
              makePPartVBP(gardzedul, { gender: "masc", number: "singular" }),
              makeEqVBE(person, tense),
            ],
            kids: [{ position: 1, section: ["ba"] }],
          }),
        ),
      ),
    },
    {
      input: "لیدلی به مې نه یې",
      output: getPeople(2, "sing").flatMap((person) =>
        (["present", "habitual"] satisfies T.EquativeTenseWithoutBa[]).map(
          (tense) => ({
            blocks: [
              makePPartVBP(leedul, { gender: "masc", number: "singular" }),
              { type: "negative", imperative: false },
              makeEqVBE(person, tense),
            ],
            kids: [{ position: 1, section: ["ba", "me"] }],
          }),
        ),
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
          }),
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
            }),
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
      input: "پخېدم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          makeParsedVBE({
            aspect: "imperfective",
            base: "root",
            verb: pakhedul,
            person,
          }),
        ],
        kids: [],
      })),
    },
    {
      input: "پخولم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          makeParsedVBE({
            aspect: "imperfective",
            base: "root",
            verb: pakhawul,
            person,
          }),
        ],
        kids: [],
      })),
    },
    // imperfective - welded
    {
      input: "مړې کوي",
      output: [mor, mur].flatMap((adj) =>
        getPeople(3, "both").map((person) => ({
          blocks: [
            makeWeldedStatComb(
              person,
              {
                type: "verb",
                aspect: "imperfective",
                base: "stem",
              },
              {
                type: "complement",
                selection: {
                  inflection: [1],
                  gender: ["fem"],
                  given: "مړې",
                  selection: makeAdjectiveSelection(adj),
                },
              },
              "transitive",
            ),
          ],
          kids: [],
        })),
      ),
    },
    {
      input: "مړ کولم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          makeWeldedStatComb(
            person,
            {
              type: "verb",
              aspect: "imperfective",
              base: "root",
            },
            {
              type: "complement",
              selection: {
                inflection: [0],
                gender: ["masc"],
                given: "مړ",
                selection: makeAdjectiveSelection(mur),
              },
            },
            "transitive",
          ),
        ],
        kids: [],
      })),
    },
    {
      input: "وړاندې کوي",
      output: getPeople(3, "both").map((person) => ({
        blocks: [
          makeWeldedStatComb(
            person,
            { type: "verb", aspect: "imperfective", base: "stem" },
            {
              type: "complement",
              selection: {
                type: "loc. adv.",
                entry: wraande,
              },
            },
            "transitive",
          ),
        ],
        kids: [],
      })),
    },
    {
      input: "نه وړاندې کوي",
      output: getPeople(3, "both").map((person) => ({
        blocks: [
          { type: "negative", imperative: false },
          makeWeldedStatComb(
            person,
            { type: "verb", aspect: "imperfective", base: "stem" },
            {
              type: "complement",
              selection: {
                type: "loc. adv.",
                entry: wraande,
              },
            },
            "transitive",
          ),
        ],
        kids: [],
      })),
    },
    {
      input: "وړاندې کوي نه",
      output: getPeople(3, "both").map((person) => ({
        blocks: [
          makeWeldedStatComb(
            person,
            { type: "verb", aspect: "imperfective", base: "stem" },
            {
              type: "complement",
              selection: {
                type: "loc. adv.",
                entry: wraande,
              },
            },
            "transitive",
          ),
          { type: "negative", imperative: false },
        ],
        kids: [],
      })),
    },
    {
      input: "وړاندې نه کوي",
      output: [],
      error: true,
    },
    // perfective - adj agreement
    {
      input: "پوخ کړي",
      output: getPeople(3, "both").map((person) => ({
        blocks: [
          {
            type: "CompPH",
            selection: {
              inflection: [0],
              gender: ["masc"],
              given: "پوخ",
              selection: {
                type: "adjective",
                entry: pokh,
                sandwich: undefined,
              },
            },
          },
          makeParsedVBE({
            person,
            base: "stem",
            aspect: "perfective",
            verb: kawulStat,
          }),
        ],
        kids: [],
      })),
    },
    {
      input: "پخه شي",
      output: getPeople(3, "both").map((person) => ({
        blocks: [
          {
            type: "CompPH",
            selection: {
              inflection: [0],
              gender: ["fem"],
              given: "پخه",
              selection: {
                type: "adjective",
                entry: pokh,
                sandwich: undefined,
              },
            },
          },
          makeParsedVBE({
            person,
            base: "stem",
            aspect: "perfective",
            verb: kedulStat,
          }),
        ],
        kids: [],
      })),
    },
    {
      input: "ستړی شوم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          {
            type: "CompPH",
            selection: {
              inflection: [0],
              gender: ["masc"],
              given: "ستړی",
              selection: {
                type: "adjective",
                entry: sturay,
                sandwich: undefined,
              },
            },
          },
          makeParsedVBE({
            person,
            base: "root",
            aspect: "perfective",
            verb: kedulStat,
          }),
        ],
        kids: [],
      })),
    },
    // perfective - others
    {
      input: "وړاندې شه",
      output: getPeople(2, "sing").map((person) => ({
        blocks: [
          {
            type: "CompPH",
            selection: {
              type: "loc. adv.",
              entry: wraande,
            },
          },
          makeParsedVBE({
            person,
            base: "stem",
            aspect: "perfective",
            verb: kedulStat,
            imperative: true,
          }),
        ],
        kids: [],
      })),
    },
    // check the negative position
    {
      input: "وړاندې نه شې",
      output: getPeople(2, "sing").map((person) => ({
        blocks: [
          {
            type: "CompPH",
            selection: {
              type: "loc. adv.",
              entry: wraande,
            },
          },
          {
            type: "negative",
            imperative: false,
          },
          makeParsedVBE({
            person,
            base: "stem",
            aspect: "perfective",
            verb: kedulStat,
          }),
        ],
        kids: [],
      })),
    },
    {
      input: "نه وړاندې شې",
      output: [],
      error: true,
    },
    {
      input: "مړه کېږم",
      output: [
        ...getPeople(1, "sing").flatMap<
          Section["tests"][number]["output"][number]
        >((person) => [
          {
            blocks: [
              {
                type: "parsedV",
                content: {
                  type: "active welded",
                  content: {
                    left: {
                      type: "complement",
                      selection: {
                        inflection: [0],
                        gender: ["fem"],
                        given: "مړه",
                        selection: {
                          type: "adjective",
                          entry: mor,
                          sandwich: undefined,
                        },
                      },
                    },
                    right: makeParsedVBE({
                      person,
                      verb: kedulStat,
                      aspect: "imperfective",
                      base: "stem",
                    }).content.content,
                  },
                },
              },
            ],
            kids: [],
          },
          // TODO: could make this not appear in parsing because it would be silly/impossible to have
          // a complement with an inflection
          {
            blocks: [
              {
                type: "parsedV",
                content: {
                  type: "active welded",
                  content: {
                    left: {
                      type: "complement",
                      selection: {
                        inflection: [1],
                        gender: ["masc"],
                        given: "مړه",
                        selection: {
                          type: "adjective",
                          entry: mur,
                          sandwich: undefined,
                        },
                      },
                    },
                    right: makeParsedVBE({
                      person,
                      verb: kedulStat,
                      aspect: "imperfective",
                      base: "stem",
                    }).content.content,
                  },
                },
              },
            ],
            kids: [],
          },
          {
            blocks: [
              {
                type: "parsedV",
                content: {
                  type: "active welded",
                  content: {
                    left: {
                      type: "complement",
                      selection: {
                        inflection: [0],
                        gender: ["fem"],
                        given: "مړه",
                        selection: {
                          type: "adjective",
                          entry: mur,
                          sandwich: undefined,
                        },
                      },
                    },
                    right: makeParsedVBE({
                      person,
                      verb: kedulStat,
                      aspect: "imperfective",
                      base: "stem",
                    }).content.content,
                  },
                },
              },
            ],
            kids: [],
          },
        ]),
      ],
    },
  ],
};

const statCompPerfect: Section = {
  title: "perfect statComp",
  tests: [
    {
      input: "پوخ کړی دی",
      output: [
        {
          blocks: [
            {
              type: "parsedV",
              content: {
                type: "active welded",
                content: {
                  left: {
                    type: "complement",
                    selection: {
                      inflection: [0],
                      gender: ["masc"],
                      given: "پوخ",
                      selection: {
                        type: "adjective",
                        entry: pokh,
                        sandwich: undefined,
                      },
                    },
                  },
                  right: {
                    type: "parsed vbp basic part",
                    info: {
                      type: "ppart",
                      genNum: {
                        gender: "masc",
                        number: "singular",
                      },
                      verb: kawulStat,
                    },
                  },
                },
              },
            },
            {
              type: "parsed vbb aux",
              content: {
                type: "parsed vbb eq",
                info: {
                  type: "equative",
                  tense: "present",
                },
                person: T.Person.ThirdSingMale,
              },
            },
          ],
          kids: [],
        },
      ],
    },
    {
      input: "به پخه شوې وي",
      output: getPeople(3, "both").flatMap((person) =>
        (
          ["habitual", "subjunctive"] satisfies T.EquativeTenseWithoutBa[]
        ).flatMap((tense) =>
          (
            ["singular", "plural"] satisfies T.NounNumber[]
          ).map<VerbSectionData>((number) => ({
            blocks: [
              {
                type: "parsedV",
                content: {
                  type: "active welded",
                  content: {
                    left: {
                      type: "complement",
                      selection: {
                        inflection: [0],
                        gender: ["fem"],
                        given: "پخه",
                        selection: {
                          type: "adjective",
                          entry: pokh,
                          sandwich: undefined,
                        },
                      },
                    },
                    right: {
                      type: "parsed vbp basic part",
                      info: {
                        type: "ppart",
                        genNum: {
                          gender: "fem",
                          number,
                        },
                        verb: kedulStat,
                      },
                    },
                  },
                },
              },
              {
                type: "parsed vbb aux",
                content: {
                  type: "parsed vbb eq",
                  info: {
                    type: "equative",
                    tense,
                  },
                  person,
                },
              },
            ],
            kids: [{ position: 0, section: ["ba"] }],
          })),
        ),
      ),
    },
  ],
};

const passiveBasic: Section = {
  title: "basic passive",
  tests: [
    {
      input: "لیدل کېږم",
      output: getPeople(1, "sing").map((subj) => ({
        blocks: [makePassiveBasicV(leedul, subj, "stem", "imperfective")],
        kids: [],
      })),
    },
    {
      input: "ولیدل شم",
      output: getPeople(1, "sing").map((subj) => ({
        blocks: [oo, makePassiveBasicV(leedul, subj, "stem", "perfective")],
        kids: [],
      })),
    },
    {
      input: "ونه لیدل شم",
      output: getPeople(1, "sing").map((subj) => ({
        blocks: [
          oo,
          { type: "negative", imperative: false },
          makePassiveBasicV(leedul, subj, "stem", "perfective"),
        ],
        kids: [],
      })),
    },
    {
      input: "وابه نه خیستل شولم",
      output: getPeople(1, "sing").map((subj) => ({
        blocks: [
          { type: "PH", s: "وا" },
          { type: "negative", imperative: false },
          makePassiveBasicV(akheestul, subj, "root", "perfective"),
        ],
        kids: [{ position: 1, section: ["ba"] }],
      })),
    },
    {
      input: "نه به اخیستل شولم",
      output: [],
      error: true,
    },
    {
      input: "لیدل کېدلئ",
      output: getPeople(2, "pl").map((subj) => ({
        blocks: [makePassiveBasicV(leedul, subj, "root", "imperfective")],
        kids: [],
      })),
    },
    {
      input: "ولیدل کېدلئ",
      output: [],
      error: true,
    },
    {
      input: "ورسېدل شوم",
      output: [],
      error: true,
    },
  ],
};

const morPH: T.ParsedCompPH = {
  type: "CompPH",
  selection: {
    inflection: [0],
    gender: ["masc"],
    given: "موړ",
    selection: {
      type: "adjective",
      entry: mor,
      sandwich: undefined,
    },
  },
};
const murPH: T.ParsedCompPH = {
  type: "CompPH",
  selection: {
    inflection: [0],
    gender: ["masc"],
    given: "مړ",
    selection: {
      type: "adjective",
      entry: mur,
      sandwich: undefined,
    },
  },
};
const murComp: T.ParsedComplementSelection = {
  type: "complement",
  selection: {
    inflection: [0],
    gender: ["masc"],
    given: "مړ",
    selection: {
      type: "adjective",
      entry: mur,
      sandwich: undefined,
    },
  },
};

const passiveStatCompVBB: Section = {
  title: "stat comp passive",
  tests: [
    {
      input: "مړول کېږم",
      output: [
        ...getPeople(1, "sing").map<VerbSectionData>((subj) => ({
          blocks: [makePassiveBasicV(marawul, subj, "stem", "imperfective")],
          kids: [],
        })),
      ],
    },
    {
      input: "مړول کېدلم",
      output: [
        ...getPeople(1, "sing").map<VerbSectionData>((subj) => ({
          blocks: [makePassiveBasicV(marawul, subj, "root", "imperfective")],
          kids: [],
        })),
      ],
    },
    {
      input: "موړ کړای شم",
      output: [
        ...getPeople(1, "sing").map<VerbSectionData>((subj) => ({
          blocks: [
            morPH,
            makeAbilityVBP({
              aspect: "perfective",
              verb: kawulStat,
            }),
            toAux(
              makeParsedVBE({
                person: subj,
                aspect: "perfective",
                base: "stem",
                verb: kedulStat,
              }),
            ),
          ],
          kids: [],
        })),
        ...getPeople(1, "sing").map<VerbSectionData>((subj) => ({
          blocks: [
            morPH,
            makePassiveBasicV(kawulStat, subj, "stem", "perfective"),
          ],
          kids: [],
        })),
      ],
    },
    {
      input: "موړ کړای شولم",
      output: [
        ...getPeople(1, "sing").map<VerbSectionData>((subj) => ({
          blocks: [
            morPH,
            makeAbilityVBP({
              aspect: "perfective",
              verb: kawulStat,
            }),

            toAux(
              makeParsedVBE({
                person: subj,
                aspect: "perfective",
                base: "root",
                verb: kedulStat,
              }),
            ),
          ],
          kids: [],
        })),
        ...getPeople(1, "sing").map<VerbSectionData>((subj) => ({
          blocks: [
            morPH,
            makePassiveBasicV(kawulStat, subj, "root", "perfective"),
          ],
          kids: [],
        })),
      ],
    },
    {
      input: "مړ کول کېږم",
      output: [
        ...getPeople(1, "sing").map<VerbSectionData>((subj) => ({
          blocks: [
            makeDoublePassiveV(
              {
                type: "complement",
                selection: {
                  inflection: [0],
                  gender: ["masc"],
                  given: "مړ",
                  selection: {
                    type: "adjective",
                    entry: mur,
                    sandwich: undefined,
                  },
                },
              },
              subj,
              "imperfective",
              "stem",
            ),
          ],
          kids: [],
        })),
      ],
    },
    {
      input: "مړ کول کېدلم",
      output: [
        ...getPeople(1, "sing").map<VerbSectionData>((subj) => ({
          blocks: [makeDoublePassiveV(murComp, subj, "imperfective", "root")],
          kids: [],
        })),
      ],
    },
    {
      input: "مړ کړای شم",
      output: [
        ...getPeople(1, "sing").map<VerbSectionData>((subj) => ({
          blocks: [
            murPH,
            makeAbilityVBP({ aspect: "perfective", verb: kawulStat }),
            toAux(
              makeParsedVBE({
                person: subj,
                aspect: "perfective",
                base: "stem",
                verb: kedulStat,
              }),
            ),
          ],
          kids: [],
        })),
        ...getPeople(1, "sing").map<VerbSectionData>((subj) => ({
          blocks: [
            murPH,
            makePassiveBasicV(kawulStat, subj, "stem", "perfective"),
          ],
          kids: [],
        })),
      ],
    },
    ...["کړای", "کړلای"].map((kraay) => ({
      input: `مړ ${kraay} شولم`,
      output: [
        ...getPeople(1, "sing").map<VerbSectionData>((subj) => ({
          blocks: [
            murPH,
            makeAbilityVBP({ aspect: "perfective", verb: kawulStat }),
            toAux(
              makeParsedVBE({
                person: subj,
                aspect: "perfective",
                base: "root",
                verb: kedulStat,
              }),
            ),
          ],
          kids: [],
        })),
        ...getPeople(1, "sing").map<VerbSectionData>((subj) => ({
          blocks: [
            murPH,
            makePassiveBasicV(kawulStat, subj, "root", "perfective"),
          ],
          kids: [],
        })),
      ],
    })),
    {
      input: "مړ کړل شولم",
      output: getPeople(1, "sing").map<VerbSectionData>((subj) => ({
        blocks: [
          murPH,
          makePassiveBasicV(kawulStat, subj, "root", "perfective"),
        ],
        kids: [],
      })),
    },
  ],
};

const passivePerfectBasic: Section = {
  title: "passive perfect",
  tests: [
    {
      input: "لیدل شوی دی",
      output: [
        {
          blocks: [
            makePassiveBasicP(leedul, {
              gender: "masc",
              number: "singular",
            }),
            {
              type: "parsed vbb aux",
              content: {
                type: "parsed vbb eq",
                info: {
                  type: "equative",
                  tense: "present",
                },
                person: T.Person.ThirdSingMale,
              },
            },
          ],
          kids: [],
        },
      ],
    },
    {
      input: "پخول شوې وه",
      output: (["singular", "plural"] satisfies T.NounNumber[]).map(
        (number) => ({
          blocks: [
            makePassiveBasicP(pakhawul, { gender: "fem", number }),
            {
              type: "parsed vbb aux",
              content: {
                type: "parsed vbb eq",
                info: {
                  type: "equative",
                  tense: "past",
                },
                person: T.Person.ThirdSingFemale,
              },
            },
          ],
          kids: [],
        }),
      ),
    },
    {
      input: "نه به وي لیدل شوي",
      output: [
        ...getPeople(3, "both").flatMap<
          Section["tests"][number]["output"][number]
        >((person) =>
          (
            ["habitual", "subjunctive"] satisfies T.EquativeTenseWithoutBa[]
          ).map((tense) => ({
            blocks: [
              { type: "negative", imperative: false },
              {
                type: "parsed vbb aux",
                content: {
                  type: "parsed vbb eq",
                  info: {
                    type: "equative",
                    tense,
                  },
                  person,
                },
              },
              makePassiveBasicP(leedul, {
                gender: "masc",
                number: "plural",
              }),
            ],
            kids: [{ position: 1, section: ["ba"] }],
          })),
        ),
      ],
    },
  ],
};

const passiveAbility: Section = {
  title: "passive ability",
  tests: [
    {
      input: "لیدل کېدای شم",
      output: (["imperfective", "perfective"] satisfies T.Aspect[]).flatMap(
        (aspect) =>
          getPeople(1, "sing").map((subj) => ({
            blocks: [
              {
                type: "parsedV",
                content: {
                  type: "passive welded",
                  content: {
                    left: leedul,
                    right: {
                      type: "parsed vbp basic ability",
                      info: {
                        type: "ability",
                        verb: kedulStat,
                        aspect,
                      },
                    },
                  },
                },
              },
              toAux(
                makeParsedVBE({
                  person: subj,
                  aspect: "perfective",
                  base: "stem",
                  verb: kedulStat,
                }),
              ),
            ],
            kids: [],
          })),
      ),
    },
    {
      input: "نه به مې شول اخیستل کېدلی",
      output: (["imperfective", "perfective"] satisfies T.Aspect[]).flatMap(
        (aspect) => ({
          blocks: [
            {
              type: "negative",
              imperative: false,
            },
            toAux(
              makeParsedVBE({
                person: T.Person.ThirdPlurMale,
                aspect: "perfective",
                base: "root",
                verb: kedulStat,
              }),
            ),
            {
              type: "parsedV",
              content: {
                type: "passive welded",
                content: {
                  left: akheestul,
                  right: {
                    type: "parsed vbp basic ability",
                    info: {
                      type: "ability",
                      verb: kedulStat,
                      aspect,
                    },
                  },
                },
              },
            },
          ],
          kids: [{ position: 1, section: ["ba", "me"] }],
        }),
      ),
    },
  ],
};

const passiveStatCompPerf: Section = {
  title: "passive stat comp perf",
  tests: [
    {
      input: "پاخه کړای شوي دي",
      output: getPeople(3, "pl").map((person) => ({
        blocks: [
          {
            type: "parsedV",
            content: {
              type: "passive doub welded",
              content: {
                left: {
                  type: "passive welded left",
                  complement: {
                    type: "complement",
                    selection: {
                      inflection: [1],
                      gender: ["masc"],
                      given: "پاخه",
                      selection: {
                        type: "adjective",
                        entry: pokh,
                        sandwich: undefined,
                      },
                    },
                  },
                },
                right: makePPartVBP(kedulStat, {
                  gender: "masc",
                  number: "plural",
                }).content.content,
              },
            },
          },
          {
            type: "parsed vbb aux",
            content: {
              type: "parsed vbb eq",
              info: {
                type: "equative",
                tense: "present",
              },
              person,
            },
          },
        ],
        kids: [],
      })),
    },
    ...["کړل", "کړای", "کړلای", "کول"].map<Section["tests"][number]>(
      (kraay) => ({
        input: `مړ ${kraay} شوی دی`,
        output: [
          {
            blocks: [
              {
                type: "parsedV",
                content: {
                  type: "passive doub welded",
                  content: {
                    left: {
                      type: "passive welded left",
                      complement: murComp,
                    },
                    right: makePPartVBP(kedulStat, {
                      gender: "masc",
                      number: "singular",
                    }).content.content,
                  },
                },
              },
              {
                type: "parsed vbb aux",
                content: {
                  type: "parsed vbb eq",
                  info: {
                    type: "equative",
                    tense: "present",
                  },
                  person: T.Person.ThirdSingMale,
                },
              },
            ],
            kids: [],
          },
        ],
      }),
    ),
  ],
};

// TODO: make sure we cover all کړل کول کړای cases etc.
// and make sure we can parse both پخول شوي and پوخ کړای شوي

const passiveStatCompAbility: Section = {
  title: "passive stat comp ability",
  tests: [
    {
      input: "مړ کول کېدای شم",
      output: [
        ...(["perfective", "imperfective"] satisfies T.Aspect[]).flatMap<
          Section["tests"][number]["output"][number]
        >((aspect) =>
          getPeople(1, "sing").map((person) => ({
            blocks: [
              {
                type: "parsedV",
                content: {
                  type: "passive doub welded",
                  content: {
                    left: {
                      type: "passive welded left",
                      complement: murComp,
                    },
                    right: {
                      type: "parsed vbp basic ability",
                      info: {
                        type: "ability",
                        verb: kedulStat,
                        aspect,
                      },
                    },
                  },
                },
              },
              toAux(
                makeParsedVBE({
                  person,
                  aspect: "perfective",
                  base: "stem",
                  verb: kedulStat,
                }),
              ),
            ],
            kids: [],
          })),
        ),
      ],
    },
    {
      input: "مړ کړل کېدای شم",
      output: [],
      error: true,
    },
  ],
};

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
  statCompPerfect,
  passivePerfectBasic,
  passiveAbility,
  passiveBasic,
  passiveStatCompVBB,
  passiveStatCompPerf,
  passiveStatCompAbility,
];

sections.forEach((section) => {
  describe(section.title, () => {
    section.tests.forEach(({ input, output, error }) => {
      test(input, () => {
        const tokens = tokenizer(input);
        const res = parseVerbSection(tokens, testDictionary).filter(
          (x) => !x.tokens.length,
        );
        const errored = res.some((x) => x.errors.length);
        expect(errored).toBe(!!error);
        if (!errored) {
          expect(res.map((x) => x.body)).toIncludeSameMembers(output);
        }
      });
    });
  });
});

function makePassiveBasicP(
  verb: T.VerbEntry,
  genNum: T.GenderNumber,
): {
  type: "parsedV";
  content: T.PassiveVWeld<T.ParsedVBPBasicPart>;
} {
  return {
    type: "parsedV",
    content: {
      type: "passive welded",
      content: {
        left: verb,
        right: {
          type: "parsed vbp basic part",
          info: {
            type: "ppart",
            genNum,
            verb: kedulStat,
          },
        },
      },
    },
  };
}
function makePassiveBasicV(
  verb: T.VerbEntry,
  person: T.Person,
  base: "root" | "stem",
  aspect: T.Aspect,
): {
  type: "parsedV";
  content: T.PassiveVWeld<T.ParsedVBBVerb>;
} {
  return {
    type: "parsedV",
    content: {
      type: "passive welded",
      content: {
        left: verb,
        right: {
          type: "parsed vbb verb",
          person,
          info: {
            type: "verb",
            base,
            aspect,
            verb: kedulStat,
          },
        },
      },
    },
  };
}

function makeDoublePassiveV(
  complement: T.ParsedComplementSelection,
  person: T.Person,
  aspect: T.Aspect,
  base: "root" | "stem",
): T.ParsedV<T.ParsedVBBVerb> {
  return {
    type: "parsedV",
    content: {
      type: "passive doub welded",
      content: {
        left: {
          type: "passive welded left",
          complement,
        },
        right: {
          type: "parsed vbb verb",
          info: {
            type: "verb",
            aspect,
            base,
            verb: kedulStat,
          },
          person,
        },
      },
    },
  };
}

function makeWeldedStatComb(
  person: T.Person,
  info: Omit<T.VbInfo, "verb">,
  left: T.ActiveVWeld<T.ParsedVBB>["content"]["left"],
  transitivity: T.Transitivity,
): T.ParsedV<T.ParsedVBB> {
  const infoo: T.VbInfo = {
    ...info,
    verb: transitivity === "transitive" ? kawulStat : kawulDyn,
  };
  return {
    type: "parsedV",
    content: {
      type: "active welded",
      content: {
        left,
        right: {
          type: "parsed vbb verb",
          person,
          info: infoo,
        },
      },
    },
  };
}

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
      })),
    ),
  );
}

function makeEqVBE(
  person: T.Person,
  tense: T.EquativeTenseWithoutBa,
): T.ParsedVBBAux {
  return {
    type: "parsed vbb aux",
    content: {
      type: "parsed vbb eq",
      info: {
        type: "equative",
        tense: tense,
      },
      person: person,
    },
  };
}

function makePPartVBP(
  verb: T.VerbEntry,
  genNum: T.GenderNumber,
): {
  type: "parsedV";
  content: T.ActiveVBasic<T.ParsedVBP>;
} {
  return {
    type: "parsedV",
    content: {
      type: "active basic",
      content: {
        type: "parsed vbp basic part",
        info: {
          type: "ppart",
          verb: verb,
          genNum: genNum,
        },
      },
    },
  };
}

function makeAbilityVBP(props: {
  aspect: T.Aspect;
  verb: T.VerbEntry;
}): T.ParsedV<T.ParsedVBP> {
  return {
    type: "parsedV",
    content: {
      type: "active basic",
      content: {
        type: "parsed vbp basic ability",
        info: {
          type: "ability",
          aspect: props.aspect,
          verb: props.verb,
        },
      },
    },
  };
}

function toAux(x: ReturnType<typeof makeParsedVBE>): T.ParsedVBBAux {
  return {
    type: "parsed vbb aux",
    content: x.content.content,
  };
}

function makeParsedVBE(props: {
  person: T.Person;
  aspect: T.Aspect;
  base: "root" | "stem";
  verb: T.VerbEntry;
  imperative?: true;
}): {
  type: "parsedV";
  content: T.ActiveVBasic<T.ParsedVBB>;
} {
  return {
    type: "parsedV",
    content: {
      type: "active basic",
      content: {
        type: "parsed vbb verb",
        person: props.person,
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
      },
    },
  };
}
