import * as T from "../../../types";
import InlinePs from "./../text-display/InlinePs";

export default function HumanReadableInflectionPattern(
  p: T.InflectionPattern,
  textOptions: T.TextOptions
): JSX.Element | null {
  return p === 1 ? (
    <span>#1 Basic</span>
  ) : p === 2 ? (
    <span>
      #2 Unstressed{" "}
      <InlinePs opts={textOptions} ps={{ p: "ی", f: "ay", e: "" }} />
    </span>
  ) : p === 3 ? (
    <span>
      #3 Stressed{" "}
      <InlinePs opts={textOptions} ps={{ p: "ی", f: "áy", e: "" }} />
    </span>
  ) : p === 4 ? (
    <span>#4 "Pashtoon"</span>
  ) : p === 5 ? (
    <span>#5 Short Squish</span>
  ) : p === 6 ? (
    <span>
      #6 Fem. inan.{" "}
      <InlinePs opts={textOptions} ps={{ p: "ي", f: "ee", e: "" }} />
    </span>
  ) : null;
}
