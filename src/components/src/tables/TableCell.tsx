import { useState, useEffect } from "react";
import * as T from "../../../types";
import Pashto from "./../text-display/Pashto";
import Phonetics from "./../text-display/Phonetics";

const arrowDown = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    className="bi bi-caret-down"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M3.204 5L8 10.481 12.796 5H3.204zm-.753.659l4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"
    />
  </svg>
);

const TableCell = ({
  item,
  textOptions,
  center,
  noBorder,
  colSpan,
}: {
  item: T.PsString[];
  textOptions: T.TextOptions;
  center?: boolean;
  noBorder?: boolean;
  colSpan?: 1 | 2;
}) => {
  const [version, setVersion] = useState(0);
  useEffect(() => setVersion(0), [item]);
  function advanceVersion() {
    setVersion((version + 1) % item.length);
  }
  const w = item[version] ?? item[0];
  return (
    <td
      colSpan={colSpan || 1}
      style={{
        ...(noBorder === true ? { border: "none" } : { border: "2px solid #dee2e6" }),
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: center === true ? "center" : "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div>
            <Pashto opts={textOptions} ps={w} />
          </div>
          <div>
            <Phonetics opts={textOptions} ps={w} />
          </div>
          {w.e !== undefined && w.e !== "" &&
            (Array.isArray(w.e) ? (
              w.e.map((e) => (
                <div key={e as string} className="text-muted small">
                  {e}
                </div>
              ))
            ) : (
              <div className="text-muted">{w.e}</div>
            ))}
        </div>
        {item.length > 1 && (
          <button
            className="btn btn-sm btn-light mx-2 my-2"
            onClick={advanceVersion}
          >
            ver. {version + 1}/{item.length} {arrowDown}
          </button>
        )}
      </div>
    </td>
  );
};

export default TableCell;
