import * as T from "../../../types";
import { parseKidsSection } from "./parse-kids-section";
import { tokenizer } from "./tokenizer";

const tests: {
  label: string;
  cases: {
    input: string;
    output: T.ParsedKid[];
    error?: boolean;
  }[];
}[] = [
  {
    label: "basic kids section",
    cases: [
      {
        input: "به",
        output: ["ba"],
      },
      {
        input: "به دې",
        output: ["ba", "de"],
      },
      {
        input: "",
        output: [],
      },
      {
        input: "مې دې یې",
        output: ["me", "de", "ye"],
      },
      {
        input: "دې به مې",
        output: ["de", "ba", "me"],
        error: true,
      },
      {
        input: "مې یې",
        output: ["me", "ye"],
      },
      {
        input: "دې مې",
        output: ["de", "me"],
        error: true,
      },
    ],
  },
  {
    label: "can parse kids section when tokens come after",
    cases: [
      {
        input: "به سړی",
        output: ["ba"],
      },
      {
        input: "مې دې واخیسته",
        output: ["me", "de"],
      },
    ],
  },
];

tests.forEach(({ label, cases }) => {
  test(label, () => {
    cases.forEach(({ input, output, error }) => {
      const tokens = tokenizer(input);
      const parsed = parseKidsSection(tokens, [], []);
      if (output.length) {
        expect(parsed.length).toBe(1);
        expect(parsed.map((x) => x.body.kids)).toEqual(
          output.length ? [output] : []
        );
        if (error) {
          expect(parsed[0].errors.length).toBeTruthy();
        } else {
          expect(parsed[0].errors.length).toBe(0);
        }
      }
    });
  });
});
