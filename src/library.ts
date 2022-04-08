/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    conjugateVerb,
} from "./lib/verb-conjugation";
import {
    inflectWord,
} from "./lib/pashto-inflector";
import {
    getVerbInfo,
} from "./lib/verb-info";
import { makeVerbSelection } from "./components/vp-explorer/verb-selection";
import ConjugationViewer from "./components/ConjugationViewer";
import InflectionsTable from "./components/InflectionsTable";
import Pashto from "./components/Pashto";
import Phonetics from "./components/Phonetics";
import InlinePs from "./components/InlinePs";
import ButtonSelect from "./components/ButtonSelect";
import VerbFormDisplay from "./components/VerbFormDisplay";
import VerbTable from "./components/VerbTable";
import Examples from "./components/Examples";
import Hider from "./components/Hider";
import EntrySelect from "./components/EntrySelect";
import VerbInfo, { RootsAndStems } from "./components/verb-info/VerbInfo";
import VPExplorer from "./components/vp-explorer/VPExplorer";
import useStickyState from "./lib/useStickyState";
import {
    makePsString,
    removeFVarients,
} from "./lib/accent-and-ps-utils";
import {
    addToForm,
    concatPsString,
    isVerbBlock,
    isImperativeBlock,
    isPluralInflectionSet,
    isUnisexSet,
    isInflectionSet,
    addEnglish,
    endsWith,
    hasBaParticle,
    psRemove,
    firstVariation,
    psStringFromEntry,
    getLong,
    capitalizeFirstLetter,
} from "./lib/p-text-helpers";
import {
    getEnglishWord,
} from "./lib/get-english-word";
import {
    standardizePashto,
    standardizePhonetics,
} from "./lib/standardize-pashto";
import { phoneticsToDiacritics } from "./lib/phonetics-to-diacritics";
import {
    randomPerson,
    isInvalidSubjObjCombo,
    randomSubjObj,
} from "./lib/np-tools";
import {
    convertSpelling,
    revertSpelling,
} from "./lib/convert-spelling";
import {
    dictionaryEntryBooleanFields,
    dictionaryEntryNumberFields,
    dictionaryEntryTextFields,
} from "./lib/fields";
import {
    validateEntry,
    standardizeEntry,
} from "./lib/validate-entry";
import {
    readDictionary,
    writeDictionary,
    readDictionaryInfo,
    writeDictionaryInfo,
} from "./lib/protobuf";
import {
    pashtoConsonants,
} from "./lib/pashto-consonants";
import {
    isNounAdjOrVerb,
    getEnglishPersonInfo,
    getPersonFromVerbForm,
    getPersonNumber,
    personFromVerbBlockPos,
    getVerbBlockPosFromPerson,
    personIsPlural,
    personGender,
    parseEc,
} from "./lib/misc-helpers";
import {
    simplifyPhonetics,
} from "./lib/simplify-phonetics";
import {
    translatePhonetics,
} from "./lib/translate-phonetics";
import {
    addDiacritics,
} from "./lib/diacritics";
import {
    removeAccents,
    hasAccents,
    splitUpSyllables,
    countSyllables,
} from "./lib/accent-helpers";
import defaultTextOptions from "./lib/default-text-options";
import * as grammarUnits from "./lib/grammar-units";
import genderColors from "./lib/gender-colors";
import * as Types from "./types";
import * as typePredicates from "./lib/type-predicates";

export {
    // FUNCTIONS
    conjugateVerb,
    getVerbInfo,
    inflectWord,
    addToForm,
    concatPsString,
    makePsString,
    removeFVarients,
    standardizePashto,
    standardizePhonetics,
    convertSpelling,
    revertSpelling,
    validateEntry,
    standardizeEntry,
    isNounAdjOrVerb,
    simplifyPhonetics,
    phoneticsToDiacritics,
    addDiacritics,
    translatePhonetics,
    getEnglishPersonInfo,
    getPersonFromVerbForm,
    getPersonNumber,
    isVerbBlock,
    isImperativeBlock,
    isInflectionSet,
    isPluralInflectionSet,
    isUnisexSet,
    personFromVerbBlockPos,
    removeAccents,
    hasAccents,
    getEnglishWord,
    getVerbBlockPosFromPerson,
    personIsPlural,
    personGender,
    addEnglish,
    parseEc,
    endsWith,
    splitUpSyllables,
    countSyllables,
    hasBaParticle,
    psRemove,
    firstVariation,
    capitalizeFirstLetter,
    psStringFromEntry,
    getLong,
    makeVerbSelection,
    useStickyState,
    randomPerson,
    isInvalidSubjObjCombo,
    randomSubjObj,
    // protobuf helpers
    readDictionary,
    writeDictionary,
    readDictionaryInfo,
    writeDictionaryInfo,
    // COMPONENTS
    VPExplorer,
    ConjugationViewer, // TODO: Deprecated - remove
    Examples,
    VerbFormDisplay,
    VerbTable,
    VerbInfo,
    RootsAndStems,
    InflectionsTable,
    Pashto,
    Phonetics,
    InlinePs,
    ButtonSelect,
    Hider,
    EntrySelect,
    // OTHER
    typePredicates,
    grammarUnits,
    pashtoConsonants,
    defaultTextOptions,
    dictionaryEntryTextFields,
    dictionaryEntryNumberFields,
    dictionaryEntryBooleanFields,
    genderColors,
    // TYPES
    Types,
}