/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { makePsString, removeFVarients } from "./accent-and-ps-utils";
import {
  concatPsString,
  removeEndingL,
  yulEndingInfinitive,
  mapVerbBlock,
  allMascFirstInflection,
  addToForm,
  unisexInfToObjectMatrix,
  complementInflects,
  concatInflections,
  psStringEquals,
  removeRetroflexR,
  splitDoubleWord,
  endsInConsonant,
  addOEnding,
  endsInShwa,
  splitPsByVarients,
  endsWith,
  trimOffPs,
  undoAaXuPattern,
  lastVowelNotA,
} from "./p-text-helpers";
import * as T from "../../types";
import { pastEndings } from "./grammar-units";

test(`concatPsString should work`, () => {
  const input = concatPsString(
    { p: "لیکل", f: "leekul" },
    undefined,
    { p: "ی", f: "ay" },
    " ",
    { p: "دی", f: "day" }
  );
  expect(input).toEqual({ p: "لیکلی دی", f: "leekulay day" });
  // test with length options added
  const inputWLength = concatPsString({ p: "خفه", f: "khufa" }, " ", {
    short: { p: "کړو", f: "kRo" },
    long: { p: "کړلو", f: "kRulo" },
  });
  expect(inputWLength).toEqual({
    short: { p: "خفه کړو", f: "khufa kRo" },
    long: { p: "خفه کړلو", f: "khufa kRulo" },
  });
  // even with minin
  const inputWMini = concatPsString(
    { p: "خفه", f: "khufa" },
    " ",
    {
      short: { p: "کړی", f: "kRay" },
      long: { p: "کړلی", f: "kRulay" },
    },
    " ",
    {
      mini: { p: "کو", f: "ko" },
      short: { p: "کړو", f: "kRo" },
      long: { p: "کړلو", f: "kRulo" },
    }
  );
  expect(inputWMini).toEqual({
    mini: { p: "خفه کړی کو", f: "khufa kRay ko" },
    short: { p: "خفه کړی کړو", f: "khufa kRay kRo" },
    long: { p: "خفه کړلی کړلو", f: "khufa kRulay kRulo" },
  });
  // also with personInflections
  const inputWPersInfs = concatPsString(
    {
      mascSing: { p: "پوخ", f: "pokh" },
      mascPlur: { p: "پاخه", f: "paakhu" },
      femSing: { p: "پخه", f: "pakha" },
      femPlur: { p: "پخې", f: "pakhe" },
    },
    " ",
    {
      short: { p: "ک", f: "k" },
      long: { p: "کړ", f: "kR" },
    }
  );
  expect(inputWPersInfs).toEqual({
    mascSing: {
      short: { p: "پوخ ک", f: "pokh k" },
      long: { p: "پوخ کړ", f: "pokh kR" },
    },
    mascPlur: {
      short: { p: "پاخه ک", f: "paakhu k" },
      long: { p: "پاخه کړ", f: "paakhu kR" },
    },
    femSing: {
      short: { p: "پخه ک", f: "pakha k" },
      long: { p: "پخه کړ", f: "pakha kR" },
    },
    femPlur: {
      short: { p: "پخې ک", f: "pakhe k" },
      long: { p: "پخې کړ", f: "pakhe kR" },
    },
  });
});

test(`addToForm should work`, () => {
  const block: T.VerbBlock = [
    [[{ p: "شوی", f: "shuway" }], [{ p: "شوي", f: "shuwee" }]],
    [[{ p: "شوې", f: "shuwe" }], [{ p: "شوې", f: "shuwe" }]],
    [[{ p: "شوی", f: "shuway" }], [{ p: "شوي", f: "shuwee" }]],
    [[{ p: "شوې", f: "shuwe" }], [{ p: "شوې", f: "shuwe" }]],
    [[{ p: "شوی", f: "shuway" }], [{ p: "شوي", f: "shuwee" }]],
    [[{ p: "شوې", f: "shuwe" }], [{ p: "شوې", f: "shuwe" }]],
  ];
  const result = addToForm([{ p: "خفه", f: "khufa" }, " "], block);
  expect(result).toEqual([
    [
      [{ p: "خفه شوی", f: "khufa shuway" }],
      [{ p: "خفه شوي", f: "khufa shuwee" }],
    ],
    [
      [{ p: "خفه شوې", f: "khufa shuwe" }],
      [{ p: "خفه شوې", f: "khufa shuwe" }],
    ],
    [
      [{ p: "خفه شوی", f: "khufa shuway" }],
      [{ p: "خفه شوي", f: "khufa shuwee" }],
    ],
    [
      [{ p: "خفه شوې", f: "khufa shuwe" }],
      [{ p: "خفه شوې", f: "khufa shuwe" }],
    ],
    [
      [{ p: "خفه شوی", f: "khufa shuway" }],
      [{ p: "خفه شوي", f: "khufa shuwee" }],
    ],
    [
      [{ p: "خفه شوې", f: "khufa shuwe" }],
      [{ p: "خفه شوې", f: "khufa shuwe" }],
    ],
  ]);
  const result2 = addToForm(
    [
      {
        short: { p: "کړی", f: "kRay" },
        long: { p: "کړلی", f: "kRulay" },
      },
      " ",
    ],
    block
  );
  expect(result2).toEqual({
    short: [
      [
        [{ p: "کړی شوی", f: "kRay shuway" }],
        [{ p: "کړی شوي", f: "kRay shuwee" }],
      ],
      [
        [{ p: "کړی شوې", f: "kRay shuwe" }],
        [{ p: "کړی شوې", f: "kRay shuwe" }],
      ],
      [
        [{ p: "کړی شوی", f: "kRay shuway" }],
        [{ p: "کړی شوي", f: "kRay shuwee" }],
      ],
      [
        [{ p: "کړی شوې", f: "kRay shuwe" }],
        [{ p: "کړی شوې", f: "kRay shuwe" }],
      ],
      [
        [{ p: "کړی شوی", f: "kRay shuway" }],
        [{ p: "کړی شوي", f: "kRay shuwee" }],
      ],
      [
        [{ p: "کړی شوې", f: "kRay shuwe" }],
        [{ p: "کړی شوې", f: "kRay shuwe" }],
      ],
    ],
    long: [
      [
        [{ p: "کړلی شوی", f: "kRulay shuway" }],
        [{ p: "کړلی شوي", f: "kRulay shuwee" }],
      ],
      [
        [{ p: "کړلی شوې", f: "kRulay shuwe" }],
        [{ p: "کړلی شوې", f: "kRulay shuwe" }],
      ],
      [
        [{ p: "کړلی شوی", f: "kRulay shuway" }],
        [{ p: "کړلی شوي", f: "kRulay shuwee" }],
      ],
      [
        [{ p: "کړلی شوې", f: "kRulay shuwe" }],
        [{ p: "کړلی شوې", f: "kRulay shuwe" }],
      ],
      [
        [{ p: "کړلی شوی", f: "kRulay shuway" }],
        [{ p: "کړلی شوي", f: "kRulay shuwee" }],
      ],
      [
        [{ p: "کړلی شوې", f: "kRulay shuwe" }],
        [{ p: "کړلی شوې", f: "kRulay shuwe" }],
      ],
    ],
  });
  const result3 = addToForm(
    [
      {
        masc: [
          [{ p: "زوړ", f: "zoR" }],
          [{ p: "زاړه", f: "zaaRu" }],
          [{ p: "زړو", f: "zaRo" }],
        ],
        fem: [
          [{ p: "زړه", f: "zaRa" }],
          [{ p: "زړې", f: "zaRe" }],
          [{ p: "زړو", f: "zaRo" }],
        ],
      },
      " ",
      [
        { p: "کړل", f: "kRul" },
        {
          short: { p: "کړی", f: "kRay" },
          long: { p: "کړلی", f: "kRulay" },
        },
      ],
      " ",
    ],
    block
  );
  const expected3 = {
    long: [
      [
        [
          { p: "زوړ کړل شوی", f: "zoR kRul shuway" },
          { p: "زوړ کړلی شوی", f: "zoR kRulay shuway" },
        ],
        [
          { p: "زاړه کړل شوي", f: "zaaRu kRul shuwee" },
          { p: "زاړه کړلی شوي", f: "zaaRu kRulay shuwee" },
        ],
      ],
      [
        [
          { p: "زړه کړل شوې", f: "zaRa kRul shuwe" },
          { p: "زړه کړلی شوې", f: "zaRa kRulay shuwe" },
        ],
        [
          { p: "زړې کړل شوې", f: "zaRe kRul shuwe" },
          { p: "زړې کړلی شوې", f: "zaRe kRulay shuwe" },
        ],
      ],
      [
        [
          { p: "زوړ کړل شوی", f: "zoR kRul shuway" },
          { p: "زوړ کړلی شوی", f: "zoR kRulay shuway" },
        ],
        [
          { p: "زاړه کړل شوي", f: "zaaRu kRul shuwee" },
          { p: "زاړه کړلی شوي", f: "zaaRu kRulay shuwee" },
        ],
      ],
      [
        [
          { p: "زړه کړل شوې", f: "zaRa kRul shuwe" },
          { p: "زړه کړلی شوې", f: "zaRa kRulay shuwe" },
        ],
        [
          { p: "زړې کړل شوې", f: "zaRe kRul shuwe" },
          { p: "زړې کړلی شوې", f: "zaRe kRulay shuwe" },
        ],
      ],
      [
        [
          { p: "زوړ کړل شوی", f: "zoR kRul shuway" },
          { p: "زوړ کړلی شوی", f: "zoR kRulay shuway" },
        ],
        [
          { p: "زاړه کړل شوي", f: "zaaRu kRul shuwee" },
          { p: "زاړه کړلی شوي", f: "zaaRu kRulay shuwee" },
        ],
      ],
      [
        [
          { p: "زړه کړل شوې", f: "zaRa kRul shuwe" },
          { p: "زړه کړلی شوې", f: "zaRa kRulay shuwe" },
        ],
        [
          { p: "زړې کړل شوې", f: "zaRe kRul shuwe" },
          { p: "زړې کړلی شوې", f: "zaRe kRulay shuwe" },
        ],
      ],
    ],
    short: [
      [
        [
          { p: "زوړ کړل شوی", f: "zoR kRul shuway" },
          { p: "زوړ کړی شوی", f: "zoR kRay shuway" },
        ],
        [
          { p: "زاړه کړل شوي", f: "zaaRu kRul shuwee" },
          { p: "زاړه کړی شوي", f: "zaaRu kRay shuwee" },
        ],
      ],
      [
        [
          { p: "زړه کړل شوې", f: "zaRa kRul shuwe" },
          { p: "زړه کړی شوې", f: "zaRa kRay shuwe" },
        ],
        [
          { p: "زړې کړل شوې", f: "zaRe kRul shuwe" },
          { p: "زړې کړی شوې", f: "zaRe kRay shuwe" },
        ],
      ],
      [
        [
          { p: "زوړ کړل شوی", f: "zoR kRul shuway" },
          { p: "زوړ کړی شوی", f: "zoR kRay shuway" },
        ],
        [
          { p: "زاړه کړل شوي", f: "zaaRu kRul shuwee" },
          { p: "زاړه کړی شوي", f: "zaaRu kRay shuwee" },
        ],
      ],
      [
        [
          { p: "زړه کړل شوې", f: "zaRa kRul shuwe" },
          { p: "زړه کړی شوې", f: "zaRa kRay shuwe" },
        ],
        [
          { p: "زړې کړل شوې", f: "zaRe kRul shuwe" },
          { p: "زړې کړی شوې", f: "zaRe kRay shuwe" },
        ],
      ],
      [
        [
          { p: "زوړ کړل شوی", f: "zoR kRul shuway" },
          { p: "زوړ کړی شوی", f: "zoR kRay shuway" },
        ],
        [
          { p: "زاړه کړل شوي", f: "zaaRu kRul shuwee" },
          { p: "زاړه کړی شوي", f: "zaaRu kRay shuwee" },
        ],
      ],
      [
        [
          { p: "زړه کړل شوې", f: "zaRa kRul shuwe" },
          { p: "زړه کړی شوې", f: "zaRa kRay shuwe" },
        ],
        [
          { p: "زړې کړل شوې", f: "zaRe kRul shuwe" },
          { p: "زړې کړی شوې", f: "zaRe kRay shuwe" },
        ],
      ],
    ],
  };
  expect(result3).toEqual(expected3);
  // check with imperative
  const impFormIntrans: T.ImperativeForm = [
    [[{ p: "شه", f: "sha" }], [{ p: "شئ", f: "shey" }]],
    [[{ p: "شه", f: "sha" }], [{ p: "شئ", f: "shey" }]],
  ];
  const impFormTrans: T.ImperativeForm = [
    [[{ p: "کړه", f: "kRa" }], [{ p: "کړئ", f: "kRey" }]],
    [[{ p: "کړه", f: "kRa" }], [{ p: "کړئ", f: "kRey" }]],
  ];
  const impFormTransOpts: T.ImperativeForm = {
    short: [
      [[{ p: "که", f: "ka" }], [{ p: "کئ", f: "key" }]],
      [[{ p: "که", f: "ka" }], [{ p: "کئ", f: "key" }]],
    ],
    long: [
      [[{ p: "کړه", f: "kRa" }], [{ p: "کړئ", f: "kRey" }]],
      [[{ p: "کړه", f: "kRa" }], [{ p: "کړئ", f: "kRey" }]],
    ],
  };
  const unisexComp: T.UnisexInflections = {
    masc: [
      [{ p: "زوړ", f: "zoR" }],
      [{ p: "زاړه", f: "zaaRu" }],
      [{ p: "زړو", f: "zaRo" }],
    ],
    fem: [
      [{ p: "زړه", f: "zaRa" }],
      [{ p: "زړې", f: "zaRe" }],
      [{ p: "زړو", f: "zaRo" }],
    ],
  };
  const objectMatrix: T.OptionalPersonInflections<T.PsString> = {
    mascSing: { p: "زوړ", f: "zoR" },
    mascPlur: { p: "زاړه", f: "zaaRu" },
    femSing: { p: "زړه", f: "zaRa" },
    femPlur: { p: "زړې", f: "zaRe" },
  };
  expect(addToForm([unisexComp, " "], impFormIntrans)).toEqual([
    [[{ p: "زوړ شه", f: "zoR sha" }], [{ p: "زاړه شئ", f: "zaaRu shey" }]],
    [[{ p: "زړه شه", f: "zaRa sha" }], [{ p: "زړې شئ", f: "zaRe shey" }]],
  ]);
  expect(addToForm([objectMatrix, " "], impFormTrans)).toEqual({
    mascSing: [
      [[{ p: "زوړ کړه", f: "zoR kRa" }], [{ p: "زوړ کړئ", f: "zoR kRey" }]],
      [[{ p: "زوړ کړه", f: "zoR kRa" }], [{ p: "زوړ کړئ", f: "zoR kRey" }]],
    ],
    mascPlur: [
      [
        [{ p: "زاړه کړه", f: "zaaRu kRa" }],
        [{ p: "زاړه کړئ", f: "zaaRu kRey" }],
      ],
      [
        [{ p: "زاړه کړه", f: "zaaRu kRa" }],
        [{ p: "زاړه کړئ", f: "zaaRu kRey" }],
      ],
    ],
    femSing: [
      [[{ p: "زړه کړه", f: "zaRa kRa" }], [{ p: "زړه کړئ", f: "zaRa kRey" }]],
      [[{ p: "زړه کړه", f: "zaRa kRa" }], [{ p: "زړه کړئ", f: "zaRa kRey" }]],
    ],
    femPlur: [
      [[{ p: "زړې کړه", f: "zaRe kRa" }], [{ p: "زړې کړئ", f: "zaRe kRey" }]],
      [[{ p: "زړې کړه", f: "zaRe kRa" }], [{ p: "زړې کړئ", f: "zaRe kRey" }]],
    ],
  });
  expect(addToForm([objectMatrix, " "], impFormTransOpts)).toEqual({
    mascSing: {
      short: [
        [[{ p: "زوړ که", f: "zoR ka" }], [{ p: "زوړ کئ", f: "zoR key" }]],
        [[{ p: "زوړ که", f: "zoR ka" }], [{ p: "زوړ کئ", f: "zoR key" }]],
      ],
      long: [
        [[{ p: "زوړ کړه", f: "zoR kRa" }], [{ p: "زوړ کړئ", f: "zoR kRey" }]],
        [[{ p: "زوړ کړه", f: "zoR kRa" }], [{ p: "زوړ کړئ", f: "zoR kRey" }]],
      ],
    },
    mascPlur: {
      short: [
        [[{ p: "زاړه که", f: "zaaRu ka" }], [{ p: "زاړه کئ", f: "zaaRu key" }]],
        [[{ p: "زاړه که", f: "zaaRu ka" }], [{ p: "زاړه کئ", f: "zaaRu key" }]],
      ],
      long: [
        [
          [{ p: "زاړه کړه", f: "zaaRu kRa" }],
          [{ p: "زاړه کړئ", f: "zaaRu kRey" }],
        ],
        [
          [{ p: "زاړه کړه", f: "zaaRu kRa" }],
          [{ p: "زاړه کړئ", f: "zaaRu kRey" }],
        ],
      ],
    },
    femSing: {
      short: [
        [[{ p: "زړه که", f: "zaRa ka" }], [{ p: "زړه کئ", f: "zaRa key" }]],
        [[{ p: "زړه که", f: "zaRa ka" }], [{ p: "زړه کئ", f: "zaRa key" }]],
      ],
      long: [
        [[{ p: "زړه کړه", f: "zaRa kRa" }], [{ p: "زړه کړئ", f: "zaRa kRey" }]],
        [[{ p: "زړه کړه", f: "zaRa kRa" }], [{ p: "زړه کړئ", f: "zaRa kRey" }]],
      ],
    },
    femPlur: {
      short: [
        [[{ p: "زړې که", f: "zaRe ka" }], [{ p: "زړې کئ", f: "zaRe key" }]],
        [[{ p: "زړې که", f: "zaRe ka" }], [{ p: "زړې کئ", f: "zaRe key" }]],
      ],
      long: [
        [[{ p: "زړې کړه", f: "zaRe kRa" }], [{ p: "زړې کړئ", f: "zaRe kRey" }]],
        [[{ p: "زړې کړه", f: "zaRe kRa" }], [{ p: "زړې کړئ", f: "zaRe kRey" }]],
      ],
    },
  });
  const matrixBase: T.VerbForm = {
    mascSing: [
      [
        [{ p: "ستړی کوم", f: "stuRay kawum" }],
        [{ p: "ستړی کوو", f: "stuRay kawoo" }],
      ],
      [
        [{ p: "ستړی کوم", f: "stuRay kawum" }],
        [{ p: "ستړی کوو", f: "stuRay kawoo" }],
      ],
      [
        [{ p: "ستړی کوې", f: "stuRay kawe" }],
        [{ p: "ستړی کوئ", f: "stuRay kawey" }],
      ],
      [
        [{ p: "ستړی کوې", f: "stuRay kawe" }],
        [{ p: "ستړی کوئ", f: "stuRay kawey" }],
      ],
      [
        [{ p: "ستړی کوي", f: "stuRay kawee" }],
        [{ p: "ستړی کوي", f: "stuRay kawee" }],
      ],
      [
        [{ p: "ستړی کوي", f: "stuRay kawee" }],
        [{ p: "ستړی کوي", f: "stuRay kawee" }],
      ],
    ],
    mascPlur: [
      [
        [{ p: "ستړي ستړي کوم", f: "stuRee kawum" }],
        [{ p: "ستړي کوو", f: "stuRee kawoo" }],
      ],
      [
        [{ p: "ستړي ستړي کوم", f: "stuRee kawum" }],
        [{ p: "ستړي کوو", f: "stuRee kawoo" }],
      ],
      [
        [{ p: "ستړي ستړي کوې", f: "stuRee kawe" }],
        [{ p: "ستړي کوئ", f: "stuRee kawey" }],
      ],
      [
        [{ p: "ستړي ستړي کوې", f: "stuRee kawe" }],
        [{ p: "ستړي کوئ", f: "stuRee kawey" }],
      ],
      [
        [{ p: "ستړي ستړي کوي", f: "stuRee kawee" }],
        [{ p: "ستړي کوي", f: "stuRee kawee" }],
      ],
      [
        [{ p: "ستړي ستړي کوي", f: "stuRee kawee" }],
        [{ p: "ستړي کوي", f: "stuRee kawee" }],
      ],
    ],
    femSing: [
      [
        [{ p: "ستړې کوم", f: "stuRe kawum" }],
        [{ p: "ستړې کوو", f: "stuRe kawoo" }],
      ],
      [
        [{ p: "ستړې کوم", f: "stuRe kawum" }],
        [{ p: "ستړې کوو", f: "stuRe kawoo" }],
      ],
      [
        [{ p: "ستړې کوې", f: "stuRe kawe" }],
        [{ p: "ستړې کوئ", f: "stuRe kawey" }],
      ],
      [
        [{ p: "ستړې کوې", f: "stuRe kawe" }],
        [{ p: "ستړې کوئ", f: "stuRe kawey" }],
      ],
      [
        [{ p: "ستړې کوي", f: "stuRe kawee" }],
        [{ p: "ستړې کوي", f: "stuRe kawee" }],
      ],
      [
        [{ p: "ستړې کوي", f: "stuRe kawee" }],
        [{ p: "ستړې کوي", f: "stuRe kawee" }],
      ],
    ],
    femPlur: [
      [
        [{ p: "ستړې کوم", f: "stuRe kawum" }],
        [{ p: "ستړې کوو", f: "stuRe kawoo" }],
      ],
      [
        [{ p: "ستړې کوم", f: "stuRe kawum" }],
        [{ p: "ستړې کوو", f: "stuRe kawoo" }],
      ],
      [
        [{ p: "ستړې کوې", f: "stuRe kawe" }],
        [{ p: "ستړې کوئ", f: "stuRe kawey" }],
      ],
      [
        [{ p: "ستړې کوې", f: "stuRe kawe" }],
        [{ p: "ستړې کوئ", f: "stuRe kawey" }],
      ],
      [
        [{ p: "ستړې کوي", f: "stuRe kawee" }],
        [{ p: "ستړې کوي", f: "stuRe kawee" }],
      ],
      [
        [{ p: "ستړې کوي", f: "stuRe kawee" }],
        [{ p: "ستړې کوي", f: "stuRe kawee" }],
      ],
    ],
  };
  expect(
    addToForm([objectMatrix, " ", { p: "به", f: "ba" }, " "], matrixBase)
  ).toEqual({
    mascSing: [
      [
        [{ p: "زوړ به ستړی کوم", f: "zoR ba stuRay kawum" }],
        [{ p: "زوړ به ستړی کوو", f: "zoR ba stuRay kawoo" }],
      ],
      [
        [{ p: "زوړ به ستړی کوم", f: "zoR ba stuRay kawum" }],
        [{ p: "زوړ به ستړی کوو", f: "zoR ba stuRay kawoo" }],
      ],
      [
        [{ p: "زوړ به ستړی کوې", f: "zoR ba stuRay kawe" }],
        [{ p: "زوړ به ستړی کوئ", f: "zoR ba stuRay kawey" }],
      ],
      [
        [{ p: "زوړ به ستړی کوې", f: "zoR ba stuRay kawe" }],
        [{ p: "زوړ به ستړی کوئ", f: "zoR ba stuRay kawey" }],
      ],
      [
        [{ p: "زوړ به ستړی کوي", f: "zoR ba stuRay kawee" }],
        [{ p: "زوړ به ستړی کوي", f: "zoR ba stuRay kawee" }],
      ],
      [
        [{ p: "زوړ به ستړی کوي", f: "zoR ba stuRay kawee" }],
        [{ p: "زوړ به ستړی کوي", f: "zoR ba stuRay kawee" }],
      ],
    ],
    mascPlur: [
      [
        [{ p: "زاړه به ستړي ستړي کوم", f: "zaaRu ba stuRee kawum" }],
        [{ p: "زاړه به ستړي کوو", f: "zaaRu ba stuRee kawoo" }],
      ],
      [
        [{ p: "زاړه به ستړي ستړي کوم", f: "zaaRu ba stuRee kawum" }],
        [{ p: "زاړه به ستړي کوو", f: "zaaRu ba stuRee kawoo" }],
      ],
      [
        [{ p: "زاړه به ستړي ستړي کوې", f: "zaaRu ba stuRee kawe" }],
        [{ p: "زاړه به ستړي کوئ", f: "zaaRu ba stuRee kawey" }],
      ],
      [
        [{ p: "زاړه به ستړي ستړي کوې", f: "zaaRu ba stuRee kawe" }],
        [{ p: "زاړه به ستړي کوئ", f: "zaaRu ba stuRee kawey" }],
      ],
      [
        [{ p: "زاړه به ستړي ستړي کوي", f: "zaaRu ba stuRee kawee" }],
        [{ p: "زاړه به ستړي کوي", f: "zaaRu ba stuRee kawee" }],
      ],
      [
        [{ p: "زاړه به ستړي ستړي کوي", f: "zaaRu ba stuRee kawee" }],
        [{ p: "زاړه به ستړي کوي", f: "zaaRu ba stuRee kawee" }],
      ],
    ],
    femSing: [
      [
        [{ p: "زړه به ستړې کوم", f: "zaRa ba stuRe kawum" }],
        [{ p: "زړه به ستړې کوو", f: "zaRa ba stuRe kawoo" }],
      ],
      [
        [{ p: "زړه به ستړې کوم", f: "zaRa ba stuRe kawum" }],
        [{ p: "زړه به ستړې کوو", f: "zaRa ba stuRe kawoo" }],
      ],
      [
        [{ p: "زړه به ستړې کوې", f: "zaRa ba stuRe kawe" }],
        [{ p: "زړه به ستړې کوئ", f: "zaRa ba stuRe kawey" }],
      ],
      [
        [{ p: "زړه به ستړې کوې", f: "zaRa ba stuRe kawe" }],
        [{ p: "زړه به ستړې کوئ", f: "zaRa ba stuRe kawey" }],
      ],
      [
        [{ p: "زړه به ستړې کوي", f: "zaRa ba stuRe kawee" }],
        [{ p: "زړه به ستړې کوي", f: "zaRa ba stuRe kawee" }],
      ],
      [
        [{ p: "زړه به ستړې کوي", f: "zaRa ba stuRe kawee" }],
        [{ p: "زړه به ستړې کوي", f: "zaRa ba stuRe kawee" }],
      ],
    ],
    femPlur: [
      [
        [{ p: "زړې به ستړې کوم", f: "zaRe ba stuRe kawum" }],
        [{ p: "زړې به ستړې کوو", f: "zaRe ba stuRe kawoo" }],
      ],
      [
        [{ p: "زړې به ستړې کوم", f: "zaRe ba stuRe kawum" }],
        [{ p: "زړې به ستړې کوو", f: "zaRe ba stuRe kawoo" }],
      ],
      [
        [{ p: "زړې به ستړې کوې", f: "zaRe ba stuRe kawe" }],
        [{ p: "زړې به ستړې کوئ", f: "zaRe ba stuRe kawey" }],
      ],
      [
        [{ p: "زړې به ستړې کوې", f: "zaRe ba stuRe kawe" }],
        [{ p: "زړې به ستړې کوئ", f: "zaRe ba stuRe kawey" }],
      ],
      [
        [{ p: "زړې به ستړې کوي", f: "zaRe ba stuRe kawee" }],
        [{ p: "زړې به ستړې کوي", f: "zaRe ba stuRe kawee" }],
      ],
      [
        [{ p: "زړې به ستړې کوي", f: "zaRe ba stuRe kawee" }],
        [{ p: "زړې به ستړې کوي", f: "zaRe ba stuRe kawee" }],
      ],
    ],
  });
  const kawulSimpPast: T.VerbForm = {
    mini: [
      [[{ p: "کم", f: "kum" }], [{ p: "کو", f: "koo" }]],
      [[{ p: "کم", f: "kum" }], [{ p: "کو", f: "koo" }]],
      [[{ p: "کې", f: "ke" }], [{ p: "کئ", f: "key" }]],
      [[{ p: "کې", f: "ke" }], [{ p: "کئ", f: "key" }]],
      [
        [
          { p: "که", f: "ku" },
          { p: "کو", f: "ko" },
        ],
        [
          { p: "کړل", f: "kRul" },
          { p: "کو", f: "koo" },
        ],
      ],
      [[{ p: "که", f: "ka" }], [{ p: "کې", f: "ke" }]],
    ],
    short: [
      [[{ p: "کړم", f: "kRum" }], [{ p: "کړو", f: "kRoo" }]],
      [[{ p: "کړم", f: "kRum" }], [{ p: "کړو", f: "kRoo" }]],
      [[{ p: "کړې", f: "kRe" }], [{ p: "کړئ", f: "kRey" }]],
      [[{ p: "کړې", f: "kRe" }], [{ p: "کړئ", f: "kRey" }]],
      [
        [
          { p: "کړه", f: "kRu" },
          { p: "کړو", f: "kRo" },
          { p: "کړ", f: "kuR" },
        ],
        [
          { p: "کړل", f: "kRul" },
          { p: "کړو", f: "kRoo" },
        ],
      ],
      [[{ p: "کړه", f: "kRa" }], [{ p: "کړې", f: "kRe" }]],
    ],
    long: [
      [[{ p: "کړلم", f: "kRulum" }], [{ p: "کړلو", f: "kRuloo" }]],
      [[{ p: "کړلم", f: "kRulum" }], [{ p: "کړلو", f: "kRuloo" }]],
      [[{ p: "کړلې", f: "kRule" }], [{ p: "کړلئ", f: "kRuley" }]],
      [[{ p: "کړلې", f: "kRule" }], [{ p: "کړلئ", f: "kRuley" }]],
      [
        [
          { p: "کړله", f: "kRulu" },
          { p: "کړلو", f: "kRulo" },
        ],
        [
          { p: "کړل", f: "kRul" },
          { p: "کړلو", f: "kRuloo" },
        ],
      ],
      [[{ p: "کړله", f: "kRula" }], [{ p: "کړلې", f: "kRule" }]],
    ],
  };
  expect(addToForm([{ p: "به", f: "ba" }, " "], kawulSimpPast)).toEqual({
    mini: [
      [[{ p: "به کم", f: "ba kum" }], [{ p: "به کو", f: "ba koo" }]],
      [[{ p: "به کم", f: "ba kum" }], [{ p: "به کو", f: "ba koo" }]],
      [[{ p: "به کې", f: "ba ke" }], [{ p: "به کئ", f: "ba key" }]],
      [[{ p: "به کې", f: "ba ke" }], [{ p: "به کئ", f: "ba key" }]],
      [
        [
          { p: "به که", f: "ba ku" },
          { p: "به کو", f: "ba ko" },
        ],
        [
          { p: "به کړل", f: "ba kRul" },
          { p: "به کو", f: "ba koo" },
        ],
      ],
      [[{ p: "به که", f: "ba ka" }], [{ p: "به کې", f: "ba ke" }]],
    ],
    short: [
      [[{ p: "به کړم", f: "ba kRum" }], [{ p: "به کړو", f: "ba kRoo" }]],
      [[{ p: "به کړم", f: "ba kRum" }], [{ p: "به کړو", f: "ba kRoo" }]],
      [[{ p: "به کړې", f: "ba kRe" }], [{ p: "به کړئ", f: "ba kRey" }]],
      [[{ p: "به کړې", f: "ba kRe" }], [{ p: "به کړئ", f: "ba kRey" }]],
      [
        [
          { p: "به کړه", f: "ba kRu" },
          { p: "به کړو", f: "ba kRo" },
          { p: "به کړ", f: "ba kuR" },
        ],
        [
          { p: "به کړل", f: "ba kRul" },
          { p: "به کړو", f: "ba kRoo" },
        ],
      ],
      [[{ p: "به کړه", f: "ba kRa" }], [{ p: "به کړې", f: "ba kRe" }]],
    ],
    long: [
      [[{ p: "به کړلم", f: "ba kRulum" }], [{ p: "به کړلو", f: "ba kRuloo" }]],
      [[{ p: "به کړلم", f: "ba kRulum" }], [{ p: "به کړلو", f: "ba kRuloo" }]],
      [[{ p: "به کړلې", f: "ba kRule" }], [{ p: "به کړلئ", f: "ba kRuley" }]],
      [[{ p: "به کړلې", f: "ba kRule" }], [{ p: "به کړلئ", f: "ba kRuley" }]],
      [
        [
          { p: "به کړله", f: "ba kRulu" },
          { p: "به کړلو", f: "ba kRulo" },
        ],
        [
          { p: "به کړل", f: "ba kRul" },
          { p: "به کړلو", f: "ba kRuloo" },
        ],
      ],
      [[{ p: "به کړله", f: "ba kRula" }], [{ p: "به کړلې", f: "ba kRule" }]],
    ],
  });
  expect(
    addToForm(
      [
        {
          long: { p: "به", f: "ba" },
          short: { p: "ب", f: "b" },
        },
        " ",
      ],
      kawulSimpPast
    )
  ).toEqual({
    mini: [
      [[{ p: "ب کم", f: "b kum" }], [{ p: "ب کو", f: "b koo" }]],
      [[{ p: "ب کم", f: "b kum" }], [{ p: "ب کو", f: "b koo" }]],
      [[{ p: "ب کې", f: "b ke" }], [{ p: "ب کئ", f: "b key" }]],
      [[{ p: "ب کې", f: "b ke" }], [{ p: "ب کئ", f: "b key" }]],
      [
        [
          { p: "ب که", f: "b ku" },
          { p: "ب کو", f: "b ko" },
        ],
        [
          { p: "ب کړل", f: "b kRul" },
          { p: "ب کو", f: "b koo" },
        ],
      ],
      [[{ p: "ب که", f: "b ka" }], [{ p: "ب کې", f: "b ke" }]],
    ],
    short: [
      [[{ p: "ب کړم", f: "b kRum" }], [{ p: "ب کړو", f: "b kRoo" }]],
      [[{ p: "ب کړم", f: "b kRum" }], [{ p: "ب کړو", f: "b kRoo" }]],
      [[{ p: "ب کړې", f: "b kRe" }], [{ p: "ب کړئ", f: "b kRey" }]],
      [[{ p: "ب کړې", f: "b kRe" }], [{ p: "ب کړئ", f: "b kRey" }]],
      [
        [
          { p: "ب کړه", f: "b kRu" },
          { p: "ب کړو", f: "b kRo" },
          { p: "ب کړ", f: "b kuR" },
        ],
        [
          { p: "ب کړل", f: "b kRul" },
          { p: "ب کړو", f: "b kRoo" },
        ],
      ],
      [[{ p: "ب کړه", f: "b kRa" }], [{ p: "ب کړې", f: "b kRe" }]],
    ],
    long: [
      [[{ p: "به کړلم", f: "ba kRulum" }], [{ p: "به کړلو", f: "ba kRuloo" }]],
      [[{ p: "به کړلم", f: "ba kRulum" }], [{ p: "به کړلو", f: "ba kRuloo" }]],
      [[{ p: "به کړلې", f: "ba kRule" }], [{ p: "به کړلئ", f: "ba kRuley" }]],
      [[{ p: "به کړلې", f: "ba kRule" }], [{ p: "به کړلئ", f: "ba kRuley" }]],
      [
        [
          { p: "به کړله", f: "ba kRulu" },
          { p: "به کړلو", f: "ba kRulo" },
        ],
        [
          { p: "به کړل", f: "ba kRul" },
          { p: "به کړلو", f: "ba kRuloo" },
        ],
      ],
      [[{ p: "به کړله", f: "ba kRula" }], [{ p: "به کړلې", f: "ba kRule" }]],
    ],
  });
  expect(
    addToForm(
      [
        [
          {
            long: { p: "به", f: "ba" },
            short: { p: "ب", f: "b" },
          },
        ],
        " ",
      ],
      kawulSimpPast
    )
  ).toEqual({
    mini: [
      [[{ p: "ب کم", f: "b kum" }], [{ p: "ب کو", f: "b koo" }]],
      [[{ p: "ب کم", f: "b kum" }], [{ p: "ب کو", f: "b koo" }]],
      [[{ p: "ب کې", f: "b ke" }], [{ p: "ب کئ", f: "b key" }]],
      [[{ p: "ب کې", f: "b ke" }], [{ p: "ب کئ", f: "b key" }]],
      [
        [
          { p: "ب که", f: "b ku" },
          { p: "ب کو", f: "b ko" },
        ],
        [
          { p: "ب کړل", f: "b kRul" },
          { p: "ب کو", f: "b koo" },
        ],
      ],
      [[{ p: "ب که", f: "b ka" }], [{ p: "ب کې", f: "b ke" }]],
    ],
    short: [
      [[{ p: "ب کړم", f: "b kRum" }], [{ p: "ب کړو", f: "b kRoo" }]],
      [[{ p: "ب کړم", f: "b kRum" }], [{ p: "ب کړو", f: "b kRoo" }]],
      [[{ p: "ب کړې", f: "b kRe" }], [{ p: "ب کړئ", f: "b kRey" }]],
      [[{ p: "ب کړې", f: "b kRe" }], [{ p: "ب کړئ", f: "b kRey" }]],
      [
        [
          { p: "ب کړه", f: "b kRu" },
          { p: "ب کړو", f: "b kRo" },
          { p: "ب کړ", f: "b kuR" },
        ],
        [
          { p: "ب کړل", f: "b kRul" },
          { p: "ب کړو", f: "b kRoo" },
        ],
      ],
      [[{ p: "ب کړه", f: "b kRa" }], [{ p: "ب کړې", f: "b kRe" }]],
    ],
    long: [
      [[{ p: "به کړلم", f: "ba kRulum" }], [{ p: "به کړلو", f: "ba kRuloo" }]],
      [[{ p: "به کړلم", f: "ba kRulum" }], [{ p: "به کړلو", f: "ba kRuloo" }]],
      [[{ p: "به کړلې", f: "ba kRule" }], [{ p: "به کړلئ", f: "ba kRuley" }]],
      [[{ p: "به کړلې", f: "ba kRule" }], [{ p: "به کړلئ", f: "ba kRuley" }]],
      [
        [
          { p: "به کړله", f: "ba kRulu" },
          { p: "به کړلو", f: "ba kRulo" },
        ],
        [
          { p: "به کړل", f: "ba kRul" },
          { p: "به کړلو", f: "ba kRuloo" },
        ],
      ],
      [[{ p: "به کړله", f: "ba kRula" }], [{ p: "به کړلې", f: "ba kRule" }]],
    ],
  });
  expect(
    addToForm(
      [
        {
          short: { p: "لیک", f: "leek" },
          long: { p: "لیکل", f: "leekul" },
        },
      ],
      pastEndings
    )
  ).toEqual({
    short: [
      [[{ p: "لیکم", f: "leekum" }], [{ p: "لیکو", f: "leekoo" }]],
      [[{ p: "لیکم", f: "leekum" }], [{ p: "لیکو", f: "leekoo" }]],
      [[{ p: "لیکې", f: "leeke" }], [{ p: "لیکئ", f: "leekey" }]],
      [[{ p: "لیکې", f: "leeke" }], [{ p: "لیکئ", f: "leekey" }]],
      [
        [
          { p: "لیکه", f: "leeku" },
          { p: "لیکو", f: "leeko" },
        ],
        [{ p: "لیکل", f: "leekul" }],
      ],
      [[{ p: "لیکه", f: "leeka" }], [{ p: "لیکې", f: "leeke" }]],
    ],
    long: [
      [[{ p: "لیکلم", f: "leekulum" }], [{ p: "لیکلو", f: "leekuloo" }]],
      [[{ p: "لیکلم", f: "leekulum" }], [{ p: "لیکلو", f: "leekuloo" }]],
      [[{ p: "لیکلې", f: "leekule" }], [{ p: "لیکلئ", f: "leekuley" }]],
      [[{ p: "لیکلې", f: "leekule" }], [{ p: "لیکلئ", f: "leekuley" }]],
      [[{ p: "لیکلو", f: "leekulo" }], [{ p: "لیکل", f: "leekul" }]],
      [[{ p: "لیکله", f: "leekula" }], [{ p: "لیکلې", f: "leekule" }]],
    ],
  });
  expect(
    addToForm(
      [
        {
          long: { p: "تتت", f: "ttt" },
          short: { p: "تت", f: "tt" },
          mini: { p: "ت", f: "t" },
        },
        " ",
      ],
      {
        long: [
          [[{ p: "کړم", f: "kRum" }], [{ p: "کړو", f: "kRoo" }]],
          [[{ p: "کړم", f: "kRum" }], [{ p: "کړو", f: "kRoo" }]],
          [[{ p: "کړې", f: "kRe" }], [{ p: "کړئ", f: "kRey" }]],
          [[{ p: "کړې", f: "kRe" }], [{ p: "کړئ", f: "kRey" }]],
          [[{ p: "کړي", f: "kRee" }], [{ p: "کړي", f: "kRee" }]],
          [[{ p: "کړي", f: "kRee" }], [{ p: "کړي", f: "kRee" }]],
        ],
        short: [
          [[{ p: "کم", f: "kum" }], [{ p: "کو", f: "koo" }]],
          [[{ p: "کم", f: "kum" }], [{ p: "کو", f: "koo" }]],
          [[{ p: "کې", f: "ke" }], [{ p: "کئ", f: "key" }]],
          [[{ p: "کې", f: "ke" }], [{ p: "کئ", f: "key" }]],
          [[{ p: "کي", f: "kee" }], [{ p: "کي", f: "kee" }]],
          [[{ p: "کي", f: "kee" }], [{ p: "کي", f: "kee" }]],
        ],
      }
    )
  ).toEqual({
    long: [
      [[{ p: "تتت کړم", f: "ttt kRum" }], [{ p: "تتت کړو", f: "ttt kRoo" }]],
      [[{ p: "تتت کړم", f: "ttt kRum" }], [{ p: "تتت کړو", f: "ttt kRoo" }]],
      [[{ p: "تتت کړې", f: "ttt kRe" }], [{ p: "تتت کړئ", f: "ttt kRey" }]],
      [[{ p: "تتت کړې", f: "ttt kRe" }], [{ p: "تتت کړئ", f: "ttt kRey" }]],
      [[{ p: "تتت کړي", f: "ttt kRee" }], [{ p: "تتت کړي", f: "ttt kRee" }]],
      [[{ p: "تتت کړي", f: "ttt kRee" }], [{ p: "تتت کړي", f: "ttt kRee" }]],
    ],
    short: [
      [[{ p: "تت کم", f: "tt kum" }], [{ p: "تت کو", f: "tt koo" }]],
      [[{ p: "تت کم", f: "tt kum" }], [{ p: "تت کو", f: "tt koo" }]],
      [[{ p: "تت کې", f: "tt ke" }], [{ p: "تت کئ", f: "tt key" }]],
      [[{ p: "تت کې", f: "tt ke" }], [{ p: "تت کئ", f: "tt key" }]],
      [[{ p: "تت کي", f: "tt kee" }], [{ p: "تت کي", f: "tt kee" }]],
      [[{ p: "تت کي", f: "tt kee" }], [{ p: "تت کي", f: "tt kee" }]],
    ],
    mini: [
      [[{ p: "ت کم", f: "t kum" }], [{ p: "ت کو", f: "t koo" }]],
      [[{ p: "ت کم", f: "t kum" }], [{ p: "ت کو", f: "t koo" }]],
      [[{ p: "ت کې", f: "t ke" }], [{ p: "ت کئ", f: "t key" }]],
      [[{ p: "ت کې", f: "t ke" }], [{ p: "ت کئ", f: "t key" }]],
      [[{ p: "ت کي", f: "t kee" }], [{ p: "ت کي", f: "t kee" }]],
      [[{ p: "ت کي", f: "t kee" }], [{ p: "ت کي", f: "t kee" }]],
    ],
  });
});

test(`unisexInfToObjectMatrix`, () => {
  expect(
    unisexInfToObjectMatrix({
      masc: [
        [{ p: "زوړ", f: "zoR" }],
        [{ p: "زاړه", f: "zaaRu" }],
        [{ p: "زړو", f: "zaRo" }],
      ],
      fem: [
        [{ p: "زړه", f: "zaRa" }],
        [{ p: "زړې", f: "zaRe" }],
        [{ p: "زړو", f: "zaRo" }],
      ],
    })
  ).toEqual({
    mascSing: { p: "زوړ", f: "zoR" },
    mascPlur: { p: "زاړه", f: "zaaRu" },
    femSing: { p: "زړه", f: "zaRa" },
    femPlur: { p: "زړې", f: "zaRe" },
  });
});

test(`complementInflects`, () => {
  expect(
    complementInflects({
      masc: [
        [{ p: "زوړ", f: "zoR" }],
        [{ p: "زاړه", f: "zaaRu" }],
        [{ p: "زړو", f: "zaRo" }],
      ],
      fem: [
        [{ p: "زړه", f: "zaRa" }],
        [{ p: "زړې", f: "zaRe" }],
        [{ p: "زړو", f: "zaRo" }],
      ],
    })
  ).toBe(true);
  expect(
    complementInflects({
      masc: [
        [{ p: "خفه", f: "khufa" }],
        [{ p: "خفه", f: "khufa" }],
        [{ p: "خفه", f: "khufao" }],
      ],
      fem: [
        [{ p: "خفه", f: "khufa" }],
        [{ p: "خفه", f: "khufa" }],
        [{ p: "خفه", f: "khufa" }],
      ],
    })
  ).toBe(false);
});

test(`removeFVarients`, () => {
  expect(removeFVarients("ist'imaal, istimaal")).toBe("ist'imaal");
  expect(removeFVarients({ p: "معالوم", f: "ma'aalóom, maalóom" })).toEqual({
    p: "معالوم",
    f: "ma'aalóom",
  });
  expect(removeFVarients("kor")).toBe("kor");
});

test(`makePsString should work`, () => {
  expect(makePsString("کور", "kor")).toEqual({ p: "کور", f: "kor" });
});

test(`removeEndingL should work`, () => {
  expect(removeEndingL(makePsString("لیدل", "leedúl"))).toEqual(
    makePsString("لید", "leed")
  );
  expect(removeEndingL(makePsString("لیدل", "leedul"))).toEqual(
    makePsString("لید", "leed")
  );
  expect(removeEndingL(makePsString("پرېښود", "prexod"))).toEqual(
    makePsString("پرېښود", "prexod")
  );
});

test(`yulEndingInfinitive should work`, () => {
  expect(yulEndingInfinitive({ p: "وایل", f: "waayul" })).toBe(true);
  expect(yulEndingInfinitive({ p: "لیکل", f: "leekúl" })).toBe(false);
});

test(`mapVerbBlock should work`, () => {
  expect(
    mapVerbBlock(
      (ps: T.PsString) => concatPsString({ p: "به", f: "ba" }, " ", ps),
      [
        [[{ p: "کېدم", f: "kedum" }], [{ p: "کېدو", f: "kedoo" }]],
        [[{ p: "کېدم", f: "kedum" }], [{ p: "کېدو", f: "kedoo" }]],
        [[{ p: "کېدې", f: "kede" }], [{ p: "کېدئ", f: "kedey" }]],
        [[{ p: "کېدې", f: "kede" }], [{ p: "کېدئ", f: "kedey" }]],
        [
          [
            { p: "کېده", f: "kedu" },
            { p: "کېدو", f: "kedo" },
          ],
          [{ p: "کېدل", f: "kedul" }],
        ],
        [[{ p: "کېده", f: "keda" }], [{ p: "کېدې", f: "kede" }]],
      ]
    )
  ).toEqual([
    [[{ p: "به کېدم", f: "ba kedum" }], [{ p: "به کېدو", f: "ba kedoo" }]],
    [[{ p: "به کېدم", f: "ba kedum" }], [{ p: "به کېدو", f: "ba kedoo" }]],
    [[{ p: "به کېدې", f: "ba kede" }], [{ p: "به کېدئ", f: "ba kedey" }]],
    [[{ p: "به کېدې", f: "ba kede" }], [{ p: "به کېدئ", f: "ba kedey" }]],
    [
      [
        { p: "به کېده", f: "ba kedu" },
        { p: "به کېدو", f: "ba kedo" },
      ],
      [{ p: "به کېدل", f: "ba kedul" }],
    ],
    [[{ p: "به کېده", f: "ba keda" }], [{ p: "به کېدې", f: "ba kede" }]],
  ]);
});

test(`splitDoubleWord should work`, () => {
  const orig: T.DictionaryEntry = {
    ts: 123,
    p: "ګډ وډ",
    f: "guD wuD",
    g: "guDwuD",
    e: "mixed up",
    c: "adj. doub.",
    i: 1,
  };
  const out: [T.DictionaryEntry, T.DictionaryEntry] = [
    {
      ts: 123,
      p: "ګډ",
      f: "guD",
      g: "guDwuD",
      e: "mixed up",
      c: "adj.",
      i: 1,
    },
    {
      ts: 123,
      p: "وډ",
      f: "wuD",
      g: "guDwuD",
      e: "mixed up",
      c: "adj.",
      i: 1,
    },
  ];
  expect(splitDoubleWord(removeFVarients(orig))).toEqual(out);
});

test("trimOffPs should word", () => {
  expect(trimOffPs({ p: "لیدل", f: "leedúl" }, 1, 2)).toEqual({
    p: "لید",
    f: "leed",
  });
  expect(trimOffPs({ p: "کور", f: "kor" }, 2, 2)).toEqual({ p: "ک", f: "k" });
  expect(trimOffPs({ p: "کور", f: "kor" }, 0, 0)).toEqual({
    p: "کور",
    f: "kor",
  });
});

// test(`allThirdPersMascPlur should work`, () => {
//     expect(
//         allThirdPersMascPlur([
//             [[{p: "کېدم", f: "kedum"}], [{p: "کېدو", f: "kedoo"}]],
//             [[{p: "کېدم", f: "kedum"}], [{p: "کېدو", f: "kedoo"}]],
//             [[{p: "کېدې", f: "kede"}], [{p: "کېدئ", f: "kedey"}]],
//             [[{p: "کېدې", f: "kede"}], [{p: "کېدئ", f: "kedey"}]],
//             [[{p: "کېده", f: "kedu"}, {p: "کېدو", f: "kedo"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېده", f: "keda"}], [{p: "کېدې", f: "kede"}]]
//         ])
//     ).toEqual([
//         [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//         [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//         [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//         [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//         [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//         [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//     ]);
//     expect(
//         allThirdPersMascPlur({
//             short: [
//                 [[{p: "کېدم", f: "kedum"}], [{p: "کېدو", f: "kedoo"}]],
//                 [[{p: "کېدم", f: "kedum"}], [{p: "کېدو", f: "kedoo"}]],
//                 [[{p: "کېدې", f: "kede"}], [{p: "کېدئ", f: "kedey"}]],
//                 [[{p: "کېدې", f: "kede"}], [{p: "کېدئ", f: "kedey"}]],
//                 [[{p: "کېده", f: "kedu"}, {p: "کېدو", f: "kedo"}], [{p: "کېدل", f: "kedul"}]],
//                 [[{p: "کېده", f: "keda"}], [{p: "کېدې", f: "kede"}]],
//             ],
//             long: [
//                 [[{p: "کېدلم", f: "kedulum"}], [{p: "کېدلو", f: "keduloo"}]],
//                 [[{p: "کېدلم", f: "kedulum"}], [{p: "کېدلو", f: "keduloo"}]],
//                 [[{p: "کېدلې", f: "kedule"}], [{p: "کېدلئ", f: "keduley"}]],
//                 [[{p: "کېدلې", f: "kedule"}], [{p: "کېدلئ", f: "keduley"}]],
//                 [[{p: "کېدله", f: "kedulu"}, {p: "کېدلو", f: "kedulo"}], [{p: "کېدل", f: "kedul"}]],
//                 [[{p: "کېدله", f: "kedula"}], [{p: "کېدلې", f: "kedule"}]],
//             ],
//         })
//     ).toEqual({
//         short: [
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//         ],
//         long: [
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//         ],
//     });
//     const matrixBase: VerbForm = {
//         mascSing: [
//             [[{p: "ستړی کوم", f: "stuRay kawum"}], [{p: "ستړی کوو", f: "stuRay kawoo"}]],
//             [[{p: "ستړی کوم", f: "stuRay kawum"}], [{p: "ستړی کوو", f: "stuRay kawoo"}]],
//             [[{p: "ستړی کوې", f: "stuRay kawe"}], [{p: "ستړی کوئ", f: "stuRay kawey"}]],
//             [[{p: "ستړی کوې", f: "stuRay kawe"}], [{p: "ستړی کوئ", f: "stuRay kawey"}]],
//             [[{p: "ستړی کوي", f: "stuRay kawee"}], [{p: "ستړی کوي", f: "stuRay kawee"}]],
//             [[{p: "ستړی کوي", f: "stuRay kawee"}], [{p: "ستړی کوي", f: "stuRay kawee"}]],
//         ],
//         mascPlur: [
//             [[{p: "ستړي کوم", f: "stuRee kawum"}], [{p: "ستړي کوو", f: "stuRee kawoo"}]],
//             [[{p: "ستړي کوم", f: "stuRee kawum"}], [{p: "ستړي کوو", f: "stuRee kawoo"}]],
//             [[{p: "ستړي کوې", f: "stuRee kawe"}], [{p: "ستړي کوئ", f: "stuRee kawey"}]],
//             [[{p: "ستړي کوې", f: "stuRee kawe"}], [{p: "ستړي کوئ", f: "stuRee kawey"}]],
//             [[{p: "ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
//             [[{p: "ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
//         ],
//         femSing: [
//             [[{p: "ستړې کوم", f: "stuRe kawum"}], [{p: "ستړې کوو", f: "stuRe kawoo"}]],
//             [[{p: "ستړې کوم", f: "stuRe kawum"}], [{p: "ستړې کوو", f: "stuRe kawoo"}]],
//             [[{p: "ستړې کوې", f: "stuRe kawe"}], [{p: "ستړې کوئ", f: "stuRe kawey"}]],
//             [[{p: "ستړې کوې", f: "stuRe kawe"}], [{p: "ستړې کوئ", f: "stuRe kawey"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//         ],
//         femPlur: [
//             [[{p: "ستړې کوم", f: "stuRe kawum"}], [{p: "ستړې کوو", f: "stuRe kawoo"}]],
//             [[{p: "ستړې کوم", f: "stuRe kawum"}], [{p: "ستړې کوو", f: "stuRe kawoo"}]],
//             [[{p: "ستړې کوې", f: "stuRe kawe"}], [{p: "ستړې کوئ", f: "stuRe kawey"}]],
//             [[{p: "ستړې کوې", f: "stuRe kawe"}], [{p: "ستړې کوئ", f: "stuRe kawey"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//         ],
//     };

//     // NOTE: This should never really be used, because this is only used of the past tense
//     // versions on grammatically transitive verbs and the objectMatrixes are only used with
//     // present forms of verbs, but testing to cover all type safety
//     expect(allThirdPersMascPlur(matrixBase)).toEqual({
//         mascSing: [
//             [[{p: "ستړی کوي", f: "stuRay kawee"}], [{p: "ستړی کوي", f: "stuRay kawee"}]],
//             [[{p: "ستړی کوي", f: "stuRay kawee"}], [{p: "ستړی کوي", f: "stuRay kawee"}]],
//             [[{p: "ستړی کوي", f: "stuRay kawee"}], [{p: "ستړی کوي", f: "stuRay kawee"}]],
//             [[{p: "ستړی کوي", f: "stuRay kawee"}], [{p: "ستړی کوي", f: "stuRay kawee"}]],
//             [[{p: "ستړی کوي", f: "stuRay kawee"}], [{p: "ستړی کوي", f: "stuRay kawee"}]],
//             [[{p: "ستړی کوي", f: "stuRay kawee"}], [{p: "ستړی کوي", f: "stuRay kawee"}]],
//         ],
//         mascPlur: [
//             [[{p: "ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
//             [[{p: "ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
//             [[{p: "ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
//             [[{p: "ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
//             [[{p: "ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
//             [[{p: "ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
//         ],
//         femSing: [
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//         ],
//         femPlur: [
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//         ],
//     });
// });

test(`allMascFirstInflection should work`, () => {
  expect(
    allMascFirstInflection({
      masc: [
        [{ p: "زوړ", f: "zoR" }],
        [{ p: "زاړه", f: "zaaRu" }],
        [{ p: "زړو", f: "zaRo" }],
      ],
      fem: [
        [{ p: "زړه", f: "zaRa" }],
        [{ p: "زړې", f: "zaRe" }],
        [{ p: "زړو", f: "zaRo" }],
      ],
    })
  ).toEqual({
    masc: [
      [{ p: "زاړه", f: "zaaRu" }],
      [{ p: "زاړه", f: "zaaRu" }],
      [{ p: "زاړه", f: "zaaRu" }],
    ],
    fem: [
      [{ p: "زاړه", f: "zaaRu" }],
      [{ p: "زاړه", f: "zaaRu" }],
      [{ p: "زاړه", f: "zaaRu" }],
    ],
  });
  expect(
    allMascFirstInflection({
      short: {
        masc: [
          [{ p: "زوړ", f: "zoR" }],
          [{ p: "زاړه", f: "zaaRu" }],
          [{ p: "زړو", f: "zaRo" }],
        ],
        fem: [
          [{ p: "زړه", f: "zaRa" }],
          [{ p: "زړې", f: "zaRe" }],
          [{ p: "زړو", f: "zaRo" }],
        ],
      },
      long: {
        masc: [
          [{ p: "زووړ", f: "zoooR" }],
          [{ p: "زاااړه", f: "zaaaaRu" }],
          [{ p: "زړو", f: "zaRo" }],
        ],
        fem: [
          [{ p: "زړه", f: "zaRa" }],
          [{ p: "زړې", f: "zaRe" }],
          [{ p: "زړو", f: "zaRo" }],
        ],
      },
    })
  ).toEqual({
    short: {
      masc: [
        [{ p: "زاړه", f: "zaaRu" }],
        [{ p: "زاړه", f: "zaaRu" }],
        [{ p: "زاړه", f: "zaaRu" }],
      ],
      fem: [
        [{ p: "زاړه", f: "zaaRu" }],
        [{ p: "زاړه", f: "zaaRu" }],
        [{ p: "زاړه", f: "zaaRu" }],
      ],
    },
    long: {
      masc: [
        [{ p: "زاااړه", f: "zaaaaRu" }],
        [{ p: "زاااړه", f: "zaaaaRu" }],
        [{ p: "زاااړه", f: "zaaaaRu" }],
      ],
      fem: [
        [{ p: "زاااړه", f: "zaaaaRu" }],
        [{ p: "زاااړه", f: "zaaaaRu" }],
        [{ p: "زاااړه", f: "zaaaaRu" }],
      ],
    },
  });
});

test("concat inflections", () => {
  const unisexInfs: T.UnisexInflections = {
    masc: [
      [{ p: "زوړ", f: "zoR" }],
      [{ p: "زاړه", f: "zaaRu" }],
      [{ p: "زړو", f: "zaRo" }],
    ],
    fem: [
      [{ p: "زړه", f: "zaRa" }],
      [{ p: "زړې", f: "zaRe" }],
      [{ p: "زړو", f: "zaRo" }],
    ],
  };
  const partInfs: T.UnisexInflections = {
    masc: [
      [{ p: "شوی", f: "shuway" }],
      [{ p: "شوي", f: "shuwee" }],
      [
        { p: "شویو", f: "shuwiyo" },
        { p: "شوو", f: "shuwo" },
      ],
    ],
    fem: [
      [{ p: "شوې", f: "shuwe" }],
      [{ p: "شوې", f: "shuwe" }],
      [{ p: "شوو", f: "shuwo" }],
    ],
  };
  expect(concatInflections(unisexInfs, partInfs)).toEqual({
    masc: [
      [{ p: "زوړ شوی", f: "zoR shuway" }],
      [{ p: "زاړه شوي", f: "zaaRu shuwee" }],
      [
        { p: "زړو شویو", f: "zaRo shuwiyo" },
        { p: "زړو شوو", f: "zaRo shuwo" },
      ],
    ],
    fem: [
      [{ p: "زړه شوې", f: "zaRa shuwe" }],
      [{ p: "زړې شوې", f: "zaRe shuwe" }],
      [{ p: "زړو شوو", f: "zaRo shuwo" }],
    ],
  });
  // TODO: Should also work this way
  // const unisexInfs2: UnisexInflections = {
  //     masc: [
  //         [{ p: "زوړ", f: "zoR" }, { p: "تور", f: "tor"}],
  //         [{ p: "زاړه", f: "zaaRu" }],
  //         [{ p: "زړو", f: "zaRo" }],
  //     ],
  //     fem: [
  //         [{ p: "زړه", f: "zaRa" }],
  //         [{ p: "زړې", f: "zaRe" }],
  //         [{ p: "زړو", f: "zaRo" }],
  //     ],
  // };
  // const partInfs2: UnisexInflections = {
  //     masc: [
  //         [{p: "شوی", f: "shuway"}],
  //         [{p: "شوي", f: "shuwee"}],
  //         [{p: "شویو", f: "shuwiyo" }],
  //     ],
  //     fem: [
  //         [{p: "شوې", f: "shuwe"}],
  //         [{p: "شوې", f: "shuwe"}],
  //         [{p: "شوو", f: "shuwo"}],
  //     ],
  // };
  // expect(concatInflections(unisexInfs2, partInfs2)).toEqual({
  //     masc: [
  //         [{p: "زوړ شوی", f: "zoR shuway"}, {p: "تور شوی", f: "tor shuway"}],
  //         [{p: "زاړه شوي", f: "zaaRu shuwee"}],
  //         [{p: "زړو شویو", f: "zaRo shuwiyo"}],
  //     ],
  //     fem: [
  //         [{p: "زړه شوې", f: "zaRa shuwe"}],
  //         [{p: "زړې شوې", f: "zaRe shuwe"}],
  //         [{p: "زړو شوو", f: "zaRo shuwo"}],
  //     ],
  // });
  expect(concatInflections({ p: "خفه", f: "khufa" }, partInfs)).toEqual({
    masc: [
      [{ p: "خفه شوی", f: "khufa shuway" }],
      [{ p: "خفه شوي", f: "khufa shuwee" }],
      [
        { p: "خفه شویو", f: "khufa shuwiyo" },
        { p: "خفه شوو", f: "khufa shuwo" },
      ],
    ],
    fem: [
      [{ p: "خفه شوې", f: "khufa shuwe" }],
      [{ p: "خفه شوې", f: "khufa shuwe" }],
      [{ p: "خفه شوو", f: "khufa shuwo" }],
    ],
  });
});

test("psStringEquals", () => {
  expect(psStringEquals({ p: "تور", f: "tor" }, { p: "تور", f: "tor" })).toBe(
    true
  );
  expect(psStringEquals({ p: "بور", f: "bor" }, { p: "تور", f: "tor" })).toBe(
    false
  );
  expect(
    psStringEquals({ p: "ملګری", f: "malgúray" }, { p: "ملګری", f: "malguray" })
  ).toBe(false);
  expect(
    psStringEquals(
      { p: "ملګری", f: "malgúray" },
      { p: "ملګری", f: "malguray" },
      true
    )
  ).toBe(true);
});

test("removeRetroflexR", () => {
  expect(removeRetroflexR({ p: "وکړ", f: "óokR" })).toEqual({
    p: "وک",
    f: "óok",
  });
});

test("endsInAConsonant", () => {
  const does: T.PsString[] = [
    { p: "پښتون", f: "puxtoon" },
    { p: "کور", f: "kor" },
    { p: "ګناه", f: "gUnaah" },
    { p: "زوی", f: "zooy" },
    { p: "ځای", f: "dzaay" },
  ];
  const doesnt: T.PsString[] = [
    { p: "بابا", f: "baabaa" },
    { p: "قاضي", f: "qaazee" },
    { p: "ګناه", f: "gunaa" },
    { p: "اطلاع", f: "itlaa" },
  ];
  does.forEach((x) => expect(endsInConsonant(x)).toBe(true));
  doesnt.forEach((x) => expect(endsInConsonant(x)).toBe(false));
});

test("addOEnding", () => {
  const tests: { in: T.PsString; out: T.PsString[] }[] = [
    {
      in: { p: "کتابونه", f: "kitaabóona" },
      out: [{ p: "کتابونو", f: "kitaabóono" }],
    },
    {
      in: { p: "کارغان", f: "kaargháan" },
      out: [{ p: "کارغانو", f: "kaargháano" }],
    },
    {
      in: { p: "کارغانې", f: "kaargháane" },
      out: [{ p: "کارغانو", f: "kaargháano" }],
    },
    {
      in: { p: "ښځې", f: "xúdze" },
      out: [{ p: "ښځو", f: "xúdzo" }],
    },
    // TODO: Make this last thing accented??
    {
      in: { p: "کور", f: "kor" },
      out: [{ p: "کورو", f: "koro" }],
    },
    {
      in: { p: "سړی", f: "saRáy" },
      out: [
        { p: "سړیو", f: "saRíyo" },
        { p: "سړو", f: "saRó" },
      ],
    },
    {
      in: { p: "افغانۍ", f: "afghaanúy" },
      out: [{ p: "افغانیو", f: "afghaanúyo" }],
    },
    {
      in: { p: "اوبه", f: "oobú" },
      out: [{ p: "اوبو", f: "oobó" }],
    },
    {
      in: { p: "شودې", f: "shoodé" },
      out: [{ p: "شودو", f: "shoodó" }],
    },
    {
      in: { p: "منابع", f: "manaabí" },
      out: [{ p: "منابو", f: "manaabó" }],
    },
    {
      in: { p: "انبیا", f: "ambiyáa" },
      out: [{ p: "انبیاوو", f: "ambiyáawo" }],
    },
    {
      in: { p: "مراجع", f: "maraají'" },
      out: [{ p: "مراجو", f: "maraajó" }],
    },
    {
      in: { p: "اتباع", f: "atbaa" },
      out: [{ p: "اتباعوو", f: "atbaawo" }],
    },
    {
      in: { p: "اتباع", f: "atbáa'" },
      out: [{ p: "اتباعوو", f: "atbáawo" }],
    },
  ];
  tests.forEach((t) => {
    expect(addOEnding(t.in)).toEqual(t.out);
  });
});

test("endsInShwa", () => {
  expect(endsInShwa({ p: "ښایسته", f: "xaaystú" })).toBe(true);
  expect(endsInShwa({ p: "ښایسته", f: "xaaystu" })).toBe(true);
  expect(endsInShwa({ p: "ښایسته", f: "xaaysta" })).toBe(false);
  expect(endsInShwa({ p: "کور", f: "kor" })).toBe(false);
});

test("splitPsByVarients", () => {
  expect(
    splitPsByVarients({ p: "حوادث, حادثات", f: "hawáadis, haadisáat" })
  ).toEqual([
    { p: "حوادث", f: "hawáadis" },
    { p: "حادثات", f: "haadisáat" },
  ]);
  // should work with Pashto comma too
  expect(
    splitPsByVarients({ p: "حوادث، حادثات", f: "hawáadis, haadisáat" })
  ).toEqual([
    { p: "حوادث", f: "hawáadis" },
    { p: "حادثات", f: "haadisáat" },
  ]);
  expect(splitPsByVarients({ p: "کور", f: "kor" })).toEqual([
    { p: "کور", f: "kor" },
  ]);
});

test("endsWith", () => {
  expect(endsWith({ p: "ی", f: "ay" }, { p: "سړی", f: "saRay" })).toBe(true);
  expect(endsWith({ p: "ی", f: "áy" }, { p: "سړی", f: "saRay" })).toBe(true);
  expect(endsWith({ p: "ی", f: "áy" }, { p: "سړی", f: "saRay" }, true)).toBe(
    false
  );
  // f variations should be removed in case of using DictionaryEntry
  expect(endsWith({ p: "ی", f: "ay" }, { p: "سړی", f: "saRay, saRaayy" })).toBe(
    true
  );
  expect(endsWith({ p: "ي", f: "ee" }, { p: "سړی", f: "saRay" })).toBe(false);
  expect(endsWith({ p: "ه", f: "u" }, { p: "ویده", f: "weedú" }, true)).toBe(
    false
  );
  expect(endsWith({ p: "ه", f: "u" }, { p: "ویده", f: "weedú" })).toBe(true);
  expect(
    endsWith(
      [
        { p: "وی", f: "ooy" },
        { p: "ای", f: "aay" },
      ],
      { p: "چای", f: "chaay" }
    )
  ).toBe(true);
  expect(endsWith({ p: "ه" }, { p: "ویده", f: "weedú" })).toBe(true);
  expect(endsWith({ p: "ت" }, { p: "ویده", f: "weedú" })).toBe(false);
  expect(endsWith({ f: "u" }, { p: "ویده", f: "weedú" })).toBe(true);
  expect(endsWith({ f: "u" }, { p: "ویده", f: "weedú" }, true)).toBe(false);
  expect(endsWith({ f: ["d", "t"] }, { p: "چت", f: "chat" })).toBe(true);
  expect(endsWith({ f: ["d", "D"] }, { p: "چت", f: "chat" })).toBe(false);
  expect(endsWith({ p: ["د", "ت"] }, { p: "چت", f: "chat" })).toBe(true);
  expect(
    endsWith([{ p: "ای", f: "aay" }, { p: ["د", "ت"] }], { p: "چت", f: "chat" })
  ).toBe(true);
  expect(endsWith({ p: ["ډ", "د"] }, { p: "چت", f: "chat" })).toBe(false);
  // ignore '
  expect(endsWith({ p: "ا", f: "aa" }, { p: "اعدا", f: "idaa'" })).toBe(true);
  expect(endsWith({ p: "ا", f: "aa'" }, { p: "اعدا", f: "idaa" })).toBe(true);
  // ability to curry
  expect(endsWith({ p: "ی", f: "ay" })({ p: "سړی", f: "saRáy" })).toBe(true);
  expect(endsWith({ p: "ی", f: "ay" }, true)({ p: "سړی", f: "saRáy" })).toBe(
    false
  );
  expect(endsWith({ f: ["d", "D"] })({ p: "چت", f: "chat" })).toBe(false);
});

test("undoAaXuPattern", () => {
  expect(undoAaXuPattern("تور")).toBe(false);
  expect(undoAaXuPattern("پښتان")).toBe(false);
  expect(undoAaXuPattern("کاوه")).toBe("کو");
  expect(undoAaXuPattern("وواته")).toBe("ووت");
  expect(undoAaXuPattern("واسته")).toBe("وست");
  expect(undoAaXuPattern("لیده")).toBe(false);
});

test("lastVowelNotA", () => {
  expect(lastVowelNotA("raat")).toBe(true);
  expect(lastVowelNotA("oowat")).toBe(false);
});
