import * as T from "../../../../types";
import { testDictionary } from "../mini-test-dictionary";
import { tokenizer } from "../tokenizer";
import { getPeople } from "../utils";
import { kawulDyn, kawulStat } from "./irreg-verbs";
import { parseKawulKedul } from "./parse-kawul-kedul";

type Section = { ph: T.ParsedPH | undefined, input: string, output: T.ParsedVBE[] }[];

const oo: T.ParsedPH = {
  type: "PH",
  s: "و",
}

const compPH: T.ParsedPH = {
  type: "CompPH",
  selection: {
    type: "loc. adv.",
    entry: testDictionary.queryP("وړاندې")[0] as T.LocativeAdverbEntry,
  }
};

const vBank: Record<"transitive" | "intransitive", Record<("stat" | "dyn"), T.VerbEntry>> = {
  transitive: {
    stat: kawulStat,
    dyn: kawulDyn,
  },
  intransitive: {
    stat: kawulStat,
    dyn: kawulDyn,
  },
}

const kawulImperfective: Section = [
  {
    ph: undefined,
    input: "کوم",
    output: makeAux(
      getPeople(1, "sing"),
      "both",
      ["imperfective"],
      ["root", "stem"],
      "transitive",
    ),
  },
  {
    ph: compPH,
    input: "کوم",
    output: [],
  },
  {
    ph: undefined,
    input: "کولم",
    output: makeAux(
      getPeople(1, "sing"),
      "both",
      ["imperfective"],
      ["root"],
      "transitive",
    )
  },
  {
    ph: undefined,
    input: "کوې",
    output: [
      ...makeAux(
        getPeople(2, "sing"),
        "both",
        ["imperfective"],
        ["root", "stem"],
        "transitive",
      ),
      ...makeAux(
        [T.Person.ThirdPlurFemale],
        "both",
        ["imperfective"],
        ["root"],
        "transitive",
      ),
    ],
  },
  {
    ph: undefined,
    input: "کولې",
    output: [
      ...makeAux(
        getPeople(2, "sing"),
        "both",
        ["imperfective"],
        ["root"],
        "transitive",
      ),
      ...makeAux(
        [T.Person.ThirdPlurFemale],
        "both",
        ["imperfective"],
        ["root"],
        "transitive",
      ),
    ],
  },
  {
    ph: undefined,
    input: "کوي",
    output: makeAux(
      getPeople(3, "both"),
      "both",
      ["imperfective"],
      ["stem"],
      "transitive",
    ),
  },
  {
    ph: undefined,
    input: "کولي",
    output: [],
  },
  {
    ph: undefined,
    input: "کوو",
    output: makeAux(
      getPeople(1, "pl"),
      "both",
      ["imperfective"],
      ["stem", "root"],
      "transitive",
    )
  },
  {
    ph: undefined,
    input: "کولو",
    output: [
      ...makeAux(
        getPeople(1, "pl"),
        "both",
        ["imperfective"],
        ["root"],
        "transitive",
      ),
      ...makeAux(
        [T.Person.ThirdSingMale],
        "both",
        ["imperfective"],
        ["root"],
        "transitive",
      )
    ],
  },
  {
    ph: undefined,
    input: "کوئ",
    output: [
      ...makeAux(
        getPeople(2, "pl"),
        "both",
        ["imperfective"],
        ["stem", "root"],
        "transitive",
      ),
      ...makeAux(
        getPeople(2, "pl"),
        "both",
        ["imperfective"],
        ["stem"],
        "transitive",
        true,
      )
    ],
  },
  {
    ph: undefined,
    input: "کولئ",
    output: makeAux(
      getPeople(2, "pl"),
      "both",
      ["imperfective"],
      ["root"],
      "transitive",
    ),
  },
  {
    ph: undefined,
    input: "کول",
    output: makeAux(
      [T.Person.ThirdPlurMale],
      "both",
      ["imperfective"],
      ["root"],
      "transitive"
    )
  },
  {
    ph: undefined,
    input: "کولل",
    output: [],
  },
  {
    ph: undefined,
    input: "کوه",
    output: [
      ...makeAux(
        getPeople(2, "sing"),
        "both",
        ["imperfective"],
        ["stem"],
        "transitive",
        true,
      ),
      ...makeAux(
        [T.Person.ThirdSingFemale],
        "both",
        ["imperfective"],
        ["root"],
        "transitive",
      )],
  },
  {
    ph: undefined,
    input: "کوله",
    output: makeAux(
      [T.Person.ThirdSingFemale],
      "both",
      ["imperfective"],
      ["root"],
      "transitive",
    ),
  },
  {
    ph: undefined,
    input: "کاوه",
    output: makeAux(
      [T.Person.ThirdSingMale],
      "both",
      ["imperfective"],
      ["root"],
      "transitive",
    ),
  }
];

const kawulPerfective: Section = [
  ...phVars(
    "کړم",
    getPeople(1, "sing"),
    ["stem", "root"],
    "transitive",
  ),
  ...phVars(
    "کړلم",
    getPeople(1, "sing"),
    ["root"],
    "transitive",
  ),
  ...phVars(
    "کم",
    getPeople(1, "sing"),
    ["root", "stem"],
    "transitive",
  ),
  {
    input: "کړې",
    ph: undefined,
    output: [
      ...makeAux(
        getPeople(2, "sing"),
        "stat",
        ["perfective"],
        ["stem", "root"],
        "transitive",
      ),
      ...makeAux(
        [T.Person.ThirdPlurFemale],
        "stat",
        ["perfective"],
        ["root"],
        "transitive",
      ),
    ]
  },
  {
    input: "کړلې",
    ph: undefined,
    output: [
      ...makeAux(
        getPeople(2, "sing"),
        "stat",
        ["perfective"],
        ["root"],
        "intransitive",
      ),
      ...makeAux(
        [T.Person.ThirdPlurFemale],
        "stat",
        ["perfective"],
        ["root"],
        "transitive",
      ),
    ]
  },
  {
    input: "کې",
    ph: undefined,
    output: [
      ...makeAux(
        getPeople(2, "sing"),
        "stat",
        ["perfective"],
        ["stem", "root"],
        "transitive",
      ),
      ...makeAux(
        [T.Person.ThirdPlurFemale],
        "stat",
        ["perfective"],
        ["root"],
        "transitive",
      ),
    ]
  },
];

const sections = {
  kawulImperfective,
  kawulPerfective,
};

for (const [sectionName, section] of Object.entries(sections)) {
  describe(sectionName, () => {
    section.forEach(({ input, ph, output }) => {
      test(`${input} ${showPh(ph)}`, () => {
        const tokens = tokenizer(input);
        const result = parseKawulKedul(tokens, ph);
        expect(result.every(x => !x.errors.length && !x.tokens.length))
        expect(result.map(x => x.body)).toIncludeSameMembers(output);
      });
    });
  });
};

function showPh(ph: T.ParsedPH | undefined): string {
  if (!ph) {
    return "";
  }
  if (ph.type === "CompPH") {
    return "w CompPH";
  }
  return `w. ${ph.s}`;
}


function phVars(input: string, people: T.Person[], base: ("stem" | "root")[], transitivity: "transitive" | "intransitive"): Section {
  return [
    {
      ph: undefined,
      input,
      output: makeAux(
        people,
        "stat",
        ["perfective"],
        base,
        transitivity,
      )
    },
    {
      ph: oo,
      input,
      output: makeAux(
        people,
        "dyn",
        ["perfective"],
        base,
        transitivity,
      )
    },
    {
      ph: compPH,
      input,
      output: makeAux(
        people,
        "stat",
        ["perfective"],
        base,
        transitivity,
      )
    }
  ]
}

function toKeys(v: "stat" | "dyn" | "both"): ("stat" | "dyn")[] {
  return v === "both" ? ["stat", "dyn"] : [v];
}

function makeAux(
  people: T.Person[],
  statDyn: "stat" | "dyn" | "both",
  aspects: T.Aspect[],
  bases: ("root" | "stem")[],
  trans: "transitive" | "intransitive",
  imperative?: boolean,
): T.ParsedVBE[] {
  const verbs = toKeys(statDyn).map(sd => vBank[trans][sd]);
  return people.flatMap(person =>
    bases.flatMap(base =>
      aspects.flatMap(aspect =>
        verbs.map(verb => makeParsedVBE({
          person,
          aspect,
          base,
          verb,
          imperative,
        }))))
  )
}

function makeParsedVBE(props: {
  person: T.Person;
  aspect: T.Aspect;
  base: "root" | "stem";
  verb: T.VerbEntry;
  imperative?: boolean;
  abilityaux?: boolean;
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

