import fs from "fs";
import * as T from "./src/types";
import { entries as collection } from "./vocab/mini-dict-tss";
import { isVerbDictionaryEntry } from "./src/lib/src/type-predicates";

const res = await fetch(
  "https://storage.lingdocs.com/dictionary/dictionary.json",
);
const dictionary = (await res.json()) as T.Dictionary;

const splitEntries: T.VerbDictionaryEntry[] =
  dictionary.entries.filter<T.VerbDictionaryEntry>(
    (x): x is T.VerbDictionaryEntry =>
      isVerbDictionaryEntry(x) &&
      !!x.separationAtP &&
      !["کول", "کېدل"].includes(x.p),
  );

const entries: T.DictionaryEntry[] = dictionary.entries.filter(
  (x) => collection.includes(x.ts) || splitEntries.some((e) => e.ts === x.ts),
);

const miniDictContents = `import { DictionaryEntry } from "../src/types";
// DO NOT MODIFY - GENERATED FROM mini-dict-tss.ts
export const entries: DictionaryEntry[] = [
${entries.map((e) => `\t${JSON.stringify(e)},`).join("\n")}
];
`;

const splitVerbContents = `import { VerbEntry, VerbDictionaryEntry } from "../../../types";
// DO NOT MODIFY - GENERATED
export const entries: VerbEntry[] = [
${splitEntries
  .map((e) => `\t{ entry: ${JSON.stringify(e)} as VerbDictionaryEntry },`)
  .join("\n")}
];
`;

fs.writeFileSync("./vocab/mini-dict-entries.ts", miniDictContents);
fs.writeFileSync("./src/lib/src/parsing/split-verbs.ts", splitVerbContents);
