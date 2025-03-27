import { makeAdjectiveSelection } from "../../phrase-building/make-selections";
import * as T from "../../../../types";
import { parseAdjective } from "./parse-adjective-new";
import { tokenizer } from "./../tokenizer";
import { testDictionary } from "./../mini-test-dictionary";

const khufa = testDictionary.adjLookup("خفه")[0];
const ghut = testDictionary.adjLookup("غټ")[0];
const sturey = testDictionary.adjLookup("ستړی")[0];
const naray = testDictionary.adjLookup("نری")[0];
const zor = testDictionary.adjLookup("زوړ")[0];
const sheen = testDictionary.adjLookup("شین")[0];

const tests: {
  category: string;
  cases: {
    input: string;
    output: {
      inflection: (0 | 1 | 2)[];
      gender: T.Gender[];
      selection: T.AdjectiveSelection;
    }[];
  }[];
}[] = [
  {
    category: "pattern 1",
    cases: [
      {
        input: "غټ",
        output: [
          {
            selection: makeAdjectiveSelection(ghut),
            inflection: [0, 1],
            gender: ["masc"],
          },
        ],
      },
      {
        input: "غټه",
        output: [
          {
            selection: makeAdjectiveSelection(ghut),
            inflection: [0],
            gender: ["fem"],
          },
        ],
      },
      {
        input: "غټې",
        output: [
          {
            selection: makeAdjectiveSelection(ghut),
            inflection: [1],
            gender: ["fem"],
          },
        ],
      },
      {
        input: "غټو",
        output: [
          {
            selection: makeAdjectiveSelection(ghut),
            inflection: [2],
            gender: ["masc", "fem"],
          },
        ],
      },
    ],
  },
  {
    category: "pattern 2",
    cases: [
      {
        input: "ستړی",
        output: [
          {
            selection: makeAdjectiveSelection(sturey),
            inflection: [0],
            gender: ["masc"],
          },
        ],
      },
      {
        input: "ستړې",
        output: [
          {
            selection: makeAdjectiveSelection(sturey),
            inflection: [0, 1],
            gender: ["fem"],
          },
        ],
      },
      {
        input: "ستړو",
        output: [
          {
            selection: makeAdjectiveSelection(sturey),
            inflection: [2],
            gender: ["masc", "fem"],
          },
        ],
      },
    ],
  },
  {
    category: "pattern 3",
    cases: [
      {
        input: "نری",
        output: [
          {
            selection: makeAdjectiveSelection(naray),
            inflection: [0],
            gender: ["masc"],
          },
        ],
      },
      {
        input: "نري",
        output: [
          {
            selection: makeAdjectiveSelection(naray),
            inflection: [1],
            gender: ["masc"],
          },
        ],
      },
      {
        input: "نرۍ",
        output: [
          {
            selection: makeAdjectiveSelection(naray),
            inflection: [0, 1],
            gender: ["fem"],
          },
        ],
      },
      {
        input: "نرو",
        output: [
          {
            selection: makeAdjectiveSelection(naray),
            inflection: [2],
            gender: ["masc", "fem"],
          },
        ],
      },
      {
        input: "نریو",
        output: [
          {
            selection: makeAdjectiveSelection(naray),
            inflection: [2],
            gender: ["masc", "fem"],
          },
        ],
      },
    ],
  },
  {
    category: "non-inflecting",
    cases: [
      {
        input: "خفه",
        output: [
          {
            selection: makeAdjectiveSelection(khufa),
            inflection: [0, 1, 2],
            gender: ["masc", "fem"],
          },
        ],
      },
    ],
  },
  {
    category: "pattern 4",
    cases: [
      {
        input: "زوړ",
        output: [
          {
            selection: makeAdjectiveSelection(zor),
            inflection: [0],
            gender: ["masc"],
          },
        ],
      },
      {
        input: "زاړه",
        output: [
          {
            selection: makeAdjectiveSelection(zor),
            inflection: [1],
            gender: ["masc"],
          },
        ],
      },
      {
        input: "زړه",
        output: [
          {
            selection: makeAdjectiveSelection(zor),
            inflection: [0],
            gender: ["fem"],
          },
        ],
      },
      {
        input: "زړې",
        output: [
          {
            selection: makeAdjectiveSelection(zor),
            inflection: [1],
            gender: ["fem"],
          },
        ],
      },
      {
        input: "زړو",
        output: [
          {
            selection: makeAdjectiveSelection(zor),
            inflection: [2],
            gender: ["masc", "fem"],
          },
        ],
      },
    ],
  },
  {
    category: "pattern 5",
    cases: [
      {
        input: "شین",
        output: [
          {
            selection: makeAdjectiveSelection(sheen),
            inflection: [0],
            gender: ["masc"],
          },
        ],
      },
      {
        input: "شنه",
        output: [
          {
            selection: makeAdjectiveSelection(sheen),
            inflection: [1],
            gender: ["masc"],
          },
          {
            selection: makeAdjectiveSelection(sheen),
            inflection: [0],
            gender: ["fem"],
          },
        ],
      },
      {
        input: "شنو",
        output: [
          {
            selection: makeAdjectiveSelection(sheen),
            inflection: [2],
            gender: ["masc", "fem"],
          },
        ],
      },
    ],
  },
];

describe("parsing adjectives", () => {
  tests.forEach(({ category, cases }) => {
    test(category, () => {
      cases.forEach(({ input, output }) => {
        const tokens = tokenizer(input);
        const possibilities = parseAdjective(tokens, testDictionary).map(
          (x) => x.body
        );
        expect(possibilities).toEqual(
          output.map((o) => ({
            ...o,
            given: input,
          }))
        );
      });
    });
  });
});
