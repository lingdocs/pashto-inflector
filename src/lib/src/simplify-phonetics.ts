/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const matcher = {
  q: "k",
  á: "a",
  ă: "a",
  ú: "u",
  é: "e",
  í: "i",
  ó: "o",
  G: "g",
  Ú: "U",
  "-": "",
  "\u0301": "",
  " ": "",
  "'": "",
  "`": "",
};

const fRepRegex = / |Ú|á|ă|ú|é|í|ó|G|q|'|`|-|\u0301/g;

export function simplifyPhonetics(f: string): string {
  return f.replace(fRepRegex, (mtch) => {
    // @ts-expect-error because
    const result: string = matcher[mtch]; // eslint-disable-line
    return result;
  });
}
