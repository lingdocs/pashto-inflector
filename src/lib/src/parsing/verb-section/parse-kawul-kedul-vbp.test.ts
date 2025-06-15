import * as T from "../../../../types";
import { tokenizer } from "../tokenizer";
import { kawulDyn, kawulStat, kedulStat, kedulDyn } from "./irreg-verbs";
import { parseKawulKedulVBP } from "./parse-kawul-kedul-vbp";

type Section = {
  ph: T.ParsedPH | undefined;
  input: string;
  output: T.ParsedVBP[];
}[];

const oo: T.ParsedPH = {
  type: "PH",
  s: "و",
};

const kawulPPart: Section = [
  {
    ph: undefined,
    input: "کړی",
    output: makeAuxPPart("transitive", [
      { gender: "masc", number: "singular" },
    ]),
  },
  {
    ph: oo,
    input: "کړی",
    output: [],
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

const sections = {
  kawulPPart,
  kedulPPart,
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

function makeAuxPPart(
  transitivity: T.Transitivity,
  genNums: T.GenderNumber[],
): T.ParsedVBP[] {
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
