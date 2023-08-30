import * as T from "../../../types";
import { mapVerbRenderedOutput } from "../fp-ps";
import { removeAccents } from "../accent-helpers";
import { ensureNoHangingR, getPersonFromNP, isPastTense } from "./vp-tools";
import { isImperativeTense, isPattern4Entry } from "../type-predicates";
import { renderVerb } from "../new-verb-engine/render-verb";
import { renderEnglishVPBase } from "./english-vp-rendering";
import { renderNPSelection } from "./render-np";
import {
  getObjectSelection,
  getSubjectSelection,
  makeBlock,
  makeKid,
} from "./blocks-utils";
import { renderAPSelection } from "./render-ap";
import {
  findPossesivesToShrink,
  orderKids,
  getMiniPronounPs,
} from "./render-common";
import { renderComplementSelection } from "./render-complement";
import { statVerb } from "../new-verb-engine/roots-and-stems";

// TODO: Issue with yo me R -- both in rendering (what to do - یوړ مې)
// and in parsing!

export function renderVP(VP: T.VPSelectionComplete): T.VPRendered {
  const subject = getSubjectSelection(VP.blocks).selection;
  const object = getObjectSelection(VP.blocks).selection;
  // Sentence Rules Logic
  const isPast = isPastTense(VP.verb.tense);
  const isTransitive = object !== "none";
  const { king, servant } = getKingAndServant(isPast, isTransitive);
  const kingPerson = getPersonFromNP(king === "subject" ? subject : object);
  const complementPerson = getPersonFromNP(object ? object : subject);
  // TODO: more elegant way of handling this type safety
  if (kingPerson === undefined) {
    throw new Error("king of sentance does not exist");
  }
  const subjectPerson = getPersonFromNP(subject);
  const objectPerson = getPersonFromNP(object);
  const inflectSubject =
    isPast && isTransitive && !isMascSingAnimatePattern4(subject);
  const inflectObject = !isPast && isFirstOrSecondPersPronoun(object);
  // Render Elements
  const firstBlocks = renderVPBlocks(VP.blocks, VP.externalComplement, {
    inflectSubject,
    inflectObject,
    king,
    complementPerson,
  });
  const { vbs, hasBa } = renderVerb({
    verb:
      VP.verb.isCompound === "generative stative"
        ? statVerb[
            VP.verb.transitivity === "intransitive"
              ? "intransitive"
              : "transitive"
          ]
        : VP.verb.dynAuxVerb
        ? VP.verb.dynAuxVerb
        : VP.verb.verb,
    tense: VP.verb.tense,
    subject: subjectPerson,
    object: objectPerson,
    voice: VP.verb.voice,
    negative: VP.verb.negative,
  });
  const VBwNeg = insertNegative(
    vbs,
    VP.verb.negative,
    isImperativeTense(VP.verb.tense)
  );
  // just enter the negative in the verb blocks
  return {
    type: "VPRendered",
    king,
    servant,
    isPast,
    isTransitive,
    isCompound: VP.verb.isCompound,
    blocks: VBwNeg.map((VBvars) => [...firstBlocks, ...VBvars]),
    kids: getVPKids(hasBa, VP.blocks, VP.form, king),
    englishBase: renderEnglishVPBase({
      subjectPerson,
      object:
        VP.verb.isCompound === "dynamic" ||
        VP.verb.isCompound === "generative stative"
          ? "none"
          : object,
      vs: VP.verb,
    }),
    form: VP.form,
    whatsAdjustable: whatsAdjustable(VP),
  };
}

function getVPKids(
  hasBa: boolean,
  blocks: T.VPSBlockComplete[],
  form: T.FormVersion,
  king: "subject" | "object"
): T.Kid[] {
  const subject = getSubjectSelection(blocks).selection;
  const objectS = getObjectSelection(blocks).selection;
  const object = typeof objectS === "object" ? objectS : undefined;
  const servantNP = king === "subject" ? object : subject;
  const shrunkenServant =
    form.shrinkServant && servantNP
      ? makeKid(shrinkServant(servantNP))
      : undefined;
  const shrunkenPossesives = findPossesivesToShrink(
    removeAbbreviated(blocks, form, king)
  ).map(makeKid);
  return orderKids([
    ...(hasBa ? [makeKid({ type: "ba" })] : []),
    ...(shrunkenServant ? [shrunkenServant] : []),
    ...(shrunkenPossesives ? shrunkenPossesives : []),
  ]);
}

function removeAbbreviated(
  blocks: T.VPSBlockComplete[],
  form: T.FormVersion,
  king: "subject" | "object"
): T.VPSBlockComplete[] {
  return blocks.filter(({ block }) => {
    if (block.type === "subjectSelection") {
      if (form.shrinkServant && king === "object") return false;
      if (form.removeKing && king === "subject") return false;
    }
    if (block.type === "objectSelection") {
      if (form.shrinkServant && king === "subject") return false;
      if (form.removeKing && king === "object") return false;
    }
    return true;
  });
}

export function insertNegative(
  blocks: T.VerbRenderedOutput,
  negative: boolean,
  imperative: boolean
): T.Block[][] {
  if (!negative) {
    return [blocks.flat().map(makeBlock)];
  }
  const blocksNoAccentA = mapVerbRenderedOutput(removeAccents, blocks)
    .flat()
    .map(makeBlock);
  const neg = makeBlock({ type: "negative", imperative });
  const nonStandPerfectiveSplit = hasNonStandardPerfectiveSplit(blocks);
  if (blocks[1].length === 2) {
    // swapped ending with negative for ability and perfect verb forms
    if (nonStandPerfectiveSplit) {
      return [
        insertFromEnd(swapEndingBlocks(blocksNoAccentA), neg, 2),
        insertFromEnd(swapEndingBlocks(blocksNoAccentA, 2), neg, 3),
        insertFromEnd(blocksNoAccentA, neg, 1),
      ];
    }
    return [
      insertFromEnd(swapEndingBlocks(blocksNoAccentA), neg, 2),
      insertFromEnd(blocksNoAccentA, neg, 1),
    ];
  }
  if (nonStandPerfectiveSplit) {
    return [
      // special case to handle نه لاړ  (can't say لا نه ړ)
      insertFromEnd(ensureNoHangingR(blocksNoAccentA), neg, 1),
      insertFromEnd(blocksNoAccentA, neg, 2),
    ];
  } else {
    return [insertFromEnd(blocksNoAccentA, neg, 1)];
  }
}

function swapEndingBlocks<X>(arr: X[], n: number = 1): X[] {
  return [
    ...arr.slice(0, arr.length - (n + 1)),
    ...arr.slice(-n),
    ...arr.slice(-(n + 1), -n),
  ];
}

function insertFromEnd<X>(arr: X[], x: X, n: number): X[] {
  if (n === 0) {
    return [...arr, x];
  }
  return [...arr.slice(0, arr.length - n), x, ...arr.slice(-n)];
}

function hasNonStandardPerfectiveSplit([[ph]]: T.VerbRenderedOutput): boolean {
  if (!ph) {
    return false;
  }
  if (ph.type !== "PH") {
    return false;
  }
  return !["و", "وا"].includes(ph.ps.p);
}

function shrinkServant(np: T.NPSelection): T.MiniPronoun {
  const person = getPersonFromNP(np);
  return {
    type: "mini-pronoun",
    person,
    ps: getMiniPronounPs(person),
    source: "servant",
    np,
  };
}

function renderVPBlocks(
  blocks: T.VPSBlockComplete[],
  externalComplement: T.VPSelectionComplete["externalComplement"],
  config: {
    inflectSubject: boolean;
    inflectObject: boolean;
    king: "subject" | "object";
    complementPerson: T.Person | undefined;
  }
): T.Block[] {
  const object = getObjectSelection(blocks);
  const subject = getSubjectSelection(blocks);
  const adverbPerson =
    typeof object.selection === "object"
      ? getPersonFromNP(object.selection)
      : getPersonFromNP(subject.selection);
  const b = externalComplement
    ? [...blocks, { block: externalComplement }]
    : blocks;
  return b.reduce((blocks, { block }): T.Block[] => {
    if (block.type === "subjectSelection") {
      return [
        ...blocks,
        makeBlock({
          type: "subjectSelection",
          selection: renderNPSelection(
            block.selection,
            config.inflectSubject,
            false,
            "subject",
            config.king === "subject" ? "king" : "servant",
            false
          ),
        }),
      ];
    }
    if (block.type === "objectSelection") {
      const object = typeof block === "object" ? block.selection : block;
      if (typeof object !== "object") {
        return [
          ...blocks,
          makeBlock({
            type: "objectSelection",
            selection: object,
          }),
        ];
      }
      const selection = renderNPSelection(
        object,
        config.inflectObject,
        true,
        "object",
        config.king === "object" ? "king" : "servant",
        false
      );
      return [
        ...blocks,
        makeBlock({
          type: "objectSelection",
          selection,
        }),
      ];
    }
    if (block.type === "AP") {
      return [
        ...blocks,
        makeBlock(renderAPSelection(block, adverbPerson ?? 0)),
      ];
    }
    return [
      ...blocks,
      makeBlock(
        renderComplementSelection(
          block,
          // just for typesafety // TODO: only include the person if we're doing an adjective
          config.complementPerson || T.Person.FirstSingMale
        )
      ),
    ];
  }, [] as T.Block[]);
}

function whatsAdjustable(
  VP: T.VPSelectionComplete
): "both" | "king" | "servant" {
  // TODO: intransitive dynamic compounds?
  return VP.verb.isCompound === "dynamic" ||
    (VP.verb.isCompound === "generative stative" &&
      VP.verb.transitivity === "transitive")
    ? isPastTense(VP.verb.tense)
      ? "servant"
      : "king"
    : VP.verb.transitivity === "transitive"
    ? VP.verb.voice === "active"
      ? "both"
      : "king"
    : VP.verb.transitivity === "intransitive"
    ? "king"
    : // grammTrans
    isPastTense(VP.verb.tense)
    ? "servant"
    : "king";
}

export function getKingAndServant(
  isPast: boolean,
  isTransitive: boolean
):
  | { king: "subject"; servant: "object" }
  | { king: "object"; servant: "subject" }
  | { king: "subject"; servant: undefined } {
  if (!isTransitive) {
    return { king: "subject", servant: undefined };
  }
  return isPast
    ? {
        king: "object",
        servant: "subject",
      }
    : {
        king: "subject",
        servant: "object",
      };
}

export function isFirstOrSecondPersPronoun(
  o: "none" | T.NPSelection | T.Person.ThirdPlurMale
): boolean {
  if (typeof o !== "object") return false;
  if (o.selection.type !== "pronoun") return false;
  return [0, 1, 2, 3, 6, 7, 8, 9].includes(o.selection.person);
}

function isMascSingAnimatePattern4(np: T.NPSelection): boolean {
  if (np.selection.type !== "noun") {
    return false;
  }
  return (
    isPattern4Entry(np.selection.entry) &&
    np.selection.entry.c.includes("anim.") &&
    np.selection.number === "singular" &&
    np.selection.gender === "masc"
  );
}
