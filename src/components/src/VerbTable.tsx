/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import TableCell from "./TableCell";
import {
    psStringEquals,
    isAllOne,
    addEnglish,
} from "../../lib/src/p-text-helpers";
import { isSentenceForm } from "../../lib/src/misc-helpers";
import * as T from "../../types";
import genderColors from "./gender-colors";

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
                    <TableCell item={item} textOptions={textOptions} center noBorder />
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
                        : genderColors[gender];
                    return (
                        <tr key={`${i}${gender}`}>
                            <th scope="row" style={{ color }}>{rowLabel}</th>
                            <TableCell item={line[0]} textOptions={textOptions} />
                            <TableCell item={line[1]} textOptions={textOptions} />
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