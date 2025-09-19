import * as T from "../../../types";
import { parseKid } from "./parse-kid";
import {
  bindParseResult,
  nulPosFromTokens,
  posFromAccumulator,
  returnParseResult,
  tokensExist,
} from "./utils";

export const unambiguousKids = ["به", "مې", "مو"];

export function parseKidsSection(
  tokens: T.Tokens,
  prevKids: T.WithPos<T.ParsedKid>[],
  errors: T.ParseError[],
): T.ParseResult<T.ParsedKidsSection>[] {
  if (!tokensExist(tokens)) {
    return [];
  }
  const parsedKid = parseKid(tokens);
  if (!parsedKid.length) {
    return [];
  }
  return bindParseResult(parsedKid, (tkns, r) => {
    if (r.content === undefined) {
      return returnParseResult(
        tokens,
        {
          type: "kids" as const,
          kids: prevKids.map((x) => x.content),
        },
        posFromAccumulator(tokens, prevKids),
      );
    }
    // return parseKidsSection(tokens, [...prevKids, r]);
    const errorsN = [
      ...errors,
      ...(kidDoubled(
        r.content,
        prevKids.map((x) => x.content),
      )
        ? [{ message: `double '${r.content}' in kids section` }]
        : !kidComesBehind(r.content, prevKids.map((x) => x.content).at(-1))
          ? [{ message: "kids section out of order" }]
          : []),
    ];
    // return one option of stopping with current kids section, and try one option of keeping on going
    const kidsSoFar: T.WithPos<T.ParsedKid>[] = [
      ...prevKids,
      r as T.WithPos<T.ParsedKid> /* because we checked it above */,
    ];
    const forSureKeepParsing = unambiguousKids.includes(
      tkns.tokens[tkns.position],
    );
    return [
      ...(!forSureKeepParsing
        ? returnParseResult(
            tkns,
            {
              type: "kids",
              kids: kidsSoFar.map((x) => x.content),
            } satisfies T.ParsedKidsSection,
            { start: tokens.position, end: tkns.position },
            errorsN,
          )
        : []),
      ...parseKidsSection(tkns, kidsSoFar, errorsN),
    ];
  });
}

export function parseOptKidsSection(
  tokens: T.Tokens,
): T.ParseResult<T.ParsedKidsSection | undefined>[] {
  const res = parseKidsSection(tokens, [], []);
  const nullPos = nulPosFromTokens(tokens);
  if (!res.length) {
    return [
      {
        tokens,
        body: undefined,
        errors: [],
        position: nullPos,
      },
    ];
  }
  return [...res, { tokens, body: undefined, errors: [], position: nullPos }];
}

function kidDoubled(k: T.ParsedKid, prev: T.ParsedKid[]): boolean {
  return !!prev.find((x) => x === k);
}

const kidsOrder: T.ParsedKid[] = ["ba", "me", "de", "ye"];
function getKidRank(k: T.ParsedKid): number {
  if (k === "mU") {
    return 1;
  }
  return kidsOrder.indexOf(k);
}

function kidComesBehind(
  k: T.ParsedKid,
  prev: T.ParsedKid | undefined,
): boolean {
  if (!prev) {
    return true;
  }
  return getKidRank(k) >= getKidRank(prev);
}
