import { Modal } from "react-bootstrap";
import structureDiagram from "./vp-structure.svg";

export const roleIcon = {
    king: <i className="mx-1 fas fa-crown" />,
    servant: <i className="mx-1 fas fa-male" />,
};

function VPExplorerExplanationModal({ showing, setShowing }: {
    showing: { role: "servant" | "king", item: "subject" | "object" } | false,
    setShowing: (s: { role: "servant" | "king", item: "subject" | "object" } | false) => void,   
}) {
    if (!showing) return null;
    return <>
        <Modal show={!!showing} onHide={() => setShowing(false)}>
            <Modal.Header closeButton>
                <Modal.Title>About the {showing.role === "king"
                    ? <span>King {roleIcon.king}</span>
                    : <span>Servant {roleIcon.servant}</span>}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>In this tense/form, the {showing.item} is the <strong>{showing.role}</strong> {roleIcon[showing.role]} of the phrase.</p>
                <p>That means that:</p>
                {showing.role === "king"
                    ? <ul className="mt-2">
                        <li>
                            <div>It <strong>controls the verb conjugation</strong>. The verb agrees with the gender and number of the king.</div>
                        </li>
                        <li>
                            <div>It can be removed / left out from the phrase.</div>
                            <div className="text-muted">(You can <strong>kill the king</strong>)</div>
                        </li>
                    </ul>
                    : <ul>
                        <li>
                            <div>It can shrink it into a <a target="_blank" rel="noreferrer" href="https://grammar.lingdocs.com/pronouns/pronouns-mini/">mini-pronoun</a>.</div>
                            <div className="text-muted">(You can <strong>shrink the servant</strong>)</div>
                        </li>
                    </ul>
                }
                <h4>Mnemonic for shortening phrases:</h4>
                <p className="text-muted lead">"🚫 Kill the king 👶 Shrink the servant"</p>
                <h4 className="mb-3">Verb Phrase Structure</h4>
                <img className="img-fluid" alt="Pashto verb phrase structure diagram" src={structureDiagram} />
            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-primary clb" onClick={() => setShowing(false)}>
                    Close
                </button>
            </Modal.Footer>
        </Modal>
    </>;
}

export default VPExplorerExplanationModal;