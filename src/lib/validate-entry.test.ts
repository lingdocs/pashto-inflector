/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { standardizeEntry, validateEntry } from "./validate-entry";
import * as T from "../types";
import { standardizePhonetics } from "./standardize-pashto";

const toTest: {
    input: any,
    output: T.DictionaryEntryError | { ok: true } | { checkComplement: true },
}[] = [
    {
        input: { ts: undefined },
        output: {
            errors: ["missing ts", "missing i", "missing p", "missing f", "missing e"],
            p: "",
            f: "",
            e: "",
            erroneousFields: ["ts", "i", "p", "f", "e"],
            ts: 0,
        },
    },
    {
        input: { ts: 123, p: "کور", e: "house" },
        output: {
            errors: ["missing i", "missing f"],
            p: "کور",
            f: "",
            ts: 123,
            e: "house",
            erroneousFields: ["i", "f"],
        },
    },
    {
        input: {"i":293,"ts":1527821299,"p":"اخطار","f":"ixtáar","e":"warning, reprimand, admonishment","c":"n. m."},
        output: {
            errors: ["script and phonetics do not match for p and f"],
            p: "اخطار",
            f: "ixtáar",
            e: "warning, reprimand, admonishment",
            ts: 1527821299,
            erroneousFields: ["p", "f"],
        },
    },
    {
        input: {"i":2433,"ts":1527815197,"p":"پښتون","f":"puxtoon","e":"Pashtun","c":"n. m. unisex / adj. irreg.","infap":"پښتانه","infaf":"puxtaanu","infbf":"puxtan"},
        output: {
            errors: ["missing infbp"],
            p: "پښتون",
            f: "puxtoon",
            e: "Pashtun",
            ts: 1527815197,
            erroneousFields: ["infbp"],
        },
    },
    {
        input: {"i":2433,"ts":1527815197,"p":"پښتون","f":"puxtoon","e":"Pashtun","c":"n. m. unisex / adj. irreg.","infap":"پښتانه","infaf":"puxtaanu","infbp":"پښتن"},
        output: {
            errors: ["missing infbf"],
            p: "پښتون",
            f: "puxtoon",
            e: "Pashtun",
            ts: 1527815197,
            erroneousFields: ["infbf"],
        },
    },
    {
        input: {"i":2433,"ts":1527815197,"p":"پښتون","f":"puxtoon","e":"Pashtun","c":"n. m. unisex / adj. irreg.","infap":"پښتانه","infaf":"puktaanu","infbp":"پښتن"},
        output: {
            errors: ["script and phonetics do not match for infap and infaf", "missing infbf"],
            p: "پښتون",
            f: "puxtoon",
            e: "Pashtun",
            ts: 1527815197,
            erroneousFields: ["infap", "infaf", "infbf"],
        },
    },
    {
        input: {"i":5000,"ts":1527819674,"p":"څملاستل","f":"tsumlaastúl","e":"to lie down","l":1596485996977,"separationAtP":2,"c":"v. intrans. seperable","psp":"څمل","psf":"tsaml","noOo":true},
        output: {
            errors: ["missing separationAtF"],
            p: "څملاستل",
            f: "tsumlaastúl",
            e: "to lie down",
            ts: 1527819674,
            erroneousFields: ["separationAtF"],
        },
    },
    {
        input: {"i":5000,"ts":1527819674,"p":"څملاستل","f":"sumlaastúl","e":"to lie down","l":1596485996977,"separationAtP":2,"c":"v. intrans. seperable","psp":"څمل","psf":"tsaml","noOo":true},
        output: {
            errors: ["script and phonetics do not match for p and f", "missing separationAtF"],
            p: "څملاستل",
            f: "sumlaastúl",
            e: "to lie down",
            ts: 1527819674,
            erroneousFields: ["p", "f", "separationAtF"],
        },
    },
    {
        input: {"i":5000,"ts":1527819674,"p":"څملاستل","f":"tsumlaastúl","e":"to lie down","l":1596485996977,"separationAtF":4,"c":"v. intrans. seperable","psp":"څمل","psf":"tsaml","noOo":true},
        output: {
            errors: ["missing separationAtP"],
            p: "څملاستل",
            f: "tsumlaastúl",
            e: "to lie down",
            ts: 1527819674,
            erroneousFields: ["separationAtP"],
        },
    },
    {
        input: {"i":2222,"ts":1571859113828,"p":"پخول","f":"pakhawul","e":"to cook, prepare, to cause to ripen, mature","c":"v. stat. comp. trans."},
        output: {
            errors: ["missing complement for compound verb"],
            p: "پخول",
            f: "pakhawul",
            e: "to cook, prepare, to cause to ripen, mature",
            ts: 1571859113828,
            erroneousFields: ["l"],
        },
    },
    {
        input: {"i":2222,"ts":1571859113828,"p":"پخول","f":"pakhawul","e":"to cook, prepare, to cause to ripen, mature","l":1574867531681,"c":"v. stat. comp. trans."},
        output: {
            checkComplement: true,
        },
    },
    {
        input: {"i":2231,"ts":1527812013,"p":"پراخ","f":"praakh, paráakh","e":"wide, broad, spacious, vast","c":"adj."},
        output: { ok: true },
    },
    {
        input: {"i":0,"ts":1527812013,"p":"پراخ","f":"praakh, paráakh","e":"wide, broad, spacious, vast","c":"adj."},
        output: { ok: true },
    },
    {
        input: {"i":12,"ts":1575058859661,"p":"آبدار","f":"aawdáar","e":"watery, damp, humid, juicy","c":"adj."},
        output: {
            errors: ["script and phonetics do not match for p and f"],
            p: "آبدار",
            f: "aawdáar",
            e: "watery, damp, humid, juicy",
            ts: 1575058859661,
            erroneousFields: ["p", "f"],
        },
    },
    {
        input: {"i":12,"ts":1575058859661,"p":"آبدار","f":"aawdáar","e":"watery, damp, humid, juicy","c":"adj.","diacExcept":true},
        output: { ok: true },
    },
];

test("validateEntry should work", () => {
    toTest.forEach((t) => {
        expect(validateEntry(t.input as T.DictionaryEntry)).toEqual(t.output);
    });
});

test("standardizeEntry", () => {
    expect(standardizeEntry({"i":195,"ts":1527822036,"p":"اجتماعي","f":"ijtimaa‘ee, ijtimaayee","g":"ijtimaaee,ijtimaayee","e":"public, social, societal","c":"adj."}))
        .toEqual({"i":195,"ts":1527822036,"p":"اجتماعي","f":"ijtimaa'ee, ijtimaayee","g":"ijtimaaee,ijtimaayee","e":"public, social, societal","c":"adj."});
});
