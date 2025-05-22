import * as T from "../../types";
import {
  isFemNounEntry,
  isNounEntry,
  isPattern1Entry,
  isPattern2Entry,
  isPattern3Entry,
  isPattern4Entry,
  isPattern5Entry,
  isPattern6FemEntry,
} from "./type-predicates";

export function getInflectionPattern(
  e: T.InflectableEntry
): T.InflectionPattern {
  if (e.noInf) return 0;
  return isPattern1Entry(e)
    ? T.InflectionPattern.Basic
    : isPattern2Entry(e)
      ? T.InflectionPattern.UnstressedAy
      : isPattern3Entry(e)
        ? T.InflectionPattern.StressedAy
        : isPattern4Entry(e)
          ? T.InflectionPattern.Pashtun
          : isPattern5Entry(e)
            ? T.InflectionPattern.Squish
            : isNounEntry(e) && isFemNounEntry(e) && isPattern6FemEntry(e)
              ? T.InflectionPattern.FemInanEe
              : T.InflectionPattern.None;
}
