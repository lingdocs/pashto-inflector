/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import Pashto from "./Pashto";
import Phonetics from "./Phonetics";
import * as T from "../../../types";
import { ReactNode } from "react";

type PsStringWSub = T.PsString & { sub?: ReactNode };

function EnglishContent({
  children,
}: {
  children: (string | JSX.Element)[] | (string | JSX.Element);
}) {
  if (Array.isArray(children)) {
    return (
      <>
        {children.map((x) => (
          <EnglishContent>{x}</EnglishContent>
        ))}
      </>
    );
  }
  return (
    <div className="text-muted" lang="en">
      {children}
    </div>
  );
}

function Examples(
  props: (
    | {
        ex: T.PsJSX | T.PsJSX[] | PsStringWSub | PsStringWSub[];
      }
    | {
        children: T.PsJSX | T.PsJSX[] | PsStringWSub | PsStringWSub[];
      }
  ) & {
    opts: T.TextOptions;
    lineHeight?: 0 | 1 | 2 | 3 | 4;
  }
) {
  const examples = "children" in props ? props.children : props.ex;
  const Example = ({ children: text }: { children: PsStringWSub }) => (
    <div
      className={
        props.lineHeight !== undefined ? `mb-${props.lineHeight}` : `mt-1 mb-3`
      }
    >
      <div>
        <Pashto opts={props.opts} ps={text} />
      </div>
      <div>
        <Phonetics opts={props.opts} ps={text} />
      </div>
      {text.e && <EnglishContent>{text.e}</EnglishContent>}
      {text.sub && <div className="small text-muted">{text.sub}</div>}
    </div>
  );
  return Array.isArray(examples) ? (
    <div>
      {examples.map((example, i) => (
        <Example key={i}>{example as PsStringWSub}</Example>
      ))}
    </div>
  ) : (
    <Example>{examples as PsStringWSub}</Example>
  );
}

export default Examples;
