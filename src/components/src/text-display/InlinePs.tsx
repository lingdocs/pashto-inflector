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
import { addErrorToPs } from "./utils";

const InlinePs = ({
  ps,
  opts,
  error,
}: {
  ps: T.PsString | (T.PsJSX & { e?: string });
  opts: T.TextOptions;
  error?: boolean;
}) => {
  const isError = error || ("error" in ps && ps.error);
  const psA = isError ? addErrorToPs(ps) : ps;
  return (
    <span>
      <Pashto opts={opts} ps={psA} />
      {opts.phonetics !== "none" && " - "}
      <Phonetics opts={opts} ps={psA} />
      {ps.e && <span className="text-muted"> ({ps.e})</span>}
    </span>
  );
};

export default InlinePs;
