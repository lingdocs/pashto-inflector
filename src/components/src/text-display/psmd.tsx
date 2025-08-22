import Markdown from "markdown-to-jsx";
import * as T from "../../../types";
import { PsJSX, psJSXMap2 } from "./jsx-map";

export default function psmd(
  input: (T.PsString & { sub?: string }) | PsJSX
): PsJSX {
  if (
    typeof input.p === "object" ||
    typeof input.f === "object" ||
    typeof input.e === "object" ||
    typeof input.sub === "object"
  ) {
    // @ts-ignore
    return psJSXMap2(input, (s: string) => <Markdown>{s}</Markdown>);
  }
  return {
    ...input,
    p: <Markdown>{input.p}</Markdown>,
    f: <Markdown>{input.f}</Markdown>,
    ...(input.e
      ? {
        e: <Markdown>{input.e}</Markdown>,
      }
      : {}),
    ...(input.sub
      ? {
        sub: <Markdown>{input.sub}</Markdown>,
      }
      : {}),
  };
}
