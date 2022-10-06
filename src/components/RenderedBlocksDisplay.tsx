import { useState } from "react";
import { filterForVisibleBlocksEP, filterForVisibleBlocksVP } from "../lib/phrase-building/compile";
import * as T from "../types";
import Block from "./blocks/Block";
import KidDisplay from "./blocks/KidDisplay";

function RenderedBlocksDisplay({ opts, rendered, justify, script }: {
    script: "p" | "f",
    opts: T.TextOptions,
    rendered: T.EPRendered | T.VPRendered,
    justify?: "left" | "right" | "center",
}) {
    const [variation, setVariation] = useState<number>(0);
    // not using autoAnimate here because we need a way to persist the keys in the blocks first
    // const parent = useRef(null);
    // useEffect(() => {
    //     parent.current && autoAnimate(parent.current)
    // }, [parent]);
    const blocksWVars = ("omitSubject" in rendered)
        ? filterForVisibleBlocksEP(rendered.blocks, rendered.omitSubject)
        : filterForVisibleBlocksVP(rendered.blocks, rendered.form, rendered.king);
    const king = "king" in rendered ? rendered.king : undefined;
    const blocks = blocksWVars[variation];
    function handleVariationChange() {
        setVariation(ov => ((ov + 1) % blocksWVars.length));
    }
    return <div className={`d-flex flex-row justify-content-${justify ? justify : "center"}`}>
        <div className={`d-flex flex-row${script === "p" ? "-reverse" : ""} justify-content-left align-items-end mt-3 pb-2`} style={{ overflowX: "auto" }}>
            <div key={blocks[0].key} className="mr-2">
                <Block opts={opts} block={blocks[0]} king={king} script={script} />
            </div>
            <KidsSection key="kidsSection" opts={opts} kids={rendered.kids} script={script} />
            {blocks.slice(1).map((block) => (
                <div key={block.key} className="mr-2">
                    <Block opts={opts} block={block} king={king} script={script} />
                </div>
            ))}
            <div style={{ height: "100%" }} className="d-flex flex-column justify-content-center">
                {blocksWVars.length > 1 && <button onClick={handleVariationChange} className="btn btn-light btn-sm mx-2">V. {variation + 1}/{blocksWVars.length}</button>}
            </div>
        </div>
    </div>
}

function KidsSection({ opts, kids, script }: {
    opts: T.TextOptions,
    kids: T.Kid[],
    script: "p" | "f",
}) {
    // not using autoAnimate here because we need a way to persist the keys in the blocks first
    // const parent = useRef(null);
    // useEffect(() => {
    //     parent.current && autoAnimate(parent.current)
    // }, [parent]);
    return kids.length > 0 ? <div className="text-center mx-1 mr-3" style={{ paddingBottom: "1rem"}}>
        <div className={`d-flex flex-row${script === "p" ? "-reverse" : ""} mb-3 justify-content-center`}>
            {kids.map(kid => (
                <KidDisplay key={kid.key} opts={opts} kid={kid} script={script} />
            ))}
        </div>
        <div><strong>kids</strong></div>
    </div> : null;
}

export default RenderedBlocksDisplay;