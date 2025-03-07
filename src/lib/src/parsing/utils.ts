import * as T from "../../../types";

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
 * @param previous - the set of results (monad) to start with
 * @param f - a function that takes a remaining list of tokens and one body of the previous result
 * and returns the next set of possible results, optionally with an object containing any errors
 * @param getCritical - if needed, a function that returns with *part* of the result body to compare
 * for identical results while pruning out the unneccesary errors
 * @param ignorePrevious - pass in true if you don't need the previous ParseResult to calculate
 * the next one. This will add effeciancy by only caring about how many tokens are available
 * from the different previous results
 * @returns
 */
export function bindParseResult<C, D>(
  previous: T.ParseResult<C>[],
  f: (
    tokens: Readonly<T.Token[]>,
    r: C
  ) =>
    | T.ParseResult<D>[]
    | {
        errors: T.ParseError[];
        next: T.ParseResult<D>[];
      },
  ignorePrevious?: boolean
): T.ParseResult<D>[] {
  const prev = ignorePrevious
    ? (() => {
        const resArr: T.ParseResult<C>[] = [];
        previous.filter((item) => {
          const i = resArr.findIndex(
            (x) => x.tokens.length === item.tokens.length
          );
          if (i <= -1) {
            resArr.push(item);
          }
          return null;
        });
        return resArr;
      })()
    : previous;
  const nextPossibilities = prev.flatMap(({ tokens, body, errors }) => {
    const res = f(tokens, body);
    const { errors: errsPassed, next } = Array.isArray(res)
      ? { errors: [], next: res }
      : res;
    return next.map((x) => ({
      tokens: x.tokens,
      body: x.body,
      errors: [...errsPassed, ...x.errors, ...errors],
    }));
  });
  return cleanOutResults(nextPossibilities);
}

export function returnParseResults<D>(
  tokens: Readonly<T.Token[]>,
  body: D[],
  errors?: T.ParseError[]
): T.ParseResult<D>[] {
  return body.map<T.ParseResult<D>>((b) => ({
    tokens,
    body: b,
    errors: errors || [],
  }));
}

export function returnParseResultS<D>(
  tokens: Readonly<T.Token[]>,
  body: D,
  errors?: T.ParseError[]
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
  errors?: T.ParseError[]
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
  results: T.ParseResult<C>[]
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
  // @ts-expect-error - bc
  return Array.from(new Set(errorsCulled.map(JSON.stringify))).map(JSON.parse);
}

export type Parser<R> = (
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
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
    dictionary: T.DictionaryAPI
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
  parsers: [Parser<A>, Parser<B>]
): Parser<[A, B]> {
  return function (
    tokens: Readonly<T.Token[]>,
    dictionary: T.DictionaryAPI
  ): T.ParseResult<[A, B]>[] {
    return bindParseResult(parsers[0](tokens, dictionary), (t, a) =>
      bindParseResult(parsers[1](t, dictionary), (tk, b) =>
        returnParseResult(tk, [a, b])
      )
    );
  };
}

export function parserCombSucc3<A, B, C>(
  parsers: [Parser<A>, Parser<B>, Parser<C>]
): Parser<[A, B, C]> {
  return function (
    tokens: Readonly<T.Token[]>,
    dictionary: T.DictionaryAPI
  ): T.ParseResult<[A, B, C]>[] {
    return bindParseResult(parsers[0](tokens, dictionary), (t, a) =>
      bindParseResult(parsers[1](t, dictionary), (tk, b) =>
        bindParseResult(parsers[2](tk, dictionary), (tkn, c) =>
          returnParseResult(tkn, [a, b, c])
        )
      )
    );
  };
}

export function isCompleteResult<C extends object>(
  r: T.ParseResult<C>
): boolean {
  return !r.tokens.length && !r.errors.length;
}

export function removeKeys(a: any): any {
  return JSON.parse(
    JSON.stringify(a, (k, v) =>
      k === "i" || k === "a" || k === "key" ? undefined : v
    )
  );
}

export function getPeople(
  person: 1 | 2 | 3,
  number: "sing" | "pl" | "both"
): T.Person[] {
  const people: T.Person[] =
    person === 1 ? [0, 1, 6, 7] : person === 2 ? [2, 3, 8, 9] : [4, 5, 10, 11];
  return number === "sing"
    ? people.filter((p) => p < 6)
    : number === "pl"
    ? people.filter((p) => p > 5)
    : people;
}

export function isPH(b: T.ParsedBlock): b is T.ParsedPH {
  return b.type === "PH";
}

export function isNeg(b: T.ParsedBlock): b is T.NegativeBlock {
  return b.type === "negative";
}

export function isOoPh(b: T.ParsedBlock): b is T.ParsedPH {
  return b.type === "PH" && ["و", "وا"].includes(b.s);
}

export function isNonOoPh(b: T.ParsedBlock): b is T.ParsedPH {
  return b.type === "PH" && !["و", "وا"].includes(b.s);
}

export function isParsedVBP(b: T.ParsedBlock): b is T.ParsedVBP {
  return (
    (b.type === "VB" || b.type === "welded") &&
    (b.info.type === "ability" || b.info.type === "ppart")
  );
}

export function isParsedVBE(b: T.ParsedBlock): b is T.ParsedVBE {
  return (
    (b.type === "VB" || b.type === "welded") &&
    (b.info.type === "verb" || b.info.type === "equative")
  );
}

export function startsVerbSection(b: T.ParsedBlock): boolean {
  return (
    b.type === "PH" ||
    b.type === "VB" ||
    b.type === "welded" ||
    b.type === "negative"
  );
}

export function canTakeShrunkenPossesor(
  block: T.NPSelection | T.APSelection
): boolean {
  if (block.type === "NP") {
    return block.selection.type !== "pronoun" && !block.selection.possesor;
  }
  if (block.selection.type === "sandwich") {
    return canTakeShrunkenPossesor(block.selection.inside);
  }
  return false;
}

export function addShrunkenPossesor(
  b: T.NPSelection,
  person: T.Person
): T.NPSelection;
export function addShrunkenPossesor(
  b: T.APSelection,
  person: T.Person
): T.APSelection;
export function addShrunkenPossesor(
  b: T.NPSelection | T.APSelection,
  person: T.Person
): T.NPSelection | T.APSelection {
  if (b.selection.type === "adverb" || b.selection.type === "pronoun") {
    throw new Error("cannot add shrunken possesor");
  }
  if (b.type === "AP") {
    return {
      ...b,
      selection: {
        ...b.selection,
        inside: addShrunkenPossesor(b.selection.inside, person),
      },
    };
  }
  if (b.selection.possesor) {
    throw new Error("cannot add another possesor");
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
}

export function toParseError(message: string): T.ParseError {
  return { message };
}
