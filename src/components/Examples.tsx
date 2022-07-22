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

function Examples(props: ({
    ex: T.PsJSX | T.PsJSX[] | PsStringWSub | PsStringWSub[],
} | {
    children: T.PsJSX | T.PsJSX[] | PsStringWSub | PsStringWSub[],
}) & {
    opts: T.TextOptions,
    lineHeight?: 0 | 1 | 2 | 3 | 4,
}) {
    const examples = "children" in props ? props.children : props.ex;
    const Example = ({ children: text }: { children: PsStringWSub }) => (
        <div className={props.lineHeight !== undefined ? `mb-${props.lineHeight}` : `mt-1 mb-3`}>
            <div>
                <Pashto opts={props.opts}>{text}</Pashto>
            </div>
            <div>
                <Phonetics opts={props.opts}>{text}</Phonetics>
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
            {/* @ts-ignore */}
            {examples.map((example, i) => <Example key={i}>{example}</Example>)}
        </div>
        :
        // @ts-ignore
        <Example>{examples}</Example>;
}

export default Examples;