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

type PsStringWSub = T.PsString & { sub?: any };

function Examples({ 
    children,
    ex,
    opts,
}: {
    ex?: PsStringWSub | PsStringWSub[],
    children: PsStringWSub | PsStringWSub[],
    opts: T.TextOptions,
}) {
    const examples = children || ex;
    const Example = ({ children: text }: { children: PsStringWSub }) => (
        <div className="mt-1 mb-3">
            <div>
                <Pashto opts={opts}>{text}</Pashto>
            </div>
            <div>
                <Phonetics opts={opts}>{text}</Phonetics>
            </div>
            {text.e && <div className="text-muted">
                {text.e}
            </div>}
            {text.sub && <div className="small text-muted">
                {text.sub}
            </div>} 
        </div>
    );
    return Array.isArray(examples) ?
        <div>
            {examples.map((example, i) => <Example key={i}>{example}</Example>)}
        </div>
        :
        <Example>{examples}</Example>;
}

export default Examples;