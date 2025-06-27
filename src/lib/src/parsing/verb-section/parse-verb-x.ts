import * as T from "../../../../types";
import { fmapParseResult } from "../../fp-ps";
import { getLFromComplement, wrapInActiveV } from "./misc";
import { parseComplement } from "../argument-section/parse-complement";
import { bindParseResult, returnParseResult } from "../utils";
import { parseOptNeg } from "./parse-negative";
import { parseKawulKedulVBE } from "./parse-kawul-kedul-vbe";
import { isKawulStat, isKedulStat, isStatAux } from "./parse-verb-helpers";
import {
  parseKawulKedulAbility,
  parseKawulKedulPPart,
  parseKawulKedulVBP,
} from "./parse-kawul-kedul-vbp";
import { parseVBBBasic } from "./parse-vb-base";
import { getTransitivity } from "../../verb-info";
import { kawulStat } from "./irreg-verbs";

type XParser<X> = (
  tokens: readonly T.Token[],
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
) => T.ParseResult<X>[];

type Category = "basic" | "ability" | "perfect";

export function parseVerbX<X extends T.VerbX>(
  tokens: readonly T.Token[],
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
  parseX: XParser<X>,
  category: Category,
): T.ParseResult<T.ParsedV<X>>[] {
  if (tokens.length === 0) {
    return [];
  }
  const res: T.ParseResult<T.ParsedV<X>["content"]>[] = [
    ...parseActive<X>(tokens, dictionary, ph, category, parseX),
    ...parseActiveWelded<X>(tokens, dictionary, ph, category),
    ...parsePassiveWeldedX<X>(tokens, dictionary, ph, category),
    ...parsePassiveDoubleWeldedX<X>(tokens, ph, category),
  ];
  return fmapParseResult((content) => ({ type: "parsedV", content }), res);
}

function parseActive<X extends T.VerbX>(
  tokens: readonly T.Token[],
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
  category: Category,
  parseX: XParser<X>,
): T.ParseResult<T.ActiveVBasic<X>>[] {
  return category === "ability" && ph?.type === "CompPH"
    ? (fmapParseResult(
        wrapInActiveV,
        parseKawulKedulAbility(tokens, undefined).filter(
          (x) =>
            isKawulStat(x.body.info.verb) &&
            x.body.info.aspect === "perfective",
        ),
      ) as T.ParseResult<T.ActiveVBasic<X>>[])
    : category === "perfect" && ph?.type === "CompPH"
      ? []
      : fmapParseResult(wrapInActiveV, parseX(tokens, dictionary, ph));
}

function parseActiveWelded<X extends T.VerbX>(
  tokens: readonly T.Token[],
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
  category: Category,
): T.ParseResult<T.ActiveVWeld<X>>[] {
  if (ph) {
    return [];
  }
  const complement = parseComplement(tokens, dictionary);
  if (!complement.length) {
    return [];
  }
  return bindParseResult(complement, (tkns, comp) => {
    // TODO: remove the last check allow for CompNP once implemented
    if (
      typeof comp.selection === "object" &&
      "type" in comp.selection &&
      (comp.selection.type === "sandwich" ||
        comp.selection.type === "possesor" ||
        comp.selection.type === "NP")
    ) {
      return [];
    }
    const misplacedNegative = parseOptNeg(tkns);
    return bindParseResult(misplacedNegative, (tkns2, badNeg) => {
      const ks: T.ParseResult<X>[] =
        category === "basic"
          ? (parseKawulKedulVBE(tkns2, undefined) as T.ParseResult<X>[])
          : category === "ability"
            ? (parseKawulKedulAbility(tkns2, undefined).filter(
                (x) =>
                  isStatAux(x.body.info.verb) &&
                  x.body.info.aspect === "imperfective",
              ) as T.ParseResult<X>[])
            : (parseKawulKedulVBP(tkns2, undefined).filter((x) =>
                isStatAux(x.body.info.verb),
              ) as T.ParseResult<X>[]);
      return bindParseResult(ks, (tkns3, aux) => {
        if (category === "perfect" && aux.info.type !== "ppart") {
          return [];
        }
        if (category === "perfect") {
          const vbp: T.ActiveVWeld<X> = {
            type: "active welded",
            content: {
              left: comp,
              right: aux,
            },
          };
          return returnParseResult(tkns3, vbp);
        }
        if (!("aspect" in aux.info)) {
          // purely for type safety because of the badly designed types
          return [];
        }
        if (
          aux.info.aspect === "imperfective" &&
          isStatAux(aux.info.verb) /*type safety*/
        ) {
          const compTs = getLFromComplement(comp);
          if (compTs === undefined) {
            return [];
          }

          const right: T.ActiveVWeld<X>["content"]["right"] = (() => {
            if (category === "basic") {
              if (aux.type !== "parsed vbb verb") {
                throw new Error("parse WeldedX error");
              }
              return {
                type: "parsed vbb verb" as const,
                person: aux.person,
                info: aux.info,
              } as X;
            }
            return aux;
          })();

          const vbe: T.ActiveVWeld<X> = {
            type: "active welded",
            content: {
              left: comp,
              right,
            },
          };
          return returnParseResult(
            tkns3,
            vbe,
            badNeg
              ? [{ message: "negative cannot go inside welded block" }]
              : [],
          );
        } else {
          return [];
        }
      });
    });
  });
}

function parsePassiveWeldedX<X extends T.VerbX>(
  tokens: Readonly<T.Token[]>,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
  category: Category,
): T.ParseResult<T.PassiveVWeld<X>>[] {
  if (tokens.length === 0) {
    return [];
  }
  if (ph?.type === "CompPH" && category === "basic") {
    // passive stat comp perfective
    const ks = parseK(tokens);
    return bindParseResult(ks, (tkns2, k) => {
      if (k === "kawul") {
        return [];
      }
      const auxs = parseKawulKedulVBE(tkns2, undefined).filter(
        (x) =>
          isKedulStat(x.body.info.verb) && x.body.info.aspect === "perfective",
      );
      return bindParseResult(auxs, (tkns3, aux) => {
        const res = {
          type: "passive welded",
          content: {
            left: kawulStat,
            right: aux,
          },
        } as T.PassiveVWeld<X>;
        return returnParseResult(tkns3, res);
      });
    });
  }
  // passive basic
  const vbes = parseVBBBasic(tokens, dictionary, ph);
  return bindParseResult(vbes, (tkns2, vbe) => {
    if (isKawulStat(vbe.info.verb) || isKedulStat(vbe.info.verb)) {
      return [];
    }
    if (
      vbe.info.base !== "root" ||
      vbe.person !== T.Person.ThirdPlurMale ||
      vbe.info.imperative
    ) {
      return [];
    }
    if (category === "basic") {
      const auxs = parseKawulKedulVBE(tkns2, undefined).filter(
        (x) => x.body.info.type === "verb" && isKedulStat(x.body.info.verb),
      );
      return bindParseResult(auxs, (tkns2, aux) => {
        const errors: T.ParseError[] = [];
        if (getTransitivity(vbe.info.verb.entry) === "intransitive") {
          errors.push({
            message: `intransitive verbs cannot be used with the passive form`,
          });
        }
        if (aux.info.aspect !== vbe.info.aspect) {
          errors.push({
            message: `${vbe.info.aspect} passive requires ${vbe.info.aspect} auxilary kedul verb`,
          });
        }
        const passive: T.PassiveVWeld<T.ParsedVBBVerb> = {
          type: "passive welded",
          content: {
            left: vbe.info.verb,
            right: {
              type: "parsed vbb verb",
              info: aux.info,
              person: aux.person,
            },
          },
        };
        return returnParseResult(tkns2, passive, errors) as T.ParseResult<
          T.PassiveVWeld<X>
        >[];
      });
    }
    if (category === "ability") {
      const auxs = parseKawulKedulAbility(tkns2, undefined).filter((x) =>
        isKedulStat(x.body.info.verb),
      );
      return bindParseResult(auxs, (tkns3, aux) => {
        return returnParseResult(tkns3, {
          type: "passive welded" as const,
          content: {
            left: vbe.info.verb,
            right: aux,
          },
        }) as T.ParseResult<T.PassiveVWeld<X>>[];
      });
    }
    return bindParseResult(vbes, (tkns2, vbe) => {
      const auxs = parseKawulKedulPPart(tkns2).filter((x) =>
        isKedulStat(x.body.info.verb),
      );
      return bindParseResult(auxs, (tkns3, aux) => {
        const b: T.PassiveVWeld<T.ParsedVBP> = {
          type: "passive welded",
          content: {
            left: vbe.info.verb,
            right: aux,
          },
        };
        return returnParseResult(tkns3, b);
      }) as T.ParseResult<T.PassiveVWeld<X>>[];
    });
  });
}

function parsePassiveDoubleWeldedX<X extends T.VerbX>(
  tokens: readonly T.Token[],
  ph: T.ParsedPH | undefined,
  category: Category,
): T.ParseResult<T.PassiveVDoubWeld<X>>[] {
  if (ph?.type !== "CompPH") {
    return [];
  }
  const ks = parseK(tokens);
  return bindParseResult(ks, (tkns2, k) => {
    const errors: T.ParseError[] = [];
    if (category === "basic") {
      if (k !== "kawul") return [];
      const auxs = parseKawulKedulVBE(tkns2, undefined).filter(
        (x) =>
          isKedulStat(x.body.info.verb) &&
          x.body.info.aspect === "imperfective",
      );
      return bindParseResult(auxs, (tkns3, aux) => {
        if (aux.info.type !== "verb") {
          return [];
        }
        const passive: T.PassiveVDoubWeld<T.ParsedVBBVerb> = {
          type: "passive doub welded",
          content: {
            left: {
              type: "passive welded left",
              complement: {
                type: "complement",
                selection: ph.selection,
              },
            },
            right: {
              type: "parsed vbb verb",
              info: aux.info,
              person: aux.person,
            },
          },
        };
        return returnParseResult(tkns3, passive) as T.ParseResult<
          T.PassiveVDoubWeld<X>
        >[];
      });
    }
    if (category === "perfect") {
      const auxs = parseKawulKedulPPart(tkns2).filter((x) =>
        isKedulStat(x.body.info.verb),
      );
      return bindParseResult(auxs, (tkns3, aux) => {
        const b: T.PassiveVDoubWeld<T.ParsedVBPBasicPart> = {
          type: "passive doub welded",
          content: {
            left: {
              type: "passive welded left",
              complement: {
                type: "complement",
                selection: ph.selection,
              },
            },
            right: aux,
          },
        };
        return returnParseResult(tkns3, b, errors) as T.ParseResult<
          T.PassiveVDoubWeld<X>
        >[];
      });
    }
    if (k !== "kawul") {
      errors.push({
        message: "must use کول with passive ability stative compounds",
      });
    }
    const auxs = parseKawulKedulAbility(tkns2, undefined).filter((x) =>
      isKedulStat(x.body.info.verb),
    );
    return bindParseResult(auxs, (tkns3, aux) => {
      // for some reason we have to type this more generally to get the function to type-check
      const b: T.PassiveVDoubWeld<T.ParsedVBP> = {
        type: "passive doub welded",
        content: {
          left: {
            type: "passive welded left",
            complement: {
              type: "complement",
              selection: ph.selection,
            },
          },
          right: aux,
        },
      };
      return returnParseResult(tkns3, b, errors) as T.ParseResult<
        T.PassiveVDoubWeld<X>
      >[];
    });
  });
}

function parseK(
  tokens: readonly T.Token[],
): T.ParseResult<"kawul" | "kRul" | "kRaay">[] {
  if (!tokens.length) {
    return [];
  }
  const [{ s }, ...rest] = tokens;
  if (s === "کول") {
    return returnParseResult(rest, "kawul");
  }
  if (s === "کړل") {
    return returnParseResult(rest, "kRul");
  }
  if (["کړای", "کړلای", "کړی", "کړلی"].includes(s)) {
    return returnParseResult(rest, "kRaay");
  }
  return [];
}
