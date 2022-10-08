/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Pashto from "./Pashto";
import Phonetics from "./Phonetics";
import * as T from "../../types";

function SingleItemDisplay({ item, textOptions, english }: {
    item: T.PsString,
    textOptions: T.TextOptions,
    english?: T.EnglishBlock | string,
}) {
    const eng = Array.isArray(english) ? english[0][0] : english;
    return <div className="text-center mt-3 mb-2">
        <div><Pashto opts={textOptions}>{item}</Pashto></div>
        <div><Phonetics opts={textOptions}>{item}</Phonetics></div>
        {eng && <div className="text-muted">{eng}</div>}
    </div>;
}

export default SingleItemDisplay;