import { AdjectiveEntry, InflectionCategory, NounEntry } from "../types";
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

export function getInflectionCategory(e: NounEntry | AdjectiveEntry): InflectionCategory {
    return isPattern1Entry(e)
        ? InflectionCategory.Basic
        : isPattern2Entry(e)
        ? InflectionCategory.UnstressedEy
        : isPattern3Entry(e)
        ? InflectionCategory.StressedEy
        : isPattern4Entry(e)
        ? InflectionCategory.Pashtun
        : isPattern5Entry(e)
        ? InflectionCategory.Squish
        : isNounEntry(e) && isFemNounEntry(e) && isPattern6FemEntry(e)
        ? InflectionCategory.FemInanEe
        : InflectionCategory.None;
}