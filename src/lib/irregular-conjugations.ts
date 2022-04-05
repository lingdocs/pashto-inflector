/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import * as T from "../types";

// shared bits
const kedulStatModal: T.ModalContent = {
    nonImperative: {
        long: [
            [[{ p: "کېدلی شم", f: "kedúley shum" }, { p: "کېدلای شم", f: "kedúlaay shum" }], [{ p: "کېدلی شو", f: "kedúley shoo" }, { p: "کېدلای شو", f: "kedúlaay shoo" }]],
            [[{ p: "کېدلی شم", f: "kedúley shum" }, { p: "کېدلای شم", f: "kedúlaay shum" }], [{ p: "کېدلی شو", f: "kedúley shoo" }, { p: "کېدلای شو", f: "kedúlaay shoo" }]],
            [[{ p: "کېدلی شې", f: "kedúley she" }, { p: "کېدلای شې", f: "kedúlaay she" }], [{ p: "کېدلی شئ", f: "kedúley sheyy" }, { p: "کېدلای شئ", f: "kedúlaay sheyy" }]],
            [[{ p: "کېدلی شې", f: "kedúley she" }, { p: "کېدلای شې", f: "kedúlaay she" }], [{ p: "کېدلی شئ", f: "kedúley sheyy" }, { p: "کېدلای شئ", f: "kedúlaay sheyy" }]],
            [[{ p: "کېدلی شي", f: "kedúley shee" }, { p: "کېدلای شي", f: "kedúlaay shee" }], [{ p: "کېدلی شي", f: "kedúley shee" }, { p: "کېدلای شي", f: "kedúlaay shee" }]],
            [[{ p: "کېدلی شي", f: "kedúley shee" }, { p: "کېدلای شي", f: "kedúlaay shee" }], [{ p: "کېدلی شي", f: "kedúley shee" }, { p: "کېدلای شي", f: "kedúlaay shee" }]],
        ],
        short: [
            [[{ p: "کېدی شم", f: "kedéy shum" }, { p: "کېدای شم", f: "kedáay shum" }], [{ p: "کېدی شو", f: "kedéy shoo" }, { p: "کېدای شو", f: "kedáay shoo" }]],
            [[{ p: "کېدی شم", f: "kedéy shum" }, { p: "کېدای شم", f: "kedáay shum" }], [{ p: "کېدی شو", f: "kedéy shoo" }, { p: "کېدای شو", f: "kedáay shoo" }]],
            [[{ p: "کېدی شې", f: "kedéy she" }, { p: "کېدای شې", f: "kedáay she" }], [{ p: "کېدی شئ", f: "kedéy sheyy" }, { p: "کېدای شئ", f: "kedáay sheyy" }]],
            [[{ p: "کېدی شې", f: "kedéy she" }, { p: "کېدای شې", f: "kedáay she" }], [{ p: "کېدی شئ", f: "kedéy sheyy" }, { p: "کېدای شئ", f: "kedáay sheyy" }]],
            [[{ p: "کېدی شي", f: "kedéy shee" }, { p: "کېدای شي", f: "kedáay shee" }], [{ p: "کېدی شي", f: "kedéy shee" }, { p: "کېدای شي", f: "kedáay shee" }]],
            [[{ p: "کېدی شي", f: "kedéy shee" }, { p: "کېدای شي", f: "kedáay shee" }], [{ p: "کېدی شي", f: "kedéy shee" }, { p: "کېدای شي", f: "kedáay shee" }]],
        ],
    },
    future: {
        long: [
            [[{ p: "به کېدلی شم", f: "ba kedúley shum" }, { p: "به کېدلای شم", f: "ba kedúlaay shum" }], [{ p: "به کېدلی شو", f: "ba kedúley shoo" }, { p: "به کېدلای شو", f: "ba kedúlaay shoo" }]],
            [[{ p: "به کېدلی شم", f: "ba kedúley shum" }, { p: "به کېدلای شم", f: "ba kedúlaay shum" }], [{ p: "به کېدلی شو", f: "ba kedúley shoo" }, { p: "به کېدلای شو", f: "ba kedúlaay shoo" }]],
            [[{ p: "به کېدلی شې", f: "ba kedúley she" }, { p: "به کېدلای شې", f: "ba kedúlaay she" }], [{ p: "به کېدلی شئ", f: "ba kedúley sheyy" }, { p: "به کېدلای شئ", f: "ba kedúlaay sheyy" }]],
            [[{ p: "به کېدلی شې", f: "ba kedúley she" }, { p: "به کېدلای شې", f: "ba kedúlaay she" }], [{ p: "به کېدلی شئ", f: "ba kedúley sheyy" }, { p: "به کېدلای شئ", f: "ba kedúlaay sheyy" }]],
            [[{ p: "به کېدلی شي", f: "ba kedúley shee" }, { p: "به کېدلای شي", f: "ba kedúlaay shee" }], [{ p: "به کېدلی شي", f: "ba kedúley shee" }, { p: "به کېدلای شي", f: "ba kedúlaay shee" }]],
            [[{ p: "به کېدلی شي", f: "ba kedúley shee" }, { p: "به کېدلای شي", f: "ba kedúlaay shee" }], [{ p: "به کېدلی شي", f: "ba kedúley shee" }, { p: "به کېدلای شي", f: "ba kedúlaay shee" }]],
        ],
        short: [
            [[{ p: "به کېدی شم", f: "ba kedéy shum" }, { p: "به کېدای شم", f: "ba kedáay shum" }], [{ p: "به کېدی شو", f: "ba kedéy shoo" }, { p: "به کېدای شو", f: "ba kedáay shoo" }]],
            [[{ p: "به کېدی شم", f: "ba kedéy shum" }, { p: "به کېدای شم", f: "ba kedáay shum" }], [{ p: "به کېدی شو", f: "ba kedéy shoo" }, { p: "به کېدای شو", f: "ba kedáay shoo" }]],
            [[{ p: "به کېدی شې", f: "ba kedéy she" }, { p: "به کېدای شې", f: "ba kedáay she" }], [{ p: "به کېدی شئ", f: "ba kedéy sheyy" }, { p: "به کېدای شئ", f: "ba kedáay sheyy" }]],
            [[{ p: "به کېدی شې", f: "ba kedéy she" }, { p: "به کېدای شې", f: "ba kedáay she" }], [{ p: "به کېدی شئ", f: "ba kedéy sheyy" }, { p: "به کېدای شئ", f: "ba kedáay sheyy" }]],
            [[{ p: "به کېدی شي", f: "ba kedéy shee" }, { p: "به کېدای شي", f: "ba kedáay shee" }], [{ p: "به کېدی شي", f: "ba kedéy shee" }, { p: "به کېدای شي", f: "ba kedáay shee" }]],
            [[{ p: "به کېدی شي", f: "ba kedéy shee" }, { p: "به کېدای شي", f: "ba kedáay shee" }], [{ p: "به کېدی شي", f: "ba kedéy shee" }, { p: "به کېدای شي", f: "ba kedáay shee" }]],
        ],
    },
    past: {
        long: [
            [[{ p: "کېدلی شوم", f: "kedúley shwum" }, { p: "کېدلای شوم", f: "kedúlaay shwum" }], [{ p: "کېدلی شو", f: "kedúley shoo" }, { p: "کېدلای شو", f: "kedúlaay shoo" }]],
            [[{ p: "کېدلی شوم", f: "kedúley shwum" }, { p: "کېدلای شوم", f: "kedúlaay shwum" }], [{ p: "کېدلی شو", f: "kedúley shoo" }, { p: "کېدلای شو", f: "kedúlaay shoo" }]],
            [[{ p: "کېدلی شوې", f: "kedúley shwe" }, { p: "کېدلای شوې", f: "kedúlaay shwe" }], [{ p: "کېدلی شوئ", f: "kedúley shweyy" }, { p: "کېدلای شوئ", f: "kedúlaay shweyy" }]],
            [[{ p: "کېدلی شوې", f: "kedúley shwe" }, { p: "کېدلای شوې", f: "kedúlaay shwe" }], [{ p: "کېدلی شوئ", f: "kedúley shweyy" }, { p: "کېدلای شوئ", f: "kedúlaay shweyy" }]],
            [[{ p: "کېدلی شو", f: "kedúley sho" }, { p: "کېدلای شو", f: "kedúlaay sho" }], [{ p: "کېدلی شول", f: "kedúley shwul" }, { p: "کېدلای شول", f: "kedúlaay shwul" }, { p: "کېدلی شو", f: "kedúley shoo" }, { p: "کېدلای شو", f: "kedúlaay shoo" }]],
            [[{ p: "کېدلی شوه", f: "kedúley shwa" }, { p: "کېدلای شوه", f: "kedúlaay shwa" }], [{ p: "کېدلی شولې", f: "kedúley shwule" }, { p: "کېدلای شولې", f: "kedúlaay shwule" }, { p: "کېدلی شوې", f: "kedúley shwe" }, { p: "کېدلای شوې", f: "kedúlaay shwe" }]],
        ],
        short: [
            [[{ p: "کېدی شوم", f: "kedéy shwum" }, { p: "کېدای شوم", f: "kedáay shwum" }], [{ p: "کېدی شو", f: "kedéy shoo" }, { p: "کېدای شو", f: "kedáay shoo" }]],
            [[{ p: "کېدی شوم", f: "kedéy shwum" }, { p: "کېدای شوم", f: "kedáay shwum" }], [{ p: "کېدی شو", f: "kedéy shoo" }, { p: "کېدای شو", f: "kedáay shoo" }]],
            [[{ p: "کېدی شوې", f: "kedéy shwe" }, { p: "کېدای شوې", f: "kedáay shwe" }], [{ p: "کېدی شوئ", f: "kedéy shweyy" }, { p: "کېدای شوئ", f: "kedáay shweyy" }]],
            [[{ p: "کېدی شوې", f: "kedéy shwe" }, { p: "کېدای شوې", f: "kedáay shwe" }], [{ p: "کېدی شوئ", f: "kedéy shweyy" }, { p: "کېدای شوئ", f: "kedáay shweyy" }]],
            [[{ p: "کېدی شو", f: "kedéy sho" }, { p: "کېدای شو", f: "kedáay sho" }], [{ p: "کېدی شول", f: "kedéy shwul" }, { p: "کېدای شول", f: "kedáay shwul" }, { p: "کېدی شو", f: "kedéy shoo" }, { p: "کېدای شو", f: "kedáay shoo" }]],
            [[{ p: "کېدی شوه", f: "kedéy shwa" }, { p: "کېدای شوه", f: "kedáay shwa" }], [{ p: "کېدی شولې", f: "kedéy shwule" }, { p: "کېدای شولې", f: "kedáay shwule" }, { p: "کېدی شوې", f: "kedéy shwe" }, { p: "کېدای شوې", f: "kedáay shwe" }]],
        ],
    },
    habitualPast: {
        long: [
            [[{ p: "به کېدلی شوم", f: "ba kedúley shwum" }, { p: "به کېدلای شوم", f: "ba kedúlaay shwum" }], [{ p: "به کېدلی شو", f: "ba kedúley shoo" }, { p: "به کېدلای شو", f: "ba kedúlaay shoo" }]],
            [[{ p: "به کېدلی شوم", f: "ba kedúley shwum" }, { p: "به کېدلای شوم", f: "ba kedúlaay shwum" }], [{ p: "به کېدلی شو", f: "ba kedúley shoo" }, { p: "به کېدلای شو", f: "ba kedúlaay shoo" }]],
            [[{ p: "به کېدلی شوې", f: "ba kedúley shwe" }, { p: "به کېدلای شوې", f: "ba kedúlaay shwe" }], [{ p: "به کېدلی شوئ", f: "ba kedúley shweyy" }, { p: "به کېدلای شوئ", f: "ba kedúlaay shweyy" }]],
            [[{ p: "به کېدلی شوې", f: "ba kedúley shwe" }, { p: "به کېدلای شوې", f: "ba kedúlaay shwe" }], [{ p: "به کېدلی شوئ", f: "ba kedúley shweyy" }, { p: "به کېدلای شوئ", f: "ba kedúlaay shweyy" }]],
            [[{ p: "به کېدلی شو", f: "ba kedúley sho" }, { p: "به کېدلای شو", f: "ba kedúlaay sho" }], [{ p: "به کېدلی شول", f: "ba kedúley shwul" }, { p: "به کېدلای شول", f: "ba kedúlaay shwul" }, { p: "به کېدلی شو", f: "ba kedúley shoo" }, { p: "به کېدلای شو", f: "ba kedúlaay shoo" }]],
            [[{ p: "به کېدلی شوه", f: "ba kedúley shwa" }, { p: "به کېدلای شوه", f: "ba kedúlaay shwa" }], [{ p: "به کېدلی شولې", f: "ba kedúley shwule" }, { p: "به کېدلای شولې", f: "ba kedúlaay shwule" }, { p: "به کېدلی شوې", f: "ba kedúley shwe" }, { p: "به کېدلای شوې", f: "ba kedúlaay shwe" }]],
        ],
        short: [
            [[{ p: "به کېدی شوم", f: "ba kedéy shwum" }, { p: "به کېدای شوم", f: "ba kedáay shwum" }], [{ p: "به کېدی شو", f: "ba kedéy shoo" }, { p: "به کېدای شو", f: "ba kedáay shoo" }]],
            [[{ p: "به کېدی شوم", f: "ba kedéy shwum" }, { p: "به کېدای شوم", f: "ba kedáay shwum" }], [{ p: "به کېدی شو", f: "ba kedéy shoo" }, { p: "به کېدای شو", f: "ba kedáay shoo" }]],
            [[{ p: "به کېدی شوې", f: "ba kedéy shwe" }, { p: "به کېدای شوې", f: "ba kedáay shwe" }], [{ p: "به کېدی شوئ", f: "ba kedéy shweyy" }, { p: "به کېدای شوئ", f: "ba kedáay shweyy" }]],
            [[{ p: "به کېدی شوې", f: "ba kedéy shwe" }, { p: "به کېدای شوې", f: "ba kedáay shwe" }], [{ p: "به کېدی شوئ", f: "ba kedéy shweyy" }, { p: "به کېدای شوئ", f: "ba kedáay shweyy" }]],
            [[{ p: "به کېدی شو", f: "ba kedéy sho" }, { p: "به کېدای شو", f: "ba kedáay sho" }], [{ p: "به کېدی شول", f: "ba kedéy shwul" }, { p: "به کېدای شول", f: "ba kedáay shwul" }, { p: "به کېدی شو", f: "ba kedéy shoo" }, { p: "به کېدای شو", f: "ba kedáay shoo" }]],
            [[{ p: "به کېدی شوه", f: "ba kedéy shwa" }, { p: "به کېدای شوه", f: "ba kedáay shwa" }], [{ p: "به کېدی شولې", f: "ba kedéy shwule" }, { p: "به کېدای شولې", f: "ba kedáay shwule" }, { p: "به کېدی شوې", f: "ba kedéy shwe" }, { p: "به کېدای شوې", f: "ba kedáay shwe" }]],
        ],
    },
    hypotheticalPast: {
        long: [
            [[{ p: "کېدلی شوای", f: "kedúley shwaay" }, { p: "کېدلی شوی", f: "kedúley shwey" }, { p: "کېدلای شوای", f: "kedúlaay shwaay" }], [{ p: "کېدلی شوای", f: "kedúley shwaay" }, { p: "کېدلی شوی", f: "kedúley shwey" }, { p: "کېدای شوی", f: "kedúlaay shwey" }]],   
            [[{ p: "کېدلی شوای", f: "kedúley shwaay" }, { p: "کېدلی شوی", f: "kedúley shwey" }, { p: "کېدلای شوای", f: "kedúlaay shwaay" }], [{ p: "کېدلی شوای", f: "kedúley shwaay" }, { p: "کېدلی شوی", f: "kedúley shwey" }, { p: "کېدای شوی", f: "kedúlaay shwey" }]],   
            [[{ p: "کېدلی شوای", f: "kedúley shwaay" }, { p: "کېدلی شوی", f: "kedúley shwey" }, { p: "کېدلای شوای", f: "kedúlaay shwaay" }], [{ p: "کېدلی شوای", f: "kedúley shwaay" }, { p: "کېدلی شوی", f: "kedúley shwey" }, { p: "کېدای شوی", f: "kedúlaay shwey" }]],   
            [[{ p: "کېدلی شوای", f: "kedúley shwaay" }, { p: "کېدلی شوی", f: "kedúley shwey" }, { p: "کېدلای شوای", f: "kedúlaay shwaay" }], [{ p: "کېدلی شوای", f: "kedúley shwaay" }, { p: "کېدلی شوی", f: "kedúley shwey" }, { p: "کېدای شوی", f: "kedúlaay shwey" }]],   
            [[{ p: "کېدلی شوای", f: "kedúley shwaay" }, { p: "کېدلی شوی", f: "kedúley shwey" }, { p: "کېدلای شوای", f: "kedúlaay shwaay" }], [{ p: "کېدلی شوای", f: "kedúley shwaay" }, { p: "کېدلی شوی", f: "kedúley shwey" }, { p: "کېدای شوی", f: "kedúlaay shwey" }]],   
            [[{ p: "کېدلی شوای", f: "kedúley shwaay" }, { p: "کېدلی شوی", f: "kedúley shwey" }, { p: "کېدلای شوای", f: "kedúlaay shwaay" }], [{ p: "کېدلی شوای", f: "kedúley shwaay" }, { p: "کېدلی شوی", f: "kedúley shwey" }, { p: "کېدای شوی", f: "kedúlaay shwey" }]],
        ],   
        short: [
            [[{ p: "کېدی شوای", f: "kedéy shwaay" }, { p: "کېدی شوی", f: "kedéy shwey" }, { p: "کېدای شوی", f: "kedáay shwey" }], [{ p: "کېدی شوای", f: "kedéy shwaay" }, { p: "کېدی شوی", f: "kedéy shwey" }, { p: "کېدای شوی", f: "kedáay shwey" }]],   
            [[{ p: "کېدی شوای", f: "kedéy shwaay" }, { p: "کېدی شوی", f: "kedéy shwey" }, { p: "کېدای شوی", f: "kedáay shwey" }], [{ p: "کېدی شوای", f: "kedéy shwaay" }, { p: "کېدی شوی", f: "kedéy shwey" }, { p: "کېدای شوی", f: "kedáay shwey" }]],   
            [[{ p: "کېدی شوای", f: "kedéy shwaay" }, { p: "کېدی شوی", f: "kedéy shwey" }, { p: "کېدای شوی", f: "kedáay shwey" }], [{ p: "کېدی شوای", f: "kedéy shwaay" }, { p: "کېدی شوی", f: "kedéy shwey" }, { p: "کېدای شوی", f: "kedáay shwey" }]],   
            [[{ p: "کېدی شوای", f: "kedéy shwaay" }, { p: "کېدی شوی", f: "kedéy shwey" }, { p: "کېدای شوی", f: "kedáay shwey" }], [{ p: "کېدی شوای", f: "kedéy shwaay" }, { p: "کېدی شوی", f: "kedéy shwey" }, { p: "کېدای شوی", f: "kedáay shwey" }]],   
            [[{ p: "کېدی شوای", f: "kedéy shwaay" }, { p: "کېدی شوی", f: "kedéy shwey" }, { p: "کېدای شوی", f: "kedáay shwey" }], [{ p: "کېدی شوای", f: "kedéy shwaay" }, { p: "کېدی شوی", f: "kedéy shwey" }, { p: "کېدای شوی", f: "kedáay shwey" }]],   
            [[{ p: "کېدی شوای", f: "kedéy shwaay" }, { p: "کېدی شوی", f: "kedéy shwey" }, { p: "کېدای شوی", f: "kedáay shwey" }], [{ p: "کېدی شوای", f: "kedéy shwaay" }, { p: "کېدی شوی", f: "kedéy shwey" }, { p: "کېدای شوی", f: "kedáay shwey" }]],
        ],   
    },
};

const kawulStatOrDynImperfectivePassive: T.AspectContentPassive = {
    nonImperative: [
        [[{p: "کول کېږم", f: "kawul kéGum"}], [{p: "کول کېږو", f: "kawul kéGoo"}]],
        [[{p: "کول کېږم", f: "kawul kéGum"}], [{p: "کول کېږو", f: "kawul kéGoo"}]],
        [[{p: "کول کېږې", f: "kawul kéGe"}], [{p: "کول کېږئ", f: "kawul kéGeyy"}]],
        [[{p: "کول کېږې", f: "kawul kéGe"}], [{p: "کول کېږئ", f: "kawul kéGeyy"}]],
        [[{p: "کول کېږي", f: "kawul kéGee"}], [{p: "کول کېږي", f: "kawul kéGee"}]],
        [[{p: "کول کېږي", f: "kawul kéGee"}], [{p: "کول کېږي", f: "kawul kéGee"}]],
    ],
    future: [
        [[{p: "به کول کېږم", f: "ba kawul kéGum"}], [{p: "به کول کېږو", f: "ba kawul kéGoo"}]],
        [[{p: "به کول کېږم", f: "ba kawul kéGum"}], [{p: "به کول کېږو", f: "ba kawul kéGoo"}]],
        [[{p: "به کول کېږې", f: "ba kawul kéGe"}], [{p: "به کول کېږئ", f: "ba kawul kéGeyy"}]],
        [[{p: "به کول کېږې", f: "ba kawul kéGe"}], [{p: "به کول کېږئ", f: "ba kawul kéGeyy"}]],
        [[{p: "به کول کېږي", f: "ba kawul kéGee"}], [{p: "به کول کېږي", f: "ba kawul kéGee"}]],
        [[{p: "به کول کېږي", f: "ba kawul kéGee"}], [{p: "به کول کېږي", f: "ba kawul kéGee"}]],
    ],
    past: {
        short: [
            [[{p: "کول کېدم", f: "kawul kedúm"}], [{p: "کول کېدو", f: "kawul kedóo"}]],
            [[{p: "کول کېدم", f: "kawul kedúm"}], [{p: "کول کېدو", f: "kawul kedóo"}]],
            [[{p: "کول کېدې", f: "kawul kedé"}], [{p: "کول کېدئ", f: "kawul kedéyy"}]],
            [[{p: "کول کېدې", f: "kawul kedé"}], [{p: "کول کېدئ", f: "kawul kedéyy"}]],
            [[{p: "کول کېده", f: "kawul kedú"}, {p: "کول کېدو", f: "kawul kedó"}], [{p: "کول کېدل", f: "kawul kedúl"}]],
            [[{p: "کول کېده", f: "kawul kedá"}], [{p: "کول کېدې", f: "kawul kedé"}]],
        ],
        long: [
            [[{p: "کول کېدلم", f: "kawul kedúlum"}], [{p: "کول کېدلو", f: "kawul kedúloo"}]],
            [[{p: "کول کېدلم", f: "kawul kedúlum"}], [{p: "کول کېدلو", f: "kawul kedúloo"}]],
            [[{p: "کول کېدلې", f: "kawul kedúle"}], [{p: "کول کېدلئ", f: "kawul kedúleyy"}]],
            [[{p: "کول کېدلې", f: "kawul kedúle"}], [{p: "کول کېدلئ", f: "kawul kedúleyy"}]],
            [[{p: "کول کېدله", f: "kawul kedúlu"}, {p: "کول کېدلو", f: "kawul kedúlo"}], [{p: "کول کېدل", f: "kawul kedúl"}]],
            [[{p: "کول کېدله", f: "kawul kedúla"}], [{p: "کول کېدلې", f: "kawul kedúle"}]],
        ],
    },
    habitualPast: {
        short: [
            [[{p: "به کول کېدم", f: "ba kawul kedúm"}], [{p: "به کول کېدو", f: "ba kawul kedóo"}]],
            [[{p: "به کول کېدم", f: "ba kawul kedúm"}], [{p: "به کول کېدو", f: "ba kawul kedóo"}]],
            [[{p: "به کول کېدې", f: "ba kawul kedé"}], [{p: "به کول کېدئ", f: "ba kawul kedéyy"}]],
            [[{p: "به کول کېدې", f: "ba kawul kedé"}], [{p: "به کول کېدئ", f: "ba kawul kedéyy"}]],
            [[{p: "به کول کېده", f: "ba kawul kedú"}, {p: "به کول کېدو", f: "ba kawul kedó"}], [{p: "به کول کېدل", f: "ba kawul kedúl"}]],
            [[{p: "به کول کېده", f: "ba kawul kedá"}], [{p: "به کول کېدې", f: "ba kawul kedé"}]],
        ],
        long: [
            [[{p: "به کول کېدلم", f: "ba kawul kedúlum"}], [{p: "به کول کېدلو", f: "ba kawul kedúloo"}]],
            [[{p: "به کول کېدلم", f: "ba kawul kedúlum"}], [{p: "به کول کېدلو", f: "ba kawul kedúloo"}]],
            [[{p: "به کول کېدلې", f: "ba kawul kedúle"}], [{p: "به کول کېدلئ", f: "ba kawul kedúleyy"}]],
            [[{p: "به کول کېدلې", f: "ba kawul kedúle"}], [{p: "به کول کېدلئ", f: "ba kawul kedúleyy"}]],
            [[{p: "به کول کېدله", f: "ba kawul kedúlu"}, {p: "به کول کېدلو", f: "ba kawul kedúlo"}], [{p: "به کول کېدل", f: "ba kawul kedúl"}]],
            [[{p: "به کول کېدله", f: "ba kawul kedúla"}], [{p: "به کول کېدلې", f: "ba kawul kedúle"}]],
        ],
    },
    modal: {
        nonImperative: {
            long: [
                [[{ p: "کول کېدلی شم", f: "kawul kedúley shum" }, { p: "کول کېدلای شم", f: "kawul kedúlaay shum" }], [{ p: "کول کېدلی شو", f: "kawul kedúley shoo" }, { p: "کول کېدلای شو", f: "kawul kedúlaay shoo" }]],
                [[{ p: "کول کېدلی شم", f: "kawul kedúley shum" }, { p: "کول کېدلای شم", f: "kawul kedúlaay shum" }], [{ p: "کول کېدلی شو", f: "kawul kedúley shoo" }, { p: "کول کېدلای شو", f: "kawul kedúlaay shoo" }]],
                [[{ p: "کول کېدلی شې", f: "kawul kedúley she" }, { p: "کول کېدلای شې", f: "kawul kedúlaay she" }], [{ p: "کول کېدلی شئ", f: "kawul kedúley sheyy" }, { p: "کول کېدلای شئ", f: "kawul kedúlaay sheyy" }]],
                [[{ p: "کول کېدلی شې", f: "kawul kedúley she" }, { p: "کول کېدلای شې", f: "kawul kedúlaay she" }], [{ p: "کول کېدلی شئ", f: "kawul kedúley sheyy" }, { p: "کول کېدلای شئ", f: "kawul kedúlaay sheyy" }]],
                [[{ p: "کول کېدلی شي", f: "kawul kedúley shee" }, { p: "کول کېدلای شي", f: "kawul kedúlaay shee" }], [{ p: "کول کېدلی شي", f: "kawul kedúley shee" }, { p: "کول کېدلای شي", f: "kawul kedúlaay shee" }]],
                [[{ p: "کول کېدلی شي", f: "kawul kedúley shee" }, { p: "کول کېدلای شي", f: "kawul kedúlaay shee" }], [{ p: "کول کېدلی شي", f: "kawul kedúley shee" }, { p: "کول کېدلای شي", f: "kawul kedúlaay shee" }]],
            ],
            short: [
                [[{ p: "کول کېدی شم", f: "kawul kedéy shum" }, { p: "کول کېدای شم", f: "kawul kedáay shum" }], [{ p: "کول کېدی شو", f: "kawul kedéy shoo" }, { p: "کول کېدای شو", f: "kawul kedáay shoo" }]],
                [[{ p: "کول کېدی شم", f: "kawul kedéy shum" }, { p: "کول کېدای شم", f: "kawul kedáay shum" }], [{ p: "کول کېدی شو", f: "kawul kedéy shoo" }, { p: "کول کېدای شو", f: "kawul kedáay shoo" }]],
                [[{ p: "کول کېدی شې", f: "kawul kedéy she" }, { p: "کول کېدای شې", f: "kawul kedáay she" }], [{ p: "کول کېدی شئ", f: "kawul kedéy sheyy" }, { p: "کول کېدای شئ", f: "kawul kedáay sheyy" }]],
                [[{ p: "کول کېدی شې", f: "kawul kedéy she" }, { p: "کول کېدای شې", f: "kawul kedáay she" }], [{ p: "کول کېدی شئ", f: "kawul kedéy sheyy" }, { p: "کول کېدای شئ", f: "kawul kedáay sheyy" }]],
                [[{ p: "کول کېدی شي", f: "kawul kedéy shee" }, { p: "کول کېدای شي", f: "kawul kedáay shee" }], [{ p: "کول کېدی شي", f: "kawul kedéy shee" }, { p: "کول کېدای شي", f: "kawul kedáay shee" }]],
                [[{ p: "کول کېدی شي", f: "kawul kedéy shee" }, { p: "کول کېدای شي", f: "kawul kedáay shee" }], [{ p: "کول کېدی شي", f: "kawul kedéy shee" }, { p: "کول کېدای شي", f: "kawul kedáay shee" }]],
            ],
        },
        future: {
            long: [
                [[{ p: "به کول کېدلی شم", f: "ba kawul kedúley shum" }, { p: "به کول کېدلای شم", f: "ba kawul kedúlaay shum" }], [{ p: "به کول کېدلی شو", f: "ba kawul kedúley shoo" }, { p: "به کول کېدلای شو", f: "ba kawul kedúlaay shoo" }]],
                [[{ p: "به کول کېدلی شم", f: "ba kawul kedúley shum" }, { p: "به کول کېدلای شم", f: "ba kawul kedúlaay shum" }], [{ p: "به کول کېدلی شو", f: "ba kawul kedúley shoo" }, { p: "به کول کېدلای شو", f: "ba kawul kedúlaay shoo" }]],
                [[{ p: "به کول کېدلی شې", f: "ba kawul kedúley she" }, { p: "به کول کېدلای شې", f: "ba kawul kedúlaay she" }], [{ p: "به کول کېدلی شئ", f: "ba kawul kedúley sheyy" }, { p: "به کول کېدلای شئ", f: "ba kawul kedúlaay sheyy" }]],
                [[{ p: "به کول کېدلی شې", f: "ba kawul kedúley she" }, { p: "به کول کېدلای شې", f: "ba kawul kedúlaay she" }], [{ p: "به کول کېدلی شئ", f: "ba kawul kedúley sheyy" }, { p: "به کول کېدلای شئ", f: "ba kawul kedúlaay sheyy" }]],
                [[{ p: "به کول کېدلی شي", f: "ba kawul kedúley shee" }, { p: "به کول کېدلای شي", f: "ba kawul kedúlaay shee" }], [{ p: "به کول کېدلی شي", f: "ba kawul kedúley shee" }, { p: "به کول کېدلای شي", f: "ba kawul kedúlaay shee" }]],
                [[{ p: "به کول کېدلی شي", f: "ba kawul kedúley shee" }, { p: "به کول کېدلای شي", f: "ba kawul kedúlaay shee" }], [{ p: "به کول کېدلی شي", f: "ba kawul kedúley shee" }, { p: "به کول کېدلای شي", f: "ba kawul kedúlaay shee" }]],
            ],
            short: [
                [[{ p: "به کول کېدی شم", f: "ba kawul kedéy shum" }, { p: "به کول کېدای شم", f: "ba kawul kedáay shum" }], [{ p: "به کول کېدی شو", f: "ba kawul kedéy shoo" }, { p: "به کول کېدای شو", f: "ba kawul kedáay shoo" }]],
                [[{ p: "به کول کېدی شم", f: "ba kawul kedéy shum" }, { p: "به کول کېدای شم", f: "ba kawul kedáay shum" }], [{ p: "به کول کېدی شو", f: "ba kawul kedéy shoo" }, { p: "به کول کېدای شو", f: "ba kawul kedáay shoo" }]],
                [[{ p: "به کول کېدی شې", f: "ba kawul kedéy she" }, { p: "به کول کېدای شې", f: "ba kawul kedáay she" }], [{ p: "به کول کېدی شئ", f: "ba kawul kedéy sheyy" }, { p: "به کول کېدای شئ", f: "ba kawul kedáay sheyy" }]],
                [[{ p: "به کول کېدی شې", f: "ba kawul kedéy she" }, { p: "به کول کېدای شې", f: "ba kawul kedáay she" }], [{ p: "به کول کېدی شئ", f: "ba kawul kedéy sheyy" }, { p: "به کول کېدای شئ", f: "ba kawul kedáay sheyy" }]],
                [[{ p: "به کول کېدی شي", f: "ba kawul kedéy shee" }, { p: "به کول کېدای شي", f: "ba kawul kedáay shee" }], [{ p: "به کول کېدی شي", f: "ba kawul kedéy shee" }, { p: "به کول کېدای شي", f: "ba kawul kedáay shee" }]],
                [[{ p: "به کول کېدی شي", f: "ba kawul kedéy shee" }, { p: "به کول کېدای شي", f: "ba kawul kedáay shee" }], [{ p: "به کول کېدی شي", f: "ba kawul kedéy shee" }, { p: "به کول کېدای شي", f: "ba kawul kedáay shee" }]],
            ],
        },
        past: {
            long: [
                [[{ p: "کول کېدلی شوم", f: "kawul kedúley shwum" }, { p: "کول کېدلای شوم", f: "kawul kedúlaay shwum" }], [{ p: "کول کېدلی شو", f: "kawul kedúley shoo" }, { p: "کول کېدلای شو", f: "kawul kedúlaay shoo" }]],
                [[{ p: "کول کېدلی شوم", f: "kawul kedúley shwum" }, { p: "کول کېدلای شوم", f: "kawul kedúlaay shwum" }], [{ p: "کول کېدلی شو", f: "kawul kedúley shoo" }, { p: "کول کېدلای شو", f: "kawul kedúlaay shoo" }]],
                [[{ p: "کول کېدلی شوې", f: "kawul kedúley shwe" }, { p: "کول کېدلای شوې", f: "kawul kedúlaay shwe" }], [{ p: "کول کېدلی شوئ", f: "kawul kedúley shweyy" }, { p: "کول کېدلای شوئ", f: "kawul kedúlaay shweyy" }]],
                [[{ p: "کول کېدلی شوې", f: "kawul kedúley shwe" }, { p: "کول کېدلای شوې", f: "kawul kedúlaay shwe" }], [{ p: "کول کېدلی شوئ", f: "kawul kedúley shweyy" }, { p: "کول کېدلای شوئ", f: "kawul kedúlaay shweyy" }]],
                [[{ p: "کول کېدلی شو", f: "kawul kedúley sho" }, { p: "کول کېدلای شو", f: "kawul kedúlaay sho" }], [{ p: "کول کېدلی شول", f: "kawul kedúley shwul" }, { p: "کول کېدلای شول", f: "kawul kedúlaay shwul" }, { p: "کول کېدلی شو", f: "kawul kedúley shoo" }, { p: "کول کېدلای شو", f: "kawul kedúlaay shoo" }]],
                [[{ p: "کول کېدلی شوه", f: "kawul kedúley shwa" }, { p: "کول کېدلای شوه", f: "kawul kedúlaay shwa" }], [{ p: "کول کېدلی شولې", f: "kawul kedúley shwule" }, { p: "کول کېدلای شولې", f: "kawul kedúlaay shwule" }, { p: "کول کېدلی شوې", f: "kawul kedúley shwe" }, { p: "کول کېدلای شوې", f: "kawul kedúlaay shwe" }]],
            ],
            short: [
                [[{ p: "کول کېدی شوم", f: "kawul kedéy shwum" }, { p: "کول کېدای شوم", f: "kawul kedáay shwum" }], [{ p: "کول کېدی شو", f: "kawul kedéy shoo" }, { p: "کول کېدای شو", f: "kawul kedáay shoo" }]],
                [[{ p: "کول کېدی شوم", f: "kawul kedéy shwum" }, { p: "کول کېدای شوم", f: "kawul kedáay shwum" }], [{ p: "کول کېدی شو", f: "kawul kedéy shoo" }, { p: "کول کېدای شو", f: "kawul kedáay shoo" }]],
                [[{ p: "کول کېدی شوې", f: "kawul kedéy shwe" }, { p: "کول کېدای شوې", f: "kawul kedáay shwe" }], [{ p: "کول کېدی شوئ", f: "kawul kedéy shweyy" }, { p: "کول کېدای شوئ", f: "kawul kedáay shweyy" }]],
                [[{ p: "کول کېدی شوې", f: "kawul kedéy shwe" }, { p: "کول کېدای شوې", f: "kawul kedáay shwe" }], [{ p: "کول کېدی شوئ", f: "kawul kedéy shweyy" }, { p: "کول کېدای شوئ", f: "kawul kedáay shweyy" }]],
                [[{ p: "کول کېدی شو", f: "kawul kedéy sho" }, { p: "کول کېدای شو", f: "kawul kedáay sho" }], [{ p: "کول کېدی شول", f: "kawul kedéy shwul" }, { p: "کول کېدای شول", f: "kawul kedáay shwul" }, { p: "کول کېدی شو", f: "kawul kedéy shoo" }, { p: "کول کېدای شو", f: "kawul kedáay shoo" }]],
                [[{ p: "کول کېدی شوه", f: "kawul kedéy shwa" }, { p: "کول کېدای شوه", f: "kawul kedáay shwa" }], [{ p: "کول کېدی شولې", f: "kawul kedéy shwule" }, { p: "کول کېدای شولې", f: "kawul kedáay shwule" }, { p: "کول کېدی شوې", f: "kawul kedéy shwe" }, { p: "کول کېدای شوې", f: "kawul kedáay shwe" }]],
            ],
        },
        habitualPast: {
            long: [
                [[{ p: "به کول کېدلی شوم", f: "ba kawul kedúley shwum" }, { p: "به کول کېدلای شوم", f: "ba kawul kedúlaay shwum" }], [{ p: "به کول کېدلی شو", f: "ba kawul kedúley shoo" }, { p: "به کول کېدلای شو", f: "ba kawul kedúlaay shoo" }]],
                [[{ p: "به کول کېدلی شوم", f: "ba kawul kedúley shwum" }, { p: "به کول کېدلای شوم", f: "ba kawul kedúlaay shwum" }], [{ p: "به کول کېدلی شو", f: "ba kawul kedúley shoo" }, { p: "به کول کېدلای شو", f: "ba kawul kedúlaay shoo" }]],
                [[{ p: "به کول کېدلی شوې", f: "ba kawul kedúley shwe" }, { p: "به کول کېدلای شوې", f: "ba kawul kedúlaay shwe" }], [{ p: "به کول کېدلی شوئ", f: "ba kawul kedúley shweyy" }, { p: "به کول کېدلای شوئ", f: "ba kawul kedúlaay shweyy" }]],
                [[{ p: "به کول کېدلی شوې", f: "ba kawul kedúley shwe" }, { p: "به کول کېدلای شوې", f: "ba kawul kedúlaay shwe" }], [{ p: "به کول کېدلی شوئ", f: "ba kawul kedúley shweyy" }, { p: "به کول کېدلای شوئ", f: "ba kawul kedúlaay shweyy" }]],
                [[{ p: "به کول کېدلی شو", f: "ba kawul kedúley sho" }, { p: "به کول کېدلای شو", f: "ba kawul kedúlaay sho" }], [{ p: "به کول کېدلی شول", f: "ba kawul kedúley shwul" }, { p: "به کول کېدلای شول", f: "ba kawul kedúlaay shwul" }, { p: "به کول کېدلی شو", f: "ba kawul kedúley shoo" }, { p: "به کول کېدلای شو", f: "ba kawul kedúlaay shoo" }]],
                [[{ p: "به کول کېدلی شوه", f: "ba kawul kedúley shwa" }, { p: "به کول کېدلای شوه", f: "ba kawul kedúlaay shwa" }], [{ p: "به کول کېدلی شولې", f: "ba kawul kedúley shwule" }, { p: "به کول کېدلای شولې", f: "ba kawul kedúlaay shwule" }, { p: "به کول کېدلی شوې", f: "ba kawul kedúley shwe" }, { p: "به کول کېدلای شوې", f: "ba kawul kedúlaay shwe" }]],
            ],
            short: [
                [[{ p: "به کول کېدی شوم", f: "ba kawul kedéy shwum" }, { p: "به کول کېدای شوم", f: "ba kawul kedáay shwum" }], [{ p: "به کول کېدی شو", f: "ba kawul kedéy shoo" }, { p: "به کول کېدای شو", f: "ba kawul kedáay shoo" }]],
                [[{ p: "به کول کېدی شوم", f: "ba kawul kedéy shwum" }, { p: "به کول کېدای شوم", f: "ba kawul kedáay shwum" }], [{ p: "به کول کېدی شو", f: "ba kawul kedéy shoo" }, { p: "به کول کېدای شو", f: "ba kawul kedáay shoo" }]],
                [[{ p: "به کول کېدی شوې", f: "ba kawul kedéy shwe" }, { p: "به کول کېدای شوې", f: "ba kawul kedáay shwe" }], [{ p: "به کول کېدی شوئ", f: "ba kawul kedéy shweyy" }, { p: "به کول کېدای شوئ", f: "ba kawul kedáay shweyy" }]],
                [[{ p: "به کول کېدی شوې", f: "ba kawul kedéy shwe" }, { p: "به کول کېدای شوې", f: "ba kawul kedáay shwe" }], [{ p: "به کول کېدی شوئ", f: "ba kawul kedéy shweyy" }, { p: "به کول کېدای شوئ", f: "ba kawul kedáay shweyy" }]],
                [[{ p: "به کول کېدی شو", f: "ba kawul kedéy sho" }, { p: "به کول کېدای شو", f: "ba kawul kedáay sho" }], [{ p: "به کول کېدی شول", f: "ba kawul kedéy shwul" }, { p: "به کول کېدای شول", f: "ba kawul kedáay shwul" }, { p: "به کول کېدی شو", f: "ba kawul kedéy shoo" }, { p: "به کول کېدای شو", f: "ba kawul kedáay shoo" }]],
                [[{ p: "به کول کېدی شوه", f: "ba kawul kedéy shwa" }, { p: "به کول کېدای شوه", f: "ba kawul kedáay shwa" }], [{ p: "به کول کېدی شولې", f: "ba kawul kedéy shwule" }, { p: "به کول کېدای شولې", f: "ba kawul kedáay shwule" }, { p: "به کول کېدی شوې", f: "ba kawul kedéy shwe" }, { p: "به کول کېدای شوې", f: "ba kawul kedáay shwe" }]],
            ],
        },
        hypotheticalPast: {
            long: [
                [[{ p: "کول کېدلی شوای", f: "kawul kedúley shwaay" }, { p: "کول کېدلی شوی", f: "kawul kedúley shwey" }, { p: "کول کېدلای شوای", f: "kawul kedúlaay shwaay" }], [{ p: "کول کېدلی شوای", f: "kawul kedúley shwaay" }, { p: "کول کېدلی شوی", f: "kawul kedúley shwey" }, { p: "کول کېدای شوی", f: "kawul kedúlaay shwey" }]],   
                [[{ p: "کول کېدلی شوای", f: "kawul kedúley shwaay" }, { p: "کول کېدلی شوی", f: "kawul kedúley shwey" }, { p: "کول کېدلای شوای", f: "kawul kedúlaay shwaay" }], [{ p: "کول کېدلی شوای", f: "kawul kedúley shwaay" }, { p: "کول کېدلی شوی", f: "kawul kedúley shwey" }, { p: "کول کېدای شوی", f: "kawul kedúlaay shwey" }]],   
                [[{ p: "کول کېدلی شوای", f: "kawul kedúley shwaay" }, { p: "کول کېدلی شوی", f: "kawul kedúley shwey" }, { p: "کول کېدلای شوای", f: "kawul kedúlaay shwaay" }], [{ p: "کول کېدلی شوای", f: "kawul kedúley shwaay" }, { p: "کول کېدلی شوی", f: "kawul kedúley shwey" }, { p: "کول کېدای شوی", f: "kawul kedúlaay shwey" }]],   
                [[{ p: "کول کېدلی شوای", f: "kawul kedúley shwaay" }, { p: "کول کېدلی شوی", f: "kawul kedúley shwey" }, { p: "کول کېدلای شوای", f: "kawul kedúlaay shwaay" }], [{ p: "کول کېدلی شوای", f: "kawul kedúley shwaay" }, { p: "کول کېدلی شوی", f: "kawul kedúley shwey" }, { p: "کول کېدای شوی", f: "kawul kedúlaay shwey" }]],   
                [[{ p: "کول کېدلی شوای", f: "kawul kedúley shwaay" }, { p: "کول کېدلی شوی", f: "kawul kedúley shwey" }, { p: "کول کېدلای شوای", f: "kawul kedúlaay shwaay" }], [{ p: "کول کېدلی شوای", f: "kawul kedúley shwaay" }, { p: "کول کېدلی شوی", f: "kawul kedúley shwey" }, { p: "کول کېدای شوی", f: "kawul kedúlaay shwey" }]],   
                [[{ p: "کول کېدلی شوای", f: "kawul kedúley shwaay" }, { p: "کول کېدلی شوی", f: "kawul kedúley shwey" }, { p: "کول کېدلای شوای", f: "kawul kedúlaay shwaay" }], [{ p: "کول کېدلی شوای", f: "kawul kedúley shwaay" }, { p: "کول کېدلی شوی", f: "kawul kedúley shwey" }, { p: "کول کېدای شوی", f: "kawul kedúlaay shwey" }]],
            ],   
            short: [
                [[{ p: "کول کېدی شوای", f: "kawul kedéy shwaay" }, { p: "کول کېدی شوی", f: "kawul kedéy shwey" }, { p: "کول کېدای شوی", f: "kawul kedáay shwey" }], [{ p: "کول کېدی شوای", f: "kawul kedéy shwaay" }, { p: "کول کېدی شوی", f: "kawul kedéy shwey" }, { p: "کول کېدای شوی", f: "kawul kedáay shwey" }]],   
                [[{ p: "کول کېدی شوای", f: "kawul kedéy shwaay" }, { p: "کول کېدی شوی", f: "kawul kedéy shwey" }, { p: "کول کېدای شوی", f: "kawul kedáay shwey" }], [{ p: "کول کېدی شوای", f: "kawul kedéy shwaay" }, { p: "کول کېدی شوی", f: "kawul kedéy shwey" }, { p: "کول کېدای شوی", f: "kawul kedáay shwey" }]],   
                [[{ p: "کول کېدی شوای", f: "kawul kedéy shwaay" }, { p: "کول کېدی شوی", f: "kawul kedéy shwey" }, { p: "کول کېدای شوی", f: "kawul kedáay shwey" }], [{ p: "کول کېدی شوای", f: "kawul kedéy shwaay" }, { p: "کول کېدی شوی", f: "kawul kedéy shwey" }, { p: "کول کېدای شوی", f: "kawul kedáay shwey" }]],   
                [[{ p: "کول کېدی شوای", f: "kawul kedéy shwaay" }, { p: "کول کېدی شوی", f: "kawul kedéy shwey" }, { p: "کول کېدای شوی", f: "kawul kedáay shwey" }], [{ p: "کول کېدی شوای", f: "kawul kedéy shwaay" }, { p: "کول کېدی شوی", f: "kawul kedéy shwey" }, { p: "کول کېدای شوی", f: "kawul kedáay shwey" }]],   
                [[{ p: "کول کېدی شوای", f: "kawul kedéy shwaay" }, { p: "کول کېدی شوی", f: "kawul kedéy shwey" }, { p: "کول کېدای شوی", f: "kawul kedáay shwey" }], [{ p: "کول کېدی شوای", f: "kawul kedéy shwaay" }, { p: "کول کېدی شوی", f: "kawul kedéy shwey" }, { p: "کول کېدای شوی", f: "kawul kedáay shwey" }]],   
                [[{ p: "کول کېدی شوای", f: "kawul kedéy shwaay" }, { p: "کول کېدی شوی", f: "kawul kedéy shwey" }, { p: "کول کېدای شوی", f: "kawul kedáay shwey" }], [{ p: "کول کېدی شوای", f: "kawul kedéy shwaay" }, { p: "کول کېدی شوی", f: "kawul kedéy shwey" }, { p: "کول کول کېدای شوی", f: "kawul kedáay shwey" }]],
            ],   
        },
    },
};

const kawulPerfectPassive: T.PerfectContent = {
    halfPerfect: [
        [[{p: "کړی شوی", f: "kúRey shúwey"}], [{p: "کړي شوي", f: "kúRee shúwee"}]],
        [[{p: "کړې شوې", f: "kúRe shúwe"}], [{p: "کړې شوې", f: "kúRe shúwe"}]],
        [[{p: "کړی شوی", f: "kúRey shúwey"}], [{p: "کړي شوي", f: "kúRee shúwee"}]],
        [[{p: "کړې شوې", f: "kúRe shúwe"}], [{p: "کړې شوې", f: "kúRe shúwe"}]],
        [[{p: "کړی شوی", f: "kúRey shúwey"}], [{p: "کړي شوي", f: "kúRee shúwee"}]],
        [[{p: "کړې شوې", f: "kúRe shúwe"}], [{p: "کړې شوې", f: "kúRe shúwe"}]],
    ],
    past: [
        [[{p: "کړی شوی وم", f: "kúRey shúwey wum"}], [{p: "کړي شوي وو", f: "kúRee shúwee woo"}]],
        [[{p: "کړې شوې وم", f: "kúRe shúwe wum"}], [{p: "کړې شوې وو", f: "kúRe shúwe woo"}]],
        [[{p: "کړی شوی وې", f: "kúRey shúwey we"}], [{p: "کړي شوي وئ", f: "kúRee shúwee weyy"}]],
        [[{p: "کړې شوې وې", f: "kúRe shúwe we"}], [{p: "کړې شوې وئ", f: "kúRe shúwe weyy"}]],
        [[{p: "کړی شوی و", f: "kúRey shúwey wo"}], [{p: "کړي شوي وو", f: "kúRee shúwee woo"}]],
        [[{p: "کړې شوې وه", f: "kúRe shúwe wa"}], [{p: "کړې شوې وې", f: "kúRe shúwe we"}]],
    ],
    present: [
        [[{p: "کړی شوی یم", f: "kúRey shúwey yum"}], [{p: "کړي شوي یو", f: "kúRee shúwee yoo"}]],
        [[{p: "کړې شوې یم", f: "kúRe shúwe yum"}], [{p: "کړې شوې یو", f: "kúRe shúwe yoo"}]],
        [[{p: "کړی شوی یې", f: "kúRey shúwey ye"}], [{p: "کړي شوي یئ", f: "kúRee shúwee yeyy"}]],
        [[{p: "کړې شوې یې", f: "kúRe shúwe ye"}], [{p: "کړې شوې یئ", f: "kúRe shúwe yeyy"}]],
        [[{p: "کړی شوی دی", f: "kúRey shúwey dey"}], [{p: "کړي شوي دي", f: "kúRee shúwee dee"}]],
        [[{p: "کړې شوې ده", f: "kúRe shúwe da"}], [{p: "کړې شوې دي", f: "kúRe shúwe dee"}]],
    ],
    habitual: [
        [[{p: "کړی شوی یم", f: "kúRey shúwey yum"}], [{p: "کړي شوي یو", f: "kúRee shúwee yoo"}]],
        [[{p: "کړې شوې یم", f: "kúRe shúwe yum"}], [{p: "کړې شوې یو", f: "kúRe shúwe yoo"}]],
        [[{p: "کړی شوی یې", f: "kúRey shúwey ye"}], [{p: "کړي شوي یئ", f: "kúRee shúwee yeyy"}]],
        [[{p: "کړې شوې یې", f: "kúRe shúwe ye"}], [{p: "کړې شوې یئ", f: "kúRe shúwe yeyy"}]],
        [[{p: "کړی شوی وي", f: "kúRey shúwey wee"}], [{p: "کړي شوي وي", f: "kúRee shúwee wee"}]],
        [[{p: "کړې شوې وي", f: "kúRe shúwe wee"}], [{p: "کړې شوې وي", f: "kúRe shúwe wee"}]],
    ],
    subjunctive: [
        [[{p: "کړی شوی وم", f: "kúRey shúwey wum"}], [{p: "کړي شوي وو", f: "kúRee shúwee woo"}]],
        [[{p: "کړې شوې وم", f: "kúRe shúwe wum"}], [{p: "کړې شوې وو", f: "kúRe shúwe woo"}]],
        [[{p: "کړی شوی وې", f: "kúRey shúwey we"}], [{p: "کړي شوي وئ", f: "kúRee shúwee weyy"}]],
        [[{p: "کړې شوې وې", f: "kúRe shúwe we"}], [{p: "کړې شوې وئ", f: "kúRe shúwe weyy"}]],
        [[{p: "کړی شوی وي", f: "kúRey shúwey wee"}], [{p: "کړي شوي وي", f: "kúRee shúwee wee"}]],
        [[{p: "کړې شوې وي", f: "kúRe shúwe wee"}], [{p: "کړې شوې وي", f: "kúRe shúwe wee"}]],
    ],
    future: [
        [[{p: "به کړی شوی یم", f: "ba kúRey shúwey yum"}], [{p: "به کړي شوي یو", f: "ba kúRee shúwee yoo"}]],
        [[{p: "به کړې شوې یم", f: "ba kúRe shúwe yum"}], [{p: "به کړې شوې یو", f: "ba kúRe shúwe yoo"}]],
        [[{p: "به کړی شوی یې", f: "ba kúRey shúwey ye"}], [{p: "به کړي شوي یئ", f: "ba kúRee shúwee yeyy"}]],
        [[{p: "به کړې شوې یې", f: "ba kúRe shúwe ye"}], [{p: "به کړې شوې یئ", f: "ba kúRe shúwe yeyy"}]],
        [[{p: "به کړی شوی وي", f: "ba kúRey shúwey wee"}], [{p: "به کړي شوي وي", f: "ba kúRee shúwee wee"}]],
        [[{p: "به کړې شوې وي", f: "ba kúRe shúwe wee"}], [{p: "به کړې شوې وي", f: "ba kúRe shúwe wee"}]],
    ],
    affirmational: [
        [[{p: "به کړی شوی وم", f: "ba kúRey shúwey wum"}], [{p: "به کړي شوي وو", f: "ba kúRee shúwee woo"}]],
        [[{p: "به کړې شوې وم", f: "ba kúRe shúwe wum"}], [{p: "به کړې شوې وو", f: "ba kúRe shúwe woo"}]],
        [[{p: "به کړی شوی وې", f: "ba kúRey shúwey we"}], [{p: "به کړي شوي وئ", f: "ba kúRee shúwee weyy"}]],
        [[{p: "به کړې شوې وې", f: "ba kúRe shúwe we"}], [{p: "به کړې شوې وئ", f: "ba kúRe shúwe weyy"}]],
        [[{p: "به کړی شوی و", f: "ba kúRey shúwey wo"}], [{p: "به کړي شوي وو", f: "ba kúRee shúwee woo"}]],
        [[{p: "به کړې شوې وه", f: "ba kúRe shúwe wa"}], [{p: "به کړې شوې وې", f: "ba kúRe shúwe we"}]],
    ],
    pastSubjunctiveHypothetical: [
        [[{p: "به کړی شوی وای", f: "ba kúRey shúwey waay"}, {p: "به کړی شوی وی", f: "ba kúRey shúwey wey"}], [{p: "به کړي شوي وای", f: "ba kúRee shúwee waay"}, {p: "به کړي شوي وی", f: "ba kúRee shúwee wey"}]],
        [[{p: "به کړې شوې وای", f: "ba kúRe shúwe waay"}, {p: "به کړې شوې وی", f: "ba kúRe shúwe wey"}], [{p: "به کړې شوې وای", f: "ba kúRe shúwe waay"}, {p: "به کړې شوې وی", f: "ba kúRe shúwe wey"}]],
        [[{p: "به کړی شوی وای", f: "ba kúRey shúwey waay"}, {p: "به کړی شوی وی", f: "ba kúRey shúwey wey"}], [{p: "به کړي شوي وای", f: "ba kúRee shúwee waay"}, {p: "به کړي شوي وی", f: "ba kúRee shúwee wey"}]],
        [[{p: "به کړې شوې وای", f: "ba kúRe shúwe waay"}, {p: "به کړې شوې وی", f: "ba kúRe shúwe wey"}], [{p: "به کړې شوې وای", f: "ba kúRe shúwe waay"}, {p: "به کړې شوې وی", f: "ba kúRe shúwe wey"}]],
        [[{p: "به کړی شوی وای", f: "ba kúRey shúwey waay"}, {p: "به کړی شوی وی", f: "ba kúRey shúwey wey"}], [{p: "به کړي شوي وای", f: "ba kúRee shúwee waay"}, {p: "به کړي شوي وی", f: "ba kúRee shúwee wey"}]],
        [[{p: "به کړې شوې وای", f: "ba kúRe shúwe waay"}, {p: "به کړې شوې وی", f: "ba kúRe shúwe wey"}], [{p: "به کړې شوې وای", f: "ba kúRe shúwe waay"}, {p: "به کړې شوې وی", f: "ba kúRe shúwe wey"}]],
    ],
};

export const kedulStat: T.VerbConjugation = {
    info: {
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
            present: { p: "کېدونکی", f: "kedóonkey" },
            past: { p: "شوی", f: "shúwey" },
        },
    },
    imperfective: {
        nonImperative: [
            [[{p: "کېږم", f: "kéGum"}], [{p: "کېږو", f: "kéGoo"}]],
            [[{p: "کېږم", f: "kéGum"}], [{p: "کېږو", f: "kéGoo"}]],
            [[{p: "کېږې", f: "kéGe"}], [{p: "کېږئ", f: "kéGeyy"}]],
            [[{p: "کېږې", f: "kéGe"}], [{p: "کېږئ", f: "kéGeyy"}]],
            [[{p: "کېږي", f: "kéGee"}], [{p: "کېږي", f: "kéGee"}]],
            [[{p: "کېږي", f: "kéGee"}], [{p: "کېږي", f: "kéGee"}]],
        ],
        future: [
            [[{p: "به کېږم", f: "ba kéGum"}], [{p: "به کېږو", f: "ba kéGoo"}]],
            [[{p: "به کېږم", f: "ba kéGum"}], [{p: "به کېږو", f: "ba kéGoo"}]],
            [[{p: "به کېږې", f: "ba kéGe"}], [{p: "به کېږئ", f: "ba kéGeyy"}]],
            [[{p: "به کېږې", f: "ba kéGe"}], [{p: "به کېږئ", f: "ba kéGeyy"}]],
            [[{p: "به کېږي", f: "ba kéGee"}], [{p: "به کېږي", f: "ba kéGee"}]],
            [[{p: "به کېږي", f: "ba kéGee"}], [{p: "به کېږي", f: "ba kéGee"}]],
        ],
        imperative: [
            [[{ p: "کېږه", f: "kéGa" }], [{ p: "کېږئ", f: "kéGeyy" }]],
            [[{ p: "کېږه", f: "kéGa" }], [{ p: "کېږئ", f: "kéGeyy" }]]
        ],
        past: {
            short: [
                [[{p: "کېدم", f: "kedúm"}], [{p: "کېدو", f: "kedóo"}]],
                [[{p: "کېدم", f: "kedúm"}], [{p: "کېدو", f: "kedóo"}]],
                [[{p: "کېدې", f: "kedé"}], [{p: "کېدئ", f: "kedéyy"}]],
                [[{p: "کېدې", f: "kedé"}], [{p: "کېدئ", f: "kedéyy"}]],
                [[{p: "کېده", f: "kedú"}, {p: "کېدو", f: "kedó"}], [{p: "کېدل", f: "kedúl"}]],
                [[{p: "کېده", f: "kedá"}], [{p: "کېدې", f: "kedé"}]],
            ],
            long: [
                [[{p: "کېدلم", f: "kedúlum"}], [{p: "کېدلو", f: "kedúloo"}]],
                [[{p: "کېدلم", f: "kedúlum"}], [{p: "کېدلو", f: "kedúloo"}]],
                [[{p: "کېدلې", f: "kedúle"}], [{p: "کېدلئ", f: "kedúleyy"}]],
                [[{p: "کېدلې", f: "kedúle"}], [{p: "کېدلئ", f: "kedúleyy"}]],
                [[{p: "کېدله", f: "kedúlu"}, {p: "کېدلو", f: "kedúlo"}], [{p: "کېدل", f: "kedúl"}]],
                [[{p: "کېدله", f: "kedúla"}], [{p: "کېدلې", f: "kedúle"}]],
            ],
        },
        habitualPast: {
            short: [
                [[{p: "به کېدم", f: "ba kedum"}], [{p: "به کېدو", f: "ba kedóo"}]],
                [[{p: "به کېدم", f: "ba kedum"}], [{p: "به کېدو", f: "ba kedóo"}]],
                [[{p: "به کېدې", f: "ba kedé"}], [{p: "به کېدئ", f: "ba kedéyy"}]],
                [[{p: "به کېدې", f: "ba kedé"}], [{p: "به کېدئ", f: "ba kedéyy"}]],
                [[{p: "به کېده", f: "ba kedu"}, {p: "به کېدو", f: "ba kedó"}], [{p: "به کېدل", f: "ba kedúl"}]],
                [[{p: "به کېده", f: "ba kedá"}], [{p: "به کېدې", f: "ba kedé"}]],
            ],
            long: [
                [[{p: "به کېدلم", f: "ba kedúlum"}], [{p: "به کېدلو", f: "ba kedúloo"}]],
                [[{p: "به کېدلم", f: "ba kedúlum"}], [{p: "به کېدلو", f: "ba kedúloo"}]],
                [[{p: "به کېدلې", f: "ba kedúle"}], [{p: "به کېدلئ", f: "ba kedúleyy"}]],
                [[{p: "به کېدلې", f: "ba kedúle"}], [{p: "به کېدلئ", f: "ba kedúleyy"}]],
                [[{p: "به کېدله", f: "ba kedúlu"}, {p: "به کېدلو", f: "ba kedúlo"}], [{p: "به کېدل", f: "ba kedúl"}]],
                [[{p: "به کېدله", f: "ba kedúla"}], [{p: "به کېدلې", f: "ba kedúle"}]],
            ],
        },
        modal: kedulStatModal,
    },
    perfective: {
        nonImperative: [
            [[{p: "شم", f: "shum"}], [{p: "شو", f: "shoo"}]],
            [[{p: "شم", f: "shum"}], [{p: "شو", f: "shoo"}]],
            [[{p: "شې", f: "she"}], [{p: "شئ", f: "sheyy"}]],
            [[{p: "شې", f: "she"}], [{p: "شئ", f: "sheyy"}]],
            [[{p: "شي", f: "shee"}], [{p: "شي", f: "shee"}]],
            [[{p: "شي", f: "shee"}], [{p: "شي", f: "shee"}]],
        ],
        future: [
            [[{p: "به شم", f: "ba shum"}], [{p: "به شو", f: "ba shoo"}]],
            [[{p: "به شم", f: "ba shum"}], [{p: "به شو", f: "ba shoo"}]],
            [[{p: "به شې", f: "ba she"}], [{p: "به شئ", f: "ba sheyy"}]],
            [[{p: "به شې", f: "ba she"}], [{p: "به شئ", f: "ba sheyy"}]],
            [[{p: "به شي", f: "ba shee"}], [{p: "به شي", f: "ba shee"}]],
            [[{p: "به شي", f: "ba shee"}], [{p: "به شي", f: "ba shee"}]],
        ],
        imperative: [
            [[{ p: "شه", f: "sha" }], [{ p: "شئ", f: "sheyy" }]],
            [[{ p: "شه", f: "sha" }], [{ p: "شئ", f: "sheyy" }]],
        ],
        past: {
            short: [
                [[{p: "شوم", f: "shwum"}], [{p: "شو", f: "shoo"}]],
                [[{p: "شوم", f: "shwum"}], [{p: "شو", f: "shoo"}]],
                [[{p: "شوې", f: "shwe"}], [{p: "شوئ", f: "shweyy"}]],
                [[{p: "شوې", f: "shwe"}], [{p: "شوئ", f: "shweyy"}]],
                [[{p: "شو", f: "sho"}], [{p: "شو", f: "shoo"}, {p: "شول", f: "shwul"}]],
                [[{p: "شوه", f: "shwa"}], [{p: "شوې", f: "shwe"}]],
            ],
            long: [
                [[{p: "شولم", f: "shwulum"}], [{p: "شولو", f: "shwuloo"}]],
                [[{p: "شولم", f: "shwulum"}], [{p: "شولو", f: "shwuloo"}]],
                [[{p: "شولې", f: "shwule"}], [{p: "شولئ", f: "shwuleyy"}]],
                [[{p: "شولې", f: "shwule"}], [{p: "شولئ", f: "shwuleyy"}]],
                [[{p: "شوله", f: "shwulu"}, {p: "شولو", f: "shwulo"}], [{p: "شول", f: "shwul"}]],
                [[{p: "شوله", f: "shwula"}], [{p: "شولې", f: "shwule"}]],
            ],
        },
        habitualPast: {
            short: [
                [[{p: "به شوم", f: "ba shwum"}], [{p: "به شو", f: "ba shoo"}]],
                [[{p: "به شوم", f: "ba shwum"}], [{p: "به شو", f: "ba shoo"}]],
                [[{p: "به شوې", f: "ba shwe"}], [{p: "به شوئ", f: "ba shweyy"}]],
                [[{p: "به شوې", f: "ba shwe"}], [{p: "به شوئ", f: "ba shweyy"}]],
                [[{p: "به شو", f: "ba sho"}], [{p: "به شو", f: "ba shoo"}, {p: "به شول", f: "ba shwul"}]],
                [[{p: "به شوه", f: "ba shwa"}], [{p: "به شوې", f: "ba shwe"}]],
            ],
            long: [
                [[{p: "به شولم", f: "ba shwulum"}], [{p: "به شولو", f: "ba shwuloo"}]],
                [[{p: "به شولم", f: "ba shwulum"}], [{p: "به شولو", f: "ba shwuloo"}]],
                [[{p: "به شولې", f: "ba shwule"}], [{p: "به شولئ", f: "ba shwuleyy"}]],
                [[{p: "به شولې", f: "ba shwule"}], [{p: "به شولئ", f: "ba shwuleyy"}]],
                [[{p: "به شوله", f: "ba shwulu"}, {p: "به شولو", f: "ba shwulo"}], [{p: "به شول", f: "ba shwul"}]],
                [[{p: "به شوله", f: "ba shwula"}], [{p: "به شولې", f: "ba shwule"}]],
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
                [{ p: "شوی", f: "shúwey" }],
                [{ p: "شوي", f: "shúwee" }],
                [{ p: "شویو", f: "shúwiyo" }, { p: "شوو", f: "shúwo" }],
            ],
            fem: [
                [{ p: "شوې", f: "shúwe" }],
                [{ p: "شوې", f: "shúwe" }],
                [{ p: "شوو", f: "shúwo" }],
            ],
        },
        present: {
            masc: [
                [{ p: "کېدونکی", f: "keedóonkey" }],
                [{ p: "کېدونکي", f: "keedóonkee" }],
                [{ p: "کېدونکیو", f: "keedóonkiyo" }, { p: "کېدونکو", f: "kedóonko" }],
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
            [[{p: "شوی", f: "shuwey"}], [{p: "شوي", f: "shuwee"}]],
            [[{p: "شوې", f: "shuwe"}], [{p: "شوې", f: "shuwe"}]],
            [[{p: "شوی", f: "shuwey"}], [{p: "شوي", f: "shuwee"}]],
            [[{p: "شوې", f: "shuwe"}], [{p: "شوې", f: "shuwe"}]],
            [[{p: "شوی", f: "shuwey"}], [{p: "شوي", f: "shuwee"}]],
            [[{p: "شوې", f: "shuwe"}], [{p: "شوې", f: "shuwe"}]],
        ],
        past: [
            [[{p: "شوی وم", f: "shuwey wum"}], [{p: "شوي وو", f: "shuwee woo"}]],
            [[{p: "شوې وم", f: "shuwe wum"}], [{p: "شوې وو", f: "shuwe woo"}]],
            [[{p: "شوی وې", f: "shuwey we"}], [{p: "شوي وئ", f: "shuwee weyy"}]],
            [[{p: "شوې وې", f: "shuwe we"}], [{p: "شوې وئ", f: "shuwe weyy"}]],
            [[{p: "شوی و", f: "shuwey wo"}], [{p: "شوي وو", f: "shuwee woo"}]],
            [[{p: "شوې وه", f: "shuwe wa"}], [{p: "شوې وې", f: "shuwe we"}]],
        ],
        present: [
            [[{p: "شوی یم", f: "shuwey yum"}], [{p: "شوي یو", f: "shuwee yoo"}]],
            [[{p: "شوې یم", f: "shuwe yum"}], [{p: "شوې یو", f: "shuwe yoo"}]],
            [[{p: "شوی یې", f: "shuwey ye"}], [{p: "شوي یئ", f: "shuwee yeyy"}]],
            [[{p: "شوې یې", f: "shuwe ye"}], [{p: "شوې یئ", f: "shuwe yeyy"}]],
            [[{p: "شوی دی", f: "shuwey dey"}], [{p: "شوي دي", f: "shuwee dee"}]],
            [[{p: "شوې ده", f: "shuwe da"}], [{p: "شوې دي", f: "shuwe dee"}]],
        ],
        habitual: [
            [[{p: "شوی یم", f: "shuwey yum"}], [{p: "شوي یو", f: "shuwee yoo"}]],
            [[{p: "شوې یم", f: "shuwe yum"}], [{p: "شوې یو", f: "shuwe yoo"}]],
            [[{p: "شوی یې", f: "shuwey ye"}], [{p: "شوي یئ", f: "shuwee yeyy"}]],
            [[{p: "شوې یې", f: "shuwe ye"}], [{p: "شوې یئ", f: "shuwe yeyy"}]],
            [[{p: "شوی وي", f: "shuwey wee"}], [{p: "شوي وي", f: "shuwee wee"}]],
            [[{p: "شوې وي", f: "shuwe wee"}], [{p: "شوې وي", f: "shuwe wee"}]],
        ],
        subjunctive: [
            [[{p: "شوی وم", f: "shuwey wum"}], [{p: "شوي وو", f: "shuwee woo"}]],
            [[{p: "شوې وم", f: "shuwe wum"}], [{p: "شوې وو", f: "shuwe woo"}]],
            [[{p: "شوی وې", f: "shuwey we"}], [{p: "شوي وئ", f: "shuwee weyy"}]],
            [[{p: "شوې وې", f: "shuwe we"}], [{p: "شوې وئ", f: "shuwe weyy"}]],
            [[{p: "شوی وي", f: "shuwey wee"}], [{p: "شوي وي", f: "shuwee wee"}]],
            [[{p: "شوې وي", f: "shuwe wee"}], [{p: "شوې وي", f: "shuwe wee"}]],
        ],
        future: [
            [[{p: "به شوی یم", f: "ba shuwey yum"}], [{p: "به شوي یو", f: "ba shuwee yoo"}]],
            [[{p: "به شوې یم", f: "ba shuwe yum"}], [{p: "به شوې یو", f: "ba shuwe yoo"}]],
            [[{p: "به شوی یې", f: "ba shuwey ye"}], [{p: "به شوي یئ", f: "ba shuwee yeyy"}]],
            [[{p: "به شوې یې", f: "ba shuwe ye"}], [{p: "به شوې یئ", f: "ba shuwe yeyy"}]],
            [[{p: "به شوی وي", f: "ba shuwey wee"}], [{p: "به شوي وي", f: "ba shuwee wee"}]],
            [[{p: "به شوې وي", f: "ba shuwe wee"}], [{p: "به شوې وي", f: "ba shuwe wee"}]],
        ],
        affirmational: [
            [[{p: "به شوی وم", f: "ba shuwey wum"}], [{p: "به شوي وو", f: "ba shuwee woo"}]],
            [[{p: "به شوې وم", f: "ba shuwe wum"}], [{p: "به شوې وو", f: "ba shuwe woo"}]],
            [[{p: "به شوی وې", f: "ba shuwey we"}], [{p: "به شوي وئ", f: "ba shuwee weyy"}]],
            [[{p: "به شوې وې", f: "ba shuwe we"}], [{p: "به شوې وئ", f: "ba shuwe weyy"}]],
            [[{p: "به شوی و", f: "ba shuwey wo"}], [{p: "به شوي وو", f: "ba shuwee woo"}]],
            [[{p: "به شوې وه", f: "ba shuwe wa"}], [{p: "به شوې وې", f: "ba shuwe we"}]],
        ],
        pastSubjunctiveHypothetical: [
            [[{p: "به شوی وای", f: "ba shuwey waay"}, {p: "به شوی وی", f: "ba shuwey wey"}], [{p: "به شوي وای", f: "ba shuwee waay"}, {p: "به شوي وی", f: "ba shuwee wey"}]],
            [[{p: "به شوې وای", f: "ba shuwe waay"}, {p: "به شوې وی", f: "ba shuwe wey"}], [{p: "به شوې وای", f: "ba shuwe waay"}, {p: "به شوې وی", f: "ba shuwe wey"}]],
            [[{p: "به شوی وای", f: "ba shuwey waay"}, {p: "به شوی وی", f: "ba shuwey wey"}], [{p: "به شوي وای", f: "ba shuwee waay"}, {p: "به شوي وی", f: "ba shuwee wey"}]],
            [[{p: "به شوې وای", f: "ba shuwe waay"}, {p: "به شوې وی", f: "ba shuwe wey"}], [{p: "به شوې وای", f: "ba shuwe waay"}, {p: "به شوې وی", f: "ba shuwe wey"}]],
            [[{p: "به شوی وای", f: "ba shuwey waay"}, {p: "به شوی وی", f: "ba shuwey wey"}], [{p: "به شوي وای", f: "ba shuwee waay"}, {p: "به شوي وی", f: "ba shuwee wey"}]],
            [[{p: "به شوې وای", f: "ba shuwe waay"}, {p: "به شوې وی", f: "ba shuwe wey"}], [{p: "به شوې وای", f: "ba shuwe waay"}, {p: "به شوې وی", f: "ba shuwe wey"}]],
        ],
    },
};

export const kedulDyn: T.VerbConjugation = {
    info: {
        transitivity: "intransitive",
        type: "simple",
        yulEnding: false,
        stem: {
            imperfective: { p: "کېږ", f: "kéG" },
            perfective: { p: "وش", f: "óosh" },
            perfectiveSplit: [{ p: "و", f: "óo" }, { p: "ش", f: "sh" }],
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
                long: [{ p: "و", f: "óo" }, { p: "شول", f: "shwul" }],
                short: [{ p: "و", f: "óo" }, { p: "شو", f: "shw" }],
            },
        },
        participle: {
            present: { p: "کېدونکی", f: "kedóonkey" },
            past: { p: "شوی", f: "shúwey" },
        },
    },
    imperfective: {
        nonImperative: [
            [[{p: "کېږم", f: "kéGum"}], [{p: "کېږو", f: "kéGoo"}]],
            [[{p: "کېږم", f: "kéGum"}], [{p: "کېږو", f: "kéGoo"}]],
            [[{p: "کېږې", f: "kéGe"}], [{p: "کېږئ", f: "kéGeyy"}]],
            [[{p: "کېږې", f: "kéGe"}], [{p: "کېږئ", f: "kéGeyy"}]],
            [[{p: "کېږي", f: "kéGee"}], [{p: "کېږي", f: "kéGee"}]],
            [[{p: "کېږي", f: "kéGee"}], [{p: "کېږي", f: "kéGee"}]],
        ],
        future: [
            [[{p: "به کېږم", f: "ba kéGum"}], [{p: "به کېږو", f: "ba kéGoo"}]],
            [[{p: "به کېږم", f: "ba kéGum"}], [{p: "به کېږو", f: "ba kéGoo"}]],
            [[{p: "به کېږې", f: "ba kéGe"}], [{p: "به کېږئ", f: "ba kéGeyy"}]],
            [[{p: "به کېږې", f: "ba kéGe"}], [{p: "به کېږئ", f: "ba kéGeyy"}]],
            [[{p: "به کېږي", f: "ba kéGee"}], [{p: "به کېږي", f: "ba kéGee"}]],
            [[{p: "به کېږي", f: "ba kéGee"}], [{p: "به کېږي", f: "ba kéGee"}]],
        ],
        imperative: [
            [[{ p: "کېږه", f: "kéGa" }], [{ p: "کېږئ", f: "kéGeyy" }]],
            [[{ p: "کېږه", f: "kéGa" }], [{ p: "کېږئ", f: "kéGeyy" }]]
        ],
        past: {
            short: [
                [[{p: "کېدم", f: "kedum"}], [{p: "کېدو", f: "kedóo"}]],
                [[{p: "کېدم", f: "kedum"}], [{p: "کېدو", f: "kedóo"}]],
                [[{p: "کېدې", f: "kedé"}], [{p: "کېدئ", f: "kedéyy"}]],
                [[{p: "کېدې", f: "kedé"}], [{p: "کېدئ", f: "kedéyy"}]],
                [[{p: "کېده", f: "kedu"}, {p: "کېدو", f: "kedó"}], [{p: "کېدل", f: "kedúl"}]],
                [[{p: "کېده", f: "kedá"}], [{p: "کېدې", f: "kedé"}]],
            ],
            long: [
                [[{p: "کېدلم", f: "kedúlum"}], [{p: "کېدلو", f: "kedúloo"}]],
                [[{p: "کېدلم", f: "kedúlum"}], [{p: "کېدلو", f: "kedúloo"}]],
                [[{p: "کېدلې", f: "kedúle"}], [{p: "کېدلئ", f: "kedúleyy"}]],
                [[{p: "کېدلې", f: "kedúle"}], [{p: "کېدلئ", f: "kedúleyy"}]],
                [[{p: "کېدله", f: "kedúlu"}, {p: "کېدلو", f: "kedúlo"}], [{p: "کېدل", f: "kedúl"}]],
                [[{p: "کېدله", f: "kedúla"}], [{p: "کېدلې", f: "kedúle"}]],
            ],
        },
        habitualPast: {
            short: [
                [[{p: "به کېدم", f: "ba kedum"}], [{p: "به کېدو", f: "ba kedóo"}]],
                [[{p: "به کېدم", f: "ba kedum"}], [{p: "به کېدو", f: "ba kedóo"}]],
                [[{p: "به کېدې", f: "ba kedé"}], [{p: "به کېدئ", f: "ba kedéyy"}]],
                [[{p: "به کېدې", f: "ba kedé"}], [{p: "به کېدئ", f: "ba kedéyy"}]],
                [[{p: "به کېده", f: "ba kedu"}, {p: "به کېدو", f: "ba kedó"}], [{p: "به کېدل", f: "ba kedúl"}]],
                [[{p: "به کېده", f: "ba kedá"}], [{p: "به کېدې", f: "ba kedé"}]],
            ],
            long: [
                [[{p: "به کېدلم", f: "ba kedúlum"}], [{p: "به کېدلو", f: "ba kedúloo"}]],
                [[{p: "به کېدلم", f: "ba kedúlum"}], [{p: "به کېدلو", f: "ba kedúloo"}]],
                [[{p: "به کېدلې", f: "ba kedúle"}], [{p: "به کېدلئ", f: "ba kedúleyy"}]],
                [[{p: "به کېدلې", f: "ba kedúle"}], [{p: "به کېدلئ", f: "ba kedúleyy"}]],
                [[{p: "به کېدله", f: "ba kedúlu"}, {p: "به کېدلو", f: "ba kedúlo"}], [{p: "به کېدل", f: "ba kedúl"}]],
                [[{p: "به کېدله", f: "ba kedúla"}], [{p: "به کېدلې", f: "ba kedúle"}]],
            ],
        },
        modal: kedulStatModal,
    },
    perfective: {
        nonImperative: [
            [[{p: "وشم", f: "óoshum"}], [{p: "وشو", f: "óoshoo"}]],
            [[{p: "وشم", f: "óoshum"}], [{p: "وشو", f: "óoshoo"}]],
            [[{p: "وشې", f: "óoshe"}], [{p: "وشئ", f: "óosheyy"}]],
            [[{p: "وشې", f: "óoshe"}], [{p: "وشئ", f: "óosheyy"}]],
            [[{p: "وشي", f: "óoshee"}], [{p: "وشي", f: "óoshee"}]],
            [[{p: "وشي", f: "óoshee"}], [{p: "وشي", f: "óoshee"}]],
        ],
        future: [
            [[{p: "به شم", f: "ba shum"}], [{p: "به شو", f: "ba shoo"}]],
            [[{p: "به شم", f: "ba shum"}], [{p: "به شو", f: "ba shoo"}]],
            [[{p: "به شې", f: "ba she"}], [{p: "به شئ", f: "ba sheyy"}]],
            [[{p: "به شې", f: "ba she"}], [{p: "به شئ", f: "ba sheyy"}]],
            [[{p: "به شي", f: "ba shee"}], [{p: "به شي", f: "ba shee"}]],
            [[{p: "به شي", f: "ba shee"}], [{p: "به شي", f: "ba shee"}]],
        ],
        imperative: [
            [[{ p: "وشه", f: "óosha" }], [{ p: "وشئ", f: "óosheyy" }]],
            [[{ p: "وشه", f: "óosha" }], [{ p: "وشئ", f: "óosheyy" }]],
        ],
        past: {
            short: [
                [[{p: "وشوم", f: "óoshwum"}], [{p: "وشو", f: "óoshoo"}]],
                [[{p: "وشوم", f: "óoshwum"}], [{p: "وشو", f: "óoshoo"}]],
                [[{p: "وشوې", f: "óoshwe"}], [{p: "وشوئ", f: "óoshweyy"}]],
                [[{p: "وشوې", f: "óoshwe"}], [{p: "وشوئ", f: "óoshweyy"}]],
                [[{p: "وشو", f: "óosho"}], [{p: "وشو", f: "óoshoo"}, {p: "وشول", f: "óoshwul"}]],
                [[{p: "وشوه", f: "óoshwa"}], [{p: "وشوې", f: "óoshwe"}]],
            ],
            long: [
                [[{p: "وشولم", f: "óoshwulum"}], [{p: "وشولو", f: "óoshwuloo"}]],
                [[{p: "وشولم", f: "óoshwulum"}], [{p: "وشولو", f: "óoshwuloo"}]],
                [[{p: "وشولې", f: "óoshwule"}], [{p: "وشولئ", f: "óoshwuleyy"}]],
                [[{p: "وشولې", f: "óoshwule"}], [{p: "وشولئ", f: "óoshwuleyy"}]],
                [[{p: "وشوله", f: "óoshwulu"}, {p: "وشولو", f: "óoshwulo"}], [{p: "وشول", f: "óoshwul"}]],
                [[{p: "وشوله", f: "óoshwula"}], [{p: "وشولې", f: "óoshwule"}]],
            ],
        },
        habitualPast: {
            short: [
                [[{p: "به وشوم", f: "ba óoshwum"}], [{p: "به وشو", f: "ba óoshoo"}]],
                [[{p: "به وشوم", f: "ba óoshwum"}], [{p: "به وشو", f: "ba óoshoo"}]],
                [[{p: "به وشوې", f: "ba óoshwe"}], [{p: "به وشوئ", f: "ba óoshweyy"}]],
                [[{p: "به وشوې", f: "ba óoshwe"}], [{p: "به وشوئ", f: "ba óoshweyy"}]],
                [[{p: "به وشو", f: "ba óosho"}], [{p: "به وشو", f: "ba óoshoo"}, {p: "به وشول", f: "ba óoshwul"}]],
                [[{p: "به وشوه", f: "ba óoshwa"}], [{p: "به وشوې", f: "ba óoshwe"}]],
            ],
            long: [
                [[{p: "به وشولم", f: "ba óoshwulum"}], [{p: "به وشولو", f: "ba óoshwuloo"}]],
                [[{p: "به وشولم", f: "ba óoshwulum"}], [{p: "به وشولو", f: "ba óoshwuloo"}]],
                [[{p: "به وشولې", f: "ba óoshwule"}], [{p: "به وشولئ", f: "ba óoshwuleyy"}]],
                [[{p: "به وشولې", f: "ba óoshwule"}], [{p: "به وشولئ", f: "ba óoshwuleyy"}]],
                [[{p: "به وشوله", f: "ba óoshwulu"}, {p: "به وشولو", f: "ba óoshwulo"}], [{p: "به وشول", f: "ba óoshwul"}]],
                [[{p: "به وشوله", f: "ba óoshwula"}], [{p: "به وشولې", f: "ba óoshwule"}]],
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
                [{ p: "شوی", f: "shúwey" }],
                [{ p: "شوي", f: "shúwee" }],
                [{ p: "شویو", f: "shúwiyo" }, { p: "شوو", f: "shúwo" }],
            ],
            fem: [
                [{ p: "شوې", f: "shúwe" }],
                [{ p: "شوې", f: "shúwe" }],
                [{ p: "شوو", f: "shúwo" }],
            ],
        },
        present: {
            masc: [
                [{ p: "کېدونکی", f: "keedóonkey" }],
                [{ p: "کېدونکي", f: "keedóonkee" }],
                [{ p: "کېدونکیو", f: "keedóonkiyo" }, { p: "کېدونکو", f: "kedóonko" }],
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
            [[{p: "شوی", f: "shuwey"}], [{p: "شوي", f: "shuwee"}]],
            [[{p: "شوې", f: "shuwe"}], [{p: "شوې", f: "shuwe"}]],
            [[{p: "شوی", f: "shuwey"}], [{p: "شوي", f: "shuwee"}]],
            [[{p: "شوې", f: "shuwe"}], [{p: "شوې", f: "shuwe"}]],
            [[{p: "شوی", f: "shuwey"}], [{p: "شوي", f: "shuwee"}]],
            [[{p: "شوې", f: "shuwe"}], [{p: "شوې", f: "shuwe"}]],
        ],
        past: [
            [[{p: "شوی وم", f: "shuwey wum"}], [{p: "شوي وو", f: "shuwee woo"}]],
            [[{p: "شوې وم", f: "shuwe wum"}], [{p: "شوې وو", f: "shuwe woo"}]],
            [[{p: "شوی وې", f: "shuwey we"}], [{p: "شوي وئ", f: "shuwee weyy"}]],
            [[{p: "شوې وې", f: "shuwe we"}], [{p: "شوې وئ", f: "shuwe weyy"}]],
            [[{p: "شوی و", f: "shuwey wo"}], [{p: "شوي وو", f: "shuwee woo"}]],
            [[{p: "شوې وه", f: "shuwe wa"}], [{p: "شوې وې", f: "shuwe we"}]],
        ],
        present: [
            [[{p: "شوی یم", f: "shuwey yum"}], [{p: "شوي یو", f: "shuwee yoo"}]],
            [[{p: "شوې یم", f: "shuwe yum"}], [{p: "شوې یو", f: "shuwe yoo"}]],
            [[{p: "شوی یې", f: "shuwey ye"}], [{p: "شوي یئ", f: "shuwee yeyy"}]],
            [[{p: "شوې یې", f: "shuwe ye"}], [{p: "شوې یئ", f: "shuwe yeyy"}]],
            [[{p: "شوی دی", f: "shuwey dey"}], [{p: "شوي دي", f: "shuwee dee"}]],
            [[{p: "شوې ده", f: "shuwe da"}], [{p: "شوې دي", f: "shuwe dee"}]],
        ],
        habitual: [
            [[{p: "شوی یم", f: "shuwey yum"}], [{p: "شوي یو", f: "shuwee yoo"}]],
            [[{p: "شوې یم", f: "shuwe yum"}], [{p: "شوې یو", f: "shuwe yoo"}]],
            [[{p: "شوی یې", f: "shuwey ye"}], [{p: "شوي یئ", f: "shuwee yeyy"}]],
            [[{p: "شوې یې", f: "shuwe ye"}], [{p: "شوې یئ", f: "shuwe yeyy"}]],
            [[{p: "شوی وي", f: "shuwey wee"}], [{p: "شوي وي", f: "shuwee wee"}]],
            [[{p: "شوې وي", f: "shuwe wee"}], [{p: "شوې وي", f: "shuwe wee"}]],
        ],
        subjunctive: [
            [[{p: "شوی وم", f: "shuwey wum"}], [{p: "شوي وو", f: "shuwee woo"}]],
            [[{p: "شوې وم", f: "shuwe wum"}], [{p: "شوې وو", f: "shuwe woo"}]],
            [[{p: "شوی وې", f: "shuwey we"}], [{p: "شوي وئ", f: "shuwee weyy"}]],
            [[{p: "شوې وې", f: "shuwe we"}], [{p: "شوې وئ", f: "shuwe weyy"}]],
            [[{p: "شوی وي", f: "shuwey wee"}], [{p: "شوي وي", f: "shuwee wee"}]],
            [[{p: "شوې وي", f: "shuwe wee"}], [{p: "شوې وي", f: "shuwe wee"}]],
        ],
        future: [
            [[{p: "به شوی یم", f: "ba shuwey yum"}], [{p: "به شوي یو", f: "ba shuwee yoo"}]],
            [[{p: "به شوې یم", f: "ba shuwe yum"}], [{p: "به شوې یو", f: "ba shuwe yoo"}]],
            [[{p: "به شوی یې", f: "ba shuwey ye"}], [{p: "به شوي یئ", f: "ba shuwee yeyy"}]],
            [[{p: "به شوې یې", f: "ba shuwe ye"}], [{p: "به شوې یئ", f: "ba shuwe yeyy"}]],
            [[{p: "به شوی وي", f: "ba shuwey wee"}], [{p: "به شوي وي", f: "ba shuwee wee"}]],
            [[{p: "به شوې وي", f: "ba shuwe wee"}], [{p: "به شوې وي", f: "ba shuwe wee"}]],
        ],
        affirmational: [
            [[{p: "به شوی وم", f: "ba shuwey wum"}], [{p: "به شوي وو", f: "ba shuwee woo"}]],
            [[{p: "به شوې وم", f: "ba shuwe wum"}], [{p: "به شوې وو", f: "ba shuwe woo"}]],
            [[{p: "به شوی وې", f: "ba shuwey we"}], [{p: "به شوي وئ", f: "ba shuwee weyy"}]],
            [[{p: "به شوې وې", f: "ba shuwe we"}], [{p: "به شوې وئ", f: "ba shuwe weyy"}]],
            [[{p: "به شوی و", f: "ba shuwey wo"}], [{p: "به شوي وو", f: "ba shuwee woo"}]],
            [[{p: "به شوې وه", f: "ba shuwe wa"}], [{p: "به شوې وې", f: "ba shuwe we"}]],
        ],
        pastSubjunctiveHypothetical: [
            [[{p: "به شوی وای", f: "ba shuwey waay"}, {p: "به شوی وی", f: "ba shuwey wey"}], [{p: "به شوي وای", f: "ba shuwee waay"}, {p: "به شوي وی", f: "ba shuwee wey"}]],
            [[{p: "به شوې وای", f: "ba shuwe waay"}, {p: "به شوې وی", f: "ba shuwe wey"}], [{p: "به شوې وای", f: "ba shuwe waay"}, {p: "به شوې وی", f: "ba shuwe wey"}]],
            [[{p: "به شوی وای", f: "ba shuwey waay"}, {p: "به شوی وی", f: "ba shuwey wey"}], [{p: "به شوي وای", f: "ba shuwee waay"}, {p: "به شوي وی", f: "ba shuwee wey"}]],
            [[{p: "به شوې وای", f: "ba shuwe waay"}, {p: "به شوې وی", f: "ba shuwe wey"}], [{p: "به شوې وای", f: "ba shuwe waay"}, {p: "به شوې وی", f: "ba shuwe wey"}]],
            [[{p: "به شوی وای", f: "ba shuwey waay"}, {p: "به شوی وی", f: "ba shuwey wey"}], [{p: "به شوي وای", f: "ba shuwee waay"}, {p: "به شوي وی", f: "ba shuwee wey"}]],
            [[{p: "به شوې وای", f: "ba shuwe waay"}, {p: "به شوې وی", f: "ba shuwe wey"}], [{p: "به شوې وای", f: "ba shuwe waay"}, {p: "به شوې وی", f: "ba shuwe wey"}]],
        ],
    },
};

const kawulImperfectiveModal: T.ModalContent = {
    nonImperative: {
        long: [
            [[{ p: "کولی شم", f: "kawúley shum" }, { p: "کولای شم", f: "kawúlaay shum" }], [{ p: "کولی شو", f: "kawúley shoo" }, { p: "کولای شو", f: "kawúlaay shoo" }]],
            [[{ p: "کولی شم", f: "kawúley shum" }, { p: "کولای شم", f: "kawúlaay shum" }], [{ p: "کولی شو", f: "kawúley shoo" }, { p: "کولای شو", f: "kawúlaay shoo" }]],
            [[{ p: "کولی شې", f: "kawúley she" }, { p: "کولای شې", f: "kawúlaay she" }], [{ p: "کولی شئ", f: "kawúley sheyy" }, { p: "کولای شئ", f: "kawúlaay sheyy" }]],
            [[{ p: "کولی شې", f: "kawúley she" }, { p: "کولای شې", f: "kawúlaay she" }], [{ p: "کولی شئ", f: "kawúley sheyy" }, { p: "کولای شئ", f: "kawúlaay sheyy" }]],
            [[{ p: "کولی شي", f: "kawúley shee" }, { p: "کولای شي", f: "kawúlaay shee" }], [{ p: "کولی شي", f: "kawúley shee" }, { p: "کولای شي", f: "kawúlaay shee" }]],
            [[{ p: "کولی شي", f: "kawúley shee" }, { p: "کولای شي", f: "kawúlaay shee" }], [{ p: "کولی شي", f: "kawúley shee" }, { p: "کولای شي", f: "kawúlaay shee" }]],
        ],
        short: [
            [[{ p: "کوی شم", f: "kawéy shum" }, { p: "کوای شم", f: "kawáay shum" }], [{ p: "کوی شو", f: "kawéy shoo" }, { p: "کوای شو", f: "kawáay shoo" }]],
            [[{ p: "کوی شم", f: "kawéy shum" }, { p: "کوای شم", f: "kawáay shum" }], [{ p: "کوی شو", f: "kawéy shoo" }, { p: "کوای شو", f: "kawáay shoo" }]],
            [[{ p: "کوی شې", f: "kawéy she" }, { p: "کوای شې", f: "kawáay she" }], [{ p: "کوی شئ", f: "kawéy sheyy" }, { p: "کوای شئ", f: "kawáay sheyy" }]],
            [[{ p: "کوی شې", f: "kawéy she" }, { p: "کوای شې", f: "kawáay she" }], [{ p: "کوی شئ", f: "kawéy sheyy" }, { p: "کوای شئ", f: "kawáay sheyy" }]],
            [[{ p: "کوی شي", f: "kawéy shee" }, { p: "کوای شي", f: "kawáay shee" }], [{ p: "کوی شي", f: "kawéy shee" }, { p: "کوای شي", f: "kawáay shee" }]],
            [[{ p: "کوی شي", f: "kawéy shee" }, { p: "کوای شي", f: "kawáay shee" }], [{ p: "کوی شي", f: "kawéy shee" }, { p: "کوای شي", f: "kawáay shee" }]],
        ],
    },
    future: {
        long: [
            [[{ p: "به کولی شم", f: "ba kawúley shum" }, { p: "به کولای شم", f: "ba kawúlaay shum" }], [{ p: "به کولی شو", f: "ba kawúley shoo" }, { p: "به کولای شو", f: "ba kawúlaay shoo" }]],
            [[{ p: "به کولی شم", f: "ba kawúley shum" }, { p: "به کولای شم", f: "ba kawúlaay shum" }], [{ p: "به کولی شو", f: "ba kawúley shoo" }, { p: "به کولای شو", f: "ba kawúlaay shoo" }]],
            [[{ p: "به کولی شې", f: "ba kawúley she" }, { p: "به کولای شې", f: "ba kawúlaay she" }], [{ p: "به کولی شئ", f: "ba kawúley sheyy" }, { p: "به کولای شئ", f: "ba kawúlaay sheyy" }]],
            [[{ p: "به کولی شې", f: "ba kawúley she" }, { p: "به کولای شې", f: "ba kawúlaay she" }], [{ p: "به کولی شئ", f: "ba kawúley sheyy" }, { p: "به کولای شئ", f: "ba kawúlaay sheyy" }]],
            [[{ p: "به کولی شي", f: "ba kawúley shee" }, { p: "به کولای شي", f: "ba kawúlaay shee" }], [{ p: "به کولی شي", f: "ba kawúley shee" }, { p: "به کولای شي", f: "ba kawúlaay shee" }]],
            [[{ p: "به کولی شي", f: "ba kawúley shee" }, { p: "به کولای شي", f: "ba kawúlaay shee" }], [{ p: "به کولی شي", f: "ba kawúley shee" }, { p: "به کولای شي", f: "ba kawúlaay shee" }]],
        ],
        short: [
            [[{ p: "به کوی شم", f: "ba kawéy shum" }, { p: "به کوای شم", f: "ba kawáay shum" }], [{ p: "به کوی شو", f: "ba kawéy shoo" }, { p: "به کوای شو", f: "ba kawáay shoo" }]],
            [[{ p: "به کوی شم", f: "ba kawéy shum" }, { p: "به کوای شم", f: "ba kawáay shum" }], [{ p: "به کوی شو", f: "ba kawéy shoo" }, { p: "به کوای شو", f: "ba kawáay shoo" }]],
            [[{ p: "به کوی شې", f: "ba kawéy she" }, { p: "به کوای شې", f: "ba kawáay she" }], [{ p: "به کوی شئ", f: "ba kawéy sheyy" }, { p: "به کوای شئ", f: "ba kawáay sheyy" }]],
            [[{ p: "به کوی شې", f: "ba kawéy she" }, { p: "به کوای شې", f: "ba kawáay she" }], [{ p: "به کوی شئ", f: "ba kawéy sheyy" }, { p: "به کوای شئ", f: "ba kawáay sheyy" }]],
            [[{ p: "به کوی شي", f: "ba kawéy shee" }, { p: "به کوای شي", f: "ba kawáay shee" }], [{ p: "به کوی شي", f: "ba kawéy shee" }, { p: "به کوای شي", f: "ba kawáay shee" }]],
            [[{ p: "به کوی شي", f: "ba kawéy shee" }, { p: "به کوای شي", f: "ba kawáay shee" }], [{ p: "به کوی شي", f: "ba kawéy shee" }, { p: "به کوای شي", f: "ba kawáay shee" }]],
        ],
    },
    past: {
        long: [
            [[{ p: "کولی شوم", f: "kawúley shwum" }, { p: "کولای شوم", f: "kawúlaay shwum" }], [{ p: "کولی شو", f: "kawúley shoo" }, { p: "کولای شو", f: "kawúlaay shoo" }]],
            [[{ p: "کولی شوم", f: "kawúley shwum" }, { p: "کولای شوم", f: "kawúlaay shwum" }], [{ p: "کولی شو", f: "kawúley shoo" }, { p: "کولای شو", f: "kawúlaay shoo" }]],
            [[{ p: "کولی شوې", f: "kawúley shwe" }, { p: "کولای شوې", f: "kawúlaay shwe" }], [{ p: "کولی شوئ", f: "kawúley shweyy" }, { p: "کولای شوئ", f: "kawúlaay shweyy" }]],
            [[{ p: "کولی شوې", f: "kawúley shwe" }, { p: "کولای شوې", f: "kawúlaay shwe" }], [{ p: "کولی شوئ", f: "kawúley shweyy" }, { p: "کولای شوئ", f: "kawúlaay shweyy" }]],
            [[{ p: "کولی شو", f: "kawúley sho" }, { p: "کولای شو", f: "kawúlaay sho" }], [{ p: "کولی شول", f: "kawúley shwul" }, { p: "کولای شول", f: "kawúlaay shwul" }, { p: "کولی شو", f: "kawúley shoo" }, { p: "کولای شو", f: "kawúlaay shoo" }]],
            [[{ p: "کولی شوه", f: "kawúley shwa" }, { p: "کولای شوه", f: "kawúlaay shwa" }], [{ p: "کولی شولې", f: "kawúley shwule" }, { p: "کولای شولې", f: "kawúlaay shwule" }, { p: "کولی شوې", f: "kawúley shwe" }, { p: "کولای شوې", f: "kawúlaay shwe" }]],
        ],
        short: [
            [[{ p: "کوی شوم", f: "kawéy shwum" }, { p: "کوای شوم", f: "kawáay shwum" }], [{ p: "کوی شو", f: "kawéy shoo" }, { p: "کوای شو", f: "kawáay shoo" }]],
            [[{ p: "کوی شوم", f: "kawéy shwum" }, { p: "کوای شوم", f: "kawáay shwum" }], [{ p: "کوی شو", f: "kawéy shoo" }, { p: "کوای شو", f: "kawáay shoo" }]],
            [[{ p: "کوی شوې", f: "kawéy shwe" }, { p: "کوای شوې", f: "kawáay shwe" }], [{ p: "کوی شوئ", f: "kawéy shweyy" }, { p: "کوای شوئ", f: "kawáay shweyy" }]],
            [[{ p: "کوی شوې", f: "kawéy shwe" }, { p: "کوای شوې", f: "kawáay shwe" }], [{ p: "کوی شوئ", f: "kawéy shweyy" }, { p: "کوای شوئ", f: "kawáay shweyy" }]],
            [[{ p: "کوی شو", f: "kawéy sho" }, { p: "کوای شو", f: "kawáay sho" }], [{ p: "کوی شول", f: "kawéy shwul" }, { p: "کوای شول", f: "kawáay shwul" }, { p: "کوی شو", f: "kawéy shoo" }, { p: "کوای شو", f: "kawáay shoo" }]],
            [[{ p: "کوی شوه", f: "kawéy shwa" }, { p: "کوای شوه", f: "kawáay shwa" }], [{ p: "کوی شولې", f: "kawéy shwule" }, { p: "کوای شولې", f: "kawáay shwule" }, { p: "کوی شوې", f: "kawéy shwe" }, { p: "کوای شوې", f: "kawáay shwe" }]],
        ],
    },
    habitualPast: {
        long: [
            [[{ p: "به کولی شوم", f: "ba kawúley shwum" }, { p: "به کولای شوم", f: "ba kawúlaay shwum" }], [{ p: "به کولی شو", f: "ba kawúley shoo" }, { p: "به کولای شو", f: "ba kawúlaay shoo" }]],
            [[{ p: "به کولی شوم", f: "ba kawúley shwum" }, { p: "به کولای شوم", f: "ba kawúlaay shwum" }], [{ p: "به کولی شو", f: "ba kawúley shoo" }, { p: "به کولای شو", f: "ba kawúlaay shoo" }]],
            [[{ p: "به کولی شوې", f: "ba kawúley shwe" }, { p: "به کولای شوې", f: "ba kawúlaay shwe" }], [{ p: "به کولی شوئ", f: "ba kawúley shweyy" }, { p: "به کولای شوئ", f: "ba kawúlaay shweyy" }]],
            [[{ p: "به کولی شوې", f: "ba kawúley shwe" }, { p: "به کولای شوې", f: "ba kawúlaay shwe" }], [{ p: "به کولی شوئ", f: "ba kawúley shweyy" }, { p: "به کولای شوئ", f: "ba kawúlaay shweyy" }]],
            [[{ p: "به کولی شو", f: "ba kawúley sho" }, { p: "به کولای شو", f: "ba kawúlaay sho" }], [{ p: "به کولی شول", f: "ba kawúley shwul" }, { p: "به کولای شول", f: "ba kawúlaay shwul" }, { p: "به کولی شو", f: "ba kawúley shoo" }, { p: "به کولای شو", f: "ba kawúlaay shoo" }]],
            [[{ p: "به کولی شوه", f: "ba kawúley shwa" }, { p: "به کولای شوه", f: "ba kawúlaay shwa" }], [{ p: "به کولی شولې", f: "ba kawúley shwule" }, { p: "به کولای شولې", f: "ba kawúlaay shwule" }, { p: "به کولی شوې", f: "ba kawúley shwe" }, { p: "به کولای شوې", f: "ba kawúlaay shwe" }]],
        ],
        short: [
            [[{ p: "به کوی شوم", f: "ba kawéy shwum" }, { p: "به کوای شوم", f: "ba kawáay shwum" }], [{ p: "به کوی شو", f: "ba kawéy shoo" }, { p: "به کوای شو", f: "ba kawáay shoo" }]],
            [[{ p: "به کوی شوم", f: "ba kawéy shwum" }, { p: "به کوای شوم", f: "ba kawáay shwum" }], [{ p: "به کوی شو", f: "ba kawéy shoo" }, { p: "به کوای شو", f: "ba kawáay shoo" }]],
            [[{ p: "به کوی شوې", f: "ba kawéy shwe" }, { p: "به کوای شوې", f: "ba kawáay shwe" }], [{ p: "به کوی شوئ", f: "ba kawéy shweyy" }, { p: "به کوای شوئ", f: "ba kawáay shweyy" }]],
            [[{ p: "به کوی شوې", f: "ba kawéy shwe" }, { p: "به کوای شوې", f: "ba kawáay shwe" }], [{ p: "به کوی شوئ", f: "ba kawéy shweyy" }, { p: "به کوای شوئ", f: "ba kawáay shweyy" }]],
            [[{ p: "به کوی شو", f: "ba kawéy sho" }, { p: "به کوای شو", f: "ba kawáay sho" }], [{ p: "به کوی شول", f: "ba kawéy shwul" }, { p: "به کوای شول", f: "ba kawáay shwul" }, { p: "به کوی شو", f: "ba kawéy shoo" }, { p: "به کوای شو", f: "ba kawáay shoo" }]],
            [[{ p: "به کوی شوه", f: "ba kawéy shwa" }, { p: "به کوای شوه", f: "ba kawáay shwa" }], [{ p: "به کوی شولې", f: "ba kawéy shwule" }, { p: "به کوای شولې", f: "ba kawáay shwule" }, { p: "به کوی شوې", f: "ba kawéy shwe" }, { p: "به کوای شوې", f: "ba kawáay shwe" }]],
        ],
    },
    hypotheticalPast: {
        long: [
            [[{ p: "کولی شوای", f: "kawúley shwaay" }, { p: "کولی شوی", f: "kawúley shwey" }, { p: "کولای شوای", f: "kawúlaay shwaay" }], [{ p: "کولی شوای", f: "kawúley shwaay" }, { p: "کولی شوی", f: "kawúley shwey" }, { p: "کولای شوای", f: "kawúlaay shwaay" }]],
            [[{ p: "کولی شوای", f: "kawúley shwaay" }, { p: "کولی شوی", f: "kawúley shwey" }, { p: "کولای شوای", f: "kawúlaay shwaay" }], [{ p: "کولی شوای", f: "kawúley shwaay" }, { p: "کولی شوی", f: "kawúley shwey" }, { p: "کولای شوای", f: "kawúlaay shwaay" }]],
            [[{ p: "کولی شوای", f: "kawúley shwaay" }, { p: "کولی شوی", f: "kawúley shwey" }, { p: "کولای شوای", f: "kawúlaay shwaay" }], [{ p: "کولی شوای", f: "kawúley shwaay" }, { p: "کولی شوی", f: "kawúley shwey" }, { p: "کولای شوای", f: "kawúlaay shwaay" }]],
            [[{ p: "کولی شوای", f: "kawúley shwaay" }, { p: "کولی شوی", f: "kawúley shwey" }, { p: "کولای شوای", f: "kawúlaay shwaay" }], [{ p: "کولی شوای", f: "kawúley shwaay" }, { p: "کولی شوی", f: "kawúley shwey" }, { p: "کولای شوای", f: "kawúlaay shwaay" }]],
            [[{ p: "کولی شوای", f: "kawúley shwaay" }, { p: "کولی شوی", f: "kawúley shwey" }, { p: "کولای شوای", f: "kawúlaay shwaay" }], [{ p: "کولی شوای", f: "kawúley shwaay" }, { p: "کولی شوی", f: "kawúley shwey" }, { p: "کولای شوای", f: "kawúlaay shwaay" }]],
            [[{ p: "کولی شوای", f: "kawúley shwaay" }, { p: "کولی شوی", f: "kawúley shwey" }, { p: "کولای شوای", f: "kawúlaay shwaay" }], [{ p: "کولی شوای", f: "kawúley shwaay" }, { p: "کولی شوی", f: "kawúley shwey" }, { p: "کولای شوای", f: "kawúlaay shwaay" }]],
        ],
        short: [
            [[{ p: "کوی شوای", f: "kawéy shwaay" }, { p: "کوی شوی", f: "kawéy shwey" }, { p: "کوای شوای", f: "kawáay shwaay" }], [{ p: "کوی شوای", f: "kawéy shwaay" }, { p: "کوی شوی", f: "kawéy shwey" }, { p: "کوای شوای", f: "kawáay shwaay" }]],
            [[{ p: "کوی شوای", f: "kawéy shwaay" }, { p: "کوی شوی", f: "kawéy shwey" }, { p: "کوای شوای", f: "kawáay shwaay" }], [{ p: "کوی شوای", f: "kawéy shwaay" }, { p: "کوی شوی", f: "kawéy shwey" }, { p: "کوای شوای", f: "kawáay shwaay" }]],
            [[{ p: "کوی شوای", f: "kawéy shwaay" }, { p: "کوی شوی", f: "kawéy shwey" }, { p: "کوای شوای", f: "kawáay shwaay" }], [{ p: "کوی شوای", f: "kawéy shwaay" }, { p: "کوی شوی", f: "kawéy shwey" }, { p: "کوای شوای", f: "kawáay shwaay" }]],
            [[{ p: "کوی شوای", f: "kawéy shwaay" }, { p: "کوی شوی", f: "kawéy shwey" }, { p: "کوای شوای", f: "kawáay shwaay" }], [{ p: "کوی شوای", f: "kawéy shwaay" }, { p: "کوی شوی", f: "kawéy shwey" }, { p: "کوای شوای", f: "kawáay shwaay" }]],
            [[{ p: "کوی شوای", f: "kawéy shwaay" }, { p: "کوی شوی", f: "kawéy shwey" }, { p: "کوای شوای", f: "kawáay shwaay" }], [{ p: "کوی شوای", f: "kawéy shwaay" }, { p: "کوی شوی", f: "kawéy shwey" }, { p: "کوای شوای", f: "kawáay shwaay" }]],
            [[{ p: "کوی شوای", f: "kawéy shwaay" }, { p: "کوی شوی", f: "kawéy shwey" }, { p: "کوای شوای", f: "kawáay shwaay" }], [{ p: "کوی شوای", f: "kawéy shwaay" }, { p: "کوی شوی", f: "kawéy shwey" }, { p: "کوای شوای", f: "kawáay shwaay" }]],
        ],
    },
};

const kawulPerfect: T.PerfectContent = {
    halfPerfect: [
        [[{p: "کړی", f: "kúRey"}], [{p: "کړي", f: "kúRee"}]],
        [[{p: "کړې", f: "kúRe"}], [{p: "کړې", f: "kúRe"}]],
        [[{p: "کړی", f: "kúRey"}], [{p: "کړي", f: "kúRee"}]],
        [[{p: "کړې", f: "kúRe"}], [{p: "کړې", f: "kúRe"}]],
        [[{p: "کړی", f: "kúRey"}], [{p: "کړي", f: "kúRee"}]],
        [[{p: "کړې", f: "kúRe"}], [{p: "کړې", f: "kúRe"}]],
    ],
    past: [
        [[{p: "کړی وم", f: "kúRey wum"}], [{p: "کړي وو", f: "kúRee woo"}]],
        [[{p: "کړې وم", f: "kúRe wum"}], [{p: "کړې وو", f: "kúRe woo"}]],
        [[{p: "کړی وې", f: "kúRey we"}], [{p: "کړي وئ", f: "kúRee weyy"}]],
        [[{p: "کړې وې", f: "kúRe we"}], [{p: "کړې وئ", f: "kúRe weyy"}]],
        [[{p: "کړی و", f: "kúRey wo"}], [{p: "کړي وو", f: "kúRee woo"}]],
        [[{p: "کړې وه", f: "kúRe wa"}], [{p: "کړې وې", f: "kúRe we"}]],
    ],
    present: [
        [[{p: "کړی یم", f: "kúRey yum"}], [{p: "کړي یو", f: "kúRee yoo"}]],
        [[{p: "کړې یم", f: "kúRe yum"}], [{p: "کړې یو", f: "kúRe yoo"}]],
        [[{p: "کړی یې", f: "kúRey ye"}], [{p: "کړي یئ", f: "kúRee yeyy"}]],
        [[{p: "کړې یې", f: "kúRe ye"}], [{p: "کړې یئ", f: "kúRe yeyy"}]],
        [[{p: "کړی دی", f: "kúRey dey"}], [{p: "کړي دي", f: "kúRee dee"}]],
        [[{p: "کړې ده", f: "kúRe da"}], [{p: "کړې دي", f: "kúRe dee"}]],
    ],
    habitual: [
        [[{p: "کړی یم", f: "kúRey yum"}], [{p: "کړي یو", f: "kúRee yoo"}]],
        [[{p: "کړې یم", f: "kúRe yum"}], [{p: "کړې یو", f: "kúRe yoo"}]],
        [[{p: "کړی یې", f: "kúRey ye"}], [{p: "کړي یئ", f: "kúRee yeyy"}]],
        [[{p: "کړې یې", f: "kúRe ye"}], [{p: "کړې یئ", f: "kúRe yeyy"}]],
        [[{p: "کړی وي", f: "kúRey wee"}], [{p: "کړي وي", f: "kúRee wee"}]],
        [[{p: "کړې وي", f: "kúRe wee"}], [{p: "کړې وي", f: "kúRe wee"}]],
    ],
    subjunctive: [
        [[{p: "کړی وم", f: "kúRey wum"}], [{p: "کړي وو", f: "kúRee woo"}]],
        [[{p: "کړې وم", f: "kúRe wum"}], [{p: "کړې وو", f: "kúRe woo"}]],
        [[{p: "کړی وې", f: "kúRey we"}], [{p: "کړي وئ", f: "kúRee weyy"}]],
        [[{p: "کړې وې", f: "kúRe we"}], [{p: "کړې وئ", f: "kúRe weyy"}]],
        [[{p: "کړی وي", f: "kúRey wee"}], [{p: "کړي وي", f: "kúRee wee"}]],
        [[{p: "کړې وي", f: "kúRe wee"}], [{p: "کړې وي", f: "kúRe wee"}]],
    ],
    future: [
        [[{p: "به کړی یم", f: "ba kúRey yum"}], [{p: "به کړي یو", f: "ba kúRee yoo"}]],
        [[{p: "به کړې یم", f: "ba kúRe yum"}], [{p: "به کړې یو", f: "ba kúRe yoo"}]],
        [[{p: "به کړی یې", f: "ba kúRey ye"}], [{p: "به کړي یئ", f: "ba kúRee yeyy"}]],
        [[{p: "به کړې یې", f: "ba kúRe ye"}], [{p: "به کړې یئ", f: "ba kúRe yeyy"}]],
        [[{p: "به کړی وي", f: "ba kúRey wee"}], [{p: "به کړي وي", f: "ba kúRee wee"}]],
        [[{p: "به کړې وي", f: "ba kúRe wee"}], [{p: "به کړې وي", f: "ba kúRe wee"}]],
    ],
    affirmational: [
        [[{p: "به کړی وم", f: "ba kúRey wum"}], [{p: "به کړي وو", f: "ba kúRee woo"}]],
        [[{p: "به کړې وم", f: "ba kúRe wum"}], [{p: "به کړې وو", f: "ba kúRe woo"}]],
        [[{p: "به کړی وې", f: "ba kúRey we"}], [{p: "به کړي وئ", f: "ba kúRee weyy"}]],
        [[{p: "به کړې وې", f: "ba kúRe we"}], [{p: "به کړې وئ", f: "ba kúRe weyy"}]],
        [[{p: "به کړی و", f: "ba kúRey wo"}], [{p: "به کړي وو", f: "ba kúRee woo"}]],
        [[{p: "به کړې وه", f: "ba kúRe wa"}], [{p: "به کړې وې", f: "ba kúRe we"}]],
    ],
    pastSubjunctiveHypothetical: [
        [[{p: "کړی وای", f: "kúRey waay"}, {p: "کړی وی", f: "kúRey wey"}], [{p: "کړی وای", f: "kúRey waay"}, {p: "کړی وی", f: "kúRey wey"}]], 
        [[{p: "کړې وای", f: "kúRe waay"}, {p: "کړې وی", f: "kúRe wey"}], [{p: "کړې وای", f: "kúRe waay"}, {p: "کړې وی", f: "kúRe wey"}]],
        [[{p: "کړی وای", f: "kúRey waay"}, {p: "کړی وی", f: "kúRey wey"}], [{p: "کړی وای", f: "kúRey waay"}, {p: "کړی وی", f: "kúRey wey"}]], 
        [[{p: "کړې وای", f: "kúRe waay"}, {p: "کړې وی", f: "kúRe wey"}], [{p: "کړې وای", f: "kúRe waay"}, {p: "کړې وی", f: "kúRe wey"}]],
        [[{p: "کړی وای", f: "kúRey waay"}, {p: "کړی وی", f: "kúRey wey"}], [{p: "کړی وای", f: "kúRey waay"}, {p: "کړی وی", f: "kúRey wey"}]], 
        [[{p: "کړې وای", f: "kúRe waay"}, {p: "کړې وی", f: "kúRe wey"}], [{p: "کړې وای", f: "kúRe waay"}, {p: "کړې وی", f: "kúRe wey"}]],
    ],
};

const kawulHypothetical: T.VerbForm = {
    short: [
        [[{ p: "کوای", f: "kawaay" }, { p: "کوی", f: "kawéy" }], [{ p: "کوای", f: "kawaay" }, { p: "کوی", f: "kawéy" }]],
        [[{ p: "کوای", f: "kawaay" }, { p: "کوی", f: "kawéy" }], [{ p: "کوای", f: "kawaay" }, { p: "کوی", f: "kawéy" }]],
        [[{ p: "کوای", f: "kawaay" }, { p: "کوی", f: "kawéy" }], [{ p: "کوای", f: "kawaay" }, { p: "کوی", f: "kawéy" }]],
        [[{ p: "کوای", f: "kawaay" }, { p: "کوی", f: "kawéy" }], [{ p: "کوای", f: "kawaay" }, { p: "کوی", f: "kawéy" }]],
        [[{ p: "کوای", f: "kawaay" }, { p: "کوی", f: "kawéy" }], [{ p: "کوای", f: "kawaay" }, { p: "کوی", f: "kawéy" }]],
        [[{ p: "کوای", f: "kawaay" }, { p: "کوی", f: "kawéy" }], [{ p: "کوای", f: "kawaay" }, { p: "کوی", f: "kawéy" }]],
    ],
    long: [
        [[{ p: "کولای", f: "kawúlaay" }, { p: "کولی", f: "kawúley" }], [{ p: "کولای", f: "kawúlaay" }, { p: "کولی", f: "kawúley" }]],
        [[{ p: "کولای", f: "kawúlaay" }, { p: "کولی", f: "kawúley" }], [{ p: "کولای", f: "kawúlaay" }, { p: "کولی", f: "kawúley" }]],
        [[{ p: "کولای", f: "kawúlaay" }, { p: "کولی", f: "kawúley" }], [{ p: "کولای", f: "kawúlaay" }, { p: "کولی", f: "kawúley" }]],
        [[{ p: "کولای", f: "kawúlaay" }, { p: "کولی", f: "kawúley" }], [{ p: "کولای", f: "kawúlaay" }, { p: "کولی", f: "kawúley" }]],
        [[{ p: "کولای", f: "kawúlaay" }, { p: "کولی", f: "kawúley" }], [{ p: "کولای", f: "kawúlaay" }, { p: "کولی", f: "kawúley" }]],
        [[{ p: "کولای", f: "kawúlaay" }, { p: "کولی", f: "kawúley" }], [{ p: "کولای", f: "kawúlaay" }, { p: "کولی", f: "kawúley" }]],
    ],
};

export const kawulStat: T.VerbConjugation = {
    info: {
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
            present: { p: "کوونکی", f: "kawóonkey" },
            past: { p: "کړی", f: "kúRey" },
        },
        idiosyncraticThirdMascSing: {
            perfective: { p: "کړ", f: "kuR" },
            imperfective: { p: "کاوه", f: "kaawú" },
        }, 
    },
    imperfective: {
        nonImperative: [
            [[{p: "کوم", f: "kawum"}], [{p: "کوو", f: "kawoo"}]],
            [[{p: "کوم", f: "kawum"}], [{p: "کوو", f: "kawoo"}]],
            [[{p: "کوې", f: "kawe"}], [{p: "کوئ", f: "kaweyy"}]],
            [[{p: "کوې", f: "kawe"}], [{p: "کوئ", f: "kaweyy"}]],
            [[{p: "کوي", f: "kawee"}], [{p: "کوي", f: "kawee"}]],
            [[{p: "کوي", f: "kawee"}], [{p: "کوي", f: "kawee"}]],
        ],
        future: [
            [[{p: "به کوم", f: "ba kawum"}], [{p: "به کوو", f: "ba kawoo"}]],
            [[{p: "به کوم", f: "ba kawum"}], [{p: "به کوو", f: "ba kawoo"}]],
            [[{p: "به کوې", f: "ba kawe"}], [{p: "به کوئ", f: "ba kaweyy"}]],
            [[{p: "به کوې", f: "ba kawe"}], [{p: "به کوئ", f: "ba kaweyy"}]],
            [[{p: "به کوي", f: "ba kawee"}], [{p: "به کوي", f: "ba kawee"}]],
            [[{p: "به کوي", f: "ba kawee"}], [{p: "به کوي", f: "ba kawee"}]],
        ],
        imperative: [
            [[{ p: "کوه", f: "kawá" }], [{ p: "کوئ", f: "kawéyy" }]],
            [[{ p: "کوه", f: "kawá" }], [{ p: "کوئ", f: "kawéyy" }]]
        ],
        past: {
            short: [
                [[{p: "کوم", f: "kawum"}], [{p: "کوو", f: "kawoo"}]],
                [[{p: "کوم", f: "kawum"}], [{p: "کوو", f: "kawoo"}]],
                [[{p: "کوې", f: "kawe"}], [{p: "کوئ", f: "kaweyy"}]],
                [[{p: "کوې", f: "kawe"}], [{p: "کوئ", f: "kaweyy"}]],
                [[{p: "کاوه", f: "kaawu"}], [{p: "کول", f: "kawul"}]],
                [[{p: "کوه", f: "kawa"}], [{p: "کوې", f: "kawe"}]],
            ],
            long: [
                [[{p: "کولم", f: "kawulum"}], [{p: "کولو", f: "kawuloo"}]],
                [[{p: "کولم", f: "kawulum"}], [{p: "کولو", f: "kawuloo"}]],
                [[{p: "کولې", f: "kawule"}], [{p: "کولئ", f: "kawuleyy"}]],
                [[{p: "کولې", f: "kawule"}], [{p: "کولئ", f: "kawuleyy"}]],
                [[{p: "کوله", f: "kawulu"}, {p: "کولو", f: "kawulo"}], [{p: "کول", f: "kawul"}]],
                [[{p: "کوله", f: "kawula"}], [{p: "کولې", f: "kawule"}]],
            ],
        },
        habitualPast: {
            short: [
                [[{p: "به کوم", f: "ba kawum"}], [{p: "به کوو", f: "ba kawoo"}]],
                [[{p: "به کوم", f: "ba kawum"}], [{p: "به کوو", f: "ba kawoo"}]],
                [[{p: "به کوې", f: "ba kawe"}], [{p: "به کوئ", f: "ba kaweyy"}]],
                [[{p: "به کوې", f: "ba kawe"}], [{p: "به کوئ", f: "ba kaweyy"}]],
                [[{p: "به کاوه", f: "ba kaawu"}], [{p: "به کول", f: "ba kawul"}]],
                [[{p: "به کوه", f: "ba kawa"}], [{p: "به کوې", f: "ba kawe"}]],
            ],
            long: [
                [[{p: "به کولم", f: "ba kawulum"}], [{p: "به کولو", f: "ba kawuloo"}]],
                [[{p: "به کولم", f: "ba kawulum"}], [{p: "به کولو", f: "ba kawuloo"}]],
                [[{p: "به کولې", f: "ba kawule"}], [{p: "به کولئ", f: "ba kawuleyy"}]],
                [[{p: "به کولې", f: "ba kawule"}], [{p: "به کولئ", f: "ba kawuleyy"}]],
                [[{p: "به کوله", f: "ba kawulu"}, {p: "به کولو", f: "ba kawulo"}], [{p: "به کول", f: "ba kawul"}]],
                [[{p: "به کوله", f: "ba kawula"}], [{p: "به کولې", f: "ba kawule"}]],
            ],
        },
        modal: kawulImperfectiveModal,
    },
    perfective: {
        nonImperative: {
            long: [
                [[{p: "کړم", f: "kRum"}], [{p: "کړو", f: "kRoo"}]],
                [[{p: "کړم", f: "kRum"}], [{p: "کړو", f: "kRoo"}]],
                [[{p: "کړې", f: "kRe"}], [{p: "کړئ", f: "kReyy"}]],
                [[{p: "کړې", f: "kRe"}], [{p: "کړئ", f: "kReyy"}]],
                [[{p: "کړي", f: "kRee"}], [{p: "کړي", f: "kRee"}]],
                [[{p: "کړي", f: "kRee"}], [{p: "کړي", f: "kRee"}]],
            ],
            short: [
                [[{p: "کم", f: "kum"}], [{p: "کو", f: "koo"}]],
                [[{p: "کم", f: "kum"}], [{p: "کو", f: "koo"}]],
                [[{p: "کې", f: "ke"}], [{p: "کئ", f: "keyy"}]],
                [[{p: "کې", f: "ke"}], [{p: "کئ", f: "keyy"}]],
                [[{p: "کي", f: "kee"}], [{p: "کي", f: "kee"}]],
                [[{p: "کي", f: "kee"}], [{p: "کي", f: "kee"}]],
            ],
        },
        future: {
            long: [
                [[{p: "به کړم", f: "ba kRum"}], [{p: "به کړو", f: "ba kRoo"}]],
                [[{p: "به کړم", f: "ba kRum"}], [{p: "به کړو", f: "ba kRoo"}]],
                [[{p: "به کړې", f: "ba kRe"}], [{p: "به کړئ", f: "ba kReyy"}]],
                [[{p: "به کړې", f: "ba kRe"}], [{p: "به کړئ", f: "ba kReyy"}]],
                [[{p: "به کړي", f: "ba kRee"}], [{p: "به کړي", f: "ba kRee"}]],
                [[{p: "به کړي", f: "ba kRee"}], [{p: "به کړي", f: "ba kRee"}]],
            ],
            short: [
                [[{p: "به کم", f: "ba kum"}], [{p: "به کو", f: "ba koo"}]],
                [[{p: "به کم", f: "ba kum"}], [{p: "به کو", f: "ba koo"}]],
                [[{p: "به کې", f: "ba ke"}], [{p: "به کئ", f: "ba keyy"}]],
                [[{p: "به کې", f: "ba ke"}], [{p: "به کئ", f: "ba keyy"}]],
                [[{p: "به کي", f: "ba kee"}], [{p: "به کي", f: "ba kee"}]],
                [[{p: "به کي", f: "ba kee"}], [{p: "به کي", f: "ba kee"}]],
            ],
        },
        imperative: {
            long: [
                [[{ p: "کړه", f: "kRa" }], [{ p: "کړئ", f: "kReyy" }]],
                [[{ p: "کړه", f: "kRa" }], [{ p: "کړئ", f: "kReyy" }]]
            ],
            short: [
                [[{ p: "که", f: "ka" }], [{ p: "کئ", f: "keyy" }]],
                [[{ p: "که", f: "ka" }], [{ p: "کئ", f: "keyy" }]],
            ],
        },
        past: {
            mini: [
                [[{p: "کم", f: "kum"}], [{p: "کو", f: "koo"}]],
                [[{p: "کم", f: "kum"}], [{p: "کو", f: "koo"}]],
                [[{p: "کې", f: "ke"}], [{p: "کئ", f: "keyy"}]],
                [[{p: "کې", f: "ke"}], [{p: "کئ", f: "keyy"}]],
                [[{p: "که", f: "ku"}, {p: "کو", f: "ko"}], [{p: "کړل", f: "kRul"}, { p: "کو", f: "koo" }]],
                [[{p: "که", f: "ka"}], [{p: "کې", f: "ke"}]],
            ],
            short: [
                [[{p: "کړم", f: "kRum"}], [{p: "کړو", f: "kRoo"}]],
                [[{p: "کړم", f: "kRum"}], [{p: "کړو", f: "kRoo"}]],
                [[{p: "کړې", f: "kRe"}], [{p: "کړئ", f: "kReyy"}]],
                [[{p: "کړې", f: "kRe"}], [{p: "کړئ", f: "kReyy"}]],
                [[{p: "کړه", f: "kRu"}, {p: "کړو", f: "kRo"}, {p: "کړ", f: "kuR"}], [{p: "کړل", f: "kRul"}, {p: "کړو", f: "kRoo" }]],
                [[{p: "کړه", f: "kRa"}], [{p: "کړې", f: "kRe"}]],
            ],
            long: [
                [[{p: "کړلم", f: "kRulum"}], [{p: "کړلو", f: "kRuloo"}]],
                [[{p: "کړلم", f: "kRulum"}], [{p: "کړلو", f: "kRuloo"}]],
                [[{p: "کړلې", f: "kRule"}], [{p: "کړلئ", f: "kRuleyy"}]],
                [[{p: "کړلې", f: "kRule"}], [{p: "کړلئ", f: "kRuleyy"}]],
                [[{p: "کړله", f: "kRulu"}, {p: "کړلو", f: "kRulo"}], [{p: "کړل", f: "kRul"}, {p: "کړلو", f: "kRuloo"}]],
                [[{p: "کړله", f: "kRula"}], [{p: "کړلې", f: "kRule"}]],
            ],
        },
        habitualPast: {
            mini: [
                [[{p: "به کم", f: "ba kum"}], [{p: "به کو", f: "ba koo"}]],
                [[{p: "به کم", f: "ba kum"}], [{p: "به کو", f: "ba koo"}]],
                [[{p: "به کې", f: "ba ke"}], [{p: "به کئ", f: "ba keyy"}]],
                [[{p: "به کې", f: "ba ke"}], [{p: "به کئ", f: "ba keyy"}]],
                [[{p: "به که", f: "ba ku"}, {p: "به کو", f: "ba ko"}], [{p: "به کړل", f: "ba kRul"}, { p: "به کو", f: "ba koo" }]],
                [[{p: "به که", f: "ba ka"}], [{p: "به کې", f: "ba ke"}]],
            ],
            short: [
                [[{p: "به کړم", f: "ba kRum"}], [{p: "به کړو", f: "ba kRoo"}]],
                [[{p: "به کړم", f: "ba kRum"}], [{p: "به کړو", f: "ba kRoo"}]],
                [[{p: "به کړې", f: "ba kRe"}], [{p: "به کړئ", f: "ba kReyy"}]],
                [[{p: "به کړې", f: "ba kRe"}], [{p: "به کړئ", f: "ba kReyy"}]],
                [[{p: "به کړه", f: "ba kRu"}, {p: "به کړو", f: "ba kRo"}, {p: "به کړ", f: "ba kuR"}], [{p: "به کړل", f: "ba kRul"}, {p: "به کړو", f: "ba kRoo" }]],
                [[{p: "به کړه", f: "ba kRa"}], [{p: "به کړې", f: "ba kRe"}]],
            ],
            long: [
                [[{p: "به کړلم", f: "ba kRulum"}], [{p: "به کړلو", f: "ba kRuloo"}]],
                [[{p: "به کړلم", f: "ba kRulum"}], [{p: "به کړلو", f: "ba kRuloo"}]],
                [[{p: "به کړلې", f: "ba kRule"}], [{p: "به کړلئ", f: "ba kRuleyy"}]],
                [[{p: "به کړلې", f: "ba kRule"}], [{p: "به کړلئ", f: "ba kRuleyy"}]],
                [[{p: "به کړله", f: "ba kRulu"}, {p: "به کړلو", f: "ba kRulo"}], [{p: "به کړل", f: "ba kRul"}, {p: "به کړلو", f: "ba kRuloo"}]],
                [[{p: "به کړله", f: "ba kRula"}], [{p: "به کړلې", f: "ba kRule"}]],
            ],
        },
        modal: {
            nonImperative: {
                long: [
                    [[{ p: "کړلی شم", f: "kRúley shum" }, { p: "کړلای شم", f: "kRúlaay shum" }], [{ p: "کړلی شو", f: "kRúley shoo" }, { p: "کړلای شو", f: "kRúlaay shoo" }]],
                    [[{ p: "کړلی شم", f: "kRúley shum" }, { p: "کړلای شم", f: "kRúlaay shum" }], [{ p: "کړلی شو", f: "kRúley shoo" }, { p: "کړلای شو", f: "kRúlaay shoo" }]],
                    [[{ p: "کړلی شې", f: "kRúley she" }, { p: "کړلای شې", f: "kRúlaay she" }], [{ p: "کړلی شئ", f: "kRúley sheyy" }, { p: "کړلای شئ", f: "kRúlaay sheyy" }]],
                    [[{ p: "کړلی شې", f: "kRúley she" }, { p: "کړلای شې", f: "kRúlaay she" }], [{ p: "کړلی شئ", f: "kRúley sheyy" }, { p: "کړلای شئ", f: "kRúlaay sheyy" }]],
                    [[{ p: "کړلی شي", f: "kRúley shee" }, { p: "کړلای شي", f: "kRúlaay shee" }], [{ p: "کړلی شي", f: "kRúley shee" }, { p: "کړلای شي", f: "kRúlaay shee" }]],
                    [[{ p: "کړلی شي", f: "kRúley shee" }, { p: "کړلای شي", f: "kRúlaay shee" }], [{ p: "کړلی شي", f: "kRúley shee" }, { p: "کړلای شي", f: "kRúlaay shee" }]],
                ],
                short: [
                    [[{ p: "کړی شم", f: "kRéy shum" }, { p: "کړای شم", f: "kRáay shum" }], [{ p: "کړی شو", f: "kRéy shoo" }, { p: "کړای شو", f: "kRáay shoo" }]],
                    [[{ p: "کړی شم", f: "kRéy shum" }, { p: "کړای شم", f: "kRáay shum" }], [{ p: "کړی شو", f: "kRéy shoo" }, { p: "کړای شو", f: "kRáay shoo" }]],
                    [[{ p: "کړی شې", f: "kRéy she" }, { p: "کړای شې", f: "kRáay she" }], [{ p: "کړی شئ", f: "kRéy sheyy" }, { p: "کړای شئ", f: "kRáay sheyy" }]],
                    [[{ p: "کړی شې", f: "kRéy she" }, { p: "کړای شې", f: "kRáay she" }], [{ p: "کړی شئ", f: "kRéy sheyy" }, { p: "کړای شئ", f: "kRáay sheyy" }]],
                    [[{ p: "کړی شي", f: "kRéy shee" }, { p: "کړای شي", f: "kRáay shee" }], [{ p: "کړی شي", f: "kRéy shee" }, { p: "کړای شي", f: "kRáay shee" }]],
                    [[{ p: "کړی شي", f: "kRéy shee" }, { p: "کړای شي", f: "kRáay shee" }], [{ p: "کړی شي", f: "kRéy shee" }, { p: "کړای شي", f: "kRáay shee" }]],
                ],
            },
            future: {
                long: [
                    [[{ p: "به کړلی شم", f: "ba kRúley shum" }, { p: "به کړلای شم", f: "ba kRúlaay shum" }], [{ p: "به کړلی شو", f: "ba kRúley shoo" }, { p: "به کړلای شو", f: "ba kRúlaay shoo" }]],
                    [[{ p: "به کړلی شم", f: "ba kRúley shum" }, { p: "به کړلای شم", f: "ba kRúlaay shum" }], [{ p: "به کړلی شو", f: "ba kRúley shoo" }, { p: "به کړلای شو", f: "ba kRúlaay shoo" }]],
                    [[{ p: "به کړلی شې", f: "ba kRúley she" }, { p: "به کړلای شې", f: "ba kRúlaay she" }], [{ p: "به کړلی شئ", f: "ba kRúley sheyy" }, { p: "به کړلای شئ", f: "ba kRúlaay sheyy" }]],
                    [[{ p: "به کړلی شې", f: "ba kRúley she" }, { p: "به کړلای شې", f: "ba kRúlaay she" }], [{ p: "به کړلی شئ", f: "ba kRúley sheyy" }, { p: "به کړلای شئ", f: "ba kRúlaay sheyy" }]],
                    [[{ p: "به کړلی شي", f: "ba kRúley shee" }, { p: "به کړلای شي", f: "ba kRúlaay shee" }], [{ p: "به کړلی شي", f: "ba kRúley shee" }, { p: "به کړلای شي", f: "ba kRúlaay shee" }]],
                    [[{ p: "به کړلی شي", f: "ba kRúley shee" }, { p: "به کړلای شي", f: "ba kRúlaay shee" }], [{ p: "به کړلی شي", f: "ba kRúley shee" }, { p: "به کړلای شي", f: "ba kRúlaay shee" }]],
                ],
                short: [
                    [[{ p: "به کړی شم", f: "ba kRéy shum" }, { p: "به کړای شم", f: "ba kRáay shum" }], [{ p: "به کړی شو", f: "ba kRéy shoo" }, { p: "به کړای شو", f: "ba kRáay shoo" }]],
                    [[{ p: "به کړی شم", f: "ba kRéy shum" }, { p: "به کړای شم", f: "ba kRáay shum" }], [{ p: "به کړی شو", f: "ba kRéy shoo" }, { p: "به کړای شو", f: "ba kRáay shoo" }]],
                    [[{ p: "به کړی شې", f: "ba kRéy she" }, { p: "به کړای شې", f: "ba kRáay she" }], [{ p: "به کړی شئ", f: "ba kRéy sheyy" }, { p: "به کړای شئ", f: "ba kRáay sheyy" }]],
                    [[{ p: "به کړی شې", f: "ba kRéy she" }, { p: "به کړای شې", f: "ba kRáay she" }], [{ p: "به کړی شئ", f: "ba kRéy sheyy" }, { p: "به کړای شئ", f: "ba kRáay sheyy" }]],
                    [[{ p: "به کړی شي", f: "ba kRéy shee" }, { p: "به کړای شي", f: "ba kRáay shee" }], [{ p: "به کړی شي", f: "ba kRéy shee" }, { p: "به کړای شي", f: "ba kRáay shee" }]],
                    [[{ p: "به کړی شي", f: "ba kRéy shee" }, { p: "به کړای شي", f: "ba kRáay shee" }], [{ p: "به کړی شي", f: "ba kRéy shee" }, { p: "به کړای شي", f: "ba kRáay shee" }]],
                ],
            },
            past: {
                long: [
                    [[{ p: "کړلی شوم", f: "kRúley shwum" }, { p: "کړلای شوم", f: "kRúlaay shwum" }], [{ p: "کړلی شو", f: "kRúley shoo" }, { p: "کړلای شو", f: "kRúlaay shoo" }]],
                    [[{ p: "کړلی شوم", f: "kRúley shwum" }, { p: "کړلای شوم", f: "kRúlaay shwum" }], [{ p: "کړلی شو", f: "kRúley shoo" }, { p: "کړلای شو", f: "kRúlaay shoo" }]],
                    [[{ p: "کړلی شوې", f: "kRúley shwe" }, { p: "کړلای شوې", f: "kRúlaay shwe" }], [{ p: "کړلی شوئ", f: "kRúley shweyy" }, { p: "کړلای شوئ", f: "kRúlaay shweyy" }]],
                    [[{ p: "کړلی شوې", f: "kRúley shwe" }, { p: "کړلای شوې", f: "kRúlaay shwe" }], [{ p: "کړلی شوئ", f: "kRúley shweyy" }, { p: "کړلای شوئ", f: "kRúlaay shweyy" }]],
                    [[{ p: "کړلی شو", f: "kRúley sho" }, { p: "کړلای شو", f: "kRúlaay sho" }], [{ p: "کړلی شول", f: "kRúley shwul" }, { p: "کړلای شول", f: "kRúlaay shwul" }, { p: "کړلی شو", f: "kRúley shoo" }, { p: "کړلای شو", f: "kRúlaay shoo" }]],
                    [[{ p: "کړلی شوه", f: "kRúley shwa" }, { p: "کړلای شوه", f: "kRúlaay shwa" }], [{ p: "کړلی شولې", f: "kRúley shwule" }, { p: "کړلای شولې", f: "kRúlaay shwule" }, { p: "کړلی شوې", f: "kRúley shwe" }, { p: "کړلای شوې", f: "kRúlaay shwe" }]],
                ],
                short: [
                    [[{ p: "کړی شوم", f: "kRéy shwum" }, { p: "کړای شوم", f: "kRáay shwum" }], [{ p: "کړی شو", f: "kRéy shoo" }, { p: "کړای شو", f: "kRáay shoo" }]],
                    [[{ p: "کړی شوم", f: "kRéy shwum" }, { p: "کړای شوم", f: "kRáay shwum" }], [{ p: "کړی شو", f: "kRéy shoo" }, { p: "کړای شو", f: "kRáay shoo" }]],
                    [[{ p: "کړی شوې", f: "kRéy shwe" }, { p: "کړای شوې", f: "kRáay shwe" }], [{ p: "کړی شوئ", f: "kRéy shweyy" }, { p: "کړای شوئ", f: "kRáay shweyy" }]],
                    [[{ p: "کړی شوې", f: "kRéy shwe" }, { p: "کړای شوې", f: "kRáay shwe" }], [{ p: "کړی شوئ", f: "kRéy shweyy" }, { p: "کړای شوئ", f: "kRáay shweyy" }]],
                    [[{ p: "کړی شو", f: "kRéy sho" }, { p: "کړای شو", f: "kRáay sho" }], [{ p: "کړی شول", f: "kRéy shwul" }, { p: "کړای شول", f: "kRáay shwul" }, { p: "کړی شو", f: "kRéy shoo" }, { p: "کړای شو", f: "kRáay shoo" }]],
                    [[{ p: "کړی شوه", f: "kRéy shwa" }, { p: "کړای شوه", f: "kRáay shwa" }], [{ p: "کړی شولې", f: "kRéy shwule" }, { p: "کړای شولې", f: "kRáay shwule" }, { p: "کړی شوې", f: "kRéy shwe" }, { p: "کړای شوې", f: "kRáay shwe" }]],
                ],
            },
            habitualPast: {
                long: [
                    [[{ p: "به کړلی شوم", f: "ba kRúley shwum" }, { p: "به کړلای شوم", f: "ba kRúlaay shwum" }], [{ p: "به کړلی شو", f: "ba kRúley shoo" }, { p: "به کړلای شو", f: "ba kRúlaay shoo" }]],
                    [[{ p: "به کړلی شوم", f: "ba kRúley shwum" }, { p: "به کړلای شوم", f: "ba kRúlaay shwum" }], [{ p: "به کړلی شو", f: "ba kRúley shoo" }, { p: "به کړلای شو", f: "ba kRúlaay shoo" }]],
                    [[{ p: "به کړلی شوې", f: "ba kRúley shwe" }, { p: "به کړلای شوې", f: "ba kRúlaay shwe" }], [{ p: "به کړلی شوئ", f: "ba kRúley shweyy" }, { p: "به کړلای شوئ", f: "ba kRúlaay shweyy" }]],
                    [[{ p: "به کړلی شوې", f: "ba kRúley shwe" }, { p: "به کړلای شوې", f: "ba kRúlaay shwe" }], [{ p: "به کړلی شوئ", f: "ba kRúley shweyy" }, { p: "به کړلای شوئ", f: "ba kRúlaay shweyy" }]],
                    [[{ p: "به کړلی شو", f: "ba kRúley sho" }, { p: "به کړلای شو", f: "ba kRúlaay sho" }], [{ p: "به کړلی شول", f: "ba kRúley shwul" }, { p: "به کړلای شول", f: "ba kRúlaay shwul" }, { p: "به کړلی شو", f: "ba kRúley shoo" }, { p: "به کړلای شو", f: "ba kRúlaay shoo" }]],
                    [[{ p: "به کړلی شوه", f: "ba kRúley shwa" }, { p: "به کړلای شوه", f: "ba kRúlaay shwa" }], [{ p: "به کړلی شولې", f: "ba kRúley shwule" }, { p: "به کړلای شولې", f: "ba kRúlaay shwule" }, { p: "به کړلی شوې", f: "ba kRúley shwe" }, { p: "به کړلای شوې", f: "ba kRúlaay shwe" }]],
                ],
                short: [
                    [[{ p: "به کړی شوم", f: "ba kRéy shwum" }, { p: "به کړای شوم", f: "ba kRáay shwum" }], [{ p: "به کړی شو", f: "ba kRéy shoo" }, { p: "به کړای شو", f: "ba kRáay shoo" }]],
                    [[{ p: "به کړی شوم", f: "ba kRéy shwum" }, { p: "به کړای شوم", f: "ba kRáay shwum" }], [{ p: "به کړی شو", f: "ba kRéy shoo" }, { p: "به کړای شو", f: "ba kRáay shoo" }]],
                    [[{ p: "به کړی شوې", f: "ba kRéy shwe" }, { p: "به کړای شوې", f: "ba kRáay shwe" }], [{ p: "به کړی شوئ", f: "ba kRéy shweyy" }, { p: "به کړای شوئ", f: "ba kRáay shweyy" }]],
                    [[{ p: "به کړی شوې", f: "ba kRéy shwe" }, { p: "به کړای شوې", f: "ba kRáay shwe" }], [{ p: "به کړی شوئ", f: "ba kRéy shweyy" }, { p: "به کړای شوئ", f: "ba kRáay shweyy" }]],
                    [[{ p: "به کړی شو", f: "ba kRéy sho" }, { p: "به کړای شو", f: "ba kRáay sho" }], [{ p: "به کړی شول", f: "ba kRéy shwul" }, { p: "به کړای شول", f: "ba kRáay shwul" }, { p: "به کړی شو", f: "ba kRéy shoo" }, { p: "به کړای شو", f: "ba kRáay shoo" }]],
                    [[{ p: "به کړی شوه", f: "ba kRéy shwa" }, { p: "به کړای شوه", f: "ba kRáay shwa" }], [{ p: "به کړی شولې", f: "ba kRéy shwule" }, { p: "به کړای شولې", f: "ba kRáay shwule" }, { p: "به کړی شوې", f: "ba kRéy shwe" }, { p: "به کړای شوې", f: "ba kRáay shwe" }]],
                ],
            },
            hypotheticalPast: {
                long: [
                    [[{ p: "کړلی شوای", f: "kRúley shwaay" }, { p: "کړلی شوی", f: "kRúley shwey" }, { p: "کړلای شوای", f: "kRúlaay shwaay" }], [{ p: "کړلی شوای", f: "kRúley shwaay" }, { p: "کړلی شوی", f: "kRúley shwey" }, { p: "کړلای شوای", f: "kRúlaay shwaay" }]],
                    [[{ p: "کړلی شوای", f: "kRúley shwaay" }, { p: "کړلی شوی", f: "kRúley shwey" }, { p: "کړلای شوای", f: "kRúlaay shwaay" }], [{ p: "کړلی شوای", f: "kRúley shwaay" }, { p: "کړلی شوی", f: "kRúley shwey" }, { p: "کړلای شوای", f: "kRúlaay shwaay" }]],
                    [[{ p: "کړلی شوای", f: "kRúley shwaay" }, { p: "کړلی شوی", f: "kRúley shwey" }, { p: "کړلای شوای", f: "kRúlaay shwaay" }], [{ p: "کړلی شوای", f: "kRúley shwaay" }, { p: "کړلی شوی", f: "kRúley shwey" }, { p: "کړلای شوای", f: "kRúlaay shwaay" }]],
                    [[{ p: "کړلی شوای", f: "kRúley shwaay" }, { p: "کړلی شوی", f: "kRúley shwey" }, { p: "کړلای شوای", f: "kRúlaay shwaay" }], [{ p: "کړلی شوای", f: "kRúley shwaay" }, { p: "کړلی شوی", f: "kRúley shwey" }, { p: "کړلای شوای", f: "kRúlaay shwaay" }]],
                    [[{ p: "کړلی شوای", f: "kRúley shwaay" }, { p: "کړلی شوی", f: "kRúley shwey" }, { p: "کړلای شوای", f: "kRúlaay shwaay" }], [{ p: "کړلی شوای", f: "kRúley shwaay" }, { p: "کړلی شوی", f: "kRúley shwey" }, { p: "کړلای شوای", f: "kRúlaay shwaay" }]],
                    [[{ p: "کړلی شوای", f: "kRúley shwaay" }, { p: "کړلی شوی", f: "kRúley shwey" }, { p: "کړلای شوای", f: "kRúlaay shwaay" }], [{ p: "کړلی شوای", f: "kRúley shwaay" }, { p: "کړلی شوی", f: "kRúley shwey" }, { p: "کړلای شوای", f: "kRúlaay shwaay" }]],
                ],
                short: [
                    [[{ p: "کړی شوای", f: "kRéy shwaay" }, { p: "کړی شوی", f: "kRéy shwey" }, { p: "کړای شوای", f: "kRáay shwaay" }], [{ p: "کړی شوای", f: "kRéy shwaay" }, { p: "کړی شوی", f: "kRéy shwey" }, { p: "کړای شوای", f: "kRáay shwaay" }]],
                    [[{ p: "کړی شوای", f: "kRéy shwaay" }, { p: "کړی شوی", f: "kRéy shwey" }, { p: "کړای شوای", f: "kRáay shwaay" }], [{ p: "کړی شوای", f: "kRéy shwaay" }, { p: "کړی شوی", f: "kRéy shwey" }, { p: "کړای شوای", f: "kRáay shwaay" }]],
                    [[{ p: "کړی شوای", f: "kRéy shwaay" }, { p: "کړی شوی", f: "kRéy shwey" }, { p: "کړای شوای", f: "kRáay shwaay" }], [{ p: "کړی شوای", f: "kRéy shwaay" }, { p: "کړی شوی", f: "kRéy shwey" }, { p: "کړای شوای", f: "kRáay shwaay" }]],
                    [[{ p: "کړی شوای", f: "kRéy shwaay" }, { p: "کړی شوی", f: "kRéy shwey" }, { p: "کړای شوای", f: "kRáay shwaay" }], [{ p: "کړی شوای", f: "kRéy shwaay" }, { p: "کړی شوی", f: "kRéy shwey" }, { p: "کړای شوای", f: "kRáay shwaay" }]],
                    [[{ p: "کړی شوای", f: "kRéy shwaay" }, { p: "کړی شوی", f: "kRéy shwey" }, { p: "کړای شوای", f: "kRáay shwaay" }], [{ p: "کړی شوای", f: "kRéy shwaay" }, { p: "کړی شوی", f: "kRéy shwey" }, { p: "کړای شوای", f: "kRáay shwaay" }]],
                    [[{ p: "کړی شوای", f: "kRéy shwaay" }, { p: "کړی شوی", f: "kRéy shwey" }, { p: "کړای شوای", f: "kRáay shwaay" }], [{ p: "کړی شوای", f: "kRéy shwaay" }, { p: "کړی شوی", f: "kRéy shwey" }, { p: "کړای شوای", f: "kRáay shwaay" }]],
                ],
            },
        },
    },
    passive: {
        imperfective: kawulStatOrDynImperfectivePassive,
        perfective: {
            nonImperative: [
                [[{p: "وکړل شم", f: "óokRul shum"}], [{p: "وکړل شو", f: "óokRul shoo"}]],
                [[{p: "وکړل شم", f: "óokRul shum"}], [{p: "وکړل شو", f: "óokRul shoo"}]],
                [[{p: "وکړل شې", f: "óokRul she"}], [{p: "وکړل شئ", f: "óokRul sheyy"}]],
                [[{p: "وکړل شې", f: "óokRul she"}], [{p: "وکړل شئ", f: "óokRul sheyy"}]],
                [[{p: "وکړل شي", f: "óokRul shee"}], [{p: "وکړل شي", f: "óokRul shee"}]],
                [[{p: "وکړل شي", f: "óokRul shee"}], [{p: "وکړل شي", f: "óokRul shee"}]],
            ],
            future: [
                [[{p: "به وکړل شم", f: "ba óokRul shum"}], [{p: "به وکړل شو", f: "ba óokRulshoo"}]],
                [[{p: "به وکړل شم", f: "ba óokRul shum"}], [{p: "به وکړل شو", f: "ba óokRulshoo"}]],
                [[{p: "به وکړل شې", f: "ba óokRul she"}], [{p: "به وکړل شئ", f: "ba óokRulsheyy"}]],
                [[{p: "به وکړل شې", f: "ba óokRul she"}], [{p: "به وکړل شئ", f: "ba óokRulsheyy"}]],
                [[{p: "به وکړل شي", f: "ba óokRul shee"}], [{p: "به وکړل شي", f: "ba óokRulshee"}]],
                [[{p: "به وکړل شي", f: "ba óokRul shee"}], [{p: "به وکړل شي", f: "ba óokRulshee"}]],
            ],
            past: {
                short: [
                    [[{p: "وکړل شوم", f: "óokRul shwum"}], [{p: "وکړل شو", f: "óokRul shoo"}]],
                    [[{p: "وکړل شوم", f: "óokRul shwum"}], [{p: "وکړل شو", f: "óokRul shoo"}]],
                    [[{p: "وکړل شوې", f: "óokRul shwe"}], [{p: "وکړل شوئ", f: "óokRul shweyy"}]],
                    [[{p: "وکړل شوې", f: "óokRul shwe"}], [{p: "وکړل شوئ", f: "óokRul shweyy"}]],
                    [[{p: "وکړل شو", f: "óokRul sho"}], [{p: "وکړل شو", f: "óokRul shoo"}, {p: "وکړل شول", f: "óokRul shwul"}]],
                    [[{p: "وکړل شوه", f: "óokRul shwa"}], [{p: "وکړل شوې", f: "óokRul shwe"}]],
                ],
                long: [
                    [[{p: "وکړل شولم", f: "óokRul shwulum"}], [{p: "وکړل شولو", f: "óokRul shwuloo"}]],
                    [[{p: "وکړل شولم", f: "óokRul shwulum"}], [{p: "وکړل شولو", f: "óokRul shwuloo"}]],
                    [[{p: "وکړل شولې", f: "óokRul shwule"}], [{p: "وکړل شولئ", f: "óokRul shwuleyy"}]],
                    [[{p: "وکړل شولې", f: "óokRul shwule"}], [{p: "وکړل شولئ", f: "óokRul shwuleyy"}]],
                    [[{p: "وکړل شوله", f: "óokRul shwulu"}, {p: "وکړل شولو", f: "óokRul shwulo"}], [{p: "وکړل شول", f: "óokRul shwul"}]],
                    [[{p: "وکړل شوله", f: "óokRul shwula"}], [{p: "وکړل شولې", f: "óokRul shwule"}]],
                ],
            },
            habitualPast: {
                short: [
                    [[{p: "به وکړل شوم", f: "ba óokRul shwum"}], [{p: "به وکړل شو", f: "ba óokRul shoo"}]],
                    [[{p: "به وکړل شوم", f: "ba óokRul shwum"}], [{p: "به وکړل شو", f: "ba óokRul shoo"}]],
                    [[{p: "به وکړل شوې", f: "ba óokRul shwe"}], [{p: "به وکړل شوئ", f: "ba óokRul shweyy"}]],
                    [[{p: "به وکړل شوې", f: "ba óokRul shwe"}], [{p: "به وکړل شوئ", f: "ba óokRul shweyy"}]],
                    [[{p: "به وکړل شو", f: "ba óokRul sho"}], [{p: "به وکړل شو", f: "ba óokRul shoo"}, {p: "به وکړل شول", f: "ba óokRul shwul"}]],
                    [[{p: "به وکړل شوه", f: "ba óokRul shwa"}], [{p: "به وکړل شوې", f: "ba óokRul shwe"}]],
                ],
                long: [
                    [[{p: "به وکړل شولم", f: "ba óokRul shwulum"}], [{p: "به وکړل شولو", f: "ba óokRul shwuloo"}]],
                    [[{p: "به وکړل شولم", f: "ba óokRul shwulum"}], [{p: "به وکړل شولو", f: "ba óokRul shwuloo"}]],
                    [[{p: "به وکړل شولې", f: "ba óokRul shwule"}], [{p: "به وکړل شولئ", f: "ba óokRul shwuleyy"}]],
                    [[{p: "به وکړل شولې", f: "ba óokRul shwule"}], [{p: "به وکړل شولئ", f: "ba óokRul shwuleyy"}]],
                    [[{p: "به وکړل شوله", f: "ba óokRul shwulu"}, {p: "به وکړل شولو", f: "ba óokRul shwulo"}], [{p: "به وکړل شول", f: "ba óokRul shwul"}]],
                    [[{p: "به وکړل شوله", f: "ba óokRul shwula"}], [{p: "به وکړل شولې", f: "ba óokRul shwule"}]],
                ],
            },
            modal: {
                nonImperative: {
                    long: [
                        [[{ p: "وکړل کېدلی شم", f: "óokRul kedúley shum" }, { p: "وکړل کېدلای شم", f: "óokRul kedúlaay shum" }], [{ p: "وکړل کېدلی شو", f: "óokRul kedúley shoo" }, { p: "وکړل کېدلای شو", f: "óokRul kedúlaay shoo" }]],
                        [[{ p: "وکړل کېدلی شم", f: "óokRul kedúley shum" }, { p: "وکړل کېدلای شم", f: "óokRul kedúlaay shum" }], [{ p: "وکړل کېدلی شو", f: "óokRul kedúley shoo" }, { p: "وکړل کېدلای شو", f: "óokRul kedúlaay shoo" }]],
                        [[{ p: "وکړل کېدلی شې", f: "óokRul kedúley she" }, { p: "وکړل کېدلای شې", f: "óokRul kedúlaay she" }], [{ p: "وکړل کېدلی شئ", f: "óokRul kedúley sheyy" }, { p: "وکړل کېدلای شئ", f: "óokRul kedúlaay sheyy" }]],
                        [[{ p: "وکړل کېدلی شې", f: "óokRul kedúley she" }, { p: "وکړل کېدلای شې", f: "óokRul kedúlaay she" }], [{ p: "وکړل کېدلی شئ", f: "óokRul kedúley sheyy" }, { p: "وکړل کېدلای شئ", f: "óokRul kedúlaay sheyy" }]],
                        [[{ p: "وکړل کېدلی شي", f: "óokRul kedúley shee" }, { p: "وکړل کېدلای شي", f: "óokRul kedúlaay shee" }], [{ p: "وکړل کېدلی شي", f: "óokRul kedúley shee" }, { p: "وکړل کېدلای شي", f: "óokRul kedúlaay shee" }]],
                        [[{ p: "وکړل کېدلی شي", f: "óokRul kedúley shee" }, { p: "وکړل کېدلای شي", f: "óokRul kedúlaay shee" }], [{ p: "وکړل کېدلی شي", f: "óokRul kedúley shee" }, { p: "وکړل کېدلای شي", f: "óokRul kedúlaay shee" }]],
                    ],
                    short: [
                        [[{ p: "وکړل کېدی شم", f: "óokRul kedéy shum" }, { p: "وکړل کېدای شم", f: "óokRul kedáay shum" }], [{ p: "وکړل کېدی شو", f: "óokRul kedéy shoo" }, { p: "وکړل کېدای شو", f: "óokRul kedáay shoo" }]],
                        [[{ p: "وکړل کېدی شم", f: "óokRul kedéy shum" }, { p: "وکړل کېدای شم", f: "óokRul kedáay shum" }], [{ p: "وکړل کېدی شو", f: "óokRul kedéy shoo" }, { p: "وکړل کېدای شو", f: "óokRul kedáay shoo" }]],
                        [[{ p: "وکړل کېدی شې", f: "óokRul kedéy she" }, { p: "وکړل کېدای شې", f: "óokRul kedáay she" }], [{ p: "وکړل کېدی شئ", f: "óokRul kedéy sheyy" }, { p: "وکړل کېدای شئ", f: "óokRul kedáay sheyy" }]],
                        [[{ p: "وکړل کېدی شې", f: "óokRul kedéy she" }, { p: "وکړل کېدای شې", f: "óokRul kedáay she" }], [{ p: "وکړل کېدی شئ", f: "óokRul kedéy sheyy" }, { p: "وکړل کېدای شئ", f: "óokRul kedáay sheyy" }]],
                        [[{ p: "وکړل کېدی شي", f: "óokRul kedéy shee" }, { p: "وکړل کېدای شي", f: "óokRul kedáay shee" }], [{ p: "وکړل کېدی شي", f: "óokRul kedéy shee" }, { p: "وکړل کېدای شي", f: "óokRul kedáay shee" }]],
                        [[{ p: "وکړل کېدی شي", f: "óokRul kedéy shee" }, { p: "وکړل کېدای شي", f: "óokRul kedáay shee" }], [{ p: "وکړل کېدی شي", f: "óokRul kedéy shee" }, { p: "وکړل کېدای شي", f: "óokRul kedáay shee" }]],
                    ],
                },
                future: {
                    long: [
                        [[{ p: "به وکړل کېدلی شم", f: "ba óokRul kedúley shum" }, { p: "به وکړل کېدلای شم", f: "ba óokRul kedúlaay shum" }], [{ p: "به وکړل کېدلی شو", f: "ba óokRul kedúley shoo" }, { p: "به وکړل کېدلای شو", f: "ba óokRul kedúlaay shoo" }]],
                        [[{ p: "به وکړل کېدلی شم", f: "ba óokRul kedúley shum" }, { p: "به وکړل کېدلای شم", f: "ba óokRul kedúlaay shum" }], [{ p: "به وکړل کېدلی شو", f: "ba óokRul kedúley shoo" }, { p: "به وکړل کېدلای شو", f: "ba óokRul kedúlaay shoo" }]],
                        [[{ p: "به وکړل کېدلی شې", f: "ba óokRul kedúley she" }, { p: "به وکړل کېدلای شې", f: "ba óokRul kedúlaay she" }], [{ p: "به وکړل کېدلی شئ", f: "ba óokRul kedúley sheyy" }, { p: "به وکړل کېدلای شئ", f: "ba óokRul kedúlaay sheyy" }]],
                        [[{ p: "به وکړل کېدلی شې", f: "ba óokRul kedúley she" }, { p: "به وکړل کېدلای شې", f: "ba óokRul kedúlaay she" }], [{ p: "به وکړل کېدلی شئ", f: "ba óokRul kedúley sheyy" }, { p: "به وکړل کېدلای شئ", f: "ba óokRul kedúlaay sheyy" }]],
                        [[{ p: "به وکړل کېدلی شي", f: "ba óokRul kedúley shee" }, { p: "به وکړل کېدلای شي", f: "ba óokRul kedúlaay shee" }], [{ p: "به وکړل کېدلی شي", f: "ba óokRul kedúley shee" }, { p: "به وکړل کېدلای شي", f: "ba óokRul kedúlaay shee" }]],
                        [[{ p: "به وکړل کېدلی شي", f: "ba óokRul kedúley shee" }, { p: "به وکړل کېدلای شي", f: "ba óokRul kedúlaay shee" }], [{ p: "به وکړل کېدلی شي", f: "ba óokRul kedúley shee" }, { p: "به وکړل کېدلای شي", f: "ba óokRul kedúlaay shee" }]],
                    ],
                    short: [
                        [[{ p: "به وکړل کېدی شم", f: "ba óokRul kedéy shum" }, { p: "به وکړل کېدای شم", f: "ba óokRul kedáay shum" }], [{ p: "به وکړل کېدی شو", f: "ba óokRul kedéy shoo" }, { p: "به وکړل کېدای شو", f: "ba óokRul kedáay shoo" }]],
                        [[{ p: "به وکړل کېدی شم", f: "ba óokRul kedéy shum" }, { p: "به وکړل کېدای شم", f: "ba óokRul kedáay shum" }], [{ p: "به وکړل کېدی شو", f: "ba óokRul kedéy shoo" }, { p: "به وکړل کېدای شو", f: "ba óokRul kedáay shoo" }]],
                        [[{ p: "به وکړل کېدی شې", f: "ba óokRul kedéy she" }, { p: "به وکړل کېدای شې", f: "ba óokRul kedáay she" }], [{ p: "به وکړل کېدی شئ", f: "ba óokRul kedéy sheyy" }, { p: "به وکړل کېدای شئ", f: "ba óokRul kedáay sheyy" }]],
                        [[{ p: "به وکړل کېدی شې", f: "ba óokRul kedéy she" }, { p: "به وکړل کېدای شې", f: "ba óokRul kedáay she" }], [{ p: "به وکړل کېدی شئ", f: "ba óokRul kedéy sheyy" }, { p: "به وکړل کېدای شئ", f: "ba óokRul kedáay sheyy" }]],
                        [[{ p: "به وکړل کېدی شي", f: "ba óokRul kedéy shee" }, { p: "به وکړل کېدای شي", f: "ba óokRul kedáay shee" }], [{ p: "به وکړل کېدی شي", f: "ba óokRul kedéy shee" }, { p: "به وکړل کېدای شي", f: "ba óokRul kedáay shee" }]],
                        [[{ p: "به وکړل کېدی شي", f: "ba óokRul kedéy shee" }, { p: "به وکړل کېدای شي", f: "ba óokRul kedáay shee" }], [{ p: "به وکړل کېدی شي", f: "ba óokRul kedéy shee" }, { p: "به وکړل کېدای شي", f: "ba óokRul kedáay shee" }]],
                    ],
                },
                past: {
                    long: [
                        [[{ p: "وکړل کېدلی شوم", f: "óokRul kedúley shwum" }, { p: "وکړل کېدلای شوم", f: "óokRul kedúlaay shwum" }], [{ p: "وکړل کېدلی شو", f: "óokRul kedúley shoo" }, { p: "وکړل کېدلای شو", f: "óokRul kedúlaay shoo" }]],
                        [[{ p: "وکړل کېدلی شوم", f: "óokRul kedúley shwum" }, { p: "وکړل کېدلای شوم", f: "óokRul kedúlaay shwum" }], [{ p: "وکړل کېدلی شو", f: "óokRul kedúley shoo" }, { p: "وکړل کېدلای شو", f: "óokRul kedúlaay shoo" }]],
                        [[{ p: "وکړل کېدلی شوې", f: "óokRul kedúley shwe" }, { p: "وکړل کېدلای شوې", f: "óokRul kedúlaay shwe" }], [{ p: "وکړل کېدلی شوئ", f: "óokRul kedúley shweyy" }, { p: "وکړل کېدلای شوئ", f: "óokRul kedúlaay shweyy" }]],
                        [[{ p: "وکړل کېدلی شوې", f: "óokRul kedúley shwe" }, { p: "وکړل کېدلای شوې", f: "óokRul kedúlaay shwe" }], [{ p: "وکړل کېدلی شوئ", f: "óokRul kedúley shweyy" }, { p: "وکړل کېدلای شوئ", f: "óokRul kedúlaay shweyy" }]],
                        [[{ p: "وکړل کېدلی شو", f: "óokRul kedúley sho" }, { p: "وکړل کېدلای شو", f: "óokRul kedúlaay sho" }], [{ p: "وکړل کېدلی شول", f: "óokRul kedúley shwul" }, { p: "وکړل کېدلای شول", f: "óokRul kedúlaay shwul" }, { p: "وکړل کېدلی شو", f: "óokRul kedúley shoo" }, { p: "وکړل کېدلای شو", f: "óokRul kedúlaay shoo" }]],
                        [[{ p: "وکړل کېدلی شوه", f: "óokRul kedúley shwa" }, { p: "وکړل کېدلای شوه", f: "óokRul kedúlaay shwa" }], [{ p: "وکړل کېدلی شولې", f: "óokRul kedúley shwule" }, { p: "وکړل کېدلای شولې", f: "óokRul kedúlaay shwule" }, { p: "وکړل کېدلی شوې", f: "óokRul kedúley shwe" }, { p: "وکړل کېدلای شوې", f: "óokRul kedúlaay shwe" }]],
                    ],
                    short: [
                        [[{ p: "وکړل کېدی شوم", f: "óokRul kedéy shwum" }, { p: "وکړل کېدای شوم", f: "óokRul kedáay shwum" }], [{ p: "وکړل کېدی شو", f: "óokRul kedéy shoo" }, { p: "وکړل کېدای شو", f: "óokRul kedáay shoo" }]],
                        [[{ p: "وکړل کېدی شوم", f: "óokRul kedéy shwum" }, { p: "وکړل کېدای شوم", f: "óokRul kedáay shwum" }], [{ p: "وکړل کېدی شو", f: "óokRul kedéy shoo" }, { p: "وکړل کېدای شو", f: "óokRul kedáay shoo" }]],
                        [[{ p: "وکړل کېدی شوې", f: "óokRul kedéy shwe" }, { p: "وکړل کېدای شوې", f: "óokRul kedáay shwe" }], [{ p: "وکړل کېدی شوئ", f: "óokRul kedéy shweyy" }, { p: "وکړل کېدای شوئ", f: "óokRul kedáay shweyy" }]],
                        [[{ p: "وکړل کېدی شوې", f: "óokRul kedéy shwe" }, { p: "وکړل کېدای شوې", f: "óokRul kedáay shwe" }], [{ p: "وکړل کېدی شوئ", f: "óokRul kedéy shweyy" }, { p: "وکړل کېدای شوئ", f: "óokRul kedáay shweyy" }]],
                        [[{ p: "وکړل کېدی شو", f: "óokRul kedéy sho" }, { p: "وکړل کېدای شو", f: "óokRul kedáay sho" }], [{ p: "وکړل کېدی شول", f: "óokRul kedéy shwul" }, { p: "وکړل کېدای شول", f: "óokRul kedáay shwul" }, { p: "وکړل کېدی شو", f: "óokRul kedéy shoo" }, { p: "وکړل کېدای شو", f: "óokRul kedáay shoo" }]],
                        [[{ p: "وکړل کېدی شوه", f: "óokRul kedéy shwa" }, { p: "وکړل کېدای شوه", f: "óokRul kedáay shwa" }], [{ p: "وکړل کېدی شولې", f: "óokRul kedéy shwule" }, { p: "وکړل کېدای شولې", f: "óokRul kedáay shwule" }, { p: "وکړل کېدی شوې", f: "óokRul kedéy shwe" }, { p: "وکړل کېدای شوې", f: "óokRul kedáay shwe" }]],
                    ],
                },
                habitualPast: {
                    long: [
                        [[{ p: "به وکړل کېدلی شوم", f: "ba óokRul kedúley shwum" }, { p: "به وکړل کېدلای شوم", f: "ba óokRul kedúlaay shwum" }], [{ p: "به وکړل کېدلی شو", f: "ba óokRul kedúley shoo" }, { p: "به وکړل کېدلای شو", f: "ba óokRul kedúlaay shoo" }]],
                        [[{ p: "به وکړل کېدلی شوم", f: "ba óokRul kedúley shwum" }, { p: "به وکړل کېدلای شوم", f: "ba óokRul kedúlaay shwum" }], [{ p: "به وکړل کېدلی شو", f: "ba óokRul kedúley shoo" }, { p: "به وکړل کېدلای شو", f: "ba óokRul kedúlaay shoo" }]],
                        [[{ p: "به وکړل کېدلی شوې", f: "ba óokRul kedúley shwe" }, { p: "به وکړل کېدلای شوې", f: "ba óokRul kedúlaay shwe" }], [{ p: "به وکړل کېدلی شوئ", f: "ba óokRul kedúley shweyy" }, { p: "به وکړل کېدلای شوئ", f: "ba óokRul kedúlaay shweyy" }]],
                        [[{ p: "به وکړل کېدلی شوې", f: "ba óokRul kedúley shwe" }, { p: "به وکړل کېدلای شوې", f: "ba óokRul kedúlaay shwe" }], [{ p: "به وکړل کېدلی شوئ", f: "ba óokRul kedúley shweyy" }, { p: "به وکړل کېدلای شوئ", f: "ba óokRul kedúlaay shweyy" }]],
                        [[{ p: "به وکړل کېدلی شو", f: "ba óokRul kedúley sho" }, { p: "به وکړل کېدلای شو", f: "ba óokRul kedúlaay sho" }], [{ p: "به وکړل کېدلی شول", f: "ba óokRul kedúley shwul" }, { p: "به وکړل کېدلای شول", f: "ba óokRul kedúlaay shwul" }, { p: "به وکړل کېدلی شو", f: "ba óokRul kedúley shoo" }, { p: "به وکړل کېدلای شو", f: "ba óokRul kedúlaay shoo" }]],
                        [[{ p: "به وکړل کېدلی شوه", f: "ba óokRul kedúley shwa" }, { p: "به وکړل کېدلای شوه", f: "ba óokRul kedúlaay shwa" }], [{ p: "به وکړل کېدلی شولې", f: "ba óokRul kedúley shwule" }, { p: "به وکړل کېدلای شولې", f: "ba óokRul kedúlaay shwule" }, { p: "به وکړل کېدلی شوې", f: "ba óokRul kedúley shwe" }, { p: "به وکړل کېدلای شوې", f: "ba óokRul kedúlaay shwe" }]],
                    ],
                    short: [
                        [[{ p: "به وکړل کېدی شوم", f: "ba óokRul kedéy shwum" }, { p: "به وکړل کېدای شوم", f: "ba óokRul kedáay shwum" }], [{ p: "به وکړل کېدی شو", f: "ba óokRul kedéy shoo" }, { p: "به وکړل کېدای شو", f: "ba óokRul kedáay shoo" }]],
                        [[{ p: "به وکړل کېدی شوم", f: "ba óokRul kedéy shwum" }, { p: "به وکړل کېدای شوم", f: "ba óokRul kedáay shwum" }], [{ p: "به وکړل کېدی شو", f: "ba óokRul kedéy shoo" }, { p: "به وکړل کېدای شو", f: "ba óokRul kedáay shoo" }]],
                        [[{ p: "به وکړل کېدی شوې", f: "ba óokRul kedéy shwe" }, { p: "به وکړل کېدای شوې", f: "ba óokRul kedáay shwe" }], [{ p: "به وکړل کېدی شوئ", f: "ba óokRul kedéy shweyy" }, { p: "به وکړل کېدای شوئ", f: "ba óokRul kedáay shweyy" }]],
                        [[{ p: "به وکړل کېدی شوې", f: "ba óokRul kedéy shwe" }, { p: "به وکړل کېدای شوې", f: "ba óokRul kedáay shwe" }], [{ p: "به وکړل کېدی شوئ", f: "ba óokRul kedéy shweyy" }, { p: "به وکړل کېدای شوئ", f: "ba óokRul kedáay shweyy" }]],
                        [[{ p: "به وکړل کېدی شو", f: "ba óokRul kedéy sho" }, { p: "به وکړل کېدای شو", f: "ba óokRul kedáay sho" }], [{ p: "به وکړل کېدی شول", f: "ba óokRul kedéy shwul" }, { p: "به وکړل کېدای شول", f: "ba óokRul kedáay shwul" }, { p: "به وکړل کېدی شو", f: "ba óokRul kedéy shoo" }, { p: "به وکړل کېدای شو", f: "ba óokRul kedáay shoo" }]],
                        [[{ p: "به وکړل کېدی شوه", f: "ba óokRul kedéy shwa" }, { p: "به وکړل کېدای شوه", f: "ba óokRul kedáay shwa" }], [{ p: "به وکړل کېدی شولې", f: "ba óokRul kedéy shwule" }, { p: "به وکړل کېدای شولې", f: "ba óokRul kedáay shwule" }, { p: "به وکړل کېدی شوې", f: "ba óokRul kedéy shwe" }, { p: "به وکړل کېدای شوې", f: "ba óokRul kedáay shwe" }]],
                    ],
                },
                hypotheticalPast: {
                    long: [
                        [[{ p: "وکړل کېدلی شوای", f: "óokRul kedúley shwaay" }, { p: "وکړل کېدلی شوی", f: "óokRul kedúley shwey" }, { p: "وکړل کېدلای شوای", f: "óokRul kedúlaay shwaay" }], [{ p: "وکړل کېدلی شوای", f: "óokRul kedúley shwaay" }, { p: "وکړل کېدلی شوی", f: "óokRul kedúley shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedúlaay shwey" }]],   
                        [[{ p: "وکړل کېدلی شوای", f: "óokRul kedúley shwaay" }, { p: "وکړل کېدلی شوی", f: "óokRul kedúley shwey" }, { p: "وکړل کېدلای شوای", f: "óokRul kedúlaay shwaay" }], [{ p: "وکړل کېدلی شوای", f: "óokRul kedúley shwaay" }, { p: "وکړل کېدلی شوی", f: "óokRul kedúley shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedúlaay shwey" }]],   
                        [[{ p: "وکړل کېدلی شوای", f: "óokRul kedúley shwaay" }, { p: "وکړل کېدلی شوی", f: "óokRul kedúley shwey" }, { p: "وکړل کېدلای شوای", f: "óokRul kedúlaay shwaay" }], [{ p: "وکړل کېدلی شوای", f: "óokRul kedúley shwaay" }, { p: "وکړل کېدلی شوی", f: "óokRul kedúley shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedúlaay shwey" }]],   
                        [[{ p: "وکړل کېدلی شوای", f: "óokRul kedúley shwaay" }, { p: "وکړل کېدلی شوی", f: "óokRul kedúley shwey" }, { p: "وکړل کېدلای شوای", f: "óokRul kedúlaay shwaay" }], [{ p: "وکړل کېدلی شوای", f: "óokRul kedúley shwaay" }, { p: "وکړل کېدلی شوی", f: "óokRul kedúley shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedúlaay shwey" }]],   
                        [[{ p: "وکړل کېدلی شوای", f: "óokRul kedúley shwaay" }, { p: "وکړل کېدلی شوی", f: "óokRul kedúley shwey" }, { p: "وکړل کېدلای شوای", f: "óokRul kedúlaay shwaay" }], [{ p: "وکړل کېدلی شوای", f: "óokRul kedúley shwaay" }, { p: "وکړل کېدلی شوی", f: "óokRul kedúley shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedúlaay shwey" }]],   
                        [[{ p: "وکړل کېدلی شوای", f: "óokRul kedúley shwaay" }, { p: "وکړل کېدلی شوی", f: "óokRul kedúley shwey" }, { p: "وکړل کېدلای شوای", f: "óokRul kedúlaay shwaay" }], [{ p: "وکړل کېدلی شوای", f: "óokRul kedúley shwaay" }, { p: "وکړل کېدلی شوی", f: "óokRul kedúley shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedúlaay shwey" }]],
                    ],   
                    short: [
                        [[{ p: "وکړل کېدی شوای", f: "óokRul kedéy shwaay" }, { p: "وکړل کېدی شوی", f: "óokRul kedéy shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedáay shwey" }], [{ p: "وکړل کېدی شوای", f: "óokRul kedéy shwaay" }, { p: "وکړل کېدی شوی", f: "óokRul kedéy shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedáay shwey" }]],   
                        [[{ p: "وکړل کېدی شوای", f: "óokRul kedéy shwaay" }, { p: "وکړل کېدی شوی", f: "óokRul kedéy shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedáay shwey" }], [{ p: "وکړل کېدی شوای", f: "óokRul kedéy shwaay" }, { p: "وکړل کېدی شوی", f: "óokRul kedéy shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedáay shwey" }]],   
                        [[{ p: "وکړل کېدی شوای", f: "óokRul kedéy shwaay" }, { p: "وکړل کېدی شوی", f: "óokRul kedéy shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedáay shwey" }], [{ p: "وکړل کېدی شوای", f: "óokRul kedéy shwaay" }, { p: "وکړل کېدی شوی", f: "óokRul kedéy shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedáay shwey" }]],   
                        [[{ p: "وکړل کېدی شوای", f: "óokRul kedéy shwaay" }, { p: "وکړل کېدی شوی", f: "óokRul kedéy shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedáay shwey" }], [{ p: "وکړل کېدی شوای", f: "óokRul kedéy shwaay" }, { p: "وکړل کېدی شوی", f: "óokRul kedéy shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedáay shwey" }]],   
                        [[{ p: "وکړل کېدی شوای", f: "óokRul kedéy shwaay" }, { p: "وکړل کېدی شوی", f: "óokRul kedéy shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedáay shwey" }], [{ p: "وکړل کېدی شوای", f: "óokRul kedéy shwaay" }, { p: "وکړل کېدی شوی", f: "óokRul kedéy shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedáay shwey" }]],   
                        [[{ p: "وکړل کېدی شوای", f: "óokRul kedéy shwaay" }, { p: "وکړل کېدی شوی", f: "óokRul kedéy shwey" }, { p: "وکړل کېدای شوی", f: "óokRul kedáay shwey" }], [{ p: "وکړل کېدی شوای", f: "óokRul kedéy shwaay" }, { p: "وکړل کېدی شوی", f: "óokRul kedéy shwey" }, { p: "وکړل کول کېدای شوی", f: "óokRul kedáay shwey" }]],
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
                [{ p: "کړی", f: "kúRey" }],
                [{ p: "کړي", f: "kúRee" }],
                [{ p: "کړیو", f: "kúRiyo" }, { p: "کړو", f: "kúRo" }],
            ],
            fem: [
                [{ p: "کړې", f: "kúRe" }],
                [{ p: "کړې", f: "kúRe" }],
                [{ p: "کړو", f: "kúRo" }],
            ],
        },
        present: {
            masc: [
                [{ p: "کوونکی", f: "kawóonkey" }],
                [{ p: "کوونکي", f: "kawóonkee" }],
                [{ p: "کوونکیو", f: "kawóonkiyo" }, { p: "کوونکو", f: "kedóonko" }],
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
        transitivity: "transitive",
        type: "simple",
        yulEnding: false,
        root: {
            imperfective: {
                long: { p: "کول", f: "kawúl" },
                short: { p: "کو", f: "kaw" },
            },
            perfective: {
                long: { p: "وکړلو", f: "óokRul" },
                short: { p: "وکړو", f: "óokR" },
                mini: { p: "وکو", f: "óok" },
            },
            perfectiveSplit: {
                long: [{ p: "و", f: "óo" }, { p: "کړل", f: "kRul" }],
                short: [{ p: "و", f: "óo" }, { p: "کړ", f: "kR" }],
                mini: [{ p: "و", f: "óo" }, { p: "ک", f: "k" }],
            },
        },
        stem: {
            imperfective: { p: "کو", f: "kaw" },
            perfective: {
                long: { p: "وکړ", f: "óokR" },
                short: { p: "وک", f: "óok" },
            },
            perfectiveSplit: {
                long: [{ p: "و", f: "óo" }, { p: "کړ", f: "kR" }],
                short: [{ p: "و", f: "óo" }, { p: "ک", f: "k" }], 
            },
        },
        participle: {
            present: { p: "کوونکی", f: "kawóonkey" },
            past: { p: "کړی", f: "kúRey" },
        },
        idiosyncraticThirdMascSing: {
            perfective: { p: "وکړ", f: "óokuR" },
            imperfective: { p: "کاوه", f: "kaawú" },
        }, 
    },
    imperfective: {
        nonImperative: [
            [[{p: "کوم", f: "kawum"}], [{p: "کوو", f: "kawoo"}]],
            [[{p: "کوم", f: "kawum"}], [{p: "کوو", f: "kawoo"}]],
            [[{p: "کوې", f: "kawe"}], [{p: "کوئ", f: "kaweyy"}]],
            [[{p: "کوې", f: "kawe"}], [{p: "کوئ", f: "kaweyy"}]],
            [[{p: "کوي", f: "kawee"}], [{p: "کوي", f: "kawee"}]],
            [[{p: "کوي", f: "kawee"}], [{p: "کوي", f: "kawee"}]],
        ],
        future: [
            [[{p: "به کوم", f: "ba kawum"}], [{p: "به کوو", f: "ba kawoo"}]],
            [[{p: "به کوم", f: "ba kawum"}], [{p: "به کوو", f: "ba kawoo"}]],
            [[{p: "به کوې", f: "ba kawe"}], [{p: "به کوئ", f: "ba kaweyy"}]],
            [[{p: "به کوې", f: "ba kawe"}], [{p: "به کوئ", f: "ba kaweyy"}]],
            [[{p: "به کوي", f: "ba kawee"}], [{p: "به کوي", f: "ba kawee"}]],
            [[{p: "به کوي", f: "ba kawee"}], [{p: "به کوي", f: "ba kawee"}]],
        ],
        imperative: [
            [[{ p: "کوه", f: "kawá" }], [{ p: "کوئ", f: "kawéyy" }]],
            [[{ p: "کوه", f: "kawá" }], [{ p: "کوئ", f: "kawéyy" }]]
        ],
        past: {
            short: [
                [[{p: "کوم", f: "kawum"}], [{p: "کوو", f: "kawoo"}]],
                [[{p: "کوم", f: "kawum"}], [{p: "کوو", f: "kawoo"}]],
                [[{p: "کوې", f: "kawe"}], [{p: "کوئ", f: "kaweyy"}]],
                [[{p: "کوې", f: "kawe"}], [{p: "کوئ", f: "kaweyy"}]],
                [[{p: "کاوه", f: "kaawu"}], [{p: "کول", f: "kawul"}]],
                [[{p: "کوه", f: "kawa"}], [{p: "کوې", f: "kawe"}]],
            ],
            long: [
                [[{p: "کولم", f: "kawulum"}], [{p: "کولو", f: "kawuloo"}]],
                [[{p: "کولم", f: "kawulum"}], [{p: "کولو", f: "kawuloo"}]],
                [[{p: "کولې", f: "kawule"}], [{p: "کولئ", f: "kawuleyy"}]],
                [[{p: "کولې", f: "kawule"}], [{p: "کولئ", f: "kawuleyy"}]],
                [[{p: "کوله", f: "kawulu"}, {p: "کولو", f: "kawulo"}], [{p: "کول", f: "kawul"}]],
                [[{p: "کوله", f: "kawula"}], [{p: "کولې", f: "kawule"}]],
            ],
        },
        habitualPast: {
            short: [
                [[{p: "به کوم", f: "ba kawum"}], [{p: "به کوو", f: "ba kawoo"}]],
                [[{p: "به کوم", f: "ba kawum"}], [{p: "به کوو", f: "ba kawoo"}]],
                [[{p: "به کوې", f: "ba kawe"}], [{p: "به کوئ", f: "ba kaweyy"}]],
                [[{p: "به کوې", f: "ba kawe"}], [{p: "به کوئ", f: "ba kaweyy"}]],
                [[{p: "به کاوه", f: "ba kaawu"}], [{p: "به کول", f: "ba kawul"}]],
                [[{p: "به کوه", f: "ba kawa"}], [{p: "به کوې", f: "ba kawe"}]],
            ],
            long: [
                [[{p: "به کولم", f: "ba kawulum"}], [{p: "به کولو", f: "ba kawuloo"}]],
                [[{p: "به کولم", f: "ba kawulum"}], [{p: "به کولو", f: "ba kawuloo"}]],
                [[{p: "به کولې", f: "ba kawule"}], [{p: "به کولئ", f: "ba kawuleyy"}]],
                [[{p: "به کولې", f: "ba kawule"}], [{p: "به کولئ", f: "ba kawuleyy"}]],
                [[{p: "به کوله", f: "ba kawulu"}, {p: "به کولو", f: "ba kawulo"}], [{p: "به کول", f: "ba kawul"}]],
                [[{p: "به کوله", f: "ba kawula"}], [{p: "به کولې", f: "ba kawule"}]],
            ],
        },
        modal: kawulImperfectiveModal,
    },
    perfective: {
        nonImperative: {
            long: [
                [[{p: "وکړم", f: "óokRum"}], [{p: "وکړو", f: "óokRoo"}]],
                [[{p: "وکړم", f: "óokRum"}], [{p: "وکړو", f: "óokRoo"}]],
                [[{p: "وکړې", f: "óokRe"}], [{p: "وکړئ", f: "óokReyy"}]],
                [[{p: "وکړې", f: "óokRe"}], [{p: "وکړئ", f: "óokReyy"}]],
                [[{p: "وکړي", f: "óokRee"}], [{p: "وکړي", f: "óokRee"}]],
                [[{p: "وکړي", f: "óokRee"}], [{p: "وکړي", f: "óokRee"}]],
            ],
            short: [
                [[{p: "وکم", f: "óokum"}], [{p: "وکو", f: "óokoo"}]],
                [[{p: "وکم", f: "óokum"}], [{p: "وکو", f: "óokoo"}]],
                [[{p: "وکې", f: "óoke"}], [{p: "وکئ", f: "óokeyy"}]],
                [[{p: "وکې", f: "óoke"}], [{p: "وکئ", f: "óokeyy"}]],
                [[{p: "وکي", f: "óokee"}], [{p: "وکي", f: "óokee"}]],
                [[{p: "وکي", f: "óokee"}], [{p: "وکي", f: "óokee"}]],
            ],
        },
        future: {
            long: [
                [[{p: "به وکړم", f: "ba óokRum"}], [{p: "به وکړو", f: "ba óokRoo"}]],
                [[{p: "به وکړم", f: "ba óokRum"}], [{p: "به وکړو", f: "ba óokRoo"}]],
                [[{p: "به وکړې", f: "ba óokRe"}], [{p: "به وکړئ", f: "ba óokReyy"}]],
                [[{p: "به وکړې", f: "ba óokRe"}], [{p: "به وکړئ", f: "ba óokReyy"}]],
                [[{p: "به وکړي", f: "ba óokRee"}], [{p: "به وکړي", f: "ba óokRee"}]],
                [[{p: "به وکړي", f: "ba óokRee"}], [{p: "به وکړي", f: "ba óokRee"}]],
            ],
            short: [
                [[{p: "به وکم", f: "ba óokum"}], [{p: "به وکو", f: "ba óokoo"}]],
                [[{p: "به وکم", f: "ba óokum"}], [{p: "به وکو", f: "ba óokoo"}]],
                [[{p: "به وکې", f: "ba óoke"}], [{p: "به وکئ", f: "ba óokeyy"}]],
                [[{p: "به وکې", f: "ba óoke"}], [{p: "به وکئ", f: "ba óokeyy"}]],
                [[{p: "به وکي", f: "ba óokee"}], [{p: "به وکي", f: "ba óokee"}]],
                [[{p: "به وکي", f: "ba óokee"}], [{p: "به وکي", f: "ba óokee"}]],
            ],
        },
        imperative: {
            long: [
                [[{ p: "وکړه", f: "óokRa" }], [{ p: "وکړئ", f: "óokReyy" }]],
                [[{ p: "وکړه", f: "óokRa" }], [{ p: "وکړئ", f: "óokReyy" }]]
            ],
            short: [
                [[{ p: "وکه", f: "óoka" }], [{ p: "وکئ", f: "óokeyy" }]],
                [[{ p: "وکه", f: "óoka" }], [{ p: "وکئ", f: "óokeyy" }]],
            ],
        },
        past: {
            mini: [
                [[{p: "وکم", f: "óokum"}], [{p: "وکو", f: "óokoo"}]],
                [[{p: "وکم", f: "óokum"}], [{p: "وکو", f: "óokoo"}]],
                [[{p: "وکې", f: "óoke"}], [{p: "وکئ", f: "óokeyy"}]],
                [[{p: "وکې", f: "óoke"}], [{p: "وکئ", f: "óokeyy"}]],
                [[{p: "وکه", f: "óoku"}, {p: "وکو", f: "óoko"}], [{p: "وکړل", f: "óokRul"}, { p: "وکو", f: "óokoo" }]],
                [[{p: "وکه", f: "óoka"}], [{p: "وکې", f: "óoke"}]],
            ],
            short: [
                [[{p: "وکړم", f: "óokRum"}], [{p: "وکړو", f: "óokRoo"}]],
                [[{p: "وکړم", f: "óokRum"}], [{p: "وکړو", f: "óokRoo"}]],
                [[{p: "وکړې", f: "óokRe"}], [{p: "وکړئ", f: "óokReyy"}]],
                [[{p: "وکړې", f: "óokRe"}], [{p: "وکړئ", f: "óokReyy"}]],
                [[{p: "وکړه", f: "óokRu"}, {p: "وکړو", f: "óokRo"}, {p: "وکړ", f: "óokuR"}], [{p: "وکړل", f: "óokRul"}, {p: "وکړو", f: "óokRoo" }]],
                [[{p: "وکړه", f: "óokRa"}], [{p: "وکړې", f: "óokRe"}]],
            ],
            long: [
                [[{p: "وکړلم", f: "óokRulum"}], [{p: "وکړلو", f: "óokRuloo"}]],
                [[{p: "وکړلم", f: "óokRulum"}], [{p: "وکړلو", f: "óokRuloo"}]],
                [[{p: "وکړلې", f: "óokRule"}], [{p: "وکړلئ", f: "óokRuleyy"}]],
                [[{p: "وکړلې", f: "óokRule"}], [{p: "وکړلئ", f: "óokRuleyy"}]],
                [[{p: "وکړله", f: "óokRulu"}, {p: "وکړلو", f: "óokRulo"}], [{p: "وکړل", f: "óokRul"}, {p: "وکړلو", f: "óokRuloo"}]],
                [[{p: "وکړله", f: "óokRula"}], [{p: "وکړلې", f: "óokRule"}]],
            ],
        },
        habitualPast: {
            mini: [
                [[{p: "به وکم", f: "ba óokum"}], [{p: "به وکو", f: "ba óokoo"}]],
                [[{p: "به وکم", f: "ba óokum"}], [{p: "به وکو", f: "ba óokoo"}]],
                [[{p: "به وکې", f: "ba óoke"}], [{p: "به وکئ", f: "ba óokeyy"}]],
                [[{p: "به وکې", f: "ba óoke"}], [{p: "به وکئ", f: "ba óokeyy"}]],
                [[{p: "به وکه", f: "ba óoku"}, {p: "به وکو", f: "ba óoko"}], [{p: "به وکړل", f: "ba óokRul"}, { p: "به وکو", f: "ba óokoo" }]],
                [[{p: "به وکه", f: "ba óoka"}], [{p: "به وکې", f: "ba óoke"}]],
            ],
            short: [
                [[{p: "به وکړم", f: "ba óokRum"}], [{p: "به وکړو", f: "ba óokRoo"}]],
                [[{p: "به وکړم", f: "ba óokRum"}], [{p: "به وکړو", f: "ba óokRoo"}]],
                [[{p: "به وکړې", f: "ba óokRe"}], [{p: "به وکړئ", f: "ba óokReyy"}]],
                [[{p: "به وکړې", f: "ba óokRe"}], [{p: "به وکړئ", f: "ba óokReyy"}]],
                [[{p: "به وکړه", f: "ba óokRu"}, {p: "به وکړو", f: "ba óokRo"}, {p: "به وکړ", f: "ba óokuR"}], [{p: "به وکړل", f: "ba óokRul"}, {p: "به وکړو", f: "ba óokRoo" }]],
                [[{p: "به وکړه", f: "ba óokRa"}], [{p: "به وکړې", f: "ba óokRe"}]],
            ],
            long: [
                [[{p: "به وکړلم", f: "ba óokRulum"}], [{p: "به وکړلو", f: "ba óokRuloo"}]],
                [[{p: "به وکړلم", f: "ba óokRulum"}], [{p: "به وکړلو", f: "ba óokRuloo"}]],
                [[{p: "به وکړلې", f: "ba óokRule"}], [{p: "به وکړلئ", f: "ba óokRuleyy"}]],
                [[{p: "به وکړلې", f: "ba óokRule"}], [{p: "به وکړلئ", f: "ba óokRuleyy"}]],
                [[{p: "به وکړله", f: "ba óokRulu"}, {p: "به وکړلو", f: "ba óokRulo"}], [{p: "به وکړل", f: "ba óokRul"}, {p: "به وکړلو", f: "ba óokRuloo"}]],
                [[{p: "به وکړله", f: "ba óokRula"}], [{p: "به وکړلې", f: "ba óokRule"}]],
            ],
        },
        modal: {
            nonImperative: {
                long: [
                    [[{ p: "وکړلی شم", f: "óokRuley shum" }, { p: "وکړلای شم", f: "óokRulaay shum" }], [{ p: "وکړلی شو", f: "óokRuley shoo" }, { p: "وکړلای شو", f: "óokRulaay shoo" }]],
                    [[{ p: "وکړلی شم", f: "óokRuley shum" }, { p: "وکړلای شم", f: "óokRulaay shum" }], [{ p: "وکړلی شو", f: "óokRuley shoo" }, { p: "وکړلای شو", f: "óokRulaay shoo" }]],
                    [[{ p: "وکړلی شې", f: "óokRuley she" }, { p: "وکړلای شې", f: "óokRulaay she" }], [{ p: "وکړلی شئ", f: "óokRuley sheyy" }, { p: "وکړلای شئ", f: "óokRulaay sheyy" }]],
                    [[{ p: "وکړلی شې", f: "óokRuley she" }, { p: "وکړلای شې", f: "óokRulaay she" }], [{ p: "وکړلی شئ", f: "óokRuley sheyy" }, { p: "وکړلای شئ", f: "óokRulaay sheyy" }]],
                    [[{ p: "وکړلی شي", f: "óokRuley shee" }, { p: "وکړلای شي", f: "óokRulaay shee" }], [{ p: "وکړلی شي", f: "óokRuley shee" }, { p: "وکړلای شي", f: "óokRulaay shee" }]],
                    [[{ p: "وکړلی شي", f: "óokRuley shee" }, { p: "وکړلای شي", f: "óokRulaay shee" }], [{ p: "وکړلی شي", f: "óokRuley shee" }, { p: "وکړلای شي", f: "óokRulaay shee" }]],
                ],
                short: [
                    [[{ p: "وکړی شم", f: "óokRey shum" }, { p: "وکړای شم", f: "óokRaay shum" }], [{ p: "وکړی شو", f: "óokRey shoo" }, { p: "وکړای شو", f: "óokRaay shoo" }]],
                    [[{ p: "وکړی شم", f: "óokRey shum" }, { p: "وکړای شم", f: "óokRaay shum" }], [{ p: "وکړی شو", f: "óokRey shoo" }, { p: "وکړای شو", f: "óokRaay shoo" }]],
                    [[{ p: "وکړی شې", f: "óokRey she" }, { p: "وکړای شې", f: "óokRaay she" }], [{ p: "وکړی شئ", f: "óokRey sheyy" }, { p: "وکړای شئ", f: "óokRaay sheyy" }]],
                    [[{ p: "وکړی شې", f: "óokRey she" }, { p: "وکړای شې", f: "óokRaay she" }], [{ p: "وکړی شئ", f: "óokRey sheyy" }, { p: "وکړای شئ", f: "óokRaay sheyy" }]],
                    [[{ p: "وکړی شي", f: "óokRey shee" }, { p: "وکړای شي", f: "óokRaay shee" }], [{ p: "وکړی شي", f: "óokRey shee" }, { p: "وکړای شي", f: "óokRaay shee" }]],
                    [[{ p: "وکړی شي", f: "óokRey shee" }, { p: "وکړای شي", f: "óokRaay shee" }], [{ p: "وکړی شي", f: "óokRey shee" }, { p: "وکړای شي", f: "óokRaay shee" }]],
                ],
            },
            future: {
                long: [
                    [[{ p: "به وکړلی شم", f: "ba óokRuley shum" }, { p: "به وکړلای شم", f: "ba óokRulaay shum" }], [{ p: "به وکړلی شو", f: "ba óokRuley shoo" }, { p: "به وکړلای شو", f: "ba óokRulaay shoo" }]],
                    [[{ p: "به وکړلی شم", f: "ba óokRuley shum" }, { p: "به وکړلای شم", f: "ba óokRulaay shum" }], [{ p: "به وکړلی شو", f: "ba óokRuley shoo" }, { p: "به وکړلای شو", f: "ba óokRulaay shoo" }]],
                    [[{ p: "به وکړلی شې", f: "ba óokRuley she" }, { p: "به وکړلای شې", f: "ba óokRulaay she" }], [{ p: "به وکړلی شئ", f: "ba óokRuley sheyy" }, { p: "به وکړلای شئ", f: "ba óokRulaay sheyy" }]],
                    [[{ p: "به وکړلی شې", f: "ba óokRuley she" }, { p: "به وکړلای شې", f: "ba óokRulaay she" }], [{ p: "به وکړلی شئ", f: "ba óokRuley sheyy" }, { p: "به وکړلای شئ", f: "ba óokRulaay sheyy" }]],
                    [[{ p: "به وکړلی شي", f: "ba óokRuley shee" }, { p: "به وکړلای شي", f: "ba óokRulaay shee" }], [{ p: "به وکړلی شي", f: "ba óokRuley shee" }, { p: "به وکړلای شي", f: "ba óokRulaay shee" }]],
                    [[{ p: "به وکړلی شي", f: "ba óokRuley shee" }, { p: "به وکړلای شي", f: "ba óokRulaay shee" }], [{ p: "به وکړلی شي", f: "ba óokRuley shee" }, { p: "به وکړلای شي", f: "ba óokRulaay shee" }]],
                ],
                short: [
                    [[{ p: "به وکړی شم", f: "ba óokRey shum" }, { p: "به وکړای شم", f: "ba óokRaay shum" }], [{ p: "به وکړی شو", f: "ba óokRey shoo" }, { p: "به وکړای شو", f: "ba óokRaay shoo" }]],
                    [[{ p: "به وکړی شم", f: "ba óokRey shum" }, { p: "به وکړای شم", f: "ba óokRaay shum" }], [{ p: "به وکړی شو", f: "ba óokRey shoo" }, { p: "به وکړای شو", f: "ba óokRaay shoo" }]],
                    [[{ p: "به وکړی شې", f: "ba óokRey she" }, { p: "به وکړای شې", f: "ba óokRaay she" }], [{ p: "به وکړی شئ", f: "ba óokRey sheyy" }, { p: "به وکړای شئ", f: "ba óokRaay sheyy" }]],
                    [[{ p: "به وکړی شې", f: "ba óokRey she" }, { p: "به وکړای شې", f: "ba óokRaay she" }], [{ p: "به وکړی شئ", f: "ba óokRey sheyy" }, { p: "به وکړای شئ", f: "ba óokRaay sheyy" }]],
                    [[{ p: "به وکړی شي", f: "ba óokRey shee" }, { p: "به وکړای شي", f: "ba óokRaay shee" }], [{ p: "به وکړی شي", f: "ba óokRey shee" }, { p: "به وکړای شي", f: "ba óokRaay shee" }]],
                    [[{ p: "به وکړی شي", f: "ba óokRey shee" }, { p: "به وکړای شي", f: "ba óokRaay shee" }], [{ p: "به وکړی شي", f: "ba óokRey shee" }, { p: "به وکړای شي", f: "ba óokRaay shee" }]],
                ],
            },
            past: {
                long: [
                    [[{ p: "وکړلی شوم", f: "óokRuley shwum" }, { p: "وکړلای شوم", f: "óokRulaay shwum" }], [{ p: "وکړلی شو", f: "óokRuley shoo" }, { p: "وکړلای شو", f: "óokRulaay shoo" }]],
                    [[{ p: "وکړلی شوم", f: "óokRuley shwum" }, { p: "وکړلای شوم", f: "óokRulaay shwum" }], [{ p: "وکړلی شو", f: "óokRuley shoo" }, { p: "وکړلای شو", f: "óokRulaay shoo" }]],
                    [[{ p: "وکړلی شوې", f: "óokRuley shwe" }, { p: "وکړلای شوې", f: "óokRulaay shwe" }], [{ p: "وکړلی شوئ", f: "óokRuley shweyy" }, { p: "وکړلای شوئ", f: "óokRulaay shweyy" }]],
                    [[{ p: "وکړلی شوې", f: "óokRuley shwe" }, { p: "وکړلای شوې", f: "óokRulaay shwe" }], [{ p: "وکړلی شوئ", f: "óokRuley shweyy" }, { p: "وکړلای شوئ", f: "óokRulaay shweyy" }]],
                    [[{ p: "وکړلی شو", f: "óokRuley sho" }, { p: "وکړلای شو", f: "óokRulaay sho" }], [{ p: "وکړلی شول", f: "óokRuley shwul" }, { p: "وکړلای شول", f: "óokRulaay shwul" }, { p: "وکړلی شو", f: "óokRuley shoo" }, { p: "وکړلای شو", f: "óokRulaay shoo" }]],
                    [[{ p: "وکړلی شوه", f: "óokRuley shwa" }, { p: "وکړلای شوه", f: "óokRulaay shwa" }], [{ p: "وکړلی شولې", f: "óokRuley shwule" }, { p: "وکړلای شولې", f: "óokRulaay shwule" }, { p: "وکړلی شوې", f: "óokRuley shwe" }, { p: "وکړلای شوې", f: "óokRulaay shwe" }]],
                ],
                short: [
                    [[{ p: "وکړی شوم", f: "óokRey shwum" }, { p: "وکړای شوم", f: "óokRaay shwum" }], [{ p: "وکړی شو", f: "óokRey shoo" }, { p: "وکړای شو", f: "óokRaay shoo" }]],
                    [[{ p: "وکړی شوم", f: "óokRey shwum" }, { p: "وکړای شوم", f: "óokRaay shwum" }], [{ p: "وکړی شو", f: "óokRey shoo" }, { p: "وکړای شو", f: "óokRaay shoo" }]],
                    [[{ p: "وکړی شوې", f: "óokRey shwe" }, { p: "وکړای شوې", f: "óokRaay shwe" }], [{ p: "وکړی شوئ", f: "óokRey shweyy" }, { p: "وکړای شوئ", f: "óokRaay shweyy" }]],
                    [[{ p: "وکړی شوې", f: "óokRey shwe" }, { p: "وکړای شوې", f: "óokRaay shwe" }], [{ p: "وکړی شوئ", f: "óokRey shweyy" }, { p: "وکړای شوئ", f: "óokRaay shweyy" }]],
                    [[{ p: "وکړی شو", f: "óokRey sho" }, { p: "وکړای شو", f: "óokRaay sho" }], [{ p: "وکړی شول", f: "óokRey shwul" }, { p: "وکړای شول", f: "óokRaay shwul" }, { p: "وکړی شو", f: "óokRey shoo" }, { p: "وکړای شو", f: "óokRaay shoo" }]],
                    [[{ p: "وکړی شوه", f: "óokRey shwa" }, { p: "وکړای شوه", f: "óokRaay shwa" }], [{ p: "وکړی شولې", f: "óokRey shwule" }, { p: "وکړای شولې", f: "óokRaay shwule" }, { p: "وکړی شوې", f: "óokRey shwe" }, { p: "وکړای شوې", f: "óokRaay shwe" }]],
                ],
            },
            habitualPast: {
                long: [
                    [[{ p: "به وکړلی شوم", f: "ba óokRuley shwum" }, { p: "به وکړلای شوم", f: "ba óokRulaay shwum" }], [{ p: "به وکړلی شو", f: "ba óokRuley shoo" }, { p: "به وکړلای شو", f: "ba óokRulaay shoo" }]],
                    [[{ p: "به وکړلی شوم", f: "ba óokRuley shwum" }, { p: "به وکړلای شوم", f: "ba óokRulaay shwum" }], [{ p: "به وکړلی شو", f: "ba óokRuley shoo" }, { p: "به وکړلای شو", f: "ba óokRulaay shoo" }]],
                    [[{ p: "به وکړلی شوې", f: "ba óokRuley shwe" }, { p: "به وکړلای شوې", f: "ba óokRulaay shwe" }], [{ p: "به وکړلی شوئ", f: "ba óokRuley shweyy" }, { p: "به وکړلای شوئ", f: "ba óokRulaay shweyy" }]],
                    [[{ p: "به وکړلی شوې", f: "ba óokRuley shwe" }, { p: "به وکړلای شوې", f: "ba óokRulaay shwe" }], [{ p: "به وکړلی شوئ", f: "ba óokRuley shweyy" }, { p: "به وکړلای شوئ", f: "ba óokRulaay shweyy" }]],
                    [[{ p: "به وکړلی شو", f: "ba óokRuley sho" }, { p: "به وکړلای شو", f: "ba óokRulaay sho" }], [{ p: "به وکړلی شول", f: "ba óokRuley shwul" }, { p: "به وکړلای شول", f: "ba óokRulaay shwul" }, { p: "به وکړلی شو", f: "ba óokRuley shoo" }, { p: "به وکړلای شو", f: "ba óokRulaay shoo" }]],
                    [[{ p: "به وکړلی شوه", f: "ba óokRuley shwa" }, { p: "به وکړلای شوه", f: "ba óokRulaay shwa" }], [{ p: "به وکړلی شولې", f: "ba óokRuley shwule" }, { p: "به وکړلای شولې", f: "ba óokRulaay shwule" }, { p: "به وکړلی شوې", f: "ba óokRuley shwe" }, { p: "به وکړلای شوې", f: "ba óokRulaay shwe" }]],
                ],
                short: [
                    [[{ p: "به وکړی شوم", f: "ba óokRey shwum" }, { p: "به وکړای شوم", f: "ba óokRaay shwum" }], [{ p: "به وکړی شو", f: "ba óokRey shoo" }, { p: "به وکړای شو", f: "ba óokRaay shoo" }]],
                    [[{ p: "به وکړی شوم", f: "ba óokRey shwum" }, { p: "به وکړای شوم", f: "ba óokRaay shwum" }], [{ p: "به وکړی شو", f: "ba óokRey shoo" }, { p: "به وکړای شو", f: "ba óokRaay shoo" }]],
                    [[{ p: "به وکړی شوې", f: "ba óokRey shwe" }, { p: "به وکړای شوې", f: "ba óokRaay shwe" }], [{ p: "به وکړی شوئ", f: "ba óokRey shweyy" }, { p: "به وکړای شوئ", f: "ba óokRaay shweyy" }]],
                    [[{ p: "به وکړی شوې", f: "ba óokRey shwe" }, { p: "به وکړای شوې", f: "ba óokRaay shwe" }], [{ p: "به وکړی شوئ", f: "ba óokRey shweyy" }, { p: "به وکړای شوئ", f: "ba óokRaay shweyy" }]],
                    [[{ p: "به وکړی شو", f: "ba óokRey sho" }, { p: "به وکړای شو", f: "ba óokRaay sho" }], [{ p: "به وکړی شول", f: "ba óokRey shwul" }, { p: "به وکړای شول", f: "ba óokRaay shwul" }, { p: "به وکړی شو", f: "ba óokRey shoo" }, { p: "به وکړای شو", f: "ba óokRaay shoo" }]],
                    [[{ p: "به وکړی شوه", f: "ba óokRey shwa" }, { p: "به وکړای شوه", f: "ba óokRaay shwa" }], [{ p: "به وکړی شولې", f: "ba óokRey shwule" }, { p: "به وکړای شولې", f: "ba óokRaay shwule" }, { p: "به وکړی شوې", f: "ba óokRey shwe" }, { p: "به وکړای شوې", f: "ba óokRaay shwe" }]],
                ],
            },
            hypotheticalPast: {
                long: [
                    [[{ p: "وکړلی شوای", f: "óokRuley shwaay" }, { p: "وکړلی شوی", f: "óokRuley shwey" }, { p: "وکړلای شوای", f: "óokRulaay shwaay" }], [{ p: "وکړلی شوای", f: "óokRuley shwaay" }, { p: "وکړلی شوی", f: "óokRuley shwey" }, { p: "وکړلای شوای", f: "óokRulaay shwaay" }]],
                    [[{ p: "وکړلی شوای", f: "óokRuley shwaay" }, { p: "وکړلی شوی", f: "óokRuley shwey" }, { p: "وکړلای شوای", f: "óokRulaay shwaay" }], [{ p: "وکړلی شوای", f: "óokRuley shwaay" }, { p: "وکړلی شوی", f: "óokRuley shwey" }, { p: "وکړلای شوای", f: "óokRulaay shwaay" }]],
                    [[{ p: "وکړلی شوای", f: "óokRuley shwaay" }, { p: "وکړلی شوی", f: "óokRuley shwey" }, { p: "وکړلای شوای", f: "óokRulaay shwaay" }], [{ p: "وکړلی شوای", f: "óokRuley shwaay" }, { p: "وکړلی شوی", f: "óokRuley shwey" }, { p: "وکړلای شوای", f: "óokRulaay shwaay" }]],
                    [[{ p: "وکړلی شوای", f: "óokRuley shwaay" }, { p: "وکړلی شوی", f: "óokRuley shwey" }, { p: "وکړلای شوای", f: "óokRulaay shwaay" }], [{ p: "وکړلی شوای", f: "óokRuley shwaay" }, { p: "وکړلی شوی", f: "óokRuley shwey" }, { p: "وکړلای شوای", f: "óokRulaay shwaay" }]],
                    [[{ p: "وکړلی شوای", f: "óokRuley shwaay" }, { p: "وکړلی شوی", f: "óokRuley shwey" }, { p: "وکړلای شوای", f: "óokRulaay shwaay" }], [{ p: "وکړلی شوای", f: "óokRuley shwaay" }, { p: "وکړلی شوی", f: "óokRuley shwey" }, { p: "وکړلای شوای", f: "óokRulaay shwaay" }]],
                    [[{ p: "وکړلی شوای", f: "óokRuley shwaay" }, { p: "وکړلی شوی", f: "óokRuley shwey" }, { p: "وکړلای شوای", f: "óokRulaay shwaay" }], [{ p: "وکړلی شوای", f: "óokRuley shwaay" }, { p: "وکړلی شوی", f: "óokRuley shwey" }, { p: "وکړلای شوای", f: "óokRulaay shwaay" }]],
                ],
                short: [
                    [[{ p: "وکړی شوای", f: "óokRey shwaay" }, { p: "وکړی شوی", f: "óokRey shwey" }, { p: "وکړی شوای", f: "óokRaay shwey" }], [{ p: "وکړی شوای", f: "óokRey shwaay" }, { p: "وکړی شوی", f: "óokRey shwey" }, { p: "وکړی شوای", f: "óokRaay shwey" }]],
                    [[{ p: "وکړی شوای", f: "óokRey shwaay" }, { p: "وکړی شوی", f: "óokRey shwey" }, { p: "وکړی شوای", f: "óokRaay shwey" }], [{ p: "وکړی شوای", f: "óokRey shwaay" }, { p: "وکړی شوی", f: "óokRey shwey" }, { p: "وکړی شوای", f: "óokRaay shwey" }]],
                    [[{ p: "وکړی شوای", f: "óokRey shwaay" }, { p: "وکړی شوی", f: "óokRey shwey" }, { p: "وکړی شوای", f: "óokRaay shwey" }], [{ p: "وکړی شوای", f: "óokRey shwaay" }, { p: "وکړی شوی", f: "óokRey shwey" }, { p: "وکړی شوای", f: "óokRaay shwey" }]],
                    [[{ p: "وکړی شوای", f: "óokRey shwaay" }, { p: "وکړی شوی", f: "óokRey shwey" }, { p: "وکړی شوای", f: "óokRaay shwey" }], [{ p: "وکړی شوای", f: "óokRey shwaay" }, { p: "وکړی شوی", f: "óokRey shwey" }, { p: "وکړی شوای", f: "óokRaay shwey" }]],
                    [[{ p: "وکړی شوای", f: "óokRey shwaay" }, { p: "وکړی شوی", f: "óokRey shwey" }, { p: "وکړی شوای", f: "óokRaay shwey" }], [{ p: "وکړی شوای", f: "óokRey shwaay" }, { p: "وکړی شوی", f: "óokRey shwey" }, { p: "وکړی شوای", f: "óokRaay shwey" }]],
                    [[{ p: "وکړی شوای", f: "óokRey shwaay" }, { p: "وکړی شوی", f: "óokRey shwey" }, { p: "وکړی شوای", f: "óokRaay shwey" }], [{ p: "وکړی شوای", f: "óokRey shwaay" }, { p: "وکړی شوی", f: "óokRey shwey" }, { p: "وکړی شوای", f: "óokRaay shwey" }]],
                ],
            },
        },
    },
    hypothetical: kawulHypothetical,
    participle: {
        past: {
            masc: [
                [{ p: "کړی", f: "kúRey" }],
                [{ p: "کړي", f: "kúRee" }],
                [{ p: "کړیو", f: "kúRiyo" }, { p: "کړو", f: "kúRo" }],
            ],
            fem: [
                [{ p: "کړې", f: "kúRe" }],
                [{ p: "کړې", f: "kúRe" }],
                [{ p: "کړو", f: "kúRo" }],
            ],
        },
        present: {
            masc: [
                [{ p: "کوونکی", f: "kawóonkey" }],
                [{ p: "کوونکي", f: "kawóonkee" }],
                [{ p: "کوونکیو", f: "kawóonkiyo" }, { p: "کوونکو", f: "kedóonko" }],
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
            nonImperative: [
                [[{p: "کړل شم", f: "kRul shum"}], [{p: "کړل شو", f: "kRul shoo"}]],
                [[{p: "کړل شم", f: "kRul shum"}], [{p: "کړل شو", f: "kRul shoo"}]],
                [[{p: "کړل شې", f: "kRul she"}], [{p: "کړل شئ", f: "kRul sheyy"}]],
                [[{p: "کړل شې", f: "kRul she"}], [{p: "کړل شئ", f: "kRul sheyy"}]],
                [[{p: "کړل شي", f: "kRul shee"}], [{p: "کړل شي", f: "kRul shee"}]],
                [[{p: "کړل شي", f: "kRul shee"}], [{p: "کړل شي", f: "kRul shee"}]],
            ],
            future: [
                [[{p: "به کړل شم", f: "ba kRul shum"}], [{p: "به کړل شو", f: "ba kRulshoo"}]],
                [[{p: "به کړل شم", f: "ba kRul shum"}], [{p: "به کړل شو", f: "ba kRulshoo"}]],
                [[{p: "به کړل شې", f: "ba kRul she"}], [{p: "به کړل شئ", f: "ba kRulsheyy"}]],
                [[{p: "به کړل شې", f: "ba kRul she"}], [{p: "به کړل شئ", f: "ba kRulsheyy"}]],
                [[{p: "به کړل شي", f: "ba kRul shee"}], [{p: "به کړل شي", f: "ba kRulshee"}]],
                [[{p: "به کړل شي", f: "ba kRul shee"}], [{p: "به کړل شي", f: "ba kRulshee"}]],
            ],
            past: {
                short: [
                    [[{p: "کړل شوم", f: "kRul shwum"}], [{p: "کړل شو", f: "kRul shoo"}]],
                    [[{p: "کړل شوم", f: "kRul shwum"}], [{p: "کړل شو", f: "kRul shoo"}]],
                    [[{p: "کړل شوې", f: "kRul shwe"}], [{p: "کړل شوئ", f: "kRul shweyy"}]],
                    [[{p: "کړل شوې", f: "kRul shwe"}], [{p: "کړل شوئ", f: "kRul shweyy"}]],
                    [[{p: "کړل شو", f: "kRul sho"}], [{p: "کړل شو", f: "kRul shoo"}, {p: "کړل شول", f: "kRul shwul"}]],
                    [[{p: "کړل شوه", f: "kRul shwa"}], [{p: "کړل شوې", f: "kRul shwe"}]],
                ],
                long: [
                    [[{p: "کړل شولم", f: "kRul shwulum"}], [{p: "کړل شولو", f: "kRul shwuloo"}]],
                    [[{p: "کړل شولم", f: "kRul shwulum"}], [{p: "کړل شولو", f: "kRul shwuloo"}]],
                    [[{p: "کړل شولې", f: "kRul shwule"}], [{p: "کړل شولئ", f: "kRul shwuleyy"}]],
                    [[{p: "کړل شولې", f: "kRul shwule"}], [{p: "کړل شولئ", f: "kRul shwuleyy"}]],
                    [[{p: "کړل شوله", f: "kRul shwulu"}, {p: "کړل شولو", f: "kRul shwulo"}], [{p: "کړل شول", f: "kRul shwul"}]],
                    [[{p: "کړل شوله", f: "kRul shwula"}], [{p: "کړل شولې", f: "kRul shwule"}]],
                ],
            },
            habitualPast: {
                short: [
                    [[{p: "به کړل شوم", f: "ba kRul shwum"}], [{p: "به کړل شو", f: "ba kRul shoo"}]],
                    [[{p: "به کړل شوم", f: "ba kRul shwum"}], [{p: "به کړل شو", f: "ba kRul shoo"}]],
                    [[{p: "به کړل شوې", f: "ba kRul shwe"}], [{p: "به کړل شوئ", f: "ba kRul shweyy"}]],
                    [[{p: "به کړل شوې", f: "ba kRul shwe"}], [{p: "به کړل شوئ", f: "ba kRul shweyy"}]],
                    [[{p: "به کړل شو", f: "ba kRul sho"}], [{p: "به کړل شو", f: "ba kRul shoo"}, {p: "به کړل شول", f: "ba kRul shwul"}]],
                    [[{p: "به کړل شوه", f: "ba kRul shwa"}], [{p: "به کړل شوې", f: "ba kRul shwe"}]],
                ],
                long: [
                    [[{p: "به کړل شولم", f: "ba kRul shwulum"}], [{p: "به کړل شولو", f: "ba kRul shwuloo"}]],
                    [[{p: "به کړل شولم", f: "ba kRul shwulum"}], [{p: "به کړل شولو", f: "ba kRul shwuloo"}]],
                    [[{p: "به کړل شولې", f: "ba kRul shwule"}], [{p: "به کړل شولئ", f: "ba kRul shwuleyy"}]],
                    [[{p: "به کړل شولې", f: "ba kRul shwule"}], [{p: "به کړل شولئ", f: "ba kRul shwuleyy"}]],
                    [[{p: "به کړل شوله", f: "ba kRul shwulu"}, {p: "به کړل شولو", f: "ba kRul shwulo"}], [{p: "به کړل شول", f: "ba kRul shwul"}]],
                    [[{p: "به کړل شوله", f: "ba kRul shwula"}], [{p: "به کړل شولې", f: "ba kRul shwule"}]],
                ],
            },
            modal: {
                nonImperative: {
                    long: [
                        [[{ p: "کړل کېدلی شم", f: "kRul kedúley shum" }, { p: "کړل کېدلای شم", f: "kRul kedúlaay shum" }], [{ p: "کړل کېدلی شو", f: "kRul kedúley shoo" }, { p: "کړل کېدلای شو", f: "kRul kedúlaay shoo" }]],
                        [[{ p: "کړل کېدلی شم", f: "kRul kedúley shum" }, { p: "کړل کېدلای شم", f: "kRul kedúlaay shum" }], [{ p: "کړل کېدلی شو", f: "kRul kedúley shoo" }, { p: "کړل کېدلای شو", f: "kRul kedúlaay shoo" }]],
                        [[{ p: "کړل کېدلی شې", f: "kRul kedúley she" }, { p: "کړل کېدلای شې", f: "kRul kedúlaay she" }], [{ p: "کړل کېدلی شئ", f: "kRul kedúley sheyy" }, { p: "کړل کېدلای شئ", f: "kRul kedúlaay sheyy" }]],
                        [[{ p: "کړل کېدلی شې", f: "kRul kedúley she" }, { p: "کړل کېدلای شې", f: "kRul kedúlaay she" }], [{ p: "کړل کېدلی شئ", f: "kRul kedúley sheyy" }, { p: "کړل کېدلای شئ", f: "kRul kedúlaay sheyy" }]],
                        [[{ p: "کړل کېدلی شي", f: "kRul kedúley shee" }, { p: "کړل کېدلای شي", f: "kRul kedúlaay shee" }], [{ p: "کړل کېدلی شي", f: "kRul kedúley shee" }, { p: "کړل کېدلای شي", f: "kRul kedúlaay shee" }]],
                        [[{ p: "کړل کېدلی شي", f: "kRul kedúley shee" }, { p: "کړل کېدلای شي", f: "kRul kedúlaay shee" }], [{ p: "کړل کېدلی شي", f: "kRul kedúley shee" }, { p: "کړل کېدلای شي", f: "kRul kedúlaay shee" }]],
                    ],
                    short: [
                        [[{ p: "کړل کېدی شم", f: "kRul kedéy shum" }, { p: "کړل کېدای شم", f: "kRul kedáay shum" }], [{ p: "کړل کېدی شو", f: "kRul kedéy shoo" }, { p: "کړل کېدای شو", f: "kRul kedáay shoo" }]],
                        [[{ p: "کړل کېدی شم", f: "kRul kedéy shum" }, { p: "کړل کېدای شم", f: "kRul kedáay shum" }], [{ p: "کړل کېدی شو", f: "kRul kedéy shoo" }, { p: "کړل کېدای شو", f: "kRul kedáay shoo" }]],
                        [[{ p: "کړل کېدی شې", f: "kRul kedéy she" }, { p: "کړل کېدای شې", f: "kRul kedáay she" }], [{ p: "کړل کېدی شئ", f: "kRul kedéy sheyy" }, { p: "کړل کېدای شئ", f: "kRul kedáay sheyy" }]],
                        [[{ p: "کړل کېدی شې", f: "kRul kedéy she" }, { p: "کړل کېدای شې", f: "kRul kedáay she" }], [{ p: "کړل کېدی شئ", f: "kRul kedéy sheyy" }, { p: "کړل کېدای شئ", f: "kRul kedáay sheyy" }]],
                        [[{ p: "کړل کېدی شي", f: "kRul kedéy shee" }, { p: "کړل کېدای شي", f: "kRul kedáay shee" }], [{ p: "کړل کېدی شي", f: "kRul kedéy shee" }, { p: "کړل کېدای شي", f: "kRul kedáay shee" }]],
                        [[{ p: "کړل کېدی شي", f: "kRul kedéy shee" }, { p: "کړل کېدای شي", f: "kRul kedáay shee" }], [{ p: "کړل کېدی شي", f: "kRul kedéy shee" }, { p: "کړل کېدای شي", f: "kRul kedáay shee" }]],
                    ],
                },
                future: {
                    long: [
                        [[{ p: "به کړل کېدلی شم", f: "ba kRul kedúley shum" }, { p: "به کړل کېدلای شم", f: "ba kRul kedúlaay shum" }], [{ p: "به کړل کېدلی شو", f: "ba kRul kedúley shoo" }, { p: "به کړل کېدلای شو", f: "ba kRul kedúlaay shoo" }]],
                        [[{ p: "به کړل کېدلی شم", f: "ba kRul kedúley shum" }, { p: "به کړل کېدلای شم", f: "ba kRul kedúlaay shum" }], [{ p: "به کړل کېدلی شو", f: "ba kRul kedúley shoo" }, { p: "به کړل کېدلای شو", f: "ba kRul kedúlaay shoo" }]],
                        [[{ p: "به کړل کېدلی شې", f: "ba kRul kedúley she" }, { p: "به کړل کېدلای شې", f: "ba kRul kedúlaay she" }], [{ p: "به کړل کېدلی شئ", f: "ba kRul kedúley sheyy" }, { p: "به کړل کېدلای شئ", f: "ba kRul kedúlaay sheyy" }]],
                        [[{ p: "به کړل کېدلی شې", f: "ba kRul kedúley she" }, { p: "به کړل کېدلای شې", f: "ba kRul kedúlaay she" }], [{ p: "به کړل کېدلی شئ", f: "ba kRul kedúley sheyy" }, { p: "به کړل کېدلای شئ", f: "ba kRul kedúlaay sheyy" }]],
                        [[{ p: "به کړل کېدلی شي", f: "ba kRul kedúley shee" }, { p: "به کړل کېدلای شي", f: "ba kRul kedúlaay shee" }], [{ p: "به کړل کېدلی شي", f: "ba kRul kedúley shee" }, { p: "به کړل کېدلای شي", f: "ba kRul kedúlaay shee" }]],
                        [[{ p: "به کړل کېدلی شي", f: "ba kRul kedúley shee" }, { p: "به کړل کېدلای شي", f: "ba kRul kedúlaay shee" }], [{ p: "به کړل کېدلی شي", f: "ba kRul kedúley shee" }, { p: "به کړل کېدلای شي", f: "ba kRul kedúlaay shee" }]],
                    ],
                    short: [
                        [[{ p: "به کړل کېدی شم", f: "ba kRul kedéy shum" }, { p: "به کړل کېدای شم", f: "ba kRul kedáay shum" }], [{ p: "به کړل کېدی شو", f: "ba kRul kedéy shoo" }, { p: "به کړل کېدای شو", f: "ba kRul kedáay shoo" }]],
                        [[{ p: "به کړل کېدی شم", f: "ba kRul kedéy shum" }, { p: "به کړل کېدای شم", f: "ba kRul kedáay shum" }], [{ p: "به کړل کېدی شو", f: "ba kRul kedéy shoo" }, { p: "به کړل کېدای شو", f: "ba kRul kedáay shoo" }]],
                        [[{ p: "به کړل کېدی شې", f: "ba kRul kedéy she" }, { p: "به کړل کېدای شې", f: "ba kRul kedáay she" }], [{ p: "به کړل کېدی شئ", f: "ba kRul kedéy sheyy" }, { p: "به کړل کېدای شئ", f: "ba kRul kedáay sheyy" }]],
                        [[{ p: "به کړل کېدی شې", f: "ba kRul kedéy she" }, { p: "به کړل کېدای شې", f: "ba kRul kedáay she" }], [{ p: "به کړل کېدی شئ", f: "ba kRul kedéy sheyy" }, { p: "به کړل کېدای شئ", f: "ba kRul kedáay sheyy" }]],
                        [[{ p: "به کړل کېدی شي", f: "ba kRul kedéy shee" }, { p: "به کړل کېدای شي", f: "ba kRul kedáay shee" }], [{ p: "به کړل کېدی شي", f: "ba kRul kedéy shee" }, { p: "به کړل کېدای شي", f: "ba kRul kedáay shee" }]],
                        [[{ p: "به کړل کېدی شي", f: "ba kRul kedéy shee" }, { p: "به کړل کېدای شي", f: "ba kRul kedáay shee" }], [{ p: "به کړل کېدی شي", f: "ba kRul kedéy shee" }, { p: "به کړل کېدای شي", f: "ba kRul kedáay shee" }]],
                    ],
                },
                past: {
                    long: [
                        [[{ p: "کړل کېدلی شوم", f: "kRul kedúley shwum" }, { p: "کړل کېدلای شوم", f: "kRul kedúlaay shwum" }], [{ p: "کړل کېدلی شو", f: "kRul kedúley shoo" }, { p: "کړل کېدلای شو", f: "kRul kedúlaay shoo" }]],
                        [[{ p: "کړل کېدلی شوم", f: "kRul kedúley shwum" }, { p: "کړل کېدلای شوم", f: "kRul kedúlaay shwum" }], [{ p: "کړل کېدلی شو", f: "kRul kedúley shoo" }, { p: "کړل کېدلای شو", f: "kRul kedúlaay shoo" }]],
                        [[{ p: "کړل کېدلی شوې", f: "kRul kedúley shwe" }, { p: "کړل کېدلای شوې", f: "kRul kedúlaay shwe" }], [{ p: "کړل کېدلی شوئ", f: "kRul kedúley shweyy" }, { p: "کړل کېدلای شوئ", f: "kRul kedúlaay shweyy" }]],
                        [[{ p: "کړل کېدلی شوې", f: "kRul kedúley shwe" }, { p: "کړل کېدلای شوې", f: "kRul kedúlaay shwe" }], [{ p: "کړل کېدلی شوئ", f: "kRul kedúley shweyy" }, { p: "کړل کېدلای شوئ", f: "kRul kedúlaay shweyy" }]],
                        [[{ p: "کړل کېدلی شو", f: "kRul kedúley sho" }, { p: "کړل کېدلای شو", f: "kRul kedúlaay sho" }], [{ p: "کړل کېدلی شول", f: "kRul kedúley shwul" }, { p: "کړل کېدلای شول", f: "kRul kedúlaay shwul" }, { p: "کړل کېدلی شو", f: "kRul kedúley shoo" }, { p: "کړل کېدلای شو", f: "kRul kedúlaay shoo" }]],
                        [[{ p: "کړل کېدلی شوه", f: "kRul kedúley shwa" }, { p: "کړل کېدلای شوه", f: "kRul kedúlaay shwa" }], [{ p: "کړل کېدلی شولې", f: "kRul kedúley shwule" }, { p: "کړل کېدلای شولې", f: "kRul kedúlaay shwule" }, { p: "کړل کېدلی شوې", f: "kRul kedúley shwe" }, { p: "کړل کېدلای شوې", f: "kRul kedúlaay shwe" }]],
                    ],
                    short: [
                        [[{ p: "کړل کېدی شوم", f: "kRul kedéy shwum" }, { p: "کړل کېدای شوم", f: "kRul kedáay shwum" }], [{ p: "کړل کېدی شو", f: "kRul kedéy shoo" }, { p: "کړل کېدای شو", f: "kRul kedáay shoo" }]],
                        [[{ p: "کړل کېدی شوم", f: "kRul kedéy shwum" }, { p: "کړل کېدای شوم", f: "kRul kedáay shwum" }], [{ p: "کړل کېدی شو", f: "kRul kedéy shoo" }, { p: "کړل کېدای شو", f: "kRul kedáay shoo" }]],
                        [[{ p: "کړل کېدی شوې", f: "kRul kedéy shwe" }, { p: "کړل کېدای شوې", f: "kRul kedáay shwe" }], [{ p: "کړل کېدی شوئ", f: "kRul kedéy shweyy" }, { p: "کړل کېدای شوئ", f: "kRul kedáay shweyy" }]],
                        [[{ p: "کړل کېدی شوې", f: "kRul kedéy shwe" }, { p: "کړل کېدای شوې", f: "kRul kedáay shwe" }], [{ p: "کړل کېدی شوئ", f: "kRul kedéy shweyy" }, { p: "کړل کېدای شوئ", f: "kRul kedáay shweyy" }]],
                        [[{ p: "کړل کېدی شو", f: "kRul kedéy sho" }, { p: "کړل کېدای شو", f: "kRul kedáay sho" }], [{ p: "کړل کېدی شول", f: "kRul kedéy shwul" }, { p: "کړل کېدای شول", f: "kRul kedáay shwul" }, { p: "کړل کېدی شو", f: "kRul kedéy shoo" }, { p: "کړل کېدای شو", f: "kRul kedáay shoo" }]],
                        [[{ p: "کړل کېدی شوه", f: "kRul kedéy shwa" }, { p: "کړل کېدای شوه", f: "kRul kedáay shwa" }], [{ p: "کړل کېدی شولې", f: "kRul kedéy shwule" }, { p: "کړل کېدای شولې", f: "kRul kedáay shwule" }, { p: "کړل کېدی شوې", f: "kRul kedéy shwe" }, { p: "کړل کېدای شوې", f: "kRul kedáay shwe" }]],
                    ],
                },
                habitualPast: {
                    long: [
                        [[{ p: "به کړل کېدلی شوم", f: "ba kRul kedúley shwum" }, { p: "به کړل کېدلای شوم", f: "ba kRul kedúlaay shwum" }], [{ p: "به کړل کېدلی شو", f: "ba kRul kedúley shoo" }, { p: "به کړل کېدلای شو", f: "ba kRul kedúlaay shoo" }]],
                        [[{ p: "به کړل کېدلی شوم", f: "ba kRul kedúley shwum" }, { p: "به کړل کېدلای شوم", f: "ba kRul kedúlaay shwum" }], [{ p: "به کړل کېدلی شو", f: "ba kRul kedúley shoo" }, { p: "به کړل کېدلای شو", f: "ba kRul kedúlaay shoo" }]],
                        [[{ p: "به کړل کېدلی شوې", f: "ba kRul kedúley shwe" }, { p: "به کړل کېدلای شوې", f: "ba kRul kedúlaay shwe" }], [{ p: "به کړل کېدلی شوئ", f: "ba kRul kedúley shweyy" }, { p: "به کړل کېدلای شوئ", f: "ba kRul kedúlaay shweyy" }]],
                        [[{ p: "به کړل کېدلی شوې", f: "ba kRul kedúley shwe" }, { p: "به کړل کېدلای شوې", f: "ba kRul kedúlaay shwe" }], [{ p: "به کړل کېدلی شوئ", f: "ba kRul kedúley shweyy" }, { p: "به کړل کېدلای شوئ", f: "ba kRul kedúlaay shweyy" }]],
                        [[{ p: "به کړل کېدلی شو", f: "ba kRul kedúley sho" }, { p: "به کړل کېدلای شو", f: "ba kRul kedúlaay sho" }], [{ p: "به کړل کېدلی شول", f: "ba kRul kedúley shwul" }, { p: "به کړل کېدلای شول", f: "ba kRul kedúlaay shwul" }, { p: "به کړل کېدلی شو", f: "ba kRul kedúley shoo" }, { p: "به کړل کېدلای شو", f: "ba kRul kedúlaay shoo" }]],
                        [[{ p: "به کړل کېدلی شوه", f: "ba kRul kedúley shwa" }, { p: "به کړل کېدلای شوه", f: "ba kRul kedúlaay shwa" }], [{ p: "به کړل کېدلی شولې", f: "ba kRul kedúley shwule" }, { p: "به کړل کېدلای شولې", f: "ba kRul kedúlaay shwule" }, { p: "به کړل کېدلی شوې", f: "ba kRul kedúley shwe" }, { p: "به کړل کېدلای شوې", f: "ba kRul kedúlaay shwe" }]],
                    ],
                    short: [
                        [[{ p: "به کړل کېدی شوم", f: "ba kRul kedéy shwum" }, { p: "به کړل کېدای شوم", f: "ba kRul kedáay shwum" }], [{ p: "به کړل کېدی شو", f: "ba kRul kedéy shoo" }, { p: "به کړل کېدای شو", f: "ba kRul kedáay shoo" }]],
                        [[{ p: "به کړل کېدی شوم", f: "ba kRul kedéy shwum" }, { p: "به کړل کېدای شوم", f: "ba kRul kedáay shwum" }], [{ p: "به کړل کېدی شو", f: "ba kRul kedéy shoo" }, { p: "به کړل کېدای شو", f: "ba kRul kedáay shoo" }]],
                        [[{ p: "به کړل کېدی شوې", f: "ba kRul kedéy shwe" }, { p: "به کړل کېدای شوې", f: "ba kRul kedáay shwe" }], [{ p: "به کړل کېدی شوئ", f: "ba kRul kedéy shweyy" }, { p: "به کړل کېدای شوئ", f: "ba kRul kedáay shweyy" }]],
                        [[{ p: "به کړل کېدی شوې", f: "ba kRul kedéy shwe" }, { p: "به کړل کېدای شوې", f: "ba kRul kedáay shwe" }], [{ p: "به کړل کېدی شوئ", f: "ba kRul kedéy shweyy" }, { p: "به کړل کېدای شوئ", f: "ba kRul kedáay shweyy" }]],
                        [[{ p: "به کړل کېدی شو", f: "ba kRul kedéy sho" }, { p: "به کړل کېدای شو", f: "ba kRul kedáay sho" }], [{ p: "به کړل کېدی شول", f: "ba kRul kedéy shwul" }, { p: "به کړل کېدای شول", f: "ba kRul kedáay shwul" }, { p: "به کړل کېدی شو", f: "ba kRul kedéy shoo" }, { p: "به کړل کېدای شو", f: "ba kRul kedáay shoo" }]],
                        [[{ p: "به کړل کېدی شوه", f: "ba kRul kedéy shwa" }, { p: "به کړل کېدای شوه", f: "ba kRul kedáay shwa" }], [{ p: "به کړل کېدی شولې", f: "ba kRul kedéy shwule" }, { p: "به کړل کېدای شولې", f: "ba kRul kedáay shwule" }, { p: "به کړل کېدی شوې", f: "ba kRul kedéy shwe" }, { p: "به کړل کېدای شوې", f: "ba kRul kedáay shwe" }]],
                    ],
                },
                hypotheticalPast: {
                    long: [
                        [[{ p: "کړل کېدلی شوای", f: "kRul kedúley shwaay" }, { p: "کړل کېدلی شوی", f: "kRul kedúley shwey" }, { p: "کړل کېدلای شوای", f: "kRul kedúlaay shwaay" }], [{ p: "کړل کېدلی شوای", f: "kRul kedúley shwaay" }, { p: "کړل کېدلی شوی", f: "kRul kedúley shwey" }, { p: "کړل کېدای شوی", f: "kRul kedúlaay shwey" }]],   
                        [[{ p: "کړل کېدلی شوای", f: "kRul kedúley shwaay" }, { p: "کړل کېدلی شوی", f: "kRul kedúley shwey" }, { p: "کړل کېدلای شوای", f: "kRul kedúlaay shwaay" }], [{ p: "کړل کېدلی شوای", f: "kRul kedúley shwaay" }, { p: "کړل کېدلی شوی", f: "kRul kedúley shwey" }, { p: "کړل کېدای شوی", f: "kRul kedúlaay shwey" }]],   
                        [[{ p: "کړل کېدلی شوای", f: "kRul kedúley shwaay" }, { p: "کړل کېدلی شوی", f: "kRul kedúley shwey" }, { p: "کړل کېدلای شوای", f: "kRul kedúlaay shwaay" }], [{ p: "کړل کېدلی شوای", f: "kRul kedúley shwaay" }, { p: "کړل کېدلی شوی", f: "kRul kedúley shwey" }, { p: "کړل کېدای شوی", f: "kRul kedúlaay shwey" }]],   
                        [[{ p: "کړل کېدلی شوای", f: "kRul kedúley shwaay" }, { p: "کړل کېدلی شوی", f: "kRul kedúley shwey" }, { p: "کړل کېدلای شوای", f: "kRul kedúlaay shwaay" }], [{ p: "کړل کېدلی شوای", f: "kRul kedúley shwaay" }, { p: "کړل کېدلی شوی", f: "kRul kedúley shwey" }, { p: "کړل کېدای شوی", f: "kRul kedúlaay shwey" }]],   
                        [[{ p: "کړل کېدلی شوای", f: "kRul kedúley shwaay" }, { p: "کړل کېدلی شوی", f: "kRul kedúley shwey" }, { p: "کړل کېدلای شوای", f: "kRul kedúlaay shwaay" }], [{ p: "کړل کېدلی شوای", f: "kRul kedúley shwaay" }, { p: "کړل کېدلی شوی", f: "kRul kedúley shwey" }, { p: "کړل کېدای شوی", f: "kRul kedúlaay shwey" }]],   
                        [[{ p: "کړل کېدلی شوای", f: "kRul kedúley shwaay" }, { p: "کړل کېدلی شوی", f: "kRul kedúley shwey" }, { p: "کړل کېدلای شوای", f: "kRul kedúlaay shwaay" }], [{ p: "کړل کېدلی شوای", f: "kRul kedúley shwaay" }, { p: "کړل کېدلی شوی", f: "kRul kedúley shwey" }, { p: "کړل کېدای شوی", f: "kRul kedúlaay shwey" }]],
                    ],   
                    short: [
                        [[{ p: "کړل کېدی شوای", f: "kRul kedéy shwaay" }, { p: "کړل کېدی شوی", f: "kRul kedéy shwey" }, { p: "کړل کېدای شوی", f: "kRul kedáay shwey" }], [{ p: "کړل کېدی شوای", f: "kRul kedéy shwaay" }, { p: "کړل کېدی شوی", f: "kRul kedéy shwey" }, { p: "کړل کېدای شوی", f: "kRul kedáay shwey" }]],   
                        [[{ p: "کړل کېدی شوای", f: "kRul kedéy shwaay" }, { p: "کړل کېدی شوی", f: "kRul kedéy shwey" }, { p: "کړل کېدای شوی", f: "kRul kedáay shwey" }], [{ p: "کړل کېدی شوای", f: "kRul kedéy shwaay" }, { p: "کړل کېدی شوی", f: "kRul kedéy shwey" }, { p: "کړل کېدای شوی", f: "kRul kedáay shwey" }]],   
                        [[{ p: "کړل کېدی شوای", f: "kRul kedéy shwaay" }, { p: "کړل کېدی شوی", f: "kRul kedéy shwey" }, { p: "کړل کېدای شوی", f: "kRul kedáay shwey" }], [{ p: "کړل کېدی شوای", f: "kRul kedéy shwaay" }, { p: "کړل کېدی شوی", f: "kRul kedéy shwey" }, { p: "کړل کېدای شوی", f: "kRul kedáay shwey" }]],   
                        [[{ p: "کړل کېدی شوای", f: "kRul kedéy shwaay" }, { p: "کړل کېدی شوی", f: "kRul kedéy shwey" }, { p: "کړل کېدای شوی", f: "kRul kedáay shwey" }], [{ p: "کړل کېدی شوای", f: "kRul kedéy shwaay" }, { p: "کړل کېدی شوی", f: "kRul kedéy shwey" }, { p: "کړل کېدای شوی", f: "kRul kedáay shwey" }]],   
                        [[{ p: "کړل کېدی شوای", f: "kRul kedéy shwaay" }, { p: "کړل کېدی شوی", f: "kRul kedéy shwey" }, { p: "کړل کېدای شوی", f: "kRul kedáay shwey" }], [{ p: "کړل کېدی شوای", f: "kRul kedéy shwaay" }, { p: "کړل کېدی شوی", f: "kRul kedéy shwey" }, { p: "کړل کېدای شوی", f: "kRul kedáay shwey" }]],   
                        [[{ p: "کړل کېدی شوای", f: "kRul kedéy shwaay" }, { p: "کړل کېدی شوی", f: "kRul kedéy shwey" }, { p: "کړل کېدای شوی", f: "kRul kedáay shwey" }], [{ p: "کړل کېدی شوای", f: "kRul kedéy shwaay" }, { p: "کړل کېدی شوی", f: "kRul kedéy shwey" }, { p: "کړل کول کېدای شوی", f: "kRul kedáay shwey" }]],
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
            [[{ p: "تللی شم", f: "tlúley shum" }, { p: "تللای شم", f: "tlúlaay shum" }], [{ p: "تللی شو", f: "tlúley shoo" }, { p: "تللای شو", f: "tlúlaay shoo" }]],
            [[{ p: "تللی شم", f: "tlúley shum" }, { p: "تللای شم", f: "tlúlaay shum" }], [{ p: "تللی شو", f: "tlúley shoo" }, { p: "تللای شو", f: "tlúlaay shoo" }]],
            [[{ p: "تللی شې", f: "tlúley she" }, { p: "تللای شې", f: "tlúlaay she" }], [{ p: "تللی شئ", f: "tlúley sheyy" }, { p: "تللای شئ", f: "tlúlaay sheyy" }]],
            [[{ p: "تللی شې", f: "tlúley she" }, { p: "تللای شې", f: "tlúlaay she" }], [{ p: "تللی شئ", f: "tlúley sheyy" }, { p: "تللای شئ", f: "tlúlaay sheyy" }]],
            [[{ p: "تللی شي", f: "tlúley shee" }, { p: "تللای شي", f: "tlúlaay shee" }], [{ p: "تللی شي", f: "tlúley shee" }, { p: "تللای شي", f: "tlúlaay shee" }]],
            [[{ p: "تللی شي", f: "tlúley shee" }, { p: "تللای شي", f: "tlúlaay shee" }], [{ p: "تللی شي", f: "tlúley shee" }, { p: "تللای شي", f: "tlúlaay shee" }]],
        ],
        short: [
            [[{ p: "تلی شم", f: "tléy shum" }, { p: "تلای شم", f: "tlaay shum" }], [{ p: "تلی شو", f: "tléy shoo" }, { p: "تلای شو", f: "tlaay shoo" }]],
            [[{ p: "تلی شم", f: "tléy shum" }, { p: "تلای شم", f: "tlaay shum" }], [{ p: "تلی شو", f: "tléy shoo" }, { p: "تلای شو", f: "tlaay shoo" }]],
            [[{ p: "تلی شې", f: "tléy she" }, { p: "تلای شې", f: "tlaay she" }], [{ p: "تلی شئ", f: "tléy sheyy" }, { p: "تلای شئ", f: "tlaay sheyy" }]],
            [[{ p: "تلی شې", f: "tléy she" }, { p: "تلای شې", f: "tlaay she" }], [{ p: "تلی شئ", f: "tléy sheyy" }, { p: "تلای شئ", f: "tlaay sheyy" }]],
            [[{ p: "تلی شي", f: "tléy shee" }, { p: "تلای شي", f: "tlaay shee" }], [{ p: "تلی شي", f: "tléy shee" }, { p: "تلای شي", f: "tlaay shee" }]],
            [[{ p: "تلی شي", f: "tléy shee" }, { p: "تلای شي", f: "tlaay shee" }], [{ p: "تلی شي", f: "tléy shee" }, { p: "تلای شي", f: "tlaay shee" }]],
        ],
    },
    future: {
        long: [
            [[{ p: "به تللی شم", f: "ba tlúley shum" }, { p: "به تللای شم", f: "ba tlúlaay shum" }], [{ p: "به تللی شو", f: "ba tlúley shoo" }, { p: "به تللای شو", f: "ba tlúlaay shoo" }]],
            [[{ p: "به تللی شم", f: "ba tlúley shum" }, { p: "به تللای شم", f: "ba tlúlaay shum" }], [{ p: "به تللی شو", f: "ba tlúley shoo" }, { p: "به تللای شو", f: "ba tlúlaay shoo" }]],
            [[{ p: "به تللی شې", f: "ba tlúley she" }, { p: "به تللای شې", f: "ba tlúlaay she" }], [{ p: "به تللی شئ", f: "ba tlúley sheyy" }, { p: "به تللای شئ", f: "ba tlúlaay sheyy" }]],
            [[{ p: "به تللی شې", f: "ba tlúley she" }, { p: "به تللای شې", f: "ba tlúlaay she" }], [{ p: "به تللی شئ", f: "ba tlúley sheyy" }, { p: "به تللای شئ", f: "ba tlúlaay sheyy" }]],
            [[{ p: "به تللی شي", f: "ba tlúley shee" }, { p: "به تللای شي", f: "ba tlúlaay shee" }], [{ p: "به تللی شي", f: "ba tlúley shee" }, { p: "به تللای شي", f: "ba tlúlaay shee" }]],
            [[{ p: "به تللی شي", f: "ba tlúley shee" }, { p: "به تللای شي", f: "ba tlúlaay shee" }], [{ p: "به تللی شي", f: "ba tlúley shee" }, { p: "به تللای شي", f: "ba tlúlaay shee" }]],
        ],
        short: [
            [[{ p: "به تلی شم", f: "ba tléy shum" }, { p: "به تلای شم", f: "ba tlaay shum" }], [{ p: "به تلی شو", f: "ba tléy shoo" }, { p: "به تلای شو", f: "ba tlaay shoo" }]],
            [[{ p: "به تلی شم", f: "ba tléy shum" }, { p: "به تلای شم", f: "ba tlaay shum" }], [{ p: "به تلی شو", f: "ba tléy shoo" }, { p: "به تلای شو", f: "ba tlaay shoo" }]],
            [[{ p: "به تلی شې", f: "ba tléy she" }, { p: "به تلای شې", f: "ba tlaay she" }], [{ p: "به تلی شئ", f: "ba tléy sheyy" }, { p: "به تلای شئ", f: "ba tlaay sheyy" }]],
            [[{ p: "به تلی شې", f: "ba tléy she" }, { p: "به تلای شې", f: "ba tlaay she" }], [{ p: "به تلی شئ", f: "ba tléy sheyy" }, { p: "به تلای شئ", f: "ba tlaay sheyy" }]],
            [[{ p: "به تلی شي", f: "ba tléy shee" }, { p: "به تلای شي", f: "ba tlaay shee" }], [{ p: "به تلی شي", f: "ba tléy shee" }, { p: "به تلای شي", f: "ba tlaay shee" }]],
            [[{ p: "به تلی شي", f: "ba tléy shee" }, { p: "به تلای شي", f: "ba tlaay shee" }], [{ p: "به تلی شي", f: "ba tléy shee" }, { p: "به تلای شي", f: "ba tlaay shee" }]],
        ],
    },
    past: {
        long: [
            [[{ p: "تللی شوم", f: "tlúley shwum" }, { p: "تللای شوم", f: "tlúlaay shwum" }], [{ p: "تللی شو", f: "tlúley shoo" }, { p: "تللای شو", f: "tlúlaay shoo" }]],
            [[{ p: "تللی شوم", f: "tlúley shwum" }, { p: "تللای شوم", f: "tlúlaay shwum" }], [{ p: "تللی شو", f: "tlúley shoo" }, { p: "تللای شو", f: "tlúlaay shoo" }]],
            [[{ p: "تللی شوې", f: "tlúley shwe" }, { p: "تللای شوې", f: "tlúlaay shwe" }], [{ p: "تللی شوئ", f: "tlúley shweyy" }, { p: "تللای شوئ", f: "tlúlaay shweyy" }]],
            [[{ p: "تللی شوې", f: "tlúley shwe" }, { p: "تللای شوې", f: "tlúlaay shwe" }], [{ p: "تللی شوئ", f: "tlúley shweyy" }, { p: "تللای شوئ", f: "tlúlaay shweyy" }]],
            [[{ p: "تللی شو", f: "tlúley sho" }, { p: "تللای شو", f: "tlúlaay sho" }], [{ p: "تللی شول", f: "tlúley shwul" }, { p: "تللای شول", f: "tlúlaay shwul" }, { p: "تللی شو", f: "tlúley shoo" }, { p: "تللای شو", f: "tlúlaay shoo" }]],
            [[{ p: "تللی شوه", f: "tlúley shwa" }, { p: "تللای شوه", f: "tlúlaay shwa" }], [{ p: "تللی شولې", f: "tlúley shwule" }, { p: "تللای شولې", f: "tlúlaay shwule" }, { p: "تللی شوې", f: "tlúley shwe" }, { p: "تللای شوې", f: "tlúlaay shwe" }]],
        ],
        short: [
            [[{ p: "تلی شوم", f: "tléy shwum" }, { p: "تلای شوم", f: "tláay shwum" }], [{ p: "تلای شو", f: "tléy shoo" }, { p: "تلاای شو", f: "tláay shoo" }]],
            [[{ p: "تلی شوم", f: "tléy shwum" }, { p: "تلای شوم", f: "tláay shwum" }], [{ p: "تلی شو", f: "tléy shoo" }, { p: "تلای شو", f: "tláay shoo" }]],
            [[{ p: "تلی شوې", f: "tléy shwe" }, { p: "تلای شوې", f: "tláay shwe" }], [{ p: "تلی شوئ", f: "tléy shweyy" }, { p: "تلای شوئ", f: "tláay shweyy" }]],
            [[{ p: "تلی شوې", f: "tléy shwe" }, { p: "تلای شوې", f: "tláay shwe" }], [{ p: "تلی شوئ", f: "tléy shweyy" }, { p: "تلای شوئ", f: "tláay shweyy" }]],
            [[{ p: "تلی شو", f: "tléy sho" }, { p: "تلای شو", f: "tláay sho" }], [{ p: "تلی شول", f: "tléy shwul" }, { p: "تلای شول", f: "tláay shwul" }, { p: "تلی شو", f: "tléy shoo" }, { p: "تلای شو", f: "tláay shoo" }]],
            [[{ p: "تلی شوه", f: "tléy shwa" }, { p: "تلای شوه", f: "tláay shwa" }], [{ p: "تلی شولې", f: "tléy shwule" }, { p: "تلای شولې", f: "tláay shwule" }, { p: "تلی شوې", f: "tléy shwe" }, { p: "تلای شوې", f: "tláay shwe" }]],
        ],
    },
    habitualPast: {
        long: [
            [[{ p: "به تللی شوم", f: "ba tlúley shwum" }, { p: "به تللای شوم", f: "ba tlúlaay shwum" }], [{ p: "به تللی شو", f: "ba tlúley shoo" }, { p: "به تللای شو", f: "ba tlúlaay shoo" }]],
            [[{ p: "به تللی شوم", f: "ba tlúley shwum" }, { p: "به تللای شوم", f: "ba tlúlaay shwum" }], [{ p: "به تللی شو", f: "ba tlúley shoo" }, { p: "به تللای شو", f: "ba tlúlaay shoo" }]],
            [[{ p: "به تللی شوې", f: "ba tlúley shwe" }, { p: "به تللای شوې", f: "ba tlúlaay shwe" }], [{ p: "به تللی شوئ", f: "ba tlúley shweyy" }, { p: "به تللای شوئ", f: "ba tlúlaay shweyy" }]],
            [[{ p: "به تللی شوې", f: "ba tlúley shwe" }, { p: "به تللای شوې", f: "ba tlúlaay shwe" }], [{ p: "به تللی شوئ", f: "ba tlúley shweyy" }, { p: "به تللای شوئ", f: "ba tlúlaay shweyy" }]],
            [[{ p: "به تللی شو", f: "ba tlúley sho" }, { p: "به تللای شو", f: "ba tlúlaay sho" }], [{ p: "به تللی شول", f: "ba tlúley shwul" }, { p: "به تللای شول", f: "ba tlúlaay shwul" }, { p: "به تللی شو", f: "ba tlúley shoo" }, { p: "به تللای شو", f: "ba tlúlaay shoo" }]],
            [[{ p: "به تللی شوه", f: "ba tlúley shwa" }, { p: "به تللای شوه", f: "ba tlúlaay shwa" }], [{ p: "به تللی شولې", f: "ba tlúley shwule" }, { p: "به تللای شولې", f: "ba tlúlaay shwule" }, { p: "به تللی شوې", f: "ba tlúley shwe" }, { p: "به تللای شوې", f: "ba tlúlaay shwe" }]],
        ],
        short: [
            [[{ p: "به تلی شوم", f: "ba tléy shwum" }, { p: "به تلای شوم", f: "ba tláay shwum" }], [{ p: "به تلای شو", f: "ba tléy shoo" }, { p: "به تلاای شو", f: "ba tláay shoo" }]],
            [[{ p: "به تلی شوم", f: "ba tléy shwum" }, { p: "به تلای شوم", f: "ba tláay shwum" }], [{ p: "به تلی شو", f: "ba tléy shoo" }, { p: "به تلای شو", f: "ba tláay shoo" }]],
            [[{ p: "به تلی شوې", f: "ba tléy shwe" }, { p: "به تلای شوې", f: "ba tláay shwe" }], [{ p: "به تلی شوئ", f: "ba tléy shweyy" }, { p: "به تلای شوئ", f: "ba tláay shweyy" }]],
            [[{ p: "به تلی شوې", f: "ba tléy shwe" }, { p: "به تلای شوې", f: "ba tláay shwe" }], [{ p: "به تلی شوئ", f: "ba tléy shweyy" }, { p: "به تلای شوئ", f: "ba tláay shweyy" }]],
            [[{ p: "به تلی شو", f: "ba tléy sho" }, { p: "به تلای شو", f: "ba tláay sho" }], [{ p: "به تلی شول", f: "ba tléy shwul" }, { p: "به تلای شول", f: "ba tláay shwul" }, { p: "به تلی شو", f: "ba tléy shoo" }, { p: "به تلای شو", f: "ba tláay shoo" }]],
            [[{ p: "به تلی شوه", f: "ba tléy shwa" }, { p: "به تلای شوه", f: "ba tláay shwa" }], [{ p: "به تلی شولې", f: "ba tléy shwule" }, { p: "به تلای شولې", f: "ba tláay shwule" }, { p: "به تلی شوې", f: "ba tléy shwe" }, { p: "به تلای شوې", f: "ba tláay shwe" }]],
        ],
    },
    hypotheticalPast: {
        long: [
            [[{ p: "تللی شوای", f: "tlúley shwaay" }, { p: "تللی شوی", f: "tlúley shwey" }, { p: "تللای شوای", f: "tlúlaay shwaay" }], [{ p: "تللی شوای", f: "tlúley shwaay" }, { p: "تللی شوی", f: "tlúley shwey" }, { p: "تللی شوای", f: "tlúlaay shwaay" }]],   
            [[{ p: "تللی شوای", f: "tlúley shwaay" }, { p: "تللی شوی", f: "tlúley shwey" }, { p: "تللای شوای", f: "tlúlaay shwaay" }], [{ p: "تللی شوای", f: "tlúley shwaay" }, { p: "تللی شوی", f: "tlúley shwey" }, { p: "تللی شوای", f: "tlúlaay shwaay" }]],   
            [[{ p: "تللی شوای", f: "tlúley shwaay" }, { p: "تللی شوی", f: "tlúley shwey" }, { p: "تللای شوای", f: "tlúlaay shwaay" }], [{ p: "تللی شوای", f: "tlúley shwaay" }, { p: "تللی شوی", f: "tlúley shwey" }, { p: "تللی شوای", f: "tlúlaay shwaay" }]],   
            [[{ p: "تللی شوای", f: "tlúley shwaay" }, { p: "تللی شوی", f: "tlúley shwey" }, { p: "تللای شوای", f: "tlúlaay shwaay" }], [{ p: "تللی شوای", f: "tlúley shwaay" }, { p: "تللی شوی", f: "tlúley shwey" }, { p: "تللی شوای", f: "tlúlaay shwaay" }]],   
            [[{ p: "تللی شوای", f: "tlúley shwaay" }, { p: "تللی شوی", f: "tlúley shwey" }, { p: "تللای شوای", f: "tlúlaay shwaay" }], [{ p: "تللی شوای", f: "tlúley shwaay" }, { p: "تللی شوی", f: "tlúley shwey" }, { p: "تللی شوای", f: "tlúlaay shwaay" }]],   
            [[{ p: "تللی شوای", f: "tlúley shwaay" }, { p: "تللی شوی", f: "tlúley shwey" }, { p: "تللای شوای", f: "tlúlaay shwaay" }], [{ p: "تللی شوای", f: "tlúley shwaay" }, { p: "تللی شوی", f: "tlúley shwey" }, { p: "تللی شوای", f: "tlúlaay shwaay" }]],
        ],   
        short: [
            [[{ p: "تلی شوای", f: "tléy shwaay" }, { p: "تلی شوی", f: "tléy shwey" }, { p: "تلی شوای", f: "tláay shwaay" }], [{ p: "تلی شوای", f: "tléy shwaay" }, { p: "تلی شوی", f: "tléy shwey" }, { p: "تلی شوای", f: "tláay shwaay" }]],   
            [[{ p: "تلی شوای", f: "tléy shwaay" }, { p: "تلی شوی", f: "tléy shwey" }, { p: "تلی شوای", f: "tláay shwaay" }], [{ p: "تلی شوای", f: "tléy shwaay" }, { p: "تلی شوی", f: "tléy shwey" }, { p: "تلی شوای", f: "tláay shwaay" }]],   
            [[{ p: "تلی شوای", f: "tléy shwaay" }, { p: "تلی شوی", f: "tléy shwey" }, { p: "تلی شوای", f: "tláay shwaay" }], [{ p: "تلی شوای", f: "tléy shwaay" }, { p: "تلی شوی", f: "tléy shwey" }, { p: "تلی شوای", f: "tláay shwaay" }]],   
            [[{ p: "تلی شوای", f: "tléy shwaay" }, { p: "تلی شوی", f: "tléy shwey" }, { p: "تلی شوای", f: "tláay shwaay" }], [{ p: "تلی شوای", f: "tléy shwaay" }, { p: "تلی شوی", f: "tléy shwey" }, { p: "تلی شوای", f: "tláay shwaay" }]],   
            [[{ p: "تلی شوای", f: "tléy shwaay" }, { p: "تلی شوی", f: "tléy shwey" }, { p: "تلی شوای", f: "tláay shwaay" }], [{ p: "تلی شوای", f: "tléy shwaay" }, { p: "تلی شوی", f: "tléy shwey" }, { p: "تلی شوای", f: "tláay shwaay" }]],   
            [[{ p: "تلی شوای", f: "tléy shwaay" }, { p: "تلی شوی", f: "tléy shwey" }, { p: "تلی شوای", f: "tláay shwaay" }], [{ p: "تلی شوای", f: "tléy shwaay" }, { p: "تلی شوی", f: "tléy shwey" }, { p: "تلی شوای", f: "tláay shwaay" }]],
        ],   
    },
}

export const tlul: T.VerbConjugation = {
    info: {
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
                mascSing: [{ p: "لاړ ", f: "láaR " }, { p: "ش", f: "sh" }],
                mascPlur: [{ p: "لاړ ", f: "láaR " }, { p: "ش", f: "sh" }],
                femSing: [{ p: "لاړه ", f: "láaRa " }, { p: "ش", f: "sh" }],
                femPlur: [{ p: "لاړې ", f: "láaRe " }, { p: "ش", f: "sh" }],
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
                long: [{ p: "لا", f: "láa" }, { p: "ړل", f: "Rul" }],
                short: [{ p: "لا", f: "láa" }, { p: "ړ", f: "R" }],
            },
        },
        participle: {
            present: { p: "تلونکی", f: "tlóonkey" },
            past: {
                long: { p: "تللی", f: "tlúley" },
                short: { p: "تلی", f: "túley" },
            }
        },
    },
    imperfective: {
        nonImperative: [
            [[{p: "ځم", f: "dzum"}], [{p: "ځو", f: "dzoo"}]],
            [[{p: "ځم", f: "dzum"}], [{p: "ځو", f: "dzoo"}]],
            [[{p: "ځې", f: "dze"}], [{p: "ځئ", f: "dzeyy"}]],
            [[{p: "ځې", f: "dze"}], [{p: "ځئ", f: "dzeyy"}]],
            [[{p: "ځي", f: "dzee"}], [{p: "ځي", f: "dzee"}]],
            [[{p: "ځي", f: "dzee"}], [{p: "ځي", f: "dzee"}]],
        ],
        future: [
            [[{p: "به ځم", f: "ba dzum"}], [{p: "به ځو", f: "ba dzoo"}]],
            [[{p: "به ځم", f: "ba dzum"}], [{p: "به ځو", f: "ba dzoo"}]],
            [[{p: "به ځې", f: "ba dze"}], [{p: "به ځئ", f: "ba dzeyy"}]],
            [[{p: "به ځې", f: "ba dze"}], [{p: "به ځئ", f: "ba dzeyy"}]],
            [[{p: "به ځي", f: "ba dzee"}], [{p: "به ځي", f: "ba dzee"}]],
            [[{p: "به ځي", f: "ba dzee"}], [{p: "به ځي", f: "ba dzee"}]],
        ],
        imperative: [
            [[{ p: "ځه", f: "dza" }], [{ p: "ځئ", f: "dzeyy" }]],
            [[{ p: "ځه", f: "dza" }], [{ p: "ځئ", f: "dzeyy" }]]
        ],
        past: {
            short: [
                [[{p: "تلم", f: "tlum"}], [{p: "تلو", f: "tloo"}]],
                [[{p: "تلم", f: "tlum"}], [{p: "تلو", f: "tloo"}]],
                [[{p: "تلې", f: "tle"}], [{p: "تلئ", f: "tleyy"}]],
                [[{p: "تلې", f: "tle"}], [{p: "تلئ", f: "tleyy"}]],
                [[{p: "تله", f: "tlu"}, {p: "تلو", f: "tlo"}, { p: "ته", f: "tu" }], [{p: "تلل", f: "tlul"}]],
                [[{p: "تله", f: "tla"}], [{p: "تلې", f: "tle"}]],
            ],
            long: [
                [[{p: "تللم", f: "tlulum"}], [{p: "تللو", f: "tluloo"}]],
                [[{p: "تللم", f: "tlulum"}], [{p: "تللو", f: "tluloo"}]],
                [[{p: "تللې", f: "tlule"}], [{p: "تللئ", f: "tluleyy"}]],
                [[{p: "تللې", f: "tlule"}], [{p: "تللئ", f: "tluleyy"}]],
                [[{p: "تلله", f: "tlulu"}, {p: "تللو", f: "tlulo"}], [{p: "تلل", f: "tlul"}]],
                [[{p: "تلله", f: "tlula"}], [{p: "تللې", f: "tlule"}]],
            ],
        },
        habitualPast: {
            short: [
                [[{p: "به تلم", f: "ba tlum"}], [{p: "به تلو", f: "ba tloo"}]],
                [[{p: "به تلم", f: "ba tlum"}], [{p: "به تلو", f: "ba tloo"}]],
                [[{p: "به تلې", f: "ba tle"}], [{p: "به تلئ", f: "ba tleyy"}]],
                [[{p: "به تلې", f: "ba tle"}], [{p: "به تلئ", f: "ba tleyy"}]],
                [[{p: "به تله", f: "ba tlu"}, {p: "به تلو", f: "ba tlo"}, { p: "به ته", f: "ba tu" }], [{p: "به تلل", f: "ba tlul"}]],
                [[{p: "به تله", f: "ba tla"}], [{p: "به تلې", f: "ba tle"}]],
            ],
            long: [
                [[{p: "به تللم", f: "ba tlulum"}], [{p: "به تللو", f: "ba tluloo"}]],
                [[{p: "به تللم", f: "ba tlulum"}], [{p: "به تللو", f: "ba tluloo"}]],
                [[{p: "به تللې", f: "ba tlule"}], [{p: "به تللئ", f: "ba tluleyy"}]],
                [[{p: "به تللې", f: "ba tlule"}], [{p: "به تللئ", f: "ba tluleyy"}]],
                [[{p: "به تلله", f: "ba tlulu"}, {p: "به تللو", f: "ba tlulo"}], [{p: "به تلل", f: "ba tlul"}]],
                [[{p: "به تلله", f: "ba tlula"}], [{p: "به تللې", f: "ba tlule"}]],
            ],
        },
        modal: tlulModal,
    },
    perfective: {
        nonImperative: [
            [[{p: "لاړ شم", f: "láaR shum"}], [{p: "لاړ شو", f: "láaR shoo"}]],
            [[{p: "لاړه شم", f: "láaRa shum"}], [{p: "لاړې شو", f: "láaRe shoo"}]],
            [[{p: "لاړ شې", f: "láaR she"}], [{p: "لاړ شئ", f: "láaR sheyy"}]],
            [[{p: "لاړه شې", f: "láaRa she"}], [{p: "لاړې شئ", f: "láaRe sheyy"}]],
            [[{p: "لاړ شي", f: "láaR shee"}], [{p: "لاړ شي", f: "láaR shee"}]],
            [[{p: "لاړه شي", f: "láaRa shee"}], [{p: "لاړې شي", f: "láaRe shee"}]],
        ],
        future: [
            [[{p: "به لاړ شم", f: "ba láaR shum"}], [{p: "به لاړ شو", f: "ba láaR shoo"}]],
            [[{p: "به لاړه شم", f: "ba láaRa shum"}], [{p: "به لاړې شو", f: "ba láaRe shoo"}]],
            [[{p: "به لاړ شې", f: "ba láaR she"}], [{p: "به لاړ شئ", f: "ba láaR sheyy"}]],
            [[{p: "به لاړه شې", f: "ba láaRa she"}], [{p: "به لاړې شئ", f: "ba láaRe sheyy"}]],
            [[{p: "به لاړ شي", f: "ba láaR shee"}], [{p: "به لاړ شي", f: "ba láaR shee"}]],
            [[{p: "به لاړه شي", f: "ba láaRa shee"}], [{p: "به لاړې شي", f: "ba láaRe shee"}]],
        ],
        imperative: [
            [[{ p: "لاړ شه", f: "láaR sha" }], [{ p: "لاړ شئ", f: "láaR sheyy" }]],
            [[{ p: "لاړه شه", f: "láaRa sha" }], [{ p: "لاړې شئ", f: "láaRe sheyy" }]],
        ],
        past: {
            short: [
                [[{p: "لاړم", f: "láaRum"}], [{p: "لاړو", f: "láaRoo"}]],
                [[{p: "لاړم", f: "láaRum"}], [{p: "لاړو", f: "láaRoo"}]],
                [[{p: "لاړې", f: "láaRe"}], [{p: "لاړئ", f: "láaReyy"}]],
                [[{p: "لاړې", f: "láaRe"}], [{p: "لاړئ", f: "láaReyy"}]],
                [[{p: "لاړه", f: "láaRu"}, {p: "لاړو", f: "láaRo"}, { p: "لاړ", f: "láaR" }], [{p: "لاړل", f: "láaRul"}]],
                [[{p: "لاړه", f: "láaRa"}], [{p: "لاړې", f: "láaRe"}]],
            ],
            long: [
                [[{p: "لاړلم", f: "láaRulum"}], [{p: "لاړلو", f: "láaRuloo"}]],
                [[{p: "لاړلم", f: "láaRulum"}], [{p: "لاړلو", f: "láaRuloo"}]],
                [[{p: "لاړلې", f: "láaRule"}], [{p: "لاړلئ", f: "láaRuleyy"}]],
                [[{p: "لاړلې", f: "láaRule"}], [{p: "لاړلئ", f: "láaRuleyy"}]],
                [[{p: "لاړله", f: "láaRulu"}, {p: "لاړلو", f: "láaRulo"}], [{p: "لاړل", f: "láaRul"}]],
                [[{p: "لاړله", f: "láaRula"}], [{p: "لاړلې", f: "láaRule"}]],
            ],
        },
        habitualPast: {
            short: [
                [[{p: "به لاړم", f: "ba láaRum"}], [{p: "به لاړو", f: "ba láaRoo"}]],
                [[{p: "به لاړم", f: "ba láaRum"}], [{p: "به لاړو", f: "ba láaRoo"}]],
                [[{p: "به لاړې", f: "ba láaRe"}], [{p: "به لاړئ", f: "ba láaReyy"}]],
                [[{p: "به لاړې", f: "ba láaRe"}], [{p: "به لاړئ", f: "ba láaReyy"}]],
                [[{p: "به لاړه", f: "ba láaRu"}, {p: "به لاړو", f: "ba láaRo"}, { p: "به لاړ", f: "ba láaR" }], [{p: "به لاړل", f: "ba láaRul"}]],
                [[{p: "به لاړه", f: "ba láaRa"}], [{p: "به لاړې", f: "ba láaRe"}]],
            ],
            long: [
                [[{p: "به لاړلم", f: "ba láaRulum"}], [{p: "به لاړلو", f: "ba láaRuloo"}]],
                [[{p: "به لاړلم", f: "ba láaRulum"}], [{p: "به لاړلو", f: "ba láaRuloo"}]],
                [[{p: "به لاړلې", f: "ba láaRule"}], [{p: "به لاړلئ", f: "ba láaRuleyy"}]],
                [[{p: "به لاړلې", f: "ba láaRule"}], [{p: "به لاړلئ", f: "ba láaRuleyy"}]],
                [[{p: "به لاړله", f: "ba láaRulu"}, {p: "به لاړلو", f: "ba láaRulo"}], [{p: "به لاړل", f: "ba láaRul"}]],
                [[{p: "به لاړله", f: "ba láaRula"}], [{p: "به لاړلې", f: "ba láaRule"}]],
            ],
        },
        modal: tlulModal,
    },
    hypothetical: {
        short: [
            [[{ p: "تلای", f: "túlaay" }, { p: "تلی", f: "túley" }], [{ p: "تلای", f: "túlaay" }, { p: "تلی", f: "túley" }]],
            [[{ p: "تلای", f: "túlaay" }, { p: "تلی", f: "túley" }], [{ p: "تلای", f: "túlaay" }, { p: "تلی", f: "túley" }]],
            [[{ p: "تلای", f: "túlaay" }, { p: "تلی", f: "túley" }], [{ p: "تلای", f: "túlaay" }, { p: "تلی", f: "túley" }]],
            [[{ p: "تلای", f: "túlaay" }, { p: "تلی", f: "túley" }], [{ p: "تلای", f: "túlaay" }, { p: "تلی", f: "túley" }]],
            [[{ p: "تلای", f: "túlaay" }, { p: "تلی", f: "túley" }], [{ p: "تلای", f: "túlaay" }, { p: "تلی", f: "túley" }]],
            [[{ p: "تلای", f: "túlaay" }, { p: "تلی", f: "túley" }], [{ p: "تلای", f: "túlaay" }, { p: "تلی", f: "túley" }]],
        ],
        long: [
            [[{ p: "تللای", f: "tlúlaay" }, { p: "تللی", f: "tlúley" }], [{ p: "تللای", f: "tlúlaay" }, { p: "تللی", f: "tlúley" }]],
            [[{ p: "تللای", f: "tlúlaay" }, { p: "تللی", f: "tlúley" }], [{ p: "تللای", f: "tlúlaay" }, { p: "تللی", f: "tlúley" }]],
            [[{ p: "تللای", f: "tlúlaay" }, { p: "تللی", f: "tlúley" }], [{ p: "تللای", f: "tlúlaay" }, { p: "تللی", f: "tlúley" }]],
            [[{ p: "تللای", f: "tlúlaay" }, { p: "تللی", f: "tlúley" }], [{ p: "تللای", f: "tlúlaay" }, { p: "تللی", f: "tlúley" }]],
            [[{ p: "تللای", f: "tlúlaay" }, { p: "تللی", f: "tlúley" }], [{ p: "تللای", f: "tlúlaay" }, { p: "تللی", f: "tlúley" }]],
            [[{ p: "تللای", f: "tlúlaay" }, { p: "تللی", f: "tlúley" }], [{ p: "تللای", f: "tlúlaay" }, { p: "تللی", f: "tlúley" }]],
        ],
    },
    participle: {
        past: {
            long: {
                masc: [
                    [{ p: "تللی", f: "tlúley" }],
                    [{ p: "تللي", f: "tlúlee" }],
                    [{ p: "تللیو", f: "tlúliyo" }, { p: "تللو", f: "tlúlo" }],
                ],
                fem: [
                    [{ p: "تللې", f: "tlúle" }],
                    [{ p: "تللې", f: "tlúle" }],
                    [{ p: "تللو", f: "tlúlo" }],
                ],
            },
            short: {
                masc: [
                    [{ p: "تلی", f: "túley" }],
                    [{ p: "تلي", f: "túlee" }],
                    [{ p: "تلیو", f: "túliyo" }, { p: "تلو", f: "túlo" }],
                ],
                fem: [
                    [{ p: "تلې", f: "túle" }],
                    [{ p: "تلې", f: "túle" }],
                    [{ p: "تلو", f: "túlo" }],
                ],                
            }
        },
        present: {
            masc: [
                [{ p: "تلونکی", f: "tlóonkey" }],
                [{ p: "تلونکي", f: "tlóonkee" }],
                [{ p: "تلونکیو", f: "tlóonkiyo" }, { p: "تلونکو", f: "kedóonko" }],
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
                [[{p: "تلی", f: "túley"}], [{p: "تلي", f: "túlee"}]],
                [[{p: "تلې", f: "túle"}], [{p: "تلې", f: "túle"}]],
                [[{p: "تلی", f: "túley"}], [{p: "تلي", f: "túlee"}]],
                [[{p: "تلې", f: "túle"}], [{p: "تلې", f: "túle"}]],
                [[{p: "تلی", f: "túley"}], [{p: "تلي", f: "túlee"}]],
                [[{p: "تلې", f: "túle"}], [{p: "تلې", f: "túle"}]],
            ],
            long: [
                [[{p: "تللی", f: "tlúley"}], [{p: "تللي", f: "tlúlee"}]],
                [[{p: "تللې", f: "tlúle"}], [{p: "تللې", f: "tlúle"}]],
                [[{p: "تللی", f: "tlúley"}], [{p: "تللي", f: "tlúlee"}]],
                [[{p: "تللې", f: "tlúle"}], [{p: "تللې", f: "tlúle"}]],
                [[{p: "تللی", f: "tlúley"}], [{p: "تللي", f: "tlúlee"}]],
                [[{p: "تللې", f: "tlúle"}], [{p: "تللې", f: "tlúle"}]],
            ],
        },
        past: {
            short: [
                [[{p: "تلی وم", f: "túley wum"}], [{p: "تلي وو", f: "túlee woo"}]],
                [[{p: "تلې وم", f: "túle wum"}], [{p: "تلې وو", f: "túle woo"}]],
                [[{p: "تلی وې", f: "túley we"}], [{p: "تلي وئ", f: "túlee weyy"}]],
                [[{p: "تلې وې", f: "túle we"}], [{p: "تلې وئ", f: "túle weyy"}]],
                [[{p: "تلی و", f: "túley wo"}], [{p: "تلي وو", f: "túlee woo"}]],
                [[{p: "تلې وه", f: "túle wa"}], [{p: "تلې وې", f: "túle we"}]],
            ],
            long: [
                [[{p: "تللی وم", f: "tlúley wum"}], [{p: "تللي وو", f: "tlúlee woo"}]],
                [[{p: "تللې وم", f: "tlúle wum"}], [{p: "تللې وو", f: "tlúle woo"}]],
                [[{p: "تللی وې", f: "tlúley we"}], [{p: "تللي وئ", f: "tlúlee weyy"}]],
                [[{p: "تللې وې", f: "tlúle we"}], [{p: "تللې وئ", f: "tlúle weyy"}]],
                [[{p: "تللی و", f: "tlúley wo"}], [{p: "تللي وو", f: "tlúlee woo"}]],
                [[{p: "تللې وه", f: "tlúle wa"}], [{p: "تللې وې", f: "tlúle we"}]],
            ],
        },
        present: {
            short: [
                [[{p: "تلی یم", f: "túley yum"}], [{p: "تلي یو", f: "túlee yoo"}]],
                [[{p: "تلې یم", f: "túle yum"}], [{p: "تلې یو", f: "túle yoo"}]],
                [[{p: "تلی یې", f: "túley ye"}], [{p: "تلي یئ", f: "túlee yeyy"}]],
                [[{p: "تلې یې", f: "túle ye"}], [{p: "تلې یئ", f: "túle yeyy"}]],
                [[{p: "تلی دی", f: "túley dey"}], [{p: "تلي دي", f: "túlee dee"}]],
                [[{p: "تلې ده", f: "túle da"}], [{p: "تلې دي", f: "túle dee"}]],
            ],
            long: [
                [[{p: "تللی یم", f: "tlúley yum"}], [{p: "تللي یو", f: "tlúlee yoo"}]],
                [[{p: "تللې یم", f: "tlúle yum"}], [{p: "تللې یو", f: "tlúle yoo"}]],
                [[{p: "تللی یې", f: "tlúley ye"}], [{p: "تللي یئ", f: "tlúlee yeyy"}]],
                [[{p: "تللې یې", f: "tlúle ye"}], [{p: "تللې یئ", f: "tlúle yeyy"}]],
                [[{p: "تللی دی", f: "tlúley dey"}], [{p: "تللي دي", f: "tlúlee dee"}]],
                [[{p: "تللې ده", f: "tlúle da"}], [{p: "تللې دي", f: "tlúle dee"}]],
            ],
        },
        habitual: {
            short: [
                [[{p: "تلی یم", f: "túley yum"}], [{p: "تلي یو", f: "túlee yoo"}]],
                [[{p: "تلې یم", f: "túle yum"}], [{p: "تلې یو", f: "túle yoo"}]],
                [[{p: "تلی یې", f: "túley ye"}], [{p: "تلي یئ", f: "túlee yeyy"}]],
                [[{p: "تلې یې", f: "túle ye"}], [{p: "تلې یئ", f: "túle yeyy"}]],
                [[{p: "تلی وي", f: "túley wee"}], [{p: "تلي وي", f: "túlee wee"}]],
                [[{p: "تلې وي", f: "túle wee"}], [{p: "تلې وي", f: "túle wee"}]],
            ],
            long: [
                [[{p: "تللی یم", f: "tlúley yum"}], [{p: "تللي یو", f: "tlúlee yoo"}]],
                [[{p: "تللې یم", f: "tlúle yum"}], [{p: "تللې یو", f: "tlúle yoo"}]],
                [[{p: "تللی یې", f: "tlúley ye"}], [{p: "تللي یئ", f: "tlúlee yeyy"}]],
                [[{p: "تللې یې", f: "tlúle ye"}], [{p: "تللې یئ", f: "tlúle yeyy"}]],
                [[{p: "تللی وي", f: "tlúley wee"}], [{p: "تللي وي", f: "tlúlee wee"}]],
                [[{p: "تللې وي", f: "tlúle wee"}], [{p: "تللې وي", f: "tlúle wee"}]],
            ],
        },
        subjunctive: {
            short: [
                [[{p: "تلی وم", f: "túley wum"}], [{p: "تلي وو", f: "túlee woo"}]],
                [[{p: "تلې وم", f: "túle wum"}], [{p: "تلې وو", f: "túle woo"}]],
                [[{p: "تلی وې", f: "túley we"}], [{p: "تلي وئ", f: "túlee weyy"}]],
                [[{p: "تلې وې", f: "túle we"}], [{p: "تلې وئ", f: "túle weyy"}]],
                [[{p: "تلی وي", f: "túley wee"}], [{p: "تلي وي", f: "túlee wee"}]],
                [[{p: "تلې وي", f: "túle wee"}], [{p: "تلې وي", f: "túle wee"}]],
            ],
            long: [
                [[{p: "تللی وم", f: "tlúley wum"}], [{p: "تللي وو", f: "tlúlee woo"}]],
                [[{p: "تللې وم", f: "tlúle wum"}], [{p: "تللې وو", f: "tlúle woo"}]],
                [[{p: "تللی وې", f: "tlúley we"}], [{p: "تللي وئ", f: "tlúlee weyy"}]],
                [[{p: "تللې وې", f: "tlúle we"}], [{p: "تللې وئ", f: "tlúle weyy"}]],
                [[{p: "تللی وي", f: "tlúley wee"}], [{p: "تللي وي", f: "tlúlee wee"}]],
                [[{p: "تللې وي", f: "tlúle wee"}], [{p: "تللې وي", f: "tlúle wee"}]],
            ],
        },
        future: {
            short: [
                [[{p: "به تلی یم", f: "ba túley yum"}], [{p: "به تلي یو", f: "ba túlee yoo"}]],
                [[{p: "به تلې یم", f: "ba túle yum"}], [{p: "به تلې یو", f: "ba túle yoo"}]],
                [[{p: "به تلی یې", f: "ba túley ye"}], [{p: "به تلي یئ", f: "ba túlee yeyy"}]],
                [[{p: "به تلې یې", f: "ba túle ye"}], [{p: "به تلې یئ", f: "ba túle yeyy"}]],
                [[{p: "به تلی وي", f: "ba túley wee"}], [{p: "به تلي وي", f: "ba túlee wee"}]],
                [[{p: "به تلې وي", f: "ba túle wee"}], [{p: "به تلې وي", f: "ba túle wee"}]],
            ],
            long: [
                [[{p: "به تللی یم", f: "ba tlúley yum"}], [{p: "به تللي یو", f: "ba tlúlee yoo"}]],
                [[{p: "به تللې یم", f: "ba tlúle yum"}], [{p: "به تللې یو", f: "ba tlúle yoo"}]],
                [[{p: "به تللی یې", f: "ba tlúley ye"}], [{p: "به تللي یئ", f: "ba tlúlee yeyy"}]],
                [[{p: "به تللې یې", f: "ba tlúle ye"}], [{p: "به تللې یئ", f: "ba tlúle yeyy"}]],
                [[{p: "به تللی وي", f: "ba tlúley wee"}], [{p: "به تللي وي", f: "ba tlúlee wee"}]],
                [[{p: "به تللې وي", f: "ba tlúle wee"}], [{p: "به تللې وي", f: "ba tlúle wee"}]],
            ],
        },
        affirmational: {
            short: [
                [[{p: "به تلی وم", f: "ba túley wum"}], [{p: "به تلي وو", f: "ba túlee woo"}]],
                [[{p: "به تلې وم", f: "ba túle wum"}], [{p: "به تلې وو", f: "ba túle woo"}]],
                [[{p: "به تلی وې", f: "ba túley we"}], [{p: "به تلي وئ", f: "ba túlee weyy"}]],
                [[{p: "به تلې وې", f: "ba túle we"}], [{p: "به تلې وئ", f: "ba túle weyy"}]],
                [[{p: "به تلی و", f: "ba túley wo"}], [{p: "به تلي وو", f: "ba túlee woo"}]],
                [[{p: "به تلې وه", f: "ba túle wa"}], [{p: "به تلې وې", f: "ba túle we"}]],
            ],
            long: [
                [[{p: "به تللی وم", f: "ba tlúley wum"}], [{p: "به تللي وو", f: "ba tlúlee woo"}]],
                [[{p: "به تللې وم", f: "ba tlúle wum"}], [{p: "به تللې وو", f: "ba tlúle woo"}]],
                [[{p: "به تللی وې", f: "ba tlúley we"}], [{p: "به تللي وئ", f: "ba tlúlee weyy"}]],
                [[{p: "به تللې وې", f: "ba tlúle we"}], [{p: "به تللې وئ", f: "ba tlúle weyy"}]],
                [[{p: "به تللی و", f: "ba tlúley wo"}], [{p: "به تللي وو", f: "ba tlúlee woo"}]],
                [[{p: "به تللې وه", f: "ba tlúle wa"}], [{p: "به تللې وې", f: "ba tlúle we"}]],
            ],
        },
        pastSubjunctiveHypothetical: {
            short: [
                [[{p: "به تلی وای", f: "ba túley waay"}, {p: "به تلی وی", f: "ba túley wey"}], [{p: "به تلي وای", f: "ba túlee waay"}, {p: "به تلي وی", f: "ba túlee wey"}]],
                [[{p: "به تلې وای", f: "ba túle waay"}, {p: "به تلې وی", f: "ba túle wey"}], [{p: "به تلې وای", f: "ba túle waay"}, {p: "به تلې وی", f: "ba túle wey"}]],
                [[{p: "به تلی وای", f: "ba túley waay"}, {p: "به تلی وی", f: "ba túley wey"}], [{p: "به تلي وای", f: "ba túlee waay"}, {p: "به تلي وی", f: "ba túlee wey"}]],
                [[{p: "به تلې وای", f: "ba túle waay"}, {p: "به تلې وی", f: "ba túle wey"}], [{p: "به تلې وای", f: "ba túle waay"}, {p: "به تلې وی", f: "ba túle wey"}]],
                [[{p: "به تلی وای", f: "ba túley waay"}, {p: "به تلی وی", f: "ba túley wey"}], [{p: "به تلي وای", f: "ba túlee waay"}, {p: "به تلي وی", f: "ba túlee wey"}]],
                [[{p: "به تلې وای", f: "ba túle waay"}, {p: "به تلې وی", f: "ba túle wey"}], [{p: "به تلې وای", f: "ba túle waay"}, {p: "به تلې وی", f: "ba túle wey"}]],
            ],
            long: [
                [[{p: "به تللی وای", f: "ba tlúley waay"}, {p: "به تللی وی", f: "ba tlúley wey"}], [{p: "به تللي وای", f: "ba tlúlee waay"}, {p: "به تللي وی", f: "ba tlúlee wey"}]],
                [[{p: "به تللې وای", f: "ba tlúle waay"}, {p: "به تللې وی", f: "ba tlúle wey"}], [{p: "به تللې وای", f: "ba tlúle waay"}, {p: "به تللې وی", f: "ba tlúle wey"}]],
                [[{p: "به تللی وای", f: "ba tlúley waay"}, {p: "به تللی وی", f: "ba tlúley wey"}], [{p: "به تللي وای", f: "ba tlúlee waay"}, {p: "به تللي وی", f: "ba tlúlee wey"}]],
                [[{p: "به تللې وای", f: "ba tlúle waay"}, {p: "به تللې وی", f: "ba tlúle wey"}], [{p: "به تللې وای", f: "ba tlúle waay"}, {p: "به تللې وی", f: "ba tlúle wey"}]],
                [[{p: "به تللی وای", f: "ba tlúley waay"}, {p: "به تللی وی", f: "ba tlúley wey"}], [{p: "به تللي وای", f: "ba tlúlee waay"}, {p: "به تللي وی", f: "ba tlúlee wey"}]],
                [[{p: "به تللې وای", f: "ba tlúle waay"}, {p: "به تللې وی", f: "ba tlúle wey"}], [{p: "به تللې وای", f: "ba tlúle waay"}, {p: "به تللې وی", f: "ba tlúle wey"}]],
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
                long: [{ p: "ور ", f: "wăr "}, { p: "کړل", f: "kRul" }],
                short: [{ p: "ور ", f: "wăr "}, { p: "کړ", f: "kR" }],
                mini: [{ p: "ور ", f: "wăr "}, { p: "ړ", f: "k" }],
            },
        },
        stem: {
            imperfective: { p: "ورکو", f: "wărkaw" },
            perfective: {
                long: { p: "ورکړ", f: "wărkR" },
                short: { p: "ورک", f: "wărk" },
            },
            perfectiveSplit: {
                long: [{ p: "ور ", f: "wăr "}, { p: "کړ", f: "kR" }],
                short: [{ p: "ور ", f: "wăr "}, { p: "ړ", f: "k" }],
            },
        },
        participle: {
            present: { p: "ورکوونکی", f: "wărkawóonkey" },
            past: { p: "ورکړی", f: "wărkúRey" },
        },
    },
    imperfective: {
        nonImperative: [
            [[{p: "ورکوم", f: "wărkawum"}], [{p: "ورکوو", f: "wărkawoo"}]],
            [[{p: "ورکوم", f: "wărkawum"}], [{p: "ورکوو", f: "wărkawoo"}]],
            [[{p: "ورکوې", f: "wărkawe"}], [{p: "ورکوئ", f: "wărkaweyy"}]],
            [[{p: "ورکوې", f: "wărkawe"}], [{p: "ورکوئ", f: "wărkaweyy"}]],
            [[{p: "ورکوي", f: "wărkawee"}], [{p: "ورکوي", f: "wărkawee"}]],
            [[{p: "ورکوي", f: "wărkawee"}], [{p: "ورکوي", f: "wărkawee"}]],
        ],
        future: [
            [[{p: "به ورکوم", f: "ba wărkawum"}], [{p: "به ورکوو", f: "ba wărkawoo"}]],
            [[{p: "به ورکوم", f: "ba wărkawum"}], [{p: "به ورکوو", f: "ba wărkawoo"}]],
            [[{p: "به ورکوې", f: "ba wărkawe"}], [{p: "به ورکوئ", f: "ba wărkaweyy"}]],
            [[{p: "به ورکوې", f: "ba wărkawe"}], [{p: "به ورکوئ", f: "ba wărkaweyy"}]],
            [[{p: "به ورکوي", f: "ba wărkawee"}], [{p: "به ورکوي", f: "ba wărkawee"}]],
            [[{p: "به ورکوي", f: "ba wărkawee"}], [{p: "به ورکوي", f: "ba wărkawee"}]],
        ],
        imperative: [
            [[{ p: "ورکوه", f: "wărkawá" }], [{ p: "ورکوئ", f: "wărkawéyy" }]],
            [[{ p: "ورکوه", f: "wărkawá" }], [{ p: "ورکوئ", f: "wărkawéyy" }]]
        ],
        past: {
            short: [
                [[{p: "ورکوم", f: "wărkawum"}], [{p: "ورکوو", f: "wărkawoo"}]],
                [[{p: "ورکوم", f: "wărkawum"}], [{p: "ورکوو", f: "wărkawoo"}]],
                [[{p: "ورکوې", f: "wărkawe"}], [{p: "ورکوئ", f: "wărkaweyy"}]],
                [[{p: "ورکوې", f: "wărkawe"}], [{p: "ورکوئ", f: "wărkaweyy"}]],
                [[{p: "ورکاوه", f: "wărkaawu"}], [{p: "ورکول", f: "wărkawul"}]],
                [[{p: "ورکوه", f: "wărkawa"}], [{p: "ورکوې", f: "wărkawe"}]],
            ],
            long: [
                [[{p: "ورکولم", f: "wărkawulum"}], [{p: "ورکولو", f: "wărkawuloo"}]],
                [[{p: "ورکولم", f: "wărkawulum"}], [{p: "ورکولو", f: "wărkawuloo"}]],
                [[{p: "ورکولې", f: "wărkawule"}], [{p: "ورکولئ", f: "wărkawuleyy"}]],
                [[{p: "ورکولې", f: "wărkawule"}], [{p: "ورکولئ", f: "wărkawuleyy"}]],
                [[{p: "ورکوله", f: "wărkawulu"}, {p: "ورکولو", f: "wărkawulo"}], [{p: "ورکول", f: "wărkawul"}]],
                [[{p: "ورکوله", f: "wărkawula"}], [{p: "ورکولې", f: "wărkawule"}]],
            ],
        },
        habitualPast: {
            short: [
                [[{p: "به ورکوم", f: "ba wărkawum"}], [{p: "به ورکوو", f: "ba wărkawoo"}]],
                [[{p: "به ورکوم", f: "ba wărkawum"}], [{p: "به ورکوو", f: "ba wărkawoo"}]],
                [[{p: "به ورکوې", f: "ba wărkawe"}], [{p: "به ورکوئ", f: "ba wărkaweyy"}]],
                [[{p: "به ورکوې", f: "ba wărkawe"}], [{p: "به ورکوئ", f: "ba wărkaweyy"}]],
                [[{p: "به ورکاوه", f: "ba wărkaawu"}], [{p: "به ورکول", f: "ba wărkawul"}]],
                [[{p: "به ورکوه", f: "ba wărkawa"}], [{p: "به ورکوې", f: "ba wărkawe"}]],
            ],
            long: [
                [[{p: "به ورکولم", f: "ba wărkawulum"}], [{p: "به ورکولو", f: "ba wărkawuloo"}]],
                [[{p: "به ورکولم", f: "ba wărkawulum"}], [{p: "به ورکولو", f: "ba wărkawuloo"}]],
                [[{p: "به ورکولې", f: "ba wărkawule"}], [{p: "به ورکولئ", f: "ba wărkawuleyy"}]],
                [[{p: "به ورکولې", f: "ba wărkawule"}], [{p: "به ورکولئ", f: "ba wărkawuleyy"}]],
                [[{p: "به ورکوله", f: "ba wărkawulu"}, {p: "به ورکولو", f: "ba wărkawulo"}], [{p: "به ورکول", f: "ba wărkawul"}]],
                [[{p: "به ورکوله", f: "ba wărkawula"}], [{p: "به ورکولې", f: "ba wărkawule"}]],
            ],
        },
        modal: {
            nonImperative: {
                long: [
                    [[{ p: "ورکولی شم", f: "wărkawúley shum" }, { p: "ورکولای شم", f: "wărkawúlaay shum" }], [{ p: "ورکولی شو", f: "wărkawúley shoo" }, { p: "ورکولای شو", f: "wărkawúlaay shoo" }]],
                    [[{ p: "ورکولی شم", f: "wărkawúley shum" }, { p: "ورکولای شم", f: "wărkawúlaay shum" }], [{ p: "ورکولی شو", f: "wărkawúley shoo" }, { p: "ورکولای شو", f: "wărkawúlaay shoo" }]],
                    [[{ p: "ورکولی شې", f: "wărkawúley she" }, { p: "ورکولای شې", f: "wărkawúlaay she" }], [{ p: "ورکولی شئ", f: "wărkawúley sheyy" }, { p: "ورکولای شئ", f: "wărkawúlaay sheyy" }]],
                    [[{ p: "ورکولی شې", f: "wărkawúley she" }, { p: "ورکولای شې", f: "wărkawúlaay she" }], [{ p: "ورکولی شئ", f: "wărkawúley sheyy" }, { p: "ورکولای شئ", f: "wărkawúlaay sheyy" }]],
                    [[{ p: "ورکولی شي", f: "wărkawúley shee" }, { p: "ورکولای شي", f: "wărkawúlaay shee" }], [{ p: "ورکولی شي", f: "wărkawúley shee" }, { p: "ورکولای شي", f: "wărkawúlaay shee" }]],
                    [[{ p: "ورکولی شي", f: "wărkawúley shee" }, { p: "ورکولای شي", f: "wărkawúlaay shee" }], [{ p: "ورکولی شي", f: "wărkawúley shee" }, { p: "ورکولای شي", f: "wărkawúlaay shee" }]],
                ],
                short: [
                    [[{ p: "ورکوی شم", f: "wărkawéy shum" }, { p: "ورکوای شم", f: "wărkawáay shum" }], [{ p: "ورکوی شو", f: "wărkawéy shoo" }, { p: "ورکوای شو", f: "wărkawáay shoo" }]],
                    [[{ p: "ورکوی شم", f: "wărkawéy shum" }, { p: "ورکوای شم", f: "wărkawáay shum" }], [{ p: "ورکوی شو", f: "wărkawéy shoo" }, { p: "ورکوای شو", f: "wărkawáay shoo" }]],
                    [[{ p: "ورکوی شې", f: "wărkawéy she" }, { p: "ورکوای شې", f: "wărkawáay she" }], [{ p: "ورکوی شئ", f: "wărkawéy sheyy" }, { p: "ورکوای شئ", f: "wărkawáay sheyy" }]],
                    [[{ p: "ورکوی شې", f: "wărkawéy she" }, { p: "ورکوای شې", f: "wărkawáay she" }], [{ p: "ورکوی شئ", f: "wărkawéy sheyy" }, { p: "ورکوای شئ", f: "wărkawáay sheyy" }]],
                    [[{ p: "ورکوی شي", f: "wărkawéy shee" }, { p: "ورکوای شي", f: "wărkawáay shee" }], [{ p: "ورکوی شي", f: "wărkawéy shee" }, { p: "ورکوای شي", f: "wărkawáay shee" }]],
                    [[{ p: "ورکوی شي", f: "wărkawéy shee" }, { p: "ورکوای شي", f: "wărkawáay shee" }], [{ p: "ورکوی شي", f: "wărkawéy shee" }, { p: "ورکوای شي", f: "wărkawáay shee" }]],
                ],
            },
            future: {
                long: [
                    [[{ p: "به ورکولی شم", f: "ba wărkawúley shum" }, { p: "به ورکولای شم", f: "ba wărkawúlaay shum" }], [{ p: "به ورکولی شو", f: "ba wărkawúley shoo" }, { p: "به ورکولای شو", f: "ba wărkawúlaay shoo" }]],
                    [[{ p: "به ورکولی شم", f: "ba wărkawúley shum" }, { p: "به ورکولای شم", f: "ba wărkawúlaay shum" }], [{ p: "به ورکولی شو", f: "ba wărkawúley shoo" }, { p: "به ورکولای شو", f: "ba wărkawúlaay shoo" }]],
                    [[{ p: "به ورکولی شې", f: "ba wărkawúley she" }, { p: "به ورکولای شې", f: "ba wărkawúlaay she" }], [{ p: "به ورکولی شئ", f: "ba wărkawúley sheyy" }, { p: "به ورکولای شئ", f: "ba wărkawúlaay sheyy" }]],
                    [[{ p: "به ورکولی شې", f: "ba wărkawúley she" }, { p: "به ورکولای شې", f: "ba wărkawúlaay she" }], [{ p: "به ورکولی شئ", f: "ba wărkawúley sheyy" }, { p: "به ورکولای شئ", f: "ba wărkawúlaay sheyy" }]],
                    [[{ p: "به ورکولی شي", f: "ba wărkawúley shee" }, { p: "به ورکولای شي", f: "ba wărkawúlaay shee" }], [{ p: "به ورکولی شي", f: "ba wărkawúley shee" }, { p: "به ورکولای شي", f: "ba wărkawúlaay shee" }]],
                    [[{ p: "به ورکولی شي", f: "ba wărkawúley shee" }, { p: "به ورکولای شي", f: "ba wărkawúlaay shee" }], [{ p: "به ورکولی شي", f: "ba wărkawúley shee" }, { p: "به ورکولای شي", f: "ba wărkawúlaay shee" }]],
                ],
                short: [
                    [[{ p: "به ورکوی شم", f: "ba wărkawéy shum" }, { p: "به ورکوای شم", f: "ba wărkawáay shum" }], [{ p: "به ورکوی شو", f: "ba wărkawéy shoo" }, { p: "به ورکوای شو", f: "ba wărkawáay shoo" }]],
                    [[{ p: "به ورکوی شم", f: "ba wărkawéy shum" }, { p: "به ورکوای شم", f: "ba wărkawáay shum" }], [{ p: "به ورکوی شو", f: "ba wărkawéy shoo" }, { p: "به ورکوای شو", f: "ba wărkawáay shoo" }]],
                    [[{ p: "به ورکوی شې", f: "ba wărkawéy she" }, { p: "به ورکوای شې", f: "ba wărkawáay she" }], [{ p: "به ورکوی شئ", f: "ba wărkawéy sheyy" }, { p: "به ورکوای شئ", f: "ba wărkawáay sheyy" }]],
                    [[{ p: "به ورکوی شې", f: "ba wărkawéy she" }, { p: "به ورکوای شې", f: "ba wărkawáay she" }], [{ p: "به ورکوی شئ", f: "ba wărkawéy sheyy" }, { p: "به ورکوای شئ", f: "ba wărkawáay sheyy" }]],
                    [[{ p: "به ورکوی شي", f: "ba wărkawéy shee" }, { p: "به ورکوای شي", f: "ba wărkawáay shee" }], [{ p: "به ورکوی شي", f: "ba wărkawéy shee" }, { p: "به ورکوای شي", f: "ba wărkawáay shee" }]],
                    [[{ p: "به ورکوی شي", f: "ba wărkawéy shee" }, { p: "به ورکوای شي", f: "ba wărkawáay shee" }], [{ p: "به ورکوی شي", f: "ba wărkawéy shee" }, { p: "به ورکوای شي", f: "ba wărkawáay shee" }]],
                ],
            },
            past: {
                long: [
                    [[{ p: "ورکولی شوم", f: "wărkawúley shwum" }, { p: "ورکولای شوم", f: "wărkawúlaay shwum" }], [{ p: "ورکولی شو", f: "wărkawúley shoo" }, { p: "ورکولای شو", f: "wărkawúlaay shoo" }]],
                    [[{ p: "ورکولی شوم", f: "wărkawúley shwum" }, { p: "ورکولای شوم", f: "wărkawúlaay shwum" }], [{ p: "ورکولی شو", f: "wărkawúley shoo" }, { p: "ورکولای شو", f: "wărkawúlaay shoo" }]],
                    [[{ p: "ورکولی شوې", f: "wărkawúley shwe" }, { p: "ورکولای شوې", f: "wărkawúlaay shwe" }], [{ p: "ورکولی شوئ", f: "wărkawúley shweyy" }, { p: "ورکولای شوئ", f: "wărkawúlaay shweyy" }]],
                    [[{ p: "ورکولی شوې", f: "wărkawúley shwe" }, { p: "ورکولای شوې", f: "wărkawúlaay shwe" }], [{ p: "ورکولی شوئ", f: "wărkawúley shweyy" }, { p: "ورکولای شوئ", f: "wărkawúlaay shweyy" }]],
                    [[{ p: "ورکولی شو", f: "wărkawúley sho" }, { p: "ورکولای شو", f: "wărkawúlaay sho" }], [{ p: "ورکولی شول", f: "wărkawúley shwul" }, { p: "ورکولای شول", f: "wărkawúlaay shwul" }, { p: "ورکولی شو", f: "wărkawúley shoo" }, { p: "ورکولای شو", f: "wărkawúlaay shoo" }]],
                    [[{ p: "ورکولی شوه", f: "wărkawúley shwa" }, { p: "ورکولای شوه", f: "wărkawúlaay shwa" }], [{ p: "ورکولی شولې", f: "wărkawúley shwule" }, { p: "ورکولای شولې", f: "wărkawúlaay shwule" }, { p: "ورکولی شوې", f: "wărkawúley shwe" }, { p: "ورکولای شوې", f: "wărkawúlaay shwe" }]],
                ],
                short: [
                    [[{ p: "ورکوی شوم", f: "wărkawéy shwum" }, { p: "ورکوای شوم", f: "wărkawáay shwum" }], [{ p: "ورکوی شو", f: "wărkawéy shoo" }, { p: "ورکوای شو", f: "wărkawáay shoo" }]],
                    [[{ p: "ورکوی شوم", f: "wărkawéy shwum" }, { p: "ورکوای شوم", f: "wărkawáay shwum" }], [{ p: "ورکوی شو", f: "wărkawéy shoo" }, { p: "ورکوای شو", f: "wărkawáay shoo" }]],
                    [[{ p: "ورکوی شوې", f: "wărkawéy shwe" }, { p: "ورکوای شوې", f: "wărkawáay shwe" }], [{ p: "ورکوی شوئ", f: "wărkawéy shweyy" }, { p: "ورکوای شوئ", f: "wărkawáay shweyy" }]],
                    [[{ p: "ورکوی شوې", f: "wărkawéy shwe" }, { p: "ورکوای شوې", f: "wărkawáay shwe" }], [{ p: "ورکوی شوئ", f: "wărkawéy shweyy" }, { p: "ورکوای شوئ", f: "wărkawáay shweyy" }]],
                    [[{ p: "ورکوی شو", f: "wărkawéy sho" }, { p: "ورکوای شو", f: "wărkawáay sho" }], [{ p: "ورکوی شول", f: "wărkawéy shwul" }, { p: "ورکوای شول", f: "wărkawáay shwul" }, { p: "ورکوی شو", f: "wărkawéy shoo" }, { p: "ورکوای شو", f: "wărkawáay shoo" }]],
                    [[{ p: "ورکوی شوه", f: "wărkawéy shwa" }, { p: "ورکوای شوه", f: "wărkawáay shwa" }], [{ p: "ورکوی شولې", f: "wărkawéy shwule" }, { p: "ورکوای شولې", f: "wărkawáay shwule" }, { p: "ورکوی شوې", f: "wărkawéy shwe" }, { p: "ورکوای شوې", f: "wărkawáay shwe" }]],
                ],
            },
            habitualPast: {
                long: [
                    [[{ p: "به ورکولی شوم", f: "ba wărkawúley shwum" }, { p: "به ورکولای شوم", f: "ba wărkawúlaay shwum" }], [{ p: "به ورکولی شو", f: "ba wărkawúley shoo" }, { p: "به ورکولای شو", f: "ba wărkawúlaay shoo" }]],
                    [[{ p: "به ورکولی شوم", f: "ba wărkawúley shwum" }, { p: "به ورکولای شوم", f: "ba wărkawúlaay shwum" }], [{ p: "به ورکولی شو", f: "ba wărkawúley shoo" }, { p: "به ورکولای شو", f: "ba wărkawúlaay shoo" }]],
                    [[{ p: "به ورکولی شوې", f: "ba wărkawúley shwe" }, { p: "به ورکولای شوې", f: "ba wărkawúlaay shwe" }], [{ p: "به ورکولی شوئ", f: "ba wărkawúley shweyy" }, { p: "به ورکولای شوئ", f: "ba wărkawúlaay shweyy" }]],
                    [[{ p: "به ورکولی شوې", f: "ba wărkawúley shwe" }, { p: "به ورکولای شوې", f: "ba wărkawúlaay shwe" }], [{ p: "به ورکولی شوئ", f: "ba wărkawúley shweyy" }, { p: "به ورکولای شوئ", f: "ba wărkawúlaay shweyy" }]],
                    [[{ p: "به ورکولی شو", f: "ba wărkawúley sho" }, { p: "به ورکولای شو", f: "ba wărkawúlaay sho" }], [{ p: "به ورکولی شول", f: "ba wărkawúley shwul" }, { p: "به ورکولای شول", f: "ba wărkawúlaay shwul" }, { p: "به ورکولی شو", f: "ba wărkawúley shoo" }, { p: "به ورکولای شو", f: "ba wărkawúlaay shoo" }]],
                    [[{ p: "به ورکولی شوه", f: "ba wărkawúley shwa" }, { p: "به ورکولای شوه", f: "ba wărkawúlaay shwa" }], [{ p: "به ورکولی شولې", f: "ba wărkawúley shwule" }, { p: "به ورکولای شولې", f: "ba wărkawúlaay shwule" }, { p: "به ورکولی شوې", f: "ba wărkawúley shwe" }, { p: "به ورکولای شوې", f: "ba wărkawúlaay shwe" }]],
                ],
                short: [
                    [[{ p: "به ورکوی شوم", f: "ba wărkawéy shwum" }, { p: "به ورکوای شوم", f: "ba wărkawáay shwum" }], [{ p: "به ورکوی شو", f: "ba wărkawéy shoo" }, { p: "به ورکوای شو", f: "ba wărkawáay shoo" }]],
                    [[{ p: "به ورکوی شوم", f: "ba wărkawéy shwum" }, { p: "به ورکوای شوم", f: "ba wărkawáay shwum" }], [{ p: "به ورکوی شو", f: "ba wărkawéy shoo" }, { p: "به ورکوای شو", f: "ba wărkawáay shoo" }]],
                    [[{ p: "به ورکوی شوې", f: "ba wărkawéy shwe" }, { p: "به ورکوای شوې", f: "ba wărkawáay shwe" }], [{ p: "به ورکوی شوئ", f: "ba wărkawéy shweyy" }, { p: "به ورکوای شوئ", f: "ba wărkawáay shweyy" }]],
                    [[{ p: "به ورکوی شوې", f: "ba wărkawéy shwe" }, { p: "به ورکوای شوې", f: "ba wărkawáay shwe" }], [{ p: "به ورکوی شوئ", f: "ba wărkawéy shweyy" }, { p: "به ورکوای شوئ", f: "ba wărkawáay shweyy" }]],
                    [[{ p: "به ورکوی شو", f: "ba wărkawéy sho" }, { p: "به ورکوای شو", f: "ba wărkawáay sho" }], [{ p: "به ورکوی شول", f: "ba wărkawéy shwul" }, { p: "به ورکوای شول", f: "ba wărkawáay shwul" }, { p: "به ورکوی شو", f: "ba wărkawéy shoo" }, { p: "به ورکوای شو", f: "ba wărkawáay shoo" }]],
                    [[{ p: "به ورکوی شوه", f: "ba wărkawéy shwa" }, { p: "به ورکوای شوه", f: "ba wărkawáay shwa" }], [{ p: "به ورکوی شولې", f: "ba wărkawéy shwule" }, { p: "به ورکوای شولې", f: "ba wărkawáay shwule" }, { p: "به ورکوی شوې", f: "ba wărkawéy shwe" }, { p: "به ورکوای شوې", f: "ba wărkawáay shwe" }]],
                ],
            },
            hypotheticalPast: {
                long: [
                    [[{ p: "ورکولی شوای", f: "wărkawúley shwaay" }, { p: "ورکولی شوی", f: "wărkawúley shwey" }, { p: "ورکولای شوای", f: "wărkawúlaay shwaay" }], [{ p: "ورکولی شوای", f: "wărkawúley shwaay" }, { p: "ورکولی شوی", f: "wărkawúley shwey" }, { p: "ورکولای شوای", f: "wărkawúlaay shwaay" }]],
                    [[{ p: "ورکولی شوای", f: "wărkawúley shwaay" }, { p: "ورکولی شوی", f: "wărkawúley shwey" }, { p: "ورکولای شوای", f: "wărkawúlaay shwaay" }], [{ p: "ورکولی شوای", f: "wărkawúley shwaay" }, { p: "ورکولی شوی", f: "wărkawúley shwey" }, { p: "ورکولای شوای", f: "wărkawúlaay shwaay" }]],
                    [[{ p: "ورکولی شوای", f: "wărkawúley shwaay" }, { p: "ورکولی شوی", f: "wărkawúley shwey" }, { p: "ورکولای شوای", f: "wărkawúlaay shwaay" }], [{ p: "ورکولی شوای", f: "wărkawúley shwaay" }, { p: "ورکولی شوی", f: "wărkawúley shwey" }, { p: "ورکولای شوای", f: "wărkawúlaay shwaay" }]],
                    [[{ p: "ورکولی شوای", f: "wărkawúley shwaay" }, { p: "ورکولی شوی", f: "wărkawúley shwey" }, { p: "ورکولای شوای", f: "wărkawúlaay shwaay" }], [{ p: "ورکولی شوای", f: "wărkawúley shwaay" }, { p: "ورکولی شوی", f: "wărkawúley shwey" }, { p: "ورکولای شوای", f: "wărkawúlaay shwaay" }]],
                    [[{ p: "ورکولی شوای", f: "wărkawúley shwaay" }, { p: "ورکولی شوی", f: "wărkawúley shwey" }, { p: "ورکولای شوای", f: "wărkawúlaay shwaay" }], [{ p: "ورکولی شوای", f: "wărkawúley shwaay" }, { p: "ورکولی شوی", f: "wărkawúley shwey" }, { p: "ورکولای شوای", f: "wărkawúlaay shwaay" }]],
                    [[{ p: "ورکولی شوای", f: "wărkawúley shwaay" }, { p: "ورکولی شوی", f: "wărkawúley shwey" }, { p: "ورکولای شوای", f: "wărkawúlaay shwaay" }], [{ p: "ورکولی شوای", f: "wărkawúley shwaay" }, { p: "ورکولی شوی", f: "wărkawúley shwey" }, { p: "ورکولای شوای", f: "wărkawúlaay shwaay" }]],
                ],
                short: [
                    [[{ p: "ورکوی شوای", f: "wărkawéy shwaay" }, { p: "ورکوی شوی", f: "wărkawéy shwey" }, { p: "ورکوای شوای", f: "wărkawáay shwaay" }], [{ p: "ورکوی شوای", f: "wărkawéy shwaay" }, { p: "ورکوی شوی", f: "wărkawéy shwey" }, { p: "ورکوای شوای", f: "wărkawáay shwaay" }]],
                    [[{ p: "ورکوی شوای", f: "wărkawéy shwaay" }, { p: "ورکوی شوی", f: "wărkawéy shwey" }, { p: "ورکوای شوای", f: "wărkawáay shwaay" }], [{ p: "ورکوی شوای", f: "wărkawéy shwaay" }, { p: "ورکوی شوی", f: "wărkawéy shwey" }, { p: "ورکوای شوای", f: "wărkawáay shwaay" }]],
                    [[{ p: "ورکوی شوای", f: "wărkawéy shwaay" }, { p: "ورکوی شوی", f: "wărkawéy shwey" }, { p: "ورکوای شوای", f: "wărkawáay shwaay" }], [{ p: "ورکوی شوای", f: "wărkawéy shwaay" }, { p: "ورکوی شوی", f: "wărkawéy shwey" }, { p: "ورکوای شوای", f: "wărkawáay shwaay" }]],
                    [[{ p: "ورکوی شوای", f: "wărkawéy shwaay" }, { p: "ورکوی شوی", f: "wărkawéy shwey" }, { p: "ورکوای شوای", f: "wărkawáay shwaay" }], [{ p: "ورکوی شوای", f: "wărkawéy shwaay" }, { p: "ورکوی شوی", f: "wărkawéy shwey" }, { p: "ورکوای شوای", f: "wărkawáay shwaay" }]],
                    [[{ p: "ورکوی شوای", f: "wărkawéy shwaay" }, { p: "ورکوی شوی", f: "wărkawéy shwey" }, { p: "ورکوای شوای", f: "wărkawáay shwaay" }], [{ p: "ورکوی شوای", f: "wărkawéy shwaay" }, { p: "ورکوی شوی", f: "wărkawéy shwey" }, { p: "ورکوای شوای", f: "wărkawáay shwaay" }]],
                    [[{ p: "ورکوی شوای", f: "wărkawéy shwaay" }, { p: "ورکوی شوی", f: "wărkawéy shwey" }, { p: "ورکوای شوای", f: "wărkawáay shwaay" }], [{ p: "ورکوی شوای", f: "wărkawéy shwaay" }, { p: "ورکوی شوی", f: "wărkawéy shwey" }, { p: "ورکوای شوای", f: "wărkawáay shwaay" }]],
                ],
            },
        },
    },
    perfective: {
        nonImperative: {
            long: [
                [[{p: "ورکړم", f: "wărkRum"}], [{p: "ورکړو", f: "wărkRoo"}]],
                [[{p: "ورکړم", f: "wărkRum"}], [{p: "ورکړو", f: "wărkRoo"}]],
                [[{p: "ورکړې", f: "wărkRe"}], [{p: "ورکړئ", f: "wărkReyy"}]],
                [[{p: "ورکړې", f: "wărkRe"}], [{p: "ورکړئ", f: "wărkReyy"}]],
                [[{p: "ورکړي", f: "wărkRee"}], [{p: "ورکړي", f: "wărkRee"}]],
                [[{p: "ورکړي", f: "wărkRee"}], [{p: "ورکړي", f: "wărkRee"}]],
            ],
            short: [
                [[{p: "ورکم", f: "wărkum"}], [{p: "ورکو", f: "wărkoo"}]],
                [[{p: "ورکم", f: "wărkum"}], [{p: "ورکو", f: "wărkoo"}]],
                [[{p: "ورکې", f: "wărke"}], [{p: "ورکئ", f: "wărkeyy"}]],
                [[{p: "ورکې", f: "wărke"}], [{p: "ورکئ", f: "wărkeyy"}]],
                [[{p: "ورکي", f: "wărkee"}], [{p: "ورکي", f: "wărkee"}]],
                [[{p: "ورکي", f: "wărkee"}], [{p: "ورکي", f: "wărkee"}]],
            ],
        },
        future: {
            long: [
                [[{p: "به ورکړم", f: "ba wărkRum"}], [{p: "به ورکړو", f: "ba wărkRoo"}]],
                [[{p: "به ورکړم", f: "ba wărkRum"}], [{p: "به ورکړو", f: "ba wărkRoo"}]],
                [[{p: "به ورکړې", f: "ba wărkRe"}], [{p: "به ورکړئ", f: "ba wărkReyy"}]],
                [[{p: "به ورکړې", f: "ba wărkRe"}], [{p: "به ورکړئ", f: "ba wărkReyy"}]],
                [[{p: "به ورکړي", f: "ba wărkRee"}], [{p: "به ورکړي", f: "ba wărkRee"}]],
                [[{p: "به ورکړي", f: "ba wărkRee"}], [{p: "به ورکړي", f: "ba wărkRee"}]],
            ],
            short: [
                [[{p: "به ورکم", f: "ba wărkum"}], [{p: "به ورکو", f: "ba wărkoo"}]],
                [[{p: "به ورکم", f: "ba wărkum"}], [{p: "به ورکو", f: "ba wărkoo"}]],
                [[{p: "به ورکې", f: "ba wărke"}], [{p: "به ورکئ", f: "ba wărkeyy"}]],
                [[{p: "به ورکې", f: "ba wărke"}], [{p: "به ورکئ", f: "ba wărkeyy"}]],
                [[{p: "به ورکي", f: "ba wărkee"}], [{p: "به ورکي", f: "ba wărkee"}]],
                [[{p: "به ورکي", f: "ba wărkee"}], [{p: "به ورکي", f: "ba wărkee"}]],
            ],
        },
        imperative: {
            long: [
                [[{ p: "ورکړه", f: "wărkRa" }], [{ p: "ورکړئ", f: "wărkReyy" }]],
                [[{ p: "ورکړه", f: "wărkRa" }], [{ p: "ورکړئ", f: "wărkReyy" }]]
            ],
            short: [
                [[{ p: "ورکه", f: "wărka" }], [{ p: "ورکئ", f: "wărkeyy" }]],
                [[{ p: "ورکه", f: "wărka" }], [{ p: "ورکئ", f: "wărkeyy" }]],
            ],
        },
        past: {
            mini: [
                [[{p: "ورکم", f: "wărkum"}], [{p: "ورکو", f: "wărkoo"}]],
                [[{p: "ورکم", f: "wărkum"}], [{p: "ورکو", f: "wărkoo"}]],
                [[{p: "ورکې", f: "wărke"}], [{p: "ورکئ", f: "wărkeyy"}]],
                [[{p: "ورکې", f: "wărke"}], [{p: "ورکئ", f: "wărkeyy"}]],
                [[{p: "ورکه", f: "wărku"}, {p: "ورکو", f: "wărko"}], [{p: "ورکړل", f: "wărkRul"}, { p: "ورکو", f: "wărkoo" }]],
                [[{p: "ورکه", f: "wărka"}], [{p: "ورکې", f: "wărke"}]],
            ],
            short: [
                [[{p: "ورکړم", f: "wărkRum"}], [{p: "ورکړو", f: "wărkRoo"}]],
                [[{p: "ورکړم", f: "wărkRum"}], [{p: "ورکړو", f: "wărkRoo"}]],
                [[{p: "ورکړې", f: "wărkRe"}], [{p: "ورکړئ", f: "wărkReyy"}]],
                [[{p: "ورکړې", f: "wărkRe"}], [{p: "ورکړئ", f: "wărkReyy"}]],
                [[{p: "ورکړه", f: "wărkRu"}, {p: "ورکړو", f: "wărkRo"}, {p: "ورکړ", f: "wărkuR"}], [{p: "ورکړل", f: "wărkRul"}, {p: "ورکړو", f: "wărkRoo" }]],
                [[{p: "ورکړه", f: "wărkRa"}], [{p: "ورکړې", f: "wărkRe"}]],
            ],
            long: [
                [[{p: "ورکړلم", f: "wărkRulum"}], [{p: "ورکړلو", f: "wărkRuloo"}]],
                [[{p: "ورکړلم", f: "wărkRulum"}], [{p: "ورکړلو", f: "wărkRuloo"}]],
                [[{p: "ورکړلې", f: "wărkRule"}], [{p: "ورکړلئ", f: "wărkRuleyy"}]],
                [[{p: "ورکړلې", f: "wărkRule"}], [{p: "ورکړلئ", f: "wărkRuleyy"}]],
                [[{p: "ورکړله", f: "wărkRulu"}, {p: "ورکړلو", f: "wărkRulo"}], [{p: "ورکړل", f: "wărkRul"}, {p: "ورکړلو", f: "wărkRuloo"}]],
                [[{p: "ورکړله", f: "wărkRula"}], [{p: "ورکړلې", f: "wărkRule"}]],
            ],
        },
        habitualPast: {
            mini: [
                [[{p: "به ورکم", f: "ba wărkum"}], [{p: "به ورکو", f: "ba wărkoo"}]],
                [[{p: "به ورکم", f: "ba wărkum"}], [{p: "به ورکو", f: "ba wărkoo"}]],
                [[{p: "به ورکې", f: "ba wărke"}], [{p: "به ورکئ", f: "ba wărkeyy"}]],
                [[{p: "به ورکې", f: "ba wărke"}], [{p: "به ورکئ", f: "ba wărkeyy"}]],
                [[{p: "به ورکه", f: "ba wărku"}, {p: "به ورکو", f: "ba wărko"}], [{p: "به ورکړل", f: "ba wărkRul"}, { p: "به ورکو", f: "ba wărkoo" }]],
                [[{p: "به ورکه", f: "ba wărka"}], [{p: "به ورکې", f: "ba wărke"}]],
            ],
            short: [
                [[{p: "به ورکړم", f: "ba wărkRum"}], [{p: "به ورکړو", f: "ba wărkRoo"}]],
                [[{p: "به ورکړم", f: "ba wărkRum"}], [{p: "به ورکړو", f: "ba wărkRoo"}]],
                [[{p: "به ورکړې", f: "ba wărkRe"}], [{p: "به ورکړئ", f: "ba wărkReyy"}]],
                [[{p: "به ورکړې", f: "ba wărkRe"}], [{p: "به ورکړئ", f: "ba wărkReyy"}]],
                [[{p: "به ورکړه", f: "ba wărkRu"}, {p: "به ورکړو", f: "ba wărkRo"}, {p: "به ورکړ", f: "ba wărkuR"}], [{p: "به ورکړل", f: "ba wărkRul"}, {p: "به ورکړو", f: "ba wărkRoo" }]],
                [[{p: "به ورکړه", f: "ba wărkRa"}], [{p: "به ورکړې", f: "ba wărkRe"}]],
            ],
            long: [
                [[{p: "به ورکړلم", f: "ba wărkRulum"}], [{p: "به ورکړلو", f: "ba wărkRuloo"}]],
                [[{p: "به ورکړلم", f: "ba wărkRulum"}], [{p: "به ورکړلو", f: "ba wărkRuloo"}]],
                [[{p: "به ورکړلې", f: "ba wărkRule"}], [{p: "به ورکړلئ", f: "ba wărkRuleyy"}]],
                [[{p: "به ورکړلې", f: "ba wărkRule"}], [{p: "به ورکړلئ", f: "ba wărkRuleyy"}]],
                [[{p: "به ورکړله", f: "ba wărkRulu"}, {p: "به ورکړلو", f: "ba wărkRulo"}], [{p: "به ورکړل", f: "ba wărkRul"}, {p: "به ورکړلو", f: "ba wărkRuloo"}]],
                [[{p: "به ورکړله", f: "ba wărkRula"}], [{p: "به ورکړلې", f: "ba wărkRule"}]],
            ],
        },
        modal: {
            nonImperative: {
                long: [
                    [[{ p: "ورکړلی شم", f: "wărkRuley shum" }, { p: "ورکړلای شم", f: "wărkRulaay shum" }], [{ p: "ورکړلی شو", f: "wărkRuley shoo" }, { p: "ورکړلای شو", f: "wărkRulaay shoo" }]],
                    [[{ p: "ورکړلی شم", f: "wărkRuley shum" }, { p: "ورکړلای شم", f: "wărkRulaay shum" }], [{ p: "ورکړلی شو", f: "wărkRuley shoo" }, { p: "ورکړلای شو", f: "wărkRulaay shoo" }]],
                    [[{ p: "ورکړلی شې", f: "wărkRuley she" }, { p: "ورکړلای شې", f: "wărkRulaay she" }], [{ p: "ورکړلی شئ", f: "wărkRuley sheyy" }, { p: "ورکړلای شئ", f: "wărkRulaay sheyy" }]],
                    [[{ p: "ورکړلی شې", f: "wărkRuley she" }, { p: "ورکړلای شې", f: "wărkRulaay she" }], [{ p: "ورکړلی شئ", f: "wărkRuley sheyy" }, { p: "ورکړلای شئ", f: "wărkRulaay sheyy" }]],
                    [[{ p: "ورکړلی شي", f: "wărkRuley shee" }, { p: "ورکړلای شي", f: "wărkRulaay shee" }], [{ p: "ورکړلی شي", f: "wărkRuley shee" }, { p: "ورکړلای شي", f: "wărkRulaay shee" }]],
                    [[{ p: "ورکړلی شي", f: "wărkRuley shee" }, { p: "ورکړلای شي", f: "wărkRulaay shee" }], [{ p: "ورکړلی شي", f: "wărkRuley shee" }, { p: "ورکړلای شي", f: "wărkRulaay shee" }]],
                ],
                short: [
                    [[{ p: "ورکړی شم", f: "wărkRey shum" }, { p: "ورکړای شم", f: "wărkRáay shum" }], [{ p: "ورکړی شو", f: "wărkRey shoo" }, { p: "ورکړای شو", f: "wărkRáay shoo" }]],
                    [[{ p: "ورکړی شم", f: "wărkRey shum" }, { p: "ورکړای شم", f: "wărkRáay shum" }], [{ p: "ورکړی شو", f: "wărkRey shoo" }, { p: "ورکړای شو", f: "wărkRáay shoo" }]],
                    [[{ p: "ورکړی شې", f: "wărkRey she" }, { p: "ورکړای شې", f: "wărkRáay she" }], [{ p: "ورکړی شئ", f: "wărkRey sheyy" }, { p: "ورکړای شئ", f: "wărkRáay sheyy" }]],
                    [[{ p: "ورکړی شې", f: "wărkRey she" }, { p: "ورکړای شې", f: "wărkRáay she" }], [{ p: "ورکړی شئ", f: "wărkRey sheyy" }, { p: "ورکړای شئ", f: "wărkRáay sheyy" }]],
                    [[{ p: "ورکړی شي", f: "wărkRey shee" }, { p: "ورکړای شي", f: "wărkRáay shee" }], [{ p: "ورکړی شي", f: "wărkRey shee" }, { p: "ورکړای شي", f: "wărkRáay shee" }]],
                    [[{ p: "ورکړی شي", f: "wărkRey shee" }, { p: "ورکړای شي", f: "wărkRáay shee" }], [{ p: "ورکړی شي", f: "wărkRey shee" }, { p: "ورکړای شي", f: "wărkRáay shee" }]],
                ],
            },
            future: {
                long: [
                    [[{ p: "به ورکړلی شم", f: "ba wărkRuley shum" }, { p: "به ورکړلای شم", f: "ba wărkRulaay shum" }], [{ p: "به ورکړلی شو", f: "ba wărkRuley shoo" }, { p: "به ورکړلای شو", f: "ba wărkRulaay shoo" }]],
                    [[{ p: "به ورکړلی شم", f: "ba wărkRuley shum" }, { p: "به ورکړلای شم", f: "ba wărkRulaay shum" }], [{ p: "به ورکړلی شو", f: "ba wărkRuley shoo" }, { p: "به ورکړلای شو", f: "ba wărkRulaay shoo" }]],
                    [[{ p: "به ورکړلی شې", f: "ba wărkRuley she" }, { p: "به ورکړلای شې", f: "ba wărkRulaay she" }], [{ p: "به ورکړلی شئ", f: "ba wărkRuley sheyy" }, { p: "به ورکړلای شئ", f: "ba wărkRulaay sheyy" }]],
                    [[{ p: "به ورکړلی شې", f: "ba wărkRuley she" }, { p: "به ورکړلای شې", f: "ba wărkRulaay she" }], [{ p: "به ورکړلی شئ", f: "ba wărkRuley sheyy" }, { p: "به ورکړلای شئ", f: "ba wărkRulaay sheyy" }]],
                    [[{ p: "به ورکړلی شي", f: "ba wărkRuley shee" }, { p: "به ورکړلای شي", f: "ba wărkRulaay shee" }], [{ p: "به ورکړلی شي", f: "ba wărkRuley shee" }, { p: "به ورکړلای شي", f: "ba wărkRulaay shee" }]],
                    [[{ p: "به ورکړلی شي", f: "ba wărkRuley shee" }, { p: "به ورکړلای شي", f: "ba wărkRulaay shee" }], [{ p: "به ورکړلی شي", f: "ba wărkRuley shee" }, { p: "به ورکړلای شي", f: "ba wărkRulaay shee" }]],
                ],
                short: [
                    [[{ p: "به ورکړی شم", f: "ba wărkRey shum" }, { p: "به ورکړای شم", f: "ba wărkRáay shum" }], [{ p: "به ورکړی شو", f: "ba wărkRey shoo" }, { p: "به ورکړای شو", f: "ba wărkRáay shoo" }]],
                    [[{ p: "به ورکړی شم", f: "ba wărkRey shum" }, { p: "به ورکړای شم", f: "ba wărkRáay shum" }], [{ p: "به ورکړی شو", f: "ba wărkRey shoo" }, { p: "به ورکړای شو", f: "ba wărkRáay shoo" }]],
                    [[{ p: "به ورکړی شې", f: "ba wărkRey she" }, { p: "به ورکړای شې", f: "ba wărkRáay she" }], [{ p: "به ورکړی شئ", f: "ba wărkRey sheyy" }, { p: "به ورکړای شئ", f: "ba wărkRáay sheyy" }]],
                    [[{ p: "به ورکړی شې", f: "ba wărkRey she" }, { p: "به ورکړای شې", f: "ba wărkRáay she" }], [{ p: "به ورکړی شئ", f: "ba wărkRey sheyy" }, { p: "به ورکړای شئ", f: "ba wărkRáay sheyy" }]],
                    [[{ p: "به ورکړی شي", f: "ba wărkRey shee" }, { p: "به ورکړای شي", f: "ba wărkRáay shee" }], [{ p: "به ورکړی شي", f: "ba wărkRey shee" }, { p: "به ورکړای شي", f: "ba wărkRáay shee" }]],
                    [[{ p: "به ورکړی شي", f: "ba wărkRey shee" }, { p: "به ورکړای شي", f: "ba wărkRáay shee" }], [{ p: "به ورکړی شي", f: "ba wărkRey shee" }, { p: "به ورکړای شي", f: "ba wărkRáay shee" }]],
                ],
            },
            past: {
                long: [
                    [[{ p: "ورکړلی شوم", f: "wărkRuley shwum" }, { p: "ورکړلای شوم", f: "wărkRulaay shwum" }], [{ p: "ورکړلی شو", f: "wărkRuley shoo" }, { p: "ورکړلای شو", f: "wărkRulaay shoo" }]],
                    [[{ p: "ورکړلی شوم", f: "wărkRuley shwum" }, { p: "ورکړلای شوم", f: "wărkRulaay shwum" }], [{ p: "ورکړلی شو", f: "wărkRuley shoo" }, { p: "ورکړلای شو", f: "wărkRulaay shoo" }]],
                    [[{ p: "ورکړلی شوې", f: "wărkRuley shwe" }, { p: "ورکړلای شوې", f: "wărkRulaay shwe" }], [{ p: "ورکړلی شوئ", f: "wărkRuley shweyy" }, { p: "ورکړلای شوئ", f: "wărkRulaay shweyy" }]],
                    [[{ p: "ورکړلی شوې", f: "wărkRuley shwe" }, { p: "ورکړلای شوې", f: "wărkRulaay shwe" }], [{ p: "ورکړلی شوئ", f: "wărkRuley shweyy" }, { p: "ورکړلای شوئ", f: "wărkRulaay shweyy" }]],
                    [[{ p: "ورکړلی شو", f: "wărkRuley sho" }, { p: "ورکړلای شو", f: "wărkRulaay sho" }], [{ p: "ورکړلی شول", f: "wărkRuley shwul" }, { p: "ورکړلای شول", f: "wărkRulaay shwul" }, { p: "ورکړلی شو", f: "wărkRuley shoo" }, { p: "ورکړلای شو", f: "wărkRulaay shoo" }]],
                    [[{ p: "ورکړلی شوه", f: "wărkRuley shwa" }, { p: "ورکړلای شوه", f: "wărkRulaay shwa" }], [{ p: "ورکړلی شولې", f: "wărkRuley shwule" }, { p: "ورکړلای شولې", f: "wărkRulaay shwule" }, { p: "ورکړلی شوې", f: "wărkRuley shwe" }, { p: "ورکړلای شوې", f: "wărkRulaay shwe" }]],
                ],
                short: [
                    [[{ p: "ورکړی شوم", f: "wărkRey shwum" }, { p: "ورکړای شوم", f: "wărkRáay shwum" }], [{ p: "ورکړی شو", f: "wărkRey shoo" }, { p: "ورکړای شو", f: "wărkRáay shoo" }]],
                    [[{ p: "ورکړی شوم", f: "wărkRey shwum" }, { p: "ورکړای شوم", f: "wărkRáay shwum" }], [{ p: "ورکړی شو", f: "wărkRey shoo" }, { p: "ورکړای شو", f: "wărkRáay shoo" }]],
                    [[{ p: "ورکړی شوې", f: "wărkRey shwe" }, { p: "ورکړای شوې", f: "wărkRáay shwe" }], [{ p: "ورکړی شوئ", f: "wărkRey shweyy" }, { p: "ورکړای شوئ", f: "wărkRáay shweyy" }]],
                    [[{ p: "ورکړی شوې", f: "wărkRey shwe" }, { p: "ورکړای شوې", f: "wărkRáay shwe" }], [{ p: "ورکړی شوئ", f: "wărkRey shweyy" }, { p: "ورکړای شوئ", f: "wărkRáay shweyy" }]],
                    [[{ p: "ورکړی شو", f: "wărkRey sho" }, { p: "ورکړای شو", f: "wărkRáay sho" }], [{ p: "ورکړی شول", f: "wărkRey shwul" }, { p: "ورکړای شول", f: "wărkRáay shwul" }, { p: "ورکړی شو", f: "wărkRey shoo" }, { p: "ورکړای شو", f: "wărkRáay shoo" }]],
                    [[{ p: "ورکړی شوه", f: "wărkRey shwa" }, { p: "ورکړای شوه", f: "wărkRáay shwa" }], [{ p: "ورکړی شولې", f: "wărkRey shwule" }, { p: "ورکړای شولې", f: "wărkRáay shwule" }, { p: "ورکړی شوې", f: "wărkRey shwe" }, { p: "ورکړای شوې", f: "wărkRáay shwe" }]],
                ],
            },
            habitualPast: {
                long: [
                    [[{ p: "به ورکړلی شوم", f: "ba wărkRuley shwum" }, { p: "به ورکړلای شوم", f: "ba wărkRulaay shwum" }], [{ p: "به ورکړلی شو", f: "ba wărkRuley shoo" }, { p: "به ورکړلای شو", f: "ba wărkRulaay shoo" }]],
                    [[{ p: "به ورکړلی شوم", f: "ba wărkRuley shwum" }, { p: "به ورکړلای شوم", f: "ba wărkRulaay shwum" }], [{ p: "به ورکړلی شو", f: "ba wărkRuley shoo" }, { p: "به ورکړلای شو", f: "ba wărkRulaay shoo" }]],
                    [[{ p: "به ورکړلی شوې", f: "ba wărkRuley shwe" }, { p: "به ورکړلای شوې", f: "ba wărkRulaay shwe" }], [{ p: "به ورکړلی شوئ", f: "ba wărkRuley shweyy" }, { p: "به ورکړلای شوئ", f: "ba wărkRulaay shweyy" }]],
                    [[{ p: "به ورکړلی شوې", f: "ba wărkRuley shwe" }, { p: "به ورکړلای شوې", f: "ba wărkRulaay shwe" }], [{ p: "به ورکړلی شوئ", f: "ba wărkRuley shweyy" }, { p: "به ورکړلای شوئ", f: "ba wărkRulaay shweyy" }]],
                    [[{ p: "به ورکړلی شو", f: "ba wărkRuley sho" }, { p: "به ورکړلای شو", f: "ba wărkRulaay sho" }], [{ p: "به ورکړلی شول", f: "ba wărkRuley shwul" }, { p: "به ورکړلای شول", f: "ba wărkRulaay shwul" }, { p: "به ورکړلی شو", f: "ba wărkRuley shoo" }, { p: "به ورکړلای شو", f: "ba wărkRulaay shoo" }]],
                    [[{ p: "به ورکړلی شوه", f: "ba wărkRuley shwa" }, { p: "به ورکړلای شوه", f: "ba wărkRulaay shwa" }], [{ p: "به ورکړلی شولې", f: "ba wărkRuley shwule" }, { p: "به ورکړلای شولې", f: "ba wărkRulaay shwule" }, { p: "به ورکړلی شوې", f: "ba wărkRuley shwe" }, { p: "به ورکړلای شوې", f: "ba wărkRulaay shwe" }]],
                ],
                short: [
                    [[{ p: "به ورکړی شوم", f: "ba wărkRey shwum" }, { p: "به ورکړای شوم", f: "ba wărkRáay shwum" }], [{ p: "به ورکړی شو", f: "ba wărkRey shoo" }, { p: "به ورکړای شو", f: "ba wărkRáay shoo" }]],
                    [[{ p: "به ورکړی شوم", f: "ba wărkRey shwum" }, { p: "به ورکړای شوم", f: "ba wărkRáay shwum" }], [{ p: "به ورکړی شو", f: "ba wărkRey shoo" }, { p: "به ورکړای شو", f: "ba wărkRáay shoo" }]],
                    [[{ p: "به ورکړی شوې", f: "ba wărkRey shwe" }, { p: "به ورکړای شوې", f: "ba wărkRáay shwe" }], [{ p: "به ورکړی شوئ", f: "ba wărkRey shweyy" }, { p: "به ورکړای شوئ", f: "ba wărkRáay shweyy" }]],
                    [[{ p: "به ورکړی شوې", f: "ba wărkRey shwe" }, { p: "به ورکړای شوې", f: "ba wărkRáay shwe" }], [{ p: "به ورکړی شوئ", f: "ba wărkRey shweyy" }, { p: "به ورکړای شوئ", f: "ba wărkRáay shweyy" }]],
                    [[{ p: "به ورکړی شو", f: "ba wărkRey sho" }, { p: "به ورکړای شو", f: "ba wărkRáay sho" }], [{ p: "به ورکړی شول", f: "ba wărkRey shwul" }, { p: "به ورکړای شول", f: "ba wărkRáay shwul" }, { p: "به ورکړی شو", f: "ba wărkRey shoo" }, { p: "به ورکړای شو", f: "ba wărkRáay shoo" }]],
                    [[{ p: "به ورکړی شوه", f: "ba wărkRey shwa" }, { p: "به ورکړای شوه", f: "ba wărkRáay shwa" }], [{ p: "به ورکړی شولې", f: "ba wărkRey shwule" }, { p: "به ورکړای شولې", f: "ba wărkRáay shwule" }, { p: "به ورکړی شوې", f: "ba wărkRey shwe" }, { p: "به ورکړای شوې", f: "ba wărkRáay shwe" }]],
                ],
            },
            hypotheticalPast: {
                long: [
                    [[{ p: "ورکړلی شوای", f: "wărkRuley shwaay" }, { p: "ورکړلی شوی", f: "wărkRuley shwey" }, { p: "ورکړلای شوای", f: "wărkRulaay shwaay" }], [{ p: "ورکړلی شوای", f: "wărkRuley shwaay" }, { p: "ورکړلی شوی", f: "wărkRuley shwey" }, { p: "ورکړلای شوای", f: "wărkRulaay shwaay" }]],
                    [[{ p: "ورکړلی شوای", f: "wărkRuley shwaay" }, { p: "ورکړلی شوی", f: "wărkRuley shwey" }, { p: "ورکړلای شوای", f: "wărkRulaay shwaay" }], [{ p: "ورکړلی شوای", f: "wărkRuley shwaay" }, { p: "ورکړلی شوی", f: "wărkRuley shwey" }, { p: "ورکړلای شوای", f: "wărkRulaay shwaay" }]],
                    [[{ p: "ورکړلی شوای", f: "wărkRuley shwaay" }, { p: "ورکړلی شوی", f: "wărkRuley shwey" }, { p: "ورکړلای شوای", f: "wărkRulaay shwaay" }], [{ p: "ورکړلی شوای", f: "wărkRuley shwaay" }, { p: "ورکړلی شوی", f: "wărkRuley shwey" }, { p: "ورکړلای شوای", f: "wărkRulaay shwaay" }]],
                    [[{ p: "ورکړلی شوای", f: "wărkRuley shwaay" }, { p: "ورکړلی شوی", f: "wărkRuley shwey" }, { p: "ورکړلای شوای", f: "wărkRulaay shwaay" }], [{ p: "ورکړلی شوای", f: "wărkRuley shwaay" }, { p: "ورکړلی شوی", f: "wărkRuley shwey" }, { p: "ورکړلای شوای", f: "wărkRulaay shwaay" }]],
                    [[{ p: "ورکړلی شوای", f: "wărkRuley shwaay" }, { p: "ورکړلی شوی", f: "wărkRuley shwey" }, { p: "ورکړلای شوای", f: "wărkRulaay shwaay" }], [{ p: "ورکړلی شوای", f: "wărkRuley shwaay" }, { p: "ورکړلی شوی", f: "wărkRuley shwey" }, { p: "ورکړلای شوای", f: "wărkRulaay shwaay" }]],
                    [[{ p: "ورکړلی شوای", f: "wărkRuley shwaay" }, { p: "ورکړلی شوی", f: "wărkRuley shwey" }, { p: "ورکړلای شوای", f: "wărkRulaay shwaay" }], [{ p: "ورکړلی شوای", f: "wărkRuley shwaay" }, { p: "ورکړلی شوی", f: "wărkRuley shwey" }, { p: "ورکړلای شوای", f: "wărkRulaay shwaay" }]],
                ],
                short: [
                    [[{ p: "ورکړی شوای", f: "wărkRey shwaay" }, { p: "ورکړی شوی", f: "wărkRey shwey" }, { p: "ورکړای شوای", f: "wărkRáay shwaay" }], [{ p: "ورکړی شوای", f: "wărkRey shwaay" }, { p: "ورکړی شوی", f: "wărkRey shwey" }, { p: "ورکړای شوای", f: "wărkRáay shwaay" }]],
                    [[{ p: "ورکړی شوای", f: "wărkRey shwaay" }, { p: "ورکړی شوی", f: "wărkRey shwey" }, { p: "ورکړای شوای", f: "wărkRáay shwaay" }], [{ p: "ورکړی شوای", f: "wărkRey shwaay" }, { p: "ورکړی شوی", f: "wărkRey shwey" }, { p: "ورکړای شوای", f: "wărkRáay shwaay" }]],
                    [[{ p: "ورکړی شوای", f: "wărkRey shwaay" }, { p: "ورکړی شوی", f: "wărkRey shwey" }, { p: "ورکړای شوای", f: "wărkRáay shwaay" }], [{ p: "ورکړی شوای", f: "wărkRey shwaay" }, { p: "ورکړی شوی", f: "wărkRey shwey" }, { p: "ورکړای شوای", f: "wărkRáay shwaay" }]],
                    [[{ p: "ورکړی شوای", f: "wărkRey shwaay" }, { p: "ورکړی شوی", f: "wărkRey shwey" }, { p: "ورکړای شوای", f: "wărkRáay shwaay" }], [{ p: "ورکړی شوای", f: "wărkRey shwaay" }, { p: "ورکړی شوی", f: "wărkRey shwey" }, { p: "ورکړای شوای", f: "wărkRáay shwaay" }]],
                    [[{ p: "ورکړی شوای", f: "wărkRey shwaay" }, { p: "ورکړی شوی", f: "wărkRey shwey" }, { p: "ورکړای شوای", f: "wărkRáay shwaay" }], [{ p: "ورکړی شوای", f: "wărkRey shwaay" }, { p: "ورکړی شوی", f: "wărkRey shwey" }, { p: "ورکړای شوای", f: "wărkRáay shwaay" }]],
                    [[{ p: "ورکړی شوای", f: "wărkRey shwaay" }, { p: "ورکړی شوی", f: "wărkRey shwey" }, { p: "ورکړای شوای", f: "wărkRáay shwaay" }], [{ p: "ورکړی شوای", f: "wărkRey shwaay" }, { p: "ورکړی شوی", f: "wărkRey shwey" }, { p: "ورکړای شوای", f: "wărkRáay shwaay" }]],
                ],
            },
        }, 
    },
    hypothetical: {
        short: [
            [[{ p: "ورکوی", f: "wărkawéy" }, { p: "ورکوای", f: "wărkawáay" }], [{ p: "ورکوی", f: "wărkawéy" }, { p: "ورکوای", f: "wărkawáay" }]],
            [[{ p: "ورکوی", f: "wărkawéy" }, { p: "ورکوای", f: "wărkawáay" }], [{ p: "ورکوی", f: "wărkawéy" }, { p: "ورکوای", f: "wărkawáay" }]],
            [[{ p: "ورکوی", f: "wărkawéy" }, { p: "ورکوای", f: "wărkawáay" }], [{ p: "ورکوی", f: "wărkawéy" }, { p: "ورکوای", f: "wărkawáay" }]],
            [[{ p: "ورکوی", f: "wărkawéy" }, { p: "ورکوای", f: "wărkawáay" }], [{ p: "ورکوی", f: "wărkawéy" }, { p: "ورکوای", f: "wărkawáay" }]],
            [[{ p: "ورکوی", f: "wărkawéy" }, { p: "ورکوای", f: "wărkawáay" }], [{ p: "ورکوی", f: "wărkawéy" }, { p: "ورکوای", f: "wărkawáay" }]],
            [[{ p: "ورکوی", f: "wărkawéy" }, { p: "ورکوای", f: "wărkawáay" }], [{ p: "ورکوی", f: "wărkawéy" }, { p: "ورکوای", f: "wărkawáay" }]],
        ],
        long: [
            [[{ p: "ورکولی", f: "wărkawúley" }, { p: "ورکولای", f: "wărkawúlaay" }], [{ p: "ورکولی", f: "wărkawúley" }, { p: "ورکولای", f: "wărkawúlaay" }]],
            [[{ p: "ورکولی", f: "wărkawúley" }, { p: "ورکولای", f: "wărkawúlaay" }], [{ p: "ورکولی", f: "wărkawúley" }, { p: "ورکولای", f: "wărkawúlaay" }]],
            [[{ p: "ورکولی", f: "wărkawúley" }, { p: "ورکولای", f: "wărkawúlaay" }], [{ p: "ورکولی", f: "wărkawúley" }, { p: "ورکولای", f: "wărkawúlaay" }]],
            [[{ p: "ورکولی", f: "wărkawúley" }, { p: "ورکولای", f: "wărkawúlaay" }], [{ p: "ورکولی", f: "wărkawúley" }, { p: "ورکولای", f: "wărkawúlaay" }]],
            [[{ p: "ورکولی", f: "wărkawúley" }, { p: "ورکولای", f: "wărkawúlaay" }], [{ p: "ورکولی", f: "wărkawúley" }, { p: "ورکولای", f: "wărkawúlaay" }]],
            [[{ p: "ورکولی", f: "wărkawúley" }, { p: "ورکولای", f: "wărkawúlaay" }], [{ p: "ورکولی", f: "wărkawúley" }, { p: "ورکولای", f: "wărkawúlaay" }]],
        ],
    },
    participle: {
        past: {
            masc: [
                [{ p: "ورکړی", f: "wărkúRey" }],
                [{ p: "ورکړي", f: "wărkúRee" }],
                [{ p: "ورکړیو", f: "wărkúRiyo" }, { p: "ورکړو", f: "wărkúRo" }],
            ],
            fem: [
                [{ p: "ورکړې", f: "wărkúRe" }],
                [{ p: "ورکړې", f: "wărkúRe" }],
                [{ p: "ورکړو", f: "wărkúRo" }],
            ],
        },
        present: {
            masc: [
                [{ p: "ورکوونکی", f: "wărkawóonkey" }],
                [{ p: "ورکوونکي", f: "wărkawóonkee" }],
                [{ p: "ورکوونکیو", f: "wărkawóonkiyo" }, { p: "ورکوونکو", f: "wărkedóonko" }],
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
            [[{p: "ورکړی", f: "wărkúRey"}], [{p: "ورکړي", f: "wărkúRee"}]],
            [[{p: "ورکړې", f: "wărkúRe"}], [{p: "ورکړې", f: "wărkúRe"}]],
            [[{p: "ورکړی", f: "wărkúRey"}], [{p: "ورکړي", f: "wărkúRee"}]],
            [[{p: "ورکړې", f: "wărkúRe"}], [{p: "ورکړې", f: "wărkúRe"}]],
            [[{p: "ورکړی", f: "wărkúRey"}], [{p: "ورکړي", f: "wărkúRee"}]],
            [[{p: "ورکړې", f: "wărkúRe"}], [{p: "ورکړې", f: "wărkúRe"}]],
        ],
        past: [
            [[{p: "ورکړی وم", f: "wărkúRey wum"}], [{p: "ورکړي وو", f: "wărkúRee woo"}]],
            [[{p: "ورکړې وم", f: "wărkúRe wum"}], [{p: "ورکړې وو", f: "wărkúRe woo"}]],
            [[{p: "ورکړی وې", f: "wărkúRey we"}], [{p: "ورکړي وئ", f: "wărkúRee weyy"}]],
            [[{p: "ورکړې وې", f: "wărkúRe we"}], [{p: "ورکړې وئ", f: "wărkúRe weyy"}]],
            [[{p: "ورکړی و", f: "wărkúRey wo"}], [{p: "ورکړي وو", f: "wărkúRee woo"}]],
            [[{p: "ورکړې وه", f: "wărkúRe wa"}], [{p: "ورکړې وې", f: "wărkúRe we"}]],
        ],
        present: [
            [[{p: "ورکړی یم", f: "wărkúRey yum"}], [{p: "ورکړي یو", f: "wărkúRee yoo"}]],
            [[{p: "ورکړې یم", f: "wărkúRe yum"}], [{p: "ورکړې یو", f: "wărkúRe yoo"}]],
            [[{p: "ورکړی یې", f: "wărkúRey ye"}], [{p: "ورکړي یئ", f: "wărkúRee yeyy"}]],
            [[{p: "ورکړې یې", f: "wărkúRe ye"}], [{p: "ورکړې یئ", f: "wărkúRe yeyy"}]],
            [[{p: "ورکړی دی", f: "wărkúRey dey"}], [{p: "ورکړي دي", f: "wărkúRee dee"}]],
            [[{p: "ورکړې ده", f: "wărkúRe da"}], [{p: "ورکړې دي", f: "wărkúRe dee"}]],
        ],
        habitual: [
            [[{p: "ورکړی یم", f: "wărkúRey yum"}], [{p: "ورکړي یو", f: "wărkúRee yoo"}]],
            [[{p: "ورکړې یم", f: "wărkúRe yum"}], [{p: "ورکړې یو", f: "wărkúRe yoo"}]],
            [[{p: "ورکړی یې", f: "wărkúRey ye"}], [{p: "ورکړي یئ", f: "wărkúRee yeyy"}]],
            [[{p: "ورکړې یې", f: "wărkúRe ye"}], [{p: "ورکړې یئ", f: "wărkúRe yeyy"}]],
            [[{p: "ورکړی وي", f: "wărkúRey wee"}], [{p: "ورکړي وي", f: "wărkúRee wee"}]],
            [[{p: "ورکړې وي", f: "wărkúRe wee"}], [{p: "ورکړې وي", f: "wărkúRe wee"}]],
        ],
        subjunctive: [
            [[{p: "ورکړی وم", f: "wărkúRey wum"}], [{p: "ورکړي وو", f: "wărkúRee woo"}]],
            [[{p: "ورکړې وم", f: "wărkúRe wum"}], [{p: "ورکړې وو", f: "wărkúRe woo"}]],
            [[{p: "ورکړی وې", f: "wărkúRey we"}], [{p: "ورکړي وئ", f: "wărkúRee weyy"}]],
            [[{p: "ورکړې وې", f: "wărkúRe we"}], [{p: "ورکړې وئ", f: "wărkúRe weyy"}]],
            [[{p: "ورکړی وي", f: "wărkúRey wee"}], [{p: "ورکړي وي", f: "wărkúRee wee"}]],
            [[{p: "ورکړې وي", f: "wărkúRe wee"}], [{p: "ورکړې وي", f: "wărkúRe wee"}]],
        ],
        future: [
            [[{p: "به ورکړی یم", f: "ba wărkúRey yum"}], [{p: "به ورکړي یو", f: "ba wărkúRee yoo"}]],
            [[{p: "به ورکړې یم", f: "ba wărkúRe yum"}], [{p: "به ورکړې یو", f: "ba wărkúRe yoo"}]],
            [[{p: "به ورکړی یې", f: "ba wărkúRey ye"}], [{p: "به ورکړي یئ", f: "ba wărkúRee yeyy"}]],
            [[{p: "به ورکړې یې", f: "ba wărkúRe ye"}], [{p: "به ورکړې یئ", f: "ba wărkúRe yeyy"}]],
            [[{p: "به ورکړی وي", f: "ba wărkúRey wee"}], [{p: "به ورکړي وي", f: "ba wărkúRee wee"}]],
            [[{p: "به ورکړې وي", f: "ba wărkúRe wee"}], [{p: "به ورکړې وي", f: "ba wărkúRe wee"}]],
        ],
        affirmational: [
            [[{p: "به ورکړی وم", f: "ba wărkúRey wum"}], [{p: "به ورکړي وو", f: "ba wărkúRee woo"}]],
            [[{p: "به ورکړې وم", f: "ba wărkúRe wum"}], [{p: "به ورکړې وو", f: "ba wărkúRe woo"}]],
            [[{p: "به ورکړی وې", f: "ba wărkúRey we"}], [{p: "به ورکړي وئ", f: "ba wărkúRee weyy"}]],
            [[{p: "به ورکړې وې", f: "ba wărkúRe we"}], [{p: "به ورکړې وئ", f: "ba wărkúRe weyy"}]],
            [[{p: "به ورکړی و", f: "ba wărkúRey wo"}], [{p: "به ورکړي وو", f: "ba wărkúRee woo"}]],
            [[{p: "به ورکړې وه", f: "ba wărkúRe wa"}], [{p: "به ورکړې وې", f: "ba wărkúRe we"}]],
        ],
        pastSubjunctiveHypothetical: [
            [[{p: "ورکړی وای", f: "wărkúRey waay"}, {p: "ورکړی وی", f: "wărkúRey wey"}], [{p: "ورکړی وای", f: "wărkúRey waay"}, {p: "ورکړی وی", f: "wărkúRey wey"}]], 
            [[{p: "ورکړې وای", f: "wărkúRe waay"}, {p: "ورکړې وی", f: "wărkúRe wey"}], [{p: "ورکړې وای", f: "wărkúRe waay"}, {p: "ورکړې وی", f: "wărkúRe wey"}]],
            [[{p: "ورکړی وای", f: "wărkúRey waay"}, {p: "ورکړی وی", f: "wărkúRey wey"}], [{p: "ورکړی وای", f: "wărkúRey waay"}, {p: "ورکړی وی", f: "wărkúRey wey"}]], 
            [[{p: "ورکړې وای", f: "wărkúRe waay"}, {p: "ورکړې وی", f: "wărkúRe wey"}], [{p: "ورکړې وای", f: "wărkúRe waay"}, {p: "ورکړې وی", f: "wărkúRe wey"}]],
            [[{p: "ورکړی وای", f: "wărkúRey waay"}, {p: "ورکړی وی", f: "wărkúRey wey"}], [{p: "ورکړی وای", f: "wărkúRey waay"}, {p: "ورکړی وی", f: "wărkúRey wey"}]], 
            [[{p: "ورکړې وای", f: "wărkúRe waay"}, {p: "ورکړې وی", f: "wărkúRe wey"}], [{p: "ورکړې وای", f: "wărkúRe waay"}, {p: "ورکړې وی", f: "wărkúRe wey"}]],
        ],
    },
    // passive: {
    //     imperfective: {
    //         nonImperative: [
    //             [{p: "ورکول کېږم", f: "wărkawul keGum"}, {p: "ورکول کېږو", f: "wărkawul keGoo"}],
    //             [{p: "ورکول کېږې", f: "wărkawul keGe"}, {p: "ورکول کېږئ", f: "wărkawul keGeyy"}],
    //             [{p: "ورکول کېږي", f: "wărkawul keGee"}, {p: "ورکول کېږي", f: "wărkawul keGee"}],
    //         ],
    //         future: [
    //             [{p: "به ورکول کېږم", f: "ba wărkawul keGum"}, {p: "به ورکول کېږو", f: "ba wărkawul keGoo"}],
    //             [{p: "به ورکول کېږې", f: "ba wărkawul keGe"}, {p: "به ورکول کېږئ", f: "ba wărkawul keGeyy"}],
    //             [{p: "به ورکول کېږي", f: "ba wărkawul keGee"}, {p: "به ورکول کېږي", f: "ba wărkawul keGee"}],
    //         ],
    //         past: {
    //             short: [
    //                 [[{p: "ورکول کېدم", f: "wărkawul kedum"}], [{p: "ورکول کېدو", f: "wărkawul kedóo"}]],
    //                 [[{p: "ورکول کېدم", f: "wărkawul kedum"}], [{p: "ورکول کېدو", f: "wărkawul kedóo"}]],
    //                 [[{p: "ورکول کېدې", f: "wărkawul kedé"}], [{p: "ورکول کېدئ", f: "wărkawul kedéyy"}]],
    //                 [[{p: "ورکول کېدې", f: "wărkawul kedé"}], [{p: "ورکول کېدئ", f: "wărkawul kedéyy"}]],
    //                 [[{p: "ورکول کېده", f: "wărkawul kedu"}, {p: "ورکول کېدو", f: "wărkawul kedó"}], [{p: "ورکول کېدل", f: "wărkawul kedul"}]],
    //                 [[{p: "ورکول کېده", f: "wărkawul kedá"}], [{p: "ورکول کېدې", f: "wărkawul kedé"}]],
    //             ],
    //             long: [
    //                 [[{p: "ورکول کېدلم", f: "wărkawul kedúlum"}], [{p: "ورکول کېدلو", f: "wărkawul kedúloo"}]],
    //                 [[{p: "ورکول کېدلم", f: "wărkawul kedúlum"}], [{p: "ورکول کېدلو", f: "wărkawul kedúloo"}]],
    //                 [[{p: "ورکول کېدلې", f: "wărkawul kedúle"}], [{p: "ورکول کېدلئ", f: "wărkawul kedúleyy"}]],
    //                 [[{p: "ورکول کېدلې", f: "wărkawul kedúle"}], [{p: "ورکول کېدلئ", f: "wărkawul kedúleyy"}]],
    //                 [[{p: "ورکول کېدله", f: "wărkawul kedúlu"}, {p: "ورکول کېدلو", f: "wărkawul kedúlo"}], [{p: "ورکول کېدل", f: "wărkawul kedúl"}]],
    //                 [[{p: "ورکول کېدله", f: "wărkawul kedúla"}], [{p: "ورکول کېدلې", f: "wărkawul kedúle"}]],
    //             ],
    //         },
    //     },
    //     perfective: {
    //         nonImperative: {
    //             short: [
    //                 [{p: "ورکړلی کېږم", f: "wărkRuley keGum"}, {p: "ورکړلی کېږو", f: "wărkRuley keGoo"}],
    //                 [{p: "ورکړلی کېږې", f: "wărkRuley keGe"}, {p: "ورکړلی کېږئ", f: "wărkRuley keGeyy"}],
    //                 [{p: "ورکړلی کېږي", f: "wărkRuley keGee"}, {p: "ورکړلی کېږي", f: "wărkRuley keGee"}],
    //             ],
    //             long: [
    //                 [{p: "ورکړی کېږم", f: "wărkRey keGum"}, {p: "ورکړی کېږو", f: "wărkRey keGoo"}],
    //                 [{p: "ورکړی کېږې", f: "wărkRey keGe"}, {p: "ورکړی کېږئ", f: "wărkRey keGeyy"}],
    //                 [{p: "ورکړی کېږي", f: "wărkRey keGee"}, {p: "ورکړی کېږي", f: "wărkRey keGee"}],
    //             ],
    //         },
    //         future: {
    //             short: [
    //                 [{p: "به ورکړلی کېږم", f: "ba wărkRuley keGum"}, {p: "به ورکړلی کېږو", f: "ba wărkRuley keGoo"}],
    //                 [{p: "به ورکړلی کېږې", f: "ba wărkRuley keGe"}, {p: "به ورکړلی کېږئ", f: "ba wărkRuley keGeyy"}],
    //                 [{p: "به ورکړلی کېږي", f: "ba wărkRuley keGee"}, {p: "به ورکړلی کېږي", f: "ba wărkRuley keGee"}],
    //             ],
    //             long: [
    //                 [{p: "به ورکړی کېږم", f: "ba wărkRey keGum"}, {p: "به ورکړی کېږو", f: "ba wărkRey keGoo"}],
    //                 [{p: "به ورکړی کېږې", f: "ba wărkRey keGe"}, {p: "به ورکړی کېږئ", f: "ba wărkRey keGeyy"}],
    //                 [{p: "به ورکړی کېږي", f: "ba wărkRey keGee"}, {p: "به ورکړی کېږي", f: "ba wărkRey keGee"}],
    //             ],
    //         },
    //         past: {
    //             short: [
    //                 [[{p: "ورکړی شوم", f: "wărkRey shwum"}], [{p: "ورکړی شو", f: "wărkRey shoo"}]],
    //                 [[{p: "ورکړی شوم", f: "wărkRey shwum"}], [{p: "ورکړی شو", f: "wărkRey shoo"}]],
    //                 [[{p: "ورکړی شوې", f: "wărkRey shwe"}], [{p: "ورکړی شوئ", f: "wărkRey shweyy"}]],
    //                 [[{p: "ورکړی شوې", f: "wărkRey shwe"}], [{p: "ورکړی شوئ", f: "wărkRey shweyy"}]],
    //                 [[{p: "ورکړی شو", f: "wărkRey sho"}], [{p: "ورکړی شو", f: "wărkRey shoo"}, {p: "ورکړی شول", f: "wărkRey shwul"}]],
    //                 [[{p: "ورکړی شوه", f: "wărkRey shwa"}], [{p: "ورکړی شوې", f: "wărkRey shwe"}]],
    //             ],
    //             long: [
    //                 [[{p: "ورکړلی شوم", f: "wărkRúley shwum"}], [{p: "ورکړلی شو", f: "wărkRúley shoo"}]],
    //                 [[{p: "ورکړلی شوم", f: "wărkRúley shwum"}], [{p: "ورکړلی شو", f: "wărkRúley shoo"}]],
    //                 [[{p: "ورکړلی شوې", f: "wărkRúley shwe"}], [{p: "ورکړلی شوئ", f: "wărkRúley shweyy"}]],
    //                 [[{p: "ورکړلی شوې", f: "wărkRúley shwe"}], [{p: "ورکړلی شوئ", f: "wărkRúley shweyy"}]],
    //                 [[{p: "ورکړلی شو", f: "wărkRúley sho"}], [{p: "ورکړلی شو", f: "wărkRúley shoo"}, {p: "ورکړلی شول", f: "wărkRúley shwul"}]],
    //                 [[{p: "ورکړلی شوه", f: "wărkRúley shwa"}], [{p: "ورکړلی شوې", f: "wărkRúley shwe"}]],
    //             ],
    //         },
    //     },
    //     perfect: {
    //         halfPerfect: {
    //             short: [
    //                 [[{p: "ورکړی شوی", f: "wărkRéy shuwey"}], [{p: "ورکړی شوي", f: "wărkRéy shuwee"}]],
    //                 [[{p: "ورکړی شوې", f: "wărkRéy shuwe"}], [{p: "ورکړی شوې", f: "wărkRéy shuwe"}]],
    //                 [[{p: "ورکړی شوی", f: "wărkRéy shuwey"}], [{p: "ورکړی شوي", f: "wărkRéy shuwee"}]],
    //                 [[{p: "ورکړی شوې", f: "wărkRéy shuwe"}], [{p: "ورکړی شوې", f: "wărkRéy shuwe"}]],
    //                 [[{p: "ورکړی شوی", f: "wărkRéy shuwey"}], [{p: "ورکړی شوي", f: "wărkRéy shuwee"}]],
    //                 [[{p: "ورکړی شوې", f: "wărkRéy shuwe"}], [{p: "ورکړی شوې", f: "wărkRéy shuwe"}]],
    //             ],
    //             long: [
    //                 [[{p: "ورکړلی شوی", f: "wărkRúley shuwey"}], [{p: "ورکړلی شوي", f: "wărkRúley shuwee"}]],
    //                 [[{p: "ورکړلی شوې", f: "wărkRúley shuwe"}], [{p: "ورکړلی شوې", f: "wărkRúley shuwe"}]],
    //                 [[{p: "ورکړلی شوی", f: "wărkRúley shuwey"}], [{p: "ورکړلی شوي", f: "wărkRúley shuwee"}]],
    //                 [[{p: "ورکړلی شوې", f: "wărkRúley shuwe"}], [{p: "ورکړلی شوې", f: "wărkRúley shuwe"}]],
    //                 [[{p: "ورکړلی شوی", f: "wărkRúley shuwey"}], [{p: "ورکړلی شوي", f: "wărkRúley shuwee"}]],
    //                 [[{p: "ورکړلی شوې", f: "wărkRúley shuwe"}], [{p: "ورکړلی شوې", f: "wărkRúley shuwe"}]],
    //             ],
    //         },
    //         past: {
    //             short: [
    //                 [[{p: "ورکړی شوی وم", f: "wărkRéy shuwey wum"}], [{p: "ورکړی شوي وو", f: "wărkRéy shuwee woo"}]],
    //                 [[{p: "ورکړی شوې وم", f: "wărkRéy shuwe wum"}], [{p: "ورکړی شوې وو", f: "wărkRéy shuwe woo"}]],
    //                 [[{p: "ورکړی شوی وې", f: "wărkRéy shuwey we"}], [{p: "ورکړی شوي وئ", f: "wărkRéy shuwee weyy"}]],
    //                 [[{p: "ورکړی شوې وې", f: "wărkRéy shuwe we"}], [{p: "ورکړی شوې وئ", f: "wărkRéy shuwe weyy"}]],
    //                 [[{p: "ورکړی شوی و", f: "wărkRéy shuwey wo"}], [{p: "ورکړی شوي وو", f: "wărkRéy shuwee woo"}]],
    //                 [[{p: "ورکړی شوې وه", f: "wărkRéy shuwe wa"}], [{p: "ورکړی شوې وې", f: "wărkRéy shuwe we"}]],
    //             ],
    //             long: [
    //                 [[{p: "ورکړلی شوی وم", f: "wărkRúley shuwey wum"}], [{p: "ورکړلی شوي وو", f: "wărkRúley shuwee woo"}]],
    //                 [[{p: "ورکړلی شوې وم", f: "wărkRúley shuwe wum"}], [{p: "ورکړلی شوې وو", f: "wărkRúley shuwe woo"}]],
    //                 [[{p: "ورکړلی شوی وې", f: "wărkRúley shuwey we"}], [{p: "ورکړلی شوي وئ", f: "wărkRúley shuwee weyy"}]],
    //                 [[{p: "ورکړلی شوې وې", f: "wărkRúley shuwe we"}], [{p: "ورکړلی شوې وئ", f: "wărkRúley shuwe weyy"}]],
    //                 [[{p: "ورکړلی شوی و", f: "wărkRúley shuwey wo"}], [{p: "ورکړلی شوي وو", f: "wărkRúley shuwee woo"}]],
    //                 [[{p: "ورکړلی شوې وه", f: "wărkRúley shuwe wa"}], [{p: "ورکړلی شوې وې", f: "wărkRúley shuwe we"}]],
    //             ],
    //         },
    //         present: {
    //             short: [
    //                 [[{p: "ورکړی شوی یم", f: "wărkRéy shuwey yum"}], [{p: "ورکړی شوي یو", f: "wărkRéy shuwee yoo"}]],
    //                 [[{p: "ورکړی شوې یم", f: "wărkRéy shuwe yum"}], [{p: "ورکړی شوې یو", f: "wărkRéy shuwe yoo"}]],
    //                 [[{p: "ورکړی شوی یې", f: "wărkRéy shuwey ye"}], [{p: "ورکړی شوي یئ", f: "wărkRéy shuwee yeyy"}]],
    //                 [[{p: "ورکړی شوې یې", f: "wărkRéy shuwe ye"}], [{p: "ورکړی شوې یئ", f: "wărkRéy shuwe yeyy"}]],
    //                 [[{p: "ورکړی شوی دی", f: "wărkRéy shuwey dey"}], [{p: "ورکړی شوي دي", f: "wărkRéy shuwee dee"}]],
    //                 [[{p: "ورکړی شوې ده", f: "wărkRéy shuwe da"}], [{p: "ورکړی شوې دي", f: "wărkRéy shuwe dee"}]],
    //             ],
    //             long: [
    //                 [[{p: "ورکړلی شوی یم", f: "wărkRúley shuwey yum"}], [{p: "ورکړلی شوي یو", f: "wărkRúley shuwee yoo"}]],
    //                 [[{p: "ورکړلی شوې یم", f: "wărkRúley shuwe yum"}], [{p: "ورکړلی شوې یو", f: "wărkRúley shuwe yoo"}]],
    //                 [[{p: "ورکړلی شوی یې", f: "wărkRúley shuwey ye"}], [{p: "ورکړلی شوي یئ", f: "wărkRúley shuwee yeyy"}]],
    //                 [[{p: "ورکړلی شوې یې", f: "wărkRúley shuwe ye"}], [{p: "ورکړلی شوې یئ", f: "wărkRúley shuwe yeyy"}]],
    //                 [[{p: "ورکړلی شوی دی", f: "wărkRúley shuwey dey"}], [{p: "ورکړلی شوي دي", f: "wărkRúley shuwee dee"}]],
    //                 [[{p: "ورکړلی شوې ده", f: "wărkRúley shuwe da"}], [{p: "ورکړلی شوې دي", f: "wărkRúley shuwe dee"}]],
    //             ],
    //         },
    //         future: {
    //             short: [
    //                 [[{p: "به ورکړی شوی یم", f: "ba wărkRéy shuwey yum"}], [{p: "به ورکړی شوي یو", f: "ba wărkRéy shuwee yoo"}]],
    //                 [[{p: "به ورکړی شوې یم", f: "ba wărkRéy shuwe yum"}], [{p: "به ورکړی شوې یو", f: "ba wărkRéy shuwe yoo"}]],
    //                 [[{p: "به ورکړی شوی یې", f: "ba wărkRéy shuwey ye"}], [{p: "به ورکړی شوي یئ", f: "ba wărkRéy shuwee yeyy"}]],
    //                 [[{p: "به ورکړی شوې یې", f: "ba wărkRéy shuwe ye"}], [{p: "به ورکړی شوې یئ", f: "ba wărkRéy shuwe yeyy"}]],
    //                 [[{p: "به ورکړی شوی وي", f: "ba wărkRéy shuwey wee"}], [{p: "به ورکړی شوي وي", f: "ba wărkRéy shuwee wee"}]],
    //                 [[{p: "به ورکړی شوې وي", f: "ba wărkRéy shuwe wee"}], [{p: "به ورکړی شوې وي", f: "ba wărkRéy shuwe wee"}]],
    //             ],
    //             long: [
    //                 [[{p: "به ورکړلی شوی یم", f: "ba wărkRúley shuwey yum"}], [{p: "به ورکړلی شوي یو", f: "ba wărkRúley shuwee yoo"}]],
    //                 [[{p: "به ورکړلی شوې یم", f: "ba wărkRúley shuwe yum"}], [{p: "به ورکړلی شوې یو", f: "ba wărkRúley shuwe yoo"}]],
    //                 [[{p: "به ورکړلی شوی یې", f: "ba wărkRúley shuwey ye"}], [{p: "به ورکړلی شوي یئ", f: "ba wărkRúley shuwee yeyy"}]],
    //                 [[{p: "به ورکړلی شوې یې", f: "ba wărkRúley shuwe ye"}], [{p: "به ورکړلی شوې یئ", f: "ba wărkRúley shuwe yeyy"}]],
    //                 [[{p: "به ورکړلی شوی وي", f: "ba wărkRúley shuwey wee"}], [{p: "به ورکړلی شوي وي", f: "ba wărkRúley shuwee wee"}]],
    //                 [[{p: "به ورکړلی شوې وي", f: "ba wărkRúley shuwe wee"}], [{p: "به ورکړلی شوې وي", f: "ba wărkRúley shuwe wee"}]],
    //             ],
    //         },
    //         affirmational: {
    //             short: [
    //                 [[{p: "به ورکړی شوی وم", f: "ba wărkRéy shuwey wum"}], [{p: "به ورکړی شوي وو", f: "ba wărkRéy shuwee woo"}]],
    //                 [[{p: "به ورکړی شوې وم", f: "ba wărkRéy shuwe wum"}], [{p: "به ورکړی شوې وو", f: "ba wărkRéy shuwe woo"}]],
    //                 [[{p: "به ورکړی شوی وې", f: "ba wărkRéy shuwey we"}], [{p: "به ورکړی شوي وئ", f: "ba wărkRéy shuwee weyy"}]],
    //                 [[{p: "به ورکړی شوې وې", f: "ba wărkRéy shuwe we"}], [{p: "به ورکړی شوې وئ", f: "ba wărkRéy shuwe weyy"}]],
    //                 [[{p: "به ورکړی شوی و", f: "ba wărkRéy shuwey wo"}], [{p: "به ورکړی شوي وو", f: "ba wărkRéy shuwee woo"}]],
    //                 [[{p: "به ورکړی شوې وه", f: "ba wărkRéy shuwe wa"}], [{p: "به ورکړی شوې وې", f: "ba wărkRéy shuwe we"}]],
    //             ],
    //             long: [
    //                 [[{p: "به ورکړلی شوی وم", f: "ba wărkRúley shuwey wum"}], [{p: "به ورکړلی شوي وو", f: "ba wărkRúley shuwee woo"}]],
    //                 [[{p: "به ورکړلی شوې وم", f: "ba wărkRúley shuwe wum"}], [{p: "به ورکړلی شوې وو", f: "ba wărkRúley shuwe woo"}]],
    //                 [[{p: "به ورکړلی شوی وې", f: "ba wărkRúley shuwey we"}], [{p: "به ورکړلی شوي وئ", f: "ba wărkRúley shuwee weyy"}]],
    //                 [[{p: "به ورکړلی شوې وې", f: "ba wărkRúley shuwe we"}], [{p: "به ورکړلی شوې وئ", f: "ba wărkRúley shuwe weyy"}]],
    //                 [[{p: "به ورکړلی شوی و", f: "ba wărkRúley shuwey wo"}], [{p: "به ورکړلی شوي وو", f: "ba wărkRúley shuwee woo"}]],
    //                 [[{p: "به ورکړلی شوې وه", f: "ba wărkRúley shuwe wa"}], [{p: "به ورکړلی شوې وې", f: "ba wărkRúley shuwe we"}]],
    //             ],
    //         },
    //         pastSubjunctiveHypothetical: {
    //             short: [
    //                 [[{p: "ورکړی شوی وای", f: "ba wărkRéy shuwey"}], [{p: "به ورکړی شوي", f: "ba wărkRéy shuwee"}]],
    //                 [[{p: "ورکړی شوې وای", f: "ba wărkRéy shuwe"}], [{p: "به ورکړی شوې", f: "ba wărkRéy shuwe"}]],
    //                 [[{p: "ورکړی شوی وای", f: "ba wărkRéy shuwey"}], [{p: "به ورکړی شوي", f: "ba wărkRéy shuwee"}]],
    //                 [[{p: "ورکړی شوې وای", f: "ba wărkRéy shuwe"}], [{p: "به ورکړی شوې", f: "ba wărkRéy shuwe"}]],
    //                 [[{p: "ورکړی شوی وای", f: "ba wărkRéy shuwey"}], [{p: "به ورکړی شوي", f: "ba wărkRéy shuwee"}]],
    //                 [[{p: "ورکړی شوې وای", f: "ba wărkRéy shuwe"}], [{p: "به ورکړی شوې", f: "ba wărkRéy shuwe"}]],
    //             ],
    //             long: [
    //                 [[{p: "ورکړلی شوی وای", f: "ba wărkRúley shuwey"}], [{p: "به ورکړلی شوي", f: "ba wărkRúley shuwee"}]],
    //                 [[{p: "ورکړلی شوې وای", f: "ba wărkRúley shuwe"}], [{p: "به ورکړلی شوې", f: "ba wărkRúley shuwe"}]],
    //                 [[{p: "ورکړلی شوی وای", f: "ba wărkRúley shuwey"}], [{p: "به ورکړلی شوي", f: "ba wărkRúley shuwee"}]],
    //                 [[{p: "ورکړلی شوې وای", f: "ba wărkRúley shuwe"}], [{p: "به ورکړلی شوې", f: "ba wărkRúley shuwe"}]],
    //                 [[{p: "ورکړلی شوی وای", f: "ba wărkRúley shuwey"}], [{p: "به ورکړلی شوي", f: "ba wărkRúley shuwee"}]],
    //                 [[{p: "ورکړلی شوې وای", f: "ba wărkRúley shuwe"}], [{p: "به ورکړلی شوې", f: "ba wărkRúley shuwe"}]],
    //             ],
    //         },
    //     },
    // },
};

export function checkForIrregularConjugation(entry: T.DictionaryEntry): T.VerbConjugation | null {
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
    return null;
}
