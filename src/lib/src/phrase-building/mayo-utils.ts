import * as T from "../../../types";
import { endsWith, psStringFromEntry } from "../p-text-helpers";
import { isPattern1Entry } from "../type-predicates";
import { accentOnNFromEnd, countSyllables } from "../accent-helpers";
import { monoidPsString } from "../fp-ps";
import { concatAll } from "fp-ts/lib/Monoid";

export function mayoOnWord(
  isMayoSandwich: "req" | "opt" | "no" | undefined,
  entry: T.InflectableEntry,
  gender: T.Gender,
  number: T.NounNumber
): "req" | "opt" | "no" {
  return isMayoSandwich &&
    isMayoSandwich !== "no" &&
    isPattern1Entry(entry) &&
    number === "singular" &&
    gender === "masc" &&
    !endsWith(entry, { p: "ه", f: "u" })
    ? isMayoSandwich
    : "no";
}

export function addMayo(entry: T.InflectableEntry, req: boolean): T.PsString[] {
  const base = psStringFromEntry(entry);
  const ps1 = concatAll(monoidPsString)([base, { p: "ه", f: "a" }]);
  const ps = countSyllables(base) === 1 ? accentOnNFromEnd(ps1, 1) : ps1;
  return [ps, ...(!req ? [base] : [])];
}
