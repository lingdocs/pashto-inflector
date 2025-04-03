import * as T from "../../../../types";
import { testDictionary } from "../mini-test-dictionary";
import { tokenizer } from "./../tokenizer";
import { getPeople } from "../utils";
import { parseVerbSection, VerbSectionData } from "./parse-verb-section";
import { kedulStat } from "./irreg-verbs";

const leedul = testDictionary.verbEntryLookup("لیدل")[0];
const akheestul = testDictionary.verbEntryLookup("اخیستل")[0];
const kenaastul = testDictionary.verbEntryLookup("کېناستل")[0];
const wahul = testDictionary.verbEntryLookup("وهل")[0];
const awuxtul = testDictionary.verbEntryLookup("اوښتل")[0];
// const raawrul = testDictionary.verbEntryLookup("راوړل")[0];
const botlul = testDictionary.verbEntryLookup("بوتلل")[0];
const rasedul = testDictionary.verbEntryLookup("رسېدل")[0];
const tlul = testDictionary
  .verbEntryLookup("تلل")
  .filter((x) => x.entry.e.includes("to go"))[0];
// TODO: could to more thorough testing of short past participle forms

type Section = {
  title: string;
  tests: { input: string; output: VerbSectionData[]; error?: boolean }[];
};

const simpleOpts: Section = {
  title: "bare bones VBE forms",
  tests: [
    {
      input: "ځم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          makeParsedVBE({
            aspect: "imperfective",
            base: "stem",
            verb: tlul,
            person,
          }),
        ],
        kids: [],
      })),
    },
    {
      input: "وهې",
      output: [
        ...getPeople(2, "sing").flatMap((person) => [
          {
            blocks: [
              makeParsedVBE({
                aspect: "imperfective",
                base: "stem",
                verb: wahul,
                person,
              }),
            ],
            kids: [],
          },
          {
            blocks: [
              makeParsedVBE({
                aspect: "imperfective",
                base: "root",
                verb: wahul,
                person,
              }),
            ],
            kids: [],
          },
        ]),
        {
          blocks: [
            makeParsedVBE({
              aspect: "imperfective",
              base: "root",
              verb: wahul,
              person: T.Person.ThirdPlurFemale,
            }),
          ],
          kids: [],
        },
      ],
    },
    {
      input: "وهلې",
      output: [
        ...getPeople(2, "sing").flatMap((person) => [
          {
            blocks: [
              makeParsedVBE({
                aspect: "imperfective",
                base: "root",
                verb: wahul,
                person,
              }),
            ],
            kids: [],
          },
        ]),
        {
          blocks: [
            makeParsedVBE({
              aspect: "imperfective",
              base: "root",
              verb: wahul,
              person: T.Person.ThirdPlurFemale,
            }),
          ],
          kids: [],
        },
      ],
    },
    {
      input: "ووهي",
      output: getPeople(3, "both").map((person) => ({
        blocks: [
          { type: "PH", s: "و" },
          makeParsedVBE({
            aspect: "perfective",
            base: "stem",
            verb: wahul,
            person,
          }),
        ],
        kids: [],
      })),
    },
  ],
};

const ability: Section = {
  title: "with ability VBPs",
  tests: [
    {
      input: "لیدلی شم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          makeAbilityVBP({ aspect: "imperfective", verb: leedul }),
          makeParsedVBE({
            aspect: "perfective",
            verb: kedulStat,
            base: "stem",
            person,
          }),
        ],
        kids: [],
      })),
    },
    {
      input: "ولیدلی شم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          { type: "PH", s: "و" },
          makeAbilityVBP({ aspect: "perfective", verb: leedul }),
          makeParsedVBE({
            aspect: "perfective",
            verb: kedulStat,
            base: "stem",
            person,
          }),
        ],
        kids: [],
      })),
    },
    {
      input: "ولیدلی شوم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          { type: "PH", s: "و" },
          makeAbilityVBP({ aspect: "perfective", verb: leedul }),
          makeParsedVBE({
            aspect: "perfective",
            verb: kedulStat,
            base: "root",
            person,
          }),
        ],
        kids: [],
      })),
    },
    {
      input: "ولیدلی شه",
      output: [],
    },
    // with short ability stems
    {
      input: "رسېدای شئ",
      output: getPeople(2, "pl").map((person) => ({
        blocks: [
          makeAbilityVBP({ aspect: "imperfective", verb: rasedul }),
          makeParsedVBE({
            aspect: "perfective",
            verb: kedulStat,
            base: "stem",
            person,
          }),
        ],
        kids: [],
      })),
    },
    {
      input: "اوښتی شي",
      output: getPeople(3, "both").map((person) => ({
        blocks: [
          makeAbilityVBP({ aspect: "imperfective", verb: awuxtul }),
          makeParsedVBE({
            aspect: "perfective",
            verb: kedulStat,
            base: "stem",
            person,
          }),
        ],
        kids: [],
      })),
    },
    // with aspect-ambiguous ability
    {
      input: "کېناستلی شم",
      output: getPeople(1, "sing").flatMap((person) =>
        (["imperfective", "perfective"] satisfies T.Aspect[]).map((aspect) => ({
          blocks: [
            ...(aspect === "perfective"
              ? [{ type: "PH", s: "کې" } as const]
              : []),
            makeAbilityVBP({ aspect, verb: kenaastul }),
            makeParsedVBE({
              aspect: "perfective",
              verb: kedulStat,
              base: "stem",
              person,
            }),
          ],
          kids: [],
        }))
      ),
    },
    {
      input: "بوتلای شول",
      output: (["imperfective", "perfective"] satisfies T.Aspect[]).map(
        (aspect) => ({
          blocks: [
            ...(aspect === "perfective"
              ? [{ type: "PH", s: "بو" } as const]
              : []),
            makeAbilityVBP({ aspect, verb: botlul }),
            makeParsedVBE({
              aspect: "perfective",
              verb: kedulStat,
              base: "root",
              person: T.Person.ThirdPlurMale,
            }),
          ],
          kids: [],
        })
      ),
    },
    {
      input: "بوتلای شوه",
      output: (["imperfective", "perfective"] satisfies T.Aspect[]).map(
        (aspect) => ({
          blocks: [
            ...(aspect === "perfective"
              ? [{ type: "PH", s: "بو" } as const]
              : []),
            makeAbilityVBP({ aspect, verb: botlul }),
            makeParsedVBE({
              aspect: "perfective",
              verb: kedulStat,
              base: "root",
              person: T.Person.ThirdSingFemale,
            }),
          ],
          kids: [],
        })
      ),
    },
    // with negative
    {
      input: "لیدلی نه شم",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          makeAbilityVBP({ aspect: "imperfective", verb: leedul }),
          { type: "negative", imperative: false },
          makeParsedVBE({
            aspect: "perfective",
            verb: kedulStat,
            base: "stem",
            person,
          }),
        ],
        kids: [],
      })),
    },
    {
      input: "نه شم لیدلی",
      output: getPeople(1, "sing").map((person) => ({
        blocks: [
          { type: "negative", imperative: false },
          makeParsedVBE({
            aspect: "perfective",
            verb: kedulStat,
            base: "stem",
            person,
          }),
          makeAbilityVBP({ aspect: "imperfective", verb: leedul }),
        ],
        kids: [],
      })),
    },
    // with tricky split and neg
    {
      input: "وابه یې نه شوه خیستلی",
      output: [
        {
          blocks: [
            { type: "PH", s: "وا" },
            { type: "negative", imperative: false },
            makeParsedVBE({
              aspect: "perfective",
              verb: kedulStat,
              base: "root",
              person: T.Person.ThirdSingFemale,
            }),
            makeAbilityVBP({ aspect: "perfective", verb: akheestul }),
          ],
          kids: [{ position: 1, section: ["ba", "ye"] }],
        },
      ],
    },
  ],
};

const sections = [simpleOpts, ability];

// TODO imperative and negatives
// Perfect forms!
// better guard for verb section compatability

sections.forEach((section) => {
  describe(section.title, () => {
    section.tests.forEach(({ input, output }) => {
      test(input, () => {
        const tokens = tokenizer(input);
        const res = parseVerbSection(tokens, testDictionary).map(
          ({ body }) => body
        );
        expect(res).toIncludeSameMembers(output);
      });
    });
  });
});

function makeAbilityVBP(props: {
  aspect: T.Aspect;
  verb: T.VerbEntry;
}): T.ParsedVBP {
  return {
    type: "VB",
    info: {
      type: "ability",
      aspect: props.aspect,
      verb: props.verb,
    },
  };
}

function makeParsedVBE(props: {
  person: T.Person;
  aspect: T.Aspect;
  base: "root" | "stem";
  verb: T.VerbEntry;
  imperative?: true;
  abilityAux?: boolean;
}): T.ParsedVBE {
  return {
    type: "VB",
    person: props.person,
    info: {
      type: "verb",
      aspect: props.aspect,
      verb: props.verb,
      base: props.base,
    },
  };
}
