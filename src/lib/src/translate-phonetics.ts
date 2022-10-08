/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  replacerInfo,
  replacerRegex,
} from "./translate-phonetics-replacer";

export function translatePhonetics(input: string, options: {
      system: "alalc" | "ipa";
      dialect: "standard" | "peshawer" | "southern";
  }): string {
  const translated = input.replace(replacerRegex, (mtch): any => {
    const r = replacerInfo.find((x) => x.char === mtch);
    /* istanbul ignore next */
    if (!r) {
      return;
    }
    const r2 = r[options.system];
    if (typeof r2 === "string") {
      // no dialect options present
      return r2;
    }
    // dialect options present, choose the appropriate one
    return r2[options.dialect];
  });
  return translated;
}
