/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { makePsString } from "./p-text-helpers";
import { 
    accentOnFront,
    accentPastParticiple,
    accentFSylsOnNFromEnd,
    accentOnNFromEnd,
    splitUpSyllables,
    hasAccents,
} from "./accent-helpers";

const toAccentFront = [
    {
        input: makePsString("پرېښودل", "prexodúl"),
        output: makePsString("پرېښودل", "préxodul"),
    },
    {
        input: {
            long: makePsString("وګرځېد", "oogurdzed"),
            short: makePsString("وګرځ", "oogurdz"),
        },
        output: {
            long: makePsString("وګرځېد", "óogurdzed"),
            short: makePsString("وګرځ", "óogurdz"),
        },
    },
];

test(`accentOnFront should work`, () => {
    toAccentFront.forEach((item) => {
        expect(accentOnFront(item.input)).toEqual(item.output);
    });
});

const toAccentPastParticiple = [
    {
        input: makePsString("پرېښی", "prexey"),
        output: makePsString("پرېښی", "préxey"),
    },
    {
        input: makePsString("ازمویلی", "azmoyuley"),
        output: makePsString("ازمویلی", "azmóyuley"),
    },
];

test(`accentPastParticiple should work`, () => {
    toAccentPastParticiple.forEach((item) => {
        expect(accentPastParticiple(item.input)).toEqual(item.output);
    });
});

test(`splitUpSyllables should work`, () => {
    expect(splitUpSyllables("akheestul")).toEqual(["akh", "eest", "ul"]);
});

test(`accentOnFSylsOnNFromEnd should work`, () => {
    expect(accentFSylsOnNFromEnd(["pu", "xtaa", "nu"], 0)).toBe("puxtaanú");
    expect(accentFSylsOnNFromEnd(["leed", "ul", "ey"], 1)).toBe("leedúley");
});

test(`accentOnNFromEnd should work`, () => {
    expect(accentOnNFromEnd({ p: "پښتانه", f: "puxtaanu" }, 0)).toEqual({
        p: "پښتانه",
        f: "puxtaanú",
    });
    expect(accentOnNFromEnd({ p: "لیدلی", f: "leedúley" }, 1)).toEqual({
        p: "لیدلی",
        f: "leedúley",
    });
});

test(`has accents should work`, () => {
    const accents = ["koRanúy", "wutáaq", "gÚta", "taté", "bít", "sóra", "kúcha"];
    const noAccents = ["koRanuy", "wutaaq", "gUta", "tate", "bit", "sora", "kucha"];
    accents.forEach((x) => {
        expect(hasAccents(x)).toBe(true);
    });
    noAccents.forEach((x) => {
        expect(hasAccents(x)).toBe(false);
    });
})
