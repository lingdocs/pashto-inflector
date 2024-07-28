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
        hideNoun: false,
      });
    } else {
      onChange({
        ...demonstrative,
        demonstrative: d,
      });
    }
  }
  return (
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
  );
}
