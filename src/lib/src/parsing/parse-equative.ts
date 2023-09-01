import * as T from "../../../types";

export function parseEquative(
  tokens: Readonly<T.Token[]>
): T.ParseResult<T.ParsedVBE>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [{ s }, ...rest] = tokens;
  const match = table.find((x) => x.ps.includes(s));
  if (!match) {
    return [];
  }
  return match.people.flatMap((person) =>
    match.tenses.map((tense) => ({
      tokens: rest,
      body: {
        type: "VB",
        info: {
          type: "equative",
          tense,
        },
        person,
      },
      errors: [],
    }))
  );
}

// TODO: NOT COMPLETE / CORRECT
const table: {
  ps: string[];
  tenses: T.EquativeTenseWithoutBa[];
  people: T.Person[];
}[] = [
  {
    ps: ["یم"],
    tenses: ["present", "habitual"],
    people: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
  },
  {
    ps: ["یې"],
    tenses: ["present", "habitual"],
    people: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
  },
  {
    ps: ["یو"],
    tenses: ["present", "habitual"],
    people: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
  },
  {
    ps: ["یئ"],
    tenses: ["present", "habitual"],
    people: [T.Person.SecondPlurMale, T.Person.SecondPlurFemale],
  },
  {
    ps: ["وم"],
    tenses: ["subjunctive", "past"],
    people: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
  },
  {
    ps: ["وې"],
    tenses: ["subjunctive", "past"],
    people: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
  },
  {
    ps: ["وو"],
    tenses: ["subjunctive", "past"],
    people: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
  },
  {
    ps: ["وئ"],
    tenses: ["subjunctive", "past"],
    people: [T.Person.SecondPlurMale, T.Person.SecondPlurFemale],
  },
  {
    ps: ["دی"],
    tenses: ["present"],
    people: [T.Person.ThirdSingMale],
  },
  {
    ps: ["ده"],
    tenses: ["present"],
    people: [T.Person.ThirdSingFemale],
  },
  {
    ps: ["دي"],
    tenses: ["present"],
    people: [T.Person.ThirdPlurMale, T.Person.ThirdPlurFemale],
  },
  {
    ps: ["وي"],
    tenses: ["habitual"],
    people: [
      T.Person.ThirdSingMale,
      T.Person.ThirdSingFemale,
      T.Person.ThirdPlurMale,
      T.Person.ThirdPlurFemale,
    ],
  },
  {
    ps: ["وای", "وی"],
    tenses: ["pastSubjunctive"],
    people: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
];
