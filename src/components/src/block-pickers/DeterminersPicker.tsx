import * as T from "../../../types";
import { DeterminerSelect } from "../selects/EntrySelect";

export default function DeterminersPicker({
  determiners,
  onChange,
  opts,
  negative,
}: {
  determiners: T.NounSelection["determiners"];
  onChange: (dem: T.NounSelection["determiners"]) => void;
  opts: T.TextOptions;
  negative: boolean;
}) {
  const hasDemonstrative =
    determiners &&
    determiners.determiners.some((d) => "demonstrative" in d.determiner);
  function allowed(d: T.Determiner): boolean {
    if (d.p === "هیڅ" && !negative) {
      return false;
    }
    if (hasDemonstrative && "demonstrative" in d) {
      return false;
    }
    return true;
  }
  function handleWithNounChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (determiners) {
      onChange({
        ...determiners,
        withNoun: e.target.checked,
      });
    }
  }
  function handleDeterminerChange(value: T.Determiner[] | undefined) {
    onChange({
      type: "determiners",
      withNoun: determiners ? determiners.withNoun : true,
      determiners: value
        ? value.map((d) => ({
            type: "determiner",
            determiner: d,
          }))
        : [],
    });
  }
  return (
    <div>
      {/* <div className="d-flex flex-row justify-content-around py-1">
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
      </div> */}
      <DeterminerSelect
        determiners={T.determiners.filter(allowed)}
        value={
          determiners ? determiners.determiners.map((x) => x.determiner) : []
        }
        onChange={handleDeterminerChange}
        name="determiner"
        opts={opts}
      />
      <div
        className="form-check"
        style={{
          opacity: determiners ? 1 : 0.5,
        }}
      >
        <input
          className="form-check-input"
          type="checkbox"
          checked={determiners?.withNoun}
          onChange={handleWithNounChange}
          id="withNoun"
          disabled={!hasDemonstrative}
        />
        <label className="form-check-label text-muted" htmlFor="withNoun">
          with noun
        </label>
      </div>
    </div>
  );
}
