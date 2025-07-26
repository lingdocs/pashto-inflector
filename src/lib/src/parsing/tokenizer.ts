import * as T from "../../../types";
import { standardizePashto } from "../standardize-pashto";

export function tokenizer(s: string): T.Tokens {
  const tokens = standardizePashto(s)
    .trim()
    .split(/ +/)
    .filter((x) => x);
  return {
    position: 0,
    tokens: tokens as T.Token[],
  };
}
