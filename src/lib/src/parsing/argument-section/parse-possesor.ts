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
  return parsePossesorR(dictionary, {
    tokens,
    body: undefined,
    errors: [],
  });
}

function parsePossesorR(
  dictionary: T.DictionaryAPI,
  prev: T.ParseResult<T.PossesorSelection | undefined>
): T.ParseResult<T.PossesorSelection>[] {
  if (prev.tokens.length === 0) {
    if (prev.body) {
      // need to do this for ts inference
      return [
        {
          tokens: prev.tokens,
          body: prev.body,
          errors: prev.errors,
        },
      ];
    }
    return [];
  }
  const contractions = parseContractions(prev.tokens);
  if (contractions.length) {
    if (prev.body) {
      return [];
    }
    return bindParseResult(contractions, (tkns, p) =>
      parsePossesorR(dictionary, returnParseResultSingle(tkns, p))
    );
  }
  const [first, ...rest] = prev.tokens;
  // parse contraction
  // then later (if possessor || contractions)

  if (first.s === "د") {
    const np = parseNP(rest, dictionary, undefined);
    return bindParseResult(np, (tkns, body) => {
      const possesor: T.PossesorSelection = addPoss(prev.body, {
        type: "possesor",
        shrunken: false,
        np: body.selection,
      });
      const errors: T.ParseError[] = [
        ...prev.errors,
        ...(!body.inflected
          ? // TODO: get ps to say which possesor
            // TODO: track the position coming from the parseNP etc for highlighting
            [{ message: `possesor should be inflected` }]
          : []),
      ];
      const p = returnParseResultSingle(tkns, possesor, errors);
      const ahead = parsePossesorR(dictionary, p);
      return ahead.length ? ahead : [];
    });
  }
  return prev.body
    ? [
        // need to do this for ts inference
        {
          tokens: prev.tokens,
          body: prev.body,
          errors: prev.errors,
        },
      ]
    : [];
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

function parseContractions(
  tokens: Readonly<T.Token[]>
): T.ParseResult<T.PossesorSelection>[] {
  const [first, ...rest] = tokens;
  const c = contractions.find(([ps]) => ps.includes(first.s));
  if (!c) {
    return [];
  }
  return c[1].map((person) =>
    returnParseResultSingle(rest, {
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
    })
  );
}
