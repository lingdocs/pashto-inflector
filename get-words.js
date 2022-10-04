/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import fs from "fs";
import fetch from "node-fetch";
import allVerbTsS from "./verbs/verbs.js";
import aFem from "./nouns-adjs/a-fem.js";
import aaFem from "./nouns-adjs/aa-fem.js";
import aanuUnisex from "./nouns-adjs/aanu-unisex.js";
import adverbs from "./nouns-adjs/adverbs.js";
import basicFem from "./nouns-adjs/basic-fem.js";
import basicUnisex from "./nouns-adjs/basic-unisex.js";
import eFem from "./nouns-adjs/e-fem.js";
import eeFem from "./nouns-adjs/ee-fem.js";
import exceptionPeopleFem from "./nouns-adjs/exception-people-fem.js";
import exceptionPeopleMasc from "./nouns-adjs/exception-people-masc.js";
import eyMasc from "./nouns-adjs/ey-masc.js";
import eyStressedUnisex from "./nouns-adjs/ey-stressed-unisex.js";
import eyUnstressedUnisex from "./nouns-adjs/ey-unstressed-unisex.js";
import locAdverbs from "./nouns-adjs/loc-adverbs.js";
import nonInflecting from "./nouns-adjs/non-inflecting.js";
import nounsUnisex from "./nouns-adjs/nouns-unisex.js";
import oFem from "./nouns-adjs/o-fem.js";
import shortIrregUnisex from "./nouns-adjs/short-irreg-unisex.js";
import uMasc from "./nouns-adjs/u-masc.js";
import uyFem from "./nouns-adjs/uy-fem.js";
import yMasc from "./nouns-adjs/y-masc.js";

import * as protoModels from "./src/lib/dictionary-models.js";
import Pbf from "pbf";

const allNounAdjTsS = [
    ...aFem,
    ...aaFem,
    ...aanuUnisex,
    ...adverbs,
    ...basicFem,
    ...basicUnisex,
    ...eFem,
    ...eeFem,
    ...exceptionPeopleFem,
    ...exceptionPeopleMasc,
    ...eyMasc,
    ...eyStressedUnisex,
    ...eyUnstressedUnisex,
    ...locAdverbs,
    ...nonInflecting,
    ...nounsUnisex,
    ...oFem,
    ...shortIrregUnisex,
    ...uMasc,
    ...uyFem,
    ...yMasc,
].map(x => x.ts);

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
