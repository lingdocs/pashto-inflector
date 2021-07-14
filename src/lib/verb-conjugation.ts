/**
 * Copyright (c) 2021 lingdocs.com
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { getVerbInfo } from "./verb-info";
import {
    presentEndings,
    pastEndings,
    imperativeEndings,
    baParticle,
    equativeEndings,
    emptyVerbBlock,
    passiveStativeBridge,
} from "./grammar-units";
import {
    addToForm,
    mapVerbBlock,
    concatPsString,
    allOnePersonVerbForm,
    complementInflects,
    concatInflections,
    unisexInfToObjectMatrix,
    inflectYey,
    psStringFromEntry,
    allOnePersonInflection,
    psStringEquals,
} from "./p-text-helpers";
import {
    accentOnNFromEnd,
} from "./accent-helpers";
import { pashtoConsonants } from "./pashto-consonants";
import {
    checkForIrregularConjugation,
    stativeAux,
} from "./irregular-conjugations";
import {
    chooseParticipleInflection,
    spaceInForm,
    noPersInfs,
} from "./misc-helpers";
import * as T from "../types";

const dummyEntry: T.DictionaryEntry = { i: 0, p: "", f: "", g: "", e: "", c: "", ts: 0 };

const aayTail = [{p: "ای", f: "aay" }, { p: "ی", f: "ey" }];

export function conjugateVerb(entry: T.DictionaryEntry, complement?: T.DictionaryEntry, verbInfo?: T.NonComboVerbInfo): T.VerbOutput {
    if (!(entry.c && entry.c.slice(0, 2) === "v.")) {
        throw new Error("not a verb");
    };
    const irregularConj = checkForIrregularConjugation(entry);
    if (irregularConj) {
        return irregularConj;
    }
    const info = verbInfo ? verbInfo : getVerbInfo(entry, complement);
    if (info.type === "transitive or grammatically transitive simple") {
        return {
            info,
            transitive: conjugateVerb({ ...entry, c: entry.c ? entry.c.replace("/gramm. trans.", "") : "" }, dummyEntry, info.transitive) as T.VerbConjugation,
            grammaticallyTransitive: conjugateVerb({ ...entry, c: entry.c ? entry.c?.replace("trans./", "") : "" }, dummyEntry, info.grammaticallyTransitive) as T.VerbConjugation,
        };
    }

    if (info.type === "dynamic or stative compound" || info.type === "dynamic or generative stative compound") {
        return {
            info,
            stative: conjugateVerb({ ...entry, c: entry.c ? entry.c.replace("dyn./", "") : "" }, dummyEntry, info.stative) as T.VerbConjugation,
            dynamic: conjugateVerb({ ...entry, c: entry.c ? entry.c.replace("/stat.", "") : "" }, dummyEntry, info.dynamic) as T.VerbConjugation,
        };
    }

    if (info.type === "dynamic compound") {
        return conjugateDynamicCompound(info);
    }

    const nonComboInfo = info as T.NonComboVerbInfo;

    // TODO: Handle verbs like چيغه کول
    const conjugation: T.VerbConjugation = {
        info: nonComboInfo,
        imperfective: makeAspectContent(nonComboInfo, "imperfective"),
        perfective: makeAspectContent(nonComboInfo, "perfective"),
        hypothetical: makeHypotheticalContent(nonComboInfo),
        participle: makeParticipleContent(nonComboInfo),
        perfect: makePerfectContent(nonComboInfo),
        ..."singularForm" in info ? {
            singularForm: conjugateVerb(entry, complement, info.singularForm) as T.VerbConjugation,
        } : {},
        // if transitive include passive voice
        ...info.transitivity !== "intransitive" ? {
            // TODO: STATIVE COMPOUND VERSION OF THIS
            passive: makePassiveContent(nonComboInfo),
        } : {},
    };
  
    return nonComboInfo.transitivity === "grammatically transitive"
        ? enforceObject(conjugation, 10)
        : nonComboInfo.type === "generative stative compound"
        ? enforceObject(conjugation, nonComboInfo.objComplement.person)
        : conjugation;
}

function conjugateDynamicCompound(info: T.DynamicCompoundVerbInfo): T.VerbConjugation {
    const willUseImperative = !(
        info.type === "dynamic compound"
        && info.transitivity === "intransitive"
        && info.auxVerb.p === "کېدل"
    );
    const auxConj = enforceObject(
        conjugateVerb(info.auxVerb, info.auxVerbComplement) as T.VerbConjugation,
        info.objComplement.person,
    );
    const complement = info.objComplement.plural
        ? info.objComplement.plural
        : psStringFromEntry(info.objComplement.entry);
    const makeAspectContent = (aspect: T.Aspect): T.AspectContent => {
        const makeModalContent = (): T.ModalContent => {
            const nonImperative = addToForm([complement, " "], auxConj[aspect].modal.nonImperative);
            const future = addToForm([baParticle, " "], nonImperative);
            const past = addToForm([complement, " "], auxConj[aspect].modal.past);
            const hypotheticalPast = addToForm([complement, " "], auxConj[aspect].modal.hypotheticalPast);
            return {
                nonImperative,
                future,
                past,
                hypotheticalPast,
            };
        };
        const ac = auxConj[aspect];
        const nonImperative = addToForm([complement, " "], ac.nonImperative);
        const future = addToForm([baParticle, " "], nonImperative);
        const imperative = (ac.imperative && willUseImperative)
            ? addToForm([complement, " "], ac.imperative)
            : null;
        const past = addToForm([complement, " "], auxConj[aspect].past);
        const modal = makeModalContent();
        return {
            nonImperative,
            future,
            ...imperative ? {
                imperative,
            } : {},
            past,
            modal,
        };
    }
    const hypothetical = addToForm([complement, " "], auxConj.hypothetical);
    const auxPPart = auxConj.participle.past;
    const participle = {
        present: concatInflections(complement, auxConj.participle.present),
        past: (
            (("long" in auxPPart) && ("masc" in auxPPart.long)) ||
            ("masc" in auxPPart)
        )
            // @ts-ignore
            ? concatInflections(complement, auxPPart)
            // @ts-ignore
            : concatPsString(complement, " ", auxPPart)
    }
    const makePerfect = (pset: T.PerfectContent) => ({
        halfPerfect: addToForm([complement, " "], pset.halfPerfect),
        past: addToForm([complement, " "], pset.past),
        present: addToForm([complement, " "], pset.present),
        subjunctive: addToForm([complement, " "], pset.subjunctive),
        future: addToForm([complement, " "], pset.future),
        affirmational: addToForm([complement, " "], pset.affirmational),
        pastSubjunctiveHypothetical: addToForm([complement, " "], pset.pastSubjunctiveHypothetical),
    });
    const makePassiveAspectContent = (aspect: T.Aspect, passive: T.PassiveContent): T.AspectContentPassive => {
        const nonImperative = addToForm([complement, " "], passive[aspect].nonImperative);
        const future = addToForm([baParticle, " "], nonImperative);
        const past = addToForm([complement, " "], passive[aspect].past);
        return {
            nonImperative,
            future,
            past,
        };
    }
    return {
        info,
        imperfective: makeAspectContent("imperfective"),
        perfective: makeAspectContent("perfective"),
        hypothetical,
        participle,
        perfect: makePerfect(auxConj.perfect),
        ...auxConj.passive ? {
            passive: {
                imperfective: makePassiveAspectContent("imperfective", auxConj.passive),
                perfective: makePassiveAspectContent("perfective", auxConj.passive),
                perfect: makePerfect(auxConj.passive.perfect),
            },
        } : {},
        ...info.singularForm ? {
            singularForm: conjugateDynamicCompound(info.singularForm)
        } : {},
        ...info.intransitiveForm ? {
            intransitiveForm: conjugateDynamicCompound(info.intransitiveForm)
        } : {},
    };
}

function makeAspectContent(info: T.NonComboVerbInfo, aspect: T.Aspect): T.AspectContent {
    if ((info.type === "stative compound") && spaceInForm(info.root[aspect])) {
        return makeStativeCompoundSeperatedAspectContent(info, aspect);
    }
    const stem = noPersInfs(info.stem[aspect]);
    const root = noPersInfs(info.root[aspect]);
    const nonImperative = addToForm([stem], presentEndings);
    const future = addToForm([baParticle, " "], nonImperative);
    const imperative = addToForm([stem], imperativeEndings);
    const roughPast = addToForm([root], pastEndings) as T.LengthOptions<T.VerbBlock>;
    // add accents and idiosyncratic third person sing masc forms
    const past = finishSimpleVerbPast(info, aspect, roughPast);
    return {
        nonImperative, // stem + present endings
        future, // به - ba + nonImperative
        imperative, // stem + imperative endings
        past, // root + past endings
        modal: makeJoinedModalContent(info, aspect),
    };
}

function makeJoinedModalContent(info: T.NonComboVerbInfo, aspectIn: T.Aspect): T.ModalContent {
    const aspect: T.Aspect = noPerfectiveModal(info) ? "imperfective" : aspectIn;
    const aux = stativeAux.intransitive.perfective;    
    const rAndT = info.yulEnding
        ? concatPsString(noPersInfs(info.root[aspect]).long, aayTail[1])
        : concatPsString(noPersInfs(info.root[aspect]), aayTail[1]);
    const rootAndTail = aspect === "imperfective"
        ? accentImperfectiveModalRootAndTail(info, rAndT)
        : rAndT;

    const nonImperative = addToForm([rootAndTail, " "], aux.nonImperative);
    const future = addToForm([baParticle, " "], nonImperative);
    const past = addToForm(
        [rootAndTail, " "],
        // @ts-ignore
        aux.past.short,
    );
    const hypotheticalPast = addToForm([rootAndTail, " ", { p: "شو", f: "shw" }, aayTail], emptyVerbBlock);
    return { 
        nonImperative, // ROOT + aayTail + kedulStat subjunctive
        future, // به - ba + modal nonImperative
        past, // ROOT + aayTail + kedulStat simple past
        hypotheticalPast, // ROOT + aayTail + sh + aayTail
    };
}

function makeStativeCompoundSeperatedAspectContent(info: T.StativeCompoundVerbInfo, aspect: T.Aspect): T.AspectContent {
    const transitivity = getTransitivity(info);
    const presentComplement = (transitivity === "transitive" && complementInflects(info.complement))
        ? unisexInfToObjectMatrix(info.complement)  // transitive verb requires an object matrix for the complex
        : info.complement;  // intransitive verb doesn't require that because the complement matches the subject

    function makeTransitiveStativeModalContent() {
        const aux = stativeAux[transitivity][aspect].modal;
        const nonImperative = addToForm([presentComplement, " "], aux.nonImperative);
        const future = addToForm([baParticle, " "], nonImperative);
        const past = addToForm([info.complement, " "], aux.past);
        const hypotheticalPast = addToForm([info.complement, " "], aux.hypotheticalPast);
        return {
            nonImperative,
            future,
            past,
            hypotheticalPast,
        };
    }

    const aux = stativeAux[transitivity][aspect];
    // CHECK, does this work with transitive and intransitive??
    const nonImperative = addToForm(
        [presentComplement, " "],
        stativeAux[transitivity][aspect].nonImperative,
    );
    const future = addToForm([baParticle, " "], nonImperative);
    const imperative = aux.imperative
        ? addToForm([presentComplement, " "], aux.imperative)
        : null;
    const past = addToForm([info.complement, " "], aux.past);
    return {
        nonImperative,
        future,
        past,
        ...imperative ? {
            imperative,
        } : {},
        modal: info.transitivity === "transitive"
            ? makeTransitiveStativeModalContent()
            : makeJoinedModalContent(info, "imperfective"),
    };
}

function makeHypotheticalContent(info: T.NonComboVerbInfo): T.VerbForm {
    function makeStativeCompoundSepHypotheticalContent(info: T.StativeCompoundVerbInfo): T.VerbForm {
        const transitivity = getTransitivity(info);
        const aux = stativeAux[transitivity].hypothetical;
        return addToForm([
            (transitivity === "transitive" && complementInflects(info.complement))
                ? unisexInfToObjectMatrix(info.complement)
                : info.complement,
            " ",
        ], aux);
    }
    if (("complement" in info) && spaceInForm(info.root.imperfective)) {
        return makeStativeCompoundSepHypotheticalContent(info as T.StativeCompoundVerbInfo);
    }
    const makeHypothetical = (root: T.OptionalPersonInflections<T.LengthOptions<T.PsString>>, length: "short" | "long"): T.PsString[] => {
        if ("mascSing" in root) {
            // BIG TODO: SHOULD THERE BE PERS INFS HERE?? IGNORING THEM NOW IF THEY EXIST
            return makeHypothetical(root.mascSing, length) as T.PsString[];
        }
        return [
            accentOnNFromEnd(
                concatPsString(root[length], aayTail[0]),
                (length === "long" ? 1 : 0) + (info.yulEnding ? 1 : 0),
            ),
            accentOnNFromEnd(
                concatPsString(root[length], aayTail[1]),
                (length === "long" ? 1 : 0) + (info.yulEnding ? 1 : 0),
            ),
        ];
    };
    const hyp = {
        short: makeHypothetical(info.root.imperfective, "short"),
        long: makeHypothetical(info.root.imperfective, "long"),
    };
    // TODO: ADD TO FORM IS NOT ADDING THE SECOND VARIATION PASSED IN!
    return addToForm([hyp], emptyVerbBlock);
}

function makeParticipleContent(info: T.NonComboVerbInfo): T.ParticipleContent {
    const transitivity = getTransitivity(info);
    const past = ("complement" in info)
        ? concatInflections(info.complement, stativeAux[transitivity].participle.past as T.UnisexInflections)
        : ("objComplement" in info)
        ? concatInflections(info.objComplement.plural ? info.objComplement.plural : info.objComplement.entry, stativeAux[transitivity].participle.past as T.UnisexInflections)
        : inflectYey(noPersInfs(info.participle.past));
    const present = ("complement" in info && spaceInForm(info.root.imperfective))
        ? concatInflections(info.complement, stativeAux[transitivity].participle.present as T.UnisexInflections)
        : inflectYey(noPersInfs(info.participle.present));
    return {
        present, // PAST PARTICIPLE inflected
        past, // PRESENT PARTICIPLE inflected
    };
}

function makePerfectContent(info: T.NonComboVerbInfo): T.PerfectContent {
    const transitivity = getTransitivity(info);
    const pastPart: (" " | T.SingleOrLengthOpts<T.UnisexInflections> | T.SingleOrLengthOpts<T.PsString>)[] =
        (info.type === "stative compound")
            // for stative compounds 
            ? [info.complement, " ", stativeAux[transitivity].participle.past]
            // for regular compounds
            : [inflectYey(noPersInfs(info.participle.past))]

    const halfPerfect = addToForm([...pastPart], emptyVerbBlock);
    const past = addToForm([...pastPart, " "], equativeEndings.past.short);
    const present = addToForm([...pastPart, " "], equativeEndings.present);
    const subjunctive = addToForm([...pastPart, " "], equativeEndings.subjunctive);
    const future = addToForm([baParticle, " ", ...pastPart, " "], equativeEndings.subjunctive);
    const affirmational = addToForm([baParticle, " ", ...pastPart, " "], equativeEndings.past.short);
    const pastSubjunctiveHypothetical = addToForm([...pastPart, " "], equativeEndings.hypothetical);
    return {
        halfPerfect, // Past Participle
        past, // Past Participle + Past Equative
        present, // Past Participle + Present Equative
        subjunctive, // Past Participle + Subjunctive Equative
        future, // به - ba + Past Participle + Future/Subj Equative
        affirmational, // به - ba + Past Participle + Past Equative
        pastSubjunctiveHypothetical, // Past Participle + وای - waay
    };
}

function makePassiveContent(info: T.NonComboVerbInfo): {
    imperfective: T.AspectContentPassive // --╖  ASPECT = "imperfective"
    perfective: T.AspectContentPassive //   --╜  ASPECT = "perfective"
    perfect: T.PerfectContent;
} {
    function makePassiveAspectContent(aspect: T.Aspect): T.AspectContentPassive {
        if ("complement" in info && spaceInForm(info.root[aspect])) {
            // seperated stative compound verb
            const bridge = aspect === "imperfective"
                ? noPersInfs(stativeAux.transitive.info.root.imperfective).long
                : passiveStativeBridge;
            const nonImperative = addToForm(
                [info.complement, " ", bridge, " "],
                stativeAux.intransitive[aspect].nonImperative,
            );
            const future = addToForm([baParticle, " "], nonImperative);
            const past = addToForm(
                [info.complement, " ", bridge, " "],
                stativeAux.intransitive[aspect].past,
            );
            return {
                nonImperative,
                future,
                past,
            };
        }
        const root = noPersInfs(info.root[aspect]).long;
        const aux = stativeAux.intransitive[aspect];
        const nonImperative = addToForm([root, " "], aux.nonImperative);
        const future = addToForm([baParticle, " "], nonImperative);
        const past = addToForm([root, " "], aux.past);
        return {
            nonImperative, // ROOT LONG + kedulStat[aspect].nonImperative
            future, // به ba + ROOT LONG + this.nonImperative
            past, // ROOT LONG + kedulStat[aspect].past
        };
    }
    const simpleVerbParticiple = {
        past: concatPsString(
            noPersInfs(info.root.imperfective).long,
            " ",
            stativeAux.intransitive.info.participle.past as T.PsString,
        ),
        present: { p: "ن ا", f: "n / a" },
    };
    const perfect = (info.type === "stative compound")
        ? makePassivePerfectContent(info)
        : makePerfectContent({ ...info, participle: simpleVerbParticiple });
    return {
        imperfective: makePassiveAspectContent("imperfective"),
        perfective: makePassiveAspectContent("perfective"),
        perfect: perfect,
    };
}

function makePassivePerfectContent(info: T.StativeCompoundVerbInfo): T.PerfectContent {
    const pPart = stativeAux.intransitive.participle.past;
    // will always be transitive
    const halfPerfect = addToForm(
        [info.complement, " ", passiveStativeBridge, " ", pPart],
        emptyVerbBlock,
    );
    const past = addToForm(
        [info.complement, " ", passiveStativeBridge, " ", pPart, " "],
        equativeEndings.past.short,
    );
    const present = addToForm(
        [info.complement, " ", passiveStativeBridge, " ", pPart, " "],
        equativeEndings.present,
    );
    const subjunctive = addToForm(
        [info.complement, " ", passiveStativeBridge, " ", pPart, " "],
        equativeEndings.subjunctive,
    );
    const future = addToForm(
        [baParticle, " ", info.complement, " ", passiveStativeBridge, " ", pPart, " "],
        equativeEndings.subjunctive,
    );
    const affirmational = addToForm(
        [baParticle, " ", info.complement, " ", passiveStativeBridge, " ", pPart, " "],
        equativeEndings.past.short,
    );
    const pastSubjunctiveHypothetical = addToForm(
        [info.complement, " ", passiveStativeBridge, " ", pPart, " "],
        equativeEndings.hypothetical,
    );
    return {
        halfPerfect,
        past,
        present,
        subjunctive,
        future,
        affirmational,
        pastSubjunctiveHypothetical,
    };
}

function enforceObject(conj: T.VerbConjugation, person: T.Person): T.VerbConjugation {
    const modifyPastInAspect = (as: T.AspectContent): T.AspectContent => ({
        nonImperative: allOnePersonInflection(as.nonImperative, person),
        future: allOnePersonInflection(as.future, person),
        ...as.imperative ? {
            imperative: allOnePersonInflection(as.imperative, person),
        } : {},
        past: allOnePersonVerbForm(as.past, person),
        modal: {
            ...as.modal,
            past: allOnePersonVerbForm(as.modal.past, person),
        },
    });
    const modifyParticiple = (part: T.ParticipleContent): T.ParticipleContent => ({
        // TODO: What to do with this!
        present: allOnePersonInflection(part.present, person),
        past: chooseParticipleInflection(part.past, person),
    });
    const modifyPerfect = (perf: T.PerfectContent): T.PerfectContent => ({
        halfPerfect: allOnePersonVerbForm(perf.halfPerfect, person),
        past: allOnePersonVerbForm(perf.past, person),
        present: allOnePersonVerbForm(perf.present, person),
        subjunctive: allOnePersonInflection(perf.subjunctive, person),
        future: allOnePersonVerbForm(perf.future, person),
        affirmational: allOnePersonVerbForm(perf.affirmational, person),
        pastSubjunctiveHypothetical: allOnePersonVerbForm(perf.pastSubjunctiveHypothetical, person),
    });
    const modifyPassiveAspect = (as: T.AspectContentPassive): T.AspectContentPassive => ({
        nonImperative: allOnePersonVerbForm(as.nonImperative, person),
        future: allOnePersonVerbForm(as.future, person),
        past: allOnePersonVerbForm(as.past, person),
    });
    return {
        ...conj,
        imperfective: modifyPastInAspect(conj.imperfective),
        perfective: modifyPastInAspect(conj.perfective),
        participle: modifyParticiple(conj.participle),
        perfect: modifyPerfect(conj.perfect),
        ...conj.passive ? {
            passive: {
                imperfective: modifyPassiveAspect(conj.passive.imperfective),
                perfective: modifyPassiveAspect(conj.passive.perfective),
                perfect: modifyPerfect(conj.passive.perfect),
            } 
        } : {},
    };
}

// 2ND LEVER HELPERS

function finishSimpleVerbPast(
    info: T.NonComboVerbInfo,
    aspect: T.Aspect,
    roughPast: T.LengthOptions<T.VerbBlock>,
): T.VerbForm {
    const applyAccent = (block: T.VerbBlock, form: "short" | "long"): T.VerbBlock => (
        mapVerbBlock((item: T.PsString, rowNum: number | undefined, colNum: number | undefined) => {
            const nonRedundantLEnding = (
                (rowNum === 4 && colNum === 1) &&
                item.p.slice(-1) === "ل" &&
                ["ul", "úl"].includes(item.f.slice(-2))
            )
            const n = (((form === "short") || nonRedundantLEnding) ? 0 : 1) + (info.yulEnding ? 1 : 0);
            return accentOnNFromEnd(item, n);
        }, block)
    );
    const short = ensureShort3rdPersMascSing(info, aspect, roughPast.short);
    if (aspect === "imperfective") {
        return {
            short: applyAccent(short, "short"),
            long: applyAccent(roughPast.long, "long"),
        };
    }
    // don't apply the accent on the perfective because the accent will
    // already have been included in the perfective root
    return { ...roughPast, short };
}

function ensureShort3rdPersMascSing(
    info: T.NonComboVerbInfo,
    aspect: T.Aspect,
    block: T.VerbBlock,
): T.VerbBlock {
    const replace3rdPersMascSing = (
        replacement: T.ArrayOneOrMore<T.PsString>,
        block: T.VerbBlock,
    ): T.VerbBlock => ([
        ...block.slice(0, 4),
        [replacement, block[4][1]],
        block[5],
    ] as T.VerbBlock);
    const makeAawuForm = (root: T.PsString): T.PsString => {
        const base = {
            p: root.p.slice(0, -1),
            f: root.f.slice(0, -2),
        };
        return concatPsString(base, { p: "اوه", f: "aawu" });
    }
    const infinitive = noPersInfs(info.root.imperfective).long;
    const endsInAwul = (
        (["awul", "awúl"].includes(infinitive.f.slice(-4)))
        &&
        (infinitive.p.slice(-2) === "ول")
    );
    if (endsInAwul) {
        const root = noPersInfs(info.root[aspect]).short;
        return replace3rdPersMascSing([makeAawuForm(root)], block);
    }
    if (info.idiosyncraticThirdMascSing) {
        const form = info.idiosyncraticThirdMascSing[aspect];
        // if it ends in a consonant, the special form will also have another
        // variation ending with a ه - u
        const endsInAConsonant = pashtoConsonants.includes(form.p.slice(-1));
        const replacement: T.ArrayOneOrMore<T.PsString> = endsInAConsonant
            ? [form, concatPsString(form, { p: "ه", f: "u" })]
            : [form];
        return replace3rdPersMascSing(replacement, block);
    }
    // No need for any special third person masculine singular forms
    return block;
}

function accentImperfectiveModalRootAndTail(
    info: T.NonComboVerbInfo,
    rt: T.SingleOrLengthOpts<T.PsString>,
    length?: "long" | "short",
): T.SingleOrLengthOpts<T.PsString> {
    if ("long" in rt) {
        return {
            short: accentImperfectiveModalRootAndTail(info, rt.short, "short") as T.PsString,
            long: accentImperfectiveModalRootAndTail(info, rt.long, "long") as T.PsString,
        }
    }
    const n = info.yulEnding
        ? 2
        : length === "short"
        ? 0
        : 1;
    return accentOnNFromEnd(rt, n);
}

function getTransitivity(info: T.VerbInfo): "transitive" | "intransitive" {
    return ("transitivity" in info && info.transitivity === "intransitive")
        ? "intransitive"
        : "transitive";
}

function noPerfectiveModal(info: T.NonComboVerbInfo): boolean {
    if (!("mascSing" in info.root.imperfective)) {
        const inf = info.root.imperfective.long;
        return (
            inf.p === "راتلل" ||
            psStringEquals({ p: "تلل", f: "tlul" }, inf) ||
            inf.p === "درتلل" ||
            inf.p === "ورتلل"
        );
    }
    return false;
}
