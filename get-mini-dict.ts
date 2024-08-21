import * as T from "./src/types";
import fs from "fs";

import { entries as collection } from "./vocab/mini-dict-tss";

const res = await fetch(
  "https://storage.lingdocs.com/dictionary/dictionary.json"
);
const dictionary = (await res.json()) as T.Dictionary;

const entries: T.DictionaryEntry[] = dictionary.entries.filter((x) =>
  collection.includes(x.ts)
);

const contents = `import { DictionaryEntry } from "../src/types";
// DO NOT MODIFY - GENERATED FROM mini-dict-tss.ts
export const entries: DictionaryEntry[] = [
${entries.map((e) => `\t${JSON.stringify(e)},`).join("\n")}
];
`;

fs.writeFileSync("./vocab/mini-dict-entries.ts", contents);
