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

export function parseVP(
  tokens: Readonly<T.Token[]>,
  lookup: (s: Partial<T.DictionaryEntry>) => T.DictionaryEntry[],
  verbLookup: (s: (e: T.VerbDictionaryEntry) => boolean) => T.VerbEntry[]
): T.ParseResult<T.VPSelectionComplete>[] {
  if (tokens.length === 0) {
    return [];
  }
  // how to make this into a nice pipeline... 🤔
  const NP1 = parseNP(tokens, lookup);
  const NP2 = bindParseResult(NP1, (tokens) => parseNP(tokens, lookup), true);
  const vb = bindParseResult(
    NP2,
    (tokens) => parseVerb(tokens, verbLookup),
    true
  );
  // TODO: be able to bind mulitple vals
  return bindParseResult<Omit<T.VBE, "ps">, T.VPSelectionComplete>(
    vb,
    (tokens, v) => {
      const w: T.ParseResult<T.VPSelectionComplete>[] = [];
      NP1.forEach(({ body: np1 }) => {
        NP2.forEach(({ body: np2 }) => {
          [
            [np1, np2],
            [np2, np1],
          ].forEach(([s, o]) => {
            const errors: T.ParseError[] = [];
            const subjPerson = getPersonFromNP(s.selection);
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
            if (getPersonFromNP(s.selection) !== v.person) {
              errors.push({ message: "verb does not match subject" });
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
            const verb: T.VerbSelectionComplete = {
              type: "verb",
              verb: v.info.type === "verb" ? v.info.verb : kedulStat,
              transitivity: "transitive",
              canChangeTransitivity: false,
              canChangeStatDyn: false,
              negative: false,
              tense: "presentVerb",
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
          });
        });
      });
      return w;
    }
  );
}
