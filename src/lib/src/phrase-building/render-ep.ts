import * as T from "../../../types";
import * as g from "../grammar-units";
import { getPersonFromNP } from "./vp-tools";
import { renderNPSelection } from "./render-np";
import { getPersonFromVerbForm } from "../misc-helpers";
import { getVerbBlockPosFromPerson } from "../misc-helpers";
import { renderAdverbSelection } from "./render-ap";
import { renderSandwich } from "./render-sandwich";
import {
  EPSBlocksAreComplete,
  getSubjectSelection,
  makeBlock,
  makeKid,
} from "./blocks-utils";
import { removeAccentsWLength } from "../accent-helpers";
import { findPossesivesToShrink, orderKids } from "./render-common";
import { renderComplementSelection } from "./render-complement";

export function renderEP(EP: T.EPSelectionComplete): T.EPRendered {
  const { kids, blocks, englishEquativePerson } = getEPSBlocksAndKids(EP);
  return {
    type: "EPRendered",
    blocks,
    kids,
    englishBase: equativeBuilders[EP.equative.tense](
      englishEquativePerson,
      EP.equative.negative
    ),
    omitSubject: EP.omitSubject,
  };
}

function getEPSBlocksAndKids(EP: T.EPSelectionComplete): {
  kids: T.Kid[];
  blocks: T.Block[][];
  englishEquativePerson: T.Person;
} {
  const subject = getSubjectSelection(EP.blocks).selection;
  const subjectPerson = getPersonFromNP(subject);
  const commandingNP: T.NPSelection =
    subject.selection.type === "pronoun"
      ? subject
      : EP.predicate.selection.type === "NP"
      ? EP.predicate.selection
      : subject;
  const commandingPerson = getPersonFromNP(commandingNP);
  const equative: T.EquativeBlock = {
    type: "equative",
    equative: renderEquative(EP.equative, commandingPerson),
  };
  const blocks: T.Block[][] = insertNegative(
    [
      ...renderEPSBlocks(EP.blocks),
      makeBlock({
        type: "predicateSelection",
        selection:
          EP.predicate.selection.type === "NP"
            ? renderNPSelection(
                EP.predicate.selection,
                false,
                false,
                "subject",
                "king",
                false
              )
            : // we won't have an unselected complement in the EP - TODO: make safer?
              (renderComplementSelection(
                EP.predicate.selection,
                commandingPerson
              ) as T.Rendered<T.ComplementSelection>),
      }),
      makeBlock(equative),
    ],
    EP.equative.negative
  );
  const miniPronouns = findPossesivesToShrink(
    removeOrKeepSubject([...EP.blocks, EP.predicate], EP.omitSubject)
  );
  const kids: T.Kid[] = orderKids([
    ...(equative.equative.hasBa ? [makeKid({ type: "ba" })] : []),
    ...miniPronouns.map(makeKid),
  ]);
  return {
    blocks,
    kids,
    englishEquativePerson:
      subject.selection.type === "participle"
        ? T.Person.ThirdSingMale
        : subjectPerson,
  };
}

function insertNegative(blocks: T.Block[], negative: boolean): T.Block[][] {
  if (!negative) return [blocks];
  const blocksA = removeAccentsFromEq(blocks);
  return [
    [
      ...blocksA.slice(0, blocks.length - 1),
      makeBlock({ type: "negative", imperative: false }),
      ...blocksA.slice(-1), // last (equative)
    ],
    [
      ...blocksA.slice(0, blocks.length - 2),
      makeBlock({ type: "negative", imperative: false }),
      ...blocksA.slice(-1), // last (equative)
      ...blocksA.slice(-2, -1), // second last (predicate)
    ],
  ];
}

function removeOrKeepSubject(
  blocks: (
    | T.EPSBlockComplete
    | T.SubjectSelectionComplete
    | T.PredicateSelectionComplete
    | T.APSelection
  )[],
  omitSubject: boolean
): (
  | T.EPSBlockComplete
  | T.SubjectSelectionComplete
  | T.PredicateSelectionComplete
  | T.APSelection
)[] {
  if (!omitSubject) return blocks;
  return blocks.filter((b) => !("type" in b && b.type === "subjectSelection"));
}

export function getEquativeForm(tense: T.EquativeTense): {
  hasBa: boolean;
  form: T.SingleOrLengthOpts<T.VerbBlock>;
} {
  const hasBa =
    tense === "future" || tense === "wouldBe" || tense === "wouldHaveBeen";
  const baseTense =
    tense === "future"
      ? "habitual"
      : tense === "wouldBe"
      ? "past"
      : tense === "wouldHaveBeen"
      ? "pastSubjunctive"
      : tense;
  return {
    hasBa,
    form: g.equativeEndings[baseTense],
  };
}

function renderEPSBlocks(blocks: T.EPSBlockComplete[]): T.Block[] {
  const subject = getSubjectSelection(blocks).selection;
  const subjectPerson = getPersonFromNP(subject);
  return blocks.map(({ block }): T.Block => {
    if (block.type === "AP") {
      if (block.selection.type === "adverb") {
        return makeBlock({
          type: "AP",
          selection: renderAdverbSelection(block.selection, subjectPerson),
        });
      }
      // if (block.selection.type === "sandwich") {
      return makeBlock({
        type: "AP",
        selection: renderSandwich(block.selection),
      });
      // }
    }
    return makeBlock({
      type: "subjectSelection",
      selection: renderNPSelection(
        block.selection,
        false,
        false,
        "subject",
        "none",
        false
      ),
    });
  });
}

function renderEquative(
  es: T.EquativeSelection,
  person: T.Person
): T.EquativeRendered {
  const { form, hasBa } = getEquativeForm(es.tense);
  const ps = getPersonFromVerbForm(form, person);
  return {
    ...es,
    person,
    hasBa,
    ps,
  };
}

const equativeBuilders: Record<
  T.EquativeTense,
  (p: T.Person, n: boolean) => string[]
> = {
  present: (p, n) => {
    return [
      `$SUBJ ${getEnglishConj(p, g.englishEquative.present)}${not(n)} $PRED`,
    ];
  },
  habitual: (p, n) => {
    return [
      `$SUBJ ${getEnglishConj(p, g.englishEquative.present)}${not(n)} $PRED`,
      `$SUBJ tend${isThirdPersonSing(p) ? "s" : ""}${not(n)} to be $PRED`,
      `$SUBJ ${n ? "don't " : ""}be $PRED`,
    ];
  },
  subjunctive: (p, n) => {
    return [
      `$SUBJ ${getEnglishConj(p, g.englishEquative.present)}${not(n)} $PRED`,
      `...that $SUBJ ${getEnglishConj(p, g.englishEquative.present)}${not(
        n
      )} $PRED`,
      `$SUBJ should${not(n)} be $PRED`,
    ];
  },
  future: (p, n) => {
    return [
      `$SUBJ will${not(n)} be $PRED`,
      `I betcha $SUBJ ${getEnglishConj(p, g.englishEquative.present)}${not(
        n
      )} $PRED`,
    ];
  },
  past: (p, n) => {
    return [
      `$SUBJ ${getEnglishConj(p, g.englishEquative.past)}${not(n)} $PRED`,
    ];
  },
  wouldBe: (p, n) => {
    return [
      `$SUBJ would ${n ? "not " : ""}be $PRED`,
      `$SUBJ would ${n ? "not " : ""}have been $PRED`,
      `$SUBJ ${getEnglishConj(p, g.englishEquative.past)} probably${not(
        n
      )} $PRED`,
    ];
  },
  pastSubjunctive: (_, n) => {
    return [
      `$SUBJ should ${n ? "not " : ""}have been $PRED`,
      `$SUBJ had to ${n ? "not " : ""}be $PRED`,
      `(if) $SUBJ had ${n ? "not " : ""}been $PRED`,
      `(if/that) $SUBJ were ${n ? "not " : ""}$PRED`,
    ];
  },
  wouldHaveBeen: (_, n) => {
    return [`$SUBJ would ${n ? "not " : ""}have been $PRED`];
  },
};

function isThirdPersonSing(p: T.Person): boolean {
  return p === T.Person.ThirdSingMale || p === T.Person.ThirdPlurFemale;
}
function not(n: boolean): string {
  return n ? " not " : "";
}

function getEnglishConj(p: T.Person, e: string | T.EnglishBlock): string {
  if (typeof e === "string") {
    return e;
  }
  const [row, col] = getVerbBlockPosFromPerson(p);
  return e[row][col];
}

// function chooseInflection(inflections: T.UnisexSet<T.InflectionSet>, pers: T.Person): T.ArrayOneOrMore<T.PsString> {
//     const gender = personGender(pers);
//     const plural = personIsPlural(pers);
//     return inflections[gender][plural ? 1 : 0];
// }

export function completeEPSelection(
  eps: T.EPSelectionState
): T.EPSelectionComplete | undefined {
  if (!EPSBlocksAreComplete(eps.blocks)) {
    return undefined;
  }
  if (eps.predicate.type === "Complement") {
    const selection = eps.predicate.Complement;
    if (!selection) return undefined;
    return {
      ...eps,
      blocks: eps.blocks,
      predicate: {
        type: "predicateSelection",
        selection,
      },
    };
  }
  // predicate is NP
  const selection = eps.predicate.NP;
  if (!selection) return undefined;
  return {
    ...eps,
    blocks: eps.blocks,
    predicate: {
      type: "predicateSelection",
      selection,
    },
  };
}

function removeAccentsFromEq(blocks: T.Block[]): T.Block[] {
  return blocks.map((block) => {
    if (block.block.type === "equative") {
      return {
        ...block,
        block: {
          ...block.block,
          equative: {
            ...block.block.equative,
            ps: removeAccentsWLength(block.block.equative.ps),
          },
        },
      };
    }
    return block;
  });
}
