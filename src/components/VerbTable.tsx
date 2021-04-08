/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useState, useEffect } from "react";
import Pashto from "./Pashto";
import Phonetics from "./Phonetics";
import {
    psStringEquals,
    isAllOne,
    addEnglish,
} from "../lib/p-text-helpers";
import { isSentenceForm } from "../lib/misc-helpers";
import * as T from "../types";

const arrowDown = <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-caret-down" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
</svg>;

const genderAbbrev = (gender: "masc" | "fem" | undefined): " m." | " f." | "" => (
    gender === "masc"
        ? " m."
        : gender === "fem"
        ? " f."
        : ""
);

const minifyTableGender = (block: T.VerbBlock | T.ImperativeBlock): Array<T.PersonLine | {
    masc: T.PersonLine,
    fem: T.PersonLine,
}> => {
    // @ts-ignore
    return block.reduce((table, person, i, src) => {
        const isFem = i % 2 !== 0;
        if (isFem) {
            return table;
        }
        const femPersAhead = src[i+1];
        const femPersIsTheSame = (
            psStringEquals(person[0][0], femPersAhead[0][0]) &&
            psStringEquals(person[1][0], femPersAhead[1][0])
        );
        if (femPersAhead && !femPersIsTheSame) {
            return [...table, {
                masc: person,
                fem: femPersAhead,
            }];
        }
        return [...table, person];
    }, []);
};

function Cell({ item, textOptions, center, noBorder }: {
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
        <td style={noBorder ? { border: "none" } : {}}>
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
                    <button className="btn btn-sm btn-light mx-2" onClick={advanceVersion}>
                        ver. {version + 1}/{item.length} {arrowDown}
                    </button>
                }
            </div>
        </td>
    );
}

function VerbTable({ block, textOptions, english }: {
    block: T.VerbBlock | T.ImperativeBlock | T.ArrayOneOrMore<T.PsString>,
    english?: T.EnglishBlock | string,
    textOptions: T.TextOptions,
}) {
    const blockWEng = english ? addEnglish(english, block) : block;
    if (isSentenceForm(blockWEng) || isAllOne(blockWEng as T.VerbBlock | T.ImperativeBlock)) {
        const item = isSentenceForm(blockWEng)
            ? block as unknown as T.ArrayOneOrMore<T.PsString>
            : (() => {
                const b = block as T.ImperativeBlock | T.VerbBlock
                return b[0][0];
            })();
        return <table className="table text-center">
            <tbody>
                <tr>
                    <Cell item={item} textOptions={textOptions} center noBorder />
                </tr>
            </tbody>
        </table>
    }
    const bl = blockWEng as T.VerbBlock | T.ImperativeBlock;
    const b = minifyTableGender(bl);
    return <table className="table mt-2" style={{ tableLayout: "fixed" }}>
        <thead>
            <tr>
                <th scope="col" style={{ width: "3rem" }}>Pers.</th>
                <th scope="col">Singular</th>
                <th scope="col">Plural</th>
            </tr>
        </thead>
        <tbody>
            {b.reduce((rows: React.ReactNode[], person, i, arr) => {
                function drawRow({ line, gender }: { line: T.PersonLine, gender?: "masc" | "fem" }) {
                    const pers = arr.length > 1 ? ["1st", "2nd", "3rd"] : ["2nd"];
                    const rowLabel = `${pers[i]}${genderAbbrev(gender)}`;
                    const color = !gender
                        ? "inherit"
                        : gender === "masc"
                        ? "#78c8ed"
                        : "#ff99aa";
                    
                    return (
                        <tr key={`${i}${gender}`}>
                            <th scope="row" style={{ color }}>{rowLabel}</th>
                            <Cell item={line[0]} textOptions={textOptions} />
                            <Cell item={line[1]} textOptions={textOptions} />
                        </tr>
                    );
                }
                return "masc" in person
                    ? [
                        ...rows,
                        drawRow({ line: person.masc, gender: "masc" }),
                        drawRow({ line: person.fem, gender: "fem" }),
                    ]
                    : [...rows, drawRow({ line: person })];
            }, [])}
        </tbody>
    </table>
}

export default VerbTable;