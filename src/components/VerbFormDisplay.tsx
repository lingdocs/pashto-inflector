/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect, useState } from "react";
import PersonInfsPicker from "./PersInfsPicker";
import InflectionsTable from "./InflectionsTable";
import SingleItemDisplay from "./SingleItemDisplay";
import ButtonSelect from "./ButtonSelect";
import VerbTable from "./VerbTable";
import {
    getEnglishPersonInfo,
    isSentenceForm,
} from "../lib/misc-helpers";
import {
    isAllOne,
} from "../lib/p-text-helpers";
import * as T from "../types";

function agreementInfo(info: T.NonComboVerbInfo, displayForm: T.DisplayForm): React.ReactNode {
    if (!displayForm.past) {
        return null;
    }
    const beginning = "Verb agrees with the ";
    const agreesWith = (info.transitivity !== "intransitive" && displayForm.past && !displayForm.passive)
        ? "object"
        : "subject";
    const extraExplanation = (!displayForm.past)
        ? ""
        : (info.transitivity === "grammatically transitive")
        ? " which is an unwritten 3rd pers. masc. object."
        : (info.type === "generative stative compound" || info.type === "dynamic compound")
        ? ` which is the complement ${info.objComplement.plural ? info.objComplement.plural.p : info.objComplement.entry.p} (${getEnglishPersonInfo(info.objComplement.person)})`
        : ""
    return <><strong>Note:</strong> {beginning}<strong>{agreesWith}</strong>{extraExplanation}</>
}

function VerbFormDisplay({ displayForm, textOptions, info, showingFormInfo, english, shortDefault }: {
    displayForm: T.DisplayForm | T.VerbForm | T.ImperativeForm,
    english?: T.EnglishBlock | string,
    textOptions: T.TextOptions,
    showingFormInfo: boolean,
    info?: T.NonComboVerbInfo,
    shortDefault?: boolean,
}) {
    const defaultLength = shortDefault ? "short" : "long";
    const [persInf, setPersInf] = useState<T.PersonInflectionsField>("mascSing");
    const [length, setLength] = useState<T.Length>(defaultLength);
    const [showingExplanation, setShowingExplanation] = useState<boolean>(false);
    const block = "label" in displayForm ? displayForm.form : displayForm;
    const chosenPersInf = "mascSing" in block
        ? block[persInf] 
        : block;
    const form = "long" in chosenPersInf
        ? chosenPersInf[length] || chosenPersInf.short
        : chosenPersInf;
    useEffect(() => {
        if (length === "mini" && !("mini" in chosenPersInf)) {
            setLength(defaultLength);
        } 
        // setPersInf("mascSing");
        // setShowingExplanation(false);
    }, [block, length, chosenPersInf, defaultLength]);
    // TODO: This could be handled better to avoid the react-hooks/exhaustive-deps warning ?
    useEffect(() => {
        setShowingExplanation(false);
    }, [block]);
    const hasVariations = (!("masc" in form)) && (!("p" in form)) && (!isSentenceForm(form)) && !isAllOne(form as T.VerbBlock | T.ImperativeBlock);
    return <>
        {(("label" in displayForm && info) && showingFormInfo) && <>
            {(hasVariations || displayForm.past) && <p className="small text-muted">
                {agreementInfo(info, displayForm)}
            </p>}
            <div className="mb-1 d-flex justify-content-between align-items-center">
                <samp>Formula: {displayForm.formula}</samp>
                <button className="btn btn-sm btn-outline-secondary text-nowrap ml-2" onClick={() => setShowingExplanation(!showingExplanation)}>
                    <i className={`fas fa-caret-${showingExplanation ? "down" : "right"}`} /> Meaning 
                </button>
            </div>
            {showingExplanation && <div className="my-2">
                {displayForm.explanation}
            </div>}
        </>}
        {"long" in chosenPersInf &&
            <div className="text-center">
                <ButtonSelect
                    small
                    options={[
                        { label: "Long", value: "long" },
                        { label: "Short", value: "short" },
                        ..."mini" in chosenPersInf ? [{
                            label: "Mini", value: "mini",
                        }] : [],
                    ]}
                    value={length}
                    handleChange={(p) => setLength(p as T.Length)}
                />
            </div>
        }
        {("mascSing" in block && info) && <PersonInfsPicker 
            persInf={persInf}
            handleChange={(p) => setPersInf(p)}
            transitivity={info.transitivity}
        />}
        {"masc" in form ?
            <InflectionsTable inf={form} textOptions={textOptions} />
        : "p" in form ?
            <SingleItemDisplay item={form} english={english} textOptions={textOptions} />
        :
            <VerbTable block={form} english={english} textOptions={textOptions} />
        }
    </>
}

export default VerbFormDisplay;
