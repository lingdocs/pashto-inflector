/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import classNames from "classnames";

type PickerProps<T extends string> = {
  options: { label: React.ReactNode; value: T; color?: string }[];
  value: T;
  handleChange: (payload: T) => void;
  small?: boolean;
  xSmall?: boolean;
  faded?: boolean;
};

function ButtonSelect<L extends string>(props: PickerProps<L>) {
  return (
    <div className="btn-group">
      {props.options.map((option) => (
        <button
          key={option.value}
          type="button"
          className={classNames(
            "btn",
            props.faded === true ? "btn-light" : "btn-outline-secondary",
            { active: props.value === option.value },
            { "btn-sm": props.small ?? props.xSmall }
          )}
          onClick={() => props.handleChange(option.value)}
          style={{
            ...(props.xSmall === true ? { fontSize: "small" } : {}),
            ...(option.color !== undefined && props.value === option.value
              ? { backgroundColor: option.color }
              : {}),
          }}
        >
          <span
            className={classNames([
              {
                "text-on-gender-color":
                  option.color !== undefined && props.value === option.value,
              },
            ])}
          >
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default ButtonSelect;
