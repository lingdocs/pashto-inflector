import { useState } from "react";
import * as T from "../types";
import { tokenizer } from "../lib/src/parsing/tokenizer";
import { JsonEditor } from "json-edit-react";
import { parseVP } from "../lib/src/parsing/parse-vp";
import { testDictionary } from "../lib/src/parsing/mini-test-dictionary";
import { PhraseDisplay } from "../components/src/PhraseDisplay";

function ParserTester({
  opts,
  entryFeeder,
}: {
  opts: T.TextOptions,
  entryFeeder: T.EntryFeeder,
}) {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<T.ParseResult<any>[]>([]);
  function handleInput(value: string) {
    if (!value) {
      setText("");
      setResult([]);
      return;
    }
    const tokens = tokenizer(value);
    const res = parseVP(tokens, testDictionary);
    setText(value);
    setResult(res);
  }
  return (
    <div className="mt-3" style={{ marginBottom: "1000px" }}>
      <div className="form-group mb-2">
        <input
          dir="rtl"
          className={`form-control ${!text
            ? ""
            : text && result.some((x) => x.errors.length)
              ? "is-invalid"
              : result.length
                ? "is-valid"
                : "is-waiting"
            }`}
          type="text"
          value={text}
          onChange={(e) => handleInput(e.target.value)}
        />
      </div>
      {/* TODO: SHOW POSSIBLE ERRORS */}

      {result.map((res, i) => (
        <div key={`res ${i}`}>
          {res.errors.length > 0 && <div className="alert alert-danger">
            {res.errors.map(x => <div className="my-2" key={`i-${x.message}`}>{x.message}</div>)}
          </div>}
          <PhraseDisplay phrase={res.body} opts={opts} entryFeeder={entryFeeder} />
          <details>
            <summary>AST</summary>
            <JsonEditor data={res} />
          </details>
        </div>
      ))}
    </div>
  );
}

export default ParserTester;
