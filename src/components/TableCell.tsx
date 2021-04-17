import { useState, useEffect } from "react";
import * as T from "../types";
import Pashto from "./Pashto";
import Phonetics from "./Phonetics";

const arrowDown = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
</svg>;

function TableCell({ item, textOptions, center, noBorder }: {
    item: T.ArrayOneOrMore<T.PsString>,
    textOptions: T.TextOptions,
    center?: boolean,
    noBorder?: boolean,
}) {
    const [version, setVersion] = useState(0);
    useEffect(() => setVersion(0), [item]);
    function advanceVersion() {
        setVersion((version + 1) % item.length);
    }
    const w = item[version] || item[0];
    return (
        <td style={{ ...noBorder ? { border: "none" } : {} }}>
            <div style={{ 
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: center ? "center" : "space-between",
                alignItems: "center",
            }}>
                <div>
                    <div>
                        <Pashto opts={textOptions}>{w}</Pashto>
                    </div>
                    <div>
                        <Phonetics opts={textOptions}>{w}</Phonetics>
                    </div>
                    {w.e && <div className="text-muted">{w.e}</div>}
                </div>
                {item.length > 1 &&
                    <button className="btn btn-sm btn-light mx-2 my-2" onClick={advanceVersion}>
                        ver. {version + 1}/{item.length} {arrowDown}
                    </button>
                }
            </div>
        </td>
    );
}

export default TableCell;