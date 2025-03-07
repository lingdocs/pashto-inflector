import { isFirstPerson, isSecondPerson } from "../misc-helpers";
import * as T from "../../../types";
import { concatPsString } from "../p-text-helpers";
import { flattenLengths } from "./compile";
import { monoidPsStringWVars } from "../fp-ps";
import { concatAll } from "fp-ts/lib/Monoid";

function getBaseWDetsAndAdjs({
  selection,
}: T.Rendered<
  T.NPSelection | T.ComplementSelection | T.APSelection
>): T.PsString[] {
  if (selection.type === "sandwich") {
    return getSandwichPsBaseAndAdjectives(selection);
  }
  const determiners = (
    ("determiners" in selection && selection.determiners?.determiners) ||
    []
  ).map((x) => x.ps);
  const detWOutNoun =
    "determiners" in selection &&
    selection.determiners &&
    !selection.determiners.withNoun;
  const adjs = (("adjectives" in selection && selection.adjectives) || []).map(
    (x) => x.ps
  );
  const base =
    selection.type === "possesor"
      ? [{ p: "", f: "" }]
      : flattenLengths(selection.ps);
  return assemblePsWords([
    ...determiners,
    ...(detWOutNoun ? [] : [...adjs, base]),
  ]);
}

// TODO: perhaps use this for more things (a simple compileIntoText ?)
function assemblePsWords(words: T.PsString[][]): T.PsString[] {
  return concatAll(monoidPsStringWVars)([
    ...intersperse(words, [{ p: " ", f: " " }]),
  ]);
}

function intersperse<T>(arr: T[], sep: T): T[] {
  return arr.reduce((a: T[], v: T) => [...a, v, sep], []).slice(0, -1);
}

function getSandwichPsBaseAndAdjectives(
  s: T.Rendered<T.SandwichSelection<T.Sandwich>>
): T.PsString[] {
  const insideBase = getBaseWDetsAndAdjs(s.inside);
  const willContractWithPronoun =
    s.before &&
    s.before.p === "د" &&
    s.inside.selection.type === "pronoun" &&
    (isFirstPerson(s.inside.selection.person) ||
      isSecondPerson(s.inside.selection.person));
  const contracted =
    willContractWithPronoun && s.inside.selection.type === "pronoun"
      ? contractPronoun(s.inside.selection)
      : undefined;
  return insideBase.map((inside) =>
    concatPsString(
      s.before && !willContractWithPronoun ? s.before : "",
      s.before ? " " : "",
      contracted ? contracted : inside,
      s.after ? " " : "",
      s.after ? s.after : ""
    )
  );
}

function contractPronoun(
  n: T.Rendered<T.PronounSelection>
): T.PsString | undefined {
  return isFirstPerson(n.person)
    ? concatPsString({ p: "ز", f: "z" }, flattenLengths(n.ps)[0])
    : isSecondPerson(n.person)
    ? concatPsString({ p: "س", f: "s" }, flattenLengths(n.ps)[0])
    : undefined;
}

function trimOffShrunkenPossesive(
  p: T.Rendered<T.NPSelection>
): T.Rendered<T.NPSelection> {
  if (!("possesor" in p.selection)) {
    return p;
  }
  if (!p.selection.possesor) {
    return p;
  }
  if (p.selection.possesor.shrunken) {
    return {
      type: "NP",
      selection: {
        ...p.selection,
        possesor: undefined,
      },
    };
  }
  return {
    type: "NP",
    selection: {
      ...p.selection,
      possesor: {
        ...p.selection.possesor,
        np: trimOffShrunkenPossesive(p.selection.possesor.np),
      },
    },
  };
}

export function getPashtoFromRendered(
  b:
    | T.Rendered<T.NPSelection>
    | T.Rendered<T.ComplementSelection>
    | T.RenderedPossesorSelection
    | T.Rendered<T.APSelection>,
  subjectsPerson: false | T.Person
): T.PsString[] {
  if (b.type === "possesor") {
    return addPossesor(b.np, [{ p: "", f: "" }], false);
  }
  // for predicate possesor
  if (b.selection.type === "possesor") {
    return addPossesor(b.selection.np, [{ p: "", f: "" }], false);
  }
  const base = getBaseWDetsAndAdjs(b);
  if (b.selection.type === "loc. adv." || b.selection.type === "adverb") {
    return base;
  }
  if (b.selection.type === "adjective") {
    if (!b.selection.sandwich) {
      return base;
    }
    // TODO: Kinda cheating
    const sandwichPs = getPashtoFromRendered(
      { type: "AP", selection: b.selection.sandwich },
      false
    );
    return base.flatMap((p) =>
      sandwichPs.flatMap((s) => concatPsString(s, " ", p))
    );
  }
  const trimmed =
    b.selection.type === "sandwich"
      ? {
          type: b.type,
          selection: {
            ...b.selection,
            inside: trimOffShrunkenPossesive(b.selection.inside),
          },
        }
      : trimOffShrunkenPossesive({ type: "NP", selection: b.selection });
  if (trimmed.selection.type === "sandwich") {
    return trimmed.selection.inside.selection.possesor
      ? addPossesor(
          trimmed.selection.inside.selection.possesor.np,
          base,
          subjectsPerson
        )
      : base;
  }
  if ("possesor" in trimmed.selection && trimmed.selection.possesor) {
    return addPossesor(trimmed.selection.possesor.np, base, subjectsPerson);
  }
  return base;
}

function addPossesor(
  owner: T.Rendered<T.NPSelection>,
  existing: T.PsString[],
  subjectsPerson: false | T.Person
): T.PsString[] {
  function willBeReflexive(subj: T.Person, obj: T.Person): boolean {
    return (
      ([0, 1].includes(subj) && [0, 1].includes(obj)) ||
      ([2, 3].includes(subj) && [8, 9].includes(obj))
    );
  }
  const wPossesor = existing.flatMap((ps) =>
    getBaseWDetsAndAdjs(owner).map((v) =>
      owner.selection.type === "pronoun" &&
      subjectsPerson !== false &&
      willBeReflexive(subjectsPerson, owner.selection.person)
        ? concatPsString({ p: "خپل", f: "khpul" }, " ", ps)
        : owner.selection.type === "pronoun" &&
          isFirstPerson(owner.selection.person)
        ? concatPsString({ p: "ز", f: "z" }, v, " ", ps)
        : owner.selection.type === "pronoun" &&
          isSecondPerson(owner.selection.person)
        ? concatPsString({ p: "س", f: "s" }, v, " ", ps)
        : concatPsString({ p: "د", f: "du" }, " ", v, " ", ps)
    )
  );
  if (!owner.selection.possesor) {
    return wPossesor;
  }
  return addPossesor(owner.selection.possesor.np, wPossesor, subjectsPerson);
}

function addArticlesAndAdjs(
  np: T.Rendered<T.NounSelection>
): string | undefined {
  if (!np.e) return undefined;
  try {
    // split out the atricles so adjectives can be stuck inbetween them and the word
    const chunks = np.e.split("the)");
    const [articles, word] =
      chunks.length === 1 ? ["", np.e] : [chunks[0] + "the) ", chunks[1]];
    const adjs = !np.adjectives
      ? ""
      : np.adjectives.reduce((accum, curr): string => {
          if (!curr.e) return "ADJ";
          return accum + curr.e + " ";
        }, "");
    const genderTag = np.genderCanChange
      ? np.gender === "fem"
        ? " (f.)"
        : " (m.)"
      : "";
    const moreThanOneDet = (np.determiners?.determiners.length || 0) > 1;
    const determiners =
      np.determiners && np.determiners.determiners
        ? np.determiners.determiners
            // @ts-expect-error - weird, ts not recognizing as rendered
            .map((x) => (moreThanOneDet ? `(${x.e})` : x.e))
            .join(" ") + " "
        : "";
    const detsWithoutNoun = np.determiners && !np.determiners.withNoun;
    return `${np.determiners ? "" : articles}${determiners}${
      detsWithoutNoun ? ` (${(adjs + word).trim()})` : adjs + word
    }${genderTag}`;
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

// TODO: DOES THE ENGLISH POSSESIVE WORK RIGHT RECURSIVELY HERE ?!?!
function addPossesorsEng(
  possesor: T.Rendered<T.NPSelection> | undefined,
  base: string | undefined,
  type: "noun" | "participle" | "complement"
): string | undefined {
  function removeArticles(s: string): string {
    return s.replace("(the) ", "").replace("(a/the) ", "");
  }
  if (!base && type !== "complement") return undefined;
  if (!possesor) return base;
  if (possesor.selection.type === "pronoun") {
    if (type === "noun" && base) {
      return `${pronounPossEng(
        possesor.selection.person,
        false
      )} ${removeArticles(base)}`;
    }
    if (type === "participle" && base) {
      return `(${pronounPossEng(
        possesor.selection.person,
        false
      )}) ${removeArticles(base)} (${possesor.selection.e})`;
    }
    if (type === "complement") {
      return pronounPossEng(possesor.selection.person, true);
    }
    throw new Error("error handling lack of base here A");
  }
  const possesorE = getEnglishFromRendered(possesor);
  if (!possesorE) return undefined;
  const withApostrophe = `${possesorE}'${possesorE.endsWith("s") ? "" : "s"}`;
  if (type === "noun" && base) {
    return `${withApostrophe} ${removeArticles(base)}`;
  }
  if (type === "participle" && base) {
    return `(${withApostrophe}) ${removeArticles(base)} (${possesorE})`;
  }
  if (type === "complement") {
    return withApostrophe;
  }
  throw new Error("error handling lack of base here B");
}

function pronounPossEng(p: T.Person, finalInComplement: boolean): string {
  function gend(x: T.Person): string {
    return `${x % 2 === 0 ? "m." : "f."}`;
  }
  if (p === T.Person.FirstSingMale || p === T.Person.FirstSingFemale) {
    return `${finalInComplement ? "mine" : "my"} (${gend(p)})`;
  }
  if (p === T.Person.FirstPlurMale || p === T.Person.FirstPlurFemale) {
    return `${finalInComplement ? "ours" : "our"} (${gend(p)})`;
  }
  if (p === T.Person.SecondSingMale || p === T.Person.SecondSingFemale) {
    return `${finalInComplement ? "yours" : "your"} (${gend(p)})`;
  }
  if (p === T.Person.SecondPlurMale || p === T.Person.SecondPlurFemale) {
    return `${finalInComplement ? "yours" : "your"}  (${gend(p)} pl.)`;
  }
  if (p === T.Person.ThirdSingMale) {
    return "his/its";
  }
  if (p === T.Person.ThirdSingFemale) {
    return finalInComplement ? "hers" : "its";
  }
  return `${finalInComplement ? "theirs" : "their"} (${gend(p)})`;
}

export function getEnglishFromRendered(
  r: T.Rendered<
    | T.NPSelection
    | T.ComplementSelection
    | T.APSelection
    | T.SandwichSelection<T.Sandwich>
  >
): string | undefined {
  if (r.type === "sandwich") {
    return getEnglishFromRenderedSandwich(r);
  }
  if (r.selection.type === "sandwich") {
    return getEnglishFromRenderedSandwich(r.selection);
  }
  if ("e" in r.selection && !r.selection.e) return undefined;
  if (r.selection.type === "loc. adv." || r.selection.type === "adverb") {
    return r.selection.e;
  }
  if (r.selection.type === "adjective") {
    return getEnglishFromRenderedAdjective(r.selection);
  }
  if (r.selection.type === "pronoun") {
    return r.selection.e;
  }
  if (r.selection.type === "participle") {
    return addPossesorsEng(
      r.selection.possesor?.np,
      r.selection.e,
      r.selection.type
    );
  }
  if (r.selection.type === "possesor") {
    return addPossesorsEng(r.selection.np, undefined, "complement");
  }
  return addPossesorsEng(
    r.selection.possesor?.np,
    addArticlesAndAdjs(r.selection),
    r.selection.type
  );
}

function getEnglishFromRenderedSandwich(
  r: T.Rendered<T.SandwichSelection<T.Sandwich>>
): string | undefined {
  const insideE = getEnglishFromRendered(r.inside);
  if (!insideE) return undefined;
  return `${r.e} ${insideE}`;
}

function getEnglishFromRenderedAdjective(
  a: T.Rendered<T.AdjectiveSelection>
): string | undefined {
  if (!a.sandwich) {
    return a.e;
  }
  if (!a.e) return undefined;
  return `${a.e} ${getEnglishFromRenderedSandwich(a.sandwich)}`;
}
