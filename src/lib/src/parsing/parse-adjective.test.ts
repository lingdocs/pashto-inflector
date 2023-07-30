import { makeAdjectiveSelection } from "../phrase-building/make-selections";
import * as T from "../../../types";
import { lookup } from "./lookup";
import { parseAdjective } from "./parse-adjective";
import { tokenizer } from "./tokenizer";

const ghut = {
  ts: 1527812625,
  i: 9561,
  p: "غټ",
  f: "ghuT, ghaT",
  g: "ghuT,ghaT",
  e: "big, fat",
  r: 4,
  c: "adj.",
} as T.AdjectiveEntry;
const sturey = {
  ts: 1527815306,
  i: 7933,
  p: "ستړی",
  f: "stúRay",
  g: "stuRay",
  e: "tired",
  r: 4,
  c: "adj. / adv.",
} as T.AdjectiveEntry;
const narey = {
  ts: 1527819320,
  i: 14027,
  p: "نری",
  f: "naráy",
  g: "naray",
  e: "thin; mild; high (pitch)",
  r: 4,
  c: "adj.",
} as T.AdjectiveEntry;
const zor = {
  ts: 1527815451,
  i: 7570,
  p: "زوړ",
  f: "zoR",
  g: "zoR",
  e: "old",
  r: 4,
  c: "adj.",
  infap: "زاړه",
  infaf: "zaaRu",
  infbp: "زړ",
  infbf: "zaR",
} as T.AdjectiveEntry;
const sheen = {
  ts: 1527815265,
  i: 8979,
  p: "شین",
  f: "sheen",
  g: "sheen",
  e: "green, blue; unripe, immature; bright, sunny",
  r: 4,
  c: "adj.",
  infap: "شنه",
  infaf: "shnu",
  infbp: "شن",
  infbf: "shn",
} as T.AdjectiveEntry;

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
            selection: makeAdjectiveSelection(narey),
            inflection: [0],
            gender: ["masc"],
          },
        ],
      },
      {
        input: "نري",
        output: [
          {
            selection: makeAdjectiveSelection(narey),
            inflection: [1],
            gender: ["masc"],
          },
        ],
      },
      {
        input: "نرۍ",
        output: [
          {
            selection: makeAdjectiveSelection(narey),
            inflection: [0, 1],
            gender: ["fem"],
          },
        ],
      },
      {
        input: "نرو",
        output: [
          {
            selection: makeAdjectiveSelection(narey),
            inflection: [2],
            gender: ["masc", "fem"],
          },
        ],
      },
      {
        input: "نریو",
        output: [
          {
            selection: makeAdjectiveSelection(narey),
            inflection: [2],
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
    // eslint-disable-next-line jest/valid-title
    test(category, () => {
      cases.forEach(({ input, output }) => {
        const tokens = tokenizer(input);
        const possibilities = parseAdjective(tokens, lookup).map((x) => x[1]);
        expect(possibilities).toEqual(output);
      });
    });
  });
});
