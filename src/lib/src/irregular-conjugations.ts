/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as T from "../../types";

// shared bits
const kedulStatModal: T.ModalContent = {
  nonImperative: {
    long: [
      [
        [
          { p: "کېدلی شم", f: "kedúlay shum" },
          { p: "کېدلای شم", f: "kedúlaay shum" },
        ],
        [
          { p: "کېدلی شو", f: "kedúlay shoo" },
          { p: "کېدلای شو", f: "kedúlaay shoo" },
        ],
      ],
      [
        [
          { p: "کېدلی شم", f: "kedúlay shum" },
          { p: "کېدلای شم", f: "kedúlaay shum" },
        ],
        [
          { p: "کېدلی شو", f: "kedúlay shoo" },
          { p: "کېدلای شو", f: "kedúlaay shoo" },
        ],
      ],
      [
        [
          { p: "کېدلی شې", f: "kedúlay she" },
          { p: "کېدلای شې", f: "kedúlaay she" },
        ],
        [
          { p: "کېدلی شئ", f: "kedúlay shey" },
          { p: "کېدلای شئ", f: "kedúlaay shey" },
        ],
      ],
      [
        [
          { p: "کېدلی شې", f: "kedúlay she" },
          { p: "کېدلای شې", f: "kedúlaay she" },
        ],
        [
          { p: "کېدلی شئ", f: "kedúlay shey" },
          { p: "کېدلای شئ", f: "kedúlaay shey" },
        ],
      ],
      [
        [
          { p: "کېدلی شي", f: "kedúlay shee" },
          { p: "کېدلای شي", f: "kedúlaay shee" },
        ],
        [
          { p: "کېدلی شي", f: "kedúlay shee" },
          { p: "کېدلای شي", f: "kedúlaay shee" },
        ],
      ],
      [
        [
          { p: "کېدلی شي", f: "kedúlay shee" },
          { p: "کېدلای شي", f: "kedúlaay shee" },
        ],
        [
          { p: "کېدلی شي", f: "kedúlay shee" },
          { p: "کېدلای شي", f: "kedúlaay shee" },
        ],
      ],
    ],
    short: [
      [
        [
          { p: "کېدی شم", f: "kedáy shum" },
          { p: "کېدای شم", f: "kedáay shum" },
        ],
        [
          { p: "کېدی شو", f: "kedáy shoo" },
          { p: "کېدای شو", f: "kedáay shoo" },
        ],
      ],
      [
        [
          { p: "کېدی شم", f: "kedáy shum" },
          { p: "کېدای شم", f: "kedáay shum" },
        ],
        [
          { p: "کېدی شو", f: "kedáy shoo" },
          { p: "کېدای شو", f: "kedáay shoo" },
        ],
      ],
      [
        [
          { p: "کېدی شې", f: "kedáy she" },
          { p: "کېدای شې", f: "kedáay she" },
        ],
        [
          { p: "کېدی شئ", f: "kedáy shey" },
          { p: "کېدای شئ", f: "kedáay shey" },
        ],
      ],
      [
        [
          { p: "کېدی شې", f: "kedáy she" },
          { p: "کېدای شې", f: "kedáay she" },
        ],
        [
          { p: "کېدی شئ", f: "kedáy shey" },
          { p: "کېدای شئ", f: "kedáay shey" },
        ],
      ],
      [
        [
          { p: "کېدی شي", f: "kedáy shee" },
          { p: "کېدای شي", f: "kedáay shee" },
        ],
        [
          { p: "کېدی شي", f: "kedáy shee" },
          { p: "کېدای شي", f: "kedáay shee" },
        ],
      ],
      [
        [
          { p: "کېدی شي", f: "kedáy shee" },
          { p: "کېدای شي", f: "kedáay shee" },
        ],
        [
          { p: "کېدی شي", f: "kedáy shee" },
          { p: "کېدای شي", f: "kedáay shee" },
        ],
      ],
    ],
  },
  future: {
    long: [
      [
        [
          { p: "به کېدلی شم", f: "ba kedúlay shum" },
          { p: "به کېدلای شم", f: "ba kedúlaay shum" },
        ],
        [
          { p: "به کېدلی شو", f: "ba kedúlay shoo" },
          { p: "به کېدلای شو", f: "ba kedúlaay shoo" },
        ],
      ],
      [
        [
          { p: "به کېدلی شم", f: "ba kedúlay shum" },
          { p: "به کېدلای شم", f: "ba kedúlaay shum" },
        ],
        [
          { p: "به کېدلی شو", f: "ba kedúlay shoo" },
          { p: "به کېدلای شو", f: "ba kedúlaay shoo" },
        ],
      ],
      [
        [
          { p: "به کېدلی شې", f: "ba kedúlay she" },
          { p: "به کېدلای شې", f: "ba kedúlaay she" },
        ],
        [
          { p: "به کېدلی شئ", f: "ba kedúlay shey" },
          { p: "به کېدلای شئ", f: "ba kedúlaay shey" },
        ],
      ],
      [
        [
          { p: "به کېدلی شې", f: "ba kedúlay she" },
          { p: "به کېدلای شې", f: "ba kedúlaay she" },
        ],
        [
          { p: "به کېدلی شئ", f: "ba kedúlay shey" },
          { p: "به کېدلای شئ", f: "ba kedúlaay shey" },
        ],
      ],
      [
        [
          { p: "به کېدلی شي", f: "ba kedúlay shee" },
          { p: "به کېدلای شي", f: "ba kedúlaay shee" },
        ],
        [
          { p: "به کېدلی شي", f: "ba kedúlay shee" },
          { p: "به کېدلای شي", f: "ba kedúlaay shee" },
        ],
      ],
      [
        [
          { p: "به کېدلی شي", f: "ba kedúlay shee" },
          { p: "به کېدلای شي", f: "ba kedúlaay shee" },
        ],
        [
          { p: "به کېدلی شي", f: "ba kedúlay shee" },
          { p: "به کېدلای شي", f: "ba kedúlaay shee" },
        ],
      ],
    ],
    short: [
      [
        [
          { p: "به کېدی شم", f: "ba kedáy shum" },
          { p: "به کېدای شم", f: "ba kedáay shum" },
        ],
        [
          { p: "به کېدی شو", f: "ba kedáy shoo" },
          { p: "به کېدای شو", f: "ba kedáay shoo" },
        ],
      ],
      [
        [
          { p: "به کېدی شم", f: "ba kedáy shum" },
          { p: "به کېدای شم", f: "ba kedáay shum" },
        ],
        [
          { p: "به کېدی شو", f: "ba kedáy shoo" },
          { p: "به کېدای شو", f: "ba kedáay shoo" },
        ],
      ],
      [
        [
          { p: "به کېدی شې", f: "ba kedáy she" },
          { p: "به کېدای شې", f: "ba kedáay she" },
        ],
        [
          { p: "به کېدی شئ", f: "ba kedáy shey" },
          { p: "به کېدای شئ", f: "ba kedáay shey" },
        ],
      ],
      [
        [
          { p: "به کېدی شې", f: "ba kedáy she" },
          { p: "به کېدای شې", f: "ba kedáay she" },
        ],
        [
          { p: "به کېدی شئ", f: "ba kedáy shey" },
          { p: "به کېدای شئ", f: "ba kedáay shey" },
        ],
      ],
      [
        [
          { p: "به کېدی شي", f: "ba kedáy shee" },
          { p: "به کېدای شي", f: "ba kedáay shee" },
        ],
        [
          { p: "به کېدی شي", f: "ba kedáy shee" },
          { p: "به کېدای شي", f: "ba kedáay shee" },
        ],
      ],
      [
        [
          { p: "به کېدی شي", f: "ba kedáy shee" },
          { p: "به کېدای شي", f: "ba kedáay shee" },
        ],
        [
          { p: "به کېدی شي", f: "ba kedáy shee" },
          { p: "به کېدای شي", f: "ba kedáay shee" },
        ],
      ],
    ],
  },
  past: {
    long: [
      [
        [
          { p: "کېدلی شوم", f: "kedúlay shwum" },
          { p: "کېدلای شوم", f: "kedúlaay shwum" },
        ],
        [
          { p: "کېدلی شو", f: "kedúlay shoo" },
          { p: "کېدلای شو", f: "kedúlaay shoo" },
        ],
      ],
      [
        [
          { p: "کېدلی شوم", f: "kedúlay shwum" },
          { p: "کېدلای شوم", f: "kedúlaay shwum" },
        ],
        [
          { p: "کېدلی شو", f: "kedúlay shoo" },
          { p: "کېدلای شو", f: "kedúlaay shoo" },
        ],
      ],
      [
        [
          { p: "کېدلی شوې", f: "kedúlay shwe" },
          { p: "کېدلای شوې", f: "kedúlaay shwe" },
        ],
        [
          { p: "کېدلی شوئ", f: "kedúlay shwey" },
          { p: "کېدلای شوئ", f: "kedúlaay shwey" },
        ],
      ],
      [
        [
          { p: "کېدلی شوې", f: "kedúlay shwe" },
          { p: "کېدلای شوې", f: "kedúlaay shwe" },
        ],
        [
          { p: "کېدلی شوئ", f: "kedúlay shwey" },
          { p: "کېدلای شوئ", f: "kedúlaay shwey" },
        ],
      ],
      [
        [
          { p: "کېدلی شو", f: "kedúlay sho" },
          { p: "کېدلای شو", f: "kedúlaay sho" },
        ],
        [
          { p: "کېدلی شول", f: "kedúlay shwul" },
          { p: "کېدلای شول", f: "kedúlaay shwul" },
          { p: "کېدلی شو", f: "kedúlay shoo" },
          { p: "کېدلای شو", f: "kedúlaay shoo" },
        ],
      ],
      [
        [
          { p: "کېدلی شوه", f: "kedúlay shwa" },
          { p: "کېدلای شوه", f: "kedúlaay shwa" },
        ],
        [
          { p: "کېدلی شولې", f: "kedúlay shwule" },
          { p: "کېدلای شولې", f: "kedúlaay shwule" },
          { p: "کېدلی شوې", f: "kedúlay shwe" },
          { p: "کېدلای شوې", f: "kedúlaay shwe" },
        ],
      ],
    ],
    short: [
      [
        [
          { p: "کېدی شوم", f: "kedáy shwum" },
          { p: "کېدای شوم", f: "kedáay shwum" },
        ],
        [
          { p: "کېدی شو", f: "kedáy shoo" },
          { p: "کېدای شو", f: "kedáay shoo" },
        ],
      ],
      [
        [
          { p: "کېدی شوم", f: "kedáy shwum" },
          { p: "کېدای شوم", f: "kedáay shwum" },
        ],
        [
          { p: "کېدی شو", f: "kedáy shoo" },
          { p: "کېدای شو", f: "kedáay shoo" },
        ],
      ],
      [
        [
          { p: "کېدی شوې", f: "kedáy shwe" },
          { p: "کېدای شوې", f: "kedáay shwe" },
        ],
        [
          { p: "کېدی شوئ", f: "kedáy shwey" },
          { p: "کېدای شوئ", f: "kedáay shwey" },
        ],
      ],
      [
        [
          { p: "کېدی شوې", f: "kedáy shwe" },
          { p: "کېدای شوې", f: "kedáay shwe" },
        ],
        [
          { p: "کېدی شوئ", f: "kedáy shwey" },
          { p: "کېدای شوئ", f: "kedáay shwey" },
        ],
      ],
      [
        [
          { p: "کېدی شو", f: "kedáy sho" },
          { p: "کېدای شو", f: "kedáay sho" },
        ],
        [
          { p: "کېدی شول", f: "kedáy shwul" },
          { p: "کېدای شول", f: "kedáay shwul" },
          { p: "کېدی شو", f: "kedáy shoo" },
          { p: "کېدای شو", f: "kedáay shoo" },
        ],
      ],
      [
        [
          { p: "کېدی شوه", f: "kedáy shwa" },
          { p: "کېدای شوه", f: "kedáay shwa" },
        ],
        [
          { p: "کېدی شولې", f: "kedáy shwule" },
          { p: "کېدای شولې", f: "kedáay shwule" },
          { p: "کېدی شوې", f: "kedáy shwe" },
          { p: "کېدای شوې", f: "kedáay shwe" },
        ],
      ],
    ],
  },
  habitualPast: {
    long: [
      [
        [
          { p: "به کېدلی شوم", f: "ba kedúlay shwum" },
          { p: "به کېدلای شوم", f: "ba kedúlaay shwum" },
        ],
        [
          { p: "به کېدلی شو", f: "ba kedúlay shoo" },
          { p: "به کېدلای شو", f: "ba kedúlaay shoo" },
        ],
      ],
      [
        [
          { p: "به کېدلی شوم", f: "ba kedúlay shwum" },
          { p: "به کېدلای شوم", f: "ba kedúlaay shwum" },
        ],
        [
          { p: "به کېدلی شو", f: "ba kedúlay shoo" },
          { p: "به کېدلای شو", f: "ba kedúlaay shoo" },
        ],
      ],
      [
        [
          { p: "به کېدلی شوې", f: "ba kedúlay shwe" },
          { p: "به کېدلای شوې", f: "ba kedúlaay shwe" },
        ],
        [
          { p: "به کېدلی شوئ", f: "ba kedúlay shwey" },
          { p: "به کېدلای شوئ", f: "ba kedúlaay shwey" },
        ],
      ],
      [
        [
          { p: "به کېدلی شوې", f: "ba kedúlay shwe" },
          { p: "به کېدلای شوې", f: "ba kedúlaay shwe" },
        ],
        [
          { p: "به کېدلی شوئ", f: "ba kedúlay shwey" },
          { p: "به کېدلای شوئ", f: "ba kedúlaay shwey" },
        ],
      ],
      [
        [
          { p: "به کېدلی شو", f: "ba kedúlay sho" },
          { p: "به کېدلای شو", f: "ba kedúlaay sho" },
        ],
        [
          { p: "به کېدلی شول", f: "ba kedúlay shwul" },
          { p: "به کېدلای شول", f: "ba kedúlaay shwul" },
          { p: "به کېدلی شو", f: "ba kedúlay shoo" },
          { p: "به کېدلای شو", f: "ba kedúlaay shoo" },
        ],
      ],
      [
        [
          { p: "به کېدلی شوه", f: "ba kedúlay shwa" },
          { p: "به کېدلای شوه", f: "ba kedúlaay shwa" },
        ],
        [
          { p: "به کېدلی شولې", f: "ba kedúlay shwule" },
          { p: "به کېدلای شولې", f: "ba kedúlaay shwule" },
          { p: "به کېدلی شوې", f: "ba kedúlay shwe" },
          { p: "به کېدلای شوې", f: "ba kedúlaay shwe" },
        ],
      ],
    ],
    short: [
      [
        [
          { p: "به کېدی شوم", f: "ba kedáy shwum" },
          { p: "به کېدای شوم", f: "ba kedáay shwum" },
        ],
        [
          { p: "به کېدی شو", f: "ba kedáy shoo" },
          { p: "به کېدای شو", f: "ba kedáay shoo" },
        ],
      ],
      [
        [
          { p: "به کېدی شوم", f: "ba kedáy shwum" },
          { p: "به کېدای شوم", f: "ba kedáay shwum" },
        ],
        [
          { p: "به کېدی شو", f: "ba kedáy shoo" },
          { p: "به کېدای شو", f: "ba kedáay shoo" },
        ],
      ],
      [
        [
          { p: "به کېدی شوې", f: "ba kedáy shwe" },
          { p: "به کېدای شوې", f: "ba kedáay shwe" },
        ],
        [
          { p: "به کېدی شوئ", f: "ba kedáy shwey" },
          { p: "به کېدای شوئ", f: "ba kedáay shwey" },
        ],
      ],
      [
        [
          { p: "به کېدی شوې", f: "ba kedáy shwe" },
          { p: "به کېدای شوې", f: "ba kedáay shwe" },
        ],
        [
          { p: "به کېدی شوئ", f: "ba kedáy shwey" },
          { p: "به کېدای شوئ", f: "ba kedáay shwey" },
        ],
      ],
      [
        [
          { p: "به کېدی شو", f: "ba kedáy sho" },
          { p: "به کېدای شو", f: "ba kedáay sho" },
        ],
        [
          { p: "به کېدی شول", f: "ba kedáy shwul" },
          { p: "به کېدای شول", f: "ba kedáay shwul" },
          { p: "به کېدی شو", f: "ba kedáy shoo" },
          { p: "به کېدای شو", f: "ba kedáay shoo" },
        ],
      ],
      [
        [
          { p: "به کېدی شوه", f: "ba kedáy shwa" },
          { p: "به کېدای شوه", f: "ba kedáay shwa" },
        ],
        [
          { p: "به کېدی شولې", f: "ba kedáy shwule" },
          { p: "به کېدای شولې", f: "ba kedáay shwule" },
          { p: "به کېدی شوې", f: "ba kedáy shwe" },
          { p: "به کېدای شوې", f: "ba kedáay shwe" },
        ],
      ],
    ],
  },
  hypotheticalPast: {
    long: [
      [
        [
          { p: "کېدلی شوای", f: "kedúlay shwaay" },
          { p: "کېدلی شوی", f: "kedúlay shway" },
          { p: "کېدلای شوای", f: "kedúlaay shwaay" },
        ],
        [
          { p: "کېدلی شوای", f: "kedúlay shwaay" },
          { p: "کېدلی شوی", f: "kedúlay shway" },
          { p: "کېدای شوی", f: "kedúlaay shway" },
        ],
      ],
      [
        [
          { p: "کېدلی شوای", f: "kedúlay shwaay" },
          { p: "کېدلی شوی", f: "kedúlay shway" },
          { p: "کېدلای شوای", f: "kedúlaay shwaay" },
        ],
        [
          { p: "کېدلی شوای", f: "kedúlay shwaay" },
          { p: "کېدلی شوی", f: "kedúlay shway" },
          { p: "کېدای شوی", f: "kedúlaay shway" },
        ],
      ],
      [
        [
          { p: "کېدلی شوای", f: "kedúlay shwaay" },
          { p: "کېدلی شوی", f: "kedúlay shway" },
          { p: "کېدلای شوای", f: "kedúlaay shwaay" },
        ],
        [
          { p: "کېدلی شوای", f: "kedúlay shwaay" },
          { p: "کېدلی شوی", f: "kedúlay shway" },
          { p: "کېدای شوی", f: "kedúlaay shway" },
        ],
      ],
      [
        [
          { p: "کېدلی شوای", f: "kedúlay shwaay" },
          { p: "کېدلی شوی", f: "kedúlay shway" },
          { p: "کېدلای شوای", f: "kedúlaay shwaay" },
        ],
        [
          { p: "کېدلی شوای", f: "kedúlay shwaay" },
          { p: "کېدلی شوی", f: "kedúlay shway" },
          { p: "کېدای شوی", f: "kedúlaay shway" },
        ],
      ],
      [
        [
          { p: "کېدلی شوای", f: "kedúlay shwaay" },
          { p: "کېدلی شوی", f: "kedúlay shway" },
          { p: "کېدلای شوای", f: "kedúlaay shwaay" },
        ],
        [
          { p: "کېدلی شوای", f: "kedúlay shwaay" },
          { p: "کېدلی شوی", f: "kedúlay shway" },
          { p: "کېدای شوی", f: "kedúlaay shway" },
        ],
      ],
      [
        [
          { p: "کېدلی شوای", f: "kedúlay shwaay" },
          { p: "کېدلی شوی", f: "kedúlay shway" },
          { p: "کېدلای شوای", f: "kedúlaay shwaay" },
        ],
        [
          { p: "کېدلی شوای", f: "kedúlay shwaay" },
          { p: "کېدلی شوی", f: "kedúlay shway" },
          { p: "کېدای شوی", f: "kedúlaay shway" },
        ],
      ],
    ],
    short: [
      [
        [
          { p: "کېدی شوای", f: "kedáy shwaay" },
          { p: "کېدی شوی", f: "kedáy shway" },
          { p: "کېدای شوی", f: "kedáay shway" },
        ],
        [
          { p: "کېدی شوای", f: "kedáy shwaay" },
          { p: "کېدی شوی", f: "kedáy shway" },
          { p: "کېدای شوی", f: "kedáay shway" },
        ],
      ],
      [
        [
          { p: "کېدی شوای", f: "kedáy shwaay" },
          { p: "کېدی شوی", f: "kedáy shway" },
          { p: "کېدای شوی", f: "kedáay shway" },
        ],
        [
          { p: "کېدی شوای", f: "kedáy shwaay" },
          { p: "کېدی شوی", f: "kedáy shway" },
          { p: "کېدای شوی", f: "kedáay shway" },
        ],
      ],
      [
        [
          { p: "کېدی شوای", f: "kedáy shwaay" },
          { p: "کېدی شوی", f: "kedáy shway" },
          { p: "کېدای شوی", f: "kedáay shway" },
        ],
        [
          { p: "کېدی شوای", f: "kedáy shwaay" },
          { p: "کېدی شوی", f: "kedáy shway" },
          { p: "کېدای شوی", f: "kedáay shway" },
        ],
      ],
      [
        [
          { p: "کېدی شوای", f: "kedáy shwaay" },
          { p: "کېدی شوی", f: "kedáy shway" },
          { p: "کېدای شوی", f: "kedáay shway" },
        ],
        [
          { p: "کېدی شوای", f: "kedáy shwaay" },
          { p: "کېدی شوی", f: "kedáy shway" },
          { p: "کېدای شوی", f: "kedáay shway" },
        ],
      ],
      [
        [
          { p: "کېدی شوای", f: "kedáy shwaay" },
          { p: "کېدی شوی", f: "kedáy shway" },
          { p: "کېدای شوی", f: "kedáay shway" },
        ],
        [
          { p: "کېدی شوای", f: "kedáy shwaay" },
          { p: "کېدی شوی", f: "kedáy shway" },
          { p: "کېدای شوی", f: "kedáay shway" },
        ],
      ],
      [
        [
          { p: "کېدی شوای", f: "kedáy shwaay" },
          { p: "کېدی شوی", f: "kedáy shway" },
          { p: "کېدای شوی", f: "kedáay shway" },
        ],
        [
          { p: "کېدی شوای", f: "kedáy shwaay" },
          { p: "کېدی شوی", f: "kedáy shway" },
          { p: "کېدای شوی", f: "kedáay shway" },
        ],
      ],
    ],
  },
};

const kawulStatOrDynImperfectivePassive: T.AspectContentPassive = {
  imperative: undefined,
  nonImperative: [
    [
      [{ p: "کول کېږم", f: "kawul kéGum" }],
      [{ p: "کول کېږو", f: "kawul kéGoo" }],
    ],
    [
      [{ p: "کول کېږم", f: "kawul kéGum" }],
      [{ p: "کول کېږو", f: "kawul kéGoo" }],
    ],
    [
      [{ p: "کول کېږې", f: "kawul kéGe" }],
      [{ p: "کول کېږئ", f: "kawul kéGey" }],
    ],
    [
      [{ p: "کول کېږې", f: "kawul kéGe" }],
      [{ p: "کول کېږئ", f: "kawul kéGey" }],
    ],
    [
      [{ p: "کول کېږي", f: "kawul kéGee" }],
      [{ p: "کول کېږي", f: "kawul kéGee" }],
    ],
    [
      [{ p: "کول کېږي", f: "kawul kéGee" }],
      [{ p: "کول کېږي", f: "kawul kéGee" }],
    ],
  ],
  future: [
    [
      [{ p: "به کول کېږم", f: "ba kawul kéGum" }],
      [{ p: "به کول کېږو", f: "ba kawul kéGoo" }],
    ],
    [
      [{ p: "به کول کېږم", f: "ba kawul kéGum" }],
      [{ p: "به کول کېږو", f: "ba kawul kéGoo" }],
    ],
    [
      [{ p: "به کول کېږې", f: "ba kawul kéGe" }],
      [{ p: "به کول کېږئ", f: "ba kawul kéGey" }],
    ],
    [
      [{ p: "به کول کېږې", f: "ba kawul kéGe" }],
      [{ p: "به کول کېږئ", f: "ba kawul kéGey" }],
    ],
    [
      [{ p: "به کول کېږي", f: "ba kawul kéGee" }],
      [{ p: "به کول کېږي", f: "ba kawul kéGee" }],
    ],
    [
      [{ p: "به کول کېږي", f: "ba kawul kéGee" }],
      [{ p: "به کول کېږي", f: "ba kawul kéGee" }],
    ],
  ],
  past: {
    short: [
      [
        [{ p: "کول کېدم", f: "kawul kedúm" }],
        [{ p: "کول کېدو", f: "kawul kedóo" }],
      ],
      [
        [{ p: "کول کېدم", f: "kawul kedúm" }],
        [{ p: "کول کېدو", f: "kawul kedóo" }],
      ],
      [
        [{ p: "کول کېدې", f: "kawul kedé" }],
        [{ p: "کول کېدئ", f: "kawul kedéy" }],
      ],
      [
        [{ p: "کول کېدې", f: "kawul kedé" }],
        [{ p: "کول کېدئ", f: "kawul kedéy" }],
      ],
      [
        [
          { p: "کول کېده", f: "kawul kedú" },
          { p: "کول کېدو", f: "kawul kedó" },
        ],
        [{ p: "کول کېدل", f: "kawul kedúl" }],
      ],
      [
        [{ p: "کول کېده", f: "kawul kedá" }],
        [{ p: "کول کېدې", f: "kawul kedé" }],
      ],
    ],
    long: [
      [
        [{ p: "کول کېدلم", f: "kawul kedúlum" }],
        [{ p: "کول کېدلو", f: "kawul kedúloo" }],
      ],
      [
        [{ p: "کول کېدلم", f: "kawul kedúlum" }],
        [{ p: "کول کېدلو", f: "kawul kedúloo" }],
      ],
      [
        [{ p: "کول کېدلې", f: "kawul kedúle" }],
        [{ p: "کول کېدلئ", f: "kawul kedúley" }],
      ],
      [
        [{ p: "کول کېدلې", f: "kawul kedúle" }],
        [{ p: "کول کېدلئ", f: "kawul kedúley" }],
      ],
      [
        [{ p: "کول کېدلو", f: "kawul kedúlo" }],
        [{ p: "کول کېدل", f: "kawul kedúl" }],
      ],
      [
        [{ p: "کول کېدله", f: "kawul kedúla" }],
        [{ p: "کول کېدلې", f: "kawul kedúle" }],
      ],
    ],
  },
  habitualPast: {
    short: [
      [
        [{ p: "به کول کېدم", f: "ba kawul kedúm" }],
        [{ p: "به کول کېدو", f: "ba kawul kedóo" }],
      ],
      [
        [{ p: "به کول کېدم", f: "ba kawul kedúm" }],
        [{ p: "به کول کېدو", f: "ba kawul kedóo" }],
      ],
      [
        [{ p: "به کول کېدې", f: "ba kawul kedé" }],
        [{ p: "به کول کېدئ", f: "ba kawul kedéy" }],
      ],
      [
        [{ p: "به کول کېدې", f: "ba kawul kedé" }],
        [{ p: "به کول کېدئ", f: "ba kawul kedéy" }],
      ],
      [
        [
          { p: "به کول کېده", f: "ba kawul kedú" },
          { p: "به کول کېدو", f: "ba kawul kedó" },
        ],
        [{ p: "به کول کېدل", f: "ba kawul kedúl" }],
      ],
      [
        [{ p: "به کول کېده", f: "ba kawul kedá" }],
        [{ p: "به کول کېدې", f: "ba kawul kedé" }],
      ],
    ],
    long: [
      [
        [{ p: "به کول کېدلم", f: "ba kawul kedúlum" }],
        [{ p: "به کول کېدلو", f: "ba kawul kedúloo" }],
      ],
      [
        [{ p: "به کول کېدلم", f: "ba kawul kedúlum" }],
        [{ p: "به کول کېدلو", f: "ba kawul kedúloo" }],
      ],
      [
        [{ p: "به کول کېدلې", f: "ba kawul kedúle" }],
        [{ p: "به کول کېدلئ", f: "ba kawul kedúley" }],
      ],
      [
        [{ p: "به کول کېدلې", f: "ba kawul kedúle" }],
        [{ p: "به کول کېدلئ", f: "ba kawul kedúley" }],
      ],
      [
        [{ p: "به کول کېدلو", f: "ba kawul kedúlo" }],
        [{ p: "به کول کېدل", f: "ba kawul kedúl" }],
      ],
      [
        [{ p: "به کول کېدله", f: "ba kawul kedúla" }],
        [{ p: "به کول کېدلې", f: "ba kawul kedúle" }],
      ],
    ],
  },
  modal: {
    nonImperative: {
      long: [
        [
          [
            { p: "کول کېدلی شم", f: "kawul kedúlay shum" },
            { p: "کول کېدلای شم", f: "kawul kedúlaay shum" },
          ],
          [
            { p: "کول کېدلی شو", f: "kawul kedúlay shoo" },
            { p: "کول کېدلای شو", f: "kawul kedúlaay shoo" },
          ],
        ],
        [
          [
            { p: "کول کېدلی شم", f: "kawul kedúlay shum" },
            { p: "کول کېدلای شم", f: "kawul kedúlaay shum" },
          ],
          [
            { p: "کول کېدلی شو", f: "kawul kedúlay shoo" },
            { p: "کول کېدلای شو", f: "kawul kedúlaay shoo" },
          ],
        ],
        [
          [
            { p: "کول کېدلی شې", f: "kawul kedúlay she" },
            { p: "کول کېدلای شې", f: "kawul kedúlaay she" },
          ],
          [
            { p: "کول کېدلی شئ", f: "kawul kedúlay shey" },
            { p: "کول کېدلای شئ", f: "kawul kedúlaay shey" },
          ],
        ],
        [
          [
            { p: "کول کېدلی شې", f: "kawul kedúlay she" },
            { p: "کول کېدلای شې", f: "kawul kedúlaay she" },
          ],
          [
            { p: "کول کېدلی شئ", f: "kawul kedúlay shey" },
            { p: "کول کېدلای شئ", f: "kawul kedúlaay shey" },
          ],
        ],
        [
          [
            { p: "کول کېدلی شي", f: "kawul kedúlay shee" },
            { p: "کول کېدلای شي", f: "kawul kedúlaay shee" },
          ],
          [
            { p: "کول کېدلی شي", f: "kawul kedúlay shee" },
            { p: "کول کېدلای شي", f: "kawul kedúlaay shee" },
          ],
        ],
        [
          [
            { p: "کول کېدلی شي", f: "kawul kedúlay shee" },
            { p: "کول کېدلای شي", f: "kawul kedúlaay shee" },
          ],
          [
            { p: "کول کېدلی شي", f: "kawul kedúlay shee" },
            { p: "کول کېدلای شي", f: "kawul kedúlaay shee" },
          ],
        ],
      ],
      short: [
        [
          [
            { p: "کول کېدی شم", f: "kawul kedáy shum" },
            { p: "کول کېدای شم", f: "kawul kedáay shum" },
          ],
          [
            { p: "کول کېدی شو", f: "kawul kedáy shoo" },
            { p: "کول کېدای شو", f: "kawul kedáay shoo" },
          ],
        ],
        [
          [
            { p: "کول کېدی شم", f: "kawul kedáy shum" },
            { p: "کول کېدای شم", f: "kawul kedáay shum" },
          ],
          [
            { p: "کول کېدی شو", f: "kawul kedáy shoo" },
            { p: "کول کېدای شو", f: "kawul kedáay shoo" },
          ],
        ],
        [
          [
            { p: "کول کېدی شې", f: "kawul kedáy she" },
            { p: "کول کېدای شې", f: "kawul kedáay she" },
          ],
          [
            { p: "کول کېدی شئ", f: "kawul kedáy shey" },
            { p: "کول کېدای شئ", f: "kawul kedáay shey" },
          ],
        ],
        [
          [
            { p: "کول کېدی شې", f: "kawul kedáy she" },
            { p: "کول کېدای شې", f: "kawul kedáay she" },
          ],
          [
            { p: "کول کېدی شئ", f: "kawul kedáy shey" },
            { p: "کول کېدای شئ", f: "kawul kedáay shey" },
          ],
        ],
        [
          [
            { p: "کول کېدی شي", f: "kawul kedáy shee" },
            { p: "کول کېدای شي", f: "kawul kedáay shee" },
          ],
          [
            { p: "کول کېدی شي", f: "kawul kedáy shee" },
            { p: "کول کېدای شي", f: "kawul kedáay shee" },
          ],
        ],
        [
          [
            { p: "کول کېدی شي", f: "kawul kedáy shee" },
            { p: "کول کېدای شي", f: "kawul kedáay shee" },
          ],
          [
            { p: "کول کېدی شي", f: "kawul kedáy shee" },
            { p: "کول کېدای شي", f: "kawul kedáay shee" },
          ],
        ],
      ],
    },
    future: {
      long: [
        [
          [
            { p: "به کول کېدلی شم", f: "ba kawul kedúlay shum" },
            { p: "به کول کېدلای شم", f: "ba kawul kedúlaay shum" },
          ],
          [
            { p: "به کول کېدلی شو", f: "ba kawul kedúlay shoo" },
            { p: "به کول کېدلای شو", f: "ba kawul kedúlaay shoo" },
          ],
        ],
        [
          [
            { p: "به کول کېدلی شم", f: "ba kawul kedúlay shum" },
            { p: "به کول کېدلای شم", f: "ba kawul kedúlaay shum" },
          ],
          [
            { p: "به کول کېدلی شو", f: "ba kawul kedúlay shoo" },
            { p: "به کول کېدلای شو", f: "ba kawul kedúlaay shoo" },
          ],
        ],
        [
          [
            { p: "به کول کېدلی شې", f: "ba kawul kedúlay she" },
            { p: "به کول کېدلای شې", f: "ba kawul kedúlaay she" },
          ],
          [
            { p: "به کول کېدلی شئ", f: "ba kawul kedúlay shey" },
            { p: "به کول کېدلای شئ", f: "ba kawul kedúlaay shey" },
          ],
        ],
        [
          [
            { p: "به کول کېدلی شې", f: "ba kawul kedúlay she" },
            { p: "به کول کېدلای شې", f: "ba kawul kedúlaay she" },
          ],
          [
            { p: "به کول کېدلی شئ", f: "ba kawul kedúlay shey" },
            { p: "به کول کېدلای شئ", f: "ba kawul kedúlaay shey" },
          ],
        ],
        [
          [
            { p: "به کول کېدلی شي", f: "ba kawul kedúlay shee" },
            { p: "به کول کېدلای شي", f: "ba kawul kedúlaay shee" },
          ],
          [
            { p: "به کول کېدلی شي", f: "ba kawul kedúlay shee" },
            { p: "به کول کېدلای شي", f: "ba kawul kedúlaay shee" },
          ],
        ],
        [
          [
            { p: "به کول کېدلی شي", f: "ba kawul kedúlay shee" },
            { p: "به کول کېدلای شي", f: "ba kawul kedúlaay shee" },
          ],
          [
            { p: "به کول کېدلی شي", f: "ba kawul kedúlay shee" },
            { p: "به کول کېدلای شي", f: "ba kawul kedúlaay shee" },
          ],
        ],
      ],
      short: [
        [
          [
            { p: "به کول کېدی شم", f: "ba kawul kedáy shum" },
            { p: "به کول کېدای شم", f: "ba kawul kedáay shum" },
          ],
          [
            { p: "به کول کېدی شو", f: "ba kawul kedáy shoo" },
            { p: "به کول کېدای شو", f: "ba kawul kedáay shoo" },
          ],
        ],
        [
          [
            { p: "به کول کېدی شم", f: "ba kawul kedáy shum" },
            { p: "به کول کېدای شم", f: "ba kawul kedáay shum" },
          ],
          [
            { p: "به کول کېدی شو", f: "ba kawul kedáy shoo" },
            { p: "به کول کېدای شو", f: "ba kawul kedáay shoo" },
          ],
        ],
        [
          [
            { p: "به کول کېدی شې", f: "ba kawul kedáy she" },
            { p: "به کول کېدای شې", f: "ba kawul kedáay she" },
          ],
          [
            { p: "به کول کېدی شئ", f: "ba kawul kedáy shey" },
            { p: "به کول کېدای شئ", f: "ba kawul kedáay shey" },
          ],
        ],
        [
          [
            { p: "به کول کېدی شې", f: "ba kawul kedáy she" },
            { p: "به کول کېدای شې", f: "ba kawul kedáay she" },
          ],
          [
            { p: "به کول کېدی شئ", f: "ba kawul kedáy shey" },
            { p: "به کول کېدای شئ", f: "ba kawul kedáay shey" },
          ],
        ],
        [
          [
            { p: "به کول کېدی شي", f: "ba kawul kedáy shee" },
            { p: "به کول کېدای شي", f: "ba kawul kedáay shee" },
          ],
          [
            { p: "به کول کېدی شي", f: "ba kawul kedáy shee" },
            { p: "به کول کېدای شي", f: "ba kawul kedáay shee" },
          ],
        ],
        [
          [
            { p: "به کول کېدی شي", f: "ba kawul kedáy shee" },
            { p: "به کول کېدای شي", f: "ba kawul kedáay shee" },
          ],
          [
            { p: "به کول کېدی شي", f: "ba kawul kedáy shee" },
            { p: "به کول کېدای شي", f: "ba kawul kedáay shee" },
          ],
        ],
      ],
    },
    past: {
      long: [
        [
          [
            { p: "کول کېدلی شوم", f: "kawul kedúlay shwum" },
            { p: "کول کېدلای شوم", f: "kawul kedúlaay shwum" },
          ],
          [
            { p: "کول کېدلی شو", f: "kawul kedúlay shoo" },
            { p: "کول کېدلای شو", f: "kawul kedúlaay shoo" },
          ],
        ],
        [
          [
            { p: "کول کېدلی شوم", f: "kawul kedúlay shwum" },
            { p: "کول کېدلای شوم", f: "kawul kedúlaay shwum" },
          ],
          [
            { p: "کول کېدلی شو", f: "kawul kedúlay shoo" },
            { p: "کول کېدلای شو", f: "kawul kedúlaay shoo" },
          ],
        ],
        [
          [
            { p: "کول کېدلی شوې", f: "kawul kedúlay shwe" },
            { p: "کول کېدلای شوې", f: "kawul kedúlaay shwe" },
          ],
          [
            { p: "کول کېدلی شوئ", f: "kawul kedúlay shwey" },
            { p: "کول کېدلای شوئ", f: "kawul kedúlaay shwey" },
          ],
        ],
        [
          [
            { p: "کول کېدلی شوې", f: "kawul kedúlay shwe" },
            { p: "کول کېدلای شوې", f: "kawul kedúlaay shwe" },
          ],
          [
            { p: "کول کېدلی شوئ", f: "kawul kedúlay shwey" },
            { p: "کول کېدلای شوئ", f: "kawul kedúlaay shwey" },
          ],
        ],
        [
          [
            { p: "کول کېدلی شو", f: "kawul kedúlay sho" },
            { p: "کول کېدلای شو", f: "kawul kedúlaay sho" },
          ],
          [
            { p: "کول کېدلی شول", f: "kawul kedúlay shwul" },
            { p: "کول کېدلای شول", f: "kawul kedúlaay shwul" },
            { p: "کول کېدلی شو", f: "kawul kedúlay shoo" },
            { p: "کول کېدلای شو", f: "kawul kedúlaay shoo" },
          ],
        ],
        [
          [
            { p: "کول کېدلی شوه", f: "kawul kedúlay shwa" },
            { p: "کول کېدلای شوه", f: "kawul kedúlaay shwa" },
          ],
          [
            { p: "کول کېدلی شولې", f: "kawul kedúlay shwule" },
            { p: "کول کېدلای شولې", f: "kawul kedúlaay shwule" },
            { p: "کول کېدلی شوې", f: "kawul kedúlay shwe" },
            { p: "کول کېدلای شوې", f: "kawul kedúlaay shwe" },
          ],
        ],
      ],
      short: [
        [
          [
            { p: "کول کېدی شوم", f: "kawul kedáy shwum" },
            { p: "کول کېدای شوم", f: "kawul kedáay shwum" },
          ],
          [
            { p: "کول کېدی شو", f: "kawul kedáy shoo" },
            { p: "کول کېدای شو", f: "kawul kedáay shoo" },
          ],
        ],
        [
          [
            { p: "کول کېدی شوم", f: "kawul kedáy shwum" },
            { p: "کول کېدای شوم", f: "kawul kedáay shwum" },
          ],
          [
            { p: "کول کېدی شو", f: "kawul kedáy shoo" },
            { p: "کول کېدای شو", f: "kawul kedáay shoo" },
          ],
        ],
        [
          [
            { p: "کول کېدی شوې", f: "kawul kedáy shwe" },
            { p: "کول کېدای شوې", f: "kawul kedáay shwe" },
          ],
          [
            { p: "کول کېدی شوئ", f: "kawul kedáy shwey" },
            { p: "کول کېدای شوئ", f: "kawul kedáay shwey" },
          ],
        ],
        [
          [
            { p: "کول کېدی شوې", f: "kawul kedáy shwe" },
            { p: "کول کېدای شوې", f: "kawul kedáay shwe" },
          ],
          [
            { p: "کول کېدی شوئ", f: "kawul kedáy shwey" },
            { p: "کول کېدای شوئ", f: "kawul kedáay shwey" },
          ],
        ],
        [
          [
            { p: "کول کېدی شو", f: "kawul kedáy sho" },
            { p: "کول کېدای شو", f: "kawul kedáay sho" },
          ],
          [
            { p: "کول کېدی شول", f: "kawul kedáy shwul" },
            { p: "کول کېدای شول", f: "kawul kedáay shwul" },
            { p: "کول کېدی شو", f: "kawul kedáy shoo" },
            { p: "کول کېدای شو", f: "kawul kedáay shoo" },
          ],
        ],
        [
          [
            { p: "کول کېدی شوه", f: "kawul kedáy shwa" },
            { p: "کول کېدای شوه", f: "kawul kedáay shwa" },
          ],
          [
            { p: "کول کېدی شولې", f: "kawul kedáy shwule" },
            { p: "کول کېدای شولې", f: "kawul kedáay shwule" },
            { p: "کول کېدی شوې", f: "kawul kedáy shwe" },
            { p: "کول کېدای شوې", f: "kawul kedáay shwe" },
          ],
        ],
      ],
    },
    habitualPast: {
      long: [
        [
          [
            { p: "به کول کېدلی شوم", f: "ba kawul kedúlay shwum" },
            { p: "به کول کېدلای شوم", f: "ba kawul kedúlaay shwum" },
          ],
          [
            { p: "به کول کېدلی شو", f: "ba kawul kedúlay shoo" },
            { p: "به کول کېدلای شو", f: "ba kawul kedúlaay shoo" },
          ],
        ],
        [
          [
            { p: "به کول کېدلی شوم", f: "ba kawul kedúlay shwum" },
            { p: "به کول کېدلای شوم", f: "ba kawul kedúlaay shwum" },
          ],
          [
            { p: "به کول کېدلی شو", f: "ba kawul kedúlay shoo" },
            { p: "به کول کېدلای شو", f: "ba kawul kedúlaay shoo" },
          ],
        ],
        [
          [
            { p: "به کول کېدلی شوې", f: "ba kawul kedúlay shwe" },
            { p: "به کول کېدلای شوې", f: "ba kawul kedúlaay shwe" },
          ],
          [
            { p: "به کول کېدلی شوئ", f: "ba kawul kedúlay shwey" },
            { p: "به کول کېدلای شوئ", f: "ba kawul kedúlaay shwey" },
          ],
        ],
        [
          [
            { p: "به کول کېدلی شوې", f: "ba kawul kedúlay shwe" },
            { p: "به کول کېدلای شوې", f: "ba kawul kedúlaay shwe" },
          ],
          [
            { p: "به کول کېدلی شوئ", f: "ba kawul kedúlay shwey" },
            { p: "به کول کېدلای شوئ", f: "ba kawul kedúlaay shwey" },
          ],
        ],
        [
          [
            { p: "به کول کېدلی شو", f: "ba kawul kedúlay sho" },
            { p: "به کول کېدلای شو", f: "ba kawul kedúlaay sho" },
          ],
          [
            { p: "به کول کېدلی شول", f: "ba kawul kedúlay shwul" },
            { p: "به کول کېدلای شول", f: "ba kawul kedúlaay shwul" },
            { p: "به کول کېدلی شو", f: "ba kawul kedúlay shoo" },
            { p: "به کول کېدلای شو", f: "ba kawul kedúlaay shoo" },
          ],
        ],
        [
          [
            { p: "به کول کېدلی شوه", f: "ba kawul kedúlay shwa" },
            { p: "به کول کېدلای شوه", f: "ba kawul kedúlaay shwa" },
          ],
          [
            { p: "به کول کېدلی شولې", f: "ba kawul kedúlay shwule" },
            { p: "به کول کېدلای شولې", f: "ba kawul kedúlaay shwule" },
            { p: "به کول کېدلی شوې", f: "ba kawul kedúlay shwe" },
            { p: "به کول کېدلای شوې", f: "ba kawul kedúlaay shwe" },
          ],
        ],
      ],
      short: [
        [
          [
            { p: "به کول کېدی شوم", f: "ba kawul kedáy shwum" },
            { p: "به کول کېدای شوم", f: "ba kawul kedáay shwum" },
          ],
          [
            { p: "به کول کېدی شو", f: "ba kawul kedáy shoo" },
            { p: "به کول کېدای شو", f: "ba kawul kedáay shoo" },
          ],
        ],
        [
          [
            { p: "به کول کېدی شوم", f: "ba kawul kedáy shwum" },
            { p: "به کول کېدای شوم", f: "ba kawul kedáay shwum" },
          ],
          [
            { p: "به کول کېدی شو", f: "ba kawul kedáy shoo" },
            { p: "به کول کېدای شو", f: "ba kawul kedáay shoo" },
          ],
        ],
        [
          [
            { p: "به کول کېدی شوې", f: "ba kawul kedáy shwe" },
            { p: "به کول کېدای شوې", f: "ba kawul kedáay shwe" },
          ],
          [
            { p: "به کول کېدی شوئ", f: "ba kawul kedáy shwey" },
            { p: "به کول کېدای شوئ", f: "ba kawul kedáay shwey" },
          ],
        ],
        [
          [
            { p: "به کول کېدی شوې", f: "ba kawul kedáy shwe" },
            { p: "به کول کېدای شوې", f: "ba kawul kedáay shwe" },
          ],
          [
            { p: "به کول کېدی شوئ", f: "ba kawul kedáy shwey" },
            { p: "به کول کېدای شوئ", f: "ba kawul kedáay shwey" },
          ],
        ],
        [
          [
            { p: "به کول کېدی شو", f: "ba kawul kedáy sho" },
            { p: "به کول کېدای شو", f: "ba kawul kedáay sho" },
          ],
          [
            { p: "به کول کېدی شول", f: "ba kawul kedáy shwul" },
            { p: "به کول کېدای شول", f: "ba kawul kedáay shwul" },
            { p: "به کول کېدی شو", f: "ba kawul kedáy shoo" },
            { p: "به کول کېدای شو", f: "ba kawul kedáay shoo" },
          ],
        ],
        [
          [
            { p: "به کول کېدی شوه", f: "ba kawul kedáy shwa" },
            { p: "به کول کېدای شوه", f: "ba kawul kedáay shwa" },
          ],
          [
            { p: "به کول کېدی شولې", f: "ba kawul kedáy shwule" },
            { p: "به کول کېدای شولې", f: "ba kawul kedáay shwule" },
            { p: "به کول کېدی شوې", f: "ba kawul kedáy shwe" },
            { p: "به کول کېدای شوې", f: "ba kawul kedáay shwe" },
          ],
        ],
      ],
    },
    hypotheticalPast: {
      long: [
        [
          [
            { p: "کول کېدلی شوای", f: "kawul kedúlay shwaay" },
            { p: "کول کېدلی شوی", f: "kawul kedúlay shway" },
            { p: "کول کېدلای شوای", f: "kawul kedúlaay shwaay" },
          ],
          [
            { p: "کول کېدلی شوای", f: "kawul kedúlay shwaay" },
            { p: "کول کېدلی شوی", f: "kawul kedúlay shway" },
            { p: "کول کېدای شوی", f: "kawul kedúlaay shway" },
          ],
        ],
        [
          [
            { p: "کول کېدلی شوای", f: "kawul kedúlay shwaay" },
            { p: "کول کېدلی شوی", f: "kawul kedúlay shway" },
            { p: "کول کېدلای شوای", f: "kawul kedúlaay shwaay" },
          ],
          [
            { p: "کول کېدلی شوای", f: "kawul kedúlay shwaay" },
            { p: "کول کېدلی شوی", f: "kawul kedúlay shway" },
            { p: "کول کېدای شوی", f: "kawul kedúlaay shway" },
          ],
        ],
        [
          [
            { p: "کول کېدلی شوای", f: "kawul kedúlay shwaay" },
            { p: "کول کېدلی شوی", f: "kawul kedúlay shway" },
            { p: "کول کېدلای شوای", f: "kawul kedúlaay shwaay" },
          ],
          [
            { p: "کول کېدلی شوای", f: "kawul kedúlay shwaay" },
            { p: "کول کېدلی شوی", f: "kawul kedúlay shway" },
            { p: "کول کېدای شوی", f: "kawul kedúlaay shway" },
          ],
        ],
        [
          [
            { p: "کول کېدلی شوای", f: "kawul kedúlay shwaay" },
            { p: "کول کېدلی شوی", f: "kawul kedúlay shway" },
            { p: "کول کېدلای شوای", f: "kawul kedúlaay shwaay" },
          ],
          [
            { p: "کول کېدلی شوای", f: "kawul kedúlay shwaay" },
            { p: "کول کېدلی شوی", f: "kawul kedúlay shway" },
            { p: "کول کېدای شوی", f: "kawul kedúlaay shway" },
          ],
        ],
        [
          [
            { p: "کول کېدلی شوای", f: "kawul kedúlay shwaay" },
            { p: "کول کېدلی شوی", f: "kawul kedúlay shway" },
            { p: "کول کېدلای شوای", f: "kawul kedúlaay shwaay" },
          ],
          [
            { p: "کول کېدلی شوای", f: "kawul kedúlay shwaay" },
            { p: "کول کېدلی شوی", f: "kawul kedúlay shway" },
            { p: "کول کېدای شوی", f: "kawul kedúlaay shway" },
          ],
        ],
        [
          [
            { p: "کول کېدلی شوای", f: "kawul kedúlay shwaay" },
            { p: "کول کېدلی شوی", f: "kawul kedúlay shway" },
            { p: "کول کېدلای شوای", f: "kawul kedúlaay shwaay" },
          ],
          [
            { p: "کول کېدلی شوای", f: "kawul kedúlay shwaay" },
            { p: "کول کېدلی شوی", f: "kawul kedúlay shway" },
            { p: "کول کېدای شوی", f: "kawul kedúlaay shway" },
          ],
        ],
      ],
      short: [
        [
          [
            { p: "کول کېدی شوای", f: "kawul kedáy shwaay" },
            { p: "کول کېدی شوی", f: "kawul kedáy shway" },
            { p: "کول کېدای شوی", f: "kawul kedáay shway" },
          ],
          [
            { p: "کول کېدی شوای", f: "kawul kedáy shwaay" },
            { p: "کول کېدی شوی", f: "kawul kedáy shway" },
            { p: "کول کېدای شوی", f: "kawul kedáay shway" },
          ],
        ],
        [
          [
            { p: "کول کېدی شوای", f: "kawul kedáy shwaay" },
            { p: "کول کېدی شوی", f: "kawul kedáy shway" },
            { p: "کول کېدای شوی", f: "kawul kedáay shway" },
          ],
          [
            { p: "کول کېدی شوای", f: "kawul kedáy shwaay" },
            { p: "کول کېدی شوی", f: "kawul kedáy shway" },
            { p: "کول کېدای شوی", f: "kawul kedáay shway" },
          ],
        ],
        [
          [
            { p: "کول کېدی شوای", f: "kawul kedáy shwaay" },
            { p: "کول کېدی شوی", f: "kawul kedáy shway" },
            { p: "کول کېدای شوی", f: "kawul kedáay shway" },
          ],
          [
            { p: "کول کېدی شوای", f: "kawul kedáy shwaay" },
            { p: "کول کېدی شوی", f: "kawul kedáy shway" },
            { p: "کول کېدای شوی", f: "kawul kedáay shway" },
          ],
        ],
        [
          [
            { p: "کول کېدی شوای", f: "kawul kedáy shwaay" },
            { p: "کول کېدی شوی", f: "kawul kedáy shway" },
            { p: "کول کېدای شوی", f: "kawul kedáay shway" },
          ],
          [
            { p: "کول کېدی شوای", f: "kawul kedáy shwaay" },
            { p: "کول کېدی شوی", f: "kawul kedáy shway" },
            { p: "کول کېدای شوی", f: "kawul kedáay shway" },
          ],
        ],
        [
          [
            { p: "کول کېدی شوای", f: "kawul kedáy shwaay" },
            { p: "کول کېدی شوی", f: "kawul kedáy shway" },
            { p: "کول کېدای شوی", f: "kawul kedáay shway" },
          ],
          [
            { p: "کول کېدی شوای", f: "kawul kedáy shwaay" },
            { p: "کول کېدی شوی", f: "kawul kedáy shway" },
            { p: "کول کېدای شوی", f: "kawul kedáay shway" },
          ],
        ],
        [
          [
            { p: "کول کېدی شوای", f: "kawul kedáy shwaay" },
            { p: "کول کېدی شوی", f: "kawul kedáy shway" },
            { p: "کول کېدای شوی", f: "kawul kedáay shway" },
          ],
          [
            { p: "کول کېدی شوای", f: "kawul kedáy shwaay" },
            { p: "کول کېدی شوی", f: "kawul kedáy shway" },
            { p: "کول کېدای شوی", f: "kawul kedáay shway" },
          ],
        ],
      ],
    },
  },
};

const kawulPerfectPassive: T.PerfectContent = {
  halfPerfect: [
    [
      [{ p: "کړی شوی", f: "kúRay shúway" }],
      [{ p: "کړي شوي", f: "kúRee shúwee" }],
    ],
    [[{ p: "کړې شوې", f: "kúRe shúwe" }], [{ p: "کړې شوې", f: "kúRe shúwe" }]],
    [
      [{ p: "کړی شوی", f: "kúRay shúway" }],
      [{ p: "کړي شوي", f: "kúRee shúwee" }],
    ],
    [[{ p: "کړې شوې", f: "kúRe shúwe" }], [{ p: "کړې شوې", f: "kúRe shúwe" }]],
    [
      [{ p: "کړی شوی", f: "kúRay shúway" }],
      [{ p: "کړي شوي", f: "kúRee shúwee" }],
    ],
    [[{ p: "کړې شوې", f: "kúRe shúwe" }], [{ p: "کړې شوې", f: "kúRe shúwe" }]],
  ],
  past: [
    [
      [{ p: "کړی شوی وم", f: "kúRay shúway wum" }],
      [{ p: "کړي شوي وو", f: "kúRee shúwee woo" }],
    ],
    [
      [{ p: "کړې شوې وم", f: "kúRe shúwe wum" }],
      [{ p: "کړې شوې وو", f: "kúRe shúwe woo" }],
    ],
    [
      [{ p: "کړی شوی وې", f: "kúRay shúway we" }],
      [{ p: "کړي شوي وئ", f: "kúRee shúwee wey" }],
    ],
    [
      [{ p: "کړې شوې وې", f: "kúRe shúwe we" }],
      [{ p: "کړې شوې وئ", f: "kúRe shúwe wey" }],
    ],
    [
      [{ p: "کړی شوی و", f: "kúRay shúway wo" }],
      [{ p: "کړي شوي وو", f: "kúRee shúwee woo" }],
    ],
    [
      [{ p: "کړې شوې وه", f: "kúRe shúwe wa" }],
      [{ p: "کړې شوې وې", f: "kúRe shúwe we" }],
    ],
  ],
  present: [
    [
      [{ p: "کړی شوی یم", f: "kúRay shúway yum" }],
      [{ p: "کړي شوي یو", f: "kúRee shúwee yoo" }],
    ],
    [
      [{ p: "کړې شوې یم", f: "kúRe shúwe yum" }],
      [{ p: "کړې شوې یو", f: "kúRe shúwe yoo" }],
    ],
    [
      [{ p: "کړی شوی یې", f: "kúRay shúway ye" }],
      [{ p: "کړي شوي یئ", f: "kúRee shúwee yey" }],
    ],
    [
      [{ p: "کړې شوې یې", f: "kúRe shúwe ye" }],
      [{ p: "کړې شوې یئ", f: "kúRe shúwe yey" }],
    ],
    [
      [{ p: "کړی شوی دی", f: "kúRay shúway day" }],
      [{ p: "کړي شوي دي", f: "kúRee shúwee dee" }],
    ],
    [
      [{ p: "کړې شوې ده", f: "kúRe shúwe da" }],
      [{ p: "کړې شوې دي", f: "kúRe shúwe dee" }],
    ],
  ],
  habitual: [
    [
      [{ p: "کړی شوی یم", f: "kúRay shúway yum" }],
      [{ p: "کړي شوي یو", f: "kúRee shúwee yoo" }],
    ],
    [
      [{ p: "کړې شوې یم", f: "kúRe shúwe yum" }],
      [{ p: "کړې شوې یو", f: "kúRe shúwe yoo" }],
    ],
    [
      [{ p: "کړی شوی یې", f: "kúRay shúway ye" }],
      [{ p: "کړي شوي یئ", f: "kúRee shúwee yey" }],
    ],
    [
      [{ p: "کړې شوې یې", f: "kúRe shúwe ye" }],
      [{ p: "کړې شوې یئ", f: "kúRe shúwe yey" }],
    ],
    [
      [{ p: "کړی شوی وي", f: "kúRay shúway wee" }],
      [{ p: "کړي شوي وي", f: "kúRee shúwee wee" }],
    ],
    [
      [{ p: "کړې شوې وي", f: "kúRe shúwe wee" }],
      [{ p: "کړې شوې وي", f: "kúRe shúwe wee" }],
    ],
  ],
  subjunctive: [
    [
      [{ p: "کړی شوی وم", f: "kúRay shúway wum" }],
      [{ p: "کړي شوي وو", f: "kúRee shúwee woo" }],
    ],
    [
      [{ p: "کړې شوې وم", f: "kúRe shúwe wum" }],
      [{ p: "کړې شوې وو", f: "kúRe shúwe woo" }],
    ],
    [
      [{ p: "کړی شوی وې", f: "kúRay shúway we" }],
      [{ p: "کړي شوي وئ", f: "kúRee shúwee wey" }],
    ],
    [
      [{ p: "کړې شوې وې", f: "kúRe shúwe we" }],
      [{ p: "کړې شوې وئ", f: "kúRe shúwe wey" }],
    ],
    [
      [{ p: "کړی شوی وي", f: "kúRay shúway wee" }],
      [{ p: "کړي شوي وي", f: "kúRee shúwee wee" }],
    ],
    [
      [{ p: "کړې شوې وي", f: "kúRe shúwe wee" }],
      [{ p: "کړې شوې وي", f: "kúRe shúwe wee" }],
    ],
  ],
  future: [
    [
      [{ p: "به کړی شوی یم", f: "ba kúRay shúway yum" }],
      [{ p: "به کړي شوي یو", f: "ba kúRee shúwee yoo" }],
    ],
    [
      [{ p: "به کړې شوې یم", f: "ba kúRe shúwe yum" }],
      [{ p: "به کړې شوې یو", f: "ba kúRe shúwe yoo" }],
    ],
    [
      [{ p: "به کړی شوی یې", f: "ba kúRay shúway ye" }],
      [{ p: "به کړي شوي یئ", f: "ba kúRee shúwee yey" }],
    ],
    [
      [{ p: "به کړې شوې یې", f: "ba kúRe shúwe ye" }],
      [{ p: "به کړې شوې یئ", f: "ba kúRe shúwe yey" }],
    ],
    [
      [{ p: "به کړی شوی وي", f: "ba kúRay shúway wee" }],
      [{ p: "به کړي شوي وي", f: "ba kúRee shúwee wee" }],
    ],
    [
      [{ p: "به کړې شوې وي", f: "ba kúRe shúwe wee" }],
      [{ p: "به کړې شوې وي", f: "ba kúRe shúwe wee" }],
    ],
  ],
  wouldBe: [
    [
      [{ p: "به کړی شوی وم", f: "ba kúRay shúway wum" }],
      [{ p: "به کړي شوي وو", f: "ba kúRee shúwee woo" }],
    ],
    [
      [{ p: "به کړې شوې وم", f: "ba kúRe shúwe wum" }],
      [{ p: "به کړې شوې وو", f: "ba kúRe shúwe woo" }],
    ],
    [
      [{ p: "به کړی شوی وې", f: "ba kúRay shúway we" }],
      [{ p: "به کړي شوي وئ", f: "ba kúRee shúwee wey" }],
    ],
    [
      [{ p: "به کړې شوې وې", f: "ba kúRe shúwe we" }],
      [{ p: "به کړې شوې وئ", f: "ba kúRe shúwe wey" }],
    ],
    [
      [{ p: "به کړی شوی و", f: "ba kúRay shúway wo" }],
      [{ p: "به کړي شوي وو", f: "ba kúRee shúwee woo" }],
    ],
    [
      [{ p: "به کړې شوې وه", f: "ba kúRe shúwe wa" }],
      [{ p: "به کړې شوې وې", f: "ba kúRe shúwe we" }],
    ],
  ],
  pastSubjunctive: [
    [
      [
        { p: "کړی شوی وای", f: "kúRay shúway waay" },
        { p: "کړی شوی وی", f: "kúRay shúway way" },
      ],
      [
        { p: "کړي شوي وای", f: "kúRee shúwee waay" },
        { p: "کړي شوي وی", f: "kúRee shúwee way" },
      ],
    ],
    [
      [
        { p: "کړې شوې وای", f: "kúRe shúwe waay" },
        { p: "کړې شوې وی", f: "kúRe shúwe way" },
      ],
      [
        { p: "کړې شوې وای", f: "kúRe shúwe waay" },
        { p: "کړې شوې وی", f: "kúRe shúwe way" },
      ],
    ],
    [
      [
        { p: "کړی شوی وای", f: "kúRay shúway waay" },
        { p: "کړی شوی وی", f: "kúRay shúway way" },
      ],
      [
        { p: "کړي شوي وای", f: "kúRee shúwee waay" },
        { p: "کړي شوي وی", f: "kúRee shúwee way" },
      ],
    ],
    [
      [
        { p: "کړې شوې وای", f: "kúRe shúwe waay" },
        { p: "کړې شوې وی", f: "kúRe shúwe way" },
      ],
      [
        { p: "کړې شوې وای", f: "kúRe shúwe waay" },
        { p: "کړې شوې وی", f: "kúRe shúwe way" },
      ],
    ],
    [
      [
        { p: "کړی شوی وای", f: "kúRay shúway waay" },
        { p: "کړی شوی وی", f: "kúRay shúway way" },
      ],
      [
        { p: "کړي شوي وای", f: "kúRee shúwee waay" },
        { p: "کړي شوي وی", f: "kúRee shúwee way" },
      ],
    ],
    [
      [
        { p: "کړې شوې وای", f: "kúRe shúwe waay" },
        { p: "کړې شوې وی", f: "kúRe shúwe way" },
      ],
      [
        { p: "کړې شوې وای", f: "kúRe shúwe waay" },
        { p: "کړې شوې وی", f: "kúRe shúwe way" },
      ],
    ],
  ],
  wouldHaveBeen: [
    [
      [
        { p: "به کړی شوی وای", f: "ba kúRay shúway waay" },
        { p: "به کړی شوی وی", f: "ba kúRay shúway way" },
      ],
      [
        { p: "به کړي شوي وای", f: "ba kúRee shúwee waay" },
        { p: "به کړي شوي وی", f: "ba kúRee shúwee way" },
      ],
    ],
    [
      [
        { p: "به کړې شوې وای", f: "ba kúRe shúwe waay" },
        { p: "به کړې شوې وی", f: "ba kúRe shúwe way" },
      ],
      [
        { p: "به کړې شوې وای", f: "ba kúRe shúwe waay" },
        { p: "به کړې شوې وی", f: "ba kúRe shúwe way" },
      ],
    ],
    [
      [
        { p: "به کړی شوی وای", f: "ba kúRay shúway waay" },
        { p: "به کړی شوی وی", f: "ba kúRay shúway way" },
      ],
      [
        { p: "به کړي شوي وای", f: "ba kúRee shúwee waay" },
        { p: "به کړي شوي وی", f: "ba kúRee shúwee way" },
      ],
    ],
    [
      [
        { p: "به کړې شوې وای", f: "ba kúRe shúwe waay" },
        { p: "به کړې شوې وی", f: "ba kúRe shúwe way" },
      ],
      [
        { p: "به کړې شوې وای", f: "ba kúRe shúwe waay" },
        { p: "به کړې شوې وی", f: "ba kúRe shúwe way" },
      ],
    ],
    [
      [
        { p: "به کړی شوی وای", f: "ba kúRay shúway waay" },
        { p: "به کړی شوی وی", f: "ba kúRay shúway way" },
      ],
      [
        { p: "به کړي شوي وای", f: "ba kúRee shúwee waay" },
        { p: "به کړي شوي وی", f: "ba kúRee shúwee way" },
      ],
    ],
    [
      [
        { p: "به کړې شوې وای", f: "ba kúRe shúwe waay" },
        { p: "به کړې شوې وی", f: "ba kúRe shúwe way" },
      ],
      [
        { p: "به کړې شوې وای", f: "ba kúRe shúwe waay" },
        { p: "به کړې شوې وی", f: "ba kúRe shúwe way" },
      ],
    ],
  ],
};

export const kedulStat: T.VerbConjugation = {
  info: {
    entry: {
      entry: {
        ts: 1581086654898,
        i: 10645,
        p: "کېدل",
        f: "kedul",
        g: "kedul",
        e: "to become _____",
        c: "v. intrans. irreg.",
        ssp: "ش",
        ssf: "sh",
        prp: "شول",
        prf: "shwul",
        pprtp: "شوی",
        pprtf: "shúway",
        noOo: true,
        ec: "become",
        ep: "_____",
      } as T.VerbDictionaryEntry,
    },
    transitivity: "intransitive",
    type: "simple",
    yulEnding: false,
    stem: {
      imperfective: { p: "کېږ", f: "kéG" },
      perfective: { p: "ش", f: "sh" },
    },
    root: {
      imperfective: {
        long: { p: "کېدل", f: "kedúl" },
        short: { p: "کېد", f: "ked" },
      },
      perfective: {
        long: { p: "شول", f: "shwul" },
        short: { p: "شو", f: "shw" },
      },
    },
    participle: {
      present: { p: "کېدونکی", f: "kedóonkay" },
      past: { p: "شوی", f: "shúway" },
    },
  },
  imperfective: {
    nonImperative: [
      [[{ p: "کېږم", f: "kéGum" }], [{ p: "کېږو", f: "kéGoo" }]],
      [[{ p: "کېږم", f: "kéGum" }], [{ p: "کېږو", f: "kéGoo" }]],
      [[{ p: "کېږې", f: "kéGe" }], [{ p: "کېږئ", f: "kéGey" }]],
      [[{ p: "کېږې", f: "kéGe" }], [{ p: "کېږئ", f: "kéGey" }]],
      [[{ p: "کېږي", f: "kéGee" }], [{ p: "کېږي", f: "kéGee" }]],
      [[{ p: "کېږي", f: "kéGee" }], [{ p: "کېږي", f: "kéGee" }]],
    ],
    future: [
      [[{ p: "به کېږم", f: "ba kéGum" }], [{ p: "به کېږو", f: "ba kéGoo" }]],
      [[{ p: "به کېږم", f: "ba kéGum" }], [{ p: "به کېږو", f: "ba kéGoo" }]],
      [[{ p: "به کېږې", f: "ba kéGe" }], [{ p: "به کېږئ", f: "ba kéGey" }]],
      [[{ p: "به کېږې", f: "ba kéGe" }], [{ p: "به کېږئ", f: "ba kéGey" }]],
      [[{ p: "به کېږي", f: "ba kéGee" }], [{ p: "به کېږي", f: "ba kéGee" }]],
      [[{ p: "به کېږي", f: "ba kéGee" }], [{ p: "به کېږي", f: "ba kéGee" }]],
    ],
    imperative: [
      [[{ p: "کېږه", f: "kéGa" }], [{ p: "کېږئ", f: "kéGey" }]],
      [[{ p: "کېږه", f: "kéGa" }], [{ p: "کېږئ", f: "kéGey" }]],
    ],
    past: {
      short: [
        [[{ p: "کېدم", f: "kedúm" }], [{ p: "کېدو", f: "kedóo" }]],
        [[{ p: "کېدم", f: "kedúm" }], [{ p: "کېدو", f: "kedóo" }]],
        [[{ p: "کېدې", f: "kedé" }], [{ p: "کېدئ", f: "kedéy" }]],
        [[{ p: "کېدې", f: "kedé" }], [{ p: "کېدئ", f: "kedéy" }]],
        [
          [
            { p: "کېده", f: "kedú" },
            { p: "کېدو", f: "kedó" },
          ],
          [{ p: "کېدل", f: "kedúl" }],
        ],
        [[{ p: "کېده", f: "kedá" }], [{ p: "کېدې", f: "kedé" }]],
      ],
      long: [
        [[{ p: "کېدلم", f: "kedúlum" }], [{ p: "کېدلو", f: "kedúloo" }]],
        [[{ p: "کېدلم", f: "kedúlum" }], [{ p: "کېدلو", f: "kedúloo" }]],
        [[{ p: "کېدلې", f: "kedúle" }], [{ p: "کېدلئ", f: "kedúley" }]],
        [[{ p: "کېدلې", f: "kedúle" }], [{ p: "کېدلئ", f: "kedúley" }]],
        [[{ p: "کېدلو", f: "kedúlo" }], [{ p: "کېدل", f: "kedúl" }]],
        [[{ p: "کېدله", f: "kedúla" }], [{ p: "کېدلې", f: "kedúle" }]],
      ],
    },
    habitualPast: {
      short: [
        [[{ p: "به کېدم", f: "ba kedum" }], [{ p: "به کېدو", f: "ba kedóo" }]],
        [[{ p: "به کېدم", f: "ba kedum" }], [{ p: "به کېدو", f: "ba kedóo" }]],
        [[{ p: "به کېدې", f: "ba kedé" }], [{ p: "به کېدئ", f: "ba kedéy" }]],
        [[{ p: "به کېدې", f: "ba kedé" }], [{ p: "به کېدئ", f: "ba kedéy" }]],
        [
          [
            { p: "به کېده", f: "ba kedu" },
            { p: "به کېدو", f: "ba kedó" },
          ],
          [{ p: "به کېدل", f: "ba kedúl" }],
        ],
        [[{ p: "به کېده", f: "ba kedá" }], [{ p: "به کېدې", f: "ba kedé" }]],
      ],
      long: [
        [
          [{ p: "به کېدلم", f: "ba kedúlum" }],
          [{ p: "به کېدلو", f: "ba kedúloo" }],
        ],
        [
          [{ p: "به کېدلم", f: "ba kedúlum" }],
          [{ p: "به کېدلو", f: "ba kedúloo" }],
        ],
        [
          [{ p: "به کېدلې", f: "ba kedúle" }],
          [{ p: "به کېدلئ", f: "ba kedúley" }],
        ],
        [
          [{ p: "به کېدلې", f: "ba kedúle" }],
          [{ p: "به کېدلئ", f: "ba kedúley" }],
        ],
        [
          [{ p: "به کېدلو", f: "ba kedúlo" }],
          [{ p: "به کېدل", f: "ba kedúl" }],
        ],
        [
          [{ p: "به کېدله", f: "ba kedúla" }],
          [{ p: "به کېدلې", f: "ba kedúle" }],
        ],
      ],
    },
    modal: kedulStatModal,
  },
  perfective: {
    nonImperative: [
      [[{ p: "شم", f: "shum" }], [{ p: "شو", f: "shoo" }]],
      [[{ p: "شم", f: "shum" }], [{ p: "شو", f: "shoo" }]],
      [[{ p: "شې", f: "she" }], [{ p: "شئ", f: "shey" }]],
      [[{ p: "شې", f: "she" }], [{ p: "شئ", f: "shey" }]],
      [[{ p: "شي", f: "shee" }], [{ p: "شي", f: "shee" }]],
      [[{ p: "شي", f: "shee" }], [{ p: "شي", f: "shee" }]],
    ],
    future: [
      [[{ p: "به شم", f: "ba shum" }], [{ p: "به شو", f: "ba shoo" }]],
      [[{ p: "به شم", f: "ba shum" }], [{ p: "به شو", f: "ba shoo" }]],
      [[{ p: "به شې", f: "ba she" }], [{ p: "به شئ", f: "ba shey" }]],
      [[{ p: "به شې", f: "ba she" }], [{ p: "به شئ", f: "ba shey" }]],
      [[{ p: "به شي", f: "ba shee" }], [{ p: "به شي", f: "ba shee" }]],
      [[{ p: "به شي", f: "ba shee" }], [{ p: "به شي", f: "ba shee" }]],
    ],
    imperative: [
      [[{ p: "شه", f: "sha" }], [{ p: "شئ", f: "shey" }]],
      [[{ p: "شه", f: "sha" }], [{ p: "شئ", f: "shey" }]],
    ],
    past: {
      short: [
        [[{ p: "شوم", f: "shwum" }], [{ p: "شو", f: "shoo" }]],
        [[{ p: "شوم", f: "shwum" }], [{ p: "شو", f: "shoo" }]],
        [[{ p: "شوې", f: "shwe" }], [{ p: "شوئ", f: "shwey" }]],
        [[{ p: "شوې", f: "shwe" }], [{ p: "شوئ", f: "shwey" }]],
        [
          [{ p: "شو", f: "sho" }],
          [
            { p: "شو", f: "shoo" },
            { p: "شول", f: "shwul" },
          ],
        ],
        [[{ p: "شوه", f: "shwa" }], [{ p: "شوې", f: "shwe" }]],
      ],
      long: [
        [[{ p: "شولم", f: "shwulum" }], [{ p: "شولو", f: "shwuloo" }]],
        [[{ p: "شولم", f: "shwulum" }], [{ p: "شولو", f: "shwuloo" }]],
        [[{ p: "شولې", f: "shwule" }], [{ p: "شولئ", f: "shwuley" }]],
        [[{ p: "شولې", f: "shwule" }], [{ p: "شولئ", f: "shwuley" }]],
        [
          [
            { p: "شوله", f: "shwulu" },
            { p: "شولو", f: "shwulo" },
          ],
          [{ p: "شول", f: "shwul" }],
        ],
        [[{ p: "شوله", f: "shwula" }], [{ p: "شولې", f: "shwule" }]],
      ],
    },
    habitualPast: {
      short: [
        [[{ p: "به شوم", f: "ba shwum" }], [{ p: "به شو", f: "ba shoo" }]],
        [[{ p: "به شوم", f: "ba shwum" }], [{ p: "به شو", f: "ba shoo" }]],
        [[{ p: "به شوې", f: "ba shwe" }], [{ p: "به شوئ", f: "ba shwey" }]],
        [[{ p: "به شوې", f: "ba shwe" }], [{ p: "به شوئ", f: "ba shwey" }]],
        [
          [{ p: "به شو", f: "ba sho" }],
          [
            { p: "به شو", f: "ba shoo" },
            { p: "به شول", f: "ba shwul" },
          ],
        ],
        [[{ p: "به شوه", f: "ba shwa" }], [{ p: "به شوې", f: "ba shwe" }]],
      ],
      long: [
        [
          [{ p: "به شولم", f: "ba shwulum" }],
          [{ p: "به شولو", f: "ba shwuloo" }],
        ],
        [
          [{ p: "به شولم", f: "ba shwulum" }],
          [{ p: "به شولو", f: "ba shwuloo" }],
        ],
        [
          [{ p: "به شولې", f: "ba shwule" }],
          [{ p: "به شولئ", f: "ba shwuley" }],
        ],
        [
          [{ p: "به شولې", f: "ba shwule" }],
          [{ p: "به شولئ", f: "ba shwuley" }],
        ],
        [
          [
            { p: "به شوله", f: "ba shwulu" },
            { p: "به شولو", f: "ba shwulo" },
          ],
          [{ p: "به شول", f: "ba shwul" }],
        ],
        [
          [{ p: "به شوله", f: "ba shwula" }],
          [{ p: "به شولې", f: "ba shwule" }],
        ],
      ],
    },
    modal: kedulStatModal,
  },
  hypothetical: {
    short: [
      [[{ p: "کېدای", f: "kedáay" }], [{ p: "کېدای", f: "kedáay" }]],
      [[{ p: "کېدای", f: "kedáay" }], [{ p: "کېدای", f: "kedáay" }]],
      [[{ p: "کېدای", f: "kedáay" }], [{ p: "کېدای", f: "kedáay" }]],
      [[{ p: "کېدای", f: "kedáay" }], [{ p: "کېدای", f: "kedáay" }]],
      [[{ p: "کېدای", f: "kedáay" }], [{ p: "کېدای", f: "kedáay" }]],
      [[{ p: "کېدای", f: "kedáay" }], [{ p: "کېدای", f: "kedáay" }]],
    ],
    long: [
      [[{ p: "کېدلای", f: "kedúlaay" }], [{ p: "کېدلای", f: "kedúlaay" }]],
      [[{ p: "کېدلای", f: "kedúlaay" }], [{ p: "کېدلای", f: "kedúlaay" }]],
      [[{ p: "کېدلای", f: "kedúlaay" }], [{ p: "کېدلای", f: "kedúlaay" }]],
      [[{ p: "کېدلای", f: "kedúlaay" }], [{ p: "کېدلای", f: "kedúlaay" }]],
      [[{ p: "کېدلای", f: "kedúlaay" }], [{ p: "کېدلای", f: "kedúlaay" }]],
      [[{ p: "کېدلای", f: "kedúlaay" }], [{ p: "کېدلای", f: "kedúlaay" }]],
    ],
  },
  participle: {
    past: {
      masc: [
        [{ p: "شوی", f: "shúway" }],
        [{ p: "شوي", f: "shúwee" }],
        [
          { p: "شویو", f: "shúwiyo" },
          { p: "شوو", f: "shúwo" },
        ],
      ],
      fem: [
        [{ p: "شوې", f: "shúwe" }],
        [{ p: "شوې", f: "shúwe" }],
        [{ p: "شوو", f: "shúwo" }],
      ],
    },
    present: {
      masc: [
        [{ p: "کېدونکی", f: "keedóonkay" }],
        [{ p: "کېدونکي", f: "keedóonkee" }],
        [
          { p: "کېدونکیو", f: "keedóonkiyo" },
          { p: "کېدونکو", f: "kedóonko" },
        ],
      ],
      fem: [
        [{ p: "کېدونکې", f: "keedóonke" }],
        [{ p: "کېدونکې", f: "keedóonke" }],
        [{ p: "کېدونکو", f: "keedóonko" }],
      ],
    },
  },
  perfect: {
    halfPerfect: [
      [[{ p: "شوی", f: "shuway" }], [{ p: "شوي", f: "shuwee" }]],
      [[{ p: "شوې", f: "shuwe" }], [{ p: "شوې", f: "shuwe" }]],
      [[{ p: "شوی", f: "shuway" }], [{ p: "شوي", f: "shuwee" }]],
      [[{ p: "شوې", f: "shuwe" }], [{ p: "شوې", f: "shuwe" }]],
      [[{ p: "شوی", f: "shuway" }], [{ p: "شوي", f: "shuwee" }]],
      [[{ p: "شوې", f: "shuwe" }], [{ p: "شوې", f: "shuwe" }]],
    ],
    past: [
      [[{ p: "شوی وم", f: "shuway wum" }], [{ p: "شوي وو", f: "shuwee woo" }]],
      [[{ p: "شوې وم", f: "shuwe wum" }], [{ p: "شوې وو", f: "shuwe woo" }]],
      [[{ p: "شوی وې", f: "shuway we" }], [{ p: "شوي وئ", f: "shuwee wey" }]],
      [[{ p: "شوې وې", f: "shuwe we" }], [{ p: "شوې وئ", f: "shuwe wey" }]],
      [[{ p: "شوی و", f: "shuway wo" }], [{ p: "شوي وو", f: "shuwee woo" }]],
      [[{ p: "شوې وه", f: "shuwe wa" }], [{ p: "شوې وې", f: "shuwe we" }]],
    ],
    present: [
      [[{ p: "شوی یم", f: "shuway yum" }], [{ p: "شوي یو", f: "shuwee yoo" }]],
      [[{ p: "شوې یم", f: "shuwe yum" }], [{ p: "شوې یو", f: "shuwe yoo" }]],
      [[{ p: "شوی یې", f: "shuway ye" }], [{ p: "شوي یئ", f: "shuwee yey" }]],
      [[{ p: "شوې یې", f: "shuwe ye" }], [{ p: "شوې یئ", f: "shuwe yey" }]],
      [[{ p: "شوی دی", f: "shuway day" }], [{ p: "شوي دي", f: "shuwee dee" }]],
      [[{ p: "شوې ده", f: "shuwe da" }], [{ p: "شوې دي", f: "shuwe dee" }]],
    ],
    habitual: [
      [[{ p: "شوی یم", f: "shuway yum" }], [{ p: "شوي یو", f: "shuwee yoo" }]],
      [[{ p: "شوې یم", f: "shuwe yum" }], [{ p: "شوې یو", f: "shuwe yoo" }]],
      [[{ p: "شوی یې", f: "shuway ye" }], [{ p: "شوي یئ", f: "shuwee yey" }]],
      [[{ p: "شوې یې", f: "shuwe ye" }], [{ p: "شوې یئ", f: "shuwe yey" }]],
      [[{ p: "شوی وي", f: "shuway wee" }], [{ p: "شوي وي", f: "shuwee wee" }]],
      [[{ p: "شوې وي", f: "shuwe wee" }], [{ p: "شوې وي", f: "shuwe wee" }]],
    ],
    subjunctive: [
      [[{ p: "شوی وم", f: "shuway wum" }], [{ p: "شوي وو", f: "shuwee woo" }]],
      [[{ p: "شوې وم", f: "shuwe wum" }], [{ p: "شوې وو", f: "shuwe woo" }]],
      [[{ p: "شوی وې", f: "shuway we" }], [{ p: "شوي وئ", f: "shuwee wey" }]],
      [[{ p: "شوې وې", f: "shuwe we" }], [{ p: "شوې وئ", f: "shuwe wey" }]],
      [[{ p: "شوی وي", f: "shuway wee" }], [{ p: "شوي وي", f: "shuwee wee" }]],
      [[{ p: "شوې وي", f: "shuwe wee" }], [{ p: "شوې وي", f: "shuwe wee" }]],
    ],
    future: [
      [
        [{ p: "به شوی یم", f: "ba shuway yum" }],
        [{ p: "به شوي یو", f: "ba shuwee yoo" }],
      ],
      [
        [{ p: "به شوې یم", f: "ba shuwe yum" }],
        [{ p: "به شوې یو", f: "ba shuwe yoo" }],
      ],
      [
        [{ p: "به شوی یې", f: "ba shuway ye" }],
        [{ p: "به شوي یئ", f: "ba shuwee yey" }],
      ],
      [
        [{ p: "به شوې یې", f: "ba shuwe ye" }],
        [{ p: "به شوې یئ", f: "ba shuwe yey" }],
      ],
      [
        [{ p: "به شوی وي", f: "ba shuway wee" }],
        [{ p: "به شوي وي", f: "ba shuwee wee" }],
      ],
      [
        [{ p: "به شوې وي", f: "ba shuwe wee" }],
        [{ p: "به شوې وي", f: "ba shuwe wee" }],
      ],
    ],
    wouldBe: [
      [
        [{ p: "به شوی وم", f: "ba shuway wum" }],
        [{ p: "به شوي وو", f: "ba shuwee woo" }],
      ],
      [
        [{ p: "به شوې وم", f: "ba shuwe wum" }],
        [{ p: "به شوې وو", f: "ba shuwe woo" }],
      ],
      [
        [{ p: "به شوی وې", f: "ba shuway we" }],
        [{ p: "به شوي وئ", f: "ba shuwee wey" }],
      ],
      [
        [{ p: "به شوې وې", f: "ba shuwe we" }],
        [{ p: "به شوې وئ", f: "ba shuwe wey" }],
      ],
      [
        [{ p: "به شوی و", f: "ba shuway wo" }],
        [{ p: "به شوي وو", f: "ba shuwee woo" }],
      ],
      [
        [{ p: "به شوې وه", f: "ba shuwe wa" }],
        [{ p: "به شوې وې", f: "ba shuwe we" }],
      ],
    ],
    pastSubjunctive: [
      [
        [
          { p: "شوی وای", f: "shuway waay" },
          { p: "شوی وی", f: "shuway way" },
        ],
        [
          { p: "شوي وای", f: "shuwee waay" },
          { p: "شوي وی", f: "shuwee way" },
        ],
      ],
      [
        [
          { p: "شوې وای", f: "shuwe waay" },
          { p: "شوې وی", f: "shuwe way" },
        ],
        [
          { p: "شوې وای", f: "shuwe waay" },
          { p: "شوې وی", f: "shuwe way" },
        ],
      ],
      [
        [
          { p: "شوی وای", f: "shuway waay" },
          { p: "شوی وی", f: "shuway way" },
        ],
        [
          { p: "شوي وای", f: "shuwee waay" },
          { p: "شوي وی", f: "shuwee way" },
        ],
      ],
      [
        [
          { p: "شوې وای", f: "shuwe waay" },
          { p: "شوې وی", f: "shuwe way" },
        ],
        [
          { p: "شوې وای", f: "shuwe waay" },
          { p: "شوې وی", f: "shuwe way" },
        ],
      ],
      [
        [
          { p: "شوی وای", f: "shuway waay" },
          { p: "شوی وی", f: "shuway way" },
        ],
        [
          { p: "شوي وای", f: "shuwee waay" },
          { p: "شوي وی", f: "shuwee way" },
        ],
      ],
      [
        [
          { p: "شوې وای", f: "shuwe waay" },
          { p: "شوې وی", f: "shuwe way" },
        ],
        [
          { p: "شوې وای", f: "shuwe waay" },
          { p: "شوې وی", f: "shuwe way" },
        ],
      ],
    ],
    wouldHaveBeen: [
      [
        [
          { p: "به شوی وای", f: "ba shuway waay" },
          { p: "به شوی وی", f: "ba shuway way" },
        ],
        [
          { p: "به شوي وای", f: "ba shuwee waay" },
          { p: "به شوي وی", f: "ba shuwee way" },
        ],
      ],
      [
        [
          { p: "به شوې وای", f: "ba shuwe waay" },
          { p: "به شوې وی", f: "ba shuwe way" },
        ],
        [
          { p: "به شوې وای", f: "ba shuwe waay" },
          { p: "به شوې وی", f: "ba shuwe way" },
        ],
      ],
      [
        [
          { p: "به شوی وای", f: "ba shuway waay" },
          { p: "به شوی وی", f: "ba shuway way" },
        ],
        [
          { p: "به شوي وای", f: "ba shuwee waay" },
          { p: "به شوي وی", f: "ba shuwee way" },
        ],
      ],
      [
        [
          { p: "به شوې وای", f: "ba shuwe waay" },
          { p: "به شوې وی", f: "ba shuwe way" },
        ],
        [
          { p: "به شوې وای", f: "ba shuwe waay" },
          { p: "به شوې وی", f: "ba shuwe way" },
        ],
      ],
      [
        [
          { p: "به شوی وای", f: "ba shuway waay" },
          { p: "به شوی وی", f: "ba shuway way" },
        ],
        [
          { p: "به شوي وای", f: "ba shuwee waay" },
          { p: "به شوي وی", f: "ba shuwee way" },
        ],
      ],
      [
        [
          { p: "به شوې وای", f: "ba shuwe waay" },
          { p: "به شوې وی", f: "ba shuwe way" },
        ],
        [
          { p: "به شوې وای", f: "ba shuwe waay" },
          { p: "به شوې وی", f: "ba shuwe way" },
        ],
      ],
    ],
  },
};

export const kedulDyn: T.VerbConjugation = {
  info: {
    entry: {
      entry: {
        ts: 1527812754,
        i: 10644,
        p: "کېدل",
        f: "kedul",
        g: "kedul",
        e: "to happen, occur",
        c: "v. intrans. irreg.",
        ssp: "وش",
        ssf: "óosh",
        prp: "وشول",
        prf: "óoshwul",
        pprtp: "شوی",
        pprtf: "shúway",
        diacExcept: true,
        ec: "happen",
      } as T.VerbDictionaryEntry,
    },
    transitivity: "intransitive",
    type: "simple",
    yulEnding: false,
    stem: {
      imperfective: { p: "کېږ", f: "kéG" },
      perfective: { p: "وش", f: "óosh" },
      perfectiveSplit: [
        { p: "و", f: "óo" },
        { p: "ش", f: "sh" },
      ],
    },
    root: {
      imperfective: {
        long: { p: "کېدل", f: "kedúl" },
        short: { p: "کېد", f: "ked" },
      },
      perfective: {
        long: { p: "وشول", f: "óoshwul" },
        short: { p: "وشو", f: "óoshw" },
      },
      perfectiveSplit: {
        long: [
          { p: "و", f: "óo" },
          { p: "شول", f: "shwul" },
        ],
        short: [
          { p: "و", f: "óo" },
          { p: "شو", f: "shw" },
        ],
      },
    },
    participle: {
      present: { p: "کېدونکی", f: "kedóonkay" },
      past: { p: "شوی", f: "shúway" },
    },
  },
  imperfective: {
    nonImperative: [
      [[{ p: "کېږم", f: "kéGum" }], [{ p: "کېږو", f: "kéGoo" }]],
      [[{ p: "کېږم", f: "kéGum" }], [{ p: "کېږو", f: "kéGoo" }]],
      [[{ p: "کېږې", f: "kéGe" }], [{ p: "کېږئ", f: "kéGey" }]],
      [[{ p: "کېږې", f: "kéGe" }], [{ p: "کېږئ", f: "kéGey" }]],
      [[{ p: "کېږي", f: "kéGee" }], [{ p: "کېږي", f: "kéGee" }]],
      [[{ p: "کېږي", f: "kéGee" }], [{ p: "کېږي", f: "kéGee" }]],
    ],
    future: [
      [[{ p: "به کېږم", f: "ba kéGum" }], [{ p: "به کېږو", f: "ba kéGoo" }]],
      [[{ p: "به کېږم", f: "ba kéGum" }], [{ p: "به کېږو", f: "ba kéGoo" }]],
      [[{ p: "به کېږې", f: "ba kéGe" }], [{ p: "به کېږئ", f: "ba kéGey" }]],
      [[{ p: "به کېږې", f: "ba kéGe" }], [{ p: "به کېږئ", f: "ba kéGey" }]],
      [[{ p: "به کېږي", f: "ba kéGee" }], [{ p: "به کېږي", f: "ba kéGee" }]],
      [[{ p: "به کېږي", f: "ba kéGee" }], [{ p: "به کېږي", f: "ba kéGee" }]],
    ],
    imperative: [
      [[{ p: "کېږه", f: "kéGa" }], [{ p: "کېږئ", f: "kéGey" }]],
      [[{ p: "کېږه", f: "kéGa" }], [{ p: "کېږئ", f: "kéGey" }]],
    ],
    past: {
      short: [
        [[{ p: "کېدم", f: "kedum" }], [{ p: "کېدو", f: "kedóo" }]],
        [[{ p: "کېدم", f: "kedum" }], [{ p: "کېدو", f: "kedóo" }]],
        [[{ p: "کېدې", f: "kedé" }], [{ p: "کېدئ", f: "kedéy" }]],
        [[{ p: "کېدې", f: "kedé" }], [{ p: "کېدئ", f: "kedéy" }]],
        [
          [
            { p: "کېده", f: "kedu" },
            { p: "کېدو", f: "kedó" },
          ],
          [{ p: "کېدل", f: "kedúl" }],
        ],
        [[{ p: "کېده", f: "kedá" }], [{ p: "کېدې", f: "kedé" }]],
      ],
      long: [
        [[{ p: "کېدلم", f: "kedúlum" }], [{ p: "کېدلو", f: "kedúloo" }]],
        [[{ p: "کېدلم", f: "kedúlum" }], [{ p: "کېدلو", f: "kedúloo" }]],
        [[{ p: "کېدلې", f: "kedúle" }], [{ p: "کېدلئ", f: "kedúley" }]],
        [[{ p: "کېدلې", f: "kedúle" }], [{ p: "کېدلئ", f: "kedúley" }]],
        [[{ p: "کېدلو", f: "kedúlo" }], [{ p: "کېدل", f: "kedúl" }]],
        [[{ p: "کېدله", f: "kedúla" }], [{ p: "کېدلې", f: "kedúle" }]],
      ],
    },
    habitualPast: {
      short: [
        [[{ p: "به کېدم", f: "ba kedum" }], [{ p: "به کېدو", f: "ba kedóo" }]],
        [[{ p: "به کېدم", f: "ba kedum" }], [{ p: "به کېدو", f: "ba kedóo" }]],
        [[{ p: "به کېدې", f: "ba kedé" }], [{ p: "به کېدئ", f: "ba kedéy" }]],
        [[{ p: "به کېدې", f: "ba kedé" }], [{ p: "به کېدئ", f: "ba kedéy" }]],
        [
          [
            { p: "به کېده", f: "ba kedu" },
            { p: "به کېدو", f: "ba kedó" },
          ],
          [{ p: "به کېدل", f: "ba kedúl" }],
        ],
        [[{ p: "به کېده", f: "ba kedá" }], [{ p: "به کېدې", f: "ba kedé" }]],
      ],
      long: [
        [
          [{ p: "به کېدلم", f: "ba kedúlum" }],
          [{ p: "به کېدلو", f: "ba kedúloo" }],
        ],
        [
          [{ p: "به کېدلم", f: "ba kedúlum" }],
          [{ p: "به کېدلو", f: "ba kedúloo" }],
        ],
        [
          [{ p: "به کېدلې", f: "ba kedúle" }],
          [{ p: "به کېدلئ", f: "ba kedúley" }],
        ],
        [
          [{ p: "به کېدلې", f: "ba kedúle" }],
          [{ p: "به کېدلئ", f: "ba kedúley" }],
        ],
        [
          [{ p: "به کېدلو", f: "ba kedúlo" }],
          [{ p: "به کېدل", f: "ba kedúl" }],
        ],
        [
          [{ p: "به کېدله", f: "ba kedúla" }],
          [{ p: "به کېدلې", f: "ba kedúle" }],
        ],
      ],
    },
    modal: kedulStatModal,
  },
  perfective: {
    nonImperative: [
      [[{ p: "وشم", f: "óoshum" }], [{ p: "وشو", f: "óoshoo" }]],
      [[{ p: "وشم", f: "óoshum" }], [{ p: "وشو", f: "óoshoo" }]],
      [[{ p: "وشې", f: "óoshe" }], [{ p: "وشئ", f: "óoshey" }]],
      [[{ p: "وشې", f: "óoshe" }], [{ p: "وشئ", f: "óoshey" }]],
      [[{ p: "وشي", f: "óoshee" }], [{ p: "وشي", f: "óoshee" }]],
      [[{ p: "وشي", f: "óoshee" }], [{ p: "وشي", f: "óoshee" }]],
    ],
    future: [
      [[{ p: "به شم", f: "ba shum" }], [{ p: "به شو", f: "ba shoo" }]],
      [[{ p: "به شم", f: "ba shum" }], [{ p: "به شو", f: "ba shoo" }]],
      [[{ p: "به شې", f: "ba she" }], [{ p: "به شئ", f: "ba shey" }]],
      [[{ p: "به شې", f: "ba she" }], [{ p: "به شئ", f: "ba shey" }]],
      [[{ p: "به شي", f: "ba shee" }], [{ p: "به شي", f: "ba shee" }]],
      [[{ p: "به شي", f: "ba shee" }], [{ p: "به شي", f: "ba shee" }]],
    ],
    imperative: [
      [[{ p: "وشه", f: "óosha" }], [{ p: "وشئ", f: "óoshey" }]],
      [[{ p: "وشه", f: "óosha" }], [{ p: "وشئ", f: "óoshey" }]],
    ],
    past: {
      short: [
        [[{ p: "وشوم", f: "óoshwum" }], [{ p: "وشو", f: "óoshoo" }]],
        [[{ p: "وشوم", f: "óoshwum" }], [{ p: "وشو", f: "óoshoo" }]],
        [[{ p: "وشوې", f: "óoshwe" }], [{ p: "وشوئ", f: "óoshwey" }]],
        [[{ p: "وشوې", f: "óoshwe" }], [{ p: "وشوئ", f: "óoshwey" }]],
        [
          [{ p: "وشو", f: "óosho" }],
          [
            { p: "وشو", f: "óoshoo" },
            { p: "وشول", f: "óoshwul" },
          ],
        ],
        [[{ p: "وشوه", f: "óoshwa" }], [{ p: "وشوې", f: "óoshwe" }]],
      ],
      long: [
        [[{ p: "وشولم", f: "óoshwulum" }], [{ p: "وشولو", f: "óoshwuloo" }]],
        [[{ p: "وشولم", f: "óoshwulum" }], [{ p: "وشولو", f: "óoshwuloo" }]],
        [[{ p: "وشولې", f: "óoshwule" }], [{ p: "وشولئ", f: "óoshwuley" }]],
        [[{ p: "وشولې", f: "óoshwule" }], [{ p: "وشولئ", f: "óoshwuley" }]],
        [
          [
            { p: "وشوله", f: "óoshwulu" },
            { p: "وشولو", f: "óoshwulo" },
          ],
          [{ p: "وشول", f: "óoshwul" }],
        ],
        [[{ p: "وشوله", f: "óoshwula" }], [{ p: "وشولې", f: "óoshwule" }]],
      ],
    },
    habitualPast: {
      short: [
        [
          [{ p: "به وشوم", f: "ba óoshwum" }],
          [{ p: "به وشو", f: "ba óoshoo" }],
        ],
        [
          [{ p: "به وشوم", f: "ba óoshwum" }],
          [{ p: "به وشو", f: "ba óoshoo" }],
        ],
        [
          [{ p: "به وشوې", f: "ba óoshwe" }],
          [{ p: "به وشوئ", f: "ba óoshwey" }],
        ],
        [
          [{ p: "به وشوې", f: "ba óoshwe" }],
          [{ p: "به وشوئ", f: "ba óoshwey" }],
        ],
        [
          [{ p: "به وشو", f: "ba óosho" }],
          [
            { p: "به وشو", f: "ba óoshoo" },
            { p: "به وشول", f: "ba óoshwul" },
          ],
        ],
        [
          [{ p: "به وشوه", f: "ba óoshwa" }],
          [{ p: "به وشوې", f: "ba óoshwe" }],
        ],
      ],
      long: [
        [
          [{ p: "به وشولم", f: "ba óoshwulum" }],
          [{ p: "به وشولو", f: "ba óoshwuloo" }],
        ],
        [
          [{ p: "به وشولم", f: "ba óoshwulum" }],
          [{ p: "به وشولو", f: "ba óoshwuloo" }],
        ],
        [
          [{ p: "به وشولې", f: "ba óoshwule" }],
          [{ p: "به وشولئ", f: "ba óoshwuley" }],
        ],
        [
          [{ p: "به وشولې", f: "ba óoshwule" }],
          [{ p: "به وشولئ", f: "ba óoshwuley" }],
        ],
        [
          [
            { p: "به وشوله", f: "ba óoshwulu" },
            { p: "به وشولو", f: "ba óoshwulo" },
          ],
          [{ p: "به وشول", f: "ba óoshwul" }],
        ],
        [
          [{ p: "به وشوله", f: "ba óoshwula" }],
          [{ p: "به وشولې", f: "ba óoshwule" }],
        ],
      ],
    },
    modal: kedulStatModal,
  },
  hypothetical: {
    short: [
      [[{ p: "کېدای", f: "kedáay" }], [{ p: "کېدای", f: "kedáay" }]],
      [[{ p: "کېدای", f: "kedáay" }], [{ p: "کېدای", f: "kedáay" }]],
      [[{ p: "کېدای", f: "kedáay" }], [{ p: "کېدای", f: "kedáay" }]],
      [[{ p: "کېدای", f: "kedáay" }], [{ p: "کېدای", f: "kedáay" }]],
      [[{ p: "کېدای", f: "kedáay" }], [{ p: "کېدای", f: "kedáay" }]],
      [[{ p: "کېدای", f: "kedáay" }], [{ p: "کېدای", f: "kedáay" }]],
    ],
    long: [
      [[{ p: "کېدلای", f: "kedúlaay" }], [{ p: "کېدلای", f: "kedúlaay" }]],
      [[{ p: "کېدلای", f: "kedúlaay" }], [{ p: "کېدلای", f: "kedúlaay" }]],
      [[{ p: "کېدلای", f: "kedúlaay" }], [{ p: "کېدلای", f: "kedúlaay" }]],
      [[{ p: "کېدلای", f: "kedúlaay" }], [{ p: "کېدلای", f: "kedúlaay" }]],
      [[{ p: "کېدلای", f: "kedúlaay" }], [{ p: "کېدلای", f: "kedúlaay" }]],
      [[{ p: "کېدلای", f: "kedúlaay" }], [{ p: "کېدلای", f: "kedúlaay" }]],
    ],
  },
  participle: {
    past: {
      masc: [
        [{ p: "شوی", f: "shúway" }],
        [{ p: "شوي", f: "shúwee" }],
        [
          { p: "شویو", f: "shúwiyo" },
          { p: "شوو", f: "shúwo" },
        ],
      ],
      fem: [
        [{ p: "شوې", f: "shúwe" }],
        [{ p: "شوې", f: "shúwe" }],
        [{ p: "شوو", f: "shúwo" }],
      ],
    },
    present: {
      masc: [
        [{ p: "کېدونکی", f: "keedóonkay" }],
        [{ p: "کېدونکي", f: "keedóonkee" }],
        [
          { p: "کېدونکیو", f: "keedóonkiyo" },
          { p: "کېدونکو", f: "kedóonko" },
        ],
      ],
      fem: [
        [{ p: "کېدونکې", f: "keedóonke" }],
        [{ p: "کېدونکې", f: "keedóonke" }],
        [{ p: "کېدونکو", f: "keedóonko" }],
      ],
    },
  },
  perfect: {
    halfPerfect: [
      [[{ p: "شوی", f: "shuway" }], [{ p: "شوي", f: "shuwee" }]],
      [[{ p: "شوې", f: "shuwe" }], [{ p: "شوې", f: "shuwe" }]],
      [[{ p: "شوی", f: "shuway" }], [{ p: "شوي", f: "shuwee" }]],
      [[{ p: "شوې", f: "shuwe" }], [{ p: "شوې", f: "shuwe" }]],
      [[{ p: "شوی", f: "shuway" }], [{ p: "شوي", f: "shuwee" }]],
      [[{ p: "شوې", f: "shuwe" }], [{ p: "شوې", f: "shuwe" }]],
    ],
    past: [
      [[{ p: "شوی وم", f: "shuway wum" }], [{ p: "شوي وو", f: "shuwee woo" }]],
      [[{ p: "شوې وم", f: "shuwe wum" }], [{ p: "شوې وو", f: "shuwe woo" }]],
      [[{ p: "شوی وې", f: "shuway we" }], [{ p: "شوي وئ", f: "shuwee wey" }]],
      [[{ p: "شوې وې", f: "shuwe we" }], [{ p: "شوې وئ", f: "shuwe wey" }]],
      [[{ p: "شوی و", f: "shuway wo" }], [{ p: "شوي وو", f: "shuwee woo" }]],
      [[{ p: "شوې وه", f: "shuwe wa" }], [{ p: "شوې وې", f: "shuwe we" }]],
    ],
    present: [
      [[{ p: "شوی یم", f: "shuway yum" }], [{ p: "شوي یو", f: "shuwee yoo" }]],
      [[{ p: "شوې یم", f: "shuwe yum" }], [{ p: "شوې یو", f: "shuwe yoo" }]],
      [[{ p: "شوی یې", f: "shuway ye" }], [{ p: "شوي یئ", f: "shuwee yey" }]],
      [[{ p: "شوې یې", f: "shuwe ye" }], [{ p: "شوې یئ", f: "shuwe yey" }]],
      [[{ p: "شوی دی", f: "shuway day" }], [{ p: "شوي دي", f: "shuwee dee" }]],
      [[{ p: "شوې ده", f: "shuwe da" }], [{ p: "شوې دي", f: "shuwe dee" }]],
    ],
    habitual: [
      [[{ p: "شوی یم", f: "shuway yum" }], [{ p: "شوي یو", f: "shuwee yoo" }]],
      [[{ p: "شوې یم", f: "shuwe yum" }], [{ p: "شوې یو", f: "shuwe yoo" }]],
      [[{ p: "شوی یې", f: "shuway ye" }], [{ p: "شوي یئ", f: "shuwee yey" }]],
      [[{ p: "شوې یې", f: "shuwe ye" }], [{ p: "شوې یئ", f: "shuwe yey" }]],
      [[{ p: "شوی وي", f: "shuway wee" }], [{ p: "شوي وي", f: "shuwee wee" }]],
      [[{ p: "شوې وي", f: "shuwe wee" }], [{ p: "شوې وي", f: "shuwe wee" }]],
    ],
    subjunctive: [
      [[{ p: "شوی وم", f: "shuway wum" }], [{ p: "شوي وو", f: "shuwee woo" }]],
      [[{ p: "شوې وم", f: "shuwe wum" }], [{ p: "شوې وو", f: "shuwe woo" }]],
      [[{ p: "شوی وې", f: "shuway we" }], [{ p: "شوي وئ", f: "shuwee wey" }]],
      [[{ p: "شوې وې", f: "shuwe we" }], [{ p: "شوې وئ", f: "shuwe wey" }]],
      [[{ p: "شوی وي", f: "shuway wee" }], [{ p: "شوي وي", f: "shuwee wee" }]],
      [[{ p: "شوې وي", f: "shuwe wee" }], [{ p: "شوې وي", f: "shuwe wee" }]],
    ],
    future: [
      [
        [{ p: "به شوی یم", f: "ba shuway yum" }],
        [{ p: "به شوي یو", f: "ba shuwee yoo" }],
      ],
      [
        [{ p: "به شوې یم", f: "ba shuwe yum" }],
        [{ p: "به شوې یو", f: "ba shuwe yoo" }],
      ],
      [
        [{ p: "به شوی یې", f: "ba shuway ye" }],
        [{ p: "به شوي یئ", f: "ba shuwee yey" }],
      ],
      [
        [{ p: "به شوې یې", f: "ba shuwe ye" }],
        [{ p: "به شوې یئ", f: "ba shuwe yey" }],
      ],
      [
        [{ p: "به شوی وي", f: "ba shuway wee" }],
        [{ p: "به شوي وي", f: "ba shuwee wee" }],
      ],
      [
        [{ p: "به شوې وي", f: "ba shuwe wee" }],
        [{ p: "به شوې وي", f: "ba shuwe wee" }],
      ],
    ],
    wouldBe: [
      [
        [{ p: "به شوی وم", f: "ba shuway wum" }],
        [{ p: "به شوي وو", f: "ba shuwee woo" }],
      ],
      [
        [{ p: "به شوې وم", f: "ba shuwe wum" }],
        [{ p: "به شوې وو", f: "ba shuwe woo" }],
      ],
      [
        [{ p: "به شوی وې", f: "ba shuway we" }],
        [{ p: "به شوي وئ", f: "ba shuwee wey" }],
      ],
      [
        [{ p: "به شوې وې", f: "ba shuwe we" }],
        [{ p: "به شوې وئ", f: "ba shuwe wey" }],
      ],
      [
        [{ p: "به شوی و", f: "ba shuway wo" }],
        [{ p: "به شوي وو", f: "ba shuwee woo" }],
      ],
      [
        [{ p: "به شوې وه", f: "ba shuwe wa" }],
        [{ p: "به شوې وې", f: "ba shuwe we" }],
      ],
    ],
    pastSubjunctive: [
      [
        [
          { p: "شوی وای", f: "shuway waay" },
          { p: "شوی وی", f: "shuway way" },
        ],
        [
          { p: "شوي وای", f: "shuwee waay" },
          { p: "شوي وی", f: "shuwee way" },
        ],
      ],
      [
        [
          { p: "شوې وای", f: "shuwe waay" },
          { p: "شوې وی", f: "shuwe way" },
        ],
        [
          { p: "شوې وای", f: "shuwe waay" },
          { p: "شوې وی", f: "shuwe way" },
        ],
      ],
      [
        [
          { p: "شوی وای", f: "shuway waay" },
          { p: "شوی وی", f: "shuway way" },
        ],
        [
          { p: "شوي وای", f: "shuwee waay" },
          { p: "شوي وی", f: "shuwee way" },
        ],
      ],
      [
        [
          { p: "شوې وای", f: "shuwe waay" },
          { p: "شوې وی", f: "shuwe way" },
        ],
        [
          { p: "شوې وای", f: "shuwe waay" },
          { p: "شوې وی", f: "shuwe way" },
        ],
      ],
      [
        [
          { p: "شوی وای", f: "shuway waay" },
          { p: "شوی وی", f: "shuway way" },
        ],
        [
          { p: "شوي وای", f: "shuwee waay" },
          { p: "شوي وی", f: "shuwee way" },
        ],
      ],
      [
        [
          { p: "شوې وای", f: "shuwe waay" },
          { p: "شوې وی", f: "shuwe way" },
        ],
        [
          { p: "شوې وای", f: "shuwe waay" },
          { p: "شوې وی", f: "shuwe way" },
        ],
      ],
    ],
    wouldHaveBeen: [
      [
        [
          { p: "به شوی وای", f: "ba shuway waay" },
          { p: "به شوی وی", f: "ba shuway way" },
        ],
        [
          { p: "به شوي وای", f: "ba shuwee waay" },
          { p: "به شوي وی", f: "ba shuwee way" },
        ],
      ],
      [
        [
          { p: "به شوې وای", f: "ba shuwe waay" },
          { p: "به شوې وی", f: "ba shuwe way" },
        ],
        [
          { p: "به شوې وای", f: "ba shuwe waay" },
          { p: "به شوې وی", f: "ba shuwe way" },
        ],
      ],
      [
        [
          { p: "به شوی وای", f: "ba shuway waay" },
          { p: "به شوی وی", f: "ba shuway way" },
        ],
        [
          { p: "به شوي وای", f: "ba shuwee waay" },
          { p: "به شوي وی", f: "ba shuwee way" },
        ],
      ],
      [
        [
          { p: "به شوې وای", f: "ba shuwe waay" },
          { p: "به شوې وی", f: "ba shuwe way" },
        ],
        [
          { p: "به شوې وای", f: "ba shuwe waay" },
          { p: "به شوې وی", f: "ba shuwe way" },
        ],
      ],
      [
        [
          { p: "به شوی وای", f: "ba shuway waay" },
          { p: "به شوی وی", f: "ba shuway way" },
        ],
        [
          { p: "به شوي وای", f: "ba shuwee waay" },
          { p: "به شوي وی", f: "ba shuwee way" },
        ],
      ],
      [
        [
          { p: "به شوې وای", f: "ba shuwe waay" },
          { p: "به شوې وی", f: "ba shuwe way" },
        ],
        [
          { p: "به شوې وای", f: "ba shuwe waay" },
          { p: "به شوې وی", f: "ba shuwe way" },
        ],
      ],
    ],
  },
};

const kawulImperfectiveModal: T.ModalContent = {
  nonImperative: {
    long: [
      [
        [
          { p: "کولی شم", f: "kawúlay shum" },
          { p: "کولای شم", f: "kawúlaay shum" },
        ],
        [
          { p: "کولی شو", f: "kawúlay shoo" },
          { p: "کولای شو", f: "kawúlaay shoo" },
        ],
      ],
      [
        [
          { p: "کولی شم", f: "kawúlay shum" },
          { p: "کولای شم", f: "kawúlaay shum" },
        ],
        [
          { p: "کولی شو", f: "kawúlay shoo" },
          { p: "کولای شو", f: "kawúlaay shoo" },
        ],
      ],
      [
        [
          { p: "کولی شې", f: "kawúlay she" },
          { p: "کولای شې", f: "kawúlaay she" },
        ],
        [
          { p: "کولی شئ", f: "kawúlay shey" },
          { p: "کولای شئ", f: "kawúlaay shey" },
        ],
      ],
      [
        [
          { p: "کولی شې", f: "kawúlay she" },
          { p: "کولای شې", f: "kawúlaay she" },
        ],
        [
          { p: "کولی شئ", f: "kawúlay shey" },
          { p: "کولای شئ", f: "kawúlaay shey" },
        ],
      ],
      [
        [
          { p: "کولی شي", f: "kawúlay shee" },
          { p: "کولای شي", f: "kawúlaay shee" },
        ],
        [
          { p: "کولی شي", f: "kawúlay shee" },
          { p: "کولای شي", f: "kawúlaay shee" },
        ],
      ],
      [
        [
          { p: "کولی شي", f: "kawúlay shee" },
          { p: "کولای شي", f: "kawúlaay shee" },
        ],
        [
          { p: "کولی شي", f: "kawúlay shee" },
          { p: "کولای شي", f: "kawúlaay shee" },
        ],
      ],
    ],
    short: [
      [
        [
          { p: "کوی شم", f: "kawáy shum" },
          { p: "کوای شم", f: "kawáay shum" },
        ],
        [
          { p: "کوی شو", f: "kawáy shoo" },
          { p: "کوای شو", f: "kawáay shoo" },
        ],
      ],
      [
        [
          { p: "کوی شم", f: "kawáy shum" },
          { p: "کوای شم", f: "kawáay shum" },
        ],
        [
          { p: "کوی شو", f: "kawáy shoo" },
          { p: "کوای شو", f: "kawáay shoo" },
        ],
      ],
      [
        [
          { p: "کوی شې", f: "kawáy she" },
          { p: "کوای شې", f: "kawáay she" },
        ],
        [
          { p: "کوی شئ", f: "kawáy shey" },
          { p: "کوای شئ", f: "kawáay shey" },
        ],
      ],
      [
        [
          { p: "کوی شې", f: "kawáy she" },
          { p: "کوای شې", f: "kawáay she" },
        ],
        [
          { p: "کوی شئ", f: "kawáy shey" },
          { p: "کوای شئ", f: "kawáay shey" },
        ],
      ],
      [
        [
          { p: "کوی شي", f: "kawáy shee" },
          { p: "کوای شي", f: "kawáay shee" },
        ],
        [
          { p: "کوی شي", f: "kawáy shee" },
          { p: "کوای شي", f: "kawáay shee" },
        ],
      ],
      [
        [
          { p: "کوی شي", f: "kawáy shee" },
          { p: "کوای شي", f: "kawáay shee" },
        ],
        [
          { p: "کوی شي", f: "kawáy shee" },
          { p: "کوای شي", f: "kawáay shee" },
        ],
      ],
    ],
  },
  future: {
    long: [
      [
        [
          { p: "به کولی شم", f: "ba kawúlay shum" },
          { p: "به کولای شم", f: "ba kawúlaay shum" },
        ],
        [
          { p: "به کولی شو", f: "ba kawúlay shoo" },
          { p: "به کولای شو", f: "ba kawúlaay shoo" },
        ],
      ],
      [
        [
          { p: "به کولی شم", f: "ba kawúlay shum" },
          { p: "به کولای شم", f: "ba kawúlaay shum" },
        ],
        [
          { p: "به کولی شو", f: "ba kawúlay shoo" },
          { p: "به کولای شو", f: "ba kawúlaay shoo" },
        ],
      ],
      [
        [
          { p: "به کولی شې", f: "ba kawúlay she" },
          { p: "به کولای شې", f: "ba kawúlaay she" },
        ],
        [
          { p: "به کولی شئ", f: "ba kawúlay shey" },
          { p: "به کولای شئ", f: "ba kawúlaay shey" },
        ],
      ],
      [
        [
          { p: "به کولی شې", f: "ba kawúlay she" },
          { p: "به کولای شې", f: "ba kawúlaay she" },
        ],
        [
          { p: "به کولی شئ", f: "ba kawúlay shey" },
          { p: "به کولای شئ", f: "ba kawúlaay shey" },
        ],
      ],
      [
        [
          { p: "به کولی شي", f: "ba kawúlay shee" },
          { p: "به کولای شي", f: "ba kawúlaay shee" },
        ],
        [
          { p: "به کولی شي", f: "ba kawúlay shee" },
          { p: "به کولای شي", f: "ba kawúlaay shee" },
        ],
      ],
      [
        [
          { p: "به کولی شي", f: "ba kawúlay shee" },
          { p: "به کولای شي", f: "ba kawúlaay shee" },
        ],
        [
          { p: "به کولی شي", f: "ba kawúlay shee" },
          { p: "به کولای شي", f: "ba kawúlaay shee" },
        ],
      ],
    ],
    short: [
      [
        [
          { p: "به کوی شم", f: "ba kawáy shum" },
          { p: "به کوای شم", f: "ba kawáay shum" },
        ],
        [
          { p: "به کوی شو", f: "ba kawáy shoo" },
          { p: "به کوای شو", f: "ba kawáay shoo" },
        ],
      ],
      [
        [
          { p: "به کوی شم", f: "ba kawáy shum" },
          { p: "به کوای شم", f: "ba kawáay shum" },
        ],
        [
          { p: "به کوی شو", f: "ba kawáy shoo" },
          { p: "به کوای شو", f: "ba kawáay shoo" },
        ],
      ],
      [
        [
          { p: "به کوی شې", f: "ba kawáy she" },
          { p: "به کوای شې", f: "ba kawáay she" },
        ],
        [
          { p: "به کوی شئ", f: "ba kawáy shey" },
          { p: "به کوای شئ", f: "ba kawáay shey" },
        ],
      ],
      [
        [
          { p: "به کوی شې", f: "ba kawáy she" },
          { p: "به کوای شې", f: "ba kawáay she" },
        ],
        [
          { p: "به کوی شئ", f: "ba kawáy shey" },
          { p: "به کوای شئ", f: "ba kawáay shey" },
        ],
      ],
      [
        [
          { p: "به کوی شي", f: "ba kawáy shee" },
          { p: "به کوای شي", f: "ba kawáay shee" },
        ],
        [
          { p: "به کوی شي", f: "ba kawáy shee" },
          { p: "به کوای شي", f: "ba kawáay shee" },
        ],
      ],
      [
        [
          { p: "به کوی شي", f: "ba kawáy shee" },
          { p: "به کوای شي", f: "ba kawáay shee" },
        ],
        [
          { p: "به کوی شي", f: "ba kawáy shee" },
          { p: "به کوای شي", f: "ba kawáay shee" },
        ],
      ],
    ],
  },
  past: {
    long: [
      [
        [
          { p: "کولی شوم", f: "kawúlay shwum" },
          { p: "کولای شوم", f: "kawúlaay shwum" },
        ],
        [
          { p: "کولی شو", f: "kawúlay shoo" },
          { p: "کولای شو", f: "kawúlaay shoo" },
        ],
      ],
      [
        [
          { p: "کولی شوم", f: "kawúlay shwum" },
          { p: "کولای شوم", f: "kawúlaay shwum" },
        ],
        [
          { p: "کولی شو", f: "kawúlay shoo" },
          { p: "کولای شو", f: "kawúlaay shoo" },
        ],
      ],
      [
        [
          { p: "کولی شوې", f: "kawúlay shwe" },
          { p: "کولای شوې", f: "kawúlaay shwe" },
        ],
        [
          { p: "کولی شوئ", f: "kawúlay shwey" },
          { p: "کولای شوئ", f: "kawúlaay shwey" },
        ],
      ],
      [
        [
          { p: "کولی شوې", f: "kawúlay shwe" },
          { p: "کولای شوې", f: "kawúlaay shwe" },
        ],
        [
          { p: "کولی شوئ", f: "kawúlay shwey" },
          { p: "کولای شوئ", f: "kawúlaay shwey" },
        ],
      ],
      [
        [
          { p: "کولی شو", f: "kawúlay sho" },
          { p: "کولای شو", f: "kawúlaay sho" },
        ],
        [
          { p: "کولی شول", f: "kawúlay shwul" },
          { p: "کولای شول", f: "kawúlaay shwul" },
          { p: "کولی شو", f: "kawúlay shoo" },
          { p: "کولای شو", f: "kawúlaay shoo" },
        ],
      ],
      [
        [
          { p: "کولی شوه", f: "kawúlay shwa" },
          { p: "کولای شوه", f: "kawúlaay shwa" },
        ],
        [
          { p: "کولی شولې", f: "kawúlay shwule" },
          { p: "کولای شولې", f: "kawúlaay shwule" },
          { p: "کولی شوې", f: "kawúlay shwe" },
          { p: "کولای شوې", f: "kawúlaay shwe" },
        ],
      ],
    ],
    short: [
      [
        [
          { p: "کوی شوم", f: "kawáy shwum" },
          { p: "کوای شوم", f: "kawáay shwum" },
        ],
        [
          { p: "کوی شو", f: "kawáy shoo" },
          { p: "کوای شو", f: "kawáay shoo" },
        ],
      ],
      [
        [
          { p: "کوی شوم", f: "kawáy shwum" },
          { p: "کوای شوم", f: "kawáay shwum" },
        ],
        [
          { p: "کوی شو", f: "kawáy shoo" },
          { p: "کوای شو", f: "kawáay shoo" },
        ],
      ],
      [
        [
          { p: "کوی شوې", f: "kawáy shwe" },
          { p: "کوای شوې", f: "kawáay shwe" },
        ],
        [
          { p: "کوی شوئ", f: "kawáy shwey" },
          { p: "کوای شوئ", f: "kawáay shwey" },
        ],
      ],
      [
        [
          { p: "کوی شوې", f: "kawáy shwe" },
          { p: "کوای شوې", f: "kawáay shwe" },
        ],
        [
          { p: "کوی شوئ", f: "kawáy shwey" },
          { p: "کوای شوئ", f: "kawáay shwey" },
        ],
      ],
      [
        [
          { p: "کوی شو", f: "kawáy sho" },
          { p: "کوای شو", f: "kawáay sho" },
        ],
        [
          { p: "کوی شول", f: "kawáy shwul" },
          { p: "کوای شول", f: "kawáay shwul" },
          { p: "کوی شو", f: "kawáy shoo" },
          { p: "کوای شو", f: "kawáay shoo" },
        ],
      ],
      [
        [
          { p: "کوی شوه", f: "kawáy shwa" },
          { p: "کوای شوه", f: "kawáay shwa" },
        ],
        [
          { p: "کوی شولې", f: "kawáy shwule" },
          { p: "کوای شولې", f: "kawáay shwule" },
          { p: "کوی شوې", f: "kawáy shwe" },
          { p: "کوای شوې", f: "kawáay shwe" },
        ],
      ],
    ],
  },
  habitualPast: {
    long: [
      [
        [
          { p: "به کولی شوم", f: "ba kawúlay shwum" },
          { p: "به کولای شوم", f: "ba kawúlaay shwum" },
        ],
        [
          { p: "به کولی شو", f: "ba kawúlay shoo" },
          { p: "به کولای شو", f: "ba kawúlaay shoo" },
        ],
      ],
      [
        [
          { p: "به کولی شوم", f: "ba kawúlay shwum" },
          { p: "به کولای شوم", f: "ba kawúlaay shwum" },
        ],
        [
          { p: "به کولی شو", f: "ba kawúlay shoo" },
          { p: "به کولای شو", f: "ba kawúlaay shoo" },
        ],
      ],
      [
        [
          { p: "به کولی شوې", f: "ba kawúlay shwe" },
          { p: "به کولای شوې", f: "ba kawúlaay shwe" },
        ],
        [
          { p: "به کولی شوئ", f: "ba kawúlay shwey" },
          { p: "به کولای شوئ", f: "ba kawúlaay shwey" },
        ],
      ],
      [
        [
          { p: "به کولی شوې", f: "ba kawúlay shwe" },
          { p: "به کولای شوې", f: "ba kawúlaay shwe" },
        ],
        [
          { p: "به کولی شوئ", f: "ba kawúlay shwey" },
          { p: "به کولای شوئ", f: "ba kawúlaay shwey" },
        ],
      ],
      [
        [
          { p: "به کولی شو", f: "ba kawúlay sho" },
          { p: "به کولای شو", f: "ba kawúlaay sho" },
        ],
        [
          { p: "به کولی شول", f: "ba kawúlay shwul" },
          { p: "به کولای شول", f: "ba kawúlaay shwul" },
          { p: "به کولی شو", f: "ba kawúlay shoo" },
          { p: "به کولای شو", f: "ba kawúlaay shoo" },
        ],
      ],
      [
        [
          { p: "به کولی شوه", f: "ba kawúlay shwa" },
          { p: "به کولای شوه", f: "ba kawúlaay shwa" },
        ],
        [
          { p: "به کولی شولې", f: "ba kawúlay shwule" },
          { p: "به کولای شولې", f: "ba kawúlaay shwule" },
          { p: "به کولی شوې", f: "ba kawúlay shwe" },
          { p: "به کولای شوې", f: "ba kawúlaay shwe" },
        ],
      ],
    ],
    short: [
      [
        [
          { p: "به کوی شوم", f: "ba kawáy shwum" },
          { p: "به کوای شوم", f: "ba kawáay shwum" },
        ],
        [
          { p: "به کوی شو", f: "ba kawáy shoo" },
          { p: "به کوای شو", f: "ba kawáay shoo" },
        ],
      ],
      [
        [
          { p: "به کوی شوم", f: "ba kawáy shwum" },
          { p: "به کوای شوم", f: "ba kawáay shwum" },
        ],
        [
          { p: "به کوی شو", f: "ba kawáy shoo" },
          { p: "به کوای شو", f: "ba kawáay shoo" },
        ],
      ],
      [
        [
          { p: "به کوی شوې", f: "ba kawáy shwe" },
          { p: "به کوای شوې", f: "ba kawáay shwe" },
        ],
        [
          { p: "به کوی شوئ", f: "ba kawáy shwey" },
          { p: "به کوای شوئ", f: "ba kawáay shwey" },
        ],
      ],
      [
        [
          { p: "به کوی شوې", f: "ba kawáy shwe" },
          { p: "به کوای شوې", f: "ba kawáay shwe" },
        ],
        [
          { p: "به کوی شوئ", f: "ba kawáy shwey" },
          { p: "به کوای شوئ", f: "ba kawáay shwey" },
        ],
      ],
      [
        [
          { p: "به کوی شو", f: "ba kawáy sho" },
          { p: "به کوای شو", f: "ba kawáay sho" },
        ],
        [
          { p: "به کوی شول", f: "ba kawáy shwul" },
          { p: "به کوای شول", f: "ba kawáay shwul" },
          { p: "به کوی شو", f: "ba kawáy shoo" },
          { p: "به کوای شو", f: "ba kawáay shoo" },
        ],
      ],
      [
        [
          { p: "به کوی شوه", f: "ba kawáy shwa" },
          { p: "به کوای شوه", f: "ba kawáay shwa" },
        ],
        [
          { p: "به کوی شولې", f: "ba kawáy shwule" },
          { p: "به کوای شولې", f: "ba kawáay shwule" },
          { p: "به کوی شوې", f: "ba kawáy shwe" },
          { p: "به کوای شوې", f: "ba kawáay shwe" },
        ],
      ],
    ],
  },
  hypotheticalPast: {
    long: [
      [
        [
          { p: "کولی شوای", f: "kawúlay shwaay" },
          { p: "کولی شوی", f: "kawúlay shway" },
          { p: "کولای شوای", f: "kawúlaay shwaay" },
        ],
        [
          { p: "کولی شوای", f: "kawúlay shwaay" },
          { p: "کولی شوی", f: "kawúlay shway" },
          { p: "کولای شوای", f: "kawúlaay shwaay" },
        ],
      ],
      [
        [
          { p: "کولی شوای", f: "kawúlay shwaay" },
          { p: "کولی شوی", f: "kawúlay shway" },
          { p: "کولای شوای", f: "kawúlaay shwaay" },
        ],
        [
          { p: "کولی شوای", f: "kawúlay shwaay" },
          { p: "کولی شوی", f: "kawúlay shway" },
          { p: "کولای شوای", f: "kawúlaay shwaay" },
        ],
      ],
      [
        [
          { p: "کولی شوای", f: "kawúlay shwaay" },
          { p: "کولی شوی", f: "kawúlay shway" },
          { p: "کولای شوای", f: "kawúlaay shwaay" },
        ],
        [
          { p: "کولی شوای", f: "kawúlay shwaay" },
          { p: "کولی شوی", f: "kawúlay shway" },
          { p: "کولای شوای", f: "kawúlaay shwaay" },
        ],
      ],
      [
        [
          { p: "کولی شوای", f: "kawúlay shwaay" },
          { p: "کولی شوی", f: "kawúlay shway" },
          { p: "کولای شوای", f: "kawúlaay shwaay" },
        ],
        [
          { p: "کولی شوای", f: "kawúlay shwaay" },
          { p: "کولی شوی", f: "kawúlay shway" },
          { p: "کولای شوای", f: "kawúlaay shwaay" },
        ],
      ],
      [
        [
          { p: "کولی شوای", f: "kawúlay shwaay" },
          { p: "کولی شوی", f: "kawúlay shway" },
          { p: "کولای شوای", f: "kawúlaay shwaay" },
        ],
        [
          { p: "کولی شوای", f: "kawúlay shwaay" },
          { p: "کولی شوی", f: "kawúlay shway" },
          { p: "کولای شوای", f: "kawúlaay shwaay" },
        ],
      ],
      [
        [
          { p: "کولی شوای", f: "kawúlay shwaay" },
          { p: "کولی شوی", f: "kawúlay shway" },
          { p: "کولای شوای", f: "kawúlaay shwaay" },
        ],
        [
          { p: "کولی شوای", f: "kawúlay shwaay" },
          { p: "کولی شوی", f: "kawúlay shway" },
          { p: "کولای شوای", f: "kawúlaay shwaay" },
        ],
      ],
    ],
    short: [
      [
        [
          { p: "کوی شوای", f: "kawáy shwaay" },
          { p: "کوی شوی", f: "kawáy shway" },
          { p: "کوای شوای", f: "kawáay shwaay" },
        ],
        [
          { p: "کوی شوای", f: "kawáy shwaay" },
          { p: "کوی شوی", f: "kawáy shway" },
          { p: "کوای شوای", f: "kawáay shwaay" },
        ],
      ],
      [
        [
          { p: "کوی شوای", f: "kawáy shwaay" },
          { p: "کوی شوی", f: "kawáy shway" },
          { p: "کوای شوای", f: "kawáay shwaay" },
        ],
        [
          { p: "کوی شوای", f: "kawáy shwaay" },
          { p: "کوی شوی", f: "kawáy shway" },
          { p: "کوای شوای", f: "kawáay shwaay" },
        ],
      ],
      [
        [
          { p: "کوی شوای", f: "kawáy shwaay" },
          { p: "کوی شوی", f: "kawáy shway" },
          { p: "کوای شوای", f: "kawáay shwaay" },
        ],
        [
          { p: "کوی شوای", f: "kawáy shwaay" },
          { p: "کوی شوی", f: "kawáy shway" },
          { p: "کوای شوای", f: "kawáay shwaay" },
        ],
      ],
      [
        [
          { p: "کوی شوای", f: "kawáy shwaay" },
          { p: "کوی شوی", f: "kawáy shway" },
          { p: "کوای شوای", f: "kawáay shwaay" },
        ],
        [
          { p: "کوی شوای", f: "kawáy shwaay" },
          { p: "کوی شوی", f: "kawáy shway" },
          { p: "کوای شوای", f: "kawáay shwaay" },
        ],
      ],
      [
        [
          { p: "کوی شوای", f: "kawáy shwaay" },
          { p: "کوی شوی", f: "kawáy shway" },
          { p: "کوای شوای", f: "kawáay shwaay" },
        ],
        [
          { p: "کوی شوای", f: "kawáy shwaay" },
          { p: "کوی شوی", f: "kawáy shway" },
          { p: "کوای شوای", f: "kawáay shwaay" },
        ],
      ],
      [
        [
          { p: "کوی شوای", f: "kawáy shwaay" },
          { p: "کوی شوی", f: "kawáy shway" },
          { p: "کوای شوای", f: "kawáay shwaay" },
        ],
        [
          { p: "کوی شوای", f: "kawáy shwaay" },
          { p: "کوی شوی", f: "kawáy shway" },
          { p: "کوای شوای", f: "kawáay shwaay" },
        ],
      ],
    ],
  },
};

const kawulPerfect: T.PerfectContent = {
  halfPerfect: [
    [[{ p: "کړی", f: "kúRay" }], [{ p: "کړي", f: "kúRee" }]],
    [[{ p: "کړې", f: "kúRe" }], [{ p: "کړې", f: "kúRe" }]],
    [[{ p: "کړی", f: "kúRay" }], [{ p: "کړي", f: "kúRee" }]],
    [[{ p: "کړې", f: "kúRe" }], [{ p: "کړې", f: "kúRe" }]],
    [[{ p: "کړی", f: "kúRay" }], [{ p: "کړي", f: "kúRee" }]],
    [[{ p: "کړې", f: "kúRe" }], [{ p: "کړې", f: "kúRe" }]],
  ],
  past: [
    [[{ p: "کړی وم", f: "kúRay wum" }], [{ p: "کړي وو", f: "kúRee woo" }]],
    [[{ p: "کړې وم", f: "kúRe wum" }], [{ p: "کړې وو", f: "kúRe woo" }]],
    [[{ p: "کړی وې", f: "kúRay we" }], [{ p: "کړي وئ", f: "kúRee wey" }]],
    [[{ p: "کړې وې", f: "kúRe we" }], [{ p: "کړې وئ", f: "kúRe wey" }]],
    [[{ p: "کړی و", f: "kúRay wo" }], [{ p: "کړي وو", f: "kúRee woo" }]],
    [[{ p: "کړې وه", f: "kúRe wa" }], [{ p: "کړې وې", f: "kúRe we" }]],
  ],
  present: [
    [[{ p: "کړی یم", f: "kúRay yum" }], [{ p: "کړي یو", f: "kúRee yoo" }]],
    [[{ p: "کړې یم", f: "kúRe yum" }], [{ p: "کړې یو", f: "kúRe yoo" }]],
    [[{ p: "کړی یې", f: "kúRay ye" }], [{ p: "کړي یئ", f: "kúRee yey" }]],
    [[{ p: "کړې یې", f: "kúRe ye" }], [{ p: "کړې یئ", f: "kúRe yey" }]],
    [[{ p: "کړی دی", f: "kúRay day" }], [{ p: "کړي دي", f: "kúRee dee" }]],
    [[{ p: "کړې ده", f: "kúRe da" }], [{ p: "کړې دي", f: "kúRe dee" }]],
  ],
  habitual: [
    [[{ p: "کړی یم", f: "kúRay yum" }], [{ p: "کړي یو", f: "kúRee yoo" }]],
    [[{ p: "کړې یم", f: "kúRe yum" }], [{ p: "کړې یو", f: "kúRe yoo" }]],
    [[{ p: "کړی یې", f: "kúRay ye" }], [{ p: "کړي یئ", f: "kúRee yey" }]],
    [[{ p: "کړې یې", f: "kúRe ye" }], [{ p: "کړې یئ", f: "kúRe yey" }]],
    [[{ p: "کړی وي", f: "kúRay wee" }], [{ p: "کړي وي", f: "kúRee wee" }]],
    [[{ p: "کړې وي", f: "kúRe wee" }], [{ p: "کړې وي", f: "kúRe wee" }]],
  ],
  subjunctive: [
    [[{ p: "کړی وم", f: "kúRay wum" }], [{ p: "کړي وو", f: "kúRee woo" }]],
    [[{ p: "کړې وم", f: "kúRe wum" }], [{ p: "کړې وو", f: "kúRe woo" }]],
    [[{ p: "کړی وې", f: "kúRay we" }], [{ p: "کړي وئ", f: "kúRee wey" }]],
    [[{ p: "کړې وې", f: "kúRe we" }], [{ p: "کړې وئ", f: "kúRe wey" }]],
    [[{ p: "کړی وي", f: "kúRay wee" }], [{ p: "کړي وي", f: "kúRee wee" }]],
    [[{ p: "کړې وي", f: "kúRe wee" }], [{ p: "کړې وي", f: "kúRe wee" }]],
  ],
  future: [
    [
      [{ p: "به کړی یم", f: "ba kúRay yum" }],
      [{ p: "به کړي یو", f: "ba kúRee yoo" }],
    ],
    [
      [{ p: "به کړې یم", f: "ba kúRe yum" }],
      [{ p: "به کړې یو", f: "ba kúRe yoo" }],
    ],
    [
      [{ p: "به کړی یې", f: "ba kúRay ye" }],
      [{ p: "به کړي یئ", f: "ba kúRee yey" }],
    ],
    [
      [{ p: "به کړې یې", f: "ba kúRe ye" }],
      [{ p: "به کړې یئ", f: "ba kúRe yey" }],
    ],
    [
      [{ p: "به کړی وي", f: "ba kúRay wee" }],
      [{ p: "به کړي وي", f: "ba kúRee wee" }],
    ],
    [
      [{ p: "به کړې وي", f: "ba kúRe wee" }],
      [{ p: "به کړې وي", f: "ba kúRe wee" }],
    ],
  ],
  wouldBe: [
    [
      [{ p: "به کړی وم", f: "ba kúRay wum" }],
      [{ p: "به کړي وو", f: "ba kúRee woo" }],
    ],
    [
      [{ p: "به کړې وم", f: "ba kúRe wum" }],
      [{ p: "به کړې وو", f: "ba kúRe woo" }],
    ],
    [
      [{ p: "به کړی وې", f: "ba kúRay we" }],
      [{ p: "به کړي وئ", f: "ba kúRee wey" }],
    ],
    [
      [{ p: "به کړې وې", f: "ba kúRe we" }],
      [{ p: "به کړې وئ", f: "ba kúRe wey" }],
    ],
    [
      [{ p: "به کړی و", f: "ba kúRay wo" }],
      [{ p: "به کړي وو", f: "ba kúRee woo" }],
    ],
    [
      [{ p: "به کړې وه", f: "ba kúRe wa" }],
      [{ p: "به کړې وې", f: "ba kúRe we" }],
    ],
  ],
  pastSubjunctive: [
    [
      [
        { p: "کړی وای", f: "kúRay waay" },
        { p: "کړی وی", f: "kúRay way" },
      ],
      [
        { p: "کړی وای", f: "kúRay waay" },
        { p: "کړی وی", f: "kúRay way" },
      ],
    ],
    [
      [
        { p: "کړې وای", f: "kúRe waay" },
        { p: "کړې وی", f: "kúRe way" },
      ],
      [
        { p: "کړې وای", f: "kúRe waay" },
        { p: "کړې وی", f: "kúRe way" },
      ],
    ],
    [
      [
        { p: "کړی وای", f: "kúRay waay" },
        { p: "کړی وی", f: "kúRay way" },
      ],
      [
        { p: "کړی وای", f: "kúRay waay" },
        { p: "کړی وی", f: "kúRay way" },
      ],
    ],
    [
      [
        { p: "کړې وای", f: "kúRe waay" },
        { p: "کړې وی", f: "kúRe way" },
      ],
      [
        { p: "کړې وای", f: "kúRe waay" },
        { p: "کړې وی", f: "kúRe way" },
      ],
    ],
    [
      [
        { p: "کړی وای", f: "kúRay waay" },
        { p: "کړی وی", f: "kúRay way" },
      ],
      [
        { p: "کړی وای", f: "kúRay waay" },
        { p: "کړی وی", f: "kúRay way" },
      ],
    ],
    [
      [
        { p: "کړې وای", f: "kúRe waay" },
        { p: "کړې وی", f: "kúRe way" },
      ],
      [
        { p: "کړې وای", f: "kúRe waay" },
        { p: "کړې وی", f: "kúRe way" },
      ],
    ],
  ],
  wouldHaveBeen: [
    [
      [
        { p: "به کړی وای", f: "ba kúRay waay" },
        { p: "به کړی وی", f: "ba kúRay way" },
      ],
      [
        { p: "به کړی وای", f: "ba kúRay waay" },
        { p: "به کړی وی", f: "ba kúRay way" },
      ],
    ],
    [
      [
        { p: "به کړې وای", f: "ba kúRe waay" },
        { p: "به کړې وی", f: "ba kúRe way" },
      ],
      [
        { p: "به کړې وای", f: "ba kúRe waay" },
        { p: "به کړې وی", f: "ba kúRe way" },
      ],
    ],
    [
      [
        { p: "به کړی وای", f: "ba kúRay waay" },
        { p: "به کړی وی", f: "ba kúRay way" },
      ],
      [
        { p: "به کړی وای", f: "ba kúRay waay" },
        { p: "به کړی وی", f: "ba kúRay way" },
      ],
    ],
    [
      [
        { p: "به کړې وای", f: "ba kúRe waay" },
        { p: "به کړې وی", f: "ba kúRe way" },
      ],
      [
        { p: "به کړې وای", f: "ba kúRe waay" },
        { p: "به کړې وی", f: "ba kúRe way" },
      ],
    ],
    [
      [
        { p: "به کړی وای", f: "ba kúRay waay" },
        { p: "به کړی وی", f: "ba kúRay way" },
      ],
      [
        { p: "به کړی وای", f: "ba kúRay waay" },
        { p: "به کړی وی", f: "ba kúRay way" },
      ],
    ],
    [
      [
        { p: "به کړې وای", f: "ba kúRe waay" },
        { p: "به کړې وی", f: "ba kúRe way" },
      ],
      [
        { p: "به کړې وای", f: "ba kúRe waay" },
        { p: "به کړې وی", f: "ba kúRe way" },
      ],
    ],
  ],
};

const kawulHypothetical: T.VerbForm = {
  short: [
    [
      [
        { p: "کوای", f: "kawaay" },
        { p: "کوی", f: "kawáy" },
      ],
      [
        { p: "کوای", f: "kawaay" },
        { p: "کوی", f: "kawáy" },
      ],
    ],
    [
      [
        { p: "کوای", f: "kawaay" },
        { p: "کوی", f: "kawáy" },
      ],
      [
        { p: "کوای", f: "kawaay" },
        { p: "کوی", f: "kawáy" },
      ],
    ],
    [
      [
        { p: "کوای", f: "kawaay" },
        { p: "کوی", f: "kawáy" },
      ],
      [
        { p: "کوای", f: "kawaay" },
        { p: "کوی", f: "kawáy" },
      ],
    ],
    [
      [
        { p: "کوای", f: "kawaay" },
        { p: "کوی", f: "kawáy" },
      ],
      [
        { p: "کوای", f: "kawaay" },
        { p: "کوی", f: "kawáy" },
      ],
    ],
    [
      [
        { p: "کوای", f: "kawaay" },
        { p: "کوی", f: "kawáy" },
      ],
      [
        { p: "کوای", f: "kawaay" },
        { p: "کوی", f: "kawáy" },
      ],
    ],
    [
      [
        { p: "کوای", f: "kawaay" },
        { p: "کوی", f: "kawáy" },
      ],
      [
        { p: "کوای", f: "kawaay" },
        { p: "کوی", f: "kawáy" },
      ],
    ],
  ],
  long: [
    [
      [
        { p: "کولای", f: "kawúlaay" },
        { p: "کولی", f: "kawúlay" },
      ],
      [
        { p: "کولای", f: "kawúlaay" },
        { p: "کولی", f: "kawúlay" },
      ],
    ],
    [
      [
        { p: "کولای", f: "kawúlaay" },
        { p: "کولی", f: "kawúlay" },
      ],
      [
        { p: "کولای", f: "kawúlaay" },
        { p: "کولی", f: "kawúlay" },
      ],
    ],
    [
      [
        { p: "کولای", f: "kawúlaay" },
        { p: "کولی", f: "kawúlay" },
      ],
      [
        { p: "کولای", f: "kawúlaay" },
        { p: "کولی", f: "kawúlay" },
      ],
    ],
    [
      [
        { p: "کولای", f: "kawúlaay" },
        { p: "کولی", f: "kawúlay" },
      ],
      [
        { p: "کولای", f: "kawúlaay" },
        { p: "کولی", f: "kawúlay" },
      ],
    ],
    [
      [
        { p: "کولای", f: "kawúlaay" },
        { p: "کولی", f: "kawúlay" },
      ],
      [
        { p: "کولای", f: "kawúlaay" },
        { p: "کولی", f: "kawúlay" },
      ],
    ],
    [
      [
        { p: "کولای", f: "kawúlaay" },
        { p: "کولی", f: "kawúlay" },
      ],
      [
        { p: "کولای", f: "kawúlaay" },
        { p: "کولی", f: "kawúlay" },
      ],
    ],
  ],
};

export const kawulStat: T.VerbConjugation = {
  info: {
    entry: {
      entry: {
        ts: 1579015359582,
        i: 10579,
        p: "کول",
        f: "kawúl",
        g: "kawúl",
        e: 'to make ____ ____ (as in "He\'s making me angry.")',
        c: "v. trans. irreg.",
        ssp: "کړ",
        ssf: "kR",
        prp: "کړل",
        prf: "kRul",
        pprtp: "کړی",
        pprtf: "kúRay",
        noOo: true,
        ec: "make,makes,making,made,made",
        ep: "_____",
      } as T.VerbDictionaryEntry,
    },
    transitivity: "transitive",
    type: "simple",
    yulEnding: false,
    root: {
      imperfective: {
        long: { p: "کول", f: "kawúl" },
        short: { p: "کو", f: "kaw" },
      },
      perfective: {
        long: { p: "کړل", f: "kRul" },
        short: { p: "کړ", f: "kR" },
        mini: { p: "ک", f: "k" },
      },
    },
    stem: {
      imperfective: { p: "کو", f: "kaw" },
      perfective: {
        long: { p: "کړ", f: "kR" },
        short: { p: "ک", f: "k" },
      },
    },
    participle: {
      present: { p: "کوونکی", f: "kawóonkay" },
      past: { p: "کړی", f: "kúRay" },
    },
    idiosyncraticThirdMascSing: {
      perfective: { p: "کړ", f: "kuR" },
      imperfective: { p: "کاوه", f: "kaawú" },
    },
  },
  imperfective: {
    nonImperative: [
      [[{ p: "کوم", f: "kawúm" }], [{ p: "کوو", f: "kawóo" }]],
      [[{ p: "کوم", f: "kawúm" }], [{ p: "کوو", f: "kawóo" }]],
      [[{ p: "کوې", f: "kawé" }], [{ p: "کوئ", f: "kawéy" }]],
      [[{ p: "کوې", f: "kawé" }], [{ p: "کوئ", f: "kawéy" }]],
      [[{ p: "کوي", f: "kawée" }], [{ p: "کوي", f: "kawée" }]],
      [[{ p: "کوي", f: "kawée" }], [{ p: "کوي", f: "kawée" }]],
    ],
    future: [
      [[{ p: "به کوم", f: "ba kawúm" }], [{ p: "به کوو", f: "ba kawóo" }]],
      [[{ p: "به کوم", f: "ba kawúm" }], [{ p: "به کوو", f: "ba kawóo" }]],
      [[{ p: "به کوې", f: "ba kawé" }], [{ p: "به کوئ", f: "ba kawéy" }]],
      [[{ p: "به کوې", f: "ba kawé" }], [{ p: "به کوئ", f: "ba kawéy" }]],
      [[{ p: "به کوي", f: "ba kawée" }], [{ p: "به کوي", f: "ba kawée" }]],
      [[{ p: "به کوي", f: "ba kawée" }], [{ p: "به کوي", f: "ba kawée" }]],
    ],
    imperative: [
      [[{ p: "کوه", f: "kawá" }], [{ p: "کوئ", f: "kawéy" }]],
      [[{ p: "کوه", f: "kawá" }], [{ p: "کوئ", f: "kawéy" }]],
    ],
    past: {
      short: [
        [[{ p: "کوم", f: "kawúm" }], [{ p: "کوو", f: "kawóo" }]],
        [[{ p: "کوم", f: "kawúm" }], [{ p: "کوو", f: "kawóo" }]],
        [[{ p: "کوې", f: "kawé" }], [{ p: "کوئ", f: "kawéy" }]],
        [[{ p: "کوې", f: "kawé" }], [{ p: "کوئ", f: "kawéy" }]],
        [[{ p: "کاوه", f: "kaawú" }], [{ p: "کول", f: "kawúl" }]],
        [[{ p: "کوه", f: "kawá" }], [{ p: "کوې", f: "kawé" }]],
      ],
      long: [
        [[{ p: "کولم", f: "kawúlum" }], [{ p: "کولو", f: "kawúloo" }]],
        [[{ p: "کولم", f: "kawúlum" }], [{ p: "کولو", f: "kawúloo" }]],
        [[{ p: "کولې", f: "kawúle" }], [{ p: "کولئ", f: "kawúley" }]],
        [[{ p: "کولې", f: "kawúle" }], [{ p: "کولئ", f: "kawúley" }]],
        [
          [
            { p: "کوله", f: "kawúlu" },
            { p: "کولو", f: "kawúlo" },
          ],
          [{ p: "کول", f: "kawúl" }],
        ],
        [[{ p: "کوله", f: "kawúla" }], [{ p: "کولې", f: "kawúle" }]],
      ],
    },
    habitualPast: {
      short: [
        [[{ p: "به کوم", f: "ba kawúm" }], [{ p: "به کوو", f: "ba kawóo" }]],
        [[{ p: "به کوم", f: "ba kawúm" }], [{ p: "به کوو", f: "ba kawóo" }]],
        [[{ p: "به کوې", f: "ba kawé" }], [{ p: "به کوئ", f: "ba kawéy" }]],
        [[{ p: "به کوې", f: "ba kawé" }], [{ p: "به کوئ", f: "ba kawéy" }]],
        [[{ p: "به کاوه", f: "ba kaawú" }], [{ p: "به کول", f: "ba kawúl" }]],
        [[{ p: "به کوه", f: "ba kawá" }], [{ p: "به کوې", f: "ba kawé" }]],
      ],
      long: [
        [
          [{ p: "به کولم", f: "ba kawúlum" }],
          [{ p: "به کولو", f: "ba kawúloo" }],
        ],
        [
          [{ p: "به کولم", f: "ba kawúlum" }],
          [{ p: "به کولو", f: "ba kawúloo" }],
        ],
        [
          [{ p: "به کولې", f: "ba kawúle" }],
          [{ p: "به کولئ", f: "ba kawúley" }],
        ],
        [
          [{ p: "به کولې", f: "ba kawúle" }],
          [{ p: "به کولئ", f: "ba kawúley" }],
        ],
        [
          [
            { p: "به کوله", f: "ba kawúlu" },
            { p: "به کولو", f: "ba kawúlo" },
          ],
          [{ p: "به کول", f: "ba kawúl" }],
        ],
        [
          [{ p: "به کوله", f: "ba kawúla" }],
          [{ p: "به کولې", f: "ba kawúle" }],
        ],
      ],
    },
    modal: kawulImperfectiveModal,
  },
  perfective: {
    nonImperative: {
      long: [
        [[{ p: "کړم", f: "kRum" }], [{ p: "کړو", f: "kRoo" }]],
        [[{ p: "کړم", f: "kRum" }], [{ p: "کړو", f: "kRoo" }]],
        [[{ p: "کړې", f: "kRe" }], [{ p: "کړئ", f: "kRey" }]],
        [[{ p: "کړې", f: "kRe" }], [{ p: "کړئ", f: "kRey" }]],
        [[{ p: "کړي", f: "kRee" }], [{ p: "کړي", f: "kRee" }]],
        [[{ p: "کړي", f: "kRee" }], [{ p: "کړي", f: "kRee" }]],
      ],
      short: [
        [[{ p: "کم", f: "kum" }], [{ p: "کو", f: "koo" }]],
        [[{ p: "کم", f: "kum" }], [{ p: "کو", f: "koo" }]],
        [[{ p: "کې", f: "ke" }], [{ p: "کئ", f: "key" }]],
        [[{ p: "کې", f: "ke" }], [{ p: "کئ", f: "key" }]],
        [[{ p: "کي", f: "kee" }], [{ p: "کي", f: "kee" }]],
        [[{ p: "کي", f: "kee" }], [{ p: "کي", f: "kee" }]],
      ],
    },
    future: {
      long: [
        [[{ p: "به کړم", f: "ba kRum" }], [{ p: "به کړو", f: "ba kRoo" }]],
        [[{ p: "به کړم", f: "ba kRum" }], [{ p: "به کړو", f: "ba kRoo" }]],
        [[{ p: "به کړې", f: "ba kRe" }], [{ p: "به کړئ", f: "ba kRey" }]],
        [[{ p: "به کړې", f: "ba kRe" }], [{ p: "به کړئ", f: "ba kRey" }]],
        [[{ p: "به کړي", f: "ba kRee" }], [{ p: "به کړي", f: "ba kRee" }]],
        [[{ p: "به کړي", f: "ba kRee" }], [{ p: "به کړي", f: "ba kRee" }]],
      ],
      short: [
        [[{ p: "به کم", f: "ba kum" }], [{ p: "به کو", f: "ba koo" }]],
        [[{ p: "به کم", f: "ba kum" }], [{ p: "به کو", f: "ba koo" }]],
        [[{ p: "به کې", f: "ba ke" }], [{ p: "به کئ", f: "ba key" }]],
        [[{ p: "به کې", f: "ba ke" }], [{ p: "به کئ", f: "ba key" }]],
        [[{ p: "به کي", f: "ba kee" }], [{ p: "به کي", f: "ba kee" }]],
        [[{ p: "به کي", f: "ba kee" }], [{ p: "به کي", f: "ba kee" }]],
      ],
    },
    imperative: {
      long: [
        [[{ p: "کړه", f: "kRa" }], [{ p: "کړئ", f: "kRey" }]],
        [[{ p: "کړه", f: "kRa" }], [{ p: "کړئ", f: "kRey" }]],
      ],
      short: [
        [[{ p: "که", f: "ka" }], [{ p: "کئ", f: "key" }]],
        [[{ p: "که", f: "ka" }], [{ p: "کئ", f: "key" }]],
      ],
    },
    past: {
      mini: [
        [[{ p: "کم", f: "kum" }], [{ p: "کو", f: "koo" }]],
        [[{ p: "کم", f: "kum" }], [{ p: "کو", f: "koo" }]],
        [[{ p: "کې", f: "ke" }], [{ p: "کئ", f: "key" }]],
        [[{ p: "کې", f: "ke" }], [{ p: "کئ", f: "key" }]],
        [
          [
            { p: "که", f: "ku" },
            { p: "کو", f: "ko" },
          ],
          [
            { p: "کړل", f: "kRul" },
            { p: "کو", f: "koo" },
          ],
        ],
        [[{ p: "که", f: "ka" }], [{ p: "کې", f: "ke" }]],
      ],
      short: [
        [[{ p: "کړم", f: "kRum" }], [{ p: "کړو", f: "kRoo" }]],
        [[{ p: "کړم", f: "kRum" }], [{ p: "کړو", f: "kRoo" }]],
        [[{ p: "کړې", f: "kRe" }], [{ p: "کړئ", f: "kRey" }]],
        [[{ p: "کړې", f: "kRe" }], [{ p: "کړئ", f: "kRey" }]],
        [
          [
            { p: "کړه", f: "kRu" },
            { p: "کړو", f: "kRo" },
            { p: "کړ", f: "kuR" },
          ],
          [
            { p: "کړل", f: "kRul" },
            { p: "کړو", f: "kRoo" },
          ],
        ],
        [[{ p: "کړه", f: "kRa" }], [{ p: "کړې", f: "kRe" }]],
      ],
      long: [
        [[{ p: "کړلم", f: "kRulum" }], [{ p: "کړلو", f: "kRuloo" }]],
        [[{ p: "کړلم", f: "kRulum" }], [{ p: "کړلو", f: "kRuloo" }]],
        [[{ p: "کړلې", f: "kRule" }], [{ p: "کړلئ", f: "kRuley" }]],
        [[{ p: "کړلې", f: "kRule" }], [{ p: "کړلئ", f: "kRuley" }]],
        [
          [{ p: "کړلو", f: "kRulo" }],
          [
            { p: "کړل", f: "kRul" },
            { p: "کړلو", f: "kRuloo" },
          ],
        ],
        [[{ p: "کړله", f: "kRula" }], [{ p: "کړلې", f: "kRule" }]],
      ],
    },
    habitualPast: {
      mini: [
        [[{ p: "به کم", f: "ba kum" }], [{ p: "به کو", f: "ba koo" }]],
        [[{ p: "به کم", f: "ba kum" }], [{ p: "به کو", f: "ba koo" }]],
        [[{ p: "به کې", f: "ba ke" }], [{ p: "به کئ", f: "ba key" }]],
        [[{ p: "به کې", f: "ba ke" }], [{ p: "به کئ", f: "ba key" }]],
        [
          [
            { p: "به که", f: "ba ku" },
            { p: "به کو", f: "ba ko" },
          ],
          [
            { p: "به کړل", f: "ba kRul" },
            { p: "به کو", f: "ba koo" },
          ],
        ],
        [[{ p: "به که", f: "ba ka" }], [{ p: "به کې", f: "ba ke" }]],
      ],
      short: [
        [[{ p: "به کړم", f: "ba kRum" }], [{ p: "به کړو", f: "ba kRoo" }]],
        [[{ p: "به کړم", f: "ba kRum" }], [{ p: "به کړو", f: "ba kRoo" }]],
        [[{ p: "به کړې", f: "ba kRe" }], [{ p: "به کړئ", f: "ba kRey" }]],
        [[{ p: "به کړې", f: "ba kRe" }], [{ p: "به کړئ", f: "ba kRey" }]],
        [
          [
            { p: "به کړه", f: "ba kRu" },
            { p: "به کړو", f: "ba kRo" },
            { p: "به کړ", f: "ba kuR" },
          ],
          [
            { p: "به کړل", f: "ba kRul" },
            { p: "به کړو", f: "ba kRoo" },
          ],
        ],
        [[{ p: "به کړه", f: "ba kRa" }], [{ p: "به کړې", f: "ba kRe" }]],
      ],
      long: [
        [
          [{ p: "به کړلم", f: "ba kRulum" }],
          [{ p: "به کړلو", f: "ba kRuloo" }],
        ],
        [
          [{ p: "به کړلم", f: "ba kRulum" }],
          [{ p: "به کړلو", f: "ba kRuloo" }],
        ],
        [[{ p: "به کړلې", f: "ba kRule" }], [{ p: "به کړلئ", f: "ba kRuley" }]],
        [[{ p: "به کړلې", f: "ba kRule" }], [{ p: "به کړلئ", f: "ba kRuley" }]],
        [
          [{ p: "به کړلو", f: "ba kRulo" }],
          [
            { p: "به کړل", f: "ba kRul" },
            { p: "به کړلو", f: "ba kRuloo" },
          ],
        ],
        [[{ p: "به کړله", f: "ba kRula" }], [{ p: "به کړلې", f: "ba kRule" }]],
      ],
    },
    modal: {
      nonImperative: {
        long: [
          [
            [
              { p: "کړلی شم", f: "kRúlay shum" },
              { p: "کړلای شم", f: "kRúlaay shum" },
            ],
            [
              { p: "کړلی شو", f: "kRúlay shoo" },
              { p: "کړلای شو", f: "kRúlaay shoo" },
            ],
          ],
          [
            [
              { p: "کړلی شم", f: "kRúlay shum" },
              { p: "کړلای شم", f: "kRúlaay shum" },
            ],
            [
              { p: "کړلی شو", f: "kRúlay shoo" },
              { p: "کړلای شو", f: "kRúlaay shoo" },
            ],
          ],
          [
            [
              { p: "کړلی شې", f: "kRúlay she" },
              { p: "کړلای شې", f: "kRúlaay she" },
            ],
            [
              { p: "کړلی شئ", f: "kRúlay shey" },
              { p: "کړلای شئ", f: "kRúlaay shey" },
            ],
          ],
          [
            [
              { p: "کړلی شې", f: "kRúlay she" },
              { p: "کړلای شې", f: "kRúlaay she" },
            ],
            [
              { p: "کړلی شئ", f: "kRúlay shey" },
              { p: "کړلای شئ", f: "kRúlaay shey" },
            ],
          ],
          [
            [
              { p: "کړلی شي", f: "kRúlay shee" },
              { p: "کړلای شي", f: "kRúlaay shee" },
            ],
            [
              { p: "کړلی شي", f: "kRúlay shee" },
              { p: "کړلای شي", f: "kRúlaay shee" },
            ],
          ],
          [
            [
              { p: "کړلی شي", f: "kRúlay shee" },
              { p: "کړلای شي", f: "kRúlaay shee" },
            ],
            [
              { p: "کړلی شي", f: "kRúlay shee" },
              { p: "کړلای شي", f: "kRúlaay shee" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "کړی شم", f: "kRáy shum" },
              { p: "کړای شم", f: "kRáay shum" },
            ],
            [
              { p: "کړی شو", f: "kRáy shoo" },
              { p: "کړای شو", f: "kRáay shoo" },
            ],
          ],
          [
            [
              { p: "کړی شم", f: "kRáy shum" },
              { p: "کړای شم", f: "kRáay shum" },
            ],
            [
              { p: "کړی شو", f: "kRáy shoo" },
              { p: "کړای شو", f: "kRáay shoo" },
            ],
          ],
          [
            [
              { p: "کړی شې", f: "kRáy she" },
              { p: "کړای شې", f: "kRáay she" },
            ],
            [
              { p: "کړی شئ", f: "kRáy shey" },
              { p: "کړای شئ", f: "kRáay shey" },
            ],
          ],
          [
            [
              { p: "کړی شې", f: "kRáy she" },
              { p: "کړای شې", f: "kRáay she" },
            ],
            [
              { p: "کړی شئ", f: "kRáy shey" },
              { p: "کړای شئ", f: "kRáay shey" },
            ],
          ],
          [
            [
              { p: "کړی شي", f: "kRáy shee" },
              { p: "کړای شي", f: "kRáay shee" },
            ],
            [
              { p: "کړی شي", f: "kRáy shee" },
              { p: "کړای شي", f: "kRáay shee" },
            ],
          ],
          [
            [
              { p: "کړی شي", f: "kRáy shee" },
              { p: "کړای شي", f: "kRáay shee" },
            ],
            [
              { p: "کړی شي", f: "kRáy shee" },
              { p: "کړای شي", f: "kRáay shee" },
            ],
          ],
        ],
      },
      future: {
        long: [
          [
            [
              { p: "به کړلی شم", f: "ba kRúlay shum" },
              { p: "به کړلای شم", f: "ba kRúlaay shum" },
            ],
            [
              { p: "به کړلی شو", f: "ba kRúlay shoo" },
              { p: "به کړلای شو", f: "ba kRúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به کړلی شم", f: "ba kRúlay shum" },
              { p: "به کړلای شم", f: "ba kRúlaay shum" },
            ],
            [
              { p: "به کړلی شو", f: "ba kRúlay shoo" },
              { p: "به کړلای شو", f: "ba kRúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به کړلی شې", f: "ba kRúlay she" },
              { p: "به کړلای شې", f: "ba kRúlaay she" },
            ],
            [
              { p: "به کړلی شئ", f: "ba kRúlay shey" },
              { p: "به کړلای شئ", f: "ba kRúlaay shey" },
            ],
          ],
          [
            [
              { p: "به کړلی شې", f: "ba kRúlay she" },
              { p: "به کړلای شې", f: "ba kRúlaay she" },
            ],
            [
              { p: "به کړلی شئ", f: "ba kRúlay shey" },
              { p: "به کړلای شئ", f: "ba kRúlaay shey" },
            ],
          ],
          [
            [
              { p: "به کړلی شي", f: "ba kRúlay shee" },
              { p: "به کړلای شي", f: "ba kRúlaay shee" },
            ],
            [
              { p: "به کړلی شي", f: "ba kRúlay shee" },
              { p: "به کړلای شي", f: "ba kRúlaay shee" },
            ],
          ],
          [
            [
              { p: "به کړلی شي", f: "ba kRúlay shee" },
              { p: "به کړلای شي", f: "ba kRúlaay shee" },
            ],
            [
              { p: "به کړلی شي", f: "ba kRúlay shee" },
              { p: "به کړلای شي", f: "ba kRúlaay shee" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "به کړی شم", f: "ba kRáy shum" },
              { p: "به کړای شم", f: "ba kRáay shum" },
            ],
            [
              { p: "به کړی شو", f: "ba kRáy shoo" },
              { p: "به کړای شو", f: "ba kRáay shoo" },
            ],
          ],
          [
            [
              { p: "به کړی شم", f: "ba kRáy shum" },
              { p: "به کړای شم", f: "ba kRáay shum" },
            ],
            [
              { p: "به کړی شو", f: "ba kRáy shoo" },
              { p: "به کړای شو", f: "ba kRáay shoo" },
            ],
          ],
          [
            [
              { p: "به کړی شې", f: "ba kRáy she" },
              { p: "به کړای شې", f: "ba kRáay she" },
            ],
            [
              { p: "به کړی شئ", f: "ba kRáy shey" },
              { p: "به کړای شئ", f: "ba kRáay shey" },
            ],
          ],
          [
            [
              { p: "به کړی شې", f: "ba kRáy she" },
              { p: "به کړای شې", f: "ba kRáay she" },
            ],
            [
              { p: "به کړی شئ", f: "ba kRáy shey" },
              { p: "به کړای شئ", f: "ba kRáay shey" },
            ],
          ],
          [
            [
              { p: "به کړی شي", f: "ba kRáy shee" },
              { p: "به کړای شي", f: "ba kRáay shee" },
            ],
            [
              { p: "به کړی شي", f: "ba kRáy shee" },
              { p: "به کړای شي", f: "ba kRáay shee" },
            ],
          ],
          [
            [
              { p: "به کړی شي", f: "ba kRáy shee" },
              { p: "به کړای شي", f: "ba kRáay shee" },
            ],
            [
              { p: "به کړی شي", f: "ba kRáy shee" },
              { p: "به کړای شي", f: "ba kRáay shee" },
            ],
          ],
        ],
      },
      past: {
        long: [
          [
            [
              { p: "کړلی شوم", f: "kRúlay shwum" },
              { p: "کړلای شوم", f: "kRúlaay shwum" },
            ],
            [
              { p: "کړلی شو", f: "kRúlay shoo" },
              { p: "کړلای شو", f: "kRúlaay shoo" },
            ],
          ],
          [
            [
              { p: "کړلی شوم", f: "kRúlay shwum" },
              { p: "کړلای شوم", f: "kRúlaay shwum" },
            ],
            [
              { p: "کړلی شو", f: "kRúlay shoo" },
              { p: "کړلای شو", f: "kRúlaay shoo" },
            ],
          ],
          [
            [
              { p: "کړلی شوې", f: "kRúlay shwe" },
              { p: "کړلای شوې", f: "kRúlaay shwe" },
            ],
            [
              { p: "کړلی شوئ", f: "kRúlay shwey" },
              { p: "کړلای شوئ", f: "kRúlaay shwey" },
            ],
          ],
          [
            [
              { p: "کړلی شوې", f: "kRúlay shwe" },
              { p: "کړلای شوې", f: "kRúlaay shwe" },
            ],
            [
              { p: "کړلی شوئ", f: "kRúlay shwey" },
              { p: "کړلای شوئ", f: "kRúlaay shwey" },
            ],
          ],
          [
            [
              { p: "کړلی شو", f: "kRúlay sho" },
              { p: "کړلای شو", f: "kRúlaay sho" },
            ],
            [
              { p: "کړلی شول", f: "kRúlay shwul" },
              { p: "کړلای شول", f: "kRúlaay shwul" },
              { p: "کړلی شو", f: "kRúlay shoo" },
              { p: "کړلای شو", f: "kRúlaay shoo" },
            ],
          ],
          [
            [
              { p: "کړلی شوه", f: "kRúlay shwa" },
              { p: "کړلای شوه", f: "kRúlaay shwa" },
            ],
            [
              { p: "کړلی شولې", f: "kRúlay shwule" },
              { p: "کړلای شولې", f: "kRúlaay shwule" },
              { p: "کړلی شوې", f: "kRúlay shwe" },
              { p: "کړلای شوې", f: "kRúlaay shwe" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "کړی شوم", f: "kRáy shwum" },
              { p: "کړای شوم", f: "kRáay shwum" },
            ],
            [
              { p: "کړی شو", f: "kRáy shoo" },
              { p: "کړای شو", f: "kRáay shoo" },
            ],
          ],
          [
            [
              { p: "کړی شوم", f: "kRáy shwum" },
              { p: "کړای شوم", f: "kRáay shwum" },
            ],
            [
              { p: "کړی شو", f: "kRáy shoo" },
              { p: "کړای شو", f: "kRáay shoo" },
            ],
          ],
          [
            [
              { p: "کړی شوې", f: "kRáy shwe" },
              { p: "کړای شوې", f: "kRáay shwe" },
            ],
            [
              { p: "کړی شوئ", f: "kRáy shwey" },
              { p: "کړای شوئ", f: "kRáay shwey" },
            ],
          ],
          [
            [
              { p: "کړی شوې", f: "kRáy shwe" },
              { p: "کړای شوې", f: "kRáay shwe" },
            ],
            [
              { p: "کړی شوئ", f: "kRáy shwey" },
              { p: "کړای شوئ", f: "kRáay shwey" },
            ],
          ],
          [
            [
              { p: "کړی شو", f: "kRáy sho" },
              { p: "کړای شو", f: "kRáay sho" },
            ],
            [
              { p: "کړی شول", f: "kRáy shwul" },
              { p: "کړای شول", f: "kRáay shwul" },
              { p: "کړی شو", f: "kRáy shoo" },
              { p: "کړای شو", f: "kRáay shoo" },
            ],
          ],
          [
            [
              { p: "کړی شوه", f: "kRáy shwa" },
              { p: "کړای شوه", f: "kRáay shwa" },
            ],
            [
              { p: "کړی شولې", f: "kRáy shwule" },
              { p: "کړای شولې", f: "kRáay shwule" },
              { p: "کړی شوې", f: "kRáy shwe" },
              { p: "کړای شوې", f: "kRáay shwe" },
            ],
          ],
        ],
      },
      habitualPast: {
        long: [
          [
            [
              { p: "به کړلی شوم", f: "ba kRúlay shwum" },
              { p: "به کړلای شوم", f: "ba kRúlaay shwum" },
            ],
            [
              { p: "به کړلی شو", f: "ba kRúlay shoo" },
              { p: "به کړلای شو", f: "ba kRúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به کړلی شوم", f: "ba kRúlay shwum" },
              { p: "به کړلای شوم", f: "ba kRúlaay shwum" },
            ],
            [
              { p: "به کړلی شو", f: "ba kRúlay shoo" },
              { p: "به کړلای شو", f: "ba kRúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به کړلی شوې", f: "ba kRúlay shwe" },
              { p: "به کړلای شوې", f: "ba kRúlaay shwe" },
            ],
            [
              { p: "به کړلی شوئ", f: "ba kRúlay shwey" },
              { p: "به کړلای شوئ", f: "ba kRúlaay shwey" },
            ],
          ],
          [
            [
              { p: "به کړلی شوې", f: "ba kRúlay shwe" },
              { p: "به کړلای شوې", f: "ba kRúlaay shwe" },
            ],
            [
              { p: "به کړلی شوئ", f: "ba kRúlay shwey" },
              { p: "به کړلای شوئ", f: "ba kRúlaay shwey" },
            ],
          ],
          [
            [
              { p: "به کړلی شو", f: "ba kRúlay sho" },
              { p: "به کړلای شو", f: "ba kRúlaay sho" },
            ],
            [
              { p: "به کړلی شول", f: "ba kRúlay shwul" },
              { p: "به کړلای شول", f: "ba kRúlaay shwul" },
              { p: "به کړلی شو", f: "ba kRúlay shoo" },
              { p: "به کړلای شو", f: "ba kRúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به کړلی شوه", f: "ba kRúlay shwa" },
              { p: "به کړلای شوه", f: "ba kRúlaay shwa" },
            ],
            [
              { p: "به کړلی شولې", f: "ba kRúlay shwule" },
              { p: "به کړلای شولې", f: "ba kRúlaay shwule" },
              { p: "به کړلی شوې", f: "ba kRúlay shwe" },
              { p: "به کړلای شوې", f: "ba kRúlaay shwe" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "به کړی شوم", f: "ba kRáy shwum" },
              { p: "به کړای شوم", f: "ba kRáay shwum" },
            ],
            [
              { p: "به کړی شو", f: "ba kRáy shoo" },
              { p: "به کړای شو", f: "ba kRáay shoo" },
            ],
          ],
          [
            [
              { p: "به کړی شوم", f: "ba kRáy shwum" },
              { p: "به کړای شوم", f: "ba kRáay shwum" },
            ],
            [
              { p: "به کړی شو", f: "ba kRáy shoo" },
              { p: "به کړای شو", f: "ba kRáay shoo" },
            ],
          ],
          [
            [
              { p: "به کړی شوې", f: "ba kRáy shwe" },
              { p: "به کړای شوې", f: "ba kRáay shwe" },
            ],
            [
              { p: "به کړی شوئ", f: "ba kRáy shwey" },
              { p: "به کړای شوئ", f: "ba kRáay shwey" },
            ],
          ],
          [
            [
              { p: "به کړی شوې", f: "ba kRáy shwe" },
              { p: "به کړای شوې", f: "ba kRáay shwe" },
            ],
            [
              { p: "به کړی شوئ", f: "ba kRáy shwey" },
              { p: "به کړای شوئ", f: "ba kRáay shwey" },
            ],
          ],
          [
            [
              { p: "به کړی شو", f: "ba kRáy sho" },
              { p: "به کړای شو", f: "ba kRáay sho" },
            ],
            [
              { p: "به کړی شول", f: "ba kRáy shwul" },
              { p: "به کړای شول", f: "ba kRáay shwul" },
              { p: "به کړی شو", f: "ba kRáy shoo" },
              { p: "به کړای شو", f: "ba kRáay shoo" },
            ],
          ],
          [
            [
              { p: "به کړی شوه", f: "ba kRáy shwa" },
              { p: "به کړای شوه", f: "ba kRáay shwa" },
            ],
            [
              { p: "به کړی شولې", f: "ba kRáy shwule" },
              { p: "به کړای شولې", f: "ba kRáay shwule" },
              { p: "به کړی شوې", f: "ba kRáy shwe" },
              { p: "به کړای شوې", f: "ba kRáay shwe" },
            ],
          ],
        ],
      },
      hypotheticalPast: {
        long: [
          [
            [
              { p: "کړلی شوای", f: "kRúlay shwaay" },
              { p: "کړلی شوی", f: "kRúlay shway" },
              { p: "کړلای شوای", f: "kRúlaay shwaay" },
            ],
            [
              { p: "کړلی شوای", f: "kRúlay shwaay" },
              { p: "کړلی شوی", f: "kRúlay shway" },
              { p: "کړلای شوای", f: "kRúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "کړلی شوای", f: "kRúlay shwaay" },
              { p: "کړلی شوی", f: "kRúlay shway" },
              { p: "کړلای شوای", f: "kRúlaay shwaay" },
            ],
            [
              { p: "کړلی شوای", f: "kRúlay shwaay" },
              { p: "کړلی شوی", f: "kRúlay shway" },
              { p: "کړلای شوای", f: "kRúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "کړلی شوای", f: "kRúlay shwaay" },
              { p: "کړلی شوی", f: "kRúlay shway" },
              { p: "کړلای شوای", f: "kRúlaay shwaay" },
            ],
            [
              { p: "کړلی شوای", f: "kRúlay shwaay" },
              { p: "کړلی شوی", f: "kRúlay shway" },
              { p: "کړلای شوای", f: "kRúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "کړلی شوای", f: "kRúlay shwaay" },
              { p: "کړلی شوی", f: "kRúlay shway" },
              { p: "کړلای شوای", f: "kRúlaay shwaay" },
            ],
            [
              { p: "کړلی شوای", f: "kRúlay shwaay" },
              { p: "کړلی شوی", f: "kRúlay shway" },
              { p: "کړلای شوای", f: "kRúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "کړلی شوای", f: "kRúlay shwaay" },
              { p: "کړلی شوی", f: "kRúlay shway" },
              { p: "کړلای شوای", f: "kRúlaay shwaay" },
            ],
            [
              { p: "کړلی شوای", f: "kRúlay shwaay" },
              { p: "کړلی شوی", f: "kRúlay shway" },
              { p: "کړلای شوای", f: "kRúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "کړلی شوای", f: "kRúlay shwaay" },
              { p: "کړلی شوی", f: "kRúlay shway" },
              { p: "کړلای شوای", f: "kRúlaay shwaay" },
            ],
            [
              { p: "کړلی شوای", f: "kRúlay shwaay" },
              { p: "کړلی شوی", f: "kRúlay shway" },
              { p: "کړلای شوای", f: "kRúlaay shwaay" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "کړی شوای", f: "kRáy shwaay" },
              { p: "کړی شوی", f: "kRáy shway" },
              { p: "کړای شوای", f: "kRáay shwaay" },
            ],
            [
              { p: "کړی شوای", f: "kRáy shwaay" },
              { p: "کړی شوی", f: "kRáy shway" },
              { p: "کړای شوای", f: "kRáay shwaay" },
            ],
          ],
          [
            [
              { p: "کړی شوای", f: "kRáy shwaay" },
              { p: "کړی شوی", f: "kRáy shway" },
              { p: "کړای شوای", f: "kRáay shwaay" },
            ],
            [
              { p: "کړی شوای", f: "kRáy shwaay" },
              { p: "کړی شوی", f: "kRáy shway" },
              { p: "کړای شوای", f: "kRáay shwaay" },
            ],
          ],
          [
            [
              { p: "کړی شوای", f: "kRáy shwaay" },
              { p: "کړی شوی", f: "kRáy shway" },
              { p: "کړای شوای", f: "kRáay shwaay" },
            ],
            [
              { p: "کړی شوای", f: "kRáy shwaay" },
              { p: "کړی شوی", f: "kRáy shway" },
              { p: "کړای شوای", f: "kRáay shwaay" },
            ],
          ],
          [
            [
              { p: "کړی شوای", f: "kRáy shwaay" },
              { p: "کړی شوی", f: "kRáy shway" },
              { p: "کړای شوای", f: "kRáay shwaay" },
            ],
            [
              { p: "کړی شوای", f: "kRáy shwaay" },
              { p: "کړی شوی", f: "kRáy shway" },
              { p: "کړای شوای", f: "kRáay shwaay" },
            ],
          ],
          [
            [
              { p: "کړی شوای", f: "kRáy shwaay" },
              { p: "کړی شوی", f: "kRáy shway" },
              { p: "کړای شوای", f: "kRáay shwaay" },
            ],
            [
              { p: "کړی شوای", f: "kRáy shwaay" },
              { p: "کړی شوی", f: "kRáy shway" },
              { p: "کړای شوای", f: "kRáay shwaay" },
            ],
          ],
          [
            [
              { p: "کړی شوای", f: "kRáy shwaay" },
              { p: "کړی شوی", f: "kRáy shway" },
              { p: "کړای شوای", f: "kRáay shwaay" },
            ],
            [
              { p: "کړی شوای", f: "kRáy shwaay" },
              { p: "کړی شوی", f: "kRáy shway" },
              { p: "کړای شوای", f: "kRáay shwaay" },
            ],
          ],
        ],
      },
    },
  },
  passive: {
    imperfective: kawulStatOrDynImperfectivePassive,
    perfective: {
      imperative: undefined,
      nonImperative: [
        [
          [{ p: "وکړل شم", f: "óokRul shum" }],
          [{ p: "وکړل شو", f: "óokRul shoo" }],
        ],
        [
          [{ p: "وکړل شم", f: "óokRul shum" }],
          [{ p: "وکړل شو", f: "óokRul shoo" }],
        ],
        [
          [{ p: "وکړل شې", f: "óokRul she" }],
          [{ p: "وکړل شئ", f: "óokRul shey" }],
        ],
        [
          [{ p: "وکړل شې", f: "óokRul she" }],
          [{ p: "وکړل شئ", f: "óokRul shey" }],
        ],
        [
          [{ p: "وکړل شي", f: "óokRul shee" }],
          [{ p: "وکړل شي", f: "óokRul shee" }],
        ],
        [
          [{ p: "وکړل شي", f: "óokRul shee" }],
          [{ p: "وکړل شي", f: "óokRul shee" }],
        ],
      ],
      future: [
        [
          [{ p: "به وکړل شم", f: "ba óokRul shum" }],
          [{ p: "به وکړل شو", f: "ba óokRul shoo" }],
        ],
        [
          [{ p: "به وکړل شم", f: "ba óokRul shum" }],
          [{ p: "به وکړل شو", f: "ba óokRul shoo" }],
        ],
        [
          [{ p: "به وکړل شې", f: "ba óokRul she" }],
          [{ p: "به وکړل شئ", f: "ba óokRul shey" }],
        ],
        [
          [{ p: "به وکړل شې", f: "ba óokRul she" }],
          [{ p: "به وکړل شئ", f: "ba óokRul shey" }],
        ],
        [
          [{ p: "به وکړل شي", f: "ba óokRul shee" }],
          [{ p: "به وکړل شي", f: "ba óokRul shee" }],
        ],
        [
          [{ p: "به وکړل شي", f: "ba óokRul shee" }],
          [{ p: "به وکړل شي", f: "ba óokRul shee" }],
        ],
      ],
      past: {
        short: [
          [
            [{ p: "وکړل شوم", f: "óokRul shwum" }],
            [{ p: "وکړل شو", f: "óokRul shoo" }],
          ],
          [
            [{ p: "وکړل شوم", f: "óokRul shwum" }],
            [{ p: "وکړل شو", f: "óokRul shoo" }],
          ],
          [
            [{ p: "وکړل شوې", f: "óokRul shwe" }],
            [{ p: "وکړل شوئ", f: "óokRul shwey" }],
          ],
          [
            [{ p: "وکړل شوې", f: "óokRul shwe" }],
            [{ p: "وکړل شوئ", f: "óokRul shwey" }],
          ],
          [
            [{ p: "وکړل شو", f: "óokRul sho" }],
            [
              { p: "وکړل شو", f: "óokRul shoo" },
              { p: "وکړل شول", f: "óokRul shwul" },
            ],
          ],
          [
            [{ p: "وکړل شوه", f: "óokRul shwa" }],
            [{ p: "وکړل شوې", f: "óokRul shwe" }],
          ],
        ],
        long: [
          [
            [{ p: "وکړل شولم", f: "óokRul shwulum" }],
            [{ p: "وکړل شولو", f: "óokRul shwuloo" }],
          ],
          [
            [{ p: "وکړل شولم", f: "óokRul shwulum" }],
            [{ p: "وکړل شولو", f: "óokRul shwuloo" }],
          ],
          [
            [{ p: "وکړل شولې", f: "óokRul shwule" }],
            [{ p: "وکړل شولئ", f: "óokRul shwuley" }],
          ],
          [
            [{ p: "وکړل شولې", f: "óokRul shwule" }],
            [{ p: "وکړل شولئ", f: "óokRul shwuley" }],
          ],
          [
            [
              { p: "وکړل شوله", f: "óokRul shwulu" },
              { p: "وکړل شولو", f: "óokRul shwulo" },
            ],
            [{ p: "وکړل شول", f: "óokRul shwul" }],
          ],
          [
            [{ p: "وکړل شوله", f: "óokRul shwula" }],
            [{ p: "وکړل شولې", f: "óokRul shwule" }],
          ],
        ],
      },
      habitualPast: {
        short: [
          [
            [{ p: "به وکړل شوم", f: "ba óokRul shwum" }],
            [{ p: "به وکړل شو", f: "ba óokRul shoo" }],
          ],
          [
            [{ p: "به وکړل شوم", f: "ba óokRul shwum" }],
            [{ p: "به وکړل شو", f: "ba óokRul shoo" }],
          ],
          [
            [{ p: "به وکړل شوې", f: "ba óokRul shwe" }],
            [{ p: "به وکړل شوئ", f: "ba óokRul shwey" }],
          ],
          [
            [{ p: "به وکړل شوې", f: "ba óokRul shwe" }],
            [{ p: "به وکړل شوئ", f: "ba óokRul shwey" }],
          ],
          [
            [{ p: "به وکړل شو", f: "ba óokRul sho" }],
            [
              { p: "به وکړل شو", f: "ba óokRul shoo" },
              { p: "به وکړل شول", f: "ba óokRul shwul" },
            ],
          ],
          [
            [{ p: "به وکړل شوه", f: "ba óokRul shwa" }],
            [{ p: "به وکړل شوې", f: "ba óokRul shwe" }],
          ],
        ],
        long: [
          [
            [{ p: "به وکړل شولم", f: "ba óokRul shwulum" }],
            [{ p: "به وکړل شولو", f: "ba óokRul shwuloo" }],
          ],
          [
            [{ p: "به وکړل شولم", f: "ba óokRul shwulum" }],
            [{ p: "به وکړل شولو", f: "ba óokRul shwuloo" }],
          ],
          [
            [{ p: "به وکړل شولې", f: "ba óokRul shwule" }],
            [{ p: "به وکړل شولئ", f: "ba óokRul shwuley" }],
          ],
          [
            [{ p: "به وکړل شولې", f: "ba óokRul shwule" }],
            [{ p: "به وکړل شولئ", f: "ba óokRul shwuley" }],
          ],
          [
            [
              { p: "به وکړل شوله", f: "ba óokRul shwulu" },
              { p: "به وکړل شولو", f: "ba óokRul shwulo" },
            ],
            [{ p: "به وکړل شول", f: "ba óokRul shwul" }],
          ],
          [
            [{ p: "به وکړل شوله", f: "ba óokRul shwula" }],
            [{ p: "به وکړل شولې", f: "ba óokRul shwule" }],
          ],
        ],
      },
      modal: {
        nonImperative: {
          long: [
            [
              [
                { p: "وکړل کېدلی شم", f: "óokRul kedúlay shum" },
                { p: "وکړل کېدلای شم", f: "óokRul kedúlaay shum" },
              ],
              [
                { p: "وکړل کېدلی شو", f: "óokRul kedúlay shoo" },
                { p: "وکړل کېدلای شو", f: "óokRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "وکړل کېدلی شم", f: "óokRul kedúlay shum" },
                { p: "وکړل کېدلای شم", f: "óokRul kedúlaay shum" },
              ],
              [
                { p: "وکړل کېدلی شو", f: "óokRul kedúlay shoo" },
                { p: "وکړل کېدلای شو", f: "óokRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "وکړل کېدلی شې", f: "óokRul kedúlay she" },
                { p: "وکړل کېدلای شې", f: "óokRul kedúlaay she" },
              ],
              [
                { p: "وکړل کېدلی شئ", f: "óokRul kedúlay shey" },
                { p: "وکړل کېدلای شئ", f: "óokRul kedúlaay shey" },
              ],
            ],
            [
              [
                { p: "وکړل کېدلی شې", f: "óokRul kedúlay she" },
                { p: "وکړل کېدلای شې", f: "óokRul kedúlaay she" },
              ],
              [
                { p: "وکړل کېدلی شئ", f: "óokRul kedúlay shey" },
                { p: "وکړل کېدلای شئ", f: "óokRul kedúlaay shey" },
              ],
            ],
            [
              [
                { p: "وکړل کېدلی شي", f: "óokRul kedúlay shee" },
                { p: "وکړل کېدلای شي", f: "óokRul kedúlaay shee" },
              ],
              [
                { p: "وکړل کېدلی شي", f: "óokRul kedúlay shee" },
                { p: "وکړل کېدلای شي", f: "óokRul kedúlaay shee" },
              ],
            ],
            [
              [
                { p: "وکړل کېدلی شي", f: "óokRul kedúlay shee" },
                { p: "وکړل کېدلای شي", f: "óokRul kedúlaay shee" },
              ],
              [
                { p: "وکړل کېدلی شي", f: "óokRul kedúlay shee" },
                { p: "وکړل کېدلای شي", f: "óokRul kedúlaay shee" },
              ],
            ],
          ],
          short: [
            [
              [
                { p: "وکړل کېدی شم", f: "óokRul kedáy shum" },
                { p: "وکړل کېدای شم", f: "óokRul kedáay shum" },
              ],
              [
                { p: "وکړل کېدی شو", f: "óokRul kedáy shoo" },
                { p: "وکړل کېدای شو", f: "óokRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "وکړل کېدی شم", f: "óokRul kedáy shum" },
                { p: "وکړل کېدای شم", f: "óokRul kedáay shum" },
              ],
              [
                { p: "وکړل کېدی شو", f: "óokRul kedáy shoo" },
                { p: "وکړل کېدای شو", f: "óokRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "وکړل کېدی شې", f: "óokRul kedáy she" },
                { p: "وکړل کېدای شې", f: "óokRul kedáay she" },
              ],
              [
                { p: "وکړل کېدی شئ", f: "óokRul kedáy shey" },
                { p: "وکړل کېدای شئ", f: "óokRul kedáay shey" },
              ],
            ],
            [
              [
                { p: "وکړل کېدی شې", f: "óokRul kedáy she" },
                { p: "وکړل کېدای شې", f: "óokRul kedáay she" },
              ],
              [
                { p: "وکړل کېدی شئ", f: "óokRul kedáy shey" },
                { p: "وکړل کېدای شئ", f: "óokRul kedáay shey" },
              ],
            ],
            [
              [
                { p: "وکړل کېدی شي", f: "óokRul kedáy shee" },
                { p: "وکړل کېدای شي", f: "óokRul kedáay shee" },
              ],
              [
                { p: "وکړل کېدی شي", f: "óokRul kedáy shee" },
                { p: "وکړل کېدای شي", f: "óokRul kedáay shee" },
              ],
            ],
            [
              [
                { p: "وکړل کېدی شي", f: "óokRul kedáy shee" },
                { p: "وکړل کېدای شي", f: "óokRul kedáay shee" },
              ],
              [
                { p: "وکړل کېدی شي", f: "óokRul kedáy shee" },
                { p: "وکړل کېدای شي", f: "óokRul kedáay shee" },
              ],
            ],
          ],
        },
        future: {
          long: [
            [
              [
                { p: "به وکړل کېدلی شم", f: "ba óokRul kedúlay shum" },
                { p: "به وکړل کېدلای شم", f: "ba óokRul kedúlaay shum" },
              ],
              [
                { p: "به وکړل کېدلی شو", f: "ba óokRul kedúlay shoo" },
                { p: "به وکړل کېدلای شو", f: "ba óokRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدلی شم", f: "ba óokRul kedúlay shum" },
                { p: "به وکړل کېدلای شم", f: "ba óokRul kedúlaay shum" },
              ],
              [
                { p: "به وکړل کېدلی شو", f: "ba óokRul kedúlay shoo" },
                { p: "به وکړل کېدلای شو", f: "ba óokRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدلی شې", f: "ba óokRul kedúlay she" },
                { p: "به وکړل کېدلای شې", f: "ba óokRul kedúlaay she" },
              ],
              [
                { p: "به وکړل کېدلی شئ", f: "ba óokRul kedúlay shey" },
                { p: "به وکړل کېدلای شئ", f: "ba óokRul kedúlaay shey" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدلی شې", f: "ba óokRul kedúlay she" },
                { p: "به وکړل کېدلای شې", f: "ba óokRul kedúlaay she" },
              ],
              [
                { p: "به وکړل کېدلی شئ", f: "ba óokRul kedúlay shey" },
                { p: "به وکړل کېدلای شئ", f: "ba óokRul kedúlaay shey" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدلی شي", f: "ba óokRul kedúlay shee" },
                { p: "به وکړل کېدلای شي", f: "ba óokRul kedúlaay shee" },
              ],
              [
                { p: "به وکړل کېدلی شي", f: "ba óokRul kedúlay shee" },
                { p: "به وکړل کېدلای شي", f: "ba óokRul kedúlaay shee" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدلی شي", f: "ba óokRul kedúlay shee" },
                { p: "به وکړل کېدلای شي", f: "ba óokRul kedúlaay shee" },
              ],
              [
                { p: "به وکړل کېدلی شي", f: "ba óokRul kedúlay shee" },
                { p: "به وکړل کېدلای شي", f: "ba óokRul kedúlaay shee" },
              ],
            ],
          ],
          short: [
            [
              [
                { p: "به وکړل کېدی شم", f: "ba óokRul kedáy shum" },
                { p: "به وکړل کېدای شم", f: "ba óokRul kedáay shum" },
              ],
              [
                { p: "به وکړل کېدی شو", f: "ba óokRul kedáy shoo" },
                { p: "به وکړل کېدای شو", f: "ba óokRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدی شم", f: "ba óokRul kedáy shum" },
                { p: "به وکړل کېدای شم", f: "ba óokRul kedáay shum" },
              ],
              [
                { p: "به وکړل کېدی شو", f: "ba óokRul kedáy shoo" },
                { p: "به وکړل کېدای شو", f: "ba óokRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدی شې", f: "ba óokRul kedáy she" },
                { p: "به وکړل کېدای شې", f: "ba óokRul kedáay she" },
              ],
              [
                { p: "به وکړل کېدی شئ", f: "ba óokRul kedáy shey" },
                { p: "به وکړل کېدای شئ", f: "ba óokRul kedáay shey" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدی شې", f: "ba óokRul kedáy she" },
                { p: "به وکړل کېدای شې", f: "ba óokRul kedáay she" },
              ],
              [
                { p: "به وکړل کېدی شئ", f: "ba óokRul kedáy shey" },
                { p: "به وکړل کېدای شئ", f: "ba óokRul kedáay shey" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدی شي", f: "ba óokRul kedáy shee" },
                { p: "به وکړل کېدای شي", f: "ba óokRul kedáay shee" },
              ],
              [
                { p: "به وکړل کېدی شي", f: "ba óokRul kedáy shee" },
                { p: "به وکړل کېدای شي", f: "ba óokRul kedáay shee" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدی شي", f: "ba óokRul kedáy shee" },
                { p: "به وکړل کېدای شي", f: "ba óokRul kedáay shee" },
              ],
              [
                { p: "به وکړل کېدی شي", f: "ba óokRul kedáy shee" },
                { p: "به وکړل کېدای شي", f: "ba óokRul kedáay shee" },
              ],
            ],
          ],
        },
        past: {
          long: [
            [
              [
                { p: "وکړل کېدلی شوم", f: "óokRul kedúlay shwum" },
                { p: "وکړل کېدلای شوم", f: "óokRul kedúlaay shwum" },
              ],
              [
                { p: "وکړل کېدلی شو", f: "óokRul kedúlay shoo" },
                { p: "وکړل کېدلای شو", f: "óokRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "وکړل کېدلی شوم", f: "óokRul kedúlay shwum" },
                { p: "وکړل کېدلای شوم", f: "óokRul kedúlaay shwum" },
              ],
              [
                { p: "وکړل کېدلی شو", f: "óokRul kedúlay shoo" },
                { p: "وکړل کېدلای شو", f: "óokRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "وکړل کېدلی شوې", f: "óokRul kedúlay shwe" },
                { p: "وکړل کېدلای شوې", f: "óokRul kedúlaay shwe" },
              ],
              [
                { p: "وکړل کېدلی شوئ", f: "óokRul kedúlay shwey" },
                { p: "وکړل کېدلای شوئ", f: "óokRul kedúlaay shwey" },
              ],
            ],
            [
              [
                { p: "وکړل کېدلی شوې", f: "óokRul kedúlay shwe" },
                { p: "وکړل کېدلای شوې", f: "óokRul kedúlaay shwe" },
              ],
              [
                { p: "وکړل کېدلی شوئ", f: "óokRul kedúlay shwey" },
                { p: "وکړل کېدلای شوئ", f: "óokRul kedúlaay shwey" },
              ],
            ],
            [
              [
                { p: "وکړل کېدلی شو", f: "óokRul kedúlay sho" },
                { p: "وکړل کېدلای شو", f: "óokRul kedúlaay sho" },
              ],
              [
                { p: "وکړل کېدلی شول", f: "óokRul kedúlay shwul" },
                { p: "وکړل کېدلای شول", f: "óokRul kedúlaay shwul" },
                { p: "وکړل کېدلی شو", f: "óokRul kedúlay shoo" },
                { p: "وکړل کېدلای شو", f: "óokRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "وکړل کېدلی شوه", f: "óokRul kedúlay shwa" },
                { p: "وکړل کېدلای شوه", f: "óokRul kedúlaay shwa" },
              ],
              [
                { p: "وکړل کېدلی شولې", f: "óokRul kedúlay shwule" },
                { p: "وکړل کېدلای شولې", f: "óokRul kedúlaay shwule" },
                { p: "وکړل کېدلی شوې", f: "óokRul kedúlay shwe" },
                { p: "وکړل کېدلای شوې", f: "óokRul kedúlaay shwe" },
              ],
            ],
          ],
          short: [
            [
              [
                { p: "وکړل کېدی شوم", f: "óokRul kedáy shwum" },
                { p: "وکړل کېدای شوم", f: "óokRul kedáay shwum" },
              ],
              [
                { p: "وکړل کېدی شو", f: "óokRul kedáy shoo" },
                { p: "وکړل کېدای شو", f: "óokRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "وکړل کېدی شوم", f: "óokRul kedáy shwum" },
                { p: "وکړل کېدای شوم", f: "óokRul kedáay shwum" },
              ],
              [
                { p: "وکړل کېدی شو", f: "óokRul kedáy shoo" },
                { p: "وکړل کېدای شو", f: "óokRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "وکړل کېدی شوې", f: "óokRul kedáy shwe" },
                { p: "وکړل کېدای شوې", f: "óokRul kedáay shwe" },
              ],
              [
                { p: "وکړل کېدی شوئ", f: "óokRul kedáy shwey" },
                { p: "وکړل کېدای شوئ", f: "óokRul kedáay shwey" },
              ],
            ],
            [
              [
                { p: "وکړل کېدی شوې", f: "óokRul kedáy shwe" },
                { p: "وکړل کېدای شوې", f: "óokRul kedáay shwe" },
              ],
              [
                { p: "وکړل کېدی شوئ", f: "óokRul kedáy shwey" },
                { p: "وکړل کېدای شوئ", f: "óokRul kedáay shwey" },
              ],
            ],
            [
              [
                { p: "وکړل کېدی شو", f: "óokRul kedáy sho" },
                { p: "وکړل کېدای شو", f: "óokRul kedáay sho" },
              ],
              [
                { p: "وکړل کېدی شول", f: "óokRul kedáy shwul" },
                { p: "وکړل کېدای شول", f: "óokRul kedáay shwul" },
                { p: "وکړل کېدی شو", f: "óokRul kedáy shoo" },
                { p: "وکړل کېدای شو", f: "óokRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "وکړل کېدی شوه", f: "óokRul kedáy shwa" },
                { p: "وکړل کېدای شوه", f: "óokRul kedáay shwa" },
              ],
              [
                { p: "وکړل کېدی شولې", f: "óokRul kedáy shwule" },
                { p: "وکړل کېدای شولې", f: "óokRul kedáay shwule" },
                { p: "وکړل کېدی شوې", f: "óokRul kedáy shwe" },
                { p: "وکړل کېدای شوې", f: "óokRul kedáay shwe" },
              ],
            ],
          ],
        },
        habitualPast: {
          long: [
            [
              [
                { p: "به وکړل کېدلی شوم", f: "ba óokRul kedúlay shwum" },
                { p: "به وکړل کېدلای شوم", f: "ba óokRul kedúlaay shwum" },
              ],
              [
                { p: "به وکړل کېدلی شو", f: "ba óokRul kedúlay shoo" },
                { p: "به وکړل کېدلای شو", f: "ba óokRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدلی شوم", f: "ba óokRul kedúlay shwum" },
                { p: "به وکړل کېدلای شوم", f: "ba óokRul kedúlaay shwum" },
              ],
              [
                { p: "به وکړل کېدلی شو", f: "ba óokRul kedúlay shoo" },
                { p: "به وکړل کېدلای شو", f: "ba óokRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدلی شوې", f: "ba óokRul kedúlay shwe" },
                { p: "به وکړل کېدلای شوې", f: "ba óokRul kedúlaay shwe" },
              ],
              [
                { p: "به وکړل کېدلی شوئ", f: "ba óokRul kedúlay shwey" },
                { p: "به وکړل کېدلای شوئ", f: "ba óokRul kedúlaay shwey" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدلی شوې", f: "ba óokRul kedúlay shwe" },
                { p: "به وکړل کېدلای شوې", f: "ba óokRul kedúlaay shwe" },
              ],
              [
                { p: "به وکړل کېدلی شوئ", f: "ba óokRul kedúlay shwey" },
                { p: "به وکړل کېدلای شوئ", f: "ba óokRul kedúlaay shwey" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدلی شو", f: "ba óokRul kedúlay sho" },
                { p: "به وکړل کېدلای شو", f: "ba óokRul kedúlaay sho" },
              ],
              [
                { p: "به وکړل کېدلی شول", f: "ba óokRul kedúlay shwul" },
                { p: "به وکړل کېدلای شول", f: "ba óokRul kedúlaay shwul" },
                { p: "به وکړل کېدلی شو", f: "ba óokRul kedúlay shoo" },
                { p: "به وکړل کېدلای شو", f: "ba óokRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدلی شوه", f: "ba óokRul kedúlay shwa" },
                { p: "به وکړل کېدلای شوه", f: "ba óokRul kedúlaay shwa" },
              ],
              [
                { p: "به وکړل کېدلی شولې", f: "ba óokRul kedúlay shwule" },
                { p: "به وکړل کېدلای شولې", f: "ba óokRul kedúlaay shwule" },
                { p: "به وکړل کېدلی شوې", f: "ba óokRul kedúlay shwe" },
                { p: "به وکړل کېدلای شوې", f: "ba óokRul kedúlaay shwe" },
              ],
            ],
          ],
          short: [
            [
              [
                { p: "به وکړل کېدی شوم", f: "ba óokRul kedáy shwum" },
                { p: "به وکړل کېدای شوم", f: "ba óokRul kedáay shwum" },
              ],
              [
                { p: "به وکړل کېدی شو", f: "ba óokRul kedáy shoo" },
                { p: "به وکړل کېدای شو", f: "ba óokRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدی شوم", f: "ba óokRul kedáy shwum" },
                { p: "به وکړل کېدای شوم", f: "ba óokRul kedáay shwum" },
              ],
              [
                { p: "به وکړل کېدی شو", f: "ba óokRul kedáy shoo" },
                { p: "به وکړل کېدای شو", f: "ba óokRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدی شوې", f: "ba óokRul kedáy shwe" },
                { p: "به وکړل کېدای شوې", f: "ba óokRul kedáay shwe" },
              ],
              [
                { p: "به وکړل کېدی شوئ", f: "ba óokRul kedáy shwey" },
                { p: "به وکړل کېدای شوئ", f: "ba óokRul kedáay shwey" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدی شوې", f: "ba óokRul kedáy shwe" },
                { p: "به وکړل کېدای شوې", f: "ba óokRul kedáay shwe" },
              ],
              [
                { p: "به وکړل کېدی شوئ", f: "ba óokRul kedáy shwey" },
                { p: "به وکړل کېدای شوئ", f: "ba óokRul kedáay shwey" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدی شو", f: "ba óokRul kedáy sho" },
                { p: "به وکړل کېدای شو", f: "ba óokRul kedáay sho" },
              ],
              [
                { p: "به وکړل کېدی شول", f: "ba óokRul kedáy shwul" },
                { p: "به وکړل کېدای شول", f: "ba óokRul kedáay shwul" },
                { p: "به وکړل کېدی شو", f: "ba óokRul kedáy shoo" },
                { p: "به وکړل کېدای شو", f: "ba óokRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "به وکړل کېدی شوه", f: "ba óokRul kedáy shwa" },
                { p: "به وکړل کېدای شوه", f: "ba óokRul kedáay shwa" },
              ],
              [
                { p: "به وکړل کېدی شولې", f: "ba óokRul kedáy shwule" },
                { p: "به وکړل کېدای شولې", f: "ba óokRul kedáay shwule" },
                { p: "به وکړل کېدی شوې", f: "ba óokRul kedáy shwe" },
                { p: "به وکړل کېدای شوې", f: "ba óokRul kedáay shwe" },
              ],
            ],
          ],
        },
        hypotheticalPast: {
          long: [
            [
              [
                { p: "وکړل کېدلی شوای", f: "óokRul kedúlay shwaay" },
                { p: "وکړل کېدلی شوی", f: "óokRul kedúlay shway" },
                { p: "وکړل کېدلای شوای", f: "óokRul kedúlaay shwaay" },
              ],
              [
                { p: "وکړل کېدلی شوای", f: "óokRul kedúlay shwaay" },
                { p: "وکړل کېدلی شوی", f: "óokRul kedúlay shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedúlaay shway" },
              ],
            ],
            [
              [
                { p: "وکړل کېدلی شوای", f: "óokRul kedúlay shwaay" },
                { p: "وکړل کېدلی شوی", f: "óokRul kedúlay shway" },
                { p: "وکړل کېدلای شوای", f: "óokRul kedúlaay shwaay" },
              ],
              [
                { p: "وکړل کېدلی شوای", f: "óokRul kedúlay shwaay" },
                { p: "وکړل کېدلی شوی", f: "óokRul kedúlay shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedúlaay shway" },
              ],
            ],
            [
              [
                { p: "وکړل کېدلی شوای", f: "óokRul kedúlay shwaay" },
                { p: "وکړل کېدلی شوی", f: "óokRul kedúlay shway" },
                { p: "وکړل کېدلای شوای", f: "óokRul kedúlaay shwaay" },
              ],
              [
                { p: "وکړل کېدلی شوای", f: "óokRul kedúlay shwaay" },
                { p: "وکړل کېدلی شوی", f: "óokRul kedúlay shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedúlaay shway" },
              ],
            ],
            [
              [
                { p: "وکړل کېدلی شوای", f: "óokRul kedúlay shwaay" },
                { p: "وکړل کېدلی شوی", f: "óokRul kedúlay shway" },
                { p: "وکړل کېدلای شوای", f: "óokRul kedúlaay shwaay" },
              ],
              [
                { p: "وکړل کېدلی شوای", f: "óokRul kedúlay shwaay" },
                { p: "وکړل کېدلی شوی", f: "óokRul kedúlay shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedúlaay shway" },
              ],
            ],
            [
              [
                { p: "وکړل کېدلی شوای", f: "óokRul kedúlay shwaay" },
                { p: "وکړل کېدلی شوی", f: "óokRul kedúlay shway" },
                { p: "وکړل کېدلای شوای", f: "óokRul kedúlaay shwaay" },
              ],
              [
                { p: "وکړل کېدلی شوای", f: "óokRul kedúlay shwaay" },
                { p: "وکړل کېدلی شوی", f: "óokRul kedúlay shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedúlaay shway" },
              ],
            ],
            [
              [
                { p: "وکړل کېدلی شوای", f: "óokRul kedúlay shwaay" },
                { p: "وکړل کېدلی شوی", f: "óokRul kedúlay shway" },
                { p: "وکړل کېدلای شوای", f: "óokRul kedúlaay shwaay" },
              ],
              [
                { p: "وکړل کېدلی شوای", f: "óokRul kedúlay shwaay" },
                { p: "وکړل کېدلی شوی", f: "óokRul kedúlay shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedúlaay shway" },
              ],
            ],
          ],
          short: [
            [
              [
                { p: "وکړل کېدی شوای", f: "óokRul kedáy shwaay" },
                { p: "وکړل کېدی شوی", f: "óokRul kedáy shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedáay shway" },
              ],
              [
                { p: "وکړل کېدی شوای", f: "óokRul kedáy shwaay" },
                { p: "وکړل کېدی شوی", f: "óokRul kedáy shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedáay shway" },
              ],
            ],
            [
              [
                { p: "وکړل کېدی شوای", f: "óokRul kedáy shwaay" },
                { p: "وکړل کېدی شوی", f: "óokRul kedáy shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedáay shway" },
              ],
              [
                { p: "وکړل کېدی شوای", f: "óokRul kedáy shwaay" },
                { p: "وکړل کېدی شوی", f: "óokRul kedáy shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedáay shway" },
              ],
            ],
            [
              [
                { p: "وکړل کېدی شوای", f: "óokRul kedáy shwaay" },
                { p: "وکړل کېدی شوی", f: "óokRul kedáy shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedáay shway" },
              ],
              [
                { p: "وکړل کېدی شوای", f: "óokRul kedáy shwaay" },
                { p: "وکړل کېدی شوی", f: "óokRul kedáy shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedáay shway" },
              ],
            ],
            [
              [
                { p: "وکړل کېدی شوای", f: "óokRul kedáy shwaay" },
                { p: "وکړل کېدی شوی", f: "óokRul kedáy shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedáay shway" },
              ],
              [
                { p: "وکړل کېدی شوای", f: "óokRul kedáy shwaay" },
                { p: "وکړل کېدی شوی", f: "óokRul kedáy shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedáay shway" },
              ],
            ],
            [
              [
                { p: "وکړل کېدی شوای", f: "óokRul kedáy shwaay" },
                { p: "وکړل کېدی شوی", f: "óokRul kedáy shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedáay shway" },
              ],
              [
                { p: "وکړل کېدی شوای", f: "óokRul kedáy shwaay" },
                { p: "وکړل کېدی شوی", f: "óokRul kedáy shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedáay shway" },
              ],
            ],
            [
              [
                { p: "وکړل کېدی شوای", f: "óokRul kedáy shwaay" },
                { p: "وکړل کېدی شوی", f: "óokRul kedáy shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedáay shway" },
              ],
              [
                { p: "وکړل کېدی شوای", f: "óokRul kedáy shwaay" },
                { p: "وکړل کېدی شوی", f: "óokRul kedáy shway" },
                { p: "وکړل کېدای شوی", f: "óokRul kedáay shway" },
              ],
            ],
          ],
        },
      },
    },
    perfect: kawulPerfectPassive,
  },
  hypothetical: kawulHypothetical,
  participle: {
    past: {
      masc: [
        [{ p: "کړی", f: "kúRay" }],
        [{ p: "کړي", f: "kúRee" }],
        [
          { p: "کړیو", f: "kúRiyo" },
          { p: "کړو", f: "kúRo" },
        ],
      ],
      fem: [
        [{ p: "کړې", f: "kúRe" }],
        [{ p: "کړې", f: "kúRe" }],
        [{ p: "کړو", f: "kúRo" }],
      ],
    },
    present: {
      masc: [
        [{ p: "کوونکی", f: "kawóonkay" }],
        [{ p: "کوونکي", f: "kawóonkee" }],
        [
          { p: "کوونکیو", f: "kawóonkiyo" },
          { p: "کوونکو", f: "kedóonko" },
        ],
      ],
      fem: [
        [{ p: "کوونکې", f: "kawóonke" }],
        [{ p: "کوونکې", f: "kawóonke" }],
        [{ p: "کوونکو", f: "kawóonko" }],
      ],
    },
  },
  perfect: kawulPerfect,
};

// TODO: This is kind of bad because the info can get generated perfectly and tested but we're returning it by hand here?
// leads to possible discrepency when changing things, almost like two sources of truth?
export const kawulDyn: T.VerbConjugation = {
  info: {
    entry: {
      entry: {
        ts: 1527812752,
        i: 10578,
        p: "کول",
        f: "kawúl",
        g: "kawúl",
        e: "to do (an action or activity)",
        c: "v. trans. irreg.",
        ssp: "وکړ",
        ssf: "óokR",
        prp: "وکړل",
        prf: "óokRul",
        pprtp: "کړی",
        pprtf: "kúRay",
        diacExcept: true,
        ec: "do,does,doing,did,done",
      } as T.VerbDictionaryEntry,
    },
    transitivity: "transitive",
    type: "simple",
    yulEnding: false,
    root: {
      imperfective: {
        long: { p: "کول", f: "kawúl" },
        short: { p: "کو", f: "kaw" },
      },
      perfective: {
        long: { p: "وکړل", f: "óokRul" },
        short: { p: "وکړ", f: "óokR" },
        mini: { p: "وک", f: "óok" },
      },
      perfectiveSplit: {
        long: [
          { p: "و", f: "óo" },
          { p: "کړل", f: "kRul" },
        ],
        short: [
          { p: "و", f: "óo" },
          { p: "کړ", f: "kR" },
        ],
        mini: [
          { p: "و", f: "óo" },
          { p: "ک", f: "k" },
        ],
      },
    },
    stem: {
      imperfective: { p: "کو", f: "kaw" },
      perfective: {
        long: { p: "وکړ", f: "óokR" },
        short: { p: "وک", f: "óok" },
      },
      perfectiveSplit: {
        long: [
          { p: "و", f: "óo" },
          { p: "کړ", f: "kR" },
        ],
        short: [
          { p: "و", f: "óo" },
          { p: "ک", f: "k" },
        ],
      },
    },
    participle: {
      present: { p: "کوونکی", f: "kawóonkay" },
      past: { p: "کړی", f: "kúRay" },
    },
    idiosyncraticThirdMascSing: {
      perfective: { p: "وکړ", f: "óokuR" },
      imperfective: { p: "کاوه", f: "kaawú" },
    },
  },
  imperfective: {
    nonImperative: [
      [[{ p: "کوم", f: "kawum" }], [{ p: "کوو", f: "kawoo" }]],
      [[{ p: "کوم", f: "kawum" }], [{ p: "کوو", f: "kawoo" }]],
      [[{ p: "کوې", f: "kawe" }], [{ p: "کوئ", f: "kawey" }]],
      [[{ p: "کوې", f: "kawe" }], [{ p: "کوئ", f: "kawey" }]],
      [[{ p: "کوي", f: "kawee" }], [{ p: "کوي", f: "kawee" }]],
      [[{ p: "کوي", f: "kawee" }], [{ p: "کوي", f: "kawee" }]],
    ],
    future: [
      [[{ p: "به کوم", f: "ba kawum" }], [{ p: "به کوو", f: "ba kawoo" }]],
      [[{ p: "به کوم", f: "ba kawum" }], [{ p: "به کوو", f: "ba kawoo" }]],
      [[{ p: "به کوې", f: "ba kawe" }], [{ p: "به کوئ", f: "ba kawey" }]],
      [[{ p: "به کوې", f: "ba kawe" }], [{ p: "به کوئ", f: "ba kawey" }]],
      [[{ p: "به کوي", f: "ba kawee" }], [{ p: "به کوي", f: "ba kawee" }]],
      [[{ p: "به کوي", f: "ba kawee" }], [{ p: "به کوي", f: "ba kawee" }]],
    ],
    imperative: [
      [[{ p: "کوه", f: "kawá" }], [{ p: "کوئ", f: "kawéy" }]],
      [[{ p: "کوه", f: "kawá" }], [{ p: "کوئ", f: "kawéy" }]],
    ],
    past: {
      short: [
        [[{ p: "کوم", f: "kawum" }], [{ p: "کوو", f: "kawoo" }]],
        [[{ p: "کوم", f: "kawum" }], [{ p: "کوو", f: "kawoo" }]],
        [[{ p: "کوې", f: "kawe" }], [{ p: "کوئ", f: "kawey" }]],
        [[{ p: "کوې", f: "kawe" }], [{ p: "کوئ", f: "kawey" }]],
        [[{ p: "کاوه", f: "kaawu" }], [{ p: "کول", f: "kawúl" }]],
        [[{ p: "کوه", f: "kawa" }], [{ p: "کوې", f: "kawe" }]],
      ],
      long: [
        [[{ p: "کولم", f: "kawúlum" }], [{ p: "کولو", f: "kawúloo" }]],
        [[{ p: "کولم", f: "kawúlum" }], [{ p: "کولو", f: "kawúloo" }]],
        [[{ p: "کولې", f: "kawúle" }], [{ p: "کولئ", f: "kawúley" }]],
        [[{ p: "کولې", f: "kawúle" }], [{ p: "کولئ", f: "kawúley" }]],
        [
          [
            { p: "کوله", f: "kawúlu" },
            { p: "کولو", f: "kawúlo" },
          ],
          [{ p: "کول", f: "kawúl" }],
        ],
        [[{ p: "کوله", f: "kawúla" }], [{ p: "کولې", f: "kawúle" }]],
      ],
    },
    habitualPast: {
      short: [
        [[{ p: "به کوم", f: "ba kawum" }], [{ p: "به کوو", f: "ba kawoo" }]],
        [[{ p: "به کوم", f: "ba kawum" }], [{ p: "به کوو", f: "ba kawoo" }]],
        [[{ p: "به کوې", f: "ba kawe" }], [{ p: "به کوئ", f: "ba kawey" }]],
        [[{ p: "به کوې", f: "ba kawe" }], [{ p: "به کوئ", f: "ba kawey" }]],
        [[{ p: "به کاوه", f: "ba kaawu" }], [{ p: "به کول", f: "ba kawúl" }]],
        [[{ p: "به کوه", f: "ba kawa" }], [{ p: "به کوې", f: "ba kawe" }]],
      ],
      long: [
        [
          [{ p: "به کولم", f: "ba kawúlum" }],
          [{ p: "به کولو", f: "ba kawúloo" }],
        ],
        [
          [{ p: "به کولم", f: "ba kawúlum" }],
          [{ p: "به کولو", f: "ba kawúloo" }],
        ],
        [
          [{ p: "به کولې", f: "ba kawúle" }],
          [{ p: "به کولئ", f: "ba kawúley" }],
        ],
        [
          [{ p: "به کولې", f: "ba kawúle" }],
          [{ p: "به کولئ", f: "ba kawúley" }],
        ],
        [
          [
            { p: "به کوله", f: "ba kawúlu" },
            { p: "به کولو", f: "ba kawúlo" },
          ],
          [{ p: "به کول", f: "ba kawúl" }],
        ],
        [
          [{ p: "به کوله", f: "ba kawúla" }],
          [{ p: "به کولې", f: "ba kawúle" }],
        ],
      ],
    },
    modal: kawulImperfectiveModal,
  },
  perfective: {
    nonImperative: {
      long: [
        [[{ p: "وکړم", f: "óokRum" }], [{ p: "وکړو", f: "óokRoo" }]],
        [[{ p: "وکړم", f: "óokRum" }], [{ p: "وکړو", f: "óokRoo" }]],
        [[{ p: "وکړې", f: "óokRe" }], [{ p: "وکړئ", f: "óokRey" }]],
        [[{ p: "وکړې", f: "óokRe" }], [{ p: "وکړئ", f: "óokRey" }]],
        [[{ p: "وکړي", f: "óokRee" }], [{ p: "وکړي", f: "óokRee" }]],
        [[{ p: "وکړي", f: "óokRee" }], [{ p: "وکړي", f: "óokRee" }]],
      ],
      short: [
        [[{ p: "وکم", f: "óokum" }], [{ p: "وکو", f: "óokoo" }]],
        [[{ p: "وکم", f: "óokum" }], [{ p: "وکو", f: "óokoo" }]],
        [[{ p: "وکې", f: "óoke" }], [{ p: "وکئ", f: "óokey" }]],
        [[{ p: "وکې", f: "óoke" }], [{ p: "وکئ", f: "óokey" }]],
        [[{ p: "وکي", f: "óokee" }], [{ p: "وکي", f: "óokee" }]],
        [[{ p: "وکي", f: "óokee" }], [{ p: "وکي", f: "óokee" }]],
      ],
    },
    future: {
      long: [
        [
          [{ p: "به وکړم", f: "ba óokRum" }],
          [{ p: "به وکړو", f: "ba óokRoo" }],
        ],
        [
          [{ p: "به وکړم", f: "ba óokRum" }],
          [{ p: "به وکړو", f: "ba óokRoo" }],
        ],
        [[{ p: "به وکړې", f: "ba óokRe" }], [{ p: "به وکړئ", f: "ba óokRey" }]],
        [[{ p: "به وکړې", f: "ba óokRe" }], [{ p: "به وکړئ", f: "ba óokRey" }]],
        [
          [{ p: "به وکړي", f: "ba óokRee" }],
          [{ p: "به وکړي", f: "ba óokRee" }],
        ],
        [
          [{ p: "به وکړي", f: "ba óokRee" }],
          [{ p: "به وکړي", f: "ba óokRee" }],
        ],
      ],
      short: [
        [[{ p: "به وکم", f: "ba óokum" }], [{ p: "به وکو", f: "ba óokoo" }]],
        [[{ p: "به وکم", f: "ba óokum" }], [{ p: "به وکو", f: "ba óokoo" }]],
        [[{ p: "به وکې", f: "ba óoke" }], [{ p: "به وکئ", f: "ba óokey" }]],
        [[{ p: "به وکې", f: "ba óoke" }], [{ p: "به وکئ", f: "ba óokey" }]],
        [[{ p: "به وکي", f: "ba óokee" }], [{ p: "به وکي", f: "ba óokee" }]],
        [[{ p: "به وکي", f: "ba óokee" }], [{ p: "به وکي", f: "ba óokee" }]],
      ],
    },
    imperative: {
      long: [
        [[{ p: "وکړه", f: "óokRa" }], [{ p: "وکړئ", f: "óokRey" }]],
        [[{ p: "وکړه", f: "óokRa" }], [{ p: "وکړئ", f: "óokRey" }]],
      ],
      short: [
        [[{ p: "وکه", f: "óoka" }], [{ p: "وکئ", f: "óokey" }]],
        [[{ p: "وکه", f: "óoka" }], [{ p: "وکئ", f: "óokey" }]],
      ],
    },
    past: {
      mini: [
        [[{ p: "وکم", f: "óokum" }], [{ p: "وکو", f: "óokoo" }]],
        [[{ p: "وکم", f: "óokum" }], [{ p: "وکو", f: "óokoo" }]],
        [[{ p: "وکې", f: "óoke" }], [{ p: "وکئ", f: "óokey" }]],
        [[{ p: "وکې", f: "óoke" }], [{ p: "وکئ", f: "óokey" }]],
        [
          [
            { p: "وکه", f: "óoku" },
            { p: "وکو", f: "óoko" },
          ],
          [
            { p: "وکړل", f: "óokRul" },
            { p: "وکو", f: "óokoo" },
          ],
        ],
        [[{ p: "وکه", f: "óoka" }], [{ p: "وکې", f: "óoke" }]],
      ],
      short: [
        [[{ p: "وکړم", f: "óokRum" }], [{ p: "وکړو", f: "óokRoo" }]],
        [[{ p: "وکړم", f: "óokRum" }], [{ p: "وکړو", f: "óokRoo" }]],
        [[{ p: "وکړې", f: "óokRe" }], [{ p: "وکړئ", f: "óokRey" }]],
        [[{ p: "وکړې", f: "óokRe" }], [{ p: "وکړئ", f: "óokRey" }]],
        [
          [
            { p: "وکړه", f: "óokRu" },
            { p: "وکړو", f: "óokRo" },
            { p: "وکړ", f: "óokuR" },
          ],
          [
            { p: "وکړل", f: "óokRul" },
            { p: "وکړو", f: "óokRoo" },
          ],
        ],
        [[{ p: "وکړه", f: "óokRa" }], [{ p: "وکړې", f: "óokRe" }]],
      ],
      long: [
        [[{ p: "وکړلم", f: "óokRulum" }], [{ p: "وکړلو", f: "óokRuloo" }]],
        [[{ p: "وکړلم", f: "óokRulum" }], [{ p: "وکړلو", f: "óokRuloo" }]],
        [[{ p: "وکړلې", f: "óokRule" }], [{ p: "وکړلئ", f: "óokRuley" }]],
        [[{ p: "وکړلې", f: "óokRule" }], [{ p: "وکړلئ", f: "óokRuley" }]],
        [
          [{ p: "وکړلو", f: "óokRulo" }],
          [
            { p: "وکړل", f: "óokRul" },
            { p: "وکړلو", f: "óokRuloo" },
          ],
        ],
        [[{ p: "وکړله", f: "óokRula" }], [{ p: "وکړلې", f: "óokRule" }]],
      ],
    },
    habitualPast: {
      mini: [
        [[{ p: "به وکم", f: "ba óokum" }], [{ p: "به وکو", f: "ba óokoo" }]],
        [[{ p: "به وکم", f: "ba óokum" }], [{ p: "به وکو", f: "ba óokoo" }]],
        [[{ p: "به وکې", f: "ba óoke" }], [{ p: "به وکئ", f: "ba óokey" }]],
        [[{ p: "به وکې", f: "ba óoke" }], [{ p: "به وکئ", f: "ba óokey" }]],
        [
          [
            { p: "به وکه", f: "ba óoku" },
            { p: "به وکو", f: "ba óoko" },
          ],
          [
            { p: "به وکړل", f: "ba óokRul" },
            { p: "به وکو", f: "ba óokoo" },
          ],
        ],
        [[{ p: "به وکه", f: "ba óoka" }], [{ p: "به وکې", f: "ba óoke" }]],
      ],
      short: [
        [
          [{ p: "به وکړم", f: "ba óokRum" }],
          [{ p: "به وکړو", f: "ba óokRoo" }],
        ],
        [
          [{ p: "به وکړم", f: "ba óokRum" }],
          [{ p: "به وکړو", f: "ba óokRoo" }],
        ],
        [[{ p: "به وکړې", f: "ba óokRe" }], [{ p: "به وکړئ", f: "ba óokRey" }]],
        [[{ p: "به وکړې", f: "ba óokRe" }], [{ p: "به وکړئ", f: "ba óokRey" }]],
        [
          [
            { p: "به وکړه", f: "ba óokRu" },
            { p: "به وکړو", f: "ba óokRo" },
            { p: "به وکړ", f: "ba óokuR" },
          ],
          [
            { p: "به وکړل", f: "ba óokRul" },
            { p: "به وکړو", f: "ba óokRoo" },
          ],
        ],
        [[{ p: "به وکړه", f: "ba óokRa" }], [{ p: "به وکړې", f: "ba óokRe" }]],
      ],
      long: [
        [
          [{ p: "به وکړلم", f: "ba óokRulum" }],
          [{ p: "به وکړلو", f: "ba óokRuloo" }],
        ],
        [
          [{ p: "به وکړلم", f: "ba óokRulum" }],
          [{ p: "به وکړلو", f: "ba óokRuloo" }],
        ],
        [
          [{ p: "به وکړلې", f: "ba óokRule" }],
          [{ p: "به وکړلئ", f: "ba óokRuley" }],
        ],
        [
          [{ p: "به وکړلې", f: "ba óokRule" }],
          [{ p: "به وکړلئ", f: "ba óokRuley" }],
        ],
        [
          [{ p: "به وکړلو", f: "ba óokRulo" }],
          [
            { p: "به وکړل", f: "ba óokRul" },
            { p: "به وکړلو", f: "ba óokRuloo" },
          ],
        ],
        [
          [{ p: "به وکړله", f: "ba óokRula" }],
          [{ p: "به وکړلې", f: "ba óokRule" }],
        ],
      ],
    },
    modal: {
      nonImperative: {
        long: [
          [
            [
              {
                p: "وکولی شم",
                f: "óokawulay shum",
              },
              {
                p: "وکړلی شم",
                f: "óokRulay shum",
              },
              {
                p: "وکولای شم",
                f: "óokawulaay shum",
              },
              {
                p: "وکړلای شم",
                f: "óokRulaay shum",
              },
            ],
            [
              {
                p: "وکولی شو",
                f: "óokawulay shoo",
              },
              {
                p: "وکړلی شو",
                f: "óokRulay shoo",
              },
              {
                p: "وکولای شو",
                f: "óokawulaay shoo",
              },
              {
                p: "وکړلای شو",
                f: "óokRulaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "وکولی شم",
                f: "óokawulay shum",
              },
              {
                p: "وکړلی شم",
                f: "óokRulay shum",
              },
              {
                p: "وکولای شم",
                f: "óokawulaay shum",
              },
              {
                p: "وکړلای شم",
                f: "óokRulaay shum",
              },
            ],
            [
              {
                p: "وکولی شو",
                f: "óokawulay shoo",
              },
              {
                p: "وکړلی شو",
                f: "óokRulay shoo",
              },
              {
                p: "وکولای شو",
                f: "óokawulaay shoo",
              },
              {
                p: "وکړلای شو",
                f: "óokRulaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "وکولی شې",
                f: "óokawulay she",
              },
              {
                p: "وکړلی شې",
                f: "óokRulay she",
              },
              {
                p: "وکولای شې",
                f: "óokawulaay she",
              },
              {
                p: "وکړلای شې",
                f: "óokRulaay she",
              },
            ],
            [
              {
                p: "وکولی شئ",
                f: "óokawulay shey",
              },
              {
                p: "وکړلی شئ",
                f: "óokRulay shey",
              },
              {
                p: "وکولای شئ",
                f: "óokawulaay shey",
              },
              {
                p: "وکړلای شئ",
                f: "óokRulaay shey",
              },
            ],
          ],
          [
            [
              {
                p: "وکولی شې",
                f: "óokawulay she",
              },
              {
                p: "وکړلی شې",
                f: "óokRulay she",
              },
              {
                p: "وکولای شې",
                f: "óokawulaay she",
              },
              {
                p: "وکړلای شې",
                f: "óokRulaay she",
              },
            ],
            [
              {
                p: "وکولی شئ",
                f: "óokawulay shey",
              },
              {
                p: "وکړلی شئ",
                f: "óokRulay shey",
              },
              {
                p: "وکولای شئ",
                f: "óokawulaay shey",
              },
              {
                p: "وکړلای شئ",
                f: "óokRulaay shey",
              },
            ],
          ],
          [
            [
              {
                p: "وکولی شي",
                f: "óokawulay shee",
              },
              {
                p: "وکړلی شي",
                f: "óokRulay shee",
              },
              {
                p: "وکولای شي",
                f: "óokawulaay shee",
              },
              {
                p: "وکړلای شي",
                f: "óokRulaay shee",
              },
            ],
            [
              {
                p: "وکولی شي",
                f: "óokawulay shee",
              },
              {
                p: "وکړلی شي",
                f: "óokRulay shee",
              },
              {
                p: "وکولای شي",
                f: "óokawulaay shee",
              },
              {
                p: "وکړلای شي",
                f: "óokRulaay shee",
              },
            ],
          ],
          [
            [
              {
                p: "وکولی شي",
                f: "óokawulay shee",
              },
              {
                p: "وکړلی شي",
                f: "óokRulay shee",
              },
              {
                p: "وکولای شي",
                f: "óokawulaay shee",
              },
              {
                p: "وکړلای شي",
                f: "óokRulaay shee",
              },
            ],
            [
              {
                p: "وکولی شي",
                f: "óokawulay shee",
              },
              {
                p: "وکړلی شي",
                f: "óokRulay shee",
              },
              {
                p: "وکولای شي",
                f: "óokawulaay shee",
              },
              {
                p: "وکړلای شي",
                f: "óokRulaay shee",
              },
            ],
          ],
        ],
        short: [
          [
            [
              {
                p: "وکوی شم",
                f: "óokaway shum",
              },
              {
                p: "وکړی شم",
                f: "óokRay shum",
              },
              {
                p: "وکوای شم",
                f: "óokawaay shum",
              },
              {
                p: "وکړای شم",
                f: "óokRaay shum",
              },
            ],
            [
              {
                p: "وکوی شو",
                f: "óokaway shoo",
              },
              {
                p: "وکړی شو",
                f: "óokRay shoo",
              },
              {
                p: "وکوای شو",
                f: "óokawaay shoo",
              },
              {
                p: "وکړای شو",
                f: "óokRaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "وکوی شم",
                f: "óokaway shum",
              },
              {
                p: "وکړی شم",
                f: "óokRay shum",
              },
              {
                p: "وکوای شم",
                f: "óokawaay shum",
              },
              {
                p: "وکړای شم",
                f: "óokRaay shum",
              },
            ],
            [
              {
                p: "وکوی شو",
                f: "óokaway shoo",
              },
              {
                p: "وکړی شو",
                f: "óokRay shoo",
              },
              {
                p: "وکوای شو",
                f: "óokawaay shoo",
              },
              {
                p: "وکړای شو",
                f: "óokRaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "وکوی شې",
                f: "óokaway she",
              },
              {
                p: "وکړی شې",
                f: "óokRay she",
              },
              {
                p: "وکوای شې",
                f: "óokawaay she",
              },
              {
                p: "وکړای شې",
                f: "óokRaay she",
              },
            ],
            [
              {
                p: "وکوی شئ",
                f: "óokaway shey",
              },
              {
                p: "وکړی شئ",
                f: "óokRay shey",
              },
              {
                p: "وکوای شئ",
                f: "óokawaay shey",
              },
              {
                p: "وکړای شئ",
                f: "óokRaay shey",
              },
            ],
          ],
          [
            [
              {
                p: "وکوی شې",
                f: "óokaway she",
              },
              {
                p: "وکړی شې",
                f: "óokRay she",
              },
              {
                p: "وکوای شې",
                f: "óokawaay she",
              },
              {
                p: "وکړای شې",
                f: "óokRaay she",
              },
            ],
            [
              {
                p: "وکوی شئ",
                f: "óokaway shey",
              },
              {
                p: "وکړی شئ",
                f: "óokRay shey",
              },
              {
                p: "وکوای شئ",
                f: "óokawaay shey",
              },
              {
                p: "وکړای شئ",
                f: "óokRaay shey",
              },
            ],
          ],
          [
            [
              {
                p: "وکوی شي",
                f: "óokaway shee",
              },
              {
                p: "وکړی شي",
                f: "óokRay shee",
              },
              {
                p: "وکوای شي",
                f: "óokawaay shee",
              },
              {
                p: "وکړای شي",
                f: "óokRaay shee",
              },
            ],
            [
              {
                p: "وکوی شي",
                f: "óokaway shee",
              },
              {
                p: "وکړی شي",
                f: "óokRay shee",
              },
              {
                p: "وکوای شي",
                f: "óokawaay shee",
              },
              {
                p: "وکړای شي",
                f: "óokRaay shee",
              },
            ],
          ],
          [
            [
              {
                p: "وکوی شي",
                f: "óokaway shee",
              },
              {
                p: "وکړی شي",
                f: "óokRay shee",
              },
              {
                p: "وکوای شي",
                f: "óokawaay shee",
              },
              {
                p: "وکړای شي",
                f: "óokRaay shee",
              },
            ],
            [
              {
                p: "وکوی شي",
                f: "óokaway shee",
              },
              {
                p: "وکړی شي",
                f: "óokRay shee",
              },
              {
                p: "وکوای شي",
                f: "óokawaay shee",
              },
              {
                p: "وکړای شي",
                f: "óokRaay shee",
              },
            ],
          ],
        ],
      },
      future: {
        long: [
          [
            [
              {
                p: "به وکولی شم",
                f: "ba óokawulay shum",
              },
              {
                p: "به وکړلی شم",
                f: "ba óokRulay shum",
              },
              {
                p: "به وکولای شم",
                f: "ba óokawulaay shum",
              },
              {
                p: "به وکړلای شم",
                f: "ba óokRulaay shum",
              },
            ],
            [
              {
                p: "به وکولی شو",
                f: "ba óokawulay shoo",
              },
              {
                p: "به وکړلی شو",
                f: "ba óokRulay shoo",
              },
              {
                p: "به وکولای شو",
                f: "ba óokawulaay shoo",
              },
              {
                p: "به وکړلای شو",
                f: "ba óokRulaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "به وکولی شم",
                f: "ba óokawulay shum",
              },
              {
                p: "به وکړلی شم",
                f: "ba óokRulay shum",
              },
              {
                p: "به وکولای شم",
                f: "ba óokawulaay shum",
              },
              {
                p: "به وکړلای شم",
                f: "ba óokRulaay shum",
              },
            ],
            [
              {
                p: "به وکولی شو",
                f: "ba óokawulay shoo",
              },
              {
                p: "به وکړلی شو",
                f: "ba óokRulay shoo",
              },
              {
                p: "به وکولای شو",
                f: "ba óokawulaay shoo",
              },
              {
                p: "به وکړلای شو",
                f: "ba óokRulaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "به وکولی شې",
                f: "ba óokawulay she",
              },
              {
                p: "به وکړلی شې",
                f: "ba óokRulay she",
              },
              {
                p: "به وکولای شې",
                f: "ba óokawulaay she",
              },
              {
                p: "به وکړلای شې",
                f: "ba óokRulaay she",
              },
            ],
            [
              {
                p: "به وکولی شئ",
                f: "ba óokawulay shey",
              },
              {
                p: "به وکړلی شئ",
                f: "ba óokRulay shey",
              },
              {
                p: "به وکولای شئ",
                f: "ba óokawulaay shey",
              },
              {
                p: "به وکړلای شئ",
                f: "ba óokRulaay shey",
              },
            ],
          ],
          [
            [
              {
                p: "به وکولی شې",
                f: "ba óokawulay she",
              },
              {
                p: "به وکړلی شې",
                f: "ba óokRulay she",
              },
              {
                p: "به وکولای شې",
                f: "ba óokawulaay she",
              },
              {
                p: "به وکړلای شې",
                f: "ba óokRulaay she",
              },
            ],
            [
              {
                p: "به وکولی شئ",
                f: "ba óokawulay shey",
              },
              {
                p: "به وکړلی شئ",
                f: "ba óokRulay shey",
              },
              {
                p: "به وکولای شئ",
                f: "ba óokawulaay shey",
              },
              {
                p: "به وکړلای شئ",
                f: "ba óokRulaay shey",
              },
            ],
          ],
          [
            [
              {
                p: "به وکولی شي",
                f: "ba óokawulay shee",
              },
              {
                p: "به وکړلی شي",
                f: "ba óokRulay shee",
              },
              {
                p: "به وکولای شي",
                f: "ba óokawulaay shee",
              },
              {
                p: "به وکړلای شي",
                f: "ba óokRulaay shee",
              },
            ],
            [
              {
                p: "به وکولی شي",
                f: "ba óokawulay shee",
              },
              {
                p: "به وکړلی شي",
                f: "ba óokRulay shee",
              },
              {
                p: "به وکولای شي",
                f: "ba óokawulaay shee",
              },
              {
                p: "به وکړلای شي",
                f: "ba óokRulaay shee",
              },
            ],
          ],
          [
            [
              {
                p: "به وکولی شي",
                f: "ba óokawulay shee",
              },
              {
                p: "به وکړلی شي",
                f: "ba óokRulay shee",
              },
              {
                p: "به وکولای شي",
                f: "ba óokawulaay shee",
              },
              {
                p: "به وکړلای شي",
                f: "ba óokRulaay shee",
              },
            ],
            [
              {
                p: "به وکولی شي",
                f: "ba óokawulay shee",
              },
              {
                p: "به وکړلی شي",
                f: "ba óokRulay shee",
              },
              {
                p: "به وکولای شي",
                f: "ba óokawulaay shee",
              },
              {
                p: "به وکړلای شي",
                f: "ba óokRulaay shee",
              },
            ],
          ],
        ],
        short: [
          [
            [
              {
                p: "به وکوی شم",
                f: "ba óokaway shum",
              },
              {
                p: "به وکړی شم",
                f: "ba óokRay shum",
              },
              {
                p: "به وکوای شم",
                f: "ba óokawaay shum",
              },
              {
                p: "به وکړای شم",
                f: "ba óokRaay shum",
              },
            ],
            [
              {
                p: "به وکوی شو",
                f: "ba óokaway shoo",
              },
              {
                p: "به وکړی شو",
                f: "ba óokRay shoo",
              },
              {
                p: "به وکوای شو",
                f: "ba óokawaay shoo",
              },
              {
                p: "به وکړای شو",
                f: "ba óokRaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "به وکوی شم",
                f: "ba óokaway shum",
              },
              {
                p: "به وکړی شم",
                f: "ba óokRay shum",
              },
              {
                p: "به وکوای شم",
                f: "ba óokawaay shum",
              },
              {
                p: "به وکړای شم",
                f: "ba óokRaay shum",
              },
            ],
            [
              {
                p: "به وکوی شو",
                f: "ba óokaway shoo",
              },
              {
                p: "به وکړی شو",
                f: "ba óokRay shoo",
              },
              {
                p: "به وکوای شو",
                f: "ba óokawaay shoo",
              },
              {
                p: "به وکړای شو",
                f: "ba óokRaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "به وکوی شې",
                f: "ba óokaway she",
              },
              {
                p: "به وکړی شې",
                f: "ba óokRay she",
              },
              {
                p: "به وکوای شې",
                f: "ba óokawaay she",
              },
              {
                p: "به وکړای شې",
                f: "ba óokRaay she",
              },
            ],
            [
              {
                p: "به وکوی شئ",
                f: "ba óokaway shey",
              },
              {
                p: "به وکړی شئ",
                f: "ba óokRay shey",
              },
              {
                p: "به وکوای شئ",
                f: "ba óokawaay shey",
              },
              {
                p: "به وکړای شئ",
                f: "ba óokRaay shey",
              },
            ],
          ],
          [
            [
              {
                p: "به وکوی شې",
                f: "ba óokaway she",
              },
              {
                p: "به وکړی شې",
                f: "ba óokRay she",
              },
              {
                p: "به وکوای شې",
                f: "ba óokawaay she",
              },
              {
                p: "به وکړای شې",
                f: "ba óokRaay she",
              },
            ],
            [
              {
                p: "به وکوی شئ",
                f: "ba óokaway shey",
              },
              {
                p: "به وکړی شئ",
                f: "ba óokRay shey",
              },
              {
                p: "به وکوای شئ",
                f: "ba óokawaay shey",
              },
              {
                p: "به وکړای شئ",
                f: "ba óokRaay shey",
              },
            ],
          ],
          [
            [
              {
                p: "به وکوی شي",
                f: "ba óokaway shee",
              },
              {
                p: "به وکړی شي",
                f: "ba óokRay shee",
              },
              {
                p: "به وکوای شي",
                f: "ba óokawaay shee",
              },
              {
                p: "به وکړای شي",
                f: "ba óokRaay shee",
              },
            ],
            [
              {
                p: "به وکوی شي",
                f: "ba óokaway shee",
              },
              {
                p: "به وکړی شي",
                f: "ba óokRay shee",
              },
              {
                p: "به وکوای شي",
                f: "ba óokawaay shee",
              },
              {
                p: "به وکړای شي",
                f: "ba óokRaay shee",
              },
            ],
          ],
          [
            [
              {
                p: "به وکوی شي",
                f: "ba óokaway shee",
              },
              {
                p: "به وکړی شي",
                f: "ba óokRay shee",
              },
              {
                p: "به وکوای شي",
                f: "ba óokawaay shee",
              },
              {
                p: "به وکړای شي",
                f: "ba óokRaay shee",
              },
            ],
            [
              {
                p: "به وکوی شي",
                f: "ba óokaway shee",
              },
              {
                p: "به وکړی شي",
                f: "ba óokRay shee",
              },
              {
                p: "به وکوای شي",
                f: "ba óokawaay shee",
              },
              {
                p: "به وکړای شي",
                f: "ba óokRaay shee",
              },
            ],
          ],
        ],
      },
      past: {
        long: [
          [
            [
              {
                p: "وکولی شوم",
                f: "óokawulay shwum",
              },
              {
                p: "وکړلی شوم",
                f: "óokRulay shwum",
              },
              {
                p: "وکولای شوم",
                f: "óokawulaay shwum",
              },
              {
                p: "وکړلای شوم",
                f: "óokRulaay shwum",
              },
            ],
            [
              {
                p: "وکولی شو",
                f: "óokawulay shoo",
              },
              {
                p: "وکړلی شو",
                f: "óokRulay shoo",
              },
              {
                p: "وکولای شو",
                f: "óokawulaay shoo",
              },
              {
                p: "وکړلای شو",
                f: "óokRulaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "وکولی شوم",
                f: "óokawulay shwum",
              },
              {
                p: "وکړلی شوم",
                f: "óokRulay shwum",
              },
              {
                p: "وکولای شوم",
                f: "óokawulaay shwum",
              },
              {
                p: "وکړلای شوم",
                f: "óokRulaay shwum",
              },
            ],
            [
              {
                p: "وکولی شو",
                f: "óokawulay shoo",
              },
              {
                p: "وکړلی شو",
                f: "óokRulay shoo",
              },
              {
                p: "وکولای شو",
                f: "óokawulaay shoo",
              },
              {
                p: "وکړلای شو",
                f: "óokRulaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "وکولی شوې",
                f: "óokawulay shwe",
              },
              {
                p: "وکړلی شوې",
                f: "óokRulay shwe",
              },
              {
                p: "وکولای شوې",
                f: "óokawulaay shwe",
              },
              {
                p: "وکړلای شوې",
                f: "óokRulaay shwe",
              },
            ],
            [
              {
                p: "وکولی شوئ",
                f: "óokawulay shwey",
              },
              {
                p: "وکړلی شوئ",
                f: "óokRulay shwey",
              },
              {
                p: "وکولای شوئ",
                f: "óokawulaay shwey",
              },
              {
                p: "وکړلای شوئ",
                f: "óokRulaay shwey",
              },
            ],
          ],
          [
            [
              {
                p: "وکولی شوې",
                f: "óokawulay shwe",
              },
              {
                p: "وکړلی شوې",
                f: "óokRulay shwe",
              },
              {
                p: "وکولای شوې",
                f: "óokawulaay shwe",
              },
              {
                p: "وکړلای شوې",
                f: "óokRulaay shwe",
              },
            ],
            [
              {
                p: "وکولی شوئ",
                f: "óokawulay shwey",
              },
              {
                p: "وکړلی شوئ",
                f: "óokRulay shwey",
              },
              {
                p: "وکولای شوئ",
                f: "óokawulaay shwey",
              },
              {
                p: "وکړلای شوئ",
                f: "óokRulaay shwey",
              },
            ],
          ],
          [
            [
              {
                p: "وکولی شو",
                f: "óokawulay sho",
              },
              {
                p: "وکړلی شو",
                f: "óokRulay sho",
              },
              {
                p: "وکولای شو",
                f: "óokawulaay sho",
              },
              {
                p: "وکړلای شو",
                f: "óokRulaay sho",
              },
            ],
            [
              {
                p: "وکولی شول",
                f: "óokawulay shwul",
              },
              {
                p: "وکړلی شول",
                f: "óokRulay shwul",
              },
              {
                p: "وکولای شول",
                f: "óokawulaay shwul",
              },
              {
                p: "وکړلای شول",
                f: "óokRulaay shwul",
              },
              {
                p: "وکولی شو",
                f: "óokawulay shoo",
              },
              {
                p: "وکړلی شو",
                f: "óokRulay shoo",
              },
              {
                p: "وکولای شو",
                f: "óokawulaay shoo",
              },
              {
                p: "وکړلای شو",
                f: "óokRulaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "وکولی شوه",
                f: "óokawulay shwa",
              },
              {
                p: "وکړلی شوه",
                f: "óokRulay shwa",
              },
              {
                p: "وکولای شوه",
                f: "óokawulaay shwa",
              },
              {
                p: "وکړلای شوه",
                f: "óokRulaay shwa",
              },
            ],
            [
              {
                p: "وکولی شولې",
                f: "óokawulay shwule",
              },
              {
                p: "وکړلی شولې",
                f: "óokRulay shwule",
              },
              {
                p: "وکولای شولې",
                f: "óokawulaay shwule",
              },
              {
                p: "وکړلای شولې",
                f: "óokRulaay shwule",
              },
              {
                p: "وکولی شوې",
                f: "óokawulay shwe",
              },
              {
                p: "وکړلی شوې",
                f: "óokRulay shwe",
              },
              {
                p: "وکولای شوې",
                f: "óokawulaay shwe",
              },
              {
                p: "وکړلای شوې",
                f: "óokRulaay shwe",
              },
            ],
          ],
        ],
        short: [
          [
            [
              {
                p: "وکوی شوم",
                f: "óokaway shwum",
              },
              {
                p: "وکړی شوم",
                f: "óokRay shwum",
              },
              {
                p: "وکوای شوم",
                f: "óokawaay shwum",
              },
              {
                p: "وکړای شوم",
                f: "óokRaay shwum",
              },
            ],
            [
              {
                p: "وکوی شو",
                f: "óokaway shoo",
              },
              {
                p: "وکړی شو",
                f: "óokRay shoo",
              },
              {
                p: "وکوای شو",
                f: "óokawaay shoo",
              },
              {
                p: "وکړای شو",
                f: "óokRaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "وکوی شوم",
                f: "óokaway shwum",
              },
              {
                p: "وکړی شوم",
                f: "óokRay shwum",
              },
              {
                p: "وکوای شوم",
                f: "óokawaay shwum",
              },
              {
                p: "وکړای شوم",
                f: "óokRaay shwum",
              },
            ],
            [
              {
                p: "وکوی شو",
                f: "óokaway shoo",
              },
              {
                p: "وکړی شو",
                f: "óokRay shoo",
              },
              {
                p: "وکوای شو",
                f: "óokawaay shoo",
              },
              {
                p: "وکړای شو",
                f: "óokRaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "وکوی شوې",
                f: "óokaway shwe",
              },
              {
                p: "وکړی شوې",
                f: "óokRay shwe",
              },
              {
                p: "وکوای شوې",
                f: "óokawaay shwe",
              },
              {
                p: "وکړای شوې",
                f: "óokRaay shwe",
              },
            ],
            [
              {
                p: "وکوی شوئ",
                f: "óokaway shwey",
              },
              {
                p: "وکړی شوئ",
                f: "óokRay shwey",
              },
              {
                p: "وکوای شوئ",
                f: "óokawaay shwey",
              },
              {
                p: "وکړای شوئ",
                f: "óokRaay shwey",
              },
            ],
          ],
          [
            [
              {
                p: "وکوی شوې",
                f: "óokaway shwe",
              },
              {
                p: "وکړی شوې",
                f: "óokRay shwe",
              },
              {
                p: "وکوای شوې",
                f: "óokawaay shwe",
              },
              {
                p: "وکړای شوې",
                f: "óokRaay shwe",
              },
            ],
            [
              {
                p: "وکوی شوئ",
                f: "óokaway shwey",
              },
              {
                p: "وکړی شوئ",
                f: "óokRay shwey",
              },
              {
                p: "وکوای شوئ",
                f: "óokawaay shwey",
              },
              {
                p: "وکړای شوئ",
                f: "óokRaay shwey",
              },
            ],
          ],
          [
            [
              {
                p: "وکوی شو",
                f: "óokaway sho",
              },
              {
                p: "وکړی شو",
                f: "óokRay sho",
              },
              {
                p: "وکوای شو",
                f: "óokawaay sho",
              },
              {
                p: "وکړای شو",
                f: "óokRaay sho",
              },
            ],
            [
              {
                p: "وکوی شول",
                f: "óokaway shwul",
              },
              {
                p: "وکړی شول",
                f: "óokRay shwul",
              },
              {
                p: "وکوای شول",
                f: "óokawaay shwul",
              },
              {
                p: "وکړای شول",
                f: "óokRaay shwul",
              },
              {
                p: "وکوی شو",
                f: "óokaway shoo",
              },
              {
                p: "وکړی شو",
                f: "óokRay shoo",
              },
              {
                p: "وکوای شو",
                f: "óokawaay shoo",
              },
              {
                p: "وکړای شو",
                f: "óokRaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "وکوی شوه",
                f: "óokaway shwa",
              },
              {
                p: "وکړی شوه",
                f: "óokRay shwa",
              },
              {
                p: "وکوای شوه",
                f: "óokawaay shwa",
              },
              {
                p: "وکړای شوه",
                f: "óokRaay shwa",
              },
            ],
            [
              {
                p: "وکوی شولې",
                f: "óokaway shwule",
              },
              {
                p: "وکړی شولې",
                f: "óokRay shwule",
              },
              {
                p: "وکوای شولې",
                f: "óokawaay shwule",
              },
              {
                p: "وکړای شولې",
                f: "óokRaay shwule",
              },
              {
                p: "وکوی شوې",
                f: "óokaway shwe",
              },
              {
                p: "وکړی شوې",
                f: "óokRay shwe",
              },
              {
                p: "وکوای شوې",
                f: "óokawaay shwe",
              },
              {
                p: "وکړای شوې",
                f: "óokRaay shwe",
              },
            ],
          ],
        ],
      },
      habitualPast: {
        long: [
          [
            [
              {
                p: "به وکولی شوم",
                f: "ba óokawulay shwum",
              },
              {
                p: "به وکړلی شوم",
                f: "ba óokRulay shwum",
              },
              {
                p: "به وکولای شوم",
                f: "ba óokawulaay shwum",
              },
              {
                p: "به وکړلای شوم",
                f: "ba óokRulaay shwum",
              },
            ],
            [
              {
                p: "به وکولی شو",
                f: "ba óokawulay shoo",
              },
              {
                p: "به وکړلی شو",
                f: "ba óokRulay shoo",
              },
              {
                p: "به وکولای شو",
                f: "ba óokawulaay shoo",
              },
              {
                p: "به وکړلای شو",
                f: "ba óokRulaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "به وکولی شوم",
                f: "ba óokawulay shwum",
              },
              {
                p: "به وکړلی شوم",
                f: "ba óokRulay shwum",
              },
              {
                p: "به وکولای شوم",
                f: "ba óokawulaay shwum",
              },
              {
                p: "به وکړلای شوم",
                f: "ba óokRulaay shwum",
              },
            ],
            [
              {
                p: "به وکولی شو",
                f: "ba óokawulay shoo",
              },
              {
                p: "به وکړلی شو",
                f: "ba óokRulay shoo",
              },
              {
                p: "به وکولای شو",
                f: "ba óokawulaay shoo",
              },
              {
                p: "به وکړلای شو",
                f: "ba óokRulaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "به وکولی شوې",
                f: "ba óokawulay shwe",
              },
              {
                p: "به وکړلی شوې",
                f: "ba óokRulay shwe",
              },
              {
                p: "به وکولای شوې",
                f: "ba óokawulaay shwe",
              },
              {
                p: "به وکړلای شوې",
                f: "ba óokRulaay shwe",
              },
            ],
            [
              {
                p: "به وکولی شوئ",
                f: "ba óokawulay shwey",
              },
              {
                p: "به وکړلی شوئ",
                f: "ba óokRulay shwey",
              },
              {
                p: "به وکولای شوئ",
                f: "ba óokawulaay shwey",
              },
              {
                p: "به وکړلای شوئ",
                f: "ba óokRulaay shwey",
              },
            ],
          ],
          [
            [
              {
                p: "به وکولی شوې",
                f: "ba óokawulay shwe",
              },
              {
                p: "به وکړلی شوې",
                f: "ba óokRulay shwe",
              },
              {
                p: "به وکولای شوې",
                f: "ba óokawulaay shwe",
              },
              {
                p: "به وکړلای شوې",
                f: "ba óokRulaay shwe",
              },
            ],
            [
              {
                p: "به وکولی شوئ",
                f: "ba óokawulay shwey",
              },
              {
                p: "به وکړلی شوئ",
                f: "ba óokRulay shwey",
              },
              {
                p: "به وکولای شوئ",
                f: "ba óokawulaay shwey",
              },
              {
                p: "به وکړلای شوئ",
                f: "ba óokRulaay shwey",
              },
            ],
          ],
          [
            [
              {
                p: "به وکولی شو",
                f: "ba óokawulay sho",
              },
              {
                p: "به وکړلی شو",
                f: "ba óokRulay sho",
              },
              {
                p: "به وکولای شو",
                f: "ba óokawulaay sho",
              },
              {
                p: "به وکړلای شو",
                f: "ba óokRulaay sho",
              },
            ],
            [
              {
                p: "به وکولی شول",
                f: "ba óokawulay shwul",
              },
              {
                p: "به وکړلی شول",
                f: "ba óokRulay shwul",
              },
              {
                p: "به وکولای شول",
                f: "ba óokawulaay shwul",
              },
              {
                p: "به وکړلای شول",
                f: "ba óokRulaay shwul",
              },
              {
                p: "به وکولی شو",
                f: "ba óokawulay shoo",
              },
              {
                p: "به وکړلی شو",
                f: "ba óokRulay shoo",
              },
              {
                p: "به وکولای شو",
                f: "ba óokawulaay shoo",
              },
              {
                p: "به وکړلای شو",
                f: "ba óokRulaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "به وکولی شوه",
                f: "ba óokawulay shwa",
              },
              {
                p: "به وکړلی شوه",
                f: "ba óokRulay shwa",
              },
              {
                p: "به وکولای شوه",
                f: "ba óokawulaay shwa",
              },
              {
                p: "به وکړلای شوه",
                f: "ba óokRulaay shwa",
              },
            ],
            [
              {
                p: "به وکولی شولې",
                f: "ba óokawulay shwule",
              },
              {
                p: "به وکړلی شولې",
                f: "ba óokRulay shwule",
              },
              {
                p: "به وکولای شولې",
                f: "ba óokawulaay shwule",
              },
              {
                p: "به وکړلای شولې",
                f: "ba óokRulaay shwule",
              },
              {
                p: "به وکولی شوې",
                f: "ba óokawulay shwe",
              },
              {
                p: "به وکړلی شوې",
                f: "ba óokRulay shwe",
              },
              {
                p: "به وکولای شوې",
                f: "ba óokawulaay shwe",
              },
              {
                p: "به وکړلای شوې",
                f: "ba óokRulaay shwe",
              },
            ],
          ],
        ],
        short: [
          [
            [
              {
                p: "به وکوی شوم",
                f: "ba óokaway shwum",
              },
              {
                p: "به وکړی شوم",
                f: "ba óokRay shwum",
              },
              {
                p: "به وکوای شوم",
                f: "ba óokawaay shwum",
              },
              {
                p: "به وکړای شوم",
                f: "ba óokRaay shwum",
              },
            ],
            [
              {
                p: "به وکوی شو",
                f: "ba óokaway shoo",
              },
              {
                p: "به وکړی شو",
                f: "ba óokRay shoo",
              },
              {
                p: "به وکوای شو",
                f: "ba óokawaay shoo",
              },
              {
                p: "به وکړای شو",
                f: "ba óokRaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "به وکوی شوم",
                f: "ba óokaway shwum",
              },
              {
                p: "به وکړی شوم",
                f: "ba óokRay shwum",
              },
              {
                p: "به وکوای شوم",
                f: "ba óokawaay shwum",
              },
              {
                p: "به وکړای شوم",
                f: "ba óokRaay shwum",
              },
            ],
            [
              {
                p: "به وکوی شو",
                f: "ba óokaway shoo",
              },
              {
                p: "به وکړی شو",
                f: "ba óokRay shoo",
              },
              {
                p: "به وکوای شو",
                f: "ba óokawaay shoo",
              },
              {
                p: "به وکړای شو",
                f: "ba óokRaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "به وکوی شوې",
                f: "ba óokaway shwe",
              },
              {
                p: "به وکړی شوې",
                f: "ba óokRay shwe",
              },
              {
                p: "به وکوای شوې",
                f: "ba óokawaay shwe",
              },
              {
                p: "به وکړای شوې",
                f: "ba óokRaay shwe",
              },
            ],
            [
              {
                p: "به وکوی شوئ",
                f: "ba óokaway shwey",
              },
              {
                p: "به وکړی شوئ",
                f: "ba óokRay shwey",
              },
              {
                p: "به وکوای شوئ",
                f: "ba óokawaay shwey",
              },
              {
                p: "به وکړای شوئ",
                f: "ba óokRaay shwey",
              },
            ],
          ],
          [
            [
              {
                p: "به وکوی شوې",
                f: "ba óokaway shwe",
              },
              {
                p: "به وکړی شوې",
                f: "ba óokRay shwe",
              },
              {
                p: "به وکوای شوې",
                f: "ba óokawaay shwe",
              },
              {
                p: "به وکړای شوې",
                f: "ba óokRaay shwe",
              },
            ],
            [
              {
                p: "به وکوی شوئ",
                f: "ba óokaway shwey",
              },
              {
                p: "به وکړی شوئ",
                f: "ba óokRay shwey",
              },
              {
                p: "به وکوای شوئ",
                f: "ba óokawaay shwey",
              },
              {
                p: "به وکړای شوئ",
                f: "ba óokRaay shwey",
              },
            ],
          ],
          [
            [
              {
                p: "به وکوی شو",
                f: "ba óokaway sho",
              },
              {
                p: "به وکړی شو",
                f: "ba óokRay sho",
              },
              {
                p: "به وکوای شو",
                f: "ba óokawaay sho",
              },
              {
                p: "به وکړای شو",
                f: "ba óokRaay sho",
              },
            ],
            [
              {
                p: "به وکوی شول",
                f: "ba óokaway shwul",
              },
              {
                p: "به وکړی شول",
                f: "ba óokRay shwul",
              },
              {
                p: "به وکوای شول",
                f: "ba óokawaay shwul",
              },
              {
                p: "به وکړای شول",
                f: "ba óokRaay shwul",
              },
              {
                p: "به وکوی شو",
                f: "ba óokaway shoo",
              },
              {
                p: "به وکړی شو",
                f: "ba óokRay shoo",
              },
              {
                p: "به وکوای شو",
                f: "ba óokawaay shoo",
              },
              {
                p: "به وکړای شو",
                f: "ba óokRaay shoo",
              },
            ],
          ],
          [
            [
              {
                p: "به وکوی شوه",
                f: "ba óokaway shwa",
              },
              {
                p: "به وکړی شوه",
                f: "ba óokRay shwa",
              },
              {
                p: "به وکوای شوه",
                f: "ba óokawaay shwa",
              },
              {
                p: "به وکړای شوه",
                f: "ba óokRaay shwa",
              },
            ],
            [
              {
                p: "به وکوی شولې",
                f: "ba óokaway shwule",
              },
              {
                p: "به وکړی شولې",
                f: "ba óokRay shwule",
              },
              {
                p: "به وکوای شولې",
                f: "ba óokawaay shwule",
              },
              {
                p: "به وکړای شولې",
                f: "ba óokRaay shwule",
              },
              {
                p: "به وکوی شوې",
                f: "ba óokaway shwe",
              },
              {
                p: "به وکړی شوې",
                f: "ba óokRay shwe",
              },
              {
                p: "به وکوای شوې",
                f: "ba óokawaay shwe",
              },
              {
                p: "به وکړای شوې",
                f: "ba óokRaay shwe",
              },
            ],
          ],
        ],
      },
      hypotheticalPast: {
        long: [
          [
            [
              {
                p: "وکولی شوای",
                f: "óokawulay shwaay",
              },
              {
                p: "وکړلی شوای",
                f: "óokRulay shwaay",
              },
              {
                p: "وکولی شوی",
                f: "óokawulay shway",
              },
              {
                p: "وکړلی شوی",
                f: "óokRulay shway",
              },
              {
                p: "وکولای شوای",
                f: "óokawulaay shwaay",
              },
              {
                p: "وکړلای شوای",
                f: "óokRulaay shwaay",
              },
            ],
            [
              {
                p: "وکولی شوای",
                f: "óokawulay shwaay",
              },
              {
                p: "وکړلی شوای",
                f: "óokRulay shwaay",
              },
              {
                p: "وکولی شوی",
                f: "óokawulay shway",
              },
              {
                p: "وکړلی شوی",
                f: "óokRulay shway",
              },
              {
                p: "وکولای شوای",
                f: "óokawulaay shwaay",
              },
              {
                p: "وکړلای شوای",
                f: "óokRulaay shwaay",
              },
            ],
          ],
          [
            [
              {
                p: "وکولی شوای",
                f: "óokawulay shwaay",
              },
              {
                p: "وکړلی شوای",
                f: "óokRulay shwaay",
              },
              {
                p: "وکولی شوی",
                f: "óokawulay shway",
              },
              {
                p: "وکړلی شوی",
                f: "óokRulay shway",
              },
              {
                p: "وکولای شوای",
                f: "óokawulaay shwaay",
              },
              {
                p: "وکړلای شوای",
                f: "óokRulaay shwaay",
              },
            ],
            [
              {
                p: "وکولی شوای",
                f: "óokawulay shwaay",
              },
              {
                p: "وکړلی شوای",
                f: "óokRulay shwaay",
              },
              {
                p: "وکولی شوی",
                f: "óokawulay shway",
              },
              {
                p: "وکړلی شوی",
                f: "óokRulay shway",
              },
              {
                p: "وکولای شوای",
                f: "óokawulaay shwaay",
              },
              {
                p: "وکړلای شوای",
                f: "óokRulaay shwaay",
              },
            ],
          ],
          [
            [
              {
                p: "وکولی شوای",
                f: "óokawulay shwaay",
              },
              {
                p: "وکړلی شوای",
                f: "óokRulay shwaay",
              },
              {
                p: "وکولی شوی",
                f: "óokawulay shway",
              },
              {
                p: "وکړلی شوی",
                f: "óokRulay shway",
              },
              {
                p: "وکولای شوای",
                f: "óokawulaay shwaay",
              },
              {
                p: "وکړلای شوای",
                f: "óokRulaay shwaay",
              },
            ],
            [
              {
                p: "وکولی شوای",
                f: "óokawulay shwaay",
              },
              {
                p: "وکړلی شوای",
                f: "óokRulay shwaay",
              },
              {
                p: "وکولی شوی",
                f: "óokawulay shway",
              },
              {
                p: "وکړلی شوی",
                f: "óokRulay shway",
              },
              {
                p: "وکولای شوای",
                f: "óokawulaay shwaay",
              },
              {
                p: "وکړلای شوای",
                f: "óokRulaay shwaay",
              },
            ],
          ],
          [
            [
              {
                p: "وکولی شوای",
                f: "óokawulay shwaay",
              },
              {
                p: "وکړلی شوای",
                f: "óokRulay shwaay",
              },
              {
                p: "وکولی شوی",
                f: "óokawulay shway",
              },
              {
                p: "وکړلی شوی",
                f: "óokRulay shway",
              },
              {
                p: "وکولای شوای",
                f: "óokawulaay shwaay",
              },
              {
                p: "وکړلای شوای",
                f: "óokRulaay shwaay",
              },
            ],
            [
              {
                p: "وکولی شوای",
                f: "óokawulay shwaay",
              },
              {
                p: "وکړلی شوای",
                f: "óokRulay shwaay",
              },
              {
                p: "وکولی شوی",
                f: "óokawulay shway",
              },
              {
                p: "وکړلی شوی",
                f: "óokRulay shway",
              },
              {
                p: "وکولای شوای",
                f: "óokawulaay shwaay",
              },
              {
                p: "وکړلای شوای",
                f: "óokRulaay shwaay",
              },
            ],
          ],
          [
            [
              {
                p: "وکولی شوای",
                f: "óokawulay shwaay",
              },
              {
                p: "وکړلی شوای",
                f: "óokRulay shwaay",
              },
              {
                p: "وکولی شوی",
                f: "óokawulay shway",
              },
              {
                p: "وکړلی شوی",
                f: "óokRulay shway",
              },
              {
                p: "وکولای شوای",
                f: "óokawulaay shwaay",
              },
              {
                p: "وکړلای شوای",
                f: "óokRulaay shwaay",
              },
            ],
            [
              {
                p: "وکولی شوای",
                f: "óokawulay shwaay",
              },
              {
                p: "وکړلی شوای",
                f: "óokRulay shwaay",
              },
              {
                p: "وکولی شوی",
                f: "óokawulay shway",
              },
              {
                p: "وکړلی شوی",
                f: "óokRulay shway",
              },
              {
                p: "وکولای شوای",
                f: "óokawulaay shwaay",
              },
              {
                p: "وکړلای شوای",
                f: "óokRulaay shwaay",
              },
            ],
          ],
          [
            [
              {
                p: "وکولی شوای",
                f: "óokawulay shwaay",
              },
              {
                p: "وکړلی شوای",
                f: "óokRulay shwaay",
              },
              {
                p: "وکولی شوی",
                f: "óokawulay shway",
              },
              {
                p: "وکړلی شوی",
                f: "óokRulay shway",
              },
              {
                p: "وکولای شوای",
                f: "óokawulaay shwaay",
              },
              {
                p: "وکړلای شوای",
                f: "óokRulaay shwaay",
              },
            ],
            [
              {
                p: "وکولی شوای",
                f: "óokawulay shwaay",
              },
              {
                p: "وکړلی شوای",
                f: "óokRulay shwaay",
              },
              {
                p: "وکولی شوی",
                f: "óokawulay shway",
              },
              {
                p: "وکړلی شوی",
                f: "óokRulay shway",
              },
              {
                p: "وکولای شوای",
                f: "óokawulaay shwaay",
              },
              {
                p: "وکړلای شوای",
                f: "óokRulaay shwaay",
              },
            ],
          ],
        ],
        short: [
          [
            [
              {
                p: "وکوی شوای",
                f: "óokaway shwaay",
              },
              {
                p: "وکړی شوای",
                f: "óokRay shwaay",
              },
              {
                p: "وکوی شوی",
                f: "óokaway shway",
              },
              {
                p: "وکړی شوی",
                f: "óokRay shway",
              },
              {
                p: "وکوی شوای",
                f: "óokawaay shway",
              },
              {
                p: "وکړی شوای",
                f: "óokRaay shway",
              },
            ],
            [
              {
                p: "وکوی شوای",
                f: "óokaway shwaay",
              },
              {
                p: "وکړی شوای",
                f: "óokRay shwaay",
              },
              {
                p: "وکوی شوی",
                f: "óokaway shway",
              },
              {
                p: "وکړی شوی",
                f: "óokRay shway",
              },
              {
                p: "وکوی شوای",
                f: "óokawaay shway",
              },
              {
                p: "وکړی شوای",
                f: "óokRaay shway",
              },
            ],
          ],
          [
            [
              {
                p: "وکوی شوای",
                f: "óokaway shwaay",
              },
              {
                p: "وکړی شوای",
                f: "óokRay shwaay",
              },
              {
                p: "وکوی شوی",
                f: "óokaway shway",
              },
              {
                p: "وکړی شوی",
                f: "óokRay shway",
              },
              {
                p: "وکوی شوای",
                f: "óokawaay shway",
              },
              {
                p: "وکړی شوای",
                f: "óokRaay shway",
              },
            ],
            [
              {
                p: "وکوی شوای",
                f: "óokaway shwaay",
              },
              {
                p: "وکړی شوای",
                f: "óokRay shwaay",
              },
              {
                p: "وکوی شوی",
                f: "óokaway shway",
              },
              {
                p: "وکړی شوی",
                f: "óokRay shway",
              },
              {
                p: "وکوی شوای",
                f: "óokawaay shway",
              },
              {
                p: "وکړی شوای",
                f: "óokRaay shway",
              },
            ],
          ],
          [
            [
              {
                p: "وکوی شوای",
                f: "óokaway shwaay",
              },
              {
                p: "وکړی شوای",
                f: "óokRay shwaay",
              },
              {
                p: "وکوی شوی",
                f: "óokaway shway",
              },
              {
                p: "وکړی شوی",
                f: "óokRay shway",
              },
              {
                p: "وکوی شوای",
                f: "óokawaay shway",
              },
              {
                p: "وکړی شوای",
                f: "óokRaay shway",
              },
            ],
            [
              {
                p: "وکوی شوای",
                f: "óokaway shwaay",
              },
              {
                p: "وکړی شوای",
                f: "óokRay shwaay",
              },
              {
                p: "وکوی شوی",
                f: "óokaway shway",
              },
              {
                p: "وکړی شوی",
                f: "óokRay shway",
              },
              {
                p: "وکوی شوای",
                f: "óokawaay shway",
              },
              {
                p: "وکړی شوای",
                f: "óokRaay shway",
              },
            ],
          ],
          [
            [
              {
                p: "وکوی شوای",
                f: "óokaway shwaay",
              },
              {
                p: "وکړی شوای",
                f: "óokRay shwaay",
              },
              {
                p: "وکوی شوی",
                f: "óokaway shway",
              },
              {
                p: "وکړی شوی",
                f: "óokRay shway",
              },
              {
                p: "وکوی شوای",
                f: "óokawaay shway",
              },
              {
                p: "وکړی شوای",
                f: "óokRaay shway",
              },
            ],
            [
              {
                p: "وکوی شوای",
                f: "óokaway shwaay",
              },
              {
                p: "وکړی شوای",
                f: "óokRay shwaay",
              },
              {
                p: "وکوی شوی",
                f: "óokaway shway",
              },
              {
                p: "وکړی شوی",
                f: "óokRay shway",
              },
              {
                p: "وکوی شوای",
                f: "óokawaay shway",
              },
              {
                p: "وکړی شوای",
                f: "óokRaay shway",
              },
            ],
          ],
          [
            [
              {
                p: "وکوی شوای",
                f: "óokaway shwaay",
              },
              {
                p: "وکړی شوای",
                f: "óokRay shwaay",
              },
              {
                p: "وکوی شوی",
                f: "óokaway shway",
              },
              {
                p: "وکړی شوی",
                f: "óokRay shway",
              },
              {
                p: "وکوی شوای",
                f: "óokawaay shway",
              },
              {
                p: "وکړی شوای",
                f: "óokRaay shway",
              },
            ],
            [
              {
                p: "وکوی شوای",
                f: "óokaway shwaay",
              },
              {
                p: "وکړی شوای",
                f: "óokRay shwaay",
              },
              {
                p: "وکوی شوی",
                f: "óokaway shway",
              },
              {
                p: "وکړی شوی",
                f: "óokRay shway",
              },
              {
                p: "وکوی شوای",
                f: "óokawaay shway",
              },
              {
                p: "وکړی شوای",
                f: "óokRaay shway",
              },
            ],
          ],
          [
            [
              {
                p: "وکوی شوای",
                f: "óokaway shwaay",
              },
              {
                p: "وکړی شوای",
                f: "óokRay shwaay",
              },
              {
                p: "وکوی شوی",
                f: "óokaway shway",
              },
              {
                p: "وکړی شوی",
                f: "óokRay shway",
              },
              {
                p: "وکوی شوای",
                f: "óokawaay shway",
              },
              {
                p: "وکړی شوای",
                f: "óokRaay shway",
              },
            ],
            [
              {
                p: "وکوی شوای",
                f: "óokaway shwaay",
              },
              {
                p: "وکړی شوای",
                f: "óokRay shwaay",
              },
              {
                p: "وکوی شوی",
                f: "óokaway shway",
              },
              {
                p: "وکړی شوی",
                f: "óokRay shway",
              },
              {
                p: "وکوی شوای",
                f: "óokawaay shway",
              },
              {
                p: "وکړی شوای",
                f: "óokRaay shway",
              },
            ],
          ],
        ],
      },
    },
  },
  hypothetical: kawulHypothetical,
  participle: {
    past: {
      masc: [
        [{ p: "کړی", f: "kúRay" }],
        [{ p: "کړي", f: "kúRee" }],
        [
          { p: "کړیو", f: "kúRiyo" },
          { p: "کړو", f: "kúRo" },
        ],
      ],
      fem: [
        [{ p: "کړې", f: "kúRe" }],
        [{ p: "کړې", f: "kúRe" }],
        [{ p: "کړو", f: "kúRo" }],
      ],
    },
    present: {
      masc: [
        [{ p: "کوونکی", f: "kawóonkay" }],
        [{ p: "کوونکي", f: "kawóonkee" }],
        [
          { p: "کوونکیو", f: "kawóonkiyo" },
          { p: "کوونکو", f: "kedóonko" },
        ],
      ],
      fem: [
        [{ p: "کوونکې", f: "kawóonke" }],
        [{ p: "کوونکې", f: "kawóonke" }],
        [{ p: "کوونکو", f: "kawóonko" }],
      ],
    },
  },
  perfect: kawulPerfect,
  passive: {
    imperfective: kawulStatOrDynImperfectivePassive,
    perfective: {
      imperative: undefined,
      nonImperative: [
        [[{ p: "کړل شم", f: "kRul shum" }], [{ p: "کړل شو", f: "kRul shoo" }]],
        [[{ p: "کړل شم", f: "kRul shum" }], [{ p: "کړل شو", f: "kRul shoo" }]],
        [[{ p: "کړل شې", f: "kRul she" }], [{ p: "کړل شئ", f: "kRul shey" }]],
        [[{ p: "کړل شې", f: "kRul she" }], [{ p: "کړل شئ", f: "kRul shey" }]],
        [[{ p: "کړل شي", f: "kRul shee" }], [{ p: "کړل شي", f: "kRul shee" }]],
        [[{ p: "کړل شي", f: "kRul shee" }], [{ p: "کړل شي", f: "kRul shee" }]],
      ],
      future: [
        [
          [{ p: "به کړل شم", f: "ba kRul shum" }],
          [{ p: "به کړل شو", f: "ba kRul shoo" }],
        ],
        [
          [{ p: "به کړل شم", f: "ba kRul shum" }],
          [{ p: "به کړل شو", f: "ba kRul shoo" }],
        ],
        [
          [{ p: "به کړل شې", f: "ba kRul she" }],
          [{ p: "به کړل شئ", f: "ba kRul shey" }],
        ],
        [
          [{ p: "به کړل شې", f: "ba kRul she" }],
          [{ p: "به کړل شئ", f: "ba kRul shey" }],
        ],
        [
          [{ p: "به کړل شي", f: "ba kRul shee" }],
          [{ p: "به کړل شي", f: "ba kRul shee" }],
        ],
        [
          [{ p: "به کړل شي", f: "ba kRul shee" }],
          [{ p: "به کړل شي", f: "ba kRul shee" }],
        ],
      ],
      past: {
        short: [
          [
            [{ p: "کړل شوم", f: "kRul shwum" }],
            [{ p: "کړل شو", f: "kRul shoo" }],
          ],
          [
            [{ p: "کړل شوم", f: "kRul shwum" }],
            [{ p: "کړل شو", f: "kRul shoo" }],
          ],
          [
            [{ p: "کړل شوې", f: "kRul shwe" }],
            [{ p: "کړل شوئ", f: "kRul shwey" }],
          ],
          [
            [{ p: "کړل شوې", f: "kRul shwe" }],
            [{ p: "کړل شوئ", f: "kRul shwey" }],
          ],
          [
            [{ p: "کړل شو", f: "kRul sho" }],
            [
              { p: "کړل شو", f: "kRul shoo" },
              { p: "کړل شول", f: "kRul shwul" },
            ],
          ],
          [
            [{ p: "کړل شوه", f: "kRul shwa" }],
            [{ p: "کړل شوې", f: "kRul shwe" }],
          ],
        ],
        long: [
          [
            [{ p: "کړل شولم", f: "kRul shwulum" }],
            [{ p: "کړل شولو", f: "kRul shwuloo" }],
          ],
          [
            [{ p: "کړل شولم", f: "kRul shwulum" }],
            [{ p: "کړل شولو", f: "kRul shwuloo" }],
          ],
          [
            [{ p: "کړل شولې", f: "kRul shwule" }],
            [{ p: "کړل شولئ", f: "kRul shwuley" }],
          ],
          [
            [{ p: "کړل شولې", f: "kRul shwule" }],
            [{ p: "کړل شولئ", f: "kRul shwuley" }],
          ],
          [
            [
              { p: "کړل شوله", f: "kRul shwulu" },
              { p: "کړل شولو", f: "kRul shwulo" },
            ],
            [{ p: "کړل شول", f: "kRul shwul" }],
          ],
          [
            [{ p: "کړل شوله", f: "kRul shwula" }],
            [{ p: "کړل شولې", f: "kRul shwule" }],
          ],
        ],
      },
      habitualPast: {
        short: [
          [
            [{ p: "به کړل شوم", f: "ba kRul shwum" }],
            [{ p: "به کړل شو", f: "ba kRul shoo" }],
          ],
          [
            [{ p: "به کړل شوم", f: "ba kRul shwum" }],
            [{ p: "به کړل شو", f: "ba kRul shoo" }],
          ],
          [
            [{ p: "به کړل شوې", f: "ba kRul shwe" }],
            [{ p: "به کړل شوئ", f: "ba kRul shwey" }],
          ],
          [
            [{ p: "به کړل شوې", f: "ba kRul shwe" }],
            [{ p: "به کړل شوئ", f: "ba kRul shwey" }],
          ],
          [
            [{ p: "به کړل شو", f: "ba kRul sho" }],
            [
              { p: "به کړل شو", f: "ba kRul shoo" },
              { p: "به کړل شول", f: "ba kRul shwul" },
            ],
          ],
          [
            [{ p: "به کړل شوه", f: "ba kRul shwa" }],
            [{ p: "به کړل شوې", f: "ba kRul shwe" }],
          ],
        ],
        long: [
          [
            [{ p: "به کړل شولم", f: "ba kRul shwulum" }],
            [{ p: "به کړل شولو", f: "ba kRul shwuloo" }],
          ],
          [
            [{ p: "به کړل شولم", f: "ba kRul shwulum" }],
            [{ p: "به کړل شولو", f: "ba kRul shwuloo" }],
          ],
          [
            [{ p: "به کړل شولې", f: "ba kRul shwule" }],
            [{ p: "به کړل شولئ", f: "ba kRul shwuley" }],
          ],
          [
            [{ p: "به کړل شولې", f: "ba kRul shwule" }],
            [{ p: "به کړل شولئ", f: "ba kRul shwuley" }],
          ],
          [
            [
              { p: "به کړل شوله", f: "ba kRul shwulu" },
              { p: "به کړل شولو", f: "ba kRul shwulo" },
            ],
            [{ p: "به کړل شول", f: "ba kRul shwul" }],
          ],
          [
            [{ p: "به کړل شوله", f: "ba kRul shwula" }],
            [{ p: "به کړل شولې", f: "ba kRul shwule" }],
          ],
        ],
      },
      modal: {
        nonImperative: {
          long: [
            [
              [
                { p: "کړل کېدلی شم", f: "kRul kedúlay shum" },
                { p: "کړل کېدلای شم", f: "kRul kedúlaay shum" },
              ],
              [
                { p: "کړل کېدلی شو", f: "kRul kedúlay shoo" },
                { p: "کړل کېدلای شو", f: "kRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "کړل کېدلی شم", f: "kRul kedúlay shum" },
                { p: "کړل کېدلای شم", f: "kRul kedúlaay shum" },
              ],
              [
                { p: "کړل کېدلی شو", f: "kRul kedúlay shoo" },
                { p: "کړل کېدلای شو", f: "kRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "کړل کېدلی شې", f: "kRul kedúlay she" },
                { p: "کړل کېدلای شې", f: "kRul kedúlaay she" },
              ],
              [
                { p: "کړل کېدلی شئ", f: "kRul kedúlay shey" },
                { p: "کړل کېدلای شئ", f: "kRul kedúlaay shey" },
              ],
            ],
            [
              [
                { p: "کړل کېدلی شې", f: "kRul kedúlay she" },
                { p: "کړل کېدلای شې", f: "kRul kedúlaay she" },
              ],
              [
                { p: "کړل کېدلی شئ", f: "kRul kedúlay shey" },
                { p: "کړل کېدلای شئ", f: "kRul kedúlaay shey" },
              ],
            ],
            [
              [
                { p: "کړل کېدلی شي", f: "kRul kedúlay shee" },
                { p: "کړل کېدلای شي", f: "kRul kedúlaay shee" },
              ],
              [
                { p: "کړل کېدلی شي", f: "kRul kedúlay shee" },
                { p: "کړل کېدلای شي", f: "kRul kedúlaay shee" },
              ],
            ],
            [
              [
                { p: "کړل کېدلی شي", f: "kRul kedúlay shee" },
                { p: "کړل کېدلای شي", f: "kRul kedúlaay shee" },
              ],
              [
                { p: "کړل کېدلی شي", f: "kRul kedúlay shee" },
                { p: "کړل کېدلای شي", f: "kRul kedúlaay shee" },
              ],
            ],
          ],
          short: [
            [
              [
                { p: "کړل کېدی شم", f: "kRul kedáy shum" },
                { p: "کړل کېدای شم", f: "kRul kedáay shum" },
              ],
              [
                { p: "کړل کېدی شو", f: "kRul kedáy shoo" },
                { p: "کړل کېدای شو", f: "kRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "کړل کېدی شم", f: "kRul kedáy shum" },
                { p: "کړل کېدای شم", f: "kRul kedáay shum" },
              ],
              [
                { p: "کړل کېدی شو", f: "kRul kedáy shoo" },
                { p: "کړل کېدای شو", f: "kRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "کړل کېدی شې", f: "kRul kedáy she" },
                { p: "کړل کېدای شې", f: "kRul kedáay she" },
              ],
              [
                { p: "کړل کېدی شئ", f: "kRul kedáy shey" },
                { p: "کړل کېدای شئ", f: "kRul kedáay shey" },
              ],
            ],
            [
              [
                { p: "کړل کېدی شې", f: "kRul kedáy she" },
                { p: "کړل کېدای شې", f: "kRul kedáay she" },
              ],
              [
                { p: "کړل کېدی شئ", f: "kRul kedáy shey" },
                { p: "کړل کېدای شئ", f: "kRul kedáay shey" },
              ],
            ],
            [
              [
                { p: "کړل کېدی شي", f: "kRul kedáy shee" },
                { p: "کړل کېدای شي", f: "kRul kedáay shee" },
              ],
              [
                { p: "کړل کېدی شي", f: "kRul kedáy shee" },
                { p: "کړل کېدای شي", f: "kRul kedáay shee" },
              ],
            ],
            [
              [
                { p: "کړل کېدی شي", f: "kRul kedáy shee" },
                { p: "کړل کېدای شي", f: "kRul kedáay shee" },
              ],
              [
                { p: "کړل کېدی شي", f: "kRul kedáy shee" },
                { p: "کړل کېدای شي", f: "kRul kedáay shee" },
              ],
            ],
          ],
        },
        future: {
          long: [
            [
              [
                { p: "به کړل کېدلی شم", f: "ba kRul kedúlay shum" },
                { p: "به کړل کېدلای شم", f: "ba kRul kedúlaay shum" },
              ],
              [
                { p: "به کړل کېدلی شو", f: "ba kRul kedúlay shoo" },
                { p: "به کړل کېدلای شو", f: "ba kRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "به کړل کېدلی شم", f: "ba kRul kedúlay shum" },
                { p: "به کړل کېدلای شم", f: "ba kRul kedúlaay shum" },
              ],
              [
                { p: "به کړل کېدلی شو", f: "ba kRul kedúlay shoo" },
                { p: "به کړل کېدلای شو", f: "ba kRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "به کړل کېدلی شې", f: "ba kRul kedúlay she" },
                { p: "به کړل کېدلای شې", f: "ba kRul kedúlaay she" },
              ],
              [
                { p: "به کړل کېدلی شئ", f: "ba kRul kedúlay shey" },
                { p: "به کړل کېدلای شئ", f: "ba kRul kedúlaay shey" },
              ],
            ],
            [
              [
                { p: "به کړل کېدلی شې", f: "ba kRul kedúlay she" },
                { p: "به کړل کېدلای شې", f: "ba kRul kedúlaay she" },
              ],
              [
                { p: "به کړل کېدلی شئ", f: "ba kRul kedúlay shey" },
                { p: "به کړل کېدلای شئ", f: "ba kRul kedúlaay shey" },
              ],
            ],
            [
              [
                { p: "به کړل کېدلی شي", f: "ba kRul kedúlay shee" },
                { p: "به کړل کېدلای شي", f: "ba kRul kedúlaay shee" },
              ],
              [
                { p: "به کړل کېدلی شي", f: "ba kRul kedúlay shee" },
                { p: "به کړل کېدلای شي", f: "ba kRul kedúlaay shee" },
              ],
            ],
            [
              [
                { p: "به کړل کېدلی شي", f: "ba kRul kedúlay shee" },
                { p: "به کړل کېدلای شي", f: "ba kRul kedúlaay shee" },
              ],
              [
                { p: "به کړل کېدلی شي", f: "ba kRul kedúlay shee" },
                { p: "به کړل کېدلای شي", f: "ba kRul kedúlaay shee" },
              ],
            ],
          ],
          short: [
            [
              [
                { p: "به کړل کېدی شم", f: "ba kRul kedáy shum" },
                { p: "به کړل کېدای شم", f: "ba kRul kedáay shum" },
              ],
              [
                { p: "به کړل کېدی شو", f: "ba kRul kedáy shoo" },
                { p: "به کړل کېدای شو", f: "ba kRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "به کړل کېدی شم", f: "ba kRul kedáy shum" },
                { p: "به کړل کېدای شم", f: "ba kRul kedáay shum" },
              ],
              [
                { p: "به کړل کېدی شو", f: "ba kRul kedáy shoo" },
                { p: "به کړل کېدای شو", f: "ba kRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "به کړل کېدی شې", f: "ba kRul kedáy she" },
                { p: "به کړل کېدای شې", f: "ba kRul kedáay she" },
              ],
              [
                { p: "به کړل کېدی شئ", f: "ba kRul kedáy shey" },
                { p: "به کړل کېدای شئ", f: "ba kRul kedáay shey" },
              ],
            ],
            [
              [
                { p: "به کړل کېدی شې", f: "ba kRul kedáy she" },
                { p: "به کړل کېدای شې", f: "ba kRul kedáay she" },
              ],
              [
                { p: "به کړل کېدی شئ", f: "ba kRul kedáy shey" },
                { p: "به کړل کېدای شئ", f: "ba kRul kedáay shey" },
              ],
            ],
            [
              [
                { p: "به کړل کېدی شي", f: "ba kRul kedáy shee" },
                { p: "به کړل کېدای شي", f: "ba kRul kedáay shee" },
              ],
              [
                { p: "به کړل کېدی شي", f: "ba kRul kedáy shee" },
                { p: "به کړل کېدای شي", f: "ba kRul kedáay shee" },
              ],
            ],
            [
              [
                { p: "به کړل کېدی شي", f: "ba kRul kedáy shee" },
                { p: "به کړل کېدای شي", f: "ba kRul kedáay shee" },
              ],
              [
                { p: "به کړل کېدی شي", f: "ba kRul kedáy shee" },
                { p: "به کړل کېدای شي", f: "ba kRul kedáay shee" },
              ],
            ],
          ],
        },
        past: {
          long: [
            [
              [
                { p: "کړل کېدلی شوم", f: "kRul kedúlay shwum" },
                { p: "کړل کېدلای شوم", f: "kRul kedúlaay shwum" },
              ],
              [
                { p: "کړل کېدلی شو", f: "kRul kedúlay shoo" },
                { p: "کړل کېدلای شو", f: "kRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "کړل کېدلی شوم", f: "kRul kedúlay shwum" },
                { p: "کړل کېدلای شوم", f: "kRul kedúlaay shwum" },
              ],
              [
                { p: "کړل کېدلی شو", f: "kRul kedúlay shoo" },
                { p: "کړل کېدلای شو", f: "kRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "کړل کېدلی شوې", f: "kRul kedúlay shwe" },
                { p: "کړل کېدلای شوې", f: "kRul kedúlaay shwe" },
              ],
              [
                { p: "کړل کېدلی شوئ", f: "kRul kedúlay shwey" },
                { p: "کړل کېدلای شوئ", f: "kRul kedúlaay shwey" },
              ],
            ],
            [
              [
                { p: "کړل کېدلی شوې", f: "kRul kedúlay shwe" },
                { p: "کړل کېدلای شوې", f: "kRul kedúlaay shwe" },
              ],
              [
                { p: "کړل کېدلی شوئ", f: "kRul kedúlay shwey" },
                { p: "کړل کېدلای شوئ", f: "kRul kedúlaay shwey" },
              ],
            ],
            [
              [
                { p: "کړل کېدلی شو", f: "kRul kedúlay sho" },
                { p: "کړل کېدلای شو", f: "kRul kedúlaay sho" },
              ],
              [
                { p: "کړل کېدلی شول", f: "kRul kedúlay shwul" },
                { p: "کړل کېدلای شول", f: "kRul kedúlaay shwul" },
                { p: "کړل کېدلی شو", f: "kRul kedúlay shoo" },
                { p: "کړل کېدلای شو", f: "kRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "کړل کېدلی شوه", f: "kRul kedúlay shwa" },
                { p: "کړل کېدلای شوه", f: "kRul kedúlaay shwa" },
              ],
              [
                { p: "کړل کېدلی شولې", f: "kRul kedúlay shwule" },
                { p: "کړل کېدلای شولې", f: "kRul kedúlaay shwule" },
                { p: "کړل کېدلی شوې", f: "kRul kedúlay shwe" },
                { p: "کړل کېدلای شوې", f: "kRul kedúlaay shwe" },
              ],
            ],
          ],
          short: [
            [
              [
                { p: "کړل کېدی شوم", f: "kRul kedáy shwum" },
                { p: "کړل کېدای شوم", f: "kRul kedáay shwum" },
              ],
              [
                { p: "کړل کېدی شو", f: "kRul kedáy shoo" },
                { p: "کړل کېدای شو", f: "kRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "کړل کېدی شوم", f: "kRul kedáy shwum" },
                { p: "کړل کېدای شوم", f: "kRul kedáay shwum" },
              ],
              [
                { p: "کړل کېدی شو", f: "kRul kedáy shoo" },
                { p: "کړل کېدای شو", f: "kRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "کړل کېدی شوې", f: "kRul kedáy shwe" },
                { p: "کړل کېدای شوې", f: "kRul kedáay shwe" },
              ],
              [
                { p: "کړل کېدی شوئ", f: "kRul kedáy shwey" },
                { p: "کړل کېدای شوئ", f: "kRul kedáay shwey" },
              ],
            ],
            [
              [
                { p: "کړل کېدی شوې", f: "kRul kedáy shwe" },
                { p: "کړل کېدای شوې", f: "kRul kedáay shwe" },
              ],
              [
                { p: "کړل کېدی شوئ", f: "kRul kedáy shwey" },
                { p: "کړل کېدای شوئ", f: "kRul kedáay shwey" },
              ],
            ],
            [
              [
                { p: "کړل کېدی شو", f: "kRul kedáy sho" },
                { p: "کړل کېدای شو", f: "kRul kedáay sho" },
              ],
              [
                { p: "کړل کېدی شول", f: "kRul kedáy shwul" },
                { p: "کړل کېدای شول", f: "kRul kedáay shwul" },
                { p: "کړل کېدی شو", f: "kRul kedáy shoo" },
                { p: "کړل کېدای شو", f: "kRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "کړل کېدی شوه", f: "kRul kedáy shwa" },
                { p: "کړل کېدای شوه", f: "kRul kedáay shwa" },
              ],
              [
                { p: "کړل کېدی شولې", f: "kRul kedáy shwule" },
                { p: "کړل کېدای شولې", f: "kRul kedáay shwule" },
                { p: "کړل کېدی شوې", f: "kRul kedáy shwe" },
                { p: "کړل کېدای شوې", f: "kRul kedáay shwe" },
              ],
            ],
          ],
        },
        habitualPast: {
          long: [
            [
              [
                { p: "به کړل کېدلی شوم", f: "ba kRul kedúlay shwum" },
                { p: "به کړل کېدلای شوم", f: "ba kRul kedúlaay shwum" },
              ],
              [
                { p: "به کړل کېدلی شو", f: "ba kRul kedúlay shoo" },
                { p: "به کړل کېدلای شو", f: "ba kRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "به کړل کېدلی شوم", f: "ba kRul kedúlay shwum" },
                { p: "به کړل کېدلای شوم", f: "ba kRul kedúlaay shwum" },
              ],
              [
                { p: "به کړل کېدلی شو", f: "ba kRul kedúlay shoo" },
                { p: "به کړل کېدلای شو", f: "ba kRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "به کړل کېدلی شوې", f: "ba kRul kedúlay shwe" },
                { p: "به کړل کېدلای شوې", f: "ba kRul kedúlaay shwe" },
              ],
              [
                { p: "به کړل کېدلی شوئ", f: "ba kRul kedúlay shwey" },
                { p: "به کړل کېدلای شوئ", f: "ba kRul kedúlaay shwey" },
              ],
            ],
            [
              [
                { p: "به کړل کېدلی شوې", f: "ba kRul kedúlay shwe" },
                { p: "به کړل کېدلای شوې", f: "ba kRul kedúlaay shwe" },
              ],
              [
                { p: "به کړل کېدلی شوئ", f: "ba kRul kedúlay shwey" },
                { p: "به کړل کېدلای شوئ", f: "ba kRul kedúlaay shwey" },
              ],
            ],
            [
              [
                { p: "به کړل کېدلی شو", f: "ba kRul kedúlay sho" },
                { p: "به کړل کېدلای شو", f: "ba kRul kedúlaay sho" },
              ],
              [
                { p: "به کړل کېدلی شول", f: "ba kRul kedúlay shwul" },
                { p: "به کړل کېدلای شول", f: "ba kRul kedúlaay shwul" },
                { p: "به کړل کېدلی شو", f: "ba kRul kedúlay shoo" },
                { p: "به کړل کېدلای شو", f: "ba kRul kedúlaay shoo" },
              ],
            ],
            [
              [
                { p: "به کړل کېدلی شوه", f: "ba kRul kedúlay shwa" },
                { p: "به کړل کېدلای شوه", f: "ba kRul kedúlaay shwa" },
              ],
              [
                { p: "به کړل کېدلی شولې", f: "ba kRul kedúlay shwule" },
                { p: "به کړل کېدلای شولې", f: "ba kRul kedúlaay shwule" },
                { p: "به کړل کېدلی شوې", f: "ba kRul kedúlay shwe" },
                { p: "به کړل کېدلای شوې", f: "ba kRul kedúlaay shwe" },
              ],
            ],
          ],
          short: [
            [
              [
                { p: "به کړل کېدی شوم", f: "ba kRul kedáy shwum" },
                { p: "به کړل کېدای شوم", f: "ba kRul kedáay shwum" },
              ],
              [
                { p: "به کړل کېدی شو", f: "ba kRul kedáy shoo" },
                { p: "به کړل کېدای شو", f: "ba kRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "به کړل کېدی شوم", f: "ba kRul kedáy shwum" },
                { p: "به کړل کېدای شوم", f: "ba kRul kedáay shwum" },
              ],
              [
                { p: "به کړل کېدی شو", f: "ba kRul kedáy shoo" },
                { p: "به کړل کېدای شو", f: "ba kRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "به کړل کېدی شوې", f: "ba kRul kedáy shwe" },
                { p: "به کړل کېدای شوې", f: "ba kRul kedáay shwe" },
              ],
              [
                { p: "به کړل کېدی شوئ", f: "ba kRul kedáy shwey" },
                { p: "به کړل کېدای شوئ", f: "ba kRul kedáay shwey" },
              ],
            ],
            [
              [
                { p: "به کړل کېدی شوې", f: "ba kRul kedáy shwe" },
                { p: "به کړل کېدای شوې", f: "ba kRul kedáay shwe" },
              ],
              [
                { p: "به کړل کېدی شوئ", f: "ba kRul kedáy shwey" },
                { p: "به کړل کېدای شوئ", f: "ba kRul kedáay shwey" },
              ],
            ],
            [
              [
                { p: "به کړل کېدی شو", f: "ba kRul kedáy sho" },
                { p: "به کړل کېدای شو", f: "ba kRul kedáay sho" },
              ],
              [
                { p: "به کړل کېدی شول", f: "ba kRul kedáy shwul" },
                { p: "به کړل کېدای شول", f: "ba kRul kedáay shwul" },
                { p: "به کړل کېدی شو", f: "ba kRul kedáy shoo" },
                { p: "به کړل کېدای شو", f: "ba kRul kedáay shoo" },
              ],
            ],
            [
              [
                { p: "به کړل کېدی شوه", f: "ba kRul kedáy shwa" },
                { p: "به کړل کېدای شوه", f: "ba kRul kedáay shwa" },
              ],
              [
                { p: "به کړل کېدی شولې", f: "ba kRul kedáy shwule" },
                { p: "به کړل کېدای شولې", f: "ba kRul kedáay shwule" },
                { p: "به کړل کېدی شوې", f: "ba kRul kedáy shwe" },
                { p: "به کړل کېدای شوې", f: "ba kRul kedáay shwe" },
              ],
            ],
          ],
        },
        hypotheticalPast: {
          long: [
            [
              [
                { p: "کړل کېدلی شوای", f: "kRul kedúlay shwaay" },
                { p: "کړل کېدلی شوی", f: "kRul kedúlay shway" },
                { p: "کړل کېدلای شوای", f: "kRul kedúlaay shwaay" },
              ],
              [
                { p: "کړل کېدلی شوای", f: "kRul kedúlay shwaay" },
                { p: "کړل کېدلی شوی", f: "kRul kedúlay shway" },
                { p: "کړل کېدای شوی", f: "kRul kedúlaay shway" },
              ],
            ],
            [
              [
                { p: "کړل کېدلی شوای", f: "kRul kedúlay shwaay" },
                { p: "کړل کېدلی شوی", f: "kRul kedúlay shway" },
                { p: "کړل کېدلای شوای", f: "kRul kedúlaay shwaay" },
              ],
              [
                { p: "کړل کېدلی شوای", f: "kRul kedúlay shwaay" },
                { p: "کړل کېدلی شوی", f: "kRul kedúlay shway" },
                { p: "کړل کېدای شوی", f: "kRul kedúlaay shway" },
              ],
            ],
            [
              [
                { p: "کړل کېدلی شوای", f: "kRul kedúlay shwaay" },
                { p: "کړل کېدلی شوی", f: "kRul kedúlay shway" },
                { p: "کړل کېدلای شوای", f: "kRul kedúlaay shwaay" },
              ],
              [
                { p: "کړل کېدلی شوای", f: "kRul kedúlay shwaay" },
                { p: "کړل کېدلی شوی", f: "kRul kedúlay shway" },
                { p: "کړل کېدای شوی", f: "kRul kedúlaay shway" },
              ],
            ],
            [
              [
                { p: "کړل کېدلی شوای", f: "kRul kedúlay shwaay" },
                { p: "کړل کېدلی شوی", f: "kRul kedúlay shway" },
                { p: "کړل کېدلای شوای", f: "kRul kedúlaay shwaay" },
              ],
              [
                { p: "کړل کېدلی شوای", f: "kRul kedúlay shwaay" },
                { p: "کړل کېدلی شوی", f: "kRul kedúlay shway" },
                { p: "کړل کېدای شوی", f: "kRul kedúlaay shway" },
              ],
            ],
            [
              [
                { p: "کړل کېدلی شوای", f: "kRul kedúlay shwaay" },
                { p: "کړل کېدلی شوی", f: "kRul kedúlay shway" },
                { p: "کړل کېدلای شوای", f: "kRul kedúlaay shwaay" },
              ],
              [
                { p: "کړل کېدلی شوای", f: "kRul kedúlay shwaay" },
                { p: "کړل کېدلی شوی", f: "kRul kedúlay shway" },
                { p: "کړل کېدای شوی", f: "kRul kedúlaay shway" },
              ],
            ],
            [
              [
                { p: "کړل کېدلی شوای", f: "kRul kedúlay shwaay" },
                { p: "کړل کېدلی شوی", f: "kRul kedúlay shway" },
                { p: "کړل کېدلای شوای", f: "kRul kedúlaay shwaay" },
              ],
              [
                { p: "کړل کېدلی شوای", f: "kRul kedúlay shwaay" },
                { p: "کړل کېدلی شوی", f: "kRul kedúlay shway" },
                { p: "کړل کېدای شوی", f: "kRul kedúlaay shway" },
              ],
            ],
          ],
          short: [
            [
              [
                { p: "کړل کېدی شوای", f: "kRul kedáy shwaay" },
                { p: "کړل کېدی شوی", f: "kRul kedáy shway" },
                { p: "کړل کېدای شوی", f: "kRul kedáay shway" },
              ],
              [
                { p: "کړل کېدی شوای", f: "kRul kedáy shwaay" },
                { p: "کړل کېدی شوی", f: "kRul kedáy shway" },
                { p: "کړل کېدای شوی", f: "kRul kedáay shway" },
              ],
            ],
            [
              [
                { p: "کړل کېدی شوای", f: "kRul kedáy shwaay" },
                { p: "کړل کېدی شوی", f: "kRul kedáy shway" },
                { p: "کړل کېدای شوی", f: "kRul kedáay shway" },
              ],
              [
                { p: "کړل کېدی شوای", f: "kRul kedáy shwaay" },
                { p: "کړل کېدی شوی", f: "kRul kedáy shway" },
                { p: "کړل کېدای شوی", f: "kRul kedáay shway" },
              ],
            ],
            [
              [
                { p: "کړل کېدی شوای", f: "kRul kedáy shwaay" },
                { p: "کړل کېدی شوی", f: "kRul kedáy shway" },
                { p: "کړل کېدای شوی", f: "kRul kedáay shway" },
              ],
              [
                { p: "کړل کېدی شوای", f: "kRul kedáy shwaay" },
                { p: "کړل کېدی شوی", f: "kRul kedáy shway" },
                { p: "کړل کېدای شوی", f: "kRul kedáay shway" },
              ],
            ],
            [
              [
                { p: "کړل کېدی شوای", f: "kRul kedáy shwaay" },
                { p: "کړل کېدی شوی", f: "kRul kedáy shway" },
                { p: "کړل کېدای شوی", f: "kRul kedáay shway" },
              ],
              [
                { p: "کړل کېدی شوای", f: "kRul kedáy shwaay" },
                { p: "کړل کېدی شوی", f: "kRul kedáy shway" },
                { p: "کړل کېدای شوی", f: "kRul kedáay shway" },
              ],
            ],
            [
              [
                { p: "کړل کېدی شوای", f: "kRul kedáy shwaay" },
                { p: "کړل کېدی شوی", f: "kRul kedáy shway" },
                { p: "کړل کېدای شوی", f: "kRul kedáay shway" },
              ],
              [
                { p: "کړل کېدی شوای", f: "kRul kedáy shwaay" },
                { p: "کړل کېدی شوی", f: "kRul kedáy shway" },
                { p: "کړل کېدای شوی", f: "kRul kedáay shway" },
              ],
            ],
            [
              [
                { p: "کړل کېدی شوای", f: "kRul kedáy shwaay" },
                { p: "کړل کېدی شوی", f: "kRul kedáy shway" },
                { p: "کړل کېدای شوی", f: "kRul kedáay shway" },
              ],
              [
                { p: "کړل کېدی شوای", f: "kRul kedáy shwaay" },
                { p: "کړل کېدی شوی", f: "kRul kedáy shway" },
                { p: "کړل کېدای شوی", f: "kRul kedáay shway" },
              ],
            ],
          ],
        },
      },
    },
    perfect: kawulPerfectPassive,
  },
};

const tlulModal: T.ModalContent = {
  nonImperative: {
    long: [
      [
        [
          { p: "تللی شم", f: "tlúlay shum" },
          { p: "تللای شم", f: "tlúlaay shum" },
        ],
        [
          { p: "تللی شو", f: "tlúlay shoo" },
          { p: "تللای شو", f: "tlúlaay shoo" },
        ],
      ],
      [
        [
          { p: "تللی شم", f: "tlúlay shum" },
          { p: "تللای شم", f: "tlúlaay shum" },
        ],
        [
          { p: "تللی شو", f: "tlúlay shoo" },
          { p: "تللای شو", f: "tlúlaay shoo" },
        ],
      ],
      [
        [
          { p: "تللی شې", f: "tlúlay she" },
          { p: "تللای شې", f: "tlúlaay she" },
        ],
        [
          { p: "تللی شئ", f: "tlúlay shey" },
          { p: "تللای شئ", f: "tlúlaay shey" },
        ],
      ],
      [
        [
          { p: "تللی شې", f: "tlúlay she" },
          { p: "تللای شې", f: "tlúlaay she" },
        ],
        [
          { p: "تللی شئ", f: "tlúlay shey" },
          { p: "تللای شئ", f: "tlúlaay shey" },
        ],
      ],
      [
        [
          { p: "تللی شي", f: "tlúlay shee" },
          { p: "تللای شي", f: "tlúlaay shee" },
        ],
        [
          { p: "تللی شي", f: "tlúlay shee" },
          { p: "تللای شي", f: "tlúlaay shee" },
        ],
      ],
      [
        [
          { p: "تللی شي", f: "tlúlay shee" },
          { p: "تللای شي", f: "tlúlaay shee" },
        ],
        [
          { p: "تللی شي", f: "tlúlay shee" },
          { p: "تللای شي", f: "tlúlaay shee" },
        ],
      ],
    ],
    short: [
      [
        [
          { p: "تلی شم", f: "tláy shum" },
          { p: "تلای شم", f: "tlaay shum" },
        ],
        [
          { p: "تلی شو", f: "tláy shoo" },
          { p: "تلای شو", f: "tlaay shoo" },
        ],
      ],
      [
        [
          { p: "تلی شم", f: "tláy shum" },
          { p: "تلای شم", f: "tlaay shum" },
        ],
        [
          { p: "تلی شو", f: "tláy shoo" },
          { p: "تلای شو", f: "tlaay shoo" },
        ],
      ],
      [
        [
          { p: "تلی شې", f: "tláy she" },
          { p: "تلای شې", f: "tlaay she" },
        ],
        [
          { p: "تلی شئ", f: "tláy shey" },
          { p: "تلای شئ", f: "tlaay shey" },
        ],
      ],
      [
        [
          { p: "تلی شې", f: "tláy she" },
          { p: "تلای شې", f: "tlaay she" },
        ],
        [
          { p: "تلی شئ", f: "tláy shey" },
          { p: "تلای شئ", f: "tlaay shey" },
        ],
      ],
      [
        [
          { p: "تلی شي", f: "tláy shee" },
          { p: "تلای شي", f: "tlaay shee" },
        ],
        [
          { p: "تلی شي", f: "tláy shee" },
          { p: "تلای شي", f: "tlaay shee" },
        ],
      ],
      [
        [
          { p: "تلی شي", f: "tláy shee" },
          { p: "تلای شي", f: "tlaay shee" },
        ],
        [
          { p: "تلی شي", f: "tláy shee" },
          { p: "تلای شي", f: "tlaay shee" },
        ],
      ],
    ],
  },
  future: {
    long: [
      [
        [
          { p: "به تللی شم", f: "ba tlúlay shum" },
          { p: "به تللای شم", f: "ba tlúlaay shum" },
        ],
        [
          { p: "به تللی شو", f: "ba tlúlay shoo" },
          { p: "به تللای شو", f: "ba tlúlaay shoo" },
        ],
      ],
      [
        [
          { p: "به تللی شم", f: "ba tlúlay shum" },
          { p: "به تللای شم", f: "ba tlúlaay shum" },
        ],
        [
          { p: "به تللی شو", f: "ba tlúlay shoo" },
          { p: "به تللای شو", f: "ba tlúlaay shoo" },
        ],
      ],
      [
        [
          { p: "به تللی شې", f: "ba tlúlay she" },
          { p: "به تللای شې", f: "ba tlúlaay she" },
        ],
        [
          { p: "به تللی شئ", f: "ba tlúlay shey" },
          { p: "به تللای شئ", f: "ba tlúlaay shey" },
        ],
      ],
      [
        [
          { p: "به تللی شې", f: "ba tlúlay she" },
          { p: "به تللای شې", f: "ba tlúlaay she" },
        ],
        [
          { p: "به تللی شئ", f: "ba tlúlay shey" },
          { p: "به تللای شئ", f: "ba tlúlaay shey" },
        ],
      ],
      [
        [
          { p: "به تللی شي", f: "ba tlúlay shee" },
          { p: "به تللای شي", f: "ba tlúlaay shee" },
        ],
        [
          { p: "به تللی شي", f: "ba tlúlay shee" },
          { p: "به تللای شي", f: "ba tlúlaay shee" },
        ],
      ],
      [
        [
          { p: "به تللی شي", f: "ba tlúlay shee" },
          { p: "به تللای شي", f: "ba tlúlaay shee" },
        ],
        [
          { p: "به تللی شي", f: "ba tlúlay shee" },
          { p: "به تللای شي", f: "ba tlúlaay shee" },
        ],
      ],
    ],
    short: [
      [
        [
          { p: "به تلی شم", f: "ba tláy shum" },
          { p: "به تلای شم", f: "ba tlaay shum" },
        ],
        [
          { p: "به تلی شو", f: "ba tláy shoo" },
          { p: "به تلای شو", f: "ba tlaay shoo" },
        ],
      ],
      [
        [
          { p: "به تلی شم", f: "ba tláy shum" },
          { p: "به تلای شم", f: "ba tlaay shum" },
        ],
        [
          { p: "به تلی شو", f: "ba tláy shoo" },
          { p: "به تلای شو", f: "ba tlaay shoo" },
        ],
      ],
      [
        [
          { p: "به تلی شې", f: "ba tláy she" },
          { p: "به تلای شې", f: "ba tlaay she" },
        ],
        [
          { p: "به تلی شئ", f: "ba tláy shey" },
          { p: "به تلای شئ", f: "ba tlaay shey" },
        ],
      ],
      [
        [
          { p: "به تلی شې", f: "ba tláy she" },
          { p: "به تلای شې", f: "ba tlaay she" },
        ],
        [
          { p: "به تلی شئ", f: "ba tláy shey" },
          { p: "به تلای شئ", f: "ba tlaay shey" },
        ],
      ],
      [
        [
          { p: "به تلی شي", f: "ba tláy shee" },
          { p: "به تلای شي", f: "ba tlaay shee" },
        ],
        [
          { p: "به تلی شي", f: "ba tláy shee" },
          { p: "به تلای شي", f: "ba tlaay shee" },
        ],
      ],
      [
        [
          { p: "به تلی شي", f: "ba tláy shee" },
          { p: "به تلای شي", f: "ba tlaay shee" },
        ],
        [
          { p: "به تلی شي", f: "ba tláy shee" },
          { p: "به تلای شي", f: "ba tlaay shee" },
        ],
      ],
    ],
  },
  past: {
    long: [
      [
        [
          { p: "تللی شوم", f: "tlúlay shwum" },
          { p: "تللای شوم", f: "tlúlaay shwum" },
        ],
        [
          { p: "تللی شو", f: "tlúlay shoo" },
          { p: "تللای شو", f: "tlúlaay shoo" },
        ],
      ],
      [
        [
          { p: "تللی شوم", f: "tlúlay shwum" },
          { p: "تللای شوم", f: "tlúlaay shwum" },
        ],
        [
          { p: "تللی شو", f: "tlúlay shoo" },
          { p: "تللای شو", f: "tlúlaay shoo" },
        ],
      ],
      [
        [
          { p: "تللی شوې", f: "tlúlay shwe" },
          { p: "تللای شوې", f: "tlúlaay shwe" },
        ],
        [
          { p: "تللی شوئ", f: "tlúlay shwey" },
          { p: "تللای شوئ", f: "tlúlaay shwey" },
        ],
      ],
      [
        [
          { p: "تللی شوې", f: "tlúlay shwe" },
          { p: "تللای شوې", f: "tlúlaay shwe" },
        ],
        [
          { p: "تللی شوئ", f: "tlúlay shwey" },
          { p: "تللای شوئ", f: "tlúlaay shwey" },
        ],
      ],
      [
        [
          { p: "تللی شو", f: "tlúlay sho" },
          { p: "تللای شو", f: "tlúlaay sho" },
        ],
        [
          { p: "تللی شول", f: "tlúlay shwul" },
          { p: "تللای شول", f: "tlúlaay shwul" },
          { p: "تللی شو", f: "tlúlay shoo" },
          { p: "تللای شو", f: "tlúlaay shoo" },
        ],
      ],
      [
        [
          { p: "تللی شوه", f: "tlúlay shwa" },
          { p: "تللای شوه", f: "tlúlaay shwa" },
        ],
        [
          { p: "تللی شولې", f: "tlúlay shwule" },
          { p: "تللای شولې", f: "tlúlaay shwule" },
          { p: "تللی شوې", f: "tlúlay shwe" },
          { p: "تللای شوې", f: "tlúlaay shwe" },
        ],
      ],
    ],
    short: [
      [
        [
          { p: "تلی شوم", f: "tláy shwum" },
          { p: "تلای شوم", f: "tláay shwum" },
        ],
        [
          { p: "تلای شو", f: "tláy shoo" },
          { p: "تلاای شو", f: "tláay shoo" },
        ],
      ],
      [
        [
          { p: "تلی شوم", f: "tláy shwum" },
          { p: "تلای شوم", f: "tláay shwum" },
        ],
        [
          { p: "تلی شو", f: "tláy shoo" },
          { p: "تلای شو", f: "tláay shoo" },
        ],
      ],
      [
        [
          { p: "تلی شوې", f: "tláy shwe" },
          { p: "تلای شوې", f: "tláay shwe" },
        ],
        [
          { p: "تلی شوئ", f: "tláy shwey" },
          { p: "تلای شوئ", f: "tláay shwey" },
        ],
      ],
      [
        [
          { p: "تلی شوې", f: "tláy shwe" },
          { p: "تلای شوې", f: "tláay shwe" },
        ],
        [
          { p: "تلی شوئ", f: "tláy shwey" },
          { p: "تلای شوئ", f: "tláay shwey" },
        ],
      ],
      [
        [
          { p: "تلی شو", f: "tláy sho" },
          { p: "تلای شو", f: "tláay sho" },
        ],
        [
          { p: "تلی شول", f: "tláy shwul" },
          { p: "تلای شول", f: "tláay shwul" },
          { p: "تلی شو", f: "tláy shoo" },
          { p: "تلای شو", f: "tláay shoo" },
        ],
      ],
      [
        [
          { p: "تلی شوه", f: "tláy shwa" },
          { p: "تلای شوه", f: "tláay shwa" },
        ],
        [
          { p: "تلی شولې", f: "tláy shwule" },
          { p: "تلای شولې", f: "tláay shwule" },
          { p: "تلی شوې", f: "tláy shwe" },
          { p: "تلای شوې", f: "tláay shwe" },
        ],
      ],
    ],
  },
  habitualPast: {
    long: [
      [
        [
          { p: "به تللی شوم", f: "ba tlúlay shwum" },
          { p: "به تللای شوم", f: "ba tlúlaay shwum" },
        ],
        [
          { p: "به تللی شو", f: "ba tlúlay shoo" },
          { p: "به تللای شو", f: "ba tlúlaay shoo" },
        ],
      ],
      [
        [
          { p: "به تللی شوم", f: "ba tlúlay shwum" },
          { p: "به تللای شوم", f: "ba tlúlaay shwum" },
        ],
        [
          { p: "به تللی شو", f: "ba tlúlay shoo" },
          { p: "به تللای شو", f: "ba tlúlaay shoo" },
        ],
      ],
      [
        [
          { p: "به تللی شوې", f: "ba tlúlay shwe" },
          { p: "به تللای شوې", f: "ba tlúlaay shwe" },
        ],
        [
          { p: "به تللی شوئ", f: "ba tlúlay shwey" },
          { p: "به تللای شوئ", f: "ba tlúlaay shwey" },
        ],
      ],
      [
        [
          { p: "به تللی شوې", f: "ba tlúlay shwe" },
          { p: "به تللای شوې", f: "ba tlúlaay shwe" },
        ],
        [
          { p: "به تللی شوئ", f: "ba tlúlay shwey" },
          { p: "به تللای شوئ", f: "ba tlúlaay shwey" },
        ],
      ],
      [
        [
          { p: "به تللی شو", f: "ba tlúlay sho" },
          { p: "به تللای شو", f: "ba tlúlaay sho" },
        ],
        [
          { p: "به تللی شول", f: "ba tlúlay shwul" },
          { p: "به تللای شول", f: "ba tlúlaay shwul" },
          { p: "به تللی شو", f: "ba tlúlay shoo" },
          { p: "به تللای شو", f: "ba tlúlaay shoo" },
        ],
      ],
      [
        [
          { p: "به تللی شوه", f: "ba tlúlay shwa" },
          { p: "به تللای شوه", f: "ba tlúlaay shwa" },
        ],
        [
          { p: "به تللی شولې", f: "ba tlúlay shwule" },
          { p: "به تللای شولې", f: "ba tlúlaay shwule" },
          { p: "به تللی شوې", f: "ba tlúlay shwe" },
          { p: "به تللای شوې", f: "ba tlúlaay shwe" },
        ],
      ],
    ],
    short: [
      [
        [
          { p: "به تلی شوم", f: "ba tláy shwum" },
          { p: "به تلای شوم", f: "ba tláay shwum" },
        ],
        [
          { p: "به تلای شو", f: "ba tláy shoo" },
          { p: "به تلاای شو", f: "ba tláay shoo" },
        ],
      ],
      [
        [
          { p: "به تلی شوم", f: "ba tláy shwum" },
          { p: "به تلای شوم", f: "ba tláay shwum" },
        ],
        [
          { p: "به تلی شو", f: "ba tláy shoo" },
          { p: "به تلای شو", f: "ba tláay shoo" },
        ],
      ],
      [
        [
          { p: "به تلی شوې", f: "ba tláy shwe" },
          { p: "به تلای شوې", f: "ba tláay shwe" },
        ],
        [
          { p: "به تلی شوئ", f: "ba tláy shwey" },
          { p: "به تلای شوئ", f: "ba tláay shwey" },
        ],
      ],
      [
        [
          { p: "به تلی شوې", f: "ba tláy shwe" },
          { p: "به تلای شوې", f: "ba tláay shwe" },
        ],
        [
          { p: "به تلی شوئ", f: "ba tláy shwey" },
          { p: "به تلای شوئ", f: "ba tláay shwey" },
        ],
      ],
      [
        [
          { p: "به تلی شو", f: "ba tláy sho" },
          { p: "به تلای شو", f: "ba tláay sho" },
        ],
        [
          { p: "به تلی شول", f: "ba tláy shwul" },
          { p: "به تلای شول", f: "ba tláay shwul" },
          { p: "به تلی شو", f: "ba tláy shoo" },
          { p: "به تلای شو", f: "ba tláay shoo" },
        ],
      ],
      [
        [
          { p: "به تلی شوه", f: "ba tláy shwa" },
          { p: "به تلای شوه", f: "ba tláay shwa" },
        ],
        [
          { p: "به تلی شولې", f: "ba tláy shwule" },
          { p: "به تلای شولې", f: "ba tláay shwule" },
          { p: "به تلی شوې", f: "ba tláy shwe" },
          { p: "به تلای شوې", f: "ba tláay shwe" },
        ],
      ],
    ],
  },
  hypotheticalPast: {
    long: [
      [
        [
          { p: "تللی شوای", f: "tlúlay shwaay" },
          { p: "تللی شوی", f: "tlúlay shway" },
          { p: "تللای شوای", f: "tlúlaay shwaay" },
        ],
        [
          { p: "تللی شوای", f: "tlúlay shwaay" },
          { p: "تللی شوی", f: "tlúlay shway" },
          { p: "تللی شوای", f: "tlúlaay shwaay" },
        ],
      ],
      [
        [
          { p: "تللی شوای", f: "tlúlay shwaay" },
          { p: "تللی شوی", f: "tlúlay shway" },
          { p: "تللای شوای", f: "tlúlaay shwaay" },
        ],
        [
          { p: "تللی شوای", f: "tlúlay shwaay" },
          { p: "تللی شوی", f: "tlúlay shway" },
          { p: "تللی شوای", f: "tlúlaay shwaay" },
        ],
      ],
      [
        [
          { p: "تللی شوای", f: "tlúlay shwaay" },
          { p: "تللی شوی", f: "tlúlay shway" },
          { p: "تللای شوای", f: "tlúlaay shwaay" },
        ],
        [
          { p: "تللی شوای", f: "tlúlay shwaay" },
          { p: "تللی شوی", f: "tlúlay shway" },
          { p: "تللی شوای", f: "tlúlaay shwaay" },
        ],
      ],
      [
        [
          { p: "تللی شوای", f: "tlúlay shwaay" },
          { p: "تللی شوی", f: "tlúlay shway" },
          { p: "تللای شوای", f: "tlúlaay shwaay" },
        ],
        [
          { p: "تللی شوای", f: "tlúlay shwaay" },
          { p: "تللی شوی", f: "tlúlay shway" },
          { p: "تللی شوای", f: "tlúlaay shwaay" },
        ],
      ],
      [
        [
          { p: "تللی شوای", f: "tlúlay shwaay" },
          { p: "تللی شوی", f: "tlúlay shway" },
          { p: "تللای شوای", f: "tlúlaay shwaay" },
        ],
        [
          { p: "تللی شوای", f: "tlúlay shwaay" },
          { p: "تللی شوی", f: "tlúlay shway" },
          { p: "تللی شوای", f: "tlúlaay shwaay" },
        ],
      ],
      [
        [
          { p: "تللی شوای", f: "tlúlay shwaay" },
          { p: "تللی شوی", f: "tlúlay shway" },
          { p: "تللای شوای", f: "tlúlaay shwaay" },
        ],
        [
          { p: "تللی شوای", f: "tlúlay shwaay" },
          { p: "تللی شوی", f: "tlúlay shway" },
          { p: "تللی شوای", f: "tlúlaay shwaay" },
        ],
      ],
    ],
    short: [
      [
        [
          { p: "تلی شوای", f: "tláy shwaay" },
          { p: "تلی شوی", f: "tláy shway" },
          { p: "تلی شوای", f: "tláay shwaay" },
        ],
        [
          { p: "تلی شوای", f: "tláy shwaay" },
          { p: "تلی شوی", f: "tláy shway" },
          { p: "تلی شوای", f: "tláay shwaay" },
        ],
      ],
      [
        [
          { p: "تلی شوای", f: "tláy shwaay" },
          { p: "تلی شوی", f: "tláy shway" },
          { p: "تلی شوای", f: "tláay shwaay" },
        ],
        [
          { p: "تلی شوای", f: "tláy shwaay" },
          { p: "تلی شوی", f: "tláy shway" },
          { p: "تلی شوای", f: "tláay shwaay" },
        ],
      ],
      [
        [
          { p: "تلی شوای", f: "tláy shwaay" },
          { p: "تلی شوی", f: "tláy shway" },
          { p: "تلی شوای", f: "tláay shwaay" },
        ],
        [
          { p: "تلی شوای", f: "tláy shwaay" },
          { p: "تلی شوی", f: "tláy shway" },
          { p: "تلی شوای", f: "tláay shwaay" },
        ],
      ],
      [
        [
          { p: "تلی شوای", f: "tláy shwaay" },
          { p: "تلی شوی", f: "tláy shway" },
          { p: "تلی شوای", f: "tláay shwaay" },
        ],
        [
          { p: "تلی شوای", f: "tláy shwaay" },
          { p: "تلی شوی", f: "tláy shway" },
          { p: "تلی شوای", f: "tláay shwaay" },
        ],
      ],
      [
        [
          { p: "تلی شوای", f: "tláy shwaay" },
          { p: "تلی شوی", f: "tláy shway" },
          { p: "تلی شوای", f: "tláay shwaay" },
        ],
        [
          { p: "تلی شوای", f: "tláy shwaay" },
          { p: "تلی شوی", f: "tláy shway" },
          { p: "تلی شوای", f: "tláay shwaay" },
        ],
      ],
      [
        [
          { p: "تلی شوای", f: "tláy shwaay" },
          { p: "تلی شوی", f: "tláy shway" },
          { p: "تلی شوای", f: "tláay shwaay" },
        ],
        [
          { p: "تلی شوای", f: "tláy shwaay" },
          { p: "تلی شوی", f: "tláy shway" },
          { p: "تلی شوای", f: "tláay shwaay" },
        ],
      ],
    ],
  },
};

export const tlul: T.VerbConjugation = {
  info: {
    entry: {
      entry: {
        ts: 1527815348,
        i: 3638,
        p: "تلل",
        f: "tlul",
        g: "tlul",
        e: "to go",
        c: "v. intrans. irreg.",
        psp: "ځ",
        psf: "dz",
        ssp: "لاړ ش",
        ssf: "láaR sh",
        prp: "لاړ",
        prf: "láaR",
        ec: "go,goes,going,went,gone",
      } as T.VerbDictionaryEntry,
    },
    transitivity: "intransitive",
    type: "simple",
    yulEnding: false,
    stem: {
      imperfective: { p: "ځ", f: "dz" },
      perfective: {
        mascSing: { p: "لاړ ش", f: "laaR sh" },
        mascPlur: { p: "لاړ ش", f: "laaR sh" },
        femSing: { p: "لاړه ش", f: "laaRa sh" },
        femPlur: { p: "لاړې ش", f: "laaRe sh" },
      },
      perfectiveSplit: {
        mascSing: [
          { p: "لاړ ", f: "láaR " },
          { p: "ش", f: "sh" },
        ],
        mascPlur: [
          { p: "لاړ ", f: "láaR " },
          { p: "ش", f: "sh" },
        ],
        femSing: [
          { p: "لاړه ", f: "láaRa " },
          { p: "ش", f: "sh" },
        ],
        femPlur: [
          { p: "لاړې ", f: "láaRe " },
          { p: "ش", f: "sh" },
        ],
      },
    },
    root: {
      imperfective: {
        long: { p: "تلل", f: "tlul" },
        short: { p: "تل", f: "tl" },
      },
      perfective: {
        long: { p: "لاړل", f: "laaRul" },
        short: { p: "لاړ", f: "laaR" },
      },
      perfectiveSplit: {
        long: [
          { p: "لا", f: "láa" },
          { p: "ړل", f: "Rul" },
        ],
        short: [
          { p: "لا", f: "láa" },
          { p: "ړ", f: "R" },
        ],
      },
    },
    participle: {
      present: { p: "تلونکی", f: "tlóonkay" },
      past: {
        long: { p: "تللی", f: "tlúlay" },
        short: { p: "تلی", f: "túlay" },
      },
    },
  },
  imperfective: {
    nonImperative: [
      [[{ p: "ځم", f: "dzum" }], [{ p: "ځو", f: "dzoo" }]],
      [[{ p: "ځم", f: "dzum" }], [{ p: "ځو", f: "dzoo" }]],
      [[{ p: "ځې", f: "dze" }], [{ p: "ځئ", f: "dzey" }]],
      [[{ p: "ځې", f: "dze" }], [{ p: "ځئ", f: "dzey" }]],
      [[{ p: "ځي", f: "dzee" }], [{ p: "ځي", f: "dzee" }]],
      [[{ p: "ځي", f: "dzee" }], [{ p: "ځي", f: "dzee" }]],
    ],
    future: [
      [[{ p: "به ځم", f: "ba dzum" }], [{ p: "به ځو", f: "ba dzoo" }]],
      [[{ p: "به ځم", f: "ba dzum" }], [{ p: "به ځو", f: "ba dzoo" }]],
      [[{ p: "به ځې", f: "ba dze" }], [{ p: "به ځئ", f: "ba dzey" }]],
      [[{ p: "به ځې", f: "ba dze" }], [{ p: "به ځئ", f: "ba dzey" }]],
      [[{ p: "به ځي", f: "ba dzee" }], [{ p: "به ځي", f: "ba dzee" }]],
      [[{ p: "به ځي", f: "ba dzee" }], [{ p: "به ځي", f: "ba dzee" }]],
    ],
    imperative: [
      [[{ p: "ځه", f: "dza" }], [{ p: "ځئ", f: "dzey" }]],
      [[{ p: "ځه", f: "dza" }], [{ p: "ځئ", f: "dzey" }]],
    ],
    past: {
      short: [
        [[{ p: "تلم", f: "tlum" }], [{ p: "تلو", f: "tloo" }]],
        [[{ p: "تلم", f: "tlum" }], [{ p: "تلو", f: "tloo" }]],
        [[{ p: "تلې", f: "tle" }], [{ p: "تلئ", f: "tley" }]],
        [[{ p: "تلې", f: "tle" }], [{ p: "تلئ", f: "tley" }]],
        [
          [
            { p: "تله", f: "tlu" },
            { p: "تلو", f: "tlo" },
            { p: "ته", f: "tu" },
          ],
          [{ p: "تلل", f: "tlul" }],
        ],
        [[{ p: "تله", f: "tla" }], [{ p: "تلې", f: "tle" }]],
      ],
      long: [
        [[{ p: "تللم", f: "tlulum" }], [{ p: "تللو", f: "tluloo" }]],
        [[{ p: "تللم", f: "tlulum" }], [{ p: "تللو", f: "tluloo" }]],
        [[{ p: "تللې", f: "tlule" }], [{ p: "تللئ", f: "tluley" }]],
        [[{ p: "تللې", f: "tlule" }], [{ p: "تللئ", f: "tluley" }]],
        [[{ p: "تللو", f: "tlulo" }], [{ p: "تلل", f: "tlul" }]],
        [[{ p: "تلله", f: "tlula" }], [{ p: "تللې", f: "tlule" }]],
      ],
    },
    habitualPast: {
      short: [
        [[{ p: "به تلم", f: "ba tlum" }], [{ p: "به تلو", f: "ba tloo" }]],
        [[{ p: "به تلم", f: "ba tlum" }], [{ p: "به تلو", f: "ba tloo" }]],
        [[{ p: "به تلې", f: "ba tle" }], [{ p: "به تلئ", f: "ba tley" }]],
        [[{ p: "به تلې", f: "ba tle" }], [{ p: "به تلئ", f: "ba tley" }]],
        [
          [
            { p: "به تله", f: "ba tlu" },
            { p: "به تلو", f: "ba tlo" },
            { p: "به ته", f: "ba tu" },
          ],
          [{ p: "به تلل", f: "ba tlul" }],
        ],
        [[{ p: "به تله", f: "ba tla" }], [{ p: "به تلې", f: "ba tle" }]],
      ],
      long: [
        [
          [{ p: "به تللم", f: "ba tlulum" }],
          [{ p: "به تللو", f: "ba tluloo" }],
        ],
        [
          [{ p: "به تللم", f: "ba tlulum" }],
          [{ p: "به تللو", f: "ba tluloo" }],
        ],
        [[{ p: "به تللې", f: "ba tlule" }], [{ p: "به تللئ", f: "ba tluley" }]],
        [[{ p: "به تللې", f: "ba tlule" }], [{ p: "به تللئ", f: "ba tluley" }]],
        [[{ p: "به تللو", f: "ba tlulo" }], [{ p: "به تلل", f: "ba tlul" }]],
        [[{ p: "به تلله", f: "ba tlula" }], [{ p: "به تللې", f: "ba tlule" }]],
      ],
    },
    modal: tlulModal,
  },
  perfective: {
    nonImperative: [
      [[{ p: "لاړ شم", f: "láaR shum" }], [{ p: "لاړ شو", f: "láaR shoo" }]],
      [
        [{ p: "لاړه شم", f: "láaRa shum" }],
        [{ p: "لاړې شو", f: "láaRe shoo" }],
      ],
      [[{ p: "لاړ شې", f: "láaR she" }], [{ p: "لاړ شئ", f: "láaR shey" }]],
      [[{ p: "لاړه شې", f: "láaRa she" }], [{ p: "لاړې شئ", f: "láaRe shey" }]],
      [[{ p: "لاړ شي", f: "láaR shee" }], [{ p: "لاړ شي", f: "láaR shee" }]],
      [
        [{ p: "لاړه شي", f: "láaRa shee" }],
        [{ p: "لاړې شي", f: "láaRe shee" }],
      ],
    ],
    future: [
      [
        [{ p: "به لاړ شم", f: "ba láaR shum" }],
        [{ p: "به لاړ شو", f: "ba láaR shoo" }],
      ],
      [
        [{ p: "به لاړه شم", f: "ba láaRa shum" }],
        [{ p: "به لاړې شو", f: "ba láaRe shoo" }],
      ],
      [
        [{ p: "به لاړ شې", f: "ba láaR she" }],
        [{ p: "به لاړ شئ", f: "ba láaR shey" }],
      ],
      [
        [{ p: "به لاړه شې", f: "ba láaRa she" }],
        [{ p: "به لاړې شئ", f: "ba láaRe shey" }],
      ],
      [
        [{ p: "به لاړ شي", f: "ba láaR shee" }],
        [{ p: "به لاړ شي", f: "ba láaR shee" }],
      ],
      [
        [{ p: "به لاړه شي", f: "ba láaRa shee" }],
        [{ p: "به لاړې شي", f: "ba láaRe shee" }],
      ],
    ],
    imperative: [
      [[{ p: "لاړ شه", f: "láaR sha" }], [{ p: "لاړ شئ", f: "láaR shey" }]],
      [[{ p: "لاړه شه", f: "láaRa sha" }], [{ p: "لاړې شئ", f: "láaRe shey" }]],
    ],
    past: {
      short: [
        [[{ p: "لاړم", f: "láaRum" }], [{ p: "لاړو", f: "láaRoo" }]],
        [[{ p: "لاړم", f: "láaRum" }], [{ p: "لاړو", f: "láaRoo" }]],
        [[{ p: "لاړې", f: "láaRe" }], [{ p: "لاړئ", f: "láaRey" }]],
        [[{ p: "لاړې", f: "láaRe" }], [{ p: "لاړئ", f: "láaRey" }]],
        [
          [
            { p: "لاړه", f: "láaRu" },
            { p: "لاړو", f: "láaRo" },
            { p: "لاړ", f: "láaR" },
          ],
          [{ p: "لاړل", f: "láaRul" }],
        ],
        [[{ p: "لاړه", f: "láaRa" }], [{ p: "لاړې", f: "láaRe" }]],
      ],
      long: [
        [[{ p: "لاړلم", f: "láaRulum" }], [{ p: "لاړلو", f: "láaRuloo" }]],
        [[{ p: "لاړلم", f: "láaRulum" }], [{ p: "لاړلو", f: "láaRuloo" }]],
        [[{ p: "لاړلې", f: "láaRule" }], [{ p: "لاړلئ", f: "láaRuley" }]],
        [[{ p: "لاړلې", f: "láaRule" }], [{ p: "لاړلئ", f: "láaRuley" }]],
        [
          [
            { p: "لاړله", f: "láaRulu" },
            { p: "لاړلو", f: "láaRulo" },
          ],
          [{ p: "لاړل", f: "láaRul" }],
        ],
        [[{ p: "لاړله", f: "láaRula" }], [{ p: "لاړلې", f: "láaRule" }]],
      ],
    },
    habitualPast: {
      short: [
        [
          [{ p: "به لاړم", f: "ba láaRum" }],
          [{ p: "به لاړو", f: "ba láaRoo" }],
        ],
        [
          [{ p: "به لاړم", f: "ba láaRum" }],
          [{ p: "به لاړو", f: "ba láaRoo" }],
        ],
        [[{ p: "به لاړې", f: "ba láaRe" }], [{ p: "به لاړئ", f: "ba láaRey" }]],
        [[{ p: "به لاړې", f: "ba láaRe" }], [{ p: "به لاړئ", f: "ba láaRey" }]],
        [
          [
            { p: "به لاړه", f: "ba láaRu" },
            { p: "به لاړو", f: "ba láaRo" },
            { p: "به لاړ", f: "ba láaR" },
          ],
          [{ p: "به لاړل", f: "ba láaRul" }],
        ],
        [[{ p: "به لاړه", f: "ba láaRa" }], [{ p: "به لاړې", f: "ba láaRe" }]],
      ],
      long: [
        [
          [{ p: "به لاړلم", f: "ba láaRulum" }],
          [{ p: "به لاړلو", f: "ba láaRuloo" }],
        ],
        [
          [{ p: "به لاړلم", f: "ba láaRulum" }],
          [{ p: "به لاړلو", f: "ba láaRuloo" }],
        ],
        [
          [{ p: "به لاړلې", f: "ba láaRule" }],
          [{ p: "به لاړلئ", f: "ba láaRuley" }],
        ],
        [
          [{ p: "به لاړلې", f: "ba láaRule" }],
          [{ p: "به لاړلئ", f: "ba láaRuley" }],
        ],
        [
          [
            { p: "به لاړله", f: "ba láaRulu" },
            { p: "به لاړلو", f: "ba láaRulo" },
          ],
          [{ p: "به لاړل", f: "ba láaRul" }],
        ],
        [
          [{ p: "به لاړله", f: "ba láaRula" }],
          [{ p: "به لاړلې", f: "ba láaRule" }],
        ],
      ],
    },
    modal: tlulModal,
  },
  hypothetical: {
    short: [
      [
        [
          { p: "تلای", f: "túlaay" },
          { p: "تلی", f: "túlay" },
        ],
        [
          { p: "تلای", f: "túlaay" },
          { p: "تلی", f: "túlay" },
        ],
      ],
      [
        [
          { p: "تلای", f: "túlaay" },
          { p: "تلی", f: "túlay" },
        ],
        [
          { p: "تلای", f: "túlaay" },
          { p: "تلی", f: "túlay" },
        ],
      ],
      [
        [
          { p: "تلای", f: "túlaay" },
          { p: "تلی", f: "túlay" },
        ],
        [
          { p: "تلای", f: "túlaay" },
          { p: "تلی", f: "túlay" },
        ],
      ],
      [
        [
          { p: "تلای", f: "túlaay" },
          { p: "تلی", f: "túlay" },
        ],
        [
          { p: "تلای", f: "túlaay" },
          { p: "تلی", f: "túlay" },
        ],
      ],
      [
        [
          { p: "تلای", f: "túlaay" },
          { p: "تلی", f: "túlay" },
        ],
        [
          { p: "تلای", f: "túlaay" },
          { p: "تلی", f: "túlay" },
        ],
      ],
      [
        [
          { p: "تلای", f: "túlaay" },
          { p: "تلی", f: "túlay" },
        ],
        [
          { p: "تلای", f: "túlaay" },
          { p: "تلی", f: "túlay" },
        ],
      ],
    ],
    long: [
      [
        [
          { p: "تللای", f: "tlúlaay" },
          { p: "تللی", f: "tlúlay" },
        ],
        [
          { p: "تللای", f: "tlúlaay" },
          { p: "تللی", f: "tlúlay" },
        ],
      ],
      [
        [
          { p: "تللای", f: "tlúlaay" },
          { p: "تللی", f: "tlúlay" },
        ],
        [
          { p: "تللای", f: "tlúlaay" },
          { p: "تللی", f: "tlúlay" },
        ],
      ],
      [
        [
          { p: "تللای", f: "tlúlaay" },
          { p: "تللی", f: "tlúlay" },
        ],
        [
          { p: "تللای", f: "tlúlaay" },
          { p: "تللی", f: "tlúlay" },
        ],
      ],
      [
        [
          { p: "تللای", f: "tlúlaay" },
          { p: "تللی", f: "tlúlay" },
        ],
        [
          { p: "تللای", f: "tlúlaay" },
          { p: "تللی", f: "tlúlay" },
        ],
      ],
      [
        [
          { p: "تللای", f: "tlúlaay" },
          { p: "تللی", f: "tlúlay" },
        ],
        [
          { p: "تللای", f: "tlúlaay" },
          { p: "تللی", f: "tlúlay" },
        ],
      ],
      [
        [
          { p: "تللای", f: "tlúlaay" },
          { p: "تللی", f: "tlúlay" },
        ],
        [
          { p: "تللای", f: "tlúlaay" },
          { p: "تللی", f: "tlúlay" },
        ],
      ],
    ],
  },
  participle: {
    past: {
      long: {
        masc: [
          [{ p: "تللی", f: "tlúlay" }],
          [{ p: "تللي", f: "tlúlee" }],
          [
            { p: "تللیو", f: "tlúliyo" },
            { p: "تللو", f: "tlúlo" },
          ],
        ],
        fem: [
          [{ p: "تللې", f: "tlúle" }],
          [{ p: "تللې", f: "tlúle" }],
          [{ p: "تللو", f: "tlúlo" }],
        ],
      },
      short: {
        masc: [
          [{ p: "تلی", f: "túlay" }],
          [{ p: "تلي", f: "túlee" }],
          [
            { p: "تلیو", f: "túliyo" },
            { p: "تلو", f: "túlo" },
          ],
        ],
        fem: [
          [{ p: "تلې", f: "túle" }],
          [{ p: "تلې", f: "túle" }],
          [{ p: "تلو", f: "túlo" }],
        ],
      },
    },
    present: {
      masc: [
        [{ p: "تلونکی", f: "tlóonkay" }],
        [{ p: "تلونکي", f: "tlóonkee" }],
        [
          { p: "تلونکیو", f: "tlóonkiyo" },
          { p: "تلونکو", f: "kedóonko" },
        ],
      ],
      fem: [
        [{ p: "تلونکې", f: "tlóonke" }],
        [{ p: "تلونکې", f: "tlóonke" }],
        [{ p: "تلونکو", f: "tlóonko" }],
      ],
    },
  },
  perfect: {
    halfPerfect: {
      short: [
        [[{ p: "تلی", f: "túlay" }], [{ p: "تلي", f: "túlee" }]],
        [[{ p: "تلې", f: "túle" }], [{ p: "تلې", f: "túle" }]],
        [[{ p: "تلی", f: "túlay" }], [{ p: "تلي", f: "túlee" }]],
        [[{ p: "تلې", f: "túle" }], [{ p: "تلې", f: "túle" }]],
        [[{ p: "تلی", f: "túlay" }], [{ p: "تلي", f: "túlee" }]],
        [[{ p: "تلې", f: "túle" }], [{ p: "تلې", f: "túle" }]],
      ],
      long: [
        [[{ p: "تللی", f: "tlúlay" }], [{ p: "تللي", f: "tlúlee" }]],
        [[{ p: "تللې", f: "tlúle" }], [{ p: "تللې", f: "tlúle" }]],
        [[{ p: "تللی", f: "tlúlay" }], [{ p: "تللي", f: "tlúlee" }]],
        [[{ p: "تللې", f: "tlúle" }], [{ p: "تللې", f: "tlúle" }]],
        [[{ p: "تللی", f: "tlúlay" }], [{ p: "تللي", f: "tlúlee" }]],
        [[{ p: "تللې", f: "tlúle" }], [{ p: "تللې", f: "tlúle" }]],
      ],
    },
    past: {
      short: [
        [[{ p: "تلی وم", f: "túlay wum" }], [{ p: "تلي وو", f: "túlee woo" }]],
        [[{ p: "تلې وم", f: "túle wum" }], [{ p: "تلې وو", f: "túle woo" }]],
        [[{ p: "تلی وې", f: "túlay we" }], [{ p: "تلي وئ", f: "túlee wey" }]],
        [[{ p: "تلې وې", f: "túle we" }], [{ p: "تلې وئ", f: "túle wey" }]],
        [[{ p: "تلی و", f: "túlay wo" }], [{ p: "تلي وو", f: "túlee woo" }]],
        [[{ p: "تلې وه", f: "túle wa" }], [{ p: "تلې وې", f: "túle we" }]],
      ],
      long: [
        [
          [{ p: "تللی وم", f: "tlúlay wum" }],
          [{ p: "تللي وو", f: "tlúlee woo" }],
        ],
        [
          [{ p: "تللې وم", f: "tlúle wum" }],
          [{ p: "تللې وو", f: "tlúle woo" }],
        ],
        [
          [{ p: "تللی وې", f: "tlúlay we" }],
          [{ p: "تللي وئ", f: "tlúlee wey" }],
        ],
        [[{ p: "تللې وې", f: "tlúle we" }], [{ p: "تللې وئ", f: "tlúle wey" }]],
        [
          [{ p: "تللی و", f: "tlúlay wo" }],
          [{ p: "تللي وو", f: "tlúlee woo" }],
        ],
        [[{ p: "تللې وه", f: "tlúle wa" }], [{ p: "تللې وې", f: "tlúle we" }]],
      ],
    },
    present: {
      short: [
        [[{ p: "تلی یم", f: "túlay yum" }], [{ p: "تلي یو", f: "túlee yoo" }]],
        [[{ p: "تلې یم", f: "túle yum" }], [{ p: "تلې یو", f: "túle yoo" }]],
        [[{ p: "تلی یې", f: "túlay ye" }], [{ p: "تلي یئ", f: "túlee yey" }]],
        [[{ p: "تلې یې", f: "túle ye" }], [{ p: "تلې یئ", f: "túle yey" }]],
        [[{ p: "تلی دی", f: "túlay day" }], [{ p: "تلي دي", f: "túlee dee" }]],
        [[{ p: "تلې ده", f: "túle da" }], [{ p: "تلې دي", f: "túle dee" }]],
      ],
      long: [
        [
          [{ p: "تللی یم", f: "tlúlay yum" }],
          [{ p: "تللي یو", f: "tlúlee yoo" }],
        ],
        [
          [{ p: "تللې یم", f: "tlúle yum" }],
          [{ p: "تللې یو", f: "tlúle yoo" }],
        ],
        [
          [{ p: "تللی یې", f: "tlúlay ye" }],
          [{ p: "تللي یئ", f: "tlúlee yey" }],
        ],
        [[{ p: "تللې یې", f: "tlúle ye" }], [{ p: "تللې یئ", f: "tlúle yey" }]],
        [
          [{ p: "تللی دی", f: "tlúlay day" }],
          [{ p: "تللي دي", f: "tlúlee dee" }],
        ],
        [[{ p: "تللې ده", f: "tlúle da" }], [{ p: "تللې دي", f: "tlúle dee" }]],
      ],
    },
    habitual: {
      short: [
        [[{ p: "تلی یم", f: "túlay yum" }], [{ p: "تلي یو", f: "túlee yoo" }]],
        [[{ p: "تلې یم", f: "túle yum" }], [{ p: "تلې یو", f: "túle yoo" }]],
        [[{ p: "تلی یې", f: "túlay ye" }], [{ p: "تلي یئ", f: "túlee yey" }]],
        [[{ p: "تلې یې", f: "túle ye" }], [{ p: "تلې یئ", f: "túle yey" }]],
        [[{ p: "تلی وي", f: "túlay wee" }], [{ p: "تلي وي", f: "túlee wee" }]],
        [[{ p: "تلې وي", f: "túle wee" }], [{ p: "تلې وي", f: "túle wee" }]],
      ],
      long: [
        [
          [{ p: "تللی یم", f: "tlúlay yum" }],
          [{ p: "تللي یو", f: "tlúlee yoo" }],
        ],
        [
          [{ p: "تللې یم", f: "tlúle yum" }],
          [{ p: "تللې یو", f: "tlúle yoo" }],
        ],
        [
          [{ p: "تللی یې", f: "tlúlay ye" }],
          [{ p: "تللي یئ", f: "tlúlee yey" }],
        ],
        [[{ p: "تللې یې", f: "tlúle ye" }], [{ p: "تللې یئ", f: "tlúle yey" }]],
        [
          [{ p: "تللی وي", f: "tlúlay wee" }],
          [{ p: "تللي وي", f: "tlúlee wee" }],
        ],
        [
          [{ p: "تللې وي", f: "tlúle wee" }],
          [{ p: "تللې وي", f: "tlúle wee" }],
        ],
      ],
    },
    subjunctive: {
      short: [
        [[{ p: "تلی وم", f: "túlay wum" }], [{ p: "تلي وو", f: "túlee woo" }]],
        [[{ p: "تلې وم", f: "túle wum" }], [{ p: "تلې وو", f: "túle woo" }]],
        [[{ p: "تلی وې", f: "túlay we" }], [{ p: "تلي وئ", f: "túlee wey" }]],
        [[{ p: "تلې وې", f: "túle we" }], [{ p: "تلې وئ", f: "túle wey" }]],
        [[{ p: "تلی وي", f: "túlay wee" }], [{ p: "تلي وي", f: "túlee wee" }]],
        [[{ p: "تلې وي", f: "túle wee" }], [{ p: "تلې وي", f: "túle wee" }]],
      ],
      long: [
        [
          [{ p: "تللی وم", f: "tlúlay wum" }],
          [{ p: "تللي وو", f: "tlúlee woo" }],
        ],
        [
          [{ p: "تللې وم", f: "tlúle wum" }],
          [{ p: "تللې وو", f: "tlúle woo" }],
        ],
        [
          [{ p: "تللی وې", f: "tlúlay we" }],
          [{ p: "تللي وئ", f: "tlúlee wey" }],
        ],
        [[{ p: "تللې وې", f: "tlúle we" }], [{ p: "تللې وئ", f: "tlúle wey" }]],
        [
          [{ p: "تللی وي", f: "tlúlay wee" }],
          [{ p: "تللي وي", f: "tlúlee wee" }],
        ],
        [
          [{ p: "تللې وي", f: "tlúle wee" }],
          [{ p: "تللې وي", f: "tlúle wee" }],
        ],
      ],
    },
    future: {
      short: [
        [
          [{ p: "به تلی یم", f: "ba túlay yum" }],
          [{ p: "به تلي یو", f: "ba túlee yoo" }],
        ],
        [
          [{ p: "به تلې یم", f: "ba túle yum" }],
          [{ p: "به تلې یو", f: "ba túle yoo" }],
        ],
        [
          [{ p: "به تلی یې", f: "ba túlay ye" }],
          [{ p: "به تلي یئ", f: "ba túlee yey" }],
        ],
        [
          [{ p: "به تلې یې", f: "ba túle ye" }],
          [{ p: "به تلې یئ", f: "ba túle yey" }],
        ],
        [
          [{ p: "به تلی وي", f: "ba túlay wee" }],
          [{ p: "به تلي وي", f: "ba túlee wee" }],
        ],
        [
          [{ p: "به تلې وي", f: "ba túle wee" }],
          [{ p: "به تلې وي", f: "ba túle wee" }],
        ],
      ],
      long: [
        [
          [{ p: "به تللی یم", f: "ba tlúlay yum" }],
          [{ p: "به تللي یو", f: "ba tlúlee yoo" }],
        ],
        [
          [{ p: "به تللې یم", f: "ba tlúle yum" }],
          [{ p: "به تللې یو", f: "ba tlúle yoo" }],
        ],
        [
          [{ p: "به تللی یې", f: "ba tlúlay ye" }],
          [{ p: "به تللي یئ", f: "ba tlúlee yey" }],
        ],
        [
          [{ p: "به تللې یې", f: "ba tlúle ye" }],
          [{ p: "به تللې یئ", f: "ba tlúle yey" }],
        ],
        [
          [{ p: "به تللی وي", f: "ba tlúlay wee" }],
          [{ p: "به تللي وي", f: "ba tlúlee wee" }],
        ],
        [
          [{ p: "به تللې وي", f: "ba tlúle wee" }],
          [{ p: "به تللې وي", f: "ba tlúle wee" }],
        ],
      ],
    },
    wouldBe: {
      short: [
        [
          [{ p: "به تلی وم", f: "ba túlay wum" }],
          [{ p: "به تلي وو", f: "ba túlee woo" }],
        ],
        [
          [{ p: "به تلې وم", f: "ba túle wum" }],
          [{ p: "به تلې وو", f: "ba túle woo" }],
        ],
        [
          [{ p: "به تلی وې", f: "ba túlay we" }],
          [{ p: "به تلي وئ", f: "ba túlee wey" }],
        ],
        [
          [{ p: "به تلې وې", f: "ba túle we" }],
          [{ p: "به تلې وئ", f: "ba túle wey" }],
        ],
        [
          [{ p: "به تلی و", f: "ba túlay wo" }],
          [{ p: "به تلي وو", f: "ba túlee woo" }],
        ],
        [
          [{ p: "به تلې وه", f: "ba túle wa" }],
          [{ p: "به تلې وې", f: "ba túle we" }],
        ],
      ],
      long: [
        [
          [{ p: "به تللی وم", f: "ba tlúlay wum" }],
          [{ p: "به تللي وو", f: "ba tlúlee woo" }],
        ],
        [
          [{ p: "به تللې وم", f: "ba tlúle wum" }],
          [{ p: "به تللې وو", f: "ba tlúle woo" }],
        ],
        [
          [{ p: "به تللی وې", f: "ba tlúlay we" }],
          [{ p: "به تللي وئ", f: "ba tlúlee wey" }],
        ],
        [
          [{ p: "به تللې وې", f: "ba tlúle we" }],
          [{ p: "به تللې وئ", f: "ba tlúle wey" }],
        ],
        [
          [{ p: "به تللی و", f: "ba tlúlay wo" }],
          [{ p: "به تللي وو", f: "ba tlúlee woo" }],
        ],
        [
          [{ p: "به تللې وه", f: "ba tlúle wa" }],
          [{ p: "به تللې وې", f: "ba tlúle we" }],
        ],
      ],
    },
    pastSubjunctive: {
      short: [
        [
          [
            { p: "تلی وای", f: "túlay waay" },
            { p: "تلی وی", f: "túlay way" },
          ],
          [
            { p: "تلي وای", f: "túlee waay" },
            { p: "تلي وی", f: "túlee way" },
          ],
        ],
        [
          [
            { p: "تلې وای", f: "túle waay" },
            { p: "تلې وی", f: "túle way" },
          ],
          [
            { p: "تلې وای", f: "túle waay" },
            { p: "تلې وی", f: "túle way" },
          ],
        ],
        [
          [
            { p: "تلی وای", f: "túlay waay" },
            { p: "تلی وی", f: "túlay way" },
          ],
          [
            { p: "تلي وای", f: "túlee waay" },
            { p: "تلي وی", f: "túlee way" },
          ],
        ],
        [
          [
            { p: "تلې وای", f: "túle waay" },
            { p: "تلې وی", f: "túle way" },
          ],
          [
            { p: "تلې وای", f: "túle waay" },
            { p: "تلې وی", f: "túle way" },
          ],
        ],
        [
          [
            { p: "تلی وای", f: "túlay waay" },
            { p: "تلی وی", f: "túlay way" },
          ],
          [
            { p: "تلي وای", f: "túlee waay" },
            { p: "تلي وی", f: "túlee way" },
          ],
        ],
        [
          [
            { p: "تلې وای", f: "túle waay" },
            { p: "تلې وی", f: "túle way" },
          ],
          [
            { p: "تلې وای", f: "túle waay" },
            { p: "تلې وی", f: "túle way" },
          ],
        ],
      ],
      long: [
        [
          [
            { p: "تللی وای", f: "tlúlay waay" },
            { p: "تللی وی", f: "tlúlay way" },
          ],
          [
            { p: "تللي وای", f: "tlúlee waay" },
            { p: "تللي وی", f: "tlúlee way" },
          ],
        ],
        [
          [
            { p: "تللې وای", f: "tlúle waay" },
            { p: "تللې وی", f: "tlúle way" },
          ],
          [
            { p: "تللې وای", f: "tlúle waay" },
            { p: "تللې وی", f: "tlúle way" },
          ],
        ],
        [
          [
            { p: "تللی وای", f: "tlúlay waay" },
            { p: "تللی وی", f: "tlúlay way" },
          ],
          [
            { p: "تللي وای", f: "tlúlee waay" },
            { p: "تللي وی", f: "tlúlee way" },
          ],
        ],
        [
          [
            { p: "تللې وای", f: "tlúle waay" },
            { p: "تللې وی", f: "tlúle way" },
          ],
          [
            { p: "تللې وای", f: "tlúle waay" },
            { p: "تللې وی", f: "tlúle way" },
          ],
        ],
        [
          [
            { p: "تللی وای", f: "tlúlay waay" },
            { p: "تللی وی", f: "tlúlay way" },
          ],
          [
            { p: "تللي وای", f: "tlúlee waay" },
            { p: "تللي وی", f: "tlúlee way" },
          ],
        ],
        [
          [
            { p: "تللې وای", f: "tlúle waay" },
            { p: "تللې وی", f: "tlúle way" },
          ],
          [
            { p: "تللې وای", f: "tlúle waay" },
            { p: "تللې وی", f: "tlúle way" },
          ],
        ],
      ],
    },
    wouldHaveBeen: {
      short: [
        [
          [
            { p: "به تلی وای", f: "ba túlay waay" },
            { p: "به تلی وی", f: "ba túlay way" },
          ],
          [
            { p: "به تلي وای", f: "ba túlee waay" },
            { p: "به تلي وی", f: "ba túlee way" },
          ],
        ],
        [
          [
            { p: "به تلې وای", f: "ba túle waay" },
            { p: "به تلې وی", f: "ba túle way" },
          ],
          [
            { p: "به تلې وای", f: "ba túle waay" },
            { p: "به تلې وی", f: "ba túle way" },
          ],
        ],
        [
          [
            { p: "به تلی وای", f: "ba túlay waay" },
            { p: "به تلی وی", f: "ba túlay way" },
          ],
          [
            { p: "به تلي وای", f: "ba túlee waay" },
            { p: "به تلي وی", f: "ba túlee way" },
          ],
        ],
        [
          [
            { p: "به تلې وای", f: "ba túle waay" },
            { p: "به تلې وی", f: "ba túle way" },
          ],
          [
            { p: "به تلې وای", f: "ba túle waay" },
            { p: "به تلې وی", f: "ba túle way" },
          ],
        ],
        [
          [
            { p: "به تلی وای", f: "ba túlay waay" },
            { p: "به تلی وی", f: "ba túlay way" },
          ],
          [
            { p: "به تلي وای", f: "ba túlee waay" },
            { p: "به تلي وی", f: "ba túlee way" },
          ],
        ],
        [
          [
            { p: "به تلې وای", f: "ba túle waay" },
            { p: "به تلې وی", f: "ba túle way" },
          ],
          [
            { p: "به تلې وای", f: "ba túle waay" },
            { p: "به تلې وی", f: "ba túle way" },
          ],
        ],
      ],
      long: [
        [
          [
            { p: "به تللی وای", f: "ba tlúlay waay" },
            { p: "به تللی وی", f: "ba tlúlay way" },
          ],
          [
            { p: "به تللي وای", f: "ba tlúlee waay" },
            { p: "به تللي وی", f: "ba tlúlee way" },
          ],
        ],
        [
          [
            { p: "به تللې وای", f: "ba tlúle waay" },
            { p: "به تللې وی", f: "ba tlúle way" },
          ],
          [
            { p: "به تللې وای", f: "ba tlúle waay" },
            { p: "به تللې وی", f: "ba tlúle way" },
          ],
        ],
        [
          [
            { p: "به تللی وای", f: "ba tlúlay waay" },
            { p: "به تللی وی", f: "ba tlúlay way" },
          ],
          [
            { p: "به تللي وای", f: "ba tlúlee waay" },
            { p: "به تللي وی", f: "ba tlúlee way" },
          ],
        ],
        [
          [
            { p: "به تللې وای", f: "ba tlúle waay" },
            { p: "به تللې وی", f: "ba tlúle way" },
          ],
          [
            { p: "به تللې وای", f: "ba tlúle waay" },
            { p: "به تللې وی", f: "ba tlúle way" },
          ],
        ],
        [
          [
            { p: "به تللی وای", f: "ba tlúlay waay" },
            { p: "به تللی وی", f: "ba tlúlay way" },
          ],
          [
            { p: "به تللي وای", f: "ba tlúlee waay" },
            { p: "به تللي وی", f: "ba tlúlee way" },
          ],
        ],
        [
          [
            { p: "به تللې وای", f: "ba tlúle waay" },
            { p: "به تللې وی", f: "ba tlúle way" },
          ],
          [
            { p: "به تللې وای", f: "ba tlúle waay" },
            { p: "به تللې وی", f: "ba tlúle way" },
          ],
        ],
      ],
    },
  },
};

export const stativeAux = {
  transitive: kawulStat,
  intransitive: kedulStat,
};

export const dynamicAux = {
  transative: kawulDyn,
  intransitive: kedulDyn,
};

export const warkawul: T.VerbConjugation = {
  info: {
    entry: {
      entry: {
        ts: 1527813914,
        i: 14222,
        p: "ورکول",
        f: "wărkawul",
        g: "warkawul",
        e: "to give (to him/her/it - towards third person)",
        c: "v. trans.",
      } as T.VerbDictionaryEntry,
    },
    transitivity: "transitive",
    type: "simple",
    yulEnding: false,
    root: {
      imperfective: {
        long: { p: "ورکول", f: "wărkawul" },
        short: { p: "ورکو", f: "wărkaw" },
      },
      perfective: {
        long: { p: "ورکړل", f: "wărkRul" },
        short: { p: "ورکړ", f: "wărkR" },
        mini: { p: "ورک", f: "wărk" },
      },
      perfectiveSplit: {
        long: [
          { p: "ور ", f: "wăr " },
          { p: "کړل", f: "kRul" },
        ],
        short: [
          { p: "ور ", f: "wăr " },
          { p: "کړ", f: "kR" },
        ],
        mini: [
          { p: "ور ", f: "wăr " },
          { p: "ړ", f: "k" },
        ],
      },
    },
    stem: {
      imperfective: { p: "ورکو", f: "wărkaw" },
      perfective: {
        long: { p: "ورکړ", f: "wărkR" },
        short: { p: "ورک", f: "wărk" },
      },
      perfectiveSplit: {
        long: [
          { p: "ور ", f: "wăr " },
          { p: "کړ", f: "kR" },
        ],
        short: [
          { p: "ور ", f: "wăr " },
          { p: "ړ", f: "k" },
        ],
      },
    },
    participle: {
      present: { p: "ورکوونکی", f: "wărkawóonkay" },
      past: { p: "ورکړی", f: "wărkúRay" },
    },
  },
  imperfective: {
    nonImperative: [
      [[{ p: "ورکوم", f: "wărkawum" }], [{ p: "ورکوو", f: "wărkawoo" }]],
      [[{ p: "ورکوم", f: "wărkawum" }], [{ p: "ورکوو", f: "wărkawoo" }]],
      [[{ p: "ورکوې", f: "wărkawe" }], [{ p: "ورکوئ", f: "wărkawey" }]],
      [[{ p: "ورکوې", f: "wărkawe" }], [{ p: "ورکوئ", f: "wărkawey" }]],
      [[{ p: "ورکوي", f: "wărkawee" }], [{ p: "ورکوي", f: "wărkawee" }]],
      [[{ p: "ورکوي", f: "wărkawee" }], [{ p: "ورکوي", f: "wărkawee" }]],
    ],
    future: [
      [
        [{ p: "به ورکوم", f: "ba wărkawum" }],
        [{ p: "به ورکوو", f: "ba wărkawoo" }],
      ],
      [
        [{ p: "به ورکوم", f: "ba wărkawum" }],
        [{ p: "به ورکوو", f: "ba wărkawoo" }],
      ],
      [
        [{ p: "به ورکوې", f: "ba wărkawe" }],
        [{ p: "به ورکوئ", f: "ba wărkawey" }],
      ],
      [
        [{ p: "به ورکوې", f: "ba wărkawe" }],
        [{ p: "به ورکوئ", f: "ba wărkawey" }],
      ],
      [
        [{ p: "به ورکوي", f: "ba wărkawee" }],
        [{ p: "به ورکوي", f: "ba wărkawee" }],
      ],
      [
        [{ p: "به ورکوي", f: "ba wărkawee" }],
        [{ p: "به ورکوي", f: "ba wărkawee" }],
      ],
    ],
    imperative: [
      [[{ p: "ورکوه", f: "wărkawá" }], [{ p: "ورکوئ", f: "wărkawéy" }]],
      [[{ p: "ورکوه", f: "wărkawá" }], [{ p: "ورکوئ", f: "wărkawéy" }]],
    ],
    past: {
      short: [
        [[{ p: "ورکوم", f: "wărkawum" }], [{ p: "ورکوو", f: "wărkawoo" }]],
        [[{ p: "ورکوم", f: "wărkawum" }], [{ p: "ورکوو", f: "wărkawoo" }]],
        [[{ p: "ورکوې", f: "wărkawe" }], [{ p: "ورکوئ", f: "wărkawey" }]],
        [[{ p: "ورکوې", f: "wărkawe" }], [{ p: "ورکوئ", f: "wărkawey" }]],
        [[{ p: "ورکاوه", f: "wărkaawu" }], [{ p: "ورکول", f: "wărkawul" }]],
        [[{ p: "ورکوه", f: "wărkawa" }], [{ p: "ورکوې", f: "wărkawe" }]],
      ],
      long: [
        [
          [{ p: "ورکولم", f: "wărkawulum" }],
          [{ p: "ورکولو", f: "wărkawuloo" }],
        ],
        [
          [{ p: "ورکولم", f: "wărkawulum" }],
          [{ p: "ورکولو", f: "wărkawuloo" }],
        ],
        [[{ p: "ورکولې", f: "wărkawule" }], [{ p: "ورکولئ", f: "wărkawuley" }]],
        [[{ p: "ورکولې", f: "wărkawule" }], [{ p: "ورکولئ", f: "wărkawuley" }]],
        [
          [
            { p: "ورکوله", f: "wărkawulu" },
            { p: "ورکولو", f: "wărkawulo" },
          ],
          [{ p: "ورکول", f: "wărkawul" }],
        ],
        [[{ p: "ورکوله", f: "wărkawula" }], [{ p: "ورکولې", f: "wărkawule" }]],
      ],
    },
    habitualPast: {
      short: [
        [
          [{ p: "به ورکوم", f: "ba wărkawum" }],
          [{ p: "به ورکوو", f: "ba wărkawoo" }],
        ],
        [
          [{ p: "به ورکوم", f: "ba wărkawum" }],
          [{ p: "به ورکوو", f: "ba wărkawoo" }],
        ],
        [
          [{ p: "به ورکوې", f: "ba wărkawe" }],
          [{ p: "به ورکوئ", f: "ba wărkawey" }],
        ],
        [
          [{ p: "به ورکوې", f: "ba wărkawe" }],
          [{ p: "به ورکوئ", f: "ba wărkawey" }],
        ],
        [
          [{ p: "به ورکاوه", f: "ba wărkaawu" }],
          [{ p: "به ورکول", f: "ba wărkawul" }],
        ],
        [
          [{ p: "به ورکوه", f: "ba wărkawa" }],
          [{ p: "به ورکوې", f: "ba wărkawe" }],
        ],
      ],
      long: [
        [
          [{ p: "به ورکولم", f: "ba wărkawulum" }],
          [{ p: "به ورکولو", f: "ba wărkawuloo" }],
        ],
        [
          [{ p: "به ورکولم", f: "ba wărkawulum" }],
          [{ p: "به ورکولو", f: "ba wărkawuloo" }],
        ],
        [
          [{ p: "به ورکولې", f: "ba wărkawule" }],
          [{ p: "به ورکولئ", f: "ba wărkawuley" }],
        ],
        [
          [{ p: "به ورکولې", f: "ba wărkawule" }],
          [{ p: "به ورکولئ", f: "ba wărkawuley" }],
        ],
        [
          [
            { p: "به ورکوله", f: "ba wărkawulu" },
            { p: "به ورکولو", f: "ba wărkawulo" },
          ],
          [{ p: "به ورکول", f: "ba wărkawul" }],
        ],
        [
          [{ p: "به ورکوله", f: "ba wărkawula" }],
          [{ p: "به ورکولې", f: "ba wărkawule" }],
        ],
      ],
    },
    modal: {
      nonImperative: {
        long: [
          [
            [
              { p: "ورکولی شم", f: "wărkawúlay shum" },
              { p: "ورکولای شم", f: "wărkawúlaay shum" },
            ],
            [
              { p: "ورکولی شو", f: "wărkawúlay shoo" },
              { p: "ورکولای شو", f: "wărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "ورکولی شم", f: "wărkawúlay shum" },
              { p: "ورکولای شم", f: "wărkawúlaay shum" },
            ],
            [
              { p: "ورکولی شو", f: "wărkawúlay shoo" },
              { p: "ورکولای شو", f: "wărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "ورکولی شې", f: "wărkawúlay she" },
              { p: "ورکولای شې", f: "wărkawúlaay she" },
            ],
            [
              { p: "ورکولی شئ", f: "wărkawúlay shey" },
              { p: "ورکولای شئ", f: "wărkawúlaay shey" },
            ],
          ],
          [
            [
              { p: "ورکولی شې", f: "wărkawúlay she" },
              { p: "ورکولای شې", f: "wărkawúlaay she" },
            ],
            [
              { p: "ورکولی شئ", f: "wărkawúlay shey" },
              { p: "ورکولای شئ", f: "wărkawúlaay shey" },
            ],
          ],
          [
            [
              { p: "ورکولی شي", f: "wărkawúlay shee" },
              { p: "ورکولای شي", f: "wărkawúlaay shee" },
            ],
            [
              { p: "ورکولی شي", f: "wărkawúlay shee" },
              { p: "ورکولای شي", f: "wărkawúlaay shee" },
            ],
          ],
          [
            [
              { p: "ورکولی شي", f: "wărkawúlay shee" },
              { p: "ورکولای شي", f: "wărkawúlaay shee" },
            ],
            [
              { p: "ورکولی شي", f: "wărkawúlay shee" },
              { p: "ورکولای شي", f: "wărkawúlaay shee" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "ورکوی شم", f: "wărkawáy shum" },
              { p: "ورکوای شم", f: "wărkawáay shum" },
            ],
            [
              { p: "ورکوی شو", f: "wărkawáy shoo" },
              { p: "ورکوای شو", f: "wărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "ورکوی شم", f: "wărkawáy shum" },
              { p: "ورکوای شم", f: "wărkawáay shum" },
            ],
            [
              { p: "ورکوی شو", f: "wărkawáy shoo" },
              { p: "ورکوای شو", f: "wărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "ورکوی شې", f: "wărkawáy she" },
              { p: "ورکوای شې", f: "wărkawáay she" },
            ],
            [
              { p: "ورکوی شئ", f: "wărkawáy shey" },
              { p: "ورکوای شئ", f: "wărkawáay shey" },
            ],
          ],
          [
            [
              { p: "ورکوی شې", f: "wărkawáy she" },
              { p: "ورکوای شې", f: "wărkawáay she" },
            ],
            [
              { p: "ورکوی شئ", f: "wărkawáy shey" },
              { p: "ورکوای شئ", f: "wărkawáay shey" },
            ],
          ],
          [
            [
              { p: "ورکوی شي", f: "wărkawáy shee" },
              { p: "ورکوای شي", f: "wărkawáay shee" },
            ],
            [
              { p: "ورکوی شي", f: "wărkawáy shee" },
              { p: "ورکوای شي", f: "wărkawáay shee" },
            ],
          ],
          [
            [
              { p: "ورکوی شي", f: "wărkawáy shee" },
              { p: "ورکوای شي", f: "wărkawáay shee" },
            ],
            [
              { p: "ورکوی شي", f: "wărkawáy shee" },
              { p: "ورکوای شي", f: "wărkawáay shee" },
            ],
          ],
        ],
      },
      future: {
        long: [
          [
            [
              { p: "به ورکولی شم", f: "ba wărkawúlay shum" },
              { p: "به ورکولای شم", f: "ba wărkawúlaay shum" },
            ],
            [
              { p: "به ورکولی شو", f: "ba wărkawúlay shoo" },
              { p: "به ورکولای شو", f: "ba wărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکولی شم", f: "ba wărkawúlay shum" },
              { p: "به ورکولای شم", f: "ba wărkawúlaay shum" },
            ],
            [
              { p: "به ورکولی شو", f: "ba wărkawúlay shoo" },
              { p: "به ورکولای شو", f: "ba wărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکولی شې", f: "ba wărkawúlay she" },
              { p: "به ورکولای شې", f: "ba wărkawúlaay she" },
            ],
            [
              { p: "به ورکولی شئ", f: "ba wărkawúlay shey" },
              { p: "به ورکولای شئ", f: "ba wărkawúlaay shey" },
            ],
          ],
          [
            [
              { p: "به ورکولی شې", f: "ba wărkawúlay she" },
              { p: "به ورکولای شې", f: "ba wărkawúlaay she" },
            ],
            [
              { p: "به ورکولی شئ", f: "ba wărkawúlay shey" },
              { p: "به ورکولای شئ", f: "ba wărkawúlaay shey" },
            ],
          ],
          [
            [
              { p: "به ورکولی شي", f: "ba wărkawúlay shee" },
              { p: "به ورکولای شي", f: "ba wărkawúlaay shee" },
            ],
            [
              { p: "به ورکولی شي", f: "ba wărkawúlay shee" },
              { p: "به ورکولای شي", f: "ba wărkawúlaay shee" },
            ],
          ],
          [
            [
              { p: "به ورکولی شي", f: "ba wărkawúlay shee" },
              { p: "به ورکولای شي", f: "ba wărkawúlaay shee" },
            ],
            [
              { p: "به ورکولی شي", f: "ba wărkawúlay shee" },
              { p: "به ورکولای شي", f: "ba wărkawúlaay shee" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "به ورکوی شم", f: "ba wărkawáy shum" },
              { p: "به ورکوای شم", f: "ba wărkawáay shum" },
            ],
            [
              { p: "به ورکوی شو", f: "ba wărkawáy shoo" },
              { p: "به ورکوای شو", f: "ba wărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکوی شم", f: "ba wărkawáy shum" },
              { p: "به ورکوای شم", f: "ba wărkawáay shum" },
            ],
            [
              { p: "به ورکوی شو", f: "ba wărkawáy shoo" },
              { p: "به ورکوای شو", f: "ba wărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکوی شې", f: "ba wărkawáy she" },
              { p: "به ورکوای شې", f: "ba wărkawáay she" },
            ],
            [
              { p: "به ورکوی شئ", f: "ba wărkawáy shey" },
              { p: "به ورکوای شئ", f: "ba wărkawáay shey" },
            ],
          ],
          [
            [
              { p: "به ورکوی شې", f: "ba wărkawáy she" },
              { p: "به ورکوای شې", f: "ba wărkawáay she" },
            ],
            [
              { p: "به ورکوی شئ", f: "ba wărkawáy shey" },
              { p: "به ورکوای شئ", f: "ba wărkawáay shey" },
            ],
          ],
          [
            [
              { p: "به ورکوی شي", f: "ba wărkawáy shee" },
              { p: "به ورکوای شي", f: "ba wărkawáay shee" },
            ],
            [
              { p: "به ورکوی شي", f: "ba wărkawáy shee" },
              { p: "به ورکوای شي", f: "ba wărkawáay shee" },
            ],
          ],
          [
            [
              { p: "به ورکوی شي", f: "ba wărkawáy shee" },
              { p: "به ورکوای شي", f: "ba wărkawáay shee" },
            ],
            [
              { p: "به ورکوی شي", f: "ba wărkawáy shee" },
              { p: "به ورکوای شي", f: "ba wărkawáay shee" },
            ],
          ],
        ],
      },
      past: {
        long: [
          [
            [
              { p: "ورکولی شوم", f: "wărkawúlay shwum" },
              { p: "ورکولای شوم", f: "wărkawúlaay shwum" },
            ],
            [
              { p: "ورکولی شو", f: "wărkawúlay shoo" },
              { p: "ورکولای شو", f: "wărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "ورکولی شوم", f: "wărkawúlay shwum" },
              { p: "ورکولای شوم", f: "wărkawúlaay shwum" },
            ],
            [
              { p: "ورکولی شو", f: "wărkawúlay shoo" },
              { p: "ورکولای شو", f: "wărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "ورکولی شوې", f: "wărkawúlay shwe" },
              { p: "ورکولای شوې", f: "wărkawúlaay shwe" },
            ],
            [
              { p: "ورکولی شوئ", f: "wărkawúlay shwey" },
              { p: "ورکولای شوئ", f: "wărkawúlaay shwey" },
            ],
          ],
          [
            [
              { p: "ورکولی شوې", f: "wărkawúlay shwe" },
              { p: "ورکولای شوې", f: "wărkawúlaay shwe" },
            ],
            [
              { p: "ورکولی شوئ", f: "wărkawúlay shwey" },
              { p: "ورکولای شوئ", f: "wărkawúlaay shwey" },
            ],
          ],
          [
            [
              { p: "ورکولی شو", f: "wărkawúlay sho" },
              { p: "ورکولای شو", f: "wărkawúlaay sho" },
            ],
            [
              { p: "ورکولی شول", f: "wărkawúlay shwul" },
              { p: "ورکولای شول", f: "wărkawúlaay shwul" },
              { p: "ورکولی شو", f: "wărkawúlay shoo" },
              { p: "ورکولای شو", f: "wărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "ورکولی شوه", f: "wărkawúlay shwa" },
              { p: "ورکولای شوه", f: "wărkawúlaay shwa" },
            ],
            [
              { p: "ورکولی شولې", f: "wărkawúlay shwule" },
              { p: "ورکولای شولې", f: "wărkawúlaay shwule" },
              { p: "ورکولی شوې", f: "wărkawúlay shwe" },
              { p: "ورکولای شوې", f: "wărkawúlaay shwe" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "ورکوی شوم", f: "wărkawáy shwum" },
              { p: "ورکوای شوم", f: "wărkawáay shwum" },
            ],
            [
              { p: "ورکوی شو", f: "wărkawáy shoo" },
              { p: "ورکوای شو", f: "wărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "ورکوی شوم", f: "wărkawáy shwum" },
              { p: "ورکوای شوم", f: "wărkawáay shwum" },
            ],
            [
              { p: "ورکوی شو", f: "wărkawáy shoo" },
              { p: "ورکوای شو", f: "wărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "ورکوی شوې", f: "wărkawáy shwe" },
              { p: "ورکوای شوې", f: "wărkawáay shwe" },
            ],
            [
              { p: "ورکوی شوئ", f: "wărkawáy shwey" },
              { p: "ورکوای شوئ", f: "wărkawáay shwey" },
            ],
          ],
          [
            [
              { p: "ورکوی شوې", f: "wărkawáy shwe" },
              { p: "ورکوای شوې", f: "wărkawáay shwe" },
            ],
            [
              { p: "ورکوی شوئ", f: "wărkawáy shwey" },
              { p: "ورکوای شوئ", f: "wărkawáay shwey" },
            ],
          ],
          [
            [
              { p: "ورکوی شو", f: "wărkawáy sho" },
              { p: "ورکوای شو", f: "wărkawáay sho" },
            ],
            [
              { p: "ورکوی شول", f: "wărkawáy shwul" },
              { p: "ورکوای شول", f: "wărkawáay shwul" },
              { p: "ورکوی شو", f: "wărkawáy shoo" },
              { p: "ورکوای شو", f: "wărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "ورکوی شوه", f: "wărkawáy shwa" },
              { p: "ورکوای شوه", f: "wărkawáay shwa" },
            ],
            [
              { p: "ورکوی شولې", f: "wărkawáy shwule" },
              { p: "ورکوای شولې", f: "wărkawáay shwule" },
              { p: "ورکوی شوې", f: "wărkawáy shwe" },
              { p: "ورکوای شوې", f: "wărkawáay shwe" },
            ],
          ],
        ],
      },
      habitualPast: {
        long: [
          [
            [
              { p: "به ورکولی شوم", f: "ba wărkawúlay shwum" },
              { p: "به ورکولای شوم", f: "ba wărkawúlaay shwum" },
            ],
            [
              { p: "به ورکولی شو", f: "ba wărkawúlay shoo" },
              { p: "به ورکولای شو", f: "ba wărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکولی شوم", f: "ba wărkawúlay shwum" },
              { p: "به ورکولای شوم", f: "ba wărkawúlaay shwum" },
            ],
            [
              { p: "به ورکولی شو", f: "ba wărkawúlay shoo" },
              { p: "به ورکولای شو", f: "ba wărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکولی شوې", f: "ba wărkawúlay shwe" },
              { p: "به ورکولای شوې", f: "ba wărkawúlaay shwe" },
            ],
            [
              { p: "به ورکولی شوئ", f: "ba wărkawúlay shwey" },
              { p: "به ورکولای شوئ", f: "ba wărkawúlaay shwey" },
            ],
          ],
          [
            [
              { p: "به ورکولی شوې", f: "ba wărkawúlay shwe" },
              { p: "به ورکولای شوې", f: "ba wărkawúlaay shwe" },
            ],
            [
              { p: "به ورکولی شوئ", f: "ba wărkawúlay shwey" },
              { p: "به ورکولای شوئ", f: "ba wărkawúlaay shwey" },
            ],
          ],
          [
            [
              { p: "به ورکولی شو", f: "ba wărkawúlay sho" },
              { p: "به ورکولای شو", f: "ba wărkawúlaay sho" },
            ],
            [
              { p: "به ورکولی شول", f: "ba wărkawúlay shwul" },
              { p: "به ورکولای شول", f: "ba wărkawúlaay shwul" },
              { p: "به ورکولی شو", f: "ba wărkawúlay shoo" },
              { p: "به ورکولای شو", f: "ba wărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکولی شوه", f: "ba wărkawúlay shwa" },
              { p: "به ورکولای شوه", f: "ba wărkawúlaay shwa" },
            ],
            [
              { p: "به ورکولی شولې", f: "ba wărkawúlay shwule" },
              { p: "به ورکولای شولې", f: "ba wărkawúlaay shwule" },
              { p: "به ورکولی شوې", f: "ba wărkawúlay shwe" },
              { p: "به ورکولای شوې", f: "ba wărkawúlaay shwe" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "به ورکوی شوم", f: "ba wărkawáy shwum" },
              { p: "به ورکوای شوم", f: "ba wărkawáay shwum" },
            ],
            [
              { p: "به ورکوی شو", f: "ba wărkawáy shoo" },
              { p: "به ورکوای شو", f: "ba wărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکوی شوم", f: "ba wărkawáy shwum" },
              { p: "به ورکوای شوم", f: "ba wărkawáay shwum" },
            ],
            [
              { p: "به ورکوی شو", f: "ba wărkawáy shoo" },
              { p: "به ورکوای شو", f: "ba wărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکوی شوې", f: "ba wărkawáy shwe" },
              { p: "به ورکوای شوې", f: "ba wărkawáay shwe" },
            ],
            [
              { p: "به ورکوی شوئ", f: "ba wărkawáy shwey" },
              { p: "به ورکوای شوئ", f: "ba wărkawáay shwey" },
            ],
          ],
          [
            [
              { p: "به ورکوی شوې", f: "ba wărkawáy shwe" },
              { p: "به ورکوای شوې", f: "ba wărkawáay shwe" },
            ],
            [
              { p: "به ورکوی شوئ", f: "ba wărkawáy shwey" },
              { p: "به ورکوای شوئ", f: "ba wărkawáay shwey" },
            ],
          ],
          [
            [
              { p: "به ورکوی شو", f: "ba wărkawáy sho" },
              { p: "به ورکوای شو", f: "ba wărkawáay sho" },
            ],
            [
              { p: "به ورکوی شول", f: "ba wărkawáy shwul" },
              { p: "به ورکوای شول", f: "ba wărkawáay shwul" },
              { p: "به ورکوی شو", f: "ba wărkawáy shoo" },
              { p: "به ورکوای شو", f: "ba wărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکوی شوه", f: "ba wărkawáy shwa" },
              { p: "به ورکوای شوه", f: "ba wărkawáay shwa" },
            ],
            [
              { p: "به ورکوی شولې", f: "ba wărkawáy shwule" },
              { p: "به ورکوای شولې", f: "ba wărkawáay shwule" },
              { p: "به ورکوی شوې", f: "ba wărkawáy shwe" },
              { p: "به ورکوای شوې", f: "ba wărkawáay shwe" },
            ],
          ],
        ],
      },
      hypotheticalPast: {
        long: [
          [
            [
              { p: "ورکولی شوای", f: "wărkawúlay shwaay" },
              { p: "ورکولی شوی", f: "wărkawúlay shway" },
              { p: "ورکولای شوای", f: "wărkawúlaay shwaay" },
            ],
            [
              { p: "ورکولی شوای", f: "wărkawúlay shwaay" },
              { p: "ورکولی شوی", f: "wărkawúlay shway" },
              { p: "ورکولای شوای", f: "wărkawúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکولی شوای", f: "wărkawúlay shwaay" },
              { p: "ورکولی شوی", f: "wărkawúlay shway" },
              { p: "ورکولای شوای", f: "wărkawúlaay shwaay" },
            ],
            [
              { p: "ورکولی شوای", f: "wărkawúlay shwaay" },
              { p: "ورکولی شوی", f: "wărkawúlay shway" },
              { p: "ورکولای شوای", f: "wărkawúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکولی شوای", f: "wărkawúlay shwaay" },
              { p: "ورکولی شوی", f: "wărkawúlay shway" },
              { p: "ورکولای شوای", f: "wărkawúlaay shwaay" },
            ],
            [
              { p: "ورکولی شوای", f: "wărkawúlay shwaay" },
              { p: "ورکولی شوی", f: "wărkawúlay shway" },
              { p: "ورکولای شوای", f: "wărkawúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکولی شوای", f: "wărkawúlay shwaay" },
              { p: "ورکولی شوی", f: "wărkawúlay shway" },
              { p: "ورکولای شوای", f: "wărkawúlaay shwaay" },
            ],
            [
              { p: "ورکولی شوای", f: "wărkawúlay shwaay" },
              { p: "ورکولی شوی", f: "wărkawúlay shway" },
              { p: "ورکولای شوای", f: "wărkawúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکولی شوای", f: "wărkawúlay shwaay" },
              { p: "ورکولی شوی", f: "wărkawúlay shway" },
              { p: "ورکولای شوای", f: "wărkawúlaay shwaay" },
            ],
            [
              { p: "ورکولی شوای", f: "wărkawúlay shwaay" },
              { p: "ورکولی شوی", f: "wărkawúlay shway" },
              { p: "ورکولای شوای", f: "wărkawúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکولی شوای", f: "wărkawúlay shwaay" },
              { p: "ورکولی شوی", f: "wărkawúlay shway" },
              { p: "ورکولای شوای", f: "wărkawúlaay shwaay" },
            ],
            [
              { p: "ورکولی شوای", f: "wărkawúlay shwaay" },
              { p: "ورکولی شوی", f: "wărkawúlay shway" },
              { p: "ورکولای شوای", f: "wărkawúlaay shwaay" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "ورکوی شوای", f: "wărkawáy shwaay" },
              { p: "ورکوی شوی", f: "wărkawáy shway" },
              { p: "ورکوای شوای", f: "wărkawáay shwaay" },
            ],
            [
              { p: "ورکوی شوای", f: "wărkawáy shwaay" },
              { p: "ورکوی شوی", f: "wărkawáy shway" },
              { p: "ورکوای شوای", f: "wărkawáay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکوی شوای", f: "wărkawáy shwaay" },
              { p: "ورکوی شوی", f: "wărkawáy shway" },
              { p: "ورکوای شوای", f: "wărkawáay shwaay" },
            ],
            [
              { p: "ورکوی شوای", f: "wărkawáy shwaay" },
              { p: "ورکوی شوی", f: "wărkawáy shway" },
              { p: "ورکوای شوای", f: "wărkawáay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکوی شوای", f: "wărkawáy shwaay" },
              { p: "ورکوی شوی", f: "wărkawáy shway" },
              { p: "ورکوای شوای", f: "wărkawáay shwaay" },
            ],
            [
              { p: "ورکوی شوای", f: "wărkawáy shwaay" },
              { p: "ورکوی شوی", f: "wărkawáy shway" },
              { p: "ورکوای شوای", f: "wărkawáay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکوی شوای", f: "wărkawáy shwaay" },
              { p: "ورکوی شوی", f: "wărkawáy shway" },
              { p: "ورکوای شوای", f: "wărkawáay shwaay" },
            ],
            [
              { p: "ورکوی شوای", f: "wărkawáy shwaay" },
              { p: "ورکوی شوی", f: "wărkawáy shway" },
              { p: "ورکوای شوای", f: "wărkawáay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکوی شوای", f: "wărkawáy shwaay" },
              { p: "ورکوی شوی", f: "wărkawáy shway" },
              { p: "ورکوای شوای", f: "wărkawáay shwaay" },
            ],
            [
              { p: "ورکوی شوای", f: "wărkawáy shwaay" },
              { p: "ورکوی شوی", f: "wărkawáy shway" },
              { p: "ورکوای شوای", f: "wărkawáay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکوی شوای", f: "wărkawáy shwaay" },
              { p: "ورکوی شوی", f: "wărkawáy shway" },
              { p: "ورکوای شوای", f: "wărkawáay shwaay" },
            ],
            [
              { p: "ورکوی شوای", f: "wărkawáy shwaay" },
              { p: "ورکوی شوی", f: "wărkawáy shway" },
              { p: "ورکوای شوای", f: "wărkawáay shwaay" },
            ],
          ],
        ],
      },
    },
  },
  perfective: {
    nonImperative: {
      long: [
        [[{ p: "ورکړم", f: "wărkRum" }], [{ p: "ورکړو", f: "wărkRoo" }]],
        [[{ p: "ورکړم", f: "wărkRum" }], [{ p: "ورکړو", f: "wărkRoo" }]],
        [[{ p: "ورکړې", f: "wărkRe" }], [{ p: "ورکړئ", f: "wărkRey" }]],
        [[{ p: "ورکړې", f: "wărkRe" }], [{ p: "ورکړئ", f: "wărkRey" }]],
        [[{ p: "ورکړي", f: "wărkRee" }], [{ p: "ورکړي", f: "wărkRee" }]],
        [[{ p: "ورکړي", f: "wărkRee" }], [{ p: "ورکړي", f: "wărkRee" }]],
      ],
      short: [
        [[{ p: "ورکم", f: "wărkum" }], [{ p: "ورکو", f: "wărkoo" }]],
        [[{ p: "ورکم", f: "wărkum" }], [{ p: "ورکو", f: "wărkoo" }]],
        [[{ p: "ورکې", f: "wărke" }], [{ p: "ورکئ", f: "wărkey" }]],
        [[{ p: "ورکې", f: "wărke" }], [{ p: "ورکئ", f: "wărkey" }]],
        [[{ p: "ورکي", f: "wărkee" }], [{ p: "ورکي", f: "wărkee" }]],
        [[{ p: "ورکي", f: "wărkee" }], [{ p: "ورکي", f: "wărkee" }]],
      ],
    },
    future: {
      long: [
        [
          [{ p: "به ورکړم", f: "ba wărkRum" }],
          [{ p: "به ورکړو", f: "ba wărkRoo" }],
        ],
        [
          [{ p: "به ورکړم", f: "ba wărkRum" }],
          [{ p: "به ورکړو", f: "ba wărkRoo" }],
        ],
        [
          [{ p: "به ورکړې", f: "ba wărkRe" }],
          [{ p: "به ورکړئ", f: "ba wărkRey" }],
        ],
        [
          [{ p: "به ورکړې", f: "ba wărkRe" }],
          [{ p: "به ورکړئ", f: "ba wărkRey" }],
        ],
        [
          [{ p: "به ورکړي", f: "ba wărkRee" }],
          [{ p: "به ورکړي", f: "ba wărkRee" }],
        ],
        [
          [{ p: "به ورکړي", f: "ba wărkRee" }],
          [{ p: "به ورکړي", f: "ba wărkRee" }],
        ],
      ],
      short: [
        [
          [{ p: "به ورکم", f: "ba wărkum" }],
          [{ p: "به ورکو", f: "ba wărkoo" }],
        ],
        [
          [{ p: "به ورکم", f: "ba wărkum" }],
          [{ p: "به ورکو", f: "ba wărkoo" }],
        ],
        [[{ p: "به ورکې", f: "ba wărke" }], [{ p: "به ورکئ", f: "ba wărkey" }]],
        [[{ p: "به ورکې", f: "ba wărke" }], [{ p: "به ورکئ", f: "ba wărkey" }]],
        [
          [{ p: "به ورکي", f: "ba wărkee" }],
          [{ p: "به ورکي", f: "ba wărkee" }],
        ],
        [
          [{ p: "به ورکي", f: "ba wărkee" }],
          [{ p: "به ورکي", f: "ba wărkee" }],
        ],
      ],
    },
    imperative: {
      long: [
        [[{ p: "ورکړه", f: "wărkRa" }], [{ p: "ورکړئ", f: "wărkRey" }]],
        [[{ p: "ورکړه", f: "wărkRa" }], [{ p: "ورکړئ", f: "wărkRey" }]],
      ],
      short: [
        [[{ p: "ورکه", f: "wărka" }], [{ p: "ورکئ", f: "wărkey" }]],
        [[{ p: "ورکه", f: "wărka" }], [{ p: "ورکئ", f: "wărkey" }]],
      ],
    },
    past: {
      mini: [
        [[{ p: "ورکم", f: "wărkum" }], [{ p: "ورکو", f: "wărkoo" }]],
        [[{ p: "ورکم", f: "wărkum" }], [{ p: "ورکو", f: "wărkoo" }]],
        [[{ p: "ورکې", f: "wărke" }], [{ p: "ورکئ", f: "wărkey" }]],
        [[{ p: "ورکې", f: "wărke" }], [{ p: "ورکئ", f: "wărkey" }]],
        [
          [
            { p: "ورکه", f: "wărku" },
            { p: "ورکو", f: "wărko" },
          ],
          [
            { p: "ورکړل", f: "wărkRul" },
            { p: "ورکو", f: "wărkoo" },
          ],
        ],
        [[{ p: "ورکه", f: "wărka" }], [{ p: "ورکې", f: "wărke" }]],
      ],
      short: [
        [[{ p: "ورکړم", f: "wărkRum" }], [{ p: "ورکړو", f: "wărkRoo" }]],
        [[{ p: "ورکړم", f: "wărkRum" }], [{ p: "ورکړو", f: "wărkRoo" }]],
        [[{ p: "ورکړې", f: "wărkRe" }], [{ p: "ورکړئ", f: "wărkRey" }]],
        [[{ p: "ورکړې", f: "wărkRe" }], [{ p: "ورکړئ", f: "wărkRey" }]],
        [
          [
            { p: "ورکړه", f: "wărkRu" },
            { p: "ورکړو", f: "wărkRo" },
            { p: "ورکړ", f: "wărkuR" },
          ],
          [
            { p: "ورکړل", f: "wărkRul" },
            { p: "ورکړو", f: "wărkRoo" },
          ],
        ],
        [[{ p: "ورکړه", f: "wărkRa" }], [{ p: "ورکړې", f: "wărkRe" }]],
      ],
      long: [
        [[{ p: "ورکړلم", f: "wărkRulum" }], [{ p: "ورکړلو", f: "wărkRuloo" }]],
        [[{ p: "ورکړلم", f: "wărkRulum" }], [{ p: "ورکړلو", f: "wărkRuloo" }]],
        [[{ p: "ورکړلې", f: "wărkRule" }], [{ p: "ورکړلئ", f: "wărkRuley" }]],
        [[{ p: "ورکړلې", f: "wărkRule" }], [{ p: "ورکړلئ", f: "wărkRuley" }]],
        [
          [{ p: "ورکړلو", f: "wărkRulo" }],
          [
            { p: "ورکړل", f: "wărkRul" },
            { p: "ورکړلو", f: "wărkRuloo" },
          ],
        ],
        [[{ p: "ورکړله", f: "wărkRula" }], [{ p: "ورکړلې", f: "wărkRule" }]],
      ],
    },
    habitualPast: {
      mini: [
        [
          [{ p: "به ورکم", f: "ba wărkum" }],
          [{ p: "به ورکو", f: "ba wărkoo" }],
        ],
        [
          [{ p: "به ورکم", f: "ba wărkum" }],
          [{ p: "به ورکو", f: "ba wărkoo" }],
        ],
        [[{ p: "به ورکې", f: "ba wărke" }], [{ p: "به ورکئ", f: "ba wărkey" }]],
        [[{ p: "به ورکې", f: "ba wărke" }], [{ p: "به ورکئ", f: "ba wărkey" }]],
        [
          [
            { p: "به ورکه", f: "ba wărku" },
            { p: "به ورکو", f: "ba wărko" },
          ],
          [
            { p: "به ورکړل", f: "ba wărkRul" },
            { p: "به ورکو", f: "ba wărkoo" },
          ],
        ],
        [[{ p: "به ورکه", f: "ba wărka" }], [{ p: "به ورکې", f: "ba wărke" }]],
      ],
      short: [
        [
          [{ p: "به ورکړم", f: "ba wărkRum" }],
          [{ p: "به ورکړو", f: "ba wărkRoo" }],
        ],
        [
          [{ p: "به ورکړم", f: "ba wărkRum" }],
          [{ p: "به ورکړو", f: "ba wărkRoo" }],
        ],
        [
          [{ p: "به ورکړې", f: "ba wărkRe" }],
          [{ p: "به ورکړئ", f: "ba wărkRey" }],
        ],
        [
          [{ p: "به ورکړې", f: "ba wărkRe" }],
          [{ p: "به ورکړئ", f: "ba wărkRey" }],
        ],
        [
          [
            { p: "به ورکړه", f: "ba wărkRu" },
            { p: "به ورکړو", f: "ba wărkRo" },
            { p: "به ورکړ", f: "ba wărkuR" },
          ],
          [
            { p: "به ورکړل", f: "ba wărkRul" },
            { p: "به ورکړو", f: "ba wărkRoo" },
          ],
        ],
        [
          [{ p: "به ورکړه", f: "ba wărkRa" }],
          [{ p: "به ورکړې", f: "ba wărkRe" }],
        ],
      ],
      long: [
        [
          [{ p: "به ورکړلم", f: "ba wărkRulum" }],
          [{ p: "به ورکړلو", f: "ba wărkRuloo" }],
        ],
        [
          [{ p: "به ورکړلم", f: "ba wărkRulum" }],
          [{ p: "به ورکړلو", f: "ba wărkRuloo" }],
        ],
        [
          [{ p: "به ورکړلې", f: "ba wărkRule" }],
          [{ p: "به ورکړلئ", f: "ba wărkRuley" }],
        ],
        [
          [{ p: "به ورکړلې", f: "ba wărkRule" }],
          [{ p: "به ورکړلئ", f: "ba wărkRuley" }],
        ],
        [
          [{ p: "به ورکړلو", f: "ba wărkRulo" }],
          [
            { p: "به ورکړل", f: "ba wărkRul" },
            { p: "به ورکړلو", f: "ba wărkRuloo" },
          ],
        ],
        [
          [{ p: "به ورکړله", f: "ba wărkRula" }],
          [{ p: "به ورکړلې", f: "ba wărkRule" }],
        ],
      ],
    },
    modal: {
      nonImperative: {
        long: [
          [
            [
              { p: "ورکړلی شم", f: "wărkRulay shum" },
              { p: "ورکړلای شم", f: "wărkRulaay shum" },
            ],
            [
              { p: "ورکړلی شو", f: "wărkRulay shoo" },
              { p: "ورکړلای شو", f: "wărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "ورکړلی شم", f: "wărkRulay shum" },
              { p: "ورکړلای شم", f: "wărkRulaay shum" },
            ],
            [
              { p: "ورکړلی شو", f: "wărkRulay shoo" },
              { p: "ورکړلای شو", f: "wărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "ورکړلی شې", f: "wărkRulay she" },
              { p: "ورکړلای شې", f: "wărkRulaay she" },
            ],
            [
              { p: "ورکړلی شئ", f: "wărkRulay shey" },
              { p: "ورکړلای شئ", f: "wărkRulaay shey" },
            ],
          ],
          [
            [
              { p: "ورکړلی شې", f: "wărkRulay she" },
              { p: "ورکړلای شې", f: "wărkRulaay she" },
            ],
            [
              { p: "ورکړلی شئ", f: "wărkRulay shey" },
              { p: "ورکړلای شئ", f: "wărkRulaay shey" },
            ],
          ],
          [
            [
              { p: "ورکړلی شي", f: "wărkRulay shee" },
              { p: "ورکړلای شي", f: "wărkRulaay shee" },
            ],
            [
              { p: "ورکړلی شي", f: "wărkRulay shee" },
              { p: "ورکړلای شي", f: "wărkRulaay shee" },
            ],
          ],
          [
            [
              { p: "ورکړلی شي", f: "wărkRulay shee" },
              { p: "ورکړلای شي", f: "wărkRulaay shee" },
            ],
            [
              { p: "ورکړلی شي", f: "wărkRulay shee" },
              { p: "ورکړلای شي", f: "wărkRulaay shee" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "ورکړی شم", f: "wărkRay shum" },
              { p: "ورکړای شم", f: "wărkRáay shum" },
            ],
            [
              { p: "ورکړی شو", f: "wărkRay shoo" },
              { p: "ورکړای شو", f: "wărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "ورکړی شم", f: "wărkRay shum" },
              { p: "ورکړای شم", f: "wărkRáay shum" },
            ],
            [
              { p: "ورکړی شو", f: "wărkRay shoo" },
              { p: "ورکړای شو", f: "wărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "ورکړی شې", f: "wărkRay she" },
              { p: "ورکړای شې", f: "wărkRáay she" },
            ],
            [
              { p: "ورکړی شئ", f: "wărkRay shey" },
              { p: "ورکړای شئ", f: "wărkRáay shey" },
            ],
          ],
          [
            [
              { p: "ورکړی شې", f: "wărkRay she" },
              { p: "ورکړای شې", f: "wărkRáay she" },
            ],
            [
              { p: "ورکړی شئ", f: "wărkRay shey" },
              { p: "ورکړای شئ", f: "wărkRáay shey" },
            ],
          ],
          [
            [
              { p: "ورکړی شي", f: "wărkRay shee" },
              { p: "ورکړای شي", f: "wărkRáay shee" },
            ],
            [
              { p: "ورکړی شي", f: "wărkRay shee" },
              { p: "ورکړای شي", f: "wărkRáay shee" },
            ],
          ],
          [
            [
              { p: "ورکړی شي", f: "wărkRay shee" },
              { p: "ورکړای شي", f: "wărkRáay shee" },
            ],
            [
              { p: "ورکړی شي", f: "wărkRay shee" },
              { p: "ورکړای شي", f: "wărkRáay shee" },
            ],
          ],
        ],
      },
      future: {
        long: [
          [
            [
              { p: "به ورکړلی شم", f: "ba wărkRulay shum" },
              { p: "به ورکړلای شم", f: "ba wărkRulaay shum" },
            ],
            [
              { p: "به ورکړلی شو", f: "ba wărkRulay shoo" },
              { p: "به ورکړلای شو", f: "ba wărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکړلی شم", f: "ba wărkRulay shum" },
              { p: "به ورکړلای شم", f: "ba wărkRulaay shum" },
            ],
            [
              { p: "به ورکړلی شو", f: "ba wărkRulay shoo" },
              { p: "به ورکړلای شو", f: "ba wărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکړلی شې", f: "ba wărkRulay she" },
              { p: "به ورکړلای شې", f: "ba wărkRulaay she" },
            ],
            [
              { p: "به ورکړلی شئ", f: "ba wărkRulay shey" },
              { p: "به ورکړلای شئ", f: "ba wărkRulaay shey" },
            ],
          ],
          [
            [
              { p: "به ورکړلی شې", f: "ba wărkRulay she" },
              { p: "به ورکړلای شې", f: "ba wărkRulaay she" },
            ],
            [
              { p: "به ورکړلی شئ", f: "ba wărkRulay shey" },
              { p: "به ورکړلای شئ", f: "ba wărkRulaay shey" },
            ],
          ],
          [
            [
              { p: "به ورکړلی شي", f: "ba wărkRulay shee" },
              { p: "به ورکړلای شي", f: "ba wărkRulaay shee" },
            ],
            [
              { p: "به ورکړلی شي", f: "ba wărkRulay shee" },
              { p: "به ورکړلای شي", f: "ba wărkRulaay shee" },
            ],
          ],
          [
            [
              { p: "به ورکړلی شي", f: "ba wărkRulay shee" },
              { p: "به ورکړلای شي", f: "ba wărkRulaay shee" },
            ],
            [
              { p: "به ورکړلی شي", f: "ba wărkRulay shee" },
              { p: "به ورکړلای شي", f: "ba wărkRulaay shee" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "به ورکړی شم", f: "ba wărkRay shum" },
              { p: "به ورکړای شم", f: "ba wărkRáay shum" },
            ],
            [
              { p: "به ورکړی شو", f: "ba wărkRay shoo" },
              { p: "به ورکړای شو", f: "ba wărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکړی شم", f: "ba wărkRay shum" },
              { p: "به ورکړای شم", f: "ba wărkRáay shum" },
            ],
            [
              { p: "به ورکړی شو", f: "ba wărkRay shoo" },
              { p: "به ورکړای شو", f: "ba wărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکړی شې", f: "ba wărkRay she" },
              { p: "به ورکړای شې", f: "ba wărkRáay she" },
            ],
            [
              { p: "به ورکړی شئ", f: "ba wărkRay shey" },
              { p: "به ورکړای شئ", f: "ba wărkRáay shey" },
            ],
          ],
          [
            [
              { p: "به ورکړی شې", f: "ba wărkRay she" },
              { p: "به ورکړای شې", f: "ba wărkRáay she" },
            ],
            [
              { p: "به ورکړی شئ", f: "ba wărkRay shey" },
              { p: "به ورکړای شئ", f: "ba wărkRáay shey" },
            ],
          ],
          [
            [
              { p: "به ورکړی شي", f: "ba wărkRay shee" },
              { p: "به ورکړای شي", f: "ba wărkRáay shee" },
            ],
            [
              { p: "به ورکړی شي", f: "ba wărkRay shee" },
              { p: "به ورکړای شي", f: "ba wărkRáay shee" },
            ],
          ],
          [
            [
              { p: "به ورکړی شي", f: "ba wărkRay shee" },
              { p: "به ورکړای شي", f: "ba wărkRáay shee" },
            ],
            [
              { p: "به ورکړی شي", f: "ba wărkRay shee" },
              { p: "به ورکړای شي", f: "ba wărkRáay shee" },
            ],
          ],
        ],
      },
      past: {
        long: [
          [
            [
              { p: "ورکړلی شوم", f: "wărkRulay shwum" },
              { p: "ورکړلای شوم", f: "wărkRulaay shwum" },
            ],
            [
              { p: "ورکړلی شو", f: "wărkRulay shoo" },
              { p: "ورکړلای شو", f: "wărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "ورکړلی شوم", f: "wărkRulay shwum" },
              { p: "ورکړلای شوم", f: "wărkRulaay shwum" },
            ],
            [
              { p: "ورکړلی شو", f: "wărkRulay shoo" },
              { p: "ورکړلای شو", f: "wărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "ورکړلی شوې", f: "wărkRulay shwe" },
              { p: "ورکړلای شوې", f: "wărkRulaay shwe" },
            ],
            [
              { p: "ورکړلی شوئ", f: "wărkRulay shwey" },
              { p: "ورکړلای شوئ", f: "wărkRulaay shwey" },
            ],
          ],
          [
            [
              { p: "ورکړلی شوې", f: "wărkRulay shwe" },
              { p: "ورکړلای شوې", f: "wărkRulaay shwe" },
            ],
            [
              { p: "ورکړلی شوئ", f: "wărkRulay shwey" },
              { p: "ورکړلای شوئ", f: "wărkRulaay shwey" },
            ],
          ],
          [
            [
              { p: "ورکړلی شو", f: "wărkRulay sho" },
              { p: "ورکړلای شو", f: "wărkRulaay sho" },
            ],
            [
              { p: "ورکړلی شول", f: "wărkRulay shwul" },
              { p: "ورکړلای شول", f: "wărkRulaay shwul" },
              { p: "ورکړلی شو", f: "wărkRulay shoo" },
              { p: "ورکړلای شو", f: "wărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "ورکړلی شوه", f: "wărkRulay shwa" },
              { p: "ورکړلای شوه", f: "wărkRulaay shwa" },
            ],
            [
              { p: "ورکړلی شولې", f: "wărkRulay shwule" },
              { p: "ورکړلای شولې", f: "wărkRulaay shwule" },
              { p: "ورکړلی شوې", f: "wărkRulay shwe" },
              { p: "ورکړلای شوې", f: "wărkRulaay shwe" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "ورکړی شوم", f: "wărkRay shwum" },
              { p: "ورکړای شوم", f: "wărkRáay shwum" },
            ],
            [
              { p: "ورکړی شو", f: "wărkRay shoo" },
              { p: "ورکړای شو", f: "wărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "ورکړی شوم", f: "wărkRay shwum" },
              { p: "ورکړای شوم", f: "wărkRáay shwum" },
            ],
            [
              { p: "ورکړی شو", f: "wărkRay shoo" },
              { p: "ورکړای شو", f: "wărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "ورکړی شوې", f: "wărkRay shwe" },
              { p: "ورکړای شوې", f: "wărkRáay shwe" },
            ],
            [
              { p: "ورکړی شوئ", f: "wărkRay shwey" },
              { p: "ورکړای شوئ", f: "wărkRáay shwey" },
            ],
          ],
          [
            [
              { p: "ورکړی شوې", f: "wărkRay shwe" },
              { p: "ورکړای شوې", f: "wărkRáay shwe" },
            ],
            [
              { p: "ورکړی شوئ", f: "wărkRay shwey" },
              { p: "ورکړای شوئ", f: "wărkRáay shwey" },
            ],
          ],
          [
            [
              { p: "ورکړی شو", f: "wărkRay sho" },
              { p: "ورکړای شو", f: "wărkRáay sho" },
            ],
            [
              { p: "ورکړی شول", f: "wărkRay shwul" },
              { p: "ورکړای شول", f: "wărkRáay shwul" },
              { p: "ورکړی شو", f: "wărkRay shoo" },
              { p: "ورکړای شو", f: "wărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "ورکړی شوه", f: "wărkRay shwa" },
              { p: "ورکړای شوه", f: "wărkRáay shwa" },
            ],
            [
              { p: "ورکړی شولې", f: "wărkRay shwule" },
              { p: "ورکړای شولې", f: "wărkRáay shwule" },
              { p: "ورکړی شوې", f: "wărkRay shwe" },
              { p: "ورکړای شوې", f: "wărkRáay shwe" },
            ],
          ],
        ],
      },
      habitualPast: {
        long: [
          [
            [
              { p: "به ورکړلی شوم", f: "ba wărkRulay shwum" },
              { p: "به ورکړلای شوم", f: "ba wărkRulaay shwum" },
            ],
            [
              { p: "به ورکړلی شو", f: "ba wărkRulay shoo" },
              { p: "به ورکړلای شو", f: "ba wărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکړلی شوم", f: "ba wărkRulay shwum" },
              { p: "به ورکړلای شوم", f: "ba wărkRulaay shwum" },
            ],
            [
              { p: "به ورکړلی شو", f: "ba wărkRulay shoo" },
              { p: "به ورکړلای شو", f: "ba wărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکړلی شوې", f: "ba wărkRulay shwe" },
              { p: "به ورکړلای شوې", f: "ba wărkRulaay shwe" },
            ],
            [
              { p: "به ورکړلی شوئ", f: "ba wărkRulay shwey" },
              { p: "به ورکړلای شوئ", f: "ba wărkRulaay shwey" },
            ],
          ],
          [
            [
              { p: "به ورکړلی شوې", f: "ba wărkRulay shwe" },
              { p: "به ورکړلای شوې", f: "ba wărkRulaay shwe" },
            ],
            [
              { p: "به ورکړلی شوئ", f: "ba wărkRulay shwey" },
              { p: "به ورکړلای شوئ", f: "ba wărkRulaay shwey" },
            ],
          ],
          [
            [
              { p: "به ورکړلی شو", f: "ba wărkRulay sho" },
              { p: "به ورکړلای شو", f: "ba wărkRulaay sho" },
            ],
            [
              { p: "به ورکړلی شول", f: "ba wărkRulay shwul" },
              { p: "به ورکړلای شول", f: "ba wărkRulaay shwul" },
              { p: "به ورکړلی شو", f: "ba wărkRulay shoo" },
              { p: "به ورکړلای شو", f: "ba wărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکړلی شوه", f: "ba wărkRulay shwa" },
              { p: "به ورکړلای شوه", f: "ba wărkRulaay shwa" },
            ],
            [
              { p: "به ورکړلی شولې", f: "ba wărkRulay shwule" },
              { p: "به ورکړلای شولې", f: "ba wărkRulaay shwule" },
              { p: "به ورکړلی شوې", f: "ba wărkRulay shwe" },
              { p: "به ورکړلای شوې", f: "ba wărkRulaay shwe" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "به ورکړی شوم", f: "ba wărkRay shwum" },
              { p: "به ورکړای شوم", f: "ba wărkRáay shwum" },
            ],
            [
              { p: "به ورکړی شو", f: "ba wărkRay shoo" },
              { p: "به ورکړای شو", f: "ba wărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکړی شوم", f: "ba wărkRay shwum" },
              { p: "به ورکړای شوم", f: "ba wărkRáay shwum" },
            ],
            [
              { p: "به ورکړی شو", f: "ba wărkRay shoo" },
              { p: "به ورکړای شو", f: "ba wărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکړی شوې", f: "ba wărkRay shwe" },
              { p: "به ورکړای شوې", f: "ba wărkRáay shwe" },
            ],
            [
              { p: "به ورکړی شوئ", f: "ba wărkRay shwey" },
              { p: "به ورکړای شوئ", f: "ba wărkRáay shwey" },
            ],
          ],
          [
            [
              { p: "به ورکړی شوې", f: "ba wărkRay shwe" },
              { p: "به ورکړای شوې", f: "ba wărkRáay shwe" },
            ],
            [
              { p: "به ورکړی شوئ", f: "ba wărkRay shwey" },
              { p: "به ورکړای شوئ", f: "ba wărkRáay shwey" },
            ],
          ],
          [
            [
              { p: "به ورکړی شو", f: "ba wărkRay sho" },
              { p: "به ورکړای شو", f: "ba wărkRáay sho" },
            ],
            [
              { p: "به ورکړی شول", f: "ba wărkRay shwul" },
              { p: "به ورکړای شول", f: "ba wărkRáay shwul" },
              { p: "به ورکړی شو", f: "ba wărkRay shoo" },
              { p: "به ورکړای شو", f: "ba wărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "به ورکړی شوه", f: "ba wărkRay shwa" },
              { p: "به ورکړای شوه", f: "ba wărkRáay shwa" },
            ],
            [
              { p: "به ورکړی شولې", f: "ba wărkRay shwule" },
              { p: "به ورکړای شولې", f: "ba wărkRáay shwule" },
              { p: "به ورکړی شوې", f: "ba wărkRay shwe" },
              { p: "به ورکړای شوې", f: "ba wărkRáay shwe" },
            ],
          ],
        ],
      },
      hypotheticalPast: {
        long: [
          [
            [
              { p: "ورکړلی شوای", f: "wărkRulay shwaay" },
              { p: "ورکړلی شوی", f: "wărkRulay shway" },
              { p: "ورکړلای شوای", f: "wărkRulaay shwaay" },
            ],
            [
              { p: "ورکړلی شوای", f: "wărkRulay shwaay" },
              { p: "ورکړلی شوی", f: "wărkRulay shway" },
              { p: "ورکړلای شوای", f: "wărkRulaay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکړلی شوای", f: "wărkRulay shwaay" },
              { p: "ورکړلی شوی", f: "wărkRulay shway" },
              { p: "ورکړلای شوای", f: "wărkRulaay shwaay" },
            ],
            [
              { p: "ورکړلی شوای", f: "wărkRulay shwaay" },
              { p: "ورکړلی شوی", f: "wărkRulay shway" },
              { p: "ورکړلای شوای", f: "wărkRulaay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکړلی شوای", f: "wărkRulay shwaay" },
              { p: "ورکړلی شوی", f: "wărkRulay shway" },
              { p: "ورکړلای شوای", f: "wărkRulaay shwaay" },
            ],
            [
              { p: "ورکړلی شوای", f: "wărkRulay shwaay" },
              { p: "ورکړلی شوی", f: "wărkRulay shway" },
              { p: "ورکړلای شوای", f: "wărkRulaay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکړلی شوای", f: "wărkRulay shwaay" },
              { p: "ورکړلی شوی", f: "wărkRulay shway" },
              { p: "ورکړلای شوای", f: "wărkRulaay shwaay" },
            ],
            [
              { p: "ورکړلی شوای", f: "wărkRulay shwaay" },
              { p: "ورکړلی شوی", f: "wărkRulay shway" },
              { p: "ورکړلای شوای", f: "wărkRulaay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکړلی شوای", f: "wărkRulay shwaay" },
              { p: "ورکړلی شوی", f: "wărkRulay shway" },
              { p: "ورکړلای شوای", f: "wărkRulaay shwaay" },
            ],
            [
              { p: "ورکړلی شوای", f: "wărkRulay shwaay" },
              { p: "ورکړلی شوی", f: "wărkRulay shway" },
              { p: "ورکړلای شوای", f: "wărkRulaay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکړلی شوای", f: "wărkRulay shwaay" },
              { p: "ورکړلی شوی", f: "wărkRulay shway" },
              { p: "ورکړلای شوای", f: "wărkRulaay shwaay" },
            ],
            [
              { p: "ورکړلی شوای", f: "wărkRulay shwaay" },
              { p: "ورکړلی شوی", f: "wărkRulay shway" },
              { p: "ورکړلای شوای", f: "wărkRulaay shwaay" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "ورکړی شوای", f: "wărkRay shwaay" },
              { p: "ورکړی شوی", f: "wărkRay shway" },
              { p: "ورکړای شوای", f: "wărkRáay shwaay" },
            ],
            [
              { p: "ورکړی شوای", f: "wărkRay shwaay" },
              { p: "ورکړی شوی", f: "wărkRay shway" },
              { p: "ورکړای شوای", f: "wărkRáay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکړی شوای", f: "wărkRay shwaay" },
              { p: "ورکړی شوی", f: "wărkRay shway" },
              { p: "ورکړای شوای", f: "wărkRáay shwaay" },
            ],
            [
              { p: "ورکړی شوای", f: "wărkRay shwaay" },
              { p: "ورکړی شوی", f: "wărkRay shway" },
              { p: "ورکړای شوای", f: "wărkRáay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکړی شوای", f: "wărkRay shwaay" },
              { p: "ورکړی شوی", f: "wărkRay shway" },
              { p: "ورکړای شوای", f: "wărkRáay shwaay" },
            ],
            [
              { p: "ورکړی شوای", f: "wărkRay shwaay" },
              { p: "ورکړی شوی", f: "wărkRay shway" },
              { p: "ورکړای شوای", f: "wărkRáay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکړی شوای", f: "wărkRay shwaay" },
              { p: "ورکړی شوی", f: "wărkRay shway" },
              { p: "ورکړای شوای", f: "wărkRáay shwaay" },
            ],
            [
              { p: "ورکړی شوای", f: "wărkRay shwaay" },
              { p: "ورکړی شوی", f: "wărkRay shway" },
              { p: "ورکړای شوای", f: "wărkRáay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکړی شوای", f: "wărkRay shwaay" },
              { p: "ورکړی شوی", f: "wărkRay shway" },
              { p: "ورکړای شوای", f: "wărkRáay shwaay" },
            ],
            [
              { p: "ورکړی شوای", f: "wărkRay shwaay" },
              { p: "ورکړی شوی", f: "wărkRay shway" },
              { p: "ورکړای شوای", f: "wărkRáay shwaay" },
            ],
          ],
          [
            [
              { p: "ورکړی شوای", f: "wărkRay shwaay" },
              { p: "ورکړی شوی", f: "wărkRay shway" },
              { p: "ورکړای شوای", f: "wărkRáay shwaay" },
            ],
            [
              { p: "ورکړی شوای", f: "wărkRay shwaay" },
              { p: "ورکړی شوی", f: "wărkRay shway" },
              { p: "ورکړای شوای", f: "wărkRáay shwaay" },
            ],
          ],
        ],
      },
    },
  },
  hypothetical: {
    short: [
      [
        [
          { p: "ورکوی", f: "wărkawáy" },
          { p: "ورکوای", f: "wărkawáay" },
        ],
        [
          { p: "ورکوی", f: "wărkawáy" },
          { p: "ورکوای", f: "wărkawáay" },
        ],
      ],
      [
        [
          { p: "ورکوی", f: "wărkawáy" },
          { p: "ورکوای", f: "wărkawáay" },
        ],
        [
          { p: "ورکوی", f: "wărkawáy" },
          { p: "ورکوای", f: "wărkawáay" },
        ],
      ],
      [
        [
          { p: "ورکوی", f: "wărkawáy" },
          { p: "ورکوای", f: "wărkawáay" },
        ],
        [
          { p: "ورکوی", f: "wărkawáy" },
          { p: "ورکوای", f: "wărkawáay" },
        ],
      ],
      [
        [
          { p: "ورکوی", f: "wărkawáy" },
          { p: "ورکوای", f: "wărkawáay" },
        ],
        [
          { p: "ورکوی", f: "wărkawáy" },
          { p: "ورکوای", f: "wărkawáay" },
        ],
      ],
      [
        [
          { p: "ورکوی", f: "wărkawáy" },
          { p: "ورکوای", f: "wărkawáay" },
        ],
        [
          { p: "ورکوی", f: "wărkawáy" },
          { p: "ورکوای", f: "wărkawáay" },
        ],
      ],
      [
        [
          { p: "ورکوی", f: "wărkawáy" },
          { p: "ورکوای", f: "wărkawáay" },
        ],
        [
          { p: "ورکوی", f: "wărkawáy" },
          { p: "ورکوای", f: "wărkawáay" },
        ],
      ],
    ],
    long: [
      [
        [
          { p: "ورکولی", f: "wărkawúlay" },
          { p: "ورکولای", f: "wărkawúlaay" },
        ],
        [
          { p: "ورکولی", f: "wărkawúlay" },
          { p: "ورکولای", f: "wărkawúlaay" },
        ],
      ],
      [
        [
          { p: "ورکولی", f: "wărkawúlay" },
          { p: "ورکولای", f: "wărkawúlaay" },
        ],
        [
          { p: "ورکولی", f: "wărkawúlay" },
          { p: "ورکولای", f: "wărkawúlaay" },
        ],
      ],
      [
        [
          { p: "ورکولی", f: "wărkawúlay" },
          { p: "ورکولای", f: "wărkawúlaay" },
        ],
        [
          { p: "ورکولی", f: "wărkawúlay" },
          { p: "ورکولای", f: "wărkawúlaay" },
        ],
      ],
      [
        [
          { p: "ورکولی", f: "wărkawúlay" },
          { p: "ورکولای", f: "wărkawúlaay" },
        ],
        [
          { p: "ورکولی", f: "wărkawúlay" },
          { p: "ورکولای", f: "wărkawúlaay" },
        ],
      ],
      [
        [
          { p: "ورکولی", f: "wărkawúlay" },
          { p: "ورکولای", f: "wărkawúlaay" },
        ],
        [
          { p: "ورکولی", f: "wărkawúlay" },
          { p: "ورکولای", f: "wărkawúlaay" },
        ],
      ],
      [
        [
          { p: "ورکولی", f: "wărkawúlay" },
          { p: "ورکولای", f: "wărkawúlaay" },
        ],
        [
          { p: "ورکولی", f: "wărkawúlay" },
          { p: "ورکولای", f: "wărkawúlaay" },
        ],
      ],
    ],
  },
  participle: {
    past: {
      masc: [
        [{ p: "ورکړی", f: "wărkúRay" }],
        [{ p: "ورکړي", f: "wărkúRee" }],
        [
          { p: "ورکړیو", f: "wărkúRiyo" },
          { p: "ورکړو", f: "wărkúRo" },
        ],
      ],
      fem: [
        [{ p: "ورکړې", f: "wărkúRe" }],
        [{ p: "ورکړې", f: "wărkúRe" }],
        [{ p: "ورکړو", f: "wărkúRo" }],
      ],
    },
    present: {
      masc: [
        [{ p: "ورکوونکی", f: "wărkawóonkay" }],
        [{ p: "ورکوونکي", f: "wărkawóonkee" }],
        [
          { p: "ورکوونکیو", f: "wărkawóonkiyo" },
          { p: "ورکوونکو", f: "wărkedóonko" },
        ],
      ],
      fem: [
        [{ p: "ورکوونکې", f: "wărkawóonke" }],
        [{ p: "ورکوونکې", f: "wărkawóonke" }],
        [{ p: "ورکوونکو", f: "wărkawóonko" }],
      ],
    },
  },
  perfect: {
    halfPerfect: [
      [[{ p: "ورکړی", f: "wărkúRay" }], [{ p: "ورکړي", f: "wărkúRee" }]],
      [[{ p: "ورکړې", f: "wărkúRe" }], [{ p: "ورکړې", f: "wărkúRe" }]],
      [[{ p: "ورکړی", f: "wărkúRay" }], [{ p: "ورکړي", f: "wărkúRee" }]],
      [[{ p: "ورکړې", f: "wărkúRe" }], [{ p: "ورکړې", f: "wărkúRe" }]],
      [[{ p: "ورکړی", f: "wărkúRay" }], [{ p: "ورکړي", f: "wărkúRee" }]],
      [[{ p: "ورکړې", f: "wărkúRe" }], [{ p: "ورکړې", f: "wărkúRe" }]],
    ],
    past: [
      [
        [{ p: "ورکړی وم", f: "wărkúRay wum" }],
        [{ p: "ورکړي وو", f: "wărkúRee woo" }],
      ],
      [
        [{ p: "ورکړې وم", f: "wărkúRe wum" }],
        [{ p: "ورکړې وو", f: "wărkúRe woo" }],
      ],
      [
        [{ p: "ورکړی وې", f: "wărkúRay we" }],
        [{ p: "ورکړي وئ", f: "wărkúRee wey" }],
      ],
      [
        [{ p: "ورکړې وې", f: "wărkúRe we" }],
        [{ p: "ورکړې وئ", f: "wărkúRe wey" }],
      ],
      [
        [{ p: "ورکړی و", f: "wărkúRay wo" }],
        [{ p: "ورکړي وو", f: "wărkúRee woo" }],
      ],
      [
        [{ p: "ورکړې وه", f: "wărkúRe wa" }],
        [{ p: "ورکړې وې", f: "wărkúRe we" }],
      ],
    ],
    present: [
      [
        [{ p: "ورکړی یم", f: "wărkúRay yum" }],
        [{ p: "ورکړي یو", f: "wărkúRee yoo" }],
      ],
      [
        [{ p: "ورکړې یم", f: "wărkúRe yum" }],
        [{ p: "ورکړې یو", f: "wărkúRe yoo" }],
      ],
      [
        [{ p: "ورکړی یې", f: "wărkúRay ye" }],
        [{ p: "ورکړي یئ", f: "wărkúRee yey" }],
      ],
      [
        [{ p: "ورکړې یې", f: "wărkúRe ye" }],
        [{ p: "ورکړې یئ", f: "wărkúRe yey" }],
      ],
      [
        [{ p: "ورکړی دی", f: "wărkúRay day" }],
        [{ p: "ورکړي دي", f: "wărkúRee dee" }],
      ],
      [
        [{ p: "ورکړې ده", f: "wărkúRe da" }],
        [{ p: "ورکړې دي", f: "wărkúRe dee" }],
      ],
    ],
    habitual: [
      [
        [{ p: "ورکړی یم", f: "wărkúRay yum" }],
        [{ p: "ورکړي یو", f: "wărkúRee yoo" }],
      ],
      [
        [{ p: "ورکړې یم", f: "wărkúRe yum" }],
        [{ p: "ورکړې یو", f: "wărkúRe yoo" }],
      ],
      [
        [{ p: "ورکړی یې", f: "wărkúRay ye" }],
        [{ p: "ورکړي یئ", f: "wărkúRee yey" }],
      ],
      [
        [{ p: "ورکړې یې", f: "wărkúRe ye" }],
        [{ p: "ورکړې یئ", f: "wărkúRe yey" }],
      ],
      [
        [{ p: "ورکړی وي", f: "wărkúRay wee" }],
        [{ p: "ورکړي وي", f: "wărkúRee wee" }],
      ],
      [
        [{ p: "ورکړې وي", f: "wărkúRe wee" }],
        [{ p: "ورکړې وي", f: "wărkúRe wee" }],
      ],
    ],
    subjunctive: [
      [
        [{ p: "ورکړی وم", f: "wărkúRay wum" }],
        [{ p: "ورکړي وو", f: "wărkúRee woo" }],
      ],
      [
        [{ p: "ورکړې وم", f: "wărkúRe wum" }],
        [{ p: "ورکړې وو", f: "wărkúRe woo" }],
      ],
      [
        [{ p: "ورکړی وې", f: "wărkúRay we" }],
        [{ p: "ورکړي وئ", f: "wărkúRee wey" }],
      ],
      [
        [{ p: "ورکړې وې", f: "wărkúRe we" }],
        [{ p: "ورکړې وئ", f: "wărkúRe wey" }],
      ],
      [
        [{ p: "ورکړی وي", f: "wărkúRay wee" }],
        [{ p: "ورکړي وي", f: "wărkúRee wee" }],
      ],
      [
        [{ p: "ورکړې وي", f: "wărkúRe wee" }],
        [{ p: "ورکړې وي", f: "wărkúRe wee" }],
      ],
    ],
    future: [
      [
        [{ p: "به ورکړی یم", f: "ba wărkúRay yum" }],
        [{ p: "به ورکړي یو", f: "ba wărkúRee yoo" }],
      ],
      [
        [{ p: "به ورکړې یم", f: "ba wărkúRe yum" }],
        [{ p: "به ورکړې یو", f: "ba wărkúRe yoo" }],
      ],
      [
        [{ p: "به ورکړی یې", f: "ba wărkúRay ye" }],
        [{ p: "به ورکړي یئ", f: "ba wărkúRee yey" }],
      ],
      [
        [{ p: "به ورکړې یې", f: "ba wărkúRe ye" }],
        [{ p: "به ورکړې یئ", f: "ba wărkúRe yey" }],
      ],
      [
        [{ p: "به ورکړی وي", f: "ba wărkúRay wee" }],
        [{ p: "به ورکړي وي", f: "ba wărkúRee wee" }],
      ],
      [
        [{ p: "به ورکړې وي", f: "ba wărkúRe wee" }],
        [{ p: "به ورکړې وي", f: "ba wărkúRe wee" }],
      ],
    ],
    wouldBe: [
      [
        [{ p: "به ورکړی وم", f: "ba wărkúRay wum" }],
        [{ p: "به ورکړي وو", f: "ba wărkúRee woo" }],
      ],
      [
        [{ p: "به ورکړې وم", f: "ba wărkúRe wum" }],
        [{ p: "به ورکړې وو", f: "ba wărkúRe woo" }],
      ],
      [
        [{ p: "به ورکړی وې", f: "ba wărkúRay we" }],
        [{ p: "به ورکړي وئ", f: "ba wărkúRee wey" }],
      ],
      [
        [{ p: "به ورکړې وې", f: "ba wărkúRe we" }],
        [{ p: "به ورکړې وئ", f: "ba wărkúRe wey" }],
      ],
      [
        [{ p: "به ورکړی و", f: "ba wărkúRay wo" }],
        [{ p: "به ورکړي وو", f: "ba wărkúRee woo" }],
      ],
      [
        [{ p: "به ورکړې وه", f: "ba wărkúRe wa" }],
        [{ p: "به ورکړې وې", f: "ba wărkúRe we" }],
      ],
    ],
    pastSubjunctive: [
      [
        [
          { p: "ورکړی وای", f: "wărkúRay waay" },
          { p: "ورکړی وی", f: "wărkúRay way" },
        ],
        [
          { p: "ورکړی وای", f: "wărkúRay waay" },
          { p: "ورکړی وی", f: "wărkúRay way" },
        ],
      ],
      [
        [
          { p: "ورکړې وای", f: "wărkúRe waay" },
          { p: "ورکړې وی", f: "wărkúRe way" },
        ],
        [
          { p: "ورکړې وای", f: "wărkúRe waay" },
          { p: "ورکړې وی", f: "wărkúRe way" },
        ],
      ],
      [
        [
          { p: "ورکړی وای", f: "wărkúRay waay" },
          { p: "ورکړی وی", f: "wărkúRay way" },
        ],
        [
          { p: "ورکړی وای", f: "wărkúRay waay" },
          { p: "ورکړی وی", f: "wărkúRay way" },
        ],
      ],
      [
        [
          { p: "ورکړې وای", f: "wărkúRe waay" },
          { p: "ورکړې وی", f: "wărkúRe way" },
        ],
        [
          { p: "ورکړې وای", f: "wărkúRe waay" },
          { p: "ورکړې وی", f: "wărkúRe way" },
        ],
      ],
      [
        [
          { p: "ورکړی وای", f: "wărkúRay waay" },
          { p: "ورکړی وی", f: "wărkúRay way" },
        ],
        [
          { p: "ورکړی وای", f: "wărkúRay waay" },
          { p: "ورکړی وی", f: "wărkúRay way" },
        ],
      ],
      [
        [
          { p: "ورکړې وای", f: "wărkúRe waay" },
          { p: "ورکړې وی", f: "wărkúRe way" },
        ],
        [
          { p: "ورکړې وای", f: "wărkúRe waay" },
          { p: "ورکړې وی", f: "wărkúRe way" },
        ],
      ],
    ],
    wouldHaveBeen: [
      [
        [
          { p: "به ورکړی وای", f: "ba wărkúRay waay" },
          { p: "به ورکړی وی", f: "ba wărkúRay way" },
        ],
        [
          { p: "به ورکړی وای", f: "ba wărkúRay waay" },
          { p: "به ورکړی وی", f: "ba wărkúRay way" },
        ],
      ],
      [
        [
          { p: "به ورکړې وای", f: "ba wărkúRe waay" },
          { p: "به ورکړې وی", f: "ba wărkúRe way" },
        ],
        [
          { p: "به ورکړې وای", f: "ba wărkúRe waay" },
          { p: "به ورکړې وی", f: "ba wărkúRe way" },
        ],
      ],
      [
        [
          { p: "به ورکړی وای", f: "ba wărkúRay waay" },
          { p: "به ورکړی وی", f: "ba wărkúRay way" },
        ],
        [
          { p: "به ورکړی وای", f: "ba wărkúRay waay" },
          { p: "به ورکړی وی", f: "ba wărkúRay way" },
        ],
      ],
      [
        [
          { p: "به ورکړې وای", f: "ba wărkúRe waay" },
          { p: "به ورکړې وی", f: "ba wărkúRe way" },
        ],
        [
          { p: "به ورکړې وای", f: "ba wărkúRe waay" },
          { p: "به ورکړې وی", f: "ba wărkúRe way" },
        ],
      ],
      [
        [
          { p: "به ورکړی وای", f: "ba wărkúRay waay" },
          { p: "به ورکړی وی", f: "ba wărkúRay way" },
        ],
        [
          { p: "به ورکړی وای", f: "ba wărkúRay waay" },
          { p: "به ورکړی وی", f: "ba wărkúRay way" },
        ],
      ],
      [
        [
          { p: "به ورکړې وای", f: "ba wărkúRe waay" },
          { p: "به ورکړې وی", f: "ba wărkúRe way" },
        ],
        [
          { p: "به ورکړې وای", f: "ba wărkúRe waay" },
          { p: "به ورکړې وی", f: "ba wărkúRe way" },
        ],
      ],
    ],
  },
  // passive: {
  //     imperfective: {
  //         nonImperative: [
  //             [{p: "ورکول کېږم", f: "wărkawul keGum"}, {p: "ورکول کېږو", f: "wărkawul keGoo"}],
  //             [{p: "ورکول کېږې", f: "wărkawul keGe"}, {p: "ورکول کېږئ", f: "wărkawul keGey"}],
  //             [{p: "ورکول کېږي", f: "wărkawul keGee"}, {p: "ورکول کېږي", f: "wărkawul keGee"}],
  //         ],
  //         future: [
  //             [{p: "به ورکول کېږم", f: "ba wărkawul keGum"}, {p: "به ورکول کېږو", f: "ba wărkawul keGoo"}],
  //             [{p: "به ورکول کېږې", f: "ba wărkawul keGe"}, {p: "به ورکول کېږئ", f: "ba wărkawul keGey"}],
  //             [{p: "به ورکول کېږي", f: "ba wărkawul keGee"}, {p: "به ورکول کېږي", f: "ba wărkawul keGee"}],
  //         ],
  //         past: {
  //             short: [
  //                 [[{p: "ورکول کېدم", f: "wărkawul kedum"}], [{p: "ورکول کېدو", f: "wărkawul kedóo"}]],
  //                 [[{p: "ورکول کېدم", f: "wărkawul kedum"}], [{p: "ورکول کېدو", f: "wărkawul kedóo"}]],
  //                 [[{p: "ورکول کېدې", f: "wărkawul kedé"}], [{p: "ورکول کېدئ", f: "wărkawul kedéy"}]],
  //                 [[{p: "ورکول کېدې", f: "wărkawul kedé"}], [{p: "ورکول کېدئ", f: "wărkawul kedéy"}]],
  //                 [[{p: "ورکول کېده", f: "wărkawul kedu"}, {p: "ورکول کېدو", f: "wărkawul kedó"}], [{p: "ورکول کېدل", f: "wărkawul kedul"}]],
  //                 [[{p: "ورکول کېده", f: "wărkawul kedá"}], [{p: "ورکول کېدې", f: "wărkawul kedé"}]],
  //             ],
  //             long: [
  //                 [[{p: "ورکول کېدلم", f: "wărkawul kedúlum"}], [{p: "ورکول کېدلو", f: "wărkawul kedúloo"}]],
  //                 [[{p: "ورکول کېدلم", f: "wărkawul kedúlum"}], [{p: "ورکول کېدلو", f: "wărkawul kedúloo"}]],
  //                 [[{p: "ورکول کېدلې", f: "wărkawul kedúle"}], [{p: "ورکول کېدلئ", f: "wărkawul kedúley"}]],
  //                 [[{p: "ورکول کېدلې", f: "wărkawul kedúle"}], [{p: "ورکول کېدلئ", f: "wărkawul kedúley"}]],
  //                 [[{p: "ورکول کېدله", f: "wărkawul kedúlu"}, {p: "ورکول کېدلو", f: "wărkawul kedúlo"}], [{p: "ورکول کېدل", f: "wărkawul kedúl"}]],
  //                 [[{p: "ورکول کېدله", f: "wărkawul kedúla"}], [{p: "ورکول کېدلې", f: "wărkawul kedúle"}]],
  //             ],
  //         },
  //     },
  //     perfective: {
  //         nonImperative: {
  //             short: [
  //                 [{p: "ورکړلی کېږم", f: "wărkRulay keGum"}, {p: "ورکړلی کېږو", f: "wărkRulay keGoo"}],
  //                 [{p: "ورکړلی کېږې", f: "wărkRulay keGe"}, {p: "ورکړلی کېږئ", f: "wărkRulay keGey"}],
  //                 [{p: "ورکړلی کېږي", f: "wărkRulay keGee"}, {p: "ورکړلی کېږي", f: "wărkRulay keGee"}],
  //             ],
  //             long: [
  //                 [{p: "ورکړی کېږم", f: "wărkRay keGum"}, {p: "ورکړی کېږو", f: "wărkRay keGoo"}],
  //                 [{p: "ورکړی کېږې", f: "wărkRay keGe"}, {p: "ورکړی کېږئ", f: "wărkRay keGey"}],
  //                 [{p: "ورکړی کېږي", f: "wărkRay keGee"}, {p: "ورکړی کېږي", f: "wărkRay keGee"}],
  //             ],
  //         },
  //         future: {
  //             short: [
  //                 [{p: "به ورکړلی کېږم", f: "ba wărkRulay keGum"}, {p: "به ورکړلی کېږو", f: "ba wărkRulay keGoo"}],
  //                 [{p: "به ورکړلی کېږې", f: "ba wărkRulay keGe"}, {p: "به ورکړلی کېږئ", f: "ba wărkRulay keGey"}],
  //                 [{p: "به ورکړلی کېږي", f: "ba wărkRulay keGee"}, {p: "به ورکړلی کېږي", f: "ba wărkRulay keGee"}],
  //             ],
  //             long: [
  //                 [{p: "به ورکړی کېږم", f: "ba wărkRay keGum"}, {p: "به ورکړی کېږو", f: "ba wărkRay keGoo"}],
  //                 [{p: "به ورکړی کېږې", f: "ba wărkRay keGe"}, {p: "به ورکړی کېږئ", f: "ba wărkRay keGey"}],
  //                 [{p: "به ورکړی کېږي", f: "ba wărkRay keGee"}, {p: "به ورکړی کېږي", f: "ba wărkRay keGee"}],
  //             ],
  //         },
  //         past: {
  //             short: [
  //                 [[{p: "ورکړی شوم", f: "wărkRay shwum"}], [{p: "ورکړی شو", f: "wărkRay shoo"}]],
  //                 [[{p: "ورکړی شوم", f: "wărkRay shwum"}], [{p: "ورکړی شو", f: "wărkRay shoo"}]],
  //                 [[{p: "ورکړی شوې", f: "wărkRay shwe"}], [{p: "ورکړی شوئ", f: "wărkRay shwey"}]],
  //                 [[{p: "ورکړی شوې", f: "wărkRay shwe"}], [{p: "ورکړی شوئ", f: "wărkRay shwey"}]],
  //                 [[{p: "ورکړی شو", f: "wărkRay sho"}], [{p: "ورکړی شو", f: "wărkRay shoo"}, {p: "ورکړی شول", f: "wărkRay shwul"}]],
  //                 [[{p: "ورکړی شوه", f: "wărkRay shwa"}], [{p: "ورکړی شوې", f: "wărkRay shwe"}]],
  //             ],
  //             long: [
  //                 [[{p: "ورکړلی شوم", f: "wărkRúlay shwum"}], [{p: "ورکړلی شو", f: "wărkRúlay shoo"}]],
  //                 [[{p: "ورکړلی شوم", f: "wărkRúlay shwum"}], [{p: "ورکړلی شو", f: "wărkRúlay shoo"}]],
  //                 [[{p: "ورکړلی شوې", f: "wărkRúlay shwe"}], [{p: "ورکړلی شوئ", f: "wărkRúlay shwey"}]],
  //                 [[{p: "ورکړلی شوې", f: "wărkRúlay shwe"}], [{p: "ورکړلی شوئ", f: "wărkRúlay shwey"}]],
  //                 [[{p: "ورکړلی شو", f: "wărkRúlay sho"}], [{p: "ورکړلی شو", f: "wărkRúlay shoo"}, {p: "ورکړلی شول", f: "wărkRúlay shwul"}]],
  //                 [[{p: "ورکړلی شوه", f: "wărkRúlay shwa"}], [{p: "ورکړلی شوې", f: "wărkRúlay shwe"}]],
  //             ],
  //         },
  //     },
  //     perfect: {
  //         halfPerfect: {
  //             short: [
  //                 [[{p: "ورکړی شوی", f: "wărkRáy shuway"}], [{p: "ورکړی شوي", f: "wărkRáy shuwee"}]],
  //                 [[{p: "ورکړی شوې", f: "wărkRáy shuwe"}], [{p: "ورکړی شوې", f: "wărkRáy shuwe"}]],
  //                 [[{p: "ورکړی شوی", f: "wărkRáy shuway"}], [{p: "ورکړی شوي", f: "wărkRáy shuwee"}]],
  //                 [[{p: "ورکړی شوې", f: "wărkRáy shuwe"}], [{p: "ورکړی شوې", f: "wărkRáy shuwe"}]],
  //                 [[{p: "ورکړی شوی", f: "wărkRáy shuway"}], [{p: "ورکړی شوي", f: "wărkRáy shuwee"}]],
  //                 [[{p: "ورکړی شوې", f: "wărkRáy shuwe"}], [{p: "ورکړی شوې", f: "wărkRáy shuwe"}]],
  //             ],
  //             long: [
  //                 [[{p: "ورکړلی شوی", f: "wărkRúlay shuway"}], [{p: "ورکړلی شوي", f: "wărkRúlay shuwee"}]],
  //                 [[{p: "ورکړلی شوې", f: "wărkRúlay shuwe"}], [{p: "ورکړلی شوې", f: "wărkRúlay shuwe"}]],
  //                 [[{p: "ورکړلی شوی", f: "wărkRúlay shuway"}], [{p: "ورکړلی شوي", f: "wărkRúlay shuwee"}]],
  //                 [[{p: "ورکړلی شوې", f: "wărkRúlay shuwe"}], [{p: "ورکړلی شوې", f: "wărkRúlay shuwe"}]],
  //                 [[{p: "ورکړلی شوی", f: "wărkRúlay shuway"}], [{p: "ورکړلی شوي", f: "wărkRúlay shuwee"}]],
  //                 [[{p: "ورکړلی شوې", f: "wărkRúlay shuwe"}], [{p: "ورکړلی شوې", f: "wărkRúlay shuwe"}]],
  //             ],
  //         },
  //         past: {
  //             short: [
  //                 [[{p: "ورکړی شوی وم", f: "wărkRáy shuway wum"}], [{p: "ورکړی شوي وو", f: "wărkRáy shuwee woo"}]],
  //                 [[{p: "ورکړی شوې وم", f: "wărkRáy shuwe wum"}], [{p: "ورکړی شوې وو", f: "wărkRáy shuwe woo"}]],
  //                 [[{p: "ورکړی شوی وې", f: "wărkRáy shuway we"}], [{p: "ورکړی شوي وئ", f: "wărkRáy shuwee wey"}]],
  //                 [[{p: "ورکړی شوې وې", f: "wărkRáy shuwe we"}], [{p: "ورکړی شوې وئ", f: "wărkRáy shuwe wey"}]],
  //                 [[{p: "ورکړی شوی و", f: "wărkRáy shuway wo"}], [{p: "ورکړی شوي وو", f: "wărkRáy shuwee woo"}]],
  //                 [[{p: "ورکړی شوې وه", f: "wărkRáy shuwe wa"}], [{p: "ورکړی شوې وې", f: "wărkRáy shuwe we"}]],
  //             ],
  //             long: [
  //                 [[{p: "ورکړلی شوی وم", f: "wărkRúlay shuway wum"}], [{p: "ورکړلی شوي وو", f: "wărkRúlay shuwee woo"}]],
  //                 [[{p: "ورکړلی شوې وم", f: "wărkRúlay shuwe wum"}], [{p: "ورکړلی شوې وو", f: "wărkRúlay shuwe woo"}]],
  //                 [[{p: "ورکړلی شوی وې", f: "wărkRúlay shuway we"}], [{p: "ورکړلی شوي وئ", f: "wărkRúlay shuwee wey"}]],
  //                 [[{p: "ورکړلی شوې وې", f: "wărkRúlay shuwe we"}], [{p: "ورکړلی شوې وئ", f: "wărkRúlay shuwe wey"}]],
  //                 [[{p: "ورکړلی شوی و", f: "wărkRúlay shuway wo"}], [{p: "ورکړلی شوي وو", f: "wărkRúlay shuwee woo"}]],
  //                 [[{p: "ورکړلی شوې وه", f: "wărkRúlay shuwe wa"}], [{p: "ورکړلی شوې وې", f: "wărkRúlay shuwe we"}]],
  //             ],
  //         },
  //         present: {
  //             short: [
  //                 [[{p: "ورکړی شوی یم", f: "wărkRáy shuway yum"}], [{p: "ورکړی شوي یو", f: "wărkRáy shuwee yoo"}]],
  //                 [[{p: "ورکړی شوې یم", f: "wărkRáy shuwe yum"}], [{p: "ورکړی شوې یو", f: "wărkRáy shuwe yoo"}]],
  //                 [[{p: "ورکړی شوی یې", f: "wărkRáy shuway ye"}], [{p: "ورکړی شوي یئ", f: "wărkRáy shuwee yey"}]],
  //                 [[{p: "ورکړی شوې یې", f: "wărkRáy shuwe ye"}], [{p: "ورکړی شوې یئ", f: "wărkRáy shuwe yey"}]],
  //                 [[{p: "ورکړی شوی دی", f: "wărkRáy shuway day"}], [{p: "ورکړی شوي دي", f: "wărkRáy shuwee dee"}]],
  //                 [[{p: "ورکړی شوې ده", f: "wărkRáy shuwe da"}], [{p: "ورکړی شوې دي", f: "wărkRáy shuwe dee"}]],
  //             ],
  //             long: [
  //                 [[{p: "ورکړلی شوی یم", f: "wărkRúlay shuway yum"}], [{p: "ورکړلی شوي یو", f: "wărkRúlay shuwee yoo"}]],
  //                 [[{p: "ورکړلی شوې یم", f: "wărkRúlay shuwe yum"}], [{p: "ورکړلی شوې یو", f: "wărkRúlay shuwe yoo"}]],
  //                 [[{p: "ورکړلی شوی یې", f: "wărkRúlay shuway ye"}], [{p: "ورکړلی شوي یئ", f: "wărkRúlay shuwee yey"}]],
  //                 [[{p: "ورکړلی شوې یې", f: "wărkRúlay shuwe ye"}], [{p: "ورکړلی شوې یئ", f: "wărkRúlay shuwe yey"}]],
  //                 [[{p: "ورکړلی شوی دی", f: "wărkRúlay shuway day"}], [{p: "ورکړلی شوي دي", f: "wărkRúlay shuwee dee"}]],
  //                 [[{p: "ورکړلی شوې ده", f: "wărkRúlay shuwe da"}], [{p: "ورکړلی شوې دي", f: "wărkRúlay shuwe dee"}]],
  //             ],
  //         },
  //         future: {
  //             short: [
  //                 [[{p: "به ورکړی شوی یم", f: "ba wărkRáy shuway yum"}], [{p: "به ورکړی شوي یو", f: "ba wărkRáy shuwee yoo"}]],
  //                 [[{p: "به ورکړی شوې یم", f: "ba wărkRáy shuwe yum"}], [{p: "به ورکړی شوې یو", f: "ba wărkRáy shuwe yoo"}]],
  //                 [[{p: "به ورکړی شوی یې", f: "ba wărkRáy shuway ye"}], [{p: "به ورکړی شوي یئ", f: "ba wărkRáy shuwee yey"}]],
  //                 [[{p: "به ورکړی شوې یې", f: "ba wărkRáy shuwe ye"}], [{p: "به ورکړی شوې یئ", f: "ba wărkRáy shuwe yey"}]],
  //                 [[{p: "به ورکړی شوی وي", f: "ba wărkRáy shuway wee"}], [{p: "به ورکړی شوي وي", f: "ba wărkRáy shuwee wee"}]],
  //                 [[{p: "به ورکړی شوې وي", f: "ba wărkRáy shuwe wee"}], [{p: "به ورکړی شوې وي", f: "ba wărkRáy shuwe wee"}]],
  //             ],
  //             long: [
  //                 [[{p: "به ورکړلی شوی یم", f: "ba wărkRúlay shuway yum"}], [{p: "به ورکړلی شوي یو", f: "ba wărkRúlay shuwee yoo"}]],
  //                 [[{p: "به ورکړلی شوې یم", f: "ba wărkRúlay shuwe yum"}], [{p: "به ورکړلی شوې یو", f: "ba wărkRúlay shuwe yoo"}]],
  //                 [[{p: "به ورکړلی شوی یې", f: "ba wărkRúlay shuway ye"}], [{p: "به ورکړلی شوي یئ", f: "ba wărkRúlay shuwee yey"}]],
  //                 [[{p: "به ورکړلی شوې یې", f: "ba wărkRúlay shuwe ye"}], [{p: "به ورکړلی شوې یئ", f: "ba wărkRúlay shuwe yey"}]],
  //                 [[{p: "به ورکړلی شوی وي", f: "ba wărkRúlay shuway wee"}], [{p: "به ورکړلی شوي وي", f: "ba wărkRúlay shuwee wee"}]],
  //                 [[{p: "به ورکړلی شوې وي", f: "ba wărkRúlay shuwe wee"}], [{p: "به ورکړلی شوې وي", f: "ba wărkRúlay shuwe wee"}]],
  //             ],
  //         },
  //         affirmational: {
  //             short: [
  //                 [[{p: "به ورکړی شوی وم", f: "ba wărkRáy shuway wum"}], [{p: "به ورکړی شوي وو", f: "ba wărkRáy shuwee woo"}]],
  //                 [[{p: "به ورکړی شوې وم", f: "ba wărkRáy shuwe wum"}], [{p: "به ورکړی شوې وو", f: "ba wărkRáy shuwe woo"}]],
  //                 [[{p: "به ورکړی شوی وې", f: "ba wărkRáy shuway we"}], [{p: "به ورکړی شوي وئ", f: "ba wărkRáy shuwee wey"}]],
  //                 [[{p: "به ورکړی شوې وې", f: "ba wărkRáy shuwe we"}], [{p: "به ورکړی شوې وئ", f: "ba wărkRáy shuwe wey"}]],
  //                 [[{p: "به ورکړی شوی و", f: "ba wărkRáy shuway wo"}], [{p: "به ورکړی شوي وو", f: "ba wărkRáy shuwee woo"}]],
  //                 [[{p: "به ورکړی شوې وه", f: "ba wărkRáy shuwe wa"}], [{p: "به ورکړی شوې وې", f: "ba wărkRáy shuwe we"}]],
  //             ],
  //             long: [
  //                 [[{p: "به ورکړلی شوی وم", f: "ba wărkRúlay shuway wum"}], [{p: "به ورکړلی شوي وو", f: "ba wărkRúlay shuwee woo"}]],
  //                 [[{p: "به ورکړلی شوې وم", f: "ba wărkRúlay shuwe wum"}], [{p: "به ورکړلی شوې وو", f: "ba wărkRúlay shuwe woo"}]],
  //                 [[{p: "به ورکړلی شوی وې", f: "ba wărkRúlay shuway we"}], [{p: "به ورکړلی شوي وئ", f: "ba wărkRúlay shuwee wey"}]],
  //                 [[{p: "به ورکړلی شوې وې", f: "ba wărkRúlay shuwe we"}], [{p: "به ورکړلی شوې وئ", f: "ba wărkRúlay shuwe wey"}]],
  //                 [[{p: "به ورکړلی شوی و", f: "ba wărkRúlay shuway wo"}], [{p: "به ورکړلی شوي وو", f: "ba wărkRúlay shuwee woo"}]],
  //                 [[{p: "به ورکړلی شوې وه", f: "ba wărkRúlay shuwe wa"}], [{p: "به ورکړلی شوې وې", f: "ba wărkRúlay shuwe we"}]],
  //             ],
  //         },
  //         pastSubjunctiveHypothetical: {
  //             short: [
  //                 [[{p: "ورکړی شوی وای", f: "ba wărkRáy shuway"}], [{p: "به ورکړی شوي", f: "ba wărkRáy shuwee"}]],
  //                 [[{p: "ورکړی شوې وای", f: "ba wărkRáy shuwe"}], [{p: "به ورکړی شوې", f: "ba wărkRáy shuwe"}]],
  //                 [[{p: "ورکړی شوی وای", f: "ba wărkRáy shuway"}], [{p: "به ورکړی شوي", f: "ba wărkRáy shuwee"}]],
  //                 [[{p: "ورکړی شوې وای", f: "ba wărkRáy shuwe"}], [{p: "به ورکړی شوې", f: "ba wărkRáy shuwe"}]],
  //                 [[{p: "ورکړی شوی وای", f: "ba wărkRáy shuway"}], [{p: "به ورکړی شوي", f: "ba wărkRáy shuwee"}]],
  //                 [[{p: "ورکړی شوې وای", f: "ba wărkRáy shuwe"}], [{p: "به ورکړی شوې", f: "ba wărkRáy shuwe"}]],
  //             ],
  //             long: [
  //                 [[{p: "ورکړلی شوی وای", f: "ba wărkRúlay shuway"}], [{p: "به ورکړلی شوي", f: "ba wărkRúlay shuwee"}]],
  //                 [[{p: "ورکړلی شوې وای", f: "ba wărkRúlay shuwe"}], [{p: "به ورکړلی شوې", f: "ba wărkRúlay shuwe"}]],
  //                 [[{p: "ورکړلی شوی وای", f: "ba wărkRúlay shuway"}], [{p: "به ورکړلی شوي", f: "ba wărkRúlay shuwee"}]],
  //                 [[{p: "ورکړلی شوې وای", f: "ba wărkRúlay shuwe"}], [{p: "به ورکړلی شوې", f: "ba wărkRúlay shuwe"}]],
  //                 [[{p: "ورکړلی شوی وای", f: "ba wărkRúlay shuway"}], [{p: "به ورکړلی شوي", f: "ba wărkRúlay shuwee"}]],
  //                 [[{p: "ورکړلی شوې وای", f: "ba wărkRúlay shuwe"}], [{p: "به ورکړلی شوې", f: "ba wărkRúlay shuwe"}]],
  //             ],
  //         },
  //     },
  // },
};

export const raakawul: T.VerbConjugation = {
  info: {
    entry: {
      entry: {
        ts: 1527819279,
        i: 6682,
        p: "راکول",
        f: "raakawul",
        g: "raakawul",
        e: "to give (to first person - to me, us)",
      } as T.VerbDictionaryEntry,
    },
    transitivity: "transitive",
    type: "simple",
    yulEnding: false,
    root: {
      imperfective: {
        long: { p: "راکول", f: "raakawul" },
        short: { p: "راکو", f: "raakaw" },
      },
      perfective: {
        long: { p: "راکړل", f: "raakRul" },
        short: { p: "راکړ", f: "raakR" },
        mini: { p: "راک", f: "raak" },
      },
      perfectiveSplit: {
        long: [
          { p: "را ", f: "raa " },
          { p: "کړل", f: "kRul" },
        ],
        short: [
          { p: "را ", f: "raa " },
          { p: "کړ", f: "kR" },
        ],
        mini: [
          { p: "را ", f: "raa " },
          { p: "ړ", f: "k" },
        ],
      },
    },
    stem: {
      imperfective: { p: "راکو", f: "raakaw" },
      perfective: {
        long: { p: "راکړ", f: "raakR" },
        short: { p: "راک", f: "raak" },
      },
      perfectiveSplit: {
        long: [
          { p: "را ", f: "raa " },
          { p: "کړ", f: "kR" },
        ],
        short: [
          { p: "را ", f: "raa " },
          { p: "ړ", f: "k" },
        ],
      },
    },
    participle: {
      present: { p: "راکوونکی", f: "raakawóonkay" },
      past: { p: "راکړی", f: "raakúRay" },
    },
  },
  imperfective: {
    nonImperative: [
      [[{ p: "راکوم", f: "raakawum" }], [{ p: "راکوو", f: "raakawoo" }]],
      [[{ p: "راکوم", f: "raakawum" }], [{ p: "راکوو", f: "raakawoo" }]],
      [[{ p: "راکوې", f: "raakawe" }], [{ p: "راکوئ", f: "raakawey" }]],
      [[{ p: "راکوې", f: "raakawe" }], [{ p: "راکوئ", f: "raakawey" }]],
      [[{ p: "راکوي", f: "raakawee" }], [{ p: "راکوي", f: "raakawee" }]],
      [[{ p: "راکوي", f: "raakawee" }], [{ p: "راکوي", f: "raakawee" }]],
    ],
    future: [
      [
        [{ p: "به راکوم", f: "ba raakawum" }],
        [{ p: "به راکوو", f: "ba raakawoo" }],
      ],
      [
        [{ p: "به راکوم", f: "ba raakawum" }],
        [{ p: "به راکوو", f: "ba raakawoo" }],
      ],
      [
        [{ p: "به راکوې", f: "ba raakawe" }],
        [{ p: "به راکوئ", f: "ba raakawey" }],
      ],
      [
        [{ p: "به راکوې", f: "ba raakawe" }],
        [{ p: "به راکوئ", f: "ba raakawey" }],
      ],
      [
        [{ p: "به راکوي", f: "ba raakawee" }],
        [{ p: "به راکوي", f: "ba raakawee" }],
      ],
      [
        [{ p: "به راکوي", f: "ba raakawee" }],
        [{ p: "به راکوي", f: "ba raakawee" }],
      ],
    ],
    imperative: [
      [[{ p: "راکوه", f: "raakawá" }], [{ p: "راکوئ", f: "raakawéy" }]],
      [[{ p: "راکوه", f: "raakawá" }], [{ p: "راکوئ", f: "raakawéy" }]],
    ],
    past: {
      short: [
        [[{ p: "راکوم", f: "raakawum" }], [{ p: "راکوو", f: "raakawoo" }]],
        [[{ p: "راکوم", f: "raakawum" }], [{ p: "راکوو", f: "raakawoo" }]],
        [[{ p: "راکوې", f: "raakawe" }], [{ p: "راکوئ", f: "raakawey" }]],
        [[{ p: "راکوې", f: "raakawe" }], [{ p: "راکوئ", f: "raakawey" }]],
        [[{ p: "راکاوه", f: "raakaawu" }], [{ p: "راکول", f: "raakawul" }]],
        [[{ p: "راکوه", f: "raakawa" }], [{ p: "راکوې", f: "raakawe" }]],
      ],
      long: [
        [
          [{ p: "راکولم", f: "raakawulum" }],
          [{ p: "راکولو", f: "raakawuloo" }],
        ],
        [
          [{ p: "راکولم", f: "raakawulum" }],
          [{ p: "راکولو", f: "raakawuloo" }],
        ],
        [[{ p: "راکولې", f: "raakawule" }], [{ p: "راکولئ", f: "raakawuley" }]],
        [[{ p: "راکولې", f: "raakawule" }], [{ p: "راکولئ", f: "raakawuley" }]],
        [
          [
            { p: "راکوله", f: "raakawulu" },
            { p: "راکولو", f: "raakawulo" },
          ],
          [{ p: "راکول", f: "raakawul" }],
        ],
        [[{ p: "راکوله", f: "raakawula" }], [{ p: "راکولې", f: "raakawule" }]],
      ],
    },
    habitualPast: {
      short: [
        [
          [{ p: "به راکوم", f: "ba raakawum" }],
          [{ p: "به راکوو", f: "ba raakawoo" }],
        ],
        [
          [{ p: "به راکوم", f: "ba raakawum" }],
          [{ p: "به راکوو", f: "ba raakawoo" }],
        ],
        [
          [{ p: "به راکوې", f: "ba raakawe" }],
          [{ p: "به راکوئ", f: "ba raakawey" }],
        ],
        [
          [{ p: "به راکوې", f: "ba raakawe" }],
          [{ p: "به راکوئ", f: "ba raakawey" }],
        ],
        [
          [{ p: "به راکاوه", f: "ba raakaawu" }],
          [{ p: "به راکول", f: "ba raakawul" }],
        ],
        [
          [{ p: "به راکوه", f: "ba raakawa" }],
          [{ p: "به راکوې", f: "ba raakawe" }],
        ],
      ],
      long: [
        [
          [{ p: "به راکولم", f: "ba raakawulum" }],
          [{ p: "به راکولو", f: "ba raakawuloo" }],
        ],
        [
          [{ p: "به راکولم", f: "ba raakawulum" }],
          [{ p: "به راکولو", f: "ba raakawuloo" }],
        ],
        [
          [{ p: "به راکولې", f: "ba raakawule" }],
          [{ p: "به راکولئ", f: "ba raakawuley" }],
        ],
        [
          [{ p: "به راکولې", f: "ba raakawule" }],
          [{ p: "به راکولئ", f: "ba raakawuley" }],
        ],
        [
          [
            { p: "به راکوله", f: "ba raakawulu" },
            { p: "به راکولو", f: "ba raakawulo" },
          ],
          [{ p: "به راکول", f: "ba raakawul" }],
        ],
        [
          [{ p: "به راکوله", f: "ba raakawula" }],
          [{ p: "به راکولې", f: "ba raakawule" }],
        ],
      ],
    },
    modal: {
      nonImperative: {
        long: [
          [
            [
              { p: "راکولی شم", f: "raakawúlay shum" },
              { p: "راکولای شم", f: "raakawúlaay shum" },
            ],
            [
              { p: "راکولی شو", f: "raakawúlay shoo" },
              { p: "راکولای شو", f: "raakawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "راکولی شم", f: "raakawúlay shum" },
              { p: "راکولای شم", f: "raakawúlaay shum" },
            ],
            [
              { p: "راکولی شو", f: "raakawúlay shoo" },
              { p: "راکولای شو", f: "raakawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "راکولی شې", f: "raakawúlay she" },
              { p: "راکولای شې", f: "raakawúlaay she" },
            ],
            [
              { p: "راکولی شئ", f: "raakawúlay shey" },
              { p: "راکولای شئ", f: "raakawúlaay shey" },
            ],
          ],
          [
            [
              { p: "راکولی شې", f: "raakawúlay she" },
              { p: "راکولای شې", f: "raakawúlaay she" },
            ],
            [
              { p: "راکولی شئ", f: "raakawúlay shey" },
              { p: "راکولای شئ", f: "raakawúlaay shey" },
            ],
          ],
          [
            [
              { p: "راکولی شي", f: "raakawúlay shee" },
              { p: "راکولای شي", f: "raakawúlaay shee" },
            ],
            [
              { p: "راکولی شي", f: "raakawúlay shee" },
              { p: "راکولای شي", f: "raakawúlaay shee" },
            ],
          ],
          [
            [
              { p: "راکولی شي", f: "raakawúlay shee" },
              { p: "راکولای شي", f: "raakawúlaay shee" },
            ],
            [
              { p: "راکولی شي", f: "raakawúlay shee" },
              { p: "راکولای شي", f: "raakawúlaay shee" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "راکوی شم", f: "raakawáy shum" },
              { p: "راکوای شم", f: "raakawáay shum" },
            ],
            [
              { p: "راکوی شو", f: "raakawáy shoo" },
              { p: "راکوای شو", f: "raakawáay shoo" },
            ],
          ],
          [
            [
              { p: "راکوی شم", f: "raakawáy shum" },
              { p: "راکوای شم", f: "raakawáay shum" },
            ],
            [
              { p: "راکوی شو", f: "raakawáy shoo" },
              { p: "راکوای شو", f: "raakawáay shoo" },
            ],
          ],
          [
            [
              { p: "راکوی شې", f: "raakawáy she" },
              { p: "راکوای شې", f: "raakawáay she" },
            ],
            [
              { p: "راکوی شئ", f: "raakawáy shey" },
              { p: "راکوای شئ", f: "raakawáay shey" },
            ],
          ],
          [
            [
              { p: "راکوی شې", f: "raakawáy she" },
              { p: "راکوای شې", f: "raakawáay she" },
            ],
            [
              { p: "راکوی شئ", f: "raakawáy shey" },
              { p: "راکوای شئ", f: "raakawáay shey" },
            ],
          ],
          [
            [
              { p: "راکوی شي", f: "raakawáy shee" },
              { p: "راکوای شي", f: "raakawáay shee" },
            ],
            [
              { p: "راکوی شي", f: "raakawáy shee" },
              { p: "راکوای شي", f: "raakawáay shee" },
            ],
          ],
          [
            [
              { p: "راکوی شي", f: "raakawáy shee" },
              { p: "راکوای شي", f: "raakawáay shee" },
            ],
            [
              { p: "راکوی شي", f: "raakawáy shee" },
              { p: "راکوای شي", f: "raakawáay shee" },
            ],
          ],
        ],
      },
      future: {
        long: [
          [
            [
              { p: "به راکولی شم", f: "ba raakawúlay shum" },
              { p: "به راکولای شم", f: "ba raakawúlaay shum" },
            ],
            [
              { p: "به راکولی شو", f: "ba raakawúlay shoo" },
              { p: "به راکولای شو", f: "ba raakawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به راکولی شم", f: "ba raakawúlay shum" },
              { p: "به راکولای شم", f: "ba raakawúlaay shum" },
            ],
            [
              { p: "به راکولی شو", f: "ba raakawúlay shoo" },
              { p: "به راکولای شو", f: "ba raakawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به راکولی شې", f: "ba raakawúlay she" },
              { p: "به راکولای شې", f: "ba raakawúlaay she" },
            ],
            [
              { p: "به راکولی شئ", f: "ba raakawúlay shey" },
              { p: "به راکولای شئ", f: "ba raakawúlaay shey" },
            ],
          ],
          [
            [
              { p: "به راکولی شې", f: "ba raakawúlay she" },
              { p: "به راکولای شې", f: "ba raakawúlaay she" },
            ],
            [
              { p: "به راکولی شئ", f: "ba raakawúlay shey" },
              { p: "به راکولای شئ", f: "ba raakawúlaay shey" },
            ],
          ],
          [
            [
              { p: "به راکولی شي", f: "ba raakawúlay shee" },
              { p: "به راکولای شي", f: "ba raakawúlaay shee" },
            ],
            [
              { p: "به راکولی شي", f: "ba raakawúlay shee" },
              { p: "به راکولای شي", f: "ba raakawúlaay shee" },
            ],
          ],
          [
            [
              { p: "به راکولی شي", f: "ba raakawúlay shee" },
              { p: "به راکولای شي", f: "ba raakawúlaay shee" },
            ],
            [
              { p: "به راکولی شي", f: "ba raakawúlay shee" },
              { p: "به راکولای شي", f: "ba raakawúlaay shee" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "به راکوی شم", f: "ba raakawáy shum" },
              { p: "به راکوای شم", f: "ba raakawáay shum" },
            ],
            [
              { p: "به راکوی شو", f: "ba raakawáy shoo" },
              { p: "به راکوای شو", f: "ba raakawáay shoo" },
            ],
          ],
          [
            [
              { p: "به راکوی شم", f: "ba raakawáy shum" },
              { p: "به راکوای شم", f: "ba raakawáay shum" },
            ],
            [
              { p: "به راکوی شو", f: "ba raakawáy shoo" },
              { p: "به راکوای شو", f: "ba raakawáay shoo" },
            ],
          ],
          [
            [
              { p: "به راکوی شې", f: "ba raakawáy she" },
              { p: "به راکوای شې", f: "ba raakawáay she" },
            ],
            [
              { p: "به راکوی شئ", f: "ba raakawáy shey" },
              { p: "به راکوای شئ", f: "ba raakawáay shey" },
            ],
          ],
          [
            [
              { p: "به راکوی شې", f: "ba raakawáy she" },
              { p: "به راکوای شې", f: "ba raakawáay she" },
            ],
            [
              { p: "به راکوی شئ", f: "ba raakawáy shey" },
              { p: "به راکوای شئ", f: "ba raakawáay shey" },
            ],
          ],
          [
            [
              { p: "به راکوی شي", f: "ba raakawáy shee" },
              { p: "به راکوای شي", f: "ba raakawáay shee" },
            ],
            [
              { p: "به راکوی شي", f: "ba raakawáy shee" },
              { p: "به راکوای شي", f: "ba raakawáay shee" },
            ],
          ],
          [
            [
              { p: "به راکوی شي", f: "ba raakawáy shee" },
              { p: "به راکوای شي", f: "ba raakawáay shee" },
            ],
            [
              { p: "به راکوی شي", f: "ba raakawáy shee" },
              { p: "به راکوای شي", f: "ba raakawáay shee" },
            ],
          ],
        ],
      },
      past: {
        long: [
          [
            [
              { p: "راکولی شوم", f: "raakawúlay shwum" },
              { p: "راکولای شوم", f: "raakawúlaay shwum" },
            ],
            [
              { p: "راکولی شو", f: "raakawúlay shoo" },
              { p: "راکولای شو", f: "raakawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "راکولی شوم", f: "raakawúlay shwum" },
              { p: "راکولای شوم", f: "raakawúlaay shwum" },
            ],
            [
              { p: "راکولی شو", f: "raakawúlay shoo" },
              { p: "راکولای شو", f: "raakawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "راکولی شوې", f: "raakawúlay shwe" },
              { p: "راکولای شوې", f: "raakawúlaay shwe" },
            ],
            [
              { p: "راکولی شوئ", f: "raakawúlay shwey" },
              { p: "راکولای شوئ", f: "raakawúlaay shwey" },
            ],
          ],
          [
            [
              { p: "راکولی شوې", f: "raakawúlay shwe" },
              { p: "راکولای شوې", f: "raakawúlaay shwe" },
            ],
            [
              { p: "راکولی شوئ", f: "raakawúlay shwey" },
              { p: "راکولای شوئ", f: "raakawúlaay shwey" },
            ],
          ],
          [
            [
              { p: "راکولی شو", f: "raakawúlay sho" },
              { p: "راکولای شو", f: "raakawúlaay sho" },
            ],
            [
              { p: "راکولی شول", f: "raakawúlay shwul" },
              { p: "راکولای شول", f: "raakawúlaay shwul" },
              { p: "راکولی شو", f: "raakawúlay shoo" },
              { p: "راکولای شو", f: "raakawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "راکولی شوه", f: "raakawúlay shwa" },
              { p: "راکولای شوه", f: "raakawúlaay shwa" },
            ],
            [
              { p: "راکولی شولې", f: "raakawúlay shwule" },
              { p: "راکولای شولې", f: "raakawúlaay shwule" },
              { p: "راکولی شوې", f: "raakawúlay shwe" },
              { p: "راکولای شوې", f: "raakawúlaay shwe" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "راکوی شوم", f: "raakawáy shwum" },
              { p: "راکوای شوم", f: "raakawáay shwum" },
            ],
            [
              { p: "راکوی شو", f: "raakawáy shoo" },
              { p: "راکوای شو", f: "raakawáay shoo" },
            ],
          ],
          [
            [
              { p: "راکوی شوم", f: "raakawáy shwum" },
              { p: "راکوای شوم", f: "raakawáay shwum" },
            ],
            [
              { p: "راکوی شو", f: "raakawáy shoo" },
              { p: "راکوای شو", f: "raakawáay shoo" },
            ],
          ],
          [
            [
              { p: "راکوی شوې", f: "raakawáy shwe" },
              { p: "راکوای شوې", f: "raakawáay shwe" },
            ],
            [
              { p: "راکوی شوئ", f: "raakawáy shwey" },
              { p: "راکوای شوئ", f: "raakawáay shwey" },
            ],
          ],
          [
            [
              { p: "راکوی شوې", f: "raakawáy shwe" },
              { p: "راکوای شوې", f: "raakawáay shwe" },
            ],
            [
              { p: "راکوی شوئ", f: "raakawáy shwey" },
              { p: "راکوای شوئ", f: "raakawáay shwey" },
            ],
          ],
          [
            [
              { p: "راکوی شو", f: "raakawáy sho" },
              { p: "راکوای شو", f: "raakawáay sho" },
            ],
            [
              { p: "راکوی شول", f: "raakawáy shwul" },
              { p: "راکوای شول", f: "raakawáay shwul" },
              { p: "راکوی شو", f: "raakawáy shoo" },
              { p: "راکوای شو", f: "raakawáay shoo" },
            ],
          ],
          [
            [
              { p: "راکوی شوه", f: "raakawáy shwa" },
              { p: "راکوای شوه", f: "raakawáay shwa" },
            ],
            [
              { p: "راکوی شولې", f: "raakawáy shwule" },
              { p: "راکوای شولې", f: "raakawáay shwule" },
              { p: "راکوی شوې", f: "raakawáy shwe" },
              { p: "راکوای شوې", f: "raakawáay shwe" },
            ],
          ],
        ],
      },
      habitualPast: {
        long: [
          [
            [
              { p: "به راکولی شوم", f: "ba raakawúlay shwum" },
              { p: "به راکولای شوم", f: "ba raakawúlaay shwum" },
            ],
            [
              { p: "به راکولی شو", f: "ba raakawúlay shoo" },
              { p: "به راکولای شو", f: "ba raakawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به راکولی شوم", f: "ba raakawúlay shwum" },
              { p: "به راکولای شوم", f: "ba raakawúlaay shwum" },
            ],
            [
              { p: "به راکولی شو", f: "ba raakawúlay shoo" },
              { p: "به راکولای شو", f: "ba raakawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به راکولی شوې", f: "ba raakawúlay shwe" },
              { p: "به راکولای شوې", f: "ba raakawúlaay shwe" },
            ],
            [
              { p: "به راکولی شوئ", f: "ba raakawúlay shwey" },
              { p: "به راکولای شوئ", f: "ba raakawúlaay shwey" },
            ],
          ],
          [
            [
              { p: "به راکولی شوې", f: "ba raakawúlay shwe" },
              { p: "به راکولای شوې", f: "ba raakawúlaay shwe" },
            ],
            [
              { p: "به راکولی شوئ", f: "ba raakawúlay shwey" },
              { p: "به راکولای شوئ", f: "ba raakawúlaay shwey" },
            ],
          ],
          [
            [
              { p: "به راکولی شو", f: "ba raakawúlay sho" },
              { p: "به راکولای شو", f: "ba raakawúlaay sho" },
            ],
            [
              { p: "به راکولی شول", f: "ba raakawúlay shwul" },
              { p: "به راکولای شول", f: "ba raakawúlaay shwul" },
              { p: "به راکولی شو", f: "ba raakawúlay shoo" },
              { p: "به راکولای شو", f: "ba raakawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به راکولی شوه", f: "ba raakawúlay shwa" },
              { p: "به راکولای شوه", f: "ba raakawúlaay shwa" },
            ],
            [
              { p: "به راکولی شولې", f: "ba raakawúlay shwule" },
              { p: "به راکولای شولې", f: "ba raakawúlaay shwule" },
              { p: "به راکولی شوې", f: "ba raakawúlay shwe" },
              { p: "به راکولای شوې", f: "ba raakawúlaay shwe" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "به راکوی شوم", f: "ba raakawáy shwum" },
              { p: "به راکوای شوم", f: "ba raakawáay shwum" },
            ],
            [
              { p: "به راکوی شو", f: "ba raakawáy shoo" },
              { p: "به راکوای شو", f: "ba raakawáay shoo" },
            ],
          ],
          [
            [
              { p: "به راکوی شوم", f: "ba raakawáy shwum" },
              { p: "به راکوای شوم", f: "ba raakawáay shwum" },
            ],
            [
              { p: "به راکوی شو", f: "ba raakawáy shoo" },
              { p: "به راکوای شو", f: "ba raakawáay shoo" },
            ],
          ],
          [
            [
              { p: "به راکوی شوې", f: "ba raakawáy shwe" },
              { p: "به راکوای شوې", f: "ba raakawáay shwe" },
            ],
            [
              { p: "به راکوی شوئ", f: "ba raakawáy shwey" },
              { p: "به راکوای شوئ", f: "ba raakawáay shwey" },
            ],
          ],
          [
            [
              { p: "به راکوی شوې", f: "ba raakawáy shwe" },
              { p: "به راکوای شوې", f: "ba raakawáay shwe" },
            ],
            [
              { p: "به راکوی شوئ", f: "ba raakawáy shwey" },
              { p: "به راکوای شوئ", f: "ba raakawáay shwey" },
            ],
          ],
          [
            [
              { p: "به راکوی شو", f: "ba raakawáy sho" },
              { p: "به راکوای شو", f: "ba raakawáay sho" },
            ],
            [
              { p: "به راکوی شول", f: "ba raakawáy shwul" },
              { p: "به راکوای شول", f: "ba raakawáay shwul" },
              { p: "به راکوی شو", f: "ba raakawáy shoo" },
              { p: "به راکوای شو", f: "ba raakawáay shoo" },
            ],
          ],
          [
            [
              { p: "به راکوی شوه", f: "ba raakawáy shwa" },
              { p: "به راکوای شوه", f: "ba raakawáay shwa" },
            ],
            [
              { p: "به راکوی شولې", f: "ba raakawáy shwule" },
              { p: "به راکوای شولې", f: "ba raakawáay shwule" },
              { p: "به راکوی شوې", f: "ba raakawáy shwe" },
              { p: "به راکوای شوې", f: "ba raakawáay shwe" },
            ],
          ],
        ],
      },
      hypotheticalPast: {
        long: [
          [
            [
              { p: "راکولی شوای", f: "raakawúlay shwaay" },
              { p: "راکولی شوی", f: "raakawúlay shway" },
              { p: "راکولای شوای", f: "raakawúlaay shwaay" },
            ],
            [
              { p: "راکولی شوای", f: "raakawúlay shwaay" },
              { p: "راکولی شوی", f: "raakawúlay shway" },
              { p: "راکولای شوای", f: "raakawúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "راکولی شوای", f: "raakawúlay shwaay" },
              { p: "راکولی شوی", f: "raakawúlay shway" },
              { p: "راکولای شوای", f: "raakawúlaay shwaay" },
            ],
            [
              { p: "راکولی شوای", f: "raakawúlay shwaay" },
              { p: "راکولی شوی", f: "raakawúlay shway" },
              { p: "راکولای شوای", f: "raakawúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "راکولی شوای", f: "raakawúlay shwaay" },
              { p: "راکولی شوی", f: "raakawúlay shway" },
              { p: "راکولای شوای", f: "raakawúlaay shwaay" },
            ],
            [
              { p: "راکولی شوای", f: "raakawúlay shwaay" },
              { p: "راکولی شوی", f: "raakawúlay shway" },
              { p: "راکولای شوای", f: "raakawúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "راکولی شوای", f: "raakawúlay shwaay" },
              { p: "راکولی شوی", f: "raakawúlay shway" },
              { p: "راکولای شوای", f: "raakawúlaay shwaay" },
            ],
            [
              { p: "راکولی شوای", f: "raakawúlay shwaay" },
              { p: "راکولی شوی", f: "raakawúlay shway" },
              { p: "راکولای شوای", f: "raakawúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "راکولی شوای", f: "raakawúlay shwaay" },
              { p: "راکولی شوی", f: "raakawúlay shway" },
              { p: "راکولای شوای", f: "raakawúlaay shwaay" },
            ],
            [
              { p: "راکولی شوای", f: "raakawúlay shwaay" },
              { p: "راکولی شوی", f: "raakawúlay shway" },
              { p: "راکولای شوای", f: "raakawúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "راکولی شوای", f: "raakawúlay shwaay" },
              { p: "راکولی شوی", f: "raakawúlay shway" },
              { p: "راکولای شوای", f: "raakawúlaay shwaay" },
            ],
            [
              { p: "راکولی شوای", f: "raakawúlay shwaay" },
              { p: "راکولی شوی", f: "raakawúlay shway" },
              { p: "راکولای شوای", f: "raakawúlaay shwaay" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "راکوی شوای", f: "raakawáy shwaay" },
              { p: "راکوی شوی", f: "raakawáy shway" },
              { p: "راکوای شوای", f: "raakawáay shwaay" },
            ],
            [
              { p: "راکوی شوای", f: "raakawáy shwaay" },
              { p: "راکوی شوی", f: "raakawáy shway" },
              { p: "راکوای شوای", f: "raakawáay shwaay" },
            ],
          ],
          [
            [
              { p: "راکوی شوای", f: "raakawáy shwaay" },
              { p: "راکوی شوی", f: "raakawáy shway" },
              { p: "راکوای شوای", f: "raakawáay shwaay" },
            ],
            [
              { p: "راکوی شوای", f: "raakawáy shwaay" },
              { p: "راکوی شوی", f: "raakawáy shway" },
              { p: "راکوای شوای", f: "raakawáay shwaay" },
            ],
          ],
          [
            [
              { p: "راکوی شوای", f: "raakawáy shwaay" },
              { p: "راکوی شوی", f: "raakawáy shway" },
              { p: "راکوای شوای", f: "raakawáay shwaay" },
            ],
            [
              { p: "راکوی شوای", f: "raakawáy shwaay" },
              { p: "راکوی شوی", f: "raakawáy shway" },
              { p: "راکوای شوای", f: "raakawáay shwaay" },
            ],
          ],
          [
            [
              { p: "راکوی شوای", f: "raakawáy shwaay" },
              { p: "راکوی شوی", f: "raakawáy shway" },
              { p: "راکوای شوای", f: "raakawáay shwaay" },
            ],
            [
              { p: "راکوی شوای", f: "raakawáy shwaay" },
              { p: "راکوی شوی", f: "raakawáy shway" },
              { p: "راکوای شوای", f: "raakawáay shwaay" },
            ],
          ],
          [
            [
              { p: "راکوی شوای", f: "raakawáy shwaay" },
              { p: "راکوی شوی", f: "raakawáy shway" },
              { p: "راکوای شوای", f: "raakawáay shwaay" },
            ],
            [
              { p: "راکوی شوای", f: "raakawáy shwaay" },
              { p: "راکوی شوی", f: "raakawáy shway" },
              { p: "راکوای شوای", f: "raakawáay shwaay" },
            ],
          ],
          [
            [
              { p: "راکوی شوای", f: "raakawáy shwaay" },
              { p: "راکوی شوی", f: "raakawáy shway" },
              { p: "راکوای شوای", f: "raakawáay shwaay" },
            ],
            [
              { p: "راکوی شوای", f: "raakawáy shwaay" },
              { p: "راکوی شوی", f: "raakawáy shway" },
              { p: "راکوای شوای", f: "raakawáay shwaay" },
            ],
          ],
        ],
      },
    },
  },
  perfective: {
    nonImperative: {
      long: [
        [[{ p: "راکړم", f: "raakRum" }], [{ p: "راکړو", f: "raakRoo" }]],
        [[{ p: "راکړم", f: "raakRum" }], [{ p: "راکړو", f: "raakRoo" }]],
        [[{ p: "راکړې", f: "raakRe" }], [{ p: "راکړئ", f: "raakRey" }]],
        [[{ p: "راکړې", f: "raakRe" }], [{ p: "راکړئ", f: "raakRey" }]],
        [[{ p: "راکړي", f: "raakRee" }], [{ p: "راکړي", f: "raakRee" }]],
        [[{ p: "راکړي", f: "raakRee" }], [{ p: "راکړي", f: "raakRee" }]],
      ],
      short: [
        [[{ p: "راکم", f: "raakum" }], [{ p: "راکو", f: "raakoo" }]],
        [[{ p: "راکم", f: "raakum" }], [{ p: "راکو", f: "raakoo" }]],
        [[{ p: "راکې", f: "raake" }], [{ p: "راکئ", f: "raakey" }]],
        [[{ p: "راکې", f: "raake" }], [{ p: "راکئ", f: "raakey" }]],
        [[{ p: "راکي", f: "raakee" }], [{ p: "راکي", f: "raakee" }]],
        [[{ p: "راکي", f: "raakee" }], [{ p: "راکي", f: "raakee" }]],
      ],
    },
    future: {
      long: [
        [
          [{ p: "به راکړم", f: "ba raakRum" }],
          [{ p: "به راکړو", f: "ba raakRoo" }],
        ],
        [
          [{ p: "به راکړم", f: "ba raakRum" }],
          [{ p: "به راکړو", f: "ba raakRoo" }],
        ],
        [
          [{ p: "به راکړې", f: "ba raakRe" }],
          [{ p: "به راکړئ", f: "ba raakRey" }],
        ],
        [
          [{ p: "به راکړې", f: "ba raakRe" }],
          [{ p: "به راکړئ", f: "ba raakRey" }],
        ],
        [
          [{ p: "به راکړي", f: "ba raakRee" }],
          [{ p: "به راکړي", f: "ba raakRee" }],
        ],
        [
          [{ p: "به راکړي", f: "ba raakRee" }],
          [{ p: "به راکړي", f: "ba raakRee" }],
        ],
      ],
      short: [
        [
          [{ p: "به راکم", f: "ba raakum" }],
          [{ p: "به راکو", f: "ba raakoo" }],
        ],
        [
          [{ p: "به راکم", f: "ba raakum" }],
          [{ p: "به راکو", f: "ba raakoo" }],
        ],
        [[{ p: "به راکې", f: "ba raake" }], [{ p: "به راکئ", f: "ba raakey" }]],
        [[{ p: "به راکې", f: "ba raake" }], [{ p: "به راکئ", f: "ba raakey" }]],
        [
          [{ p: "به راکي", f: "ba raakee" }],
          [{ p: "به راکي", f: "ba raakee" }],
        ],
        [
          [{ p: "به راکي", f: "ba raakee" }],
          [{ p: "به راکي", f: "ba raakee" }],
        ],
      ],
    },
    imperative: {
      long: [
        [[{ p: "راکړه", f: "raakRa" }], [{ p: "راکړئ", f: "raakRey" }]],
        [[{ p: "راکړه", f: "raakRa" }], [{ p: "راکړئ", f: "raakRey" }]],
      ],
      short: [
        [[{ p: "راکه", f: "raaka" }], [{ p: "راکئ", f: "raakey" }]],
        [[{ p: "راکه", f: "raaka" }], [{ p: "راکئ", f: "raakey" }]],
      ],
    },
    past: {
      mini: [
        [[{ p: "راکم", f: "raakum" }], [{ p: "راکو", f: "raakoo" }]],
        [[{ p: "راکم", f: "raakum" }], [{ p: "راکو", f: "raakoo" }]],
        [[{ p: "راکې", f: "raake" }], [{ p: "راکئ", f: "raakey" }]],
        [[{ p: "راکې", f: "raake" }], [{ p: "راکئ", f: "raakey" }]],
        [
          [
            { p: "راکه", f: "raaku" },
            { p: "راکو", f: "raako" },
          ],
          [
            { p: "راکړل", f: "raakRul" },
            { p: "راکو", f: "raakoo" },
          ],
        ],
        [[{ p: "راکه", f: "raaka" }], [{ p: "راکې", f: "raake" }]],
      ],
      short: [
        [[{ p: "راکړم", f: "raakRum" }], [{ p: "راکړو", f: "raakRoo" }]],
        [[{ p: "راکړم", f: "raakRum" }], [{ p: "راکړو", f: "raakRoo" }]],
        [[{ p: "راکړې", f: "raakRe" }], [{ p: "راکړئ", f: "raakRey" }]],
        [[{ p: "راکړې", f: "raakRe" }], [{ p: "راکړئ", f: "raakRey" }]],
        [
          [
            { p: "راکړه", f: "raakRu" },
            { p: "راکړو", f: "raakRo" },
            { p: "راکړ", f: "raakuR" },
          ],
          [
            { p: "راکړل", f: "raakRul" },
            { p: "راکړو", f: "raakRoo" },
          ],
        ],
        [[{ p: "راکړه", f: "raakRa" }], [{ p: "راکړې", f: "raakRe" }]],
      ],
      long: [
        [[{ p: "راکړلم", f: "raakRulum" }], [{ p: "راکړلو", f: "raakRuloo" }]],
        [[{ p: "راکړلم", f: "raakRulum" }], [{ p: "راکړلو", f: "raakRuloo" }]],
        [[{ p: "راکړلې", f: "raakRule" }], [{ p: "راکړلئ", f: "raakRuley" }]],
        [[{ p: "راکړلې", f: "raakRule" }], [{ p: "راکړلئ", f: "raakRuley" }]],
        [
          [{ p: "راکړلو", f: "raakRulo" }],
          [
            { p: "راکړل", f: "raakRul" },
            { p: "راکړلو", f: "raakRuloo" },
          ],
        ],
        [[{ p: "راکړله", f: "raakRula" }], [{ p: "راکړلې", f: "raakRule" }]],
      ],
    },
    habitualPast: {
      mini: [
        [
          [{ p: "به راکم", f: "ba raakum" }],
          [{ p: "به راکو", f: "ba raakoo" }],
        ],
        [
          [{ p: "به راکم", f: "ba raakum" }],
          [{ p: "به راکو", f: "ba raakoo" }],
        ],
        [[{ p: "به راکې", f: "ba raake" }], [{ p: "به راکئ", f: "ba raakey" }]],
        [[{ p: "به راکې", f: "ba raake" }], [{ p: "به راکئ", f: "ba raakey" }]],
        [
          [
            { p: "به راکه", f: "ba raaku" },
            { p: "به راکو", f: "ba raako" },
          ],
          [
            { p: "به راکړل", f: "ba raakRul" },
            { p: "به راکو", f: "ba raakoo" },
          ],
        ],
        [[{ p: "به راکه", f: "ba raaka" }], [{ p: "به راکې", f: "ba raake" }]],
      ],
      short: [
        [
          [{ p: "به راکړم", f: "ba raakRum" }],
          [{ p: "به راکړو", f: "ba raakRoo" }],
        ],
        [
          [{ p: "به راکړم", f: "ba raakRum" }],
          [{ p: "به راکړو", f: "ba raakRoo" }],
        ],
        [
          [{ p: "به راکړې", f: "ba raakRe" }],
          [{ p: "به راکړئ", f: "ba raakRey" }],
        ],
        [
          [{ p: "به راکړې", f: "ba raakRe" }],
          [{ p: "به راکړئ", f: "ba raakRey" }],
        ],
        [
          [
            { p: "به راکړه", f: "ba raakRu" },
            { p: "به راکړو", f: "ba raakRo" },
            { p: "به راکړ", f: "ba raakuR" },
          ],
          [
            { p: "به راکړل", f: "ba raakRul" },
            { p: "به راکړو", f: "ba raakRoo" },
          ],
        ],
        [
          [{ p: "به راکړه", f: "ba raakRa" }],
          [{ p: "به راکړې", f: "ba raakRe" }],
        ],
      ],
      long: [
        [
          [{ p: "به راکړلم", f: "ba raakRulum" }],
          [{ p: "به راکړلو", f: "ba raakRuloo" }],
        ],
        [
          [{ p: "به راکړلم", f: "ba raakRulum" }],
          [{ p: "به راکړلو", f: "ba raakRuloo" }],
        ],
        [
          [{ p: "به راکړلې", f: "ba raakRule" }],
          [{ p: "به راکړلئ", f: "ba raakRuley" }],
        ],
        [
          [{ p: "به راکړلې", f: "ba raakRule" }],
          [{ p: "به راکړلئ", f: "ba raakRuley" }],
        ],
        [
          [{ p: "به راکړلو", f: "ba raakRulo" }],
          [
            { p: "به راکړل", f: "ba raakRul" },
            { p: "به راکړلو", f: "ba raakRuloo" },
          ],
        ],
        [
          [{ p: "به راکړله", f: "ba raakRula" }],
          [{ p: "به راکړلې", f: "ba raakRule" }],
        ],
      ],
    },
    modal: {
      nonImperative: {
        long: [
          [
            [
              { p: "راکړلی شم", f: "raakRulay shum" },
              { p: "راکړلای شم", f: "raakRulaay shum" },
            ],
            [
              { p: "راکړلی شو", f: "raakRulay shoo" },
              { p: "راکړلای شو", f: "raakRulaay shoo" },
            ],
          ],
          [
            [
              { p: "راکړلی شم", f: "raakRulay shum" },
              { p: "راکړلای شم", f: "raakRulaay shum" },
            ],
            [
              { p: "راکړلی شو", f: "raakRulay shoo" },
              { p: "راکړلای شو", f: "raakRulaay shoo" },
            ],
          ],
          [
            [
              { p: "راکړلی شې", f: "raakRulay she" },
              { p: "راکړلای شې", f: "raakRulaay she" },
            ],
            [
              { p: "راکړلی شئ", f: "raakRulay shey" },
              { p: "راکړلای شئ", f: "raakRulaay shey" },
            ],
          ],
          [
            [
              { p: "راکړلی شې", f: "raakRulay she" },
              { p: "راکړلای شې", f: "raakRulaay she" },
            ],
            [
              { p: "راکړلی شئ", f: "raakRulay shey" },
              { p: "راکړلای شئ", f: "raakRulaay shey" },
            ],
          ],
          [
            [
              { p: "راکړلی شي", f: "raakRulay shee" },
              { p: "راکړلای شي", f: "raakRulaay shee" },
            ],
            [
              { p: "راکړلی شي", f: "raakRulay shee" },
              { p: "راکړلای شي", f: "raakRulaay shee" },
            ],
          ],
          [
            [
              { p: "راکړلی شي", f: "raakRulay shee" },
              { p: "راکړلای شي", f: "raakRulaay shee" },
            ],
            [
              { p: "راکړلی شي", f: "raakRulay shee" },
              { p: "راکړلای شي", f: "raakRulaay shee" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "راکړی شم", f: "raakRay shum" },
              { p: "راکړای شم", f: "raakRáay shum" },
            ],
            [
              { p: "راکړی شو", f: "raakRay shoo" },
              { p: "راکړای شو", f: "raakRáay shoo" },
            ],
          ],
          [
            [
              { p: "راکړی شم", f: "raakRay shum" },
              { p: "راکړای شم", f: "raakRáay shum" },
            ],
            [
              { p: "راکړی شو", f: "raakRay shoo" },
              { p: "راکړای شو", f: "raakRáay shoo" },
            ],
          ],
          [
            [
              { p: "راکړی شې", f: "raakRay she" },
              { p: "راکړای شې", f: "raakRáay she" },
            ],
            [
              { p: "راکړی شئ", f: "raakRay shey" },
              { p: "راکړای شئ", f: "raakRáay shey" },
            ],
          ],
          [
            [
              { p: "راکړی شې", f: "raakRay she" },
              { p: "راکړای شې", f: "raakRáay she" },
            ],
            [
              { p: "راکړی شئ", f: "raakRay shey" },
              { p: "راکړای شئ", f: "raakRáay shey" },
            ],
          ],
          [
            [
              { p: "راکړی شي", f: "raakRay shee" },
              { p: "راکړای شي", f: "raakRáay shee" },
            ],
            [
              { p: "راکړی شي", f: "raakRay shee" },
              { p: "راکړای شي", f: "raakRáay shee" },
            ],
          ],
          [
            [
              { p: "راکړی شي", f: "raakRay shee" },
              { p: "راکړای شي", f: "raakRáay shee" },
            ],
            [
              { p: "راکړی شي", f: "raakRay shee" },
              { p: "راکړای شي", f: "raakRáay shee" },
            ],
          ],
        ],
      },
      future: {
        long: [
          [
            [
              { p: "به راکړلی شم", f: "ba raakRulay shum" },
              { p: "به راکړلای شم", f: "ba raakRulaay shum" },
            ],
            [
              { p: "به راکړلی شو", f: "ba raakRulay shoo" },
              { p: "به راکړلای شو", f: "ba raakRulaay shoo" },
            ],
          ],
          [
            [
              { p: "به راکړلی شم", f: "ba raakRulay shum" },
              { p: "به راکړلای شم", f: "ba raakRulaay shum" },
            ],
            [
              { p: "به راکړلی شو", f: "ba raakRulay shoo" },
              { p: "به راکړلای شو", f: "ba raakRulaay shoo" },
            ],
          ],
          [
            [
              { p: "به راکړلی شې", f: "ba raakRulay she" },
              { p: "به راکړلای شې", f: "ba raakRulaay she" },
            ],
            [
              { p: "به راکړلی شئ", f: "ba raakRulay shey" },
              { p: "به راکړلای شئ", f: "ba raakRulaay shey" },
            ],
          ],
          [
            [
              { p: "به راکړلی شې", f: "ba raakRulay she" },
              { p: "به راکړلای شې", f: "ba raakRulaay she" },
            ],
            [
              { p: "به راکړلی شئ", f: "ba raakRulay shey" },
              { p: "به راکړلای شئ", f: "ba raakRulaay shey" },
            ],
          ],
          [
            [
              { p: "به راکړلی شي", f: "ba raakRulay shee" },
              { p: "به راکړلای شي", f: "ba raakRulaay shee" },
            ],
            [
              { p: "به راکړلی شي", f: "ba raakRulay shee" },
              { p: "به راکړلای شي", f: "ba raakRulaay shee" },
            ],
          ],
          [
            [
              { p: "به راکړلی شي", f: "ba raakRulay shee" },
              { p: "به راکړلای شي", f: "ba raakRulaay shee" },
            ],
            [
              { p: "به راکړلی شي", f: "ba raakRulay shee" },
              { p: "به راکړلای شي", f: "ba raakRulaay shee" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "به راکړی شم", f: "ba raakRay shum" },
              { p: "به راکړای شم", f: "ba raakRáay shum" },
            ],
            [
              { p: "به راکړی شو", f: "ba raakRay shoo" },
              { p: "به راکړای شو", f: "ba raakRáay shoo" },
            ],
          ],
          [
            [
              { p: "به راکړی شم", f: "ba raakRay shum" },
              { p: "به راکړای شم", f: "ba raakRáay shum" },
            ],
            [
              { p: "به راکړی شو", f: "ba raakRay shoo" },
              { p: "به راکړای شو", f: "ba raakRáay shoo" },
            ],
          ],
          [
            [
              { p: "به راکړی شې", f: "ba raakRay she" },
              { p: "به راکړای شې", f: "ba raakRáay she" },
            ],
            [
              { p: "به راکړی شئ", f: "ba raakRay shey" },
              { p: "به راکړای شئ", f: "ba raakRáay shey" },
            ],
          ],
          [
            [
              { p: "به راکړی شې", f: "ba raakRay she" },
              { p: "به راکړای شې", f: "ba raakRáay she" },
            ],
            [
              { p: "به راکړی شئ", f: "ba raakRay shey" },
              { p: "به راکړای شئ", f: "ba raakRáay shey" },
            ],
          ],
          [
            [
              { p: "به راکړی شي", f: "ba raakRay shee" },
              { p: "به راکړای شي", f: "ba raakRáay shee" },
            ],
            [
              { p: "به راکړی شي", f: "ba raakRay shee" },
              { p: "به راکړای شي", f: "ba raakRáay shee" },
            ],
          ],
          [
            [
              { p: "به راکړی شي", f: "ba raakRay shee" },
              { p: "به راکړای شي", f: "ba raakRáay shee" },
            ],
            [
              { p: "به راکړی شي", f: "ba raakRay shee" },
              { p: "به راکړای شي", f: "ba raakRáay shee" },
            ],
          ],
        ],
      },
      past: {
        long: [
          [
            [
              { p: "راکړلی شوم", f: "raakRulay shwum" },
              { p: "راکړلای شوم", f: "raakRulaay shwum" },
            ],
            [
              { p: "راکړلی شو", f: "raakRulay shoo" },
              { p: "راکړلای شو", f: "raakRulaay shoo" },
            ],
          ],
          [
            [
              { p: "راکړلی شوم", f: "raakRulay shwum" },
              { p: "راکړلای شوم", f: "raakRulaay shwum" },
            ],
            [
              { p: "راکړلی شو", f: "raakRulay shoo" },
              { p: "راکړلای شو", f: "raakRulaay shoo" },
            ],
          ],
          [
            [
              { p: "راکړلی شوې", f: "raakRulay shwe" },
              { p: "راکړلای شوې", f: "raakRulaay shwe" },
            ],
            [
              { p: "راکړلی شوئ", f: "raakRulay shwey" },
              { p: "راکړلای شوئ", f: "raakRulaay shwey" },
            ],
          ],
          [
            [
              { p: "راکړلی شوې", f: "raakRulay shwe" },
              { p: "راکړلای شوې", f: "raakRulaay shwe" },
            ],
            [
              { p: "راکړلی شوئ", f: "raakRulay shwey" },
              { p: "راکړلای شوئ", f: "raakRulaay shwey" },
            ],
          ],
          [
            [
              { p: "راکړلی شو", f: "raakRulay sho" },
              { p: "راکړلای شو", f: "raakRulaay sho" },
            ],
            [
              { p: "راکړلی شول", f: "raakRulay shwul" },
              { p: "راکړلای شول", f: "raakRulaay shwul" },
              { p: "راکړلی شو", f: "raakRulay shoo" },
              { p: "راکړلای شو", f: "raakRulaay shoo" },
            ],
          ],
          [
            [
              { p: "راکړلی شوه", f: "raakRulay shwa" },
              { p: "راکړلای شوه", f: "raakRulaay shwa" },
            ],
            [
              { p: "راکړلی شولې", f: "raakRulay shwule" },
              { p: "راکړلای شولې", f: "raakRulaay shwule" },
              { p: "راکړلی شوې", f: "raakRulay shwe" },
              { p: "راکړلای شوې", f: "raakRulaay shwe" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "راکړی شوم", f: "raakRay shwum" },
              { p: "راکړای شوم", f: "raakRáay shwum" },
            ],
            [
              { p: "راکړی شو", f: "raakRay shoo" },
              { p: "راکړای شو", f: "raakRáay shoo" },
            ],
          ],
          [
            [
              { p: "راکړی شوم", f: "raakRay shwum" },
              { p: "راکړای شوم", f: "raakRáay shwum" },
            ],
            [
              { p: "راکړی شو", f: "raakRay shoo" },
              { p: "راکړای شو", f: "raakRáay shoo" },
            ],
          ],
          [
            [
              { p: "راکړی شوې", f: "raakRay shwe" },
              { p: "راکړای شوې", f: "raakRáay shwe" },
            ],
            [
              { p: "راکړی شوئ", f: "raakRay shwey" },
              { p: "راکړای شوئ", f: "raakRáay shwey" },
            ],
          ],
          [
            [
              { p: "راکړی شوې", f: "raakRay shwe" },
              { p: "راکړای شوې", f: "raakRáay shwe" },
            ],
            [
              { p: "راکړی شوئ", f: "raakRay shwey" },
              { p: "راکړای شوئ", f: "raakRáay shwey" },
            ],
          ],
          [
            [
              { p: "راکړی شو", f: "raakRay sho" },
              { p: "راکړای شو", f: "raakRáay sho" },
            ],
            [
              { p: "راکړی شول", f: "raakRay shwul" },
              { p: "راکړای شول", f: "raakRáay shwul" },
              { p: "راکړی شو", f: "raakRay shoo" },
              { p: "راکړای شو", f: "raakRáay shoo" },
            ],
          ],
          [
            [
              { p: "راکړی شوه", f: "raakRay shwa" },
              { p: "راکړای شوه", f: "raakRáay shwa" },
            ],
            [
              { p: "راکړی شولې", f: "raakRay shwule" },
              { p: "راکړای شولې", f: "raakRáay shwule" },
              { p: "راکړی شوې", f: "raakRay shwe" },
              { p: "راکړای شوې", f: "raakRáay shwe" },
            ],
          ],
        ],
      },
      habitualPast: {
        long: [
          [
            [
              { p: "به راکړلی شوم", f: "ba raakRulay shwum" },
              { p: "به راکړلای شوم", f: "ba raakRulaay shwum" },
            ],
            [
              { p: "به راکړلی شو", f: "ba raakRulay shoo" },
              { p: "به راکړلای شو", f: "ba raakRulaay shoo" },
            ],
          ],
          [
            [
              { p: "به راکړلی شوم", f: "ba raakRulay shwum" },
              { p: "به راکړلای شوم", f: "ba raakRulaay shwum" },
            ],
            [
              { p: "به راکړلی شو", f: "ba raakRulay shoo" },
              { p: "به راکړلای شو", f: "ba raakRulaay shoo" },
            ],
          ],
          [
            [
              { p: "به راکړلی شوې", f: "ba raakRulay shwe" },
              { p: "به راکړلای شوې", f: "ba raakRulaay shwe" },
            ],
            [
              { p: "به راکړلی شوئ", f: "ba raakRulay shwey" },
              { p: "به راکړلای شوئ", f: "ba raakRulaay shwey" },
            ],
          ],
          [
            [
              { p: "به راکړلی شوې", f: "ba raakRulay shwe" },
              { p: "به راکړلای شوې", f: "ba raakRulaay shwe" },
            ],
            [
              { p: "به راکړلی شوئ", f: "ba raakRulay shwey" },
              { p: "به راکړلای شوئ", f: "ba raakRulaay shwey" },
            ],
          ],
          [
            [
              { p: "به راکړلی شو", f: "ba raakRulay sho" },
              { p: "به راکړلای شو", f: "ba raakRulaay sho" },
            ],
            [
              { p: "به راکړلی شول", f: "ba raakRulay shwul" },
              { p: "به راکړلای شول", f: "ba raakRulaay shwul" },
              { p: "به راکړلی شو", f: "ba raakRulay shoo" },
              { p: "به راکړلای شو", f: "ba raakRulaay shoo" },
            ],
          ],
          [
            [
              { p: "به راکړلی شوه", f: "ba raakRulay shwa" },
              { p: "به راکړلای شوه", f: "ba raakRulaay shwa" },
            ],
            [
              { p: "به راکړلی شولې", f: "ba raakRulay shwule" },
              { p: "به راکړلای شولې", f: "ba raakRulaay shwule" },
              { p: "به راکړلی شوې", f: "ba raakRulay shwe" },
              { p: "به راکړلای شوې", f: "ba raakRulaay shwe" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "به راکړی شوم", f: "ba raakRay shwum" },
              { p: "به راکړای شوم", f: "ba raakRáay shwum" },
            ],
            [
              { p: "به راکړی شو", f: "ba raakRay shoo" },
              { p: "به راکړای شو", f: "ba raakRáay shoo" },
            ],
          ],
          [
            [
              { p: "به راکړی شوم", f: "ba raakRay shwum" },
              { p: "به راکړای شوم", f: "ba raakRáay shwum" },
            ],
            [
              { p: "به راکړی شو", f: "ba raakRay shoo" },
              { p: "به راکړای شو", f: "ba raakRáay shoo" },
            ],
          ],
          [
            [
              { p: "به راکړی شوې", f: "ba raakRay shwe" },
              { p: "به راکړای شوې", f: "ba raakRáay shwe" },
            ],
            [
              { p: "به راکړی شوئ", f: "ba raakRay shwey" },
              { p: "به راکړای شوئ", f: "ba raakRáay shwey" },
            ],
          ],
          [
            [
              { p: "به راکړی شوې", f: "ba raakRay shwe" },
              { p: "به راکړای شوې", f: "ba raakRáay shwe" },
            ],
            [
              { p: "به راکړی شوئ", f: "ba raakRay shwey" },
              { p: "به راکړای شوئ", f: "ba raakRáay shwey" },
            ],
          ],
          [
            [
              { p: "به راکړی شو", f: "ba raakRay sho" },
              { p: "به راکړای شو", f: "ba raakRáay sho" },
            ],
            [
              { p: "به راکړی شول", f: "ba raakRay shwul" },
              { p: "به راکړای شول", f: "ba raakRáay shwul" },
              { p: "به راکړی شو", f: "ba raakRay shoo" },
              { p: "به راکړای شو", f: "ba raakRáay shoo" },
            ],
          ],
          [
            [
              { p: "به راکړی شوه", f: "ba raakRay shwa" },
              { p: "به راکړای شوه", f: "ba raakRáay shwa" },
            ],
            [
              { p: "به راکړی شولې", f: "ba raakRay shwule" },
              { p: "به راکړای شولې", f: "ba raakRáay shwule" },
              { p: "به راکړی شوې", f: "ba raakRay shwe" },
              { p: "به راکړای شوې", f: "ba raakRáay shwe" },
            ],
          ],
        ],
      },
      hypotheticalPast: {
        long: [
          [
            [
              { p: "راکړلی شوای", f: "raakRulay shwaay" },
              { p: "راکړلی شوی", f: "raakRulay shway" },
              { p: "راکړلای شوای", f: "raakRulaay shwaay" },
            ],
            [
              { p: "راکړلی شوای", f: "raakRulay shwaay" },
              { p: "راکړلی شوی", f: "raakRulay shway" },
              { p: "راکړلای شوای", f: "raakRulaay shwaay" },
            ],
          ],
          [
            [
              { p: "راکړلی شوای", f: "raakRulay shwaay" },
              { p: "راکړلی شوی", f: "raakRulay shway" },
              { p: "راکړلای شوای", f: "raakRulaay shwaay" },
            ],
            [
              { p: "راکړلی شوای", f: "raakRulay shwaay" },
              { p: "راکړلی شوی", f: "raakRulay shway" },
              { p: "راکړلای شوای", f: "raakRulaay shwaay" },
            ],
          ],
          [
            [
              { p: "راکړلی شوای", f: "raakRulay shwaay" },
              { p: "راکړلی شوی", f: "raakRulay shway" },
              { p: "راکړلای شوای", f: "raakRulaay shwaay" },
            ],
            [
              { p: "راکړلی شوای", f: "raakRulay shwaay" },
              { p: "راکړلی شوی", f: "raakRulay shway" },
              { p: "راکړلای شوای", f: "raakRulaay shwaay" },
            ],
          ],
          [
            [
              { p: "راکړلی شوای", f: "raakRulay shwaay" },
              { p: "راکړلی شوی", f: "raakRulay shway" },
              { p: "راکړلای شوای", f: "raakRulaay shwaay" },
            ],
            [
              { p: "راکړلی شوای", f: "raakRulay shwaay" },
              { p: "راکړلی شوی", f: "raakRulay shway" },
              { p: "راکړلای شوای", f: "raakRulaay shwaay" },
            ],
          ],
          [
            [
              { p: "راکړلی شوای", f: "raakRulay shwaay" },
              { p: "راکړلی شوی", f: "raakRulay shway" },
              { p: "راکړلای شوای", f: "raakRulaay shwaay" },
            ],
            [
              { p: "راکړلی شوای", f: "raakRulay shwaay" },
              { p: "راکړلی شوی", f: "raakRulay shway" },
              { p: "راکړلای شوای", f: "raakRulaay shwaay" },
            ],
          ],
          [
            [
              { p: "راکړلی شوای", f: "raakRulay shwaay" },
              { p: "راکړلی شوی", f: "raakRulay shway" },
              { p: "راکړلای شوای", f: "raakRulaay shwaay" },
            ],
            [
              { p: "راکړلی شوای", f: "raakRulay shwaay" },
              { p: "راکړلی شوی", f: "raakRulay shway" },
              { p: "راکړلای شوای", f: "raakRulaay shwaay" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "راکړی شوای", f: "raakRay shwaay" },
              { p: "راکړی شوی", f: "raakRay shway" },
              { p: "راکړای شوای", f: "raakRáay shwaay" },
            ],
            [
              { p: "راکړی شوای", f: "raakRay shwaay" },
              { p: "راکړی شوی", f: "raakRay shway" },
              { p: "راکړای شوای", f: "raakRáay shwaay" },
            ],
          ],
          [
            [
              { p: "راکړی شوای", f: "raakRay shwaay" },
              { p: "راکړی شوی", f: "raakRay shway" },
              { p: "راکړای شوای", f: "raakRáay shwaay" },
            ],
            [
              { p: "راکړی شوای", f: "raakRay shwaay" },
              { p: "راکړی شوی", f: "raakRay shway" },
              { p: "راکړای شوای", f: "raakRáay shwaay" },
            ],
          ],
          [
            [
              { p: "راکړی شوای", f: "raakRay shwaay" },
              { p: "راکړی شوی", f: "raakRay shway" },
              { p: "راکړای شوای", f: "raakRáay shwaay" },
            ],
            [
              { p: "راکړی شوای", f: "raakRay shwaay" },
              { p: "راکړی شوی", f: "raakRay shway" },
              { p: "راکړای شوای", f: "raakRáay shwaay" },
            ],
          ],
          [
            [
              { p: "راکړی شوای", f: "raakRay shwaay" },
              { p: "راکړی شوی", f: "raakRay shway" },
              { p: "راکړای شوای", f: "raakRáay shwaay" },
            ],
            [
              { p: "راکړی شوای", f: "raakRay shwaay" },
              { p: "راکړی شوی", f: "raakRay shway" },
              { p: "راکړای شوای", f: "raakRáay shwaay" },
            ],
          ],
          [
            [
              { p: "راکړی شوای", f: "raakRay shwaay" },
              { p: "راکړی شوی", f: "raakRay shway" },
              { p: "راکړای شوای", f: "raakRáay shwaay" },
            ],
            [
              { p: "راکړی شوای", f: "raakRay shwaay" },
              { p: "راکړی شوی", f: "raakRay shway" },
              { p: "راکړای شوای", f: "raakRáay shwaay" },
            ],
          ],
          [
            [
              { p: "راکړی شوای", f: "raakRay shwaay" },
              { p: "راکړی شوی", f: "raakRay shway" },
              { p: "راکړای شوای", f: "raakRáay shwaay" },
            ],
            [
              { p: "راکړی شوای", f: "raakRay shwaay" },
              { p: "راکړی شوی", f: "raakRay shway" },
              { p: "راکړای شوای", f: "raakRáay shwaay" },
            ],
          ],
        ],
      },
    },
  },
  hypothetical: {
    short: [
      [
        [
          { p: "راکوی", f: "raakawáy" },
          { p: "راکوای", f: "raakawáay" },
        ],
        [
          { p: "راکوی", f: "raakawáy" },
          { p: "راکوای", f: "raakawáay" },
        ],
      ],
      [
        [
          { p: "راکوی", f: "raakawáy" },
          { p: "راکوای", f: "raakawáay" },
        ],
        [
          { p: "راکوی", f: "raakawáy" },
          { p: "راکوای", f: "raakawáay" },
        ],
      ],
      [
        [
          { p: "راکوی", f: "raakawáy" },
          { p: "راکوای", f: "raakawáay" },
        ],
        [
          { p: "راکوی", f: "raakawáy" },
          { p: "راکوای", f: "raakawáay" },
        ],
      ],
      [
        [
          { p: "راکوی", f: "raakawáy" },
          { p: "راکوای", f: "raakawáay" },
        ],
        [
          { p: "راکوی", f: "raakawáy" },
          { p: "راکوای", f: "raakawáay" },
        ],
      ],
      [
        [
          { p: "راکوی", f: "raakawáy" },
          { p: "راکوای", f: "raakawáay" },
        ],
        [
          { p: "راکوی", f: "raakawáy" },
          { p: "راکوای", f: "raakawáay" },
        ],
      ],
      [
        [
          { p: "راکوی", f: "raakawáy" },
          { p: "راکوای", f: "raakawáay" },
        ],
        [
          { p: "راکوی", f: "raakawáy" },
          { p: "راکوای", f: "raakawáay" },
        ],
      ],
    ],
    long: [
      [
        [
          { p: "راکولی", f: "raakawúlay" },
          { p: "راکولای", f: "raakawúlaay" },
        ],
        [
          { p: "راکولی", f: "raakawúlay" },
          { p: "راکولای", f: "raakawúlaay" },
        ],
      ],
      [
        [
          { p: "راکولی", f: "raakawúlay" },
          { p: "راکولای", f: "raakawúlaay" },
        ],
        [
          { p: "راکولی", f: "raakawúlay" },
          { p: "راکولای", f: "raakawúlaay" },
        ],
      ],
      [
        [
          { p: "راکولی", f: "raakawúlay" },
          { p: "راکولای", f: "raakawúlaay" },
        ],
        [
          { p: "راکولی", f: "raakawúlay" },
          { p: "راکولای", f: "raakawúlaay" },
        ],
      ],
      [
        [
          { p: "راکولی", f: "raakawúlay" },
          { p: "راکولای", f: "raakawúlaay" },
        ],
        [
          { p: "راکولی", f: "raakawúlay" },
          { p: "راکولای", f: "raakawúlaay" },
        ],
      ],
      [
        [
          { p: "راکولی", f: "raakawúlay" },
          { p: "راکولای", f: "raakawúlaay" },
        ],
        [
          { p: "راکولی", f: "raakawúlay" },
          { p: "راکولای", f: "raakawúlaay" },
        ],
      ],
      [
        [
          { p: "راکولی", f: "raakawúlay" },
          { p: "راکولای", f: "raakawúlaay" },
        ],
        [
          { p: "راکولی", f: "raakawúlay" },
          { p: "راکولای", f: "raakawúlaay" },
        ],
      ],
    ],
  },
  participle: {
    past: {
      masc: [
        [{ p: "راکړی", f: "raakúRay" }],
        [{ p: "راکړي", f: "raakúRee" }],
        [
          { p: "راکړیو", f: "raakúRiyo" },
          { p: "راکړو", f: "raakúRo" },
        ],
      ],
      fem: [
        [{ p: "راکړې", f: "raakúRe" }],
        [{ p: "راکړې", f: "raakúRe" }],
        [{ p: "راکړو", f: "raakúRo" }],
      ],
    },
    present: {
      masc: [
        [{ p: "راکوونکی", f: "raakawóonkay" }],
        [{ p: "راکوونکي", f: "raakawóonkee" }],
        [
          { p: "راکوونکیو", f: "raakawóonkiyo" },
          { p: "راکوونکو", f: "raakedóonko" },
        ],
      ],
      fem: [
        [{ p: "راکوونکې", f: "raakawóonke" }],
        [{ p: "راکوونکې", f: "raakawóonke" }],
        [{ p: "راکوونکو", f: "raakawóonko" }],
      ],
    },
  },
  perfect: {
    halfPerfect: [
      [[{ p: "راکړی", f: "raakúRay" }], [{ p: "راکړي", f: "raakúRee" }]],
      [[{ p: "راکړې", f: "raakúRe" }], [{ p: "راکړې", f: "raakúRe" }]],
      [[{ p: "راکړی", f: "raakúRay" }], [{ p: "راکړي", f: "raakúRee" }]],
      [[{ p: "راکړې", f: "raakúRe" }], [{ p: "راکړې", f: "raakúRe" }]],
      [[{ p: "راکړی", f: "raakúRay" }], [{ p: "راکړي", f: "raakúRee" }]],
      [[{ p: "راکړې", f: "raakúRe" }], [{ p: "راکړې", f: "raakúRe" }]],
    ],
    past: [
      [
        [{ p: "راکړی وم", f: "raakúRay wum" }],
        [{ p: "راکړي وو", f: "raakúRee woo" }],
      ],
      [
        [{ p: "راکړې وم", f: "raakúRe wum" }],
        [{ p: "راکړې وو", f: "raakúRe woo" }],
      ],
      [
        [{ p: "راکړی وې", f: "raakúRay we" }],
        [{ p: "راکړي وئ", f: "raakúRee wey" }],
      ],
      [
        [{ p: "راکړې وې", f: "raakúRe we" }],
        [{ p: "راکړې وئ", f: "raakúRe wey" }],
      ],
      [
        [{ p: "راکړی و", f: "raakúRay wo" }],
        [{ p: "راکړي وو", f: "raakúRee woo" }],
      ],
      [
        [{ p: "راکړې وه", f: "raakúRe wa" }],
        [{ p: "راکړې وې", f: "raakúRe we" }],
      ],
    ],
    present: [
      [
        [{ p: "راکړی یم", f: "raakúRay yum" }],
        [{ p: "راکړي یو", f: "raakúRee yoo" }],
      ],
      [
        [{ p: "راکړې یم", f: "raakúRe yum" }],
        [{ p: "راکړې یو", f: "raakúRe yoo" }],
      ],
      [
        [{ p: "راکړی یې", f: "raakúRay ye" }],
        [{ p: "راکړي یئ", f: "raakúRee yey" }],
      ],
      [
        [{ p: "راکړې یې", f: "raakúRe ye" }],
        [{ p: "راکړې یئ", f: "raakúRe yey" }],
      ],
      [
        [{ p: "راکړی دی", f: "raakúRay day" }],
        [{ p: "راکړي دي", f: "raakúRee dee" }],
      ],
      [
        [{ p: "راکړې ده", f: "raakúRe da" }],
        [{ p: "راکړې دي", f: "raakúRe dee" }],
      ],
    ],
    habitual: [
      [
        [{ p: "راکړی یم", f: "raakúRay yum" }],
        [{ p: "راکړي یو", f: "raakúRee yoo" }],
      ],
      [
        [{ p: "راکړې یم", f: "raakúRe yum" }],
        [{ p: "راکړې یو", f: "raakúRe yoo" }],
      ],
      [
        [{ p: "راکړی یې", f: "raakúRay ye" }],
        [{ p: "راکړي یئ", f: "raakúRee yey" }],
      ],
      [
        [{ p: "راکړې یې", f: "raakúRe ye" }],
        [{ p: "راکړې یئ", f: "raakúRe yey" }],
      ],
      [
        [{ p: "راکړی وي", f: "raakúRay wee" }],
        [{ p: "راکړي وي", f: "raakúRee wee" }],
      ],
      [
        [{ p: "راکړې وي", f: "raakúRe wee" }],
        [{ p: "راکړې وي", f: "raakúRe wee" }],
      ],
    ],
    subjunctive: [
      [
        [{ p: "راکړی وم", f: "raakúRay wum" }],
        [{ p: "راکړي وو", f: "raakúRee woo" }],
      ],
      [
        [{ p: "راکړې وم", f: "raakúRe wum" }],
        [{ p: "راکړې وو", f: "raakúRe woo" }],
      ],
      [
        [{ p: "راکړی وې", f: "raakúRay we" }],
        [{ p: "راکړي وئ", f: "raakúRee wey" }],
      ],
      [
        [{ p: "راکړې وې", f: "raakúRe we" }],
        [{ p: "راکړې وئ", f: "raakúRe wey" }],
      ],
      [
        [{ p: "راکړی وي", f: "raakúRay wee" }],
        [{ p: "راکړي وي", f: "raakúRee wee" }],
      ],
      [
        [{ p: "راکړې وي", f: "raakúRe wee" }],
        [{ p: "راکړې وي", f: "raakúRe wee" }],
      ],
    ],
    future: [
      [
        [{ p: "به راکړی یم", f: "ba raakúRay yum" }],
        [{ p: "به راکړي یو", f: "ba raakúRee yoo" }],
      ],
      [
        [{ p: "به راکړې یم", f: "ba raakúRe yum" }],
        [{ p: "به راکړې یو", f: "ba raakúRe yoo" }],
      ],
      [
        [{ p: "به راکړی یې", f: "ba raakúRay ye" }],
        [{ p: "به راکړي یئ", f: "ba raakúRee yey" }],
      ],
      [
        [{ p: "به راکړې یې", f: "ba raakúRe ye" }],
        [{ p: "به راکړې یئ", f: "ba raakúRe yey" }],
      ],
      [
        [{ p: "به راکړی وي", f: "ba raakúRay wee" }],
        [{ p: "به راکړي وي", f: "ba raakúRee wee" }],
      ],
      [
        [{ p: "به راکړې وي", f: "ba raakúRe wee" }],
        [{ p: "به راکړې وي", f: "ba raakúRe wee" }],
      ],
    ],
    wouldBe: [
      [
        [{ p: "به راکړی وم", f: "ba raakúRay wum" }],
        [{ p: "به راکړي وو", f: "ba raakúRee woo" }],
      ],
      [
        [{ p: "به راکړې وم", f: "ba raakúRe wum" }],
        [{ p: "به راکړې وو", f: "ba raakúRe woo" }],
      ],
      [
        [{ p: "به راکړی وې", f: "ba raakúRay we" }],
        [{ p: "به راکړي وئ", f: "ba raakúRee wey" }],
      ],
      [
        [{ p: "به راکړې وې", f: "ba raakúRe we" }],
        [{ p: "به راکړې وئ", f: "ba raakúRe wey" }],
      ],
      [
        [{ p: "به راکړی و", f: "ba raakúRay wo" }],
        [{ p: "به راکړي وو", f: "ba raakúRee woo" }],
      ],
      [
        [{ p: "به راکړې وه", f: "ba raakúRe wa" }],
        [{ p: "به راکړې وې", f: "ba raakúRe we" }],
      ],
    ],
    pastSubjunctive: [
      [
        [
          { p: "راکړی وای", f: "raakúRay waay" },
          { p: "راکړی وی", f: "raakúRay way" },
        ],
        [
          { p: "راکړی وای", f: "raakúRay waay" },
          { p: "راکړی وی", f: "raakúRay way" },
        ],
      ],
      [
        [
          { p: "راکړې وای", f: "raakúRe waay" },
          { p: "راکړې وی", f: "raakúRe way" },
        ],
        [
          { p: "راکړې وای", f: "raakúRe waay" },
          { p: "راکړې وی", f: "raakúRe way" },
        ],
      ],
      [
        [
          { p: "راکړی وای", f: "raakúRay waay" },
          { p: "راکړی وی", f: "raakúRay way" },
        ],
        [
          { p: "راکړی وای", f: "raakúRay waay" },
          { p: "راکړی وی", f: "raakúRay way" },
        ],
      ],
      [
        [
          { p: "راکړې وای", f: "raakúRe waay" },
          { p: "راکړې وی", f: "raakúRe way" },
        ],
        [
          { p: "راکړې وای", f: "raakúRe waay" },
          { p: "راکړې وی", f: "raakúRe way" },
        ],
      ],
      [
        [
          { p: "راکړی وای", f: "raakúRay waay" },
          { p: "راکړی وی", f: "raakúRay way" },
        ],
        [
          { p: "راکړی وای", f: "raakúRay waay" },
          { p: "راکړی وی", f: "raakúRay way" },
        ],
      ],
      [
        [
          { p: "راکړې وای", f: "raakúRe waay" },
          { p: "راکړې وی", f: "raakúRe way" },
        ],
        [
          { p: "راکړې وای", f: "raakúRe waay" },
          { p: "راکړې وی", f: "raakúRe way" },
        ],
      ],
    ],
    wouldHaveBeen: [
      [
        [
          { p: "به راکړی وای", f: "ba raakúRay waay" },
          { p: "به راکړی وی", f: "ba raakúRay way" },
        ],
        [
          { p: "به راکړی وای", f: "ba raakúRay waay" },
          { p: "به راکړی وی", f: "ba raakúRay way" },
        ],
      ],
      [
        [
          { p: "به راکړې وای", f: "ba raakúRe waay" },
          { p: "به راکړې وی", f: "ba raakúRe way" },
        ],
        [
          { p: "به راکړې وای", f: "ba raakúRe waay" },
          { p: "به راکړې وی", f: "ba raakúRe way" },
        ],
      ],
      [
        [
          { p: "به راکړی وای", f: "ba raakúRay waay" },
          { p: "به راکړی وی", f: "ba raakúRay way" },
        ],
        [
          { p: "به راکړی وای", f: "ba raakúRay waay" },
          { p: "به راکړی وی", f: "ba raakúRay way" },
        ],
      ],
      [
        [
          { p: "به راکړې وای", f: "ba raakúRe waay" },
          { p: "به راکړې وی", f: "ba raakúRe way" },
        ],
        [
          { p: "به راکړې وای", f: "ba raakúRe waay" },
          { p: "به راکړې وی", f: "ba raakúRe way" },
        ],
      ],
      [
        [
          { p: "به راکړی وای", f: "ba raakúRay waay" },
          { p: "به راکړی وی", f: "ba raakúRay way" },
        ],
        [
          { p: "به راکړی وای", f: "ba raakúRay waay" },
          { p: "به راکړی وی", f: "ba raakúRay way" },
        ],
      ],
      [
        [
          { p: "به راکړې وای", f: "ba raakúRe waay" },
          { p: "به راکړې وی", f: "ba raakúRe way" },
        ],
        [
          { p: "به راکړې وای", f: "ba raakúRe waay" },
          { p: "به راکړې وی", f: "ba raakúRe way" },
        ],
      ],
    ],
  },
  // passive: {
  //     imperfective: {
  //         nonImperative: [
  //             [{p: "راکول کېږم", f: "raakawul keGum"}, {p: "راکول کېږو", f: "raakawul keGoo"}],
  //             [{p: "راکول کېږې", f: "raakawul keGe"}, {p: "راکول کېږئ", f: "raakawul keGey"}],
  //             [{p: "راکول کېږي", f: "raakawul keGee"}, {p: "راکول کېږي", f: "raakawul keGee"}],
  //         ],
  //         future: [
  //             [{p: "به راکول کېږم", f: "ba raakawul keGum"}, {p: "به راکول کېږو", f: "ba raakawul keGoo"}],
  //             [{p: "به راکول کېږې", f: "ba raakawul keGe"}, {p: "به راکول کېږئ", f: "ba raakawul keGey"}],
  //             [{p: "به راکول کېږي", f: "ba raakawul keGee"}, {p: "به راکول کېږي", f: "ba raakawul keGee"}],
  //         ],
  //         past: {
  //             short: [
  //                 [[{p: "راکول کېدم", f: "raakawul kedum"}], [{p: "راکول کېدو", f: "raakawul kedóo"}]],
  //                 [[{p: "راکول کېدم", f: "raakawul kedum"}], [{p: "راکول کېدو", f: "raakawul kedóo"}]],
  //                 [[{p: "راکول کېدې", f: "raakawul kedé"}], [{p: "راکول کېدئ", f: "raakawul kedéy"}]],
  //                 [[{p: "راکول کېدې", f: "raakawul kedé"}], [{p: "راکول کېدئ", f: "raakawul kedéy"}]],
  //                 [[{p: "راکول کېده", f: "raakawul kedu"}, {p: "راکول کېدو", f: "raakawul kedó"}], [{p: "راکول کېدل", f: "raakawul kedul"}]],
  //                 [[{p: "راکول کېده", f: "raakawul kedá"}], [{p: "راکول کېدې", f: "raakawul kedé"}]],
  //             ],
  //             long: [
  //                 [[{p: "راکول کېدلم", f: "raakawul kedúlum"}], [{p: "راکول کېدلو", f: "raakawul kedúloo"}]],
  //                 [[{p: "راکول کېدلم", f: "raakawul kedúlum"}], [{p: "راکول کېدلو", f: "raakawul kedúloo"}]],
  //                 [[{p: "راکول کېدلې", f: "raakawul kedúle"}], [{p: "راکول کېدلئ", f: "raakawul kedúley"}]],
  //                 [[{p: "راکول کېدلې", f: "raakawul kedúle"}], [{p: "راکول کېدلئ", f: "raakawul kedúley"}]],
  //                 [[{p: "راکول کېدله", f: "raakawul kedúlu"}, {p: "راکول کېدلو", f: "raakawul kedúlo"}], [{p: "راکول کېدل", f: "raakawul kedúl"}]],
  //                 [[{p: "راکول کېدله", f: "raakawul kedúla"}], [{p: "راکول کېدلې", f: "raakawul kedúle"}]],
  //             ],
  //         },
  //     },
  //     perfective: {
  //         nonImperative: {
  //             short: [
  //                 [{p: "راکړلی کېږم", f: "raakRulay keGum"}, {p: "راکړلی کېږو", f: "raakRulay keGoo"}],
  //                 [{p: "راکړلی کېږې", f: "raakRulay keGe"}, {p: "راکړلی کېږئ", f: "raakRulay keGey"}],
  //                 [{p: "راکړلی کېږي", f: "raakRulay keGee"}, {p: "راکړلی کېږي", f: "raakRulay keGee"}],
  //             ],
  //             long: [
  //                 [{p: "راکړی کېږم", f: "raakRay keGum"}, {p: "راکړی کېږو", f: "raakRay keGoo"}],
  //                 [{p: "راکړی کېږې", f: "raakRay keGe"}, {p: "راکړی کېږئ", f: "raakRay keGey"}],
  //                 [{p: "راکړی کېږي", f: "raakRay keGee"}, {p: "راکړی کېږي", f: "raakRay keGee"}],
  //             ],
  //         },
  //         future: {
  //             short: [
  //                 [{p: "به راکړلی کېږم", f: "ba raakRulay keGum"}, {p: "به راکړلی کېږو", f: "ba raakRulay keGoo"}],
  //                 [{p: "به راکړلی کېږې", f: "ba raakRulay keGe"}, {p: "به راکړلی کېږئ", f: "ba raakRulay keGey"}],
  //                 [{p: "به راکړلی کېږي", f: "ba raakRulay keGee"}, {p: "به راکړلی کېږي", f: "ba raakRulay keGee"}],
  //             ],
  //             long: [
  //                 [{p: "به راکړی کېږم", f: "ba raakRay keGum"}, {p: "به راکړی کېږو", f: "ba raakRay keGoo"}],
  //                 [{p: "به راکړی کېږې", f: "ba raakRay keGe"}, {p: "به راکړی کېږئ", f: "ba raakRay keGey"}],
  //                 [{p: "به راکړی کېږي", f: "ba raakRay keGee"}, {p: "به راکړی کېږي", f: "ba raakRay keGee"}],
  //             ],
  //         },
  //         past: {
  //             short: [
  //                 [[{p: "راکړی شوم", f: "raakRay shwum"}], [{p: "راکړی شو", f: "raakRay shoo"}]],
  //                 [[{p: "راکړی شوم", f: "raakRay shwum"}], [{p: "راکړی شو", f: "raakRay shoo"}]],
  //                 [[{p: "راکړی شوې", f: "raakRay shwe"}], [{p: "راکړی شوئ", f: "raakRay shwey"}]],
  //                 [[{p: "راکړی شوې", f: "raakRay shwe"}], [{p: "راکړی شوئ", f: "raakRay shwey"}]],
  //                 [[{p: "راکړی شو", f: "raakRay sho"}], [{p: "راکړی شو", f: "raakRay shoo"}, {p: "راکړی شول", f: "raakRay shwul"}]],
  //                 [[{p: "راکړی شوه", f: "raakRay shwa"}], [{p: "راکړی شوې", f: "raakRay shwe"}]],
  //             ],
  //             long: [
  //                 [[{p: "راکړلی شوم", f: "raakRúlay shwum"}], [{p: "راکړلی شو", f: "raakRúlay shoo"}]],
  //                 [[{p: "راکړلی شوم", f: "raakRúlay shwum"}], [{p: "راکړلی شو", f: "raakRúlay shoo"}]],
  //                 [[{p: "راکړلی شوې", f: "raakRúlay shwe"}], [{p: "راکړلی شوئ", f: "raakRúlay shwey"}]],
  //                 [[{p: "راکړلی شوې", f: "raakRúlay shwe"}], [{p: "راکړلی شوئ", f: "raakRúlay shwey"}]],
  //                 [[{p: "راکړلی شو", f: "raakRúlay sho"}], [{p: "راکړلی شو", f: "raakRúlay shoo"}, {p: "راکړلی شول", f: "raakRúlay shwul"}]],
  //                 [[{p: "راکړلی شوه", f: "raakRúlay shwa"}], [{p: "راکړلی شوې", f: "raakRúlay shwe"}]],
  //             ],
  //         },
  //     },
  //     perfect: {
  //         halfPerfect: {
  //             short: [
  //                 [[{p: "راکړی شوی", f: "raakRáy shuway"}], [{p: "راکړی شوي", f: "raakRáy shuwee"}]],
  //                 [[{p: "راکړی شوې", f: "raakRáy shuwe"}], [{p: "راکړی شوې", f: "raakRáy shuwe"}]],
  //                 [[{p: "راکړی شوی", f: "raakRáy shuway"}], [{p: "راکړی شوي", f: "raakRáy shuwee"}]],
  //                 [[{p: "راکړی شوې", f: "raakRáy shuwe"}], [{p: "راکړی شوې", f: "raakRáy shuwe"}]],
  //                 [[{p: "راکړی شوی", f: "raakRáy shuway"}], [{p: "راکړی شوي", f: "raakRáy shuwee"}]],
  //                 [[{p: "راکړی شوې", f: "raakRáy shuwe"}], [{p: "راکړی شوې", f: "raakRáy shuwe"}]],
  //             ],
  //             long: [
  //                 [[{p: "راکړلی شوی", f: "raakRúlay shuway"}], [{p: "راکړلی شوي", f: "raakRúlay shuwee"}]],
  //                 [[{p: "راکړلی شوې", f: "raakRúlay shuwe"}], [{p: "راکړلی شوې", f: "raakRúlay shuwe"}]],
  //                 [[{p: "راکړلی شوی", f: "raakRúlay shuway"}], [{p: "راکړلی شوي", f: "raakRúlay shuwee"}]],
  //                 [[{p: "راکړلی شوې", f: "raakRúlay shuwe"}], [{p: "راکړلی شوې", f: "raakRúlay shuwe"}]],
  //                 [[{p: "راکړلی شوی", f: "raakRúlay shuway"}], [{p: "راکړلی شوي", f: "raakRúlay shuwee"}]],
  //                 [[{p: "راکړلی شوې", f: "raakRúlay shuwe"}], [{p: "راکړلی شوې", f: "raakRúlay shuwe"}]],
  //             ],
  //         },
  //         past: {
  //             short: [
  //                 [[{p: "راکړی شوی وم", f: "raakRáy shuway wum"}], [{p: "راکړی شوي وو", f: "raakRáy shuwee woo"}]],
  //                 [[{p: "راکړی شوې وم", f: "raakRáy shuwe wum"}], [{p: "راکړی شوې وو", f: "raakRáy shuwe woo"}]],
  //                 [[{p: "راکړی شوی وې", f: "raakRáy shuway we"}], [{p: "راکړی شوي وئ", f: "raakRáy shuwee wey"}]],
  //                 [[{p: "راکړی شوې وې", f: "raakRáy shuwe we"}], [{p: "راکړی شوې وئ", f: "raakRáy shuwe wey"}]],
  //                 [[{p: "راکړی شوی و", f: "raakRáy shuway wo"}], [{p: "راکړی شوي وو", f: "raakRáy shuwee woo"}]],
  //                 [[{p: "راکړی شوې وه", f: "raakRáy shuwe wa"}], [{p: "راکړی شوې وې", f: "raakRáy shuwe we"}]],
  //             ],
  //             long: [
  //                 [[{p: "راکړلی شوی وم", f: "raakRúlay shuway wum"}], [{p: "راکړلی شوي وو", f: "raakRúlay shuwee woo"}]],
  //                 [[{p: "راکړلی شوې وم", f: "raakRúlay shuwe wum"}], [{p: "راکړلی شوې وو", f: "raakRúlay shuwe woo"}]],
  //                 [[{p: "راکړلی شوی وې", f: "raakRúlay shuway we"}], [{p: "راکړلی شوي وئ", f: "raakRúlay shuwee wey"}]],
  //                 [[{p: "راکړلی شوې وې", f: "raakRúlay shuwe we"}], [{p: "راکړلی شوې وئ", f: "raakRúlay shuwe wey"}]],
  //                 [[{p: "راکړلی شوی و", f: "raakRúlay shuway wo"}], [{p: "راکړلی شوي وو", f: "raakRúlay shuwee woo"}]],
  //                 [[{p: "راکړلی شوې وه", f: "raakRúlay shuwe wa"}], [{p: "راکړلی شوې وې", f: "raakRúlay shuwe we"}]],
  //             ],
  //         },
  //         present: {
  //             short: [
  //                 [[{p: "راکړی شوی یم", f: "raakRáy shuway yum"}], [{p: "راکړی شوي یو", f: "raakRáy shuwee yoo"}]],
  //                 [[{p: "راکړی شوې یم", f: "raakRáy shuwe yum"}], [{p: "راکړی شوې یو", f: "raakRáy shuwe yoo"}]],
  //                 [[{p: "راکړی شوی یې", f: "raakRáy shuway ye"}], [{p: "راکړی شوي یئ", f: "raakRáy shuwee yey"}]],
  //                 [[{p: "راکړی شوې یې", f: "raakRáy shuwe ye"}], [{p: "راکړی شوې یئ", f: "raakRáy shuwe yey"}]],
  //                 [[{p: "راکړی شوی دی", f: "raakRáy shuway day"}], [{p: "راکړی شوي دي", f: "raakRáy shuwee dee"}]],
  //                 [[{p: "راکړی شوې ده", f: "raakRáy shuwe da"}], [{p: "راکړی شوې دي", f: "raakRáy shuwe dee"}]],
  //             ],
  //             long: [
  //                 [[{p: "راکړلی شوی یم", f: "raakRúlay shuway yum"}], [{p: "راکړلی شوي یو", f: "raakRúlay shuwee yoo"}]],
  //                 [[{p: "راکړلی شوې یم", f: "raakRúlay shuwe yum"}], [{p: "راکړلی شوې یو", f: "raakRúlay shuwe yoo"}]],
  //                 [[{p: "راکړلی شوی یې", f: "raakRúlay shuway ye"}], [{p: "راکړلی شوي یئ", f: "raakRúlay shuwee yey"}]],
  //                 [[{p: "راکړلی شوې یې", f: "raakRúlay shuwe ye"}], [{p: "راکړلی شوې یئ", f: "raakRúlay shuwe yey"}]],
  //                 [[{p: "راکړلی شوی دی", f: "raakRúlay shuway day"}], [{p: "راکړلی شوي دي", f: "raakRúlay shuwee dee"}]],
  //                 [[{p: "راکړلی شوې ده", f: "raakRúlay shuwe da"}], [{p: "راکړلی شوې دي", f: "raakRúlay shuwe dee"}]],
  //             ],
  //         },
  //         future: {
  //             short: [
  //                 [[{p: "به راکړی شوی یم", f: "ba raakRáy shuway yum"}], [{p: "به راکړی شوي یو", f: "ba raakRáy shuwee yoo"}]],
  //                 [[{p: "به راکړی شوې یم", f: "ba raakRáy shuwe yum"}], [{p: "به راکړی شوې یو", f: "ba raakRáy shuwe yoo"}]],
  //                 [[{p: "به راکړی شوی یې", f: "ba raakRáy shuway ye"}], [{p: "به راکړی شوي یئ", f: "ba raakRáy shuwee yey"}]],
  //                 [[{p: "به راکړی شوې یې", f: "ba raakRáy shuwe ye"}], [{p: "به راکړی شوې یئ", f: "ba raakRáy shuwe yey"}]],
  //                 [[{p: "به راکړی شوی وي", f: "ba raakRáy shuway wee"}], [{p: "به راکړی شوي وي", f: "ba raakRáy shuwee wee"}]],
  //                 [[{p: "به راکړی شوې وي", f: "ba raakRáy shuwe wee"}], [{p: "به راکړی شوې وي", f: "ba raakRáy shuwe wee"}]],
  //             ],
  //             long: [
  //                 [[{p: "به راکړلی شوی یم", f: "ba raakRúlay shuway yum"}], [{p: "به راکړلی شوي یو", f: "ba raakRúlay shuwee yoo"}]],
  //                 [[{p: "به راکړلی شوې یم", f: "ba raakRúlay shuwe yum"}], [{p: "به راکړلی شوې یو", f: "ba raakRúlay shuwe yoo"}]],
  //                 [[{p: "به راکړلی شوی یې", f: "ba raakRúlay shuway ye"}], [{p: "به راکړلی شوي یئ", f: "ba raakRúlay shuwee yey"}]],
  //                 [[{p: "به راکړلی شوې یې", f: "ba raakRúlay shuwe ye"}], [{p: "به راکړلی شوې یئ", f: "ba raakRúlay shuwe yey"}]],
  //                 [[{p: "به راکړلی شوی وي", f: "ba raakRúlay shuway wee"}], [{p: "به راکړلی شوي وي", f: "ba raakRúlay shuwee wee"}]],
  //                 [[{p: "به راکړلی شوې وي", f: "ba raakRúlay shuwe wee"}], [{p: "به راکړلی شوې وي", f: "ba raakRúlay shuwe wee"}]],
  //             ],
  //         },
  //         affirmational: {
  //             short: [
  //                 [[{p: "به راکړی شوی وم", f: "ba raakRáy shuway wum"}], [{p: "به راکړی شوي وو", f: "ba raakRáy shuwee woo"}]],
  //                 [[{p: "به راکړی شوې وم", f: "ba raakRáy shuwe wum"}], [{p: "به راکړی شوې وو", f: "ba raakRáy shuwe woo"}]],
  //                 [[{p: "به راکړی شوی وې", f: "ba raakRáy shuway we"}], [{p: "به راکړی شوي وئ", f: "ba raakRáy shuwee wey"}]],
  //                 [[{p: "به راکړی شوې وې", f: "ba raakRáy shuwe we"}], [{p: "به راکړی شوې وئ", f: "ba raakRáy shuwe wey"}]],
  //                 [[{p: "به راکړی شوی و", f: "ba raakRáy shuway wo"}], [{p: "به راکړی شوي وو", f: "ba raakRáy shuwee woo"}]],
  //                 [[{p: "به راکړی شوې وه", f: "ba raakRáy shuwe wa"}], [{p: "به راکړی شوې وې", f: "ba raakRáy shuwe we"}]],
  //             ],
  //             long: [
  //                 [[{p: "به راکړلی شوی وم", f: "ba raakRúlay shuway wum"}], [{p: "به راکړلی شوي وو", f: "ba raakRúlay shuwee woo"}]],
  //                 [[{p: "به راکړلی شوې وم", f: "ba raakRúlay shuwe wum"}], [{p: "به راکړلی شوې وو", f: "ba raakRúlay shuwe woo"}]],
  //                 [[{p: "به راکړلی شوی وې", f: "ba raakRúlay shuway we"}], [{p: "به راکړلی شوي وئ", f: "ba raakRúlay shuwee wey"}]],
  //                 [[{p: "به راکړلی شوې وې", f: "ba raakRúlay shuwe we"}], [{p: "به راکړلی شوې وئ", f: "ba raakRúlay shuwe wey"}]],
  //                 [[{p: "به راکړلی شوی و", f: "ba raakRúlay shuway wo"}], [{p: "به راکړلی شوي وو", f: "ba raakRúlay shuwee woo"}]],
  //                 [[{p: "به راکړلی شوې وه", f: "ba raakRúlay shuwe wa"}], [{p: "به راکړلی شوې وې", f: "ba raakRúlay shuwe we"}]],
  //             ],
  //         },
  //         pastSubjunctiveHypothetical: {
  //             short: [
  //                 [[{p: "راکړی شوی وای", f: "ba raakRáy shuway"}], [{p: "به راکړی شوي", f: "ba raakRáy shuwee"}]],
  //                 [[{p: "راکړی شوې وای", f: "ba raakRáy shuwe"}], [{p: "به راکړی شوې", f: "ba raakRáy shuwe"}]],
  //                 [[{p: "راکړی شوی وای", f: "ba raakRáy shuway"}], [{p: "به راکړی شوي", f: "ba raakRáy shuwee"}]],
  //                 [[{p: "راکړی شوې وای", f: "ba raakRáy shuwe"}], [{p: "به راکړی شوې", f: "ba raakRáy shuwe"}]],
  //                 [[{p: "راکړی شوی وای", f: "ba raakRáy shuway"}], [{p: "به راکړی شوي", f: "ba raakRáy shuwee"}]],
  //                 [[{p: "راکړی شوې وای", f: "ba raakRáy shuwe"}], [{p: "به راکړی شوې", f: "ba raakRáy shuwe"}]],
  //             ],
  //             long: [
  //                 [[{p: "راکړلی شوی وای", f: "ba raakRúlay shuway"}], [{p: "به راکړلی شوي", f: "ba raakRúlay shuwee"}]],
  //                 [[{p: "راکړلی شوې وای", f: "ba raakRúlay shuwe"}], [{p: "به راکړلی شوې", f: "ba raakRúlay shuwe"}]],
  //                 [[{p: "راکړلی شوی وای", f: "ba raakRúlay shuway"}], [{p: "به راکړلی شوي", f: "ba raakRúlay shuwee"}]],
  //                 [[{p: "راکړلی شوې وای", f: "ba raakRúlay shuwe"}], [{p: "به راکړلی شوې", f: "ba raakRúlay shuwe"}]],
  //                 [[{p: "راکړلی شوی وای", f: "ba raakRúlay shuway"}], [{p: "به راکړلی شوي", f: "ba raakRúlay shuwee"}]],
  //                 [[{p: "راکړلی شوې وای", f: "ba raakRúlay shuwe"}], [{p: "به راکړلی شوې", f: "ba raakRúlay shuwe"}]],
  //             ],
  //         },
  //     },
  // },
};

export const darkawul: T.VerbConjugation = {
  info: {
    entry: {
      entry: {
        ts: 1527817457,
        i: 6085,
        p: "درکول",
        f: "dărkawul",
        g: "darkawul",
        e: "to give (to you, you pl.)",
        c: "v. trans. irreg.",
      } as T.VerbDictionaryEntry,
    },
    transitivity: "transitive",
    type: "simple",
    yulEnding: false,
    root: {
      imperfective: {
        long: { p: "درکول", f: "dărkawul" },
        short: { p: "درکو", f: "dărkaw" },
      },
      perfective: {
        long: { p: "درکړل", f: "dărkRul" },
        short: { p: "درکړ", f: "dărkR" },
        mini: { p: "درک", f: "dărk" },
      },
      perfectiveSplit: {
        long: [
          { p: "در ", f: "dăr " },
          { p: "کړل", f: "kRul" },
        ],
        short: [
          { p: "در ", f: "dăr " },
          { p: "کړ", f: "kR" },
        ],
        mini: [
          { p: "در ", f: "dăr " },
          { p: "ړ", f: "k" },
        ],
      },
    },
    stem: {
      imperfective: { p: "درکو", f: "dărkaw" },
      perfective: {
        long: { p: "درکړ", f: "dărkR" },
        short: { p: "درک", f: "dărk" },
      },
      perfectiveSplit: {
        long: [
          { p: "در ", f: "dăr " },
          { p: "کړ", f: "kR" },
        ],
        short: [
          { p: "در ", f: "dăr " },
          { p: "ړ", f: "k" },
        ],
      },
    },
    participle: {
      present: { p: "درکوونکی", f: "dărkawóonkay" },
      past: { p: "درکړی", f: "dărkúRay" },
    },
  },
  imperfective: {
    nonImperative: [
      [[{ p: "درکوم", f: "dărkawum" }], [{ p: "درکوو", f: "dărkawoo" }]],
      [[{ p: "درکوم", f: "dărkawum" }], [{ p: "درکوو", f: "dărkawoo" }]],
      [[{ p: "درکوې", f: "dărkawe" }], [{ p: "درکوئ", f: "dărkawey" }]],
      [[{ p: "درکوې", f: "dărkawe" }], [{ p: "درکوئ", f: "dărkawey" }]],
      [[{ p: "درکوي", f: "dărkawee" }], [{ p: "درکوي", f: "dărkawee" }]],
      [[{ p: "درکوي", f: "dărkawee" }], [{ p: "درکوي", f: "dărkawee" }]],
    ],
    future: [
      [
        [{ p: "به درکوم", f: "ba dărkawum" }],
        [{ p: "به درکوو", f: "ba dărkawoo" }],
      ],
      [
        [{ p: "به درکوم", f: "ba dărkawum" }],
        [{ p: "به درکوو", f: "ba dărkawoo" }],
      ],
      [
        [{ p: "به درکوې", f: "ba dărkawe" }],
        [{ p: "به درکوئ", f: "ba dărkawey" }],
      ],
      [
        [{ p: "به درکوې", f: "ba dărkawe" }],
        [{ p: "به درکوئ", f: "ba dărkawey" }],
      ],
      [
        [{ p: "به درکوي", f: "ba dărkawee" }],
        [{ p: "به درکوي", f: "ba dărkawee" }],
      ],
      [
        [{ p: "به درکوي", f: "ba dărkawee" }],
        [{ p: "به درکوي", f: "ba dărkawee" }],
      ],
    ],
    imperative: [
      [[{ p: "درکوه", f: "dărkawá" }], [{ p: "درکوئ", f: "dărkawéy" }]],
      [[{ p: "درکوه", f: "dărkawá" }], [{ p: "درکوئ", f: "dărkawéy" }]],
    ],
    past: {
      short: [
        [[{ p: "درکوم", f: "dărkawum" }], [{ p: "درکوو", f: "dărkawoo" }]],
        [[{ p: "درکوم", f: "dărkawum" }], [{ p: "درکوو", f: "dărkawoo" }]],
        [[{ p: "درکوې", f: "dărkawe" }], [{ p: "درکوئ", f: "dărkawey" }]],
        [[{ p: "درکوې", f: "dărkawe" }], [{ p: "درکوئ", f: "dărkawey" }]],
        [[{ p: "درکاوه", f: "dărkaawu" }], [{ p: "درکول", f: "dărkawul" }]],
        [[{ p: "درکوه", f: "dărkawa" }], [{ p: "درکوې", f: "dărkawe" }]],
      ],
      long: [
        [
          [{ p: "درکولم", f: "dărkawulum" }],
          [{ p: "درکولو", f: "dărkawuloo" }],
        ],
        [
          [{ p: "درکولم", f: "dărkawulum" }],
          [{ p: "درکولو", f: "dărkawuloo" }],
        ],
        [[{ p: "درکولې", f: "dărkawule" }], [{ p: "درکولئ", f: "dărkawuley" }]],
        [[{ p: "درکولې", f: "dărkawule" }], [{ p: "درکولئ", f: "dărkawuley" }]],
        [
          [
            { p: "درکوله", f: "dărkawulu" },
            { p: "درکولو", f: "dărkawulo" },
          ],
          [{ p: "درکول", f: "dărkawul" }],
        ],
        [[{ p: "درکوله", f: "dărkawula" }], [{ p: "درکولې", f: "dărkawule" }]],
      ],
    },
    habitualPast: {
      short: [
        [
          [{ p: "به درکوم", f: "ba dărkawum" }],
          [{ p: "به درکوو", f: "ba dărkawoo" }],
        ],
        [
          [{ p: "به درکوم", f: "ba dărkawum" }],
          [{ p: "به درکوو", f: "ba dărkawoo" }],
        ],
        [
          [{ p: "به درکوې", f: "ba dărkawe" }],
          [{ p: "به درکوئ", f: "ba dărkawey" }],
        ],
        [
          [{ p: "به درکوې", f: "ba dărkawe" }],
          [{ p: "به درکوئ", f: "ba dărkawey" }],
        ],
        [
          [{ p: "به درکاوه", f: "ba dărkaawu" }],
          [{ p: "به درکول", f: "ba dărkawul" }],
        ],
        [
          [{ p: "به درکوه", f: "ba dărkawa" }],
          [{ p: "به درکوې", f: "ba dărkawe" }],
        ],
      ],
      long: [
        [
          [{ p: "به درکولم", f: "ba dărkawulum" }],
          [{ p: "به درکولو", f: "ba dărkawuloo" }],
        ],
        [
          [{ p: "به درکولم", f: "ba dărkawulum" }],
          [{ p: "به درکولو", f: "ba dărkawuloo" }],
        ],
        [
          [{ p: "به درکولې", f: "ba dărkawule" }],
          [{ p: "به درکولئ", f: "ba dărkawuley" }],
        ],
        [
          [{ p: "به درکولې", f: "ba dărkawule" }],
          [{ p: "به درکولئ", f: "ba dărkawuley" }],
        ],
        [
          [
            { p: "به درکوله", f: "ba dărkawulu" },
            { p: "به درکولو", f: "ba dărkawulo" },
          ],
          [{ p: "به درکول", f: "ba dărkawul" }],
        ],
        [
          [{ p: "به درکوله", f: "ba dărkawula" }],
          [{ p: "به درکولې", f: "ba dărkawule" }],
        ],
      ],
    },
    modal: {
      nonImperative: {
        long: [
          [
            [
              { p: "درکولی شم", f: "dărkawúlay shum" },
              { p: "درکولای شم", f: "dărkawúlaay shum" },
            ],
            [
              { p: "درکولی شو", f: "dărkawúlay shoo" },
              { p: "درکولای شو", f: "dărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "درکولی شم", f: "dărkawúlay shum" },
              { p: "درکولای شم", f: "dărkawúlaay shum" },
            ],
            [
              { p: "درکولی شو", f: "dărkawúlay shoo" },
              { p: "درکولای شو", f: "dărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "درکولی شې", f: "dărkawúlay she" },
              { p: "درکولای شې", f: "dărkawúlaay she" },
            ],
            [
              { p: "درکولی شئ", f: "dărkawúlay shey" },
              { p: "درکولای شئ", f: "dărkawúlaay shey" },
            ],
          ],
          [
            [
              { p: "درکولی شې", f: "dărkawúlay she" },
              { p: "درکولای شې", f: "dărkawúlaay she" },
            ],
            [
              { p: "درکولی شئ", f: "dărkawúlay shey" },
              { p: "درکولای شئ", f: "dărkawúlaay shey" },
            ],
          ],
          [
            [
              { p: "درکولی شي", f: "dărkawúlay shee" },
              { p: "درکولای شي", f: "dărkawúlaay shee" },
            ],
            [
              { p: "درکولی شي", f: "dărkawúlay shee" },
              { p: "درکولای شي", f: "dărkawúlaay shee" },
            ],
          ],
          [
            [
              { p: "درکولی شي", f: "dărkawúlay shee" },
              { p: "درکولای شي", f: "dărkawúlaay shee" },
            ],
            [
              { p: "درکولی شي", f: "dărkawúlay shee" },
              { p: "درکولای شي", f: "dărkawúlaay shee" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "درکوی شم", f: "dărkawáy shum" },
              { p: "درکوای شم", f: "dărkawáay shum" },
            ],
            [
              { p: "درکوی شو", f: "dărkawáy shoo" },
              { p: "درکوای شو", f: "dărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "درکوی شم", f: "dărkawáy shum" },
              { p: "درکوای شم", f: "dărkawáay shum" },
            ],
            [
              { p: "درکوی شو", f: "dărkawáy shoo" },
              { p: "درکوای شو", f: "dărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "درکوی شې", f: "dărkawáy she" },
              { p: "درکوای شې", f: "dărkawáay she" },
            ],
            [
              { p: "درکوی شئ", f: "dărkawáy shey" },
              { p: "درکوای شئ", f: "dărkawáay shey" },
            ],
          ],
          [
            [
              { p: "درکوی شې", f: "dărkawáy she" },
              { p: "درکوای شې", f: "dărkawáay she" },
            ],
            [
              { p: "درکوی شئ", f: "dărkawáy shey" },
              { p: "درکوای شئ", f: "dărkawáay shey" },
            ],
          ],
          [
            [
              { p: "درکوی شي", f: "dărkawáy shee" },
              { p: "درکوای شي", f: "dărkawáay shee" },
            ],
            [
              { p: "درکوی شي", f: "dărkawáy shee" },
              { p: "درکوای شي", f: "dărkawáay shee" },
            ],
          ],
          [
            [
              { p: "درکوی شي", f: "dărkawáy shee" },
              { p: "درکوای شي", f: "dărkawáay shee" },
            ],
            [
              { p: "درکوی شي", f: "dărkawáy shee" },
              { p: "درکوای شي", f: "dărkawáay shee" },
            ],
          ],
        ],
      },
      future: {
        long: [
          [
            [
              { p: "به درکولی شم", f: "ba dărkawúlay shum" },
              { p: "به درکولای شم", f: "ba dărkawúlaay shum" },
            ],
            [
              { p: "به درکولی شو", f: "ba dărkawúlay shoo" },
              { p: "به درکولای شو", f: "ba dărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به درکولی شم", f: "ba dărkawúlay shum" },
              { p: "به درکولای شم", f: "ba dărkawúlaay shum" },
            ],
            [
              { p: "به درکولی شو", f: "ba dărkawúlay shoo" },
              { p: "به درکولای شو", f: "ba dărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به درکولی شې", f: "ba dărkawúlay she" },
              { p: "به درکولای شې", f: "ba dărkawúlaay she" },
            ],
            [
              { p: "به درکولی شئ", f: "ba dărkawúlay shey" },
              { p: "به درکولای شئ", f: "ba dărkawúlaay shey" },
            ],
          ],
          [
            [
              { p: "به درکولی شې", f: "ba dărkawúlay she" },
              { p: "به درکولای شې", f: "ba dărkawúlaay she" },
            ],
            [
              { p: "به درکولی شئ", f: "ba dărkawúlay shey" },
              { p: "به درکولای شئ", f: "ba dărkawúlaay shey" },
            ],
          ],
          [
            [
              { p: "به درکولی شي", f: "ba dărkawúlay shee" },
              { p: "به درکولای شي", f: "ba dărkawúlaay shee" },
            ],
            [
              { p: "به درکولی شي", f: "ba dărkawúlay shee" },
              { p: "به درکولای شي", f: "ba dărkawúlaay shee" },
            ],
          ],
          [
            [
              { p: "به درکولی شي", f: "ba dărkawúlay shee" },
              { p: "به درکولای شي", f: "ba dărkawúlaay shee" },
            ],
            [
              { p: "به درکولی شي", f: "ba dărkawúlay shee" },
              { p: "به درکولای شي", f: "ba dărkawúlaay shee" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "به درکوی شم", f: "ba dărkawáy shum" },
              { p: "به درکوای شم", f: "ba dărkawáay shum" },
            ],
            [
              { p: "به درکوی شو", f: "ba dărkawáy shoo" },
              { p: "به درکوای شو", f: "ba dărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "به درکوی شم", f: "ba dărkawáy shum" },
              { p: "به درکوای شم", f: "ba dărkawáay shum" },
            ],
            [
              { p: "به درکوی شو", f: "ba dărkawáy shoo" },
              { p: "به درکوای شو", f: "ba dărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "به درکوی شې", f: "ba dărkawáy she" },
              { p: "به درکوای شې", f: "ba dărkawáay she" },
            ],
            [
              { p: "به درکوی شئ", f: "ba dărkawáy shey" },
              { p: "به درکوای شئ", f: "ba dărkawáay shey" },
            ],
          ],
          [
            [
              { p: "به درکوی شې", f: "ba dărkawáy she" },
              { p: "به درکوای شې", f: "ba dărkawáay she" },
            ],
            [
              { p: "به درکوی شئ", f: "ba dărkawáy shey" },
              { p: "به درکوای شئ", f: "ba dărkawáay shey" },
            ],
          ],
          [
            [
              { p: "به درکوی شي", f: "ba dărkawáy shee" },
              { p: "به درکوای شي", f: "ba dărkawáay shee" },
            ],
            [
              { p: "به درکوی شي", f: "ba dărkawáy shee" },
              { p: "به درکوای شي", f: "ba dărkawáay shee" },
            ],
          ],
          [
            [
              { p: "به درکوی شي", f: "ba dărkawáy shee" },
              { p: "به درکوای شي", f: "ba dărkawáay shee" },
            ],
            [
              { p: "به درکوی شي", f: "ba dărkawáy shee" },
              { p: "به درکوای شي", f: "ba dărkawáay shee" },
            ],
          ],
        ],
      },
      past: {
        long: [
          [
            [
              { p: "درکولی شوم", f: "dărkawúlay shwum" },
              { p: "درکولای شوم", f: "dărkawúlaay shwum" },
            ],
            [
              { p: "درکولی شو", f: "dărkawúlay shoo" },
              { p: "درکولای شو", f: "dărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "درکولی شوم", f: "dărkawúlay shwum" },
              { p: "درکولای شوم", f: "dărkawúlaay shwum" },
            ],
            [
              { p: "درکولی شو", f: "dărkawúlay shoo" },
              { p: "درکولای شو", f: "dărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "درکولی شوې", f: "dărkawúlay shwe" },
              { p: "درکولای شوې", f: "dărkawúlaay shwe" },
            ],
            [
              { p: "درکولی شوئ", f: "dărkawúlay shwey" },
              { p: "درکولای شوئ", f: "dărkawúlaay shwey" },
            ],
          ],
          [
            [
              { p: "درکولی شوې", f: "dărkawúlay shwe" },
              { p: "درکولای شوې", f: "dărkawúlaay shwe" },
            ],
            [
              { p: "درکولی شوئ", f: "dărkawúlay shwey" },
              { p: "درکولای شوئ", f: "dărkawúlaay shwey" },
            ],
          ],
          [
            [
              { p: "درکولی شو", f: "dărkawúlay sho" },
              { p: "درکولای شو", f: "dărkawúlaay sho" },
            ],
            [
              { p: "درکولی شول", f: "dărkawúlay shwul" },
              { p: "درکولای شول", f: "dărkawúlaay shwul" },
              { p: "درکولی شو", f: "dărkawúlay shoo" },
              { p: "درکولای شو", f: "dărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "درکولی شوه", f: "dărkawúlay shwa" },
              { p: "درکولای شوه", f: "dărkawúlaay shwa" },
            ],
            [
              { p: "درکولی شولې", f: "dărkawúlay shwule" },
              { p: "درکولای شولې", f: "dărkawúlaay shwule" },
              { p: "درکولی شوې", f: "dărkawúlay shwe" },
              { p: "درکولای شوې", f: "dărkawúlaay shwe" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "درکوی شوم", f: "dărkawáy shwum" },
              { p: "درکوای شوم", f: "dărkawáay shwum" },
            ],
            [
              { p: "درکوی شو", f: "dărkawáy shoo" },
              { p: "درکوای شو", f: "dărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "درکوی شوم", f: "dărkawáy shwum" },
              { p: "درکوای شوم", f: "dărkawáay shwum" },
            ],
            [
              { p: "درکوی شو", f: "dărkawáy shoo" },
              { p: "درکوای شو", f: "dărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "درکوی شوې", f: "dărkawáy shwe" },
              { p: "درکوای شوې", f: "dărkawáay shwe" },
            ],
            [
              { p: "درکوی شوئ", f: "dărkawáy shwey" },
              { p: "درکوای شوئ", f: "dărkawáay shwey" },
            ],
          ],
          [
            [
              { p: "درکوی شوې", f: "dărkawáy shwe" },
              { p: "درکوای شوې", f: "dărkawáay shwe" },
            ],
            [
              { p: "درکوی شوئ", f: "dărkawáy shwey" },
              { p: "درکوای شوئ", f: "dărkawáay shwey" },
            ],
          ],
          [
            [
              { p: "درکوی شو", f: "dărkawáy sho" },
              { p: "درکوای شو", f: "dărkawáay sho" },
            ],
            [
              { p: "درکوی شول", f: "dărkawáy shwul" },
              { p: "درکوای شول", f: "dărkawáay shwul" },
              { p: "درکوی شو", f: "dărkawáy shoo" },
              { p: "درکوای شو", f: "dărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "درکوی شوه", f: "dărkawáy shwa" },
              { p: "درکوای شوه", f: "dărkawáay shwa" },
            ],
            [
              { p: "درکوی شولې", f: "dărkawáy shwule" },
              { p: "درکوای شولې", f: "dărkawáay shwule" },
              { p: "درکوی شوې", f: "dărkawáy shwe" },
              { p: "درکوای شوې", f: "dărkawáay shwe" },
            ],
          ],
        ],
      },
      habitualPast: {
        long: [
          [
            [
              { p: "به درکولی شوم", f: "ba dărkawúlay shwum" },
              { p: "به درکولای شوم", f: "ba dărkawúlaay shwum" },
            ],
            [
              { p: "به درکولی شو", f: "ba dărkawúlay shoo" },
              { p: "به درکولای شو", f: "ba dărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به درکولی شوم", f: "ba dărkawúlay shwum" },
              { p: "به درکولای شوم", f: "ba dărkawúlaay shwum" },
            ],
            [
              { p: "به درکولی شو", f: "ba dărkawúlay shoo" },
              { p: "به درکولای شو", f: "ba dărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به درکولی شوې", f: "ba dărkawúlay shwe" },
              { p: "به درکولای شوې", f: "ba dărkawúlaay shwe" },
            ],
            [
              { p: "به درکولی شوئ", f: "ba dărkawúlay shwey" },
              { p: "به درکولای شوئ", f: "ba dărkawúlaay shwey" },
            ],
          ],
          [
            [
              { p: "به درکولی شوې", f: "ba dărkawúlay shwe" },
              { p: "به درکولای شوې", f: "ba dărkawúlaay shwe" },
            ],
            [
              { p: "به درکولی شوئ", f: "ba dărkawúlay shwey" },
              { p: "به درکولای شوئ", f: "ba dărkawúlaay shwey" },
            ],
          ],
          [
            [
              { p: "به درکولی شو", f: "ba dărkawúlay sho" },
              { p: "به درکولای شو", f: "ba dărkawúlaay sho" },
            ],
            [
              { p: "به درکولی شول", f: "ba dărkawúlay shwul" },
              { p: "به درکولای شول", f: "ba dărkawúlaay shwul" },
              { p: "به درکولی شو", f: "ba dărkawúlay shoo" },
              { p: "به درکولای شو", f: "ba dărkawúlaay shoo" },
            ],
          ],
          [
            [
              { p: "به درکولی شوه", f: "ba dărkawúlay shwa" },
              { p: "به درکولای شوه", f: "ba dărkawúlaay shwa" },
            ],
            [
              { p: "به درکولی شولې", f: "ba dărkawúlay shwule" },
              { p: "به درکولای شولې", f: "ba dărkawúlaay shwule" },
              { p: "به درکولی شوې", f: "ba dărkawúlay shwe" },
              { p: "به درکولای شوې", f: "ba dărkawúlaay shwe" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "به درکوی شوم", f: "ba dărkawáy shwum" },
              { p: "به درکوای شوم", f: "ba dărkawáay shwum" },
            ],
            [
              { p: "به درکوی شو", f: "ba dărkawáy shoo" },
              { p: "به درکوای شو", f: "ba dărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "به درکوی شوم", f: "ba dărkawáy shwum" },
              { p: "به درکوای شوم", f: "ba dărkawáay shwum" },
            ],
            [
              { p: "به درکوی شو", f: "ba dărkawáy shoo" },
              { p: "به درکوای شو", f: "ba dărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "به درکوی شوې", f: "ba dărkawáy shwe" },
              { p: "به درکوای شوې", f: "ba dărkawáay shwe" },
            ],
            [
              { p: "به درکوی شوئ", f: "ba dărkawáy shwey" },
              { p: "به درکوای شوئ", f: "ba dărkawáay shwey" },
            ],
          ],
          [
            [
              { p: "به درکوی شوې", f: "ba dărkawáy shwe" },
              { p: "به درکوای شوې", f: "ba dărkawáay shwe" },
            ],
            [
              { p: "به درکوی شوئ", f: "ba dărkawáy shwey" },
              { p: "به درکوای شوئ", f: "ba dărkawáay shwey" },
            ],
          ],
          [
            [
              { p: "به درکوی شو", f: "ba dărkawáy sho" },
              { p: "به درکوای شو", f: "ba dărkawáay sho" },
            ],
            [
              { p: "به درکوی شول", f: "ba dărkawáy shwul" },
              { p: "به درکوای شول", f: "ba dărkawáay shwul" },
              { p: "به درکوی شو", f: "ba dărkawáy shoo" },
              { p: "به درکوای شو", f: "ba dărkawáay shoo" },
            ],
          ],
          [
            [
              { p: "به درکوی شوه", f: "ba dărkawáy shwa" },
              { p: "به درکوای شوه", f: "ba dărkawáay shwa" },
            ],
            [
              { p: "به درکوی شولې", f: "ba dărkawáy shwule" },
              { p: "به درکوای شولې", f: "ba dărkawáay shwule" },
              { p: "به درکوی شوې", f: "ba dărkawáy shwe" },
              { p: "به درکوای شوې", f: "ba dărkawáay shwe" },
            ],
          ],
        ],
      },
      hypotheticalPast: {
        long: [
          [
            [
              { p: "درکولی شوای", f: "dărkawúlay shwaay" },
              { p: "درکولی شوی", f: "dărkawúlay shway" },
              { p: "درکولای شوای", f: "dărkawúlaay shwaay" },
            ],
            [
              { p: "درکولی شوای", f: "dărkawúlay shwaay" },
              { p: "درکولی شوی", f: "dărkawúlay shway" },
              { p: "درکولای شوای", f: "dărkawúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "درکولی شوای", f: "dărkawúlay shwaay" },
              { p: "درکولی شوی", f: "dărkawúlay shway" },
              { p: "درکولای شوای", f: "dărkawúlaay shwaay" },
            ],
            [
              { p: "درکولی شوای", f: "dărkawúlay shwaay" },
              { p: "درکولی شوی", f: "dărkawúlay shway" },
              { p: "درکولای شوای", f: "dărkawúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "درکولی شوای", f: "dărkawúlay shwaay" },
              { p: "درکولی شوی", f: "dărkawúlay shway" },
              { p: "درکولای شوای", f: "dărkawúlaay shwaay" },
            ],
            [
              { p: "درکولی شوای", f: "dărkawúlay shwaay" },
              { p: "درکولی شوی", f: "dărkawúlay shway" },
              { p: "درکولای شوای", f: "dărkawúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "درکولی شوای", f: "dărkawúlay shwaay" },
              { p: "درکولی شوی", f: "dărkawúlay shway" },
              { p: "درکولای شوای", f: "dărkawúlaay shwaay" },
            ],
            [
              { p: "درکولی شوای", f: "dărkawúlay shwaay" },
              { p: "درکولی شوی", f: "dărkawúlay shway" },
              { p: "درکولای شوای", f: "dărkawúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "درکولی شوای", f: "dărkawúlay shwaay" },
              { p: "درکولی شوی", f: "dărkawúlay shway" },
              { p: "درکولای شوای", f: "dărkawúlaay shwaay" },
            ],
            [
              { p: "درکولی شوای", f: "dărkawúlay shwaay" },
              { p: "درکولی شوی", f: "dărkawúlay shway" },
              { p: "درکولای شوای", f: "dărkawúlaay shwaay" },
            ],
          ],
          [
            [
              { p: "درکولی شوای", f: "dărkawúlay shwaay" },
              { p: "درکولی شوی", f: "dărkawúlay shway" },
              { p: "درکولای شوای", f: "dărkawúlaay shwaay" },
            ],
            [
              { p: "درکولی شوای", f: "dărkawúlay shwaay" },
              { p: "درکولی شوی", f: "dărkawúlay shway" },
              { p: "درکولای شوای", f: "dărkawúlaay shwaay" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "درکوی شوای", f: "dărkawáy shwaay" },
              { p: "درکوی شوی", f: "dărkawáy shway" },
              { p: "درکوای شوای", f: "dărkawáay shwaay" },
            ],
            [
              { p: "درکوی شوای", f: "dărkawáy shwaay" },
              { p: "درکوی شوی", f: "dărkawáy shway" },
              { p: "درکوای شوای", f: "dărkawáay shwaay" },
            ],
          ],
          [
            [
              { p: "درکوی شوای", f: "dărkawáy shwaay" },
              { p: "درکوی شوی", f: "dărkawáy shway" },
              { p: "درکوای شوای", f: "dărkawáay shwaay" },
            ],
            [
              { p: "درکوی شوای", f: "dărkawáy shwaay" },
              { p: "درکوی شوی", f: "dărkawáy shway" },
              { p: "درکوای شوای", f: "dărkawáay shwaay" },
            ],
          ],
          [
            [
              { p: "درکوی شوای", f: "dărkawáy shwaay" },
              { p: "درکوی شوی", f: "dărkawáy shway" },
              { p: "درکوای شوای", f: "dărkawáay shwaay" },
            ],
            [
              { p: "درکوی شوای", f: "dărkawáy shwaay" },
              { p: "درکوی شوی", f: "dărkawáy shway" },
              { p: "درکوای شوای", f: "dărkawáay shwaay" },
            ],
          ],
          [
            [
              { p: "درکوی شوای", f: "dărkawáy shwaay" },
              { p: "درکوی شوی", f: "dărkawáy shway" },
              { p: "درکوای شوای", f: "dărkawáay shwaay" },
            ],
            [
              { p: "درکوی شوای", f: "dărkawáy shwaay" },
              { p: "درکوی شوی", f: "dărkawáy shway" },
              { p: "درکوای شوای", f: "dărkawáay shwaay" },
            ],
          ],
          [
            [
              { p: "درکوی شوای", f: "dărkawáy shwaay" },
              { p: "درکوی شوی", f: "dărkawáy shway" },
              { p: "درکوای شوای", f: "dărkawáay shwaay" },
            ],
            [
              { p: "درکوی شوای", f: "dărkawáy shwaay" },
              { p: "درکوی شوی", f: "dărkawáy shway" },
              { p: "درکوای شوای", f: "dărkawáay shwaay" },
            ],
          ],
          [
            [
              { p: "درکوی شوای", f: "dărkawáy shwaay" },
              { p: "درکوی شوی", f: "dărkawáy shway" },
              { p: "درکوای شوای", f: "dărkawáay shwaay" },
            ],
            [
              { p: "درکوی شوای", f: "dărkawáy shwaay" },
              { p: "درکوی شوی", f: "dărkawáy shway" },
              { p: "درکوای شوای", f: "dărkawáay shwaay" },
            ],
          ],
        ],
      },
    },
  },
  perfective: {
    nonImperative: {
      long: [
        [[{ p: "درکړم", f: "dărkRum" }], [{ p: "درکړو", f: "dărkRoo" }]],
        [[{ p: "درکړم", f: "dărkRum" }], [{ p: "درکړو", f: "dărkRoo" }]],
        [[{ p: "درکړې", f: "dărkRe" }], [{ p: "درکړئ", f: "dărkRey" }]],
        [[{ p: "درکړې", f: "dărkRe" }], [{ p: "درکړئ", f: "dărkRey" }]],
        [[{ p: "درکړي", f: "dărkRee" }], [{ p: "درکړي", f: "dărkRee" }]],
        [[{ p: "درکړي", f: "dărkRee" }], [{ p: "درکړي", f: "dărkRee" }]],
      ],
      short: [
        [[{ p: "درکم", f: "dărkum" }], [{ p: "درکو", f: "dărkoo" }]],
        [[{ p: "درکم", f: "dărkum" }], [{ p: "درکو", f: "dărkoo" }]],
        [[{ p: "درکې", f: "dărke" }], [{ p: "درکئ", f: "dărkey" }]],
        [[{ p: "درکې", f: "dărke" }], [{ p: "درکئ", f: "dărkey" }]],
        [[{ p: "درکي", f: "dărkee" }], [{ p: "درکي", f: "dărkee" }]],
        [[{ p: "درکي", f: "dărkee" }], [{ p: "درکي", f: "dărkee" }]],
      ],
    },
    future: {
      long: [
        [
          [{ p: "به درکړم", f: "ba dărkRum" }],
          [{ p: "به درکړو", f: "ba dărkRoo" }],
        ],
        [
          [{ p: "به درکړم", f: "ba dărkRum" }],
          [{ p: "به درکړو", f: "ba dărkRoo" }],
        ],
        [
          [{ p: "به درکړې", f: "ba dărkRe" }],
          [{ p: "به درکړئ", f: "ba dărkRey" }],
        ],
        [
          [{ p: "به درکړې", f: "ba dărkRe" }],
          [{ p: "به درکړئ", f: "ba dărkRey" }],
        ],
        [
          [{ p: "به درکړي", f: "ba dărkRee" }],
          [{ p: "به درکړي", f: "ba dărkRee" }],
        ],
        [
          [{ p: "به درکړي", f: "ba dărkRee" }],
          [{ p: "به درکړي", f: "ba dărkRee" }],
        ],
      ],
      short: [
        [
          [{ p: "به درکم", f: "ba dărkum" }],
          [{ p: "به درکو", f: "ba dărkoo" }],
        ],
        [
          [{ p: "به درکم", f: "ba dărkum" }],
          [{ p: "به درکو", f: "ba dărkoo" }],
        ],
        [[{ p: "به درکې", f: "ba dărke" }], [{ p: "به درکئ", f: "ba dărkey" }]],
        [[{ p: "به درکې", f: "ba dărke" }], [{ p: "به درکئ", f: "ba dărkey" }]],
        [
          [{ p: "به درکي", f: "ba dărkee" }],
          [{ p: "به درکي", f: "ba dărkee" }],
        ],
        [
          [{ p: "به درکي", f: "ba dărkee" }],
          [{ p: "به درکي", f: "ba dărkee" }],
        ],
      ],
    },
    imperative: {
      long: [
        [[{ p: "درکړه", f: "dărkRa" }], [{ p: "درکړئ", f: "dărkRey" }]],
        [[{ p: "درکړه", f: "dărkRa" }], [{ p: "درکړئ", f: "dărkRey" }]],
      ],
      short: [
        [[{ p: "درکه", f: "dărka" }], [{ p: "درکئ", f: "dărkey" }]],
        [[{ p: "درکه", f: "dărka" }], [{ p: "درکئ", f: "dărkey" }]],
      ],
    },
    past: {
      mini: [
        [[{ p: "درکم", f: "dărkum" }], [{ p: "درکو", f: "dărkoo" }]],
        [[{ p: "درکم", f: "dărkum" }], [{ p: "درکو", f: "dărkoo" }]],
        [[{ p: "درکې", f: "dărke" }], [{ p: "درکئ", f: "dărkey" }]],
        [[{ p: "درکې", f: "dărke" }], [{ p: "درکئ", f: "dărkey" }]],
        [
          [
            { p: "درکه", f: "dărku" },
            { p: "درکو", f: "dărko" },
          ],
          [
            { p: "درکړل", f: "dărkRul" },
            { p: "درکو", f: "dărkoo" },
          ],
        ],
        [[{ p: "درکه", f: "dărka" }], [{ p: "درکې", f: "dărke" }]],
      ],
      short: [
        [[{ p: "درکړم", f: "dărkRum" }], [{ p: "درکړو", f: "dărkRoo" }]],
        [[{ p: "درکړم", f: "dărkRum" }], [{ p: "درکړو", f: "dărkRoo" }]],
        [[{ p: "درکړې", f: "dărkRe" }], [{ p: "درکړئ", f: "dărkRey" }]],
        [[{ p: "درکړې", f: "dărkRe" }], [{ p: "درکړئ", f: "dărkRey" }]],
        [
          [
            { p: "درکړه", f: "dărkRu" },
            { p: "درکړو", f: "dărkRo" },
            { p: "درکړ", f: "dărkuR" },
          ],
          [
            { p: "درکړل", f: "dărkRul" },
            { p: "درکړو", f: "dărkRoo" },
          ],
        ],
        [[{ p: "درکړه", f: "dărkRa" }], [{ p: "درکړې", f: "dărkRe" }]],
      ],
      long: [
        [[{ p: "درکړلم", f: "dărkRulum" }], [{ p: "درکړلو", f: "dărkRuloo" }]],
        [[{ p: "درکړلم", f: "dărkRulum" }], [{ p: "درکړلو", f: "dărkRuloo" }]],
        [[{ p: "درکړلې", f: "dărkRule" }], [{ p: "درکړلئ", f: "dărkRuley" }]],
        [[{ p: "درکړلې", f: "dărkRule" }], [{ p: "درکړلئ", f: "dărkRuley" }]],
        [
          [{ p: "درکړلو", f: "dărkRulo" }],
          [
            { p: "درکړل", f: "dărkRul" },
            { p: "درکړلو", f: "dărkRuloo" },
          ],
        ],
        [[{ p: "درکړله", f: "dărkRula" }], [{ p: "درکړلې", f: "dărkRule" }]],
      ],
    },
    habitualPast: {
      mini: [
        [
          [{ p: "به درکم", f: "ba dărkum" }],
          [{ p: "به درکو", f: "ba dărkoo" }],
        ],
        [
          [{ p: "به درکم", f: "ba dărkum" }],
          [{ p: "به درکو", f: "ba dărkoo" }],
        ],
        [[{ p: "به درکې", f: "ba dărke" }], [{ p: "به درکئ", f: "ba dărkey" }]],
        [[{ p: "به درکې", f: "ba dărke" }], [{ p: "به درکئ", f: "ba dărkey" }]],
        [
          [
            { p: "به درکه", f: "ba dărku" },
            { p: "به درکو", f: "ba dărko" },
          ],
          [
            { p: "به درکړل", f: "ba dărkRul" },
            { p: "به درکو", f: "ba dărkoo" },
          ],
        ],
        [[{ p: "به درکه", f: "ba dărka" }], [{ p: "به درکې", f: "ba dărke" }]],
      ],
      short: [
        [
          [{ p: "به درکړم", f: "ba dărkRum" }],
          [{ p: "به درکړو", f: "ba dărkRoo" }],
        ],
        [
          [{ p: "به درکړم", f: "ba dărkRum" }],
          [{ p: "به درکړو", f: "ba dărkRoo" }],
        ],
        [
          [{ p: "به درکړې", f: "ba dărkRe" }],
          [{ p: "به درکړئ", f: "ba dărkRey" }],
        ],
        [
          [{ p: "به درکړې", f: "ba dărkRe" }],
          [{ p: "به درکړئ", f: "ba dărkRey" }],
        ],
        [
          [
            { p: "به درکړه", f: "ba dărkRu" },
            { p: "به درکړو", f: "ba dărkRo" },
            { p: "به درکړ", f: "ba dărkuR" },
          ],
          [
            { p: "به درکړل", f: "ba dărkRul" },
            { p: "به درکړو", f: "ba dărkRoo" },
          ],
        ],
        [
          [{ p: "به درکړه", f: "ba dărkRa" }],
          [{ p: "به درکړې", f: "ba dărkRe" }],
        ],
      ],
      long: [
        [
          [{ p: "به درکړلم", f: "ba dărkRulum" }],
          [{ p: "به درکړلو", f: "ba dărkRuloo" }],
        ],
        [
          [{ p: "به درکړلم", f: "ba dărkRulum" }],
          [{ p: "به درکړلو", f: "ba dărkRuloo" }],
        ],
        [
          [{ p: "به درکړلې", f: "ba dărkRule" }],
          [{ p: "به درکړلئ", f: "ba dărkRuley" }],
        ],
        [
          [{ p: "به درکړلې", f: "ba dărkRule" }],
          [{ p: "به درکړلئ", f: "ba dărkRuley" }],
        ],
        [
          [{ p: "به درکړلو", f: "ba dărkRulo" }],
          [
            { p: "به درکړل", f: "ba dărkRul" },
            { p: "به درکړلو", f: "ba dărkRuloo" },
          ],
        ],
        [
          [{ p: "به درکړله", f: "ba dărkRula" }],
          [{ p: "به درکړلې", f: "ba dărkRule" }],
        ],
      ],
    },
    modal: {
      nonImperative: {
        long: [
          [
            [
              { p: "درکړلی شم", f: "dărkRulay shum" },
              { p: "درکړلای شم", f: "dărkRulaay shum" },
            ],
            [
              { p: "درکړلی شو", f: "dărkRulay shoo" },
              { p: "درکړلای شو", f: "dărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "درکړلی شم", f: "dărkRulay shum" },
              { p: "درکړلای شم", f: "dărkRulaay shum" },
            ],
            [
              { p: "درکړلی شو", f: "dărkRulay shoo" },
              { p: "درکړلای شو", f: "dărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "درکړلی شې", f: "dărkRulay she" },
              { p: "درکړلای شې", f: "dărkRulaay she" },
            ],
            [
              { p: "درکړلی شئ", f: "dărkRulay shey" },
              { p: "درکړلای شئ", f: "dărkRulaay shey" },
            ],
          ],
          [
            [
              { p: "درکړلی شې", f: "dărkRulay she" },
              { p: "درکړلای شې", f: "dărkRulaay she" },
            ],
            [
              { p: "درکړلی شئ", f: "dărkRulay shey" },
              { p: "درکړلای شئ", f: "dărkRulaay shey" },
            ],
          ],
          [
            [
              { p: "درکړلی شي", f: "dărkRulay shee" },
              { p: "درکړلای شي", f: "dărkRulaay shee" },
            ],
            [
              { p: "درکړلی شي", f: "dărkRulay shee" },
              { p: "درکړلای شي", f: "dărkRulaay shee" },
            ],
          ],
          [
            [
              { p: "درکړلی شي", f: "dărkRulay shee" },
              { p: "درکړلای شي", f: "dărkRulaay shee" },
            ],
            [
              { p: "درکړلی شي", f: "dărkRulay shee" },
              { p: "درکړلای شي", f: "dărkRulaay shee" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "درکړی شم", f: "dărkRay shum" },
              { p: "درکړای شم", f: "dărkRáay shum" },
            ],
            [
              { p: "درکړی شو", f: "dărkRay shoo" },
              { p: "درکړای شو", f: "dărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "درکړی شم", f: "dărkRay shum" },
              { p: "درکړای شم", f: "dărkRáay shum" },
            ],
            [
              { p: "درکړی شو", f: "dărkRay shoo" },
              { p: "درکړای شو", f: "dărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "درکړی شې", f: "dărkRay she" },
              { p: "درکړای شې", f: "dărkRáay she" },
            ],
            [
              { p: "درکړی شئ", f: "dărkRay shey" },
              { p: "درکړای شئ", f: "dărkRáay shey" },
            ],
          ],
          [
            [
              { p: "درکړی شې", f: "dărkRay she" },
              { p: "درکړای شې", f: "dărkRáay she" },
            ],
            [
              { p: "درکړی شئ", f: "dărkRay shey" },
              { p: "درکړای شئ", f: "dărkRáay shey" },
            ],
          ],
          [
            [
              { p: "درکړی شي", f: "dărkRay shee" },
              { p: "درکړای شي", f: "dărkRáay shee" },
            ],
            [
              { p: "درکړی شي", f: "dărkRay shee" },
              { p: "درکړای شي", f: "dărkRáay shee" },
            ],
          ],
          [
            [
              { p: "درکړی شي", f: "dărkRay shee" },
              { p: "درکړای شي", f: "dărkRáay shee" },
            ],
            [
              { p: "درکړی شي", f: "dărkRay shee" },
              { p: "درکړای شي", f: "dărkRáay shee" },
            ],
          ],
        ],
      },
      future: {
        long: [
          [
            [
              { p: "به درکړلی شم", f: "ba dărkRulay shum" },
              { p: "به درکړلای شم", f: "ba dărkRulaay shum" },
            ],
            [
              { p: "به درکړلی شو", f: "ba dărkRulay shoo" },
              { p: "به درکړلای شو", f: "ba dărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "به درکړلی شم", f: "ba dărkRulay shum" },
              { p: "به درکړلای شم", f: "ba dărkRulaay shum" },
            ],
            [
              { p: "به درکړلی شو", f: "ba dărkRulay shoo" },
              { p: "به درکړلای شو", f: "ba dărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "به درکړلی شې", f: "ba dărkRulay she" },
              { p: "به درکړلای شې", f: "ba dărkRulaay she" },
            ],
            [
              { p: "به درکړلی شئ", f: "ba dărkRulay shey" },
              { p: "به درکړلای شئ", f: "ba dărkRulaay shey" },
            ],
          ],
          [
            [
              { p: "به درکړلی شې", f: "ba dărkRulay she" },
              { p: "به درکړلای شې", f: "ba dărkRulaay she" },
            ],
            [
              { p: "به درکړلی شئ", f: "ba dărkRulay shey" },
              { p: "به درکړلای شئ", f: "ba dărkRulaay shey" },
            ],
          ],
          [
            [
              { p: "به درکړلی شي", f: "ba dărkRulay shee" },
              { p: "به درکړلای شي", f: "ba dărkRulaay shee" },
            ],
            [
              { p: "به درکړلی شي", f: "ba dărkRulay shee" },
              { p: "به درکړلای شي", f: "ba dărkRulaay shee" },
            ],
          ],
          [
            [
              { p: "به درکړلی شي", f: "ba dărkRulay shee" },
              { p: "به درکړلای شي", f: "ba dărkRulaay shee" },
            ],
            [
              { p: "به درکړلی شي", f: "ba dărkRulay shee" },
              { p: "به درکړلای شي", f: "ba dărkRulaay shee" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "به درکړی شم", f: "ba dărkRay shum" },
              { p: "به درکړای شم", f: "ba dărkRáay shum" },
            ],
            [
              { p: "به درکړی شو", f: "ba dărkRay shoo" },
              { p: "به درکړای شو", f: "ba dărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "به درکړی شم", f: "ba dărkRay shum" },
              { p: "به درکړای شم", f: "ba dărkRáay shum" },
            ],
            [
              { p: "به درکړی شو", f: "ba dărkRay shoo" },
              { p: "به درکړای شو", f: "ba dărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "به درکړی شې", f: "ba dărkRay she" },
              { p: "به درکړای شې", f: "ba dărkRáay she" },
            ],
            [
              { p: "به درکړی شئ", f: "ba dărkRay shey" },
              { p: "به درکړای شئ", f: "ba dărkRáay shey" },
            ],
          ],
          [
            [
              { p: "به درکړی شې", f: "ba dărkRay she" },
              { p: "به درکړای شې", f: "ba dărkRáay she" },
            ],
            [
              { p: "به درکړی شئ", f: "ba dărkRay shey" },
              { p: "به درکړای شئ", f: "ba dărkRáay shey" },
            ],
          ],
          [
            [
              { p: "به درکړی شي", f: "ba dărkRay shee" },
              { p: "به درکړای شي", f: "ba dărkRáay shee" },
            ],
            [
              { p: "به درکړی شي", f: "ba dărkRay shee" },
              { p: "به درکړای شي", f: "ba dărkRáay shee" },
            ],
          ],
          [
            [
              { p: "به درکړی شي", f: "ba dărkRay shee" },
              { p: "به درکړای شي", f: "ba dărkRáay shee" },
            ],
            [
              { p: "به درکړی شي", f: "ba dărkRay shee" },
              { p: "به درکړای شي", f: "ba dărkRáay shee" },
            ],
          ],
        ],
      },
      past: {
        long: [
          [
            [
              { p: "درکړلی شوم", f: "dărkRulay shwum" },
              { p: "درکړلای شوم", f: "dărkRulaay shwum" },
            ],
            [
              { p: "درکړلی شو", f: "dărkRulay shoo" },
              { p: "درکړلای شو", f: "dărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "درکړلی شوم", f: "dărkRulay shwum" },
              { p: "درکړلای شوم", f: "dărkRulaay shwum" },
            ],
            [
              { p: "درکړلی شو", f: "dărkRulay shoo" },
              { p: "درکړلای شو", f: "dărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "درکړلی شوې", f: "dărkRulay shwe" },
              { p: "درکړلای شوې", f: "dărkRulaay shwe" },
            ],
            [
              { p: "درکړلی شوئ", f: "dărkRulay shwey" },
              { p: "درکړلای شوئ", f: "dărkRulaay shwey" },
            ],
          ],
          [
            [
              { p: "درکړلی شوې", f: "dărkRulay shwe" },
              { p: "درکړلای شوې", f: "dărkRulaay shwe" },
            ],
            [
              { p: "درکړلی شوئ", f: "dărkRulay shwey" },
              { p: "درکړلای شوئ", f: "dărkRulaay shwey" },
            ],
          ],
          [
            [
              { p: "درکړلی شو", f: "dărkRulay sho" },
              { p: "درکړلای شو", f: "dărkRulaay sho" },
            ],
            [
              { p: "درکړلی شول", f: "dărkRulay shwul" },
              { p: "درکړلای شول", f: "dărkRulaay shwul" },
              { p: "درکړلی شو", f: "dărkRulay shoo" },
              { p: "درکړلای شو", f: "dărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "درکړلی شوه", f: "dărkRulay shwa" },
              { p: "درکړلای شوه", f: "dărkRulaay shwa" },
            ],
            [
              { p: "درکړلی شولې", f: "dărkRulay shwule" },
              { p: "درکړلای شولې", f: "dărkRulaay shwule" },
              { p: "درکړلی شوې", f: "dărkRulay shwe" },
              { p: "درکړلای شوې", f: "dărkRulaay shwe" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "درکړی شوم", f: "dărkRay shwum" },
              { p: "درکړای شوم", f: "dărkRáay shwum" },
            ],
            [
              { p: "درکړی شو", f: "dărkRay shoo" },
              { p: "درکړای شو", f: "dărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "درکړی شوم", f: "dărkRay shwum" },
              { p: "درکړای شوم", f: "dărkRáay shwum" },
            ],
            [
              { p: "درکړی شو", f: "dărkRay shoo" },
              { p: "درکړای شو", f: "dărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "درکړی شوې", f: "dărkRay shwe" },
              { p: "درکړای شوې", f: "dărkRáay shwe" },
            ],
            [
              { p: "درکړی شوئ", f: "dărkRay shwey" },
              { p: "درکړای شوئ", f: "dărkRáay shwey" },
            ],
          ],
          [
            [
              { p: "درکړی شوې", f: "dărkRay shwe" },
              { p: "درکړای شوې", f: "dărkRáay shwe" },
            ],
            [
              { p: "درکړی شوئ", f: "dărkRay shwey" },
              { p: "درکړای شوئ", f: "dărkRáay shwey" },
            ],
          ],
          [
            [
              { p: "درکړی شو", f: "dărkRay sho" },
              { p: "درکړای شو", f: "dărkRáay sho" },
            ],
            [
              { p: "درکړی شول", f: "dărkRay shwul" },
              { p: "درکړای شول", f: "dărkRáay shwul" },
              { p: "درکړی شو", f: "dărkRay shoo" },
              { p: "درکړای شو", f: "dărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "درکړی شوه", f: "dărkRay shwa" },
              { p: "درکړای شوه", f: "dărkRáay shwa" },
            ],
            [
              { p: "درکړی شولې", f: "dărkRay shwule" },
              { p: "درکړای شولې", f: "dărkRáay shwule" },
              { p: "درکړی شوې", f: "dărkRay shwe" },
              { p: "درکړای شوې", f: "dărkRáay shwe" },
            ],
          ],
        ],
      },
      habitualPast: {
        long: [
          [
            [
              { p: "به درکړلی شوم", f: "ba dărkRulay shwum" },
              { p: "به درکړلای شوم", f: "ba dărkRulaay shwum" },
            ],
            [
              { p: "به درکړلی شو", f: "ba dărkRulay shoo" },
              { p: "به درکړلای شو", f: "ba dărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "به درکړلی شوم", f: "ba dărkRulay shwum" },
              { p: "به درکړلای شوم", f: "ba dărkRulaay shwum" },
            ],
            [
              { p: "به درکړلی شو", f: "ba dărkRulay shoo" },
              { p: "به درکړلای شو", f: "ba dărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "به درکړلی شوې", f: "ba dărkRulay shwe" },
              { p: "به درکړلای شوې", f: "ba dărkRulaay shwe" },
            ],
            [
              { p: "به درکړلی شوئ", f: "ba dărkRulay shwey" },
              { p: "به درکړلای شوئ", f: "ba dărkRulaay shwey" },
            ],
          ],
          [
            [
              { p: "به درکړلی شوې", f: "ba dărkRulay shwe" },
              { p: "به درکړلای شوې", f: "ba dărkRulaay shwe" },
            ],
            [
              { p: "به درکړلی شوئ", f: "ba dărkRulay shwey" },
              { p: "به درکړلای شوئ", f: "ba dărkRulaay shwey" },
            ],
          ],
          [
            [
              { p: "به درکړلی شو", f: "ba dărkRulay sho" },
              { p: "به درکړلای شو", f: "ba dărkRulaay sho" },
            ],
            [
              { p: "به درکړلی شول", f: "ba dărkRulay shwul" },
              { p: "به درکړلای شول", f: "ba dărkRulaay shwul" },
              { p: "به درکړلی شو", f: "ba dărkRulay shoo" },
              { p: "به درکړلای شو", f: "ba dărkRulaay shoo" },
            ],
          ],
          [
            [
              { p: "به درکړلی شوه", f: "ba dărkRulay shwa" },
              { p: "به درکړلای شوه", f: "ba dărkRulaay shwa" },
            ],
            [
              { p: "به درکړلی شولې", f: "ba dărkRulay shwule" },
              { p: "به درکړلای شولې", f: "ba dărkRulaay shwule" },
              { p: "به درکړلی شوې", f: "ba dărkRulay shwe" },
              { p: "به درکړلای شوې", f: "ba dărkRulaay shwe" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "به درکړی شوم", f: "ba dărkRay shwum" },
              { p: "به درکړای شوم", f: "ba dărkRáay shwum" },
            ],
            [
              { p: "به درکړی شو", f: "ba dărkRay shoo" },
              { p: "به درکړای شو", f: "ba dărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "به درکړی شوم", f: "ba dărkRay shwum" },
              { p: "به درکړای شوم", f: "ba dărkRáay shwum" },
            ],
            [
              { p: "به درکړی شو", f: "ba dărkRay shoo" },
              { p: "به درکړای شو", f: "ba dărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "به درکړی شوې", f: "ba dărkRay shwe" },
              { p: "به درکړای شوې", f: "ba dărkRáay shwe" },
            ],
            [
              { p: "به درکړی شوئ", f: "ba dărkRay shwey" },
              { p: "به درکړای شوئ", f: "ba dărkRáay shwey" },
            ],
          ],
          [
            [
              { p: "به درکړی شوې", f: "ba dărkRay shwe" },
              { p: "به درکړای شوې", f: "ba dărkRáay shwe" },
            ],
            [
              { p: "به درکړی شوئ", f: "ba dărkRay shwey" },
              { p: "به درکړای شوئ", f: "ba dărkRáay shwey" },
            ],
          ],
          [
            [
              { p: "به درکړی شو", f: "ba dărkRay sho" },
              { p: "به درکړای شو", f: "ba dărkRáay sho" },
            ],
            [
              { p: "به درکړی شول", f: "ba dărkRay shwul" },
              { p: "به درکړای شول", f: "ba dărkRáay shwul" },
              { p: "به درکړی شو", f: "ba dărkRay shoo" },
              { p: "به درکړای شو", f: "ba dărkRáay shoo" },
            ],
          ],
          [
            [
              { p: "به درکړی شوه", f: "ba dărkRay shwa" },
              { p: "به درکړای شوه", f: "ba dărkRáay shwa" },
            ],
            [
              { p: "به درکړی شولې", f: "ba dărkRay shwule" },
              { p: "به درکړای شولې", f: "ba dărkRáay shwule" },
              { p: "به درکړی شوې", f: "ba dărkRay shwe" },
              { p: "به درکړای شوې", f: "ba dărkRáay shwe" },
            ],
          ],
        ],
      },
      hypotheticalPast: {
        long: [
          [
            [
              { p: "درکړلی شوای", f: "dărkRulay shwaay" },
              { p: "درکړلی شوی", f: "dărkRulay shway" },
              { p: "درکړلای شوای", f: "dărkRulaay shwaay" },
            ],
            [
              { p: "درکړلی شوای", f: "dărkRulay shwaay" },
              { p: "درکړلی شوی", f: "dărkRulay shway" },
              { p: "درکړلای شوای", f: "dărkRulaay shwaay" },
            ],
          ],
          [
            [
              { p: "درکړلی شوای", f: "dărkRulay shwaay" },
              { p: "درکړلی شوی", f: "dărkRulay shway" },
              { p: "درکړلای شوای", f: "dărkRulaay shwaay" },
            ],
            [
              { p: "درکړلی شوای", f: "dărkRulay shwaay" },
              { p: "درکړلی شوی", f: "dărkRulay shway" },
              { p: "درکړلای شوای", f: "dărkRulaay shwaay" },
            ],
          ],
          [
            [
              { p: "درکړلی شوای", f: "dărkRulay shwaay" },
              { p: "درکړلی شوی", f: "dărkRulay shway" },
              { p: "درکړلای شوای", f: "dărkRulaay shwaay" },
            ],
            [
              { p: "درکړلی شوای", f: "dărkRulay shwaay" },
              { p: "درکړلی شوی", f: "dărkRulay shway" },
              { p: "درکړلای شوای", f: "dărkRulaay shwaay" },
            ],
          ],
          [
            [
              { p: "درکړلی شوای", f: "dărkRulay shwaay" },
              { p: "درکړلی شوی", f: "dărkRulay shway" },
              { p: "درکړلای شوای", f: "dărkRulaay shwaay" },
            ],
            [
              { p: "درکړلی شوای", f: "dărkRulay shwaay" },
              { p: "درکړلی شوی", f: "dărkRulay shway" },
              { p: "درکړلای شوای", f: "dărkRulaay shwaay" },
            ],
          ],
          [
            [
              { p: "درکړلی شوای", f: "dărkRulay shwaay" },
              { p: "درکړلی شوی", f: "dărkRulay shway" },
              { p: "درکړلای شوای", f: "dărkRulaay shwaay" },
            ],
            [
              { p: "درکړلی شوای", f: "dărkRulay shwaay" },
              { p: "درکړلی شوی", f: "dărkRulay shway" },
              { p: "درکړلای شوای", f: "dărkRulaay shwaay" },
            ],
          ],
          [
            [
              { p: "درکړلی شوای", f: "dărkRulay shwaay" },
              { p: "درکړلی شوی", f: "dărkRulay shway" },
              { p: "درکړلای شوای", f: "dărkRulaay shwaay" },
            ],
            [
              { p: "درکړلی شوای", f: "dărkRulay shwaay" },
              { p: "درکړلی شوی", f: "dărkRulay shway" },
              { p: "درکړلای شوای", f: "dărkRulaay shwaay" },
            ],
          ],
        ],
        short: [
          [
            [
              { p: "درکړی شوای", f: "dărkRay shwaay" },
              { p: "درکړی شوی", f: "dărkRay shway" },
              { p: "درکړای شوای", f: "dărkRáay shwaay" },
            ],
            [
              { p: "درکړی شوای", f: "dărkRay shwaay" },
              { p: "درکړی شوی", f: "dărkRay shway" },
              { p: "درکړای شوای", f: "dărkRáay shwaay" },
            ],
          ],
          [
            [
              { p: "درکړی شوای", f: "dărkRay shwaay" },
              { p: "درکړی شوی", f: "dărkRay shway" },
              { p: "درکړای شوای", f: "dărkRáay shwaay" },
            ],
            [
              { p: "درکړی شوای", f: "dărkRay shwaay" },
              { p: "درکړی شوی", f: "dărkRay shway" },
              { p: "درکړای شوای", f: "dărkRáay shwaay" },
            ],
          ],
          [
            [
              { p: "درکړی شوای", f: "dărkRay shwaay" },
              { p: "درکړی شوی", f: "dărkRay shway" },
              { p: "درکړای شوای", f: "dărkRáay shwaay" },
            ],
            [
              { p: "درکړی شوای", f: "dărkRay shwaay" },
              { p: "درکړی شوی", f: "dărkRay shway" },
              { p: "درکړای شوای", f: "dărkRáay shwaay" },
            ],
          ],
          [
            [
              { p: "درکړی شوای", f: "dărkRay shwaay" },
              { p: "درکړی شوی", f: "dărkRay shway" },
              { p: "درکړای شوای", f: "dărkRáay shwaay" },
            ],
            [
              { p: "درکړی شوای", f: "dărkRay shwaay" },
              { p: "درکړی شوی", f: "dărkRay shway" },
              { p: "درکړای شوای", f: "dărkRáay shwaay" },
            ],
          ],
          [
            [
              { p: "درکړی شوای", f: "dărkRay shwaay" },
              { p: "درکړی شوی", f: "dărkRay shway" },
              { p: "درکړای شوای", f: "dărkRáay shwaay" },
            ],
            [
              { p: "درکړی شوای", f: "dărkRay shwaay" },
              { p: "درکړی شوی", f: "dărkRay shway" },
              { p: "درکړای شوای", f: "dărkRáay shwaay" },
            ],
          ],
          [
            [
              { p: "درکړی شوای", f: "dărkRay shwaay" },
              { p: "درکړی شوی", f: "dărkRay shway" },
              { p: "درکړای شوای", f: "dărkRáay shwaay" },
            ],
            [
              { p: "درکړی شوای", f: "dărkRay shwaay" },
              { p: "درکړی شوی", f: "dărkRay shway" },
              { p: "درکړای شوای", f: "dărkRáay shwaay" },
            ],
          ],
        ],
      },
    },
  },
  hypothetical: {
    short: [
      [
        [
          { p: "درکوی", f: "dărkawáy" },
          { p: "درکوای", f: "dărkawáay" },
        ],
        [
          { p: "درکوی", f: "dărkawáy" },
          { p: "درکوای", f: "dărkawáay" },
        ],
      ],
      [
        [
          { p: "درکوی", f: "dărkawáy" },
          { p: "درکوای", f: "dărkawáay" },
        ],
        [
          { p: "درکوی", f: "dărkawáy" },
          { p: "درکوای", f: "dărkawáay" },
        ],
      ],
      [
        [
          { p: "درکوی", f: "dărkawáy" },
          { p: "درکوای", f: "dărkawáay" },
        ],
        [
          { p: "درکوی", f: "dărkawáy" },
          { p: "درکوای", f: "dărkawáay" },
        ],
      ],
      [
        [
          { p: "درکوی", f: "dărkawáy" },
          { p: "درکوای", f: "dărkawáay" },
        ],
        [
          { p: "درکوی", f: "dărkawáy" },
          { p: "درکوای", f: "dărkawáay" },
        ],
      ],
      [
        [
          { p: "درکوی", f: "dărkawáy" },
          { p: "درکوای", f: "dărkawáay" },
        ],
        [
          { p: "درکوی", f: "dărkawáy" },
          { p: "درکوای", f: "dărkawáay" },
        ],
      ],
      [
        [
          { p: "درکوی", f: "dărkawáy" },
          { p: "درکوای", f: "dărkawáay" },
        ],
        [
          { p: "درکوی", f: "dărkawáy" },
          { p: "درکوای", f: "dărkawáay" },
        ],
      ],
    ],
    long: [
      [
        [
          { p: "درکولی", f: "dărkawúlay" },
          { p: "درکولای", f: "dărkawúlaay" },
        ],
        [
          { p: "درکولی", f: "dărkawúlay" },
          { p: "درکولای", f: "dărkawúlaay" },
        ],
      ],
      [
        [
          { p: "درکولی", f: "dărkawúlay" },
          { p: "درکولای", f: "dărkawúlaay" },
        ],
        [
          { p: "درکولی", f: "dărkawúlay" },
          { p: "درکولای", f: "dărkawúlaay" },
        ],
      ],
      [
        [
          { p: "درکولی", f: "dărkawúlay" },
          { p: "درکولای", f: "dărkawúlaay" },
        ],
        [
          { p: "درکولی", f: "dărkawúlay" },
          { p: "درکولای", f: "dărkawúlaay" },
        ],
      ],
      [
        [
          { p: "درکولی", f: "dărkawúlay" },
          { p: "درکولای", f: "dărkawúlaay" },
        ],
        [
          { p: "درکولی", f: "dărkawúlay" },
          { p: "درکولای", f: "dărkawúlaay" },
        ],
      ],
      [
        [
          { p: "درکولی", f: "dărkawúlay" },
          { p: "درکولای", f: "dărkawúlaay" },
        ],
        [
          { p: "درکولی", f: "dărkawúlay" },
          { p: "درکولای", f: "dărkawúlaay" },
        ],
      ],
      [
        [
          { p: "درکولی", f: "dărkawúlay" },
          { p: "درکولای", f: "dărkawúlaay" },
        ],
        [
          { p: "درکولی", f: "dărkawúlay" },
          { p: "درکولای", f: "dărkawúlaay" },
        ],
      ],
    ],
  },
  participle: {
    past: {
      masc: [
        [{ p: "درکړی", f: "dărkúRay" }],
        [{ p: "درکړي", f: "dărkúRee" }],
        [
          { p: "درکړیو", f: "dărkúRiyo" },
          { p: "درکړو", f: "dărkúRo" },
        ],
      ],
      fem: [
        [{ p: "درکړې", f: "dărkúRe" }],
        [{ p: "درکړې", f: "dărkúRe" }],
        [{ p: "درکړو", f: "dărkúRo" }],
      ],
    },
    present: {
      masc: [
        [{ p: "درکوونکی", f: "dărkawóonkay" }],
        [{ p: "درکوونکي", f: "dărkawóonkee" }],
        [
          { p: "درکوونکیو", f: "dărkawóonkiyo" },
          { p: "درکوونکو", f: "dărkedóonko" },
        ],
      ],
      fem: [
        [{ p: "درکوونکې", f: "dărkawóonke" }],
        [{ p: "درکوونکې", f: "dărkawóonke" }],
        [{ p: "درکوونکو", f: "dărkawóonko" }],
      ],
    },
  },
  perfect: {
    halfPerfect: [
      [[{ p: "درکړی", f: "dărkúRay" }], [{ p: "درکړي", f: "dărkúRee" }]],
      [[{ p: "درکړې", f: "dărkúRe" }], [{ p: "درکړې", f: "dărkúRe" }]],
      [[{ p: "درکړی", f: "dărkúRay" }], [{ p: "درکړي", f: "dărkúRee" }]],
      [[{ p: "درکړې", f: "dărkúRe" }], [{ p: "درکړې", f: "dărkúRe" }]],
      [[{ p: "درکړی", f: "dărkúRay" }], [{ p: "درکړي", f: "dărkúRee" }]],
      [[{ p: "درکړې", f: "dărkúRe" }], [{ p: "درکړې", f: "dărkúRe" }]],
    ],
    past: [
      [
        [{ p: "درکړی وم", f: "dărkúRay wum" }],
        [{ p: "درکړي وو", f: "dărkúRee woo" }],
      ],
      [
        [{ p: "درکړې وم", f: "dărkúRe wum" }],
        [{ p: "درکړې وو", f: "dărkúRe woo" }],
      ],
      [
        [{ p: "درکړی وې", f: "dărkúRay we" }],
        [{ p: "درکړي وئ", f: "dărkúRee wey" }],
      ],
      [
        [{ p: "درکړې وې", f: "dărkúRe we" }],
        [{ p: "درکړې وئ", f: "dărkúRe wey" }],
      ],
      [
        [{ p: "درکړی و", f: "dărkúRay wo" }],
        [{ p: "درکړي وو", f: "dărkúRee woo" }],
      ],
      [
        [{ p: "درکړې وه", f: "dărkúRe wa" }],
        [{ p: "درکړې وې", f: "dărkúRe we" }],
      ],
    ],
    present: [
      [
        [{ p: "درکړی یم", f: "dărkúRay yum" }],
        [{ p: "درکړي یو", f: "dărkúRee yoo" }],
      ],
      [
        [{ p: "درکړې یم", f: "dărkúRe yum" }],
        [{ p: "درکړې یو", f: "dărkúRe yoo" }],
      ],
      [
        [{ p: "درکړی یې", f: "dărkúRay ye" }],
        [{ p: "درکړي یئ", f: "dărkúRee yey" }],
      ],
      [
        [{ p: "درکړې یې", f: "dărkúRe ye" }],
        [{ p: "درکړې یئ", f: "dărkúRe yey" }],
      ],
      [
        [{ p: "درکړی دی", f: "dărkúRay day" }],
        [{ p: "درکړي دي", f: "dărkúRee dee" }],
      ],
      [
        [{ p: "درکړې ده", f: "dărkúRe da" }],
        [{ p: "درکړې دي", f: "dărkúRe dee" }],
      ],
    ],
    habitual: [
      [
        [{ p: "درکړی یم", f: "dărkúRay yum" }],
        [{ p: "درکړي یو", f: "dărkúRee yoo" }],
      ],
      [
        [{ p: "درکړې یم", f: "dărkúRe yum" }],
        [{ p: "درکړې یو", f: "dărkúRe yoo" }],
      ],
      [
        [{ p: "درکړی یې", f: "dărkúRay ye" }],
        [{ p: "درکړي یئ", f: "dărkúRee yey" }],
      ],
      [
        [{ p: "درکړې یې", f: "dărkúRe ye" }],
        [{ p: "درکړې یئ", f: "dărkúRe yey" }],
      ],
      [
        [{ p: "درکړی وي", f: "dărkúRay wee" }],
        [{ p: "درکړي وي", f: "dărkúRee wee" }],
      ],
      [
        [{ p: "درکړې وي", f: "dărkúRe wee" }],
        [{ p: "درکړې وي", f: "dărkúRe wee" }],
      ],
    ],
    subjunctive: [
      [
        [{ p: "درکړی وم", f: "dărkúRay wum" }],
        [{ p: "درکړي وو", f: "dărkúRee woo" }],
      ],
      [
        [{ p: "درکړې وم", f: "dărkúRe wum" }],
        [{ p: "درکړې وو", f: "dărkúRe woo" }],
      ],
      [
        [{ p: "درکړی وې", f: "dărkúRay we" }],
        [{ p: "درکړي وئ", f: "dărkúRee wey" }],
      ],
      [
        [{ p: "درکړې وې", f: "dărkúRe we" }],
        [{ p: "درکړې وئ", f: "dărkúRe wey" }],
      ],
      [
        [{ p: "درکړی وي", f: "dărkúRay wee" }],
        [{ p: "درکړي وي", f: "dărkúRee wee" }],
      ],
      [
        [{ p: "درکړې وي", f: "dărkúRe wee" }],
        [{ p: "درکړې وي", f: "dărkúRe wee" }],
      ],
    ],
    future: [
      [
        [{ p: "به درکړی یم", f: "ba dărkúRay yum" }],
        [{ p: "به درکړي یو", f: "ba dărkúRee yoo" }],
      ],
      [
        [{ p: "به درکړې یم", f: "ba dărkúRe yum" }],
        [{ p: "به درکړې یو", f: "ba dărkúRe yoo" }],
      ],
      [
        [{ p: "به درکړی یې", f: "ba dărkúRay ye" }],
        [{ p: "به درکړي یئ", f: "ba dărkúRee yey" }],
      ],
      [
        [{ p: "به درکړې یې", f: "ba dărkúRe ye" }],
        [{ p: "به درکړې یئ", f: "ba dărkúRe yey" }],
      ],
      [
        [{ p: "به درکړی وي", f: "ba dărkúRay wee" }],
        [{ p: "به درکړي وي", f: "ba dărkúRee wee" }],
      ],
      [
        [{ p: "به درکړې وي", f: "ba dărkúRe wee" }],
        [{ p: "به درکړې وي", f: "ba dărkúRe wee" }],
      ],
    ],
    wouldBe: [
      [
        [{ p: "به درکړی وم", f: "ba dărkúRay wum" }],
        [{ p: "به درکړي وو", f: "ba dărkúRee woo" }],
      ],
      [
        [{ p: "به درکړې وم", f: "ba dărkúRe wum" }],
        [{ p: "به درکړې وو", f: "ba dărkúRe woo" }],
      ],
      [
        [{ p: "به درکړی وې", f: "ba dărkúRay we" }],
        [{ p: "به درکړي وئ", f: "ba dărkúRee wey" }],
      ],
      [
        [{ p: "به درکړې وې", f: "ba dărkúRe we" }],
        [{ p: "به درکړې وئ", f: "ba dărkúRe wey" }],
      ],
      [
        [{ p: "به درکړی و", f: "ba dărkúRay wo" }],
        [{ p: "به درکړي وو", f: "ba dărkúRee woo" }],
      ],
      [
        [{ p: "به درکړې وه", f: "ba dărkúRe wa" }],
        [{ p: "به درکړې وې", f: "ba dărkúRe we" }],
      ],
    ],
    pastSubjunctive: [
      [
        [
          { p: "درکړی وای", f: "dărkúRay waay" },
          { p: "درکړی وی", f: "dărkúRay way" },
        ],
        [
          { p: "درکړی وای", f: "dărkúRay waay" },
          { p: "درکړی وی", f: "dărkúRay way" },
        ],
      ],
      [
        [
          { p: "درکړې وای", f: "dărkúRe waay" },
          { p: "درکړې وی", f: "dărkúRe way" },
        ],
        [
          { p: "درکړې وای", f: "dărkúRe waay" },
          { p: "درکړې وی", f: "dărkúRe way" },
        ],
      ],
      [
        [
          { p: "درکړی وای", f: "dărkúRay waay" },
          { p: "درکړی وی", f: "dărkúRay way" },
        ],
        [
          { p: "درکړی وای", f: "dărkúRay waay" },
          { p: "درکړی وی", f: "dărkúRay way" },
        ],
      ],
      [
        [
          { p: "درکړې وای", f: "dărkúRe waay" },
          { p: "درکړې وی", f: "dărkúRe way" },
        ],
        [
          { p: "درکړې وای", f: "dărkúRe waay" },
          { p: "درکړې وی", f: "dărkúRe way" },
        ],
      ],
      [
        [
          { p: "درکړی وای", f: "dărkúRay waay" },
          { p: "درکړی وی", f: "dărkúRay way" },
        ],
        [
          { p: "درکړی وای", f: "dărkúRay waay" },
          { p: "درکړی وی", f: "dărkúRay way" },
        ],
      ],
      [
        [
          { p: "درکړې وای", f: "dărkúRe waay" },
          { p: "درکړې وی", f: "dărkúRe way" },
        ],
        [
          { p: "درکړې وای", f: "dărkúRe waay" },
          { p: "درکړې وی", f: "dărkúRe way" },
        ],
      ],
    ],
    wouldHaveBeen: [
      [
        [
          { p: "به درکړی وای", f: "ba dărkúRay waay" },
          { p: "به درکړی وی", f: "ba dărkúRay way" },
        ],
        [
          { p: "به درکړی وای", f: "ba dărkúRay waay" },
          { p: "به درکړی وی", f: "ba dărkúRay way" },
        ],
      ],
      [
        [
          { p: "به درکړې وای", f: "ba dărkúRe waay" },
          { p: "به درکړې وی", f: "ba dărkúRe way" },
        ],
        [
          { p: "به درکړې وای", f: "ba dărkúRe waay" },
          { p: "به درکړې وی", f: "ba dărkúRe way" },
        ],
      ],
      [
        [
          { p: "به درکړی وای", f: "ba dărkúRay waay" },
          { p: "به درکړی وی", f: "ba dărkúRay way" },
        ],
        [
          { p: "به درکړی وای", f: "ba dărkúRay waay" },
          { p: "به درکړی وی", f: "ba dărkúRay way" },
        ],
      ],
      [
        [
          { p: "به درکړې وای", f: "ba dărkúRe waay" },
          { p: "به درکړې وی", f: "ba dărkúRe way" },
        ],
        [
          { p: "به درکړې وای", f: "ba dărkúRe waay" },
          { p: "به درکړې وی", f: "ba dărkúRe way" },
        ],
      ],
      [
        [
          { p: "به درکړی وای", f: "ba dărkúRay waay" },
          { p: "به درکړی وی", f: "ba dărkúRay way" },
        ],
        [
          { p: "به درکړی وای", f: "ba dărkúRay waay" },
          { p: "به درکړی وی", f: "ba dărkúRay way" },
        ],
      ],
      [
        [
          { p: "به درکړې وای", f: "ba dărkúRe waay" },
          { p: "به درکړې وی", f: "ba dărkúRe way" },
        ],
        [
          { p: "به درکړې وای", f: "ba dărkúRe waay" },
          { p: "به درکړې وی", f: "ba dărkúRe way" },
        ],
      ],
    ],
  },
  // passive: {
  //     imperfective: {
  //         nonImperative: [
  //             [{p: "درکول کېږم", f: "dărkawul keGum"}, {p: "درکول کېږو", f: "dărkawul keGoo"}],
  //             [{p: "درکول کېږې", f: "dărkawul keGe"}, {p: "درکول کېږئ", f: "dărkawul keGey"}],
  //             [{p: "درکول کېږي", f: "dărkawul keGee"}, {p: "درکول کېږي", f: "dărkawul keGee"}],
  //         ],
  //         future: [
  //             [{p: "به درکول کېږم", f: "ba dărkawul keGum"}, {p: "به درکول کېږو", f: "ba dărkawul keGoo"}],
  //             [{p: "به درکول کېږې", f: "ba dărkawul keGe"}, {p: "به درکول کېږئ", f: "ba dărkawul keGey"}],
  //             [{p: "به درکول کېږي", f: "ba dărkawul keGee"}, {p: "به درکول کېږي", f: "ba dărkawul keGee"}],
  //         ],
  //         past: {
  //             short: [
  //                 [[{p: "درکول کېدم", f: "dărkawul kedum"}], [{p: "درکول کېدو", f: "dărkawul kedóo"}]],
  //                 [[{p: "درکول کېدم", f: "dărkawul kedum"}], [{p: "درکول کېدو", f: "dărkawul kedóo"}]],
  //                 [[{p: "درکول کېدې", f: "dărkawul kedé"}], [{p: "درکول کېدئ", f: "dărkawul kedéy"}]],
  //                 [[{p: "درکول کېدې", f: "dărkawul kedé"}], [{p: "درکول کېدئ", f: "dărkawul kedéy"}]],
  //                 [[{p: "درکول کېده", f: "dărkawul kedu"}, {p: "درکول کېدو", f: "dărkawul kedó"}], [{p: "درکول کېدل", f: "dărkawul kedul"}]],
  //                 [[{p: "درکول کېده", f: "dărkawul kedá"}], [{p: "درکول کېدې", f: "dărkawul kedé"}]],
  //             ],
  //             long: [
  //                 [[{p: "درکول کېدلم", f: "dărkawul kedúlum"}], [{p: "درکول کېدلو", f: "dărkawul kedúloo"}]],
  //                 [[{p: "درکول کېدلم", f: "dărkawul kedúlum"}], [{p: "درکول کېدلو", f: "dărkawul kedúloo"}]],
  //                 [[{p: "درکول کېدلې", f: "dărkawul kedúle"}], [{p: "درکول کېدلئ", f: "dărkawul kedúley"}]],
  //                 [[{p: "درکول کېدلې", f: "dărkawul kedúle"}], [{p: "درکول کېدلئ", f: "dărkawul kedúley"}]],
  //                 [[{p: "درکول کېدله", f: "dărkawul kedúlu"}, {p: "درکول کېدلو", f: "dărkawul kedúlo"}], [{p: "درکول کېدل", f: "dărkawul kedúl"}]],
  //                 [[{p: "درکول کېدله", f: "dărkawul kedúla"}], [{p: "درکول کېدلې", f: "dărkawul kedúle"}]],
  //             ],
  //         },
  //     },
  //     perfective: {
  //         nonImperative: {
  //             short: [
  //                 [{p: "درکړلی کېږم", f: "dărkRulay keGum"}, {p: "درکړلی کېږو", f: "dărkRulay keGoo"}],
  //                 [{p: "درکړلی کېږې", f: "dărkRulay keGe"}, {p: "درکړلی کېږئ", f: "dărkRulay keGey"}],
  //                 [{p: "درکړلی کېږي", f: "dărkRulay keGee"}, {p: "درکړلی کېږي", f: "dărkRulay keGee"}],
  //             ],
  //             long: [
  //                 [{p: "درکړی کېږم", f: "dărkRay keGum"}, {p: "درکړی کېږو", f: "dărkRay keGoo"}],
  //                 [{p: "درکړی کېږې", f: "dărkRay keGe"}, {p: "درکړی کېږئ", f: "dărkRay keGey"}],
  //                 [{p: "درکړی کېږي", f: "dărkRay keGee"}, {p: "درکړی کېږي", f: "dărkRay keGee"}],
  //             ],
  //         },
  //         future: {
  //             short: [
  //                 [{p: "به درکړلی کېږم", f: "ba dărkRulay keGum"}, {p: "به درکړلی کېږو", f: "ba dărkRulay keGoo"}],
  //                 [{p: "به درکړلی کېږې", f: "ba dărkRulay keGe"}, {p: "به درکړلی کېږئ", f: "ba dărkRulay keGey"}],
  //                 [{p: "به درکړلی کېږي", f: "ba dărkRulay keGee"}, {p: "به درکړلی کېږي", f: "ba dărkRulay keGee"}],
  //             ],
  //             long: [
  //                 [{p: "به درکړی کېږم", f: "ba dărkRay keGum"}, {p: "به درکړی کېږو", f: "ba dărkRay keGoo"}],
  //                 [{p: "به درکړی کېږې", f: "ba dărkRay keGe"}, {p: "به درکړی کېږئ", f: "ba dărkRay keGey"}],
  //                 [{p: "به درکړی کېږي", f: "ba dărkRay keGee"}, {p: "به درکړی کېږي", f: "ba dărkRay keGee"}],
  //             ],
  //         },
  //         past: {
  //             short: [
  //                 [[{p: "درکړی شوم", f: "dărkRay shwum"}], [{p: "درکړی شو", f: "dărkRay shoo"}]],
  //                 [[{p: "درکړی شوم", f: "dărkRay shwum"}], [{p: "درکړی شو", f: "dărkRay shoo"}]],
  //                 [[{p: "درکړی شوې", f: "dărkRay shwe"}], [{p: "درکړی شوئ", f: "dărkRay shwey"}]],
  //                 [[{p: "درکړی شوې", f: "dărkRay shwe"}], [{p: "درکړی شوئ", f: "dărkRay shwey"}]],
  //                 [[{p: "درکړی شو", f: "dărkRay sho"}], [{p: "درکړی شو", f: "dărkRay shoo"}, {p: "درکړی شول", f: "dărkRay shwul"}]],
  //                 [[{p: "درکړی شوه", f: "dărkRay shwa"}], [{p: "درکړی شوې", f: "dărkRay shwe"}]],
  //             ],
  //             long: [
  //                 [[{p: "درکړلی شوم", f: "dărkRúlay shwum"}], [{p: "درکړلی شو", f: "dărkRúlay shoo"}]],
  //                 [[{p: "درکړلی شوم", f: "dărkRúlay shwum"}], [{p: "درکړلی شو", f: "dărkRúlay shoo"}]],
  //                 [[{p: "درکړلی شوې", f: "dărkRúlay shwe"}], [{p: "درکړلی شوئ", f: "dărkRúlay shwey"}]],
  //                 [[{p: "درکړلی شوې", f: "dărkRúlay shwe"}], [{p: "درکړلی شوئ", f: "dărkRúlay shwey"}]],
  //                 [[{p: "درکړلی شو", f: "dărkRúlay sho"}], [{p: "درکړلی شو", f: "dărkRúlay shoo"}, {p: "درکړلی شول", f: "dărkRúlay shwul"}]],
  //                 [[{p: "درکړلی شوه", f: "dărkRúlay shwa"}], [{p: "درکړلی شوې", f: "dărkRúlay shwe"}]],
  //             ],
  //         },
  //     },
  //     perfect: {
  //         halfPerfect: {
  //             short: [
  //                 [[{p: "درکړی شوی", f: "dărkRáy shuway"}], [{p: "درکړی شوي", f: "dărkRáy shuwee"}]],
  //                 [[{p: "درکړی شوې", f: "dărkRáy shuwe"}], [{p: "درکړی شوې", f: "dărkRáy shuwe"}]],
  //                 [[{p: "درکړی شوی", f: "dărkRáy shuway"}], [{p: "درکړی شوي", f: "dărkRáy shuwee"}]],
  //                 [[{p: "درکړی شوې", f: "dărkRáy shuwe"}], [{p: "درکړی شوې", f: "dărkRáy shuwe"}]],
  //                 [[{p: "درکړی شوی", f: "dărkRáy shuway"}], [{p: "درکړی شوي", f: "dărkRáy shuwee"}]],
  //                 [[{p: "درکړی شوې", f: "dărkRáy shuwe"}], [{p: "درکړی شوې", f: "dărkRáy shuwe"}]],
  //             ],
  //             long: [
  //                 [[{p: "درکړلی شوی", f: "dărkRúlay shuway"}], [{p: "درکړلی شوي", f: "dărkRúlay shuwee"}]],
  //                 [[{p: "درکړلی شوې", f: "dărkRúlay shuwe"}], [{p: "درکړلی شوې", f: "dărkRúlay shuwe"}]],
  //                 [[{p: "درکړلی شوی", f: "dărkRúlay shuway"}], [{p: "درکړلی شوي", f: "dărkRúlay shuwee"}]],
  //                 [[{p: "درکړلی شوې", f: "dărkRúlay shuwe"}], [{p: "درکړلی شوې", f: "dărkRúlay shuwe"}]],
  //                 [[{p: "درکړلی شوی", f: "dărkRúlay shuway"}], [{p: "درکړلی شوي", f: "dărkRúlay shuwee"}]],
  //                 [[{p: "درکړلی شوې", f: "dărkRúlay shuwe"}], [{p: "درکړلی شوې", f: "dărkRúlay shuwe"}]],
  //             ],
  //         },
  //         past: {
  //             short: [
  //                 [[{p: "درکړی شوی وم", f: "dărkRáy shuway wum"}], [{p: "درکړی شوي وو", f: "dărkRáy shuwee woo"}]],
  //                 [[{p: "درکړی شوې وم", f: "dărkRáy shuwe wum"}], [{p: "درکړی شوې وو", f: "dărkRáy shuwe woo"}]],
  //                 [[{p: "درکړی شوی وې", f: "dărkRáy shuway we"}], [{p: "درکړی شوي وئ", f: "dărkRáy shuwee wey"}]],
  //                 [[{p: "درکړی شوې وې", f: "dărkRáy shuwe we"}], [{p: "درکړی شوې وئ", f: "dărkRáy shuwe wey"}]],
  //                 [[{p: "درکړی شوی و", f: "dărkRáy shuway wo"}], [{p: "درکړی شوي وو", f: "dărkRáy shuwee woo"}]],
  //                 [[{p: "درکړی شوې وه", f: "dărkRáy shuwe wa"}], [{p: "درکړی شوې وې", f: "dărkRáy shuwe we"}]],
  //             ],
  //             long: [
  //                 [[{p: "درکړلی شوی وم", f: "dărkRúlay shuway wum"}], [{p: "درکړلی شوي وو", f: "dărkRúlay shuwee woo"}]],
  //                 [[{p: "درکړلی شوې وم", f: "dărkRúlay shuwe wum"}], [{p: "درکړلی شوې وو", f: "dărkRúlay shuwe woo"}]],
  //                 [[{p: "درکړلی شوی وې", f: "dărkRúlay shuway we"}], [{p: "درکړلی شوي وئ", f: "dărkRúlay shuwee wey"}]],
  //                 [[{p: "درکړلی شوې وې", f: "dărkRúlay shuwe we"}], [{p: "درکړلی شوې وئ", f: "dărkRúlay shuwe wey"}]],
  //                 [[{p: "درکړلی شوی و", f: "dărkRúlay shuway wo"}], [{p: "درکړلی شوي وو", f: "dărkRúlay shuwee woo"}]],
  //                 [[{p: "درکړلی شوې وه", f: "dărkRúlay shuwe wa"}], [{p: "درکړلی شوې وې", f: "dărkRúlay shuwe we"}]],
  //             ],
  //         },
  //         present: {
  //             short: [
  //                 [[{p: "درکړی شوی یم", f: "dărkRáy shuway yum"}], [{p: "درکړی شوي یو", f: "dărkRáy shuwee yoo"}]],
  //                 [[{p: "درکړی شوې یم", f: "dărkRáy shuwe yum"}], [{p: "درکړی شوې یو", f: "dărkRáy shuwe yoo"}]],
  //                 [[{p: "درکړی شوی یې", f: "dărkRáy shuway ye"}], [{p: "درکړی شوي یئ", f: "dărkRáy shuwee yey"}]],
  //                 [[{p: "درکړی شوې یې", f: "dărkRáy shuwe ye"}], [{p: "درکړی شوې یئ", f: "dărkRáy shuwe yey"}]],
  //                 [[{p: "درکړی شوی دی", f: "dărkRáy shuway day"}], [{p: "درکړی شوي دي", f: "dărkRáy shuwee dee"}]],
  //                 [[{p: "درکړی شوې ده", f: "dărkRáy shuwe da"}], [{p: "درکړی شوې دي", f: "dărkRáy shuwe dee"}]],
  //             ],
  //             long: [
  //                 [[{p: "درکړلی شوی یم", f: "dărkRúlay shuway yum"}], [{p: "درکړلی شوي یو", f: "dărkRúlay shuwee yoo"}]],
  //                 [[{p: "درکړلی شوې یم", f: "dărkRúlay shuwe yum"}], [{p: "درکړلی شوې یو", f: "dărkRúlay shuwe yoo"}]],
  //                 [[{p: "درکړلی شوی یې", f: "dărkRúlay shuway ye"}], [{p: "درکړلی شوي یئ", f: "dărkRúlay shuwee yey"}]],
  //                 [[{p: "درکړلی شوې یې", f: "dărkRúlay shuwe ye"}], [{p: "درکړلی شوې یئ", f: "dărkRúlay shuwe yey"}]],
  //                 [[{p: "درکړلی شوی دی", f: "dărkRúlay shuway day"}], [{p: "درکړلی شوي دي", f: "dărkRúlay shuwee dee"}]],
  //                 [[{p: "درکړلی شوې ده", f: "dărkRúlay shuwe da"}], [{p: "درکړلی شوې دي", f: "dărkRúlay shuwe dee"}]],
  //             ],
  //         },
  //         future: {
  //             short: [
  //                 [[{p: "به درکړی شوی یم", f: "ba dărkRáy shuway yum"}], [{p: "به درکړی شوي یو", f: "ba dărkRáy shuwee yoo"}]],
  //                 [[{p: "به درکړی شوې یم", f: "ba dărkRáy shuwe yum"}], [{p: "به درکړی شوې یو", f: "ba dărkRáy shuwe yoo"}]],
  //                 [[{p: "به درکړی شوی یې", f: "ba dărkRáy shuway ye"}], [{p: "به درکړی شوي یئ", f: "ba dărkRáy shuwee yey"}]],
  //                 [[{p: "به درکړی شوې یې", f: "ba dărkRáy shuwe ye"}], [{p: "به درکړی شوې یئ", f: "ba dărkRáy shuwe yey"}]],
  //                 [[{p: "به درکړی شوی وي", f: "ba dărkRáy shuway wee"}], [{p: "به درکړی شوي وي", f: "ba dărkRáy shuwee wee"}]],
  //                 [[{p: "به درکړی شوې وي", f: "ba dărkRáy shuwe wee"}], [{p: "به درکړی شوې وي", f: "ba dărkRáy shuwe wee"}]],
  //             ],
  //             long: [
  //                 [[{p: "به درکړلی شوی یم", f: "ba dărkRúlay shuway yum"}], [{p: "به درکړلی شوي یو", f: "ba dărkRúlay shuwee yoo"}]],
  //                 [[{p: "به درکړلی شوې یم", f: "ba dărkRúlay shuwe yum"}], [{p: "به درکړلی شوې یو", f: "ba dărkRúlay shuwe yoo"}]],
  //                 [[{p: "به درکړلی شوی یې", f: "ba dărkRúlay shuway ye"}], [{p: "به درکړلی شوي یئ", f: "ba dărkRúlay shuwee yey"}]],
  //                 [[{p: "به درکړلی شوې یې", f: "ba dărkRúlay shuwe ye"}], [{p: "به درکړلی شوې یئ", f: "ba dărkRúlay shuwe yey"}]],
  //                 [[{p: "به درکړلی شوی وي", f: "ba dărkRúlay shuway wee"}], [{p: "به درکړلی شوي وي", f: "ba dărkRúlay shuwee wee"}]],
  //                 [[{p: "به درکړلی شوې وي", f: "ba dărkRúlay shuwe wee"}], [{p: "به درکړلی شوې وي", f: "ba dărkRúlay shuwe wee"}]],
  //             ],
  //         },
  //         affirmational: {
  //             short: [
  //                 [[{p: "به درکړی شوی وم", f: "ba dărkRáy shuway wum"}], [{p: "به درکړی شوي وو", f: "ba dărkRáy shuwee woo"}]],
  //                 [[{p: "به درکړی شوې وم", f: "ba dărkRáy shuwe wum"}], [{p: "به درکړی شوې وو", f: "ba dărkRáy shuwe woo"}]],
  //                 [[{p: "به درکړی شوی وې", f: "ba dărkRáy shuway we"}], [{p: "به درکړی شوي وئ", f: "ba dărkRáy shuwee wey"}]],
  //                 [[{p: "به درکړی شوې وې", f: "ba dărkRáy shuwe we"}], [{p: "به درکړی شوې وئ", f: "ba dărkRáy shuwe wey"}]],
  //                 [[{p: "به درکړی شوی و", f: "ba dărkRáy shuway wo"}], [{p: "به درکړی شوي وو", f: "ba dărkRáy shuwee woo"}]],
  //                 [[{p: "به درکړی شوې وه", f: "ba dărkRáy shuwe wa"}], [{p: "به درکړی شوې وې", f: "ba dărkRáy shuwe we"}]],
  //             ],
  //             long: [
  //                 [[{p: "به درکړلی شوی وم", f: "ba dărkRúlay shuway wum"}], [{p: "به درکړلی شوي وو", f: "ba dărkRúlay shuwee woo"}]],
  //                 [[{p: "به درکړلی شوې وم", f: "ba dărkRúlay shuwe wum"}], [{p: "به درکړلی شوې وو", f: "ba dărkRúlay shuwe woo"}]],
  //                 [[{p: "به درکړلی شوی وې", f: "ba dărkRúlay shuway we"}], [{p: "به درکړلی شوي وئ", f: "ba dărkRúlay shuwee wey"}]],
  //                 [[{p: "به درکړلی شوې وې", f: "ba dărkRúlay shuwe we"}], [{p: "به درکړلی شوې وئ", f: "ba dărkRúlay shuwe wey"}]],
  //                 [[{p: "به درکړلی شوی و", f: "ba dărkRúlay shuway wo"}], [{p: "به درکړلی شوي وو", f: "ba dărkRúlay shuwee woo"}]],
  //                 [[{p: "به درکړلی شوې وه", f: "ba dărkRúlay shuwe wa"}], [{p: "به درکړلی شوې وې", f: "ba dărkRúlay shuwe we"}]],
  //             ],
  //         },
  //         pastSubjunctiveHypothetical: {
  //             short: [
  //                 [[{p: "درکړی شوی وای", f: "ba dărkRáy shuway"}], [{p: "به درکړی شوي", f: "ba dărkRáy shuwee"}]],
  //                 [[{p: "درکړی شوې وای", f: "ba dărkRáy shuwe"}], [{p: "به درکړی شوې", f: "ba dărkRáy shuwe"}]],
  //                 [[{p: "درکړی شوی وای", f: "ba dărkRáy shuway"}], [{p: "به درکړی شوي", f: "ba dărkRáy shuwee"}]],
  //                 [[{p: "درکړی شوې وای", f: "ba dărkRáy shuwe"}], [{p: "به درکړی شوې", f: "ba dărkRáy shuwe"}]],
  //                 [[{p: "درکړی شوی وای", f: "ba dărkRáy shuway"}], [{p: "به درکړی شوي", f: "ba dărkRáy shuwee"}]],
  //                 [[{p: "درکړی شوې وای", f: "ba dărkRáy shuwe"}], [{p: "به درکړی شوې", f: "ba dărkRáy shuwe"}]],
  //             ],
  //             long: [
  //                 [[{p: "درکړلی شوی وای", f: "ba dărkRúlay shuway"}], [{p: "به درکړلی شوي", f: "ba dărkRúlay shuwee"}]],
  //                 [[{p: "درکړلی شوې وای", f: "ba dărkRúlay shuwe"}], [{p: "به درکړلی شوې", f: "ba dărkRúlay shuwe"}]],
  //                 [[{p: "درکړلی شوی وای", f: "ba dărkRúlay shuway"}], [{p: "به درکړلی شوي", f: "ba dărkRúlay shuwee"}]],
  //                 [[{p: "درکړلی شوې وای", f: "ba dărkRúlay shuwe"}], [{p: "به درکړلی شوې", f: "ba dărkRúlay shuwe"}]],
  //                 [[{p: "درکړلی شوی وای", f: "ba dărkRúlay shuway"}], [{p: "به درکړلی شوي", f: "ba dărkRúlay shuwee"}]],
  //                 [[{p: "درکړلی شوې وای", f: "ba dărkRúlay shuwe"}], [{p: "به درکړلی شوې", f: "ba dărkRúlay shuwe"}]],
  //             ],
  //         },
  //     },
  // },
};

export function checkForIrregularConjugation(
  entry: T.DictionaryEntry
): T.VerbConjugation | null {
  if (entry.p === "تلل" && entry.f === "tlul") {
    return tlul;
  }
  if (entry.p === "ورکول" && entry.f.includes("wărkawul")) {
    return warkawul;
  }
  if (entry.p === "کول" && entry.e.includes("to do")) {
    return kawulDyn;
  }
  if (entry.p === "کول" && entry.e.includes("to make")) {
    return kawulStat;
  }
  if (entry.p === "کېدل" && entry.e.includes("to become")) {
    return kedulStat;
  }
  if (entry.p === "کېدل" && entry.e.includes("to happen")) {
    return kedulDyn;
  }
  if (entry.p === "ورکول") {
    return warkawul;
  }
  if (entry.p === "درکول") {
    return darkawul;
  }
  if (entry.p === "راکول") {
    return raakawul;
  }
  return null;
}
