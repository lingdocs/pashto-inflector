import * as T from "../../../../types";
import { dartlul, kawulStat, raatlul, tlul, wartlul } from "./irreg-verbs";
import { getVerbEnding, isKedulStat, isStatAux } from "./parse-verb-helpers";
import {
  bindParseResult,
  returnParseResult,
  returnParseResults,
} from "../utils";
import * as tp from "../../type-predicates";
import { pashtoConsonants } from "../../pashto-consonants";
import { getImperativeVerbEnding, wrapInActiveV } from "./misc";
import {
  findRoot,
  findStem,
  withAlephAdded,
  RootInfo,
} from "./stem-root-finding";
import { parseKawulKedulVBE } from "./parse-kawul-kedul-vbe";
import { parseComplement } from "../argument-section/parse-complement";
import { parseOptNeg } from "./parse-negative";
import { fmapParseResult } from "../../fp-ps";
import { getTransitivity } from "../../verb-info";

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

/**
 * Parses a ParsedV<ParsedVBBVerb>
 * IMPORTANT: after using this you need to remove the extra
 * PH in the blocks if it was consumed to make a PassiveVDoubleWelded
 */
export function parseVBE(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
): T.ParseResult<T.ParsedV<T.ParsedVBBVerb>>[] {
  const vbbs = parseVBBBasic(tokens, dictionary, ph);
  const res: T.ParseResult<T.ParsedV<T.ParsedVBBVerb>["content"]>[] = [
    ...vbbs,
    ...parseWelded(tokens, dictionary, ph), //tokens, dictionary, ph),
    ...parseBasicPassiveWelded(tokens, vbbs, ph),
    ...parseStatPassiveWelded(ph, tokens),
  ];
  return fmapParseResult(
    (content) => ({ type: "parsedV" as const, content }),
    res,
  );
}

function parseVBBBasic(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
): T.ParseResult<T.ActiveVBasic<T.ParsedVBBVerb>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (ph?.type === "CompPH") {
    return fmapParseResult(
      wrapInActiveV,
      parseKawulKedulVBE(tokens, undefined).filter(
        (x) =>
          isStatAux(x.body.info.verb) && x.body.info.aspect === "perfective",
      ),
    );
  }
  const irregResults = parseIrregularVerb(first.s, ph);
  if (irregResults.length) {
    return fmapParseResult(
      wrapInActiveV,
      returnParseResults(rest, irregResults),
    );
  }
  const kawulKedul = parseKawulKedulVBE(tokens, ph);
  if (kawulKedul.length) {
    return fmapParseResult(wrapInActiveV, kawulKedul);
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
  return fmapParseResult(
    wrapInActiveV,
    returnParseResults(rest, [...stemRes, ...rootRes]),
  );
}

function parseWelded(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
): T.ParseResult<T.ActiveVWeld<T.ParsedVBBVerb>>[] {
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
          const vbe: T.ActiveVWeld<T.ParsedVBBVerb> = {
            type: "active welded",
            content: {
              left: comp,

              right: {
                type: "parsed vbb verb",
                person: aux.person,
                info: aux.info,
              },
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

function parseBasicPassiveWelded(
  tokens: readonly T.Token[],
  vbes: T.ParseResult<T.ActiveVBasic<T.ParsedVBBVerb>>[],
  ph: T.ParsedPH | undefined,
): T.ParseResult<T.PassiveVWeld<T.ParsedVBBVerb>>[] {
  if (ph?.type === "CompPH") {
    return parsePerfectiveStatRear(tokens);
  }
  return bindParseResult(vbes, (tkns, vbe) => {
    const { info, person } = vbe.content;
    if (info.base !== "root") {
      return [];
    }
    if (info.imperative) {
      return [];
    }
    if (person !== T.Person.ThirdPlurMale) {
      return [];
    }
    const auxs = parseKawulKedulVBE(tkns, undefined).filter(
      (x) => x.body.info.type === "verb" && isKedulStat(x.body.info.verb),
    );
    return bindParseResult(auxs, (tkns2, aux) => {
      const errors: T.ParseError[] = [];
      if (getTransitivity(info.verb.entry) === "intransitive") {
        errors.push({
          message: `intransitive verbs cannot be used with the passive form`,
        });
      }
      if (aux.info.aspect !== info.aspect) {
        errors.push({
          message: `${info.aspect} passive requires ${info.aspect} auxilary kedul verb`,
        });
      }
      const passive: T.PassiveVWeld<T.ParsedVBBVerb> = {
        type: "passive welded",
        content: {
          left: info.verb,
          right: {
            type: "parsed vbb verb",
            info: aux.info,
            person: aux.person,
          },
        },
      };
      return returnParseResult(tkns2, passive, errors);
    });
  });
}

function parsePerfectiveStatRear(
  tokens: readonly T.Token[],
): T.ParseResult<T.PassiveVWeld<T.ParsedVBBVerb>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const kraays = parseKraay(tokens);
  return bindParseResult(kraays, (tkns2) => {
    const auxs = parseKawulKedulVBE(tkns2, undefined).filter(
      (x) =>
        isKedulStat(x.body.info.verb) && x.body.info.aspect === "perfective",
    );
    return bindParseResult(auxs, (tkns3, aux) =>
      returnParseResult(tkns3, {
        type: "passive welded",
        content: {
          left: kawulStat,
          right: {
            type: "parsed vbb verb",
            info: aux.info,
            person: aux.person,
          },
        },
      }),
    );
  });
}

function parseStatPassiveWelded(
  ph: T.ParsedPH | undefined,
  tokens: readonly T.Token[],
): T.ParseResult<T.PassiveVDoubWeld<T.ParsedVBBVerb>>[] {
  // TODO: PROBLEM TO SOLVE!
  // We can use the ph here, but we need to make sure that
  //  1. The ph in the VerbBlocks gets eaten up somewhere
  if (ph?.type !== "CompPH") {
    return [];
  }
  const kawuls: T.ParseResult<{ type: "kawul" }>[] = parseKawulStraight(tokens);
  return bindParseResult(kawuls, (tkns2) => {
    const auxs = parseKawulKedulVBE(tkns2, undefined).filter(
      (x) =>
        isKedulStat(x.body.info.verb) && x.body.info.aspect === "imperfective",
    );
    return bindParseResult(auxs, (tkns3, aux) => {
      if (aux.info.type !== "verb") {
        return [];
      }
      const passive: T.PassiveVDoubWeld<T.ParsedVBBVerb> = {
        type: "passive doub welded",
        content: {
          left: {
            type: "passive welded left",
            complement: {
              type: "complement",
              selection: ph.selection,
            },
          },
          right: {
            type: "parsed vbb verb",
            info: aux.info,
            person: aux.person,
          },
        },
      };
      return returnParseResult(tkns3, passive);
    });
  });
}

function parseKraay(
  tokens: readonly T.Token[],
): T.ParseResult<{ type: "kraay" }>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [{ s }, ...rest] = tokens;
  if (s === "کړای" || s === "کړلای" || s === "کړل") {
    return returnParseResult(rest, { type: "kraay" });
  }
  return [];
}

//
// if (!ph) {
//   return [];
// }
// if (ph.type !== "CompPH") {
//   return [];
// }
// const kraays: T.ParseResult<{ type: "kraay" }>[] = parseKraay(tokens);
// if (kraays.length) {
//   return bindParseResult(kraays, (tkns2) => {
//     const auxs: T.ParseResult<T.ParsedVBBVerb>[] = [
//       ...parseKawulKedulVBE(tkns2, undefined).filter(
//         (x) =>
//           isKedulStat(x.body.info.verb) &&
//           x.body.info.aspect === "perfective",
//       ),
//       // ...parseKawulKedulVBP(tkns2, undefined).filter(
//       //   (x) => x.body.info.type === "ppart" && isKedulStat(x.body.info.verb),
//       // ),
//     ];

//     function makePassiveRight(
//       aux: T.ParsedVB | T.ParsedVBP,
//     ): T.ParsedRightVBE | T.ParsedRightVBP {
//       if (aux.info.type === "verb") {
//         // now we know this must be a perfective kedul aux
//         // @ts-ignore - for some reason we have to do this
//         const perfAux: T.ParsedVB = aux;
//         if (perfAux.info.type === "equative") {
//           throw new Error("improper verb flow in passive parsing");
//         }
//         return {
//           type: "parsedRightVBE",
//           info: perfAux.info,
//           person: perfAux.person,
//         };
//       } else if (aux.info.type === "ppart") {
//         // now we know this must be a perfect kedul aux
//         // @ts-ignore - for some reason we have to do this
//         const ppartAux: T.ParsedVBP = aux;
//         if (ppartAux.info.type === "ability") {
//           throw new Error("mmmm");
//         }
//         return {
//           type: "parsedRightVBP",
//           vbp: ppartAux,
//         };
//       }
//       throw new Error("improper verb flow in passive parsing 2");
//     }

//     return bindParseResult(auxs, (tkns3, aux) => {
//       // bit silly we have to use this function here because of trouble with type narrowing
//       const right = makePassiveRight(aux);
//       const passive: T.ParsedWeldedPassive = {
//         type: "weldedPassive",
//         left: {
//           type: "passiveLeftBasic",
//           verb: kawulStat,
//         },
//         right,
//       };
//       const blocks = [...front.front, passive];
//       return returnParseResult(tkns3, {
//         ...front,
//         blocks,
//       });
//     });
//   });
// }

function parseKawulStraight(
  tokens: readonly T.Token[],
): T.ParseResult<{ type: "kawul" }>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [{ s }, ...rest] = tokens;
  if (s === "کول") {
    return returnParseResult(rest, { type: "kawul" });
  }
  return [];
}
