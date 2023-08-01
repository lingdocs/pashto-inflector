import {
  makeAdjectiveSelection,
  makeNounSelection,
} from "../phrase-building/make-selections";
import * as T from "../../../types";
import { lookup, wordQuery } from "./lookup";
import { parseNoun } from "./parse-noun";
import { tokenizer } from "./tokenizer";

const sor = wordQuery("سوړ", "adj");
const zor = wordQuery("زوړ", "adj");
const sturey = wordQuery("ستړی", "adj");
const ghut = wordQuery("غټ", "adj");
const sarey = wordQuery("سړی", "noun");
const dostee = wordQuery("دوستي", "noun");
const wreejze = wordQuery("وریژې", "noun");
const xudza = wordQuery("ښځه", "noun");
const kursuy = wordQuery("کرسۍ", "noun");
const daktar = wordQuery("ډاکټر", "noun");
const malguray = wordQuery("ملګری", "noun");
const lmasay = wordQuery("لمسی", "noun");
const melma = wordQuery("مېلمه", "noun");
const shpoon = wordQuery("شپون", "noun");
const tanoor = wordQuery("تنور", "noun");
const kor = wordQuery("کور", "noun");
const khur = wordQuery("خر", "noun");
const ghur = wordQuery("غر", "noun");
const mor = wordQuery("مور", "noun");
const plaar = wordQuery("پلار", "noun");
const oobu = wordQuery("اوبه", "noun");
const ghanum = wordQuery("غنم", "noun");
const laar = wordQuery("لار", "noun");
const qaazee = wordQuery("قاضي", "noun");
const waadu = wordQuery("واده", "noun");
const maamaa = wordQuery("ماما", "noun");
const peesho = wordQuery("پیشو", "noun");
const duaa = wordQuery("دعا", "noun");
const zooy = wordQuery("زوی", "noun");

const tests: {
  category: string;
  cases: {
    input: string;
    output: {
      inflected: boolean;
      selection: T.NounSelection;
    }[];
  }[];
}[] = [
  {
    category: "pattern 1 nouns",
    cases: [
      {
        input: "کور",
        output: [
          {
            inflected: false,
            selection: makeNounSelection(kor, undefined),
          },
          {
            inflected: true,
            selection: makeNounSelection(kor, undefined),
          },
        ],
      },
      {
        input: "واده",
        output: [
          {
            inflected: false,
            selection: makeNounSelection(waadu, undefined),
          },
          {
            inflected: true,
            selection: makeNounSelection(waadu, undefined),
          },
        ],
      },
      {
        input: "وادو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(waadu, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "کورو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(kor, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "ډاکټر",
        output: [
          {
            inflected: false,
            selection: makeNounSelection(daktar, undefined),
          },
          {
            inflected: true,
            selection: makeNounSelection(daktar, undefined),
          },
        ],
      },
      {
        input: "ډاکټره",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(daktar, undefined),
              gender: "fem",
            },
          },
        ],
      },
      {
        input: "ډاکټرې",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(daktar, undefined),
              gender: "fem",
            },
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(daktar, undefined),
              number: "plural",
              gender: "fem",
            },
          },
        ],
      },
      {
        input: "ډاکټرو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(daktar, undefined),
              number: "plural",
            },
          },
          {
            inflected: true,
            selection: {
              ...makeNounSelection(daktar, undefined),
              gender: "fem",
              number: "plural",
            },
          },
        ],
      },
      {
        input: "ښځه",
        output: [
          {
            inflected: false,
            selection: makeNounSelection(xudza, undefined),
          },
        ],
      },
      {
        input: "ښځې",
        output: [
          {
            inflected: true,
            selection: makeNounSelection(xudza, undefined),
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(xudza, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "ښځو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(xudza, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "وریژې",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(wreejze, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "وریژو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(wreejze, undefined),
              gender: "fem",
              number: "plural",
            },
          },
        ],
      },
      // fem nouns missing ه
      {
        input: "لار",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(laar, undefined),
              gender: "fem",
            },
          },
        ],
      },
      {
        input: "لارې",
        output: [
          {
            inflected: true,
            selection: makeNounSelection(laar, undefined),
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(laar, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "لارو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(laar, undefined),
              number: "plural",
            },
          },
        ],
      },
    ],
  },
  {
    category: "pattern 2 nouns",
    cases: [
      {
        input: "ملګری",
        output: [
          {
            inflected: false,
            selection: makeNounSelection(malguray, undefined),
          },
        ],
      },
      {
        input: "ملګري",
        output: [
          {
            inflected: true,
            selection: makeNounSelection(malguray, undefined),
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(malguray, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "ملګرې",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(malguray, undefined),
              gender: "fem",
            },
          },
          {
            inflected: true,
            selection: {
              ...makeNounSelection(malguray, undefined),
              gender: "fem",
            },
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(malguray, undefined),
              gender: "fem",
              number: "plural",
            },
          },
        ],
      },
      {
        input: "ملګرو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(malguray, undefined),
              number: "plural",
            },
          },
          {
            inflected: true,
            selection: {
              ...makeNounSelection(malguray, undefined),
              number: "plural",
              gender: "fem",
            },
          },
        ],
      },
      {
        input: "ملګریو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(malguray, undefined),
              number: "plural",
            },
          },
          {
            inflected: true,
            selection: {
              ...makeNounSelection(malguray, undefined),
              number: "plural",
              gender: "fem",
            },
          },
        ],
      },
    ],
  },
  {
    category: "pattern 3 nouns",
    cases: [
      {
        input: "سړی",
        output: [
          {
            inflected: false,
            selection: makeNounSelection(sarey, undefined),
          },
        ],
      },
      {
        input: "سړي",
        output: [
          {
            inflected: true,
            selection: makeNounSelection(sarey, undefined),
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(sarey, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "سړیو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(sarey, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "سړو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(sarey, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "کرسۍ",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(kursuy, undefined),
              number: "singular",
            },
          },
          {
            inflected: true,
            selection: {
              ...makeNounSelection(kursuy, undefined),
              number: "singular",
            },
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(kursuy, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "کرسو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(kursuy, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "کرسیو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(kursuy, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "لمسی",
        output: [
          {
            inflected: false,
            selection: makeNounSelection(lmasay, undefined),
          },
        ],
      },
      {
        input: "لمسي",
        output: [
          {
            inflected: true,
            selection: makeNounSelection(lmasay, undefined),
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(lmasay, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "لمسۍ",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(lmasay, undefined),
              gender: "fem",
            },
          },
          {
            inflected: true,
            selection: {
              ...makeNounSelection(lmasay, undefined),
              gender: "fem",
            },
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(lmasay, undefined),
              gender: "fem",
              number: "plural",
            },
          },
        ],
      },
      {
        input: "لمسیو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(lmasay, undefined),
              gender: "masc",
              number: "plural",
            },
          },
          {
            inflected: true,
            selection: {
              ...makeNounSelection(lmasay, undefined),
              gender: "fem",
              number: "plural",
            },
          },
        ],
      },
      {
        input: "لمسو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(lmasay, undefined),
              gender: "masc",
              number: "plural",
            },
          },
          {
            inflected: true,
            selection: {
              ...makeNounSelection(lmasay, undefined),
              gender: "fem",
              number: "plural",
            },
          },
        ],
      },
    ],
  },
  {
    category: "pattern 4",
    cases: [
      {
        input: "مېلمه",
        output: [
          {
            inflected: false,
            selection: makeNounSelection(melma, undefined),
          },
        ],
      },
      // pattern 4 ending in 'a' - 1st inflection is only plural
      {
        input: "مېلمانه",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(melma, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "شپانه",
        output: [
          {
            inflected: true,
            selection: makeNounSelection(shpoon, undefined),
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(shpoon, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "مېلمنه",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(melma, undefined),
              gender: "fem",
            },
          },
        ],
      },
      {
        input: "مېلمنې",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(melma, undefined),
              gender: "fem",
            },
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(melma, undefined),
              gender: "fem",
              number: "plural",
            },
          },
        ],
      },
      {
        input: "مېلمنو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(melma, undefined),
              gender: "masc",
              number: "plural",
            },
          },
          {
            inflected: true,
            selection: {
              ...makeNounSelection(melma, undefined),
              gender: "fem",
              number: "plural",
            },
          },
        ],
      },
      {
        input: "تنرو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(tanoor, undefined),
              gender: "masc",
              number: "plural",
            },
          },
        ],
      },
      // pseudeo masc version shouldn't be recognized
      {
        input: "تنره",
        output: [],
      },
    ],
  },
  {
    category: "pattern 5",
    // TODO: should غر also be considered inflected?
    cases: [
      {
        input: "غر",
        output: [
          {
            inflected: false,
            selection: makeNounSelection(ghur, undefined),
          },
        ],
      },
      {
        input: "غره",
        output: [
          {
            inflected: true,
            selection: makeNounSelection(ghur, undefined),
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(ghur, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "غرو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(ghur, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "خر",
        output: [
          {
            inflected: false,
            selection: makeNounSelection(khur, undefined),
          },
        ],
      },
      {
        input: "خره",
        output: [
          {
            inflected: true,
            selection: makeNounSelection(khur, undefined),
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(khur, undefined),
              number: "plural",
            },
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(khur, undefined),
              gender: "fem",
              number: "singular",
            },
          },
        ],
      },
    ],
  },
  {
    category: "pattern 6 fem",
    cases: [
      {
        input: "دوستي",
        output: [
          {
            inflected: false,
            selection: makeNounSelection(dostee, undefined),
          },
        ],
      },
      {
        input: "دوستۍ",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(dostee, undefined),
              number: "singular",
            },
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(dostee, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "دوستو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(dostee, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "دوستیو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(dostee, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "دوستی",
        output: [],
      },
    ],
  },
  {
    category: "irregular words",
    cases: [
      {
        input: "اوبه",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(oobu, undefined),
              number: "plural",
              gender: "fem",
            },
          },
        ],
      },
      {
        input: "اوبو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(oobu, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "غنم",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(ghanum, undefined),
              number: "plural",
              gender: "masc",
            },
          },
        ],
      },
      {
        input: "غنمو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(ghanum, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "پلار",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(plaar, undefined),
              gender: "masc",
            },
          },
          {
            inflected: true,
            selection: makeNounSelection(plaar, undefined),
          },
        ],
      },
      {
        input: "پلارو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(plaar, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "مور",
        output: [
          {
            inflected: false,
            selection: makeNounSelection(mor, undefined),
          },
          {
            inflected: true,
            selection: makeNounSelection(mor, undefined),
          },
        ],
      },
      {
        input: "مورو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(mor, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "قاضي",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(qaazee, undefined),
              gender: "masc",
            },
          },
          {
            inflected: true,
            selection: {
              ...makeNounSelection(qaazee, undefined),
              gender: "masc",
            },
          },
        ],
      },
      {
        input: "ماما",
        output: [
          {
            inflected: false,
            selection: makeNounSelection(maamaa, undefined),
          },
          {
            inflected: true,
            selection: makeNounSelection(maamaa, undefined),
          },
        ],
      },
      {
        input: "پیشو",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(peesho, undefined),
              gender: "fem",
            },
          },
          {
            inflected: true,
            selection: {
              ...makeNounSelection(peesho, undefined),
              gender: "fem",
            },
          },
        ],
      },
    ],
  },
  {
    category: "plurals with -oona",
    cases: [
      {
        input: "کورونه",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(kor, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "کورونو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(kor, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "وادونه",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(waadu, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "وادونو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(waadu, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "غرونه",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(ghur, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "غرونو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(ghur, undefined),
              number: "plural",
            },
          },
        ],
      },
      // can't add oona to a pattern 2 noun
      {
        input: "ملګریونه",
        output: [],
      },
      // can't add oona to a pattern 3 noun
      {
        input: "سړیونه",
        output: [],
      },
      // can't add oona to a pattern 4 noun
      {
        input: "تنرونه",
        output: [],
      },
      {
        input: "تنرونو",
        output: [],
      },
    ],
  },
  {
    category: "plurals with -aan",
    cases: [
      {
        input: "پلاران",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(plaar, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "پلارانې",
        output: [],
      },
      {
        input: "پلارګان",
        output: [],
      },
      {
        input: "پلارګانو",
        output: [],
      },
      {
        input: "پلارانو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(plaar, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "دعاګانې",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(duaa, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "دعاګانو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(duaa, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "ماماګان",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(maamaa, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "ماماګانو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(maamaa, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "ډاکټران",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(daktar, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "ډاکټرانې",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(daktar, undefined),
              number: "plural",
              gender: "fem",
            },
          },
        ],
      },
      {
        input: "ډاکټرانو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(daktar, undefined),
              number: "plural",
              gender: "masc",
            },
          },
          {
            inflected: true,
            selection: {
              ...makeNounSelection(daktar, undefined),
              number: "plural",
              gender: "fem",
            },
          },
        ],
      },
    ],
  },
  {
    category: "plurals with -we",
    cases: [
      {
        input: "دعاوې",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(duaa, undefined),
              gender: "fem",
              number: "plural",
            },
          },
        ],
      },
      {
        input: "دعاوو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(duaa, undefined),
              gender: "fem",
              number: "plural",
            },
          },
        ],
      },
    ],
  },
  {
    category: "irregular plurals",
    cases: [
      {
        input: "میندې",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(mor, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "میندو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(mor, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "زامن",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(zooy, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "زامنو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(zooy, undefined),
              number: "plural",
            },
          },
        ],
      },
    ],
  },
];

// PROBLEM WITH غټې وریژې
// ];

describe("parsing nouns", () => {
  tests.forEach(({ category, cases }) => {
    // eslint-disable-next-line jest/valid-title
    test(category, () => {
      cases.forEach(({ input, output }) => {
        const tokens = tokenizer(input);
        const { success } = parseNoun(tokens, lookup, []);
        const res = success.map(([tkns, r]) => r);
        expect(res).toEqual(output);
      });
    });
  });
});

const adjsTests: {
  category: string;
  cases: {
    input: string;
    output: { inflected: boolean; selection: T.NounSelection }[];
  }[];
}[] = [
  {
    category: "agreement with regular nouns",
    cases: [
      {
        input: "زاړه سړي",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(sarey, undefined),
              adjectives: [makeAdjectiveSelection(zor)],
            },
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(sarey, undefined),
              adjectives: [makeAdjectiveSelection(zor)],
              number: "plural",
            },
          },
        ],
      },
      {
        input: "غټو ستړو ښځو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(xudza, undefined),
              adjectives: [
                makeAdjectiveSelection(ghut),
                makeAdjectiveSelection(sturey),
              ],
              number: "plural",
            },
          },
        ],
      },
      {
        input: "غټو ستړې ښځو",
        output: [],
      },
    ],
  },
  {
    category: "agreement with plural nouns",
    cases: [
      {
        input: "سړې اوبه",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(oobu, undefined),
              gender: "fem",
              number: "plural",
              adjectives: [makeAdjectiveSelection(sor)],
            },
          },
        ],
      },
      {
        input: "زاړه غنم",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(ghanum, undefined),
              number: "plural",
              adjectives: [makeAdjectiveSelection(zor)],
            },
          },
        ],
      },
      {
        input: "زوړ غنم",
        output: [],
      },
      {
        input: "زاړه کورونه",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(kor, undefined),
              number: "plural",
              adjectives: [makeAdjectiveSelection(zor)],
            },
          },
        ],
      },
      // TODO: WHY DOES ADDING زړو break this ???
      {
        input: "غټو کورونو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(kor, undefined),
              number: "plural",
              adjectives: [
                makeAdjectiveSelection(ghut),
                // makeAdjectiveSelection(zor),
              ],
            },
          },
        ],
      },
    ],
  },
];

describe("parsing nouns with adjectives", () => {
  adjsTests.forEach(({ category, cases }) => {
    // eslint-disable-next-line jest/valid-title
    test(category, () => {
      cases.forEach(({ input, output }) => {
        const tokens = tokenizer(input);
        expect(parseNoun(tokens, lookup, []).success.map((x) => x[1])).toEqual(
          output
        );
      });
    });
  });
});
