import * as T from "../../../types";
import classNames from "classnames";

export default function DemonstrativePicker({
  demonstrative,
  onChange,
}: {
  demonstrative: T.NounSelection["demonstrative"];
  onChange: (dem: T.NounSelection["demonstrative"]) => void;
}) {
  function handleDChange(d: "daa" | "hagha" | "dagha") {
    if (!demonstrative) {
      onChange({
        type: "demonstrative",
        demonstrative: d,
        withNoun: true,
      });
    } else {
      onChange({
        ...demonstrative,
        demonstrative: d,
      });
    }
  }
  function handleWithNounChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (demonstrative) {
      onChange({
        ...demonstrative,
        withNoun: e.target.checked,
      });
    }
  }
  return (
    <div>
      <div className="d-flex flex-row justify-content-around py-1">
        <div>
          <button
            className={classNames("btn", "btn-outline-secondary", {
              active: demonstrative?.demonstrative === "daa",
            })}
            onClick={() => handleDChange("daa")}
          >
            دا
          </button>
        </div>
        <div>
          <button
            className={classNames("btn", "btn-outline-secondary", {
              active: demonstrative?.demonstrative === "dagha",
            })}
            onClick={() => handleDChange("dagha")}
          >
            دغه
          </button>
        </div>
        <div>
          <button
            className={classNames("btn", "btn-outline-secondary", {
              active: demonstrative?.demonstrative === "hagha",
            })}
            onClick={() => handleDChange("hagha")}
          >
            هغه
          </button>
        </div>
      </div>
      <div
        className="form-check"
        style={{
          opacity: demonstrative ? 1 : 0.5,
        }}
      >
        <input
          className="form-check-input"
          type="checkbox"
          checked={demonstrative?.withNoun}
          onChange={handleWithNounChange}
          id="withNoun"
          disabled={!demonstrative}
        />
        <label className="form-check-label text-muted" htmlFor="withNoun">
          with noun
        </label>
      </div>
    </div>
  );
}
