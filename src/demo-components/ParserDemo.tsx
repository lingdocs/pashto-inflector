import { useState } from "react";
import * as T from "../types";
// import { parsePhrase } from "../lib/src/parsing/parse-phrase";
import { tokenizer } from "../lib/src/parsing/tokenizer";
// import { NPDisplay } from "../components/library";
import EditableVP from "../components/src/vp-explorer/EditableVP";
import { uncompleteVPSelection } from "../lib/src/phrase-building/vp-tools";
// import { parseNoun } from "../lib/src/parsing/parse-noun-new";
import { JsonEditor } from "json-edit-react";
// import { renderNounSelection } from "../lib/src/phrase-building/render-np";
// import { NPBlock } from "../components/src/blocks/Block";
// import { getEnglishFromRendered } from "../lib/src/phrase-building/np-tools";
import { parsePhrase } from "../lib/src/parsing/parse-phrase";
//import { renderVP } from "../lib/src/phrase-building/render-vp";
// import VPDisplay from "../components/src/vp-explorer/VPDisplay";
import { entryFeeder } from "./entryFeeder";
import { removeRedundantVPSs } from "../lib/src/phrase-building/remove-redundant";

const working = [
  "limited demo vocab",
  "phrases with simple verbs",
  "basic verb tenses",
  "noun phrases",
  "mini-pronouns",
  "grammar error correction",
  "negatives",
  "imperative verbs",
  "perfect tenses",
];

const todo = [
  "compound verbs",
  "adjectival participles",
  "relative clauses",
  "equative verbs",
  "ability verbs",
  "passive verbs",
  "quantifiers",
  "demonstrative pronouns",
  "approximate spelling",
];

const examples = [
  "سړی ما ویني",
  "تلم به",
  "یو به مې ړلې",
  "د غټې ماشومې زاړه پلار ولیدم",
  "ستا پخواني ملګري مې ولیدل",
  "پرون مې دې ملګرې ولیده",
  "ما ډوډۍ خوړله",
  "وامې نه خیست",
  "وبه مې وینې",
  "ستا د زاړه پلار د پخواني ملګري کور نه به نه ځم",
];

function ParserDemo({
  opts,
  // entryFeeder,
  dictionary,
}: {
  opts: T.TextOptions;
  entryFeeder: T.EntryFeeder;
  dictionary: T.DictionaryAPI;
}) {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<
    ReturnType<typeof parsePhrase>["success"]
  >([]);
  // ReturnType<typeof parsePhrase>["success"]
  const [errors, setErrors] = useState<string[]>([]);
  function handleInput(value: string) {
    if (!value) {
      setText("");
      setResult([]);
      setErrors([]);
      return;
    }
    const res = parsePhrase(tokenizer(value), dictionary);
    setText(value);
    setErrors(res.errors);
    setResult(removeRedundantVPSs(res.success));
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
      {result.map((res) => (
        <>
          <EditableVP
            opts={opts}
            entryFeeder={entryFeeder}
            allVariations={true}
          >
            {uncompleteVPSelection(res)}
          </EditableVP>
          <details>
            <summary>AST</summary>
            <JsonEditor data={res} />
          </details>
        </>
      ))}
    </div>
  );
}

export default ParserDemo;

// {/* {result.map((res) =>
// "inflected" in res ? (
//   <NPDisplay NP={res.selection} inflected={res.inflected} opts={opts} />
// ) : "verb" in res ? (
//   <EditableVP
//     opts={opts}
//     entryFeeder={entryFeeder}
//     allVariations={true}
//   >
//     {uncompleteVPSelection(res)}
//   </EditableVP>
// ) : (
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
//     <samp>
//       <pre>{JSON.stringify(res, null, "  ")}</pre>
//     </samp>
//   )
// )} */}

// try {
//   const renderedNP: T.Rendered<T.NPSelection> = {
//     type: "NP",
//     selection: renderNounSelection(r.selection, r.inflected, "none"),
//   };
//   return (
//     <>
//       {r.inflected ? "INFLECTED" : "PLAIN"}
//       <NPBlock
//         opts={opts}
//         script="p"
//         english={getEnglishFromRendered(renderedNP)}
//       >
//         {renderedNP}
//       </NPBlock>
//     </>
//   );
// } catch (e) {
//   console.error(e);
//   return <div>ERROR RENDERING</div>;
// }
