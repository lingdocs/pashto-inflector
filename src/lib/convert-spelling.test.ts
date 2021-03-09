/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  convertAfToPkSpelling,
  convertPkToAfSpelling,
} from "./convert-spelling";

const pairs = [
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

pairs.forEach((pair) => {
  test(`${pair[0]} should be converted to ${pair[1]} in Pakistani spelling`, () => {
    const converted = convertAfToPkSpelling(pair[0]);
    expect(converted).toBe(pair[1]);
  });

  test(`${pair[1]} should be converted to ${pair[0]} in Afghan spelling`, () => {
    const converted = convertPkToAfSpelling(pair[1]);
    expect(converted).toBe(pair[0]);
  });
});
