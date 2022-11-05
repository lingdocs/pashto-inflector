/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  translatePhonetics,
} from "./translate-phonetics";

const dialects = ["southern", "standard", "peshawer"];
const systems = ["ipa", "alalc"];

const translations = [
  {
    original: "looT",
    ipa: {
      southern: "lu:ʈ",
      standard: "lu:ʈ",
      peshawer: "lu:ʈ",
    },
    alalc: {
      southern: "lōṭ",
      standard: "lōṭ",
      peshawer: "lōṭ",
    },
  },
  {
    original: "puxto",
    ipa: {
      southern: "pəʂt̪o",
      standard: "pəçt̪o",
      peshawer: "pəxt̪o",
    },
    alalc: {
      southern: "pəṣhto",
      standard: "pək'hto",
      peshawer: "pəkhto",
    },
  },
  {
    original: "luG",
    ipa: {
      southern: "ləʐ",
      standard: "ləʝ",
      peshawer: "ləg",
    },
    alalc: {
      southern: "ləẓh",
      standard: "ləğ",
      peshawer: "ləg",
    },
  },
  {
    original: "saRey",
    ipa: {
      southern: "saɻai",
      standard: "saɻai",
      peshawer: "saɻai",
    },
    alalc: {
      southern: "saṛay",
      standard: "saṛay",
      peshawer: "saṛay",
    },
  },
];

translations.forEach((t) => {
  systems.forEach((system) => {
    // check each dialect with given system
    dialects.forEach((dialect) => {
      test(
        // @ts-ignore
        `${t.original} should be translated to ${t.ipa[dialect]} using ${system} with ${dialect} dialect`,
        () => {
          const translated = translatePhonetics(t.original, {
            // @ts-ignore
            system,
            // @ts-ignore
            dialect,
          });
          // @ts-ignore
          expect(translated).toBe(t[system][dialect]);
        },
      );
    });
  });
});
