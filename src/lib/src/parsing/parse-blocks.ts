import * as T from "../../../types";
import { parseBlock } from "./parse-block";
import { parseKidsSection } from "./parse-kids-section";
import { bindParseResult, returnParseResult } from "./utils";

export function parseBlocks(
  tokens: Readonly<T.Token[]>,
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[],
  verbLookup: (s: string) => T.VerbEntry[],
  prevBlocks: (
    | {
        inflected: boolean;
        selection: T.NPSelection;
      }
    | {
        type: "PH";
        s: string;
      }
    | Omit<T.VBE, "ps">
  )[],
  kids: T.ParsedKid[]
): T.ParseResult<{
  kids: T.ParsedKid[];
  blocks: (
    | {
        inflected: boolean;
        selection: T.NPSelection;
      }
    | {
        type: "PH";
        s: string;
      }
    | Omit<T.VBE, "ps">
  )[];
}>[] {
  if (tokens.length === 0) {
    // console.log("at end", { prevBlocks, kids });
    return returnParseResult(tokens, { blocks: prevBlocks, kids });
  }

  const block = parseBlock(tokens, lookup, verbLookup);
  const kidsR = parseKidsSection(tokens, []);
  const allResults = [...block, ...kidsR] as T.ParseResult<
    | [
        {
          inflected: boolean;
          selection: T.NPSelection;
        }
      ]
    | [
        (
          | {
              type: "PH";
              s: string;
            }
          | undefined
        ),
        Omit<T.VBE, "ps">
      ]
    | []
    | { kids: T.ParsedKid[] }
  >[];
  if (!allResults.length) {
    return [
      {
        tokens: [],
        body: { blocks: prevBlocks, kids },
        errors: [],
      },
    ];
  }
  return bindParseResult(allResults, (tokens, r) => {
    if ("kids" in r) {
      return {
        next: parseBlocks(tokens, lookup, verbLookup, prevBlocks, [
          ...kids,
          ...r.kids,
        ]),
        errors:
          prevBlocks.length !== 1
            ? [{ message: "kids' section out of place" }]
            : [],
      };
    }
    // filter out the empty PH pieces
    // for some reason ts won't let me do filter here
    const newBlocks = r.flatMap((x) => (x ? [x] : []));
    return parseBlocks(
      tokens,
      lookup,
      verbLookup,
      [...prevBlocks, ...newBlocks],
      kids
    );
  });
}
