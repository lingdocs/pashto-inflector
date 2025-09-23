import * as T from "../../../../types";
import { parseAdjective } from "../argument-section/parse-adjective";
import { parseLocAdverb } from "../argument-section/parse-adverb";
import {
  getOneToken,
  mapParser,
  parserCombOr,
  returnParseResult,
  returnParseResults,
} from "../utils";

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
];

const laars = ["لاړ", "لاړه", "لاړې"];

const parseCompPH: T.Parser<T.ParsedCompPH> = mapParser(
  (selection) => ({
    type: "CompPH",
    selection,
  }),
  parserCombOr<T.ParsedCompPH["selection"]>([parseAdjective, parseLocAdverb]),
);

export const parsePH: T.Parser<T.ParsedPH> = parserCombOr<T.ParsedPH>([
  parseVerbPH,
  parseCompPH,
]);

function parseVerbPH(tokens: T.Tokens): T.ParseResult<T.ParsedVerbPH>[] {
  const [first, rest, firstPos] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (laars.includes(first)) {
    return [
      ...returnParseResults<T.ParsedVerbPH>(
        splitOffHead("لا", tokens),
        [
          {
            type: "PH",
            s: "لا",
          },
        ],
        firstPos,
      ),
      ...returnParseResults<T.ParsedVerbPH>(
        {
          ...tokens,
          position: tokens.position + 1,
        },
        [
          {
            type: "PH",
            s: first,
          },
        ],
        firstPos,
      ),
    ];
  }
  if (phs.includes(first)) {
    return returnParseResult(
      rest,
      {
        type: "PH",
        s: first,
      },
      firstPos,
    );
  }
  // TODO: maybe it would be better to only do this splitting off of the perfect head
  // if the next thing could be a kids section
  return phs
    .filter(
      (p) =>
        first.startsWith(p) &&
        // to prevent the split off of و on things like وي ... but could we be more aggressive? needs at least 2 more chars, to prevent ولم etc?
        first.length > p.length + 1,
    )
    .flatMap((ph) =>
      returnParseResult(
        splitOffHead(ph, tokens),
        {
          type: "PH",
          s: ph,
        } as const,
        firstPos,
      ),
    );
}

function splitOffHead(ph: string, tokens: T.Tokens): T.Tokens {
  return {
    tokens: [
      // don't touch the tokens before the postion
      ...tokens.tokens.slice(0, tokens.position),
      // make the broken off PH into a seperate token
      tokens.tokens[tokens.position].slice(0, ph.length) as T.Token,
      // make the piece after the broken off PH into a seperate token
      tokens.tokens[tokens.position].slice(ph.length) as T.Token,
      // put the rest of the tokens in
      ...tokens.tokens.slice(tokens.position + 1),
    ],
    position: tokens.position + 1,
  };
}
