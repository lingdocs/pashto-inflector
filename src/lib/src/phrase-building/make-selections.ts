import {
  isPluralNounEntry,
  isMascNounEntry,
  isUnisexNounEntry,
} from "../type-predicates";
import * as T from "../../../types";

export function makeAdverbSelection(entry: T.AdverbEntry): T.AdverbSelection {
  return {
    type: "adverb",
    entry: entry,
  };
}

export function makeLocativeAdverbSelection(
  entry: T.LocativeAdverbEntry
): T.LocativeAdverbSelection {
  return {
    type: "loc. adv.",
    entry: entry,
  };
}

export function makeAdjectiveSelection(
  entry: T.AdjectiveEntry
): T.AdjectiveSelection {
  return {
    type: "adjective",
    entry: entry,
    sandwich: undefined,
  };
}

export function makeParticipleSelection(
  verb: T.VerbEntry
): T.ParticipleSelection {
  return {
    type: "participle",
    verb,
    possesor: undefined,
  };
}

export function makeNounSelection(
  entry: T.NounEntry,
  old: T.NounSelection | undefined,
  complementType?: "dynamic" | "generative stative"
): T.NounSelection {
  const number = isPluralNounEntry(entry) ? "plural" : "singular";
  return {
    type: "noun",
    entry,
    gender: isMascNounEntry(entry) ? "masc" : "fem",
    genderCanChange: isUnisexNounEntry(entry),
    number,
    numberCanChange: number === "singular",
    adjectives: !complementType && old ? old.adjectives : [],
    possesor: !complementType ? old?.possesor : undefined,
    dynamicComplement: complementType === "dynamic",
    genStativeComplement: complementType === "generative stative",
    demonstrative: undefined,
  };
}
