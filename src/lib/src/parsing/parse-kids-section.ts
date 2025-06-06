import * as T from "../../../types";
import { parseKid } from "./parse-kid";
import { bindParseResult, returnParseResult } from "./utils";

export function parseKidsSection(
  tokens: Readonly<T.Token[]>,
  prevKids: T.ParsedKid[],
  errors: T.ParseError[]
): T.ParseResult<T.ParsedKidsSection>[] {
  if (tokens.length === 0) {
    return prevKids.length
      ? returnParseResult(tokens, { type: "kids", kids: prevKids }, errors)
      : [];
  }
  const parsedKid = parseKid(tokens);
  // TODO: is this even necessary ??
  if (!parsedKid.length) {
    return prevKids.length
      ? returnParseResult(tokens, { type: "kids", kids: prevKids }, errors)
      : [];
  }
  return bindParseResult(parsedKid, (tokens, r) => {
    // return parseKidsSection(tokens, [...prevKids, r]);
    const errorsN = [
      ...errors,
      ...(kidDoubled(r, prevKids)
        ? [{ message: `double '${r}' in kids section` }]
        : !kidComesBehind(r, prevKids.at(-1))
          ? [{ message: "kids section out of order" }]
          : []),
    ];
    return parseKidsSection(tokens, [...prevKids, r], errorsN);
  });
}

export function parseOptKidsSection(
  tokens: readonly T.Token[],
): T.ParseResult<T.ParsedKidsSection | undefined>[] {
  const res = parseKidsSection(tokens, [], []);
  if (!res.length) {
    return [{ tokens, body: undefined, errors: [] }];
  }
  return res;
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
  prev: T.ParsedKid | undefined
): boolean {
  if (!prev) {
    return true;
  }
  return getKidRank(k) >= getKidRank(prev);
}
