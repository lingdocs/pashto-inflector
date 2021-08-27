/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as T from "../types";

/**
 * takes a string of standard Afghan Pashto text and puts it into the same or a different spelling system
 * 
 * @param input 
 * @param spelling 
 * @returns 
 */
export function convertSpelling(input: string, spelling: T.Spelling): string {
  if (spelling === "Afghan") {
    return input;
  }
  return input.replace(/ای(?![\u0621-\u065f\u0670-\u06d3\u06d5])/g, "ائ")
    .replace(/وی(?![\u0621-\u065f\u0670-\u06d3\u06d5])/g, "وی")
    .replace(/ی(?![\u0621-\u065f\u0670-\u06d3\u06d5])/g, "ے")
    .replace(/ي(?![\u0621-\u065f\u0670-\u06d3\u06d5])/g, (spelling === "Pakistani ی")
      ? "ی"
      : "ي")
    .replace(/(?:ای|اي)(?=ي|ی|ې)/g, "ائ")
    .replace(/(?:وی|وي)(?=ي|ی|ې)/g, "وئ")
    .replace(/(?:ای|اي)(?=[\u0621-\u065f\u0670-\u06d3\u06d5])/g, "ائي")
    .replace(/(?:وی|وي)(?=[\u0621-\u065f\u0670-\u06d3\u06d5])/g, "وئي");
}

/**
 * Takes a string of a given spelling system and puts it into standardAfghan Pashto text
 * 
 * @param input 
 * @param spelling 
 */
export function revertSpelling(input: string, spelling: T.Spelling): string {
  if (spelling === "Afghan") {
    return input;
  }
  return input
    .replace(new RegExp(`${spelling === "Pakistani ی"
      ? "ی"
      : "ي"}(?![\u0621-\u065f\u0670-\u06d3\u06d5])`, "g"), "ي")
    .replace(/ے(?![\u0621-\u065f\u0670-\u06d3\u06d5])/g, "ی")
    .replace(/ائ(?![\u0621-\u065f\u0670-\u06d3\u06d5])/g, "ای")
    .replace(/وئ(?![\u0621-\u065f\u0670-\u06d3\u06d5])/g, "وی")
    .replace(/(?:ائی|ائي)(?=[\u0621-\u065f\u0670-\u06d3\u06d5])/g, "اي")
    .replace(/(?:وئی|وئي)(?=[\u0621-\u065f\u0670-\u06d3\u06d5])/g, "وي")
    .replace(/ائ(?=ي|ی|ې)/g, "اي")
    .replace(/وئ(?=ي|ی|ې)/g, "وي");;
}
