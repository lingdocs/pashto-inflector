/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createElement } from "react";
import classNames from "classnames";
import * as T from "../types";

const caretRight = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
<path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
</svg>
const caretDown = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-down-fill" viewBox="0 0 16 16">
<path d="M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
</svg>

const defaultLevel = 4;
const indentAfterLevel = 5;

function Hider(props: {
    label: string,
    showing: boolean,
    aspect?: T.Aspect,
    handleChange: () => void,
    children: React.ReactNode,
    hLevel?: number,
    ignore?: boolean,
}) {
    const hLev = Math.min((props.hLevel ? props.hLevel : defaultLevel), 6);
    const extraMargin = (props.hLevel && (props.hLevel > indentAfterLevel))
        ? `ml-${(props.hLevel - indentAfterLevel) + 1}`
        : "";
    if (props.ignore) {
        return <>
            {props.children}
        </>;
    }
    return <div className="mb-3">
        {createElement(
            `h${hLev}`,
            {
                onClick: props.handleChange,
                className: classNames(
                    "clickable",
                    extraMargin,
                ),
            },
            <>
                {props.showing ? caretDown : caretRight}
                {` `}
                {props.aspect
                    ? <i className={`fas fa-${props.aspect === "imperfective" ? "video" : "camera"} mr-2`} />
                    : ""}
                {props.label}
            </>,
        )}
        {props.showing && props.children}
    </div>
}

export default Hider;