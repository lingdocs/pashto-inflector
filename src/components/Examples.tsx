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

function EnglishContent({ children }: { children: (string | JSX.Element)[] | (string | JSX.Element) }) {
    if (Array.isArray(children)) {
        return <>
            {children.map((x) => <EnglishContent>{x}</EnglishContent>)}
        </>
    }
    return <div className="text-muted">
        {children}
    </div>;
}

function Examples({ 
    children,
    ex,
    opts,
    lineHeight,
}: {
    ex?: PsStringWSub | PsStringWSub[] | T.PsJSX | T.PsJSX[],
    children: PsStringWSub | PsStringWSub[],
    opts: T.TextOptions,
    lineHeight?: 0 | 1 | 2 | 3 | 4,
}) {
    const examples = children || ex;
    const Example = ({ children: text }: { children: PsStringWSub }) => (
        <div className={lineHeight !== undefined ? `mb-${lineHeight}` : `mt-1 mb-3`}>
            <div>
                <Pashto opts={opts}>{text}</Pashto>
            </div>
            <div>
                <Phonetics opts={opts}>{text}</Phonetics>
            </div>
            {text.e && <EnglishContent>
                {text.e}
            </EnglishContent>}
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