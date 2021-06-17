import * as T from "../types";
// @ts-ignore
import * as protoModels from "./dictionary-models.js";
import Pbf from "pbf";

export function writeDictionary(dictionary: T.Dictionary): ArrayBuffer {
    const pbfDict = new Pbf();
    protoModels.Dictionary.write(dictionary, pbfDict);
    const buffer = pbfDict.finish();
    return buffer;
}

export function readDictionary(buffer: Uint8Array): T.Dictionary {
    const pbf = new Pbf(buffer);
    const dictionary = protoModels.Dictionary.read(pbf) as T.Dictionary;
    return dictionary;
}

export function writeDictionaryInfo(dictionary: T.DictionaryInfo): ArrayBuffer {
    const pbfDict = new Pbf();
    protoModels.DictionaryInfo.write(dictionary, pbfDict);
    const buffer = pbfDict.finish();
    return buffer;
}

export function readDictionaryInfo(buffer: Uint8Array): T.DictionaryInfo {
    const pbf = new Pbf(buffer);
    const dictionaryInfo = protoModels.DictionaryInfo.read(pbf) as T.DictionaryInfo;
    return dictionaryInfo;
}