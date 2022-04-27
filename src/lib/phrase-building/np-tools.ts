import * as T from "../../types";
import { concatPsString } from "../p-text-helpers";

export function getPashtoFromRendered(np: T.Rendered<T.NPSelection | T.EqCompSelection>): T.PsString[] {
    const adjs = np.adjectives;
    if (!adjs) {
        return np.ps;
    }
    return np.ps.map(p => (
        concatPsString(
            adjs.reduce((accum, curr) => (
                // TODO: with variations of adjs?
                concatPsString(accum, " ", curr.ps[0])
            ), { p: "", f: "" }),
            " ",
            p,
        )
    ));
}

export function getEnglishFromRendered(np: T.Rendered<T.NPSelection | T.EqCompSelection>): string | undefined {
    if (!np.e) return undefined;
    if (np.type === "noun") {
        try {
            // split out the atricles so adjectives can be stuck inbetween them and the word
            const chunks = np.e.split("the)");
            const [articles, word] = chunks.length === 1
                ? ["", np.e]
                : [chunks[0] + "the) ", chunks[1]];
            const adjs = !np.adjectives
                ? ""
                : np.adjectives.reduce((accum, curr): string => {
                    if (!curr.e) throw new Error("no english for adjective");
                    return accum + curr.e + " ";
                }, "");
            return `${articles}${adjs}${word}`;
        } catch (e) {
            return undefined;
        }
    }
    return np.e;
}