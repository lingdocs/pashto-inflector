/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  phoneticsToDiacritics,
  splitFIntoPhonemes,
} from "./phonetics-to-diacritics";

const zwarakay = "ٙ";

const phonemeSplits: Array<{
  in: string;
  out: string[];
}> = [
  {
    in: "kor",
    out: ["k", "o", "r"],
  },
  {
    in: "raaghay",
    out: ["r", "aa", "gh", "ay"],
  },
  {
    in: "hatsa",
    out: ["h", "a", "ts", "a"],
  },
  {
    in: "ba",
    out: ["b", "a"],
  },
  {
    in: "paydáa",
    out: ["p", "ay", "d", "áa"],
  },
  {
    in: "be kaar",
    out: ["b", "e", "k", "aa", "r"],
  },
  {
    in: "raadzey",
    out: ["r", "aa", "dz", "ey"],
  },
  {
    in: "badanuy ??",
    out: ["b", "a", "d", "a", "n", "uy"],
  },
  {
    in: "tur ... pore",
    out: ["t", "u", "r", "p", "o", "r", "e"],
  },
  {
    in: "daar-Ul-iqaama",
    out: ["d", "aa", "r", "-Ul-", "i", "q", "aa", "m", "a"],
  },
];

phonemeSplits.forEach((s) => {
  test(`${s.in} should split properly`, () => {
    const result = splitFIntoPhonemes(s.in);
    expect(result).toEqual(s.out);
  });
});

const toTest: Array<{
  in: { p: string; f: string };
  out: string | undefined;
}> = [
  {
    in: {
      p: "کور",
      f: "kor",
    },
    out: "کور",
  },
  {
    in: {
      p: "کور",
      f: "koor",
    },
    out: "کُور",
  },
  {
    in: {
      p: "تب",
      f: "tib",
    },
    out: "تِب",
  },
  {
    in: {
      p: "تب",
      f: "tab",
    },
    out: "تَب",
  },
  {
    in: {
      p: "تب",
      f: "tUb",
    },
    out: "تُب",
  },
  {
    in: {
      p: "تب",
      f: "tub",
    },
    out: "تٙب",
  },
  {
    in: {
      p: "تب",
      f: "tb",
    },
    out: "تْب",
  },
  {
    in: {
      p: "تلب",
      f: "tilab",
    },
    out: "تِلَب",
  },
  {
    in: {
      p: "تشناب",
      f: "tashnaab",
    },
    out: "تَشْناب",
  },
  // broken phonetics will return undefined
  {
    in: {
      p: "تشناب",
      f: "peshnaab",
    },
    out: undefined,
  },
  // working with وs
  {
    in: {
      p: "کول",
      f: "kwal",
    },
    out: "کْوَل",
  },
  {
    in: {
      p: "تول",
      f: "tool",
    },
    out: "تُول",
  },
  {
    in: {
      p: "مقبول",
      f: "maqbool",
    },
    out: "مَقْبُول",
  },
  {
    in: {
      p: "کول",
      f: "kawul",
    },
    out: "کَو" + zwarakay + "ل",
  },
  {
    in: {
      p: "کول",
      f: "kiwul",
    },
    out: "کِو" + zwarakay + "ل",
  },
  {
    in: {
      p: "کول",
      f: "kUwul",
    },
    out: "کُو" + zwarakay + "ل",
  },
  {
    in: {
      p: "کول",
      f: "kuwul",
    },
    out: "ک" + zwarakay + "و" + zwarakay + "ل",
  },
  {
    in: {
      p: "کول",
      f: "kawal",
    },
    out: "کَوَل",
  },
  {
    in: {
      p: "کول",
      f: "kUwal",
    },
    out: "کُوَل",
  },
  {
    in: {
      p: "پشتګرد",
      f: "pishtgird",
    },
    out: "پِشْتْګِرْد",
  },
  {
    in: {
      p: "سپین",
      f: "speen",
    },
    out: "سْپِین",
  },
  {
    in: {
      p: "سپین",
      f: "spayn",
    },
    out: "سْپین",
  },
  {
    in: {
      p: "پېش",
      f: "pesh",
    },
    out: "پېش",
  },
  {
    in: {
      p: "پېش",
      f: "paysh",
    },
    out: undefined,
  },
  {
    in: {
      p: "رغېدل",
      f: "raghedul",
    },
    out: "رَغېد" + zwarakay + "ل",
  },
  {
    in: {
      p: "کارول",
      f: "kaarawul",
    },
    out: "کارَو" + zwarakay + "ل",
  },
  {
    in: {
      p: "پېښېدل",
      f: "pexedul",
    },
    out: "پېښېد" + zwarakay + "ل",
  },
  {
    in: {
      p: "مین",
      f: "ma`yín",
    },
    out: "مَیِن",
  },
  {
    in: {
      p: "سړی",
      f: "saRay",
    },
    out: "سَړی",
  },
  {
    in: {
      p: "سړي",
      f: "saRee",
    },
    out: "سَړي",
  },
  {
    in: {
      p: "زه",
      f: "zu",
    },
    out: "زهٔ",
  },
  {
    in: {
      p: "زه",
      f: "za",
    },
    out: "زه",
  },
  {
    in: {
      p: "پېشنهاد",
      f: "peshniháad",
    },
    out: "پېشْنِهاد",
  },
  {
    in: {
      p: "ایستل",
      f: "eestul",
    },
    out: "اِیسْت" + zwarakay + "ل",
  },
  {
    in: {
      p: "ایستل",
      f: "aystul",
    },
    out: "ایسْت" + zwarakay + "ل",
  },
  {
    in: {
      p: "اېسېدل",
      f: "esedul",
    },
    out: "اېسېد" + zwarakay + "ل",
  },
  {
    in: {
      p: "اوسېدل",
      f: "osedul",
    },
    out: "اوسېد" + zwarakay + "ل",
  },
  {
    in: {
      p: "اواز",
      f: "awaaz",
    },
    out: "اَواز",
  },
  {
    in: {
      p: "اسلام",
      f: "islaam",
    },
    out: "اِسْلام",
  },
  {
    in: {
      p: "واردول",
      f: "waaridawul",
    },
    out: "وارِدَو" + zwarakay + "ل",
  },
  {
    in: {
      p: "غاړه",
      f: "ghaaRa",
    },
    out: "غاړه",
  },
  {
    in: {
      p: "اوتر",
      f: "awtár",
    },
    out: "اَوْتَر",
  },
  {
    in: {
      p: "اختیار",
      f: "ikhtiyáar",
    },
    out: "اِخْتِیار",
  },
  {
    in: {
      p: "فریاد",
      f: "faryáad",
    },
    out: "فَرْیاد",
  },
  {
    in: {
      p: "کارغه",
      f: "kaarghu",
    },
    out: "کارْغهٔ",
  },
  {
    in: {
      p: "بې کار",
      f: "be kaar",
    },
    out: "بې کار",
  },
  {
    in: {
      p: "بې کار",
      f: "bekaar",
    },
    out: "بې کار",
  },
  {
    in: {
      p: "انبار",
      f: "ambáar",
    },
    out: "اَنْبار",
  },
  {
    in: {
      p: "ارغون",
      f: "arghóon",
    },
    out: "اَرْغُون",
  },
  {
    in: {
      p: "ارمټه",
      f: "armaTa",
    },
    out: "اَرْمَټه",
  },
  {
    in: {
      p: "اروا پوه",
      f: "arwaa poh",
    },
    out: "اَرْوا پوهْ",
  },
  {
    in: {
      p: "اسحاق",
      f: "ishaaq",
    },
    out: undefined,
  },
  {
    in: {
      p: "اسحاق",
      f: "is`haaq",
    },
    out: "اِسْحاق",
  },
  {
    in: {
      p: "سعات",
      f: "saat",
    },
    out: "سعات",
  },
  {
    in: {
      p: "سعات",
      f: "sa'aat",
    },
    out: "سَعات",
  },
  {
    in: {
      p: "استعمال",
      f: "ist'imaal",
    },
    out: "اِسْتعِمال",
  },
  {
    in: {
      p: "استعمال",
      f: "istimaal",
    },
    out: "اِسْتعِمال",
  },
  {
    in: {
      p: "اروایي",
      f: "arwaayee",
    },
    out: "اَرْوایي",
  },
  {
    in: {
      p: "اریځ",
      f: "Uryadz",
    },
    out: "اُرْیَځ",
  },
  {
    in: {
      p: "ازغن تار",
      f: "azghun taar",
    },
    out: "اَزْغ" + zwarakay + "ن" + " تار",
  },
  {
    in: {
      p: "اره څکول",
      f: "ara tskawul",
    },
    out: "اَره څْکَو" + zwarakay + "ل",
  },
  {
    in: {
      p: "اږیل",
      f: "aGuyúl",
    },
    out: "اَږ" + zwarakay + "ی" + zwarakay + "ل",
  },
  {
    in: {
      p: "استازندوی",
      f: "astaazandoy",
    },
    out: "اَسْتازَنْدوی",
  },
  // واخ being khaa in the middle of a word
  {
    in: {
      p: "استخوان",
      f: "UstUkháan",
    },
    out: "اُسْتُخ(و)ان",
  },
  {
    in: {
      p: "اسطلاع",
      f: "istilaa",
    },
    out: "اِسْطِلاع",
  },
  {
    in: {
      p: "اسهال",
      f: "is`háal",
    },
    out: "اِسْهال",
  },
  {
    in: {
      p: "اسهامي",
      f: "as`haamee",
    },
    out: "اَسْهامي",
  },
  // avoid false double consonant
  {
    in: {
      p: "ازل لیک",
      f: "azalléek",
    },
    out: "اَزَل لِیک",
  },
  // bad ending test
  {
    in: {
      p: "ماضی",
      f: "maazee",
    },
    out: undefined,
  },
  // bad beginning test
  {
    in: {
      p: "وسېدل",
      f: "osedul",
    },
    out: undefined,
  },
  {
    in: {
      p: "يست",
      f: "eest",
    },
    out: undefined,
  },
  {
    in: {
      p: "ست",
      f: "ist",
    },
    out: undefined,
  },
  {
    in: {
      p: "haca",
      f: "هځه",
    },
    out: undefined,
  },
  // tashdeed
  {
    in: {
      p: "پته",
      f: "patta",
    },
    out: "پَتّه",
  },
  {
    in: {
      p: "اعتصاب شکن",
      f: "itisaabshikan",
    },
    out: "اِعتِصاب شِکَن",
  },
  // Arabic wasla
  {
    in: {
      p: "بالکل",
      f: "bilkUl",
    },
    out: "بِٱلْکُل",
  },
  // izafe
  {
    in: {
      p: "ایصال ثواب",
      f: "eesaal-i-sawaab",
    },
    out: "اِیصالِ ثَواب",
  },
  {
    in: {
      p: "با استعداد",
      f: "baa isti'dáad",
    },
    out: "با اِسْتِعداد",
  },
  // starting with ع
  {
    in: {
      p: "عزت",
      f: "izzat",
    },
    out: "عِزَّت",
  },
  {
    in: {
      p: "عزت",
      f: "i'zzat",
    },
    out: "عِزَّت",
  },
  // ئ in the middle
  {
    in: {
      p: "برائت",
      f: "baraa'at",
    },
    out: "بَرائَت",
  },
  {
    in: {
      p: "فائده",
      f: "faaida",
    },
    out: "فائِده",
  },
  // starting with long aa
  {
    in: {
      p: "آدم",
      f: "aadam",
    },
    out: "آدَم",
  },
  {
    in: {
      p: "یدام",
      f: "aadam",
    },
    out: undefined,
  },
  {
    in: {
      p: "منع",
      f: "mán'a",
    },
    out: "مَنعَ",
  },
  {
    in: {
      p: "منع",
      f: "mana",
    },
    out: "مَنعَ",
  },
  {
    in: {
      p: "منابع",
      f: "mUnaabí",
    },
    out: "مُنابعِ",
  },
  {
    // TODO: Is this correct??
    in: {
      p: "اسان",
      f: "aasaan",
    },
    out: "اسان",
  },
  // ې followed by ی - y needs to be written as e`y to be distinguished from ay - ی
  {
    in: {
      p: "پتېیل",
      f: "patayúl",
    },
    out: undefined,
  },
  {
    in: {
      p: "پتېیل",
      f: "pate`yúl",
    },
    out: "پَتېی" + zwarakay + "ل",
  },
  {
    in: {
      p: "درېیم",
      f: "dre`yum",
    },
    out: "دْرېی" + zwarakay + "م",
  },
  {
    in: {
      p: "تابع دار",
      f: "taabidaar",
    },
    out: "تابعِ دار",
  },
  // handle circumpositions
  {
    in: {
      p: "تر ... پورې",
      f: "tur ... pore",
    },
    out: "ت" + zwarakay + "ر ... پورې",
  },
  // joiner و
  {
    in: {
      p: "کار و بار",
      f: "kaar-U-baar",
    },
    out: "کار و بار",
  },
  {
    in: {
      p: "کاروبار",
      f: "kaar-U-baar",
    },
    out: "کاروبار",
  },
  {
    in: {
      p: "توقع",
      f: "tawaqqÚ",
    },
    out: "تَوَقّعُ",
  },
  // special behaviour with د
  {
    in: {
      p: "د",
      f: "du",
    },
    out: "د" + zwarakay,
  },
  {
    in: {
      p: "د لاس",
      f: "du laas",
    },
    out: "د" + zwarakay + " لاس",
  },
  {
    in: {
      p: "د ... په شان",
      f: "du ... pu shaan",
    },
    out: "د" + zwarakay + " ... پهٔ شان",
  },
  {
    in: {
      p: "ذبح",
      f: "zabha",
    },
    out: "ذَبْحَ",
  },
  {
    in: {
      p: "ذبح",
      f: "zabha",
    },
    out: "ذَبْحَ",
  },
  {
    in: {
      p: "ذبح کول",
      f: "zabha kawul",
    },
    out: "ذَبْحَ کَو" + zwarakay + "ل",
  },
  // require dagger alif on words ending with یٰ
  {
    in: {
      p: "یحیی",
      f: "yahyaa",
    },
    out: undefined,
  },
  {
    in: {
      p: "یحییٰ",
      f: "yahyaa",
    },
    out: "یَحْییٰ",
  },
  {
    in: {
      p: "معنیٰ",
      f: "ma'anaa",
    },
    out: "مَعَنیٰ",
  },
  // require fathatan on words ending in اً
  {
    in: {
      p: "دقیقا",
      f: "daqeeqan",
    },
    out: undefined,
  },
  {
    in: {
      p: "دقیقاً",
      f: "daqeeqan",
    },
    out: "دَقِیقاً",
  },
  // words starting in عا
  {
    in: {
      p: "عام",
      f: "aam",
    },
    out: "عام",
  },
  {
    in: {
      p: "عام",
      f: "'aam",
    },
    out: "عام",
  },
  {
    in: {
      p: "قتل عام",
      f: "qatl-i-aam",
    },
    out: "قَتْلِ عام",
  },
  {
    in: {
      p: "طمع لرل",
      f: "tama larul",
    },
    out: "طَمعَ لَر" + zwarakay + "ل",
  },
  // Ua ؤ
  {
    in: {
      p: "مودب",
      f: "mUaddab",
    },
    out: "مؤدَّب",
  },
  {
    in: {
      p: "لکۍ وال",
      f: "lakuy waal",
    },
    out: "لَکۍ وال",
  },
  // shouldn't skip the ئ at the end
  {
    in: {
      p: "شئ",
      f: "shey",
    },
    out: "شئ",
  },
  // excetption for و - wo
  {
    in: {
      p: "و",
      f: "wo",
    },
    out: "و",
  },
  {
    in: {
      p: "سړی و",
      f: "saRay wo",
    },
    out: "سَړی و",
  },
  {
    in: {
      p: "عید",
      f: "eed",
    },
    out: "عِید",
  },
  // i ending can also be i
  {
    in: {
      p: "سه",
      f: "si",
    },
    out: "سِه",
  },
  {
    in: {
      p: "سه شنبه",
      f: "sishamba",
    },
    out: "سِه شَنْبه",
  },
  {
    in: {
      p: "توجه",
      f: "tawajÚ",
    },
    out: "تَوَجُه",
  },
  {
    in: {
      p: "توجه کول",
      f: "tawajU kawul",
    },
    out: "تَوَجُه کَو" + zwarakay + "ل",
  },
  // With Arabic definate article -Ul- ال
  {
    in: {
      p: "حق الاجاره",
      f: "haq-Ul-ijaara",
    },
    out: "حَق اُلاِجاره",
  },
  {
    in: {
      p: "دار العلوم",
      f: "daar-Ul-Ulóom",
    },
    out: "دار اُلعُلُوم",
  },
  // double consonants on end of words
  {
    in: {
      p: "حق",
      f: "haqq",
    },
    out: "حَقّ",
  },
  {
    in: {
      p: "حق پر",
      f: "haqq par",
    },
    out: "حَقّ پَر",
  },
  {
    in: {
      p: "راجع کېدل",
      f: "raaji kedul",
    },
    out: "راجعِ کېد" + zwarakay + "ل",
  },
  {
    in: {
      p: "ربیع",
      f: "rabee'",
    },
    out: "رَبِیع",
  },
  {
    in: {
      p: "سختسری",
      f: "sakht săray",
    },
    out: "سَخْتْسَری",
  },
  {
    in: {
      p: "معنیٰ",
      f: "ma'naa",
    },
    out: "مَعنیٰ",
  },
  // issue with یٰ ending and then continuing to the next word
  {
    in: {
      p: "معنیٰ دار",
      f: "ma'naa daar",
    },
    out: "مَعنیٰ دار",
  },
  {
    in: {
      p: "اله",
      f: "ilah",
    },
    out: "اِلَهْ",
  },
  // issue with words ending in عه going to the next word
  {
    in: {
      p: "قطعه بازي",
      f: "qit'a baazee",
    },
    out: "قِطعه بازي",
  },
  // أ in the middle of the word
  {
    in: {
      p: "متأسف",
      f: "mUta'assif",
    },
    out: "مُتأسِّف",
  },
  // words ending in ع a' on to the next word
  {
    in: {
      p: "مربع",
      f: "mUraba'",
    },
    out: "مُرَبَع",
  },
  {
    in: {
      p: "مربع جذر",
      f: "mUraba' jazúr",
    },
    out: "مُرَبَع جَذ" + zwarakay + "ر",
  },
  {
    in: {
      p: "مسوول",
      f: "mas'ool",
    },
    out: "مَسوُول", // TODO: Is this best??
  },
  // allow for beginnings prefixed with ور در را
  {
    in: {
      p: "وراوږد",
      f: "wăr-ooGad",
    },
    out: "وَراُوږَد",
  },
  {
    in: {
      p: "دراوږد",
      f: "dăr-ooGad",
    },
    out: "دَراُوږَد",
  },
  {
    in: {
      p: "رااوږد",
      f: "raa-ooGad",
    },
    out: "رااُوږَد",
  },
  // allow for spaces at beginning of phonetics etc.
  {
    in: {
      p: " سپین کړه",
      f: " speen kRu",
    },
    out: "سْپِین کْړهٔ",
  },
  {
    in: {
      p: "اوب",
      f: "ob",
    },
    out: "اوب",
  },
  // allow oo at start with و prefix
  {
    in: {
      p: "وباسي",
      f: "oobaasee",
    },
    out: "وباسي",
  },
  {
    in: {
      p: "وځم",
      f: "oodzum",
    },
    out: "وځ" + zwarakay + "م",
  },
  {
    in: {
      p: "وځم",
      f: "wUdzum",
    },
    out: "وُځ" + zwarakay + "م",
  },
];

// TODO: قطع کول - qat'a kawul - failing
// TODO: فی الحال
// TODO: الله words

toTest.forEach((t) => {
  test(`${t.in.p} given phonetics ${t.in.f} should translate to ${t.out}`, () => {
    const output = phoneticsToDiacritics(t.in.p, t.in.f);
    expect(output).toBe(t.out);
  });
});

test("should forbid oo prefixes when the option is passed", () => {
  const output = phoneticsToDiacritics("وځم", "oodzum", true);
  expect(output).toBe(undefined);
});
