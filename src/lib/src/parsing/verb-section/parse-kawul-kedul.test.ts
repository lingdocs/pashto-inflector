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

const makeAuxKawul = makeAux("transitive");

const kawulImperfective: Section = [
  {
    ph: undefined,
    input: "کوم",
    output: makeAuxKawul(
      getPeople(1, "sing"),
      "both",
      ["imperfective"],
      ["root", "stem"],
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
    output: makeAuxKawul(
      getPeople(1, "sing"),
      "both",
      ["imperfective"],
      ["root"],
    )
  },
  {
    ph: undefined,
    input: "کوې",
    output: [
      ...makeAuxKawul(
        getPeople(2, "sing"),
        "both",
        ["imperfective"],
        ["root", "stem"],
      ),
      ...makeAuxKawul(
        [T.Person.ThirdPlurFemale],
        "both",
        ["imperfective"],
        ["root"],
      ),
    ],
  },
  {
    ph: undefined,
    input: "کولې",
    output: [
      ...makeAuxKawul(
        getPeople(2, "sing"),
        "both",
        ["imperfective"],
        ["root"],
      ),
      ...makeAuxKawul(
        [T.Person.ThirdPlurFemale],
        "both",
        ["imperfective"],
        ["root"],
      ),
    ],
  },
  {
    ph: undefined,
    input: "کوي",
    output: makeAuxKawul(
      getPeople(3, "both"),
      "both",
      ["imperfective"],
      ["stem"],
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
    output: makeAuxKawul(
      getPeople(1, "pl"),
      "both",
      ["imperfective"],
      ["stem", "root"],
    )
  },
  {
    ph: undefined,
    input: "کولو",
    output: [
      ...makeAuxKawul(
        getPeople(1, "pl"),
        "both",
        ["imperfective"],
        ["root"],
      ),
      ...makeAuxKawul(
        [T.Person.ThirdSingMale],
        "both",
        ["imperfective"],
        ["root"],
      )
    ],
  },
  {
    ph: undefined,
    input: "کوئ",
    output: [
      ...makeAuxKawul(
        getPeople(2, "pl"),
        "both",
        ["imperfective"],
        ["stem", "root"],
      ),
      ...makeAuxKawul(
        getPeople(2, "pl"),
        "both",
        ["imperfective"],
        ["stem"],
        true,
      )
    ],
  },
  {
    ph: undefined,
    input: "کولئ",
    output: makeAuxKawul(
      getPeople(2, "pl"),
      "both",
      ["imperfective"],
      ["root"],
    ),
  },
  {
    ph: undefined,
    input: "کول",
    output: makeAuxKawul(
      [T.Person.ThirdPlurMale],
      "both",
      ["imperfective"],
      ["root"],
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
      ...makeAuxKawul(
        getPeople(2, "sing"),
        "both",
        ["imperfective"],
        ["stem"],
        true,
      ),
      ...makeAuxKawul(
        [T.Person.ThirdSingFemale],
        "both",
        ["imperfective"],
        ["root"],
      )],
  },
  {
    ph: undefined,
    input: "کوله",
    output: makeAuxKawul(
      [T.Person.ThirdSingFemale],
      "both",
      ["imperfective"],
      ["root"],
    ),
  },
  {
    ph: undefined,
    input: "کاوه",
    output: makeAuxKawul(
      [T.Person.ThirdSingMale],
      "both",
      ["imperfective"],
      ["root"],
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
      ...makeAuxKawul(
        getPeople(2, "sing"),
        "stat",
        ["perfective"],
        ["stem", "root"],
      ),
      ...makeAuxKawul(
        [T.Person.ThirdPlurFemale],
        "stat",
        ["perfective"],
        ["root"],
      ),
    ]
  },
  {
    input: "کړلې",
    ph: undefined,
    output: [
      ...makeAuxKawul(
        getPeople(2, "sing"),
        "stat",
        ["perfective"],
        ["root"],
      ),
      ...makeAuxKawul(
        [T.Person.ThirdPlurFemale],
        "stat",
        ["perfective"],
        ["root"],
      ),
    ]
  },
  {
    input: "کې",
    ph: undefined,
    output: [
      ...makeAuxKawul(
        getPeople(2, "sing"),
        "stat",
        ["perfective"],
        ["stem", "root"],
      ),
      ...makeAuxKawul(
        [T.Person.ThirdPlurFemale],
        "stat",
        ["perfective"],
        ["root"],
      ),
    ]
  },
  ...["کړي", "کي"].flatMap(ps => phVars(
    ps,
    getPeople(3, "both"),
    ["stem"],
    "transitive",
  )),
  {
    input: "کړلي",
    ph: undefined,
    output: [],
  },
  ...["کړه", "که"].map(ps => ({
    input: ps,
    ph: undefined,
    output: [
      ...makeAuxKawul(
        [T.Person.ThirdSingFemale],
        "stat",
        ["perfective"],
        ["root"],
      ),
      ...makeAuxKawul(
        getPeople(2, "sing"),
        "stat",
        ["perfective"],
        ["stem"],
        true,
      )
    ],
  })),
  ...phVars(
    "کړله",
    [T.Person.ThirdSingFemale],
    ["root"],
    "transitive",
  ),
  ...phVars(
    "کړل",
    [T.Person.ThirdPlurMale],
    ["root"],
    "transitive"
  ),
  ...["کړو", "کو", "کړلو"].map(input => ({
    input,
    ph: undefined,
    output: [
      ...makeAuxKawul(
        getPeople(1, "pl"),
        "stat",
        ["perfective"],
        [...!input.includes("ل") ? (["stem"] as const) : [], "root"],
      ),
      ...makeAuxKawul(
        [T.Person.ThirdSingMale],
        "stat",
        ["perfective"],
        ["root"],
      )
    ],
  })),
  ...["کړئ", "کئ"].map(ps => ({
    input: ps,
    ph: undefined,
    output: [
      ...makeAuxKawul(
        getPeople(2, "pl"),
        "stat",
        ["perfective"],
        ["root", "stem"],
      ),
      ...makeAuxKawul(
        getPeople(2, "pl"),
        "stat",
        ["perfective"],
        ["stem"],
        true,
      )
    ],
  })),
  ...["کړئ", "کئ"].map(ps => ({
    input: ps,
    ph: compPH,
    output: [
      ...makeAuxKawul(
        getPeople(2, "pl"),
        "stat",
        ["perfective"],
        ["root", "stem"],
      ),
      ...makeAuxKawul(
        getPeople(2, "pl"),
        "stat",
        ["perfective"],
        ["stem"],
        true,
      )
    ],
  })),
  ...["کړئ", "کئ"].map(ps => ({
    input: ps,
    ph: oo,
    output: [
      ...makeAuxKawul(
        getPeople(2, "pl"),
        "dyn",
        ["perfective"],
        ["root", "stem"],
      ),
      ...makeAuxKawul(
        getPeople(2, "pl"),
        "dyn",
        ["perfective"],
        ["stem"],
        true,
      )
    ],
  })),
  ...phVars(
    "کړلئ",
    getPeople(2, "pl"),
    ["root"],
    "transitive",
  )
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
      output: makeAux(transitivity)(
        people,
        "stat",
        ["perfective"],
        base,
      )
    },
    {
      ph: oo,
      input,
      output: makeAux(transitivity)(
        people,
        "dyn",
        ["perfective"],
        base,
      )
    },
    {
      ph: compPH,
      input,
      output: makeAux(transitivity)(
        people,
        "stat",
        ["perfective"],
        base,
      )
    }
  ]
}

function toKeys(v: "stat" | "dyn" | "both"): ("stat" | "dyn")[] {
  return v === "both" ? ["stat", "dyn"] : [v];
}

function makeAux(
  trans: "transitive" | "intransitive",
) {
  return function(
    people: T.Person[],
    statDyn: "stat" | "dyn" | "both",
    aspects: T.Aspect[],
    bases: ("root" | "stem")[],
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

