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

export function wrapInActiveV<X extends T.VerbX>(x: X): T.ActiveVBasic<X> {
  return {
    type: "active basic",
    content: x,
  };
}

export function getPPartGenNums(s: string): T.GenderNumber[] {
  const ending: "ی" | "ي" | "ې" = s.at(-1) as "ی" | "ي" | "ې";
  if (!ending || !["ی", "ي", "ې"].includes(ending)) {
    return [];
  }
  return endingGenNum(ending);
}

function endingGenNum(s: "ی" | "ې" | "ي"): T.GenderNumber[] {
  if (s === "ی") {
    return [
      {
        gender: "masc",
        number: "singular",
      },
    ];
  }
  if (s === "ې") {
    return [
      { gender: "fem", number: "singular" },
      { gender: "fem", number: "plural" },
    ];
  }
  if (s === "ي") {
    return [{ gender: "masc", number: "plural" }];
  }
  throw new Error("invalid participle tail input");
}

export function getLFromComplement(
  comp: T.ParsedComplementSelection,
): number | undefined {
  if ("inflection" in comp.selection) {
    return comp.selection.selection.entry.ts;
  }
  if (comp.selection.type === "loc. adv.") {
    return comp.selection.entry.ts;
  }
  // TODO: will have to get comp noun ts
  return undefined;
}
