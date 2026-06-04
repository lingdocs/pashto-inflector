/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export function standardizePashto(input: string): string {
  // Replace Arabic ى with Farsi ی
  return (
    input
      .replace(/\u0649/g, "\u06cc")
      // Replace Urdu ہ and ھ with ه
      .replace(/ھ|ہ/g, "ه")
      // Replace Arabic ك with ک
      .replace(/\u0643/g, "\u06a9")
      // Replace Farsi گ with ګ
      .replace(/گ/g, "ګ")
      // Replace ي in the middle of words with ی
      .replace(/ي(?=[\u0621-\u065f\u0670-\u06d3\u06d5])/g, "ی")
      // Replace آ two character version with combined آ character
      .replace(/آ/g, "آ")
      // Replace narrow no-break space with space
      .replace(/\u202F/g, " ")
  );
}

export function standardizePhonetics(input: string): string {
  // TODO: check that these are the only kinds of smart comments
  return input.replace(/[‘|’]/g, "'");
}

export default function sanitizePashto(input: string): string {
  return (
    standardizePashto(input.trim())
      .replace(/v/g, "w")
      // remove diacritics as well
      .replace(/[\u0600-\u061e\u064c-\u0670\u06D6-\u06Ed]/g, "") // eslint-disable-line
  );
  // TODO: What to do with \u0674 ??
}
