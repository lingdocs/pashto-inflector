import {
  makeAdjectiveSelection,
  // makeAdjectiveSelection,
  makeNounSelection,
} from "../../phrase-building/make-selections";
import * as T from "../../../../types";
// import { lookup } from "./lookup";
import { parseNoun } from "./parse-noun";
import { tokenizer } from "../tokenizer";
// import { isCompleteResult } from "./utils";
import { testDictionary } from "../mini-test-dictionary";
import { cleanOutResults } from "../utils";

const saray = testDictionary.nounLookup("سړی")[0];
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

const zor = testDictionary.adjLookup("زوړ")[0];
const ghut = testDictionary.adjLookup("غټ")[0];
const sturay = testDictionary.adjLookup("ستړی")[0];
const sor = testDictionary.adjLookup("سوړ")[0];

function fillerNouns(gender: T.Gender): T.NounEntry[] {
  return gender === "masc" ? [saray] : [xudza];
}

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
            selection: makeNounSelection(saray, undefined),
          },
        ],
      },
      {
        input: "سړي",
        output: [
          {
            inflected: true,
            selection: makeNounSelection(saray, undefined),
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(saray, undefined),
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
              ...makeNounSelection(saray, undefined),
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
              ...makeNounSelection(saray, undefined),
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

const adjsTests: {
  category: string;
  cases: {
    input: string;
    output: { inflected: boolean; selection: T.NounSelection }[];
    error?: boolean;
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
              ...makeNounSelection(saray, undefined),
              adjectives: [makeAdjectiveSelection(zor)],
            },
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(saray, undefined),
              adjectives: [makeAdjectiveSelection(zor)],
              number: "plural",
            },
          },
        ],
      },
      {
        input: "ستړې ښځه",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(xudza, undefined),
              adjectives: [makeAdjectiveSelection(sturay)],
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
                makeAdjectiveSelection(sturay),
              ],
              number: "plural",
            },
          },
        ],
      },
      {
        input: "غټو ستړې ښځو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(xudza, undefined),
              adjectives: [
                makeAdjectiveSelection(ghut),
                makeAdjectiveSelection(sturay),
              ],
              number: "plural",
            },
          },
        ],
        error: true,
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
        error: true,
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
      {
        input: "غټو زړو کورونو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(kor, undefined),
              number: "plural",
              adjectives: [
                makeAdjectiveSelection(ghut),
                makeAdjectiveSelection(zor),
              ],
            },
          },
        ],
      },
    ],
  },
  {
    category: "with determiners as well",
    cases: [
      {
        input: "کومه غټه ښځه",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(xudza, undefined),
              determiners: {
                type: "determiners",
                withNoun: true,
                determiners: [
                  {
                    type: "determiner",
                    determiner: { p: "کوم", f: "koom", type: "det" },
                  },
                ],
              },
              adjectives: [makeAdjectiveSelection(ghut)],
            },
          },
        ],
      },
      {
        input: "کومه غټ ښځه",
        output: [
          {
            inflected: false,
            selection: {
              ...makeNounSelection(xudza, undefined),
              determiners: {
                type: "determiners",
                withNoun: true,
                determiners: [
                  {
                    type: "determiner",
                    determiner: { p: "کوم", f: "koom", type: "det" },
                  },
                ],
              },
              adjectives: [makeAdjectiveSelection(ghut)],
            },
          },
        ],
        error: true,
      },
      {
        input: "کومې غټې ښځې",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(xudza, undefined),
              determiners: {
                type: "determiners",
                withNoun: true,
                determiners: [
                  {
                    type: "determiner",
                    determiner: { p: "کوم", f: "koom", type: "det" },
                  },
                ],
              },
              adjectives: [makeAdjectiveSelection(ghut)],
            },
          },
          {
            inflected: false,
            selection: {
              ...makeNounSelection(xudza, undefined),
              determiners: {
                type: "determiners",
                withNoun: true,
                determiners: [
                  {
                    type: "determiner",
                    determiner: { p: "کوم", f: "koom", type: "det" },
                  },
                ],
              },
              number: "plural",
              adjectives: [makeAdjectiveSelection(ghut)],
            },
          },
        ],
      },
      {
        input: "کومو غټو سړیو",
        output: [
          {
            inflected: true,
            selection: {
              ...makeNounSelection(saray, undefined),
              determiners: {
                type: "determiners",
                withNoun: true,
                determiners: [
                  {
                    type: "determiner",
                    determiner: { p: "کوم", f: "koom", type: "det" },
                  },
                ],
              },
              number: "plural",
              adjectives: [makeAdjectiveSelection(ghut)],
            },
          },
        ],
      },
    ],
  },
];

const daa: T.Determiner = {
  p: "دا",
  f: "daa",
  demonstrative: true,
  type: "det",
};
const hagha: T.Determiner = {
  p: "هغه",
  f: "hágha",
  demonstrative: true,
  type: "det",
};
const dagha: T.Determiner = {
  p: "دغه",
  f: "dágha",
  demonstrative: true,
  type: "det",
};

type DeterminerTest = {
  input: string;
  result: {
    plural: boolean;
    inflected: boolean;
    noun: T.NounEntry;
    determiner: T.Determiner;
    error?: true;
    hideNoun?: true;
  }[];
};

const determinerTests: DeterminerTest[] = [
  {
    input: "دا ښځه",
    result: [{ plural: false, inflected: false, noun: xudza, determiner: daa }],
  },
  {
    input: "دې ښځه",
    result: [
      {
        plural: false,
        inflected: false,
        noun: xudza,
        determiner: daa,
        error: true,
      },
    ],
  },
  {
    input: "دا ښځې",
    result: [{ plural: true, inflected: false, noun: xudza, determiner: daa }],
  },
  {
    input: "دې ښځې",
    result: [{ plural: false, inflected: true, noun: xudza, determiner: daa }],
  },
  {
    input: "دې ښځو",
    result: [{ plural: true, inflected: true, noun: xudza, determiner: daa }],
  },
  {
    input: "دا ښځو",
    result: [
      {
        plural: true,
        inflected: true,
        noun: xudza,
        determiner: daa,
        error: true,
      },
    ],
  },
  {
    input: "دا سړی",
    result: [{ plural: false, inflected: false, noun: saray, determiner: daa }],
  },
  {
    input: "دې سړی",
    result: [
      {
        plural: false,
        inflected: false,
        noun: saray,
        determiner: daa,
        error: true,
      },
    ],
  },
  {
    input: "دا سړي",
    result: [{ plural: true, inflected: false, noun: saray, determiner: daa }],
  },
  {
    input: "دې سړي",
    result: [{ plural: false, inflected: true, noun: saray, determiner: daa }],
  },
  {
    input: "دې سړیو",
    result: [{ plural: true, inflected: true, noun: saray, determiner: daa }],
  },
  {
    input: "دا سړیو",
    result: [
      {
        plural: true,
        inflected: true,
        noun: saray,
        determiner: daa,
        error: true,
      },
    ],
  },
  ...[
    { s: "د", determiner: dagha },
    { s: "ه", determiner: hagha },
  ].flatMap<DeterminerTest>(({ s, determiner }) => [
    {
      input: `${s}غه ښځه`,
      result: [{ plural: false, inflected: false, noun: xudza, determiner }],
    },
    {
      input: `${s}غه ښځې`,
      result: [{ plural: true, inflected: false, noun: xudza, determiner }],
    },
    {
      input: `${s}غې ښځې`,
      result: [{ plural: false, inflected: true, noun: xudza, determiner }],
    },
    {
      input: `${s}غو ښځې`,
      result: [
        {
          plural: false,
          inflected: true,
          noun: xudza,
          determiner,
          error: true,
        },
        {
          plural: true,
          inflected: false,
          noun: xudza,
          determiner,
          error: true,
        },
      ],
    },
    {
      input: `${s}غو ښځو`,
      result: [
        {
          plural: true,
          inflected: true,
          noun: xudza,
          determiner,
        },
      ],
    },
    {
      input: `${s}غو ښځه`,
      result: [
        {
          plural: false,
          inflected: false,
          noun: xudza,
          determiner,
          error: true,
        },
      ],
    },
  ]),
  // determiners without nouns mentioned
  {
    input: "دا",
    result: T.genders.flatMap((gender) =>
      [false, true].flatMap((plural) =>
        fillerNouns(gender).map((noun) => ({
          plural,
          inflected: false,
          noun,
          determiner: daa,
          hideNoun: true,
        }))
      )
    ),
  },
  {
    input: "دې",
    result: T.genders.flatMap((gender) =>
      [false, true].flatMap((plural) =>
        fillerNouns(gender).map((noun) => ({
          plural,
          inflected: true,
          noun,
          determiner: daa,
          hideNoun: true,
        }))
      )
    ),
  },
  ...[
    { s: "ه", determiner: hagha },
    { s: "د", determiner: dagha },
  ].flatMap<DeterminerTest>(({ s, determiner }) => [
    {
      input: `${s}غه`,
      result: T.genders.flatMap<DeterminerTest["result"][number]>((gender) =>
        fillerNouns(gender).flatMap<DeterminerTest["result"][number]>(
          (noun) => [
            {
              plural: false,
              inflected: false,
              noun,
              determiner,
              hideNoun: true,
            },
            {
              plural: true,
              inflected: false,
              noun,
              determiner,
              hideNoun: true,
            },
            ...(gender === "masc"
              ? [
                  {
                    plural: false,
                    inflected: true,
                    noun,
                    determiner,
                    hideNoun: true as const,
                  },
                ]
              : []),
          ]
        )
      ),
    },
    {
      input: `${s}غې`,
      result: fillerNouns("fem").map((noun) => ({
        plural: false,
        inflected: true,
        noun,
        determiner,
        hideNoun: true,
      })),
    },
    {
      input: `${s}غو`,
      result: T.genders.flatMap((gender) =>
        fillerNouns(gender).map((noun) => ({
          plural: true,
          inflected: true,
          noun,
          determiner,
          hideNoun: true,
        }))
      ),
    },
  ]),
];

describe("parsing determiners with nouns", () => {
  determinerTests.forEach(({ input, result }) => {
    test("", () => {
      const tokens = tokenizer(input);
      const res = cleanOutResults(
        parseNoun(tokens, testDictionary, undefined).filter(
          (x) => !x.tokens.length
        )
      );

      const expected = result.map<{
        inflected: boolean;
        selection: T.NounSelection;
      }>((x) => ({
        inflected: x.inflected,
        selection: {
          ...makeNounSelection(x.noun, undefined),
          determiners: {
            type: "determiners",
            withNoun: !x.hideNoun,
            determiners: [
              {
                type: "determiner",
                determiner: x.determiner,
              },
            ],
          },
          number: x.plural ? "plural" : "singular",
          adjectives: [],
        },
      }));
      expect(
        !!res.length &&
          res.every((x, i) => !!x.errors.length === !!result[i].error)
      ).toBe(true);
      expect(res.map((x) => x.body)).toIncludeSameMembers(expected);
    });
  });
});

describe("parsing nouns with adjectives and determiners", () => {
  adjsTests.forEach(({ category, cases }) => {
    test(category, () => {
      cases.forEach(({ input, output, error }) => {
        const tokens = tokenizer(input);
        const res = cleanOutResults(
          parseNoun(tokens, testDictionary, undefined).filter(
            (x) => !x.tokens.length
          )
        );
        expect(
          !!res.length && res.every((x) => !!x.errors.length === !!error)
        ).toBe(true);
        expect(res.map((x) => x.body)).toIncludeSameMembers(output);
      });
    });
  });
});
