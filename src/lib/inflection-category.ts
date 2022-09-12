import { AdjectiveEntry, InflectionPattern, NounEntry } from "../types";
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

export function getInflectionPattern(e: NounEntry | AdjectiveEntry): InflectionPattern {
    return isPattern1Entry(e)
        ? InflectionPattern.Basic
        : isPattern2Entry(e)
        ? InflectionPattern.UnstressedEy
        : isPattern3Entry(e)
        ? InflectionPattern.StressedEy
        : isPattern4Entry(e)
        ? InflectionPattern.Pashtun
        : isPattern5Entry(e)
        ? InflectionPattern.Squish
        : isNounEntry(e) && isFemNounEntry(e) && isPattern6FemEntry(e)
        ? InflectionPattern.FemInanEe
        : InflectionPattern.None;
}