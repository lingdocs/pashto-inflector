import * as T from "../../types";
// @ts-ignore
import { Dictionary, DictionaryInfo } from "./dictionary-models";
import Pbf from "pbf";

export function writeDictionary(dictionary: T.Dictionary): ArrayBuffer {
  const pbfDict = new Pbf();
  // @ts-ignore
  Dictionary.write(dictionary, pbfDict);
  const buffer = pbfDict.finish();
  return buffer;
}

export function readDictionary(buffer: Uint8Array): T.Dictionary {
  const pbf = new Pbf(buffer);
  // @ts-ignore
  const dictionary = Dictionary.read(pbf) as T.Dictionary;
  return dictionary;
}

export function writeDictionaryInfo(dictionary: T.DictionaryInfo): ArrayBuffer {
  const pbfDict = new Pbf();
  // @ts-ignore
  DictionaryInfo.write(dictionary, pbfDict);
  const buffer = pbfDict.finish();
  return buffer;
}

export function readDictionaryInfo(buffer: Uint8Array): T.DictionaryInfo {
  const pbf = new Pbf(buffer);
  // @ts-ignore
  const dictionaryInfo = DictionaryInfo.read(pbf) as T.DictionaryInfo;
  return dictionaryInfo;
}
