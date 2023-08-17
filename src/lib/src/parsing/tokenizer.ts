import { Token } from "../../../types";
import { standardizePashto } from "../standardize-pashto";

export function tokenizer(s: string): Token[] {
  const words = standardizePashto(s)
    .trim()
    .split(/ +/)
    .filter((x) => x);
  const indexed: { i: number; s: string }[] = [];
  for (let i = 0; i < words.length; i++) {
    indexed.push({ i, s: words[i] });
  }
  return indexed;
}
