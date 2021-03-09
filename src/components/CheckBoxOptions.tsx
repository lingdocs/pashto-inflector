/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

type Props = {
    label: string,
    options: { label: any, name: string, disabled?: boolean }[],
    checked: string[],
    handleChange: (p: { name: string, checked: boolean }) => void;
}

export default function (props: Props) {
    function handleCheck(e: any) {
        props.handleChange({
            name: e.target.name as string,
            checked: e.target.checked as boolean,
        });
    }
    return (
        <div className="text-center">
            <span className="mr-2">{props.label}</span>
            {props.options.map((option) => (
                <div className="form-check form-check-inline">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        name={option.name}
                        onChange={handleCheck}
                        checked={props.checked.includes(option.name)}
                        disabled={option.disabled}   
                    />
                    <label className="form-check-label">{option.label}</label>
                </div>
            ))}
        </div>
    );
}
