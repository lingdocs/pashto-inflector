import * as T from "../../../types"
import Select from "react-select";
import ButtonSelect from "../ButtonSelect";

const zIndexProps = {
    menuPortalTarget: document.body, 
    styles: { menuPortal: (base: any) => ({ ...base, zIndex: 9999 }) },
};

const options: { label: string | JSX.Element, value: T.EquativeTense }[] = [{
    label: "Present",
    value: "present",
}, {
    label: "Habitual",
    value: "habitual",
}, {
    label: "Subjunctive",
    value: "subjunctive",
}, {
    label: "Future",
    value: "future",
}, {
    label: "Past",
    value: "past",
}, {
    label: `"Would Be"`,
    value: "wouldBe",
}, {
    label: "Past Subjunctive",
    value: "pastSubjunctive",
}, {
    label: `"Would Have Been"`,
    value: "wouldHaveBeen",
}];

function EquativePicker({ equative, onChange, hideNegative }: {
    equative: { tense: T.EquativeTense, negative: boolean },
    onChange: (e: { tense: T.EquativeTense, negative: boolean }) => void,
    hideNegative?: boolean,
}) {
    function onTenseSelect(o: { value: T.EquativeTense } | null) {
        const value = o?.value ? o.value : undefined;
        if (!value) {
            return;
        }
        onChange({
            ...equative,
            tense: value,
        });
    }
    function moveTense(dir: "forward" | "back") {
        return () => {
            const currIndex = options.findIndex(tn => tn.value === equative.tense)
            if (currIndex === -1) {
                console.error("error moving tense", dir);
                return;
            }
            const newIndex = dir === "forward"
                ? ((currIndex + 1) % options.length)
                : (currIndex === 0 ? (options.length - 1) : (currIndex - 1))
            const newTense = options[newIndex];
            onChange({
                ...equative,
                tense: newTense.value,
            });
        };
    }
    function onPosNegSelect(value: "true" | "false") {
        onChange({
            ...equative,
            negative: value === "true",
        });
    }
    return <div>
        <div style={{ maxWidth: "300px", minWidth: "250px", margin: "0 auto" }}>
            <div className="h5">Tense:</div>
            <Select
                isSearchable={false}
                // for some reason can't use tOptions with find here;
                value={options.find(o => o.value === equative.tense)}
                onChange={onTenseSelect}
                className="mb-2"
                options={options}
                {...zIndexProps}
            />
            {<div className="d-flex flex-row justify-content-between align-items-center mt-3 mb-1" style={{ width: "100%" }}>
                <div className="btn btn-light clickable" onClick={moveTense("back")}>
                    <i className="fas fa-chevron-left" />
                </div>
                {!hideNegative && <ButtonSelect
                    small
                    value={equative.negative.toString() as "true" | "false"}
                    options={[{
                        label: "Pos.",
                        value: "false",
                    }, {
                        label: "Neg.",
                        value: "true",
                    }]}
                    handleChange={onPosNegSelect}
                />}
                <div onClick={moveTense("forward")} className="btn btn-light clickable">
                    <i className="fas fa-chevron-right" />
                </div>
            </div>}
        </div>
    </div>;
}

export default EquativePicker;