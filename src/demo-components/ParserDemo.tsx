import { useState } from "react";
import * as T from "../types";
import { parsePhrase } from "../lib/src/parsing/parse-phrase";
import { lookup } from "../lib/src/parsing/lookup";
import { tokenizer } from "../lib/src/parsing/tokenizer";
import {
  CompiledPTextDisplay,
  NPDisplay,
  compileVP,
  renderVP,
} from "../components/library";

function ParserDemo({ opts }: { opts: T.TextOptions }) {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<
    ReturnType<typeof parsePhrase>["success"]
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
      <div>Type a sentence to parse</div>
      <div className="small text-muted">
        (NOT DONE!! limited vocab, and not working for APs, compound verbs, or
        grammatically transitive verbs... yet 👷)
      </div>
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
            {errors.length > 1 ? (
              <>
                <div>possible errors:</div>
                <ul>
                  {errors.map((e) => (
                    <li>{e}</li>
                  ))}
                </ul>
              </>
            ) : (
              <div>{errors[0]}</div>
            )}
          </div>
          <div className="text-center">Did you mean:</div>
        </>
      )}

      {result.map((res) =>
        "inflected" in res ? (
          <NPDisplay NP={res.selection} inflected={res.inflected} opts={opts} />
        ) : "verb" in res ? (
          (() => {
            const rendered = renderVP(res);
            const compiled = compileVP(rendered, res.form);
            return (
              <div>
                <CompiledPTextDisplay compiled={compiled} opts={opts} />
                {compiled.e && (
                  <div className={`text-muted mt-2 text-center`}>
                    {compiled.e.map((e, i) => (
                      <div key={i}>{e}</div>
                    ))}
                  </div>
                )}
              </div>
            );
          })()
        ) : (
          <samp>
            <pre>{JSON.stringify(res, null, "  ")}</pre>
          </samp>
        )
      )}
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
