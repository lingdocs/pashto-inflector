/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    CSSProperties,
    useState,
} from "react";
import {
    pickPersInf,
    hasPersInfs,
    noPersInfs,
} from "../../lib/misc-helpers";
import VerbInfoItemDisplay from "./VerbInfoItemDisplay";
import PersonInfsPicker from "../PersInfsPicker";
import VerbTypeInfo from "./VerbTypeInfo";
import Hider from "../Hider";
import * as T from "../../types";
import fadedTree from "./faded-tree.svg";

// import camera from "../icons/camera-fill";
// import video from "../icons/camera-video-fill";

const indentR = {
    paddingLeft: "1rem",
};

const highlight = {
    background: "rgba(255, 227, 10, 0.6)",
};

const title: CSSProperties = {
    fontWeight: "bolder",
    marginBottom: "0.5rem",
    marginTop: "0.5rem",
};

export function RootsAndStems({ textOptions, info, hidePastParticiple, highlighted }: {
    textOptions: T.TextOptions,
    info: T.NonComboVerbInfo | T.PassiveRootsStems,
    hidePastParticiple?: boolean,
    highlighted?: T.RootsOrStemsToHighlight,
}) {
    const hasPerfectiveSplit = !!(info.root.perfectiveSplit || info.stem.perfectiveSplit);
    const showPersInf = hasPersInfs(info);
    const [persInf, setPersInf] = useState<T.PersonInflectionsField>("mascSing");
    const [split, setSplit] = useState<boolean>(false);
    const perfectiveStem = (info.stem.perfectiveSplit && split)
        ? info.stem.perfectiveSplit
        : info.stem.perfective;
    const perfectiveRoot = (info.root.perfectiveSplit && split)
        ? info.root.perfectiveSplit
        : info.root.perfective;
    const colClass = "col col-md-5 px-0 mb-1";
    const rowClass = "row justify-content-between";
    return (
        <div className="mt-3">
            {showPersInf && <PersonInfsPicker
                persInf={persInf}
                handleChange={(p) => setPersInf(p)}
                transitivity={"transitivity" in info ? info.transitivity : "intransitive"}
            />}
            <div className="verb-info" style={{
                textAlign: "center",
                maxWidth: "500px",
                margin: "0 auto",
                backgroundImage: `url(${fadedTree})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: hidePastParticiple ? "50% 45%" : "50% 35%",
                backgroundSize: "50%",    
            }}>
                {/* <div style={{
                    fontSize: "larger",
                }}>
                    {info.def}
                </div>
                {info.subDef &&
                    <div style={{ fontSize: "smaller", color: "grey" }}>
                        {info.subDef}
                    </div>
                } */}
                <div style={{
                    border: "2px solid black",
                    padding: "1rem",
                    margin: "0.25rem",
                }} className="container">
                    <div className={rowClass + " align-items-center"}>
                        <div className={colClass}>
                            <i className="fas fa-video fa-lg" />
                        </div>
                        <div className={colClass}>
                            <div className="d-flex flex-row justify-content-center align-items-center">
                                <div>
                                    <i className="fas fa-camera fa-lg mx-3" />
                                </div>
                                {hasPerfectiveSplit && <div>
                                    <button
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => setSplit(!split)}
                                    >
                                        {split ? "join" : "split"} head
                                    </button>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className={rowClass}>
                        <div className={colClass} style={highlighted?.includes("imperfective stem") ? highlight : {}}>
                            <div style={title}>
                                <div>Imperfective Stem</div>
                            </div>
                            <div style={indentR}>
                                <VerbInfoItemDisplay
                                    item={pickPersInf(info.stem.imperfective, persInf)}
                                    textOptions={textOptions}
                                    tails
                                />
                            </div>
                        </div>
                        <div className={colClass} style={highlighted?.includes("perfective stem") ? highlight : {}}>
                            <div style={title}>
                                <div>Perfective Stem</div>
                            </div>
                            <div style={indentR}>
                                <VerbInfoItemDisplay
                                    item={pickPersInf(perfectiveStem, persInf)}
                                    textOptions={textOptions}
                                    tails
                                />
                            </div>
                        </div>
                    </div>
                    <div className={rowClass}>
                        <div className={colClass} style={highlighted?.includes("imperfective root") ? highlight : {}}>
                            <div style={title}>
                                <div>Imperfective Root</div>
                            </div>
                            <div style={indentR}>
                                <VerbInfoItemDisplay
                                    item={pickPersInf(info.root.imperfective, persInf)}
                                    textOptions={textOptions}
                                />
                            </div>
                        </div>
                        <div className={colClass} style={highlighted?.includes("perfective root") ? highlight : {}}>
                            <div>
                                <div style={title}>
                                    <div>Perfective Root</div>
                                </div>
                                <div style={indentR}>
                                    <VerbInfoItemDisplay
                                        item={pickPersInf(perfectiveRoot, persInf)}
                                        textOptions={textOptions}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {!hidePastParticiple && <div className="text-center" style={highlighted?.includes("imperfective stem") ? highlight : {}}>
                        <div style={title}>Past Participle</div>
                            <VerbInfoItemDisplay
                                item={pickPersInf(info.participle.past, persInf)}
                                textOptions={textOptions}
                            />
                    </div>}
                </div>
            </div>
        </div>
    );
}

function VerbInfo({ info, textOptions, showingStemsAndRoots, toggleShowingSar, highlightInRootsAndStems, hidePastParticiple, hideTypeInfo }: { 
    info: T.NonComboVerbInfo,
    textOptions: T.TextOptions,
    showingStemsAndRoots: boolean,
    highlightInRootsAndStems?: T.RootsOrStemsToHighlight,
    toggleShowingSar: () => void,
    hidePastParticiple?: boolean,
    hideTypeInfo?: boolean,
}) {
    const inf = noPersInfs(info.root.imperfective).long;
    return (
        <div className="my-3">
            {!hideTypeInfo && <VerbTypeInfo
                info={info}
                textOptions={textOptions}
            />}
            <Hider
                showing={showingStemsAndRoots}
                label={`🌳 Roots and Stems for ${inf.p}`}        
                handleChange={toggleShowingSar}
                hLevel={4}
            >
                <RootsAndStems
                    textOptions={textOptions}
                    info={info}
                    highlighted={highlightInRootsAndStems}
                    hidePastParticiple={hidePastParticiple}
                />
            </Hider>
        </div>
    );
}

export default VerbInfo;