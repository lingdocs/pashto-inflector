import { useState } from "react";
import * as T from "../types";
import { tokenizer } from "../lib/src/parsing/tokenizer";
import { JsonEditor } from "json-edit-react";
import { parseVP } from "../lib/src/parsing/parse-vp";
// import { parseKidsSection } from "../lib/src/parsing/parse-kids-section";
// import { parseVerbSection } from "../lib/src/parsing/verb-section/parse-verb-section";
import { testDictionary } from "../lib/src/parsing/mini-test-dictionary";

function ParserTester(/* { dictionary }: { dictionary: T.DictionaryAPI } */) {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<T.ParseResult<any>[]>([]);
  function handleInput(value: string) {
    if (!value) {
      setText("");
      setResult([]);
      return;
    }
    const tokens = tokenizer(value);
    const res = parseVP(tokens, testDictionary)// .filter((x) => !x.tokens.length);
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
      <JsonEditor data={result} />
    </div>
  );
}

export default ParserTester;
