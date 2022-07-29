export type Mode = "text" | "blocks";

function ModeSelect({ value, onChange }: {
    value: Mode,
    onChange: (m: Mode) => void,
}) {
    return <div style={{ fontSize: "larger", maxWidth: "1.75rem" }}>
        {value === "text" ? <div className="clickable" onClick={() => onChange("blocks")}>
            <i className="fas fa-cubes" />
        </div> : <div className="clickable" onClick={() => onChange("text")}>
            <i className="fas fa-align-left" />
        </div>}
    </div>;
}

export function ScriptSelect({ value, onChange }: { value: "p" | "f", onChange: (m: "p" | "f") => void }) {
    return <button style={{ marginLeft: "1.5rem" }} className="btn btn-sm btn-light" onClick={() => onChange(value === "p" ? "f" : "p")}>
        {value === "p" ? "Ps" : "Phon."}
    </button>;
}

export function LengthSelect({ value, onChange }: { value: "long" | "short", onChange: (l: "long" | "short") => void }) {
    return <button style={{ marginLeft: "1.5rem" }} className="btn btn-sm btn-light">
        {value === "long" ? <div className="clickable" onClick={() => onChange("short")}>
            long
        </div> : <div className="clickable" onClick={() => onChange("long")}>
            short
        </div>}
    </button>;
}

export default ModeSelect;