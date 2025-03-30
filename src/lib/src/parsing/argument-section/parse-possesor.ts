import * as T from "../../../../types";
import { parseNP } from "./parse-np";
import { bindParseResult, returnParseResultSingle } from "../utils";
// TODO: maybe contractions should just be male to cut down on the
// alternative sentences
// TODO: be able to parse khpul etc
const contractions: [string[], T.Person[]][] = [
  [["زما"], [T.Person.FirstSingMale, T.Person.FirstSingFemale]],
  [["ستا"], [T.Person.SecondSingMale, T.Person.SecondSingFemale]],
  [
    ["زمونږ", "زموږ"],
    [T.Person.FirstPlurMale, T.Person.FirstPlurFemale],
  ],
  [
    ["ستاسو", "ستاسې"],
    [T.Person.SecondPlurMale, T.Person.SecondPlurFemale],
  ],
];

export function parsePossesor(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI
): T.ParseResult<T.PossesorSelection>[] {
  if (tokens.length === 0) {
    return [];
  }
  return parsePossesorR(tokens, dictionary, undefined);
}

function parsePossesorR(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  prevPossesor: T.ParseResult<T.PossesorSelection> | undefined
): T.ParseResult<T.PossesorSelection>[] {
  if (tokens.length === 0) {
    if (prevPossesor) {
      return [prevPossesor];
    }
    return [];
  }
  const [first, ...rest] = tokens;
  // parse contraction
  // then later (if possessor || contractions)
  const contractions = parseContractions(first);
  if (contractions.length) {
    if (prevPossesor) {
      return [];
    }
    return contractions.flatMap((p) =>
      parsePossesorR(rest, dictionary, returnParseResultSingle(rest, p))
    );
  }
  if (first.s === "د") {
    const np = parseNP(rest, dictionary, undefined);
    return bindParseResult(np, (tkns, body) => {
      const possesor: T.PossesorSelection = addPoss(prevPossesor?.body, {
        type: "possesor",
        shrunken: false,
        np: body.selection,
      });
      const errors: T.ParseError[] = [
        ...(prevPossesor ? prevPossesor.errors : []),
        ...(!body.inflected
          ? // TODO: get ps to say which possesor
            // TODO: track the position coming from the parseNP etc for highlighting
            [{ message: `possesor should be inflected` }]
          : []),
      ];
      const p = returnParseResultSingle(tkns, possesor, errors);
      const ahead = parsePossesorR(tkns, dictionary, p);
      return ahead.length ? ahead : [];
    });
  }
  return prevPossesor ? [prevPossesor] : [];
}

function addPoss(
  possesor: T.PossesorSelection | undefined,
  possesorOf: T.PossesorSelection
): T.PossesorSelection {
  return {
    ...possesorOf,
    ...(possesorOf.np.selection.type !== "pronoun"
      ? {
          np: {
            ...possesorOf.np,
            selection: {
              ...possesorOf.np.selection,
              possesor,
            },
          },
        }
      : {}),
  };
}

function parseContractions({ s }: T.Token): T.PossesorSelection[] {
  const c = contractions.find(([ps]) => ps.includes(s));
  if (!c) {
    return [];
  }
  return c[1].map((person) => ({
    type: "possesor",
    shrunken: false,
    np: {
      type: "NP",
      selection: {
        type: "pronoun",
        distance: "far",
        person,
      },
    },
  }));
}
