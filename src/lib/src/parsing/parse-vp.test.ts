/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/valid-title */
import * as T from "../../../types";
import {
  makeObjectSelectionComplete,
  makeSubjectSelectionComplete,
} from "../phrase-building/blocks-utils";
import {
  makeNounSelection,
  makePronounSelection,
} from "../phrase-building/make-selections";
import { lookup, wordQuery } from "./lookup";
import { parseVP } from "./parse-vp";
import { tokenizer } from "./tokenizer";
import { tlul } from "./irreg-verbs";
import { getPeople, removeKeys } from "./utils";

const sarey = wordQuery("سړی", "noun");
const rasedul = wordQuery("رسېدل", "verb");
const maashoom = wordQuery("ماشوم", "noun");
const leedul = wordQuery("لیدل", "verb");
const kenaastul = wordQuery("کېناستل", "verb");
const wurul = wordQuery("وړل", "verb");
const akheestul = wordQuery("اخیستل", "verb");
const khandul = wordQuery("خندل", "verb");

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
        input: "تلم مې",
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
      {
        input: "زه سړی کور",
        output: [],
      },
      {
        input: "زه دې مې وینم",
        output: [],
        error: true,
      },
      {
        input: "وامې دې خیست",
        output: [],
        error: true,
      },
      {
        input: "ما وانه اخیست",
        output: [],
      },
      {
        input: "ما سړی نه دي لیدلی",
        output: [],
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
            transitivity: "intransitive",
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
            transitivity: "intransitive",
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
              transitivity: "intransitive",
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
              transitivity: "intransitive",
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
            transitivity: "intransitive",
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
      {
        input: "کې به ناست",
        output: [
          {
            blocks: [
              {
                key: 1,
                block: makeSubjectSelectionComplete({
                  type: "NP",
                  selection: makePronounSelection(T.Person.ThirdSingMale),
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
              verb: kenaastul,
              transitivity: "intransitive",
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
      {
        input: "سړي مې واهه",
        output: [],
        error: true,
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
      {
        input: "ودې وینم",
        output: getPeople(2, "sing").flatMap((objectPerson) =>
          getPeople(1, "sing").map<T.VPSelectionComplete>((subjectPerson) => ({
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
              tense: "subjunctiveVerb",
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
      {
        input: "وینم به دې",
        output: getPeople(2, "sing").flatMap((objectPerson) =>
          getPeople(1, "sing").map<T.VPSelectionComplete>((subjectPerson) => ({
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
              tense: "imperfectiveFuture",
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
      {
        input: "یو به مې ړلې",
        output: [...getPeople(2, "sing"), T.Person.ThirdPlurFemale].flatMap(
          (objectPerson) =>
            getPeople(1, "sing").map<T.VPSelectionComplete>(
              (subjectPerson) => ({
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
                  verb: wurul,
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
                  removeKing: true,
                  shrinkServant: true,
                },
              })
            )
        ),
      },
    ],
  },
  {
    label: "negatives and ordering",
    cases: [
      {
        input: "سړی تا نه ویني",
        output: [...getPeople(2, "sing")].flatMap((objectPerson) => ({
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
            negative: true,
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
        input: "سړی نه تا ویني",
        output: [],
      },
      {
        input: "سړی تا ونه ویني",
        output: [...getPeople(2, "sing")].flatMap((objectPerson) => ({
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
            negative: true,
            tense: "subjunctiveVerb",
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
      // with regular و or وا perfective heads, the negative needs to be behind the perfective head
      {
        input: "سړی تا نه وویني",
        output: [],
      },
      {
        input: "سړي وانه خیستله",
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
              verb: akheestul,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: true,
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
        input: "سړي نه واخیستله",
        output: [],
      },
      // but for other perfective heads, the negative can go before or after
      {
        input: "زه نه کېنم",
        output: getPeople(1, "sing").flatMap((subjectPerson) =>
          (
            ["presentVerb", "subjunctiveVerb"] as const
          ).map<T.VPSelectionComplete>((tense) => ({
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
                block: {
                  type: "objectSelection",
                  selection: "none",
                },
              },
            ],
            verb: {
              type: "verb",
              verb: kenaastul,
              transitivity: "intransitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: true,
              tense,
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: false,
              shrinkServant: false,
            },
          }))
        ),
      },
      {
        input: "زه کېنه نم",
        output: getPeople(1, "sing").map<T.VPSelectionComplete>(
          (subjectPerson) => ({
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
                block: {
                  type: "objectSelection",
                  selection: "none",
                },
              },
            ],
            verb: {
              type: "verb",
              verb: kenaastul,
              transitivity: "intransitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: true,
              tense: "subjunctiveVerb",
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            },
            externalComplement: undefined,
            form: {
              removeKing: false,
              shrinkServant: false,
            },
          })
        ),
      },
    ],
  },
  {
    label: "should check for subject / object conflicts",
    cases: [
      {
        input: "زه ما وینم",
        output: [],
        error: true,
      },
      {
        input: "ما زه ولیدلم",
        output: [],
        error: true,
      },
      {
        input: "تاسو تا ولیدئ",
        output: [],
        error: true,
      },
      {
        input: "زه مې وینم",
        output: [],
        error: true,
      },
      {
        input: "زه مې ولیدم",
        output: [],
        error: true,
      },
      {
        input: "ومې لیدم",
        output: [],
        error: true,
      },
      {
        input: "وینم مې",
        output: [],
        error: true,
      },
    ],
  },
  {
    label: "grammatically transitive",
    cases: [
      {
        input: "زه خاندم",
        output: getPeople(1, "sing").map<T.VPSelectionComplete>((person) => ({
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
                selection: T.Person.ThirdPlurMale,
              },
            },
          ],
          verb: {
            type: "verb",
            verb: khandul,
            transitivity: "grammatically transitive",
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
        input: "خاندم",
        output: getPeople(1, "sing").map<T.VPSelectionComplete>((person) => ({
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
                selection: T.Person.ThirdPlurMale,
              },
            },
          ],
          verb: {
            type: "verb",
            verb: khandul,
            transitivity: "grammatically transitive",
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
      {
        input: "ما خندل",
        output: getPeople(1, "sing").map<T.VPSelectionComplete>((person) => ({
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
                selection: T.Person.ThirdPlurMale,
              },
            },
          ],
          verb: {
            type: "verb",
            verb: khandul,
            transitivity: "grammatically transitive",
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
        })),
      },
      {
        input: "خندل مې",
        output: getPeople(1, "sing").map<T.VPSelectionComplete>((person) => ({
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
                selection: T.Person.ThirdPlurMale,
              },
            },
          ],
          verb: {
            type: "verb",
            verb: khandul,
            transitivity: "grammatically transitive",
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
      },
      {
        input: "خندل",
        output: [],
      },
      {
        input: "خاندم مې",
        output: [],
        error: true,
      },
      {
        input: "زه وینم",
        output: getPeople(1, "sing").map<T.VPSelectionComplete>((person) => ({
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
                selection: T.Person.ThirdPlurMale,
              },
            },
          ],
          verb: {
            type: "verb",
            verb: leedul,
            transitivity: "grammatically transitive",
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
        input: "ما ولیدل",
        output: getPeople(1, "sing").flatMap<T.VPSelectionComplete>((person) =>
          (
            ["transitive", "grammatically transitive"] as const
          ).map<T.VPSelectionComplete>((transitivity) => ({
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
                block:
                  transitivity === "grammatically transitive"
                    ? {
                        type: "objectSelection",
                        selection: T.Person.ThirdPlurMale,
                      }
                    : makeObjectSelectionComplete({
                        type: "NP",
                        selection: makePronounSelection(T.Person.ThirdPlurMale),
                      }),
              },
            ],
            verb: {
              type: "verb",
              verb: leedul,
              transitivity,
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
              removeKing: transitivity === "transitive",
              shrinkServant: false,
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
      const parsed = parseVP(tokens, lookup);
      if (error) {
        expect(parsed.filter((x) => x.errors.length).length).toBeTruthy();
      } else {
        expect(parsed.map((p) => removeKeys(p.body))).toIncludeSameMembers(
          removeKeys(output)
        );
        expect(parsed.every((p) => p.errors.length === 0)).toBe(true);
      }
    });
  });
});
