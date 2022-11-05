/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { simplifyPhonetics } from "./simplify-phonetics";

const toTest: [string, string][] = [
    ["saRéy", "saRey"],
    ["Utráa`ee", "Utraaee"],
    ["be kaar", "bekaar"],
    ["ma'alóom", "maaloom"],
    ["lÚtfan", "lUtfan"],
    ["písta", "pista"],
    ["săr", "sar"],
    ["kawúl", "kawul"],
    ["sắr", "sar"],
    ["kaar-U-baar", "kaarUbaar"],
];

test("simplifyPhonetics should work", () => {
    toTest.forEach((pair) => {
        expect(simplifyPhonetics(pair[0])).toEqual(pair[1]);
    });
});