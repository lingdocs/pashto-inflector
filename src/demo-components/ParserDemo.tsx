import { useState } from "react";
import * as T from "../types";
import { parsePhrase } from "../lib/src/parsing/parse-phrase";
import { lookup } from "../lib/src/parsing/lookup";
import { tokenizer } from "../lib/src/parsing/tokenizer";
import { NPDisplay } from "../components/library";

function ParserDemo({ opts }: { opts: T.TextOptions }) {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<
    { inflected: boolean; selection: T.NPSelection }[]
  >([]);
  const [errors, setErrors] = useState<string[]>([]);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (!value) {
      setText("");
      setResult([]);
      setErrors([]);
      return;
    }
    const { success, errors } = parsePhrase(tokenizer(value), lookup);
    setText(value);
    setErrors(errors);
    setResult(success);
  }
  return (
    <div className="mt-3" style={{ marginBottom: "1000px" }}>
      <p>Type an adjective or noun (w or without adjs) to parse it</p>
      <div className="form-group mb-2">
        <input
          dir="rtl"
          className={`form-control ${
            text && (errors.length || !result.length)
              ? "is-invalid"
              : result.length
              ? "is-valid"
              : ""
          }`}
          type="text"
          value={text}
          onChange={handleChange}
        />
      </div>
      {errors.length > 0 && (
        <>
          <div className="alert alert-danger" role="alert">
            {errors.map((e) => (
              <div>{e}</div>
            ))}
          </div>
          <div className="text-center">Did you mean:</div>
        </>
      )}

      {result.map((np) => (
        <NPDisplay NP={np.selection} inflected={np.inflected} opts={opts} />
      ))}
      <details>
        <summary>AST</summary>
        <samp>
          <pre>{JSON.stringify(result, null, "  ")}</pre>
        </samp>
      </details>
    </div>
  );
}

export default ParserDemo;
