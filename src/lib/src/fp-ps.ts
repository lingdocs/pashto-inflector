import { Eq, struct } from "fp-ts/Eq";
import { Semigroup } from "fp-ts/Semigroup";
import { Monoid } from "fp-ts/Monoid";
import * as S from "fp-ts/string";
import * as T from "../../types";

export const eqPsString: Eq<T.PsString> = struct({
  p: S.Eq,
  f: S.Eq,
});

export const eqPsStringWVars: Eq<T.PsString[]> = {
  equals: (x, y) => {
    return (
      x.length === y.length && x.every((a, i) => eqPsString.equals(a, y[i]))
    );
  },
};

export const semigroupPsStringWVars: Semigroup<T.PsString[]> = {
  concat: (x, y) =>
    x.flatMap((a) => y.map((b) => semigroupPsString.concat(a, b))),
};

export const semigroupPsString: Semigroup<T.PsString> = {
  concat: (x, y) => ({
    p: x.p + y.p,
    f: x.f + y.f,
  }),
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

export function fmapParseResult<A extends object, B extends object>(
  f: (x: A) => B,
  x: T.ParseResult<A>[]
): T.ParseResult<B>[] {
  return x.map<T.ParseResult<B>>((xi) => ({
    tokens: xi.tokens,
    body: f(xi.body),
    errors: xi.errors,
  }));
}

export function fmapSingleOrLengthOpts<A extends object, B extends object>(
  f: (x: A) => B,
  x: T.SingleOrLengthOpts<A>
): T.SingleOrLengthOpts<B> {
  if ("long" in x) {
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

export function mapInflections(
  f: (x: T.PsString) => T.PsString,
  inf: T.UnisexInflections
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
  [a, b]: T.VerbRenderedOutput
): T.VerbRenderedOutput {
  return [fmapVHead(a), fmapV(b)];
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
  function fmapV(v: [T.VB, T.VBE] | [T.VBE]): [T.VB, T.VBE] | [T.VBE] {
    return v.map(fmapVB) as [T.VB, T.VBE] | [T.VBE];
  }
  function fmapVB<V extends T.VB | T.VBE>(v: V): V {
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
