import * as T from "../../../types";
import { assertNever } from "../misc-helpers";
import { getInfoFromV } from "./verb-section/vblock-tools";

/**
 * Monadic binding for ParseResult[]
 *
 * Takes a given array of parse results
 * and a function to take the tokens and body of each parse result
 * and do something further with them
 *
 * all the results are flatMapped into a new ParseResult[] monad
 * and the errors are passed on and pruned
 *
 * @returns
 */
export function bindParseResult<C, D>(
  prev: T.ParseResult<C>[],
  f: (tokens: Readonly<T.Token[]>, r: C) => T.ParseResult<D>[],
): T.ParseResult<D>[] {
  // PERFECTION 🧪
  return cleanOutResults(
    prev.flatMap((p) => f(p.tokens, p.body).map(addErrors(p.errors))),
  );
}

export function bindParseResultDebug<C, D>(
  prev: T.ParseResult<C>[],
  f: (tokens: Readonly<T.Token[]>, r: C) => T.ParseResult<D>[],
): T.ParseResult<D>[] {
  // PERFECTION 🧪
  return cleanOutResultsDebug(
    prev.flatMap((p) => f(p.tokens, p.body).map(addErrors(p.errors))),
  );
}

export function bindParseWithAllErrors<C, D>(
  prev: T.ParseResult<C>[],
  f: (tokens: Readonly<T.Token[]>, r: C) => T.ParseResult<D>[],
): T.ParseResult<D>[] {
  // PERFECTION 🧪
  // TODO: Do we really need to remove duplicates ?? I don't think so
  return removeDuplicates(
    prev.flatMap((p) => f(p.tokens, p.body).map(addErrors(p.errors))),
  );
}

/**
 * For when your next step depends on a parse that only relies on
 * the tokens ahead, the parser can be passed and used only once
 * for every length of results it gets
 *
 * ie if you have an arguments section like زه تا before وینم will give
 * you 8 possibilities to try with parsing, all with the remaining و ینم tokens
 *
 * this way it will only try to parse those remaining tokens once
 *
 **/
export function bindParseResultWParser<C, D, E>(
  prev: T.ParseResult<C>[],
  parser: (tokens: Readonly<T.Token[]>) => T.ParseResult<D>[],
  f: (res: C, parsed: D, tokens: Readonly<T.Token[]>) => T.ParseResult<E>[],
): T.ParseResult<E>[] {
  const grouped = groupByTokenLength(prev);
  return cleanOutResults(
    grouped.flatMap((group) => {
      const parsed = cleanOutResults(parser(group[0].tokens));
      return group.flatMap((prev) => {
        return parsed.flatMap((parse) =>
          f(prev.body, parse.body, parse.tokens).map(
            addErrors([...parse.errors, ...prev.errors]),
          ),
        );
      });
    }),
  );
}

export function addErrors<C>(errs: T.ParseError[]) {
  return function (pr: T.ParseResult<C>): T.ParseResult<C> {
    return {
      tokens: pr.tokens,
      body: pr.body,
      errors: [...pr.errors, ...errs],
    };
  };
}

export function toParseError(message: string): T.ParseError {
  return { message };
}

function groupByTokenLength<D>(
  results: T.ParseResult<D>[],
): T.ParseResult<D>[][] {
  const buckets: Record<number, T.ParseResult<D>[]> = {};
  results.forEach((pr) => {
    const l = pr.tokens.length;
    if (!buckets[l]) {
      buckets[l] = [pr];
    } else {
      buckets[l].push(pr);
    }
  });
  return Object.values(buckets);
}

export function returnParseResults<D>(
  tokens: Readonly<T.Token[]>,
  body: D[],
  errors?: T.ParseError[],
): T.ParseResult<D>[] {
  return body.map<T.ParseResult<D>>((b) => ({
    tokens,
    body: b,
    errors: errors || [],
  }));
}

export function returnParseResultSingle<D>(
  tokens: Readonly<T.Token[]>,
  body: D,
  errors?: T.ParseError[],
): T.ParseResult<D> {
  return {
    tokens,
    body,
    errors: errors || [],
  };
}

export function returnParseResult<D>(
  tokens: Readonly<T.Token[]>,
  body: D,
  errors?: T.ParseError[],
): T.ParseResult<D>[] {
  return [
    {
      tokens,
      body,
      errors: errors || [],
    },
  ];
}

/**
 * finds the most successful path(s) and culls out any other more erroneous
 * or redundant paths
 */
export function cleanOutResults<C>(
  results: T.ParseResult<C>[],
): T.ParseResult<C>[] {
  if (results.length === 0) {
    return results;
  }
  let min = Infinity;
  for (const a of results) {
    if (a.errors.length < min) {
      min = a.errors.length;
    }
  }
  const errorsCulled = results.filter((x) => x.errors.length === min);
  return removeDuplicates(errorsCulled);
}

export function cleanOutResultsDebug<C>(
  results: T.ParseResult<C>[],
): T.ParseResult<C>[] {
  if (results.length === 0) {
    return results;
  }
  console.log({ results });
  let min = Infinity;
  for (const a of results) {
    if (a.errors.length < min) {
      min = a.errors.length;
    }
  }
  const errorsCulled = results.filter((x) => x.errors.length === min);
  return removeDuplicates(errorsCulled);
}

function removeDuplicates<C>(results: T.ParseResult<C>[]): T.ParseResult<C>[] {
  if (results.length === 0) {
    return results;
  }
  // @ts-expect-error - bc
  return Array.from(new Set(results.map(JSON.stringify))).map(JSON.parse);
}

export type Parser<R> = (
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
) => T.ParseResult<R>[];

export function parserCombOr<R>(parsers: Parser<R>[]) {
  return (tokens: Readonly<T.Token[]>, dictionary: T.DictionaryAPI) =>
    parsers.flatMap((p) => p(tokens, dictionary));
}

/**
 * A parser combinator to take a parser and make it run as many times as possible
 * for each success, it will also return an option as if it failed, to allow for
 * the words to be considered something else.
 *
 * @param parser
 * @returns
 */
export function parserCombMany<R>(parser: Parser<R>): Parser<R[]> {
  const r: Parser<R[]> = (
    tokens: Readonly<T.Token[]>,
    dictionary: T.DictionaryAPI,
  ) => {
    function go(acc: R[], t: Readonly<T.Token[]>): T.ParseResult<R[]>[] {
      const one = parser(t, dictionary);
      if (one.length === 0) {
        return returnParseResult(t, acc);
      }
      return bindParseResult(one, (tkns, o) => {
        return [
          ...go([...acc, o], tkns),
          // also have a result where the next token is NOT
          // considered a success
          ...returnParseResult(t, acc),
        ];
      });
    }
    return go([], tokens);
  };
  return r;
}

export function parserCombSucc2<A, B>(
  parsers: [Parser<A>, Parser<B>],
): Parser<[A, B]> {
  return function (
    tokens: Readonly<T.Token[]>,
    dictionary: T.DictionaryAPI,
  ): T.ParseResult<[A, B]>[] {
    return bindParseResult(parsers[0](tokens, dictionary), (t, a) =>
      bindParseResult(parsers[1](t, dictionary), (tk, b) =>
        returnParseResult(tk, [a, b]),
      ),
    );
  };
}

export function parserCombSucc3<A, B, C>(
  parsers: [Parser<A>, Parser<B>, Parser<C>],
): Parser<[A, B, C]> {
  return function (
    tokens: Readonly<T.Token[]>,
    dictionary: T.DictionaryAPI,
  ): T.ParseResult<[A, B, C]>[] {
    return bindParseResult(parsers[0](tokens, dictionary), (t, a) =>
      bindParseResult(parsers[1](t, dictionary), (tk, b) =>
        bindParseResult(parsers[2](tk, dictionary), (tkn, c) =>
          returnParseResult(tkn, [a, b, c]),
        ),
      ),
    );
  };
}

export function isCompleteResult<C extends object>(
  r: T.ParseResult<C>,
): boolean {
  return !r.tokens.length && !r.errors.length;
}

export function removeKeys(a: any): any {
  return JSON.parse(
    JSON.stringify(a, (k, v) =>
      k === "i" || k === "a" || k === "key" ? undefined : v,
    ),
  );
}

export function getPeople(
  person: 1 | 2 | 3,
  number: "sing" | "pl" | "both",
): T.Person[] {
  const people: T.Person[] =
    person === 1 ? [0, 1, 6, 7] : person === 2 ? [2, 3, 8, 9] : [4, 5, 10, 11];
  return number === "sing"
    ? people.filter((p) => p < 6)
    : number === "pl"
      ? people.filter((p) => p > 5)
      : people;
}

function addShrunkenPossesorNP(person: T.Person) {
  return (b: T.NPSelection): T.NPSelection => {
    if (b.selection.type === "pronoun") {
      throw new Error("Cannot add possessive on pronoun");
    }
    if (b.selection.possesor) {
      throw new Error("Cannot add possessive with existing possesor");
    }
    return {
      ...b,
      selection: {
        ...b.selection,
        possesor: {
          type: "possesor",
          shrunken: true,
          np: {
            type: "NP",
            selection: {
              type: "pronoun",
              distance: "far",
              person,
            },
          },
        },
      },
    };
  };
}

export function canTakeShrunkenPossesor(
  b: T.ParsedBlock | T.NPSelection,
): boolean {
  if (b.type === "NP") {
    if (!("selection" in b.selection)) {
      // base NP case;
      return b.selection.type !== "pronoun" && !b.selection.possesor;
    } else {
      return canTakeShrunkenPossesor(b.selection);
    }
  }
  if (b.type === "complement") {
    if (!("type" in b.selection)) {
      // TODO: will need to change this when we add sandwiches to adjectives
      return false;
    }
    if (b.selection.type === "NP") {
      return canTakeShrunkenPossesor(b.selection);
    }
    if (b.selection.type === "loc. adv.") {
      return false;
    }
    if (b.selection.type === "possesor") {
      return canTakeShrunkenPossesor(b.selection.np);
    }
    if (b.selection.type === "sandwich") {
      return canTakeShrunkenPossesor(b.selection.inside);
    }
    assertNever(b.selection, "unknown complement type");
  }
  if (b.type === "AP") {
    if (b.selection.type === "sandwich") {
      return canTakeShrunkenPossesor(b.selection.inside);
    }
    if (b.selection.type === "adverb") {
      return false;
    }
    assertNever(b.selection, "unknown AP type");
  }
  return false;
}

/**
 * adds a given possesor to a given block
 * these should be checked beforehand to see if the
 * the possesor can go there, so it will throw an
 * error if this is impossible
 */
export function addShrunkenPossesor(
  b: T.ParsedBlock,
  person: T.Person,
): T.ParsedBlock {
  const addOnNP = addShrunkenPossesorNP(person);
  if (b.type === "NP") {
    return {
      ...b,
      selection: addOnNP(b.selection),
    };
  }
  if (b.type === "AP") {
    if (b.selection.type === "adverb") {
      throw new Error("can't add possesor on adverb");
    }
    if (b.selection.type === "sandwich") {
      return {
        ...b,
        selection: {
          ...b.selection,
          inside: addOnNP(b.selection.inside),
        },
      };
    }
    assertNever(b.selection, "unknown AP type");
  }
  if (b.type === "complement") {
    if (!("type" in b.selection)) {
      // TODO: update when adjectives can get sandwiches
      throw new Error("can't add possesor on adjective");
    }
    if (b.selection.type === "NP") {
      return {
        ...b,
        selection: addOnNP(b.selection),
      };
    }
    if (b.selection.type === "loc. adv.") {
      throw new Error("can't add possesor on loc. adv.");
    }
    if (b.selection.type === "possesor") {
      if (b.selection.np.selection.type === "pronoun") {
        throw new Error("can't add possesor on pronoun");
      }
      return {
        ...b,
        selection: {
          ...b.selection,
          np: addOnNP(b.selection.np),
        },
      };
    }
    if (b.selection.type === "sandwich") {
      return {
        ...b,
        selection: {
          ...b.selection,
          inside: addOnNP(b.selection.inside),
        },
      };
    }
    assertNever(b.selection, "unknown complement type");
  }
  throw new Error(`Can't add possesive to ${b.type} block`);
}

export function getStatComp(
  compL: number | undefined,
  aux: { verb: T.VerbEntry; aspect: T.Aspect | undefined },
  dictionary: T.DictionaryAPI,
  checkSpace: boolean,
): T.VerbEntry[] {
  if (compL === undefined) {
    return [];
  }
  const trans = getTransitivities(aux.verb);
  return dictionary.verbEntryLookupByL(compL).filter(
    (x) =>
      getTransitivities(x).some((t) => trans.includes(t)) &&
      // make sure that if there's a distinct comp it's not one of the
      // compounds that are joined together. For example
      // مړه کېږم should not parse as مړېږم
      !(
        checkSpace &&
        aux.aspect === "imperfective" &&
        !x.entry.p.includes(" ")
      ),
  );
}

export function getTransitivities(v: T.VerbEntry): T.Transitivity[] {
  const transitivities: T.Transitivity[] = [];
  const opts = v.entry.c.split("/");
  opts.forEach((opt) => {
    if (opt.includes("gramm. trans")) {
      transitivities.push("grammatically transitive");
    } else if (opt.includes("intran")) {
      transitivities.push("intransitive");
    } else if (opt.includes("trans")) {
      transitivities.push("transitive");
    }
  });
  return transitivities;
}

export function isPH(b: T.ParsedBlock): b is T.ParsedPH {
  return b.type === "PH" || b.type === "CompPH";
}

export function isCompPH(b: T.ParsedBlock): b is T.ParsedCompPH {
  return b.type === "CompPH";
}

export function isOoPh(b: T.ParsedBlock): b is T.ParsedVerbPH {
  return b.type === "PH" && ["و", "وا"].includes(b.s);
}

export function isNonOoPh(b: T.ParsedBlock): b is T.ParsedVerbPH {
  return b.type === "PH" && !["و", "وا"].includes(b.s);
}

export function isParsedVBB(
  b: T.ParsedBlock,
): b is T.ParsedV<T.ParsedVBB> | T.ParsedVBBAux {
  if (b.type === "parsed vbb aux") {
    return true;
  }
  if (b.type !== "parsedV") {
    return false;
  }
  const info = getInfoFromV(b);
  return info.type === "verb" || info.type === "equative";
}

export function isParsedVBP(b: T.ParsedBlock): b is T.ParsedV<T.ParsedVBP> {
  if (b.type !== "parsedV") {
    return false;
  }
  const info = getInfoFromV(b);
  return info.type === "ppart" || info.type === "ability";
}
