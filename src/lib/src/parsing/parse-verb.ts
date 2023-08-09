import * as T from "../../../types";

export function parseVerb(
  tokens: Readonly<T.Token[]>,
  verbLookup: (s: string) => T.VerbEntry[]
): T.ParseResult<Omit<T.VBE, "ps">>[] {
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
): Omit<T.VBE, "ps">[] {
  const w: Omit<T.VBE, "ps">[] = [];
  const base = s.endsWith("ل") ? s : s.slice(0, -1);
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
      perfective: entries.filter(({ entry: e }) => {
        if (e.c.includes("comp")) {
          return false;
        }
        if (e.ssp) {
          const bSep = e.separationAtP ? e.ssp.slice(e.separationAtP) : "";
          return bSep === base || e.ssp === base;
        }
        if (e.psp) {
          const bSep = e.separationAtP ? e.psp.slice(e.separationAtP) : "";
          return bSep === base || e.psp === base;
        }
        if (e.c.includes("intrans.")) {
          const miniRoot = e.p.slice(0, -3);
          return miniRoot + "ېږ" === base || miniRoot === base;
        } else {
          return e.p.slice(0, -1) === base;
        }
      }),
    };
    Object.entries(stemMatches).forEach(([aspect, entries]) => {
      entries.forEach((verb) => {
        people.stem.forEach((person) => {
          w.push({
            type: "VB",
            person,
            info: {
              type: "verb",
              aspect: aspect as T.Aspect,
              base: "stem",
              verb: verb,
            },
          });
        });
      });
    });
  }
  if (people.root.length) {
    const rootMatches = {
      imperfective: entries.filter(
        ({ entry: e }) =>
          !e.c.includes("comp") &&
          (base === e.p || (!s.endsWith("ل") && base === e.p.slice(0, -1)))
      ),
      perfective: entries.filter(({ entry: e }) => {
        if (e.c.includes("comp")) {
          return false;
        }
        if (e.separationAtP) {
          const bSep = e.p.slice(e.separationAtP);
          return (
            base === bSep ||
            base === e.p ||
            (!s.endsWith("ل") &&
              (base === e.p.slice(0, -1) || base === bSep.slice(0, -1)))
          );
        } else {
          // TODO: perfective roots are so rare could optimize this with a couple of checks?
          return e.prp
            ? e.prp === base || e.prp.slice(0, -1) === base
            : base === e.p || (!s.endsWith("ل") && base === e.p.slice(0, -1));
        }
      }),
    };
    Object.entries(rootMatches).forEach(([aspect, entries]) => {
      entries.forEach((verb) => {
        people.root.forEach((person) => {
          w.push({
            type: "VB",
            person,
            info: {
              type: "verb",
              aspect: aspect as T.Aspect,
              base: "root",
              verb: verb,
            },
          });
        });
      });
    });
  }
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
