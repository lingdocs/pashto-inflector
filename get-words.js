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
const verbCollectionPath = path.join(".", "verbs");
const nounAdjCollectionPath = path.join(".", "nouns-adjs");
const verbTsFiles = fs.readdirSync(verbCollectionPath);
const nounAdjTsFiles = fs.readdirSync(nounAdjCollectionPath);
const protoModels = require("./src/lib/dictionary-models.js");
const Pbf = require("pbf");

const allVerbTsS = [...new Set(verbTsFiles.reduce((arr, fileName) => {
    const TsS = require("./verbs/"+fileName);
    return [...arr, ...TsS];
}, []))];

const allNounAdjTsS = [...new Set(nounAdjTsFiles.reduce((arr, fileName) => {
    const TsS = require("./nouns-adjs/"+fileName).map(x => x.ts);
    return [...arr, ...TsS];
}, []))];

fetch(process.env.LINGDOCS_DICTIONARY_URL).then(res => res.arrayBuffer()).then(buffer => {
  const pbf = new Pbf(buffer);
  const dictionary = protoModels.Dictionary.read(pbf);
  const entries = dictionary.entries;
  const allVerbs = getVerbsFromTsS(entries, allVerbTsS);
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
}[] = ${JSON.stringify(allVerbs)};
export default verbs as VerbEntry[];`;
  fs.writeFileSync("./src/verbs.ts", verbsContent);
  const allNounsAdjs = getNounsAdjsFromTsS(entries, allNounAdjTsS);
  const nounsAdjsContent = `
/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { DictionaryEntry } from "./types";

const nounsAdjs: DictionaryEntry[] = ${JSON.stringify(allNounsAdjs)};
export default nounsAdjs;`;
  fs.writeFileSync("./src/nouns-adjs.ts", nounsAdjsContent);
  console.log("fetched words from dictionary");
});

function getNounsAdjsFromTsS(entries, tss) {
    const missingEc = [];
    const toReturn = tss.map(ts => {
        const entry = entries.find(x => ts === x.ts);
        if (!entry) {
            console.log("couldn't find ts", ts);
            return undefined;
        }
        if (ts.ec) {
            missingEc.push(ts);
        }
        return entry;
    }).filter(x => x);
    if (missingEc.length !== 0) {
        console.log("missingEc", missingEc);
    }
    return toReturn;

}

function getVerbsFromTsS(entries, tss) {
    const missingEc = [];
    const toReturn = tss.map(ts => {
        const entry = entries.find(x => ts === x.ts);
        if (!entry.ec) {
            missingEc.push(entry.ts);
        }
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
    if (missingEc.length !== 0) {
        console.log("missingEc", missingEc);
    }
    return toReturn;

}
