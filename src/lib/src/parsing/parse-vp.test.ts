import * as T from "../../../types";
import { testDictionary } from "./mini-test-dictionary";
import { tokenizer } from "./tokenizer";
import { getPeople, removeKeys } from "./utils";
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
  makeAdverbSelection,
  makeNounSelection,
  makePronounSelection,
} from "../phrase-building/make-selections";
import { makeVPSelectionState } from "../phrase-building/verb-selection";

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
const paroon = testDictionary.otherLookup("p", "پرون")[0] as T.AdverbEntry;
const dalta = testDictionary.otherLookup("p", "دلته")[0] as T.AdverbEntry;

// TODO: could to more thorough testing of short past participle forms

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
    output: T.VPSelectionComplete[];
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
  title: "Transitive Full Form",
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
        }))
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
        }))
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
    // // imperative
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
          }))
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
        }))
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
          }))
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
          }))
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
        }))
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
        }))
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
        }))
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
        }))
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
        }))
      ),
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
  // TODO: gramm trans full / drop king
];

sections.forEach((section) => {
  describe(section.title, () => {
    section.tests.forEach(({ input, output }) => {
      test(input, () => {
        const tokens = tokenizer(input);
        const res = parseVP(tokens, testDictionary)
          .filter((x) => !x.tokens.length)
          .map(({ body }) => body);
        expect(removeKeys(res)).toIncludeSameMembers(removeKeys(output));
      });
    });
  });
});

function makeSubjBlock(content: T.Person | T.NPSelection): T.VPSBlockComplete {
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
  content: "none" | T.Person | T.NPSelection
): T.VPSBlockComplete {
  return {
    key: 24,
    block: {
      type: "objectSelection",
      selection:
        typeof content === "string"
          ? content
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
  tense: T.VerbFormName
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
