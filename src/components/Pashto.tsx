/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    convertAfToPkSpelling,
} from "../lib/convert-spelling";
import {
    phoneticsToDiacritics
} from "../lib/phonetics-to-diacritics";
import { psJSXMap } from "../lib/jsx-map";
import * as T from "../types";

const Pashto = ({ opts, children: text }: { 
    opts: T.TextOptions,
    children: T.PsString | T.PsJSX,
}) => {
    function convertText(ps: T.PsString, opts: T.TextOptions): string {
        const p = opts.diacritics
            ? (phoneticsToDiacritics(ps.p, ps.f) || ps.p)
            : ps.p;
        return opts.spelling === "Afghan"
            ? p
            : convertAfToPkSpelling(p);
    }
    if (typeof text.p !== "string" && typeof text.f !== "string") {
        return psJSXMap(
            text as T.PsJSX,
            "p",
            (ps: T.PsString) => convertText(ps, opts),
        );
    }
    const style = opts.pTextSize === "normal"
        ? undefined
        : { fontSize: opts.pTextSize === "larger" ? "large" : "larger" };
    return (
        <span className="p-text" dir="rtl" style={style}>
            {convertText(text as T.PsString, opts)}
        </span>
    );
};

export default Pashto;
