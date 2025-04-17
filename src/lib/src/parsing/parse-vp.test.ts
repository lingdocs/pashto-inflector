import * as T from "../../../types";
import { testDictionary } from "./mini-test-dictionary";
import { tokenizer } from "./tokenizer";
import { getPeople, removeKeys } from "./utils";
import { parseVP } from "./parse-vp";
import {
  kedulDyn,
  kedulStat,
  raatlul,
  wartlul,
} from "./verb-section/irreg-verbs";
import {
  makeAPBlock,
  makeSubjectSelection,
  makeSubjectSelectionComplete,
} from "../phrase-building/blocks-utils";
import {
  makeNounSelection,
  makePronounSelection,
} from "../phrase-building/make-selections";
import { makeVerbSelection } from "../new-verb-engine/make-verb-selection";
import { getTenseFromVerbSelection } from "../phrase-building/vp-tools";
import { makeVerbSelectOption } from "../../../components/dist/components/src/block-pickers/picker-tools";
import { makeVPSelectionState } from "../phrase-building/verb-selection";

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
const saray = testDictionary.nounLookup("سړی")[0];
const xudza = testDictionary.nounLookup("ښځه")[0];
const kor = testDictionary.nounLookup("کور")[0];
const paroon = testDictionary.otherLookup("p", "پرون")[0] as T.AdverbEntry;

// TODO: could to more thorough testing of short past participle forms

const [full, shrinkServant, dropKing, both]: T.FormVersion = [
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

const sections = [intransFullForm, transFullForm];

// TODO imperative and negatives
// Perfect forms!
// better guard for verb section compatability

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
