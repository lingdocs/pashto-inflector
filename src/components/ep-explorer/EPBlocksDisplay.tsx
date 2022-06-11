import * as T from "../../types";
import Block from "../blocks/Block";
import KidDisplay from "../blocks/KidDisplay";

function EPBlocksDisplay({ opts, rendered, justify }: {
    opts: T.TextOptions,
    rendered: T.EPRendered,
    justify?: "left" | "right" | "center",
}) {
    const blocks = rendered.omitSubject
        ? rendered.blocks.filter(b => b.type !== "subjectSelection")
        : rendered.blocks;
    return <div className={`d-flex flex-row justify-content-${justify ? justify : "center"}`} style={{}}>
        <div className="d-flex flex-row justify-content-left align-items-end mt-3 pb-2" style={{ overflowX: "auto" }}>
            <div key={Math.random()} className="mr-2">
                <Block opts={opts} block={blocks[0]} />
            </div>
            <KidsSection opts={opts} kids={rendered.kids} />
            {blocks.slice(1).map((block, i) => (
                <div key={Math.random()} className="mr-2">
                    <Block opts={opts} block={block} />
                </div>
            ))}
        </div>
    </div>
}

function KidsSection({ opts, kids }: {
    opts: T.TextOptions,
    kids: T.Kid[],
}) {
    return kids.length > 0 ? <div className="text-center mx-1 mr-3" style={{ paddingBottom: "1rem"}}>
        <div className="d-flex flex-row mb-3 justify-content-center">
            {kids.map(kid => (
                <KidDisplay key={Math.random()} opts={opts} kid={kid} />
            ))}
        </div>
        <div><strong>kids</strong></div>
    </div> : null;
}

export default EPBlocksDisplay;