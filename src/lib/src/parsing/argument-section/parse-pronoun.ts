import * as T from "../../../../types";
import { getOneToken } from "../utils";

type Result = ReturnType<typeof parsePronoun>[number];
export type PronounResult = {
  inflected: boolean;
  selection: T.PronounSelection;
};

// TODO: add chaa
export function parsePronoun(tokens: T.Tokens): T.ParseResult<PronounResult>[] {
  const [s, rest, position] = getOneToken(tokens);
  if (!s) {
    return [];
  }
  if (s === "زه") {
    return [0, 1].map((person) => ({
      tokens: rest,
      body: {
        inflected: false,
        selection: {
          type: "pronoun",
          person,
          distance: "far",
        },
      },
      position,
      errors: [],
    }));
  } else if (s === "ما") {
    return [0, 1].map((person) => ({
      tokens: rest,
      body: {
        inflected: true,
        selection: {
          type: "pronoun",
          person,
          distance: "far",
        },
      },
      position,
      errors: [],
    }));
  } else if (s === "ته") {
    return [2, 3].map((person) => ({
      tokens: rest,
      body: {
        inflected: false,
        selection: {
          type: "pronoun",
          person,
          distance: "far",
        },
      },
      position,
      errors: [],
    }));
  } else if (s === "تا") {
    return [2, 3].map((person) => ({
      tokens: rest,
      body: {
        inflected: true,
        selection: {
          type: "pronoun",
          person,
          distance: "far",
        },
      },
      position,
      errors: [],
    }));
  } else if (s === "هغه") {
    return [
      ...[false, true].map<Result>((inflected) => ({
        tokens: rest,
        body: {
          inflected,
          selection: {
            type: "pronoun",
            person: 4,
            distance: "far",
          },
        },
        position,
        errors: [],
      })),
      {
        tokens: rest,
        body: {
          inflected: false,
          selection: {
            type: "pronoun",
            person: 5,
            distance: "far",
          },
        },
        position,
        errors: [],
      },
    ];
  } else if (s === "هغې") {
    return [
      {
        tokens: rest,
        body: {
          inflected: true,
          selection: {
            type: "pronoun",
            person: T.Person.ThirdSingFemale,
            distance: "far",
          },
        },
        position,
        errors: [],
      },
    ];
  } else if (s === "دی") {
    return [
      {
        tokens: rest,
        body: {
          inflected: false,
          selection: {
            type: "pronoun",
            person: T.Person.ThirdSingMale,
            distance: "near",
          },
        },
        position,
        errors: [],
      },
    ];
  } else if (s === "ده") {
    return [
      {
        tokens: rest,
        body: {
          inflected: true,
          selection: {
            type: "pronoun",
            person: T.Person.ThirdSingMale,
            distance: "near",
          },
        },
        position,
        errors: [],
      },
    ];
  } else if (s === "دا") {
    return [
      {
        tokens: rest,
        body: {
          inflected: false,
          selection: {
            type: "pronoun",
            person: T.Person.ThirdSingFemale,
            distance: "near",
          },
        },
        position,
        errors: [],
      },
    ];
  } else if (s === "دې") {
    return [
      {
        tokens: rest,
        body: {
          inflected: true,
          selection: {
            type: "pronoun",
            person: T.Person.ThirdSingFemale,
            distance: "near",
          },
        },
        position,
        errors: [],
      },
    ];
  } else if (["مونږ", "موږ"].includes(s)) {
    return [false, true].flatMap<Result>((inflected) =>
      [T.Person.FirstPlurMale, T.Person.FirstPlurFemale].map<Result>(
        (person) => ({
          tokens: rest,
          body: {
            inflected,
            selection: {
              type: "pronoun",
              person,
              distance: "far",
            },
          },
          position,
          errors: [],
        }),
      ),
    );
  } else if (["تاسو", "تاسې"].includes(s)) {
    return [false, true].flatMap<Result>((inflected) =>
      [T.Person.SecondPlurMale, T.Person.SecondPlurFemale].map<Result>(
        (person) => ({
          tokens: rest,
          body: {
            inflected,
            selection: {
              type: "pronoun",
              person,
              distance: "far",
            },
          },
          position,
          errors: [],
        }),
      ),
    );
  } else if (["هغوي", "هغوی"].includes(s)) {
    return [false, true].flatMap<Result>((inflected) =>
      [T.Person.ThirdPlurMale, T.Person.ThirdPlurFemale].map<Result>(
        (person) => ({
          tokens: rest,
          body: {
            inflected,
            selection: {
              type: "pronoun",
              person,
              distance: "far",
            },
          },
          position,
          errors: [],
        }),
      ),
    );
  } else if (["دوي", "دوی"].includes(s)) {
    return [false, true].flatMap<Result>((inflected) =>
      [T.Person.ThirdPlurMale, T.Person.ThirdPlurFemale].map<Result>(
        (person) => ({
          tokens: rest,
          body: {
            inflected,
            selection: {
              type: "pronoun",
              person,
              distance: "near",
            },
          },
          position,
          errors: [],
        }),
      ),
    );
  }

  return [];
}
