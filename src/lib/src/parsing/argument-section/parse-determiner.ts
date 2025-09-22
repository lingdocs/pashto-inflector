import * as T from "../../../../types";
import { determiners } from "../../../../types";
import * as tp from "../../type-predicates";
import { getOneToken, returnParseResult, returnParseResults } from "../utils";

export const parseDeterminer: T.Parser<
  T.InflectableBaseParse<T.DeterminerSelection>
> = (
  tokens: T.Tokens,
  // dictionary: T.DictionaryAPI
) => {
  const [first, rest, position] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  const demonstrative = parseDemonstrative(first);
  if (demonstrative.length) {
    return returnParseResults(rest, demonstrative, position);
  }

  if (first.endsWith("و")) {
    const determiner = determiners.find((d) => d.p === first.slice(0, -1));
    if (!determiner) return [];
    if (!isInflectingDet(determiner)) return [];
    return returnParseResult(
      rest,
      {
        inflection: [2],
        gender: ["masc", "fem"],
        given: first,
        selection: {
          type: "determiner",
          determiner,
        },
      },
      position,
    );
  }
  if (first.endsWith("ې")) {
    const determinerExact = determiners.find((d) => d.p === first);
    const determinerInflected = determiners.find(
      (d) => d.p === first.slice(0, -1),
    );
    return [
      ...(determinerExact
        ? returnParseResult(
            rest,
            {
              inflection: [0, 1, 2],
              gender: ["masc", "fem"],
              given: first,
              selection: {
                type: "determiner",
                determiner: determinerExact,
              },
            } satisfies T.InflectableBaseParse<T.DeterminerSelection>,
            position,
          )
        : []),
      ...(determinerInflected && isInflectingDet(determinerInflected)
        ? returnParseResult(
            rest,
            {
              inflection: [1] satisfies (0 | 1 | 2)[],
              gender: ["fem"],
              given: first,
              selection: {
                type: "determiner",
                determiner: determinerInflected,
              },
            } satisfies T.InflectableBaseParse<T.DeterminerSelection>,
            position,
          )
        : []),
    ];
  }
  const exact: T.ParseResult<T.InflectableBaseParse<T.DeterminerSelection>>[] =
    (() => {
      const determiner = determiners.find((d) => d.p === first);
      if (!determiner) return [];
      const canInflect = isInflectingDet(determiner);
      return returnParseResult(
        rest,
        {
          inflection: canInflect ? [0, 1] : [0, 1, 2],
          gender: canInflect ? ["masc"] : ["masc", "fem"],
          given: first,
          selection: {
            type: "determiner",
            determiner,
          },
        },
        position,
      );
    })();
  const aEnding: T.ParseResult<
    T.InflectableBaseParse<T.DeterminerSelection>
  >[] = (() => {
    if (first.endsWith("ه")) {
      const determiner = determiners.find((d) => d.p === first.slice(0, -1));
      if (!determiner) return [];
      if (!isInflectingDet(determiner)) return [];
      return returnParseResult(
        rest,
        {
          inflection: [0],
          gender: ["fem"],
          given: first,
          selection: {
            type: "determiner",
            determiner,
          },
        },
        position,
      );
    }
    return [];
  })();
  return [...exact, ...aEnding];
};

function parseDemonstrative(
  token: T.Token,
): T.InflectableBaseParse<T.DeterminerSelection>[] {
  if (token === "دا") {
    return [
      {
        inflection: [0],
        gender: ["masc", "fem"],
        given: token,
        selection: {
          type: "determiner",
          determiner: { p: "دا", f: "daa", type: "det", demonstrative: true },
        },
      },
    ];
  }
  if (token === "دې") {
    return [
      {
        inflection: [1, 2],
        gender: ["masc", "fem"],
        given: token,
        selection: {
          type: "determiner",
          determiner: { p: "دا", f: "daa", type: "det", demonstrative: true },
        },
      },
    ];
  }
  const ending = token.charAt(token.length - 1);
  const demonstrative: T.Determiner | undefined = (() => {
    if (token.length !== 3 && ["ه", "ې", "و"].includes(ending)) {
      return undefined;
    }
    return token.startsWith("هغ")
      ? ({
          p: "هغه",
          f: "hágha",
          type: "det",
          demonstrative: true,
        } as const)
      : token.startsWith("دغ")
        ? ({
            p: "دغه",
            f: "dágha",
            type: "det",
            demonstrative: true,
          } as const)
        : undefined;
  })();
  if (!demonstrative) {
    return [];
  }
  if (ending === "ه") {
    return [
      {
        inflection: [0, 1],
        gender: ["masc"],
        given: token,
        selection: {
          type: "determiner",
          determiner: demonstrative,
        },
      },
      {
        inflection: [0],
        gender: ["fem"],
        given: token,
        selection: {
          type: "determiner",
          determiner: demonstrative,
        },
      },
    ];
  }
  if (ending === "ې") {
    return [
      {
        inflection: [1],
        gender: ["fem"],
        given: token,
        selection: {
          type: "determiner",
          determiner: demonstrative,
        },
      },
    ];
  }
  if (ending === "و") {
    return [
      {
        inflection: [2],
        gender: ["masc", "fem"],
        given: token,
        selection: {
          type: "determiner",
          determiner: demonstrative,
        },
      },
    ];
  }
  // shouldn't reach here
  return [];
}

function isInflectingDet(d: T.Determiner): boolean {
  return tp.isPattern1Entry(d) && !("noInf" in d && !d.noInf);
}
