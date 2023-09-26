import * as T from "../../../types";
import {
  bindParseResult,
  isNeg,
  isNonOoPh,
  isPH,
  isParsedVBE,
  isParsedVBP,
  returnParseResult,
  startsVerbSection,
} from "./utils";
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
import { LookupFunction } from "./lookup";
import { personToGenNum } from "../misc-helpers";
import { equals, zip } from "rambda";
// to hide equatives type-doubling issue

// TODO: word query for kawul/kedul/stat/dyn

// TODO: test grammatically transitive stuff
// test raaba ye wree

// TODO: way to get an error message for past participle and equative
// not matching up

// TODO: negative with perfect forms

export function parseVP(
  tokens: Readonly<T.Token[]>,
  lookup: LookupFunction
): T.ParseResult<T.VPSelectionComplete>[] {
  if (tokens.length === 0) {
    return [];
  }
  const blocks = parseBlocks(tokens, lookup, [], []);
  return bindParseResult(blocks, (tokens, { blocks, kids }) => {
    const ba = !!kids.find((k) => k === "ba");
    const miniPronouns = getMiniPronouns(kids);
    const nps = blocks.filter((x): x is T.ParsedNP => x.type === "NP");
    const verbSection = blocks.findIndex(startsVerbSection);
    // TODO: would be nice if this could pass error messages about the
    // negative being out of place etc
    if (!verbSectionOK(blocks.slice(verbSection))) {
      return [];
    }
    const tenses = getTenses(blocks, ba);
    // TODO get errors from the get tenses (perfect verbs not agreeing)
    return tenses.flatMap(({ tense, person, transitivities, negative, verb }) =>
      finishPossibleVPSs({
        tense,
        transitivities,
        nps,
        miniPronouns,
        tokens,
        negative,
        verb,
        person,
      })
    );
  });
}

function getTenses(
  blocks: T.ParsedBlock[],
  ba: boolean
): {
  tense: T.VerbTense | T.PerfectTense;
  person: T.Person;
  transitivities: T.Transitivity[];
  negative: boolean;
  verb: T.VerbEntry;
}[] {
  const negIndex = blocks.findIndex(
    (x) => x.type === "negative" && !x.imperative
  );
  const negative = negIndex !== -1;
  const phIndex = blocks.findIndex((x) => x.type === "PH");
  const vbeIndex = blocks.findIndex((x) => x.type === "VB");
  const ph = phIndex !== -1 ? (blocks[phIndex] as T.ParsedPH) : undefined;
  const verb = vbeIndex !== -1 ? (blocks[vbeIndex] as T.ParsedVBE) : undefined;
  if (!verb || verb.type !== "VB") {
    return [];
  }
  if (verb.info.type === "verb") {
    if (verb.info.aspect === "perfective") {
      if (!ph) {
        return [];
      }
    } else {
      if (ph) {
        return [];
      }
    }
    const tense = getTenseFromRootsStems(ba, verb.info.base, verb.info.aspect);
    const transitivities = getTransitivities(verb.info.verb);
    return [
      {
        tense,
        transitivities,
        negative,
        person: verb.person,
        verb: verb.info.verb,
      },
    ];
  } else {
    // perfect
    const pPart = blocks.find(
      (x) => x.type === "VB" && x.info.type === "ppart"
    ) as T.ParsedVBP | undefined;
    const equative = blocks.find(
      (x) => x.type === "VB" && x.info.type === "equative"
    ) as T.ParsedVBE | undefined;
    if (
      !pPart ||
      pPart.info.type === "ability" ||
      !equative ||
      equative.info.type !== "equative"
    ) {
      return [];
    }
    const equativeGenNum = personToGenNum(equative.person);
    if (!equals(equativeGenNum, pPart.info.genNum)) {
      return [];
    }
    const transitivities = getTransitivities(pPart.info.verb);
    const tense = getPerfectTense(ba, equative.info.tense);
    if (!tense) {
      return [];
    }
    return [
      {
        tense,
        transitivities,
        negative,
        person: equative.person,
        verb: pPart.info.verb,
      },
    ];
  }
}

function finishPossibleVPSs({
  tense,
  transitivities,
  nps,
  miniPronouns,
  negative,
  verb,
  tokens,
  person,
}: {
  tense: T.VerbTense | T.PerfectTense;
  transitivities: T.Transitivity[];
  nps: T.ParsedNP[];
  miniPronouns: T.ParsedMiniPronoun[];
  tokens: Readonly<T.Token[]>;
  negative: boolean;
  verb: T.VerbEntry;
  person: T.Person;
}): T.ParseResult<T.VPSelectionComplete>[] {
  const isPast = isPastTense(tense);
  return transitivities.flatMap<T.ParseResult<T.VPSelectionComplete>>(
    (transitivity): T.ParseResult<T.VPSelectionComplete>[] => {
      const v: T.VerbSelectionComplete = {
        type: "verb",
        verb,
        transitivity,
        canChangeTransitivity: false,
        canChangeStatDyn: false,
        negative,
        tense,
        canChangeVoice: true,
        isCompound: false,
        voice: "active",
      };
      if (transitivity === "intransitive") {
        return finishIntransitive({
          miniPronouns,
          nps,
          tokens,
          v,
          person,
        });
      } else if (transitivity === "transitive") {
        return finishTransitive({
          miniPronouns,
          nps,
          tokens,
          v,
          person,
          isPast,
        });
      } else {
        return finishGrammaticallyTransitive({
          miniPronouns,
          nps,
          tokens,
          v,
          person,
          isPast,
        });
      }
    }
  );
}

function finishIntransitive({
  miniPronouns,
  nps,
  tokens,
  v,
  person,
}: {
  miniPronouns: T.ParsedMiniPronoun[];
  nps: T.ParsedNP[];
  tokens: Readonly<T.Token[]>;
  v: T.VerbSelectionComplete;
  person: T.Person;
}): T.ParseResult<T.VPSelectionComplete>[] {
  const errors: T.ParseError[] = [];
  if (miniPronouns.length) {
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
          selection: makePronounSelection(person),
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
    return [
      {
        tokens,
        body: {
          blocks,
          verb: v,
          externalComplement: undefined,
          form: {
            removeKing: true,
            shrinkServant: false,
          },
        } as T.VPSelectionComplete,
        errors,
      },
    ];
  }
  if (getPersonFromNP(nps[0].selection) !== person) {
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
  return [
    {
      tokens,
      body: {
        blocks,
        verb: v,
        externalComplement: undefined,
        form: {
          removeKing: false,
          shrinkServant: false,
        },
      } as T.VPSelectionComplete,
      errors,
    },
  ];
}

function finishTransitive({
  miniPronouns,
  nps,
  tokens,
  v,
  person,
  isPast,
}: {
  miniPronouns: T.ParsedMiniPronoun[];
  nps: T.ParsedNP[];
  tokens: Readonly<T.Token[]>;
  v: T.VerbSelectionComplete;
  person: T.Person;
  isPast: boolean;
}): T.ParseResult<T.VPSelectionComplete>[] {
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
    if (miniPronouns.length > 1) {
      errors.push({
        message: "unknown mini-pronoun in kid's section",
      });
    }
    const blockOpts: T.VPSBlockComplete[][] = getPeopleFromMiniPronouns(
      miniPronouns
    ).map((servantPerson) =>
      !isPast
        ? [
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
                selection: makePronounSelection(servantPerson),
              }),
            },
          ]
        : [
            {
              key: 1,
              block: makeSubjectSelectionComplete({
                type: "NP",
                selection: makePronounSelection(servantPerson),
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
    ).flatMap<T.ParseResult<T.VPSelectionComplete>>((form) => {
      const errors: T.ParseError[] = [];
      const king: T.NPSelection = form.removeKing
        ? {
            type: "NP",
            selection: makePronounSelection(person),
          }
        : np.selection;
      const servants: T.NPSelection[] = form.shrinkServant
        ? getPeopleFromMiniPronouns(miniPronouns).map((person) => ({
            type: "NP",
            selection: makePronounSelection(person),
          }))
        : [np.selection];
      // check for vp structure errors
      if (form.removeKing) {
        if (miniPronouns.length) {
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
      } else {
        if (np.inflected) {
          errors.push({
            message: !isPast
              ? "object of a past tense transitive verb should not be inflected"
              : "subject of a non-past tense transitive verb should not be inflected",
          });
        }
        if (getPersonFromNP(king) !== person) {
          errors.push({
            message: `${
              isPast ? "past tense" : "non-past tense"
            } transitive verb must agree agree with ${
              isPast ? "obect" : "subject"
            }`,
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
            message: "subject of transitive past tense verb must be inflected",
          });
        }
        if (o.inflected) {
          errors.push({
            message:
              "object of past tense transitive verb must not be inflected",
          });
        }
        if (getPersonFromNP(o.selection) !== person) {
          errors.push({
            message: "past tense transitive verb must agree with the object",
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
        if (getPersonFromNP(s.selection) !== person) {
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

function finishGrammaticallyTransitive({
  miniPronouns,
  nps,
  tokens,
  v,
  person,
  isPast,
}: {
  miniPronouns: T.ParsedMiniPronoun[];
  nps: T.ParsedNP[];
  tokens: Readonly<T.Token[]>;
  v: T.VerbSelectionComplete;
  person: T.Person;
  isPast: boolean;
}): T.ParseResult<T.VPSelectionComplete>[] {
  const errors: T.ParseError[] = [];
  if (isPast) {
    if (nps.length === 1) {
      if (miniPronouns.length) {
        errors.push({
          message: "unknown mini-pronoun",
        });
      }
      if (person !== T.Person.ThirdPlurMale) {
        errors.push({
          message:
            "grammatically transitive verb must be 3rd pers. masc. plur.",
        });
      }
      if (isPast && !nps[0].inflected) {
        errors.push({
          message:
            "subject of past tense grammatically transitive verb must be inflected",
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
            selection: T.Person.ThirdPlurMale,
          },
        },
      ];
      return [
        {
          tokens,
          body: {
            blocks,
            verb: v,
            externalComplement: undefined,
            form: {
              removeKing: false,
              shrinkServant: false,
            },
          } as T.VPSelectionComplete,
          errors,
        },
      ];
    } else if (nps.length === 0) {
      if (miniPronouns.length > 1) {
        errors.push({
          message: "unknown mini-pronoun",
        });
      }
      if (miniPronouns.length === 0) {
        errors.push({
          message: "subject required for grammatically transitive verb",
        });
      }
      if (person !== T.Person.ThirdPlurMale) {
        errors.push({
          message:
            "grammatically transitive verb must be 3rd pers. masc. plur.",
        });
      }
      return getPeopleFromMiniPronouns(miniPronouns).map((person) => {
        const blocks: T.VPSBlockComplete[] = [
          {
            key: 1,
            block: makeSubjectSelectionComplete({
              type: "NP",
              selection: makePronounSelection(person),
            }),
          },
          {
            key: 2,
            block: {
              type: "objectSelection",
              selection: T.Person.ThirdPlurMale,
            },
          },
        ];
        return {
          tokens,
          body: {
            blocks,
            verb: v,
            externalComplement: undefined,
            form: {
              removeKing: false,
              shrinkServant: true,
            },
          } as T.VPSelectionComplete,
          errors,
        };
      });
    }
  } else {
    // non-past
    if (miniPronouns.length) {
      errors.push({
        message: "unknown mini-pronoun",
      });
    }
    if (nps.length === 1) {
      const subj = nps[0];
      if (person !== getPersonFromNP(subj.selection)) {
        errors.push({
          message: "non-past verb must agree with subject",
        });
      }
      if (nps[0].inflected) {
        errors.push({
          message:
            "subject of non-past tense grammatically transitive verb must not be inflected",
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
            selection: T.Person.ThirdPlurMale,
          },
        },
      ];
      return [
        {
          tokens,
          body: {
            blocks,
            verb: v,
            externalComplement: undefined,
            form: {
              removeKing: false,
              shrinkServant: false,
            },
          } as T.VPSelectionComplete,
          errors,
        },
      ];
    } else if (nps.length === 0) {
      if (miniPronouns.length > 1) {
        errors.push({
          message: "unknown mini-pronoun",
        });
      }
      const blocks: T.VPSBlockComplete[] = [
        {
          key: 1,
          block: makeSubjectSelectionComplete({
            type: "NP",
            selection: makePronounSelection(person),
          }),
        },
        {
          key: 2,
          block: {
            type: "objectSelection",
            selection: T.Person.ThirdPlurMale,
          },
        },
      ];
      return [
        {
          tokens,
          body: {
            blocks,
            verb: v,
            externalComplement: undefined,
            form: {
              removeKing: true,
              shrinkServant: false,
            },
          } as T.VPSelectionComplete,
          errors,
        },
      ];
    }
  }
  return [];
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

function verbSectionOK(blocks: T.ParsedBlock[]): boolean {
  const possibilites = [
    [isParsedVBE],
    [isNeg, isParsedVBE],
    [isPH, isParsedVBE],
    [isPH, isNeg, isParsedVBE],
    [isNeg, isNonOoPh, isParsedVBE],
    [isParsedVBP, isParsedVBE],
    [isNeg, isParsedVBE, isParsedVBP],
    [isParsedVBP, isNeg, isParsedVBE],
    // could be more clever with optional isPH here
    [isPH, isParsedVBP, isParsedVBE],
    [isPH, isNeg, isParsedVBE, isParsedVBP],
    [isPH, isParsedVBP, isNeg, isParsedVBE],
  ];
  return possibilites.some(
    (ps) =>
      ps.length === blocks.length && zip(ps, blocks).every(([p, b]) => p(b))
  );
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

function getTransitivities(v: T.VerbEntry): T.Transitivity[] {
  const transitivities: T.Transitivity[] = [];
  const opts = v.entry.c.split("/");
  opts.forEach((opt) => {
    if (opt.includes("gramm. trans")) {
      transitivities.push("grammatically transitive");
    } else if (opt.includes("intran")) {
      transitivities.push("intransitive");
    } else if (opt.includes("trans")) {
      transitivities.push("transitive");
    }
  });
  return transitivities;
}

function getPerfectTense(
  ba: boolean,
  tense: T.EquativeTenseWithoutBa
): T.PerfectTense | undefined {
  const et = getEquativeTense(ba, tense);
  if (!et) return undefined;
  return `${et}Perfect`;
}

function getEquativeTense(
  ba: boolean,
  tense: T.EquativeTenseWithoutBa
): T.EquativeTense | undefined {
  if (ba) {
    if (tense === "habitual") {
      return "future";
    }
    if (tense === "past") {
      return "wouldBe";
    }
    if (tense === "pastSubjunctive") {
      return "wouldHaveBeen";
    }
    // illegal use of ba
    return undefined;
  }
  return tense;
}
