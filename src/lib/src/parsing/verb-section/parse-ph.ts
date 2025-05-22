import * as T from "../../../../types";
import { fmapParseResult } from "../../fp-ps";
import { parseAdjective } from "../argument-section/parse-adjective-new";
import { parseLocAdverb } from "../argument-section/parse-adverb";
import { returnParseResult } from "../utils";

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
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.ParsedPH>[] {
  return [
    ...parseVerbPH(tokens),
    ...parseCompPH(tokens, dictionary)
  ];
}

function parseCompPH(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
): T.ParseResult<T.ParsedCompPH>[] {
  const res: T.ParseResult<T.ParsedCompPH["selection"]>[] =
    [
      ...parseAdjective(tokens, dictionary),
      ...parseLocAdverb(tokens, dictionary),
    ];
  return fmapParseResult(
    selection => ({
      type: "CompPH",
      selection,
    }),
    res
  )
}

function parseVerbPH(
  tokens: Readonly<T.Token[]>
): T.ParseResult<T.ParsedVerbPH>[] {
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
