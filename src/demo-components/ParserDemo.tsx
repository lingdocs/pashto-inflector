import { useState } from "react";
import * as T from "../types";
import { parsePhrase } from "../lib/src/parsing/parse-phrase";
import { lookup } from "../lib/src/parsing/lookup";
import { tokenizer } from "../lib/src/parsing/tokenizer";

function ParserDemo({ opts }: { opts: T.TextOptions }) {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<string>("");
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (!value) {
      setText("");
      setResult("");
      return;
    }
    const r = parsePhrase(tokenizer(value), lookup);
    setText(value);
    setResult(JSON.stringify(r, null, "  "));
  }
  return (
    <div className="mt-3" style={{ marginBottom: "1000px" }}>
      <p>Type an adjective or noun (w or without adjs) to parse it</p>
      <div className="form-group mb-2">
        <input
          dir="rtl"
          className={`form-control ${
            text && result === "[]" ? "is-invalid" : text ? "is-valid" : ""
          }`}
          type="text"
          value={text}
          onChange={handleChange}
        />
      </div>
      <samp>
        <pre>{result}</pre>
      </samp>
    </div>
  );
}

export default ParserDemo;
