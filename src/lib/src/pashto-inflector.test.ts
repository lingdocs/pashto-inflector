/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// TODO: See if there are animate feminine words ending in ي and test

import { inflectRegularYayUnisex, inflectWord } from "./pashto-inflector";
import * as T from "../../types";

const adjectives: {
  in: T.DictionaryEntry;
  out: T.InflectorOutput;
}[] = [
  // irregular adj.
  {
    in: {
      ts: 1527815451,
      p: "زوړ",
      f: "zoR",
      g: "",
      e: "old",
      c: "adj. irreg.",
      i: 6264,
      infap: "زاړه",
      infaf: "zaaRu",
      infbp: "زړ",
      infbf: "zaR",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "زوړ", f: "zoR" }],
          [{ p: "زاړه", f: "zaaRú" }],
          [{ p: "زړو", f: "zaRó" }],
        ],
        fem: [
          [{ p: "زړه", f: "zaRá" }],
          [{ p: "زړې", f: "zaRé" }],
          [{ p: "زړو", f: "zaRó" }],
        ],
      },
      vocative: {
        masc: [[{ p: "زوړه", f: "zóRa" }], [{ p: "زړو", f: "zaRó" }]],
        fem: [[{ p: "زړې", f: "zaRé" }], [{ p: "زړو", f: "zaRó" }]],
      },
    },
  },
  // regular adjective ending in ی
  {
    in: {
      ts: 1527815306,
      p: "ستړی",
      f: "stúRay",
      g: "",
      e: "tired",
      c: "adj.",
      i: 6564,
    },
    out: {
      inflections: {
        masc: [
          [{ p: "ستړی", f: "stúRay" }],
          [{ p: "ستړي", f: "stúRee" }],
          [
            { p: "ستړیو", f: "stúRiyo" },
            { p: "ستړو", f: "stúRo" },
          ],
        ],
        fem: [
          [{ p: "ستړې", f: "stúRe" }],
          [{ p: "ستړې", f: "stúRe" }],
          [
            { p: "ستړیو", f: "stúRiyo" },
            { p: "ستړو", f: "stúRo" },
          ],
        ],
      },
      vocative: {
        masc: [
          [{ p: "ستړیه", f: "stúRiya" }],
          [
            { p: "ستړیو", f: "stúRiyo" },
            { p: "ستړو", f: "stúRo" },
          ],
        ],
        fem: [
          [{ p: "ستړې", f: "stúRe" }],
          [
            { p: "ستړیو", f: "stúRiyo" },
            { p: "ستړو", f: "stúRo" },
          ],
        ],
      },
    },
  },
  // regular adjective ending in ی with stress on the end
  {
    in: {
      ts: 1527813636,
      p: "وروستی",
      f: "wroostáy",
      g: "",
      e: "last, latest, recent",
      c: "adj.",
      i: 12026,
    },
    out: {
      inflections: {
        masc: [
          [{ p: "وروستی", f: "wroostáy" }],
          [{ p: "وروستي", f: "wroostée" }],
          [
            { p: "وروستیو", f: "wroostúyo" },
            { p: "وروستو", f: "wroostó" },
          ],
        ],
        fem: [
          [{ p: "وروستۍ", f: "wroostúy" }],
          [{ p: "وروستۍ", f: "wroostúy" }],
          [
            { p: "وروستیو", f: "wroostúyo" },
            { p: "وروستو", f: "wroostó" },
          ],
        ],
      },
      vocative: {
        masc: [
          [{ p: "وروستیه", f: "wroostúya" }],
          [
            { p: "وروستیو", f: "wroostúyo" },
            { p: "وروستو", f: "wroostó" },
          ],
        ],
        fem: [
          [{ p: "وروستۍ", f: "wroostúy" }],
          [
            { p: "وروستیو", f: "wroostúyo" },
            { p: "وروستو", f: "wroostó" },
          ],
        ],
      },
    },
  },
  // regular adjective ending in a consonant
  {
    in: {
      ts: 1527813498,
      p: "سپک",
      f: "spuk",
      g: "",
      e: "light; dishonorable, not respectable",
      c: "adj.",
      i: 6502,
    },
    out: {
      inflections: {
        masc: [
          [{ p: "سپک", f: "spuk" }],
          [{ p: "سپک", f: "spuk" }],
          [{ p: "سپکو", f: "spúko" }],
        ],
        fem: [
          [{ p: "سپکه", f: "spúka" }],
          [{ p: "سپکې", f: "spúke" }],
          [{ p: "سپکو", f: "spúko" }],
        ],
      },
      vocative: {
        masc: [[{ p: "سپکه", f: "spúka" }], [{ p: "سپکو", f: "spúko" }]],
        fem: [[{ p: "سپکې", f: "spúke" }], [{ p: "سپکو", f: "spúko" }]],
      },
    },
  },
  // regular adjective ending in a consonant with an accent already
  {
    in: {
      ts: 1527818704,
      i: 352,
      p: "ارت",
      f: "arát",
      g: "arat",
      e: "wide, spacious, extensive",
      c: "adj.",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "ارت", f: "arát" }],
          [{ p: "ارت", f: "arát" }],
          [{ p: "ارتو", f: "aráto" }],
        ],
        fem: [
          [{ p: "ارته", f: "aráta" }],
          [{ p: "ارتې", f: "aráte" }],
          [{ p: "ارتو", f: "aráto" }],
        ],
      },
      vocative: {
        masc: [[{ p: "ارته", f: "aráta" }], [{ p: "ارتو", f: "aráto" }]],
        fem: [[{ p: "ارتې", f: "aráte" }], [{ p: "ارتو", f: "aráto" }]],
      },
    },
  },
  {
    in: {
      ts: 1527812862,
      p: "لوی",
      f: "looy",
      g: "",
      e: "big, great, large",
      c: "adj.",
      i: 9945,
    },
    out: {
      inflections: {
        masc: [
          [{ p: "لوی", f: "looy" }],
          [{ p: "لوی", f: "looy" }],
          [{ p: "لویو", f: "lóoyo" }],
        ],
        fem: [
          [{ p: "لویه", f: "lóoya" }],
          [{ p: "لویې", f: "lóoye" }],
          [{ p: "لویو", f: "lóoyo" }],
        ],
      },
      vocative: {
        masc: [[{ p: "لویه", f: "lóoya" }], [{ p: "لویو", f: "lóoyo" }]],
        fem: [[{ p: "لویې", f: "lóoye" }], [{ p: "لویو", f: "lóoyo" }]],
      },
    },
  },
  {
    in: {
      ts: 1527811469,
      p: "پوه",
      f: "poh",
      g: "",
      e: "understanding, having understood; intelligent, quick, wise, clever; expert",
      c: "adj.",
      i: 2430,
    },
    out: {
      inflections: {
        masc: [
          [{ p: "پوه", f: "poh" }],
          [{ p: "پوه", f: "poh" }],
          [{ p: "پوهو", f: "póho" }],
        ],
        fem: [
          [{ p: "پوهه", f: "póha" }],
          [{ p: "پوهې", f: "póhe" }],
          [{ p: "پوهو", f: "póho" }],
        ],
      },
      vocative: {
        masc: [[{ p: "پوهه", f: "póha" }], [{ p: "پوهو", f: "póho" }]],
        fem: [[{ p: "پوهې", f: "póhe" }], [{ p: "پوهو", f: "póho" }]],
      },
    },
  },
  // adjective ending in u
  {
    in: {
      ts: 1527812791,
      p: "ویده",
      f: "weedú",
      g: "weedu",
      e: "asleep",
      c: "adj.",
      i: 1,
    },
    out: {
      inflections: {
        masc: [
          [{ p: "ویده", f: "weedú" }],
          [{ p: "ویده", f: "weedú" }],
          [{ p: "ویدو", f: "weedó" }],
        ],
        fem: [
          [{ p: "ویده", f: "weedá" }],
          [{ p: "ویدې", f: "weedé" }],
          [{ p: "ویدو", f: "weedó" }],
        ],
      },
      vocative: {
        masc: [[{ p: "ویده", f: "weedá" }], [{ p: "ویدو", f: "weedó" }]],
        fem: [[{ p: "ویدې", f: "weedé" }], [{ p: "ویدو", f: "weedó" }]],
      },
    },
  },
  {
    in: {
      ts: 1527812792,
      p: "ښایسته",
      f: "xaaystu",
      g: "xaaystu",
      e: "beautiful",
      c: "adj.",
      i: 1,
    },
    out: {
      inflections: {
        masc: [
          [{ p: "ښایسته", f: "xaaystu" }],
          [{ p: "ښایسته", f: "xaaystu" }],
          [{ p: "ښایستو", f: "xaaysto" }],
        ],
        fem: [
          [{ p: "ښایسته", f: "xaaysta" }],
          [{ p: "ښایستې", f: "xaayste" }],
          [{ p: "ښایستو", f: "xaaysto" }],
        ],
      },
      vocative: {
        masc: [
          [{ p: "ښایسته", f: "xaaysta" }],
          [{ p: "ښایستو", f: "xaaysto" }],
        ],
        fem: [[{ p: "ښایستې", f: "xaayste" }], [{ p: "ښایستو", f: "xaaysto" }]],
      },
    },
  },
  // numbers should inflect just like adjectives
  {
    in: {
      ts: 1588688995113,
      i: 8176,
      p: "شپږ",
      f: "shpuG",
      g: "shpug",
      e: "six",
      c: "num.",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "شپږ", f: "shpuG" }],
          [{ p: "شپږ", f: "shpuG" }],
          [{ p: "شپږو", f: "shpúGo" }],
        ],
        fem: [
          [{ p: "شپږه", f: "shpúGa" }],
          [{ p: "شپږې", f: "shpúGe" }],
          [{ p: "شپږو", f: "shpúGo" }],
        ],
      },
      vocative: {
        masc: [[{ p: "شپږه", f: "shpúGa" }], [{ p: "شپږو", f: "shpúGo" }]],
        fem: [[{ p: "شپږې", f: "shpúGe" }], [{ p: "شپږو", f: "shpúGo" }]],
      },
    },
  },
  // without accents
  {
    in: {
      ts: 1527812796,
      i: 8574,
      p: "ښه",
      f: "xu",
      g: "xu",
      e: "good",
      c: "adj.",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "ښه", f: "xu" }],
          [{ p: "ښه", f: "xu" }],
          [{ p: "ښو", f: "xo" }],
        ],
        fem: [
          [{ p: "ښه", f: "xa" }],
          [{ p: "ښې", f: "xe" }],
          [{ p: "ښو", f: "xo" }],
        ],
      },
      vocative: {
        masc: [[{ p: "ښه", f: "xa" }], [{ p: "ښو", f: "xo" }]],
        fem: [[{ p: "ښې", f: "xe" }], [{ p: "ښو", f: "xo" }]],
      },
    },
  },
  // pattern 5 adjectives
  {
    in: {
      ts: 1527815265,
      i: 10891,
      p: "شین",
      f: "sheen",
      g: "sheen",
      e: "green, blue; unripe, immature; bright, sunny",
      r: 4,
      c: "adj.",
      infap: "شنه",
      infaf: "shnu",
      infbp: "شن",
      infbf: "shn",
      a: 1,
    },
    out: {
      inflections: {
        masc: [
          [{ p: "شین", f: "sheen" }],
          [{ p: "شنه", f: "shnu" }],
          [{ p: "شنو", f: "shno" }],
        ],
        fem: [
          [{ p: "شنه", f: "shna" }],
          [{ p: "شنې", f: "shne" }],
          [{ p: "شنو", f: "shno" }],
        ],
      },
      vocative: {
        masc: [[{ p: "شنه", f: "shna" }], [{ p: "شنو", f: "shno" }]],
        fem: [[{ p: "شنې", f: "shne" }], [{ p: "شنو", f: "shno" }]],
      },
    },
  },
  // adjective non-inflecting
  {
    in: {
      ts: 1527812798,
      p: "خفه",
      f: "khufa",
      g: "",
      e: "sad, upset, angry; choked, suffocated",
      c: "adj.",
      i: 4631,
    },
    out: false,
  },
  {
    in: {
      ts: 1527814727,
      p: "اجباري",
      f: "ijbaaree",
      g: "",
      e: "compulsory, obligatory",
      c: "adj.",
      i: 167,
    },
    out: false,
  },
  // double adjective
  {
    in: {
      ts: 123,
      p: "ګډ وډ",
      f: "guD wuD",
      g: "guDwuD",
      e: "mixed up",
      c: "adj. doub.",
      i: 1,
    },
    out: {
      inflections: {
        masc: [
          [{ p: "ګډ وډ", f: "guD wuD" }],
          [{ p: "ګډ وډ", f: "guD wuD" }],
          [{ p: "ګډو وډو", f: "gúDo wúDo" }],
        ],
        fem: [
          [{ p: "ګډه وډه", f: "gúDa wúDa" }],
          [{ p: "ګډې وډې", f: "gúDe wúDe" }],
          [{ p: "ګډو وډو", f: "gúDo wúDo" }],
        ],
      },
      vocative: {
        masc: [
          [{ p: "ګډه وډه", f: "gúDa wúDa" }],
          [{ p: "ګډو وډو", f: "gúDo wúDo" }],
        ],
        fem: [
          [{ p: "ګډې وډې", f: "gúDe wúDe" }],
          [{ p: "ګډو وډو", f: "gúDo wúDo" }],
        ],
      },
    },
  },
];

const nouns: {
  in: T.DictionaryEntry;
  out: T.InflectorOutput;
}[] = [
  // ## UNISEX
  // Unisex noun irregular
  {
    in: {
      ts: 1527812908,
      p: "مېلمه",
      f: "melmá",
      e: "guest",
      g: "",
      c: "n. m. irreg. unisex",
      i: 11244,
      infap: "مېلمانه",
      infaf: "melmaanu",
      infbp: "مېلمن",
      infbf: "melman",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "مېلمه", f: "melmá" }],
          [{ p: "مېلمانه", f: "melmaanú" }],
          [{ p: "مېلمنو", f: "melmanó" }],
        ],
        fem: [
          [{ p: "مېلمنه", f: "melmaná" }],
          [{ p: "مېلمنې", f: "melmané" }],
          [{ p: "مېلمنو", f: "melmanó" }],
        ],
      },
      vocative: {
        masc: [[{ p: "مېلمه", f: "melmá" }], [{ p: "مېلمنو", f: "melmanó" }]],
        fem: [[{ p: "مېلمنې", f: "melmané" }], [{ p: "مېلمنو", f: "melmanó" }]],
      },
    },
  },
  // Unisex noun ending with ی
  {
    in: {
      ts: 1527814159,
      p: "ملګری",
      f: "malgúray",
      g: "",
      e: "friend, companion",
      c: "n. m. unisex",
      i: 10943,
    },
    out: {
      inflections: {
        masc: [
          [{ p: "ملګری", f: "malgúray" }],
          [{ p: "ملګري", f: "malgúree" }],
          [
            { p: "ملګریو", f: "malgúriyo" },
            { p: "ملګرو", f: "malgúro" },
          ],
        ],
        fem: [
          [{ p: "ملګرې", f: "malgúre" }],
          [{ p: "ملګرې", f: "malgúre" }],
          [
            { p: "ملګریو", f: "malgúriyo" },
            { p: "ملګرو", f: "malgúro" },
          ],
        ],
      },
      vocative: {
        masc: [
          [{ p: "ملګریه", f: "malgúriya" }],
          [
            { p: "ملګریو", f: "malgúriyo" },
            { p: "ملګرو", f: "malgúro" },
          ],
        ],
        fem: [
          [{ p: "ملګرې", f: "malgúre" }],
          [
            { p: "ملګریو", f: "malgúriyo" },
            { p: "ملګرو", f: "malgúro" },
          ],
        ],
      },
    },
  },
  // Unisex noun ending on ی with emphasis on the end
  {
    in: {
      i: 3319,
      ts: 1527816431,
      p: "ترورزی",
      f: "trorzáy",
      g: "trorzay",
      e: "cousin (of paternal aunt)",
      c: "n. m. unisex",
      ppp: "ترورزامن",
      ppf: "trorzaamun",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "ترورزی", f: "trorzáy" }],
          [{ p: "ترورزي", f: "trorzée" }],
          [
            { p: "ترورزیو", f: "trorzúyo" },
            { p: "ترورزو", f: "trorzó" },
          ],
        ],
        fem: [
          [{ p: "ترورزۍ", f: "trorzúy" }],
          [{ p: "ترورزۍ", f: "trorzúy" }],
          [
            { p: "ترورزیو", f: "trorzúyo" },
            { p: "ترورزو", f: "trorzó" },
          ],
        ],
      },
      vocative: {
        masc: [
          [{ p: "ترورزیه", f: "trorzúya" }],
          [
            { p: "ترورزیو", f: "trorzúyo" },
            { p: "ترورزو", f: "trorzó" },
            { p: "ترورزامنو", f: "trorzaamuno" },
          ],
        ],
        fem: [
          [{ p: "ترورزۍ", f: "trorzúy" }],
          [
            { p: "ترورزیو", f: "trorzúyo" },
            { p: "ترورزو", f: "trorzó" },
          ],
        ],
      },
      plural: {
        masc: [
          [{ p: "ترورزامن", f: "trorzaamun" }],
          [{ p: "ترورزامنو", f: "trorzaamuno" }],
        ],
      },
    },
  },
  // Unisex noun ending with a consanant
  {
    in: {
      ts: 1527820043,
      p: "چرګ",
      f: "churg",
      g: "",
      e: "rooster, cock; chicken, poultry",
      c: "n. m. unisex anim.",
      i: 4101,
    },
    out: {
      inflections: {
        masc: [
          [{ p: "چرګ", f: "churg" }],
          [{ p: "چرګ", f: "churg" }],
          [{ p: "چرګو", f: "chúrgo" }],
        ],
        fem: [
          [{ p: "چرګه", f: "chúrga" }],
          [{ p: "چرګې", f: "chúrge" }],
          [{ p: "چرګو", f: "chúrgo" }],
        ],
      },
      vocative: {
        masc: [
          [{ p: "چرګه", f: "chúrga" }],
          [
            { p: "چرګو", f: "chúrgo" },
            { p: "چرګانو", f: "churgáano" },
          ],
        ],
        fem: [
          [{ p: "چرګې", f: "chúrge" }],
          [
            { p: "چرګو", f: "chúrgo" },
            { p: "چرګانو", f: "churgáano" },
          ],
        ],
      },
      plural: {
        masc: [
          [{ p: "چرګان", f: "churgáan" }],
          [{ p: "چرګانو", f: "churgáano" }],
        ],
        fem: [
          [{ p: "چرګانې", f: "churgáane" }],
          [{ p: "چرګانو", f: "churgáano" }],
        ],
      },
      bundledPlural: {
        masc: [[{ p: "چرګه", f: "chúrga" }], [{ p: "چرګو", f: "chúrgo" }]],
      },
    },
  },
  // with #3 pattern anim unisex
  {
    in: {
      ts: 1527820130,
      i: 2561,
      p: "پلوی",
      f: "palawáy",
      g: "palaway",
      e: "adherent, supporter; the outside or further ox in a team of oxes grinding or threshing",
      c: "n. m. anim. unisex",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "پلوی", f: "palawáy" }],
          [{ p: "پلوي", f: "palawée" }],
          [
            { p: "پلویو", f: "palawúyo" },
            { p: "پلوو", f: "palawó" },
          ],
        ],
        fem: [
          [{ p: "پلوۍ", f: "palawúy" }],
          [{ p: "پلوۍ", f: "palawúy" }],
          [
            { p: "پلویو", f: "palawúyo" },
            { p: "پلوو", f: "palawó" },
          ],
        ],
      },
      vocative: {
        masc: [
          [{ p: "پلویه", f: "palawúya" }],
          [
            { p: "پلویو", f: "palawúyo" },
            { p: "پلوو", f: "palawó" },
            { p: "پلویانو", f: "palawiyáano" },
          ],
        ],
        fem: [
          [{ p: "پلوۍ", f: "palawúy" }],
          [
            { p: "پلویو", f: "palawúyo" },
            { p: "پلوو", f: "palawó" },
            { p: "پلویانو", f: "palawiyáano" },
          ],
        ],
      },
      plural: {
        masc: [
          [{ p: "پلویان", f: "palawiyáan" }],
          [{ p: "پلویانو", f: "palawiyáano" }],
        ],
        fem: [
          [{ p: "پلویانې", f: "palawiyáane" }],
          [{ p: "پلویانو", f: "palawiyáano" }],
        ],
      },
    },
  },
  // ## MASCULINE
  // Masculine regular ending in ی
  {
    in: {
      ts: 1527815251,
      p: "سړی",
      f: "saRáy",
      g: "",
      e: "man",
      c: "n. m.",
      i: 6750,
    },
    out: {
      inflections: {
        masc: [
          [{ p: "سړی", f: "saRáy" }],
          [{ p: "سړي", f: "saRée" }],
          [
            { p: "سړیو", f: "saRúyo" },
            { p: "سړو", f: "saRó" },
          ],
        ],
      },
      vocative: {
        masc: [
          [{ p: "سړیه", f: "saRúya" }],

          [
            { p: "سړیو", f: "saRúyo" },
            { p: "سړو", f: "saRó" },
          ],
        ],
      },
    },
  },
  // Masculine #3 anim
  // TODO: Also do Fem #3 anim!
  {
    in: {
      ts: 1527819801,
      i: 8082,
      p: "سیلانی",
      f: "saylaanáy",
      g: "saylaanay",
      e: "tourist, sightseer, visitor",
      // only masculine here for testing purposes
      c: "n. m. anim.",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "سیلانی", f: "saylaanáy" }],
          [{ p: "سیلاني", f: "saylaanée" }],
          [
            { p: "سیلانیو", f: "saylaanúyo" },
            { p: "سیلانو", f: "saylaanó" },
          ],
        ],
      },
      vocative: {
        masc: [
          [{ p: "سیلانیه", f: "saylaanúya" }],
          [
            { p: "سیلانیو", f: "saylaanúyo" },
            { p: "سیلانو", f: "saylaanó" },
            { p: "سیلانیانو", f: "saylaaniyáano" },
          ],
        ],
      },
      plural: {
        masc: [
          [{ p: "سیلانیان", f: "saylaaniyáan" }],
          [{ p: "سیلانیانو", f: "saylaaniyáano" }],
        ],
      },
    },
  },
  // Masculine regular ending in ی with emphasis on end
  {
    in: {
      ts: 1527818511,
      p: "ترېلی",
      f: "treláy",
      g: "",
      e: "pool, reservoir",
      c: "n. m.",
      i: 2931,
    },
    out: {
      inflections: {
        masc: [
          [{ p: "ترېلی", f: "treláy" }],
          [{ p: "ترېلي", f: "trelée" }],
          [
            { p: "ترېلیو", f: "trelúyo" },
            { p: "ترېلو", f: "treló" },
          ],
        ],
      },
      vocative: {
        masc: [
          [{ p: "ترېلیه", f: "trelúya" }],
          [
            { p: "ترېلیو", f: "trelúyo" },
            { p: "ترېلو", f: "treló" },
          ],
        ],
      },
    },
  },
  // Masculine ending in tob
  {
    in: {
      i: 11998,
      ts: 1586760783536,
      p: "مشرتوب",
      f: "mushurtób",
      g: "",
      e: "leadership, authority, presidency",
      c: "n. m.",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "مشرتوب", f: "mushurtób" }],
          [{ p: "مشرتابه", f: "mushurtaabú" }],
          [{ p: "مشرتبو", f: "mushurtábo" }],
        ],
      },
      vocative: {
        masc: [
          [{ p: "مشرتوبه", f: "mushurtóba" }],
          [{ p: "مشرتبو", f: "mushurtábo" }],
        ],
      },
    },
  },
  // Masculine irregular
  {
    in: {
      ts: 1527813809,
      i: 11318,
      p: "لمونځ",
      f: "lamóondz",
      g: "lamóondz",
      e: "Muslim ritual prayers (namaz, salah, salat)",
      c: "n. m. irreg.",
      infap: "لمانځه",
      infaf: "lamaandzú",
      infbp: "لمنځ",
      infbf: "lamandz",
      ppp: "لمونځونه",
      ppf: "lamoondzóona",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "لمونځ", f: "lamóondz" }],
          [{ p: "لمانځه", f: "lamaandzú" }],
          [{ p: "لمنځو", f: "lamandzó" }],
        ],
      },
      vocative: {
        masc: [
          [{ p: "لمونځه", f: "lamóondza" }],
          [
            { p: "لمنځو", f: "lamandzó" },
            { p: "لمونځونو", f: "lamoondzóono" },
          ],
        ],
      },
      plural: {
        masc: [
          [{ p: "لمونځونه", f: "lamoondzóona" }],
          [{ p: "لمونځونو", f: "lamoondzóono" }],
        ],
      },
    },
  },
  // Masculine short squish
  {
    in: {
      i: 9049,
      ts: 1527813593,
      p: "غر",
      f: "ghar, ghur",
      g: "ghar,ghur",
      e: "mountain",
      c: "n. m.",
      infap: "غره",
      infaf: "ghru",
      infbp: "غر",
      infbf: "ghr",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "غر", f: "ghar" }],
          [{ p: "غره", f: "ghru" }],
          [{ p: "غرو", f: "ghro" }],
        ],
      },
      vocative: {
        masc: [
          [{ p: "غره", f: "ghra" }],
          [
            { p: "غرو", f: "ghro" },
            { p: "غرونو", f: "ghróono" },
          ],
        ],
      },
      plural: {
        masc: [[{ p: "غرونه", f: "ghróona" }], [{ p: "غرونو", f: "ghróono" }]],
      },
      bundledPlural: {
        masc: [[{ p: "غره", f: "ghára" }], [{ p: "غرو", f: "gháro" }]],
      },
    },
  },
  // should NOT do the oona plural with the squish nouns, when thay're animate
  {
    in: {
      i: 5465,
      ts: 1527812802,
      p: "خر",
      f: "khur",
      g: "khur",
      e: "donkay",
      c: "n. m. anim. unisex irreg.",
      infap: "خره",
      infaf: "khru",
      infbp: "خر",
      infbf: "khr",
    },
    out: {
      inflections: {
        // TODO: use smarter system using new isType5Entry predicates, to allow for not using the redundant one syllable accents with these
        masc: [
          [{ p: "خر", f: "khur" }],
          [{ p: "خره", f: "khru" }],
          [{ p: "خرو", f: "khro" }],
        ],
        fem: [
          [{ p: "خره", f: "khra" }],
          [{ p: "خرې", f: "khre" }],
          [{ p: "خرو", f: "khro" }],
        ],
      },
      vocative: {
        masc: [[{ p: "خره", f: "khra" }], [{ p: "خرو", f: "khro" }]],
        fem: [[{ p: "خرې", f: "khre" }], [{ p: "خرو", f: "khro" }]],
      },
    },
  },
  // masc plural
  {
    in: {
      i: 6063,
      ts: 1527815739,
      p: "دروغ",
      f: "drogh, darwagh",
      g: "drogh,darwagh",
      e: "lie, falsehood",
      c: "n. m. pl.",
    },
    out: {
      plural: {
        masc: [[{ p: "دروغ", f: "drogh" }], [{ p: "دروغو", f: "drogho" }]],
      },
    },
  },
  {
    in: {
      i: 9191,
      ts: 1527817330,
      p: "غنم",
      f: "ghanúm",
      g: "ghanum",
      e: "wheat",
      c: "n. m. pl.",
    },
    out: {
      plural: {
        masc: [[{ p: "غنم", f: "ghanúm" }], [{ p: "غنمو", f: "ghanúmo" }]],
      },
    },
  },
  {
    in: {
      ts: 1527813508,
      i: 7058,
      p: "زړه",
      f: "zRu",
      g: "zRu",
      e: "heart",
      c: "n. m.",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "زړه", f: "zRu" }],
          [{ p: "زړه", f: "zRu" }],
          [{ p: "زړو", f: "zRo" }],
        ],
      },
      vocative: {
        masc: [
          [{ p: "زړه", f: "zRa" }],
          [
            { p: "زړو", f: "zRo" },
            { p: "زړونو", f: "zRóono" },
          ],
        ],
      },
      plural: {
        masc: [[{ p: "زړونه", f: "zRóona" }], [{ p: "زړونو", f: "zRóono" }]],
      },
    },
  },
  // fem plural
  {
    in: {
      ts: 1527815129,
      i: 1013,
      p: "اوبه",
      f: "oobú",
      g: "oobu",
      e: "water",
      c: "n. f. pl.",
    },
    out: {
      plural: {
        fem: [[{ p: "اوبه", f: "oobú" }], [{ p: "اوبو", f: "oobó" }]],
      },
    },
  },
  {
    in: {
      ts: 1527815008,
      i: 8421,
      p: "شودې",
      f: "shoodé",
      g: "shoode",
      e: "milk",
      c: "n. f. pl.",
    },
    out: {
      plural: {
        fem: [[{ p: "شودې", f: "shoodé" }], [{ p: "شودو", f: "shoodó" }]],
      },
    },
  },
  {
    in: {
      ts: 1527815008,
      i: 8421,
      p: "شودې",
      f: "shoode",
      g: "shoode",
      e: "milk",
      c: "n. f. pl.",
    },
    out: {
      plural: {
        fem: [[{ p: "شودې", f: "shoode" }], [{ p: "شودو", f: "shoodo" }]],
      },
    },
  },
  // masculine ending in a vowe
  {
    in: {
      ts: 1527816446,
      i: 12568,
      p: "کاکا",
      f: "kaakáa",
      g: "kaakaa",
      e: "paternal uncle, term of address for elderly man",
      r: 4,
      c: "n. m. anim.",
      a: 1,
    },
    out: {
      plural: {
        masc: [
          [{ p: "کاکاګان", f: "kaakaagáan" }],
          [{ p: "کاکاګانو", f: "kaakaagáano" }],
        ],
      },
    },
  },
  {
    in: {
      ts: 1527815484,
      i: 13069,
      p: "ملا",
      f: "mUláa",
      g: "mUláa",
      e: "mullah, priest",
      ppp: "ملایان",
      ppf: "mUlaayáan",
      r: 4,
      c: "n. m.",
    },
    out: {
      plural: {
        masc: [
          [
            { p: "ملایان", f: "mUlaayáan" },
            { p: "ملاګان", f: "mUlaagáan" },
          ],
          [
            { p: "ملایانو", f: "mUlaayáano" },
            { p: "ملاګانو", f: "mUlaagáano" },
          ],
        ],
      },
    },
  },
  // TODO: uncomment this
  // {
  //     in: {"ts":1527812591,"i":6286,"p":"دواړه","f":"dwáaRu","g":"dwaaRu","e":"both","c":"n. m. pl. unisex / adj."},
  //     out: {
  //         plural: {
  //             masc: [
  //                 [{ p: "دواړه", f: "dwáaRu" }],
  //                 [{ p: "دواړو", f: "dwáaRo" }],
  //             ],
  //             fem: [
  //                 [{ p: "دواړې", f: "dwáaRe" }],
  //                 [{ p: "دواړو", f: "dwáaRo" }],
  //             ],
  //         }
  //     }
  // },
  // Masculine non-inflecting
  {
    in: {
      ts: 1527812817,
      p: "کتاب",
      f: "kitaab",
      g: "",
      e: "book",
      c: "n. m.",
      i: 8640,
    },
    out: {
      inflections: {
        masc: [
          [{ p: "کتاب", f: "kitaab" }],
          [{ p: "کتاب", f: "kitaab" }],
          [{ p: "کتابو", f: "kitaabo" }],
        ],
      },
      vocative: {
        masc: [
          [{ p: "کتابه", f: "kitaaba" }],
          [
            { p: "کتابو", f: "kitaabo" },
            { p: "کتابونو", f: "kitaabóono" },
          ],
        ],
      },
      plural: {
        masc: [
          [{ p: "کتابونه", f: "kitaabóona" }],
          [{ p: "کتابونو", f: "kitaabóono" }],
        ],
      },
      bundledPlural: {
        masc: [[{ p: "کتابه", f: "kitaaba" }], [{ p: "کتابو", f: "kitaabo" }]],
      },
    },
  },
  {
    in: {
      ts: 1527816746,
      i: 9017,
      p: "غاښ",
      f: "ghaax",
      g: "ghaax",
      e: "tooth",
      c: "n. m.",
      ec: "tooth",
      ep: "teeth",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "غاښ", f: "ghaax" }],
          [{ p: "غاښ", f: "ghaax" }],
          [{ p: "غاښو", f: "gháaxo" }],
        ],
      },
      vocative: {
        masc: [
          [{ p: "غاښه", f: "gháaxa" }],
          [
            { p: "غاښو", f: "gháaxo" },
            { p: "غاښونو", f: "ghaaxóono" },
          ],
        ],
      },
      plural: {
        masc: [
          [{ p: "غاښونه", f: "ghaaxóona" }],
          [{ p: "غاښونو", f: "ghaaxóono" }],
        ],
      },
      bundledPlural: {
        masc: [[{ p: "غاښه", f: "gháaxa" }], [{ p: "غاښو", f: "gháaxo" }]],
      },
    },
  },
  {
    in: {
      ts: 1527815394,
      i: 13991,
      p: "واده",
      f: "waadú",
      g: "waadu",
      e: "wedding, marriage",
      c: "n. m.",
      ppp: "ودونه",
      ppf: "wadóona",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "واده", f: "waadú" }],
          [{ p: "واده", f: "waadú" }],
          [{ p: "وادو", f: "waadó" }],
        ],
      },
      vocative: {
        masc: [
          [{ p: "واده", f: "waadá" }],
          [
            { p: "وادو", f: "waadó" },
            { p: "ودونو", f: "wadóono" },
          ],
        ],
      },
      plural: {
        masc: [[{ p: "ودونه", f: "wadóona" }], [{ p: "ودونو", f: "wadóono" }]],
      },
    },
  },
  {
    in: {
      ts: 1527817768,
      i: 9791,
      p: "کارګه",
      f: "kaargú",
      g: "kaargú",
      e: "raven, crow",
      c: "n. m. anim.",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "کارګه", f: "kaargú" }],
          [{ p: "کارګه", f: "kaargú" }],
          [{ p: "کارګو", f: "kaargó" }],
        ],
      },
      vocative: {
        masc: [
          [{ p: "کارګه", f: "kaargá" }],
          [
            { p: "کارګو", f: "kaargó" },
            { p: "کارګانو", f: "kaargáano" },
          ],
        ],
      },
      plural: {
        masc: [
          [{ p: "کارګان", f: "kaargáan" }],
          [{ p: "کارګانو", f: "kaargáano" }],
        ],
      },
    },
  },
  {
    in: {
      i: 11352,
      ts: 1527813995,
      p: "لو",
      f: "law, lau",
      g: "law,lau",
      e: "harvesting, reaping, hay-making; mowed, reaped, harvested",
      c: "n. m.",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "لو", f: "law" }],
          [{ p: "لو", f: "law" }],
          [{ p: "لوو", f: "láwo" }],
        ],
      },
      vocative: {
        masc: [
          [{ p: "لوه", f: "láwa" }],
          [
            { p: "لوو", f: "láwo" },
            { p: "لوونو", f: "lawóono" },
          ],
        ],
      },
      plural: {
        masc: [[{ p: "لوونه", f: "lawóona" }], [{ p: "لوونو", f: "lawóono" }]],
      },
      bundledPlural: {
        masc: [[{ p: "لوه", f: "láwa" }], [{ p: "لوو", f: "láwo" }]],
      },
    },
  },
  // ## FEMININE
  // Feminine regular ending in ه
  {
    in: {
      ts: 1527812797,
      p: "ښځه",
      f: "xúdza",
      g: "",
      e: "woman, wife",
      c: "n. f.",
      i: 7444,
    },
    out: {
      inflections: {
        fem: [
          [{ p: "ښځه", f: "xúdza" }],
          [{ p: "ښځې", f: "xúdze" }],
          [{ p: "ښځو", f: "xúdzo" }],
        ],
      },
      vocative: {
        fem: [[{ p: "ښځې", f: "xúdze" }], [{ p: "ښځو", f: "xúdzo" }]],
      },
    },
  },
  {
    in: {
      ts: 1527821380,
      p: "اره",
      f: "ará",
      g: "",
      e: "saw (the tool)",
      c: "n. f.",
      i: 365,
    },
    out: {
      inflections: {
        fem: [
          [{ p: "اره", f: "ará" }],
          [{ p: "ارې", f: "aré" }],
          [{ p: "ارو", f: "aró" }],
        ],
      },
      vocative: {
        fem: [[{ p: "ارې", f: "aré" }], [{ p: "ارو", f: "aró" }]],
      },
    },
  },
  // Feminine regular ending in ع - a'
  {
    in: {
      ts: 1527820693,
      p: "مرجع",
      f: "marja'",
      g: "",
      e: "reference, authority, body, place to go (for help, shelter, etc.)",
      c: "n. f.",
      i: 10661,
      app: "مراجع",
      apf: "maraají'",
    },
    out: {
      inflections: {
        fem: [
          [{ p: "مرجع", f: "marja'" }],
          [{ p: "مرجعې", f: "marje" }],
          [{ p: "مرجعو", f: "marjo" }],
        ],
      },
      vocative: {
        fem: [
          [{ p: "مرجعې", f: "marje" }],
          [
            { p: "مرجعو", f: "marjo" },
            { p: "مراجو", f: "maraajó" },
          ],
        ],
      },
      arabicPlural: {
        fem: [[{ p: "مراجع", f: "maraají'" }], [{ p: "مراجو", f: "maraajó" }]],
      },
    },
  },
  {
    in: {
      ts: 1527820212,
      p: "منبع",
      f: "manbá",
      g: "",
      e: "source, origin, resource, cause",
      c: "n. f.",
      i: 11201,
      app: "منابع",
      apf: "manaabí",
    },
    out: {
      inflections: {
        fem: [
          [{ p: "منبع", f: "manbá" }],
          [{ p: "منبعې", f: "manbé" }],
          [{ p: "منبعو", f: "manbó" }],
        ],
      },
      vocative: {
        fem: [
          [{ p: "منبعې", f: "manbé" }],
          [
            { p: "منبعو", f: "manbó" },
            { p: "منابو", f: "manaabó" },
          ],
        ],
      },
      arabicPlural: {
        fem: [[{ p: "منابع", f: "manaabí" }], [{ p: "منابو", f: "manaabó" }]],
      },
    },
  },
  {
    in: {
      ts: 1527823093,
      i: 13207,
      p: "نبي",
      f: "nabee",
      g: "nabee",
      e: "prophet",
      c: "n. m. anim.",
      app: "انبیا",
      apf: "ambiyáa",
    },
    out: {
      plural: {
        masc: [
          [{ p: "نبیان", f: "nabiyáan" }],
          [{ p: "نبیانو", f: "nabiyáano" }],
        ],
      },
      arabicPlural: {
        masc: [
          [{ p: "انبیا", f: "ambiyáa" }],
          [{ p: "انبیاوو", f: "ambiyáawo" }],
        ],
      },
    },
  },
  {
    in: {
      ts: 1527819536,
      i: 3063,
      p: "تبع",
      f: "taba'",
      g: "taba",
      e: "follower, adherent, supporter, subject, national",
      c: "n. m. unisex anim.",
      app: "اتباع",
      apf: "atbaa",
    },
    out: {
      arabicPlural: {
        masc: [[{ p: "اتباع", f: "atbaa" }], [{ p: "اتباعوو", f: "atbaawo" }]],
      },
    },
  },
  {
    in: {
      ts: 1527816113,
      i: 3072,
      p: "تبلیغ",
      f: "tabléegh",
      g: "tabléegh",
      e: "propaganda; preaching, evangelism",
      c: "n. m.",
      app: "تبلیغات",
      apf: "tableegháat",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "تبلیغ", f: "tabléegh" }],
          [{ p: "تبلیغ", f: "tabléegh" }],
          [{ p: "تبلیغو", f: "tabléegho" }],
        ],
      },
      vocative: {
        masc: [
          [{ p: "تبلیغه", f: "tabléegha" }],
          [
            { p: "تبلیغو", f: "tabléegho" },
            { p: "تبلیغونو", f: "tableeghóono" },
            { p: "تبلیغاتو", f: "tableegháato" },
          ],
        ],
      },
      plural: {
        masc: [
          [{ p: "تبلیغونه", f: "tableeghóona" }],
          [{ p: "تبلیغونو", f: "tableeghóono" }],
        ],
      },
      bundledPlural: {
        masc: [
          [{ p: "تبلیغه", f: "tabléegha" }],
          [{ p: "تبلیغو", f: "tabléegho" }],
        ],
      },
      arabicPlural: {
        masc: [
          [{ p: "تبلیغات", f: "tableegháat" }],
          [{ p: "تبلیغاتو", f: "tableegháato" }],
        ],
      },
    },
  },
  {
    in: {
      ts: 1527815921,
      i: 3844,
      p: "توقع",
      f: "tawaqqU",
      g: "tawakkU",
      e: "expectation, hope, anticipation",
      c: "n. f.",
      app: "توقعات",
      apf: "tawaqqUaat",
    },
    out: {
      arabicPlural: {
        masc: [
          [{ p: "توقعات", f: "tawaqqUaat" }],
          [{ p: "توقعاتو", f: "tawaqqUaato" }],
        ],
      },
    },
  },
  {
    in: {
      ts: 1527815820,
      i: 5177,
      p: "حادثه",
      f: "haadisá",
      g: "haadisa",
      e: "accident, event",
      c: "n. f.",
      app: "حوادث, حادثات",
      apf: "hawaadis, haadisaat",
    },
    out: {
      inflections: {
        fem: [
          [{ p: "حادثه", f: "haadisá" }],
          [{ p: "حادثې", f: "haadisé" }],
          [{ p: "حادثو", f: "haadisó" }],
        ],
      },
      vocative: {
        fem: [[{ p: "حادثې", f: "haadisé" }], [{ p: "حادثو", f: "haadisó" }]],
      },
      arabicPlural: {
        masc: [
          [
            { p: "حوادث", f: "hawaadis" },
            { p: "حادثات", f: "haadisaat" },
          ],
          [
            { p: "حوادثو", f: "hawaadiso" },
            { p: "حادثاتو", f: "haadisaato" },
          ],
        ],
      },
    },
  },
  {
    in: {
      ts: 1527815329,
      i: 3097,
      p: "تجربه",
      f: "tajrabá, tajribá",
      g: "tajraba,tajriba",
      e: "experience",
      c: "n. f.",
      app: "تجارب",
      apf: "tajaarib",
    },
    out: {
      inflections: {
        fem: [
          [{ p: "تجربه", f: "tajrabá" }],
          [{ p: "تجربې", f: "tajrabé" }],
          [{ p: "تجربو", f: "tajrabó" }],
        ],
      },
      vocative: {
        fem: [[{ p: "تجربې", f: "tajrabé" }], [{ p: "تجربو", f: "tajrabó" }]],
      },
      arabicPlural: {
        masc: [
          [{ p: "تجارب", f: "tajaarib" }],
          [{ p: "تجاربو", f: "tajaaribo" }],
        ],
      },
    },
  },
  {
    in: {
      ts: 1527814069,
      i: 5194,
      p: "حال",
      f: "haal",
      g: "haal",
      e: "state, condition, circumstance",
      c: "n. m.",
      app: "احوال",
      apf: "ahwáal",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "حال", f: "haal" }],
          [{ p: "حال", f: "haal" }],
          [{ p: "حالو", f: "háalo" }],
        ],
      },
      vocative: {
        masc: [
          [{ p: "حاله", f: "háala" }],
          [
            { p: "حالو", f: "háalo" },
            { p: "حالونو", f: "haalóono" },
            { p: "احوالو", f: "ahwáalo" },
          ],
        ],
      },
      plural: {
        masc: [
          [{ p: "حالونه", f: "haalóona" }],
          [{ p: "حالونو", f: "haalóono" }],
        ],
      },
      bundledPlural: {
        masc: [[{ p: "حاله", f: "háala" }], [{ p: "حالو", f: "háalo" }]],
      },
      arabicPlural: {
        masc: [[{ p: "احوال", f: "ahwáal" }], [{ p: "احوالو", f: "ahwáalo" }]],
      },
    },
  },
  {
    in: {
      ts: 1527819536,
      i: 3063,
      p: "تبع",
      f: "taba'",
      g: "taba",
      e: "follower, adherent, supporter, subject, national",
      c: "n. m. unisex anim.",
      app: "اتباع",
      apf: "atbáa'",
    },
    out: {
      arabicPlural: {
        masc: [[{ p: "اتباع", f: "atbáa'" }], [{ p: "اتباعوو", f: "atbáawo" }]],
      },
    },
  },
  // Feminine regular ending in ح - a
  {
    in: {
      ts: 1527815506,
      p: "ذبح",
      f: "zabha",
      g: "",
      e: "slaughter, killing, butchering",
      c: "n. f.",
      i: 5813,
    },
    out: {
      inflections: {
        fem: [
          [{ p: "ذبح", f: "zabha" }],
          [{ p: "ذبحې", f: "zabhe" }],
          [{ p: "ذبحو", f: "zabho" }],
        ],
      },
      vocative: {
        fem: [[{ p: "ذبحې", f: "zabhe" }], [{ p: "ذبحو", f: "zabho" }]],
      },
    },
  },
  // Feminine inanimate regular with missing ه
  {
    in: {
      ts: 1527814150,
      p: "لار",
      f: "laar",
      g: "",
      e: "road, way, path",
      c: "n. f.",
      i: 9593,
    },
    out: {
      inflections: {
        fem: [
          [{ p: "لار", f: "laar" }],
          [{ p: "لارې", f: "láare" }],
          [{ p: "لارو", f: "láaro" }],
        ],
      },
      vocative: {
        fem: [[{ p: "لارې", f: "láare" }], [{ p: "لارو", f: "láaro" }]],
      },
    },
  },
  // Feminine animate ending in a consonant
  // TODO: ALLOW FOR MULTIPLE PLURAL POSSIBILITIES میندې, میېنې etc.
  {
    in: {
      ts: 1527812928,
      p: "مور",
      f: "mor",
      g: "",
      e: "mother, mom",
      c: "n. f. anim.",
      ppp: "میندې",
      ppf: "maynde",
      i: 11113,
    },
    out: {
      vocative: {
        fem: [[{ p: "مورې", f: "móre" }], [{ p: "میندو", f: "mayndo" }]],
      },
      plural: {
        fem: [[{ p: "میندې", f: "maynde" }], [{ p: "میندو", f: "mayndo" }]],
      },
    },
  },
  {
    in: {
      ts: 1715165815298,
      i: 17989,
      p: "وریندار",
      f: "wreendáar",
      g: "wreendaar",
      e: "brother's wife, sister-in-law (of male)",
      r: 4,
      c: "n. f. anim.",
    },
    out: {
      inflections: {
        fem: [
          [{ p: "وریندار", f: "wreendáar" }],
          [{ p: "وریندارې", f: "wreendáare" }],
          [{ p: "وریندارو", f: "wreendáaro" }],
        ],
      },
      vocative: {
        fem: [
          [{ p: "وریندارې", f: "wreendáare" }],
          [{ p: "وریندارو", f: "wreendáaro" }],
        ],
      },
    },
  },
  // Feminine regular inanimate ending in ي
  {
    in: {
      ts: 1527811877,
      p: "دوستي",
      f: "dostee",
      g: "",
      e: "friendship",
      c: "n. f.",
      i: 5503,
    },
    out: {
      plural: {
        fem: [
          [{ p: "دوستیانې", f: "dostiyáane" }],
          [{ p: "دوستیانو", f: "dostiyáano" }],
        ],
      },
      inflections: {
        fem: [
          [{ p: "دوستي", f: "dostee" }],
          [{ p: "دوستۍ", f: "dostúy" }],
          [
            { p: "دوستیو", f: "dostúyo" },
            { p: "دوستو", f: "dostó" },
          ],
        ],
      },
      vocative: {
        fem: [
          [{ p: "دوستي", f: "dostee" }],
          [
            { p: "دوستیو", f: "dostúyo" },
            { p: "دوستو", f: "dostó" },
            { p: "دوستیانو", f: "dostiyáano" },
          ],
        ],
      },
    },
  },
  // Feminine regular ending in ۍ
  {
    in: {
      ts: 1527814203,
      p: "کرسۍ",
      f: "kUrsuy",
      g: "",
      e: "chair, seat, stool",
      c: "n. f.",
      i: 8718,
    },
    out: {
      inflections: {
        fem: [
          [{ p: "کرسۍ", f: "kUrsúy" }],
          [{ p: "کرسۍ", f: "kUrsúy" }],
          [
            { p: "کرسیو", f: "kUrsúyo" },
            { p: "کرسو", f: "kUrsó" },
          ],
        ],
      },
      vocative: {
        fem: [
          [{ p: "کرسۍ", f: "kUrsúy" }],
          [
            { p: "کرسیو", f: "kUrsúyo" },
            { p: "کرسو", f: "kUrsó" },
          ],
        ],
      },
    },
  },
  {
    in: {
      ts: 1527823526,
      i: 12229,
      p: "قاضۍ",
      f: "qaazúy",
      g: "kaazuy",
      e: "female judge",
      r: 4,
      c: "n. f. anim.",
    },
    out: {
      inflections: {
        fem: [
          [{ p: "قاضۍ", f: "qaazúy" }],
          [{ p: "قاضۍ", f: "qaazúy" }],
          [
            { p: "قاضیو", f: "qaazúyo" },
            { p: "قاضو", f: "qaazó" },
          ],
        ],
      },
      vocative: {
        fem: [
          [{ p: "قاضۍ", f: "qaazúy" }],
          [
            { p: "قاضیو", f: "qaazúyo" },
            { p: "قاضو", f: "qaazó" },
            { p: "قاضیانو", f: "qaaziyáano" },
          ],
        ],
      },
      plural: {
        fem: [
          [{ p: "قاضیانې", f: "qaaziyáane" }],
          [{ p: "قاضیانو", f: "qaaziyáano" }],
        ],
      },
    },
  },
  // Feminine regular ending in ا
  {
    in: {
      ts: 1527812456,
      p: "اړتیا",
      f: "aRtiyáa, aRtyáa",
      g: "",
      e: "need, necessity",
      c: "n. f.",
      i: 376,
    },
    out: {
      plural: {
        fem: [
          [
            { p: "اړتیاوې", f: "aRtiyáawe" },
            { p: "اړتیاګانې", f: "aRtiyaagáane" },
          ],
          [
            { p: "اړتیاوو", f: "aRtiyáawo" },
            { p: "اړتیاګانو", f: "aRtiyaagáano" },
          ],
        ],
      },
    },
  },
  // Feminine regular ending in و
  {
    in: {
      i: 2899,
      ts: 1527815163,
      p: "پیشو",
      f: "peeshó",
      g: "peesho",
      e: "cat",
      c: "n. f. anim.",
    },
    out: {
      plural: {
        fem: [
          [
            { p: "پیشووې", f: "peeshówe" },
            { p: "پیشوګانې", f: "peeshogáane" },
          ],
          [
            { p: "پیشووو", f: "peeshówo" },
            { p: "پیشوګانو", f: "peeshogáano" },
          ],
        ],
      },
    },
  },
  // Feminine regular ending in اع
  {
    in: {
      ts: 1527821388,
      p: "وداع",
      f: "widáa'",
      g: "",
      e: "farewell, goodbye",
      c: "n. f.",
      i: 12205,
    },
    out: {
      plural: {
        fem: [
          [
            { p: "وداع وې", f: "widáa we" },
            { p: "وداع ګانې", f: "widaa gáane" },
          ],
          [
            { p: "وداع وو", f: "widáa wo" },
            { p: "وداع ګانو", f: "widaa gáano" },
          ],
        ],
      },
    },
  },
  // with variations on Pashto plural
  {
    in: {
      ts: 1527815268,
      i: 8475,
      p: "شی",
      f: "shay",
      g: "shay",
      ppp: "شیان، شیونه",
      ppf: "shayáan, shayóona",
      e: "thing",
      c: "n. m.",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "شی", f: "shay" }],
          [{ p: "شي", f: "shee" }],
          [
            { p: "شیو", f: "shúyo" },
            { p: "شو", f: "sho" },
          ],
        ],
      },
      vocative: {
        masc: [
          [{ p: "شیه", f: "shúya" }],
          [
            { p: "شیو", f: "shúyo" },
            { p: "شو", f: "sho" },
            { p: "شیانو", f: "shayáano" },
            { p: "شیونو", f: "shayóono" },
          ],
        ],
      },
      plural: {
        masc: [
          [
            { p: "شیان", f: "shayáan" },
            { p: "شیونه", f: "shayóona" },
          ],
          [
            { p: "شیانو", f: "shayáano" },
            { p: "شیونو", f: "shayóono" },
          ],
        ],
      },
    },
  },
  // TODO: Plaar plaroona paaraan - wrooNa
  // Word with no inflections
  {
    in: {
      ts: 1527815402,
      p: "وړ",
      f: "waR",
      g: "",
      e: "worthy of, deserving, -able",
      c: "suff. / adj.",
      i: 12045,
      noInf: true,
    },
    out: false,
  },
  {
    in: {
      ts: 1610795367898,
      i: 6978,
      p: "رشوت خور",
      f: "rishwat khór",
      g: "rishwatkhor",
      e: "bribe-taker, corrupt",
      r: 4,
      c: "n. m. anim. unisex / adj.",
      infap: "رشوت خواره",
      infaf: "rishwat khwaaru",
      infbp: "رشوت خور",
      infbf: "rishwat khwar",
    },
    out: {
      inflections: {
        masc: [
          [{ p: "رشوت خور", f: "rishwat khór" }],
          [{ p: "رشوت خواره", f: "rishwat khwaarú" }],
          [{ p: "رشوت خورو", f: "rishwat khwaró" }],
        ],
        fem: [
          [{ p: "رشوت خوره", f: "rishwat khwará" }],
          [{ p: "رشوت خورې", f: "rishwat khwaré" }],
          [{ p: "رشوت خورو", f: "rishwat khwaró" }],
        ],
      },
      vocative: {
        masc: [
          [{ p: "رشوت خوره", f: "rishwat khóra" }],
          [{ p: "رشوت خورو", f: "rishwat khwaró" }],
        ],
        fem: [
          [{ p: "رشوت خورې", f: "rishwat khwaré" }],
          [{ p: "رشوت خورو", f: "rishwat khwaró" }],
        ],
      },
    },
  },
];

const others: T.DictionaryEntry[] = [
  {
    ts: 1527812612,
    p: "ګنډل",
    f: "ganDul",
    g: "",
    e: "to sew, mend, make, knit",
    c: "v. trans.",
    i: 9448,
  },
  {
    ts: 1527812457,
    p: "اصلاً",
    f: "aslan",
    g: "",
    e: "actually",
    c: "adv.",
    i: 550,
  },
];

adjectives.forEach((word) => {
  test(`${word.in.p} should inflect properly`, () => {
    const out = inflectWord(word.in);
    expect(out).toEqual(word.out);
  });
});

nouns.forEach((word) => {
  test(`${word.in.p} should inflect properly`, () => {
    expect(inflectWord(word.in)).toEqual(word.out);
  });
});

others.forEach((word) => {
  test(`${word.p} should return false`, () => {
    expect(inflectWord(word)).toEqual(false);
  });
});

test(`inflectRegularYayUnisex should work`, () => {
  expect(inflectRegularYayUnisex("لیدونکی", "leedóonkay")).toEqual({
    masc: [
      [{ p: "لیدونکی", f: "leedóonkay" }],
      [{ p: "لیدونکي", f: "leedóonkee" }],
      [
        { p: "لیدونکیو", f: "leedóonkiyo" },
        { p: "لیدونکو", f: "leedóonko" },
      ],
    ],
    fem: [
      [{ p: "لیدونکې", f: "leedóonke" }],
      [{ p: "لیدونکې", f: "leedóonke" }],
      [
        { p: "لیدونکیو", f: "leedóonkiyo" },
        { p: "لیدونکو", f: "leedóonko" },
      ],
    ],
  });
});
