import { searchConjugation } from "./search-conjugation";
import { conjugateVerb } from "./verb-conjugation";
import { inflectWord } from "./pashto-inflector";
import * as T from "../types";

test("search should find form", () => {
    const conjugation = conjugateVerb(
        { i: 0, ts: 1, p: "لیکل", f: "leekul", g: "leekul", e: "to write", c: "v. trans."},
        "aay",
    );
    const result = searchConjugation(conjugation as any, "لیکلای شي");
    console.log(JSON.stringify(result));
    expect(result).toBeTruthy();
    const inflection = inflectWord({ i: 0, ts: 1, p: "غټ", f: "ghuT", g: "ghuT", e: "big", c: "adj." }) as T.Inflections;
    const iResult = searchConjugation(inflection, "غټو");
    console.log(JSON.stringify(iResult));
    // expect(searchConjugation(conjugation, "ولیکلې"))
    //     .toEqual([{
    //         form: ["perfective", "past", "long"],
    //         person: T.Person.ThirdPlurFemale,
    //     }]);
    // expect(searchConjugation(conjugation, "ولیکلو"))
    //     .toEqual([{
    //         form: ["perfective", "past", "long"],
    //         person: T.Person.ThirdSingMale,
    //     }]);
})