import * as T from "../../types";

export type Semigroup<X> = {
  concat: (x: X, y: X) => X;
};

export type Monoid<X> = {
  concat: Semigroup<X>["concat"];
  empty: X;
};

export type Eq<X> = {
  equals: (a: X, b: X) => boolean;
};

export const semigroupPsString: Semigroup<T.PsString> = {
  concat: (x: T.PsString, y: T.PsString) => ({
    p: x.p + y.p,
    f: x.f + y.f,
  }),
};

const semigroupPsStringWVars: Semigroup<T.PsString[]> = {
  concat: (x: T.PsString[], y: T.PsString[]) =>
    x.flatMap((a) => y.map((b) => semigroupPsString.concat(a, b))),
};

export const semigroupInflectionSet: Semigroup<T.InflectionSet> = {
  concat: (x, y) =>
    y.map((yy: T.ArrayOneOrMore<T.PsString>, i) =>
      concatAll(monoidPsStringWVars)([x[i], [{ p: " ", f: " " }], yy]),
    ) as T.ArrayFixed<T.ArrayOneOrMore<T.PsString>, 3>,
};

export const monoidInflectionSet: Monoid<T.InflectionSet> = {
  concat: semigroupInflectionSet.concat,
  empty: [[{ p: "", f: "" }], [{ p: "", f: "" }], [{ p: "", f: "" }]],
};

export const semigroupPluralInflectionSet: Semigroup<T.PluralInflectionSet> = {
  concat: (x, y) =>
    y.map((yy: T.ArrayOneOrMore<T.PsString>, i) =>
      concatAll(monoidPsStringWVars)([x[i], [{ p: " ", f: " " }], yy]),
    ) as T.ArrayFixed<T.ArrayOneOrMore<T.PsString>, 2>,
};

export const monoidPsString: Monoid<T.PsString> = {
  concat: semigroupPsString.concat,
  empty: {
    p: "",
    f: "",
  },
};

export const monoidPsStringWVars: Monoid<T.PsString[]> = {
  concat: semigroupPsStringWVars.concat,
  empty: [monoidPsString.empty],
};

export function concatAll<X>(monoid: Monoid<X>) {
  return function (arr: X[]): X {
    return arr.reduce((acc, curr) => monoid.concat(acc, curr), monoid.empty);
  };
}

export const eqPsString: Eq<T.PsString> = {
  equals: (a, b) => a.p === b.p && a.f === b.f,
};

export const eqPsStringWVars: Eq<T.PsString[]> = {
  equals: (x, y) => {
    return (
      x.length === y.length && x.every((a, i) => eqPsString.equals(a, y[i]))
    );
  },
};

export function fmapParseResult<A extends object, B extends object>(
  f: (x: A) => B,
  x: T.ParseResult<A>[],
): T.ParseResult<B>[] {
  return x.map<T.ParseResult<B>>((xi) => ({
    tokens: xi.tokens,
    body: f(xi.body),
    errors: xi.errors,
    position: xi.position,
  }));
}

export function fmapParseResultSing<A extends object, B extends object>(
  f: (x: A) => B,
  x: T.ParseResult<A>,
): T.ParseResult<B> {
  return {
    tokens: x.tokens,
    body: f(x.body),
    position: x.position,
    errors: x.errors,
  };
}

export function fFlatMapParseResult<A extends object, B extends object>(
  f: (x: A) => B[],
  x: T.ParseResult<A>[],
): T.ParseResult<B>[] {
  return x.flatMap<T.ParseResult<B>>((xi) => {
    const bodies = f(xi.body);
    return bodies.map((body) => ({
      tokens: xi.tokens,
      body,
      position: xi.position,
      errors: xi.errors,
    }));
  });
}

export function fmapSingleOrLengthOpts<A, B>(
  f: (x: A) => B,
  x: T.SingleOrLengthOpts<A>,
): T.SingleOrLengthOpts<B> {
  if (x && typeof x === "object" && "long" in x) {
    return {
      long: f(x.long),
      short: f(x.short),
      ...("mini" in x && x.mini
        ? {
            mini: f(x.mini),
          }
        : {}),
    };
  } else {
    return f(x);
  }
}

export function pureSingleOrLengthOpts<A>(a: A): T.SingleOrLengthOpts<A> {
  return a;
}

export function applyPsString(
  f:
    | {
        p: (x: string) => string;
      }
    | {
        f: (x: string) => string;
      }
    | {
        p: (x: string) => string;
        f: (x: string) => string;
      },
  x: T.PsString,
): T.PsString {
  if ("p" in f && "f" in f) {
    return {
      p: f.p(x.p),
      f: f.f(x.f),
    };
  }
  if ("p" in f) {
    return {
      p: f.p(x.p),
      f: x.f,
    };
  }
  return {
    p: x.p,
    f: f.f(x.f),
  };
}

export function mapGen<A, B>(f: (x: A) => B, x: A): B {
  return f(x);
}

/**
 * like and applicative <*> operator for SingleOrLengthOpts
 *
 * applies the appropriate length function for each type of given length, otherwise applies
 * the long version as the default
 *
 * allows us to put transformation functions in the SingleOrLengthOpts data structure
 * instead of
 */
export function applySingleOrLengthOpts<A, B>(
  f: T.SingleOrLengthOpts<(a: A) => B>,
  a: T.SingleOrLengthOpts<A>,
): T.SingleOrLengthOpts<B> {
  if (f && "long" in f) {
    if (a && typeof a === "object" && "long" in a) {
      return {
        long: fmapSingleOrLengthOpts(f.long, a.long) as B,
        short: fmapSingleOrLengthOpts(f.short, a.short) as B,
        ...(a.mini
          ? {
              mini: fmapSingleOrLengthOpts(f.mini || f.short, a.mini) as B,
            }
          : {}),
      };
    } else {
      return fmapSingleOrLengthOpts(f.long, a);
    }
  } else {
    return fmapSingleOrLengthOpts(f, a);
  }
}

export function mapInflections(
  f: (x: T.PsString) => T.PsString,
  inf: T.UnisexInflections,
): T.UnisexInflections {
  function handleSide(inf: T.InflectionSet): T.InflectionSet {
    return inf.map((x) => x.map(f)) as T.ArrayFixed<
      T.ArrayOneOrMore<T.PsString>,
      3
    >;
  }
  return {
    masc: handleSide(inf.masc),
    fem: handleSide(inf.fem),
  };
}

export function mapVerbRenderedOutput(
  f: (a: T.PsString) => T.PsString,
  [a, b]: T.VerbRenderedOutput,
): T.VerbRenderedOutput {
  return [fmapVHead(a), fmapVE(b)];
  function fmapVHead([v]: [T.VHead] | []): [T.VHead] | [] {
    if (v === undefined) {
      return [];
    }
    if (v.type === "PH") {
      return [
        {
          ...v,
          ps: f(v.ps),
        },
      ];
    }
    return [
      {
        ...v,
        comp: fmapComp(v.comp),
      },
    ];
  }
  function fmapComp(comp: T.Comp): T.Comp {
    return {
      ...comp,
      ps: f(comp.ps),
    };
  }
  function fmapVE(v: [T.VBP, T.VBE] | [T.VBE]): [T.VBP, T.VBE] | [T.VBE] {
    return v.map(fmapVB) as [T.VBP, T.VBE] | [T.VBE];
  }
  function fmapVB<V extends T.VB | T.VBE | T.VBP>(v: V): V {
    if (v.type === "welded") {
      return {
        ...v,
        left: fmapWeldedLeft(v.left),
        right: fmapVB(v.right),
      };
    }
    return {
      ...v,
      ps: fmapSingleOrLengthOpts((x) => x.map(f), v.ps),
    };
  }
  function fmapWeldedLeft(v: T.NComp | T.VBBasic | T.Welded) {
    if (v.type === "NComp") {
      return {
        ...v,
        comp: fmapComp(v.comp),
      };
    }
    return fmapVB(v);
  }
}

/**
 * a type predicate OR combinator
 */
export function orTp<A, B extends A, C extends A>(
  f: (x: A) => x is B,
  g: (x: A) => x is C,
): (x: A) => x is B | C {
  return (x: A) => f(x) || g(x);
}

/**
 * a type predicate AND combinator
 */
export function andTp<A, B extends A, C extends A>(
  f: (x: A) => x is B,
  g: (x: A) => x is C,
): (x: A) => x is B & C {
  return (x: A) => f(x) && g(x);
}

/**
 * a type predicate successive AND combinator
 * the second predicate is based on the first predicate
 * being true and narrows the type further
 */
export function andSuccTp<A, B extends A, C extends B>(
  f: (x: A) => x is B,
  g: (x: B) => x is C,
): (x: A) => x is B & C {
  return (x: A) => f(x) && g(x);
}
