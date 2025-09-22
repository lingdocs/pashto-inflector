import * as T from "../../../types";
import type { JSX } from "react";
import InlinePs from "./../text-display/InlinePs";

export default function HumanReadableInflectionPattern(
  p: T.InflectionPattern,
  textOptions: T.TextOptions
): JSX.Element | null {
  return p === T.InflectionPattern.Basic ? (
    <span>#1 Basic</span>
  ) : p === T.InflectionPattern.UnstressedAy ? (
    <span>
      #2 Unstressed{" "}
      <InlinePs opts={textOptions} ps={{ p: "ی", f: "ay", e: "" }} />
    </span>
  ) : p === T.InflectionPattern.StressedAy ? (
    <span>
      #3 Stressed{" "}
      <InlinePs opts={textOptions} ps={{ p: "ی", f: "áy", e: "" }} />
    </span>
  ) : p === T.InflectionPattern.Pashtun ? (
    <span>#4 "Pashtoon"</span>
  ) : p === T.InflectionPattern.Squish ? (
    <span>#5 Short Squish</span>
  ) : p === T.InflectionPattern.FemInanEe ? (
    <span>
      #6 Fem. inan.{" "}
      <InlinePs opts={textOptions} ps={{ p: "ي", f: "ee", e: "" }} />
    </span>
  ) : null;
}
