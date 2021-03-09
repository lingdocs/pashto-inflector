/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const fs = require("fs");
const fetch = require("node-fetch");
const path = require("path");
const collectionPath = path.join(".", "verbs");
const verbTsFiles = fs.readdirSync(collectionPath)

const allTsS = [...new Set(verbTsFiles.reduce((arr, fileName) => {
    const TsS = require("./verbs/"+fileName);
    return [...arr, ...TsS];
}, []))];

fetch(process.env.LINGDOCS_DICTIONARY_URL).then(res => res.json()).then(data => {
  const entries = data.entries;
  const allVerbs = getFromTsS(entries);
  const content = `
/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { DictionaryEntry } from "./types";

const verbs: {
    entry: DictionaryEntry,
    complement?: DictionaryEntry,
}[] = ${JSON.stringify(allVerbs)};
export default verbs;`;
  fs.writeFileSync("./src/verbs.ts", content);
  console.log("fetched verbs from dictionary");
});

function getFromTsS(entries) {
    return allTsS.map(ts => {
        const entry = entries.find(x => ts === x.ts);
        if (!entry) {
            console.log("couldn't find ts", ts);
            return undefined;
        }
        if (entry.c && entry.c.includes("comp.")) {
            const complement = entries.find(x => entry.l === x.ts);
            return {
                entry,
                complement,
            };
        }
        return { entry };
    }).filter(x => x);
}
