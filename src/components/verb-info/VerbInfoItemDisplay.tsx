/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect, useState } from "react";
import ButtonSelect from "../ButtonSelect";
import Pashto from "../Pashto";
import Phonetics from "../Phonetics";
import * as T from "../../types";
import { concatPsString } from "../../lib/p-text-helpers";

type InputItem = T.SingleOrLengthOpts<T.PsString | [T.PsString, T.PsString]>;

function VerbInfoItemDisplay({ item, textOptions, tails }: {
    item: InputItem,
    textOptions: T.TextOptions,
    tails?: boolean,
}) {
    const [length, setLength] = useState<T.Length>("long");
    const getL = (x: InputItem): T.PsString | [T.PsString, T.PsString] => (
        "long" in x
            ? x[length] || x.short
            : x
    );
    useEffect(() => {
        setLength(l => (l === "mini" && !("mini" in item)) ? "short" : l);
    }, [item]);
    // const lengthsAvailable = "long" in item
    //     ? [...["long", "short"], ..."mini" in item ? ["mini"] : []] 
    //     : [];
    const text = getL(item);

    function addTails(text: T.PsString): T.PsString {
        return concatPsString(text, { p: "ـ", f: "–"});
    }
    return <>
        {Array.isArray(text) ?
            <div>
                <div className="text-center" dir="rtl">
                    <Pashto opts={textOptions}>{text[0]}</Pashto>
                    <span className="mx-1"> __ </span>
                    <Pashto opts={textOptions}>{tails ? addTails(text[1]) : text[1]}</Pashto>
                </div>
                <div className="text-center">
                    <Phonetics opts={textOptions}>{text[0]}</Phonetics>
                    <span className="mx-1"> __ </span>
                    <Phonetics opts={textOptions}>{tails ? addTails(text[1]) : text[1]}</Phonetics>
                </div>
            </div>
        :
            <div>
                <div className="text-center">
                    <Pashto opts={textOptions}>{tails ? addTails(text) : text}</Pashto>
                </div>
                <div className="text-center">
                    <Phonetics opts={textOptions}>{tails ? addTails(text) : text}</Phonetics>
                </div>
            </div>
        }
        {"long" in item && <div className="mt-2 text-center">
            <ButtonSelect
                xSmall
                options={[
                    { label: "Long", value: "long" },
                    { label: "Short", value: "short" },
                    ..."mini" in item ? [{
                        label: "Mini", value: "mini",
                    }] : [],
                ]}
                value={length}
                handleChange={(p) => setLength(p as T.Length)}
            />
        </div>}
    </>;
}

export default VerbInfoItemDisplay;