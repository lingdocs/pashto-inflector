import {
  concatPsString,
  endsInConsonant,
  endsInAaOrOo,
  addOEnding,
  splitPsByVarients,
  removeEndTick,
  endsWith,
  hasShwaEnding,
} from "./p-text-helpers";
import { makePsString } from "./accent-and-ps-utils";
import {
  accentOnNFromEnd,
  countSyllables,
  removeAccents,
} from "./accent-helpers";
import * as T from "../../types";
import { isMascNounEntry, isPattern1Entry } from "./type-predicates";

function makePashtoPlural(
  word: T.DictionaryEntryNoFVars,
): T.PluralInflections | undefined {
  if (
    !(
      word.ppp !== undefined &&
      word.ppp !== "" &&
      word.ppf !== undefined &&
      word.ppf !== ""
    )
  )
    return undefined;
  const base = splitPsByVarients(makePsString(word.ppp, word.ppf));
  function getBaseAndO(): T.PluralInflectionSet {
    return [base, base.flatMap(addOEnding) as T.ArrayOneOrMore<T.PsString>];
  }
  if (word.c?.includes("n. m.") === true) {
    return { masc: getBaseAndO() };
  }
  if (word.c?.includes("n. f.") === true) {
    return { fem: getBaseAndO() };
  }
  // TODO: handle masculine and unisex
  return undefined;
}

function makeBundledPlural(
  word: T.DictionaryEntry,
): T.PluralInflections | undefined {
  if (isMascNounEntry(word) && isPattern1Entry(word) && endsInConsonant(word)) {
    const w = makePsString(word.p, word.f);
    const base = countSyllables(w) === 1 ? accentOnNFromEnd(w, 0) : w;
    return {
      masc: [
        [concatPsString(base, { p: "ه", f: "a" })],
        [concatPsString(base, { p: "و", f: "o" })],
      ],
    };
  } else {
    return undefined;
  }
}

function makeArabicPlural(
  word: T.DictionaryEntryNoFVars,
): T.PluralInflections | undefined {
  if (
    !(
      word.apf !== undefined &&
      word.apf !== "" &&
      word.app !== undefined &&
      word.app !== ""
    )
  )
    return undefined;
  const w = makePsString(word.app, word.apf);
  const plural = splitPsByVarients(w);
  const end = removeAccents(removeEndTick(word.apf).slice(-1));
  // again typescript being dumb and not letting me use a typed key here
  const value = [
    plural,
    plural.flatMap(addOEnding) as T.ArrayOneOrMore<T.PsString>,
  ] as T.PluralInflectionSet;
  // feminine words that have arabic plurals stay feminine with the plural - ie مرجع - مراجع
  // but masculine words that appear feminine in the plural aren't femening with the Arabic plural - ie. نبي - انبیا
  if (["i", "e", "a"].includes(end) && word.c?.includes("n. f.") === true) {
    return { fem: value };
  }
  return { masc: value };
}

export function makePlural(
  w: T.DictionaryEntryNoFVars,
):
  | { plural: T.PluralInflections; bundledPlural?: T.PluralInflections }
  | { arabicPlural: T.PluralInflections; bundledPlural?: T.PluralInflections }
  | undefined {
  function addSecondInf(
    plur: T.ArrayOneOrMore<T.PsString> | T.PsString,
  ): T.PluralInflectionSet {
    if (!Array.isArray(plur)) {
      return addSecondInf([plur]);
    }
    return [plur, plur.flatMap(addOEnding) as T.ArrayOneOrMore<T.PsString>];
  }
  if (w.c?.includes("pl.") === true) {
    const plural = addSecondInf(makePsString(w.p, w.f));
    // Typescript being dumb and not letting me do a typed variable for the key
    // could try refactoring with an updated TypeScript dependency
    if (w.c.includes("n. m.")) return { plural: { masc: plural } };
    if (w.c.includes("n. f.")) return { plural: { fem: plural } };
  }
  // exception for mUláa
  if (w.f === "mUláa" || w.f === "mUlaa") {
    return {
      plural: {
        masc: [
          [
            { p: "ملایان", f: "mUlaayáan" },
            { p: "ملاګان", f: "mUlaagáan" },
          ],
          [
            { p: "ملایانو", f: "mUlaayáano" },
            { p: "ملاګانو", f: "mUlaagáano" },
          ],
        ],
      },
    };
  }
  const arabicPlural = makeArabicPlural(w);
  const pashtoPlural = makePashtoPlural(w);
  const bundledPlural = makeBundledPlural(w);
  function addMascPluralSuffix(
    animate?: boolean,
    shortSquish?: boolean,
  ): T.PluralInflectionSet {
    if (
      shortSquish === true &&
      (w.infap === undefined || w.infaf === undefined)
    ) {
      throw new Error(`no irregular inflection info for ${w.p} - ${w.ts}`);
    }
    const b = removeAccents(
      shortSquish === true
        ? makePsString(
            (w.infap as string).slice(0, -1),
            (w.infaf as string).slice(0, -1),
          )
        : w,
    );
    const base = hasShwaEnding(b)
      ? makePsString(b.p.slice(0, -1), b.f.slice(0, -1))
      : b;
    return addSecondInf(
      concatPsString(
        base,
        animate === true && shortSquish !== true
          ? { p: "ان", f: "áan" }
          : { p: "ونه", f: "óona" },
      ),
    );
  }
  function addAnimUnisexPluralSuffix(): T.UnisexSet<T.PluralInflectionSet> {
    const base = removeAccents(w);
    return {
      masc: addMascPluralSuffix(true),
      fem: addSecondInf(concatPsString(base, { p: "انې", f: "áane" })),
    };
  }
  function addEePluralSuffix(gender: T.Gender): T.PluralInflectionSet {
    const b = removeAccents(w);
    const base = {
      p: b.p.slice(0, -1),
      f: b.f.slice(0, -2),
    };
    const firstInf: T.ArrayOneOrMore<T.PsString> = [
      concatPsString(
        base,
        { p: "یان", f: "iyáan" },
        gender === "fem" ? { p: "ې", f: "e" } : "",
      ),
    ];
    return [
      firstInf,
      firstInf.flatMap(addOEnding),
      // firstInf.map(addOEnding),
    ] as T.PluralInflectionSet;
  }
  function addAnimN3UnisexPluralSuffix(): T.UnisexSet<T.PluralInflectionSet> {
    const b = removeAccents(w);
    const base = {
      p: b.p.slice(0, -1),
      f: b.f.slice(0, -2),
    };
    return {
      masc: [
        [concatPsString(base, { p: "یان", f: "iyáan" })],
        [concatPsString(base, { p: "یانو", f: "iyáano" })],
        // TODO: or use addSecondInf method above?
      ],
      fem: [
        [concatPsString(base, { p: "یانې", f: "iyáane" })],
        [concatPsString(base, { p: "یانو", f: "iyáano" })],
      ],
    };
  }
  function addLongVowelSuffix(gender: "masc" | "fem"): T.PluralInflectionSet {
    const base = removeEndTick(makePsString(w.p, w.f));
    const baseWOutAccents = removeAccents(base);
    const space =
      w.p.slice(-1) === "ع" || w.p.slice(-1) === "ه" ? { p: " ", f: " " } : "";
    if (gender === "fem") {
      return addSecondInf([
        concatPsString(base, space, { p: "وې", f: "we" }),
        concatPsString(baseWOutAccents, space, { p: "ګانې", f: "gáane" }),
      ]);
    } else {
      return addSecondInf([
        concatPsString(baseWOutAccents, space, { p: "ګان", f: "gáan" }),
      ]);
    }
  }
  // TODO: This should be possible for words like پلویان but not for words like ترورزامن 🤔
  // function addFemToPashtoPlural(i: T.PluralInflections): T.UnisexSet<T.PluralInflectionSet> {
  //   if ("fem" in i && "masc" in i) return i;
  //   if (!("masc" in i)) throw new Error("bad pashto plural doesn't even have masculine");
  //   if (endsInConsonant(i.masc[0][0])) {
  //     return {
  //       ...i,
  //       fem: [
  //         i.masc[0].map((x) => concatPsString(x, { p: "ې", f: "e" })) as T.ArrayOneOrMore<T.PsString>,
  //         i.masc[0].map((x) => concatPsString(x, { p: "و", f: "o" })) as T.ArrayOneOrMore<T.PsString>,
  //       ],
  //     };
  //   }
  //   return {
  //     ...i,
  //     fem: i.masc,
  //   };
  // }

  const shortSquish =
    w.infap !== undefined && w.infap !== "" && !w.infap.includes("ا");
  const anim = w.c?.includes("anim.");
  const type =
    w.c?.includes("unisex") === true
      ? "unisex noun"
      : w.c?.includes("n. m.") === true
        ? "masc noun"
        : w.c?.includes("n. f.") === true
          ? "fem noun"
          : "other";
  if (pashtoPlural) {
    return {
      plural: pashtoPlural,
      arabicPlural,
    };
  }
  if (type === "unisex noun") {
    // doesn't need to be labelled anim - because it's only with animate nouns that you get the unisex - I THINK
    if ((endsInConsonant(w) && w.infap === undefined) || w.infap === "") {
      return {
        arabicPlural,
        bundledPlural,
        plural: addAnimUnisexPluralSuffix(),
      };
    }
    if (shortSquish && anim !== true) {
      return {
        arabicPlural,
        plural: { masc: addMascPluralSuffix(anim, shortSquish) },
      };
    }
    if (endsWith([{ p: "ی", f: "áy" }, { p: "ي" }], w, true)) {
      return { arabicPlural, plural: addAnimN3UnisexPluralSuffix() };
    }
    // usually shortSquish nouns would never have arabicPlurals -- so we don't have to worry about catching
    // arabic plurals for the animat ones, right?
  }
  if (
    type === "masc noun" &&
    (shortSquish ||
      ((endsInConsonant(w) || hasShwaEnding(w)) && w.infap === undefined) ||
      w.infap === "") &&
    w.p.slice(-3) !== "توب"
  ) {
    return {
      arabicPlural,
      bundledPlural,
      plural: {
        masc: addMascPluralSuffix(anim, shortSquish),
      },
    };
  }
  if (
    type === "masc noun" &&
    endsWith({ p: "ی", f: "áy" }, w, true) &&
    anim === true
  ) {
    const { masc } = addAnimN3UnisexPluralSuffix();
    return {
      arabicPlural,
      plural: {
        masc,
      },
    };
  }
  if (type === "masc noun" && endsWith({ p: "ي" }, w)) {
    const masc = addEePluralSuffix("masc");
    return {
      arabicPlural,
      plural: { masc },
    };
  }
  // TODO: What about endings in long ee / animate at inanimate
  if (
    (type === "masc noun" && endsInAaOrOo(w) && w.infap === undefined) ||
    w.infap === ""
  ) {
    return {
      arabicPlural,
      plural: {
        masc: addLongVowelSuffix("masc"),
      },
    };
  }
  // TODO: What about endings in long ee / animate at inanimate
  if (
    (type === "fem noun" && endsInAaOrOo(w) && w.infap === undefined) ||
    w.infap === ""
  ) {
    return {
      arabicPlural,
      plural: {
        fem: addLongVowelSuffix("fem"),
      },
    };
  }
  if (
    type === "fem noun" &&
    (endsWith({ p: "ي" }, w) || (endsWith({ p: "ۍ" }, w) && anim === true))
  ) {
    return {
      arabicPlural,
      plural: {
        fem: addEePluralSuffix("fem"),
      },
    };
  }
  if (arabicPlural) {
    return { arabicPlural, plural: pashtoPlural, bundledPlural };
  }
  return undefined;
}
