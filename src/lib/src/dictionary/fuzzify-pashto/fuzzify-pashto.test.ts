/**
 * Copyright (c) lingdocs.com
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/* eslint-disable */

import { fuzzifyPashto } from "./fuzzify-pashto";

type match = [string, string];
interface IDefaultInfoBlock {
  matches: match[];
  nonMatches: match[];
}

const defaultInfo: IDefaultInfoBlock = {
  matches: [
    ["اوسېدل", "وسېدل"],
    ["انبیه", "امبیه"],
    ["سرک", "صړق"],
    ["انطذاړ", "انتظار"],
    ["مالوم", "معلوم"],
    ["معلوم", "مالوم"],
    ["قېصا", "کيسه"],
    ["کور", "قوړ"],
    ["گرزيدل", "ګرځېدل"],
    ["سنگہ", "څنګه"],
    ["کار", "قهر"],
    ["زبا", "ژبه"],
    ["سڑے", "سړی"],
    ["استمال", "استعمال"],
    ["اعمل", "عمل"],
    ["جنگل", "ځنګل"],
    ["ځال", "جال"],
    ["زنگل", "ځنګل"],
    ["جرل", "ژړل"],
    ["فرمائيل", "فرمايل"],
    ["مرمنه", "مېرمنه"],
    // using هٔ as two characters
    ["وارېدهٔ", "وارېده"],
    // using  as one character
    ["واريدۀ", "وارېده"],
    ["زوی", "زوئے"],
    ["ئے", "يې"],
    // optional ا s in middle
    ["توقف", "تواقف"],
    // option ي s in middle
    ["مناظره", "مناظيره"],
    ["بلکل", "بالکل"],
    ["مهرب", "محراب"],
    ["مسول", "مسوول"],
    ["ډارونکي", "ډاروونکي"],
    ["ډانګره", "ډانګوره"],
    ["هنداره", "هینداره"],
    ["متأصفانه", "متاسفانه"],
    ["وازف", "واظیف"],
    ["شوریٰ", "شورا"],
    ["ځنبېدل", "ځمبېدل"],
    // consonant swap // TODO: more??
    ["مچلوغزه", "مچلوزغه"],
    ["رکشه", "رشکه"],
    ["پښه", "ښپه"],
    ["غاپل", "غپل"],
    ["غپل", "غاپل"],
  ],
  nonMatches: [
    ["سرک", "ترک"],
    ["کار", "بېکاري"],
    // ا should not be optional in the beginning or end
    ["اړتیا", "اړتی"],
    ["ړتیا", "اړتیا"],
    // و should not be optional in the begenning or end
    ["ورور", "رور"],
  ],
};

const defaultLatinInfo: IDefaultInfoBlock = {
  matches: [
    // TODO:
    ["anbiya", "ambiya"],
    ["lootfun", "lUtfan"],
    ["saray", "saRay"],
    ["senga", "tsanga"],
    ["daktur", "DakTar"],
    ["iteebar", "itibaar"],
    ["dzaal", "jaal"],
    ["bekaar", "bekáar"],
    ["bekár", "bekaar"],
    ["chaai", "cháai"],
    ["day", "daai"],
    ["dai", "day"],
    ["daktar", "Daktár"],
    ["sarái", "saRay"],
    ["beter", "bahtár"],
    ["doosti", "dostee"],
    ["dắraghlum", "deraghlum"], // using the ă along with a combining ́
    ["dar", "dăr"],
    ["der", "dăr"],
    ["dur", "dăr"],
    ["chee", "che"],
    ["dzooy", "zooy"],
    ["delta", "dalta"],
    ["koorbaani", "qUrbaanee"],
    ["jamaat", "jamaa'at"],
    ["taaroof", "ta'aarÚf"],
    ["xudza", "xúdza"],
    ["ishaak", "is`haaq"],
    ["lUtfun", "lootfan"],
    ["miraab", "mihraab"],
    ["taamul", "tahamul"],
    ["otsedul", "osedul"],
    ["ghaara", "ghaaRa"],
    ["maafiat", "maafiyat"],
    ["tasalUt", "tassalUt"],
  ],
  nonMatches: [
    ["kor", "por"],
    ["intizaar", "intizaam"],
    ["ishaat", "shaat"], // i should not be optional at the beginning
  ],
};

const withDiacritics: match[] = [
  ["تتتت", "تِتّتّت"],
  ["بببب", "بّبّبَب"],
];

const matchesWithAn: match[] = [
  ["حتمن", "حتماً"],
  ["لتفن", "لطفاً"],
  ["کاملا", "کاملاً"],
];

const matchesWithSpaces: match[] = [
  ["دپاره", "د پاره"],
  ["بېکار", "بې کار"],
  ["د پاره", "دپاره"],
  ["بې کار", "بېکار"],
  ["کار مند", "کارمند"],
  ["همنشین", "هم نشین"],
  ["بغل کشي", "بغلکشي"],
];

const matchesWithSpacesLatin: match[] = [
  ["dupaara", "du paara"],
  ["bekaara", "be kaara"],
  ["du paara", "dupaara"],
  ["be kaara", "bekaara"],
  ["oreckbgqjxmroe", "or ec kb gq jxmr oe"],
  ["cc cc c", "ccccc"],
];

const defaultSimpleLatinInfo: IDefaultInfoBlock = {
  matches: [
    // TODO:
    ["anbiya", "ambiya"],
    ["lootfun", "lUtfan"],
    ["saray", "saRay"],
    ["senga", "tsanga"],
    ["daktur", "DakTar"],
    ["iteebar", "itibaar"],
    ["dzaal", "jaal"],
    ["bekaar", "bekaar"],
    ["bekar", "bekaar"],
    ["chaai", "chaai"],
    ["day", "daai"],
    ["dai", "day"],
    ["daktar", "Daktar"],
    ["sarai", "saRay"],
    ["beter", "bahtar"],
    ["doosti", "dostee"],
    ["daraghlum", "deraghlum"], // using the ă along with a combining ́
    ["dar", "dar"],
    ["der", "dar"],
    ["dur", "dar"],
    ["chee", "che"],
    ["dzooy", "zooy"],
    ["delta", "dalta"],
    ["koorbaani", "qUrbaanee"],
    ["taaroof", "taaarUf"],
    ["xudza", "xudza"],
    ["ishaak", "ishaaq"],
    ["lUtfun", "lootfan"],
    ["miraab", "mihraab"],
    ["taamul", "tahamul"],
    ["otsedul", "osedul"],
    ["ghaara", "ghaaRa"],
  ],
  nonMatches: [
    ["kor", "por"],
    ["intizaar", "intizaam"],
    ["ishaat", "shaat"], // i should not be optional at the beginning
  ],
};

interface ITestOptions {
  options: any;
  matches?: any;
  nonMatches?: any;
  viceVersaMatches?: any;
}

const optionsPossibilities: ITestOptions[] = [
  {
    options: {}, // default
    ...defaultInfo,
    viceVersaMatches: true,
  },
  {
    options: { script: "Latin" },
    ...defaultLatinInfo,
    viceVersaMatches: true,
  },
  {
    options: { matchStart: "word" }, // same as default
    ...defaultInfo,
    viceVersaMatches: true,
  },
  {
    options: { script: "Latin", simplifiedLatin: true },
    ...defaultSimpleLatinInfo,
    viceVersaMatches: true,
  },
  {
    matches: [...matchesWithSpaces],
    nonMatches: [],
    options: { allowSpacesInWords: true },
    viceVersaMatches: true,
  },
  {
    matches: [...matchesWithSpacesLatin],
    nonMatches: [],
    options: { allowSpacesInWords: true, script: "Latin" },
    viceVersaMatches: true,
  },
  {
    matches: [],
    nonMatches: matchesWithSpaces,
    options: { allowSpacesInWords: false },
  },
  {
    matches: [],
    nonMatches: matchesWithSpacesLatin,
    options: { allowSpacesInWords: false, script: "Latin" },
  },
  {
    matches: [["کار", "بېکاري"]],
    nonMatches: [["سرک", "بېترک"]],
    options: { matchStart: "anywhere" },
  },
  {
    matches: [
      ["کور", "کور"],
      ["سری", "سړی"],
    ],
    nonMatches: [
      ["سړي", "سړيتوب"],
      ["کور", "کورونه"],
    ],
    options: { matchWholeWordOnly: true },
    viceVersaMatches: true,
  },
  {
    matches: [
      ["کور", "کور ته ځم"],
      ["سری", "سړی دی"],
    ],
    nonMatches: [
      ["سړي", " سړيتوب"],
      ["کور", "خټين کورونه"],
    ],
    options: { matchStart: "string" },
  },
  {
    matches: [
      ["کور", "کور ته ځم"],
      ["سری", "سړی دی"],
    ],
    nonMatches: [
      ["سړي", " سړيتوب"],
      ["کور", "خټين کورونه"],
    ],
    options: { matchStart: "string" },
  },
];

const punctuationToExclude = [
  "،",
  "؟",
  "؛",
  "۔",
  "۲",
  "۹",
  "۰",
  "»",
  "«",
  "٫",
  "!",
  ".",
  "؋",
  "٪",
  "٬",
  "×",
  ")",
  "(",
  " ",
  "\t",
];

optionsPossibilities.forEach((o) => {
  o.matches.forEach((m: any) => {
    test(`${m[0]} should match ${m[1]}`, () => {
      const re = fuzzifyPashto(m[0], o.options);
      const result = m[1].match(new RegExp(re));
      expect(result).toBeTruthy();
    });
  });
  if (o.viceVersaMatches === true) {
    o.matches.forEach((m: any) => {
      test(`${m[1]} should match ${m[0]}`, () => {
        const re = fuzzifyPashto(m[1], o.options);
        const result = m[0].match(new RegExp(re));
        expect(result).toBeTruthy();
      });
    });
  }
  o.nonMatches.forEach((m: any) => {
    test(`${m[0]} should not match ${m[1]}`, () => {
      const re = fuzzifyPashto(m[0], o.options);
      const result = m[1].match(new RegExp(re));
      expect(result).toBeNull();
    });
  });
});

matchesWithAn.forEach((m: any) => {
  test(`matching ${m[0]} should work with ${m[1]}`, () => {
    const re = fuzzifyPashto(m[0], { matchWholeWordOnly: true });
    const result = m[1].match(new RegExp(re));
    expect(result).toBeTruthy();
  });
  test(`matching ${m[1]} should work with ${m[0]}`, () => {
    const re = fuzzifyPashto(m[1], { matchWholeWordOnly: true });
    const result = m[0].match(new RegExp(re));
    expect(result).toBeTruthy();
  });
});

withDiacritics.forEach((m: any) => {
  test(`matich ${m[0]} should ignore the diactritics in ${m[1]}`, () => {
    const re = fuzzifyPashto(m[0], { ignoreDiacritics: true });
    const result = m[1].match(new RegExp(re));
    expect(result).toBeTruthy();
  });
  test(`the diacritics should in ${m[0]} should be ignored when matching with ${m[1]}`, () => {
    const re = fuzzifyPashto(m[1], { ignoreDiacritics: true });
    const result = m[0].match(new RegExp(re));
    expect(result).toBeTruthy();
  });
});

test(`وs should be optional if entered in search string`, () => {
  const re = fuzzifyPashto("لوتفن");
  const result = "لطفاً".match(new RegExp(re));
  expect(result).toBeTruthy();
});

test(`matchWholeWordOnly should override matchStart = "anywhere"`, () => {
  const re = fuzzifyPashto("کار", {
    matchWholeWordOnly: true,
    matchStart: "anywhere",
  });
  const result = "کار کوه، بېکاره مه ګرځه".match(new RegExp(re));
  expect(result).toHaveLength(1);
  expect(result).toEqual(expect.not.arrayContaining(["بېکاره"]));
});

test(`returnWholeWord should return the whole word`, () => {
  // With Pashto Script
  const re = fuzzifyPashto("کار", { returnWholeWord: true });
  const result = "کارونه کوه، بېکاره مه شه".match(new RegExp(re));
  expect(result).toHaveLength(1);
  expect(result).toContain("کارونه");
  // With Latin Script
  const reLatin = fuzzifyPashto("kaar", {
    returnWholeWord: true,
    script: "Latin",
  });
  const resultLatin = "kaaroona kawa, bekaara ma gurdza.".match(
    new RegExp(reLatin),
  );
  expect(resultLatin).toHaveLength(1);
  expect(resultLatin).toContain("kaaroona");
});

test(`returnWholeWord should return the whole word even when starting the matching in the middle`, () => {
  // With Pashto Script
  const re = fuzzifyPashto("کار", {
    returnWholeWord: true,
    matchStart: "anywhere",
  });
  const result = "کارونه کوه، بېکاره مه شه".match(new RegExp(re, "g"));
  expect(result).toHaveLength(2);
  expect(result).toContain(" بېکاره");

  // With Latin Script
  const reLatin = fuzzifyPashto("kaar", {
    matchStart: "anywhere",
    returnWholeWord: true,
    script: "Latin",
  });
  const resultLatin = "kaaroona kawa bekaara ma gurdza".match(
    new RegExp(reLatin, "g"),
  );
  expect(resultLatin).toHaveLength(2);
  expect(resultLatin).toContain("bekaara");
});

test(`returnWholeWord should should not return partial matches if matchWholeWordOnly is true`, () => {
  // With Pashto Script
  const re = fuzzifyPashto("کار", {
    returnWholeWord: true,
    matchStart: "anywhere",
    matchWholeWordOnly: true,
  });
  const result = "کارونه کوه، بېکاره مه ګرځه".match(new RegExp(re));
  expect(result).toBeNull();

  // With Latin Script
  const reLatin = fuzzifyPashto("kaar", {
    matchStart: "anywhere",
    matchWholeWordOnly: true,
    returnWholeWord: true,
    script: "Latin",
  });
  const resultLatin = "kaaroona kawa bekaara ma gurdza".match(
    new RegExp(reLatin),
  );
  expect(resultLatin).toBeNull();
});

punctuationToExclude.forEach((m) => {
  test(`${m} should not be considered part of a Pashto word`, () => {
    const re = fuzzifyPashto("کور", {
      returnWholeWord: true,
      matchStart: "word",
    });
    // ISSUE: This should also work when the word is PRECEDED by the punctuation
    // Need to work with a lookbehind equivalent
    const result = `زمونږ کورونه${m} دي`.match(new RegExp(re));
    expect(result).toHaveLength(1);
    expect(result).toContain(" کورونه");
    // Matches will unfortunately have a space on the front of the word, issue with missing es2018 lookbehinds
  });
});

punctuationToExclude.forEach((m) => {
  // tslint:disable-next-line
  test(`${m} should not be considered part of a Pashto word (front or back with es2018) - or should fail if using a non es2018 environment`, () => {
    let result: any;
    let failed = false;
    // if environment is not es2018 with lookbehind support (like node 6, 8) this will fail
    try {
      const re = fuzzifyPashto("کور", {
        returnWholeWord: true,
        matchStart: "word",
        es2018: true,
      });
      result = `زمونږ ${m}کورونه${m} دي`.match(new RegExp(re));
    } catch (error) {
      failed = true;
    }
    const worked = failed || (result.length === 1 && result.includes("کورونه"));
    expect(worked).toBe(true);
  });
});

test(`Arabic punctuation or numbers should not be considered part of a Pashto word`, () => {
  const re = fuzzifyPashto("کار", { returnWholeWord: true });
  const result = "کارونه کوه، بېکاره مه ګرځه".match(new RegExp(re));
  expect(result).toHaveLength(1);
  expect(result).toContain("کارونه");
});

/* eslint-enable */
