import * as T from "../../../types";

export function parseVerb(
  tokens: Readonly<T.Token[]>,
  verbLookup: (s: (e: T.VerbDictionaryEntry) => boolean) => T.VerbEntry[]
): T.ParseResult<Omit<T.VBE, "ps">>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const people = getVerbEnding(first.s);
  if (people.length === 0) {
    return [];
  }
  const verbs = findByStem(first.s.slice(0, -1), verbLookup);

  return people.flatMap((person) =>
    verbs.map((verb) => ({
      tokens: rest,
      body: {
        type: "VB",
        person,
        info: {
          type: "verb",
          aspect: "imperfective",
          base: "stem",
          verb,
        },
      },
      errors: [],
    }))
  );
}

function getVerbEnding(p: string): T.Person[] {
  if (p.endsWith("م")) {
    return [T.Person.FirstSingMale, T.Person.FirstSingFemale];
  } else if (p.endsWith("ې")) {
    return [T.Person.SecondSingMale, T.Person.SecondSingFemale];
  } else if (p.endsWith("ي")) {
    return [
      T.Person.ThirdSingMale,
      T.Person.ThirdSingFemale,
      T.Person.ThirdPlurMale,
      T.Person.ThirdPlurFemale,
    ];
  } else if (p.endsWith("و")) {
    return [T.Person.FirstPlurMale, T.Person.FirstPlurFemale];
  } else if (p.endsWith("ئ")) {
    return [T.Person.SecondPlurMale, T.Person.SecondPlurFemale];
  }
  return [];
}

function findByStem(
  stem: string,
  verbLookup: (s: (e: T.VerbDictionaryEntry) => boolean) => T.VerbEntry[]
): T.VerbEntry[] {
  return verbLookup(
    (e) =>
      e.psp === stem ||
      (!e.psp && !e.c.includes("comp") && e.p.slice(0, -1) === stem)
  );
}
