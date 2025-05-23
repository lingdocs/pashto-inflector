import * as T from "../../../types";
import { assertNever } from "../misc-helpers";
import { getLength } from "../p-text-helpers";

export function makeBlock(block: T.Block["block"], key?: number): T.Block {
  return {
    key: key === undefined ? Math.random() : key,
    block,
  };
}

export function makeKid(kid: T.Kid["kid"], key?: number): T.Kid {
  return {
    key: key === undefined ? Math.random() : key,
    kid,
  };
}

export function getSubjectSelection(
  blocks: T.EPSBlockComplete[] | T.VPSBlockComplete[]
): T.SubjectSelectionComplete;
export function getSubjectSelection(
  blocks: T.EPSBlock[] | T.VPSBlock[]
): T.SubjectSelection;
export function getSubjectSelection(
  blocks:
    | T.EPSBlock[]
    | T.EPSBlockComplete[]
    | T.VPSBlockComplete[]
    | T.VPSBlock[]
): T.SubjectSelection | T.SubjectSelectionComplete {
  const b = blocks.find((f) => f.block?.type === "subjectSelection");
  if (!b || !b.block || b.block.type !== "subjectSelection") {
    throw new Error("subjectSelection not found in blocks");
  }
  return b.block;
}

export function getComplementFromBlocks(
  blocks: T.Block[][]
):
  | T.Rendered<T.ComplementSelection>
  | T.UnselectedComplementSelection
  | undefined {
  const b = blocks[0].find((f) => f.block.type === "complement");
  return b?.block as
    | T.Rendered<T.ComplementSelection>
    | T.UnselectedComplementSelection
    | undefined;
}

export function getSubjectSelectionFromBlocks(
  blocks: T.Block[][]
): T.Rendered<T.SubjectSelectionComplete> {
  const b = blocks[0].find((f) => f.block.type === "subjectSelection");
  if (!b || b.block.type !== "subjectSelection") {
    throw new Error("subjectSelection not found in blocks");
  }
  return b.block;
}

export function getObjectSelectionFromBlocks(
  blocks: T.Block[][]
): T.Rendered<T.ObjectSelectionComplete> {
  const b = blocks[0].find((f) => f.block.type === "objectSelection");
  if (!b || b.block.type !== "objectSelection") {
    throw new Error("objectSelection not found in blocks");
  }
  return b.block;
}

export function includesShrunkenServant(kids?: T.Kid[]): boolean {
  if (!kids) return false;
  return kids.some(
    (k) => k.kid.type === "mini-pronoun" && k.kid.source === "servant"
  );
}

export function getPredicateBlock(blocks: T.Block[][]): T.PredicateBlock {
  const b = blocks[0].find((f) => f.block.type === "predicate");
  if (!b) {
    throw new Error("predicate block not found");
  }
  return b.block as T.PredicateBlock;
}

export function getAPsFromBlocks(
  blocks: T.Block[][]
): T.Rendered<T.APSelection>[] {
  return blocks[0]
    .filter((b) => b.block.type === "AP")
    .map((b) => b.block) as T.Rendered<T.APSelection>[];
}

export function getObjectSelection(
  blocks: T.VPSBlockComplete[]
): T.ObjectSelectionComplete;
export function getObjectSelection(blocks: T.VPSBlock[]): T.ObjectSelection;
export function getObjectSelection(
  blocks: T.VPSBlock[] | T.VPSBlockComplete[]
): T.ObjectSelection | T.ObjectSelectionComplete {
  const b = blocks.find((f) => f.block?.type === "objectSelection");
  if (!b || !b.block || b.block.type !== "objectSelection") {
    throw new Error("objectSelection not found in blocks");
  }
  return b.block;
}

export function makeEPSBlocks(): T.EPSBlock[] {
  return [
    {
      key: Math.random(),
      block: {
        type: "subjectSelection",
        selection: undefined,
      },
    },
  ];
}

export function makeAPBlock(): { key: number; block: undefined } {
  return {
    key: Math.random(),
    block: undefined,
  };
}

export function makeSubjectSelection(
  selection:
    | T.SubjectSelection
    | T.NPSelection
    | T.NPSelection["selection"]
    | undefined
): T.SubjectSelection {
  if (!selection) {
    return {
      type: "subjectSelection",
      selection: undefined,
    };
  }
  if (selection.type === "subjectSelection") {
    return selection;
  }
  if (selection.type === "NP") {
    return {
      type: "subjectSelection",
      selection,
    };
  }
  return {
    type: "subjectSelection",
    selection: {
      type: "NP",
      selection,
    },
  };
}

export function makeSubjectSelectionComplete(
  selection: T.NPSelection
): T.SubjectSelectionComplete {
  return {
    type: "subjectSelection",
    selection,
  };
}

export function makeObjectSelection(
  selection:
    | T.ObjectSelection
    | T.ObjectNP
    | T.NPSelection
    | T.NPSelection["selection"]
    | undefined
): T.ObjectSelection {
  if (!selection) {
    return {
      type: "objectSelection",
      selection: undefined,
    };
  }
  if (typeof selection !== "object") {
    return {
      type: "objectSelection",
      selection,
    };
  }
  if (selection.type === "objectSelection") {
    return selection;
  }
  if (selection.type === "NP") {
    return {
      type: "objectSelection",
      selection,
    };
  }
  return {
    type: "objectSelection",
    selection: {
      type: "NP",
      selection,
    },
  };
}

export function makeObjectSelectionComplete(
  selection: T.NPSelection
): T.ObjectSelectionComplete {
  return {
    type: "objectSelection",
    selection,
  };
}

export function EPSBlocksAreComplete(
  blocks: T.EPSBlock[]
): blocks is T.EPSBlockComplete[] {
  if (blocks.some((block) => block.block === undefined)) {
    return false;
  }
  const subject = getSubjectSelection(blocks);
  return !!subject.selection;
}

export function VPSBlocksAreComplete(
  blocks: T.VPSBlock[]
): blocks is T.VPSBlockComplete[] {
  if (blocks.some((block) => block.block === undefined)) {
    return false;
  }
  const subject = getSubjectSelection(blocks);
  if (!subject.selection) return false;
  const object = getObjectSelection(blocks);
  if (!object.selection) return false;
  return true;
}

export function adjustSubjectSelection<B extends T.VPSBlock | T.EPSBlock>(
  subject: T.SubjectSelection | T.NPSelection | undefined
) {
  return function (blocks: B[]): B[] {
    const nb = [...blocks];
    const i = nb.findIndex(
      (b) => b.block && b.block.type === "subjectSelection"
    );
    if (i === -1) {
      throw new Error("couldn't find subjectSelection to modify");
    }
    nb[i].block =
      subject?.type === "subjectSelection"
        ? subject
        : makeSubjectSelection(subject);
    return nb;
  };
}

export function adjustObjectSelection(
  blocks: Readonly<T.VPSBlock[]>,
  object:
    | T.ObjectSelectionComplete
    | T.NPSelection
    | T.VerbObject
    | T.ObjectSelectionComplete
): T.VPSBlockComplete[];
export function adjustObjectSelection(
  blocks: Readonly<T.VPSBlock[]>,
  object:
    | T.ObjectSelection
    | T.NPSelection
    | T.VerbObject
    | T.ObjectSelection
    | undefined
): T.EPSBlock[];
export function adjustObjectSelection(
  blocks: Readonly<T.VPSBlock[]>,
  object:
    | T.ObjectSelection
    | T.ObjectSelectionComplete
    | T.VerbObject
    | T.NPSelection
    | undefined
): T.VPSBlock[] | T.VPSBlockComplete[] {
  const nb = [...blocks];
  const i = nb.findIndex((b) => b.block && b.block.type === "objectSelection");
  if (i === -1) {
    throw new Error("couldn't find objectSelection to modify");
  }
  nb[i].block =
    typeof object === "object" && object?.type === "objectSelection"
      ? object
      : makeObjectSelection(object);
  return nb;
}

export function moveObjectToEnd(
  blocks: T.VPSBlockComplete[]
): T.VPSBlockComplete[] {
  const i = blocks.findIndex(
    (b) => b.block && b.block.type === "objectSelection"
  );
  if (i === -1) {
    throw new Error("couldn't find objectSelection to move");
  }
  if (i === blocks.length - 1) {
    return blocks;
  }
  return arrayMove(blocks, i, blocks.length - 1);
}

export function shiftBlock<B extends T.VPSBlock[] | T.EPSBlock[]>(
  index: number,
  direction: "back" | "forward"
) {
  return function (blocks: B): B {
    const newIndex =
      index +
      (direction === "forward"
        ? 1 // (isNoObject(blocks[index + 1].block) ? 2 : 1)
        : -1); // (isNoObject(blocks[index - 1].block) ? -2 : -2)
    return arrayMove(blocks, index, newIndex) as B;
  };
}

export function insertNewAP<B extends T.VPSBlock[] | T.EPSBlock[]>(
  blocks: B
): B {
  return [makeAPBlock(), ...blocks] as B;
}

export function setAP<B extends T.VPSBlock[] | T.EPSBlock[]>(
  index: number,
  AP: T.APSelection | undefined
): (b: B) => B {
  return function (blocks: B): B {
    const nBlocks = [...blocks] as B;
    nBlocks[index].block = AP;
    return nBlocks;
  };
}

export function removeAP<B extends T.VPSBlock[] | T.EPSBlock[]>(index: number) {
  return function (blocks: B): B {
    const nBlocks = [...blocks] as B;
    nBlocks.splice(index, 1);
    return nBlocks;
  };
}

export function isNoObject(
  b: T.VPSBlock["block"] | T.EPSBlock["block"]
): b is { type: "objectSelection"; selection: "none" } {
  return !!(b && b.type === "objectSelection" && b.selection === "none");
}

export function specifyEquativeLength(
  blocksWVars: T.Block[][],
  length: "long" | "short"
): T.Block[][] {
  function specify(blocks: T.Block[]): T.Block[] {
    const i = blocks.findIndex((b) => b.block.type === "equative");
    if (i === -1) throw new Error("equative block not found in EPRendered");
    const eq = blocks[i];
    if (eq.block.type !== "equative")
      throw new Error("error searching for equative block");
    const adjusted = [...blocks];
    adjusted[i] = {
      ...eq,
      block: {
        ...eq.block,
        equative: {
          ...eq.block.equative,
          ps: getLength(eq.block.equative.ps, length),
        },
      },
    };
    return adjusted;
  }
  return blocksWVars.map(specify);
}

export function isRenderedVerbB({ block }: T.Block): boolean {
  if (block.type === "equative") {
    return true;
  }
  if (block.type === "VB") {
    return true;
  }
  if (block.type === "PH") {
    return true;
  }
  if (block.type === "NComp") {
    return true;
  }
  if (block.type === "welded") {
    return true;
  }
  if (block.type === "complement") {
    return true;
  }
  return false;
}

export function hasEquativeWithLengths(blocks: T.Block[][]): boolean {
  const equative = blocks[0].find((x) => x.block.type === "equative");
  if (!equative) throw new Error("equative not found in blocks");
  if (equative.block.type !== "equative")
    throw new Error("error finding equative in blocks");
  return "long" in equative.block.equative.ps;
}

function arrayMove<X>(ar: X[], old_index: number, new_index: number): X[] {
  const arr = [...ar];
  const new_i =
    new_index >= arr.length ? arr.length - 1 : new_index < 0 ? 0 : new_index;
  arr.splice(new_i, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

// TODO: This takes 8 helper functions to recursively go down and check all determiners
//  - is this what LENSES would help with?
export function removeHeetsDet<B extends T.VPSBlock[] | T.EPSBlock[]>(
  blocks: B
): B {
  return blocks.map<T.VPSBlock | T.EPSBlock>((x) => ({
    key: x.key,
    block: removeHeetsDetFromBlock(x.block),
  })) as B;
}

// TODO: Could use lenses for this
function removeHeetsDetFromBlock<
  B extends T.VPSBlock["block"] | T.EPSBlock["block"]
>(block: B): B {
  if (!block) {
    return block;
  }
  if (block.type === "AP") {
    return removeHeetsDetFromAP(block) as B;
  }
  if (block.type === "complement") {
    return removeHeetsFromComp(block) as B;
  }
  return {
    ...block,
    selection:
      typeof block.selection === "object"
        ? removeHeetsFromNP(block.selection)
        : block.selection,
  };
}

function removeHeetsDetFromAP(ap: T.APSelection): T.APSelection {
  if (ap.selection.type === "adverb") {
    return ap;
  }
  return {
    ...ap,
    selection: removeHeetsFromSandwich(ap.selection),
  };
}

function removeHeetsFromSandwich(
  sand: T.SandwichSelection<T.Sandwich>
): T.SandwichSelection<T.Sandwich> {
  return {
    ...sand,
    inside: removeHeetsFromNP(sand.inside),
  };
}

function removeHeetsFromAdjective(
  adj: T.AdjectiveSelection
): T.AdjectiveSelection {
  return {
    ...adj,
    sandwich: adj.sandwich ? removeHeetsFromSandwich(adj.sandwich) : undefined,
  };
}

function removeHeetsFromComp(
  comp: T.ComplementSelection
): T.ComplementSelection {
  if (comp.selection.type === "adjective") {
    return {
      ...comp,
      selection: removeHeetsFromAdjective(comp.selection),
    };
  }
  if (comp.selection.type === "NP") {
    return {
      ...comp,
      selection: removeHeetsFromNP(comp.selection),
    };
  }
  if (comp.selection.type === "sandwich") {
    return {
      ...comp,
      selection: removeHeetsFromSandwich(comp.selection),
    };
  }
  if (comp.selection.type === "possesor") {
    return {
      ...comp,
      selection: {
        ...comp.selection,
        np: removeHeetsFromNP(comp.selection.np),
      },
    };
  }
  if (
    comp.selection.type === "comp. noun" ||
    comp.selection.type === "loc. adv."
  ) {
    return comp;
  }
  assertNever(comp.selection, "unknown complement type");
}

function removeHeetsFromNoun(n: T.NounSelection): T.NounSelection {
  return {
    ...n,
    adjectives: n.adjectives.map(removeHeetsFromAdjective),
    ...(n.determiners
      ? {
          determiners: removeHeetsFromDets(n.determiners),
        }
      : {}),
  };
}

function removeHeetsFromNP(np: T.NPSelection): T.NPSelection {
  if (np.selection.type === "noun") {
    return {
      ...np,
      selection: removeHeetsFromNoun(np.selection),
    };
  }
  return np;
}

function removeHeetsFromDets(
  dets: T.DeterminersSelection | undefined
): T.DeterminersSelection | undefined {
  if (!dets) {
    return dets;
  }
  return {
    ...dets,
    determiners: dets.determiners.filter((d) => d.determiner.p !== "هیڅ"),
  };
}
