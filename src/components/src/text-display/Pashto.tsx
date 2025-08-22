/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { convertSpelling } from "../../../lib/src/convert-spelling";
import { phoneticsToDiacritics } from "../../../lib/src/phonetics-to-diacritics";
import { PsJSX, psJSXMap } from "./jsx-map";
import * as T from "../../../types";

const Pashto = ({
  opts,
  ps,
}: {
  opts: T.TextOptions;
  ps: T.PsString | PsJSX;
}) => {
  function convertText(ps: T.PsString, opts: T.TextOptions): string {
    const p = opts.diacritics
      ? phoneticsToDiacritics(ps.p, ps.f) || ps.p
      : ps.p;
    return convertSpelling(p, opts.spelling);
  }
  const style =
    opts.pTextSize === "normal"
      ? undefined
      : { fontSize: opts.pTextSize === "larger" ? "large" : "larger" };
  return (
    <span className="p-text" dir="rtl" style={style} lang="ps">
      {typeof ps.p !== "string" && typeof ps.f !== "string"
        ? psJSXMap(ps as PsJSX, "p", (ps: T.PsString) =>
          convertText(ps, opts)
        )
        : convertText(ps as T.PsString, opts)}
    </span>
  );
};

export default Pashto;
