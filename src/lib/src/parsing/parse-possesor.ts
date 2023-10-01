import * as T from "../../../types";
import { LookupFunction } from "./lookup";
import { parseNP } from "./parse-np";
import { bindParseResult } from "./utils";
// TODO: maybe contractions should just be male to cut down on the
// alternative sentences
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
  lookup: LookupFunction,
  prevPossesor: T.PossesorSelection | undefined
): T.ParseResult<T.PossesorSelection>[] {
  if (tokens.length === 0) {
    if (prevPossesor) {
      return [
        {
          tokens,
          body: prevPossesor,
          errors: [],
        },
      ];
    }
    return [];
  }
  const [first, ...rest] = tokens;
  // parse contraction
  // then later (if possessor || contractions)
  const contractions = parseContractions(first);
  if (contractions.length) {
    const errors = prevPossesor
      ? [{ message: "a pronoun cannot have a possesor" }]
      : [];
    return contractions
      .flatMap((p) => parsePossesor(rest, lookup, p))
      .map((x) => ({
        ...x,
        errors: [...errors, ...x.errors],
      }));
  }
  if (first.s === "د") {
    const np = parseNP(rest, lookup, undefined);
    return bindParseResult(np, (tokens, body) => {
      const possesor: T.PossesorSelection = {
        shrunken: false,
        np: body.selection,
      };
      return {
        errors: !body.inflected
          ? // TODO: get ps to say which possesor
            // TODO: track the position coming from the parseNP etc for highlighting
            [{ message: `possesor should be inflected` }]
          : [],
        // add and check error - can't add possesor to pronoun
        next: parsePossesor(tokens, lookup, addPoss(prevPossesor, possesor)),
      };
    });
  }
  if (first.s === "زما") {
    return [
      {
        tokens: rest,
        body: {
          shrunken: false,
          np: {
            type: "NP",
            selection: {
              type: "pronoun",
              distance: "far",
              person: T.Person.FirstSingMale,
            },
          },
        },
        errors: [],
      },
    ];
  }
  if (prevPossesor) {
    return [
      {
        tokens,
        body: prevPossesor,
        errors: [],
      },
    ];
  }
  return [];
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
