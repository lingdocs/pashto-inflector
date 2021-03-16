import {
    writeDictionaryInfo,
    readDictionaryInfo,
    writeDictionary,
    readDictionary,
} from "./protobuf";
import * as T from "../types";

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
        {"i":616,"ts":1527813108,"p":"اظهار","f":"izháar","g":"izhaar","e":"expression, statement, declaration","c":"n. m."},
    ],
}

test("should encode and decode", () => {
    expect(readDictionaryInfo(writeDictionaryInfo(sampleDictionaryInfo))).toEqual(sampleDictionaryInfo);
    expect(readDictionary(writeDictionary(sampleDictionary))).toEqual(sampleDictionary);
});