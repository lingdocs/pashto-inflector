/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { makePsString } from "./accent-and-ps-utils";
import {
  accentOnFront,
  accentPastParticiple,
  accentFSylsOnNFromEnd,
  accentOnNFromEnd,
  splitUpSyllables,
  hasAccents,
  countSyllables,
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
    input: makePsString("پرېښی", "prexay"),
    output: makePsString("پرېښی", "préxay"),
  },
  {
    input: makePsString("ازمویلی", "azmoyulay"),
    output: makePsString("ازمویلی", "azmóyulay"),
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

test("countSyllables", () => {
  expect(countSyllables("saRáy")).toEqual(2);
  expect(countSyllables("saRay")).toEqual(2);
  expect(countSyllables("zRú")).toEqual(1);
  expect(countSyllables("zRu")).toEqual(1);
  expect(countSyllables("zRU")).toEqual(1);
  expect(countSyllables("tbtkz")).toEqual(0);
  expect(countSyllables({ p: "اونۍ", f: "onúy, ownúy" })).toEqual(2);
});

test(`accentOnFSylsOnNFromEnd should work`, () => {
  expect(accentFSylsOnNFromEnd(["pu", "xtaa", "nu"], 0)).toBe("puxtaanú");
  expect(accentFSylsOnNFromEnd(["leed", "ul", "ay"], 1)).toBe("leedúlay");
});

test(`accentOnNFromEnd should work`, () => {
  expect(accentOnNFromEnd({ p: "پښتانه", f: "puxtaanu" }, 0)).toEqual({
    p: "پښتانه",
    f: "puxtaanú",
  });
  expect(accentOnNFromEnd({ p: "لیدلی", f: "leedúlay" }, 1)).toEqual({
    p: "لیدلی",
    f: "leedúlay",
  });
});

test(`has accents should work`, () => {
  const accents = ["koRanúy", "wutáaq", "gÚta", "taté", "bít", "sóra", "kúcha"];
  const noAccents = [
    "koRanuy",
    "wutaaq",
    "gUta",
    "tate",
    "bit",
    "sora",
    "kucha",
  ];
  accents.forEach((x) => {
    expect(hasAccents(x)).toBe(true);
  });
  noAccents.forEach((x) => {
    expect(hasAccents(x)).toBe(false);
  });
});
