import * as T from "../../types";
import { renderAdverbSelection } from "./render-ep";
import { renderSandwich } from "./render-sandwich";

export function renderAPSelection({ selection }: T.APSelection): T.Rendered<T.APSelection> {
    if (selection.type === "sandwich") {
        return {
            type: "AP",
            selection: renderSandwich(selection),
        };
    }
    return {
        type: "AP",
        selection: renderAdverbSelection(selection),
    };
}