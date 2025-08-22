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
import type { JSX } from "react";
import { ReactNode } from "react";
import { addErrorToPs } from "./utils";
import psmd from "./psmd";
import { PsJSX } from "./jsx-map";

type PsStringWSub = T.PsString & { sub?: ReactNode; error?: boolean };

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

type ExampleContent = PsJSX | PsStringWSub;
type SingleOrArray<T> = T | T[];

function Examples(
  props: (
    | {
      ex: SingleOrArray<ExampleContent>;
    }
    | {
      children: SingleOrArray<ExampleContent>;
    }
  ) & {
    opts: T.TextOptions;
    lineHeight?: 0 | 1 | 2 | 3 | 4;
    md?: boolean;
  }
) {
  const examples = "children" in props ? props.children : props.ex;
  const Example = ({ children: text }: { children: ExampleContent }) => {
    const psA = "error" in text && text.error ? addErrorToPs(text) : text;
    // @ts-ignore
    const psB = props.md ? psmd(psA) : psA;
    return (
      <div
        className={
          props.lineHeight !== undefined
            ? `mb-${props.lineHeight}`
            : `mt-1 mb-3`
        }
      >
        <div>
          <Pashto opts={props.opts} ps={psB} />
        </div>
        <div>
          <Phonetics opts={props.opts} ps={psB} />
        </div>
        {psB.e && <EnglishContent>{psB.e}</EnglishContent>}
        {"sub" in psB && psB.sub && (
          <div className="small text-muted">{psB.sub}</div>
        )}
      </div>
    );
  };
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
