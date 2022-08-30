/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { kawulStat } from "./irregular-conjugations";
import * as T from "../types";

export const negativeParticle: {
    imperative: T.PsString,
    nonImperative: T.PsString,
} = {
    nonImperative: { p: "نه", f: "nú" },
    imperative: { p: "مه", f: "mú" },
};

export const presentEndings: T.VerbBlock = [
    [
        [{
            p: "م",
            f: "um"
        }],
        [{
            p: "و",
            f: "oo"
        }],
    ],
    [
        [{
            p: "م",
            f: "um"
        }],
        [{
            p: "و",
            f: "oo"
        }],
    ],
    [
        [{
            p: "ې",
            f: "e"
        }],
        [{
            p: "ئ",
            f: "eyy"
        }],
    ],
    [
        [{
            p: "ې",
            f: "e"
        }],
        [{
            p: "ئ",
            f: "eyy"
        }],
    ],
    [
        [{
            p: "ي",
            f: "ee"
        }],
        [{
            p: "ي",
            f: "ee"
        }],
    ],
    [
        [{
            p: "ي",
            f: "ee"
        }],
        [{
            p: "ي",
            f: "ee"
        }],
    ],
];

export const pastEndings: {
    long: T.VerbBlock,
    short: T.VerbBlock,
} = {
    long: [
        [
            [{
                p: "م",
                f: "um"
            }],
            [{
                p: "و",
                f: "oo"
            }]
        ],
        [
            [{
                p: "م",
                f: "um"
            }],
            [{
                p: "و",
                f: "oo"
            }]
        ],
        [
            [{
                p: "ې",
                f: "e"
            }],
            [{
                p: "ئ",
                f: "eyy"
            }]
        ],
        [
            [{
                p: "ې",
                f: "e"
            }],
            [{
                p: "ئ",
                f: "eyy"
            }]
        ],
        [
            [{
                p: "و",
                f: "o",
            }],
            [{
                p: "ل",
                f: "ul"
            }],
        ],
        [
            [{
                p: "ه",
                f: "a"
            }],
            [{
                p: "ې",
                f: "e"
            }]
        ],
    ],
    short: [
        [
            [{
                p: "م",
                f: "um"
            }],
            [{
                p: "و",
                f: "oo"
            }]
        ],
        [
            [{
                p: "م",
                f: "um"
            }],
            [{
                p: "و",
                f: "oo"
            }]
        ],
        [
            [{
                p: "ې",
                f: "e"
            }],
            [{
                p: "ئ",
                f: "eyy"
            }]
        ],
        [
            [{
                p: "ې",
                f: "e"
            }],
            [{
                p: "ئ",
                f: "eyy"
            }]
        ],
        [
            [{
                    p: "ه",
                    f: "u"
                },
                {
                    p: "و",
                    f: "o"
                },
            ],
            [{
                p: "ل",
                f: "ul"
            }],
        ],
        [
            [{
                p: "ه",
                f: "a"
            }],
            [{
                p: "ې",
                f: "e"
            }]
        ],
    ],
};

// TODO: MAKE THIS VARIABLE FOR DIALECTS!

export const aayTail: T.PsString[] = [{p: "ای", f: "aay" }, { p: "ی", f: "ey" }];

export const subjPastEquative: T.ArrayOneOrMore<T.PsString> = aayTail.map((a) => ({
    p: "و" + a.p,
    f: "w" + a.f,
})) as T.ArrayOneOrMore<T.PsString>;

export const englishEquative: {
    past: T.EnglishBlock,
    present: T.EnglishBlock,
    future: string,
    wouldBe: string,
    pastSubjunctive: string,
} = {
    past: [
        ["was", "were"],
        ["was", "were"],
        ["were", "were"],
        ["were", "were"],
        ["was", "were"],
        ["was", "were"],
    ],
    present: [
        ["am", "are"],
        ["am", "are"],
        ["are", "are"],
        ["are", "are"],
        ["is", "are"],
        ["is", "are"],
    ],
    future: "will be",
    wouldBe: "would be",
    pastSubjunctive: "were",
}

export const equativeEndings: {
    past: T.LengthOptions<T.VerbBlock>,
    present: T.VerbBlock,
    habitual: T.VerbBlock,
    subjunctive: T.VerbBlock,
    pastSubjunctive: T.VerbBlock,
} = {
    past: {
        short: [
            [
                [{
                    p: "وم",
                    f: "wum",
                }],
                [{
                    p: "وو",
                    f: "woo",
                }]
            ],
            [
                [{
                    p: "وم",
                    f: "wum",
                }],
                [{
                    p: "وو",
                    f: "woo"
                }]
            ],
            [
                [{
                    p: "وې",
                    f: "we"
                }],
                [{
                    p: "وئ",
                    f: "weyy"
                }]
            ],
            [
                [{
                    p: "وې",
                    f: "we"
                }],
                [{
                    p: "وئ",
                    f: "weyy"
                }]
            ],
            [
                [{
                    p: "و",
                    f: "wo"
                }],
                [{
                    p: "ول",
                    f: "wul",
                }, {
                    p: "وو",
                    f: "woo"
                }]
            ],
            [
                [{
                    p: "وه",
                    f: "wa"
                }],
                [{
                    p: "وې",
                    f: "we"
                }]
            ],
        ],
        long: [
            [
                [{
                    p: "ولم",
                    f: "wulum"
                }],
                [{
                    p: "ولو",
                    f: "wuloo"
                }]
            ],
            [
                [{
                    p: "ولم",
                    f: "wulum"
                }],
                [{
                    p: "ولو",
                    f: "wuloo"
                }]
            ],
            [
                [{
                    p: "ولې",
                    f: "wule"
                }],
                [{
                    p: "ولئ",
                    f: "wuleyy"
                }]
            ],
            [
                [{
                    p: "ولې",
                    f: "wule"
                }],
                [{
                    p: "ولئ",
                    f: "wuleyy"
                }]
            ],
            [
                [{
                    p: "ولو",
                    f: "wulo"
                }],
                [{
                    p: "ول",
                    f: "wul",
                }, 
                {
                    p: "ولو",
                    f: "wuloo"
                }]
            ],
            [
                [{
                    p: "وله",
                    f: "wula"
                }],
                [{
                    p: "ولې",
                    f: "wule"
                }]
            ],
        ],
    },
    present: [
        [
            [{
                p: "یم",
                f: "yum"
            }],
            [{
                p: "یو",
                f: "yoo"
            }]
        ],
        [
            [{
                p: "یم",
                f: "yum"
            }],
            [{
                p: "یو",
                f: "yoo"
            }]
        ],
        [
            [{
                p: "یې",
                f: "ye"
            }],
            [{
                p: "یئ",
                f: "yeyy"
            }]
        ],
        [
            [{
                p: "یې",
                f: "ye"
            }],
            [{
                p: "یئ",
                f: "yeyy"
            }]
        ],
        [
            [{
                p: "دی",
                f: "dey"
            }],
            [{
                p: "دي",
                f: "dee"
            }]
        ],
        [
            [{
                p: "ده",
                f: "da"
            }],
            [{
                p: "دي",
                f: "dee"
            }]
        ],
    ],
    habitual: [
        [
            [{
                p: "یم",
                f: "yum"
            }],
            [{
                p: "یو",
                f: "yoo"
            }]
        ],
        [
            [{
                p: "یم",
                f: "yum"
            }],
            [{
                p: "یو",
                f: "yoo"
            }]
        ],
        [
            [{
                p: "یې",
                f: "ye"
            }],
            [{
                p: "یئ",
                f: "yeyy"
            }]
        ],
        [
            [{
                p: "یې",
                f: "ye"
            }],
            [{
                p: "یئ",
                f: "yeyy"
            }]
        ],
        [
            [{
                p: "وي",
                f: "wee"
            }],
            [{
                p: "وي",
                f: "wee"
            }]
        ],
        [
            [{
                p: "وي",
                f: "wee"
            }],
            [{
                p: "وي",
                f: "wee"
            }]
        ],
    ],
    subjunctive: [
        [
            [{
                p: "وم",
                f: "wum"
            }],
            [{
                p: "وو",
                f: "woo"
            }]
        ],
        [
            [{
                p: "وم",
                f: "wum"
            }],
            [{
                p: "وو",
                f: "woo"
            }]
        ],
        [
            [{
                p: "وې",
                f: "we"
            }],
            [{
                p: "وئ",
                f: "weyy"
            }]
        ],
        [
            [{
                p: "وې",
                f: "we"
            }],
            [{
                p: "وئ",
                f: "weyy"
            }]
        ],
        [
            [{
                p: "وي",
                f: "wee"
            }],
            [{
                p: "وي",
                f: "wee"
            }]
        ],
        [
            [{
                p: "وي",
                f: "wee"
            }],
            [{
                p: "وي",
                f: "wee"
            }]
        ],
    ],
    pastSubjunctive: [
        [subjPastEquative, subjPastEquative],
        [subjPastEquative, subjPastEquative],
        [subjPastEquative, subjPastEquative],
        [subjPastEquative, subjPastEquative],
        [subjPastEquative, subjPastEquative],
        [subjPastEquative, subjPastEquative],
    ],
};

export const emptyVerbBlock: T.VerbBlock = [
    [[{p: "", f: ""}], [{p: "", f: ""}]],
    [[{p: "", f: ""}], [{p: "", f: ""}]],
    [[{p: "", f: ""}], [{p: "", f: ""}]],
    [[{p: "", f: ""}], [{p: "", f: ""}]],
    [[{p: "", f: ""}], [{p: "", f: ""}]],
    [[{p: "", f: ""}], [{p: "", f: ""}]],
];

export const imperativeEndings: T.ImperativeBlock = [
    // masc 2nd pers
    [
        [{ p: "ه", f: "a" }], // singular
        [{ p: "ئ", f: "eyy" }], // plural
    ],
    // fem 2nds pers
    [
        [{ p: "ه", f: "a" }], // singular
        [{ p: "ئ", f: "eyy" }], // plural
    ],
];

export const ooPrefix: T.PsString = { p: "و", f: "oo" };

export const baParticle: T.PsString = { p: "به", f: "ba" };

export const presentParticipleSuffix: T.PsString = { p: "ونکی", f: "oonkey" };

const adjEndingsBlock = [
    // singular                   plural
    [
        [{
            p: `ی`,
            f: `ey`
        }],
        [{
            p: `ي`,
            f: `ee`
        }]
    ], // male
    [
        [{
            p: `ې`,
            f: `e`
        }],
        [{
            p: `ې`,
            f: `e`
        }]
    ], // female
];

export const adjectiveEndings = [...adjEndingsBlock, ...adjEndingsBlock, ...adjEndingsBlock] as T.VerbBlock;

const ksPerf = kawulStat.info.root.perfective as T.LengthOptions<T.PsString>;

export const passiveStativeBridge = [
    // TODO: SHORT AND LONG HERE??
    {
        short: ksPerf.long,
        long: ksPerf.long,
    },
    // PK VARIATION - NOT BEING USED - ADD TO FORMS NOT ADDING THE SECOND FORM FOR SOME REASON
    // {
    //     short: {
    //         p: ksPerf.short.p + aayTail[1].p,
    //         f: ksPerf.short.f + aayTail[1].f,
    //     },
    //     long: {
    //         p: ksPerf.long.p + aayTail[1].p,
    //         f: ksPerf.long.f + aayTail[1].f,
    //     },
    // },
];

const basePlainPronouns = [
    [[{ p: "زه", f: "zu" }], [{ p: "مونږ", f: "moonG" }, { p: "موږ", f: "mooG" }]],
    [[{ p: "زه", f: "zu" }], [{ p: "مونږ", f: "moonG" }, { p: "موږ", f: "mooG" }]],
    [[{ p: "ته", f: "tu" }], [{ p: "تاسو", f: "táaso" }, { p: "تاسې", f: "táase" }]],
    [[{ p: "ته", f: "tu" }], [{ p: "تاسو", f: "táaso" }, { p: "تاسې", f: "táase" }]],
];
  
const baseInflectedPronouns = [
    [[{ p: "ما", f: "maa" }], [{ p: "مونږ", f: "moonG" }, { p: "موږ", f: "mooG" }]],
    [[{ p: "ما", f: "maa" }], [{ p: "مونږ", f: "moonG" }, { p: "موږ", f: "mooG" }]],
    [[{ p: "تا", f: "taa" }], [{ p: "تاسو", f: "táaso" }, { p: "تاسې", f: "táase" }]],
    [[{ p: "تا", f: "taa" }], [{ p: "تاسو", f: "táaso" }, { p: "تاسې", f: "táase" }]],
];
  
  const plainPronounsFar = [
    ...basePlainPronouns,
    [[{ p: "هغه", f: "haghá" }], [{ p: "هغوي", f: "haghwée" }]],
    [[{ p: "هغه", f: "haghá" }], [{ p: "هغوي", f: "haghwée" }]],
] as T.VerbBlock;
  
const plainPronounsNear = [
    ...basePlainPronouns,
    [[{ p: "دی", f: "dey" }], [{ p: "دوي", f: "dwee" }]],
    [[{ p: "دا", f: "daa" }], [{ p: "دوي", f: "dwee" }]],
] as T.VerbBlock;
  
const inflectedPronounsFar = [
    ...baseInflectedPronouns,
    [[{ p: "هغهٔ", f: "haghú" }], [{ p: "هغوي", f: "haghwée" }]],
    [[{ p: "هغې", f: "haghé" }], [{ p: "هغوي", f: "haghwée" }]],
] as T.VerbBlock;
  
const inflectedPronounsNear = [
    ...baseInflectedPronouns,
    [[{ p: "دهٔ", f: "du" }], [{ p: "دوي", f: "dwee" }]],
    [[{ p: "دې", f: "de" }], [{ p: "دوي", f: "dwee" }]],
] as T.VerbBlock;
  
const miniPronouns: T.VerbBlock = [
    [[{ p: "مې", f: "me" }], [{ p: "مو", f: "mU" }]],
    [[{ p: "مې", f: "me" }], [{ p: "مو", f: "mU" }]],
    [[{ p: "دې", f: "de" }], [{ p: "مو", f: "mU" }]],
    [[{ p: "دې", f: "de" }], [{ p: "مو", f: "mU" }]],
    [[{ p: "یې", f: "ye" }], [{ p: "یې", f: "ye" }]],
    [[{ p: "یې", f: "ye" }], [{ p: "یې", f: "ye" }]],
];
  
export const pronouns: {
    far: {
      inflected: T.VerbBlock;
      plain: T.VerbBlock;
    };
    near: {
      plain: T.VerbBlock;
      inflected: T.VerbBlock;
    };
    mini: T.VerbBlock;
  } = {
    far: {
      plain: plainPronounsFar,
      inflected: inflectedPronounsFar,
    },
    near: {
      plain: plainPronounsNear,
      inflected: inflectedPronounsNear,
    },
    mini: miniPronouns,
};

export const persons = [
    {
        label: { subject: "I (m.)", object: "me (m.)" },
        person: 0,
    },
    {
        label: { subject: "I (f.)", object: "me (f.)" },
        person: 1,
    },
    {
        label: { subject: "you (m.)", object: "you (m.)" },
        person: 2,
    },
    {
        label: { subject: "you (f.)", object: "you (f.)" },
        person: 3,
    },
    {
        label: { subject: "he/it (m.)", object: "him/it (m.)" },
        person: 4,
    },
    {
        label: { subject: "she/it (f.)", object: "her/it (f.)" },
        person: 5,
    },
    {
        label: { subject: "we (m. pl.)", object: "us (m. pl.)" },
        person: 6,
    },
    {
        label: { subject: "we (f. pl.)", object: "us (f. pl.)" },
        person: 7,
    },
    {
        label: { subject: "you (m. pl.)", object: "you (m. pl.)" },
        person: 8,
    },
    {
        label: { subject: "you (f. pl.)", object: "you (f. pl.)" },
        person: 9,
    },
    {
        label: { subject: "they (m. pl.)", object: "them (m. pl.)" },
        person: 10,
    },
    {
        label: { subject: "they (f. pl.)", object: "them (f. pl.)" },
        person: 11,
    },
];
