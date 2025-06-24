import * as T from "../../../../types";
import { tokenizer } from "../tokenizer";
import { getPeople } from "./../utils";
import { EqInfo, parseEquative } from "./parse-equative";

const tests: [string, EqInfo[]][] = [
  ["یم", [{ tenses: ["present", "habitual"], persons: getPeople(1, "sing") }]],
  ["یې", [{ tenses: ["present", "habitual"], persons: getPeople(2, "sing") }]],
  ["دی", [{ tenses: ["present"], persons: [T.Person.ThirdSingMale] }]],
  ["ده", [{ tenses: ["present"], persons: [T.Person.ThirdSingFemale] }]],
  ["یو", [{ tenses: ["present", "habitual"], persons: getPeople(1, "pl") }]],
  ["یئ", [{ tenses: ["present", "habitual"], persons: getPeople(2, "pl") }]],
  ["دي", [{ tenses: ["present"], persons: getPeople(3, "pl") }]],
  ["وم", [{ tenses: ["subjunctive", "past"], persons: getPeople(1, "sing") }]],
  ["ولم", [{ tenses: ["past"], persons: getPeople(1, "sing") }]],
  [
    "وې",
    [
      { tenses: ["subjunctive", "past"], persons: getPeople(2, "sing") },
      {
        tenses: ["past"],
        persons: [T.Person.ThirdPlurFemale],
      },
    ],
  ],
  [
    "ولې",
    [
      {
        tenses: ["past"],
        persons: [...getPeople(2, "sing"), T.Person.ThirdPlurFemale],
      },
    ],
  ],
  [
    "وو",
    [
      { tenses: ["subjunctive", "past"], persons: getPeople(1, "pl") },
      { tenses: ["past"], persons: [T.Person.ThirdPlurMale] },
    ],
  ],
  [
    "ولو",
    [
      {
        tenses: ["past"],
        persons: [...getPeople(1, "pl"), T.Person.ThirdSingMale],
      },
    ],
  ],
  ["وئ", [{ tenses: ["subjunctive", "past"], persons: getPeople(2, "pl") }]],
  ["ولئ", [{ tenses: ["past"], persons: getPeople(2, "pl") }]],
  ["ول", [{ tenses: ["past"], persons: [T.Person.ThirdPlurMale] }]],
  [
    "وي",
    [{ tenses: ["subjunctive", "habitual"], persons: getPeople(3, "both") }],
  ],
  [
    "وای",
    [
      {
        tenses: ["pastSubjunctive"],
        persons: ([1, 2, 3] as const).flatMap((p) => getPeople(p, "both")),
      },
    ],
  ],
  [
    "وی",
    [
      {
        tenses: ["pastSubjunctive"],
        persons: ([1, 2, 3] as const).flatMap((p) => getPeople(p, "both")),
      },
    ],
  ],
];

tests.forEach(([input, output]) => {
  test(`${input}`, () => {
    const tokens = tokenizer(input);
    const parsed = parseEquative(tokens);
    const expected = output.flatMap(makeEqs);
    expect(parsed.every((x) => !x.errors.length));
    expect(parsed.every((x) => !x.errors.length));
    expect(parsed.map((x) => x.body)).toIncludeSameMembers(expected);
  });
});

function makeEqs({ persons, tenses }: EqInfo): T.ParsedVBBEq[] {
  return persons.flatMap((person) =>
    tenses.map((tense) => ({
      type: "parsed vbb eq",
      info: {
        type: "equative",
        tense,
      },
      person,
    })),
  );
}
