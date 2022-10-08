/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

 import {
    conjugateVerb,
} from "./src/verb-conjugation";
import {
    inflectWord,
} from "./src/pashto-inflector";
import {
    getVerbInfo,
    getPassiveRootsAndStems,
    getAbilityRootsAndStems,
} from "./src/verb-info";
import { makeVPSelectionState } from "./src/phrase-building/verb-selection";
import { vpsReducer } from "./src/phrase-building/vps-reducer";
import { isPastTense } from "./src/phrase-building/vp-tools";
import {
    getInflectionPattern,
} from "./src/inflection-pattern";
import {
    makePsString,
    removeFVarients,
} from "./src/accent-and-ps-utils";
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
} from "./src/p-text-helpers";
import {
    getEnglishWord,
} from "./src/get-english-word";
import {
    standardizePashto,
    standardizePhonetics,
} from "./src/standardize-pashto";
import { phoneticsToDiacritics } from "./src/phonetics-to-diacritics";
import {
    randomPerson,
    isInvalidSubjObjCombo,
    randomSubjObj,
    getEnglishVerb,
} from "./src/np-tools";
import {
    getEnglishFromRendered,
    getPashtoFromRendered,
} from "./src/phrase-building/np-tools"; // TODO should be one np-tools file?
import {
    convertSpelling,
    revertSpelling,
} from "./src/convert-spelling";
import {
    dictionaryEntryBooleanFields,
    dictionaryEntryNumberFields,
    dictionaryEntryTextFields,
} from "./src/fields";
import {
    validateEntry,
    standardizeEntry,
} from "./src/validate-entry";
import {
    readDictionary,
    writeDictionary,
    readDictionaryInfo,
    writeDictionaryInfo,
} from "./src/protobuf";
import {
    pashtoConsonants,
} from "./src/pashto-consonants";
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
    personNumber,
    randFromArray,
    chooseLength,
    isFirstPerson,
    isSecondPerson,
    isThirdPerson,
    blank,
    kidsBlank,
    ensureNonComboVerbInfo,
} from "./src/misc-helpers";
import {
    simplifyPhonetics,
} from "./src/simplify-phonetics";
import {
    translatePhonetics,
} from "./src/translate-phonetics";
import {
    addDiacritics,
} from "./src/diacritics";
import {
    removeAccents,
    hasAccents,
    splitUpSyllables,
    countSyllables,
} from "./src/accent-helpers";
import {
    makeNounSelection,
} from "./src/phrase-building/make-selections";
import {
    renderEP,
} from "./src/phrase-building/render-ep";
import {
    renderVP,
} from "./src/phrase-building/render-vp";
import {
    renderNPSelection,
} from "./src/phrase-building/render-np";
import {
    compileEP,
    compileVP,
    flattenLengths,
} from "./src/phrase-building/compile";
import {
    isPashtoScript,
} from "./src/is-pashto";
import {
    renderAPSelection,
} from "./src/phrase-building/render-ap";
import {
    humanReadableVerbForm,
    humanReadableEquativeTense,
} from "./src/human-readable";
import shuffleArray from "./src/shuffle-array";
import defaultTextOptions from "./src/default-text-options";
import * as grammarUnits from "./src/grammar-units";
import * as Types from "../types";
import * as typePredicates from "./src/type-predicates";
import * as blockUtils from "./src/phrase-building/blocks-utils";

export {
    // FUNCTIONS
    conjugateVerb,
    getVerbInfo,
    getPassiveRootsAndStems,
    getAbilityRootsAndStems,
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
    randomPerson,
    isInvalidSubjObjCombo,
    randomSubjObj,
    shuffleArray,
    personNumber,
    makeNounSelection,
    randFromArray,
    renderEP,
    renderVP,
    compileEP,
    compileVP,
    chooseLength,
    flattenLengths,
    isFirstPerson,
    isSecondPerson,
    isThirdPerson,
    isPastTense,
    renderNPSelection,
    getEnglishFromRendered,
    getPashtoFromRendered,
    renderAPSelection,
    getEnglishVerb,
    humanReadableVerbForm,
    humanReadableEquativeTense,
    ensureNonComboVerbInfo,
    vpsReducer,
    makeVPSelectionState,
    blockUtils,
    blank,
    kidsBlank,
    isPashtoScript,
    getInflectionPattern,
    // protobuf helpers
    readDictionary,
    writeDictionary,
    readDictionaryInfo,
    writeDictionaryInfo,
    // OTHER
    typePredicates,
    grammarUnits,
    pashtoConsonants,
    defaultTextOptions,
    dictionaryEntryTextFields,
    dictionaryEntryNumberFields,
    dictionaryEntryBooleanFields,
    // TYPES
    Types,
}
