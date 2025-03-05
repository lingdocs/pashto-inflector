/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// type prettify<t> = {
//     [k in keyof t]: t[k];
// } & {};

export type PsStringField = "p" | "f";
export type PsString = {
  [k in PsStringField]: string;
} & {
  e?: string;
};
export type PsJSX = {
  p: JSX.Element;
  f: JSX.Element;
  e?: JSX.Element | string;
  sub?: JSX.Element | string;
};

export type PsWord = PsString & {
  hyphen?: HyphenPsContent[];
};

export type HyphenPsContent =
  | ({
      type: "unwritten";
      f: string;
    } & Omit<PsString, "p">)
  | ({
      type: "written";
    } & PsString);

export type DictionaryInfo = {
  title: string;
  license: string;
  release: number;
  numberOfEntries: number;
  url: string;
  infoUrl: string;
};

export type Dictionary = {
  info: DictionaryInfo;
  entries: DictionaryEntry[];
};

export type AllWordsWithInflections = {
  info: DictionaryInfo;
  words: PsString[];
};

// TODO: MAKE THIS A RECORD TYPE
// Record<RequiredNumberFields, number> && Record<RequiredStringFields, string> &&
// Partial<Record<StringFields, string>> && Partial<Record<NumberFields, number>>
export type DictionaryEntry = {
  // BASE REQUIRED INFO
  /** timestamp - used for word id */
  ts: number;
  /** Pashto alphabetical index */
  i: number;
  /**
   * commonality rank
   * 0 - wrong
   * 1 - historical/not in use
   * 2 - rarely used
   * 3 - used but there are more common alternatives
   * 4 - common
   */
  r?: number;
  /** entry in Pashto */
  p: string;
  /** entry in Phonetics */
  f: string;
  /** entry in simplified phonetics */
  g: string;
  /** entry in English */
  e: string;

  // PART OF SPEECH AND LINK INFO
  /** part of speech info */
  c?: string;
  /** link - timestamp of related word */
  l?: number;

  // INFLECTION INFO
  /** first masculine irregular inflection in Pashto */
  infap?: string;
  /** first masculine irregular inflection in Phonetics */
  infaf?: string;
  /** base for second masculine / feminine irregular inflection in Pashto */
  infbp?: string;
  /** base for second masculine / feminine irregular inflection in Phonetics */
  infbf?: string;
  /** entry does not inflect? */
  noInf?: boolean;

  // PLURAL INFO
  /** Arabic plural in Pashto */
  app?: string;
  /** Arabic plural in Phonetics */
  apf?: string;
  /** Pashto irregular plural in Pashto */
  ppp?: string;
  /** Pashto irregular plural in phonetics */
  ppf?: string;

  // VERB INFO
  /** imperfective (present) stem in Pashto */
  psp?: string;
  /** imperfective (present) stem in Phonetics */
  psf?: string;
  /** perfective (subjunctive) stem in Pashto */
  ssp?: string;
  /** perfective (subjunctive) stem in Phonetics */
  ssf?: string;
  /** perfective root in Pashto */
  prp?: string;
  /** perfective root in Phonetics */
  prf?: string;
  /** past participle in Pashto */
  pprtp?: string;
  /** past participle in Phonetics */
  pprtf?: string;
  /** The idiosyncratic third person singular masc. short past in Pashto  */
  tppp?: string;
  /** The idiosyncratic third person singular masc. short past in Phonetics  */
  tppf?: string;
  /** intransitive short version is available like ګرځېږي and ګرځي */
  shortIntrans?: boolean;
  /** does not take a و - oo perfective verb prefix? */
  noOo?: boolean;
  /** takes a seperate و - oo perfective verb prefix? */
  sepOo?: boolean;
  /** Pashto separation point for seperable verbs */
  separationAtP?: number;
  /** Phonetics separation point for seperable verbs */
  separationAtF?: number;

  // PHONETICS - PASHTO - DIACRITICS INFO
  /** Is an exception to the rules of diacritics for Pashto/Phonetics */
  diacExcept?: boolean;

  /** the English conjugations of a verb comma seperated set of 5 ie. "see,sees,seeing,saw,seen" or single word ie. "walk" if regular - or the english singular version of a noun */
  ec?: string;
  /** the English partical of a English phrasal verb - or the english irregular plural of a noun */
  ep?: string;

  /** If there is a recording [TS NUMBER].mp3 available for this entry, marked true with a 1  */
  a?: number;
};

export type DictionaryEntryNoFVars = DictionaryEntry & {
  __brand: "name for a dictionary entry with all the phonetics variations removed";
};
export type VerbDictionaryEntryNoFVars = VerbDictionaryEntry & {
  __brand2: "name for a verb dictionary entry with all the phonetics variations removed";
};
export type VerbEntryNoFVars = {
  entry: VerbDictionaryEntryNoFVars;
  complement?: DictionaryEntryNoFVars;
} & {
  __brand: "name for a verb entry with all the phonetics variations removed";
};
export type PsStringNoFVars = PsString & {
  __brand: "name for a ps string with all the phonetics variations removed";
};
export type FStringNoFVars = string & {
  __brand: "name for a phonetics string with all the phonetics variations removed";
};

export const dictionaryEntryTextFields = [
  "p",
  "f",
  "e",
  "c",
  "infap",
  "infaf",
  "infbp",
  "infbf",
  "app",
  "apf",
  "ppp",
  "ppf",
  "psp",
  "psf",
  "ssp",
  "ssf",
  "prp",
  "prf",
  "pprtp",
  "pprtf",
  "tppp",
  "tppf",
  "ec",
  "ep",
] as const;
export type DictionaryEntryTextField =
  (typeof dictionaryEntryTextFields)[number];
export const dictionaryEntryBooleanFields = [
  "noInf",
  "shortIntrans",
  "noOo",
  "sepOo",
  "diacExcept",
] as const;
export const dictionaryEntryNumberFields = [
  "ts",
  "r",
  "i",
  "l",
  "separationAtP",
  "separationAtF",
  "a",
] as const;
export type DictionaryEntryBooleanField =
  (typeof dictionaryEntryBooleanFields)[number];
export type DictionaryEntryNumberField =
  (typeof dictionaryEntryNumberFields)[number];
export type DictionaryEntryField =
  | DictionaryEntryTextField
  | DictionaryEntryBooleanField
  | DictionaryEntryNumberField;

// TODO: make

export type DictionaryEntryError = {
  errors: string[];
  p: string;
  f: string;
  e: string;
  ts: number;
  erroneousFields: DictionaryEntryField[];
};

export type Spelling = "Afghan" | "Pakistani ی" | "Pakistani ي";

export type TextOptions = {
  pTextSize: "normal" | "larger" | "largest";
  phonetics: "lingdocs" | "ipa" | "alalc" | "none";
  dialect: "standard" | "peshawer" | "southern";
  spelling: Spelling;
  diacritics: boolean;
};

export enum Person {
  FirstSingMale = 0,
  FirstSingFemale,
  SecondSingMale,
  SecondSingFemale,
  ThirdSingMale,
  ThirdSingFemale,
  FirstPlurMale,
  FirstPlurFemale,
  SecondPlurMale,
  SecondPlurFemale,
  ThirdPlurMale,
  ThirdPlurFemale,
}

// INPUT
// all information to be passed to conjugating functions
export type VerbInfoBase = {
  entry: VerbEntry;
  transitivity: Transitivity;
  yulEnding: boolean | null;
  stem: VerbStemSet;
  root: VerbRootSet;
  participle: ParticipleSet;
  idiosyncraticThirdMascSing?: ShortThirdPersFormSet;
};

export type PassiveRootsAndStems = {
  stem: VerbStemSet;
  root: VerbRootSet;
  participle: {
    past: FullForm<PsString>;
  };
};

export type AbilityRootsAndStems = Omit<PassiveRootsAndStems, "participle">;

export type SimpleVerbInfo = VerbInfoBase & {
  type: "simple";
};

export type StativeCompoundVerbInfo = VerbInfoBase & {
  type: "stative compound";
  complement: UnisexInflections;
};

export type GenerativeStativeCompoundVerbInfo = VerbInfoBase & {
  type: "generative stative compound";
  objComplement: ObjComplement;
  singularForm?: GenerativeStativeCompoundVerbInfo;
  // TODO: Could add intransitive form 🤪
};

export type DynamicCompoundVerbInfo = VerbInfoBase & {
  type: "dynamic compound";
  objComplement: ObjComplement;
  auxVerb: DictionaryEntry;
  auxVerbComplement?: DictionaryEntry;
  singularForm?: DynamicCompoundVerbInfo;
  intransitiveForm?: DynamicCompoundVerbInfo;
};

export type ObjComplement = {
  entry: DictionaryEntry;
  plural?: PsString;
  person: Person;
};

export type NonComboVerbInfo =
  | SimpleVerbInfo
  | StativeCompoundVerbInfo
  | DynamicCompoundVerbInfo
  | GenerativeStativeCompoundVerbInfo;

export type VerbInfo =
  | NonComboVerbInfo
  | {
      type: "transitive or grammatically transitive simple";
      transitive: SimpleVerbInfo;
      grammaticallyTransitive: SimpleVerbInfo;
    }
  | {
      type: "dynamic or stative compound";
      transitivity: Transitivity;
      stative: StativeCompoundVerbInfo;
      dynamic: DynamicCompoundVerbInfo;
    }
  | {
      type: "dynamic or generative stative compound";
      transitivity: Transitivity;
      stative: GenerativeStativeCompoundVerbInfo;
      dynamic: DynamicCompoundVerbInfo;
    };

export type Transitivity =
  | "transitive"
  | "intransitive"
  | "grammatically transitive";

export type SplitInfo = FullForm<[PsString, PsString]>;

export type VerbStemSet = {
  perfective: FullForm<PsString>;
  imperfective: FullForm<PsString>;
  perfectiveSplit?: SplitInfo;
};

export type VerbRootSet = {
  perfective: OptionalPersonInflections<LengthOptions<PsString>>;
  imperfective: OptionalPersonInflections<LengthOptions<PsString>>;
  perfectiveSplit?: SplitInfo;
};

export type ParticipleSet = {
  present: FullForm<PsString>;
  past: FullForm<PsString>;
};

export type ShortThirdPersFormSet = {
  [K in Aspect]: PsString;
};

export type Aspect = "perfective" | "imperfective";

export type Length = "short" | "long" | "mini";

export type LengthOptions<T> = {
  long: T;
  short: T;
  mini?: T;
};

export type PersonInflectionsField =
  | "mascSing"
  | "mascPlur"
  | "femSing"
  | "femPlur";
export type PersonInflections<T> = {
  [K in PersonInflectionsField]: T;
};
export type OptionalPersonInflections<T> = PersonInflections<T> | T;

export type SingleOrLengthOpts<T> = T | LengthOptions<T>;

export type VerbConjugation = {
  info: NonComboVerbInfo;
  // INFINITIVE = info.root.imperfective.long
  imperfective: AspectContent; // --╖  ASPECT = "imperfective"
  perfective: AspectContent; // --╜  ASPECT = "perfective"
  hypothetical: VerbForm; // INFINITIVE - ul + aay
  participle: ParticipleContent;
  perfect: PerfectContent; // PPART = PAST PARTICIPLE (plus spectial short forms)
  passive?: PassiveContent; // only on transitive verbs
  singularForm?: VerbConjugation;
};

export type VerbOutput =
  | VerbConjugation
  | {
      info: VerbInfo;
      stative: VerbConjugation;
      dynamic: VerbConjugation;
    }
  | {
      info: VerbInfo;
      transitive: VerbConjugation;
      grammaticallyTransitive: VerbConjugation;
    };

export type PassiveContent = {
  imperfective: AspectContentPassive; // --╖  ASPECT = "imperfective"
  perfective: AspectContentPassive; //   --╜  ASPECT = "perfective"
  perfect: PerfectContent; // PPART INFINITIVE + kedulStat perfect.pastParticiple
  // TODO: ADD PARTICIPLE
};

// ASPECT -> AspectContent
export type AspectContent = {
  // STEM = info.stem[ASPECT]
  // ROOT = info.root[ASPECT]
  nonImperative: VerbForm; // STEM + pres ending
  future: VerbForm; // به + this.nonImperative
  imperative: ImperativeForm; // STEM + imperative ending
  past: VerbForm; // ROOT + past ending
  habitualPast: VerbForm; // ba + past
  modal: ModalContent;
};

// ASPECT -> AspectContentPssive
export type AspectContentPassive = Omit<AspectContent, "imperative"> & {
  imperative: undefined;
};

export type ModalContent = {
  nonImperative: VerbForm; // ROOT + ey + kedulStat.perfective.nonImperative
  future: VerbForm; // به + this.nonImperative
  past: VerbForm; // ROOT + ey + kedulStat.perfective.past
  habitualPast: VerbForm; // ba + past
  hypotheticalPast: VerbForm; // ROOT + ey + shw + ey
};

export type ParticipleForm =
  | SingleOrLengthOpts<UnisexInflections>
  | SingleOrLengthOpts<PsString>;

export type ParticipleContent = {
  past: SingleOrLengthOpts<UnisexInflections> | SingleOrLengthOpts<PsString>;
  // TODO: Should this ever have an object matrix??
  present: SingleOrLengthOpts<UnisexInflections>;
};

// PPART -> PerfectContent
export type PerfectContent = {
  halfPerfect: VerbForm; // PPART
  past: VerbForm; // PPART + equative.past
  present: VerbForm; // PPART + equative.prest
  habitual: VerbForm; // PPART + equative.habit
  subjunctive: VerbForm; // PPART + equative.subj
  future: VerbForm; // ba + PPART + equative.subj
  wouldBe: VerbForm; // ba + PPART + equative.past
  pastSubjunctive: VerbForm; // PPART + waay
  wouldHaveBeen: VerbForm; // PPART + ba + waay
};

// Plain, 1st, and 2nd Inflection
export type InflectionSet = ArrayFixed<ArrayOneOrMore<PsString>, 3>;

// Plural and Second Inflection
export type PluralInflectionSet = ArrayFixed<ArrayOneOrMore<PsString>, 2>;

export const genders = ["masc", "fem"] as const;
export type Gender = (typeof genders)[number];

export type UnisexSet<T> = Record<Gender, T>;
export type GenderedSet<T> =
  | UnisexSet<T>
  | Omit<UnisexSet<T>, "fem">
  | Omit<UnisexSet<T>, "masc">;
export type UnisexInflections = UnisexSet<InflectionSet>;

export type Inflections = GenderedSet<InflectionSet>;

export type PluralInflections = GenderedSet<PluralInflectionSet>;

export type InflectorOutput =
  | {
      arabicPlural: PluralInflections;
      plural?: PluralInflections;
      bundledPlural?: PluralInflections;
      inflections?: Inflections;
      vocative?: PluralInflections;
    }
  | {
      plural: PluralInflections;
      arabicPlural?: PluralInflections;
      bundledPlural?: PluralInflections;
      inflections?: Inflections;
      vocative?: PluralInflections;
    }
  | {
      inflections?: Inflections;
      vocative?: PluralInflections;
    }
  | false;

export type PersonLine = [
  /** singular form of person */
  ArrayOneOrMore<PsString>,
  /** plural form of person */
  ArrayOneOrMore<PsString>
];

/**
 * The basic form of a verb conjugation
 * Each line representing one person (singular and plural)
 * 1st Person Male, 1st Person Female, 2nd Person Male etc...
 */
export type VerbBlock = [
  PersonLine, // 1st Person Male
  PersonLine, // 1st Person Female
  PersonLine, // 2nd Person Male
  PersonLine, // 2nd Person Female
  PersonLine, // 3rd Person Male
  PersonLine // 3rd Person Female
];

export type EnglishBlock = [
  [string, string],
  [string, string],
  [string, string],
  [string, string],
  [string, string],
  [string, string]
];

export type ImperativeBlock = [
  PersonLine, // 2nd Person Male
  PersonLine // 2nd Person Female
];

export type FullForm<T> = OptionalPersonInflections<SingleOrLengthOpts<T>>;
export type VerbForm = FullForm<VerbBlock>;
export type ImperativeForm = FullForm<ImperativeBlock>;
export type SentenceForm = SingleOrLengthOpts<ArrayOneOrMore<PsString>>;

export interface ArrayFixed<T, L extends number> extends Array<T> {
  0: T;
  length: L;
}

export type Wrapper<T> = T & { __brand: "wrapped" };

export type ArrayOneOrMore<T> = {
  0: T;
} & T[];

export type RootsOrStemsToHighlight = (
  | "imperfective root"
  | "perfective root"
  | "imperfective stem"
  | "perfective stem"
  | "past participle"
)[];

/* i.e. ec: ["take", "takes", "taking", "took", "taken"], ep: out  */
export type EnglishVerbConjugationEc = [string, string, string, string, string];
export type EnglishVerbConjugation = {
  ec: EnglishVerbConjugationEc;
  ep: string | undefined;
};

export type DisplayFormItem =
  | DisplayForm
  | DisplayFormSubgroup
  | DisplayFormForSentence;
export type EnglishBuilder = (
  subject: Person,
  ec: EnglishVerbConjugationEc,
  neg: boolean
) => string[];

export type DisplayForm = {
  label: string;
  aspect?: Aspect;
  form: VerbForm | ImperativeForm | ParticipleForm | SentenceForm;
  advanced?: boolean;
  englishBuilder?: EnglishBuilder;
  formula: React.ReactNode;
  explanation: React.ReactNode;
  sentence?: boolean;
  passive?: boolean;
  past?: boolean;
  reorderWithNegative?: boolean;
};

export type DisplayFormForSentence = Omit<DisplayForm, "form"> & {
  form: VerbForm;
  secondPronounNeeded?: boolean;
};

// {
//     label: string,
//     aspect?: Aspect,
//     form: VerbForm,
//     advanced?: boolean,
//     englishBuilder?: EnglishBuilder,
//     formula: React.ReactNode,
//     secondPronounNeeded?: boolean,
//     explanation: React.ReactNode,
//     sentence?: boolean,
//     passive?: boolean,
//     past?: boolean,
//     reorderWithNegative?: boolean,
// }

export type DisplayFormSubgroup = {
  label: string;
  subgroup: string;
  advanced?: boolean;
  content: DisplayFormItem[];
};

export type AayTail = "ey" | "aay";

export type InflectableEntry =
  | NounEntry
  | AdjectiveEntry
  | NumberEntry
  | AdverbEntry
  | DeterminerEntry;
export type NounEntry = DictionaryEntry & { c: string } & {
  __brand: "a noun entry";
};
export type NumberEntry = DictionaryEntry & { c: string } & {
  __brand: "a number entry";
};
export type MascNounEntry = NounEntry & { __brand2: "a masc noun entry" };
export type FemNounEntry = NounEntry & { __brand2: "a fem noun entry" };
export type AnimNounEntry = NounEntry & { __brand3: "a anim noun entry" };
export type UnisexNounEntry = MascNounEntry & {
  __brand3: "a unisex noun entry";
};
export type UnisexAnimNounEntry = UnisexNounEntry & {
  __brand4: "an anim unisex noun entry";
};
export type AdverbEntry = DictionaryEntry & { c: string } & {
  __brand: "an adverb entry";
};
export type DeterminerEntry = DictionaryEntry & { c: string } & {
  __brand: "a determiner entry";
};
export type LocativeAdverbEntry = AdverbEntry & {
  __brand2: "a locative adverb entry";
};
export type AdjectiveEntry = DictionaryEntry & { c: string } & {
  __brand: "an adjective entry";
};
export type VerbDictionaryEntry = DictionaryEntry & { c: string } & {
  __brand: "a verb entry";
};
export type VerbEntry = {
  entry: VerbDictionaryEntry;
  // TODO: the compliment could also be typed? Maybe?
  complement?: DictionaryEntry;
};

/** A dictionary entry that will include the complement / verb entry structure if it's a verb */
export type FullEntry = VerbEntry | DictionaryEntry;

export enum InflectionPattern {
  None = 0,
  Basic = 1,
  UnstressedAy = 2,
  StressedAy = 3,
  Pashtun = 4,
  Squish = 5,
  FemInanEe = 6,
}

export type SingularEntry<T extends NounEntry> = T & {
  __brand7: "a singular noun - as opposed to an always plural noun";
};
export type PluralNounEntry<T extends NounEntry> = T & {
  __brand7: "a noun that is always plural";
};

export type Pattern1Entry<T> = T & { __brand3: "basic inflection pattern" };
export type Pattern2Entry<T> = T & {
  __brand3: "ending in unstressed ی pattern";
};
export type Pattern3Entry<T> = T & { __brand3: "ending in stressed ی pattern" };
export type Pattern4Entry<T> = T & { __brand3: "Pashtoon pattern" };
export type Pattern5Entry<T> = T & { __brand3: "short squish pattern" };
export type Pattern6FemEntry<T extends FemNounEntry> = T & {
  __brand3: "non anim. ending in ي";
};
export type NonInflecting<T> = T & { __brand3: "non-inflecting" };

export type Entry = NounEntry | AdjectiveEntry | AdverbEntry | VerbEntry;
// TODO: make this Rendered<VPSelectionComplete> with recursive Rendered<>
export type VPRendered = {
  type: "VPRendered";
  king: "subject" | "object";
  servant: "subject" | "object" | undefined;
  isPast: boolean;
  isTransitive: boolean;
  isCompound: "stative" | "dynamic" | "generative stative" | false;
  blocks: Block[][];
  kids: Kid[];
  englishBase?: string[];
  form: FormVersion;
  whatsAdjustable: "both" | "king" | "servant";
};

export type VerbTense =
  | "presentVerb"
  | "subjunctiveVerb"
  | "perfectiveFuture"
  | "imperfectiveFuture"
  | "perfectivePast"
  | "imperfectivePast"
  | "habitualPerfectivePast"
  | "habitualImperfectivePast";
export type NounNumber = "singular" | "plural";

export type EquativeTense =
  | "present"
  | "subjunctive"
  | "habitual"
  | "past"
  | "future"
  | "wouldBe"
  | "pastSubjunctive"
  | "wouldHaveBeen";
export type EquativeTenseWithoutBa =
  | "present"
  | "subjunctive"
  | "habitual"
  | "past"
  | "pastSubjunctive";
export type PerfectTense = `${EquativeTense}Perfect`;
export type AbilityTense = `${VerbTense}Modal`;
export type ImperativeTense = `${Aspect}Imperative`;
export type Tense =
  | EquativeTense
  | VerbTense
  | PerfectTense
  | AbilityTense
  | ImperativeTense;

export type SubjectSelection = {
  type: "subjectSelection";
  selection: NPSelection | undefined;
};

export type ObjectSelection = {
  type: "objectSelection";
  selection: NPSelection | ObjectNP | undefined;
};

export type SubjectSelectionComplete = {
  type: "subjectSelection";
  selection: NPSelection;
};

export type PredicateSelectionComplete = {
  type: "predicateSelection";
  selection: ComplementSelection | NPSelection;
};

export type ObjectSelectionComplete = {
  type: "objectSelection";
  selection: NPSelection | ObjectNP;
};

export type VPSelectionState = {
  blocks: VPSBlock[];
  verb: VerbSelection;
  externalComplement:
    | undefined
    | UnselectedComplementSelection
    | ComplementSelection;
  form: FormVersion;
};

export type VPSelectionComplete = {
  blocks: VPSBlockComplete[];
  verb: VerbSelectionComplete;
  externalComplement: VPSelectionState["externalComplement"];
  form: FormVersion;
};

export type VerbFormName =
  | VerbTense
  | PerfectTense
  | AbilityTense
  | ImperativeTense;

export type VerbSelectionComplete = Omit<
  VerbSelection,
  "verbTense" | "perfectTense" | "imperativeTense" | "tenseCategory"
> & {
  tense: VerbFormName;
};

export type Voice = "active" | "passive";

export type NewVerbSelection = {
  type: "verb";
  verb: VerbEntryNoFVars;
  dynAuxVerb?: VerbEntryNoFVars;
  voice: Voice;
  canChangeVoice: boolean;
  negative: boolean;
  tense: VerbTense | PerfectTense | AbilityTense | ImperativeTense;
  transitivity: Transitivity;
  canChangeTransGenTrans: boolean;
  compound: "stative" | "dynamic" | false;
  canChangeStatDyn: boolean;
  canBeGenStat: boolean;
  variableRs: boolean;
};

export type VerbSelection = {
  type: "verb";
  verb: VerbEntry;
  dynAuxVerb?: VerbEntry;
  transitivity: Transitivity;
  canChangeTransitivity: boolean;
  canChangeStatDyn: boolean;
  isCompound: "stative" | "dynamic" | "generative stative" | false;
  voice: Voice;
  canChangeVoice: boolean;
  negative: boolean;
  verbTense: VerbTense;
  perfectTense: PerfectTense;
  imperativeTense: ImperativeTense;
  tenseCategory: "basic" | "modal" | "perfect" | "imperative";
};

export type VerbRendered = Omit<VerbSelectionComplete, "object"> & {
  ps: {
    head: PsString | undefined;
    rest: SingleOrLengthOpts<PsString[]>;
  };
  hasBa: boolean;
  person: Person;
};

export type VerbObject =
  // transitive verb - object not selected yet
  | undefined
  // transitive verb - obect selected
  | NPSelection
  // grammatically transitive verb with unspoken 3rd pers masc plur entity
  // or intransitive "none"
  | ObjectNP;

export type NPSelection = {
  type: "NP";
  selection: NounSelection | PronounSelection | ParticipleSelection;
};

export type APSelection = {
  type: "AP";
  selection: AdverbSelection | SandwichSelection<Sandwich>;
};

export type NPType = "noun" | "pronoun" | "participle";

export type ObjectNP = "none" | Person.ThirdPlurMale;

export type PossesorSelection = {
  shrunken: boolean;
  np: NPSelection;
};

export type Noun = {
  entry: NounEntry;
  gender: Gender;
  number: "sing" | "plur";
  adjectives: AdjectiveSelection[];
  possesor: undefined | Noun;
};

// TODO require/import Person and PsString
export type NounSelection = {
  type: "noun";
  entry: NounEntry;
  gender: Gender;
  genderCanChange: boolean;
  number: NounNumber;
  numberCanChange: boolean;
  dynamicComplement?: boolean;
  genStativeComplement?: boolean;
  adjectives: AdjectiveSelection[];
  possesor: undefined | PossesorSelection;
  determiners?: DeterminersSelection;
};

export type DeterminersSelection = {
  type: "determiners";
  withNoun: boolean;
  determiners: DeterminerSelection[];
};

export const determiners = [
  { p: "دا", f: "daa", type: "det", demonstrative: true },
  { p: "دغه", f: "dágha", type: "det", demonstrative: true },
  { p: "هغه", f: "hágha", type: "det", demonstrative: true },
  { p: "کوم", f: "koom", type: "det" },
  { p: "داسې", f: "dáase", type: "det" },
  { p: "دغسې", f: "daghase", type: "det" },
  { p: "هسې", f: "hase", type: "det" },
  { p: "هغسې", f: "hagháse", type: "det" },
  { p: "هر", f: "har", type: "det" },
  { p: "ټول", f: "Tol", type: "det" },
  { p: "بل", f: "bul", type: "det" },
  { p: "هیڅ", f: "heets", type: "det", noInf: true },
] as const;

export type Determiner = (typeof determiners)[number];

export type DeterminerSelection = {
  type: "determiner";
  determiner: Determiner;
};

export type AdverbSelection = {
  type: "adverb";
  entry: AdverbEntry;
};

export type AdjectiveSelection = {
  type: "adjective";
  entry: AdjectiveEntry;
  sandwich: SandwichSelection<Sandwich> | undefined;
};

export type LocativeAdverbSelection = {
  type: "loc. adv.";
  entry: LocativeAdverbEntry;
};

// take an argument for subject/object in rendering English
export type PronounSelection = {
  type: "pronoun";
  person: Person;
  distance: "near" | "far";
};

export type ParticipleSelection = {
  type: "participle";
  verb: VerbEntry;
  possesor: undefined | PossesorSelection;
};

// not object
// type Primitive = string | Function | number | boolean | Symbol | undefined | null;
// If T has key K ("user"), replace it
export type ReplaceKey<T, K extends string, R> = T extends Record<K, unknown>
  ? Omit<T, K> & Record<K, R>
  : T;

export type FormVersion = { removeKing: boolean; shrinkServant: boolean };

// TODO: rendered should would for rendering T.PossesorSelection etc
// look recursively down on something
export type RenderedPossesorSelection = {
  np: Rendered<NPSelection>;
  shrunken: boolean;
};

export type UnselectedComplementSelection = {
  type: "complement";
  selection: { type: "unselected" };
};

export type Rendered<
  T extends
    | NPSelection
    | NPSelection["selection"]
    | APSelection
    | APSelection["selection"]
    | SubjectSelectionComplete
    | ObjectSelectionComplete
    | PredicateSelectionComplete
    | AdjectiveSelection
    | SandwichSelection<Sandwich>
    | ComplementSelection
    | DeterminersSelection
    | DeterminerSelection
    | ComplementSelection["selection"]
    | UnselectedComplementSelection
    | undefined
> = T extends NPSelection
  ? {
      type: "NP";
      selection: Rendered<NPSelection["selection"]>;
    }
  : T extends APSelection
  ? {
      type: "AP";
      selection: Rendered<APSelection["selection"]>;
    }
  : T extends ComplementSelection
  ? {
      type: "complement";
      selection: Rendered<ComplementSelection["selection"]>;
    }
  : T extends UnselectedComplementSelection
  ? {
      type: "complement";
      selection: {
        type: "unselected";
        ps: PsString[];
        e: string;
      };
    }
  : T extends SandwichSelection<Sandwich>
  ? Omit<SandwichSelection<Sandwich>, "inside"> & {
      inside: Rendered<NPSelection>;
    }
  : T extends AdverbSelection
  ? {
      type: "adverb";
      entry: AdverbEntry;
      person: Person;
      ps: PsString[];
      e?: string;
    }
  : T extends AdjectiveSelection
  ? {
      type: "adjective";
      entry: AdjectiveEntry;
      ps: PsString[];
      e?: string;
      sandwich: Rendered<SandwichSelection<Sandwich>> | undefined;
      inflected: boolean;
      person: Person;
    }
  : T extends DeterminersSelection
  ? {
      type: "determiners";
      withNoun: boolean;
      determiners: Rendered<DeterminerSelection>[];
    }
  : T extends DeterminerSelection
  ? {
      type: "determiner";
      determiner: DeterminerSelection["determiner"];
      ps: PsString[];
      e: string;
      inflected: boolean;
      number: NounNumber;
      gender: Gender;
    }
  : T extends ComplementSelection
  ? {
      type: "complement";
      selection: Rendered<ComplementSelection["selection"]>;
    }
  : T extends SubjectSelectionComplete
  ? {
      type: "subjectSelection";
      selection: Rendered<NPSelection>;
    }
  : T extends ObjectSelectionComplete
  ? {
      type: "objectSelection";
      selection: Rendered<NPSelection> | Person.ThirdPlurMale | "none";
    }
  : T extends PredicateSelectionComplete
  ? {
      type: "predicateSelection";
      selection: Rendered<ComplementSelection> | Rendered<NPSelection>;
    }
  : T extends undefined
  ? {
      type: "undefined";
      ps: PsString;
    }
  : // TODO: this will be a problem (removing the change gender etc)
    // if we want to make the sentence diagram interactive
    ReplaceKey<
      Omit<
        T,
        | "changeGender"
        | "changeNumber"
        | "changeDistance"
        | "adjectives"
        | "possesor"
      >,
      "e",
      string
    > & {
      ps: SingleOrLengthOpts<PsString[]>;
      e?: string;
      inflected: boolean;
      person: Person;
      role: "king" | "servant" | "none";
      // TODO: better recursive thing
      adjectives?: Rendered<AdjectiveSelection>[];
      possesor?: {
        shrunken: boolean;
        np: Rendered<NPSelection>;
      };
      determiners?: Rendered<DeterminersSelection>;
    };

export type EPSelectionState = {
  blocks: EPSBlock[];
  predicate: {
    type: "NP" | "Complement";
    NP: NPSelection | undefined;
    Complement: ComplementSelection | undefined;
  };
  equative: EquativeSelection;
  omitSubject: boolean;
};

export type EPSBlock = {
  key: number;
  block: SubjectSelection | APSelection | undefined;
};
export type EPSBlockComplete = {
  key: number;
  block: SubjectSelectionComplete | APSelection;
};

export type VPSBlock = {
  key: number;
  // TODO: confusing use of APSelection / should be like APSelection s APSelection complete like the others
  block:
    | SubjectSelection
    | ObjectSelection
    | (APSelection | undefined)
    | ComplementSelection;
};
export type VPSBlockComplete = {
  key: number;
  block:
    | SubjectSelectionComplete
    | ObjectSelectionComplete
    | APSelection
    | ComplementSelection;
};

export type EPSelectionComplete = Omit<
  EPSelectionState,
  "predicate" | "blocks"
> & {
  blocks: EPSBlockComplete[];
  predicate: PredicateSelectionComplete;
  omitSubject: boolean;
};

export type ComplementType =
  | "adjective"
  | "loc. adv."
  | "sandwich"
  | "comp. noun";

export type SandwichSelection<S extends Sandwich> = S & {
  inside: NPSelection;
};

export type ComplementSelection = {
  type: "complement";
  selection:
    | AdjectiveSelection
    | LocativeAdverbSelection
    | SandwichSelection<Sandwich>
    | NounSelection;
};

export type Sandwich = {
  type: "sandwich";
  before: PsString | undefined;
  after: PsString | undefined;
  mayo: boolean;
  e: string;
};

export type EquativeSelection = {
  tense: EquativeTense;
  negative: boolean;
};

export type EquativeRendered = EquativeSelection & {
  ps: SingleOrLengthOpts<PsString[]>;
  person: Person;
  hasBa: boolean;
};

export type EPRendered = {
  type: "EPRendered";
  blocks: Block[][];
  kids: Kid[];
  englishBase?: string[];
  omitSubject: boolean;
};

export type EntryFeeder =
  | {
      nouns: EntryLookupPortal<NounEntry>;
      verbs: EntryLookupPortal<VerbEntry>;
      adjectives: EntryLookupPortal<AdjectiveEntry>;
      locativeAdverbs: EntryLookupPortal<LocativeAdverbEntry>;
      adverbs: EntryLookupPortal<AdverbEntry>;
    }
  | {
      nouns: NounEntry[];
      verbs: VerbEntry[];
      adjectives: AdjectiveEntry[];
      locativeAdverbs: LocativeAdverbEntry[];
      adverbs: AdverbEntry[];
    };

export type EntryFeederSingleType<X extends VerbEntry | DictionaryEntry> =
  | X[]
  | EntryLookupPortal<X>;

export type EntryLookupPortal<X extends VerbEntry | DictionaryEntry> = {
  search: (s: string) => X[];
  getByTs: (ts: number) => X | undefined;
};

export type EquativeBlock = { type: "equative"; equative: EquativeRendered };

export type NegativeBlock = { type: "negative"; imperative: boolean };

export type InflectableBaseParse<
  E extends InflectableEntry | AdjectiveSelection | DeterminerSelection
> = {
  inflection: (0 | 1 | 2)[];
  gender: Gender[];
  given: string;
  selection: E;
};

export type DictionaryAPI = {
  initialize: () => Promise<{
    response: "loaded first time" | "loaded from saved";
    dictionaryInfo: DictionaryInfo;
  }>;
  update: () => Promise<{
    response: "no need for update" | "updated" | "unable to check";
    dictionaryInfo: DictionaryInfo;
  }>;
  queryP: (p: string) => DictionaryEntry[];
  adjLookup: (p: string) => AdjectiveEntry[];
  nounLookup: (p: string) => NounEntry[];
  otherLookup: (
    key: keyof DictionaryEntry,
    p: string,
    regex?: boolean
  ) => DictionaryEntry[];
  specialPluralLookup: (p: string) => NounEntry[];
  verbEntryLookup: (p: string) => VerbEntry[];
  verbEntryLookupByL: (ts: number) => VerbEntry[];
};

export type Parser<R> = (
  tokens: Readonly<Token[]>,
  dictionary: DictionaryAPI
) => ParseResult<R>[];

export type ParsedNounWord<N extends NounEntry> = {
  inflected: boolean;
  plural: boolean;
  gender: Gender;
  given: string;
  entry: N;
};

export type Block = {
  key: number;
  block:
    | Rendered<SubjectSelectionComplete>
    | Rendered<ObjectSelectionComplete>
    | Rendered<APSelection>
    | Rendered<PredicateSelectionComplete>
    | Rendered<ComplementSelection>
    | Rendered<UnselectedComplementSelection>
    | NegativeBlock
    | EquativeBlock
    | VB
    | VBE
    | VHead;
};

export type ParsedBlock =
  | ParsedNP
  | ParsedPH
  | ParsedVBE
  | ParsedVBP
  | APSelection
  | NegativeBlock;

export type ParsedKidsSection = {
  type: "kids";
  kids: ParsedKid[];
};

export type ParsedNP = {
  type: "NP";
  inflected: boolean;
  selection: NPSelection;
};
export type ParsedPH = {
  type: "PH";
  s: string;
};
export type ParsedVBE = Omit<VBE, "ps">;
export type ParsedVBP = Omit<VBP, "ps">;

export type Kid = {
  key: number;
  kid: { type: "ba" } | MiniPronoun;
};

export type ParsedMiniPronoun = "me" | "de" | "ye" | "mU";

export type ParsedKid = "ba" | ParsedMiniPronoun;

export type MiniPronoun = {
  type: "mini-pronoun";
  person: Person;
  ps: PsString;
  source: "servant" | "possesive";
  np: NPSelection;
};

export type RenderVerbOutput = {
  hasBa: boolean;
  vbs: VerbRenderedOutput;
};
export type VerbRenderedOutput = [[VHead] | [], [VBP, VBE] | [VBE]];
export type RootsStemsOutput = [[VHead] | [], [VBP, VB] | [VB]]; // or perfect / equative

export type VB = VBBasic | Welded;
/** A VB block that has had a person verb ending attached */
export type VBE = VB & {
  person: Person;
  info:
    | {
        type: "equative";
        tense: EquativeTenseWithoutBa;
      }
    | {
        type: "verb";
        aspect: Aspect;
        base: "stem" | "root";
        verb: VerbEntry;
        imperative?: true;
        abilityAux?: boolean;
      };
};

/** A VB block used for ability verbs or perfect (past participle)
 * get optionally swapped in order with the VBE when used with negative
 */
export type VBP = VB & (VBPartInfo | VBAbilityInfo);

export type VBPartInfo = {
  info: {
    type: "ppart";
    genNum: GenderNumber;
    verb: VerbEntry;
  };
};

export type VBAbilityInfo = {
  info: {
    type: "ability";
    verb: VerbEntry;
    aspect: Aspect;
  };
};

// in VB OR VBE - add root / stem and entry for parsing info
// but how would that work with perfect and ability verbs ...

export type VBNoLenghts<V extends VB> = V extends VBBasic
  ? Omit<VBBasic, "ps"> & { ps: PsString[] }
  : Omit<Welded, "right"> & { right: VBNoLenghts<Exclude<VB, Welded>> };

export type VBBasic = {
  type: "VB";
  ps: SingleOrLengthOpts<PsString[]>;
};

export type GenderNumber = {
  gender: Gender;
  number: NounNumber;
};

export type Welded = {
  type: "welded";
  left: NComp | VBBasic | Welded;
  right: VBBasic | (VBBasic & (VBPartInfo | VBAbilityInfo));
};

export type VHead = PH | NComp;

/** perfective head block */
export type PH = {
  type: "PH";
  ps: PsString;
};

export type NComp = {
  type: "NComp";
  comp: Comp;
};

// element can be one of
// - adjective
// - locative adv
// - sandwich (TODO)
// - noun
export type Comp = AdjComp | OtherComp;

export type AdjComp = {
  type: "AdjComp";
  ps: PsString;
  number: NounNumber;
  gender: Gender;
};

export type OtherComp = {
  type: "Comp";
  ps: PsString;
};

export type Token = {
  i: number;
  s: string;
};

export type ParseError = {
  message: string;
  token?: Token;
};

/** a tuple containing the [left over tokens, parse result, errors associated with the result] */
export type ParseResult<P> = {
  tokens: Readonly<Token[]>;
  body: P;
  errors: ParseError[];
};
