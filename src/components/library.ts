import Pashto from "./src/text-display/Pashto";
import Phonetics from "./src/text-display/Phonetics";
import InlinePs from "./src/text-display/InlinePs";
import Examples from "./src/text-display/Examples";
import CompiledPTextDisplay from "./src/text-display/CompiledPTextDisplay";
import ButtonSelect from "./src/selects/ButtonSelect";
import EntrySelect from "./src/selects/EntrySelect";
import PersonSelection from "./src/selects/PersonSelection";
import Hider from "./src/Hider";
import InflectionsTable from "./src/tables/InflectionsTable";
import VerbTable from "./src/tables/VerbTable";
import useStickyState from "./src/useStickyState";
import NPPicker from "./src/block-pickers/NPPicker";
import SandwichPicker from "./src/block-pickers/SandwichPicker";
import VerbFromDisplay from "./src/VerbFormDisplay";
import Block, { NPBlock, APBlock } from "./src/blocks/Block";
import VerbInfo, { RootsAndStems } from "./src/verb-info/VerbInfo";
import VPExplorer from "./src/vp-explorer/VPExplorer";
import EPExplorer from "./src/ep-explorer/EPExplorer";
import playAudio from "./src/play-audio";
import { roleIcon } from "./src/role-icons";
import { vpsReducer } from "../lib/src/phrase-building/vps-reducer";
import type { VpsReducerAction } from "../lib/src/phrase-building/vps-reducer";
import { makeVPSelectionState } from "../lib/src/phrase-building/verb-selection";

import APPicker from "./src/block-pickers/APPicker";
import VPDisplay from "./src/vp-explorer/VPDisplay";
import EPDisplay from "./src/ep-explorer/EPDisplay";
import VPPicker from "./src/vp-explorer/VPPicker";
import EPPicker from "./src/ep-explorer/EPPicker";
import NPDisplay from "./src/vp-explorer/NPDisplay";
import HumanReadableInflectionPattern from "./src/tables/HumanReadableInflectionPattern";
import { psJSXMap } from "./src/text-display/jsx-map";
import genderColors from "./src/gender-colors";

// this library also includes everything from the core inflect library
export * from "../lib/library";

export {
  // text-display
  InlinePs,
  Pashto,
  Phonetics,
  CompiledPTextDisplay,
  Examples,

  // selects
  ButtonSelect,
  EntrySelect,
  PersonSelection,

  // tables
  InflectionsTable,
  VerbTable,

  // block-pickers
  APPicker,
  NPPicker,
  SandwichPicker,

  // blocks
  Block,
  NPBlock,
  APBlock,

  // misc
  Hider,
  useStickyState,
  VerbFromDisplay,
  VerbInfo,
  VPExplorer,
  EPExplorer,
  playAudio,
  roleIcon,
  vpsReducer,
  VpsReducerAction,
  makeVPSelectionState,
  RootsAndStems,
  VPDisplay,
  EPDisplay,
  VPPicker,
  EPPicker,
  NPDisplay,
  HumanReadableInflectionPattern,
  psJSXMap,
  genderColors,
};
