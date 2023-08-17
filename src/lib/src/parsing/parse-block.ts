import * as T from "../../../types";
import { fmapParseResult } from "../fp-ps";
import { parseNP } from "./parse-np";
import { parseVerb } from "./parse-verb";

export function parseBlock(
  tokens: Readonly<T.Token[]>,
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[],
  verbLookup: (s: string) => T.VerbEntry[]
): T.ParseResult<
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
>[] {
  if (tokens.length === 0) {
    return [
      {
        tokens: [],
        body: [],
        errors: [],
      },
    ];
  }

  return [
    ...(fmapParseResult((x) => [x], parseNP(tokens, lookup)) as T.ParseResult<
      [
        {
          inflected: boolean;
          selection: T.NPSelection;
        }
      ]
    >[]),
    ...(parseVerb(tokens, verbLookup) as T.ParseResult<
      [
        (
          | {
              type: "PH";
              s: string;
            }
          | undefined
        ),
        Omit<T.VBE, "ps">
      ]
    >[]),
  ];
}
