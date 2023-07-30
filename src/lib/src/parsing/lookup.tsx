import nounsAdjs from "../../../nouns-adjs";
import * as T from "../../../types";

export function lookup(s: Partial<T.DictionaryEntry>): T.DictionaryEntry[] {
  const [key, value] = Object.entries(s)[0];
  // @ts-ignore
  return nounsAdjs.filter((e) => e[key] === value) as T.DictionaryEntry[];
}
