import * as T from "../../../types";

export function isKedulStatEntry(v: T.VerbDictionaryEntry): boolean {
  return v.p === "کېدل" && v.e.startsWith("to bec");
}

export function isKedulDynEntry(v: T.VerbDictionaryEntry): boolean {
  return v.p === "کېدل" && v.e.startsWith("to hap");
}

/**
 * gets the possible people for stem and root endings
 * but DOES NOT INCLUDE short third pers masc sing
 */
export function getVerbEnding(e: string): {
  stem: T.Person[];
  root: T.Person[];
} {
  if (e === "م") {
    return {
      root: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
      stem: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
    };
  } else if (e === "ې") {
    return {
      root: [
        T.Person.SecondSingMale,
        T.Person.SecondSingFemale,
        T.Person.ThirdPlurFemale,
      ],
      stem: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
    };
  } else if (e === "ي") {
    return {
      stem: [
        T.Person.ThirdSingMale,
        T.Person.ThirdSingFemale,
        T.Person.ThirdPlurMale,
        T.Person.ThirdPlurFemale,
      ],
      root: [],
    };
  } else if (e === "و") {
    return {
      root: [
        T.Person.FirstPlurMale,
        T.Person.FirstPlurFemale,
        T.Person.ThirdSingMale,
      ],
      stem: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
    };
  } else if (e === "ئ") {
    return {
      root: [T.Person.SecondPlurMale, T.Person.SecondPlurFemale],
      stem: [T.Person.SecondPlurMale, T.Person.SecondPlurFemale],
    };
  } else if (e === "ه") {
    return {
      root: [T.Person.ThirdSingFemale],
      stem: [],
    };
  } else if (e === "ل") {
    return {
      root: [T.Person.ThirdPlurMale],
      stem: [],
    };
  }
  return {
    root: [],
    stem: [],
  };
}
