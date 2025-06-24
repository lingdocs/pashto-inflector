import * as T from "../../../../types";

export function getInfoFromV<X extends T.VerbX>(v: T.ParsedV<X>): X["info"] {
  return v.content.type === "active basic"
    ? v.content.content.info
    : v.content.content.right.info;
}
