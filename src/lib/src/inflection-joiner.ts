import { semigroupInflectionSet } from "./fp-ps";
import {
  concatAll as concatAllSemigroup,
  Semigroup,
} from "fp-ts/lib/Semigroup";
import * as T from "../../types";

export function joinInflectorOutputs(
  outs: { inflected: T.InflectorOutput; orig: T.DictionaryEntryNoFVars }[]
): T.InflectorOutput {
  const [a, b] = outs;
  if (a === undefined || b === undefined) {
    throw new Error("bad input for joining inflector outputs");
  }
  if (a.inflected && b.inflected) {
    const inflections = joinInflections(
      a.inflected.inflections,
      b.inflected.inflections
    );
    // NOT GOING TO TRY TO JOIN ALL THE PLURALS AND VOCATIVE CAUSE IT GETS
    // TOO COMPLICATED - STARTS TO BECOME ALMOST LIKE A PHRASE BUILDER
    // const plural = joinPlural(
    //   "plural" in a.inflected ? a.inflected.plural : undefined,
    //   "plural" in b.inflected ? b.inflected.plural : undefined,
    //   false
    // );
    // const arabicPlural = joinPlural(
    //   "arabicPlural" in a.inflected ? a.inflected.arabicPlural : undefined,
    //   "arabicPlural" in b.inflected ? b.inflected.arabicPlural : undefined,
    //   false
    // );
    // const bundledPlural = joinPlural(
    //   "bundledPlural" in a.inflected ? a.inflected.bundledPlural : undefined,
    //   "bundledPlural" in b.inflected ? b.inflected.bundledPlural : undefined,
    //   true
    // );
    // const vocative = joinPlural(
    //   "vocative" in a.inflected ? a.inflected.vocative : undefined,
    //   "vocative" in b.inflected ? b.inflected.vocative : undefined,
    //   true
    // );
    // if (a.orig.p === "وچ") {
    //   console.log(JSON.stringify(a.inflected.vocative), null, "  ");
    // }
    return {
      inflections,
      plural: undefined,
      arabicPlural: undefined,
      bundledPlural: undefined,
      vocative: undefined,
    };
  }
  // TODO!!
  return a.inflected;
}

function joinInflections(
  a: T.Inflections | undefined,
  b: T.Inflections | undefined
): T.Inflections | undefined {
  if (!a && !b) {
    return undefined;
  }
  if (a && b) {
    return concatGenderSet(joinFromSemigroup(semigroupInflectionSet))(a, b);
  }
  return undefined;
}

// function joinPlural(
//   a: T.PluralInflections | undefined,
//   b: T.PluralInflections | undefined,
//   canJoin: boolean
// ): T.PluralInflections | undefined {
//   if (!a && !b) {
//     return undefined;
//   }
//   if (a && b && canJoin) {
//     return concatGenderSet(joinFromSemigroup(semigroupPluralInflectionSet))(
//       a,
//       b
//     );
//   }
//   return undefined;
// }

function concatGenderSet<J>(cf: (a: J, b: J) => J) {
  return function (a: T.GenderedSet<J>, b: T.GenderedSet<J>): T.GenderedSet<J> {
    if ("masc" in a && "masc" in b && "fem" in a && "fem" in b) {
      return {
        masc: cf(a.masc, b.masc),
        fem: cf(a.fem, b.fem),
      };
    }
    if ("masc" in a && "masc" in b) {
      return {
        masc: cf(a.masc, b.masc),
      };
    }
    if ("fem" in a && "fem" in b) {
      return {
        fem: cf(a.fem, b.fem),
      };
    }
    // TODO !!
    return a;
  };
}

function joinFromSemigroup<J>(semi: Semigroup<J>) {
  return function (a: J, b: J): J {
    return concatAllSemigroup(semi)(a)([b]);
  };
}
