/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// TODO: REMOVING THE EXPLANATION MODAL BC IT'S BUGGY NOW SAYNG "ABOUT ARABIC PLURAL" AND IT'S
// PROB BETTER JUST TO LINK TO THE GRAMMAR

// import { useState } from "react";
// import Pashto from "./Pashto";
// import { Modal } from "react-bootstrap";
import TableCell from "./TableCell";
import * as T from "../../types";
import { isPluralInflections } from "../../lib/src/p-text-helpers";

// const explanation = (inf: T.Inflections | T.PluralInflections, textOptions: T.TextOptions) => {
//     const isPluralInfs = isPluralInflections(inf);
//     const w = "masc" in inf
//         ? inf.masc[0][0]
//         : inf.fem[0][0];
//     return isPluralInfs ? null : <>
//         <p>In Pashto, <strong>nouns, pronouns, and adjectives</strong> get inflected when they are either:</p>
//         <ul>
//             <li>Plural</li>
//             <li>Sandwiched with a preposition/postposition (oblique), or</li>
//             <li>The subject of a transitive past tense verb</li>
//         </ul>
//         <p>Whatever the reason, the inflection looks the same.</p>
//         <h5>Double Inflection</h5>
//         <p>If there are <em>2 reasons</em> to inflect (ie. if a noun is plural <em>and</em> the subject of a transitive past tense verb) then you use the <strong>second inflection</strong>.</p>
//         <h5>Notes:</h5>
//         <p><small>Pronouns don't get inflected for being plural. Instead, they have a seperate plural form.</small></p>
//         <p><small>Not all nouns, pronouns, and adjectives can inflect. But if you're seeing this table here, it means that <Pashto opts={textOptions}>{w}</Pashto> does inflect.</small></p>
//         <p><small>Irregular nouns like پښتون or مېلمه often only take the 1st inflection when they're plural, and not for the other two reasons, depending on dialect. When there are two reasons to inflect, these will always take the double inflection.</small></p>
//         <p><small>For prepositional/postpositional sandwiches of location like په ... کې and په ... باندې the first inflection of nouns (not of adjectives/pronouns) often doesn't happen. The second one always will though.</small></p>
//     </>;
// }

const InflectionTable = ({
  inf,
  textOptions,
  hideTitle,
}: {
  inf: T.Inflections | T.PluralInflections;
  textOptions: T.TextOptions;
  hideTitle?: boolean;
}) => {
  // const [showingExplanation, setShowingExplanation] = useState(false);
  /* istanbul ignore next */ // Insanely can't see the modal to close it
  // const handleCloseExplanation = () => setShowingExplanation(false);
  // const handleShowExplanation = () => setShowingExplanation(true);
  const isPluralInfs = isPluralInflections(inf);
  console.log({ inf });
  return (
    <div className={!hideTitle ? "" : "mt-4"}>
      {!hideTitle && (
        <div
          style={{
            display: "flex",
            justifyContent: !isPluralInfs ? "space-between" : "left",
          }}
        >
          {!isPluralInfs && <h5>Inflections</h5>}
          {/* {!isPluralInfs && <div className="clickable mr-2" onClick={handleShowExplanation} data-testid="help-button">
                    <i className={`fa fa-question-circle`}></i>
                </div>} */}
        </div>
      )}
      <table
        className="table"
        style={{ tableLayout: "fixed", textAlign: "center" }}
      >
        <thead>
          <tr>
            <th scope="col" style={{ width: "3.5rem" }}></th>
            {"masc" in inf && (
              <th
                scope="col"
                style={{
                  maxWidth: "10rem",
                  textAlign: "center",
                  borderLeft: "1px solid #dee2e6",
                  ...("fem" in inf
                    ? {
                        borderRight: "1px solid #dee2e6",
                      }
                    : {}),
                }}
              >
                Masculine
              </th>
            )}
            {"fem" in inf && (
              <th
                scope="col"
                style={{ maxWidth: "10rem", textAlign: "center" }}
              >
                Feminine
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {(!isPluralInfs
            ? ["Plain", "1st", "2nd"]
            : ["Plural", "2nd Inf."]
          ).map((title, i) => (
            <tr key={title}>
              <th scope="row">{title}</th>
              {"masc" in inf && (
                <TableCell
                  item={inf.masc[i]}
                  textOptions={textOptions}
                  colSpan={"fem" in inf && i === 2 ? 2 : 1}
                  center
                />
              )}
              {"fem" in inf && (!("masc" in inf) || i < 2) && (
                <TableCell item={inf.fem[i]} textOptions={textOptions} center />
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {/* {(!hideTitle && !isPluralInfs) && <Modal show={showingExplanation} onHide={handleCloseExplanation}>
                <Modal.Header closeButton>
                <Modal.Title>About {isPluralInfs ? "Inflections" : "Arabic Plural"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{explanation(inf, textOptions)}</Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary clb" onClick={handleCloseExplanation}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>} */}
    </div>
  );
};

export default InflectionTable;
