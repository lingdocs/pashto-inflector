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
import { LookupFunction } from "./lookup";
import { shortVerbEndConsonant } from "./misc";

// TODO: کول verbs!
// check that aawu stuff is working
// check oo`azmooy -
// check څاته
// laaRa shum etc

// TODO: هغه لاړ

export function parseVerb(
  tokens: Readonly<T.Token[]>,
  lookup: LookupFunction
): T.ParseResult<T.ParsedVBE>[] {
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
  const ending = first.s.at(-1) || "";
  const people = getVerbEnding(ending);
  const imperativePeople = getImperativeVerbEnding(ending);
  // First do rough verb lookup, grab wide pool of possible verbs (low searching complexity for fast lookup)
  // TODO: can optimize this to not have to look for possible stems/roots if none
  const verbs = lookup(first.s, "verb");
  // if (first.s === "سم") {
  //   console.log({ verbs: JSON.stringify(verbs) });
  // }
  // Then find out which ones match exactly and how
  return matchVerbs(first.s, verbs, people, imperativePeople).map((body) => ({
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
  },
  imperativePeople: T.Person[]
): T.ParsedVBE[] {
  const w: T.ParsedVBE[] = [];
  const lEnding = s.endsWith("ل");
  const base = s.endsWith("ل") ? s : s.slice(0, -1);
  const matchShortOrLong = (b: string, x: string) => {
    return b === x || (!lEnding && b === x.slice(0, -1));
  };
  if (people.stem.length || imperativePeople.length) {
    const stemMatches = {
      imperfective: entries.filter(({ entry: e }) => {
        if (e.c.includes("comp")) {
          return false;
        }
        if (e.psp) {
          return e.psp === base;
        }
        if (e.c.includes("intrans.")) {
          const miniRoot = e.p !== "کېدل" && e.p.slice(0, -3);
          return miniRoot + "ېږ" === base || miniRoot === base;
        } else {
          return e.p.slice(0, -1) === base;
        }
      }),
      perfective: entries.reduce<T.VerbEntry[]>((acc, entry) => {
        const e = entry.entry;
        const baseWAa = "ا" + base;
        if (e.c.includes("comp")) {
          return acc;
        }
        if (e.ssp) {
          if (e.separationAtP) {
            const bRest = e.ssp.slice(e.separationAtP);
            if (bRest === base) {
              return [...acc, entry];
            }
          } else {
            if (e.ssp === base) {
              return [...acc, entry];
            }
          }
        } else if (e.psp) {
          if (hasBreakawayAlef(e) && startsWithAleph(base)) {
            return acc;
          }
          if (e.separationAtP) {
            const bRest = e.psp.slice(e.separationAtP);
            if (bRest === base) {
              return [...acc, entry];
            }
          } else {
            if (!e.sepOo) {
              if (baseWAa === e.psp) {
                return [...acc, entry];
              }
            }
            if (base === e.psp) {
              return [...acc, entry];
            }
          }
        } else if (hasBreakawayAlef(e) && startsWithAleph(base)) {
          return acc;
        } else if (e.c.includes("intrans.")) {
          const miniRoot = e.p !== "کېدل" && e.p.slice(0, -3);
          const miniRootEg = miniRoot + "ېږ";
          if ([miniRoot, miniRootEg].includes(base)) {
            return [...acc, entry];
          }
        } else {
          const eb = e.p.slice(0, -1);
          if (eb === base) {
            return [...acc, entry];
          } else if (!e.sepOo) {
            if (baseWAa === base.slice(1)) {
              return [...acc, entry];
            }
          }
        }
        return acc;
      }, []),
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
              verb: removeFVarientsFromVerb(verb),
            },
          });
        });
        imperativePeople.forEach((person) => {
          w.push({
            type: "VB",
            person,
            info: {
              type: "verb",
              aspect: aspect as T.Aspect,
              base: "stem",
              verb: removeFVarientsFromVerb(verb),
              imperative: true,
            },
          });
        });
      });
    });
  }
  if (people.root.length) {
    const rootMatches = {
      imperfective: entries.filter(
        ({ entry: e }) => !e.c.includes("comp") && matchShortOrLong(base, e.p)
      ),
      perfective: entries.reduce<T.VerbEntry[]>((acc, entry) => {
        const e = entry.entry;
        if (e.c.includes("comp")) {
          return acc;
        }
        if (e.separationAtP) {
          const b = e.prp || e.p;
          const bRest = b.slice(e.separationAtP);
          if (matchShortOrLong(base, bRest)) {
            return [...acc, entry];
          }
        } else if (hasBreakawayAlef(e) && startsWithAleph(base) && !e.prp) {
          return acc;
        } else {
          const p = e.prp || e.p;
          if (matchShortOrLong(base, p) || matchShortOrLong("ا" + base, p)) {
            return [...acc, entry];
          }
        }
        return acc;
      }, []),
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
              verb: removeFVarientsFromVerb(verb),
            },
          });
        });
      });
    });
  }
  const hamzaEnd = s.at(-1) === "ه";
  const oEnd = s.at(-1) === "و";
  const abruptEnd = shortVerbEndConsonant.includes(s.slice(-1));
  const tppMatches = {
    imperfective: entries.reduce<T.VerbEntry[]>((acc, entry) => {
      const e = entry.entry;
      if (e.c.includes("comp")) {
        return acc;
      }
      if (!e.prp && isInVarients(e.tppp, s)) {
        return [...acc, entry];
      }
      if (oEnd && matchShortOrLong(base, e.p)) {
        return [...acc, entry];
      }
      if (
        lastVowelNotA(e.g.slice(0, -2)) &&
        (hamzaEnd ? base : abruptEnd ? s : "XX") === e.p.slice(0, -1)
      ) {
        return [...acc, entry];
      }
      // TODO: if check for modified aaXu thing!
      return acc;
    }, []),
    perfective: entries.reduce<T.VerbEntry[]>((acc, entry) => {
      const e = entry.entry;
      if (e.c.includes("comp")) {
        return acc;
      }
      if (e.separationAtP) {
        const b = e.prp || e.p;
        const bRest = b.slice(e.separationAtP);
        if (bRest === "شول") {
          return acc;
        }
        if (abruptEnd) {
          if (s === bRest.slice(0, -1)) {
            return [...acc, entry];
          }
        } else if (hamzaEnd) {
          if (base === bRest.slice(0, -1)) {
            return [...acc, entry];
          }
        } else if (oEnd) {
          if ([bRest, bRest.slice(0, -1)].includes(base)) {
            return [...acc, entry];
          }
        }
      } else if (!e.prp) {
        if (hasBreakawayAlef(e) && startsWithAleph(base)) {
          return acc;
        }
        if (oEnd) {
          if ([e.p, e.p.slice(0, -1)].includes(base)) {
            return [...acc, entry];
          }
        } else if ((hamzaEnd || abruptEnd) && lastVowelNotA(e.g.slice(0, -2))) {
          const b = hamzaEnd ? base : s;
          const p = e.p.slice(0, -1);
          if (b === p) {
            return [...acc, entry];
          }
        }
      }
      if (!e.separationAtP) {
        if (isInVarients(e.tppp, s)) {
          return [...acc, entry];
        } else if (isInVarients(e.tppp, "ا" + s)) {
          return [...acc, entry];
        }
      }
      return acc;
    }, []),
  };
  Object.entries(tppMatches).forEach(([aspect, entries]) => {
    entries.forEach((verb) => {
      w.push({
        type: "VB",
        person: T.Person.ThirdSingMale,
        info: {
          type: "verb",
          aspect: aspect as T.Aspect,
          base: "root",
          verb: removeFVarientsFromVerb(verb),
        },
      });
    });
  });
  return w;
}

function getImperativeVerbEnding(e: string): T.Person[] {
  if (e === "ه") {
    return [T.Person.SecondSingMale, T.Person.SecondSingFemale];
  }
  if (e === "ئ") {
    return [T.Person.SecondPlurMale, T.Person.SecondPlurFemale];
  }
  return [];
}

function getVerbEnding(e: string): {
  stem: T.Person[];
  root: T.Person[];
} {
  if (e === "م") {
    return {
      root: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
      stem: [T.Person.FirstSingMale, T.Person.FirstSingFemale],
    };
  } else if (e === "ې") {
    return {
      root: [
        T.Person.SecondSingMale,
        T.Person.SecondSingFemale,
        T.Person.ThirdPlurFemale,
      ],
      stem: [T.Person.SecondSingMale, T.Person.SecondSingFemale],
    };
  } else if (e === "ي") {
    return {
      stem: [
        T.Person.ThirdSingMale,
        T.Person.ThirdSingFemale,
        T.Person.ThirdPlurMale,
        T.Person.ThirdPlurFemale,
      ],
      root: [],
    };
  } else if (e === "و") {
    return {
      root: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
      stem: [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
    };
  } else if (e === "ئ") {
    return {
      root: [T.Person.SecondPlurMale, T.Person.SecondPlurFemale],
      stem: [T.Person.SecondPlurMale, T.Person.SecondPlurFemale],
    };
  } else if (e === "ه") {
    return {
      root: [T.Person.ThirdSingFemale],
      stem: [],
    };
  } else if (e === "ل") {
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

// TODO: could handle all sh- verbs for efficiencies sake
function parseIrregularVerb(s: string): T.ParsedVBE[] {
  if (["ته", "راته", "ورته", "درته"].includes(s)) {
    return [
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
    ];
  }
  if (s === "شو") {
    return [
      ...[
        T.Person.ThirdSingMale,
        T.Person.FirstPlurMale,
        T.Person.FirstPlurFemale,
      ].flatMap((person) =>
        [kedulStat, kedulDyn].map<T.ParsedVBE>((verb) => ({
          type: "VB",
          info: {
            aspect: "perfective",
            base: "root",
            type: "verb",
            verb,
          },
          person,
        }))
      ),
      ...[T.Person.FirstPlurMale, T.Person.FirstPlurFemale].flatMap((person) =>
        [kedulStat, kedulDyn].map<T.ParsedVBE>((verb) => ({
          type: "VB",
          info: {
            aspect: "perfective",
            base: "stem",
            type: "verb",
            verb,
          },
          person,
        }))
      ),
    ];
  }
  return [];
}

function hasBreakawayAlef(e: T.VerbDictionaryEntry): boolean {
  return !e.sepOo && ["ا", "آ"].includes(e.p[0]);
}

function startsWithAleph(base: string): boolean {
  return ["ا", "آ"].includes(base[0]);
}
