import NPPicker, { shrunkenBackground } from "../np-picker/NPPicker";
import TensePicker from "./TensePicker";
import * as T from "../../types";
import { useEffect, useRef, useState } from "react";
import { getKingAndServant, renderVP } from "../../lib/phrase-building/render-vp";
import { completeVPSelection, isPastTense } from "../../lib/phrase-building/vp-tools";
import VPExplorerExplanationModal, { roleIcon } from "./VPExplorerExplanationModal";
import { vpsReducer, VpsReducerAction } from "./vps-reducer";
import APPicker from "../ap-picker/APPicker";
import autoAnimate from "@formkit/auto-animate";
import { getObjectSelection, getSubjectSelection, includesShrunkenServant, isNoObject } from "../../lib/phrase-building/blocks-utils";

function VPPicker({ opts, vps, onChange, entryFeeder }: {
    opts: T.TextOptions,
    vps: T.VPSelectionState,
    onChange: (eps: T.VPSelectionState) => void,
    entryFeeder: T.EntryFeeder,
}) {
    const parent = useRef<HTMLDivElement>(null);
    useEffect(() => {
        parent.current && autoAnimate(parent.current);
    }, [parent]);
    const [showingExplanation, setShowingExplanation] = useState<{ role: "servant" | "king", item: "subject" | "object" } | false>(false);
    const [alert, setAlert] = useState<string | undefined>(undefined);
    function flashMessage(msg: string) {
        setAlert(msg);
        setTimeout(() => {
            setAlert(undefined);
        }, 1500);
    }
    function adjustVps(action: VpsReducerAction) {
        const newVps = vpsReducer(vps, action, flashMessage);
        onChange(newVps);
    }
    function handleSubjectChange(subject: T.NPSelection | undefined, skipPronounConflictCheck?: boolean) {
        adjustVps({
            type: "set subject",
            payload: { subject, skipPronounConflictCheck },
        });
    }
    function handleObjectChange(object: T.NPSelection | undefined) {
        adjustVps({
            type: "set object",
            payload: object,
        });
    }
    const object = getObjectSelection(vps.blocks).selection;
    const subject = getSubjectSelection(vps.blocks).selection;
    const VPS = completeVPSelection(vps);
    const phraseIsComplete = !!VPS;
    const rendered = VPS ? renderVP(VPS) : undefined;
    const servantIsShrunk = includesShrunkenServant(rendered?.kids);
    const isPast = isPastTense(vps.verb.tenseCategory === "perfect" ? vps.verb.perfectTense : vps.verb.verbTense);
    const roles = getKingAndServant(
        isPast,
        vps.verb.transitivity !== "intransitive",
    );
    return <div>
        <div className="clickable h5" onClick={() => adjustVps({ type: "insert new AP" })}>+ AP</div>
        <div ref={parent} className="d-flex flex-row justify-content-around flex-wrap" style={{ marginLeft: "-0.5rem", marginRight: "-0.5rem" }}>
            {vps.blocks.map(({ block, key }, i, blocks) => {
                if (isNoObject(block)) return null;
                return <div className="my-2 card block-card p-1 mx-1" key={key} style={{
                    background: (servantIsShrunk && (
                        (roles.servant === "subject" && block?.type === "subjectSelection")
                        ||
                        (roles.servant === "object" && block?.type === "objectSelection")
                    )) ? shrunkenBackground : "inherit",
                }}>
                    <div className="d-flex flex-row justify-content-between mb-1" style={{ height: "1rem" }}>
                        {(i > 0 && !isNoObject(blocks[i - 1].block)) ? <div
                            className="small clickable ml-1"
                            onClick={() => adjustVps({ type: "shift block", payload: { index: i, direction: "back" }})}
                        >
                            <i className="fas fa-chevron-left" />
                        </div> : <div/>}
                        {(i < vps.blocks.length - 1 && !isNoObject(blocks[i + 1].block)) ? <div
                            className="small clickable mr-1"
                            onClick={() => adjustVps({ type: "shift block", payload: { index: i, direction: "forward" }})}
                        >
                            <i className="fas fa-chevron-right" />
                        </div> : <div/>}
                    </div>
                    {(!block || block.type === "AP")
                        ? <APPicker
                            phraseIsComplete={phraseIsComplete}
                            heading="AP"
                            entryFeeder={entryFeeder}
                            AP={block}
                            opts={opts}
                            onChange={AP => adjustVps({ type: "set AP", payload: { index: i, AP } })}
                            onRemove={() => adjustVps({ type: "remove AP", payload: i })}
                        />
                        : (block?.type === "subjectSelection")
                        ? <NPPicker
                            phraseIsComplete={phraseIsComplete}
                            heading={roles.king === "subject" 
                            ? <div className="h5 text-center" onClick={() => setShowingExplanation({ role: "king", item: "subject" })}>Subject {roleIcon.king}</div>
                            : <div className="h5 text-center">
                                Subject
                                {` `}
                                <span className="clickable" onClick={() => setShowingExplanation({ role: "servant", item: "subject" })}>{roleIcon.servant}</span>
                                {` `}
                                {(rendered && rendered.whatsAdjustable !== "king") && 
                                    <span onClick={() => adjustVps({ type: "toggle servant shrink" })} className="mx-2 clickable">
                                        {!servantIsShrunk ? "🪄" : "👶"}
                                    </span>
                                }
                            </div>}
                            entryFeeder={entryFeeder}
                            np={block.selection}
                            counterPart={vps.verb ? object : undefined}
                            role={(isPast && vps.verb.transitivity !== "intransitive")
                                ? "ergative"
                                : "subject"
                            }
                            onChange={handleSubjectChange}
                            opts={opts}
                            isShrunk={(servantIsShrunk && roles.servant === "subject")}
                        />
                        : (vps.verb && block?.type === "objectSelection" && block.selection !== "none")
                        ? <div className="my-2" style={{ background: (servantIsShrunk && roles.servant === "object") ? shrunkenBackground : "inherit" }}>
                            {(typeof block.selection === "number")
                                ? <div>
                                    {roles.king === "object" 
                                        ? <div className="h5 text-center clickable" onClick={() => setShowingExplanation({ role: "king", item: "object" })}>Object {roleIcon.king}</div>
                                        : <div className="h5 text-center">Object</div>}
                                    <div className="text-muted">Unspoken 3rd Pers. Masc. Plur.</div>
                                </div>
                                : <NPPicker
                                    phraseIsComplete={phraseIsComplete}
                                    heading={roles.king === "object" 
                                        ? <div className="h5 text-center clickable" onClick={() => setShowingExplanation({ role: "king", item: "object" })}>Object {roleIcon.king}</div>
                                        : <div className="h5 text-center">
                                            Object
                                            {` `}
                                            <span className="clickable" onClick={() => setShowingExplanation({ role: "servant", item: "object" })}>{roleIcon.servant}</span>
                                            {` `}
                                            {(rendered && rendered.whatsAdjustable !== "king") && 
                                                <span onClick={() => adjustVps({ type: "toggle servant shrink" })} className="mx-2 clickable">
                                                    {!servantIsShrunk ? "🪄" : "👶"}
                                                </span>
                                            }
                                        </div>}
                                    entryFeeder={entryFeeder}
                                    role="object"
                                    np={block.selection}
                                    counterPart={subject}
                                    onChange={handleObjectChange}
                                    opts={opts}
                                    isShrunk={(servantIsShrunk && roles.servant === "object")}
                                />}
                        </div>
                        : null}
                </div>;
            })}
            <div className="my-2">
                <TensePicker
                    vps={vps}
                    onChange={adjustVps}
                    mode="phrases"
                />
            </div>
        </div>
        <VPExplorerExplanationModal
            showing={showingExplanation}
            setShowing={setShowingExplanation}
        />
        {alert && <div className="alert alert-warning text-center" role="alert" style={{
            position: "fixed",
            top: "30%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 9999999999999,
        }}>
            {alert}
        </div>}
    </div>;
}

export default VPPicker;