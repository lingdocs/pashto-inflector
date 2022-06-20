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

export function getSubjectSelectionFromBlocks(blocks: T.Block[][]): T.Rendered<T.SubjectSelectionComplete> {
    const b = blocks[0].find(f => f.type === "subjectSelection");
    if (!b || b.type !== "subjectSelection") {
        throw new Error("subjectSelection not found in blocks");
    }
    return b;
}

export function getObjectSelectionFromBlocks(blocks: T.Block[][]): T.Rendered<T.ObjectSelectionComplete> {
    const b = blocks[0].find(f => f.type === "objectSelection");
    if (!b || b.type !== "objectSelection") {
        throw new Error("objectSelection not found in blocks");
    }
    return b;
}

export function getVerbFromBlocks(blocks: T.Block[][]): T.VerbRenderedBlock {
    const b = blocks[0].find(f => f.type === "verb");
    const p = blocks[0].find(f => f.type === "perfectParticipleBlock");
    const m = blocks[0].find(f => f.type === "modalVerbBlock");
    const v = (b && b.type === "verb")
        ? b
        : (p && p.type === "perfectParticipleBlock")
        ? p.verb
        : (m && m.type === "modalVerbBlock")
        ? m.verb
        : undefined;
    if (!v) {
        throw new Error("verbSelection not found in blocks");
    }
    return v;
}

export function getVerbAndHeadFromBlocks(blocks: T.Block[][]): { verb: T.VerbRenderedBlock, perfectiveHead: T.PerfectiveHeadBlock } {
    const verb = getVerbFromBlocks(blocks);
    const perfectiveHead = blocks[0].find(f => f.type === "perfectiveHead");
    if (!perfectiveHead || perfectiveHead.type !== "perfectiveHead") {
        throw new Error("perfectiveHead not found in blocks");
    }
    return {
        verb,
        perfectiveHead,
    };
}

export function getPredicateSelectionFromBlocks(blocks: T.Block[][]): T.Rendered<T.PredicateSelectionComplete> {
    const b = blocks[0].find(f => f.type === "predicateSelection");
    if (!b || b.type !== "predicateSelection") {
        throw new Error("predicateSelection not found in blocks");
    }
    return b;
}

export function getAPsFromBlocks(blocks: T.Block[][]): T.Rendered<T.APSelection>[] {
    return blocks[0].filter(b => b.type === "AP") as T.Rendered<T.APSelection>[];
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

export function specifyEquativeLength(blocksWVars: T.Block[][], length: "long" | "short"): T.Block[][] {
    function specify(blocks: T.Block[]): T.Block[] {
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
    return blocksWVars.map(specify);
}

export function specifyVerbLength(blocksWVars: T.Block[][], length: "long" | "short" | "mini"): T.Block[][] {
    function specify(blocks: T.Block[]): T.Block[] {
        return blocks.map((block) => {
            if (block.type === "verb") {
                const v: T.VerbRenderedBlock = {
                    ...block,
                    block: {
                        ...block.block,
                        ps: getLength(block.block.ps, length),
                    },
                };
                return v;
            }
            if (block.type === "perfectParticipleBlock") {
                const p: T.PerfectParticipleBlock = {
                    ...block,
                    ps: getLength(block.ps, length),
                };
                return p;
            }
            if (block.type === "modalVerbBlock") {
                const m: T.ModalVerbBlock = {
                    ...block,
                    ps: getLength(block.ps, length),
                };
                return m;
            }
            return block;
        });
    }
    return blocksWVars.map(specify);
}

export function hasEquativeWithLengths(blocks: T.Block[][]): boolean {
    const equative = blocks[0].find(x => x.type === "equative");
    if (!equative) throw new Error("equative not found in blocks");
    if (equative.type !== "equative") throw new Error("error finding equative in blocks");
    return "long" in equative.equative.ps;
}

export function hasVerbWithLengths(blocks: T.Block[][]): boolean {
    // TODO: handle length options with perfect verb equative as well?
    const verb = blocks[0].find(x => (x.type === "verb" || x.type === "perfectParticipleBlock" || x.type === "modalVerbBlock"));
    if (!verb) throw new Error("verb not found in blocks");
    if (verb.type !== "verb" && verb.type !== "perfectParticipleBlock" && verb.type !== "modalVerbBlock") throw new Error("error finding verb in blocks");
    return (
        (verb.type === "verb" && "long" in verb.block.ps)
        || (verb.type === "perfectParticipleBlock" && "long" in verb.ps)
        || (verb.type === "modalVerbBlock" && "long" in verb.ps)
    );
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