/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { translatePhonetics } from "../../../lib/src/translate-phonetics";
import { psJSXMap } from "./jsx-map";
import * as T from "../../../types";

const Phonetics = ({
  opts,
  ps,
}: {
  opts: T.TextOptions;
  ps: T.PsJSX | T.PsString | string;
}) => {
  if (opts.phonetics === "none") {
    return null;
  }
  const handleText = (f: string) =>
    opts.phonetics === "lingdocs"
      ? f
      : translatePhonetics(f, {
          dialect: opts.dialect,
          // @ts-expect-error - weird TS not picking up the elimination of "none herre"
          system: opts.phonetics,
        });
  return (
    <span className="f-text">
      {typeof ps !== "string" && typeof ps.f !== "string"
        ? psJSXMap(ps as T.PsJSX, "f", ({ f }) => handleText(f))
        : handleText(typeof ps === "string" ? ps : (ps.f as string))}
    </span>
  );
};

export default Phonetics;
