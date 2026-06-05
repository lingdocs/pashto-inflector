import * as T from "../types";
import { useState } from "react";
import { JsonEditor } from "json-edit-react";

function DictionaryDemo({ opts, dictionary }: {
  opts: T.TextOptions
  dictionary: T.DictionaryAPI,
}) {
  const [text, setText] = useState<string>("");
  const [result, setResult] = useState<T.DictionaryEntry[]>([]);
  function handleInput(value: string) {
    if (!value) {
      setText("");
      setResult([]);
      return;
    }
    setText(value);
    if (value.length > 2) {
      const res = dictionary.search({
        page: 1,
        language: "Pashto",
        searchType: "fuzzy",
        spelling: opts.spelling,
        searchValue: value,
      });
      setResult(res);
    }
  }
  return <>
    <div className="mt-3" style={{ marginBottom: "1000px" }}>
      <div className="form-group mb-2">
        <input
          dir="auto"
          className="form-control"
          type="text"
          value={text}
          onChange={(e) => handleInput(e.target.value)}
        />
      </div>
      <JsonEditor data={result} />
    </div>
  </>;
}

export default DictionaryDemo;
