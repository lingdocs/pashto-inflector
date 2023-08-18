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
import { getPeople, removeKeys } from "./utils";

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
        output: getPeople(1, "sing").map((person) => ({
          blocks: [
            {
              key: 1,
              block: makeSubjectSelectionComplete({
                type: "NP",
                selection: makePronounSelection(person),
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
        })),
      },
      {
        input: "زه به ځم",
        output: getPeople(1, "sing").map((person) => ({
          blocks: [
            {
              key: 1,
              block: makeSubjectSelectionComplete({
                type: "NP",
                selection: makePronounSelection(person),
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
            tense: "imperfectiveFuture",
            canChangeVoice: true,
            isCompound: false,
            voice: "active",
          },
          externalComplement: undefined,
          form: {
            removeKing: false,
            shrinkServant: false,
          },
        })),
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
        output: getPeople(1, "sing").map((subj) => ({
          blocks: [
            {
              key: 1,
              block: makeSubjectSelectionComplete({
                type: "NP",
                selection: makePronounSelection(subj),
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
        })),
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
      {
        input: "سړي به ماشومه ولیده",
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
              tense: "habitualPerfectivePast",
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
        input: "سړي به ماشومه لیده",
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
              tense: "habitualImperfectivePast",
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
        output: getPeople(1, "sing").map((objPerson) => ({
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
                selection: makePronounSelection(objPerson),
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
        })),
      },
    ],
  },
  {
    label: "transitive no king",
    cases: [
      {
        input: "ما وینې",
        output: getPeople(1, "sing").flatMap((objectPerson) =>
          getPeople(2, "sing").map<T.VPSelectionComplete>((subjPerson) => ({
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makePronounSelection(subjPerson),
                }),
              },
              {
                key: 2,
                block: makeObjectSelectionComplete({
                  type: "NP",
                  selection: makePronounSelection(objectPerson),
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
          }))
        ),
      },
      {
        input: "زه وینې",
        output: [],
        error: true,
      },
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
        output: getPeople(1, "sing").map((subjPerson) => ({
          blocks: [
            {
              key: 1,
              block: makeSubjectSelectionComplete({
                type: "NP",
                selection: makePronounSelection(subjPerson),
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
        })),
      },
    ],
  },
  {
    label: "transitive shrunken servant",
    cases: [
      {
        input: "زه دې وینم",
        output: getPeople(1, "sing").flatMap((subjectPerson) =>
          getPeople(2, "sing").map<T.VPSelectionComplete>((objectPerson) => ({
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makePronounSelection(subjectPerson),
                }),
              },
              {
                key: 2,
                block: makeObjectSelectionComplete({
                  type: "NP",
                  selection: makePronounSelection(objectPerson),
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
              shrinkServant: true,
            },
          }))
        ),
      },
      {
        input: "سړی مې ولید",
        output: getPeople(1, "sing").map((subjPerson) => ({
          blocks: [
            {
              key: 1,
              block: makeSubjectSelectionComplete({
                type: "NP",
                selection: makePronounSelection(subjPerson),
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
            tense: "perfectivePast",
            canChangeVoice: true,
            isCompound: false,
            voice: "active",
          },
          externalComplement: undefined,
          form: {
            removeKing: false,
            shrinkServant: true,
          },
        })),
      },
      {
        input: "سړی دې لید",
        output: [
          {
            blocks: [
              {
                key: 2,
                block: makeObjectSelectionComplete({
                  type: "NP",
                  selection: makeNounSelection(sarey, undefined),
                }),
              },
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: {
                    ...makePronounSelection(T.Person.ThirdSingFemale),
                    distance: "near",
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
              tense: "imperfectivePast",
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
          ...getPeople(2, "sing").map<T.VPSelectionComplete>((subj) => ({
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makePronounSelection(subj),
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
              tense: "imperfectivePast",
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: false,
              shrinkServant: true,
            },
          })),
        ],
      },
      {
        input: "سړی یې وویني",
        output: getPeople(3, "both").map((person) => ({
          blocks: [
            {
              key: 1,
              block: makeSubjectSelectionComplete({
                type: "NP",
                selection: makeNounSelection(sarey, undefined),
              }),
            },
            {
              key: 1,
              block: makeObjectSelectionComplete({
                type: "NP",
                selection: makePronounSelection(person),
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
            tense: "subjunctiveVerb",
            canChangeVoice: true,
            isCompound: false,
            voice: "active",
          },
          externalComplement: undefined,
          form: {
            removeKing: false,
            shrinkServant: true,
          },
        })),
      },
      {
        input: "سړی مو ویني",
        output: [...getPeople(1, "pl"), ...getPeople(2, "pl")].map(
          (person) => ({
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makeNounSelection(sarey, undefined),
                }),
              },
              {
                key: 1,
                block: makeObjectSelectionComplete({
                  type: "NP",
                  selection: makePronounSelection(person),
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
              shrinkServant: true,
            },
          })
        ),
      },
    ],
  },
  {
    label: "transitive no king shrunken servant",
    cases: [
      {
        input: "ودې لیدم",
        output: getPeople(2, "sing").flatMap((subjPerson) =>
          getPeople(1, "sing").map<T.VPSelectionComplete>((objPerson) => ({
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makePronounSelection(subjPerson),
                }),
              },
              {
                key: 2,
                block: makeObjectSelectionComplete({
                  type: "NP",
                  selection: makePronounSelection(objPerson),
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
              shrinkServant: true,
            },
          }))
        ),
      },
    ],
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
