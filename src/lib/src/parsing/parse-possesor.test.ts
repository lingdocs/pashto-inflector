/* eslint-disable jest/no-conditional-expect */
import * as T from "../../../types";
import {
  makeAdjectiveSelection,
  makeNounSelection,
  makePronounSelection,
} from "../phrase-building/make-selections";
import { lookup, wordQuery } from "./lookup";
import { parsePossesor } from "./parse-possesor";
import { tokenizer } from "./tokenizer";
import { isCompleteResult } from "./utils";

const sturey = wordQuery("ستړی", "adj");
const sarey = wordQuery("سړی", "noun");
const maashoom = wordQuery("ماشوم", "noun");
const malguray = wordQuery("ملګری", "noun");
const plaar = wordQuery("پلار", "noun");

const tests: {
  input: string;
  output: T.NPSelection["selection"][] | "error";
}[] = [
  {
    input: "د سړي",
    output: [makeNounSelection(sarey, undefined)],
  },
  {
    input: "د ماشومې",
    output: [
      {
        ...makeNounSelection(maashoom, undefined),
        gender: "fem",
      },
    ],
  },
  {
    input: "د ستړي پلار د ملګري",
    output: [
      {
        ...makeNounSelection(malguray, undefined),
        possesor: {
          shrunken: false,
          np: {
            type: "NP",
            selection: {
              ...makeNounSelection(plaar, undefined),
              adjectives: [makeAdjectiveSelection(sturey)],
            },
          },
        },
      },
    ],
  },
  {
    input: "د سړی نوم",
    output: "error",
  },
  {
    input: "د ښځې د ماشومه",
    output: "error",
  },
  {
    input: "زما",
    output: [
      makePronounSelection(T.Person.FirstSingMale),
      makePronounSelection(T.Person.FirstSingFemale),
    ],
  },
  {
    input: "ستا",
    output: [
      makePronounSelection(T.Person.SecondSingMale),
      makePronounSelection(T.Person.SecondSingFemale),
    ],
  },
  {
    input: "زمونږ",
    output: [
      makePronounSelection(T.Person.FirstPlurMale),
      makePronounSelection(T.Person.FirstPlurFemale),
    ],
  },
  {
    input: "زموږ",
    output: [
      makePronounSelection(T.Person.FirstPlurMale),
      makePronounSelection(T.Person.FirstPlurFemale),
    ],
  },
  {
    input: "ستاسو",
    output: [
      makePronounSelection(T.Person.SecondPlurMale),
      makePronounSelection(T.Person.SecondPlurFemale),
    ],
  },
  {
    input: "ستاسې",
    output: [
      makePronounSelection(T.Person.SecondPlurMale),
      makePronounSelection(T.Person.SecondPlurFemale),
    ],
  },
  {
    input: "د پلار ستا",
    output: "error",
  },
];

test("parse possesor", () => {
  tests.forEach(({ input, output }) => {
    const tokens = tokenizer(input);
    const parsed = parsePossesor(tokens, lookup, undefined);
    if (output === "error") {
      expect(parsed.some((x) => x.errors.length)).toBe(true);
    } else {
      expect(
        parsePossesor(tokens, lookup, undefined)
          .filter(isCompleteResult)
          .map((x) => x.body.np.selection)
      ).toEqual(output);
    }
  });
});
