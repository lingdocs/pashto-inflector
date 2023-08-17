/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/valid-title */
import * as T from "../../../types";
import {
  makeObjectSelectionComplete,
  makeSubjectSelection,
  makeSubjectSelectionComplete,
} from "../phrase-building/blocks-utils";
import {
  makeNounSelection,
  makePronounSelection,
} from "../phrase-building/make-selections";
import { lookup, verbLookup, wordQuery } from "./lookup";
import { parseVP } from "./parse-vp";
import { tokenizer } from "./tokenizer";
import { tlul } from "./irreg-verbs";
import { removeKeys } from "./utils";

const sarey = wordQuery("سړی", "noun");
const rasedul = wordQuery("رسېدل", "verb");
const maashoom = wordQuery("ماشوم", "noun");
const leedul = wordQuery("لیدل", "verb");

const tests: {
  label: string;
  cases: {
    input: string;
    output: T.VPSelectionComplete[];
    error?: boolean;
  }[];
}[] = [
  {
    label: "nothing / failures",
    cases: [
      {
        input: "",
        output: [],
      },
      {
        input: "زه سړی رسېږم",
        output: [],
      },
      {
        input: "زه سړی ماشوم ولید",
        output: [],
      },
      {
        input: "ما ځم",
        output: [],
        error: true,
      },
      {
        input: "سړی زه ویني",
        output: [],
        error: true,
      },
      {
        input: "سړي ما ولیدلم",
        output: [],
        error: true,
      },
      {
        input: "زه ماشومانو وینم",
        output: [],
        error: true,
      },
    ],
  },
  {
    label: "intransitive full kernels",
    cases: [
      {
        input: "زه ځم",
        output: [
          {
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makePronounSelection(T.Person.FirstSingMale),
                }),
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
              verb: tlul,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense: "presentVerb",
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: false,
              shrinkServant: false,
            },
          },
          {
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",

                  selection: makePronounSelection(T.Person.FirstSingFemale),
                }),
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
              verb: tlul,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense: "presentVerb",
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: false,
              shrinkServant: false,
            },
          },
        ],
      },
      {
        input: "سړی رسېږي",
        output: [
          {
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makeNounSelection(sarey, undefined),
                }),
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
              verb: rasedul,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense: "presentVerb",
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: false,
              shrinkServant: false,
            },
          },
        ],
      },
      {
        input: "سړی به ورسېږي",
        output: [
          {
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makeNounSelection(sarey, undefined),
                }),
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
              verb: rasedul,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense: "perfectiveFuture",
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: false,
              shrinkServant: false,
            },
          },
        ],
      },
    ],
  },
  {
    label: "intransitive no king",
    cases: [
      {
        input: "ځم",
        output: [
          {
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makePronounSelection(T.Person.FirstSingMale),
                }),
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
              verb: tlul,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense: "presentVerb",
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: true,
              shrinkServant: false,
            },
          },
          {
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",

                  selection: makePronounSelection(T.Person.FirstSingFemale),
                }),
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
              verb: tlul,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense: "presentVerb",
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: true,
              shrinkServant: false,
            },
          },
        ],
      },
    ],
  },
  {
    label: "past tense transitive full kernels",
    cases: [
      {
        input: "سړي ماشومه ولیده",
        output: [
          {
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makeNounSelection(sarey, undefined),
                }),
              },
              {
                key: 2,
                block: makeObjectSelectionComplete({
                  type: "NP",
                  selection: {
                    ...makeNounSelection(maashoom, undefined),
                    gender: "fem",
                  },
                }),
              },
            ],
            verb: {
              type: "verb",
              verb: leedul,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense: "perfectivePast",
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: false,
              shrinkServant: false,
            },
          },
        ],
      },
    ],
  },
  {
    label: "transitive full kernels",
    cases: [
      {
        input: "سړی ماشومه ویني",
        output: [
          {
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makeNounSelection(sarey, undefined),
                }),
              },
              {
                key: 2,
                block: makeObjectSelectionComplete({
                  type: "NP",
                  selection: {
                    ...makeNounSelection(maashoom, undefined),
                    gender: "fem",
                  },
                }),
              },
            ],
            verb: {
              type: "verb",
              verb: leedul,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense: "presentVerb",
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: false,
              shrinkServant: false,
            },
          },
          {
            blocks: [
              {
                key: 1,
                block: makeObjectSelectionComplete({
                  type: "NP",
                  selection: makeNounSelection(sarey, undefined),
                }),
              },
              {
                key: 2,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: {
                    ...makeNounSelection(maashoom, undefined),
                    gender: "fem",
                  },
                }),
              },
            ],
            verb: {
              type: "verb",
              verb: leedul,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense: "presentVerb",
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: false,
              shrinkServant: false,
            },
          },
        ],
      },
      {
        input: "سړی ما ویني",
        output: [
          {
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makeNounSelection(sarey, undefined),
                }),
              },
              {
                key: 2,
                block: makeObjectSelectionComplete({
                  type: "NP",
                  selection: makePronounSelection(T.Person.FirstSingMale),
                }),
              },
            ],
            verb: {
              type: "verb",
              verb: leedul,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense: "presentVerb",
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: false,
              shrinkServant: false,
            },
          },
          {
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makeNounSelection(sarey, undefined),
                }),
              },
              {
                key: 2,
                block: makeObjectSelectionComplete({
                  type: "NP",
                  selection: makePronounSelection(T.Person.FirstSingFemale),
                }),
              },
            ],
            verb: {
              type: "verb",
              verb: leedul,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense: "presentVerb",
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: false,
              shrinkServant: false,
            },
          },
        ],
      },
    ],
  },
  {
    label: "transitive no king",
    cases: [
      {
        input: "سړي ولیدله",
        output: [
          {
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makeNounSelection(sarey, undefined),
                }),
              },
              {
                key: 2,
                block: makeObjectSelectionComplete({
                  type: "NP",
                  selection: makePronounSelection(T.Person.ThirdSingFemale),
                }),
              },
            ],
            verb: {
              type: "verb",
              verb: leedul,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense: "perfectivePast",
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: true,
              shrinkServant: false,
            },
          },
        ],
      },
      {
        input: "سړی وینم",
        output: [
          {
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makePronounSelection(T.Person.FirstSingMale),
                }),
              },
              {
                key: 2,
                block: makeObjectSelectionComplete({
                  type: "NP",
                  selection: makeNounSelection(sarey, undefined),
                }),
              },
            ],
            verb: {
              type: "verb",
              verb: leedul,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense: "presentVerb",
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: true,
              shrinkServant: false,
            },
          },
          {
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makePronounSelection(T.Person.FirstSingFemale),
                }),
              },
              {
                key: 2,
                block: makeObjectSelectionComplete({
                  type: "NP",
                  selection: makeNounSelection(sarey, undefined),
                }),
              },
            ],
            verb: {
              type: "verb",
              verb: leedul,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense: "presentVerb",
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: true,
              shrinkServant: false,
            },
          },
        ],
      },
    ],
  },
  {
    label: "transitive shrunken servant",
    cases: [],
  },
];

tests.forEach(({ label, cases }) => {
  test(label, () => {
    cases.forEach(({ input, output, error }) => {
      const tokens = tokenizer(input);
      const parsed = parseVP(tokens, lookup, verbLookup);
      if (error) {
        expect(parsed.filter((x) => x.errors.length).length).toBeTruthy();
      } else {
        expect(parsed.map((p) => removeKeys(p.body))).toIncludeSameMembers(
          removeKeys(output)
        );
      }
    });
  });
});
