import * as T from "../../../types";
import { bindParseResult, returnParseResult } from "./utils";
import {
  makeObjectSelectionComplete,
  makeSubjectSelectionComplete,
} from "../phrase-building/blocks-utils";
import { getPersonFromNP, isPastTense } from "../phrase-building/vp-tools";
import { parseBlocks } from "./parse-blocks";
import { makePronounSelection } from "../phrase-building/make-selections";
import { isFirstOrSecondPersPronoun } from "../phrase-building/render-vp";
// to hide equatives type-doubling issue

// cool examples:
// زه خوږې ماشومې وهم
// ماشومان سړي ولیدل
// ماشومانو سړي ولیدل

// make impossible subjects like I saw me, error

// PROBLEM! ته وینې doesn't work cause it just takes ته as a verb phrase ?

export function parseVP(
  tokens: Readonly<T.Token[]>,
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[],
  verbLookup: (s: string) => T.VerbEntry[]
): T.ParseResult<T.VPSelectionComplete>[] {
  if (tokens.length === 0) {
    return [];
  }
  const blocks = parseBlocks(tokens, lookup, verbLookup, [], []);
  return bindParseResult(blocks, (tokens, { blocks, kids }) => {
    const ph = blocks.find((x) => "type" in x && x.type === "PH") as
      | {
          type: "PH";
          s: string;
        }
      | undefined;
    const verb = blocks.find((x) => "type" in x && x.type === "VB") as
      | Omit<T.VBE, "ps">
      | undefined;
    const ba = !!kids.find((k) => k === "ba");
    if (!verb || verb.type !== "VB" || verb.info.type !== "verb") {
      return [];
    }
    if (verb.info.aspect === "perfective") {
      // TODO: check that the perfective head is in the right place and actually matches
      if (!ph) {
        return [];
      }
    }
    const tense = getTenseFromRootsStems(ba, verb.info.base, verb.info.aspect);
    const isPast = isPastTense(tense);

    const nps = blocks.filter(
      (x): x is { inflected: boolean; selection: T.NPSelection } =>
        "inflected" in x
    );
    // TODO: check that verb and PH match
    if (verb.info.verb.entry.c.includes("intrans")) {
      if (nps.length > 1) {
        return [];
      }
      if (nps.length === 0) {
        const v: T.VerbSelectionComplete = {
          type: "verb",
          verb: verb.info.verb,
          transitivity: "intransitive",
          canChangeTransitivity: false,
          canChangeStatDyn: false,
          negative: false,
          tense,
          canChangeVoice: true,
          isCompound: false,
          voice: "active",
        };
        const blocks: T.VPSBlockComplete[] = [
          {
            key: 1,
            block: makeSubjectSelectionComplete({
              type: "NP",
              selection: makePronounSelection(verb.person),
            }),
          },
          {
            key: 2,
            block: {
              type: "objectSelection",
              selection: "none",
            },
          },
        ];
        return returnParseResult(tokens, {
          blocks,
          verb: v,
          externalComplement: undefined,
          form: {
            removeKing: true,
            shrinkServant: false,
          },
        } as T.VPSelectionComplete);
      }
      if (nps.length === 1) {
        const errors: T.ParseError[] = [];
        if (getPersonFromNP(nps[0].selection) !== verb.person) {
          errors.push({ message: "subject must agree with intransitive verb" });
        }
        if (nps[0].inflected) {
          errors.push({
            message: "subject of intransitive verb must not be inflected",
          });
        }
        const blocks: T.VPSBlockComplete[] = [
          {
            key: 1,
            block: makeSubjectSelectionComplete(nps[0].selection),
          },
          {
            key: 2,
            block: {
              type: "objectSelection",
              selection: "none",
            },
          },
        ];
        const v: T.VerbSelectionComplete = {
          type: "verb",
          verb: verb.info.verb,
          transitivity: "intransitive",
          canChangeTransitivity: false,
          canChangeStatDyn: false,
          negative: false,
          tense,
          canChangeVoice: true,
          isCompound: false,
          voice: "active",
        };
        return returnParseResult(
          tokens,
          {
            blocks,
            verb: v,
            externalComplement: undefined,
            form: {
              removeKing: false,
              shrinkServant: false,
            },
          } as T.VPSelectionComplete,
          errors
        );
      }
    } else {
      // transitive
      if (nps.length > 2) {
        return [];
      }
      if (nps.length === 0) {
        return [];
      }
      if (nps.length === 1) {
        const np = nps[0];
        return (
          [
            {
              removeKing: true,
              shrinkServant: false,
            },
            {
              removeKing: false,
              shrinkServant: true,
            },
          ] as const
        ).flatMap((form) => {
          const errors: T.ParseError[] = [];
          if (form.removeKing) {
            // king is gone
            // servant is there
            const king: T.NPSelection = {
              type: "NP",
              selection: makePronounSelection(verb.person),
            };
            const servant = np.selection;
            if (!isPast) {
              if (isFirstOrSecondPersPronoun(np.selection))
                if (!np.inflected) {
                  errors.push({
                    message:
                      "first or second pronoun object of non-past transitive verb must be inflected",
                  });
                }
            } else {
              if (!np.inflected) {
                errors.push({
                  message:
                    "object of non-past transitive verb must not be inflected",
                });
              }
            }
            const blocks: T.VPSBlockComplete[] = !isPast
              ? [
                  {
                    key: 1,
                    block: makeSubjectSelectionComplete(king),
                  },
                  {
                    key: 2,
                    block: makeObjectSelectionComplete(servant),
                  },
                ]
              : [
                  {
                    key: 1,
                    block: makeSubjectSelectionComplete(servant),
                  },
                  {
                    key: 2,
                    block: makeObjectSelectionComplete(king),
                  },
                ];
            const v: T.VerbSelectionComplete = {
              type: "verb",
              // @ts-ignore
              verb: verb.info.verb,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense,
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            };
            return returnParseResult(
              tokens,
              {
                blocks,
                verb: v,
                externalComplement: undefined,
                form,
              } as T.VPSelectionComplete,
              errors
            );
          } else {
            // servant is shrunken
            // king is there
            const king = np.selection;
            const shrunkenServantPeople = getPeopleFromKids(kids);
            if (!shrunkenServantPeople.length) {
              return [];
            }
            const servants = shrunkenServantPeople.map(
              (person): T.NPSelection => ({
                type: "NP",
                selection: makePronounSelection(person),
              })
            );
            if (!isPast) {
              if (np.inflected) {
                errors.push({
                  message:
                    "object of a past tense transitive verb should not be inflected",
                });
              }
            } else {
              if (np.inflected) {
                errors.push({
                  message:
                    "subject of a non-past tense transitive verb should not be inflected",
                });
              }
            }
            const blocksOps: T.VPSBlockComplete[][] = servants.map((servant) =>
              !isPast
                ? [
                    {
                      key: 1,
                      block: makeSubjectSelectionComplete(king),
                    },
                    {
                      key: 2,
                      block: makeObjectSelectionComplete(servant),
                    },
                  ]
                : [
                    {
                      key: 1,
                      block: makeSubjectSelectionComplete(servant),
                    },
                    {
                      key: 2,
                      block: makeObjectSelectionComplete(king),
                    },
                  ]
            );
            const v: T.VerbSelectionComplete = {
              type: "verb",
              // @ts-ignore
              verb: verb.info.verb,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense,
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            };
            return blocksOps.map((blocks) => ({
              tokens,
              body: {
                blocks,
                verb: v,
                externalComplement: undefined,
                form,
              } as T.VPSelectionComplete,
              errors,
            }));
          }
        });
        // possibilities
        // present:
        //  - no king (np is servant)
        //  - shrunken servant (np is king)
        // past:
        //  - no king (np is servant)
        //  - shrunken servant (np is king)
      } else {
        if (isPast) {
          return (
            [
              [nps[0], nps[1], false],
              [nps[1], nps[0], true],
            ] as const
          ).flatMap(([s, o, flip]) => {
            const errors: T.ParseError[] = [];
            if (!s.inflected) {
              errors.push({
                message:
                  "subject of transitive past tense verb must be inflected",
              });
            }
            if (o.inflected) {
              errors.push({
                message:
                  "object of past tense transitive verb must not be inflected",
              });
            }
            if (getPersonFromNP(o.selection) !== verb.person) {
              errors.push({
                message:
                  "past tense transitive verb must agree with the object",
              });
            }
            let blocks: T.VPSBlockComplete[] = [
              {
                key: 1,
                block: makeSubjectSelectionComplete(s.selection),
              },
              {
                key: 2,
                block: makeObjectSelectionComplete(o.selection),
              },
            ];
            if (flip) {
              blocks = blocks.reverse();
            }
            const v: T.VerbSelectionComplete = {
              type: "verb",
              // @ts-ignore
              verb: verb.info.verb,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense,
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            };
            return returnParseResult(
              tokens,
              {
                blocks,
                verb: v,
                externalComplement: undefined,
                form: {
                  removeKing: false,
                  shrinkServant: false,
                },
              } as T.VPSelectionComplete,
              errors
            );
          });
        } else {
          return (
            [
              [nps[0], nps[1], false],
              [nps[1], nps[0], true],
            ] as const
          ).flatMap(([s, o, flip]) => {
            const errors: T.ParseError[] = [];
            if (isFirstOrSecondPersPronoun(o.selection)) {
              if (!o.inflected) {
                errors.push({
                  message:
                    "object of transitive non-past tense verb must be inflected when it's a first or second person pronoun",
                });
              }
            } else {
              if (o.inflected) {
                errors.push({
                  message:
                    "object of transitive non-past tense verb must not be inflected",
                });
              }
            }
            if (s.inflected) {
              errors.push({
                message:
                  "subject of transitive non-past tense verb must not be inflected",
              });
            }
            if (getPersonFromNP(s.selection) !== verb.person) {
              errors.push({
                message:
                  "non-past tense transitive verb must agree with the subject",
              });
            }
            let blocks: T.VPSBlockComplete[] = [
              {
                key: 1,
                block: makeSubjectSelectionComplete(s.selection),
              },
              {
                key: 2,
                block: makeObjectSelectionComplete(o.selection),
              },
            ];
            if (flip) {
              blocks = blocks.reverse();
            }
            const v: T.VerbSelectionComplete = {
              type: "verb",
              // @ts-ignore
              verb: verb.info.verb,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense,
              canChangeVoice: true,
              isCompound: false,
              voice: "active",
            };
            return returnParseResult(
              tokens,
              {
                blocks,
                verb: v,
                externalComplement: undefined,
                form: {
                  removeKing: false,
                  shrinkServant: false,
                },
              } as T.VPSelectionComplete,
              errors
            );
          });
        }
      }
    }
    return [];
  });
}

function getPeopleFromKids(kids: T.ParsedKid[]): T.Person[] {
  const p: T.Person[] = [];
  for (let k of kids) {
    if (k === "me") {
      p.push(T.Person.FirstSingMale);
      p.push(T.Person.FirstSingFemale);
    } else if (k === "de") {
      p.push(T.Person.SecondSingMale);
      p.push(T.Person.SecondSingFemale);
    } else if (k === "ye") {
      p.push(T.Person.ThirdSingMale);
      p.push(T.Person.ThirdSingFemale);
      p.push(T.Person.ThirdPlurMale);
      p.push(T.Person.ThirdPlurFemale);
    } else if (k === "mU") {
      p.push(T.Person.FirstPlurMale);
      p.push(T.Person.FirstPlurFemale);
      p.push(T.Person.SecondPlurMale);
      p.push(T.Person.SecondPlurFemale);
    }
  }
  return p;
}

// // how to make this into a nice pipeline... 🤔
// const NP1 = parseNP(tokens, lookup).filter(({ errors }) => !errors.length);
// const ba = bindParseResult(NP1, (tokens, np1) => {
//   const b = parseBa(tokens);
//   if (!b.length) {
//     return [
//       {
//         tokens,
//         body: {
//           np1,
//           ba: false,
//         },
//         errors: [],
//       },
//     ];
//   } else {
//     return b.map(({ tokens, errors }) => ({
//       body: {
//         np1,
//         ba: true,
//       },
//       errors,
//       tokens,
//     }));
//   }
// });
// const NP2 = bindParseResult<
//   {
//     np1: {
//       inflected: boolean;
//       selection: T.NPSelection;
//     };
//     ba: boolean;
//   },
//   {
//     np1: {
//       inflected: boolean;
//       selection: T.NPSelection;
//     };
//     ba: boolean;
//     np2:
//       | {
//           inflected: boolean;
//           selection: T.NPSelection;
//         }
//       | undefined;
//   }
// >(ba, (tokens, { np1, ba }) => {
//   const np2s = parseNP(tokens, lookup);
//   if (!np2s.length) {
//     const r: T.ParseResult<{
//       np1: {
//         inflected: boolean;
//         selection: T.NPSelection;
//       };
//       ba: boolean;
//       np2: undefined;
//     }>[] = [
//       {
//         tokens,
//         body: {
//           np1,
//           np2: undefined,
//           ba,
//         },
//         errors: [],
//       },
//     ];
//     return r;
//   }
//   return np2s.map((p) => ({
//     tokens: p.tokens,
//     body: {
//       np1,
//       np2: p.body,
//       ba,
//     },
//     errors: p.errors,
//   }));
// }).filter(({ errors }) => !errors.length);
// const vb = bindParseResult(NP2, (tokens, nps) => {
//   const vb = parseVerb(tokens, verbLookup);
//   // TODO make a nice functor that just maps or adds in the body
//   return vb.map((p) => ({
//     tokens: p.tokens,
//     body: {
//       np2: nps.np2,
//       v: p.body,
//       np1: nps.np1,
//       ba: nps.ba,
//     },
//     errors: p.errors,
//   }));
// }).filter(({ errors }) => !errors.length);
// // TODO: be able to bind mulitple vals
// return bindParseResult(vb, (tokens, { np1, np2, v: [ph, v], ba }) => {
//   const w: T.ParseResult<T.VPSelectionComplete>[] = [];
//   if (v.info.type === "equative") {
//     throw new Error("not yet implemented");
//   }
//   const isPast = v.info.base === "root";
//   const intransitive =
//     v.info.type === "verb" && v.info.verb.entry.c.includes("intrans.");
//   if (intransitive) {
//     if (np2) return [];
//     const s = np1;
//     const errors: T.ParseError[] = [];
//     if (s.inflected) {
//       errors.push({
//         message: "subject of intransitive verb should not be inflected",
//       });
//     }
//     if (getPersonFromNP(s.selection) !== v.person) {
//       errors.push({
//         message: "subject should agree with intransitive verb",
//       });
//     }
//     const blocks: T.VPSBlockComplete[] = [
//       {
//         key: 1,
//         block: makeSubjectSelectionComplete(s.selection),
//       },
//       {
//         key: 2,
//         block: {
//           type: "objectSelection",
//           selection: "none",
//         },
//       },
//     ];
//     const verb: T.VerbSelectionComplete = {
//       type: "verb",
//       verb: v.info.type === "verb" ? v.info.verb : kedulStat,
//       transitivity: "intransitive",
//       canChangeTransitivity: false,
//       canChangeStatDyn: false,
//       negative: false,
//       tense: getTenseFromRootsStems(ba, v.info.base, v.info.aspect),
//       canChangeVoice: true,
//       isCompound: false,
//       voice: "active",
//     };
//     w.push({
//       tokens,
//       body: {
//         blocks,
//         verb,
//         externalComplement: undefined,
//         form: {
//           removeKing: false,
//           shrinkServant: false,
//         },
//       },
//       errors,
//     });
//   } else {
//     // transitive verb
//     if (!(np1 && np2)) return [];
//     [[np1, np2, false] as const, [np2, np1, true] as const].forEach(
//       ([s, o, reversed]) => {
//         if (v.info.type === "equative") {
//           throw new Error("not yet implemented");
//         }
//         if (!s || !o) return [];
//         // TODO: check if perfective head MATCHES verb
//         if (v.info.aspect === "perfective" && !ph) {
//           return [];
//         }
//         const subjPerson = getPersonFromNP(s.selection);
//         const errors: T.ParseError[] = [];
//         if (intransitive) {
//           return [];
//         }

//         if (isPast) {
//           if (getPersonFromNP(o.selection) !== v.person) {
//             errors.push({
//               message: "transitive past tense verb does not match object",
//             });
//           } else {
//             if (!s.inflected) {
//               errors.push({
//                 message: "transitive past tense subject should be inflected",
//               });
//             }
//             if (o.inflected) {
//               errors.push({
//                 message:
//                   "transitive past tense object should not be inflected",
//               });
//             }
//           }
//         } else {
//           if (getPersonFromNP(s.selection) !== v.person) {
//             errors.push({
//               message: "verb does not match subject",
//             });
//           } else {
//             if (s.inflected) {
//               errors.push({ message: "subject should not be inflected" });
//             }
//             if (o.selection.selection.type === "pronoun") {
//               if (!isThirdPerson(subjPerson) && !o.inflected) {
//                 errors.push({
//                   message:
//                     "1st or 2nd person object pronoun should be inflected",
//                 });
//               }
//             } else if (o.inflected) {
//               errors.push({ message: "object should not be inflected" });
//             }
//           }
//         }

//         const blocks: T.VPSBlockComplete[] = [
//           {
//             key: 1,
//             block: makeSubjectSelectionComplete(s.selection),
//           },
//           {
//             key: 2,
//             block: makeObjectSelectionComplete(o.selection),
//           },
//         ];
//         if (reversed) {
//           blocks.reverse();
//         }
//         const verb: T.VerbSelectionComplete = {
//           type: "verb",
//           verb: v.info.type === "verb" ? v.info.verb : kedulStat,
//           transitivity: "transitive",
//           canChangeTransitivity: false,
//           canChangeStatDyn: false,
//           negative: false,
//           tense: getTenseFromRootsStems(ba, v.info.base, v.info.aspect),
//           canChangeVoice: true,
//           isCompound: false,
//           voice: "active",
//         };
//         w.push({
//           tokens,
//           body: {
//             blocks,
//             verb,
//             externalComplement: undefined,
//             form: {
//               removeKing: false,
//               shrinkServant: false,
//             },
//           },
//           errors,
//         });
//       }
//     );
//   }

function getTenseFromRootsStems(
  hasBa: boolean,
  base: "root" | "stem",
  aspect: T.Aspect
): T.VerbTense {
  if (!hasBa) {
    if (base === "root") {
      return aspect === "perfective" ? "perfectivePast" : "imperfectivePast";
    } else {
      return aspect === "imperfective" ? "presentVerb" : "subjunctiveVerb";
    }
  } else {
    if (base === "root") {
      return aspect === "perfective"
        ? "habitualPerfectivePast"
        : "habitualImperfectivePast";
    } else {
      return aspect === "imperfective"
        ? "imperfectiveFuture"
        : "perfectiveFuture";
    }
  }
}
