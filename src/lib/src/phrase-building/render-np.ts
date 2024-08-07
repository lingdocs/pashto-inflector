import * as T from "../../../types";
import { inflectWord } from "../pashto-inflector";
import * as grammarUnits from "../grammar-units";
import { getVerbBlockPosFromPerson, getPersonNumber } from "../misc-helpers";
import { concatPsString, psStringFromEntry } from "../p-text-helpers";
import { getEnglishParticiple } from "../np-tools";
import { getEnglishWord } from "../get-english-word";
import { renderAdjectiveSelection } from "./render-adj";
import {
  isPattern5Entry,
  isAnimNounEntry,
  isPattern1Entry,
} from "../type-predicates";
import { shortVerbEndConsonant } from "../parsing/misc";
import { removeL } from "../new-verb-engine/rs-helpers";
import { applySingleOrLengthOpts } from "../fp-ps";
import { accentOnNFromEnd } from "../accent-helpers";
import { getInfsAndVocative } from "../inflections-and-vocative";

// TODO: can have subject and objects in possesors!!

// like زما د ښځو لیدل
// my seeing women...
// seeing my women...
// the women seeing me...

export function renderNPSelection(
  NP: T.NPSelection,
  inflected: boolean,
  inflectEnglish: boolean,
  role: "subject",
  soRole: "servant" | "king" | "none",
  isPuSandwich: boolean
): T.Rendered<T.NPSelection>;
export function renderNPSelection(
  NP: T.NPSelection,
  inflected: boolean,
  inflectEnglish: boolean,
  role: "object",
  soRole: "servant" | "king" | "none",
  isPuSandwich: boolean
): T.Rendered<T.NPSelection>;
export function renderNPSelection(
  NP: T.NPSelection,
  inflected: boolean,
  inflectEnglish: boolean,
  role: "subject" | "object",
  soRole: "servant" | "king" | "none",
  isPuSandwich: boolean
): T.Rendered<T.NPSelection> {
  if (typeof NP !== "object") {
    if (role !== "object") {
      throw new Error("ObjectNP only allowed for objects");
    }
    return NP;
  }
  if (NP.selection.type === "noun") {
    return {
      type: "NP",
      selection: renderNounSelection(
        NP.selection,
        inflected,
        soRole,
        undefined,
        isPuSandwich
      ),
    };
  }
  if (NP.selection.type === "pronoun") {
    return {
      type: "NP",
      selection: renderPronounSelection(
        NP.selection,
        inflected,
        inflectEnglish,
        soRole
      ),
    };
  }
  if (NP.selection.type === "participle") {
    return {
      type: "NP",
      selection: renderParticipleSelection(NP.selection, inflected, soRole),
    };
  }
  throw new Error("unknown NP type");
}

export function renderNounSelection(
  n: T.NounSelection,
  inflected: boolean,
  role: "servant" | "king" | "none",
  noArticles?: true | "noArticles",
  isPuSandwich?: boolean
): T.Rendered<T.NounSelection> {
  const english = getEnglishFromNoun(n.entry, n.number, noArticles);
  const nounInflects =
    inflected &&
    !(isPuSandwich && isPattern1Entry(n.entry) && n.number === "singular");
  const pashto = ((): T.PsString[] => {
    const infs = inflectWord(n.entry);
    const ps =
      n.number === "singular"
        ? getInf(infs, "inflections", n.gender, false, nounInflects)
        : (() => {
            const plural = getInf(infs, "plural", n.gender, true, inflected);
            return [
              ...plural,
              ...getInf(infs, "arabicPlural", n.gender, true, inflected),
              ...(!plural.length || n.gender === "fem"
                ? // allow for plurals like ډاکټرې as well as ډاکټرانې
                  getInf(infs, "inflections", n.gender, true, inflected)
                : []),
            ];
          })();
    return ps.length > 0 ? ps : [psStringFromEntry(n.entry)];
  })();
  const person = getPersonNumber(n.gender, n.number);
  const determiners: T.Rendered<T.DeterminersSelection> | undefined =
    n.determiners
      ? {
          ...n.determiners,
          determiners: n.determiners.determiners.map((determiner) =>
            renderDeterminer({
              determiner,
              inflected,
              number: n.number,
              gender: n.gender,
            })
          ),
        }
      : undefined;
  return {
    ...n,
    adjectives: n.adjectives.map((a) =>
      renderAdjectiveSelection(
        a,
        person,
        inflected,
        isPuSandwich && n.number === "singular"
      )
    ),
    person,
    inflected,
    role,
    ps: pashto,
    e: english,
    possesor: renderPossesor(n.possesor, role),
    determiners,
  };
}

function renderDeterminer({
  determiner: { determiner },
  inflected,
  number,
  gender,
}: {
  determiner: T.DeterminerSelection;
  inflected: boolean;
  number: T.NounNumber;
  gender: T.Gender;
}): T.Rendered<T.DeterminerSelection> {
  if (determiner.p === "دا") {
    const ps = inflected ? { p: "دې", f: "de" } : { p: "دا", f: "daa" };
    return {
      type: "determiner",
      determiner,
      inflected,
      number,
      gender,
      ps: [ps],
      e: number === "plural" ? "these" : "this",
    };
  }
  if (determiner.p === "دغه") {
    const ps = inflected
      ? number === "plural"
        ? { p: "دغو", f: "dágho" }
        : gender === "masc"
        ? { p: "دغه", f: "dághu" }
        : { p: "دغې", f: "dághe" }
      : { p: "دغه", f: "dágha" };
    return {
      type: "determiner",
      determiner,
      inflected,
      number,
      gender,
      ps: [ps],
      e: number === "plural" ? "these" : "this",
    };
  }
  if (determiner.p === "هغه") {
    const ps = inflected
      ? number === "plural"
        ? { p: "هغو", f: "hágho" }
        : gender === "masc"
        ? { p: "هغه", f: "hághu" }
        : { p: "هغې", f: "hághe" }
      : { p: "هغه", f: "hágha" };
    return {
      type: "determiner",
      determiner,
      inflected,
      number,
      gender,
      ps: [ps],
      e: number === "plural" ? "those" : "that",
    };
  }
  const e =
    determiner.f === "Tol"
      ? "all/the whole"
      : determiner.f === "bul"
      ? "other/another"
      : determiner.f === "har"
      ? "every/each"
      : determiner.f === "koom"
      ? "some/which"
      : determiner.f === "heets"
      ? "no"
      : determiner.f === "dáase"
      ? number === "plural"
        ? "such/like these"
        : "such/like this"
      : determiner.f === "daghase"
      ? number === "plural"
        ? "just such/just like these"
        : "just such/just like this"
      : determiner.f === "hase"
      ? `such/like ${number === "plural"} ? "those" : "that"`
      : number === "plural"
      ? "just such/just like these"
      : "just such/just like this";
  return {
    type: "determiner",
    determiner,
    inflected,
    number,
    gender,
    ps: inflectDeterminer(determiner, inflected, gender, number),
    e,
  };
}

function inflectDeterminer(
  determiner: T.Determiner,
  inflected: boolean,
  gender: T.Gender,
  number: T.NounNumber
): T.PsString[] {
  const infs = getInfsAndVocative(determiner, undefined);
  if (!infs || !infs.inflections) {
    return [{ p: determiner.p, f: determiner.f }];
  }
  const inf = getBasicInf(infs.inflections, gender, number, inflected);
  if (!inf) {
    return [{ p: determiner.p, f: determiner.f }];
  }
  return inf;
}

function renderPronounSelection(
  p: T.PronounSelection,
  inflected: boolean,
  englishInflected: boolean,
  role: "servant" | "king" | "none"
): T.Rendered<T.PronounSelection> {
  const [row, col] = getVerbBlockPosFromPerson(p.person);
  return {
    ...p,
    inflected,
    role,
    ps: grammarUnits.pronouns[p.distance][inflected ? "inflected" : "plain"][
      row
    ][col],
    e: grammarUnits.persons[p.person].label[
      englishInflected ? "object" : "subject"
    ],
  };
}

function renderParticipleSelection(
  p: T.ParticipleSelection,
  inflected: boolean,
  role: "servant" | "king" | "none"
): T.Rendered<T.ParticipleSelection> {
  const o = { p: "و", f: "o" };
  const accentedO = { p: "و", f: "ó" };
  const v = accentOnNFromEnd(psStringFromEntry(p.verb.entry), 0);
  const hasShortForm =
    inflected && shortVerbEndConsonant.includes(v.p[v.p.length - 2]);
  const base: T.SingleOrLengthOpts<T.PsString> =
    inflected && hasShortForm
      ? {
          long: v,
          short: removeL(v),
        }
      : v;
  const ps: T.SingleOrLengthOpts<T.PsString[]> = inflected
    ? applySingleOrLengthOpts(
        {
          long: (x) => [concatPsString(x, o)],
          short: (x) => [concatPsString(x, accentedO)],
        },
        base
      )
    : [v];
  return {
    ...p,
    inflected,
    role,
    person: T.Person.ThirdPlurMale,
    ps,
    e: getEnglishParticiple(p.verb.entry),
    possesor: renderPossesor(p.possesor, "subj/obj"),
  };
}

function renderPossesor(
  possesor: T.PossesorSelection | undefined,
  possesorRole: "servant" | "king" | "none" | "subj/obj"
): T.RenderedPossesorSelection | undefined {
  if (!possesor) return undefined;
  const isSingUnisexAnim5PatternNoun =
    possesor.np.selection.type === "noun" &&
    possesor.np.selection.number === "singular" &&
    isAnimNounEntry(possesor.np.selection.entry) &&
    isPattern5Entry(possesor.np.selection.entry);
  return {
    shrunken: possesor.shrunken,
    np: renderNPSelection(
      possesor.np,
      !isSingUnisexAnim5PatternNoun,
      possesorRole === "subj/obj" ? true : false,
      "subject",
      possesorRole === "subj/obj" ? "none" : possesorRole,
      false
    ),
  };
}

function getBasicInf(
  infs: T.Inflections,
  gender: T.Gender,
  number: T.NounNumber,
  inflected: boolean
): T.PsString[] | false {
  const inflectionNumber = (inflected ? 1 : 0) + (number === "plural" ? 1 : 0);
  if (gender in infs) {
    // @ts-ignore
    return infs[gender][inflectionNumber];
  }
  return false;
}

function getInf(
  infs: T.InflectorOutput,
  t: "plural" | "arabicPlural" | "inflections",
  gender: T.Gender,
  plural: boolean,
  inflected: boolean
): T.PsString[] {
  // TODO: make this safe!!
  // @ts-ignore
  if (
    infs &&
    t in infs &&
    // @ts-ignore
    infs[t] !== undefined &&
    // @ts-ignore
    gender in infs[t] &&
    // @ts-ignore
    infs[t][gender] !== undefined
  ) {
    // @ts-ignore
    const iset = infs[t][gender] as T.InflectionSet;
    const inflectionNumber =
      (inflected ? 1 : 0) + (t === "inflections" && plural ? 1 : 0);
    return iset[inflectionNumber];
  }
  return [];
}

function getEnglishFromNoun(
  entry: T.DictionaryEntry,
  number: T.NounNumber,
  noArticles?: true | "noArticles"
): string {
  const articles = {
    singular: "(a/the)",
    plural: "(the)",
  };
  const article = articles[number];
  function addArticle(s: string) {
    if (noArticles) return s;
    return `${article} ${s}`;
  }
  const e = getEnglishWord(entry);
  if (!e)
    throw new Error(
      `unable to get english from subject ${entry.f} - ${entry.ts}`
    );

  if (typeof e === "string") return ` ${e}`;
  if (number === "plural") return addArticle(e.plural);
  if (!e.singular || e.singular === undefined) {
    throw new Error(
      `unable to get english from subject ${entry.f} - ${entry.ts}`
    );
  }
  return addArticle(e.singular);
}
