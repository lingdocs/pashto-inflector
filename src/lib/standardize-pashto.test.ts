/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { standardizePashto } from "./standardize-pashto";

const testPairs = [
  ["گوگل", "ګوګل"],
  ["پك", "پک"],
  ["ځير", "ځیر"],
  ["چې یې راغی، ده ورمنډه کړه.", "چې یې راغی، ده ورمنډه کړه."],
  ["سړی.", "سړی."],
  ["زما پلار خو په جنت کښې دى.", "زما پلار خو په جنت کښې دی."],
  ["حتیٰ", "حتیٰ"],
  ["چېرته دى؟", "چېرته دی؟"],
  ["آب", "آب"],
  ["مفہوم", "مفهوم"],
  ["مفھوم", "مفهوم"],
  ["راکوي؛", "راکوي؛"],
  ["راکوي!", "راکوي!"],
  ["راکوي.", "راکوي."],
];

testPairs.forEach((pair) => {
  test(`${pair[0]} should be converted to ${pair[1]}`, () => {
    const result = standardizePashto(pair[0]);
    expect(result).toBe(pair[1]);
  });
});
