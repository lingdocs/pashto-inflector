import * as T from "../../../types";
import { testDictionary } from "./mini-test-dictionary";
import { tokenizer } from "./tokenizer";
import { getPeople, removeKeys, tokensExist } from "./utils";
import { parseVP } from "./parse-vp";
// import {
//   kedulDyn,
//   kedulStat,
//   raatlul,
//   wartlul,
// } from "./verb-section/irreg-verbs";
// import {
//   makeAPBlock,
//   makeSubjectSelection,
//   makeSubjectSelectionComplete,
// } from "../phrase-building/blocks-utils";
import {
  makeAdjectiveSelection,
  makeAdverbSelection,
  makeNounSelection,
  makePossesorSelection,
  makePronounSelection,
} from "../phrase-building/make-selections";
import { makeVPSelectionState } from "../phrase-building/verb-selection";
import {
  dartlul,
  kedulStat,
  raatlul,
  wartlul,
} from "./verb-section/irreg-verbs";
const kraayVars = ["کړل", "کړای", "کړی"];

const leedul = testDictionary.verbEntryLookup("لیدل")[0];
const akheestul = testDictionary.verbEntryLookup("اخیستل")[0];
// const kenaastul = testDictionary.verbEntryLookup("کېناستل")[0];
const wahul = testDictionary.verbEntryLookup("وهل")[0];
// const awuxtul = testDictionary.verbEntryLookup("اوښتل")[0];
// const raawrul = testDictionary.verbEntryLookup("راوړل")[0];
// const botlul = testDictionary.verbEntryLookup("بوتلل")[0];
const rasedul = testDictionary.verbEntryLookup("رسېدل")[0];
// const leekul = testDictionary.verbEntryLookup("لیکل")[0];
const tlul = testDictionary
  .verbEntryLookup("تلل")
  .filter((x) => x.entry.e.includes("to go"))[0];
// const manul = testDictionary.verbEntryLookup("منل")[0];
// const gaalul = testDictionary.verbEntryLookup("ګالل")[0];
// const khorul = testDictionary.verbEntryLookup("خوړل")[0];
// const kxenaastul = testDictionary.verbEntryLookup("کښېناستل")[0];
// const prexodul = testDictionary.verbEntryLookup("پرېښودل")[0];
// const prexowul = testDictionary.verbEntryLookup("پرېښوول")[0];
// const prexawul = testDictionary.verbEntryLookup("پرېښول")[0];
// const xodul = testDictionary.verbEntryLookup("ښودل")[0];
// const kexodul = testDictionary.verbEntryLookup("کېښودل")[0];
// const kxexodul = testDictionary.verbEntryLookup("کښېښودل")[0];
// const katul = testDictionary.verbEntryLookup("کتل")[0];
// const watul = testDictionary.verbEntryLookup("وتل")[0];
// const wurul = testDictionary.verbEntryLookup("وړل")[0];
// const alwatul = testDictionary.verbEntryLookup("الوتل")[0];
const saray = testDictionary.nounLookup("سړی")[0];
const xudza = testDictionary.nounLookup("ښځه")[0];
const kor = testDictionary.nounLookup("کور")[0];
const kitaab = testDictionary.nounLookup("کتاب")[0];
const stoonza = testDictionary.nounLookup("ستونزه")[0];
const paroon = testDictionary.otherLookup("p", "پرون")[0] as T.AdverbEntry;
const dalta = testDictionary.otherLookup(
  "p",
  "دلته",
)[0] as T.LocativeAdverbEntry;
const jzarul = testDictionary.verbEntryLookup("ژړل")[0] as T.VerbEntry;
const balul = testDictionary.verbEntryLookup("بلل")[0] as T.VerbEntry;
const gardzedul = testDictionary.verbEntryLookup("ګرځېدل")[0] as T.VerbEntry;
const murKedul = testDictionary.verbEntryLookup("مړ کېدل")[0] as T.VerbEntry;
const maredul = testDictionary.verbEntryLookup("مړېدل")[0];
const murKawul = testDictionary.verbEntryLookup("مړ کول")[0] as T.VerbEntry;
const marawul = testDictionary.verbEntryLookup("مړول")[0];
const sturay = testDictionary.adjLookup("ستړی")[0];
const ghut = testDictionary.adjLookup("غټ")[0];

// TODO: add مړېدل to testDictionary and make sure that مړ کېدم doesn't parse into مړېدم!

//  _            _
// | |_ ___  ___| |_ ___
// | __/ _ \/ __| __/ __|
// | ||  __/\__ \ |_\__ \
//  \__\___||___/\__|___/

const [full, shrinkServant, dropKing, both]: T.FormVersion[] = [
  { shrinkServant: false, removeKing: false },
  { shrinkServant: true, removeKing: false },
  { shrinkServant: false, removeKing: true },
  { shrinkServant: true, removeKing: true },
];

type Section = {
  title: string;
  tests: {
    input: string;
    output: (T.VPSelectionComplete | T.EPSelectionComplete)[];
    error?: boolean;
  }[];
};

const intransFullForm: Section = {
  title: "Full Form",
  tests: [
    // basic verbs
    {
      input: "زه ځم",
      output: getPeople(1, "sing").map<T.VPSelectionComplete>((person) => ({
        blocks: [makeSubjBlock(person), makeObjBlock("none")],
        verb: makeVS(tlul, "presentVerb"),
        form: full,
        externalComplement: undefined,
      })),
    },
    {
      input: "پرون ښځه ونه رسېده",
      output: [
        {
          blocks: [
            {
              key: 1,
              block: {
                type: "AP",
                selection: {
                  type: "adverb",
                  entry: paroon,
                },
              },
            },
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(xudza, undefined),
            }),
            makeObjBlock("none"),
          ],
          verb: {
            ...makeVS(rasedul, "perfectivePast"),
            negative: true,
          },
          form: full,
          externalComplement: undefined,
        },
      ],
    },
    // perfect
    {
      input: "ښځه رسېدلې ده",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(xudza, undefined),
            }),
            makeObjBlock("none"),
          ],
          verb: makeVS(rasedul, "presentPerfect"),
          form: full,
          externalComplement: undefined,
        },
      ],
    },
    {
      input: "ښځه به نه وي رسېدلې",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(xudza, undefined),
            }),
            makeObjBlock("none"),
          ],
          verb: {
            ...makeVS(rasedul, "futurePerfect"),
            negative: true,
          },
          form: full,
          externalComplement: undefined,
        },
      ],
    },
    // imperative
    {
      input: "ته کور ته ورسېږه",
      output: getPeople(2, "sing").map<T.VPSelectionComplete>((person) => ({
        blocks: [
          makeSubjBlock({
            type: "NP",
            selection: makePronounSelection(person),
          }),
          makeObjBlock("none"),
          {
            key: 2,
            block: {
              type: "AP",
              selection: {
                type: "sandwich",
                before: undefined,
                after: {
                  p: "ته",
                  f: "ta",
                },
                e: "to",
                mayo: false,
                inside: {
                  type: "NP",
                  selection: makeNounSelection(kor, undefined),
                },
              },
            },
          },
        ],
        verb: makeVS(rasedul, "perfectiveImperative"),
        form: full,
        externalComplement: undefined,
      })),
    },
    {
      input: "تاسو مه ځئ",
      output: getPeople(2, "pl").map((person) => ({
        blocks: [
          makeSubjBlock({
            type: "NP",
            selection: makePronounSelection(person),
          }),
          makeObjBlock("none"),
        ],
        verb: {
          ...makeVS(tlul, "imperfectiveImperative"),
          negative: true,
        },
        form: full,
        externalComplement: undefined,
      })),
    },
    // ability
    {
      input: "ته رسېدی شې",
      output: getPeople(2, "sing").map<T.VPSelectionComplete>((person) => ({
        blocks: [
          makeSubjBlock({
            type: "NP",
            selection: makePronounSelection(person),
          }),
          makeObjBlock("none"),
        ],
        verb: makeVS(rasedul, "presentVerbModal"),
        form: full,
        externalComplement: undefined,
      })),
    },
    {
      input: "تاسو ونه شئ رسېدلی",
      output: getPeople(2, "pl").map<T.VPSelectionComplete>((person) => ({
        blocks: [
          makeSubjBlock({
            type: "NP",
            selection: makePronounSelection(person),
          }),
          makeObjBlock("none"),
        ],
        verb: {
          ...makeVS(rasedul, "subjunctiveVerbModal"),
          negative: true,
        },
        form: full,
        externalComplement: undefined,
      })),
    },
  ],
};

const transFullForm: Section = {
  title: "Transitive Full Form ",
  tests: [
    // basic
    {
      input: "سړی ښځه وهي",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(saray, undefined),
            }),
            makeObjBlock({
              type: "NP",
              selection: makeNounSelection(xudza, undefined),
            }),
          ],
          verb: makeVS(wahul, "presentVerb"),
          form: full,
          externalComplement: undefined,
        },
        {
          blocks: [
            makeObjBlock({
              type: "NP",
              selection: makeNounSelection(saray, undefined),
            }),
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(xudza, undefined),
            }),
          ],
          verb: makeVS(wahul, "presentVerb"),
          form: full,
          externalComplement: undefined,
        },
      ],
    },
    {
      input: "سړي ښځه ووهله",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(saray, undefined),
            }),
            makeObjBlock({
              type: "NP",
              selection: makeNounSelection(xudza, undefined),
            }),
          ],
          verb: makeVS(wahul, "perfectivePast"),
          form: full,
          externalComplement: undefined,
        },
      ],
    },
    {
      input: "ما به ته ونه وهلې",
      output: getPeople(1, "sing").flatMap((subjPerson) =>
        getPeople(2, "sing").map<T.VPSelectionComplete>((objPerson) => ({
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makePronounSelection(subjPerson),
            }),
            makeObjBlock({
              type: "NP",
              selection: makePronounSelection(objPerson),
            }),
          ],
          verb: {
            ...makeVS(wahul, "habitualPerfectivePast"),
            negative: true,
          },
          form: full,
          externalComplement: undefined,
        })),
      ),
    },
    // perfect
    {
      input: "سړي ښځه وهلې وله",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(saray, undefined),
            }),
            makeObjBlock({
              type: "NP",
              selection: makeNounSelection(xudza, undefined),
            }),
          ],
          verb: makeVS(wahul, "pastPerfect"),
          form: full,
          externalComplement: undefined,
        },
      ],
    },
    {
      input: "سړي به ښځه نه وه وهلې",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(saray, undefined),
            }),
            makeObjBlock({
              type: "NP",
              selection: makeNounSelection(xudza, undefined),
            }),
          ],
          verb: {
            ...makeVS(wahul, "wouldBePerfect"),
            negative: true,
          },
          form: full,
          externalComplement: undefined,
        },
      ],
    },
    {
      input: "ما تاسو لیدلې ولئ",
      output: getPeople(1, "sing").map<T.VPSelectionComplete>((person) => ({
        blocks: [
          makeSubjBlock(person),
          makeObjBlock(T.Person.SecondPlurFemale),
        ],
        verb: makeVS(leedul, "pastPerfect"),
        externalComplement: undefined,
        form: full,
      })),
    },
    // imperative
    {
      input: "ته سړی ووهه",
      output: getPeople(2, "sing").map<T.VPSelectionComplete>((person) => ({
        blocks: [
          makeSubjBlock(person),
          makeObjBlock({
            type: "NP",
            selection: makeNounSelection(saray, undefined),
          }),
        ],
        verb: makeVS(wahul, "perfectiveImperative"),
        form: full,
        externalComplement: undefined,
      })),
    },
    {
      input: "ته سړی مه وهه",
      output: getPeople(2, "sing").map<T.VPSelectionComplete>((person) => ({
        blocks: [
          makeSubjBlock(person),
          makeObjBlock({
            type: "NP",
            selection: makeNounSelection(saray, undefined),
          }),
        ],
        verb: {
          ...makeVS(wahul, "imperfectiveImperative"),
          negative: true,
        },
        form: full,
        externalComplement: undefined,
      })),
    },
    // ability
    {
      input: "سړي ښځه لیدی شوله",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(saray, undefined),
            }),
            makeObjBlock({
              type: "NP",
              selection: makeNounSelection(xudza, undefined),
            }),
          ],
          verb: makeVS(leedul, "imperfectivePastModal"),
          form: full,
          externalComplement: undefined,
        },
      ],
    },
    {
      input: "سړی ښځه ونه شي لیدلای",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(saray, undefined),
            }),
            makeObjBlock({
              type: "NP",
              selection: makeNounSelection(xudza, undefined),
            }),
          ],
          verb: {
            ...makeVS(leedul, "subjunctiveVerbModal"),
            negative: true,
          },
          form: full,
          externalComplement: undefined,
        },
        {
          blocks: [
            makeObjBlock({
              type: "NP",
              selection: makeNounSelection(saray, undefined),
            }),
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(xudza, undefined),
            }),
          ],
          verb: {
            ...makeVS(leedul, "subjunctiveVerbModal"),
            negative: true,
          },
          form: full,
          externalComplement: undefined,
        },
      ],
    },
  ],
};

const intransDropKing: Section = {
  title: "intransitive w/out king",
  tests: [
    // basic
    {
      input: "ځم",
      output: getPeople(1, "sing").map<T.VPSelectionComplete>((person) => ({
        blocks: [makeSubjBlock(person), makeObjBlock("none")],
        verb: makeVS(tlul, "presentVerb"),
        form: dropKing,
        externalComplement: undefined,
      })),
    },
    // perfect
    {
      input: "رسېدلې به وم",
      output: [
        {
          blocks: [
            makeSubjBlock(T.Person.FirstSingFemale),
            makeObjBlock("none"),
          ],
          verb: makeVS(rasedul, "wouldBePerfect"),
          externalComplement: undefined,
          form: dropKing,
        },
      ],
    },
    // imperative
    {
      input: "ځئ",
      output: getPeople(2, "pl").flatMap<T.VPSelectionComplete>((person) =>
        (["imperfectiveImperative", "presentVerb"] as const).map((tense) => ({
          blocks: [makeSubjBlock(person), makeObjBlock("none")],
          verb: makeVS(tlul, tense),
          externalComplement: undefined,
          form: dropKing,
        })),
      ),
    },
    {
      input: "مه رسېږه",
      output: getPeople(2, "sing").map<T.VPSelectionComplete>((person) => ({
        blocks: [makeSubjBlock(person), makeObjBlock("none")],
        verb: {
          ...makeVS(rasedul, "imperfectiveImperative"),
          negative: true,
        },
        externalComplement: undefined,
        form: dropKing,
      })),
    },
    // ability
    {
      input: "رسېدی شم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [makeSubjBlock(person), makeObjBlock("none")],
        verb: makeVS(rasedul, "presentVerbModal"),
        form: dropKing,
        externalComplement: undefined,
      })),
    },
    {
      input: "ونه شوم رسېدلای",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [makeSubjBlock(person), makeObjBlock("none")],
        verb: {
          ...makeVS(rasedul, "perfectivePastModal"),
          negative: true,
        },
        form: dropKing,
        externalComplement: undefined,
      })),
    },
  ],
};

const transDropKing: Section = {
  title: "Transitive Drop King",
  tests: [
    // basic
    {
      input: "ښځه وهي",
      output: getPeople(3, "both").map((person) => ({
        blocks: [
          makeSubjBlock(person),
          makeObjBlock({
            type: "NP",
            selection: makeNounSelection(xudza, undefined),
          }),
        ],
        verb: makeVS(wahul, "presentVerb"),
        form: dropKing,
        externalComplement: undefined,
      })),
    },
    {
      input: "سړي ووهله",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(saray, undefined),
            }),
            makeObjBlock(T.Person.ThirdSingFemale),
          ],
          verb: makeVS(wahul, "perfectivePast"),
          form: dropKing,
          externalComplement: undefined,
        },
      ],
    },
    // perfect
    {
      input: "سړي وهلې وله",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(saray, undefined),
            }),
            makeObjBlock(T.Person.ThirdSingFemale),
          ],
          verb: makeVS(wahul, "pastPerfect"),
          form: dropKing,
          externalComplement: undefined,
        },
      ],
    },
    // imperative
    {
      input: "سړی ووهه",
      output: getPeople(2, "sing").map<T.VPSelectionComplete>((person) => ({
        blocks: [
          makeSubjBlock(person),
          makeObjBlock({
            type: "NP",
            selection: makeNounSelection(saray, undefined),
          }),
        ],
        verb: makeVS(wahul, "perfectiveImperative"),
        form: dropKing,
        externalComplement: undefined,
      })),
    },
    {
      input: "سړی مه وهئ",
      output: getPeople(2, "pl").map<T.VPSelectionComplete>((person) => ({
        blocks: [
          makeSubjBlock(person),
          makeObjBlock({
            type: "NP",
            selection: makeNounSelection(saray, undefined),
          }),
        ],
        verb: {
          ...makeVS(wahul, "imperfectiveImperative"),
          negative: true,
        },
        form: dropKing,
        externalComplement: undefined,
      })),
    },
    // ability
    {
      input: "سړي لیدی شوله",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(saray, undefined),
            }),
            makeObjBlock(T.Person.ThirdSingFemale),
          ],
          verb: makeVS(leedul, "imperfectivePastModal"),
          form: dropKing,
          externalComplement: undefined,
        },
      ],
    },
    {
      input: "ښځه ونه شي وهلی",
      output: getPeople(3, "both").map((person) => ({
        blocks: [
          makeSubjBlock(person),
          makeObjBlock({
            type: "NP",
            selection: makeNounSelection(xudza, undefined),
          }),
        ],
        verb: {
          ...makeVS(wahul, "subjunctiveVerbModal"),
          negative: true,
        },
        form: dropKing,
        externalComplement: undefined,
      })),
    },
  ],
};

const transShrinkServant: Section = {
  title: "Transitive Shrink Servant",
  tests: [
    // basic
    {
      input: "سړی مې وهي",
      output: [
        ...getPeople(1, "sing").map((person) => ({
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(saray, undefined),
            }),
            makeObjBlock(person),
          ],
          verb: makeVS(wahul, "presentVerb"),
          form: shrinkServant,
          externalComplement: undefined,
        })),
        ...getPeople(3, "both").flatMap((subjPerson) =>
          getPeople(1, "sing").map<T.VPSelectionComplete>((possPerson) => ({
            blocks: [
              makeSubjBlock(subjPerson),
              makeObjBlock({
                type: "NP",
                selection: {
                  ...makeNounSelection(saray, undefined),
                  possesor: {
                    type: "possesor",
                    shrunken: true,
                    np: {
                      type: "NP",
                      selection: makePronounSelection(possPerson),
                    },
                  },
                },
              }),
            ],
            verb: makeVS(wahul, "presentVerb"),
            form: dropKing,
            externalComplement: undefined,
          })),
        ),
      ],
    },
    {
      input: "ښځه مې ووهله",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          makeSubjBlock(person),
          makeObjBlock({
            type: "NP",
            selection: makeNounSelection(xudza, undefined),
          }),
        ],
        verb: makeVS(wahul, "perfectivePast"),
        form: shrinkServant,
        externalComplement: undefined,
      })),
    },
    {
      input: "ته به مې ونه وهلې",
      output: getPeople(1, "sing").flatMap((subjPerson) =>
        getPeople(2, "sing").map<T.VPSelectionComplete>((objPerson) => ({
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makePronounSelection(subjPerson),
            }),
            makeObjBlock({
              type: "NP",
              selection: makePronounSelection(objPerson),
            }),
          ],
          verb: {
            ...makeVS(wahul, "habitualPerfectivePast"),
            negative: true,
          },
          form: shrinkServant,
          externalComplement: undefined,
        })),
      ),
    },
    // perfect
    {
      input: "ښځه یې وهلې وله",
      output: getPeople(3, "both").map((person) => ({
        blocks: [
          makeSubjBlock(person),
          makeObjBlock({
            type: "NP",
            selection: makeNounSelection(xudza, undefined),
          }),
        ],
        verb: makeVS(wahul, "pastPerfect"),
        form: shrinkServant,
        externalComplement: undefined,
      })),
    },
    // imperative
    {
      input: "ته یې ووهه",
      output: getPeople(2, "sing").flatMap<T.VPSelectionComplete>(
        (subjPerson) =>
          getPeople(3, "both").map((objPerson) => ({
            blocks: [makeSubjBlock(subjPerson), makeObjBlock(objPerson)],
            verb: makeVS(wahul, "perfectiveImperative"),
            form: shrinkServant,
            externalComplement: undefined,
          })),
      ),
    },
    {
      input: "دلته یې ته مه وهه",
      output: getPeople(2, "sing").flatMap<T.VPSelectionComplete>(
        (subjPerson) =>
          getPeople(3, "both").map((objPerson) => ({
            blocks: [
              {
                key: 1,
                block: {
                  type: "AP",
                  selection: makeAdverbSelection(dalta),
                },
              },
              makeSubjBlock(subjPerson),
              makeObjBlock(objPerson),
            ],
            verb: {
              ...makeVS(wahul, "imperfectiveImperative"),
              negative: true,
            },
            form: shrinkServant,
            externalComplement: undefined,
          })),
      ),
    },
    // ability
    {
      input: "ښځه مې لیدی شوله",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          makeSubjBlock(person),
          makeObjBlock({
            type: "NP",
            selection: makeNounSelection(xudza, undefined),
          }),
        ],
        verb: makeVS(leedul, "imperfectivePastModal"),
        form: shrinkServant,
        externalComplement: undefined,
      })),
    },
    {
      input: "ته مې ونه شې وهلای",
      output: getPeople(1, "sing").flatMap((objPerson) =>
        getPeople(2, "sing").map((subjPerson) => ({
          blocks: [makeSubjBlock(subjPerson), makeObjBlock(objPerson)],
          verb: {
            ...makeVS(wahul, "subjunctiveVerbModal"),
            negative: true,
          },
          form: shrinkServant,
          externalComplement: undefined,
        })),
      ),
    },
  ],
};

const transBoth: Section = {
  title: "transitive both",
  tests: [
    // basic
    {
      input: "وینم دې",
      output: getPeople(1, "sing").flatMap((subj) =>
        getPeople(2, "sing").map<T.VPSelectionComplete>((obj) => ({
          blocks: [makeSubjBlock(subj), makeObjBlock(obj)],
          verb: makeVS(leedul, "presentVerb"),
          form: both,
          externalComplement: undefined,
        })),
      ),
    },
    {
      input: "ومې لیدله",
      output: getPeople(1, "sing").map((subj) => ({
        blocks: [makeSubjBlock(subj), makeObjBlock(T.Person.ThirdSingFemale)],
        verb: makeVS(leedul, "perfectivePast"),
        form: both,
        externalComplement: undefined,
      })),
    },
    {
      input: "وبه مې نه لیدله",
      output: getPeople(1, "sing").map((subj) => ({
        blocks: [makeSubjBlock(subj), makeObjBlock(T.Person.ThirdSingFemale)],
        verb: {
          ...makeVS(leedul, "habitualPerfectivePast"),
          negative: true,
        },
        form: both,
        externalComplement: undefined,
      })),
    },
    // perfect
    {
      input: "لیدلی به دې وم",
      output: getPeople(2, "sing").map((subj) => ({
        blocks: [makeSubjBlock(subj), makeObjBlock(T.Person.FirstSingMale)],
        verb: makeVS(leedul, "wouldBePerfect"),
        form: both,
        externalComplement: undefined,
      })),
    },
    // imperative
    {
      input: "وایې خله",
      output: getPeople(2, "sing").flatMap((subj) =>
        getPeople(3, "both").map<T.VPSelectionComplete>((obj) => ({
          blocks: [makeSubjBlock(subj), makeObjBlock(obj)],
          verb: makeVS(akheestul, "perfectiveImperative"),
          form: both,
          externalComplement: undefined,
        })),
      ),
    },
    // ability
    {
      input: "لیدلی دې شم",
      output: getPeople(1, "sing").flatMap((subj) =>
        getPeople(2, "sing").map<T.VPSelectionComplete>((obj) => ({
          blocks: [makeSubjBlock(subj), makeObjBlock(obj)],
          verb: makeVS(leedul, "presentVerbModal"),
          form: both,
          externalComplement: undefined,
        })),
      ),
    },
    {
      input: "لیدلی دې شوم",
      output: getPeople(1, "sing").flatMap((obj) =>
        getPeople(2, "sing").map<T.VPSelectionComplete>((subj) => ({
          blocks: [makeSubjBlock(subj), makeObjBlock(obj)],
          verb: makeVS(leedul, "imperfectivePastModal"),
          form: both,
          externalComplement: undefined,
        })),
      ),
    },
  ],
};

const grammTransFull: Section = {
  title: "gramm. trans. full",
  tests: [
    // basic
    {
      input: "سړی ژاړي",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(saray, undefined),
            }),
            makeObjBlock("grammTranThird"),
          ],
          verb: makeVS(jzarul, "presentVerb"),
          form: full,
          externalComplement: undefined,
        },
      ],
    },
    {
      input: "سړي ژړل",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(saray, undefined),
            }),
            makeObjBlock("grammTranThird"),
          ],
          verb: makeVS(jzarul, "imperfectivePast"),
          form: full,
          externalComplement: undefined,
        },
      ],
    },
    // perfect
    {
      input: "ښځو ژړلي دي",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: {
                ...makeNounSelection(xudza, undefined),
                number: "plural",
              },
            }),
            makeObjBlock("grammTranThird"),
          ],
          verb: makeVS(jzarul, "presentPerfect"),
          form: full,
          externalComplement: undefined,
        },
      ],
    },
    // ability
    {
      input: "سړی ژړلی شي",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(saray, undefined),
            }),
            makeObjBlock("grammTranThird"),
          ],
          verb: makeVS(jzarul, "presentVerbModal"),
          form: full,
          externalComplement: undefined,
        },
      ],
    },
    {
      input: "سړي وژړلی شول",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(saray, undefined),
            }),
            makeObjBlock("grammTranThird"),
          ],
          verb: makeVS(jzarul, "perfectivePastModal"),
          form: full,
          externalComplement: undefined,
        },
      ],
    },
    // imperative
    {
      input: "ته وینه",
      output: getPeople(2, "sing").map((subj) => ({
        blocks: [makeSubjBlock(subj), makeObjBlock("grammTranThird")],
        verb: {
          ...makeVS(leedul, "imperfectiveImperative"),
          transitivity: "grammatically transitive",
          canChangeVoice: false,
        },
        form: full,
        externalComplement: undefined,
      })),
    },
  ],
};

const grammTransShort: Section = {
  title: "gramm. trans. shortened",
  tests: [
    {
      input: "ژاړم",
      output: getPeople(1, "sing").map((subj) => ({
        blocks: [makeSubjBlock(subj), makeObjBlock("grammTranThird")],
        verb: makeVS(jzarul, "presentVerb"),
        form: dropKing,
        externalComplement: undefined,
      })),
    },
    {
      input: "ژړل مې",
      output: getPeople(1, "sing").map((subj) => ({
        blocks: [makeSubjBlock(subj), makeObjBlock("grammTranThird")],
        verb: makeVS(jzarul, "imperfectivePast"),
        form: shrinkServant,
        externalComplement: undefined,
      })),
    },
    {
      input: "ژړلي مې دي",
      output: getPeople(1, "sing").map((subj) => ({
        blocks: [makeSubjBlock(subj), makeObjBlock("grammTranThird")],
        verb: makeVS(jzarul, "presentPerfect"),
        form: shrinkServant,
        externalComplement: undefined,
      })),
    },
    // ability
    {
      input: "نه شم ژړلی",
      output: getPeople(1, "sing").map((subj) => ({
        blocks: [makeSubjBlock(subj), makeObjBlock("grammTranThird")],
        verb: {
          ...makeVS(jzarul, "presentVerbModal"),
          negative: true,
        },
        form: dropKing,
        externalComplement: undefined,
      })),
    },
    {
      input: "ونه مې شول ژړلی",
      output: getPeople(1, "sing").map((subj) => ({
        blocks: [makeSubjBlock(subj), makeObjBlock("grammTranThird")],
        verb: {
          ...makeVS(jzarul, "perfectivePastModal"),
          negative: true,
        },
        form: shrinkServant,
        externalComplement: undefined,
      })),
    },
    // imperative
    {
      input: "وینه",
      output: getPeople(2, "sing").map((subj) => ({
        blocks: [makeSubjBlock(subj), makeObjBlock("grammTranThird")],
        verb: {
          ...makeVS(leedul, "imperfectiveImperative"),
          transitivity: "grammatically transitive",
          canChangeVoice: false,
        },
        form: dropKing,
        externalComplement: undefined,
      })),
    },
  ],
};

const complIntransFull: Section = {
  title: "complement w intrans. full",
  tests: [
    {
      input: "کتاب ستونزه وګرځېږي",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(kitaab, undefined),
            }),
            makeObjBlock("none"),
          ],
          verb: makeVS(gardzedul, "subjunctiveVerb"),
          form: full,
          externalComplement: {
            type: "complement",
            selection: {
              type: "NP",
              selection: makeNounSelection(stoonza, undefined),
            },
          },
        },
      ],
    },
    {
      input: "کتاب ستونزه وګرځېدله",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(kitaab, undefined),
            }),
            makeObjBlock("none"),
          ],
          verb: makeVS(gardzedul, "perfectivePast"),
          form: full,
          externalComplement: {
            type: "complement",
            selection: {
              type: "NP",
              selection: makeNounSelection(stoonza, undefined),
            },
          },
        },
      ],
    },
    {
      input: "ستونزه کتابونه وګرځېدل",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(stoonza, undefined),
            }),
            makeObjBlock("none"),
          ],
          verb: makeVS(gardzedul, "perfectivePast"),
          form: full,
          externalComplement: {
            type: "complement",
            selection: {
              type: "NP",
              selection: {
                ...makeNounSelection(kitaab, undefined),
                number: "plural",
              },
            },
          },
        },
      ],
    },
    {
      input: "ته به ستونزه ګرځېدلی یې",
      output: [
        {
          blocks: [
            makeSubjBlock(T.Person.SecondSingMale),
            makeObjBlock("none"),
          ],
          externalComplement: {
            type: "complement",
            selection: {
              type: "NP",
              selection: makeNounSelection(stoonza, undefined),
            },
          },
          verb: makeVS(gardzedul, "futurePerfect"),
          form: full,
        },
      ],
    },
  ],
};

const complTransFull: Section = {
  title: "complement w trans. full",
  tests: [
    {
      input: "زه کتاب ستونزه بولم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          makeSubjBlock(person),
          makeObjBlock({
            type: "NP",
            selection: makeNounSelection(kitaab, undefined),
          }),
        ],
        verb: makeVS(balul, "presentVerb"),
        externalComplement: {
          type: "complement",
          selection: {
            type: "NP",
            selection: makeNounSelection(stoonza, undefined),
          },
        },
        form: full,
      })),
    },
    {
      input: "ما کتاب ستونزه بللې ده",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          makeSubjBlock(person),
          makeObjBlock({
            type: "NP",
            selection: makeNounSelection(kitaab, undefined),
          }),
        ],
        verb: makeVS(balul, "presentPerfect"),
        externalComplement: {
          type: "complement",
          selection: {
            type: "NP",
            selection: makeNounSelection(stoonza, undefined),
          },
        },
        form: full,
      })),
    },
    {
      input: "ما ته ستونزه بللې یې",
      output: (["presentPerfect", "habitualPerfect"] as const).flatMap(
        (tense) =>
          getPeople(1, "sing").map((person) => ({
            blocks: [
              makeSubjBlock(person),
              makeObjBlock(T.Person.SecondSingFemale),
            ],
            verb: makeVS(balul, tense),
            externalComplement: {
              type: "complement",
              selection: {
                type: "NP",
                selection: makeNounSelection(stoonza, undefined),
              },
            },
            form: full,
          })),
      ),
    },
    {
      input: "ما تاسو ستونزه بللې یئ",
      output: (["presentPerfect", "habitualPerfect"] as const).flatMap(
        (tense) =>
          getPeople(1, "sing").map((person) => ({
            blocks: [
              makeSubjBlock(person),
              makeObjBlock(T.Person.SecondPlurFemale),
            ],
            verb: makeVS(balul, tense),
            externalComplement: {
              type: "complement",
              selection: {
                type: "NP",
                selection: makeNounSelection(stoonza, undefined),
              },
            },
            form: full,
          })),
      ),
    },
  ],
};

const complIntransDropKing: Section = {
  title: "complement w/ intrans. drop king",
  tests: [
    {
      input: "ستونزه وګرځېږې",
      output: getPeople(2, "sing").map<T.VPSelectionComplete>((person) => ({
        blocks: [makeSubjBlock(person), makeObjBlock("none")],
        verb: makeVS(gardzedul, "subjunctiveVerb"),
        form: dropKing,
        externalComplement: {
          type: "complement",
          selection: {
            type: "NP",
            selection: makeNounSelection(stoonza, undefined),
          },
        },
      })),
    },
    {
      input: "ستونزه وګرځېږي",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(stoonza, undefined),
            }),
            makeObjBlock("none"),
          ],
          verb: makeVS(gardzedul, "subjunctiveVerb"),
          form: full,
          externalComplement: undefined,
        },
        ...getPeople(3, "both").map<T.VPSelectionComplete>((person) => ({
          blocks: [makeSubjBlock(person), makeObjBlock("none")],
          verb: makeVS(gardzedul, "subjunctiveVerb"),
          form: dropKing,
          externalComplement: {
            type: "complement",
            selection: {
              type: "NP",
              selection: makeNounSelection(stoonza, undefined),
            },
          },
        })),
      ],
    },
    {
      input: "ستونزه وګرځېدې",
      output: getPeople(2, "sing").map<T.VPSelectionComplete>((person) => ({
        blocks: [makeSubjBlock(person), makeObjBlock("none")],
        verb: makeVS(gardzedul, "perfectivePast"),
        form: dropKing,
        externalComplement: {
          type: "complement",
          selection: {
            type: "NP",
            selection: makeNounSelection(stoonza, undefined),
          },
        },
      })),
    },
    {
      input: "ستونزه وګرځېدله",
      output: [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(stoonza, undefined),
            }),
            makeObjBlock("none"),
          ],
          verb: makeVS(gardzedul, "perfectivePast"),
          form: full,
          externalComplement: undefined,
        },
        ...getPeople(3, "both").map<T.VPSelectionComplete>((person) => ({
          blocks: [makeSubjBlock(person), makeObjBlock("none")],
          verb: makeVS(gardzedul, "perfectivePast"),
          form: dropKing,
          externalComplement: {
            type: "complement",
            selection: {
              type: "NP",
              selection: makeNounSelection(stoonza, undefined),
            },
          },
        })),
      ],
    },
  ],
};

const complTransDropKing: Section = {
  title: "complement w/ trans. drop king",
  tests: [
    {
      input: "کتاب ستونزه بولم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          makeSubjBlock(person),
          makeObjBlock({
            type: "NP",
            selection: makeNounSelection(kitaab, undefined),
          }),
        ],
        verb: makeVS(balul, "presentVerb"),
        externalComplement: {
          type: "complement",
          selection: {
            type: "NP",
            selection: makeNounSelection(stoonza, undefined),
          },
        },
        form: dropKing,
      })),
    },
    {
      input: "ما ستونزه بللې ده",
      output: getPeople(1, "sing").flatMap((subj) => [
        {
          blocks: [
            makeSubjBlock(subj),
            makeObjBlock({
              type: "NP",
              selection: makeNounSelection(stoonza, undefined),
            }),
          ],
          verb: makeVS(balul, "presentPerfect"),
          externalComplement: undefined,
          form: full,
        },
        ...getPeople(3, "both").map<T.VPSelectionComplete>((obj) => ({
          blocks: [makeSubjBlock(subj), makeObjBlock(obj)],
          verb: makeVS(balul, "presentPerfect"),
          externalComplement: {
            type: "complement",
            selection: {
              type: "NP",
              selection: makeNounSelection(stoonza, undefined),
            },
          },
          form: dropKing,
        })),
      ]),
    },
    {
      input: "ما ستونزه بللې یې",
      output: (["presentPerfect", "habitualPerfect"] as const).flatMap(
        (tense) =>
          getPeople(1, "sing").map((person) => ({
            blocks: [
              makeSubjBlock(person),
              makeObjBlock(T.Person.SecondSingFemale),
            ],
            verb: makeVS(balul, tense),
            externalComplement: {
              type: "complement",
              selection: {
                type: "NP",
                selection: makeNounSelection(stoonza, undefined),
              },
            },
            form: dropKing,
          })),
      ),
    },
    {
      input: "ما ستونزه بللي یئ",
      output: (["presentPerfect", "habitualPerfect"] as const).flatMap(
        (tense) =>
          getPeople(1, "sing").map((person) => ({
            blocks: [
              makeSubjBlock(person),
              makeObjBlock(T.Person.SecondPlurMale),
            ],
            verb: makeVS(balul, tense),
            externalComplement: {
              type: "complement",
              selection: {
                type: "NP",
                selection: makeNounSelection(stoonza, undefined),
              },
            },
            form: dropKing,
          })),
      ),
    },
  ],
};

const complTransShrinkServant: Section = {
  title: "complement w/ trans. shrink servant",
  tests: [
    {
      input: "زه یې ستونزه بولم",
      output: getPeople(1, "sing").flatMap((subj) =>
        getPeople(3, "both").flatMap((obj) => [
          {
            blocks: [
              makeSubjBlock(subj),
              makeObjBlock({
                type: "NP",
                selection: {
                  ...makeNounSelection(stoonza, undefined),
                  possesor: {
                    type: "possesor",
                    shrunken: true,
                    np: {
                      type: "NP",
                      selection: makePronounSelection(obj),
                    },
                  },
                },
              }),
            ],
            verb: makeVS(balul, "presentVerb"),
            externalComplement: undefined,
            form: full,
          },
          {
            blocks: [makeSubjBlock(subj), makeObjBlock(obj)],
            verb: makeVS(balul, "presentVerb"),
            externalComplement: {
              type: "complement",
              selection: {
                type: "NP",
                selection: makeNounSelection(stoonza, undefined),
              },
            },
            form: shrinkServant,
          },
        ]),
      ),
    },
    {
      input: "کتاب مې ستونزه بللې ده",
      output: getPeople(1, "sing").flatMap((mpp) => [
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: {
                ...makeNounSelection(kitaab, undefined),
                possesor: {
                  ...makePossesorSelection(makePronounSelection(mpp)),
                  shrunken: true,
                },
              },
            }),
            makeObjBlock({
              type: "NP",
              selection: makeNounSelection(stoonza, undefined),
            }),
          ],
          verb: makeVS(balul, "presentPerfect"),
          externalComplement: undefined,
          form: full,
        },
        {
          blocks: [
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(kitaab, undefined),
            }),
            makeObjBlock({
              type: "NP",
              selection: {
                ...makeNounSelection(stoonza, undefined),
                possesor: {
                  ...makePossesorSelection(makePronounSelection(mpp)),
                  shrunken: true,
                },
              },
            }),
          ],
          verb: makeVS(balul, "presentPerfect"),
          externalComplement: undefined,
          form: full,
        },
        ...getPeople(3, "both").flatMap<T.VPSelectionComplete>((fp) => [
          {
            blocks: [
              makeSubjBlock({
                type: "NP",
                selection: {
                  ...makeNounSelection(kitaab, undefined),
                  possesor: {
                    ...makePossesorSelection(makePronounSelection(mpp)),
                    shrunken: true,
                  },
                },
              }),
              makeObjBlock(fp),
            ],
            verb: makeVS(balul, "presentPerfect"),
            externalComplement: {
              type: "complement",
              selection: {
                type: "NP",
                selection: makeNounSelection(stoonza, undefined),
              },
            },
            form: dropKing,
          },
          {
            blocks: [
              makeSubjBlock({
                type: "NP",
                selection: makeNounSelection(kitaab, undefined),
              }),
              makeObjBlock(fp),
            ],
            verb: makeVS(balul, "presentPerfect"),
            externalComplement: {
              type: "complement",
              selection: {
                type: "NP",
                selection: {
                  ...makeNounSelection(stoonza, undefined),
                  possesor: {
                    ...makePossesorSelection(makePronounSelection(mpp)),
                    shrunken: true,
                  },
                },
              },
            },
            form: dropKing,
          },
        ]),
        {
          blocks: [
            makeSubjBlock(mpp),
            makeObjBlock({
              type: "NP",
              selection: makeNounSelection(kitaab, undefined),
            }),
          ],
          verb: makeVS(balul, "presentPerfect"),
          externalComplement: {
            type: "complement",
            selection: {
              type: "NP",
              selection: makeNounSelection(stoonza, undefined),
            },
          },
          form: shrinkServant,
        },
      ]),
    },
    {
      input: "ته مې ستونزه بللې یې",
      output: (
        ["presentPerfect", "habitualPerfect"] as const
      ).flatMap<T.VPSelectionComplete>((tense) =>
        getPeople(1, "sing").map<T.VPSelectionComplete>((subj) => ({
          blocks: [
            makeSubjBlock(subj),
            makeObjBlock(T.Person.SecondSingFemale),
          ],
          verb: makeVS(balul, tense),
          externalComplement: {
            type: "complement",
            selection: {
              type: "NP",
              selection: makeNounSelection(stoonza, undefined),
            },
          },
          form: shrinkServant,
        })),
      ),
    },
  ],
};

const complTransBoth: Section = {
  title: "complement with trans. shrink both",
  tests: [
    {
      input: "ستونزه یې بولم",
      output: getPeople(1, "sing").flatMap<T.VPSelectionComplete>((subj) =>
        getPeople(3, "both").flatMap<T.VPSelectionComplete>((mpp) => [
          {
            blocks: [makeSubjBlock(subj), makeObjBlock(mpp)],
            verb: makeVS(balul, "presentVerb"),
            externalComplement: {
              type: "complement",
              selection: {
                type: "NP",
                selection: makeNounSelection(stoonza, undefined),
              },
            },
            form: both,
          },
          {
            blocks: [
              makeSubjBlock(subj),
              makeObjBlock({
                type: "NP",
                selection: {
                  ...makeNounSelection(stoonza, undefined),
                  possesor: {
                    type: "possesor",
                    shrunken: true,
                    np: {
                      type: "NP",
                      selection: makePronounSelection(mpp),
                    },
                  },
                },
              }),
            ],
            verb: makeVS(balul, "presentVerb"),
            externalComplement: undefined,
            form: dropKing,
          },
        ]),
      ),
    },
    {
      input: "ستونزه مې بللی یې",
      output: (
        ["presentPerfect", "habitualPerfect"] as const
      ).flatMap<T.VPSelectionComplete>((tense) =>
        getPeople(1, "sing").map<T.VPSelectionComplete>((subj) => ({
          blocks: [makeSubjBlock(subj), makeObjBlock(T.Person.SecondSingMale)],
          verb: makeVS(balul, tense),
          externalComplement: {
            type: "complement",
            selection: {
              type: "NP",
              selection: makeNounSelection(stoonza, undefined),
            },
          },
          form: both,
        })),
      ),
    },
  ],
};

const basicStatComp: Section = {
  title: "Basic Stat Comp",
  tests: [
    // with seperated and not seperated verbs
    {
      input: "زه مړ کېږم",
      output: [
        {
          blocks: [makeSubjBlock(T.Person.FirstSingMale), makeObjBlock("none")],
          verb: makeVS(murKedul, "presentVerb"),
          externalComplement: undefined,
          form: full,
        },
      ],
    },
    {
      input: "زه مړېږم",
      output: getPeople(1, "sing").map((subj) => ({
        blocks: [makeSubjBlock(subj), makeObjBlock("none")],
        verb: makeVS(maredul, "presentVerb"),
        externalComplement: undefined,
        form: full,
      })),
    },
    {
      input: "زه تا مړ کوم",
      output: [
        ...getPeople(1, "sing").map((subj) => ({
          blocks: [makeSubjBlock(subj), makeObjBlock(T.Person.SecondSingMale)],
          verb: makeVS(murKawul, "presentVerb"),
          externalComplement: undefined,
          form: full,
        })),
        ...getPeople(2, "sing").map((subj) => ({
          blocks: [makeObjBlock(T.Person.FirstSingMale), makeSubjBlock(subj)],
          verb: makeVS(murKawul, "imperfectivePast"),
          externalComplement: undefined,
          form: full,
        })),
      ],
    },
    {
      input: "زه مړه کېږم",
      output: [
        {
          blocks: [
            makeSubjBlock(T.Person.FirstSingFemale),
            makeObjBlock("none"),
          ],
          verb: makeVS(murKedul, "presentVerb"),
          externalComplement: undefined,
          form: full,
        },
      ],
    },
    {
      input: "ته مړ شې",
      output: [
        {
          blocks: [
            makeSubjBlock(T.Person.SecondSingMale),
            makeObjBlock("none"),
          ],
          verb: makeVS(murKedul, "subjunctiveVerb"),
          externalComplement: undefined,
          form: full,
        },
      ],
    },
    {
      input: "ته مړه شې",
      output: [murKedul, maredul].map((verb) => ({
        blocks: [
          makeSubjBlock(T.Person.SecondSingFemale),
          makeObjBlock("none"),
        ],
        verb: makeVS(verb, "subjunctiveVerb"),
        externalComplement: undefined,
        form: full,
      })),
    },
    {
      input: "زه تا مړه کړم",
      output: [murKawul, marawul].flatMap((verb) => [
        ...getPeople(1, "sing").map((subj) => ({
          blocks: [
            makeSubjBlock(subj),
            makeObjBlock(T.Person.SecondSingFemale),
          ],
          verb: makeVS(verb, "subjunctiveVerb"),
          externalComplement: undefined,
          form: full,
        })),
        ...getPeople(2, "sing").map((subj) => ({
          blocks: [makeObjBlock(T.Person.FirstSingFemale), makeSubjBlock(subj)],
          verb: makeVS(verb, "perfectivePast"),
          externalComplement: undefined,
          form: full,
        })),
      ]),
    },
    {
      input: "زه تا مړ کړلم",
      output: getPeople(2, "sing").map((subj) => ({
        blocks: [makeObjBlock(T.Person.FirstSingMale), makeSubjBlock(subj)],
        verb: makeVS(murKawul, "perfectivePast"),
        externalComplement: undefined,
        form: full,
      })),
    },
    {
      input: "زه مړ کېدم",
      output: [
        {
          blocks: [makeSubjBlock(T.Person.FirstSingMale), makeObjBlock("none")],
          verb: makeVS(murKedul, "imperfectivePast"),
          externalComplement: undefined,
          form: full,
        },
      ],
    },
    {
      input: "زه تا مړه کولم",
      output: getPeople(2, "sing").map((subj) => ({
        blocks: [makeObjBlock(T.Person.FirstSingFemale), makeSubjBlock(subj)],
        verb: makeVS(murKawul, "imperfectivePast"),
        externalComplement: undefined,
        form: full,
      })),
    },
    {
      input: "زه تا مړولم",
      output: getPeople(2, "sing").flatMap((subj) =>
        getPeople(1, "sing").map((obj) => ({
          blocks: [makeObjBlock(obj), makeSubjBlock(subj)],
          verb: makeVS(marawul, "imperfectivePast"),
          externalComplement: undefined,
          form: full,
        })),
      ),
    },
    {
      input: "زه یې مړولم",
      output: getPeople(3, "both").flatMap((subj) =>
        getPeople(1, "sing").map((obj) => ({
          blocks: [makeSubjBlock(subj), makeObjBlock(obj)],
          verb: makeVS(marawul, "imperfectivePast"),
          externalComplement: undefined,
          form: { shrinkServant: true, removeKing: false },
        })),
      ),
    },
    {
      input: "مړولم یې",
      output: getPeople(3, "both").flatMap((subj) =>
        getPeople(1, "sing").map((obj) => ({
          blocks: [makeSubjBlock(subj), makeObjBlock(obj)],
          verb: makeVS(marawul, "imperfectivePast"),
          externalComplement: undefined,
          form: { shrinkServant: true, removeKing: true },
        })),
      ),
    },
    {
      input: "تاسو مړې کېدلئ",
      output: [
        {
          blocks: [
            makeSubjBlock(T.Person.SecondPlurFemale),
            makeObjBlock("none"),
          ],
          verb: makeVS(murKedul, "imperfectivePast"),
          externalComplement: undefined,
          form: full,
        },
      ],
    },
    {
      input: "تاسو مړېدلئ",
      output: getPeople(2, "pl").map((subj) => ({
        blocks: [makeSubjBlock(subj), makeObjBlock("none")],
        verb: makeVS(maredul, "imperfectivePast"),
        externalComplement: undefined,
        form: full,
      })),
    },
  ],
};

const perfectStatComp: Section = {
  title: "perfect statComp",
  tests: [
    {
      input: "تا زه مړ کړی یم",
      output: (
        ["presentPerfect", "habitualPerfect"] satisfies T.PerfectTense[]
      ).flatMap((tense) =>
        getPeople(2, "sing").map((subj) => ({
          blocks: [makeSubjBlock(subj), makeObjBlock(T.Person.FirstSingMale)],
          verb: makeVS(murKawul, tense),
          externalComplement: undefined,
          form: full,
        })),
      ),
    },
    {
      input: "مونږ مړې شوې ولو",
      output: [maredul, murKedul].flatMap((verb) => ({
        blocks: [makeSubjBlock(T.Person.FirstPlurFemale), makeObjBlock("none")],
        verb: makeVS(verb, "pastPerfect"),
        externalComplement: undefined,
        form: full,
      })),
    },
    {
      input: "نه به وي مړ شوی",
      output: [
        {
          blocks: [makeSubjBlock(T.Person.ThirdSingMale), makeObjBlock("none")],
          verb: {
            ...makeVS(murKedul, "futurePerfect"),
            negative: true,
          },
          externalComplement: undefined,
          form: { removeKing: true, shrinkServant: false },
        },
      ],
    },
    {
      input: "موړ کړی مې دی",
      output: getPeople(1, "sing").map((subj) => ({
        blocks: [makeSubjBlock(subj), makeObjBlock(T.Person.ThirdSingMale)],
        verb: makeVS(marawul, "presentPerfect"),
        externalComplement: undefined,
        form: { removeKing: true, shrinkServant: true },
      })),
    },
  ],
};

const abilityStatCompTrans: Section = {
  title: "Ability Stat Comp",
  tests: [
    {
      input: "زه تا مړ کولی شم",
      output: getPeople(1, "sing").map((subj) => ({
        blocks: [makeSubjBlock(subj), makeObjBlock(T.Person.SecondSingMale)],
        verb: makeVS(murKawul, "presentVerbModal"),
        externalComplement: undefined,
        form: full,
      })),
    },
    {
      input: "زه تا مړ کړای شم",
      output: getPeople(1, "sing").map((subj) => ({
        blocks: [makeSubjBlock(subj), makeObjBlock(T.Person.SecondSingMale)],
        verb: makeVS(murKawul, "subjunctiveVerbModal"),
        externalComplement: undefined,
        form: full,
      })),
    },
    ...["زه تا مړ کړای نه شم", "زه تا مړ نه شم کړای"].map((input) => ({
      input,
      output: getPeople(1, "sing").map((subj) => ({
        blocks: [makeSubjBlock(subj), makeObjBlock(T.Person.SecondSingMale)],
        verb: {
          ...makeVS(murKawul, "subjunctiveVerbModal"),
          negative: true,
        },
        externalComplement: undefined,
        form: full,
      })),
    })),
    {
      input: "زه تا مړولی شم",
      output: getPeople(1, "sing").flatMap((subj) =>
        getPeople(2, "sing").map((obj) => ({
          blocks: [makeSubjBlock(subj), makeObjBlock(obj)],
          verb: makeVS(marawul, "presentVerbModal"),
          externalComplement: undefined,
          form: full,
        })),
      ),
    },
    ...["زه تا مړولی نه شم", "زه تا نه شم مړولی"].map((input) => ({
      input,
      output: getPeople(1, "sing").flatMap((subj) =>
        getPeople(2, "sing").map((obj) => ({
          blocks: [makeSubjBlock(subj), makeObjBlock(obj)],
          verb: {
            ...makeVS(marawul, "presentVerbModal"),
            negative: true,
          },
          externalComplement: undefined,
          form: full,
        })),
      ),
    })),
    {
      input: "هغوي ښځې مړې کړای شولې",
      output: [marawul, murKawul].flatMap((verb) => [
        ...getPeople(3, "pl").flatMap((subj) => ({
          blocks: [
            makeSubjBlock(subj),
            makeObjBlock({
              type: "NP",
              selection: {
                ...makeNounSelection(xudza, undefined),
                number: "plural",
              },
            }),
          ],
          verb: makeVS(verb, "perfectivePastModal"),
          externalComplement: undefined,
          form: full,
        })),
        {
          blocks: [
            makeObjBlock(T.Person.ThirdPlurFemale),
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(xudza, undefined),
            }),
          ],
          verb: makeVS(verb, "perfectivePastModal"),
          externalComplement: undefined,
          form: full,
        },
      ]),
    },
    {
      input: "هغوي ښځې مړې کولای شولې",
      output: [murKawul].flatMap((verb) => [
        ...getPeople(3, "pl").flatMap((subj) => ({
          blocks: [
            makeSubjBlock(subj),
            makeObjBlock({
              type: "NP",
              selection: {
                ...makeNounSelection(xudza, undefined),
                number: "plural",
              },
            }),
          ],
          verb: makeVS(verb, "imperfectivePastModal"),
          externalComplement: undefined,
          form: full,
        })),
        {
          blocks: [
            makeObjBlock(T.Person.ThirdPlurFemale),
            makeSubjBlock({
              type: "NP",
              selection: makeNounSelection(xudza, undefined),
            }),
          ],
          verb: makeVS(verb, "imperfectivePastModal"),
          externalComplement: undefined,
          form: full,
        },
      ]),
    },
  ],
};

const abilityStatCompIntrans: Section = {
  title: "ability stat comp intrans",
  tests: [
    {
      input: "زه مړ کېدای شم",
      output: (
        ["presentVerbModal", "subjunctiveVerbModal"] satisfies T.AbilityTense[]
      ).map((tense) => ({
        blocks: [makeSubjBlock(T.Person.FirstSingMale), makeObjBlock("none")],
        verb: makeVS(murKedul, tense),
        externalComplement: undefined,
        form: full,
      })),
    },
    {
      input: `زه نه شم مړ کېدای`,
      output: (
        ["presentVerbModal", "subjunctiveVerbModal"] satisfies T.AbilityTense[]
      ).map<T.VPSelectionComplete>((tense) => ({
        blocks: [makeSubjBlock(T.Person.FirstSingMale), makeObjBlock("none")],
        verb: {
          ...makeVS(murKedul, tense),
          negative: true,
        },
        externalComplement: undefined,
        form: full,
      })),
    },
    {
      input: "زه نه شم مړه کېدلای",
      output: (
        ["presentVerbModal", "subjunctiveVerbModal"] satisfies T.AbilityTense[]
      ).map<T.VPSelectionComplete>((tense) => ({
        blocks: [makeSubjBlock(T.Person.FirstSingFemale), makeObjBlock("none")],
        verb: {
          ...makeVS(murKedul, tense),
          negative: true,
        },
        externalComplement: undefined,
        form: full,
      })),
    },
    {
      input: "زه مړېدای شم",
      output: getPeople(1, "sing").flatMap((subj) =>
        (
          [
            "presentVerbModal",
            "subjunctiveVerbModal",
          ] satisfies T.AbilityTense[]
        ).map((tense) => ({
          blocks: [makeSubjBlock(subj), makeObjBlock("none")],
          verb: makeVS(maredul, tense),
          externalComplement: undefined,
          form: full,
        })),
      ),
    },
    ...["زه مړېدلی نه شم", "زه نه شم مړېدلی"].map((input) => ({
      input,
      output: (
        ["presentVerbModal", "subjunctiveVerbModal"] satisfies T.AbilityTense[]
      ).flatMap((tense) =>
        getPeople(1, "sing").map((subj) => ({
          blocks: [makeSubjBlock(subj), makeObjBlock("none")],
          verb: {
            ...makeVS(maredul, tense),
            negative: true,
          },
          externalComplement: undefined,
          form: full,
        })),
      ),
    })),
  ],
};

const basicPassive: Section = {
  title: "basic passive",
  tests: [
    {
      input: "زه لیدل کېږم",
      output: getPeople(1, "sing").flatMap((subj) => [
        {
          blocks: [makeSubjBlock(subj), makeObjBlock("none")],
          verb: makeVS(kedulStat, "presentVerb"),
          externalComplement: {
            type: "complement",
            selection: {
              type: "NP",
              selection: {
                type: "participle",
                verb: leedul,
                possesor: undefined,
              },
            },
          },
          form: full,
        },
        {
          blocks: [makeSubjBlock(subj), makeObjBlock("none")],
          verb: {
            ...makeVS(leedul, "presentVerb"),
            voice: "passive",
          },
          externalComplement: undefined,
          form: full,
        },
      ]),
    },
    {
      input: "زه ولیدل شم",
      output: getPeople(1, "sing").flatMap((subj) => [
        {
          blocks: [makeSubjBlock(subj), makeObjBlock("none")],
          verb: {
            ...makeVS(leedul, "subjunctiveVerb"),
            voice: "passive",
          },
          externalComplement: undefined,
          form: full,
        },
      ]),
    },
    {
      input: "زه ولیدل شوم",
      output: getPeople(1, "sing").flatMap((subj) => [
        {
          blocks: [makeSubjBlock(subj), makeObjBlock("none")],
          verb: {
            ...makeVS(leedul, "perfectivePast"),
            voice: "passive",
          },
          externalComplement: undefined,
          form: full,
        },
      ]),
    },
    {
      input: ["ته نه لیدل کېدې"][0],
      output: getPeople(2, "sing").flatMap((subj) => [
        {
          blocks: [makeSubjBlock(subj), makeObjBlock("none")],
          verb: {
            ...makeVS(leedul, "imperfectivePast"),
            voice: "passive",
            negative: true,
          },
          externalComplement: undefined,
          form: full,
        },
      ]),
    },
  ],
};

const statCompPassiveBasic: Section = {
  title: "stat comp passive",
  tests: [
    {
      input: "زه مړول کېږم",
      output: getPeople(1, "sing").flatMap((subj) => [
        {
          blocks: [makeSubjBlock(subj), makeObjBlock("none")],
          verb: {
            ...makeVS(marawul, "presentVerb"),
            voice: "passive",
          },
          externalComplement: undefined,
          form: full,
        },
        {
          blocks: [makeSubjBlock(subj), makeObjBlock("none")],
          verb: makeVS(kedulStat, "presentVerb"),
          externalComplement: {
            type: "complement",
            selection: {
              type: "NP",
              selection: {
                type: "participle",
                verb: marawul,
                possesor: undefined,
              },
            },
          },
          form: full,
        },
      ]),
    },
    ...["کړای", "کړلای", "کړل"].map<Section["tests"][number]>((kraay) => ({
      input: `زه موړ ${kraay} شم`,
      output: [
        {
          blocks: [makeSubjBlock(T.Person.FirstSingMale), makeObjBlock("none")],
          verb: {
            ...makeVS(marawul, "subjunctiveVerb"),
            voice: "passive",
          },
          externalComplement: undefined,
          form: full,
        },
      ],
    })),
    {
      input: "زه مړ کول کېدلم",
      output: [
        {
          blocks: [makeSubjBlock(T.Person.FirstSingMale), makeObjBlock("none")],
          verb: {
            ...makeVS(murKawul, "imperfectivePast"),
            voice: "passive",
          },
          externalComplement: undefined,
          form: full,
        },
      ],
    },
    {
      input: "زه مړه کول کېدم",
      output: [
        {
          blocks: [
            makeSubjBlock(T.Person.FirstSingFemale),
            makeObjBlock("none"),
          ],
          verb: {
            ...makeVS(murKawul, "imperfectivePast"),
            voice: "passive",
          },
          externalComplement: undefined,
          form: full,
        },
      ],
    },
  ],
};

const statCompPassivePerfect: Section = {
  title: "stat comp passive perfect",
  tests: kraayVars.map<Section["tests"][number]>((krul) => ({
    input: `ښځې مړې ${krul} شوې دي`,
    output: [marawul, murKawul].map((verb) => ({
      blocks: [
        makeSubjBlock({
          type: "NP",
          selection: {
            ...makeNounSelection(xudza, undefined),
            number: "plural",
          },
        }),
        makeObjBlock("none"),
      ],
      verb: {
        ...makeVS(verb, "presentPerfect"),
        voice: "passive",
      },
      externalComplement: undefined,
      form: full,
    })),
  })),
};

// TODO: can't get this to pass
const statCompPassiveAbility: Section = {
  title: "stat comp passive ability",
  tests: [
    {
      input: "زه مړول کېدای شم",
      output: getPeople(1, "sing").flatMap((person) =>
        (
          [
            "presentVerbModal",
            "subjunctiveVerbModal",
          ] satisfies T.AbilityTense[]
        ).flatMap<T.VPSelectionComplete>((tense) => [
          {
            blocks: [
              {
                key: 1,
                block: {
                  type: "subjectSelection",
                  selection: {
                    type: "NP",
                    selection: {
                      type: "pronoun",
                      distance: "far",
                      person: person,
                    },
                  },
                },
              },
              {
                key: 2,
                block: {
                  type: "objectSelection",
                  selection: "none",
                },
              },
            ],
            verb: {
              type: "verb",
              verb: kedulStat,
              transitivity: "intransitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense,
              canChangeVoice: false,
              isCompound: false,
              voice: "active",
            },
            externalComplement: {
              type: "complement",
              selection: {
                type: "NP",
                selection: {
                  type: "participle",
                  verb: marawul,
                  possesor: undefined,
                },
              },
            },
            form: {
              shrinkServant: false,
              removeKing: false,
            },
          },
          {
            blocks: [
              {
                key: 0,
                block: {
                  type: "subjectSelection",
                  selection: {
                    type: "NP",
                    selection: {
                      type: "pronoun",
                      distance: "far",
                      person,
                    },
                  },
                },
              },
              {
                key: 1,
                block: {
                  type: "objectSelection",
                  selection: "none",
                },
              },
            ],
            externalComplement: undefined,
            verb: {
              type: "verb",
              verb: marawul,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense,
              canChangeVoice: true,
              isCompound: "stative",
              voice: "passive",
            },
            form: {
              shrinkServant: false,
              removeKing: false,
            },
          },
        ]),
      ),
    },
  ],
};

const tlulSubjunctives: Section = {
  title: "tlul subjunctives",
  tests: [
    {
      input: "زه لاړ شم",
      output: [
        {
          blocks: [makeSubjBlock(T.Person.FirstSingMale), makeObjBlock("none")],
          verb: makeVS(tlul, "subjunctiveVerb"),
          externalComplement: undefined,
          form: full,
        },
      ],
    },
    {
      input: "زه لاړه شم",
      output: [
        {
          blocks: [
            makeSubjBlock(T.Person.FirstSingFemale),
            makeObjBlock("none"),
          ],
          verb: makeVS(tlul, "subjunctiveVerb"),
          externalComplement: undefined,
          form: full,
        },
      ],
    },
    {
      input: "راشو",
      output: getPeople(1, "pl").map((person) => ({
        blocks: [makeSubjBlock(person), makeObjBlock("none")],
        verb: makeVS(raatlul, "subjunctiveVerb"),
        externalComplement: undefined,
        form: { removeKing: true, shrinkServant: false },
      })),
    },
    {
      input: "راشه",
      output: getPeople(2, "sing").map((person) => ({
        blocks: [makeSubjBlock(person), makeObjBlock("none")],
        verb: makeVS(raatlul, "perfectiveImperative"),
        externalComplement: undefined,
        form: { removeKing: true, shrinkServant: false },
      })),
    },
    {
      input: "ورشه",
      output: getPeople(2, "sing").map((person) => ({
        blocks: [makeSubjBlock(person), makeObjBlock("none")],
        verb: makeVS(wartlul, "perfectiveImperative"),
        externalComplement: undefined,
        form: { removeKing: true, shrinkServant: false },
      })),
    },
    {
      input: "درشي",
      output: getPeople(3, "both").map((person) => ({
        blocks: [makeSubjBlock(person), makeObjBlock("none")],
        verb: makeVS(dartlul, "subjunctiveVerb"),
        externalComplement: undefined,
        form: { removeKing: true, shrinkServant: false },
      })),
    },
  ],
};

const equativeFull: Section = {
  title: "equative full",
  tests: [
    {
      input: "ته ستړی یې",
      output: (["present", "habitual"] satisfies T.EquativeTense[]).map(
        (tense) => ({
          blocks: [makeSubjBlock(T.Person.SecondSingMale)],
          predicate: {
            type: "complement",
            selection: makeAdjectiveSelection(sturay),
          },
          equative: {
            tense,
            negative: false,
          },
          omitSubject: false,
        }),
      ),
    },
    {
      input: "سړی ستړی دی",
      output: [
        {
          blocks: [
            {
              key: 0,
              block: {
                type: "subjectSelection",
                selection: {
                  type: "NP",
                  selection: makeNounSelection(saray, undefined),
                },
              },
            },
          ],
          predicate: {
            type: "complement",
            selection: {
              type: "adjective",
              entry: sturay,
              sandwich: undefined,
            },
          },
          equative: {
            tense: "present",
            negative: false,
          },
          omitSubject: false,
        },
      ],
    },
    {
      input: "سړي به ستړي وي",
      output: [
        {
          blocks: [
            {
              key: 0,
              block: {
                type: "subjectSelection",
                selection: {
                  type: "NP",
                  selection: {
                    ...makeNounSelection(saray, undefined),
                    number: "plural",
                  },
                },
              },
            },
          ],
          predicate: {
            type: "complement",
            selection: {
              type: "adjective",
              entry: sturay,
              sandwich: undefined,
            },
          },
          equative: {
            tense: "future",
            negative: false,
          },
          omitSubject: false,
        },
      ],
    },
    {
      input: "سړی ستړې دی",
      output: [],
      error: true,
    },
    {
      input: "ښځه ستړې ده",
      output: [
        {
          blocks: [
            {
              key: 0,
              block: {
                type: "subjectSelection",
                selection: {
                  type: "NP",
                  selection: makeNounSelection(xudza, undefined),
                },
              },
            },
          ],
          predicate: {
            type: "complement",
            selection: {
              type: "adjective",
              entry: sturay,
              sandwich: undefined,
            },
          },
          equative: {
            tense: "present",
            negative: false,
          },
          omitSubject: false,
        },
      ],
    },
    {
      input: "ښځه ستړې دی",
      output: [],
      error: true,
    },
    {
      input: "ښځه ستړې نه ده",
      output: [
        {
          blocks: [
            {
              key: 0,
              block: {
                type: "subjectSelection",
                selection: {
                  type: "NP",
                  selection: makeNounSelection(xudza, undefined),
                },
              },
            },
          ],
          predicate: {
            type: "complement",
            selection: {
              type: "adjective",
              entry: sturay,
              sandwich: undefined,
            },
          },
          equative: {
            tense: "present",
            negative: true,
          },
          omitSubject: false,
        },
      ],
    },
    {
      input: "ښځه نه ستړې ده",
      output: [],
      error: true,
    },
  ],
};

const equativeWPossessives: Section = {
  title: "equative with possessives",
  tests: [
    {
      input: "کور مې غټ دی",
      output: getPeople(1, "sing").map((poss) => ({
        blocks: [
          makeSubjBlock({
            type: "NP",
            selection: {
              ...makeNounSelection(kor, undefined),
              possesor: {
                type: "possesor",
                shrunken: true,
                np: {
                  type: "NP",
                  selection: makePronounSelection(poss),
                },
              },
            },
          }),
        ],
        predicate: {
          type: "complement",
          selection: makeAdjectiveSelection(ghut),
        },
        equative: {
          tense: "present",
          negative: false,
        },
        omitSubject: false,
      })),
    },
    {
      input: "کتاب مې دې کور دی",
      output: getPeople(1, "sing").flatMap((possA) =>
        getPeople(2, "sing").flatMap<T.EPSelectionComplete>((possB) =>
          [
            [possA, possB],
            [possB, possA],
          ].flatMap<T.EPSelectionComplete>(([pA, pB]) => ({
            blocks: [
              makeSubjBlock({
                type: "NP",
                selection: {
                  ...makeNounSelection(kitaab, undefined),
                  possesor: {
                    type: "possesor",
                    shrunken: true,
                    np: {
                      type: "NP",
                      selection: makePronounSelection(pA),
                    },
                  },
                },
              }),
            ],
            predicate: {
              type: "complement",
              selection: {
                type: "NP",
                selection: {
                  ...makeNounSelection(kor, undefined),
                  possesor: {
                    type: "possesor",
                    shrunken: true,
                    np: {
                      type: "NP",
                      selection: makePronounSelection(pB),
                    },
                  },
                },
              },
            },
            equative: {
              tense: "present",
              negative: false,
            },
            omitSubject: false,
          })),
        ),
      ),
    },
    {
      input: "ته مې ستړی یې",
      output: [],
      error: true,
    },
    {
      input: "کور مې مې کتاب دی",
      output: [],
      error: true,
    },
  ],
};

const equativeOmitSubj: Section = {
  title: "equative omit subject",
  tests: [
    {
      input: "ستړی دی",
      output: [
        {
          blocks: [
            {
              key: 0,
              block: {
                type: "subjectSelection",
                selection: {
                  type: "NP",
                  selection: makePronounSelection(T.Person.ThirdSingMale),
                },
              },
            },
          ],
          predicate: {
            type: "complement",
            selection: {
              type: "adjective",
              entry: sturay,
              sandwich: undefined,
            },
          },
          equative: {
            tense: "present",
            negative: false,
          },
          omitSubject: true,
        },
      ],
    },
    {
      input: "دلته دي",
      output: getPeople(3, "pl").map<T.EPSelectionComplete>((person) => ({
        blocks: [
          {
            key: 0,
            block: {
              type: "subjectSelection",
              selection: {
                type: "NP",
                selection: makePronounSelection(person),
              },
            },
          },
        ],
        predicate: {
          type: "complement",
          selection: {
            type: "loc. adv.",
            entry: dalta,
          },
        },
        equative: {
          tense: "present",
          negative: false,
        },
        omitSubject: true,
      })),
    },
  ],
};

const sections = [
  intransFullForm,
  transFullForm,
  intransDropKing,
  transDropKing,
  transShrinkServant,
  transBoth,
  grammTransFull,
  grammTransShort,
  // special tlul subjunctives
  tlulSubjunctives,
  // with complements
  complIntransFull,
  complTransFull,
  complIntransDropKing,
  complTransDropKing,
  complTransShrinkServant,
  complTransBoth,
  // with stat comp verbs
  basicStatComp,
  perfectStatComp,
  abilityStatCompTrans,
  abilityStatCompIntrans,
  basicPassive,
  statCompPassiveBasic,
  statCompPassivePerfect,
  statCompPassiveAbility,
  // equative phrases
  equativeFull,
  equativeOmitSubj,
  equativeWPossessives,
];

sections.forEach((section) => {
  describe(section.title, () => {
    section.tests.forEach(({ input, output, error }) => {
      test(input, () => {
        const tokens = tokenizer(input);
        const res = parseVP(tokens, testDictionary).filter(
          (x) => !tokensExist(x.tokens),
        );
        if (error) {
          expect(res.some((x) => x.errors.length)).toBe(true);
        } else {
          expect(removeKeys(res.map((x) => x.body))).toIncludeSameMembers(
            removeKeys(output),
          );
          expect(!res.some((x) => x.errors.length)).toBe(true);
        }
      });
    });
  });
});

function makeSubjBlock(content: T.Person | T.NPSelection): {
  key: number;
  block: T.SubjectSelectionComplete;
} {
  return {
    key: 23,
    block: {
      type: "subjectSelection",
      selection:
        typeof content === "number"
          ? {
              type: "NP",
              selection: makePronounSelection(content),
            }
          : content,
    },
  };
}

function makeObjBlock(
  content: "none" | "grammTranThird" | T.Person | T.NPSelection,
): T.VPSBlockComplete {
  return {
    key: 24,
    block: {
      type: "objectSelection",
      selection:
        typeof content === "string"
          ? content === "none"
            ? content
            : T.Person.ThirdPlurMale
          : typeof content === "number"
            ? {
                type: "NP",
                selection: makePronounSelection(content),
              }
            : content,
    },
  };
}

function makeVS(
  v: T.VerbEntry,
  tense: T.VerbFormName,
): T.VerbSelectionComplete {
  const x = {
    ...makeVPSelectionState(v).verb,
    tense,
  };
  return {
    type: "verb",
    transitivity: x.transitivity,
    canChangeTransitivity: x.canChangeTransitivity,
    canChangeStatDyn: x.canChangeStatDyn,
    isCompound: x.isCompound,
    voice: x.voice,
    canChangeVoice: x.canChangeVoice,
    negative: x.negative,
    tense: x.tense,
    verb: x.verb,
  };
}
