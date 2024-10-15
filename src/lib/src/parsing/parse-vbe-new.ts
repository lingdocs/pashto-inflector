import * as T from "../../../types";
import { dartlul, raatlul, tlul, wartlul } from "./irreg-verbs";
import { parseKedul } from "./parse-kedul";
import { getVerbEnding } from "./parse-verb-helpers";
import { returnParseResults } from "./utils";
import { entries as splitVerbEntries } from "./split-verbs";
import * as tp from "../type-predicates";
import memoize from "micro-memoize";
import { pashtoConsonants } from "../pashto-consonants";

// TODO: کول verbs!
// check that aawu stuff is working
// check oo`azmooy -
//  TODO: proper use of sepOo (hasBreakawayAleph) when checking for perfective roots/stems
// check څاته
// laaRa shum etc
// TODO: proper use of perfective with sh
// TODO: use of raa, dar, war with sh
// TODO: هغه لاړ
// TODO: don't have کول کېدل in split-verbs

type BaseInfo = Extract<T.ParsedVBE["info"], { type: "verb" }>;
type StemInfo = Omit<BaseInfo, "base"> & {
  base: "stem";
};
type RootInfo = Omit<BaseInfo, "base"> & {
  base: "root";
};

export function parseVBE(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.ParsedVBE>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const irregResults = parseIrregularVerb(first.s);
  if (irregResults.length) {
    return returnParseResults(rest, irregResults);
  }
  const kedulStat = parseKedul(tokens);
  const ending = first.s.at(-1) || "";
  const base = ending === "ل" ? first.s : first.s.slice(0, -1);
  const { stem, root } = getVerbEnding(ending);
  // todo imperative for seperating
  const imperative = getImperativeVerbEnding(ending);
  const stemRes = returnParseResults(rest, [
    ...[
      ...findImperfectiveStem(base, dictionary),
      ...findPerfectiveStem(base, dictionary),
    ].flatMap<T.ParsedVBE>((info) => [
      ...stem.map<T.ParsedVBE>((person) => ({
        type: "VB",
        person,
        info,
      })),
      ...imperative.map<T.ParsedVBE>((person) => ({
        type: "VB",
        person,
        info: {
          ...info,
          imperative: true,
        },
      })),
    ]),
  ]);
  const rootRes = returnParseResults(rest, [
    ...[
      ...findImperfectiveRoot(base, dictionary),
      ...findPerfectiveRoot(base, dictionary),
    ].flatMap<T.ParsedVBE>((info) => {
      const shortThird = thirdPersSingMascShortFromRoot(base, ending, info);
      return [
        ...shortThird,
        ...root.map<T.ParsedVBE>((person) => ({
          type: "VB",
          person,
          info,
        })),
      ];
    }),
    ...specialThirdPersMascSingForm(base, ending, dictionary),
  ]);
  return [...kedulStat, ...stemRes, ...rootRes];
}

function specialThirdPersMascSingForm(
  base: string,
  ending: string,
  dicitonary: T.DictionaryAPI
): T.ParsedVBE[] {
  if (ending !== "ه" && !pashtoConsonants.includes(ending)) {
    return [];
  }
  // const imperfectiveWSep = [base + ending, ...(ending === "ه" ? [base] : [])]
  //   .flatMap((v) =>
  //     splitVerbEntries.filter((entry) => entry.entry.p.slice(0, -1) === v)
  //   )
  //   .map<T.ParsedVBE>((verb) => ({
  //     type: "VB",
  //     person: T.Person.ThirdSingMale,
  //     info: {
  //       type: "verb",
  //       aspect: "imperfective",
  //       base: "root",
  //       verb,
  //     },
  //   }));

  // const perfectiveWSep = [base + ending, ...(ending === "ه" ? [base] : [])]
  //   .flatMap((v) => {
  //     const b = splitVerbEntries.filter(({ entry }) => {
  //       if (entry.tppp) {
  //         return splitVarients(entry.tppp).some(
  //           (varient) => varient.slice(entry.separationAtP) === v
  //         );
  //       } else {
  //         return entry.p.slice(entry.separationAtP, -1) === v;
  //       }
  //     });
  //     return b;
  //   })
  //   .map<T.ParsedVBE>((verb) => ({
  //     type: "VB",
  //     person: T.Person.ThirdSingMale,
  //     info: {
  //       type: "verb",
  //       aspect: "perfective",
  //       base: "root",
  //       verb,
  //     },
  //   }));

  const hardEnding: T.ParsedVBE[] =
    (ending === "د" && ["ې", "و"].some((x) => base.endsWith(x))) ||
    (ending === "ت" &&
      ["س", "ښ"].some((x) => base.endsWith(x)) &&
      base.length > 1)
      ? [
          ...findPerfectiveRoot(base + ending + "ل", dicitonary),
          ...findImperfectiveRoot(base + ending + "ل", dicitonary),
        ].map<T.ParsedVBE>((info) => ({
          type: "VB",
          person: T.Person.ThirdSingMale,
          info,
        }))
      : [];

  const regular: T.ParsedVBE[] = [
    base + ending,
    ...(ending === "ه" ? [base] : []),
  ]
    .flatMap(withAlefAdded)
    .flatMap((v) => dicitonary.otherLookup("tppp", v, true))
    .filter(
      (e): e is T.VerbDictionaryEntry =>
        tp.isVerbDictionaryEntry(e) && !e.l && !!e.tppp
    )
    .flatMap((entry) =>
      // NOT IF STARTS WITH ALEPH!
      (entry.separationAtP
        ? (["imperfective"] as const)
        : startsWithAleph(entry.p) && !startsWithAleph(base)
        ? (["perfective"] as const)
        : (["imperfective", "perfective"] as const)
      ).map<T.ParsedVBE>((aspect) => ({
        type: "VB" as const,
        person: T.Person.ThirdSingMale,
        info: {
          type: "verb",
          aspect,
          base: "root",
          verb: { entry },
        } as const,
      }))
    );

  return [...regular, ...hardEnding];

  //   ...imperfectiveWSep, ...perfectiveWSep];
}

function thirdPersSingMascShortFromRoot(
  base: string,
  ending: string,
  info: RootInfo
): T.ParsedVBE[] {
  if (info.verb.entry.tppp) {
    return [];
  }
  if (ending === "ه" && !base.endsWith("ل")) {
    return [
      {
        type: "VB",
        person: T.Person.ThirdSingMale,
        info,
      },
    ];
  }
  return [];
}

function findImperfectiveStem(
  s: string,
  dicitonary: T.DictionaryAPI
): StemInfo[] {
  if (["کېږ", "کېد", "ش", "شو", "شول"].includes(s)) {
    return [];
  }
  const regulars = regStemSearch(s, dicitonary);
  const irregulars = dicitonary
    .otherLookup("psp", s)
    .filter(
      (e): e is T.VerbDictionaryEntry => tp.isVerbDictionaryEntry(e) && !e.l
    )
    .map<T.VerbEntry>((entry) => ({
      entry,
    }));
  return [...regulars, ...irregulars].map((verb) => ({
    type: "verb",
    aspect: "imperfective",
    base: "stem",
    verb,
  }));
}

function withAlefAdded(s: string): string[] {
  return [s, ...(startsWithAleph(s) ? [] : ["ا" + s, "آ" + s])];
}

const stemSplitLookup = memoize((s: string) =>
  splitVerbEntries.filter(
    (e) =>
      (e.entry.ssp || e.entry.psp || e.entry.p).slice(
        e.entry.separationAtP || 0
      ) === s
  )
);

function findPerfectiveStem(
  s: string,
  dicitonary: T.DictionaryAPI
): StemInfo[] {
  if (["کېږ", "کېد", "ش", "شو", "شول"].includes(s)) {
    return [];
  }
  if (startsWithAleph(s)) {
    return [];
  }
  const baseQ = withAlefAdded(s);
  const regulars = baseQ
    .flatMap((q) => regStemSearch(q, dicitonary))
    .filter((e) => !e.entry.separationAtP);
  const irregularsBasedOnImperf = baseQ
    .flatMap((q) => dicitonary.otherLookup("psp", q))
    .filter(
      (e): e is T.VerbDictionaryEntry =>
        tp.isVerbDictionaryEntry(e) && !e.l && !e.ssp && !e.separationAtP
    )
    .map<T.VerbEntry>((entry) => ({
      entry,
    }));
  return [...regulars, ...irregularsBasedOnImperf, ...stemSplitLookup(s)].map(
    (verb) => ({
      type: "verb",
      aspect: "perfective",
      base: "stem",
      verb,
    })
  );
}

function regStemSearch(s: string, dicitonary: T.DictionaryAPI): T.VerbEntry[] {
  const regTrans = dicitonary
    .verbEntryLookup(s + "ل")
    .filter(
      (e) =>
        !e.entry.c.includes("comp") &&
        !e.entry.ssp &&
        !e.entry.psp &&
        !e.entry.c.includes("intrans")
    );
  const regIntrans = dicitonary
    .verbEntryLookup((s.endsWith("ېږ") ? s.slice(0, -2) : s) + "ېدل")
    .filter(
      (e) =>
        !e.entry.c.includes("comp") &&
        !e.entry.ssp &&
        !e.entry.psp &&
        e.entry.c.includes("intrans")
    );
  return [...regTrans, ...regIntrans];
}

function findImperfectiveRoot(
  s: string,
  dicitonary: T.DictionaryAPI
): RootInfo[] {
  if (["کېږ", "کېد", "ش", "شو", "شول"].includes(s)) {
    return [];
  }
  const reg = [s, s + "ل"]
    .flatMap(dicitonary.verbEntryLookup)
    .filter((e) => !e.entry.c.includes("comp"));
  return reg.map((verb) => ({
    type: "verb",
    aspect: "imperfective",
    base: "root",
    verb,
  }));
}

const rootSplitLookup = memoize((s: string) =>
  splitVerbEntries.filter((e) =>
    [s, s + "ل"].some(
      (x) => (e.entry.prp || e.entry.p).slice(e.entry.separationAtP || 0) === x
    )
  )
);

function findPerfectiveRoot(
  s: string,
  dicitonary: T.DictionaryAPI
): RootInfo[] {
  if (startsWithAleph(s) || ["کېږ", "کېد", "ش", "شو", "شول"].includes(s)) {
    return [];
  }
  const reg = [s, s + "ل"]
    .flatMap(withAlefAdded)
    .flatMap(dicitonary.verbEntryLookup)
    .filter(
      (e) =>
        !e.entry.c.includes("comp") && !e.entry.prp && !e.entry.separationAtP
    );
  return [...reg, ...rootSplitLookup(s)].map((verb) => ({
    type: "verb",
    aspect: "perfective",
    base: "root",
    verb,
  }));
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
  return [];
}

// function hasBreakawayAlef(e: T.VerbDictionaryEntry): boolean {
//   return !e.sepOo && startsWithAleph(e.p);
// }

function startsWithAleph(base: string): boolean {
  return ["ا", "آ"].includes(base[0]);
}
