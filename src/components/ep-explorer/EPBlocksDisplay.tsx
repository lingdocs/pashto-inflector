import * as T from "../../types";
import Block from "../blocks/Block";

function EPBlocksDisplay({ opts, rendered }: { opts: T.TextOptions, rendered: T.EPRendered }) {
    const blocks = rendered.omitSubject
        ? rendered.blocks.filter(b => b.type !== "subjectSelection")
        : rendered.blocks;
    
    return <div className="d-flex flex-row justify-content-center align-items-end mt-3">
        {blocks.map((block, i) => (
            <div key={Math.random()} className="mr-2">
                <Block opts={opts} block={block} />
            </div>
        ))}
    </div>;
}

export default EPBlocksDisplay;