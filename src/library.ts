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
import ConjugationViewer from "./components/ConjugationViewer";
import InflectionsTable from "./components/InflectionsTable";
import Pashto from "./components/Pashto";
import Phonetics from "./components/Phonetics";
import InlinePs from "./components/InlinePs";
import ButtonSelect from "./components/ButtonSelect";
import VerbFormDisplay from "./components/VerbFormDisplay";
import VerbTable from "./components/VerbTable";
import Examples from "./components/Examples";
import VerbInfo, { RootsAndStems } from "./components/verb-info/VerbInfo";
import {
    addToForm,
    concatPsString,
    makePsString,
    removeFVariants,
} from "./lib/p-text-helpers";
import { standardizePashto } from "./lib/standardize-pashto";
import { phoneticsToDiacritics } from "./lib/phonetics-to-diacritics";
import {
    convertAfToPkSpelling,
    convertPkToAfSpelling,
} from "./lib/convert-spelling";
import {
    dictionaryEntryBooleanFields,
    dictionaryEntryNumberFields,
    dictionaryEntryTextFields,
} from "./lib/fields";
import {
    validateEntry
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
} from "./lib/misc-helpers";
import {
    simplifyPhonetics,
} from "./lib/simplify-phonetics";
import defaultTextOptions from "./lib/default-text-options";
import * as grammarUnits from "./lib/grammar-units";
import * as Types from "./types";

export {
    // FUNCTIONS
    conjugateVerb,
    getVerbInfo,
    inflectWord,
    addToForm,
    concatPsString,
    makePsString,
    removeFVariants,
    standardizePashto,
    convertAfToPkSpelling,
    convertPkToAfSpelling,
    validateEntry,
    isNounAdjOrVerb,
    simplifyPhonetics,
    phoneticsToDiacritics,
    // protobuf helpers
    readDictionary,
    writeDictionary,
    readDictionaryInfo,
    writeDictionaryInfo,
    // COMPONENTS
    ConjugationViewer,
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
    // OTHER
    grammarUnits,
    pashtoConsonants,
    defaultTextOptions,
    dictionaryEntryTextFields,
    dictionaryEntryNumberFields,
    dictionaryEntryBooleanFields,
    // TYPES
    Types,
}