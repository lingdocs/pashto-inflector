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
import * as T from "../types";

const Pashto = ({ opts, children: text }: { 
    opts: T.TextOptions,
    children: T.PsString,
}) => {
    const p = opts.diacritics
        ? (phoneticsToDiacritics(text.p, text.f) || text.p)
        : text.p;
    const style = opts.pTextSize === "normal"
        ? undefined
        : { fontSize: opts.pTextSize === "larger" ? "large" : "larger" };
    return (
        <span className="p-text" dir="rtl" style={style}>
            {opts.spelling === "Afghan" ? p : convertAfToPkSpelling(p)}
        </span>
    );
};

export default Pashto;
