/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
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
    "\u0301": "",
    " ": "",
    "'": "",
    "`": "",
};

const fRepRegex = / |Ú|á|ă|ú|é|í|ó|G|q|'|`|\u0301/g;

export function simplifyPhonetics(f: string): string {
    return f.replace(fRepRegex, (mtch) => {
        // @ts-ignore
        return matcher[mtch];
    });
}