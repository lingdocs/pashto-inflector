/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useState } from "react";
import Pashto from "./Pashto";
import { Modal } from "react-bootstrap";
import TableCell from "./TableCell";
import * as T from "../types";
import { isPluralInflections } from "../lib/p-text-helpers";

const explanation = (inf: T.Inflections | T.PluralInflections, textOptions: T.TextOptions) => {
    const isPluralInfs = isPluralInflections(inf);
    const w = "masc" in inf
        ? inf.masc[0][0]
        : inf.fem[0][0];
    return !isPluralInfs ? <>
        <p>In Pashto, <strong>nouns, pronouns, and adjectives</strong> get inflected when they are either:</p>
        <ul>
            <li>Plural</li>
            <li>Sandwiched with a preposition/postposition (oblique), or</li>
            <li>The subject of a transitive past tense verb</li>
        </ul>
        <p>Whatever the reason, the inflection looks the same.</p>
        <h5>Double Inflection</h5>
        <p>If there are <em>2 reasons</em> to inflect (ie. if a noun is plural <em>and</em> the subject of a transitive past tense verb) then you use the <strong>second inflection</strong>.</p>
        <h5>Notes:</h5>
        <p><small>Pronouns don't get inflected for being plural. Instead, they have a seperate plural form.</small></p>
        <p><small>Not all nouns, pronouns, and adjectives can inflect. But if you're seeing this table here, it means that <Pashto opts={textOptions}>{w}</Pashto> does inflect.</small></p>
        <p><small>Irregular nouns like پښتون or مېلمه often only take the 1st inflection when they're plural, and not for the other two reasons, depending on dialect. When there are two reasons to inflect, these will always take the double inflection.</small></p>
        <p><small>For prepositional/postpositional sandwiches of location like په ... کې and په ... باندې the first inflection of nouns (not of adjectives/pronouns) often doesn't happen. The second one always will though.</small></p>
    </> : <>
        <p>Many Arabic loan-words can be used with their original Arabic plural form.</p>
        <p>When they need to be inflected a second time because they are: a. sandwiched with a preposition/postposition (oblique) or b. the subject of a transitive past tense verb, you add an و to the as you do with other Pashto verbs.</p>
    </>;
}

const InflectionTable = ({ inf, textOptions }: {
    inf: T.Inflections | T.PluralInflections,
    textOptions: T.TextOptions,
}) => {
    const [showingExplanation, setShowingExplanation] = useState(false);
    /* istanbul ignore next */ // Insanely can't see the modal to close it
    const handleCloseExplanation = () => setShowingExplanation(false);
    const handleShowExplanation = () => setShowingExplanation(true);
    const isPluralInfs = isPluralInflections(inf);
    return (
        <div className="mt-4">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5>
                    {!isPluralInfs ? "Inflections" : "Arabic Plural and 2nd Inflection"}:
                </h5>
                <div className="clickable mr-2" onClick={handleShowExplanation} data-testid="help-button">
                    <i className={`fa fa-question-circle`}></i>
                </div>
            </div>
            <table className="table" style={{ tableLayout: "fixed" }}>
                <thead>
                    <tr>
                        <th scope="col" style={{ width: "3.5rem" }}></th>
                        {"masc" in inf && <th scope="col" style={{ maxWidth: "10rem", textAlign: "left" }}>Masculine</th>}
                        {"fem" in inf && <th scope="col" style={{ maxWidth: "10rem", textAlign: "left" }}>Feminine</th>}
                    </tr>
                </thead>
                <tbody>
                    {!isPluralInfs ? ["Plain", "1st", "2nd"] : ["Plural", "2nd"].map((title, i) => (
                        <tr key={title}>
                            <th scope="row">{title}</th>
                            {"masc" in inf && <TableCell item={inf.masc[i]} textOptions={textOptions} />}
                            {"fem" in inf && <TableCell item={inf.fem[i]} textOptions={textOptions} />}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showingExplanation} onHide={handleCloseExplanation}>
                <Modal.Header closeButton>
                <Modal.Title>About {isPluralInfs ? "Inflections" : "Arabic Plural"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{explanation(inf, textOptions)}</Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary clb" onClick={handleCloseExplanation}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InflectionTable;