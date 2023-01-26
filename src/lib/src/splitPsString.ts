import * as T from "../../types";

export function splitPsString(ps: T.PsStringNoFVars): T.PsWord[] {
    const pWords = ps.p.split(" ");
    const fWords = ps.f.split(" ");
    const psWords: T.PsWord[] = [];
    let pIndex = 0;
    let fIndex = 0;
    function processHyphen() {
        const [firstChunk, ...restChunks] = fWords[fIndex].split("-");
        const hyphenWord: T.PsWord & { hyphen: T.HyphenPsContent[] } = {
            p: pWords[pIndex],
            f: firstChunk,
            hyphen: [],
        };
        pIndex++;
        restChunks.forEach((chunk, i) => {
            const isNotLast = i < (restChunks.length - 1);
            if (["e", "i", "ye"].includes(chunk) && isNotLast) {
                hyphenWord.hyphen.push({
                    type: "unwritten",
                    f: chunk,
                });
            } else {
                hyphenWord.hyphen.push({
                    type: "written",
                    f: chunk,
                    p: pWords[pIndex],
                });
                pIndex++;
            }
        });
        psWords.push(hyphenWord);
        fIndex++;
    }
    while (pIndex < pWords.length && fIndex < fWords.length) {
        if (fWords[fIndex] === "..." && pWords[pIndex] === "...") {
            pIndex++;
            fIndex++;
            continue;
        }
        if (fWords[fIndex].includes("-")) {
            processHyphen();
            continue;
        }
        psWords.push({
            p: pWords[pIndex],
            f: fWords[fIndex],
        });
        pIndex++;
        fIndex++;
    }
    // should have processed all the p an f words
    if (pIndex !== pWords.length || fIndex !== fWords.length) {
        throw new Error("spacing discrepency");
    }
    return psWords;
}