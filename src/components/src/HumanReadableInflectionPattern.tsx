import * as T from "../../types";
import InlinePs from "./InlinePs";

export default function HumanReadableInflectionPattern(p: T.InflectionPattern, textOptions: T.TextOptions): JSX.Element | null {
    return p === 1
        ? <span>#1 Basic</span>
        : p === 2
        ? <span>#2 Unstressed <InlinePs opts={textOptions}>{{ p: "ی", f: "ey", e: "" }}</InlinePs></span>
        : p === 3
        ? <span>#3 Stressed <InlinePs opts={textOptions}>{{ p: "ی", f: "éy", e: "" }}</InlinePs></span>
        : p === 4
        ? <span>#4 "Pashtoon"</span>
        : p === 5
        ? <span>#5 Short Squish</span>
        : p === 6
        ? <span>#6 Fem. inan. <InlinePs opts={textOptions}>{{ p: "ي", f: "ee", e: "" }}</InlinePs></span>
        : null;
}