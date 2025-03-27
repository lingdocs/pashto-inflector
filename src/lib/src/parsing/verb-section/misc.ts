import * as T from "../../../../types";

/**
 * These are the consonants that a short verb root can end with
 * to make it possible to have 3rd person masc sing past
 * congugations without an ending, (ie. ولید) or participles without the
 * ل (ie. اخیستو, لیدو)
 */
export const shortVerbEndConsonant = ["د", "ت", "ړ"];

export function getImperativeVerbEnding(e: string): T.Person[] {
  if (e === "ه") {
    return [T.Person.SecondSingMale, T.Person.SecondSingFemale];
  }
  if (e === "ئ") {
    return [T.Person.SecondPlurMale, T.Person.SecondPlurFemale];
  }
  return [];
}
