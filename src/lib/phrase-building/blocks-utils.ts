import * as T from "../../types";
import { getLength } from "../p-text-helpers";

export function getSubjectSelection(blocks: T.EPSBlockComplete[] | T.VPSBlockComplete[]): T.SubjectSelectionComplete;
export function getSubjectSelection(blocks: T.EPSBlock[] | T.VPSBlock[]): T.SubjectSelection;
export function getSubjectSelection(blocks: T.EPSBlock[] | T.EPSBlockComplete[] | T.VPSBlockComplete[] | T.VPSBlock[]): T.SubjectSelection | T.SubjectSelectionComplete {
    const b = blocks.find(f => f.block?.type === "subjectSelection");
    if (!b || !b.block || b.block.type !== "subjectSelection") {
        throw new Error("subjectSelection not found in blocks");
    }
    return b.block;
}

export function getSubjectSelectionFromBlocks(blocks: T.Block[]): T.Rendered<T.SubjectSelectionComplete> {
    const b = blocks.find(f => f.type === "subjectSelection");
    if (!b || b.type !== "subjectSelection") {
        throw new Error("subjectSelection not found in blocks");
    }
    return b;
}

export function getPredicateSelectionFromBlocks(blocks: T.Block[]): T.Rendered<T.PredicateSelectionComplete> {
    const b = blocks.find(f => f.type === "predicateSelection");
    if (!b || b.type !== "predicateSelection") {
        throw new Error("predicateSelection not found in blocks");
    }
    return b;
}

export function getAPsFromBlocks(blocks: T.Block[]): T.Rendered<T.APSelection>[] {
    return blocks.filter(b => b.type === "AP") as T.Rendered<T.APSelection>[];
} 

export function getObjectSelection(blocks: T.VPSBlockComplete[]): T.ObjectSelectionComplete;
export function getObjectSelection(blocks: T.VPSBlock[]): T.ObjectSelection;
export function getObjectSelection(blocks: T.VPSBlock[] | T.VPSBlockComplete[]): T.ObjectSelection | T.ObjectSelectionComplete {
    const b = blocks.find(f => f.block?.type === "objectSelection");
    if (!b || !b.block || b.block.type !== "objectSelection") {
        throw new Error("objectSelection not found in blocks");
    }
    return b.block;
}

export function getRenderedSubjectSelection(blocks: (T.Rendered<T.SubjectSelectionComplete> | T.Rendered<T.NPSelection> | T.Rendered<T.APSelection> | T.RenderedVPSBlock)[]): T.Rendered<T.SubjectSelectionComplete> {
    const b = blocks.find(f => typeof f === "object" && f.type === "subjectSelection");
    if (!b || typeof b !== "object" || b.type !== "subjectSelection") {
        throw new Error("subjectSelection not found in blocks");
    }
    return b;
}

export function getRenderedObjectSelection(blocks: T.RenderedVPSBlock[]): T.Rendered<T.ObjectSelectionComplete> {
    const b = blocks.find(f => typeof f === "object" && f.type === "objectSelection");
    if (!b || typeof b !== "object" || b.type !== "objectSelection") {
        throw new Error("objectSelection not found in blocks");
    }
    return b;
}


export function makeEPSBlocks(): T.EPSBlock[] {
    return [
        {
            key: Math.random(),
            block: {
                type: "subjectSelection",
                selection: undefined,
            },
        }
    ];
}

export function makeAPBlock(): { key: number, block: undefined } {
    return {
        key: Math.random(),
        block: undefined,
    };
}

export function makeSubjectSelection(selection: T.SubjectSelection | T.NPSelection | T.NPSelection["selection"] | undefined): T.SubjectSelection {
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
        }
    };
}

export function makeObjectSelection(selection: T.ObjectSelection | T.ObjectNP | T.NPSelection | T.NPSelection["selection"] | undefined): T.ObjectSelection {
    if (!selection) {
        return {
            type: "objectSelection",
            selection: undefined,
        }
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

export function EPSBlocksAreComplete(blocks: T.EPSBlock[]): blocks is T.EPSBlockComplete[] {
    if (blocks.some(block => block.block === undefined)) {
        return false;
    }
    const subject = getSubjectSelection(blocks);
    return !!subject.selection;
}

export function VPSBlocksAreComplete(blocks: T.VPSBlock[]): blocks is T.VPSBlockComplete[] {
    if (blocks.some(block => block.block === undefined)) {
        return false;
    }
    const subject = getSubjectSelection(blocks);
    if (!subject.selection) return false;
    const object = getObjectSelection(blocks);
    if (!object.selection) return false;
    return true;
}

export function adjustSubjectSelection(blocks: T.EPSBlock[], subject: T.SubjectSelection | T.NPSelection | undefined): T.EPSBlock[];
export function adjustSubjectSelection(blocks: T.VPSBlock[], subject: T.SubjectSelection | T.NPSelection | undefined): T.VPSBlock[];
export function adjustSubjectSelection(blocks: T.VPSBlock[] | T.EPSBlock[], subject: T.SubjectSelection | T.NPSelection | undefined): T.VPSBlock[] | T.EPSBlock[] {
    const nb = [...blocks];
    const i = nb.findIndex(b => b.block && b.block.type === "subjectSelection");
    if (i === -1) {
        throw new Error("couldn't find subjectSelection to modify");
    }
    nb[i].block = subject?.type === "subjectSelection" ? subject : makeSubjectSelection(subject);
    return nb;
}

export function adjustObjectSelection(blocks: T.VPSBlock[], object: T.ObjectSelectionComplete | T.NPSelection | T.VerbObject | T.ObjectSelectionComplete): T.VPSBlockComplete[];
export function adjustObjectSelection(blocks: T.VPSBlock[], object: T.ObjectSelection | T.NPSelection | T.VerbObject | T.ObjectSelection | undefined): T.EPSBlock[];
export function adjustObjectSelection(blocks: T.VPSBlock[], object: T.ObjectSelection | T.ObjectSelectionComplete | T.VerbObject | T.NPSelection | undefined): T.VPSBlock[] | T.VPSBlockComplete[] {
    const nb = [...blocks];
    const i = nb.findIndex(b => b.block && b.block.type === "objectSelection");
    if (i === -1) {
        throw new Error("couldn't find objectSelection to modify");
    }
    nb[i].block = typeof object === "object" && object?.type === "objectSelection"
        ? object
        : makeObjectSelection(object);
    return nb;
}

export function shiftBlock<B extends T.VPSBlock[] | T.EPSBlock[]>(blocks: B, index: number, direction: "back" | "forward"): B {
    const newIndex = index + (direction === "forward"
        ? 1 // (isNoObject(blocks[index + 1].block) ? 2 : 1)
        : -1 // (isNoObject(blocks[index - 1].block) ? -2 : -2)
    );
    return arrayMove(blocks, index, newIndex) as B;
}

export function insertNewAP<B extends T.VPSBlock[] | T.EPSBlock[]>(blocks: B): B {
    return [makeAPBlock(), ...blocks] as B;
}

export function setAP<B extends T.VPSBlock[] | T.EPSBlock[]>(blocks: B, index: number, AP: T.APSelection | undefined): B {
    const nBlocks = [...blocks] as B;
    nBlocks[index].block = AP;
    return nBlocks;
}

export function removeAP<B extends T.VPSBlock[] | T.EPSBlock[]>(blocks: B, index: number): B {
    const nBlocks = [...blocks] as B;
    nBlocks.splice(index, 1);
    return nBlocks;
}

export function isNoObject(b: T.VPSBlock["block"] | T.EPSBlock["block"]): b is { type: "objectSelection", selection: "none" } {
    return !!(b && b.type === "objectSelection" && b.selection === "none");
}

export function specifyEquativeLength(blocks: T.Block[], length: "long" | "short"): T.Block[] {
    const i = blocks.findIndex(b => b.type === "equative");
    if (i === -1) throw new Error("equative block not found in EPRendered");
    const eq = blocks[i];
    if (eq.type !== "equative") throw new Error("error searching for equative block");
    const adjusted = [...blocks];
    adjusted[i] = {
        ...eq,
        equative: {
            ...eq.equative,
            ps: getLength(eq.equative.ps, length),
        },
    };
    return adjusted;
}

export function hasEquativeWithLengths(blocks: T.Block[]): boolean {
    const equative = blocks.find(x => x.type === "equative");
    if (!equative) throw new Error("equative not found in blocks");
    if (equative.type !== "equative") throw new Error("error finding equative in blocks");
    return "long" in equative.equative.ps;
}

function arrayMove<X>(ar: X[], old_index: number, new_index: number): X[] {
    const arr = [...ar];
    const new_i = (new_index >= arr.length)
      ? (arr.length - 1)
      : (new_index < 0)
      ? 0
      : new_index;
    arr.splice(new_i, 0, arr.splice(old_index, 1)[0]);
    return arr;
};