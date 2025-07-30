import * as T from "../../../types";
import { parseArgumentSection } from "./argument-section/parse-argument-section";
import { parseVerbSection } from "./verb-section/parse-verb-section";
import {
  addErrors,
  addShrunkenPossesor,
  bindParseResult,
  bindParseResultWParser,
  canTakeShrunkenPossesor,
  getPeople,
  getStatComp,
  getTransitivities,
  isPH,
  returnParseResult,
  returnParseResults,
  tokensExist,
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
import {
  assertNever,
  getEnglishPersonInfo,
  isFirstPerson,
  isSecondPerson,
  personGender,
  personNumber,
  personToGenNum,
} from "../misc-helpers";
import { ArgumentTypes, equals } from "rambda";
import {
  isImperativeTense,
  isPerfectTense,
  isTlulVerb,
} from "../type-predicates";
import { dynamicAuxVerbs } from "../dyn-comp-aux-verbs";
import {
  checkComplement,
  parsedCompToCompSelection,
  winnerOfNpAndCompliment,
} from "../phrase-building/complement-tools";
// import { personsFromPattern1 } from "./argument-section/parse-noun-word";
// import {
//   dartlul,
//   kawulStat,
//   raatlul,
//   tlul,
//   wartlul,
// } from "./verb-section/irreg-verbs";
import { getAspect, isStatComp } from "../new-verb-engine/rs-helpers";
import { isKawulStat, isKedulStat } from "./verb-section/parse-verb-helpers";
import { kawulStat } from "./verb-section/irreg-verbs";
import { tlul, raatlul, dartlul, wartlul } from "./verb-section/irreg-verbs";

type Target = {
  genders: T.Gender[];
  numbers: T.NounNumber[];
};

const anyTarget: Target = {
  genders: ["masc", "fem"],
  numbers: ["singular", "plural"],
};

// TODO!! mini-pronoun possesives in equative parsing!!
// TODO!! پخې مې کړلې - renders as پخی مې کړلې

// waawredula for RAINED ?!

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

// BIG ISSUE - دا د ده د دادا داد دی doesn't display the complement in rendering

type PhraseSelection = T.VPSelectionComplete | T.EPSelectionComplete;

export function parseVP(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
): T.ParseResult<PhraseSelection>[] {
  if (!tokensExist(tokens)) {
    return [];
  }
  const argument = parseArgumentSection(tokens, dictionary);
  // removeRedundantStatCombos(
  return removeRedundantStatCombos(
    bindParseResultWParser(
      argument,
      (tokens) => parseVerbSection(tokens, dictionary),
      (arg, vs, tkns) => {
        if (tokensExist(tkns)) {
          // parseVP should only work when it consumes all the tokens
          return [];
        }
        return combineArgAndVerbSections(tkns, dictionary, arg, vs);
      },
    ),
    dictionary,
  );
}

function combineArgAndVerbSections(
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
  arg: ReturnType<typeof parseArgumentSection>[number]["body"],
  vs: ReturnType<typeof parseVerbSection>[number]["body"],
): T.ParseResult<PhraseSelection>[] {
  const [kids, kidsErrors] = consolidateKidsSection(arg, vs.kids);
  const blocks = [
    ...arg.npsAndAps,
    ...(arg.complement ? [arg.complement] : []),
  ];
  const ba = kids.some((k) => k === "ba");
  const { tenses, eq } = getTenses(vs.blocks, ba, dictionary);
  if (eq) {
    if (tokensExist(tokens)) {
      return [];
    }
    return createPossesivePossibilities({ blocks, kids }).flatMap(
      ({ kids, blocks }) => {
        return finishEquative(
          tokens,
          blocks,
          getMiniPronouns(kids),
          eq,
          vs.blocks.some((x) => x.type === "negative"),
        );
      },
    );
  }
  return createPossesivePossibilities({
    blocks,
    kids,
  }).flatMap(({ kids, blocks }) => {
    const miniPronouns = getMiniPronouns(kids);
    const npsAndAps = blocks.filter((x) => x.type === "NP" || x.type === "AP");
    const exComplement = blocks.find((x) => x.type === "complement");

    // with مړه کېږم somehow there are tenses being created that are losing the
    // Comp Head or ExComplement
    return tenses.flatMap(
      ({
        tense,
        person,
        transitivities,
        negative,
        verb,
        errors,
        target,
        isCompound,
        voice,
      }) => {
        const isPast = isPastTense(tense);
        return transitivities.flatMap<T.ParseResult<T.VPSelectionComplete>>(
          (transitivity): T.ParseResult<T.VPSelectionComplete>[] => {
            const v: T.VerbSelectionComplete = {
              type: "verb",
              verb,
              transitivity,
              canChangeTransitivity: verb.entry.c.includes(
                "v. trans./gramm. trans.",
              ),
              canChangeStatDyn: false,
              negative,
              tense,
              canChangeVoice: transitivity === "transitive",
              isCompound,
              voice,
            };
            if (transitivity === "intransitive" || voice === "passive") {
              return bindParseResult(
                finishIntransitive({
                  kidsErrors,
                  miniPronouns,
                  npsAndAps,
                  exComplement,
                  tokens,
                  v,
                  vbePerson: person,
                  target,
                }).map(addErrors(errors)),
                checkForDynCompounds(dictionary),
              );
            } else if (transitivity === "transitive") {
              const res = bindParseResult(
                finishTransitive({
                  kidsErrors,
                  miniPronouns,
                  npsAndAps,
                  exComplement,
                  tokens,
                  v,
                  vbePerson: person,
                  target,
                  isPast,
                }).map(addErrors(errors)),
                checkForDynCompounds(dictionary),
              );
              return res;
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
                target,
                isPast,
              }).map(addErrors(errors));
            }
          },
        );
      },
    );
  });
}

function finishEquative(
  tokens: T.Tokens,
  blocks: T.ParsedBlock[],
  miniPronouns: T.ParsedMiniPronoun[],
  eq: { tense: T.EquativeTense; person: T.Person },
  negative: boolean,
): T.ParseResult<T.EPSelectionComplete>[] {
  const errors: T.ParseError[] = [...ensureNoMiniPronouns(miniPronouns)];
  const nps = blocks.filter((x) => x.type === "NP");
  const npsAndAps = blocks.filter((x) => x.type === "NP" || x.type === "AP");
  const comp = blocks.find((x) => x.type === "complement");
  if (nps.length > 1) {
    return [];
  }
  if (!comp) {
    return [];
  }
  if (nps.length && nps[0].inflected) {
    errors.push({
      message: "subject in an equative phrase cannot be inflected",
    });
  }
  const subjects: T.ParsedNP[] = nps.length
    ? [nps[0]]
    : makeShadowPronouns(false, eq.person, comp);
  return subjects.flatMap((subject) => {
    const winner = winnerOfNpAndCompliment(subject.selection, comp);
    if (winner.person !== eq.person) {
      errors.push({
        message: `equative must agree with ${
          winner.source === "np" ? "subject" : "complement NP in this case."
        }, the equative must me ${getEnglishPersonInfo(winner.person)}`,
      });
    }
    if (winner.source === "np") {
      const target = getTarget(comp.selection);
      const subjPerson = getPersonFromNP(subject.selection);
      if (!targetMatches(subjPerson, target)) {
        errors.push({
          message: `complement must match subj.`,
        });
      }
    }
    const predicate = parsedCompToCompSelection(comp);
    if (!predicate) {
      return [];
    }
    const selection: T.EPSelectionComplete = {
      blocks: mapEqOutNpAndAps(
        nps.length ? npsAndAps : [subject, ...npsAndAps],
      ),
      equative: {
        tense: eq.tense,
        negative,
      },
      predicate,
      omitSubject: !nps.length,
    };
    return returnParseResult(tokens, selection, errors);
  });
}

// TODO: could also check for order errors in the consolidated kid's section ?
function consolidateKidsSection(
  arg: ReturnType<typeof parseArgumentSection>[number]["body"],
  vsKids: { position: number; section: T.ParsedKid[] }[],
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
                .join(", ")} out of place. Found after block ${
                k.position
              }, should be after the first block.`,
            },
          ],
        ];
      }
    },
    [[], []],
  );
}

type TransitivePossibility = {
  s: T.ParsedNP;
  o: T.ParsedNP | T.Person.ThirdPlurMale;
  blocks: T.VPSBlockComplete[];
  form: T.FormVersion;
};

type MakeTransPossibilitiesProps = {
  tokens: T.Tokens;
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
  target,
}: {
  kidsErrors: T.ParseError[];
  miniPronouns: T.ParsedMiniPronoun[];
  npsAndAps: (T.ParsedNP | T.APSelection)[];
  exComplement: T.ParsedComplementSelection | undefined;
  tokens: T.Tokens;
  v: T.VerbSelectionComplete;
  vbePerson: T.Person;
  target: Target;
}): T.ParseResult<T.VPSelectionComplete>[] {
  const nps = npsAndAps.filter((x): x is T.ParsedNP => x.type === "NP");
  const { complement, compPresenceErrors } = checkComplementPresence(
    v.verb,
    exComplement,
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
      target,
    });
    const o = "none" as const;
    const allBlocksTemp: ArgumentTypes<typeof limitNPs>[0] = [
      ...(np ? [] : [s]),
      ...npsAndAps,
    ];
    const subjPosition = allBlocksTemp.findIndex(
      (x) => typeof x === "object" && x.type === "NP",
    );
    const allBlocks = allBlocksTemp.toSpliced(subjPosition + 1, 0, o);
    const blocks = mapOutNpsAndAps(["S"], limitNPs(allBlocks, 1));
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
  target,
  isPast,
}: {
  kidsErrors: T.ParseError[];
  miniPronouns: T.ParsedMiniPronoun[];
  npsAndAps: (T.ParsedNP | T.APSelection)[];
  exComplement: T.ParsedComplementSelection | undefined;
  tokens: T.Tokens;
  v: T.VerbSelectionComplete;
  vbePerson: T.Person;
  target: Target;
  isPast: boolean;
}): T.ParseResult<T.VPSelectionComplete>[] {
  const nps = npsAndAps.filter((x): x is T.ParsedNP => x.type === "NP");
  const { complement, compPresenceErrors } = checkComplementPresence(
    v.verb,
    exComplement,
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
        target,
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
    vbePerson,
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
        blocks: mapOutNpsAndAps(["S", "O"], [s, o, ...aps]),
        form,
      },
      errors,
    };
  });
}

function getTransPossibilitiesWOneNP(
  np: T.ParsedNP,
  exComplement: T.ParsedComplementSelection | undefined,
) {
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
          makeShadowPronouns(false, vbePerson, exComplement)
        : // make a pronoun filler possibilities for the shrunken servant
          expandShrunkenServant(
            miniPronouns,
            isPast,
            getPersonFromNP(np.selection),
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
            blocks: mapOutNpsAndAps(
              ["S", "O"],
              npsAndAps.toSpliced(insertFilledAt, 0, f),
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
          blocks: mapOutNpsAndAps(
            !flip ? ["S", "O"] : ["O", "S"],
            limitNPs(npsAndAps, 2),
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
  target,
  isPast,
}: {
  kidsErrors: T.ParseError[];
  miniPronouns: T.ParsedMiniPronoun[];
  npsAndAps: (T.ParsedNP | T.APSelection)[];
  tokens: T.Tokens;
  v: T.VerbSelectionComplete;
  person: T.Person;
  target: Target;
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
        target,
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
        blocks: mapOutNpsAndAps(["S", "O"], [s, o, ...aps]),
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
          blocks: mapOutNpsAndAps(["S", "O"], [subject, object, ...aps]),
          form,
        },
        errors,
      },
    ];
  };
}

function getTenses(
  blocks: T.ParsedVerbSectionBlock[],
  ba: boolean,
  dictionary: T.DictionaryAPI,
): {
  tenses: {
    tense: T.VerbTense | T.PerfectTense | T.AbilityTense | T.ImperativeTense;
    person: T.Person;
    target: Target;
    transitivities: T.Transitivity[];
    negative: boolean;
    verb: T.VerbEntry;
    errors: T.ParseError[];
    isCompound: T.VerbSelectionComplete["isCompound"];
    voice: T.Voice;
  }[];
  eq: { tense: T.EquativeTense; person: T.Person } | undefined;
} {
  const negIndex = blocks.findIndex((x) => x.type === "negative");
  const negative: T.NegativeBlock | undefined = blocks[negIndex] as
    | T.NegativeBlock
    | undefined;
  const phIndex = blocks.findIndex(isPH);
  const vx = blocks.find((x) => x.type === "parsedV");
  if (!vx) {
    const eq = blocks.find((x) => x.type === "parsed vbb aux");
    if (eq?.content.type !== "parsed vbb eq") {
      return { tenses: [], eq: undefined };
    }
    const tense = getEquativeTense(ba, eq.content.info.tense);
    if (!tense) {
      return { tenses: [], eq: undefined };
    }
    return {
      tenses: [],
      eq: {
        tense,
        person: eq.content.person,
      },
    };
  }
  const vbbAux = blocks.find((x) => x.type === "parsed vbb aux");
  const ph = phIndex !== -1 ? (blocks[phIndex] as T.ParsedPH) : undefined;
  const { info, person, target, passive, errors, verbs } = getMainVerb(
    ph,
    vx,
    vbbAux,
    dictionary,
  );
  const tenses = verbs.flatMap<ReturnType<typeof getTenses>["tenses"][number]>(
    (verb) =>
      getTensesFromRootsStems(ba, info, !!negative, verb).map((tense) => {
        const transitivities = getTransitivities(verb).filter(
          (x) => !(passive && x === "grammatically transitive"),
        );
        return {
          tense,
          transitivities,
          negative: !!negative,
          person,
          target,
          verb,
          errors,
          // TODO: this is dumb that we have to use this
          isCompound: getIsCompound(verb),
          voice: passive ? "passive" : ("active" as const),
        };
      }),
  );
  return { tenses, eq: undefined };
}

function getIsCompound(verb: T.VerbEntry): T.IsCompound {
  if (verb.entry.c.includes("stat. comp.")) {
    return "stative";
  }
  if (verb.entry.c.includes("dyn. comp.")) {
    return "dynamic";
  }
  return false;
}

function getMainVerb(
  ph: T.ParsedPH | undefined,
  vx: T.ParsedV<T.VerbX>,
  vbbAux: T.ParsedVBBAux | undefined,
  dictionary: T.DictionaryAPI,
): {
  info: (T.VbInfo & { ability: boolean }) | T.EqInfo;
  person: T.Person;
  target: Target;
  passive: boolean;
  errors: T.ParseError[];
  verbs: T.VerbEntry[];
} {
  const tlulCombos = checkForTlulCombosSubj(ph, vx);
  if (tlulCombos) {
    return tlulCombos;
  }
  const compHead = getCompHead(ph, vx);
  const target = getTarget(compHead);
  const { info, person, errors, passive, verb } = getMainInfo(vx, vbbAux);
  // TODO: this is a problem here that doesn't work for getting the transitivity of the comp verb
  const verbs = getVerbsWStatComp(compHead, verb, info, dictionary, passive);
  return {
    info,
    person,
    target,
    errors,
    verbs: compHead ? verbs : [verb],
    passive,
  };
}

const tlulVerbsDict: Record<string, { verb: T.VerbEntry; target: Target }> = {
  لاړ: {
    verb: tlul,
    target: { genders: ["masc"], numbers: ["singular", "plural"] },
  },
  لاړه: { verb: tlul, target: { genders: ["fem"], numbers: ["singular"] } },
  لاړې: { verb: tlul, target: { genders: ["fem"], numbers: ["plural"] } },
  را: {
    verb: raatlul,
    target: { genders: ["masc", "fem"], numbers: ["singular", "plural"] },
  },
  در: {
    verb: dartlul,
    target: { genders: ["masc", "fem"], numbers: ["singular", "plural"] },
  },
  ور: {
    verb: wartlul,
    target: { genders: ["masc", "fem"], numbers: ["singular", "plural"] },
  },
};

function checkForTlulCombosSubj(
  ph: T.ParsedPH | undefined,
  vx: T.ParsedV<T.VerbX>,
): ReturnType<typeof getMainVerb> | undefined {
  if (ph?.type !== "PH") {
    return undefined;
  }
  if (vx.content.type !== "active basic") {
    return undefined;
  }
  if (
    vx.content.content.type !== "parsed vbb verb" ||
    !isKedulStat(vx.content.content.info.verb) ||
    vx.content.content.info.aspect !== "perfective"
  ) {
    return undefined;
  }
  const match = tlulVerbsDict[ph.s];
  if (!match) {
    return undefined;
  }
  return {
    info: {
      ...vx.content.content.info,
      verb: match.verb,
      ability: false,
    },
    person: vx.content.content.person,
    target: match.target,
    verbs: [match.verb],
    passive: false,
    errors: [],
  };
}

type MainVerbInfo = T.VbInfo & { ability: boolean };
type MainEqInfo = T.EqInfo;

function getMainInfo(
  vx: T.ParsedV<T.VerbX>,
  vbbAux: T.ParsedVBBAux | undefined,
): {
  info: MainVerbInfo | MainEqInfo;
  verb: T.VerbEntry;
  person: T.Person;
  passive: boolean;
  errors: T.ParseError[];
} {
  function getBasicInfo(
    vbb: T.ParsedVBBVerb,
    passive: boolean,
  ): ReturnType<typeof getMainInfo> {
    return {
      info: {
        ...vbb.info,
        ability: false,
      },
      verb: vbb.info.verb,
      person: vbb.person,
      passive,
      errors: [],
    };
  }
  function getAbilityInfo(
    v: T.ParsedVBPBasicAbility,
    passive: boolean,
  ): ReturnType<typeof getMainInfo> {
    if (vbbAux?.content.type !== "parsed vbb verb") {
      throw new Error("we should have found an aux kedul verb here");
    }
    return {
      info: {
        ...vbbAux.content.info,
        aspect: v.info.aspect,
        ability: true,
      },
      verb: v.info.verb,
      person: vbbAux.content.person,
      passive,
      errors: [],
    };
  }
  function getPerfectInfo(
    v: T.ParsedVBPBasicPart,
    passive: boolean,
  ): ReturnType<typeof getMainInfo> {
    if (vbbAux?.content.type !== "parsed vbb eq") {
      throw new Error("we should have found an equative here");
    }

    const partGenNum = v.info.genNum;
    const eqGenNum = personToGenNum(vbbAux.content.person);
    const errors: T.ParseError[] = !equals(partGenNum, eqGenNum)
      ? [
          {
            message: `equative (${eqGenNum.gender}. ${eqGenNum.number}) and past participle (${partGenNum.gender}. ${partGenNum.number}) do not agree`,
          },
        ]
      : [];
    return {
      verb: v.info.verb,
      info: vbbAux.content.info,
      person: vbbAux.content.person,
      passive,
      errors,
    };
  }
  if (vx.content.type === "active basic") {
    if (vx.content.content.type === "parsed vbb eq") {
      throw new Error("we should not find an equative here!");
    }
    if (vx.content.content.type === "parsed vbb verb") {
      return getBasicInfo(vx.content.content, false);
    }
    if (vx.content.content.type === "parsed vbp basic ability") {
      return getAbilityInfo(vx.content.content, false);
    }
    if (vx.content.content.type === "parsed vbp basic part") {
      return getPerfectInfo(vx.content.content, false);
    }
    assertNever(vx.content.content, "unknown ParsedV type");
  }
  if (vx.content.type === "active welded") {
    if (vx.content.content.right.type === "parsed vbb eq") {
      throw new Error("shouldn't find an eq here B");
    }
    if (vx.content.content.right.type === "parsed vbb verb") {
      return getBasicInfo(vx.content.content.right, false);
    }
    if (vx.content.content.right.type === "parsed vbp basic part") {
      return getPerfectInfo(vx.content.content.right, false);
    }
    if (vx.content.content.right.type === "parsed vbp basic ability") {
      return getAbilityInfo(vx.content.content.right, false);
    }
    assertNever(vx.content.content.right, "unknown ParsedV type");
  }
  if (vx.content.type === "passive welded") {
    if (vx.content.content.right.type === "parsed vbb eq") {
      throw new Error("shouldn't find an eq here B");
    }
    const verb = vx.content.content.left;
    if (vx.content.content.right.type === "parsed vbb verb") {
      return getBasicInfo(
        {
          ...vx.content.content.right,
          info: {
            ...vx.content.content.right.info,
            verb,
          },
        },
        true,
      );
    }
    if (vx.content.content.right.type === "parsed vbp basic part") {
      return getPerfectInfo(
        {
          ...vx.content.content.right,
          info: {
            ...vx.content.content.right.info,
            verb,
          },
        },
        true,
      );
    }
    if (vx.content.content.right.type === "parsed vbp basic ability") {
      return getAbilityInfo(
        {
          ...vx.content.content.right,
          info: {
            ...vx.content.content.right.info,
            verb,
          },
        },
        true,
      );
    }
    assertNever(vx.content.content.right, "unknown ParsedV type");
  }
  if (vx.content.type === "passive doub welded") {
    if (vx.content.content.right.type === "parsed vbb eq") {
      throw new Error("shouldn't find an eq here B");
    }
    if (vx.content.content.right.type === "parsed vbb verb") {
      return getBasicInfo(vx.content.content.right, true);
    }
    if (vx.content.content.right.type === "parsed vbp basic part") {
      return getPerfectInfo(vx.content.content.right, true);
    }
    if (vx.content.content.right.type === "parsed vbp basic ability") {
      return getAbilityInfo(vx.content.content.right, true);
    }
    assertNever(vx.content.content.right, "unknown passive doub welded type");
  }
  assertNever(vx.content, "unknown ParsedV type");
}

function getCompHead(
  ph: T.ParsedPH | undefined,
  vx: T.ParsedV<T.VerbX>,
): T.ParsedComplementSelection["selection"] | undefined {
  if (ph) {
    return ph.type === "CompPH" ? ph.selection : undefined;
  }
  if (vx.content.type === "active welded") {
    return vx.content.content.left.selection;
  }
  if (vx.content.type === "passive doub welded") {
    return vx.content.content.left.complement.selection;
  }
  return undefined;
}

function getExtComplementL(
  comp: T.VPSelectionState["externalComplement"],
): number | undefined {
  if (!comp) {
    return undefined;
  }
  if (comp.selection.type === "unselected") {
    return undefined;
  }
  if (
    comp.selection.type !== "adjective" &&
    comp.selection.type !== "loc. adv." &&
    comp.selection.type !== "comp. noun"
  ) {
    return undefined;
  }
  if (comp.selection.type === "loc. adv.") {
    return comp.selection.entry.ts;
  }
  return comp.selection.entry.ts;
}

function getComplementL(
  comp: T.ParsedComplementSelection["selection"],
): number | undefined {
  if ("inflection" in comp) {
    return comp.selection.entry.ts;
  }
  // TODO: this will need to include comp nouns as we add them!
  if (comp.type !== "loc. adv.") {
    return undefined;
  }
  return comp.entry.ts;
}

function getTarget(
  comp: T.ParsedComplementSelection["selection"] | undefined,
): Target {
  if (comp && "inflection" in comp) {
    return {
      genders: comp.gender,
      numbers: comp.inflection.flatMap((i) =>
        i === 0 ? ["singular"] : i === 1 ? ["plural"] : [],
      ),
    };
  }
  return anyTarget;
}

function checkForDynCompounds(dictionary: T.DictionaryAPI) {
  return function (
    tokens: T.Tokens,
    vps: T.VPSelectionComplete,
  ): T.ParseResult<T.VPSelectionComplete>[] {
    if (vps.verb.transitivity !== "transitive") {
      return returnParseResult(tokens, vps);
    }
    const object: T.ObjectSelection | undefined = getObjectSelection(
      vps.blocks,
    );
    if (
      !object ||
      typeof object.selection !== "object" ||
      object.selection.selection.type !== "noun"
    ) {
      return returnParseResult(tokens, vps);
    }
    const dynAuxVerb = dynamicAuxVerbs.find(
      (v) => v.entry.p === vps.verb.verb.entry.p,
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
  subject: T.NPSelection,
): boolean {
  return isImperativeTense(tense) && !isSecondPerson(getPersonFromNP(subject));
}

function getNPInsertPoint(
  blocks: (T.ParsedNP | T.APSelection)[],
  isObj: boolean,
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
  exComp: T.ParsedComplementSelection | undefined,
): T.ParsedNP[] {
  if (
    exComp &&
    "type" in exComp.selection &&
    exComp.selection.type === "NP" &&
    isThirdPerson(vbePerson)
  ) {
    return getPeople(3, "both").map((person) =>
      makeShadowPronoun(inflected, person),
    );
  }
  return [makeShadowPronoun(inflected, vbePerson)];
}

function expandShrunkenServant(
  miniPronouns: T.ParsedMiniPronoun[],
  isPast: boolean,
  kingPerson: T.Person,
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
            person,
          ),
        ],
  );
}

function ensureDroppedKing(
  miniPronouns: T.ParsedMiniPronoun[],
): T.ParseError[] {
  return miniPronouns.length
    ? [{ message: `unused mini pronoun: ${miniPronouns[0]}` }]
    : [];
}

function ensureNoMiniPronouns(
  miniPronouns: T.ParsedMiniPronoun[],
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

function checkIntransitiveStructure({
  s,
  exComplement,
  vbePerson,
  target,
}: {
  s: T.ParsedNP;
  exComplement: T.ParsedComplementSelection | undefined;
  vbePerson: T.Person;
  target: Target;
}): T.ParseError[] {
  const subjPerson = getPersonFromNP(s.selection);
  const errors: T.ParseError[] = checkComplement(exComplement, subjPerson);
  const winner = winnerOfNpAndCompliment(s.selection, exComplement);
  if (winner.person !== vbePerson) {
    errors.push({
      message: `intransitive verb must agree with ${
        winner.source === "np" ? "subject" : "complement NP in this case."
      }`,
    });
  }
  // TODO: are we sure the stat comp comp matches simply the subject and not the winner?
  if (!targetMatches(subjPerson, target)) {
    errors.push({
      message:
        "complement of stative compound must match subject in intransitive verb",
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
  target,
}: {
  s: T.ParsedNP;
  o: T.ParsedNP | T.Person.ThirdPlurMale;
  exComplement: T.ParsedComplementSelection | undefined;
  isPast: boolean;
  vbePerson: T.Person;
  target: Target;
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
      getPersonFromNP(o.selection),
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
      if (!targetMatches(winner.person, target)) {
        errors.push({
          message: `complement of stative compound must match the object`,
        });
      }
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
      const winner = T.Person.ThirdPlurMale;
      if (!targetMatches(winner, target)) {
        errors.push({
          message:
            "complement of stative compound in past tense grammatically transitive verb must match third pers. masc. sing. to agree with implied object",
        });
      }
      if (vbePerson !== winner) {
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
      if (!targetMatches(getPersonFromNP(o.selection), target)) {
        errors.push({
          message:
            "complement of stative compound must match object in non-past transitive verbs",
        });
      }
    } else {
      if (!targetMatches(T.Person.ThirdPlurMale, target)) {
        errors.push({
          message:
            "complement of stative compound must match third pers. masc. sing. to line up with implied object in gramm. trans. non-past verb",
        });
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
    ["me", "de", "ye", "mU"].includes(k),
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

function tenseFromAspectBaseBa(
  aspect: T.Aspect,
  base: "root" | "stem",
  hasBa: boolean,
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
  info: (T.VbInfo & { ability: boolean }) | T.EqInfo,
  negative: boolean,
  verb: T.VerbEntry,
): (T.VerbTense | T.ImperativeTense | T.PerfectTense | T.AbilityTense)[] {
  if (info.type === "equative") {
    const et = getEquativeTense(hasBa, info.tense);
    if (!et) return [];
    return [`${et}Perfect`];
  }
  if (info.imperative) {
    if (info.base === "root") {
      return [];
    }
    if (hasBa) {
      return [];
    }
    return info.aspect === "imperfective" || negative
      ? ["imperfectiveImperative"]
      : ["perfectiveImperative"];
  }
  const aspects: T.Aspect[] =
    info.ability && isAbilityAspectAmbiguousVBP(verb)
      ? ["imperfective", "perfective"]
      : [info.aspect];
  const baseTenses = aspects.map((aspect) =>
    tenseFromAspectBaseBa(aspect, info.base, hasBa),
  );
  return !info.ability
    ? baseTenses
    : baseTenses.map<T.AbilityTense>((bt) => `${bt}Modal`);
}

function getEquativeTense(
  ba: boolean,
  tense: T.EquativeTenseWithoutBa,
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

function mapEqOutNpAndAps(
  blocks: (T.ParsedNP | T.APSelection)[],
): T.EPSBlockComplete[] {
  return mapOutNpsAndAps(["S"], blocks) as T.EPSBlockComplete[];
}

/**
 * Make existing NP blocks into the Subject and Object selection
 * in the given order
 */
function mapOutNpsAndAps(
  npOrder: ("S" | "O")[],
  blocks: (T.APSelection | T.ParsedNP | T.Person.ThirdPlurMale | "none")[],
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
  amount: 1 | 2,
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
    [[], 0],
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
    pos: 0 | 1,
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
    pos: 0 | 1,
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
    i: number,
  ): T.ParsedBlock[][] {
    const v = people.map((person) =>
      blocks.map((x, j) => {
        if (i !== j) return x;
        const r = addShrunkenPossesor(x, person);
        return r || x;
      }),
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
      ...withFirstMiniAsPossesive.flatMap((x) =>
        x.kids.length ? spreadOutPoss(x, 0) : [],
      ),
    ];
  }
}

function checkComplementPresence(
  v: T.VerbEntry,
  exComplement: T.ParsedComplementSelection | undefined,
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

function isAbilityAspectAmbiguousVBP(verb: T.VerbEntry): boolean {
  if (isStatComp(verb) && getTransitivities(verb).includes("intransitive")) {
    return true;
  }
  if (verb.entry.separationAtP) {
    return true;
  }
  return isTlulVerb(verb);
}

function targetMatches(person: T.Person, target: Target): boolean {
  const number = personNumber(person);
  const gender = personGender(person);
  return target.genders.includes(gender) && target.numbers.includes(number);
}

/**
 * if a stative compound is present, this removes the redundant version made with "to make ___ ___" etc.
 *
 * ie. if you have "maa pyaala maata kRa"
 * Then it should only be "I BROKE the cup" and not also "I made the cup broken"
 */
function removeRedundantStatCombos(
  res: T.ParseResult<PhraseSelection>[],
  dictionary: T.DictionaryAPI,
): T.ParseResult<PhraseSelection>[] {
  return res.filter((r) => {
    if ("equative" in r.body) {
      return true;
    }
    if (r.body.externalComplement) {
      const compTs = getExtComplementL(r.body.externalComplement);
      if (!compTs) {
        return true;
      }
      // see if there's a version with the stative compound
      // TODO: this could be an overly simplistic way of checking
      const sc = isKedulStat(r.body.verb.verb) || isKawulStat(r.body.verb.verb);
      if (!sc) {
        return true;
      }
      const aspect = isPerfectTense(r.body.verb.tense)
        ? undefined
        : getAspect(r.body.verb.tense, r.body.verb.negative);
      const possibleMatchingStatCompVerbs = getStatComp(
        compTs,
        {
          verb: r.body.verb.verb,
          aspect,
        },
        dictionary,
        false,
      );
      return !possibleMatchingStatCompVerbs.length;
      // I think the above is a better strategy and covers the case below
      // return (
      //   // !possibleMatchingStatCompVerbs.length &&
      //   !res.some(
      //     (vp) =>
      //       isStatComp(vp.body.verb.verb) &&
      //       compTs === vp.body.verb.verb.complement?.ts,
      //   )
      // );
    }
    return true;
  });
}

function getVerbsWStatComp(
  compHead: T.ParsedComplementSelection["selection"] | undefined,
  verb: T.VerbEntry,
  info: MainVerbInfo | MainEqInfo,
  dictionary: T.DictionaryAPI,
  passive: boolean,
): T.VerbEntry[] {
  if (!compHead) {
    return [];
  }

  return getStatComp(
    getComplementL(compHead),
    {
      verb: passive && isKedulStat(verb) ? kawulStat : verb,
      aspect: info.type === "equative" ? undefined : info.aspect,
    },
    dictionary,
    true,
  );
}
