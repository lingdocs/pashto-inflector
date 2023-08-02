import { Token } from "../../../types";

export function tokenizer(s: string): Token[] {
  const words = s.trim().split(/ +/);
  const indexed: { i: number; s: string }[] = [];
  for (let i = 0; i < words.length; i++) {
    indexed.push({ i, s: words[i] });
  }
  return indexed;
}
