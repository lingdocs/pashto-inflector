/**
 * Copyright (c) lingdocs.com
 *
 * This source code is licensed under the GPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  latinReplacerInfo,
  latinReplacerRegex,
  pashtoReplacerInfo,
  pashtoReplacerRegex,
  simpleLatinReplacerInfo,
  simpleLatinReplacerRegex,
} from "./replacer";

export const pashtoCharacterRange = "\u0621-\u065f\u0670-\u06d3\u06d5";
// Unfortunately, without ES2018 lookbehind assertions word boundary matching is not as clean
// Without lookbehind assertions, we are unable to ignore punctuation directly in front of a word
// and matching results include a space before the word
export const pashtoWordBoundaryBeginning = `(?:^|[^${pashtoCharacterRange}])`;
// These problems are solved by using the ES2018 lookbehind assertions where environments permit
export const pashtoWordBoundaryBeginningWithES2018 = `(?<![${pashtoCharacterRange}])`;
const diacritics = "\u064b-\u065f\u0670\u0674"; // pretty generous diactritic range

interface IFuzzifyOptions {
  readonly matchStart?: "word" | "string" | "anywhere";
  readonly script?: "Pashto" | "Latin";
  readonly matchWholeWordOnly?: boolean;
  readonly simplifiedLatin?: boolean;
  readonly allowSpacesInWords?: boolean;
  readonly returnWholeWord?: boolean;
  readonly es2018?: boolean;
  readonly ignoreDiacritics?: boolean;
}

function sanitizeInput(input: string, options: IFuzzifyOptions): string {
  let safeInput = input.trim().replace(/[#-.]|[[-^]|[?|{}]/g, "");
  if (options.allowSpacesInWords !== undefined && options.allowSpacesInWords) {
    safeInput = safeInput.replace(/ /g, "");
  }
  if (options.ignoreDiacritics !== undefined && options.ignoreDiacritics) {
    // Using literal regular expressions instead of variable for security linting
    safeInput = safeInput.replace(/[\u064b-\u065f\u0670\u0674]/g, "");
  }
  return safeInput;
}

function prepareMainRegexLogicLatin(
  sanitizedInput: string,
  options: IFuzzifyOptions,
): string {
  const input = sanitizedInput; // options.allowSpacesInWords ? sanitizedInput.split("").join(" *") : sanitizedInput;
  return input.replace(
    options.simplifiedLatin !== undefined && options.simplifiedLatin
      ? simpleLatinReplacerRegex
      : latinReplacerRegex,
    (mtch, offset) => {
      const r = (
        options.simplifiedLatin !== undefined && options.simplifiedLatin
          ? simpleLatinReplacerInfo
          : latinReplacerInfo
      ).find((x) => x.char === mtch);
      let section: string;
      /* istanbul ignore next */
      if (!r) {
        section = mtch;
      } else if (
        offset === 0 &&
        r.replWhenBeginning !== undefined &&
        r.replWhenBeginning
      ) {
        section = r.replWhenBeginning;
      } else {
        section = r.repl;
      }
      // TODO: Should we allow ignorable letters as we do with the Pashto script?
      return options.simplifiedLatin !== undefined && options.simplifiedLatin
        ? `${section}y?`
        : `${section}[’|'|\`|y]?${options.allowSpacesInWords !== undefined && options.allowSpacesInWords ? " ?" : ""}`;
    },
  );
}

function prepareMainRegexLogicPashto(
  sanitizedInput: string,
  options: IFuzzifyOptions,
): string {
  const input =
    options.allowSpacesInWords !== undefined && options.allowSpacesInWords
      ? sanitizedInput.split("").join(" *")
      : sanitizedInput;
  return input.replace(pashtoReplacerRegex, (mtch, offset) => {
    const r = pashtoReplacerInfo.find((x) => x.char === mtch);
    let section: string;
    /* eslint-disable */
    if (r === undefined) {
      section = mtch;
    } else if (!r.range && r.plus) {
      const additionalOptionGroups = r.plus.join("|");
      section = `(?:${additionalOptionGroups})`;
    } else if (r.range && r.plus) {
      const additionalOptionGroups = r.plus.join("|");
      section = `(?:[${r.range}]|${additionalOptionGroups})`;
    } else {
      section = `[${r && r.range}]`;
    }
    const mtchIsInMiddle = offset !== 0 && offset !== sanitizedInput.length - 1;
    const isBeginningAlefFollowedByWaw =
      mtch === "ا" && offset === 0 && sanitizedInput[1] === "و";
    const isBeginningWaw = offset === 0 && mtch === "و";
    // tslint:disable-next-line                                                                                                                                 // TODO: for some reason mtchIsInMiddle is not working very well on the second letter so I'm just adding this for every match (not ideal)
    return `${isBeginningWaw ? "ا?" : ""}${section}${r && (r.ignorable || (r.ignorableIfInMiddle && mtchIsInMiddle) || isBeginningAlefFollowedByWaw) ? "?" : ""}[ا|و|ی|ي|ې|ع]?${options.ignoreDiacritics ? `[${diacritics}]?` : ""}`;
    /* eslint-enable */
  });
}

function getBeginningWithAnywhere(options: IFuzzifyOptions): string {
  // Override the "anywhere" when matchWholeWordOnly is true
  if (options.matchWholeWordOnly !== undefined && options.matchWholeWordOnly) {
    return options.script === "Latin" ? "\\b" : pashtoWordBoundaryBeginning;
  }
  if (options.returnWholeWord !== undefined && options.returnWholeWord) {
    // Return the whole world even if matching from the middle (if desired)
    if (options.script === "Latin") {
      return "\\b\\S*";
    }
    return `${pashtoWordBoundaryBeginning}[${pashtoCharacterRange}]*`;
  }
  return "";
}

function prepareBeginning(options: IFuzzifyOptions): string {
  // options.matchStart can be "string", "anywhere", or "word" (default)
  if (options.matchStart === "string") {
    return "^";
  }
  if (options.matchStart === "anywhere") {
    return getBeginningWithAnywhere(options);
  }
  // options.matchStart default "word"
  // return the beginning word boundary depending on whether es2018 is enabled or not
  if (options.script === "Latin") {
    return "\\b";
  }
  return options.es2018 !== undefined && options.es2018
    ? pashtoWordBoundaryBeginningWithES2018
    : pashtoWordBoundaryBeginning;
}

function prepareEnding(options: IFuzzifyOptions): string {
  if (options.matchWholeWordOnly !== undefined && options.matchWholeWordOnly) {
    return options.script === "Latin" ? "\\b" : `(?![${pashtoCharacterRange}])`;
  }
  if (options.returnWholeWord !== undefined && options.returnWholeWord) {
    return options.script === "Latin"
      ? "\\S*\\b"
      : `[${pashtoCharacterRange}]*(?![${pashtoCharacterRange}])`;
  }
  return "";
}

// Main function for returning a regular expression based on a string of Pashto text
export function fuzzifyPashto(
  input: string,
  options: IFuzzifyOptions = {},
): string {
  const sanitizedInput = sanitizeInput(input, options);
  let mainRegexLogic: string;
  if (options.script === "Latin") {
    mainRegexLogic = prepareMainRegexLogicLatin(sanitizedInput, options);
  } else {
    mainRegexLogic = prepareMainRegexLogicPashto(sanitizedInput, options);
  }
  const beginning = prepareBeginning(options);
  const ending = prepareEnding(options);
  return `${beginning}${mainRegexLogic}${ending}`;
}
