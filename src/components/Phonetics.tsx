/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    translatePhonetics,
} from "../lib/translate-phonetics";
import { psJSXMap } from "../lib/jsx-map";
import * as T from "../types";

const Phonetics = ({ opts, children: text }: {
    opts: T.TextOptions,
    children: T.PsJSX | T.PsString | string,
}) => {
    if (opts.phonetics === "none") {
        return null;
    }
    const handleText = (f: string) => (
        opts.phonetics === "lingdocs"
            ? f
            : translatePhonetics(f, {
                dialect: opts.dialect,
                // @ts-ignore - weird TS not picking up the elimination of "none herre"
                system: opts.phonetics,
            })
    );
    if (typeof text !== "string" && typeof text.f !== "string") {
        return psJSXMap(text as T.PsJSX, "f", ({f}) => handleText(f));
    }
    const f = typeof text === "string" ? text : text.f as string;
    return <span className="f-text">
        {handleText(f)}
    </span>
};

export default Phonetics;
