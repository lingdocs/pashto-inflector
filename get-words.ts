import fs from "fs";
import path from "path";
const verbCollectionPath = path.join(".", "vocab", "verbs");
const nounAdjCollectionPath = path.join(".", "vocab", "nouns-adjs");
const verbTsFiles = fs
  .readdirSync(verbCollectionPath)
  .map((x) => `./${verbCollectionPath}/${x}`);
const nounAdjTsFiles = fs
  .readdirSync(nounAdjCollectionPath)
  .map((x) => `./${nounAdjCollectionPath}/${x}`);

const allTs = new Set<number>();
for (const fileSet of [verbTsFiles, nounAdjTsFiles]) {
  for (const file of fileSet) {
    const res = await import(file);
    res.default.forEach((x: unknown) => {
      if (typeof x === "number") {
        allTs.add(x);
      } else if (
        x &&
        typeof x === "object" &&
        "ts" in x &&
        typeof x.ts === "number"
      ) {
        allTs.add(x.ts);
      } else {
        throw new Error(`problem getting ts for ${x}`);
      }
    });
  }
}

const wordsRes = await fetch(
  "https://account.lingdocs.com/dictionary/entries",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids: [...allTs] }),
  },
);
const results = await wordsRes.json();

const verbs = results.results.filter((x: any) => "entry" in x);
const verbsContent = `
import { DictionaryEntry, VerbEntry } from "./types";

const verbs: {
    entry: DictionaryEntry,
    complement?: DictionaryEntry,
}[] = ${JSON.stringify(verbs)};
export default verbs as VerbEntry[];`;

const nounsAdjs = results.results.filter((x: any) => !("entry" in x));
const nounsAdjsContent = `
import { DictionaryEntry } from "./types";

const nounsAdjs: DictionaryEntry[] = ${JSON.stringify(nounsAdjs)};
export default nounsAdjs;`;

console.log("fetched words from dictionary");
const missingEc = results.results.filter(
  (x: any) => "entry" in x && !x.entry.ec,
);
if (missingEc.length) {
  console.log("verbs missing ec");
  console.log(missingEc);
  process.exit(1);
}
if (results.notFound.length) {
  console.log("entries not found:");
  console.log(results.notFound);
  process.exit(1);
}
fs.writeFileSync("./src/nouns-adjs.ts", nounsAdjsContent);
fs.writeFileSync("./src/verbs.ts", verbsContent);
