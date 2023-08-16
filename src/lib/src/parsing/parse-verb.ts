import * as T from "../../../types";
import { removeFVarientsFromVerb } from "../accent-and-ps-utils";
import { isInVarients, lastVowelNotA } from "../p-text-helpers";
import {
  dartlul,
  kedulDyn,
  kedulStat,
  raatlul,
  tlul,
  wartlul,
} from "./irreg-verbs";

// big problem ما سړی یوړ crashes it !!

export function parseVerb(
  tokens: Readonly<T.Token[]>,
  verbLookup: (s: string) => T.VerbEntry[]
): T.ParseResult<[{ type: "PH"; s: string } | undefined, Omit<T.VBE, "ps">]>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const irregResults = parseIrregularVerb(first.s);
  if (irregResults.length) {
    return irregResults.map((body) => ({
      tokens: rest,
      body,
      errors: [],
    }));
  }
  const people = getVerbEnding(first.s);
  // First do rough verb lookup, grab wide pool of possible verbs (low searching complexity for fast lookup)
  // TODO: can optimize this to not have to look for possible stems/roots if none
  const verbs = verbLookup(first.s);
  // if (first.s === "سم") {
  //   console.log({ verbs: JSON.stringify(verbs) });
  // }
  // Then find out which ones match exactly and how
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
        const baseWAa = "ا" + base;
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
          if (!e.sepOo) {
            if (base.startsWith("وا") && base.slice(1) === e.psp) {
              return [
                ...acc,
                {
                  ph: "وا",
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
            if (baseWAa === e.psp) {
              return [
                ...acc,
                {
                  ph: undefined,
                  entry,
                },
              ];
            }
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
          } else if (!e.sepOo) {
            if (
              base.startsWith("وا") &&
              [miniRoot, miniRootEg].includes(base.slice(1))
            ) {
              return [
                ...acc,
                {
                  ph: "وا",
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
                  ph: "و",
                  entry,
                },
              ];
            }
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
          } else if (!e.sepOo) {
            if (base.startsWith("وا") && eb === base.slice(1)) {
              return [
                ...acc,
                {
                  ph: "وا",
                  entry,
                },
              ];
            }
            if (base.startsWith("و") && eb === base.slice(1)) {
              return [
                ...acc,
                {
                  ph: "و",
                  entry,
                },
              ];
            }
            if (baseWAa === base.slice(1)) {
              return [
                ...acc,
                {
                  ph: undefined,
                  entry,
                },
              ];
            }
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
                verb: "ph" in verb ? removeFVarientsFromVerb(verb.entry) : verb,
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
        } else {
          const baseNoOo = base.startsWith("و") && base.slice(1);
          const p = e.prp || e.p;
          if (baseNoOo && matchShortOrLong(baseNoOo, p)) {
            return [
              ...acc,
              {
                ph: !e.sepOo && e.p.at(0) === "ا" ? "وا" : "و",
                entry,
              },
            ];
          } else if (
            matchShortOrLong(base, p) ||
            matchShortOrLong("ا" + base, p)
          ) {
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
                verb: "ph" in verb ? removeFVarientsFromVerb(verb.entry) : verb,
              },
            },
          ]);
        });
      });
    });
  }
  const hamzaEnd = s.at(-1) === "ه";
  const oEnd = s.at(-1) === "و";
  const abruptEnd = ["د", "ت", "ړ"].includes(s.slice(-1));
  const b = hamzaEnd || oEnd ? base : s;
  const bNoOo = b.startsWith("و") && b.slice(1);
  const tppMatches = {
    imperfective: entries.filter(
      ({ entry: e }) =>
        !e.c.includes("comp") &&
        (isInVarients(e.tppp, s) ||
          (oEnd && [e.p, e.p.slice(0, -1)].includes(base)) ||
          (lastVowelNotA(e.g.slice(0, -2)) &&
            (hamzaEnd ? base : abruptEnd ? s : "") === e.p.slice(0, -1)))
      // TODO: if check for modified aaXu thing!
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
        if (bRest === "شول") {
          return acc;
        }
        if (abruptEnd) {
          if (s === b.slice(0, -1)) {
            return [
              ...acc,
              {
                ph: bHead,
                entry,
              },
            ];
          }
          if (s === bRest.slice(0, -1)) {
            return [
              ...acc,
              {
                ph: undefined,
                entry,
              },
            ];
          }
        } else if (hamzaEnd) {
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
        } else if (oEnd) {
          if ([b, b.slice(0, -1)].includes(base)) {
            return [
              ...acc,
              {
                ph: bHead,
                entry,
              },
            ];
          }
          if ([bRest, bRest.slice(0, -1)].includes(base)) {
            return [
              ...acc,
              {
                ph: undefined,
                entry,
              },
            ];
          }
        }
      } else if (!e.prp) {
        if (oEnd) {
          if (bNoOo && [e.p, e.p.slice(0, -1).includes(bNoOo)]) {
            return [
              ...acc,
              {
                ph: "و",
                entry,
              },
            ];
          } else if ([e.p, e.p.slice(0, -1)].includes(base)) {
            return [
              ...acc,
              {
                ph: undefined,
                entry,
              },
            ];
          }
        } else if ((hamzaEnd || abruptEnd) && lastVowelNotA(e.g.slice(0, -2))) {
          const b = hamzaEnd ? base : s;
          const p = e.p.slice(0, -1);
          if (bNoOo && bNoOo === p) {
            return [
              ...acc,
              {
                ph: "و",
                entry,
              },
            ];
          } else if (b === p) {
            return [
              ...acc,
              {
                ph: undefined,
                entry,
              },
            ];
          }
        }
      }
      const sNoOo = s.startsWith("و") && s.slice(1);
      if (isInVarients(e.tppp, sNoOo)) {
        return [
          ...acc,
          {
            ph: !e.sepOo && e.p.at(0) === "ا" ? "وا" : "و",
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
      } else if (isInVarients(e.tppp, "ا" + s)) {
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
            verb: "ph" in verb ? removeFVarientsFromVerb(verb.entry) : verb,
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

// const [ph, rest]: [T.PH | undefined, T.PsString] = v.entry.noOo
//   ? [undefined, base]
//   : v.entry.sepOo
//   ? [{ type: "PH", ps: { p: "و ", f: "óo`" } }, base]
//   : ["آ", "ا"].includes(base.p.charAt(0)) && base.f.charAt(0) === "a"
//   ? [{ type: "PH", ps: { p: "وا", f: "wáa" } }, removeAStart(base)]
//   : ["óo", "oo"].includes(base.f.slice(0, 2))
//   ? [{ type: "PH", ps: { p: "و", f: "wÚ" } }, base]
//   : ["ée", "ee"].includes(base.f.slice(0, 2)) && base.p.slice(0, 2) === "ای"
//   ? [
//       { type: "PH", ps: { p: "وي", f: "wée" } },
//       {
//         p: base.p.slice(2),
//         f: base.f.slice(2),
//       },
//     ]
//   : ["é", "e"].includes(base.f.slice(0, 2)) && base.p.slice(0, 2) === "اې"
//   ? [
//       { type: "PH", ps: { p: "وي", f: "wé" } },
//       {
//         p: base.p.slice(2),
//         f: base.f.slice(1),
//       },
//     ]
//   : ["ó", "o"].includes(base.f[0]) && base.p.slice(0, 2) === "او"
//   ? [{ type: "PH", ps: { p: "و", f: "óo`" } }, base]
//   : [{ type: "PH", ps: { p: "و", f: "óo" } }, base];
// return [ph, removeAccents(rest)];
// function removeAStart(ps: T.PsString) {
//   return {
//     p: ps.p.slice(1),
//     f: ps.f.slice(ps.f[1] === "a" ? 2 : 1),
//   };
// }

// TODO: could handle all sh- verbs for efficiencies sake
function parseIrregularVerb(
  s: string
): [{ type: "PH"; s: string } | undefined, Omit<T.VBE, "ps">][] {
  if (["ته", "راته", "ورته", "درته"].includes(s)) {
    return [
      [
        undefined,
        {
          type: "VB",
          info: {
            aspect: "imperfective",
            base: "root",
            type: "verb",
            verb: s.startsWith("را")
              ? raatlul
              : s.startsWith("ور")
              ? wartlul
              : s.startsWith("در")
              ? dartlul
              : tlul,
          },
          person: T.Person.ThirdSingMale,
        },
      ],
    ];
  }
  if (s === "شو") {
    return [
      ...[
        T.Person.ThirdSingMale,
        T.Person.FirstPlurMale,
        T.Person.FirstPlurFemale,
      ].flatMap((person) =>
        [kedulStat, kedulDyn].map<
          [{ type: "PH"; s: string } | undefined, Omit<T.VBE, "ps">]
        >((verb) => [
          undefined,
          {
            type: "VB",
            info: {
              aspect: "perfective",
              base: "root",
              type: "verb",
              verb,
            },
            person,
          },
        ])
      ),
      ...[T.Person.FirstPlurMale, T.Person.FirstPlurFemale].flatMap((person) =>
        [kedulStat, kedulDyn].map<
          [{ type: "PH"; s: string } | undefined, Omit<T.VBE, "ps">]
        >((verb) => [
          undefined,
          {
            type: "VB",
            info: {
              aspect: "perfective",
              base: "stem",
              type: "verb",
              verb,
            },
            person,
          },
        ])
      ),
    ];
  }
  return [];
}
