/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
    concatPsString,
    psStringEquals,
    removeEndingL,
    yulEndingInfinitive,
    removeRetroflexR,
    unisexInfToObjectMatrix,
    complementInflects,
    beginsWithDirectionalPronoun,
    checkForOoPrefix,
    removeStartingTick,
    ensureShortWurShwaShift,
    choosePersInf,
    isUnisexSet,
    getLong,
} from "./p-text-helpers";
import {
    makePsString,
    removeFVarients,
} from "./accent-and-ps-utils";
import { 
    inflectYey,
} from "./pashto-inflector";
import {
    accentOnFront,
    accentOnNFromEnd,
    removeAccents,
} from "./accent-helpers";
import {
    inflectWord,
} from "./pashto-inflector";
import {
    stativeAux,
} from "./irregular-conjugations";
import {
    presentParticipleSuffix
} from "./grammar-units";
import {
    dynamicAuxVerbs,
} from "./dyn-comp-aux-verbs";
import {
    getPersonInflectionsKey,
    getPersonNumber,
    spaceInForm,
    getAuxTransitivity,
    chooseParticipleInflection,
} from "./misc-helpers";
import * as T from "../types";

const eyEndingUnaccented: T.PsString = { p: "ی", f: "ey" };

/**
 * Compiles the base information (roots, stems etc.) needed in order
 * to make all the conjugations. This is the first step of creating
 * the conjugations.
 * 
 * @param entry - the dictionary entry for the verb
 * @param complement - the dictioanry entry for the complement of the verb if compound
 */
export function getVerbInfo(
    ent: T.DictionaryEntry, 
    complmnt?: T.DictionaryEntry,
): T.VerbInfo {
    const entry = removeFVarients(ent);
    const complement = (complmnt && ent.c?.includes("comp.")) ? removeFVarients(complmnt) : undefined;
    const type = getType(entry);
    if (type === "transitive or grammatically transitive simple") {
        return {
            type: "transitive or grammatically transitive simple",
            transitive: getVerbInfo(
                // @ts-ignore (will have entry.c)
                { ...entry, c: entry.c.replace("trans./gramm. trans.", "trans.") },
                ) as T.SimpleVerbInfo,
            grammaticallyTransitive: getVerbInfo(
                // @ts-ignore (will have entry.c)
                { ...entry, c: entry.c.replace("trans./gramm. trans.", "gramm. trans.") },
                ) as T.SimpleVerbInfo,
        };
    }
    const transitivity = getTransitivity(entry);
    if (type !== "simple") {
        if (!complement) {
            throw new Error("complement required for compound verb");
        }
        if (type === "dynamic compound") {
            return getDynamicCompoundInfo(entry, complement)
        }
        if (type === "dynamic or stative compound") {
            return {
                type: "dynamic or stative compound",
                transitivity,
                dynamic: getDynamicCompoundInfo(
                    // @ts-ignore (will have entry.c)
                    { ...entry, c: entry.c.replace("dyn./stat.", "dyn.") },
                    complement,
                ),
                stative: getVerbInfo(
                    // @ts-ignore (will have entry.c)
                    { ...entry, c: entry.c.replace("dyn./stat.", "stat.") },
                    complement,
                ) as T.StativeCompoundVerbInfo,
            };
        }
        if (type === "dynamic or generative stative compound") {
            return {
                type: "dynamic or generative stative compound",
                transitivity,
                dynamic: getDynamicCompoundInfo(
                    // @ts-ignore (will have entry.c)
                    { ...entry, c: entry.c.replace("gen. stat./dyn.", "dyn.") },
                    complement,
                ),
                stative: getGenerativeStativeCompoundVerbInfo(
                    // @ts-ignore (will have entry.c)
                    { ...entry, c: entry.c.replace("gen. stat./dyn.", "gen. stat.") },
                    complement,
                ),
            }
        }
        if (type === "generative stative compound") {
            return getGenerativeStativeCompoundVerbInfo(entry, complement as T.DictionaryEntryNoFVars);
        }
    }
    const comp = complement ? ensureUnisexInf(complement) : undefined;
    const root = getVerbRoots(entry, transitivity, comp);
    const stem = getVerbStems(entry, root, transitivity, comp);
    const infinitive = "mascSing" in root.imperfective ? root.imperfective.mascSing.long : root.imperfective.long;
    const yulEnding = yulEndingInfinitive(infinitive);
    const participle = getParticiple(entry, stem, infinitive, transitivity, comp);
    const idiosyncraticThirdMascSing = getIdiosyncraticThirdMascSing(entry);
    const baseInfo: T.VerbInfoBase = {
        entry: {
            // TODO: cleanup the type safety with the DictionaryNoFVars messing things up etc
            entry: entry as unknown as T.VerbDictionaryEntry,
            complement,
        },
        transitivity,
        yulEnding,
        root,
        stem,
        participle,
        ...idiosyncraticThirdMascSing ? {
            idiosyncraticThirdMascSing,
        } : {},
    };
    if (type === "stative compound") {
        return {
            ...baseInfo,
            type,
            complement: comp as T.UnisexInflections,
        };
    }
    return {
        ...baseInfo,
        type,
    };
}

type Bases = {
    stem: {
        imperfective: T.FullForm<T.PsString>,
        perfective: T.FullForm<T.PsString>,
        perfectiveSplit?: T.SplitInfo,
    },
    root: {
        imperfective: T.FullForm<T.PsString>,
        perfective: T.FullForm<T.PsString>,
        perfectiveSplit?: T.SplitInfo,
    },
    participle: {
        present: T.FullForm<T.PsString>,
        past: T.FullForm<T.PsString>,
    },
}

function getGenerativeStativeCompoundVerbInfo(
    entry: T.DictionaryEntryNoFVars, comp: T.DictionaryEntryNoFVars, forceSingular?: true,
): T.GenerativeStativeCompoundVerbInfo {
    const transitivity = getTransitivity(entry);
    const transitivityNoGrammTrans = transitivity === "grammatically transitive" ? "transitive" : transitivity;
    const yulEnding = null;
    const objComplement = getObjComplementInfo(entry, comp, forceSingular);
    const auxVerb = stativeAux[transitivityNoGrammTrans];
    const compUsed = objComplement.plural ? objComplement.plural : removeFVarients(objComplement.entry);
    const bases: Bases = {
        stem: {
            imperfective: auxVerb.info.stem.imperfective,
            perfective: auxVerb.info.stem.perfective,
        },
        root: {
            imperfective: auxVerb.info.root.imperfective,
            perfective: auxVerb.info.root.perfective,
        },
        participle: {
            present: auxVerb.info.participle.present,
            past: chooseParticipleInflection(
                inflectYey(
                    "mascSing" in auxVerb.info.participle.past
                        // purely for type saftey, will not have mascSing
                        // in a non stative compound verb
                        /* istanbul ignore next */
                        ? auxVerb.info.participle.past.mascSing
                        : auxVerb.info.participle.past
                ),
                objComplement.person,
            ),
        }
    }
    const perfectiveStem = concatPsString(compUsed, " ", bases.stem.perfective);
    const stem = {
        imperfective: concatPsString(compUsed, " ", bases.stem.imperfective), 
        perfective: perfectiveStem,
        perfectiveSplit: splitPerfective(perfectiveStem, 0, 0, true),
    };
    const perfectiveRoot = concatPsString(compUsed, " ", bases.root.perfective) as T.OptionalPersonInflections<T.LengthOptions<T.PsString>>;
    const root = {
        imperfective: concatPsString(compUsed, " ", bases.root.imperfective) as T.OptionalPersonInflections<T.LengthOptions<T.PsString>>, 
        perfective: perfectiveRoot,
        perfectiveSplit: splitPerfective(perfectiveRoot, 0, 0, true),
    };
    const participle = {
        present: concatPsString(compUsed, " ", auxVerb.info.participle.present),
        past: concatPsString(compUsed, " ", bases.participle.past),
    }
    return {
        entry: {
            // TODO: cleanup the type safety with the DictionaryNoFVars messing things up etc
            entry: entry as unknown as T.VerbDictionaryEntry,
            complement: comp,
        },
        type: "generative stative compound",
        transitivity,
        yulEnding,
        stem,
        root,
        participle,
        objComplement,
        ...objComplement.plural ? {
            singularForm: getGenerativeStativeCompoundVerbInfo(entry, comp, true),
        } : {},
    };
}

function getDynamicCompoundInfo(entry: T.DictionaryEntryNoFVars, comp: T.DictionaryEntryNoFVars, forceSingular?: true): T.DynamicCompoundVerbInfo {
    const transitivity = getTransitivity(entry);
    const yulEnding = null;
    const objComplement = getObjComplementInfo(entry, comp, forceSingular);
    const auxVerb = getDynamicAuxVerb(entry);
    const auxVerbInfo = getVerbInfo(auxVerb.entry, auxVerb.complement) as T.NonComboVerbInfo;
    const compUsed = objComplement.plural ? objComplement.plural : objComplement.entry;
    const bases: Bases = (auxVerbInfo.type === "stative compound")
        ? getObjectMatchingBases(auxVerbInfo, objComplement.person)
        : {
                stem: {
                    imperfective: auxVerbInfo.stem.imperfective,
                    perfective: auxVerbInfo.stem.perfective,
                    ...auxVerbInfo.stem.perfectiveSplit ? {
                        perfectiveSplit: auxVerbInfo.stem.perfectiveSplit,
                    } : {},
                },
                root: {
                    imperfective: auxVerbInfo.root.imperfective,
                    perfective: auxVerbInfo.root.perfective,
                    ...auxVerbInfo.root.perfectiveSplit ? {
                        perfectiveSplit: auxVerbInfo.root.perfectiveSplit,
                    } : {},
                },
                participle: {
                    present: auxVerbInfo.participle.present,
                    past: chooseParticipleInflection(
                        inflectYey(
                            "mascSing" in auxVerbInfo.participle.past
                                // purely for type saftey, will not have mascSing
                                // in a non stative compound verb
                                /* istanbul ignore next */
                                ? auxVerbInfo.participle.past.mascSing
                                : auxVerbInfo.participle.past
                        ),
                        objComplement.person,
                    ),
                }
        }
    const stem = {
        imperfective: concatPsString(compUsed, " ", bases.stem.imperfective), 
        perfective: concatPsString(compUsed, " ", bases.stem.perfective),
        ...bases.stem.perfectiveSplit ? {
            perfectiveSplit: makeDynamicPerfectiveSplit(compUsed, bases.stem.perfectiveSplit),
        } : {},
    };
    const root = {
        imperfective: concatPsString(compUsed, " ", bases.root.imperfective) as T.OptionalPersonInflections<T.LengthOptions<T.PsString>>, 
        perfective: concatPsString(compUsed, " ", bases.root.perfective) as T.OptionalPersonInflections<T.LengthOptions<T.PsString>>,
        ...bases.root.perfectiveSplit ? {
            perfectiveSplit: makeDynamicPerfectiveSplit(compUsed, bases.root.perfectiveSplit),
        } : {},
    };
    const participle = {
        present: concatPsString(compUsed, " ", auxVerbInfo.participle.present),
        past: concatPsString(compUsed, " ", bases.participle.past),
    };
    const makeIntransitiveFormOfEntry = (e: T.DictionaryEntryNoFVars): T.DictionaryEntryNoFVars => ({
        ...e,
        p: e.p.replace(
            "کول",
            "کېدل"
        ),
        e: e.e.replace("to do", "to become"),
        f: e.f.replace(/kaw[u|ú]l/, "kedul"),
        c: "v. intrans. dyn. comp.",
    });
    const intransitiveFormEntry = (transitivity === "transitive" && auxVerb.entry.p === "کول")
        ? makeIntransitiveFormOfEntry(entry)
        : null;
    return {
        entry: {
            // TODO: cleanup the type safety with the DictionaryNoFVars messing things up etc
            entry: entry as unknown as T.VerbDictionaryEntry,
            complement: comp,
        },
        type: "dynamic compound",
        transitivity,
        yulEnding,
        stem,
        root,
        participle,
        objComplement,
        auxVerb: auxVerb.entry,
        ...auxVerb.complement ? {
            auxVerbComplement: auxVerb.complement,
        } : {},
        ...objComplement.plural ? {
            singularForm: getDynamicCompoundInfo(entry, comp, true),
        } : {},
        ...intransitiveFormEntry ? {
            intransitiveForm: getDynamicCompoundInfo(intransitiveFormEntry, comp),
        } : {},
    };
}

function getObjectMatchingBases(auxInfo: T.NonComboVerbInfo, person: T.Person): Bases {
    const key = getPersonInflectionsKey(person);
    const getBase = (x: T.FullForm<T.PsString>): T.SingleOrLengthOpts<T.PsString> => (
        "mascSing" in x ? x[key] : x 
    );
    return {
        stem: {
            imperfective: getBase(auxInfo.stem.imperfective),
            perfective: getBase(auxInfo.stem.perfective),
            ...auxInfo.stem.perfectiveSplit ? {
                perfectiveSplit: choosePersInf(auxInfo.stem.perfectiveSplit, key),
            } : {},
        },
        root: {
            imperfective: getBase(auxInfo.root.imperfective),
            perfective: getBase(auxInfo.root.perfective),
            ...auxInfo.root.perfectiveSplit ? {
                perfectiveSplit: choosePersInf(auxInfo.root.perfectiveSplit, key),
            } : {},
        },
        participle: {
            present: getBase(auxInfo.participle.present),
            past: getBase(auxInfo.participle.past),
        },
    };
}

function getObjComplementInfo(
    entry: T.DictionaryEntryNoFVars,
    complement: T.DictionaryEntryNoFVars,
    forceSingular?: true
): T.ObjComplement {
    const complementInEntry = makePsString(
        entry.p.split(" ")[0],
        entry.f.split(" ")[0],
    );
    const usesSeperatePluralForm = !forceSingular && !psStringEquals(
        makePsString(complementInEntry.p, removeAccents(complementInEntry.f)),
        makePsString(complement.p, removeAccents(complement.f)),
    );
    return {
        entry: complement,
        ...usesSeperatePluralForm ? {
            plural: complementInEntry,
        } : {},
        person: getComplementPerson(complement, usesSeperatePluralForm),
    };
}

function getTransitivity(entry: T.DictionaryEntryNoFVars): T.Transitivity {
    if (!entry.c) {
        throw new Error("No part of speech info");
    }
    if (entry.c.includes("gramm. trans.")) {
        return "grammatically transitive";
    }
    if (entry.c.includes("intrans.")) {
        return "intransitive";
    }
    return "transitive";
}

function getType(entry: T.DictionaryEntry): 
    "simple" | "stative compound" | "dynamic compound" |
    "dynamic or stative compound" | "dynamic or generative stative compound" |
    "generative stative compound" | "transitive or grammatically transitive simple"
{
    // error will have thrown before on the getTransitivity function if missing entry.c
    /* istanbul ignore if */
    if (!entry.c) {
        throw new Error("No part of speech info");
    }
    if (entry.c.includes(" trans./gramm. trans.")) {
        return "transitive or grammatically transitive simple";
    }
    if (entry.c.includes(" gen. stat. comp.")) {
        return "generative stative compound";
    }
    if (entry.c.includes(" stat. comp.")) {
        return "stative compound";
    }
    if (entry.c.includes(" dyn. comp.")) {
        return "dynamic compound";
    }
    if (entry.c.includes(" dyn./stat. comp.")) {
        return "dynamic or stative compound";
    }
    if (entry.c.includes(" gen. stat./dyn. comp.")) {
        return "dynamic or generative stative compound";
    }
    return "simple";
}

function getIdiosyncraticThirdMascSing(entry: T.DictionaryEntryNoFVars): T.ShortThirdPersFormSet | false {
    if (entry.tppp && entry.tppf) {
        const tpp = makePsString(entry.tppp, entry.tppf);
        const ooRes = addOoPrefix(tpp, entry)
        return {
            imperfective: tpp,
            perfective: ooRes.ps as T.PsString,
        };
    }
    if (entry.p === "کول") {
        if (entry.e.includes("to make")) { 
            return {
                perfective: { p: "کړ", f: "kuR" },
                imperfective: { p: "کاوه", f: "kaawú" },
            };
        }
        if (entry.e.includes("to do")) {
            return {
                perfective: { p: "وکړ", f: "óokuR" },
                imperfective: { p: "کاوه", f: "kaawú" },
            };
        }
    }
    return false;
}

/**
 * Returns the roots (imperfective and perfective) of a given verb
 * 
 * @param entry - the dictionary entry for the verb
 */
function getVerbRoots(entry: T.DictionaryEntryNoFVars, transitivity: T.Transitivity, complement?: T.UnisexInflections): T.VerbRootSet {
    // each of the roots compes with a short and long version
    // with or without the ending ل - ul
    const isKawulAux = entry.p === "کول";
    const shortAndLong = (root: T.PsString, perfective?: "perfective"): T.LengthOptions<T.PsString> => {
        const long = perfective ? root : accentOnNFromEnd(root, yulEndingInfinitive(root) ? 1 : 0);
        const short = removeEndingL(root);
        return {
            long,
            short,
            ...(isKawulAux && perfective) ? {
                mini: removeRetroflexR(short)
            } : {},
        };
    };
    const infinitive = makePsString(entry.p, entry.f);

    // the imperfective root is the infinitive
    // TODO: CHECK THIS!! FOR PERSON INFLECTIONS??
    const imperfective = ((): T.OptionalPersonInflections<T.LengthOptions<T.PsString>> => {
        // if stative compound
        if (complement && spaceInForm(entry)) {
            const comp = complementInflects(complement) ? unisexInfToObjectMatrix(complement) : complement.masc[0][0];
            const t = getAuxTransitivity(transitivity);
            const aux = stativeAux[t].info.root.imperfective
            return concatPsString(comp, " ", aux) as T.OptionalPersonInflections<T.LengthOptions<T.PsString>>;
        }
        return shortAndLong(entry);
    })();

    const { perfective, pSplit, fSplit } = ((): {
        perfective: T.OptionalPersonInflections<T.LengthOptions<T.PsString>>
        pSplit: number,
        fSplit: number,
    } => {
        // if stative compound
        if (complement) {
            const comp = complementInflects(complement) ? unisexInfToObjectMatrix(complement) : complement.masc[0][0];
            const t = getAuxTransitivity(transitivity);
            const aux = stativeAux[t].info.root.perfective
            return {
                pSplit: 0,
                fSplit: 0,
                perfective: concatPsString(comp, " ", aux) as T.OptionalPersonInflections<T.LengthOptions<T.PsString>>,
            };
        }
        // the perfective root is
        // - the special perfective root if it exists, or
        if (entry.prp && entry.prf) {
            const perfective = shortAndLong(makePsString(entry.prp, entry.prf), "perfective");
            const hasOoPrefix = checkForOoPrefix(perfective.long);
            return {
                perfective,
                pSplit: entry.separationAtP || (hasOoPrefix ? 1 : 0),
                fSplit: entry.separationAtF || (hasOoPrefix ? 2 : 0),
            };
        }
        // - the infinitive prefixed with oo
        const { ps, pSplit, fSplit } = addOoPrefix(infinitive, entry);
        return {
            perfective: shortAndLong(ps as T.PsString, "perfective"),
            pSplit,
            fSplit,
        };
    })();

    const perfectiveSplit = splitPerfective(perfective, pSplit, fSplit, !!complement);
    return {
        imperfective,
        perfective,
        perfectiveSplit,
    };
} 

/**
 * Returns the stems (imperfective and perfective) of a given verb
 * 
 * @param entry - the dictionary entry for the verb
 */
function getVerbStems(entry: T.DictionaryEntryNoFVars, root: T.VerbRootSet, transitivity: T.Transitivity, complement?: T.UnisexInflections): T.VerbStemSet {
    function isRegEdulTransitive(): boolean {
        /* istanbul ignore next */
        if ("mascSing" in root.imperfective) {
            return false;
        }
        const lastPCharacters = root.imperfective.long.p.slice(-3);
        return (
            // @ts-ignore - will always have a entry.c if we get to this point
            (entry.c.includes("intrans."))
            && (lastPCharacters === "ېدل")
        );
    }
    function makeIntransImperfectiveStem() {
        const long = {
            // @ts-ignore
            p: root.imperfective.long.p.slice(0, -2) + "ږ",
            // @ts-ignore
            f: root.imperfective.long.f.slice(0, -4) + "éG",
        };
        if (entry.shortIntrans) {
            const short = makePsString(
                long.p.slice(0, -2),
                long.f.slice(0, -2),
            );
            return { long, short };
        }
        return long;
    }

    const imperfective = ((): T.FullForm<T.PsString> => {
        const auxTransitivity = getAuxTransitivity(transitivity);
        if (complement && spaceInForm(root.imperfective)) {
            const comp = complementInflects(complement) ? unisexInfToObjectMatrix(complement) : complement.masc[0][0];
            return concatPsString(
                comp,
                " ",
                stativeAux[auxTransitivity].info.stem.imperfective as T.PsString,
            );
        }
        // the imperfective stem is
        // - the special present stem if it exists, or
        if (entry.psp && entry.psf) {
            return makePsString(entry.psp, entry.psf);
        }
        // - the eG form (and short form possibly) if regular transitive, or
        if (isRegEdulTransitive()) {
            return makeIntransImperfectiveStem()
        }
        // - the infinitive minus ل
        return "mascSing" in root.imperfective
            ? root.imperfective.mascSing.short
            : root.imperfective.short;
    })();

    const { perfective, pSplit, fSplit } = ((): { perfective: T.FullForm<T.PsString>, pSplit: number, fSplit: number } => {
        if (complement) {
            const comp = complementInflects(complement) ? unisexInfToObjectMatrix(complement) : complement.masc[0][0];
            const t = getAuxTransitivity(transitivity);
            return {
                perfective: concatPsString(comp, " ", stativeAux[t].info.stem.perfective),
                pSplit: 0,
                fSplit: 0,
            };
        }
        // the perfective stem is
        // - the special subjunctive stem if it exists, or
        if (entry.ssp && entry.ssf) {
            const isKawulAux = entry.p === "کول";
            const perfective = makePsString(entry.ssp, entry.ssf);
            const hasOoPrefix = checkForOoPrefix(perfective);
            if (isKawulAux) {
                return {
                    perfective: {
                        long: perfective,
                        short: removeRetroflexR(perfective),
                    },
                    pSplit: hasOoPrefix ? 1 : 0,
                    fSplit: hasOoPrefix ? 2 : 0,
                };
            }
            return {
                perfective,
                pSplit: entry.separationAtP || (hasOoPrefix ? 1 : 0),
                fSplit: entry.separationAtF || (hasOoPrefix ? 2 : 0),
            };
        }
        // - the perfective stem prefixed with oo (if possible)
        const res = addOoPrefix(imperfective as T.SingleOrLengthOpts<T.PsString>, entry);
        return {
            perfective: res.ps,
            pSplit: res.pSplit,
            fSplit: res.fSplit,
        };
    })();

    const perfectiveSplit = splitPerfective(perfective, pSplit, fSplit, !!complement);
    return {
        imperfective,
        perfective,
        ...perfectiveSplit ? {
            perfectiveSplit,
        } : {},
    };
}

function splitPerfective(perfective: T.FullForm<T.PsString>, pSplit: number, fSplit: number, isStativeComp: boolean): T.SplitInfo | undefined {
    if (!isStativeComp && pSplit === 0 && fSplit === 0) {
        return undefined;
    }
    if ("mascSing" in perfective) {
        // @ts-ignore
        return {
            mascSing: splitPerfective(perfective.mascSing, pSplit, fSplit, isStativeComp),
            mascPlur: splitPerfective(perfective.mascPlur, pSplit, fSplit, isStativeComp),
            femSing: splitPerfective(perfective.femSing, pSplit, fSplit, isStativeComp),
            femPlur: splitPerfective(perfective.femPlur, pSplit, fSplit, isStativeComp),
        };
    }
    if ("long" in perfective) {
        return {
            // @ts-ignore
            short: splitPerfective(perfective.short, pSplit, fSplit, isStativeComp) as [T.PsString, T.PsString],
            long: splitPerfective(perfective.long, pSplit, fSplit, isStativeComp) as [T.PsString, T.PsString],
            ..."mini" in perfective ? {
                // @ts-ignore
                mini: splitPerfective(perfective.mini, pSplit, fSplit, isStativeComp) as [T.PsString, T.PsString],
            } : {},
        };
    }
    if (isStativeComp) {
        // if it's a stative, split whatever is before the aux verb with a trailing space
        const pWords = perfective.p.split(" ");
        const fWords = perfective.f.split(" ");
        const before = makePsString(
            pWords.slice(0, -1).join(" ") + " ",
            fWords.slice(0, -1).join(" ") + " ",
        );
        const after = makePsString(
            pWords[pWords.length - 1],
            fWords[fWords.length - 1],
        );
        return [before, after];
    }
    const pBeg = perfective.p.slice(0, pSplit);
    const before = makePsString(
        pBeg.endsWith(" ") ? pBeg.slice(0, -1) : pBeg,
        perfective.f.slice(0, fSplit).replace("`", ""),
    );
    const beforeAccented = beginsWithDirectionalPronoun(before)
        ? before
        : accentOnFront(before);
    const after = makePsString(perfective.p.slice(pSplit), removeAccents(removeStartingTick(perfective.f.slice(fSplit))));
    return [beforeAccented, after] as T.SplitInfo;
}

function getParticiple(entry: T.DictionaryEntryNoFVars, stem: T.VerbStemSet, infinitive: T.PsString, transitivity: T.Transitivity, complement?: T.UnisexInflections): T.ParticipleSet {   
    const shortParticipleRoot = ((): T.PsString | null => {
        const shortenableEndings = ["ښتل", "ستل", "وتل"];
        // special thing for اېښودل - پرېښودل
        if (infinitive.p.slice(-4) === "ښودل" && infinitive.p.length > 4 && infinitive.p !== "کېښودل" && infinitive.p !== "کښېښودل") {
            return makePsString(
                infinitive.p.slice(0, -3),
                infinitive.f.slice(0, -4),
            );
        }
        const isOrulShortenable = ["وړل", "راوړل", "وروړل"].includes(infinitive.p);
        if (isOrulShortenable || (shortenableEndings.includes(infinitive.p.slice(-3)) && infinitive.p.slice(-4) !== "استل")) {
            return makePsString(
                infinitive.p.slice(0, -1),
                infinitive.f.slice(0, -2),
            )
        }
        return null;
    })();

    const makeSepStativePart = (complement: T.UnisexInflections, tense: "present" | "past"): T.FullForm<T.PsString> => {
        const compInflects = complementInflects(complement);
        const comp = compInflects ? unisexInfToObjectMatrix(complement) : complement.masc[0][0];
        const aux = stativeAux[auxTransitivity].info.participle[tense] as T.PsString;
        return concatPsString(
            comp,
            " ",
            compInflects
                ? unisexInfToObjectMatrix(inflectYey(aux) as T.UnisexInflections)
                : aux,
        );
    };

    const accentPastPart = (pp: T.PsString): T.PsString => (
        accentOnNFromEnd(pp, yulEndingInfinitive(infinitive) ? 2 : 1)
    );
    const auxTransitivity = getAuxTransitivity(transitivity);
    const past = (entry.pprtp && entry.pprtf)
        ? makePsString(entry.pprtp, entry.pprtf)
        : complement
        ? makeSepStativePart(complement, "past")
        : shortParticipleRoot
        ? {
            short: accentPastPart(
                concatPsString(ensureShortWurShwaShift(shortParticipleRoot), eyEndingUnaccented),
            ),
            long: accentPastPart( 
                concatPsString(infinitive, eyEndingUnaccented),
            ),
        } 
        : accentPastPart(concatPsString(infinitive, eyEndingUnaccented));

    // TODO: make this into a rule?
    const shortImperfectiveRoot = (entry.p === "وتل") ? { p: "وتل", f: "watl" } : removeEndingL(infinitive);
    const accentPresPart = (pp: T.PsString): T.PsString => (
        accentOnNFromEnd(pp, 1)
    );
    const present = (complement && spaceInForm(infinitive))
        ? makeSepStativePart(complement, "present")
        : (shortParticipleRoot && (!psStringEquals(shortParticipleRoot, shortImperfectiveRoot) || (entry.p === "وتل")))
        ? {
            short: accentPresPart(
                concatPsString(shortParticipleRoot, presentParticipleSuffix),
            ),
            long: accentPresPart(
                concatPsString(shortImperfectiveRoot, presentParticipleSuffix),
            ),
        }
        : ("short" in stem.imperfective && entry.shortIntrans && entry.p !== "اوسېدل") 
        ? {
            short: accentPresPart(
                concatPsString(stem.imperfective.short, presentParticipleSuffix),
            ),
            long: accentPresPart(
                concatPsString(shortImperfectiveRoot, presentParticipleSuffix),
            ),
        }
        : accentPresPart(
            concatPsString(
                shortImperfectiveRoot.p === "وړ" ? ensureShortWurShwaShift(shortImperfectiveRoot) : shortImperfectiveRoot,
                presentParticipleSuffix,
            ),
        );

    return {
        past,
        present,
    };
}

/**
 * Adds a perfective و - oo prefix to a verb
 * 
 * @param entry - the dictionary entry for the verb
 */
function addOoPrefix(
    s: T.SingleOrLengthOpts<T.PsString>,
    entry: T.DictionaryEntryNoFVars,
): { ps: T.SingleOrLengthOpts<T.PsString>, pSplit: number, fSplit: number } {
    let pSplit = 0;
    let fSplit = 0;
    // A bit of side effects in this function... sorry!
    function attachOo(ps: T.PsString): T.PsString;
    function attachOo(ps: T.SingleOrLengthOpts<T.PsString>): T.SingleOrLengthOpts<T.PsString>;
    function attachOo(ps: T.SingleOrLengthOpts<T.PsString>): T.SingleOrLengthOpts<T.PsString> {
        if ("long" in ps) {
            return {
                short: attachOo(ps.short),
                long: attachOo(ps.long),
            };
        }
        if (entry.separationAtP && entry.separationAtF) {
            pSplit = entry.separationAtP;
            fSplit = entry.separationAtF;
            return ps;
        }
        if (entry.noOo) {
            return ps;
        }
        if (entry.sepOo) {
            pSplit = 2;
            fSplit = 3; 
            return {
                p: `و ${ps.p}`,
                f: `oo\`${ps.f}`,
            };
        }
        const startsWithA = ps.p.charAt(0) === "ا" && ps.f.charAt(0) === "a";
        if (startsWithA) {
            pSplit = 2;
            fSplit = 3;
            return {
                p: `و${ps.p}`,
                f: `wa${ps.f}`,
            };
        }
        const startsWithAa = ["آ", "ا"].includes(ps.p.charAt(0)) && ps.f.slice(0, 2) === "aa";
        if (startsWithAa) {
            pSplit = 2;
            fSplit = 3;
            return {
                p: `وا${ps.p.substr(1)}`,
                f: `w${ps.f}`,
            };
        }
        const startsWithOo = ["óo", "oo"].includes(ps.f.slice(0, 2));
        if (startsWithOo) {
            pSplit = 1;
            fSplit = 2;
            return {
                p: `و${ps.p}`,
                f: `wU${ps.f}`,
            };
        }
        const startsWithEe = ["ée", "ee"].includes(ps.f.slice(0, 2)) && ps.p.slice(0, 2) === "ای";
        const startsWithE = ["e", "é"].includes(ps.f[0]) && ps.p.slice(0, 2) === "اې";
        if (startsWithEe || startsWithE) {
            pSplit = 2;
            fSplit = startsWithEe ? 3 : 2;
            return {
                p: `و${ps.p.slice(1)}`,
                f: `w${ps.f}`,
            };
        }
        const startsWithO = ["ó", "o"].includes(ps.f[0]) && ps.p.slice(0, 2) === "او";
        if (startsWithO) {
            pSplit = 1;
            fSplit = 2;
            return {
                p: `و${ps.p}`,
                f: `oo\`${ps.f}`,
            };
        }
        pSplit = 1;
        fSplit = 2;
        return {
            p: `و${ps.p}`,
            f: `oo${ps.f}`,
        };
    }
    const attachedOo = attachOo(s);
    return {
        ps: accentOnFront(attachedOo),
        pSplit: entry.separationAtP ? entry.separationAtP : pSplit,
        fSplit: entry.separationAtF ? entry.separationAtF : fSplit,
    };
}

function ensureUnisexInf(complement: T.DictionaryEntryNoFVars): T.UnisexInflections {
    const inf = inflectWord(complement);
    if (inf !== false && !!inf.inflections && isUnisexSet(inf.inflections)) {
        return inf.inflections as T.UnisexInflections;
    }
    const word = makePsString(complement.p, complement.f);
    return {
        masc: [
            [word],
            [word],
            [word],
        ],
        fem: [
            [word],
            [word],
            [word],
        ],
    };
}

function getDynamicAuxVerb(entry: T.DictionaryEntryNoFVars): {
    entry: T.DictionaryEntryNoFVars,
    complement?: T.DictionaryEntryNoFVars,
} {
    const auxWord = entry.p.trim().split(" ").slice(-1)[0];
    const auxWordResult = dynamicAuxVerbs.find((a) => a.entry.p === auxWord);
    /* istanbul ignore next */
    if (!auxWordResult) {
        throw new Error("unknown auxilary verb for dynamic compound");
    }
    return {
        entry: removeFVarients(auxWordResult.entry),
        ...("complement" in auxWordResult) ? {
            complement: auxWordResult.complement ? removeFVarients(auxWordResult.complement) : undefined,
        } : {},
    };
}

function getComplementPerson(
    complement: T.DictionaryEntryNoFVars,
    usesSeperatePluralForm?: boolean,
): T.Person {
    const number = (
        (complement.c && complement.c.includes("pl.")) || usesSeperatePluralForm
    ) ? "plural" : "singular";
    const gender = (complement.c && complement.c.includes("n. m.")) ? "masc" : "fem";
    return getPersonNumber(gender, number);
}

function makeDynamicPerfectiveSplit(comp: T.PsString, auxSplit: T.SplitInfo): T.SplitInfo {
    if ("mascSing" in auxSplit) {
        return {
            mascSing: makeDynamicPerfectiveSplit(comp, auxSplit.mascSing) as T.SingleOrLengthOpts<[T.PsString, T.PsString]>,
            mascPlur: makeDynamicPerfectiveSplit(comp, auxSplit.mascPlur) as T.SingleOrLengthOpts<[T.PsString, T.PsString]>,
            femSing: makeDynamicPerfectiveSplit(comp, auxSplit.femSing) as T.SingleOrLengthOpts<[T.PsString, T.PsString]>,
            femPlur: makeDynamicPerfectiveSplit(comp, auxSplit.femPlur) as T.SingleOrLengthOpts<[T.PsString, T.PsString]>,
        };
    }
    if ("long" in auxSplit) {
        return {
            long: makeDynamicPerfectiveSplit(comp, auxSplit.long) as [T.PsString, T.PsString],
            short: makeDynamicPerfectiveSplit(comp, auxSplit.short) as [T.PsString, T.PsString],
            ...auxSplit.mini ? {
                mini: makeDynamicPerfectiveSplit(comp, auxSplit.mini) as [T.PsString, T.PsString],
            } : {},
        };
    }
    return [
        concatPsString(comp, " ", auxSplit[0]),
        auxSplit[1],
    ];
}

export function getPassiveRootsAndStems(info: T.NonComboVerbInfo): T.PassiveRootsStems | undefined {
    if (info.transitivity !== "transitive") return undefined;
    return {
        stem: getPassiveStem(info.root),
        root: getPassiveRoot(info.root),
        participle: {
            past: getPassivePastParticiple(info.root.imperfective),
        },
    };
}

function getPassiveStem(root: T.VerbRootSet): T.VerbStemSet {
    return {
        perfective: getPassiveStemAspect(root.perfective, "perfective"),
        imperfective: getPassiveStemAspect(root.imperfective, "imperfective"),
    };
}

function getPassiveRoot(root: T.VerbRootSet): T.VerbRootSet {
    return {
        perfective: getPassiveRootAspect(root.perfective, "perfective"),
        imperfective: getPassiveRootAspect(root.imperfective, "imperfective"),
    };
}

function getPassivePastParticiple(root: T.OptionalPersonInflections<T.LengthOptions<T.PsString>>): T.OptionalPersonInflections<T.LengthOptions<T.PsString>> {
    if ("mascSing" in root) {
        return {
            "mascSing": getPassivePastParticiple(root.mascSing) as T.LengthOptions<T.PsString>,
            "mascPlur": getPassivePastParticiple(root.mascPlur) as T.LengthOptions<T.PsString>,
            "femSing": getPassivePastParticiple(root.femPlur) as T.LengthOptions<T.PsString>,
            "femPlur": getPassivePastParticiple(root.femPlur) as T.LengthOptions<T.PsString>,
        };
    }
    // @ts-ignore
    return concatPsString(getLong(root), " ", stativeAux.intransitive.info.participle.past) as T.PsString;
}

function getPassiveStemAspect(root: T.FullForm<T.PsString>, aspect: T.Aspect): T.FullForm<T.PsString> {
    if ("mascSing" in root) {
        return {
            "mascSing": getPassiveStemAspect(root.mascSing, aspect) as T.PsString,
            "mascPlur": getPassiveStemAspect(root.mascPlur, aspect) as T.PsString,
            "femSing": getPassiveStemAspect(root.femPlur, aspect) as T.PsString,
            "femPlur": getPassiveStemAspect(root.femPlur, aspect) as T.PsString,
        };
    }
    return concatPsString(getLong(root), " ", stativeAux.intransitive.info.stem[aspect]);
}

function getPassiveRootAspect(root: T.OptionalPersonInflections<T.LengthOptions<T.PsString>>, aspect: T.Aspect): T.OptionalPersonInflections<T.LengthOptions<T.PsString>> {
    if ("mascSing" in root) {
        return {
            "mascSing": getPassiveRootAspect(root.mascSing, aspect) as T.LengthOptions<T.PsString>,
            "mascPlur": getPassiveRootAspect(root.mascPlur, aspect) as T.LengthOptions<T.PsString>,
            "femPlur": getPassiveRootAspect(root.femPlur, aspect) as T.LengthOptions<T.PsString>,
            "femSing": getPassiveRootAspect(root.femPlur, aspect) as T.LengthOptions<T.PsString>,
        };
    }
    return {
        // @ts-ignore
        long: concatPsString(root.long, " ", stativeAux.intransitive.info.root[aspect].long),
        // @ts-ignore
        short: concatPsString(root.long, " ", stativeAux.intransitive.info.root[aspect].short),
    }
}