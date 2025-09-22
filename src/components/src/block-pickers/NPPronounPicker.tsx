import * as T from "../../../types";
import ButtonSelect from "../selects/ButtonSelect";
import useStickyState from "../useStickyState";
import classNames from "classnames";
import { isSecondPerson } from "../../../lib/src/misc-helpers";

const gColors = {
  masc: "LightSkyBlue",
  fem: "pink",
};

// TODO: better logic on this
const labels = (role: "subject" | "object" | "ergative" | "possesor") => ({
  // persons: [
  //     ["1st", "1st pl."],
  //     ["2nd", "2nd pl."],
  //     ["3rd", "3rd pl."],
  // ],
  e:
    role === "object"
      ? [
        ["me", "us"],
        ["you", "you (pl.)"],
        [{ masc: "him/it", fem: "her/it" }, "them"],
      ]
      : role === "possesor"
        ? [
          ["my", "our"],
          ["your", "your (pl.)"],
          [{ masc: "his/its", fem: "her/its" }, "their"],
        ]
        : [
          ["I", "We"],
          ["You", "You (pl.)"],
          [{ masc: "He/It", fem: "She/It" }, "They"],
        ],
  p:
    role === "subject"
      ? {
        far: [
          ["زه", "مونږ"],
          ["ته", "تاسو"],
          ["هغه", "هغوی"],
        ],
        near: [
          ["زه", "مونږ"],
          ["ته", "تاسو"],
          [{ masc: "دی", fem: "دا" }, "دوی"],
        ],
      }
      : role === "object"
        ? {
          far: [
            ["زه", "مونږ"],
            ["ته", "تاسو"],
            [{ masc: "هغهٔ", fem: "هغې" }, "هغوی"],
          ],
          near: [
            ["زه", "مونږ"],
            ["ته", "تاسو"],
            [{ masc: "دهٔ", fem: "دې" }, "دوی"],
          ],
        }
        : role === "possesor"
          ? {
            far: [
              ["زما", "زمونږ"],
              ["ستا", "ستاسو"],
              [{ masc: "د هغهٔ", fem: "د هغې" }, "د هغوی"],
            ],
            near: [
              ["زما", "زمونږ"],
              ["ستا", "ستاسو"],
              [{ masc: "د دهٔ", fem: "د دې" }, "د دوی"],
            ],
          }
          : {
            far: [
              ["ما", "مونږ"],
              ["تا", "تاسو"],
              [{ masc: "هغهٔ", fem: "هغې" }, "هغوی"],
            ],
            near: [
              ["ما", "مونږ"],
              ["تا", "تاسو"],
              [{ masc: "دهٔ", fem: "دې" }, "دوی"],
            ],
          },
});

type PickerState = { row: number; col: number; gender: T.Gender };

function personToPickerState(person: T.Person): PickerState {
  const col = person > T.Person.ThirdSingFemale ? 1 : 0;
  const row = Math.floor((person > T.Person.ThirdSingFemale ? person - 6 : person) / 2);
  const gender: T.Gender = person % 2 ? "fem" : "masc";
  return { col, row, gender };
}

function pickerStateToPerson(s: PickerState): T.Person {
  return s.row * 2 + (s.gender === "masc" ? 0 : 1) + 6 * s.col;
}

function NPPronounPicker({
  onChange,
  pronoun,
  role,
  is2ndPersonPicker,
}: {
  pronoun: T.PronounSelection;
  onChange: (p: T.PronounSelection) => void;
  role: "object" | "subject" | "ergative" | "possesor";
  // opts: T.TextOptions,
  is2ndPersonPicker?: boolean;
}) {
  if (is2ndPersonPicker === true && !isSecondPerson(pronoun.person)) {
    throw new Error("can't use 2ndPerson NPProunounPicker without a pronoun");
  }
  const [display, setDisplay] = useStickyState<"p" | "e">(
    "e",
    "prounoun-picker-display2"
  );
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
    const newPerson = display === "p" ? "e" : "p";
    setDisplay(newPerson);
  }
  const prs = labels(role)[display];
  const pSpecA = "near" in prs ? prs[pronoun.distance] : prs;
  const pSpec = is2ndPersonPicker === true ? [pSpecA[1]] : pSpecA;
  return (
    <div style={{ maxWidth: "145px", padding: 0, margin: "0 auto" }}>
      <div className="d-flex flex-row justify-content-between mb-2">
        <ButtonSelect
          xSmall
          options={[
            { label: "Far", value: "far" },
            { label: "Near", value: "near" },
          ]}
          value={pronoun.distance}
          handleChange={handlePronounTypeChange}
        />
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={handleDisplayChange}
        >
          {display === "p" ? "PS" : "EN"}
        </button>
      </div>
      <table
        className="table table-bordered table-sm"
        style={{ textAlign: "center", minWidth: "100px", tableLayout: "fixed" }}
      >
        <tbody>
          {pSpec.map((rw, i) => (
            <tr key={`pronounPickerRow${i}`}>
              {rw.map((r, j) => {
                const active = is2ndPersonPicker === true
                  ? p.col === j
                  : p.row === i && p.col === j;
                const content = typeof r === "string" ? r : r[p.gender];
                return (
                  <td
                    key={`pronounPickerCell${i}${j}`}
                    onClick={() => {
                      handleClick(is2ndPersonPicker === true ? 1 : i, j);
                    }}
                    className={classNames({
                      "table-active": active,
                      "text-on-gender-color": active,
                    })}
                    style={{
                      backgroundColor: active ? gColors[p.gender] : "inherit",
                      padding: "0.15rem 0",
                    }}
                  >
                    <div className="my-1">{content}</div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center">
        <ButtonSelect
          small
          options={[
            {
              label: <div style={{ margin: "0.15rem" }}>Masc.</div>,
              value: "masc",
              color: gColors.masc,
            },
            {
              label: <div style={{ margin: "0.15rem" }}>Fem.</div>,
              value: "fem",
              color: gColors.fem,
            },
          ]}
          value={p.gender}
          handleChange={handleGenderChange}
        />
      </div>
    </div>
  );
}

export default NPPronounPicker;
