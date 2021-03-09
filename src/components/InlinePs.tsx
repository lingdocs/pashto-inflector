/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Pashto from "./Pashto";
import Phonetics from "./Phonetics";
import * as T from "../types";

function InlinePs ({ 
    children,
    ps,
    opts,
}: {
    ps?: T.PsString,
    children: T.PsString,
    opts: T.TextOptions,
}) {
    const text = children || ps;
    return (
        <span>
            <Pashto opts={opts}>{text}</Pashto>
            {opts.phonetics !== "none" && " - "}
            <Phonetics opts={opts}>{text}</Phonetics>
            {text.e && <span className="text-muted"> ({text.e})</span>}
        </span>
    );
}

export default InlinePs;