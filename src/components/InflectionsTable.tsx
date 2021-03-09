/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useState } from "react";
import Pashto from "./Pashto";
import Phonetics from "./Phonetics";
import { Modal } from "react-bootstrap";
import * as T from "../types";

const explanation = (inf: T.Inflections, textOptions: T.TextOptions) => {
    // @ts-ignore
    const w = inf["masc" in inf ? "masc" : "fem"][0][0];
    return <>
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
    </>
}

const InflectionTable = ({ inf, textOptions }: {
    inf: T.Inflections,
    textOptions: T.TextOptions,
}) => {
    const [showingExplanation, setShowingExplanation] = useState(false);
    /* istanbul ignore next */ // Insanely can't see the modal to close it
    const handleCloseExplanation = () => setShowingExplanation(false);
    const handleShowExplanation = () => setShowingExplanation(true);
    return (
        <div className="mt-4">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h5>Inflections:</h5>
                <div className="clickable mr-2" onClick={handleShowExplanation} data-testid="help-button">
                    <i className={`fa fa-question-circle`}></i>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        {"masc" in inf && <th>Masculine</th>}
                        {"fem" in inf && <th>Feminine</th>}
                    </tr>
                </thead>
                <tbody>
                    {["Plain", "1st", "2nd"].map((title, i) => (
                        <tr key={title}>
                            <th scope="row" className="thin-column">{title}</th>
                            {"masc" in inf && <td>
                                {inf.masc[i].map((w, j) => (
                                    <div key={`${i}-${j}-inflection-result`}>
                                        <div>
                                            <Pashto opts={textOptions}>
                                                {w}
                                            </Pashto>
                                        </div>
                                        <div>
                                            <Phonetics opts={textOptions}>
                                                {w}
                                            </Phonetics>
                                        </div>
                                    </div>
                                ))}
                            </td>}
                            {"fem" in inf && <td>
                                {inf.fem[i].map((w, j) => (
                                    <div key={`${i}-${j}-inflection-result`}>
                                        <div>
                                            <Pashto opts={textOptions}>
                                                {w}
                                            </Pashto>
                                        </div>
                                        <div>
                                            <Phonetics opts={textOptions}>
                                                {w}
                                            </Phonetics>
                                        </div>
                                    </div>
                                ))}
                            </td>}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={showingExplanation} onHide={handleCloseExplanation}>
                <Modal.Header closeButton>
                <Modal.Title>About Inflections</Modal.Title>
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