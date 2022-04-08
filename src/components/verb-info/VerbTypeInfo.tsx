/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useState } from "react";
import InlinePs from "../InlinePs";
import Pashto from "../Pashto";
import Phonetics from "../Phonetics";
import {
    makePsString,
} from "../../lib/accent-and-ps-utils";
import { Modal } from "react-bootstrap";
import stativeCompTrans from "./stative-compound-transitive.svg";
import stativeCompIntrans from "./stative-compound-intransitive.svg";
import dynamicCompTrans from "./dynamic-compound-transitive.svg";
import dynamicCompIntrans from "./dynamic-compound-intransitive.svg";
import generativeStatCompTrans from "./generative-stative-compound-transitive.svg";
import generativeStatCompIntrans from "./generative-stative-compound-intransitive.svg";
import intransitiveDiagram from "./intransitive.svg";
import transitiveDiagramPresent from "./transitive-present.svg";
import transitiveDiagramPast from "./transitive-past.svg";
import gramTransitiveDiagramPresent from "./grammatically-transitive-present.svg";
import gramTransitiveDiagramPast from "./grammatically-transitive-past.svg";
import * as T from "../../types";

function CompoundFormula({ a, b }: {
    a: React.ReactNode,
    b: React.ReactNode,
}) {
    return (
        <div className="row align-items-center mb-3">
            <div className="col-5 text-center">
                {a}
            </div>
            <div className="col-2 text-center" style={{ fontSize: "2.5rem" }}>
                <strong>+</strong>
            </div>
            <div className="col-5 text-center">
                {b}
            </div>
        </div>
    );
}

function ExplanationImage({ src, alt }: {
    src: any,
    alt?: string,
}) {
    return (
        <img
            src={src}
            alt={alt}
            className="mx-auto d-block mb-2"
            style={{ maxWidth: "100%" }}
        /> 
    );
}

const typeInfo = (
    type: string,
    opts: T.TextOptions,
) => {
    return type === "simple"
    ? <>
        <p>A <strong>simple verb</strong> is a verb that is just one piece. It can't be broken down into different words with different meanings, like compound verbs can.</p>
    </>
    : type === "stative compound"
    ? <>
        <p>A <strong>stative compound</strong> talks about <strong>something changing from one state to another</strong>.</p>
        <CompoundFormula
            a={<>
                <div style={{ fontSize: "larger" }}>
                    <strong>Complement</strong>
                </div>
                <div>Adjective, Noun, or Adverb</div>
            </>}
            b={<>
                <div style={{ fontSize: "larger" }}>
                    <strong>Aux. Verb</strong>
                </div>
                <div>
                    <div className="small text-muted">With transitive:</div>
                    <div><InlinePs opts={opts}>{{ p: "کول", f: "kawul" }}</InlinePs> (to make)</div>
                    <div className="small text-muted">With intransitive:</div>
                    <div><InlinePs opts={opts}>{{ p: "کېدل", f: "kedul" }}</InlinePs> (to become)</div>
                </div>
            </>}
        />
        <h4>Transitive stative compounds</h4>
        <ExplanationImage src={stativeCompTrans} />
        <h4>Intransitive stative compounds</h4>
        <ExplanationImage src={stativeCompIntrans} />
        <p>It's important to remember that the aux. verbs used for these compounds <InlinePs opts={opts}>{{ p: "کول", f: "kawul" }}</InlinePs> (to make) and <InlinePs opts={opts}>{{ p: "کېدل", f: "kedul" }}</InlinePs> (to become) will never, ever take a <InlinePs opts={opts}>{{ p: "و", f: "oo" }}</InlinePs> prefix. 🚫</p>
        <h5>A couple of other notes:</h5>
        <p>In the imperfective aspect, the complement and aux. verb are often fused together. For example: <InlinePs opts={opts}>{{ p: "پوخ", f: "pokh" }}</InlinePs> + <InlinePs opts={opts}>{{ p: "کول", f: "kawul" }}</InlinePs> = <InlinePs opts={opts}>{{ p: "بخول", f: "pakhawul" }}</InlinePs>. But they always stay broken apart in the perfective aspect.</p>
        <p>When complements are nouns or adverbs, they act (and carry a meaning) almost as if they were adjectives.</p>
    </>
    : type === "dynamic compound"
    ? <>
        <p>A <strong>dynamic compound</strong> talks about <strong>some action being done</strong>.</p>
        <CompoundFormula 
            a={<>
                <div style={{ fontSize: "larger" }}>
                    <strong>Complement</strong>
                </div>
                <div>Noun (action or activity)</div>
            </>}
            b={<>
                <div style={{ fontSize: "larger" }}>
                    <strong>Aux. Verb</strong>
                </div>
            </>}
        />
        <h4>Transitive Dynamic Compounds</h4>
        <p>These talk about someone doing an action or activity.</p>
        <ExplanationImage src={dynamicCompTrans} />
        <p>There is a subject/agent doing the action, and <em>the action or activity is the object of the sentence</em>. It's important to remember that with these compounds, the object of the sentence is included inside the compound, and you can't have any other object in the sentence.</p>
        <h4>Intransitive Dynamic Compounds</h4>
        <p>These talk about an action or activity happening.</p>
        <ExplanationImage src={dynamicCompIntrans} />
        <p>Here the complement, the activity included in the compound, is the subject of the sentence.</p>
        <h6>Other notes:</h6>
        <p>Dynamic compounds made with <InlinePs opts={opts}>{{ p: "کول", f: "kawul" }}</InlinePs> (to do) will also have an intransitive version made with <InlinePs opts={opts}>{{ p: "کېدل", f: "kedul" }}</InlinePs> (to happen).</p>
        <p>Dynamic compounds made with <InlinePs opts={opts}>{{ p: "کول", f: "kawul" }}</InlinePs> (to do) or <InlinePs opts={opts}>{{ p: "کېدل", f: "kedul" }}</InlinePs> (to happen) will <em>always</em> take a <InlinePs opts={opts}>{{ p: "و", f: "oo" }}</InlinePs> prefix in the perfective aspect.</p>
    </>
    : type === "generative stative compound"
    ? <>
        <p><strong>Generative stative compounds</strong> are strange compounds that seem to behave like a cross between a stative compound and a dynamic compound.</p>
        <ul>
            <li>The object is included in the compound... like with dynamic compounds</li>
            <li>But they also use <InlinePs opts={opts}>{{ p: "کول", f: "kawul" }}</InlinePs> (to make), the verb that never gets the <InlinePs opts={opts}>{{ p: "و", f: "oo" }}</InlinePs> prefix... like with stative compounds</li>
        </ul>
        <p>This may seem quite confusing at first.</p>
        <p>We can think of these verbs as <strong>stative compounds</strong> but <strong>with an implied complement</strong> meaning something like "existing." So they talk about some thing being created or brought out into existence.</p>
        <h4>Transitive Generative Stative Compounds</h4>
        <ExplanationImage src={generativeStatCompTrans} />
        <h4>Intransitive Generative Stative Compounds</h4>
        <ExplanationImage src={generativeStatCompIntrans} />
    </>
    : null;
};

const transitivityInfo = (
    type: string,
    textOptions: T.TextOptions,
) => {
    return type === "transitive"
    ? <>
        <p><strong>Transitive</strong> verbs are <strong>verbs that take an object</strong>.</p>
        <p>Transitive verbs are especially difficult because <strong>they work totally differently in the past tense</strong>. (They are ergative in the past tense only.) This takes a lot of hard work for the learner to get used to!</p>
        <h4>In all non-past forms</h4>
        <ul>
            <li>The subject is not inflected</li>
            <li>The object is not inflected, or it can alse be an enclitic (mini) pronoun (exception: the object is inflected when it's a 1st or 2nd person pronoun)</li>
            <li>The verb agrees with the <strong>subject</strong></li>
        </ul>
        <ExplanationImage src={transitiveDiagramPresent} />
        <h4>In the past tense</h4>
        <ul>
            <li>The subject is inflected, or it can be an enclitic (mini) pronoun</li>
            <li>The object is not inflected</li>
            <li>The verb agrees with the <strong>object</strong></li>
        </ul>
        <ExplanationImage src={transitiveDiagramPast} />
    </>
    : type === "intransitive"
    ? <>
        <p><strong>Intransitive</strong> verbs are <strong>verbs that don't take an object</strong>. They only take a subject, which is a person or thing that experiences the action of the verb.</p>
        <p>- The subject is always a <em>uninflected/plain</em> noun or pronoun.</p>
        <p>- The verb always agrees with the subject.</p>
        <ExplanationImage src={intransitiveDiagram} />
    </>
    : type === "grammatically transitive"
    ? <>
        <p><strong>Gramatically transitive</strong> verbs are <strong>verbs that don't appear to have an object, but actually work as if they do</strong>!</p>
        <p>These work just like transitive verbs, except that the object is an implied (unspoken) 3rd person masculine plural entity.</p>
        <h4>In all non-past forms</h4>
        <ExplanationImage src={gramTransitiveDiagramPresent} />
        <h4>In the past tense</h4>
        <ExplanationImage src={gramTransitiveDiagramPast} />
    </>
    : null;
}

function CompoundBreakdown({ info, textOptions }: {
    info: T.NonComboVerbInfo,
    textOptions: T.TextOptions,
}) {
    const isComplement = ("complement" in info || "objComplement" in info);
    if (!isComplement) {
        return null;
    }
    const complement = ((): T.PsString => {
        if ("objComplement" in info) {
            return info.objComplement.plural
                ? info.objComplement.plural
                : makePsString(info.objComplement.entry.p, info.objComplement.entry.f)
        }
        if ("complement" in info) {
            return info.complement.masc[0][0];
        }
        else return makePsString("aa", "aa");
    })();
    const aux = ((): { ps: T.PsString, e: string } => {
        if (info.type === "stative compound" || info.type === "generative stative compound") {
            return info.transitivity === "transitive"
                ? { ps: { p: "کول", f: "kawul" }, e: "to make"}
                : { ps: { p: "کېدل", f: "kedul" }, e: "to become"};
        }
        if (!("auxVerb" in info)) return { ps: {p: "", f: ""}, e: ""};
        const kawulDyn = info.type === "dynamic compound" && info.auxVerb.p === "کول";
        return {
            ps: makePsString(info.auxVerb.p, info.auxVerb.f),
            e: kawulDyn ? "to do" : "",
        }
    })();
    return (
        <div className="d-block mx-auto my-3" style={{ maxWidth: "400px" }}>
            <CompoundFormula
                a={<div className="compound-breakdown">
                    <div>
                        <Pashto opts={textOptions}>{complement}</Pashto>
                    </div>
                    <div>
                        <Phonetics opts={textOptions}>{complement}</Phonetics>
                    </div>
                </div>}
                b={<div className="compound-breakdown">
                    <div>
                        <Pashto opts={textOptions}>{aux.ps}</Pashto>
                    </div>
                    <div>
                        <Phonetics opts={textOptions}>{aux.ps}</Phonetics>
                    </div>
                    {aux.e && <div>{aux.e}</div>}
                </div>}
            />
        </div>
    );
}

function VerbTypeInfo({ info, textOptions }: {
    info: T.NonComboVerbInfo,
    textOptions: T.TextOptions,
}) {
    const [showingTypeModal, setShowingTypeModal] = useState<boolean>(false);
    const [showingTransModal, setShowingTransModal] = useState<boolean>(false);
    return (
        <div>
            <div className="text-center my-2">
                This is a 
                    <button
                        className="btn btn-sm btn-light mx-2 my-1"
                        onClick={() => setShowingTypeModal(true)}
                    >
                        <strong>{info.type}</strong>
                    </button>
                    verb and it's
                    <button
                        className="btn btn-sm btn-light mx-2 my-1"
                        onClick={() => setShowingTransModal(true)}
                    >
                        <strong>{info.transitivity}</strong>
                    </button>
            </div>
            <CompoundBreakdown info={info} textOptions={textOptions} />
            <Modal show={showingTypeModal} onHide={() => setShowingTypeModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>About {info.type} verbs</Modal.Title>
                </Modal.Header>
                <Modal.Body>{typeInfo(info.type, textOptions)}</Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary clb" onClick={() => setShowingTypeModal(false)}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
            <Modal show={showingTransModal} onHide={() => setShowingTransModal(false)}>
                <Modal.Header closeButton>
                <Modal.Title>What does "{info.transitivity}" mean?</Modal.Title>
                </Modal.Header>
                <Modal.Body>{transitivityInfo(info.transitivity, textOptions)}</Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-primary clb" onClick={() => setShowingTransModal(false)}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default VerbTypeInfo;