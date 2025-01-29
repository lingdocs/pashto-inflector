import * as T from "../../../types";
import { returnParseResult } from "./utils";

const phs = [
  "و",
  "وا",
  "کې",
  "یو",
  "بو",
  "څم",
  "پرې",
  "کښې",
  "در",
  "را",
  "ور",
  "پرا",
  "لا",
  "لاړ",
  "لاړه",
  "لاړې",
];

export function parsePH(
  tokens: Readonly<T.Token[]>
): T.ParseResult<T.ParsedPH>[] {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (phs.includes(first.s)) {
    return returnParseResult(rest, {
      type: "PH",
      s: first.s,
    });
  }
  // TODO: maybe it would be better to only do this splitting off of the perfect head
  // if the next thing could be a kids section
  return phs
    .filter((p) => first.s.startsWith(p) && first.s.length > p.length)
    .flatMap((ph) =>
      returnParseResult(
        [
          {
            ...first,
            s: first.s.slice(ph.length),
          },
          ...rest,
        ],
        {
          type: "PH",
          s: ph,
        } as const
      )
    );
}
