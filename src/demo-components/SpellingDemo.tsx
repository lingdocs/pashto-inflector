import Examples from "../components/src/Examples";
import ButtonSelect from "../components/src/ButtonSelect";
import * as T from "../types";

const spellingOptions: {
    value: T.TextOptions["spelling"],
    label: string,
}[] = [
    {
        value: "Afghan",
        label: "Afghan",
    },
    {
        value: "Pakistani ي",
        label: "Pakistani ي",
    },
    {
        value: "Pakistani ی",
        label: "Pakistani ی",
    },
];

const phoneticsOptions: {
    value: T.TextOptions["phonetics"],
    label: string,
}[] = [
    {
        value: "lingdocs",
        label: "LingDocs",
    },
    {
        value: "ipa",
        label: "IPA",
    },
    {
        value: "alalc",
        label: "ALALC",
    },
];

function SpellingDemo({ opts, onChange }: {
    opts: T.TextOptions,
    onChange: (opts: T.TextOptions) => void,
}) {
    return <div>
        <ul>
            <li>Converts text between Afghan and Pakistani spelling conventions</li>
            <li>Generates diacritics for Pashto script when given phonetic script along with Pashto script</li>   
        </ul>
        <div className="d-block mx-auto card mb-3" style={{ maxWidth: "700px", background: "var(--closer)"}}>
            <div className="card-body">
                <div className="row">
                    <div className="col-sm-6 mb-2">
                        <h6>Pashto Spelling Convention:</h6>
                        <div>
                            {spellingOptions.map(({ value, label }) => (
                                <div key={value} className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="radio"
                                        name="verb-type"
                                        checked={opts.spelling === value}
                                        value={value}
                                        onChange={() => {
                                            onChange({
                                                ...opts,
                                                spelling: value,
                                            });
                                        }}
                                    />
                                    <label className="form-check-label">
                                        {label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-sm-6 mb-2">
                        <h6>Latin Phonetic System:</h6>
                        <div>
                            {phoneticsOptions.map(({ value, label }) => (
                                <div key={value} className="form-check">
                                    <input 
                                        className="form-check-input" 
                                        type="radio"
                                        name="verb-type"
                                        checked={opts.phonetics === value}
                                        value={value}
                                        onChange={() => {
                                            onChange({
                                                ...opts,
                                                phonetics: value,
                                            });
                                        }}
                                    />
                                    <label className="form-check-label">
                                        {label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <h6>Diacritics</h6>
                        <ButtonSelect
                            options={[
                                { label: "On", value: "true" },
                                { label: "Off", value: "false" },
                            ]}
                            value={opts.diacritics.toString()}
                            handleChange={(p) => onChange({ ...opts, diacritics: p === "true" })}
                        />
                    </div>
                </div>
            </div>
        </div>

        <Examples opts={opts}>{[
            {
                p: "زما زوی مکتب ته ځي",
                f: "zmaa zooy maktab ta dzee",
            },
            {
                p: "دا ښه سړی دی",
                f: "daa xu saRey dey",
            },
        ]}</Examples>
    </div>;
}

export default SpellingDemo;