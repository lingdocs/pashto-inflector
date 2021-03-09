/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { persons } from "../lib/grammar-units";
import InlinePs from "../components/InlinePs";
import * as T from "../types";

function PersonSelect(props: {
    setting: "subject" | "object",
    value: T.Person,
    locked?: boolean,
    handleChange: (person: T.Person) => void,
    handleRandom: () => void,
}) {
    return (
        !props.locked ? <div className="input-group" style={{ maxWidth: "30rem" }}>
            <select
                className="custom-select"
                value={props.value}
                onChange={(e: any) => props.handleChange(
                    parseInt(e.target.value) as T.Person
                )}
            >
                {persons.map((p) => (
                    <option value={p.person} key={"subject"+p.person}>
                        {p.label[props.setting]}
                    </option>
                ))}
            </select>
            <div className="input-group-append" onClick={props.handleRandom}>
                <button className="btn btn-secondary">
                    <i className="fas fa-random" />
                </button>
            </div>
        </div> : <input
            className="form-control"
            type="text"
            placeholder={persons[props.value].label[props.setting]}
            readOnly
        />
    );
}

function PersonSelection(props: {
    subject: T.Person,
    object: T.Person,
    info: T.NonComboVerbInfo,
    handleRandom: (setting: "subject" | "object") => void,
    handleChange: (payload: { setting: "subject" | "object", person: T.Person }) => void,
    textOptions: T.TextOptions,
}) {
    function getComp(comp: T.ObjComplement) {
        const c = comp.plural
            ? comp.plural
            : comp.entry;
        return <InlinePs opts={props.textOptions}>{c}</InlinePs>;
    }
    return (
        <div className="row align-items-baseline">
            <div className="col">
                <label className="form-label">
                    <strong>{props.info.transitivity === "intransitive" ? "Subject" : "Subject/Agent"}</strong>
                </label>
                <PersonSelect
                    setting="subject"
                    value={props.subject}
                    handleChange={(person: T.Person) => props.handleChange({ setting: "subject", person })}
                    handleRandom={() => props.handleRandom("subject")}
                />
            </div>
            {(props.info.type === "dynamic compound" || props.info.type === "generative stative compound") ? <div className="col">
                <label className="form-label"><strong>Object is the complement ({getComp(props.info.objComplement)})</strong></label>
                <PersonSelect
                    setting="object"
                    value={props.info.objComplement.person}
                    locked
                    handleChange={(person: T.Person) => props.handleChange({ setting: "object", person })}
                    handleRandom={() => props.handleRandom("object")}
                />
            </div> : props.info.transitivity === "transitive" ? <div className="col">
                <label className="form-label"><strong>Object</strong></label>
                <PersonSelect
                    setting="object"
                    value={props.object}
                    handleChange={(person: T.Person) => props.handleChange({ setting: "object", person })}
                    handleRandom={() => props.handleRandom("object")}
                />
            </div> : props.info.transitivity === "grammatically transitive" ? <div className="col">
                <label className="form-label"><strong>Object is unspoken</strong></label>
                <PersonSelect
                    setting="object"
                    value={10}
                    locked
                    handleChange={(person: T.Person) => props.handleChange({ setting: "object", person })}
                    handleRandom={() => props.handleRandom("object")}
                />
            </div> : null}
        </div>
    );
}

export default PersonSelection;