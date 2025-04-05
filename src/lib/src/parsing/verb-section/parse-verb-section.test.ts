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
const leekul = testDictionary.verbEntryLookup("لیکل")[0];
const tlul = testDictionary
  .verbEntryLookup("تلل")
  .filter((x) => x.entry.e.includes("to go"))[0];
const manul = testDictionary.verbEntryLookup("منل")[0];
// const gaalul = testDictionary.verbEntryLookup("ګالل")[0];
// const khorul = testDictionary.verbEntryLookup("خوړل")[0];
// const kxenaastul = testDictionary.verbEntryLookup("کښېناستل")[0];
// const prexodul = testDictionary.verbEntryLookup("پرېښودل")[0];
// const prexowul = testDictionary.verbEntryLookup("پرېښوول")[0];
// const prexawul = testDictionary.verbEntryLookup("پرېښول")[0];
// const xodul = testDictionary.verbEntryLookup("ښودل")[0];
// const kexodul = testDictionary.verbEntryLookup("کېښودل")[0];
// const kxexodul = testDictionary.verbEntryLookup("کښېښودل")[0];
// const katul = testDictionary.verbEntryLookup("کتل")[0];
// const watul = testDictionary.verbEntryLookup("وتل")[0];
// const wurul = testDictionary.verbEntryLookup("وړل")[0];
// const alwatul = testDictionary.verbEntryLookup("الوتل")[0];

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
      output: testVBEOutuput({
        persons: getPeople(1, "sing"),
        bases: ["stem"],
        aspects: ["imperfective"],
        verb: tlul,
      }),
    },
    {
      input: "وهلې",
      output: testVBEOutuput({
        persons: [...getPeople(2, "sing"), T.Person.ThirdPlurFemale],
        bases: ["root"],
        verb: wahul,
        aspects: ["imperfective"],
      }),
    },
    {
      input: "ووهلم",
      output: testVBEOutuput({
        ph: "و",
        persons: getPeople(1, "sing"),
        bases: ["root"],
        aspects: ["perfective"],
        verb: wahul,
      }),
    },
    {
      input: "وهم",
      output: testVBEOutuput({
        persons: getPeople(1, "sing"),
        bases: ["root", "stem"],
        aspects: ["imperfective"],
        verb: wahul,
      }),
    },
    {
      input: "وهې",
      output: [
        ...testVBEOutuput({
          bases: ["stem"],
          aspects: ["imperfective"],
          persons: getPeople(2, "sing"),
          verb: wahul,
        }),
        ...testVBEOutuput({
          bases: ["root"],
          aspects: ["imperfective"],
          persons: [...getPeople(2, "sing"), T.Person.ThirdPlurFemale],
          verb: wahul,
        }),
      ],
    },
    {
      input: "ووهې",
      output: [
        ...testVBEOutuput({
          ph: "و",
          bases: ["stem"],
          aspects: ["perfective"],
          persons: getPeople(2, "sing"),
          verb: wahul,
        }),
        ...testVBEOutuput({
          ph: "و",
          bases: ["root"],
          aspects: ["perfective"],
          persons: [...getPeople(2, "sing"), T.Person.ThirdPlurFemale],
          verb: wahul,
        }),
      ],
    },
    {
      input: "لیکم",
      output: testVBEOutuput({
        bases: ["root", "stem"],
        aspects: ["imperfective"],
        persons: getPeople(1, "sing"),
        verb: leekul,
      }),
    },
    {
      input: "لیکلو",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["imperfective"],
        persons: [...getPeople(1, "pl"), T.Person.ThirdSingMale],
        verb: leekul,
      }),
    },
    {
      input: "لیکل",
      output: testVBEOutuput({
        bases: ["root"],
        persons: [T.Person.ThirdPlurMale],
        aspects: ["imperfective"],
        verb: leekul,
      }),
    },
    {
      input: "لیکلل",
      output: [],
    },
    {
      input: "منله",
      output: testVBEOutuput({
        bases: ["root"],
        persons: [T.Person.ThirdSingFemale],
        aspects: ["imperfective"],
        verb: manul,
      }),
    },
    {
      input: "ومنله",
      output: testVBEOutuput({
        ph: "و",
        bases: ["root"],
        persons: [T.Person.ThirdSingFemale],
        aspects: ["perfective"],
        verb: manul,
      }),
    },
    {
      input: "مني",
      output: testVBEOutuput({
        bases: ["stem"],
        aspects: ["imperfective"],
        persons: getPeople(3, "both"),
        verb: manul,
      }),
    },
    {
      input: "ومنئ",
      output: [
        ...testVBEOutuput({
          ph: "و",
          bases: ["root", "stem"],
          aspects: ["perfective"],
          persons: getPeople(2, "pl"),
          verb: manul,
        }),
        ...testVBEOutuput({
          ph: "و",
          bases: ["stem"],
          aspects: ["perfective"],
          persons: getPeople(2, "pl"),
          verb: manul,
          imperative: true,
        }),
      ],
    },
    {
      input: "منه",
      output: [
        ...testVBEOutuput({
          bases: ["stem"],
          aspects: ["imperfective"],
          persons: getPeople(2, "sing"),
          verb: manul,
          imperative: true,
        }),
        ...testVBEOutuput({
          bases: ["root"],
          aspects: ["imperfective"],
          persons: [T.Person.ThirdSingFemale],
          verb: manul,
        }),
      ],
    },
    {
      input: "منلم",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["imperfective"],
        persons: getPeople(1, "sing"),
        verb: manul,
      }),
    },
    {
      input: "منلي",
      output: [],
    },
  ],
};

const simpleIntrans: Section = {
  title: "basic VBE intransitive forms",
  tests: [
    {
      input: "رسېدلم",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["imperfective"],
        persons: getPeople(1, "sing"),
        verb: rasedul,
      }),
    },
    {
      input: "رسېدم",
      output: testVBEOutuput({
        bases: ["root"],
        aspects: ["imperfective"],
        persons: getPeople(1, "sing"),
        verb: rasedul,
      }),
    },
    {
      input: "رسېږي",
      output: testVBEOutuput({
        bases: ["stem"],
        aspects: ["imperfective"],
        persons: getPeople(3, "both"),
        verb: rasedul,
      }),
    },
    {
      input: "ورسېږي",
      output: testVBEOutuput({
        bases: ["stem"],
        ph: "و",
        aspects: ["perfective"],
        persons: getPeople(3, "both"),
        verb: rasedul,
      }),
    },
    {
      input: "رسي",
      output: testVBEOutuput({
        bases: ["stem"],
        aspects: ["imperfective"],
        persons: getPeople(3, "both"),
        verb: rasedul,
      }),
    },
  ],
};

function testVBEOutuput(props: {
  ph?: string;
  bases: ("root" | "stem")[];
  aspects: T.Aspect[];
  persons: T.Person[];
  verb: T.VerbEntry;
  imperative?: boolean;
}): Section["tests"][number]["output"] {
  return props.persons.flatMap((person) =>
    props.bases.flatMap((base) =>
      props.aspects.map((aspect) => ({
        blocks: [
          ...(props.ph ? [{ type: "PH", s: props.ph } as const] : []),
          makeParsedVBE({
            aspect,
            base,
            verb: props.verb,
            person,
            ...(props.imperative
              ? {
                  imperative: props.imperative,
                }
              : {}),
          }),
        ],
        kids: [],
      }))
    )
  );
}

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

const perfect: Section = {
  title: "Perfect Verb Forms",
  tests: [
    {
      input: "لیدلی دی",
      output: [
        {
          blocks: [
            makePPartVBP(leedul, { gender: "masc", number: "singular" }),
            makeEqVBE(T.Person.ThirdSingMale, "present"),
          ],
          kids: [],
        },
      ],
    },
    {
      input: "لیدلې ده",
      output: [
        {
          blocks: [
            makePPartVBP(leedul, { gender: "fem", number: "singular" }),
            makeEqVBE(T.Person.ThirdSingFemale, "present"),
          ],
          kids: [],
        },
        {
          blocks: [
            makePPartVBP(leedul, { gender: "fem", number: "plural" }),
            makeEqVBE(T.Person.ThirdSingFemale, "present"),
          ],
          kids: [],
        },
      ],
    },
    {
      input: "لیدلي ول",
      output: [
        {
          blocks: [
            makePPartVBP(leedul, { gender: "masc", number: "plural" }),
            makeEqVBE(T.Person.ThirdPlurMale, "past"),
          ],
          kids: [],
        },
      ],
    },
    {
      input: "نه به مې وي اخیستی",
      output: getPeople(3, "both").flatMap((person) =>
        (["habitual", "subjunctive"] satisfies T.EquativeTenseWithoutBa[]).map(
          (tense) => ({
            blocks: [
              { type: "negative", imperative: false },
              makeEqVBE(person, tense),
              makePPartVBP(akheestul, { gender: "masc", number: "singular" }),
            ],
            kids: [{ position: 1, section: ["ba", "me"] }],
          })
        )
      ),
    },
  ],
};

const sections = [simpleOpts, simpleIntrans, ability, perfect];

// TODO imperative and negatives
// Perfect forms!
// better guard for verb section compatability

sections.forEach((section) => {
  describe(section.title, () => {
    section.tests.forEach(({ input, output }) => {
      test(input, () => {
        const tokens = tokenizer(input);
        const res = parseVerbSection(tokens, testDictionary)
          .filter((x) => !x.tokens.length)
          .map(({ body }) => body);
        expect(res).toIncludeSameMembers(output);
      });
    });
  });
});

function makeEqVBE(
  person: T.Person,
  tense: T.EquativeTenseWithoutBa
): T.ParsedVBE {
  return {
    type: "VB",
    info: {
      type: "equative",
      tense: tense,
    },
    person: person,
  };
}

function makePPartVBP(verb: T.VerbEntry, genNum: T.GenderNumber): T.ParsedVBP {
  return {
    type: "VB",
    info: {
      type: "ppart",
      verb: verb,
      genNum: genNum,
    },
  };
}

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
      ...(props.imperative
        ? {
            imperative: props.imperative,
          }
        : {}),
    },
  };
}
