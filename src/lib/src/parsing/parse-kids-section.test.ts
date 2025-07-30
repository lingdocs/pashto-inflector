import * as T from "../../../types";
import { parseKidsSection, parseOptKidsSection } from "./parse-kids-section";
import { tokenizer } from "./tokenizer";

const tests: {
  label: string;
  cases: {
    input: string;
    output: { err?: boolean; kids: T.ParsedKid[] }[];
    error?: true;
  }[];
}[] = [
  // TODO - with variations - only make the variations where it's actually going to be ambiguous
  {
    label: "basic kids section",
    cases: [
      {
        input: "به",
        output: [{ kids: ["ba"] }],
      },
      {
        input: "به دې",
        // NOTE: output will actually be the varients [["ba", ["ba", "de"]]]
        output: [{ kids: ["ba"] }, { kids: ["ba", "de"] }],
      },
      {
        input: "",
        output: [],
      },
      {
        input: "مې دې یې",
        output: [
          { kids: ["me"] },
          { kids: ["me", "de"] },
          { kids: ["me", "de", "ye"] },
        ],
      },
      // don't do the variences in stopping early if the next kid can only be a kid
      {
        input: "به مو",
        output: [{ kids: ["ba", "mU"] }],
      },
      {
        input: "دې به مې",
        output: [{ kids: ["de", "ba", "me"], err: true }],
        error: true,
      },
      {
        input: "مې یې",
        output: [{ kids: ["me"] }, { kids: ["me", "ye"] }],
      },
      {
        input: "دې مې",
        output: [{ kids: ["de", "me"], err: true }],
        error: true,
      },
    ],
  },
  {
    label: "can parse kids section when tokens come after",
    cases: [
      {
        input: "به سړی",
        output: [{ kids: ["ba"] }],
      },
      {
        input: "مې دې واخیسته",
        output: [{ kids: ["me"] }, { kids: ["me", "de"] }],
      },
    ],
  },
];

const testsForOpt: {
  label: string;
  cases: {
    input: string;
    output: ({ err?: boolean; kids: T.ParsedKid[] } | undefined)[];
    error?: true;
  }[];
}[] = [
  {
    label: "Parse optional kids section",
    cases: [
      {
        input: "زه ځم",
        output: [undefined],
      },
      {
        input: "یې",
        output: [{ kids: ["ye"] }, undefined],
      },
    ],
  },
];

tests.forEach(({ label, cases }) => {
  test(label, () => {
    cases.forEach(({ input, output }) => {
      const tokens = tokenizer(input);
      const parsed = parseKidsSection(tokens, [], []);
      const parsedFromOpt = parseOptKidsSection(tokens);
      if (output.length) {
        expect(
          parsed.map((x) => ({
            kids: x.body.kids,
            ...(!!x.errors.length ? { err: true } : {}),
          })),
        ).toEqual(output);
        expect(
          parsedFromOpt.map((x) => ({
            kids: x.body?.kids,
            ...(!!x.errors.length ? { err: true } : {}),
          })),
        ).toEqual([...output, { kids: undefined }]);
      }
    });
  });
});

testsForOpt.forEach(({ label, cases }) => {
  test(label, () => {
    cases.forEach(({ input, output }) => {
      const tokens = tokenizer(input);
      const parsed = parseOptKidsSection(tokens);
      if (output === undefined) {
        expect(parsed.length).toBe(1);
        expect(parsed[0].body).toBe(undefined);
      }
    });
  });
});
