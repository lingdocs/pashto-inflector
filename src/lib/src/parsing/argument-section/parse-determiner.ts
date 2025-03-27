import * as T from "../../../../types";
import { determiners } from "../../../../types";
import * as tp from "../../type-predicates";
import { returnParseResult } from "../utils";

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

function isInflectingDet(d: T.Determiner): boolean {
  return tp.isPattern1Entry(d) && !("noInf" in d && !d.noInf);
}
