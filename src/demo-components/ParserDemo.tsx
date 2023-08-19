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

const working = [
  "limited demo vocab",
  "phrases with simple verbs",
  "basic verb tenses",
  "noun phrases (except participles)",
  "mini-pronouns for shrunken servants",
  "grammar error correction",
];

const todo = [
  "participles",
  "compound verbs",
  "adverbial phrases",
  "relative clauses",
  "equative verbs",
  "perfect tenses",
  "ability verbs",
  "imperative verbs",
  "passive verbs",
  "quantifiers",
  "demonstrative pronouns",
  "mini-pronouns for possesives",
  "approximate spelling",
];

const examples = [
  "سړي زه ولیدم",
  "تلم به",
  "یو به مې ړلې",
  "د غټې ماشومې زاړه پلار ولیدم",
  "ستا پخواني ملګري مې ولیدل",
  "ما ډوډۍ خوړله",
];

function ParserDemo({ opts }: { opts: T.TextOptions }) {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<
    ReturnType<typeof parsePhrase>["success"]
  >([]);
  const [errors, setErrors] = useState<string[]>([]);
  function handleInput(value: string) {
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
      <div className="mb-2">Type a sentence to parse</div>
      <div className="small text-muted mb-2">
        <div>
          <strong>NOT DONE:</strong> <em>sort of</em> works with:{` `}
          {working.map((x) => (
            <span className="mr-2" key={x}>
              ✅ {x}
            </span>
          ))}
          {todo.map((x) => (
            <span className="mr-2" key={x}>
              ❌ {x}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-2 text-right">working examples</div>
      <ul dir="rtl" className="text-right">
        {examples.map((ex) => (
          <li key={ex} className="clickable" onClick={() => handleInput(ex)}>
            {ex}
          </li>
        ))}
      </ul>
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
          onChange={(e) => handleInput(e.target.value)}
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
