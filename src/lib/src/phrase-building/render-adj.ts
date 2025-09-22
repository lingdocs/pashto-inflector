import * as T from "../../../types";
import { inflectWord } from "../pashto-inflector";
import { psStringFromEntry, isUnisexSet } from "../p-text-helpers";
import { getEnglishWord } from "../get-english-word";
import { personGender, personIsPlural } from "../misc-helpers";
import { renderSandwich } from "./render-sandwich";
import { isPattern1Entry } from "../type-predicates";
import { addMayo, mayoOnWord } from "./mayo-utils";

function chooseInflection(
  inflections: T.UnisexSet<T.InflectionSet>,
  pers: T.Person,
  inflected?: boolean,
): T.ArrayOneOrMore<T.PsString> {
  const gender = personGender(pers);
  const plural = personIsPlural(pers);
  const infNumber = (plural ? 1 : 0) + (inflected === true ? 1 : 0);
  return inflections[gender][infNumber];
}

export function inflectAdvAdj(
  a: T.AdjectiveSelection | T.AdverbSelection,
  person: T.Person,
  inflected: boolean,
  mayo: "req" | "opt" | "no",
): T.ArrayOneOrMore<T.PsString> {
  if (mayo !== "no") {
    return addMayo(a.entry, mayo === "req") as T.ArrayOneOrMore<T.PsString>;
  }
  const infs = inflectWord(a.entry);
  if (infs === false) {
    return [psStringFromEntry(a.entry)];
  }
  if (!infs.inflections || !isUnisexSet(infs.inflections)) {
    throw new Error(
      "error getting inflections for adjective, looks like a noun's inflections",
    );
  }
  return chooseInflection(infs.inflections, person, inflected);
}

export function inflectAdjective(
  a: T.AdjectiveSelection,
  person: T.Person,
  inflected: boolean,
  mayo: "req" | "opt" | "no",
): T.ArrayOneOrMore<T.PsString> {
  return inflectAdvAdj(a, person, inflected, mayo);
}

export function renderAdjectiveSelection(
  a: T.AdjectiveSelection,
  person: T.Person,
  inflected: boolean,
  isLocationSingSandwich: boolean,
  mayo: "req" | "opt" | "no",
): T.Rendered<T.AdjectiveSelection> {
  const eWord = getEnglishWord(a.entry);
  const e =
    eWord === undefined
      ? undefined
      : typeof eWord === "string"
        ? eWord
        : (eWord.singular ?? undefined);
  const toAddMayo = mayoOnWord(
    mayo,
    a.entry,
    personGender(person),
    personIsPlural(person) ? "plural" : "singular",
  );
  const ps = inflectAdjective(
    a,
    person,
    isLocationSingSandwich && isPattern1Entry(a.entry) ? false : inflected,
    toAddMayo,
  );
  return {
    type: "adjective",
    entry: a.entry,
    ps,
    e,
    inflected,
    person,
    sandwich: a.sandwich ? renderSandwich(a.sandwich) : undefined,
  };
}
