/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { baParticle } from "./grammar-units";
import {
  getVerbBlockPosFromPerson,
  getPersonInflectionsKey,
} from "./misc-helpers";
import * as T from "../../types";
import { hasAccents, removeAccents } from "./accent-helpers";
import { phoneticsConsonants } from "./pashto-consonants";
import { simplifyPhonetics } from "./simplify-phonetics";
import { makePsString, removeFVarients } from "./accent-and-ps-utils";
import { zipWith } from "rambda";

// export function concatPsStringWithVars(...items: Array<T.PsString | " " | "">): T.PsString[] {

// }

/**
 * Concats sections of Pashto text with Pashto and Phonetics
 * in PsString type, also accepts spaces as " "
 *
 * @param items
 */
export function concatPsString(
  ...items: Array<T.PsString | string | undefined>
): T.PsString;
export function concatPsString(
  ...items: Array<T.PsString | T.LengthOptions<T.PsString> | string | undefined>
): T.LengthOptions<T.PsString>;
export function concatPsString(
  ...items: Array<
    | T.PsString
    | T.LengthOptions<T.PsString>
    | T.OptionalPersonInflections<T.LengthOptions<T.PsString>>
    | string
    | undefined
  >
): T.OptionalPersonInflections<T.LengthOptions<T.PsString>>;
export function concatPsString(
  ...items: Array<T.PsString | T.FullForm<T.PsString> | string | undefined>
): T.FullForm<T.PsString>;
export function concatPsString(
  ...items: Array<
    | T.PsString
    | T.LengthOptions<T.PsString>
    | T.FullForm<T.PsString>
    | string
    | undefined
  >
): T.FullForm<T.PsString> {
  const hasPersonInflections = items.some(
    (x) => x && typeof x !== "string" && "mascSing" in x
  );
  if (hasPersonInflections) {
    const forceInflection = (
      arr: Array<T.FullForm<T.PsString> | string | undefined>,
      inflection: T.PersonInflectionsField
    ): Array<T.SingleOrLengthOpts<T.PsString> | string | undefined> =>
      arr.map((element) =>
        element && typeof element !== "string" && "mascSing" in element
          ? element[inflection]
          : element
      );
    return {
      mascSing: concatPsString(...forceInflection(items, "mascSing")),
      mascPlur: concatPsString(...forceInflection(items, "mascPlur")),
      femSing: concatPsString(...forceInflection(items, "femSing")),
      femPlur: concatPsString(...forceInflection(items, "femPlur")),
    };
  }
  const itemsWOutPersInfs = items as (
    | string
    | T.SingleOrLengthOpts<T.PsString>
  )[];
  const hasLengthOptions = itemsWOutPersInfs.some(
    (x) => x && typeof x !== "string" && "long" in x
  );
  if (hasLengthOptions) {
    const forceLength = (
      arr: Array<T.SingleOrLengthOpts<T.PsString> | string | undefined>,
      length: "long" | "short" | "mini"
    ): Array<T.PsString | string | undefined> =>
      arr.map((element) =>
        element && typeof element !== "string" && "long" in element
          ? element[length] || element.short
          : element
      );
    const hasMini = itemsWOutPersInfs.some(
      (x) => typeof x !== "string" && "mini" in x
    );
    return {
      ...(hasMini
        ? {
            mini: concatPsString(
              ...forceLength(
                items as Array<
                  T.SingleOrLengthOpts<T.PsString> | string | undefined
                >,
                "mini"
              )
            ),
          }
        : {}),
      short: concatPsString(
        ...forceLength(
          items as Array<T.SingleOrLengthOpts<T.PsString> | string | undefined>,
          "short"
        )
      ),
      long: concatPsString(
        ...forceLength(
          items as Array<T.SingleOrLengthOpts<T.PsString> | string | undefined>,
          "long"
        )
      ),
    };
  }
  const itemsWOutLengthOptions = itemsWOutPersInfs as (
    | string
    | undefined
    | T.PsString
  )[];
  const concatField = (k: T.PsStringField): string =>
    itemsWOutLengthOptions
      .map((item): string => {
        if (item === undefined) return "";
        if (typeof item === "string") return item;
        return item[k];
      })
      .join("");
  return {
    p: concatField("p"),
    f: concatField("f"),
  };
}

/**
 * Trims off a given amount of characters of p and f in a PsString
 * (also removes any other fields in the object)
 *
 * @param ps
 * @param pOff - number of characters of pashto script to remove from the end
 * @param fOff - number of characters of phonetics to remove from the end
 * @returns
 */
export function trimOffPs(
  ps: T.PsString,
  pOff: number,
  fOff: number
): T.PsString {
  return {
    p: pOff === 0 ? ps.p : ps.p.slice(0, -pOff),
    f: fOff === 0 ? ps.f : ps.f.slice(0, -fOff),
  };
}

/**
 * breaks a dictionary entry with a double wording (ie. ګډ وډ) into two seperate words
 *
 * @param w
 * @returns
 */
export function splitDoubleWord(
  w: T.DictionaryEntryNoFVars
): [T.DictionaryEntryNoFVars, T.DictionaryEntryNoFVars] {
  const pSplit = w.p.split(" ");
  const fSplit = w.f.split(" ");
  const c = w.c?.replace(" doub.", "");
  return [
    {
      ...w,
      p: pSplit[0],
      f: fSplit[0],
      c: c,
    },
    {
      ...w,
      p: pSplit[1],
      f: fSplit[1],
      c,
    },
  ];
}

export function psFunction(
  ps: T.PsString,
  func: (s: string) => string
): T.PsString {
  return makePsString(func(ps.p), func(ps.f));
}

export function psIncludes(ps: T.PsString, inc: T.PsString): boolean {
  return ps.p.includes(inc.p) && ps.f.includes(inc.f);
}

export function hasBaParticle(ps: T.PsString): boolean {
  return psIncludes(ps, concatPsString(baParticle, " "));
}

export function psRemove(ps: T.PsString, remove: T.PsString): T.PsString {
  return makePsString(ps.p.replace(remove.p, ""), ps.f.replace(remove.f, ""));
}

export function psInsertWord(
  ps: T.PsString,
  toInsert: T.PsString,
  pos: number
): T.PsString {
  const pWords = ps.p.split(" ");
  const fWords = ps.f.split(" ");
  const pIns = [...pWords.slice(0, pos), toInsert.p, ...pWords.slice(pos)];
  const fIns = [...fWords.slice(0, pos), toInsert.f, ...fWords.slice(pos)];
  return makePsString(pIns.join(" "), fIns.join(" "));
}

/**
 * If a به - ba particle is present in a PsString form, ensure that it is placed in word pos
 * If no به - ba is present, return as is
 *
 * @param ps
 * @param pos
 */
export function ensureBaAt(ps: T.PsString, pos: number): T.PsString;
export function ensureBaAt(
  ps: T.SingleOrLengthOpts<T.PsString>,
  pos: number
): T.SingleOrLengthOpts<T.PsString>;
export function ensureBaAt(
  ps: T.FullForm<T.PsString>,
  pos: number
): T.FullForm<T.PsString>;
export function ensureBaAt(
  ps: T.FullForm<T.PsString>,
  pos: number
): T.FullForm<T.PsString> {
  if ("mascSing" in ps) {
    return {
      mascSing: ensureBaAt(ps.mascSing, pos),
      mascPlur: ensureBaAt(ps.mascPlur, pos),
      femSing: ensureBaAt(ps.femSing, pos),
      femPlur: ensureBaAt(ps.femPlur, pos),
    };
  }
  if ("long" in ps) {
    return {
      long: ensureBaAt(ps.long, pos),
      short: ensureBaAt(ps.short, pos),
      ...(ps.mini
        ? {
            mini: ensureBaAt(ps.mini, pos),
          }
        : {}),
    };
  }
  if (!psIncludes(ps, concatPsString(baParticle, " "))) {
    return ps;
  }
  const baRemoved = psRemove(ps, concatPsString(baParticle, " "));
  const baInserted = psInsertWord(baRemoved, baParticle, pos);
  return baInserted;
}

/**
 * Lets us know if all the forms of a verb block are the same
 *
 * @param block
 */
export function isAllOne(block: T.VerbBlock | T.ImperativeBlock): boolean {
  return block.reduce(
    (isTheSame, row, _, src) =>
      isTheSame &&
      psStringEquals(row[0][0], src[0][0][0]) &&
      psStringEquals(row[1][0], src[1][0][0]),
    true
  ) as unknown as boolean;
}

/**
 * Retuns a Pashto string with the ل - ul on the end removed
 *
 * @param s
 */
export function removeEndingL(s: T.PsString): T.PsString {
  const lOnEnd = (): boolean => {
    const lastPLetter = s.p.slice(-1);
    const lastFLetters = s.f.slice(-2);
    return lastPLetter === "ل" && ["ul", "úl"].includes(lastFLetters);
  };
  if (!lOnEnd()) return s;
  return {
    p: s.p.substr(0, s.p.length - 1),
    f: s.f.substr(0, s.f.length - 2),
  };
}

function getMatchingInflection(
  infs: T.UnisexInflections,
  persNum: number,
  singPlur: number
): T.PsString {
  return infs[persNum % 2 === 0 ? "masc" : "fem"][singPlur][0];
}

export function isVerbBlock(x: unknown): x is T.VerbBlock {
  return Array.isArray(x) && x.length === 6 && "p" in x[0][0][0];
}

export function isPluralInflectionSet(x: any): x is T.PluralInflectionSet {
  return Array.isArray(x) && x.length === 2 && "p" in x[0][0];
}

export function isImperativeBlock(x: unknown): x is T.ImperativeBlock {
  return (
    Array.isArray(x) && x.length === 2 && !("p" in x[0][0]) && "p" in x[0][0][0]
  );
}

export function isInflectionSet(x: any): x is T.InflectionSet {
  return Array.isArray(x) && x.length === 3 && "p" in x[0][0];
}

type toAddToForm = Array<
  | " "
  | T.SingleOrLengthOpts<T.PsString>
  | T.SingleOrLengthOpts<T.UnisexInflections>
  | T.SingleOrLengthOpts<T.PsString>[]
  | T.SingleOrLengthOpts<T.PsString[]>
  | T.OptionalPersonInflections<T.PsString>
  | T.VerbBlock
>;
type toAddToFormLengthChosen = Array<
  | " "
  | T.PsString
  | T.UnisexInflections
  | T.PsString[]
  | T.OptionalPersonInflections<T.PsString>
  | T.VerbBlock
>;
export function addToForm(
  toAdd: toAddToForm,
  base: T.VerbForm,
  disableLCheck?: boolean
): T.VerbForm;
export function addToForm(
  toAdd: toAddToForm,
  base: T.ImperativeForm,
  disableLCheck?: boolean
): T.ImperativeForm;
export function addToForm(
  toAdd: toAddToForm,
  base: T.VerbForm | T.ImperativeForm,
  disableLCheck?: boolean
): T.VerbForm | T.ImperativeForm {
  function startsWithBa(ps: T.PsString): boolean {
    const start = makePsString(ps.p.slice(0, 3), ps.f.slice(0, 3));
    return psStringEquals(start, concatPsString(baParticle, " "));
  }
  function removeBa(ps: T.PsString): T.PsString {
    return makePsString(ps.p.slice(3), ps.f.slice(3));
  }
  const toAddIncludesObjectMatrix = () =>
    toAdd.some((x) => x !== " " && "mascSing" in x);
  // TODO: Weird stuff with overloading throwing errors
  function makeNonObjectMatrixForm(
    base: T.VerbBlock | T.LengthOptions<T.VerbBlock>,
    presObject?: "mascSing" | "mascPlur" | "femSing" | "femPlur"
  ): T.SingleOrLengthOpts<T.VerbBlock>;
  function makeNonObjectMatrixForm(
    base:
      | T.ImperativeBlock
      | T.LengthOptions<T.ImperativeBlock>
      | T.VerbBlock
      | T.LengthOptions<T.VerbBlock>,
    presObject?: "mascSing" | "mascPlur" | "femSing" | "femPlur"
  ): T.SingleOrLengthOpts<T.ImperativeBlock>;
  function makeNonObjectMatrixForm(
    base:
      | T.SingleOrLengthOpts<T.VerbBlock>
      | T.SingleOrLengthOpts<T.ImperativeBlock>,
    presObject?: "mascSing" | "mascPlur" | "femSing" | "femPlur"
  ):
    | T.SingleOrLengthOpts<T.VerbBlock>
    | T.SingleOrLengthOpts<T.ImperativeBlock> {
    function makeLengthOption(
      length: "short" | "long" | "mini"
    ): T.ImperativeBlock;
    function makeLengthOption(length: "short" | "long" | "mini"): T.VerbBlock;
    function makeLengthOption(
      length: "short" | "long" | "mini"
    ): T.ImperativeForm | T.VerbBlock {
      // If the base is long and there are also length options in toAdd,
      // then make the short and long versions of the base as variations on each item
      const multiplyEachVariationBy = toAdd.reduce(
        (acc, cur) =>
          // make sure we don't make 6 variations when concating a verb block to a verb block!
          Array.isArray(cur) && !isVerbBlock(cur)
            ? Math.max(acc, cur.length)
            : acc,
        1
      );
      const b =
        "long" in base
          ? base[length] || base.short // in case mini does not exist
          : base;
      const addingLengthChosen: toAddToFormLengthChosen = toAdd.map(
        (element) => {
          if (element !== " " && "long" in element) {
            return element[length] || element.short;
          }
          if (Array.isArray(element)) {
            const arr = element as
              | T.SingleOrLengthOpts<T.PsString>[]
              | T.VerbBlock;
            return arr.map((e: any) =>
              "long" in e ? e[length] || e.short : e
            );
          }
          return element;
        }
      );
      const makeItem = (
        ps: T.PsString,
        persNum: number,
        singPlur: number,
        variation: number,
        verbBlock?: boolean
      ): T.PsString => {
        const add = addingLengthChosen.map((e) => {
          if (e === " ") return e;
          if (isVerbBlock(e)) {
            return e[persNum][singPlur][0];
          }
          const f = e as
            | T.UnisexInflections
            | T.PsString[]
            | T.OptionalPersonInflections<T.PsString>;
          if (Array.isArray(f)) {
            return f[Math.min(variation, f.length - 1)];
          }
          if ("masc" in f) {
            return getMatchingInflection(
              f,
              persNum as number,
              singPlur as number
            );
          }
          if ("mascSing" in f) {
            return f[presObject || /* istanbul ignore next */ "mascSing"];
          }
          return f;
        });
        // avoid adding the redundant ل on past verb endings
        // TODO: If there's a ba in front, remove it and put it on the front
        return length === "long" && verbBlock && ps.p === "ل" && !disableLCheck
          ? concatPsString(...add)
          : startsWithBa(ps)
          ? concatPsString(baParticle, " ", ...add, removeBa(ps))
          : concatPsString(...add, ps);
      };
      if (b.length === 6) {
        return b.map((person, persNum) =>
          person.map(
            (item, singPlur) =>
              // @ts-expect-error because
              item.reduce((vars, ps) => {
                const varIndexes = [...Array(multiplyEachVariationBy).keys()];
                return [
                  ...vars,
                  ...varIndexes.map((varIndex) =>
                    makeItem(ps, persNum, singPlur, varIndex, true)
                  ),
                ];
              }, []) as unknown as T.ArrayOneOrMore<T.PsString>
          )
        ) as T.VerbBlock;
      }
      // TODO: CHECK IF THE IMPERATIVE BLOCKS WORK??
      return mapImperativeBlock(
        (ps, persNumber, singPlur) =>
          makeItem(ps, persNumber as number, singPlur as number, 0),
        b
      );
    }
    const useLengthOptions =
      "long" in base ||
      toAdd.some(
        (element) =>
          (element !== " " && "long" in element) ||
          (Array.isArray(element) && element.some((e) => "long" in e))
      );
    if (useLengthOptions) {
      // might be totally unneccessary...
      const miniInToAdd = toAdd.some((x) => x !== " " && "mini" in x);
      return {
        long: makeLengthOption("long"),
        short: makeLengthOption("short"),
        ...("mini" in base || miniInToAdd
          ? {
              mini: makeLengthOption("mini"),
            }
          : {}),
      };
    }
    // there are no length options in any of the elements or base
    return makeLengthOption("long");
  }
  if (toAddIncludesObjectMatrix() && !("mascSing" in base)) {
    return {
      mascSing: makeNonObjectMatrixForm(base, "mascSing"),
      mascPlur: makeNonObjectMatrixForm(base, "mascPlur"),
      femSing: makeNonObjectMatrixForm(base, "femSing"),
      femPlur: makeNonObjectMatrixForm(base, "femPlur"),
    };
  }
  if ("mascSing" in base) {
    return {
      // TODO: Is this really what we want to do?
      // is there ever a case where we would want the object matrix of a compliment
      // to line up with the object matrix of a base verb?
      mascSing: makeNonObjectMatrixForm(base.mascSing, "mascSing"),
      mascPlur: makeNonObjectMatrixForm(base.mascPlur, "mascPlur"),
      femSing: makeNonObjectMatrixForm(base.femSing, "femSing"),
      femPlur: makeNonObjectMatrixForm(base.femPlur, "femPlur"),
    };
  }
  return makeNonObjectMatrixForm(base);
}

function mapImperativeBlock(
  f: (ps: T.PsString, i?: number, j?: number) => T.PsString,
  block: T.ImperativeBlock
): T.ImperativeBlock {
  return block.map((person, i) =>
    person.map((item, j) => item.map((variation) => f(variation, i, j)))
  ) as T.ImperativeBlock;
}

export function mapVerbBlock(
  f: (ps: T.PsString, i?: number, j?: number) => T.PsString,
  block: T.VerbBlock
): T.VerbBlock {
  return block.map((person, i) =>
    person.map((item, j) => item.map((variation) => f(variation, i, j)))
  ) as T.VerbBlock;
}

export function unisexInfToObjectMatrix(
  inf: T.UnisexInflections
): T.OptionalPersonInflections<T.PsString> {
  return {
    mascSing: inf.masc[0][0],
    mascPlur: inf.masc[1][0],
    femSing: inf.fem[0][0],
    femPlur: inf.fem[1][0],
  };
}

export function concatPlurals(
  a: T.PluralInflections,
  b: T.PluralInflections
): T.PluralInflections {
  function concatPsArraysWSpace(
    a: T.ArrayOneOrMore<T.PsString>,
    b: T.ArrayOneOrMore<T.PsString>
  ): T.ArrayOneOrMore<T.PsString> {
    if (a.length !== b.length) {
      throw new Error("arrays of plural/vocative inflections are different!");
    }
    return a.map((x, i) =>
      concatPsString(x, " ", b[i])
    ) as T.ArrayOneOrMore<T.PsString>;
  }

  function concatPluralSet(
    a: T.PluralInflectionSet,
    b: T.PluralInflectionSet
  ): T.PluralInflectionSet {
    return [concatPsArraysWSpace(a[0], b[0]), concatPsArraysWSpace(a[1], b[1])];
  }
  const masc =
    "masc" in a && "masc" in b ? concatPluralSet(a.masc, b.masc) : undefined;
  const fem =
    "fem" in a && "fem" in b ? concatPluralSet(a.fem, b.fem) : undefined;
  if (masc && fem) {
    return { masc, fem };
  }
  if (masc) {
    return { masc };
  }
  if (fem) {
    return { fem };
  }
  throw new Error("error concating plural/vocative inflections for double!");
}

export function concatInflections(
  comp: T.PsString | T.SingleOrLengthOpts<T.UnisexInflections>,
  infs: T.SingleOrLengthOpts<T.UnisexInflections>
): T.SingleOrLengthOpts<T.UnisexInflections> {
  const containsLengthOptions = "long" in infs || "long" in comp;
  const ensureL = <T extends object>(
    x: T.SingleOrLengthOpts<T>,
    length: "short" | "long"
  ): T => ("long" in x ? x[length] : x);
  if (containsLengthOptions) {
    return {
      short: concatInflections(
        ensureL(comp, "short"),
        ensureL(infs, "short")
      ) as T.UnisexInflections,
      long: concatInflections(
        ensureL(comp, "long"),
        ensureL(infs, "long")
      ) as T.UnisexInflections,
    };
  }
  // now length options are removed
  const complement = comp as T.PsString | T.UnisexInflections;
  const infsOneL = infs as T.UnisexInflections;
  const mapGender = (gender: "masc" | "fem") =>
    infsOneL[gender].map((inf: T.ArrayOneOrMore<T.PsString>, i) =>
      inf.map((variation) => {
        const c = "masc" in complement ? complement[gender][i][0] : complement;
        return concatPsString(c, " ", variation);
      })
    ) as T.ArrayFixed<T.ArrayOneOrMore<T.PsString>, 3>;
  return {
    masc: mapGender("masc"),
    fem: mapGender("fem"),
  };
}

/**
 * Checks if a given infinitive ends in یل - yul such as وایل - waayul etc.
 *
 * @param s
 */
export function yulEndingInfinitive(s: T.PsString): boolean {
  const pEnding = s.p.slice(-2);
  const fEnding = s.f.slice(-3);
  return pEnding === "یل" && ["yul", "yúl"].includes(fEnding);
}

export function allOnePersonInflection(
  block: T.ImperativeForm,
  person: T.Person
): T.SingleOrLengthOpts<T.ImperativeBlock>;
export function allOnePersonInflection(
  block: T.VerbForm,
  person: T.Person
): T.SingleOrLengthOpts<T.VerbBlock>;
export function allOnePersonInflection(
  block: T.SingleOrLengthOpts<T.UnisexInflections>,
  person: T.Person
): T.SingleOrLengthOpts<T.UnisexInflections>;
export function allOnePersonInflection(
  block:
    | T.VerbForm
    | T.ImperativeForm
    | T.SingleOrLengthOpts<T.UnisexInflections>,
  person: T.Person
):
  | T.SingleOrLengthOpts<T.VerbBlock>
  | T.SingleOrLengthOpts<T.ImperativeBlock>
  | T.SingleOrLengthOpts<T.UnisexInflections> {
  if ("mascSing" in block) {
    const key = getPersonInflectionsKey(person);
    return block[key];
  }
  return block;
}

export function hasShwaEnding({ f }: T.PsString): boolean {
  return f.endsWith("u") || f.endsWith("ú");
}

export function choosePersInf<T extends object>(
  x: T.FullForm<T>,
  persInf: T.PersonInflectionsField
): T.SingleOrLengthOpts<T> {
  if ("mascSing" in x) {
    return x[persInf];
  }
  return x;
}

export function allOnePersonVerbForm(
  block: T.VerbForm,
  person: T.Person
): T.VerbForm {
  if ("mascSing" in block) {
    return {
      mascSing: allOnePersonVerbForm(
        block.mascSing,
        person
      ) as T.SingleOrLengthOpts<T.VerbBlock>,
      mascPlur: allOnePersonVerbForm(
        block.mascPlur,
        person
      ) as T.SingleOrLengthOpts<T.VerbBlock>,
      femSing: allOnePersonVerbForm(
        block.femSing,
        person
      ) as T.SingleOrLengthOpts<T.VerbBlock>,
      femPlur: allOnePersonVerbForm(
        block.femPlur,
        person
      ) as T.SingleOrLengthOpts<T.VerbBlock>,
    };
  }
  if ("long" in block) {
    return {
      long: allOnePersonVerbForm(block.long, person) as T.VerbBlock,
      short: allOnePersonVerbForm(block.short, person) as T.VerbBlock,
      ...(block.mini
        ? {
            mini: allOnePersonVerbForm(block.mini, person) as T.VerbBlock,
          }
        : {}),
    };
  }
  const [row, col] = getVerbBlockPosFromPerson(person);
  const p = block[row][col];
  return [
    [p, p],
    [p, p],
    [p, p],
    [p, p],
    [p, p],
    [p, p],
  ];
}

/**
 * Returns a set of inflections that are all masculine plural
 * (for conjugating the past participle of gramatically transitive verbs)
 *
 * @param inflections
 */
export function allMascFirstInflection(
  inflections: T.SingleOrLengthOpts<T.UnisexInflections>
): T.SingleOrLengthOpts<T.UnisexInflections> {
  if ("long" in inflections) {
    return {
      long: allMascFirstInflection(inflections.long) as T.UnisexInflections,
      short: allMascFirstInflection(inflections.short) as T.UnisexInflections,
    };
  }
  const mp = inflections.masc[1];
  return {
    masc: [mp, mp, mp],
    fem: [mp, mp, mp],
  };
}

export function complementInflects(inf: T.UnisexInflections): boolean {
  return (
    inf.masc[0][0].p !== inf.masc[2][0].p ||
    inf.fem[0][0].p !== inf.fem[1][0].p ||
    inf.masc[0][0].p !== inf.fem[0][0].p
  );
  // OR MORE THOROUGH?
  // const fm = inf.masc[0][0];
  // return !(
  //     psStringEquals(inf.masc[1][0], fm) &&
  //     psStringEquals(inf.masc[2][0], fm) &&
  //     psStringEquals(inf.fem[1][0], fm) &&
  //     psStringEquals(inf.fem[2][0], fm)
  // );
}

export function psStringEquals(
  ps1: T.PsString,
  ps2: T.PsString,
  ignoreAccents?: boolean
): boolean {
  const [p1, p2] = ignoreAccents
    ? [removeAccents(ps1), removeAccents(ps2)]
    : [ps1, ps2];
  return p1.p === p2.p && p1.f === p2.f;
}

export function removeRetroflexR(ps: T.PsString): T.PsString {
  return {
    p: ps.p.replace("ړ", ""),
    f: ps.f.replace("R", ""),
  };
}

export function clamp(s: string, chars = 20): string {
  return `${s.slice(0, chars)}${s.length > chars ? "..." : ""}`;
}

export function addEnglish(
  english: T.EnglishBlock | string,
  ps: T.VerbBlock
): T.VerbBlock;
export function addEnglish(
  english: T.EnglishBlock | string,
  ps: T.ImperativeBlock
): T.ImperativeBlock;
export function addEnglish(
  english: T.EnglishBlock | string,
  ps: T.ArrayOneOrMore<T.PsString>
): T.ArrayOneOrMore<T.PsString>;
export function addEnglish(
  english: T.EnglishBlock | string,
  ps: T.SentenceForm
): T.SentenceForm;
export function addEnglish(
  english: T.EnglishBlock | string,
  ps: T.VerbBlock | T.ImperativeBlock | T.ArrayOneOrMore<T.PsString>
): T.VerbBlock | T.ImperativeBlock | T.ArrayOneOrMore<T.PsString>;
export function addEnglish(
  english: T.EnglishBlock | string,
  ps:
    | T.VerbBlock
    | T.ImperativeBlock
    | T.ArrayOneOrMore<T.PsString>
    | T.SentenceForm
):
  | T.VerbBlock
  | T.ImperativeBlock
  | T.ArrayOneOrMore<T.PsString>
  | T.SentenceForm {
  if ("long" in ps) {
    return {
      long: addEnglish(english, ps.long),
      short: addEnglish(english, ps.short),
      ...(ps.mini
        ? {
            mini: addEnglish(english, ps.mini),
          }
        : {}),
    };
  }
  if (Array.isArray(ps[0]) && ps.length === 6) {
    return mapVerbBlock(
      (psString, i, j) => ({
        ...psString,
        // @ts-expect-error because
        e: typeof english === "string" ? english : english[i][j],
      }),
      ps as T.VerbBlock
    );
  }
  if (Array.isArray(ps[0]) && ps.length === 2) {
    return mapImperativeBlock(
      (psString, i, j) => ({
        ...psString,
        // @ts-expect-error because
        e: typeof english === "string" ? english : english[i][j],
      }),
      ps as T.ImperativeBlock
    );
  }
  const line = ps as T.ArrayOneOrMore<T.PsString>;
  return line.map((psString) => ({
    ...psString,
    e: typeof english === "string" ? english : english[0][0],
  })) as T.ArrayOneOrMore<T.PsString>;
}

export function beginsWithDirectionalPronoun(ps: T.PsString): boolean {
  const beginning = ps.p.slice(0, 2);
  return ["را", "در", "ور"].includes(beginning);
}

export function checkForOoPrefix(ps: T.PsString): boolean {
  return ps.p[0] === "و" && ["oo", "óo"].includes(ps.f.slice(0, 2));
}

export function startsWithBa(ps: T.PsString): boolean {
  return ps.p.slice(0, 3) === "به " && ps.f.slice(0, 3) === "ba ";
}

/**
 * Removes a given head from a verb form, returning just the second half of the split
 * It keeps به in front if there is a به at the beginning of the form
 *
 * @param head - the first part of a verb split
 * @param ps - the whole verb form that needs the head removed
 */
export function removeHead(head: T.PsString, ps: T.PsString): T.PsString {
  const hasBa = startsWithBa(ps);
  const base = hasBa ? psRemove(ps, concatPsString(baParticle, " ")) : ps;
  const chopped = {
    p: base.p.slice(head.p.length),
    f: base.f.slice(head.f.length),
  };
  return hasBa ? concatPsString(baParticle, " ", chopped) : chopped;
}

export function uniquePsStringArray(arr: T.PsString[]): T.PsString[] {
  return [...new Set(arr.map((o) => JSON.stringify(o)))].map((string) =>
    JSON.parse(string)
  ) as T.PsString[];
}

export function splitOffLeapfrogWordFull(
  ps: T.SingleOrLengthOpts<T.PsString[]>
): [T.SingleOrLengthOpts<T.PsString[]>, T.SingleOrLengthOpts<T.PsString[]>] {
  if ("long" in ps) {
    const [shortA, shortB] = splitOffLeapfrogWordFull(ps.short) as [
      T.PsString[],
      T.PsString[]
    ];
    const [longA, longB] = splitOffLeapfrogWordFull(ps.long) as [
      T.PsString[],
      T.PsString[]
    ];
    return [
      { long: longA, short: shortA },
      { long: longB, short: shortB },
    ];
  }
  return ps.reduce(
    (accum, curr): [T.PsString[], T.PsString[]] => {
      const [front, back] = splitOffLeapfrogWord(curr);
      return [
        [...accum[0], front],
        [...accum[1], back],
      ];
    },
    [[], []] as [T.PsString[], T.PsString[]]
  );
}

export function splitOffLeapfrogWord(ps: T.PsString): [T.PsString, T.PsString] {
  const pWords = ps.p.split(" ");
  const fWords = ps.f.split(" ");
  const beginning = makePsString(
    pWords.slice(0, -1).join(" "),
    fWords.slice(0, -1).join(" ")
  );
  const end = makePsString(
    pWords.slice(-1).join(" "),
    fWords.slice(-1).join(" ")
  );
  return [beginning, end];
}

export function removeObjComp(
  comp: T.PsString | undefined,
  ps: T.PsString
): T.PsString {
  if (!comp) {
    return ps;
  }
  return makePsString(
    ps.p.replace(comp.p + " ", ""),
    ps.f.replace(comp.f + " ", "")
  );
}

export function psStringContains(
  ps: T.PsString,
  searchFor: T.PsString
): boolean {
  return ps.p.includes(searchFor.p) && ps.f.includes(searchFor.f);
}

export function removeStartingTick(f: string): string {
  if (f[0] === "`") {
    return f.slice(1);
  }
  return f;
}

export function ensureShortWurShwaShift(ps: T.PsString): T.PsString {
  if (ps.p.slice(-2) === "وړ" && ps.f.slice(-2) === "wR") {
    return {
      p: ps.p,
      f: ps.f.slice(0, -2) + "wuR",
    };
  }
  return ps;
}

export function ensureUnisexInflections(
  infs: T.InflectorOutput,
  w: T.DictionaryEntryNoFVars
): {
  inflections: T.UnisexInflections;
  plural?: T.PluralInflections;
  vocative?: T.PluralInflections;
} {
  const ps = { p: w.p, f: w.f };
  if (infs === false) {
    return {
      inflections: {
        masc: [[ps], [ps], [ps]],
        fem: [[ps], [ps], [ps]],
      },
    };
  }
  if (!infs.inflections) {
    return {
      inflections: {
        masc: [[ps], [ps], [ps]],
        fem: [[ps], [ps], [ps]],
      },
      ...("plural" in infs ? { plural: infs.plural } : {}),
      ...("vocative" in infs ? { vocative: infs.vocative } : {}),
    };
  }
  if (!("fem" in infs.inflections)) {
    return {
      inflections: {
        ...infs.inflections,
        fem: [[ps], [ps], [ps]],
      },
      ...("plural" in infs ? { plural: infs.plural } : {}),
      ...("vocative" in infs ? { vocative: infs.vocative } : {}),
    };
  }
  if (!("masc" in infs.inflections)) {
    return {
      inflections: {
        ...infs.inflections,
        masc: [[ps], [ps], [ps]],
      },
      ...("plural" in infs ? { plural: infs.plural } : {}),
      ...("vocative" in infs ? { vocative: infs.vocative } : {}),
    };
  }
  return {
    inflections: infs.inflections,
    ...("plural" in infs ? { plural: infs.plural } : {}),
    ...("vocative" in infs ? { vocative: infs.vocative } : {}),
  };
}

export function endsInAaOrOo(w: T.PsString): boolean {
  const fEnd = simplifyPhonetics(w.f).slice(-2);
  const pEnd = w.p.slice(-1) === "ع" ? w.p.slice(-2, -1) : w.p.slice(-1);
  return (
    (pEnd === "و" && fEnd.endsWith("o")) || (pEnd === "ا" && fEnd === "aa")
  );
}

export function endsInTob(ps: T.PsString): boolean {
  return (
    ps.p.slice(-3) === "توب" &&
    ["tób", "tob"].includes(ps.f.slice(-3)) &&
    ps.p.length > 3
  );
}

export function endsInConsonant(w: T.PsString): boolean {
  return (
    phoneticsConsonants.includes(simplifyPhonetics(w.f).slice(-1)) ||
    endsWith(
      [
        { p: "ای", f: "aay" },
        { p: "وی", f: "ooy" },
      ],
      w
    ) ||
    endsWith([{ p: "ه", f: "h" }], w) ||
    endsWith([{ p: "و", f: "w" }], w)
  );
}

/**
 * adds a و - o ending (used in plurals 2nd inflection) to a given PsString
 * It will wipe out a ه - a / u or ې - e and will preserve the accent
 *
 * @param w
 * @returns
 */
export function addOEnding(ps: T.PsString): T.ArrayOneOrMore<T.PsString> {
  const w = removeEndTick(ps);
  const lastLetter = makePsString(w.p.slice(-1), w.f.slice(-1));
  const hasEyEnding =
    lastLetter.p === "ی" && ["ay", "áy"].includes(w.f.slice(-2));
  if (hasEyEnding) {
    const base = makePsString(w.p.slice(0, -1), w.f.slice(0, -2));
    const endHadAccent = w.f.slice(-2) === "áy";
    return [
      concatPsString(base, { p: "یو", f: endHadAccent ? "íyo" : "iyo" }),
      concatPsString(base, { p: "و", f: endHadAccent ? "ó" : "o" }),
    ];
  }
  if (lastLetter.p === "ۍ") {
    const base = makePsString(w.p.slice(0, -1), w.f.slice(0, -2));
    const endHadAccent = w.f.slice(-2) === "úy";
    return [concatPsString(base, { p: "یو", f: endHadAccent ? "úyo" : "uyo" })];
  }
  if (lastLetter.p === "ا" || w.p.slice(-2) === "اع") {
    return [concatPsString(w, { p: "وو", f: "wo" })];
  }
  const base =
    (["ه", "ع"].includes(lastLetter.p) &&
      lastLetter.f.match(/[a|u|i|U|á|ú|í|Ú]/)) ||
    (lastLetter.p === "ې" && ["e", "é"].includes(lastLetter.f))
      ? makePsString(w.p.slice(0, -1), w.f.slice(0, -1))
      : w;
  return [
    concatPsString(
      base,
      makePsString("و", hasAccents(lastLetter.f) ? "ó" : "o")
    ),
  ];
}

/**
 * applies f function to both the p and f in a PsString
 *
 */
export function mapPsString<T, P extends T.PsString>(
  f: (s: string) => T,
  ps: P
): Omit<P, "p" | "f"> & { p: T; f: T } {
  return {
    ...ps,
    p: f(ps.p),
    f: f(ps.f),
  };
}

/**
 * splits up a given PsString by comma-seperated varients
 *
 * @param w
 * @returns
 */
export function splitPsByVarients(w: T.PsString): T.ArrayOneOrMore<T.PsString> {
  const { p, f } = mapPsString(splitVarients, w);
  return zipWith(makePsString, p, f) as T.ArrayOneOrMore<T.PsString>;
}

export function splitVarients(s: string) {
  return s.split(/[,|،]/).map((s) => s.trim());
}

/**
 * checks to see if a search string exists in a list of comma-seperated varents
 */
export function isInVarients(
  vars: string | false | undefined,
  search: string | false | undefined
): boolean {
  if (!vars || !search) return false;
  return splitVarients(vars).includes(search);
}

export function removeEndTick(w: T.PsString): T.PsString;
export function removeEndTick(w: string): string;
export function removeEndTick(w: T.PsString | string): T.PsString | string {
  if (typeof w !== "string") {
    return makePsString(w.p, removeEndTick(w.f));
  }
  return w.slice(-1) === "'" ? w.slice(0, -1) : w;
}

export function isUnisexSet<X>(inf: T.GenderedSet<X>): inf is T.UnisexSet<X> {
  return "masc" in inf && "fem" in inf;
}

export function isPluralInflections(
  inf: T.PluralInflections | T.Inflections
): inf is T.PluralInflections {
  if ("masc" in inf) {
    return inf.masc.length === 2;
  }
  return inf.fem.length === 2;
}

// TODO: make this usable with things like endsWith([{ f: ["t", "b"] } | { ps: "ای", f: "aay" }])
/**
 * determines if ps ends with a given ending, or one of an array of given endings
 * (can be accent sensitive or not)
 *
 * regular - `endsWith(ending, string, matchAccent?)` returns `boolean`
 * curried - `endsWith(ending, matchAccent?)` returns `(ps) => boolean`
 *
 */
export function endsWith(
  ending:
    | (T.PsString | { p: string | string[] } | { f: string | string[] })
    | (T.PsString | { p: string | string[] } | { f: string | string[] })[],
  ps?: boolean
): (ps: T.PsString) => boolean;
export function endsWith(
  ending:
    | (T.PsString | { p: string | string[] } | { f: string | string[] })
    | (T.PsString | { p: string | string[] } | { f: string | string[] })[],
  ps: T.PsString,
  matchAccent?: boolean
): boolean;
export function endsWith(
  ending:
    | (T.PsString | { p: string | string[] } | { f: string | string[] })
    | (T.PsString | { p: string | string[] } | { f: string | string[] })[],
  ps: T.PsString | undefined | boolean,
  matchAccent?: boolean | undefined
): boolean | ((ps: T.PsString) => boolean) {
  // curried version
  if (ps === undefined || typeof ps === "boolean") {
    const matchAccent = !!ps;
    return (ps: T.PsString) => endsWith(ending, ps, matchAccent);
  }
  if (Array.isArray(ending)) {
    return ending.some((e) => endsWith(e, ps, matchAccent));
  }
  if ("p" in ending && Array.isArray(ending.p)) {
    return ending.p.some((e) => endsWith({ p: e }, ps, matchAccent));
  }
  if ("f" in ending && Array.isArray(ending.f)) {
    return ending.f.some((e) => endsWith({ f: e }, ps, matchAccent));
  }
  const f = removeFVarients(ps.f).replace(/'/g, "");
  const fEnd =
    "f" in ending
      ? // @ts-expect-error because
        ending.f.replace(/'/g, "")
      : undefined;
  return (
    ("p" in ending ? ps.p.slice(-ending.p.length) === ending.p : true) &&
    (fEnd
      ? (matchAccent
          ? f.slice(-fEnd.length)
          : removeAccents(f.slice(-fEnd.length))) ===
        (matchAccent ? fEnd : removeAccents(fEnd))
      : true)
  );
}

export function firstVariation(s: string): string {
  return s.split(/[,|;]/)[0].trim();
}

export function psStringFromEntry(entry: T.PsString): T.PsString {
  return {
    p: entry.p,
    f: removeFVarients(entry.f),
  };
}

export function getLength<U extends object>(
  x: T.SingleOrLengthOpts<U>,
  length: "long" | "short" | "mini"
): U {
  if ("long" in x) {
    const s = x[length];
    return s ? s : x.short;
  }
  return x;
}

export function getLong<U extends object>(x: T.SingleOrLengthOpts<U>): U {
  if ("long" in x) {
    return x.long;
  }
  return x;
}

export function getShort<U extends object>(a: T.SingleOrLengthOpts<U>): U {
  if ("long" in a) {
    return a.short;
  }
  return a;
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * For use with the
 */
export function undoAaXuPattern(p: string): false | string {
  if (p.at(-1) !== "ه") {
    return false;
  }
  const chars = p.split("");
  const prevVowel = chars.findIndex((c) => ["ی", "ې", "ا"].includes(c));
  if (prevVowel === -1) {
    return false;
  }
  if (p[prevVowel] !== "ا") {
    return false;
  }
  return p.slice(0, prevVowel) + p.slice(prevVowel + 1, -1);
}

export function lastVowelNotA(g: string): boolean {
  const matches = g.match(/ee|aa|i|u|o|oo|U|e|a/g);
  if (!matches) {
    return true;
  }
  return matches[matches.length - 1] !== "a";
}

export function lastVowelNotAorO(g: string): boolean {
  const matches = g.match(/ee|aa|i|u|o|oo|U|e|a/g);
  if (!matches) {
    return true;
  }
  return (
    matches[matches.length - 1] !== "a" && matches[matches.length - 1] !== "o"
  );
}
