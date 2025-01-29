import * as T from "../../../types";
import { parseKedul } from "./parse-kedul";
import { kedulDyn, kedulStat } from "./irreg-verbs";
import { tokenizer } from "./tokenizer";
import { getPeople, removeKeys } from "./utils";

const tests: {
  label: string;
  cases: {
    input: string;
    output: T.ParsedVBE[];
  }[];
}[] = [
  {
    label: "keG-",
    cases: [
      {
        input: "کېږې",
        output: getPeople(2, "sing").flatMap<T.ParsedVBE>((person) => [
          {
            type: "VB",
            info: {
              aspect: "imperfective",
              base: "stem",
              type: "verb",
              verb: kedulStat,
            },
            person,
          },
          {
            type: "VB",
            info: {
              aspect: "imperfective",
              base: "stem",
              type: "verb",
              verb: kedulDyn,
            },
            person,
          },
        ]),
      },
    ],
  },
  {
    label: "ked-",
    cases: [
      {
        input: "کېدم",
        output: getPeople(1, "sing").flatMap<T.ParsedVBE>((person) => [
          {
            type: "VB",
            info: {
              aspect: "imperfective",
              base: "root",
              type: "verb",
              verb: kedulStat,
            },
            person,
          },
          {
            type: "VB",
            info: {
              aspect: "imperfective",
              base: "root",
              type: "verb",
              verb: kedulDyn,
            },
            person,
          },
        ]),
      },
      {
        input: "کېدل",
        output: [
          {
            type: "VB",
            info: {
              aspect: "imperfective",
              base: "root",
              type: "verb",
              verb: kedulStat,
            },
            person: T.Person.ThirdPlurMale,
          },
          {
            type: "VB",
            info: {
              aspect: "imperfective",
              base: "root",
              type: "verb",
              verb: kedulDyn,
            },
            person: T.Person.ThirdPlurMale,
          },
        ],
      },
      {
        input: "کېدلل",
        output: [],
      },
    ],
  },
  {
    label: "sh-",
    cases: [
      {
        input: "شې",
        output: getPeople(2, "sing").flatMap<T.ParsedVBE>((person) => [
          {
            type: "VB",
            info: {
              aspect: "perfective",
              base: "stem",
              type: "verb",
              verb: kedulStat,
            },
            person,
          },
          {
            type: "VB",
            info: {
              aspect: "perfective",
              base: "stem",
              type: "verb",
              verb: kedulDyn,
            },
            person,
          },
        ]),
      },
      {
        input: "شه",
        output: getPeople(2, "sing").flatMap<T.ParsedVBE>((person) => [
          {
            type: "VB",
            info: {
              aspect: "perfective",
              base: "stem",
              type: "verb",
              imperative: true,
              verb: kedulStat,
            },
            person,
          },
          {
            type: "VB",
            info: {
              aspect: "perfective",
              base: "stem",
              type: "verb",
              imperative: true,
              verb: kedulDyn,
            },
            person,
          },
        ]),
      },
      {
        input: "شئ",
        output: getPeople(2, "pl").flatMap<T.ParsedVBE>((person) =>
          [true, false].flatMap<T.ParsedVBE>((imperative) => [
            {
              type: "VB",
              info: {
                aspect: "perfective",
                base: "stem",
                type: "verb",
                imperative: imperative || undefined,
                verb: kedulStat,
              },
              person,
            },
            {
              type: "VB",
              info: {
                aspect: "perfective",
                base: "stem",
                type: "verb",
                imperative: imperative || undefined,
                verb: kedulDyn,
              },
              person,
            },
          ])
        ),
      },
    ],
  },
  {
    label: "shw-",
    cases: [
      {
        input: "شوم",
        output: getPeople(1, "sing").flatMap<T.ParsedVBE>((person) => [
          {
            type: "VB",
            info: {
              aspect: "perfective",
              base: "root",
              type: "verb",
              verb: kedulStat,
            },
            person,
          },
          {
            type: "VB",
            info: {
              aspect: "perfective",
              base: "root",
              type: "verb",
              verb: kedulDyn,
            },
            person,
          },
        ]),
      },
      {
        input: "شول",
        output: [
          {
            type: "VB",
            info: {
              aspect: "perfective",
              base: "root",
              type: "verb",
              verb: kedulStat,
            },
            person: T.Person.ThirdPlurMale,
          },
          {
            type: "VB",
            info: {
              aspect: "perfective",
              base: "root",
              type: "verb",
              verb: kedulDyn,
            },
            person: T.Person.ThirdPlurMale,
          },
        ],
      },
      {
        input: "شولل",
        output: [],
      },
    ],
  },
  {
    label: "sho",
    cases: [
      {
        input: "شو",
        output: [
          ...[
            T.Person.ThirdSingMale,
            T.Person.FirstPlurMale,
            T.Person.FirstPlurFemale,
          ].flatMap((person) =>
            [kedulStat, kedulDyn].map<T.ParsedVBE>((verb) => ({
              type: "VB",
              info: {
                aspect: "perfective",
                base: "root",
                type: "verb",
                verb,
              },
              person,
            }))
          ),
          ...[T.Person.FirstPlurMale, T.Person.FirstPlurFemale].flatMap(
            (person) =>
              [kedulStat, kedulDyn].map<T.ParsedVBE>((verb) => ({
                type: "VB",
                info: {
                  aspect: "perfective",
                  base: "stem",
                  type: "verb",
                  verb,
                },
                person,
              }))
          ),
        ],
      },
    ],
  },
];

tests.forEach(({ label, cases }) => {
  test(label, () => {
    cases.forEach(({ input, output }) => {
      const tokens = tokenizer(input);
      const vbe = parseKedul(tokens);
      expect(vbe.every((v) => v.errors.length === 0)).toBe(true);
      expect(removeKeys(vbe.map((v) => v.body))).toIncludeSameMembers(
        removeKeys(output)
      );
    });
  });
});
