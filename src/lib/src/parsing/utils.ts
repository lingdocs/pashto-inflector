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
          var i = resArr.findIndex(
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
  for (let a of results) {
    if (a.errors.length < min) {
      min = a.errors.length;
    }
  }
  const errorsCulled = results.filter((x) => x.errors.length === min);
  // @ts-ignore
  return Array.from(new Set(errorsCulled.map(JSON.stringify))).map(JSON.parse);
}

export function isCompleteResult<C extends object>(
  r: T.ParseResult<C>
): boolean {
  return !r.tokens.length && !r.errors.length;
}

export function removeKeys(a: any): any {
  return JSON.parse(
    JSON.stringify(a, (k, v) => (k === "i" || k === "key" ? undefined : v))
  );
}
