/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  convertSpelling,
  revertSpelling,
} from "./convert-spelling";

const pairsWPakistaniUndotted = [
  ["سړی", "سړے"],
  ["موسیٰ", "موسیٰ"],
  ["فرمايي", "فرمائی"],
  ["چای", "چائ"],
  ["زوی", "زوئ"],
  ["ښويېدل", "ښوئېدل"],
  ["ويي", "وئی"],
  ["دوستي", "دوستی"],
  ["هييت", "هييت"],
  ["ښيي", "ښيی"],
  ["ستاينه", "ستائينه"],
  ["فرمايل", "فرمائيل"],
  ["ضمائر", "ضمائر"],
];

const pairsWPakistaniDotted = [
  ["سړی", "سړے"],
  ["موسیٰ", "موسیٰ"],
  ["فرمايي", "فرمائي"],
  ["چای", "چائ"],
  ["زوی", "زوئ"],
  ["ښويېدل", "ښوئېدل"],
  ["ويي", "وئي"],
  ["دوستي", "دوستي"],
  ["هييت", "هييت"],
  ["ښيي", "ښيي"],
  ["ستاينه", "ستائينه"],
  ["فرمايل", "فرمائيل"],
  ["ضمائر", "ضمائر"],
];

pairsWPakistaniDotted.forEach((pair) => {
  test(`${pair[0]} should be converted to ${pair[1]} in Pakistani ي spelling`, () => {
    const converted = convertSpelling(pair[0], "Pakistani ي");
    expect(converted).toBe(pair[1]);
  });
  test(`${pair[1]} should be reverted to ${pair[0]} in Pakistani ي spelling`, () => {
    const reverted = revertSpelling(pair[1], "Pakistani ي");
    expect(reverted).toBe(pair[0]);
  });
});

pairsWPakistaniUndotted.forEach((pair) => {
  test(`${pair[0]} should be converted to ${pair[1]} in Pakistani ی spelling`, () => {
    const converted = convertSpelling(pair[0], "Pakistani ی");
    expect(converted).toBe(pair[1]);
  });
  test(`${pair[0]} should stay the same`, () => {
    const converted = convertSpelling(pair[0], "Afghan");
    expect(converted).toBe(pair[0]);
  });
  test(`${pair[1]} should be reverted to ${pair[0]} in Pakistani ی spelling`, () => {
    const reverted = revertSpelling(pair[1], "Pakistani ی");
    expect(reverted).toBe(pair[0]);
  });
});
