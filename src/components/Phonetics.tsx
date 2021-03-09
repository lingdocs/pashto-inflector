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
import * as T from "../types";

const Phonetics = ({ opts, children: text }: {
    opts: T.TextOptions,
    children: T.PsString,
}) => {
    if (opts.phonetics === "none") {
        return null;
    }
    return <span className="f-text">
        {opts.phonetics === "lingdocs"
            ? text.f
            : translatePhonetics(text.f, {
                dialect: opts.dialect,
                system: opts.phonetics,
        })}
    </span>
};

export default Phonetics;
