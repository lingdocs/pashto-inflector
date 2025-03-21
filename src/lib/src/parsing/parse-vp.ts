import * as T from "../../../types";
import {
  addShrunkenPossesor,
  bindParseResult,
  canTakeShrunkenPossesor,
  isNeg,
  isNonOoPh,
  isPH,
  isParsedVBE,
  isParsedVBP,
  returnParseResult,
  startsVerbSection,
} from "./utils";
import {
  getObjectSelection,
  getSubjectSelection,
  makeObjectSelectionComplete,
  makeSubjectSelectionComplete,
} from "../phrase-building/blocks-utils";
import {
  getPersonFromNP,
  isInvalidSubjObjCombo,
  isPastTense,
  takesExternalComplement,
} from "../phrase-building/vp-tools";
import { parseBlocks } from "./parse-blocks";
import {
  makeNounSelection,
  makePronounSelection,
} from "../phrase-building/make-selections";
import { isFirstOrSecondPersPronoun } from "../phrase-building/render-vp";
import { isSecondPerson, personToGenNum } from "../misc-helpers";
import { equals, zip } from "rambda";
import { isImperativeTense } from "../type-predicates";
import { isKedulStatEntry } from "./parse-verb-helpers";
import { dartlul, raatlul, tlul, wartlul } from "./irreg-verbs";
import { personsFromPattern1 } from "./parse-noun-word";
import { fFlatMapParseResult } from "../fp-ps";
import { dynamicAuxVerbs } from "../dyn-comp-aux-verbs";
import { complementTakesKingship } from "../phrase-building/complement-tools";
// to hide equatives type-doubling issue

// TODO: problem with 3rd pers sing verb endings اواز مې دې واورېده

// TODO: test all types with pronouns
// TODO: way to get an error message for past participle and equative
// not matching up

// TODO: kenaastulay shum should be imperfective AND perfective
// TODO: why are some ability verbs coming out double??
// TOOD: how to handle the roots and stems lookup for ability - with things like بوتلل

// TODO: This parses extra options with demonstratives کور ته دې بوتلی شم

// TODO: زه د هغې غټې ښځې کور شوم - should work

// TODO: زما غټه ښځه وینې - throws "complement link broken"
// FOR display - Verb blocks should display VBP - VBE somehow
// TODO: راشه is broken

export function parseVP(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.VPSelectionComplete>[] {
  if (tokens.length === 0) {
    return [];
  }
  const blocks = parseBlocks(tokens, dictionary, [], []);
  return bindParseResult(
    createPossesivePossibilities(blocks),
    (tokens, { blocks, kids }) => {
      const ba = kids.some((k) => k === "ba");
      const miniPronouns = getMiniPronouns(kids);
      const npsAndAps = blocks.filter(
        (x): x is T.ParsedNP | T.APSelection =>
          x.type === "NP" || x.type === "AP"
      );
      const exComplement = blocks.find((b) => b.type === "complement");
      const verbSectionBoundary = blocks.findIndex(startsVerbSection);
      // TODO: would be nice if this could pass error messages about the
      // negative being out of place etc
      if (!verbSectionOK(blocks.slice(verbSectionBoundary))) {
        return [];
      }
      const tenses = getTenses(blocks, ba);
      // TODO get errors from the get tenses (perfect verbs not agreeing)
      return tenses.flatMap(
        ({ tense, person, transitivities, negative, verb }) =>
          finishPossibleVPSs({
            tense,
            transitivities,
            npsAndAps,
            exComplement,
            miniPronouns,
            tokens,
            negative,
            verb,
            person,
            dictionary,
          })
      );
    }
  );
}

function getTenses(
  blocks: T.ParsedBlock[],
  ba: boolean
): {
  tense: T.VerbTense | T.PerfectTense | T.AbilityTense | T.ImperativeTense;
  person: T.Person;
  transitivities: T.Transitivity[];
  negative: boolean;
  verb: T.VerbEntry;
}[] {
  const negIndex = blocks.findIndex((x) => x.type === "negative");
  const negative: T.NegativeBlock | undefined = blocks[negIndex] as
    | T.NegativeBlock
    | undefined;
  const phIndex = blocks.findIndex((x) => x.type === "PH");
  // TODO: would be nicer if there were clear taggin gfor "VBP" vs "VBE" !!
  const vbeIndex = blocks.findIndex((x) => x.type === "VB" && !isVBP(x));
  const vbpIndex = blocks.findIndex((x) => x.type === "VB" && isVBP(x));
  const ph = phIndex !== -1 ? (blocks[phIndex] as T.ParsedPH) : undefined;
  const verb = vbeIndex !== -1 ? (blocks[vbeIndex] as T.ParsedVBE) : undefined;
  const vbp = vbpIndex !== -1 ? (blocks[vbpIndex] as T.ParsedVBP) : undefined;
  if (!verb || verb.type !== "VB") {
    return [];
  }
  if (verb.info.type === "verb") {
    if (!verb.info.imperative && negative && negative.imperative) {
      // TODO: return errors here
      return [];
    }
    const abilityTense = getAbilityTense(ba, verb, vbp);
    if (vbp && !abilityTense) {
      return [];
    }
    const mainV =
      abilityTense && vbp && vbp.info.type === "ability" ? vbp.info : verb.info;
    const aspect = mainV.aspect;
    if (aspect === "perfective") {
      if (!ph && mainV.type !== "verb" && isKedulStatEntry(mainV.verb.entry))
        return [];
    } else {
      if (ph) return [];
    }

    const tense = abilityTense
      ? undefined
      : getTenseFromRootsStems(
          ba,
          verb.info.base,
          verb.info.aspect,
          !!negative,
          verb.info.imperative
        );
    if (!tense && !abilityTense) {
      return [];
    }
    const transitivities =
      abilityTense && vbp
        ? getTransitivities(vbp.info.verb)
        : getTransitivities(verb.info.verb);
    const verbEntry = vbp ? vbp.info.verb : checkForTlulCombos(verb, ph);
    if (!verbEntry) return [];
    if (abilityTense) {
      if (!vbp) {
        throw new Error("VBP should exist in ability verb");
      }
      return [
        {
          tense: abilityTense,
          transitivities,
          negative: !!negative,
          person: verb.person,
          verb: vbp.info.verb,
        },
      ];
    }
    if (!tense) {
      return [];
    }
    return [
      {
        tense,
        transitivities,
        negative: !!negative,
        person: verb.person,
        verb: verbEntry,
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
        negative: !!negative,
        person: equative.person,
        verb: pPart.info.verb,
      },
    ];
  }
}

function checkForTlulCombos(
  verb: T.ParsedVBE,
  ph: T.ParsedPH | undefined
): T.VerbEntry | undefined {
  if (verb.info.type === "equative") {
    throw new Error("should not be equative here");
  }
  if (!ph) {
    return verb.info.verb;
  }
  if (["را", "ور", "در"].includes(ph.s) || ph.s.startsWith("لاړ")) {
    if (
      !(
        isKedulStatEntry(verb.info.verb.entry) &&
        verb.info.aspect === "perfective" &&
        verb.info.base === "stem"
      )
    ) {
      return undefined;
    }
    const personsFromLar = personsFromPattern1("لاړ", ph.s);
    if (personsFromLar.includes(verb.person)) {
      return tlul;
    }
    if (ph.s === "را") {
      return raatlul;
    }
    if (ph.s === "در") {
      return dartlul;
    }
    if (ph.s === "ور") {
      return wartlul;
    }
    return undefined;
  }
  return verb.info.verb;
}

function finishPossibleVPSs({
  tense,
  transitivities,
  npsAndAps,
  exComplement,
  miniPronouns,
  negative,
  verb,
  tokens,
  person,
  dictionary,
}: {
  tense: T.VerbTense | T.PerfectTense | T.AbilityTense | T.ImperativeTense;
  transitivities: T.Transitivity[];
  npsAndAps: (T.ParsedNP | T.APSelection)[];
  exComplement: T.ParsedComplementSelection | undefined;
  miniPronouns: T.ParsedMiniPronoun[];
  tokens: Readonly<T.Token[]>;
  negative: boolean;
  verb: T.VerbEntry;
  person: T.Person;
  dictionary: T.DictionaryAPI;
}): T.ParseResult<T.VPSelectionComplete>[] {
  const isPast = isPastTense(tense);
  return transitivities
    .flatMap<T.ParseResult<T.VPSelectionComplete>>(
      (transitivity): T.ParseResult<T.VPSelectionComplete>[] => {
        const v: T.VerbSelectionComplete = {
          type: "verb",
          verb,
          transitivity,
          canChangeTransitivity: false,
          canChangeStatDyn: false,
          negative,
          tense,
          canChangeVoice: transitivity === "transitive",
          isCompound: false,
          voice: "active",
        };
        if (transitivity === "intransitive") {
          return finishIntransitive({
            miniPronouns,
            npsAndAps,
            exComplement,
            tokens,
            v,
            person,
          });
        } else if (transitivity === "transitive") {
          return fFlatMapParseResult(
            checkForDynamicCompound(dictionary),
            finishTransitive({
              miniPronouns,
              npsAndAps,
              exComplement,
              tokens,
              v,
              person,
              isPast,
            })
          );
        } else {
          if (exComplement) {
            return [];
          }
          return finishGrammaticallyTransitive({
            miniPronouns,
            npsAndAps,
            tokens,
            v,
            person,
            isPast,
          });
        }
      }
    )
    .filter(checkImperative2ndPers);
}

/**
 * This returns multiple possibilities because for example
 * ماشوم وهل - could mean adopt (?) (dyn compound) or to hit a child
 * (simple verb وهل)
 */
function checkForDynamicCompound(dictionary: T.DictionaryAPI) {
  return (vps: T.VPSelectionComplete): T.VPSelectionComplete[] => {
    if (vps.verb.transitivity !== "transitive") {
      return [vps];
    }
    const object: T.ObjectSelection | undefined = getObjectSelection(
      vps.blocks
    );
    if (
      !object ||
      typeof object.selection !== "object" ||
      object.selection.selection.type !== "noun"
    ) {
      return [vps];
    }
    const dynAuxVerb = dynamicAuxVerbs.find(
      (v) => v.entry.p === vps.verb.verb.entry.p
    ) as T.VerbEntryNoFVars | undefined;
    if (!dynAuxVerb) {
      return [vps];
    }
    const dynCompoundVerbs = dictionary
      .verbEntryLookupByL(object.selection.selection.entry.ts)
      .filter((e) => e.entry.c.includes("dyn."));
    if (!dynCompoundVerbs.length) {
      return [vps];
    }
    const dynCompoundVerb = dynCompoundVerbs[0];
    return [
      {
        ...vps,
        // TODO: could be more efficient by getting index first
        blocks: vps.blocks.map(markObjAsDynamicComplement),
        verb: {
          ...vps.verb,
          verb: dynCompoundVerb,
          dynAuxVerb,
          isCompound: "dynamic",
        },
      },
      vps,
    ];
  };
}

function markObjAsDynamicComplement(b: T.VPSBlockComplete): T.VPSBlockComplete {
  if (
    b.block.type === "objectSelection" &&
    typeof b.block.selection === "object" &&
    b.block.selection.selection.type === "noun"
  ) {
    // TODO: some lense work would be nice here instead of having to do all this
    return {
      ...b,
      block: {
        ...b.block,
        selection: {
          ...b.block.selection,
          selection: {
            ...b.block.selection.selection,
            dynamicComplement: true,
          },
        },
      },
    };
  }
  return b;
}

function checkImperative2ndPers({
  body: vps,
}: T.ParseResult<T.VPSelectionComplete>): boolean {
  if (!isImperativeTense(vps.verb.tense)) {
    return true;
  }
  const subjectPerson = getPersonFromNP(
    getSubjectSelection(vps.blocks).selection
  );
  return isSecondPerson(subjectPerson);
}

function finishIntransitive({
  miniPronouns,
  npsAndAps,
  exComplement,
  tokens,
  v,
  person,
}: {
  miniPronouns: T.ParsedMiniPronoun[];
  npsAndAps: (T.ParsedNP | T.APSelection)[];
  exComplement: T.ParsedComplementSelection | undefined;
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
  const nps = npsAndAps.filter((x): x is T.ParsedNP => x.type === "NP");
  if (nps.length > 1) {
    return [];
  }
  // TODO: abstract and reuse these few lines of checking
  const exCompStatus = takesExternalComplement(v.verb);
  if (exCompStatus === "no" && exComplement) {
    return [];
  }
  if (exCompStatus === "req" && !exComplement) {
    return [];
  }
  const [externalComplement, compErrors] = checkExComp(exComplement, person);
  if (nps.length === 0) {
    const subject = makeSubjectSelectionComplete({
      type: "NP",
      selection: makePronounSelection(person),
    });
    const compKing = complementTakesKingship(
      subject.selection,
      externalComplement
    );
    if (compKing && person !== getPersonFromNP(compKing)) {
      errors.push({ message: "verb must agree with complement in this case" });
    }
    const blocks: T.VPSBlockComplete[] = [
      ...mapOutnpsAndAps([], npsAndAps),
      {
        key: 3456,
        block: subject,
      },
      {
        key: 2345,
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
          externalComplement,
          form: {
            removeKing: true,
            shrinkServant: false,
          },
        } as T.VPSelectionComplete,
        errors: [...errors, ...compErrors],
      },
    ];
  }
  const np = nps[0].selection;
  const subjectPerson = getPersonFromNP(np);
  const compKing = complementTakesKingship(np, externalComplement);
  if (isImperativeTense(v.tense) && !isSecondPerson(subjectPerson)) {
    return [];
  }
  if (nps[0].inflected) {
    errors.push({
      message: "subject of intransitive verb must not be inflected",
    });
  }
  if (!compKing && subjectPerson !== person) {
    errors.push({
      message: "subject and verb must agree for intransitive verb",
    });
  } else if (compKing && getPersonFromNP(compKing)) {
    errors.push({ message: "verb must agree with complement in this case" });
  }
  const blocks: T.VPSBlockComplete[] = [
    ...mapOutnpsAndAps(["S"], npsAndAps),
    {
      key: 2345,
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
        externalComplement,
        form: {
          removeKing: false,
          shrinkServant: false,
        },
      } as T.VPSelectionComplete,
      errors: [...errors, ...compErrors],
    },
  ];
}

function finishTransitive({
  miniPronouns,
  npsAndAps,
  exComplement,
  tokens,
  v,
  person,
  isPast,
}: {
  miniPronouns: T.ParsedMiniPronoun[];
  npsAndAps: (T.ParsedNP | T.APSelection)[];
  exComplement: T.ParsedComplementSelection | undefined;
  tokens: Readonly<T.Token[]>;
  v: T.VerbSelectionComplete;
  person: T.Person;
  isPast: boolean;
}): T.ParseResult<T.VPSelectionComplete>[] {
  const nps = npsAndAps.filter((x): x is T.ParsedNP => x.type === "NP");
  // transitive
  if (nps.length > 2) {
    return [];
  }
  // TODO: abstract and reuse these few lines of checking
  const exCompStatus = takesExternalComplement(v.verb);
  if (exCompStatus === "no" && exComplement) {
    return [];
  }
  if (exCompStatus === "req" && !exComplement) {
    return [];
  }
  const [externalComplement, compErrors] = checkExComp(exComplement, person);
  return (
    nps.length === 2
      ? finishTransitiveWTwoNPs(nps)
      : nps.length === 1
      ? finishTransitiveWOneNP(nps[0])
      : finishTransitiveWNoNPs
  )({
    miniPronouns,
    npsAndAps,
    externalComplement,
    tokens,
    v,
    isPast,
    compErrors,
    person,
  });
}

function finishTransitiveWNoNPs({
  miniPronouns,
  npsAndAps,
  externalComplement,
  tokens,
  v,
  person,
  isPast,
  compErrors,
}: {
  miniPronouns: T.ParsedMiniPronoun[];
  npsAndAps: (T.ParsedNP | T.APSelection)[];
  externalComplement: T.ComplementSelection | undefined;
  tokens: Readonly<T.Token[]>;
  v: T.VerbSelectionComplete;
  person: T.Person;
  isPast: boolean;
  compErrors: T.ParseError[];
}): T.ParseResult<T.VPSelectionComplete>[] {
  // present:
  //  - dropped king (subject)
  //  - servant (object) is shrunken
  // past:
  //  - dropped king (object)
  //  - servant (subject) is shrunken
  const errors: T.ParseError[] = [];
  if (miniPronouns.length > 1) {
    errors.push({
      message: "unknown mini-pronoun in kid's section",
    });
  }
  const newKing = externalComplement
    ? complementTakesKingship(
        {
          type: "NP",
          // dummy noun here becuase the king and servant are shrunk anyways
          selection: makeNounSelection(
            {
              ts: 1527812828,
              p: "کور",
              f: "kor",
              e: "house, home",
              r: 4,
              c: "n. m.",
              a: 3,
              i: 13468,
              g: "kor",
            } as T.NounEntry,
            undefined
          ),
        },
        externalComplement
      )
    : false;
  if (newKing) {
    const king = getPersonFromNP(newKing);
    if (person !== king) {
      errors.push({
        // TODO: better message with complement error
        message: `the verb must agree with the complement`,
      });
    }
  }
  const blockOpts: T.VPSBlockComplete[][] = getPeopleFromMiniPronouns(
    miniPronouns
  ).map((servantPerson) =>
    !isPast
      ? [
          ...mapOutnpsAndAps([], npsAndAps),
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
          ...mapOutnpsAndAps([], npsAndAps),
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
        externalComplement,
        form: {
          removeKing: true,
          shrinkServant: true,
        },
      } as T.VPSelectionComplete,
      pronounConflictInBlocks(blocks)
        ? [
            ...errors,
            ...compErrors,
            { message: "invalid subject/object combo" },
          ]
        : [...errors, ...compErrors]
    )
  );
}

function finishTransitiveWOneNP(np: T.ParsedNP) {
  return function ({
    miniPronouns,
    npsAndAps,
    externalComplement,
    tokens,
    v,
    person,
    isPast,
    compErrors,
  }: {
    miniPronouns: T.ParsedMiniPronoun[];
    npsAndAps: (T.ParsedNP | T.APSelection)[];
    externalComplement: T.ComplementSelection | undefined;
    tokens: Readonly<T.Token[]>;
    v: T.VerbSelectionComplete;
    person: T.Person;
    isPast: boolean;
    compErrors: T.ParseError[];
  }): T.ParseResult<T.VPSelectionComplete>[] {
    // TODO: ERRORS when using NP as complement
    // - هغه مې ښځه کړه thinks it's imperative and crashes
    // -  هغه مې سړی کړ - uses extra maa ?!
    // TO resolve this maybe just do seperate step when we have NP comp target
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
      // TODO: this is wrong I think?
      const king: T.NPSelection = form.removeKing
        ? {
            type: "NP",
            selection: makePronounSelection(person),
          }
        : np.selection;
      const compTarget = complementTakesKingship(king, externalComplement);
      const servants: T.NPSelection[] = form.shrinkServant
        ? getPeopleFromMiniPronouns(miniPronouns).map((person) => ({
            type: "NP",
            selection: makePronounSelection(person),
          }))
        : [np.selection];
      if (form.removeKing) {
        if (miniPronouns.length) {
          errors.push({
            message: "unknown mini-pronoun in kid's section",
          });
        }
        if (!isPast) {
          const shouldInflect = isFirstOrSecondPersPronoun(np.selection);
          if (shouldInflect && !np.inflected) {
            errors.push({
              message:
                "first or second pronoun object of non-past transitive verb must be inflected",
            });
          } else if (!shouldInflect && np.inflected) {
            errors.push({
              message:
                "object of non-past transitive verb should not be inflected",
            });
          }
        } /* isPast */ else {
          if (
            externalComplement &&
            externalComplement.selection.type === "NP" &&
            person !== getPersonFromNP(externalComplement.selection)
          ) {
            errors.push({ message: "verb should agree with complement NP" });
          }
          if (!np.inflected) {
            errors.push({
              message: "object of past transitive verb must be inflected",
            });
          }
        }
      } /* form.shrinkServant*/ else {
        if (miniPronouns.length > 1) {
          errors.push({ message: "unknown mini-pronoun" });
        } else if (miniPronouns.length === 0) {
          errors.push({ message: "shrunken servant missing" });
        }
        if (np.inflected) {
          errors.push({
            message: !isPast
              ? "subject of a non-past tense transitive verb should not be inflected"
              : "object of a past tense transitive verb should not be inflected",
          });
        }
        if (isPast) {
          // zu de ooleedum
          const k = compTarget || king;
          if (getPersonFromNP(k) !== person) {
            errors.push({
              message: `past-tense transitive verb must agree with ${
                compTarget ? "NP complement" : "object"
              }`,
            });
          }
        }
      }
      // TODO: does this work with the complement target
      const blocksOps: T.VPSBlockComplete[][] = servants.map<
        T.VPSBlockComplete[]
      >((servant) =>
        !isPast && form.removeKing
          ? [
              {
                key: 2345,
                block: makeSubjectSelectionComplete(king),
              },
              ...mapOutnpsAndAps(["O"], npsAndAps),
            ]
          : !isPast && form.shrinkServant
          ? [
              ...mapOutnpsAndAps(["S"], npsAndAps),
              {
                key: 2346,
                block: makeObjectSelectionComplete(servant),
              },
            ]
          : isPast && form.removeKing
          ? [
              ...mapOutnpsAndAps(["S"], npsAndAps),
              {
                key: 2345,
                block: makeObjectSelectionComplete(king),
              },
            ]
          : [
              {
                key: 2346,
                block: makeSubjectSelectionComplete(servant),
              },
              ...mapOutnpsAndAps(["O"], npsAndAps),
            ]
      );
      return blocksOps.map((blocks) => ({
        tokens,
        body: {
          blocks,
          verb: v,
          externalComplement,
          form,
        } as T.VPSelectionComplete,
        errors: pronounConflictInBlocks(blocks)
          ? [
              ...errors,
              ...compErrors,
              { message: "invalid subject/object combo" },
            ]
          : [...errors, ...compErrors],
      }));
    });
  };
}

function finishTransitiveWTwoNPs(nps: T.ParsedNP[]) {
  return function ({
    miniPronouns,
    npsAndAps,
    externalComplement,
    tokens,
    v,
    person,
    isPast,
    compErrors,
  }: {
    miniPronouns: T.ParsedMiniPronoun[];
    npsAndAps: (T.ParsedNP | T.APSelection)[];
    externalComplement: T.ComplementSelection | undefined;
    tokens: Readonly<T.Token[]>;
    v: T.VerbSelectionComplete;
    person: T.Person;
    isPast: boolean;
    compErrors: T.ParseError[];
  }): T.ParseResult<T.VPSelectionComplete>[] {
    // both NPS are present
    const miniPronErrors: T.ParseError[] = miniPronouns.length
      ? [{ message: "unknown mini-pronoun" }]
      : [];
    if (isPast) {
      return (
        [
          [nps[0], nps[1], false],
          [nps[1], nps[0], true],
        ] as const
      ).flatMap(([s, o, flip]) => {
        const errors: T.ParseError[] = [];
        const compTarget = complementTakesKingship(
          o.selection,
          externalComplement
        );
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
        if (compTarget) {
          if (getPersonFromNP(compTarget) !== person) {
            errors.push({
              message:
                "past tense transitive verb must agree with complement NP in this case",
            });
          }
        } else if (getPersonFromNP(o.selection) !== person) {
          errors.push({
            message: "past tense transitive verb must agree with the object",
          });
        }
        return returnParseResult(
          tokens,
          {
            blocks: mapOutnpsAndAps(!flip ? ["S", "O"] : ["O", "S"], npsAndAps),
            verb: v,
            externalComplement,
            form: {
              removeKing: false,
              shrinkServant: false,
            },
          } as T.VPSelectionComplete,
          [...miniPronErrors, ...errors]
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
        return returnParseResult(
          tokens,
          {
            blocks: mapOutnpsAndAps(!flip ? ["S", "O"] : ["O", "S"], npsAndAps),
            verb: v,
            externalComplement,
            form: {
              removeKing: false,
              shrinkServant: false,
            },
          } as T.VPSelectionComplete,
          [...miniPronErrors, ...errors, ...compErrors]
        );
      });
    }
  };
}

function finishGrammaticallyTransitive({
  miniPronouns,
  npsAndAps,
  tokens,
  v,
  person,
  isPast,
}: {
  miniPronouns: T.ParsedMiniPronoun[];
  npsAndAps: (T.ParsedNP | T.APSelection)[];
  tokens: Readonly<T.Token[]>;
  v: T.VerbSelectionComplete;
  person: T.Person;
  isPast: boolean;
}): T.ParseResult<T.VPSelectionComplete>[] {
  const nps = npsAndAps.filter((x): x is T.ParsedNP => x.type === "NP");
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
        ...mapOutnpsAndAps(["S"], npsAndAps),
        {
          key: 2345,
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
          ...mapOutnpsAndAps([], npsAndAps),
          {
            key: 2345,
            block: makeSubjectSelectionComplete({
              type: "NP",
              selection: makePronounSelection(person),
            }),
          },
          {
            key: 3456,
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
        ...mapOutnpsAndAps(["S"], npsAndAps),
        {
          key: 2345,
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
        ...mapOutnpsAndAps([], npsAndAps),
        {
          key: 1234,
          block: makeSubjectSelectionComplete({
            type: "NP",
            selection: makePronounSelection(person),
          }),
        },
        {
          key: 2345,
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
  for (const k of kids) {
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

function getAbilityTense(
  hasBa: boolean,
  vbe: T.ParsedVBE,
  vbp: T.ParsedVBP | undefined
): T.AbilityTense | undefined {
  if (vbe.info.type === "equative") {
    return undefined;
  }
  if (!vbp || vbp.info.type !== "ability") {
    return undefined;
  }
  if (!isKedulStatEntry(vbe.info.verb.entry)) {
    return undefined;
  }
  const aspect = vbp.info.aspect;
  const base = vbe.info.base;
  return `${tenseFromAspectBaseBa(aspect, base, hasBa)}Modal`;
}

function tenseFromAspectBaseBa(
  aspect: T.Aspect,
  base: "root" | "stem",
  hasBa: boolean
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

function getTenseFromRootsStems(
  hasBa: boolean,
  base: "root" | "stem",
  aspect: T.Aspect,
  negative: boolean,
  imperative: boolean | undefined
): T.VerbTense | T.ImperativeTense | undefined {
  if (imperative) {
    if (base === "root") {
      return undefined;
    }
    if (hasBa) {
      return undefined;
    }
    return aspect === "imperfective" || negative
      ? "imperfectiveImperative"
      : "perfectiveImperative";
  }
  return tenseFromAspectBaseBa(aspect, base, hasBa);
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

/**
 * Make existing NP blocks into the Subject and Object selection
 * in the given order
 */
function mapOutnpsAndAps(
  npOrder: ("S" | "O")[],
  blocks: (T.APSelection | T.ParsedNP)[]
): T.VPSBlockComplete[] {
  const queue = [...npOrder];
  return blocks.map((x, i): T.VPSBlockComplete => {
    if (x.type === "NP") {
      const c = queue.shift();
      if (!c) {
        throw new Error("invalid NP order in parsing");
      }
      return {
        key: i,
        block: (c === "S"
          ? makeSubjectSelectionComplete
          : makeObjectSelectionComplete)(x.selection),
      };
    } else {
      return {
        key: i,
        block: x,
      };
    }
  });
}

/**
 * Given a set of blocks and kids, produces all possible arrangements
 * with the mini-pronouns being used as possesives, or not
 *
 * Case 1: no mini pronouns
 *  1. return as is
 *
 * Case 2: one mini pronoun
 *  1. don't use any as possesive
 *  2. use the mini pronoun as a possesive (in all possible places)
 *
 * Case 3: two mini pronouns
 *  1. don't use any as possesive
 *  2. use first as possesive
 *  3. use second as possesive
 *  4. use both as possesives
 *
 * @param blocks
 * @returns
 */
function createPossesivePossibilities(
  blocks: T.ParseResult<{
    kids: T.ParsedKid[];
    blocks: T.ParsedBlock[];
  }>[]
): T.ParseResult<{
  kids: T.ParsedKid[];
  blocks: T.ParsedBlock[];
}>[] {
  function pullOutMiniPronoun(
    body: {
      kids: T.ParsedKid[];
      blocks: T.ParsedBlock[];
    },
    pos: 0 | 1
  ): {
    adjusted: {
      kids: T.ParsedKid[];
      blocks: T.ParsedBlock[];
    };
    miniPronoun: T.ParsedMiniPronoun;
  } {
    const miniPronoun = getMiniPronouns(body.kids)[pos];
    if (!miniPronoun) {
      throw new Error("tried to pull out non-existent mini-pronoun");
    }
    return {
      miniPronoun,
      adjusted: {
        kids: body.kids.filter((x) => x !== miniPronoun),
        blocks: body.blocks,
      },
    };
  }
  function spreadOutPoss(
    body: {
      kids: T.ParsedKid[];
      blocks: T.ParsedBlock[];
    },
    pos: 0 | 1
  ): {
    kids: T.ParsedKid[];
    blocks: T.ParsedBlock[];
  }[] {
    const { miniPronoun, adjusted } = pullOutMiniPronoun(body, pos);
    const people = getPeopleFromMiniPronouns([miniPronoun]);
    return adjusted.blocks
      .flatMap((x, i) => {
        if (canTakeShrunkenPossesor(x)) {
          return addPossesiveAtIndex(people, adjusted.blocks, i);
        } else {
          return [];
        }
      })
      .map((xb) => ({
        kids: adjusted.kids,
        blocks: xb,
      }));
  }
  function addPossesiveAtIndex(
    people: T.Person[],
    blocks: T.ParsedBlock[],
    i: number
  ): T.ParsedBlock[][] {
    const v = people.map((person) =>
      blocks.map((x, j) => {
        if (i !== j) return x;
        const r = addShrunkenPossesor(x, person);
        return r || x;
      })
    );
    return v;
  }
  return blocks.flatMap((b) => {
    const miniPronouns = getMiniPronouns(b.body.kids);
    if (miniPronouns.length === 0) {
      return b;
    } else if (miniPronouns.length === 1) {
      const withFirstMiniAsPossesive = spreadOutPoss(b.body, 0);
      return [b.body, ...withFirstMiniAsPossesive].map((x) => ({
        tokens: b.tokens,
        body: x,
        errors: b.errors,
      }));
    } else {
      const withFirstMiniAsPossesive = spreadOutPoss(b.body, 0);
      const withSecondMiniAsPossesive = spreadOutPoss(b.body, 1);
      return [
        // using none of the mini-pronouns as possesives
        b.body,
        // using the first mini-pronoun as a possesive
        ...withFirstMiniAsPossesive,
        // using the second mini-pronoun as a prossesive
        ...withSecondMiniAsPossesive,
        // using both mini pronouns as possesives
        ...withFirstMiniAsPossesive.flatMap((x) => spreadOutPoss(x, 0)),
      ].map((x) => ({
        tokens: b.tokens,
        body: x,
        errors: b.errors,
      }));
    }
  });
}

// TODO: this should be replaced with tagging in objects
function isVBP(x: T.ParsedVBE | T.ParsedVBP): x is T.ParsedVBP {
  return x.info.type === "ability" || x.info.type === "ppart";
}

function checkExComp(
  comp: T.ParsedComplementSelection | undefined,
  person: T.Person
): [T.ComplementSelection | undefined, T.ParseError[]] {
  if (!comp) {
    return [undefined, []];
  }
  if ("inflection" in comp.selection) {
    const errors: T.ParseError[] = [];
    const { gender, number } = personToGenNum(person);
    if (!comp.selection.gender.includes(gender)) {
      errors.push({
        message: "gender of verb and complement adjective must match",
      });
    }
    if (
      (number === "singular" && !comp.selection.inflection.includes(0)) ||
      (number === "plural" && !comp.selection.inflection.includes(1))
    ) {
      // TODO: better message here
      errors.push({ message: "adjective inflection must match verb" });
    }
    const c: T.ComplementSelection = {
      type: "complement",
      selection: comp.selection.selection,
    };
    return [c, errors];
  }
  const c: T.ComplementSelection = {
    type: "complement",
    selection: comp.selection,
  };
  return [c, []];
}
