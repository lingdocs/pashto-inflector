/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { getVerbInfo } from "./verb-info";

const toTest = [
  // simple verbs
  {
    entry: {
      i: 10996,
      ts: 1527812856,
      p: "لیکل",
      g: "",
      f: "leekul",
      e: "to write",
      c: "v. trans.",
    },
    result: {
      entry: {
        entry: {
          i: 10996,
          ts: 1527812856,
          p: "لیکل",
          g: "",
          f: "leekul",
          e: "to write",
          c: "v. trans.",
        },
      },
      transitivity: "transitive",
      type: "simple",
      yulEnding: false,
      stem: {
        perfective: { p: "ولیک", f: "óoleek" },
        imperfective: { p: "لیک", f: "leek" },
        perfectiveSplit: [
          { p: "و", f: "óo" },
          { p: "لیک", f: "leek" },
        ],
      },
      root: {
        perfective: {
          long: { p: "ولیکل", f: "óoleekul" },
          short: { p: "ولیک", f: "óoleek" },
        },
        imperfective: {
          long: { p: "لیکل", f: "leekúl" },
          short: { p: "لیک", f: "leek" },
        },
        perfectiveSplit: {
          long: [
            { p: "و", f: "óo" },
            { p: "لیکل", f: "leekul" },
          ],
          short: [
            { p: "و", f: "óo" },
            { p: "لیک", f: "leek" },
          ],
        },
      },
      participle: {
        past: {
          p: "لیکلی",
          f: "leekúlay",
        },
        present: {
          p: "لیکونکی",
          f: "leekóonkay",
        },
      },
    },
  },
  {
    entry: {
      i: 10243,
      ts: 1527812645,
      p: "ګرځېدل",
      g: "",
      f: "gurdzedul",
      e: "to walk, wander, turn about; to become, to be",
      c: "v. intrans.",
      shortIntrans: true,
    },
    result: {
      entry: {
        entry: {
          i: 10243,
          ts: 1527812645,
          p: "ګرځېدل",
          g: "",
          f: "gurdzedul",
          e: "to walk, wander, turn about; to become, to be",
          c: "v. intrans.",
          shortIntrans: true,
        },
      },
      transitivity: "intransitive",
      type: "simple",
      yulEnding: false,
      stem: {
        perfective: {
          short: { p: "وګرځ", f: "óogurdz" },
          long: { p: "وګرځېږ", f: "óogurdzeG" },
        },
        imperfective: {
          short: { p: "ګرځ", f: "gurdz" },
          long: { p: "ګرځېږ", f: "gurdzéG" },
        },
        perfectiveSplit: {
          short: [
            { p: "و", f: "óo" },
            { p: "ګرځ", f: "gurdz" },
          ],
          long: [
            { p: "و", f: "óo" },
            { p: "ګرځېږ", f: "gurdzeG" },
          ],
        },
      },
      root: {
        perfective: {
          short: { p: "وګرځېد", f: "óogurdzed" },
          long: { p: "وګرځېدل", f: "óogurdzedul" },
        },
        imperfective: {
          short: { p: "ګرځېد", f: "gurdzed" },
          long: { p: "ګرځېدل", f: "gurdzedúl" },
        },
        perfectiveSplit: {
          short: [
            { p: "و", f: "óo" },
            { p: "ګرځېد", f: "gurdzed" },
          ],
          long: [
            { p: "و", f: "óo" },
            { p: "ګرځېدل", f: "gurdzedul" },
          ],
        },
      },
      participle: {
        past: {
          p: "ګرځېدلی",
          f: "gurdzedúlay",
        },
        present: {
          long: {
            p: "ګرځېدونکی",
            f: "gurdzedóonkay",
          },
          short: {
            p: "ګرځونکی",
            f: "gurdzóonkay",
          },
        },
      },
    },
  },
  {
    entry: {
      i: 13664,
      ts: 1527823376,
      p: "وتل",
      g: "",
      f: "watul",
      e: "to go out, exit, leave, emerge",
      c: "v. intrans. irreg.",
      psp: "وځ",
      psf: "oodz",
      tppp: "واته",
      tppf: "waatu",
    },
    result: {
      entry: {
        entry: {
          i: 13664,
          ts: 1527823376,
          p: "وتل",
          g: "",
          f: "watul",
          e: "to go out, exit, leave, emerge",
          c: "v. intrans. irreg.",
          psp: "وځ",
          psf: "oodz",
          tppp: "واته",
          tppf: "waatu",
        },
      },
      transitivity: "intransitive",
      type: "simple",
      yulEnding: false,
      stem: {
        perfective: { p: "ووځ", f: "wÚoodz" },
        imperfective: { p: "وځ", f: "oodz" },
        perfectiveSplit: [
          { p: "و", f: "wÚ" },
          { p: "وځ", f: "oodz" },
        ],
      },
      root: {
        perfective: {
          short: { p: "ووت", f: "óowat" },
          long: { p: "ووتل", f: "óowatul" },
        },
        imperfective: {
          short: { p: "وت", f: "wat" },
          long: { p: "وتل", f: "watúl" },
        },
        perfectiveSplit: {
          short: [
            { p: "و", f: "óo" },
            { p: "وت", f: "wat" },
          ],
          long: [
            { p: "و", f: "óo" },
            { p: "وتل", f: "watul" },
          ],
        },
      },
      participle: {
        past: {
          long: {
            p: "وتلی",
            f: "watúlay",
          },
          short: {
            p: "وتی",
            f: "wátay",
          },
        },
        present: {
          long: {
            p: "وتلونکی",
            f: "watlóonkay",
          },
          short: {
            p: "وتونکی",
            f: "watóonkay",
          },
        },
      },
      idiosyncraticThirdMascSing: {
        imperfective: { p: "واته", f: "waatu" },
        perfective: { p: "وواته", f: "óowaatu" },
      },
    },
  },
  {
    entry: {
      i: 13801,
      ts: 1527816865,
      p: "وړل",
      g: "",
      f: "oRúl, wRul, wuRúl",
      e: "to take, carry, bear, move (inanimate objects); to win, earn (subjunctive یوسي - yósee or ویسي - wéesee, simple past یو یې وړلو - yo ye wRulo)",
      separationAtP: 2,
      separationAtF: 2,
      c: "v. trans. irreg.",
      ssp: "یوس",
      ssf: "yos",
      prp: "یوړل",
      prf: "yóRul",
      noOo: true,
      diacExcept: true,
    },
    result: {
      entry: {
        entry: {
          i: 13801,
          ts: 1527816865,
          p: "وړل",
          g: "",
          f: "oRúl",
          e: "to take, carry, bear, move (inanimate objects); to win, earn (subjunctive یوسي - yósee or ویسي - wéesee, simple past یو یې وړلو - yo ye wRulo)",
          separationAtP: 2,
          separationAtF: 2,
          c: "v. trans. irreg.",
          ssp: "یوس",
          ssf: "yos",
          prp: "یوړل",
          prf: "yóRul",
          noOo: true,
          diacExcept: true,
        },
      },
      transitivity: "transitive",
      type: "simple",
      yulEnding: false,
      root: {
        perfective: {
          short: { p: "یوړ", f: "yóR" },
          long: { p: "یوړل", f: "yóRul" },
        },
        imperfective: {
          short: { p: "وړ", f: "oR" },
          long: { p: "وړل", f: "oRúl" },
        },
        perfectiveSplit: {
          short: [
            { p: "یو", f: "yó" },
            { p: "ړ", f: "R" },
          ],
          long: [
            { p: "یو", f: "yó" },
            { p: "ړل", f: "Rul" },
          ],
        },
      },
      stem: {
        perfective: {
          p: "یوس",
          f: "yos",
        },
        imperfective: {
          p: "وړ",
          f: "oR",
        },
        perfectiveSplit: [
          { p: "یو", f: "yó" },
          { p: "س", f: "s" },
        ],
      },
      participle: {
        past: {
          short: {
            p: "وړی",
            f: "óRay",
          },
          long: {
            p: "وړلی",
            f: "oRúlay",
          },
        },
        present: {
          p: "وړونکی",
          f: "oRóonkay",
        },
      },
    },
  },
  {
    entry: {
      i: 13801,
      ts: 1527816865,
      p: "وړل",
      g: "",
      f: "wRul, oRúl, wuRúl",
      e: "to take, carry, bear, move (inanimate objects); to win, earn (subjunctive یوسي - yósee or ویسي - wéesee, simple past یو یې وړلو - yo ye wRulo)",
      separationAtP: 2,
      separationAtF: 2,
      c: "v. trans. irreg.",
      ssp: "یوس",
      ssf: "yos",
      prp: "یوړل",
      prf: "yóRul",
      noOo: true,
      diacExcept: true,
    },
    result: {
      entry: {
        entry: {
          i: 13801,
          ts: 1527816865,
          p: "وړل",
          g: "",
          f: "wRul",
          e: "to take, carry, bear, move (inanimate objects); to win, earn (subjunctive یوسي - yósee or ویسي - wéesee, simple past یو یې وړلو - yo ye wRulo)",
          separationAtP: 2,
          separationAtF: 2,
          c: "v. trans. irreg.",
          ssp: "یوس",
          ssf: "yos",
          prp: "یوړل",
          prf: "yóRul",
          noOo: true,
          diacExcept: true,
        },
      },
      transitivity: "transitive",
      type: "simple",
      yulEnding: false,
      root: {
        perfective: {
          short: { p: "یوړ", f: "yóR" },
          long: { p: "یوړل", f: "yóRul" },
        },
        imperfective: {
          short: { p: "وړ", f: "wR" },
          long: { p: "وړل", f: "wRúl" },
        },
        perfectiveSplit: {
          short: [
            { p: "یو", f: "yó" },
            { p: "ړ", f: "R" },
          ],
          long: [
            { p: "یو", f: "yó" },
            { p: "ړل", f: "Rul" },
          ],
        },
      },
      stem: {
        perfective: {
          p: "یوس",
          f: "yos",
        },
        imperfective: {
          p: "وړ",
          f: "wR",
        },
        perfectiveSplit: [
          { p: "یو", f: "yó" },
          { p: "س", f: "s" },
        ],
      },
      participle: {
        past: {
          short: {
            p: "وړی",
            f: "wúRay",
          },
          long: {
            p: "وړلی",
            f: "wRúlay",
          },
        },
        present: {
          p: "وړونکی",
          f: "wuRóonkay",
        },
      },
    },
  },
  {
    entry: {
      i: 6503,
      ts: 1527815214,
      p: "راوړل",
      g: "",
      f: "raawRúl",
      e: "to bring, deliver (inanimate objects)",
      separationAtP: 2,
      separationAtF: 3,
      c: "v. trans. irreg.",
      noOo: true,
    },
    result: {
      entry: {
        entry: {
          i: 6503,
          ts: 1527815214,
          p: "راوړل",
          g: "",
          f: "raawRúl",
          e: "to bring, deliver (inanimate objects)",
          separationAtP: 2,
          separationAtF: 3,
          c: "v. trans. irreg.",
          noOo: true,
        },
      },
      transitivity: "transitive",
      type: "simple",
      yulEnding: false,
      root: {
        perfective: {
          short: { p: "راوړ", f: "ráawR" },
          long: { p: "راوړل", f: "ráawRul" },
        },
        imperfective: {
          short: { p: "راوړ", f: "raawR" },
          long: { p: "راوړل", f: "raawRúl" },
        },
        perfectiveSplit: {
          short: [
            { p: "را", f: "ráa" },
            { p: "وړ", f: "wR" },
          ],
          long: [
            { p: "را", f: "ráa" },
            { p: "وړل", f: "wRul" },
          ],
        },
      },
      stem: {
        perfective: {
          p: "راوړ",
          f: "ráawR",
        },
        imperfective: {
          p: "راوړ",
          f: "raawR",
        },
        perfectiveSplit: [
          { p: "را", f: "ráa" },
          { p: "وړ", f: "wR" },
        ],
      },
      participle: {
        past: {
          short: {
            p: "راوړی",
            f: "raawúRay",
          },
          long: {
            p: "راوړلی",
            f: "raawRúlay",
          },
        },
        present: {
          p: "راوړونکی",
          f: "raawRóonkay",
        },
      },
    },
  },
  {
    entry: {
      i: 5514,
      ts: 1527812790,
      p: "خوړل",
      g: "",
      f: "khoRul",
      e: "to eat, to bite",
      c: "v. trans.",
      psp: "خور",
      psf: "khor",
      tppp: "خوړ",
      tppf: "khoR",
    },
    result: {
      entry: {
        entry: {
          i: 5514,
          ts: 1527812790,
          p: "خوړل",
          g: "",
          f: "khoRul",
          e: "to eat, to bite",
          c: "v. trans.",
          psp: "خور",
          psf: "khor",
          tppp: "خوړ",
          tppf: "khoR",
        },
      },
      transitivity: "transitive",
      type: "simple",
      yulEnding: false,
      root: {
        perfective: {
          short: { p: "وخوړ", f: "óokhoR" },
          long: { p: "وخوړل", f: "óokhoRul" },
        },
        imperfective: {
          short: { p: "خوړ", f: "khoR" },
          long: { p: "خوړل", f: "khoRúl" },
        },
        perfectiveSplit: {
          short: [
            { p: "و", f: "óo" },
            { p: "خوړ", f: "khoR" },
          ],
          long: [
            { p: "و", f: "óo" },
            { p: "خوړل", f: "khoRul" },
          ],
        },
      },
      stem: {
        perfective: {
          p: "وخور",
          f: "óokhor",
        },
        perfectiveSplit: [
          { p: "و", f: "óo" },
          { p: "خور", f: "khor" },
        ],
        imperfective: {
          p: "خور",
          f: "khor",
        },
      },
      participle: {
        past: {
          p: "خوړلی",
          f: "khoRúlay",
        },
        present: {
          p: "خوړونکی",
          f: "khoRóonkay",
        },
      },
      idiosyncraticThirdMascSing: {
        imperfective: { p: "خوړ", f: "khoR" },
        perfective: { p: "وخوړ", f: "óokhoR" },
      },
    },
  },
  {
    entry: {
      i: 1675,
      ts: 1527822381,
      p: "بنګېدل",
      g: "",
      f: "bungedúl",
      e: "to buzz, hum, jingle; to snuffle, to speak nasally, or with a twang",
      c: "v. intrans.",
    },
    result: {
      entry: {
        entry: {
          i: 1675,
          ts: 1527822381,
          p: "بنګېدل",
          g: "",
          f: "bungedúl",
          e: "to buzz, hum, jingle; to snuffle, to speak nasally, or with a twang",
          c: "v. intrans.",
        },
      },
      transitivity: "intransitive",
      type: "simple",
      yulEnding: false,
      root: {
        imperfective: {
          short: { p: "بنګېد", f: "bunged" },
          long: { p: "بنګېدل", f: "bungedúl" },
        },
        perfective: {
          short: { p: "وبنګېد", f: "óobunged" },
          long: { p: "وبنګېدل", f: "óobungedul" },
        },
        perfectiveSplit: {
          long: [
            { p: "و", f: "óo" },
            { p: "بنګېدل", f: "bungedul" },
          ],
          short: [
            { p: "و", f: "óo" },
            { p: "بنګېد", f: "bunged" },
          ],
        },
      },
      stem: {
        imperfective: {
          p: "بنګېږ",
          f: "bungéG",
        },
        perfective: {
          p: "وبنګېږ",
          f: "óobungeG",
        },
        perfectiveSplit: [
          { p: "و", f: "óo" },
          { p: "بنګېږ", f: "bungeG" },
        ],
      },
      participle: {
        past: {
          p: "بنګېدلی",
          f: "bungedúlay",
        },
        present: {
          p: "بنګېدونکی",
          f: "bungedóonkay",
        },
      },
    },
  },
  {
    entry: {
      i: 10144,
      ts: 1527812759,
      p: "کېناستل",
      g: "",
      f: "kenaastul",
      e: "to sit",
      separationAtP: 2,
      separationAtF: 2,
      c: "v. intrans. irreg.",
      psp: "کېن",
      psf: "ken",
      noOo: true,
    },
    result: {
      entry: {
        entry: {
          i: 10144,
          ts: 1527812759,
          p: "کېناستل",
          g: "",
          f: "kenaastul",
          e: "to sit",
          separationAtP: 2,
          separationAtF: 2,
          c: "v. intrans. irreg.",
          psp: "کېن",
          psf: "ken",
          noOo: true,
        },
      },
      transitivity: "intransitive",
      type: "simple",
      yulEnding: false,
      root: {
        imperfective: {
          long: { p: "کېناستل", f: "kenaastúl" },
          short: { p: "کېناست", f: "kenaast" },
        },
        perfective: {
          long: { p: "کېناستل", f: "kénaastul" },
          short: { p: "کېناست", f: "kénaast" },
        },
        perfectiveSplit: {
          long: [
            { p: "کې", f: "ké" },
            { p: "ناستل", f: "naastul" },
          ],
          short: [
            { p: "کې", f: "ké" },
            { p: "ناست", f: "naast" },
          ],
        },
      },
      stem: {
        imperfective: {
          p: "کېن",
          f: "ken",
        },
        perfective: {
          p: "کېن",
          f: "kén",
        },
        perfectiveSplit: [
          { p: "کې", f: "ké" },
          { p: "ن", f: "n" },
        ],
      },
      participle: {
        past: {
          p: "کېناستلی",
          f: "kenaastúlay",
        },
        present: {
          p: "کېناستونکی",
          f: "kenaastóonkay",
        },
      },
    },
  },
  {
    entry: {
      i: 445,
      ts: 1527811605,
      p: "ازمویل",
      g: "",
      f: "azmoyul",
      e: "to attempt, try; to experiment, test",
      c: "v. trans.",
      sepOo: true,
    },
    result: {
      entry: {
        entry: {
          i: 445,
          ts: 1527811605,
          p: "ازمویل",
          g: "",
          f: "azmoyul",
          e: "to attempt, try; to experiment, test",
          c: "v. trans.",
          sepOo: true,
        },
      },
      transitivity: "transitive",
      type: "simple",
      yulEnding: true,
      root: {
        imperfective: {
          long: { p: "ازمویل", f: "azmóyul" },
          short: { p: "ازموی", f: "azmoy" },
        },
        perfective: {
          long: { p: "و ازمویل", f: "óo`azmoyul" },
          short: { p: "و ازموی", f: "óo`azmoy" },
        },
        perfectiveSplit: {
          long: [
            { p: "و", f: "óo" },
            { p: "ازمویل", f: "azmoyul" },
          ],
          short: [
            { p: "و", f: "óo" },
            { p: "ازموی", f: "azmoy" },
          ],
        },
      },
      stem: {
        imperfective: { p: "ازموی", f: "azmoy" },
        perfective: { p: "و ازموی", f: "óo`azmoy" },
        perfectiveSplit: [
          { p: "و", f: "óo" },
          { p: "ازموی", f: "azmoy" },
        ],
      },
      participle: {
        past: { p: "ازمویلی", f: "azmóyulay" },
        present: { p: "ازمویونکی", f: "azmoyóonkay" },
      },
    },
  },
  {
    entry: {
      i: 8896,
      ts: 1527812627,
      p: "غوښتل",
      g: "",
      f: "ghwuxtul, ghoxtul",
      e: "to want, to request",
      c: "v. trans.",
      psp: "غواړ",
      psf: "ghwaaR",
    },
    result: {
      entry: {
        entry: {
          i: 8896,
          ts: 1527812627,
          p: "غوښتل",
          g: "",
          f: "ghwuxtul",
          e: "to want, to request",
          c: "v. trans.",
          psp: "غواړ",
          psf: "ghwaaR",
        },
      },
      transitivity: "transitive",
      type: "simple",
      yulEnding: false,
      root: {
        imperfective: {
          long: { p: "غوښتل", f: "ghwuxtúl" },
          short: { p: "غوښت", f: "ghwuxt" },
        },
        perfective: {
          long: { p: "وغوښتل", f: "óoghwuxtul" },
          short: { p: "وغوښت", f: "óoghwuxt" },
        },
        perfectiveSplit: {
          long: [
            { p: "و", f: "óo" },
            { p: "غوښتل", f: "ghwuxtul" },
          ],
          short: [
            { p: "و", f: "óo" },
            { p: "غوښت", f: "ghwuxt" },
          ],
        },
      },
      stem: {
        imperfective: { p: "غواړ", f: "ghwaaR" },
        perfective: { p: "وغواړ", f: "óoghwaaR" },
        perfectiveSplit: [
          { p: "و", f: "óo" },
          { p: "غواړ", f: "ghwaaR" },
        ],
      },
      participle: {
        past: {
          long: { p: "غوښتلی", f: "ghwuxtúlay" },
          short: { p: "غوښتی", f: "ghwúxtay" },
        },
        present: {
          p: "غوښتونکی",
          f: "ghwuxtóonkay",
        },
      },
    },
  },
  {
    entry: {
      i: 300,
      ts: 1527817298,
      p: "اخیستل",
      g: "",
      f: "akheestul",
      e: "to take, buy, purchase, receive; to shave, cut with scissors",
      c: "v. trans.",
      psp: "اخل",
      psf: "akhl",
    },
    result: {
      entry: {
        entry: {
          i: 300,
          ts: 1527817298,
          p: "اخیستل",
          g: "",
          f: "akheestul",
          e: "to take, buy, purchase, receive; to shave, cut with scissors",
          c: "v. trans.",
          psp: "اخل",
          psf: "akhl",
        },
      },
      transitivity: "transitive",
      type: "simple",
      yulEnding: false,
      root: {
        imperfective: {
          long: { p: "اخیستل", f: "akheestúl" },
          short: { p: "اخیست", f: "akheest" },
        },
        perfective: {
          long: { p: "واخیستل", f: "wáakheestul" },
          short: { p: "واخیست", f: "wáakheest" },
        },
        perfectiveSplit: {
          long: [
            { p: "وا", f: "wáa" },
            { p: "خیستل", f: "kheestul" },
          ],
          short: [
            { p: "وا", f: "wáa" },
            { p: "خیست", f: "kheest" },
          ],
        },
      },
      stem: {
        imperfective: { p: "اخل", f: "akhl" },
        perfective: { p: "واخل", f: "wáakhl" },
        perfectiveSplit: [
          { p: "وا", f: "wáa" },
          { p: "خل", f: "khl" },
        ],
      },
      participle: {
        past: {
          long: { p: "اخیستلی", f: "akheestúlay" },
          short: { p: "اخیستی", f: "akhéestay" },
        },
        present: {
          p: "اخیستونکی",
          f: "akheestóonkay",
        },
      },
    },
  },
  {
    entry: {
      i: 300,
      ts: 1527817299,
      p: "آخیستل",
      g: "",
      f: "aakheestul",
      e: "to take, buy, purchase, receive; to shave, cut with scissors",
      c: "v. trans.",
      psp: "اخل",
      psf: "akhl",
    },
    result: {
      entry: {
        entry: {
          i: 300,
          ts: 1527817299,
          p: "آخیستل",
          g: "",
          f: "aakheestul",
          e: "to take, buy, purchase, receive; to shave, cut with scissors",
          c: "v. trans.",
          psp: "اخل",
          psf: "akhl",
        },
      },
      transitivity: "transitive",
      type: "simple",
      yulEnding: false,
      root: {
        imperfective: {
          long: { p: "آخیستل", f: "aakheestúl" },
          short: { p: "آخیست", f: "aakheest" },
        },
        perfective: {
          long: { p: "واخیستل", f: "wáakheestul" },
          short: { p: "واخیست", f: "wáakheest" },
        },
        perfectiveSplit: {
          long: [
            { p: "وا", f: "wáa" },
            { p: "خیستل", f: "kheestul" },
          ],
          short: [
            { p: "وا", f: "wáa" },
            { p: "خیست", f: "kheest" },
          ],
        },
      },
      stem: {
        imperfective: { p: "اخل", f: "akhl" },
        perfective: { p: "واخل", f: "wáakhl" },
        perfectiveSplit: [
          { p: "وا", f: "wáa" },
          { p: "خل", f: "khl" },
        ],
      },
      participle: {
        past: {
          long: { p: "آخیستلی", f: "aakheestúlay" },
          short: { p: "آخیستی", f: "aakhéestay" },
        },
        present: {
          p: "آخیستونکی",
          f: "aakheestóonkay",
        },
      },
    },
  },
  // TODO: IS THE SPLIT HERE CORRECT??
  {
    entry: {
      i: 1105,
      ts: 1527816146,
      p: "ایستل",
      g: "",
      f: "eestul",
      e: "to throw out, discard, chuck, toss; to extract, to take out",
      c: "v. trans.",
      psp: "باس",
      psf: "baas",
    },
    result: {
      entry: {
        entry: {
          i: 1105,
          ts: 1527816146,
          p: "ایستل",
          g: "",
          f: "eestul",
          e: "to throw out, discard, chuck, toss; to extract, to take out",
          c: "v. trans.",
          psp: "باس",
          psf: "baas",
        },
      },
      transitivity: "transitive",
      type: "simple",
      yulEnding: false,
      root: {
        imperfective: {
          long: { p: "ایستل", f: "eestúl" },
          short: { p: "ایست", f: "eest" },
        },
        perfective: {
          long: { p: "ویستل", f: "wéestul" },
          short: { p: "ویست", f: "wéest" },
        },
        perfectiveSplit: {
          long: [
            { p: "وی", f: "wée" },
            { p: "ستل", f: "stul" },
          ],
          short: [
            { p: "وی", f: "wée" },
            { p: "ست", f: "st" },
          ],
        },
      },
      stem: {
        imperfective: { p: "باس", f: "baas" },
        perfective: { p: "وباس", f: "óobaas" },
        perfectiveSplit: [
          { p: "و", f: "óo" },
          { p: "باس", f: "baas" },
        ],
      },
      participle: {
        past: {
          long: { p: "ایستلی", f: "eestúlay" },
          short: { p: "ایستی", f: "éestay" },
        },
        present: {
          p: "ایستونکی",
          f: "eestóonkay",
        },
      },
    },
  },
  {
    entry: {
      i: 1106,
      ts: 1596485537794,
      p: "اېستل",
      g: "",
      f: "estul",
      e: "to throw out, discard, chuck, toss; to extract, to take out",
      c: "v. trans.",
      psp: "باس",
      psf: "baas",
    },
    result: {
      entry: {
        entry: {
          i: 1106,
          ts: 1596485537794,
          p: "اېستل",
          g: "",
          f: "estul",
          e: "to throw out, discard, chuck, toss; to extract, to take out",
          c: "v. trans.",
          psp: "باس",
          psf: "baas",
        },
      },
      transitivity: "transitive",
      type: "simple",
      yulEnding: false,
      root: {
        imperfective: {
          long: { p: "اېستل", f: "estúl" },
          short: { p: "اېست", f: "est" },
        },
        perfective: {
          long: { p: "وېستل", f: "wéstul" },
          short: { p: "وېست", f: "wést" },
        },
        perfectiveSplit: {
          long: [
            { p: "وې", f: "wé" },
            { p: "ستل", f: "stul" },
          ],
          short: [
            { p: "وې", f: "wé" },
            { p: "ست", f: "st" },
          ],
        },
      },
      stem: {
        imperfective: { p: "باس", f: "baas" },
        perfective: { p: "وباس", f: "óobaas" },
        perfectiveSplit: [
          { p: "و", f: "óo" },
          { p: "باس", f: "baas" },
        ],
      },
      participle: {
        past: {
          long: { p: "اېستلی", f: "estúlay" },
          short: { p: "اېستی", f: "éstay" },
        },
        present: { p: "اېستونکی", f: "estóonkay" },
      },
    },
  },
  {
    entry: {
      i: 2766,
      ts: 1527815165,
      p: "پېژندل",
      g: "",
      f: "pejzandul",
      e: "to recognize, know, meet",
      c: "v. trans.",
      psp: "پېژن",
      psf: "pejzan",
      tppp: "پېژاند",
      tppf: "pejzaand",
    },
    result: {
      entry: {
        entry: {
          i: 2766,
          ts: 1527815165,
          p: "پېژندل",
          g: "",
          f: "pejzandul",
          e: "to recognize, know, meet",
          c: "v. trans.",
          psp: "پېژن",
          psf: "pejzan",
          tppp: "پېژاند",
          tppf: "pejzaand",
        },
      },
      transitivity: "transitive",
      type: "simple",
      yulEnding: false,
      root: {
        imperfective: {
          long: { p: "پېژندل", f: "pejzandúl" },
          short: { p: "پېژند", f: "pejzand" },
        },
        perfective: {
          long: { p: "وپېژندل", f: "óopejzandul" },
          short: { p: "وپېژند", f: "óopejzand" },
        },
        perfectiveSplit: {
          long: [
            { p: "و", f: "óo" },
            { p: "پېژندل", f: "pejzandul" },
          ],
          short: [
            { p: "و", f: "óo" },
            { p: "پېژند", f: "pejzand" },
          ],
        },
      },
      stem: {
        imperfective: { p: "پېژن", f: "pejzan" },
        perfective: { p: "وپېژن", f: "óopejzan" },
        perfectiveSplit: [
          { p: "و", f: "óo" },
          { p: "پېژن", f: "pejzan" },
        ],
      },
      participle: {
        past: { p: "پېژندلی", f: "pejzandúlay" },
        present: { p: "پېژندونکی", f: "pejzandóonkay" },
      },
      idiosyncraticThirdMascSing: {
        imperfective: { p: "پېژاند", f: "pejzaand" },
        perfective: { p: "وپېژاند", f: "óopejzaand" },
      },
    },
  },
  {
    entry: {
      i: 5413,
      ts: 1527812767,
      p: "خندل",
      g: "",
      f: "khandul",
      e: "to laugh",
      c: "v. gramm. trans.",
      psp: "خاند",
      psf: "khaand",
    },
    result: {
      entry: {
        entry: {
          i: 5413,
          ts: 1527812767,
          p: "خندل",
          g: "",
          f: "khandul",
          e: "to laugh",
          c: "v. gramm. trans.",
          psp: "خاند",
          psf: "khaand",
        },
      },
      transitivity: "grammatically transitive",
      type: "simple",
      yulEnding: false,
      root: {
        imperfective: {
          long: { p: "خندل", f: "khandúl" },
          short: { p: "خند", f: "khand" },
        },
        perfective: {
          long: { p: "وخندل", f: "óokhandul" },
          short: { p: "وخند", f: "óokhand" },
        },
        perfectiveSplit: {
          long: [
            { p: "و", f: "óo" },
            { p: "خندل", f: "khandul" },
          ],
          short: [
            { p: "و", f: "óo" },
            { p: "خند", f: "khand" },
          ],
        },
      },
      stem: {
        imperfective: { p: "خاند", f: "khaand" },
        perfective: { p: "وخاند", f: "óokhaand" },
        perfectiveSplit: [
          { p: "و", f: "óo" },
          { p: "خاند", f: "khaand" },
        ],
      },
      participle: {
        past: { p: "خندلی", f: "khandúlay" },
        present: { p: "خندونکی", f: "khandóonkay" },
      },
    },
  },
  // stative compounds
  {
    entry: {
      i: 5367,
      ts: 1577898915919,
      p: "خفه کول",
      g: "",
      f: "khufa kawul",
      e: "to make sad, to grieve, to annoy; to choke, to make suffocate",
      l: 1527812798,
      c: "v. stat. comp. trans.",
    },
    complement: {
      i: 5366,
      ts: 1527812798,
      p: "خفه",
      g: "",
      f: "khufa",
      e: "sad, upset, angry; choked, suffocated",
      c: "adj.",
    },
    result: {
      entry: {
        entry: {
          i: 5367,
          ts: 1577898915919,
          p: "خفه کول",
          g: "",
          f: "khufa kawul",
          e: "to make sad, to grieve, to annoy; to choke, to make suffocate",
          l: 1527812798,
          c: "v. stat. comp. trans.",
        },
        complement: {
          i: 5366,
          ts: 1527812798,
          p: "خفه",
          g: "",
          f: "khufa",
          e: "sad, upset, angry; choked, suffocated",
          c: "adj.",
        },
      },
      transitivity: "transitive",
      type: "stative compound",
      yulEnding: false,
      root: {
        imperfective: {
          long: { p: "خفه کول", f: "khufa kawúl" },
          short: { p: "خفه کو", f: "khufa kaw" },
        },
        perfective: {
          long: { p: "خفه کړل", f: "khufa kRul" },
          short: { p: "خفه کړ", f: "khufa kR" },
          mini: { p: "خفه ک", f: "khufa k" },
        },
        perfectiveSplit: {
          long: [
            { p: "خفه ", f: "khufa " },
            { p: "کړل", f: "kRul" },
          ],
          short: [
            { p: "خفه ", f: "khufa " },
            { p: "کړ", f: "kR" },
          ],
          mini: [
            { p: "خفه ", f: "khufa " },
            { p: "ک", f: "k" },
          ],
        },
      },
      stem: {
        imperfective: { p: "خفه کو", f: "khufa kaw" },
        perfective: {
          long: { p: "خفه کړ", f: "khufa kR" },
          short: { p: "خفه ک", f: "khufa k" },
        },
        perfectiveSplit: {
          long: [
            { p: "خفه ", f: "khufa " },
            { p: "کړ", f: "kR" },
          ],
          short: [
            { p: "خفه ", f: "khufa " },
            { p: "ک", f: "k" },
          ],
        },
      },
      participle: {
        past: { p: "خفه کړی", f: "khufa kúRay" },
        present: { p: "خفه کوونکی", f: "khufa kawóonkay" },
      },
      complement: {
        masc: [
          [{ p: "خفه", f: "khufa" }],
          [{ p: "خفه", f: "khufa" }],
          [{ p: "خفه", f: "khufa" }],
        ],
        fem: [
          [{ p: "خفه", f: "khufa" }],
          [{ p: "خفه", f: "khufa" }],
          [{ p: "خفه", f: "khufa" }],
        ],
      },
    },
  },
  {
    entry: {
      i: 5368,
      ts: 1577898920635,
      p: "خفه کېدل",
      g: "",
      f: "khufa kedul",
      e: "to be sad, grieved, annoyed, upset; to be choked, to suffocate",
      l: 1527812798,
      c: "v. stat. comp. intrans.",
    },
    complement: {
      i: 5366,
      ts: 1527812798,
      p: "خفه",
      g: "",
      f: "khufa",
      e: "sad, upset, angry; choked, suffocated",
      c: "adj.",
    },
    result: {
      entry: {
        entry: {
          i: 5368,
          ts: 1577898920635,
          p: "خفه کېدل",
          g: "",
          f: "khufa kedul",
          e: "to be sad, grieved, annoyed, upset; to be choked, to suffocate",
          l: 1527812798,
          c: "v. stat. comp. intrans.",
        },
        complement: {
          i: 5366,
          ts: 1527812798,
          p: "خفه",
          g: "",
          f: "khufa",
          e: "sad, upset, angry; choked, suffocated",
          c: "adj.",
        },
      },
      transitivity: "intransitive",
      type: "stative compound",
      yulEnding: false,
      root: {
        imperfective: {
          long: { p: "خفه کېدل", f: "khufa kedúl" },
          short: { p: "خفه کېد", f: "khufa ked" },
        },
        perfective: {
          long: { p: "خفه شول", f: "khufa shwul" },
          short: { p: "خفه شو", f: "khufa shw" },
        },
        perfectiveSplit: {
          long: [
            { p: "خفه ", f: "khufa " },
            { p: "شول", f: "shwul" },
          ],
          short: [
            { p: "خفه ", f: "khufa " },
            { p: "شو", f: "shw" },
          ],
        },
      },
      stem: {
        imperfective: { p: "خفه کېږ", f: "khufa kéG" },
        perfective: { p: "خفه ش", f: "khufa sh" },
        perfectiveSplit: [
          { p: "خفه ", f: "khufa " },
          { p: "ش", f: "sh" },
        ],
      },
      participle: {
        past: { p: "خفه شوی", f: "khufa shúway" },
        present: { p: "خفه کېدونکی", f: "khufa kedóonkay" },
      },
      complement: {
        masc: [
          [{ p: "خفه", f: "khufa" }],
          [{ p: "خفه", f: "khufa" }],
          [{ p: "خفه", f: "khufa" }],
        ],
        fem: [
          [{ p: "خفه", f: "khufa" }],
          [{ p: "خفه", f: "khufa" }],
          [{ p: "خفه", f: "khufa" }],
        ],
      },
    },
  },
  {
    entry: {
      i: 2182,
      ts: 1571859113828,
      p: "پخول",
      g: "",
      f: "pakhawul",
      e: "to cook, prepare, to cause to ripen, mature",
      l: 1574867531681,
      c: "v. stat. comp. trans.",
    },
    complement: {
      i: 2610,
      ts: 1574867531681,
      p: "پوخ",
      g: "",
      f: "pokh",
      e: "mature, ripe, ready, cooked, able, skillful, experienced, tried, tested, true",
      c: "adj. irreg.",
      infap: "پاخه",
      infaf: "paakhu",
      infbp: "پخ",
      infbf: "pakh",
    },
    result: {
      entry: {
        entry: {
          i: 2182,
          ts: 1571859113828,
          p: "پخول",
          g: "",
          f: "pakhawul",
          e: "to cook, prepare, to cause to ripen, mature",
          l: 1574867531681,
          c: "v. stat. comp. trans.",
        },
        complement: {
          i: 2610,
          ts: 1574867531681,
          p: "پوخ",
          g: "",
          f: "pokh",
          e: "mature, ripe, ready, cooked, able, skillful, experienced, tried, tested, true",
          c: "adj. irreg.",
          infap: "پاخه",
          infaf: "paakhu",
          infbp: "پخ",
          infbf: "pakh",
        },
      },
      transitivity: "transitive",
      type: "stative compound",
      yulEnding: false,
      root: {
        imperfective: {
          long: { p: "پخول", f: "pakhawúl" },
          short: { p: "پخو", f: "pakhaw" },
        },
        perfective: {
          mascSing: {
            long: { p: "پوخ کړل", f: "pokh kRul" },
            short: { p: "پوخ کړ", f: "pokh kR" },
            mini: { p: "پوخ ک", f: "pokh k" },
          },
          mascPlur: {
            long: { p: "پاخه کړل", f: "paakhú kRul" },
            short: { p: "پاخه کړ", f: "paakhú kR" },
            mini: { p: "پاخه ک", f: "paakhú k" },
          },
          femSing: {
            long: { p: "پخه کړل", f: "pakhá kRul" },
            short: { p: "پخه کړ", f: "pakhá kR" },
            mini: { p: "پخه ک", f: "pakhá k" },
          },
          femPlur: {
            long: { p: "پخې کړل", f: "pakhé kRul" },
            short: { p: "پخې کړ", f: "pakhé kR" },
            mini: { p: "پخې ک", f: "pakhé k" },
          },
        },
        perfectiveSplit: {
          mascSing: {
            long: [
              { p: "پوخ ", f: "pokh " },
              { p: "کړل", f: "kRul" },
            ],
            short: [
              { p: "پوخ ", f: "pokh " },
              { p: "کړ", f: "kR" },
            ],
            mini: [
              { p: "پوخ ", f: "pokh " },
              { p: "ک", f: "k" },
            ],
          },
          mascPlur: {
            long: [
              { p: "پاخه ", f: "paakhú " },
              { p: "کړل", f: "kRul" },
            ],
            short: [
              { p: "پاخه ", f: "paakhú " },
              { p: "کړ", f: "kR" },
            ],
            mini: [
              { p: "پاخه ", f: "paakhú " },
              { p: "ک", f: "k" },
            ],
          },
          femSing: {
            long: [
              { p: "پخه ", f: "pakhá " },
              { p: "کړل", f: "kRul" },
            ],
            short: [
              { p: "پخه ", f: "pakhá " },
              { p: "کړ", f: "kR" },
            ],
            mini: [
              { p: "پخه ", f: "pakhá " },
              { p: "ک", f: "k" },
            ],
          },
          femPlur: {
            long: [
              { p: "پخې ", f: "pakhé " },
              { p: "کړل", f: "kRul" },
            ],
            short: [
              { p: "پخې ", f: "pakhé " },
              { p: "کړ", f: "kR" },
            ],
            mini: [
              { p: "پخې ", f: "pakhé " },
              { p: "ک", f: "k" },
            ],
          },
        },
      },
      stem: {
        imperfective: { p: "پخو", f: "pakhaw" },
        perfective: {
          mascSing: {
            long: { p: "پوخ کړ", f: "pokh kR" },
            short: { p: "پوخ ک", f: "pokh k" },
          },
          mascPlur: {
            long: { p: "پاخه کړ", f: "paakhú kR" },
            short: { p: "پاخه ک", f: "paakhú k" },
          },
          femSing: {
            long: { p: "پخه کړ", f: "pakhá kR" },
            short: { p: "پخه ک", f: "pakhá k" },
          },
          femPlur: {
            long: { p: "پخې کړ", f: "pakhé kR" },
            short: { p: "پخې ک", f: "pakhé k" },
          },
        },
        perfectiveSplit: {
          mascSing: {
            long: [
              { p: "پوخ ", f: "pokh " },
              { p: "کړ", f: "kR" },
            ],
            short: [
              { p: "پوخ ", f: "pokh " },
              { p: "ک", f: "k" },
            ],
          },
          mascPlur: {
            long: [
              { p: "پاخه ", f: "paakhú " },
              { p: "کړ", f: "kR" },
            ],
            short: [
              { p: "پاخه ", f: "paakhú " },
              { p: "ک", f: "k" },
            ],
          },
          femSing: {
            long: [
              { p: "پخه ", f: "pakhá " },
              { p: "کړ", f: "kR" },
            ],
            short: [
              { p: "پخه ", f: "pakhá " },
              { p: "ک", f: "k" },
            ],
          },
          femPlur: {
            long: [
              { p: "پخې ", f: "pakhé " },
              { p: "کړ", f: "kR" },
            ],
            short: [
              { p: "پخې ", f: "pakhé " },
              { p: "ک", f: "k" },
            ],
          },
        },
      },
      participle: {
        present: { p: "پخوونکی", f: "pakhawóonkay" },
        past: {
          mascSing: { p: "پوخ کړی", f: "pokh kúRay" },
          mascPlur: { p: "پاخه کړي", f: "paakhu kúRee" },
          femSing: { p: "پخه کړې", f: "pakha kúRe" },
          femPlur: { p: "پخې کړې", f: "pakhe kúRe" },
        },
      },
      complement: {
        masc: [
          [{ p: "پوخ", f: "pokh" }],
          [{ p: "پاخه", f: "paakhú" }],
          [{ p: "پخو", f: "pakhó" }],
        ],
        fem: [
          [{ p: "پخه", f: "pakhá" }],
          [{ p: "پخې", f: "pakhé" }],
          [{ p: "پخو", f: "pakhó" }],
        ],
      },
    },
  },
  {
    entry: {
      i: 7205,
      ts: 1591033069786,
      p: "ستړی کېدل",
      g: "",
      f: "stuRay kedul",
      e: "to get tired, fatigued",
      l: 1527815306,
      c: "v. stat. comp. intrans.",
    },
    complement: {
      i: 7204,
      ts: 1527815306,
      p: "ستړی",
      g: "",
      f: "stúRay",
      e: "tired",
      c: "adj.",
    },
    result: {
      entry: {
        entry: {
          i: 7205,
          ts: 1591033069786,
          p: "ستړی کېدل",
          g: "",
          f: "stuRay kedul",
          e: "to get tired, fatigued",
          l: 1527815306,
          c: "v. stat. comp. intrans.",
        },
        complement: {
          i: 7204,
          ts: 1527815306,
          p: "ستړی",
          g: "",
          f: "stúRay",
          e: "tired",
          c: "adj.",
        },
      },
      transitivity: "intransitive",
      type: "stative compound",
      yulEnding: false,
      root: {
        imperfective: {
          mascSing: {
            long: { p: "ستړی کېدل", f: "stuRay kedúl" },
            short: { p: "ستړی کېد", f: "stuRay ked" },
          },
          mascPlur: {
            long: { p: "ستړي کېدل", f: "stuRee kedúl" },
            short: { p: "ستړي کېد", f: "stuRee ked" },
          },
          femSing: {
            long: { p: "ستړې کېدل", f: "stuRe kedúl" },
            short: { p: "ستړې کېد", f: "stuRe ked" },
          },
          femPlur: {
            long: { p: "ستړې کېدل", f: "stuRe kedúl" },
            short: { p: "ستړې کېد", f: "stuRe ked" },
          },
        },
        perfective: {
          mascSing: {
            long: { p: "ستړی شول", f: "stúRay shwul" },
            short: { p: "ستړی شو", f: "stúRay shw" },
          },
          mascPlur: {
            long: { p: "ستړي شول", f: "stúRee shwul" },
            short: { p: "ستړي شو", f: "stúRee shw" },
          },
          femSing: {
            long: { p: "ستړې شول", f: "stúRe shwul" },
            short: { p: "ستړې شو", f: "stúRe shw" },
          },
          femPlur: {
            long: { p: "ستړې شول", f: "stúRe shwul" },
            short: { p: "ستړې شو", f: "stúRe shw" },
          },
        },
        perfectiveSplit: {
          mascSing: {
            long: [
              { p: "ستړی ", f: "stúRay " },
              { p: "شول", f: "shwul" },
            ],
            short: [
              { p: "ستړی ", f: "stúRay " },
              { p: "شو", f: "shw" },
            ],
          },
          mascPlur: {
            long: [
              { p: "ستړي ", f: "stúRee " },
              { p: "شول", f: "shwul" },
            ],
            short: [
              { p: "ستړي ", f: "stúRee " },
              { p: "شو", f: "shw" },
            ],
          },
          femSing: {
            long: [
              { p: "ستړې ", f: "stúRe " },
              { p: "شول", f: "shwul" },
            ],
            short: [
              { p: "ستړې ", f: "stúRe " },
              { p: "شو", f: "shw" },
            ],
          },
          femPlur: {
            long: [
              { p: "ستړې ", f: "stúRe " },
              { p: "شول", f: "shwul" },
            ],
            short: [
              { p: "ستړې ", f: "stúRe " },
              { p: "شو", f: "shw" },
            ],
          },
        },
      },
      stem: {
        imperfective: {
          mascSing: { p: "ستړی کېږ", f: "stuRay kéG" },
          mascPlur: { p: "ستړي کېږ", f: "stuRee kéG" },
          femSing: { p: "ستړې کېږ", f: "stuRe kéG" },
          femPlur: { p: "ستړې کېږ", f: "stuRe kéG" },
        },
        perfective: {
          mascSing: { p: "ستړی ش", f: "stúRay sh" },
          mascPlur: { p: "ستړي ش", f: "stúRee sh" },
          femSing: { p: "ستړې ش", f: "stúRe sh" },
          femPlur: { p: "ستړې ش", f: "stúRe sh" },
        },
        perfectiveSplit: {
          mascSing: [
            { p: "ستړی ", f: "stúRay " },
            { p: "ش", f: "sh" },
          ],
          mascPlur: [
            { p: "ستړي ", f: "stúRee " },
            { p: "ش", f: "sh" },
          ],
          femSing: [
            { p: "ستړې ", f: "stúRe " },
            { p: "ش", f: "sh" },
          ],
          femPlur: [
            { p: "ستړې ", f: "stúRe " },
            { p: "ش", f: "sh" },
          ],
        },
      },
      participle: {
        present: {
          mascSing: { p: "ستړی کېدونکی", f: "stuRay kedóonkay" },
          mascPlur: { p: "ستړي کېدونکي", f: "stuRee kedóonkee" },
          femSing: { p: "ستړې کېدونکې", f: "stuRe kedóonke" },
          femPlur: { p: "ستړې کېدونکې", f: "stuRe kedóonke" },
        },
        past: {
          mascSing: { p: "ستړی شوی", f: "stuRay shúway" },
          mascPlur: { p: "ستړي شوي", f: "stuRee shúwee" },
          femSing: { p: "ستړې شوې", f: "stuRe shúwe" },
          femPlur: { p: "ستړې شوې", f: "stuRe shúwe" },
        },
      },
      complement: {
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
    },
  },
  {
    entry: {
      i: 1895,
      ts: 1527812277,
      p: "بیانول",
      g: "",
      f: "bayaanawul",
      e: "to describe, tell, explain, narrate",
      l: 1527814259,
      c: "v. stat. comp. trans.",
    },
    complement: {
      i: 1893,
      ts: 1527814259,
      p: "بیان",
      g: "",
      f: "bayaan",
      e: "description, statement, speaking, narration, sermon",
      c: "n. m.",
      app: "بیانات",
      apf: "bayaanaat",
    },
    result: {
      entry: {
        entry: {
          i: 1895,
          ts: 1527812277,
          p: "بیانول",
          g: "",
          f: "bayaanawul",
          e: "to describe, tell, explain, narrate",
          l: 1527814259,
          c: "v. stat. comp. trans.",
        },
        complement: {
          i: 1893,
          ts: 1527814259,
          p: "بیان",
          g: "",
          f: "bayaan",
          e: "description, statement, speaking, narration, sermon",
          c: "n. m.",
          app: "بیانات",
          apf: "bayaanaat",
        },
      },
      transitivity: "transitive",
      type: "stative compound",
      yulEnding: false,
      root: {
        imperfective: {
          long: { p: "بیانول", f: "bayaanawúl" },
          short: { p: "بیانو", f: "bayaanaw" },
        },
        perfective: {
          long: { p: "بیان کړل", f: "bayaan kRul" },
          short: { p: "بیان کړ", f: "bayaan kR" },
          mini: { p: "بیان ک", f: "bayaan k" },
        },
        perfectiveSplit: {
          long: [
            { p: "بیان ", f: "bayaan " },
            { p: "کړل", f: "kRul" },
          ],
          short: [
            { p: "بیان ", f: "bayaan " },
            { p: "کړ", f: "kR" },
          ],
          mini: [
            { p: "بیان ", f: "bayaan " },
            { p: "ک", f: "k" },
          ],
        },
      },
      stem: {
        imperfective: { p: "بیانو", f: "bayaanaw" },
        perfective: {
          long: { p: "بیان کړ", f: "bayaan kR" },
          short: { p: "بیان ک", f: "bayaan k" },
        },
        perfectiveSplit: {
          long: [
            { p: "بیان ", f: "bayaan " },
            { p: "کړ", f: "kR" },
          ],
          short: [
            { p: "بیان ", f: "bayaan " },
            { p: "ک", f: "k" },
          ],
        },
      },
      participle: {
        past: { p: "بیان کړی", f: "bayaan kúRay" },
        present: { p: "بیانوونکی", f: "bayaanawóonkay" },
      },
      complement: {
        masc: [
          [{ p: "بیان", f: "bayaan" }],
          [{ p: "بیان", f: "bayaan" }],
          [{ p: "بیان", f: "bayaan" }],
        ],
        fem: [
          [{ p: "بیان", f: "bayaan" }],
          [{ p: "بیان", f: "bayaan" }],
          [{ p: "بیان", f: "bayaan" }],
        ],
      },
    },
  },
  {
    entry: {
      i: 1068,
      ts: 1527815139,
      p: "اوسېدل",
      g: "",
      f: "osedul",
      e: "to live, reside, stay, be",
      c: "v. intrans.",
      shortIntrans: true,
      diacExcept: true,
    },
    result: {
      entry: {
        entry: {
          i: 1068,
          ts: 1527815139,
          p: "اوسېدل",
          g: "",
          f: "osedul",
          e: "to live, reside, stay, be",
          c: "v. intrans.",
          shortIntrans: true,
          diacExcept: true,
        },
      },
      transitivity: "intransitive",
      type: "simple",
      yulEnding: false,
      stem: {
        perfective: {
          long: { p: "واوسېږ", f: "óo`oseG" },
          short: { p: "واوس", f: "óo`os" },
        },
        perfectiveSplit: {
          long: [
            { p: "و", f: "óo" },
            { p: "اوسېږ", f: "oseG" },
          ],
          short: [
            { p: "و", f: "óo" },
            { p: "اوس", f: "os" },
          ],
        },
        imperfective: {
          long: { p: "اوسېږ", f: "oséG" },
          short: { p: "اوس", f: "os" },
        },
      },
      root: {
        perfective: {
          long: { p: "واوسېدل", f: "óo`osedul" },
          short: { p: "واوسېد", f: "óo`osed" },
        },
        perfectiveSplit: {
          long: [
            { p: "و", f: "óo" },
            { p: "اوسېدل", f: "osedul" },
          ],
          short: [
            { p: "و", f: "óo" },
            { p: "اوسېد", f: "osed" },
          ],
        },
        imperfective: {
          long: { p: "اوسېدل", f: "osedúl" },
          short: { p: "اوسېد", f: "osed" },
        },
      },
      participle: {
        past: {
          p: "اوسېدلی",
          f: "osedúlay",
        },
        present: {
          p: "اوسېدونکی",
          f: "osedóonkay",
        },
      },
    },
  },
  {
    entry: {
      i: 2058,
      ts: 1527814038,
      p: "پاڅېدل",
      g: "",
      f: "paatsedul",
      e: "to get up, rise, wake up",
      c: "v. intrans.",
      separationAtP: 2,
      separationAtF: 3,
      shortIntrans: true,
      noOo: true,
    },
    result: {
      entry: {
        entry: {
          i: 2058,
          ts: 1527814038,
          p: "پاڅېدل",
          g: "",
          f: "paatsedul",
          e: "to get up, rise, wake up",
          c: "v. intrans.",
          separationAtP: 2,
          separationAtF: 3,
          shortIntrans: true,
          noOo: true,
        },
      },
      transitivity: "intransitive",
      type: "simple",
      yulEnding: false,
      stem: {
        perfective: {
          long: { p: "پاڅېږ", f: "páatseG" },
          short: { p: "پاڅ", f: "páats" },
        },
        imperfective: {
          long: { p: "پاڅېږ", f: "paatséG" },
          short: { p: "پاڅ", f: "paats" },
        },
        perfectiveSplit: {
          long: [
            { p: "پا", f: "páa" },
            { p: "څېږ", f: "tseG" },
          ],
          short: [
            { p: "پا", f: "páa" },
            { p: "څ", f: "ts" },
          ],
        },
      },
      root: {
        perfective: {
          long: { p: "پاڅېدل", f: "páatsedul" },
          short: { p: "پاڅېد", f: "páatsed" },
        },
        imperfective: {
          long: { p: "پاڅېدل", f: "paatsedúl" },
          short: { p: "پاڅېد", f: "paatsed" },
        },
        perfectiveSplit: {
          long: [
            { p: "پا", f: "páa" },
            { p: "څېدل", f: "tsedul" },
          ],
          short: [
            { p: "پا", f: "páa" },
            { p: "څېد", f: "tsed" },
          ],
        },
      },
      participle: {
        past: { p: "پاڅېدلی", f: "paatsedúlay" },
        present: {
          long: { p: "پاڅېدونکی", f: "paatsedóonkay" },
          short: { p: "پاڅونکی", f: "paatsóonkay" },
        },
      },
    },
  },
  // dynamic compound verbs
  {
    entry: {
      i: 9371,
      ts: 1527812732,
      p: "کار کول",
      g: "",
      f: "kaar kawul",
      e: "to work",
      l: 1527822084,
      c: "v. dyn. comp. trans.",
    },
    complement: {
      i: 9369,
      ts: 1527822084,
      p: "کار",
      g: "",
      f: "kaar",
      e: "work, job, business, stuff to do",
      c: "n. m.",
    },
    result: {
      entry: {
        entry: {
          i: 9371,
          ts: 1527812732,
          p: "کار کول",
          g: "",
          f: "kaar kawul",
          e: "to work",
          l: 1527822084,
          c: "v. dyn. comp. trans.",
        },
        complement: {
          i: 9369,
          ts: 1527822084,
          p: "کار",
          g: "",
          f: "kaar",
          e: "work, job, business, stuff to do",
          c: "n. m.",
        },
      },
      type: "dynamic compound",
      transitivity: "transitive",
      yulEnding: null,
      root: {
        imperfective: {
          long: { p: "کار کول", f: "kaar kawúl" },
          short: { p: "کار کو", f: "kaar kaw" },
        },
        perfective: {
          long: { p: "کار وکړل", f: "kaar óokRul" },
          short: { p: "کار وکړ", f: "kaar óokR" },
          mini: { p: "کار وک", f: "kaar óok" },
        },
        perfectiveSplit: {
          long: [
            { p: "کار و", f: "kaar óo" },
            { p: "کړل", f: "kRul" },
          ],
          short: [
            { p: "کار و", f: "kaar óo" },
            { p: "کړ", f: "kR" },
          ],
          mini: [
            { p: "کار و", f: "kaar óo" },
            { p: "ک", f: "k" },
          ],
        },
      },
      stem: {
        imperfective: { p: "کار کو", f: "kaar kaw" },
        perfective: {
          long: { p: "کار وکړ", f: "kaar óokR" },
          short: { p: "کار وک", f: "kaar óok" },
        },
        perfectiveSplit: {
          long: [
            { p: "کار و", f: "kaar óo" },
            { p: "کړ", f: "kR" },
          ],
          short: [
            { p: "کار و", f: "kaar óo" },
            { p: "ک", f: "k" },
          ],
        },
      },
      participle: {
        past: { p: "کار کړی", f: "kaar kúRay" },
        present: { p: "کار کوونکی", f: "kaar kawóonkay" },
      },
      objComplement: {
        entry: {
          i: 9369,
          ts: 1527822084,
          p: "کار",
          g: "",
          f: "kaar",
          e: "work, job, business, stuff to do",
          c: "n. m.",
        },
        person: 4,
      },
      auxVerb: {
        ts: 1527812752,
        i: 11033,
        p: "کول",
        f: "kawul",
        g: "kawul",
        e: "to do (an action or activity)",
        r: 4,
        c: "v. trans./gramm. trans.",
        ssp: "وکړ",
        ssf: "óokR",
        prp: "وکړل",
        prf: "óokRul",
        pprtp: "کړی",
        pprtf: "kúRay",
        separationAtP: 1,
        separationAtF: 2,
        diacExcept: true,
        ec: "do,does,doing,did,done",
      },
      intransitiveForm: {
        entry: {
          entry: {
            i: 9371,
            ts: 1527812732,
            p: "کار کېدل",
            g: "",
            f: "kaar kedul",
            e: "to work",
            l: 1527822084,
            c: "v. intrans. dyn. comp.",
          },
          complement: {
            i: 9369,
            ts: 1527822084,
            p: "کار",
            g: "",
            f: "kaar",
            e: "work, job, business, stuff to do",
            c: "n. m.",
          },
        },
        type: "dynamic compound",
        transitivity: "intransitive",
        yulEnding: null,
        root: {
          imperfective: {
            long: { p: "کار کېدل", f: "kaar kedúl" },
            short: { p: "کار کېد", f: "kaar ked" },
          },
          perfective: {
            long: { p: "کار وشول", f: "kaar óoshwul" },
            short: { p: "کار وشو", f: "kaar óoshw" },
          },
          perfectiveSplit: {
            long: [
              { p: "کار و", f: "kaar óo" },
              { p: "شول", f: "shwul" },
            ],
            short: [
              { p: "کار و", f: "kaar óo" },
              { p: "شو", f: "shw" },
            ],
          },
        },
        stem: {
          imperfective: { p: "کار کېږ", f: "kaar kéG" },
          perfective: { p: "کار وش", f: "kaar óosh" },
          perfectiveSplit: [
            { p: "کار و", f: "kaar óo" },
            { p: "ش", f: "sh" },
          ],
        },
        participle: {
          past: { p: "کار شوی", f: "kaar shúway" },
          present: { p: "کار کېدونکی", f: "kaar kedóonkay" },
        },
        objComplement: {
          entry: {
            i: 9369,
            ts: 1527822084,
            p: "کار",
            g: "",
            f: "kaar",
            e: "work, job, business, stuff to do",
            c: "n. m.",
          },
          person: 4,
        },
        auxVerb: {
          i: 10122,
          ts: 1527812754,
          p: "کېدل",
          g: "",
          f: "kedul",
          e: "to happen, occur",
          c: "v. intrans. irreg. aux. dyn.",
          ssp: "وش",
          ssf: "óosh",
          prp: "وشول",
          prf: "óoshwul",
          pprtp: "شوی",
          pprtf: "shúway",
          diacExcept: true,
        },
      },
    },
  },
  {
    entry: {
      i: 12101,
      ts: 1527812939,
      p: "منډې وهل",
      g: "",
      f: "munDe wahul",
      e: "to run",
      l: 1527815805,
      c: "v. dyn. comp. trans. sing. or plur.",
    },
    complement: {
      i: 12098,
      ts: 1527815805,
      p: "منډه",
      g: "",
      f: "múnDa",
      e: "run, running",
      c: "n. f.",
    },
    result: {
      entry: {
        entry: {
          i: 12101,
          ts: 1527812939,
          p: "منډې وهل",
          g: "",
          f: "munDe wahul",
          e: "to run",
          l: 1527815805,
          c: "v. dyn. comp. trans. sing. or plur.",
        },
        complement: {
          i: 12098,
          ts: 1527815805,
          p: "منډه",
          g: "",
          f: "múnDa",
          e: "run, running",
          c: "n. f.",
        },
      },
      type: "dynamic compound",
      transitivity: "transitive",
      yulEnding: null,
      root: {
        imperfective: {
          long: { p: "منډې وهل", f: "munDe wahúl" },
          short: { p: "منډې وه", f: "munDe wah" },
        },
        perfective: {
          long: { p: "منډې ووهل", f: "munDe óowahul" },
          short: { p: "منډې ووه", f: "munDe óowah" },
        },
        perfectiveSplit: {
          long: [
            { p: "منډې و", f: "munDe óo" },
            { p: "وهل", f: "wahul" },
          ],
          short: [
            { p: "منډې و", f: "munDe óo" },
            { p: "وه", f: "wah" },
          ],
        },
      },
      stem: {
        imperfective: { p: "منډې وه", f: "munDe wah" },
        perfective: { p: "منډې ووه", f: "munDe óowah" },
        perfectiveSplit: [
          { p: "منډې و", f: "munDe óo" },
          { p: "وه", f: "wah" },
        ],
      },
      participle: {
        past: { p: "منډې وهلې", f: "munDe wahúle" },
        present: { p: "منډې وهونکی", f: "munDe wahóonkay" },
      },
      objComplement: {
        entry: {
          i: 12098,
          ts: 1527815805,
          p: "منډه",
          g: "",
          f: "múnDa",
          e: "run, running",
          c: "n. f.",
        },
        plural: { p: "منډې", f: "munDe" },
        person: 11,
      },
      auxVerb: {
        ts: 1527815399,
        i: 15049,
        p: "وهل",
        f: "wahul",
        g: "wahul",
        e: "to hit",
        r: 4,
        c: "v. trans.",
        tppp: "واهه",
        tppf: "waahu",
        ec: "hit,hits,hitting,hit,hit",
      },
      singularForm: {
        entry: {
          entry: {
            i: 12101,
            ts: 1527812939,
            p: "منډې وهل",
            g: "",
            f: "munDe wahul",
            e: "to run",
            l: 1527815805,
            c: "v. dyn. comp. trans. sing. or plur.",
          },
          complement: {
            i: 12098,
            ts: 1527815805,
            p: "منډه",
            g: "",
            f: "múnDa",
            e: "run, running",
            c: "n. f.",
          },
        },
        type: "dynamic compound",
        transitivity: "transitive",
        yulEnding: null,
        root: {
          imperfective: {
            long: { p: "منډه وهل", f: "múnDa wahúl" },
            short: { p: "منډه وه", f: "múnDa wah" },
          },
          perfective: {
            long: { p: "منډه ووهل", f: "múnDa óowahul" },
            short: { p: "منډه ووه", f: "múnDa óowah" },
          },
          perfectiveSplit: {
            long: [
              { p: "منډه و", f: "múnDa óo" },
              { p: "وهل", f: "wahul" },
            ],
            short: [
              { p: "منډه و", f: "múnDa óo" },
              { p: "وه", f: "wah" },
            ],
          },
        },
        stem: {
          imperfective: { p: "منډه وه", f: "múnDa wah" },
          perfective: { p: "منډه ووه", f: "múnDa óowah" },
          perfectiveSplit: [
            { p: "منډه و", f: "múnDa óo" },
            { p: "وه", f: "wah" },
          ],
        },
        participle: {
          past: { p: "منډه وهلې", f: "múnDa wahúle" },
          present: { p: "منډه وهونکی", f: "múnDa wahóonkay" },
        },
        objComplement: {
          entry: {
            i: 12098,
            ts: 1527815805,
            p: "منډه",
            g: "",
            f: "múnDa",
            e: "run, running",
            c: "n. f.",
          },
          person: 5,
        },
        auxVerb: {
          ts: 1527815399,
          i: 15049,
          p: "وهل",
          f: "wahul",
          g: "wahul",
          e: "to hit",
          r: 4,
          c: "v. trans.",
          tppp: "واهه",
          tppf: "waahu",
          ec: "hit,hits,hitting,hit,hit",
        },
      },
    },
  },
  {
    entry: {
      i: 10554,
      ts: 1579034883717,
      p: "لاړې تېرول",
      g: "",
      f: "laaRe terawul",
      e: "to spit ?? (other fluids too??)",
      l: 1527823566,
      c: "v. dyn. comp. trans.",
    },
    complement: {
      i: 10553,
      ts: 1527823567,
      p: "لاړې",
      g: "",
      f: "laaRe",
      e: "spit, saliva, slobber, slime",
      c: "n. f. pl.",
    },
    result: {
      entry: {
        entry: {
          i: 10554,
          ts: 1579034883717,
          p: "لاړې تېرول",
          g: "",
          f: "laaRe terawul",
          e: "to spit ?? (other fluids too??)",
          l: 1527823566,
          c: "v. dyn. comp. trans.",
        },
        complement: {
          i: 10553,
          ts: 1527823567,
          p: "لاړې",
          g: "",
          f: "laaRe",
          e: "spit, saliva, slobber, slime",
          c: "n. f. pl.",
        },
      },
      type: "dynamic compound",
      transitivity: "transitive",
      yulEnding: null,
      root: {
        imperfective: {
          long: { p: "لاړې تېرول", f: "laaRe terawúl" },
          short: { p: "لاړې تېرو", f: "laaRe teraw" },
        },
        perfective: {
          long: { p: "لاړې تېرې کړل", f: "laaRe tére kRul" },
          short: { p: "لاړې تېرې کړ", f: "laaRe tére kR" },
          mini: { p: "لاړې تېرې ک", f: "laaRe tére k" },
        },
        perfectiveSplit: {
          long: [
            { p: "لاړې تېرې ", f: "laaRe tére " },
            { p: "کړل", f: "kRul" },
          ],
          short: [
            { p: "لاړې تېرې ", f: "laaRe tére " },
            { p: "کړ", f: "kR" },
          ],
          mini: [
            { p: "لاړې تېرې ", f: "laaRe tére " },
            { p: "ک", f: "k" },
          ],
        },
      },
      stem: {
        imperfective: { p: "لاړې تېرو", f: "laaRe teraw" },
        perfective: {
          long: { p: "لاړې تېرې کړ", f: "laaRe tére kR" },
          short: { p: "لاړې تېرې ک", f: "laaRe tére k" },
        },
        perfectiveSplit: {
          long: [
            { p: "لاړې تېرې ", f: "laaRe tére " },
            { p: "کړ", f: "kR" },
          ],
          short: [
            { p: "لاړې تېرې ", f: "laaRe tére " },
            { p: "ک", f: "k" },
          ],
        },
      },
      participle: {
        past: { p: "لاړې تېرې کړې", f: "laaRe tere kúRe" },
        present: { p: "لاړې تېروونکی", f: "laaRe terawóonkay" },
      },
      objComplement: {
        entry: {
          i: 10553,
          ts: 1527823567,
          p: "لاړې",
          g: "",
          f: "laaRe",
          e: "spit, saliva, slobber, slime",
          c: "n. f. pl.",
        },
        person: 11,
      },
      auxVerb: {
        i: 3459,
        ts: 1527812157,
        p: "تېرول",
        g: "",
        f: "terawul",
        e: "to pass (time), to take across, to pass, endure (difficulties)",
        l: 1527813139,
        c: "v. stat. comp. trans.",
      },
      auxVerbComplement: {
        i: 3774,
        ts: 1527813139,
        p: "تېر",
        g: "",
        f: "ter",
        e: "last, past, previous, passed, gone over",
        c: "adj.",
      },
    },
  },
  // stative or dynamic compound verb
  {
    entry: {
      i: 7910,
      ts: 1527819253,
      p: "شروع کول",
      g: "",
      f: "shUróo' kawul",
      e: "to start, to begin",
      l: 1527819252,
      c: "v. dyn./stat. comp. trans.",
    },
    complement: {
      i: 7909,
      ts: 1527819252,
      p: "شروع",
      g: "",
      f: "shUróo'",
      e: "beginning, start, undertaking",
      c: "n. m.",
    },
    result: {
      type: "dynamic or stative compound",
      transitivity: "transitive",
      dynamic: {
        entry: {
          entry: {
            i: 7910,
            ts: 1527819253,
            p: "شروع کول",
            g: "",
            f: "shUróo' kawul",
            e: "to start, to begin",
            l: 1527819252,
            c: "v. dyn. comp. trans.",
          },
          complement: {
            i: 7909,
            ts: 1527819252,
            p: "شروع",
            g: "",
            f: "shUróo'",
            e: "beginning, start, undertaking",
            c: "n. m.",
          },
        },
        type: "dynamic compound",
        transitivity: "transitive",
        yulEnding: null,
        root: {
          imperfective: {
            long: { p: "شروع کول", f: "shUróo' kawúl" },
            short: { p: "شروع کو", f: "shUróo' kaw" },
          },
          perfective: {
            long: { p: "شروع وکړل", f: "shUróo' óokRul" },
            short: { p: "شروع وکړ", f: "shUróo' óokR" },
            mini: { p: "شروع وک", f: "shUróo' óok" },
          },
          perfectiveSplit: {
            long: [
              { p: "شروع و", f: "shUróo' óo" },
              { p: "کړل", f: "kRul" },
            ],
            short: [
              { p: "شروع و", f: "shUróo' óo" },
              { p: "کړ", f: "kR" },
            ],
            mini: [
              { p: "شروع و", f: "shUróo' óo" },
              { p: "ک", f: "k" },
            ],
          },
        },
        stem: {
          imperfective: { p: "شروع کو", f: "shUróo' kaw" },
          perfective: {
            long: { p: "شروع وکړ", f: "shUróo' óokR" },
            short: { p: "شروع وک", f: "shUróo' óok" },
          },
          perfectiveSplit: {
            long: [
              { p: "شروع و", f: "shUróo' óo" },
              { p: "کړ", f: "kR" },
            ],
            short: [
              { p: "شروع و", f: "shUróo' óo" },
              { p: "ک", f: "k" },
            ],
          },
        },
        participle: {
          past: { p: "شروع کړی", f: "shUróo' kúRay" },
          present: { p: "شروع کوونکی", f: "shUróo' kawóonkay" },
        },
        objComplement: {
          entry: {
            i: 7909,
            ts: 1527819252,
            p: "شروع",
            g: "",
            f: "shUróo'",
            e: "beginning, start, undertaking",
            c: "n. m.",
          },
          person: 4,
        },
        auxVerb: {
          ts: 1527812752,
          i: 11033,
          p: "کول",
          f: "kawul",
          g: "kawul",
          e: "to do (an action or activity)",
          r: 4,
          c: "v. trans./gramm. trans.",
          ssp: "وکړ",
          ssf: "óokR",
          prp: "وکړل",
          prf: "óokRul",
          pprtp: "کړی",
          pprtf: "kúRay",
          separationAtP: 1,
          separationAtF: 2,
          diacExcept: true,
          ec: "do,does,doing,did,done",
        },
        intransitiveForm: {
          entry: {
            entry: {
              i: 7910,
              ts: 1527819253,
              p: "شروع کېدل",
              g: "",
              f: "shUróo' kedul",
              e: "to start, to begin",
              l: 1527819252,
              c: "v. intrans. dyn. comp.",
            },
            complement: {
              i: 7909,
              ts: 1527819252,
              p: "شروع",
              g: "",
              f: "shUróo'",
              e: "beginning, start, undertaking",
              c: "n. m.",
            },
          },
          type: "dynamic compound",
          transitivity: "intransitive",
          yulEnding: null,
          root: {
            imperfective: {
              long: { p: "شروع کېدل", f: "shUróo' kedúl" },
              short: { p: "شروع کېد", f: "shUróo' ked" },
            },
            perfective: {
              long: { p: "شروع وشول", f: "shUróo' óoshwul" },
              short: { p: "شروع وشو", f: "shUróo' óoshw" },
            },
            perfectiveSplit: {
              long: [
                { p: "شروع و", f: "shUróo' óo" },
                { p: "شول", f: "shwul" },
              ],
              short: [
                { p: "شروع و", f: "shUróo' óo" },
                { p: "شو", f: "shw" },
              ],
            },
          },
          stem: {
            imperfective: { p: "شروع کېږ", f: "shUróo' kéG" },
            perfective: { p: "شروع وش", f: "shUróo' óosh" },
            perfectiveSplit: [
              { p: "شروع و", f: "shUróo' óo" },
              { p: "ش", f: "sh" },
            ],
          },
          participle: {
            past: { p: "شروع شوی", f: "shUróo' shúway" },
            present: { p: "شروع کېدونکی", f: "shUróo' kedóonkay" },
          },
          objComplement: {
            entry: {
              i: 7909,
              ts: 1527819252,
              p: "شروع",
              g: "",
              f: "shUróo'",
              e: "beginning, start, undertaking",
              c: "n. m.",
            },
            person: 4,
          },
          auxVerb: {
            i: 10122,
            ts: 1527812754,
            p: "کېدل",
            g: "",
            f: "kedul",
            e: "to happen, occur",
            c: "v. intrans. irreg. aux. dyn.",
            ssp: "وش",
            ssf: "óosh",
            prp: "وشول",
            prf: "óoshwul",
            pprtp: "شوی",
            pprtf: "shúway",
            diacExcept: true,
          },
        },
      },
      stative: {
        entry: {
          entry: {
            i: 7910,
            ts: 1527819253,
            p: "شروع کول",
            g: "",
            f: "shUróo' kawul",
            e: "to start, to begin",
            l: 1527819252,
            c: "v. stat. comp. trans.",
          },
          complement: {
            i: 7909,
            ts: 1527819252,
            p: "شروع",
            g: "",
            f: "shUróo'",
            e: "beginning, start, undertaking",
            c: "n. m.",
          },
        },
        type: "stative compound",
        transitivity: "transitive",
        yulEnding: false,
        root: {
          imperfective: {
            long: { p: "شروع کول", f: "shUroo' kawúl" },
            short: { p: "شروع کو", f: "shUroo' kaw" },
          },
          perfective: {
            long: { p: "شروع کړل", f: "shUróo' kRul" },
            short: { p: "شروع کړ", f: "shUróo' kR" },
            mini: { p: "شروع ک", f: "shUróo' k" },
          },
          perfectiveSplit: {
            long: [
              { p: "شروع ", f: "shUróo' " },
              { p: "کړل", f: "kRul" },
            ],
            short: [
              { p: "شروع ", f: "shUróo' " },
              { p: "کړ", f: "kR" },
            ],
            mini: [
              { p: "شروع ", f: "shUróo' " },
              { p: "ک", f: "k" },
            ],
          },
        },
        stem: {
          imperfective: { p: "شروع کو", f: "shUroo' kaw" },
          perfective: {
            long: { p: "شروع کړ", f: "shUróo' kR" },
            short: { p: "شروع ک", f: "shUróo' k" },
          },
          perfectiveSplit: {
            long: [
              { p: "شروع ", f: "shUróo' " },
              { p: "کړ", f: "kR" },
            ],
            short: [
              { p: "شروع ", f: "shUróo' " },
              { p: "ک", f: "k" },
            ],
          },
        },
        participle: {
          past: { p: "شروع کړی", f: "shUroo' kúRay" },
          present: { p: "شروع کوونکی", f: "shUroo' kawóonkay" },
        },
        complement: {
          masc: [
            [{ p: "شروع", f: "shUróo'" }],
            [{ p: "شروع", f: "shUróo'" }],
            [{ p: "شروع", f: "shUróo'" }],
          ],
          fem: [
            [{ p: "شروع", f: "shUróo'" }],
            [{ p: "شروع", f: "shUróo'" }],
            [{ p: "شروع", f: "shUróo'" }],
          ],
        },
      },
    },
  },
  // dynamic or generative stative compound verb
  {
    entry: {
      i: 4770,
      ts: 1608137130992,
      p: "چیغه کول",
      g: "",
      f: "chéegha kawul",
      e: "to yell, scream, cry out",
      l: 1527813972,
      c: "v. gen. stat./dyn. comp. trans.",
    },
    complement: {
      i: 4769,
      ts: 1527813972,
      p: "چیغه",
      g: "",
      f: "chéegha",
      e: "yell, scream, cry",
      c: "n. f.",
    },
    result: {
      type: "dynamic or generative stative compound",
      transitivity: "transitive",
      dynamic: {
        entry: {
          entry: {
            i: 4770,
            ts: 1608137130992,
            p: "چیغه کول",
            g: "",
            f: "chéegha kawul",
            e: "to yell, scream, cry out",
            l: 1527813972,
            c: "v. dyn. comp. trans.",
          },
          complement: {
            i: 4769,
            ts: 1527813972,
            p: "چیغه",
            g: "",
            f: "chéegha",
            e: "yell, scream, cry",
            c: "n. f.",
          },
        },
        type: "dynamic compound",
        transitivity: "transitive",
        yulEnding: null,
        root: {
          imperfective: {
            long: { p: "چیغه کول", f: "chéegha kawúl" },
            short: { p: "چیغه کو", f: "chéegha kaw" },
          },
          perfective: {
            long: { p: "چیغه وکړل", f: "chéegha óokRul" },
            short: { p: "چیغه وکړ", f: "chéegha óokR" },
            mini: { p: "چیغه وک", f: "chéegha óok" },
          },
          perfectiveSplit: {
            long: [
              { p: "چیغه و", f: "chéegha óo" },
              { p: "کړل", f: "kRul" },
            ],
            short: [
              { p: "چیغه و", f: "chéegha óo" },
              { p: "کړ", f: "kR" },
            ],
            mini: [
              { p: "چیغه و", f: "chéegha óo" },
              { p: "ک", f: "k" },
            ],
          },
        },
        stem: {
          imperfective: { p: "چیغه کو", f: "chéegha kaw" },
          perfective: {
            long: { p: "چیغه وکړ", f: "chéegha óokR" },
            short: { p: "چیغه وک", f: "chéegha óok" },
          },
          perfectiveSplit: {
            long: [
              { p: "چیغه و", f: "chéegha óo" },
              { p: "کړ", f: "kR" },
            ],
            short: [
              { p: "چیغه و", f: "chéegha óo" },
              { p: "ک", f: "k" },
            ],
          },
        },
        participle: {
          past: { p: "چیغه کړې", f: "chéegha kúRe" },
          present: { p: "چیغه کوونکی", f: "chéegha kawóonkay" },
        },
        objComplement: {
          entry: {
            i: 4769,
            ts: 1527813972,
            p: "چیغه",
            g: "",
            f: "chéegha",
            e: "yell, scream, cry",
            c: "n. f.",
          },
          person: 5,
        },
        auxVerb: {
          ts: 1527812752,
          i: 11033,
          p: "کول",
          f: "kawul",
          g: "kawul",
          e: "to do (an action or activity)",
          r: 4,
          c: "v. trans./gramm. trans.",
          ssp: "وکړ",
          ssf: "óokR",
          prp: "وکړل",
          prf: "óokRul",
          pprtp: "کړی",
          pprtf: "kúRay",
          separationAtP: 1,
          separationAtF: 2,
          diacExcept: true,
          ec: "do,does,doing,did,done",
        },
        intransitiveForm: {
          entry: {
            entry: {
              i: 4770,
              ts: 1608137130992,
              p: "چیغه کېدل",
              g: "",
              f: "chéegha kedul",
              e: "to yell, scream, cry out",
              l: 1527813972,
              c: "v. intrans. dyn. comp.",
            },
            complement: {
              i: 4769,
              ts: 1527813972,
              p: "چیغه",
              g: "",
              f: "chéegha",
              e: "yell, scream, cry",
              c: "n. f.",
            },
          },
          type: "dynamic compound",
          transitivity: "intransitive",
          yulEnding: null,
          root: {
            imperfective: {
              long: { p: "چیغه کېدل", f: "chéegha kedúl" },
              short: { p: "چیغه کېد", f: "chéegha ked" },
            },
            perfective: {
              long: { p: "چیغه وشول", f: "chéegha óoshwul" },
              short: { p: "چیغه وشو", f: "chéegha óoshw" },
            },
            perfectiveSplit: {
              long: [
                { p: "چیغه و", f: "chéegha óo" },
                { p: "شول", f: "shwul" },
              ],
              short: [
                { p: "چیغه و", f: "chéegha óo" },
                { p: "شو", f: "shw" },
              ],
            },
          },
          stem: {
            imperfective: { p: "چیغه کېږ", f: "chéegha kéG" },
            perfective: { p: "چیغه وش", f: "chéegha óosh" },
            perfectiveSplit: [
              { p: "چیغه و", f: "chéegha óo" },
              { p: "ش", f: "sh" },
            ],
          },
          participle: {
            past: { p: "چیغه شوې", f: "chéegha shúwe" },
            present: { p: "چیغه کېدونکی", f: "chéegha kedóonkay" },
          },
          objComplement: {
            entry: {
              i: 4769,
              ts: 1527813972,
              p: "چیغه",
              g: "",
              f: "chéegha",
              e: "yell, scream, cry",
              c: "n. f.",
            },
            person: 5,
          },
          auxVerb: {
            i: 10122,
            ts: 1527812754,
            p: "کېدل",
            g: "",
            f: "kedul",
            e: "to happen, occur",
            c: "v. intrans. irreg. aux. dyn.",
            ssp: "وش",
            ssf: "óosh",
            prp: "وشول",
            prf: "óoshwul",
            pprtp: "شوی",
            pprtf: "shúway",
            diacExcept: true,
          },
        },
      },
      stative: {
        entry: {
          entry: {
            i: 4770,
            ts: 1608137130992,
            p: "چیغه کول",
            g: "",
            f: "chéegha kawul",
            e: "to yell, scream, cry out",
            l: 1527813972,
            c: "v. gen. stat. comp. trans.",
          },
          complement: {
            i: 4769,
            ts: 1527813972,
            p: "چیغه",
            g: "",
            f: "chéegha",
            e: "yell, scream, cry",
            c: "n. f.",
          },
        },
        type: "generative stative compound",
        transitivity: "transitive",
        yulEnding: null,
        root: {
          imperfective: {
            long: { p: "چیغه کول", f: "chéegha kawúl" },
            short: { p: "چیغه کو", f: "chéegha kaw" },
          },
          perfective: {
            long: { p: "چیغه کړل", f: "chéegha kRul" },
            short: { p: "چیغه کړ", f: "chéegha kR" },
            mini: { p: "چیغه ک", f: "chéegha k" },
          },
          perfectiveSplit: {
            long: [
              { p: "چیغه ", f: "chéegha " },
              { p: "کړل", f: "kRul" },
            ],
            short: [
              { p: "چیغه ", f: "chéegha " },
              { p: "کړ", f: "kR" },
            ],
            mini: [
              { p: "چیغه ", f: "chéegha " },
              { p: "ک", f: "k" },
            ],
          },
        },
        stem: {
          imperfective: { p: "چیغه کو", f: "chéegha kaw" },
          perfective: {
            long: { p: "چیغه کړ", f: "chéegha kR" },
            short: { p: "چیغه ک", f: "chéegha k" },
          },
          perfectiveSplit: {
            long: [
              { p: "چیغه ", f: "chéegha " },
              { p: "کړ", f: "kR" },
            ],
            short: [
              { p: "چیغه ", f: "chéegha " },
              { p: "ک", f: "k" },
            ],
          },
        },
        participle: {
          past: { p: "چیغه کړې", f: "chéegha kúRe" },
          present: { p: "چیغه کوونکی", f: "chéegha kawóonkay" },
        },
        objComplement: {
          entry: {
            i: 4769,
            ts: 1527813972,
            p: "چیغه",
            g: "",
            f: "chéegha",
            e: "yell, scream, cry",
            c: "n. f.",
          },
          person: 5,
        },
      },
    },
  },
  // with plural form
  {
    entry: {
      i: 4770,
      ts: 1608137130992,
      p: "چیغې کول",
      g: "",
      f: "chéeghe kawul",
      e: "to yell, scream, cry out",
      l: 1527813972,
      c: "v. gen. stat./dyn. comp. trans.",
    },
    complement: {
      i: 4769,
      ts: 1527813972,
      p: "چیغه",
      g: "",
      f: "chéegha",
      e: "yell, scream, cry",
      c: "n. f.",
    },
    result: {
      type: "dynamic or generative stative compound",
      transitivity: "transitive",
      dynamic: {
        entry: {
          entry: {
            i: 4770,
            ts: 1608137130992,
            p: "چیغې کول",
            g: "",
            f: "chéeghe kawul",
            e: "to yell, scream, cry out",
            l: 1527813972,
            c: "v. dyn. comp. trans.",
          },
          complement: {
            i: 4769,
            ts: 1527813972,
            p: "چیغه",
            g: "",
            f: "chéegha",
            e: "yell, scream, cry",
            c: "n. f.",
          },
        },
        type: "dynamic compound",
        transitivity: "transitive",
        yulEnding: null,
        stem: {
          imperfective: {
            p: "چیغې کو",
            f: "chéeghe kaw",
          },
          perfective: {
            short: {
              p: "چیغې وک",
              f: "chéeghe óok",
            },
            long: {
              p: "چیغې وکړ",
              f: "chéeghe óokR",
            },
          },
          perfectiveSplit: {
            short: [
              {
                p: "چیغې و",
                f: "chéeghe óo",
              },
              {
                p: "ک",
                f: "k",
              },
            ],
            long: [
              {
                p: "چیغې و",
                f: "chéeghe óo",
              },
              {
                p: "کړ",
                f: "kR",
              },
            ],
          },
        },
        root: {
          imperfective: {
            short: {
              p: "چیغې کو",
              f: "chéeghe kaw",
            },
            long: {
              p: "چیغې کول",
              f: "chéeghe kawúl",
            },
          },
          perfective: {
            mini: {
              p: "چیغې وک",
              f: "chéeghe óok",
            },
            short: {
              p: "چیغې وکړ",
              f: "chéeghe óokR",
            },
            long: {
              p: "چیغې وکړل",
              f: "chéeghe óokRul",
            },
          },
          perfectiveSplit: {
            mini: [
              {
                p: "چیغې و",
                f: "chéeghe óo",
              },
              {
                p: "ک",
                f: "k",
              },
            ],
            short: [
              {
                p: "چیغې و",
                f: "chéeghe óo",
              },
              {
                p: "کړ",
                f: "kR",
              },
            ],
            long: [
              {
                p: "چیغې و",
                f: "chéeghe óo",
              },
              {
                p: "کړل",
                f: "kRul",
              },
            ],
          },
        },
        participle: {
          present: {
            p: "چیغې کوونکی",
            f: "chéeghe kawóonkay",
          },
          past: {
            p: "چیغې کړې",
            f: "chéeghe kúRe",
          },
        },
        objComplement: {
          entry: {
            i: 4769,
            ts: 1527813972,
            p: "چیغه",
            f: "chéegha",
            g: "",
            e: "yell, scream, cry",
            c: "n. f.",
          },
          plural: {
            p: "چیغې",
            f: "chéeghe",
          },
          person: 11,
        },
        auxVerb: {
          ts: 1527812752,
          i: 11033,
          p: "کول",
          f: "kawul",
          g: "kawul",
          e: "to do (an action or activity)",
          r: 4,
          c: "v. trans./gramm. trans.",
          ssp: "وکړ",
          ssf: "óokR",
          prp: "وکړل",
          prf: "óokRul",
          pprtp: "کړی",
          pprtf: "kúRay",
          separationAtP: 1,
          separationAtF: 2,
          diacExcept: true,
          ec: "do,does,doing,did,done",
        },
        singularForm: {
          entry: {
            entry: {
              i: 4770,
              ts: 1608137130992,
              p: "چیغې کول",
              g: "",
              f: "chéeghe kawul",
              e: "to yell, scream, cry out",
              l: 1527813972,
              c: "v. dyn. comp. trans.",
            },
            complement: {
              i: 4769,
              ts: 1527813972,
              p: "چیغه",
              g: "",
              f: "chéegha",
              e: "yell, scream, cry",
              c: "n. f.",
            },
          },
          type: "dynamic compound",
          transitivity: "transitive",
          yulEnding: null,
          stem: {
            imperfective: {
              p: "چیغه کو",
              f: "chéegha kaw",
            },
            perfective: {
              short: {
                p: "چیغه وک",
                f: "chéegha óok",
              },
              long: {
                p: "چیغه وکړ",
                f: "chéegha óokR",
              },
            },
            perfectiveSplit: {
              short: [
                {
                  p: "چیغه و",
                  f: "chéegha óo",
                },
                {
                  p: "ک",
                  f: "k",
                },
              ],
              long: [
                {
                  p: "چیغه و",
                  f: "chéegha óo",
                },
                {
                  p: "کړ",
                  f: "kR",
                },
              ],
            },
          },
          root: {
            imperfective: {
              short: {
                p: "چیغه کو",
                f: "chéegha kaw",
              },
              long: {
                p: "چیغه کول",
                f: "chéegha kawúl",
              },
            },
            perfective: {
              mini: {
                p: "چیغه وک",
                f: "chéegha óok",
              },
              short: {
                p: "چیغه وکړ",
                f: "chéegha óokR",
              },
              long: {
                p: "چیغه وکړل",
                f: "chéegha óokRul",
              },
            },
            perfectiveSplit: {
              mini: [
                {
                  p: "چیغه و",
                  f: "chéegha óo",
                },
                {
                  p: "ک",
                  f: "k",
                },
              ],
              short: [
                {
                  p: "چیغه و",
                  f: "chéegha óo",
                },
                {
                  p: "کړ",
                  f: "kR",
                },
              ],
              long: [
                {
                  p: "چیغه و",
                  f: "chéegha óo",
                },
                {
                  p: "کړل",
                  f: "kRul",
                },
              ],
            },
          },
          participle: {
            present: {
              p: "چیغه کوونکی",
              f: "chéegha kawóonkay",
            },
            past: {
              p: "چیغه کړې",
              f: "chéegha kúRe",
            },
          },
          objComplement: {
            entry: {
              i: 4769,
              ts: 1527813972,
              p: "چیغه",
              f: "chéegha",
              g: "",
              e: "yell, scream, cry",
              c: "n. f.",
            },
            person: 5,
          },
          auxVerb: {
            ts: 1527812752,
            i: 11033,
            p: "کول",
            f: "kawul",
            g: "kawul",
            e: "to do (an action or activity)",
            r: 4,
            c: "v. trans./gramm. trans.",
            ssp: "وکړ",
            ssf: "óokR",
            prp: "وکړل",
            prf: "óokRul",
            pprtp: "کړی",
            pprtf: "kúRay",
            separationAtP: 1,
            separationAtF: 2,
            diacExcept: true,
            ec: "do,does,doing,did,done",
          },
          intransitiveForm: {
            entry: {
              entry: {
                i: 4770,
                ts: 1608137130992,
                p: "چیغې کېدل",
                g: "",
                f: "chéeghe kedul",
                e: "to yell, scream, cry out",
                l: 1527813972,
                c: "v. intrans. dyn. comp.",
              },
              complement: {
                i: 4769,
                ts: 1527813972,
                p: "چیغه",
                g: "",
                f: "chéegha",
                e: "yell, scream, cry",
                c: "n. f.",
              },
            },
            type: "dynamic compound",
            transitivity: "intransitive",
            yulEnding: null,
            stem: {
              imperfective: {
                p: "چیغې کېږ",
                f: "chéeghe kéG",
              },
              perfective: {
                p: "چیغې وش",
                f: "chéeghe óosh",
              },
              perfectiveSplit: [
                {
                  p: "چیغې و",
                  f: "chéeghe óo",
                },
                {
                  p: "ش",
                  f: "sh",
                },
              ],
            },
            root: {
              imperfective: {
                short: {
                  p: "چیغې کېد",
                  f: "chéeghe ked",
                },
                long: {
                  p: "چیغې کېدل",
                  f: "chéeghe kedúl",
                },
              },
              perfective: {
                short: {
                  p: "چیغې وشو",
                  f: "chéeghe óoshw",
                },
                long: {
                  p: "چیغې وشول",
                  f: "chéeghe óoshwul",
                },
              },
              perfectiveSplit: {
                short: [
                  {
                    p: "چیغې و",
                    f: "chéeghe óo",
                  },
                  {
                    p: "شو",
                    f: "shw",
                  },
                ],
                long: [
                  {
                    p: "چیغې و",
                    f: "chéeghe óo",
                  },
                  {
                    p: "شول",
                    f: "shwul",
                  },
                ],
              },
            },
            participle: {
              present: {
                p: "چیغې کېدونکی",
                f: "chéeghe kedóonkay",
              },
              past: {
                p: "چیغې شوې",
                f: "chéeghe shúwe",
              },
            },
            objComplement: {
              entry: {
                i: 4769,
                ts: 1527813972,
                p: "چیغه",
                f: "chéegha",
                g: "",
                e: "yell, scream, cry",
                c: "n. f.",
              },
              plural: {
                p: "چیغې",
                f: "chéeghe",
              },
              person: 11,
            },
            auxVerb: {
              i: 10122,
              ts: 1527812754,
              p: "کېدل",
              f: "kedul",
              g: "",
              e: "to happen, occur",
              c: "v. intrans. irreg. aux. dyn.",
              ssp: "وش",
              ssf: "óosh",
              prp: "وشول",
              prf: "óoshwul",
              pprtp: "شوی",
              pprtf: "shúway",
              diacExcept: true,
            },
            singularForm: {
              entry: {
                entry: {
                  i: 4770,
                  ts: 1608137130992,
                  p: "چیغې کېدل",
                  g: "",
                  f: "chéeghe kedul",
                  e: "to yell, scream, cry out",
                  l: 1527813972,
                  c: "v. intrans. dyn. comp.",
                },
                complement: {
                  i: 4769,
                  ts: 1527813972,
                  p: "چیغه",
                  g: "",
                  f: "chéegha",
                  e: "yell, scream, cry",
                  c: "n. f.",
                },
              },
              type: "dynamic compound",
              transitivity: "intransitive",
              yulEnding: null,
              stem: {
                imperfective: {
                  p: "چیغه کېږ",
                  f: "chéegha kéG",
                },
                perfective: {
                  p: "چیغه وش",
                  f: "chéegha óosh",
                },
                perfectiveSplit: [
                  {
                    p: "چیغه و",
                    f: "chéegha óo",
                  },
                  {
                    p: "ش",
                    f: "sh",
                  },
                ],
              },
              root: {
                imperfective: {
                  short: {
                    p: "چیغه کېد",
                    f: "chéegha ked",
                  },
                  long: {
                    p: "چیغه کېدل",
                    f: "chéegha kedúl",
                  },
                },
                perfective: {
                  short: {
                    p: "چیغه وشو",
                    f: "chéegha óoshw",
                  },
                  long: {
                    p: "چیغه وشول",
                    f: "chéegha óoshwul",
                  },
                },
                perfectiveSplit: {
                  short: [
                    {
                      p: "چیغه و",
                      f: "chéegha óo",
                    },
                    {
                      p: "شو",
                      f: "shw",
                    },
                  ],
                  long: [
                    {
                      p: "چیغه و",
                      f: "chéegha óo",
                    },
                    {
                      p: "شول",
                      f: "shwul",
                    },
                  ],
                },
              },
              participle: {
                present: {
                  p: "چیغه کېدونکی",
                  f: "chéegha kedóonkay",
                },
                past: {
                  p: "چیغه شوې",
                  f: "chéegha shúwe",
                },
              },
              objComplement: {
                entry: {
                  i: 4769,
                  ts: 1527813972,
                  p: "چیغه",
                  f: "chéegha",
                  g: "",
                  e: "yell, scream, cry",
                  c: "n. f.",
                },
                person: 5,
              },
              auxVerb: {
                i: 10122,
                ts: 1527812754,
                p: "کېدل",
                f: "kedul",
                g: "",
                e: "to happen, occur",
                c: "v. intrans. irreg. aux. dyn.",
                ssp: "وش",
                ssf: "óosh",
                prp: "وشول",
                prf: "óoshwul",
                pprtp: "شوی",
                pprtf: "shúway",
                diacExcept: true,
              },
            },
          },
        },
        intransitiveForm: {
          entry: {
            entry: {
              i: 4770,
              ts: 1608137130992,
              p: "چیغې کېدل",
              g: "",
              f: "chéeghe kedul",
              e: "to yell, scream, cry out",
              l: 1527813972,
              c: "v. intrans. dyn. comp.",
            },
            complement: {
              i: 4769,
              ts: 1527813972,
              p: "چیغه",
              g: "",
              f: "chéegha",
              e: "yell, scream, cry",
              c: "n. f.",
            },
          },
          type: "dynamic compound",
          transitivity: "intransitive",
          yulEnding: null,
          stem: {
            imperfective: {
              p: "چیغې کېږ",
              f: "chéeghe kéG",
            },
            perfective: {
              p: "چیغې وش",
              f: "chéeghe óosh",
            },
            perfectiveSplit: [
              {
                p: "چیغې و",
                f: "chéeghe óo",
              },
              {
                p: "ش",
                f: "sh",
              },
            ],
          },
          root: {
            imperfective: {
              short: {
                p: "چیغې کېد",
                f: "chéeghe ked",
              },
              long: {
                p: "چیغې کېدل",
                f: "chéeghe kedúl",
              },
            },
            perfective: {
              short: {
                p: "چیغې وشو",
                f: "chéeghe óoshw",
              },
              long: {
                p: "چیغې وشول",
                f: "chéeghe óoshwul",
              },
            },
            perfectiveSplit: {
              short: [
                {
                  p: "چیغې و",
                  f: "chéeghe óo",
                },
                {
                  p: "شو",
                  f: "shw",
                },
              ],
              long: [
                {
                  p: "چیغې و",
                  f: "chéeghe óo",
                },
                {
                  p: "شول",
                  f: "shwul",
                },
              ],
            },
          },
          participle: {
            present: {
              p: "چیغې کېدونکی",
              f: "chéeghe kedóonkay",
            },
            past: {
              p: "چیغې شوې",
              f: "chéeghe shúwe",
            },
          },
          objComplement: {
            entry: {
              i: 4769,
              ts: 1527813972,
              p: "چیغه",
              f: "chéegha",
              g: "",
              e: "yell, scream, cry",
              c: "n. f.",
            },
            plural: {
              p: "چیغې",
              f: "chéeghe",
            },
            person: 11,
          },
          auxVerb: {
            i: 10122,
            ts: 1527812754,
            p: "کېدل",
            f: "kedul",
            g: "",
            e: "to happen, occur",
            c: "v. intrans. irreg. aux. dyn.",
            ssp: "وش",
            ssf: "óosh",
            prp: "وشول",
            prf: "óoshwul",
            pprtp: "شوی",
            pprtf: "shúway",
            diacExcept: true,
          },
          singularForm: {
            entry: {
              entry: {
                i: 4770,
                ts: 1608137130992,
                p: "چیغې کېدل",
                g: "",
                f: "chéeghe kedul",
                e: "to yell, scream, cry out",
                l: 1527813972,
                c: "v. intrans. dyn. comp.",
              },
              complement: {
                i: 4769,
                ts: 1527813972,
                p: "چیغه",
                g: "",
                f: "chéegha",
                e: "yell, scream, cry",
                c: "n. f.",
              },
            },
            type: "dynamic compound",
            transitivity: "intransitive",
            yulEnding: null,
            stem: {
              imperfective: {
                p: "چیغه کېږ",
                f: "chéegha kéG",
              },
              perfective: {
                p: "چیغه وش",
                f: "chéegha óosh",
              },
              perfectiveSplit: [
                {
                  p: "چیغه و",
                  f: "chéegha óo",
                },
                {
                  p: "ش",
                  f: "sh",
                },
              ],
            },
            root: {
              imperfective: {
                short: {
                  p: "چیغه کېد",
                  f: "chéegha ked",
                },
                long: {
                  p: "چیغه کېدل",
                  f: "chéegha kedúl",
                },
              },
              perfective: {
                short: {
                  p: "چیغه وشو",
                  f: "chéegha óoshw",
                },
                long: {
                  p: "چیغه وشول",
                  f: "chéegha óoshwul",
                },
              },
              perfectiveSplit: {
                short: [
                  {
                    p: "چیغه و",
                    f: "chéegha óo",
                  },
                  {
                    p: "شو",
                    f: "shw",
                  },
                ],
                long: [
                  {
                    p: "چیغه و",
                    f: "chéegha óo",
                  },
                  {
                    p: "شول",
                    f: "shwul",
                  },
                ],
              },
            },
            participle: {
              present: {
                p: "چیغه کېدونکی",
                f: "chéegha kedóonkay",
              },
              past: {
                p: "چیغه شوې",
                f: "chéegha shúwe",
              },
            },
            objComplement: {
              entry: {
                i: 4769,
                ts: 1527813972,
                p: "چیغه",
                f: "chéegha",
                g: "",
                e: "yell, scream, cry",
                c: "n. f.",
              },
              person: 5,
            },
            auxVerb: {
              i: 10122,
              ts: 1527812754,
              p: "کېدل",
              f: "kedul",
              g: "",
              e: "to happen, occur",
              c: "v. intrans. irreg. aux. dyn.",
              ssp: "وش",
              ssf: "óosh",
              prp: "وشول",
              prf: "óoshwul",
              pprtp: "شوی",
              pprtf: "shúway",
              diacExcept: true,
            },
          },
        },
      },
      stative: {
        entry: {
          entry: {
            i: 4770,
            ts: 1608137130992,
            p: "چیغې کول",
            g: "",
            f: "chéeghe kawul",
            e: "to yell, scream, cry out",
            l: 1527813972,
            c: "v. gen. stat. comp. trans.",
          },
          complement: {
            i: 4769,
            ts: 1527813972,
            p: "چیغه",
            g: "",
            f: "chéegha",
            e: "yell, scream, cry",
            c: "n. f.",
          },
        },
        type: "generative stative compound",
        transitivity: "transitive",
        yulEnding: null,
        stem: {
          imperfective: {
            p: "چیغې کو",
            f: "chéeghe kaw",
          },
          perfective: {
            short: {
              p: "چیغې ک",
              f: "chéeghe k",
            },
            long: {
              p: "چیغې کړ",
              f: "chéeghe kR",
            },
          },
          perfectiveSplit: {
            short: [
              {
                p: "چیغې ",
                f: "chéeghe ",
              },
              {
                p: "ک",
                f: "k",
              },
            ],
            long: [
              {
                p: "چیغې ",
                f: "chéeghe ",
              },
              {
                p: "کړ",
                f: "kR",
              },
            ],
          },
        },
        root: {
          imperfective: {
            short: {
              p: "چیغې کو",
              f: "chéeghe kaw",
            },
            long: {
              p: "چیغې کول",
              f: "chéeghe kawúl",
            },
          },
          perfective: {
            mini: {
              p: "چیغې ک",
              f: "chéeghe k",
            },
            short: {
              p: "چیغې کړ",
              f: "chéeghe kR",
            },
            long: {
              p: "چیغې کړل",
              f: "chéeghe kRul",
            },
          },
          perfectiveSplit: {
            mini: [
              {
                p: "چیغې ",
                f: "chéeghe ",
              },
              {
                p: "ک",
                f: "k",
              },
            ],
            short: [
              {
                p: "چیغې ",
                f: "chéeghe ",
              },
              {
                p: "کړ",
                f: "kR",
              },
            ],
            long: [
              {
                p: "چیغې ",
                f: "chéeghe ",
              },
              {
                p: "کړل",
                f: "kRul",
              },
            ],
          },
        },
        participle: {
          present: {
            p: "چیغې کوونکی",
            f: "chéeghe kawóonkay",
          },
          past: {
            p: "چیغې کړې",
            f: "chéeghe kúRe",
          },
        },
        objComplement: {
          entry: {
            i: 4769,
            ts: 1527813972,
            p: "چیغه",
            f: "chéegha",
            g: "",
            e: "yell, scream, cry",
            c: "n. f.",
          },
          plural: {
            p: "چیغې",
            f: "chéeghe",
          },
          person: 11,
        },
        singularForm: {
          entry: {
            entry: {
              i: 4770,
              ts: 1608137130992,
              p: "چیغې کول",
              g: "",
              f: "chéeghe kawul",
              e: "to yell, scream, cry out",
              l: 1527813972,
              c: "v. gen. stat. comp. trans.",
            },
            complement: {
              i: 4769,
              ts: 1527813972,
              p: "چیغه",
              g: "",
              f: "chéegha",
              e: "yell, scream, cry",
              c: "n. f.",
            },
          },
          type: "generative stative compound",
          transitivity: "transitive",
          yulEnding: null,
          stem: {
            imperfective: {
              p: "چیغه کو",
              f: "chéegha kaw",
            },
            perfective: {
              short: {
                p: "چیغه ک",
                f: "chéegha k",
              },
              long: {
                p: "چیغه کړ",
                f: "chéegha kR",
              },
            },
            perfectiveSplit: {
              short: [
                {
                  p: "چیغه ",
                  f: "chéegha ",
                },
                {
                  p: "ک",
                  f: "k",
                },
              ],
              long: [
                {
                  p: "چیغه ",
                  f: "chéegha ",
                },
                {
                  p: "کړ",
                  f: "kR",
                },
              ],
            },
          },
          root: {
            imperfective: {
              short: {
                p: "چیغه کو",
                f: "chéegha kaw",
              },
              long: {
                p: "چیغه کول",
                f: "chéegha kawúl",
              },
            },
            perfective: {
              mini: {
                p: "چیغه ک",
                f: "chéegha k",
              },
              short: {
                p: "چیغه کړ",
                f: "chéegha kR",
              },
              long: {
                p: "چیغه کړل",
                f: "chéegha kRul",
              },
            },
            perfectiveSplit: {
              mini: [
                {
                  p: "چیغه ",
                  f: "chéegha ",
                },
                {
                  p: "ک",
                  f: "k",
                },
              ],
              short: [
                {
                  p: "چیغه ",
                  f: "chéegha ",
                },
                {
                  p: "کړ",
                  f: "kR",
                },
              ],
              long: [
                {
                  p: "چیغه ",
                  f: "chéegha ",
                },
                {
                  p: "کړل",
                  f: "kRul",
                },
              ],
            },
          },
          participle: {
            present: {
              p: "چیغه کوونکی",
              f: "chéegha kawóonkay",
            },
            past: {
              p: "چیغه کړې",
              f: "chéegha kúRe",
            },
          },
          objComplement: {
            entry: {
              i: 4769,
              ts: 1527813972,
              p: "چیغه",
              f: "chéegha",
              g: "",
              e: "yell, scream, cry",
              c: "n. f.",
            },
            person: 5,
          },
        },
      },
    },
  },
];

test(`verb info should work`, () => {
  toTest.forEach(({ entry, result, complement }) => {
    // console.log(JSON.stringify(getVerbInfo(entry, complement), null, "  "))
    expect(getVerbInfo(entry, complement)).toEqual(result);
  });
});

// test(`verb info should not work if no parts of speech`, () => {
//     expect(() => {
//         getVerbInfo({"i":5413,"ts":1527812767,"p":"خندل","g":"","f":"khandul","e":"to laugh"});
//     }).toThrow("No part of speech info");
// });

// test(`verb info should not work if a complement is not provided for a compound verb`, () => {
//     expect(() => {
//         getVerbInfo({"i":5368,"ts":1577898920635,"p":"خفه کېدل","g":"","f":"khufa kedul","e":"to be sad, grieved, annoyed, upset; to be choked, to suffocate","l":1527812798,"c":"v. stat. comp. intrans."});
//     }).toThrow("complement required for compound verb");
// });
