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
export type PsJSX = { p: JSX.Element, f: JSX.Element, e?: JSX.Element | string };

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

// TODO: BETTER TYPING OF THIS WITH RECORD TO MAKE SURE THAT THE FIELDS LINE UP
export type DictionaryEntry = {
    // BASE REQUIRED INFO
    /** timestamp - used for word id */
    ts: number; 
    /** Pashto alphabetical index */
    i: number;
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
}

export type DictionaryEntryNoFVars = DictionaryEntry & { __brand: "name for a dictionary entry with all the phonetics variations removed" };
export type PsStringNoFVars = PsString & { __brand: "name for a ps string with all the phonetics variations removed" };
export type FStringNoFVars = string & { __brand: "name for a phonetics string with all the phonetics variations removed" };

export type DictionaryEntryTextField = "p" | "f" | "e" | "c" | "infap" | "infaf" | "infbp" | "infbf" | "app" | "apf" | "ppp" | "ppf" | "psp" | "psf" | "ssp" | "ssf" | "prp" | "prf" | "pprtp" | "pprtf" | "tppp" | "tppf" | "ec" | "ep";
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

export type Spelling = "Afghan" | "Pakistani ی" | "Pakistani ي";

export type TextOptions = {
    pTextSize: "normal" | "larger" | "largest";
    phonetics: "lingdocs" | "ipa" | "alalc" | "none";
    dialect: "standard" | "peshawer" | "southern";
    spelling: Spelling;
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
    entry: VerbEntry,
    transitivity: Transitivity;
    yulEnding: boolean | null;
    stem: VerbStemSet;
    root: VerbRootSet;
    participle: ParticipleSet;
    idiosyncraticThirdMascSing?: ShortThirdPersFormSet;
}

export type PassiveRootsStems = {
    stem: VerbStemSet,
    root: VerbRootSet,
    participle: {
        past: FullForm<PsString>,
    },
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
    imperative: ImperativeForm; // STEM + imperative ending
    past: VerbForm; // ROOT + past ending
    habitualPast: VerbForm; // ba + past
    modal: ModalContent;
}

// ASPECT -> AspectContentPssive
export type AspectContentPassive = Omit<AspectContent, "imperative"> & {
    imperative: undefined,
};

export type ModalContent = {
    nonImperative: VerbForm; // ROOT + ey + kedulStat.perfective.nonImperative
    future: VerbForm; // به + this.nonImperative
    past: VerbForm; // ROOT + ey + kedulStat.perfective.past
    habitualPast: VerbForm; // ba + past
    hypotheticalPast: VerbForm; // ROOT + ey + shw + ey
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
    habitual: VerbForm; // PPART + equative.habit
    subjunctive: VerbForm; // PPART + equative.subj
    future: VerbForm; // ba + PPART + equative.subj
    wouldBe: VerbForm; // ba + PPART + equative.past
    pastSubjunctive: VerbForm; // PPART + waay
    wouldHaveBeen: VerbForm; // PPART + ba + waay
}

// Plain, 1st, and 2nd Inflection
export type InflectionSet = ArrayFixed<ArrayOneOrMore<PsString>, 3>;

// Plural and Second Inflection
export type PluralInflectionSet = ArrayFixed<ArrayOneOrMore<PsString>, 2>

export type Gender = "masc" | "fem";

export type UnisexSet<T> = Record<Gender, T>;
export type GenderedSet<T> = UnisexSet<T> | Omit<UnisexSet<T>, "fem"> | Omit<UnisexSet<T>, "masc">;
export type UnisexInflections = UnisexSet<InflectionSet>;

export type Inflections = GenderedSet<InflectionSet>;

export type PluralInflections = GenderedSet<PluralInflectionSet>;

export type InflectorOutput = {
    arabicPlural: PluralInflections,
    plural?: PluralInflections,
    inflections?: Inflections,
} | {
    plural: PluralInflections,
    arabicPlural?: PluralInflections,
    inflections?: Inflections,
} | {
    inflections: Inflections,
} | false;

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

export type Wrapper<T> = T & { __brand: "wrapped" };

export type ArrayOneOrMore<T> = {
    0: T
} & Array<T>

export type RootsOrStemsToHighlight = ("imperfective root" | "perfective root" | "imperfective stem" | "perfective stem" | "past participle")[];

/* i.e. ec: ["take", "takes", "taking", "took", "taken"], ep: out  */
export type EnglishVerbConjugationEc = [string, string, string, string, string]; 
export type EnglishVerbConjugation = {
    ec: EnglishVerbConjugationEc,
    ep: string | undefined,
};

export type DisplayFormItem = DisplayForm | DisplayFormSubgroup | DisplayFormForSentence;
export type EnglishBuilder = (subject: Person, ec: EnglishVerbConjugationEc, neg: boolean) => string[];

export type DisplayForm = { 
    label: string,
    aspect?: Aspect,
    form: VerbForm | ImperativeForm | ParticipleForm | SentenceForm,
    advanced?: boolean,
    englishBuilder?: EnglishBuilder,
    formula: React.ReactNode,
    explanation: React.ReactNode,
    sentence?: boolean,
    passive?: boolean,
    past?: boolean,
    reorderWithNegative?: boolean,
}

export type DisplayFormForSentence = Omit<DisplayForm, "form"> & {
    form: VerbForm,
    secondPronounNeeded?: boolean,
} 

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
    label: string,
    subgroup: string,
    advanced?: boolean,
    content: DisplayFormItem[],
}

export type AayTail = "ey" | "aay";

export type NounEntry = DictionaryEntry & { c: string } & { __brand: "a noun entry" };
export type MascNounEntry = NounEntry & { __brand2: "a masc noun entry" };
export type FemNounEntry = NounEntry & { __brand2: "a fem noun entry" };
export type AnimNounEntry = NounEntry & { __brand3: "a anim noun entry" }; 
export type UnisexNounEntry = MascNounEntry & { __brand3: "a unisex noun entry" };
export type UnisexAnimNounEntry = UnisexNounEntry & { __brand4: "an anim unisex noun entry" };
export type AdverbEntry = DictionaryEntry & { c: string } & { __brand: "an adverb entry" };
export type LocativeAdverbEntry = AdverbEntry & { __brand2: "a locative adverb entry" };
export type AdjectiveEntry = DictionaryEntry & { c: string } & { __brand: "an adjective entry" };
export type VerbDictionaryEntry = DictionaryEntry & { __brand: "a verb entry" };
export type VerbEntry = {
    entry: VerbDictionaryEntry,
    // TODO: the compliment could also be typed? Maybe?
    complement?: DictionaryEntry,
};

export type SingularEntry<T extends NounEntry> = T & { __brand7: "a singular noun - as opposed to an always plural noun" };
export type PluralNounEntry<T extends NounEntry> = T & { __brand7: "a noun that is always plural" };

export type Pattern1Entry<T> = T & { __brand3: "basic inflection pattern" };
export type Pattern2Entry<T> = T & { __brand3: "ending in unstressed ی pattern" };
export type Pattern3Entry<T> = T & { __brand3: "ending in stressed ی pattern" };
export type Pattern4Entry<T> = T & { __brand3: "Pashtoon pattern" };
export type Pattern5Entry<T> = T & { __brand3: "short squish pattern" };
export type Pattern6FemEntry<T extends FemNounEntry> = T & { __brand3: "non anim. ending in ي" };
export type NonInflecting<T> = T & { __brand3: "non-inflecting" };

export type Entry = NounEntry | AdjectiveEntry | AdverbEntry | VerbEntry;
// TODO: make this Rendered<VPSelectionComplete> with recursive Rendered<>
export type VPRendered = {
    type: "VPRendered",
    king: "subject" | "object",
    servant: "subject" | "object" | undefined,
    isPast: boolean,
    isTransitive: boolean,
    isCompound: "stative" | "dynamic" | false,
    blocks: Block[][],
    kids: Kid[],
    englishBase?: string[],
    form: FormVersion,
    whatsAdjustable: "both" | "king" | "servant",
}

export type VerbTense = "presentVerb"
    | "subjunctiveVerb"
    | "perfectiveFuture"
    | "imperfectiveFuture"
    | "perfectivePast"
    | "imperfectivePast"
    | "habitualPerfectivePast"
    | "habitualImperfectivePast";
export type NounNumber = "singular" | "plural";

export type EquativeTense = "present" | "subjunctive" | "habitual" | "past" | "future" | "wouldBe" | "pastSubjunctive" | "wouldHaveBeen";
export type PerfectTense = `${EquativeTense}Perfect`;
export type ModalTense = `${VerbTense}Modal`;
export type ImperativeTense = `${Aspect}Imperative`;
export type Tense = EquativeTense | VerbTense | PerfectTense | ModalTense | ImperativeTense;

export type SubjectSelection = {
    type: "subjectSelection",
    selection: NPSelection | undefined,
};

export type ObjectSelection = {
    type: "objectSelection",
    selection: NPSelection | ObjectNP | undefined,
};

export type SubjectSelectionComplete = {
    type: "subjectSelection",
    selection: NPSelection,
};

export type PredicateSelectionComplete = {
    type: "predicateSelection",
    selection: ComplementSelection | NPSelection,
};

export type ObjectSelectionComplete = {
    type: "objectSelection",
    selection: NPSelection | ObjectNP,
};

export type VPSelectionState = {
    blocks: VPSBlock[]
    verb: VerbSelection,
    externalComplement: undefined | UnselectedComplementSelection | ComplementSelection,
    form: FormVersion,
};

export type VPSelectionComplete = {
    blocks: VPSBlockComplete[]
    verb: VerbSelectionComplete,
    externalComplement: VPSelectionState["externalComplement"],
    form: FormVersion,
};

export type VerbSelectionComplete = Omit<VerbSelection, "object" | "verbTense" | "perfectTense" | "imperativeTense" | "tenseCategory"> & {
    tense: VerbTense | PerfectTense | ModalTense | ImperativeTense,
}

export type VerbSelection = {
    type: "verb",
    verb: VerbEntry,
    dynAuxVerb?: VerbEntry,
    transitivity: Transitivity,
    canChangeTransitivity: boolean,
    canChangeStatDyn: boolean,
    isCompound: "stative" | "dynamic" | false,
    voice: "active" | "passive",
    canChangeVoice: boolean,
    negative: boolean,
    verbTense: VerbTense,
    perfectTense: PerfectTense,
    imperativeTense: ImperativeTense,
    tenseCategory: "basic" | "modal" | "perfect" | "imperative",
};

export type VerbRendered = Omit<VerbSelectionComplete, "object"> & {
    ps: { 
        head: PsString | undefined,
        rest: SingleOrLengthOpts<
            PsString[]
        >,
    },
    hasBa: boolean,
    person: Person,
};

export type VerbObject = 
    // transitive verb - object not selected yet
    undefined |
    // transitive verb - obect selected
    NPSelection |
    // grammatically transitive verb with unspoken 3rd pers masc plur entity
    // or intransitive "none"
    ObjectNP;

export type NPSelection = {
    type: "NP",
    selection: NounSelection | PronounSelection | ParticipleSelection,
};

export type APSelection = {
    type: "AP",
    selection: AdverbSelection | SandwichSelection<Sandwich>,
};

export type NPType = "noun" | "pronoun" | "participle";

export type ObjectNP = "none" | Person.ThirdPlurMale;

export type PossesorSelection = {
    shrunken: boolean,
    np: NPSelection,
}

// TODO require/import Person and PsString
export type NounSelection = {
    type: "noun",
    entry: NounEntry,
    gender: Gender,
    genderCanChange: boolean,
    number: NounNumber,
    numberCanChange: boolean,
    dynamicComplement?: boolean,
    adjectives: AdjectiveSelection[],
    possesor: undefined | PossesorSelection,
};

export type AdverbSelection = {
    type: "adverb",
    entry: AdverbEntry,
}

export type AdjectiveSelection = {
    type: "adjective",
    entry: AdjectiveEntry,
    sandwich: SandwichSelection<Sandwich> | undefined,
}

export type LocativeAdverbSelection = {
    type: "loc. adv.",
    entry: LocativeAdverbEntry,
}

// take an argument for subject/object in rendering English
export type PronounSelection = {
    type: "pronoun",
    person: Person,
    distance: "near" | "far",
};

export type ParticipleSelection = {
    type: "participle",
    verb: VerbEntry,
    possesor: undefined | PossesorSelection,
};

// not object
// type Primitive = string | Function | number | boolean | Symbol | undefined | null;
// If T has key K ("user"), replace it
export type ReplaceKey<T, K extends string, R> = T extends Record<K, unknown> ? (Omit<T, K> & Record<K, R>) : T;

export type FormVersion = { removeKing: boolean, shrinkServant: boolean };

// TODO: rendered should would for rendering T.PossesorSelection etc
// look recursively down on something
export type RenderedPossesorSelection = {
    np: Rendered<NPSelection>,
    shrunken: boolean,
};

export type UnselectedComplementSelection = { type: "complement", selection: { type: "unselected" }};

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
        | ComplementSelection["selection"]
        | UnselectedComplementSelection
        | undefined
> =
    T extends NPSelection
    ? {
        type: "NP",
        selection: Rendered<NPSelection["selection"]> 
    }
    : T extends APSelection
    ? {
        type: "AP",
        selection: Rendered<APSelection["selection"]>
    }
    : T extends ComplementSelection
    ? {
        type: "complement",
        selection: Rendered<ComplementSelection["selection"]>
    }
    : T extends UnselectedComplementSelection
    ? {
        type: "complement",
        selection: {
            type: "unselected",
            ps: PsString[],
            e: string,
        },
    }
    : T extends SandwichSelection<Sandwich> 
    ? Omit<SandwichSelection<Sandwich>, "inside"> & {
        inside: Rendered<NPSelection>,
    }
    : T extends AdverbSelection
    ? {
        type: "adverb",
        entry: AdverbEntry,
        ps: PsString[],
        e?: string,
    }
    : T extends AdjectiveSelection 
    ? {
        type: "adjective",
        entry: AdjectiveEntry,
        ps: PsString[],
        e?: string,
        sandwich: Rendered<SandwichSelection<Sandwich>> | undefined,
        inflected: boolean,
        person: Person,
    }
    : T extends ComplementSelection
    ? {
        type: "complement",
        selection: Rendered<ComplementSelection["selection"]>,
    }
    : T extends SubjectSelectionComplete
    ? {
        type: "subjectSelection",
        selection: Rendered<NPSelection>,
    }
    : T extends ObjectSelectionComplete
    ? {
        type: "objectSelection",
        selection: Rendered<NPSelection> | Person.ThirdPlurMale | "none",
    }
    : T extends PredicateSelectionComplete
    ? {
        type: "predicateSelection",
        selection: Rendered<ComplementSelection> | Rendered<NPSelection>,
    } : T extends undefined
    ? {
        type: "undefined",
        ps: PsString,
    }
    : ReplaceKey<
        Omit<T, "changeGender" | "changeNumber" | "changeDistance" | "adjectives" | "possesor">,
        "e",
        string
    > & {
        ps: PsString[],
        e?: string,
        inflected: boolean,
        person: Person,
        role: "king" | "servant" | "none",
        // TODO: better recursive thing
        adjectives?: Rendered<AdjectiveSelection>[],
        possesor?: {
            shrunken: boolean,
            np: Rendered<NPSelection>,
        },
    };

export type EPSelectionState = {
    blocks: EPSBlock[],
    predicate: {
        type: "NP" | "Complement",
        NP: NPSelection | undefined,
        Complement: ComplementSelection | undefined,
    },
    equative: EquativeSelection,
    omitSubject: boolean,
};

export type EPSBlock = {
    key: number,
    block: SubjectSelection | APSelection | undefined,
};
export type EPSBlockComplete = {
    key: number,
    block: SubjectSelectionComplete | APSelection,
};

export type VPSBlock = {
    key: number,
    // TODO: confusing use of APSelection / should be like APSelection s APSelection complete like the others
    block: SubjectSelection | ObjectSelection | (APSelection | undefined) | ComplementSelection,
};
export type VPSBlockComplete = {
    key: number,
    block: SubjectSelectionComplete | ObjectSelectionComplete | APSelection | ComplementSelection,
};

export type EPSelectionComplete = Omit<EPSelectionState, "predicate" | "blocks"> & {
    blocks: EPSBlockComplete[],
    predicate: PredicateSelectionComplete,
    omitSubject: boolean,
};

export type ComplementType = "adjective" | "loc. adv." | "sandwich" | "comp. noun";

export type SandwichSelection<S extends Sandwich> = S & {
    inside: NPSelection,
};

export type ComplementSelection = {
    type: "complement",
    selection: AdjectiveSelection
        | LocativeAdverbSelection
        | SandwichSelection<Sandwich>
        | NounSelection,
};

export type Sandwich = {
    type: "sandwich",
    before: PsString | undefined,
    after: PsString | undefined,
    e: string,
};

export type EquativeSelection = {
    tense: EquativeTense,
    negative: boolean,
};

export type EquativeRendered = EquativeSelection & {
    ps: SingleOrLengthOpts<PsString[]>,
    person: Person,
    hasBa: boolean,
}

export type EPRendered = {
    type: "EPRendered",
    blocks: Block[][],
    kids: Kid[],
    englishBase?: string[],
    omitSubject: boolean,
}

export type EntryFeeder = {
    nouns: EntryLookupPortal<NounEntry>,
    verbs: EntryLookupPortal<VerbEntry>,
    adjectives: EntryLookupPortal<AdjectiveEntry>,
    locativeAdverbs: EntryLookupPortal<LocativeAdverbEntry>,
    adverbs: EntryLookupPortal<AdverbEntry>,
} | {
    nouns: NounEntry[],
    verbs: VerbEntry[],
    adjectives: AdjectiveEntry[],
    locativeAdverbs: LocativeAdverbEntry[],
    adverbs: AdverbEntry[],
}

export type EntryFeederSingleType<X extends VerbEntry | DictionaryEntry> = X[] | EntryLookupPortal<X>;

export type EntryLookupPortal<X extends VerbEntry | DictionaryEntry> = {
    search: (s: string) => X[],
    getByTs: (ts: number) => (X | undefined),
}

export type EquativeBlock = { type: "equative", equative: EquativeRendered };
export type VerbComplementBlock = {
    type: "verbComplement",
    complement: PsString,
};
export type PerfectParticipleBlock = {
    type: "perfectParticipleBlock",
    ps: SingleOrLengthOpts<PsString[]>,
    verb: VerbRenderedBlock,
    person: Person,
    complement: undefined | Rendered<ComplementSelection> | Rendered<UnselectedComplementSelection>,
};
export type PerfectEquativeBlock = {
    type: "perfectEquativeBlock",
    ps: PsString[],
    person: Person,
};
export type ModalVerbBlock = {
    type: "modalVerbBlock",
    ps: SingleOrLengthOpts<PsString[]>,
    verb: VerbRenderedBlock,
    complement: undefined | Rendered<ComplementSelection> | Rendered<UnselectedComplementSelection>,
};
export type ModalVerbKedulPart = {
    type: "modalVerbKedulPart",
    ps: PsString[],
    verb: VerbRenderedBlock,
};
export type PerfectiveHeadBlock = { type: "perfectiveHead", ps: PsString };
export type VerbRenderedBlock = {
    type: "verb",
    block: Omit<VerbSelectionComplete, "object"> & {
        hasBa: boolean,
        ps: SingleOrLengthOpts<PsString[]>,
        person: Person,
        complement: undefined | Rendered<ComplementSelection> | Rendered<UnselectedComplementSelection>,
    },
};

export type Block = {
    key: number,
    block: | Rendered<SubjectSelectionComplete>
        | Rendered<ObjectSelectionComplete>
        | Rendered<APSelection>
        | Rendered<PredicateSelectionComplete>
        | Rendered<ComplementSelection>
        | Rendered<UnselectedComplementSelection>
        | PerfectParticipleBlock
        | PerfectEquativeBlock
        | ModalVerbBlock
        | ModalVerbKedulPart
        | { type: "negative", imperative: boolean }
        | PerfectiveHeadBlock
        | VerbRenderedBlock
        | VerbComplementBlock
        | EquativeBlock;
}

export type Kid = {
    key: number,
    kid: | { type: "ba" }
        | MiniPronoun,
}
    
export type MiniPronoun = {
    type: "mini-pronoun",
    person: Person,
    ps: PsString,
    source: "servant" | "possesive",
    np: NPSelection,
};

