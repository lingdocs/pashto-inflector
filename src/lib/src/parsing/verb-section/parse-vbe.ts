import * as T from "../../../../types";
import { dartlul, raatlul, tlul, wartlul } from "./irreg-verbs";
import { getVerbEnding, isStatAux } from "./parse-verb-helpers";
import {
  bindParseResult,
  returnParseResult,
  returnParseResults,
} from "../utils";
import * as tp from "../../type-predicates";
import { pashtoConsonants } from "../../pashto-consonants";
import { getImperativeVerbEnding } from "./misc";
import {
  findRoot,
  findStem,
  withAlephAdded,
  RootInfo,
} from "./stem-root-finding";
import { parseKawulKedulVBE } from "./parse-kawul-kedul-vbe";
import { parseComplement } from "../argument-section/parse-complement";
import { parseOptNeg } from "./parse-negative";

// TODO: و ارزي
// TODO: کول verbs!
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

export function parseVBE(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
): T.ParseResult<T.ParsedVBE>[] {
  return [
    ...parseVBEBasic(tokens, dictionary, ph),
    ...parseWelded(tokens, dictionary, ph), //tokens, dictionary, ph),
  ];
}

function parseVBEBasic(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
): T.ParseResult<T.ParsedVBE>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (ph?.type === "CompPH") {
    return parseKawulKedulVBE(tokens, undefined).filter(
      (x) =>
        x.body.type === "VB" &&
        x.body.info.type === "verb" &&
        isStatAux(x.body.info.verb) &&
        x.body.info.aspect === "perfective",
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
  const stemRes = returnParseResults(
    rest,
    findStem(ph)(base, dictionary).flatMap<T.ParsedVBE>((info) => [
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
  );
  const rootRes = returnParseResults(rest, [
    ...findRoot(ph)(base, dictionary).flatMap<T.ParsedVBE>((info) => {
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
    ...specialThirdPersMascSingForm(base, ending, dictionary, ph),
  ]);
  return [...stemRes, ...rootRes];
}

function parseWelded(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
): T.ParseResult<T.ParsedVBE>[] {
  if (ph) {
    return [];
  }
  const complement = parseComplement(tokens, dictionary);
  if (!complement.length) {
    return [];
  }
  return bindParseResult(complement, (tkns, comp) => {
    // TODO: remove the last check allow for CompNP once implemented
    if (
      typeof comp.selection === "object" &&
      "type" in comp.selection &&
      (comp.selection.type === "sandwich" ||
        comp.selection.type === "possesor" ||
        comp.selection.type === "NP")
    ) {
      return [];
    }
    const misplacedNegative = parseOptNeg(tkns);
    return bindParseResult(misplacedNegative, (tkns2, badNeg) => {
      const k = parseKawulKedulVBE(tkns2, undefined);
      return bindParseResult(k, (tkns3, aux) => {
        if (!("aspect" in aux.info)) {
          // purely for type safety because of the badly designed types
          return [];
        }
        if (
          aux.info.aspect === "imperfective" &&
          isStatAux(aux.info.verb) /*type safety*/
        ) {
          const compTs = getLFromComplement(comp);
          if (compTs === undefined) {
            return [];
          }
          const vbe: T.ParsedVBE = {
            type: "weldedVBE",
            left: comp,
            right: {
              type: "parsedRightVBE",
              person: aux.person,
              info: aux.info,
            },
          };
          return returnParseResult(
            tkns3,
            vbe,
            badNeg
              ? [{ message: "negative cannot go inside welded block" }]
              : [],
          );
        } else {
          return [];
        }
      });
    });
  });
}

// function statCompMatchesAux(aux: T.ParsedVBE) {
//   // TODO: would be nice to have a parsed Aux type
//   return (e: T.VerbEntry): boolean => {
//     return ("aspect" in aux.info && aux.info.aspect === "imperfective" && isStatAux(aux.info.verb) /*type safety*/) &&
//       getTransitivity(aux.info.verb.entry) === getTransitivity(e.entry);
//   }
// }

export function getLFromComplement(
  comp: T.ParsedComplementSelection,
): number | undefined {
  if ("inflection" in comp.selection) {
    return comp.selection.selection.entry.ts;
  }
  if (comp.selection.type === "loc. adv.") {
    return comp.selection.entry.ts;
  }
  return undefined;
}

function specialThirdPersMascSingForm(
  base: string,
  ending: string,
  dicitonary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
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
      ? findRoot(ph)(base + ending, dicitonary).map<T.ParsedVBE>((info) => ({
          type: "VB",
          person: T.Person.ThirdSingMale,
          info,
        }))
      : [];

  const regular: T.ParsedVBE[] = [
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
      type: "VB" as const,
      person: T.Person.ThirdSingMale,
      info: {
        type: "verb",
        aspect: ph ? "perfective" : "imperfective",
        base: "root",
        verb: { entry },
      } as const,
    }));

  const aawu: T.ParsedVBE[] =
    (base + ending).endsWith("اوه") && base.length > 2
      ? findRoot(ph)(base.slice(0, -2) + "و", dicitonary).map<T.ParsedVBE>(
          (info) => ({
            type: "VB",
            person: T.Person.ThirdSingMale,
            info,
          }),
        )
      : [];

  return [...regular, ...hardEnding, ...aawu];

  //   ...imperfectiveWSep, ...perfectiveWSep];
}

function thirdPersSingMascShortFromRoot(
  base: string,
  ending: string,
  info: RootInfo,
): T.ParsedVBE[] {
  if (info.verb.entry.tppp) {
    return [];
  }
  if (ending === "ه" && !["ل", "و"].some((char) => base.endsWith(char))) {
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

function parseIrregularVerb(
  s: string,
  ph: T.ParsedPH | undefined,
): T.ParsedVBE[] {
  if (ph) {
    return [];
  }
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
