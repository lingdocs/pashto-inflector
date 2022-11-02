/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
const fs = require("fs");
const fetch = require("node-fetch-commonjs");
const path = require("path");
const verbCollectionPath = path.join(".", "vocab", "verbs");
const nounAdjCollectionPath = path.join(".", "vocab", "nouns-adjs");
const verbTsFiles = fs.readdirSync(verbCollectionPath);
const nounAdjTsFiles = fs.readdirSync(nounAdjCollectionPath);

const allVerbTsS = [...new Set(verbTsFiles.reduce((arr, fileName) => {
    const TsS = require("./vocab/verbs/"+fileName);
    return [...arr, ...TsS];
}, []))];

const allNounAdjTsS = [...new Set(nounAdjTsFiles.reduce((arr, fileName) => {
    const TsS = require("./vocab/nouns-adjs/"+fileName).map(x => x.ts);
    return [...arr, ...TsS];
}, []))];

fetch("https://account.lingdocs.com/dictionary/entry", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids: [...allNounAdjTsS, ...allVerbTsS] }),
}).then(res => res.json()).then(res => {
  const verbs = res.results.filter(x => "entry" in x);
  const missingEc = [];
  verbs.forEach(v => {
    if (!v.entry.ec) missingEc.push(v);
  });
  const verbsContent = `
/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { DictionaryEntry, VerbEntry } from "./types";

const verbs: {
    entry: DictionaryEntry,
    complement?: DictionaryEntry,
}[] = ${JSON.stringify(verbs)};
export default verbs as VerbEntry[];`;
  fs.writeFileSync("./src/verbs.ts", verbsContent);
  const nounsAdjs = res.results.filter(x => !("entry" in x));
  const nounsAdjsContent = `
/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { DictionaryEntry } from "./types";

const nounsAdjs: DictionaryEntry[] = ${JSON.stringify(nounsAdjs)};
export default nounsAdjs;`;
  fs.writeFileSync("./src/nouns-adjs.ts", nounsAdjsContent);
  console.log("fetched words from dictionary");
  if (missingEc.length > 0) {
    console.log("Missing ec's in verbs:");
    console.log(missingEc);
  }
});

