import * as T from "../../../../types";
import { getPeople, returnParseResultSingle } from "./../utils";

export type EqInfo = {
  persons: T.Person[];
  tenses: T.EquativeTenseWithoutBa[];
};

const allPersons: T.Person[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export function parseEquative(
  tokens: Readonly<T.Token[]>
): T.ParseResult<T.ParsedVBE>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [{ s }, ...rest] = tokens;
  function eqMaker({ tenses, persons }: EqInfo): T.ParseResult<T.ParsedVBE>[] {
    return tenses.flatMap((tense) =>
      persons.map((person) =>
        returnParseResultSingle(rest, makeEqVBE(tense, person))
      )
    );
  }
  if (s === "وای" || s === "وی") {
    return eqMaker({ tenses: ["pastSubjunctive"], persons: allPersons });
  }
  return [...getThirdPersEqs(s), ...getFstSndPersEqs(s)].flatMap(eqMaker);
}

function getFstSndPersEqs(s: string): EqInfo[] {
  const tenses: T.EquativeTenseWithoutBa[] =
    s.length === 3 && s.startsWith("ول")
      ? ["past"]
      : s.length === 2
        ? s.startsWith("و")
          ? ["subjunctive", "past"]
          : s.startsWith("ی")
            ? ["present", "habitual"]
            : []
        : [];
  if (!tenses.length) {
    return [];
  }
  const persons = getFirstSecPersonsEndings(s.at(-1) || "");
  if (!persons.length) {
    return [];
  }
  return [
    {
      tenses,
      persons,
    },
  ];
}

function getThirdPersEqs(s: string): EqInfo[] {
  if (s === "دي") {
    return [
      {
        persons: [T.Person.ThirdPlurMale, T.Person.ThirdPlurFemale],
        tenses: ["present"],
      },
    ];
  }
  if (s === "وي") {
    return [
      {
        persons: getPeople(3, "both"),
        tenses: ["habitual", "subjunctive"],
      },
    ];
  }
  if (s === "دی") {
    return [
      {
        persons: [T.Person.ThirdSingMale],
        tenses: ["present"],
      },
    ];
  }
  if (s === "ده") {
    return [
      {
        persons: [T.Person.ThirdSingFemale],
        tenses: ["present"],
      },
    ];
  }
  if (s === "ول") {
    return [
      {
        persons: [T.Person.ThirdPlurMale],
        tenses: ["past"],
      },
    ];
  }
  if (s === "و") {
    return [
      {
        persons: [T.Person.ThirdSingMale],
        tenses: ["past"],
      },
    ];
  }
  if (s === "وو") {
    return [{ persons: [T.Person.ThirdPlurMale], tenses: ["past"] }];
  }
  if (s === "ولو") {
    return [
      {
        persons: [T.Person.ThirdSingMale],
        tenses: ["past"],
      },
    ];
  }
  if (
    (s.length === 3 && s.startsWith("ول")) ||
    (s.length === 2 && s.startsWith("و"))
  ) {
    const persons = getThirdPastEndings(s.at(-1) || "");
    return persons.length
      ? [
        {
          persons,
          tenses: ["past"],
        },
      ]
      : [];
  }
  return [];
}

function getThirdPastEndings(s: string): T.Person[] {
  if (s === "ه") {
    return [T.Person.ThirdSingFemale];
  }
  if (s === "ې") {
    return [T.Person.ThirdPlurFemale];
  }
  return [];
}

function getFirstSecPersonsEndings(s: string): T.Person[] {
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
