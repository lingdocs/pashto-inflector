import * as T from "../../../types";
import { removeFVarientsFromVerb } from "../accent-and-ps-utils";
import { dynamicAuxVerbs } from "../dyn-comp-aux-verbs";

export function makeVerbSelection(verb: T.VerbEntry): T.NewVerbSelection {
  const v = removeFVarientsFromVerb(verb);
  const { transitivity, canChangeTransGenTrans } = getTransitivity(v);
  const compInfo = getCompoundInfo(v);
  const canChangeVoice =
    transitivity === "transitive" &&
    (compInfo.dynAuxVerb?.entry.p !== "کول" || compInfo.canChangeStatDyn) &&
    !compInfo.canBeGenStat;
  return {
    type: "verb",
    verb: v,
    transitivity,
    canChangeTransGenTrans,
    ...compInfo,
    tense: "presentVerb",
    voice: "active",
    canChangeVoice,
    negative: false,
    variableRs: false,
  };
}

function getCompoundInfo(v: T.VerbEntryNoFVars): {
  compound: T.NewVerbSelection["compound"];
  canChangeStatDyn: boolean;
  dynAuxVerb?: T.NewVerbSelection["dynAuxVerb"];
  canBeGenStat: boolean;
} {
  const c = v.entry.c;
  if (c.includes(" stat. comp.")) {
    return {
      compound: "stative",
      canChangeStatDyn: false,
      canBeGenStat: false,
    };
  }
  if (c.includes(" dyn. comp.")) {
    return {
      compound: "dynamic",
      canChangeStatDyn: false,
      dynAuxVerb: getDynamicAuxVerb(v),
      canBeGenStat: false,
    };
  }
  if (c.includes(" dyn./stat. comp.")) {
    return {
      compound: "stative",
      canChangeStatDyn: true,
      dynAuxVerb: getDynamicAuxVerb(v),
      canBeGenStat: false,
    };
  }
  if (c.includes(" gen. stat./dyn. comp.")) {
    return {
      compound: "dynamic",
      canBeGenStat: true,
      dynAuxVerb: getDynamicAuxVerb(v),
      canChangeStatDyn: false,
    };
  }
  return {
    compound: false,
    canChangeStatDyn: false,
    canBeGenStat: false,
  };
}

function getTransitivity(v: T.VerbEntryNoFVars): {
  transitivity: T.Transitivity;
  canChangeTransGenTrans: boolean;
} {
  const c = v.entry.c || "";
  const canChangeTransGenTrans = c.includes(" trans./gramm. trans.");
  if (c.includes(" intrans.")) {
    return {
      canChangeTransGenTrans,
      transitivity: "intransitive",
    };
  }
  if (c.includes("gramm. trans") && !canChangeTransGenTrans) {
    return {
      canChangeTransGenTrans,
      transitivity: "grammatically transitive",
    };
  }
  if (c.includes(" trans.")) {
    return {
      canChangeTransGenTrans,
      transitivity: "transitive",
    };
  }
  throw new Error("invalid or missing transitivity info in verb c");
}

function getDynamicAuxVerb({ entry }: T.VerbEntryNoFVars): T.VerbEntryNoFVars {
  const auxWord = entry.p.trim().split(" ").slice(-1)[0];
  const auxWordResult = dynamicAuxVerbs.find((a) => a.entry.p === auxWord) as
    | T.VerbEntry
    | undefined;
  /* istanbul ignore next */
  if (!auxWordResult) {
    throw new Error("unknown auxilary verb for dynamic compound");
  }
  return removeFVarientsFromVerb(auxWordResult);
}

