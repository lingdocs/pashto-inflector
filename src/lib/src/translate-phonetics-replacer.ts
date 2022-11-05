/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

interface IReplacerInfoItem {
  char: string;
  alalc: string | IDialects;
  ipa: string | IDialects;
}

interface IDialects {
  standard: string;
  peshawer: string;
  southern: string;
}

export const replacerInfo: IReplacerInfoItem[] = [
  {
    char: "aa",
    alalc: "ā",
    ipa: "ɑ",
  },
  {
    char: "áa",
    alalc: "ā́",
    ipa: "ɑ́",
  },
  {
    char: "aay",
    alalc: "āy",
    ipa: "ɑj", // TODO: This should change for peshawer?
  },
  {
    char: "áay",
    alalc: "ā́y",
    ipa: "ɑ́j",
  },
  {
    char: "a",
    alalc: "a",
    ipa: "a",
  },
  {
    char: "ă",
    alalc: "ạ",
    ipa: "æ",
  },
  {
    char: "á",
    alalc: "á",
    ipa: "á",
  },
  {
    char: "u",
    alalc: "ə",
    ipa: "ə",
  },
  {
    char: "ú",
    alalc: "ə­́",
    ipa: "ə­́",
  },
  {
    char: "U",
    alalc: "u",
    ipa: "ú",
  },
  {
    char: "Ú",
    alalc: "ú",
    ipa: "ú",
  },
  {
    char: "o",
    alalc: "o",
    ipa: "o",
  },
  {
    char: "ó",
    alalc: "ó",
    ipa: "ó",
  },
  {
    char: "oo",
    alalc: "ō",
    ipa: "u:",
  },
  {
    char: "óo",
    alalc: "ṓ",
    ipa: "ú",
  },
  {
    char: "i",
    alalc: "i",
    ipa: "ɪ",
  },
  {
    char: "í",
    alalc: "í",
    ipa: "ɪ́",
  },
  {
    char: "ey",
    alalc: "ay",
    ipa: "ai",
  },
  {
    char: "éy",
    alalc: "áy",
    ipa: "ái",
  },
  {
    char: "ee",
    alalc: "ī",
    ipa: "i",
  },
  {
    char: "ée",
    alalc: "ī́",
    ipa: "í",
  },
  {
    char: "uy",
    alalc: "əy",
    ipa: "əj",
  },
  {
    char: "úy",
    alalc: "ə́y",
    ipa: "ə́j",
  },
  {
    char: "ooy",
    alalc: "ōy",
    ipa: "u:j",
  },
  {
    char: "eyy",
    alalc: "ạy",
    ipa: "ɛ̝j",
  },
  {
    char: "e",
    alalc: "e",
    ipa: "e",
  },
  {
    char: "é",
    alalc: "é",
    ipa: "é",
  },
  {
    char: "w",
    alalc: "w",
    ipa: "w",
  },
  {
    char: "y",
    alalc: "y",
    ipa: "j",
  },

  {
    char: "ts",
    alalc: {
      standard: "ṡ",
      peshawer: "s",
      southern: "ṡ",
    },
    ipa: {
      standard: "t͡s",
      peshawer: "s",
      southern: "t͡s",
    },
  },
  {
    char: "s",
    alalc: "s",
    ipa: "s",
  },
  {
    char: "dz",
    alalc: {
      standard: "dz",
      peshawer: "z",
      southern: "dz",
    },
    ipa: {
      standard: "d͡z",
      peshawer: "z",
      southern: "d͡z",
    },
  },
  {
    char: "z",
    alalc: "z",
    ipa: "z",
  },
  {
    char: "t",
    alalc: "t",
    ipa: "t̪",
  },
  {
    char: "T",
    alalc: "ṭ",
    ipa: "ʈ",
  },
  {
    char: "d",
    alalc: "d",
    ipa: "d̪",
  },
  {
    char: "D",
    alalc: "ḍ",
    ipa: "ɖ",
  },
  {
    char: "r",
    alalc: "r",
    ipa: "r",
  },
  {
    char: "R",
    alalc: "ṛ",
    ipa: "ɻ",
  },
  {
    char: "n",
    alalc: "n",
    ipa: "n",
  },
  {
    char: "N",
    alalc: "ṇ",
    ipa: "ɳ",
  },
  {
    char: "f",
    alalc: "f",
    ipa: "f",
  },
  {
    char: "b",
    alalc: "b",
    ipa: "b",
  },
  {
    char: "p",
    alalc: "p",
    ipa: "p",
  },

  {
    char: "sh",
    alalc: "sh",
    ipa: "ʃ",
  },
  {
    char: "x",
    alalc: {
      standard: "k'h",
      southern: "ṣh",
      peshawer: "kh",
    },
    ipa: {
      standard: "ç",
      southern: "ʂ",
      peshawer: "x",
    },
  },
  {
    char: "kh",
    alalc: "x",
    ipa: "x",
  },

  {
    char: "k",
    alalc: "k",
    ipa: "k",
  },
  {
    char: "q",
    alalc: "q",
    ipa: "q",
  },

  {
    char: "jz",
    alalc: "zh",
    ipa: "ʒ",
  },
  {
    char: "G",
    alalc: {
      southern: "ẓh",
      peshawer: "g",
      standard: "ğ",
    },
    ipa: {
      standard: "ʝ",
      southern: "ʐ",
      peshawer: "g",
    },
  },

  {
    char: "g",
    alalc: "g",
    ipa: "g",
  },
  {
    char: "gh",
    alalc: "gh",
    ipa: "ɣ",
  },

  {
    char: "j",
    alalc: "j",
    ipa: "d͡ʒ",
  },
  {
    char: "ch",
    alalc: "ch",
    ipa: "t͡ʃ",
  },

  {
    char: "l",
    alalc: "l",
    ipa: "l",
  },
  {
    char: "m",
    alalc: "m",
    ipa: "m",
  },
  {
    char: "h",
    alalc: "h",
    ipa: "h",
  },
];

// tslint:disable-next-line
export const replacerRegex = /aay|áay|aa|áa|a|á|U|Ú|u|ú|ooy|o{1,2}|óo|ó|ey|éy|e{1,2}|ée|é|uy|úy|i|í|w|y|q|g|ts|sh|s|dz|z|t|T|d|D|r|R|n|N|f|b|p|x|kh|q|k|gh|g|G|j|ch|l|l|m|h/g;
