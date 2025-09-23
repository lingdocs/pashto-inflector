import * as T from "../../../../types";
import { fmapParseResult } from "../../fp-ps";
import { getLFromComplement, wrapInActiveV } from "./misc";
import { parseComplement } from "../argument-section/parse-complement";
import {
  bindParseResult,
  getOneToken,
  mapParser,
  parserCombOr,
  returnParseResult,
  tokensExist,
} from "../utils";
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
  tokens: T.Tokens,
  dictionary: T.DictionaryAPI,
  ph: T.ParsedPH | undefined,
) => T.ParseResult<X>[];

type Category = "basic" | "ability" | "perfect";

export function parseVerbX<X extends T.VerbX>(
  ph: T.ParsedPH | undefined,
  parseX: XParser<X>,
  category: Category,
): T.Parser<T.ParsedV<X>> {
  return mapParser(
    (content): T.ParsedV<X> => ({ type: "parsedV", content }),
    parserCombOr<T.ParsedV<X>["content"]>(
      [
        parseActive<X>(ph, category, parseX),
        parseActiveWelded<X>(ph, category),
        parsePassiveWeldedX<X>(ph, category),
        parsePassiveDoubleWeldedX<X>(ph, category),
      ],
      { keepErrors: true },
    ),
  );
}

// TODO: could refactor all these using parser combinators
function parseActive<X extends T.VerbX>(
  ph: T.ParsedPH | undefined,
  category: Category,
  parseX: XParser<X>,
) {
  return function (
    tokens: T.Tokens,
    dictionary: T.DictionaryAPI,
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
  };
}

function parseActiveWelded<X extends T.VerbX>(
  ph: T.ParsedPH | undefined,
  category: Category,
) {
  return function (
    tokens: T.Tokens,
    dictionary: T.DictionaryAPI,
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
        typeof comp.content.selection === "object" &&
        "type" in comp.content.selection &&
        (comp.content.selection.type === "sandwich" ||
          comp.content.selection.type === "possesor" ||
          comp.content.selection.type === "NP")
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
                    isStatAux(x.body.info.verb) !== false &&
                    x.body.info.aspect === "imperfective",
                ) as T.ParseResult<X>[])
              : (parseKawulKedulVBP(tkns2, undefined).filter(
                  (x) => isStatAux(x.body.info.verb) !== false,
                ) as T.ParseResult<X>[]);
        return bindParseResult(ks, (tkns3, aux) => {
          if (category === "perfect" && aux.content.info.type !== "ppart") {
            return [];
          }
          if (category === "perfect") {
            const vbp: T.ActiveVWeld<X> = {
              type: "active welded",
              content: {
                left: comp.content,
                right: aux.content,
              },
            };
            return returnParseResult(tkns3, vbp, {
              start: tokens.position,
              end: tkns3.position,
            });
          }
          if (!("aspect" in aux.content.info)) {
            // purely for type safety because of the badly designed types
            return [];
          }
          if (
            aux.content.info.aspect === "imperfective" &&
            isStatAux(aux.content.info.verb) !== false /*type safety*/
          ) {
            const compTs = getLFromComplement(comp.content);
            if (compTs === undefined) {
              return [];
            }

            const right: T.ActiveVWeld<X>["content"]["right"] = (() => {
              if (category === "basic") {
                if (aux.content.type !== "parsed vbb verb") {
                  throw new Error("parse WeldedX error");
                }
                return {
                  type: "parsed vbb verb" as const,
                  person: aux.content.person,
                  info: aux.content.info,
                } as X;
              }
              return aux.content;
            })();

            const vbe: T.ActiveVWeld<X> = {
              type: "active welded",
              content: {
                left: comp.content,
                right,
              },
            };
            return returnParseResult(
              tkns3,
              vbe,
              { start: tokens.position, end: tkns3.position },
              badNeg.content
                ? [{ message: "negative cannot go inside welded block" }]
                : [],
            );
          } else {
            return [];
          }
        });
      });
    });
  };
}

function parsePassiveWeldedX<X extends T.VerbX>(
  ph: T.ParsedPH | undefined,
  category: Category,
) {
  return function (
    tokens: T.Tokens,
    dictionary: T.DictionaryAPI,
  ): T.ParseResult<T.PassiveVWeld<X>>[] {
    if (!tokensExist(tokens)) {
      return [];
    }
    if (ph?.type === "CompPH" && category === "basic") {
      // passive stat comp perfective
      const ks = parseK(tokens);
      return bindParseResult(ks, (tkns2, k) => {
        if (k.content === "kawul") {
          return [];
        }
        const auxs = parseKawulKedulVBE(tkns2, undefined).filter(
          (x) =>
            isKedulStat(x.body.info.verb) &&
            x.body.info.aspect === "perfective",
        );
        return bindParseResult(auxs, (tkns3, aux) => {
          const res = {
            type: "passive welded",
            content: {
              left: kawulStat,
              right: aux.content,
            },
          } as T.PassiveVWeld<X>;
          return returnParseResult(tkns3, res, {
            start: tokens.position,
            end: tkns3.position,
          });
        });
      });
    }
    // passive basic
    const vbes = parseVBBBasic(tokens, dictionary, ph);
    return bindParseResult(vbes, (tkns2, vbe) => {
      if (
        isKawulStat(vbe.content.info.verb) ||
        isKedulStat(vbe.content.info.verb)
      ) {
        return [];
      }
      if (
        vbe.content.info.base !== "root" ||
        vbe.content.person !== T.Person.ThirdPlurMale ||
        vbe.content.info.imperative
      ) {
        return [];
      }
      if (category === "basic") {
        const auxs = parseKawulKedulVBE(tkns2, undefined).filter(
          (x) => x.body.info.type === "verb" && isKedulStat(x.body.info.verb),
        );
        return bindParseResult(auxs, (tkns2, aux) => {
          const errors: T.ParseError[] = [];
          if (getTransitivity(vbe.content.info.verb.entry) === "intransitive") {
            errors.push({
              message: `intransitive verbs cannot be used with the passive form`,
            });
          }
          if (aux.content.info.aspect !== vbe.content.info.aspect) {
            errors.push({
              message: `${vbe.content.info.aspect} passive requires ${vbe.content.info.aspect} auxilary kedul verb`,
            });
          }
          const passive: T.PassiveVWeld<T.ParsedVBBVerb> = {
            type: "passive welded",
            content: {
              left: vbe.content.info.verb,
              right: {
                type: "parsed vbb verb",
                info: aux.content.info,
                person: aux.content.person,
              },
            },
          };
          return returnParseResult(
            tkns2,
            passive,
            { start: tokens.position, end: tkns2.position },
            errors,
          ) as T.ParseResult<T.PassiveVWeld<X>>[];
        });
      }
      if (category === "ability") {
        const auxs = parseKawulKedulAbility(tkns2, undefined).filter((x) =>
          isKedulStat(x.body.info.verb),
        );
        return bindParseResult(auxs, (tkns3, aux) => {
          return returnParseResult(
            tkns3,
            {
              type: "passive welded" as const,
              content: {
                left: vbe.content.info.verb,
                right: aux.content,
              },
            },
            { start: tokens.position, end: tkns3.position },
          ) as T.ParseResult<T.PassiveVWeld<X>>[];
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
              left: vbe.content.info.verb,
              right: aux.content,
            },
          };
          return returnParseResult(tkns3, b, {
            start: tokens.position,
            end: tkns3.position,
          });
        }) as T.ParseResult<T.PassiveVWeld<X>>[];
      });
    });
  };
}

function parsePassiveDoubleWeldedX<X extends T.VerbX>(
  ph: T.ParsedPH | undefined,
  category: Category,
) {
  return function (tokens: T.Tokens): T.ParseResult<T.PassiveVDoubWeld<X>>[] {
    if (ph?.type !== "CompPH") {
      return [];
    }
    const ks = parseK(tokens);
    return bindParseResult(ks, (tkns2, k) => {
      const errors: T.ParseError[] = [];
      if (category === "basic") {
        if (k.content !== "kawul") return [];
        const auxs = parseKawulKedulVBE(tkns2, undefined).filter(
          (x) =>
            isKedulStat(x.body.info.verb) &&
            x.body.info.aspect === "imperfective",
        );
        return bindParseResult(auxs, (tkns3, aux) => {
          if (aux.content.info.type !== "verb") {
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
                info: aux.content.info,
                person: aux.content.person,
              },
            },
          };
          return returnParseResult(tkns3, passive, {
            start: tokens.position,
            end: tkns3.position,
          }) as T.ParseResult<T.PassiveVDoubWeld<X>>[];
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
              right: aux.content,
            },
          };
          return returnParseResult(
            tkns3,
            b,
            {
              start: tokens.position,
              end: tkns3.position,
            },
            errors,
          ) as T.ParseResult<T.PassiveVDoubWeld<X>>[];
        });
      }
      if (k.content !== "kawul") {
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
            right: aux.content,
          },
        };
        return returnParseResult(
          tkns3,
          b,
          {
            start: tokens.position,
            end: tkns3.position,
          },
          errors,
        ) as T.ParseResult<T.PassiveVDoubWeld<X>>[];
      });
    });
  };
}

function parseK(tokens: T.Tokens): T.ParseResult<"kawul" | "kRul" | "kRaay">[] {
  const [first, rest, pos] = getOneToken(tokens);
  if (!first) {
    return [];
  }
  if (first === "کول") {
    return returnParseResult(rest, "kawul", pos);
  }
  if (first === "کړل") {
    return returnParseResult(rest, "kRul", pos);
  }
  if (["کړای", "کړلای", "کړی", "کړلی"].includes(first)) {
    return returnParseResult(rest, "kRaay", pos);
  }
  return [];
}
