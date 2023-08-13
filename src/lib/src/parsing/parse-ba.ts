import * as T from "../../../types";

export function parseBa(
  tokens: Readonly<T.Token[]>
): T.ParseResult<{ type: "ba" }>[] {
  if (!tokens.length) {
    return [];
  }
  const [first, ...rest] = tokens;
  if (first.s === "به") {
    return [
      {
        body: {
          type: "ba",
        },
        errors: [],
        tokens: rest,
      },
    ];
  } else return [];
}
