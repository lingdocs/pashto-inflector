import * as T from "../../types";
import { renderAdverbSelection } from "./render-ep";
import { renderSandwich } from "./render-sandwich";

export function renderAPSelection(ap: T.APSelection): T.Rendered<T.APSelection> {
    if (ap.type === "sandwich") {
        return renderSandwich(ap);
    }
    // if (ap.type === "adverb") {
        return renderAdverbSelection(ap);
    // }
}