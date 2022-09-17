import * as T from "../types";
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
import InlinePs from "../components/InlinePs";

export function getInflectionPattern(e: T.NounEntry | T.AdjectiveEntry): T.InflectionPattern {
    return isPattern1Entry(e)
        ? T.InflectionPattern.Basic
        : isPattern2Entry(e)
        ? T.InflectionPattern.UnstressedEy
        : isPattern3Entry(e)
        ? T.InflectionPattern.StressedEy
        : isPattern4Entry(e)
        ? T.InflectionPattern.Pashtun
        : isPattern5Entry(e)
        ? T.InflectionPattern.Squish
        : isNounEntry(e) && isFemNounEntry(e) && isPattern6FemEntry(e)
        ? T.InflectionPattern.FemInanEe
        : T.InflectionPattern.None;
}

export function humanReadableInflectionPattern(p: T.InflectionPattern, textOptions: T.TextOptions): JSX.Element | null {
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