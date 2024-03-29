/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    translatePhonetics,
} from "../../lib/src/translate-phonetics";
import { psJSXMap } from "./jsx-map";
import * as T from "../../types";

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
    return <span className="f-text">
        {(typeof text !== "string" && typeof text.f !== "string")
            ? psJSXMap(text as T.PsJSX, "f", ({f}) => handleText(f))
            : handleText(typeof text === "string" ? text : text.f as string)}
    </span>
};

export default Phonetics;
