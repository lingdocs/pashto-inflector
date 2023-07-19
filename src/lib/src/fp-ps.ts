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
