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
  makeSubjectSelection,
  makeSubjectSelectionComplete,
} from "../phrase-building/blocks-utils";
import {
  makeNounSelection,
  makePronounSelection,
} from "../phrase-building/make-selections";
import { makeVerbSelection } from "../new-verb-engine/make-verb-selection";

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

// TODO: could to more thorough testing of short past participle forms

type Section = {
  title: string;
  tests: {
    input: string;
    output: T.VPSelectionComplete[];
    error?: boolean;
  }[];
};

const fullForm: Section = {
  title: "Full Form",
  tests: [
    {
      input: "زه ځم",
      output: getPeople(1, "sing").map<T.VPSelectionComplete>((person) => ({
        blocks: [makeSubjBlock(person), makeObjBlock("none")],
        verb: {
          type: "verb",
          tense: "presentVerb",
          verb: tlul,
          canChangeTransitivity: false,
          canChangeStatDyn: false,
          isCompound: false,
          voice: "active",
          canChangeVoice: false,
          negative: false,
          transitivity: "intransitive",
        },
        form: { shrinkServant: false, removeKing: false },
        externalComplement: undefined,
      })),
    },
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
          verb: {
            type: "verb",
            tense: "presentVerb",
            verb: wahul,
            canChangeTransitivity: false,
            canChangeStatDyn: false,
            isCompound: false,
            voice: "active",
            canChangeVoice: true,
            negative: false,
            transitivity: "transitive",
          },
          form: { shrinkServant: false, removeKing: false },
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
            type: "verb",
            tense: "presentVerb",
            verb: wahul,
            canChangeTransitivity: false,
            canChangeStatDyn: false,
            isCompound: false,
            voice: "active",
            canChangeVoice: true,
            negative: false,
            transitivity: "transitive",
          },
          form: { shrinkServant: false, removeKing: false },
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
          verb: {
            type: "verb",
            tense: "perfectivePast",
            verb: wahul,
            canChangeTransitivity: false,
            canChangeStatDyn: false,
            isCompound: false,
            voice: "active",
            canChangeVoice: true,
            negative: false,
            transitivity: "transitive",
          },
          form: { shrinkServant: false, removeKing: false },
          externalComplement: undefined,
        },
      ],
    },
  ],
};

const sections = [fullForm];

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
