import {
  writeDictionaryInfo,
  readDictionaryInfo,
  writeDictionary,
  readDictionary,
} from "./protobuf";
import * as T from "../../types";

const sampleDictionaryInfo: T.DictionaryInfo = {
  title: "Sample Dictionary",
  license: "none",
  url: "https://www.example.com",
  infoUrl: "https://www.example.com",
  release: 1,
  numberOfEntries: 5,
};

const sampleDictionary: T.Dictionary = {
  info: sampleDictionaryInfo,
  entries: [
    {
      i: 616,
      ts: 1527813108,
      p: "اظهار",
      f: "izháar",
      g: "izhaar",
      e: "expression, statement, declaration",
      c: "n. m.",
      ec: "cool",
      a: 1,
    },
  ],
};

test("should encode and decode", () => {
  expect(
    readDictionaryInfo(writeDictionaryInfo(sampleDictionaryInfo) as Uint8Array)
  ).toEqual(sampleDictionaryInfo);
  expect(
    readDictionary(writeDictionary(sampleDictionary) as Uint8Array)
  ).toEqual(sampleDictionary);
});
