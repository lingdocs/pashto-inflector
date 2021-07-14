import {
    searchConjugation,
} from "./search-conjugation";
import {
    conjugateVerb,
} from "./verb-conjugation";

test("combo verbs should be searchable", () => {
    const conjugation = conjugateVerb(
        { i: 0, ts: 0, p: "قتل کول", f: "qatul kawul", e:"to kill", g: "qatil kawul", c: "v. dyn./stat. comp. trans.", l: 2 },
        { i: 1, ts: 2, p: "قتل", f: "qatul", e: "murder", g: "qatul", c: "n. m." },    
    );
    // console.log(conjugation);
    // @ts-ignore
    const { grammaticallyTransitive, transitive } = conjugation;
    // console.log(JSON.stringify(grammaticallyTransitive, null, "  "));
    // @ts-ignore
    const result = searchConjugation(conjugation, "ولیدل");
    expect(result).toBeTruthy();
});