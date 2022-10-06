/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

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
import { makeVPSelectionState } from "./components/vp-explorer/verb-selection";
import { vpsReducer } from "./components/vp-explorer/vps-reducer";
import type { VpsReducerAction as VpsA } from "./components/vp-explorer/vps-reducer";
import useStickyState from "./lib/useStickyState";
import Block, { NPBlock, APBlock } from "./components/blocks/Block";
import { roleIcon } from "./components/vp-explorer/VPExplorerExplanationModal";
import CompiledPTextDisplay from "./components/CompiledPTextDisplay";
import RenderedBlocksDisplay from "./components/RenderedBlocksDisplay";
import NPPicker from "./components/np-picker/NPPicker";
import EPPicker from "./components/ep-explorer/EPPicker";
import EPExplorer from "./components/ep-explorer/EPExplorer";
import APPicker from "./components/ap-picker/APPicker";
import VPDisplay from "./components/vp-explorer/VPDisplay";
import VPPicker from "./components/vp-explorer/VPPicker";

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
    EPPicker,
    VPPicker,
    CompiledPTextDisplay,
    RenderedBlocksDisplay,
}

export type VpsReducerAction = VpsA;