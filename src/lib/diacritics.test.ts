/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    addDiacritics,
    splitFIntoPhonemes,
} from "./diacritics";
import * as T from "../types";

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

const diacriticsTest: Array<{
    in: T.PsString,
    out: string,
}> = [
    {
        in: {
            p: "کور",
            f: "kor",
        },
        out: "کور",
    },
    {
        in: {
            p: "کور",
            f: "koor",
        },
        out: "کُور",
    },
    {
        in: {
            p: "تب",
            f: "tib",
        },
        out: "تِب",
    },
    {
        in: {
            p: "تب",
            f: "tab",
        },
        out: "تَب",
    },
    {
        in: {
            p: "تب",
            f: "tUb",
        },
        out: "تُب",
    },
    {
        in: {
            p: "تب",
            f: "tub",
        },
        out: "تٙب",
    },
    {
        in: {
            p: "تب",
            f: "tb",
        },
        out: "تْب",
    },
    {
        in: {
            p: "تلب",
            f: "tilab",
        },
        out: "تِلَب",
    },
    {
        in: {
            p: "تشناب",
            f: "tashnaab",
        },
        out: "تَشْناب",
    },
];

const brokenDiacritics = [
    {
        p: "تشناب",
        f: "peshnaab",
    },
];

phonemeSplits.forEach((s) => {
    test(`${s.in} should split properly`, () => {
        const result = splitFIntoPhonemes(s.in);
        expect(result).toEqual(s.out);
    });
});

test("bad phonetic characters should throw an error", () => {
    badPhonetics.forEach((s) => {
        expect(() => {
            splitFIntoPhonemes(s.in);
        }).toThrow(`illegal phonetic character: ${s.problem}`);
    });
});

test("adding diacritics should work", () => {
    diacriticsTest.forEach((t) => {
        expect(addDiacritics(t.in)).toEqual({ p: t.out, f: t.in.f });
    });
});

test("adding diacritics errors when phonetecs and pashto do not line up", () => {
    brokenDiacritics.forEach((t) => {
        expect(() => {
            addDiacritics(t);
        }).toThrow();
    });
});
