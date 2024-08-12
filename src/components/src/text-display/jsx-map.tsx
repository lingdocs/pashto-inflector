/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as T from "../../../types";

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
export function psJSXMap(
  ps: T.PsJSX,
  target: "p" | "f",
  dealWithString: (ps: T.PsString) => string | JSX.Element
): JSX.Element {
  const base = ps[target];
  const sec = ps[target === "p" ? "f" : "p"];
  try {
    return {
      ...base,
      props: {
        // TODO: could make this a lot cleaner/less repetitive by following a better recursive formula
        // see https://adueck.github.io/blog/recursively-modify-text-jsx-react/
        ...base.props,
        children:
          typeof base.props.children === "string"
            ? dealWithString({
                p: (target === "p" ? base : sec).props.children,
                f: (target === "p" ? sec : base).props.children,
              })
            : base.props.children.map
            ? base.props.children.map((x: string | JSX.Element, i: number) =>
                typeof x === "string"
                  ? dealWithString({
                      p: target === "p" ? x : sec.props.children[i],
                      f: target === "p" ? sec.props.children[i] : x,
                    })
                  : psJSXMap(
                      {
                        p: target === "p" ? x : sec.props.children[i],
                        f: target === "p" ? sec.props.children[i] : x,
                      },
                      target,
                      dealWithString
                    )
              )
            : typeof base.props.children === "string"
            ? dealWithString({
                p: target === "p" ? base.props.children : sec.props.children,
                f: target === "p" ? sec.props.children : base.props.children,
              })
            : psJSXMap(
                {
                  p: target === "p" ? base.props.children : sec.props.children,
                  f: target === "p" ? sec.props.children : base.props.children,
                },
                target,
                dealWithString
              ),
      },
    };
  } catch (e) {
    console.error(e);
    throw new Error("error mapping out PsJSX - unbalanced trees");
  }
}
