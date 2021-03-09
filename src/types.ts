/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export type PsStringField = "p" | "f";
export type PsString = {
    [k in PsStringField]: string;
} & {
    e?: string;
};

export type DictionaryInfo = {
	title: string;
	license: string;
	release: number;
	numberOfEntries: number;
    url: string;
    infoUrl: string;
}

export type Dictionary = {
    info: DictionaryInfo;
	entries: DictionaryEntry[];
}

export type DictionaryEntry = {
    // BASE REQUIRED INFO
    ts: number;     // timestamp
    i: number;      // Pashto Alphabetical Index
    p: string;      // Pashto word
    f: string;      // Phonetics word
    e: string;      // English word
    // PART OF SPEECH AND LINK INFO
    c?: string;     // Part of Speech Info
    l?: number;     // timestamp link to related word
    // INFLECTION INFO
    infap?: string; // Special (irregular) inflection info
    infaf?: string;
    infbp?: string;
    infbf?: string;
    noInf?: boolean; // No Inflections?
    // PLURAL INFO
    app?: string;   // Arabic plural in Pashto
    apf?: string;   // Arabic plural in Phonetics
    ppp?: string;   // Pashto plural in Pashto
    ppf?: string;   // Pashto plural in Phonetics
    // VERB INFO
    psp?: string;   // Present stem in Pashto
    psf?: string;   // Present stem in Phonetics
    /** The subjuctive / perfective stem in Pashto */
    ssp?: string;
    /** The subjunctive / perfective stem in Phonetics */
    ssf?: string;
    prp?: string;   // Perfective root in Pashto
    prf?: string;   // Perfective root in Phonetics
    /** The past participle in Pashto */
    pprtp?: string;
    /** The past participle in Phonetics */
    pprtf?: string;
    /** The idiosyncratic third person singular masc. short past in Pashto  */
    tppp?: string;
    /** The idiosyncratic third person singular masc. short past in Phonetics  */
    tppf?: string;
    shortIntrans?: boolean; // Short version is available like ګرځېږي and ګرځي
    noOo?: boolean;  // No و - oo verb prefix? 
    sepOo?: boolean; // Separate oo prefix?
    separationAtP?: number;  // Pashto separation point for separable verbs
    separationAtF?: number; // Phonetics separation point for separable verbs
    // PHONETICS - PASHTO - DIACRITICS INFO
    diacExcept?: boolean; // Is an exception to the diacritics thing
}

export type DictionaryEntryTextField = "p" | "f" | "e" | "c" | "infap" | "infaf" | "infbp" | "infbf" | "app" | "apf" | "ppp" | "ppf" | "psp" | "psf" | "ssp" | "ssf" | "prp" | "prf" | "pprtp" | "pprtf" | "tppp" | "tppf";
export type DictionaryEntryBooleanField = "noInf" | "shortIntrans" | "noOo" | "sepOo" | "diacExcept";
export type DictionaryEntryNumberField = "ts" | "i" | "l" | "separationAtP" | "separationAtF";
export type DictionaryEntryField = DictionaryEntryTextField | DictionaryEntryBooleanField | DictionaryEntryNumberField;

export type DictionaryEntryError = {
    errors: string[],
    p: string,
    f: string,
    e: string,
    ts: number,
    erroneousFields: DictionaryEntryField[],
}

export type TextOptions = {
    pTextSize: "normal" | "larger" | "largest";
    phonetics: "lingdocs" | "ipa" | "alalc" | "none";
    dialect: "standard" | "peshawer" | "southern";
    spelling: "Afghan" | "Pakistani";
    diacritics: boolean;
}

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
    transitivity: Transitivity;
    yulEnding: boolean | null;
    stem: VerbStemSet;
    root: VerbRootSet;
    participle: ParticipleSet;
    idiosyncraticThirdMascSing?: ShortThirdPersFormSet;
}

export type SimpleVerbInfo = VerbInfoBase & {
    type: "simple";
}

export type StativeCompoundVerbInfo = VerbInfoBase & {
    type: "stative compound"
    complement: UnisexInflections;
}

export type GenerativeStativeCompoundVerbInfo = VerbInfoBase & {
    type: "generative stative compound"
    objComplement: ObjComplement,
    singularForm?: GenerativeStativeCompoundVerbInfo,
    // TODO: Could add intransitive form 🤪
}

export type DynamicCompoundVerbInfo = VerbInfoBase & {
    type: "dynamic compound";
    objComplement: ObjComplement;
    auxVerb: DictionaryEntry;
    auxVerbComplement?: DictionaryEntry;
    singularForm?: DynamicCompoundVerbInfo;
    intransitiveForm?: DynamicCompoundVerbInfo;
}

export type ObjComplement = {
    entry: DictionaryEntry;
    plural?: PsString;
    person: Person;
}

export type NonComboVerbInfo = SimpleVerbInfo |
    StativeCompoundVerbInfo | DynamicCompoundVerbInfo | GenerativeStativeCompoundVerbInfo;

export type VerbInfo = NonComboVerbInfo | {
    type: "transitive or grammatically transitive simple";
    transitive: SimpleVerbInfo;
    grammaticallyTransitive: SimpleVerbInfo;
} | {
    type: "dynamic or stative compound";
    transitivity: Transitivity;
    stative: StativeCompoundVerbInfo;
    dynamic: DynamicCompoundVerbInfo;
} | {
    type: "dynamic or generative stative compound";
    transitivity: Transitivity;
    stative: GenerativeStativeCompoundVerbInfo;
    dynamic: DynamicCompoundVerbInfo;
}

export type Transitivity = "transitive" | "intransitive" | "grammatically transitive";

export type SplitInfo = FullForm<[PsString, PsString]>;

export type VerbStemSet = {
    perfective: FullForm<PsString>;
    imperfective: FullForm<PsString>;
    perfectiveSplit?: SplitInfo;
}

export type VerbRootSet = {
    perfective: OptionalPersonInflections<LengthOptions<PsString>>;
    imperfective: OptionalPersonInflections<LengthOptions<PsString>>;
    perfectiveSplit?: SplitInfo;
}

export type ParticipleSet = {
    present: FullForm<PsString>,
    past: FullForm<PsString>,
}

export type ShortThirdPersFormSet = {
    [K in Aspect]: PsString;
}

export type Aspect = "perfective" | "imperfective";

export type Length = "short" | "long" | "mini";

export type LengthOptions<T> = {
    long: T;
    short: T;
    mini?: T;
}

export type PersonInflectionsField = "mascSing" | "mascPlur" | "femSing" | "femPlur";
export type OptionalPersonInflections<T> = {
    [K in PersonInflectionsField]: T;
} | T;

export type SingleOrLengthOpts<T> = T | LengthOptions<T>;

export type VerbConjugation = {
    info: NonComboVerbInfo,
    // INFINITIVE = info.root.imperfective.long
    imperfective: AspectContent; // --╖  ASPECT = "imperfective"  
    perfective: AspectContent;   // --╜  ASPECT = "perfective"
    hypothetical: VerbForm; // INFINITIVE - ul + aay
    participle: ParticipleContent;
    perfect: PerfectContent; // PPART = PAST PARTICIPLE (plus spectial short forms)
    passive?: PassiveContent; // only on transitive verbs
    singularForm?: VerbConjugation;
}

export type VerbOutput = VerbConjugation | {
    info: VerbInfo,
    stative: VerbConjugation,
    dynamic: VerbConjugation,
} | {
    info: VerbInfo,
    transitive: VerbConjugation,
    grammaticallyTransitive: VerbConjugation,
};

export type PassiveContent = {
    imperfective: AspectContentPassive // --╖  ASPECT = "imperfective"
    perfective: AspectContentPassive //   --╜  ASPECT = "perfective"
    perfect: PerfectContent; // PPART INFINITIVE + kedulStat perfect.pastParticiple
    // TODO: ADD PARTICIPLE
}

// ASPECT -> AspectContent
export type AspectContent = {
    // STEM = info.stem[ASPECT]
    // ROOT = info.root[ASPECT]
    nonImperative: VerbForm; // STEM + pres ending
    future: VerbForm; // به + this.nonImperative
    imperative?: ImperativeForm; // STEM + imperative ending
    // -- optional because not used for intransitive verison of kawul dynamic compounds
    past: VerbForm; // ROOT + past ending
    modal: ModalContent;
}

export type ModalContent = {
    nonImperative: VerbForm; // ROOT + ey + kedulStat.perfective.nonImperative
    future: VerbForm; // به + this.nonImperative
    past: VerbForm; // ROOT + ey + kedulStat.perfective.past
    hypotheticalPast: VerbForm; // ROOT + ey + shw + ey
}

// ASPECT -> AspectContentPssive
export type AspectContentPassive = {
    // ROOT = info.root[ASPECT]
    nonImperative: VerbForm; // ROOT LONG + kedulStat[ASPECT].nonImperative
    future: VerbForm; // ba + this.nonImperative
    past: VerbForm; // ROOT LONG + kedulStat[ASPECT].past
}

export type ParticipleForm = SingleOrLengthOpts<UnisexInflections> | SingleOrLengthOpts<PsString>;

export type ParticipleContent = {
    past: SingleOrLengthOpts<UnisexInflections> | SingleOrLengthOpts<PsString>,
    // TODO: Should this ever have an object matrix??
    present: SingleOrLengthOpts<UnisexInflections>,
}

// PPART -> PerfectContent
export type PerfectContent = {
    halfPerfect: VerbForm; // PPART
    past: VerbForm; // PPART + equative.past
    present: VerbForm; // PPART + equative.prest
    subjunctive: VerbForm; // PPART + equative.subj
    future: VerbForm; // ba + PPART + equative.subj
    affirmational: VerbForm; // ba + PPART + equative.past
    pastSubjunctiveHypothetical: VerbForm; // PPART + waay
}

export type UnisexInflections = {
    masc: ArrayFixed<ArrayOneOrMore<PsString>, 3>,
    fem: ArrayFixed<ArrayOneOrMore<PsString>, 3>,
}

export type Inflections = UnisexInflections | {
    masc: ArrayFixed<ArrayOneOrMore<PsString>, 3>,
} | {
    fem: ArrayFixed<ArrayOneOrMore<PsString>, 3>, 
}

export type PersonLine = [
    /** singular form of person */
    ArrayOneOrMore<PsString>,
    /** plural form of person */
    ArrayOneOrMore<PsString>,
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
    PersonLine, // 3rd Person Female
];

export type EnglishBlock = [
    [string, string],
    [string, string],
    [string, string],
    [string, string],
    [string, string],
    [string, string],
];

export type ImperativeBlock = [
    PersonLine, // 2nd Person Male
    PersonLine, // 2nd Person Female
];

export type FullForm<T> = OptionalPersonInflections<SingleOrLengthOpts<T>>;
export type VerbForm = FullForm<VerbBlock>;
export type ImperativeForm = FullForm<ImperativeBlock>;
export type SentenceForm = SingleOrLengthOpts<ArrayOneOrMore<PsString>>;

export interface ArrayFixed<T, L extends number> extends Array<T> {
    0: T;
    length: L;
}

export type ArrayOneOrMore<T> = {
    0: T
} & Array<T>

export type DisplayFormItem = DisplayForm | DisplayFormSubgroup | DisplayFormForSentence;

export type DisplayForm = { 
    label: string,
    aspect?: Aspect,
    form: VerbForm | ImperativeForm | ParticipleForm | SentenceForm,
    advanced?: boolean,
    formula: React.ReactNode,
    explanation: React.ReactNode,
    sentence?: boolean,
    passive?: boolean,
    past?: boolean,
    reorderWithNegative?: boolean,
}
export type DisplayFormForSentence = { 
    label: string,
    aspect?: Aspect,
    form: VerbForm,
    advanced?: boolean,
    formula: React.ReactNode,
    secondPronounNeeded?: boolean,
    explanation: React.ReactNode,
    sentence?: boolean,
    passive?: boolean,
    past?: boolean,
    reorderWithNegative?: boolean,
}

export type DisplayFormSubgroup = {
    label: string,
    subgroup: string,
    advanced?: boolean,
    content: DisplayFormItem[],
}

export type AayTail = "ey" | "aay";