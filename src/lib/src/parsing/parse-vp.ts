import * as T from "../../../types";
import { parseArgumentSection } from "./argument-section/parse-argument-section";
import {
  parseVerbSection,
  VerbSectionBlock,
} from "./verb-section/parse-verb-section";
import {
  addErrors,
  addShrunkenPossesor,
  bindParseResult,
  bindParseResultWParser,
  canTakeShrunkenPossesor,
  getPeople,
  isPH,
  returnParseResult,
  returnParseResults,
} from "./utils";
import {
  getObjectSelection,
  makeObjectSelectionComplete,
  makeSubjectSelectionComplete,
} from "../phrase-building/blocks-utils";
import {
  getPersonFromNP,
  isInvalidSubjObjCombo,
  isPastTense,
  isThirdPerson,
  takesExternalComplement,
} from "../phrase-building/vp-tools";
import { makePronounSelection } from "../phrase-building/make-selections";
import { isFirstOrSecondPersPronoun } from "../phrase-building/render-vp";
import { isFirstPerson, isSecondPerson, personToGenNum } from "../misc-helpers";
import { ArgumentTypes, equals } from "rambda";
import { isImperativeTense, isTlulVerb } from "../type-predicates";
import { isKedulStatEntry } from "./verb-section/parse-verb-helpers";
import { dynamicAuxVerbs } from "../dyn-comp-aux-verbs";
import {
  checkComplement,
  parsedCompToCompSelection,
  winnerOfNpAndCompliment,
} from "../phrase-building/complement-tools";
import { personsFromPattern1 } from "./argument-section/parse-noun-word";
import { dartlul, raatlul, tlul, wartlul } from "./verb-section/irreg-verbs";

// to hide equatives type-doubling issue
// shouldn't be opt parsing with demonstratives

// TODO: problem with 3rd pers sing verb endings اواز مې دې واورېده

// TODO: زه د هغې غټې ښځې کور شوم - should work

// FOR display - Verb blocks should display VBP - VBE somehow
// TODO: past participle for compounds like کړې وه
// why doesn't ښځه خفه شوه  parse as a compound?

// this doesn't catch an error زه دې ستړی کړلم
// and also parses as ستړې کړلم
// same thing doesn't catch ما پیاله مات کړه

// دا خبره مې سپکاوی بللی دی ERRORS

// TODO: issue with کوم being کوېږم

// FOR block display show adj head
// TODO: problem with adjective parsing errors not coming through!
// دا خبره مې سپکاوی بللی دی should error but it doesn't
// ما کتاب ستونزه بللې ده
// زه دې ستړی کړم
// should only be one gender
// proper errors around سړي ښځه لیدلې ده

//  issue with ستړې being an adverb
// BIG RENDERING ISSUE - سړی shouldn't inflect to سړیانو
//  change the dictionary back to n. m. anim ?
export function parseVP(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.VPSelectionComplete>[] {
  if (tokens.length === 0) {
    return [];
  }
  const argument = parseArgumentSection(tokens, dictionary);
  return bindParseResultWParser(
    argument,
    (tokens) => parseVerbSection(tokens, dictionary),
    (arg, vs, tkns) => {
      return combineArgAndVerbSections(tkns, dictionary, arg, vs);
    }
  );
}

function combineArgAndVerbSections(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  arg: ReturnType<typeof parseArgumentSection>[number]["body"],
  vs: ReturnType<typeof parseVerbSection>[number]["body"]
): T.ParseResult<T.VPSelectionComplete>[] {
  const [kids, kidsErrors] = consolidateKidsSection(arg, vs.kids);
  const blocks = [
    ...arg.npsAndAps,
    ...(arg.complement ? [arg.complement] : []),
  ];
  const ba = kids.some((k) => k === "ba");
  const tenses = getTenses(vs.blocks, ba);

  // TODO get errors from the get tenses (perfect verbs not agreeing)
  return createPossesivePossibilities({
    blocks,
    kids,
  }).flatMap(({ kids, blocks }) => {
    const miniPronouns = getMiniPronouns(kids);
    const npsAndAps = blocks.filter((x) => x.type === "NP" || x.type === "AP");
    const exComplement = blocks.find((x) => x.type === "complement");
    return tenses.flatMap(
      ({ tense, person, transitivities, negative, verb, errors }) => {
        const isPast = isPastTense(tense);
        return transitivities.flatMap<T.ParseResult<T.VPSelectionComplete>>(
          (transitivity): T.ParseResult<T.VPSelectionComplete>[] => {
            const v: T.VerbSelectionComplete = {
              type: "verb",
              verb,
              transitivity,
              canChangeTransitivity: verb.entry.c.includes(
                "v. trans./gramm. trans."
              ),
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
                  kidsErrors,
                  miniPronouns,
                  npsAndAps,
                  exComplement,
                  tokens,
                  v,
                  vbePerson: person,
                }).map(addErrors(errors)),
                checkForDynCompounds(dictionary)
              );
            } else if (transitivity === "transitive") {
              return bindParseResult(
                finishTransitive({
                  kidsErrors,
                  miniPronouns,
                  npsAndAps,
                  exComplement,
                  tokens,
                  v,
                  vbePerson: person,
                  isPast,
                }).map(addErrors(errors)),
                checkForDynCompounds(dictionary)
              );
            } /* grammaticallyTransitive */ else {
              if (exComplement) {
                return [];
              }
              return finishGrammaticallyTransitive({
                kidsErrors,
                miniPronouns,
                npsAndAps,
                tokens,
                v,
                person,
                isPast,
              }).map(addErrors(errors));
            }
          }
        );
      }
    );
  });
}

// TODO: could also check for order errors in the consolidated kid's section ?
function consolidateKidsSection(
  arg: ReturnType<typeof parseArgumentSection>[number]["body"],
  vsKids: { position: number; section: T.ParsedKid[] }[]
): [T.ParsedKid[], T.ParseError[]] {
  const lastArgPos = arg.npsAndAps.length;
  const vsKidsAdjusted = vsKids.map((x) => ({
    ...x,
    position: x.position + lastArgPos,
  }));
  const kids = [...arg.kids, ...vsKidsAdjusted];
  return kids.reduce<[T.ParsedKid[], T.ParseError[]]>(
    ([kds, errs], k) => {
      if (k.position === 1) {
        return [[...kds, ...k.section], errs];
      } else {
        return [
          [...kds, ...k.section],
          [
            ...errs,
            {
              message: `kid${k.section.length > 1 ? "s" : ""} ${k.section
                .map((x) => `'${x}'`)
                .join(", ")} out of place. Found after block ${k.position
                }, should be after the first block.`,
            },
          ],
        ];
      }
    },
    [[], []]
  );
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
  // exComplement: T.ParsedComplementSelection | undefined,
  // TODO: may need to add exComplement here as we properly check it
};

function finishIntransitive({
  kidsErrors,
  miniPronouns,
  npsAndAps,
  exComplement,
  tokens,
  v,
  vbePerson,
}: {
  kidsErrors: T.ParseError[];
  miniPronouns: T.ParsedMiniPronoun[];
  npsAndAps: (T.ParsedNP | T.APSelection)[];
  exComplement: T.ParsedComplementSelection | undefined;
  tokens: Readonly<T.Token[]>;
  v: T.VerbSelectionComplete;
  vbePerson: T.Person;
}): T.ParseResult<T.VPSelectionComplete>[] {
  const nps = npsAndAps.filter((x): x is T.ParsedNP => x.type === "NP");
  const { complement, compPresenceErrors } = checkComplementPresence(
    v.verb,
    exComplement
  );
  const initialErrors: T.ParseError[] = [
    ...kidsErrors,
    ...(nps.length > 1
      ? [
        {
          message: "intransitive verb can only take one NP for subject",
        },
      ]
      : []),
    ...compPresenceErrors,
    ...ensureNoMiniPronouns(miniPronouns),
  ];
  const np = nps.length ? nps[0] : undefined;
  const ss: T.ParsedNP[] = (
    np ? [np] : makeShadowPronouns(false, vbePerson, exComplement)
  ).filter((s) => !isIllegalImperative(v.tense, s.selection));
  const form: T.FormVersion = {
    shrinkServant: false,
    removeKing: !np,
  };
  return ss.map((s) => {
    const structureErrors = checkIntransitiveStructure({
      s,
      exComplement: complement,
      vbePerson,
    });
    const o: "none" = "none" as const;
    const allBlocksTemp: ArgumentTypes<typeof limitNPs>[0] = [
      ...(np ? [] : [s]),
      ...npsAndAps,
    ];
    const subjPosition = allBlocksTemp.findIndex(
      (x) => typeof x === "object" && x.type === "NP"
    );
    const allBlocks = allBlocksTemp.toSpliced(subjPosition + 1, 0, o);
    const blocks = mapOutnpsAndAps(["S"], limitNPs(allBlocks, 1));
    return {
      tokens,
      body: {
        blocks,
        verb: v,
        externalComplement: parsedCompToCompSelection(complement),
        form,
      },
      errors: [...initialErrors, ...structureErrors],
    };
  });
}

function finishTransitive({
  kidsErrors,
  miniPronouns,
  npsAndAps,
  exComplement,
  tokens,
  v,
  vbePerson,
  isPast,
}: {
  kidsErrors: T.ParseError[];
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
    ...kidsErrors,
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
      ? getTransPossibilitiesWTwoNPs(nps)
      : nps.length === 1
        ? getTransPossibilitiesWOneNP(nps[0], exComplement)
        : getTransPossibilitiesWNoNPs
  )({
    miniPronouns,
    npsAndAps,
    vbePerson,
    isPast,
    tokens,
  });
  return bindParseResult(possibilites, (tokens, p) => {
    if (isIllegalImperative(v.tense, p.s.selection)) {
      return [];
    }
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

function getTransPossibilitiesWNoNPs({
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

function getTransPossibilitiesWOneNP(
  np: T.ParsedNP,
  exComplement: T.ParsedComplementSelection | undefined
) {
  return function({
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
        makeShadowPronouns(false, vbePerson, exComplement)
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

function getTransPossibilitiesWTwoNPs(nps: T.ParsedNP[]) {
  return function({
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
            limitNPs(npsAndAps, 2)
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
  kidsErrors: T.ParseError[];
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
    if (isIllegalImperative(v.tense, p.s.selection)) {
      return [];
    }
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
  return function({
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
  blocks: VerbSectionBlock[],
  ba: boolean
): {
  tense: T.VerbTense | T.PerfectTense | T.AbilityTense | T.ImperativeTense;
  person: T.Person;
  transitivities: T.Transitivity[];
  negative: boolean;
  verb: T.VerbEntry;
  errors: T.ParseError[];
}[] {
  const negIndex = blocks.findIndex((x) => x.type === "negative");
  const negative: T.NegativeBlock | undefined = blocks[negIndex] as
    | T.NegativeBlock
    | undefined;
  const phIndex = blocks.findIndex(isPH);
  // TODO: would be nicer if there were clear taggin gfor "VBP" vs "VBE" !!
  const vbeIndex = blocks.findIndex((x) => x.type === "VB" && !isVBP(x));
  const vbpIndex = blocks.findIndex((x) => x.type === "VB" && isVBP(x));
  const ph = phIndex !== -1 ? (blocks[phIndex] as T.ParsedPH) : undefined;
  const vbeR = vbeIndex !== -1 ? (blocks[vbeIndex] as T.ParsedVBE) : undefined;
  const vbpR = vbpIndex !== -1 ? (blocks[vbpIndex] as T.ParsedVBP) : undefined;
  const { vbe, vbp } = checkForTlulCombos(ph, vbeR, vbpR);
  if (!vbe || vbe.type !== "VB") {
    return [];
  }
  if (vbe.info.type === "verb") {
    if (!vbe.info.imperative && negative && negative.imperative) {
      // TODO: return errors here
      return [];
    }
    const abilityTenses = getAbilityTenses(ba, vbe, vbp);
    if (vbp && !abilityTenses.length) {
      return [];
    }
    const mainV =
      abilityTenses.length && vbp && vbp.info.type === "ability"
        ? vbp.info
        : vbe.info;
    const aspect = mainV.aspect;
    if (aspect === "perfective") {
      if (!ph && mainV.type !== "verb" && isKedulStatEntry(mainV.verb.entry))
        return [];
    } else {
      if (ph) return [];
    }
    const tenses = abilityTenses.length
      ? []
      : getTensesFromRootsStems(
        ba,
        vbe.info.base,
        vbe.info.aspect,
        !!negative,
        vbe.info.imperative
      );
    if (!tenses.length && !abilityTenses.length) {
      return [];
    }
    const transitivities =
      abilityTenses.length && vbp
        ? getTransitivities(vbp.info.verb)
        : getTransitivities(vbe.info.verb);
    const verbEntry = vbp ? vbp.info.verb : vbe.info.verb;
    if (!verbEntry) return [];
    if (abilityTenses.length) {
      if (!vbp) {
        throw new Error("VBP should exist in ability verb");
      }
      return abilityTenses.map((abilityTense) => ({
        tense: abilityTense,
        transitivities,
        negative: !!negative,
        person: vbe.person,
        verb: vbp.info.verb,
        errors: [],
      }));
    }
    if (!tenses.length) {
      return [];
    }
    return tenses.map((tense) => ({
      tense,
      transitivities,
      negative: !!negative,
      person: vbe.person,
      verb: verbEntry,
      errors: [],
    }));
  } else {
    // perfect
    const errors: T.ParseError[] = [];
    const pPart = blocks.find(
      (x) => x.type === "VB" && x.info.type === "ppart"
    ) as T.ParsedVBP | undefined;
    const equative = blocks.find(
      (x) => x.type === "VB" && x.info.type === "equative"
    ) as T.ParsedVBE | undefined;
    // TODO: Maybe remove (and type) this check because we already prevented
    // these kinds of errors in the parseVerbSection
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
      errors.push({
        message: `equative (${equativeGenNum.gender}. ${equativeGenNum.number}) and past participle (${pPart.info.genNum.gender}. ${pPart.info.genNum.number}) do not agree`,
      });
    }
    const transitivities = getTransitivities(pPart.info.verb);
    const tense = getPerfectTense(ba, equative.info.tense);
    if (!tense) {
      errors.push({
        message: `invalid perfect tense form`,
      });
    }
    return [
      {
        tense: tense || `${equative.info.tense}Perfect`,
        transitivities,
        negative: !!negative,
        person: equative.person,
        verb: pPart.info.verb,
        errors,
      },
    ];
  }
}

function checkForDynCompounds(dictionary: T.DictionaryAPI) {
  return function(
    tokens: readonly T.Token[],
    vps: T.VPSelectionComplete
  ): T.ParseResult<T.VPSelectionComplete>[] {
    if (vps.verb.transitivity !== "transitive") {
      return returnParseResult(tokens, vps);
    }
    const object: T.ObjectSelection | undefined = getObjectSelection(
      vps.blocks
    );
    if (
      !object ||
      typeof object.selection !== "object" ||
      object.selection.selection.type !== "noun"
    ) {
      return returnParseResult(tokens, vps);
    }
    const dynAuxVerb = dynamicAuxVerbs.find(
      (v) => v.entry.p === vps.verb.verb.entry.p
    ) as T.VerbEntryNoFVars | undefined;
    if (!dynAuxVerb) {
      return returnParseResult(tokens, vps);
    }
    const dynCompoundVerbs = dictionary
      .verbEntryLookupByL(object.selection.selection.entry.ts)
      .filter((e) => e.entry.c.includes("dyn."));
    if (!dynCompoundVerbs.length) {
      return returnParseResult(tokens, vps);
    }
    const dynCompoundVerb = dynCompoundVerbs[0];
    return returnParseResults(tokens, [
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
    ]);
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

function isIllegalImperative(
  tense: T.VerbFormName,
  subject: T.NPSelection
): boolean {
  return isImperativeTense(tense) && !isSecondPerson(getPersonFromNP(subject));
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

function makeShadowPronouns(
  inflected: boolean,
  vbePerson: T.Person,
  exComp: T.ParsedComplementSelection | undefined
): T.ParsedNP[] {
  if (
    exComp &&
    "type" in exComp.selection &&
    exComp.selection.type === "NP" &&
    isThirdPerson(vbePerson)
  ) {
    return getPeople(3, "both").map((person) =>
      makeShadowPronoun(inflected, person)
    );
  }
  return [makeShadowPronoun(inflected, vbePerson)];
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
  return function(miniPronouns: T.ParsedMiniPronoun[]): T.ParseError[] {
    return miniPronouns.length > 1
      ? [{ message: "unknow extra mini-pronoun" }]
      : miniPronouns.length === 0
        ? [
          {
            message: `missing mini-pronoun for shrunken servant ${isPast ? "subject" : "object"
              }`,
          },
        ]
        : [];
  };
}

function checkIntransitiveStructure({
  s,
  exComplement,
  vbePerson,
}: {
  s: T.ParsedNP;
  exComplement: T.ParsedComplementSelection | undefined;
  vbePerson: T.Person;
}): T.ParseError[] {
  const errors: T.ParseError[] = checkComplement(
    exComplement,
    getPersonFromNP(s.selection)
  );
  const winner = winnerOfNpAndCompliment(s.selection, exComplement);
  if (winner.person !== vbePerson) {
    errors.push({
      message: `intransitive verb must agree with ${winner.source === "np" ? "subject" : "complement NP in this case."
        }`,
    });
  }
  if (s.inflected) {
    errors.push({
      message: "subject of intransitive verb must not be inflected",
    });
  }
  return errors;
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
  const grammTrans = typeof o !== "object";
  const errors: T.ParseError[] = !grammTrans
    ? checkComplement(exComplement, getPersonFromNP(o.selection))
    : [];
  // complement must always agree with the object
  if (
    !grammTrans &&
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
    if (!grammTrans) {
      const winner = winnerOfNpAndCompliment(o.selection, exComplement);
      if (winner.person !== vbePerson) {
        errors.push({
          message: `past tense transitive verb must agree with ${winner.source === "np" ? "object" : "complement NP in this case."
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
        message: `subject of ${typeof o === "number" ? "gramatically " : ""
          }transitive past tense verb must be inflected`,
      });
    }
  } else {
    if (!grammTrans) {
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

function getAbilityTenses(
  hasBa: boolean,
  vbe: T.ParsedVBE,
  vbp: T.ParsedVBP | undefined
): T.AbilityTense[] {
  if (vbe.info.type === "equative") {
    return [];
  }
  if (!vbp || vbp.info.type !== "ability") {
    return [];
  }
  if (!isKedulStatEntry(vbe.info.verb.entry)) {
    return [];
  }
  const aspects: T.Aspect[] = isAbilityAspectAmbiguousVBP(vbp)
    ? ["imperfective", "perfective"]
    : [vbp.info.aspect];
  const base = vbe.info.base;
  return aspects.map<T.AbilityTense>(
    (aspect) => `${tenseFromAspectBaseBa(aspect, base, hasBa)}Modal`
  );
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

function getTensesFromRootsStems(
  hasBa: boolean,
  base: "root" | "stem",
  aspect: T.Aspect,
  negative: boolean,
  imperative: boolean | undefined
): (T.VerbTense | T.ImperativeTense)[] {
  if (imperative) {
    if (base === "root") {
      return [];
    }
    if (hasBa) {
      return [];
    }
    return aspect === "imperfective" || negative
      ? ["imperfectiveImperative"]
      : ["perfectiveImperative"];
  }
  return [tenseFromAspectBaseBa(aspect, base, hasBa)];
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
  blocks: (T.APSelection | T.ParsedNP | T.Person.ThirdPlurMale | "none")[]
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
    if (typeof x === "string") {
      return {
        key: i,
        block: {
          type: "objectSelection",
          selection: "none",
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

function limitNPs(
  blocks: (T.ParsedNP | T.APSelection | "none")[],
  amount: 1 | 2
): (T.ParsedNP | T.APSelection | "none")[] {
  return blocks.reduce<[(T.ParsedNP | T.APSelection | "none")[], number]>(
    ([bs, count], x) => {
      if (typeof x === "string") {
        return [[...bs, x], count];
      }
      if (x.type === "NP") {
        if (count === amount) {
          return [bs, count];
        }
        return [[...bs, x], count + 1];
      } else {
        return [[...bs, x], count];
      }
    },
    [[], 0]
  )[0];
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
function createPossesivePossibilities(b: {
  kids: T.ParsedKid[];
  blocks: T.ParsedBlock[];
}): {
  kids: T.ParsedKid[];
  blocks: T.ParsedBlock[];
}[] {
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
  const miniPronouns = getMiniPronouns(b.kids);
  if (miniPronouns.length === 0) {
    return [b];
  } else if (miniPronouns.length === 1) {
    const withFirstMiniAsPossesive = spreadOutPoss(b, 0);
    return [b, ...withFirstMiniAsPossesive];
  } else {
    const withFirstMiniAsPossesive = spreadOutPoss(b, 0);
    const withSecondMiniAsPossesive = spreadOutPoss(b, 1);
    return [
      // using none of the mini-pronouns as possesives
      b,
      // using the first mini-pronoun as a possesive
      ...withFirstMiniAsPossesive,
      // using the second mini-pronoun as a prossesive
      ...withSecondMiniAsPossesive,
      // using both mini pronouns as possesives
      ...withFirstMiniAsPossesive.flatMap((x) => spreadOutPoss(x, 0)),
    ];
  }
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

/**
 * This is just needed to turn the VBEs into proper tlul words,
 * if we have an ability VBP it will already be correct. This is not
 * the clearest and cleanest workflow, it probably would be better
 * to get the proper verb in the VBE in the first place, but this is
 * what we're working with for now
 */
function checkForTlulCombos(
  ph: T.ParsedPH | undefined,
  vbe: T.ParsedVBE | undefined,
  vbp: T.ParsedVBP | undefined
): { vbp: T.ParsedVBP | undefined; vbe: T.ParsedVBE | undefined } {
  function replaceEntry(vbe: T.ParsedVBE, verb: T.VerbEntry): T.ParsedVBE {
    if (vbe.type === "welded") {
      return vbe;
    }
    if (vbe.info.type === "equative") {
      return vbe;
    }
    return {
      ...vbe,
      info: {
        ...vbe.info,
        verb,
      },
    };
  }
  if (!vbe) {
    return { vbp, vbe };
  }
  if (vbe.info.type === "equative") {
    return { vbp, vbe };
  }
  if (!ph || ph.type === "CompPH") {
    return { vbp, vbe };
  }
  if (["را", "ور", "در"].includes(ph.s) || ph.s.startsWith("لاړ")) {
    if (
      !(
        isKedulStatEntry(vbe.info.verb.entry) &&
        vbe.info.aspect === "perfective" &&
        vbe.info.base === "stem"
      )
    ) {
      return { vbe, vbp };
    }
    const personsFromLar = personsFromPattern1("لاړ", ph.s);
    // TOOD: could do error handling here
    if (personsFromLar.includes(vbe.person)) {
      return { vbe: replaceEntry(vbe, tlul), vbp };
    }
    if (ph.s === "را") {
      return { vbe: replaceEntry(vbe, raatlul), vbp };
    }
    if (ph.s === "در") {
      return { vbe: replaceEntry(vbe, dartlul), vbp };
    }
    if (ph.s === "ور") {
      return { vbe: replaceEntry(vbe, wartlul), vbp };
    }
    return { vbe, vbp };
  }
  return { vbe, vbp };
}

// TODO: make sure this is expanded to deal properly with stative compounds
function isAbilityAspectAmbiguousVBP(vbp: T.ParsedVBP): boolean {
  if (vbp.type === "welded") {
    return false;
  }
  if (vbp.info.type === "ppart") {
    return false;
  }
  if (vbp.info.verb.entry.separationAtP) {
    return true;
  }
  return isTlulVerb(vbp.info.verb);
}
