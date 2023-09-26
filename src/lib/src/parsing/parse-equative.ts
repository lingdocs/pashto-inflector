import * as T from "../../../types";
import { getPeople, returnParseResultS } from "./utils";

const allThird = getPeople(3, "both");
const allPeople: T.Person[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export function parseEquative(
  tokens: Readonly<T.Token[]>
): T.ParseResult<T.ParsedVBE>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [{ s }, ...rest] = tokens;
  function eqMaker(
    people: T.Person[],
    tenses: T.EquativeTenseWithoutBa[]
  ): T.ParseResult<T.ParsedVBE>[] {
    return tenses.flatMap((tense) =>
      people.map((person) => returnParseResultS(rest, makeEqVBE(tense, person)))
    );
  }
  if (s === "دي") {
    return eqMaker(
      [T.Person.ThirdPlurMale, T.Person.ThirdPlurFemale],
      ["present"]
    );
  }
  if (s === "وي") {
    return eqMaker(allThird, ["habitual", "subjunctive"]);
  }
  if (s === "دی") {
    return eqMaker([T.Person.ThirdSingMale], ["present"]);
  }
  if (s === "ده") {
    return eqMaker([T.Person.ThirdSingFemale], ["present"]);
  }
  if (["وای", "وی"].includes(s)) {
    return eqMaker(allPeople, ["pastSubjunctive"]);
  }
  if (s === "ول") {
    return eqMaker([T.Person.ThirdPlurMale], ["past"]);
  }
  const persons = getEqEndingPersons(s[s.length - 1]);
  if (!persons.length) {
    return [];
  }
  if (s.length === 2 && s.startsWith("ی")) {
    return eqMaker(persons, ["present", "habitual"]);
  }
  if (s.length === 3 && s.startsWith("ول")) {
    return eqMaker(persons, ["past"]);
  }
  if (s.length === 2 && s.startsWith("و")) {
    return eqMaker(persons, ["past", "subjunctive"]);
  }
  return [];
}

function getEqEndingPersons(s: string): T.Person[] {
  if (s === "م") {
    return getPeople(1, "sing");
  }
  if (s === "ې") {
    return getPeople(2, "sing");
  }
  if (s === "و") {
    return getPeople(1, "pl");
  }
  if (s === "ئ") {
    return getPeople(2, "pl");
  }
  return [];
}

function makeEqVBE(
  tense: T.EquativeTenseWithoutBa,
  person: T.Person
): T.ParsedVBE {
  return {
    type: "VB",
    info: {
      type: "equative",
      tense,
    },
    person,
  };
}
