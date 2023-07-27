import {
  splitFIntoPhonemes,
  last,
  addP,
  lastNonWhitespace,
  reverseP,
} from "./diacritics-helpers";

const phonemeSplits: Array<{
  in: string;
  out: string[];
}> = [
  {
    in: "kor",
    out: ["k", "o", "r"],
  },
  {
    in: "raaghay",
    out: ["r", "aa", "gh", "ay"],
  },
  {
    in: "ist'imaal",
    out: ["i", "s", "t", "'", "i", "m", "aa", "l"],
  },
  {
    in: "hatsa",
    out: ["h", "a", "ts", "a"],
  },
  {
    in: "ba",
    out: ["b", "a"],
  },
  {
    in: "paydáa",
    out: ["p", "ay", "d", "aa"],
  },
  {
    in: "be kaar",
    out: ["b", "e", "k", "aa", "r"],
  },
  {
    in: "raadzey",
    out: ["r", "aa", "dz", "ey"],
  },
  {
    in: "badanuy ??",
    out: ["b", "a", "d", "a", "n", "uy"],
  },
  {
    in: "tur ... pore",
    out: ["t", "u", "r", "p", "o", "r", "e"],
  },
  {
    in: "daar-Ul-iqaama",
    out: ["d", "aa", "r", "-Ul-", "i", "q", "aa", "m", "a"],
  },
];

phonemeSplits.forEach((s) => {
  test(`${s.in} should split properly`, () => {
    const result = splitFIntoPhonemes(s.in);
    expect(result).toEqual(s.out);
  });
});

const badPhonetics: Array<{
  in: string;
  problem: string;
}> = [
  {
    in: "acar",
    problem: "c",
  },
  {
    in: "a7am",
    problem: "7",
  },
];

test("bad phonetic characters should throw an error", () => {
  badPhonetics.forEach((s) => {
    expect(() => {
      splitFIntoPhonemes(s.in);
    }).toThrow(`illegal phonetic character: ${s.problem}`);
  });
});

test("last should work", () => {
  expect(last("this")).toBe("s");
});

test("addP should work", () => {
  expect(addP("ت")({ pIn: "", pOut: "کر" })).toEqual({
    pIn: "",
    pOut: "کرت",
  });
});

test("lastNonWhiteSpace should work", () => {
  expect(lastNonWhitespace("تورن")).toBe("ن");
  expect(lastNonWhitespace("وست .. ")).toBe("ت");
  expect(lastNonWhitespace("د ... ")).toBe("د");
});

test("reverseP should work", () => {
  expect(
    reverseP({
      pIn: "کور",
      pOut: "تور ",
    })
  ).toEqual({
    pIn: " کور",
    pOut: "تور",
  });
  expect(
    reverseP({
      pIn: "کور",
      pOut: "تور ... ",
    })
  ).toEqual({
    pIn: " ... کور",
    pOut: "تور",
  });
  expect(
    reverseP({
      pIn: "کور",
      pOut: "تور . ",
    })
  ).toEqual({
    pIn: " . کور",
    pOut: "تور",
  });
});
