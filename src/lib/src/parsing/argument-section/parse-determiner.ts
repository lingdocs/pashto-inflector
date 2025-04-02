import * as T from "../../../../types";
import { determiners } from "../../../../types";
import * as tp from "../../type-predicates";
import { returnParseResult, returnParseResults } from "../utils";

export const parseDeterminer: T.Parser<
  T.InflectableBaseParse<T.DeterminerSelection>
> = (
  tokens: Readonly<T.Token[]>
  // eslint-disable-next-line
  // dictionary: T.DictionaryAPI
) => {
  if (tokens.length === 0) {
    return [];
  }
  const [first, ...rest] = tokens;
  const demonstrative = parseDemonstrative(first);
  if (demonstrative.length) {
    return returnParseResults(rest, demonstrative);
  }

  if (first.s.endsWith("و")) {
    const determiner = determiners.find((d) => d.p === first.s.slice(0, -1));
    if (!determiner) return [];
    if (!isInflectingDet(determiner)) return [];
    return returnParseResult(rest, {
      inflection: [2],
      gender: ["masc", "fem"],
      given: first.s,
      selection: {
        type: "determiner",
        determiner,
      },
    });
  }
  if (first.s.endsWith("ې")) {
    const determinerExact = determiners.find((d) => d.p === first.s);
    const determinerInflected = determiners.find(
      (d) => d.p === first.s.slice(0, -1)
    );
    return [
      ...(determinerExact
        ? returnParseResult(rest, {
            inflection: [0, 1, 2],
            gender: ["masc", "fem"],
            given: first.s,
            selection: {
              type: "determiner",
              determiner: determinerExact,
            },
          } satisfies T.InflectableBaseParse<T.DeterminerSelection>)
        : []),
      ...(determinerInflected && isInflectingDet(determinerInflected)
        ? returnParseResult(rest, {
            inflection: [1] satisfies (0 | 1 | 2)[],
            gender: ["fem"],
            given: first.s,
            selection: {
              type: "determiner",
              determiner: determinerInflected,
            },
          } satisfies T.InflectableBaseParse<T.DeterminerSelection>)
        : []),
    ];
  }
  const exact: T.ParseResult<T.InflectableBaseParse<T.DeterminerSelection>>[] =
    (() => {
      const determiner = determiners.find((d) => d.p === first.s);
      if (!determiner) return [];
      const canInflect = isInflectingDet(determiner);
      return returnParseResult(rest, {
        inflection: canInflect ? [0, 1] : [0, 1, 2],
        gender: canInflect ? ["masc"] : ["masc", "fem"],
        given: first.s,
        selection: {
          type: "determiner",
          determiner,
        },
      });
    })();
  const aEnding: T.ParseResult<
    T.InflectableBaseParse<T.DeterminerSelection>
  >[] = (() => {
    if (first.s.endsWith("ه")) {
      const determiner = determiners.find((d) => d.p === first.s.slice(0, -1));
      if (!determiner) return [];
      if (!isInflectingDet(determiner)) return [];
      return returnParseResult(rest, {
        inflection: [0],
        gender: ["fem"],
        given: first.s,
        selection: {
          type: "determiner",
          determiner,
        },
      });
    }
    return [];
  })();
  return [...exact, ...aEnding];
};

function parseDemonstrative(
  token: Readonly<T.Token>
): T.InflectableBaseParse<T.DeterminerSelection>[] {
  if (!token.s) {
    return [];
  }
  if (token.s === "دا") {
    return [
      {
        inflection: [0],
        gender: ["masc", "fem"],
        given: token.s,
        selection: {
          type: "determiner",
          determiner: { p: "دا", f: "daa", type: "det", demonstrative: true },
        },
      },
    ];
  }
  if (token.s === "دې") {
    return [
      {
        inflection: [1, 2],
        gender: ["masc", "fem"],
        given: token.s,
        selection: {
          type: "determiner",
          determiner: { p: "دا", f: "daa", type: "det", demonstrative: true },
        },
      },
    ];
  }
  const ending = token.s.charAt(token.s.length - 1);
  const demonstrative: T.Determiner | undefined = (() => {
    if (token.s.length !== 3 && ["ه", "ې", "و"].includes(ending)) {
      return undefined;
    }
    return token.s.startsWith("هغ")
      ? ({
          p: "هغه",
          f: "hágha",
          type: "det",
          demonstrative: true,
        } as const)
      : token.s.startsWith("دغ")
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
        given: token.s,
        selection: {
          type: "determiner",
          determiner: demonstrative,
        },
      },
      {
        inflection: [0],
        gender: ["fem"],
        given: token.s,
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
        given: token.s,
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
        given: token.s,
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
