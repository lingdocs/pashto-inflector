import * as T from "../../../../types";
import { testDictionary } from "../mini-test-dictionary";
import { tokenizer } from "../tokenizer";
import { kawulDyn, kawulStat, kedulStat, kedulDyn } from "./irreg-verbs";
import { parseKawulKedulVBP } from "./parse-kawul-kedul-vbp";

type Section = {
  ph: T.ParsedPH | undefined;
  input: string;
  output: T.ParsedVBPBasic[];
}[];

const oo: T.ParsedPH = {
  type: "PH",
  s: "و",
};

const compPH: T.ParsedPH = {
  type: "CompPH",
  selection: {
    type: "loc. adv.",
    entry: testDictionary.queryP("وړاندې")[0] as T.LocativeAdverbEntry,
  },
};

const kawulPPart: Section = [
  {
    ph: undefined,
    input: "کړی",
    output: [
      ...makeAuxPPart("transitive", [{ gender: "masc", number: "singular" }]),
      ...makeAuxAbility("transitive", ["perfective"], ["stat"]),
    ],
  },
  {
    ph: oo,
    input: "کړی",
    output: makeAuxAbility("transitive", ["perfective"], ["dyn"]),
  },
  {
    ph: compPH,
    input: "کړی",
    output: makeAuxAbility("transitive", ["perfective"], ["stat"]),
  },
  {
    ph: undefined,
    input: "کړې",
    output: makeAuxPPart("transitive", [
      { gender: "fem", number: "singular" },
      { gender: "fem", number: "plural" },
    ]),
  },
  {
    ph: undefined,
    input: "کړي",
    output: makeAuxPPart("transitive", [{ gender: "masc", number: "plural" }]),
  },
];

const kedulPPart: Section = [
  {
    ph: undefined,
    input: "شوی",
    output: makeAuxPPart("intransitive", [
      { gender: "masc", number: "singular" },
    ]),
  },
  {
    ph: oo,
    input: "شوی",
    output: [],
  },
  {
    ph: compPH,
    input: "شوی",
    output: [],
  },
  {
    ph: undefined,
    input: "شوې",
    output: makeAuxPPart("intransitive", [
      { gender: "fem", number: "singular" },
      { gender: "fem", number: "plural" },
    ]),
  },
  {
    ph: undefined,
    input: "شوي",
    output: makeAuxPPart("intransitive", [
      { gender: "masc", number: "plural" },
    ]),
  },
];

const kawulAbility: Section = [
  ...["کولی", "کولای"].map((input) => ({
    ph: undefined,
    input,
    output: makeAuxAbility("transitive", ["imperfective"], ["stat", "dyn"]),
  })),
  ...["کولی", "کولای"].map((input) => ({
    ph: oo,
    input,
    output: [],
  })),
  ...["کړای", "کړلی", "کړلای"].map((input) => ({
    ph: undefined,
    input,
    output: makeAuxAbility("transitive", ["perfective"], ["stat"]),
  })),
  ...["کړای", "کړلی", "کړلای", "کړی"].map((input) => ({
    ph: oo,
    input,
    output: makeAuxAbility("transitive", ["perfective"], ["dyn"]),
  })),
  {
    ph: undefined,
    input: "کړی",
    output: [
      ...makeAuxAbility("transitive", ["perfective"], ["stat"]),
      ...makeAuxPPart("transitive", [{ gender: "masc", number: "singular" }]),
    ],
  },
  {
    ph: oo,
    input: "کړی",
    output: makeAuxAbility("transitive", ["perfective"], ["dyn"]),
  },
];

const kedulAbility: Section = [
  ...["کېدی", "کېدای", "کېدلی", "کېدلای"].map((input) => ({
    ph: undefined,
    input,
    output: makeAuxAbility(
      "intransitive",
      ["imperfective", "perfective"],
      ["stat", "dyn"],
    ),
  })),
  ...["کېدی", "کېدای", "کېدلی", "کېدلای"].map((input) => ({
    ph: oo,
    input,
    output: [],
  })),
  ...["کېدی", "کېدای", "کېدلی", "کېدلای"].map((input) => ({
    ph: compPH,
    input,
    output: [],
  })),
];

const sections = {
  kawulPPart,
  kedulPPart,
  kawulAbility,
  kedulAbility,
};

for (const [sectionName, section] of Object.entries(sections)) {
  describe(sectionName, () => {
    section.forEach(({ input, ph, output }) => {
      test(`${input} ${showPh(ph)}`, () => {
        const tokens = tokenizer(input);
        const result = parseKawulKedulVBP(tokens, ph);
        expect(result.every((x) => !x.errors.length && !x.tokens.length));
        expect(result.map((x) => x.body)).toIncludeSameMembers(output);
      });
    });
  });
}

function showPh(ph: T.ParsedPH | undefined): string {
  if (!ph) {
    return "";
  }
  if (ph.type === "CompPH") {
    return "w CompPH";
  }
  return `w. ${ph.s}`;
}

function makeAuxAbility(
  transitivity: T.Transitivity,
  aspects: T.Aspect[],
  types: ("stat" | "dyn")[],
): T.ParsedVBPBasic[] {
  return aspects.flatMap<T.ParsedVBPBasic>((aspect) =>
    types.map((typ) => ({
      type: "VB",
      info: {
        type: "ability",
        verb:
          transitivity === "transitive"
            ? typ === "dyn"
              ? kawulDyn
              : kawulStat
            : typ === "dyn"
              ? kedulDyn
              : kedulStat,
        aspect,
      },
    })),
  );
}

function makeAuxPPart(
  transitivity: T.Transitivity,
  genNums: T.GenderNumber[],
): T.ParsedVBPBasic[] {
  const verbs =
    transitivity === "transitive"
      ? [kawulStat, kawulDyn]
      : [kedulStat, kedulDyn];
  return verbs.flatMap((verb) =>
    genNums.map((genNum) => ({
      type: "VB",
      info: {
        type: "ppart",
        genNum,
        verb,
      },
    })),
  );
}
