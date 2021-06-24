/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as T from "../types";

/**
 * Allows PsString transforming methods to be applied to a Pashto/Phonetics set of JSX elements
 * outputs a single part of the pair (p or f) with the transform function applied to all the text
 * within
 * eg: { p: <>زه <strong>ځم</strong></>, f : <>zu <strong>dzum</strong></> }
 * 
 * @param ps 
 * @param target 
 * @param dealWithString 
 * @returns 
 */
export function psJSXMap(ps: T.PsJSX, target: "p" | "f", dealWithString: (ps: T.PsString) => string): JSX.Element {
    const base = ps[target];
    const sec = ps[target === "p" ? "f" : "p"];
    try {
        return {
            ...base,
            props: {
                ...base.props,
                children: typeof base.props.children === "string"
                    ? dealWithString({
                        p: (target === "p" ? base : sec).props.children,
                        f: (target === "p" ? sec : base).props.children,
                    }) 
                    : base.props.children.map((x: string | JSX.Element, i: number) => {
                        if (typeof x === "string") {
                            return dealWithString({
                                p: (target === "p" ? x : sec.props.children[i]),
                                f: (target === "p" ? sec.props.children[i] : x),
                            });
                        }
                        return psJSXMap({
                            p: (target === "p" ? x : sec.props.children[i]),
                            f: (target === "p" ? sec.props.children[i] : x),
                        }, target, dealWithString);
                    }),
            },
        };
    } catch (e) {
        console.error(e);
        throw new Error("error mapping out PsJSX - unbalanced trees");
    }
}

// UNUSED POC OF THE BASIC JSXMAP - COULD BE PUBLISHED SEPERATELY 

/**
 * Allows a text transform function to be run over all the text in a JSX element
 * 
 * @param e a JSX Element
 * @param f a function to transform the text
 * @returns the JSX Element with all the text transformed
 */
export function JSXMap(e: JSX.Element, f: (s: string) => string): JSX.Element {
    return {
        ...e,
        props: {
            ...e.props,
            children: typeof e.props.children === "string"
                ? f(e.props.children) 
                : e.props.children.map((x: string | JSX.Element) => {
                    if (typeof x === "string") {
                        return f(x);
                    }
                    return JSXMap(x, f);
                }),
        },
    };
}