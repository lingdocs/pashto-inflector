/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    concatPsString,
    firstPhonetics,
    makePsString,
    removeEndingL,
    yulEndingInfinitive,
    mapVerbBlock,
    allMascFirstInflection,
    addToForm,
    unisexInfToObjectMatrix,
    complementInflects,
    concatInflections,
    psStringEquals,
    removeRetroflexR,
} from "./p-text-helpers";
import * as T from "../types";
import {
    pastEndings
} from "./grammar-units";

test(`concatPsString should work`, () => {
    const input = concatPsString(
        { p: "لیکل", f: "leekul" },
        { p: "ی", f: "ey" },
        " ",
        { p: "دی", f: "dey" },
    );
    expect(input).toEqual({ p: "لیکلی دی", f: "leekuley dey" });
    // test with length options added
    const inputWLength = concatPsString(
        { p: "خفه", f: "khufa" },
        " ",
        {
            short: { p: "کړو", f: "kRo" },
            long: { p: "کړلو", f: "kRulo" },
        },
    );
    expect(inputWLength).toEqual({
        short: { p: "خفه کړو", f: "khufa kRo" },
        long: { p: "خفه کړلو", f: "khufa kRulo" },
    });
    // even with minin
    const inputWMini = concatPsString(
        { p: "خفه", f: "khufa" },
        " ",
        {
            short: { p: "کړی", f: "kRey" },
            long: { p: "کړلی", f: "kRuley" },
        },
        " ",
        {
            mini: { p: "کو", f: "ko" },
            short: { p: "کړو", f: "kRo" },
            long: { p: "کړلو", f: "kRulo" },
        },
    );
    expect(inputWMini).toEqual({
        mini: { p: "خفه کړی کو", f: "khufa kRey ko" },
        short: { p: "خفه کړی کړو", f: "khufa kRey kRo" },
        long: { p: "خفه کړلی کړلو", f: "khufa kRuley kRulo" },
    });
    // also with personInflections
    const inputWPersInfs = concatPsString(
        {
            mascSing: { p: "پوخ", f: "pokh" },
            mascPlur: { p: "پاخه", f: "paakhu" },
            femSing: { p: "پخه", f: "pakha" },
            femPlur: { p: "پخې", f: "pakhe" },
        },
        " ",
        {
            short: { p: "ک", f: "k" },
            long: { p: "کړ", f: "kR" },
        },
    );
    expect(inputWPersInfs).toEqual({
        mascSing: {
            short: { p: "پوخ ک", f: "pokh k" },
            long: { p: "پوخ کړ", f: "pokh kR" },
        },
        mascPlur: {
            short: { p: "پاخه ک", f: "paakhu k" },
            long: { p: "پاخه کړ", f: "paakhu kR" },
        },
        femSing: {
            short: { p: "پخه ک", f: "pakha k" },
            long: { p: "پخه کړ", f: "pakha kR" },
        },
        femPlur: {
            short: { p: "پخې ک", f: "pakhe k" },
            long: { p: "پخې کړ", f: "pakhe kR" },
        },
    });
});

test(`addToForm should work`, () => {
    const block: T.VerbBlock = [
        [[{p: "شوی", f: "shuwey"}], [{p: "شوي", f: "shuwee"}]],
        [[{p: "شوې", f: "shuwe"}], [{p: "شوې", f: "shuwe"}]],
        [[{p: "شوی", f: "shuwey"}], [{p: "شوي", f: "shuwee"}]],
        [[{p: "شوې", f: "shuwe"}], [{p: "شوې", f: "shuwe"}]],
        [[{p: "شوی", f: "shuwey"}], [{p: "شوي", f: "shuwee"}]],
        [[{p: "شوې", f: "shuwe"}], [{p: "شوې", f: "shuwe"}]],
    ];
    const result = addToForm([{ p: "خفه", f: "khufa" }, " "], block);
    expect(result).toEqual([
        [[{p: "خفه شوی", f: "khufa shuwey"}], [{p: "خفه شوي", f: "khufa shuwee"}]],
        [[{p: "خفه شوې", f: "khufa shuwe"}], [{p: "خفه شوې", f: "khufa shuwe"}]],
        [[{p: "خفه شوی", f: "khufa shuwey"}], [{p: "خفه شوي", f: "khufa shuwee"}]],
        [[{p: "خفه شوې", f: "khufa shuwe"}], [{p: "خفه شوې", f: "khufa shuwe"}]],
        [[{p: "خفه شوی", f: "khufa shuwey"}], [{p: "خفه شوي", f: "khufa shuwee"}]],
        [[{p: "خفه شوې", f: "khufa shuwe"}], [{p: "خفه شوې", f: "khufa shuwe"}]],
    ]);
    const result2 = addToForm([{ 
        short: { p: "کړی", f: "kRey" }, 
        long: { p: "کړلی", f: "kRuley" },
    }, " "], block);
    expect(result2).toEqual({
        short: [
            [[{p: "کړی شوی", f: "kRey shuwey"}], [{p: "کړی شوي", f: "kRey shuwee"}]],
            [[{p: "کړی شوې", f: "kRey shuwe"}], [{p: "کړی شوې", f: "kRey shuwe"}]],
            [[{p: "کړی شوی", f: "kRey shuwey"}], [{p: "کړی شوي", f: "kRey shuwee"}]],
            [[{p: "کړی شوې", f: "kRey shuwe"}], [{p: "کړی شوې", f: "kRey shuwe"}]],
            [[{p: "کړی شوی", f: "kRey shuwey"}], [{p: "کړی شوي", f: "kRey shuwee"}]],
            [[{p: "کړی شوې", f: "kRey shuwe"}], [{p: "کړی شوې", f: "kRey shuwe"}]],
        ],
        long: [
            [[{p: "کړلی شوی", f: "kRuley shuwey"}], [{p: "کړلی شوي", f: "kRuley shuwee"}]],
            [[{p: "کړلی شوې", f: "kRuley shuwe"}], [{p: "کړلی شوې", f: "kRuley shuwe"}]],
            [[{p: "کړلی شوی", f: "kRuley shuwey"}], [{p: "کړلی شوي", f: "kRuley shuwee"}]],
            [[{p: "کړلی شوې", f: "kRuley shuwe"}], [{p: "کړلی شوې", f: "kRuley shuwe"}]],
            [[{p: "کړلی شوی", f: "kRuley shuwey"}], [{p: "کړلی شوي", f: "kRuley shuwee"}]],
            [[{p: "کړلی شوې", f: "kRuley shuwe"}], [{p: "کړلی شوې", f: "kRuley shuwe"}]],
        ],
    });
    const result3 = addToForm([ 
        {
            masc: [
                [{ p: "زوړ", f: "zoR" }],
                [{ p: "زاړه", f: "zaaRu" }],
                [{ p: "زړو", f: "zaRo" }],
            ],
            fem: [
                [{ p: "زړه", f: "zaRa" }],
                [{ p: "زړې", f: "zaRe" }],
                [{ p: "زړو", f: "zaRo" }],
            ],
        },
        " ",
        [
            { p: "کړل", f: "kRul" },
            { 
                short: { p: "کړی", f: "kRey" }, 
                long: { p: "کړلی", f: "kRuley" },
            },
        ],
        " ",
    ], block);
    const expected3 = {
        long: [
            [
                [{p: "زوړ کړل شوی", f: "zoR kRul shuwey"}, {p: "زوړ کړلی شوی", f: "zoR kRuley shuwey"}],
                [{p: "زاړه کړل شوي", f: "zaaRu kRul shuwee"}, {p: "زاړه کړلی شوي", f: "zaaRu kRuley shuwee"}]
            ],
            [
                [{p: "زړه کړل شوې", f: "zaRa kRul shuwe"}, {p: "زړه کړلی شوې", f: "zaRa kRuley shuwe"}],
                [{p: "زړې کړل شوې", f: "zaRe kRul shuwe"}, {p: "زړې کړلی شوې", f: "zaRe kRuley shuwe"}],
            ],
            [
                [{p: "زوړ کړل شوی", f: "zoR kRul shuwey"}, {p: "زوړ کړلی شوی", f: "zoR kRuley shuwey"}],
                [{p: "زاړه کړل شوي", f: "zaaRu kRul shuwee"}, {p: "زاړه کړلی شوي", f: "zaaRu kRuley shuwee"}]
            ],
            [
                [{p: "زړه کړل شوې", f: "zaRa kRul shuwe"}, {p: "زړه کړلی شوې", f: "zaRa kRuley shuwe"}],
                [{p: "زړې کړل شوې", f: "zaRe kRul shuwe"}, {p: "زړې کړلی شوې", f: "zaRe kRuley shuwe"}],
            ],
            [
                [{p: "زوړ کړل شوی", f: "zoR kRul shuwey"}, {p: "زوړ کړلی شوی", f: "zoR kRuley shuwey"}],
                [{p: "زاړه کړل شوي", f: "zaaRu kRul shuwee"}, {p: "زاړه کړلی شوي", f: "zaaRu kRuley shuwee"}]
            ],
            [
                [{p: "زړه کړل شوې", f: "zaRa kRul shuwe"}, {p: "زړه کړلی شوې", f: "zaRa kRuley shuwe"}],
                [{p: "زړې کړل شوې", f: "zaRe kRul shuwe"}, {p: "زړې کړلی شوې", f: "zaRe kRuley shuwe"}],
            ],
        ],
        short: [
            [
                [{p: "زوړ کړل شوی", f: "zoR kRul shuwey"}, {p: "زوړ کړی شوی", f: "zoR kRey shuwey"}],
                [{p: "زاړه کړل شوي", f: "zaaRu kRul shuwee"}, {p: "زاړه کړی شوي", f: "zaaRu kRey shuwee"}]
            ],
            [
                [{p: "زړه کړل شوې", f: "zaRa kRul shuwe"}, {p: "زړه کړی شوې", f: "zaRa kRey shuwe"}],
                [{p: "زړې کړل شوې", f: "zaRe kRul shuwe"}, {p: "زړې کړی شوې", f: "zaRe kRey shuwe"}],
            ],
            [
                [{p: "زوړ کړل شوی", f: "zoR kRul shuwey"}, {p: "زوړ کړی شوی", f: "zoR kRey shuwey"}],
                [{p: "زاړه کړل شوي", f: "zaaRu kRul shuwee"}, {p: "زاړه کړی شوي", f: "zaaRu kRey shuwee"}]
            ],
            [
                [{p: "زړه کړل شوې", f: "zaRa kRul shuwe"}, {p: "زړه کړی شوې", f: "zaRa kRey shuwe"}],
                [{p: "زړې کړل شوې", f: "zaRe kRul shuwe"}, {p: "زړې کړی شوې", f: "zaRe kRey shuwe"}],
            ],
            [
                [{p: "زوړ کړل شوی", f: "zoR kRul shuwey"}, {p: "زوړ کړی شوی", f: "zoR kRey shuwey"}],
                [{p: "زاړه کړل شوي", f: "zaaRu kRul shuwee"}, {p: "زاړه کړی شوي", f: "zaaRu kRey shuwee"}]
            ],
            [
                [{p: "زړه کړل شوې", f: "zaRa kRul shuwe"}, {p: "زړه کړی شوې", f: "zaRa kRey shuwe"}],
                [{p: "زړې کړل شوې", f: "zaRe kRul shuwe"}, {p: "زړې کړی شوې", f: "zaRe kRey shuwe"}],
            ],
        ],
    };
    expect(result3).toEqual(expected3);
    // check with imperative
    const impFormIntrans: T.ImperativeForm = [
        [[{p: "شه", f: "sha"}], [{p: "شئ", f: "sheyy"}]],
        [[{p: "شه", f: "sha"}], [{p: "شئ", f: "sheyy"}]],
    ];
    const impFormTrans: T.ImperativeForm = [
        [[{p: "کړه", f: "kRa"}], [{p: "کړئ", f: "kReyy"}]],
        [[{p: "کړه", f: "kRa"}], [{p: "کړئ", f: "kReyy"}]],
    ];
    const impFormTransOpts: T.ImperativeForm = {
        short: [
            [[{p: "که", f: "ka"}], [{p: "کئ", f: "keyy"}]],
            [[{p: "که", f: "ka"}], [{p: "کئ", f: "keyy"}]],
        ],
        long: [
            [[{p: "کړه", f: "kRa"}], [{p: "کړئ", f: "kReyy"}]],
            [[{p: "کړه", f: "kRa"}], [{p: "کړئ", f: "kReyy"}]],
        ],
    }
    const unisexComp: T.UnisexInflections = {
        masc: [
            [{ p: "زوړ", f: "zoR" }],
            [{ p: "زاړه", f: "zaaRu" }],
            [{ p: "زړو", f: "zaRo" }],
        ],
        fem: [
            [{ p: "زړه", f: "zaRa" }],
            [{ p: "زړې", f: "zaRe" }],
            [{ p: "زړو", f: "zaRo" }],
        ],
    };
    const objectMatrix: T.OptionalPersonInflections<T.PsString> = {
        mascSing: { p: "زوړ", f: "zoR" },
        mascPlur: { p: "زاړه", f: "zaaRu" },
        femSing: { p: "زړه", f: "zaRa" },
        femPlur: { p: "زړې", f: "zaRe" },
    };
    expect(addToForm([unisexComp, " "], impFormIntrans)).toEqual([
        [[{p: "زوړ شه", f: "zoR sha"}], [{p: "زاړه شئ", f: "zaaRu sheyy"}]],
        [[{p: "زړه شه", f: "zaRa sha"}], [{p: "زړې شئ", f: "zaRe sheyy"}]],
    ]);
    expect(addToForm([objectMatrix, " "], impFormTrans)).toEqual({
        mascSing: [
            [[{p: "زوړ کړه", f: "zoR kRa"}], [{p: "زوړ کړئ", f: "zoR kReyy"}]],
            [[{p: "زوړ کړه", f: "zoR kRa"}], [{p: "زوړ کړئ", f: "zoR kReyy"}]],
        ],
        mascPlur: [
            [[{p: "زاړه کړه", f: "zaaRu kRa"}], [{p: "زاړه کړئ", f: "zaaRu kReyy"}]],
            [[{p: "زاړه کړه", f: "zaaRu kRa"}], [{p: "زاړه کړئ", f: "zaaRu kReyy"}]],
        ],
        femSing: [
            [[{p: "زړه کړه", f: "zaRa kRa"}], [{p: "زړه کړئ", f: "zaRa kReyy"}]],
            [[{p: "زړه کړه", f: "zaRa kRa"}], [{p: "زړه کړئ", f: "zaRa kReyy"}]],
        ],
        femPlur: [
            [[{p: "زړې کړه", f: "zaRe kRa"}], [{p: "زړې کړئ", f: "zaRe kReyy"}]],
            [[{p: "زړې کړه", f: "zaRe kRa"}], [{p: "زړې کړئ", f: "zaRe kReyy"}]],
        ],
    });
    expect(addToForm([objectMatrix, " "], impFormTransOpts)).toEqual({
        mascSing: {
            short: [
                [[{p: "زوړ که", f: "zoR ka"}], [{p: "زوړ کئ", f: "zoR keyy"}]],
                [[{p: "زوړ که", f: "zoR ka"}], [{p: "زوړ کئ", f: "zoR keyy"}]],
            ],
            long: [
                [[{p: "زوړ کړه", f: "zoR kRa"}], [{p: "زوړ کړئ", f: "zoR kReyy"}]],
                [[{p: "زوړ کړه", f: "zoR kRa"}], [{p: "زوړ کړئ", f: "zoR kReyy"}]],
            ],
        },
        mascPlur: {
            short: [
                [[{p: "زاړه که", f: "zaaRu ka"}], [{p: "زاړه کئ", f: "zaaRu keyy"}]],
                [[{p: "زاړه که", f: "zaaRu ka"}], [{p: "زاړه کئ", f: "zaaRu keyy"}]],
            ],
            long: [
                [[{p: "زاړه کړه", f: "zaaRu kRa"}], [{p: "زاړه کړئ", f: "zaaRu kReyy"}]],
                [[{p: "زاړه کړه", f: "zaaRu kRa"}], [{p: "زاړه کړئ", f: "zaaRu kReyy"}]],
            ],
        },
        femSing: {
            short: [
                [[{p: "زړه که", f: "zaRa ka"}], [{p: "زړه کئ", f: "zaRa keyy"}]],
                [[{p: "زړه که", f: "zaRa ka"}], [{p: "زړه کئ", f: "zaRa keyy"}]],
            ],
            long: [
                [[{p: "زړه کړه", f: "zaRa kRa"}], [{p: "زړه کړئ", f: "zaRa kReyy"}]],
                [[{p: "زړه کړه", f: "zaRa kRa"}], [{p: "زړه کړئ", f: "zaRa kReyy"}]],
            ],
        },
        femPlur: {
            short: [
                [[{p: "زړې که", f: "zaRe ka"}], [{p: "زړې کئ", f: "zaRe keyy"}]],
                [[{p: "زړې که", f: "zaRe ka"}], [{p: "زړې کئ", f: "zaRe keyy"}]],
            ],
            long: [
                [[{p: "زړې کړه", f: "zaRe kRa"}], [{p: "زړې کړئ", f: "zaRe kReyy"}]],
                [[{p: "زړې کړه", f: "zaRe kRa"}], [{p: "زړې کړئ", f: "zaRe kReyy"}]],
            ],
        },
    });
    const matrixBase: T.VerbForm = {
        mascSing: [
            [[{p: "ستړی کوم", f: "stuRey kawum"}], [{p: "ستړی کوو", f: "stuRey kawoo"}]],
            [[{p: "ستړی کوم", f: "stuRey kawum"}], [{p: "ستړی کوو", f: "stuRey kawoo"}]],
            [[{p: "ستړی کوې", f: "stuRey kawe"}], [{p: "ستړی کوئ", f: "stuRey kaweyy"}]],
            [[{p: "ستړی کوې", f: "stuRey kawe"}], [{p: "ستړی کوئ", f: "stuRey kaweyy"}]],
            [[{p: "ستړی کوي", f: "stuRey kawee"}], [{p: "ستړی کوي", f: "stuRey kawee"}]],
            [[{p: "ستړی کوي", f: "stuRey kawee"}], [{p: "ستړی کوي", f: "stuRey kawee"}]],
        ],
        mascPlur: [
            [[{p: "ستړي ستړي کوم", f: "stuRee kawum"}], [{p: "ستړي کوو", f: "stuRee kawoo"}]],
            [[{p: "ستړي ستړي کوم", f: "stuRee kawum"}], [{p: "ستړي کوو", f: "stuRee kawoo"}]],
            [[{p: "ستړي ستړي کوې", f: "stuRee kawe"}], [{p: "ستړي کوئ", f: "stuRee kaweyy"}]],
            [[{p: "ستړي ستړي کوې", f: "stuRee kawe"}], [{p: "ستړي کوئ", f: "stuRee kaweyy"}]],
            [[{p: "ستړي ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
            [[{p: "ستړي ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
        ],
        femSing: [
            [[{p: "ستړې کوم", f: "stuRe kawum"}], [{p: "ستړې کوو", f: "stuRe kawoo"}]],
            [[{p: "ستړې کوم", f: "stuRe kawum"}], [{p: "ستړې کوو", f: "stuRe kawoo"}]],
            [[{p: "ستړې کوې", f: "stuRe kawe"}], [{p: "ستړې کوئ", f: "stuRe kaweyy"}]],
            [[{p: "ستړې کوې", f: "stuRe kawe"}], [{p: "ستړې کوئ", f: "stuRe kaweyy"}]],
            [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
            [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
        ],
        femPlur: [
            [[{p: "ستړې کوم", f: "stuRe kawum"}], [{p: "ستړې کوو", f: "stuRe kawoo"}]],
            [[{p: "ستړې کوم", f: "stuRe kawum"}], [{p: "ستړې کوو", f: "stuRe kawoo"}]],
            [[{p: "ستړې کوې", f: "stuRe kawe"}], [{p: "ستړې کوئ", f: "stuRe kaweyy"}]],
            [[{p: "ستړې کوې", f: "stuRe kawe"}], [{p: "ستړې کوئ", f: "stuRe kaweyy"}]],
            [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
            [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
        ],
    };
    expect(addToForm([objectMatrix, " ", { p: "به", f: "ba" }, " "], matrixBase)).toEqual({
        mascSing: [
            [[{p: "زوړ به ستړی کوم", f: "zoR ba stuRey kawum"}], [{p: "زوړ به ستړی کوو", f: "zoR ba stuRey kawoo"}]],
            [[{p: "زوړ به ستړی کوم", f: "zoR ba stuRey kawum"}], [{p: "زوړ به ستړی کوو", f: "zoR ba stuRey kawoo"}]],
            [[{p: "زوړ به ستړی کوې", f: "zoR ba stuRey kawe"}], [{p: "زوړ به ستړی کوئ", f: "zoR ba stuRey kaweyy"}]],
            [[{p: "زوړ به ستړی کوې", f: "zoR ba stuRey kawe"}], [{p: "زوړ به ستړی کوئ", f: "zoR ba stuRey kaweyy"}]],
            [[{p: "زوړ به ستړی کوي", f: "zoR ba stuRey kawee"}], [{p: "زوړ به ستړی کوي", f: "zoR ba stuRey kawee"}]],
            [[{p: "زوړ به ستړی کوي", f: "zoR ba stuRey kawee"}], [{p: "زوړ به ستړی کوي", f: "zoR ba stuRey kawee"}]],
        ],
        mascPlur: [
            [[{p: "زاړه به ستړي ستړي کوم", f: "zaaRu ba stuRee kawum"}], [{p: "زاړه به ستړي کوو", f: "zaaRu ba stuRee kawoo"}]],
            [[{p: "زاړه به ستړي ستړي کوم", f: "zaaRu ba stuRee kawum"}], [{p: "زاړه به ستړي کوو", f: "zaaRu ba stuRee kawoo"}]],
            [[{p: "زاړه به ستړي ستړي کوې", f: "zaaRu ba stuRee kawe"}], [{p: "زاړه به ستړي کوئ", f: "zaaRu ba stuRee kaweyy"}]],
            [[{p: "زاړه به ستړي ستړي کوې", f: "zaaRu ba stuRee kawe"}], [{p: "زاړه به ستړي کوئ", f: "zaaRu ba stuRee kaweyy"}]],
            [[{p: "زاړه به ستړي ستړي کوي", f: "zaaRu ba stuRee kawee"}], [{p: "زاړه به ستړي کوي", f: "zaaRu ba stuRee kawee"}]],
            [[{p: "زاړه به ستړي ستړي کوي", f: "zaaRu ba stuRee kawee"}], [{p: "زاړه به ستړي کوي", f: "zaaRu ba stuRee kawee"}]],
        ],
        femSing: [
            [[{p: "زړه به ستړې کوم", f: "zaRa ba stuRe kawum"}], [{p: "زړه به ستړې کوو", f: "zaRa ba stuRe kawoo"}]],
            [[{p: "زړه به ستړې کوم", f: "zaRa ba stuRe kawum"}], [{p: "زړه به ستړې کوو", f: "zaRa ba stuRe kawoo"}]],
            [[{p: "زړه به ستړې کوې", f: "zaRa ba stuRe kawe"}], [{p: "زړه به ستړې کوئ", f: "zaRa ba stuRe kaweyy"}]],
            [[{p: "زړه به ستړې کوې", f: "zaRa ba stuRe kawe"}], [{p: "زړه به ستړې کوئ", f: "zaRa ba stuRe kaweyy"}]],
            [[{p: "زړه به ستړې کوي", f: "zaRa ba stuRe kawee"}], [{p: "زړه به ستړې کوي", f: "zaRa ba stuRe kawee"}]],
            [[{p: "زړه به ستړې کوي", f: "zaRa ba stuRe kawee"}], [{p: "زړه به ستړې کوي", f: "zaRa ba stuRe kawee"}]],
        ],
        femPlur: [
            [[{p: "زړې به ستړې کوم", f: "zaRe ba stuRe kawum"}], [{p: "زړې به ستړې کوو", f: "zaRe ba stuRe kawoo"}]],
            [[{p: "زړې به ستړې کوم", f: "zaRe ba stuRe kawum"}], [{p: "زړې به ستړې کوو", f: "zaRe ba stuRe kawoo"}]],
            [[{p: "زړې به ستړې کوې", f: "zaRe ba stuRe kawe"}], [{p: "زړې به ستړې کوئ", f: "zaRe ba stuRe kaweyy"}]],
            [[{p: "زړې به ستړې کوې", f: "zaRe ba stuRe kawe"}], [{p: "زړې به ستړې کوئ", f: "zaRe ba stuRe kaweyy"}]],
            [[{p: "زړې به ستړې کوي", f: "zaRe ba stuRe kawee"}], [{p: "زړې به ستړې کوي", f: "zaRe ba stuRe kawee"}]],
            [[{p: "زړې به ستړې کوي", f: "zaRe ba stuRe kawee"}], [{p: "زړې به ستړې کوي", f: "zaRe ba stuRe kawee"}]],
        ],
    });
    const kawulSimpPast: T.VerbForm = {
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
    };
    expect(addToForm([{ p: "به", f: "ba" }, " "], kawulSimpPast)).toEqual({
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
    });
    expect(addToForm([{
        long: { p: "به", f: "ba" },
        short: { p: "ب", f: "b" },
    }, " "], kawulSimpPast)).toEqual({
        mini: [
            [[{p: "ب کم", f: "b kum"}], [{p: "ب کو", f: "b koo"}]],
            [[{p: "ب کم", f: "b kum"}], [{p: "ب کو", f: "b koo"}]],
            [[{p: "ب کې", f: "b ke"}], [{p: "ب کئ", f: "b keyy"}]],
            [[{p: "ب کې", f: "b ke"}], [{p: "ب کئ", f: "b keyy"}]],
            [[{p: "ب که", f: "b ku"}, {p: "ب کو", f: "b ko"}], [{p: "ب کړل", f: "b kRul"}, { p: "ب کو", f: "b koo" }]],
            [[{p: "ب که", f: "b ka"}], [{p: "ب کې", f: "b ke"}]],
        ],
        short: [
            [[{p: "ب کړم", f: "b kRum"}], [{p: "ب کړو", f: "b kRoo"}]],
            [[{p: "ب کړم", f: "b kRum"}], [{p: "ب کړو", f: "b kRoo"}]],
            [[{p: "ب کړې", f: "b kRe"}], [{p: "ب کړئ", f: "b kReyy"}]],
            [[{p: "ب کړې", f: "b kRe"}], [{p: "ب کړئ", f: "b kReyy"}]],
            [[{p: "ب کړه", f: "b kRu"}, {p: "ب کړو", f: "b kRo"}, {p: "ب کړ", f: "b kuR"}], [{p: "ب کړل", f: "b kRul"}, {p: "ب کړو", f: "b kRoo" }]],
            [[{p: "ب کړه", f: "b kRa"}], [{p: "ب کړې", f: "b kRe"}]],
        ],
        long: [
            [[{p: "به کړلم", f: "ba kRulum"}], [{p: "به کړلو", f: "ba kRuloo"}]],
            [[{p: "به کړلم", f: "ba kRulum"}], [{p: "به کړلو", f: "ba kRuloo"}]],
            [[{p: "به کړلې", f: "ba kRule"}], [{p: "به کړلئ", f: "ba kRuleyy"}]],
            [[{p: "به کړلې", f: "ba kRule"}], [{p: "به کړلئ", f: "ba kRuleyy"}]],
            [[{p: "به کړله", f: "ba kRulu"}, {p: "به کړلو", f: "ba kRulo"}], [{p: "به کړل", f: "ba kRul"}, {p: "به کړلو", f: "ba kRuloo"}]],
            [[{p: "به کړله", f: "ba kRula"}], [{p: "به کړلې", f: "ba kRule"}]],
        ],
    });
    expect(addToForm([[{
        long: { p: "به", f: "ba" },
        short: { p: "ب", f: "b" },
    }], " "], kawulSimpPast)).toEqual({
        mini: [
            [[{p: "ب کم", f: "b kum"}], [{p: "ب کو", f: "b koo"}]],
            [[{p: "ب کم", f: "b kum"}], [{p: "ب کو", f: "b koo"}]],
            [[{p: "ب کې", f: "b ke"}], [{p: "ب کئ", f: "b keyy"}]],
            [[{p: "ب کې", f: "b ke"}], [{p: "ب کئ", f: "b keyy"}]],
            [[{p: "ب که", f: "b ku"}, {p: "ب کو", f: "b ko"}], [{p: "ب کړل", f: "b kRul"}, { p: "ب کو", f: "b koo" }]],
            [[{p: "ب که", f: "b ka"}], [{p: "ب کې", f: "b ke"}]],
        ],
        short: [
            [[{p: "ب کړم", f: "b kRum"}], [{p: "ب کړو", f: "b kRoo"}]],
            [[{p: "ب کړم", f: "b kRum"}], [{p: "ب کړو", f: "b kRoo"}]],
            [[{p: "ب کړې", f: "b kRe"}], [{p: "ب کړئ", f: "b kReyy"}]],
            [[{p: "ب کړې", f: "b kRe"}], [{p: "ب کړئ", f: "b kReyy"}]],
            [[{p: "ب کړه", f: "b kRu"}, {p: "ب کړو", f: "b kRo"}, {p: "ب کړ", f: "b kuR"}], [{p: "ب کړل", f: "b kRul"}, {p: "ب کړو", f: "b kRoo" }]],
            [[{p: "ب کړه", f: "b kRa"}], [{p: "ب کړې", f: "b kRe"}]],
        ],
        long: [
            [[{p: "به کړلم", f: "ba kRulum"}], [{p: "به کړلو", f: "ba kRuloo"}]],
            [[{p: "به کړلم", f: "ba kRulum"}], [{p: "به کړلو", f: "ba kRuloo"}]],
            [[{p: "به کړلې", f: "ba kRule"}], [{p: "به کړلئ", f: "ba kRuleyy"}]],
            [[{p: "به کړلې", f: "ba kRule"}], [{p: "به کړلئ", f: "ba kRuleyy"}]],
            [[{p: "به کړله", f: "ba kRulu"}, {p: "به کړلو", f: "ba kRulo"}], [{p: "به کړل", f: "ba kRul"}, {p: "به کړلو", f: "ba kRuloo"}]],
            [[{p: "به کړله", f: "ba kRula"}], [{p: "به کړلې", f: "ba kRule"}]],
        ],
    });
    expect(addToForm([{
        short: { p: "لیک", f: "leek" },
        long: { p: "لیکل", f: "leekul" },
    }], pastEndings)).toEqual({
        short: [
            [[{ p: "لیکم", f: "leekum" }], [{ p: "لیکو", f: "leekoo" }]],
            [[{ p: "لیکم", f: "leekum" }], [{ p: "لیکو", f: "leekoo" }]],
            [[{ p: "لیکې", f: "leeke" }], [{ p: "لیکئ", f: "leekeyy" }]],
            [[{ p: "لیکې", f: "leeke" }], [{ p: "لیکئ", f: "leekeyy" }]],
            [[{ p: "لیکه", f: "leeku" }, { p: "لیکو", f: "leeko"}], [{ p: "لیکل", f: "leekul" }]],
            [[{ p: "لیکه", f: "leeka"}], [{ p: "لیکې", f: "leeke" }]], 
        ],
        long: [
            [[{ p: "لیکلم", f: "leekulum" }], [{ p: "لیکلو", f: "leekuloo" }]],
            [[{ p: "لیکلم", f: "leekulum" }], [{ p: "لیکلو", f: "leekuloo" }]],
            [[{ p: "لیکلې", f: "leekule" }], [{ p: "لیکلئ", f: "leekuleyy" }]],
            [[{ p: "لیکلې", f: "leekule" }], [{ p: "لیکلئ", f: "leekuleyy" }]],
            [[{ p: "لیکله", f: "leekulu" }, { p: "لیکلو", f: "leekulo"}], [{ p: "لیکل", f: "leekul"}]],
            [[{ p: "لیکله", f: "leekula"}], [{ p: "لیکلې", f: "leekule" }]], 
        ],
    });
    expect(addToForm([{
        long: { p: "تتت", f: "ttt" },
        short: { p: "تت", f: "tt" },
        mini: { p: "ت", f: "t" },
    }, " "], {
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
    })).toEqual({
        long: [
            [[{p: "تتت کړم", f: "ttt kRum"}], [{p: "تتت کړو", f: "ttt kRoo"}]],
            [[{p: "تتت کړم", f: "ttt kRum"}], [{p: "تتت کړو", f: "ttt kRoo"}]],
            [[{p: "تتت کړې", f: "ttt kRe"}], [{p: "تتت کړئ", f: "ttt kReyy"}]],
            [[{p: "تتت کړې", f: "ttt kRe"}], [{p: "تتت کړئ", f: "ttt kReyy"}]],
            [[{p: "تتت کړي", f: "ttt kRee"}], [{p: "تتت کړي", f: "ttt kRee"}]],
            [[{p: "تتت کړي", f: "ttt kRee"}], [{p: "تتت کړي", f: "ttt kRee"}]],
        ],
        short: [
            [[{p: "تت کم", f: "tt kum"}], [{p: "تت کو", f: "tt koo"}]],
            [[{p: "تت کم", f: "tt kum"}], [{p: "تت کو", f: "tt koo"}]],
            [[{p: "تت کې", f: "tt ke"}], [{p: "تت کئ", f: "tt keyy"}]],
            [[{p: "تت کې", f: "tt ke"}], [{p: "تت کئ", f: "tt keyy"}]],
            [[{p: "تت کي", f: "tt kee"}], [{p: "تت کي", f: "tt kee"}]],
            [[{p: "تت کي", f: "tt kee"}], [{p: "تت کي", f: "tt kee"}]],
        ],
        mini: [
            [[{p: "ت کم", f: "t kum"}], [{p: "ت کو", f: "t koo"}]],
            [[{p: "ت کم", f: "t kum"}], [{p: "ت کو", f: "t koo"}]],
            [[{p: "ت کې", f: "t ke"}], [{p: "ت کئ", f: "t keyy"}]],
            [[{p: "ت کې", f: "t ke"}], [{p: "ت کئ", f: "t keyy"}]],
            [[{p: "ت کي", f: "t kee"}], [{p: "ت کي", f: "t kee"}]],
            [[{p: "ت کي", f: "t kee"}], [{p: "ت کي", f: "t kee"}]],
        ],
    });
});

test(`unisexInfToObjectMatrix`, () => {
    expect(unisexInfToObjectMatrix({
        masc: [
            [{ p: "زوړ", f: "zoR" }],
            [{ p: "زاړه", f: "zaaRu" }],
            [{ p: "زړو", f: "zaRo" }],
        ],
        fem: [
            [{ p: "زړه", f: "zaRa" }],
            [{ p: "زړې", f: "zaRe" }],
            [{ p: "زړو", f: "zaRo" }],
        ],
    })).toEqual({
        mascSing: { p: "زوړ", f: "zoR" },
        mascPlur: { p: "زاړه", f: "zaaRu" },
        femSing: { p: "زړه", f: "zaRa" },
        femPlur: { p: "زړې", f: "zaRe" },
    });
});

test(`complementInflects`, () => {
    expect(complementInflects({
        masc: [
            [{ p: "زوړ", f: "zoR" }],
            [{ p: "زاړه", f: "zaaRu" }],
            [{ p: "زړو", f: "zaRo" }],
        ],
        fem: [
            [{ p: "زړه", f: "zaRa" }],
            [{ p: "زړې", f: "zaRe" }],
            [{ p: "زړو", f: "zaRo" }],
        ],
    })).toBe(true);
    expect(complementInflects({
        masc: [
            [{ p: "خفه", f: "khufa" }],
            [{ p: "خفه", f: "khufa" }],
            [{ p: "خفه", f: "khufao" }],
        ],
        fem: [
            [{ p: "خفه", f: "khufa" }],
            [{ p: "خفه", f: "khufa" }],
            [{ p: "خفه", f: "khufa" }],
        ],
    })).toBe(false);
});

test(`firstPhonetics should work`, () => {
    expect(firstPhonetics("ist'imaal, istimaal")).toBe("ist'imaal");
    expect(firstPhonetics("kor")).toBe("kor");
});

test(`makePsString should work`, () => {
    expect(makePsString("کور", "kor")).toEqual({ p: "کور", f: "kor" });
});

test(`removeEndingL should work`, () => {
    expect(removeEndingL(makePsString("لیدل", "leedúl"))).toEqual(
        makePsString("لید", "leed"),
    );
    expect(removeEndingL(makePsString("لیدل", "leedul"))).toEqual(
        makePsString("لید", "leed"),
    );
    expect(removeEndingL(makePsString("پرېښود", "prexod"))).toEqual(
        makePsString("پرېښود", "prexod"),
    );
});

test(`yulEndingInfinitive should work`, () => {
    expect(yulEndingInfinitive({ p: "وایل", f: "waayul" })).toBe(true);
    expect(yulEndingInfinitive({ p: "لیکل", f: "leekúl" })).toBe(false);
});

test(`mapVerbBlock should work`, () => {
    expect(
        mapVerbBlock(
            (ps: T.PsString) => concatPsString({ p: "به", f: "ba" }, " ", ps),
            [
                [[{p: "کېدم", f: "kedum"}], [{p: "کېدو", f: "kedoo"}]],
                [[{p: "کېدم", f: "kedum"}], [{p: "کېدو", f: "kedoo"}]],
                [[{p: "کېدې", f: "kede"}], [{p: "کېدئ", f: "kedeyy"}]],
                [[{p: "کېدې", f: "kede"}], [{p: "کېدئ", f: "kedeyy"}]],
                [[{p: "کېده", f: "kedu"}, {p: "کېدو", f: "kedo"}], [{p: "کېدل", f: "kedul"}]],
                [[{p: "کېده", f: "keda"}], [{p: "کېدې", f: "kede"}]],
            ],
        )
    ).toEqual([
        [[{p: "به کېدم", f: "ba kedum"}], [{p: "به کېدو", f: "ba kedoo"}]],
        [[{p: "به کېدم", f: "ba kedum"}], [{p: "به کېدو", f: "ba kedoo"}]],
        [[{p: "به کېدې", f: "ba kede"}], [{p: "به کېدئ", f: "ba kedeyy"}]],
        [[{p: "به کېدې", f: "ba kede"}], [{p: "به کېدئ", f: "ba kedeyy"}]],
        [[{p: "به کېده", f: "ba kedu"}, {p: "به کېدو", f: "ba kedo"}], [{p: "به کېدل", f: "ba kedul"}]],
        [[{p: "به کېده", f: "ba keda"}], [{p: "به کېدې", f: "ba kede"}]],
    ])
})

// test(`allThirdPersMascPlur should work`, () => {
//     expect(
//         allThirdPersMascPlur([
//             [[{p: "کېدم", f: "kedum"}], [{p: "کېدو", f: "kedoo"}]],
//             [[{p: "کېدم", f: "kedum"}], [{p: "کېدو", f: "kedoo"}]],
//             [[{p: "کېدې", f: "kede"}], [{p: "کېدئ", f: "kedeyy"}]],
//             [[{p: "کېدې", f: "kede"}], [{p: "کېدئ", f: "kedeyy"}]],
//             [[{p: "کېده", f: "kedu"}, {p: "کېدو", f: "kedo"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېده", f: "keda"}], [{p: "کېدې", f: "kede"}]]
//         ])
//     ).toEqual([
//         [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//         [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//         [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//         [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//         [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//         [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//     ]);
//     expect(
//         allThirdPersMascPlur({
//             short: [
//                 [[{p: "کېدم", f: "kedum"}], [{p: "کېدو", f: "kedoo"}]],
//                 [[{p: "کېدم", f: "kedum"}], [{p: "کېدو", f: "kedoo"}]],
//                 [[{p: "کېدې", f: "kede"}], [{p: "کېدئ", f: "kedeyy"}]],
//                 [[{p: "کېدې", f: "kede"}], [{p: "کېدئ", f: "kedeyy"}]],
//                 [[{p: "کېده", f: "kedu"}, {p: "کېدو", f: "kedo"}], [{p: "کېدل", f: "kedul"}]],
//                 [[{p: "کېده", f: "keda"}], [{p: "کېدې", f: "kede"}]],
//             ],
//             long: [
//                 [[{p: "کېدلم", f: "kedulum"}], [{p: "کېدلو", f: "keduloo"}]],
//                 [[{p: "کېدلم", f: "kedulum"}], [{p: "کېدلو", f: "keduloo"}]],
//                 [[{p: "کېدلې", f: "kedule"}], [{p: "کېدلئ", f: "keduleyy"}]],
//                 [[{p: "کېدلې", f: "kedule"}], [{p: "کېدلئ", f: "keduleyy"}]],
//                 [[{p: "کېدله", f: "kedulu"}, {p: "کېدلو", f: "kedulo"}], [{p: "کېدل", f: "kedul"}]],
//                 [[{p: "کېدله", f: "kedula"}], [{p: "کېدلې", f: "kedule"}]],
//             ],
//         })
//     ).toEqual({
//         short: [
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//         ],
//         long: [
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//             [[{p: "کېدل", f: "kedul"}], [{p: "کېدل", f: "kedul"}]],
//         ],
//     });
//     const matrixBase: VerbForm = {
//         mascSing: [
//             [[{p: "ستړی کوم", f: "stuRey kawum"}], [{p: "ستړی کوو", f: "stuRey kawoo"}]],
//             [[{p: "ستړی کوم", f: "stuRey kawum"}], [{p: "ستړی کوو", f: "stuRey kawoo"}]],
//             [[{p: "ستړی کوې", f: "stuRey kawe"}], [{p: "ستړی کوئ", f: "stuRey kaweyy"}]],
//             [[{p: "ستړی کوې", f: "stuRey kawe"}], [{p: "ستړی کوئ", f: "stuRey kaweyy"}]],
//             [[{p: "ستړی کوي", f: "stuRey kawee"}], [{p: "ستړی کوي", f: "stuRey kawee"}]],
//             [[{p: "ستړی کوي", f: "stuRey kawee"}], [{p: "ستړی کوي", f: "stuRey kawee"}]],
//         ],
//         mascPlur: [
//             [[{p: "ستړي کوم", f: "stuRee kawum"}], [{p: "ستړي کوو", f: "stuRee kawoo"}]],
//             [[{p: "ستړي کوم", f: "stuRee kawum"}], [{p: "ستړي کوو", f: "stuRee kawoo"}]],
//             [[{p: "ستړي کوې", f: "stuRee kawe"}], [{p: "ستړي کوئ", f: "stuRee kaweyy"}]],
//             [[{p: "ستړي کوې", f: "stuRee kawe"}], [{p: "ستړي کوئ", f: "stuRee kaweyy"}]],
//             [[{p: "ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
//             [[{p: "ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
//         ],
//         femSing: [
//             [[{p: "ستړې کوم", f: "stuRe kawum"}], [{p: "ستړې کوو", f: "stuRe kawoo"}]],
//             [[{p: "ستړې کوم", f: "stuRe kawum"}], [{p: "ستړې کوو", f: "stuRe kawoo"}]],
//             [[{p: "ستړې کوې", f: "stuRe kawe"}], [{p: "ستړې کوئ", f: "stuRe kaweyy"}]],
//             [[{p: "ستړې کوې", f: "stuRe kawe"}], [{p: "ستړې کوئ", f: "stuRe kaweyy"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//         ],
//         femPlur: [
//             [[{p: "ستړې کوم", f: "stuRe kawum"}], [{p: "ستړې کوو", f: "stuRe kawoo"}]],
//             [[{p: "ستړې کوم", f: "stuRe kawum"}], [{p: "ستړې کوو", f: "stuRe kawoo"}]],
//             [[{p: "ستړې کوې", f: "stuRe kawe"}], [{p: "ستړې کوئ", f: "stuRe kaweyy"}]],
//             [[{p: "ستړې کوې", f: "stuRe kawe"}], [{p: "ستړې کوئ", f: "stuRe kaweyy"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//         ],
//     };

//     // NOTE: This should never really be used, because this is only used of the past tense
//     // versions on grammatically transitive verbs and the objectMatrixes are only used with
//     // present forms of verbs, but testing to cover all type safety
//     expect(allThirdPersMascPlur(matrixBase)).toEqual({
//         mascSing: [
//             [[{p: "ستړی کوي", f: "stuRey kawee"}], [{p: "ستړی کوي", f: "stuRey kawee"}]],
//             [[{p: "ستړی کوي", f: "stuRey kawee"}], [{p: "ستړی کوي", f: "stuRey kawee"}]],
//             [[{p: "ستړی کوي", f: "stuRey kawee"}], [{p: "ستړی کوي", f: "stuRey kawee"}]],
//             [[{p: "ستړی کوي", f: "stuRey kawee"}], [{p: "ستړی کوي", f: "stuRey kawee"}]],
//             [[{p: "ستړی کوي", f: "stuRey kawee"}], [{p: "ستړی کوي", f: "stuRey kawee"}]],
//             [[{p: "ستړی کوي", f: "stuRey kawee"}], [{p: "ستړی کوي", f: "stuRey kawee"}]],
//         ],
//         mascPlur: [
//             [[{p: "ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
//             [[{p: "ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
//             [[{p: "ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
//             [[{p: "ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
//             [[{p: "ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
//             [[{p: "ستړي کوي", f: "stuRee kawee"}], [{p: "ستړي کوي", f: "stuRee kawee"}]],
//         ],
//         femSing: [            
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//         ],
//         femPlur: [
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//             [[{p: "ستړې کوي", f: "stuRe kawee"}], [{p: "ستړې کوي", f: "stuRe kawee"}]],
//         ],
//     });
// });

test(`allMascFirstInflection should work`, () => {
    expect(
        allMascFirstInflection({
            masc: [
                [{p: "زوړ", f: "zoR"}],
                [{p: "زاړه", f: "zaaRu"}],
                [{p: "زړو", f: "zaRo"}],
            ],
            fem: [
                [{p: "زړه", f: "zaRa"}],
                [{p: "زړې", f: "zaRe"}],
                [{p: "زړو", f: "zaRo"}],
            ],
        })
    ).toEqual({
        masc: [
            [{p: "زاړه", f: "zaaRu"}],
            [{p: "زاړه", f: "zaaRu"}],
            [{p: "زاړه", f: "zaaRu"}],
        ],
        fem: [
            [{p: "زاړه", f: "zaaRu"}],
            [{p: "زاړه", f: "zaaRu"}],
            [{p: "زاړه", f: "zaaRu"}],
        ],
    })
    expect(
        allMascFirstInflection({
            short: {
                masc: [
                    [{p: "زوړ", f: "zoR"}],
                    [{p: "زاړه", f: "zaaRu"}],
                    [{p: "زړو", f: "zaRo"}],
                ],
                fem: [
                    [{p: "زړه", f: "zaRa"}],
                    [{p: "زړې", f: "zaRe"}],
                    [{p: "زړو", f: "zaRo"}],
                ],
            },
            long: {
                masc: [
                    [{p: "زووړ", f: "zoooR"}],
                    [{p: "زاااړه", f: "zaaaaRu"}],
                    [{p: "زړو", f: "zaRo"}],
                ],
                fem: [
                    [{p: "زړه", f: "zaRa"}],
                    [{p: "زړې", f: "zaRe"}],
                    [{p: "زړو", f: "zaRo"}],
                ],
            }
        })
    ).toEqual({
        short: {
            masc: [
                [{p: "زاړه", f: "zaaRu"}],
                [{p: "زاړه", f: "zaaRu"}],
                [{p: "زاړه", f: "zaaRu"}],
            ],
            fem: [
                [{p: "زاړه", f: "zaaRu"}],
                [{p: "زاړه", f: "zaaRu"}],
                [{p: "زاړه", f: "zaaRu"}],
            ],
        },
        long: {
            masc: [
                [{p: "زاااړه", f: "zaaaaRu"}],
                [{p: "زاااړه", f: "zaaaaRu"}],
                [{p: "زاااړه", f: "zaaaaRu"}],
            ],
            fem: [
                [{p: "زاااړه", f: "zaaaaRu"}],
                [{p: "زاااړه", f: "zaaaaRu"}],
                [{p: "زاااړه", f: "zaaaaRu"}],
            ],
        },
    });
});

test('concat inflections', () => {
    const unisexInfs: T.UnisexInflections = {
        masc: [
            [{ p: "زوړ", f: "zoR" }],
            [{ p: "زاړه", f: "zaaRu" }],
            [{ p: "زړو", f: "zaRo" }],
        ],
        fem: [
            [{ p: "زړه", f: "zaRa" }],
            [{ p: "زړې", f: "zaRe" }],
            [{ p: "زړو", f: "zaRo" }],
        ],
    };
    const partInfs: T.UnisexInflections = {
        masc: [
            [{p: "شوی", f: "shuwey"}],
            [{p: "شوي", f: "shuwee"}],
            [{p: "شویو", f: "shuwiyo" }, { p: "شوو", f: "shuwo" }],
        ],
        fem: [
            [{p: "شوې", f: "shuwe"}],
            [{p: "شوې", f: "shuwe"}],
            [{p: "شوو", f: "shuwo"}],
        ],
    };
    expect(concatInflections(unisexInfs, partInfs)).toEqual({
        masc: [
            [{p: "زوړ شوی", f: "zoR shuwey"}],
            [{p: "زاړه شوي", f: "zaaRu shuwee"}],
            [{p: "زړو شویو", f: "zaRo shuwiyo"}, {p: "زړو شوو", f: "zaRo shuwo"}],
        ],
        fem: [
            [{p: "زړه شوې", f: "zaRa shuwe"}],
            [{p: "زړې شوې", f: "zaRe shuwe"}],
            [{p: "زړو شوو", f: "zaRo shuwo"}],
        ],
    });
    // TODO: Should also work this way
    // const unisexInfs2: UnisexInflections = {
    //     masc: [
    //         [{ p: "زوړ", f: "zoR" }, { p: "تور", f: "tor"}],
    //         [{ p: "زاړه", f: "zaaRu" }],
    //         [{ p: "زړو", f: "zaRo" }],
    //     ],
    //     fem: [
    //         [{ p: "زړه", f: "zaRa" }],
    //         [{ p: "زړې", f: "zaRe" }],
    //         [{ p: "زړو", f: "zaRo" }],
    //     ],
    // };
    // const partInfs2: UnisexInflections = {
    //     masc: [
    //         [{p: "شوی", f: "shuwey"}],
    //         [{p: "شوي", f: "shuwee"}],
    //         [{p: "شویو", f: "shuwiyo" }],
    //     ],
    //     fem: [
    //         [{p: "شوې", f: "shuwe"}],
    //         [{p: "شوې", f: "shuwe"}],
    //         [{p: "شوو", f: "shuwo"}],
    //     ],
    // };
    // expect(concatInflections(unisexInfs2, partInfs2)).toEqual({
    //     masc: [
    //         [{p: "زوړ شوی", f: "zoR shuwey"}, {p: "تور شوی", f: "tor shuwey"}],
    //         [{p: "زاړه شوي", f: "zaaRu shuwee"}],
    //         [{p: "زړو شویو", f: "zaRo shuwiyo"}],
    //     ],
    //     fem: [
    //         [{p: "زړه شوې", f: "zaRa shuwe"}],
    //         [{p: "زړې شوې", f: "zaRe shuwe"}],
    //         [{p: "زړو شوو", f: "zaRo shuwo"}],
    //     ],
    // });
    expect(concatInflections({ p: "خفه", f: "khufa" }, partInfs)).toEqual({
        masc: [
            [{p: "خفه شوی", f: "khufa shuwey"}],
            [{p: "خفه شوي", f: "khufa shuwee"}],
            [{p: "خفه شویو", f: "khufa shuwiyo"}, {p: "خفه شوو", f: "khufa shuwo"}],
        ],
        fem: [
            [{p: "خفه شوې", f: "khufa shuwe"}],
            [{p: "خفه شوې", f: "khufa shuwe"}],
            [{p: "خفه شوو", f: "khufa shuwo"}],
        ],
    });
});

test("psStringEquals", () => {
    expect(
        psStringEquals({ p: "تور", f: "tor" }, { p: "تور", f: "tor" })
    ).toBe(true);
    expect(
        psStringEquals({ p: "بور", f: "bor" }, { p: "تور", f: "tor" })
    ).toBe(false);
});

test("removeRetroflexR", () => {
    expect(
        removeRetroflexR({ p: "وکړ", f: "óokR" }),
    ).toEqual({ p: "وک", f: "óok" });
});