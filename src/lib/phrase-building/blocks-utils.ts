import * as T from "../../types";

export function getSubjectSelection(blocks: T.EPSBlockComplete[]): T.SubjectSelectionComplete;
export function getSubjectSelection(blocks: T.EPSBlock[]): T.SubjectSelection;
export function getSubjectSelection(blocks: T.EPSBlock[] | T.EPSBlockComplete[]): T.SubjectSelection | T.SubjectSelectionComplete {
    const b = blocks.find(f => f.block?.type === "subjectSelection");
    if (!b || !b.block || b.block.type !== "subjectSelection") {
        throw new Error("subjectSelection not found in blocks");
    }
    return b.block;
}

export function getRenderedSubjectSelection(blocks: (T.Rendered<T.SubjectSelectionComplete> | T.Rendered<T.APSelection>)[]): T.Rendered<T.SubjectSelectionComplete> {
    const b = blocks.find(f => f.type === "subjectSelection");
    if (!b || b.type !== "subjectSelection") {
        throw new Error("subjectSelection not found in blocks");
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

export function makeAPBlock(): T.EPSBlock {
    return {
        key: Math.random(),
        block: undefined,
    };
}

export function makeSubjectSelection(selection: T.NPSelection | undefined): T.SubjectSelection {
    return {
        type: "subjectSelection",
        selection,
    };
}

export function EPSBlocksAreComplete(blocks: T.EPSBlock[]): blocks is T.EPSBlockComplete[] {
    if (blocks.some(block => block.block === undefined)) {
        return false;
    }
    const subject = getSubjectSelection(blocks);
    return !!subject.selection;
}

export function adjustSubjectSelection(blocks: T.EPSBlock[], subject: T.SubjectSelectionComplete | T.NPSelection): T.EPSBlockComplete[];
export function adjustSubjectSelection(blocks: T.EPSBlock[], subject: T.SubjectSelection | undefined): T.EPSBlock[];
export function adjustSubjectSelection(blocks: T.EPSBlock[], subject: T.SubjectSelection | T.SubjectSelectionComplete | T.NPSelection | undefined): T.EPSBlock[] | T.EPSBlockComplete[] {
    const nb = [...blocks];
    const i = nb.findIndex(b => b.block && b.block.type === "subjectSelection");
    if (i === -1) {
        throw new Error("couldn't find subjectSelection to modify");
    }
    nb[i].block = subject?.type === "subjectSelection" ? subject : makeSubjectSelection(subject);
    return nb;
}