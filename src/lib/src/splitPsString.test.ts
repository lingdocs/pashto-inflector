import {
    splitPsString,
} from "./splitPsString";
import * as T from "../../types";
import { removeFVarients } from "./accent-and-ps-utils";

const toTest: {
    input: T.PsString,
    result: T.PsWord[] | string,
}[] = [
    {
        input: { p: "بې اثر", f: "be asur" },
        result: [{ p: "بې", f: "be" }, { p: "اثر", f: "asur" }],
    },
    {
        input: { p: "بېکاره", f: "bekaara" },
        result: [{ p: "بېکاره", f: "bekaara" }],
    },
    {
        input: { p: "بې کاره", f: "bekaara" },
        result: "spacing discrepency",
    },
    {
        input: { p: "بې کاره", f: "bekaara" },
        result: "spacing discrepency",
    },
    {
        input: { p: "بېکاره", f: "be kaara" },
        result: "spacing discrepency",
    },
    {
        input: { p: "بې کاره", f: "be" },
        result: "spacing discrepency",
    },
    {
        input: { p: "بې", f: "be kaara" },
        result: "spacing discrepency",
    },
    {
        input: { p: "اصال ثواب", f: "isaal-e-sawaab" },
        result: [{
            p: "اصال",
            f: "isaal",
            hyphen: [{
                type: "unwritten",
                f: "e",
            }, {
                type: "written",
                p: "ثواب",
                f: "sawaab",
            }],
        }],
    },
    {
        input: { p: "کار و بار", f: "kaar-U-baar" },
        result: [{
            p: "کار",
            f: "kaar",
            hyphen: [{
                type: "written",
                f: "U",
                p: "و",
            }, {
                type: "written",
                p: "بار",
                f: "baar",
            }],
        }],
    },
    {
        input: { p: "کار و بار کول", f: "kaar-U-baar kawul" },
        result: [{
            p: "کار",
            f: "kaar",
            hyphen: [{
                type: "written",
                f: "U",
                p: "و",
            }, {
                type: "written",
                p: "بار",
                f: "baar",
            }],
        }, {
            p: "کول",
            f: "kawul",
        }],
    },
];

test("splitPsString should work", () => {
    toTest.forEach(({ input, result }) => {
        const x = removeFVarients(input);
        if (typeof result === "string") {
            expect(() => {
                splitPsString(x);
            }).toThrow(result);
        } else {
            expect(splitPsString(x)).toEqual(result);
        }
    });
});