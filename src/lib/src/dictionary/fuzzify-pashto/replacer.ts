/**
 * Copyright (c) lingdocs.com
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// TODO: add southern ش س (at beginning of word?)
const sSounds = "صسثڅ";
const zSounds = "زضظذځژ";
const tdSounds = "طتټدډ";
const velarPlosives = "ګغږکقگك";
const rLikeSounds = "رړڑڼ";
const labialPlosivesAndFricatives = "فپب";
// Includes Arabic ى \u0649
const theFiveYays = "ېۍیيئےى";
const guttural = "ښخشخهحغګ";

interface IReplacerInfoItem {
  char: string;
  ignorable?: boolean;
  ignorableIfInMiddle?: boolean;
}

interface IPashtoReplacerInfoItem extends IReplacerInfoItem {
  range?: string;
  repl?: string;
  plus?: string[];
}

interface IPhoneticsReplacerInfoItem extends IReplacerInfoItem {
  repl: string;
  replWhenBeginning?: string;
}

const ghzCombo = ["غز", "زغ"];
const pxCombo = ["پښ", "ښپ"];
const kshCombo = ["کش", "شک", "کښ", "کش"];

export const pashtoReplacerInfo: IPashtoReplacerInfoItem[] = [
  { char: "اً", range: "ان" },
  {
    char: "ا",
    ignorableIfInMiddle: true,
    plus: ["اً", "یٰ"],
    range: "اأآهع",
  }, // TODO: make optional (if not at the beginning of word)
  { char: "آ", range: "اآهأ" },
  { char: "ٱ", range: "اآهأ" },
  { char: "ٲ", range: "اآهأ" },
  { char: "أ", range: "اآهأ" },
  { char: "ٳ", range: "اآهأ" },
  { char: "یٰ", range: "ای", plus: ["یٰ"] },

  {
    char: "ی",
    range: theFiveYays,
    plus: ["ئی", "ئي", "یٰ"],
    ignorableIfInMiddle: true,
  },
  {
    char: "ي",
    range: theFiveYays,
    plus: ["ئی", "ئي", "یٰ"],
    ignorableIfInMiddle: true,
  },
  { char: "ې", range: theFiveYays, ignorableIfInMiddle: true },
  { char: "ۍ", range: theFiveYays },
  { char: "ئي", range: theFiveYays, plus: ["ئی", "ئي"] },
  { char: "ئی", range: theFiveYays, plus: ["ئی", "ئي"] },
  { char: "ئے", range: theFiveYays, plus: ["ئی", "ئي", "يې"] },
  { char: "ئ", range: theFiveYays, ignorableIfInMiddle: true },
  { char: "ے", range: theFiveYays },

  { char: "س", range: sSounds },
  { char: "ص", range: sSounds },
  { char: "ث", range: sSounds },
  { char: "څ", range: sSounds + "چ" },

  { char: "ج", range: "چجڅځژ" },
  { char: "چ", range: "چجڅځ" },

  { char: "هٔ", range: "اهحہۀ", plus: ["هٔ"] },
  { char: "ه", range: "اهحہۀ", plus: ["هٔ"] },
  { char: "ۀ", range: "اهحہۀ", plus: ["هٔ"] },
  { char: "ہ", range: "اهحہۀ", plus: ["هٔ"] },

  { char: "ع", range: "اوع", ignorable: true },
  { char: "و", range: "وع", plus: ["وو"], ignorableIfInMiddle: true },
  { char: "ؤ", range: "وع" },

  { char: "ښ", range: guttural },
  { char: "غ", range: guttural + velarPlosives },
  { char: "خ", range: guttural },
  { char: "ح", range: guttural },

  { char: "ش", range: "شښ" },

  { char: "ز", range: zSounds },
  { char: "ض", range: zSounds },
  { char: "ذ", range: zSounds },
  { char: "ځ", range: zSounds + "جڅ" },
  { char: "ظ", range: zSounds },

  { char: "ژ", range: "زضظژذځږج" },

  { char: "ر", range: rLikeSounds },
  { char: "ړ", range: rLikeSounds },
  { char: "ڑ", range: rLikeSounds },

  { char: "ت", range: tdSounds },
  { char: "ټ", range: tdSounds },
  { char: "ٹ", range: tdSounds },
  { char: "ط", range: tdSounds },
  { char: "د", range: tdSounds },
  { char: "ډ", range: tdSounds },
  { char: "ڈ", range: tdSounds },

  { char: "غز", plus: ghzCombo },
  { char: "زغ", plus: ghzCombo },
  { char: "پښ", plus: pxCombo },
  { char: "ښپ", plus: pxCombo },
  { char: "کش", plus: kshCombo },
  { char: "شک", plus: kshCombo },

  { char: "مب", plus: ["مب", "نب"] },
  { char: "نب", plus: ["مب", "نب"] },
  { char: "ن", range: "نڼ", plus: ["اً"] }, // allow for words using اٌ at the end to be seached for with ن
  { char: "ڼ", range: "نڼړڑ" },

  { char: "ک", range: velarPlosives },
  { char: "ګ", range: velarPlosives },
  { char: "گ", range: velarPlosives },
  { char: "ق", range: velarPlosives },

  { char: "ږ", range: velarPlosives + "ژ" },

  { char: "ب", range: labialPlosivesAndFricatives },
  { char: "پ", range: labialPlosivesAndFricatives },
  { char: "ف", range: labialPlosivesAndFricatives },
];

// tslint:disable-next-line
export const pashtoReplacerRegex =
  /اً|أ|ا|آ|ٱ|ٲ|ٳ|ئی|ئي|ئے|یٰ|ی|ي|ې|ۍ|ئ|ے|س|ص|ث|څ|ج|چ|هٔ|ه|ۀ|غز|زغ|کش|شک|ښک|ښک|پښ|ښپ|ہ|ع|و|ؤ|ښ|غ|خ|ح|ش|ز|ض|ذ|ځ|ظ|ژ|ر|ړ|ڑ|ت|ټ|ٹ|ط|د|ډ|ڈ|مب|م|نب|ن|ڼ|ک|ګ|گ|ل|ق|ږ|ب|پ|ف/g;

// TODO: I removed the h? 's at the beginning and ends. was that a good idea?
const aaySoundLatin = "(?:[aá]a?i|[eé]y|[aá]a?y|[aá]h?i)";
const aaySoundSimpleLatin = "(?:aa?i|ay|aa?y|ah?i)";
const longASoundLatin = "(?:[aá]{1,2}'?h?a{0,2}?)h?";
const longASoundSimpleLatin = "(?:a{1,2}'?h?a{0,2}?)h?";
const shortASoundLatin = "(?:[aáă][a|́]?|au|áu|[uú]|[UÚ]|[ií]|[eé])?h?";
const shortASoundSimpleLatin = "(?:aa?|au|u|U|i|e)?h?";
const shwaSoundLatin = "(?:[uú]|[oó]o?|w[uú]|[aáă]|[ií]|[UÚ])?";
const shwaSoundSimpleLatin = "(?:u|oo?|wu|a|i|U)?";
const ooSoundLatin = "(?:[oó]o?|[áa]u|w[uú]|[aá]w|[uú]|[UÚ])(?:h|w)?";
const ooSoundSimpleLatin = "(?:oo?|au|wu|aw|u|U)(?:h|w)?";
const aySoundLatin = "(?:[eé]y|[eé]e?|[uú]y|[aá]y|[ií])";
const aySoundSimpleLatin = "(?:ay|ee?|uy|ay|i)";
const middleESoundLatin = "(?:[eé]e?|[ií]|[aáă]|[eé])[h|y|́]?";
const middleESoundSimpleLatin = "(?:ee?|i|a|e)[h|y]?";
const iSoundLatin = "-?(?:[uú]|[aáă]|[ií]|[eé]e?)?h?-?";
const iSoundSimpleLatin = "-?(?:u|a|i|ee?)?h?";
const iSoundLatinBeginning = "(?:[uú]|[aáă]|[ií]|[eé]e?)h?";
const iSoundSimpleLatinBeginning = "(?:u|a|i|ee?)h?";

export const latinReplacerInfo: IPhoneticsReplacerInfoItem[] = [
  { char: "aa", repl: longASoundLatin },
  { char: "áa", repl: longASoundLatin },
  { char: "aai", repl: aaySoundLatin },
  { char: "áai", repl: aaySoundLatin },
  { char: "ai", repl: aaySoundLatin },
  { char: "ái", repl: aaySoundLatin },
  { char: "aay", repl: aaySoundLatin },
  { char: "áay", repl: aaySoundLatin },
  { char: "ay", repl: aaySoundLatin },
  { char: "áy", repl: aaySoundLatin },
  { char: "a", repl: shortASoundLatin },
  { char: "ă", repl: shortASoundLatin },
  { char: "ắ", repl: shortASoundLatin },
  { char: "á", repl: shortASoundLatin },
  { char: "u", repl: shwaSoundLatin },
  { char: "ú", repl: shwaSoundLatin },
  { char: "U", repl: ooSoundLatin },
  { char: "Ú", repl: ooSoundLatin },
  { char: "o", repl: ooSoundLatin },
  { char: "ó", repl: ooSoundLatin },
  { char: "oo", repl: ooSoundLatin },
  { char: "óo", repl: ooSoundLatin },
  { char: "i", repl: iSoundLatin, replWhenBeginning: iSoundLatinBeginning },
  { char: "í", repl: iSoundLatin, replWhenBeginning: iSoundLatinBeginning },
  { char: "ay", repl: aySoundLatin },
  { char: "áy", repl: aySoundLatin },
  { char: "ee", repl: aySoundLatin },
  { char: "ée", repl: aySoundLatin },
  { char: "uy", repl: aySoundLatin },
  { char: "úy", repl: aySoundLatin },
  { char: "e", repl: middleESoundLatin },
  { char: "é", repl: middleESoundLatin },
  { char: "w", repl: "(?:w{1,2}?[UÚ]?|b)" },
  { char: "y", repl: "[ií]?y?" },

  { char: "ts", repl: "(?:s{1,2}|z{1,2|ts|c)" },
  { char: "s", repl: "(?:s{1,2}|z{1,2|ts|c)" },
  { char: "ss", repl: "(?:s{1,2}|z{1,2|ts|c)" },
  { char: "c", repl: "(?:s{1,2}|z{1,2|ts|c)" },
  { char: "dz", repl: "(?:dz|z{1,2}|j)" },
  { char: "z", repl: "(?:s{1,2}|dz|z{1,2}|ts)" },
  { char: "t", repl: "(?:t{1,2}|T|d{1,2}|D)" },
  { char: "tt", repl: "(?:t{1,2}|T|d{1,2}|D)" },
  { char: "T", repl: "(?:t{1,2}|T|d{1,2}|D)" },
  { char: "d", repl: "(?:t{1,2}|T|d{1,2}|D)" },
  { char: "dd", repl: "(?:t{1,2}|T|d{1,2}|D)" },
  { char: "D", repl: "(?:t{1,2}|T|d{1,2}|D)" },
  { char: "r", repl: "(?:R|r{1,2}|N)" },
  { char: "rr", repl: "(?:R|r{1,2}|N)" },
  { char: "R", repl: "(?:R|r{1,2}|N)" },
  { char: "nb", repl: "(?:nb|mb)" },
  { char: "mb", repl: "(?:nb|mb)" },
  { char: "n", repl: "(?:n{1,2}|N)" },
  { char: "N", repl: "(?:R|r{1,2}|N)" },
  { char: "f", repl: "(?:f{1,2}|p{1,2})" },
  { char: "ff", repl: "(?:f{1,2}|p{1,2})" },
  { char: "b", repl: "(?:b{1,2}|p{1,2})" },
  { char: "bb", repl: "(?:b{1,2}|p{1,2})" },
  { char: "p", repl: "(?:b{1,2}|p{1,2}|f{1,2})" },
  { char: "pp", repl: "(?:b{1,2}|p{1,2}|f{1,2})" },

  { char: "sh", repl: "(?:x|sh|s`h)" },
  { char: "x", repl: "(?:kh|gh|x|h){1,2}" },
  { char: "kh", repl: "(?:kh|gh|x|h){1,2}" },

  { char: "k", repl: "(?:k{1,2}|q{1,2})" },
  { char: "q", repl: "(?:k{1,2}|q{1,2})" },

  { char: "jz", repl: "(?:G|jz)" },
  { char: "G", repl: "(?:jz|G|g)" },

  { char: "g", repl: "(?:gh?|k{1,2}|G)" },
  { char: "gh", repl: "(?:g|gh|kh|G)" },

  { char: "j", repl: "(?:j{1,2}|ch|dz)" },
  { char: "ch", repl: "(?:j{1,2}|ch)" },

  { char: "l", repl: "l{1,2}" },
  { char: "ll", repl: "l{1,2}" },
  { char: "m", repl: "m{1,2}" },
  { char: "mm", repl: "m{1,2}" },
  { char: "h", repl: "k?h?" },
  { char: "'", repl: "['|’|`]?" },
  { char: "’", repl: "['|’|`]?" },
  { char: "`", repl: "['|’|`]?" },
];

export const simpleLatinReplacerInfo: IPhoneticsReplacerInfoItem[] = [
  { char: "aa", repl: longASoundSimpleLatin },
  { char: "aai", repl: aaySoundSimpleLatin },
  { char: "ai", repl: aaySoundSimpleLatin },
  { char: "aay", repl: aaySoundSimpleLatin },
  { char: "ay", repl: aaySoundSimpleLatin },
  { char: "a", repl: shortASoundSimpleLatin },
  { char: "u", repl: shwaSoundSimpleLatin },
  { char: "U", repl: ooSoundSimpleLatin },
  { char: "o", repl: ooSoundSimpleLatin },
  { char: "oo", repl: ooSoundSimpleLatin },
  {
    char: "i",
    repl: iSoundSimpleLatin,
    replWhenBeginning: iSoundSimpleLatinBeginning,
  },
  { char: "ay", repl: aySoundSimpleLatin },
  { char: "ee", repl: aySoundSimpleLatin },
  { char: "uy", repl: aySoundSimpleLatin },
  { char: "e", repl: middleESoundSimpleLatin },
  { char: "w", repl: "(?:w{1,2}?[UÚ]?|b)" },
  { char: "y", repl: "[ií]?y?" },

  { char: "ts", repl: "(?:s{1,2}|z{1,2|ts|c)" },
  { char: "s", repl: "(?:s{1,2}|z{1,2|ts|c)" },
  { char: "c", repl: "(?:s{1,2}|z{1,2|ts|c)" },
  { char: "dz", repl: "(?:dz|z{1,2}|j)" },
  { char: "z", repl: "(?:s{1,2}|dz|z{1,2}|ts)" },
  { char: "t", repl: "(?:t{1,2}|T|d{1,2}|D)" },
  { char: "tt", repl: "(?:t{1,2}|T|d{1,2}|D)" },
  { char: "T", repl: "(?:t{1,2}|T|d{1,2}|D)" },
  { char: "d", repl: "(?:t{1,2}|T|d{1,2}|D)" },
  { char: "dd", repl: "(?:t{1,2}|T|d{1,2}|D)" },
  { char: "D", repl: "(?:t{1,2}|T|d{1,2}|D)" },
  { char: "r", repl: "(?:R|r{1,2}|N)" },
  { char: "rr", repl: "(?:R|r{1,2}|N)" },
  { char: "R", repl: "(?:R|r{1,2}|N)" },
  { char: "nb", repl: "(?:nb|mb|nw)" },
  { char: "mb", repl: "(?:nb|mb)" },
  { char: "n", repl: "(?:n{1,2}|N)" },
  { char: "N", repl: "(?:R|r{1,2}|N)" },
  { char: "f", repl: "(?:f{1,2}|p{1,2})" },
  { char: "ff", repl: "(?:f{1,2}|p{1,2})" },
  { char: "b", repl: "(?:b{1,2}|p{1,2}|w)" },
  { char: "bb", repl: "(?:b{1,2}|p{1,2})" },
  { char: "p", repl: "(?:b{1,2}|p{1,2}|f{1,2})" },
  { char: "pp", repl: "(?:b{1,2}|p{1,2}|f{1,2})" },

  { char: "sh", repl: "(?:x|sh|s`h)" },
  { char: "x", repl: "(?:kh|gh|x|h){1,2}" },
  { char: "kh", repl: "(?:kh|gh|x|h){1,2}" },

  { char: "k", repl: "(?:k{1,2}|q{1,2})" },
  { char: "kk", repl: "(?:k{1,2}|q{1,2})" },
  { char: "q", repl: "(?:k{1,2}|q{1,2})" },
  { char: "qq", repl: "(?:k{1,2}|q{1,2})" },

  { char: "jz", repl: "(?:G|jz)" },
  { char: "G", repl: "(?:jz|G|g)" },

  { char: "g", repl: "(?:gh?|k{1,2}|G)" },
  { char: "gh", repl: "(?:g|gh|kh|G)" },

  { char: "j", repl: "(?:j{1,2}|ch|dz)" },
  { char: "ch", repl: "(?:j{1,2}|ch)" },

  { char: "l", repl: "l{1,2}" },
  { char: "ll", repl: "l{1,2}" },
  { char: "m", repl: "m{1,2}" },
  { char: "mm", repl: "m{1,2}" },
  { char: "h", repl: "k?h?" },
];

// tslint:disable-next-line
export const latinReplacerRegex =
  /yee|a{1,2}[i|y]|á{1,2}[i|y]|aa|áa|a|ắ|ă|á|U|Ú|u|ú|oo|óo|o|ó|e{1,2}|ée|é|ay|áy|uy|úy|i|í|w|y|q|q|ts|sh|ss|s|dz|z|tt|t|T|dd|d|D|r{1,2}|R|nb|mb|n{1,2}|N|f{1,2}|b{1,2}|p{1,2}|x|kh|q|kk|k|gh|g|G|j|ch|c|ll|l|m{1,2}|h|’|'|`/g;

export const simpleLatinReplacerRegex =
  /yee|a{1,2}[i|y]|aa|a|U|u|oo|o|e{1,2}|ay|uy|i|w|y|q|ts|sh|s|dz|z|tt|t|T|dd|d|D|r{1,2}|R|nb|mb|n{1,2}|N|f{1,2}|b{1,2}|p{1,2}|x|kh|q|k|gh|g|G|j|ch|c|ll|l|m{1,2}|h/g;
