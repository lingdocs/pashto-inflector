import ButtonSelect from "./ButtonSelect";

export type Mode = "text" | "blocks";

function ModeSelect({ value, onChange }: {
    value: Mode,
    onChange: (m: Mode) => void,
}) {
    return <div>
        <ButtonSelect
            faded
            options={[
                { value: "text", label: <i className="fas fa-align-left p-1" /> },
                { value: "blocks", label: <i className="fas fa-cubes p-1" /> },
            ]}
            handleChange={onChange}
            value={value}
            small
        />
    </div>

    // return <div style={{ fontSize: "larger", maxWidth: "1.75rem" }}>
    //     {value === "text" ? <div className="clickable" onClick={() => onChange("blocks")}>
    //         <i className="fas fa-cubes" />
    //     </div> : <div className="clickable" onClick={() => onChange("text")}>
    //         <i className="fas fa-align-left" />
    //     </div>}
    // </div>;
}

export function ScriptSelect({ value, onChange }: { value: "p" | "f", onChange: (m: "p" | "f") => void }) {
    return <div className="ml-3">
        <ButtonSelect
            faded
            options={[
                { value: "p", label: "Ps" },
                { value: "f", label: "Phon." },
            ]}
            handleChange={onChange}
            value={value}
            small
        />
    </div>
    // return <button style={{ marginLeft: "1.5rem" }} className="btn btn-sm btn-light" onClick={() => onChange(value === "p" ? "f" : "p")}>
    //     {value === "p" ? "Ps" : "Phon."}
    // </button>;
}

export function LengthSelect({ value, onChange }: { value: "long" | "short", onChange: (l: "long" | "short") => void }) {
    return <button style={{ marginLeft: "1.5rem" }} className="btn btn-sm btn-light" onClick={() => onChange(value === "long" ? "short" : "long")}>
        {value}
    </button>;
}

export default ModeSelect;