import { useState } from "react";
import * as T from "../types";
import { parsePhrase } from "../lib/src/parsing/parse-phrase";
import { tokenizer } from "../lib/src/parsing/tokenizer";
import { NPDisplay } from "../components/library";
import EditableVP from "../components/src/vp-explorer/EditableVP";
import { uncompleteVPSelection } from "../lib/src/phrase-building/vp-tools";

const working = [
  "limited demo vocab",
  "phrases with simple verbs",
  "basic verb tenses",
  "noun phrases",
  "mini-pronouns for shrunken servants",
  "grammar error correction",
  "negatives",
  "imperative verbs",
  "perfect tenses",
];

const todo = [
  "compound verbs",
  "adjectival participles",
  "adverbial phrases",
  "relative clauses",
  "equative verbs",
  "ability verbs",
  "passive verbs",
  "quantifiers",
  "demonstrative pronouns",
  "mini-pronouns for possesives",
  "approximate spelling",
];

const examples = [
  "سړی ما ویني",
  "تلم به",
  "یو به مې ړلې",
  "د غټې ماشومې زاړه پلار ولیدم",
  "ستا پخواني ملګري مې ولیدل",
  "پرون مې ولیدې",
  "ما ډوډۍ خوړله",
  "وامې نه خیست",
  "وبه مې وینې",
  "ستا د زاړه پلار د پخواني ملګري کور نه به نه ځم",
];

function ParserDemo({
  opts,
  entryFeeder,
}: {
  opts: T.TextOptions;
  entryFeeder: T.EntryFeeder;
}) {
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
    const { success, errors } = parsePhrase(tokenizer(value));
    setText(value);
    setErrors(errors);
    setResult(success);
  }
  return (
    <div className="mt-3" style={{ marginBottom: "1000px" }}>
      <div className="mb-2">Type a sentence to parse</div>
      <div className="small text-muted mb-2">
        <div>
          <strong>NOT DONE:</strong> <em>should</em> work with:{` `}
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
          <EditableVP
            opts={opts}
            entryFeeder={entryFeeder}
            formChoice={false}
            allVariations={true}
          >
            {uncompleteVPSelection(res)}
          </EditableVP>
        ) : (
          // (() => {
          //   try {
          //     const rendered = renderVP(res);
          //     const compiled = compileVP(rendered, res.form);
          //     return (
          //       <div>
          //         <CompiledPTextDisplay compiled={compiled} opts={opts} />
          //         {compiled.e && (
          //           <div className={`text-muted mt-2 text-center`}>
          //             {compiled.e.map((e, i) => (
          //               <div key={i}>{e}</div>
          //             ))}
          //           </div>
          //         )}
          //       </div>
          //     );
          //   } catch (e) {
          //     console.error(e);
          //     console.log({ res });
          //     return <div>ERROR</div>;
          //   }
          // })()
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
