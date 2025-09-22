import * as T from "../../../types";
import { assertNever } from "../misc-helpers";

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
  f: (tokens: T.Tokens, r: T.WithPos<C>) => T.ParseResult<D>[],
): T.ParseResult<D>[] {
  // const grouped = groupByTokenLength(prev);
  // if (grouped.length > 1 || grouped.length === 0) {
  //   console.log({ grouped });
  // }
  // PERFECTION 🧪

  return cleanOutResults(
    prev.flatMap((p) =>
      f(p.tokens, { content: p.body, position: p.position }).map(
        addErrors(p.errors),
      ),
    ),
  );
}

export function bindParseResultDebug<C, D>(
  prev: T.ParseResult<C>[],
  f: (tokens: T.Tokens, r: T.WithPos<C>) => T.ParseResult<D>[],
): T.ParseResult<D>[] {
  // PERFECTION 🧪
  return cleanOutResultsDebug(
    // TODO: do the groupByTokenLengthHERE!
    prev.flatMap((p) =>
      f(p.tokens, { content: p.body, position: p.position }).map(
        addErrors(p.errors),
      ),
    ),
  );
}

export function bindParseWithAllErrors<C, D>(
  prev: T.ParseResult<C>[],
  f: (tokens: T.Tokens, r: T.WithPos<C>) => T.ParseResult<D>[],
): T.ParseResult<D>[] {
  // PERFECTION 🧪
  // TODO: Do we really need to remove duplicates ?? I don't think so
  return removeDuplicates(
    prev.flatMap((p) =>
      f(p.tokens, { content: p.body, position: p.position }).map(
        addErrors(p.errors),
      ),
    ),
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
// export function bindParseResultWParser<C, D, E>(
//   prev: T.ParseResult<C>[],
//   parser: (tokens: T.Tokens) => T.ParseResult<D>[],
//   f: (res: C, parsed: D, tokens: T.Tokens) => T.ParseResult<E>[],
// ): T.ParseResult<E>[] {
//   const grouped = groupByTokenLength(prev);
//   return cleanOutResults(
//     grouped.flatMap((group) => {
//       const parsed = cleanOutResults(parser(group[0].tokens));
//       // console.log(group.length);
//       // if (group.length > 1) {
//       //   console.log(`Saved ${group.length - 1} parses`);
//       // }
//       return group.flatMap((prev) => {
//         return parsed.flatMap((parse) =>
//           f(prev.body, parse.body, parse.tokens).map(
//             addErrors([...parse.errors, ...prev.errors]),
//           ),
//         );
//       });
//     }),
//   );
// }

export function addErrors<C>(errs: T.ParseError[]) {
  return function (pr: T.ParseResult<C>): T.ParseResult<C> {
    return {
      tokens: pr.tokens,
      body: pr.body,
      position: pr.position,
      errors: [...pr.errors, ...errs],
    };
  };
}

export function toParseError(message: string): T.ParseError {
  return { message };
}

// function groupByTokenLength<D>(
//   results: T.ParseResult<D>[],
// ): T.ParseResult<D>[][] {
//   const buckets: Record<number, T.ParseResult<D>[]> = {};
//   results.forEach((pr) => {
//     const l = pr.tokens.position;
//     if (!buckets[l]) {
//       buckets[l] = [pr];
//     } else {
//       buckets[l].push(pr);
//     }
//   });
//   return Object.values(buckets);
// }

export function returnParseResults<D>(
  tokens: T.Tokens,
  body: D[],
  position: T.ParseResultPosition,
  errors?: T.ParseError[],
): T.ParseResult<D>[] {
  return body.map<T.ParseResult<D>>((b) => ({
    tokens,
    body: b,
    position,
    errors: errors || [],
  }));
}

export function returnParseResultSingle<D>(
  tokens: T.Tokens,
  body: D,
  position: T.ParseResultPosition,
  errors?: T.ParseError[],
): T.ParseResult<D> {
  return {
    tokens,
    body,
    position,
    errors: errors || [],
  };
}

export function returnParseResult<D>(
  tokens: T.Tokens,
  body: D,
  position: T.ParseResultPosition,
  errors?: T.ParseError[],
): T.ParseResult<D>[] {
  return [
    {
      tokens,
      body,
      position,
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
  return Array.from(new Set(results.map(JSON.stringify))).map(JSON.parse); // eslint-disable-line
}

export type Parser<R> = (
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
) => T.ParseResult<R>[];

export function parserCombOr<R>(parsers: Parser<R>[]) {
  return (tokens: T.Tokens, dictionary: T.DictionaryAPI) =>
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

// TODO: the many components need to have position info here
// how do we do that ?   Parser<WithPos<R>[]>
// for succ              Parser<[WithPos<A>, WithPos<B>]>
export function parserCombMany<R>(parser: Parser<R>): Parser<T.WithPos<R>[]> {
  const r: Parser<T.WithPos<R>[]> = (
    tokens: T.Tokens,
    dictionary: T.DictionaryAPI,
  ) => {
    function go(
      acc: T.WithPos<R>[],
      t: T.Tokens,
    ): T.ParseResult<T.WithPos<R>[]>[] {
      const one = parser(t, dictionary);
      if (one.length === 0) {
        const position = posFromAccumulator(t, acc);
        return returnParseResult(t, acc, position);
      }
      return bindParseResult(one, (tkns, o) => {
        const position = posFromAccumulator(tkns, acc);
        return [
          ...go([...acc, o], tkns),
          // also have a result where the next token is NOT
          // considered a success
          ...returnParseResult(t, acc, position),
        ];
      });
    }
    return go([], tokens);
  };
  return r;
}

export function nulPosFromTokens(t: T.Tokens): T.ParseResultPosition {
  return { start: t.position, end: t.position };
}

export function posFromAccumulator<R>(
  t: T.Tokens,
  acc: T.WithPos<R>[],
): T.ParseResultPosition {
  const start = acc.length ? acc[0].position.start : t.position;
  const end = acc.length ? acc.at(-1)!.position.end : t.position;
  return { start, end };
}

export function parserCombSucc2<A, B>(
  parsers: [Parser<A>, Parser<B>],
): Parser<[T.WithPos<A>, T.WithPos<B>]> {
  return function (
    tokens: T.Tokens,
    dictionary: T.DictionaryAPI,
  ): T.ParseResult<[T.WithPos<A>, T.WithPos<B>]>[] {
    // TODO WITH GROUPING HERE!
    // const res1 = parsers[0](tokens, dictionary);
    // const groups = groupByTokenLength(res1).map((group) => {
    //   const tokens2 = group[0].tokens;
    //   const restParsed = parsers[1](tokens2, dictionary);
    //   const mmm = group.map((resA) =>
    //     bindParseResult(resA, (tokens3, a) =>
    //       returnParseResult(tokens3, [a.body, b], {
    //         start: a.position.start,
    //         end: b.position.end,
    //       }),
    //     ),
    //   );
    // });

    return bindParseResult(parsers[0](tokens, dictionary), (t, a) =>
      bindParseResult(parsers[1](t, dictionary), (tk, b) =>
        returnParseResult(tk, [a, b], {
          start: a.position.start,
          end: b.position.end,
        }),
      ),
    );
  };
}

// export function bindParseResultWParser<C, D, E>(
//   prev: T.ParseResult<C>[],
//   parser: (tokens: T.Tokens) => T.ParseResult<D>[],
//   f: (res: C, parsed: D, tokens: T.Tokens) => T.ParseResult<E>[],
// ): T.ParseResult<E>[] {
//   const grouped = groupByTokenLength(prev);
//   return cleanOutResults(
//     grouped.flatMap((group) => {
//       const parsed = cleanOutResults(parser(group[0].tokens));
//       // console.log(group.length);
//       // if (group.length > 1) {
//       //   console.log(`Saved ${group.length - 1} parses`);
//       // }
//       return group.flatMap((prev) => {
//         return parsed.flatMap((parse) =>
//           f(prev.body, parse.body, parse.tokens).map(
//             addErrors([...parse.errors, ...prev.errors]),
//           ),
//         );
//       });
//     }),
//   );
// }

// export function parserCombSucc3<A, B, C>(
//   parsers: [Parser<A>, Parser<B>, Parser<C>],
// ): Parser<[A, B, C]> {
//   return function (
//     tokens: T.Tokens,
//     dictionary: T.DictionaryAPI,
//   ): T.ParseResult<[A, B, C]>[] {
//     return bindParseResult(parsers[0](tokens, dictionary), (t, a) =>
//       bindParseResult(parsers[1](t, dictionary), (tk, b) =>
//         bindParseResult(parsers[2](tk, dictionary), (tkn, c) =>
//           returnParseResult(tkn, [a, b, c]),
//         ),
//       ),
//     );
//   };
// }

export function isCompleteResult<C extends object>(
  r: T.ParseResult<C>,
): boolean {
  return !tokensExist(r.tokens) && !r.errors.length;
}

export function removeKeys(a: any): any {
  return JSON.parse(
    JSON.stringify(
      a,
      (k, v) => (k === "i" || k === "a" || k === "key" ? undefined : v), // eslint-disable-line
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
    ? people.filter((p) => p < T.Person.FirstPlurMale)
    : number === "pl"
      ? people.filter((p) => p > T.Person.ThirdSingFemale)
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
  return dictionary
    .verbEntryLookupByL(compL)
    .filter(
      (x) =>
        getTransitivities(x).some((t) => trans.includes(t)) &&
        !(
          checkSpace &&
          aux.aspect === "imperfective" &&
          ![" کېدل", " کول"].some((e) => x.entry.p.endsWith(e))
        ),
    );
  // make sure that if there's a distinct comp it's not one of the
  // compounds that are joined together. For example
  // مړه کېږم should not parse as مړېږم
  // !(
  //   checkSpace &&
  //   aux.aspect === "imperfective" &&
  //   !x.entry.p.includes(" ")
  // ),
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

export function tokensExist(tokens: T.Tokens): boolean {
  return tokens.position < tokens.tokens.length;
}

export function getOneToken(
  tokens: T.Tokens,
):
  | [T.Token, T.Tokens, T.ParseResultPosition]
  | [undefined, undefined, undefined] {
  if (!tokensExist(tokens)) {
    return [undefined, undefined, undefined];
  }
  const first = tokens.tokens[tokens.position];
  const rest: T.Tokens = {
    tokens: tokens.tokens,
    position: tokens.position + 1,
  };
  return [first, rest, { start: tokens.position, end: tokens.position + 1 }];
}

export function getTwoTokens(
  tokens: T.Tokens,
): [T.Token, T.Token, T.Tokens] | [undefined, undefined, undefined] {
  if (tokens.position >= tokens.tokens.length - 1) {
    return [undefined, undefined, undefined];
  }
  const first = tokens.tokens[tokens.position];
  const second = tokens.tokens[tokens.position + 1];
  const rest: T.Tokens = {
    tokens: tokens.tokens,
    position: tokens.position + 2,
  };
  return [first, second, rest];
}
