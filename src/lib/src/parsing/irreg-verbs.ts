import * as T from "../../../types";
import { wordQuery } from "./lookup";

export const raatlul = wordQuery("راتلل", "verb");

export const tlul = wordQuery("tlul", "verb");

export const wartlul = wordQuery("ورتلل", "verb");

export const dartlul = wordQuery("درتلل", "verb");

export const kedulStat = {
  entry: {
    ts: 1581086654898,
    i: 11100,
    p: "کېدل",
    f: "kedúl",
    g: "kedul",
    e: "to become _____",
    r: 2,
    c: "v. intrans. w compl.",
    ssp: "ش",
    ssf: "sh",
    prp: "شول",
    prf: "shwul",
    pprtp: "شوی",
    pprtf: "shúway",
    noOo: true,
    ec: "become",
  },
} as T.VerbEntry;
export const kedulDyn = {
  entry: {
    ts: 1527812754,
    i: 11101,
    p: "کېدل",
    f: "kedúl",
    g: "kedul",
    e: "to happen, occur",
    r: 2,
    c: "v. intrans.",
    ssp: "وش",
    ssf: "óosh",
    prp: "وشول",
    prf: "óoshwul",
    pprtp: "شوی",
    pprtf: "shúway",
    diacExcept: true,
    ec: "happen",
    separationAtP: 1,
    separationAtF: 2,
  },
} as T.VerbEntry;

export const kawulStat = {
  entry: {
    ts: 1579015359582,
    i: 11112,
    p: "کول",
    f: "kawúl",
    g: "kawul",
    e: 'to make ____ ____ (as in "He\'s making me angry.")',
    r: 4,
    c: "v. trans. w. compl.",
    ssp: "کړ",
    ssf: "kR",
    prp: "کړل",
    prf: "kRul",
    pprtp: "کړی",
    pprtf: "kúRay",
    noOo: true,
    ec: "make,makes,making,made,made",
  },
} as T.VerbEntry;

export const kawulDyn = {
  entry: {
    ts: 1527812752,
    i: 11113,
    p: "کول",
    f: "kawúl",
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
} as T.VerbEntry;
