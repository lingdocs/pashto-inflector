import * as T from "../../../types";
import { makeVerbSelection } from "./make-verb-selection";
import { vEntry } from "./rs-helpers";

const wahul = vEntry({
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
});
const kawulDyn = vEntry({
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
  diacExcept: true,
  ec: "do,does,doing,did,done",
  separationAtP: 1,
  separationAtF: 2,
});
const wahulNoC = vEntry({
  ts: 1527815399,
  i: 15049,
  p: "وهل",
  f: "wahul",
  g: "wahul",
  e: "to hit",
  r: 4,
  tppp: "واهه",
  tppf: "waahu",
  ec: "hit,hits,hitting,hit,hit",
});
const wahulNoC2 = vEntry({
  ts: 1527815399,
  i: 15049,
  p: "وهل",
  f: "wahul",
  g: "wahul",
  c: "v",
  e: "to hit",
  r: 4,
  tppp: "واهه",
  tppf: "waahu",
  ec: "hit,hits,hitting,hit,hit",
});
const khandul = vEntry({
  ts: 1527812767,
  i: 5896,
  p: "خندل",
  f: "khandul",
  g: "khandul",
  e: "to laugh",
  r: 4,
  c: "v. gramm. trans.",
  psp: "خاند",
  psf: "khaand",
  ec: "laugh",
});
const leedul = vEntry({
  ts: 1527812275,
  i: 12053,
  p: "لیدل",
  f: "leedul",
  g: "leedul",
  e: "to see",
  r: 4,
  c: "v. trans./gramm. trans.",
  psp: "وین",
  psf: "ween",
  tppp: "لید",
  tppf: "leed",
  ec: "see,sees,seeing,saw,seen",
});
const ghadzedul = vEntry({
  ts: 1527812615,
  i: 9500,
  p: "غځېدل",
  f: "ghadzedul",
  g: "ghadzedul",
  e: "stretch out, lie, be extended, expand",
  r: 3,
  c: "v. intrans.",
  ec: "stretch",
  ep: "out",
});
const bandawul = vEntry(
  {
    ts: 1527821309,
    i: 1792,
    p: "بندول",
    f: "bandawul",
    g: "bandawul",
    e: "to close, block, stop, barricade, cut off, restrain, hold back",
    r: 3,
    c: "v. stat. comp. trans.",
    l: 1577301753727,
    ec: "close",
  },
  {
    ts: 1577301753727,
    i: 1780,
    p: "بند",
    f: "band",
    g: "band",
    e: "closed, blocked, stopped",
    c: "adj.",
  }
);
const bandedul = vEntry(
  {
    ts: 1588781671306,
    i: 1796,
    p: "بندېدل",
    f: "bandedúl",
    g: "bandedul",
    e: "to be closed, blocked, stopped",
    r: 4,
    c: "v. stat. comp. intrans.",
    l: 1577301753727,
    ec: "be",
    ep: "closed",
  },
  {
    ts: 1577301753727,
    i: 1780,
    p: "بند",
    f: "band",
    g: "band",
    e: "closed, blocked, stopped",
    c: "adj.",
  }
);
const mundaWahul = vEntry(
  {
    ts: 1527812939,
    i: 13322,
    p: "منډه وهل",
    f: "munDa wahul",
    g: "munDawahul",
    e: "to run",
    r: 4,
    c: "v. dyn. comp. trans.",
    l: 1527815805,
    ec: "run,runs,running,ran,run",
  },
  {
    ts: 1527815805,
    i: 13321,
    p: "منډه",
    f: "múnDa",
    g: "munDa",
    e: "run, running",
    r: 4,
    c: "n. f.",
  }
);
const istreeKawul = vEntry(
  {
    ts: 1658796089458,
    i: 519,
    p: "استري کول",
    f: "istree kawul",
    g: "istreekawul",
    e: "to iron (clothes etc.)",
    r: 4,
    c: "v. dyn./stat. comp. trans.",
    l: 1658795458148,
    ec: "iron",
  },
  {
    ts: 1658795458148,
    i: 518,
    p: "استري",
    f: "istree",
    g: "istree",
    e: "iron (for ironing clothes)",
    r: 4,
    c: "n. f.",
  }
);
const cheeghKawul = vEntry(
  {
    ts: 1608137130992,
    i: 5190,
    p: "چیغه کول",
    f: "chéegha kawul",
    g: "cheeghakawul",
    e: "to yell, scream, cry out",
    r: 3,
    c: "v. gen. stat./dyn. comp. trans.",
    l: 1527813972,
  },
  {
    ts: 1527813972,
    i: 5189,
    p: "چیغه",
    f: "chéegha",
    g: "cheegha",
    e: "yell, scream, cry",
    r: 3,
    c: "n. f.",
  }
);
const kaarKawul = vEntry(
  {
    ts: 1527812732,
    i: 10270,
    p: "کار کول",
    f: "kaar kawul",
    g: "kaarkawul",
    e: "to work",
    r: 4,
    c: "v. dyn. comp. trans.",
    l: 1527822084,
    ec: "work",
  },
  {
    ts: 1527822084,
    i: 10268,
    p: "کار",
    f: "kaar",
    g: "kaar",
    e: "work, job, business, stuff to do",
    r: 4,
    c: "n. m.",
  }
);

const tests: {
  verb: T.VerbEntry;
  result: T.NewVerbSelection;
}[] = [
  {
    verb: wahul,
    result: {
      type: "verb",
      verb: wahul,
      voice: "active",
      canChangeVoice: true,
      transitivity: "transitive",
      compound: false,
      canBeGenStat: false,
      canChangeTransGenTrans: false,
      variableRs: false,
      canChangeStatDyn: false,
      negative: false,
      tense: "presentVerb",
    },
  },
  {
    verb: ghadzedul,
    result: {
      type: "verb",
      verb: ghadzedul,
      voice: "active",
      canChangeVoice: false,
      transitivity: "intransitive",
      compound: false,
      canBeGenStat: false,
      canChangeTransGenTrans: false,
      variableRs: false,
      canChangeStatDyn: false,
      negative: false,
      tense: "presentVerb",
    },
  },
  {
    verb: khandul,
    result: {
      type: "verb",
      verb: khandul,
      voice: "active",
      canChangeVoice: false,
      transitivity: "grammatically transitive",
      compound: false,
      canBeGenStat: false,
      canChangeTransGenTrans: false,
      variableRs: false,
      canChangeStatDyn: false,
      negative: false,
      tense: "presentVerb",
    },
  },
  {
    verb: leedul,
    result: {
      type: "verb",
      verb: leedul,
      voice: "active",
      canChangeVoice: true,
      transitivity: "transitive",
      compound: false,
      canBeGenStat: false,
      canChangeTransGenTrans: true,
      variableRs: false,
      canChangeStatDyn: false,
      negative: false,
      tense: "presentVerb",
    },
  },
  {
    verb: bandawul,
    result: {
      type: "verb",
      verb: bandawul,
      voice: "active",
      canChangeVoice: true,
      transitivity: "transitive",
      compound: "stative",
      canBeGenStat: false,
      canChangeTransGenTrans: false,
      variableRs: false,
      canChangeStatDyn: false,
      negative: false,
      tense: "presentVerb",
    },
  },
  {
    verb: bandedul,
    result: {
      type: "verb",
      verb: bandedul,
      voice: "active",
      canChangeVoice: false,
      transitivity: "intransitive",
      compound: "stative",
      canBeGenStat: false,
      canChangeTransGenTrans: false,
      variableRs: false,
      canChangeStatDyn: false,
      negative: false,
      tense: "presentVerb",
    },
  },
  {
    verb: mundaWahul,
    result: {
      type: "verb",
      verb: mundaWahul,
      voice: "active",
      canChangeVoice: true,
      transitivity: "transitive",
      compound: "dynamic",
      canBeGenStat: false,
      canChangeTransGenTrans: false,
      variableRs: false,
      canChangeStatDyn: false,
      negative: false,
      tense: "presentVerb",
      dynAuxVerb: wahul,
    },
  },
  {
    verb: istreeKawul,
    result: {
      type: "verb",
      verb: istreeKawul,
      voice: "active",
      canChangeVoice: true,
      transitivity: "transitive",
      compound: "stative",
      canBeGenStat: false,
      canChangeTransGenTrans: false,
      variableRs: false,
      canChangeStatDyn: true,
      negative: false,
      tense: "presentVerb",
      dynAuxVerb: kawulDyn,
    },
  },
  {
    verb: cheeghKawul,
    result: {
      type: "verb",
      verb: cheeghKawul,
      voice: "active",
      canChangeVoice: false,
      transitivity: "transitive",
      compound: "dynamic",
      canBeGenStat: true,
      canChangeTransGenTrans: false,
      variableRs: false,
      canChangeStatDyn: false,
      negative: false,
      tense: "presentVerb",
      dynAuxVerb: kawulDyn,
    },
  },
  {
    verb: kaarKawul,
    result: {
      type: "verb",
      verb: kaarKawul,
      voice: "active",
      canChangeVoice: false,
      transitivity: "transitive",
      compound: "dynamic",
      canBeGenStat: false,
      canChangeTransGenTrans: false,
      variableRs: false,
      canChangeStatDyn: false,
      negative: false,
      tense: "presentVerb",
      dynAuxVerb: kawulDyn,
    },
  },
];

test("verb selection", () => {
  tests.forEach(({ verb, result }) => {
    expect(makeVerbSelection(verb)).toEqual(result);
  });
});

test("verb selection failures", () => {
  expect(() => {
    makeVerbSelection(wahulNoC);
  }).toThrow();
  expect(() => {
    makeVerbSelection(wahulNoC2);
  }).toThrow();
});
