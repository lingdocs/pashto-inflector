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
  returnParseResults,
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
import { makePronounSelection } from "../phrase-building/make-selections";
import { isFirstOrSecondPersPronoun } from "../phrase-building/render-vp";
import { isFirstPerson, isSecondPerson, personToGenNum } from "../misc-helpers";
import { equals, zip } from "rambda";
import { isImperativeTense, isStatCompound } from "../type-predicates";
import { isKedulStatEntry, isStatAux } from "./parse-verb-helpers";
import { dartlul, raatlul, tlul, wartlul } from "./irreg-verbs";
import { personsFromPattern1 } from "./parse-noun-word";
import { dynamicAuxVerbs } from "../dyn-comp-aux-verbs";
import {
  checkComplement,
  complementTakesTarget,
  parsedCompToCompSelection,
  winnerOfNpAndCompliment,
} from "../phrase-building/complement-tools";
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
// TODO: past participle for compounds like کړې وه
// why doesn't ښځه خفه شوه  parse as a compound?

// this doesn't catch an error زه دې ستړی کړلم
// and also parses as ستړې کړلم
// same thing doesn't catch ما پیاله مات کړه

// ماشومانو وهلم complement link broken!
// ودې وینم complement link broken!
// دا خبره مې سپکاوی بللی دی ERRORS

// زه ښځه ستړی بولم should error!

// problem with شتړې being an adverb

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
      // TODO: would be nice if this could pass error messages about the
      // negative being out of place etc
      if (!verbSectionOK(blocks)) {
        return [];
      }
      const tenses = getTenses(blocks, ba);
      // TODO get errors from the get tenses (perfect verbs not agreeing)
      return tenses.flatMap(
        ({ tense, person, transitivities, negative, verb }) => {
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
                  return bindParseResult(
                    finishIntransitive({
                      miniPronouns,
                      npsAndAps,
                      exComplement,
                      tokens,
                      v,
                      person,
                    }),
                    checkForCompounds(dictionary)
                  );
                } else if (transitivity === "transitive") {
                  return bindParseResult(
                    finishTransitive({
                      miniPronouns,
                      npsAndAps,
                      exComplement,
                      tokens,
                      v,
                      vbePerson: person,
                      isPast,
                    }),
                    checkForCompounds(dictionary)
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
      );
    }
  );
}

// cleanup and correct this finishIntransitive
// then make sure it all works with the complements!
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
  const nps = npsAndAps.filter((x): x is T.ParsedNP => x.type === "NP");
  const { complement, compPresenceErrors } = checkComplementPresence(
    v.verb,
    exComplement
  );
  const errors: T.ParseError[] = [
    ...ensureNoMiniPronouns(miniPronouns),
    ...(nps.length > 1
      ? [{ message: "intransitive verb can only take one subject" }]
      : []),
    ...compPresenceErrors,
  ];
  const compErrors = checkComplement(complement, person);
  if (nps.length === 0) {
    // TODO: if complement takes over, subject could be anything
    const subject = makeSubjectSelectionComplete({
      type: "NP",
      selection: makePronounSelection(person),
    });
    const complementWins = complementTakesTarget(subject.selection, complement);
    if (
      complementWins &&
      person !== getPersonFromNP(complement?.selection as T.NPSelection)
    ) {
      errors.push({
        message: "verb must agree with complement in this case",
      });
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
          externalComplement: parsedCompToCompSelection(complement),
          form: {
            removeKing: true,
            shrinkServant: false,
          },
        } as T.VPSelectionComplete,
        errors: [...errors, ...compErrors],
      },
    ];
  }
  const np = nps[0];
  const subjectPerson = getPersonFromNP(np.selection);
  const compWins = complementTakesTarget(np.selection, complement);
  if (isImperativeTense(v.tense) && !isSecondPerson(subjectPerson)) {
    return [];
  }
  if (np.inflected) {
    errors.push({
      message: "subject of intransitive verb must not be inflected",
    });
  }
  if (!compWins && subjectPerson !== person) {
    errors.push({
      message: "subject and verb must agree for intransitive verb",
    });
  } else if (
    compWins &&
    getPersonFromNP(exComplement?.selection as T.NPSelection)
  ) {
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
        externalComplement: parsedCompToCompSelection(complement),
        form: {
          removeKing: false,
          shrinkServant: false,
        },
      } as T.VPSelectionComplete,
      errors: [...errors, ...compErrors],
    },
  ];
}

type TransitivePossibility = {
  s: T.ParsedNP;
  o: T.ParsedNP | T.Person.ThirdPlurMale;
  blocks: T.VPSBlockComplete[];
  form: T.FormVersion;
};

type MakeTransPossibilitiesProps = {
  tokens: readonly T.Token[];
  miniPronouns: T.ParsedMiniPronoun[];
  npsAndAps: (T.ParsedNP | T.APSelection)[];
  vbePerson: T.Person;
  isPast: boolean;
  // TODO: may need to add exComplement here as we properly check it
};

function finishTransitive({
  miniPronouns,
  npsAndAps,
  exComplement,
  tokens,
  v,
  vbePerson,
  isPast,
}: {
  miniPronouns: T.ParsedMiniPronoun[];
  npsAndAps: (T.ParsedNP | T.APSelection)[];
  exComplement: T.ParsedComplementSelection | undefined;
  tokens: Readonly<T.Token[]>;
  v: T.VerbSelectionComplete;
  vbePerson: T.Person;
  isPast: boolean;
}): T.ParseResult<T.VPSelectionComplete>[] {
  const nps = npsAndAps.filter((x): x is T.ParsedNP => x.type === "NP");
  const { complement, compPresenceErrors } = checkComplementPresence(
    v.verb,
    exComplement
  );
  const initialErrors: T.ParseError[] = [
    ...(nps.length > 2
      ? [
          {
            message:
              "transitive verb can only take two NPs: subject and object",
          },
        ]
      : []),
    ...compPresenceErrors,
  ];
  const possibilites = (
    nps.length >= 2
      ? finishTransitiveWTwoNPs(nps)
      : nps.length === 1
      ? finishTransitiveWOneNP(nps[0])
      : finishTransitiveWNoNPs
  )({
    miniPronouns,
    npsAndAps,
    vbePerson,
    isPast,
    tokens,
  });
  return bindParseResult(possibilites, (tokens, p) => {
    const errors = [
      ...initialErrors,
      ...checkTransitiveStructure({
        s: p.s,
        o: p.o,
        exComplement: complement,
        isPast,
        vbePerson,
      }),
    ];
    return [
      {
        tokens,
        body: {
          blocks: p.blocks,
          verb: v,
          externalComplement: parsedCompToCompSelection(complement),
          form: p.form,
        },
        errors,
      },
    ];
  });
}

function finishTransitiveWNoNPs({
  miniPronouns,
  npsAndAps,
  vbePerson,
  isPast,
  tokens,
}: MakeTransPossibilitiesProps): T.ParseResult<TransitivePossibility>[] {
  const form: T.FormVersion = {
    removeKing: true,
    shrinkServant: true,
  };
  if (npsAndAps.some((x): x is T.ParsedNP => x.type === "NP")) {
    throw new Error("accidentally passed NP to finishTransitiveWNoNPs");
  }
  const aps = npsAndAps as T.APSelection[];
  const errors = ensureShrunkenServant(isPast)(miniPronouns);
  // TODO: INFLECTION SHOULD NOT ALWAYS BE FALSE !!!
  const king = makeShadowPronoun(false, vbePerson);
  const servants: T.ParsedNP[] = expandShrunkenServant(
    miniPronouns,
    isPast,
    vbePerson
  );
  return servants.map((servant) => {
    const [s, o] = isPast ? [servant, king] : [king, servant];
    return {
      tokens,
      body: {
        // TODO: at the expense of a wee bit of lookup time
        //  we could remove this s, o from here and just pass
        //  the blocks for simplicity's sake
        s,
        o,
        blocks: mapOutnpsAndAps(["S", "O"], [s, o, ...aps]),
        form,
      },
      errors,
    };
  });
}

function finishTransitiveWOneNP(np: T.ParsedNP) {
  return function ({
    miniPronouns,
    npsAndAps,
    vbePerson,
    isPast,
    tokens,
  }: MakeTransPossibilitiesProps): T.ParseResult<TransitivePossibility>[] {
    // TODO: ERRORS when using NP as complement
    // - هغه مې ښځه کړه thinks it's imperative and crashes
    // -  هغه مې سړی کړ - uses extra maa ?!

    const forms = [
      {
        removeKing: true,
        shrinkServant: false,
      },
      {
        removeKing: false,
        shrinkServant: true,
      },
    ] as const;
    return forms.flatMap<T.ParseResult<TransitivePossibility>>((form) => {
      const miniPronErrors: T.ParseError[] = (
        form.removeKing ? ensureDroppedKing : ensureShrunkenServant(isPast)
      )(miniPronouns);
      const filledIn: T.ParsedNP[] = form.removeKing
        ? // make a pronoun filler for the removed knig
          [makeShadowPronoun(false, vbePerson)]
        : // make a pronoun filler possibilities for the shrunken servant
          expandShrunkenServant(
            miniPronouns,
            isPast,
            getPersonFromNP(np.selection)
          );
      const filledInObj = form.removeKing === isPast;
      // instead of having to write
      //  x = form.removeKing ? (isPast ? "foo" : "bar") : (isPast ? "bar" : "foo")
      //  x = filledInObj ? "foo" : "bar"; 🤓
      const insertFilledAt = getNPInsertPoint(npsAndAps, filledInObj);
      return filledIn.map((f) => {
        const [s, o] = filledInObj ? [np, f] : [f, np];
        return {
          tokens,
          body: {
            s,
            o,
            // insert the generated pronoun NP so order is always S O
            blocks: mapOutnpsAndAps(
              ["S", "O"],
              npsAndAps.toSpliced(insertFilledAt, 0, f)
            ),
            form,
          },
          errors: miniPronErrors,
        };
      });
    });
  };
}

function finishTransitiveWTwoNPs(nps: T.ParsedNP[]) {
  return function ({
    miniPronouns,
    npsAndAps,
    tokens,
  }: MakeTransPossibilitiesProps): T.ParseResult<TransitivePossibility>[] {
    // both NPS are present
    const miniPronErrors: T.ParseError[] = ensureNoMiniPronouns(miniPronouns);
    return [true, false].map((flip) => {
      const [s, o] = flip ? [nps[1], nps[0]] : [nps[0], nps[1]];
      return {
        tokens,
        body: {
          s,
          o,
          blocks: mapOutnpsAndAps(
            !flip ? ["S", "O"] : ["O", "S"],
            ensureNoMoreThanTwoNps(npsAndAps)
          ),
          form: {
            removeKing: false,
            shrinkServant: false,
          },
        },
        errors: miniPronErrors,
      };
    });
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
  const npErrors: T.ParseError[] = [];
  if (nps.length > 1) {
    npErrors.push({
      message: "grammatically transitive verb can only take one NP",
    });
  }
  const possibilites = (
    nps.length === 0 ? finishGrammTransWNoNPs : finishGrammTransWNP(nps[0])
  )({
    miniPronouns,
    npsAndAps,
    vbePerson: person,
    isPast,
    tokens,
  });
  return bindParseResult(possibilites, (tokens, p) => {
    const errors = [
      ...checkTransitiveStructure({
        s: p.s,
        o: p.o,
        exComplement: undefined,
        isPast,
        vbePerson: person,
      }),
      ...npErrors,
    ];
    return [
      {
        tokens,
        body: {
          blocks: p.blocks,
          verb: v,
          externalComplement: undefined,
          form: p.form,
        },
        errors,
      },
    ];
  });
}

function finishGrammTransWNoNPs({
  npsAndAps,
  miniPronouns,
  vbePerson,
  isPast,
  tokens,
}: MakeTransPossibilitiesProps): T.ParseResult<TransitivePossibility>[] {
  if (npsAndAps.some((x): x is T.ParsedNP => x.type === "NP")) {
    throw new Error("accidentally passed NP to finishGrammTransWNoNPs");
  }
  const aps = npsAndAps as T.APSelection[];
  const form = isPast
    ? { shrinkServant: true, removeKing: false }
    : { shrinkServant: false, removeKing: true };
  const errors = (
    isPast ? ensureShrunkenServant(isPast) : ensureNoMiniPronouns
  )(miniPronouns);
  const subjects: T.ParsedNP[] = isPast
    ? expandShrunkenServant(miniPronouns, isPast, vbePerson)
    : [makeShadowPronoun(false, vbePerson)];
  const o = T.Person.ThirdPlurMale;
  return subjects.map((s) => {
    return {
      tokens,
      body: {
        s,
        o,
        blocks: mapOutnpsAndAps(["S", "O"], [s, o, ...aps]),
        form,
      },
      errors,
    };
  });
}

function finishGrammTransWNP(subject: T.ParsedNP) {
  return function ({
    npsAndAps,
    miniPronouns,
    tokens,
  }: MakeTransPossibilitiesProps): T.ParseResult<TransitivePossibility>[] {
    const form: T.FormVersion = {
      removeKing: false,
      shrinkServant: false,
    };
    const errors = ensureNoMiniPronouns(miniPronouns);
    const aps = npsAndAps.filter((x) => x.type === "AP");
    const object = T.Person.ThirdPlurMale;
    return [
      {
        tokens,
        body: {
          s: subject,
          o: object,
          blocks: mapOutnpsAndAps(["S", "O"], [subject, object, ...aps]),
          form,
        },
        errors,
      },
    ];
  };
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

/**
 * This returns multiple possibilities because for example
 * ماشوم وهل - could mean adopt (?) (dyn compound) or to hit a child
 * (simple verb وهل)
 */
function checkForCompounds(dictionary: T.DictionaryAPI) {
  return (
    tokens: readonly T.Token[],
    vps: T.VPSelectionComplete
  ): T.ParseResult<T.VPSelectionComplete>[] => {
    const dynResults = checkForDynCompounds(dictionary, tokens, vps);
    const statResults = checkForStatCompounds(dictionary, tokens, vps);
    return [...dynResults, ...statResults, ...returnParseResult(tokens, vps)];
  };
}

function checkForDynCompounds(
  dictionary: T.DictionaryAPI,
  tokens: readonly T.Token[],
  vps: T.VPSelectionComplete
): T.ParseResult<T.VPSelectionComplete>[] {
  if (vps.verb.transitivity !== "transitive") {
    return [];
  }
  const object: T.ObjectSelection | undefined = getObjectSelection(vps.blocks);
  if (
    !object ||
    typeof object.selection !== "object" ||
    object.selection.selection.type !== "noun"
  ) {
    return [];
  }
  const dynAuxVerb = dynamicAuxVerbs.find(
    (v) => v.entry.p === vps.verb.verb.entry.p
  ) as T.VerbEntryNoFVars | undefined;
  if (!dynAuxVerb) {
    return [];
  }
  const dynCompoundVerbs = dictionary
    .verbEntryLookupByL(object.selection.selection.entry.ts)
    .filter((e) => e.entry.c.includes("dyn."));
  if (!dynCompoundVerbs.length) {
    return [];
  }
  const dynCompoundVerb = dynCompoundVerbs[0];
  return returnParseResult(tokens, {
    ...vps,
    // TODO: could be more efficient by getting index first
    blocks: vps.blocks.map(markObjAsDynamicComplement),
    verb: {
      ...vps.verb,
      verb: dynCompoundVerb,
      dynAuxVerb,
      isCompound: "dynamic",
    },
  });
}

function checkForStatCompounds(
  dictionary: T.DictionaryAPI,
  tokens: readonly T.Token[],
  vps: T.VPSelectionComplete
): T.ParseResult<T.VPSelectionComplete>[] {
  if (!vps.externalComplement) {
    return [];
  }
  const aux = isStatAux(vps.verb.verb);
  if (
    !aux ||
    (aux === "kawul" && vps.verb.transitivity !== "transitive") ||
    (aux === "kedul" && vps.verb.transitivity !== "intransitive")
  ) {
    return [];
  }
  if (
    vps.externalComplement.selection.type === "loc. adv." ||
    vps.externalComplement.selection.type === "adjective" ||
    vps.externalComplement.selection.type === "comp. noun"
  ) {
    // adjectives should already be checked for accuracy by the
    // parsing of complement. TODO: make sure it's checked to match with
    // the target, not just the king
    const l = vps.externalComplement.selection.entry.ts;
    return returnParseResults(
      tokens,
      dictionary
        .verbEntryLookupByL(l)
        .filter(isStatCompound(aux))
        .map<T.VPSelectionComplete>((verb) => ({
          ...vps,
          externalComplement: undefined,
          verb: {
            ...vps.verb,
            verb,
          },
        }))
    );
  }
  return [];
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

function getNPInsertPoint(
  blocks: (T.ParsedNP | T.APSelection)[],
  isObj: boolean
): number {
  const npIndex = blocks.findIndex((x) => x.type === "NP");
  return isObj ? npIndex + 1 : npIndex;
}

function makeShadowPronoun(inflected: boolean, person: T.Person): T.ParsedNP {
  return {
    type: "NP",
    inflected,
    selection: {
      type: "NP",
      selection: makePronounSelection(person),
    },
  };
}

function expandShrunkenServant(
  miniPronouns: T.ParsedMiniPronoun[],
  isPast: boolean,
  kingPerson: T.Person
): T.ParsedNP[] {
  return (
    miniPronouns.length === 0
      ? // for the error "did you mean" when they leave out the pronoun
        [T.Person.ThirdSingMale]
      : getPeopleFromMiniPronouns([miniPronouns[0]])
  ).flatMap((person) =>
    // TODO: maybe move this filtering out of function
    isInvalidSubjObjCombo(kingPerson, person)
      ? []
      : [
          makeShadowPronoun(
            isPast || isFirstPerson(person) || isSecondPerson(person),
            person
          ),
        ]
  );
}

function ensureDroppedKing(
  miniPronouns: T.ParsedMiniPronoun[]
): T.ParseError[] {
  return miniPronouns.length
    ? [{ message: `unused mini pronoun: ${miniPronouns[0]}` }]
    : [];
}

function ensureNoMiniPronouns(
  miniPronouns: T.ParsedMiniPronoun[]
): T.ParseError[] {
  return miniPronouns.length ? [{ message: "unknown mini-pronoun" }] : [];
}

function ensureShrunkenServant(isPast: boolean) {
  return function (miniPronouns: T.ParsedMiniPronoun[]): T.ParseError[] {
    return miniPronouns.length > 1
      ? [{ message: "unknow extra mini-pronoun" }]
      : miniPronouns.length === 0
      ? [
          {
            message: `missing mini-pronoun for shrunken servant ${
              isPast ? "subject" : "object"
            }`,
          },
        ]
      : [];
  };
}

function checkTransitiveStructure({
  s,
  o,
  exComplement,
  isPast,
  vbePerson,
}: {
  s: T.ParsedNP;
  o: T.ParsedNP | T.Person.ThirdPlurMale;
  exComplement: T.ParsedComplementSelection | undefined;
  isPast: boolean;
  vbePerson: T.Person;
}): T.ParseError[] {
  const errors: T.ParseError[] =
    typeof o === "object"
      ? checkComplement(exComplement, getPersonFromNP(o.selection))
      : [];
  // complement must always agree with the object
  if (
    typeof o === "object" &&
    isInvalidSubjObjCombo(
      getPersonFromNP(s.selection),
      getPersonFromNP(o.selection)
    )
  ) {
    errors.push({
      message: "invalid subject/object combo",
    });
  }
  if (isPast) {
    // in the past the verb will agree with the object, unless the compliment takes over
    if (typeof o === "object") {
      const winner = winnerOfNpAndCompliment(o.selection, exComplement);
      if (winner.person !== vbePerson) {
        errors.push({
          message: `past tense transitive verb must agree with ${
            winner.source === "np" ? "object" : "complement NP in this case."
          }`,
        });
      }
      if (o.inflected) {
        errors.push({
          message: "object of past tense transitive verb must not be inflected",
        });
      }
    } else {
      if (vbePerson !== T.Person.ThirdPlurMale) {
        errors.push({
          message:
            "past tense grammatically transitive verb must be third pers. masc. sing. to agree with implied object",
        });
      }
    }
    if (!s.inflected) {
      errors.push({
        message: `subject of ${
          typeof o === "number" ? "gramatically " : ""
        }transitive past tense verb must be inflected`,
      });
    }
  } else {
    if (typeof o === "object") {
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
    }
    if (s.inflected) {
      errors.push({
        message:
          "subject of transitive non-past tense verb must not be inflected",
      });
    }
    if (getPersonFromNP(s.selection) !== vbePerson) {
      errors.push({
        message: "not past-tense transitive verb must agree with subject",
      });
    }
  }
  return errors;
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
  const vs = blocks.slice(blocks.findIndex(startsVerbSection));
  return possibilites.some(
    (poss) => poss.length === vs.length && zip(poss, vs).every(([p, b]) => p(b))
  );
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
  blocks: (T.APSelection | T.ParsedNP | T.Person.ThirdPlurMale)[]
): T.VPSBlockComplete[] {
  const queue = [...npOrder];
  return blocks.map((x, i): T.VPSBlockComplete => {
    if (typeof x === "number") {
      const c = queue.shift();
      if (!c || c !== "O") {
        throw new Error("invalid NP order in parsing");
      }
      return {
        key: i,
        block: {
          type: "objectSelection",
          selection: x,
        },
      };
    }
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

function ensureNoMoreThanTwoNps(
  blocks: (T.ParsedNP | T.APSelection)[]
): (T.ParsedNP | T.APSelection)[] {
  let count = 0;
  return blocks.filter((x) => {
    if (x.type === "NP") count++;
    if (count > 2 && x.type === "NP") {
      return false;
    } else {
      return true;
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

function checkComplementPresence(
  v: T.VerbEntry,
  exComplement: T.ParsedComplementSelection | undefined
): {
  complement: T.ParsedComplementSelection | undefined;
  compPresenceErrors: T.ParseError[];
} {
  const exCompStatus = takesExternalComplement(v);
  if (exCompStatus === "no" && exComplement) {
    return {
      complement: undefined,
      compPresenceErrors: [{ message: "verb does not take a complement" }],
    };
  }
  if (exCompStatus === "req" && !exCompStatus) {
    return {
      complement: exComplement,
      compPresenceErrors: [{ message: "verb requires a complement" }],
    };
  }
  return { complement: exComplement, compPresenceErrors: [] };
}
