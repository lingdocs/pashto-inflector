import * as T from "../../../types";
import { lookup, wordQuery } from "./lookup";
import { tokenizer } from "./tokenizer";
import { parseVBP } from "./parse-vbp";
import { kawulDyn, kawulStat, kedulDyn, kedulStat } from "./irreg-verbs";

const leedul = wordQuery("لیدل", "verb");
const akheestul = wordQuery("اخیستل", "verb");
const wahul = wordQuery("وهل", "verb");
const awuxtul = wordQuery("اوښتل", "verb");
const tlul = wordQuery("tlul", "verb");

const tests: {
  label: string;
  cases: {
    input: string;
    output: T.ParsedVBP[];
  }[];
}[] = [
  {
    label: "regular past participles",
    cases: [
      {
        input: "لیدلی",
        output: [
          {
            type: "VB",
            info: {
              type: "ppart",
              genNum: {
                gender: "masc",
                number: "singular",
              },
              verb: leedul,
            },
          },
        ],
      },
      {
        input: "وهلي",
        output: [
          {
            type: "VB",
            info: {
              type: "ppart",
              genNum: {
                gender: "masc",
                number: "plural",
              },
              verb: wahul,
            },
          },
        ],
      },
      {
        input: "وهلې",
        output: (["singular", "plural"] as const).map((number) => ({
          type: "VB",
          info: {
            type: "ppart",
            genNum: {
              gender: "fem",
              number,
            },
            verb: wahul,
          },
        })),
      },
    ],
  },
  {
    label: "past participles with short forms",
    cases: [
      {
        input: "اخیستی",
        output: [
          {
            type: "VB",
            info: {
              type: "ppart",
              genNum: {
                gender: "masc",
                number: "singular",
              },
              verb: akheestul,
            },
          },
        ],
      },
      {
        input: "اخیستلی",
        output: [
          {
            type: "VB",
            info: {
              type: "ppart",
              genNum: {
                gender: "masc",
                number: "singular",
              },
              verb: akheestul,
            },
          },
        ],
      },
      {
        input: "اوښتی",
        output: [
          {
            type: "VB",
            info: {
              type: "ppart",
              genNum: {
                gender: "masc",
                number: "singular",
              },
              verb: awuxtul,
            },
          },
        ],
      },
    ],
  },
  {
    label: "irregular past participles",
    cases: [
      {
        input: "تلی",
        output: [
          {
            type: "VB",
            info: {
              type: "ppart",
              genNum: {
                gender: "masc",
                number: "singular",
              },
              verb: tlul,
            },
          },
        ],
      },
      {
        input: "کړي",
        output: [kawulStat, kawulDyn].map((verb) => ({
          type: "VB",
          info: {
            type: "ppart",
            genNum: {
              gender: "masc",
              number: "plural",
            },
            verb,
          },
        })),
      },
      {
        input: "شوي",
        output: [kedulStat, kedulDyn].map((verb) => ({
          type: "VB",
          info: {
            type: "ppart",
            genNum: {
              gender: "masc",
              number: "plural",
            },
            verb,
          },
        })),
      },
    ],
  },
];

describe("parsing past participles", () => {
  tests.forEach(({ label, cases }) => {
    // eslint-disable-next-line jest/valid-title
    test(label, () => {
      cases.forEach(({ input, output }) => {
        const tokens = tokenizer(input);
        const res = parseVBP(tokens, lookup).map(({ body }) => body);
        expect(res).toEqual(output);
      });
    });
  });
});
