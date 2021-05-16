import {
    splitFIntoPhonemes,
    last,
    addP,
    lastNonWhitespace,
    advanceP,
    reverseP,
    overwriteP,
    advanceForAin,
    advanceForAinOrHamza,
    advanceForHamzaMid,
} from "./diacritics-helpers";

const phonemeSplits: Array<{
    in: string,
    out: string[],
}> = [
    {
        in: "kor",
        out: ["k", "o", "r"],
    },
    {
        in: "raaghey",
        out: ["r", "aa", "gh", "ey"],
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
        in: "peydáa",
        out: ["p", "ey", "d", "aa"],
    },
    {
        in: "be kaar",
        out: ["b", "e", "k", "aa", "r"],
    },
    {
        in: "raadzeyy",
        out: ["r", "aa", "dz", "eyy"],
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
    in: string,
    problem: string,
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
    expect(reverseP({
        pIn: "کور",
        pOut: "تور ",
    })).toEqual({
        pIn: " کور",
        pOut: "تور",
    });
    expect(reverseP({
        pIn: "کور",
        pOut: "تور ... ",
    })).toEqual({
        pIn: " ... کور",
        pOut: "تور",
    });
    expect(reverseP({
        pIn: "کور",
        pOut: "تور . ",
    })).toEqual({
        pIn: " . کور",
        pOut: "تور",
    });
})