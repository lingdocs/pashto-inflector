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
    getPassiveRootsAndStems,
    getAbilityRootsAndStems,
} from "./lib/verb-info";
import InflectionsTable from "./components/InflectionsTable";
import Pashto from "./components/Pashto";
import Phonetics from "./components/Phonetics";
import InlinePs from "./components/InlinePs";
import ButtonSelect from "./components/ButtonSelect";
import VerbFormDisplay from "./components/VerbFormDisplay";
import VerbTable from "./components/VerbTable";
import EPDisplay from "./components/ep-explorer/EPDisplay";
import Examples from "./components/Examples";
import Hider from "./components/Hider";
import EntrySelect from "./components/EntrySelect";
import VerbInfo, { RootsAndStems } from "./components/verb-info/VerbInfo";
import VPExplorer from "./components/vp-explorer/VPExplorer";
import { vpsReducer } from "./components/vp-explorer/vps-reducer";
import type { VpsReducerAction as VpsA } from "./components/vp-explorer/vps-reducer";
import useStickyState from "./lib/useStickyState";
import { isPastTense } from "./lib/phrase-building/vp-tools";
import Block, { NPBlock, APBlock } from "./components/blocks/Block";
import { roleIcon } from "./components/vp-explorer/VPExplorerExplanationModal";
import CompiledPTextDisplay from "./components/CompiledPTextDisplay";
import RenderedBlocksDisplay from "./components/RenderedBlocksDisplay";
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
    getEnglishVerb,
} from "./lib/np-tools";
import {
    getEnglishFromRendered,
    getPashtoFromRendered,
} from "./lib/phrase-building/np-tools"; // TODO should be one np-tools file?
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
    psJSXMap,
} from "./lib/jsx-map";
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
    personNumber,
    randFromArray,
    chooseLength,
    isFirstPerson,
    isSecondPerson,
    isThirdPerson,
} from "./lib/misc-helpers";
import {
    flattenLengths,
} from "./lib/phrase-building/compile";
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
import {
    makeNounSelection,
} from "./components/np-picker/picker-tools";
import {
    renderEP,
} from "./lib/phrase-building/render-ep";
import {
    renderVP,
} from "./lib/phrase-building/render-vp";
import {
    renderNPSelection,
} from "./lib/phrase-building/render-np";
import {
    compileEP,
    compileVP,
} from "./lib/phrase-building/compile";
import {
    renderAPSelection,
} from "./lib/phrase-building/render-ap";
import NPPicker from "./components/np-picker/NPPicker";
import EPPicker from "./components/ep-explorer/EPPicker";
import EPExplorer from "./components/ep-explorer/EPExplorer";
import shuffleArray from "./lib/shuffle-array";
import defaultTextOptions from "./lib/default-text-options";
import * as grammarUnits from "./lib/grammar-units";
import genderColors from "./lib/gender-colors";
import * as Types from "./types";
import * as typePredicates from "./lib/type-predicates";
import APPicker from "./components/ap-picker/APPicker";
import VPDisplay from "./components/vp-explorer/VPDisplay";
import VPPicker from "./components/vp-explorer/VPPicker";

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
    useStickyState,
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
    psJSXMap,
    renderNPSelection,
    getEnglishFromRendered,
    getPashtoFromRendered,
    renderAPSelection,
    getEnglishVerb,
    roleIcon,
    vpsReducer,
    // protobuf helpers
    readDictionary,
    writeDictionary,
    readDictionaryInfo,
    writeDictionaryInfo,
    // COMPONENTS
    EPExplorer,
    VPExplorer,
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
    NPPicker,
    APPicker,
    NPBlock,
    APBlock,
    Block,
    EPDisplay,
    VPDisplay,
    EPPicker,
    VPPicker,
    CompiledPTextDisplay,
    RenderedBlocksDisplay,
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

export type VpsReducerAction = VpsA;