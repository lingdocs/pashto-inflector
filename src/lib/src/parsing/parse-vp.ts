import * as T from "../../../types";
import { parseNP } from "./parse-np";
import { bindParseResult } from "./utils";
import { parseVerb } from "./parse-verb";
import {
  makeObjectSelectionComplete,
  makeSubjectSelectionComplete,
} from "../phrase-building/blocks-utils";
import { vEntry } from "../new-verb-engine/rs-helpers";
import { getPersonFromNP, isThirdPerson } from "../phrase-building/vp-tools";
import { parseBa } from "./parse-ba";
// to hide equatives type-doubling issue
const kedulStat = vEntry({
  ts: 1581086654898,
  i: 11100,
  p: "کېدل",
  f: "kedul",
  g: "kedul",
  e: "to become _____",
  r: 2,
  c: "v. intrans.",
  ssp: "ش",
  ssf: "sh",
  prp: "شول",
  prf: "shwul",
  pprtp: "شوی",
  pprtf: "shúway",
  noOo: true,
  ec: "become",
});

// cool examples: زه خوږې ماشومې وهم

export function parseVP(
  tokens: Readonly<T.Token[]>,
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[],
  verbLookup: (s: string) => T.VerbEntry[]
): T.ParseResult<T.VPSelectionComplete>[] {
  if (tokens.length === 0) {
    return [];
  }
  // how to make this into a nice pipeline... 🤔
  const NP1 = parseNP(tokens, lookup).filter(({ errors }) => !errors.length);
  const ba = bindParseResult(NP1, (tokens, np1) => {
    const b = parseBa(tokens);
    if (!b.length) {
      return [
        {
          tokens,
          body: {
            np1,
            ba: false,
          },
          errors: [],
        },
      ];
    } else {
      return b.map(({ tokens, errors }) => ({
        body: {
          np1,
          ba: true,
        },
        errors,
        tokens,
      }));
    }
  });
  const NP2 = bindParseResult<
    {
      np1: {
        inflected: boolean;
        selection: T.NPSelection;
      };
      ba: boolean;
    },
    {
      np1: {
        inflected: boolean;
        selection: T.NPSelection;
      };
      ba: boolean;
      np2:
        | {
            inflected: boolean;
            selection: T.NPSelection;
          }
        | undefined;
    }
  >(ba, (tokens, { np1, ba }) => {
    const np2s = parseNP(tokens, lookup);
    if (!np2s.length) {
      const r: T.ParseResult<{
        np1: {
          inflected: boolean;
          selection: T.NPSelection;
        };
        ba: boolean;
        np2: undefined;
      }>[] = [
        {
          tokens,
          body: {
            np1,
            np2: undefined,
            ba,
          },
          errors: [],
        },
      ];
      return r;
    }
    return np2s.map((p) => ({
      tokens: p.tokens,
      body: {
        np1,
        np2: p.body,
        ba,
      },
      errors: p.errors,
    }));
  }).filter(({ errors }) => !errors.length);
  const vb = bindParseResult(NP2, (tokens, nps) => {
    const vb = parseVerb(tokens, verbLookup);
    // TODO make a nice functor that just maps or adds in the body
    return vb.map((p) => ({
      tokens: p.tokens,
      body: {
        np2: nps.np2,
        v: p.body,
        np1: nps.np1,
        ba: nps.ba,
      },
      errors: p.errors,
    }));
  }).filter(({ errors }) => !errors.length);
  // TODO: be able to bind mulitple vals
  return bindParseResult(vb, (tokens, { np1, np2, v: [ph, v], ba }) => {
    const w: T.ParseResult<T.VPSelectionComplete>[] = [];
    if (v.info.type === "equative") {
      throw new Error("not yet implemented");
    }
    const isPast = v.info.base === "root";
    const intransitive =
      v.info.type === "verb" && v.info.verb.entry.c.includes("intrans.");
    if (intransitive) {
      if (np2) return [];
      const s = np1;
      const errors: T.ParseError[] = [];
      if (s.inflected) {
        errors.push({
          message: "subject of intransitive verb should not be inflected",
        });
      }
      if (getPersonFromNP(s.selection) !== v.person) {
        errors.push({
          message: "subject should agree with intransitive verb",
        });
      }
      const blocks: T.VPSBlockComplete[] = [
        {
          key: 1,
          block: makeSubjectSelectionComplete(s.selection),
        },
        {
          key: 2,
          block: {
            type: "objectSelection",
            selection: "none",
          },
        },
      ];
      const verb: T.VerbSelectionComplete = {
        type: "verb",
        verb: v.info.type === "verb" ? v.info.verb : kedulStat,
        transitivity: "intransitive",
        canChangeTransitivity: false,
        canChangeStatDyn: false,
        negative: false,
        tense: getTenseFromRootsStems(ba, v.info.base, v.info.aspect),
        canChangeVoice: true,
        isCompound: false,
        voice: "active",
      };
      w.push({
        tokens,
        body: {
          blocks,
          verb,
          externalComplement: undefined,
          form: {
            removeKing: false,
            shrinkServant: false,
          },
        },
        errors,
      });
    } else {
      // transitive verb
      if (!(np1 && np2)) return [];
      [[np1, np2, false] as const, [np2, np1, true] as const].forEach(
        ([s, o, reversed]) => {
          if (v.info.type === "equative") {
            throw new Error("not yet implemented");
          }
          if (!s || !o) return [];
          // TODO: check if perfective head MATCHES verb
          if (v.info.aspect === "perfective" && !ph) {
            return [];
          }
          const subjPerson = getPersonFromNP(s.selection);
          const errors: T.ParseError[] = [];
          if (intransitive) {
            return [];
          }

          if (isPast) {
            if (getPersonFromNP(o.selection) !== v.person) {
              errors.push({
                message: "transitive past tense verb does not match object",
              });
            } else {
              if (!s.inflected) {
                errors.push({
                  message: "transitive past tense subject should be inflected",
                });
              }
              if (o.inflected) {
                errors.push({
                  message:
                    "transitive past tense object should not be inflected",
                });
              }
            }
          } else {
            if (getPersonFromNP(s.selection) !== v.person) {
              errors.push({
                message: "verb does not match subject",
              });
            } else {
              if (s.inflected) {
                errors.push({ message: "subject should not be inflected" });
              }
              if (o.selection.selection.type === "pronoun") {
                if (!isThirdPerson(subjPerson) && !o.inflected) {
                  errors.push({
                    message:
                      "1st or 2nd person object pronoun should be inflected",
                  });
                }
              } else if (o.inflected) {
                errors.push({ message: "object should not be inflected" });
              }
            }
          }

          const blocks: T.VPSBlockComplete[] = [
            {
              key: 1,
              block: makeSubjectSelectionComplete(s.selection),
            },
            {
              key: 2,
              block: makeObjectSelectionComplete(o.selection),
            },
          ];
          if (reversed) {
            blocks.reverse();
          }
          const verb: T.VerbSelectionComplete = {
            type: "verb",
            verb: v.info.type === "verb" ? v.info.verb : kedulStat,
            transitivity: "transitive",
            canChangeTransitivity: false,
            canChangeStatDyn: false,
            negative: false,
            tense: getTenseFromRootsStems(ba, v.info.base, v.info.aspect),
            canChangeVoice: true,
            isCompound: false,
            voice: "active",
          };
          w.push({
            tokens,
            body: {
              blocks,
              verb,
              externalComplement: undefined,
              form: {
                removeKing: false,
                shrinkServant: false,
              },
            },
            errors,
          });
        }
      );
    }
    return w;
  });
}

function getTenseFromRootsStems(
  hasBa: boolean,
  base: "root" | "stem",
  aspect: T.Aspect
): T.VerbTense {
  if (!hasBa) {
    if (base === "root") {
      return aspect === "perfective" ? "perfectivePast" : "imperfectivePast";
    } else {
      return aspect === "imperfective" ? "presentVerb" : "subjunctiveVerb";
    }
  } else {
    if (base === "root") {
      return aspect === "perfective"
        ? "habitualPerfectivePast"
        : "habitualImperfectivePast";
    } else {
      return aspect === "imperfective"
        ? "imperfectiveFuture"
        : "perfectiveFuture";
    }
  }
}
