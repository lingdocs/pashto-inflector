/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import classNames from "classnames";

type PickerProps<T extends string> = {
    options: { label: any, value: T, color?: string }[],
    value: T,
    handleChange: (payload: T) => void,
    small?: boolean,
    xSmall?: boolean,
}

function ButtonSelect<L extends string>(props: PickerProps<L>) {
    return (
        <div className="d-inline-flex flex-row justify-content-center">
            <div className="btn-group">
                {props.options.map((option) => (
                    <button
                        key={option.value}
                        type="button"
                        className={classNames(
                            "btn",
                            "btn-outline-secondary",
                            { active: props.value === option.value },
                            { "btn-sm": props.small || props.xSmall }
                        )}
                        onClick={() => props.handleChange(option.value)}
                        style={{
                            ...props.xSmall ?
                                { fontSize: "small" }: {},
                            ...option.color ? 
                                { background: option.color } : {},
                        }}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default ButtonSelect;
