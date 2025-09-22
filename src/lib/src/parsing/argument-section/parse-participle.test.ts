import {
  makeNounSelection,
  makeParticipleSelection,
  makePossesorSelection,
} from "../../phrase-building/make-selections";
import * as T from "../../../../types";
import { testDictionary } from "./../mini-test-dictionary";
import { tokenizer } from "./../tokenizer";
import { parseNPAP } from "./parse-npap";

const leedul = testDictionary.verbEntryLookup("لیدل")[0];
const akheestul = testDictionary.verbEntryLookup("اخیستل")[0];
const wahul = testDictionary.verbEntryLookup("وهل")[0];
const saray = testDictionary.nounLookup("سړی")[0];
const murKedul = testDictionary.verbEntryLookup("مړ کېدل")[0];
const maredul = testDictionary.verbEntryLookup("مړېدل")[0];
const murKawul = testDictionary.verbEntryLookup("مړ کول")[0];

const tests: {
  label: string;
  cases: {
    input: string;
    output: {
      inflected: boolean;
      selection: T.ParticipleSelection;
    }[];
    error?: boolean;
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
      {
        input: "اخیستو",
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
                makeNounSelection(saray, undefined),
              ),
            },
          },
        ],
      },
      {
        input: "د سړي لیدو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeParticipleSelection(leedul),
              possesor: makePossesorSelection(
                makeNounSelection(saray, undefined),
              ),
            },
          },
        ],
      },
    ],
  },
  {
    label: "with stative compounds",
    cases: [
      {
        input: "مړېدل",
        output: [
          {
            inflected: false,
            selection: makeParticipleSelection(maredul),
          },
        ],
      },
      {
        input: "مړه کېدل",
        output: [
          {
            inflected: false,
            selection: makeParticipleSelection(murKedul),
          },
        ],
      },
      {
        input: "مړه کول",
        output: [
          {
            inflected: false,
            selection: makeParticipleSelection(murKawul),
          },
        ],
      },
      {
        input: "مړه کولو",
        output: [
          {
            inflected: true,
            selection: makeParticipleSelection(murKawul),
          },
        ],
      },
      {
        input: "د سړي مړه کولو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeParticipleSelection(murKawul),
              possesor: makePossesorSelection(
                makeNounSelection(saray, undefined),
              ),
            },
          },
        ],
      },
      ...["مړه کېدلو", "مړه کېدو"].map((input) => ({
        input,
        output: [
          {
            inflected: true,
            selection: makeParticipleSelection(murKedul),
          },
        ],
      })),
      // complement must be masc plur
      {
        input: "مړ کېدل",
        output: [],
        error: true,
      },
      {
        input: "مړې کېدل",
        output: [],
        error: true,
      },
    ],
  },
];

describe("parsing participles", () => {
  tests.forEach(({ label, cases }) => {
    test(label, () => {
      cases.forEach(({ input, output, error }) => {
        const tokens = tokenizer(input);
        const res = parseNPAP(tokens, testDictionary);
        const bodies = res.map(({ body }) => body);
        if (error === true) {
          expect(res.some((x) => x.errors.length));
          return;
        }
        expect(bodies).toEqual(
          output.map(
            (x): T.ParsedNP => ({
              type: "NP",
              inflected: x.inflected,
              selection: {
                type: "NP",
                selection: x.selection,
              },
            }),
          ),
        );
      });
    });
  });
});
