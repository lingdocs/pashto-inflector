import { Token } from "../../../types";
import { standardizePashto } from "../standardize-pashto";

export function tokenizer(s: string): Token[] {
  const words = standardizePashto(s)
    .trim()
    .split(/ +/)
    .filter((x) => x);
  return words as Token[];
}
