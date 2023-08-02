import * as T from "../../../types";

type Result = ReturnType<typeof parsePronoun>[number];

// TODO: map for doubling true, false, and masc fem
export function parsePronoun(tokens: Readonly<T.Token[]>): T.ParseResult<{
  inflected: boolean;
  selection: T.PronounSelection;
}>[] {
  const [{ s }, ...rest] = tokens;
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
            person: 5,
            distance: "far",
          },
        },
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
          errors: [],
        })
      )
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
          errors: [],
        })
      )
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
          errors: [],
        })
      )
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
          errors: [],
        })
      )
    );
  }

  return [];
}
