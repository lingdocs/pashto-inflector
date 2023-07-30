import * as T from "../../../types";

export function parsePronoun(tokens: Readonly<string[]>): [
  string[],
  {
    inflected: boolean[];
    selection: T.PronounSelection;
  }
][] {
  const [first, ...rest] = tokens;
  const w: ReturnType<typeof parsePronoun> = [];
  if (first === "زه") {
    w.push([
      rest,
      {
        inflected: [false],
        selection: {
          type: "pronoun",
          person: 0,
          distance: "far",
        },
      },
    ]);
    w.push([
      rest,
      {
        inflected: [false],
        selection: {
          type: "pronoun",
          person: 1,
          distance: "far",
        },
      },
    ]);
  } else if (first === "ته") {
    w.push([
      rest,
      {
        inflected: [false],
        selection: {
          type: "pronoun",
          person: 2,
          distance: "far",
        },
      },
    ]);
    w.push([
      rest,
      {
        inflected: [false],
        selection: {
          type: "pronoun",
          person: 3,
          distance: "far",
        },
      },
    ]);
  } else if (first === "هغه") {
    w.push([
      rest,
      {
        inflected: [false, true],
        selection: {
          type: "pronoun",
          person: 4,
          distance: "far",
        },
      },
    ]);
    w.push([
      rest,
      {
        inflected: [false],
        selection: {
          type: "pronoun",
          person: 5,
          distance: "far",
        },
      },
    ]);
  } else if (first === "هغې") {
    w.push([
      rest,
      {
        inflected: [true],
        selection: {
          type: "pronoun",
          person: T.Person.ThirdSingFemale,
          distance: "far",
        },
      },
    ]);
  } else if (first === "دی") {
    w.push([
      rest,
      {
        inflected: [false],
        selection: {
          type: "pronoun",
          person: T.Person.ThirdSingMale,
          distance: "near",
        },
      },
    ]);
  } else if (first === "ده") {
    w.push([
      rest,
      {
        inflected: [true],
        selection: {
          type: "pronoun",
          person: T.Person.ThirdSingMale,
          distance: "near",
        },
      },
    ]);
  } else if (first === "دا") {
    w.push([
      rest,
      {
        inflected: [false],
        selection: {
          type: "pronoun",
          person: T.Person.ThirdSingFemale,
          distance: "near",
        },
      },
    ]);
  } else if (first === "دې") {
    w.push([
      rest,
      {
        inflected: [true],
        selection: {
          type: "pronoun",
          person: T.Person.ThirdSingFemale,
          distance: "near",
        },
      },
    ]);
  } else if (["مونږ", "موږ"].includes(first)) {
    w.push([
      rest,
      {
        inflected: [false, true],
        selection: {
          type: "pronoun",
          person: T.Person.FirstPlurMale,
          distance: "far",
        },
      },
    ]);
    w.push([
      rest,
      {
        inflected: [false, true],
        selection: {
          type: "pronoun",
          person: T.Person.FirstPlurFemale,
          distance: "far",
        },
      },
    ]);
  } else if (["تاسو", "تاسې"].includes(first)) {
    w.push([
      rest,
      {
        inflected: [false, true],
        selection: {
          type: "pronoun",
          person: T.Person.SecondPlurMale,
          distance: "far",
        },
      },
    ]);
    w.push([
      rest,
      {
        inflected: [false, true],
        selection: {
          type: "pronoun",
          person: T.Person.SecondPlurFemale,
          distance: "far",
        },
      },
    ]);
  } else if (["هغوي", "هغوی"].includes(first)) {
    w.push([
      rest,
      {
        inflected: [false, true],
        selection: {
          type: "pronoun",
          person: T.Person.ThirdPlurMale,
          distance: "far",
        },
      },
    ]);
    w.push([
      rest,
      {
        inflected: [false, true],
        selection: {
          type: "pronoun",
          person: T.Person.ThirdPlurFemale,
          distance: "far",
        },
      },
    ]);
  } else if (["دوي", "دوی"].includes(first)) {
    w.push([
      rest,
      {
        inflected: [false, true],
        selection: {
          type: "pronoun",
          person: T.Person.ThirdPlurMale,
          distance: "near",
        },
      },
    ]);
    w.push([
      rest,
      {
        inflected: [false, true],
        selection: {
          type: "pronoun",
          person: T.Person.ThirdPlurFemale,
          distance: "near",
        },
      },
    ]);
  }
  return w;
}
