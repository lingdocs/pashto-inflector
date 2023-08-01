import * as T from "../../../types";

export function parsePronoun(tokens: Readonly<T.Token[]>): [
  T.Token[],
  {
    inflected: boolean[];
    selection: T.PronounSelection;
  }
][] {
  const [{ s }, ...rest] = tokens;
  const w: ReturnType<typeof parsePronoun> = [];
  if (s === "زه") {
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
  } else if (s === "ته") {
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
  } else if (s === "هغه") {
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
  } else if (s === "هغې") {
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
  } else if (s === "دی") {
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
  } else if (s === "ده") {
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
  } else if (s === "دا") {
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
  } else if (s === "دې") {
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
  } else if (["مونږ", "موږ"].includes(s)) {
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
  } else if (["تاسو", "تاسې"].includes(s)) {
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
  } else if (["هغوي", "هغوی"].includes(s)) {
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
  } else if (["دوي", "دوی"].includes(s)) {
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
