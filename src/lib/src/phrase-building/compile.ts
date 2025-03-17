import * as T from "../../../types";
import {
  capitalizeFirstLetter,
  concatPsString,
  getLong,
} from "../p-text-helpers";
import { negativeParticle } from "../grammar-units";
import * as grammarUnits from "../grammar-units";
import { ensureNoHangingR, removeDuplicates } from "./vp-tools";
import { getEnglishFromRendered, getPashtoFromRendered } from "./np-tools";
import { completeEPSelection, renderEP } from "./render-ep";
import { completeVPSelection } from "./vp-tools";
import { renderVP } from "./render-vp";
import {
  getAPsFromBlocks,
  getComplementFromBlocks,
  getObjectSelectionFromBlocks,
  getPredicateBlock,
  getSubjectSelectionFromBlocks,
  hasEquativeWithLengths,
  isRenderedVerbB,
  specifyEquativeLength,
} from "./blocks-utils";
import { assertNever, blank, kidsBlank } from "../misc-helpers";
import { monoidPsString, monoidPsStringWVars } from "../fp-ps";
import { concatAll } from "fp-ts/lib/Monoid";
import { getEnglishWord } from "../get-english-word";

type BlankoutOptions = {
  equative?: boolean;
  ba?: boolean;
  kidsSection?: boolean;
  verb?: boolean;
  negative?: boolean;
  predicate?: boolean;
};

// TODO: Should there be a way to get length options on compiled VP ?

// function compilePs({ blocks, kids, verb: { head, rest }, VP }: CompilePsInput): T.SingleOrLengthOpts<T.PsString[]> {
//     if ("long" in rest) {
//         return {
//             long: compilePs({ blocks, verb: { head, rest: rest.long }, VP, kids }) as T.PsString[],
//             short: compilePs({ blocks, verb: { head, rest: rest.short }, VP, kids }) as T.PsString[],
//             ...rest.mini ? {
//                 mini: compilePs({ blocks, verb: { head, rest: rest.mini }, VP, kids }) as T.PsString[],
//             } : {},
//         };
//     }
//     const verbWNegativeVersions = arrangeVerbWNegative(head, rest, VP.verb);

//     // put together all the different possible permutations based on:
//     // a. potential different versions of where the nu goes
//     return removeDuplicates(verbWNegativeVersions.flatMap((verbSegments) => {
//         // for each permutation of the possible ordering of NPs and Verb + nu
//         // 1. put in kids in the kids section
//         const segments = oldPutKidsInKidsSection([...blocks, ...verbSegments], kids);
//         // 2. space out the words properly
//         const withProperSpaces = addSpacesBetweenSegments(segments);
//         // 3. throw it all together into a PsString for each permutation
//         return combineSegments(withProperSpaces);
//     }));
// }

export function compileEP(EP: T.EPRendered): {
  ps: T.SingleOrLengthOpts<T.PsString[]>;
  e?: string[];
};
export function compileEP(
  EP: T.EPRendered,
  combineLengths: true,
  blankOut?: BlankoutOptions
): { ps: T.PsString[]; e?: string[] };
export function compileEP(
  EP: T.EPRendered,
  combineLengths?: boolean,
  blankOut?: BlankoutOptions
): { ps: T.SingleOrLengthOpts<T.PsString[]>; e?: string[] } {
  const psResult = compileEPPs(EP.blocks, EP.kids, EP.omitSubject, blankOut);
  return {
    ps: combineLengths ? flattenLengths(psResult) : psResult,
    e: compileEnglishEP(EP),
  };
}

export function compileVP(
  VP: T.VPRendered,
  form: T.FormVersion
): { ps: T.SingleOrLengthOpts<T.PsString[]>; e?: string[] };
export function compileVP(
  VP: T.VPRendered,
  form: T.FormVersion,
  combineLengths: boolean,
  blankOut?: BlankoutOptions
): { ps: T.PsString[]; e?: string[] };
export function compileVP(
  VP: T.VPRendered,
  form: T.FormVersion,
  combineLengths?: boolean,
  blankOut?: BlankoutOptions
): { ps: T.SingleOrLengthOpts<T.PsString[]>; e?: string[] } {
  // const verb = getVerbFromBlocks(VP.blocks).block;
  const psResult = compileVPPs(VP.blocks, VP.kids, form, VP.king, blankOut);
  return {
    // TODO: unneccessary because the lengths are already flattened
    ps: combineLengths ? flattenLengths(psResult) : psResult,
    // TODO: English doesn't quite work for dynamic compounds in passive voice
    e: /* (verb.voice === "passive" && VP.isCompound === "dynamic") ? undefined : */ compileEnglishVP(
      VP
    ),
  };
}

function compileVPPs(
  blocks: T.Block[][],
  kids: T.Kid[],
  form: T.FormVersion,
  king: "subject" | "object" | "complement",
  blankOut?: BlankoutOptions
): T.PsString[] {
  const subjectPerson =
    getSubjectSelectionFromBlocks(blocks).selection.selection.person;
  const blocksWKids = putKidsInKidsSection(
    filterForVisibleBlocksVP(blocks, form, king),
    kids,
    !!blankOut?.ba
  );
  return combineIntoText(blocksWKids, subjectPerson, blankOut);
}

function compileEPPs(
  blocks: T.Block[][],
  kids: T.Kid[],
  omitSubject: boolean,
  blankOut?: BlankoutOptions
): T.SingleOrLengthOpts<T.PsString[]> {
  if (hasEquativeWithLengths(blocks)) {
    return {
      long: compileEPPs(
        specifyEquativeLength(blocks, "long"),
        kids,
        omitSubject,
        blankOut
      ) as T.PsString[],
      short: compileEPPs(
        specifyEquativeLength(blocks, "short"),
        kids,
        omitSubject,
        blankOut
      ) as T.PsString[],
    };
  }
  const subjectPerson =
    getSubjectSelectionFromBlocks(blocks).selection.selection.person;
  const blocksWKids = putKidsInKidsSection(
    omitSubject
      ? blocks.map((blks) =>
          blks.filter((b) => b.block.type !== "subjectSelection")
        )
      : blocks,
    kids,
    !!blankOut?.kidsSection
  );
  return removeDuplicates(
    combineIntoText(blocksWKids, subjectPerson, blankOut)
  );
}

export function filterForVisibleBlocksVP(
  blocks: T.Block[][],
  form: T.FormVersion,
  king: "subject" | "object" | "complement"
): T.Block[][] {
  const servant = king === "object" ? "subject" : "object";
  return blocks.map((blks) =>
    blks.filter((block) => {
      if (form.removeKing) {
        if (
          (king === "subject" && block.block.type === "subjectSelection") ||
          (king === "object" && block.block.type === "objectSelection")
        )
          return false;
      }
      if (form.shrinkServant) {
        if (
          (servant === "subject" && block.block.type === "subjectSelection") ||
          (servant === "object" && block.block.type === "objectSelection")
        )
          return false;
      }
      if (
        block.block.type === "objectSelection" &&
        typeof block.block.selection !== "object"
      ) {
        return false;
      }
      return true;
    })
  );
}

export function filterForVisibleBlocksEP(
  blocks: T.Block[][],
  omitSubject: boolean
): T.Block[][] {
  if (!omitSubject) return blocks;
  return blocks.map((blks) =>
    blks.filter(({ block }) => {
      if (block.type === "subjectSelection") {
        return false;
      }
      return true;
    })
  );
}

export function combineIntoText(
  piecesWVars: (T.Block | T.Kid | T.PsString)[][],
  subjectPerson: T.Person,
  blankOut?: BlankoutOptions
): T.PsString[] {
  return removeDuplicates(
    piecesWVars.flatMap((pieces) => {
      const psVarsBlocks = getPsVarsBlocks(
        applyBlankOut(pieces, blankOut),
        subjectPerson
      );
      return concatAll(monoidPsStringWVars)(psVarsBlocks);
    })
  );
}

export function getPsVarsBlocks(
  pieces: (T.Block | T.Kid | T.PsString)[],
  subjectPerson: T.Person
): T.PsString[][] {
  const space = [{ p: " ", f: " " }];
  const phToCliticNegSpace = [{ p: "", f: "-" }];
  const endIndex = pieces.length - 1;
  return pieces.reduce<T.PsString[][]>((acc, x, i) => {
    const next = pieces[i + 1];
    if ("p" in x) {
      return [...acc, [x]];
    }
    const ps = getPsFromPiece(x, subjectPerson);
    return [
      ...acc,
      ps,
      ...(i === endIndex
        ? []
        : "block" in x && x.block.type === "PH"
        ? "kid" in next || ("block" in next && next.block.type === "negative")
          ? [phToCliticNegSpace]
          : []
        : [space]),
    ];
  }, []);
}
function applyBlankOut(
  pieces: (T.Block | T.Kid | T.PsString)[],
  blankOut: BlankoutOptions | undefined
): (T.Block | T.Kid | T.PsString)[] {
  if (!blankOut) return pieces;
  return pieces.map((x) => {
    if (
      (blankOut.equative && "block" in x && x.block.type === "equative") ||
      (blankOut.verb && "block" in x && isRenderedVerbB(x)) ||
      (blankOut?.predicate && "block" in x && x.block.type === "predicate")
    ) {
      return blank;
    }
    if (blankOut?.ba && "kid" in x && x.kid.type === "ba") {
      return kidsBlank;
    }
    if (blankOut?.negative && "block" in x && x.block.type === "negative") {
      return monoidPsString.empty;
    }
    return x;
  });
}

function getPsFromPiece(
  piece: T.Block | T.Kid,
  subjectPerson: T.Person
): T.PsString[] {
  if ("block" in piece) {
    if (piece.block.type === "negative") {
      return [
        negativeParticle[
          piece.block.imperative ? "imperative" : "nonImperative"
        ],
      ];
    }
    if (piece.block.type === "equative") {
      // length will already be specified in compileEPPs - this is just for type safety
      return getLong(piece.block.equative.ps);
    }
    if (piece.block.type === "subjectSelection") {
      return getPashtoFromRendered(piece.block.selection, subjectPerson);
    }
    if (piece.block.type === "predicate") {
      const b:
        | T.Rendered<T.ComplementSelection>
        | T.Rendered<T.UnselectedComplementSelection> = piece.block.selection;
      if (b.selection.type === "unselected") {
        return [{ p: "_____", f: "_____" }];
      }
      // CRAZY WHY DOESN'T TYPE NARROWING WORK HERE
      // @ts-expect-error - bad type narrowing
      const c: T.Rendered<T.ComplementSelection> = b;
      return getPashtoFromRendered(c, subjectPerson);
    }
    if (piece.block.type === "AP") {
      return getPashtoFromRendered(piece.block, subjectPerson);
    }
    if (piece.block.type === "PH") {
      return [piece.block.ps];
    }
    if (piece.block.type === "VB") {
      return flattenLengths(piece.block.ps);
    }
    if (piece.block.type === "objectSelection") {
      if (typeof piece.block.selection !== "object") {
        return [monoidPsString.empty];
      }
      return getPashtoFromRendered(piece.block.selection, subjectPerson);
    }
    if (piece.block.type === "NComp") {
      return [piece.block.comp.ps];
    }
    if (piece.block.type === "complement") {
      if (piece.block.selection.type === "sandwich") {
        // TODO: Kinda cheating
        return getPashtoFromRendered(
          { type: "AP", selection: piece.block.selection },
          false
        );
      }
      if (piece.block.selection.type === "possesor") {
        const b: T.RenderedPossesorSelection = piece.block.selection;
        return getPashtoFromRendered(b, false);
      }
      if (piece.block.selection.type === "unselected") {
        return [{ p: "_____", f: "_____" }];
      }
      if (piece.block.selection.type === "NP") {
        return getPashtoFromRendered(piece.block.selection, false);
      }
      return flattenLengths(piece.block.selection.ps);
    }
    if (piece.block.type === "welded") {
      // welded
      return getPsFromWelded(piece.block);
    }
    assertNever(piece.block, "unknown complement type");
  }
  if ("kid" in piece) {
    if (piece.kid.type === "ba") {
      return [grammarUnits.baParticle];
    }
    if (piece.kid.type === "mini-pronoun") {
      return [piece.kid.ps];
    }
  }
  throw new Error("unrecognized piece type");
}

function getPsFromWelded(v: T.Welded): T.PsString[] {
  function getPsFromSide(v: T.VB | T.NComp): T.PsString[] {
    if (v.type === "VB") {
      return flattenLengths(v.ps);
    }
    if (v.type === "NComp") {
      return [v.comp.ps];
    }
    return getPsFromWelded(v);
  }
  const left = getPsFromSide(v.left);
  const right = getPsFromSide(v.right);
  return left.flatMap((leftVar) =>
    right.flatMap((rightVar) => concatPsString(leftVar, " ", rightVar))
  );
}

function getEngAPs(blocks: T.Block[][]): string {
  return getAPsFromBlocks(blocks).reduce((accum, curr) => {
    const e = getEnglishFromRendered(curr);
    if (!e) return accum;
    return `${accum} ${e}`;
  }, "");
}

function getEngComplement(blocks: T.Block[][]): string | undefined {
  const comp = getComplementFromBlocks(blocks);
  if (!comp) return undefined;
  if (comp.selection.type === "unselected") {
    return "____";
  }
  if (comp.selection.type === "sandwich") {
    return getEnglishFromRendered({ type: "AP", selection: comp.selection });
  }
  if (comp.selection.type === "possesor" || comp.selection.type === "NP") {
    return getEnglishFromRendered({
      type: "complement",
      selection: comp.selection,
    });
  }
  if (comp.selection.type === "comp. noun") {
    return `${getEnglishWord(comp.selection.entry)} compl.`;
  }
  return comp.selection.e;
}

function putKidsInKidsSection(
  blocksWVars: T.Block[][],
  kids: T.Kid[],
  enforceKidsSectionBlankout: boolean
): (T.Block | T.Kid | T.PsString)[][] {
  function insert(blocks: T.Block[]): (T.Block | T.Kid | T.PsString)[] {
    const first = blocks[0];
    const rest = blocks.slice(1);
    return [
      first,
      ...(enforceKidsSectionBlankout ? [kidsBlank] : kids),
      ...ensureNoHangingR(rest),
    ];
  }
  return blocksWVars.map(insert);
}

function compileEnglishVP(VP: T.VPRendered): string[] | undefined {
  function insertEWords(
    e: string,
    {
      subject,
      object,
      APs,
      complement,
    }: {
      subject: string;
      object?: string;
      APs: string;
      complement: string | undefined;
    }
  ): string {
    return (
      e.replace("$SUBJ", subject).replace("$OBJ", object || "") +
      // add the complement in English if it's an external complement from a helper verb (kawul/kedul)
      // TODO!
      (complement /* && isStativeHelper(getVerbFromBlocks(VP.blocks).block.verb))*/
        ? ` ${complement}`
        : "") +
      APs
    );
  }
  const engSubj = getSubjectSelectionFromBlocks(VP.blocks).selection;
  const obj = getObjectSelectionFromBlocks(VP.blocks).selection;
  const engObj =
    typeof obj === "object"
      ? obj
      : obj === "none" || obj === T.Person.ThirdPlurMale
      ? ""
      : undefined;
  const engAPs = getEngAPs(VP.blocks);
  const engComplement = getEngComplement(VP.blocks);
  // require all English parts for making the English phrase
  return VP.englishBase && engSubj && engObj !== undefined
    ? VP.englishBase
        .map((e) =>
          insertEWords(e, {
            // TODO: make sure we actually have the english
            subject: getEnglishFromRendered(engSubj) || "",
            object: engObj ? getEnglishFromRendered(engObj) : "",
            APs: engAPs,
            complement: engComplement,
          })
        )
        .map(capitalizeFirstLetter)
    : undefined;
}

function compileEnglishEP(EP: T.EPRendered): string[] | undefined {
  function insertEWords(
    e: string,
    {
      subject,
      predicate,
      APs,
    }: { subject: string; predicate: string; APs: string }
  ): string {
    return e.replace("$SUBJ", subject).replace("$PRED", predicate || "") + APs;
  }
  const engSubjR = getSubjectSelectionFromBlocks(EP.blocks).selection;
  const engPredR = getPredicateBlock(EP.blocks).selection;
  const engSubj = getEnglishFromRendered(engSubjR);
  const engPred = getEnglishFromRendered(engPredR);
  const engAPs = getEngAPs(EP.blocks);
  // require all English parts for making the English phrase
  const b =
    EP.englishBase && engSubj && engPred
      ? EP.englishBase.map((e) =>
          insertEWords(e, {
            subject: engSubj,
            predicate: engPred,
            APs: engAPs,
          })
        )
      : undefined;
  return b?.map(capitalizeFirstLetter);
}

export function checkForMiniPronounsError(
  s: T.EPSelectionState | T.VPSelectionState
): undefined | string {
  function findDuplicateMiniP(mp: T.MiniPronoun[]): T.MiniPronoun | undefined {
    const duplicates = mp.filter(
      (item, index) => mp.findIndex((m) => item.ps.p === m.ps.p) !== index
    );
    if (duplicates.length === 0) return undefined;
    return duplicates[0];
  }
  const kids = (() => {
    if ("predicate" in s) {
      const EPS = completeEPSelection(s);
      if (!EPS) return undefined;
      return renderEP(EPS).kids;
    }
    const VPS = completeVPSelection(s);
    if (!VPS) return undefined;
    return renderVP(VPS).kids;
  })();
  if (!kids) return undefined;
  const miniPronouns = kids
    .filter((x) => x.kid.type === "mini-pronoun")
    .map((m) => m.kid) as T.MiniPronoun[];
  if (miniPronouns.length > 2) {
    return "can't add another mini-pronoun, there are alread two";
  }
  const duplicateMiniPronoun = findDuplicateMiniP(miniPronouns);
  if (duplicateMiniPronoun) {
    return `there's already a ${duplicateMiniPronoun.ps.p} - ${duplicateMiniPronoun.ps.f} mini-pronoun in use, can't have two of those`;
  }
  return undefined;
}

function findPossesivesInNP(
  NP: T.Rendered<T.NPSelection> | T.ObjectNP | undefined
): T.Rendered<T.NPSelection>[] {
  if (NP === undefined) return [];
  if (typeof NP !== "object") return [];
  if (!NP.selection.possesor) return [];
  if (NP.selection.adjectives) {
    const { adjectives, ...rest } = NP.selection;
    return [
      ...findPossesivesInAdjectives(adjectives),
      ...findPossesivesInNP({ type: "NP", selection: rest }),
    ];
  }
  if (NP.selection.possesor.shrunken) {
    return [NP.selection.possesor.np];
  }
  return findPossesivesInNP(NP.selection.possesor.np);
}

function findPossesivesInAdjectives(
  a: T.Rendered<T.AdjectiveSelection>[]
): T.Rendered<T.NPSelection>[] {
  return a.reduce(
    (accum, curr): T.Rendered<T.NPSelection>[] => [
      ...accum,
      ...findPossesivesInAdjective(curr),
    ],
    [] as T.Rendered<T.NPSelection>[]
  );
}

function findPossesivesInAdjective(
  a: T.Rendered<T.AdjectiveSelection>
): T.Rendered<T.NPSelection>[] {
  if (!a.sandwich) return [];
  return findPossesivesInNP(a.sandwich.inside);
}

export function flattenLengths(
  r: T.SingleOrLengthOpts<T.PsString[]>
): T.PsString[] {
  if ("long" in r) {
    // because we want to use the short shwul and past equatives as the default
    if (r.long[0].p.startsWith("شول") || r.long[0].p.startsWith("ول")) {
      return [...r.short, ...r.long];
    }
    return [...r.long, ...r.short, ...("mini" in r && r.mini ? r.mini : [])];
  }
  return r;
}
