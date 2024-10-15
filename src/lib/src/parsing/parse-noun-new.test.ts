import {
  // makeAdjectiveSelection,
  makeNounSelection,
} from "../phrase-building/make-selections";
import * as T from "../../../types";
// import { lookup } from "./lookup";
import { parseNoun } from "./parse-noun-new";
import { tokenizer } from "./tokenizer";
// import { isCompleteResult } from "./utils";
import { testDictionary } from "./mini-test-dictionary";

// const sor = testDictionary.adjLookup("سوړ")[0];
// const zor = testDictionary.adjLookup("زوړ")[0];
// const sturey = testDictionary.adjLookup("ستړی")[0];
// const ghut = testDictionary.adjLookup("غټ")[0];
const sarey = testDictionary.nounLookup("سړی")[0];
const dostee = testDictionary.nounLookup("دوستي")[0];
const wreejze = testDictionary.nounLookup("وریژې")[0];
const xudza = testDictionary.nounLookup("ښځه")[0];
const hatkaruy = testDictionary.nounLookup("هتکړۍ")[0];
const kursuy = testDictionary.nounLookup("کرسۍ")[0];
const daktar = testDictionary.nounLookup("ډاکټر")[0];
const malguray = testDictionary.nounLookup("ملګری")[0];
const lmasay = testDictionary.nounLookup("لمسی")[0];
const melma = testDictionary.nounLookup("مېلمه")[0];
const shpoon = testDictionary.nounLookup("شپون")[0];
const tanoor = testDictionary.nounLookup("تنور")[0];
const kor = testDictionary.nounLookup("کور")[0];
const khur = testDictionary.nounLookup("خر")[0];
const ghur = testDictionary.nounLookup("غر")[0];
const mor = testDictionary.nounLookup("مور")[0];
const plaar = testDictionary.nounLookup("پلار")[0];
const oobu = testDictionary.nounLookup("اوبه")[0];
const ghanum = testDictionary.nounLookup("غنم")[0];
const laar = testDictionary.nounLookup("لار")[0];
const qaazee = testDictionary.nounLookup("قاضي")[0];
const waadu = testDictionary.nounLookup("واده")[0];
const maamaa = testDictionary.nounLookup("ماما")[0];
const peesho = testDictionary.nounLookup("پیشو")[0];
const kaarghu = testDictionary.nounLookup("کارغه")[0];
const aloo = testDictionary.nounLookup("الو")[0];
const duaa = testDictionary.nounLookup("دعا")[0];
const zooy = testDictionary.nounLookup("زوی")[0];
const loor = testDictionary.nounLookup("لور")[0];
const nabee = testDictionary.nounLookup("نبي")[0];
const lafz = testDictionary.nounLookup("لفظ")[0];
const fatha = testDictionary.nounLookup("فتح")[0];
const nafa = testDictionary.nounLookup("نفع")[0];
const tajraba = testDictionary.nounLookup("تجربه")[0];

// TODO: test for adjective errors etc
// bundled plural

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
    ],
  },
  {
    category: "pattern 1 fem nouns with ح ه etc",
    cases: [
      {
        input: "فتح",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(fatha, undefined),
            },
          },
        ],
      },
      {
        input: "فتحې",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(fatha, undefined),
            },
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(fatha, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "فتحو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(fatha, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "نفع",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(nafa, undefined),
            },
          },
        ],
      },
      {
        input: "نفعې",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(nafa, undefined),
            },
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(nafa, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "نفعو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(nafa, undefined),
              number: "plural",
            },
          },
        ],
      },
    ],
  },
  {
    category: "group/plural nouns",
    // to do fem plural تسبیج, هټکرۍ, مایع
    cases: [
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
        input: "هتکړۍ",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(hatkaruy, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "هتکړیو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(hatkaruy, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "هتکړو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(hatkaruy, undefined),
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
    ],
  },
  {
    category: "fem nouns missing ه",
    cases: [
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
    category: "misc people words",
    cases: [
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
        output: [],
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
        input: "لور",
        output: [
          {
            inflected: false,
            selection: makeNounSelection(loor, undefined),
          },
          {
            inflected: true,
            selection: makeNounSelection(loor, undefined),
          },
        ],
      },
      {
        input: "مورو",
        output: [],
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
        input: "کارغان",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(kaarghu, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "کارغانو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(kaarghu, undefined),
              number: "plural",
            },
          },
        ],
      },
    ],
  },
  {
    category: "plurals with -aane",
    cases: [
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
    category: "plurals with -gaan",
    cases: [
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
        input: "الوګان",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(aloo, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "الوګانو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(aloo, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "پیسوګان",
        output: [],
      },
    ],
  },
  {
    category: "plurals with -gaane / -we",
    cases: [
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
        input: "دعا ګانې",
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
        input: "دعا ګانو",
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
        input: "دعاوې",
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
        input: "دعاوو",
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
        input: "دعا وې",
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
        input: "دعا وو",
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
        input: "دوستي ګانې",
        output: [
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
        input: "دوستي ګانو",
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
        input: "دوستیګانې",
        output: [
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
        input: "دوستیګانو",
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
    ],
  },
  {
    category: "irregular familial plurals",
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
      // also should be able to search for all variations of Pashto plural
      {
        input: "میېندې",
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
        input: "میېندو",
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
        input: "مورو",
        output: [],
      },
      {
        input: "لوڼو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(loor, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "لورو",
        output: [],
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
      {
        input: "زویو",
        output: [],
      },
      {
        input: "پلرونه",
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
        input: "پلرونو",
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
    ],
  },
  {
    category: "arabic plurals",
    cases: [
      {
        input: "الفاظ",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(lafz, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "الفاظو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(lafz, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "نبي",
        output: [
          {
            inflected: false,
            selection: makeNounSelection(nabee, undefined),
          },
          {
            inflected: true,
            selection: makeNounSelection(nabee, undefined),
          },
        ],
      },
      {
        input: "انبیا",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(nabee, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "انبیاوو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(nabee, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "انبیا وو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(nabee, undefined),
              number: "plural",
            },
          },
        ],
      },
      {
        input: "تجارب",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(tajraba, undefined),
              number: "plural",
              gender: "masc",
            },
          },
        ],
      },
    ],
  },
];

describe("parsing nouns", () => {
  tests.forEach(({ category, cases }) => {
    test(category, () => {
      cases.forEach(({ input, output }) => {
        const tokens = tokenizer(input);
        const res = parseNoun(tokens, testDictionary, undefined).flatMap(
          // only take the ones that used all the tokens
          ({ body, tokens }) => (tokens.length === 0 ? [body] : [])
        );
        expect(res).toEqual(output);
      });
    });
  });
});

// const adjsTests: {
//   category: string;
//   cases: {
//     input: string;
//     output: { inflected: boolean; selection: T.NounSelection }[];
//   }[];
// }[] = [
//   {
//     category: "agreement with regular nouns",
//     cases: [
//       {
//         input: "زاړه سړي",
//         output: [
//           {
//             inflected: true,
//             selection: {
//               ...makeNounSelection(sarey, undefined),
//               adjectives: [makeAdjectiveSelection(zor)],
//             },
//           },
//           {
//             inflected: false,
//             selection: {
//               ...makeNounSelection(sarey, undefined),
//               adjectives: [makeAdjectiveSelection(zor)],
//               number: "plural",
//             },
//           },
//         ],
//       },
//       {
//         input: "غټو ستړو ښځو",
//         output: [
//           {
//             inflected: true,
//             selection: {
//               ...makeNounSelection(xudza, undefined),
//               adjectives: [
//                 makeAdjectiveSelection(ghut),
//                 makeAdjectiveSelection(sturey),
//               ],
//               number: "plural",
//             },
//           },
//         ],
//       },
//       {
//         input: "غټو ستړې ښځو",
//         output: [],
//       },
//     ],
//   },
//   {
//     category: "agreement with plural nouns",
//     cases: [
//       {
//         input: "سړې اوبه",
//         output: [
//           {
//             inflected: false,
//             selection: {
//               ...makeNounSelection(oobu, undefined),
//               gender: "fem",
//               number: "plural",
//               adjectives: [makeAdjectiveSelection(sor)],
//             },
//           },
//         ],
//       },
//       {
//         input: "زاړه غنم",
//         output: [
//           {
//             inflected: false,
//             selection: {
//               ...makeNounSelection(ghanum, undefined),
//               number: "plural",
//               adjectives: [makeAdjectiveSelection(zor)],
//             },
//           },
//         ],
//       },
//       {
//         input: "زوړ غنم",
//         output: [],
//       },
//       {
//         input: "زاړه کورونه",
//         output: [
//           {
//             inflected: false,
//             selection: {
//               ...makeNounSelection(kor, undefined),
//               number: "plural",
//               adjectives: [makeAdjectiveSelection(zor)],
//             },
//           },
//         ],
//       },
//       {
//         input: "غټو زړو کورونو",
//         output: [
//           {
//             inflected: true,
//             selection: {
//               ...makeNounSelection(kor, undefined),
//               number: "plural",
//               adjectives: [
//                 makeAdjectiveSelection(ghut),
//                 makeAdjectiveSelection(zor),
//               ],
//             },
//           },
//         ],
//       },
//     ],
//   },
// ];

// describe("parsing nouns with adjectives", () => {
//   adjsTests.forEach(({ category, cases }) => {
//     test(category, () => {
//       cases.forEach(({ input, output }) => {
//         const tokens = tokenizer(input);
//         const res = parseNoun(tokens, lookup, undefined, [])
//           .filter(isCompleteResult)
//           .map(({ body }) => body);
//         expect(res).toEqual(output);
//       });
//     });
//   });
// });
