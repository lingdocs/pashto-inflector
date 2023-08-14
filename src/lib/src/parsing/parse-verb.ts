import * as T from "../../../types";
import { isInVarients } from "../p-text-helpers";

// third persion idosyncratic
// if it ends in a dental or ه - look for tttp
//
// if not having tttp
// automatic things: (with blank or u)
//  ېد ست ښت
// ښود
//
// ول - اوه

// وېشه ?

// test ګالو ❌ vs ګاللو ✅

// واخیست / واخیسته / واخیستلو
// ولید // ولیده // ولیدو
//
//  ووت  / واته
//
// also write the rules for the third pers sing endings in the grammar
// multiple third pers sing options

export function parseVerb(
  tokens: Readonly<T.Token[]>,
  verbLookup: (s: string) => T.VerbEntry[]
): T.ParseResult<[{ type: "PH"; s: string } | undefined, Omit<T.VBE, "ps">]>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const people = getVerbEnding(first.s);
  // TODO: can optimize this to not have to look for possible stems/roots if none
  const verbs = verbLookup(first.s);
  return matchVerbs(first.s, verbs, people).map((body) => ({
    tokens: rest,
    body,
    errors: [],
  }));
}

function matchVerbs(
  s: string,
  entries: T.VerbEntry[],
  people: {
    root: T.Person[];
    stem: T.Person[];
  }
): [{ type: "PH"; s: string } | undefined, Omit<T.VBE, "ps">][] {
  const w: ReturnType<typeof matchVerbs> = [];
  const lEnding = s.endsWith("ل");
  const base = s.endsWith("ل") ? s : s.slice(0, -1);
  const matchShortOrLong = (b: string, x: string) => {
    return b === x || (!lEnding && b === x.slice(0, -1));
  };
  if (people.stem.length) {
    const stemMatches = {
      imperfective: entries.filter(({ entry: e }) => {
        if (e.c.includes("comp")) {
          return false;
        }
        if (e.psp) {
          return e.psp === base;
        }
        if (e.c.includes("intrans.")) {
          const miniRoot = e.p.slice(0, -3);
          return miniRoot + "ېږ" === base || miniRoot === base;
        } else {
          return e.p.slice(0, -1) === base;
        }
      }),
      perfective: entries.reduce<
        { ph: string | undefined; entry: T.VerbEntry }[]
      >((acc, entry) => {
        const e = entry.entry;
        if (e.c.includes("comp")) {
          return acc;
        }
        if (e.ssp) {
          const bRest = e.separationAtP ? e.ssp.slice(e.separationAtP) : "";
          if (bRest === base) {
            return [
              ...acc,
              {
                ph: undefined,
                entry,
              },
            ];
          }
          if (e.ssp === base) {
            return [
              ...acc,
              {
                ph: e.separationAtF
                  ? e.ssp.slice(0, e.separationAtP)
                  : undefined,
                entry,
              },
            ];
          }
        } else if (e.psp) {
          const bRest = e.separationAtP ? e.psp.slice(e.separationAtP) : "";
          if (bRest === base) {
            return [
              ...acc,
              {
                ph: undefined,
                entry,
              },
            ];
          }
          if (e.psp === base && e.separationAtP) {
            return [
              ...acc,
              {
                ph: e.psp.slice(0, e.separationAtP),
                entry,
              },
            ];
          }
          if ((base.startsWith("و") && base.slice(1)) === e.psp) {
            return [
              ...acc,
              {
                ph: "و",
                entry,
              },
            ];
          }
          if (base === e.psp) {
            return [
              ...acc,
              {
                ph: undefined,
                entry,
              },
            ];
          }
        } else if (e.c.includes("intrans.")) {
          const miniRoot = e.p.slice(0, -3);
          const miniRootEg = miniRoot + "ېږ";
          if ([miniRoot, miniRootEg].includes(base)) {
            return [
              ...acc,
              {
                ph: undefined,
                entry,
              },
            ];
          } else if (
            base.startsWith("و") &&
            [miniRoot, miniRootEg].includes(base.slice(1))
          ) {
            return [
              ...acc,
              {
                ph: "و", // TODO: check for وا etc
                entry,
              },
            ];
          }
        } else {
          const eb = e.p.slice(0, -1);
          if (eb === base) {
            return [
              ...acc,
              {
                ph: undefined,
                entry,
              },
            ];
          } else if (base.startsWith("و") && eb === base.slice(1)) {
            return [
              ...acc,
              {
                ph: "و",
                entry,
              },
            ];
          }
        }
        return acc;
      }, []),
    };
    Object.entries(stemMatches).forEach(([aspect, entries]) => {
      entries.forEach((verb) => {
        people.stem.forEach((person) => {
          w.push([
            "ph" in verb && verb.ph ? { type: "PH", s: verb.ph } : undefined,
            {
              type: "VB",
              person,
              info: {
                type: "verb",
                aspect: aspect as T.Aspect,
                base: "stem",
                verb: "ph" in verb ? verb.entry : verb,
              },
            },
          ]);
        });
      });
    });
  }
  if (people.root.length) {
    const rootMatches = {
      imperfective: entries.filter(
        ({ entry: e }) => !e.c.includes("comp") && matchShortOrLong(base, e.p)
      ),
      perfective: entries.reduce<
        { ph: string | undefined; entry: T.VerbEntry }[]
      >((acc, entry) => {
        const e = entry.entry;
        if (e.c.includes("comp")) {
          return acc;
        }
        if (e.separationAtP) {
          const b = e.prp || e.p;
          const bHead = b.slice(0, e.separationAtP);
          const bRest = b.slice(e.separationAtP);
          if (matchShortOrLong(base, b)) {
            return [
              ...acc,
              {
                ph: bHead,
                entry,
              },
            ];
          } else if (matchShortOrLong(base, bRest)) {
            return [
              ...acc,
              {
                ph: undefined,
                entry,
              },
            ];
          }
        } else if (!e.prp) {
          const baseNoOo = base.startsWith("و") && base.slice(1);
          if (baseNoOo && matchShortOrLong(baseNoOo, e.p)) {
            return [
              ...acc,
              {
                ph: "و",
                entry,
              },
            ];
          } else if (matchShortOrLong(base, e.p)) {
            return [
              ...acc,
              {
                ph: undefined,
                entry,
              },
            ];
          }
        }
        return acc;
      }, []),
    };

    Object.entries(rootMatches).forEach(([aspect, entries]) => {
      entries.forEach((verb) => {
        people.root.forEach((person) => {
          w.push([
            "ph" in verb && verb.ph ? { type: "PH", s: verb.ph } : undefined,
            {
              type: "VB",
              person,
              info: {
                type: "verb",
                aspect: aspect as T.Aspect,
                base: "root",
                verb: "ph" in verb ? verb.entry : verb,
              },
            },
          ]);
        });
      });
    });
  }
  const hamzaEnd = s.endsWith("ه");
  const tppMatches = {
    imperfective: entries.filter(
      ({ entry: e }) =>
        !e.c.includes("comp") &&
        (isInVarients(e.tppp, s) || (hamzaEnd && base === e.p.slice(0, -1)))
    ),
    perfective: entries.reduce<
      { ph: string | undefined; entry: T.VerbEntry }[]
    >((acc, entry) => {
      const e = entry.entry;
      if (e.c.includes("comp")) {
        return acc;
      }
      if (e.separationAtP && hamzaEnd) {
        const b = e.prp || e.p;
        const bHead = b.slice(0, e.separationAtP);
        const bRest = b.slice(e.separationAtP);
        // this is REPETITIVE from above ... but doing it again here because the ه will only match on the SHORT versions for 3rd pers masc sing
        // could modify and reuse the code above for this
        if (base === b.slice(0, -1)) {
          return [
            ...acc,
            {
              ph: bHead,
              entry,
            },
          ];
        }
        if (base === bRest.slice(0, -1)) {
          return [
            ...acc,
            {
              ph: undefined,
              entry,
            },
          ];
        }
      } else if (!e.prp && hamzaEnd) {
        const baseNoOo = base.startsWith("و") && base.slice(1);
        if (baseNoOo && baseNoOo === e.p.slice(0, -1)) {
          return [
            ...acc,
            {
              ph: "و",
              entry,
            },
          ];
        } else if (base === e.p.slice(0, -1)) {
          return [
            ...acc,
            {
              ph: undefined,
              entry,
            },
          ];
        }
      }
      const sNoOo = s.startsWith("و") && s.slice(1);
      if (isInVarients(e.tppp, sNoOo)) {
        return [
          ...acc,
          {
            ph: "و",
            entry,
          },
        ];
      } else if (isInVarients(e.tppp, s)) {
        return [
          ...acc,
          {
            ph: undefined,
            entry,
          },
        ];
      }
      return acc;
    }, []),
  };
  Object.entries(tppMatches).forEach(([aspect, entries]) => {
    entries.forEach((verb) => {
      w.push([
        "ph" in verb && verb.ph ? { type: "PH", s: verb.ph } : undefined,
        {
          type: "VB",
          person: T.Person.ThirdSingMale,
          info: {
            type: "verb",
            aspect: aspect as T.Aspect,
            base: "root",
            verb: "ph" in verb ? verb.entry : verb,
          },
        },
      ]);
    });
  });
  return w;
}

function getVerbEnding(p: string): {
  root: T.Person[];
  stem: T.Person[];
} {
  if (p.endsWith("م")) {
    return {
      root: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
      stem: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
    };
  } else if (p.endsWith("ې")) {
    return {
      root: [
        T.Person.SecondSingMale,
        T.Person.SecondSingFemale,
        T.Person.ThirdPlurFemale,
      ],
      stem: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
    };
  } else if (p.endsWith("ي")) {
    return {
      stem: [
        T.Person.ThirdSingMale,
        T.Person.ThirdSingFemale,
        T.Person.ThirdPlurMale,
        T.Person.ThirdPlurFemale,
      ],
      root: [],
    };
  } else if (p.endsWith("و")) {
    return {
      root: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
      stem: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
    };
  } else if (p.endsWith("ئ")) {
    return {
      root: [T.Person.SecondPlurMale, T.Person.SecondPlurFemale],
      stem: [T.Person.SecondPlurMale, T.Person.SecondPlurFemale],
    };
  } else if (p.endsWith("ه")) {
    return {
      root: [T.Person.ThirdSingFemale],
      stem: [],
    };
  } else if (p.endsWith("ل")) {
    return {
      root: [T.Person.ThirdPlurMale],
      stem: [],
    };
  }
  return {
    root: [],
    stem: [],
  };
}
