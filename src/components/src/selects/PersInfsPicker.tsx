/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as T from "../../../types";

const persInfs: {
  label: string;
  value: T.PersonInflectionsField;
}[] = [
  {
    label: "masc. sing.",
    value: "mascSing",
  },
  {
    label: "fem. sing.",
    value: "femSing",
  },
  {
    label: "masc. plur.",
    value: "mascPlur",
  },
  {
    label: "fem. plur",
    value: "femPlur",
  },
];

function PersInfsPicker(props: {
  subjOrObj: "subject" | "object";
  persInf: T.PersonInflectionsField;
  handleChange: (persInf: T.PersonInflectionsField) => void;
}) {
  function hChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = e.target.value as T.PersonInflectionsField;
    props.handleChange(newValue);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="mr-2">
        When the <strong>{props.subjOrObj}</strong> is
      </div>
      <div>
        <select
          className="form-control form-control-sm d-inline-block"
          value={props.persInf}
          id="verb_info_pers_select"
          onChange={hChange}
        >
          {persInfs.map((pers) => (
            <option key={pers.value} value={pers.value}>
              {pers.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PersInfsPicker;
