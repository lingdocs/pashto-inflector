import * as T from "../../types";
import ButtonSelect from "../ButtonSelect";
import useStickyState from "../../lib/useStickyState";
import classNames from "classnames";
import {
    isSecondPerson, isThirdPerson,
} from "../../lib/phrase-building/vp-tools";

const gColors = {
    masc: "LightSkyBlue",
    fem: "pink",
};

const labels = (asObject: boolean) => ({
    persons: [
        ["1st", "1st pl."],
        ["2nd", "2nd pl."],
        ["3rd", "3rd pl."],
    ],
    e: asObject ? [
        ["me", "us"],
        ["you", "you pl."],
        [{ masc: "him/it", fem: "her/it"}, "them"],
    ] : [
        ["I", "We"],
        ["You", "You pl."],
        [{ masc: "He/It", fem: "She/It"}, "They"],
    ],
    p: {
        far: [
            ["زه", "مونږ"],
            ["ته", "تاسو"],
            ["هغه", "هغوي"],
        ],
        near: [
            ["زه", "مونږ"],
            ["ته", "تاسو"],
            [{ masc: "دی", fem: "دا" }, "دوي"],
        ],
    },
});


type PickerState = { row: number, col: number, gender: T.Gender };

function personToPickerState(person: T.Person): PickerState {
    const col = person > 5 ? 1 : 0;
    const row = Math.floor((person > 5 ? (person - 6) : person) / 2);
    const gender: T.Gender = (person % 2) ? "fem" : "masc";
    return { col, row, gender };
}

function pickerStateToPerson(s: PickerState): T.Person {
    return (s.row * 2)
        + (s.gender === "masc" ? 0 : 1)
        + (6 * s.col);
}

function NPPronounPicker({ onChange, pronoun, asObject, clearButton, opts, is2ndPersonPicker }: {
    pronoun: T.PronounSelection,
    onChange: (p: T.PronounSelection) => void,
    asObject?: boolean,
    clearButton?: JSX.Element,
    opts: T.TextOptions,
    is2ndPersonPicker?: boolean,
}) {
    if (is2ndPersonPicker && !isSecondPerson(pronoun.person)) {
        throw new Error("can't use 2ndPerson NPProunounPicker without a pronoun");
    }
    const [display, setDisplay] = useStickyState<"persons" | "p" | "e">("e", "prounoun-picker-display"); 
    const p = personToPickerState(pronoun.person);
    function handleClick(row: number, col: number) {
        const person = pickerStateToPerson({ ...p, row, col });
        onChange({
            ...pronoun,
            person,
        });
    }
    function handleGenderChange(gender: T.Gender) {
        const person = pickerStateToPerson({ ...p, gender });
        onChange({
            ...pronoun,
            person,
        });
    }
    function handlePronounTypeChange(distance: "far" | "near") {
        onChange({
            ...pronoun,
            distance,
        });
    }
    function handleDisplayChange() {
        const newPerson = display === "persons"
            ? "p"
            : display === "p"
            ? "e"
            : "persons";
        setDisplay(newPerson);
    }
    const prs = labels(!!asObject)[display];
    const pSpecA = "near" in prs ? prs[pronoun.distance] : prs;
    const pSpec = is2ndPersonPicker
        ? [pSpecA[1]]
        : pSpecA;
    return <div style={{ maxWidth: "145px", padding: 0 }}>
        {clearButton}
        <div className="d-flex flex-row justify-content-between mb-3">
            {isThirdPerson(pronoun.person) ? <ButtonSelect
                xSmall
                options={[
                    { label: "Far", value: "far" },
                    { label: "Near", value: "near" },
                ]}
                value={pronoun.distance}
                handleChange={(g) => handlePronounTypeChange(g as "far" | "near")}
            /> : <div>{` `}</div>}
            <button className="btn btn-sm btn-outline-secondary" onClick={handleDisplayChange}>
                {display === "persons" ? "#" : display === "p" ? "PS" : "EN"}
            </button>
        </div>
        <table className="table table-bordered table-sm" style={{ textAlign: "center", minWidth: "100px", tableLayout: "fixed" }}>
            <tbody>
                {pSpec.map((rw, i) => (
                    <tr>
                        {rw.map((r, j) => {
                            const active = is2ndPersonPicker
                                ? (p.col === j)
                                : (p.row === i && p.col === j);
                            return <td
                                onClick={() => {
                                    handleClick(is2ndPersonPicker ? 1 : i, j);
                                }}
                                className={classNames({ "table-active": active, "text-on-gender-color": active })}
                                style={{
                                    backgroundColor: active ? gColors[p.gender] : "inherit",
                                    padding: "0.25rem 0",
                                }}
                            >
                                <div className="my-1">
                                    {typeof r === "string" ? r : r[p.gender]}
                                </div>
                            </td>;
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
        <div className="text-center">
            <ButtonSelect
                small
                options={[
                    { label: <div style={{ margin: "0.15rem"}}>Masc.</div>, value: "masc", color: gColors.masc },
                    { label: <div style={{ margin: "0.15rem"}}>Fem.</div>, value: "fem", color: gColors.fem },
                ]}
                value={p.gender}
                handleChange={(g) => handleGenderChange(g as T.Gender)}
            />
        </div>
   </div>;
};

export default NPPronounPicker;