import * as T from "../../../types";
import { bindParseResult, returnParseResult } from "./utils";
import {
  makeObjectSelectionComplete,
  makeSubjectSelectionComplete,
} from "../phrase-building/blocks-utils";
import {
  getPersonFromNP,
  isInvalidSubjObjCombo,
  isPastTense,
} from "../phrase-building/vp-tools";
import { parseBlocks } from "./parse-blocks";
import { makePronounSelection } from "../phrase-building/make-selections";
import { isFirstOrSecondPersPronoun } from "../phrase-building/render-vp";
// to hide equatives type-doubling issue

// this should also conjugate to
//  وامې نه خیسته
// وامې نه خیستلو
// waa-me nú kheestulo
// وامې نه اخیست
// waa-me nú akheest

// TODO: word query for kawul/kedul/stat/dyn

// map over transitivities, to give transitive / gramm. transitive optionns

// TODO: learn how to yank / use plugin for JSON neovim
// learn to use jq to edit selected json in vim ?? COOOL

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
    const phIndex = blocks.findIndex((x) => x.type === "PH");
    const vbeIndex = blocks.findIndex((x) => x.type === "VB");
    const ba = !!kids.find((k) => k === "ba");
    const negIndex = blocks.findIndex(
      (x) => x.type === "negative" && !x.imperative
    );
    const ph = phIndex !== -1 ? (blocks[phIndex] as T.ParsedPH) : undefined;
    const verb =
      vbeIndex !== -1 ? (blocks[vbeIndex] as T.ParsedVBE) : undefined;
    const negative = negIndex !== -1;
    if (!verb || verb.type !== "VB" || verb.info.type !== "verb") {
      return [];
    }
    if (
      !negativeInPlace({
        neg: negIndex,
        v: vbeIndex,
        phIndex: phIndex,
        ph,
        kids: !!kids.length,
      })
    ) {
      return [];
    }
    if (verb.info.aspect === "perfective") {
      // TODO: check that the perfective head is in the right place and actually matches
      if (!ph) {
        return [];
      }
    } else {
      if (ph) {
        return [];
      }
    }
    const tense = getTenseFromRootsStems(ba, verb.info.base, verb.info.aspect);
    const isPast = isPastTense(tense);

    const v: T.VerbSelectionComplete = {
      type: "verb",
      verb: verb.info.verb,
      transitivity: verb.info.verb.entry.c.includes("intrans")
        ? "intransitive"
        : "transitive",
      canChangeTransitivity: false,
      canChangeStatDyn: false,
      negative,
      tense,
      canChangeVoice: true,
      isCompound: false,
      voice: "active",
    };

    const nps = blocks.filter((x): x is T.ParsedNP => x.type === "NP");
    // TODO: check that verb and PH match
    if (verb.info.verb.entry.c.includes("intrans")) {
      const errors: T.ParseError[] = [];
      if (getMiniPronouns(kids).length) {
        errors.push({
          message: "unknown mini-pronoun",
        });
      }
      if (nps.length > 1) {
        return [];
      }
      if (nps.length === 0) {
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
        return returnParseResult(
          tokens,
          {
            blocks,
            verb: v,
            externalComplement: undefined,
            form: {
              removeKing: true,
              shrinkServant: false,
            },
          } as T.VPSelectionComplete,
          errors
        );
      }
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
    } else {
      // transitive
      if (nps.length > 2) {
        return [];
      }
      if (nps.length === 0) {
        // present:
        //  - no king (subject)
        //  - servant (object) is shrunken
        // past:
        //  - no king (object)
        //  - servant (subject) is shrunken
        const errors: T.ParseError[] = [];
        const miniPronouns = getMiniPronouns(kids);
        if (miniPronouns.length > 1) {
          errors.push({
            message: "unknown mini-pronoun in kid's section",
          });
        }
        const blockOpts: T.VPSBlockComplete[][] = getPeopleFromMiniPronouns(
          miniPronouns
        ).map((person) =>
          !isPast
            ? [
                {
                  key: 1,
                  block: makeSubjectSelectionComplete({
                    type: "NP",
                    selection: makePronounSelection(verb.person),
                  }),
                },
                {
                  key: 2,
                  block: makeObjectSelectionComplete({
                    type: "NP",
                    selection: makePronounSelection(person),
                  }),
                },
              ]
            : [
                {
                  key: 1,
                  block: makeSubjectSelectionComplete({
                    type: "NP",
                    selection: makePronounSelection(person),
                  }),
                },
                {
                  key: 2,
                  block: makeObjectSelectionComplete({
                    type: "NP",
                    selection: makePronounSelection(verb.person),
                  }),
                },
              ]
        );
        return blockOpts.flatMap((blocks) =>
          returnParseResult(
            tokens,
            {
              blocks,
              verb: v,
              externalComplement: undefined,
              form: {
                removeKing: true,
                shrinkServant: true,
              },
            } as T.VPSelectionComplete,
            pronounConflictInBlocks(blocks)
              ? [...errors, { message: "invalid subject/object combo" }]
              : errors
          )
        );
      }
      if (nps.length === 1) {
        const np = nps[0];
        // possibilities
        // present:
        //  - no king (np is servant)
        //  - shrunken servant (np is king)
        // past:
        //  - no king (np is servant)
        //  - shrunken servant (np is king)
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
          const king: T.NPSelection = form.removeKing
            ? {
                type: "NP",
                selection: makePronounSelection(verb.person),
              }
            : np.selection;
          const servants: T.NPSelection[] = form.shrinkServant
            ? getPeopleFromMiniPronouns(kids).map((person) => ({
                type: "NP",
                selection: makePronounSelection(person),
              }))
            : [np.selection];
          // check for vp structure errors
          if (form.removeKing) {
            if (getMiniPronouns(kids).length) {
              errors.push({
                message: "unknown mini-pronoun in kid's section",
              });
            }
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
          } else if (np.inflected) {
            errors.push({
              message: !isPast
                ? "object of a past tense transitive verb should not be inflected"
                : "subject of a non-past tense transitive verb should not be inflected",
            });
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
          return blocksOps.map((blocks) => ({
            tokens,
            body: {
              blocks,
              verb: v,
              externalComplement: undefined,
              form,
            } as T.VPSelectionComplete,
            errors: pronounConflictInBlocks(blocks)
              ? [...errors, { message: "invalid subject/object combo" }]
              : errors,
          }));
        });
      } else {
        if (isPast) {
          return (
            [
              [nps[0], nps[1], false],
              [nps[1], nps[0], true],
            ] as const
          ).flatMap(([s, o, flip]) => {
            const errors: T.ParseError[] = [];
            if (
              isInvalidSubjObjCombo(
                getPersonFromNP(s.selection),
                getPersonFromNP(o.selection)
              )
            ) {
              errors.push({
                message: "invalid subject/object combo",
              });
            }
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
            if (
              isInvalidSubjObjCombo(
                getPersonFromNP(s.selection),
                getPersonFromNP(o.selection)
              )
            ) {
              errors.push({
                message: "invalid subject/object combo",
              });
            }
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
  });
}

function getMiniPronouns(kids: T.ParsedKid[]): T.ParsedMiniPronoun[] {
  return kids.filter((k): k is T.ParsedMiniPronoun =>
    ["me", "de", "ye", "mU"].includes(k)
  );
}

function getPeopleFromMiniPronouns(kids: T.ParsedKid[]): T.Person[] {
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

function negativeInPlace({
  neg,
  v,
  phIndex,
  ph,
  kids,
}: {
  neg: number;
  v: number;
  phIndex: number;
  ph: T.ParsedPH | undefined;
  kids: boolean;
}): boolean {
  if (neg === -1) {
    return true;
  }
  if (ph) {
    if (!kids && !["و", "وا"].includes(ph.s) && neg === phIndex - 1) {
      return true;
    }
    return neg === phIndex + 1;
  }
  if (neg < v - 1) {
    return false;
  }
  return true;
}

function pronounConflictInBlocks(blocks: T.VPSBlockComplete[]): boolean {
  const subj = blocks.find((b) => b.block.type === "subjectSelection")
    ?.block as T.SubjectSelectionComplete;
  const obj = blocks.find((b) => b.block.type === "objectSelection")
    ?.block as T.ObjectSelectionComplete;
  const subjPerson = getPersonFromNP(subj.selection);
  const objPerson = getPersonFromNP(obj.selection);
  if (objPerson === undefined) {
    return false;
  }
  return isInvalidSubjObjCombo(subjPerson, objPerson);
}
