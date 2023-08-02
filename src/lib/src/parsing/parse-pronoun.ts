import * as T from "../../../types";

type Result = ReturnType<typeof parsePronoun>[number];

// TODO: map for doubling true, false, and masc fem
export function parsePronoun(tokens: Readonly<T.Token[]>): T.ParseResult<{
  inflected: boolean;
  selection: T.PronounSelection;
}>[] {
  const [{ s }, ...rest] = tokens;
  if (s === "زه") {
    return [0, 1].map((person) => [
      rest,
      {
        inflected: false,
        selection: {
          type: "pronoun",
          person,
          distance: "far",
        },
      },
      [],
    ]);
  } else if (s === "ته") {
    return [2, 3].map((person) => [
      rest,
      {
        inflected: false,
        selection: {
          type: "pronoun",
          person,
          distance: "far",
        },
      },
      [],
    ]);
  } else if (s === "هغه") {
    return [
      ...[false, true].map<Result>((inflected) => [
        rest,
        {
          inflected,
          selection: {
            type: "pronoun",
            person: 5,
            distance: "far",
          },
        },
        [],
      ]),
      [
        rest,
        {
          inflected: false,
          selection: {
            type: "pronoun",
            person: 5,
            distance: "far",
          },
        },
        [],
      ],
    ];
  } else if (s === "هغې") {
    return [
      [
        rest,
        {
          inflected: true,
          selection: {
            type: "pronoun",
            person: T.Person.ThirdSingFemale,
            distance: "far",
          },
        },
        [],
      ],
    ];
  } else if (s === "دی") {
    return [
      [
        rest,
        {
          inflected: false,
          selection: {
            type: "pronoun",
            person: T.Person.ThirdSingMale,
            distance: "near",
          },
        },
        [],
      ],
    ];
  } else if (s === "ده") {
    return [
      [
        rest,
        {
          inflected: true,
          selection: {
            type: "pronoun",
            person: T.Person.ThirdSingMale,
            distance: "near",
          },
        },
        [],
      ],
    ];
  } else if (s === "دا") {
    return [
      [
        rest,
        {
          inflected: false,
          selection: {
            type: "pronoun",
            person: T.Person.ThirdSingFemale,
            distance: "near",
          },
        },
        [],
      ],
    ];
  } else if (s === "دې") {
    return [
      [
        rest,
        {
          inflected: true,
          selection: {
            type: "pronoun",
            person: T.Person.ThirdSingFemale,
            distance: "near",
          },
        },
        [],
      ],
    ];
  } else if (["مونږ", "موږ"].includes(s)) {
    return [false, true].flatMap<Result>((inflected) =>
      [T.Person.FirstPlurMale, T.Person.FirstPlurFemale].map<Result>(
        (person) => [
          rest,
          {
            inflected,
            selection: {
              type: "pronoun",
              person,
              distance: "far",
            },
          },
          [],
        ]
      )
    );
  } else if (["تاسو", "تاسې"].includes(s)) {
    return [false, true].flatMap<Result>((inflected) =>
      [T.Person.SecondPlurMale, T.Person.SecondPlurFemale].map<Result>(
        (person) => [
          rest,
          {
            inflected,
            selection: {
              type: "pronoun",
              person,
              distance: "far",
            },
          },
          [],
        ]
      )
    );
  } else if (["هغوي", "هغوی"].includes(s)) {
    return [false, true].flatMap<Result>((inflected) =>
      [T.Person.ThirdPlurMale, T.Person.ThirdPlurFemale].map<Result>(
        (person) => [
          rest,
          {
            inflected,
            selection: {
              type: "pronoun",
              person,
              distance: "far",
            },
          },
          [],
        ]
      )
    );
  } else if (["دوي", "دوی"].includes(s)) {
    return [false, true].flatMap<Result>((inflected) =>
      [T.Person.ThirdPlurMale, T.Person.ThirdPlurFemale].map<Result>(
        (person) => [
          rest,
          {
            inflected,
            selection: {
              type: "pronoun",
              person,
              distance: "near",
            },
          },
          [],
        ]
      )
    );
  }

  return [];
}
