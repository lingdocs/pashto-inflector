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

const InlinePs = ({
  ps,
  opts,
}: {
  ps: T.PsString | (T.PsJSX & { e?: string });
  opts: T.TextOptions;
}) => {
  return (
    <span>
      <Pashto opts={opts} ps={ps} />
      {opts.phonetics !== "none" && " - "}
      <Phonetics opts={opts} ps={ps} />
      {ps.e && <span className="text-muted"> ({ps.e})</span>}
    </span>
  );
};

export default InlinePs;
