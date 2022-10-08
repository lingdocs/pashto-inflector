/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const zwar = "َ";
const zwarakey = "ٙ";
const zer = "ِ";
const pesh = "ُ";
const sukun = "ْ";
const hamzaAbove = "ٔ";
const tashdeed = "ّ";
const wasla = "ٱ";
const daggerAlif = "ٰ";
const fathahan = "ً";

// TODO: THESE OTHER TRIGRAPHS??
const quadrigraphs = ["-Ul-"];
const trigraphs = ["eyy", "éyy", "-i-", "-U-"]; // , "aay", "áay", "ooy", "óoy"];
const digraphs = ["ắ", "aa", "áa", "ee", "ée", "ey", "éy", "oo", "óo", "kh", "gh", "ts", "dz", "jz", "ch", "sh"];
const endingDigraphs = ["uy", "úy"];
const willIgnore = ["?", " ", "`", ".", "…"];

export function splitFIntoPhonemes(f: string): string[] {
  const result: string[] = [];
  let index = 0;
  while (index < f.length) {
    const isLastTwoLetters = (index === f.length - 2 || f[index + 2] === " ");
    const threeLetterChunk = f.slice(index, index + 3);
    const fourLetterChunk = f.slice(index, index + 4);
    if (quadrigraphs.includes(fourLetterChunk)) {
      result.push(fourLetterChunk);
      index += 4;
      continue;
    }
    if (trigraphs.includes(threeLetterChunk)) {
      result.push(threeLetterChunk);
      index += 3;
      continue;
    }
    const twoLetterChunk = f.slice(index, index + 2);
    if (
      digraphs.includes(twoLetterChunk) ||
      (isLastTwoLetters && endingDigraphs.includes(twoLetterChunk))
    ) {
      result.push(twoLetterChunk);
      index += 2;
      continue;
    }
    const singleLetter = f.slice(index, index + 1);
    if (!willIgnore.includes(singleLetter)) {
      result.push(singleLetter);
    }
    index++;
  }
  return result;
}

const phonemeTable = [
  // consonants
  { phoneme: "b", possibilities: ["ب"], consonant: true },
  { phoneme: "p", possibilities: ["پ"], consonant: true },
  { phoneme: "t", possibilities: ["ت", "ط"], consonant: true },
  { phoneme: "T", possibilities: ["ټ"], consonant: true },
  { phoneme: "s", possibilities: ["س", "ص", "ث"], consonant: true },
  { phoneme: "j", possibilities: ["ج"], consonant: true },
  { phoneme: "ch", possibilities: ["چ"], consonant: true },
  { phoneme: "kh", possibilities: ["خ"], consonant: true },
  { phoneme: "ts", possibilities: ["څ"], consonant: true },
  { phoneme: "dz", possibilities: ["ځ"], consonant: true },
  { phoneme: "d", possibilities: ["د"], consonant: true },
  { phoneme: "D", possibilities: ["ډ"], consonant: true },
  { phoneme: "r", possibilities: ["ر"], consonant: true },
  { phoneme: "R", possibilities: ["ړ"], consonant: true },
  { phoneme: "z", possibilities: ["ز", "ذ", "ظ", "ض"], consonant: true },
  { phoneme: "jz", possibilities: ["ژ"], consonant: true },
  { phoneme: "G", possibilities: ["ږ"], consonant: true },
  { phoneme: "sh", possibilities: ["ش"], consonant: true },
  { phoneme: "x", possibilities: ["ښ"], consonant: true },
  { phoneme: "gh", possibilities: ["غ"], consonant: true },
  { phoneme: "f", possibilities: ["ف"], consonant: true },
  { phoneme: "q", possibilities: ["ق"], consonant: true },
  { phoneme: "k", possibilities: ["ک"], consonant: true },
  { phoneme: "g", possibilities: ["ګ"], consonant: true },
  { phoneme: "l", possibilities: ["ل"], consonant: true },
  { phoneme: "m", possibilities: ["م"], consonant: true },
  { phoneme: "n", possibilities: ["ن"], consonant: true },
  { phoneme: "N", possibilities: ["ڼ"], consonant: true },
  { phoneme: "h", possibilities: ["ه", "ح"], consonant: true, takesSukunOnEnding: true },
  { phoneme: "w", possibilities: ["و"], consonant: true },
  { phoneme: "y", possibilities: ["ی"], consonant: true },

  { phoneme: "'", possibilities: ["ع", "ئ"], consonant: true },
  { phoneme: "-i-", isIzafe: true },
  { phoneme: "-U-", possibilities: [" و ", "و"]},
  { phoneme: "-Ul-", possibilities: ["ال"]},

  // vowels
  { phoneme: "aa", possibilities: ["ا"], beginning: ["آ", "ا"], endingPossibilities: ["ا", "یٰ"], isLongA: true, canStartWithAynBefore: true },
  { phoneme: "áa", possibilities: ["ا"], beginning: ["آ", "ا"], endingPossibilities: ["ا", "یٰ"], isLongA: true, canStartWithAynBefore: true },
  { phoneme: "ee", possibilities: ["ی"], addAlefOnBeginning: true, endingPossibilities: ["ي"], diacritic: zer, canStartWithAynBefore: true },
  { phoneme: "ée", possibilities: ["ی"], addAlefOnBeginning: true, endingPossibilities: ["ي"], diacritic: zer, canStartWithAynBefore: true },
  { phoneme: "e", possibilities: ["ې"], addAlefOnBeginning: true },
  { phoneme: "é", possibilities: ["ې"], addAlefOnBeginning: true },
  { phoneme: "o", possibilities: ["و"], addAlefOnBeginning: true },
  { phoneme: "ó", possibilities: ["و"], addAlefOnBeginning: true },
  { phoneme: "oo", possibilities: ["و"], addAlefOnBeginning: true, alsoCanBePrefix: true, diacritic: pesh },
  { phoneme: "óo", possibilities: ["و"], addAlefOnBeginning: true, diacritic: pesh },
  { phoneme: "ey", possibilities: ["ی"], addAlefOnBeginning: true, endingPossibilities: ["ی"]},
  { phoneme: "éy", possibilities: ["ی"], addAlefOnBeginning: true, endingPossibilities: ["ی"]},
  { phoneme: "uy", possibilities: ["ۍ"], endingOnly: true },
  { phoneme: "úy", possibilities: ["ۍ"], endingOnly: true }, // THIS CAN ONLY COME AT THE END DEAL WITH THIS
  { phoneme: "eyy", possibilities: ["ئ"], endingOnly: true },
  { phoneme: "éyy", possibilities: ["ئ"], endingOnly: true },

  { phoneme: "a", diacritic: zwar, endingPossibilities: ["ه"], canComeAfterHeyEnding: true, canBeFirstPartOfFathahanEnding: true },
  { phoneme: "á", diacritic: zwar, endingPossibilities: ["ه"], canComeAfterHeyEnding: true, canBeFirstPartOfFathahanEnding: true },
  { phoneme: "ă", diacritic: zwar },
  { phoneme: "ắ", diacritic: zwar },
  { phoneme: "u", diacritic: zwarakey, endingPossibilities: ["ه"], hamzaOnEnd: true },
  { phoneme: "ú", diacritic: zwarakey, endingPossibilities: ["ه"], hamzaOnEnd: true },
  { phoneme: "i", diacritic: zer, endingPossibilities: ["ه"], takesDiacriticBeforeGurdaHeyEnding: true, canBeWasla: true, beginning: ["ا", "ع"] },
  { phoneme: "í", diacritic: zer, endingPossibilities: ["ه"], takesDiacriticBeforeGurdaHeyEnding: true, canBeWasla: true, beginning: ["ا", "ع"] },
  { phoneme: "U", diacritic: pesh, endingPossibilities: ["ه"], takesDiacriticBeforeGurdaHeyEnding: true, beginning: ["ا", "ع"] },
  { phoneme: "Ú", diacritic: pesh, endingPossibilities: ["ه"], takesDiacriticBeforeGurdaHeyEnding: true, beginning: ["ا", "ع"] },
];

function isSpace(s: string): boolean {
  return [" ", "\xa0"].includes(s);
}

function isEndSpace(s: string): boolean {
  return [" ", "\xa0", undefined].includes(s);
}

interface IDiacriticsErrorMessage {
  error: string;
  phoneme: string;
  i: number;
}

function possibilityMatches(p: string, pIndex: number, possibilities: string[] | undefined): boolean {
  /* istanbul ignore next */
  if (!possibilities) {
    return false;
  }
  for (const possibility of possibilities) {
    if (p.slice(pIndex, pIndex + possibility.length) === possibility) {
      return true;
    }
  }
  return false;
}

function isPrefixedByDirectionalPronoun(i: number, phonemes: string[]): boolean {
  const potentialPronounFourCharSlice = phonemes.slice(i - 4, i).join("");
  const potentialPronounThreeCharSlice = phonemes.slice(i - 3, i).join("");
  if (["wăr-", "war-", "dăr-", "dar-"].includes(potentialPronounFourCharSlice)) {
    return true;
  }
  if (potentialPronounThreeCharSlice === "raa-") {
    return true;
  }
  return false;
}

export function phoneticsToDiacritics(ps: string, ph: string, forbidOoPrefixes: boolean = false): string | undefined {
  const phonemes = splitFIntoPhonemes(ph.trim().split(",")[0]);
  const p = ps.trim();
  let result = "";
  let pIndex = 0;
  const errored: IDiacriticsErrorMessage[] = [];
  let previousPhonemeWasAConsonant = false;
  phonemes.forEach((phoneme, i) => {
    // on its own, only used for seperating directional pronouns
    if (phoneme === "-") {
      return;
    }
    const phonemeInfo = phonemeTable.find((element) => element.phoneme === phoneme);
    if (!phonemeInfo) {
      errored.push({ error: "phoneme info not found", phoneme, i });
      return;
    }
    const isDoubleConsonant = (
      phonemeInfo.consonant &&
      phoneme === phonemes[i - 1] &&
      // TODO: is this thourough enough to allow double consonants on the ending of the previous word?
      !(isSpace(p[pIndex - 1]) && phonemeInfo.possibilities.includes(p[pIndex])) // avoid false double consonant ie ازل لیک azalleek
    ) ? true : false;
    const isBeginning = !isDoubleConsonant && ((i === 0) || isSpace(p[pIndex - 1]) || (phonemes[i - 1] === "-Ul-") || isPrefixedByDirectionalPronoun(i, phonemes));
    const upcomingAEndingAfterHey = (p[pIndex] === "ح" && isSpace(p[pIndex + 1]) && ["a", "á"].includes(phonemes[i + 1]));
    
    // TODO: break this into a seperate function -- why can it sometimes be set to undefined?
    const isEnding = (i === phonemes.length - 1) || ((
      (phonemeInfo.possibilities && isSpace(p[pIndex + 1])) ||
      (!phonemeInfo.possibilities && isSpace(p[pIndex])) ||
      (
        (!phonemeInfo.possibilities && isSpace(p[pIndex + 1])) &&
        (possibilityMatches(p, pIndex, phonemeInfo.endingPossibilities) || (p[pIndex] === "ع" && phonemes[i + 1] !== "'"))
      )
    ) && !upcomingAEndingAfterHey
      && // makes sure the next letter isn't a double consonant like haqq <-
      !(
          phonemeInfo.consonant && phoneme === phonemes[i + 1] // &&
          // !(isSpace(p[pIndex + 1]) && phonemeInfo.possibilities.includes(p[pIndex]))
      )
    ) || // can be the trailing double consanant on the end of a word
    (
      phonemeInfo.consonant && phoneme === phonemes[i - 1] &&
      !(isEndSpace(p[pIndex - 1]) && phonemeInfo.possibilities.includes(p[pIndex]))
    ) || // can be یٰ ending
    (
      isEndSpace(p[pIndex + 2]) && (p.slice(pIndex, pIndex + 2) === "یٰ")
    );

    const isUofDu = phoneme === "u" && (
      p.slice(pIndex - 2, pIndex) === "د " || // د as previous word
      (p[pIndex] === undefined && p[pIndex - 1] === "د") || // د as the whole thing
      p.slice(pIndex - 6, pIndex) === "د ... " // ... د is as the previous word
    );
    // TODO: Should p[pIndex - 1] also be in there ??? It messed up قطعه for instance
    const isEndingAynVowel = isEnding && phonemeInfo.diacritic && [p[pIndex], p[pIndex - 1]].includes("ع") && p[pIndex] !== "ه";
    const isMiddle = !isBeginning && !isEnding;
    const isSilentWaw = (
      p[pIndex] === "و" &&
      p[pIndex - 1] === "خ" &&
      p[pIndex + 1] === "ا" &&
      ["áa", "aa"].includes(phoneme)
    );
    const isAnAEndingAfterHey = isEnding && p[pIndex - 1] === "ح" && phonemeInfo.canComeAfterHeyEnding;
    if (isDoubleConsonant) {
      pIndex--;
      if (isSpace(p[pIndex])) {
        pIndex--;
      }
    }
    if (isDoubleConsonant && p[pIndex] === "ع") {
      // ridiculously ugly hack to take care of the extra ع that gets added in words like توقع
      result = result.slice(0, -1);
      pIndex--;
    }
    if (isSilentWaw) {
      result += "(و)";
      pIndex++;
    }
    // special check for Arabic wasla
    if (p.slice(0, 3) === "بال" && phonemes[i - 1] === "b" && phonemeInfo.canBeWasla && phonemes[i + 1] === "l") {
      result += phonemeInfo.diacritic + wasla;
      pIndex++;
      previousPhonemeWasAConsonant = false;
      return;
    }
    // special check for fathahan ending
    if (phonemeInfo.canBeFirstPartOfFathahanEnding && p.slice(pIndex, pIndex + 2) === "اً") {
      result += "ا";
      pIndex++;
      return;
    }
    if (isEnding && phoneme === "n" && p[pIndex] === fathahan) {
      result += fathahan;
      pIndex++;
      return;
    }
    // special check for words starting with عا or عی
    if (isBeginning && phonemeInfo.canStartWithAynBefore && p[pIndex] === "ع" && phonemeInfo.possibilities.includes(p[pIndex + 1])) {
      result += "ع";
      result += phonemeInfo.diacritic ? phonemeInfo.diacritic : "";
      result += p[pIndex + 1];
      pIndex += 2;
      return;
    }
    // special check for ؤ Ua
    if (phoneme === "U" && phonemes[i + 1] === "a" && phonemes[i + 2] !== "a" && p[pIndex] === "و") {
      result += "ؤ";
      pIndex++;
      return;
    }
    if (phoneme === "a" && phonemes[i - 1] === "U" && phonemes[i + 1] !== "a" && result.slice(-2) === "ؤ") {
      previousPhonemeWasAConsonant = false;
      return;
    }
    // special check for و wo
    if (isBeginning && phoneme === "w" && phonemes[i + 1] === "o" && p[pIndex] === "و" && isEndSpace(p[pIndex + 1])) {
      result += "و";
      pIndex++;
      return;
    }
    // TODO: isEndSpace here is redundant??
    if (isEnding && phoneme === "o" && phonemes[i - 1] === "w" && p[pIndex - 1] === "و" && isEndSpace(p[pIndex])) {
      pIndex++;
      return;
    }
    // special check for ال - -Ul-
    if (phoneme === "-Ul-" && p.slice(pIndex, pIndex + 2) === "ال") {
      result += "اُل";
      pIndex += 2;
      return;
    }
    // special check for for أ in the middle of the word
    if (!isBeginning && p[pIndex] === "أ" && phoneme === "a" && phonemes[i + 1] === "'" && phonemes[i + 2] === "a") {
      result += "أ";
      pIndex++;
      return;
    }
    if (p[pIndex - 1] === "أ" && phonemes[i - 1] === "a" && phoneme === "'" && phonemes[i + 1] === "a") {
      return;
    }
    if (p[pIndex - 1] === "أ" && phonemes[i - 2] === "a" && phonemes[i - 1] === "'" && phoneme === "a") {
      previousPhonemeWasAConsonant = false;
      return;
    }
    // special check for وو 'oo
    if (!isBeginning && p[pIndex] === "و" && p[pIndex + 1] === "و" && phoneme === "'" && phonemes[i + 1] === "oo") {
      result += "وُو";
      pIndex += 2;
      return;
    }
    if (p[pIndex - 2] === "و" && p[pIndex - 1] === "و" && phonemes[i - 1] === "'" && phoneme === "oo") {
      previousPhonemeWasAConsonant = false;
      return;
    }

    const prevLetterWasBeginningAyn = (
      p[pIndex - 1] === "ع" &&
      // isEndSpace(p[pIndex]) && // This breaks it
      phoneme === "'" 
    );
    // check if the phoneme lines up in the Pashto word
    if (isBeginning && !isUofDu && phonemeInfo.addAlefOnBeginning) {
      // TODO: Maybe a little bad because it doesn't loop through possibilities
      if ((!phonemeInfo.alsoCanBePrefix || forbidOoPrefixes) && p.slice(pIndex, pIndex + 2) !== "ا" + phonemeInfo.possibilities[0]) {
        errored.push({ error: "didn't start with an aleph", phoneme, i });
        return;
      }
      if (p[pIndex] === "ا") {
        result += "ا"; // same as result += p[pIndex]
        pIndex++;
      }
    } else if (isBeginning && phonemeInfo.beginning && phonemeInfo.isLongA) {
      if (!phonemeInfo.beginning.includes(p[pIndex])) {
        errored.push({ error: "improper beginning letter", phoneme, i });
        return;
      }
      result += p[pIndex];
      pIndex++;
      return;
    } else if (
      (isEnding && phonemeInfo.endingPossibilities) &&
      !isUofDu &&
      (
        !possibilityMatches(p, pIndex, phonemeInfo.endingPossibilities) &&
        !isEndingAynVowel && // allowing short vowels on the end of words ending with ع
        !isAnAEndingAfterHey
      )
    ) {
      errored.push({ error: "bad ending", phoneme, i });
      return;
    } else if (
      (isEnding && !phonemeInfo.endingPossibilities) &&
      phonemeInfo.possibilities &&
      !phonemeInfo.possibilities.includes(p[pIndex])
    ) {
      // console.log(phoneme, p[pIndex]);
      errored.push({ error: "bad ending 2", phoneme, i });
      return;
    } else if (
      (phonemeInfo.possibilities && !isEnding) &&
      (
        !(phonemeInfo.possibilities.includes(p[pIndex])) &&
        !(p[pIndex] === "ن" && (p[pIndex + 1] === "ب" && phoneme === "m")) && // && // exception case with نب === mb
        !prevLetterWasBeginningAyn // exception case with words starting with ع like i'zzat
      )
    ) {
      errored.push({ error: "improper coressponding letter in middle of word", phoneme, i });
      return;
    }
    // console.log(phoneme, pIndex, p[pIndex], isEnding);
    // console.log(result);
    // OK, it lines up with the Pashto word, we're good
    // Now continue building the result string
    // deal with starting with short vowels and alef
    if (!isUofDu && isBeginning && !phonemeInfo.possibilities && !phonemeInfo.isIzafe) {
      // TODO: WHY IS THIS HERE
      if (!["ا", "ع"].includes(p[pIndex])) {
        errored.push({ error: "bad beginning 2", phoneme, i });
        return;
      }
      result += p[pIndex];
      pIndex++;
    }
    // if the phoneme carries a diacritic insert it (before the letter if it's coming)
    const isOoPrefix = (phonemeInfo.alsoCanBePrefix && isBeginning && (p[pIndex - 1] !== "ا"));
    if (phonemeInfo.diacritic && !isEnding && !isOoPrefix) {
      // using this hack to remove the space and put it after the zwarakey we're going to add after د 
      if (isUofDu && result.slice(-5) === " ... ")  {
        result = result.slice(0, -5) + zwarakey + " ... ";
      } else if (isUofDu && result.slice(-1) === " ") {
        result = result.slice(0, -1) + zwarakey + " ";
      } else {
        result += phonemeInfo.diacritic;
      }
    }
    // TODO: The middle stuff might be unneccessary/unhelpful
    const isACommaWithoutAyn = (phoneme === "'" && (p[pIndex] !== "ع" && !(isMiddle && p[pIndex] === "ئ")));
    // if the previous phoneme was a consonant insert a sukun
    // console.log("Will I go into the adding thing?");
    if (!isBeginning && previousPhonemeWasAConsonant && phonemeInfo.consonant && phonemes[i - 1] !== "'" && p[pIndex] !== "ع") {
      result += isDoubleConsonant ? tashdeed : sukun;
    }
    if (isEnding && isDoubleConsonant) {
      // This is so ugly, extra space slipping in here
      if (result.slice(-2) === " " + tashdeed) {
        result = result.slice(0, -2) + tashdeed;
      }
    }
    // if there's a pashto letter for the phoneme, insert it
    if (!isEndingAynVowel && !isACommaWithoutAyn && (phonemeInfo.possibilities || isEnding)) {
      // need the isSpace check to prevent weird behaviour with izafe
      if (!isUofDu) {
        if (isAnAEndingAfterHey) {
          result += zwar;
          if (p[pIndex] === " ") {
            result += " ";
          }
        } else {
          result += (isDoubleConsonant || isSpace(p[pIndex])) ? "" : p[pIndex];
        }
      }
      pIndex++;
    }
    if (isEnding) {
      if (isUofDu) {
        result += zwarakey;
      } else if (phonemeInfo.hamzaOnEnd) {
        result += hamzaAbove;
      } else if (phonemeInfo.takesSukunOnEnding) {
        result += sukun;
      } else if (p[pIndex] === daggerAlif) {
        result += daggerAlif;
      } else if (isEndSpace(p[pIndex]) && p[pIndex - 1] === "ه" && phonemeInfo.takesDiacriticBeforeGurdaHeyEnding) {
        result = result.slice(0, -1) + phonemeInfo.diacritic + "ه";
      }
    }
    if (isEnding && isEndingAynVowel) {
      if (p[pIndex] === "ع") {
        result += "ع";
        pIndex++;
      }
      result += phonemeInfo.diacritic;
      if (p[pIndex] === " ") {
        result += " ";
        pIndex++;
      }
      return;
    }
    previousPhonemeWasAConsonant = (!isEnding && phonemeInfo.consonant) ? true : false;
    // ignore the ع or ئ if there's not a ' in the phonetics
    const nextPhonemeInfo = phonemeTable.find((element) => phonemes[i + 1] === element.phoneme);
    if (
      ["ع", "ئ"].includes(p[pIndex]) &&
      ![phonemes[i + 1], phonemes[i + 2]].includes("'") &&
      !(nextPhonemeInfo && nextPhonemeInfo.diacritic && isEndSpace(p[pIndex + 1])) && // don't skip the ع on the end if there's another short letter coming after it
      !(p[pIndex] === "ئ" && isEndSpace(p[pIndex + 1])) && // don't skip ئ on the end
      !phonemeInfo.isIzafe
    ) {
      result += p[pIndex]; // add "ئ" or "ع";
      pIndex++;
    }
    // if we've arrived at the ellipses in the circumposition, skip over it
    if (p.slice(pIndex, pIndex + 5) === " ... ") {
      result += " ... ";
      pIndex += 5;
      return;
    }
    // if we've arrived at a space in the Pashto, move along before the next iteration
    if (isSpace(p[pIndex]) && phonemes[i + 1] !== "-i-" && !upcomingAEndingAfterHey) {
      result += " ";
      pIndex++;
    }
    // need to move ahead one more with words eding in یٰ (because that's two characters)
    if (p[pIndex] === daggerAlif && isSpace(p[pIndex + 1])) {
      result += " ";
      pIndex += 2;
    }
    if (phonemeInfo.isIzafe) {
      result += zer + " ";
    }
  });
  if (errored.length) {
    // console.log(errored);
    return undefined;
  }
  return result;
}
