import {
  makeNounSelection,
  makeParticipleSelection,
  makePossesorSelection,
} from "../phrase-building/make-selections";
import * as T from "../../../types";
import { lookup, wordQuery } from "./lookup";
import { tokenizer } from "./tokenizer";
import { parseParticiple } from "./parse-participle";

const leedul = wordQuery("لیدل", "verb");
const akheestul = wordQuery("اخیستل", "verb");
const wahul = wordQuery("وهل", "verb");
const saray = wordQuery("سړی", "noun");

const tests: {
  label: string;
  cases: {
    input: string;
    output: {
      inflected: boolean;
      selection: T.ParticipleSelection;
    }[];
  }[];
}[] = [
  {
    label: "uninflected participles",
    cases: [
      {
        input: "وهل",
        output: [
          {
            inflected: false,
            selection: makeParticipleSelection(wahul),
          },
        ],
      },
      {
        input: "لیدل",
        output: [
          {
            inflected: false,
            selection: makeParticipleSelection(leedul),
          },
        ],
      },
    ],
  },
  {
    label: "inflected participles",
    cases: [
      {
        input: "وهلو",
        output: [
          {
            inflected: true,
            selection: makeParticipleSelection(wahul),
          },
        ],
      },
      {
        input: "اخیستلو",
        output: [
          {
            inflected: true,
            selection: makeParticipleSelection(akheestul),
          },
        ],
      },
    ],
  },
  {
    label: "short forms of inflected participles",
    cases: [
      {
        input: "لیدو",
        output: [
          {
            inflected: true,
            selection: makeParticipleSelection(leedul),
          },
        ],
      },
      {
        input: "اخیستو",
        output: [
          {
            inflected: true,
            selection: makeParticipleSelection(akheestul),
          },
        ],
      },
      {
        input: "وهو",
        output: [],
      },
    ],
  },
  {
    label: "with subj/obj",
    cases: [
      {
        input: "د سړي لیدل",
        output: [
          {
            inflected: false,
            selection: {
              ...makeParticipleSelection(leedul),
              possesor: makePossesorSelection(
                makeNounSelection(saray, undefined)
              ),
            },
          },
        ],
      },
    ],
  },
];

describe("parsing participles", () => {
  tests.forEach(({ label, cases }) => {
    // eslint-disable-next-line jest/valid-title
    test(label, () => {
      cases.forEach(({ input, output }) => {
        const tokens = tokenizer(input);
        const res = parseParticiple(tokens, lookup).map(({ body }) => body);
        expect(res).toEqual(output);
      });
    });
  });
});
