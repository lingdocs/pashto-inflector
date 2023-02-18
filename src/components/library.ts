/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import InflectionsTable from "./src/InflectionsTable";
import Pashto from "./src/Pashto";
import Phonetics from "./src/Phonetics";
import InlinePs from "./src/InlinePs";
import ButtonSelect from "./src/ButtonSelect";
import VerbFormDisplay from "./src/VerbFormDisplay";
import VerbTable from "./src/VerbTable";
import EPDisplay from "./src/ep-explorer/EPDisplay";
import Examples from "./src/Examples";
import Hider from "./src/Hider";
import EntrySelect from "./src/EntrySelect";
import VerbInfo, { RootsAndStems } from "./src/verb-info/VerbInfo";
import VPExplorer from "./src/vp-explorer/VPExplorer";
import { makeVPSelectionState } from "../lib/src/phrase-building/verb-selection";
import { vpsReducer } from "../lib/src/phrase-building/vps-reducer";
import type { VpsReducerAction as VpsA } from "../lib/src/phrase-building/vps-reducer";
import useStickyState from "./src/useStickyState";
import Block, { NPBlock, APBlock } from "./src/blocks/Block";
import { roleIcon } from "./src/vp-explorer/VPExplorerExplanationModal";
import CompiledPTextDisplay from "./src/CompiledPTextDisplay";
import RenderedBlocksDisplay from "./src/RenderedBlocksDisplay";
import NPPicker from "./src/np-picker/NPPicker";
import EPPicker from "./src/ep-explorer/EPPicker";
import EPExplorer from "./src/ep-explorer/EPExplorer";
import APPicker from "./src/ap-picker/APPicker";
import VPDisplay from "./src/vp-explorer/VPDisplay";
import VPPicker from "./src/vp-explorer/VPPicker";
import NPDisplay from "./src/vp-explorer/NPDisplay";
import HumanReadableInflectionPattern from "./src/HumanReadableInflectionPattern";
import { psJSXMap } from "./src/jsx-map";
import genderColors from "./src/gender-colors";

// this library also includes everything from the core inflect library
export * from "../lib/library";

export {
    useStickyState,
    roleIcon,
    vpsReducer,
    makeVPSelectionState,
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
    NPDisplay,
    EPPicker,
    VPPicker,
    CompiledPTextDisplay,
    RenderedBlocksDisplay,
    HumanReadableInflectionPattern,
    psJSXMap,
    genderColors,
}

export type VpsReducerAction = VpsA;