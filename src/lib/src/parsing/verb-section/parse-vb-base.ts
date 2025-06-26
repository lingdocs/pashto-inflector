import * as T from "../../../../types";
import { getVerbEnding, isKawulStat, isKedulStat } from "./parse-verb-helpers";
import { returnParseResults, returnParseResult } from "../utils";
import { getImperativeVerbEnding } from "./misc";
import { parseKawulKedulVBE } from "./parse-kawul-kedul-vbe";
import { dartlul, raatlul, tlul, wartlul } from "./irreg-verbs";
import * as tp from "../../type-predicates";
import { pashtoConsonants } from "../../pashto-consonants";
import {
  findRoot,
  findStem,
  withAlephAdded,
  RootInfo,
} from "./stem-root-finding";
import {
  parseKawulKedulAbility,
  parseKawulKedulPPart,
} from "./parse-kawul-kedul-vbp";

// TODO: و ارزي
// check that aawu stuff is working
// check oo`azmooy -
//  TODO: proper use of sepOo (hasBreakawayAleph) when checking for perfective roots/stems
// check څاته
// TODO: هغه لاړ
// TODO: لاړې etc - check if botlul etc bo-ba-de-dzee is working
// TODO: don't have کول کېدل in split-verbs
// TODO: why doesn't بلله or وبلله work بلل fem sing past

// پوښتنه وشوه - shouldn't also parse as پوښتنه شوه

// TODO: check neg position with new setup
// TODO: should the welded be with the compound verb in there?
export function parseVBBBasic(
  tokens: readonly T.Token[],
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
): T.ParseResult<T.ParsedVBBVerb>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (ph?.type === "CompPH") {
    return parseKawulKedulVBE(tokens, undefined).filter(
      (x) => x.body.info.verb && x.body.info.aspect === "perfective",
    );
  }
  const irregResults = parseIrregularVerb(first.s, ph);
  if (irregResults.length) {
    return returnParseResults(rest, irregResults);
  }
  const kawulKedul = parseKawulKedulVBE(tokens, ph);
  if (kawulKedul.length) {
    return kawulKedul;
  }
  // TODO: AFTER THIS MAKE SURE WE DON'T PARSE ANY KAWUL/KEDUL VERBS!
  // then prevent the other things from using kawul / kedul
  const ending = first.s.at(-1) || "";
  const base = ending === "ل" ? first.s : first.s.slice(0, -1);
  const { stem, root } = getVerbEnding(ending);
  // todo imperative for seperating
  const imperative = getImperativeVerbEnding(ending);
  const stemRes: T.ParsedVBBVerb[] = findStem(ph)(base, dictionary).flatMap(
    (info) => [
      ...stem.map<T.ParsedVBBVerb>((person) => ({
        type: "parsed vbb verb",
        info,
        person,
      })),
      ...imperative.map<T.ParsedVBBVerb>((person) => ({
        type: "parsed vbb verb",
        person,
        info: {
          ...info,
          imperative: true,
        },
      })),
    ],
  );
  const rootRes: T.ParsedVBBVerb[] = [
    ...findRoot(ph)(base, dictionary).flatMap<T.ParsedVBBVerb>((info) => {
      const shortThird = thirdPersSingMascShortFromRoot(base, ending, info);
      return [
        ...shortThird,
        ...root.map((person) => ({
          type: "parsed vbb verb" as const,
          person,
          info,
        })),
      ];
    }),
    ...specialThirdPersMascSingForm(base, ending, dictionary, ph),
  ];
  return returnParseResults(rest, [...stemRes, ...rootRes]);
}

export function parseVBPBasic(type: "ability" | "perfect") {
  return function (
    tokens: Readonly<T.Token[]>,
    dictionary: T.DictionaryAPI,
    ph: T.ParsedPH | undefined,
  ): T.ParseResult<T.ParsedVBP>[] {
    if (tokens.length === 0) {
      return [];
    }
    if (type === "ability") {
      const kawulKedul = parseKawulKedulAbility(tokens, ph);
      if (kawulKedul.length) {
        return kawulKedul;
      }
      const [{ s }, ...rest] = tokens;
      const start = s.endsWith("ای")
        ? s.slice(0, -2)
        : s.endsWith("ی")
          ? s.slice(0, -1)
          : "";
      if (!start) return [];
      return findRoot(ph)(start, dictionary)
        .map<T.ParsedVBPBasicAbility>((root) => ({
          type: "parsed vbp basic ability",
          info: {
            type: "ability",
            verb: root.verb,
            aspect: root.aspect,
          },
        }))
        .flatMap((m) => returnParseResult(rest, m));
    } else {
      if (ph) {
        return [];
      }
      const [{ s }, ...rest] = tokens;
      const genNums = getPPartGenNums(s);
      // TODO: ALSO HANDLE SHORT FORMS
      const wOutEnd = s.slice(0, -1);
      // TODO: irreg part or just leave that to shúway ?
      const matches = [
        ...dictionary.verbEntryLookup(wOutEnd),
        ...(canBePastPartWOutL(wOutEnd + "ل")
          ? dictionary
              .verbEntryLookup(wOutEnd + "ل")
              .filter((x) => x.entry.p !== "talúl")
          : []),
      ];
      return matches
        .flatMap<T.ParsedVBPBasicPart>((verb) =>
          genNums.map<T.ParsedVBPBasicPart>((genNum) => ({
            type: "parsed vbp basic part",
            info: {
              type: "ppart",
              verb,
              genNum,
            },
          })),
        )
        .flatMap((m) => returnParseResult(rest, m));
    }
  };
}

function parseIrregularVerb(
  s: string,
  ph: T.ParsedPH | undefined,
): T.ParsedVBBVerb[] {
  if (ph) {
    return [];
  }
  if (["ته", "راته", "ورته", "درته"].includes(s)) {
    return [
      {
        type: "parsed vbb verb",
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

// should be in line with possiblePPartLengths
function canBePastPartWOutL(s: string): boolean {
  const shortenableEndings = ["ښتل", "ستل", "وتل"];
  const wrul = ["وړل", "راوړل", "وروړل", "دروړل"];
  if (s === "تلل") {
    return true;
  }
  if (
    !s.endsWith("استل") &&
    shortenableEndings.some((e) => s.endsWith(e) && s.length > e.length)
  ) {
    return true;
  }
  if (wrul.includes(s)) {
    return true;
  }
  if (s.endsWith("ښودل") && s.length > 4 && s !== "کېښودل" && s !== "کښېښودل") {
    return true;
  }
  return false;
}

function thirdPersSingMascShortFromRoot(
  base: string,
  ending: string,
  info: RootInfo,
): T.ParsedVBBVerb[] {
  if (info.verb.entry.tppp) {
    return [];
  }
  if (ending === "ه" && !["ل", "و"].some((char) => base.endsWith(char))) {
    return [
      {
        type: "parsed vbb verb",
        person: T.Person.ThirdSingMale,
        info,
      },
    ];
  }
  return [];
}

function specialThirdPersMascSingForm(
  base: string,
  ending: string,
  dicitonary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
): T.ParsedVBBVerb[] {
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

  const hardEnding: T.ParsedVBBVerb[] =
    (ending === "د" && ["ې", "و"].some((x) => base.endsWith(x))) ||
    (ending === "ت" &&
      ["س", "ښ"].some((x) => base.endsWith(x)) &&
      base.length > 1)
      ? findRoot(ph)(base + ending, dicitonary).map<T.ParsedVBBVerb>(
          (info) => ({
            type: "parsed vbb verb",
            person: T.Person.ThirdSingMale,
            info,
          }),
        )
      : [];

  const regular: T.ParsedVBBVerb[] = [
    base + ending,
    ...(ending === "ه" ? [base] : []),
  ]
    // TODO: now we can do way better that we know what the ph is
    .flatMap(withAlephAdded)
    .flatMap((v) => dicitonary.otherLookup("tppp", v, true))
    .filter(
      (e): e is T.VerbDictionaryEntry =>
        tp.isVerbDictionaryEntry(e) && !e.l && !!e.tppp,
    )
    .map((entry) => ({
      type: "parsed vbb verb",
      person: T.Person.ThirdSingMale,
      info: {
        type: "verb",
        aspect: ph ? "perfective" : "imperfective",
        base: "root",
        verb: { entry },
      } as const,
    }));

  const aawu: T.ParsedVBBVerb[] =
    (base + ending).endsWith("اوه") && base.length > 2
      ? findRoot(ph)(base.slice(0, -2) + "و", dicitonary).map<T.ParsedVBBVerb>(
          (info) => ({
            type: "parsed vbb verb",
            person: T.Person.ThirdSingMale,
            info,
          }),
        )
      : [];

  return [...regular, ...hardEnding, ...aawu];

  //   ...imperfectiveWSep, ...perfectiveWSep];
}

function getPPartGenNums(s: string): T.GenderNumber[] {
  const ending: "ی" | "ي" | "ې" = s.at(-1) as "ی" | "ي" | "ې";
  if (!ending || !["ی", "ي", "ې"].includes(ending)) {
    return [];
  }
  return endingGenNum(ending);
}

function endingGenNum(s: "ی" | "ې" | "ي"): T.GenderNumber[] {
  if (s === "ی") {
    return [
      {
        gender: "masc",
        number: "singular",
      },
    ];
  }
  if (s === "ې") {
    return [
      { gender: "fem", number: "singular" },
      { gender: "fem", number: "plural" },
    ];
  }
  if (s === "ي") {
    return [{ gender: "masc", number: "plural" }];
  }
  throw new Error("invalid participle tail input");
}
