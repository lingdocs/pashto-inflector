import * as T from "../../../types";
import {
  imperativeTenseOptions,
  perfectTenseOptions,
  verbTenseOptions,
} from "./verbTenseOptions";
import {
  isImperativeTense,
  isAbilityTense,
  isPerfectTense,
  isVerbTense,
} from "../../../lib/src/type-predicates";

export function getRandomTense(
  o?: T.PerfectTense | T.VerbTense | T.AbilityTense | T.ImperativeTense,
): T.PerfectTense | T.VerbTense | T.AbilityTense | T.ImperativeTense {
  let tns: T.PerfectTense | T.VerbTense | T.AbilityTense | T.ImperativeTense;
  const oldTenseCategory = !o ? undefined : getTenseCategory(o);
  const tenseOptions =
    oldTenseCategory === "perfect"
      ? perfectTenseOptions
      : oldTenseCategory === "modal"
        ? verbTenseOptions.map((x) => ({
            ...x,
            value: `${x.value}Modal`,
          }))
        : oldTenseCategory === "imperative"
          ? imperativeTenseOptions
          : verbTenseOptions;
  do {
    tns = tenseOptions[Math.floor(Math.random() * tenseOptions.length)]
      .value as T.VerbTense;
  } while (o === tns);
  return tns;
}

export function getTenseCategory(
  tense: T.VerbTense | T.PerfectTense | T.AbilityTense | T.ImperativeTense,
): "basic" | "perfect" | "modal" | "imperative" {
  if (isPerfectTense(tense)) {
    return "perfect";
  }
  if (isVerbTense(tense)) {
    return "basic";
  }
  if (isAbilityTense(tense)) {
    return "modal";
  }
  if (isImperativeTense(tense)) {
    return "imperative";
  }
  throw new Error("can't catagorize tense");
}
